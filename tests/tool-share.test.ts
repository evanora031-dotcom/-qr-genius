import assert from 'node:assert/strict';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { getToolShareUrl } from '../src/utils/toolShare';
import { ToolLandingPage } from '../src/pages/ToolLandingPage';
import type { Language } from '../src/types';

const locales: Language[] = ['en', 'ar', 'fr', 'es'];
const paths = {
  url: '/tools/url',
  wifi: '/tools/wifi',
  whatsapp: '/tools/whatsapp',
  business: '/tools/business-vcard'
} as const;

test('share links point only to public canonical tool pages in all four languages', () => {
  for (const lang of locales) {
    for (const [tool, path] of Object.entries(paths)) {
      const expected = `https://getqrgenius.com${lang === 'en' ? '' : `/${lang}`}${path}`;
      assert.equal(getToolShareUrl(tool as keyof typeof paths, lang), expected);
      assert.doesNotMatch(expected, /\?|#/);
    }
  }
});

test('each QR tool offers a localized, accessible share action', () => {
  const labels: Record<Language, string> = {
    en: 'Share this free tool',
    ar: 'شارك هذه الأداة المجانية',
    fr: 'Partager cet outil gratuit',
    es: 'Compartir esta herramienta gratis'
  };
  for (const lang of locales) {
    for (const tool of Object.keys(paths) as (keyof typeof paths)[]) {
      const html = renderToStaticMarkup(
        React.createElement(ToolLandingPage, {
          tool, lang, onNavigate: () => {}, onHistoryUpdated: () => {}
        })
      );
      assert.ok(html.includes(labels[lang]), `Missing share label for ${lang}/${tool}`);
      assert.match(html, /min-h-11/);
      assert.match(html, /type="button"/);
    }
  }
});

test('share URLs never contain user-provided QR payloads', () => {
  const url = getToolShareUrl('wifi', 'ar');
  assert.ok(!url.includes('password'));
  assert.ok(!url.includes('ssid'));
  assert.equal(url, 'https://getqrgenius.com/ar/tools/wifi');
});
