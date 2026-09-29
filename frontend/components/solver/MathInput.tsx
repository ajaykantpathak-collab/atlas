'use client';

// ─────────────────────────────────────────────
//  MathInput.tsx — K-12 Math Input for Indian Students
//  Next.js 14 · MathLive + KaTeX · Mobile-first
// ─────────────────────────────────────────────

// MathLive CSS – required for all math rendering
import 'mathlive'; // noqa

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';
import type { MathfieldElement } from 'mathlive';

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────

interface MathInputProps {
  value: string;
  onChange: (latex: string) => void;
  keypadType: 'algebra' | 'calculus' | 'matrix' | 'chemistry' | 'trigonometry' | 'statistics';
  onKeypadTypeChange?: (type: 'algebra' | 'calculus' | 'matrix' | 'chemistry' | 'trigonometry' | 'statistics') => void;
  placeholder?: string;
  label?: string;
  showPreview?: boolean;
  showVoice?: boolean;
  showPhoto?: boolean;
  disabled?: boolean;
}

type KeyKind = 'symbol' | 'command' | 'action' | 'placeholder';

interface KeyDef {
  kind: KeyKind;
  label: string;
  latex?: string;
  cmd?: string;
  icon?: string;
  title?: string;
  wide?: boolean;
  danger?: boolean;
}

interface KeyRow {
  keys: KeyDef[];
}

// ─────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────

const HISTORY_LIMIT = 80;

const VOICE_MATH_MAP: [string, string][] = [
  ['to the power of', '^{#}'],
  ['to the power',     '^{#}'],
  ['raised to',        '^{#}'],
  ['raised to the',    '^{#}'],
  ['square root of',   '\\sqrt{#}'],
  ['square root',      '\\sqrt{#}'],
  ['cube root of',     '\\sqrt[3]{#}'],
  ['cube root',        '\\sqrt[3]{#}'],
  ['nth root of',      '\\sqrt[n]{#}'],
  ['the fraction',     '\\frac{#}{#}'],
  ['plus or minus',    '\\pm'],
  ['plus minus',       '\\pm'],
  ['minus or plus',    '\\mp'],
  ['integral',         '\\int'],
  ['definite integral','\\int_{#}^{#}'],
  ['partial derivative','\\partial'],
  ['partial',          '\\partial'],
  ['derivative of',    '\\frac{d}{dx}'],
  ['derivative',       '\'\''],
  ['double derivative', '\"\"'],
  ['differential dx',  '\\,dx'],
  ['dx',               '\\,dx'],
  ['dy',               '\\,dy'],
  ['sum of',           '\\sum'],
  ['summation',        '\\sum'],
  ['product of',       '\\prod'],
  ['product',          '\\prod'],
  ['infinity',         '\\infty'],
  ['alpha',            '\\alpha'],
  ['beta',             '\\beta'],
  ['gamma',            '\\gamma'],
  ['delta',            '\\delta'],
  ['Delta',            '\\Delta'],
  ['theta',            '\\theta'],
  ['Theta',            '\\Theta'],
  ['lambda',           '\\lambda'],
  ['Lambda',           '\\Lambda'],
  ['mu',               '\\mu'],
  ['pi',               '\\pi'],
  ['sigma',            '\\sigma'],
  ['Sigma',            '\\Sigma'],
  ['rho',              '\\rho'],
  ['phi',              '\\phi'],
  ['Phi',              '\\Phi'],
  ['omega',            '\\omega'],
  ['Omega',            '\\Omega'],
  ['angle',            '\\angle'],
  ['degree',           '\\degree'],
  ['degrees',          '\\degree'],
  ['times',            '\\times'],
  ['multiplied by',    '\\times'],
  ['divided by',       '\\div'],
  ['over',             '\\frac{#}{#}'],
  ['factorial',        '!'],
  ['squared',          '^{2}'],
  ['cubed',            '^{3}'],
  ['to the power two', '^{2}'],
  ['to the power three','^{3}'],
  ['approximately equal to', '\\approx'],
  ['approximately',    '\\approx'],
  ['proportional to',  '\\propto'],
  ['proportional',     '\\propto'],
  ['not equal to',     '\\neq'],
  ['less than or equal to', '\\leq'],
  ['greater than or equal to', '\\geq'],
  ['less than or equal','\\leq'],
  ['greater than or equal','\\geq'],
];

const EXAMPLES: Record<string, string> = {
  algebra:        'x^2 + 2x + 1 = 0',
  calculus:       '\\int_0^1 x^2 \\,dx',
  matrix:         '\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix}',
  chemistry:      'H_2SO_4 + 2NaOH \\rightarrow Na_2SO_4 + 2H_2O',
  trigonometry:   '\\sin(2\\theta) = 2\\sin(\\theta)\\cos(\\theta)',
  statistics:     '\\bar{x} = \\frac{\\sum x_i}{n}',
};

// ─────────────────────────────────────────────
//  KEYPAD DEFINITIONS
// ─────────────────────────────────────────────

const ALGEBRA: KeyRow[] = [
  { keys: [
    { kind: 'symbol',  label: '7' }, { kind: 'symbol', label: '8' },
    { kind: 'symbol',  label: '9' }, { kind: 'symbol', label: '⌫', cmd: 'removePreviousWord', title: 'Backspace', danger: true },
  ]},
  { keys: [
    { kind: 'symbol',  label: '4' }, { kind: 'symbol', label: '5' },
    { kind: 'symbol',  label: '6' }, { kind: 'symbol', label: '−', latex: '-' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '1' }, { kind: 'symbol', label: '2' },
    { kind: 'symbol',  label: '3' }, { kind: 'symbol', label: '+', latex: '+' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '0' }, { kind: 'symbol', label: '.', latex: '.' },
    { kind: 'symbol',  label: 'x', latex: 'x' }, { kind: 'symbol', label: '=', latex: '=' },
  ]},
  { keys: [
    { kind: 'command', label: 'x²', latex: '^{2}', wide: true },
    { kind: 'command', label: 'ⁿ',   latex: '^{#}', wide: true },
    { kind: 'command', label: '√x',  latex: '\\sqrt{#}', wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'xy',  latex: '\\frac{#}{#}' },
    { kind: 'command', label: '|x|', latex: '|#|' },
    { kind: 'command', label: 'a/b', latex: '\\frac{#}{#}' },
    { kind: 'command', label: '…',   latex: '\\cdots' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '(', latex: '(' },
    { kind: 'symbol',  label: ')', latex: ')' },
    { kind: 'symbol',  label: 'a', latex: 'a' },
    { kind: 'symbol',  label: 'b', latex: 'b' },
    { kind: 'symbol',  label: 'c', latex: 'c' },
    { kind: 'symbol',  label: 'y', latex: 'y' },
  ]},
];

const CALCULUS: KeyRow[] = [
  { keys: [
    { kind: 'command', label: '∫',    latex: '\\int', wide: true },
    { kind: 'command', label: '∫∫',   latex: '\\iint', wide: true },
    { kind: 'command', label: '∮',    latex: '\\oint', wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'd/dx', latex: '\\frac{d}{dx}', wide: true },
    { kind: 'command', label: '∂',    latex: '\\partial', wide: true },
    { kind: 'command', label: 'dy/dx',latex: '\\frac{dy}{dx}', wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'lim',  latex: '\\lim_{#}', wide: true },
    { kind: 'command', label: '∑',    latex: '\\sum_{#}^{#}', wide: true },
    { kind: 'command', label: '∏',    latex: '\\prod_{#}^{#}', wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'd/dx f', latex: 'f\'\'' },
    { kind: 'command', label: 'd²/dx²', latex: 'f\"\"' },
    { kind: 'command', label: 'f(n)',   latex: '^{(n)}' },
    { kind: 'command', label: 'dx',     latex: '\\,dx' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '∞',  latex: '\\infty' },
    { kind: 'symbol',  label: '→',  latex: '\\rightarrow' },
    { kind: 'symbol',  label: '⇒',  latex: '\\Rightarrow' },
    { kind: 'symbol',  label: '≈',  latex: '\\approx' },
  ]},
  { keys: [
    { kind: 'command', label: 'eˣ',   latex: 'e^{#}' },
    { kind: 'command', label: 'ln(x)',latex: '\\ln(#)' },
    { kind: 'command', label: 'log',  latex: '\\log_{#}(#)' },
    { kind: 'command', label: 'e',    latex: 'e' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '(' }, { kind: 'symbol', label: ')' },
    { kind: 'symbol',  label: '+' }, { kind: 'symbol', label: '−' },
    { kind: 'symbol',  label: '·' }, { kind: 'symbol', label: '/' },
  ]},
];

const MATRIX: KeyRow[] = [
  { keys: [
    { kind: 'command', label: '2×2',  latex: '\\begin{matrix} # & # \\\\ # & # \\end{matrix}', title: '2×2 Matrix' },
    { kind: 'command', label: '3×3',  latex: '\\begin{matrix} # & # & # \\\\ # & # & # \\\\ # & # & # \\end{matrix}', title: '3×3 Matrix' },
    { kind: 'command', label: '2×3',  latex: '\\begin{matrix} # & # & # \\\\ # & # & # \\end{matrix}', title: '2×3 Matrix' },
  ]},
  { keys: [
    { kind: 'command', label: '[ ]',   latex: '\\begin{bmatrix} # \\end{bmatrix}' },
    { kind: 'command', label: '( )',   latex: '\\begin{pmatrix} # \\end{pmatrix}' },
    { kind: 'command', label: '|  |',  latex: '\\begin{vmatrix} # \\end{vmatrix}' },
    { kind: 'command', label: '|| ||', latex: '\\begin{Vmatrix} # \\end{Vmatrix}' },
  ]},
  { keys: [
    { kind: 'command', label: '\\',  latex: '\\\\' },
    { kind: 'symbol',  label: '&',    latex: '&' },
    { kind: 'symbol',  label: 'det',  latex: '\\det' },
    { kind: 'symbol',  label: 'tr',   latex: '\\text{tr}' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'A',  latex: 'A' }, { kind: 'symbol', label: 'B', latex: 'B' },
    { kind: 'symbol',  label: 'C',  latex: 'C' }, { kind: 'symbol', label: 'I', latex: 'I' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'i₁₁', latex: '_{11}' },
    { kind: 'symbol',  label: 'i₁₂', latex: '_{12}' },
    { kind: 'symbol',  label: 'i₂₁', latex: '_{21}' },
    { kind: 'symbol',  label: 'i₂₂', latex: '_{22}' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'A⁻¹', latex: '^{-1}' },
    { kind: 'symbol',  label: 'Aᵀ',  latex: '^{T}' },
    { kind: 'symbol',  label: '|A|', latex: '|A|' },
    { kind: 'command', label: '|x|', latex: '|#|' },
  ]},
  { keys: [
    { kind: 'command', label: '{',  latex: '\\left\u007B' },
    { kind: 'command', label: '}',  latex: '\\right\u007D' },
    { kind: 'symbol',  label: '×',  latex: '\\times' },
    { kind: 'symbol',  label: '·',  latex: '\\cdot' },
    { kind: 'symbol',  label: '±',  latex: '\\pm' },
    { kind: 'symbol',  label: '∓',  latex: '\\mp' },
  ]},
];

const CHEMISTRY: KeyRow[] = [
  { keys: [
    { kind: 'symbol',  label: 'H' }, { kind: 'symbol', label: 'O' },
    { kind: 'symbol',  label: 'C' }, { kind: 'symbol', label: 'N' },
    { kind: 'symbol',  label: 'S' }, { kind: 'symbol', label: 'Na' },
  ]},
  { keys: [
    { kind: 'command', label: '₁',  latex: '_',   title: 'Subscript' },
    { kind: 'command', label: '₁₀', latex: '^{10}', title: 'Superscript' },
    { kind: 'command', label: 'H₂O',latex: '_{#}^{#}', title: 'Sub + Super' },
    { kind: 'command', label: 'H⁺', latex: '^{+}' },
    { kind: 'command', label: 'OH⁻',latex: '^{-}' },
    { kind: 'command', label: '⁺',  latex: '^{+}' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '→',  latex: '\\rightarrow' },
    { kind: 'symbol',  label: '⇌',  latex: '\\rightleftharpoons' },
    { kind: 'symbol',  label: '⇢',  latex: '\\rightarrow' },
    { kind: 'symbol',  label: '△',  latex: '\\Delta' },
    { kind: 'command', label: '+ Heat', latex: '\\xrightarrow{\\Delta}' },
  ]},
  { keys: [
    { kind: 'command', label: '(g)',  latex: '_{(g)}' },
    { kind: 'command', label: '(l)',  latex: '_{(l)}' },
    { kind: 'command', label: '(s)',  latex: '_{(s)}' },
    { kind: 'command', label: '(aq)', latex: '_{(aq)}' },
    { kind: 'command', label: '(g)',  latex: '_{(g)}' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'Cl' }, { kind: 'symbol', label: 'Br' },
    { kind: 'symbol',  label: 'Fe' }, { kind: 'symbol', label: 'Cu' },
    { kind: 'symbol',  label: 'Zn' }, { kind: 'symbol', label: 'Ca' },
  ]},
  { keys: [
    { kind: 'symbol',  label: '+',  latex: '+' },
    { kind: 'symbol',  label: '−',  latex: '-' },
    { kind: 'symbol',  label: '⇌',  latex: '\\rightleftharpoons' },
    { kind: 'command', label: 'molar', latex: 'M' },
    { kind: 'command', label: '°C',  latex: '\\degree\\text{C}' },
  ]},
];

const TRIGONOMETRY: KeyRow[] = [
  { keys: [
    { kind: 'command', label: 'sin θ',  latex: '\\sin\\left(#\\right)', wide: true },
    { kind: 'command', label: 'cos θ',  latex: '\\cos\\left(#\\right)', wide: true },
    { kind: 'command', label: 'tan θ',  latex: '\\tan\\left(#\\right)', wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'cosec θ',latex: '\\csc\\left(#\\right)', wide: true },
    { kind: 'command', label: 'sec θ',  latex: '\\sec\\left(#\\right)', wide: true },
    { kind: 'command', label: 'cot θ',  latex: '\\cot\\left(#\\right)', wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'sin⁻¹',  latex: '\\sin^{-1}\\left(#\\right)' },
    { kind: 'command', label: 'cos⁻¹',  latex: '\\cos^{-1}\\left(#\\right)' },
    { kind: 'command', label: 'tan⁻¹',  latex: '\\tan^{-1}\\left(#\\right)' },
    { kind: 'command', label: 'cot⁻¹',  latex: '\\cot^{-1}\\left(#\\right)' },
  ]},
  { keys: [
    { kind: 'command', label: 'sinh',   latex: '\\sinh(#)' },
    { kind: 'command', label: 'cosh',   latex: '\\cosh(#)' },
    { kind: 'command', label: 'tanh',   latex: '\\tanh(#)' },
    { kind: 'command', label: 'csch',   latex: '\\csch(#)' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'θ',  latex: '\\theta' },
    { kind: 'symbol',  label: 'φ',  latex: '\\phi' },
    { kind: 'symbol',  label: 'α',  latex: '\\alpha' },
    { kind: 'symbol',  label: 'β',  latex: '\\beta' },
    { kind: 'symbol',  label: 'π',  latex: '\\pi' },
    { kind: 'symbol',  label: '°',  latex: '\\degree' },
  ]},
  { keys: [
    { kind: 'command', label: 'sin²θ',  latex: '\\sin^{2}\\left(#\\right)' },
    { kind: 'command', label: 'cos²θ',  latex: '\\cos^{2}\\left(#\\right)' },
    { kind: 'command', label: 'tan²θ',  latex: '\\tan^{2}\\left(#\\right)' },
    { kind: 'command', label: '2θ',     latex: '2\\theta' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'sin2θ', latex: '\\sin 2\\theta' },
    { kind: 'symbol',  label: 'cos2θ', latex: '\\cos 2\\theta' },
    { kind: 'symbol',  label: '1−cos²',latex: '1-\\cos^{2}' },
    { kind: 'symbol',  label: '1+cos2θ',latex:'1+\\cos 2\\theta' },
  ]},
];

const STATISTICS: KeyRow[] = [
  { keys: [
    { kind: 'symbol',  label: 'x̄',   latex: '\\bar{x}' },
    { kind: 'symbol',  label: 'x̃',   latex: '\\tilde{x}' },
    { kind: 'symbol',  label: 'x̂',   latex: '\\hat{x}' },
    { kind: 'symbol',  label: 'x′',   latex: 'x\' ' },
    { kind: 'symbol',  label: 'x″',   latex: 'x\"\"' },
    { kind: 'symbol',  label: 'x*',   latex: 'x^{*}' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'μ',    latex: '\\mu' },
    { kind: 'symbol',  label: 'σ',    latex: '\\sigma' },
    { kind: 'symbol',  label: 'σ²',   latex: '\\sigma^{2}' },
    { kind: 'symbol',  label: 'ρ',    latex: '\\rho' },
    { kind: 'symbol',  label: 'λ',    latex: '\\lambda' },
  ]},
  { keys: [
    { kind: 'symbol',  label: 'N',    latex: 'N' },
    { kind: 'symbol',  label: 'n',    latex: 'n' },
    { kind: 'symbol',  label: 'f',    latex: 'f' },
    { kind: 'symbol',  label: 'Σ',    latex: '\\sum' },
    { kind: 'symbol',  label: 'xᵢ',   latex: 'x_{i}' },
  ]},
  { keys: [
    { kind: 'command', label: 'Σx',    latex: '\\sum x',    wide: true },
    { kind: 'command', label: 'Σx²',   latex: '\\sum x^{2}', wide: true },
    { kind: 'command', label: 'Σxy',   latex: '\\sum xy',   wide: true },
  ]},
  { keys: [
    { kind: 'command', label: 'P(A)',  latex: 'P\\left(A\\right)' },
    { kind: 'command', label: 'P(A∩B)',latex:'P\\left(A\\cap B\\right)' },
    { kind: 'command', label: 'P(A∪B)',latex:'P\\left(A\\cup B\\right)' },
    { kind: 'command', label: 'nCr',   latex: '{#}^{C}_{#}' },
  ]},
  { keys: [
    { kind: 'command', label: 'nPr',   latex: '{#}^{P}_{#}' },
    { kind: 'command', label: 'n!',    latex: '{#}!' },
    { kind: 'command', label: 'Mean',  latex: '\\bar{x}=\\frac{\\sum x_i}{n}' },
    { kind: 'command', label: 'SD',    latex: '\\sigma=\\sqrt{\\frac{\\sum(x_i-\\bar{x})^{2}}{n}}' },
  ]},
  { keys: [
    { kind: 'command', label: 'x̄ ± σ',latex:'\\bar{x} \\pm \\sigma' },
    { kind: 'command', label: 'H₀',   latex: 'H_{0}' },
    { kind: 'command', label: 'H₁',   latex: 'H_{1}' },
    { kind: 'command', label: 'α',    latex: '\\alpha' },
    { kind: 'command', label: 'β',    latex: '\\beta' },
    { kind: 'command', label: 'p̂',    latex: '\\hat{p}' },
  ]},
];

const KEYPADS: Record<string, KeyRow[]> = {
  algebra:        ALGEBRA,
  calculus:       CALCULUS,
  matrix:         MATRIX,
  chemistry:      CHEMISTRY,
  trigonometry:   TRIGONOMETRY,
  statistics:     STATISTICS,
};

const KEYPAD_LABELS: Record<string, string> = {
  algebra:      'Algebra',
  calculus:     'Calculus',
  matrix:       'Matrix',
  chemistry:    'Chemistry',
  trigonometry: 'Trigonometry',
  statistics:   'Statistics',
};

// ─────────────────────────────────────────────
//  MATH TEXT → LaTeX
// ─────────────────────────────────────────────

function speechToLatex(text: string): string {
  let latex = text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  for (const [phrase, replacement] of VOICE_MATH_MAP) {
    const regex = new RegExp(phrase.replace(/[{}[\]().+*?^$|]/g, '\\$&'), 'gi');
    latex = latex.replace(regex, replacement.replace(/#/g, 'x'));
  }

  // Handle spoken numbers → digits
  latex = latex
    .replace(/\bzero\b/g, '0').replace(/\bone\b/g, '1')
    .replace(/\btwo\b/g, '2').replace(/\bthree\b/g, '3')
    .replace(/\bfour\b/g, '4').replace(/\bfive\b/g, '5')
    .replace(/\bsix\b/g, '6').replace(/\bseven\b/g, '7')
    .replace(/\beight\b/g, '8').replace(/\bnine\b/g, '9')
    .replace(/\bten\b/g, '10')
    // Clean up fragments
    .replace(/\bof\b/g, '').replace(/\bthe\b/g, '')
    .replace(/\ba\b/g, '').replace(/\ban\b/g, '')
    .replace(/\bsquared\b/g, '^{2}').replace(/\bcubed\b/g, '^{3}')
    .replace(/\s+/g, ' ').trim();

  return latex;
}

// Very simple math-OCR heuristic (for photo input).
// Production: replace with Mathpix / server-side OCR.
function ocrToLatex(text: string): string {
  if (!text || !text.trim()) return '';
  let s = text.trim()
    .replace(/\bsquared\b/gi, '^2').replace(/\bcubed\b/gi, '^3')
    .replace(/\bover\b/gi, '\\frac{#}{#}')
    .replace(/\bsqrt\b/gi, '\\sqrt{#}')
    .replace(/\bsin\b/gi, '\\sin').replace(/\bcos\b/gi, '\\cos')
    .replace(/\btan\b/gi, '\\tan').replace(/\blog\b/gi, '\\log')
    .replace(/\bln\b/gi, '\\ln').replace(/\bpi\b/gi, '\\pi')
    .replace(/\balpha\b/gi, '\\alpha').replace(/\bbeta\b/gi, '\\beta')
    .replace(/\btheta\b/gi, '\\theta')
    .replace(/\^2/g, '^{2}').replace(/\^3/g, '^{3}')
    .replace(/\//g, '\\frac{#}{#}')
    .replace(/\.\.\./g, '\\cdots').replace(/\.\./g, '\\ldots');
  return s;
}

// ─────────────────────────────────────────────
//  KEYBOARD SHORTCUTS
// ─────────────────────────────────────────────

const SHORTCUTS: Record<string, { label: string; action: () => void }> = {
  'Control-KeyZ':         { label: 'Undo',          action: () => {} },
  'Control-KeyY':         { label: 'Redo',          action: () => {} },
  'Control-Shift-KeyZ':   { label: 'Redo',          action: () => {} },
  'Control-KeyB':         { label: 'Bold (×)',      action: () => {} },
  'Control-KeyI':         { label: 'Italic (÷)',    action: () => {} },
  'Control-KeyA':         { label: 'Select All',    action: () => {} },
  'Control-KeyC':         { label: 'Copy',          action: () => {} },
  'Control-KeyV':         { label: 'Paste LaTeX',   action: () => {} },
  'Control-KeyX':         { label: 'Cut',           action: () => {} },
};

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────

export default function MathInput({
  value,
  onChange,
  keypadType,
  onKeypadTypeChange,
  placeholder = 'Type your math expression…',
  label,
  showPreview  = true,
  showVoice    = true,
  showPhoto    = true,
  disabled     = false,
}: MathInputProps) {
  // ── state ────────────────────────────────────
  const [mfReady, setMfReady]             = useState(false);
  const [isListening, setIsListening]       = useState(false);
  const [transcript, setTranscript]         = useState('');
  const [history, setHistory]               = useState<string[]>([]);
  const [histIdx, setHistIdx]               = useState(-1);
  const [isReady, setIsReady]               = useState(false);

  // ── refs ─────────────────────────────────────
  const mfRef        = useRef<MathfieldElement | null>(null);
  const previewRef   = useRef<HTMLDivElement>(null);
  const rafRef       = useRef<number>(0);
  const keypadScroll = useRef<HTMLDivElement>(null);
  const lastInsert   = useRef<HTMLSpanElement | null>(null);
  const synthRef     = useRef<SpeechSynthesis | null>(null);
  const recRef       = useRef<any>(null);

  // ─────────────────────────────────────────────
  //  HAPTIC FEEDBACK
  // ─────────────────────────────────────────────
  const haptic = useCallback((style: 'light' | 'medium' | 'heavy' = 'light') => {
    if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
    const map = { light: 8, medium: 15, heavy: 25 } as const;
    (navigator as any).vibrate?.(map[style]);
  }, []);

  // ─────────────────────────────────────────────
  //  HISTORY (undo / redo)
  // ─────────────────────────────────────────────
  const pushHistory = useCallback((latex: string) => {
    setHistory(prev => {
      const trimmed = prev.slice(0, histIdx + 1);
      return [...trimmed, latex].slice(-HISTORY_LIMIT);
    });
    setHistIdx(i => Math.min(i + 1, HISTORY_LIMIT - 1));
  }, [histIdx]);

  // Sync history index after it updates
  useEffect(() => {
    if (history.length > 0) {
      setHistIdx(history.length - 1);
    }
  }, [history.length]);

  const undo = useCallback(() => {
    if (histIdx > 0) {
      const prev = history[histIdx - 1];
      setHistIdx(i => i - 1);
      mfRef.current?.setValue(prev);
      onChange(prev);
      haptic('light');
    }
  }, [histIdx, history, onChange, haptic]);

  const redo = useCallback(() => {
    if (histIdx < history.length - 1) {
      const next = history[histIdx + 1];
      setHistIdx(i => i + 1);
      mfRef.current?.setValue(next);
      onChange(next);
      haptic('light');
    }
  }, [histIdx, history, onChange, haptic]);

  // ─────────────────────────────────────────────
  //  MATHFIELD INIT
  // ─────────────────────────────────────────────
  useEffect(() => {
    const mf = mfRef.current;
    if (!mf) return;

    // Initialize value if empty
    if (!mf.value && value) {
      mf.value = value;
    }

    // Seed history
    if (history.length === 0) {
      const initVal = mf.value || value || '';
      setHistory([initVal]);
      setHistIdx(0);
    }

    const onInput = () => {
      const lx = mf.value;
      onChange(lx);
      pushHistory(lx);
      // Debounced KaTeX render
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderKaTeX(lx));
    };

    const onFocus = () => {
      haptic('light');
      mf.style.setProperty('--caret-color', '#ec4899');
    };

    mf.addEventListener('input', onInput);
    mf.addEventListener('focus', onFocus);

    setMfReady(true);
    setIsReady(true);
    renderKaTeX(mf.value || value || '');

    return () => {
      mf.removeEventListener('input', onInput);
      mf.removeEventListener('focus', onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update mathfield when external value changes
  useEffect(() => {
    if (mfRef.current && value !== mfRef.current.value) {
      mfRef.current.value = value;
      renderKaTeX(value || '');
    }
  }, [value]);

  // Re-render preview on keypadType change
  useEffect(() => {
    renderKaTeX(mfRef.current?.value || value || '');
  }, [keypadType, value]);

  // ─────────────────────────────────────────────
  //  KEYBOARD SHORTCUTS
  // ─────────────────────────────────────────────
  useEffect(() => {
    const mf = mfRef.current;
    if (!mf) return;

    const handler = (e: KeyboardEvent) => {
      const combo = [
        e.ctrlKey || e.metaKey ? 'Control' : null,
        e.shiftKey ? 'Shift' : null,
        e.altKey ? 'Alt' : null,
        e.code,
      ].filter(Boolean).join('-');

      const shortcut = SHORTCUTS[combo];
      if (shortcut) {
        e.preventDefault();
        haptic('light');
        if (combo.includes('KeyZ') && !e.shiftKey) undo();
        else if ((combo.includes('KeyZ') && e.shiftKey) || combo.includes('KeyY')) redo();
        else if (combo === 'Control-KeyB') insertCmd('\\times');
        else if (combo === 'Control-KeyI') insertCmd('\\div');
      }
    };

    mf.addEventListener('keydown', handler as any);
    return () => mf.removeEventListener('keydown', handler as any);
  }, [undo, redo, haptic]);

  // ─────────────────────────────────────────────
  //  PASTE HANDLER
  // ─────────────────────────────────────────────
  useEffect(() => {
    const mf = mfRef.current;
    if (!mf) return;

    const onPaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData('text/plain') || '';
      if (text && (text.startsWith('\\') || text.startsWith('$') || text.includes('\\frac'))) {
        e.preventDefault();
        const clean = text.replace(/^\$+\|\$+$/g, '').trim();
        mf.executeCommand(['insert', clean]);
        haptic('medium');
        setTimeout(() => renderKaTeX(mf.value), 50);
      }
    };

    mf.addEventListener('paste', onPaste);
    return () => mf.removeEventListener('paste', onPaste);
  }, [haptic]);

  // ─────────────────────────────────────────────
  //  VOICE INPUT (Web Speech API)
  // ─────────────────────────────────────────────
  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert('Voice input not supported in this browser. Please use Chrome.');
      return;
    }

    const recognition = new SR();
    recognition.continuous     = true;
    recognition.interimResults = true;
    recognition.lang           = 'en-IN'; // Indian English

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('Listening…');
      haptic('medium');
    };

    recognition.onresult = (event: any) => {
      let interim = '';
      let final   = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += t;
        else interim += t;
      }
      const combined = (final || interim).trim();
      setTranscript(combined || 'Listening…');
      if (final) {
        const lx = speechToLatex(final);
        mfRef.current?.executeCommand(['insert', lx]);
        haptic('heavy');
        setTimeout(() => {
          if (mfRef.current) renderKaTeX(mfRef.current.value);
        }, 60);
      }
    };

    recognition.onerror = (e: any) => {
      if (e.error === 'not-allowed') {
        alert('Microphone permission denied. Please allow mic access in browser settings.');
      } else if (e.error !== 'aborted' && e.error !== 'no-speech') {
        console.warn('Speech error:', e.error);
      }
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      setTranscript('');
    };

    recRef.current = recognition;
    recognition.start();
  }, [haptic]);

  const stopListening = useCallback(() => {
    try { recRef.current?.stop(); } catch {}
    setIsListening(false);
    setTranscript('');
  }, []);

  const toggleVoice = useCallback(() => {
    isListening ? stopListening() : startListening();
  }, [isListening, startListening, stopListening]);

  useEffect(() => () => { try { recRef.current?.stop(); } catch {} }, []);

  // ─────────────────────────────────────────────
  //  PHOTO INPUT
  // ─────────────────────────────────────────────
  const handlePhoto = useCallback(() => {
    const input = document.createElement('input');
    input.type      = 'file';
    input.accept    = 'image/*';
    input.capture   = 'environment';

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      haptic('medium');

      try {
        // Production: server-side Mathpix / Google Cloud Vision OCR
        // Placeholder: local Tesseract (install: npm i tesseract.js)
        // import Tesseract from 'tesseract.js';
        // const { data } = await Tesseract.recognize(file, 'eng+equ');
        // const lx = ocrToLatex(data.text);

        setTranscript('📷 Processing image…');
        await new Promise(r => setTimeout(r, 800));
        const sampleLatex = '\\frac{a}{b} + \\sqrt{c} = d';
        mfRef.current?.executeCommand?.(['insert', sampleLatex]);
        haptic('heavy');
        setTranscript('');
        setTimeout(() => {
          if (mfRef.current) renderKaTeX(mfRef.current.value);
        }, 60);
      } catch {
        setTranscript('Could not read image. Please type instead.');
        setTimeout(() => setTranscript(''), 3000);
      }
    };

    input.click();
  }, [haptic]);

  // ─────────────────────────────────────────────
  //  MATHFIELD COMMANDS
  // ─────────────────────────────────────────────
  const insertCmd = useCallback((latex: string, moveCursor = true) => {
    const mf = mfRef.current;
    if (!mf) return;
    haptic('light');
    mf.executeCommand?.('insert', latex);
    if (moveCursor) {
      // Skip past placeholder markers
      const placeholders = (latex.match(/#/g) || []).length;
      if (placeholders > 0) {
        for (let i = 0; i < placeholders; i++) {
          mf.executeCommand?.('moveToNextPlaceholder');
        }
      }
    }
    setTimeout(() => {
      const lx = mf.value;
      onChange(lx);
      pushHistory(lx);
      renderKaTeX(lx);
    }, 40);
  }, [haptic, onChange, pushHistory]);

  const insertSymbol = useCallback((latex: string) => {
    insertCmd(latex);
  }, [insertCmd]);

  // Matrix template insertion
  const insertMatrix = useCallback((latex: string) => {
    const mf = mfRef.current;
    if (!mf) return;
    haptic('medium');
    // Replace first # with a tab character to create first cell
    const processed = latex.replace(/#/, '\\\\phantom{x}');
    mf.executeCommand?.('insert', processed);
    setTimeout(() => {
      const lx = mf.value;
      onChange(lx);
      pushHistory(lx);
      renderKaTeX(lx);
    }, 50);
  }, [haptic, onChange, pushHistory]);

  // Wrap selection in a command template
  const wrapSelection = useCallback((before: string, after = '') => {
    const mf = mfRef.current;
    if (!mf) return;
    haptic('light');

    const sel = mf.getValue(mf.selection as any);
    if (sel.trim()) {
      mf.executeCommand?.('insert', before + sel + after);
    } else {
      mf.executeCommand?.('insert', before + '#' + after);
    }
    setTimeout(() => {
      const lx = mf.value;
      onChange(lx);
      pushHistory(lx);
      renderKaTeX(lx);
    }, 40);
  }, [haptic, onChange, pushHistory]);

  const handleKeyTap = useCallback((key: KeyDef) => {
    switch (key.kind) {
      case 'symbol':   insertSymbol(key.latex!); break;
      case 'command':
        if (key.cmd === 'removePreviousWord') {
          mfRef.current?.executeCommand?.('deletePreviousWord');
          haptic('light');
        } else if (key.latex?.includes('matrix') || key.latex?.includes('bmatrix') || key.latex?.includes('pmatrix')) {
          insertMatrix(key.latex);
        } else {
          insertCmd(key.latex!);
        }
        break;
      case 'action':   // placeholders — not used
        break;
    }
  }, [insertSymbol, insertCmd, insertMatrix, haptic]);

  // ─────────────────────────────────────────────
  //  UTILITY ACTIONS
  // ─────────────────────────────────────────────
  const handleClear = useCallback(() => {
    if (!mfRef.current) return;
    haptic('medium');
    mfRef.current.setValue('');
    onChange('');
    setHistory(['']);
    setHistIdx(0);
    renderKaTeX('');
  }, [onChange, haptic]);

  const handleUndo = useCallback(() => {
    haptic('light');
    undo();
  }, [undo, haptic]);

  const handleRedo = useCallback(() => {
    haptic('light');
    redo();
  }, [redo, haptic]);

  const loadExample = useCallback(() => {
    const ex = EXAMPLES[keypadType] || '';
    haptic('medium');
    mfRef.current?.setValue(ex);
    onChange(ex);
    setHistory([ex]);
    setHistIdx(0);
    setTimeout(() => renderKaTeX(ex), 50);
  }, [keypadType, onChange, haptic]);

  const copyLatex = useCallback(() => {
    const lx = mfRef.current?.value || value;
    if (!lx) return;
    haptic('medium');
    navigator.clipboard.writeText(lx).catch(() => {});
  }, [value, haptic]);

  // ─────────────────────────────────────────────
  //  KATEX RENDER
  // ─────────────────────────────────────────────
  const renderKaTeX = useCallback((latex: string) => {
    if (!previewRef.current) return;
    if (!latex || !latex.trim()) {
      previewRef.current.innerHTML =
        '<span class=\'text-slate-600 text-sm italic\'>Live preview — start typing…</span>';
      return;
    }
    try {
      katex.render(latex, previewRef.current, {
        displayMode:    true,
        throwOnError:   false,
        strict:         false,
        trust:          false,
        output:         'html',
        macros:         { '\\eq': '\\equiv' },
      });
    } catch {
      previewRef.current.innerHTML =
        `<span class=\'text-red-400 text-xs font-mono\'>${latex.replace(/</g,'&lt;')}</span>`;
    }
  }, []);

  // ─────────────────────────────────────────────
  //  MEMOISED KEYPAD
  // ─────────────────────────────────────────────
  const currentKeypad = useMemo(() => KEYPADS[keypadType] || ALGEBRA, [keypadType]);

  // ─────────────────────────────────────────────
  //  KEYPAD BUTTON RENDERER
  // ─────────────────────────────────────────────
  const renderKey = (key: KeyDef, idx: number) => {
    if (key.kind === 'placeholder') {
      return (
        <div
          key={idx}
          className={
            'flex items-center justify-center rounded-xl ' +
            'bg-slate-700/20 text-slate-600 text-xs select-none '
          }
          style={{ height: 44, flex: key.wide ? 2.2 : 1.4 }}
          aria-hidden="true"
        >
          {key.label}
        </div>
      );
    }

    const base =
      'flex items-center justify-center rounded-xl text-sm font-semibold ' +
      'transition-all duration-150 select-none outline-none ' +
      'min-h-[44px] active:scale-[0.92] ' +
      (key.wide ? 'flex-[2.2] ' : 'flex-1 ') +
      (key.danger
        ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
        : 'bg-slate-700/60 text-slate-200 border border-slate-600/60 hover:bg-gold-500/30 hover:text-white hover:border-gold-400/60 active:bg-gold-500/50');

    const icon = key.icon && <span aria-hidden="true">{key.icon}</span>;
    const label = key.label;

    return (
      <motion.button
        key={idx}
        type="button"
        className={base}
        style={{ minHeight: 44 }}
        onClick={() => { handleKeyTap(key); haptic('light'); }}
        onTouchStart={() => haptic('light')}
        title={key.title || key.label}
        aria-label={key.title || key.label}
        tabIndex={0}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {icon}
        <span>{label}</span>
      </motion.button>
    );
  };

  // ─────────────────────────────────────────────
  //  RENDER
  // ─────────────────────────────────────────────
  const keypadTypeLabel = KEYPAD_LABELS[keypadType] || 'Algebra';
  const isVoiceActive   = isListening;

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* ── Glass Card ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(30,41,59,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(99,102,241,0.25)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset',
        }}
      >
        {/* ══════════ HEADER ══════════ */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-center gap-2">
            {label && (
              <label
                id="mathinput-label"
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ color: '#818cf8' }}
              >
                {label}
              </label>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}>
              {keypadTypeLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Undo */}
            <ToolBtn icon="↩" label="Undo" onClick={handleUndo} />
            {/* Redo */}
            <ToolBtn icon="↪" label="Redo" onClick={handleRedo} />
            {/* Clear */}
            <ToolBtn icon="✕" label="Clear" onClick={handleClear} accent />
            {/* Example */}
            <ToolBtn icon="💡" label="Example" onClick={loadExample} />
            {/* Copy LaTeX */}
            <ToolBtn icon="📋" label="Copy LaTeX" onClick={copyLatex} />
          </div>
        </div>

        {/* ══════════ MATHFIELD ══════════ */}
        <div className="px-4 pt-3 pb-1">
          <div
            id="mathinput-label-visual"
            className="sr-only"
          >
            {label || 'Math expression input'}
          </div>

          {/*
            MathLive VirtualKeyboard – we disable it (virtualKeyboardMode: 'manual')
            and show nothing, because we render our own custom keypad below.
            The VirtualKeyboard component itself is imported but not mounted.
          */}

          <div className="relative">
            <math-field
              ref={mfRef as any}
              id="math-mathfield"
              aria-labelledby="mathinput-label mathinput-label-visual"
              aria-describedby="mathinput-status"
              virtual-keyboard-mode="manual"
              smart-fence={true}
              {...({ 'smart-superscript': true, 'inline-shortcut-timeout': 180, disabled } as any)}
              placeholder={placeholder}
              className={
                'w-full rounded-xl outline-none text-lg '
                + 'transition-colors duration-200 '
                + (disabled
                  ? 'opacity-50 cursor-not-allowed '
                  : 'cursor-text ')
              }
              style={{
                minHeight: 60,
                padding: '12px 14px',
                fontFamily: 'system-ui, sans-serif',
                '--font-size': '18px',
                '--input-x-arrow-color': '#6366f1',
                '--caret-color': '#ec4899',
                '--selection-background-color': 'rgba(99,102,241,0.3)',
                color: '#f1f5f9',
                background: 'rgba(15,23,42,0.6)',
              } as any}
            />

            {/* Voice transcript overlay */}
            <AnimatePresence>
              {isVoiceActive && transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute -bottom-7 left-2 right-2 flex items-center gap-1.5"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-[11px] text-red-300 italic truncate">
                    {transcript}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ══════════ KATEX PREVIEW ══════════ */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                    Live Preview
                  </span>
                </div>
                <div
                  ref={previewRef}
                  id="mathinput-preview"
                  aria-live="polite"
                  aria-atomic="true"
                  className="min-h-[36px] py-2 px-3 rounded-lg overflow-x-auto"
                  style={{
                    background: 'rgba(15,23,42,0.5)',
                    color: '#e2e8f0',
                    fontFamily: 'KaTeX_Main, system-ui, sans-serif',
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════ KEYPAD TYPE SELECTOR ══════════ */}
        <div className="px-4 pt-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Keypad type selector"
          >
            {Object.entries(KEYPAD_LABELS).map(([type, label]) => {
              const isActive = keypadType === type;
              return (
                <button
                  key={type}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="math-keypad-panel"
                  onClick={() => {
                    haptic('light');
                    onKeypadTypeChange?.(type as typeof keypadType);
                  }}
                  className={
                    'whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium '
                    + 'transition-all duration-200 outline-none '
                    + 'min-h-[36px] '
                    + (isActive
                      ? 'text-white shadow-lg'
                      : 'text-slate-400 hover:text-slate-200')
                  }
                  style={isActive
                    ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }
                    : { background: 'rgba(51,65,85,0.5)' }}
                  tabIndex={0}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════ KEYPAD ══════════ */}
        <div
          id="math-keypad-panel"
          ref={keypadScroll}
          role="group"
          aria-label="Math keypad"
          className="px-4 pt-2 pb-4"
          style={{ touchAction: 'manipulation' }}
        >
          <div className="flex flex-col gap-1.5">
            {currentKeypad.map((row, ri) => (
              <motion.div
                key={ri}
                className="flex gap-1.5"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.025, duration: 0.18 }}
              >
                {row.keys.map((key, ki) => renderKey(key, ki))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════ FOOTER ══════════ */}
        <div
          className="flex items-center justify-between px-4 py-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            {showVoice && (
              <motion.button
                type="button"
                onClick={toggleVoice}
                className={
                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium '
                  + 'transition-all duration-200 outline-none min-h-[40px] '
                  + (isVoiceActive
                    ? 'bg-red-500/30 text-red-200 border border-red-500/50'
                    : 'bg-slate-700/60 text-slate-300 border border-slate-600/60 hover:bg-slate-600/80')
                }
                aria-label={isVoiceActive ? 'Stop voice input' : 'Start voice input'}
                aria-pressed={isVoiceActive}
                whileTap={{ scale: 0.94 }}
                title="Voice input — speak your equation"
              >
                <span aria-hidden="true">{isVoiceActive ? '🔴' : '🎤'}</span>
                <span className="hidden sm:inline">
                  {isVoiceActive ? 'Stop' : 'Voice'}
                </span>
              </motion.button>
            )}

            {showPhoto && (
              <motion.button
                type="button"
                onClick={handlePhoto}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-700/60 text-slate-300 border border-slate-600/60 hover:bg-slate-600/80 transition-all outline-none min-h-[40px]"
                aria-label="Photo input — take a picture of an equation"
                whileTap={{ scale: 0.94 }}
                title="Photo input"
              >
                <span aria-hidden="true">📷</span>
                <span className="hidden sm:inline">Photo</span>
              </motion.button>
            )}
          </div>

          <span
            id="mathinput-status"
            className="text-[11px] text-slate-600 font-mono truncate max-w-[140px]"
            aria-live="polite"
            aria-atomic="true"
          >
            {mfReady ? '✓ MathLive' : '⏳ Loading…'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────
//  SMALL TOOL BUTTON HELPER
// ─────────────────────────────────────────────

function ToolBtn({
  icon,
  label,
  onClick,
  accent = false,
}: {
  icon: string;
  label: string;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={
        'flex items-center justify-center rounded-lg '
        + 'text-sm transition-all duration-150 outline-none '
        + 'min-h-[36px] min-w-[36px] '
        + (accent
          ? 'text-red-300 hover:bg-red-500/20 border border-red-500/30'
          : 'text-slate-400 hover:text-white hover:bg-slate-700/80 border border-transparent')
      }
      title={label}
      aria-label={label}
      tabIndex={0}
      whileTap={{ scale: 0.88 }}
    >
      <span aria-hidden="true">{icon}</span>
    </motion.button>
  );
}
