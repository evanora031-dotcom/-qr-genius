import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { SEO_METADATA } from '../src/utils/seo';

const languages = ['en', 'ar', 'fr', 'es'] as const;
const pages = ['home', 'generator', 'image-compressor', 'images-to-pdf', 'pdf-merge', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
const base = 'https://getqrgenius.com';

function localized(path: string, lang: typeof languages[number]) {
  return base + (lang === 'en' ? path : path === '/' ? '/' + lang + '/' : '/' + lang + path);
}

function builtFile(path: string, lang: typeof languages[number]) {
  const route = lang === 'en' ? path : path === '/' ? '/' + lang + '/' : '/' + lang + path;
  return 'dist/' + (route.endsWith('/') ? route.slice(1) + 'index.html' : route.slice(1) + '.html');
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function headLinks(html: string, relation: string) {
  const head = html.split('</head>')[0];
  return [...head.matchAll(/<link\b[^>]*>/g)]
    .map(match => match[0])
    .filter(tag => new RegExp('\\brel="' + relation + '"').test(tag));
}

test('all localized pages have self canonical and reciprocal hreflang, matching sitemap', () => {
  const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
  for (const page of pages) {
    const paths = Object.fromEntries(languages.map(lang => [lang, localized(SEO_METADATA[page][lang].canonicalPath, lang)]));
    for (const lang of languages) {
      const file = builtFile(SEO_METADATA[page][lang].canonicalPath, lang);
      const html = readFileSync(file, 'utf8');
      const canonical = headLinks(html, 'canonical');
      assert.equal(canonical.length, 1, file + ': expected exactly one canonical');
      assert.ok(canonical[0].includes('href="' + paths[lang] + '"'), file + ': canonical mismatch');
      const alternate = headLinks(html, 'alternate');
      assert.equal(alternate.length, languages.length + 1, file + ': expected four language alternates and x-default');
      for (const target of [...languages, 'x-default'] as const) {
        const expected = target === 'x-default' ? paths.en : paths[target];
        const matching = alternate.filter(tag => tag.includes('hreflang="' + target + '"'));
        assert.equal(matching.length, 1, file + ': duplicate or missing hreflang=' + target);
        assert.ok(matching[0].includes('href="' + expected + '"'), file + ': incorrect hreflang=' + target);
        assert.ok(sitemap.includes('hreflang="' + target + '" href="' + expected + '"'), file + ': sitemap alternate mismatch');
      }
      assert.ok(sitemap.includes('<loc>' + paths[lang] + '</loc>'), file + ': missing sitemap URL');
    }
  }
});
