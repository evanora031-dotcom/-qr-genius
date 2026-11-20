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
    answer: 'QR GENIUS currently provides its 12 QR code generators without requiring an account or registration. Static QR codes do not have a scan counter managed by QR GENIUS. Features and availability may change; check the site for current terms.'
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
    answer: 'There is no universal minimum size that guarantees scanning. Readability depends on the amount of encoded data, print quality, contrast, quiet zone, camera, and scanning distance. Print a test at the intended size and scan it with several devices before producing copies.'
  },
  {
    id: 'f5',
    category: 'security',
    question: 'Is my data safe when generating QR codes here?',
    answer: 'The QR payload is processed locally in your browser to generate the code; it is not sent to our servers for QR generation. Avoid entering sensitive information into the contact form or other third-party services, and remember that your browser and device have their own security considerations.'
  },
  {
    id: 'f6',
    category: 'technical',
    question: 'What is Error Correction Level (ECC) and why does it matter?',
    answer: 'Error correction can help a QR code remain readable when part of it is damaged or obscured. Levels range from L (about 7%) to H (about 30%) recovery capacity. Adding a logo covers part of the code and can make scanning less reliable; choose an appropriate error-correction level and test the finished code with multiple devices. A successful scan cannot be guaranteed.'
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
    answer: 'Static QR codes embed the exact payload directly in the graphic, meaning they never expire and require no external servers. Dynamic QR codes redirect through a short link that allows the destination to be changed after printing. The QR GENIUS tools generate static QR codes.'
  }
];


const FAQS_AR: FAQItem[] = [
  { id: 'f1', category: 'general', question: 'هل إنشاء رموز QR على الموقع مجاني فعلاً؟', answer: 'نعم، توفر QR GENIUS حالياً أدوات إنشاء رموز QR الاثنتي عشرة دون اشتراط إنشاء حساب أو التسجيل. الرموز الثابتة لا تحتوي على عدّاد للمسح تديره QR GENIUS. قد تتغير الميزات أو شروط الإتاحة، لذا راجع الموقع للاطلاع على الشروط الحالية.' },
  { id: 'f2', category: 'general', question: 'هل تنتهي صلاحية رموز QR أو تتوقف عن العمل؟', answer: 'لا. ينشئ الموقع رموز QR ثابتة وفق المعايير، وتُشفّر البيانات مثل رابط الموقع أو شبكة Wi-Fi مباشرةً داخل الرمز. سيظل الرمز صالحاً ما دام الرابط أو الوجهة متاحاً.' },
  { id: 'f3', category: 'print', question: 'ما صيغة الملف المناسبة للطباعة الاحترافية؟', answer: 'نوصي بصيغة SVG المتجهة للطباعة الاحترافية واللافتات والتغليف؛ إذ يمكن تكبيرها دون فقدان الجودة. وللاستخدام الرقمي والمنشورات، يمكنك اختيار PNG عالي الدقة أو فائق الدقة.' },
  { id: 'f4', category: 'print', question: 'ما أقل حجم موصى به لطباعة رمز QR؟', answer: 'لا يوجد حجم أدنى يضمن نجاح المسح في جميع الحالات؛ إذ تعتمد القراءة على كمية البيانات وجودة الطباعة والتباين والمساحة البيضاء حول الرمز والكاميرا ومسافة المسح. اطبع نسخة تجريبية بالحجم المطلوب واختبرها بأكثر من جهاز قبل الطباعة بكميات كبيرة.' },
  { id: 'f5', category: 'security', question: 'هل بياناتي آمنة عند إنشاء رموز QR هنا؟', answer: 'تُعالج البيانات التي تدخلها لإنشاء رمز QR محلياً في متصفحك، ولا تُرسل إلى خوادمنا لغرض إنشاء الرمز. تجنب إدخال معلومات حساسة في نموذج التواصل أو خدمات الجهات الخارجية، وتذكّر أن أمان المتصفح والجهاز يعتمد أيضاً على إعداداتهما.' },
  { id: 'f6', category: 'technical', question: 'ما مستوى تصحيح الأخطاء (ECC) ولماذا هو مهم؟', answer: 'يساعد تصحيح الأخطاء على قراءة الرمز عند تلف جزء منه أو حجبه. تتدرج المستويات من L (نحو 7%) إلى H (نحو 30%). قد يجعل الشعار وسط الرمز أقل قابلية للمسح لأنه يغطي بعض البيانات؛ اختر مستوى مناسباً واختبر الرمز النهائي بأكثر من جهاز، إذ لا يمكن ضمان نجاح المسح.' },
  { id: 'f7', category: 'technical', question: 'هل يمكنني إضافة شعاري إلى وسط رمز QR؟', answer: 'نعم. افتح تبويب الشعار في استوديو QR واختر أحد الشعارات الجاهزة أو ارفع شعارك بصيغة PNG أو JPG أو SVG.' },
  { id: 'f8', category: 'general', question: 'ما الفرق بين رموز QR الثابتة والديناميكية؟', answer: 'تحتوي الرموز الثابتة على البيانات مباشرةً ولا تحتاج إلى خادم تحويل. أما الرموز الديناميكية فتستخدم عادةً رابطاً وسيطاً يمكن تغيير وجهته لاحقاً. الأدوات هنا تنشئ رموزاً ثابتة.' }
];


const FAQS_FR: FAQItem[] = [
  { id: 'f1', category: 'general', question: 'La création de QR codes avec QR GENIUS est-elle gratuite ?', answer: 'QR GENIUS propose actuellement 12 générateurs sans inscription obligatoire. Les QR codes statiques ne comportent pas de compteur de scans géré par QR GENIUS. Les fonctionnalités et conditions peuvent évoluer ; consultez le site pour connaître les conditions actuelles.' },
  { id: 'f2', category: 'general', question: 'Les QR codes expirent-ils ?', answer: 'Les outils créent des QR codes statiques : les données sont intégrées directement dans le code. Ils restent utilisables tant que le lien ou le service de destination fonctionne.' },
  { id: 'f3', category: 'print', question: 'Quel format choisir pour une impression professionnelle ?', answer: 'Choisissez SVG pour les affiches, emballages et impressions grand format : ce format vectoriel peut être redimensionné sans pixellisation. Le PNG haute résolution convient aux usages numériques et aux documents courants.' },
  { id: 'f4', category: 'print', question: 'Quelle taille minimale prévoir à l’impression ?', answer: 'Aucune taille minimale universelle ne garantit la lecture. Celle-ci dépend notamment de la quantité de données, de la qualité d’impression, du contraste, de la zone de silence, de l’appareil photo et de la distance de lecture. Imprimez un exemplaire test à la taille prévue et vérifiez-le avec plusieurs appareils.' },
  { id: 'f5', category: 'security', question: 'Mes données sont-elles protégées pendant la création ?', answer: 'La génération est effectuée localement dans votre navigateur. Les contenus saisis pour les réseaux Wi-Fi, les contacts ou les liens ne sont pas envoyés à nos serveurs pour créer le QR code.' },
  { id: 'f6', category: 'technical', question: 'À quoi sert la correction d’erreurs (ECC) ?', answer: 'La correction d’erreurs aide un QR code à rester lisible si une partie est masquée ou endommagée. Les niveaux vont de L à H. Si vous ajoutez un logo, testez toujours le code avec plusieurs téléphones avant impression.' },
  { id: 'f7', category: 'technical', question: 'Puis-je ajouter mon propre logo au QR code ?', answer: 'Oui. Ouvrez l’onglet Logo dans QR Studio et choisissez une icône proposée ou importez votre fichier PNG, JPG ou SVG.' },
  { id: 'f8', category: 'general', question: 'Quelle est la différence entre un QR code statique et dynamique ?', answer: 'Un code statique contient directement les données et sa destination ne peut pas être modifiée après création. Un code dynamique utilise généralement une redirection qui permet de changer la destination. Les outils QR GENIUS créent des codes QR statiques.' }
];

const FAQS_ES: FAQItem[] = [
  { id: 'f1', category: 'general', question: '¿Crear códigos QR con QR GENIUS es realmente gratis?', answer: 'QR GENIUS ofrece actualmente 12 generadores sin necesidad de registrarse. Los códigos QR estáticos no incluyen un contador de escaneos gestionado por QR GENIUS. Las funciones y condiciones pueden cambiar; consulta el sitio para conocer las condiciones vigentes.' },
  { id: 'f2', category: 'general', question: '¿Los códigos QR caducan?', answer: 'Las herramientas crean códigos QR estáticos: los datos se guardan directamente en el patrón. Seguirán funcionando mientras el enlace o servicio de destino esté disponible.' },
  { id: 'f3', category: 'print', question: '¿Qué formato debo descargar para impresión profesional?', answer: 'Elige SVG para carteles, envases e impresiones grandes: es un formato vectorial que se puede ampliar sin pixelarse. PNG de alta resolución es adecuado para usos digitales y documentos habituales.' },
  { id: 'f4', category: 'print', question: '¿Qué tamaño mínimo se recomienda para imprimir un QR?', answer: 'No existe un tamaño mínimo universal que garantice la lectura. Depende de la cantidad de datos, la calidad de impresión, el contraste, la zona de silencio, la cámara y la distancia de escaneo. Imprime una prueba al tamaño previsto y compruébala con varios dispositivos.' },
  { id: 'f5', category: 'security', question: '¿Están protegidos mis datos al crear códigos QR?', answer: 'La generación se realiza localmente en tu navegador. Los datos introducidos para redes Wi-Fi, contactos o enlaces no se envían a nuestros servidores para crear el código.' },
  { id: 'f6', category: 'technical', question: '¿Para qué sirve la corrección de errores (ECC)?', answer: 'La corrección de errores ayuda a leer un QR aunque una parte esté tapada o dañada. Los niveles van de L a H. Si añades un logotipo, prueba el código con varios teléfonos antes de imprimirlo.' },
  { id: 'f7', category: 'technical', question: '¿Puedo añadir mi propio logotipo al código QR?', answer: 'Sí. Abre la pestaña Logotipo en QR Studio y selecciona un icono disponible o sube tu archivo PNG, JPG o SVG.' },
  { id: 'f8', category: 'general', question: '¿Cuál es la diferencia entre códigos QR estáticos y dinámicos?', answer: 'Un código estático contiene los datos directamente y su destino no se puede cambiar después de crearlo. Un código dinámico suele usar una redirección que permite cambiar el destino. Las herramientas de QR GENIUS crean códigos QR estáticos.' }
];

export const faqByLanguage = { en: FAQS, ar: FAQS_AR, fr: FAQS_FR, es: FAQS_ES };
