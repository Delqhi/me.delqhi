import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpensinBannerComponent } from '../opensin-banner/opensin-banner.component';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpensinBannerComponent],
  template: `
    <div class="flex flex-col gap-6">
      <app-opensin-banner
        badgeText="Premium"
        title="MyOpenSIN"
        subtitle="Your personal AI agent workspace."
        description="Host, manage, and scale your own agent teams with dedicated infrastructure, priority support, and advanced analytics."
        ctaText="Get MyOpenSIN"
        bannerHref="https://my.opensin.ai">
      </app-opensin-banner>
    </div>
  `
})
export class ProjectsComponent {
}
