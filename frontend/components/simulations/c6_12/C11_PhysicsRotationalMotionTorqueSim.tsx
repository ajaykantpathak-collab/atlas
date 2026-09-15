'use client';

/**
 * C11_PhysicsRotationalMotionTorqueSim.tsx
 * Class 11 Physics - System of Particles & Rotational Motion
 *
 * Lab 1: torque bench - apply a tangential force to a flywheel of chosen
 * shape (ring / disc / rod / solid sphere), mass and radius. The wheel
 * spins up with alpha = tau / I in real time while tau, I, omega, angular
 * momentum L = I*omega and rotational KE update live. Optional axle
 * friction torque can brake the wheel.
 * Lab 2: parallel-axis explorer - slide the rotation axis away from the
 * centre and watch I grow by M d^2 (Steiner's theorem), with the inertia
 * contribution shaded.
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
  Circle,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_phy_cbse_031', // Centre of mass of a two-particle / rigid body system
  'c11_phy_cbse_032', // Torque (moment of force)
  'c11_phy_cbse_033', // Moment of inertia & radius of gyration
  'c11_phy_cbse_034', // Standard moments: ring, disc, rod, sphere
  'c11_phy_cbse_035', // Angular acceleration, alpha = tau / I
  'c11_phy_cbse_036', // Angular momentum L = I omega and its conservation
  'c11_phy_cbse_037', // Parallel axis theorem (Steiner)
  'c11_phy_cbse_038', // Rotational kinetic energy and work-energy theorem
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Geometry' | 'Torque' | 'Inertia' | 'Dynamics';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_phy_cbse_031: { id: 'c11_phy_cbse_031', title: 'Centre of Mass', category: 'Geometry', desc: 'The mass-weighted mean position - the point where the whole system\'s mass seems to act under gravity.', formula: 'x_cm = (m1 x1 + m2 x2) / (m1 + m2)' },
  c11_phy_cbse_032: { id: 'c11_phy_cbse_032', title: 'Torque (Moment of Force)', category: 'Torque', desc: 'The turning effect of a force: bigger lever arm or bigger force means faster spin-up. tau = r F sin t.', formula: 'tau = r F sin t' },
  c11_phy_cbse_033: { id: 'c11_phy_cbse_033', title: 'Moment of Inertia', category: 'Inertia', desc: 'Rotational inertia: I = sum m r^2. Mass far from the axis resists spinning changes much more.', formula: 'I = sum m_i r_i^2 = M k^2' },
  c11_phy_cbse_034: { id: 'c11_phy_cbse_034', title: 'Standard Moments of Inertia', category: 'Inertia', desc: 'Ring: MR^2. Disc: MR^2/2. Rod (centre): ML^2/12. Solid sphere: 2MR^2/5. Same M and R, different spread.', formula: 'I_ring = MR^2,  I_disc = MR^2/2' },
  c11_phy_cbse_035: { id: 'c11_phy_cbse_035', title: 'Rotational Newton II', category: 'Dynamics', desc: 'The rotational twin of F = ma: angular acceleration is torque divided by moment of inertia.', formula: 'alpha = tau_net / I' },
  c11_phy_cbse_036: { id: 'c11_phy_cbse_036', title: 'Angular Momentum', category: 'Dynamics', desc: 'L = I omega. With zero net torque, L is conserved - the ice-skater effect: pull arms in, spin faster.', formula: 'L = I omega,  dL/dt = tau' },
  c11_phy_cbse_037: { id: 'c11_phy_cbse_037', title: 'Parallel Axis Theorem', category: 'Inertia', desc: 'Shift the axis by distance d and the inertia grows by exactly M d^2.', formula: 'I = I_cm + M d^2' },
  c11_phy_cbse_038: { id: 'c11_phy_cbse_038', title: 'Rotational Kinetic Energy', category: 'Dynamics', desc: 'Spinning stores energy: KE = I omega^2 / 2 - the work done by torque W = tau t shows up here.', formula: 'KE_rot = (1/2) I omega^2' },
};

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Moment of inertia depends only on the mass of the body.',
    correction: 'It depends on HOW the mass is spread relative to the axis. A ring and a disc with identical M and R have I = MR^2 vs MR^2/2 - the ring is twice as hard to spin up because all its mass sits at the rim.',
    nodeId: 'c11_phy_cbse_034' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'A force with a bigger magnitude always produces a bigger torque.',
    correction: 'Torque is r F sin t. A small force applied at the far end of a long spanner can beat a huge force applied at the hinge - and a force aimed straight at the axis (t = 0) gives zero torque no matter how large.',
    nodeId: 'c11_phy_cbse_032' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'When an ice skater pulls her arms in, her angular momentum increases.',
    correction: 'L stays constant (no external torque about the spin axis). What increases is omega: pulling mass inward reduces I, so L = I omega can only stay fixed if the spin rate grows.',
    nodeId: 'c11_phy_cbse_036' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: 'Torque and force are the same thing - just for rotation.',
    correction: 'Force changes linear motion; torque depends on WHERE the force is applied relative to the axis. Two equal opposite forces applied at different points give zero net force but a real (non-zero) torque - a couple.',
    nodeId: 'c11_phy_cbse_032' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'The parallel axis theorem adds M d^2 because of extra mass.',
    correction: 'No mass is added. Shifting the axis away from the centre of mass means every particle is now farther from the rotation axis, which raises each m r^2 term - the total increase is exactly M d^2.',
    nodeId: 'c11_phy_cbse_037' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'A rolling sphere and a sliding block of the same mass and speed have the same kinetic energy.',
    correction: 'The rolling body ALSO rotates: KE_total = (1/2) m v^2 + (1/2) I omega^2. For a solid sphere that is (7/10) m v^2 - 40% more than the sliding block. Rotation stores real energy.',
    nodeId: 'c11_phy_cbse_038' as NodeId,
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
    nodeId: 'c11_phy_cbse_034',
    type: 'numeric',
    question: 'A uniform disc of mass 2 kg and radius 0.5 m spins about its central axis. Find its moment of inertia.',
    answer: 0.25,
    unit: 'kg m^2',
    tolerance: 0.02,
    explanation: 'I_disc = (1/2) M R^2 = 0.5 * 2 * 0.25 = 0.25 kg m^2. A ring of the same M and R would be 0.5 kg m^2.',
    hints: ['Disc: I = (1/2) M R^2.', 'R^2 = 0.25.', '0.5 * 2 * 0.25 = 0.25.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_phy_cbse_035',
    type: 'numeric',
    question: 'A tangential force of 12 N acts on the rim of a wheel whose I = 0.6 kg m^2 and R = 0.4 m. Find the angular acceleration.',
    answer: 8,
    unit: 'rad/s^2',
    tolerance: 0.02,
    explanation: 'tau = F R = 12 * 0.4 = 4.8 N m. alpha = tau / I = 4.8 / 0.6 = 8.0 rad/s^2.',
    hints: ['Torque first: tau = F R.', 'tau = 4.8 N m.', 'alpha = tau / I = 4.8 / 0.6.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_phy_cbse_036',
    type: 'mcq',
    question: 'A dancer spinning with L conserved pulls her arms from 0.6 m to 0.2 m radius. Her moment of inertia becomes one third. Her new spin rate:',
    options: ['is one third of the old rate', 'is unchanged', 'is three times the old rate', 'is nine times the old rate'],
    correctIndex: 2,
    explanation: 'L = I omega is conserved. If I drops to I/3, omega must rise to 3 omega. Energy is NOT conserved here - her muscles do work, so rotational KE triples too.',
    hints: ['What stays constant when tau = 0?', 'L = I omega = constant.', 'I -> I/3 forces omega -> 3 omega.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_phy_cbse_037',
    type: 'numeric',
    question: 'A rod of I_cm = 0.08 kg m^2 about its centre has mass 3 kg. Its axis is shifted 0.4 m from the centre. Find the new I.',
    answer: 0.56,
    unit: 'kg m^2',
    tolerance: 0.02,
    explanation: 'Parallel axis: I = I_cm + M d^2 = 0.08 + 3 * 0.16 = 0.56 kg m^2. The M d^2 term dominates - offset axes are expensive.',
    hints: ['I = I_cm + M d^2.', 'M d^2 = 3 * 0.4^2.', '0.08 + 0.48 = 0.56.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_phy_cbse_032',
    type: 'mcq',
    question: 'You push a door with 20 N at its free edge (0.9 m from the hinge) at 60 degrees to the door plane. Another push of 40 N acts at the handle pointing straight at the hinge. Compare torques:',
    options: [
      'The 40 N push gives more torque because the force is bigger',
      'The 20 N push gives more torque: 20 * 0.9 * sin 60 = 15.6 N m vs 0',
      'Both give the same torque',
      'Neither produces torque - doors only need speed',
    ],
    correctIndex: 1,
    explanation: 'A force aimed at the axis has sin t = 0, so its torque is exactly zero. The angled push at the far edge gives tau = r F sin t = 0.9 * 20 * 0.866 = 15.6 N m. Direction matters as much as magnitude.',
    hints: ['tau = r F sin(t).', 'What is sin(t) when the force line passes through the axis?', '40 N * 0 = 0 N m.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_phy_cbse_038',
    type: 'numeric',
    question: 'A flywheel with I = 0.9 kg m^2 spins at 20 rad/s. What is its rotational kinetic energy?',
    answer: 180,
    unit: 'J',
    tolerance: 0.02,
    explanation: 'KE = (1/2) I omega^2 = 0.5 * 0.9 * 400 = 180 J. Doubling omega quadruples it.',
    hints: ['KE_rot = (1/2) I omega^2.', 'omega^2 = 400.', '0.45 * 400 = 180 J.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_phy_cbse_031',
    type: 'mcq',
    question: 'Two masses 2 kg and 6 kg sit 0.5 m apart on a light rod. The centre of mass is located:',
    options: ['0.125 m from the 2 kg mass', '0.25 m from the 2 kg mass', '0.375 m from the 2 kg mass', 'exactly at the 6 kg mass'],
    correctIndex: 2,
    explanation: 'x_cm from the 2 kg mass = (6 * 0.5)/(2 + 6) = 3/8 = 0.375 m. The COM always sits closer to the heavier mass (mass-weighted average).',
    hints: ['x_cm = (m2 * d)/(m1 + m2) measured from m1.', 'Heavier mass pulls the COM toward itself.', '3/8 m = 0.375 m.'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_phy_cbse_035',
    type: 'mcq',
    question: 'Same torque is applied to a ring and a solid disc of identical mass and radius, both starting from rest. After 2 seconds:',
    options: [
      'The ring spins faster - mass at the rim grips better',
      'The disc spins faster because its smaller I allows larger alpha',
      'They spin identically - torque is all that matters',
      'The ring does not rotate at all',
    ],
    correctIndex: 1,
    explanation: 'alpha = tau/I. I_ring = MR^2 vs I_disc = MR^2/2, so the disc\'s alpha is twice as large and after the same time omega is twice as large. Distribution of mass decides the race.',
    hints: ['alpha = tau / I.', 'Which body has the smaller I for the same M, R?', 'Disc: half the inertia, double the alpha.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_phy_cbse_034' as NodeId,
    question: 'Predict: a ring and a disc (same M, same R) race down a frictionless-axle spin-up with the same torque. Which reaches 10 rad/s first?',
    options: [
      'The ring - rim mass gives it more grip',
      'The disc - its I is half, so alpha is double',
      'They tie - torque alone decides',
      'Neither reaches 10 rad/s',
    ],
    correctIndex: 1,
    verify: 'Verify in the Lab: pick Ring vs Disc with the same M, R and F, press Apply Torque and compare the omega readout after the same run time.',
    explanation: 'alpha = tau/I. With I_disc = MR^2/2 = I_ring/2, the disc gains angular speed twice as fast. Mass at the rim is the enemy of spin-up.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_phy_cbse_037' as NodeId,
    question: 'Predict: you shift the rotation axis of a disc by d = R (one full radius). Its moment of inertia becomes:',
    options: [
      'unchanged - the axis shift does nothing',
      'I_cm + M R^2 = 1.5 M R^2',
      '2 M R^2',
      'M R^2 / 2 only',
    ],
    correctIndex: 1,
    verify: 'Verify on the Parallel-Axis bench: slide d to R and read the inertia figure against the formula strip.',
    explanation: 'Steiner: I = I_cm + M d^2 = MR^2/2 + MR^2 = 1.5 MR^2 - triple the central value. Shifting an axis outward is the fastest way to inflate inertia.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Flywheel Design & Ice-Skater Spin Audit',
  steps: [
    'A temple chariot wheel (ring, 30 kg, 0.6 m) must reach 8 rad/s in 5 s. Compute the required torque and pick a motor from a 20 / 40 / 60 N m catalogue.',
    'An engine flywheel uses a solid disc (12 kg, 0.25 m). Find I, the KE stored at 3000 rpm, and compare with a ring of the same spec.',
    'A skater spins at 2 rev/s with arms out (I = 4.2 kg m^2). She pulls in to I = 1.4 kg m^2. Find the new spin rate and the work her muscles did.',
    'A torque wrench applies 90 N m on a 0.45 m handle. At what minimum force and angle is this achievable? Explain why a 200 N push at 20 degrees may fail.',
  ],
};

// ==========================================
// SMALL UI PRIMITIVES
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
          {props.value.toFixed(props.step < 0.1 ? 2 : props.step < 1 ? 1 : 0)} {props.unit}
        </span>
      </div>
      <input type="range" min={props.min} max={props.max} step={props.step} value={props.value}
        onChange={(e) => props.onChange(parseFloat(e.target.value))}
        className="w-full h-11 accent-indigo-500 cursor-pointer" />
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
// SHAPE FACTORY (real moments of inertia)
// ==========================================
type ShapeKey = 'ring' | 'disc' | 'rod' | 'sphere';

const SHAPES: Record<ShapeKey, { label: string; kFactor: number; note: string }> = {
  ring: { label: 'Ring (hoop)', kFactor: 1.0, note: 'I = M R^2 - all mass at the rim' },
  disc: { label: 'Disc', kFactor: 0.5, note: 'I = M R^2 / 2 - mass spread through' },
  rod: { label: 'Rod (about centre)', kFactor: 1 / 3, note: 'I = M L^2 / 12 - modelled as R = L/2 disc plane' },
  sphere: { label: 'Solid sphere', kFactor: 0.4, note: 'I = 2 M R^2 / 5 - the easiest to spin' },
};

// ==========================================
// FLYWHEEL CANVAS
// ==========================================
function FlywheelCanvas(props: {
  theta: number; radius: number; shape: ShapeKey; mass: number;
  force: number; R: number; brakeTorque: number; omega: number; showSpokes: boolean;
}) {
  const cx = 320, cy = 170;
  const pxScale = Math.min(120 / props.R, 110);
  const px = props.R * pxScale;
  const I = props.mass * SHAPES[props.shape].kFactor * props.R * props.R;
  const tau = props.force * props.R - props.brakeTorque;
  const spokes = props.shape === 'rod' ? 2 : props.shape === 'ring' ? 4 : 6;
  return (
    <svg viewBox="0 0 640 340" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      <g transform={`translate(${cx},${cy}) rotate(${(props.theta * 180) / Math.PI})`}>
        {/* body */}
        {props.shape === 'ring' ? (
          <circle r={px} fill="none" stroke="#6366f1" strokeWidth={Math.max(px * 0.22, 8)} />
        ) : props.shape === 'disc' ? (
          <circle r={px} fill="#312e81" stroke="#818cf8" strokeWidth="2" opacity="0.9" />
        ) : props.shape === 'rod' ? (
          <rect x={-px} y={-10} width={2 * px} height={20} rx="8" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
        ) : (
          <circle r={px} fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
        )}
        {/* spokes to see the rotation */}
        {props.showSpokes && Array.from({ length: spokes }).map((_, i) => {
          const a = (i * 2 * Math.PI) / spokes;
          return (
            <line key={i} x1={px * 0.25 * Math.cos(a)} y1={px * 0.25 * Math.sin(a)}
              x2={px * 0.95 * Math.cos(a)} y2={px * 0.95 * Math.sin(a)}
              stroke="#a5b4fc" strokeWidth="2" opacity="0.75" />
          );
        })}
        {/* painted marker dot on the rim */}
        <circle cx={px * 0.97} cy={0} r="6" fill="#fbbf24" />
      </g>
      {/* axle */}
      <circle cx={cx} cy={cy} r="7" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
      {/* tangential force arrow */}
      {props.force > 0.5 && (
        <g>
          <line x1={cx + px + 60} y1={cy - px} x2={cx + px} y2={cy - px} stroke="#fbbf24" strokeWidth="4" />
          <path d={`M ${cx + px} ${cy - px} l 12 -6 l 0 12 Z`} fill="#fbbf24" />
          <text x={cx + px + 64} y={cy - px - 8} fill="#fbbf24" fontSize="12">F = {props.force.toFixed(0)} N (tangential)</text>
        </g>
      )}
      {/* brake torque label */}
      {props.brakeTorque > 0.01 && (
        <text x={cx} y={cy + px + 34} fill="#f87171" fontSize="11" textAnchor="middle">
          axle brake: {props.brakeTorque.toFixed(1)} N m opposing
        </text>
      )}
      {/* live status */}
      <text x={320} y={28} fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="bold">
        {SHAPES[props.shape].label}: I = {I.toFixed(3)} kg m^2,  tau_net = {tau.toFixed(2)} N m,  omega = {props.omega.toFixed(2)} rad/s
      </text>
      <text x={320} y={322} fill="#64748b" fontSize="11" textAnchor="middle">
        {SHAPES[props.shape].note} - alpha = tau/I = {(tau / Math.max(I, 1e-6)).toFixed(2)} rad/s^2
      </text>
    </svg>
  );
}

// ==========================================
// PARALLEL AXIS CANVAS
// ==========================================
function ParallelAxisCanvas(props: { d: number; M: number; Icm: number; showShade: boolean }) {
  const cx = 260, cy = 180;
  const Rpx = 70;
  const axisX = cx + props.d * (110 / 1.5);      // d slider 0..1.5 m
  const Itot = props.Icm + props.M * props.d * props.d;
  return (
    <svg viewBox="0 0 640 340" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* shaded translation region */}
      {props.showShade && (
        <rect x={cx - Rpx} y={cy - Rpx} width={axisX - cx + 2 * Rpx} height={2 * Rpx}
          fill="#6366f1" opacity="0.08" />
      )}
      {/* disc */}
      <circle cx={cx} cy={cy} r={Rpx} fill="#312e81" stroke="#818cf8" strokeWidth="2" />
      {/* centre of mass axis */}
      <line x1={cx} y1={cy - 100} x2={cx} y2={cy + 100} stroke="#34d399" strokeWidth="2" strokeDasharray="6 4" />
      <text x={cx} y={cy - 108} fill="#34d399" fontSize="11" textAnchor="middle">CM axis, I_cm = {props.Icm.toFixed(3)}</text>
      {/* shifted axis */}
      <line x1={axisX} y1={cy - 120} x2={axisX} y2={cy + 120} stroke="#fbbf24" strokeWidth="2.5" />
      <text x={axisX} y={cy - 128} fill="#fbbf24" fontSize="11" textAnchor="middle">new axis</text>
      {/* d marker */}
      <line x1={cx} y1={cy + 118} x2={axisX} y2={cy + 118} stroke="#94a3b8" strokeWidth="1.5" />
      <text x={(cx + axisX) / 2} y={cy + 134} fill="#94a3b8" fontSize="11" textAnchor="middle">d = {props.d.toFixed(2)} m</text>
      {/* readout */}
      <text x={540} y={150} fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="bold">
        I = I_cm + M d^2
      </text>
      <text x={540} y={176} fill="#fbbf24" fontSize="16" textAnchor="middle" fontWeight="bold">
        {Itot.toFixed(3)} kg m^2
      </text>
      <text x={540} y={200} fill="#64748b" fontSize="11" textAnchor="middle">
        M d^2 adds {(props.M * props.d * props.d).toFixed(3)}
      </text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_PhysicsRotationalMotionTorqueSim({
  initialNodeId = 'c11_phy_cbse_031',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Torque bench state ----
  const [shape, setShape] = useState<ShapeKey>('disc');
  const [mass, setMass] = useState(4);
  const [R, setR] = useState(0.5);
  const [force, setForce] = useState(10);
  const [brakeTorque, setBrakeTorque] = useState(0);
  const [running, setRunning] = useState(false);
  const [omega, setOmega] = useState(0);
  const [theta, setTheta] = useState(0);
  const [showSpokes, setShowSpokes] = useState(true);

  // ---- Parallel axis state ----
  const [d, setD] = useState(0.5);
  const [paMass, setPaMass] = useState(3);
  const [paShape, setPaShape] = useState<ShapeKey>('disc');
  const [showShade, setShowShade] = useState(true);

  const I = mass * SHAPES[shape].kFactor * R * R;
  const tauApplied = force * R;
  const tauEff = tauApplied - (omega > 0.001 ? brakeTorque : 0);
  const alpha = I > 0 ? tauEff / I : 0;

  // spin-up animation
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running) { lastTsRef.current = null; return; }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
      lastTsRef.current = ts;
      setOmega((w) => {
        const effectiveTau = tauApplied - (w > 0.001 ? brakeTorque : 0);
        const nw = w + (effectiveTau / Math.max(I, 1e-6)) * dt;
        return Math.max(nw, 0);
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, [running, tauApplied, brakeTorque, I]);

  useEffect(() => {
    // theta integrates from omega for smooth visuals
    if (!running) return;
    const id = window.setInterval(() => setTheta((t) => t + omega * 0.03), 30);
    return () => window.clearInterval(id);
  }, [running, omega]);

  // parallel-axis numerics
  const paIcm = paMass * SHAPES[paShape].kFactor * 0.75;   // R fixed at 0.5 m -> R^2 = 0.25... scaled disc
  const paI = paIcm + paMass * d * d;

  const L = I * omega;
  const keRot = 0.5 * I * omega * omega;
  const kGyr = Math.sqrt(SHAPES[shape].kFactor);

  const resetLab = useCallback(() => {
    setRunning(false); setOmega(0); setTheta(0);
    setShape('disc'); setMass(4); setR(0.5); setForce(10); setBrakeTorque(0);
    setD(0.5); setPaMass(3); setPaShape('disc');
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
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'Rotational Motion'); });
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
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'Rotational Motion');
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
              <Circle className="w-5 h-5 text-indigo-400" /> Rotational Motion: Torque &amp; Inertia
            </h1>
            <p className="text-xs text-slate-400">Class 11 Physics - System of Particles &amp; Rotational Motion - CBSE Chapter Lab</p>
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
            {/* torque bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" /> Torque bench - spin up real rigid bodies
              </h2>
              <FlywheelCanvas theta={theta} radius={R} shape={shape} mass={mass} force={force}
                R={R} brakeTorque={brakeTorque} omega={omega} showSpokes={showSpokes} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">Body shape</p>
                  <div className="flex gap-2 flex-wrap">
                    {(Object.keys(SHAPES) as ShapeKey[]).map((k) => (
                      <button key={k} onClick={() => { setShape(k); setOmega(0); setTheta(0); }}
                        className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                          shape === k ? 'bg-violet-600 border-violet-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}>
                        {SHAPES[k].label}
                      </button>
                    ))}
                  </div>
                </div>
                <SliderControl label="Mass M" value={mass} min={1} max={20} step={1} unit="kg" onChange={setMass} />
                <SliderControl label="Radius R" value={R} min={0.1} max={1} step={0.05} unit="m" onChange={setR} accent="#34d399" />
                <SliderControl label="Tangential force F at rim" value={force} min={0} max={50} step={1} unit="N" onChange={setForce} accent="#fbbf24" />
                <SliderControl label="Axle brake torque" value={brakeTorque} min={0} max={10} step={0.5} unit="N m" onChange={setBrakeTorque} accent="#f87171" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Moment of inertia I" value={I.toFixed(3)} unit="kg m^2" color="#818cf8" />
                <StatBox label="Torque tau = F R" value={tauApplied.toFixed(2)} unit="N m" color="#fbbf24" />
                <StatBox label="alpha = tau/I" value={alpha.toFixed(2)} unit="rad/s^2" color="#34d399" />
                <StatBox label="omega now" value={omega.toFixed(2)} unit="rad/s" color="#fbbf24" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <StatBox label="Angular momentum L" value={L.toFixed(2)} unit="kg m^2/s" color="#22d3ee" />
                <StatBox label="Rotational KE" value={keRot.toFixed(1)} unit="J" color="#f87171" />
                <StatBox label="Radius of gyration k" value={(kGyr * R).toFixed(3)} unit="m" />
                <StatBox label="Period of spin" value={omega > 0.01 ? (2 * Math.PI / omega).toFixed(2) : '-'} unit="s" />
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => setRunning((r) => !r)} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
                  {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {running ? 'Pause spin-up' : 'Apply torque'}
                </button>
                <button onClick={() => { setRunning(false); setOmega(0); setTheta(0); }} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-bold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Stop &amp; zero omega
                </button>
                <Toggle label="Spokes" on={showSpokes} onToggle={() => setShowSpokes((s) => !s)} />
              </div>
              <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Model: tau = F R (force applied tangentially at the rim), alpha = tau_net / I, omega grows linearly. Turn on the brake to see a terminal omega where F R equals the brake torque - rotational "terminal velocity".
              </p>
            </div>

            {/* parallel axis bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-lg font-bold text-violet-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Parallel-axis explorer - Steiner's theorem
              </h2>
              <ParallelAxisCanvas d={d} M={paMass} Icm={paIcm} showShade={showShade} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <SliderControl label="Axis offset d" value={d} min={0} max={1.5} step={0.05} unit="m" onChange={setD} accent="#fbbf24" />
                <SliderControl label="Mass" value={paMass} min={1} max={15} step={1} unit="kg" onChange={setPaMass} />
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-xs font-semibold text-slate-300">Body (R fixed at 0.5 m for I_cm)</p>
                  <div className="flex gap-2 flex-wrap">
                    {(Object.keys(SHAPES) as ShapeKey[]).slice(0, 3).map((k) => (
                      <button key={k} onClick={() => setPaShape(k)}
                        className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                          paShape === k ? 'bg-violet-600 border-violet-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}>
                        {SHAPES[k].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="I_cm" value={paIcm.toFixed(3)} unit="kg m^2" color="#34d399" />
                <StatBox label="M d^2 penalty" value={(paMass * d * d).toFixed(3)} unit="kg m^2" color="#f87171" />
                <StatBox label="Total I" value={paI.toFixed(3)} unit="kg m^2" color="#fbbf24" />
                <StatBox label="Growth factor" value={(paI / Math.max(paIcm, 1e-6)).toFixed(2)} unit="x" />
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                <Toggle label="Shade shift region" on={showShade} onToggle={() => setShowShade((s) => !s)} />
              </div>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Keep M and R fixed; switch Ring to Disc and re-run with the same force. The disc reaches any given omega exactly TWICE as fast - check the alpha readout (I halves, alpha doubles).</li>
                <li>Set a brake torque of 2 N m with F = 10 N, R = 0.5 m. The wheel stops accelerating at omega where F R = brake: it coasts at a constant rate. Predict first, then verify.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: aim the force at the axle (try the idea in ch05!) and torque is ZERO regardless of force size. Only the tangential component r F sin t turns the wheel.
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
              <p className="text-slate-400 text-sm mb-6">Rotation traps: torque vs force, inertia vs mass, conservation vs energy.</p>
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
              Touch first: <span className="text-slate-200 font-semibold">switch Ring to Disc and press Apply torque</span> - same push, very different spin-up.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
