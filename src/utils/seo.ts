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
      title: "QR GENIUS – Free Multilingual QR Code Generator | Create. Scan. Connect.",
      description: "Generate free, customizable QR codes instantly. Support for URLs, Wi-Fi, WhatsApp, vCards, and social media with vector SVG, high-res PNG, and PDF downloads.",
      keywords: "free qr code generator, custom qr code, vector qr svg, wifi qr code, whatsapp qr, vcard qr code",
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
      title: "QR Studio – Full Custom QR Code Generator & Designer | QR GENIUS",
      description: "Design custom QR codes with company logos, modern dot styles, custom colors, gradients, and error correction. 100% free with instant downloads.",
      keywords: "qr code studio, qr designer, custom qr dots, qr logo generator, free high res qr",
      canonicalPath: "/generator",
      h1: "QR Code Studio & Custom Designer"
    },
    ar: {
      title: "استوديو QR – صمم وخصص رموز الاستجابة السريعة بالكامل | كيو آر جينيوس",
      description: "صمم رموز QR احترافية مع إضافة الشعار وتخصيص الألوان والنقاط والتدرجات. مجاني 100% مع تنزيل فوري.",
      keywords: "استوديو كيو ار, مصمم باركود, كيو ار مع لوجو, تخصيص الباركود",
      canonicalPath: "/generator",
      h1: "استوديو تصميم وتخصيص رموز QR"
    },
    fr: {
      title: "Studio QR – Générateur & Créateur de QR Code Sur-Mesure | QR GENIUS",
      description: "Concevez des QR codes sur-mesure avec logos d'entreprise, styles de points variés, couleurs et dégradés. 100% gratuit et sans inscription.",
      keywords: "studio qr code, createur qr sur mesure, qr avec logo, export qr haute resolution",
      canonicalPath: "/generator",
      h1: "Studio de Création & Personnalisation de QR Codes"
    },
    es: {
      title: "Estudio QR – Generador y Diseñador Completo de Códigos QR | QR GENIUS",
      description: "Diseñe códigos QR a medida con logotipos empresariales, estilos de puntos modernos, degradados y colores. 100% gratuito.",
      keywords: "estudio qr, disenador de qr, qr con logotipo, descargar qr vector",
      canonicalPath: "/generator",
      h1: "Estudio y Diseñador Completo de Códigos QR"
    }
  },
  url: {
    en: {
      title: "Free Website URL QR Code Generator | Instant Links | QR GENIUS",
      description: "Convert any website link or landing page into a clean, permanent QR code with custom colors and logo embedding. Free and scan-guaranteed.",
      keywords: "url to qr code, link qr code generator, website qr code, free webpage qr",
      canonicalPath: "/tools/url",
      h1: "Website URL QR Code Generator"
    },
    ar: {
      title: "مولد رمز QR لرابط موقع إلكتروني مجاناً | روابط فورية | كيو آر جينيوس",
      description: "حول أي رابط موقع أو صفحة هبوط إلى رمز QR دائم واحترافي مع تخصيص الألوان وإضافة الشعار.",
      keywords: "تحويل رابط الى باركود, كود موقع ويب, باركود رابط مجاني",
      canonicalPath: "/tools/url",
      h1: "مولد رموز QR لروابط المواقع الإلكترونية"
    },
    fr: {
      title: "Générateur de QR Code pour Liens URL | Liens Web Rapides | QR GENIUS",
      description: "Transformez vos liens web et pages de destination en QR codes permanents avec couleurs et logos personnalisés.",
      keywords: "lien vers qr code, generateur qr url, qr code site internet",
      canonicalPath: "/tools/url",
      h1: "Générateur de QR Code pour URL de Site Web"
    },
    es: {
      title: "Generador de Código QR para URLs de Sitios Web | Enlaces Directos | QR GENIUS",
      description: "Convierta cualquier enlace web en un código QR limpio y permanente con colores personalizados e inserción de logotipo.",
      keywords: "convertir enlace a qr, generador qr url, qr pagina web",
      canonicalPath: "/tools/url",
      h1: "Generador de Códigos QR para Enlaces Web"
    }
  },
  wifi: {
    en: {
      title: "Free Wi-Fi QR Code Generator | Connect Without Password | QR GENIUS",
      description: "Create a scan-to-connect Wi-Fi QR code for your guests, café, or office. Works on iPhone and Android with WPA/WPA2, WEP, and hidden networks.",
      keywords: "wifi qr code, scan to connect wifi, guest wifi qr code, generate wifi qr, free wifi barcode",
      canonicalPath: "/tools/wifi",
      h1: "Scan-to-Connect Wi-Fi QR Code Generator"
    },
    ar: {
      title: "مولد رمز QR لشبكات الواي فاي مجاناً | اتصال بدون كتابة كلمة السر | كيو آر جينيوس",
      description: "أنشئ رمز QR للواي فاي لضيوفك أو مقهاك أو مكتبك. يعمل على آيفون وأندرويد فورياً مع دعم شبكات WPA وWEP والشبكات المخفية.",
      keywords: "باركود واي فاي, مشاركة شبكة نت qr, اتصال فوري بالواي فاي",
      canonicalPath: "/tools/wifi",
      h1: "مولد رموز QR للاتصال بشبكات الواي فاي"
    },
    fr: {
      title: "Générateur de QR Code Wi-Fi Gratuit | Connexion Directe Sans Mot de Passe | QR GENIUS",
      description: "Créez un QR code Wi-Fi pour vos invités, restaurant ou bureau. Fonctionne sur iOS et Android sans taper le mot de passe.",
      keywords: "qr code wifi gratuit, connexion directe wifi, qr reseau invite",
      canonicalPath: "/tools/wifi",
      h1: "Générateur de QR Code Wi-Fi pour Connexion Instantanée"
    },
    es: {
      title: "Generador de Código QR para Redes Wi-Fi Gratis | Conexión Sin Contraseña | QR GENIUS",
      description: "Genere un código QR de Wi-Fi para sus invitados, cafetería u oficina. Compatible con iOS y Android con seguridad WPA/WPA2.",
      keywords: "qr wifi gratis, conectar a wifi con qr, qr red invitados",
      canonicalPath: "/tools/wifi",
      h1: "Generador de Códigos QR para Conexión Wi-Fi"
    }
  },
  whatsapp: {
    en: {
      title: "Free WhatsApp QR Code Generator | Direct Chat Link | QR GENIUS",
      description: "Generate a click-to-chat WhatsApp QR code with pre-filled greeting message. Ideal for customer support, sales, and marketing flyers.",
      keywords: "whatsapp qr code, wa me qr generator, whatsapp direct chat qr, scan to message whatsapp",
      canonicalPath: "/tools/whatsapp",
      h1: "Direct Chat WhatsApp QR Code Generator"
    },
    ar: {
      title: "مولد رمز QR لمحادثات واتساب مجاناً | فتح شات مباشر | كيو آر جينيوس",
      description: "أنشئ رمز QR لمحادثة واتساب مباشرة مع رسالة ترحيبية جاهزة. مثالي لخدمة العملاء والمبيعات والملصقات الإعلانية.",
      keywords: "باركود واتساب, رابط واتس مباشر, محادثة فورية qr",
      canonicalPath: "/tools/whatsapp",
      h1: "مولد رموز QR لمحادثات واتساب المباشرة"
    },
    fr: {
      title: "Générateur de QR Code WhatsApp Gratuit | Chat Direct & Message | QR GENIUS",
      description: "Créez un QR code WhatsApp avec message pré-rempli pour votre support client, vos ventes et vos supports de communication.",
      keywords: "qr code whatsapp, lien direct whatsapp, scanner pour discuter whatsapp",
      canonicalPath: "/tools/whatsapp",
      h1: "Générateur de QR Code pour WhatsApp Chat Direct"
    },
    es: {
      title: "Generador de Código QR para WhatsApp Gratis | Chat Directo | QR GENIUS",
      description: "Cree un código QR para iniciar chat en WhatsApp con mensaje prediseñado. Perfecto para atención al cliente y ventas.",
      keywords: "qr whatsapp gratis, escanear chat whatsapp, enlace directo whatsapp",
      canonicalPath: "/tools/whatsapp",
      h1: "Generador de Códigos QR para Chat Directo de WhatsApp"
    }
  },
  business: {
    en: {
      title: "Free vCard Digital Business Card QR Code Generator | QR GENIUS",
      description: "Create digital contact vCard QR codes. When scanned, customers can instantly save your name, phone, email, and company directly to phone contacts.",
      keywords: "vcard qr code, digital business card qr, contact qr generator, save contact qr",
      canonicalPath: "/tools/business-vcard",
      h1: "Digital vCard Business Card QR Generator"
    },
    ar: {
      title: "مولد رمز QR لبطاقات العمل الرقمية vCard مجاناً | كيو آر جينيوس",
      description: "أنشئ رمز QR لبطاقة عملك الرقمية. عند مسح الرمز، يمكن للعملاء حفظ اسمك ورقم هاتفك وبريدك وشركتك في جهات الاتصال فوراً.",
      keywords: "بطاقة عمل ذكية qr, باركود vcard, حفظ جهة اتصال بالباركود",
      canonicalPath: "/tools/business-vcard",
      h1: "مولد رموز QR لبطاقات العمل وجهات الاتصال vCard"
    },
    fr: {
      title: "Générateur de QR Code Carte de Visite vCard | QR GENIUS",
      description: "Créez un QR code pour votre carte de visite numérique vCard. Permet aux contacts d'enregistrer vos coordonnées en un clic.",
      keywords: "qr code vcard, carte de visite numerique qr, enregistrer contact qr",
      canonicalPath: "/tools/business-vcard",
      h1: "Générateur de QR Code pour Cartes de Visite vCard"
    },
    es: {
      title: "Generador de Códigos QR para Tarjetas Digitales vCard | QR GENIUS",
      description: "Cree códigos QR de tarjetas de presentación vCard. Permite a sus clientes guardar sus datos de contacto al instante.",
      keywords: "qr vcard, tarjeta de presentacion qr, guardar contacto con qr",
      canonicalPath: "/tools/business-vcard",
      h1: "Generador de Códigos QR para Tarjetas de Contacto vCard"
    }
  },
  about: {
    en: {
      title: "About QR GENIUS – Our Mission & Client-Side Privacy Architecture",
      description: "Learn how QR GENIUS provides free, fast, and 100% private QR code generation locally in your web browser with zero telemetry or data storage.",
      keywords: "about qr genius, private qr code generator, client side qr, free safe qr codes",
      canonicalPath: "/about",
      h1: "About QR GENIUS & Our Privacy Commitment"
    },
    ar: {
      title: "عن كيو آر جينيوس – مهمتنا وبنيتنا البرمجية القائمة على حماية الخصوصية",
      description: "تعرف على كيفية عمل كيو آر جينيوس لتقديم توليد رموز QR مجاناً وبأمان 100% محلياً داخل متصفحك دون تخزين أي بيانات.",
      keywords: "عن كيو ار جينيوس, خصوصية الباركود, امان توليد qr",
      canonicalPath: "/about",
      h1: "عن كيو آر جينيوس والتزامنا بحماية الخصوصية"
    },
    fr: {
      title: "À propos de QR GENIUS – Notre Mission & Confidentialité Locale",
      description: "Découvrez notre engagement pour un générateur de QR codes gratuit, ultra-rapide et 100% privé exécuté directement dans votre navigateur.",
      keywords: "a propos qr genius, generateur qr prive, confidentialite qr code",
      canonicalPath: "/about",
      h1: "À propos de QR GENIUS & Confidentialité"
    },
    es: {
      title: "Sobre QR GENIUS – Nuestra Misión y Privacidad en el Navegador",
      description: "Conozca cómo QR GENIUS genera códigos QR gratuitos, rápidos y 100% privados directamente en su navegador sin almacenar datos.",
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
      title: "Privacy Policy – 100% In-Browser QR Generation | QR GENIUS",
      description: "Our comprehensive privacy policy explains why your QR codes never touch our servers. Zero tracking, zero logging, zero cookies for data payload.",
      keywords: "qr genius privacy policy, no tracking qr, client side security",
      canonicalPath: "/privacy",
      h1: "Privacy Policy"
    },
    ar: {
      title: "سياسة الخصوصية – معالجة محلية 100% داخل المتصفح | كيو آر جينيوس",
      description: "سياسة الخصوصية الشاملة توضح كيف يتم توليد جميع الرموز محلياً دون إرسالها إلى خوادمنا مع ضمان عدم تعقب البيانات إطلاقاً.",
      keywords: "سياسة خصوصية qr, حماية بيانات الباركود",
      canonicalPath: "/privacy",
      h1: "سياسة الخصوصية"
    },
    fr: {
      title: "Politique de Confidentialité – Traitement 100% Local | QR GENIUS",
      description: "Notre politique de confidentialité détaille l'exécution locale de tous vos QR codes, sans aucun enregistrement de données.",
      keywords: "politique confidentialite qr code, securite donnees qr",
      canonicalPath: "/privacy",
      h1: "Politique de Confidentialité"
    },
    es: {
      title: "Política de Privacidad – Procesamiento Local en Navegador | QR GENIUS",
      description: "Nuestra política de privacidad garantiza que sus datos nunca se envían a servidores externos. Cero registros y total seguridad.",
      keywords: "politica privacidad qr, seguridad codigo qr local",
      canonicalPath: "/privacy",
      h1: "Política de Privacidad"
    }
  },
  terms: {
    en: {
      title: "Terms of Service – Free Commercial & Personal Usage | QR GENIUS",
      description: "Terms and conditions for using QR GENIUS. All generated QR codes are free for both commercial, non-profit, and personal use with zero royalties.",
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
  return path === '/' ? `/${lang}/` : `/${lang}${path}`;
}

export function updateDocumentSEO(pageId: PageId, lang: Language) {
  const meta = SEO_METADATA[pageId]?.[lang] || SEO_METADATA.home.en;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://getqrgenius.com';
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
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://getqrgenius.com';
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
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://getqrgenius.com';
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
