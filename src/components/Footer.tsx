import React from 'react';
import { QrCode, ShieldCheck, Heart } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';

interface FooterProps {
  lang: Language;
  setCurrentPage: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, setCurrentPage }) => {
  const t = translations[lang];

  const handleLink = (page: PageId) => {
    setCurrentPage(page);
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
              <span>{lang === 'ar' ? 'خصوصية كاملة: المعالجة على جهازك' : '100% Client-Side Privacy'}</span>
            </div>
          </div>

          {/* QR Tools links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.toolsTitle}
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleLink('generator')} className="hover:text-indigo-400 transition-colors">
                  {t.nav.studio}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('url')} className="hover:text-indigo-400 transition-colors">
                  {t.nav.urlQr}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('wifi')} className="hover:text-indigo-400 transition-colors">
                  {t.nav.wifiQr}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('whatsapp')} className="hover:text-indigo-400 transition-colors">
                  {t.nav.whatsappQr}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('business')} className="hover:text-indigo-400 transition-colors">
                  {t.nav.businessQr}
                </button>
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
                <button onClick={() => handleLink('about')} className="hover:text-indigo-400 transition-colors">
                  {t.footer.aboutUs}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('faq')} className="hover:text-indigo-400 transition-colors">
                  {t.footer.faq}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('contact')} className="hover:text-indigo-400 transition-colors">
                  {t.nav.contact}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('sitemap')} className="hover:text-indigo-400 transition-colors">
                  {t.footer.sitemap}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('robots')} className="hover:text-indigo-400 transition-colors">
                  {t.footer.robots}
                </button>
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
                <button onClick={() => handleLink('privacy')} className="hover:text-indigo-400 transition-colors">
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button onClick={() => handleLink('terms')} className="hover:text-indigo-400 transition-colors">
                  {t.footer.terms}
                </button>
              </li>
            </ul>
            <div className="mt-6 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 text-[11px] text-slate-400 leading-normal">
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
