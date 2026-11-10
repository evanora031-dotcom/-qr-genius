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
const template = rawTemplate.replace('</head>', '<script>document.documentElement.classList.add("js-enabled");</script>' + fallbackStyles + '\n</head>');

const locales = ['en', 'ar', 'fr', 'es'] as const;
const pages = ['home', 'generator', 'image-compressor', 'url', 'wifi', 'whatsapp', 'business', 'about', 'contact', 'privacy', 'terms', 'faq'] as const;
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
      en: { heading: 'Share Wi-Fi access with a scan', body: 'A Wi-Fi QR code stores your network name (SSID), security type and, when required, password in a scannable format. On compatible iPhone and Android devices, guests can scan it and follow a connection prompt instead of typing the password manually. To make a guest Wi-Fi QR code, enter the SSID exactly as shown in your router settings, select the matching security option and supply the current password. Generate the code, then test it with a phone that is not already connected to the network. You can print the result for a reception desk, café table, rental welcome card or office meeting room. For safer sharing, consider a separate guest network rather than publishing the credentials of your primary home or business network. If you later change the password or network name, the static QR code must be regenerated and reprinted; it cannot update itself.', steps: ['Enter the exact Wi-Fi network name (SSID).', 'Choose the matching security type and enter its password if required.', 'Scan the code with a compatible phone to test the connection prompt.'], tip: 'A Wi-Fi QR code contains network access information, so share it only with people you intend to let onto the network.' },
      ar: { heading: 'شارك اتصال Wi-Fi عبر المسح', body: 'يحتوي رمز QR للواي فاي على بيانات الشبكة التي يحتاجها الهاتف المتوافق لعرض خيار الاتصال. ويمكن أن يسهّل وصول الضيوف إلى الإنترنت في المنزل أو المكتب أو المتجر. أدخل اسم الشبكة ونوع الحماية الصحيح، ثم اختبر الرمز قبل مشاركته.', steps: ['أدخل اسم شبكة Wi-Fi بدقة (SSID).', 'اختر نوع الحماية المطابق وأدخل كلمة المرور عند الحاجة.', 'امسح الرمز بهاتف متوافق لاختبار ظهور طلب الاتصال.'], tip: 'يتضمن رمز Wi-Fi بيانات الوصول إلى الشبكة؛ شاركه فقط مع الأشخاص الذين تسمح لهم بالاتصال.' },
      fr: { heading: 'Partagez l’accès Wi-Fi par scan', body: 'Un QR code Wi-Fi contient les informations dont un téléphone compatible a besoin pour proposer la connexion au réseau. Il facilite l’accès des invités à la maison, au bureau ou dans un commerce. Saisissez le nom du réseau et les paramètres de sécurité corrects, puis testez le code avant de le partager.', steps: ['Saisissez exactement le nom du réseau Wi-Fi (SSID).', 'Choisissez le type de sécurité correspondant et le mot de passe si nécessaire.', 'Scannez le code avec un téléphone compatible pour tester la demande de connexion.'], tip: 'Le QR code Wi-Fi contient des informations d’accès : partagez-le uniquement avec les personnes autorisées.' },
      es: { heading: 'Comparte el acceso Wi-Fi mediante un escaneo', body: 'Un código QR Wi-Fi contiene los datos que un teléfono compatible necesita para ofrecer la conexión a la red. Puede facilitar el acceso de invitados en casa, en una oficina o en un negocio. Introduce el nombre de la red y los datos de seguridad correctos y prueba el código antes de compartirlo.', steps: ['Introduce el nombre exacto de la red Wi-Fi (SSID).', 'Selecciona el tipo de seguridad correcto e introduce la contraseña si es necesario.', 'Escanea el código con un teléfono compatible para probar la solicitud de conexión.'], tip: 'El código QR Wi-Fi contiene datos de acceso: compártelo solo con personas autorizadas.' }
    },
    whatsapp: {
      en: { heading: 'Create a QR code that opens a WhatsApp chat', body: 'A WhatsApp QR code can help customers start a conversation with your business by scanning a printed or digital code. The code stores a WhatsApp click-to-chat (wa.me) link with the phone number you choose. Enter the full international number, including the country calling code, without a leading plus sign or punctuation. You may also add an optional pre-filled message, such as a product question or booking inquiry. Scanning the QR code opens a chat or compatible browser flow; it does not send the message automatically. Customers can review, edit and choose whether to send it. Use the downloaded code on menus, receipts, flyers, product packaging or business cards, and scan-test it on a phone before printing. This is a static QR code: if your WhatsApp number changes, generate a new code. A working destination also depends on the number and WhatsApp service remaining available.', steps: ['Enter the WhatsApp phone number with its country code.', 'Add an optional message if you want to provide a starting point.', 'Scan the code and confirm that it opens the intended chat.'], tip: 'Check the phone number carefully before printing or sharing the code.' },
      ar: { heading: 'أنشئ رمز QR يفتح محادثة واتساب', body: 'يمكن لرمز واتساب أن ينقل الشخص مباشرة إلى محادثة مع الرقم الذي تدخله. ويمكنك أيضاً إضافة رسالة اختيارية لتوضيح سبب التواصل. يناسب ذلك بطاقات العمل ومعلومات الخدمات والفعاليات وصفحات دعم العملاء.', steps: ['أدخل رقم واتساب مع رمز الدولة.', 'أضف رسالة اختيارية إذا أردت توضيح بداية المحادثة.', 'امسح الرمز وتأكد من أنه يفتح المحادثة المطلوبة.'], tip: 'تحقق من رقم الهاتف جيداً قبل طباعة الرمز أو مشاركته.' },
      fr: { heading: 'Créez un QR code qui ouvre une discussion WhatsApp', body: 'Un QR code WhatsApp peut diriger une personne vers une discussion avec le numéro indiqué. Vous pouvez également ajouter un message facultatif pour donner un contexte au premier échange. Cette option convient aux cartes de visite, aux informations de service, aux événements et aux pages d’assistance.', steps: ['Saisissez le numéro WhatsApp avec son indicatif pays.', 'Ajoutez un message facultatif pour démarrer la conversation.', 'Scannez le code et vérifiez qu’il ouvre la bonne discussion.'], tip: 'Vérifiez soigneusement le numéro avant d’imprimer ou de partager le code.' },
      es: { heading: 'Crea un código QR que abre un chat de WhatsApp', body: 'Un código QR de WhatsApp puede llevar a una persona directamente a un chat con el número indicado. También puedes añadir un mensaje opcional para dar contexto al primer contacto. Es útil en tarjetas de visita, información de servicios, materiales de eventos y páginas de atención al cliente.', steps: ['Introduce el número de WhatsApp con el prefijo del país.', 'Añade un mensaje opcional para iniciar la conversación.', 'Escanea el código y confirma que abre el chat correcto.'], tip: 'Comprueba cuidadosamente el número antes de imprimir o compartir el código.' }
    },
    business: {
      en: { heading: 'Share contact details with a vCard QR code', body: 'A vCard QR code packages contact information in a format supported by many phone contact apps. People can scan it to open a contact card and save details such as a name, phone number, email address, or company. Review every field before sharing your code.', steps: ['Enter the contact details you want to share.', 'Generate the vCard QR code and review the information.', 'Scan it with a phone to confirm the contact card appears correctly.'], tip: 'Only include contact information that you are comfortable making available to anyone who scans the code.' },
      ar: { heading: 'شارك بيانات الاتصال باستخدام رمز vCard', body: 'يجمع رمز vCard معلومات الاتصال بتنسيق تدعمه تطبيقات جهات الاتصال في كثير من الهواتف. يمكن للآخرين مسحه لفتح بطاقة اتصال وحفظ بيانات مثل الاسم ورقم الهاتف والبريد الإلكتروني أو الشركة. راجع جميع الحقول قبل مشاركة الرمز.', steps: ['أدخل بيانات الاتصال التي تريد مشاركتها.', 'أنشئ رمز vCard وراجع المعلومات الموجودة فيه.', 'امسحه بهاتف للتأكد من ظهور بطاقة الاتصال بشكل صحيح.'], tip: 'لا تُضمّن إلا بيانات الاتصال التي توافق على إتاحتها لكل من يمسح الرمز.' },
      fr: { heading: 'Partagez vos coordonnées avec un QR code vCard', body: 'Un QR code vCard regroupe des coordonnées dans un format pris en charge par de nombreuses applications de contacts. Les personnes peuvent le scanner pour ouvrir une fiche et enregistrer un nom, un numéro de téléphone, une adresse e-mail ou une entreprise. Vérifiez chaque champ avant de partager le code.', steps: ['Saisissez les coordonnées que vous souhaitez partager.', 'Générez le QR code vCard et vérifiez les informations.', 'Scannez-le avec un téléphone pour confirmer que la fiche s’affiche correctement.'], tip: 'N’incluez que les coordonnées que vous acceptez de rendre accessibles aux personnes qui scannent le code.' },
      es: { heading: 'Comparte datos de contacto con un código QR vCard', body: 'Un código QR vCard reúne datos de contacto en un formato compatible con muchas aplicaciones de contactos. Las personas pueden escanearlo para abrir una ficha y guardar un nombre, teléfono, correo electrónico o empresa. Revisa todos los campos antes de compartir el código.', steps: ['Introduce los datos de contacto que quieras compartir.', 'Genera el código QR vCard y revisa la información.', 'Escanéalo con un teléfono para confirmar que la ficha aparece correctamente.'], tip: 'Incluye únicamente datos de contacto que estés dispuesto a compartir con quienes escaneen el código.' }
    },
    about: {
      en: { heading: 'A practical QR code tool built around privacy', body: 'QR GENIUS is a browser-based QR code generator for creators, developers, small businesses, and organizations. It supports website links, Wi-Fi access, WhatsApp chats, and digital contact cards, with an interface available in English, Arabic, French, and Spanish.', steps: ['Choose the QR code type that matches the information you want to share.', 'Enter your content and customize the available design options.', 'Download the code and scan it with a phone before publishing or printing.'], tip: 'Static QR codes store their content in the code itself; a linked website must still remain available for its link to work.' },
      ar: { heading: 'أداة عملية لإنشاء رموز QR مع الاهتمام بالخصوصية', body: 'QR GENIUS أداة تعمل عبر المتصفح لإنشاء رموز QR للمبدعين والمطورين والشركات الصغيرة والمؤسسات. تدعم روابط المواقع وشبكات Wi-Fi ومحادثات واتساب وبطاقات الاتصال الرقمية، وتتوفر واجهتها بالإنجليزية والعربية والفرنسية والإسبانية.', steps: ['اختر نوع رمز QR الذي يناسب المعلومات التي تريد مشاركتها.', 'أدخل المحتوى وخصّص خيارات التصميم المتاحة.', 'نزّل الرمز وامسحه بهاتفك قبل نشره أو طباعته.'], tip: 'تخزّن الرموز الثابتة محتواها داخل الرمز نفسه، لكن يجب أن يظل الموقع المرتبط متاحاً حتى يعمل الرابط.' },
      fr: { heading: 'Un outil QR pratique conçu dans le respect de la confidentialité', body: 'QR GENIUS est un générateur de QR codes dans le navigateur destiné aux créateurs, développeurs, petites entreprises et organisations. Il prend en charge les liens web, les accès Wi-Fi, les discussions WhatsApp et les fiches de contact numériques. Son interface est disponible en anglais, arabe, français et espagnol.', steps: ['Choisissez le type de QR code adapté aux informations à partager.', 'Saisissez votre contenu et personnalisez les options disponibles.', 'Téléchargez le code et scannez-le avec un téléphone avant de le publier ou de l’imprimer.'], tip: 'Les codes statiques contiennent leurs données, mais un site lié doit rester accessible pour que son lien fonctionne.' },
      es: { heading: 'Una herramienta QR práctica que prioriza la privacidad', body: 'QR GENIUS es un generador de códigos QR que funciona en el navegador y está dirigido a creadores, desarrolladores, pequeñas empresas y organizaciones. Admite enlaces web, acceso Wi-Fi, chats de WhatsApp y tarjetas de contacto digitales. La interfaz está disponible en inglés, árabe, francés y español.', steps: ['Elige el tipo de código QR adecuado para la información que quieres compartir.', 'Introduce el contenido y personaliza las opciones de diseño disponibles.', 'Descarga el código y escanéalo con un teléfono antes de publicarlo o imprimirlo.'], tip: 'Los códigos estáticos guardan su contenido en el propio código; el sitio enlazado debe seguir disponible para que funcione el enlace.' }
    },
    contact: {
      en: { heading: 'Contact the QR GENIUS support team', body: 'Contact us with questions about creating QR codes, using the available tools, reporting a problem, or suggesting a feature. You can use the website contact form or email support@getqrgenius.com directly. Messages sent through the form are used to review and respond to your inquiry.', steps: ['Describe your question or the issue you encountered.', 'Include a valid email address so we can reply.', 'Send the form or email support@getqrgenius.com.'], tip: 'Do not include passwords, Wi-Fi credentials, or other sensitive information in a support message.' },
      ar: { heading: 'تواصل مع فريق دعم QR GENIUS', body: 'يمكنك التواصل معنا لطرح أسئلة حول إنشاء رموز QR أو استخدام الأدوات أو الإبلاغ عن مشكلة أو اقتراح ميزة جديدة. استخدم نموذج التواصل في الموقع أو راسل support@getqrgenius.com مباشرةً. نستخدم الرسائل المرسلة عبر النموذج لمراجعة استفسارك والرد عليه.', steps: ['اشرح سؤالك أو المشكلة التي واجهتها.', 'أدخل عنوان بريد إلكتروني صحيحاً حتى نتمكن من الرد.', 'أرسل النموذج أو راسل support@getqrgenius.com.'], tip: 'لا ترسل كلمات المرور أو بيانات دخول Wi-Fi أو أي معلومات حساسة ضمن رسالة الدعم.' },
      fr: { heading: 'Contacter l’assistance QR GENIUS', body: 'Contactez-nous pour toute question sur la création de QR codes, l’utilisation des outils, le signalement d’un problème ou une suggestion. Utilisez le formulaire du site ou écrivez directement à support@getqrgenius.com. Les messages envoyés via le formulaire servent à examiner votre demande et à y répondre.', steps: ['Décrivez votre question ou le problème rencontré.', 'Indiquez une adresse e-mail valide pour recevoir une réponse.', 'Envoyez le formulaire ou écrivez à support@getqrgenius.com.'], tip: 'N’incluez pas de mots de passe, d’identifiants Wi-Fi ni d’autres informations sensibles dans votre message.' },
      es: { heading: 'Contacta con el equipo de soporte de QR GENIUS', body: 'Puedes escribirnos si tienes preguntas sobre la creación de códigos QR, el uso de las herramientas, un problema o una sugerencia. Utiliza el formulario del sitio o escribe directamente a support@getqrgenius.com. Los mensajes del formulario se utilizan para revisar y responder a tu consulta.', steps: ['Describe tu pregunta o el problema que has encontrado.', 'Incluye una dirección de correo válida para que podamos responder.', 'Envía el formulario o escribe a support@getqrgenius.com.'], tip: 'No incluyas contraseñas, credenciales Wi-Fi ni otra información sensible en tu mensaje.' }
    },
    privacy: {
      en: { heading: 'How QR GENIUS handles information', body: 'QR code content is generated locally in your browser and is not sent to our servers for code generation. The site contact form collects the name, email address, topic, and message you choose to submit so we can respond. Recent-code history is stored in your browser. We do not currently configure Cloudflare Web Analytics or third-party audience-measurement scripts. Hosting and content-delivery providers may process basic connection information to deliver and secure the site; advertising technologies may apply if advertising is enabled.', steps: ['Avoid entering sensitive information into QR content unless you intend to encode and share it.', 'Use the contact form only for support inquiries and do not include passwords.', 'Read the full Privacy Policy for details about browser storage, contact messages, analytics, and advertising.'], tip: 'For privacy questions, contact support@getqrgenius.com.' },
      ar: { heading: 'كيف يتعامل QR GENIUS مع المعلومات', body: 'يتم إنشاء محتوى رموز QR محلياً داخل متصفحك ولا يُرسل إلى خوادمنا لغرض إنشاء الرمز. يجمع نموذج التواصل الاسم والبريد الإلكتروني والموضوع والرسالة التي تختار إرسالها حتى نتمكن من الرد. يُحفظ سجل الرموز الأخيرة في متصفحك. لا نُفعّل حالياً Cloudflare Web Analytics أو نصوصاً برمجية تابعة لجهات خارجية لقياس جمهور الموقع. وقد يعالج مزودو الاستضافة وتوصيل المحتوى معلومات اتصال أساسية لتشغيل الموقع وحمايته؛ وقد تنطبق تقنيات الإعلانات إذا تم تفعيلها.', steps: ['تجنب إدخال معلومات حساسة في محتوى QR إلا إذا كنت تقصد تضمينها ومشاركتها.', 'استخدم نموذج التواصل للاستفسارات ولا تضع كلمات المرور في الرسائل.', 'راجع سياسة الخصوصية الكاملة لمعرفة تفاصيل التخزين المحلي ورسائل التواصل والتحليلات والإعلانات.'], tip: 'للاستفسارات المتعلقة بالخصوصية، راسل support@getqrgenius.com.' },
      fr: { heading: 'Comment QR GENIUS traite les informations', body: 'Le contenu des QR codes est généré localement dans votre navigateur et n’est pas envoyé à nos serveurs pour cette opération. Le formulaire de contact recueille le nom, l’adresse e-mail, le sujet et le message que vous soumettez afin que nous puissions répondre. L’historique des codes récents est stocké dans votre navigateur. Nous ne configurons actuellement pas Cloudflare Web Analytics ni de scripts tiers de mesure d’audience. Nos fournisseurs d’hébergement et de diffusion peuvent traiter des informations de connexion de base pour fournir et sécuriser le site ; des technologies publicitaires peuvent s’appliquer si la publicité est activée.', steps: ['Évitez d’insérer des informations sensibles dans un QR code, sauf si vous souhaitez les encoder et les partager.', 'Utilisez le formulaire pour les demandes d’assistance et n’envoyez pas de mots de passe.', 'Consultez la politique complète pour les détails sur le stockage local, les messages, les statistiques et la publicité.'], tip: 'Pour toute question sur la confidentialité, écrivez à support@getqrgenius.com.' },
      es: { heading: 'Cómo gestiona QR GENIUS la información', body: 'El contenido de los códigos QR se genera localmente en tu navegador y no se envía a nuestros servidores para crear el código. El formulario de contacto recopila el nombre, correo electrónico, asunto y mensaje que decides enviar para poder responderte. El historial de códigos recientes se guarda en tu navegador. Actualmente no configuramos Cloudflare Web Analytics ni scripts de terceros para medir la audiencia. Los proveedores de alojamiento y distribución pueden procesar información básica de conexión para ofrecer y proteger el sitio; pueden aplicarse tecnologías publicitarias si se habilita la publicidad.', steps: ['Evita introducir información sensible en un código QR salvo que quieras codificarla y compartirla.', 'Utiliza el formulario para consultas de soporte y no incluyas contraseñas.', 'Consulta la Política de privacidad completa para conocer el almacenamiento local, los mensajes, las analíticas y la publicidad.'], tip: 'Para preguntas sobre privacidad, escribe a support@getqrgenius.com.' }
    },
    faq: {
      en: { heading: 'Answers about QR codes, privacy, and printing', body: 'QR GENIUS provides static QR codes for common uses such as website links, Wi-Fi access, WhatsApp chats, and contact cards. Static codes contain their data directly and do not rely on an expiring redirect service. The FAQ explains formats, print preparation, error correction, and how code generation handles your information.', steps: ['Use SVG when you need a scalable vector file for professional printing.', 'Keep strong contrast and test the printed size with the phones your audience uses.', 'For a code with a logo or damaged areas, choose suitable error correction and test it before distribution.'], tip: 'If your question is not covered, contact support@getqrgenius.com.' },
      ar: { heading: 'إجابات حول رموز QR والخصوصية والطباعة', body: 'يوفر QR GENIUS رموز QR ثابتة لاستخدامات شائعة مثل روابط المواقع وشبكات Wi-Fi ومحادثات واتساب وبطاقات الاتصال. تحتوي الرموز الثابتة على بياناتها مباشرةً ولا تعتمد على خدمة تحويل تنتهي صلاحيتها. توضح الأسئلة الشائعة صيغ الملفات وتجهيز الطباعة وتصحيح الأخطاء وكيفية التعامل مع بياناتك أثناء إنشاء الرمز.', steps: ['استخدم SVG عندما تحتاج إلى ملف متجه قابل للتكبير للطباعة الاحترافية.', 'حافظ على تباين واضح واختبر حجم الرمز المطبوع بهواتف الجمهور المستهدف.', 'إذا أضفت شعاراً أو كانت أجزاء من الرمز معرضة للتلف، اختر مستوى تصحيح مناسباً واختبره قبل التوزيع.'], tip: 'إذا لم تجد إجابة لسؤالك، تواصل مع support@getqrgenius.com.' },
      fr: { heading: 'Réponses sur les QR codes, la confidentialité et l’impression', body: 'QR GENIUS propose des QR codes statiques pour les usages courants : liens web, accès Wi-Fi, discussions WhatsApp et fiches de contact. Les codes statiques contiennent directement leurs données et ne dépendent pas d’un service de redirection qui expire. La FAQ présente les formats, la préparation à l’impression, la correction d’erreurs et le traitement des informations.', steps: ['Choisissez SVG si vous avez besoin d’un fichier vectoriel redimensionnable pour l’impression professionnelle.', 'Conservez un contraste élevé et testez la taille imprimée avec les téléphones de votre public.', 'Si vous ajoutez un logo ou si le code risque d’être endommagé, choisissez une correction adaptée et testez-le avant diffusion.'], tip: 'Si votre question n’est pas abordée, contactez support@getqrgenius.com.' },
      es: { heading: 'Respuestas sobre códigos QR, privacidad e impresión', body: 'QR GENIUS ofrece códigos QR estáticos para usos habituales como enlaces web, acceso Wi-Fi, chats de WhatsApp y tarjetas de contacto. Los códigos estáticos contienen sus datos directamente y no dependen de un servicio de redirección que caduque. Las preguntas frecuentes explican los formatos, la preparación para impresión, la corrección de errores y el tratamiento de la información.', steps: ['Utiliza SVG cuando necesites un archivo vectorial escalable para impresión profesional.', 'Mantén un buen contraste y prueba el tamaño impreso con los teléfonos que utilizará tu público.', 'Si añades un logotipo o el código puede dañarse, elige una corrección adecuada y pruébalo antes de distribuirlo.'], tip: 'Si no encuentras tu respuesta, contacta con support@getqrgenius.com.' }
    }
  };
  const links = toolPages.map((tool) => {
    const toolMeta = SEO_METADATA[tool][locale];
    const href = localizedPath(toolMeta.canonicalPath, locale);
    return '<li><a href="' + escapeHtml(href) + '">' + escapeHtml(toolMeta.h1) + '</a></li>';
  }).join('');
  const resourcePages = ['about', 'faq', 'contact', 'privacy', 'terms'] as const;
  const resourceLabels: Record<typeof locales[number], Record<typeof resourcePages[number], string>> = {
    en: { about: 'About QR GENIUS', faq: 'Frequently asked questions', contact: 'Contact support', privacy: 'Privacy policy', terms: 'Terms of use' },
    ar: { about: 'من نحن', faq: 'الأسئلة الشائعة', contact: 'اتصل بالدعم', privacy: 'سياسة الخصوصية', terms: 'شروط الاستخدام' },
    fr: { about: 'À propos de QR GENIUS', faq: 'Questions fréquentes', contact: 'Contacter le support', privacy: 'Politique de confidentialité', terms: 'Conditions d’utilisation' },
    es: { about: 'Acerca de QR GENIUS', faq: 'Preguntas frecuentes', contact: 'Contactar con soporte', privacy: 'Política de privacidad', terms: 'Condiciones de uso' }
  };
  const resourceLinks = resourcePages.map((resource) => {
    const resourceMeta = SEO_METADATA[resource][locale];
    const href = localizedPath(resourceMeta.canonicalPath, locale);
    return '<li><a href="' + escapeHtml(href) + '">' + escapeHtml(resourceLabels[locale][resource]) + '</a></li>';
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
    '<h2>' + escapeHtml(labels[locale]) + '</h2><ul>' + links + '</ul></nav>' +
    '<nav aria-label="' + escapeHtml(resourceLabels[locale].about) + '">' +
    '<h2>' + escapeHtml(locale === 'ar' ? 'معلومات ومساعدة' : locale === 'fr' ? 'Informations et assistance' : locale === 'es' ? 'Información y ayuda' : 'Information and help') + '</h2><ul>' + resourceLinks + '</ul></nav></section>';
}


// Keep FAQ structured data sourced from the same visible FAQ entries in ToolLandingPage.
// The first question for each tool is copied verbatim; do not invent answers.
const toolFaqs: Partial<Record<typeof pages[number], { question: string; answer: string }>> = {
  wifi: {
    question: 'Do guests need an app to scan the Wi-Fi code?',
    answer: 'Many recent iPhone and Android devices recognize Wi-Fi QR codes in the camera or QR scanner. Scan the code, review the network name, and follow the device prompt to connect. Support varies by device and operating system.'
  },
  whatsapp: {
    question: 'How does WhatsApp QR code routing work?',
    answer: 'The QR code contains a wa.me link for the phone number you enter. Scanning opens the chat in WhatsApp when available, or a compatible browser flow. The visitor must choose to send any message.'
  },
  business: {
    question: 'How does vCard scanning work on smartphones?',
    answer: 'Compatible phones and contact apps can recognize the vCard data and offer to create a new contact. The exact prompt and supported fields depend on the device.'
  }
};
function structuredData(locale: typeof locales[number], page: typeof pages[number], canonicalUrl: string) {
  const objects: Record<string, unknown>[] = [];
  if (page === 'home') objects.push({
    '@context': 'https://schema.org', '@type': 'SoftwareApplication',
    name: 'QR GENIUS', applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web', url: canonicalUrl,
    description: SEO_METADATA.home[locale].description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free QR code generator' }
  });
  if (['url', 'wifi', 'whatsapp', 'business'].includes(page)) {
    objects.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'QR GENIUS', item: baseUrl + localizedPath('/', locale) },
        { '@type': 'ListItem', position: 2, name: SEO_METADATA[page][locale].h1, item: canonicalUrl }
      ]
    });
  }
  const faq = toolFaqs[page];
  // Only English tool pages currently render these exact English FAQ strings.
  if (faq && locale === 'en') objects.push({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: [{ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } }]
  });
  return objects.map(obj => '<script type="application/ld+json">' + JSON.stringify(obj).replaceAll('<', '\\u003c') + '</script>').join('\\n');
}

function renderPage(locale: typeof locales[number], page: typeof pages[number]): string {
  const meta = SEO_METADATA[page][locale];
  const canonicalPath = localizedPath(meta.canonicalPath, locale);
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  // Remove the generic WebApplication JSON-LD inherited from index.html:
  // structured data below is generated per page and locale instead.
  let html = template.replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/g, '').replace(/<html\s+lang="[^"]*">/, `<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`);
  // Put meaningful, crawlable page content in the initial HTML response.
  // React replaces this lightweight fallback when the application mounts.
  html = html.replace('<div id="root"></div>', '<div id="root">' + renderStaticContent(locale, page) + '</div>');
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`);
  html = setHeadTag(html, /<meta\s+name="description"[^>]*>/, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  html = setHeadTag(html, /<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = setHeadTag(html, /<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${baseUrl}/og-image.png" />`);
  html = setHeadTag(html, /<meta\s+property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="QR Genius — Free QR Code Generator" />`);
  html = setHeadTag(html, /<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${baseUrl}/og-image.png" />`);
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
  html = html.replace('</head>', structuredData(locale, page, canonicalUrl) + '\n</head>');
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

const blogSlugs = ['business-card-qr-code-guide', 'wifi-qr-code-for-guests', 'whatsapp-qr-code-for-customers'];
const blogEntries = [
  `  <url>\n    <loc>${baseUrl}/blog/</loc>\n  </url>`,
  ...blogSlugs.map(slug => `  <url>\n    <loc>${baseUrl}/blog/${slug}</loc>\n    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/blog/${slug}" />\n  </url>`),
  `  <url>\n    <loc>${baseUrl}/en/blog/</loc>\n  </url>`,
  `  <url>\n    <loc>${baseUrl}/en/blog/how-to-make-wifi-qr-code-for-guests.html</loc>\n  </url>`,
  `  <url>\n    <loc>${baseUrl}/en/blog/how-to-create-whatsapp-qr-code-for-customers.html</loc>\n  </url>`,
  `  <url>\n    <loc>${baseUrl}/en/blog/how-to-make-business-card-qr-code.html</loc>\n  </url>`
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapEntries,
  ...blogEntries,
  '</urlset>',
  ''
].join('\n');

await writeFile(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${sitemapEntries.length + blogEntries.length} canonical URLs.`);

// Publish the robots.txt generated from the same canonical site configuration.
await writeFile(path.join(distDir, 'robots.txt'), generateRobotsTxt(), 'utf8');
console.log('Generated robots.txt with the canonical sitemap URL.');
