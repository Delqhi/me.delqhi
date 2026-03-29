# Architecture

## What this is
High-level technical map of the application structure.

## What it's for
Shows how routes, components, and services fit together so changes stay consistent.

## How to create or update
Update this file when routes, shared services, data models, or rendering strategy change.

## Current architecture
- Angular 21 standalone application.
- The shell in `src/app/app.ts` owns navigation, theme, and language controls.
- Route content is rendered through `RouterOutlet`.
- `src/app/overview/overview.component.ts` composes the hero/profile content.
- `src/app/blog.service.ts` owns blog post data and optional YouTube embed URLs.
- `src/app/blog/blog.component.ts` renders the article list and footer actions.
- `src/app/blog-post/blog-post.component.ts` renders article detail pages, safe iframe embeds, and SSR-safe scrolling.
- `src/app/projects/projects.component.ts` renders repository cards and bottom navigation actions.
- SSR and prerendering are enabled through the Angular build configuration.

## Best practices
- Keep browser-only APIs behind `isPlatformBrowser` or `typeof window` checks.
- Keep content data in services rather than hardcoding it in multiple components.
- Update the docs when adding a route or changing the layout hierarchy.
