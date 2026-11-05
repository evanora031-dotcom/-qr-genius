import React, { useState } from 'react';
import { 
  QrCode, 
  Globe, 
  Menu, 
  X, 
  History,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';

const PAGE_PATHS: Partial<Record<PageId, string>> = {
  home: '/', generator: '/generator', url: '/tools/url', wifi: '/tools/wifi',
  whatsapp: '/tools/whatsapp', business: '/tools/business-vcard', about: '/about',
  contact: '/contact', privacy: '/privacy', terms: '/terms', faq: '/faq'
};

function localizedHref(page: PageId, lang: Language): string {
  const path = PAGE_PATHS[page] || '/';
  if (lang === 'en') return path;
  return path === '/' ? `/${lang}/` : `/${lang}${path}`;
}

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  openHistory: () => void;
  historyCount: number;
}

const LANGUAGE_LABELS: Record<Language, { label: string; flag: string; native: string }> = {
  en: { label: 'English', flag: '🇺🇸', native: 'English' },
  ar: { label: 'العربية', flag: '🇦🇪', native: 'العربية' },
  fr: { label: 'Français', flag: '🇫🇷', native: 'Français' },
  es: { label: 'Español', flag: '🇪🇸', native: 'Español' }
};

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  lang,
  setLang,
  openHistory,
  historyCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[lang];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full overflow-visible">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-16">
          {/* Zone 1: Single text wordmark with subtle brand icon */}
          <a href={localizedHref('home', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('home'); }} className="flex items-center gap-2 text-left rtl:text-right group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1 shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 shrink-0">
              <QrCode className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-105" />
            </div>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent whitespace-nowrap">
              QR GENIUS
            </span>
          </a>

          {/* Zone 2: Clean single-line desktop navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href={localizedHref('home', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('home'); }} className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'home' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              {t.nav.home}
            </a>
            <a href={localizedHref('generator', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('generator'); }} className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'generator' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              {t.nav.studio}
            </a>
            <a href={localizedHref('wifi', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('wifi'); }} className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'wifi' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              {t.nav.wifiQr}
            </a>
            <a href={localizedHref('whatsapp', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('whatsapp'); }} className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'whatsapp' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              {t.nav.whatsappQr}
            </a>
            <a href={localizedHref('business', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('business'); }} className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'business' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              {t.nav.businessQr}
            </a>
            <a href={localizedHref('faq', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('faq'); }} className={`hover:text-indigo-600 transition-colors whitespace-nowrap shrink-0 ${
                currentPage === 'faq' ? 'text-indigo-600 font-semibold' : ''
              }`}
            >
              {t.nav.faq}
            </a>
          </nav>

          {/* Zone 3: Language Selector, History & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* History Button */}
            <button
              onClick={openHistory}
              title={t.nav.history}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label={t.nav.history}
            >
              <History className="w-5 h-5" />
              {historyCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {historyCount > 9 ? '9+' : historyCount}
                </span>
              )}
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 min-h-[40px]"
                aria-expanded={langDropdownOpen}
                aria-label="Select language"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>{LANGUAGE_LABELS[lang].flag}</span>
                <span className="hidden sm:inline">{LANGUAGE_LABELS[lang].native}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {langDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangDropdownOpen(false)}
                  />
                  <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50">
                    {(Object.keys(LANGUAGE_LABELS) as Language[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleLangChange(key)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 text-xs text-left rtl:text-right transition-colors ${
                          lang === key
                            ? 'bg-indigo-50 text-indigo-700 font-bold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{LANGUAGE_LABELS[key].flag}</span>
                          <span>{LANGUAGE_LABELS[key].label}</span>
                        </span>
                        {lang === key && <span className="text-indigo-600 text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Primary Action Button (Desktop) */}
            <a href={localizedHref('generator', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('generator'); }} className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.nav.createQr}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          {/* Mobile Language Switcher Row */}
          <div className="pb-3 mb-2 border-b border-slate-100">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-left rtl:text-right">
              Language / اللغة
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {(Object.keys(LANGUAGE_LABELS) as Language[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleLangChange(key)}
                  className={`py-2 px-1 text-xs font-bold rounded-lg border text-center transition-colors min-h-[40px] flex items-center justify-center gap-1 ${
                    lang === key
                      ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{LANGUAGE_LABELS[key].flag}</span>
                  <span className="truncate">{LANGUAGE_LABELS[key].native}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <a href={localizedHref('home', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('home'); }} className={`w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center ${
              currentPage === 'home' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.home}
          </a>
          <a href={localizedHref('generator', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('generator'); }} className={`w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center ${
              currentPage === 'generator' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.studio}
          </a>
          <a href={localizedHref('url', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('url'); }} className={`w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center ${
              currentPage === 'url' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.urlQr}
          </a>
          <a href={localizedHref('wifi', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('wifi'); }} className={`w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center ${
              currentPage === 'wifi' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.wifiQr}
          </a>
          <a href={localizedHref('whatsapp', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('whatsapp'); }} className={`w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center ${
              currentPage === 'whatsapp' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.whatsappQr}
          </a>
          <a href={localizedHref('business', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('business'); }} className={`w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium min-h-[44px] flex items-center ${
              currentPage === 'business' ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            {t.nav.businessQr}
          </a>
          <a href={localizedHref('about', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('about'); }} className="w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 min-h-[44px] flex items-center"
          >
            {t.nav.about}
          </a>
          <a href={localizedHref('faq', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('faq'); }} className="w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 min-h-[44px] flex items-center"
          >
            {t.nav.faq}
          </a>
          <a href={localizedHref('contact', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('contact'); }} className="w-full text-left rtl:text-right px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 min-h-[44px] flex items-center"
          >
            {t.nav.contact}
          </a>

          <div className="pt-2">
            <a href={localizedHref('generator', lang)} onClick={(event) => { event.preventDefault(); handleNavClick('generator'); }} className="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.nav.createQr}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
