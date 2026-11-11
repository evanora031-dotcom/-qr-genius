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
const pages = ['home', 'generator', 'image-compressor', 'images-to-pdf', 'pdf-merge', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
const url = (path: string, lang: Language) =>
  'https://getqrgenius.com' + (lang === 'en' ? path : path === '/' ? `/${lang}/` : `/${lang}${path}`);

test('tracked sitemap exactly matches the sitemap published by the build', () => {
  const tracked = read('../sitemap.xml');
  const publishedSource = read('../public/sitemap.xml');
  const generated = read('../dist/sitemap.xml');
  assert.equal(tracked, publishedSource);
  assert.equal(publishedSource, generated);
  assert.doesNotMatch(generated, /pages\.dev/);
  const canonicalUrls = [...generated.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(canonicalUrls.length, pages.length * languages.length + 8);
  assert.equal(new Set(canonicalUrls).size, canonicalUrls.length, 'Sitemap contains duplicate canonical URLs');
  for (const blogPath of ['/en/blog/', '/en/blog/how-to-make-wifi-qr-code-for-guests.html', '/en/blog/how-to-create-whatsapp-qr-code-for-customers.html', '/en/blog/how-to-make-business-card-qr-code']) {
    assert.ok(canonicalUrls.includes('https://getqrgenius.com' + blogPath), `Missing English blog URL ${blogPath}`);
  }
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
    const scripts = [...html.matchAll(new RegExp('<script type="application/ld\\+json">([\\s\\S]*?)</script>', 'g'))];
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


test('English blog index and first guide are built with matching canonical links', () => {
  const index = read('../dist/en/blog/index.html');
  const article = read('../dist/en/blog/how-to-make-wifi-qr-code-for-guests.html');
  assert.match(index, /<html lang="en">/);
  assert.ok(index.includes('rel="canonical" href="https://getqrgenius.com/en/blog/"'));
  assert.ok(index.includes('href="/en/blog/how-to-make-wifi-qr-code-for-guests.html"'));
  assert.ok(article.includes('rel="canonical" href="https://getqrgenius.com/en/blog/how-to-make-wifi-qr-code-for-guests.html"'));
  assert.ok(article.includes('href="/tools/wifi"'));
  const whatsapp = read('../dist/en/blog/how-to-create-whatsapp-qr-code-for-customers.html');
  assert.ok(index.includes('href="/en/blog/how-to-create-whatsapp-qr-code-for-customers.html"'));
  assert.ok(whatsapp.includes('rel="canonical" href="https://getqrgenius.com/en/blog/how-to-create-whatsapp-qr-code-for-customers.html"'));
  assert.ok(whatsapp.includes('href="/tools/whatsapp"'));
  const vcard = read('../dist/en/blog/how-to-make-business-card-qr-code.html');
  assert.ok(index.includes('href="/en/blog/how-to-make-business-card-qr-code"'));
  assert.ok(vcard.includes('rel="canonical" href="https://getqrgenius.com/en/blog/how-to-make-business-card-qr-code"'));
  assert.ok(vcard.includes('href="/tools/business-vcard"'));
});


test('English specialized tool pages link to their matching published blog guides', () => {
  const guidePaths = {
    wifi: '/en/blog/how-to-make-wifi-qr-code-for-guests.html',
    whatsapp: '/en/blog/how-to-create-whatsapp-qr-code-for-customers.html',
    business: '/en/blog/how-to-make-business-card-qr-code'
  } as const;
  for (const [tool, href] of Object.entries(guidePaths)) {
    const html = renderToStaticMarkup(React.createElement(ToolLandingPage, {
      tool: tool as keyof typeof guidePaths, lang: 'en', onNavigate: () => {}, onHistoryUpdated: () => {}
    }));
    assert.ok(html.includes('href="' + href + '"'), 'Missing English guide link on ' + tool);
    assert.ok(read('../dist' + href).includes('rel="canonical" href="https://getqrgenius.com' + href + '"'));
  }
});


test('English blog articles expose valid Article JSON-LD and social previews', () => {
  const slugs = ['how-to-make-wifi-qr-code-for-guests', 'how-to-create-whatsapp-qr-code-for-customers', 'how-to-make-business-card-qr-code'];
  for (const slug of slugs) {
    const canonical = 'https://getqrgenius.com/en/blog/' + slug + '.html';
    const html = read('../dist/en/blog/' + slug + '.html');
    assert.ok(html.includes('property="og:type" content="article"'));
    assert.ok(html.includes('property="og:url" content="' + canonical + '"'));
    assert.ok(html.includes('property="og:image" content="https://getqrgenius.com/og-image.png"'));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    const scripts = [...html.matchAll(new RegExp('<script type="application/ld\\+json">([\\s\\S]*?)</script>', 'g'))];
    const objects = scripts.flatMap(match => {
      const parsed = JSON.parse(match[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
    const article = objects.find(value => value['@type'] === 'Article');
    assert.ok(article, 'Missing Article JSON-LD: ' + slug);
    assert.equal(article.mainEntityOfPage, canonical);
    assert.equal(article.inLanguage, 'en');
    assert.equal(article.datePublished, '2026-11-08');
  }
});


test('blog headers omit cross-language switch links', () => {
  const arabic = read('../dist/blog/index.html');
  const english = read('../dist/en/blog/index.html');
  assert.ok(!arabic.includes('href="/en/blog/"'), 'Arabic blog unexpectedly shows English navigation');
  assert.ok(!english.includes('href="/blog/"'), 'English blog unexpectedly shows Arabic navigation');
  assert.ok(!arabic.includes('>English Blog</a>'), 'English Blog link remains in Arabic blog');
});


test('footer blog navigation respects available content languages', () => {
  const footer = read('../src/components/Footer.tsx');
  assert.ok(footer.includes("lang === 'ar' ? '/blog/' : '/en/blog/'"));
  assert.ok(footer.includes("Blog (English)"));
  assert.ok(footer.includes("Blog (inglés)"));
  const arabic = read('../dist/blog/index.html');
  const english = read('../dist/en/blog/index.html');
  assert.ok(!arabic.includes('href="/en/blog/"'));
  assert.ok(!english.includes('href="/blog/"'));
});


test('prerendered English and Arabic tool HTML links to its published guide', () => {
  const guideSlugs = {
    en: { wifi: '/en/blog/how-to-make-wifi-qr-code-for-guests.html', whatsapp: '/en/blog/how-to-create-whatsapp-qr-code-for-customers.html', business: '/en/blog/how-to-make-business-card-qr-code' },
    ar: { wifi: '/blog/wifi-qr-code-for-guests', whatsapp: '/blog/whatsapp-qr-code-for-customers', business: '/blog/business-card-qr-code-guide' }
  } as const;
  const routeSlugs = { wifi: 'wifi', whatsapp: 'whatsapp', business: 'business-vcard' } as const;
  for (const lang of ['en', 'ar'] as const) {
    for (const tool of ['wifi', 'whatsapp', 'business'] as const) {
      const route = (lang === 'en' ? '' : 'ar/') + 'tools/' + routeSlugs[tool] + '.html';
      const html = read('../dist/' + route);
      const href = guideSlugs[lang][tool];
      assert.ok(html.includes('href="' + href + '"'), 'Missing prerendered guide link: ' + route);
      const guideFile = '../dist' + href + (lang === 'ar' || (lang === 'en' && tool === 'business') ? '.html' : '');
      const articleCanonicalPath = href;
      assert.ok(read(guideFile).includes('rel="canonical" href="https://getqrgenius.com' + articleCanonicalPath + '"'));
    }
  }
});


test('every non-home localized page includes a canonical BreadcrumbList in built HTML', () => {
  for (const lang of languages) {
    for (const page of pages) {
      if (page === 'home') continue;
      const canonicalPath = SEO_METADATA[page][lang].canonicalPath;
      const route = (lang === 'en' ? '' : lang + '/') + canonicalPath.slice(1) + '.html';
      const html = read('../dist/' + route);
      const jsonScripts = [...html.matchAll(new RegExp('<script type="application/ld\\+json">([\\s\\S]*?)</script>', 'g'))];
      const objects = jsonScripts.flatMap(match => {
        const value = JSON.parse(match[1]);
        return Array.isArray(value) ? value : [value];
      });
      const breadcrumb = objects.find(value => value['@type'] === 'BreadcrumbList');
      assert.ok(breadcrumb, 'Missing BreadcrumbList on ' + route);
      assert.equal(breadcrumb.itemListElement.length, 2);
      assert.equal(breadcrumb.itemListElement[0].item, url('/', lang));
      assert.equal(breadcrumb.itemListElement[1].item, url(canonicalPath, lang));
    }
  }
});
