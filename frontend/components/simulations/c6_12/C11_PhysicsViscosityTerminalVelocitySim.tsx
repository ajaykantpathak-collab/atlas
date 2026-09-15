'use client';

/**
 * C11_PhysicsViscosityTerminalVelocitySim.tsx
 * Class 11 Physics - Mechanical Properties of Fluids - viscosity & terminal
 * velocity (Stokes' law)
 *
 * Lab 1: drop a sphere into a fluid column. Choose radius, sphere density
 * and fluid (water / glycerine / castor oil / honey) and watch the ball
 * accelerate, then settle at the exact textbook terminal velocity
 *   v_t = (2 r^2 g (rho_s - rho_f)) / (9 eta)
 * with a live velocity-time trace, drag readout F = 6 pi eta r v and
 * Reynolds number honesty check.
 * Lab 2: viscosity-temperature explorer - most liquids thin down as they
 * warm; slide temperature along eta(T) = eta_20 * exp(-b (T - 20)) and
 * watch terminal velocity climb.
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
  Droplets,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_phy_cbse_041', // Viscosity: definition and velocity gradient
  'c11_phy_cbse_042', // Newton's law of viscosity, F = -eta A dv/dx
  'c11_phy_cbse_043', // Stokes' law for a slow sphere
  'c11_phy_cbse_044', // Terminal velocity derivation
  'c11_phy_cbse_045', // Dependence on r^2 and density contrast
  'c11_phy_cbse_046', // Effect of temperature on viscosity of liquids
  'c11_phy_cbse_047', // Reynolds number: laminar vs turbulent
  'c11_phy_cbse_048', // Real-life roles: rain drops, blood flow, lubricants
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Viscosity' | 'Stokes' | 'Terminal' | 'Regimes';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_phy_cbse_041: { id: 'c11_phy_cbse_041', title: 'What Viscosity Is', category: 'Viscosity', desc: 'Internal friction of a fluid: the drag between layers sliding past each other. Honey fights flow; water barely objects.', formula: 'high eta = thick, low eta = runny' },
  c11_phy_cbse_042: { id: 'c11_phy_cbse_042', title: "Newton's Law of Viscosity", category: 'Viscosity', desc: 'The tangential stress between layers is proportional to the velocity gradient.', formula: 'F = -eta A (dv/dx)' },
  c11_phy_cbse_043: { id: 'c11_phy_cbse_043', title: "Stokes' Law", category: 'Stokes', desc: 'For a small sphere creeping slowly through a fluid, drag grows linearly with speed.', formula: 'F_drag = 6 pi eta r v' },
  c11_phy_cbse_044: { id: 'c11_phy_cbse_044', title: 'Terminal Velocity', category: 'Terminal', desc: 'Drag rises with v until weight minus buoyancy is fully cancelled - the sphere then falls at constant speed.', formula: 'v_t = 2 r^2 g (rho_s - rho_f) / (9 eta)' },
  c11_phy_cbse_045: { id: 'c11_phy_cbse_045', title: 'r^2 Sensitivity', category: 'Terminal', desc: 'Halve the radius and terminal velocity drops FOUR-fold: small droplets fall gently, big ones fall hard.', formula: 'v_t proportional to r^2' },
  c11_phy_cbse_046: { id: 'c11_phy_cbse_046', title: 'Temperature Effect', category: 'Terminal', desc: 'Liquids lose viscosity quickly as they warm (weakened intermolecular forces) - engine oil must be graded for this.', formula: 'eta(T) = eta_20 e^(-b (T-20))' },
  c11_phy_cbse_047: { id: 'c11_phy_cbse_047', title: 'Reynolds Number', category: 'Regimes', desc: 'Ratio of inertial to viscous effects. Re < ~2000 in a pipe is laminar; Stokes\' law is honest only for small Re.', formula: 'Re = rho_f v d / eta' },
  c11_phy_cbse_048: { id: 'c11_phy_cbse_048', title: 'Why It Matters', category: 'Regimes', desc: 'Raindrops never exceed ~9 m/s because of v_t; blood cells are sized by viscosity; lubricant grades are eta vs temperature tables.', formula: 'v_t(rain ~1 mm) = ~4-9 m/s' },
};

// ==========================================
// FLUID LIBRARY (realistic values)
// ==========================================
interface Fluid {
  key: string;
  label: string;
  eta: number;        // Pa s at 20 C
  rho: number;        // kg/m^3
  b: number;          // temperature thinning factor (1/K), illustrative
  color: string;
}

const FLUIDS: Fluid[] = [
  { key: 'water', label: 'Water (20 C)', eta: 0.001, rho: 1000, b: 0.025, color: '#38bdf8' },
  { key: 'glycerine', label: 'Glycerine', eta: 1.41, rho: 1260, b: 0.05, color: '#a3e635' },
  { key: 'castor', label: 'Castor oil', eta: 0.985, rho: 960, b: 0.06, color: '#fbbf24' },
  { key: 'honey', label: 'Honey', eta: 10.0, rho: 1420, b: 0.09, color: '#f59e0b' },
];

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Terminal velocity depends on the mass of the falling body.',
    correction: 'For a sphere, v_t = 2 r^2 g (rho_s - rho_f)/(9 eta). What enters is DENSITY (mass per volume) and radius - not total mass. A big light ball can fall slower than a small dense one.',
    nodeId: 'c11_phy_cbse_044' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'A falling object stops accelerating the instant it is released.',
    correction: 'Acceleration starts at g. Drag is zero at v = 0 and grows with speed, so the DECELERATION of the net force is gradual - the v-t curve bends smoothly toward v_t, never jumps to it.',
    nodeId: 'c11_phy_cbse_043' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'Heavier raindrops always hit the ground much harder because gravity acts longer on them.',
    correction: 'Every drop approaches its own v_t, and v_t scales as r^2 - so bigger drops DO fall faster, but they hit at a bounded terminal speed (~9 m/s max), not at free-fall speeds. Drag caps the damage.',
    nodeId: 'c11_phy_cbse_048' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: 'Viscosity is the same thing as density.',
    correction: 'Density is mass per volume; viscosity is resistance to shearing flow. Castor oil (rho ~ 960) is LESS dense than water (1000) yet about 1000x more viscous.',
    nodeId: 'c11_phy_cbse_041' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'Stokes\' law works for any sphere at any speed.',
    correction: 'It assumes slow, laminar creeping flow (small Reynolds number). Large, fast spheres bend the v-t curve away from the simple model - the sim shows the Re readout so you know when to distrust it.',
    nodeId: 'c11_phy_cbse_047' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'Warming a liquid makes it MORE viscous, like gases.',
    correction: 'Liquids thin dramatically on heating (intermolecular cohesion weakens) while gases thicken slightly (more molecular mixing). Engine oil grades exist precisely because of the liquid behaviour.',
    nodeId: 'c11_phy_cbse_046' as NodeId,
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
    nodeId: 'c11_phy_cbse_044',
    type: 'numeric',
    question: 'A steel ball (rho_s = 7800 kg/m^3) of radius 2 mm falls through glycerine (eta = 1.41 Pa s, rho_f = 1260). Find the terminal velocity. (g = 9.8)',
    answer: 0.032,
    unit: 'm/s',
    tolerance: 0.06,
    explanation: 'v_t = 2 r^2 g (rho_s - rho_f)/(9 eta) = 2 * 4e-6 * 9.8 * 6540 / 12.69 = 0.032 m/s (3.2 cm/s). Dense steel still creeps through glycerine.',
    hints: ['v_t = 2 r^2 g (rho_s - rho_f) / (9 eta).', 'r^2 = 4e-6 m^2; density difference 6540.', 'Numerator 2*4e-6*9.8*6540 = 0.513; divide by 12.69.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_phy_cbse_045',
    type: 'mcq',
    question: 'A raindrop of radius 1 mm has terminal velocity 4 m/s. A geometrically similar drop of radius 2 mm has v_t about:',
    options: ['2 m/s', '4 m/s', '8 m/s', '16 m/s'],
    correctIndex: 3,
    explanation: 'v_t proportional to r^2: doubling the radius multiplies terminal velocity by 4. This is why large drops fall dramatically faster than drizzle.',
    hints: ['v_t scales with r^2.', 'Radius doubles -> factor 2^2.', '4 m/s * 4 = 16 m/s.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_phy_cbse_043',
    type: 'numeric',
    question: 'A sphere of radius 1 mm moves at 0.05 m/s through water (eta = 0.001 Pa s). What drag force does Stokes\' law predict?',
    answer: 0.00094,
    unit: 'N',
    tolerance: 0.06,
    explanation: 'F = 6 pi eta r v = 6 * 3.1416 * 0.001 * 0.001 * 0.05 = 9.4e-4 N (about a millinewton). Tiny spheres feel tiny drags.',
    hints: ['F = 6 pi eta r v.', 'eta = 1e-3, r = 1e-3, v = 5e-2.', '6 * 3.1416 * 1e-3 * 1e-3 * 5e-2 = 9.4e-4 N.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_phy_cbse_047',
    type: 'mcq',
    question: 'A sphere falls so fast that Re = 5000. The simple Stokes terminal-velocity formula is:',
    options: [
      'still exact - Stokes works at all speeds',
      'unreliable: flow around the sphere is turbulent and drag is no longer 6 pi eta r v',
      'exact because density cancels',
      'valid only for gases',
    ],
    correctIndex: 1,
    explanation: 'Stokes\' law is a creeping-flow (small Re) result. At Re in the thousands, inertial effects dominate, a wake forms, and drag grows roughly as v^2 - the linear law under-predicts.',
    hints: ['Check the validity regime of the derivation.', 'High Re means inertia beats viscosity.', 'The sim\'s Re readout warns you exactly here.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_phy_cbse_042',
    type: 'numeric',
    question: 'Fluid flows over a plate; the velocity gradient near it is 500 s^-1 and the contact area is 0.02 m^2. With eta = 0.2 Pa s, find the viscous force.',
    answer: 2,
    unit: 'N',
    tolerance: 0.03,
    explanation: 'F = eta A (dv/dx) = 0.2 * 0.02 * 500 = 2.0 N. Viscous stress = eta * gradient.',
    hints: ['F = eta A (dv/dx).', 'A dv/dx = 0.02 * 500 = 10.', '0.2 * 10 = 2 N.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_phy_cbse_046',
    type: 'mcq',
    question: 'Honey is easier to pour on a hot summer day because:',
    options: [
      'its density drops to near zero',
      'heating weakens intermolecular cohesion, lowering eta sharply',
      'gravity is effectively stronger on warm honey',
      'hot honey becomes a non-Newtonian solid',
    ],
    correctIndex: 1,
    explanation: 'Liquid viscosity falls steeply with temperature (exponentially in the sim model). Lower eta raises v_t and makes the honey flow readily - same density, same gravity.',
    hints: ['What property controls "thickness" while pouring?', 'eta(T) falls exponentially for liquids.', 'Lower eta -> easier flow, higher v_t.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_phy_cbse_044',
    type: 'mcq',
    question: 'At terminal velocity, the force balance on the sphere is:',
    options: [
      'weight = drag only',
      'weight = drag + buoyancy, with drag = 6 pi eta r v_t',
      'weight = buoyancy only, drag vanishes',
      'net force is small but never exactly zero',
    ],
    correctIndex: 1,
    explanation: 'At v_t acceleration is zero, so net force is zero: rho_s V g (weight) = rho_f V g (buoyancy) + 6 pi eta r v_t (Stokes drag). Solve that and the v_t formula drops out.',
    hints: ['Zero acceleration means zero net force.', 'Three vertical forces act: weight, buoyancy, drag.', 'Weight = buoyancy + 6 pi eta r v_t.'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_phy_cbse_041',
    type: 'mcq',
    question: 'Castor oil has density 960 kg/m^3 (less than water) but eta about 1000x water\'s. A steel ball dropped in each will:',
    options: [
      'fall faster in castor oil because it is less dense, so it "sinks more easily"',
      'fall far slower in castor oil - viscosity, not density, dominates the drag',
      'fall at the same rate since densities are similar',
      'float in castor oil because oil floats on water',
    ],
    correctIndex: 1,
    explanation: 'v_t divides by eta: 1000x viscosity means 1000x slower terminal velocity (density differences barely matter here). Viscosity, not density, is the brake.',
    hints: ['v_t has eta in the denominator.', 'rho_f enters only through the small (rho_s - rho_f) term.', '1000x eta -> ~1/1000 v_t.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_phy_cbse_045' as NodeId,
    question: 'Predict: you halve the ball\'s radius but keep everything else. The terminal velocity will:',
    options: ['halve', 'drop to one quarter', 'double', 'stay the same'],
    correctIndex: 1,
    verify: 'Verify in the Lab: set r = 4 mm, note v_t, then set r = 2 mm - the readout falls by exactly 4x.',
    explanation: 'v_t = 2 r^2 g (rho_s - rho_f)/(9 eta): halving r divides v_t by 4. Drag area shrinks as r^2 but the weight shrinks as r^3, so small things fall slowly.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_phy_cbse_043' as NodeId,
    question: 'Predict: right after release (v = 0), the drag force on the ball is zero. Its initial acceleration is:',
    options: ['zero', 'g reduced by buoyancy: g(rho_s - rho_f)/rho_s', 'full g', 'negative - it rises first'],
    correctIndex: 1,
    verify: 'Verify in the Lab: watch the v-t trace start - the initial slope equals a0 = g(1 - rho_f/rho_s), slightly less than 9.8.',
    explanation: 'At v = 0 there is no Stokes drag, but buoyancy already acts: net weight in fluid = g V (rho_s - rho_f), so a0 = g (rho_s - rho_f)/rho_s. The bend of the v-t curve starts there and eases toward zero as drag builds.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Glycerine Purity Assay & Rain Physics',
  steps: [
    'A falling-ball viscometer drops a 1.5 mm steel ball through unknown oil: measured v_t = 0.021 m/s. Work backwards from Stokes\' law to estimate eta and identify the oil.',
    'Raindrops reach v_t before landing. Compute v_t for r = 0.5 mm and r = 2 mm drizzle vs cloudburst drops (use air eta = 1.8e-5 Pa s, rho = 1.2 kg/m^3) and check Re for honesty.',
    'A lubricant must keep eta > 0.1 Pa s at 80 C. Given eta_20 = 0.4 and b = 0.03, decide whether it survives an engine bay.',
    'Blood plasma eta is ~1.1e-3 Pa s. Explain why anaemia (lower effective viscosity) raises the heart\'s workload differently than polycythaemia.',
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
// FALL COLUMN CANVAS
// ==========================================
function FallColumnCanvas(props: {
  yPx: number; fluidColor: string; fluidLabel: string;
  rMm: number; vNow: number; vt: number; reachedTerminal: boolean;
  showForceBars: boolean; weight: number; buoyancy: number; drag: number;
  trace: Array<{ t: number; v: number }>;
}) {
  // velocity-time mini-graph (right side)
  const maxV = Math.max(props.vt * 1.15, 0.05);
  const tracePts = props.trace
    .map((p, i) => `${260 + (i / Math.max(props.trace.length - 1, 1)) * 160},${190 - (p.v / maxV) * 150}`)
    .join(' ');
  return (
    <svg viewBox="0 0 640 340" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* fluid column */}
      <rect x="20" y="20" width="220" height="290" rx="10" fill={props.fluidColor} opacity="0.18" />
      <rect x="20" y="20" width="220" height="290" rx="10" fill="none" stroke={props.fluidColor} strokeWidth="1.5" opacity="0.6" />
      <text x="130" y="40" fill={props.fluidColor} fontSize="12" textAnchor="middle" fontWeight="bold">{props.fluidLabel}</text>
      {/* depth ticks */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <line x1="20" y1={40 + i * 60} x2="26" y2={40 + i * 60} stroke={props.fluidColor} opacity="0.7" />
          <text x="28" y={44 + i * 60} fill="#64748b" fontSize="9">{(i * 0.25).toFixed(2)} m</text>
        </g>
      ))}
      {/* the ball */}
      <circle cx="130" cy={props.yPx} r={Math.max(props.rMm * 18, 6)} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
      {/* terminal velocity marker line */}
      {props.reachedTerminal && (
        <g>
          <line x1="40" y1={props.yPx + 26} x2="220" y2={props.yPx + 26} stroke="#34d399" strokeWidth="1" strokeDasharray="4 4" opacity="0.8" />
          <text x="44" y={props.yPx + 40} fill="#34d399" fontSize="9">v = v_t (constant)</text>
        </g>
      )}
      {/* v-t graph */}
      <rect x="255" y="30" width="170" height="170" rx="8" fill="#0b1120" stroke="#334155" />
      <text x="340" y="22" fill="#94a3b8" fontSize="10" textAnchor="middle">velocity-time trace</text>
      <line x1="263" y1="190" x2="417" y2="190" stroke="#475569" />
      <line x1="263" y1="30" x2="263" y2="190" stroke="#475569" />
      <line x1="263" y1={190 - (props.vt / maxV) * 150} x2="417" y2={190 - (props.vt / maxV) * 150}
        stroke="#34d399" strokeDasharray="3 3" strokeWidth="1" />
      <text x="412" y={186 - (props.vt / maxV) * 150} fill="#34d399" fontSize="9" textAnchor="end">v_t</text>
      {props.trace.length > 1 && <polyline points={tracePts} fill="none" stroke="#818cf8" strokeWidth="2" />}
      {/* force bars */}
      {props.showForceBars && (
        <g>
          <text x="470" y="60" fill="#a78bfa" fontSize="11">Weight {props.weight.toFixed(4)} N</text>
          <rect x="470" y="66" width={Math.min(props.weight * 4000, 140)} height="10" fill="#a78bfa" rx="4" />
          <text x="470" y="100" fill="#38bdf8" fontSize="11">Buoyancy {props.buoyancy.toFixed(4)} N</text>
          <rect x="470" y="106" width={Math.min(props.buoyancy * 4000, 140)} height="10" fill="#38bdf8" rx="4" />
          <text x="470" y="140" fill="#34d399" fontSize="11">Drag {props.drag.toFixed(4)} N</text>
          <rect x="470" y="146" width={Math.min(props.drag * 4000, 140)} height="10" fill="#34d399" rx="4" />
          <text x="470" y="185" fill="#94a3b8" fontSize="10">at balance: drag = weight - buoyancy</text>
        </g>
      )}
      {/* readouts */}
      <text x="320" y="240" fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="bold">
        v = {props.vNow.toFixed(3)} m/s {props.reachedTerminal ? '(terminal)' : '(still accelerating)'}
      </text>
      <text x="320" y="265" fill="#64748b" fontSize="11" textAnchor="middle">
        v_t = {props.vt.toFixed(3)} m/s = 2 r^2 g (rho_s - rho_f) / (9 eta)
      </text>
      <text x="320" y="290" fill="#64748b" fontSize="11" textAnchor="middle">
        r = {props.rMm.toFixed(1)} mm
      </text>
    </svg>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_PhysicsViscosityTerminalVelocitySim({
  initialNodeId = 'c11_phy_cbse_041',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Falling-ball state ----
  const [fluidKey, setFluidKey] = useState('glycerine');
  const [rMm, setRMm] = useState(2);              // radius mm
  const [rhoS, setRhoS] = useState(7800);         // sphere density
  const [tempC, setTempC] = useState(20);
  const [showForceBars, setShowForceBars] = useState(true);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [vNow, setVNow] = useState(0);
  const [depth, setDepth] = useState(0);          // m
  const [trace, setTrace] = useState<Array<{ t: number; v: number }>>([]);

  const fluid = FLUIDS.find((f) => f.key === fluidKey) || FLUIDS[0];
  const r = rMm / 1000;                            // m
  const etaT = fluid.eta * Math.exp(-fluid.b * Math.max(tempC - 20, 0));
  const rhoF = fluid.rho;

  // textbook numerics
  const vt = useMemo(
    () => (2 * r * r * 9.8 * Math.max(rhoS - rhoF, 0)) / (9 * Math.max(etaT, 1e-6)),
    [r, rhoS, rhoF, etaT]
  );
  const ballVolume = (4 / 3) * Math.PI * r * r * r;
  const ballMass = rhoS * ballVolume;
  const weight = ballMass * 9.8;
  const buoyancy = rhoF * ballVolume * 9.8;
  const drag = 6 * Math.PI * etaT * r * vNow;
  const netAcc = Math.max(weight - buoyancy - drag, 0) / Math.max(ballMass, 1e-9);
  const reynolds = (rhoF * vNow * 2 * r) / Math.max(etaT, 1e-9);
  const stokesValid = reynolds < 10;

  // fall animation (semi-implicit Euler, honest physics)
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running) { lastTsRef.current = null; return; }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.03);
      lastTsRef.current = ts;
      setVNow((v) => {
        const a = (weight - buoyancy - 6 * Math.PI * etaT * r * v) / Math.max(ballMass, 1e-9);
        return Math.max(v + a * dt, 0);
      });
      setDepth((d) => Math.min(d + vNow * dt * 4, 1.02));  // 4x slow motion
      setElapsed((e) => e + dt);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, [running, weight, buoyancy, etaT, r, ballMass, vNow]);

  // trace recorder
  useEffect(() => {
    if (!running) return;
    setTrace((tr) => {
      const last = tr[tr.length - 1];
      if (last && elapsed - last.t < 0.08) return tr;
      return [...tr.slice(-120), { t: elapsed, v: vNow }];
    });
  }, [elapsed, vNow, running]);

  const yPx = 36 + Math.min(depth, 1) * 250;

  const drop = useCallback(() => {
    setVNow(0); setDepth(0); setElapsed(0); setTrace([]);
    setRunning(true);
  }, []);

  const resetLab = useCallback(() => {
    setRunning(false); setVNow(0); setDepth(0); setElapsed(0); setTrace([]);
    setFluidKey('glycerine'); setRMm(2); setRhoS(7800); setTempC(20);
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
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'Viscosity & Terminal Velocity'); });
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
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'Viscosity & Terminal Velocity');
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
  const reachedTerminal = Math.abs(vNow - vt) < 0.002 * Math.max(vt, 0.01) && vNow > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="bg-slate-900/80 border-b border-slate-800 px-4 py-4 sticky top-0 z-20 backdrop-blur">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Droplets className="w-5 h-5 text-sky-400" /> Viscosity &amp; Terminal Velocity
            </h1>
            <p className="text-xs text-slate-400">Class 11 Physics - Mechanical Properties of Fluids - Stokes\' law lab</p>
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
              <h2 className="text-lg font-bold text-sky-300 mb-3 flex items-center gap-2">
                <Droplets className="w-5 h-5" /> Falling-ball column (4x slow motion)
              </h2>
              <FallColumnCanvas
                yPx={yPx} fluidColor={fluid.color} fluidLabel={`${fluid.label} -> eta ${etaT.toFixed(3)} Pa s`}
                rMm={rMm} vNow={vNow} vt={vt} reachedTerminal={reachedTerminal}
                showForceBars={showForceBars} weight={weight} buoyancy={buoyancy} drag={drag}
                trace={trace}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">Fluid</p>
                  <div className="flex gap-2 flex-wrap">
                    {FLUIDS.map((f) => (
                      <button key={f.key} onClick={() => { setFluidKey(f.key); setRunning(false); setVNow(0); setDepth(0); setElapsed(0); setTrace([]); }}
                        className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                          fluidKey === f.key ? 'bg-sky-600 border-sky-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
                <SliderControl label="Sphere radius r" value={rMm} min={0.5} max={8} step={0.5} unit="mm" onChange={(v) => { setRMm(v); setRunning(false); }} accent="#e2e8f0" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">Sphere material</p>
                  <div className="flex gap-2 flex-wrap">
                    {([['Steel 7800', 7800], ['Glass 2500', 2500], ['Wood-ish 900 (sinks in glycerine)', 900]] as Array<[string, number]>).map(([label, d]) => (
                      <button key={label} onClick={() => { setRhoS(d); setRunning(false); }}
                        className={`min-h-11 px-3 rounded-xl text-xs font-bold border transition-all ${
                          rhoS === d ? 'bg-violet-600 border-violet-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <SliderControl label="Fluid temperature" value={tempC} min={20} max={90} step={5} unit="C" onChange={(v) => { setTempC(v); setRunning(false); }} accent="#fbbf24" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                <StatBox label="Terminal velocity v_t" value={vt.toFixed(3)} unit="m/s" color="#34d399" />
                <StatBox label="eta at T" value={etaT.toFixed(3)} unit="Pa s" color={fluid.color} />
                <StatBox label="Drag now (Stokes)" value={drag.toFixed(4)} unit="N" color="#a78bfa" />
                <StatBox label="Reynolds number" value={reynolds.toFixed(2)} color={stokesValid ? '#34d399' : '#f87171'} />
              </div>
              {!stokesValid && (
                <div className="mt-3 p-3 rounded-xl bg-rose-950/60 border border-rose-700 text-rose-200 text-xs font-semibold animate-fadeIn">
                  Re = {reynolds.toFixed(0)} &gt; 10 - Stokes\' linear drag is no longer accurate here. Watch the trace bend away from the ideal v_t line.
                </div>
              )}
              <div className="flex flex-wrap gap-3 mt-4">
                <button onClick={() => setRunning((r) => !r)} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
                  {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />} {running ? 'Pause' : 'Drop the ball'}
                </button>
                <button onClick={drop} className="min-h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" /> Re-drop
                </button>
                <Toggle label="Force bars" on={showForceBars} onToggle={() => setShowForceBars((s) => !s)} />
              </div>
              <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Live model: a = (W - B - 6 pi eta r v)/m. Drag starts at zero and grows with v until W - B is fully cancelled - that speed IS v_t = 2 r^2 g (rho_s - rho_f)/(9 eta).
              </p>
            </div>

            {/* r^2 explorer */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h3 className="text-md font-bold text-violet-300 mb-2 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> The r^2 law, in one table</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[0.5, 1, 2, 4].map((rr) => (
                  <StatBox
                    key={rr}
                    label={`r = ${rr} mm`}
                    value={((2 * (rr / 1000) ** 2 * 9.8 * Math.max(rhoS - rhoF, 0)) / (9 * Math.max(etaT, 1e-6))).toFixed(4)}
                    unit="m/s"
                  />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-3">
                Each doubling of radius multiplies v_t by 4 - compare the columns. Current fluid: {fluid.label} at {tempC} C.
              </p>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Drop a 2 mm steel ball in glycerine at 20 C, then heat the fluid to 80 C and re-drop. v_t rises several-fold because eta collapses exponentially - feel the temperature effect.</li>
                <li>Switch to the 900 kg/m^3 ball in honey: it still sinks (900 &lt; 1420) but v_t is glacial. Then try it in water - the ball RISES conceptually (900 &lt; 1000) and the sim clamps at v = 0: density contrast decides direction.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: at the moment of release the drag is ZERO - the first acceleration is nearly g, not small. Terminal velocity is reached gradually as drag builds with speed.
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
              <p className="text-slate-400 text-sm mb-6">Viscosity traps: what terminal velocity does and does not depend on.</p>
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
              Touch first: <span className="text-slate-200 font-semibold">press Drop the ball</span> and watch the v-t trace bend until it flattens at v_t.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
