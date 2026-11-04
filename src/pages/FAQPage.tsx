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


const FAQS_FR: FAQItem[] = [
  { id: 'f1', category: 'general', question: 'La création de QR codes avec QR GENIUS est-elle gratuite ?', answer: 'Oui. Les 12 générateurs sont gratuits pour un usage personnel et commercial, sans inscription obligatoire ni limite de scans imposée par QR GENIUS.' },
  { id: 'f2', category: 'general', question: 'Les QR codes expirent-ils ?', answer: 'Les outils créent des QR codes statiques : les données sont intégrées directement dans le code. Ils restent utilisables tant que le lien ou le service de destination fonctionne.' },
  { id: 'f3', category: 'print', question: 'Quel format choisir pour une impression professionnelle ?', answer: 'Choisissez SVG pour les affiches, emballages et impressions grand format : ce format vectoriel peut être redimensionné sans pixellisation. Le PNG haute résolution convient aux usages numériques et aux documents courants.' },
  { id: 'f4', category: 'print', question: 'Quelle taille minimale prévoir à l’impression ?', answer: 'Pour un usage courant, prévoyez au moins 2 × 2 cm, avec un contraste net et une marge blanche autour du code. Augmentez la taille lorsque le QR code doit être lu de plus loin.' },
  { id: 'f5', category: 'security', question: 'Mes données sont-elles protégées pendant la création ?', answer: 'La génération est effectuée localement dans votre navigateur. Les contenus saisis pour les réseaux Wi-Fi, les contacts ou les liens ne sont pas envoyés à nos serveurs pour créer le QR code.' },
  { id: 'f6', category: 'technical', question: 'À quoi sert la correction d’erreurs (ECC) ?', answer: 'La correction d’erreurs aide un QR code à rester lisible si une partie est masquée ou endommagée. Les niveaux vont de L à H. Si vous ajoutez un logo, testez toujours le code avec plusieurs téléphones avant impression.' },
  { id: 'f7', category: 'technical', question: 'Puis-je ajouter mon propre logo au QR code ?', answer: 'Oui. Ouvrez l’onglet Logo dans QR Studio et choisissez une icône proposée ou importez votre fichier PNG, JPG ou SVG.' },
  { id: 'f8', category: 'general', question: 'Quelle est la différence entre un QR code statique et dynamique ?', answer: 'Un code statique contient directement les données et sa destination ne peut pas être modifiée après création. Un code dynamique utilise généralement une redirection qui permet de changer la destination. QR GENIUS crée des codes statiques.' }
];

const FAQS_ES: FAQItem[] = [
  { id: 'f1', category: 'general', question: '¿Crear códigos QR con QR GENIUS es realmente gratis?', answer: 'Sí. Los 12 generadores son gratuitos para uso personal y comercial, sin registro obligatorio ni límites de escaneo impuestos por QR GENIUS.' },
  { id: 'f2', category: 'general', question: '¿Los códigos QR caducan?', answer: 'Las herramientas crean códigos QR estáticos: los datos se guardan directamente en el patrón. Seguirán funcionando mientras el enlace o servicio de destino esté disponible.' },
  { id: 'f3', category: 'print', question: '¿Qué formato debo descargar para impresión profesional?', answer: 'Elige SVG para carteles, envases e impresiones grandes: es un formato vectorial que se puede ampliar sin pixelarse. PNG de alta resolución es adecuado para usos digitales y documentos habituales.' },
  { id: 'f4', category: 'print', question: '¿Qué tamaño mínimo se recomienda para imprimir un QR?', answer: 'Para un uso habitual, recomendamos al menos 2 × 2 cm, con buen contraste y un margen blanco alrededor. Aumenta el tamaño si se va a escanear desde más lejos.' },
  { id: 'f5', category: 'security', question: '¿Están protegidos mis datos al crear códigos QR?', answer: 'La generación se realiza localmente en tu navegador. Los datos introducidos para redes Wi-Fi, contactos o enlaces no se envían a nuestros servidores para crear el código.' },
  { id: 'f6', category: 'technical', question: '¿Para qué sirve la corrección de errores (ECC)?', answer: 'La corrección de errores ayuda a leer un QR aunque una parte esté tapada o dañada. Los niveles van de L a H. Si añades un logotipo, prueba el código con varios teléfonos antes de imprimirlo.' },
  { id: 'f7', category: 'technical', question: '¿Puedo añadir mi propio logotipo al código QR?', answer: 'Sí. Abre la pestaña Logotipo en QR Studio y selecciona un icono disponible o sube tu archivo PNG, JPG o SVG.' },
  { id: 'f8', category: 'general', question: '¿Cuál es la diferencia entre códigos QR estáticos y dinámicos?', answer: 'Un código estático contiene los datos directamente y su destino no se puede cambiar después de crearlo. Un código dinámico suele usar una redirección que permite cambiar el destino. QR GENIUS crea códigos estáticos.' }
];

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
  const faqs = lang === 'ar' ? FAQS_AR : lang === 'fr' ? FAQS_FR : lang === 'es' ? FAQS_ES : FAQS;
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
