#!/usr/bin/env node
// Generate sitemap.xml from blog posts repo
import { writeFileSync } from 'fs';

const BLOG_RAW_URL = 'https://raw.githubusercontent.com/OpenSIN-AI/OpenSIN-Blog-Posts/main';
const BASE_URL = 'https://me.delqhi.com';

async function generateSitemap() {
  try {
    const res = await fetch(`${BLOG_RAW_URL}/index.json`);
    if (!res.ok) {
      console.error('Failed to fetch index.json');
      return;
    }
    
    const index = await res.json();
    
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

    for (const entry of index) {
      const mdRes = await fetch(`${BLOG_RAW_URL}/${entry.file}`);
      if (!mdRes.ok) continue;
      
      const md = await mdRes.text();
      const match = md.match(/^---\n([\s\S]*?)\n---/);
      if (!match) continue;
      
      const frontmatter = match[1];
      const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);
      const dateMatch = frontmatter.match(/date:\s*["']?([^"'\n]+)["']?/);
      
      const slug = entry.file.replace('.md', '');
      const title = titleMatch ? titleMatch[1].trim() : slug;
      const date = dateMatch ? dateMatch[1].trim() : new Date().toISOString().split('T')[0];
      
      xml += `  <url>
    <loc>${BASE_URL}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <news:news>
      <news:publication>
        <news:name>OpenSIN Blog</news:name>
        <news:language>de</news:language>
      </news:publication>
      <news:publication_date>${date}</news:publication_date>
      <news:title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>
    </news:news>
  </url>
`;
    }

    xml += `</urlset>\n`;
    
    writeFileSync('src/sitemap.xml', xml);
    console.log(`✅ Generated sitemap.xml with ${index.length} blog posts`);
  } catch (err) {
    console.error('Failed to generate sitemap:', err);
  }
}

generateSitemap();
