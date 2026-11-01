import React, { useState } from 'react';
import { FileText, Copy, Download, Check } from 'lucide-react';
import { generateRobotsTxt } from '../utils/seo';

export const RobotsView: React.FC = () => {
  const content = generateRobotsTxt();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
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
              <FileText className="w-3.5 h-3.5" />
              <span>Crawl Directives</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Robots.txt Directive
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Directives guiding search engine spiders and automated web crawlers.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleCopy}
              className="py-2.5 px-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-xs min-h-[40px]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm min-h-[40px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download robots.txt</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 text-emerald-400 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
          <pre className="whitespace-pre-wrap break-all sm:break-normal">{content}</pre>
        </div>
      </div>
    </div>
  );
};
