import { ChangeDetectionStrategy, computed, Component, inject, input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-gh-border pb-4">
        <h2 class="text-2xl font-semibold text-gh-text">{{ t()('blog.title') }}</h2>
        <div class="flex gap-2">
          <input type="text" [placeholder]="t()('blog.search')" class="bg-gh-bg border border-gh-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-gh-link focus:ring-1 focus:ring-gh-link text-gh-text placeholder-gh-text-secondary transition-all w-64" (input)="searchQuery.set($any($event.target).value)">
        </div>
      </div>

      <div class="flex flex-col gap-6 mt-2">
        @for (post of posts(); track post.id) {
          <a [routerLink]="['/blog', post.id]" class="border border-gh-border rounded-md bg-gh-bg hover:border-gray-500 transition-colors cursor-pointer group flex flex-col md:flex-row overflow-hidden block">
            
            @if (showImages()) {
              <!-- Blog Image -->
              <div class="w-full md:w-1/3 h-48 md:h-auto shrink-0 border-b md:border-b-0 md:border-r border-gh-border bg-gh-bg-secondary overflow-hidden">
                <img [src]="post.imageUrl" [alt]="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerpolicy="no-referrer">
              </div>
            }

            <!-- Blog Content -->
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2 text-xs text-gh-text-secondary">
                  <mat-icon class="text-[16px] w-[16px] h-[16px] text-green-500">check_circle</mat-icon>
                  <span>{{ t()('blog.publishedOn') }} {{ post.date }}</span>
                  <span>·</span>
                  <span>{{ post.readTime }} {{ t()('blog.minRead') }}</span>
                </div>
                <div class="flex gap-2">
                  @for (tag of post.tags; track tag) {
                    <span class="bg-gh-btn-bg border border-gh-border text-gh-text-secondary px-2 py-0.5 rounded-full text-xs">{{ tag }}</span>
                  }
                </div>
              </div>
              
              <h3 class="text-xl font-semibold text-gh-text group-hover:text-gh-link transition-colors mt-1">{{ post.title }}</h3>
              
              <p class="text-sm text-gh-text-secondary mt-3 line-clamp-2 flex-1">
                {{ post.excerpt }}
              </p>
            </div>

          </a>
        }
      </div>

      @if (showFooter()) {
        <!-- Footer -->
        <div class="mt-12 pt-8 border-t border-gh-border flex flex-col gap-12 animate-in fade-in duration-500">
          
          <!-- Hashtags -->
          <div>
            <div class="flex flex-wrap gap-2">
              @for (tag of blogTags; track tag) {
                <span class="bg-gh-bg-secondary border border-gh-border text-gh-text-secondary px-3 py-1 rounded-full text-sm hover:text-gh-link hover:border-gh-link cursor-pointer transition-colors">#{{ tag }}</span>
              }
            </div>
          </div>

          <!-- Share -->
          <div>
            <h3 class="text-sm font-semibold text-gh-text mb-4">{{ t()('blog.share') }}</h3>
            <div class="flex flex-wrap gap-3">
              <a [href]="'https://twitter.com/intent/tweet?text=' + shareTitle() + '&url=' + shareUrl()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="X (Twitter)"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
              <a [href]="'https://www.linkedin.com/sharing/share-offsite/?url=' + shareUrl()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>
              <a [href]="'https://www.facebook.com/sharer/sharer.php?u=' + shareUrl()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Facebook"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a [href]="'https://reddit.com/submit?url=' + shareUrl() + '&title=' + shareTitle()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Reddit"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.688-.561-1.249-1.249-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg></a>
              <a [href]="'https://wa.me/?text=' + shareTitle() + '%20' + shareUrl()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="WhatsApp"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
              <a [href]="'https://t.me/share/url?url=' + shareUrl() + '&text=' + shareTitle()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Telegram"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.888-.662 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
              <a [href]="'https://news.ycombinator.com/submitlink?u=' + shareUrl()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Hacker News"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"/></svg></a>
              <a [href]="'https://pinterest.com/pin/create/button/?url=' + shareUrl() + '&description=' + shareTitle()" target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Pinterest"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg></a>
              <a href="mailto:?subject=Check%20this%20out&body=Check%20out%20this%20article" class="w-10 h-10 rounded-full border border-gh-border flex items-center justify-center text-gh-text-secondary hover:text-gh-text hover:bg-gh-bg-secondary transition-colors" title="Email"><mat-icon class="text-[18px] w-[18px] h-[18px]">mail</mat-icon></a>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="bg-gh-bg-secondary border border-gh-border rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex-1">
              <h3 class="text-base font-semibold text-gh-text mb-1">{{ t()('blog.newsletterTitle') }}</h3>
              <p class="text-sm text-gh-text-secondary">{{ t()('blog.newsletterDesc') }}</p>
            </div>
            <form (submit)="subscribe($event)" class="flex w-full md:w-auto gap-2">
              @if (isSubscribed()) {
                <div class="flex items-center gap-2 text-green-500 text-sm font-medium px-4 py-2">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">check_circle</mat-icon>
                  {{ t()('blog.subscribed') }}
                </div>
              } @else {
                <input type="email" required [placeholder]="t()('blog.newsletterPlaceholder')" class="flex-1 md:w-64 bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-gh-link focus:ring-1 focus:ring-gh-link text-gh-text placeholder-gh-text-secondary transition-all">
                <button type="submit" class="bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-2 px-4 rounded-md hover:bg-gh-btn-hover hover:border-gray-500 transition-colors text-sm whitespace-nowrap">
                  {{ t()('blog.subscribe') }}
                </button>
              }
            </form>
          </div>

          <!-- Bottom Actions -->
          <div class="flex items-center justify-between pt-4">
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
  t = this.i18n.t;
  showImages = input(true);
  showFooter = input(true);

  searchQuery = signal('');
  posts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.blogService.posts;
    return this.blogService.posts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.excerpt.toLowerCase().includes(query)
    );
  });

  blogTags = ['SoftwareEngineering', 'WebDevelopment', 'OpenSource', 'AI', 'Tech'];
  isSubscribed = signal(false);

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage.getItem('newsletter_subscribed') === 'true') {
      this.isSubscribed.set(true);
    }
  }

  scrollToTop(smooth = true) {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }

  shareUrl(): string {
    return encodeURIComponent('https://me.delqhi.com/blog');
  }

  shareTitle(): string {
    return encodeURIComponent('Check out this blog post');
  }

  subscribe(event: Event) {
    event.preventDefault();
    this.isSubscribed.set(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('newsletter_subscribed', 'true');
    }
  }
}
