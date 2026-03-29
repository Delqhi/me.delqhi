# Product Spec

## What this is
The product-level description of `me.delqhi.com`.

## What it's for
Defines what the site should do and what counts as success.

## How to create or update
Update this file whenever a user-facing feature, route, or content model changes.

## Core experience
- GitHub-like visual presentation.
- Overview page with profile, navigation, and social/contact actions.
- Open Source repository listing with tags and footer actions.
- Blog index and article detail pages.
- README-style page inside the app.

## Acceptance criteria
- Open Source appears before Blog in the navigation.
- The hero/profile area does not expose duplicate contact links.
- Blog share copy reads "Share this blog".
- Repository pages show language tags and bottom actions.
- Blog article pages can render an optional YouTube section.
- The in-app README matches the current repo summary.

## Priority
### Must
- Navigation, overview, projects, blog, readme
- SSR-safe rendering and buildability

### Should
- Docs tree and agent-facing repo files
- Blog article embeds

### Could
- More posts and repository metadata
- Additional polish and content variants

### Won't
- Backend persistence for this repo
- User accounts or authentication

## Best practices
- Keep acceptance criteria tied to observable UI behavior.
- Use this file as the source of truth for future UI scope changes.
