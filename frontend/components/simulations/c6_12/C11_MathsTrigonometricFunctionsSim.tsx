'use client';

/**
 * C11_MathsTrigonometricFunctionsSim.tsx
 * Class 11 Mathematics - Trigonometric Functions
 *
 * Lab 1: the unit circle, live. Drag the angle (degree or radian mode)
 * and watch the radius arm sweep, the sine/cosine projections build the
 * wave graph in real time, the tangent ray shoot off at 90/270 degrees,
 * and the ASTC quadrant signs colour themselves.
 * Lab 2: identity machine - sin^2 + cos^2 = 1, tan = sin/cos and the
 * allied-angle transformations verified numerically for whatever angle
 * you set, plus a special-angles table that lights up when you land on
 * 0, 30, 45, 60 or 90 degrees.
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
  Compass,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_math_cbse_011', // Angles: degree & radian measure, arc length
  'c11_math_cbse_012', // Unit circle definition of sin, cos, tan
  'c11_math_cbse_013', // Signs of trig functions by quadrant (ASTC)
  'c11_math_cbse_014', // Special angles: 0, 30, 45, 60, 90 degrees
  'c11_math_cbse_015', // Fundamental identity sin^2 + cos^2 = 1
  'c11_math_cbse_016', // Allied angles: sin(pi - x) = sin x etc.
  'c11_math_cbse_017', // Graphs of sin x and cos x (period 2pi)
  'c11_math_cbse_018', // Domain, range and periodicity of tan x
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Angles' | 'Circle' | 'Signs' | 'Identities';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_math_cbse_011: { id: 'c11_math_cbse_011', title: 'Radian Measure', category: 'Angles', desc: 'One radian is the angle whose arc length equals the radius. 180 degrees = pi radians; arc = r * theta.', formula: '1 rad = 180/pi deg,  arc s = r theta' },
  c11_math_cbse_012: { id: 'c11_math_cbse_012', title: 'Unit Circle Definition', category: 'Circle', desc: 'For the point where the arm at angle x meets the unit circle: cos x is the x-coordinate, sin x the y-coordinate.', formula: 'P = (cos x, sin x)' },
  c11_math_cbse_013: { id: 'c11_math_cbse_013', title: 'Quadrant Signs (ASTC)', category: 'Signs', desc: 'All positive in I; sin in II; tan in III; cos in IV. The coordinate signs decide everything.', formula: 'sign(sin x) = sign(y),  sign(cos x) = sign(x)' },
  c11_math_cbse_014: { id: 'c11_math_cbse_014', title: 'Special Angles', category: 'Signs', desc: '0, 30, 45, 60, 90 give exact values from half-square geometry - memorise once, derive forever.', formula: 'sin 45 = 1/sqrt2,  sin 30 = 1/2' },
  c11_math_cbse_015: { id: 'c11_math_cbse_015', title: 'Pythagorean Identity', category: 'Identities', desc: 'The point lies on the unit circle x^2 + y^2 = 1, so sin^2 x + cos^2 x = 1 for EVERY angle.', formula: 'sin^2 x + cos^2 x = 1' },
  c11_math_cbse_016: { id: 'c11_math_cbse_016', title: 'Allied Angles', category: 'Identities', desc: 'Reflections of the arm: pi - x mirrors into quadrant II keeping sin, flipping cos.', formula: 'sin(pi - x) = sin x,  cos(pi - x) = -cos x' },
  c11_math_cbse_017: { id: 'c11_math_cbse_017', title: 'Sine & Cosine Graphs', category: 'Identities', desc: 'Both wave between -1 and 1 with period 2pi; cos is sine shifted left by pi/2.', formula: 'y = sin x, y = cos x: period 2 pi' },
  c11_math_cbse_018: { id: 'c11_math_cbse_018', title: 'The Tangent Function', category: 'Identities', desc: 'tan x = sin x / cos x blows up where cos x = 0 and repeats every pi - vertical asymptotes at odd multiples of pi/2.', formula: 'tan x = sin x / cos x,  period pi' },
};

// ==========================================
// SPECIAL ANGLES (exact values)
// ==========================================
const SPECIAL = [
  { deg: 0, sin: '0', cos: '1', tan: '0' },
  { deg: 30, sin: '1/2', cos: '√3/2', tan: '1/√3' },
  { deg: 45, sin: '1/√2', cos: '1/√2', tan: '1' },
  { deg: 60, sin: '√3/2', cos: '1/2', tan: '√3' },
  { deg: 90, sin: '1', cos: '0', tan: '∞' },
];

const MNEMONIC = [
  { q: 'I', label: 'All', color: '#34d399', desc: 'sin, cos, tan all positive (x > 0, y > 0)' },
  { q: 'II', label: 'Sin', color: '#818cf8', desc: 'only sin positive (x < 0, y > 0)' },
  { q: 'III', label: 'Tan', color: '#fbbf24', desc: 'only tan positive (both negative -> ratio positive)' },
  { q: 'IV', label: 'Cos', color: '#f87171', desc: 'only cos positive (x > 0, y < 0)' },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'sin x grows as the angle grows - bigger angle, bigger sine.',
    correction: 'sin 150 = 0.5 but sin 90 = 1 and sin 270 = -1. Sine oscillates between -1 and 1 forever; it rises to 90, falls back, goes negative, returns. That is what "periodic" means.',
    nodeId: 'c11_math_cbse_017' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'Trig functions of any angle are only defined inside a triangle.',
    correction: 'The unit circle defines them for EVERY real angle - positive, negative, beyond 360. A 390 degree angle wraps once and lands at 30 degrees, so sin 390 = sin 30.',
    nodeId: 'c11_math_cbse_012' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'sin(-x) = sin(x) because only the size matters.',
    correction: 'Sine is ODD: sin(-x) = -sin x. Going clockwise from the x-axis puts you below it, flipping the y-coordinate. Cosine is the even one: cos(-x) = cos x.',
    nodeId: 'c11_math_cbse_013' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: 'tan x = sin x / cos x works for every angle.',
    correction: 'Division by zero: at 90 and 270 degrees cos x = 0, so tan is undefined - the graph shoots off through vertical asymptotes there. tan is defined on all reals except those points.',
    nodeId: 'c11_math_cbse_018' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'sin^2 x means sin(x^2) or sin(x)*2.',
    correction: 'sin^2 x is the standard shorthand for (sin x)^2. The identity sin^2 x + cos^2 x = 1 is Pythagoras: the radius arm, its x-shadow and y-shadow form a right triangle.',
    nodeId: 'c11_math_cbse_015' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'Radian is just a different unit like Fahrenheit vs Celsius.',
    correction: 'The radian is the NATURAL unit: arc length = r * theta directly in radians. In radians, derivative and limit formulas (d/dx sin x = cos x) only hold - degrees hide a factor pi/180 everywhere.',
    nodeId: 'c11_math_cbse_011' as NodeId,
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
    nodeId: 'c11_math_cbse_011',
    type: 'numeric',
    question: 'Convert 150 degrees to radians and enter the value of the coefficient of pi (e.g. 5/6 as 0.833, 2 decimals).',
    answer: 0.833,
    unit: 'pi rad',
    tolerance: 0.02,
    explanation: '150 * pi/180 = 5pi/6 = 0.833pi radians. Multiply degrees by pi/180, always.',
    hints: ['Multiply by pi/180.', '150/180 = 5/6.', '5/6 = 0.833.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_math_cbse_013',
    type: 'mcq',
    question: 'The angle 210 degrees lies in quadrant III. Which set of signs is correct?',
    options: ['sin + , cos + , tan +', 'sin - , cos - , tan +', 'sin - , cos + , tan -', 'sin + , cos - , tan -'],
    correctIndex: 1,
    explanation: 'In quadrant III both coordinates are negative, so sin and cos are negative but their ratio tan is positive - the "Only Tan" quadrant.',
    hints: ['Use the coordinates of the unit-circle point.', 'x < 0 and y < 0 in III.', 'negative/negative = positive for tan.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_math_cbse_014',
    type: 'mcq',
    question: 'The exact value of sin 60 - cos 60 is:',
    options: ['0', '(√3 - 1)/2', '√3/2', '1/2'],
    correctIndex: 1,
    explanation: 'sin 60 = √3/2 and cos 60 = 1/2, so the difference is (√3 - 1)/2 ≈ 0.366. Special-angle arithmetic, no calculator needed.',
    hints: ['sin 60 = √3/2, cos 60 = 1/2.', 'Subtract numerators over 2.', '(√3 - 1)/2.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_math_cbse_016',
    type: 'mcq',
    question: 'sin(150 degrees) equals:',
    options: ['-sin 30 = -0.5', 'sin 30 = 0.5', 'cos 60', '-1'],
    correctIndex: 1,
    explanation: '150 = 180 - 30, so sin 150 = sin(180 - 30) = sin 30 = 0.5. Sine keeps its value across the pi - x reflection; cosine flips sign.',
    hints: ['Write 150 = 180 - 30.', 'sin(pi - x) = sin x.', 'The arm mirrors into quadrant II.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_math_cbse_015',
    type: 'numeric',
    question: 'If cos x = 0.6 (x in quadrant I), what is sin x? (decimal)',
    answer: 0.8,
    unit: '',
    tolerance: 0.01,
    explanation: 'sin^2 x = 1 - 0.36 = 0.64, so sin x = 0.8 (positive in quadrant I). This is the 3-4-5 triangle hiding inside the identity.',
    hints: ['sin^2 + cos^2 = 1.', 'sin^2 = 1 - 0.36.', 'sqrt(0.64) = 0.8.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_math_cbse_018',
    type: 'mcq',
    question: 'The period of tan x is pi, not 2pi. Why?',
    options: [
      'Because tan repeats after half a turn: (x + pi) flips both sin and cos signs, leaving the ratio unchanged',
      'Because tan has no graph beyond 90 degrees',
      'Because pi is larger than 2pi',
      'Because tan x is always positive',
    ],
    correctIndex: 0,
    explanation: 'Rotating by pi sends (cos x, sin x) to (-cos x, -sin x): both flip, so tan = sin/cos is exactly the same number. The pattern of asymptotes and repeats every pi.',
    hints: ['Negate both numerator and denominator.', '-/- = +1.', 'Compare tan 30 and tan 210.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_math_cbse_017',
    type: 'numeric',
    question: 'A satellite signal is modelled by y = 3 sin(2x). What is its maximum value?',
    answer: 3,
    unit: '',
    tolerance: 0.01,
    explanation: 'sin(2x) peaks at 1, so the amplitude-3 wave peaks at 3. Multiplying by a scales the wave; the 2 inside compresses the period to pi.',
    hints: ['What is the max of any sine?', 'Amplitude multiplies the peak.', '3 * 1 = 3.'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_math_cbse_012',
    type: 'numeric',
    question: 'A circle has radius 6 cm. What arc length (cm) subtends an angle of 2 radians at the centre?',
    answer: 12,
    unit: 'cm',
    tolerance: 0.01,
    explanation: 's = r * theta = 6 * 2 = 12 cm. This directness is exactly why radians are the natural unit.',
    hints: ['s = r theta in radians.', '6 * 2.', '12 cm.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_math_cbse_017' as NodeId,
    question: 'Predict: you drag the angle from 60 to 120 degrees. The sine value will:',
    options: [
      'keep rising - bigger angle always means bigger sine',
      'keep falling',
      'rise to 1 at 90, then fall back - the wave peaks at 90',
      'become negative immediately after 90',
    ],
    correctIndex: 2,
    verify: 'Verify in the Lab: drag through 90 degrees and watch the sine readout and the green dot on the graph - peak exactly at the top of the circle.',
    explanation: 'Sine is the y-coordinate of a point circling the origin: it climbs to 1 at 90 degrees, descends to 0 at 180, dives to -1 at 270 and returns. Rise-and-fall, not monotonic growth.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_math_cbse_013' as NodeId,
    question: 'Predict: which is TRUE for x = 300 degrees?',
    options: [
      'sin positive, cos positive',
      'sin negative, cos positive, tan negative',
      'both sin and cos negative',
      'tan positive because 300 is a big angle',
    ],
    correctIndex: 1,
    verify: 'Verify in the Lab: set 300 degrees and read the quadrant panel - you are in IV, the Cos quadrant.',
    explanation: '300 = 360 - 60 lies in quadrant IV: x-coordinate (cos) positive, y-coordinate (sin) negative, ratio (tan) negative.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Ferris Wheel Height & Pendulum Phases',
  steps: [
    'A Ferris wheel of radius 12 m turns once every 40 s. Model your height above the centre as 12 sin(2 pi t / 40) - find the first two times you are at 6 m.',
    'A pendulum clock swings through theta = 0.2 sin(4 t) radians. Compute the angular amplitude and the phase period, then convert 0.2 rad to degrees.',
    'A sound wave y = 0.4 sin(1000 pi t) has period 2 ms. Verify the frequency of 500 Hz using the sine period logic.',
    'A ramp of 30 degrees carries a box: resolve gravity into sin and cos components (mg sin 30 along, mg cos 30 normal) - the unit circle in mechanics.',
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
// UNIT CIRCLE + WAVE CANVAS
// ==========================================
function UnitCircleWave(props: {
  angleDeg: number; showTan: boolean; showWave: boolean; showProjection: boolean;
  animate: boolean; onAngle: (deg: number) => void;
}) {
  const a = (props.angleDeg * Math.PI) / 180;
  const cx = 150, cy = 150, R = 110;
  const px = cx + R * Math.cos(a);
  const py = cy - R * Math.sin(a);
  const sinV = Math.sin(a), cosV = Math.cos(a);
  const tanV = Math.abs(Math.cos(a)) < 1e-9 ? null : sinV / cosV;

  // wave graph coordinates (right half)
  const gx = (deg: number) => 310 + (deg / 360) * 300;
  const gy = (v: number) => 100 - v * 85;
  const waveSin: string[] = [];
  const waveCos: string[] = [];
  for (let d = 0; d <= 360; d += 3) {
    waveSin.push(`${gx(d)},${gy(Math.sin((d * Math.PI) / 180))}`);
    waveCos.push(`${gx(d)},${gy(Math.cos((d * Math.PI) / 180))}`);
  }

  useEffect(() => {
    if (!props.animate) return;
    const id = window.setInterval(() => {
      props.onAngle((Math.floor(props.angleDeg) + 1) % 360);
    }, 40);
    return () => window.clearInterval(id);
  }, [props.animate, props.angleDeg, props.onAngle]);

  return (
    <svg viewBox="0 0 640 310" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* quadrant shading */}
      <path d={`M ${cx} ${cy} L ${cx + R} ${cy} A ${R} ${R} 0 0 0 ${cx} ${cy - R} Z`} fill="#34d399" opacity="0.07" />
      <path d={`M ${cx} ${cy} L ${cx} ${cy - R} A ${R} ${R} 0 0 0 ${cx - R} ${cy} Z`} fill="#818cf8" opacity="0.07" />
      <path d={`M ${cx} ${cy} L ${cx - R} ${cy} A ${R} ${R} 0 0 0 ${cx} ${cy + R} Z`} fill="#fbbf24" opacity="0.07" />
      <path d={`M ${cx} ${cy} L ${cx} ${cy + R} A ${R} ${R} 0 0 0 ${cx + R} ${cy} Z`} fill="#f87171" opacity="0.07" />
      {/* axes */}
      <line x1={cx - R - 14} y1={cy} x2={cx + R + 14} y2={cy} stroke="#475569" strokeWidth="1.5" />
      <line x1={cx} y1={cy - R - 14} x2={cx} y2={cy + R + 14} stroke="#475569" strokeWidth="1.5" />
      {/* circle */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#64748b" strokeWidth="1.5" />
      {/* radius arm */}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#fbbf24" strokeWidth="2.5" />
      {/* sin projection (vertical, rose) */}
      {props.showProjection && (
        <line x1={px} y1={py} x2={px} y2={cy} stroke="#f87171" strokeWidth="2.5" />
      )}
      {/* cos projection (horizontal, green) */}
      {props.showProjection && (
        <line x1={px} y1={py} x2={cx} y2={py} stroke="#34d399" strokeWidth="2.5" />
      )}
      {/* tan ray: tangent line at (1,0) extended, shows tan as vertical cut */}
      {props.showTan && tanV !== null && Math.abs(tanV) < 6 && (
        <line x1={cx + R} y1={cy} x2={cx + R} y2={cy - R * Math.max(Math.min(tanV, 4), -4)}
          stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 3" />
      )}
      {/* angle arc */}
      <path d={`M ${cx + 34} ${cy} A 34 34 0 ${props.angleDeg > 180 ? 1 : 0} 0 ${cx + 34 * Math.cos(a)} ${cy - 34 * Math.sin(a)}`}
        fill="none" stroke="#fbbf24" strokeWidth="1.2" />
      {/* point */}
      <circle cx={px} cy={py} r="7" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      <text x={cx + R * Math.cos(a) * 1.24 - 10} y={cy - R * Math.sin(a) * 1.24} fill="#fbbf24" fontSize="11">
        ({cosV.toFixed(2)}, {sinV.toFixed(2)})
      </text>
      <text x={cx + 40} y={cy - 8} fill="#fbbf24" fontSize="11">{props.angleDeg.toFixed(0)} deg</text>

      {/* wave graph */}
      {props.showWave && (
        <g>
          <rect x="310" y="10" width="310" height="180" rx="8" fill="#0b1120" stroke="#334155" />
          <line x1="310" y1="100" x2="620" y2="100" stroke="#475569" />
          {[90, 180, 270].map((d) => (
            <line key={d} x1={gx(d)} y1="10" x2={gx(d)} y2="190" stroke="#1e293b" strokeWidth="1" />
          ))}
          {([90, 180, 270, 360].map((d) => (
            <text key={d} x={gx(d)} y="203" fill="#475569" fontSize="9" textAnchor="middle">{d}</text>
          )))}
          <polyline points={waveSin.join(' ')} fill="none" stroke="#f87171" strokeWidth="2" />
          <polyline points={waveCos.join(' ')} fill="none" stroke="#34d399" strokeWidth="2" opacity="0.8" />
          {/* moving dots synced to angle */}
          <circle cx={gx(Math.min(props.angleDeg, 360))} cy={gy(sinV)} r="5" fill="#f87171" />
          <circle cx={gx(Math.min(props.angleDeg, 360))} cy={gy(cosV)} r="5" fill="#34d399" />
          {/* connector line from circle to graph */}
          <line x1={px} y1={py} x2={gx(Math.min(props.angleDeg, 360))} y2={gy(sinV)}
            stroke="#f87171" strokeWidth="1" opacity="0.35" strokeDasharray="3 3" />
          <text x="318" y="24" fill="#f87171" fontSize="10">sin x</text>
          <text x="358" y="24" fill="#34d399" fontSize="10">cos x</text>
        </g>
      )}
      <text x="80" y="300" fill="#64748b" fontSize="10">tan = sin/cos = {tanV === null ? 'undefined (cos = 0)' : tanV.toFixed(3)}</text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_MathsTrigonometricFunctionsSim({
  initialNodeId = 'c11_math_cbse_011',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Lab state ----
  const [angleDeg, setAngleDeg] = useState(45);
  const [radMode, setRadMode] = useState(false);
  const [showTan, setShowTan] = useState(true);
  const [showWave, setShowWave] = useState(true);
  const [showProjection, setShowProjection] = useState(true);
  const [animate, setAnimate] = useState(false);

  const a = (angleDeg * Math.PI) / 180;
  const sinV = Math.sin(a);
  const cosV = Math.cos(a);
  const tanDefined = Math.abs(cosV) >= 1e-9;
  const tanV = tanDefined ? sinV / cosV : null;
  const identity = sinV * sinV + cosV * cosV;

  const quadrant = angleDeg % 360 < 90 ? 0 : angleDeg % 360 < 180 ? 1 : angleDeg % 360 < 270 ? 2 : 3;
  const specialHit = SPECIAL.find((s) => Math.abs(s.deg - angleDeg) < 0.6);

  // allied angle checks
  const allied = useMemo(() => {
    const rad = a;
    return [
      { name: 'sin(180 - x)', lhs: Math.sin(Math.PI - rad), rhs: Math.sin(rad) },
      { name: 'cos(180 - x)', lhs: Math.cos(Math.PI - rad), rhs: -Math.cos(rad) },
      { name: 'sin(-x)', lhs: Math.sin(-rad), rhs: -Math.sin(rad) },
      { name: 'cos(-x)', lhs: Math.cos(-rad), rhs: Math.cos(rad) },
      { name: 'tan(180 + x)', lhs: Math.tan(Math.PI + rad), rhs: Math.tan(rad) },
    ].map((r) => ({ ...r, ok: Math.abs(r.lhs - r.rhs) < 1e-9 }));
  }, [a]);

  const resetLab = useCallback(() => {
    setAngleDeg(45); setRadMode(false);
    setShowTan(true); setShowWave(true); setShowProjection(true); setAnimate(false);
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
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'Trigonometric Functions'); });
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
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'Trigonometric Functions');
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/80 border-b border-slate-800 px-4 py-4 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" /> Trigonometric Functions
            </h1>
            <p className="text-xs text-slate-400">Class 11 Maths - unit circle, quadrants, identities &amp; wave graphs - CBSE Chapter Lab</p>
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
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                <Compass className="w-5 h-5" /> Unit circle - the wave machine
              </h2>
              <UnitCircleWave angleDeg={angleDeg} showTan={showTan} showWave={showWave}
                showProjection={showProjection} animate={animate} onAngle={setAngleDeg} />
              {/* angle control */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-slate-300">Angle x</span>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    {radMode ? `${(angleDeg * Math.PI / 180).toFixed(3)} rad` : `${angleDeg.toFixed(0)} deg`}
                  </span>
                </div>
                <input type="range" min={0} max={360} step={1} value={angleDeg}
                  onChange={(e) => setAngleDeg(parseFloat(e.target.value))}
                  className="w-full h-11 accent-amber-500 cursor-pointer" />
                <div className="flex flex-wrap gap-2">
                  {SPECIAL.map((s) => (
                    <button key={s.deg} onClick={() => setAngleDeg(s.deg)}
                      className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                        specialHit?.deg === s.deg ? 'bg-amber-600 border-amber-400 text-slate-950' : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}>
                      {s.deg} deg
                    </button>
                  ))}
                  <Toggle label="Auto-sweep" on={animate} onToggle={() => setAnimate((s) => !s)} />
                  <Toggle label="Radians" on={radMode} onToggle={() => setRadMode((s) => !s)} />
                </div>
              </div>
              {/* live values */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="sin x" value={sinV.toFixed(4)} color="#f87171" />
                <StatBox label="cos x" value={cosV.toFixed(4)} color="#34d399" />
                <StatBox label="tan x" value={tanV === null ? 'undefined' : tanV.toFixed(4)} color="#a78bfa" />
                <StatBox label="sin^2 + cos^2" value={identity.toFixed(6)} color="#fbbf24" />
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Toggle label="Projections" on={showProjection} onToggle={() => setShowProjection((s) => !s)} />
                <Toggle label="Tan ray" on={showTan} onToggle={() => setShowTan((s) => !s)} />
                <Toggle label="Wave graph" on={showWave} onToggle={() => setShowWave((s) => !s)} />
              </div>
              {/* quadrant panel */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {MNEMONIC.map((m, i) => (
                  <div key={m.q} className={`rounded-xl border p-3 text-center transition-all duration-300 ${
                    quadrant === i ? 'border-slate-500 bg-slate-800/60' : 'border-slate-800 bg-slate-950 opacity-50'
                  }`}>
                    <p className="text-xs font-bold" style={{ color: m.color }}>{m.q}: {m.label}+</p>
                    <p className="text-[9px] text-slate-500 mt-1">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* allied-angle identity machine */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h3 className="text-md font-bold text-violet-300 mb-2">Identity machine - allied angles at your angle</h3>
              <p className="text-xs text-slate-500 mb-3">Every row is verified numerically at x = {angleDeg.toFixed(0)} degrees. LHS = RHS for all of them, always.</p>
              <div className="space-y-2">
                {allied.map((r) => (
                  <div key={r.name} className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-xl px-4 py-2">
                    <span className="text-xs font-mono text-slate-300">{r.name}: {r.lhs.toFixed(4)} vs {r.rhs.toFixed(4)}</span>
                    {r.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-rose-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* special angle table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h3 className="text-md font-bold text-sky-300 mb-3">Special angles (exact values)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase">
                      <th className="py-2 px-3 text-left">x</th>
                      <th className="py-2 px-3 text-left">sin x</th>
                      <th className="py-2 px-3 text-left">cos x</th>
                      <th className="py-2 px-3 text-left">tan x</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SPECIAL.map((s) => (
                      <tr key={s.deg}
                        onClick={() => setAngleDeg(s.deg)}
                        className={`cursor-pointer border-t border-slate-800 transition-all ${specialHit?.deg === s.deg ? 'bg-amber-950/40' : 'hover:bg-slate-800/50'}`}>
                        <td className="py-2 px-3 font-mono text-amber-400">{s.deg} deg</td>
                        <td className="py-2 px-3 font-mono text-rose-300">{s.sin}</td>
                        <td className="py-2 px-3 font-mono text-emerald-300">{s.cos}</td>
                        <td className="py-2 px-3 font-mono text-violet-300">{s.tan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Turn on Auto-sweep and watch the red dot ride the sine wave while its shadow climbs the circle. Freeze at 90 degrees: cos = 0, so tan must be undefined - look for the vanishing tan ray.</li>
                <li>Set 150 degrees and compare sin(150) with sin(30). Then read the identity machine: sin(180 - x) = sin x is verified live. Predict cos(150) before you look.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: sine does NOT grow forever. At 270 degrees it is -1. The wave repeats every 360 - that is what the unit circle builds.
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
              <p className="text-slate-400 text-sm mb-6">Trigonometry traps: growth vs periodicity, domains, and radian reality.</p>
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
              Touch first: <span className="text-slate-200 font-semibold">drag the angle slider slowly</span> and watch the red dot trace the whole sine wave out of the circle.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
