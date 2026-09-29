/**
 * index.mjs — plain-JS twin of index.ts. Public API of the literature engines
 * (Hindi chhand + English metre/writing formats).
 */

export { scanHindiVerse, TAUGHT_CHHANDS, UNTAUGHT_CHHANDS } from './chhand.mjs';
export { syllables, matras, ganaPattern, guruLaghu, words } from './devanagari.mjs';

export { scanEnglishPoem, countSyllables } from './englishMeter.mjs';
export { checkWritingFormat, TAUGHT_FORMATS, FORMAT_LABELS } from './formatCheck.mjs';
