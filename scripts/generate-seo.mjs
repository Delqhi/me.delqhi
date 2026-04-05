#!/usr/bin/env node
// Generate sitemap.xml, RSS feed, and robots.txt from blog posts
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_RAW_URL = 'https://raw.githubusercontent.com/OpenSIN-AI/OpenSIN-Blog-Posts/main';
const BASE_URL = 'https://me.delqhi.com';

async function fetchBlogPosts() {
  const res = await fetch(`${BLOG_RAW_URL}/index.json`);
  if (!res.ok) throw new Error('Failed to fetch index.json');
  return res.json();
}

async function fetchPostMeta(entry) {
  const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
  if (!mdRes.ok) return null;
  const md = await mdRes.text();
  const match = md.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatter = match[1];
  const get = (key) => {
    const m = frontmatter.match(new RegExp(`${key}:\\s*["']?([^"'\n]+)["']?`));
    return m ? m[1].trim() : '';
  };
  
  return {
    slug: entry.file.replace('.md', ''),
    title: get('title'),
    date: get('date'),
    description: get('description') || get('excerpt') || '',
    author: get('author') || 'OpenSIN Team',
    tags: get('tags'),
    category: get('category') || '',
  };
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

async function generateSitemap(posts) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${BASE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${BASE_URL}/readme</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${BASE_URL}/projects</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  for (const post of posts) {
    if (!post) continue;
    xml += `  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>OpenSIN Blog</news:name>
        <news:language>de</news:language>
      </news:publication>
      <news:publication_date>${post.date}</news:publication_date>
      <news:title>${escapeXml(post.title)}</news:title>
    </news:news>
  </url>
`;
  }

  xml += `</urlset>\n`;
  writeFileSync(join(__dirname, '..', 'public', 'sitemap.xml'), xml);
  console.log(`✅ sitemap.xml: ${posts.length} blog posts`);
}

async function generateRSS(posts) {
  const now = new Date().toUTCString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>OpenSIN Blog — AI Agent Orchestration</title>
    <description>OpenSIN: 100+ autonomous AI agents. 18 specialized teams. The first Agent-to-Agent network where specialists communicate, coordinate, and execute without human intervention.</description>
    <link>${BASE_URL}/blog</link>
    <language>de-de</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${BASE_URL}/LOGO-OpenSIN-8K-transparent.png</url>
      <title>OpenSIN Blog</title>
      <link>${BASE_URL}/blog</link>
    </image>
`;

  for (const post of posts.slice(0, 20)) {
    if (!post) continue;
    const pubDate = new Date(post.date).toUTCString();
    xml += `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>${escapeXml(post.author)}</author>
      <category>${escapeXml(post.category || 'OpenSIN')}</category>
      ${post.tags.split(',').map(t => `<category>${escapeXml(t.replace(/['"]/g, '').trim())}</category>`).join('\n      ')}
    </item>
`;
  }

  xml += `  </channel>
</rss>
`;
  writeFileSync(join(__dirname, '..', 'public', 'rss.xml'), xml);
  console.log(`✅ rss.xml: ${Math.min(posts.length, 20)} latest posts`);
}

function generateRobotsTxt() {
  const txt = `User-agent: *
Allow: /

# AI Crawlers
User-agent: GPTBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: CCBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: anthropic-ai
Allow: /
User-agent: Omgilibot
Allow: /
User-agent: ImagesiftBot
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow internal paths
Disallow: /cdn-cgi/
`;
  writeFileSync(join(__dirname, '..', 'public', 'robots.txt'), txt);
  console.log('✅ robots.txt: AI crawlers allowed');
}

async function main() {
  console.log('🚀 Generating SEO files...\n');
  
  const index = await fetchBlogPosts();
  console.log(`📦 Found ${index.length} blog posts in repo\n`);
  
  const posts = [];
  for (const entry of index) {
    const meta = await fetchPostMeta(entry);
    if (meta) posts.push(meta);
  }
  
  await generateSitemap(posts);
  await generateRSS(posts);
  generateRobotsTxt();
  
  console.log('\n✅ All SEO files generated successfully!');
}

main().catch(console.error);
