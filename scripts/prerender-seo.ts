import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_METADATA } from '../src/utils/seo.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const locales = ['en', 'ar', 'fr', 'es'] as const;
const pages = ['home', 'generator', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
const baseUrl = 'https://qr-genius-1on.pages.dev';

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function localizedPath(pagePath: string, locale: string): string {
  return pagePath === '/' ? `/${locale}/` : `/${locale}${pagePath}`;
}

function setHeadTag(html: string, pattern: RegExp, tag: string): string {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function renderPage(locale: typeof locales[number], page: typeof pages[number]): string {
  const meta = SEO_METADATA[page][locale];
  const canonicalPath = localizedPath(meta.canonicalPath, locale);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  let html = template.replace(/<html\s+lang="[^"]*">/, `<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = setHeadTag(html, /<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = setHeadTag(html, /<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  html = setHeadTag(html, /<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]+"\s*\/?>/g, '');
  const alternates = locales.map((altLocale) =>
    `  <link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${localizedPath(meta.canonicalPath, altLocale)}" />`
  );
  alternates.push(`  <link rel="alternate" hreflang="x-default" href="${baseUrl}${localizedPath(meta.canonicalPath, 'en')}" />`);
  html = html.replace('</head>', `${alternates.join('\n')}\n</head>`);
  html = html.replace('"url": "https://qr-genius-1on.pages.dev/"', `"url": "${canonicalUrl}"`);
  return html;
}

let generated = 0;
for (const page of pages) {
  for (const locale of locales) {
    const route = localizedPath(SEO_METADATA[page][locale].canonicalPath, locale);
    const relativeDir = route.replace(/^\/+|\/+$/g, '');
    const outputDir = path.join(distDir, relativeDir);
    await mkdir(outputDir, { recursive: true });
    await writeFile(path.join(outputDir, 'index.html'), renderPage(locale, page), 'utf8');
    generated += 1;
  }
}

// The root fallback is the English home page; locale-prefixed URLs have their own static metadata.
await writeFile(path.join(distDir, 'index.html'), renderPage('en', 'home'), 'utf8');
console.log(`Generated ${generated} localized HTML entry points with page-specific SEO metadata.`);
