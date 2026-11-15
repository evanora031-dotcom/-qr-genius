import React, { useEffect, useState } from 'react';
import type { Language } from '../types';
import { resizeImage, type ResizeFormat } from '../utils/imageResize';

const COPY = {
  en: { title: 'Resize Images Online Free', intro: 'Set exact pixel dimensions and download a resized image. Processing stays in your browser.', choose: 'Choose an image (up to 20 MB)', width: 'Width (px)', height: 'Height (px)', lock: 'Keep aspect ratio', format: 'Output format', resize: 'Resize image', busy: 'Resizing…', download: 'Download resized image', error: 'Unable to resize this image. Choose a supported JPEG, PNG, or WebP under 20 MB.', note: 'Transparent areas become white when exporting JPEG.' },
  ar: { title: 'تغيير حجم الصور مجاناً', intro: 'حدد عرض الصورة وارتفاعها بالبكسل ونزّل النتيجة. تتم المعالجة داخل متصفحك.', choose: 'اختر صورة (حتى 20 ميغابايت)', width: 'العرض (بكسل)', height: 'الارتفاع (بكسل)', lock: 'الحفاظ على تناسب الأبعاد', format: 'صيغة الملف الناتج', resize: 'تغيير حجم الصورة', busy: 'جارٍ تغيير الحجم…', download: 'تنزيل الصورة', error: 'تعذرت معالجة الصورة. اختر JPEG أو PNG أو WebP بحجم أقل من 20 ميغابايت.', note: 'تتحول المناطق الشفافة إلى اللون الأبيض عند التصدير بصيغة JPEG.' },
  fr: { title: 'Redimensionner une image gratuitement', intro: 'Définissez les dimensions en pixels et téléchargez le résultat. Le traitement reste dans votre navigateur.', choose: 'Choisir une image (20 Mo max.)', width: 'Largeur (px)', height: 'Hauteur (px)', lock: 'Conserver les proportions', format: 'Format de sortie', resize: 'Redimensionner', busy: 'Redimensionnement…', download: 'Télécharger l’image', error: 'Impossible de traiter cette image. Choisissez JPEG, PNG ou WebP de moins de 20 Mo.', note: 'Les zones transparentes deviennent blanches en JPEG.' },
  es: { title: 'Cambiar el tamaño de imágenes gratis', intro: 'Establece dimensiones exactas en píxeles y descarga el resultado. El procesamiento ocurre en tu navegador.', choose: 'Selecciona una imagen (máx. 20 MB)', width: 'Ancho (px)', height: 'Alto (px)', lock: 'Mantener proporciones', format: 'Formato de salida', resize: 'Cambiar tamaño', busy: 'Cambiando tamaño…', download: 'Descargar imagen', error: 'No se pudo procesar la imagen. Elige JPEG, PNG o WebP de menos de 20 MB.', note: 'Las áreas transparentes se vuelven blancas al exportar JPEG.' }
} satisfies Record<Language, Record<string, string>>;

const GUIDE = {
  "en": {
    "heading": "How to resize an image online",
    "steps": "Choose a JPEG, PNG, or WebP image. Enter the width and height in pixels, then select PNG, JPEG, or WebP for your download.",
    "exampleHeading": "Resize to 500 pixels wide",
    "example": "For example, upload a 1000 × 600 image and enter 500 for the width. With Keep aspect ratio enabled, the height becomes 300 pixels automatically.",
    "ratioHeading": "Keep proportions or choose exact dimensions",
    "ratio": "Leave Keep aspect ratio on to avoid stretching. Turn it off only when you need independent width and height values; this can distort the image.",
    "privacyHeading": "Does this tool upload my image?",
    "privacy": "No. The image is resized in your browser, without sending the file to QR Genius servers. Supported input formats are JPEG, PNG, and WebP, up to 20 MB."
  },
  "ar": {
    "heading": "كيفية تغيير حجم صورة عبر الإنترنت",
    "steps": "اختر صورة JPEG أو PNG أو WebP، ثم أدخل العرض والارتفاع بالبكسل وحدد صيغة PNG أو JPEG أو WebP للتنزيل.",
    "exampleHeading": "تغيير عرض الصورة إلى 500 بكسل",
    "example": "مثلاً، إذا كانت الصورة 1000 × 600 بكسل وأدخلت 500 للعرض، يصبح الارتفاع 300 بكسل تلقائياً عند تفعيل الحفاظ على تناسب الأبعاد.",
    "ratioHeading": "الحفاظ على الأبعاد أو تحديد قيم مستقلة",
    "ratio": "اترك خيار الحفاظ على تناسب الأبعاد مفعلاً لتجنب تمدد الصورة. ألغِ تفعيله فقط إذا أردت ضبط العرض والارتفاع بشكل مستقل، وقد تتشوه الصورة.",
    "privacyHeading": "هل تُرفع الصورة إلى الخادم؟",
    "privacy": "لا. تتم المعالجة داخل المتصفح دون إرسال الملف إلى خوادم QR Genius. تُقبل صور JPEG وPNG وWebP حتى 20 ميغابايت."
  },
  "fr": {
    "heading": "Comment redimensionner une image en ligne",
    "steps": "Choisissez une image JPEG, PNG ou WebP, saisissez la largeur et la hauteur en pixels, puis sélectionnez PNG, JPEG ou WebP pour le téléchargement.",
    "exampleHeading": "Réduire la largeur à 500 pixels",
    "example": "Par exemple, une image de 1000 × 600 pixels devient 500 × 300 pixels si vous saisissez 500 en largeur et conservez les proportions.",
    "ratioHeading": "Conserver les proportions ou saisir deux dimensions",
    "ratio": "Gardez l’option de proportions activée pour éviter les déformations. Désactivez-la uniquement pour définir largeur et hauteur séparément, ce qui peut étirer l’image.",
    "privacyHeading": "Mes images sont-elles envoyées sur un serveur ?",
    "privacy": "Non. Le redimensionnement se fait dans votre navigateur, sans transfert vers les serveurs QR Genius. Formats acceptés : JPEG, PNG et WebP, jusqu’à 20 Mo."
  },
  "es": {
    "heading": "Cómo cambiar el tamaño de una imagen en línea",
    "steps": "Elige una imagen JPEG, PNG o WebP, introduce el ancho y el alto en píxeles y selecciona PNG, JPEG o WebP para descargar.",
    "exampleHeading": "Cambiar el ancho a 500 píxeles",
    "example": "Por ejemplo, una imagen de 1000 × 600 píxeles pasa a 500 × 300 al introducir 500 de ancho con la proporción bloqueada.",
    "ratioHeading": "Mantener la proporción o elegir medidas independientes",
    "ratio": "Deja activada la opción de proporción para evitar deformaciones. Desactívala solo si necesitas cambiar ancho y alto por separado; la imagen podría estirarse.",
    "privacyHeading": "¿Se suben mis imágenes al servidor?",
    "privacy": "No. El cambio de tamaño se realiza en tu navegador, sin enviar archivos a los servidores de QR Genius. Se admiten JPEG, PNG y WebP de hasta 20 MB."
  }
} satisfies Record<Language, Record<string, string>>;

export function ImageResizer({ lang = 'en' }: { lang?: Language }) {
  const t = COPY[lang];
  const guide = GUIDE[lang];
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState({ width: 1, height: 1 });
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [locked, setLocked] = useState(true);
  const [format, setFormat] = useState<ResizeFormat>('image/png');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ url: string; filename: string } | null>(null);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);

  async function choose(next: File | null) {
    setFile(null); setResult(null); setError('');
    if (!next) return;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(next.type) || !next.size || next.size > 20 * 1024 * 1024) { setError(t.error); return; }
    try {
      const bitmap = await createImageBitmap(next);
      const dims = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      if (dims.width > 8192 || dims.height > 8192 || dims.width * dims.height > 16_000_000) { setError(t.error); return; }
      setSource(dims); setWidth(dims.width); setHeight(dims.height); setFile(next);
    } catch { setError(t.error); }
  }

  function changeWidth(value: number) {
    setWidth(value);
    if (locked && Number.isFinite(value)) setHeight(Math.max(1, Math.round(value * source.height / source.width)));
    setResult(null);
  }
  function changeHeight(value: number) {
    setHeight(value);
    if (locked && Number.isFinite(value)) setWidth(Math.max(1, Math.round(value * source.width / source.height)));
    setResult(null);
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || busy) return;
    setBusy(true); setError(''); setResult(null);
    try {
      const blob = await resizeImage(file, { width, height, format, quality: 0.85 });
      const url = URL.createObjectURL(blob);
      const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 70) || 'image';
      setResult({ url, filename: `${base}-${width}x${height}.${format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png'}` });
    } catch { setError(t.error); }
    finally { setBusy(false); }
  }

  return <section className="mx-auto max-w-3xl px-4 py-12">
    <h1 className="text-3xl font-bold text-slate-900">{t.title}</h1>
    <p className="mt-3 text-slate-600">{t.intro}</p>
    <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <label htmlFor="resize-file" className="block font-semibold">{t.choose}</label>
      <input id="resize-file" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => { void choose(e.target.files?.[0] || null); }} className="block w-full text-sm" />
      <div className="grid grid-cols-2 gap-4">
        <label className="block">{t.width}<input aria-label={t.width} type="number" min="1" max="8192" required value={width} onChange={e => changeWidth(Number(e.target.value))} className="mt-1 w-full rounded-lg border p-3" /></label>
        <label className="block">{t.height}<input aria-label={t.height} type="number" min="1" max="8192" required value={height} onChange={e => changeHeight(Number(e.target.value))} className="mt-1 w-full rounded-lg border p-3" /></label>
      </div>
      <label className="flex items-center gap-2"><input type="checkbox" checked={locked} onChange={e => setLocked(e.target.checked)} />{t.lock}</label>
      <label className="block">{t.format}<select value={format} onChange={e => { setFormat(e.target.value as ResizeFormat); setResult(null); }} className="mt-1 w-full rounded-lg border p-3"><option value="image/png">PNG</option><option value="image/jpeg">JPEG</option><option value="image/webp">WebP</option></select></label>
      <p className="text-sm text-slate-600">{t.note}</p>
      <button type="submit" disabled={!file || busy} className="min-h-11 rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-50">{busy ? t.busy : t.resize}</button>
      {error && <p role="alert" className="text-red-700">{error}</p>}
      {result && <a href={result.url} download={result.filename} className="block font-semibold text-indigo-700 underline">{t.download}</a>}
    </form>
    <section aria-labelledby="resizer-guide-heading" className="mt-10 space-y-5 text-slate-700">
      <h2 id="resizer-guide-heading" className="text-2xl font-bold text-slate-900">{guide.heading}</h2>
      <p>{guide.steps}</p>
      <h3 className="text-lg font-semibold text-slate-900">{guide.exampleHeading}</h3>
      <p>{guide.example}</p>
      <h3 className="text-lg font-semibold text-slate-900">{guide.ratioHeading}</h3>
      <p>{guide.ratio}</p>
      <h3 className="text-lg font-semibold text-slate-900">{guide.privacyHeading}</h3>
      <p>{guide.privacy}</p>
    </section>
  </section>;
}
