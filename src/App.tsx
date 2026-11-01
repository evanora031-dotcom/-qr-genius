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

export default function App() {
  // Parse initial page from hash if present
  const getInitialPage = (): PageId => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase() as PageId;
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
  
  // Specific generator route states
  const [generatorType, setGeneratorType] = useState<QRType>('url');
  const [configToLoad, setConfigToLoad] = useState<QRConfig | null>(null);
  const [typeToLoad, setTypeToLoad] = useState<QRType | null>(null);

  // Sync language with storage and document
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setStoredLanguage(newLang);
  };

  // Sync hash on popstate / hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update SEO, RTL direction, and URL hash whenever page or lang changes
  useEffect(() => {
    updateDocumentSEO(currentPage, lang);
    if (window.location.hash.replace(/^#\/?/, '') !== currentPage) {
      window.history.replaceState(null, '', currentPage === 'home' ? '#' : `#${currentPage}`);
    }
  }, [currentPage, lang]);

  // Update history items list
  const refreshHistory = () => {
    setHistoryItems(getStoredHistory());
  };

  // Navigation handler
  const handleNavigate = (page: PageId, type?: QRType) => {
    if (type) {
      setGeneratorType(type);
    }
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load history item into studio
  const handleLoadHistoryItem = (item: QRHistoryItem) => {
    setTypeToLoad(item.type);
    setConfigToLoad(item.config);
    setGeneratorType(item.type);
    setCurrentPage('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-indigo-100 selection:text-indigo-950">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lang={lang}
        setLang={setLang}
        openHistory={() => setIsHistoryOpen(true)}
        historyCount={historyItems.length}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

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

        {currentPage === 'url' && (
          <ToolLandingPage
            tool="url"
            lang={lang}
            onNavigate={handleNavigate}
            onHistoryUpdated={refreshHistory}
          />
        )}

        {currentPage === 'wifi' && (
          <ToolLandingPage
            tool="wifi"
            lang={lang}
            onNavigate={handleNavigate}
            onHistoryUpdated={refreshHistory}
          />
        )}

        {currentPage === 'whatsapp' && (
          <ToolLandingPage
            tool="whatsapp"
            lang={lang}
            onNavigate={handleNavigate}
            onHistoryUpdated={refreshHistory}
          />
        )}

        {currentPage === 'business' && (
          <ToolLandingPage
            tool="business"
            lang={lang}
            onNavigate={handleNavigate}
            onHistoryUpdated={refreshHistory}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            lang={lang}
          />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPage
            lang={lang}
          />
        )}

        {currentPage === 'terms' && (
          <TermsPage
            lang={lang}
          />
        )}

        {currentPage === 'faq' && (
          <FAQPage
            lang={lang}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'sitemap' && (
          <SitemapView />
        )}

        {currentPage === 'robots' && (
          <RobotsView />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        setCurrentPage={setCurrentPage}
      />

      {/* Local History Slide-over Drawer */}
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
