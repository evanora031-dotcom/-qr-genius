import React from 'react';
import { QrCode, ShieldCheck, Heart } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';

const PAGE_PATHS: Partial<Record<PageId, string>> = {
  home: '/', generator: '/generator', url: '/tools/url', wifi: '/tools/wifi',
  whatsapp: '/tools/whatsapp', business: '/tools/business-vcard', about: '/about',
  contact: '/contact', privacy: '/privacy', terms: '/terms', faq: '/faq',
  sitemap: '/sitemap', robots: '/robots'
};

function localizedHref(page: PageId, lang: Language): string {
  const path = PAGE_PATHS[page] || '/';
  if (lang === 'en') return path;
  return path === '/' ? `/${lang}/` : `/${lang}${path}`;
}

interface FooterProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  const handleLink = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 sm:pt-16 pb-12 border-t border-slate-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-left rtl:text-right">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <QrCode className="w-4 h-4" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">QR GENIUS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.brand.tagline}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.brand.description}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ar' ? 'إنشاء رموز QR داخل متصفحك' : lang === 'fr' ? 'Création de QR codes dans votre navigateur' : lang === 'es' ? 'Códigos QR creados en tu navegador' : 'QR codes generated in your browser'}</span>
            </div>
          </div>

          {/* QR Tools links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.toolsTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href={localizedHref('generator', lang)} onClick={(event) => { event.preventDefault(); handleLink('generator'); }} className="hover:text-indigo-400 transition-colors">
                  {t.nav.studio}
                </a>
              </li>
              <li>
                <a href={localizedHref('url', lang)} onClick={(event) => { event.preventDefault(); handleLink('url'); }} className="hover:text-indigo-400 transition-colors">
                  {t.nav.urlQr}
                </a>
              </li>
              <li>
                <a href={localizedHref('wifi', lang)} onClick={(event) => { event.preventDefault(); handleLink('wifi'); }} className="hover:text-indigo-400 transition-colors">
                  {t.nav.wifiQr}
                </a>
              </li>
              <li>
                <a href={localizedHref('whatsapp', lang)} onClick={(event) => { event.preventDefault(); handleLink('whatsapp'); }} className="hover:text-indigo-400 transition-colors">
                  {t.nav.whatsappQr}
                </a>
              </li>
              <li>
                <a href={localizedHref('business', lang)} onClick={(event) => { event.preventDefault(); handleLink('business'); }} className="hover:text-indigo-400 transition-colors">
                  {t.nav.businessQr}
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.companyTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href={localizedHref('about', lang)} onClick={(event) => { event.preventDefault(); handleLink('about'); }} className="hover:text-indigo-400 transition-colors">
                  {t.footer.aboutUs}
                </a>
              </li>
              <li><a href={lang === 'ar' ? '/blog/' : '/en/blog/'} lang={lang === 'ar' ? 'ar' : 'en'} hrefLang={lang === 'ar' ? 'ar' : 'en'} className="hover:text-indigo-400 transition-colors">{lang === 'ar' ? 'المدونة' : lang === 'fr' ? 'Blog (English)' : lang === 'es' ? 'Blog (inglés)' : 'Blog'}</a></li>
              <li>
                <a href={localizedHref('faq', lang)} onClick={(event) => { event.preventDefault(); handleLink('faq'); }} className="hover:text-indigo-400 transition-colors">
                  {t.footer.faq}
                </a>
              </li>
              <li>
                <a href={localizedHref('contact', lang)} onClick={(event) => { event.preventDefault(); handleLink('contact'); }} className="hover:text-indigo-400 transition-colors">
                  {t.nav.contact}
                </a>
              </li>
              <li>
                <a href={localizedHref('sitemap', lang)} onClick={(event) => { event.preventDefault(); handleLink('sitemap'); }} className="hover:text-indigo-400 transition-colors">
                  {t.footer.sitemap}
                </a>
              </li>
              <li>
                <a href={localizedHref('robots', lang)} onClick={(event) => { event.preventDefault(); handleLink('robots'); }} className="hover:text-indigo-400 transition-colors">
                  {t.footer.robots}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.legalTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href={localizedHref('privacy', lang)} onClick={(event) => { event.preventDefault(); handleLink('privacy'); }} className="hover:text-indigo-400 transition-colors">
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a href={localizedHref('terms', lang)} onClick={(event) => { event.preventDefault(); handleLink('terms'); }} className="hover:text-indigo-400 transition-colors">
                  {t.footer.terms}
                </a>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-xs text-slate-200 leading-normal">
              {t.footer.privacyNotice}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} QR GENIUS. {t.footer.rights}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{lang === 'ar' ? 'صُمم للسرعة والخصوصية والدقة' : 'Built for speed, privacy, and precision'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 inline fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
