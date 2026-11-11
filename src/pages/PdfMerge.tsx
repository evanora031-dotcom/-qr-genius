import React, { useEffect, useRef, useState } from 'react';
import { mergePdfFiles } from '../utils/mergePdfFiles';
import { validateMergeFiles } from '../utils/pdfMergeValidation';
import type { Language } from '../types';

const COPY: Record<Language, { title: string; intro: string; choose: string; merge: string; busy: string; download: string; privacy: string; guide: string; error: string; selected: string }> = {
  en: { title: 'Merge PDF Files Free', intro: 'Combine 2 to 10 PDF files in the order selected, without uploading documents.', choose: 'Choose PDF files (2–10)', merge: 'Merge PDFs', busy: 'Merging…', download: 'Download merged PDF', privacy: 'Your PDFs are processed locally in this browser. Password-protected PDFs are not supported.', guide: 'Select PDFs in the order you want their pages to appear, merge, then download. Maximum 20 MB per file and 60 MB total.', error: 'Could not merge PDFs. Check that all files are valid, unlocked PDFs.', selected: 'files selected' },
  ar: { title: 'دمج ملفات PDF مجاناً', intro: 'ادمج من ملفين إلى 10 ملفات PDF حسب ترتيب الاختيار دون رفع المستندات.', choose: 'اختر ملفات PDF (من 2 إلى 10)', merge: 'دمج ملفات PDF', busy: 'جارٍ الدمج…', download: 'تنزيل ملف PDF المدمج', privacy: 'تُعالج ملفات PDF محلياً داخل متصفحك. الملفات المحمية بكلمة مرور غير مدعومة.', guide: 'اختر الملفات بالترتيب المطلوب، ثم ادمجها ونزّل الناتج. الحد الأقصى 20 ميغابايت للملف و60 ميغابايت إجمالاً.', error: 'تعذر دمج الملفات. تأكد من أن ملفات PDF سليمة وغير محمية.', selected: 'ملفات مختارة' },
  fr: { title: 'Fusionner des PDF gratuitement', intro: 'Fusionnez 2 à 10 fichiers PDF dans l’ordre choisi, sans transfert.', choose: 'Choisir des PDF (2 à 10)', merge: 'Fusionner les PDF', busy: 'Fusion en cours…', download: 'Télécharger le PDF fusionné', privacy: 'Les fichiers sont traités dans votre navigateur. Les PDF protégés par mot de passe ne sont pas pris en charge.', guide: 'Sélectionnez les fichiers dans l’ordre souhaité, fusionnez et téléchargez. 20 Mo par fichier et 60 Mo au total maximum.', error: 'Fusion impossible. Vérifiez que les PDF sont valides et non protégés.', selected: 'fichiers sélectionnés' },
  es: { title: 'Unir archivos PDF gratis', intro: 'Combina de 2 a 10 archivos PDF en el orden seleccionado sin subir documentos.', choose: 'Selecciona PDF (2 a 10)', merge: 'Unir PDF', busy: 'Uniendo…', download: 'Descargar PDF combinado', privacy: 'Los archivos se procesan en tu navegador. No se admiten PDF protegidos con contraseña.', guide: 'Selecciona los archivos en el orden deseado, combínalos y descárgalos. Máximo 20 MB por archivo y 60 MB en total.', error: 'No se pudieron unir los PDF. Comprueba que sean válidos y no estén protegidos.', selected: 'archivos seleccionados' }
};

export const PdfMerge: React.FC<{ lang?: Language }> = ({ lang = 'en' }) => {
  const t = COPY[lang];
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [url, setUrl] = useState('');
  const version = useRef(0);
  useEffect(() => () => { if (url) URL.revokeObjectURL(url); }, [url]);
  const select = (next: File[]) => {
    version.current += 1;
    setFiles(next);
    setUrl('');
    try { validateMergeFiles(next); setError(''); }
    catch (err) { setError(err instanceof Error ? err.message : t.error); }
  };
  const merge = async () => {
    const selectedVersion = version.current;
    setBusy(true);
    setError('');
    try {
      const blob = await mergePdfFiles(files);
      if (version.current === selectedVersion) setUrl(URL.createObjectURL(blob));
    } catch {
      if (version.current === selectedVersion) setError(t.error);
    } finally { setBusy(false); }
  };
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-extrabold text-slate-900">{t.title}</h1>
      <p className="text-slate-600">{t.intro}</p>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5">
        <label htmlFor="pdf-merge-files" className="block font-semibold text-slate-800">{t.choose}</label>
        <input id="pdf-merge-files" type="file" accept=".pdf,application/pdf" multiple disabled={busy} onChange={e => select(Array.from(e.target.files || []))} className="block w-full min-w-0 max-w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-3 file:font-semibold file:text-indigo-800" />
        {files.length > 0 && <p className="text-sm text-slate-600">{files.length} {t.selected}</p>}
        {error && <p role="alert" className="text-red-700">{error}</p>}
        <button type="button" disabled={busy || files.length < 2 || !!error} onClick={merge} className="inline-flex min-h-12 w-full sm:w-auto items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white disabled:opacity-50">{busy ? t.busy : t.merge}</button>
        {url && <a href={url} download="qr-genius-merged.pdf" className="flex min-h-12 w-full sm:w-fit items-center justify-center rounded-xl bg-emerald-700 px-6 py-3 text-center font-bold text-white">{t.download}</a>}
      </section>
      <section className="space-y-3 text-slate-600"><h2 className="text-xl font-bold text-slate-900">{t.title}</h2><p>{t.guide}</p><p>{t.privacy}</p></section>
    </main>
  );
};
