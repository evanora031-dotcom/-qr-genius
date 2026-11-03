import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { Language, PageId } from '../types';
import { translations } from '../i18n/translations';

interface FAQPageProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

interface FAQItem {
  id: string;
  category: 'general' | 'print' | 'security' | 'technical';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 'f1',
    category: 'general',
    question: 'Are the QR codes generated on QR GENIUS really free?',
    answer: 'Yes, 100% free! All 12 QR code generators on this website are free forever for both personal and commercial use without scan limits, forced registration, or expiration dates.'
  },
  {
    id: 'f2',
    category: 'general',
    question: 'Do your QR codes ever expire or stop working?',
    answer: 'No! QR GENIUS generates static, ISO-standard QR codes. The information (such as your website link or Wi-Fi network) is encoded directly into the pattern of dots. There is no middleman redirect server, so the QR code will work as long as your destination link exists.'
  },
  {
    id: 'f3',
    category: 'print',
    question: 'Which file format should I download for professional printing?',
    answer: 'For professional offset printing, billboards, product packaging, and signs, download the Vector SVG format. SVGs use mathematical vectors that scale infinitely to any size without pixelation. For digital use or standard flyers, our High-Res (1024px) or Ultra Print (2048px) PNGs are ideal.'
  },
  {
    id: 'f4',
    category: 'print',
    question: 'What is the minimum recommended size to print a QR code?',
    answer: 'For standard mobile phone cameras to scan reliably from an arm’s length (10-15 inches), we recommend a minimum printed size of 2 × 2 cm (0.8 × 0.8 inches). For posters and banners viewed from several feet away, scale the code proportionally (approx. 10:1 distance-to-size ratio).'
  },
  {
    id: 'f5',
    category: 'security',
    question: 'Is my data safe when generating QR codes here?',
    answer: 'Yes, completely safe! QR GENIUS operates 100% client-side in your web browser. When you enter Wi-Fi passwords, vCard contact information, or sensitive links, the code is computed locally in JavaScript and drawn on an HTML5 canvas. Your payload is never sent to our servers.'
  },
  {
    id: 'f6',
    category: 'technical',
    question: 'What is Error Correction Level (ECC) and why does it matter?',
    answer: 'Error correction allows a QR code to remain readable even if it is partially smudged, torn, or obstructed by a center logo. Levels range from L (7% recovery) up to H (30% recovery). When you add a company logo to the center, QR GENIUS automatically increases error correction to ensure immediate scanability.'
  },
  {
    id: 'f7',
    category: 'technical',
    question: 'Can I add my own logo to the center of the QR code?',
    answer: 'Yes! In the QR Studio, navigate to the "Logo" tab. You can either select from popular built-in presets (WhatsApp, Wi-Fi, Link, etc.) or click "Upload Custom Logo" to use your own PNG, JPG, or SVG company emblem.'
  },
  {
    id: 'f8',
    category: 'general',
    question: 'What is the difference between Static and Dynamic QR codes?',
    answer: 'Static QR codes embed the exact payload directly in the graphic, meaning they never expire and require no external servers. Dynamic QR codes redirect through a short link that allows the destination to be changed after printing. All tools on QR GENIUS generate reliable, permanent static QR codes.'
  }
];


const FAQS_AR: FAQItem[] = [
  { id: 'f1', category: 'general', question: 'هل إنشاء رموز QR على الموقع مجاني فعلاً؟', answer: 'نعم، جميع أدوات إنشاء رموز QR الاثنتي عشرة مجانية للاستخدام الشخصي والتجاري، دون حدود للمسح أو تسجيل إلزامي أو تاريخ انتهاء.' },
  { id: 'f2', category: 'general', question: 'هل تنتهي صلاحية رموز QR أو تتوقف عن العمل؟', answer: 'لا. ينشئ الموقع رموز QR ثابتة وفق المعايير، وتُشفّر البيانات مثل رابط الموقع أو شبكة Wi-Fi مباشرةً داخل الرمز. سيظل الرمز صالحاً ما دام الرابط أو الوجهة متاحاً.' },
  { id: 'f3', category: 'print', question: 'ما صيغة الملف المناسبة للطباعة الاحترافية؟', answer: 'نوصي بصيغة SVG المتجهة للطباعة الاحترافية واللافتات والتغليف؛ إذ يمكن تكبيرها دون فقدان الجودة. وللاستخدام الرقمي والمنشورات، يمكنك اختيار PNG عالي الدقة أو فائق الدقة.' },
  { id: 'f4', category: 'print', question: 'ما أقل حجم موصى به لطباعة رمز QR؟', answer: 'للاستخدام المعتاد، نوصي بحجم مطبوع لا يقل عن 2 × 2 سم، مع التأكد من وجود تباين واضح ومساحة بيضاء حول الرمز. زد الحجم عند عرضه من مسافة بعيدة.' },
  { id: 'f5', category: 'security', question: 'هل بياناتي آمنة عند إنشاء رموز QR هنا؟', answer: 'نعم. تتم معالجة البيانات محلياً داخل متصفحك باستخدام JavaScript، ولا تُرسل محتويات الرمز إلى خوادمنا. ينطبق ذلك على كلمات مرور Wi-Fi وبيانات جهات الاتصال والروابط.' },
  { id: 'f6', category: 'technical', question: 'ما مستوى تصحيح الأخطاء (ECC) ولماذا هو مهم؟', answer: 'يساعد تصحيح الأخطاء على قراءة الرمز حتى عند تلف جزء منه أو تغطيته جزئياً بشعار. تتدرج المستويات من L إلى H، ويُفضّل اختيار مستوى أعلى عند إضافة شعار إلى وسط الرمز.' },
  { id: 'f7', category: 'technical', question: 'هل يمكنني إضافة شعاري إلى وسط رمز QR؟', answer: 'نعم. افتح تبويب الشعار في استوديو QR واختر أحد الشعارات الجاهزة أو ارفع شعارك بصيغة PNG أو JPG أو SVG.' },
  { id: 'f8', category: 'general', question: 'ما الفرق بين رموز QR الثابتة والديناميكية؟', answer: 'تحتوي الرموز الثابتة على البيانات مباشرةً ولا تحتاج إلى خادم تحويل. أما الرموز الديناميكية فتستخدم عادةً رابطاً وسيطاً يمكن تغيير وجهته لاحقاً. الأدوات هنا تنشئ رموزاً ثابتة.' }
];

export const FAQPage: React.FC<FAQPageProps> = ({ lang, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ f1: true, f2: true });

  const t = translations[lang];
  const faqs = lang === 'ar' ? FAQS_AR : FAQS;

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
            {lang === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {lang === 'ar' ? 'كل ما تحتاج إلى معرفته حول إنشاء رموز QR وتخصيصها وطباعتها بجودة عالية.' : 'Everything you need to know about generating, customizing, and printing high-durability QR codes.'}
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
              placeholder={lang === 'ar' ? 'ابحث في الأسئلة الشائعة...' : 'Search frequently asked questions...'}
              className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/30 bg-slate-50/50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: lang === 'ar' ? 'كل الأسئلة' : 'All Questions' },
              { id: 'general', label: lang === 'ar' ? 'عام' : 'General' },
              { id: 'print', label: lang === 'ar' ? 'الطباعة والصيغ' : 'Print & Formats' },
              { id: 'technical', label: lang === 'ar' ? 'تقني وتصحيح الأخطاء' : 'Technical & Error Correction' },
              { id: 'security', label: lang === 'ar' ? 'الخصوصية والأمان' : 'Privacy & Security' },
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
              {lang === 'ar' ? <>لا توجد أسئلة تطابق «{searchTerm}». جرّب عبارة بحث أخرى.</> : <>No questions found matching &ldquo;{searchTerm}&rdquo;. Try another search term.</>}
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
          <h3 className="text-lg font-bold text-slate-900">{lang === 'ar' ? 'هل لديك سؤال غير موجود هنا؟' : 'Have a question not listed here?'}</h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {lang === 'ar' ? 'يسعد فريقنا مساعدتك في المواصفات التقنية واحتياجات المؤسسات وإرشادات الطباعة.' : 'Our engineering team is always happy to assist with technical specifications, custom enterprise needs, and print guidelines.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="py-2.5 px-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              {lang === 'ar' ? 'تواصل مع الدعم' : 'Contact Support'}
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="py-2.5 px-5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              {lang === 'ar' ? 'افتح الاستوديو' : 'Open Studio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
