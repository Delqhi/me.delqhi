import { ChangeDetectionStrategy, Component, inject, signal, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { I18nService } from '../i18n.service';
import { BlogService, BlogPostFull } from '../blog.service';

@Component({
  selector: 'app-blog-post',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    @if (loading()) {
      <div class="flex items-center justify-center py-16 text-gh-text-secondary">
        <mat-icon class="text-[24px] w-[24px] h-[24px] animate-spin mr-2">sync</mat-icon>
        <span>Loading post...</span>
      </div>
    } @else if (post()) {
      <article class="flex flex-col gap-8 pb-12 animate-in fade-in duration-500" itemscope itemtype="https://schema.org/Article">
        <header class="border-b border-gh-border pb-8">
          <nav aria-label="Breadcrumb" class="text-xs text-gh-text-secondary mb-4">
            <ol class="flex items-center gap-1" itemprop="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a routerLink="/" class="hover:text-gh-link" itemprop="item"><span itemprop="name">Home</span></a>
                <meta itemprop="position" content="1" />
              </li>
              <li>·</li>
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <a routerLink="/blog" class="hover:text-gh-link" itemprop="item"><span itemprop="name">Blog</span></a>
                <meta itemprop="position" content="2" />
              </li>
              <li>·</li>
              <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
                <span itemprop="name">{{ post()!.title }}</span>
                <meta itemprop="position" content="3" />
              </li>
            </ol>
          </nav>
          <div class="flex items-center gap-2 text-xs text-gh-text-secondary mb-4">
            <mat-icon class="text-[16px] w-[16px] h-[16px] text-green-500">check_circle</mat-icon>
            <time [attr.datetime]="post()!.date" itemprop="datePublished">{{ post()!.date }}</time>
            @if (post()!.readTime) {
              <span>·</span>
              <span>{{ post()!.readTime }}</span>
            }
            @if (post()!.author) {
              <span>·</span>
              <span itemprop="author" itemscope itemtype="https://schema.org/Person">
                <span itemprop="name">{{ post()!.author }}</span>
              </span>
            }
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-gh-text mb-6 leading-tight" itemprop="headline">{{ post()!.title }}</h1>
          @if (post()!.imageUrl) {
            <figure>
              <img [src]="post()!.imageUrl" [alt]="post()!.title" class="w-full h-64 md:h-96 object-cover rounded-lg border border-gh-border" referrerpolicy="no-referrer" itemprop="image">
            </figure>
          }
          @if (post()!.category) {
            <meta [attr.content]="post()!.category" itemprop="articleSection" />
          }
          @for (tag of post()!.tags; track tag) {
            <meta [attr.content]="tag" itemprop="keywords" />
          }
        </header>

        <div class="prose prose-invert max-w-none text-gh-text leading-relaxed" [innerHTML]="post()!.content" itemprop="articleBody"></div>

        @if (post()!.youtubeEmbedUrl) {
          <section class="border border-gh-border rounded-lg overflow-hidden bg-gh-bg-secondary" itemprop="video" itemscope itemtype="https://schema.org/VideoObject">
            <div class="flex items-center justify-between gap-4 px-4 py-3 border-b border-gh-border">
              <div>
                <h2 class="text-sm font-semibold text-gh-text" itemprop="name">YouTube video</h2>
                <p class="text-xs text-gh-text-secondary" itemprop="description">Watch the companion walkthrough for this post.</p>
              </div>
              <a [href]="post()!.youtubeEmbedUrl" target="_blank" rel="noopener noreferrer" class="text-xs text-gh-link hover:underline" itemprop="url">Open on YouTube</a>
            </div>
            <div class="aspect-video bg-black">
              <iframe
                class="h-full w-full"
                [src]="trustYouTubeUrl(post()!.youtubeEmbedUrl!)"
                title="YouTube video"
                loading="lazy"
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
              </iframe>
            </div>
          </section>
        }

        <div class="mt-12 pt-8 border-t border-gh-border flex flex-col gap-12">
          <div>
            <div class="flex flex-wrap gap-2">
              @for (tag of post()!.tags; track tag) {
                <span class="bg-gh-bg-secondary border border-gh-border text-gh-text-secondary px-3 py-1 rounded-full text-sm hover:text-gh-link hover:border-gh-link cursor-pointer transition-colors">#{{ tag }}</span>
              }
            </div>
          </div>

          <div>
            <h3 class="text-sm font-semibold text-gh-text mb-4">{{ t()('blog.share') }}</h3>
            <div class="flex flex-wrap gap-3">
              <a [href]="'https://twitter.com/intent/tweet?text=' + shareTitle(post()!) + '&url=' + shareUrl(post()!)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="X (Twitter)"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
              <a [href]="'https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl(post()!)" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>
              <a href="mailto:?subject=Check%20this%20out&body=Check%20out%20this%20article" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Email"><mat-icon class="text-[18px] w-[18px] h-[18px]">mail</mat-icon></a>
            </div>
          </div>

          <div class="flex items-center justify-between pt-4">
            <div class="flex-1">
              @if (nextPost()) {
                <a [routerLink]="['/blog', nextPost()!.id]" class="group inline-flex items-center gap-2 text-sm text-gh-text-secondary hover:text-gh-link transition-colors">
                  <span class="font-medium">{{ t()('blog.nextPost') }}:</span>
                  <span class="truncate max-w-[150px] md:max-w-xs">{{ nextPost()!.title }}</span>
                  <mat-icon class="text-[16px] w-[16px] h-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
                </a>
              }
            </div>
            <button (click)="scrollToTop()" class="flex items-center gap-1 text-sm text-gh-text-secondary hover:text-gh-text transition-colors">
              <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_upward</mat-icon>
              {{ t()('blog.scrollTop') }}
            </button>
          </div>
        </div>
      </article>
    }
  `
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  private i18n = inject(I18nService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  
  t = this.i18n.t;
  post = signal<BlogPostFull | null>(null);
  nextPost = signal<{ id: number; title: string } | null>(null);
  loading = signal(true);

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = Number(params.get('id'));
      if (id) {
        await this.blogService.loadPosts();
        const fullPost = await this.blogService.loadFullPost(id);
        this.post.set(fullPost);
        const next = this.blogService.getNextPost(id);
        this.nextPost.set(next ? { id: next.id, title: next.title } : null);
        this.scrollToTop(false);
        
        // Inject dynamic SEO meta tags for this blog post
        if (fullPost && isPlatformBrowser(this.platformId)) {
          this.injectDynamicMeta(fullPost);
        }
      }
      this.loading.set(false);
    });
  }

  private injectDynamicMeta(post: BlogPostFull): void {
    // Remove existing dynamic meta
    document.querySelectorAll('meta[name="dynamic-seo"]').forEach(el => el.remove());
    document.getElementById('article-jsonld')?.remove();
    document.getElementById('og-dynamic')?.remove();

    // 1. Update Page Title
    document.title = `${post.title} — OpenSIN Blog`;

    // 2. Update Meta Description
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute('content', post.excerpt || post.title);
      desc.setAttribute('name', 'dynamic-seo');
    }

    // 3. Update Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://me.delqhi.com/blog/${post.slug}`);
    canonical.setAttribute('name', 'dynamic-seo');

    // 4. Inject Open Graph Tags
    const ogTags = [
      { property: 'og:title', content: `${post.title} — OpenSIN Blog` },
      { property: 'og:description', content: post.excerpt || post.title },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: `https://me.delqhi.com/blog/${post.slug}` },
      { property: 'og:site_name', content: 'OpenSIN' },
      { property: 'og:locale', content: 'de_DE' },
      { property: 'article:published_time', content: post.date },
      { property: 'article:author', content: post.author || 'OpenSIN Team' },
      { property: 'article:section', content: post.category || 'AI Agents' },
    ];

    if (post.imageUrl) {
      ogTags.push({ property: 'og:image', content: post.imageUrl });
      ogTags.push({ property: 'og:image:alt', content: post.title });
    }

    const ogContainer = document.createElement('div');
    ogContainer.id = 'og-dynamic';
    ogContainer.style.display = 'none';
    document.body.appendChild(ogContainer);

    for (const tag of ogTags) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', tag.property);
      meta.setAttribute('content', tag.content);
      meta.setAttribute('name', 'dynamic-seo');
      document.head.appendChild(meta);
    }

    // 5. Inject Article JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author || "OpenSIN Team",
        "url": "https://me.delqhi.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "OpenSIN",
        "logo": {
          "@type": "ImageObject",
          "url": "https://me.delqhi.com/LOGO-OpenSIN-8K-transparent.png"
        }
      },
      "datePublished": post.date,
      "dateModified": post.date,
      "url": `https://me.delqhi.com/blog/${post.slug}`,
      "mainEntityOfPage": `https://me.delqhi.com/blog/${post.slug}`,
      "keywords": post.tags.join(", "),
      "articleSection": post.category || "AI Agents",
      "inLanguage": "de"
    };

    if (post.imageUrl) {
      Object.assign(jsonLd, {
        "image": {
          "@type": "ImageObject",
          "url": post.imageUrl,
          "caption": post.title
        }
      });
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-jsonld';
    script.text = JSON.stringify(jsonLd, null, 2);
    document.head.appendChild(script);
  }

  scrollToTop(smooth = true) {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }

  trustYouTubeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  shareUrl(p: { id: number; title: string }): string {
    return encodeURIComponent(`https://me.delqhi.com/blog/${p.id}`);
  }

  shareTitle(p: { title: string }): string {
    return encodeURIComponent(p.title);
  }
}
