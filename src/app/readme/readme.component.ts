import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-readme',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="flex flex-col gap-6">
      <div class="border border-gh-border rounded-md bg-gh-bg">
        <div class="flex items-center justify-between px-4 py-2 border-b border-gh-border bg-gh-bg-secondary rounded-t-md">
          <div class="text-xs font-semibold text-gh-text">jeremyschulze / README.md</div>
          <button class="text-gh-text-secondary hover:text-gh-link"><mat-icon class="text-[16px] w-[16px] h-[16px]">edit</mat-icon></button>
        </div>
        <div class="p-8 prose prose-invert max-w-none space-y-8">
          <section>
            <h1 class="text-3xl font-bold border-b border-gh-border pb-2 mb-4">me.delqhi.com</h1>
            <p class="text-lg text-gh-text-secondary mb-4">
              Personal portfolio and blog for Jeremy Schulze. This site is styled like GitHub and presents the Open Source projects, blog articles, and README-style profile content in one place.
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">What this is</h2>
            <ul class="list-disc pl-5 space-y-2 text-gh-text">
              <li>GitHub-like personal website</li>
              <li>Blog index and article pages</li>
              <li>Open Source / projects overview</li>
              <li>README-style profile page</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">Routes</h2>
            <ul class="list-disc pl-5 space-y-2 text-gh-text">
              <li><code>/</code> — overview</li>
              <li><code>/projects</code> — open source repositories</li>
              <li><code>/blog</code> — article list</li>
              <li><code>/blog/:id</code> — article detail</li>
              <li><code>/readme</code> — in-app README view</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">Stack</h2>
            <ul class="list-disc pl-5 space-y-2 text-gh-text">
              <li>Angular 21</li>
              <li>TypeScript</li>
              <li>Angular Material</li>
              <li>Signals and standalone components</li>
            </ul>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">Run locally</h2>
            <pre class="bg-gh-bg-secondary border border-gh-border rounded-md p-4 overflow-x-auto text-sm"><code>npm install
npm run dev</code></pre>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">Useful scripts</h2>
            <pre class="bg-gh-bg-secondary border border-gh-border rounded-md p-4 overflow-x-auto text-sm"><code>npm run lint
npm run build
npm test</code></pre>
          </section>

          <section>
            <h2 class="text-xl font-semibold mb-3">Notes</h2>
            <ul class="list-disc pl-5 space-y-2 text-gh-text">
              <li>The site is styled like GitHub.</li>
              <li>The navigation highlights Open Source, Blog, and README content.</li>
              <li>Content is intentionally personal and portfolio-focused.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  `
})
export class ReadmeComponent {
}
