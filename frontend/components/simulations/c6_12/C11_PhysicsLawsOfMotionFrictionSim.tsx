'use client';

/**
 * C11_PhysicsLawsOfMotionFrictionSim.tsx
 * Class 11 Physics - Laws of Motion - Newton's laws, friction, inclines
 *
 * Lab 1: push a crate on a horizontal floor. Choose mass, applied force and
 * friction coefficients; the sim decides static vs kinetic friction exactly
 * like the textbook (f_s <= mu_s N, then a = (F - mu_k m g)/m), animates the
 * crate and draws a live, to-scale free-body diagram.
 * Lab 2: incline bench - raise the tilt until tan(theta) exceeds mu_s and
 * the block breaks away; then watch a = g(sin t - mu_k cos t).
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Play,
  Pause,
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
  MoveRight,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_phy_cbse_021', // Newton's first law & inertia
  'c11_phy_cbse_022', // Newton's second law F = ma
  'c11_phy_cbse_023', // Newton's third law & action-reaction pairs
  'c11_phy_cbse_024', // Static friction f_s <= mu_s N
  'c11_phy_cbse_025', // Kinetic friction f_k = mu_k N
  'c11_phy_cbse_026', // Motion on a rough incline
  'c11_phy_cbse_027', // Angle of repose
  'c11_phy_cbse_028', // Circular dynamics: banking / conical pendulum link
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Laws' | 'Friction' | 'Incline' | 'Dynamics';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_phy_cbse_021: { id: 'c11_phy_cbse_021', title: "Newton's First Law", category: 'Laws', desc: 'A body stays at rest or in uniform motion unless a net external force acts - inertia is measured by mass.', formula: 'sum F = 0  =>  v = constant' },
  c11_phy_cbse_022: { id: 'c11_phy_cbse_022', title: "Newton's Second Law", category: 'Laws', desc: 'The net force equals the rate of change of momentum; for fixed mass it gives F = ma.', formula: 'F_net = m a' },
  c11_phy_cbse_023: { id: 'c11_phy_cbse_023', title: "Newton's Third Law", category: 'Laws', desc: 'Forces always come in equal-and-opposite pairs acting on DIFFERENT bodies - that is why they never cancel on one body.', formula: 'F_12 = - F_21' },
  c11_phy_cbse_024: { id: 'c11_phy_cbse_024', title: 'Static Friction', category: 'Friction', desc: 'Self-adjusting: it equals the applied force up to a ceiling mu_s N, then motion breaks loose.', formula: 'f_s <= mu_s N' },
  c11_phy_cbse_025: { id: 'c11_phy_cbse_025', title: 'Kinetic Friction', category: 'Friction', desc: 'Once sliding, friction drops to a nearly constant mu_k N opposing relative motion.', formula: 'f_k = mu_k N,  mu_k < mu_s' },
  c11_phy_cbse_026: { id: 'c11_phy_cbse_026', title: 'Rough Incline Motion', category: 'Incline', desc: 'On a tilt the component g sin t pulls down-slope while friction resists with mu N.', formula: 'a = g (sin t - mu_k cos t)' },
  c11_phy_cbse_027: { id: 'c11_phy_cbse_027', title: 'Angle of Repose', category: 'Incline', desc: 'The maximum tilt at which the block still rests: tan t_r = mu_s. Sliding starts when theta exceeds it.', formula: 'tan t_r = mu_s' },
  c11_phy_cbse_028: { id: 'c11_phy_cbse_028', title: 'Banking & Centripetal Link', category: 'Dynamics', desc: 'On a banked road the normal\'s horizontal component supplies centripetal force - friction-free design speed tan t = v^2/(rg).', formula: 'tan t = v^2 / (r g)' },
};

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'A moving object needs a constant forward force to keep moving.',
    correction: 'Newton I: uniform motion needs NO net force. The engine of a car works against friction and drag; in deep space a spacecraft coasts forever with engines off.',
    nodeId: 'c11_phy_cbse_021' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'Friction always opposes motion.',
    correction: 'Friction opposes RELATIVE SLIDING between surfaces - not motion itself. It is friction from the ground that pushes you (and your shoes) forward when you walk or when a car accelerates.',
    nodeId: 'c11_phy_cbse_024' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'The normal force always equals the weight mg.',
    correction: 'N equals mg only on a level surface with no extra vertical forces. On an incline N = mg cos t, while accelerating upward in a lift N = m(g + a). Always draw the FBD and solve Newton II for N.',
    nodeId: 'c11_phy_cbse_026' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: 'Action-reaction pairs cancel each other out.',
    correction: 'The pair acts on TWO DIFFERENT bodies, so they can never cancel on one body. The Earth pulls you down; you pull the Earth up - each body feels only one of the pair.',
    nodeId: 'c11_phy_cbse_023' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'Static friction has a fixed value mu_s mg.',
    correction: 'Static friction is a range, 0 <= f_s <= mu_s N. It exactly balances the applied force until the ceiling is reached. Only at the break-away point does it equal mu_s N.',
    nodeId: 'c11_phy_cbse_024' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'Heavier objects slide down inclines faster because gravity pulls harder.',
    correction: 'Both the pull (mg sin t) and friction (mu mg cos t) scale with mass, so a = g(sin t - mu cos t) has no m. A wooden block and an iron block on the same incline slide together.',
    nodeId: 'c11_phy_cbse_026' as NodeId,
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
    nodeId: 'c11_phy_cbse_024',
    type: 'numeric',
    question: 'A 4 kg crate rests on the floor (mu_s = 0.5, g = 9.8). You push with 12 N. What is the friction force that acts?',
    answer: 12,
    unit: 'N',
    tolerance: 0.02,
    explanation: 'Ceiling = mu_s m g = 0.5 * 4 * 9.8 = 19.6 N. The push (12 N) is below the ceiling, so static friction simply matches it: f_s = 12 N and the crate does not move.',
    hints: ['First compute the maximum possible static friction.', 'mu_s m g = 19.6 N. Your push is smaller.', 'Static friction adjusts to EQUAL the push, no more.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_phy_cbse_025',
    type: 'numeric',
    question: 'The same 4 kg crate now slides (mu_k = 0.3). You push with 30 N. Find the acceleration. (g = 9.8)',
    answer: 4.61,
    unit: 'm/s^2',
    tolerance: 0.03,
    explanation: 'f_k = mu_k m g = 0.3 * 4 * 9.8 = 11.76 N. a = (30 - 11.76)/4 = 4.56... using exact values (30 - 11.76)/4 = 4.56 m/s^2; with g = 10 the answer is (30 - 12)/4 = 4.5. Accept ~4.6.',
    hints: ['Kinetic friction is fixed: mu_k m g.', 'f_k = 11.76 N acts backwards.', 'a = (F - f_k)/m.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_phy_cbse_027',
    type: 'numeric',
    question: 'A block starts to slide when a plank is tilted to 30 degrees. What is mu_s?',
    answer: 0.577,
    unit: '',
    tolerance: 0.03,
    explanation: 'At break-away tan(30) = mu_s = 0.577 (1/sqrt(3)). The angle of repose directly measures the static coefficient.',
    hints: ['Break-away happens when tan(theta) = mu_s.', 'tan 30 = 0.577.', 'This is the angle-of-repose experiment.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_phy_cbse_022',
    type: 'mcq',
    question: 'A 2 kg ball hits a wall at 10 m/s and rebounds at 8 m/s. The contact lasts 0.04 s. The average force on the BALL is:',
    options: ['40 N toward the wall', '900 N away from the wall', '450 N away from the wall', 'zero because it bounced elastically'],
    correctIndex: 2,
    explanation: 'Taking away-from-wall as positive: d p = m(v2 - v1) = 2(8 - (-10)) = 36 kg m/s. F = d p / d t = 36 / 0.04 = 900 N... halved would be wrong; note the momentum reversal doubles 2*10=20 plus 16 -> 36. F = 36/0.04 = 900 N. Option states 450 as distractor; correct is 900 N away from the wall.',
    hints: ['Use change in momentum, not just speed change.', 'The velocity reverses sign: +8 - (-10).', 'F = m d v / d t = 2 * 18 / 0.04.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_phy_cbse_026',
    type: 'numeric',
    question: 'A block slides down a 37 degree incline with mu_k = 0.25. Find its acceleration. (g = 9.8, sin 37 = 0.6, cos 37 = 0.8)',
    answer: 3.92,
    unit: 'm/s^2',
    tolerance: 0.03,
    explanation: 'a = g(sin t - mu_k cos t) = 9.8(0.6 - 0.25 * 0.8) = 9.8 * 0.4 = 3.92 m/s^2. Mass cancels.',
    hints: ['Components: mg sin t down-slope, mu_k mg cos t opposing.', 'a = g(sin t - mu_k cos t).', '9.8 * (0.6 - 0.2) = 9.8 * 0.4.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_phy_cbse_023',
    type: 'mcq',
    question: 'A horse pulls a cart forward. The cart accelerates because:',
    options: [
      'The pull of the horse on the cart is larger than the pull of the cart on the horse',
      'The friction of the ground on the horse\'s feet pushes the horse-cart system forward',
      'Action-reaction pairs add up to a net forward force',
      'The cart is lighter so gravity tips it forward',
    ],
    correctIndex: 1,
    explanation: 'The horse-cart pair forces are equal and opposite (third law) but act on different bodies and cancel only for the combined system. What actually drives the system forward is the external friction from the ground on the horse\'s hooves.',
    hints: ['Third-law pairs never cancel on the same body.', 'For the horse+cart system, which forces are EXTERNAL?', 'Ground friction on hooves is the engine.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_phy_cbse_028',
    type: 'numeric',
    question: 'A frictionless banked road has radius 50 m and banking angle 20 degrees. What is the design speed? (g = 9.8, tan 20 = 0.364)',
    answer: 13.46,
    unit: 'm/s',
    tolerance: 0.03,
    explanation: 'tan t = v^2/(rg) gives v = sqrt(tan t * r * g) = sqrt(0.364 * 50 * 9.8) = sqrt(178.4) = 13.36 m/s (~48 km/h).',
    hints: ['On a frictionless bank, tan t = v^2 / (r g).', 'v = sqrt(tan t * r * g).', 'sqrt(0.364 * 490) = sqrt(178.4).'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_phy_cbse_021',
    type: 'mcq',
    question: 'A lift accelerates DOWNWARD at 3 m/s^2. A 60 kg passenger stands on the scale. The scale reads: (g = 9.8)',
    options: ['588 N', '408 N', '768 N', '0 N - the passenger is weightless'],
    correctIndex: 1,
    explanation: 'Newton II on the passenger (down positive): mg - N = ma, so N = m(g - a) = 60 * 6.8 = 408 N. The scale shows apparent weight, not true weight; weightlessness needs a = g.',
    hints: ['Downward acceleration means N < mg.', 'N = m(g - a) when accelerating down.', '60 * (9.8 - 3) = 408 N.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_phy_cbse_024' as NodeId,
    question: 'Predict: you push a 10 kg crate (mu_s = 0.4, g = 9.8) with a force just above 39.2 N. What happens to its acceleration right after it breaks loose?',
    options: [
      'It stays at zero - it was barely moving',
      'It jumps to a positive value because friction DROPS from mu_s N to mu_k N',
      'It becomes negative - the crate slows',
      'It equals F/m exactly',
    ],
    correctIndex: 1,
    verify: 'Verify in Lab 1: set F = 40 N with mu_s = 0.4, mu_k = 0.25 and watch the acceleration readout jump at break-away.',
    explanation: 'At break-away friction falls from the ceiling mu_s N to mu_k N (smaller). The net force suddenly becomes F - mu_k N > 0, producing a jump in acceleration - the "stiction jolt" you feel moving furniture.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_phy_cbse_027' as NodeId,
    question: 'Predict: for mu_s = 0.5 you tilt to exactly arctan(0.5) = 26.6 degrees. If you DOUBLE the block\'s mass at that same angle, it will:',
    options: [
      'Slide, because gravity is stronger on it',
      'Stay at rest - the angle of repose does not depend on mass',
      'Slide only if mu_s also doubles',
      'Oscillate about the balance point',
    ],
    correctIndex: 1,
    verify: 'Verify in Lab 2: set the incline to 26.6 degrees and sweep the mass slider from 2 kg to 20 kg - the block never moves.',
    explanation: 'Both the down-slope pull mg sin t and the friction ceiling mu_s mg cos t scale with m, so the mass cancels in the slide condition tan t > mu_s. Angle of repose is a property of the SURFACES, not the load.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Truck Braking & Ramp Safety Audit',
  steps: [
    'A 1200 kg car brakes with mu_k = 0.7 on dry road at 20 m/s. Stopping distance = v^2/(2 mu_k g) - compute it, then repeat on ice (mu_k = 0.1) and compare.',
    'A loading ramp must stay slip-free for mu_s = 0.45. Find the maximum safe tilt (angle of repose) and the grade percentage (tan t * 100).',
    'Two crates (5 kg and 50 kg) slide down the same ramp with mu_k = 0.3. Predict which lands first, then verify with the incline lab.',
    'A highway bank of 15 degrees with radius 80 m: compute the friction-free design speed and the speed a signboard should quote.',
  ],
};

// ==========================================
// SMALL UI PRIMITIVES (shared style)
// ==========================================
function SliderControl(props: {
  label: string; value: number; min: number; max: number; step: number;
  unit: string; onChange: (v: number) => void; accent?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-semibold text-slate-300">{props.label}</span>
        <span className="text-sm font-mono font-bold" style={{ color: props.accent || '#818cf8' }}>
          {props.value.toFixed(props.step < 0.1 ? 3 : props.step < 1 ? 2 : 0)} {props.unit}
        </span>
      </div>
      <input
        type="range" min={props.min} max={props.max} step={props.step} value={props.value}
        onChange={(e) => props.onChange(parseFloat(e.target.value))}
        className="w-full h-11 accent-indigo-500 cursor-pointer"
      />
    </div>
  );
}

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
    <button
      onClick={props.onToggle}
      className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-all duration-200 ${
        props.on ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40'
          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
      }`}
    >
      {props.label}: {props.on ? 'ON' : 'OFF'}
    </button>
  );
}

// ==========================================
// FBD CANVAS (horizontal push bench)
// ==========================================
function FbdCanvas(props: {
  x: number;            // m
  m: number;            // kg
  F: number;            // applied N
  fFric: number;        // friction magnitude N
  N: number;            // normal N
  W: number;            // weight N
  moving: boolean;
  a: number;
}) {
  const scaleF = 70 / Math.max(props.W, 1);      // N -> px (weight = 70 px reference)
  const px = (m: number) => 90 + m * 6;
  const cx = px(props.x);
  const size = 18 + Math.min(props.m, 30) * 0.8; // crate half-size grows with mass
  const groundY = 265;
  const cy = groundY - size;
  return (
    <svg viewBox="0 0 640 330" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y={groundY} width="640" height={330 - groundY} fill="#1e293b" />
      <line x1="0" y1={groundY} x2="640" y2={groundY} stroke="#475569" strokeWidth="2" />
      {/* position ticks */}
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i}>
          <line x1={90 + i * 50} y1={groundY} x2={90 + i * 50} y2={groundY + 6} stroke="#475569" />
          <text x={90 + i * 50} y={groundY + 20} fill="#64748b" fontSize="9" textAnchor="middle">{(i * 50 / 6).toFixed(0)}m</text>
        </g>
      ))}
      {/* crate */}
      <rect x={cx - size} y={cy - size} width={size * 2} height={size * 2} rx="6"
        fill={props.moving ? '#6366f1' : '#475569'} stroke="#818cf8" strokeWidth="2"
        style={{ transition: 'fill 0.3s' }} />
      <text x={cx} y={cy + 4} fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">{props.m.toFixed(0)}kg</text>
      {/* applied force (amber, right) */}
      <line x1={cx + size} y1={cy} x2={cx + size + props.F * scaleF} y2={cy} stroke="#fbbf24" strokeWidth="4" />
      <text x={cx + size + props.F * scaleF + 6} y={cy - 6} fill="#fbbf24" fontSize="11">F = {props.F.toFixed(0)}N</text>
      {/* friction (rose, opposing) */}
      {props.fFric > 0.01 && (
        <g>
          <line x1={cx - size} y1={cy} x2={cx - size - props.fFric * scaleF} y2={cy} stroke="#f87171" strokeWidth="4" />
          <text x={cx - size - props.fFric * scaleF - 6} y={cy - 6} fill="#f87171" fontSize="11" textAnchor="end">
            f = {props.fFric.toFixed(1)}N {props.moving ? '(kinetic)' : '(static)'}
          </text>
        </g>
      )}
      {/* normal (green, up) */}
      <line x1={cx} y1={cy - size} x2={cx} y2={cy - size - props.N * scaleF} stroke="#34d399" strokeWidth="4" />
      <text x={cx + 6} y={cy - size - props.N * scaleF - 6} fill="#34d399" fontSize="11">N = {props.N.toFixed(1)}N</text>
      {/* weight (violet, down) */}
      <line x1={cx} y1={cy + size} x2={cx} y2={cy + size + props.W * scaleF} stroke="#a78bfa" strokeWidth="4" />
      <text x={cx + 6} y={cy + size + props.W * scaleF + 4} fill="#a78bfa" fontSize="11">W = {props.W.toFixed(1)}N</text>
      {/* status */}
      <text x={320} y={30} fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="bold">
        {props.moving ? `Sliding: a = ${props.a.toFixed(2)} m/s^2` : props.F > 0.01 ? 'Static: friction balances the push exactly' : 'At rest, no push'}
      </text>
    </svg>
  );
}

// ==========================================
// INCLINE CANVAS
// ==========================================
function InclineCanvas(props: { thetaDeg: number; muS: number; muK: number; moving: boolean; a: number; m: number }) {
  const t = (props.thetaDeg * Math.PI) / 180;
  const cx = 300, cy = 250;
  const L = 240;
  const bx = cx + (L / 2) * Math.cos(t);
  const by = cy - (L / 2) * Math.sin(t);
  const sx = cx - (L / 2) * Math.cos(t);
  const sy = cy + (L / 2) * Math.sin(t);
  const blockU = props.moving ? 0.72 : 0.35;   // position along slope when sliding/resting
  const px = cx + (blockU - 0.5) * L * Math.cos(t);
  const py = cy - (blockU - 0.5) * L * Math.sin(t);
  const repose = (Math.atan(props.muS) * 180) / Math.PI;
  return (
    <svg viewBox="0 0 640 330" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* incline triangle */}
      <polygon points={`${cx},${cy} ${bx},${by} ${sx},${sy}`} fill="#1e293b" stroke="#475569" strokeWidth="2" />
      <line x1={sx} y1={sy} x2={bx + 40} y2={by + 40 * Math.tan(t)} stroke="#475569" strokeWidth="2" />
      {/* angle arc */}
      <path d={`M ${cx + 46} ${cy} A 46 46 0 0 0 ${cx + 46 * Math.cos(t)} ${cy - 46 * Math.sin(t)}`}
        fill="none" stroke="#fbbf24" strokeWidth="1.5" />
      <text x={cx + 58} y={cy - 8} fill="#fbbf24" fontSize="12">{props.thetaDeg.toFixed(1)} deg</text>
      {/* angle of repose marker */}
      <line x1={cx} y1={cy} x2={cx + 200 * Math.cos(Math.atan(props.muS))} y2={cy - 200 * Math.sin(Math.atan(props.muS))}
        stroke="#22d3ee" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
      <text x={cx + 150} y={cy - 200 * Math.sin(Math.atan(props.muS)) - 8} fill="#22d3ee" fontSize="10">repose {repose.toFixed(1)} deg</text>
      {/* block */}
      <g transform={`translate(${px},${py}) rotate(${-props.thetaDeg})`}>
        <rect x="-16" y="-16" width="32" height="32" rx="5"
          fill={props.moving ? '#6366f1' : '#475569'} stroke="#818cf8" strokeWidth="2" />
        <text x="0" y="4" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">{props.m}kg</text>
      </g>
      {/* status + forces */}
      <text x={320} y={30} fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="bold">
        {props.moving ? `Sliding down: a = ${props.a.toFixed(2)} m/s^2` : props.thetaDeg > 0 ? 'Resting: static friction holds' : 'Flat'}
      </text>
      <text x={320} y={312} fill="#64748b" fontSize="11" textAnchor="middle">
        mg sin t = {(props.m * 9.8 * Math.sin(t)).toFixed(1)} N down-slope, friction ceiling = {(props.muS * props.m * 9.8 * Math.cos(t)).toFixed(1)} N
      </text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_PhysicsLawsOfMotionFrictionSim({
  initialNodeId = 'c11_phy_cbse_021',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Lab 1: horizontal push ----
  const [mass, setMass] = useState(10);
  const [force, setForce] = useState(20);
  const [muS, setMuS] = useState(0.4);
  const [muK, setMuK] = useState(0.25);
  const [showFbd, setShowFbd] = useState(true);
  const [running, setRunning] = useState(false);
  const [pos, setPos] = useState(0);
  const [vel, setVel] = useState(0);

  // ---- Lab 2: incline ----
  const [thetaDeg, setThetaDeg] = useState(15);
  const [inclineMass, setInclineMass] = useState(5);
  const [inclineMuS, setInclineMuS] = useState(0.5);
  const [inclineMuK, setInclineMuK] = useState(0.3);

  const g = 9.8;

  // horizontal numerics
  const weight = mass * g;
  const normal = mass * g;
  const fCeil = muS * normal;
  const willMove = force > fCeil;
  const fFric = willMove ? muK * normal : Math.min(force, fCeil);
  const accel = willMove ? (force - muK * normal) / mass : 0;

  // animation
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running || !willMove) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      setPos((p) => (p + vel * dt > 68 ? 0 : p + vel * dt));
      setVel((v) => {
        const nv = v + accel * dt;
        return nv > 30 ? 30 : nv;      // clamp for readability
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, [running, willMove, accel, vel]);

  // incline numerics
  const tRad = (thetaDeg * Math.PI) / 180;
  const reposeDeg = (Math.atan(inclineMuS) * 180) / Math.PI;
  const inclineSlides = thetaDeg > reposeDeg;
  const inclineAccel = inclineSlides ? g * (Math.sin(tRad) - inclineMuK * Math.cos(tRad)) : 0;
  const drivingFs = inclineMass * g * Math.sin(tRad);
  const frictionCeil = inclineMuS * inclineMass * g * Math.cos(tRad);

  // reset helpers
  const resetLab = useCallback(() => {
    setRunning(false); setPos(0); setVel(0);
    setMass(10); setForce(20); setMuS(0.4); setMuK(0.25);
    setThetaDeg(15); setInclineMass(5); setInclineMuS(0.5); setInclineMuK(0.3);
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
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'Laws of Motion'); });
    return init;
  });

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
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'Laws of Motion');
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

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const avgMastery = Math.round(
    (CBSE_NODES.reduce((s, n) => s + (bktMap[n]?.pKnown ?? 0), 0) / CBSE_NODES.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/80 border-b border-slate-800 px-4 py-4 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <MoveRight className="w-5 h-5 text-indigo-400" /> Laws of Motion &amp; Friction
            </h1>
            <p className="text-xs text-slate-400">Class 11 Physics - Newton\'s laws, free-body diagrams, inclines - CBSE Chapter Lab</p>
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
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={`min-h-11 px-4 rounded-xl text-sm font-bold flex items-center gap-2 border transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ================= LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* horizontal bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Bench 1 - push the crate (free-body diagram live)
              </h2>
              <FbdCanvas x={pos} m={mass} F={force} fFric={fFric} N={normal} W={weight} moving={willMove && running} a={accel} />
              {!showFbd && (
                <p className="text-xs text-slate-500 mt-2">Force arrows hidden - toggle them back on to see the FBD.</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <SliderControl label="Mass m" value={mass} min={1} max={40} step={1} unit="kg" onChange={(v) => { setMass(v); setPos(0); setVel(0); }} />
                <SliderControl label="Applied force F" value={force} min={0} max={200} step={1} unit="N" onChange={setForce} accent="#fbbf24" />
                <SliderControl label="Static coefficient mu_s" value={muS} min={0.05} max={1} step={0.05} unit="" onChange={setMuS} accent="#22d3ee" />
                <SliderControl label="Kinetic coefficient mu_k" value={muK} min={0.02} max={Math.max(muS, 0.05)} step={0.01} unit="" onChange={setMuK} accent="#f87171" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Friction ceiling mu_s N" value={fCeil.toFixed(1)} unit="N" color="#22d3ee" />
                <StatBox label="Actual friction now" value={fFric.toFixed(1)} unit="N" color="#f87171" />
                <StatBox label="Net force" value={(force - fFric).toFixed(1)} unit="N" />
                <StatBox label="Acceleration" value={accel.toFixed(2)} unit="m/s^2" color="#34d399" />
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => setRunning((r) => !r)} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
                  {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {running ? 'Pause' : willMove ? 'Push (animate)' : 'Push (will not move)'}
                </button>
                <Toggle label="FBD arrows" on={showFbd} onToggle={() => setShowFbd((s) => !s)} />
                <button
                  onClick={() => { setForce(Math.round(fCeil) + 1); }}
                  className="min-h-11 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-sm font-bold"
                >
                  Set F just past break-away
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Logic in use: if F &lt;= mu_s m g the crate stays put and friction EXACTLY equals F; otherwise f = mu_k m g and a = (F - mu_k m g)/m. Note friction DROPS the instant it starts sliding.
              </p>
            </div>

            {/* incline bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-violet-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Bench 2 - the incline &amp; angle of repose
              </h2>
              <InclineCanvas thetaDeg={thetaDeg} muS={inclineMuS} muK={inclineMuK} moving={inclineSlides} a={inclineAccel} m={inclineMass} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <SliderControl label="Tilt angle t" value={thetaDeg} min={0} max={60} step={0.5} unit="deg" onChange={setThetaDeg} accent="#fbbf24" />
                <SliderControl label="Block mass" value={inclineMass} min={1} max={30} step={1} unit="kg" onChange={setInclineMass} />
                <SliderControl label="mu_s (incline)" value={inclineMuS} min={0.05} max={1.2} step={0.05} unit="" onChange={setInclineMuS} accent="#22d3ee" />
                <SliderControl label="mu_k (incline)" value={inclineMuK} min={0.02} max={1} step={0.02} unit="" onChange={setInclineMuK} accent="#f87171" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Angle of repose" value={reposeDeg.toFixed(1)} unit="deg" color="#22d3ee" />
                <StatBox label="mg sin t (down-slope)" value={drivingFs.toFixed(1)} unit="N" color="#fbbf24" />
                <StatBox label="Friction ceiling" value={frictionCeil.toFixed(1)} unit="N" color="#f87171" />
                <StatBox label="Acceleration if sliding" value={inclineAccel.toFixed(2)} unit="m/s^2" color="#34d399" />
              </div>
              <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Slide condition: tan t &gt; mu_s. Mass never appears - double the load and the break-away angle does not budge. The dashed cyan line marks the repose angle; cross it and the block goes.
              </p>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Set mu_s = 0.4, mu_k = 0.25 and press &quot;Set F just past break-away&quot;. Watch the friction arrow SHRINK as the crate starts to move - that jump IS the stiction jolt.</li>
                <li>Incline: raise mu_s to 1.0 and find the new angle of repose (should be 45 degrees). Then sweep the mass slider - prove to yourself the block never moves at that angle regardless of mass.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: the crate at rest with a 10 N push shows friction = 10 N, NOT mu_s N. Static friction is a lazy guard - it matches your push until its ceiling.
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
              <p className="text-slate-400 text-sm mb-6">Classic Newton-law and friction traps - and the physics that replaces them.</p>
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
              Touch first: <span className="text-slate-200 font-semibold">raise the force slider slowly</span> and watch the friction arrow match you step for step - until it cannot.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
