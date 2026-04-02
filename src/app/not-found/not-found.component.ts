import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="flex flex-col items-center justify-center min-h-[60vh] text-center py-16">
      <div class="text-8xl font-bold text-gh-text-secondary mb-4">404</div>
      <h1 class="text-2xl font-semibold text-gh-text mb-4">Page not found</h1>
      <p class="text-gh-text-secondary mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a routerLink="/" class="inline-flex items-center gap-2 bg-gh-btn-bg border border-gh-border text-gh-text font-medium py-2 px-4 rounded-md hover:bg-gh-btn-hover transition-colors text-sm">
        <mat-icon class="text-[16px] w-[16px] h-[16px]">home</mat-icon>
        Back to home
      </a>
    </div>
  `
})
export class NotFoundComponent {}
