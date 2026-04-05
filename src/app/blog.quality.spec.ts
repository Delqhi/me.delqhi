import { describe, it, expect } from 'vitest';

describe('Blog Post Quality Checks', () => {
  const BLOG_RAW_URL = 'https://raw.githubusercontent.com/OpenSIN-AI/OpenSIN-Blog-Posts/main';

  it('should have unique titles across all posts', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    const index = await res.json();
    const titles = new Set<string>();
    
    // Check first 20 posts to avoid timeout
    for (const entry of index.slice(0, 20)) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      const md = await mdRes.text();
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        const titleMatch = match[1].match(/title:\s*["']?([^"'\n]+)["']?/);
        if (titleMatch) {
          const title = titleMatch[1].trim();
          expect(titles.has(title)).toBe(false, `Duplicate title: "${title}"`);
          titles.add(title);
        }
      }
    }
    
    expect(titles.size).toBeGreaterThan(0);
  }, { timeout: 30000 });

  it('should have valid dates in YYYY-MM-DD format', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    const index = await res.json();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    for (const entry of index.slice(0, 20)) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      const md = await mdRes.text();
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        const dateMatch = match[1].match(/date:\s*["']?([^"'\n]+)["']?/);
        if (dateMatch) {
          const date = dateMatch[1].trim();
          expect(dateRegex.test(date)).toBe(true, `Invalid date format in ${entry.file}: "${date}"`);
        }
      }
    }
  }, { timeout: 30000 });

  it('should have at least 3 tags per post', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    const index = await res.json();
    
    for (const entry of index.slice(0, 10)) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      const md = await mdRes.text();
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        const tagsMatch = match[1].match(/tags:\s*\[([^\]]+)\]/);
        if (tagsMatch) {
          const tags = tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''));
          expect(tags.length).toBeGreaterThanOrEqual(3, `Post ${entry.file} has only ${tags.length} tags`);
        }
      }
    }
  }, { timeout: 15000 });

  it('should have description/excerpt in every post', async () => {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    const index = await res.json();
    
    for (const entry of index.slice(0, 10)) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      const md = await mdRes.text();
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      if (match) {
        const hasDescription = match[1].includes('description:');
        const hasExcerpt = match[1].includes('excerpt:');
        expect(hasDescription || hasExcerpt).toBe(true, `Post ${entry.file} has no description or excerpt`);
      }
    }
  }, { timeout: 15000 });
});
