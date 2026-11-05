import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEO_METADATA, generateRobotsTxt } from '../src/utils/seo.ts';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(projectRoot, 'dist');
const rawTemplate = await readFile(path.join(distDir, 'index.html'), 'utf8');
// Keep the prerendered SEO fallback readable and visually intentional while the app bundle loads.
const fallbackStyles = `<style>
  .js-enabled .seo-static-content { display: none; }
  .seo-static-content {
    width: min(100% - 2rem, 880px);
    margin: clamp(2rem, 7vh, 5rem) auto;
    padding: clamp(1.5rem, 4vw, 3rem);
    color: #172033;
    background: #fff;
    border: 1px solid #e8eaf2;
    border-radius: 24px;
    box-shadow: 0 18px 55px rgba(30, 41, 59, .08);
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    line-height: 1.75;
  }
  .seo-static-content::before {
    content: "QR GENIUS";
    display: inline-block;
    margin-bottom: 1.25rem;
    color: #635bdb;
    font-size: .78rem;
    font-weight: 800;
    letter-spacing: .16em;
  }
  .seo-static-content h1 { margin: 0 0 1rem; color: #111827; font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.2; font-weight: 800; }
  .seo-static-content h2 { margin: 1.8rem 0 .5rem; color: #202b45; font-size: 1.25rem; font-weight: 750; }
  .seo-static-content h3 { margin: 1.2rem 0 .35rem; font-size: 1rem; font-weight: 700; }
  .seo-static-content p { margin: .65rem 0; color: #536078; }
  .seo-static-content ol, .seo-static-content ul { padding-inline-start: 1.4rem; color: #536078; }
  .seo-static-content li { margin: .35rem 0; }
  .seo-static-content a { color: #5145cd; font-weight: 650; text-decoration: underline; text-underline-offset: 3px; }
  html[dir="rtl"] .seo-static-content { text-align: right; font-family: Cairo, system-ui, sans-serif; }
  @media (max-width: 640px) {
    .seo-static-content { width: calc(100% - 1.25rem); margin: 1rem auto; padding: 1.25rem; border-radius: 18px; }
  }
</style>`;
const template = rawTemplate.replace('</head>', '<script>document.documentElement.classList.add("js-enabled");</script>' + fallbackStyles + '\\n</head>');

const locales = ['en', 'ar', 'fr', 'es'] as const;
const pages = ['home', 'generator', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
const baseUrl = 'https://getqrgenius.com';

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function localizedPath(pagePath: string, locale: string): string {
  if (locale === 'en') return pagePath;
  return pagePath === '/' ? `/${locale}/` : `/${locale}${pagePath}`;
}

function setHeadTag(html: string, pattern: RegExp, tag: string): string {
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace('</head>', `  ${tag}\n</head>`);
}

function renderStaticContent(locale: typeof locales[number], page: typeof pages[number]): string {
  const meta = SEO_METADATA[page][locale];
  const toolPages = ['url', 'wifi', 'whatsapp', 'business'] as const;
  const labels: Record<typeof locales[number], string> = {
    en: 'Explore QR code tools',
    ar: 'استكشف أدوات رموز QR',
    fr: 'Découvrir les outils QR',
    es: 'Explorar herramientas QR'
  };
  const supportingCopy: Partial<Record<typeof pages[number], Record<typeof locales[number], { heading: string; body: string; steps: string[]; tip: string }>>> = {
    home: {
      en: { heading: 'Create a QR code in a few simple steps', body: 'QR GENIUS helps you turn useful information into a scannable code for websites, wireless networks, WhatsApp conversations, and digital contact cards. Choose the type that matches your goal, enter the information, and prepare a code you can share or print.', steps: ['Choose the QR code type that fits your content.', 'Enter the link or details you want the code to contain.', 'Review the result and download it in a suitable format.'], tip: 'Before printing, scan your finished code with a phone to confirm that it opens the right destination.' },
      ar: { heading: 'أنشئ رمز QR في خطوات بسيطة', body: 'يساعدك QR GENIUS على تحويل المعلومات المفيدة إلى رمز قابل للمسح، مثل روابط المواقع وشبكات Wi-Fi ومحادثات واتساب وبطاقات الاتصال الرقمية. اختر نوع الرمز المناسب، وأدخل البيانات، ثم جهّز الرمز للمشاركة أو الطباعة.', steps: ['اختر نوع رمز QR الذي يناسب المعلومات.', 'أدخل الرابط أو البيانات التي تريد تضمينها.', 'راجع النتيجة ونزّل الرمز بالتنسيق المناسب.'], tip: 'قبل الطباعة، امسح الرمز بهاتفك للتأكد من أنه يفتح الوجهة الصحيحة.' },
      fr: { heading: 'Créez un QR code en quelques étapes', body: 'QR GENIUS transforme vos informations en codes à scanner pour les sites web, les réseaux Wi-Fi, les conversations WhatsApp et les fiches de contact numériques. Choisissez le type adapté, saisissez les informations, puis préparez votre code pour le partage ou l’impression.', steps: ['Choisissez le type de QR code adapté à votre contenu.', 'Saisissez le lien ou les informations à encoder.', 'Vérifiez le résultat et téléchargez le format souhaité.'], tip: 'Avant l’impression, scannez le code avec un téléphone pour vérifier sa destination.' },
      es: { heading: 'Crea un código QR en unos sencillos pasos', body: 'QR GENIUS convierte información en códigos escaneables para sitios web, redes Wi-Fi, conversaciones de WhatsApp y tarjetas de contacto digitales. Elige el tipo adecuado, introduce los datos y prepara el código para compartirlo o imprimirlo.', steps: ['Elige el tipo de código QR según tu contenido.', 'Introduce el enlace o los datos que quieras incluir.', 'Revisa el resultado y descarga el formato adecuado.'], tip: 'Antes de imprimirlo, escanea el código con un teléfono para comprobar que abre el destino correcto.' }
    },
    generator: {
      en: { heading: 'Customize the look of your QR code', body: 'QR Studio lets you prepare a code that better fits your project. Start with the content, then adjust the available design options such as colors and visual style. Check that the code remains easy to scan, especially when it will be printed or displayed at a small size.', steps: ['Enter the information your QR code should open.', 'Choose the design options available in the studio.', 'Preview and scan the code before downloading it.'], tip: 'Keep strong contrast between the code and its background for reliable scanning.' },
      ar: { heading: 'خصّص مظهر رمز QR', body: 'يتيح لك استوديو QR إعداد رمز يناسب مشروعك. ابدأ بإدخال المحتوى، ثم عدّل خيارات التصميم المتاحة مثل الألوان والمظهر. تأكد من بقاء الرمز واضحاً وسهل المسح، خصوصاً عند طباعته أو عرضه بحجم صغير.', steps: ['أدخل المعلومات التي تريد أن يفتحها الرمز.', 'اختر خيارات التصميم المتاحة في الاستوديو.', 'عاين الرمز وامسحه بهاتفك قبل التنزيل.'], tip: 'حافظ على تباين واضح بين الرمز والخلفية لضمان سهولة المسح.' },
      fr: { heading: 'Personnalisez l’apparence de votre QR code', body: 'QR Studio vous aide à adapter le code à votre projet. Commencez par saisir le contenu, puis ajustez les options de conception disponibles, comme les couleurs et le style visuel. Vérifiez que le code reste facile à scanner, notamment avant une impression ou un affichage en petit format.', steps: ['Saisissez les informations que le code doit ouvrir.', 'Choisissez les options de conception disponibles.', 'Prévisualisez et scannez le code avant le téléchargement.'], tip: 'Conservez un contraste marqué entre le code et son arrière-plan.' },
      es: { heading: 'Personaliza el aspecto de tu código QR', body: 'QR Studio te permite adaptar el código a tu proyecto. Empieza introduciendo el contenido y después ajusta las opciones de diseño disponibles, como los colores y el estilo visual. Comprueba que siga siendo fácil de escanear, especialmente antes de imprimirlo o mostrarlo en tamaño pequeño.', steps: ['Introduce la información que debe abrir el código.', 'Elige las opciones de diseño disponibles.', 'Previsualiza y escanea el código antes de descargarlo.'], tip: 'Mantén un contraste claro entre el código y el fondo para facilitar el escaneo.' }
    },
    url: {
      en: { heading: 'Turn a website link into a QR code', body: 'A URL QR code gives people a quick way to open a webpage using their phone camera. It can be useful for a portfolio, online menu, event page, product information, or printed marketing material. Use the complete destination link and make sure the page is publicly accessible.', steps: ['Paste the website address into the URL field.', 'Review the generated QR code.', 'Scan it to test the link, then download it.'], tip: 'Use the final public URL rather than a temporary preview or editing link.' },
      ar: { heading: 'حوّل رابط موقع إلى رمز QR', body: 'يمنح رمز QR للرابط الأشخاص طريقة سريعة لفتح صفحة ويب باستخدام كاميرا الهاتف. يمكنك استخدامه لملف أعمال أو قائمة طعام إلكترونية أو صفحة فعالية أو معلومات منتج أو مواد تسويقية مطبوعة. أدخل الرابط النهائي وتأكد من أن الصفحة متاحة للزوار.', steps: ['الصق عنوان الموقع في حقل الرابط.', 'راجع رمز QR الذي تم إنشاؤه.', 'امسح الرمز لاختبار الرابط، ثم نزّله.'], tip: 'استخدم الرابط العام النهائي بدلاً من رابط المعاينة أو التحرير المؤقت.' },
      fr: { heading: 'Transformez un lien web en QR code', body: 'Un QR code URL permet d’ouvrir rapidement une page web avec l’appareil photo d’un téléphone. Il peut servir pour un portfolio, un menu en ligne, une page d’événement, des informations produit ou un support imprimé. Saisissez l’adresse définitive et vérifiez que la page est accessible au public.', steps: ['Collez l’adresse du site dans le champ URL.', 'Vérifiez le QR code généré.', 'Scannez-le pour tester le lien, puis téléchargez-le.'], tip: 'Utilisez l’adresse publique définitive plutôt qu’un lien temporaire de prévisualisation.' },
      es: { heading: 'Convierte un enlace web en un código QR', body: 'Un código QR de URL permite abrir una página web rápidamente con la cámara del teléfono. Puede servir para un portafolio, un menú digital, una página de evento, información de productos o material impreso. Introduce la dirección definitiva y comprueba que la página sea pública.', steps: ['Pega la dirección del sitio en el campo URL.', 'Revisa el código QR generado.', 'Escanéalo para probar el enlace y después descárgalo.'], tip: 'Utiliza la URL pública definitiva en lugar de un enlace temporal de vista previa.' }
    },
    wifi: {
      en: { heading: 'Share Wi-Fi access with a scan', body: 'A Wi-Fi QR code stores the network details needed by a compatible phone to offer a connection. It can make guest access easier at home, in an office, or in a small business. Enter the network name and the correct security details, then test the code on a device before sharing it.', steps: ['Enter the exact Wi-Fi network name (SSID).', 'Choose the matching security type and enter its password if required.', 'Scan the code with a compatible phone to test the connection prompt.'], tip: 'A Wi-Fi QR code contains network access information, so share it only with people you intend to let onto the network.' },
      ar: { heading: 'شارك اتصال Wi-Fi عبر المسح', body: 'يحتوي رمز QR للواي فاي على بيانات الشبكة التي يحتاجها الهاتف المتوافق لعرض خيار الاتصال. ويمكن أن يسهّل وصول الضيوف إلى الإنترنت في المنزل أو المكتب أو المتجر. أدخل اسم الشبكة ونوع الحماية الصحيح، ثم اختبر الرمز قبل مشاركته.', steps: ['أدخل اسم شبكة Wi-Fi بدقة (SSID).', 'اختر نوع الحماية المطابق وأدخل كلمة المرور عند الحاجة.', 'امسح الرمز بهاتف متوافق لاختبار ظهور طلب الاتصال.'], tip: 'يتضمن رمز Wi-Fi بيانات الوصول إلى الشبكة؛ شاركه فقط مع الأشخاص الذين تسمح لهم بالاتصال.' },
      fr: { heading: 'Partagez l’accès Wi-Fi par scan', body: 'Un QR code Wi-Fi contient les informations dont un téléphone compatible a besoin pour proposer la connexion au réseau. Il facilite l’accès des invités à la maison, au bureau ou dans un commerce. Saisissez le nom du réseau et les paramètres de sécurité corrects, puis testez le code avant de le partager.', steps: ['Saisissez exactement le nom du réseau Wi-Fi (SSID).', 'Choisissez le type de sécurité correspondant et le mot de passe si nécessaire.', 'Scannez le code avec un téléphone compatible pour tester la demande de connexion.'], tip: 'Le QR code Wi-Fi contient des informations d’accès : partagez-le uniquement avec les personnes autorisées.' },
      es: { heading: 'Comparte el acceso Wi-Fi mediante un escaneo', body: 'Un código QR Wi-Fi contiene los datos que un teléfono compatible necesita para ofrecer la conexión a la red. Puede facilitar el acceso de invitados en casa, en una oficina o en un negocio. Introduce el nombre de la red y los datos de seguridad correctos y prueba el código antes de compartirlo.', steps: ['Introduce el nombre exacto de la red Wi-Fi (SSID).', 'Selecciona el tipo de seguridad correcto e introduce la contraseña si es necesario.', 'Escanea el código con un teléfono compatible para probar la solicitud de conexión.'], tip: 'El código QR Wi-Fi contiene datos de acceso: compártelo solo con personas autorizadas.' }
    },
    whatsapp: {
      en: { heading: 'Create a QR code that opens a WhatsApp chat', body: 'A WhatsApp QR code can take someone directly to a chat with the number you provide. You can also include an optional message so the conversation starts with context. It is useful on business cards, service information, event materials, and customer support pages.', steps: ['Enter the WhatsApp phone number with its country code.', 'Add an optional message if you want to provide a starting point.', 'Scan the code and confirm that it opens the intended chat.'], tip: 'Check the phone number carefully before printing or sharing the code.' },
      ar: { heading: 'أنشئ رمز QR يفتح محادثة واتساب', body: 'يمكن لرمز واتساب أن ينقل الشخص مباشرة إلى محادثة مع الرقم الذي تدخله. ويمكنك أيضاً إضافة رسالة اختيارية لتوضيح سبب التواصل. يناسب ذلك بطاقات العمل ومعلومات الخدمات والفعاليات وصفحات دعم العملاء.', steps: ['أدخل رقم واتساب مع رمز الدولة.', 'أضف رسالة اختيارية إذا أردت توضيح بداية المحادثة.', 'امسح الرمز وتأكد من أنه يفتح المحادثة المطلوبة.'], tip: 'تحقق من رقم الهاتف جيداً قبل طباعة الرمز أو مشاركته.' },
      fr: { heading: 'Créez un QR code qui ouvre une discussion WhatsApp', body: 'Un QR code WhatsApp peut diriger une personne vers une discussion avec le numéro indiqué. Vous pouvez également ajouter un message facultatif pour donner un contexte au premier échange. Cette option convient aux cartes de visite, aux informations de service, aux événements et aux pages d’assistance.', steps: ['Saisissez le numéro WhatsApp avec son indicatif pays.', 'Ajoutez un message facultatif pour démarrer la conversation.', 'Scannez le code et vérifiez qu’il ouvre la bonne discussion.'], tip: 'Vérifiez soigneusement le numéro avant d’imprimer ou de partager le code.' },
      es: { heading: 'Crea un código QR que abre un chat de WhatsApp', body: 'Un código QR de WhatsApp puede llevar a una persona directamente a un chat con el número indicado. También puedes añadir un mensaje opcional para dar contexto al primer contacto. Es útil en tarjetas de visita, información de servicios, materiales de eventos y páginas de atención al cliente.', steps: ['Introduce el número de WhatsApp con el prefijo del país.', 'Añade un mensaje opcional para iniciar la conversación.', 'Escanea el código y confirma que abre el chat correcto.'], tip: 'Comprueba cuidadosamente el número antes de imprimir o compartir el código.' }
    },
    business: {
      en: { heading: 'Share contact details with a vCard QR code', body: 'A vCard QR code packages contact information in a format supported by many phone contact apps. People can scan it to open a contact card and save details such as a name, phone number, email address, or company. Review every field before sharing your code.', steps: ['Enter the contact details you want to share.', 'Generate the vCard QR code and review the information.', 'Scan it with a phone to confirm the contact card appears correctly.'], tip: 'Only include contact information that you are comfortable making available to anyone who scans the code.' },
      ar: { heading: 'شارك بيانات الاتصال باستخدام رمز vCard', body: 'يجمع رمز vCard معلومات الاتصال بتنسيق تدعمه تطبيقات جهات الاتصال في كثير من الهواتف. يمكن للآخرين مسحه لفتح بطاقة اتصال وحفظ بيانات مثل الاسم ورقم الهاتف والبريد الإلكتروني أو الشركة. راجع جميع الحقول قبل مشاركة الرمز.', steps: ['أدخل بيانات الاتصال التي تريد مشاركتها.', 'أنشئ رمز vCard وراجع المعلومات الموجودة فيه.', 'امسحه بهاتف للتأكد من ظهور بطاقة الاتصال بشكل صحيح.'], tip: 'لا تُضمّن إلا بيانات الاتصال التي توافق على إتاحتها لكل من يمسح الرمز.' },
      fr: { heading: 'Partagez vos coordonnées avec un QR code vCard', body: 'Un QR code vCard regroupe des coordonnées dans un format pris en charge par de nombreuses applications de contacts. Les personnes peuvent le scanner pour ouvrir une fiche et enregistrer un nom, un numéro de téléphone, une adresse e-mail ou une entreprise. Vérifiez chaque champ avant de partager le code.', steps: ['Saisissez les coordonnées que vous souhaitez partager.', 'Générez le QR code vCard et vérifiez les informations.', 'Scannez-le avec un téléphone pour confirmer que la fiche s’affiche correctement.'], tip: 'N’incluez que les coordonnées que vous acceptez de rendre accessibles aux personnes qui scannent le code.' },
      es: { heading: 'Comparte datos de contacto con un código QR vCard', body: 'Un código QR vCard reúne datos de contacto en un formato compatible con muchas aplicaciones de contactos. Las personas pueden escanearlo para abrir una ficha y guardar un nombre, teléfono, correo electrónico o empresa. Revisa todos los campos antes de compartir el código.', steps: ['Introduce los datos de contacto que quieras compartir.', 'Genera el código QR vCard y revisa la información.', 'Escanéalo con un teléfono para confirmar que la ficha aparece correctamente.'], tip: 'Incluye únicamente datos de contacto que estés dispuesto a compartir con quienes escaneen el código.' }
    }
  };
  const links = toolPages.map((tool) => {
    const toolMeta = SEO_METADATA[tool][locale];
    const href = localizedPath(toolMeta.canonicalPath, locale);
    return '<li><a href="' + escapeHtml(href) + '">' + escapeHtml(toolMeta.h1) + '</a></li>';
  }).join('');
  const copy = supportingCopy[page]?.[locale];
  const supportingSection = copy
    ? '<section><h2>' + escapeHtml(copy.heading) + '</h2><p>' + escapeHtml(copy.body) + '</p><h3>' +
      escapeHtml(locale === 'ar' ? 'طريقة الاستخدام' : locale === 'fr' ? 'Comment procéder' : locale === 'es' ? 'Cómo hacerlo' : 'How to use it') +
      '</h3><ol>' + copy.steps.map((step) => '<li>' + escapeHtml(step) + '</li>').join('') +
      '</ol><p><strong>' + escapeHtml(locale === 'ar' ? 'نصيحة:' : locale === 'fr' ? 'Conseil :' : locale === 'es' ? 'Consejo:' : 'Tip:') +
      '</strong> ' + escapeHtml(copy.tip) + '</p></section>'
    : '';
  return '<section class="seo-static-content" aria-label="' + escapeHtml(meta.h1) + '">' +
    '<h1>' + escapeHtml(meta.h1) + '</h1>' +
    '<p>' + escapeHtml(meta.description) + '</p>' + supportingSection +
    '<nav aria-label="' + escapeHtml(labels[locale]) + '">' +
    '<h2>' + escapeHtml(labels[locale]) + '</h2><ul>' + links + '</ul></nav></section>';
}

function renderPage(locale: typeof locales[number], page: typeof pages[number]): string {
  const meta = SEO_METADATA[page][locale];
  const canonicalPath = localizedPath(meta.canonicalPath, locale);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  let html = template.replace(/<html\s+lang="[^"]*">/, `<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`);
  // Put meaningful, crawlable page content in the initial HTML response.
  // React replaces this lightweight fallback when the application mounts.
  html = html.replace('<div id="root"></div>', '<div id="root">' + renderStaticContent(locale, page) + '</div>');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = setHeadTag(html, /<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = setHeadTag(html, /<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  html = setHeadTag(html, /<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<link\s+rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  html = html.replace(/\s*<link\s+rel="alternate"\s+hreflang="[^"]+"\s+href="[^"]+"\s*\/?>/g, '');
  const alternates = locales.map((altLocale) =>
    `  <link rel="alternate" hreflang="${altLocale}" href="${baseUrl}${localizedPath(meta.canonicalPath, altLocale)}" />`
  );
  alternates.push(`  <link rel="alternate" hreflang="x-default" href="${baseUrl}${localizedPath(meta.canonicalPath, 'en')}" />`);
  html = html.replace('</head>', `${alternates.join('\n')}\n</head>`);
  html = html.replace('"url": "https://qr-genius-1on.pages.dev/"', '"url": "https://getqrgenius.com/"');
  return html;
}

let generated = 0;
for (const page of pages) {
  for (const locale of locales) {
    const route = localizedPath(SEO_METADATA[page][locale].canonicalPath, locale);
    const relativeRoute = route.replace(/^\/+|\/+$/g, '');
    // Cloudflare Pages redirects folder index routes to trailing-slash URLs.
    // Emit flat HTML files for non-home pages so canonical extensionless URLs
    // (for example /tools/url) are served directly without a slash redirect.
    const outputFile = page === 'home'
      ? path.join(distDir, relativeRoute, 'index.html')
      : path.join(distDir, relativeRoute + '.html');
    await mkdir(path.dirname(outputFile), { recursive: true });
    await writeFile(outputFile, renderPage(locale, page), 'utf8');
    generated += 1;
  }
}

// The root fallback is the English home page; locale-prefixed URLs have their own static metadata.
await writeFile(path.join(distDir, 'index.html'), renderPage('en', 'home'), 'utf8');
console.log(`Generated ${generated} localized HTML entry points with page-specific SEO metadata.`);

// Generate the sitemap from the same localized route metadata used for canonical tags.
// This keeps sitemap URLs and hreflang alternates in sync with prerendered pages.
function escapeXml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&apos;');
}

const sitemapEntries = pages.flatMap((page) =>
  locales.map((locale) => {
    const canonicalPath = SEO_METADATA[page][locale].canonicalPath;
    const loc = `${baseUrl}${localizedPath(canonicalPath, locale)}`;
    const alternates = locales.map((alternateLocale) => {
      const alternatePath = localizedPath(SEO_METADATA[page][alternateLocale].canonicalPath, alternateLocale);
      return `    <xhtml:link rel="alternate" hreflang="${alternateLocale}" href="${escapeXml(`${baseUrl}${alternatePath}`)}" />`;
    });
    const defaultPath = localizedPath(SEO_METADATA[page].en.canonicalPath, 'en');
    alternates.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${baseUrl}${defaultPath}`)}" />`);
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n${alternates.join('\n')}\n  </url>`;
  })
);

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapEntries,
  '</urlset>',
  ''
].join('\n');

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${sitemapEntries.length} canonical localized URLs.`);

// Publish the robots.txt generated from the same canonical site configuration.
await writeFile(path.join(distDir, 'robots.txt'), generateRobotsTxt(), 'utf8');
console.log('Generated robots.txt with the canonical sitemap URL.');
