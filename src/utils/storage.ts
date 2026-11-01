import { Language, QRHistoryItem } from '../types';

const HISTORY_STORAGE_KEY = 'qrgenius_history_v1';
const LANG_STORAGE_KEY = 'qrgenius_lang_v1';
const MAX_HISTORY_ITEMS = 30;

export function getStoredHistory(): QRHistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Failed to read QR history from localStorage', e);
    return [];
  }
}

export function saveToHistory(item: Omit<QRHistoryItem, 'id' | 'createdAt'>): QRHistoryItem {
  const current = getStoredHistory();
  const newItem: QRHistoryItem = {
    ...item,
    id: 'qr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
    createdAt: Date.now()
  };

  // Avoid identical consecutive duplicates
  const filtered = current.filter(existing => existing.content !== newItem.content);
  const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    // If quota exceeded, trim older entries
    try {
      const reduced = updated.slice(0, 10);
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(reduced));
    } catch {
      // Ignore fallback
    }
  }

  return newItem;
}

export function deleteFromHistory(id: string): QRHistoryItem[] {
  const current = getStoredHistory();
  const updated = current.filter(item => item.id !== id);
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete history item', e);
  }
  return updated;
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear history', e);
  }
}

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const lang = localStorage.getItem(LANG_STORAGE_KEY) as Language;
    if (lang && ['en', 'ar', 'fr', 'es'].includes(lang)) {
      return lang;
    }
  } catch {
    // fallback
  }
  return 'en';
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // fallback
  }
}
