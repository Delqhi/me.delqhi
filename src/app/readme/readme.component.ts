import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-readme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col gap-6">
      <!-- README Section -->
      <div class="border border-gh-border rounded-md bg-gh-bg">
        <div class="flex items-center justify-between px-4 py-2 border-b border-gh-border bg-gh-bg-secondary rounded-t-md">
          <div class="text-xs font-semibold text-gh-text">jeremyschulze / README.md</div>
          <button class="text-gh-text-secondary hover:text-gh-link"><mat-icon class="text-[16px] w-[16px] h-[16px]">edit</mat-icon></button>
        </div>
        <div class="p-8 prose prose-invert max-w-none">
          <h1 class="text-3xl font-bold border-b border-gh-border pb-2 mb-4">{{ t()('overview.hi') }}</h1>
          <p class="text-lg text-gh-text-secondary mb-4">
            {{ t()('overview.welcome') }}
          </p>
          <ul class="list-disc pl-5 space-y-2 text-gh-text">
            <li>🔭 {{ t()('overview.workingOn') }} <strong>OpenSIN-AI</strong></li>
            <li>⚡ {{ t()('overview.expertise') }}: <strong>{{ t()('overview.expertiseValue') }}</strong></li>
            <li>🛠️ {{ t()('overview.techStack') }}: <strong>Go, Python, TypeScript, JavaScript, PHP</strong></li>
            <li>🧠 {{ t()('overview.frameworks') }}: <strong>LangGraph, Angular, Next.js, Node.js</strong></li>
            <li>💬 {{ t()('overview.askMe') }}: <strong>{{ t()('overview.askMeValue') }}</strong></li>
            <li>📫 {{ t()('overview.reachMe') }}: <a href="mailto:contact@jeremyschulze.com" class="text-gh-link hover:underline">contact&#64;jeremyschulze.com</a></li>
          </ul>
        </div>
      </div>
    </div>
  `
})
export class ReadmeComponent {
  i18n = inject(I18nService);
  t = this.i18n.t;
}
