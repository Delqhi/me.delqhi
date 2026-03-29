import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink],
  template: `
    <div class="flex flex-col gap-4">
      <!-- Search and Filter -->
      <div class="flex flex-col md:flex-row gap-4 border-b border-gh-border pb-4">
        <div class="flex-1">
          <input type="text" [placeholder]="t()('projects.find')" class="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-gh-link focus:ring-1 focus:ring-gh-link text-gh-text placeholder-gh-text-secondary transition-all">
        </div>
        <div class="flex gap-2">
          <button class="bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-1.5 px-4 rounded-md hover:bg-gh-btn-hover transition-colors text-sm flex items-center gap-2">
            {{ t()('projects.type') }} <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_drop_down</mat-icon>
          </button>
          <button class="bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-1.5 px-4 rounded-md hover:bg-gh-btn-hover transition-colors text-sm flex items-center gap-2">
            {{ t()('projects.language') }} <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_drop_down</mat-icon>
          </button>
          <button class="bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-1.5 px-4 rounded-md hover:bg-gh-btn-hover transition-colors text-sm flex items-center gap-2">
            {{ t()('projects.sort') }} <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_drop_down</mat-icon>
          </button>
          <button class="bg-gh-green text-white font-medium py-1.5 px-4 rounded-md hover:bg-gh-green-hover transition-colors text-sm flex items-center gap-2 ml-2">
            <mat-icon class="text-[16px] w-[16px] h-[16px]">book</mat-icon> {{ t()('projects.new') }}
          </button>
        </div>
      </div>

      <!-- Repository List -->
      <div class="flex flex-col">
        @for (repo of repositories; track repo.name) {
          <div class="py-6 border-b border-gh-border flex justify-between items-start">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <a href="#" class="text-xl text-gh-link font-semibold hover:underline">{{ repo.name }}</a>
                <span class="border border-gh-border rounded-full px-2 py-0.5 text-xs text-gh-text-secondary font-medium">{{ repo.visibility === 'Public' ? 'Public' : 'Private' }}</span>
              </div>
              @if (repo.description) {
                <p class="text-sm text-gh-text-secondary max-w-2xl">{{ repo.description }}</p>
              }
              <div class="flex items-center gap-4 text-xs text-gh-text-secondary mt-2">
                @if (repo.language) {
                  <div class="flex items-center gap-1">
                    <span class="w-3 h-3 rounded-full inline-block" [style.backgroundColor]="repo.languageColor"></span>
                    <span>{{ repo.language }}</span>
                  </div>
                }
                @if (repo.stars > 0) {
                  <a href="#" class="hover:text-gh-link flex items-center gap-1"><mat-icon class="text-[14px] w-[14px] h-[14px]">star_border</mat-icon> {{ repo.stars }}</a>
                }
                @if (repo.forks > 0) {
                  <a href="#" class="hover:text-gh-link flex items-center gap-1"><mat-icon class="text-[14px] w-[14px] h-[14px]">call_split</mat-icon> {{ repo.forks }}</a>
                }
                <span>{{ t()('projects.updated') }} {{ repo.updatedAt }}</span>
              </div>
            </div>
            <div class="flex flex-col items-end gap-2">
              <button class="bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-1 px-3 rounded-md hover:bg-gh-btn-hover transition-colors text-xs flex items-center gap-1">
                <mat-icon class="text-[14px] w-[14px] h-[14px]">star_border</mat-icon> {{ t()('projects.star') }}
                <div class="border-l border-gh-border pl-2 ml-1 flex items-center">
                  <mat-icon class="text-[14px] w-[14px] h-[14px]">arrow_drop_down</mat-icon>
                </div>
              </button>
              <!-- Activity graph placeholder -->
              <div class="w-32 h-8 flex items-end gap-0.5 opacity-50">
                @for (bar of repo.activity; track $index) {
                  <div class="w-1 bg-green-500 rounded-t-sm" [style.height.%]="bar"></div>
                }
              </div>
            </div>
          </div>
        }
      </div>

      <div class="mt-12 pt-8 border-t border-gh-border flex flex-col gap-12 animate-in fade-in duration-500">
        <div>
          <div class="flex flex-wrap gap-2">
            @for (tag of repositoryTags; track tag) {
              <span class="bg-gh-bg-secondary border border-gh-border text-gh-text-secondary px-3 py-1 rounded-full text-sm hover:text-gh-link hover:border-gh-link cursor-pointer transition-colors">{{ tag }}</span>
            }
          </div>
        </div>

        <div class="flex items-center justify-between pt-4">
          <div class="flex-1">
            <a routerLink="/blog" class="group inline-flex items-center gap-2 text-sm text-gh-text-secondary hover:text-gh-link transition-colors">
              <mat-icon class="text-[16px] w-[16px] h-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</mat-icon>
              <span class="font-medium">{{ t()('overview.allPosts') }}</span>
            </a>
          </div>
          <button (click)="scrollToTop()" class="flex items-center gap-1 text-sm text-gh-text-secondary hover:text-gh-text transition-colors">
            <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_upward</mat-icon>
            {{ t()('blog.scrollTop') }}
          </button>
          <div class="flex-1 flex justify-end">
            <a routerLink="/readme" class="group inline-flex items-center gap-2 text-sm text-gh-text-secondary hover:text-gh-link transition-colors">
              <span class="font-medium">{{ t()('nav.readme') }}</span>
              <mat-icon class="text-[16px] w-[16px] h-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</mat-icon>
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectsComponent {
  private i18n = inject(I18nService);
  t = this.i18n.t;

  repositoryTags = ['Angular', 'Cloudflare', 'CSS', 'JavaScript', 'Node.js', 'Tailwind', 'TypeScript'];

  repositories = [
    {
      name: 'enterprise-angular-starter',
      visibility: 'Public',
      description: 'A comprehensive starter kit for building enterprise-grade Angular applications with best practices.',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 124,
      forks: 32,
      updatedAt: '2 days ago',
      activity: [10, 20, 15, 40, 30, 60, 50, 80, 70, 90, 100, 85, 60, 40, 20]
    },
    {
      name: 'minimax-ui-clone',
      visibility: 'Public',
      description: 'Recreation of the Minimax enterprise UI using Tailwind CSS and Angular.',
      language: 'CSS',
      languageColor: '#563d7c',
      stars: 89,
      forks: 12,
      updatedAt: 'last week',
      activity: [5, 10, 5, 20, 15, 30, 25, 40, 35, 50, 60, 45, 30, 20, 10]
    },
    {
      name: 'personal-blog',
      visibility: 'Public',
      description: 'Source code for my personal blog and portfolio, hosted on Cloudflare.',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 45,
      forks: 0,
      updatedAt: '3 weeks ago',
      activity: [20, 30, 40, 50, 60, 70, 80, 90, 100, 90, 80, 70, 60, 50, 40]
    },
    {
      name: 'delqhi-core',
      visibility: 'Private',
      description: 'Core infrastructure and utilities for Delqhi projects.',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 0,
      forks: 0,
      updatedAt: 'last month',
      activity: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
    },
    {
      name: 'awesome-web-architecture',
      visibility: 'Public',
      description: 'A curated list of awesome articles, videos, and resources about web architecture.',
      language: null,
      languageColor: null,
      stars: 342,
      forks: 56,
      updatedAt: '2 months ago',
      activity: [50, 40, 30, 20, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 90]
    }
  ];

  scrollToTop(smooth = true) {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  }
}
