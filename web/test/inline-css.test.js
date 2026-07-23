// Regression guard for the durable cure of the recurring "no CSS on iOS" bug.
//
// The failure: every page linked ONE per-deploy, content-hashed main stylesheet
// (/_astro/index.<hash>.css) with no inline fallback. Each deploy publishes a new
// hash and deletes the old file, so a browser holding a stale cached HTML
// document — iOS WebKit (Safari + the Instagram/Facebook in-app WebViews) caches
// top-level HTML hard — points its one <link> at a since-deleted stylesheet →
// 404 → a completely unstyled page.
//
// public/_headers (guarded by headers.test.js) makes HTML revalidate, but that
// only works if the client honors the header — iOS WebViews demonstrably don't
// always. The real cure is `build.inlineStylesheets: 'always'` in
// astro.config.mjs: Astro inlines the bundled CSS into each page's <head>, so
// there is no external main stylesheet to 404 and the styles travel with the
// document. This test fails loudly if that setting is ever dropped or weakened.

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const CONFIG_FILE = join(here, '../astro.config.mjs');

describe("astro.config.mjs inline-CSS policy", () => {
  const config = readFileSync(CONFIG_FILE, 'utf8');

  it("inlines all stylesheets so no page depends on an external main CSS file", () => {
    // 'always' — not 'auto' (default: only inlines sheets under 4kB, so the real
    // >4kB bundle stays external and vulnerable) and not 'never'.
    expect(config).toMatch(/inlineStylesheets:\s*['"]always['"]/);
  });

  it("inlines Expressive Code's styles instead of an external ec.<ver>.css", () => {
    // build.inlineStylesheets does NOT cover Expressive Code — it ships code-block
    // styles through its own emitter. Left external (the default), ec.<ver>.css is
    // the last stylesheet a doc page fetches, and when it fails in an iOS in-app
    // WebView the code blocks render as bare, unstyled monospace. false = inline.
    expect(config).toMatch(/emitExternalStylesheet:\s*false/);
  });
});
