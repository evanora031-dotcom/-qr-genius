import React, { useEffect, useState } from 'react';
import { compressImage, type CompressedImageFormat } from '../utils/imageCompression';

const MAX_FILE_BYTES = 20 * 1024 * 1024;

export function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<CompressedImageFormat>('image/webp');
  const [quality, setQuality] = useState(0.75);
  const [maxDimension, setMaxDimension] = useState(1920);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ url: string; size: number; name: string } | null>(null);

  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);

  function chooseFile(next: File | null) {
    setFile(null);
    setResult(null);
    setError('');
    if (!next) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type)) {
      setError('Please choose a JPEG, PNG, or WebP image.');
      return;
    }
    if (!next.size || next.size > MAX_FILE_BYTES) {
      setError('Choose an image smaller than 20 MB.');
      return;
    }
    setFile(next);
  }

  async function handleCompress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file || busy) return;
    setBusy(true);
    setError('');
    setResult(null);
    try {
      const compressed = await compressImage(file, { format, quality, maxDimension });
      const url = URL.createObjectURL(compressed.blob);
      const base = file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 70) || 'image';
      setResult({ url, size: compressed.outputBytes, name: `${base}-compressed.${format === 'image/webp' ? 'webp' : 'jpg'}` });
    } catch {
      setError('This image could not be processed. Try another supported image.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-labelledby="compressor-title" className="mx-auto max-w-3xl px-4 py-12">
      <h1 id="compressor-title" className="text-3xl font-bold text-slate-900">Free Online Image Compressor</h1>
      <p className="mt-3 text-slate-600">Resize and compress JPEG, PNG, or WebP images directly in your browser. Your image stays on your device. Export as WebP or JPEG.</p>
      <form onSubmit={handleCompress} className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="block font-semibold text-slate-800" htmlFor="image-file">Choose an image (up to 20 MB)</label>
        <input id="image-file" aria-describedby="image-privacy" type="file" accept="image/jpeg,image/png,image/webp" onChange={e => chooseFile(e.target.files?.[0] || null)} className="block w-full text-sm" />
        <p id="image-privacy" className="text-sm text-slate-500">Images are processed locally; no upload is required.</p>
        <label className="block font-semibold text-slate-800" htmlFor="image-format">Output format</label>
        <select id="image-format" value={format} onChange={e => { setFormat(e.target.value as CompressedImageFormat); setResult(null); }} className="w-full rounded-lg border border-slate-300 p-3">
          <option value="image/webp">WebP</option>
          <option value="image/jpeg">JPEG (white background for transparency)</option>
        </select>
        <label className="block font-semibold text-slate-800" htmlFor="image-quality">Quality: {Math.round(quality * 100)}%</label>
        <input id="image-quality" type="range" min="10" max="100" value={Math.round(quality * 100)} onChange={e => { setQuality(Number(e.target.value) / 100); setResult(null); }} className="w-full" />
        <label className="block font-semibold text-slate-800" htmlFor="image-dimension">Maximum width or height</label>
        <select id="image-dimension" value={maxDimension} onChange={e => { setMaxDimension(Number(e.target.value)); setResult(null); }} className="w-full rounded-lg border border-slate-300 p-3">
          <option value="640">640 px</option><option value="1280">1280 px</option><option value="1920">1920 px</option><option value="3840">3840 px</option>
        </select>
        <button type="submit" disabled={!file || busy} className="min-h-12 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">{busy ? 'Compressing…' : 'Compress image'}</button>
        {error && <p role="alert" className="text-red-700">{error}</p>}
        {result && <div role="status" className="space-y-3 rounded-xl bg-slate-50 p-4">
          <p>Original: {(file!.size / 1024).toFixed(1)} KB · Output: {(result.size / 1024).toFixed(1)} KB</p>
          <p className="text-sm text-slate-600">Compression does not always make every image smaller.</p>
          <a href={result.url} download={result.name} className="inline-flex min-h-12 items-center rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white">Download compressed image</a>
        </div>}
      </form>
      <div className="mt-10 space-y-3 text-slate-700">
        <h2 className="text-xl font-bold">How to compress an image</h2>
        <p>Select a JPEG, PNG, or WebP image, choose WebP or JPEG, adjust the quality and maximum dimension, then compress and download.</p>
        <h2 className="text-xl font-bold">Does this tool upload my photos?</h2>
        <p>No. Compression uses your browser’s image canvas; files are not sent to QR Genius servers by this tool.</p>
      </div>
    </section>
  );
}
