import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Shield, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = translations[lang];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Feedback / Suggestion');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' : 'Please fill out all required fields.');
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
            <span>{lang === 'ar' ? 'الدعم والاستفسارات' : 'Support &amp; Inquiries'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ar' ? 'تواصل مع كيو آر جينيوس' : 'Contact QR GENIUS'}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {lang === 'ar' ? 'هل لديك أسئلة حول رموز QR أو اقتراحات للميزات أو احتياجات لإنشاء الرموز بكميات كبيرة؟ تواصل مع فريقنا.' : 'Have questions about QR codes, feature requests, or enterprise bulk generation? Reach out to our engineering team.'}
          </p>
        </div>

        {/* Content Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white mb-2">{lang === 'ar' ? 'يسعدنا التواصل معك' : 'We Love Hearing From You'}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {lang === 'ar' ? 'سواء كنت تحتاج إلى مساعدة في إعدادات الطباعة أو ترغب في اقتراح نوع جديد من بيانات QR، سنراجع استفسارك.' : 'Whether you need assistance with custom print setups or want to propose a new QR payload format, we respond to every inquiry.'}
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{lang === 'ar' ? 'البريد الإلكتروني' : 'Direct Email'}</span>
                  <span className="font-mono text-white">support@qrgenius.app</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{lang === 'ar' ? 'وقت الرد' : 'Response Time'}</span>
                  <span className="text-white">{lang === 'ar' ? 'خلال 24 ساعة عمل' : 'Within 24 business hours'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">{lang === 'ar' ? 'الخصوصية أولاً' : 'Privacy First'}</span>
                  <span className="text-white">{lang === 'ar' ? 'لن تتم مشاركة بريدك الإلكتروني' : 'Your email is never shared'}</span>
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
                <h3 className="text-lg font-bold text-slate-900">{lang === 'ar' ? 'تم استلام رسالتك!' : 'Message Received!'}</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. Your message regarding &ldquo;{topic}&rdquo; has been received. Our team will review your message and reply to <strong>{email}</strong> promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-4 py-2 bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'اسمك الكامل' : 'Your Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} <span className="text-rose-500">*</span>
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
                    {lang === 'ar' ? 'الموضوع / التصنيف' : 'Topic / Category'}
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/30 focus:border-indigo-600"
                  >
                    <option value="Feedback / Suggestion">اقتراح أو ملاحظة</option>
                    <option value="Technical Support">الدعم التقني / سؤال حول الطباعة</option>
                    <option value="Enterprise Solution">استفسار تجاري أو مؤسسي</option>
                    <option value="Sponsorship & Partnership">الرعاية والإعلانات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {lang === 'ar' ? 'الرسالة' : 'Message'} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="{lang === 'ar' ? 'أخبرنا كيف يمكننا مساعدتك...' : 'Tell us how we can help...'}"
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
                    <span>{lang === 'ar' ? 'جارٍ إرسال الرسالة...' : 'Sending message...'}</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
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
