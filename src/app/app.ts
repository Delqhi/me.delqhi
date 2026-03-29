import { ChangeDetectionStrategy, Component, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { I18nService, Language } from './i18n.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <div class="min-h-screen flex flex-col" tabindex="0" (click)="closeMenus($event)" (keydown.escape)="closeMenus($event)">
      
      <div class="pt-8 px-4 md:px-8 max-w-4xl mx-auto w-full flex-1 flex flex-col gap-8">
        <!-- Main Content -->
        <div class="w-full flex flex-col">
          <!-- Tabs -->
          <div class="border-b border-gh-border mb-4 sticky top-0 bg-gh-bg z-10 flex justify-between items-center">
<nav class="flex gap-4" aria-label="Tabs">
              <a routerLink="/" routerLinkActive="border-gh-link text-gh-text font-semibold" [routerLinkActiveOptions]="{exact: true}" class="px-2 py-3 border-b-2 border-transparent text-gh-text-secondary hover:bg-gh-bg-secondary rounded-t-md flex items-center gap-2 text-sm transition-colors">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">menu_book</mat-icon>
                {{ t()('nav.overview') }}
              </a>
              <a routerLink="/projects" routerLinkActive="border-gh-link text-gh-text font-semibold" class="px-2 py-3 border-b-2 border-transparent text-gh-text-secondary hover:bg-gh-bg-secondary rounded-t-md flex items-center gap-2 text-sm transition-colors">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">folder_shared</mat-icon>
                {{ t()('nav.repositories') }}
                <span class="bg-gh-btn-bg text-gh-text px-2 py-0.5 rounded-full text-xs font-medium">12</span>
              </a>
              <a routerLink="/blog" routerLinkActive="border-gh-link text-gh-text font-semibold" class="px-2 py-3 border-b-2 border-transparent text-gh-text-secondary hover:bg-gh-bg-secondary rounded-t-md flex items-center gap-2 text-sm transition-colors">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">article</mat-icon>
                {{ t()('nav.blog') }}
              </a>
              <a routerLink="/readme" routerLinkActive="border-gh-link text-gh-text font-semibold" class="px-2 py-3 border-b-2 border-transparent text-gh-text-secondary hover:bg-gh-bg-secondary rounded-t-md flex items-center gap-2 text-sm transition-colors">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">info</mat-icon>
                {{ t()('nav.readme') }}
              </a>
            </nav>
            <div class="flex items-center gap-1 pr-2">
              <a href="/rss.xml" target="_blank" class="text-gh-text-secondary hover:text-gh-text transition-colors p-2 rounded-md hover:bg-gh-bg-secondary flex items-center justify-center" aria-label="RSS Feed" title="RSS Feed">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">rss_feed</mat-icon>
              </a>
              <div class="relative language-menu-container">
                <button (click)="toggleLanguageMenu($event)" class="text-gh-text-secondary hover:text-gh-text transition-colors p-2 rounded-md hover:bg-gh-bg-secondary flex items-center justify-center" aria-label="Select language" title="Select language">
                  <mat-icon class="text-[18px] w-[18px] h-[18px]">language</mat-icon>
                </button>
                
                @if (isLanguageMenuOpen()) {
                  <div class="absolute right-0 mt-2 w-48 bg-gh-bg border border-gh-border rounded-md shadow-lg z-50 py-1">
                    @for (lang of languages; track lang) {
                      <button (click)="selectLanguage(lang)" class="w-full text-left px-4 py-2 text-sm text-gh-text hover:bg-gh-btn-hover flex items-center justify-between">
                        {{ lang }}
                        @if (currentLanguage() === lang) {
                          <mat-icon class="text-[16px] w-[16px] h-[16px] text-gh-link">check</mat-icon>
                        }
                      </button>
                    }
                  </div>
                }
              </div>

              <button (click)="toggleTheme()" class="text-gh-text-secondary hover:text-gh-text transition-colors p-2 rounded-md hover:bg-gh-bg-secondary flex items-center justify-center" aria-label="Toggle theme" title="Toggle theme">
                <mat-icon class="text-[18px] w-[18px] h-[18px]">{{ isDarkMode() ? 'light_mode' : 'dark_mode' }}</mat-icon>
              </button>
            </div>
          </div>
          
          <!-- Route Content -->
          <div class="flex-1 pb-12">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="border-t border-gh-border mt-auto py-8 px-4 md:px-8 max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-between text-xs text-gh-text-secondary">
        <div class="flex items-center gap-2 mb-4 md:mb-0">
          <span>&copy; 2026 Jeremy Schulze</span>
        </div>
        <div class="flex items-center gap-6">
          <a href="https://github.com/delqhi" target="_blank" rel="noopener noreferrer" class="hover:text-gh-link transition-colors flex items-center gap-2" title="GitHub">
            <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
            <span class="sr-only">GitHub</span>
          </a>
          <a href="https://x.com/delqhi" target="_blank" rel="noopener noreferrer" class="hover:text-gh-link transition-colors flex items-center gap-2" title="X (Twitter)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
            <span class="sr-only">X</span>
          </a>
          <a href="https://linkedin.com/in/jeremyschulze" target="_blank" rel="noopener noreferrer" class="hover:text-gh-link transition-colors flex items-center gap-2" title="LinkedIn">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
            <span class="sr-only">LinkedIn</span>
          </a>
          <a href="mailto:contact@jeremyschulze.com" class="hover:text-gh-link transition-colors flex items-center gap-2" title="Email">
            <mat-icon class="text-[20px] w-[20px] h-[20px]">mail</mat-icon>
            <span class="sr-only">Email</span>
          </a>
        </div>
      </footer>
    </div>
  `,
})
export class App {
  i18n = inject(I18nService);
  t = this.i18n.t;
  
  isDarkMode = signal<boolean>(true);
  isLanguageMenuOpen = signal<boolean>(false);
  
  languages = this.i18n.availableLanguages;
  currentLanguage = this.i18n.currentLanguage;

  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light') {
        this.isDarkMode.set(false);
      } else if (storedTheme === 'dark') {
        this.isDarkMode.set(true);
      } else {
        const prefersDark = typeof window.matchMedia === 'function'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
          : false;
        this.isDarkMode.set(prefersDark);
      }

      effect(() => {
        const isDark = this.isDarkMode();
        if (isDark) {
          this.document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          this.document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }

  toggleLanguageMenu(event: Event) {
    event.stopPropagation();
    this.isLanguageMenuOpen.update(open => !open);
  }

  selectLanguage(lang: string) {
    this.i18n.setLanguage(lang as Language);
    this.isLanguageMenuOpen.set(false);
  }

  closeMenus(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-menu-container')) {
      this.isLanguageMenuOpen.set(false);
    }
  }
}
