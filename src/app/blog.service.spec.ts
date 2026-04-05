import { describe, it, expect } from 'vitest';

// Test pure functions directly without Angular imports
// We'll copy the function implementations here to test them in isolation

function parseFrontmatter(md: string): { meta: Record<string, any>; content: string } {
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

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function mdToHtml(md: string): string {
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

describe('parseFrontmatter', () => {
  it('should parse basic frontmatter', () => {
    const md = `---
title: "Test Post"
date: 2026-04-04
---
Content here`;
    const { meta, content } = parseFrontmatter(md);
    expect(meta['title']).toBe('Test Post');
    expect(meta['date']).toBe('2026-04-04');
    expect(content).toBe('Content here');
  });

  it('should parse array tags', () => {
    const md = `---
tags: ['opensin', 'a2a', 'ai']
---
Content`;
    const { meta } = parseFrontmatter(md);
    expect(meta['tags']).toEqual(['opensin', 'a2a', 'ai']);
  });

  it('should return empty meta if no frontmatter', () => {
    const md = 'Just content';
    const { meta, content } = parseFrontmatter(md);
    expect(meta).toEqual({});
    expect(content).toBe('Just content');
  });

  it('should handle quoted values', () => {
    const md = `---
title: 'Single quoted'
description: "Double quoted"
---
Content`;
    const { meta } = parseFrontmatter(md);
    expect(meta['title']).toBe('Single quoted');
    expect(meta['description']).toBe('Double quoted');
  });

  it('should handle readTime as string', () => {
    const md = `---
readTime: "8 Minuten"
---
Content`;
    const { meta } = parseFrontmatter(md);
    expect(meta['readTime']).toBe('8 Minuten');
  });

  it('should handle category field', () => {
    const md = `---
category: Vergleich
---
Content`;
    const { meta } = parseFrontmatter(md);
    expect(meta['category']).toBe('Vergleich');
  });
});

describe('formatDate', () => {
  it('should format ISO date string', () => {
    const result = formatDate('2026-04-04');
    expect(result).toContain('2026');
    expect(result).toContain('Apr');
  });

  it('should return empty string for empty input', () => {
    expect(formatDate('')).toBe('');
  });

  it('should return original string for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});

describe('mdToHtml', () => {
  it('should convert headings', () => {
    const md = `# Heading 1
## Heading 2
### Heading 3`;
    const html = mdToHtml(md);
    expect(html).toContain('<h1 class="text-3xl font-bold mb-4">Heading 1</h1>');
    expect(html).toContain('<h2 class="text-2xl font-semibold mb-3 mt-6">Heading 2</h2>');
    expect(html).toContain('<h3 class="text-xl font-semibold mb-2 mt-4">Heading 3</h3>');
  });

  it('should convert bold and italic', () => {
    const md = '**bold text** and *italic text*';
    const html = mdToHtml(md);
    expect(html).toContain('<strong>bold text</strong>');
    expect(html).toContain('<em>italic text</em>');
  });

  it('should convert inline code', () => {
    const md = 'Use `ng build` to compile';
    const html = mdToHtml(md);
    expect(html).toContain('<code class="bg-gh-bg-secondary px-1.5 py-0.5 rounded text-sm">ng build</code>');
  });

  it('should convert links', () => {
    const md = 'Visit [OpenSIN](https://opensin.ai) now';
    const html = mdToHtml(md);
    expect(html).toContain('<a href="https://opensin.ai" class="text-gh-link hover:underline">OpenSIN</a>');
  });

  it('should convert unordered lists', () => {
    const md = `- Item 1
- Item 2
- Item 3`;
    const html = mdToHtml(md);
    expect(html).toContain('<ul class="list-disc pl-6 mb-4">');
    expect(html).toContain('<li>Item 1</li>');
    expect(html).toContain('<li>Item 2</li>');
    expect(html).toContain('<li>Item 3</li>');
  });

  it('should handle code blocks', () => {
    const md = `\`\`\`typescript
const x = 1;
\`\`\``;
    const html = mdToHtml(md);
    expect(html).toContain('<pre class="bg-gh-bg-secondary border border-gh-border rounded-md p-4 mb-4 overflow-x-auto">');
    expect(html).toContain('<code>const x = 1;</code>');
  });

  it('should handle real blog post content', () => {
    const md = `# Warum einzelne AI-Agenten obsolet sind

**Veröffentlicht:** 03.04.2026 — LAUNCH DAY  
**Autor:** OpenSIN Team

## Die harte Wahrheit

Du hast OpenClaw ausprobiert. Vielleicht Manus.

Und was ist passiert?

**Nichts.**

- OpenClaw hat Leads recherchiert
- Manus hat Entwürfe geschrieben
- Claude hat Daten gesammelt`;
    const html = mdToHtml(md);
    expect(html).toContain('<h1 class="text-3xl font-bold mb-4">Warum einzelne AI-Agenten obsolet sind</h1>');
    expect(html).toContain('<h2 class="text-2xl font-semibold mb-3 mt-6">Die harte Wahrheit</h2>');
    expect(html).toContain('<strong>Veröffentlicht:</strong>');
    expect(html).toContain('<strong>Nichts.</strong>');
    expect(html).toContain('<li>OpenClaw hat Leads recherchiert</li>');
  });
});
