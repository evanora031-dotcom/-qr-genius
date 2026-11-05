import { Language } from '../types';

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  nav: {
    home: string;
    studio: string;
    tools: string;
    urlQr: string;
    wifiQr: string;
    whatsappQr: string;
    businessQr: string;
    about: string;
    faq: string;
    contact: string;
    createQr: string;
    history: string;
  };
  qrTypes: {
    url: { label: string; desc: string };
    text: { label: string; desc: string };
    wifi: { label: string; desc: string };
    whatsapp: { label: string; desc: string };
    email: { label: string; desc: string };
    phone: { label: string; desc: string };
    sms: { label: string; desc: string };
    instagram: { label: string; desc: string };
    facebook: { label: string; desc: string };
    youtube: { label: string; desc: string };
    maps: { label: string; desc: string };
    vcard: { label: string; desc: string };
  };
  forms: {
    urlLabel: string;
    urlPlaceholder: string;
    textLabel: string;
    textPlaceholder: string;
    ssid: string;
    password: string;
    encryption: string;
    hiddenNetwork: string;
    countryCode: string;
    phoneNumber: string;
    message: string;
    emailTo: string;
    subject: string;
    body: string;
    address: string;
    latitude: string;
    longitude: string;
    firstName: string;
    lastName: string;
    company: string;
    jobTitle: string;
    website: string;
    workPhone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    notes: string;
    characterCount: string;
    clear: string;
    reset: string;
    copyContent: string;
    copied: string;
  };
  customizer: {
    tabColors: string;
    tabShapes: string;
    tabLogo: string;
    tabSettings: string;
    foreground: string;
    background: string;
    transparentBg: string;
    useGradient: string;
    gradientColor: string;
    gradientDirection: string;
    presets: string;
    dotStyle: string;
    cornerFrame: string;
    cornerDot: string;
    customCornerColors: string;
    cornerFrameColor: string;
    cornerDotColor: string;
    uploadLogo: string;
    uploadHint: string;
    removeLogo: string;
    logoPresets: string;
    logoSize: string;
    logoPadding: string;
    logoShape: string;
    logoBgColor: string;
    errorCorrection: string;
    ecLevelL: string;
    ecLevelM: string;
    ecLevelQ: string;
    ecLevelH: string;
    ecRecommendedForLogo: string;
    quietZone: string;
    shapeSquare: string;
    shapeDots: string;
    shapeRounded: string;
    shapeClassy: string;
    shapeDiamond: string;
    shapeExtraRounded: string;
    shapeLeaf: string;
    shapeCircle: string;
  };
  preview: {
    title: string;
    liveScanHint: string;
    downloadPng: string;
    downloadSvg: string;
    downloadPdf: string;
    copyImage: string;
    copiedImageToast: string;
    testScanner: string;
    testNotice: string;
    resolutionStandard: string;
    resolutionHigh: string;
    resolutionUltra: string;
    saveToHistory: string;
  };
  history: {
    title: string;
    empty: string;
    clearAll: string;
    load: string;
    delete: string;
    recentCodes: string;
  };
  pro: {
    badge: string;
    title: string;
    subtitle: string;
    freeTitle: string;
    proTitle: string;
    freeFeatures: string[];
    proFeatures: string[];
    freeCta: string;
    proCta: string;
    note: string;
  };
  ad: {
    label: string;
    placeholderTitle: string;
    placeholderDesc: string;
  };
  footer: {
    toolsTitle: string;
    companyTitle: string;
    legalTitle: string;
    aboutUs: string;
    privacy: string;
    terms: string;
    faq: string;
    sitemap: string;
    robots: string;
    rights: string;
    privacyNotice: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    brand: {
      name: "QR GENIUS",
      tagline: "Create. Scan. Connect.",
      description: "Free, high-speed, and multilingual QR Code Generator. Create custom styled QR codes with logos, colors, and instant vector SVG, PNG, and PDF downloads."
    },
    nav: {
      home: "Home",
      studio: "QR Studio",
      tools: "Tools",
      urlQr: "URL QR Code",
      wifiQr: "Wi-Fi QR Code",
      whatsappQr: "WhatsApp QR Code",
      businessQr: "vCard QR Code",
      about: "About Us",
      faq: "FAQ",
      contact: "Contact",
      createQr: "Generate QR Now",
      history: "History"
    },
    qrTypes: {
      url: { label: "Website URL", desc: "Link to any webpage, portal, or landing page" },
      text: { label: "Plain Text", desc: "Display messages, notes, or raw serial data" },
      wifi: { label: "Wi-Fi Network", desc: "Connect instantly without typing credentials" },
      whatsapp: { label: "WhatsApp", desc: "Direct chat link with pre-filled message" },
      email: { label: "Email", desc: "Pre-filled recipient, subject, and message body" },
      phone: { label: "Phone Call", desc: "One-tap direct telephone dialing" },
      sms: { label: "SMS Message", desc: "Quick text message with phone number" },
      instagram: { label: "Instagram", desc: "Direct profile, page, or post URL" },
      facebook: { label: "Facebook", desc: "Page, profile, or event link" },
      youtube: { label: "YouTube", desc: "Video or channel link" },
      maps: { label: "Google Maps", desc: "Precise GPS coordinates or business address" },
      vcard: { label: "vCard Contact", desc: "Digital business card with phone, email, and address" }
    },
    forms: {
      urlLabel: "Website or Page URL",
      urlPlaceholder: "https://yourwebsite.com",
      textLabel: "Text Content",
      textPlaceholder: "Enter your text message here...",
      ssid: "Network Name (SSID)",
      password: "Password",
      encryption: "Security Type",
      hiddenNetwork: "Hidden Network",
      countryCode: "Country Code",
      phoneNumber: "Phone Number",
      message: "Pre-filled Message (optional)",
      emailTo: "Recipient Email Address",
      subject: "Subject Line",
      body: "Email Message Content",
      address: "Address or Place Search",
      latitude: "Latitude (e.g. 40.7128)",
      longitude: "Longitude (e.g. -74.0060)",
      firstName: "First Name",
      lastName: "Last Name",
      company: "Company / Organization",
      jobTitle: "Job Title",
      website: "Website URL",
      workPhone: "Work / Mobile Phone",
      street: "Street Address",
      city: "City",
      state: "State / Province",
      zip: "Postal / ZIP Code",
      country: "Country",
      notes: "Bio / Additional Notes",
      characterCount: "characters",
      clear: "Clear",
      reset: "Reset Defaults",
      copyContent: "Copy Raw Content",
      copied: "Copied to clipboard!"
    },
    customizer: {
      tabColors: "Colors",
      tabShapes: "Shapes",
      tabLogo: "Logo",
      tabSettings: "Settings",
      foreground: "Foreground Color",
      background: "Background Color",
      transparentBg: "Transparent Background",
      useGradient: "Enable Gradient",
      gradientColor: "Gradient End Color",
      gradientDirection: "Direction",
      presets: "Curated SaaS Palettes",
      dotStyle: "Body Dot Pattern",
      cornerFrame: "Corner Frame Shape",
      cornerDot: "Corner Eyeball Shape",
      customCornerColors: "Custom Corner Colors",
      cornerFrameColor: "Corner Frame Color",
      cornerDotColor: "Corner Eyeball Color",
      uploadLogo: "Upload Custom Logo",
      uploadHint: "PNG, JPG, or SVG up to 2MB",
      removeLogo: "Remove Logo",
      logoPresets: "Popular Icon Presets",
      logoSize: "Logo Scale",
      logoPadding: "Logo White Padding",
      logoShape: "Background Badge",
      logoBgColor: "Badge Fill Color",
      errorCorrection: "Error Correction Level (ECC)",
      ecLevelL: "Low (7% recovery - smallest pattern)",
      ecLevelM: "Medium (15% recovery - balanced)",
      ecLevelQ: "Quartile (25% recovery - recommended for logos)",
      ecLevelH: "High (30% recovery - best durability)",
      ecRecommendedForLogo: "Automatically increased to high resilience for center logos.",
      quietZone: "Quiet Zone Margin",
      shapeSquare: "Classic Square",
      shapeDots: "Circles / Dots",
      shapeRounded: "Rounded Square",
      shapeClassy: "Classy Modern",
      shapeDiamond: "Diamond Cut",
      shapeExtraRounded: "Pill Rounded",
      shapeLeaf: "Leaf Corner",
      shapeCircle: "Circular"
    },
    preview: {
      title: "Live QR Preview",
      liveScanHint: "Scan with your smartphone camera to test instantly",
      downloadPng: "Download PNG",
      downloadSvg: "Download Vector SVG",
      downloadPdf: "Download Printable PDF",
      copyImage: "Copy Image",
      copiedImageToast: "QR code image copied to clipboard!",
      testScanner: "Verify Content",
      testNotice: "Generated 100% locally in your browser. No server storage.",
      resolutionStandard: "Standard (512px)",
      resolutionHigh: "High-Res (1024px)",
      resolutionUltra: "Ultra Print (2048px)",
      saveToHistory: "Saved to local history"
    },
    history: {
      title: "Local QR History",
      empty: "No QR codes created yet in this browser session. Generate your first QR code above!",
      clearAll: "Clear History",
      load: "Load in Studio",
      delete: "Delete",
      recentCodes: "Recent Codes"
    },
    pro: {
      badge: "Commercial & Enterprise",
      title: "QR GENIUS PRO",
      subtitle: "Need dynamic editable QR codes, scan analytics, or team workspaces? Compare our plans.",
      freeTitle: "QR Genius Free",
      proTitle: "QR Genius Enterprise",
      freeFeatures: [
        "Access to the available QR code generators",
        "Static QR codes without a QR GENIUS scan counter",
        "High-resolution PNG, SVG vector, and PDF exports",
        "Custom colors, gradients, dot styles, and center logos",
        "QR content is generated locally in your browser"
      ],
      proFeatures: [
        "Everything in Free, plus:",
        "Dynamic QR codes with editable destination URLs",
        "Real-time scan analytics: geo-location, device, and timestamp",
        "Bulk CSV batch generator (up to 5,000 QRs at once)",
        "Custom branded domains (qr.yourcompany.com)",
        "CMYK print-ready vector packaging"
      ],
      freeCta: "Available to use",
      proCta: "Explore Enterprise Solutions",
      note: "Core QR tools are currently available without registration or a credit card."
    },
    ad: {
      label: "Advertisement / Sponsor Space",
      placeholderTitle: "Partner Sponsor Space",
      placeholderDesc: "Reserved for Google AdSense & certified clean partner integrations."
    },
    footer: {
      toolsTitle: "QR Tools",
      companyTitle: "Company",
      legalTitle: "Legal & Privacy",
      aboutUs: "About QR Genius",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      faq: "Frequently Asked Questions",
      sitemap: "XML Sitemap",
      robots: "Robots.txt",
      rights: "All rights reserved.",
      privacyNotice: "QR Genius processes all codes locally in your browser. We never log or store your payload."
    }
  },
  ar: {
    brand: {
      name: "كيو آر جينيوس",
      tagline: "أنشئ. امسح. تواصل.",
      description: "المولد المجاني وفائق السرعة لرموز الاستجابة السريعة (QR Code). صمم رموز QR مخصصة مع شعارك وألوانك واحصل على تنزيلات فورية بصيغ PNG وSVG وPDF."
    },
    nav: {
      home: "الرئيسية",
      studio: "استوديو QR",
      tools: "الأدوات",
      urlQr: "رمز رابط موقع",
      wifiQr: "رمز شبكة واي فاي",
      whatsappQr: "رمز واتساب",
      businessQr: "رمز بطاقة عمل",
      about: "من نحن",
      faq: "الأسئلة الشائعة",
      contact: "اتصل بنا",
      createQr: "أنشئ رمزك الآن",
      history: "السجل المحلي"
    },
    qrTypes: {
      url: { label: "رابط موقع إلكتروني", desc: "اربط بأي صفحة ويب أو متجر إلكتروني" },
      text: { label: "نص عادي", desc: "عرض نصوص وملاحظات ورسائل بدون إنترنت" },
      wifi: { label: "شبكة واي فاي", desc: "اتصال فوري بالشبكة دون كتابة كلمة المرور" },
      whatsapp: { label: "محادثة واتساب", desc: "فتح محادثة مباشرة مع رسالة مجهزة" },
      email: { label: "بريد إلكتروني", desc: "إرسال رسالة مع عنوان وموضوع محددين" },
      phone: { label: "اتصال هاتفي", desc: "اتصال بنقرة واحدة من كاميرا الهاتف" },
      sms: { label: "رسالة قصيرة SMS", desc: "إرسال رسالة نصية فورية لرقم محدد" },
      instagram: { label: "إنستغرام", desc: "رابط مباشر للحساب أو المنشور" },
      facebook: { label: "فيسبوك", desc: "رابط مباشر للصفحة أو الحساب" },
      youtube: { label: "يوتيوب", desc: "رابط القناة أو مقطع الفيديو" },
      maps: { label: "خرائط جوجل", desc: "موقع جغرافي دقيق أو عنوان تجاري" },
      vcard: { label: "بطاقة عمل vCard", desc: "حفظ جهة الاتصال والاسم والهاتف والبريد فورا" }
    },
    forms: {
      urlLabel: "رابط الموقع الإلكتروني",
      urlPlaceholder: "https://yourwebsite.com",
      textLabel: "محتوى النص",
      textPlaceholder: "اكتب رسالتك أو محتواك هنا...",
      ssid: "اسم الشبكة (SSID)",
      password: "كلمة المرور",
      encryption: "نوع التشفير",
      hiddenNetwork: "شبكة مخفية",
      countryCode: "رمز الدولة",
      phoneNumber: "رقم الهاتف",
      message: "رسالة تمهيدية (اختياري)",
      emailTo: "البريد الإلكتروني للمستلم",
      subject: "موضوع الرسالة",
      body: "نص الرسالة",
      address: "العنوان أو البحث عن مكان",
      latitude: "خط العرض",
      longitude: "خط الطول",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      company: "الشركة أو المؤسسة",
      jobTitle: "المسمى الوظيفي",
      website: "الموقع الإلكتروني",
      workPhone: "رقم العمل / الجوال",
      street: "عنوان الشارع",
      city: "المدينة",
      state: "المنطقة / المحافظة",
      zip: "الرمز البريدي",
      country: "الدولة",
      notes: "ملاحظات إضافية",
      characterCount: "حرف",
      clear: "مسح",
      reset: "إعادة تعيين",
      copyContent: "نسخ المحتوى",
      copied: "تم النسخ إلى الحافظة!"
    },
    customizer: {
      tabColors: "الألوان",
      tabShapes: "الأشكال",
      tabLogo: "الشعار",
      tabSettings: "الإعدادات",
      foreground: "لون الرمز",
      background: "لون الخلفية",
      transparentBg: "خلفية شفافة",
      useGradient: "تفعيل التدرج اللوني",
      gradientColor: "لون نهاية التدرج",
      gradientDirection: "اتجاه التدرج",
      presets: "لوحات ألوان جاهزة",
      dotStyle: "شكل النقاط الداخلية",
      cornerFrame: "إطار الزوايا الخارجية",
      cornerDot: "نقطة بؤبؤ الزاوية",
      customCornerColors: "ألوان مخصصة للزوايا",
      cornerFrameColor: "لون إطار الزاوية",
      cornerDotColor: "لون نقطة الزاوية",
      uploadLogo: "رفع شعار خاص",
      uploadHint: "PNG أو JPG أو SVG حتى 2 ميجابايت",
      removeLogo: "إزالة الشعار",
      logoPresets: "أيقونات جاهزة شهيرة",
      logoSize: "حجم الشعار",
      logoPadding: "هامش الشعار الأبيض",
      logoShape: "شكل خلفية الشعار",
      logoBgColor: "لون خلفية الشعار",
      errorCorrection: "مستوى تصحيح الأخطاء (ECC)",
      ecLevelL: "منخفض (7% تعافي - أصغر حجم)",
      ecLevelM: "متوسط (15% تعافي - قياسي)",
      ecLevelQ: "ربع (25% تعافي - موصى به مع الشعار)",
      ecLevelH: "عالي (30% تعافي - أقصى دقة ومتانة)",
      ecRecommendedForLogo: "تم رفعه تلقائياً لضمان قراءة سريعة مع وجود الشعار.",
      quietZone: "الهامش الخارجي للرمز",
      shapeSquare: "مربعات كلاسيكية",
      shapeDots: "دوائر ونقاط",
      shapeRounded: "مربعات دائرية الزوايا",
      shapeClassy: "تصميم عصري مميز",
      shapeDiamond: "ألماسي",
      shapeExtraRounded: "أقراص مستديرة",
      shapeLeaf: "ورقة نباتية",
      shapeCircle: "دائري كامل"
    },
    preview: {
      title: "المعاينة المباشرة للرمز",
      liveScanHint: "امسح الرمز بكاميرا هاتفك لاختباره فورياً",
      downloadPng: "تحميل PNG",
      downloadSvg: "تحميل فيكتور SVG",
      downloadPdf: "تحميل PDF للطباعة",
      copyImage: "نسخ الصورة",
      copiedImageToast: "تم نسخ صورة رمز QR إلى الحافظة بنجاح!",
      testScanner: "تحقق من المحتوى",
      testNotice: "تتم المعالجة 100% داخل متصفحك محلياً لحماية خصوصيتك.",
      resolutionStandard: "قياسي (512 بكسل)",
      resolutionHigh: "عالي الدقة (1024 بكسل)",
      resolutionUltra: "فائق للطباعة (2048 بكسل)",
      saveToHistory: "تم الحفظ في السجل المحلي"
    },
    history: {
      title: "سجل الرموز المنشأة",
      empty: "لم تقم بإنشاء أي رموز QR بعد في هذه الجلسة. ابدأ بإنشاء رمزك الآن!",
      clearAll: "مسح السجل",
      load: "تحميل في الاستوديو",
      delete: "حذف",
      recentCodes: "الرموز الأخيرة"
    },
    pro: {
      badge: "للشركات والمؤسسات",
      title: "كيو آر جينيوس برو",
      subtitle: "هل تحتاج إلى رموز ديناميكية قابلة للتعديل أو تحليلات تفصيلية؟ قارن بين الباقات.",
      freeTitle: "الباقة المجانية الدائمة",
      proTitle: "باقة الأعمال والشركات",
      freeFeatures: [
        "الوصول إلى أدوات إنشاء رموز QR المتاحة",
        "رموز ثابتة لا تستخدم عدّاد مسح من QR Genius",
        "تصدير عالي الدقة بصيغ PNG وSVG المتجهي وPDF",
        "تخصيص كامل للألوان والتدرجات والأشكال وإضافة الشعار",
        "يتم إنشاء محتوى رمز QR محلياً داخل متصفحك"
      ],
      proFeatures: [
        "جميع مميزات الباقة المجانية بالإضافة إلى:",
        "رموز QR ديناميكية قابلة لتعديل الرابط بعد الطباعة",
        "تحليلات المسح المباشرة: الموقع الجغرافي ونوع الجهاز والوقت",
        "توليد جماعي بملفات CSV حتى 5000 رمز دفعة واحدة",
        "نطاق مخصص لعلامتك التجارية (qr.company.com)",
        "ملفات متجهة مجهزة لمطابع الأوفست CMYK"
      ],
      freeCta: "متاحة للاستخدام",
      proCta: "استكشف حلول المؤسسات",
      note: "الأدوات الأساسية متاحة حالياً دون تسجيل أو بطاقة بنكية."
    },
    ad: {
      label: "مساحة إعلانية / رعاية",
      placeholderTitle: "مساحة مخصصة للشركاء الإعلانيين",
      placeholderDesc: "جاهزة للتكامل مع جوجل أدسنس وإعلانات الشركاء المعتمدين."
    },
    footer: {
      toolsTitle: "أدوات QR",
      companyTitle: "الشركة",
      legalTitle: "الخصوصية والشروط",
      aboutUs: "عن كيو آر جينيوس",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      faq: "الأسئلة الشائعة",
      sitemap: "خريطة الموقع XML",
      robots: "ملف Robots.txt",
      rights: "جميع الحقوق محفوظة.",
      privacyNotice: "يعمل كيو آر جينيوس محلياً داخل متصفحك بالكامل ولا يتم تخزين بياناتك في أي خادم."
    }
  },
  fr: {
    brand: {
      name: "QR GENIUS",
      tagline: "Créer. Scanner. Connecter.",
      description: "Générateur de QR codes gratuit, ultra-rapide et multilingue. Créez des QR codes personnalisés avec logos, couleurs et exports vectoriels SVG, PNG et PDF."
    },
    nav: {
      home: "Accueil",
      studio: "Studio QR",
      tools: "Outils",
      urlQr: "QR Code URL",
      wifiQr: "QR Code Wi-Fi",
      whatsappQr: "QR Code WhatsApp",
      businessQr: "QR Code vCard",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
      createQr: "Générer un QR",
      history: "Historique"
    },
    qrTypes: {
      url: { label: "Lien URL", desc: "Redirige vers un site web ou une page" },
      text: { label: "Texte brut", desc: "Affiche un message ou des notes" },
      wifi: { label: "Réseau Wi-Fi", desc: "Connexion instantanée sans saisir le mot de passe" },
      whatsapp: { label: "WhatsApp", desc: "Lien de chat direct avec message pré-rempli" },
      email: { label: "E-mail", desc: "Destinataire, sujet et corps d'e-mail pré-remplis" },
      phone: { label: "Numéro de téléphone", desc: "Appel direct en un clic" },
      sms: { label: "Message SMS", desc: "Envoi rapide d'un SMS au numéro choisi" },
      instagram: { label: "Instagram", desc: "Lien vers profil ou publication" },
      facebook: { label: "Facebook", desc: "Lien vers page ou profil" },
      youtube: { label: "YouTube", desc: "Lien vers vidéo ou chaîne" },
      maps: { label: "Google Maps", desc: "Coordonnées GPS ou adresse professionnelle" },
      vcard: { label: "Carte de visite vCard", desc: "Carte de visite numérique avec téléphone et email" }
    },
    forms: {
      urlLabel: "URL du site web",
      urlPlaceholder: "https://votresite.com",
      textLabel: "Contenu texte",
      textPlaceholder: "Saisissez votre texte ici...",
      ssid: "Nom du réseau (SSID)",
      password: "Mot de passe",
      encryption: "Type de sécurité",
      hiddenNetwork: "Réseau masqué",
      countryCode: "Indicatif pays",
      phoneNumber: "Numéro de téléphone",
      message: "Message pré-rempli (facultatif)",
      emailTo: "Adresse e-mail du destinataire",
      subject: "Objet",
      body: "Corps du message",
      address: "Adresse ou lieu",
      latitude: "Latitude (ex. 48.8566)",
      longitude: "Longitude (ex. 2.3522)",
      firstName: "Prénom",
      lastName: "Nom",
      company: "Entreprise",
      jobTitle: "Poste",
      website: "Site internet",
      workPhone: "Téléphone",
      street: "Adresse",
      city: "Ville",
      state: "Région",
      zip: "Code postal",
      country: "Pays",
      notes: "Remarques",
      characterCount: "caractères",
      clear: "Effacer",
      reset: "Réinitialiser",
      copyContent: "Copier le contenu",
      copied: "Copié dans le presse-papiers !"
    },
    customizer: {
      tabColors: "Couleurs",
      tabShapes: "Formes",
      tabLogo: "Logo",
      tabSettings: "Paramètres",
      foreground: "Couleur du QR",
      background: "Couleur de fond",
      transparentBg: "Fond transparent",
      useGradient: "Activer le dégradé",
      gradientColor: "Deuxième couleur",
      gradientDirection: "Direction",
      presets: "Palettes SaaS prédéfinies",
      dotStyle: "Motif des points",
      cornerFrame: "Forme des cadres",
      cornerDot: "Forme de la pupille",
      customCornerColors: "Couleurs de coins dédiées",
      cornerFrameColor: "Couleur du cadre",
      cornerDotColor: "Couleur de la pupille",
      uploadLogo: "Téléverser un logo",
      uploadHint: "PNG, JPG ou SVG jusqu'à 2 Mo",
      removeLogo: "Supprimer le logo",
      logoPresets: "Icônes populaires",
      logoSize: "Taille du logo",
      logoPadding: "Marge blanche du logo",
      logoShape: "Forme du badge",
      logoBgColor: "Fond du badge",
      errorCorrection: "Correction d'erreur (ECC)",
      ecLevelL: "Faible (7% - motif plus compact)",
      ecLevelM: "Moyen (15% - standard)",
      ecLevelQ: "Quartile (25% - recommandé avec logo)",
      ecLevelH: "Élevé (30% - robustesse maximale)",
      ecRecommendedForLogo: "Augmenté automatiquement pour garantir la lisibilité avec logo.",
      quietZone: "Marge de sécurité",
      shapeSquare: "Carré classique",
      shapeDots: "Points / Cercles",
      shapeRounded: "Carré arrondi",
      shapeClassy: "Élégant moderne",
      shapeDiamond: "Losange",
      shapeExtraRounded: "Pilule",
      shapeLeaf: "Feuille",
      shapeCircle: "Circulaire"
    },
    preview: {
      title: "Aperçu en direct",
      liveScanHint: "Scannez avec votre téléphone pour tester immédiatement",
      downloadPng: "Télécharger PNG",
      downloadSvg: "Télécharger SVG Vectoriel",
      downloadPdf: "Télécharger PDF Imprimable",
      copyImage: "Copier l'image",
      copiedImageToast: "Image du QR code copiée dans le presse-papiers !",
      testScanner: "Vérifier le contenu",
      testNotice: "Généré à 100% localement dans votre navigateur. Aucune donnée stockée.",
      resolutionStandard: "Standard (512px)",
      resolutionHigh: "Haute Définition (1024px)",
      resolutionUltra: "Ultra Impression (2048px)",
      saveToHistory: "Enregistré dans l'historique local"
    },
    history: {
      title: "Historique local",
      empty: "Aucun QR code créé pour l'instant. Créez votre premier code ci-dessus !",
      clearAll: "Vider l'historique",
      load: "Charger dans le studio",
      delete: "Supprimer",
      recentCodes: "Codes récents"
    },
    pro: {
      badge: "Professionnel & Entreprise",
      title: "QR GENIUS PRO",
      subtitle: "Besoin de QR codes dynamiques modifiables ou de statistiques de scan ? Comparez nos offres.",
      freeTitle: "QR Genius Gratuit",
      proTitle: "QR Genius Entreprise",
      freeFeatures: [
        "Accès aux générateurs de QR codes disponibles",
        "Codes statiques sans compteur de scans QR GENIUS",
        "Téléchargements haute résolution PNG, vectoriel SVG et PDF",
        "Personnalisation totale des couleurs, formes et logos",
        "Le contenu du QR code est généré localement dans votre navigateur"
      ],
      proFeatures: [
        "Tout ce qui est inclus dans le plan Gratuit, plus :",
        "QR codes dynamiques avec URL de destination modifiable",
        "Statistiques de scan en temps réel (géolocalisation, appareils, dates)",
        "Génération en masse via fichier CSV (jusqu'à 5 000 QR à la fois)",
        "Domaine personnalisé avec votre marque",
        "Exports vectoriels adaptés à l'impression CMJN"
      ],
      freeCta: "Disponible",
      proCta: "Découvrir l'offre Entreprise",
      note: "Les outils QR essentiels sont actuellement accessibles sans inscription."
    },
    ad: {
      label: "Espace Publicitaire / Sponsor",
      placeholderTitle: "Emplacement Partenaire Sponsor",
      placeholderDesc: "Réservé à l'intégration Google AdSense et sponsors certifiés."
    },
    footer: {
      toolsTitle: "Outils QR",
      companyTitle: "Entreprise",
      legalTitle: "Légal & Confidentialité",
      aboutUs: "À propos de QR Genius",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      faq: "Foire Aux Questions",
      sitemap: "Plan de site XML",
      robots: "Fichier Robots.txt",
      rights: "Tous droits réservés.",
      privacyNotice: "QR Genius traite l'ensemble des codes localement dans votre navigateur sans jamais collecter vos données."
    }
  },
  es: {
    brand: {
      name: "QR GENIUS",
      tagline: "Crear. Escanear. Conectar.",
      description: "Generador de códigos QR gratuito, ultrarrápido y multilingüe. Cree códigos QR personalizados con colores, logotipos y descargas vectoriales SVG, PNG y PDF."
    },
    nav: {
      home: "Inicio",
      studio: "Estudio QR",
      tools: "Herramientas",
      urlQr: "QR de URL",
      wifiQr: "QR de Wi-Fi",
      whatsappQr: "QR de WhatsApp",
      businessQr: "QR de vCard",
      about: "Nosotros",
      faq: "Preguntas",
      contact: "Contacto",
      createQr: "Generar QR Ahora",
      history: "Historial"
    },
    qrTypes: {
      url: { label: "URL de Sitio Web", desc: "Enlace a cualquier página web o portal" },
      text: { label: "Texto Plano", desc: "Muestra notas, mensajes o cadenas de texto" },
      wifi: { label: "Red Wi-Fi", desc: "Conexión directa sin teclear contraseña" },
      whatsapp: { label: "WhatsApp", desc: "Chat directo con mensaje predefinido" },
      email: { label: "Correo Electrónico", desc: "Destinatario, asunto y mensaje listos" },
      phone: { label: "Llamada Telefónica", desc: "Marcado telefónico instantáneo con un toque" },
      sms: { label: "Mensaje SMS", desc: "Envío rápido de SMS a un número específico" },
      instagram: { label: "Instagram", desc: "Enlace directo al perfil o publicación" },
      facebook: { label: "Facebook", desc: "Enlace directo a la página o perfil" },
      youtube: { label: "YouTube", desc: "Enlace a video o canal" },
      maps: { label: "Google Maps", desc: "Coordenadas GPS exactas o dirección" },
      vcard: { label: "Tarjeta vCard", desc: "Tarjeta digital con teléfono, correo y empresa" }
    },
    forms: {
      urlLabel: "URL del Sitio Web",
      urlPlaceholder: "https://tusitio.com",
      textLabel: "Contenido de Texto",
      textPlaceholder: "Escribe tu texto aquí...",
      ssid: "Nombre de la Red (SSID)",
      password: "Contraseña",
      encryption: "Tipo de Seguridad",
      hiddenNetwork: "Red Oculta",
      countryCode: "Código de País",
      phoneNumber: "Número Telefónico",
      message: "Mensaje Predefinido (opcional)",
      emailTo: "Correo del Destinatario",
      subject: "Asunto",
      body: "Cuerpo del Mensaje",
      address: "Dirección o Lugar",
      latitude: "Latitud",
      longitude: "Longitud",
      firstName: "Nombre",
      lastName: "Apellido",
      company: "Empresa",
      jobTitle: "Puesto de Trabajo",
      website: "Sitio Web",
      workPhone: "Teléfono",
      street: "Dirección",
      city: "Ciudad",
      state: "Estado / Provincia",
      zip: "Código Postal",
      country: "País",
      notes: "Notas adicionales",
      characterCount: "caracteres",
      clear: "Borrar",
      reset: "Restablecer",
      copyContent: "Copiar Contenido",
      copied: "¡Copiado al portapapeles!"
    },
    customizer: {
      tabColors: "Colores",
      tabShapes: "Formas",
      tabLogo: "Logotipo",
      tabSettings: "Ajustes",
      foreground: "Color del QR",
      background: "Color de Fondo",
      transparentBg: "Fondo Transparente",
      useGradient: "Habilitar Degradado",
      gradientColor: "Color Final de Degradado",
      gradientDirection: "Dirección",
      presets: "Paletas SaaS Curadas",
      dotStyle: "Patrón de Puntos",
      cornerFrame: "Forma del Marco",
      cornerDot: "Forma de la Pupila",
      customCornerColors: "Colores de Esquina Dedicados",
      cornerFrameColor: "Color del Marco",
      cornerDotColor: "Color de la Pupila",
      uploadLogo: "Subir Logotipo Propio",
      uploadHint: "PNG, JPG o SVG hasta 2 MB",
      removeLogo: "Eliminar Logotipo",
      logoPresets: "Iconos Populares",
      logoSize: "Escala del Logotipo",
      logoPadding: "Margen Blanco",
      logoShape: "Forma de la Insignia",
      logoBgColor: "Color de Fondo de Insignia",
      errorCorrection: "Nivel de Corrección de Errores (ECC)",
      ecLevelL: "Bajo (7% de recuperación - patrón compacto)",
      ecLevelM: "Medio (15% de recuperación - equilibrado)",
      ecLevelQ: "Cuartil (25% de recuperación - ideal con logo)",
      ecLevelH: "Alto (30% de recuperación - máxima durabilidad)",
      ecRecommendedForLogo: "Se aumenta automáticamente para garantizar legibilidad con logo.",
      quietZone: "Margen de Zona Silenciosa",
      shapeSquare: "Cuadrado Clásico",
      shapeDots: "Puntos / Círculos",
      shapeRounded: "Cuadrado Redondeado",
      shapeClassy: "Elegante Moderno",
      shapeDiamond: "Diamante",
      shapeExtraRounded: "Píldora",
      shapeLeaf: "Hoja",
      shapeCircle: "Circular"
    },
    preview: {
      title: "Vista Previa en Vivo",
      liveScanHint: "Escanee con la cámara de su teléfono para probar de inmediato",
      downloadPng: "Descargar PNG",
      downloadSvg: "Descargar Vectorial SVG",
      downloadPdf: "Descargar PDF Imprimible",
      copyImage: "Copiar Imagen",
      copiedImageToast: "¡Imagen del código QR copiada al portapapeles!",
      testScanner: "Verificar Contenido",
      testNotice: "Generado 100% localmente en su navegador sin almacenar datos.",
      resolutionStandard: "Estándar (512px)",
      resolutionHigh: "Alta Definición (1024px)",
      resolutionUltra: "Ultra Impresión (2048px)",
      saveToHistory: "Guardado en el historial local"
    },
    history: {
      title: "Historial Local de Códigos",
      empty: "Aún no ha creado códigos QR en esta sesión. ¡Genere su primer código arriba!",
      clearAll: "Vaciar Historial",
      load: "Cargar en Estudio",
      delete: "Eliminar",
      recentCodes: "Códigos Recientes"
    },
    pro: {
      badge: "Empresarial y Profesional",
      title: "QR GENIUS PRO",
      subtitle: "¿Necesita códigos QR dinámicos editables o analíticas de escaneo? Compare nuestros planes.",
      freeTitle: "QR Genius Gratis",
      proTitle: "QR Genius Enterprise",
      freeFeatures: [
        "Acceso a los generadores de códigos QR disponibles",
        "Códigos estáticos sin contador de escaneos de QR GENIUS",
        "Descargas en alta resolución PNG, vectorial SVG y PDF",
        "Personalización de colores, degradados, formas y logos",
        "El contenido del código QR se genera localmente en su navegador"
      ],
      proFeatures: [
        "Todo lo incluido en el plan Gratuito, más:",
        "Códigos QR dinámicos con URL editable después de imprimir",
        "Analíticas de escaneo en tiempo real (ubicación, dispositivo y fecha)",
        "Generador masivo por archivo CSV (hasta 5,000 QR a la vez)",
        "Dominio personalizado con su propia marca",
        "Archivos vectoriales preparados para imprenta CMYK"
      ],
      freeCta: "Disponible para usar",
      proCta: "Explorar Soluciones Enterprise",
      note: "Las herramientas QR principales están disponibles actualmente sin registro."
    },
    ad: {
      label: "Espacio Publicitario / Patrocinio",
      placeholderTitle: "Espacio de Patrocinador Aliado",
      placeholderDesc: "Preparado para integración limpia con Google AdSense y patrocinadores verificados."
    },
    footer: {
      toolsTitle: "Herramientas QR",
      companyTitle: "Empresa",
      legalTitle: "Legal y Privacidad",
      aboutUs: "Sobre QR Genius",
      privacy: "Política de Privacidad",
      terms: "Términos de Servicio",
      faq: "Preguntas Frecuentes",
      sitemap: "Mapa de Sitio XML",
      robots: "Archivo Robots.txt",
      rights: "Todos los derechos reservados.",
      privacyNotice: "QR Genius procesa todos los códigos localmente en su navegador sin almacenar su información."
    }
  }
};
