import type { BilingualContent, LanguageMode } from "@/types";

export function renderBilingual(content: BilingualContent, mode: LanguageMode): string {
  switch (mode) {
    case "en":
      return content.en;
    case "hi":
      return content.hi;
    case "both":
      return content.mixed || content.en;
    default:
      return content.en;
  }
}

export function createBilingualContent(
  en: string,
  hi: string,
  keyTerms?: { term: string; hindi: string }[]
): BilingualContent {
  let mixed = en;
  if (keyTerms) {
    for (const { term, hindi } of keyTerms) {
      mixed = mixed.replace(
        new RegExp(`\\b${term}\\b`, "gi"),
        `${term} (${hindi})`
      );
    }
  }
  return { en, hi, mixed };
}

export function getLanguageLabel(mode: LanguageMode): string {
  switch (mode) {
    case "en":
      return "English";
    case "hi":
      return "हिंदी";
    case "both":
      return "EN + हिं";
    default:
      return "English";
  }
}
