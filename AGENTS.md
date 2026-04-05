# AGENTS.md — OpenSIN AI Agent Instructions

## Project Overview
Personal website and blog of Jeremy Schulze (Delqhi), creator of OpenSIN — an open-source multi-agent orchestration platform.

## Tech Stack
- **Framework:** Angular 21 with SSR
- **Styling:** Tailwind CSS v4 + GitHub-style design tokens
- **Deployment:** Cloudflare Pages
- **Domain:** me.delqhi.com
- **Blog Source:** https://github.com/OpenSIN-AI/OpenSIN-Blog-Posts (81+ posts)

## Key Directories
- `src/app/` — Angular components
- `src/app/blog/` — Blog list with category filter, last 5 on homepage
- `src/app/blog-post/` — Detail view with dynamic SEO meta injection
- `src/app/readme/` — GitHub README renderer (live from Delqhi/delqhi)
- `src/app/opensin-banner/` — Reusable OpenSIN/MyOpenSIN banner
- `src/app/profile-sidebar/` — Profile with 3 org avatars (Google, NVIDIA, OpenSIN-AI)
- `public/` — Static SEO assets (robots.txt, ai.txt, llms.txt, sitemap.xml, rss.xml, _headers, _redirects)

## SEO Configuration (CRITICAL)
- **SEO Template:** https://github.com/Delqhi/seo-import
- **JSON-LD:** 8 schemas — Organization, Person, SoftwareApplication, WebSite, FAQPage (8 Q&As), BreadcrumbList, Article (dynamic), VideoObject
- **Dynamic Meta:** Blog posts inject title, description, canonical, OG tags, Article JSON-LD at runtime via `injectDynamicMeta()`
- **AI Crawlers:** ALL allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai, etc.)
- **Blog Posts:** Loaded live from OpenSIN-AI/OpenSIN-Blog-Posts via raw.githubusercontent.com (parallel fetch)

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm seo          # Generate SEO files (sitemap, rss, robots)
pnpm test         # Run vitest tests
```

## Deployment
```bash
pnpm build
npx wrangler pages deploy dist/app/browser --project-name delqhi-website --branch main
```

## Related Repos
- **SEO Template:** https://github.com/Delqhi/seo-import
- **Marketing Strategy:** https://github.com/Delqhi/marketing-strategie
- **Blog Posts:** https://github.com/OpenSIN-AI/OpenSIN-Blog-Posts
- **OpenSIN Platform:** https://github.com/OpenSIN-AI/website-opensin.ai
- **MyOpenSIN:** https://github.com/OpenSIN-AI/website-my-opensin-ai

## Best Practices
- Prefer Angular 21 standalone + SSR patterns
- Keep browser-only APIs behind `isPlatformBrowser` guards
- All SEO meta tags injected dynamically for blog posts
- Blog loads in parallel (not sequential) for performance
- Category filter uses computed signals
- Dark/light mode uses CSS custom properties
