import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  category?: string;
  author?: string;
}

export interface BlogPostFull extends BlogPost {
  content: string;
  imageUrl: string;
  youtubeEmbedUrl?: string;
}

const BLOG_RAW_URL = 'https://raw.githubusercontent.com/OpenSIN-AI/OpenSIN-Blog-Posts/main';

export function parseFrontmatter(md: string): { meta: Record<string, any>; content: string } {
  const match = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: md };
  const meta: Record<string, any> = {};
  match[1].split('\n').forEach(line => {
    const colon = line.indexOf(':');
    if (colon === -1) return;
    const key = line.slice(0, colon).trim();
    let val = line.slice(colon + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      try {
        const jsonStr = val.replace(/'/g, '"');
        val = JSON.parse(jsonStr);
      } catch { /* keep as string */ }
    }
    meta[key] = val;
  });
  return { meta, content: match[2].trim() };
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

export function mdToHtml(md: string): string {
  const lines = md.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeContent = '';
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      html += `<ul class="list-disc pl-6 mb-4">${listItems.map(i => `<li>${i}</li>`).join('')}</ul>`;
      listItems = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        html += `<pre class="bg-gh-bg-secondary border border-gh-border rounded-md p-4 mb-4 overflow-x-auto"><code>${codeContent.trim()}</code></pre>`;
        codeContent = '';
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }
    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }
    if (line.startsWith('# ')) {
      flushList();
      html += `<h1 class="text-3xl font-bold mb-4">${line.slice(2)}</h1>`;
    } else if (line.startsWith('## ')) {
      flushList();
      html += `<h2 class="text-2xl font-semibold mb-3 mt-6">${line.slice(3)}</h2>`;
    } else if (line.startsWith('### ')) {
      flushList();
      html += `<h3 class="text-xl font-semibold mb-2 mt-4">${line.slice(4)}</h3>`;
    } else if (line.startsWith('- ')) {
      listItems.push(line.slice(2));
    } else if (line.trim() === '') {
      flushList();
    } else {
      flushList();
      let processed = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code class="bg-gh-bg-secondary px-1.5 py-0.5 rounded text-sm">$1</code>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-gh-link hover:underline">$1</a>');
      html += `<p class="mb-4">${processed}</p>`;
    }
  }
  flushList();
  return html;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  posts: BlogPost[] = [];
  private platformId = inject(PLATFORM_ID);
  private fullPostsCache = new Map<number, BlogPostFull>();

  async loadPosts(): Promise<BlogPost[]> {
    if (!isPlatformBrowser(this.platformId)) return [];
    if (this.posts.length > 0) return this.posts;

    try {
      const res = await fetch(`${BLOG_RAW_URL}/index.json`);
      if (!res.ok) return [];
      const index: Array<{ file: string }> = await res.json();

      const results = await Promise.all(
        index.map(async (entry, i) => {
          const file = entry.file;
          const mdRes = await fetch(`${BLOG_RAW_URL}/${file}`);
          if (!mdRes.ok) return null;
          const md = await mdRes.text();
          const { meta } = parseFrontmatter(md);
          const slug = file.replace('.md', '');
          return {
            id: i + 1,
            slug,
            title: meta['title'] || slug,
            date: formatDate(meta['date'] || ''),
            readTime: meta['readTime'] || '',
            tags: Array.isArray(meta['tags']) ? meta['tags'] : [],
            excerpt: meta['description'] || meta['excerpt'] || '',
            category: meta['category'] || '',
            author: meta['author'] || '',
          } as BlogPost;
        })
      );

      this.posts = results.filter(Boolean).reverse() as BlogPost[];
    } catch {
      this.posts = [];
    }

    return this.posts;
  }

  async loadFullPost(id: number): Promise<BlogPostFull | null> {
    if (this.fullPostsCache.has(id)) {
      return this.fullPostsCache.get(id)!;
    }

    const post = this.posts.find(p => p.id === id);
    if (!post) return null;

    try {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${post.slug}.md`);
      if (!mdRes.ok) return null;
      const md = await mdRes.text();
      const { meta, content } = parseFrontmatter(md);

      const fullPost: BlogPostFull = {
        ...post,
        content: mdToHtml(content),
        imageUrl: meta['imageUrl'] || '',
        youtubeEmbedUrl: meta['youtubeEmbedUrl'] || undefined,
      };

      this.fullPostsCache.set(id, fullPost);
      return fullPost;
    } catch {
      return null;
    }
  }

  getPost(id: number): BlogPost | undefined {
    return this.posts.find(p => p.id === id);
  }

  getNextPost(id: number): BlogPost | null {
    const index = this.posts.findIndex(p => p.id === id);
    return index >= 0 && index < this.posts.length - 1 ? this.posts[index + 1] : null;
  }
}
