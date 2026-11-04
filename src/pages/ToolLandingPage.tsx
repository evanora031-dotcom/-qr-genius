import React, { useState } from 'react';
import { 
  Globe, 
  Wifi, 
  MessageSquare, 
  Contact, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Download,
  Share2
} from 'lucide-react';
import { Language, PageId, QRType } from '../types';
import { translations } from '../i18n/translations';
import { AdPlacement } from '../components/AdPlacement';
import { FormInputs } from '../components/QRStudio/FormInputs';
import { QRPreviewCard } from '../components/QRStudio/QRPreviewCard';
import { formatPayload } from '../utils/qrFormatter';
import { Category3DIcon } from '../components/icons/Category3DIcon';

interface ToolLandingPageProps {
  tool: 'url' | 'wifi' | 'whatsapp' | 'business';
  lang: Language;
  onNavigate: (page: PageId, type?: QRType) => void;
  onHistoryUpdated: () => void;
}

const TOOL_CONFIGS = {
  url: {
    type: 'url' as QRType,
    badge: 'Official Web Tool',
    title: 'Free Website URL QR Code Generator',
    subtitle: 'Convert any website, landing page, blog post, or e-commerce shop into a permanent, scan-ready QR code with custom colors and logo embedding.',
    benefits: [
      'Instant redirects to any web address with zero middleman redirection',
      'Fully compatible with Google Analytics and UTM campaign tracking tags',
      'Download infinite-resolution vector SVG for banners and packaging',
      'No scan limits, no monthly subscriptions, and no expiration dates'
    ],
    faqs: [
      { q: 'Do URL QR codes generated here ever expire?', a: 'No! QR GENIUS generates standard static ISO QR codes containing your direct web address. As long as your website stays online, your QR code will work forever.' },
      { q: 'Can I include UTM tracking parameters in the URL?', a: 'Yes! Simply append your UTM parameters (e.g. ?utm_source=flyer&utm_medium=qr) directly into the URL input field.' },
      { q: 'What is the best format to print on physical flyers?', a: 'We recommend downloading the Vector SVG format or the Ultra High-Res 2048px PNG. Both ensure crisp sharpness even on large outdoor banners.' }
    ]
  },
  wifi: {
    type: 'wifi' as QRType,
    badge: 'Connect Without Passwords',
    title: 'Wi-Fi Network QR Code Generator',
    subtitle: 'Create a clean scan-to-connect Wi-Fi QR code for your guests, Airbnb, café, or office. Works natively on iPhone and Android with zero typing required.',
    benefits: [
      'Guests scan with their built-in camera and tap "Join Network" immediately',
      'Supports WPA, WPA2, WPA3 personal security, WEP, and Open networks',
      'Option to support hidden SSIDs (non-broadcasted networks)',
      '100% private: your Wi-Fi password is only encoded in the QR code, never stored on servers'
    ],
    faqs: [
      { q: 'Do guests need an app to scan the Wi-Fi code?', a: 'No! Both modern iOS (iPhone Camera) and Android (Google Lens / Camera) automatically recognize Wi-Fi QR codes and prompt the user to join the network.' },
      { q: 'Is it safe to generate my Wi-Fi QR code here?', a: 'Yes. QR GENIUS processes your Wi-Fi credentials 100% locally in your browser JavaScript. Your Wi-Fi password never leaves your device.' },
      { q: 'What happens if I change my Wi-Fi password in the future?', a: 'Static Wi-Fi QR codes contain the exact password you entered. If you change your router password, simply generate and print a new code.' }
    ]
  },
  whatsapp: {
    type: 'whatsapp' as QRType,
    badge: 'Direct Click-to-Chat',
    title: 'WhatsApp Direct Chat QR Code Generator',
    subtitle: 'Generate a click-to-message WhatsApp QR code with a pre-filled greeting. Ideal for customer service desks, flyers, product boxes, and menus.',
    benefits: [
      'Customers tap or scan to open a conversation directly in WhatsApp',
      'Pre-fill custom greeting messages to triage inquiries quickly',
      'Works internationally across all countries and mobile carriers',
      'Embed official WhatsApp logo inside the QR code with one click'
    ],
    faqs: [
      { q: 'How does WhatsApp QR code routing work?', a: 'The QR code encodes a standard https://wa.me/number link. When scanned by a phone camera, it immediately launches the WhatsApp app with your designated recipient.' },
      { q: 'Do I need to include the country code?', a: 'Yes! Always include the full international country calling code (e.g. +1 for USA/Canada, +44 for UK, +971 for UAE) without dashes or spaces.' },
      { q: 'Can users edit the pre-filled message before sending?', a: 'Yes. The pre-filled message appears in their text box, and they can freely modify it before hitting the send button.' }
    ]
  },
  business: {
    type: 'vcard' as QRType,
    badge: 'Digital Business Card',
    title: 'vCard Digital Business Card QR Code Generator',
    subtitle: 'Turn your contact info into a modern digital business card. When colleagues or clients scan your code, your name, phone, email, company, and website are saved directly to their phonebook.',
    benefits: [
      'Eliminates lost paper business cards and manual contact typing errors',
      'Stores full contact profiles: Name, Job Title, Company, Phone, Email, Address & Notes',
      'Industry-standard vCard 3.0 format recognized by iOS Contacts and Google Contacts',
      'Ideal for conferences, badges, email signatures, and resume portfolios'
    ],
    faqs: [
      { q: 'How does vCard scanning work on smartphones?', a: 'When scanned with an iPhone or Android camera, a prompt appears: "Add to Contacts". Tapping it immediately fills in all contact fields for one-tap saving.' },
      { q: 'Is there a limit on how many people can scan my vCard QR?', a: 'None at all. You can print it on 10,000 cards or display it on a presentation slide; it has unlimited lifetime scans.' },
      { q: 'Can I add my company logo to the center of the vCard QR?', a: 'Yes! Open our Full Studio designer to upload your company logo and adjust custom colors.' }
    ]
  }
};


const TOOL_CONFIGS_AR: typeof TOOL_CONFIGS = {
  url: {
    type: 'url', badge: 'أداة المواقع الرسمية', title: 'مولّد رمز QR مجاني لرابط الموقع',
    subtitle: 'حوّل أي موقع أو صفحة هبوط أو مدونة أو متجر إلكتروني إلى رمز QR دائم وجاهز للمسح، مع إمكانية تخصيص الألوان وإضافة الشعار.',
    benefits: ['يفتح أي عنوان ويب مباشرةً دون روابط تحويل وسيطة', 'متوافق مع Google Analytics ومعلمات تتبع حملات UTM', 'تنزيل SVG متجهي قابل للتكبير للطباعة واللافتات والتغليف', 'دون حدود للمسح أو اشتراكات شهرية أو تاريخ انتهاء'],
    faqs: [
      { q: 'هل تنتهي صلاحية رموز QR الخاصة بروابط المواقع؟', a: 'لا. ينشئ QR GENIUS رموزاً ثابتة تتضمن عنوان موقعك مباشرةً. سيعمل الرمز ما دام موقعك متاحاً على الإنترنت.' },
      { q: 'هل يمكن إضافة معلمات تتبع UTM إلى الرابط؟', a: 'نعم، أضف معلمات UTM إلى الرابط مباشرةً في حقل الإدخال قبل إنشاء الرمز.' },
      { q: 'ما أفضل صيغة لطباعة الرمز على المنشورات؟', a: 'نوصي بصيغة SVG المتجهة أو صورة PNG فائقة الدقة 2048 بكسل للحصول على طباعة واضحة.' }
    ]
  },
  wifi: {
    type: 'wifi', badge: 'اتصل دون كتابة كلمة المرور', title: 'مولّد رمز QR لشبكة Wi-Fi',
    subtitle: 'أنشئ رمز Wi-Fi يتيح لضيوفك الاتصال بسهولة في المنزل أو المقهى أو المكتب. يعمل مع أجهزة iPhone وAndroid دون الحاجة إلى كتابة كلمة المرور.',
    benefits: ['يمسح الضيف الرمز بكاميرا الهاتف ثم يختار الاتصال بالشبكة', 'يدعم أنواع الحماية WPA وWPA2 وWPA3 وWEP والشبكات المفتوحة', 'يدعم خيار الشبكات المخفية التي لا تبث اسمها', 'خصوصية تامة: تُشفّر كلمة المرور داخل الرمز ولا تُخزّن على الخوادم'],
    faqs: [
      { q: 'هل يحتاج الضيوف إلى تطبيق لمسح رمز Wi-Fi؟', a: 'لا. تتعرف معظم أجهزة iPhone وAndroid الحديثة على رموز Wi-Fi باستخدام الكاميرا أو Google Lens وتعرض خيار الاتصال.' },
      { q: 'هل إنشاء رمز Wi-Fi هنا آمن؟', a: 'نعم. تتم معالجة بيانات الشبكة محلياً داخل متصفحك ولا تغادر كلمة المرور جهازك.' },
      { q: 'ماذا أفعل إذا غيّرت كلمة مرور الشبكة؟', a: 'يتضمن الرمز الثابت كلمة المرور القديمة؛ أنشئ رمزاً جديداً باستخدام كلمة المرور المحدّثة ثم اطبعه.' }
    ]
  },
  whatsapp: {
    type: 'whatsapp', badge: 'محادثة مباشرة بنقرة', title: 'مولّد رمز QR لمحادثة واتساب مباشرة',
    subtitle: 'أنشئ رمز واتساب يفتح محادثة مباشرة مع رسالة ترحيب جاهزة. مناسب لخدمة العملاء والمنشورات وعلب المنتجات والقوائم.',
    benefits: ['يفتح للعملاء محادثة مباشرة في واتساب عند مسح الرمز', 'أضف رسالة ترحيب مسبقة لتسهيل استقبال الاستفسارات', 'يعمل دولياً مع أرقام الهواتف من مختلف البلدان', 'أضف شعار واتساب الرسمي داخل رمز QR بنقرة واحدة'],
    faqs: [
      { q: 'كيف يعمل رمز QR الخاص بواتساب؟', a: 'يحتوي الرمز على رابط wa.me القياسي. عند مسحه، يفتح الهاتف تطبيق واتساب للمحادثة مع الرقم المحدد.' },
      { q: 'هل يجب تضمين رمز الدولة؟', a: 'نعم. أدخل رمز الاتصال الدولي كاملاً مع الرقم، دون شرطات أو مسافات.' },
      { q: 'هل يستطيع المستخدم تعديل الرسالة قبل إرسالها؟', a: 'نعم. تظهر الرسالة الجاهزة في مربع الكتابة ويمكن للمستخدم تعديلها قبل الإرسال.' }
    ]
  },
  business: {
    type: 'vcard', badge: 'بطاقة عمل رقمية', title: 'مولّد رمز QR لبطاقة العمل الرقمية vCard',
    subtitle: 'حوّل بيانات الاتصال إلى بطاقة عمل رقمية. عند مسح الرمز، يمكن حفظ الاسم والهاتف والبريد والشركة والموقع مباشرةً في جهات اتصال الهاتف.',
    benefits: ['استغنِ عن بطاقات العمل الورقية وإدخال بيانات الاتصال يدوياً', 'احفظ الاسم والمسمى الوظيفي والشركة والهاتف والبريد والعنوان والملاحظات', 'صيغة vCard 3.0 متوافقة مع جهات اتصال iOS وGoogle', 'مثالية للمؤتمرات وبطاقات التعريف وتوقيعات البريد والسير الذاتية'],
    faqs: [
      { q: 'كيف يعمل مسح vCard على الهواتف؟', a: 'عند مسح الرمز بكاميرا الهاتف، يظهر خيار إضافة جهة الاتصال مع تعبئة حقول البيانات لتسهيل حفظها.' },
      { q: 'هل يوجد حد لعدد مرات مسح بطاقة vCard؟', a: 'لا. يمكنك طباعة الرمز على عدد كبير من البطاقات أو عرضه في عرض تقديمي، دون حد لمرات المسح.' },
      { q: 'هل يمكن إضافة شعار الشركة إلى وسط الرمز؟', a: 'نعم. افتح استوديو QR الكامل لرفع شعار الشركة وتخصيص الألوان.' }
    ]
  }
};


const TOOL_CONFIGS_FR: typeof TOOL_CONFIGS = {
url:{type:'url',badge:'Outil gratuit en ligne',title:'Générateur de QR Code pour URL',subtitle:'Transformez un site web ou une boutique en QR code permanent, prêt à scanner, avec couleurs et logo personnalisables.',benefits:['Ouvrez directement toute adresse web','Compatible avec Google Analytics et les paramètres UTM','Téléchargez un SVG vectoriel pour une impression nette','Sans limite de scans, abonnement ni expiration'],faqs:[{q:'Les QR codes URL expirent-ils ?',a:'Non. Le code statique contient directement votre adresse web et fonctionne tant que le site reste en ligne.'},{q:'Puis-je ajouter des paramètres UTM ?',a:'Oui, ajoutez-les directement à l’adresse dans le champ URL.'},{q:'Quel format choisir pour imprimer ?',a:'Le SVG vectoriel ou le PNG 2048 px offre une impression nette.'}]},
wifi:{type:'wifi',badge:'Connexion sans mot de passe',title:'Générateur de QR Code Wi-Fi',subtitle:'Créez un QR code Wi-Fi pour vos invités, votre café ou votre bureau. Compatible avec iPhone et Android.',benefits:['Les invités scannent le code pour rejoindre le réseau','Prend en charge WPA, WPA2, WPA3, WEP et les réseaux ouverts','Compatible avec les réseaux masqués','Le mot de passe est intégré au code et non stocké sur nos serveurs'],faqs:[{q:'Faut-il une application pour scanner ?',a:'Non. Les appareils récents reconnaissent les QR codes Wi-Fi avec leur appareil photo.'},{q:'La création est-elle sécurisée ?',a:'Oui. Les données Wi-Fi sont traitées localement dans votre navigateur.'},{q:'Que faire si je change le mot de passe ?',a:'Créez un nouveau QR code avec le mot de passe mis à jour.'}]},
whatsapp:{type:'whatsapp',badge:'Discussion directe',title:'Générateur de QR Code WhatsApp',subtitle:'Créez un QR code qui ouvre une discussion WhatsApp avec un message prérempli. Idéal pour le service client et les supports publicitaires.',benefits:['Ouvrez une conversation WhatsApp après le scan','Préremplissez un message d’accueil','Fonctionne avec les numéros internationaux','Ajoutez le logo WhatsApp au QR code'],faqs:[{q:'Comment fonctionne le QR code WhatsApp ?',a:'Il contient un lien wa.me qui ouvre la conversation avec le numéro indiqué.'},{q:'Dois-je inclure l’indicatif du pays ?',a:'Oui, saisissez le numéro au format international sans tirets ni espaces.'},{q:'Le message peut-il être modifié ?',a:'Oui, le message prérempli peut être modifié avant son envoi.'}]},
business:{type:'vcard',badge:'Carte de visite numérique',title:'Générateur de QR Code vCard',subtitle:'Transformez vos coordonnées en carte de visite numérique enregistrable dans les contacts après le scan.',benefits:['Évitez les cartes papier et la saisie manuelle','Enregistrez nom, poste, entreprise, téléphone et e-mail','Format vCard 3.0 compatible avec iOS et Google','Idéal pour conférences et signatures e-mail'],faqs:[{q:'Comment fonctionne une vCard ?',a:'Le téléphone propose d’ajouter le contact et remplit les champs disponibles.'},{q:'Existe-t-il une limite de scans ?',a:'Non, les scans ne sont pas limités.'},{q:'Puis-je ajouter un logo ?',a:'Oui, utilisez le studio complet pour ajouter votre logo et personnaliser les couleurs.'}]}
};
const TOOL_CONFIGS_ES: typeof TOOL_CONFIGS = {
url:{type:'url',badge:'Herramienta gratuita en línea',title:'Generador de códigos QR para URL',subtitle:'Convierte un sitio web o una tienda en un código QR permanente, listo para escanear y con colores y logotipo personalizados.',benefits:['Abre cualquier dirección web directamente','Compatible con Google Analytics y parámetros UTM','Descarga SVG vectorial para imprimir con nitidez','Sin límites de escaneos, suscripciones ni caducidad'],faqs:[{q:'¿Caducan los códigos QR de URL?',a:'No. El código estático contiene tu dirección web y funciona mientras el sitio esté en línea.'},{q:'¿Puedo añadir parámetros UTM?',a:'Sí, añádelos directamente a la dirección en el campo URL.'},{q:'¿Qué formato es mejor para imprimir?',a:'SVG vectorial o PNG de 2048 px ofrecen una impresión nítida.'}]},
wifi:{type:'wifi',badge:'Conexión sin contraseña',title:'Generador de códigos QR para Wi-Fi',subtitle:'Crea un código QR Wi-Fi para invitados, cafeterías u oficinas. Compatible con iPhone y Android.',benefits:['Los invitados escanean el código para conectarse','Compatible con WPA, WPA2, WPA3, WEP y redes abiertas','Admite redes ocultas','La contraseña se codifica en el QR y no se guarda en servidores'],faqs:[{q:'¿Se necesita una aplicación para escanear?',a:'No. Los dispositivos modernos reconocen los códigos QR Wi-Fi con la cámara.'},{q:'¿Es seguro crear el código?',a:'Sí. Los datos Wi-Fi se procesan localmente en el navegador.'},{q:'¿Qué hago si cambio la contraseña?',a:'Genera un nuevo código QR con la contraseña actualizada.'}]},
whatsapp:{type:'whatsapp',badge:'Chat directo',title:'Generador de códigos QR para WhatsApp',subtitle:'Crea un código QR que abre un chat de WhatsApp con un mensaje preparado. Ideal para atención al cliente y publicidad.',benefits:['Abre una conversación de WhatsApp al escanear','Prepara un mensaje de bienvenida','Funciona con números internacionales','Añade el logotipo de WhatsApp al código'],faqs:[{q:'¿Cómo funciona el QR de WhatsApp?',a:'Contiene un enlace wa.me que abre el chat con el número indicado.'},{q:'¿Debo incluir el prefijo del país?',a:'Sí, introduce el número internacional completo sin guiones ni espacios.'},{q:'¿Se puede editar el mensaje?',a:'Sí, el mensaje preparado puede modificarse antes de enviarlo.'}]},
business:{type:'vcard',badge:'Tarjeta de visita digital',title:'Generador de códigos QR para vCard',subtitle:'Convierte tus datos de contacto en una tarjeta digital que se puede guardar en la agenda al escanear.',benefits:['Evita las tarjetas de papel y la introducción manual','Guarda nombre, cargo, empresa, teléfono y correo','Formato vCard 3.0 compatible con iOS y Google','Ideal para eventos y firmas de correo'],faqs:[{q:'¿Cómo funciona una vCard?',a:'El teléfono ofrece añadir el contacto y completa los campos disponibles.'},{q:'¿Hay un límite de escaneos?',a:'No, los escaneos son ilimitados.'},{q:'¿Puedo añadir un logotipo?',a:'Sí, abre el estudio completo para añadir tu logotipo y personalizar los colores.'}]}
};
const TOOL_UI = {
en:{online:'Free Online Tool',customTitle:'Need full custom colors, logos & shapes?',customText:'Open our studio to access all custom options.',studio:'Full Studio',why:'Why Use Our',security:'Client-Side Security Guarantee',securityText:'QR GENIUS processes QR data locally in your browser; payloads are not sent to or logged on our servers.',customize:'Customize in Studio',faqs:'Frequently Asked Questions'},
ar:{online:'أداة مجانية عبر الإنترنت',customTitle:'هل تريد تخصيص الألوان والشعارات والأشكال؟',customText:'افتح الاستوديو للوصول إلى جميع خيارات التخصيص.',studio:'الاستوديو الكامل',why:'لماذا تستخدم',security:'ضمان الأمان والمعالجة المحلية',securityText:'يعالج QR GENIUS بيانات الرمز محلياً داخل متصفحك ولا يرسلها إلى خوادمه أو يسجلها.',customize:'خصص الرمز في الاستوديو',faqs:'الأسئلة الشائعة'},
fr:{online:'Outil gratuit en ligne',customTitle:'Personnalisez couleurs, logos et formes',customText:'Ouvrez le studio pour accéder à toutes les options.',studio:'Studio complet',why:'Pourquoi utiliser',security:'Protection et traitement local',securityText:'QR GENIUS traite les données localement dans votre navigateur, sans les envoyer ni les enregistrer sur ses serveurs.',customize:'Personnaliser dans le studio',faqs:'Questions fréquentes'},
es:{online:'Herramienta gratuita en línea',customTitle:'Personaliza colores, logotipos y formas',customText:'Abre el estudio para acceder a todas las opciones.',studio:'Estudio completo',why:'Por qué usar',security:'Protección y procesamiento local',securityText:'QR GENIUS procesa los datos localmente en tu navegador, sin enviarlos ni guardarlos en sus servidores.',customize:'Personalizar en el estudio',faqs:'Preguntas frecuentes'}
};

export const ToolLandingPage: React.FC<ToolLandingPageProps> = ({
  tool,
  lang,
  onNavigate,
  onHistoryUpdated
}) => {
  const toolData = lang === 'ar' ? TOOL_CONFIGS_AR[tool] : lang === 'fr' ? TOOL_CONFIGS_FR[tool] : lang === 'es' ? TOOL_CONFIGS_ES[tool] : TOOL_CONFIGS[tool];
  const ui = TOOL_UI[lang];
  const t = translations[lang];

  // Dedicated local state for instant mini-studio
  const [payload, setPayload] = useState<any>(() => {
    switch (tool) {
      case 'url':
        return 'https://yourwebsite.com';
      case 'wifi':
        return { ssid: 'Guest_WiFi', password: 'WelcomeGuest2026', encryption: 'WPA', hidden: false };
      case 'whatsapp':
        return { countryCode: '+1', phoneNumber: '5550192834', message: 'Hello! I am interested in your services.' };
      case 'business':
        return {
          firstName: 'Jordan',
          lastName: 'Lee',
          company: 'Nexus Creative',
          jobTitle: 'Creative Director',
          phone: '+1 (555) 789-0123',
          email: 'jordan@nexuscreative.com',
          website: 'https://nexuscreative.com',
          city: 'Chicago',
          country: 'USA',
          notes: 'Connect with me on LinkedIn'
        };
    }
  });

  const formattedContent = formatPayload(toolData.type, payload);

  const previewConfig = {
    content: formattedContent,
    errorCorrectionLevel: 'M' as const,
    margin: 2,
    fgColor: tool === 'wifi' ? '#6D28D9' : tool === 'whatsapp' ? '#059669' : tool === 'business' ? '#0284C7' : '#4F46E5',
    bgColor: '#FFFFFF',
    transparentBg: false,
    useGradient: true,
    gradientColor: tool === 'whatsapp' ? '#10B981' : '#7C3AED',
    gradientDirection: 'to-br' as const,
    dotStyle: 'rounded' as const,
    cornerSquareStyle: 'rounded' as const,
    cornerDotStyle: 'rounded' as const,
    customCornerColor: false,
    cornerSquareColor: '#4F46E5',
    cornerDotColor: '#4F46E5',
    logoUrl: undefined,
    logoPreset: tool === 'whatsapp' ? 'whatsapp' : tool === 'wifi' ? 'wifi' : tool === 'url' ? 'link' : undefined,
    logoSize: 22,
    logoPadding: 5,
    logoBgShape: 'rounded' as const,
    logoBgColor: '#FFFFFF'
  };

  return (
    <div className="py-4 sm:py-8 lg:py-12 bg-white overflow-x-hidden w-full box-border">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 lg:space-y-16 w-full box-border">
        {/* Header / Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 max-w-4xl text-left rtl:text-right w-full box-border">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 tracking-wide uppercase mb-2 sm:mb-3">
              <span>{toolData.badge}</span>
              <span className="text-slate-300">·</span>
              <span>{ui.online}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {toolData.title}
            </h1>
            <p className="mt-2.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              {toolData.subtitle}
            </p>
          </div>

          <div className="shrink-0 self-start sm:self-center p-3 sm:p-4 bg-slate-50 border border-slate-200/80 rounded-2xl sm:rounded-3xl shadow-sm">
            <Category3DIcon type={toolData.type} size={64} animateHover={true} />
          </div>
        </div>

        {/* Live Interactive Tool Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start bg-slate-50/70 p-2.5 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 w-full box-border">
          <div className="lg:col-span-7 space-y-4">
            <FormInputs
              type={toolData.type}
              lang={lang}
              rawPayload={payload}
              onChangePayload={setPayload}
              onClear={() => setPayload('')}
              onReset={() => {}}
              formattedContent={formattedContent}
            />

            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800">{ui.customTitle}</span>
                <p className="text-slate-500 text-[11px] mt-0.5">{ui.customText}</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('generator', toolData.type)}
                className="py-2 px-3.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>{ui.studio}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <QRPreviewCard
              config={previewConfig}
              type={toolData.type}
              title={toolData.title}
              lang={lang}
              onHistoryUpdated={onHistoryUpdated}
            />
          </div>
        </div>

        {/* Benefits & Value Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">
              {lang === 'ar' ? `لماذا تستخدم ${toolData.title}؟` : `${ui.why} ${toolData.title}?`}
            </h2>
            <div className="space-y-4">
              {toolData.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>{ui.security}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {ui.securityText}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('generator', toolData.type)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>{ui.customize}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Tool FAQs */}
        <div className="pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-8">
            {ui.faqs}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolData.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-slate-200 bg-white space-y-2">
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Placement */}
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>
    </div>
  );
};
