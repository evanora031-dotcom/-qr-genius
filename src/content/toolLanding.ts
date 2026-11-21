import type { QRType } from '../types';

const TOOL_CONFIGS = {
  url: {
    type: 'url' as QRType,
    badge: 'Official Web Tool',
    title: 'Free QR Code for Website Links',
    subtitle: 'Turn a link into a QR code for your website, online store, portfolio, or menu. Create a static code for free, customize its colors or logo, and download it for print or sharing.',
    benefits: [
      'The QR code contains your website URL directly, without a QR Genius redirect',
      'Add UTM parameters to your URL before generating the code to track visits in your own analytics',
      'Download a scalable SVG or high-resolution PNG for flyers, business cards, and packaging',
      'Check that your destination uses HTTPS and works on a phone before printing or sharing the QR code'
    ],
    faqs: [
      { q: 'Do URL QR codes generated here ever expire?', a: 'QR GENIUS creates a static QR code containing your web address. The code itself has no built-in expiry, but it will only open the page while that address and website remain available.' },
      { q: 'Can I include UTM tracking parameters in the URL?', a: 'Yes! Simply append your UTM parameters (e.g. ?utm_source=flyer&utm_medium=qr) directly into the URL input field.' },
      { q: 'What is the best format to print on physical flyers?', a: 'Use SVG for a scalable vector file, or a high-resolution PNG for print. Test the finished code at its intended printed size before distributing it.' },
      { q: 'How do I turn a website link into a QR code?', a: 'Paste the full website address into the URL field, generate the QR code, scan it with your phone to verify the destination, and download the result.' },
      { q: 'Can I change the website address after printing?', a: 'A static QR code stores the original link. To point it to a different URL, create and print a new code, or manage the destination on a URL you control.' },
      { q: 'What should I test before printing a URL QR code?', a: 'Use the full HTTPS address, then scan the final QR code with a phone. Check that it opens the intended mobile page without a login or broken link. If you use a URL you control, you may later change where that URL redirects; the QR code itself still stores the original address.' }
    ]
  },
  wifi: {
    type: 'wifi' as QRType,
    badge: 'Connect Without Passwords',
    title: 'Free WiFi QR Code Generator for Guests',
    subtitle: 'Create a free WiFi QR code for your network name and password. Guests can scan it to join your home, café, office, or rental Wi-Fi network on compatible iPhone and Android devices.',
    benefits: [
      'Let guests scan a QR code instead of manually typing a Wi-Fi password on supported phones',
      'Encode supported Wi-Fi network security settings, including personal WPA/WPA2, WEP, and open networks',
      'Option to support hidden SSIDs (non-broadcasted networks)',
      'Wi-Fi details are encoded in the QR code and are not sent to our servers for QR generation'
    ],
    faqs: [
      { q: 'Do guests need an app to scan the Wi-Fi code?', a: 'Many recent iPhone and Android devices recognize Wi-Fi QR codes in the camera or QR scanner. Scan the code, review the network name, and follow the device prompt to connect. Support varies by device and operating system.' },
      { q: 'Is it safe to generate my Wi-Fi QR code here?', a: 'QR generation takes place in your browser. The Wi-Fi details entered for generation are not sent to our servers.' },
      { q: 'What happens if I change my Wi-Fi password in the future?', a: 'Static Wi-Fi QR codes contain the exact password you entered. If you change your router password, generate and print a new code.' },
      { q: 'How do I make a WiFi QR code for free?', a: 'Enter your Wi-Fi network name (SSID), select its security type, add the password if needed, and generate the code. Test it with a compatible phone before sharing it.' },
      { q: 'Can I print a WiFi QR code for guests?', a: 'Yes. Download the QR code and place it where guests can scan it, such as a reception desk or guest information card. Remember that anyone who can scan it may be able to access the encoded Wi-Fi credentials.' },
      { q: 'How can I create a QR code to connect to Wi-Fi?', a: 'Enter the network name (SSID), choose its security type, and add the current Wi-Fi password when required. Generate the QR code, then scan it with a compatible phone to check that it offers the correct network before printing.' },
      { q: 'Can I share a Wi-Fi password using a QR code?', a: 'Yes. A Wi-Fi QR code can store the network name and password so supported phones can offer to join without manual typing. Treat the printed QR code like the password itself: anyone who can scan it may be able to read or use those credentials.' },
      { q: 'Should I use my main Wi-Fi network for a café or rental QR code?', a: 'If your router supports a separate guest network, use its network name and password for a public QR code instead of sharing access to your main network. Check the guest-network isolation settings on your router, and test the code with a guest phone before displaying it.' },
      { q: 'Why is my Wi-Fi QR code not connecting on a phone?', a: 'First check that the network name (SSID), security setting, and password match the router exactly, including uppercase letters and spaces. Generate a new code after correcting any detail, then test it with a compatible phone near the Wi-Fi network. Some devices or camera apps do not support joining Wi-Fi from a QR scan; on those devices, enter the network details manually.' }
    ]
  },
  whatsapp: {
    type: 'whatsapp' as QRType,
    badge: 'Direct Click-to-Chat',
    title: 'Free WhatsApp QR Code Generator for Direct Chat',
    subtitle: 'Create a free WhatsApp QR code for your phone number, with an optional pre-filled message. Let customers scan your code to open a WhatsApp chat from flyers, menus, business cards, or packaging.',
    benefits: [
      'Share a WhatsApp click-to-chat link through a scannable QR code',
      'Add an optional pre-filled message that visitors can edit before sending',
      'Use your WhatsApp number in international format, including its country calling code',
      'Embed official WhatsApp logo inside the QR code with one click'
    ],
    faqs: [
      { q: 'How does WhatsApp QR code routing work?', a: 'The QR code contains a wa.me link for the phone number you enter. Scanning opens the chat in WhatsApp when available, or a compatible browser flow. The visitor must choose to send any message.' },
      { q: 'Do I need to include the country code?', a: 'Yes. Enter the country calling code and phone number in international format. WhatsApp wa.me links use digits only, without a leading plus sign, spaces, brackets, or dashes.' },
      { q: 'Can users edit the pre-filled message before sending?', a: 'Yes. The pre-filled message appears in their text box, and they can modify it before choosing to send.' },
      { q: 'How do I create a WhatsApp QR code for free?', a: 'Enter your WhatsApp phone number with the country code, optionally add a message, generate the QR code, and scan-test it before downloading or printing.' },
      { q: 'Does scanning a WhatsApp QR code send a message automatically?', a: 'No. Scanning opens the WhatsApp chat or a compatible link flow. The visitor decides whether to send the message.' },
      { q: 'What should I check before printing a WhatsApp QR code?', a: 'Scan the finished code with another phone. Confirm that it opens the intended business number, the optional message reads correctly, and the customer can edit it before sending. Test again after adding a logo or changing colors, and keep a readable size and contrast on printed materials.' },
      { q: 'Can I make a free WhatsApp QR code for customer support?', a: 'Yes. Enter your business WhatsApp number in international format, optionally add a pre-filled question, and generate a static QR code. Put it on a sign, receipt, or business card and scan-test the link before sharing it.' },
      { q: 'Will a WhatsApp QR code work without a QR Genius subscription?', a: 'The static QR code stores a wa.me link directly and does not rely on a QR Genius redirect subscription. The destination still depends on WhatsApp and the phone number remaining available.' },
      { q: 'Why does my WhatsApp QR code not open the intended chat?', a: 'Check that the phone number includes the correct country calling code and digits only, with no plus sign, spaces, or leading international dialing prefix. Generate the QR code again after correcting the number, then scan-test it on another phone. The destination also depends on the number being available on WhatsApp and the device supporting the WhatsApp link.' }
    ]
  },
  business: {
    type: 'vcard' as QRType,
    badge: 'Digital Business Card',
    title: 'Free Business Card QR Code Generator (vCard)',
    subtitle: 'Create a free vCard QR code for a business card, name card, or visiting card. Add your name, company, phone number, email, and website to make a scannable contact card that people can save on compatible phones.',
    benefits: [
      'Add a QR code contact card to a printed name card, visiting card, or digital business card',
      'Stores full contact profiles: Name, Job Title, Company, Phone, Email, Address & Notes',
      'Uses the vCard 3.0 format supported by many smartphone contact apps',
      'Ideal for conferences, badges, email signatures, and resume portfolios',
      'For networking events: add your role and company so new contacts can save your details after a conversation',
      'For service businesses: include a public work phone and email, then test the saved contact on a second phone before printing',
      'For freelancers: put the QR code on your portfolio or business card and update the printed code whenever your contact details change'
    ],
    faqs: [
      { q: 'How does vCard scanning work on smartphones?', a: 'On a compatible iPhone or Android phone, scanning may show a contact preview or an option to add the details to contacts; the exact behavior depends on the camera, scanner, and contact app. If the phone only displays text, try its built-in QR scanner or a contact app that supports vCard.' },
      { q: 'Is there a limit on how many people can scan my vCard QR?', a: 'The QR code itself does not impose a scan counter. Successful scanning depends on the printed or displayed code and the device used.' },
      { q: 'Can I add my company logo to the center of the vCard QR?', a: 'Yes. Open our Full Studio designer to upload your company logo and adjust custom colors. Scan-test the finished QR code before printing.' },
      { q: 'How do I create a vCard QR code for my business card?', a: 'Enter your name and the work contact details you want to share, such as phone, email, company and website. Generate the vCard QR code, then scan it with a second phone and confirm the contact preview before downloading the image. Add the QR image to your business card, and test a printed proof before distributing it.' },
      { q: 'Can I update my contact details after printing?', a: 'A static vCard QR code stores the contact details in the code itself. If your phone number or email changes, generate and print a new QR code.' },
      { q: 'Can I make a QR code for a name card or visiting card?', a: 'Yes. A name card, visiting card, and business card can all use a vCard QR code. Enter your contact details, generate the code, and place the downloaded image on your card design. Test the printed code with a phone before sharing it.' },
      { q: 'Does a vCard QR code need internet access to scan?', a: 'The contact details are stored inside the static QR code, so reading those details does not require a QR Genius redirect or internet connection. The phone still needs a compatible QR scanner or contacts app to offer to save the contact.' },
      { q: 'What should I check before printing my vCard QR?', a: 'Enter only the contact details you want anyone scanning the card to see. Scan the final code with another phone, check the name, company, phone and email in the contact preview, and try saving the contact. If you later change those details, create a new static code before reprinting.' },
      { q: 'Should I use a vCard QR code or a website URL on my business card?', a: 'Choose a vCard QR code when you want compatible phones to offer to save your contact details directly. Choose a URL QR code when you want people to visit a portfolio, booking page, or contact page that you can update later. A static vCard stores the contact details in the QR itself, so changes require a new code.' }
    ]
  }
};


const TOOL_CONFIGS_AR: typeof TOOL_CONFIGS = {
  url: {
    type: 'url', badge: 'أداة المواقع الرسمية', title: 'مولّد رمز QR مجاني لرابط الموقع',
    subtitle: 'حوّل أي موقع أو صفحة هبوط أو مدونة أو متجر إلكتروني إلى رمز QR ثابت يحتوي على الرابط مباشرةً، مع إمكانية تخصيص الألوان وإضافة الشعار.',
    benefits: ['يفتح أي عنوان ويب مباشرةً دون روابط تحويل وسيطة', 'متوافق مع Google Analytics ومعلمات تتبع حملات UTM', 'تنزيل SVG متجهي قابل للتكبير للطباعة واللافتات والتغليف', 'لا يعتمد الرمز الثابت على خدمة تحويل أو اشتراك لإعادة توجيه الرابط'],
    faqs: [
      { q: 'هل تنتهي صلاحية رموز QR الخاصة بروابط المواقع؟', a: 'لا. ينشئ QR GENIUS رموزاً ثابتة تتضمن عنوان موقعك مباشرةً. سيعمل الرمز ما دام موقعك متاحاً على الإنترنت.' },
      { q: 'هل يمكن إضافة معلمات تتبع UTM إلى الرابط؟', a: 'نعم، أضف معلمات UTM إلى الرابط مباشرةً في حقل الإدخال قبل إنشاء الرمز.' },
      { q: 'ما أفضل صيغة لطباعة الرمز على المنشورات؟', a: 'نوصي بصيغة SVG المتجهة أو صورة PNG فائقة الدقة 2048 بكسل للحصول على طباعة واضحة.' },
      { q: 'هل يمكن تغيير الرابط بعد طباعة رمز QR؟', a: 'الرمز الثابت يحفظ عنوان URL الأصلي داخله، لذلك لا يمكنك تغيير العنوان المخزّن بعد الطباعة. إذا تغيّر العنوان، اطبع رمزاً جديداً، أو استخدم مسبقاً رابطاً تملكه وتتحكم في وجهته.' },
      { q: 'كيف أختبر الرمز قبل الطباعة؟', a: 'أدخل رابط HTTPS كاملاً وامسح الرمز النهائي بهاتف. تحقق من فتح الصفحة المقصودة على الهاتف دون خطأ أو طلب تسجيل دخول غير متوقع، ثم جرّبه بالحجم والألوان التي ستطبعها.' }
    ]
  },
  wifi: {
    type: 'wifi', badge: 'اتصل دون كتابة كلمة المرور', title: 'مولّد رمز QR لشبكة Wi-Fi',
    subtitle: 'أنشئ رمز Wi-Fi يتيح لضيوفك الاتصال بسهولة في المنزل أو المقهى أو المكتب. يعمل مع أجهزة iPhone وAndroid دون الحاجة إلى كتابة كلمة المرور.',
    benefits: ['يمسح الضيف الرمز بكاميرا الهاتف ثم يختار الاتصال بالشبكة', 'يدعم إعدادات WPA/WPA2 وWEP والشبكات المفتوحة؛ وقد تختلف إمكانية الاتصال بشبكات WPA3 حسب الهاتف وإعدادات الشبكة', 'يدعم خيار الشبكات المخفية التي لا تبث اسمها', 'تُضمّن بيانات Wi-Fi في الرمز ولا تُرسل إلى خوادمنا أثناء إنشاء الرمز'],
    faqs: [
      { q: 'هل يحتاج الضيوف إلى تطبيق لمسح رمز Wi-Fi؟', a: 'تتعرف أجهزة iPhone وAndroid الحديثة في الغالب على رموز Wi-Fi بالكاميرا أو ماسح QR. امسح الرمز وتحقق من اسم الشبكة ثم اتبع تعليمات الاتصال؛ وقد يختلف الدعم حسب الجهاز والنظام.' },
      { q: 'هل إنشاء رمز Wi-Fi هنا آمن؟', a: 'تتم معالجة بيانات الشبكة محلياً داخل متصفحك، ولا تُرسل إلى خوادمنا لإنشاء الرمز.' },
      { q: 'ماذا أفعل إذا غيّرت كلمة مرور الشبكة؟', a: 'يتضمن الرمز الثابت كلمة المرور القديمة؛ أنشئ رمزاً جديداً باستخدام كلمة المرور المحدّثة ثم اطبعه.' },
      { q: 'هل أستخدم شبكة Wi-Fi الرئيسية في المقهى أو مكان الإقامة؟', a: 'إذا كان جهاز التوجيه يدعم شبكة ضيوف منفصلة، فالأفضل إنشاء الرمز باسم شبكة الضيوف وكلمة مرورها بدلاً من مشاركة الشبكة الرئيسية. راجع إعدادات عزل الضيوف في جهاز التوجيه، واختبر الرمز بهاتف قبل عرضه.' }
    ]
  },
  whatsapp: {
    type: 'whatsapp', badge: 'محادثة مباشرة بنقرة', title: 'مولّد رمز QR لمحادثة واتساب مباشرة',
    subtitle: 'أنشئ رمز واتساب يفتح محادثة مباشرة مع رسالة ترحيب جاهزة. مناسب لخدمة العملاء والمنشورات وعلب المنتجات والقوائم.',
    benefits: ['يفتح للعملاء محادثة مباشرة في واتساب عند مسح الرمز', 'أضف رسالة ترحيب مسبقة لتسهيل استقبال الاستفسارات', 'يعمل دولياً مع أرقام الهواتف من مختلف البلدان', 'أضف شعار واتساب الرسمي داخل رمز QR بنقرة واحدة'],
    faqs: [
      { q: 'كيف يعمل رمز QR الخاص بواتساب؟', a: 'يحتوي الرمز على رابط wa.me للرقم الذي تدخله. يفتح المسح محادثة واتساب عند توفر التطبيق أو مسارًا مناسبًا في المتصفح، ولا تُرسل الرسالة إلا بعد تأكيد المستخدم.' },
      { q: 'هل يجب تضمين رمز الدولة؟', a: 'نعم. استخدم رمز الدولة والرقم بالصيغة الدولية. روابط wa.me تتطلب أرقامًا فقط دون علامة + أو مسافات أو أقواس أو شرطات.' },
      { q: 'هل يستطيع المستخدم تعديل الرسالة قبل إرسالها؟', a: 'نعم. تظهر الرسالة الجاهزة في مربع الكتابة ويمكن للمستخدم تعديلها قبل الإرسال.' },
      { q: 'كيف أنشئ رمز QR لواتساب مجاناً؟', a: 'أدخل رقم واتساب مع رمز الدولة، وأضف رسالة اختيارية، ثم أنشئ رمز QR وامسحه بهاتفك للتأكد من فتح المحادثة الصحيحة قبل تنزيله أو طباعته.' },
      { q: 'ما الذي أتحقق منه قبل طباعة رمز واتساب؟', a: 'امسح الرمز النهائي بهاتف آخر وتأكد من فتح رقم النشاط التجاري الصحيح وظهور الرسالة الاختيارية بشكل سليم وإمكانية تعديلها قبل الإرسال. أعد الاختبار بعد إضافة شعار أو تغيير الألوان، واحرص على وضوح الحجم والتباين عند الطباعة.' }
    ]
  },
  business: {
    type: 'vcard', badge: 'بطاقة عمل رقمية', title: 'مولّد رمز QR لبطاقة العمل الرقمية vCard',
    subtitle: 'حوّل بيانات الاتصال إلى بطاقة عمل رقمية. عند مسح الرمز بهاتف متوافق، يمكن عرض الاسم والهاتف والبريد والشركة والموقع ثم حفظها في جهات الاتصال.',
    benefits: ['شارك بيانات الاتصال دون الحاجة إلى كتابتها يدوياً', 'احفظ الاسم والمسمى الوظيفي والشركة والهاتف والبريد والعنوان والملاحظات', 'تستخدم صيغة vCard 3.0 التي تدعمها تطبيقات جهات اتصال عديدة', 'مثالية للمؤتمرات وبطاقات التعريف وتوقيعات البريد والسير الذاتية'],
    faqs: [
      { q: 'كيف يعمل مسح vCard على الهواتف؟', a: 'يمكن للهواتف وتطبيقات جهات الاتصال المتوافقة قراءة بيانات vCard وعرض خيار حفظ جهة اتصال جديدة. تختلف طريقة العرض والحقول المدعومة حسب الجهاز.' },
      { q: 'هل يوجد حد لعدد مرات مسح بطاقة vCard؟', a: 'لا يحتوي رمز vCard الثابت على عدّاد للمسح؛ ويعتمد نجاح المسح على وضوح الرمز والجهاز المستخدم.' },
      { q: 'هل يمكن إضافة شعار الشركة إلى وسط الرمز؟', a: 'نعم. افتح استوديو QR الكامل لرفع شعار الشركة وتخصيص الألوان.' },
      { q: 'هل يمكن تغيير بيانات بطاقة العمل بعد طباعة رمز QR؟', a: 'رمز vCard الثابت يحتوي على بيانات الاتصال وقت إنشائه. إذا تغيّر رقم الهاتف أو البريد الإلكتروني، أنشئ رمزاً جديداً واطبعه بدلاً من القديم.' },
      { q: 'ماذا أتحقق منه قبل طباعة بطاقة العمل؟', a: 'أدخل فقط البيانات التي تريد إتاحتها لمن يمسح البطاقة. امسح الرمز النهائي بهاتف آخر، وتحقق من الاسم والشركة والهاتف والبريد في معاينة جهة الاتصال، ثم جرّب حفظها. إذا تغيّرت البيانات لاحقاً فأنشئ رمزاً ثابتاً جديداً قبل إعادة الطباعة.' }
    ]
  }
};


const TOOL_CONFIGS_FR: typeof TOOL_CONFIGS = {
url:{type:'url',badge:'Outil gratuit en ligne',title:'Générateur de QR Code pour URL',subtitle:'Transformez l’adresse d’un site web ou d’une boutique en QR code statique, avec couleurs et logo personnalisables.',benefits:['Ouvrez directement toute adresse web','Compatible avec Google Analytics et les paramètres UTM','Téléchargez un SVG vectoriel pour une impression nette','Le QR code statique contient directement votre adresse web, sans dépendre d’un abonnement de redirection QR Genius'],faqs:[{q:'Les QR codes URL expirent-ils ?',a:'Non. Le code statique contient directement votre adresse web et fonctionne tant que le site reste en ligne.'},{q:'Puis-je ajouter des paramètres UTM ?',a:'Oui, ajoutez-les directement à l’adresse dans le champ URL.'},{q:'Quel format choisir pour imprimer ?',a:'Le SVG vectoriel ou le PNG 2048 px offre une impression nette.'},{q:'Puis-je modifier le lien après impression ?',a:'Le QR code statique conserve l’URL d’origine. Pour changer cette adresse, créez un nouveau code ; vous pouvez aussi utiliser dès le départ une URL que vous contrôlez et modifier sa redirection.'},{q:'Que tester avant d’imprimer ?',a:'Saisissez l’adresse HTTPS complète, scannez le code final sur un téléphone et vérifiez que la bonne page mobile s’ouvre sans erreur ni connexion inattendue. Testez aussi la taille et les couleurs prévues pour l’impression.'}]},
wifi:{type:'wifi',badge:'Connexion sans mot de passe',title:'Générateur de QR Code Wi-Fi',subtitle:'Créez un QR code Wi-Fi pour vos invités, votre café ou votre bureau. Compatible avec iPhone et Android.',benefits:['Les invités scannent le code pour rejoindre le réseau','Prend en charge les réseaux personnels WPA/WPA2, WEP et ouverts ; la compatibilité WPA3 dépend du téléphone et du réseau','Compatible avec les réseaux masqués','Les données Wi-Fi sont intégrées au code et ne sont pas envoyées à nos serveurs pendant la génération'],faqs:[{q:'Faut-il une application pour scanner ?',a:'De nombreux appareils récents reconnaissent les QR codes Wi-Fi avec leur appareil photo ou scanner QR. La prise en charge varie selon le modèle et le système.'},{q:'La création est-elle sécurisée ?',a:'Les données Wi-Fi sont traitées localement dans votre navigateur et ne sont pas envoyées à nos serveurs pour la génération.'},{q:'Que faire si je change le mot de passe ?',a:'Créez un nouveau QR code avec le mot de passe mis à jour.'},{q:'Quel réseau afficher dans un café ou une location ?',a:'Si votre routeur le permet, créez un réseau invité distinct et utilisez ses identifiants plutôt que ceux du réseau principal. Vérifiez les paramètres d’isolation des invités et testez le QR code avant de l’afficher.'}]},
whatsapp:{type:'whatsapp',badge:'Discussion directe',title:'Générateur de QR Code WhatsApp',subtitle:'Créez un QR code qui ouvre une discussion WhatsApp avec un message prérempli. Idéal pour le service client et les supports publicitaires.',benefits:['Ouvrez une conversation WhatsApp après le scan','Préremplissez un message d’accueil','Fonctionne avec les numéros internationaux','Ajoutez le logo WhatsApp au QR code'],faqs:[{q:'Comment fonctionne le QR code WhatsApp ?',a:'Il contient un lien wa.me vers le numéro indiqué. L’ouverture dépend de WhatsApp ou du navigateur ; aucun message n’est envoyé automatiquement.'},{q:'Dois-je inclure l’indicatif du pays ?',a:'Oui, saisissez le numéro au format international sans tirets ni espaces.'},{q:'Le message peut-il être modifié ?',a:'Oui, le message prérempli peut être modifié avant son envoi.'},{q:'Que vérifier avant d’imprimer le QR code WhatsApp ?',a:'Scannez le code final avec un autre téléphone. Vérifiez le numéro professionnel, le texte prérempli et la possibilité de le modifier avant envoi. Refaites le test après avoir ajouté un logo ou changé les couleurs, avec une taille et un contraste lisibles.'}]},
business:{type:'vcard',badge:'Carte de visite numérique',title:'Générateur de QR Code vCard',subtitle:'Transformez vos coordonnées en carte de visite numérique enregistrable dans les contacts après le scan.',benefits:['Évitez les cartes papier et la saisie manuelle','Enregistrez nom, poste, entreprise, téléphone et e-mail','Format vCard 3.0 reconnu par de nombreuses applications de contacts','Idéal pour conférences et signatures e-mail'],faqs:[{q:'Comment fonctionne une vCard ?',a:'Un téléphone ou une application de contacts compatible peut proposer d’enregistrer la vCard. Les champs pris en charge varient selon l’appareil.'},{q:'Existe-t-il une limite de scans ?',a:'Le QR code statique ne comporte pas de compteur de scans ; la lecture dépend de la qualité du code et de l’appareil.'},{q:'Puis-je ajouter un logo ?',a:'Oui, utilisez le studio complet pour ajouter votre logo et personnaliser les couleurs.'},{q:'Que vérifier avant d’imprimer ma carte de visite ?',a:'N’indiquez que les coordonnées que vous souhaitez rendre publiques. Scannez le QR code final avec un autre téléphone, vérifiez le nom, l’entreprise, le numéro et l’e-mail, puis essayez d’enregistrer le contact. Si ces données changent, générez un nouveau code statique avant de réimprimer.'}]}
};
const TOOL_CONFIGS_ES: typeof TOOL_CONFIGS = {
url:{type:'url',badge:'Herramienta gratuita en línea',title:'Generador de códigos QR para URL',subtitle:'Convierte la dirección de un sitio web o una tienda en un código QR estático, con colores y logotipo personalizados.',benefits:['Abre cualquier dirección web directamente','Compatible con Google Analytics y parámetros UTM','Descarga SVG vectorial para imprimir con nitidez','El código QR estático contiene directamente tu dirección web y no depende de una suscripción de redirección de QR Genius'],faqs:[{q:'¿Caducan los códigos QR de URL?',a:'No. El código estático contiene tu dirección web y funciona mientras el sitio esté en línea.'},{q:'¿Puedo añadir parámetros UTM?',a:'Sí, añádelos directamente a la dirección en el campo URL.'},{q:'¿Qué formato es mejor para imprimir?',a:'SVG vectorial o PNG de 2048 px ofrecen una impresión nítida.'},{q:'¿Puedo cambiar el enlace después de imprimir?',a:'El QR estático guarda la URL original. Para cambiar esa dirección, crea e imprime otro código; también puedes usar desde el principio una URL propia y controlar a dónde redirige.'},{q:'¿Qué debo probar antes de imprimir?',a:'Introduce la dirección HTTPS completa, escanea el código final con un teléfono y comprueba que abre la página móvil correcta sin errores ni inicio de sesión inesperado. Prueba también el tamaño y los colores de impresión.'}]},
wifi:{type:'wifi',badge:'Conexión sin contraseña',title:'Generador de códigos QR para Wi-Fi',subtitle:'Crea un código QR Wi-Fi para invitados, cafeterías u oficinas. Compatible con iPhone y Android.',benefits:['Los invitados escanean el código para conectarse','Admite redes personales WPA/WPA2, WEP y abiertas; la compatibilidad con WPA3 depende del teléfono y la red','Admite redes ocultas','Los datos Wi-Fi se incluyen en el QR y no se envían a nuestros servidores durante la generación'],faqs:[{q:'¿Se necesita una aplicación para escanear?',a:'Muchos dispositivos recientes reconocen códigos QR Wi-Fi con la cámara o el escáner QR. La compatibilidad varía según el dispositivo y el sistema.'},{q:'¿Es seguro crear el código?',a:'Los datos Wi-Fi se procesan localmente en el navegador y no se envían a nuestros servidores para generar el código.'},{q:'¿Qué hago si cambio la contraseña?',a:'Genera un nuevo código QR con la contraseña actualizada.'},{q:'¿Qué red debo compartir en una cafetería o alojamiento?',a:'Si tu router lo permite, crea una red de invitados independiente y usa sus datos en lugar de los de la red principal. Revisa la configuración de aislamiento de invitados y prueba el código antes de mostrarlo.'}]},
whatsapp:{type:'whatsapp',badge:'Chat directo',title:'Generador de códigos QR para WhatsApp',subtitle:'Crea un código QR que abre un chat de WhatsApp con un mensaje preparado. Ideal para atención al cliente y publicidad.',benefits:['Abre una conversación de WhatsApp al escanear','Prepara un mensaje de bienvenida','Funciona con números internacionales','Añade el logotipo de WhatsApp al código'],faqs:[{q:'¿Cómo funciona el QR de WhatsApp?',a:'Contiene un enlace wa.me para el número indicado. La apertura depende de WhatsApp o del navegador; no se envía ningún mensaje automáticamente.'},{q:'¿Debo incluir el prefijo del país?',a:'Sí, introduce el número internacional completo sin guiones ni espacios.'},{q:'¿Se puede editar el mensaje?',a:'Sí, el mensaje preparado puede modificarse antes de enviarlo.'},{q:'¿Qué debo comprobar antes de imprimir el QR de WhatsApp?',a:'Escanea el código final con otro teléfono. Comprueba el número del negocio, el texto preparado y que se pueda editar antes de enviarlo. Repite la prueba tras añadir un logotipo o cambiar los colores y usa un tamaño y contraste legibles.'}]},
business:{type:'vcard',badge:'Tarjeta de visita digital',title:'Generador de códigos QR para vCard',subtitle:'Convierte tus datos de contacto en una tarjeta digital que se puede guardar en la agenda al escanear.',benefits:['Evita las tarjetas de papel y la introducción manual','Guarda nombre, cargo, empresa, teléfono y correo','Formato vCard 3.0 reconocido por muchas aplicaciones de contactos','Ideal para eventos y firmas de correo'],faqs:[{q:'¿Cómo funciona una vCard?',a:'Un teléfono o una aplicación de contactos compatible puede ofrecer guardar la vCard. Los campos admitidos dependen del dispositivo.'},{q:'¿Hay un límite de escaneos?',a:'El código QR estático no incluye un contador de escaneos; la lectura depende de la calidad del código y del dispositivo.'},{q:'¿Puedo añadir un logotipo?',a:'Sí, abre el estudio completo para añadir tu logotipo y personalizar los colores.'},{q:'¿Qué debo comprobar antes de imprimir mi tarjeta?',a:'Incluye solo los datos que quieras compartir con quien escanee el código. Pruébalo con otro teléfono, revisa el nombre, la empresa, el número y el correo en la vista previa e intenta guardar el contacto. Si cambian los datos, genera un código estático nuevo antes de reimprimir.'}]}
};
export const toolsByLanguage = { en: TOOL_CONFIGS, ar: TOOL_CONFIGS_AR, fr: TOOL_CONFIGS_FR, es: TOOL_CONFIGS_ES };
