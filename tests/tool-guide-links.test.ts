import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ToolLandingPage } from '../src/pages/ToolLandingPage';

const articles = {
  ar: {
    wifi: '/blog/wifi-qr-code-for-guests',
    whatsapp: '/blog/whatsapp-qr-code-for-customers',
    business: '/blog/business-card-qr-code-guide'
  },
  en: {
    wifi: '/en/blog/how-to-make-wifi-qr-code-for-guests.html',
    whatsapp: '/en/blog/how-to-create-whatsapp-qr-code-for-customers.html',
    business: '/en/blog/how-to-make-business-card-qr-code.html'
  }
} as const;

test('specialized QR tools link to existing canonical guides in Arabic and English', () => {
  for (const lang of ['ar', 'en'] as const) {
    for (const tool of ['wifi', 'whatsapp', 'business'] as const) {
      const href = articles[lang][tool];
      const markup = renderToStaticMarkup(React.createElement(ToolLandingPage, {
        tool, lang, onNavigate: () => {}, onHistoryUpdated: () => {}
      }));
      assert.ok(markup.includes('href="' + href + '"'), 'Missing ' + lang + ' guide link on ' + tool);
      const file = new URL('../public' + (lang === 'ar' ? href + '.html' : href), import.meta.url);
      assert.ok(existsSync(file), 'Missing guide file: ' + href);
      const html = readFileSync(file, 'utf8');
      assert.ok(html.includes('https://getqrgenius.com' + href), 'Missing canonical URL in ' + href);
    }
  }
});
