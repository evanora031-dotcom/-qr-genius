import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface TermsPageProps {
  lang: Language;
}

export const TermsPage: React.FC<TermsPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="py-12 sm:py-16 bg-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="border-b border-slate-200 pb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <FileText className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'اتفاقية الاستخدام' : lang === 'fr' ? 'Conditions d’utilisation' : lang === 'es' ? 'Acuerdo de uso' : 'lang === 'ar' ? 'اتفاقية الاستخدام' : lang === 'fr' ? 'Conditions d’utilisation' : lang === 'es' ? 'Acuerdo de uso' : 'Usage Agreement''}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'شروط الاستخدام' : lang === 'fr' ? 'Conditions de service' : lang === 'es' ? 'Términos del servicio' : 'lang === 'ar' ? 'شروط الاستخدام' : lang === 'fr' ? 'Conditions de service' : lang === 'es' ? 'Términos del servicio' : 'Terms of Service''}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'ar' ? 'آخر تحديث: 1 نوفمبر 2026' : lang === 'fr' ? 'Dernière mise à jour : 1 novembre 2026' : lang === 'es' ? 'Última actualización: 1 de noviembre de 2026' : 'lang === 'ar' ? 'آخر تحديث: 1 نوفمبر 2026' : lang === 'fr' ? 'Dernière mise à jour : 1 novembre 2026' : lang === 'es' ? 'Última actualización: 1 de noviembre de 2026' : 'Last Updated: November 1, 2026''}
          </p>
        </div>

        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'ar' ? 'ترخيص مجاني للاستخدام الشخصي والتجاري' : lang === 'fr' ? 'Licence gratuite pour usage personnel et commercial' : lang === 'es' ? 'Licencia gratuita para uso personal y comercial' : 'lang === 'ar' ? 'ترخيص مجاني للاستخدام الشخصي والتجاري' : lang === 'fr' ? 'Licence gratuite pour usage personnel et commercial' : lang === 'es' ? 'Licencia gratuita para uso personal y comercial' : '100% Free Commercial &amp; Personal License''}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'ar' ? 'يمكنك استخدام رموز QR التي تنشئها عبر QR GENIUS وطباعتها ونسخها وتوزيعها وعرضها مجاناً لأغراض شخصية أو تجارية.' : lang === 'fr' ? 'Vous pouvez utiliser, imprimer, reproduire, distribuer et afficher gratuitement les QR codes créés avec QR GENIUS, à des fins personnelles ou commerciales.' : lang === 'es' ? 'Puedes utilizar, imprimir, reproducir, distribuir y mostrar gratuitamente los códigos QR creados con QR GENIUS para fines personales o comerciales.' : 'lang === 'ar' ? 'يمكنك استخدام رموز QR التي تنشئها عبر QR GENIUS وطباعتها ونسخها وتوزيعها وعرضها مجاناً لأغراض شخصية أو تجارية.' : lang === 'fr' ? 'Vous pouvez utiliser, imprimer, reproduire, distribuer et afficher gratuitement les QR codes créés avec QR GENIUS, à des fins personnelles ou commerciales.' : lang === 'es' ? 'Puedes utilizar, imprimir, reproducir, distribuir y mostrar gratuitamente los códigos QR creados con QR GENIUS para fines personales o comerciales.' : 'All QR codes you generate using QR GENIUS are your exclusive property. You are granted an unconditional, royalty-free, perpetual worldwide license to use, print, reproduce, distribute, and display your generated codes for any personal or commercial purpose.''}
          </p>
        </div>

        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '1. الموافقة على الشروط' : lang === 'fr' ? '1. Acceptation des conditions' : lang === 'es' ? '1. Aceptación de los términos' : 'lang === 'ar' ? '1. الموافقة على الشروط' : lang === 'fr' ? '1. Acceptation des conditions' : lang === 'es' ? '1. Aceptación de los términos' : '1. Acceptance of Terms''}</h2>
            <p>
              {lang === 'ar' ? 'بدخولك إلى QR GENIUS واستخدامه، فإنك توافق على هذه الشروط. إذا لم توافق عليها، يُرجى التوقف عن استخدام الموقع.' : lang === 'fr' ? 'En accédant à QR GENIUS et en l’utilisant, vous acceptez les présentes conditions. Si vous n’êtes pas d’accord, veuillez cesser d’utiliser le site.' : lang === 'es' ? 'Al acceder y utilizar QR GENIUS, aceptas estas condiciones. Si no estás de acuerdo, deja de utilizar el sitio.' : 'lang === 'ar' ? 'بدخولك إلى QR GENIUS واستخدامه، فإنك توافق على هذه الشروط. إذا لم توافق عليها، يُرجى التوقف عن استخدام الموقع.' : lang === 'fr' ? 'En accédant à QR GENIUS et en l’utilisant, vous acceptez les présentes conditions. Si vous n’êtes pas d’accord, veuillez cesser d’utiliser le site.' : lang === 'es' ? 'Al acceder y utilizar QR GENIUS, aceptas estas condiciones. Si no estás de acuerdo, deja de utilizar el sitio.' : 'By accessing and using QR GENIUS, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please discontinue use of this site.''}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '2. الاستخدام التجاري والطباعة المسموح بهما' : lang === 'fr' ? '2. Utilisation commerciale et impression autorisées' : lang === 'es' ? '2. Uso comercial e impresión permitidos' : 'lang === 'ar' ? '2. الاستخدام التجاري والطباعة المسموح بهما' : lang === 'fr' ? '2. Utilisation commerciale et impression autorisées' : lang === 'es' ? '2. Uso comercial e impresión permitidos' : '2. Permitted Commercial and Print Use''}</h2>
            <p>
              {lang === 'ar' ? 'يمكنك طباعة الرموز على العبوات وبطاقات الأعمال واللوحات والمجلات وقوائم المطاعم والملصقات والشاشات. لا نشترط إضافة شعار أو علامة مائية أو رابط لموقعنا.' : lang === 'fr' ? 'Vous pouvez imprimer librement les codes sur des emballages, cartes de visite, affiches, magazines, menus, autocollants et écrans. Aucun logo, filigrane ou lien retour n’est exigé.' : lang === 'es' ? 'Puedes imprimir los códigos en envases, tarjetas, carteles, revistas, menús, pegatinas y pantallas. No exigimos logotipos, marcas de agua ni enlaces.' : 'lang === 'ar' ? 'يمكنك طباعة الرموز على العبوات وبطاقات الأعمال واللوحات والمجلات وقوائم المطاعم والملصقات والشاشات. لا نشترط إضافة شعار أو علامة مائية أو رابط لموقعنا.' : lang === 'fr' ? 'Vous pouvez imprimer librement les codes sur des emballages, cartes de visite, affiches, magazines, menus, autocollants et écrans. Aucun logo, filigrane ou lien retour n’est exigé.' : lang === 'es' ? 'Puedes imprimir los códigos en envases, tarjetas, carteles, revistas, menús, pegatinas y pantallas. No exigimos logotipos, marcas de agua ni enlaces.' : 'You may freely print generated codes on packaging, business cards, billboards, magazines, restaurant menus, stickers, and electronic displays. We do not require branding attribution, watermarks, or back-links.''}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '3. الاستخدامات المحظورة' : lang === 'fr' ? '3. Utilisations interdites' : lang === 'es' ? '3. Usos prohibidos' : 'lang === 'ar' ? '3. الاستخدامات المحظورة' : lang === 'fr' ? '3. Utilisations interdites' : lang === 'es' ? '3. Usos prohibidos' : '3. Prohibited Usage''}</h2>
            <p>
              {lang === 'ar' ? 'تتعهد بعدم استخدام QR GENIUS لإنشاء رموز تؤدي إلى المحتوى التالي أو تروّج له:' : lang === 'fr' ? 'Vous vous engagez à ne pas utiliser QR GENIUS pour créer des codes menant aux contenus suivants ou en faisant la promotion :' : lang === 'es' ? 'Te comprometes a no utilizar QR GENIUS para crear códigos que enlacen o promocionen los siguientes contenidos:' : 'lang === 'ar' ? 'تتعهد بعدم استخدام QR GENIUS لإنشاء رموز تؤدي إلى المحتوى التالي أو تروّج له:' : lang === 'fr' ? 'Vous vous engagez à ne pas utiliser QR GENIUS pour créer des codes menant aux contenus suivants ou en faisant la promotion :' : lang === 'es' ? 'Te comprometes a no utilizar QR GENIUS para crear códigos que enlacen o promocionen los siguientes contenidos:' : 'You agree not to use QR GENIUS to generate QR codes that link to or promote:''}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>{lang === 'ar' ? 'البرامج الضارة أو الفيروسات أو محاولات التصيد الاحتيالي' : lang === 'fr' ? 'Logiciels malveillants, virus ou tentatives d’hameçonnage' : lang === 'es' ? 'Software malicioso, virus o intentos de suplantación' : 'lang === 'ar' ? 'البرامج الضارة أو الفيروسات أو محاولات التصيد الاحتيالي' : lang === 'fr' ? 'Logiciels malveillants, virus ou tentatives d’hameçonnage' : lang === 'es' ? 'Software malicioso, virus o intentos de suplantación' : 'Malicious software, viruses, or phishing schemes''}</li>
              <li>{lang === 'ar' ? 'الكشف غير المصرح به عن معلومات شخصية سرية' : lang === 'fr' ? 'Divulgation non autorisée d’informations personnelles confidentielles' : lang === 'es' ? 'Divulgación no autorizada de información personal confidencial' : 'lang === 'ar' ? 'الكشف غير المصرح به عن معلومات شخصية سرية' : lang === 'fr' ? 'Divulgation non autorisée d’informations personnelles confidentielles' : lang === 'es' ? 'Divulgación no autorizada de información personal confidencial' : 'Unauthorized disclosure of confidential personal information''}</li>
              <li>{lang === 'ar' ? 'المحتوى غير القانوني أو التشهيري أو الاحتيالي أو المسيء' : lang === 'fr' ? 'Contenus illégaux, diffamatoires, frauduleux ou harcelants' : lang === 'es' ? 'Contenido ilegal, difamatorio, fraudulento o acosador' : 'lang === 'ar' ? 'المحتوى غير القانوني أو التشهيري أو الاحتيالي أو المسيء' : lang === 'fr' ? 'Contenus illégaux, diffamatoires, frauduleux ou harcelants' : lang === 'es' ? 'Contenido ilegal, difamatorio, fraudulento o acosador' : 'Illegal, defamatory, fraudulent, or harassing content''}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-slate-900">{lang === 'ar' ? '4. إخلاء المسؤولية عن الضمان' : lang === 'fr' ? '4. Exclusion de garantie' : lang === 'es' ? '4. Exclusión de garantías' : 'lang === 'ar' ? '4. إخلاء المسؤولية عن الضمان' : lang === 'fr' ? '4. Exclusion de garantie' : lang === 'es' ? '4. Exclusión de garantías' : '4. Disclaimer of Warranty''}</h2>
            <p>
              {lang === 'ar' ? 'تُنشأ رموز QR محلياً «كما هي». ورغم استخدام خوارزميات تصحيح الأخطاء القياسية ISO/IEC، ننصح باختبار الرموز بأكثر من هاتف قبل الطباعة بكميات كبيرة.' : lang === 'fr' ? 'Les QR codes sont générés localement « en l’état ». Malgré l’utilisation des algorithmes de correction d’erreurs ISO/IEC, nous recommandons de tester les codes avec plusieurs téléphones avant toute impression en grande quantité.' : lang === 'es' ? 'Los códigos QR se generan localmente «tal cual». Aunque QR GENIUS utiliza algoritmos estándar de corrección de errores ISO/IEC, recomendamos probarlos con varios teléfonos antes de imprimir grandes cantidades.' : 'lang === 'ar' ? 'تُنشأ رموز QR محلياً «كما هي». ورغم استخدام خوارزميات تصحيح الأخطاء القياسية ISO/IEC، ننصح باختبار الرموز بأكثر من هاتف قبل الطباعة بكميات كبيرة.' : lang === 'fr' ? 'Les QR codes sont générés localement « en l’état ». Malgré l’utilisation des algorithmes de correction d’erreurs ISO/IEC, nous recommandons de tester les codes avec plusieurs téléphones avant toute impression en grande quantité.' : lang === 'es' ? 'Los códigos QR se generan localmente «tal cual». Aunque QR GENIUS utiliza algoritmos estándar de corrección de errores ISO/IEC, recomendamos probarlos con varios teléfonos antes de imprimir grandes cantidades.' : 'QR codes are generated locally &ldquo;as is&rdquo;. While QR GENIUS uses standard ISO/IEC error correction algorithms, we strongly advise testing all generated codes on multiple smartphone camera models prior to initiating large-scale physical print runs.''}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
