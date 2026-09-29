'use client';

/**
 * C11_PhysicsProjectileMotionSim.tsx
 * Class 11 Physics - Motion in a Plane - Projectile Motion & Uniform Circular Motion
 *
 * Interactive lab: launch a projectile, control launch speed / angle /
 * height / gravity, watch the parabolic flight animate in real time with
 * live kinematic readouts, then switch to the circular-motion bench to feel
 * centripetal acceleration. Textbook numerics throughout:
 *   x(t) = v0*cos(a)*t                    y(t) = h + v0*sin(a)*t - g*t^2/2
 *   Range R = v0*cos(a)*T,  T = (v0*sin(a) + sqrt((v0*sin a)^2 + 2 g h)) / g
 *   Peak  H = h + (v0 sin a)^2 / (2g)
 *   Uniform circular: a_c = v^2 / r,  v = 2*pi*r / T
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
  Target,
  Activity,
  Zap,
  Info,
  TrendingUp,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_phy_cbse_011', // Horizontal & oblique projections
  'c11_phy_cbse_012', // Equation of trajectory (parabola)
  'c11_phy_cbse_013', // Time of flight
  'c11_phy_cbse_014', // Maximum height
  'c11_phy_cbse_015', // Horizontal range; angle for max range
  'c11_phy_cbse_016', // Two angles for the same range
  'c11_phy_cbse_017', // Uniform circular motion
  'c11_phy_cbse_018', // Centripetal acceleration
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Launch' | 'Trajectory' | 'Timing' | 'Circular';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_phy_cbse_011: { id: 'c11_phy_cbse_011', title: 'Horizontal & Oblique Projection', category: 'Launch', desc: 'A projectile is any body thrown with an initial velocity that then moves only under gravity.', formula: 'v_x = v0 cos a (constant),  v_y = v0 sin a - g t' },
  c11_phy_cbse_012: { id: 'c11_phy_cbse_012', title: 'Equation of Trajectory', category: 'Trajectory', desc: 'Eliminating t between x(t) and y(t) gives a parabola - the path of every ideal projectile.', formula: 'y = x tan a - g x^2 / (2 v0^2 cos^2 a)' },
  c11_phy_cbse_013: { id: 'c11_phy_cbse_013', title: 'Time of Flight', category: 'Timing', desc: 'Total time the projectile stays airborne, from launch until it returns to launch height (or the ground).', formula: 'T = (v0 sin a + sqrt((v0 sin a)^2 + 2 g h)) / g' },
  c11_phy_cbse_014: { id: 'c11_phy_cbse_014', title: 'Maximum Height', category: 'Timing', desc: 'At the top of the flight the vertical velocity becomes zero; only the horizontal component survives.', formula: 'H = h + (v0 sin a)^2 / (2 g)' },
  c11_phy_cbse_015: { id: 'c11_phy_cbse_015', title: 'Horizontal Range', category: 'Launch', desc: 'Horizontal distance covered. On level ground it is maximum for a = 45 degrees.', formula: 'R = v0 cos a * T' },
  c11_phy_cbse_016: { id: 'c11_phy_cbse_016', title: 'Two Angles, Same Range', category: 'Trajectory', desc: 'Complementary angles (a and 90 - a) give the same range on level ground - the high lob and the flat drive.', formula: 'R(a) = R(90 - a) = v0^2 sin 2a / g' },
  c11_phy_cbse_017: { id: 'c11_phy_cbse_017', title: 'Uniform Circular Motion', category: 'Circular', desc: 'Motion with constant speed along a circle: the velocity vector keeps rotating while its magnitude is fixed.', formula: 'v = 2 pi r / T_period' },
  c11_phy_cbse_018: { id: 'c11_phy_cbse_018', title: 'Centripetal Acceleration', category: 'Circular', desc: 'The acceleration that only changes direction (not speed), always pointing at the centre.', formula: 'a_c = v^2 / r = omega^2 r' },
};

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'A projectile keeps a force pushing it forward after launch.',
    correction: 'After launch the ONLY force is gravity (downward). The horizontal velocity v0 cos a never changes because no horizontal force acts. Constant velocity needs no force - that is Newton I.',
    nodeId: 'c11_phy_cbse_011' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'At the highest point the velocity is zero.',
    correction: 'Only the VERTICAL component (v0 sin a - g t) is zero at the top. The horizontal component v0 cos a is still fully present, so the speed at the top is v0 cos a, not zero.',
    nodeId: 'c11_phy_cbse_014' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'Heavier projectiles fall faster and travel farther.',
    correction: 'Ignoring air resistance, g = 9.8 m/s^2 acts equally on every mass. A stone and a cannonball fired at the same speed and angle land together. Mass never appears in any projectile equation.',
    nodeId: 'c11_phy_cbse_015' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: '45 degrees always gives the maximum range.',
    correction: '45 degrees is the maximum ONLY on level ground (h = 0). When launched from a height, or with air drag, the optimum angle shifts below 45 degrees. Try h = 20 m in the lab and sweep the angle.',
    nodeId: 'c11_phy_cbse_015' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'Centripetal force is a new "extra" force acting outward.',
    correction: 'There is no outward centrifugal force in an inertial frame. "Centripetal" names the NET inward force supplied by real interactions - tension, gravity, friction. In circular motion the acceleration points inward, toward the centre.',
    nodeId: 'c11_phy_cbse_018' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'In circular motion the velocity is constant because the speed is constant.',
    correction: 'Velocity is a vector. With constant speed the direction changes continuously, so the velocity changes every instant - that change per unit time IS the centripetal acceleration v^2/r.',
    nodeId: 'c11_phy_cbse_017' as NodeId,
  },
];

// ==========================================
// CHALLENGES (mixed MCQ + numeric)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric';
  question: string;
  options?: string[];
  correctIndex?: number;
  answer?: number;          // accepted numeric answer
  unit?: string;
  tolerance?: number;       // relative tolerance for numeric answers
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch01',
    nodeId: 'c11_phy_cbse_013',
    type: 'numeric',
    question: 'A ball is kicked at 20 m/s at 30 degrees above the horizontal, from level ground. How long does it stay in the air? (g = 9.8 m/s^2)',
    answer: 2.04,
    unit: 's',
    tolerance: 0.02,
    explanation: 'T = 2 v0 sin a / g = 2 * 20 * 0.5 / 9.8 = 2.04 s. Only the vertical component 10 m/s decides the flight time.',
    hints: ['Only the vertical component v0 sin a rises and falls under gravity.', 'v0 sin 30 = 10 m/s. Time up = 10/9.8 s.', 'Total time = 2 * time up on level ground.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_phy_cbse_014',
    type: 'numeric',
    question: 'For the same kick (20 m/s at 30 degrees), what is the maximum height reached?',
    answer: 5.1,
    unit: 'm',
    tolerance: 0.03,
    explanation: 'H = (v0 sin a)^2 / (2g) = 10^2 / 19.6 = 5.10 m. The horizontal component contributes nothing to height.',
    hints: ['At the top v_y = 0. Use v_y^2 = (v0 sin a)^2 - 2 g H.', '(10)^2 = 2 * 9.8 * H.', 'H = 100 / 19.6 = 5.1 m.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_phy_cbse_015',
    type: 'mcq',
    question: 'Two balls are fired at 25 m/s, one at 30 degrees and one at 60 degrees (level ground). What is true?',
    options: [
      'The 30 degree ball lands much farther away',
      'They land at the same spot at the same time',
      'They land at the same spot but at different times',
      'The 60 degree ball never lands because it goes too high',
    ],
    correctIndex: 2,
    explanation: 'Range R = v0^2 sin(2a)/g. sin(60) = sin(120), so both ranges are equal (~55.4 m). But flight times differ: T = 2 v0 sin a / g gives 2.55 s vs 4.42 s.',
    hints: ['sin(2 * 30) and sin(2 * 60) - compare them.', 'sin 60 = sin 120 = 0.866. Ranges match.', 'The steeper ball spends more time up high.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_phy_cbse_012',
    type: 'mcq',
    question: 'A bullet is fired horizontally from a tower, and an identical bullet is dropped from the same height at the same instant. Which hits the ground first?',
    options: [
      'The dropped bullet - the fired one stays up longer',
      'The fired bullet - its speed beats gravity',
      'They land at the same time',
      'Impossible to say without the tower height',
    ],
    correctIndex: 2,
    explanation: 'Vertical motion is independent of horizontal motion. Both start with v_y = 0 and fall the same height under g, so t = sqrt(2h/g) is identical. The fired bullet merely lands farther away.',
    hints: ['Does the horizontal velocity affect the vertical drop?', 'The vertical equation h = (1/2) g t^2 contains no v_x.', 'Independence of perpendicular components - the key idea of this chapter.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_phy_cbse_018',
    type: 'numeric',
    question: 'A stone whirls on a 0.8 m string at 3 revolutions per second. What is its centripetal acceleration?',
    answer: 284,
    unit: 'm/s^2',
    tolerance: 0.03,
    explanation: 'omega = 2 pi f = 2 pi * 3 = 18.85 rad/s. a_c = omega^2 r = 355.3 * 0.8 = 284 m/s^2 (equivalently 4 pi^2 f^2 r). Over 28 times g - that is why your arm feels the pull.',
    hints: ['omega = 2 pi f first.', 'a_c = omega^2 r.', '4 pi^2 f^2 r with f = 3, r = 0.8 gives ~284 m/s^2.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_phy_cbse_017',
    type: 'mcq',
    question: 'A car rounds a circular bend at constant speed 20 m/s. Which statement is exactly correct?',
    options: [
      'Its acceleration is zero because the speed is constant',
      'Its velocity is constant because the speed is constant',
      'It is accelerating because the direction of velocity changes continuously',
      'It accelerates only while entering and leaving the bend',
    ],
    correctIndex: 2,
    explanation: 'Acceleration is the rate of change of velocity (a vector). On a curve, direction changes every instant, so acceleration a_c = v^2/r points toward the centre the whole time.',
    hints: ['Velocity includes direction.', 'Direction changes continuously on a circle.', 'a_c = v^2 / r is never zero on a curve.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_phy_cbse_016',
    type: 'numeric',
    question: 'For maximum range on level ground, a projectile is launched at 15 m/s. Find the range at the optimal angle. (g = 9.8)',
    answer: 22.96,
    unit: 'm',
    tolerance: 0.03,
    explanation: 'Optimal angle is 45 degrees: R = v0^2 / g = 225 / 9.8 = 22.96 m (since sin 90 = 1).',
    hints: ['At 45 degrees, sin(2a) = sin 90 = 1.', 'R_max = v0^2 / g.', '225 / 9.8 = 22.96 m.'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_phy_cbse_011',
    type: 'mcq',
    question: 'At the top of a projectile\'s flight (launched at 40 m/s, 53 degrees), the speed is closest to: (cos 53 = 0.6, sin 53 = 0.8)',
    options: ['0 m/s', '24 m/s', '32 m/s', '40 m/s'],
    correctIndex: 1,
    explanation: 'At the top only the horizontal component survives: v = v0 cos a = 40 * 0.6 = 24 m/s. The vertical component 32 m/s has been cancelled by gravity.',
    hints: ['Which component does gravity touch?', 'v_y is zero at the top; v_x = v0 cos a never changes.', '40 * 0.6 = 24 m/s.'],
  },
];

// ==========================================
// PREDICTIONS (explore-first questions)
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_phy_cbse_015' as NodeId,
    question: 'Predict: you double the launch speed but keep the angle at 45 degrees. What happens to the range on level ground?',
    options: [
      'It doubles',
      'It stays the same - gravity decides the range',
      'It becomes four times larger',
      'It increases by sqrt(2)',
    ],
    correctIndex: 2,
    verify: 'Verify in the Lab: fire at 10 m/s (range ~10.2 m), then at 20 m/s (range ~40.8 m).',
    explanation: 'R = v0^2 sin(2a)/g has v0 SQUARED. Doubling v0 multiplies R by 4. This is why artillery range is so sensitive to muzzle speed.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_phy_cbse_013' as NodeId,
    question: 'Predict: fire horizontally from a 45 m tower and from a 5 m tower at the same 10 m/s. How do the flight times compare?',
    options: [
      'Same time - horizontal speed controls time of flight',
      'The higher tower gives sqrt(9) = 3 times the flight time',
      'The higher tower gives exactly 9 times the flight time',
      'The lower tower gives a longer time because it lands sooner',
    ],
    correctIndex: 1,
    verify: 'Verify in the Lab: set angle to 0, height 45 m vs 5 m, and read Time of Flight.',
    explanation: 't = sqrt(2h/g) for horizontal launches. Height ratio 45/5 = 9 gives a time ratio of sqrt(9) = 3 - heights scale time by the square root.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Cricket Drive & Water-Jet Range Tables',
  steps: [
    'A fielder at the boundary sees a six hit at 28 m/s at 40 degrees. Estimate the range with R = v0^2 sin(2a)/g and decide whether to stand at 72 m or 80 m.',
    'A fire hose ejects water at 25 m/s from 1.5 m height. Compute the horizontal reach at 30 degrees using the lab, then re-check at 35 degrees.',
    'A 150 g ball on a 1.2 m string completes one loop in 0.5 s. Find the tension at the bottom using a_c = 4 pi^2 r / T^2 plus weight.',
    'A cyclist leans into a 30 m radius bend at 8 m/s. Compute the required centripetal acceleration and explain why leaning supplies it.',
  ],
};

// ==========================================
// SMALL UI PRIMITIVES
// ==========================================
function SliderControl(props: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  accent?: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-semibold text-slate-300">{props.label}</span>
        <span className="text-sm font-mono font-bold" style={{ color: props.accent || '#818cf8' }}>
          {props.value.toFixed(props.step < 0.1 ? 2 : props.step < 1 ? 1 : 0)} {props.unit}
        </span>
      </div>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e) => props.onChange(parseFloat(e.target.value))}
        className="w-full h-11 accent-gold-500 cursor-pointer"
      />
    </div>
  );
}

function StatBox(props: { label: string; value: string; unit?: string; color?: string; wide?: boolean }) {
  return (
    <div className={`bg-slate-950 border border-slate-800 rounded-xl p-3 ${props.wide ? 'col-span-2' : ''}`}>
      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{props.label}</p>
      <p className="text-xl font-bold font-mono" style={{ color: props.color || '#e2e8f0' }}>
        {props.value}
        {props.unit && <span className="text-xs text-slate-400 ml-1">{props.unit}</span>}
      </p>
    </div>
  );
}

function Toggle(props: { label: string; on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={props.onToggle}
      className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-all duration-200 ${
        props.on
          ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-900/40'
          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
      }`}
    >
      {props.label}: {props.on ? 'ON' : 'OFF'}
    </button>
  );
}

// ==========================================
// FLIGHT SVG (animated projectile view)
// ==========================================
function FlightCanvas(props: {
  x: number;            // current x (m)
  y: number;            // current y (m)
  h0: number;           // launch height (m)
  angleDeg: number;
  v0: number;
  vx: number;
  vy: number;
  g: number;
  trail: Array<{ x: number; y: number }>;
  showComponents: boolean;
  showIdealPath: boolean;
  scale: number;        // metres -> px factor
  groundY: number;      // px of ground line
}) {
  const px = (m: number) => 60 + m * props.scale;
  const py = (m: number) => props.groundY - m * props.scale;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  // ideal parabola (ideal-path preview)
  const a = (props.angleDeg * Math.PI) / 180;
  const pathPts: string[] = [];
  if (props.showIdealPath) {
    for (let i = 0; i <= 60; i++) {
      const xm = (i / 60) * (props.x > 0 ? props.x * 1.02 : 10);
      const c = Math.cos(a);
      const ym = props.h0 + xm * Math.tan(a) - (props.g * xm * xm) / (2 * props.v0 * props.v0 * c * c);
      pathPts.push(`${px(xm)},${py(Math.max(ym, 0))}`);
    }
  }

  return (
    <svg viewBox="0 0 640 360" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* sky gradient */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1120" />
          <stop offset="100%" stopColor="#111c33" />
        </linearGradient>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L7,3 L0,6 Z" fill="#fbbf24" />
        </marker>
      </defs>
      <rect x="0" y="0" width="640" height="360" fill="url(#sky)" />
      {/* ground */}
      <rect x="0" y={props.groundY} width="640" height={360 - props.groundY} fill="#1e293b" />
      <line x1="0" y1={props.groundY} x2="640" y2={props.groundY} stroke="#475569" strokeWidth="2" />
      {/* range ticks every 10 m */}
      {Array.from({ length: 13 }).map((_, i) => (
        <g key={i}>
          <line x1={px(i * 10)} y1={props.groundY} x2={px(i * 10)} y2={props.groundY + 6} stroke="#475569" strokeWidth="1" />
          <text x={px(i * 10)} y={props.groundY + 18} fill="#64748b" fontSize="9" textAnchor="middle">{i * 10}m</text>
        </g>
      ))}
      {/* ideal path */}
      {props.showIdealPath && pathPts.length > 1 && (
        <polyline points={pathPts.join(' ')} fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="5 5" />
      )}
      {/* trail (actual path so far) */}
      {props.trail.length > 1 && (
        <polyline
          points={props.trail.map((p) => `${px(p.x)},${py(Math.max(p.y, 0))}`).join(' ')}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          opacity="0.85"
        />
      )}
      {/* launcher */}
      <rect x={px(0) - 6} y={py(props.h0) - 4} width="14" height={props.groundY - py(props.h0) + 4} fill="#334155" rx="3" />
      {/* velocity components */}
      {props.showComponents && (
        <g>
          <line x1={px(props.x)} y1={py(props.y)} x2={px(props.x + props.vx * 0.25)} y2={py(props.y)}
            stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x={px(props.x + props.vx * 0.25) + 4} y={py(props.y) - 4} fill="#34d399" fontSize="10">vx {props.vx.toFixed(1)}</text>
          <line x1={px(props.x)} y1={py(props.y)} x2={px(props.x)} y2={py(props.y + props.vy * 0.25)}
            stroke="#f87171" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x={px(props.x) + 6} y={py(props.y + props.vy * 0.25)} fill="#f87171" fontSize="10">vy {props.vy.toFixed(1)}</text>
        </g>
      )}
      {/* projectile */}
      <circle cx={px(props.x)} cy={py(Math.max(props.y, 0))} r="8" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      {/* launch angle arc */}
      <path
        d={props.angleDeg > 0 && props.angleDeg < 90
          ? `M ${px(0) + 42} ${py(props.h0)} A 42 42 0 0 0 ${px(0) + 42 * Math.cos(a)} ${py(props.h0) - 42 * Math.sin(a)}`
          : ''}
        fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.7"
      />
      <text x={px(0) + 50} y={py(props.h0) - 10} fill="#fbbf24" fontSize="11" fontWeight="bold">
        a = {props.angleDeg.toFixed(0)} deg, v0 = {props.v0.toFixed(0)} m/s
      </text>
    </svg>
  );
}

// ==========================================
// CIRCULAR MOTION BENCH SVG
// ==========================================
function CircularBench(props: { r: number; omega: number; theta: number; showVectors: boolean }) {
  const cx = 320, cy = 180;
  const scale = Math.min(120 / props.r, 130);
  const px = cx + props.r * scale * Math.cos(props.theta);
  const py = cy - props.r * scale * Math.sin(props.theta);
  const speed = props.omega * props.r;
  return (
    <svg viewBox="0 0 640 360" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      <circle cx={cx} cy={cy} r={props.r * scale} fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx={cx} cy={cy} r="5" fill="#475569" />
      {/* radius line */}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#475569" strokeWidth="1.5" />
      <text x={(cx + px) / 2 + 8} y={(cy + py) / 2} fill="#94a3b8" fontSize="11">r = {props.r.toFixed(2)} m</text>
      {/* velocity tangent (green) */}
      {props.showVectors && (
        <g>
          <line x1={px} y1={py} x2={px - speed * 2.2 * Math.sin(props.theta)} y2={py - speed * 2.2 * Math.cos(props.theta)}
            stroke="#34d399" strokeWidth="2.5" />
          <text x={px - speed * 2.2 * Math.sin(props.theta)} y={py - speed * 2.2 * Math.cos(props.theta) - 6} fill="#34d399" fontSize="11">
            v = {speed.toFixed(2)} m/s
          </text>
          {/* centripetal acceleration inward (rose) */}
          <line x1={px} y1={py} x2={px + (cx - px) * 0.45} y2={py + (cy - py) * 0.45}
            stroke="#f87171" strokeWidth="2.5" />
          <text x={px + (cx - px) * 0.45} y={py + (cy - py) * 0.45 - 6} fill="#f87171" fontSize="11">
            a_c = {(speed * speed / props.r).toFixed(1)} m/s^2
          </text>
        </g>
      )}
      {/* ball */}
      <circle cx={px} cy={py} r="10" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
      <text x={cx} y={340} fill="#64748b" fontSize="11" textAnchor="middle">
        omega = {props.omega.toFixed(2)} rad/s,  period T = {(2 * Math.PI / Math.max(props.omega, 0.01)).toFixed(2)} s
      </text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_PhysicsProjectileMotionSim({
  initialNodeId = 'c11_phy_cbse_011',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  // Tabs
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Lab state: projectile ----
  const [v0, setV0] = useState(20);            // m/s
  const [angleDeg, setAngleDeg] = useState(45);
  const [h0, setH0] = useState(0);             // m
  const [gSel, setGSel] = useState(9.8);       // m/s^2
  const [showComponents, setShowComponents] = useState(true);
  const [showIdealPath, setShowIdealPath] = useState(true);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);               // flight clock (s)
  const [trail, setTrail] = useState<Array<{ x: number; y: number }>>([]);
  const [landedInfo, setLandedInfo] = useState<string | null>(null);

  // ---- Lab state: circular bench ----
  const [radius, setRadius] = useState(1.5);   // m
  const [period, setPeriod] = useState(2);     // s per revolution
  const [cirTheta, setCirTheta] = useState(0);
  const [cirRunning, setCirRunning] = useState(false);
  const [showVectors, setShowVectors] = useState(true);

  // ---- Predict state ----
  const [predAnswers, setPredAnswers] = useState<Record<string, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<string, boolean>>({});

  // ---- Challenge engine state ----
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

  // BKT + SRS
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const init: Record<string, ReturnType<typeof createBKTState>> = {};
    CBSE_NODES.forEach((id) => { init[id] = createBKTState(); });
    return init;
  });
  const [srsMap, setSrsMap] = useState<Record<string, ReviewItem>>(() => {
    const init: Record<string, ReviewItem> = {};
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'Projectile Motion'); });
    return init;
  });

  // ---- Flight numerics (always live) ----
  const angleRad = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(angleRad);
  const vy0 = v0 * Math.sin(angleRad);
  const tof = useMemo(
    () => (vy0 + Math.sqrt(Math.max(vy0 * vy0 + 2 * gSel * h0, 0))) / gSel,
    [vy0, h0, gSel]
  );
  const range = vx * tof;
  const peak = h0 + (vy0 * vy0) / (2 * gSel);

  // instantaneous state
  const yNow = h0 + vy0 * t - 0.5 * gSel * t * t;
  const vyNow = vy0 - gSel * t;
  const xNow = vx * t;
  const speedNow = Math.sqrt(vx * vx + vyNow * vyNow);

  // circular numerics
  const omega = (2 * Math.PI) / Math.max(period, 0.05);
  const vTan = omega * radius;
  const aCent = vTan * vTan / radius;

  // world-to-pixel scale: fit range (min 30 m)
  const worldWidth = Math.max(range * 1.08, 30);
  const scale = 540 / worldWidth;

  // ---- animation loop (projectile) ----
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      setT((prev) => {
        const next = prev + dt;
        if (next >= tof) {
          setRunning(false);
          setTrail((tr) => [...tr, { x: range, y: 0 }]);
          setLandedInfo(`Landed at ${range.toFixed(1)} m after ${tof.toFixed(2)} s`);
          return tof;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, [running, tof, range]);

  // trail capture (throttled by time changes)
  useEffect(() => {
    if (!running) return;
    setTrail((tr) => {
      const last = tr[tr.length - 1];
      if (last && Math.abs(last.x - xNow) < worldWidth / 200) return tr;
      return [...tr, { x: xNow, y: Math.max(yNow, 0) }];
    });
  }, [t, running, xNow, yNow, worldWidth]);

  // circular animation
  useEffect(() => {
    if (!cirRunning) return;
    const id = window.setInterval(() => {
      setCirTheta((prev) => prev + omega * 0.03);
    }, 30);
    return () => window.clearInterval(id);
  }, [cirRunning, omega]);

  // ---- handlers ----
  const fire = useCallback(() => {
    setT(0);
    setTrail([{ x: 0, y: h0 }]);
    setLandedInfo(null);
    setRunning(true);
  }, [h0]);

  const resetLab = useCallback(() => {
    setRunning(false);
    setCirRunning(false);
    setT(0);
    setTrail([]);
    setLandedInfo(null);
    setCirTheta(0);
    setV0(20); setAngleDeg(45); setH0(0); setGSel(9.8);
    setRadius(1.5); setPeriod(2);
  }, []);

  const sweepAngle = useCallback(() => {
    // "find my best angle": sample angles and report the argmax range
    let best = 0, bestR = -1;
    for (let a = 1; a < 90; a += 0.5) {
      const ar = (a * Math.PI) / 180;
      const vy = v0 * Math.sin(ar);
      const vx2 = v0 * Math.cos(ar);
      const tf = (vy + Math.sqrt(vy * vy + 2 * gSel * h0)) / gSel;
      const r = vx2 * tf;
      if (r > bestR) { bestR = r; best = a; }
    }
    setAngleDeg(Math.round(best));
    setLandedInfo(`Best angle from ${h0} m is ${best.toFixed(1)} deg giving ${bestR.toFixed(1)} m`);
  }, [v0, gSel, h0]);

  const submitPrediction = (predId: string, choice: number) => {
    const pred = PREDICTIONS.find((p) => p.id === predId);
    if (!pred || predSubmitted[predId]) return;
    const ok = choice === pred.correctIndex;
    setPredAnswers((m) => ({ ...m, [predId]: choice }));
    setPredSubmitted((m) => ({ ...m, [predId]: true }));
    setBktMap((map) => ({
      ...map,
      [pred.nodeId]: bktUpdate(map[pred.nodeId] || createBKTState(), ok),
    }));
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
    if (isCorrect) {
      setScore((s) => s + 10 + streak * 2);
      setStreak((s) => s + 1);
      setCorrectCount((c) => c + 1);
    } else {
      setStreak(0);
    }
    setBktMap((map) => ({
      ...map,
      [ch.nodeId]: bktUpdate(map[ch.nodeId] || createBKTState(), isCorrect),
    }));
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'Projectile Motion');
    setSrsMap((m) => ({ ...m, [ch.id]: sm2Update(srs, isCorrect ? 5 : 2, 0) }));
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    setHintIndex(0);
    if (currentChallengeIndex === CHALLENGES.length - 1) {
      const pct = Math.round((correctCount / Math.max(attemptedCount, 1)) * 100);
      recordGameScore([...CBSE_NODES], Math.max(pct, 20));
      onComplete?.(pct);
      setActiveTab('summary');
    } else {
      setCurrentChallengeIndex((i) => i + 1);
    }
  };

  const resetAll = () => {
    resetLab();
    setCurrentChallengeIndex(0);
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setScore(0);
    setStreak(0);
    setAttemptedCount(0);
    setCorrectCount(0);
    setPredAnswers({});
    setPredSubmitted({});
    setActiveTab('lab');
  };

  const currentChallenge = CHALLENGES[currentChallengeIndex];
  const avgMastery = Math.round(
    (CBSE_NODES.reduce((s, n) => s + (bktMap[n]?.pKnown ?? 0), 0) / CBSE_NODES.length) * 100
  );

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* HEADER */}
      <header className="bg-slate-900/80 border-b border-slate-800 px-4 py-4 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-100 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold-400" /> Projectile Motion &amp; Circular Motion
            </h1>
            <p className="text-xs text-slate-400">Class 11 Physics - Motion in a Plane - CBSE Chapter Lab</p>
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
        {/* TABS */}
        <div className="max-w-5xl mx-auto mt-3 flex gap-2 overflow-x-auto pb-1">
          {([
            ['lab', 'Lab', <Activity key="i" className="w-4 h-4" />],
            ['predict', 'Predict', <Lightbulb key="i" className="w-4 h-4" />],
            ['challenges', 'Challenges', <Zap key="i" className="w-4 h-4" />],
            ['misconceptions', 'Misconceptions', <AlertTriangle key="i" className="w-4 h-4" />],
            ['summary', 'Summary', <Award key="i" className="w-4 h-4" />],
          ] as Array<[typeof activeTab, string, JSX.Element]>).map(([tab, label, icon]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`min-h-11 px-4 rounded-xl text-sm font-bold flex items-center gap-2 border transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-900/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* ================= TAB: LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* projectile bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-gold-300 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Launch Bench - ideal projectiles (no air)
              </h2>
              <FlightCanvas
                x={xNow} y={Math.max(yNow, 0)} h0={h0}
                angleDeg={angleDeg} v0={v0} vx={vx} vy={vyNow} g={gSel}
                trail={trail} showComponents={showComponents} showIdealPath={showIdealPath}
                scale={scale} groundY={320 - (h0 * scale > 240 ? 240 : h0 * scale) - 20}
              />
              {/* live readouts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Time" value={t.toFixed(2)} unit="s" color="#818cf8" />
                <StatBox label="Position x" value={xNow.toFixed(1)} unit="m" color="#34d399" />
                <StatBox label="Height y" value={Math.max(yNow, 0).toFixed(1)} unit="m" color="#f87171" />
                <StatBox label="Speed" value={speedNow.toFixed(1)} unit="m/s" color="#fbbf24" />
              </div>
              {/* controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <SliderControl label="Launch speed v0" value={v0} min={2} max={60} step={1} unit="m/s" onChange={setV0} />
                <SliderControl label="Launch angle a" value={angleDeg} min={0} max={90} step={1} unit="deg" onChange={setAngleDeg} accent="#fbbf24" />
                <SliderControl label="Launch height h" value={h0} min={0} max={50} step={1} unit="m" onChange={setH0} accent="#34d399" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">Gravity g (pick a world)</p>
                  <div className="flex gap-2 flex-wrap">
                    {([['Earth 9.8', 9.8], ['Moon 1.6', 1.6], ['Mars 3.7', 3.7], ['Jupiter 24.8', 24.8]] as Array<[string, number]>).map(([label, gv]) => (
                      <button
                        key={label}
                        onClick={() => setGSel(gv)}
                        className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                          gSel === gv ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => setRunning((r) => !r)} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
                  {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {running ? 'Pause flight' : 'Fire!'}
                </button>
                <button onClick={fire} className="min-h-11 px-5 rounded-xl bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Re-fire
                </button>
                <button onClick={sweepAngle} className="min-h-11 px-5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-sm font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Find best angle
                </button>
                <Toggle label="Velocity arrows" on={showComponents} onToggle={() => setShowComponents((s) => !s)} />
                <Toggle label="Ideal path" on={showIdealPath} onToggle={() => setShowIdealPath((s) => !s)} />
              </div>
              {landedInfo && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-950/60 border border-emerald-700 text-emerald-200 text-sm font-semibold animate-fadeIn">
                  {landedInfo}
                </div>
              )}
              {/* predicted quantities */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Time of flight T" value={tof.toFixed(2)} unit="s" />
                <StatBox label="Range R = vx*T" value={range.toFixed(1)} unit="m" color="#34d399" />
                <StatBox label="Peak height H" value={peak.toFixed(1)} unit="m" color="#f87171" />
                <StatBox label="Top speed = v0" value={v0.toFixed(1)} unit="m/s" color="#fbbf24" />
              </div>
              <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Equations in use: x = v0 cos(a) t, y = h + v0 sin(a) t - g t^2 / 2, T = (v0 sin a + sqrt((v0 sin a)^2 + 2 g h)) / g, R = v0 cos(a) T.
              </p>
            </div>

            {/* complementary angles probe */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h3 className="text-md font-bold text-gold-300 mb-2">Complementary-angle probe (same range, different times)</h3>
              <p className="text-xs text-slate-400 mb-3">
                On level ground R = v0^2 sin(2a)/g, so a and 90 - a land identically. Current pair: {angleDeg.toFixed(0)} deg and {(90 - angleDeg).toFixed(0)} deg.
                Range at {angleDeg.toFixed(0)} deg: {(v0 * v0 * Math.sin(2 * angleRad) / gSel).toFixed(1)} m
                {h0 === 0 ? ' (exact pair, h = 0)' : ' (pair breaks when h > 0 - try it!)'}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="Range at a" value={(v0 * v0 * Math.sin(2 * angleRad) / gSel).toFixed(1)} unit="m" />
                <StatBox label="Flight time at 90-a" value={((v0 * Math.sin((90 - angleDeg) * Math.PI / 180) + Math.sqrt(Math.max(v0 * v0 * Math.pow(Math.sin((90 - angleDeg) * Math.PI / 180), 2), 0))) / gSel).toFixed(2)} unit="s" />
              </div>
            </div>

            {/* circular bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h3 className="text-lg font-bold text-rose-300 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Circular bench - uniform circular motion
              </h3>
              <CircularBench r={radius} omega={omega} theta={cirTheta} showVectors={showVectors} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <SliderControl label="Radius r" value={radius} min={0.3} max={3} step={0.05} unit="m" onChange={setRadius} accent="#f87171" />
                <SliderControl label="Period T" value={period} min={0.3} max={8} step={0.05} unit="s/rev" onChange={setPeriod} accent="#34d399" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="omega = 2pi/T" value={omega.toFixed(2)} unit="rad/s" />
                <StatBox label="Speed v = omega r" value={vTan.toFixed(2)} unit="m/s" color="#34d399" />
                <StatBox label="a_c = v^2/r" value={aCent.toFixed(2)} unit="m/s^2" color="#f87171" />
                <StatBox label="Revs per minute" value={((60 / Math.max(period, 0.05))).toFixed(0)} unit="rpm" />
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => setCirRunning((r) => !r)} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
                  {cirRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {cirRunning ? 'Stop' : 'Spin'}
                </button>
                <Toggle label="Vectors" on={showVectors} onToggle={() => setShowVectors((s) => !s)} />
              </div>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Set h = 20 m, v0 = 25 m/s and press &quot;Find best angle&quot; - the optimum is NOT 45 degrees any more. Why does a higher launch push the best angle below 45?</li>
                <li>Fire on the Moon (g = 1.6) at 30 m/s, 45 degrees, then re-fire on Earth. The range jumps by exactly the ratio of gravities: 9.8 / 1.6 = 6.1x. Check the Range readout.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: drop a ball and throw one horizontally from the same height - they land at the SAME instant. Gravity does not care about horizontal speed. Check the vy arrow: it grows identically for both.
              </p>
            </div>
          </div>
        )}

        {/* ================= TAB: PREDICT ================= */}
        {activeTab === 'predict' && (
          <div className="space-y-6 animate-fadeIn">
            {PREDICTIONS.map((pred) => {
              const chosen = predAnswers[pred.id];
              const submitted = predSubmitted[pred.id];
              const isRight = chosen === pred.correctIndex;
              return (
                <div key={pred.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                  <p className="text-[10px] uppercase tracking-wider text-gold-400 font-bold mb-2">Predict first - then verify</p>
                  <h3 className="text-base font-bold text-slate-100 mb-4">{pred.question}</h3>
                  <div className="space-y-2">
                    {pred.options.map((opt, i) => {
                      const isChosen = chosen === i;
                      const revealCorrect = submitted && i === pred.correctIndex;
                      const revealWrong = submitted && isChosen && !isRight;
                      return (
                        <button
                          key={i}
                          disabled={submitted}
                          onClick={() => submitPrediction(pred.id, i)}
                          className={`w-full text-left min-h-11 px-4 py-3 rounded-xl border text-sm transition-all ${
                            revealCorrect ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                              : revealWrong ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                              : isChosen ? 'bg-gold-950/70 border-gold-500 text-gold-100'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                          }`}
                        >
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

        {/* ================= TAB: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Challenge {currentChallengeIndex + 1} / {CHALLENGES.length}
                </p>
                <div className="flex gap-3 text-sm font-bold">
                  <span className="text-amber-400">Score {score}</span>
                  <span className="text-emerald-400">Streak {streak}</span>
                </div>
              </div>
              {/* progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mb-5 overflow-hidden">
                <div className="bg-gold-500 h-full transition-all duration-500" style={{ width: `${(currentChallengeIndex / CHALLENGES.length) * 100}%` }} />
              </div>

              <h3 className="text-base font-bold text-slate-100 mb-5">{currentChallenge.question}</h3>

              {currentChallenge.type === 'mcq' && (
                <div className="space-y-2">
                  {currentChallenge.options?.map((opt, i) => {
                    const submitted = challengeFeedback?.submitted;
                    const isCorrectOpt = i === currentChallenge.correctIndex;
                    const isChosen = selectedOption === i;
                    return (
                      <button
                        key={i}
                        disabled={submitted}
                        onClick={() => setSelectedOption(i)}
                        className={`w-full text-left min-h-11 px-4 py-3 rounded-xl border text-sm transition-all ${
                          submitted && isCorrectOpt ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : submitted && isChosen ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : isChosen ? 'bg-gold-950/70 border-gold-500 text-gold-100'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentChallenge.type === 'numeric' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    disabled={challengeFeedback?.submitted}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Type your number..."
                    className="flex-1 min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-4 text-lg font-mono text-slate-100 focus:border-gold-500 outline-none"
                  />
                  {currentChallenge.unit && <span className="text-slate-400 font-semibold">{currentChallenge.unit}</span>}
                </div>
              )}

              {/* hint ladder */}
              <button
                onClick={() => { setShowHint(true); setHintIndex((i) => Math.min(i + 1, currentChallenge.hints.length)); }}
                className="mt-4 min-h-11 px-4 rounded-xl bg-amber-900/40 border border-amber-700/50 text-amber-300 text-sm font-bold flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" /> {hintIndex === 0 ? 'Need a hint?' : hintIndex < currentChallenge.hints.length ? 'Another hint' : 'All hints shown'}
              </button>
              {showHint && currentChallenge.hints.slice(0, hintIndex).map((h, i) => (
                <p key={i} className="mt-2 text-sm text-amber-200/90 bg-amber-950/30 border border-amber-800/40 rounded-xl px-4 py-2">
                  Hint {i + 1}: {h}
                </p>
              ))}

              {/* submit / feedback */}
              {!challengeFeedback?.submitted ? (
                <button
                  onClick={handleSubmitChallenge}
                  className="mt-5 w-full min-h-11 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
                >
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
                  <button
                    onClick={handleNextChallenge}
                    className="w-full min-h-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"
                  >
                    {currentChallengeIndex === CHALLENGES.length - 1 ? 'Finish & See Mastery' : 'Next Challenge'} <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB: MISCONCEPTIONS ================= */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Misconception Killer
              </h2>
              <p className="text-slate-400 text-sm mb-6">The classic traps in projectile and circular motion - and what is actually true.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-5 h-5" /> What students believe
                    </div>
                    <p className="text-slate-200 text-sm font-semibold">{m.misconception}</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                      <CheckCircle2 className="w-5 h-5" /> What is true
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.correction}</p>
                    <p className="text-[10px] font-mono text-slate-600">{m.nodeId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB: SUMMARY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-amber-600/30 rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> {REAL_WORLD.title}
              </h2>
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
                <StatBox label="Best streak" value={String(streak)} color="#fbbf24" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-amber-400" /> Topic Mastery Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {CBSE_NODES.map((nodeId) => {
                  const m = Math.round((bktMap[nodeId]?.pKnown ?? 0) * 100);
                  const meta = NODE_METADATA[nodeId];
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1 leading-tight">{meta.title}</p>
                      <p className="text-[9px] font-mono text-slate-600 mb-1">{nodeId}</p>
                      <div className="text-lg font-bold text-gold-400">{m}%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div className="bg-gold-500 h-full transition-all duration-500" style={{ width: `${m}%` }} />
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
                    <p className="text-[10px] text-gold-300 font-bold">{NODE_METADATA[n].title}</p>
                    <p className="text-xs font-mono text-slate-300 mt-1">{NODE_METADATA[n].formula}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER GUIDED LINE (lab tab only, per brief) */}
      {activeTab === 'lab' && (
        <footer className="max-w-5xl mx-auto px-4 pb-8">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Touch first: <span className="text-slate-200 font-semibold">drag the angle slider, then press Fire!</span> Watch the vy arrow shrink to zero at the top.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
