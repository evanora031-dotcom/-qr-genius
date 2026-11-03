import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Download, 
  QrCode,
  Globe,
  Wifi,
  MessageSquare,
  Contact,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Language, PageId, QRType } from '../types';
import { translations } from '../i18n/translations';
import { AdPlacement } from '../components/AdPlacement';
import { PricingSection } from '../components/PricingSection';
import { Category3DIcon } from '../components/icons/Category3DIcon';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageId, type?: QRType) => void;
}

const FEATURE_CARDS: { type: QRType; titleKey: string; descKey: string; icon: React.ElementType; color: string }[] = [
  { type: 'url', titleKey: 'Website URL', descKey: 'Link directly to any webpage, storefront, or linktree with error-resilient codes.', icon: Globe, color: 'text-indigo-600 bg-indigo-50' },
  { type: 'wifi', titleKey: 'Wi-Fi Network', descKey: 'Guests scan to connect instantly without typing long complex passwords.', icon: Wifi, color: 'text-purple-600 bg-purple-50' },
  { type: 'whatsapp', titleKey: 'WhatsApp Chat', descKey: 'Open direct WhatsApp conversations with customers with pre-typed text.', icon: MessageSquare, color: 'text-emerald-600 bg-emerald-50' },
  { type: 'vcard', titleKey: 'vCard Contact', descKey: 'Digital business cards. Save name, phone, email, and address in one tap.', icon: Contact, color: 'text-sky-600 bg-sky-50' },
];

export const HomePage: React.FC<HomePageProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white pt-8 pb-16 sm:pt-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Value Proposition */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left rtl:text-right">
              {/* Pill-free Editorial Kicker */}
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 tracking-wide uppercase flex-wrap">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{lang === 'ar' ? 'تقنية رموز QR من الجيل الجديد' : 'Next-Generation QR Technology'}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">{lang === 'ar' ? 'مجاني 100% إلى الأبد' : '100% Free Forever'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] text-balance">
                {lang === 'ar' ? 'أنشئ. امسح. تواصل.' : 'Create. Scan. Connect.'}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  {lang === 'ar' ? 'مولّد رموز QR مجاني وعصري' : 'The Free Modern QR Generator'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {lang === 'ar' ? 'أنشئ رموز QR عالية الدقة ومخصصة للمواقع وشبكات Wi-Fi ومحادثات واتساب وبطاقات العمل الرقمية. حمّل ملفات SVG المتجهة أو PNG الواضحة أو PDF الجاهز للطباعة دون الحاجة إلى التسجيل.' : 'Generate high-resolution, custom-styled QR codes for websites, Wi-Fi networks, WhatsApp chats, and digital business cards. Download infinite-resolution vector SVG, crisp PNG, or printable PDF sheets with zero registrations.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('generator')}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{lang === 'ar' ? 'افتح استوديو QR الكامل' : 'Open Full QR Studio'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('wifi')}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Wifi className="w-4 h-4 text-indigo-600" />
                  <span>{lang === 'ar' ? 'أداة رمز Wi-Fi' : 'Wi-Fi QR Tool'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'خصوصية كاملة على جهازك' : '100% Client-Side Privacy'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>{lang === 'ar' ? 'مسح دون حدود' : 'No Scan Limits'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>{lang === 'ar' ? 'يتضمن SVG وPDF متجهيين' : 'Vector SVG &amp; PDF Included'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Studio Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{lang === 'ar' ? 'معاينة تفاعلية' : 'Interactive Preview'}</div>
                      <div className="text-[10px] text-slate-400">{lang === 'ar' ? 'قابل للمسح وفق ISO/IEC 18004' : 'Scannable ISO/IEC 18004'}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {lang === 'ar' ? 'جاهز للمسح' : 'Ready to Scan'}
                  </span>
                </div>

                {/* Styled Center QR Demo */}
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50/40 to-slate-50 rounded-xl border border-slate-100">
                  <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                    {/* SVG Interactive sample */}
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <rect width="100" height="100" fill="#ffffff" />
                      {/* Top-Left Finder */}
                      <rect x="5" y="5" width="28" height="28" rx="6" fill="#4F46E5" />
                      <rect x="9" y="9" width="20" height="20" rx="4" fill="#ffffff" />
                      <rect x="13" y="13" width="12" height="12" rx="3" fill="#4F46E5" />

                      {/* Top-Right Finder */}
                      <rect x="67" y="5" width="28" height="28" rx="6" fill="#4F46E5" />
                      <rect x="71" y="9" width="20" height="20" rx="4" fill="#ffffff" />
                      <rect x="75" y="13" width="12" height="12" rx="3" fill="#4F46E5" />

                      {/* Bottom-Left Finder */}
                      <rect x="5" y="67" width="28" height="28" rx="6" fill="#4F46E5" />
                      <rect x="9" y="71" width="20" height="20" rx="4" fill="#ffffff" />
                      <rect x="13" y="75" width="12" height="12" rx="3" fill="#4F46E5" />

                      {/* Decorative Matrix Dots */}
                      <circle cx="42" cy="12" r="3" fill="#6366F1" />
                      <circle cx="50" cy="12" r="3" fill="#6366F1" />
                      <circle cx="58" cy="12" r="3" fill="#6366F1" />
                      <circle cx="42" cy="20" r="3" fill="#6366F1" />
                      <circle cx="58" cy="20" r="3" fill="#6366F1" />
                      <circle cx="42" cy="28" r="3" fill="#6366F1" />
                      <circle cx="50" cy="28" r="3" fill="#6366F1" />
                      <circle cx="58" cy="28" r="3" fill="#6366F1" />

                      <circle cx="12" cy="42" r="3" fill="#6366F1" />
                      <circle cx="20" cy="42" r="3" fill="#6366F1" />
                      <circle cx="28" cy="42" r="3" fill="#6366F1" />
                      <circle cx="12" cy="50" r="3" fill="#6366F1" />
                      <circle cx="28" cy="50" r="3" fill="#6366F1" />

                      {/* Center Logo cutout badge */}
                      <circle cx="50" cy="50" r="14" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
                      <circle cx="50" cy="50" r="10" fill="#4F46E5" />
                      <path d="M47 50L53 50M50 47L50 53" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

                      <circle cx="72" cy="42" r="3" fill="#6366F1" />
                      <circle cx="80" cy="42" r="3" fill="#6366F1" />
                      <circle cx="88" cy="42" r="3" fill="#6366F1" />
                      <circle cx="72" cy="50" r="3" fill="#6366F1" />
                      <circle cx="88" cy="50" r="3" fill="#6366F1" />

                      <circle cx="42" cy="72" r="3" fill="#6366F1" />
                      <circle cx="50" cy="72" r="3" fill="#6366F1" />
                      <circle cx="58" cy="72" r="3" fill="#6366F1" />
                      <circle cx="72" cy="72" r="3" fill="#6366F1" />
                      <circle cx="80" cy="72" r="3" fill="#6366F1" />
                      <circle cx="88" cy="72" r="3" fill="#6366F1" />

                      <circle cx="42" cy="84" r="3" fill="#6366F1" />
                      <circle cx="58" cy="84" r="3" fill="#6366F1" />
                      <circle cx="72" cy="84" r="3" fill="#6366F1" />
                      <circle cx="84" cy="84" r="3" fill="#6366F1" />
                    </svg>
                  </div>

                  <div className="mt-3 text-center">
                    <span className="text-xs font-mono font-bold text-slate-800">
                      https://qrgenius.app
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {lang === 'ar' ? 'تصميم بلون نيلي وزوايا مستديرة' : 'Styled with SaaS Indigo &amp; Rounded Corners'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{lang === 'ar' ? 'هل أنت مستعد لإنشاء رمزك؟' : 'Ready to create yours?'}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('generator')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>{lang === 'ar' ? 'ابدأ التصميم' : 'Launch Designer'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Grid */}
      <section className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-1">
                {lang === 'ar' ? 'أدوات إنشاء متعددة الاستخدامات' : 'Versatile Generators'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'ar' ? 'مصممة للاستخدامات اليومية' : 'Designed for Real-World Scenarios'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('generator')}
              className="mt-3 md:mt-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض الأنواع الاثني عشر في الاستوديو' : 'View all 12 formats in Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURE_CARDS.map((card) => {
              return (
                <div
                  key={card.type}
                  onClick={() => onNavigate('generator', card.type)}
                  className="p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all cursor-pointer bg-white flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-14 h-14 mb-4 flex items-center justify-center transition-transform group-hover:scale-110">
                      <Category3DIcon type={card.type} size={52} animateHover={false} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {card.titleKey}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {card.descKey}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-indigo-600 group-hover:text-indigo-700">
                    <span>Create {card.titleKey}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Monetization Slot 1 */}
      <div className="max-w-7xl mx-auto px-4">
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>

      {/* How It Works - 3 Step Guide */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              {lang === 'ar' ? 'سريع وسهل الاستخدام' : 'Quick &amp; Intuitive'}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
              {lang === 'ar' ? 'كيف يعمل QR GENIUS في 3 خطوات؟' : 'How QR GENIUS Works in 3 Steps'}
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              {lang === 'ar' ? 'لا تسجيل ولا بطاقة ائتمان ولا انتظار. أنشئ رموز QR جاهزة للاستخدام خلال ثوانٍ.' : 'No registration, no credit card, no waiting. Generate production-ready QR codes in seconds.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs relative">
              <span className="text-3xl font-extrabold text-indigo-600/30 block mb-4">
                01.
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'ar' ? 'اختر نوع البيانات' : 'Choose Your Payload'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pick from 12 industry-standard formats: Web URL, Wi-Fi network credentials, WhatsApp chat, vCard business card, Email, or SMS.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs relative">
              <span className="text-3xl font-extrabold text-indigo-600/30 block mb-4">
                02.
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'ar' ? 'أضف هويتك وخصص الرمز' : 'Brand &amp; Customize'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Style your QR code with your brand colors, gradients, custom dot patterns, corner frame shapes, and embed your company logo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs relative">
              <span className="text-3xl font-extrabold text-indigo-600/30 block mb-4">
                03.
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'ar' ? 'صدّر واطبع' : 'Export Vector &amp; Print'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download infinite-resolution vector SVG for professional print shops, high-res PNG (up to 2048px), or ready-to-print A4 PDF sheets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                {lang === 'ar' ? 'لماذا يختارنا المحترفون؟' : 'Why Professionals Choose Us'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {lang === 'ar' ? 'مصمم للطباعة عالية الدقة واللوحات والتسويق اليومي' : 'Built for High-DPI Print, Billboards, and Daily Marketing'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike services that lock your downloads behind paywalls or insert temporary tracking links that break when subscriptions expire, QR GENIUS creates permanent, static ISO-compliant QR codes that work indefinitely.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  '100% Free Lifetime Usage with zero scan limits',
                  'Client-side generation: payloads never leave your browser',
                  'Vector SVG format allows infinite scaling without blurriness',
                  'Adjustable Error Correction ensures readability with logos',
                  'Full multilingual RTL support for global audiences'
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">100%</div>
                <div className="text-xs font-bold text-slate-900 mb-1">Local &amp; Private</div>
                <p className="text-[11px] text-slate-500">Processed entirely in-browser without database logging.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">2048px</div>
                <div className="text-xs font-bold text-slate-900 mb-1">Ultra Resolution</div>
                <p className="text-[11px] text-slate-500">Crystal-clear raster PNG exports ready for signs &amp; packaging.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">SVG</div>
                <div className="text-xs font-bold text-slate-900 mb-1">True Vector</div>
                <p className="text-[11px] text-slate-500">Clean mathematical SVG paths for Illustrator and Figma.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">4</div>
                <div className="text-xs font-bold text-slate-900 mb-1">Languages + RTL</div>
                <p className="text-[11px] text-slate-500">English, Arabic with full RTL mirroring, French, and Spanish.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pro vs Free Comparison Section */}
      <PricingSection lang={lang} onSelectFree={() => onNavigate('generator')} />

      {/* CTA Bar */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
            Ready to Generate Your Custom QR Code?
          </h2>
          <p className="text-sm text-indigo-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of businesses, creators, and organizers generating free, beautiful QR codes daily.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('generator')}
            className="py-3.5 px-8 rounded-xl font-bold text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg transition-colors inline-flex items-center gap-2"
          >
            <span>Start Generating Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
