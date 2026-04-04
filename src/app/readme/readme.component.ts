import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { marked } from 'marked';
import { OpensinBannerComponent } from '../opensin-banner/opensin-banner.component';

const RAW_README_URL = 'https://raw.githubusercontent.com/Delqhi/delqhi/main/README.md';

@Component({
  selector: 'app-readme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, CommonModule, OpensinBannerComponent],
  template: `
    <div class="flex flex-col gap-6">
      <div class="border border-gh-border rounded-md bg-gh-bg">
        <div class="flex items-center justify-between px-4 py-2 border-b border-gh-border bg-gh-bg-secondary rounded-t-md">
          <div class="text-xs font-semibold text-gh-text">Delqhi / README.md</div>
          <a href="https://github.com/Delqhi/delqhi/blob/main/README.md" target="_blank" rel="noopener" class="text-gh-text-secondary hover:text-gh-link">
            <mat-icon class="text-[16px] w-[16px] h-[16px]">open_in_new</mat-icon>
          </a>
        </div>
        @if (loading()) {
          <div class="flex items-center justify-center py-16 text-gh-text-secondary">
            <span>Loading README...</span>
          </div>
        } @else if (error()) {
          <div class="p-8 text-red-400">
            <p>Failed to load README.</p>
            <p class="text-sm text-gh-text-secondary mt-2">{{ error() }}</p>
            <a href="https://github.com/Delqhi/delqhi" target="_blank" class="text-gh-link text-sm mt-2 inline-block">View on GitHub →</a>
          </div>
        } @else {
          <div class="markdown-body readme-content" [innerHTML]="html()"></div>
        }
      </div>

      <app-opensin-banner></app-opensin-banner>
    </div>
  `
})
export class ReadmeComponent implements OnInit {
  html = signal('');
  loading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const res = await fetch(RAW_README_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const md = await res.text();
      this.html.set(await marked(md, {
        breaks: true,
        gfm: true
      }));
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.loading.set(false);
    }
  }
}
