import React, { useState } from 'react';
import { Mail, lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message'Square, Send, CheckCircle2, Shield, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('lang === 'ar' ? 'اقتراح أو ملاحظة' : lang === 'fr' ? 'Avis / Suggestion' : lang === 'es' ? 'Opinión / Sugerencia' : 'Feedback / Suggestion'');
  const [message, setlang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message'] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : lang === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : lang === 'es' ? 'Completa todos los campos obligatorios.' : 'lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : lang === 'fr' ? 'Veuillez remplir tous les champs obligatoires.' : lang === 'es' ? 'Completa todos los campos obligatorios.' : 'Please fill out all required fields.'');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[80vh] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <Mail className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الدعم والاستفسارات' : lang === 'fr' ? 'Assistance et demandes' : lang === 'es' ? 'Soporte y consultas' : 'lang === 'ar' ? 'الدعم والاستفسارات' : lang === 'fr' ? 'Assistance et demandes' : lang === 'es' ? 'Soporte y consultas' : 'Support &amp; Inquiries''}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'تواصل مع QR GENIUS' : lang === 'fr' ? 'Contacter QR GENIUS' : lang === 'es' ? 'Contactar con QR GENIUS' : 'lang === 'ar' ? 'تواصل مع QR GENIUS' : lang === 'fr' ? 'Contacter QR GENIUS' : lang === 'es' ? 'Contactar con QR GENIUS' : 'Contact QR GENIUS''}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'ar' ? 'هل لديك أسئلة حول رموز QR أو اقتراحات للميزات؟ تواصل مع فريقنا.' : lang === 'fr' ? 'Des questions sur les QR codes ou des suggestions ? Contactez notre équipe.' : lang === 'es' ? '¿Tienes preguntas sobre códigos QR o sugerencias? Contacta con nuestro equipo.' : 'lang === 'ar' ? 'هل لديك أسئلة حول رموز QR أو اقتراحات للميزات؟ تواصل مع فريقنا.' : lang === 'fr' ? 'Des questions sur les QR codes ou des suggestions ? Contactez notre équipe.' : lang === 'es' ? '¿Tienes preguntas sobre códigos QR o sugerencias? Contacta con nuestro equipo.' : 'Have questions about QR codes, feature requests, or enterprise bulk generation? Reach out to our engineering team.''}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">{lang === 'ar' ? 'يسعدنا التواصل معك' : lang === 'fr' ? 'Votre avis nous intéresse' : lang === 'es' ? 'Queremos escucharte' : 'lang === 'ar' ? 'يسعدنا التواصل معك' : lang === 'fr' ? 'Votre avis nous intéresse' : lang === 'es' ? 'Queremos escucharte' : 'We Love Hearing From You''}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar' ? 'سواء احتجت إلى مساعدة في الطباعة أو أردت اقتراح ميزة جديدة، يسعدنا استقبال رسالتك.' : lang === 'fr' ? 'Que vous ayez besoin d’aide pour l’impression ou souhaitiez proposer une fonctionnalité, nous sommes à votre écoute.' : lang === 'es' ? 'Si necesitas ayuda con la impresión o quieres proponer una función, estaremos encantados de recibir tu mensaje.' : 'lang === 'ar' ? 'سواء احتجت إلى مساعدة في الطباعة أو أردت اقتراح ميزة جديدة، يسعدنا استقبال رسالتك.' : lang === 'fr' ? 'Que vous ayez besoin d’aide pour l’impression ou souhaitiez proposer une fonctionnalité, nous sommes à votre écoute.' : lang === 'es' ? 'Si necesitas ayuda con la impresión o quieres proponer una función, estaremos encantados de recibir tu mensaje.' : 'Whether you need assistance with custom print setups or want to propose a new QR payload format, we respond to every inquiry.''}
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'E-mail direct' : lang === 'es' ? 'Correo electrónico' : 'lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'E-mail direct' : lang === 'es' ? 'Correo electrónico' : 'Direct Email''}</span>
                  <span className="font-mono text-white">support@qrgenius.app</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{lang === 'ar' ? 'وقت الرد' : lang === 'fr' ? 'Délai de réponse' : lang === 'es' ? 'Tiempo de respuesta' : 'lang === 'ar' ? 'وقت الرد' : lang === 'fr' ? 'Délai de réponse' : lang === 'es' ? 'Tiempo de respuesta' : 'Response Time''}</span>
                  <span className="text-white">{lang === 'ar' ? 'خلال 24 ساعة عمل' : lang === 'fr' ? 'Sous 24 heures ouvrées' : lang === 'es' ? 'En 24 horas laborables' : 'lang === 'ar' ? 'خلال 24 ساعة عمل' : lang === 'fr' ? 'Sous 24 heures ouvrées' : lang === 'es' ? 'En 24 horas laborables' : 'Within 24 business hours''}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{lang === 'ar' ? 'الخصوصية أولاً' : lang === 'fr' ? 'Confidentialité avant tout' : lang === 'es' ? 'Privacidad ante todo' : 'lang === 'ar' ? 'الخصوصية أولاً' : lang === 'fr' ? 'Confidentialité avant tout' : lang === 'es' ? 'Privacidad ante todo' : 'Privacy First''}</span>
                  <span className="text-white">{lang === 'ar' ? 'لن تتم مشاركة بريدك الإلكتروني' : lang === 'fr' ? 'Votre adresse e-mail n’est pas partagée' : lang === 'es' ? 'Tu correo electrónico no se comparte' : 'lang === 'ar' ? 'لن تتم مشاركة بريدك الإلكتروني' : lang === 'fr' ? 'Votre adresse e-mail n’est pas partagée' : lang === 'es' ? 'Tu correo electrónico no se comparte' : 'Your email is never shared''}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{lang === 'ar' ? 'تم استلام رسالتك!' : lang === 'fr' ? 'lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message' reçu !' : lang === 'es' ? '¡Mensaje recibido!' : 'lang === 'ar' ? 'تم استلام رسالتك!' : lang === 'fr' ? 'lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message' reçu !' : lang === 'es' ? '¡Mensaje recibido!' : 'lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message' Received!''}</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {lang === 'ar' ? <>شكراً لك، <strong>{name}</strong>. تم استلام رسالتك بشأن «{topic}». سيراجع فريقنا الرسالة ويرد على <strong>{email}</strong>.</> : lang === 'fr' ? <>Merci, <strong>{name}</strong>. Votre message concernant « {topic} » a bien été reçu. Notre équipe vous répondra à <strong>{email}</strong>.</> : lang === 'es' ? <>Gracias, <strong>{name}</strong>. Hemos recibido tu mensaje sobre «{topic}». Nuestro equipo responderá a <strong>{email}</strong>.</> : <>Thank you, <strong>{name}</strong>. Your message regarding &ldquo;{topic}&rdquo; has been received. Our team will reply to <strong>{email}</strong>.</>}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setlang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message'('');
                  }}
                  className="mt-4 px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {lang === 'ar' ? 'إرسال رسالة أخرى' : lang === 'fr' ? 'Envoyer un autre message' : lang === 'es' ? 'Enviar otro mensaje' : 'lang === 'ar' ? 'إرسال رسالة أخرى' : lang === 'fr' ? 'Envoyer un autre message' : lang === 'es' ? 'Enviar otro mensaje' : 'Send Another lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message'''}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'اسمك الكامل' : lang === 'fr' ? 'Votre nom complet' : lang === 'es' ? 'Nombre completo' : 'lang === 'ar' ? 'اسمك الكامل' : lang === 'fr' ? 'Votre nom complet' : lang === 'es' ? 'Nombre completo' : 'Your Full Name''} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === "ar" ? "الاسم الكامل" : lang === "fr" ? "Jean Dupont" : lang === "es" ? "Nombre y apellidos" : "Jane Doe"}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'Adresse e-mail' : lang === 'es' ? 'Correo electrónico' : 'lang === 'ar' ? 'البريد الإلكتروني' : lang === 'fr' ? 'Adresse e-mail' : lang === 'es' ? 'Correo electrónico' : 'Email Address''} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'الموضوع / التصنيف' : lang === 'fr' ? 'Sujet / Catégorie' : lang === 'es' ? 'Tema / Categoría' : 'lang === 'ar' ? 'الموضوع / التصنيف' : lang === 'fr' ? 'Sujet / Catégorie' : lang === 'es' ? 'Tema / Categoría' : 'Topic / Category''}
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  >
                    <option value="lang === 'ar' ? 'اقتراح أو ملاحظة' : lang === 'fr' ? 'Avis / Suggestion' : lang === 'es' ? 'Opinión / Sugerencia' : 'Feedback / Suggestion'">اقتراح أو ملاحظة</option>
                    <option value="lang === 'ar' ? 'الدعم التقني' : lang === 'fr' ? 'Assistance technique' : lang === 'es' ? 'Soporte técnico' : 'Technical Support'">الدعم التقني / سؤال حول الطباعة</option>
                    <option value="lang === 'ar' ? 'استفسار تجاري أو مؤسسي' : lang === 'fr' ? 'Demande professionnelle' : lang === 'es' ? 'Consulta empresarial' : 'Enterprise Solution'">استفسار تجاري أو مؤسسي</option>
                    <option value="lang === 'ar' ? 'الرعاية والشراكات' : lang === 'fr' ? 'Sponsoring et partenariats' : lang === 'es' ? 'Patrocinios y colaboraciones' : 'Sponsorship & Partnership'">الرعاية والإعلانات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message'' : lang === 'es' ? 'Mensaje' : 'lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message''} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setlang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message'(e.target.value)}
                    placeholder="{lang === 'ar' ? 'أخبرنا كيف يمكننا مساعدتك...' : lang === 'fr' ? 'Expliquez-nous comment nous pouvons vous aider...' : lang === 'es' ? 'Cuéntanos cómo podemos ayudarte...' : 'lang === 'ar' ? 'أخبرنا كيف يمكننا مساعدتك...' : lang === 'fr' ? 'Expliquez-nous comment nous pouvons vous aider...' : lang === 'es' ? 'Cuéntanos cómo podemos ayudarte...' : 'Tell us how we can help...''}"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600 resize-y"
                  />
                </div>

                {formError && (
                  <p className="text-xs text-rose-600 font-medium bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>{lang === 'ar' ? 'جارٍ إرسال الرسالة...' : lang === 'fr' ? 'Envoi du message...' : lang === 'es' ? 'Enviando mensaje...' : 'lang === 'ar' ? 'جارٍ إرسال الرسالة...' : lang === 'fr' ? 'Envoi du message...' : lang === 'es' ? 'Enviando mensaje...' : 'Sending message...''}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send lang === 'ar' ? 'الرسالة' : lang === 'fr' ? 'Message' : lang === 'es' ? 'Mensaje' : 'Message''}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
