// Regression guard for public/_headers — the Cloudflare static-assets caching
// policy that keeps nebelhaus.com from losing its CSS on iOS.
//
// The failure it prevents: every page links ONE content-hashed stylesheet
// (/_astro/index.<hash>.css) with no inline fallback. If a browser serves a
// stale cached HTML document after a redeploy, that document points at an
// /_astro/<oldhash>.css that no longer exists → 404 → an entirely unstyled
// page. iOS WebKit (Safari + the Instagram/Facebook in-app WebViews) caches
// HTML heuristically, so it hits this far more than desktop browsers.
//
// The policy below fixes it: HTML always revalidates (so it can never point at
// a dead hash), while the fingerprinted /_astro/* assets stay immutable.
//
// This suite also encodes the ONE gotcha: wrangler MERGES matching rules and
// *appends* a second value when two rules set the same header, so an /_astro
// asset (which matches both /* and /_astro/*) needs the `! Cache-Control` unset
// to avoid a corrupt, self-contradictory Cache-Control. We re-implement that
// merge here and assert the resolved header, so a well-meaning "simplification"
// that drops the unset — or reorders the rules — fails loudly.

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const HEADERS_FILE = join(here, '../public/_headers');

// Minimal parser mirroring Cloudflare's _headers format: a line in column 0
// starts a path rule; indented lines are either `Name: value` (set) or
// `! Name` (unset). Comments (#) and blanks are ignored.
function parseHeaders(text) {
  const rules = [];
  let rule = null;
  for (const raw of text.split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    if (!/^\s/.test(raw)) {
      rule = { path: raw.trim(), set: {}, unset: [] };
      rules.push(rule);
    } else if (rule) {
      const line = raw.trim();
      if (line.startsWith('! ')) {
        rule.unset.push(line.slice(2).trim());
      } else {
        const i = line.indexOf(':');
        rule.set[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      }
    }
  }
  return rules;
}

// Cloudflare's `*` matches any run of characters, including slashes.
const matches = (pattern, path) =>
  new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$').test(path);

// Re-implements wrangler's merge (verified against wrangler 4.108's cli.js):
// apply matching rules top-to-bottom; the first rule to SET a header wins, a
// later rule that sets the same header APPENDS, and `unset` deletes it first.
function resolveCacheControl(rules, path) {
  const headers = new Map();
  const seen = new Set();
  for (const rule of rules) {
    if (!matches(rule.path, path)) continue;
    for (const key of rule.unset) headers.delete(key.toLowerCase());
    for (const [key, value] of Object.entries(rule.set)) {
      const k = key.toLowerCase();
      if (seen.has(k) && headers.has(k)) headers.set(k, headers.get(k) + ', ' + value);
      else headers.set(k, value);
      seen.add(k);
    }
  }
  return headers.get('cache-control');
}

const rules = parseHeaders(readFileSync(HEADERS_FILE, 'utf8'));

describe('public/_headers cache policy', () => {
  it('declares the /* catch-all first, before every override rule', () => {
    // Order matters: /* must precede the specific rules so their `! Cache-Control`
    // unset can drop the value /* added (wrangler MERGES + appends otherwise).
    expect(rules[0].path).toBe('/*');
    expect(rules.map((r) => r.path)).toEqual([
      '/*',
      '/_astro/*',
      '/logos/*',
      '/media/*',
      '/social/*',
      '/favicon.png',
    ]);
  });

  it('serves HTML with a must-revalidate, zero-max-age policy', () => {
    // The whole fix: a browser must revalidate HTML every navigation, so it can
    // never render a cached page that points at a since-deleted /_astro hash.
    for (const path of ['/', '/start/install/', '/reference/keybindings/', '/404.html']) {
      expect(resolveCacheControl(rules, path)).toBe('public, max-age=0, must-revalidate');
    }
  });

  it('serves fingerprinted /_astro assets as immutable — with NO stale value merged in', () => {
    // The gotcha guard: the resolved header must be ONLY the immutable value.
    // A missing `! Cache-Control` unset would append the /* value and yield a
    // corrupt "…max-age=0…, …max-age=31536000…".
    for (const path of ['/_astro/index.DGT9Tzev.css', '/_astro/index.C495VaYg.css', '/_astro/app.abcd1234.js']) {
      expect(resolveCacheControl(rules, path)).toBe('public, max-age=31536000, immutable');
    }
  });

  it('unsets Cache-Control before re-setting it on /_astro/*', () => {
    const astro = rules.find((r) => r.path === '/_astro/*');
    expect(astro.unset).toContain('Cache-Control');
  });

  it('serves stable-path static images cacheable WITHOUT forced revalidation', () => {
    // The Instagram/Facebook in-app-browser image bug: the /* catch-all would
    // slap max-age=0, must-revalidate on these <img> assets, forcing a 304 dance
    // that those memory-constrained WebViews fail (evicted body → broken image).
    // They must resolve to a plain finite max-age — cacheable, and crucially NO
    // must-revalidate — with the /* value cleanly unset (not appended).
    for (const path of [
      '/logos/nebelhaus.png',
      '/logos/pounce-peeking.png',
      '/media/stills/bar.png',
      '/social/og.png',
      '/favicon.png',
    ]) {
      const cc = resolveCacheControl(rules, path);
      expect(cc).toBe('public, max-age=604800');
      expect(cc).not.toMatch(/must-revalidate/);
      expect(cc).not.toMatch(/max-age=0\b/);
    }
  });

  it('unsets Cache-Control before re-setting it on every image rule', () => {
    for (const path of ['/logos/*', '/media/*', '/social/*', '/favicon.png']) {
      expect(rules.find((r) => r.path === path).unset).toContain('Cache-Control');
    }
  });
});
