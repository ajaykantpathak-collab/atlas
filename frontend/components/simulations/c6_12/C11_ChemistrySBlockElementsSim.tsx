'use client';

/**
 * C11_ChemistrySBlockElementsSim.tsx
 * Class 11 Chemistry - The s-Block Elements (Groups 1 & 2)
 *
 * Lab 1: alkali/alkaline-earth selector with REAL periodic data - atomic
 * radius, ionisation enthalpy, density, melting point, standard potential
 * and flame colour - plus a reactivity-with-water bench where the
 * animation intensity follows E-deg, so Li fizzes gently and K ignites.
 * Lab 2: solubility & thermal trend explorer for Group 2 (hydroxides up,
 * sulfates down, carbonates down) with live bar charts and a flame-test
 * panel that shows the diagnostic colour of each cation.
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
  Flame,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_chem_cbse_031', // Group 1: electronic configuration & physical trends
  'c11_chem_cbse_032', // Group 1 reactivity with water & oxygen
  'c11_chem_cbse_033', // Group 2: configuration & characteristic properties
  'c11_chem_cbse_034', // Flame colours & diagnostic tests
  'c11_chem_cbse_035', // Solubility trends: hydroxides & sulfates of Group 2
  'c11_chem_cbse_036', // Thermal stability of carbonates & nitrates
  'c11_chem_cbse_037', // Diagonal relationship Be-Al, Li-Mg
  'c11_chem_cbse_038', // Industrial uses: cement, plaster, alkali metals
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Group 1' | 'Group 2' | 'Trends' | 'Uses';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_chem_cbse_031: { id: 'c11_chem_cbse_031', title: 'Group 1 Physical Trends', category: 'Group 1', desc: 'ns1 configuration: radius grows and ionisation enthalpy falls down the group, so reactivity rises from Li to Cs.', formula: 'Li Na K Rb Cs: IE 520 -> 376 kJ/mol' },
  c11_chem_cbse_032: { id: 'c11_chem_cbse_032', title: 'Group 1 Reactivity', category: 'Group 1', desc: '2M + 2H2O -> 2MOH + H2. The reaction heats from a gentle fizz (Li) to ignition (K) down the group.', formula: '2 M + 2 H2O -> 2 M O H + H2' },
  c11_chem_cbse_033: { id: 'c11_chem_cbse_033', title: 'Group 2 Properties', category: 'Group 2', desc: 'ns2 metals: harder, denser and much less reactive than Group 1, but still reactive down the group Be -> Ba.', formula: 'M + 2 H2O -> M(OH)2 + H2 (Ca, Sr, Ba)' },
  c11_chem_cbse_034: { id: 'c11_chem_cbse_034', title: 'Flame Test Colours', category: 'Group 2', desc: 'Excited electrons emit characteristic wavelengths: Na golden yellow, K lilac, Ca brick red, Sr crimson, Ba apple green.', formula: 'h nu = E_3 - E_2' },
  c11_chem_cbse_035: { id: 'c11_chem_cbse_035', title: 'Group 2 Solubility Trends', category: 'Trends', desc: 'Hydroxides become MORE soluble down the group; sulfates and carbonates become LESS soluble (lattice vs hydration battle).', formula: 'solubility: OH- up, SO4 2- down' },
  c11_chem_cbse_036: { id: 'c11_chem_cbse_036', title: 'Thermal Stability', category: 'Trends', desc: 'Down Group 2, carbonates and nitrates need MORE heat to decompose - the larger cation polarises CO3 2- less.', formula: 'MCO3 -> MO + CO2 (T rises)' },
  c11_chem_cbse_037: { id: 'c11_chem_cbse_037', title: 'Diagonal Relationships', category: 'Trends', desc: 'Li behaves like Mg and Be like Al: similar charge/size ratios give similar chemistry across the diagonal.', formula: 'Li-Na :: Li-Mg similarity' },
  c11_chem_cbse_038: { id: 'c11_chem_cbse_038', title: 'Uses & Industry', category: 'Uses', desc: 'CaSO4 half-hydrate is plaster of Paris; limestone gives cement and lime; Li powers batteries; Cs defines the SI second.', formula: 'CaSO4.1/2 H2O + 3/2 H2O -> CaSO4.2H2O' },
};

// ==========================================
// ELEMENT DATA (real periodic values)
// ==========================================
interface ElemData {
  key: string;
  symbol: string;
  name: string;
  group: 1 | 2;
  radius: number;      // pm
  ie: number;          // kJ/mol first ionisation
  density: number;     // g/cm3
  mp: number;          // C
  e0: number;          // standard potential V
  flame: string;
  flameHex: string;
  reactionRate: number;  // 0..1 visual intensity with water
  note: string;
}

const ELEMENTS: ElemData[] = [
  { key: 'li', symbol: 'Li', name: 'Lithium', group: 1, radius: 152, ie: 520, density: 0.534, mp: 181, e0: -3.04, flame: 'Crimson red', flameHex: '#dc2626', reactionRate: 0.25, note: 'Floats and fizzes quietly; the calmest alkali metal.' },
  { key: 'na', symbol: 'Na', name: 'Sodium', group: 1, radius: 186, ie: 496, density: 0.971, mp: 98, e0: -2.71, flame: 'Golden yellow', flameHex: '#f59e0b', reactionRate: 0.45, note: 'Melts into a ball from reaction heat; darts on water.' },
  { key: 'k', symbol: 'K', name: 'Potassium', group: 1, radius: 231, ie: 419, density: 0.862, mp: 63, e0: -2.93, flame: 'Lilac', flameHex: '#a78bfa', reactionRate: 0.75, note: 'The evolved H2 ignites with a lilac flame instantly.' },
  { key: 'rb', symbol: 'Rb', name: 'Rubidium', group: 1, radius: 244, ie: 403, density: 1.532, mp: 39, e0: -2.98, flame: 'Red-violet', flameHex: '#e11d48', reactionRate: 0.9, note: 'Violently explosive on water; stored under oil.' },
  { key: 'cs', symbol: 'Cs', name: 'Caesium', group: 1, radius: 262, ie: 376, density: 1.873, mp: 28, e0: -3.02, flame: 'Blue-violet', flameHex: '#6366f1', reactionRate: 1.0, note: 'Melts in your hand (28 C); shatters the trough on water. Defines the SI second.' },
  { key: 'be', symbol: 'Be', name: 'Beryllium', group: 2, radius: 111, ie: 899, density: 1.85, mp: 1287, e0: -1.85, flame: 'None', flameHex: '#94a3b8', reactionRate: 0.02, note: 'Does not react with water even red-hot; protective oxide film.' },
  { key: 'mg', symbol: 'Mg', name: 'Magnesium', group: 2, radius: 160, ie: 738, density: 1.738, mp: 650, e0: -2.37, flame: 'None (blinding white when burning)', flameHex: '#e2e8f0', reactionRate: 0.06, note: 'Hot water only: Mg + H2O(g) -> MgO + H2. Burns with dazzling white light.' },
  { key: 'ca', symbol: 'Ca', name: 'Calcium', group: 2, radius: 197, ie: 590, density: 1.55, mp: 842, e0: -2.87, flame: 'Brick red', flameHex: '#f97316', reactionRate: 0.35, note: 'Steady bubbles with cold water; brick-red flame test.' },
  { key: 'sr', symbol: 'Sr', name: 'Strontium', group: 2, radius: 215, ie: 550, density: 2.54, mp: 777, e0: -2.89, flame: 'Crimson', flameHex: '#fb7185', reactionRate: 0.5, note: 'The red of emergency flares and fireworks.' },
  { key: 'ba', symbol: 'Ba', name: 'Barium', group: 2, radius: 217, ie: 503, density: 3.51, mp: 727, e0: -2.90, flame: 'Apple green', flameHex: '#22c55e', reactionRate: 0.65, note: 'BaSO4 insolubility makes it the barium-meal X-ray agent.' },
];

// ==========================================
// SOLUBILITY DATA (relative, qualitative 0-100)
// ==========================================
const G2_SOLUBILITY = {
  hydroxides: [ { s: 'Mg(OH)2', v: 3 }, { s: 'Ca(OH)2', v: 30 }, { s: 'Sr(OH)2', v: 60 }, { s: 'Ba(OH)2', v: 90 } ],
  sulfates:   [ { s: 'MgSO4', v: 95 }, { s: 'CaSO4', v: 40 }, { s: 'SrSO4', v: 8 }, { s: 'BaSO4', v: 1 } ],
  carbonates: [ { s: 'MgCO3', v: 25 }, { s: 'CaCO3', v: 10 }, { s: 'SrCO3', v: 4 }, { s: 'BaCO3', v: 2 } ],
};

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Alkali metals are stored under water to keep them clean.',
    correction: 'They react VIOLENTLY with water giving H2. They are stored under oil (hydrocarbon) - water is the last thing an alkali metal ever touches outside a fume cupboard.',
    nodeId: 'c11_chem_cbse_032' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'Ionisation enthalpy and reactivity both decrease down Group 1.',
    correction: 'IE falls but reactivity RISES. Weaker hold on the ns1 electron makes it easier to lose - so Cs is the most reactive, not the least.',
    nodeId: 'c11_chem_cbse_031' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'Flame colours are random chemical effects of the whole sample.',
    correction: 'Each colour is the element\'s quantised electron jump: excited electrons fall back and emit specific photon energies. Na is ALWAYS 589 nm golden yellow - it is a fingerprint, which is why Na contamination yellows every flame.',
    nodeId: 'c11_chem_cbse_034' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: 'If one Group 2 compound is soluble, they all are.',
    correction: 'Each anion family has its own trend: hydroxides get MORE soluble down the group while sulfates and carbonates get LESS. Ba(OH)2 is very soluble, BaSO4 is almost insoluble.',
    nodeId: 'c11_chem_cbse_035' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'Beryllium and magnesium behave like the rest of Group 2 with water.',
    correction: 'Be ignores water even red-hot and Mg needs steam; only Ca, Sr, Ba react with cold water. The tiny Be2+ and Mg2+ ions hold their electrons and oxide films too tightly.',
    nodeId: 'c11_chem_cbse_033' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'Lithium chemistry is typical of Group 1.',
    correction: 'Li is the exception: it forms the nitride Li3N directly, its carbonate decomposes on heating (others do not), and it resembles MAGNESIUM - the diagonal relationship.',
    nodeId: 'c11_chem_cbse_037' as NodeId,
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
    nodeId: 'c11_chem_cbse_031',
    type: 'mcq',
    question: 'Why is caesium (radius 262 pm) more reactive with water than lithium (152 pm)?',
    options: [
      'Cs is heavier, so it hits water harder',
      'Cs loses its outer electron more easily - lower IE from a bigger radius',
      'Cs has more protons pulling the electron in',
      'Water is warmer for Cs because it melts first',
    ],
    correctIndex: 1,
    explanation: 'The ns1 electron sits farther from the nucleus (262 pm) and is shielded by more shells, so IE drops from 520 to 376 kJ/mol. Easier electron loss = faster electron transfer to water = more violent reaction.',
    hints: ['Compare the first IE values: 520 vs 376 kJ/mol.', 'Reactivity = ease of oxidation M -> M+.', 'Radius up, hold on the electron down.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_chem_cbse_034',
    type: 'mcq',
    question: 'A flame test shows an apple-green flame. The cation is:',
    options: ['Na+', 'K+', 'Ba2+', 'Li+'],
    correctIndex: 2,
    explanation: 'Ba2+ gives the apple-green flame; K is lilac, Na golden yellow, Li crimson. Cu2+ also gives green, but that is a d-block story, not s-block.',
    hints: ['Match the colour to the element table.', 'Apple green is classic barium.', 'Golden yellow would be sodium contamination.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_chem_cbse_035',
    type: 'mcq',
    question: 'Which pair correctly describes solubility DOWN Group 2?',
    options: [
      'Hydroxides decrease, sulfates decrease',
      'Hydroxides increase, sulfates increase',
      'Hydroxides increase, sulfates decrease',
      'Hydroxides decrease, sulfates increase',
    ],
    correctIndex: 2,
    explanation: 'Hydration enthalpy falls faster than lattice enthalpy for the small OH-, so solubility rises; for the large SO4 2-, lattice enthalpy wins and solubility falls to nearly-insoluble BaSO4.',
    hints: ['The two trends go in OPPOSITE directions.', 'Ba(OH)2 is very soluble; BaSO4 is not.', 'Lattice vs hydration enthalpy decides each case.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_chem_cbse_036',
    type: 'numeric',
    question: 'Thermal decomposition temperatures of Group 2 carbonates rise from 400 C (MgCO3) to 1360 C (BaCO3). If the trend were linear, what temperature would you predict for CaCO3 positioned 1/3 of the way from Mg to Ba? (nearest 50 C)',
    answer: 750,
    unit: 'C',
    tolerance: 0.1,
    explanation: 'Linear interpolation: 400 + (1360-400)/3 = 400 + 320 = 720 C; the accepted textbook value is ~900 C, but the linear-model exercise gives ~720-750 C, showing the real trend is steeper than linear for Ca. Use 750 C here.',
    hints: ['Interpolate: 400 + (1360 - 400) / 3.', 'One third of 960 is 320.', '400 + 320 = 720, round to 750.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_chem_cbse_032',
    type: 'mcq',
    question: 'Sodium reacts with water: 2Na + 2H2O -> 2NaOH + H2. What is oxidised?',
    options: ['Hydrogen in water (+1 to 0)', 'Sodium (0 to +1)', 'Oxygen (-2 stays -2)', 'Nothing - it is a metathesis'],
    correctIndex: 1,
    explanation: 'Na loses an electron (0 -> +1 in NaOH): oxidation. Water\'s H+ gains the electron (+1 -> 0 in H2): reduction. Classic redox displacement of hydrogen.',
    hints: ['Who loses electrons?', 'Na metal starts at oxidation state 0.', 'Electron lost = oxidised.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_chem_cbse_033',
    type: 'numeric',
    question: 'From the lab data, how many times denser is barium (3.51 g/cm3) than lithium (0.534 g/cm3)? (2 decimals)',
    answer: 6.57,
    unit: 'x',
    tolerance: 0.02,
    explanation: '3.51 / 0.534 = 6.57. Lithium floats on oil AND water - the lightest metal of all.',
    hints: ['Simple division of densities.', '3.51 / 0.534.', 'About 6.6 times.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_chem_cbse_037',
    type: 'mcq',
    question: 'The diagonal relationship says lithium resembles magnesium because:',
    options: [
      'They sit in the same period',
      'Their charge/radius ratios and electronegativities are similar',
      'Both are d-block metals',
      'Magnesium loses two electrons like lithium',
    ],
    correctIndex: 1,
    explanation: 'Li+ and Mg2+ have similar polarising power (charge over size), giving shared quirks: direct nitride formation, decomposing carbonates, covalent organometallics. Neighbour-on-diagonal, similar chemistry.',
    hints: ['Polarising power = charge / radius.', 'Diagonal, not same group or period.', 'Li+ (small, +1) ~ Mg2+ (bigger, +2).'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_chem_cbse_038',
    type: 'numeric',
    question: 'Plaster of Paris is CaSO4.x H2O with x = 0.5. What percentage of its molar mass (145.2 g/mol) is water? (1 decimal)',
    answer: 6.2,
    unit: '%',
    tolerance: 0.03,
    explanation: 'Water mass = 0.5 * 18 = 9 g. Percentage = 9 / 145.2 = 6.2%. When set, it gains water to become gypsum CaSO4.2H2O and hardens.',
    hints: ['x = 0.5 means half a mole of water per mole.', '0.5 * 18 = 9 g of water.', '9 / 145.2 * 100.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_chem_cbse_032' as NodeId,
    question: 'Predict: identical pea-sized pieces of Li and K are dropped on water troughs. Which shows the more violent reaction, and why?',
    options: [
      'Li - its higher melting point keeps it intact longer',
      'K - lower IE means faster electron loss, igniting the H2 it produces',
      'Li - it is lighter so it reacts faster',
      'Both identical - same valence electron',
    ],
    correctIndex: 1,
    verify: 'Verify in the Lab: select Li, then K, and watch the reaction-intensity animation and the IE readout side by side.',
    explanation: 'Same valence configuration, different hold on the electron: IE(K) = 419 vs IE(Li) = 520 kJ/mol. K oxidises faster, the reaction heats the hydrogen to ignition - lilac flame, not a fizz.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_chem_cbse_035' as NodeId,
    question: 'Predict: you want to TEST for sulfate ions using a Group 2 chloride solution. Which works best?',
    options: [
      'MgCl2 - hydroxides are soluble, so it must be reactive',
      'BaCl2 - BaSO4 is the least soluble sulfate, giving a dense white precipitate',
      'CaCl2 - calcium is cheap',
      'Any of them equally',
    ],
    correctIndex: 1,
    verify: 'Verify in the Lab: the sulfate solubility bars shrink monotonically from Mg to Ba - pick the shortest bar.',
    explanation: 'A precipitate test needs maximum insolubility: BaSO4 (Ksp ~ 1e-10) gives a crisp white cloud even from trace sulfate. This is the standard qualitative-analysis sulfate test.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Firework Chemistry & Water-Softening Audit',
  steps: [
    'A firework designer needs crimson, apple-green and gold stars. Assign Sr, Ba and Na salts, and explain why Na is banned in most other colours.',
    'A water sample is hard due to Ca(HCO3)2. Write the softening reaction with lime Ca(OH)2 and compute the CaCO3 mass precipitated per 100 g of hardness.',
    'Explain why Li batteries exploit Li\'s extreme low density and most-negative E-deg, and why K can NEVER be stored in water troughs.',
    'Choose between MgSO4 and BaSO4 for an X-ray contrast meal, using the sulfate solubility trend and toxicity reasoning.',
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
        props.on ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-900/40'
          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
      }`}>
      {props.label}: {props.on ? 'ON' : 'OFF'}
    </button>
  );
}

// ==========================================
// WATER-REACTION BENCH CANVAS
// ==========================================
function WaterBenchCanvas(props: {
  symbol: string; flameHex: string; rate: number; phase: 'idle' | 'reacting';
  t: number; ignited: boolean; showLabels: boolean;
}) {
  const bubbles = Array.from({ length: 10 }).map((_, i) => {
    const seed = (i * 37 + Math.floor(props.t * (2 + props.rate * 14))) % 60;
    return { x: 200 + ((i * 47) % 120), y: 300 - seed, s: 3 + (i % 3) };
  });
  const flameH = props.ignited ? 20 + props.rate * 80 : 0;
  return (
    <svg viewBox="0 0 560 340" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* trough */}
      <path d="M 60 180 L 60 320 L 500 320 L 500 180" fill="none" stroke="#475569" strokeWidth="3" />
      <rect x="60" y="180" width="440" height="140" fill="#38bdf8" opacity="0.15" />
      <line x1="60" y1="180" x2="500" y2="180" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
      <text x="80" y="200" fill="#7dd3fc" fontSize="11">water trough</text>
      {/* the metal piece */}
      <rect x="250" y={props.phase === 'reacting' ? 250 : 150} width="60" height="30" rx="6"
        fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2"
        style={{ transition: 'y 0.8s ease' }} />
      <text x="280" y={props.phase === 'reacting' ? 269 : 169} fill="#0f172a" fontSize="13" textAnchor="middle" fontWeight="bold">{props.symbol}</text>
      {/* bubbles */}
      {props.phase === 'reacting' && bubbles.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.s} fill="#e0f2fe" opacity="0.75" />
      ))}
      {/* flame if ignited */}
      {props.ignited && (
        <g>
          <path d={`M 280 250 C 250 ${250 - flameH}, 310 ${250 - flameH * 0.7}, 280 ${250 - flameH}`}
            fill={props.flameHex} opacity="0.85">
            <animate attributeName="opacity" values="0.85;0.5;0.85" dur="0.5s" repeatCount="indefinite" />
          </path>
          <text x="330" y={250 - flameH + 12} fill={props.flameHex} fontSize="11">H2 ignites!</text>
        </g>
      )}
      {/* equation */}
      {props.showLabels && (
        <text x="280" y="60" fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="bold">
          2 {props.symbol} + 2 H2O {'->'} 2 {props.symbol}OH + H2 (group 1)
        </text>
      )}
      <text x="280" y="336" fill="#64748b" fontSize="11" textAnchor="middle">
        reaction intensity follows ionisation enthalpy: easier e- loss = wilder bench
      </text>
    </svg>
  );
}

// ==========================================
// FLAME TEST CANVAS
// ==========================================
function FlameCanvas(props: { flameHex: string; symbol: string; intensity: number }) {
  const h = 90 + props.intensity * 90;
  return (
    <svg viewBox="0 0 300 260" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* bunsen base */}
      <rect x="125" y="210" width="50" height="30" rx="4" fill="#334155" />
      <rect x="140" y="150" width="20" height="62" fill="#475569" />
      {/* flame cone */}
      <path d={`M 150 155 C 120 ${155 - h * 0.5}, 135 ${155 - h}, 150 ${155 - h} C 165 ${155 - h}, 180 ${155 - h * 0.5}, 150 155 Z`}
        fill={props.flameHex} opacity="0.9">
        <animate attributeName="opacity" values="0.9;0.65;0.9" dur="0.8s" repeatCount="indefinite" />
      </path>
      {/* inner blue cone */}
      <path d="M 150 155 C 142 140, 142 128, 150 120 C 158 128, 158 140, 150 155 Z" fill="#38bdf8" opacity="0.8" />
      <text x="150" y="250" fill="#e2e8f0" fontSize="13" textAnchor="middle" fontWeight="bold">
        {props.symbol} flame: {props.flameHex}
      </text>
    </svg>
  );
}

// ==========================================
// SOLUBILITY BAR ROW
// ==========================================
function SolubilityBars(props: { title: string; data: Array<{ s: string; v: number }>; color: string; note: string }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
      <p className="text-sm font-bold mb-1" style={{ color: props.color }}>{props.title}</p>
      <p className="text-[10px] text-slate-500 mb-3">{props.note}</p>
      <div className="space-y-2">
        {props.data.map((d) => (
          <div key={d.s} className="flex items-center gap-2">
            <span className="w-16 text-xs font-mono text-slate-300">{d.s}</span>
            <div className="flex-1 bg-slate-800 rounded-full h-4 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${d.v}%`, backgroundColor: props.color }} />
            </div>
            <span className="w-10 text-right text-[10px] font-mono text-slate-500">{d.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_ChemistrySBlockElementsSim({
  initialNodeId = 'c11_chem_cbse_031',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Lab state ----
  const [elemKey, setElemKey] = useState('na');
  const [phase, setPhase] = useState<'idle' | 'reacting'>('idle');
  const [t, setT] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [groupFilter, setGroupFilter] = useState<1 | 2>(1);
  const [flameOn, setFlameOn] = useState(true);

  const elem = ELEMENTS.find((e) => e.key === elemKey) || ELEMENTS[1];
  const ignited = elem.group === 1 && elem.reactionRate >= 0.6;
  const producesFlame = elem.flame !== 'None';

  // ticking clock for animation
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setT((v) => v + 0.1), 100);
    return () => window.clearInterval(id);
  }, [running]);

  const startReaction = useCallback(() => {
    setPhase('reacting');
    setT(0);
    setRunning(true);
  }, []);

  const resetLab = useCallback(() => {
    setPhase('idle'); setRunning(false); setT(0);
    setElemKey('na'); setGroupFilter(1); setFlameOn(true);
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
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 's-Block Elements'); });
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
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 's-Block Elements');
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
              <Flame className="w-5 h-5 text-amber-400" /> The s-Block Elements (Groups 1 &amp; 2)
            </h1>
            <p className="text-xs text-slate-400">Class 11 Chemistry - real periodic data, reactivity bench, flame tests - CBSE Chapter Lab</p>
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
                activeTab === tab ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-900/40'
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
            {/* element selector + data */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <button onClick={() => setGroupFilter(1)}
                  className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${groupFilter === 1 ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                  Group 1 (alkali)
                </button>
                <button onClick={() => setGroupFilter(2)}
                  className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${groupFilter === 2 ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                  Group 2 (alkaline earth)
                </button>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {ELEMENTS.filter((e) => e.group === groupFilter).map((e) => (
                  <button key={e.key} onClick={() => { setElemKey(e.key); setPhase('idle'); setRunning(false); }}
                    className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-all ${
                      elemKey === e.key ? 'bg-gold-600 border-gold-400 text-white shadow-lg shadow-gold-900/40' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                    {e.symbol} <span className="text-[10px] font-normal opacity-80">{e.name}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <StatBox label="Atomic radius" value={String(elem.radius)} unit="pm" />
                <StatBox label="1st ionisation" value={String(elem.ie)} unit="kJ/mol" color="#f87171" />
                <StatBox label="Density" value={elem.density.toFixed(2)} unit="g/cm3" color="#34d399" />
                <StatBox label="Melting point" value={String(elem.mp)} unit="C" color="#fbbf24" />
                <StatBox label="E-deg (M+/M)" value={elem.e0.toFixed(2)} unit="V" color="#22d3ee" />
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Flame</p>
                  <p className="text-sm font-bold" style={{ color: elem.flameHex }}>{elem.flame}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" /> {elem.note}
              </p>
            </div>

            {/* reaction bench + flame */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
                <h2 className="text-md font-bold text-gold-300 mb-3">Reaction bench - metal on water</h2>
                <WaterBenchCanvas symbol={elem.symbol} flameHex={elem.flameHex} rate={elem.reactionRate}
                  phase={phase} t={t} ignited={ignited && phase === 'reacting'} showLabels={showLabels} />
                <div className="flex flex-wrap gap-3 mt-4">
                  <button onClick={startReaction} className="min-h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold flex items-center gap-2">
                    <Play className="w-4 h-4" /> Drop on water
                  </button>
                  <button onClick={() => { setPhase('idle'); setRunning(false); setT(0); }}
                    className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-bold flex items-center gap-2">
                    <Pause className="w-4 h-4" /> Reset bench
                  </button>
                  <Toggle label="Equation" on={showLabels} onToggle={() => setShowLabels((s) => !s)} />
                </div>
                {phase === 'reacting' && (
                  <p className="mt-3 text-xs text-slate-400 animate-fadeIn">
                    {elem.group === 1
                      ? `Group 1 hydroxide formed is strongly alkaline (${elem.symbol}OH). H2 evolved${ignited ? ' and ignited - ' + elem.flame.toLowerCase() + ' flame.' : '.'}`
                      : elem.reactionRate < 0.1
                        ? 'Be/Mg barely react with cold water - oxide film and tight ns2 hold. (Mg needs steam.)'
                        : `Steady H2 bubbles: ${elem.symbol} + 2 H2O -> ${elem.symbol}(OH)2 + H2.`}
                  </p>
                )}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
                <h2 className="text-md font-bold text-amber-300 mb-3 flex items-center gap-2"><Flame className="w-5 h-5" /> Flame test panel</h2>
                {producesFlame ? (
                  <FlameCanvas flameHex={elem.flameHex} symbol={elem.symbol} intensity={0.6} />
                ) : (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500">
                    <Flame className="w-10 h-10 mb-3 opacity-40" />
                    <p className="text-sm font-semibold">{elem.symbol} shows NO characteristic flame.</p>
                    <p className="text-xs mt-2 max-w-xs text-center">Be and Mg electrons need too much energy - no visible emission. (Mg burns white-hot only once ignited.)</p>
                  </div>
                )}
                <Toggle label="Bunsen on" on={flameOn} onToggle={() => setFlameOn((s) => !s)} />
              </div>
            </div>

            {/* solubility trends */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-md font-bold text-gold-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Group 2 solubility trends (relative scales)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SolubilityBars title="Hydroxides M(OH)2" data={G2_SOLUBILITY.hydroxides} color="#34d399"
                  note="More soluble DOWN the group - Mg(OH)2 is milk of magnesia, Ba(OH)2 dissolves freely." />
                <SolubilityBars title="Sulfates MSO4" data={G2_SOLUBILITY.sulfates} color="#38bdf8"
                  note="LESS soluble down: BaSO4 is the sulfate test and the X-ray meal." />
                <SolubilityBars title="Carbonates MCO3" data={G2_SOLUBILITY.carbonates} color="#fbbf24"
                  note="All barely soluble; limestone (CaCO3) is the geology hero." />
              </div>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Drop Li, then K on water (same bench) and compare the bubble storm and the flame. Then read their IE values - the violence ranking IS the IE ranking.</li>
                <li>Flip between Group 2 solubility charts: find the one compound a radiologist swallows (BaSO4) and the one that soothes stomach acid (Mg(OH)2). Trends have consequences.</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: alkali metals live under OIL, never water - water is the reaction. And a yellow flame in ANY test usually means sodium contamination, not your unknown.
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
                  <p className="text-[10px] uppercase tracking-wider text-gold-400 font-bold mb-2">Predict first - then verify</p>
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
                              : isChosen ? 'bg-gold-950/70 border-gold-500 text-gold-100'
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
                      <button key={i} disabled={submitted} onClick={() => setSelectedOption(i)}
                        className={`w-full text-left min-h-11 px-4 py-3 rounded-xl border text-sm transition-all ${
                          submitted && isCorrectOpt ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : submitted && isChosen ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                            : isChosen ? 'bg-gold-950/70 border-gold-500 text-gold-100'
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
                    className="flex-1 min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-4 text-lg font-mono text-slate-100 focus:border-gold-500 outline-none" />
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
              <p className="text-slate-400 text-sm mb-6">Group 1 &amp; 2 traps: storage, trends, flame colours and the stubborn exceptions.</p>
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
              <h3 className="text-md font-bold text-slate-100 mb-3">Formula &amp; fact sheet (from this sim)</h3>
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

      {activeTab === 'lab' && (
        <footer className="max-w-5xl mx-auto px-4 pb-8">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              Touch first: <span className="text-slate-200 font-semibold">pick Li, drop it on water</span>, then switch to K and drop again. Same valence electron, very different bench.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
