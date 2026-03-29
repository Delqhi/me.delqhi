# AGENTS.md

## What this is
Agent-facing operating guide for the `me.delqhi.com` repository.

## What it's for
Gives humans and agents a compact map of what this repo contains, what to touch, and how to verify changes.

## How to create or update
Update this file whenever the app structure, commands, or docs layout changes. Keep it short, explicit, and local to this repo.

## Best practices
- Prefer the existing Angular 21 standalone + SSR patterns.
- Keep browser-only APIs behind guards.
- Update matching docs when routes, services, or content change.
- Verify with:
  - `npm run lint`
  - `npm run build`
  - `npm test -- --watch=false`

## Repo map
- `src/app/app.ts` — shell, navigation, theme, and language controls
- `src/app/blog.service.ts` — blog post data
- `src/app/blog-post/` — article detail view
- `src/app/projects/` — repository view
- `src/app/readme/` — in-app README page
- `docs/` — docs standard skeleton and reference material
