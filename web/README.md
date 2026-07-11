# nebelhaus.com — the landing page, docs, and install front door

One Cloudflare Worker serves all of `nebelhaus.com`:

| Path | What | Source |
|---|---|---|
| `/` | the landing page | `src/pages/index.astro` (custom Astro page) |
| `/start`, `/guides`, `/reference`, `/internals` | the docs | Astro **Starlight** (`src/content/docs/`) |
| `/init.sh` | the install one-liner | `worker.js` (proxies the rice's `bootstrap.sh`) |

```sh
curl -fsSL https://nebelhaus.com/init.sh | bash
```

The site is a static [Astro](https://astro.build) build (Starlight for docs, a
hand-rolled landing page). It's served by Cloudflare's `[assets]` binding.
`worker.js` only handles `/init.sh`; everything else is a static asset. 404s
render Starlight's own 404 page.

## Develop

Node isn't global on this Nix box — get it via nix:

```sh
cd web
nix shell nixpkgs#nodejs_22 --command npm install
nix shell nixpkgs#nodejs_22 --command npm run dev      # http://localhost:4321
```

Content lives in `src/content/docs/` (Markdown/MDX). The sidebar is defined in
`astro.config.mjs`. The landing page is `src/pages/index.astro`. Colours are the
[nebelung](https://github.com/nebelhaus/nebelung) palette, applied to Starlight
in `src/styles/nebelung.css` and inline on the landing page.

## The `/init.sh` proxy

`worker.js` **proxies** (not redirects) the rice's `bootstrap.sh`, served as
`text/plain`, so the pretty URL is what `curl` sees. By default it serves the
**latest GitHub release tag** of `nebelhaus/nebelhaus` (cached ~1h), falling back
to `main` before the first release exists. Pin an exact one with `?ref=vX.Y.Z`,
or hard-pin for everyone via the `REF` var in `wrangler.toml`.

## Deploy

The `nebelhaus.com` zone must be on the logged-in Cloudflare account. Build the
static site first, then deploy the Worker (which uploads `dist/` as assets):

```sh
cd web
nix shell nixpkgs#nodejs_22 --command npm ci
nix shell nixpkgs#nodejs_22 --command npm run build
nix shell nixpkgs#nodejs_22 --command 'npx wrangler login'    # once, opens a browser
nix shell nixpkgs#nodejs_22 --command 'npx wrangler deploy'
```

Validate config without deploying:

```sh
nix shell nixpkgs#nodejs_22 --command 'npx wrangler deploy --dry-run'
```

> The nixpkgs `wrangler` currently fails to build from source on this machine, so
> use node's `npx wrangler` (shown above) rather than `nix run nixpkgs#wrangler`.

## On a release

`bench release nebelhaus` tags `vX.Y.Z`; CI publishes the GitHub release. The
Worker picks up the new tag for `/init.sh` within the cache hour — **the script
needs no redeploy**. The *site* only changes when you rebuild and redeploy it.

## Verify it's live

```sh
curl -fsSL https://nebelhaus.com/init.sh | head -5
curl -sI  https://nebelhaus.com/init.sh | grep -i x-nebelhaus-ref   # which ref served
curl -fsSL 'https://nebelhaus.com/init.sh?ref=v0.1.0' | head -2      # exact pin
curl -sI  https://nebelhaus.com/ | head -1                          # site is up
```

## Trust

`curl | bash` runs whatever this serves, so `/init.sh` stays boring and readable:
it only proxies `bootstrap.sh` from this org's own repo. A Cloudflare/domain
compromise would mean arbitrary code on installers' Macs — inherent to any
`curl | bash`. Wary users can read the script first (drop the `| bash`) or pin a
`?ref=` tag and verify it against GitHub.

## Adding docs

- New page: drop a `.md`/`.mdx` file in `src/content/docs/<section>/`, add
  frontmatter (`title`, `description`), and add it to the `sidebar` in
  `astro.config.mjs`.
- Screenshots/video: the family's shot list lives in `../assets/SHOTLIST.md`.
  Slots on the landing page and feature pages are ready for hero stills and
  clips once they're captured.
