import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OpensinBannerComponent } from '../opensin-banner/opensin-banner.component';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OpensinBannerComponent],
  template: `
    <div class="flex flex-col gap-6">
      <app-opensin-banner
        badgeText="Open Source"
        title="OpenSIN"
        subtitle="100+ autonomous AI agents. 18 specialized teams. One platform."
        description="The first Agent-to-Agent network where specialists communicate, coordinate, and execute without human intervention."
        ctaText="Explore OpenSIN"
        bannerHref="https://opensin.ai">
      </app-opensin-banner>

      <app-opensin-banner
        badgeText="Premium"
        title="MyOpenSIN"
        subtitle="Your personal AI agent workspace — built for professionals who demand more."
        description="Host, manage, and scale your own agent teams with dedicated infrastructure, priority support, and advanced analytics. Stop sharing resources. Start owning your AI."
        ctaText="Start with MyOpenSIN"
        bannerHref="https://my.opensin.ai"
        [featured]="true"
        [features]="['Dedicated infrastructure', 'Priority 24/7 support', 'Advanced analytics dashboard', 'Custom agent teams', 'Enterprise-grade security']">
      </app-opensin-banner>
    </div>
  `
})
export class ProjectsComponent {
}
