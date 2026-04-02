import { Injectable } from '@angular/core';

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  readTime: number;
  tags: string[];
  excerpt: string;
  content: string;
  imageUrl: string;
  youtubeEmbedUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  posts: BlogPost[] = [
    {
      id: 1,
      title: 'Building Enterprise Angular Apps in 2026',
      date: 'Mar 23, 2026',
      readTime: 8,
      tags: ['Angular', 'Enterprise', 'Architecture'],
      excerpt: 'The landscape of Angular development has evolved significantly. In this article, we explore the best practices for building scalable, maintainable enterprise applications using the latest features in Angular 21, including zoneless change detection and signals.',
      content: '<p class="mb-4">The landscape of Angular development has evolved significantly. In this article, we explore the best practices for building scalable, maintainable enterprise applications using the latest features in Angular 21, including zoneless change detection and signals.</p><p class="mb-4">With the introduction of signals, state management has become much more intuitive. We no longer need to rely heavily on RxJS for simple state synchronization. Instead, computed signals provide a clean, reactive way to derive state.</p><p class="mb-4">Furthermore, zoneless applications offer a massive performance boost. By removing zone.js, we reduce the bundle size and eliminate unnecessary change detection cycles, leading to blazing-fast enterprise applications.</p>',
      imageUrl: 'https://picsum.photos/seed/angular-enterprise/800/400',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/AtuL_Ks4KQI'
    },
    {
      id: 2,
      title: 'The Minimalist Developer Portfolio',
      date: 'Mar 15, 2026',
      readTime: 5,
      tags: ['Design', 'Portfolio', 'UI/UX'],
      excerpt: 'Inspired by Peter Steinberger and the Minimax enterprise UI, I decided to rebuild my personal website. Here is why a GitHub-like interface might be the ultimate developer portfolio design—combining familiarity, utility, and a clean aesthetic.',
      content: '<p class="mb-4">Inspired by Peter Steinberger and the Minimax enterprise UI, I decided to rebuild my personal website. Here is why a GitHub-like interface might be the ultimate developer portfolio design—combining familiarity, utility, and a clean aesthetic.</p><p class="mb-4">Developers spend hours every day looking at GitHub. The typography, the spacing, the subtle borders—it all feels like home. By adopting this design language, a portfolio instantly communicates "I am a developer" without needing flashy animations or overwhelming colors.</p><p class="mb-4">Minimalism isn\'t just about removing things; it\'s about focusing on what matters. In a portfolio, what matters is the content: the projects, the code, and the writing.</p>',
      imageUrl: 'https://picsum.photos/seed/minimalist-design/800/400',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/HT3K-oPZTpE'
    },
    {
      id: 3,
      title: 'Deploying to Cloudflare Pages for Free',
      date: 'Feb 28, 2026',
      readTime: 6,
      tags: ['DevOps', 'Cloudflare', 'Hosting'],
      excerpt: 'A step-by-step guide on how to host your personal blog and portfolio on Cloudflare Pages for absolutely free, including setting up custom domains and automated deployments from your Git repository.',
      content: '<p class="mb-4">A step-by-step guide on how to host your personal blog and portfolio on Cloudflare Pages for absolutely free, including setting up custom domains and automated deployments from your Git repository.</p><p class="mb-4">Cloudflare Pages has revolutionized static site hosting. It offers unlimited bandwidth, fast global CDN delivery, and seamless GitHub integration, all on their generous free tier.</p><p class="mb-4">Setting it up takes less than five minutes. You simply connect your repository, specify your build command (like <code>ng build</code>), and Cloudflare handles the rest. Every push to your main branch triggers a new deployment automatically.</p>',
      imageUrl: 'https://picsum.photos/seed/cloudflare-deploy/800/400',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/5p6W3M0p3qE'
    },
    {
      id: 4,
      title: 'Why I Prefer Tailwind CSS for Component Libraries',
      date: 'Jan 12, 2026',
      readTime: 7,
      tags: ['CSS', 'Tailwind', 'Frontend'],
      excerpt: 'Tailwind CSS has become the industry standard for styling web applications. In this post, I discuss why utility-first CSS is superior for building reusable component libraries and maintaining design consistency across large teams.',
      content: '<p class="mb-4">Tailwind CSS has become the industry standard for styling web applications. In this post, I discuss why utility-first CSS is superior for building reusable component libraries and maintaining design consistency across large teams.</p><p class="mb-4">The traditional approach of writing custom CSS classes often leads to bloated stylesheets and naming conflicts. Tailwind solves this by providing a constrained set of utility classes that map directly to CSS properties.</p><p class="mb-4">When building a component library, Tailwind allows you to co-locate styles with markup. This makes components highly portable and easy to understand. With the new Tailwind v4, the performance and developer experience are better than ever.</p>',
      imageUrl: 'https://picsum.photos/seed/tailwind-css/800/400',
      youtubeEmbedUrl: 'https://www.youtube-nocookie.com/embed/4t6M4JvlKFE'
    }
  ];

  getPost(id: number) {
    return this.posts.find(p => p.id === id);
  }

  getNextPost(id: number) {
    const index = this.posts.findIndex(p => p.id === id);
    return index >= 0 && index < this.posts.length - 1 ? this.posts[index + 1] : null;
  }
}
