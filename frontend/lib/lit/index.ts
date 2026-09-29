/**
 * index.ts — public API of the literature engines (Atlas platform).
 *
 * Hindi engine (chhand/meter):
 *   import { scanHindiVerse } from '@/lib/lit';
 *   const r = scanHindiVerse('गुरु गोविंद दोऊ खड़े, काके लागूँ पायँ।');
 *   // r.chhand === 'दोहा', r.confidence === 0.9, r.lines[0].matras === 13, r.lines[1].matras === 11
 *
 * English engine (metre + writing formats):
 *   import { scanEnglishPoem, checkWritingFormat } from '@/lib/lit';
 *   scanEnglishPoem(text)       — per-line syllables + stress patterns, foot
 *                                 classification, honest declines.
 *   checkWritingFormat(text, f) — deterministic format beats for the six
 *                                 taught writing formats; scaffold presence
 *                                 only, never prose-quality judgement.
 */

// ─── Hindi: chhand (meter) engine ─────────────────────────────────────────────

export { scanHindiVerse } from './chhand';
export type { ScanResult, VerseLine } from './chhand';
export { TAUGHT_CHHANDS, UNTAUGHT_CHHANDS } from './chhand';

export { syllables, matras, ganaPattern, guruLaghu, words } from './devanagari';
export type { Syllable } from './devanagari';

// ─── English: poem scanner + writing format-checker ──────────────────────────

export { scanEnglishPoem, countSyllables } from './englishMeter';
export type { MeterResult, LineScan, StanzaScan } from './englishMeter';

export { checkWritingFormat, TAUGHT_FORMATS, FORMAT_LABELS } from './formatCheck';
export type { WritingFormat, FormatBeat, FormatCheckResult } from './formatCheck';
