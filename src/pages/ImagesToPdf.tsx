import React, { useEffect, useRef, useState } from 'react';
import { imagesToPdf, validatePdfImages } from '../utils/imagesToPdf';
import type { Language } from '../types';

const COPY: Record<Language, { title: string; intro: string; choose: string; convert: string; busy: string; download: string; privacy: string; guide: string; error: string }> = {
  en: { title: 'Convert Images to PDF Free', intro: 'Turn up to 10 JPEG or PNG images into an A4 PDF. Each image becomes one page, in the order selected.', choose: 'Choose JPEG or PNG images (up to 10)', convert: 'Create PDF', busy: 'Creating PDF…', download: 'Download PDF', privacy: 'Images stay in your browser. No upload is required.', guide: 'Choose images, create your PDF, and download it. Each image is fitted to an A4 page without cropping.', error: 'Could not create the PDF. Check that all images are valid JPEG or PNG files.' },
  ar: { title: 'تحويل الصور إلى PDF مجاناً', intro: 'حوّل حتى 10 صور JPEG أو PNG إلى PDF بحجم A4. تظهر كل صورة في صفحة حسب ترتيب الاختيار.', choose: 'اختر صور JPEG أو PNG (حتى 10)', convert: 'إنشاء PDF', busy: 'جارٍ إنشاء PDF…', download: 'تنزيل PDF', privacy: 'تبقى الصور داخل متصفحك دون رفعها إلى الخادم.', guide: 'اختر الصور ثم أنشئ الملف ونزّله. تُضبط كل صورة لتناسب صفحة A4 دون قص.', error: 'تعذر إنشاء PDF. تأكد من أن الصور بصيغة JPEG أو PNG سليمة.' },
  fr: { title: 'Convertir des images en PDF gratuitement', intro: 'Convertissez jusqu’à 10 images JPEG ou PNG en PDF A4. Une image par page, dans l’ordre de sélection.', choose: 'Choisir des images JPEG ou PNG (10 maximum)', convert: 'Créer le PDF', busy: 'Création du PDF…', download: 'Télécharger le PDF', privacy: 'Les images restent dans votre navigateur, sans envoi au serveur.', guide: 'Sélectionnez les images, créez le PDF et téléchargez-le. Chaque image tient sur une page A4 sans recadrage.', error: 'Impossible de créer le PDF. Vérifiez vos fichiers JPEG ou PNG.' },
  es: { title: 'Convertir imágenes a PDF gratis', intro: 'Convierte hasta 10 imágenes JPEG o PNG en un PDF A4. Cada imagen ocupa una página en el orden seleccionado.', choose: 'Selecciona imágenes JPEG o PNG (máximo 10)', convert: 'Crear PDF', busy: 'Creando PDF…', download: 'Descargar PDF', privacy: 'Las imágenes permanecen en tu navegador, sin subirlas al servidor.', guide: 'Selecciona las imágenes, crea el PDF y descárgalo. Cada imagen se ajusta a una página A4 sin recortar.', error: 'No se pudo crear el PDF. Comprueba tus imágenes JPEG o PNG.' }
};

const CONTENT_NOTES: Record<Language, { title: string; body: string }[]> = {
  en: [
    { title: "When should you use this tool?", body: "Use it to combine scanned receipts, notes, or document photos into one PDF that is easier to share. The result uses A4 pages, one image per page." },
    { title: "What should I check before converting?", body: "Choose clear, correctly oriented images in the order you want them to appear. This tool does not reorder, rotate, or crop images." },
    { title: "Will text in the images become searchable?", body: "No. The PDF contains the images as pages; it does not perform OCR or turn photographed text into selectable text." }
  ],
  ar: [
    { title: "متى تفيد هذه الأداة؟", body: "اجمع صور الإيصالات أو الملاحظات أو المستندات في ملف PDF واحد يسهل مشاركته. يتضمن الملف صفحة A4 لكل صورة." },
    { title: "ما الذي أراجعه قبل التحويل؟", body: "اختر صوراً واضحة وبالاتجاه الصحيح وبالترتيب الذي تريد ظهوره. لا تعيد الأداة ترتيب الصور ولا تدوّرها أو تقصّها." },
    { title: "هل يصبح النص الموجود في الصور قابلاً للبحث؟", body: "لا. يحتوي ملف PDF على الصور نفسها، ولا تنفذ الأداة التعرف الضوئي على النصوص (OCR)." }
  ],
  fr: [
    { title: "Quand utiliser cet outil ?", body: "Réunissez des reçus, des notes ou des photos de documents dans un seul PDF facile à partager. Chaque image occupe une page A4." },
    { title: "Que vérifier avant la conversion ?", body: "Choisissez des images nettes, bien orientées et dans l’ordre souhaité. L’outil ne réorganise, ne pivote et ne recadre pas les images." },
    { title: "Le texte des images sera-t-il recherchable ?", body: "Non. Le PDF contient les images comme pages et n’effectue pas de reconnaissance optique de caractères (OCR)." }
  ],
  es: [
    { title: "¿Cuándo conviene usar esta herramienta?", body: "Reúne recibos, apuntes o fotos de documentos en un solo PDF fácil de compartir. Cada imagen ocupa una página A4." },
    { title: "¿Qué debo comprobar antes de convertir?", body: "Selecciona imágenes nítidas, bien orientadas y en el orden deseado. La herramienta no reordena, gira ni recorta las imágenes." },
    { title: "¿Se podrá buscar el texto de las imágenes?", body: "No. El PDF contiene las imágenes como páginas y no realiza reconocimiento óptico de caracteres (OCR)." }
  ]
};

export const ImagesToPdf: React.FC<{ lang?: Language }> = ({ lang = 'en' }) => {
  const t = COPY[lang];
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const selectionVersion = useRef(0);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  const onSelect = (selected: File[]) => {
    selectionVersion.current += 1;
    setFiles(selected);
    setUrl('');
    try { validatePdfImages(selected); setError(''); }
    catch (err) { setError(err instanceof Error ? err.message : t.error); }
  };
  const onConvert = async () => {
    setError('');
    setBusy(true);
    const version = selectionVersion.current;
    try {
      const blob = await imagesToPdf(files);
      if (version === selectionVersion.current) setUrl(URL.createObjectURL(blob));
    } catch { if (version === selectionVersion.current) setError(t.error); }
    finally { setBusy(false); }
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1>
      <p className="text-slate-600">{t.intro}</p>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5">
        <label className="block font-semibold text-slate-800" htmlFor="pdf-images">{t.choose}</label>
        <input id="pdf-images" type="file" accept="image/jpeg,image/png" multiple disabled={busy} onChange={event => onSelect(Array.from(event.target.files || []))} className="block w-full min-w-0 max-w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-3 file:font-semibold file:text-indigo-800" />
        {files.length > 0 && <p className="text-sm text-slate-600">{files.length} {lang === 'ar' ? 'صور' : 'images'}</p>}
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button type="button" disabled={busy || !files.length || !!error} onClick={onConvert} className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:opacity-50">{busy ? t.busy : t.convert}</button>
        {url && <a href={url} download="qr-genius-images.pdf" className="flex min-h-12 w-full sm:w-fit items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-center font-bold text-white">{t.download}</a>}
      </section>
      <section className="space-y-3 text-slate-600">
        <h2 className="text-xl font-bold text-slate-900">{t.title}</h2>
        <p>{t.guide}</p>
        <p>{t.privacy}</p>
        <div className="space-y-4 pt-2">
          {CONTENT_NOTES[lang].map((note) => (
            <div key={note.title}>
              <h3 className="font-semibold text-slate-900">{note.title}</h3>
              <p className="mt-1 text-sm leading-relaxed">{note.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
