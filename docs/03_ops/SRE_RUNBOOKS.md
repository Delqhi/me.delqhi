# SRE Runbooks

## What this is
Operational playbook for keeping the site healthy.

## What it's for
Gives a repeatable response for build, rendering, and content issues.

## How to create or update
Add a runbook whenever a new failure mode appears or a command changes.

## Common runbooks
### Local development
1. Install dependencies.
2. Run `npm run dev`.
3. Check `/`, `/projects`, `/blog`, `/blog/1`, and `/readme`.

### Build or test failure
1. Run `npm run lint`.
2. Run `npm run build`.
3. Run `npm test -- --watch=false`.
4. Fix the smallest failing layer first.

### SSR or prerender failure
1. Look for `window` or `document` usage.
2. Add browser guards around client-only code.
3. Rebuild and verify the prerendered routes.

### Content regression
1. Compare the visible UI with `README.md` and `docs/02_spec/PRODUCT_SPEC.md`.
2. Update content data and docs together.

## Best practices
- Keep runbooks executable and short.
- Prefer command-driven steps over vague advice.
