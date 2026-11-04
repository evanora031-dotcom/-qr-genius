import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Database } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface PrivacyPageProps {
  lang: Language;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'بنية تراعي معايير حماية البيانات' : lang === 'fr' ? 'Architecture respectueuse de la protection des données' : lang === 'es' ? 'Arquitectura respetuosa con la protección de datos' : 'lang === 'ar' ? 'بنية تراعي معايير حماية البيانات' : lang === 'fr' ? 'Architecture respectueuse de la protection des données' : lang === 'es' ? 'Arquitectura respetuosa con la protección de datos' : 'GDPR &amp; CCPA Compliant Architecture''}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'سياسة الخصوصية' : lang === 'fr' ? 'Politique de confidentialité' : lang === 'es' ? 'Política de privacidad' : 'lang === 'ar' ? 'سياسة الخصوصية' : lang === 'fr' ? 'Politique de confidentialité' : lang === 'es' ? 'Política de privacidad' : 'Privacy Policy''}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'تاريخ السريان: 1 نوفمبر 2026 · الإصدار 2.0' : lang === 'fr' ? 'Date d’entrée en vigueur : 1 novembre 2026 · Version 2.0' : lang === 'es' ? 'Fecha de entrada en vigor: 1 de noviembre de 2026 · Versión 2.0' : 'lang === 'ar' ? 'تاريخ السريان: 1 نوفمبر 2026 · الإصدار 2.0' : lang === 'fr' ? 'Date d’entrée en vigueur : 1 novembre 2026 · Version 2.0' : lang === 'es' ? 'Fecha de entrada en vigor: 1 de noviembre de 2026 · Versión 2.0' : 'Effective Date: November 1, 2026 · Version 2.0''}
          </p>
        </div>

        {/* Highlights banner */}
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span>{lang === 'ar' ? 'التزام QR GENIUS بالخصوصية' : lang === 'fr' ? 'L’engagement de QR GENIUS pour la confidentialité' : lang === 'es' ? 'Compromiso de privacidad de QR GENIUS' : 'lang === 'ar' ? 'التزام QR GENIUS بالخصوصية' : lang === 'fr' ? 'L’engagement de QR GENIUS pour la confidentialité' : lang === 'es' ? 'Compromiso de privacidad de QR GENIUS' : 'The QR GENIUS Privacy Pledge in Plain English''}</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'ar' ? <>عند إدخال كلمة مرور Wi-Fi أو موقع شركتك أو بيانات بطاقة الاتصال أو أي نص، <strong>لا نطّلع على هذه البيانات ولا نرسلها أو نخزنها</strong>. تتم عملية إنشاء رمز QR بالكامل محلياً على جهازك باستخدام JavaScript داخل المتصفح.</> : <>{lang === 'ar' ? <>عند إدخال كلمة مرور Wi-Fi أو بيانات الاتصال أو أي نص، <strong>لا نطّلع على هذه البيانات ولا نرسلها أو نخزنها</strong>. تتم عملية إنشاء الرمز محلياً في متصفحك.</> : lang === 'fr' ? <>Lorsque vous saisissez un mot de passe Wi-Fi, des coordonnées ou du texte, <strong>nous ne consultons, ne transmettons ni ne stockons ces données</strong>. Le QR code est généré localement dans votre navigateur.</> : lang === 'es' ? <>Cuando introduces una contraseña Wi-Fi, datos de contacto o texto, <strong>no vemos, transmitimos ni almacenamos esos datos</strong>. El código QR se genera localmente en tu navegador.</> : <>When you enter Wi-Fi credentials, contact details, or text, <strong>we do not view, transmit, or store that data</strong>. The QR code is generated locally in your browser.</>}</>}
          </p>
        </div>

        {/* Clauses */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '1. المعلومات التي لا نجمعها' : lang === 'fr' ? '1. Informations que nous ne collectons pas' : lang === 'es' ? '1. Información que no recopilamos' : 'lang === 'ar' ? '1. المعلومات التي لا نجمعها' : lang === 'fr' ? '1. Informations que nous ne collectons pas' : lang === 'es' ? '1. Información que no recopilamos' : '1. Information We Do Not Collect''}</h2>
            <p>
              {lang === 'ar' ? 'لا تتطلب QR GENIUS حساباً أو تسجيل بريد إلكتروني أو التحقق من رقم الهاتف لاستخدام الخدمة المجانية. ولا نخزن البيانات التالية:' : lang === 'fr' ? 'Contrairement à certaines plateformes, QR GENIUS ne demande ni compte, ni inscription par e-mail, ni vérification téléphonique. Nous ne stockons pas :' : lang === 'es' ? 'A diferencia de otras plataformas, QR GENIUS no requiere cuenta, registro por correo ni verificación telefónica. No almacenamos:' : 'lang === 'ar' ? 'لا تتطلب QR GENIUS حساباً أو تسجيل بريد إلكتروني أو التحقق من رقم الهاتف لاستخدام الخدمة المجانية. ولا نخزن البيانات التالية:' : lang === 'fr' ? 'Contrairement à certaines plateformes, QR GENIUS ne demande ni compte, ni inscription par e-mail, ni vérification téléphonique. Nous ne stockons pas :' : lang === 'es' ? 'A diferencia de otras plataformas, QR GENIUS no requiere cuenta, registro por correo ni verificación telefónica. No almacenamos:' : 'Unlike legacy QR generator platforms, QR GENIUS does not require user accounts, email registration, or phone number verification to use our free service. We do not store:''}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>{lang === 'ar' ? 'اسم شبكة Wi-Fi أو كلمة مرورها' : lang === 'fr' ? 'Le nom de votre réseau Wi-Fi ou son mot de passe' : lang === 'es' ? 'El nombre de tu red Wi-Fi ni su contraseña' : 'lang === 'ar' ? 'اسم شبكة Wi-Fi أو كلمة مرورها' : lang === 'fr' ? 'Le nom de votre réseau Wi-Fi ou son mot de passe' : lang === 'es' ? 'El nombre de tu red Wi-Fi ni su contraseña' : 'Your Wi-Fi SSID or Wi-Fi encryption passwords''}</li>
              <li>{lang === 'ar' ? 'بيانات الاتصال الشخصية مثل الأسماء وأرقام الهواتف والعناوين' : lang === 'fr' ? 'Vos coordonnées personnelles (noms, numéros et adresses vCard)' : lang === 'es' ? 'Tus datos personales (nombres, teléfonos y direcciones vCard)' : 'lang === 'ar' ? 'بيانات الاتصال الشخصية مثل الأسماء وأرقام الهواتف والعناوين' : lang === 'fr' ? 'Vos coordonnées personnelles (noms, numéros et adresses vCard)' : lang === 'es' ? 'Tus datos personales (nombres, teléfonos y direcciones vCard)' : 'Your personal contact information (vCard names, phone numbers, addresses)''}</li>
              <li>{lang === 'ar' ? 'روابط الوجهة أو رموز تتبع UTM أو الرسائل النصية' : lang === 'fr' ? 'Vos URL de destination, paramètres UTM ou messages texte' : lang === 'es' ? 'Tus URL de destino, parámetros UTM o mensajes de texto' : 'lang === 'ar' ? 'روابط الوجهة أو رموز تتبع UTM أو الرسائل النصية' : lang === 'fr' ? 'Vos URL de destination, paramètres UTM ou messages texte' : lang === 'es' ? 'Tus URL de destino, parámetros UTM o mensajes de texto' : 'Your destination URLs, UTM tracking codes, or plain text messages''}</li>
              <li>{lang === 'ar' ? 'محتوى الرموز الثابتة التي تنشئها أو عدد مرات مسحها' : lang === 'fr' ? 'Le contenu ou le nombre de scans de vos QR codes statiques' : lang === 'es' ? 'El contenido o el número de escaneos de tus códigos QR estáticos' : 'lang === 'ar' ? 'محتوى الرموز الثابتة التي تنشئها أو عدد مرات مسحها' : lang === 'fr' ? 'Le contenu ou le nombre de scans de vos QR codes statiques' : lang === 'es' ? 'El contenido o el número de escaneos de tus códigos QR estáticos' : 'Scanned contents or scan counts of static QR codes you create''}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '2. التخزين المحلي في المتصفح (localStorage)' : lang === 'fr' ? '2. Stockage local du navigateur (localStorage)' : lang === 'es' ? '2. Almacenamiento local del navegador (localStorage)' : 'lang === 'ar' ? '2. التخزين المحلي في المتصفح (localStorage)' : lang === 'fr' ? '2. Stockage local du navigateur (localStorage)' : lang === 'es' ? '2. Almacenamiento local del navegador (localStorage)' : '2. Local Browser Storage (localStorage)''}</h2>
            <p>
              {lang === 'ar' ? <>لتسهيل الاستخدام، تتيح لك QR GENIUS عرض الرموز الأخيرة في سجلّك. يُحفظ هذا السجل محلياً في متصفح جهازك فقط باستخدام <code>localStorage</code>، ولا تتم مزامنته مع الخوادم السحابية. يمكنك مسحه في أي وقت من زر «مسح السجل».</> : <>{lang === 'ar' ? <>لراحتك، يُحفظ سجل الرموز الأخيرة محلياً في متصفح جهازك باستخدام <code>localStorage</code> ولا تتم مزامنته مع الخوادم. يمكنك مسحه من زر «مسح السجل».</> : lang === 'fr' ? <>L’historique des codes récents est conservé uniquement dans le stockage local du navigateur (<code>localStorage</code>). Il n’est pas synchronisé avec des serveurs et peut être effacé avec le bouton « Effacer l’historique ».</> : lang === 'es' ? <>El historial de códigos recientes se guarda únicamente en el almacenamiento local del navegador (<code>localStorage</code>). No se sincroniza con servidores y puedes borrarlo con el botón «Borrar historial».</> : <>Recent code history is stored only in your browser&rsquo;s local storage (<code>localStorage</code>). It is not synchronized to servers and can be cleared using the &ldquo;Clear History&rdquo; button.</>}</>}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '3. خدمات الجهات الخارجية والإعلانات' : lang === 'fr' ? '3. Services tiers et publicité' : lang === 'es' ? '3. Servicios de terceros y publicidad' : 'lang === 'ar' ? '3. خدمات الجهات الخارجية والإعلانات' : lang === 'fr' ? '3. Services tiers et publicité' : lang === 'es' ? '3. Servicios de terceros y publicidad' : '3. Third-Party Integrations &amp; Advertising''}</h2>
            <p>
              {lang === 'ar' ? 'قد نعرض إعلانات من شركاء مثل Google AdSense للمساهمة في تكاليف تشغيل الخدمة وإبقاء أدوات إنشاء رموز QR مجانية. وقد يستخدم شركاء الإعلان ملفات تعريف الارتباط أو إشارات الويب وفق سياساتهم. لا نبيع المعلومات الشخصية لوسطاء البيانات.' : '{lang === 'ar' ? 'قد نعرض إعلانات من شركاء مثل Google AdSense للمساهمة في تكاليف تشغيل الخدمة. وقد يستخدم شركاء الإعلان ملفات تعريف الارتباط وفق سياساتهم. لا نبيع المعلومات الشخصية.' : lang === 'fr' ? 'Nous pouvons afficher des publicités de partenaires tels que Google AdSense afin de financer le service. Ces partenaires peuvent utiliser des cookies conformément à leurs politiques. Nous ne vendons pas les données personnelles.' : lang === 'es' ? 'Podemos mostrar anuncios de socios como Google AdSense para contribuir al funcionamiento del servicio. Estos socios pueden utilizar cookies según sus políticas. No vendemos datos personales.' : 'We may display ads from partners such as Google AdSense to help support the service. Advertising partners may use cookies under their own policies. We do not sell personal information.'}'}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '4. أمن البيانات' : lang === 'fr' ? '4. Sécurité des données' : lang === 'es' ? '4. Seguridad de los datos' : 'lang === 'ar' ? '4. أمن البيانات' : lang === 'fr' ? '4. Sécurité des données' : lang === 'es' ? '4. Seguridad de los datos' : '4. Data Security''}</h2>
            <p>
              {lang === 'ar' ? 'بما أن البيانات التي تدخلها لإنشاء الرمز لا تغادر متصفحك، فإنها لا تُرسل إلى خوادمنا. ونوصي باستخدام HTTPS عند مشاركة مواقع الوجهة أو فتحها.' : '{lang === 'ar' ? 'تُعالج البيانات التي تدخلها لإنشاء الرمز محلياً ولا تُرسل إلى خوادمنا. ونوصي باستخدام HTTPS لمواقع الوجهة.' : lang === 'fr' ? 'Les données saisies pour générer le code sont traitées localement et ne sont pas envoyées à nos serveurs. Nous recommandons HTTPS pour les sites de destination.' : lang === 'es' ? 'Los datos introducidos para generar el código se procesan localmente y no se envían a nuestros servidores. Recomendamos HTTPS para los sitios de destino.' : 'Data entered to generate a QR code is processed locally and is not sent to our servers. We recommend HTTPS for destination websites.'}'}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '5. التواصل بشأن الخصوصية' : lang === 'fr' ? '5. Contact concernant la confidentialité' : lang === 'es' ? '5. Contacto sobre privacidad' : 'lang === 'ar' ? '5. التواصل بشأن الخصوصية' : lang === 'fr' ? '5. Contact concernant la confidentialité' : lang === 'es' ? '5. Contacto sobre privacidad' : '5. Contact Regarding Privacy''}</h2>
            <p>
              {lang === 'ar' ? 'إذا كانت لديك أسئلة أو استفسارات حول هذه السياسة، تواصل معنا عبر' : '{lang === 'ar' ? 'إذا كانت لديك أسئلة حول هذه السياسة، تواصل معنا عبر' : lang === 'fr' ? 'Pour toute question concernant cette politique, contactez-nous à' : lang === 'es' ? 'Si tienes preguntas sobre esta política, escríbenos a' : 'If you have any questions about this policy, contact us at'}' } <code>privacy@qrgenius.app</code>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
