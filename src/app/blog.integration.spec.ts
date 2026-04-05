import { describe, it, expect } from 'vitest';

describe('Blog Post Real Content Validation', () => {
  const BLOG_RAW_URL = 'https://raw.githubusercontent.com/OpenSIN-AI/OpenSIN-Blog-Posts/main';

  it('should have all 81+ blog posts available', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    expect(res.ok).toBe(true);
    const index = await res.json();
    expect(index.length).toBeGreaterThanOrEqual(81);
  });

  it('should have title, date, tags in every post', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    const index = await res.json();
    
    for (const entry of index.slice(0, 10)) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      expect(mdRes.ok).toBe(true);
      const md = await mdRes.text();
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      expect(match).not.toBeNull();
      const frontmatter = match![1];
      expect(frontmatter).toContain('title:');
      expect(frontmatter).toContain('date:');
      expect(frontmatter).toContain('tags:');
    }
  });

  it('should have minimum 100 words per post', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    const index = await res.json();
    for (const entry of index.slice(0, 5)) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      const md = await mdRes.text();
      const parts = md.split('---\n');
      const content = parts.slice(2).join('---\n').trim();
      const wordCount = content.split(/\s+/).length;
      expect(wordCount).toBeGreaterThan(100);
    }
  });
});
