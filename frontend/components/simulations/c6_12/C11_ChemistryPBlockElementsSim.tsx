'use client';

/**
 * C11_ChemistryPBlockElementsSim.tsx
 * Class 11 Chemistry - The p-Block Elements (Groups 13 & 14)
 *
 * Lab 1: element explorer with REAL data for Group 13 (B -> Tl) and
 * Group 14 (C -> Pb): melting point, density, radius, IE1, metallic
 * character and conductivity class.
 * Lab 2: the gallium spoon bench - heat from 0 to 40 C and watch Ga melt
 * at 29.8 C, BELOW hand temperature (mp 660 C for Al puts it in context).
 * Lab 3: inert-pair / oxidation-state explorer - bar charts show the
 * rising stability of the lower oxidation state (+1 in G13, +2 in G14)
 * down each group, with Tl(I) and Pb(II) flagged as the stable states.
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
  Thermometer,
} from 'lucide-react';

import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import type { ReviewItem } from '@/types';
import { recordGameScore } from '../../../lib/masteryStore';

// ==========================================
// NODE IDS & METADATA
// ==========================================
const CBSE_NODES = [
  'c11_chem_cbse_041', // Group 13: configuration, boron family general trends
  'c11_chem_cbse_042', // Inert pair effect in Group 13 (+1 stability grows)
  'c11_chem_cbse_043', // Group 13 anomalies: Ga's low mp, B's non-metallicity
  'c11_chem_cbse_044', // Group 14: carbon family trends, catenation
  'c11_chem_cbse_045', // Group 14 inert pair: Pb(II) vs Pb(IV)
  'c11_chem_cbse_046', // Allotropy across the p-block
  'c11_chem_cbse_047', // Oxides: acidic -> amphoteric -> basic across period
  'c11_chem_cbse_048', // Uses: aluminium industry, silicon chips, lead issues
] as const;

type NodeId = typeof CBSE_NODES[number];

interface NodeMeta {
  id: NodeId;
  title: string;
  category: 'Group 13' | 'Group 14' | 'Trends' | 'Uses';
  desc: string;
  formula: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c11_chem_cbse_041: { id: 'c11_chem_cbse_041', title: 'Boron Family (ns2 np1)', category: 'Group 13', desc: 'From non-metal B to post-transition Tl: radius and metallic character grow, IE1 dips at Ga and Tl (poor d/f shielding).', formula: 'B Al Ga In Tl: IE1 801 578 579 558 589' },
  c11_chem_cbse_042: { id: 'c11_chem_cbse_042', title: 'Inert Pair Effect (G13)', category: 'Group 13', desc: 'The ns2 pair resists bonding down the group, so +1 climbs in stability: Tl(I) beats Tl(III), which is a strong oxidiser.', formula: 'Tl3+ + 2e- -> Tl+  (E = +1.25 V)' },
  c11_chem_cbse_043: { id: 'c11_chem_cbse_043', title: 'Ga Anomaly & B Extremes', category: 'Group 13', desc: 'Boron is refractory non-metal (mp 2076 C); gallium melts at 29.8 C but boils at 2400 C - the widest liquid range known.', formula: 'mp: B 2076, Al 660, Ga 29.8 C' },
  c11_chem_cbse_044: { id: 'c11_chem_cbse_044', title: 'Carbon Family & Catenation', category: 'Group 14', desc: 'ns2 np1... ns2 np2. C-C bond (348 kJ/mol) beats Si-Si (222), so carbon builds chains, rings and life itself.', formula: 'catenation: C >> Si > Ge ~ Sn' },
  c11_chem_cbse_045: { id: 'c11_chem_cbse_045', title: 'Group 14 Oxidation States', category: 'Group 14', desc: 'Down the group +2 gains on +4: Ge(IV) stable, Sn(II) is a reducer, Pb(IV) is an oxidiser (PbO2 in car batteries).', formula: 'PbO2 + 4H+ + 2e- -> Pb2+ + 2H2O' },
  c11_chem_cbse_046: { id: 'c11_chem_cbse_046', title: 'Allotropy', category: 'Trends', desc: 'Same element, different bonding: diamond (sp3, hardest), graphite (sp2, conductor), fullerenes; Sn has grey/beta forms.', formula: 'diamond sp3 vs graphite sp2' },
  c11_chem_cbse_047: { id: 'c11_chem_cbse_047', title: 'Oxide Acid-Base Character', category: 'Trends', desc: 'Across a period oxides go basic -> amphoteric -> acidic; down a group they turn more basic. Al2O3 sits at the amphoteric crossroads.', formula: 'Na2O basic | Al2O3 amphoteric | SO3 acidic' },
  c11_chem_cbse_048: { id: 'c11_chem_cbse_048', title: 'Uses & Impact', category: 'Uses', desc: 'Al: Hall-Heroult metal of flight. Si: chip and solar grade. Sn: solder and tinplate. Pb: batteries - and a poisoning legacy.', formula: '2 Al2O3 -> 4 Al + 3 O2 (electrolysis)' },
};

// ==========================================
// ELEMENT DATA (real periodic values)
// ==========================================
interface PBlockElem {
  key: string;
  symbol: string;
  name: string;
  group: 13 | 14;
  mp: number;          // C
  density: number;     // g/cm3 (0 for gases excluded)
  radius: number;      // pm covalent
  ie1: number;         // kJ/mol
  metalChar: number;   // 0 non-metal .. 100 metal
  oxStates: string;
  lowerStable: number; // relative stability of lower OS (0-100)
  note: string;
}

const ELEMS: PBlockElem[] = [
  { key: 'b', symbol: 'B', name: 'Boron', group: 13, mp: 2076, density: 2.34, radius: 85, ie1: 801, metalChar: 5, oxStates: '+3', lowerStable: 0, note: 'Refractory covalent non-metal; boric acid, borax, borosilicate glass.' },
  { key: 'al', symbol: 'Al', name: 'Aluminium', group: 13, mp: 660, density: 2.70, radius: 143, ie1: 578, metalChar: 70, oxStates: '+3', lowerStable: 5, note: 'Amphoteric oxide; passivating Al2O3 film; recycled at 5% of smelting energy.' },
  { key: 'ga', symbol: 'Ga', name: 'Gallium', group: 13, mp: 29.8, density: 5.91, radius: 135, ie1: 579, metalChar: 75, oxStates: '+3, (+1)', lowerStable: 25, note: 'Melts in your palm; GaAs chips and blue LEDs; d-shell poor shielding bends the trend.' },
  { key: 'in', symbol: 'In', name: 'Indium', group: 13, mp: 157, density: 7.31, radius: 167, ie1: 558, metalChar: 85, oxStates: '+1, +3', lowerStable: 45, note: 'ITO touchscreens; soft enough to scratch with a nail.' },
  { key: 'tl', symbol: 'Tl', name: 'Thallium', group: 13, mp: 304, density: 11.85, radius: 170, ie1: 589, metalChar: 90, oxStates: '+1, (+3)', lowerStable: 90, note: 'Tl(I) is the stable state; Tl(III) is a strong oxidiser. Notoriously toxic.' },
  { key: 'c', symbol: 'C', name: 'Carbon', group: 14, mp: 3550, density: 2.27, radius: 77, ie1: 1086, metalChar: 0, oxStates: '+4, -4', lowerStable: 20, note: 'Catenation king; diamond, graphite, graphene, fullerene - one element, many worlds.' },
  { key: 'si', symbol: 'Si', name: 'Silicon', group: 14, mp: 1414, density: 2.33, radius: 118, ie1: 786, metalChar: 30, oxStates: '+4', lowerStable: 10, note: 'Metalloid; semiconductor of the digital age; SiO2 quartz.' },
  { key: 'ge', symbol: 'Ge', name: 'Germanium', group: 14, mp: 938, density: 5.32, radius: 122, ie1: 762, metalChar: 55, oxStates: '+4, (+2)', lowerStable: 25, note: 'First transistor material; Ge(IV) stable, Ge(II) reducing.' },
  { key: 'sn', symbol: 'Sn', name: 'Tin', group: 14, mp: 232, density: 7.31, radius: 140, ie1: 709, metalChar: 75, oxStates: '+2, +4', lowerStable: 55, note: 'Sn(II) chloride is a classic reducer; solder and tinplate metals.' },
  { key: 'pb', symbol: 'Pb', name: 'Lead', group: 14, mp: 327, density: 11.34, radius: 150, ie1: 716, metalChar: 90, oxStates: '+2, (+4)', lowerStable: 92, note: 'Pb(II) stable; PbO2 still oxidises in every car battery. Toxic legacy of petrol.' },
];

// ==========================================
// OXIDATION STATE STABILITY DATA
// ==========================================
const OX_STABILITY = {
  g13: [ { s: 'B(+3)', v: 100, lower: 0 }, { s: 'Al(+3)', v: 95, lower: 5 }, { s: 'Ga(+3)', v: 75, lower: 25 }, { s: 'In(+3)', v: 55, lower: 45 }, { s: 'Tl(+3)', v: 10, lower: 90 } ],
  g14: [ { s: 'C(+4)', v: 100, lower: 20 }, { s: 'Si(+4)', v: 100, lower: 10 }, { s: 'Ge(+4)', v: 85, lower: 25 }, { s: 'Sn(+4)', v: 60, lower: 55 }, { s: 'Pb(+4)', v: 15, lower: 92 } ],
};

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Tin and lead should form stable +4 states like carbon does.',
    correction: 'The inert pair effect pins the ns2 electrons: down Group 14 the +2 state grows until Pb(II) is the stable form and Pb(IV) exists only with strong oxidisers - the exact opposite of carbon.',
    nodeId: 'c11_chem_cbse_045' as NodeId,
  },
  {
    id: 'misc_02',
    misconception: 'Melting points rise steadily down a group with atomic size.',
    correction: 'Group 13 crashes: B 2076 C -> Al 660 C -> Ga 29.8 C. Melting point depends on the BONDING type (giant covalent vs metallic), not size alone. Gallium then boils at 2400 C.',
    nodeId: 'c11_chem_cbse_043' as NodeId,
  },
  {
    id: 'misc_03',
    misconception: 'IE1 must fall continuously down Group 13.',
    correction: 'It dips ANOMALOUSLY: Ga (579) is about equal to Al (578) and Tl (589) rises above In - poor shielding by d and f electrons shrinks the effective radius. The smooth-trend story breaks.',
    nodeId: 'c11_chem_cbse_041' as NodeId,
  },
  {
    id: 'misc_04',
    misconception: 'All Group 14 elements form four identical bonds like carbon.',
    correction: 'Only C and Si manage clean tetravalency routinely. Sn and Pb increasingly prefer two bonds (inert pair), and carbon is unique in pi-bonding (C=C, C=O) - Si=Si analogues are fragile curiosities.',
    nodeId: 'c11_chem_cbse_044' as NodeId,
  },
  {
    id: 'misc_05',
    misconception: 'Aluminium oxide is basic like Na2O because Al is a metal.',
    correction: 'Al2O3 is amphoteric: it reacts with BOTH acid (AlCl3) and base (aluminate). It sits at the basic-to-acidic crossover that defines the periodic oxide line.',
    nodeId: 'c11_chem_cbse_047' as NodeId,
  },
  {
    id: 'misc_06',
    misconception: 'The inert pair effect means the electrons stop participating entirely.',
    correction: 'It is a relative-stability statement: the ns2 pair becomes harder to promote (small s-orbital contraction from poor shielding), so compounds using it get harder to form - not impossible. PbO2 proves the pair can still bond.',
    nodeId: 'c11_chem_cbse_042' as NodeId,
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
    nodeId: 'c11_chem_cbse_043',
    type: 'numeric',
    question: 'Gallium melts at 29.8 C. How many degrees below normal body temperature (37 C) is this?',
    answer: 7.2,
    unit: 'C',
    tolerance: 0.03,
    explanation: '37 - 29.8 = 7.2 C. A gallium spoon dissolves in tea - hence the classic demo, and Ga boiling at 2400 C makes it a thermometer fluid.',
    hints: ['Simple subtraction from body temperature.', '37 - 29.8.', '7.2 degrees.'],
  },
  {
    id: 'ch02',
    nodeId: 'c11_chem_cbse_045',
    type: 'mcq',
    question: 'Which statement about lead oxidation states is correct?',
    options: [
      'Pb(IV) is the stable state; Pb(II) oxidises everything',
      'Pb(II) is stable; PbO2 is a strong oxidising agent',
      'Lead only shows +1 and +3',
      'Lead shows no variable oxidation states',
    ],
    correctIndex: 1,
    explanation: 'Inert pair: Pb(II) dominates. PbO2 (+4) is hungry for electrons - it reduces to Pb(II) while oxidising the other plate, which is exactly the car-battery reaction.',
    hints: ['Check the lower-state stability bars for Group 14.', 'The inert pair effect favours +2 for heavy p-block metals.', 'PbO2 + Pb + H2SO4 = your car battery.'],
  },
  {
    id: 'ch03',
    nodeId: 'c11_chem_cbse_044',
    type: 'mcq',
    question: 'Catenation is strongest in carbon and weak in silicon mainly because:',
    options: [
      'C-C bonds are shorter and stronger than Si-Si bonds',
      'Silicon is radioactive',
      'Carbon is denser than silicon',
      'Silicon cannot form four bonds',
    ],
    correctIndex: 0,
    explanation: 'C-C = 348 kJ/mol vs Si-Si = 222 kJ/mol. Small atoms overlap better, so carbon chains, rings and double bonds are robust - silicon silanes quickly oxidise instead.',
    hints: ['Compare bond enthalpies 348 vs 222 kJ/mol.', 'Shorter bonds, better overlap.', 'Weak Si-Si = fragile chains.'],
  },
  {
    id: 'ch04',
    nodeId: 'c11_chem_cbse_042',
    type: 'numeric',
    question: 'From the lab data, how many times higher is thallium\'s lower-state stability (90) than aluminium\'s (5)?',
    answer: 18,
    unit: 'x',
    tolerance: 0.02,
    explanation: '90 / 5 = 18x. The +1 state that barely exists for Al is THE state for Tl - the inert pair effect quantified.',
    hints: ['Ratio of the two stability figures.', '90 / 5.', '18 times.'],
  },
  {
    id: 'ch05',
    nodeId: 'c11_chem_cbse_047',
    type: 'mcq',
    question: 'Al2O3 reacts with both hot concentrated NaOH and dilute HCl. This behaviour is called:',
    options: ['basic anhydride behaviour', 'amphoteric behaviour', 'neutral oxide behaviour', 'peroxide behaviour'],
    correctIndex: 1,
    explanation: 'Amphoteric: Al2O3 + 6HCl -> 2AlCl3 + 3H2O, and Al2O3 + 2NaOH + 3H2O -> 2Na[Al(OH)4]. The oxide line crosses at aluminium.',
    hints: ['Reacts with acid AND base = one word.', 'Where does the oxide basic/acidic crossover sit?', 'Al2O3 amphoterism.'],
  },
  {
    id: 'ch06',
    nodeId: 'c11_chem_cbse_041',
    type: 'mcq',
    question: 'IE1 of Ga (579 kJ/mol) is NOT lower than Al (578 kJ/mol) despite Ga being below Al in the group. The reason:',
    options: [
      'Gallium is a liquid, which raises IE',
      'Poor shielding by 3d electrons makes Ga effectively smaller',
      'Gallium has fewer protons',
      'The data is wrong - IE must always fall',
    ],
    correctIndex: 1,
    explanation: 'Ten 3d electrons shield poorly, so the outer 4p electron of Ga feels almost as much nuclear pull as Al\'s 3p. The same poor d/f shielding repeats at Tl (after 4f).',
    hints: ['Watch for the d-block contraction between Al and Ga.', 'd electrons screen badly.', 'Effective nuclear charge rises.'],
  },
  {
    id: 'ch07',
    nodeId: 'c11_chem_cbse_046',
    type: 'mcq',
    question: 'Diamond is hard and non-conducting while graphite is soft and conducts. The reason:',
    options: [
      'Graphite contains metal impurities',
      'Diamond is sp3 (all electrons localised); graphite is sp2 with delocalised pi electrons between layers',
      'Diamond has more carbon atoms',
      'Graphite is a different element chemically',
    ],
    correctIndex: 1,
    explanation: 'sp3 tetrahedral network locks every electron into sigma bonds (hard, insulating). sp2 sheets leave one delocalised electron per atom free to move - and layers slide (pencil lead, lubricant).',
    hints: ['Count the bonds per carbon in each.', 'Delocalised electrons conduct.', 'sp3 vs sp2 hybridisation.'],
  },
  {
    id: 'ch08',
    nodeId: 'c11_chem_cbse_048',
    type: 'numeric',
    question: 'Aluminium smelting uses ~14 kWh per kg. Recycled aluminium needs 5% of that. How many kWh per kg does recycling use?',
    answer: 0.7,
    unit: 'kWh/kg',
    tolerance: 0.03,
    explanation: '0.05 * 14 = 0.7 kWh/kg - a 95% saving, which is why aluminium is the recycling poster metal.',
    hints: ['5% of 14.', '0.05 * 14.', '0.7 kWh/kg.'],
  },
];

// ==========================================
// PREDICTIONS
// ==========================================
const PREDICTIONS = [
  {
    id: 'pred01',
    nodeId: 'c11_chem_cbse_043' as NodeId,
    question: 'Predict: a gallium spoon and an aluminium spoon are stirred into identical cups of 45 C tea. What happens?',
    options: [
      'Both melt - tea is hotter than both melting points',
      'Only the gallium spoon melts; the aluminium spoon survives comfortably',
      'Neither melts - metals never melt in liquids',
      'The aluminium spoon melts faster because it is lighter',
    ],
    correctIndex: 1,
    verify: 'Verify in the Lab: push the temperature slider to 45 C and read the bench state for Ga (29.8 C) versus Al (660 C).',
    explanation: 'Ga at 29.8 C melts 15 degrees below the tea temperature; Al needs 660 C. Same group, same column of the periodic table, 630-degree difference - bonding type decides.',
  },
  {
    id: 'pred02',
    nodeId: 'c11_chem_cbse_042' as NodeId,
    question: 'Predict: which ion would you trust to stay put in aqueous solution, Al3+ or Tl+?',
    options: [
      'Tl+ - the inert pair effect locks Tl(I) as its stable state',
      'Al3+ cannot exist in water at all',
      'Both equally stable - both p-block metals',
      'Tl+ immediately disproportionates',
    ],
    correctIndex: 0,
    verify: 'Verify on the oxidation-state bench: the lower-state bar is 90% tall for Tl but 5% for Al.',
    explanation: 'Down Group 13 the +1 state wins: Tl+ is the stable aqueous ion while Tl3+ grabs electrons (E = +1.25 V). For aluminium it is the reverse - Al3+ is the normal state.',
  },
];

// ==========================================
// REAL-WORLD ACTIVITY
// ==========================================
const REAL_WORLD = {
  title: 'Field Mission: Thermometer Fluid & Battery Chemistry Audit',
  steps: [
    'Choose a metal for a lab thermometer with the widest liquid range: compare Ga (29.8-2400 C), Hg (-39-357 C) and Cs (28-671 C) and justify the pick with the liquid-range width.',
    'A car battery delivers Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O. Identify the oxidation-state change that proves the inert pair effect is exploitable.',
    'A semiconductor fab must pick between Si and GaAs for a blue-LED layer. Use group data (Ga mp 29.8 C, band-gap chemistry) plus cost reasoning.',
    'Explain why recycled aluminium saves 95% of smelting energy, then argue why the same recycling logic fails for silicon wafers.',
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
// GALLIUM SPOON BENCH
// ==========================================
function GaBenchCanvas(props: {
  tempC: number; mpGa: number; mpAl: number; pick: 'ga' | 'al'; showScale: boolean;
}) {
  const elem = props.pick === 'ga'
    ? { mp: props.mpGa, label: 'Ga spoon', color: '#94a3b8' }
    : { mp: props.mpAl, label: 'Al spoon', color: '#cbd5e1' };
  const melted = props.tempC > elem.mp;
  const tilt = melted ? 32 : 12 + (props.tempC / 50) * 8;
  const dropY = melted ? 210 : 150;
  return (
    <svg viewBox="0 0 560 320" className="w-full rounded-2xl bg-slate-950 border border-slate-800" preserveAspectRatio="xMidYMid meet">
      {/* tea cup */}
      <path d="M 150 200 L 170 300 L 390 300 L 410 200" fill="none" stroke="#475569" strokeWidth="4" />
      <rect x="155" y="205" width="250" height="90" fill="#b45309" opacity="0.35" />
      <line x1="155" y1="205" x2="405" y2="205" stroke="#d97706" strokeWidth="2" opacity="0.8" />
      <text x="280" y="316" fill="#d97706" fontSize="11" textAnchor="middle">tea at {props.tempC} C</text>
      {/* spoon */}
      <g transform={`translate(280,${melted ? 190 : 130}) rotate(${melted ? 40 : tilt})`} style={{ transition: 'all 0.7s ease' }}>
        {!melted ? (
          <g>
            <rect x="-12" y="-70" width="24" height="80" rx="10" fill={elem.color} stroke="#64748b" />
            <ellipse cx="0" cy="8" rx="26" ry="18" fill={elem.color} stroke="#64748b" strokeWidth="2" />
            <text x="34" y="-50" fill="#e2e8f0" fontSize="12" fontWeight="bold">{elem.label} (mp {elem.mp} C)</text>
          </g>
        ) : (
          <g>
            <rect x="-8" y="-60" width="16" height="70" rx="8" fill={elem.color} stroke="#64748b" />
            <ellipse cx="0" cy={dropY - 190 + 20} rx="22" ry="10" fill={elem.color} opacity="0.9">
              <animate attributeName="cy" values="18;60;18" dur="1.2s" repeatCount="indefinite" />
            </ellipse>
            <text x="30" y="-40" fill="#f87171" fontSize="12" fontWeight="bold">melted! liquid drips</text>
          </g>
        )}
      </g>
      {/* thermometer scale */}
      {props.showScale && (
        <g>
          <line x1="490" y1="40" x2="490" y2="300" stroke="#475569" strokeWidth="4" />
          {/* mp markers */}
          <circle cx="490" cy={300 - (props.mpGa / 50) * 260 > 40 ? Math.max(300 - (props.mpGa / 700) * 260, 40) : 40} r="0" />
          <line x1="480" y1={Math.max(300 - (props.mpGa / 700) * 260, 40)} x2="500" y2={Math.max(300 - (props.mpGa / 700) * 260, 40)} stroke="#f87171" strokeWidth="2" />
          <text x="470" y={Math.max(300 - (props.mpGa / 700) * 260, 40) - 6} fill="#f87171" fontSize="9" textAnchor="end">Ga 29.8</text>
          {/* current temp marker */}
          <line x1="478" y1={300 - (props.tempC / 700) * 260 > 300 ? 300 : 300 - (props.tempC / 50) * 260 < 40 ? 40 : 300 - (props.tempC / 50) * 260} x2="502" y2={300 - (props.tempC / 50) * 260 < 40 ? 40 : 300 - (props.tempC / 50) * 260} stroke="#38bdf8" strokeWidth="3" />
          <text x="510" y={300 - (props.tempC / 50) * 260 + 4 < 44 ? 44 : 300 - (props.tempC / 50) * 260 + 4} fill="#38bdf8" fontSize="9">now {props.tempC}</text>
        </g>
      )}
      <text x="280" y="30" fill="#e2e8f0" fontSize="14" textAnchor="middle" fontWeight="bold">
        {melted ? `${elem.label} is LIQUID at ${props.tempC} C` : `${elem.label} is solid at ${props.tempC} C`}
      </text>
    </svg>
  );
}

// ==========================================
// STABILITY BAR CHART
// ==========================================
function StabilityChart(props: { title: string; data: Array<{ s: string; v: number; lower: number }>; note: string }) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
      <p className="text-sm font-bold text-slate-200 mb-1">{props.title}</p>
      <p className="text-[10px] text-slate-500 mb-3">{props.note}</p>
      <div className="space-y-2">
        {props.data.map((d) => (
          <div key={d.s} className="flex items-center gap-2">
            <span className="w-16 text-xs font-mono text-slate-300">{d.s}</span>
            <div className="flex-1 flex h-4 rounded-full overflow-hidden bg-slate-800">
              <div className="h-full bg-sky-500 transition-all duration-700" style={{ width: `${d.v}%` }} />
              <div className="h-full bg-amber-500 transition-all duration-700" style={{ width: `${d.lower}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2 text-[10px] text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-2 bg-sky-500 inline-block rounded" /> higher OS (+3/+4)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-2 bg-amber-500 inline-block rounded" /> lower OS (+1/+2)</span>
      </div>
    </div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_ChemistryPBlockElementsSim({
  initialNodeId = 'c11_chem_cbse_041',
  onComplete,
  devMode = false,
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'lab' | 'predict' | 'challenges' | 'misconceptions' | 'summary'>('lab');

  // ---- Element explorer ----
  const [groupFilter, setGroupFilter] = useState<13 | 14>(13);
  const [elemKey, setElemKey] = useState('ga');

  // ---- Ga bench ----
  const [tempC, setTempC] = useState(25);
  const [spoon, setSpoon] = useState<'ga' | 'al'>('ga');
  const [showScale, setShowScale] = useState(true);

  const groupElems = ELEMS.filter((e) => e.group === groupFilter);
  const elem = ELEMS.find((e) => e.key === elemKey) || ELEMS[2];

  const resetLab = useCallback(() => {
    setGroupFilter(13); setElemKey('ga');
    setTempC(25); setSpoon('ga'); setShowScale(true);
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
    CHALLENGES.forEach((c) => { init[c.id] = createReviewItem(c.nodeId, 'p-Block Elements'); });
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
    const srs = srsMap[ch.id] || createReviewItem(ch.nodeId, 'p-Block Elements');
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
              <Thermometer className="w-5 h-5 text-cyan-400" /> The p-Block Elements (Groups 13 &amp; 14)
            </h1>
            <p className="text-xs text-slate-400">Class 11 Chemistry - inert pair, gallium bench, oxide chemistry - CBSE Chapter Lab</p>
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
            {/* element explorer */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <button onClick={() => setGroupFilter(13)}
                  className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${groupFilter === 13 ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                  Group 13 (boron family)
                </button>
                <button onClick={() => setGroupFilter(14)}
                  className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${groupFilter === 14 ? 'bg-violet-600 border-violet-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                  Group 14 (carbon family)
                </button>
              </div>
              <div className="flex gap-2 flex-wrap mb-4">
                {groupElems.map((e) => (
                  <button key={e.key} onClick={() => setElemKey(e.key)}
                    className={`min-h-11 px-4 rounded-xl text-sm font-bold border transition-all ${
                      elemKey === e.key ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-900/40' : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                    {e.symbol} <span className="text-[10px] font-normal opacity-80">{e.name}</span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <StatBox label="Melting point" value={elem.mp.toLocaleString()} unit="C" color="#f87171" />
                <StatBox label="Density" value={elem.density.toFixed(2)} unit="g/cm3" color="#34d399" />
                <StatBox label="Covalent radius" value={String(elem.radius)} unit="pm" />
                <StatBox label="IE1" value={String(elem.ie1)} unit="kJ/mol" color="#fbbf24" />
                <StatBox label="Metallic character" value={`${elem.metalChar}`} unit="/100" color="#22d3ee" />
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Oxidation states</p>
                  <p className="text-sm font-bold text-slate-200">{elem.oxStates}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" /> {elem.note}
              </p>
            </div>

            {/* gallium bench */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-md font-bold text-cyan-300 mb-3 flex items-center gap-2">
                <Thermometer className="w-5 h-5" /> Spoon-in-tea bench - the Ga anomaly
              </h2>
              <GaBenchCanvas tempC={tempC} mpGa={29.8} mpAl={660} pick={spoon} showScale={showScale} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4">
                <div>
                  <p className="text-xs font-semibold text-slate-300 mb-1">Tea temperature</p>
                  <input type="range" min={0} max={50} step={0.5} value={tempC}
                    onChange={(e) => setTempC(parseFloat(e.target.value))}
                    className="w-full h-11 accent-cyan-500 cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0 C (ice)</span><span>25 C (room)</span><span>37 C (body)</span><span>50 C</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-300">Spoon material</p>
                  <div className="flex gap-2">
                    <button onClick={() => setSpoon('ga')}
                      className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${spoon === 'ga' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                      Gallium (29.8 C)
                    </button>
                    <button onClick={() => setSpoon('al')}
                      className={`min-h-11 px-4 rounded-xl text-sm font-bold border ${spoon === 'al' ? 'bg-cyan-600 border-cyan-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
                      Aluminium (660 C)
                    </button>
                  </div>
                </div>
              </div>
              <Toggle label="Thermometer scale" on={showScale} onToggle={() => setShowScale((s) => !s)} />
              <p className="text-xs text-slate-500 mt-3 flex items-start gap-2">
                <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Same group, same ns2 np1 family - but Ga melts at 29.8 C while Al needs 660 C. Melting point tracks BONDING (weak metallic layers in Ga), not just size.
              </p>
            </div>

            {/* oxidation-state benches */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
              <h2 className="text-md font-bold text-amber-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Inert pair effect - oxidation-state stability down the groups
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StabilityChart title="Group 13: +3 vs +1" data={OX_STABILITY.g13}
                  note="Relative stability of the higher and lower oxidation states. Tl(I) is the stable state; Tl(III) is an oxidiser." />
                <StabilityChart title="Group 14: +4 vs +2" data={OX_STABILITY.g14}
                  note="C stays +4 for life; Pb flips: Pb(II) stable, Pb(IV) only under oxidising service (battery plates)." />
              </div>
            </div>

            {/* What to try */}
            <div className="bg-amber-950/40 border border-amber-600/40 rounded-3xl p-5">
              <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5" /> What to try</h3>
              <ol className="space-y-2 text-sm text-amber-100/90 list-decimal list-inside">
                <li>Slide the tea from 25 C to 45 C with the Ga spoon, then swap to aluminium. One dissolves into shining droplets at body-warm tea; the other cannot melt below 660 C.</li>
                <li>Compare the two stability charts: find where the amber (lower-state) bar first overtakes the blue one - that crossover IS the inert pair effect taking over (In/Tl and Sn/Pb).</li>
              </ol>
              <p className="text-xs text-amber-200/70 mt-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Misconception killer: down Group 13, IE1 does NOT keep falling - Ga and Tl break the trend because d and f electrons shield badly. Real periodic trends have anomalies.
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
              <p className="text-slate-400 text-sm mb-6">p-block traps: inert pair, melting anomalies, amphoteric oxides and allotropes.</p>
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
              <h3 className="text-md font-bold text-slate-100 mb-3">Formula &amp; fact sheet (from this sim)</h3>
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
              Touch first: <span className="text-slate-200 font-semibold">push the tea to 45 C with the gallium spoon in it</span> - then swap spoons.
            </p>
            <span className="text-[10px] font-mono text-slate-600">node focus: {initialNodeId}</span>
          </div>
        </footer>
      )}
    </div>
  );
}
