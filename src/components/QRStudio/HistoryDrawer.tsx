import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ArrowUpRight, 
  Download, 
  Clock, 
  FileCode,
  QrCode
} from 'lucide-react';
import { QRHistoryItem, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { clearAllHistory, deleteFromHistory } from '../../utils/storage';
import { downloadCanvasPNG, downloadSVG, renderQRToCanvas, renderQRToSVG } from '../../utils/qrRenderer';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: QRHistoryItem[];
  onHistoryUpdated: () => void;
  onLoadItem: (item: QRHistoryItem) => void;
  lang: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onHistoryUpdated,
  onLoadItem,
  lang
}) => {
  const [search, setSearch] = useState('');
  const t = translations[lang];

  if (!isOpen) return null;

  const filtered = history.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.content.toLowerCase().includes(search.toLowerCase()) ||
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFromHistory(id);
    onHistoryUpdated();
  };

  const handleClearAll = () => {
    if (window.confirm((lang === 'ar' ? 'هل أنت متأكد من مسح سجل رموز QR المحلي؟' : 'Are you sure you want to clear your local QR code history?'))) {
      clearAllHistory();
      onHistoryUpdated();
    }
  };

  const handleDownloadItem = async (item: QRHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const canvas = await renderQRToCanvas(item.config, 1024);
      downloadCanvasPNG(canvas, `qrgenius_${item.type}_${Date.now()}.png`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownloadItemSVG = (item: QRHistoryItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const svgStr = renderQRToSVG(item.config, 1000);
    downloadSVG(svgStr, `qrgenius_${item.type}_${Date.now()}.svg`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex pl-0 sm:pl-10 rtl:pl-0 rtl:sm:pr-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  {t.history.title}
                </h2>
                <p className="text-[11px] text-slate-500">
                  {history.length} codes stored locally in your browser
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  {t.history.clearAll}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          {history.length > 0 && (
            <div className="p-3 border-b border-slate-100 bg-white">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search history by content, type..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/30"
              />
            </div>
          )}

          {/* History List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">
                  {search ? 'No matching codes found' : t.history.empty}
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  {search ? 'Try adjusting your search terms' : 'Codes you generate will automatically be listed here for quick re-export and editing.'}
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onLoadItem(item);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer bg-white group flex items-start gap-3.5"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden p-1">
                    {item.previewDataUrl ? (
                      <img
                        src={item.previewDataUrl}
                        alt={lang === 'ar' ? 'صورة مصغرة لرمز QR' : 'QR Thumbnail'}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <QrCode className="w-6 h-6 text-slate-400" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                        {item.type}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-slate-900 truncate mb-0.5">
                      {item.title}
                    </div>

                    <p className="text-[11px] text-slate-500 truncate font-mono">
                      {item.content}
                    </p>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onLoadItem(item);
                          onClose();
                        }}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <span>{t.history.load}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>

                      <div className="flex-1" />

                      <button
                        type="button"
                        onClick={(e) => handleDownloadItem(item, e)}
                        title={lang === 'ar' ? 'تنزيل PNG' : 'Download PNG'}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownloadItemSVG(item, e)}
                        title={lang === 'ar' ? 'تنزيل SVG' : 'Download SVG'}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                      >
                        <FileCode className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDelete(item.id, e)}
                        title={t.history.delete}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
