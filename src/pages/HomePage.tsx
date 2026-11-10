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
  const featureCards = [
    { ...FEATURE_CARDS[0], titleKey: lang === 'ar' ? 'رابط موقع إلكتروني' : lang === 'fr' ? 'Lien de site web' : lang === 'es' ? 'Enlace de sitio web' : 'Website URL', descKey: lang === 'ar' ? 'وجّه الزوار مباشرةً إلى أي صفحة أو متجر أو رابط باستخدام رموز موثوقة.' : lang === 'fr' ? 'Dirigez les visiteurs vers une page, une boutique ou un lien en un scan.' : lang === 'es' ? 'Dirige a los visitantes a cualquier página, tienda o enlace con un solo escaneo.' : 'Link directly to any webpage, storefront, or linktree with reliable QR codes.' },
    { ...FEATURE_CARDS[1], titleKey: lang === 'ar' ? 'شبكة Wi-Fi' : 'Wi-Fi', descKey: lang === 'ar' ? 'يمكن للضيوف الاتصال بالشبكة فوراً دون كتابة كلمات مرور طويلة.' : lang === 'fr' ? 'Les invités se connectent sans saisir de longs mots de passe.' : lang === 'es' ? 'Los invitados se conectan sin escribir contraseñas largas.' : 'Guests scan to connect instantly without typing long complex passwords.' },
    { ...FEATURE_CARDS[2], titleKey: lang === 'ar' ? 'محادثة واتساب' : lang === 'fr' ? 'Discussion WhatsApp' : lang === 'es' ? 'Chat de WhatsApp' : 'WhatsApp Chat', descKey: lang === 'ar' ? 'افتح محادثات واتساب مباشرةً مع العملاء ورسالة جاهزة.' : lang === 'fr' ? 'Ouvrez une conversation WhatsApp avec un message prérempli.' : lang === 'es' ? 'Abre conversaciones de WhatsApp con un mensaje predefinido.' : 'Open direct WhatsApp conversations with customers with pre-typed text.' },
    { ...FEATURE_CARDS[3], titleKey: lang === 'ar' ? 'جهة اتصال vCard' : lang === 'fr' ? 'Contact vCard' : lang === 'es' ? 'Contacto vCard' : 'vCard Contact', descKey: lang === 'ar' ? 'بطاقة عمل رقمية تحفظ الاسم والهاتف والبريد والعنوان بنقرة واحدة.' : lang === 'fr' ? 'Une carte numérique pour enregistrer nom, téléphone, e-mail et adresse.' : lang === 'es' ? 'Tarjeta digital para guardar nombre, teléfono, correo y dirección.' : 'Digital business cards. Save name, phone, email, and address in one tap.' }
  ];

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
                <span>{lang === 'ar' ? 'تقنية رموز QR من الجيل الجديد' : lang === 'fr' ? 'Technologie QR de nouvelle génération' : lang === 'es' ? 'Tecnología QR de nueva generación' : 'Free QR Code Generator'}</span>
                <span className="text-slate-300">·</span>
                <span className="text-slate-500 font-medium">{lang === 'ar' ? 'أدوات QR متاحة للاستخدام' : lang === 'fr' ? 'Outils QR accessibles en ligne' : lang === 'es' ? 'Herramientas QR disponibles en línea' : 'QR tools available online'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.18] text-balance">
                {lang === 'ar' ? 'أنشئ. امسح. تواصل.' : lang === 'fr' ? 'Créer. Scanner. Connecter.' : lang === 'es' ? 'Crear. Escanear. Conectar.' : 'Create. Scan. Connect.'}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  {lang === 'ar' ? 'مولّد رموز QR مجاني وعصري' : lang === 'fr' ? 'Le générateur QR moderne et gratuit' : lang === 'es' ? 'El generador QR moderno y gratuito' : 'Free QR Codes for Everyday Use'}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {lang === 'ar' ? 'أنشئ رموز QR عالية الدقة ومخصصة للمواقع وشبكات Wi-Fi ومحادثات واتساب وبطاقات العمل الرقمية. حمّل ملفات SVG المتجهة أو PNG الواضحة أو PDF الجاهز للطباعة دون الحاجة إلى التسجيل.' : lang === 'fr' ? 'Créez des QR codes personnalisés haute résolution pour les sites web, le Wi-Fi, WhatsApp et les cartes de visite numériques. Téléchargez des fichiers SVG vectoriels, PNG nets ou PDF prêts à imprimer, sans inscription.' : lang === 'es' ? 'Genere códigos QR personalizados de alta resolución para sitios web, redes Wi-Fi, WhatsApp y tarjetas de visita digitales. Descargue archivos SVG vectoriales, PNG nítidos o PDF listos para imprimir, sin registrarse.' : 'Create QR codes for links, Wi-Fi, WhatsApp, and contact cards. Customize the design, then download PNG, SVG, or PDF files. No sign-up required.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('generator')}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>{lang === 'ar' ? 'افتح استوديو QR الكامل' : lang === 'fr' ? 'Ouvrir le studio QR complet' : lang === 'es' ? 'Abrir el estudio QR completo' : 'Create a QR Code'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('wifi')}
                  className="py-3.5 px-6 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Wifi className="w-4 h-4 text-indigo-600" />
                  <span>{lang === 'ar' ? 'أداة رمز Wi-Fi' : lang === 'fr' ? 'Outil QR Wi-Fi' : lang === 'es' ? 'Herramienta QR Wi-Fi' : 'Wi-Fi QR Tool'}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'ar' ? 'إنشاء الرمز داخل متصفحك' : lang === 'fr' ? 'Génération dans votre navigateur' : lang === 'es' ? 'Generación en tu navegador' : 'QR generation in your browser'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-indigo-600" />
                  <span>{lang === 'ar' ? 'رموز ثابتة بلا عدّاد مسح من QR Genius' : lang === 'fr' ? 'Codes statiques sans compteur de scans QR GENIUS' : lang === 'es' ? 'Códigos estáticos sin contador de escaneos de QR GENIUS' : 'Static codes with no QR GENIUS scan counter'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span>{lang === 'ar' ? 'يتضمن SVG وPDF متجهيين' : lang === 'fr' ? 'SVG vectoriel et PDF inclus' : lang === 'es' ? 'Incluye SVG vectorial y PDF' : 'Vector SVG & PDF Included'}</span>
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
                      <div className="text-xs font-bold text-slate-900">{lang === 'ar' ? 'معاينة التصميم' : lang === 'fr' ? 'Aperçu du design' : lang === 'es' ? 'Vista previa del diseño' : 'Design Preview'}</div>
                      <div className="text-[10px] text-slate-600">{lang === 'ar' ? 'رسم توضيحي غير قابل للمسح' : lang === 'fr' ? 'Illustration non scannable' : lang === 'es' ? 'Ilustración no escaneable' : 'Illustration only — not scannable'}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {lang === 'ar' ? 'مثال تصميم' : lang === 'fr' ? 'Exemple visuel' : lang === 'es' ? 'Ejemplo visual' : 'Visual Example'}
                  </span>
                </div>

                {/* Styled Center QR Demo */}
                <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-indigo-50/40 to-slate-50 rounded-xl border border-slate-100">
                  <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center">
                    {/* Decorative SVG illustration; not an encoded QR code. */}
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
                      https://getqrgenius.com
                    </span>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      {lang === 'ar' ? 'تصميم بلون نيلي وزوايا مستديرة' : lang === 'fr' ? 'Style indigo SaaS et coins arrondis' : lang === 'es' ? 'Estilo índigo SaaS y esquinas redondeadas' : 'Styled with SaaS Indigo &amp; Rounded Corners'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">{lang === 'ar' ? 'هل أنت مستعد لإنشاء رمزك؟' : lang === 'fr' ? 'Prêt à créer le vôtre ?' : lang === 'es' ? '¿Listo para crear el tuyo?' : 'Ready to create yours?'}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('generator')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>{lang === 'ar' ? 'ابدأ التصميم' : lang === 'fr' ? 'Lancer le concepteur' : lang === 'es' ? 'Abrir el diseñador' : 'Launch Designer'}</span>
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
                {lang === 'ar' ? 'أدوات إنشاء متعددة الاستخدامات' : lang === 'fr' ? 'Générateurs polyvalents' : lang === 'es' ? 'Generadores versátiles' : 'Versatile Generators'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {lang === 'ar' ? 'مصممة للاستخدامات اليومية' : lang === 'fr' ? 'Conçu pour les usages du quotidien' : lang === 'es' ? 'Diseñado para situaciones reales' : 'Designed for Real-World Scenarios'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('generator')}
              className="mt-3 md:mt-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>{lang === 'ar' ? 'عرض الأنواع الاثني عشر في الاستوديو' : lang === 'fr' ? 'Voir les 12 formats dans le studio' : lang === 'es' ? 'Ver los 12 formatos en el estudio' : 'View all 12 formats in Studio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card) => {
              return (
                <a
                  key={card.type}
                  href={`${lang === 'en' ? '' : `/${lang}`}/${card.type === 'url' ? 'tools/url' : card.type === 'wifi' ? 'tools/wifi' : card.type === 'whatsapp' ? 'tools/whatsapp' : 'tools/business-vcard'}`}
                  onClick={(event) => { event.preventDefault(); onNavigate(card.type === 'url' ? 'url' : card.type === 'wifi' ? 'wifi' : card.type === 'whatsapp' ? 'whatsapp' : 'business'); }}
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
                    <span>{lang === 'ar' ? `إنشاء ${card.titleKey}` : `Create ${card.titleKey}`}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                  </div>
                </a>
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
              {lang === 'ar' ? 'سريع وسهل الاستخدام' : lang === 'fr' ? 'Rapide et intuitif' : lang === 'es' ? 'Rápido e intuitivo' : 'Quick &amp; Intuitive'}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl mt-1">
              {lang === 'ar' ? 'كيف يعمل QR GENIUS في 3 خطوات؟' : lang === 'fr' ? 'Comment fonctionne QR GENIUS en 3 étapes' : lang === 'es' ? 'Cómo funciona QR GENIUS en 3 pasos' : 'How QR GENIUS Works in 3 Steps'}
            </h2>
            <p className="text-sm text-slate-600 mt-3">
              {lang === 'ar' ? 'لا تسجيل ولا بطاقة ائتمان ولا انتظار. أنشئ رموز QR جاهزة للاستخدام خلال ثوانٍ.' : lang === 'fr' ? 'Sans inscription, sans carte bancaire et sans attente. Créez des QR codes prêts à l’emploi en quelques secondes.' : lang === 'es' ? 'Sin registro, tarjeta de crédito ni esperas. Crea códigos QR listos para usar en segundos.' : 'No registration, no credit card, no waiting. Generate production-ready QR codes in seconds.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs relative">
              <span className="text-3xl font-extrabold text-indigo-700 block mb-4">
                01.
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'ar' ? 'اختر نوع البيانات' : lang === 'fr' ? 'Choisissez le type de contenu' : lang === 'es' ? 'Elige el tipo de contenido' : 'Choose Your Payload'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar' ? 'اختر من بين 12 نوعاً قياسياً: رابط موقع، بيانات شبكة Wi-Fi، محادثة واتساب، بطاقة vCard، بريد إلكتروني أو رسالة SMS.' : lang === 'fr' ? 'Choisissez parmi 12 formats standard : URL web, identifiants Wi-Fi, discussion WhatsApp, carte vCard, e-mail ou SMS.' : lang === 'es' ? 'Elige entre 12 formatos estándar: URL web, credenciales Wi-Fi, chat de WhatsApp, tarjeta vCard, correo electrónico o SMS.' : 'Pick from 12 industry-standard formats: Web URL, Wi-Fi network credentials, WhatsApp chat, vCard business card, Email, or SMS.'}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs relative">
              <span className="text-3xl font-extrabold text-indigo-700 block mb-4">
                02.
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'ar' ? 'أضف هويتك وخصص الرمز' : lang === 'fr' ? 'Personnalisez votre identité' : lang === 'es' ? 'Personaliza tu diseño' : 'Brand &amp; Customize'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar' ? 'خصص رمز QR بألوان علامتك التجارية والتدرجات وأنماط النقاط وأشكال الإطارات، وأضف شعار شركتك.' : lang === 'fr' ? 'Personnalisez votre QR code avec les couleurs de votre marque, des dégradés, des motifs de points, des cadres et votre logo.' : lang === 'es' ? 'Personaliza tu código QR con los colores de tu marca, degradados, patrones de puntos, marcos e incorpora tu logotipo.' : 'Style your QR code with your brand colors, gradients, custom dot patterns, corner frame shapes, and embed your company logo.'}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs relative">
              <span className="text-3xl font-extrabold text-indigo-700 block mb-4">
                03.
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {lang === 'ar' ? 'صدّر واطبع' : lang === 'fr' ? 'Exporter et imprimer' : lang === 'es' ? 'Exportar e imprimir' : 'Export Vector &amp; Print'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === 'ar' ? 'نزّل ملف SVG متجهياً للطباعة الاحترافية أو PNG بدقة تصل إلى 2048 بكسل أو صفحات PDF جاهزة للطباعة بحجم A4.' : lang === 'fr' ? 'Téléchargez un SVG vectoriel pour l’impression professionnelle, un PNG haute résolution (jusqu’à 2048 px) ou des feuilles PDF A4 prêtes à imprimer.' : lang === 'es' ? 'Descarga un SVG vectorial para impresión profesional, PNG de alta resolución (hasta 2048 px) o páginas PDF A4 listas para imprimir.' : 'Download infinite-resolution vector SVG for professional print shops, high-res PNG (up to 2048px), or ready-to-print A4 PDF sheets.'}
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
                {lang === 'ar' ? 'لماذا يختارنا المحترفون؟' : lang === 'fr' ? 'Pourquoi les professionnels nous choisissent' : lang === 'es' ? 'Por qué nos eligen los profesionales' : 'Why Professionals Choose Us'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {lang === 'ar' ? 'مصمم للطباعة عالية الدقة واللوحات والتسويق اليومي' : lang === 'fr' ? 'Conçu pour l’impression haute résolution, les panneaux et le marketing quotidien' : lang === 'es' ? 'Diseñado para impresión de alta resolución, carteles y marketing diario' : 'Built for High-DPI Print, Billboards, and Daily Marketing'}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {lang === 'ar' ? 'على عكس الخدمات التي تقيّد التنزيل أو تستخدم روابط تتبع مؤقتة، ينشئ QR GENIUS رموز QR ثابتة ومتوافقة مع معيار ISO وتظل صالحة ما دامت وجهتها متاحة.' : lang === 'fr' ? 'Contrairement aux services qui limitent les téléchargements ou utilisent des liens temporaires, QR GENIUS crée des QR codes statiques conformes à la norme ISO, qui restent fonctionnels tant que leur destination est disponible.' : lang === 'es' ? 'A diferencia de los servicios que limitan las descargas o usan enlaces temporales, QR GENIUS crea códigos QR estáticos compatibles con ISO que siguen funcionando mientras el destino esté disponible.' : 'QR GENIUS creates static QR codes that encode their destination directly. They do not rely on a QR GENIUS redirect subscription and continue to work while the destination remains available and the code is readable.'}
              </p>

              <div className="space-y-3.5 pt-2">
                {([
                  lang === 'ar' ? 'رموز ثابتة لا تعتمد على عدّاد مسح من QR Genius' : lang === 'fr' ? 'Codes statiques sans compteur de scans QR GENIUS' : lang === 'es' ? 'Códigos estáticos sin contador de escaneos de QR GENIUS' : 'Static codes without a QR GENIUS scan counter',
                  lang === 'ar' ? 'إنشاء محلي: لا تغادر البيانات متصفحك' : lang === 'fr' ? 'Génération locale : vos données ne quittent pas le navigateur' : lang === 'es' ? 'Generación local: tus datos no salen del navegador' : 'Client-side generation: payloads never leave your browser',
                  lang === 'ar' ? 'صيغة SVG متجهة قابلة للتكبير دون فقدان الوضوح' : lang === 'fr' ? 'Le SVG vectoriel s’agrandit sans perte de netteté' : lang === 'es' ? 'El SVG vectorial se amplía sin perder nitidez' : 'Vector SVG format allows infinite scaling without blurriness',
                  lang === 'ar' ? 'تصحيح أخطاء قابل للتعديل للحفاظ على قابلية المسح مع الشعارات' : lang === 'fr' ? 'Correction d’erreurs réglable pour préserver la lisibilité avec un logo' : lang === 'es' ? 'Corrección de errores ajustable para mantener la legibilidad con logotipos' : 'Adjustable Error Correction ensures readability with logos',
                  lang === 'ar' ? 'دعم كامل للغات واتجاه الكتابة من اليمين إلى اليسار' : lang === 'fr' ? 'Prise en charge multilingue et RTL' : lang === 'es' ? 'Compatibilidad multilingüe y RTL' : 'Full multilingual RTL support for global audiences'
                ]).map((point, idx) => (
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
                <div className="text-xs font-bold text-slate-900 mb-1">{lang === 'ar' ? 'محلي وخاص' : lang === 'fr' ? 'Local et privé' : lang === 'es' ? 'Local y privado' : 'Local &amp; Private'}</div>
                <p className="text-xs text-slate-600">{lang === 'ar' ? 'يتم إنشاء الرمز داخل المتصفح ولا يُرسل محتواه إلى خوادمنا لغرض التوليد.' : lang === 'fr' ? 'Le code est généré dans le navigateur et son contenu n’est pas envoyé à nos serveurs pour cette opération.' : lang === 'es' ? 'El código se genera en el navegador y su contenido no se envía a nuestros servidores para generarlo.' : 'The code is generated in your browser; its content is not sent to our servers for generation.'}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">2048px</div>
                <div className="text-xs font-bold text-slate-900 mb-1">{lang === 'ar' ? 'دقة فائقة' : lang === 'fr' ? 'Ultra haute résolution' : lang === 'es' ? 'Ultra resolución' : 'Ultra Resolution'}</div>
                <p className="text-xs text-slate-600">{lang === 'ar' ? 'ملفات PNG واضحة وجاهزة للوحات والعبوات.' : lang === 'fr' ? 'Exports PNG nets, prêts pour les panneaux et emballages.' : lang === 'es' ? 'Exportaciones PNG nítidas, listas para carteles y embalajes.' : 'Crystal-clear raster PNG exports ready for signs &amp; packaging.'}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">SVG</div>
                <div className="text-xs font-bold text-slate-900 mb-1">{lang === 'ar' ? 'رسومات متجهية حقيقية' : lang === 'fr' ? 'Véritable format vectoriel' : lang === 'es' ? 'Vectorial auténtico' : 'True Vector'}</div>
                <p className="text-xs text-slate-600">{lang === 'ar' ? 'مسارات SVG دقيقة ومتوافقة مع Illustrator وFigma.' : lang === 'fr' ? 'Tracés SVG précis, compatibles avec Illustrator et Figma.' : lang === 'es' ? 'Trazados SVG precisos, compatibles con Illustrator y Figma.' : 'Clean mathematical SVG paths for Illustrator and Figma.'}</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left rtl:text-right">
                <div className="text-3xl font-extrabold text-indigo-600 mb-1">4</div>
                <div className="text-xs font-bold text-slate-900 mb-1">{lang === 'ar' ? 'اللغات واتجاه RTL' : lang === 'fr' ? 'Langues et RTL' : lang === 'es' ? 'Idiomas y RTL' : 'Languages + RTL'}</div>
                <p className="text-xs text-slate-600">{lang === 'ar' ? 'الإنجليزية والعربية باتجاه RTL والفرنسية والإسبانية.' : lang === 'fr' ? 'Anglais, arabe avec prise en charge RTL, français et espagnol.' : lang === 'es' ? 'Inglés, árabe con compatibilidad RTL, francés y español.' : 'English, Arabic with full RTL mirroring, French, and Spanish.'}</p>
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
            {lang === 'ar' ? 'هل أنت مستعد لإنشاء رمز QR مخصص؟' : lang === 'fr' ? 'Prêt à créer votre QR code personnalisé ?' : lang === 'es' ? '¿Listo para crear tu código QR personalizado?' : 'Ready to Generate Your Custom QR Code?'}
          </h2>
          <p className="text-sm text-indigo-100 max-w-xl mx-auto leading-relaxed">
            {lang === 'ar' ? 'انضم إلى المستخدمين الذين ينشئون رموز QR مجانية وأنيقة لأعمالهم ومشاريعهم كل يوم.' : lang === 'fr' ? 'Rejoignez les entreprises, créateurs et organisateurs qui créent chaque jour de magnifiques QR codes gratuits.' : lang === 'es' ? 'Únete a empresas, creadores y organizadores que generan cada día códigos QR gratuitos y atractivos.' : 'Join thousands of businesses, creators, and organizers generating free, beautiful QR codes daily.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('generator')}
            className="py-3.5 px-8 rounded-xl font-bold text-sm bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg transition-colors inline-flex items-center gap-2"
          >
            <span>{lang === 'ar' ? 'ابدأ إنشاء الرموز الآن' : lang === 'fr' ? 'Commencer maintenant' : lang === 'es' ? 'Empezar ahora' : 'Start Generating Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
