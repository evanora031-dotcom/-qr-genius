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
            {text('Effective Date: November 1, 2026 · Version 2.0', 'تاريخ السريان: 1 نوفمبر 2026 · الإصدار 2.0', 'Date d’entrée en vigueur : 1 novembre 2026 · Version 2.0', 'Fecha de entrada en vigor: 1 de noviembre de 2026 · Versión 2.0')}
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
              <li>{text('Personal contact details such as names, phone numbers, and addresses', 'بيانات الاتصال الشخصية مثل الأسماء وأرقام الهواتف والعناوين', 'Vos coordonnées personnelles, telles que les noms, numéros de téléphone et adresses', 'Tus datos de contacto personales, como nombres, teléfonos y direcciones')}</li>
              <li>{text('Destination URLs, UTM tracking codes, or text messages entered for QR generation', 'روابط الوجهة أو رموز تتبع UTM أو الرسائل النصية', 'Les URL de destination, les codes de suivi UTM ou les messages texte saisis pour générer un QR', 'Las URL de destino, los códigos de seguimiento UTM o los mensajes de texto introducidos para generar un QR')}</li>
              <li>{text('The contents or scan counts of static QR codes you create', 'محتوى الرموز الثابتة التي تنشئها أو عدد مرات مسحها', 'Le contenu ou le nombre de scans des codes QR statiques que vous créez', 'El contenido o el número de escaneos de los códigos QR estáticos que creas')}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('2. Local Browser Storage (localStorage)', '2. التخزين المحلي في المتصفح (localStorage)', '2. Stockage local dans le navigateur (localStorage)', '2. Almacenamiento local del navegador (localStorage)')}
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
              {text('3. Third-Party Services and Advertising', '3. خدمات الجهات الخارجية والإعلانات', '3. Services tiers et publicité', '3. Servicios de terceros y publicidad')}
            </h2>
            <p>
              {text(
                'We may display advertisements from partners such as Google AdSense to help cover service costs and keep QR code tools free. Advertising partners may use cookies or web beacons according to their own policies. We do not sell personal information to data brokers.',
                'قد نعرض إعلانات من شركاء مثل Google AdSense للمساهمة في تكاليف تشغيل الخدمة وإبقاء أدوات إنشاء رموز QR مجانية. وقد يستخدم شركاء الإعلان ملفات تعريف الارتباط أو إشارات الويب وفق سياساتهم. لا نبيع المعلومات الشخصية لوسطاء البيانات.',
                'Nous pouvons afficher des publicités de partenaires tels que Google AdSense afin de contribuer aux coûts du service et de maintenir les outils QR gratuits. Les partenaires publicitaires peuvent utiliser des cookies ou des balises web conformément à leurs propres politiques. Nous ne vendons pas les informations personnelles à des courtiers en données.',
                'Podemos mostrar anuncios de socios como Google AdSense para ayudar a cubrir los costes del servicio y mantener gratuitas las herramientas QR. Los socios publicitarios pueden utilizar cookies o balizas web según sus propias políticas. No vendemos información personal a intermediarios de datos.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('4. Privacy-Focused Website Analytics', '4. تحليلات الموقع مع مراعاة الخصوصية', '4. Mesure d’audience respectueuse de la vie privée', '4. Analítica web respetuosa con la privacidad')}
            </h2>
            <p>
              {text(
                'We use Cloudflare Web Analytics to understand page performance and aggregate website usage. Cloudflare states that this service does not collect or use visitors’ personal data, does not use cookies or localStorage for analytics, and does not fingerprint individuals. Its browser beacon sends performance measurements to Cloudflare. Analytics may be incomplete when the beacon is blocked by browser settings or extensions.',
                'نستخدم خدمة Cloudflare Web Analytics لفهم أداء الصفحات وقياس استخدام الموقع بصورة إجمالية. وتوضح Cloudflare أن هذه الخدمة لا تجمع البيانات الشخصية للزوار ولا تستخدم ملفات تعريف الارتباط أو التخزين المحلي لأغراض التحليلات، ولا تنشئ بصمة تعريفية للأفراد. ويرسل البرنامج النصي الخاص بالخدمة قياسات الأداء إلى Cloudflare. وقد تكون البيانات غير مكتملة إذا حُظر هذا البرنامج من إعدادات المتصفح أو إضافاته.',
                'Nous utilisons Cloudflare Web Analytics pour comprendre les performances des pages et mesurer l’utilisation globale du site. Cloudflare indique que ce service ne collecte ni n’utilise les données personnelles des visiteurs, n’utilise pas de cookies ni de stockage local à des fins analytiques et ne crée pas d’empreinte individuelle. Son script de mesure transmet des indicateurs de performance à Cloudflare. Les données peuvent être incomplètes si ce script est bloqué par le navigateur ou une extension.',
                'Utilizamos Cloudflare Web Analytics para comprender el rendimiento de las páginas y medir el uso general del sitio. Cloudflare indica que este servicio no recopila ni utiliza datos personales de los visitantes, no usa cookies ni almacenamiento local para análisis y no crea huellas digitales individuales. Su script de medición envía métricas de rendimiento a Cloudflare. Los datos pueden estar incompletos si el navegador o una extensión bloquea ese script.'
              )}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">
              {text('5. Data Security', '5. أمن البيانات', '5. Sécurité des données', '5. Seguridad de los datos')}
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
              {text('6. Contact About Privacy', '6. التواصل بشأن الخصوصية', '6. Contact au sujet de la confidentialité', '6. Contacto sobre privacidad')}
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
