# Security

## What this is
Security notes for the app, its embeds, and its build flow.

## What it's for
Helps prevent obvious mistakes like leaking keys, unsafe embeds, or browser-only runtime errors.

## How to create or update
Update this file whenever a new third-party integration or risk appears.

## Current notes
- Keep API keys and environment values out of source control.
- Sanitize embedded URLs before binding them to iframes.
- Guard browser-only code so SSR and prerender builds do not crash.
- Review dependency updates before merging.

## Best practices
- Prefer simple, explicit data flow.
- Add validation before introducing forms or APIs that accept user input.
