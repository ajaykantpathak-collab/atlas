'use client';

/**
 * C11_MathsRelationsAndFunctionsSim.tsx
 * Class 11 Mathematics - Relations and Functions
 *
 * Lab 1: mapping machine - build ordered pairs from set A (domain) into
 * set B (co-domain) using a rule (double, square, add-one, modulus, or a
 * many-to-one custom), see the arrow diagram animate, and get a live
 * verdict: function or just a relation (one output per input test).
 * Lab 2: vertical-line tester - pick a curve (line, parabola, circle,
 * sideways parabola) and sweep a test line across it; the sim counts
 * intersections to prove which graphs are functions, with domain and
 * range highlighted on the axes.
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Lightbulb,
  AlertTriangle,
  Award,
  ChevronRight,
  Activity,
  Zap,
  Info,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_math_cbse_021', // Ordered pairs and Cartesian product A x B
  'c11_math_cbse_022', // Relation: definition, domain, co-domain, range
  'c11_math_cbse_023', // Function: every input has exactly one output
  'c11_math_cbse_024', // Image and pre-image
  'c11_math_cbse_025', // Real functions and their graphs
  'c11_math_cbse_026', // Vertical line test for functions
  'c11_math_cbse_027', // Many-one vs one-one relations
  'c11_math_cbse_028', // Domain and range from graphs & formulas
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Sets' | 'Relations' | 'Functions' | 'Graphs';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_math_cbse_021: { id: 'c11_math_cbse_021', title: 'Ordered Pairs & A x B', category: 'Sets', desc: '(a, b) is order-sensitive: (1, 2) differs from (2, 1). The Cartesian product A x B lists every possible pairing.', formula: 'A x B = {(a, b) : a in A, b in B}' },
  c11_math_cbse_022: { id: 'c11_math_cbse_022', title: 'Relation', category: 'Relations', desc: 'Any subset of A x B is a relation from A to B - no rules required, any bundle of pairs qualifies.', formula: 'R subset of A x B' },
  c11_math_cbse_023: { id: 'c11_math_cbse_023', title: 'Function', category: 'Functions', desc: 'A relation where EVERY element of the domain fires EXACTLY ONE arrow - no empty inputs, no double outputs.', formula: 'for all a in A: exactly one f(a) in B' },
  c11_math_cbse_024: { id: 'c11_math_cbse_024', title: 'Image & Pre-image', category: 'Functions', desc: 'f(a) is the image of a; a is a pre-image of f(a). Several inputs may share one image (many-one).', formula: 'b = f(a)' },
  c11_math_cbse_025: { id: 'c11_math_cbse_025', title: 'Real Functions', category: 'Graphs', desc: 'Functions from R to R: identity, constant, modulus, square, root - each with its signature graph.', formula: 'f(x) = |x| = x for x >= 0, -x for x < 0' },
  c11_math_cbse_026: { id: 'c11_math_cbse_026', title: 'Vertical Line Test', category: 'Graphs', desc: 'If any vertical line cuts the graph more than once, one input owns two outputs - so it is a relation, not a function.', formula: 'function <=> every vertical line hits <= 1 point' },
  c11_math_cbse_027: { id: 'c11_math_cbse_027', title: 'One-one & Many-one', category: 'Functions', desc: 'Distinct inputs with distinct images = one-one (injective). Two inputs sharing an image = many-one, still a perfectly good function.', formula: 'x1 != x2 => f(x1) != f(x2)' },
  c11_math_cbse_028: { id: 'c11_math_cbse_028', title: 'Domain & Range', category: 'Graphs', desc: 'Domain = allowed inputs; range = outputs actually achieved. For f(x) = sqrt(x-2): domain [2, inf), range [0, inf).', formula: 'D_f = {x : f(x) defined}' },
};

// ==========================================
// RULES for the mapping machine
// ==========================================
interface Rule {
  key: string;
  label: string;
  formula: string;
  f: (x: number) => number | null;   // null = undefined (hole)
  isFunction: boolean;
  note: string;
}

const A_SET = [-2, -1, 0, 1, 2];
const B_SET = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

const RULES: Rule[] = [
  { key: 'double', label: 'x -> 2x', formula: 'f(x) = 2x', f: (x) => 2 * x, isFunction: true, note: 'One exact arrow per input - a clean one-one function.' },
  { key: 'square', label: 'x -> x^2', formula: 'f(x) = x^2', f: (x) => x * x, isFunction: true, note: 'A function, but many-one: -2 and 2 share the image 4.' },
  { key: 'plusone', label: 'x -> x+1', formula: 'f(x) = x + 1', f: (x) => x + 1, isFunction: true, note: 'One-one again; image shifts every input up by one.' },
  { key: 'abs', label: 'x -> |x|', formula: 'f(x) = |x|', f: (x) => Math.abs(x), isFunction: true, note: 'Folds the line: many-one function with range [0, ...].' },
  { key: 'pm', label: 'x -> ±sqrt-ish (two outputs)', formula: 'g(x) = +sqrt or -sqrt', f: (x) => (x >= 0 ? x : null), isFunction: false, note: 'This "relation" sends each positive input to TWO values - the circle-style relation, not a function.' },
  { key: 'hole', label: 'x -> 1/x', formula: 'f(x) = 1/x', f: (x) => (x === 0 ? null : 1 / x), isFunction: false, note: 'At x = 0 the output is undefined - the domain must exclude it for this to become a function.' },
];

// ==========================================
// CURVES for the vertical line tester
// ==========================================
interface Curve {
  key: string;
  label: string;
  isFunction: boolean;
  yAt: (x: number) => number[];   // all y values at a given x (in graph units)
  domainNote: string;
  rangeNote: string;
}

const CURVES: Curve[] = [
  { key: 'line', label: 'y = 2x - 1', isFunction: true, yAt: (x) => [2 * x - 1], domainNote: 'all reals', rangeNote: 'all reals' },
  { key: 'para', label: 'y = x^2 - 2', isFunction: true, yAt: (x) => [x * x - 2], domainNote: 'all reals', rangeNote: '[-2, inf)' },
  { key: 'sqrt', label: 'y = sqrt(4 - x^2)', isFunction: true, yAt: (x) => (x >= -2 && x <= 2 ? [Math.sqrt(4 - x * x)] : []), domainNote: '[-2, 2]', rangeNote: '[0, 2]' },
  { key: 'circle', label: 'x^2 + y^2 = 4 (circle)', isFunction: false, yAt: (x) => (x >= -2 && x <= 2 ? [Math.sqrt(4 - x * x), -Math.sqrt(4 - x * x)] : []), domainNote: '[-2, 2]', rangeNote: '[-2, 2]' },
  { key: 'sideways', label: 'y^2 = x + 3 (sideways parabola)', isFunction: false, yAt: (x) => (x >= -3 ? [Math.sqrt(x + 3), -Math.sqrt(x + 3)] : []), domainNote: '[-3, inf)', rangeNote: 'all reals' },
  { key: 'abs', label: 'y = |x| - 1', isFunction: true, yAt: (x) => [Math.abs(x) - 1], domainNote: 'all reals', rangeNote: '[-1, inf)' },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'A function must send different inputs to different outputs.',
    correction: 'Sharing outputs is fine - f(x) = x^2 sends -2 and 2 both to 4 and is still a function (many-one). The ONLY requirement is one output per input, never two.',
    nodeId: 'c11_math_cbse_027' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'The co-domain and the range are the same set.',
    correction: 'The co-domain is the declared destination set; the range is the outputs actually reached. For f(x) = x^2 with co-domain R, the range is only [0, inf).',
    nodeId: 'c11_math_cbse_022' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'A circle fails to be a function because it is "not a graph".',
    correction: 'The circle IS a perfectly good graph - of a relation. It fails the vertical line test: x = 0 hits both y = 2 and y = -2, so one input has two outputs.',
    nodeId: 'c11_math_cbse_026' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: '(1, 2) and (2, 1) are the same ordered pair.',
    correction: 'Order matters: (1, 2) and (2, 1) are different pairs, and swapping can change the whole relation. A x B and B x A are usually different sets.',
    nodeId: 'c11_math_cbse_021' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'Every relation is a function with extra pairs.',
    correction: 'A function is the SPECIAL relation, not a bigger one: it must use every domain element exactly once. A relation can skip inputs (x = 0 in 1/x) or double-fire (the circle) - functions may do neither.',
    nodeId: 'c11_math_cbse_023' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'The domain of sqrt(x) is all reals because squares are always defined.',
    correction: 'The square ROOT needs x >= 0. Domains come from the formula: 1/x excludes 0, sqrt(x) needs x >= 0, and 1/(x-2) excludes 2. Always ask what breaks the input.',
    nodeId: 'c11_math_cbse_028' as NodeId,
  },
];

// ==========================================
// CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric';
  question: string;
  options?: string[];
  correctIndex?: number;
  answer?: number;
  unit?: string;
  tolerance?: number;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch01',
    nodeId: 'c11_math_cbse_021',
    type: 'numeric',
    question: 'A = {1, 2, 3} and B = {a, b}. How many ordered pairs are in A x B?',
    answer: 6,
    unit: 'pairs',
    tolerance: 0.01,
    explanation: '|A x B| = |A| * |B| = 3 * 2 = 6: (1,a), (1,b), (2,a), (2,b), (3,a), (3,b).',
    hints: ['Multiply the set sizes.', '3 * 2.', 'Six pairs.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_math_cbse_026',
    type: 'mcq',
    question: 'Which graph fails the vertical line test?',
    options: ['y = |x| - 1', 'x^2 + y^2 = 9', 'y = x^2 + 1', 'y = 2x - 5'],
    correctIndex: 1,
    explanation: 'The circle x^2 + y^2 = 9 gives two y values for most x (top and bottom arcs) - a vertical line cuts it twice, so it is a relation, not a function of x.',
    hints: ['Look for a graph that doubles back on itself.', 'Circle = two y per x.', 'The sideways round one.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_math_cbse_023',
    type: 'mcq',
    question: 'A relation from A = {1, 2, 3} to B has pairs {(1, 4), (2, 9), (3, 16), (2, 16)}. It is:',
    options: [
      'a function - every pair is legal',
      'not a function - input 2 fires two different outputs',
      'not a function - the outputs are squares',
      'a function if we delete 16',
    ],
    correctIndex: 1,
    explanation: 'Input 2 maps to both 9 and 16. One input with two arrows breaks the definition - deleting either pair would fix it.',
    hints: ['Check each input: how many arrows?', '2 appears twice with different images.', 'One-in-two-out = relation only.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_math_cbse_028',
    type: 'mcq',
    question: 'The domain of f(x) = 1/(x - 2) is:',
    options: ['all reals', 'x >= 2', 'all reals except x = 2', 'x <= 2'],
    correctIndex: 2,
    explanation: 'Only x = 2 makes the denominator zero. Every other real is fine - domains come from where the formula breaks.',
    hints: ['What value kills a denominator?', 'x - 2 = 0 at x = 2.', 'Exclude exactly that point.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_math_cbse_025',
    type: 'numeric',
    question: 'For f(x) = |x| - 1, what is f(-3)?',
    answer: 2,
    unit: '',
    tolerance: 0.01,
    explanation: '|-3| = 3, then 3 - 1 = 2. The modulus folds -3 onto +3 before the shift.',
    hints: ['Modulus first: |-3| = 3.', 'Then subtract 1.', '2.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_math_cbse_027',
    type: 'mcq',
    question: 'g: {1, 2, 3, 4} -> {2, 4, 6, 8} with g(x) = 2x is:',
    options: ['many-one', 'one-one', 'not a function', 'a constant function'],
    correctIndex: 1,
    explanation: 'Distinct inputs give distinct images (1->2, 2->4, 3->6, 4->8): one-one. It even uses every co-domain element (onto), but that is a separate property.',
    hints: ['Do any two inputs share an image?', 'Doubled values stay distinct.', 'One arrow each, no collisions = one-one.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_math_cbse_022',
    type: 'numeric',
    question: 'f(x) = x^2 on domain {-2, -1, 0, 1, 2}. How many elements are in the RANGE (distinct outputs)?',
    answer: 3,
    unit: '',
    tolerance: 0.01,
    explanation: 'Outputs are {4, 1, 0, 1, 4} = {0, 1, 4} - just 3 distinct values from 5 inputs, the signature of a many-one function.',
    hints: ['Compute all five outputs.', 'Collect distinct ones.', '{0, 1, 4} - three.'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_math_cbse_024',
    type: 'mcq',
    question: 'For f(x) = x + 3, the pre-image of 7 is:',
    options: ['10', '7', '4', 'does not exist'],
    correctIndex: 2,
    explanation: 'Solve x + 3 = 7: x = 4. The pre-image is the input that produces the given output.',
    hints: ['Work backwards from the output.', 'x + 3 = 7.', 'x = 4.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_math_cbse_027' as NodeId,
    question: 'Predict: the rule x -> x^2 maps A = {-2, -1, 0, 1, 2}. Is it a function, and is it one-one?',
    options: [
      'Not a function - two inputs share 4',
      'A function, and one-one because every input fires once',
      'A function but many-one - sharing outputs is allowed',
      'Neither - squares are illegal',
    ],
    correctIndex: 2,
    verify: 'Verify in the Lab: pick x -> x^2 and count the arrows into 4 - two arrive, yet the verdict reads FUNCTION.',
    explanation: 'The function contract controls outputs per INPUT, not inputs per output. x^2 passes (one arrow out of each input) but is many-one since -2 and 2 collide on 4.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_math_cbse_026' as NodeId,
    question: 'Predict: you sweep a vertical line across the circle x^2 + y^2 = 4. What is the maximum number of intersections?',
    options: ['0 - vertical lines miss circles', '1', '2 - top and bottom arcs', '4'],
    correctIndex: 2,
    verify: 'Verify in the Lab: pick the circle curve and drag the test line through x = 0 - the counter reads 2 and the verdict flips to RELATION.',
    explanation: 'Inside the circle, x = c cuts both the upper and lower arc: two outputs for one input. Exactly two - which is one too many for a function.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Vending Machine & Fee Rules',
  steps: [
    'A vending machine gives exactly one product per button (a function!) but two buttons may give the same drink (many-one). Model 6 buttons, 4 drinks and classify.',
    'A taxi fare is F(km) = 50 + 12*km for km > 0, undefined for km < 0. State the domain, and explain why negative inputs break it.',
    'A phone contacts list maps names -> numbers: two family members share one landline. Is the mapping a function? One-one?',
    'The UID system maps each citizen to exactly one ID. Explain why the reverse map (ID -> citizen) is one-one, and what a "duplicate Aadhaar" would mean mathematically.',
  ],
};

// ==========================================
// SMALL UI PRIMITIVES
// ==========================================
function StatBox(props: { label: string; value: string; unit?: string; color?: string }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{props.label}</p>
      <p className="text-xl font-bold font-mono" style={{ color: props.color || '#e2e8f0' }}>
        {props.value}{props.unit && <span className="text-xs text-slate-400 ml-1">{props.unit}</span>}
      </p>
    </div>
  );
}

function Toggle(props: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <button onClick={props.onToggle}
      className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-all duration-200 ${
        props.on ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40'
          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
      }`}>
      {props.label}: {props.on ? 'ON' : 'OFF'}
    </button>
  );
}

// ==========================================
// ARROW DIAGRAM
// ==========================================
function ArrowDiagram(props: { rule: Rule; highlight: number | null; animate: boolean }) {
  const ax = 90, bx = 470;
  const ay = (i: number) => 70 + i * 55;
  const by = (i: number) => 40 + i * 40;
  const bIndex = (v: number) => B_SET.indexOf(v);
  const pairs = A_SET.map((a) => ({ a, b: props.rule.f(a) }));
  return (
    <svg viewBox="0 0 620 380" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* set A */}
      <ellipse cx={ax} cy={190} rx={62} ry={160} fill="#312e81" opacity="0.25" stroke="#818cf8" strokeWidth="2" />
      <text x={ax} y={22} fill="#a5b4fc" fontSize="12" textAnchor="middle" fontWeight="bold">A (domain)</text>
      {/* set B */}
      <ellipse cx={bx} cy={190} rx={62} ry={165} fill="#064e3b" opacity="0.25" stroke="#34d399" strokeWidth="2" />
      <text x={bx} y={22} fill="#6ee7b7" fontSize="12" textAnchor="middle" fontWeight="bold">B (co-domain)</text>
      {/* A nodes */}
      {A_SET.map((a, i) => (
        <g key={a}>
          <circle cx={ax} cy={ay(i)} r="17"
            fill={props.highlight === a ? '#fbbf24' : '#475569'} stroke="#94a3b8" strokeWidth="1.5"
            style={{ transition: 'fill 0.3s' }} />
          <text x={ax} y={ay(i) + 5} fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="bold">{a}</text>
        </g>
      ))}
      {/* B nodes */}
      {B_SET.map((b, i) => {
        const hit = pairs.some((p) => p.b === b);
        return (
          <g key={b}>
            <circle cx={bx} cy={by(i)} r="15"
              fill={hit ? '#065f46' : '#334155'} stroke={hit ? '#34d399' : '#475569'} strokeWidth="1.5"
              style={{ transition: 'fill 0.3s' }} />
            <text x={bx} y={by(i) + 5} fill={hit ? '#d1fae5' : '#94a3b8'} fontSize="12" textAnchor="middle" fontWeight="bold">{b}</text>
          </g>
        );
      })}
      {/* arrows */}
      {pairs.map((p, i) => {
        if (p.b === null) {
          return (
            <text key={i} x={280} y={ay(i) + 5} fill="#f87171" fontSize="11" fontWeight="bold">
              {p.a} {'->'} UNDEFINED (breaks domain)
            </text>
          );
        }
        const bi = bIndex(p.b);
        const multi = pairs.filter((q) => q.b === p.b).length > 1;
        return (
          <path key={i}
            d={`M ${ax + 18} ${ay(i)} C ${280} ${ay(i)}, 320 ${by(bi)}, ${bx - 17} ${by(bi)}`}
            fill="none" stroke={multi ? '#fbbf24' : '#34d399'} strokeWidth="2" opacity="0.85">
            {props.animate && <animate attributeName="stroke-dashoffset" from="20" to="0" dur="0.6s" repeatCount="indefinite" />}
          </path>
        );
      })}
      {/* verdict */}
      <text x={310} y={366} fill={props.rule.isFunction ? '#34d399' : '#f87171'} fontSize="14" textAnchor="middle" fontWeight="bold">
        {props.rule.isFunction ? 'FUNCTION: every input fires exactly one arrow' : 'RELATION ONLY: an input fires twice (or none)'}
      </text>
    </svg>
  );
}

// ==========================================
// GRAPH WITH VERTICAL LINE TESTER
// ==========================================
function GraphTester(props: { curve: Curve; testX: number; showSweep: boolean }) {
  const cx = 320, cy = 170, scale = 42;
  const px = (x: number) => cx + x * scale;
  const py = (y: number) => cy - y * scale;
  const hits = props.curve.yAt(props.testX);
  // draw the curve
  const pts: string[] = [];
  for (let x = -4; x <= 4; x += 0.05) {
    const ys = props.curve.yAt(x);
    if (ys.length === 0) { pts.push('NaN'); continue; }
    for (const y of ys) pts.push(`${px(x)},${py(Math.max(Math.min(y, 4.4), -4.4))}`);
  }
  const pathStr = pts.join(' ').replace(/NaN(,|$)/g, ' M ');
  const graphColor = props.curve.isFunction ? '#818cf8' : '#f87171';
  return (
    <svg viewBox="0 0 640 340" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={px(i - 4)} y1={py(4.4)} x2={px(i - 4)} y2={py(-4.4)} stroke="#1e293b" strokeWidth="1" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1={px(-4.4)} y1={py(i - 4)} x2={px(4.4)} y2={py(i - 4)} stroke="#1e293b" strokeWidth="1" />
      ))}
      <line x1={px(-4.4)} y1={cy} x2={px(4.4)} y2={cy} stroke="#475569" strokeWidth="1.5" />
      <line x1={cx} y1={py(4.4)} x2={cx} y2={py(-4.4)} stroke="#475569" strokeWidth="1.5" />
      {/* curve */}
      <path d={`M ${pathStr}`} fill="none" stroke={graphColor} strokeWidth="2.5" />
      {/* vertical test line */}
      {props.showSweep && (
        <g>
          <line x1={px(props.testX)} y1={py(4.4)} x2={px(props.testX)} y2={py(-4.4)}
            stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" />
          {hits.map((y, i) => (
            <circle key={i} cx={px(props.testX)} cy={py(y)} r="7"
              fill={hits.length > 1 ? '#f87171' : '#34d399'} stroke="#e2e8f0" strokeWidth="1.5" />
          ))}
          <text x={px(props.testX) + 8} y={py(4.2)} fill="#fbbf24" fontSize="11">
            x = {props.testX.toFixed(1)}: {hits.length} intersection{hits.length === 1 ? '' : 's'}
          </text>
        </g>
      )}
      {/* verdict */}
      <text x={320} y={22} fill={props.curve.isFunction ? '#34d399' : '#f87171'} fontSize="14" textAnchor="middle" fontWeight="bold">
        {props.curve.label}: {props.curve.isFunction ? 'FUNCTION (no vertical line cuts twice)' : 'RELATION (a vertical line cuts twice)'}
      </text>
      <text x={320} y={326} fill="#64748b" fontSize="11" textAnchor="middle">
        domain: {props.curve.domainNote} | range: {props.curve.rangeNote}
      </text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_MathsRelationsAndFunctionsSim({
  initialNodeId = 'c11_math_cbse_021',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Mapping machine ----
  const [ruleKey, setRuleKey] = useState('square');
  const [highlight, setHighlight] = useState<number | null>(null);
  const [animateArrows, setAnimateArrows] = useState(true);
  const rule = RULES.find((r) => r.key === ruleKey) || RULES[1];

  // ---- Vertical line tester ----
  const [curveKey, setCurveKey] = useState('circle');
  const [testX, setTestX] = useState(0);
  const [showSweep, setShowSweep] = useState(true);
  const curve = CURVES.find((c) => c.key === curveKey) || CURVES[3];
  const hitsNow = curve.yAt(testX).length;

  // cycle inputs to see collision behaviour
  useEffect(() => {
    const id = window.setInterval(() => {
      setHighlight((h) => {
        const idx = A_SET.indexOf(h ?? -3);
        return A_SET[(idx + 1) % A_SET.length];
      });
    }, 1200);
    return () => window.clearInterval(id);
  }, [ruleKey]);

  const resetLab = useCallback(() => {
    setRuleKey('square'); setHighlight(null);
    setCurveKey('circle'); setTestX(0); setShowSweep(true); setAnimateArrows(true);
  }, []);

  // ---- Predict ----
  const [predAnswers, setPredAnswers] = useState<Record<string, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<string, boolean>>({});

  // ---- Challenges ----
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ submitted: boolean; isCorrect: boolean; explanation: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const init: Record<string, ReturnType<typeof createBKTState>> = {};
    CBSE_NODES.forEach((id) => { init[id] = createBKTState(); });
    return init;
  });
  const [srsMap, setSrsMap] = useState<Record<string, ReviewItem>>(() => {
    const init: Record<string, ReviewItem> = {};
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'Relations and Functions'); });
    return init;
  });

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const submitPrediction = (predId: string, choice: number) => {
    const pred = PREDICTIONS.find((p) => p.id === predId);
    if (!pred || predSubmitted[predId]) return;
    const ok = choice === pred.correctIndex;
    setPredAnswers((m) => ({ ...m, [predId]: choice }));
    setPredSubmitted((m) => ({ ...m, [predId]: true }));
    setBktMap((map) => ({ ...map, [pred.nodeId]: bktUpdate(map[pred.nodeId] || createBKTState(), ok) }));
  };

  const handleSubmitChallenge = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;
    if (ch.type === 'mcq') {
      if (selectedOption == null) return;
      isCorrect = selectedOption === ch.correctIndex;
    } else {
      const val = parseFloat(numericInput);
      if (isNaN(val)) return;
      const tol = (ch.tolerance ?? 0.02) * Math.abs(ch.answer ?? val);
      isCorrect = Math.abs(val - (ch.answer ?? 0)) <= Math.max(tol, 1e-6);
    }
    setChallengeFeedback({ submitted: true, isCorrect, explanation: ch.explanation });
    setAttemptedCount((c) => c + 1);
    if (isCorrect) { setScore((s) => s + 10 + streak * 2); setStreak((s) => s + 1); setCorrectCount((c) => c + 1); }
    else setStreak(0);
    setBktMap((map) => ({ ...map, [ch.nodeId]: bktUpdate(map[ch.nodeId] || createBKTState(), isCorrect) }));
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'Relations and Functions');
    setSrsMap((m) => ({ ...m, [ch.id]: sm2Update(srs, isCorrect ? 5 : 2, 0) }));
  };

  const handleNextChallenge = () => {
    setSelectedOption(null); setNumericInput(''); setChallengeFeedback(null); setShowHint(false); setHintIndex(0);
    if (currentChallengeIndex === CHALLENGES.length - 1) {
      const pct = Math.round((correctCount / Math.max(attemptedCount, 1)) * 100);
      recordGameScore([...CBSE_NODES], Math.max(pct, 20));
      onComplete?.(pct);
      setActiveTab('summary');
    } else setCurrentChallengeIndex((i) => i + 1);
  };

  const resetAll = () => {
    resetLab();
    setCurrentChallengeIndex(0); setSelectedOption(null); setNumericInput('');
    setChallengeFeedback(null); setScore(0); setStreak(0);
    setAttemptedCount(0); setCorrectCount(0);
    setPredAnswers({}); setPredSubmitted({});
    setActiveTab('lab');
  };

  const avgMastery = Math.round(
    (CBSE_NODES.reduce((s, n) => s + (bktMap[n]?.pKnown ?? 0), 0) / CBSE_NODES.length) * 100
  );

  // distinct images (for range display)
  const imageSet = useMemo(() => {
    const s = new Set<number>();
    A_SET.forEach((a) => { const v = rule.f(a); if (v !== null) s.add(v); });
    return Array.from(s).sort((x, y) => x - y);
  }, [rule]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/80 border-b border-slate-800 px-4 py-4 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-indigo-400" /> Relations &amp; Functions
            </h1>
            <p className="text-xs text-slate-400">Class 11 Maths - mappings, vertical line test, domain &amp; range - CBSE Chapter Lab</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase text-slate-500 font-semibold">Mastery</p>
              <p className="text-sm font-bold text-amber-400">{avgMastery}%</p>
            </div>
            <button onClick={resetAll} className="min-h-11 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-semibold flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-3 flex gap-2 overflow-x-auto pb-1">
          {([
            ['lab', 'Lab', <Activity key="i" className="w-4 h-4" />],
            ['predict', 'Predict', <Lightbulb key="i" className="w-4 h-4" />],
            ['challenges', 'Challenges', <Zap key="i" className="w-4 h-4" />],
            ['misconceptions', 'Misconceptions', <AlertTriangle key="i" className="w-4 h-4" />],
            ['summary', 'Summary', <Award key="i" className="w-4 h-4" />],
          ] as Array<[typeof activeTab, string, JSX.Element]>).map(([tab, label, icon]) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`min-h-11 px-4 rounded-xl text-sm font-bold flex items-center gap-2 border transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}>
              {icon} {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ================= LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* mapping machine */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" /> Mapping machine - function or just a relation?
              </h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {RULES.map((r) => (
                  <button key={r.key} onClick={() => setRuleKey(r.key)}
                    className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-all ${
                      ruleKey === r.key ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                    {r.label}
                  </button>
                ))}
              </div>
              <ArrowDiagram rule={rule} highlight={highlight} animate={animateArrows} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Verdict" value={rule.isFunction ? 'Function' : 'Relation only'} color={rule.isFunction ? '#34d399' : '#f87171'} />
                <StatBox label="Distinct images" value={String(imageSet.length)} unit="of 5 inputs" color="#818cf8" />
                <StatBox label="Classification" value={rule.isFunction ? (imageSet.length < 5 ? 'many-one' : 'one-one') : '-'} color="#fbbf24" />
                <StatBox label="Formula" value={rule.formula.replace('f(x) = ', '')} />
              </div>
              <p className="text-xs text-slate-400 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" /> {rule.note}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Toggle label="Arrow flow" on={animateArrows} onToggle={() => setAnimateArrows((s) => !s)} />
              </div>
            </div>

            {/* vertical line tester */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-violet-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Vertical line tester
              </h2>
              <GraphTester curve={curve} testX={testX} showSweep={showSweep} />
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-slate-300">Test line position x</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{testX.toFixed(1)}</span>
                </div>
                <input type="range" min={-3.5} max={3.5} step={0.1} value={testX}
                  onChange={(e) => setTestX(parseFloat(e.target.value))}
                  className="w-full h-11 accent-amber-500 cursor-pointer" />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {CURVES.map((c) => (
                  <button key={c.key} onClick={() => setCurveKey(c.key)}
                    className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                      curveKey === c.key ? (c.isFunction ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-rose-600 border-rose-400 text-white') : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Intersections now" value={String(hitsNow)} color={hitsNow > 1 ? '#f87171' : '#34d399'} />
                <StatBox label="Max possible" value={curve.isFunction ? '1' : '2'} />
                <StatBox label="Domain" value={curve.domainNote} />
                <StatBox label="Range" value={curve.rangeNote} color="#818cf8" />
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Toggle label="Show test line" on={showSweep} onToggle={() => setShowSweep((s) => !s)} />
              </div>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Switch the mapping machine from x -&gt; x^2 to x -&gt; 2x: the amber collision arrows turn green and &quot;many-one&quot; becomes &quot;one-one&quot;. Sharing outputs was never the crime - double-firing is.</li>
                <li>In the tester, pick the sideways parabola y^2 = x + 3 and sweep to x = 1: two hits, verdict RELATION. Now pick y = |x| - 1: everywhere one hit. Both are curves - only one is a function.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: a function may happily send two inputs to the same output (x^2 does). What it may NEVER do is send one input to two outputs.
              </p>
            </div>
          </div>
        )}

        {/* ================= PREDICT ================= */}
        {activeTab === 'predict' && (
          <div className="space-y-6 animate-fadeIn">
            {PREDICTIONS.map((pred) => {
              const chosen = predAnswers[pred.id];
              const submitted = predSubmitted[pred.id];
              const isRight = chosen === pred.correctIndex;
              return (
                <div key={pred.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <p className="text-[10px] uppercase tracking-wider text-indigo-400 font-bold mb-2">Predict first - then verify</p>
                  <h3 className="text-base font-bold text-slate-100 mb-4">{pred.question}</h3>
                  <div className="space-y-2">
                    {pred.options.map((opt, i) => {
                      const isChosen = chosen === i;
                      const revealCorrect = submitted && i === pred.correctIndex;
                      const revealWrong = submitted && isChosen && !isRight;
                      return (
                        <button key={i} disabled={submitted} onClick={() => submitPrediction(pred.id, i)}
                          className={`w-full text-left min-h-11 px-4 py-3 rounded-xl border text-sm transition-all ${
                            revealCorrect ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                              : revealWrong ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                              : isChosen ? 'bg-indigo-950/70 border-indigo-500 text-indigo-100'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                          }`}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {submitted && (
                    <div className={`mt-4 p-4 rounded-xl border text-sm ${isRight ? 'bg-emerald-950/60 border-emerald-700 text-emerald-100' : 'bg-rose-950/60 border-rose-700 text-rose-100'}`}>
                      <p className="font-bold mb-1 flex items-center gap-2">
                        {isRight ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {isRight ? 'Good prediction!' : 'Not quite - now you know why:'}
                      </p>
                      <p>{pred.explanation}</p>
                      <p className="text-xs mt-2 opacity-80">{pred.verify}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Challenge {currentChallengeIndex + 1} / {CHALLENGES.length}</p>
                <div className="flex gap-3 text-sm font-bold">
                  <span className="text-amber-400">Score {score}</span>
                  <span className="text-emerald-400">Streak {streak}</span>
                </div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-5 overflow-hidden">
                <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${(currentChallengeIndex / CHALLENGES.length) * 100}%` }} />
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-5">{currentChallenge.question}</h3>
              {currentChallenge.type === 'mcq' && (
                <div className="space-y-2">
                  {currentChallenge.options?.map((opt, i) => {
                    const submitted = challengeFeedback?.submitted;
                    const isCorrectOpt = i === currentChallenge.correctIndex;
                    const isChosen = selectedOption === i;
                    return (
                      <button key={i} disabled={submitted} onClick={() => setSelectedOption(i)}
                        className={`w-full text-left min-h-11 px-4 py-3 rounded-xl border text-sm transition-all ${
                          submitted && isCorrectOpt ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : submitted && isChosen ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : isChosen ? 'bg-indigo-950/70 border-indigo-500 text-indigo-100'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                        }`}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}
              {currentChallenge.type === 'numeric' && (
                <div className="flex items-center gap-3">
                  <input type="number" value={numericInput} disabled={challengeFeedback?.submitted}
                    onChange={(e) => setNumericInput(e.target.value)} placeholder="Type your number..."
                    className="flex-1 min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-4 text-lg font-mono text-slate-100 focus:border-indigo-500 outline-none" />
                  {currentChallenge.unit && <span className="text-slate-400 font-semibold">{currentChallenge.unit}</span>}
                </div>
              )}
              <button onClick={() => { setShowHint(true); setHintIndex((i) => Math.min(i + 1, currentChallenge.hints.length)); }}
                className="mt-4 min-h-11 px-4 rounded-xl bg-amber-900/40 border border-amber-700/50 text-amber-300 text-sm font-bold flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> {hintIndex === 0 ? 'Need a hint?' : hintIndex < currentChallenge.hints.length ? 'Another hint' : 'All hints shown'}
              </button>
              {showHint && currentChallenge.hints.slice(0, hintIndex).map((h, i) => (
                <p key={i} className="mt-2 text-sm text-amber-200/90 bg-amber-950/30 border border-amber-800/40 rounded-xl px-4 py-2">Hint {i + 1}: {h}</p>
              ))}
              {!challengeFeedback?.submitted ? (
                <button onClick={handleSubmitChallenge} className="mt-5 w-full min-h-11 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all">
                  Submit Answer
                </button>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}>
                    {challengeFeedback.isCorrect ? <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-bold mb-1">{challengeFeedback.isCorrect ? 'Correct!' : 'Check the reasoning:'}</p>
                      <p className="text-sm leading-relaxed">{challengeFeedback.explanation}</p>
                    </div>
                  </div>
                  <button onClick={handleNextChallenge} className="w-full min-h-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg">
                    {currentChallengeIndex === CHALLENGES.length - 1 ? 'Finish & See Mastery' : 'Next Challenge'} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MISCONCEPTIONS ================= */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-6 h-6" /> Misconception Killer</h2>
              <p className="text-slate-400 text-sm mb-6">The classic relation-vs-function confusions, dismantled.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm"><XCircle className="w-5 h-5" /> What students believe</div>
                    <p className="text-slate-200 text-sm font-semibold">{m.misconception}</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800"><CheckCircle2 className="w-5 h-5" /> What is true</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.correction}</p>
                    <p className="text-[10px] font-mono text-slate-600">{m.nodeId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= SUMMARY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-amber-600/30 rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2"><Sparkles className="w-5 h-5" /> {REAL_WORLD.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {REAL_WORLD.steps.map((step, i) => (
                  <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-3">
                <StatBox label="Challenges tried" value={String(attemptedCount)} />
                <StatBox label="Correct" value={String(correctCount)} color="#34d399" />
                <StatBox label="Streak" value={String(streak)} color="#fbbf24" />
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-amber-400" /> Topic Mastery Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {CBSE_NODES.map((nodeId) => {
                  const m = Math.round((bktMap[nodeId]?.pKnown ?? 0) * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1 leading-tight">{NODE_METADATA[nodeId].title}</p>
                      <p className="text-[9px] font-mono text-slate-600 mb-1">{nodeId}</p>
                      <div className="text-lg font-bold text-indigo-400">{m}%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-indigo-500 h-full transition-all duration-500" style={{ width: `${m}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-md font-bold text-slate-100 mb-3">Formula sheet (from this sim)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CBSE_NODES.map((n) => (
                  <div key={n} className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                    <p className="text-[10px] text-indigo-300 font-bold">{NODE_METADATA[n].title}</p>
                    <p className="text-xs font-mono text-slate-300 mt-1">{NODE_METADATA[n].formula}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {activeTab === 'lab' && (
        <footer className="max-w-5xl mx-auto px-4 pb-8">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Touch first: <span className="text-slate-200 font-semibold">pick the circle in the tester and sweep the amber line</span> - catch it hitting twice.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
