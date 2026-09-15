/**
 * components/math-input — barrel export
 *
 * Single import point for all math-input related components and utilities:
 *   import { MathInput, PhotoCapture, VoiceInput, latexToSympy } from '@/components/math-input';
 */

export { default as MathInput } from '@/components/solver/MathInput';
export { default as PhotoCapture } from '@/components/solver/PhotoCapture';
export { default as VoiceInput } from './VoiceInput';
export { default as latexToSympy, latexToSympy as latex2sympy } from './latexToSympy';
