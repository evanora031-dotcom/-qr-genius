import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPageProps {
  lang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ lang }) => {
  const text = (en: string, ar: string, fr: string, es: string) =>
    lang === 'ar' ? ar : lang === 'fr' ? fr : lang === 'es' ? es : en;

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{text('Privacy-focused design', 'بنية تراعي معايير حماية البيانات', 'Conception axée sur la confidentialité', 'Diseño centrado en la privacidad')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {text('Privacy Policy', 'سياسة الخصوصية', 'Politique de confidentialité', 'Política de privacidad')}
          </h1>
          <p className="text-xs text-slate-500">
            {text('Updated: November 6, 2026 · Version 2.1', 'آخر تحديث: 6 نوفمبر 2026 · الإصدار 2.1', 'Mise à jour : 6 novembre 2026 · Version 2.1', 'Actualizada: 6 de noviembre de 2026 · Versión 2.1')}
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>{text('The QR GENIUS Privacy Pledge', 'التزام QR GENIUS بالخصوصية', 'L’engagement de QR GENIUS pour la confidentialité', 'El compromiso de QR GENIUS con la privacidad')}</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {text(
              'When you enter your Wi-Fi password, company website, contact details, or text into QR GENIUS, the QR code is generated locally in your browser. The information entered for code generation is not sent to our servers.',
              'عند إدخال كلمة مرور Wi-Fi أو موقع شركتك أو بيانات بطاقة الاتصال أو أي نص، لا نطّلع على هذه البيانات ولا نرسلها أو نخزنها. تتم عملية إنشاء رمز QR بالكامل محلياً على جهازك باستخدام JavaScript داخل المتصفح.',
              'Lorsque vous saisissez un mot de passe Wi-Fi, le site de votre entreprise, des coordonnées ou du texte dans QR GENIUS, le code QR est généré localement dans votre navigateur. Les informations saisies pour créer le code ne sont pas envoyées à nos serveurs.',
              'Cuando introduces una contraseña Wi-Fi, el sitio web de tu empresa, datos de contacto o texto en QR GENIUS, el código QR se genera localmente en tu navegador. La información introducida para crear el código no se envía a nuestros servidores.'
            )}
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('1. Information We Do Not Collect', '1. المعلومات التي لا نجمعها', '1. Informations que nous ne collectons pas', '1. Información que no recopilamos')}
            </h2>
            <p>
              {text(
                'QR GENIUS does not require an account, email registration, or phone number verification to use the free service. We do not store:',
                'لا تتطلب QR GENIUS إنشاء حساب أو التسجيل بالبريد الإلكتروني أو التحقق برقم الهاتف لاستخدام الخدمة المجانية. ولا نخزن ما يلي:',
                'QR GENIUS ne nécessite ni compte, ni inscription par e-mail, ni vérification du numéro de téléphone pour utiliser le service gratuit. Nous ne stockons pas :',
                'QR GENIUS no requiere una cuenta, registro por correo electrónico ni verificación del número de teléfono para utilizar el servicio gratuito. No almacenamos:'
              )}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>{text('Your Wi-Fi network name or Wi-Fi passwords', 'اسم شبكة Wi-Fi أو كلمات مرور تشفيرها', 'Le nom de votre réseau Wi-Fi ou ses mots de passe', 'El nombre de tu red Wi-Fi ni sus contraseñas')}</li>
              <li>{text('Destination URLs, UTM tracking codes, or text messages entered for QR generation', 'روابط الوجهة أو رموز تتبع UTM أو الرسائل النصية', 'Les URL de destination, les codes de suivi UTM ou les messages texte saisis pour générer un QR', 'Las URL de destino, los códigos de seguimiento UTM o los mensajes de texto introducidos para generar un QR')}</li>
              <li>{text('The contents or scan counts of static QR codes you create', 'محتوى الرموز الثابتة التي تنشئها أو عدد مرات مسحها', 'Le contenu ou le nombre de scans des codes QR statiques que vous créez', 'El contenido o el número de escaneos de los códigos QR estáticos que creas')}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('2. Information You Send Through the Contact Form', '2. المعلومات التي ترسلها عبر نموذج التواصل', '2. Informations envoyées via le formulaire de contact', '2. Información que envías mediante el formulario de contacto')}
            </h2>
            <p>
              {text(
                'If you contact us through the website form, we collect the name, email address, topic, and message that you submit. We use these details only to review and respond to your inquiry and to provide support. The message is transmitted through our email delivery provider, Resend, to our support inbox at support@getqrgenius.com. Do not include passwords or other sensitive information in your message. Contact messages may remain in the email systems used to deliver and respond to them; we do not use the contact form to create a marketing mailing list.',
                'إذا تواصلت معنا عبر نموذج الموقع، فإننا نجمع الاسم والبريد الإلكتروني وموضوع الرسالة ومحتواها الذي ترسله. نستخدم هذه البيانات لمراجعة استفسارك والرد عليه وتقديم الدعم فقط. تُرسل الرسالة عبر مزود خدمة البريد الإلكتروني Resend إلى صندوق الدعم support@getqrgenius.com. يرجى عدم تضمين كلمات المرور أو أي معلومات حساسة أخرى في رسالتك. قد تبقى رسائل التواصل في أنظمة البريد الإلكتروني المستخدمة لإرسالها والرد عليها، ولا نستخدم نموذج التواصل لإنشاء قائمة بريدية تسويقية.',
                'Si vous nous contactez via le formulaire du site, nous recueillons le nom, l’adresse e-mail, le sujet et le message que vous envoyez. Nous utilisons ces informations uniquement pour examiner votre demande, y répondre et fournir une assistance. Le message est transmis par notre prestataire d’envoi d’e-mails, Resend, à notre boîte de support support@getqrgenius.com. N’incluez pas de mots de passe ni d’autres informations sensibles dans votre message. Les messages peuvent rester dans les systèmes de messagerie utilisés pour leur transmission et leur traitement ; le formulaire ne sert pas à créer une liste de marketing.',
                'Si nos contactas mediante el formulario del sitio, recopilamos el nombre, la dirección de correo electrónico, el asunto y el mensaje que envías. Utilizamos estos datos únicamente para revisar y responder a tu consulta y ofrecer asistencia. El mensaje se transmite a través de nuestro proveedor de correo electrónico, Resend, a la bandeja de soporte support@getqrgenius.com. No incluyas contraseñas ni otra información sensible en tu mensaje. Los mensajes pueden permanecer en los sistemas de correo utilizados para enviarlos y responderlos; no utilizamos el formulario para crear una lista de marketing.'
              )}
            </p>
            <p>
              {text(
                'To protect the contact form against spam and automated abuse, we use Cloudflare Turnstile. Cloudflare may process technical information, including IP address, browser signals, and the verification response, to assess whether a submission is automated. Our server verifies the resulting token with Cloudflare before processing the message. For more information, see Cloudflare\'s privacy policy.',
                'لحماية نموذج التواصل من الرسائل المزعجة والاستخدام الآلي، نستخدم Cloudflare Turnstile. قد تعالج Cloudflare معلومات تقنية، منها عنوان IP وإشارات المتصفح ونتيجة التحقق، لتقييم ما إذا كان الإرسال آلياً. يتحقق خادمنا من رمز التحقق لدى Cloudflare قبل معالجة الرسالة. للمزيد، راجع سياسة خصوصية Cloudflare.',
                'Pour protéger le formulaire contre le spam et les soumissions automatisées, nous utilisons Cloudflare Turnstile. Cloudflare peut traiter des informations techniques, notamment l’adresse IP, des signaux du navigateur et la réponse de vérification, afin de détecter les soumissions automatisées. Notre serveur vérifie le jeton auprès de Cloudflare avant de traiter le message. Pour en savoir plus, consultez la politique de confidentialité de Cloudflare.',
                'Para proteger el formulario frente al spam y los envíos automatizados, utilizamos Cloudflare Turnstile. Cloudflare puede tratar información técnica, como la dirección IP, señales del navegador y la respuesta de verificación, para detectar envíos automatizados. Nuestro servidor verifica el token con Cloudflare antes de procesar el mensaje. Para más información, consulta la política de privacidad de Cloudflare.'
              )}{' '}
              <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer" className="text-indigo-700 underline underline-offset-2">
                {text('Cloudflare Privacy Policy', 'سياسة خصوصية Cloudflare', 'Politique de confidentialité de Cloudflare', 'Política de privacidad de Cloudflare')}
              </a>
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('3. Local Browser Storage (localStorage)', '3. التخزين المحلي في المتصفح (localStorage)', '3. Stockage local dans le navigateur (localStorage)', '3. Almacenamiento local del navegador (localStorage)')}
            </h2>
            <p>
              {text(
                'For convenience, QR GENIUS lets you view recently created codes in your history. This history is stored only in your browser on your device using localStorage and is not synchronized with cloud servers. You can clear it at any time using the Clear History button.',
                'لتسهيل الاستخدام، تتيح لك QR GENIUS عرض الرموز الأخيرة في سجلّك. يُحفظ هذا السجل محلياً في متصفح جهازك فقط باستخدام localStorage، ولا تتم مزامنته مع الخوادم السحابية. يمكنك مسحه في أي وقت من زر «مسح السجل».',
                'Pour plus de commodité, QR GENIUS vous permet de consulter les codes récemment créés dans votre historique. Cet historique est enregistré uniquement dans le navigateur de votre appareil à l’aide de localStorage et n’est pas synchronisé avec des serveurs cloud. Vous pouvez l’effacer à tout moment avec le bouton Effacer l’historique.',
                'Para mayor comodidad, QR GENIUS te permite consultar los códigos recientes en tu historial. Este historial se guarda únicamente en el navegador de tu dispositivo mediante localStorage y no se sincroniza con servidores en la nube. Puedes borrarlo en cualquier momento con el botón Borrar historial.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('4. Third-Party Services and Advertising', '4. خدمات الجهات الخارجية والإعلانات', '4. Services tiers et publicité', '4. Servicios de terceros y publicidad')}
            </h2>
            <p>
              {text(
                'If advertising is enabled on QR GENIUS, Google and other advertising partners may serve ads and use cookies, web beacons, IP addresses, or similar technologies to store or access information in your browser and collect information when ads are shown. Third parties, including Google, may place and read cookies on your browser, or use web beacons and IP addresses, as a result of ad serving on this website. These technologies may be used to provide, measure, and personalize advertising, subject to applicable settings, consent requirements, and each partner’s privacy policy. We do not sell personal information to data brokers.',
                'إذا تم تفعيل الإعلانات على QR GENIUS، فقد تعرض Google وشركاء الإعلان الآخرون إعلانات، وقد يستخدمون ملفات تعريف الارتباط أو إشارات الويب أو عناوين IP أو تقنيات مشابهة لتخزين المعلومات في متصفحك أو الوصول إليها وجمع معلومات عند عرض الإعلانات. وقد تضع جهات خارجية، بما فيها Google، ملفات تعريف ارتباط في متصفحك وتقرأها، أو تستخدم إشارات الويب وعناوين IP نتيجة عرض الإعلانات على هذا الموقع. وقد تُستخدم هذه التقنيات لتقديم الإعلانات وقياسها وتخصيصها، وفقاً للإعدادات المعمول بها ومتطلبات الموافقة وسياسة الخصوصية لكل شريك. لا نبيع المعلومات الشخصية لوسطاء البيانات.',
                'Si la publicité est activée sur QR GENIUS, Google et d’autres partenaires publicitaires peuvent diffuser des annonces et utiliser des cookies, des balises web, des adresses IP ou des technologies similaires pour stocker des informations dans votre navigateur, y accéder et recueillir des informations lors de l’affichage des annonces. Des tiers, y compris Google, peuvent déposer et lire des cookies dans votre navigateur, ou utiliser des balises web et des adresses IP du fait de la diffusion d’annonces sur ce site. Ces technologies peuvent servir à diffuser, mesurer et personnaliser les annonces, sous réserve des paramètres applicables, des exigences de consentement et de la politique de confidentialité de chaque partenaire. Nous ne vendons pas d’informations personnelles à des courtiers en données.',
                'Si se habilita la publicidad en QR GENIUS, Google y otros socios publicitarios pueden mostrar anuncios y utilizar cookies, balizas web, direcciones IP o tecnologías similares para almacenar información en tu navegador, acceder a ella y recopilar información cuando se muestran anuncios. Terceros, incluido Google, pueden instalar y leer cookies en tu navegador, o utilizar balizas web y direcciones IP como resultado de la publicación de anuncios en este sitio web. Estas tecnologías pueden utilizarse para ofrecer, medir y personalizar anuncios, de acuerdo con la configuración aplicable, los requisitos de consentimiento y la política de privacidad de cada socio. No vendemos información personal a intermediarios de datos.'
              )} <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer" className="text-indigo-700 underline underline-offset-2">{text('How Google uses data on partner sites and apps', 'كيفية استخدام Google للبيانات على مواقع وتطبيقات الشركاء', 'Comment Google utilise les données sur les sites et applications partenaires', 'Cómo utiliza Google los datos en sitios y aplicaciones de socios')}</a>.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('5. Privacy-Focused Website Analytics', '5. تحليلات الموقع مع مراعاة الخصوصية', '5. Mesure d’audience respectueuse de la vie privée', '5. Analítica web respetuosa con la privacidad')}
            </h2>
            <p>
              {text(
                'We use PostHog analytics when enabled to measure page views and selected QR download or save events. Our configuration disables automatic event capture and session recordings and uses memory-only persistence. We do not intentionally send QR contents, Wi-Fi passwords, contact form values, or contact details as analytics event properties. Analytics requests may still transmit technical information such as IP address and browser details to the provider. Some visitors may block analytics with browser settings or extensions.',
                'نستخدم PostHog عند تفعيلها لقياس مشاهدات الصفحات وبعض أحداث تنزيل رموز QR أو حفظها. إعداداتنا تعطل التتبع التلقائي وتسجيل الجلسات وتستخدم التخزين المؤقت في الذاكرة فقط. لا نرسل عمداً محتوى رموز QR أو كلمات مرور Wi-Fi أو قيم نموذج الاتصال أو بيانات التواصل ضمن خصائص أحداث التحليلات. ومع ذلك قد تنقل طلبات التحليلات معلومات تقنية مثل عنوان IP وبيانات المتصفح إلى مزود الخدمة. وقد تمنع إعدادات المتصفح أو إضافاته هذا القياس.',
                'Nous utilisons PostHog, lorsqu’il est activé, pour mesurer les vues de pages et certains événements de téléchargement ou d’enregistrement de QR codes. Notre configuration désactive la collecte automatique et les enregistrements de session et utilise uniquement une persistance en mémoire. Nous n’envoyons pas intentionnellement le contenu des QR codes, les mots de passe Wi-Fi, les champs du formulaire de contact ou les coordonnées dans les propriétés des événements. Les requêtes d’analyse peuvent néanmoins transmettre des informations techniques telles que l’adresse IP et des détails du navigateur au fournisseur. Certains navigateurs ou extensions peuvent bloquer ces mesures.',
                'Utilizamos PostHog, cuando está habilitado, para medir vistas de página y determinados eventos de descarga o guardado de códigos QR. Nuestra configuración desactiva la captura automática y la grabación de sesiones y utiliza persistencia solo en memoria. No enviamos intencionadamente el contenido de los códigos QR, contraseñas Wi-Fi, campos del formulario de contacto ni datos de contacto como propiedades de eventos. Las solicitudes de análisis pueden transmitir información técnica como la dirección IP y detalles del navegador al proveedor. Algunos navegadores o extensiones pueden bloquear estas mediciones.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('6. Data Security', '6. أمن البيانات', '6. Sécurité des données', '6. Seguridad de los datos')}
            </h2>
            <p>
              {text(
                'The information you enter to generate a QR code is processed in your browser and is not sent to our servers for code generation. We recommend using HTTPS when sharing or opening destination websites.',
                'بما أن البيانات التي تدخلها لإنشاء الرمز لا تغادر متصفحك، فإنها لا تُرسل إلى خوادمنا. ونوصي باستخدام HTTPS عند مشاركة مواقع الوجهة أو فتحها.',
                'Les informations saisies pour générer un code QR sont traitées dans votre navigateur et ne sont pas envoyées à nos serveurs pour cette opération. Nous recommandons d’utiliser HTTPS lorsque vous partagez ou consultez des sites de destination.',
                'La información que introduces para generar un código QR se procesa en tu navegador y no se envía a nuestros servidores para crear el código. Recomendamos utilizar HTTPS al compartir o abrir sitios web de destino.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('7. Contact About Privacy', '7. التواصل بشأن الخصوصية', '7. Contact au sujet de la confidentialité', '7. Contacto sobre privacidad')}
            </h2>
            <p>
              {text(
                'For privacy questions or requests, contact us at',
                'للاستفسارات أو الطلبات المتعلقة بالخصوصية، يُرجى التواصل معنا عبر',
                'Pour toute question ou demande relative à la confidentialité, contactez-nous à',
                'Para preguntas o solicitudes relacionadas con la privacidad, contáctanos en'
              )} <a href="mailto:support@getqrgenius.com" className="text-indigo-700 underline underline-offset-2">support@getqrgenius.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
