import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opensin-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <a [href]="bannerHref()" target="_blank" rel="noopener noreferrer" class="block group opensin-banner">
      <div class="banner-inner">
        <div class="banner-grid">
          <div class="banner-content">
            <div class="banner-badge">
              <span class="badge-dot"></span>
              <span class="badge-text">{{ badgeText() }}</span>
            </div>
            <h2 class="banner-title">{{ title() }}</h2>
            <p class="banner-subtitle">{{ subtitle() }}</p>
            <p class="banner-desc">{{ description() }}</p>
            <div class="banner-cta">
              <span>{{ ctaText() }}</span>
              <svg class="cta-arrow" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z"/>
              </svg>
            </div>
          </div>
          <div class="banner-visual">
            <div class="visual-grid">
              <div class="grid-cell cell-1"></div>
              <div class="grid-cell cell-2"></div>
              <div class="grid-cell cell-3"></div>
              <div class="grid-cell cell-4"></div>
              <div class="grid-cell cell-5"></div>
              <div class="grid-cell cell-6"></div>
            </div>
          </div>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .opensin-banner {
      display: block;
      text-decoration: none;
      color: inherit;
    }
    .banner-inner {
      --banner-bg: var(--gh-bg-secondary);
      --banner-border: rgba(16, 185, 129, 0.15);
      --banner-border-hover: rgba(16, 185, 129, 0.35);
      --banner-title: var(--gh-text);
      --banner-subtitle: var(--gh-text-secondary);
      --banner-desc: var(--gh-text-secondary);
      --banner-badge-bg: rgba(16, 185, 129, 0.06);
      --banner-badge-border: rgba(16, 185, 129, 0.2);
      --banner-badge-text: #10b981;
      --banner-cta: #10b981;
      --banner-glow: rgba(16, 185, 129, 0.08);
      --banner-cell-bg: rgba(16, 185, 129, 0.04);
      --banner-cell-border: rgba(16, 185, 129, 0.12);
      --banner-cell-hover: rgba(16, 185, 129, 0.25);
      --banner-top-line: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent);
      position: relative;
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--banner-border);
      background: var(--banner-bg);
      padding: 2.5rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    :root.dark .banner-inner {
      --banner-bg: linear-gradient(180deg, rgba(16, 185, 129, 0.04) 0%, rgba(9, 9, 11, 0.95) 100%);
      --banner-border: rgba(16, 185, 129, 0.15);
      --banner-border-hover: rgba(16, 185, 129, 0.35);
      --banner-title: #f4f4f5;
      --banner-subtitle: #a1a1aa;
      --banner-desc: #71717a;
      --banner-badge-bg: rgba(16, 185, 129, 0.06);
      --banner-badge-border: rgba(16, 185, 129, 0.2);
      --banner-badge-text: #10b981;
      --banner-cta: #10b981;
      --banner-glow: rgba(16, 185, 129, 0.08);
      --banner-cell-bg: rgba(16, 185, 129, 0.04);
      --banner-cell-border: rgba(16, 185, 129, 0.12);
      --banner-cell-hover: rgba(16, 185, 129, 0.25);
      --banner-top-line: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent);
    }
    .group:hover .banner-inner {
      border-color: var(--banner-border-hover);
      box-shadow: 0 0 40px var(--banner-glow);
    }
    .banner-inner::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--banner-top-line);
    }
    .banner-grid {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      align-items: center;
    }
    .banner-content {
      position: relative;
      z-index: 1;
    }
    .banner-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--banner-badge-border);
      background: var(--banner-badge-bg);
      margin-bottom: 1rem;
    }
    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
    .badge-text {
      font-size: 0.7rem;
      font-weight: 500;
      color: var(--banner-badge-text);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }
    .banner-title {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--banner-title);
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
    }
    .banner-subtitle {
      font-size: 0.95rem;
      color: var(--banner-subtitle);
      margin: 0 0 0.5rem;
      line-height: 1.5;
    }
    .banner-desc {
      font-size: 0.8rem;
      color: var(--banner-desc);
      margin: 0 0 1.25rem;
      line-height: 1.6;
      max-width: 480px;
    }
    .banner-cta {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--banner-cta);
      transition: gap 0.2s ease;
    }
    .group:hover .banner-cta {
      gap: 10px;
    }
    .cta-arrow {
      transition: transform 0.2s ease;
    }
    .group:hover .cta-arrow {
      transform: translateX(2px);
    }
    .banner-visual {
      position: relative;
      width: 180px;
      height: 120px;
    }
    .visual-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      gap: 6px;
      width: 100%;
      height: 100%;
    }
    .grid-cell {
      border-radius: 6px;
      border: 1px solid var(--banner-cell-border);
      background: var(--banner-cell-bg);
      transition: border-color 0.3s ease, background 0.3s ease;
    }
    .group:hover .grid-cell {
      border-color: var(--banner-cell-hover);
    }
    .cell-1 { animation: cellPulse 3s ease-in-out infinite 0s; }
    .cell-2 { animation: cellPulse 3s ease-in-out infinite 0.3s; }
    .cell-3 { animation: cellPulse 3s ease-in-out infinite 0.6s; }
    .cell-4 { animation: cellPulse 3s ease-in-out infinite 0.9s; }
    .cell-5 { animation: cellPulse 3s ease-in-out infinite 1.2s; }
    .cell-6 { animation: cellPulse 3s ease-in-out infinite 1.5s; }
    @keyframes cellPulse {
      0%, 100% { background: var(--banner-cell-bg); }
      50% { background: var(--banner-cell-hover); }
    }
    @media (max-width: 640px) {
      .banner-grid {
        grid-template-columns: 1fr;
      }
      .banner-visual {
        display: none;
      }
      .banner-inner {
        padding: 1.5rem;
      }
      .banner-title {
        font-size: 1.4rem;
      }
    }
  `]
})
export class OpensinBannerComponent {
  badgeText = input('Open Source');
  title = input('OpenSIN');
  subtitle = input('100+ autonomous AI agents. 18 specialized teams. One platform.');
  description = input('The first Agent-to-Agent network where specialists communicate, coordinate, and execute without human intervention.');
  ctaText = input('Explore OpenSIN');
  bannerHref = input('https://opensin.ai');
}
