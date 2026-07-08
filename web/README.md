# nebelhaus.com — the install front door

A tiny Cloudflare Worker that serves the one-liner:

```sh
curl -fsSL https://nebelhaus.com/init.sh | bash
```

`worker.js` **proxies** (not redirects) the rice's `bootstrap.sh`, served as
`text/plain`. By default it serves the **latest GitHub release tag** of
`nebelhaus/nebelhaus` (cached ~1h), falling back to `main` before the first
release exists. Pin an exact one with `?ref=vX.Y.Z`.

## Deploy

The `nebelhaus.com` zone must be on the logged-in Cloudflare account. Wrangler
comes from nixpkgs (no global install needed):

```sh
nix run nixpkgs#wrangler -- login          # once, opens a browser
cd web && nix run nixpkgs#wrangler -- deploy
```

(Or `npx wrangler login` / `npx wrangler deploy` if you'd rather use node's.)

Validate the config without deploying:

```sh
cd web && nix run nixpkgs#wrangler -- deploy --dry-run
```

## On a release

`haus release nebelhaus` tags `vX.Y.Z`; CI publishes the GitHub release. The
Worker picks up the new tag within the cache hour — **nothing to redeploy**. To
make it instant, or to hard-pin a ref for everyone, set `REF` in `wrangler.toml`
and `wrangler deploy` again.

## Verify it's live

```sh
curl -fsSL https://nebelhaus.com/init.sh | head -5
curl -sI  https://nebelhaus.com/init.sh | grep -i x-nebelhaus-ref   # which ref served
curl -fsSL 'https://nebelhaus.com/init.sh?ref=v0.1.0' | head -2      # exact pin
```

## Trust

`curl | bash` runs whatever this serves, so keep it boring and readable: it only
proxies `bootstrap.sh` from this org's own repo. A Cloudflare/domain compromise
would mean arbitrary code on installers' Macs — that risk is inherent to any
`curl | bash`. Wary users can read the script first (drop the `| bash`) or pin a
`?ref=` tag and verify it against GitHub.
