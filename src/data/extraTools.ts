import type { Language } from '../types';
import { EXTRA_TOOL_IDS, type ExtraToolContent, type ExtraToolId, type ExtraToolLocale } from './extraToolTypes';
import { EXTRA_TOOLS_EN } from './extraTools.en';
import { EXTRA_TOOLS_AR } from './extraTools.ar';
import { EXTRA_TOOLS_FR } from './extraTools.fr';
import { EXTRA_TOOLS_ES } from './extraTools.es';

export * from './extraToolTypes';

export const EXTRA_TOOLS: Record<Language, ExtraToolContent> = {
  en: EXTRA_TOOLS_EN,
  ar: EXTRA_TOOLS_AR,
  fr: EXTRA_TOOLS_FR,
  es: EXTRA_TOOLS_ES
};

export function isExtraTool(value: string): value is ExtraToolId {
  return (EXTRA_TOOL_IDS as readonly string[]).includes(value);
}

export function getExtraTool(id: ExtraToolId, lang: Language): ExtraToolLocale {
  return EXTRA_TOOLS[lang][id];
}
