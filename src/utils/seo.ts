import { Language, PageId } from '../types';

export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  h1: string;
}

export const SEO_METADATA: Record<PageId, Record<Language, PageMeta>> = {
  home: {
    en: {
      title: "Free QR Code Generator Online | QR Genius",
      description: "Create free QR codes online for links, Wi-Fi, WhatsApp, and more. Customize colors and logos, then download PNG, SVG, or PDF with QR Genius.",
      keywords: "free qr code generator online, qr code generator free online, create qr code free, website qr code",
      canonicalPath: "/",
      h1: "Create. Scan. Connect. The Free High-Speed QR Generator"
    },
    ar: {
      title: "كيو آر جينيوس – مولد رموز QR مجاني متعدد اللغات | أنشئ. امسح. تواصل.",
      description: "أنشئ رموز QR مجانية ومخصصة فوراً. دعم روابط المواقع، شبكات الواي فاي، محادثات الواتساب، وبطاقات العمل مع تصدير عالي الدقة بصيغ SVG وPNG وPDF.",
      keywords: "مولد باركود مجاني, تصميم باركود qr, كيو ار واي فاي, كود واتساب, بطاقة عمل qr",
      canonicalPath: "/",
      h1: "أنشئ. امسح. تواصل. المولد المجاني فائق السرعة لرموز QR"
    },
    fr: {
      title: "QR GENIUS – Générateur de QR Code Gratuit & Multilingue | Créer. Scanner. Connecter.",
      description: "Générez des QR codes gratuits et personnalisés instantanément. Compatible URLs, Wi-Fi, WhatsApp, vCards avec exports vectoriels SVG, PNG haute définition et PDF.",
      keywords: "generateur qr code gratuit, qr code vectoriel svg, qr wifi, qr whatsapp, vcard qr",
      canonicalPath: "/",
      h1: "Créer. Scanner. Connecter. Le générateur de QR code rapide et gratuit"
    },
    es: {
      title: "QR GENIUS – Generador de Códigos QR Gratis y Multilingüe | Crear. Escanear. Conectar.",
      description: "Genere códigos QR gratuitos y personalizados al instante. Compatible con URLs, Wi-Fi, WhatsApp, vCards y redes sociales con descargas en SVG, PNG de alta resolución y PDF.",
      keywords: "generador codigo qr gratis, crear qr personalizado, qr wifi, qr whatsapp, tarjeta vcard qr",
      canonicalPath: "/",
      h1: "Crear. Escanear. Conectar. El generador de códigos QR gratuito de alta velocidad"
    }
  },
  generator: {
    en: {
      title: "Free QR Code Generator & Custom Designer | QR GENIUS",
      description: "Create free QR codes for links, Wi-Fi, WhatsApp and contacts. Customize colors and logos, then download PNG, SVG or PDF in your browser.",
      keywords: "qr code studio, qr designer, custom qr dots, qr logo generator, free high res qr",
      canonicalPath: "/generator",
      h1: "Free QR Code Generator & Custom Designer"
    },
    ar: {
      title: "مولد رموز QR مجاني مع تخصيص الشعار والألوان | كيو آر جينيوس",
      description: "أنشئ رمز QR مجاناً للرابط أو الواي فاي أو واتساب أو بطاقة الاتصال، وخصّص الألوان والشعار ثم نزّله بصيغة PNG أو SVG أو PDF.",
      keywords: "استوديو كيو ار, مصمم باركود, كيو ار مع لوجو, تخصيص الباركود",
      canonicalPath: "/generator",
      h1: "مولد رموز QR مجاني مع تخصيص التصميم"
    },
    fr: {
      title: "Générateur de QR Code Gratuit et Personnalisable | QR GENIUS",
      description: "Créez gratuitement un QR code pour URL, Wi-Fi, WhatsApp ou vCard. Personnalisez les couleurs et le logo, puis téléchargez en PNG, SVG ou PDF.",
      keywords: "studio qr code, createur qr sur mesure, qr avec logo, export qr haute resolution",
      canonicalPath: "/generator",
      h1: "Générateur de QR Codes Gratuit et Personnalisable"
    },
    es: {
      title: "Generador de Códigos QR Gratis y Personalizable | QR GENIUS",
      description: "Crea códigos QR gratis para enlaces, Wi-Fi, WhatsApp o vCard. Personaliza colores y logotipos y descarga en PNG, SVG o PDF.",
      keywords: "estudio qr, disenador de qr, qr con logotipo, descargar qr vector",
      canonicalPath: "/generator",
      h1: "Generador de Códigos QR Gratis y Personalizable"
    }
  },
  url: {
    en: {
      title: "QR Code for Website – Free URL QR Generator | QR Genius",
      description: "Create a QR code for your website free. Turn a link into a static QR code, customize its colors or logo, and download PNG or SVG with QR Genius.",
      keywords: "qr code for website, turn link into qr code, create qr code for website, url to qr code",
      canonicalPath: "/tools/url",
      h1: "URL to QR Code Generator for Website Links"
    },
    ar: {
      title: "مولد QR للرابط والموقع الإلكتروني مجاناً | QR Genius",
      description: "حوّل رابط موقعك إلى رمز QR قابل للتخصيص، وأضف الألوان أو الشعار ثم نزّله للمشاركة أو الطباعة.",
      keywords: "تحويل رابط الى باركود, كود موقع ويب, باركود رابط مجاني",
      canonicalPath: "/tools/url",
      h1: "مولد رموز QR لروابط المواقع الإلكترونية"
    },
    fr: {
      title: "Générateur QR Code URL Gratuit | Lien de Site Web | QR GENIUS",
      description: "Convertissez une adresse web en QR code personnalisable. Ajoutez des couleurs ou un logo, puis téléchargez-le pour le partager ou l’imprimer.",
      keywords: "lien vers qr code, generateur qr url, qr code site internet",
      canonicalPath: "/tools/url",
      h1: "Générateur de QR Code pour URL de Site Web"
    },
    es: {
      title: "Generador QR para URL Gratis | Código para Enlaces Web | QR GENIUS",
      description: "Convierte una dirección web en un código QR personalizable. Añade colores o un logotipo y descárgalo para compartir o imprimir.",
      keywords: "convertir enlace a qr, generador qr url, qr pagina web",
      canonicalPath: "/tools/url",
      h1: "Generador de Códigos QR para Enlaces Web"
    }
  },
  wifi: {
    en: {
      title: "Free Wi-Fi QR Code Generator | Scan to Connect | QR GENIUS",
      description: "Create a Wi-Fi QR code so guests can join your network without typing the password. Customize the code and share it at home, work, or your café.",
      keywords: "wifi qr code, scan to connect wifi, guest wifi qr code, generate wifi qr, free wifi barcode",
      canonicalPath: "/tools/wifi",
      h1: "Scan-to-Connect Wi-Fi QR Code Generator"
    },
    ar: {
      title: "مولد QR للواي فاي مجاناً | مشاركة الشبكة بالمسح | QR Genius",
      description: "أنشئ رمز QR لشبكة Wi-Fi كي يتصل الضيوف دون كتابة كلمة المرور. خصّص الرمز وشاركه في المنزل أو المكتب أو المقهى.",
      keywords: "باركود واي فاي, مشاركة شبكة نت qr, اتصال فوري بالواي فاي",
      canonicalPath: "/tools/wifi",
      h1: "مولد رموز QR للاتصال بشبكات الواي فاي"
    },
    fr: {
      title: "Générateur QR Code Wi-Fi Gratuit | Connexion par Scan | QR GENIUS",
      description: "Créez un QR code Wi-Fi pour permettre à vos invités de rejoindre le réseau sans saisir le mot de passe. Personnalisez-le et partagez-le facilement.",
      keywords: "qr code wifi gratuit, connexion directe wifi, qr reseau invite",
      canonicalPath: "/tools/wifi",
      h1: "Générateur de QR Code Wi-Fi pour Connexion Instantanée"
    },
    es: {
      title: "Generador QR Wi-Fi Gratis | Conexión al Escanear | QR GENIUS",
      description: "Crea un código QR Wi-Fi para que tus invitados se conecten sin escribir la contraseña. Personalízalo y compártelo en casa, la oficina o tu cafetería.",
      keywords: "qr wifi gratis, conectar a wifi con qr, qr red invitados",
      canonicalPath: "/tools/wifi",
      h1: "Generador de Códigos QR para Conexión Wi-Fi"
    }
  },
  whatsapp: {
    en: {
      title: "Free WhatsApp QR Code Generator | Scan to Chat | QR GENIUS",
      description: "Create a WhatsApp QR code that opens a chat with your number and an optional pre-filled message. Share it on flyers, menus, or business materials.",
      keywords: "whatsapp qr code, wa me qr generator, whatsapp direct chat qr, scan to message whatsapp",
      canonicalPath: "/tools/whatsapp",
      h1: "Direct Chat WhatsApp QR Code Generator"
    },
    ar: {
      title: "مولد QR لواتساب مجاناً | رابط محادثة مباشرة | QR Genius",
      description: "أنشئ رمز QR يفتح محادثة واتساب مع رقمك ورسالة اختيارية جاهزة. شاركه على المنشورات أو القوائم أو مواد العمل.",
      keywords: "باركود واتساب, رابط واتس مباشر, محادثة فورية qr",
      canonicalPath: "/tools/whatsapp",
      h1: "مولد رموز QR لمحادثات واتساب المباشرة"
    },
    fr: {
      title: "Générateur QR Code WhatsApp Gratuit | Lien de Discussion | QR GENIUS",
      description: "Créez un QR code qui ouvre une discussion WhatsApp avec votre numéro et un message facultatif. Partagez-le sur vos menus ou supports professionnels.",
      keywords: "qr code whatsapp, lien direct whatsapp, scanner pour discuter whatsapp",
      canonicalPath: "/tools/whatsapp",
      h1: "Générateur de QR Code pour WhatsApp Chat Direct"
    },
    es: {
      title: "Generador QR WhatsApp Gratis | Enlace para Chatear | QR GENIUS",
      description: "Crea un código QR que abre un chat de WhatsApp con tu número y un mensaje opcional. Compártelo en folletos, menús o materiales comerciales.",
      keywords: "qr whatsapp gratis, escanear chat whatsapp, enlace directo whatsapp",
      canonicalPath: "/tools/whatsapp",
      h1: "Generador de Códigos QR para Chat Directo de WhatsApp"
    }
  },
  business: {
    en: {
      title: "Business Card QR Code Generator – Free vCard | QR GENIUS",
      description: "Make a free business card QR code with a vCard. Add your name, company, phone and email so people can scan and save your contact details.",
      keywords: "vcard qr code, digital business card qr, contact qr generator, save contact qr",
      canonicalPath: "/tools/business-vcard",
      h1: "Business Card QR Code Generator (vCard)"
    },
    ar: {
      title: "مولد QR لبطاقة العمل الرقمية vCard مجاناً | QR Genius",
      description: "أنشئ رمز QR لبطاقة عملك الرقمية مع الاسم والهاتف والبريد والشركة. يمكن مسح الرمز لفتح بيانات الاتصال وحفظها على هاتف متوافق.",
      keywords: "بطاقة عمل ذكية qr, باركود vcard, حفظ جهة اتصال بالباركود",
      canonicalPath: "/tools/business-vcard",
      h1: "مولد رموز QR لبطاقات العمل وجهات الاتصال vCard"
    },
    fr: {
      title: "Générateur QR Code vCard Gratuit | Carte de Visite | QR GENIUS",
      description: "Créez un QR code vCard avec vos coordonnées. Vos contacts peuvent le scanner pour ouvrir votre fiche et l’enregistrer sur un téléphone compatible.",
      keywords: "qr code vcard, carte de visite numerique qr, enregistrer contact qr",
      canonicalPath: "/tools/business-vcard",
      h1: "Générateur de QR Code pour Cartes de Visite vCard"
    },
    es: {
      title: "Generador QR vCard Gratis | Tarjeta de Visita Digital | QR GENIUS",
      description: "Crea un código QR vCard con tus datos de contacto. Otras personas pueden escanearlo para abrir tu ficha y guardarla en un teléfono compatible.",
      keywords: "qr vcard, tarjeta de presentacion qr, guardar contacto con qr",
      canonicalPath: "/tools/business-vcard",
      h1: "Generador de Códigos QR para Tarjetas de Contacto vCard"
    }
  },
  about: {
    en: {
      title: "About QR GENIUS – Our Mission & Client-Side Privacy Architecture",
      description: "Learn how QR GENIUS creates QR codes in your browser and stores recent-code history locally on your device.",
      keywords: "about qr genius, private qr code generator, client side qr, free safe qr codes",
      canonicalPath: "/about",
      h1: "About QR GENIUS & Our Privacy Commitment"
    },
    ar: {
      title: "عن كيو آر جينيوس – مهمتنا وبنيتنا البرمجية القائمة على حماية الخصوصية",
      description: "تعرف على كيفية إنشاء رموز QR داخل متصفحك وحفظ سجل الرموز الأخيرة محلياً على جهازك.",
      keywords: "عن كيو ار جينيوس, خصوصية الباركود, امان توليد qr",
      canonicalPath: "/about",
      h1: "عن كيو آر جينيوس والتزامنا بحماية الخصوصية"
    },
    fr: {
      title: "À propos de QR GENIUS – Notre Mission & Confidentialité Locale",
      description: "Découvrez comment QR GENIUS crée les codes QR dans votre navigateur et conserve localement l’historique récent sur votre appareil.",
      keywords: "a propos qr genius, generateur qr prive, confidentialite qr code",
      canonicalPath: "/about",
      h1: "À propos de QR GENIUS & Confidentialité"
    },
    es: {
      title: "Sobre QR GENIUS – Nuestra Misión y Privacidad en el Navegador",
      description: "Descubra cómo QR GENIUS crea códigos QR en su navegador y guarda localmente el historial reciente en su dispositivo.",
      keywords: "sobre qr genius, privacidad qr, generador qr seguro",
      canonicalPath: "/about",
      h1: "Sobre QR GENIUS y Nuestro Compromiso de Privacidad"
    }
  },
  contact: {
    en: {
      title: "Contact QR GENIUS Support & Enterprise Inquiries",
      description: "Get in touch with the QR GENIUS engineering and support team for feedback, enterprise API integrations, or feature requests.",
      keywords: "contact qr genius, qr code support, enterprise qr inquiries",
      canonicalPath: "/contact",
      h1: "Contact Our Team"
    },
    ar: {
      title: "اتصل بفريق دعم واستفسارات كيو آر جينيوس",
      description: "تواصل مع فريق الدعم الفني والتطوير في كيو آر جينيوس للمقترحات أو استفسارات الأعمال والحلول المخصصة.",
      keywords: "اتصل بنا, دعم كيو ار, استفسارات المؤسسات",
      canonicalPath: "/contact",
      h1: "تواصل مع فريق كيو آر جينيوس"
    },
    fr: {
      title: "Contacter le Support & Équipe QR GENIUS",
      description: "Contactez notre équipe technique pour toute suggestion, demande de fonctionnalités ou intégration d'entreprise.",
      keywords: "contact qr genius, support qr code, demande entreprise qr",
      canonicalPath: "/contact",
      h1: "Contacter Notre Équipe"
    },
    es: {
      title: "Contacto y Soporte de QR GENIUS",
      description: "Póngase en contacto con el equipo de soporte e ingeniería de QR GENIUS para comentarios o consultas empresariales.",
      keywords: "contacto qr genius, soporte codigo qr, consultas empresariales",
      canonicalPath: "/contact",
      h1: "Póngase en Contacto con Nosotros"
    }
  },
  privacy: {
    en: {
      title: "Privacy Policy – QR Data, Browser Storage & Contact Form | QR GENIUS",
      description: "Learn how QR GENIUS processes QR content in your browser, stores history locally, and handles contact form messages.",
      keywords: "qr genius privacy policy, no tracking qr, client side security",
      canonicalPath: "/privacy",
      h1: "Privacy Policy"
    },
    ar: {
      title: "سياسة الخصوصية – بيانات QR والتخزين المحلي ونموذج التواصل | كيو آر جينيوس",
      description: "توضح السياسة معالجة محتوى QR في المتصفح، وحفظ السجل محلياً، والتعامل مع رسائل نموذج التواصل.",
      keywords: "سياسة خصوصية qr, حماية بيانات الباركود",
      canonicalPath: "/privacy",
      h1: "سياسة الخصوصية"
    },
    fr: {
      title: "Politique de Confidentialité – Données QR, Stockage et Contact | QR GENIUS",
      description: "Découvrez comment le contenu QR est traité dans le navigateur, comment l’historique y est stocké et comment les messages de contact sont traités.",
      keywords: "politique confidentialite qr code, securite donnees qr",
      canonicalPath: "/privacy",
      h1: "Politique de Confidentialité"
    },
    es: {
      title: "Política de Privacidad – Datos QR, Almacenamiento y Contacto | QR GENIUS",
      description: "Conoce cómo se procesa el contenido QR en el navegador, cómo se guarda el historial localmente y cómo se gestionan los mensajes de contacto.",
      keywords: "politica privacidad qr, seguridad codigo qr local",
      canonicalPath: "/privacy",
      h1: "Política de Privacidad"
    }
  },
  terms: {
    en: {
      title: "Terms of Service – Personal and Commercial Use | QR GENIUS",
      description: "Terms and conditions for creating and using QR codes with QR GENIUS for personal or commercial purposes.",
      keywords: "qr genius terms, commercial use qr code, free qr license",
      canonicalPath: "/terms",
      h1: "Terms of Service"
    },
    ar: {
      title: "شروط الاستخدام – استخدام مجاني تجاري وشخصي | كيو آر جينيوس",
      description: "شروط استخدام كيو آر جينيوس. جميع الرموز المنشأة مجانية للاستخدام التجاري والشخصي والترويجي دون أي رسوم.",
      keywords: "شروط الاستخدام, ترخيص كيو ار مجاني",
      canonicalPath: "/terms",
      h1: "شروط الاستخدام"
    },
    fr: {
      title: "Conditions d'Utilisation – Usage Commercial & Personnel Gratuit | QR GENIUS",
      description: "Conditions d'utilisation de QR GENIUS. Tous les codes générés sont utilisables librement à titre professionnel et personnel.",
      keywords: "conditions utilisation qr, licence qr code gratuite",
      canonicalPath: "/terms",
      h1: "Conditions d'Utilisation"
    },
    es: {
      title: "Términos de Servicio – Uso Comercial y Personal Gratuito | QR GENIUS",
      description: "Términos del servicio de QR GENIUS. Todos los códigos QR generados son de libre uso para fines comerciales y personales.",
      keywords: "terminos servicio qr, licencia gratuita codigo qr",
      canonicalPath: "/terms",
      h1: "Términos de Servicio"
    }
  },
  faq: {
    en: {
      title: "Frequently Asked Questions (FAQ) – QR Codes & Formats | QR GENIUS",
      description: "Answers to common questions about QR code lifespans, vector SVG print quality, Wi-Fi compatibility, and dynamic vs static codes.",
      keywords: "qr code faq, do qr codes expire, high resolution qr print, wifi qr guide",
      canonicalPath: "/faq",
      h1: "Frequently Asked Questions"
    },
    ar: {
      title: "الأسئلة الشائعة حول رموز الاستجابة السريعة QR | كيو آر جينيوس",
      description: "إجابات تفصيلية عن صلاحية الرموز، جودة الطباعة المتجهية SVG، توافق شبكات الواي فاي، والفرق بين الرموز الثابتة والديناميكية.",
      keywords: "اسئلة شائعة كيو ار, هل ينتهي باركود qr, طباعة باركود svg",
      canonicalPath: "/faq",
      h1: "الأسئلة الشائعة"
    },
    fr: {
      title: "Foire Aux Questions (FAQ) sur les QR Codes | QR GENIUS",
      description: "Réponses aux questions fréquentes sur la durée de vie des codes, la qualité vectorielle SVG et la compatibilité smartphone.",
      keywords: "faq qr code, est-ce que les qr codes expirent, impression qr svg",
      canonicalPath: "/faq",
      h1: "Foire Aux Questions"
    },
    es: {
      title: "Preguntas Frecuentes (FAQ) sobre Códigos QR | QR GENIUS",
      description: "Respuestas a dudas comunes sobre caducidad de códigos, calidad de impresión vectorial SVG y compatibilidad móvil.",
      keywords: "preguntas frecuentes qr, caducan los codigos qr, imprimir qr vector",
      canonicalPath: "/faq",
      h1: "Preguntas Frecuentes"
    }
  },
  sitemap: {
    en: {
      title: "XML Sitemap & URL Architecture | QR GENIUS",
      description: "Indexable XML sitemap directory for search engines and crawlers covering all multilingual QR tools and resource pages.",
      keywords: "qr genius sitemap, xml sitemap, indexable pages",
      canonicalPath: "/sitemap.xml",
      h1: "XML Sitemap & Site Directory"
    },
    ar: {
      title: "خريطة الموقع XML وهيكل الروابط | كيو آر جينيوس",
      description: "دليل خريطة الموقع XML لمحركات البحث وفهارس الأرشفة بجميع اللغات المدعومة.",
      keywords: "خريطة الموقع, sitemap xml",
      canonicalPath: "/sitemap.xml",
      h1: "خريطة الموقع XML"
    },
    fr: {
      title: "Plan de Site XML & Structure des Pages | QR GENIUS",
      description: "Index XML complet pour moteurs de recherche répertoriant tous nos outils et pages multilingues.",
      keywords: "plan de site xml, sitemap qr genius",
      canonicalPath: "/sitemap.xml",
      h1: "Plan de Site XML"
    },
    es: {
      title: "Mapa del Sitio XML y Arquitectura de Enlaces | QR GENIUS",
      description: "Directorio XML indexable para motores de búsqueda con todas las páginas y herramientas multilingües.",
      keywords: "mapa del sitio xml, sitemap qr",
      canonicalPath: "/sitemap.xml",
      h1: "Mapa del Sitio XML"
    }
  },
  robots: {
    en: {
      title: "Robots.txt Directive & Crawl Guidelines | QR GENIUS",
      description: "Directives for search engine web crawlers, robots, and automated indexing bots.",
      keywords: "robots.txt, crawl directives, search indexing",
      canonicalPath: "/robots.txt",
      h1: "Robots.txt Crawl Directive"
    },
    ar: {
      title: "ملف Robots.txt وتوجيهات محركات البحث | كيو آر جينيوس",
      description: "توجيهات ملف robots.txt لمحركات البحث وعناكب الفهرسة.",
      keywords: "ملف robots txt, فهرسة محركات البحث",
      canonicalPath: "/robots.txt",
      h1: "توجيهات ملف Robots.txt"
    },
    fr: {
      title: "Fichier Robots.txt & Directives d'Indexation | QR GENIUS",
      description: "Directives d'indexation pour les moteurs de recherche et robots d'exploration.",
      keywords: "robots txt, directives indexation google",
      canonicalPath: "/robots.txt",
      h1: "Directives Robots.txt"
    },
    es: {
      title: "Directivas de Robots.txt y Rastreo | QR GENIUS",
      description: "Directivas de rastreo e indexación para robots y motores de búsqueda.",
      keywords: "robots txt, indexacion google",
      canonicalPath: "/robots.txt",
      h1: "Directivas de Robots.txt"
    }
  }
};

const SEO_LANGUAGES: Language[] = ['en', 'ar', 'fr', 'es'];

function getLocalizedPath(path: string, lang: Language): string {
  if (lang === 'en') return path;
  return path === '/' ? `/${lang}/` : `/${lang}${path}`;
}

export function updateDocumentSEO(pageId: PageId, lang: Language) {
  const meta = SEO_METADATA[pageId]?.[lang] || SEO_METADATA.home.en;
  const baseUrl = 'https://getqrgenius.com';
  const canonicalUrl = `${baseUrl}${getLocalizedPath(meta.canonicalPath, lang)}`;

  document.title = meta.title;

  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', meta.description);

  const setMeta = (selector: string, value: string) => {
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      const [key, name] = selector.match(/\[(property|name)="([^"]+)"\]/)?.slice(1) || [];
      if (key && name) tag.setAttribute(key, name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', value);
  };

  setMeta('meta[property="og:title"]', meta.title);
  setMeta('meta[property="og:description"]', meta.description);
  setMeta('meta[property="og:url"]', canonicalUrl);
  setMeta('meta[name="twitter:title"]', meta.title);
  setMeta('meta[name="twitter:description"]', meta.description);

  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;

  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((node) => node.remove());
  SEO_LANGUAGES.forEach((locale) => {
    const alternate = document.createElement('link');
    alternate.rel = 'alternate';
    alternate.hreflang = locale;
    alternate.href = `${baseUrl}${getLocalizedPath(meta.canonicalPath, locale)}`;
    document.head.appendChild(alternate);
  });
  const defaultAlternate = document.createElement('link');
  defaultAlternate.rel = 'alternate';
  defaultAlternate.hreflang = 'x-default';
  defaultAlternate.href = `${baseUrl}${getLocalizedPath(meta.canonicalPath, 'en')}`;
  document.head.appendChild(defaultAlternate);

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

export function generateSitemapXML(): string {
  const baseUrl = 'https://getqrgenius.com';
  const pages: PageId[] = ['home', 'generator', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const page of pages) {
    for (const locale of SEO_LANGUAGES) {
      const path = SEO_METADATA[page][locale].canonicalPath;
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${getLocalizedPath(path, locale)}</loc>\n`;
      for (const alternateLocale of SEO_LANGUAGES) {
        xml += `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${baseUrl}${getLocalizedPath(path, alternateLocale)}" />\n`;
      }
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${getLocalizedPath(path, 'en')}" />\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;
  return xml;
}

export function generateRobotsTxt(): string {
  const baseUrl = 'https://getqrgenius.com';
  return `# Robots.txt for QR GENIUS
User-agent: *
Allow: /
Allow: /generator
Allow: /tools/
Allow: /about
Allow: /faq
Allow: /privacy
Allow: /terms

Sitemap: ${baseUrl}/sitemap.xml
`;
}
