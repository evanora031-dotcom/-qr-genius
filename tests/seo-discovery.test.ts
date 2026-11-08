import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GeneratorPage } from '../src/pages/GeneratorPage';
import { SEO_METADATA } from '../src/utils/seo';
import type { Language } from '../src/types';

const read = (file: string) => readFileSync(new URL(file, import.meta.url), 'utf8');
const languages: Language[] = ['en', 'ar', 'fr', 'es'];
const pages = ['home', 'generator', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
const url = (path: string, lang: Language) =>
  'https://getqrgenius.com' + (lang === 'en' ? path : path === '/' ? `/${lang}/` : `/${lang}${path}`);

test('tracked sitemap exactly matches the sitemap published by the build', () => {
  const tracked = read('../sitemap.xml');
  const publishedSource = read('../public/sitemap.xml');
  const generated = read('../dist/sitemap.xml');
  assert.equal(tracked, publishedSource);
  assert.equal(publishedSource, generated);
  assert.doesNotMatch(generated, /pages\.dev/);
  assert.equal((generated.match(/<loc>/g) || []).length, 52);
  for (const page of pages) {
    for (const lang of languages) {
      const expected = url(SEO_METADATA[page][lang].canonicalPath, lang);
      assert.ok(generated.includes(`<loc>${expected}</loc>`), `Missing canonical sitemap URL ${expected}`);
    }
  }
});

test('built pages expose their canonical and localized metadata before JavaScript', () => {
  for (const lang of languages) {
    const route = lang === 'en' ? '../dist/generator.html' : `../dist/${lang}/generator.html`;
    const html = read(route);
    const canonical = url('/generator', lang);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), `Missing canonical: ${lang}`);
    assert.ok(html.includes(`<link rel="alternate" hreflang="${lang}" href="${canonical}"`));
    assert.ok(html.includes(SEO_METADATA.generator[lang].description));
    assert.ok(html.includes('<h1>'), `Missing prerendered heading: ${lang}`);
    assert.ok(html.includes('<a href='), `Missing crawlable links: ${lang}`);
  }
});

test('QR Studio guide links to four specialized tools in all supported languages', () => {
  for (const lang of languages) {
    const html = renderToStaticMarkup(React.createElement(GeneratorPage, {
      lang, onNavigate: () => {}, onHistoryUpdated: () => {}
    }));
    assert.match(html, /id="generator-guide-heading"/);
    for (const path of ['/tools/url', '/tools/wifi', '/tools/whatsapp', '/tools/business-vcard']) {
      const href = lang === 'en' ? path : `/${lang}${path}`;
      assert.ok(html.includes(`href="${href}"`), `Missing ${lang} link to ${path}`);
    }
    assert.match(html, /<ol\b/);
  }
});

import { ToolLandingPage } from '../src/pages/ToolLandingPage';

test('related tool pages expose crawlable localized links to the other three tools', () => {
  const toolPaths = { url: '/tools/url', wifi: '/tools/wifi', whatsapp: '/tools/whatsapp', business: '/tools/business-vcard' } as const;
  for (const lang of languages) {
    for (const tool of Object.keys(toolPaths) as Array<keyof typeof toolPaths>) {
      const html = renderToStaticMarkup(React.createElement(ToolLandingPage, {
        tool, lang, onNavigate: () => {}, onHistoryUpdated: () => {}
      }));
      for (const [other, path] of Object.entries(toolPaths)) {
        if (other === tool) continue;
        const href = lang === 'en' ? path : `/${lang}${path}`;
        assert.ok(html.includes(`href="${href}"`), `Missing related link from ${lang}/${tool} to ${href}`);
      }
    }
  }
});


test('blog index and all three Arabic articles are discoverable and canonical', () => {
  const slugs = ['business-card-qr-code-guide', 'wifi-qr-code-for-guests', 'whatsapp-qr-code-for-customers'];
  const sitemap = read('../dist/sitemap.xml');
  const index = read('../dist/blog/index.html');
  assert.match(index, /<link rel="canonical" href="https:\/\/getqrgenius.com\/blog\/"\s*\/?\s*>/);
  assert.ok(sitemap.includes('<loc>https://getqrgenius.com/blog/</loc>'));
  for (const slug of slugs) {
    const canonical = 'https://getqrgenius.com/blog/' + slug;
    const html = read('../dist/blog/' + slug + '.html');
    assert.ok(sitemap.includes('<loc>' + canonical + '</loc>'));
    assert.ok(html.includes('rel="canonical" href="' + canonical + '"'));
    const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    const objects = scripts.flatMap(match => {
      const value = JSON.parse(match[1]);
      return Array.isArray(value) ? value : [value];
    });
    const article = objects.find(value => value['@type'] === 'Article');
    assert.ok(article, 'Missing Article JSON-LD for ' + slug);
    assert.equal(article.mainEntityOfPage, canonical);
    assert.equal(article.inLanguage, 'ar');
  }
});
