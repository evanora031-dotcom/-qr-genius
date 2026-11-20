import { faqByLanguage } from '../content/faq';
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';

interface FAQPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

const FAQ_COPY = {
  en: { heading: 'Frequently Asked Questions', intro: 'Everything you need to know about generating, customizing, and printing QR codes.', search: 'Search frequently asked questions...', all: 'All Questions', general: 'General', print: 'Print & Formats', technical: 'Technical & Error Correction', security: 'Privacy & Security', empty: 'No questions found. Try another search term.', cta: 'Have a question not listed here?', support: 'Our team can help with technical questions, business needs, and print guidance.', contact: 'Contact Support', studio: 'Open Studio' },
  ar: { heading: 'الأسئلة الشائعة', intro: 'كل ما تحتاج إلى معرفته حول إنشاء رموز QR وتخصيصها وطباعتها.', search: 'ابحث في الأسئلة الشائعة...', all: 'كل الأسئلة', general: 'عام', print: 'الطباعة والصيغ', technical: 'تقني وتصحيح الأخطاء', security: 'الخصوصية والأمان', empty: 'لا توجد أسئلة مطابقة. جرّب عبارة بحث أخرى.', cta: 'هل لديك سؤال غير موجود هنا؟', support: 'يمكن لفريقنا مساعدتك في الأسئلة التقنية واحتياجات الأعمال وإرشادات الطباعة.', contact: 'تواصل مع الدعم', studio: 'افتح الاستوديو' },
  fr: { heading: 'Questions fréquentes', intro: 'Tout savoir sur la création, la personnalisation et l’impression des QR codes.', search: 'Rechercher dans les questions fréquentes...', all: 'Toutes les questions', general: 'Général', print: 'Impression et formats', technical: 'Technique et correction d’erreurs', security: 'Confidentialité et sécurité', empty: 'Aucune question trouvée. Essayez un autre terme.', cta: 'Vous ne trouvez pas votre réponse ?', support: 'Notre équipe peut vous aider pour les questions techniques, professionnelles et d’impression.', contact: 'Contacter le support', studio: 'Ouvrir le studio' },
  es: { heading: 'Preguntas frecuentes', intro: 'Todo lo que necesitas saber sobre cómo crear, personalizar e imprimir códigos QR.', search: 'Buscar en las preguntas frecuentes...', all: 'Todas las preguntas', general: 'General', print: 'Impresión y formatos', technical: 'Técnica y corrección de errores', security: 'Privacidad y seguridad', empty: 'No se encontraron preguntas. Prueba otro término.', cta: '¿No encuentras tu respuesta?', support: 'Nuestro equipo puede ayudarte con dudas técnicas, necesidades comerciales e impresión.', contact: 'Contactar con soporte', studio: 'Abrir el estudio' }
};

export const FAQPage: React.FC<FAQPageProps> = ({ lang, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ f1: true, f2: true });

  const t = translations[lang];
  const faqs = faqByLanguage[lang];
  const copy = FAQ_COPY[lang];

  const toggleAccordion = (id: string) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = faqs.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'مركز المعرفة' : 'Knowledge Base'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {copy.heading}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {copy.intro}
          </p>
        </div>

        {/* Search & Filter bar */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={copy.search}
              className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: copy.all },
              { id: 'general', label: copy.general },
              { id: 'print', label: copy.print },
              { id: 'technical', label: copy.technical },
              { id: 'security', label: copy.security },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              {copy.empty}
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id]);
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left rtl:text-right p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50/60"
                  >
                    <span>{faq.question}</span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Quick CTA */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 text-center space-y-4">
          <h3 className="text-lg font-bold text-slate-900">{copy.cta}</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {copy.support}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              {copy.contact}
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="py-2.5 px-5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              {copy.studio}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
