import React, { useState } from 'react';
import { FileCode, Copy, Download, Check } from 'lucide-react';
import { generateSitemapXML } from '../utils/seo';

export const SitemapView: React.FC = () => {
  const xmlContent = generateSitemapXML();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 sm:py-16 bg-white min-h-[80vh] overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6 text-left rtl:text-right">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-2">
              <FileCode className="w-3.5 h-3.5" />
              <span>XML Sitemap 0.9</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sitemap.xml Directory
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Valid Google and Bing sitemap schema including multilingual hreflang references.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopy}
              className="py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs min-h-[40px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML' : 'Copy XML'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm min-h-[40px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download sitemap.xml</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-slate-200 font-mono text-xs overflow-x-auto shadow-inner max-h-[600px] border border-slate-800">
          <pre className="whitespace-pre-wrap break-all sm:break-normal">{xmlContent}</pre>
        </div>
      </div>
    </div>
  );
};
