import { ChangeDetectionStrategy, Component, inject, input, signal, computed, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n.service';
import { BlogService, BlogPost } from '../blog.service';

@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-gh-border pb-4">
        <h2 class="text-2xl font-semibold text-gh-text">{{ t()('blog.title') }}</h2>
        <div class="flex gap-2">
          <input type="text" [placeholder]="t()('blog.search')" class="bg-gh-bg border border-gh-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-gh-link focus:ring-1 focus:ring-gh-link text-gh-text placeholder-gh-text-secondary transition-all w-48" (input)="searchQuery.set($any($event.target).value)">
        </div>
      </div>

      @if (loading()) {
        <div class="flex items-center justify-center py-16 text-gh-text-secondary">
          <mat-icon class="text-[24px] w-[24px] h-[24px] animate-spin mr-2">sync</mat-icon>
          <span>Loading posts...</span>
        </div>
      } @else if (error()) {
        <div class="flex flex-col items-center justify-center py-16 text-gh-text-secondary gap-4">
          <p>{{ error() }}</p>
          <button (click)="retry()" class="text-gh-link hover:underline text-sm">Retry</button>
        </div>
      } @else {
        @if (categories().length > 0) {
          <div class="flex flex-wrap gap-2 pb-2">
            <button (click)="selectedCategory.set('')" [class]="selectedCategory() === '' ? 'bg-gh-link text-white border-gh-link' : 'bg-gh-bg-secondary text-gh-text-secondary border-gh-border hover:text-gh-link hover:border-gh-link'" class="border rounded-full px-3 py-1 text-sm transition-colors">
              Alle
            </button>
            @for (cat of categories(); track cat) {
              <button (click)="selectedCategory.set(cat)" [class]="selectedCategory() === cat ? 'bg-gh-link text-white border-gh-link' : 'bg-gh-bg-secondary text-gh-text-secondary border-gh-border hover:text-gh-link hover:border-gh-link'" class="border rounded-full px-3 py-1 text-sm transition-colors">
                {{ cat }}
              </button>
            }
          </div>
        }

        @if (posts().length === 0) {
          <div class="flex items-center justify-center py-16 text-gh-text-secondary">
            <span>Keine Beiträge gefunden.</span>
          </div>
        } @else {
          <div class="flex flex-col gap-6 mt-2">
            @for (post of posts(); track post.id) {
              <a [routerLink]="['/blog', post.id]" class="border border-gh-border rounded-md bg-gh-bg hover:border-gray-500 transition-colors cursor-pointer group flex flex-col md:flex-row overflow-hidden block">
                <div class="p-5 flex flex-col flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2 text-xs text-gh-text-secondary">
                      <mat-icon class="text-[16px] w-[16px] h-[16px] text-green-500">check_circle</mat-icon>
                      <span>{{ post.date }}</span>
                      @if (post.readTime) {
                        <span>·</span>
                        <span>{{ post.readTime }}</span>
                      }
                      @if (post.category) {
                        <span>·</span>
                        <span class="text-gh-link">{{ post.category }}</span>
                      }
                    </div>
                    <div class="flex gap-2">
                      @for (tag of post.tags.slice(0, 3); track tag) {
                        <span class="bg-gh-btn-bg border border-gh-border text-gh-text-secondary px-2 py-0.5 rounded-full text-xs">{{ tag }}</span>
                      }
                    </div>
                  </div>
                  
                  <h3 class="text-xl font-semibold text-gh-text group-hover:text-gh-link transition-colors mt-1">{{ post.title }}</h3>
                  
                  @if (post.excerpt) {
                    <p class="text-sm text-gh-text-secondary mt-3 line-clamp-2 flex-1">
                      {{ post.excerpt }}
                    </p>
                  }
                </div>
              </a>
            }
          </div>
        }
      }

      @if (showFooter() && !loading() && !error()) {
        <div class="mt-12 pt-8 border-t border-gh-border flex flex-col gap-12 animate-in fade-in duration-500">
          <div>
            <h3 class="text-sm font-semibold text-gh-text mb-4">{{ t()('blog.share') }}</h3>
            <div class="flex flex-wrap gap-3">
              <a [href]="'https://twitter.com/intent/tweet?text=' + shareTitle() + '&url=' + shareUrl()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="X (Twitter)"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
              <a href="mailto:?subject=Check%20this%20out&body=Check%20out%20this%20article" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Email"><mat-icon class="text-[18px] w-[18px] h-[18px]">mail</mat-icon></a>
            </div>
          </div>

          <div class="mt-12 pt-8 border-t border-gh-border flex items-center justify-between">
            <div class="flex-1">
              <a routerLink="/projects" class="group inline-flex items-center gap-2 text-sm text-gh-text-secondary hover:text-gh-link transition-colors">
                <mat-icon class="text-[16px] w-[16px] h-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</mat-icon>
                <span class="font-medium">{{ t()('blog.stealthProjects') }}</span>
              </a>
            </div>
            <button (click)="scrollToTop()" class="flex items-center gap-1 text-sm text-gh-text-secondary hover:text-gh-text transition-colors">
              <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_upward</mat-icon>
              {{ t()('blog.scrollTop') }}
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class BlogComponent implements OnInit {
  private i18n = inject(I18nService);
  private blogService = inject(BlogService);
  private platformId = inject(PLATFORM_ID);
  t = this.i18n.t;
  showFooter = input(true);
  maxPosts = input(0);

  searchQuery = signal('');
  selectedCategory = signal('');
  loading = signal(true);
  error = signal<string | null>(null);
  allPosts = signal<BlogPost[]>([]);
  
  categories = computed(() => {
    const cats = new Set<string>();
    for (const post of this.allPosts()) {
      if (post.category) cats.add(post.category);
    }
    return Array.from(cats).sort();
  });

  posts = computed(() => {
    let list = this.allPosts();
    const query = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();
    const max = this.maxPosts();
    
    if (cat) {
      list = list.filter(p => p.category === cat);
    }
    if (query) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    if (max > 0) {
      list = list.slice(0, max);
    }
    return list;
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.loadPosts(), 100);
    }
  }

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      this.loading.set(false);
    }
  }

  private async loadPosts() {
    this.loading.set(true);
    this.error.set(null);
    try {
      const posts = await this.blogService.loadPosts();
      this.allPosts.set(posts);
      if (posts.length === 0) {
        this.error.set('No blog posts found.');
      }
    } catch (e) {
      this.error.set(`Failed to load blog posts: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      this.loading.set(false);
    }
  }

  retry() { this.loadPosts(); }

  scrollToTop(smooth = true) {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }

  shareUrl(): string { return encodeURIComponent('https://me.delqhi.com/blog'); }
  shareTitle(): string { return encodeURIComponent('Check out this blog post'); }
}
