# Infrastructure

## What this is
Deployment and runtime notes for the site.

## What it's for
Explains how the app is built, served, and hosted.

## How to create or update
Update this file when the host, build output, or external services change.

## Current setup
- Angular build output is written to `dist/app`.
- SSR/prerender is enabled in the Angular build configuration.
- Static assets live in `public/`.
- External assets are currently pulled from GitHub avatars, Picsum, and YouTube embed URLs.

## Best practices
- Treat browser-only APIs as client-only.
- Keep environment values out of source control.
- Document any future hosting or CDN changes here.
