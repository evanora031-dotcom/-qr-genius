import React, { useState, useEffect } from 'react';
import { PageId, Language, QRType, QRConfig, QRHistoryItem } from './types';
import { updateDocumentSEO } from './utils/seo';
import { getStoredHistory, getStoredLanguage, setStoredLanguage } from './utils/storage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HistoryDrawer } from './components/QRStudio/HistoryDrawer';
import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { ToolLandingPage } from './pages/ToolLandingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { FAQPage } from './pages/FAQPage';
import { SitemapView } from './pages/SitemapView';
import { RobotsView } from './pages/RobotsView';

const ROUTES: Record<string, PageId> = {
  '/': 'home',
  '/generator': 'generator',
  '/tools/url': 'url',
  '/tools/wifi': 'wifi',
  '/tools/whatsapp': 'whatsapp',
  '/tools/business-vcard': 'business',
  '/about': 'about',
  '/contact': 'contact',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/faq': 'faq',
  '/sitemap': 'sitemap',
  '/robots': 'robots',
};

const PATHS: Partial<Record<PageId, string>> = Object.fromEntries(
  Object.entries(ROUTES).map(([path, page]) => [page, path])
) as Partial<Record<PageId, string>>;

export default function App() {
  const getInitialPage = (): PageId => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace(/\\/+$/, '') || '/';
    if (ROUTES[path]) return ROUTES[path];
    // Keep old hash links working while moving to crawlable paths.
    const hash = window.location.hash.replace(/^#\\/?/, '').toLowerCase() as PageId;
    const validPages: PageId[] = [
      'home', 'generator', 'url', 'wifi', 'whatsapp', 'business',
      'about', 'contact', 'privacy', 'terms', 'faq', 'sitemap', 'robots'
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [lang, setLangState] = useState<Language>(() => getStoredLanguage());
  const [historyItems, setHistoryItems] = useState<QRHistoryItem[]>(() => getStoredHistory());
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [generatorType, setGeneratorType] = useState<QRType>('url');
  const [configToLoad, setConfigToLoad] = useState<QRConfig | null>(null);
  const [typeToLoad, setTypeToLoad] = useState<QRType | null>(null);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setStoredLanguage(newLang);
  };

  useEffect(() => {
    const handleLocationChange = () => setCurrentPage(getInitialPage());
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    updateDocumentSEO(currentPage, lang);
    const expectedPath = PATHS[currentPage] || '/';
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState(null, '', expectedPath);
    }
  }, [currentPage, lang]);

  const refreshHistory = () => setHistoryItems(getStoredHistory());

  const handleNavigate = (page: PageId, type?: QRType) => {
    if (type) setGeneratorType(type);
    const nextPath = PATHS[page] || '/';
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, '', nextPath);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadHistoryItem = (item: QRHistoryItem) => {
    setTypeToLoad(item.type);
    setConfigToLoad(item.config);
    setGeneratorType(item.type);
    const nextPath = PATHS.generator || '/generator';
    if (window.location.pathname !== nextPath) window.history.pushState(null, '', nextPath);
    setCurrentPage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-950">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        openHistory={() => setIsHistoryOpen(true)}
        historyCount={historyItems.length}
      />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage lang={lang} onNavigate={handleNavigate} />}
        {currentPage === 'generator' && (
          <GeneratorPage
            initialType={generatorType}
            lang={lang}
            onNavigate={handleNavigate}
            onHistoryUpdated={refreshHistory}
            externalConfigToLoad={configToLoad}
            externalTypeToLoad={typeToLoad}
          />
        )}
        {currentPage === 'url' && <ToolLandingPage tool="url" lang={lang} onNavigate={handleNavigate} onHistoryUpdated={refreshHistory} />}
        {currentPage === 'wifi' && <ToolLandingPage tool="wifi" lang={lang} onNavigate={handleNavigate} onHistoryUpdated={refreshHistory} />}
        {currentPage === 'whatsapp' && <ToolLandingPage tool="whatsapp" lang={lang} onNavigate={handleNavigate} onHistoryUpdated={refreshHistory} />}
        {currentPage === 'business' && <ToolLandingPage tool="business" lang={lang} onNavigate={handleNavigate} onHistoryUpdated={refreshHistory} />}
        {currentPage === 'about' && <AboutPage lang={lang} onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage lang={lang} />}
        {currentPage === 'privacy' && <PrivacyPage lang={lang} />}
        {currentPage === 'terms' && <TermsPage lang={lang} />}
        {currentPage === 'faq' && <FAQPage lang={lang} onNavigate={handleNavigate} />}
        {currentPage === 'sitemap' && <SitemapView />}
        {currentPage === 'robots' && <RobotsView />}
      </main>
      <Footer lang={lang} setCurrentPage={setCurrentPage} />
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={historyItems}
        onHistoryUpdated={refreshHistory}
        onLoadItem={handleLoadHistoryItem}
        lang={lang}
      />
    </div>
  );
}
