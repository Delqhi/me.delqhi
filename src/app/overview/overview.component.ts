import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n.service';
import { ProfileSidebarComponent } from '../profile-sidebar/profile-sidebar.component';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, RouterLink, ProfileSidebarComponent, BlogComponent],
  template: `
    <div class="flex flex-col gap-6">
      <app-profile-sidebar class="mb-4 block"></app-profile-sidebar>
      
      <app-blog [showFooter]="false" [maxPosts]="5"></app-blog>
      
      <div class="flex justify-center mt-4 mb-8">
        <a routerLink="/blog" class="text-sm font-medium text-gh-link hover:underline flex items-center gap-1">
          {{ t()('overview.allPosts') }}
          <mat-icon class="text-[16px] w-[16px] h-[16px]">arrow_forward</mat-icon>
        </a>
      </div>
    </div>
  `
})
export class OverviewComponent {
  i18n = inject(I18nService);
  t = this.i18n.t;
}
