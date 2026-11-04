import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_METADATA } from '../src/utils/seo.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const template = await readFile(path.join(distDir, 'index.html'), 'utf8');

const locales = ['en', 'ar', 'fr', 'es'] as const;
const pages = ['home', 'generator', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
const baseUrl = 'https://getqrgenius.com';

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function localizedPath(pagePath: string, locale: string): string {
  if (locale === 'en') return pagePath;
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
  html = html.replace('"url": "https://qr-genius-1on.pages.dev/"', '"url": "https://getqrgenius.com/"');
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

// Generate the sitemap from the same localized route metadata used for canonical tags.
// This keeps sitemap URLs and hreflang alternates in sync with prerendered pages.
function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&apos;');
}

const sitemapEntries = pages.flatMap((page) =>
  locales.map((locale) => {
    const canonicalPath = SEO_METADATA[page][locale].canonicalPath;
    const loc = `${baseUrl}${localizedPath(canonicalPath, locale)}`;
    const alternates = locales.map((alternateLocale) => {
      const alternatePath = localizedPath(SEO_METADATA[page][alternateLocale].canonicalPath, alternateLocale);
      return `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(`${baseUrl}${alternatePath}`)}" />`;
    });
    const defaultPath = localizedPath(SEO_METADATA[page].en.canonicalPath, 'en');
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${baseUrl}${defaultPath}`)}" />`);
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n${alternates.join('\n')}\n  </url>`;
  })
);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapEntries,
  '</urlset>',
  ''
].join('\n');

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${sitemapEntries.length} canonical localized URLs.`);
