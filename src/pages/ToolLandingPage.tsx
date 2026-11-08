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
import { getToolShareUrl } from '../utils/toolShare';
import { trackEvent } from '../utils/analytics';

interface ToolLandingPageProps {
  tool: 'url' | 'wifi' | 'whatsapp' | 'business';
  lang: Language;
  onNavigate: (page: PageId, type?: QRType) => void;
  onHistoryUpdated: () => void;
}

function createEmptyToolPayload(tool: keyof typeof TOOL_CONFIGS) {
  switch (tool) {
    case 'url':
      return '';
    case 'wifi':
      return { ssid: '', password: '', encryption: 'WPA' as const, hidden: false };
    case 'whatsapp':
      return { countryCode: '', phoneNumber: '', message: '' };
    case 'business':
      return {
        firstName: '',
        lastName: '',
        company: '',
        jobTitle: '',
        phone: '',
        workPhone: '',
        email: '',
        website: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        notes: ''
      };
  }
}

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
      'Static QR codes contain your URL directly and do not depend on a QR Genius redirect subscription'
    ],
    faqs: [
      { q: 'Do URL QR codes generated here ever expire?', a: 'QR GENIUS creates a static QR code containing your web address. The code itself has no built-in expiry, but it will only open the page while that address and website remain available.' },
      { q: 'Can I include UTM tracking parameters in the URL?', a: 'Yes! Simply append your UTM parameters (e.g. ?utm_source=flyer&utm_medium=qr) directly into the URL input field.' },
      { q: 'What is the best format to print on physical flyers?', a: 'Use SVG for a scalable vector file, or a high-resolution PNG for print. Test the finished code at its intended printed size before distributing it.' },
      { q: 'How do I turn a website link into a QR code?', a: 'Paste the full website address into the URL field, generate the QR code, scan it with your phone to verify the destination, and download the result.' },
      { q: 'Can I change the website address after printing?', a: 'A static QR code stores the original link. To point it to a different URL, create and print a new code, or manage the destination on a URL you control.' }
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
      { q: 'Can I share a Wi-Fi password using a QR code?', a: 'Yes. A Wi-Fi QR code can store the network name and password so supported phones can offer to join without manual typing. Treat the printed QR code like the password itself: anyone who can scan it may be able to read or use those credentials.' }
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
      { q: 'Can I make a free WhatsApp QR code for customer support?', a: 'Yes. Enter your business WhatsApp number in international format, optionally add a pre-filled question, and generate a static QR code. Put it on a sign, receipt, or business card and scan-test the link before sharing it.' },
      { q: 'Will a WhatsApp QR code work without a QR Genius subscription?', a: 'The static QR code stores a wa.me link directly and does not rely on a QR Genius redirect subscription. The destination still depends on WhatsApp and the phone number remaining available.' }
    ]
  },
  business: {
    type: 'vcard' as QRType,
    badge: 'Digital Business Card',
    title: 'Free Business Card QR Code Generator (vCard)',
    subtitle: 'Create a free QR code for your business card using the vCard format. Add your name, company, phone number, email, and website so people can scan your card and save your contact details.',
    benefits: [
      'Share your contact details from printed business cards, badges, and digital profiles',
      'Stores full contact profiles: Name, Job Title, Company, Phone, Email, Address & Notes',
      'Uses the vCard 3.0 format supported by many smartphone contact apps',
      'Ideal for conferences, badges, email signatures, and resume portfolios'
    ],
    faqs: [
      { q: 'How does vCard scanning work on smartphones?', a: 'Compatible phones and contact apps can recognize the vCard data and offer to create a new contact. The exact prompt and supported fields depend on the device.' },
      { q: 'Is there a limit on how many people can scan my vCard QR?', a: 'The QR code itself does not impose a scan counter. Successful scanning depends on the printed or displayed code and the device used.' },
      { q: 'Can I add my company logo to the center of the vCard QR?', a: 'Yes. Open our Full Studio designer to upload your company logo and adjust custom colors. Scan-test the finished QR code before printing.' },
      { q: 'How do I make a QR code for my business card?', a: 'Enter your contact details, generate the vCard QR code, scan it with a phone to check the information, and download the code for your business card design.' },
      { q: 'Can I update my contact details after printing?', a: 'A static vCard QR code stores the contact details in the code itself. If your phone number or email changes, generate and print a new QR code.' },
      { q: 'Can I make a QR code for a name card or visiting card?', a: 'Yes. A name card, visiting card, and business card can all use a vCard QR code. Enter your contact details, generate the code, and place the downloaded image on your card design. Test the printed code with a phone before sharing it.' },
      { q: 'Does a vCard QR code need internet access to scan?', a: 'The contact details are stored inside the static QR code, so reading those details does not require a QR Genius redirect or internet connection. The phone still needs a compatible QR scanner or contacts app to offer to save the contact.' }
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
      { q: 'ما أفضل صيغة لطباعة الرمز على المنشورات؟', a: 'نوصي بصيغة SVG المتجهة أو صورة PNG فائقة الدقة 2048 بكسل للحصول على طباعة واضحة.' }
    ]
  },
  wifi: {
    type: 'wifi', badge: 'اتصل دون كتابة كلمة المرور', title: 'مولّد رمز QR لشبكة Wi-Fi',
    subtitle: 'أنشئ رمز Wi-Fi يتيح لضيوفك الاتصال بسهولة في المنزل أو المقهى أو المكتب. يعمل مع أجهزة iPhone وAndroid دون الحاجة إلى كتابة كلمة المرور.',
    benefits: ['يمسح الضيف الرمز بكاميرا الهاتف ثم يختار الاتصال بالشبكة', 'يدعم أنواع الحماية WPA وWPA2 وWPA3 وWEP والشبكات المفتوحة', 'يدعم خيار الشبكات المخفية التي لا تبث اسمها', 'تُضمّن بيانات Wi-Fi في الرمز ولا تُرسل إلى خوادمنا أثناء إنشاء الرمز'],
    faqs: [
      { q: 'هل يحتاج الضيوف إلى تطبيق لمسح رمز Wi-Fi؟', a: 'تتعرف أجهزة iPhone وAndroid الحديثة في الغالب على رموز Wi-Fi بالكاميرا أو ماسح QR. امسح الرمز وتحقق من اسم الشبكة ثم اتبع تعليمات الاتصال؛ وقد يختلف الدعم حسب الجهاز والنظام.' },
      { q: 'هل إنشاء رمز Wi-Fi هنا آمن؟', a: 'تتم معالجة بيانات الشبكة محلياً داخل متصفحك، ولا تُرسل إلى خوادمنا لإنشاء الرمز.' },
      { q: 'ماذا أفعل إذا غيّرت كلمة مرور الشبكة؟', a: 'يتضمن الرمز الثابت كلمة المرور القديمة؛ أنشئ رمزاً جديداً باستخدام كلمة المرور المحدّثة ثم اطبعه.' }
    ]
  },
  whatsapp: {
    type: 'whatsapp', badge: 'محادثة مباشرة بنقرة', title: 'مولّد رمز QR لمحادثة واتساب مباشرة',
    subtitle: 'أنشئ رمز واتساب يفتح محادثة مباشرة مع رسالة ترحيب جاهزة. مناسب لخدمة العملاء والمنشورات وعلب المنتجات والقوائم.',
    benefits: ['يفتح للعملاء محادثة مباشرة في واتساب عند مسح الرمز', 'أضف رسالة ترحيب مسبقة لتسهيل استقبال الاستفسارات', 'يعمل دولياً مع أرقام الهواتف من مختلف البلدان', 'أضف شعار واتساب الرسمي داخل رمز QR بنقرة واحدة'],
    faqs: [
      { q: 'كيف يعمل رمز QR الخاص بواتساب؟', a: 'يحتوي الرمز على رابط wa.me للرقم الذي تدخله. يفتح المسح محادثة واتساب عند توفر التطبيق أو مسارًا مناسبًا في المتصفح، ولا تُرسل الرسالة إلا بعد تأكيد المستخدم.' },
      { q: 'هل يجب تضمين رمز الدولة؟', a: 'نعم. استخدم رمز الدولة والرقم بالصيغة الدولية. روابط wa.me تتطلب أرقامًا فقط دون علامة + أو مسافات أو أقواس أو شرطات.' },
      { q: 'هل يستطيع المستخدم تعديل الرسالة قبل إرسالها؟', a: 'نعم. تظهر الرسالة الجاهزة في مربع الكتابة ويمكن للمستخدم تعديلها قبل الإرسال.' }
    ]
  },
  business: {
    type: 'vcard', badge: 'بطاقة عمل رقمية', title: 'مولّد رمز QR لبطاقة العمل الرقمية vCard',
    subtitle: 'حوّل بيانات الاتصال إلى بطاقة عمل رقمية. عند مسح الرمز، يمكن حفظ الاسم والهاتف والبريد والشركة والموقع مباشرةً في جهات اتصال الهاتف.',
    benefits: ['استغنِ عن بطاقات العمل الورقية وإدخال بيانات الاتصال يدوياً', 'احفظ الاسم والمسمى الوظيفي والشركة والهاتف والبريد والعنوان والملاحظات', 'صيغة vCard 3.0 متوافقة مع جهات اتصال iOS وGoogle', 'مثالية للمؤتمرات وبطاقات التعريف وتوقيعات البريد والسير الذاتية'],
    faqs: [
      { q: 'كيف يعمل مسح vCard على الهواتف؟', a: 'عند مسح الرمز بكاميرا الهاتف، يظهر خيار إضافة جهة الاتصال مع تعبئة حقول البيانات لتسهيل حفظها.' },
      { q: 'هل يوجد حد لعدد مرات مسح بطاقة vCard؟', a: 'لا يحتوي رمز vCard الثابت على عدّاد للمسح؛ ويعتمد نجاح المسح على وضوح الرمز والجهاز المستخدم.' },
      { q: 'هل يمكن إضافة شعار الشركة إلى وسط الرمز؟', a: 'نعم. افتح استوديو QR الكامل لرفع شعار الشركة وتخصيص الألوان.' }
    ]
  }
};


const TOOL_CONFIGS_FR: typeof TOOL_CONFIGS = {
url:{type:'url',badge:'Outil gratuit en ligne',title:'Générateur de QR Code pour URL',subtitle:'Transformez l’adresse d’un site web ou d’une boutique en QR code statique, avec couleurs et logo personnalisables.',benefits:['Ouvrez directement toute adresse web','Compatible avec Google Analytics et les paramètres UTM','Téléchargez un SVG vectoriel pour une impression nette','Le QR code statique contient directement votre adresse web, sans dépendre d’un abonnement de redirection QR Genius'],faqs:[{q:'Les QR codes URL expirent-ils ?',a:'Non. Le code statique contient directement votre adresse web et fonctionne tant que le site reste en ligne.'},{q:'Puis-je ajouter des paramètres UTM ?',a:'Oui, ajoutez-les directement à l’adresse dans le champ URL.'},{q:'Quel format choisir pour imprimer ?',a:'Le SVG vectoriel ou le PNG 2048 px offre une impression nette.'}]},
wifi:{type:'wifi',badge:'Connexion sans mot de passe',title:'Générateur de QR Code Wi-Fi',subtitle:'Créez un QR code Wi-Fi pour vos invités, votre café ou votre bureau. Compatible avec iPhone et Android.',benefits:['Les invités scannent le code pour rejoindre le réseau','Prend en charge WPA, WPA2, WPA3, WEP et les réseaux ouverts','Compatible avec les réseaux masqués','Les données Wi-Fi sont intégrées au code et ne sont pas envoyées à nos serveurs pendant la génération'],faqs:[{q:'Faut-il une application pour scanner ?',a:'Non. Les appareils récents reconnaissent les QR codes Wi-Fi avec leur appareil photo.'},{q:'La création est-elle sécurisée ?',a:'Les données Wi-Fi sont traitées localement dans votre navigateur et ne sont pas envoyées à nos serveurs pour la génération.'},{q:'Que faire si je change le mot de passe ?',a:'Créez un nouveau QR code avec le mot de passe mis à jour.'}]},
whatsapp:{type:'whatsapp',badge:'Discussion directe',title:'Générateur de QR Code WhatsApp',subtitle:'Créez un QR code qui ouvre une discussion WhatsApp avec un message prérempli. Idéal pour le service client et les supports publicitaires.',benefits:['Ouvrez une conversation WhatsApp après le scan','Préremplissez un message d’accueil','Fonctionne avec les numéros internationaux','Ajoutez le logo WhatsApp au QR code'],faqs:[{q:'Comment fonctionne le QR code WhatsApp ?',a:'Il contient un lien wa.me qui ouvre la conversation avec le numéro indiqué.'},{q:'Dois-je inclure l’indicatif du pays ?',a:'Oui, saisissez le numéro au format international sans tirets ni espaces.'},{q:'Le message peut-il être modifié ?',a:'Oui, le message prérempli peut être modifié avant son envoi.'}]},
business:{type:'vcard',badge:'Carte de visite numérique',title:'Générateur de QR Code vCard',subtitle:'Transformez vos coordonnées en carte de visite numérique enregistrable dans les contacts après le scan.',benefits:['Évitez les cartes papier et la saisie manuelle','Enregistrez nom, poste, entreprise, téléphone et e-mail','Format vCard 3.0 compatible avec iOS et Google','Idéal pour conférences et signatures e-mail'],faqs:[{q:'Comment fonctionne une vCard ?',a:'Le téléphone propose d’ajouter le contact et remplit les champs disponibles.'},{q:'Existe-t-il une limite de scans ?',a:'Le QR code statique ne comporte pas de compteur de scans ; la lecture dépend de la qualité du code et de l’appareil.'},{q:'Puis-je ajouter un logo ?',a:'Oui, utilisez le studio complet pour ajouter votre logo et personnaliser les couleurs.'}]}
};
const TOOL_CONFIGS_ES: typeof TOOL_CONFIGS = {
url:{type:'url',badge:'Herramienta gratuita en línea',title:'Generador de códigos QR para URL',subtitle:'Convierte la dirección de un sitio web o una tienda en un código QR estático, con colores y logotipo personalizados.',benefits:['Abre cualquier dirección web directamente','Compatible con Google Analytics y parámetros UTM','Descarga SVG vectorial para imprimir con nitidez','El código QR estático contiene directamente tu dirección web y no depende de una suscripción de redirección de QR Genius'],faqs:[{q:'¿Caducan los códigos QR de URL?',a:'No. El código estático contiene tu dirección web y funciona mientras el sitio esté en línea.'},{q:'¿Puedo añadir parámetros UTM?',a:'Sí, añádelos directamente a la dirección en el campo URL.'},{q:'¿Qué formato es mejor para imprimir?',a:'SVG vectorial o PNG de 2048 px ofrecen una impresión nítida.'}]},
wifi:{type:'wifi',badge:'Conexión sin contraseña',title:'Generador de códigos QR para Wi-Fi',subtitle:'Crea un código QR Wi-Fi para invitados, cafeterías u oficinas. Compatible con iPhone y Android.',benefits:['Los invitados escanean el código para conectarse','Compatible con WPA, WPA2, WPA3, WEP y redes abiertas','Admite redes ocultas','Los datos Wi-Fi se incluyen en el QR y no se envían a nuestros servidores durante la generación'],faqs:[{q:'¿Se necesita una aplicación para escanear?',a:'No. Los dispositivos modernos reconocen los códigos QR Wi-Fi con la cámara.'},{q:'¿Es seguro crear el código?',a:'Los datos Wi-Fi se procesan localmente en el navegador y no se envían a nuestros servidores para generar el código.'},{q:'¿Qué hago si cambio la contraseña?',a:'Genera un nuevo código QR con la contraseña actualizada.'}]},
whatsapp:{type:'whatsapp',badge:'Chat directo',title:'Generador de códigos QR para WhatsApp',subtitle:'Crea un código QR que abre un chat de WhatsApp con un mensaje preparado. Ideal para atención al cliente y publicidad.',benefits:['Abre una conversación de WhatsApp al escanear','Prepara un mensaje de bienvenida','Funciona con números internacionales','Añade el logotipo de WhatsApp al código'],faqs:[{q:'¿Cómo funciona el QR de WhatsApp?',a:'Contiene un enlace wa.me que abre el chat con el número indicado.'},{q:'¿Debo incluir el prefijo del país?',a:'Sí, introduce el número internacional completo sin guiones ni espacios.'},{q:'¿Se puede editar el mensaje?',a:'Sí, el mensaje preparado puede modificarse antes de enviarlo.'}]},
business:{type:'vcard',badge:'Tarjeta de visita digital',title:'Generador de códigos QR para vCard',subtitle:'Convierte tus datos de contacto en una tarjeta digital que se puede guardar en la agenda al escanear.',benefits:['Evita las tarjetas de papel y la introducción manual','Guarda nombre, cargo, empresa, teléfono y correo','Formato vCard 3.0 compatible con iOS y Google','Ideal para eventos y firmas de correo'],faqs:[{q:'¿Cómo funciona una vCard?',a:'El teléfono ofrece añadir el contacto y completa los campos disponibles.'},{q:'¿Hay un límite de escaneos?',a:'El código QR estático no incluye un contador de escaneos; la lectura depende de la calidad del código y del dispositivo.'},{q:'¿Puedo añadir un logotipo?',a:'Sí, abre el estudio completo para añadir tu logotipo y personalizar los colores.'}]}
};
const TOOL_UI = {
en:{online:'Free Online Tool',customTitle:'Need full custom colors, logos & shapes?',customText:'Open our studio to access all custom options.',studio:'Full Studio',why:'Why Use Our',security:'Client-Side Security Guarantee',securityText:'QR GENIUS processes QR data locally in your browser; payloads are not sent to or logged on our servers.',customize:'Customize in Studio',faqs:'Frequently Asked Questions',sharePrompt:'Know someone who needs a QR code?',shareTool:'Share this free tool',shareCopied:'Tool link copied.',shareManual:'Copy this tool link to share it:',shareLinkLabel:'Shareable tool link'},
ar:{online:'أداة مجانية عبر الإنترنت',customTitle:'هل تريد تخصيص الألوان والشعارات والأشكال؟',customText:'افتح الاستوديو للوصول إلى جميع خيارات التخصيص.',studio:'الاستوديو الكامل',why:'لماذا تستخدم',security:'ضمان الأمان والمعالجة المحلية',securityText:'يعالج QR GENIUS بيانات الرمز محلياً داخل متصفحك ولا يرسلها إلى خوادمه أو يسجلها.',customize:'خصص الرمز في الاستوديو',faqs:'الأسئلة الشائعة',sharePrompt:'هل تعرف شخصاً يحتاج إلى إنشاء رمز QR؟',shareTool:'شارك هذه الأداة المجانية',shareCopied:'تم نسخ رابط الأداة.',shareManual:'انسخ رابط الأداة لمشاركته:',shareLinkLabel:'رابط الأداة للمشاركة'},
fr:{online:'Outil gratuit en ligne',customTitle:'Personnalisez couleurs, logos et formes',customText:'Ouvrez le studio pour accéder à toutes les options.',studio:'Studio complet',why:'Pourquoi utiliser',security:'Protection et traitement local',securityText:'QR GENIUS traite les données localement dans votre navigateur, sans les envoyer ni les enregistrer sur ses serveurs.',customize:'Personnaliser dans le studio',faqs:'Questions fréquentes',sharePrompt:'Vous connaissez quelqu’un qui a besoin d’un QR code ?',shareTool:'Partager cet outil gratuit',shareCopied:'Lien de l’outil copié.',shareManual:'Copiez ce lien pour partager l’outil :',shareLinkLabel:'Lien de partage de l’outil'},
es:{online:'Herramienta gratuita en línea',customTitle:'Personaliza colores, logotipos y formas',customText:'Abre el estudio para acceder a todas las opciones.',studio:'Estudio completo',why:'Por qué usar',security:'Protección y procesamiento local',securityText:'QR GENIUS procesa los datos localmente en tu navegador, sin enviarlos ni guardarlos en sus servidores.',customize:'Personalizar en el estudio',faqs:'Preguntas frecuentes',sharePrompt:'¿Conoces a alguien que necesite un código QR?',shareTool:'Compartir esta herramienta gratis',shareCopied:'Enlace de la herramienta copiado.',shareManual:'Copia este enlace para compartir la herramienta:',shareLinkLabel:'Enlace para compartir la herramienta'}
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
  const [payload, setPayload] = useState<any>(() => createEmptyToolPayload(tool));
  const [shareFeedback, setShareFeedback] = useState<'copied' | 'manual' | null>(null);
  const shareUrl = getToolShareUrl(tool, lang);

  const handleShareTool = async () => {
    setShareFeedback(null);
    trackEvent('tool_share_clicked', { tool, lang });
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title: toolData.title, text: toolData.subtitle, url: shareUrl });
        return;
      }
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareFeedback('copied');
        return;
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') return;
    }
    setShareFeedback('manual');
  };

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
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleShareTool}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                {ui.shareTool}
              </button>
              <span className="text-xs text-slate-600">{ui.sharePrompt}</span>
            </div>
            {shareFeedback === 'copied' && (
              <p className="mt-2 text-sm font-medium text-emerald-700" role="status">{ui.shareCopied}</p>
            )}
            {shareFeedback === 'manual' && (
              <div className="mt-2 max-w-md space-y-1">
                <label htmlFor="tool-share-link" className="block text-xs font-medium text-slate-700">{ui.shareManual}</label>
                <input
                  id="tool-share-link"
                  aria-label={ui.shareLinkLabel}
                  type="text"
                  readOnly
                  value={shareUrl}
                  onFocus={(event) => event.currentTarget.select()}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                />
              </div>
            )}
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
              onClear={() => setPayload(createEmptyToolPayload(tool))}
              onReset={() => setPayload(createEmptyToolPayload(tool))}
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

        {/* Crawlable, localized links to related QR tools */}
        <nav aria-label={lang === 'ar' ? 'أدوات QR ذات صلة' : lang === 'fr' ? 'Outils QR associés' : lang === 'es' ? 'Herramientas QR relacionadas' : 'Related QR code tools'} className="pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            {lang === 'ar' ? 'جرّب أدوات QR أخرى' : lang === 'fr' ? 'Découvrez d’autres outils QR' : lang === 'es' ? 'Prueba otras herramientas QR' : 'Explore more free QR code tools'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(['url', 'wifi', 'whatsapp', 'business'] as const).filter((related) => related !== tool).map((related) => {
              const relatedPage: PageId = related === 'business' ? 'business' : related;
              const path = related === 'business' ? '/tools/business-vcard' : `/tools/${related}`;
              const href = `${lang === 'en' ? '' : `/${lang}`}${path}`;
              const label = lang === 'ar' ? TOOL_CONFIGS_AR[related].title : lang === 'fr' ? TOOL_CONFIGS_FR[related].title : lang === 'es' ? TOOL_CONFIGS_ES[related].title : TOOL_CONFIGS[related].title;
              return (
                <a key={related} href={href} onClick={(event) => { event.preventDefault(); onNavigate(relatedPage); }} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-semibold text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600">
                  {label} <ArrowRight className="inline-block w-4 h-4 ms-1" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </nav>

        {/* Contextual links to published Arabic guides; no false translated equivalents. */}
        {lang === 'ar' && (tool === 'business' || tool === 'wifi' || tool === 'whatsapp') && (
          <section className="pt-8 border-t border-slate-200" aria-labelledby="related-guide-title">
            <h2 id="related-guide-title" className="text-xl font-bold text-slate-900 mb-3">دليل عملي لاستخدام هذه الأداة</h2>
            <p className="text-sm text-slate-600 mb-3">تعرّف على الخطوات والنصائح قبل إنشاء رمز QR وطباعته.</p>
            <a
              href={tool === 'business' ? '/blog/business-card-qr-code-guide' : tool === 'wifi' ? '/blog/wifi-qr-code-for-guests' : '/blog/whatsapp-qr-code-for-customers'}
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 underline underline-offset-4 hover:text-indigo-900"
            >
              {tool === 'business' ? 'كيفية إنشاء رمز QR لبطاقة العمل' : tool === 'wifi' ? 'كيفية إنشاء رمز Wi-Fi QR للضيوف' : 'كيفية إنشاء رمز QR لواتساب للعملاء'}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </section>
        )}

        {/* Ad Placement */}
        <AdPlacement lang={lang} format="horizontal-leaderboard" />
      </div>
    </div>
  );
};
