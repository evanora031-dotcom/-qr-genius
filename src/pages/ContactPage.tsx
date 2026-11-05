import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Shield, Clock } from 'lucide-react';
import { Language } from '../types';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const text = (en: string, ar: string, fr: string, es: string) =>
    lang === 'ar' ? ar : lang === 'fr' ? fr : lang === 'es' ? es : en;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Feedback / Suggestion');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError(text(
        'Please fill out all required fields.',
        'يرجى ملء جميع الحقول المطلوبة.',
        'Veuillez remplir tous les champs obligatoires.',
        'Completa todos los campos obligatorios.'
      ));
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          message: message.trim(),
          company: String(formData.get('company') || '')
        })
      });
      if (!response.ok) throw new Error('Contact request failed');
      setSubmitted(true);
    } catch {
      setFormError(text(
        'We could not send your message right now. Please try again or email support@getqrgenius.com.',
        'تعذّر إرسال رسالتك الآن. حاول مرة أخرى أو راسل support@getqrgenius.com.',
        'Nous ne pouvons pas envoyer votre message pour le moment. Réessayez ou écrivez à support@getqrgenius.com.',
        'No hemos podido enviar tu mensaje ahora. Inténtalo de nuevo o escribe a support@getqrgenius.com.'
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[80vh] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700">
            <Mail className="w-3.5 h-3.5" />
            <span>{text('Support & Inquiries', 'الدعم والاستفسارات', 'Assistance et demandes', 'Ayuda y consultas')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {text('Contact QR GENIUS', 'تواصل مع كيو آر جينيوس', 'Contacter QR GENIUS', 'Contactar con QR GENIUS')}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {text(
              'Have questions about QR codes or suggestions for new features? Get in touch with our team.',
              'هل لديك أسئلة حول رموز QR أو اقتراحات للميزات؟ تواصل مع فريقنا.',
              'Vous avez des questions sur les codes QR ou des suggestions de nouvelles fonctionnalités ? Contactez notre équipe.',
              '¿Tienes preguntas sobre los códigos QR o sugerencias de nuevas funciones? Ponte en contacto con nuestro equipo.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">
                {text('We Love Hearing From You', 'يسعدنا التواصل معك', 'Votre avis nous intéresse', 'Nos encanta saber de ti')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {text(
                  'Whether you need help or want to suggest a new QR code feature, send us a message and our team will review your inquiry.',
                  'سواء كنت تحتاج إلى مساعدة أو ترغب في اقتراح ميزة جديدة لرموز QR، أرسل لنا رسالة وسيراجع فريقنا استفسارك.',
                  'Que vous ayez besoin d’aide ou souhaitiez proposer une nouvelle fonctionnalité QR, envoyez-nous un message. Notre équipe examinera votre demande.',
                  'Si necesitas ayuda o quieres proponer una nueva función para los códigos QR, envíanos un mensaje y nuestro equipo revisará tu consulta.'
                )}
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    {text('Email Address', 'البريد الإلكتروني', 'Adresse e-mail', 'Correo electrónico')}
                  </span>
                  <a href="mailto:support@getqrgenius.com" className="text-white underline underline-offset-2 hover:text-indigo-200">support@getqrgenius.com</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    {text('Response Time', 'وقت الرد', 'Délai de réponse', 'Tiempo de respuesta')}
                  </span>
                  <span className="text-white">
                    {text('Email us directly for support', 'راسلنا مباشرة عبر البريد الإلكتروني للدعم', 'Écrivez-nous directement pour obtenir de l’aide', 'Escríbenos directamente para recibir ayuda')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                    {text('Privacy First', 'الخصوصية أولاً', 'Confidentialité avant tout', 'La privacidad es lo primero')}
                  </span>
                  <span className="text-white">
                    {text('Your email is used only to respond to your inquiry', 'يُستخدم بريدك الإلكتروني للرد على استفسارك فقط', 'Votre adresse e-mail sert uniquement à répondre à votre demande', 'Tu correo electrónico se utiliza únicamente para responder a tu consulta')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {text('Message Received!', 'تم استلام رسالتك!', 'Message reçu !', '¡Mensaje recibido!')}
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {text('Thank you,', 'شكراً لك،', 'Merci,', 'Gracias,')} <strong>{name}</strong>. {text('Your message about', 'تم استلام رسالتك بخصوص', 'Votre message concernant', 'Hemos recibido tu mensaje sobre')} “{topic}”. {text('We will reply to', 'سنرد على', 'Nous répondrons à', 'Responderemos a')} <strong>{email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {text('Send Another Message', 'إرسال رسالة أخرى', 'Envoyer un autre message', 'Enviar otro mensaje')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {text('Your Full Name', 'اسمك الكامل', 'Votre nom complet', 'Nombre completo')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={text('Jane Doe', 'الاسم الكامل', 'Jean Dupont', 'Nombre y apellidos')}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {text('Email Address', 'البريد الإلكتروني', 'Adresse e-mail', 'Correo electrónico')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {text('Topic / Category', 'الموضوع / التصنيف', 'Sujet / Catégorie', 'Asunto / Categoría')}
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  >
                    <option value="Feedback / Suggestion">{text('Feedback / Suggestion', 'اقتراح أو ملاحظة', 'Avis / Suggestion', 'Opinión / Sugerencia')}</option>
                    <option value="Technical Support">{text('Technical Support', 'الدعم التقني', 'Assistance technique', 'Soporte técnico')}</option>
                    <option value="Enterprise Solution">{text('Business Inquiry', 'استفسار تجاري أو مؤسسي', 'Demande commerciale', 'Consulta comercial')}</option>
                    <option value="Sponsorship & Partnership">{text('Partnership', 'الشراكات', 'Partenariat', 'Colaboración')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {text('Message', 'الرسالة', 'Message', 'Mensaje')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={text('Tell us how we can help...', 'أخبرنا كيف يمكننا مساعدتك...', 'Dites-nous comment nous pouvons vous aider...', 'Cuéntanos cómo podemos ayudarte...')}
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
                    <span>{text('Sending message...', 'جارٍ إرسال الرسالة...', 'Envoi du message...', 'Enviando mensaje...')}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{text('Send Message', 'إرسال الرسالة', 'Envoyer le message', 'Enviar mensaje')}</span>
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
