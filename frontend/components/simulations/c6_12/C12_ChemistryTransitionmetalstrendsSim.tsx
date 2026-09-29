'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// CONSTANTS & NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c12_chem_051',
  'c12_chem_052',
  'c12_chem_053',
  'c12_chem_054',
  'c12_chem_055',
  'c12_chem_056',
  'c12_chem_057',
  'c12_chem_058',
  'c12_chem_059',
  'c12_chem_060',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Slide {
  id: number;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  concept: string;
  content: string;
  keyTakeaway: string;
  visualType: 'd-trends' | 'dichromate' | 'permanganate' | 'f-block' | 'coordination' | 'vbt-cft';
}

interface Challenge {
  id: number;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  misconceptionId?: string;
  hint: string;
}

interface Element3D {
  symbol: string;
  name: string;
  z: number;
  config: string;
  oxStates: number[];
  radius: number; // pm
  unpairedD: number;
  color: string;
  solutionColor: string;
}

// 3d Series Data
const THREE_D_ELEMENTS: Element3D[] = [
  { symbol: 'Sc', name: 'Scandium', z: 21, config: '[Ar] 3d¹ 4s²', oxStates: [3], radius: 162, unpairedD: 1, color: '#94a3b8', solutionColor: 'transparent' },
  { symbol: 'Ti', name: 'Titanium', z: 22, config: '[Ar] 3d² 4s²', oxStates: [2, 3, 4], radius: 147, unpairedD: 2, color: '#a1a1aa', solutionColor: '#cbd5e1' },
  { symbol: 'V',  name: 'Vanadium', z: 23, config: '[Ar] 3d³ 4s²', oxStates: [2, 3, 4, 5], radius: 134, unpairedD: 3, color: '#64748b', solutionColor: '#a855f7' },
  { symbol: 'Cr', name: 'Chromium', z: 24, config: '[Ar] 3d⁵ 4s¹', oxStates: [2, 3, 6], radius: 128, unpairedD: 5, color: '#38bdf8', solutionColor: '#22c55e' },
  { symbol: 'Mn', name: 'Manganese', z: 25, config: '[Ar] 3d⁵ 4s²', oxStates: [2, 3, 4, 6, 7], radius: 127, unpairedD: 5, color: '#ec4899', solutionColor: '#ec4899' },
  { symbol: 'Fe', name: 'Iron', z: 26, config: '[Ar] 3d⁶ 4s²', oxStates: [2, 3, 6], radius: 126, unpairedD: 4, color: '#f97316', solutionColor: '#eab308' },
  { symbol: 'Co', name: 'Cobalt', z: 27, config: '[Ar] 3d⁷ 4s²', oxStates: [2, 3, 4], radius: 125, unpairedD: 3, color: '#3b82f6', solutionColor: '#f43f5e' },
  { symbol: 'Ni', name: 'Nickel', z: 28, config: '[Ar] 3d⁸ 4s²', oxStates: [2, 3, 4], radius: 124, unpairedD: 2, color: '#10b981', solutionColor: '#22c55e' },
  { symbol: 'Cu', name: 'Copper', z: 29, config: '[Ar] 3d¹⁰ 4s¹', oxStates: [1, 2], radius: 128, unpairedD: 1, color: '#b45309', solutionColor: '#0284c7' },
  { symbol: 'Zn', name: 'Zinc', z: 30, config: '[Ar] 3d¹⁰ 4s²', oxStates: [2], radius: 138, unpairedD: 0, color: '#cbd5e1', solutionColor: 'transparent' },
];

// ==========================================
// SCENARIO & DISCOVERY DATA
// ==========================================
const SCENARIO = {
  title: "The Advanced Inorganic Chemistry Laboratory",
  subtitle: "Mastering d & f Block Trends, Coordination Chemistry, VBT, and CFT for ISC Class 12",
  description: "Step inside an interactive research laboratory where complex transition metal chemistry comes alive. Manipulate d-orbitals, perform pH-dependent redox reactions, split crystal field levels, build coordination isomers, and solve industrial chemistry challenges."
};

const DISCOVERY_QUESTION = {
  question: "Why is aqueous Cu²⁺ (3d⁹) deep blue, whereas aqueous Zn²⁺ (3d¹⁰) is completely colourless?",
  options: [
    "Zn²⁺ is heavier than Cu²⁺, so it absorbs infrared radiation instead of visible light",
    "Cu²⁺ has an unpaired 3d electron undergoing d-d transitions, whereas Zn²⁺ has a completely filled 3d¹⁰ shell with no vacant d-orbitals",
    "Zn²⁺ forms covalent bonds with water, destroying its electronic transitions",
    "Cu²⁺ is paramagnetic, which reflects blue light automatically"
  ],
  correctAnswer: 1,
  explanation: "Colour in transition metal ions arises from d-d transitions of unpaired electrons between split d-orbital energy levels in a ligand field. Zn²⁺ (3d¹⁰) has a completely filled d-subshell with no vacant d-orbitals for excitation, making it colourless!"
};

// ==========================================
// SLIDES DATA (5 Interactive Slides)
// ==========================================
const TEACHING_SLIDES: Slide[] = [
  {
    id: 1,
    nodeId: 'c12_chem_051',
    title: '3d Transition Metal Trends',
    subtitle: 'Electronic Configurations, Radii & Magnetic Moments',
    concept: 'd-Block Periodic Trends',
    content: 'Across the 3d series (Sc to Zn), effective nuclear charge increases because 3d electrons shield outer 4s electrons poorly. Note the anomalous configurations of Cr ([Ar] 3d⁵ 4s¹) and Cu ([Ar] 3d¹⁰ 4s¹) due to half-filled/filled subshell stability. Spin-only magnetic moment is given by μ = √(n(n+2)) BM.',
    keyTakeaway: 'Poor d-electron shielding causes atomic radius contraction up to Ni. μ = √(n(n+2)) BM dictates paramagnetism.',
    visualType: 'd-trends'
  },
  {
    id: 2,
    nodeId: 'c12_chem_052',
    title: 'Potassium Dichromate (K₂Cr₂O₇)',
    subtitle: 'pH Equilibrium & Redox Action',
    concept: 'Chromium(VI) Chemistry',
    content: 'In aqueous solution, yellow chromate (CrO₄²⁻) and orange dichromate (Cr₂O₇²⁻) exist in pH-dependent equilibrium: 2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O. In acidic medium, dichromate is a strong oxidising agent (E° = +1.33 V): Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ (green) + 7H��O.',
    keyTakeaway: 'Acidic medium turns yellow chromate to orange dichromate. Dichromate oxidises Fe²⁺ to Fe³⁺, turning green (Cr³⁺).',
    visualType: 'dichromate'
  },
  {
    id: 3,
    nodeId: 'c12_chem_053',
    title: 'Potassium Permanganate (KMnO₄)',
    subtitle: 'Preparation & Medium-Dependent Reduction',
    concept: 'Manganese(VII) Chemistry',
    content: 'KMnO₄ is prepared by fusing pyrolusite (MnO₂) with KOH & O₂ to form green K₂MnO₄, which disproportionates to purple KMnO₄. Reduction products depend strictly on pH: Acidic → Mn²⁺ (colourless/5e⁻); Neutral → MnO₂ (brown ppt/3e⁻); Alkaline → MnO₄²⁻ (green/1e⁻).',
    keyTakeaway: 'KMnO₄ is a self-indicator. Mn(+7) reduces to Mn²⁺ (acidic), MnO₂ (neutral), and MnO₄²⁻ (alkaline).',
    visualType: 'permanganate'
  },
  {
    id: 4,
    nodeId: 'c12_chem_054',
    title: 'f-Block: Lanthanoids vs Actinoids',
    subtitle: '4f & 5f Inner Transition Elements',
    concept: 'f-Block Chemistry & Contractions',
    content: 'Lanthanoids (Ce-Lu, 4f) show steady Lanthanoid Contraction due to poor 4f shielding, making Zr/Hf and Nb/Ta identical in size! Actinoids (Th-Lr, 5f) have less shielded 5f electrons, showing more variable oxidation states (+3 to +7, e.g., UF₆) and all are radioactive.',
    keyTakeaway: '4f/5f poor shielding causes contraction. Actinoids exhibit broader oxidation states (+3 to +7) than lanthanoids (+3 dominant).',
    visualType: 'f-block'
  },
  {
    id: 5,
    nodeId: 'c12_chem_059',
    title: 'Coordination Theory: VBT & CFT',
    subtitle: 'Valence Bond & Crystal Field Theories',
    concept: 'Complex Bonding, Geometry & Splitting',
    content: 'VBT uses hybridisation (sp³ tetrahedral, dsp² square planar, d²sp³ inner octahedral, sp³d2 outer octahedral). CFT treats ligands as point charges: octahedral field splits d-orbitals into lower t₂g and higher e_g with gap Δₒ. Strong field ligands (CN⁻, NH₃) produce large Δₒ (low spin); weak field ligands (F⁻, H₂O) produce high spin.',
    keyTakeaway: 'Strong ligands (large Δₒ) cause electron pairing → Low Spin / Diamagnetic. Octahedral splits into t₂g (lower) and e_g (higher).',
    visualType: 'vbt-cft'
  }
];

// ==========================================
// PROGRESSIVE CHALLENGES (10 Node-Aligned Questions)
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: 'c12_chem_051',
    title: 'Challenge 1: Magnetic Moment Calculation',
    question: 'Calculate the spin-only magnetic moment (μ) of an aqueous Mn²⁺ ion (Z = 25).',
    options: ['0 BM', '2.84 BM', '4.90 BM', '5.92 BM'],
    correctAnswer: 3,
    explanation: 'Mn²⁺ has electronic configuration [Ar] 3d⁵. It has 5 unpaired d-electrons (n = 5). μ = √(5(5+2)) = √35 ≈ 5.92 BM.',
    hint: 'Determine the 3d configuration of Mn²⁺ and count unpaired electrons (n). Use μ = √(n(n+2)).'
  },
  {
    id: 2,
    nodeId: 'c12_chem_052',
    title: 'Challenge 2: Chromate-Dichromate Conversion',
    question: 'What happens when dilute NaOH solution is added to an orange solution of potassium dichromate?',
    options: [
      'The solution turns dark green due to reduction to Cr³⁺',
      'The solution turns yellow due to conversion of Cr₂O₇²⁻ to CrO₄²⁻',
      'A brown precipitate of CrO₃ forms',
      'No change occurs because dichromate is stable in basic medium'
    ],
    correctAnswer: 1,
    explanation: 'Adding OH⁻ shifts the equilibrium Cr₂O₇²⁻ + 2OH⁻ ⇌ 2CrO₄²⁻ + H₂O to the right, forming yellow chromate ions.',
    hint: 'Dichromate (orange) is stable in acid; adding alkali (OH⁻) converts it back to chromate (yellow).'
  },
  {
    id: 3,
    nodeId: 'c12_chem_053',
    title: 'Challenge 3: Permanganate Redox Half-Reaction',
    question: 'How many moles of electrons are gained by 1 mole of KMnO₄ during oxidation of FeSO₄ in acidic medium?',
    options: ['1 mole', '3 moles', '5 moles', '6 moles'],
    correctAnswer: 2,
    explanation: 'In acidic medium, the half-reaction is MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O. Manganese drops from +7 to +2, gaining 5 electrons.',
    hint: 'In acidic medium, MnO₄⁻ (+7) is reduced to Mn²⁺ (+2).'
  },
  {
    id: 4,
    nodeId: 'c12_chem_054',
    title: 'Challenge 4: Lanthanoid Contraction Consequence',
    question: 'Which pair of transition metals has almost identical atomic radii due to Lanthanoid Contraction?',
    options: ['Ti and V', 'Zr and Hf', 'Fe and Co', 'Cu and Zn'],
    correctAnswer: 1,
    explanation: 'Zr (4d series, radius 160 pm) and Hf (5d series, radius 159 pm) have almost identical atomic radii because the intervening 4f filling in lanthanoids shields nuclear charge poorly.',
    hint: 'Look for pairs in the 4d and 5d series of the same group.'
  },
  {
    id: 5,
    nodeId: 'c12_chem_055',
    title: 'Challenge 5: Lanthanoids vs Actinoids',
    question: 'Why do actinoids exhibit a wider range of oxidation states (up to +7) compared to lanthanoids?',
    options: [
      'Actinoids are radioactive, which promotes electron removal',
      '5f, 6d, and 7s orbitals are comparable in energy, allowing 5f electrons to participate in bonding',
      'Lanthanoids have larger ionic radii than actinoids',
      'Actinoids form only ionic bonds with fluorine'
    ],
    correctAnswer: 1,
    explanation: 'In actinoids, the energy gap between 5f, 6d, and 7s subshells is very small, so 5f electrons are less shielded and participate readily in bonding.',
    hint: 'Compare the energy levels and shielding of 4f vs 5f subshells.'
  },
  {
    id: 6,
    nodeId: 'c12_chem_056',
    title: 'Challenge 6: Coordination Number & Primary/Secondary Valence',
    question: 'A complex compound with empirical formula CoCl₃·5NH₃ precipitates 2 moles of AgCl when treated with excess AgNO₃. What is its coordination sphere formula?',
    options: ['[Co(NH₃)₅Cl₃]', '[Co(NH₃)₅Cl]Cl₂', '[Co(NH₃)₄Cl₂]Cl·NH₃', '[Co(NH₃)₅]Cl₃'],
    correctAnswer: 1,
    explanation: '2 moles of AgCl precipitated means 2 chloride ions are outside the coordination sphere as counter ions. The formula is [Co(NH₃)₅Cl]Cl₂, giving coordination number 6.',
    hint: 'Precipitated chloride ions are outside the square brackets [ ]. Total ligands inside must satisfy secondary valence (6).'
  },
  {
    id: 7,
    nodeId: 'c12_chem_057',
    title: 'Challenge 7: IUPAC Nomenclature',
    question: 'What is the correct IUPAC name for K₃[Fe(C₂O₄)₃]?',
    options: [
      'Potassium trioxalatoférrate(III)',
      'Potassium trisoxalatoiron(III)',
      'Tripotassium trioxalatoferrate(III)',
      'Potassium trioxalatoferrate(III)'
    ],
    correctAnswer: 3,
    explanation: 'Cation named first (Potassium), then anionic complex (trioxalatoferrate(III)). No numerical prefix for counter ion (not tripotassium). Complex anion takes -ate suffix.',
    hint: 'The counter cation is named simply "Potassium". The anionic complex uses -ferrate(III).'
  },
  {
    id: 8,
    nodeId: 'c12_chem_058',
    title: 'Challenge 8: Isomerism Identification',
    question: 'What type of isomerism is exhibited by the pair [Co(NH₃)₅(NO₂)]Cl₂ (red) and [Co(NH₃)₅(ONO)]Cl₂ (pink)?',
    options: ['Ionisation isomerism', 'Linkage isomerism', 'Coordination isomerism', 'Geometrical isomerism'],
    correctAnswer: 1,
    explanation: 'The nitrite ion NO₂⁻ is ambidentate: it can bind through N (-NO₂, nitro) or through O (-ONO, nitrito). This is linkage isomerism.',
    hint: 'Look at the ambidentate ligand NO₂⁻ binding through different donor atoms.'
  },
  {
    id: 9,
    nodeId: 'c12_chem_059',
    title: 'Challenge 9: Valence Bond Theory Hybridisation',
    question: 'Predict the hybridisation, geometry, and magnetic property of [Ni(CN)₄]²⁻ using VBT.',
    options: [
      'sp³, Tetrahedral, Diamagnetic',
      'dsp², Square Planar, Diamagnetic',
      'dsp², Square Planar, Paramagnetic',
      'sp³d², Octahedral, Paramagnetic'
    ],
    correctAnswer: 1,
    explanation: 'Ni²⁺ (3d⁸). Strong field CN⁻ forces 3d electrons to pair into four 3d orbitals, leaving one inner 3d orbital vacant. Hybridisation is dsp² (square planar), and all electrons are paired (diamagnetic).',
    hint: 'Ni²⁺ is 3d⁸. CN⁻ is strong field → forces electron pairing → vacant 3d orbital available.'
  },
  {
    id: 10,
    nodeId: 'c12_chem_060',
    title: 'Challenge 10: Crystal Field Theory Splitting',
    question: 'In an octahedral field, why are the d_{x²-y²} and d_{z²} orbitals (e_g set) raised higher in energy than d_{xy}, d_{yz}, d_{xz} (t₂g set)?',
    options: [
      'Because e_g orbitals point directly along the coordinate axes where octahedral ligands approach',
      'Because e_g orbitals lie between the coordinate axes away from ligands',
      'Because t₂g orbitals contain more electrons than e_g orbitals',
      'Because e_g orbitals form pi-bonds with ligands'
    ],
    correctAnswer: 0,
    explanation: 'In an octahedral complex, 6 ligands approach along the x, y, and z axes. Lobes of d_{x²-y²} and d_{z²} point straight at ligands, experiencing maximum electrostatic repulsion and rising to higher energy (e_g).',
    hint: 'Consider the spatial orientation of d-orbital lobes relative to x, y, z axes.'
  }
];

// ==========================================
// INTERACTIVE VISUAL COMPONENT 1: 3D TRENDS
// ==========================================
const DBlockTrendsVisualizer: React.FC<{
  selectedElem: Element3D;
  onSelect: (elem: Element3D) => void;
}> = ({ selectedElem, onSelect }) => {
  const magneticMoment = Math.sqrt(selectedElem.unpairedD * (selectedElem.unpairedD + 2)).toFixed(2);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-white shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-xl font-bold text-gold-400 flex items-center gap-2">
            <span>⚛️</span> 3d Series Transition Element Explorer
          </h3>
          <p className="text-xs text-slate-400">Click any element tile to inspect configuration, oxidation states, radius & magnetic moment</p>
        </div>
        <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono text-gold-300">
          Z = {selectedElem.z} | {selectedElem.name}
        </div>
      </div>

      {/* Grid of 3d Elements */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
        {THREE_D_ELEMENTS.map((el) => {
          const isSelected = el.symbol === selectedElem.symbol;
          return (
            <button
              key={el.symbol}
              onClick={() => {
                audioManager.play('tap');
                onSelect(el);
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                isSelected
                  ? 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-lg shadow-gold-500/20 scale-105'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
              }`}
            >
              <span className="text-[10px] text-slate-400 font-mono">{el.z}</span>
              <span className="text-base font-extrabold">{el.symbol}</span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5">{el.radius}pm</span>
            </button>
          );
        })}
      </div>

      {/* Detail View of Selected Element */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/70 rounded-lg p-4 border border-slate-800">
        {/* Info Column */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-300">Electronic Configuration</div>
          <div className="text-lg font-mono font-bold text-amber-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
            {selectedElem.config}
          </div>
          { (selectedElem.symbol === 'Cr' || selectedElem.symbol === 'Cu') && (
            <div className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded border border-amber-800/50">
              ⚠️ Anomalous configuration due to extra stability of {selectedElem.symbol === 'Cr' ? 'half-filled 3d⁵' : 'fully-filled 3d¹⁰'} subshell!
            </div>
          )}
          <div className="text-xs text-slate-400 pt-1">
            Common Oxidation States:{' '}
            <span className="text-gold-300 font-bold">
              {selectedElem.oxStates.map(o => `+${o}`).join(', ')}
            </span>
          </div>
        </div>

        {/* Orbital Filling Viz */}
        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-300">3d Orbital Filling ({selectedElem.unpairedD} unpaired e⁻)</div>
          <div className="flex gap-1.5 justify-center bg-slate-900 p-3 rounded border border-slate-800">
            {[1, 2, 3, 4, 5].map((boxIdx) => {
              // Calculate arrows
              const totalD = selectedElem.symbol === 'Cr' ? 5 : selectedElem.symbol === 'Cu' ? 10 : (selectedElem.z - 20 - (selectedElem.symbol === 'Sc' ? 2 : 2));
              let count = 0;
              if (selectedElem.symbol === 'Sc') count = 1;
              else if (selectedElem.symbol === 'Ti') count = 2;
              else if (selectedElem.symbol === 'V') count = 3;
              else if (selectedElem.symbol === 'Cr') count = 5;
              else if (selectedElem.symbol === 'Mn') count = 5;
              else if (selectedElem.symbol === 'Fe') count = 6;
              else if (selectedElem.symbol === 'Co') count = 7;
              else if (selectedElem.symbol === 'Ni') count = 8;
              else if (selectedElem.symbol === 'Cu') count = 10;
              else if (selectedElem.symbol === 'Zn') count = 10;

              const hasUp = count >= boxIdx;
              const hasDown = count >= boxIdx + 5;

              return (
                <div key={boxIdx} className="w-10 h-12 bg-slate-800 border-2 border-gold-500/50 rounded flex items-center justify-center text-sm font-bold text-gold-300 gap-0.5">
                  {hasUp && <span className="text-amber-400">↑</span>}
                  {hasDown && <span className="text-gold-400">↓</span>}
                </div>
              );
            })}
          </div>
          <div className="text-xs text-center text-slate-400">
            Magnetic Moment μ = <span className="text-gold-300 font-mono font-bold">{magneticMoment} BM</span>
          </div>
        </div>

        {/* Solution Colour & Paramagnetism */}
        <div className="flex flex-col justify-between items-center bg-slate-900 p-3 rounded border border-slate-800 text-center">
          <div className="text-xs font-semibold text-slate-400">Aqueous M²⁺ Solution Colour</div>
          <div className="relative w-16 h-20 my-1">
            <svg viewBox="0 0 60 80" className="w-full h-full">
              {/* Beaker outline */}
              <rect x="10" y="10" width="40" height="60" rx="3" fill="none" stroke="#64748b" strokeWidth="3" />
              {/* Solution */}
              <rect
                x="12"
                y="25"
                width="36"
                height="43"
                rx="2"
                fill={selectedElem.solutionColor === 'transparent' ? '#1e293b' : selectedElem.solutionColor}
                opacity={selectedElem.solutionColor === 'transparent' ? 0.3 : 0.85}
              />
              {/* Liquid meniscus */}
              <path d="M 12 25 Q 30 28 48 25" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>
          <div className="text-xs font-bold text-slate-200">
            {selectedElem.unpairedD > 0 ? (
              <span className="text-emerald-400">Paramagnetic (Coloured d-d)</span>
            ) : (
              <span className="text-slate-400">Diamagnetic (Colourless, d¹⁰)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE VISUAL COMPONENT 2: DICHROMATE & PERMANGANATE LAB
// ==========================================
const DichromatePermanganateLab: React.FC = () => {
  const [ph, setPh] = useState<number>(2);
  const [activeReagent, setActiveReagent] = useState<'dichromate' | 'permanganate'>('dichromate');
  const [reducingAgent, setReducingAgent] = useState<'none' | 'Fe2+' | 'KI'>('none');

  const dichromateColor = useMemo(() => {
    if (ph < 7) return '#f97316'; // Orange Cr2O7^2-
    return '#eab308'; // Yellow CrO4^2-
  }, [ph]);

  const permanganateColor = useMemo(() => {
    if (reducingAgent !== 'none') {
      if (ph < 7) return '#f8fafc'; // Clear/pale pink Mn2+
      if (ph === 7) return '#78350f'; // Brown ppt MnO2
      return '#16a34a'; // Green MnO4^2-
    }
    return '#a855f7'; // Purple MnO4-
  }, [ph, reducingAgent]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-white space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
            <span>🧪</span> K₂Cr₂O₇ & KMnO₄ Solution Reactor
          </h3>
          <p className="text-xs text-slate-400">Adjust solution pH and add reducing agents to observe equilibrium shift & redox reactions</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-lg gap-1">
          <button
            onClick={() => { setActiveReagent('dichromate'); setReducingAgent('none'); audioManager.play('tap'); }}
            className={`px-3 py-1 text-xs font-bold rounded ${activeReagent === 'dichromate' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            K₂Cr₂O₇ Lab
          </button>
          <button
            onClick={() => { setActiveReagent('permanganate'); setReducingAgent('none'); audioManager.play('tap'); }}
            className={`px-3 py-1 text-xs font-bold rounded ${activeReagent === 'permanganate' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            KMnO₄ Lab
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Reaction Flask */}
        <div className="flex flex-col items-center justify-center bg-slate-950 p-6 rounded-xl border border-slate-800 min-h-[260px]">
          <div className="relative w-36 h-48">
            <svg viewBox="0 0 100 140" className="w-full h-full">
              {/* Flask body */}
              <path d="M 35 20 L 65 20 L 65 50 L 85 110 A 10 10 0 0 1 75 125 L 25 125 A 10 10 0 0 1 15 110 L 35 50 Z" fill="none" stroke="#94a3b8" strokeWidth="4" />
              {/* Liquid */}
              <path
                d="M 22 90 L 78 90 L 83 112 A 5 5 0 0 1 78 123 L 22 123 A 5 5 0 0 1 17 112 Z"
                fill={activeReagent === 'dichromate' ? dichromateColor : permanganateColor}
                opacity="0.9"
              />
              {/* Meniscus */}
              <ellipse cx="50" cy="90" rx="28" ry="4" fill="#ffffff" opacity="0.3" />
            </svg>
          </div>

          <div className="text-center mt-3">
            <div className="text-sm font-bold text-slate-200">
              {activeReagent === 'dichromate' ? (
                ph < 7 ? <span className="text-orange-400">Orange Dichromate (Cr₂O₇²⁻)</span> : <span className="text-yellow-400">Yellow Chromate (CrO₄²⁻)</span>
              ) : (
                reducingAgent === 'none' ? <span className="text-purple-400">Purple Permanganate (MnO₄⁻)</span> :
                ph < 7 ? <span className="text-slate-200">Colourless Mn²⁺ (Acidic)</span> :
                ph === 7 ? <span className="text-amber-600">Brown Precipitate MnO₂ (Neutral)</span> :
                <span className="text-emerald-400">Green Manganate MnO₄²⁻ (Alkaline)</span>
              )}
            </div>
            <div className="text-xs text-slate-400 mt-1">Current pH: <span className="text-gold-300 font-bold">{ph}</span></div>
          </div>
        </div>

        {/* Interactive Controls & Equations */}
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Solution pH Controller:</span>
              <span className="text-gold-400 font-mono font-bold">pH {ph}</span>
            </label>
            <input
              type="range"
              min="1"
              max="14"
              value={ph}
              onChange={(e) => {
                setPh(parseInt(e.target.value));
                audioManager.play('pop');
              }}
              className="w-full accent-gold-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>pH 1 (Strong Acid)</span>
              <span>pH 7 (Neutral)</span>
              <span>pH 14 (Strong Base)</span>
            </div>
          </div>

          {activeReagent === 'permanganate' && (
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-300">Add Reducing Agent:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => { setReducingAgent('none'); audioManager.play('tap'); }}
                  className={`flex-1 py-1.5 text-xs rounded border ${reducingAgent === 'none' ? 'bg-purple-900/60 border-purple-500 text-purple-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  None
                </button>
                <button
                  onClick={() => { setReducingAgent('Fe2+'); audioManager.play('chime'); }}
                  className={`flex-1 py-1.5 text-xs rounded border ${reducingAgent === 'Fe2+' ? 'bg-gold-900/60 border-gold-500 text-gold-200' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  + Fe²⁺ Ion
                </button>
              </div>
            </div>
          )}

          {/* Chemical Equations Box */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1 text-slate-300">
            <div className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider">Governing Equation:</div>
            {activeReagent === 'dichromate' ? (
              <div className="text-amber-300">
                2CrO₄²⁻ (yellow) + 2H⁺ ⇌ Cr₂O₇²⁻ (orange) + H₂O
              </div>
            ) : (
              <div className="text-purple-300">
                {ph < 7 && 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (E° = +1.51V)'}
                {ph === 7 && 'MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ (s) + 4OH⁻'}
                {ph > 7 && 'MnO₄⁻ + e⁻ → MnO₄²⁻ (green manganate)'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE VISUAL COMPONENT 3: f-BLOCK CONTRACTION
// ==========================================
const FBlockContractionVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lanthanoid' | 'actinoid'>('lanthanoid');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-white space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <span>🌌</span> f-Block Contraction & Orbital Shielding Visualizer
          </h3>
          <p className="text-xs text-slate-400">Compare 4f (Lanthanoid) vs 5f (Actinoid) inner transition series</p>
        </div>
        <div className="flex bg-slate-800 p-1 rounded-lg gap-1">
          <button
            onClick={() => { setActiveTab('lanthanoid'); audioManager.play('tap'); }}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'lanthanoid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            4f Lanthanoids
          </button>
          <button
            onClick={() => { setActiveTab('actinoid'); audioManager.play('tap'); }}
            className={`px-3 py-1 text-xs font-bold rounded ${activeTab === 'actinoid' ? 'bg-gold-600 text-white' : 'text-slate-400 hover:text-white'}`}
          >
            5f Actinoids
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Graph of Contraction */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-300 mb-2">
            {activeTab === 'lanthanoid' ? 'Lanthanoid Contraction (Ln³⁺ Radii pm)' : 'Actinoid Contraction (An³⁺ Radii pm)'}
          </div>
          <div className="relative w-full h-48">
            <svg viewBox="0 0 300 150" className="w-full h-full">
              {/* Axes */}
              <line x1="40" y1="20" x2="40" y2="130" stroke="#475569" strokeWidth="2" />
              <line x1="40" y1="130" x2="280" y2="130" stroke="#475569" strokeWidth="2" />
              <text x="15" y="75" fill="#94a3b8" fontSize="10" transform="rotate(-90 20,75)">Radius (pm)</text>
              <text x="150" y="145" fill="#94a3b8" fontSize="10">Atomic Number Z →</text>

              {/* Curve */}
              {activeTab === 'lanthanoid' ? (
                <path d="M 50 30 Q 150 70 270 110" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
              ) : (
                <path d="M 50 25 Q 160 80 270 120" fill="none" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
              )}

              {/* Data points */}
              {activeTab === 'lanthanoid' ? (
                <>
                  <circle cx="50" cy="30" r="5" fill="#34d399" />
                  <text x="50" y="20" fill="#a7f3d0" fontSize="9">La³⁺ (106pm)</text>
                  <circle cx="270" cy="110" r="5" fill="#34d399" />
                  <text x="240" y="100" fill="#a7f3d0" fontSize="9">Lu³⁺ (86pm)</text>
                </>
              ) : (
                <>
                  <circle cx="50" cy="25" r="5" fill="#22d3ee" />
                  <text x="50" y="15" fill="#cff4fc" fontSize="9">Ac³⁺ (111pm)</text>
                  <circle cx="270" cy="120" r="5" fill="#22d3ee" />
                  <text x="240" y="110" fill="#cff4fc" fontSize="9">Lr³⁺ (88pm)</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Consequences & Indian Context Box */}
        <div className="space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="font-bold text-sm text-gold-300">
            {activeTab === 'lanthanoid' ? 'Consequences of Lanthanoid Contraction' : 'Key Actinoid Properties & Applications'}
          </div>
          {activeTab === 'lanthanoid' ? (
            <ul className="space-y-2 text-slate-300 list-disc pl-4">
              <li><strong className="text-white">Identical Pair Sizes:</strong> Zr (160pm) & Hf (159pm), Nb & Ta have nearly identical radii, making separation extremely difficult.</li>
              <li><strong className="text-white">Basic Character Trend:</strong> La(OH)₃ is most basic, Lu(OH)₃ is least basic as covalent character increases.</li>
              <li><strong className="text-white">Indian Resource:</strong> Mined from Monazite sands along Kerala, Tamil Nadu & Odisha coastlines.</li>
            </ul>
          ) : (
            <ul className="space-y-2 text-slate-300 list-disc pl-4">
              <li><strong className="text-white">Broad Oxidation States:</strong> Early actinoids reach up to +7 (U: +6 in UF₆, Pu: +7).</li>
              <li><strong className="text-white">Radioactivity:</strong> All actinoids are radioactive; elements beyond U are synthetic.</li>
              <li><strong className="text-white">Indian Context:</strong> Uranium mined at Jaduguda (Jharkhand); fuels reactors at Tarapur, Kalpakkam & Kudankulam.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE VISUAL COMPONENT 4: COORDINATION SPHERE & IUPAC
// ==========================================
const CoordinationSphereVisualizer: React.FC = () => {
  const [metal, setMetal] = useState<'Co3+' | 'Fe3+' | 'Pt2+'>('Co3+');
  const [ligandType, setLigandType] = useState<'NH3' | 'en' | 'CN-'>('NH3');

  const formulaInfo = useMemo(() => {
    if (metal === 'Co3+') {
      if (ligandType === 'NH3') return { formula: '[Co(NH₃)₆]Cl₃', name: 'Hexaamminecobalt(III) chloride', cn: 6, ox: 3 };
      if (ligandType === 'en') return { formula: '[Co(en)₃]Cl₃', name: 'Tris(ethane-1,2-diamine)cobalt(III) chloride', cn: 6, ox: 3 };
      return { formula: 'K₃[Co(CN)₆]', name: 'Potassium hexacyanocobaltate(III)', cn: 6, ox: 3 };
    } else if (metal === 'Fe3+') {
      if (ligandType === 'CN-') return { formula: 'K₃[Fe(CN)₆]', name: 'Potassium hexacyanoferrate(III)', cn: 6, ox: 3 };
      return { formula: '[Fe(H₂O)₆]Cl₃', name: 'Hexaaquairon(III) chloride', cn: 6, ox: 3 };
    } else {
      return { formula: '[Pt(NH₃)₂Cl₂]', name: 'Diamminedichloroplatinum(II) (Cisplatin)', cn: 4, ox: 2 };
    }
  }, [metal, ligandType]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-white space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-xl font-bold text-gold-400 flex items-center gap-2">
            <span>🧬</span> Coordination Sphere & IUPAC Workbench
          </h3>
          <p className="text-xs text-slate-400">Assemble coordination entities to inspect Werner primary/secondary valencies & systematic nomenclature</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Molecule Diagram */}
        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Outer sphere bracket */}
              <rect x="25" y="25" width="150" height="150" rx="10" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
              {/* Central Metal */}
              <circle cx="100" cy="100" r="22" fill="#0284c7" />
              <text x="100" y="105" textAnchor="middle" fill="#ffffff" fontSize="12" fontStyle="bold">{metal}</text>

              {/* 6 Coordinate Bonds / Ligands */}
              {[0, 60, 120, 180, 240, 300].slice(0, formulaInfo.cn).map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const lx = 100 + 55 * Math.cos(rad);
                const ly = 100 + 55 * Math.sin(rad);
                return (
                  <g key={i}>
                    <line x1="100" y1="100" x2={lx} y2={ly} stroke="#38bdf8" strokeWidth="2.5" />
                    <circle cx={lx} cy={ly} r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                    <text x={lx} y={ly + 4} textAnchor="middle" fill="#a5f3fc" fontSize="9" fontWeight="bold">L</text>
                  </g>
                );
              })}
            </svg>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            Coordination Sphere (Secondary Valence): <span className="text-gold-300 font-bold">{formulaInfo.cn}</span>
          </div>
        </div>

        {/* Controls & Output */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Select Central Metal Ion:</label>
            <div className="flex gap-2">
              {(['Co3+', 'Fe3+', 'Pt2+'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setMetal(m); audioManager.play('tap'); }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded border ${metal === m ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Select Primary Ligand:</label>
            <div className="flex gap-2">
              {(['NH3', 'en', 'CN-'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => { setLigandType(l); audioManager.play('tap'); }}
                  className={`flex-1 py-1.5 text-xs font-bold rounded border ${ligandType === l ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400">Formula:</div>
            <div className="text-base font-mono font-bold text-amber-400">{formulaInfo.formula}</div>
            <div className="text-xs text-slate-400 pt-1">IUPAC Name:</div>
            <div className="text-sm font-semibold text-gold-300">{formulaInfo.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE VISUAL COMPONENT 5: VBT & CFT ORBITAL SPLITTING
// ==========================================
const VBTCFTSplitter: React.FC = () => {
  const [ligandField, setLigandField] = useState<'strong' | 'weak'>('strong');
  const [geometry, setGeometry] = useState<'octahedral' | 'tetrahedral'>('octahedral');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 text-white space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <h3 className="text-xl font-bold text-gold-400 flex items-center gap-2">
            <span>🔮</span> Crystal Field Theory (CFT) Energy Diagram
          </h3>
          <p className="text-xs text-slate-400">Observe d-orbital splitting into t₂g & e_g in Octahedral vs Tetrahedral ligand fields</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setGeometry(g => g === 'octahedral' ? 'tetrahedral' : 'octahedral'); audioManager.play('swoop'); }}
            className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-gold-300 font-bold hover:bg-slate-700"
          >
            Geometry: {geometry.toUpperCase()}
          </button>
          <button
            onClick={() => { setLigandField(f => f === 'strong' ? 'weak' : 'strong'); audioManager.play('pop'); }}
            className={`px-3 py-1 rounded text-xs font-bold border ${ligandField === 'strong' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-amber-600 border-amber-400 text-white'}`}
          >
            {ligandField === 'strong' ? 'Strong Field (CN⁻, NH₃)' : 'Weak Field (F⁻, H₂O)'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Orbital Splitting Diagram SVG */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[240px]">
          <div className="relative w-full h-52">
            <svg viewBox="0 0 280 180" className="w-full h-full">
              {/* Degenerate Free Ion Levels */}
              <text x="30" y="165" fill="#94a3b8" fontSize="10">Free Metal Ion</text>
              {[0, 20, 40, 60, 80].map(x => (
                <rect key={x} x={20 + x} y="90" width="16" height="16" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              ))}

              {/* Splitting Lines */}
              <path d="M 110 98 L 150 50" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
              <path d="M 110 98 L 150 140" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />

              {/* Octahedral or Tetrahedral split */}
              {geometry === 'octahedral' ? (
                <>
                  {/* e_g higher (2 orbitals) */}
                  <text x="210" y="45" fill="#ec4899" fontSize="11" fontWeight="bold">e_g (+0.6 Δₒ)</text>
                  <rect x="160" y="40" width="18" height="18" fill="#ec4899" opacity="0.3" stroke="#ec4899" strokeWidth="2" />
                  <rect x="182" y="40" width="18" height="18" fill="#ec4899" opacity="0.3" stroke="#ec4899" strokeWidth="2" />

                  {/* t_2g lower (3 orbitals) */}
                  <text x="210" y="145" fill="#38bdf8" fontSize="11" fontWeight="bold">t₂g (-0.4 Δₒ)</text>
                  <rect x="150" y="135" width="18" height="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="172" y="135" width="18" height="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="194" y="135" width="18" height="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />

                  {/* Delta_o gap arrow */}
                  <line x1="240" y1="45" x2="240" y2="140" stroke="#a855f7" strokeWidth="2" />
                  <text x="248" y="95" fill="#a855f7" fontSize="12" fontWeight="bold">Δₒ</text>
                </>
              ) : (
                <>
                  {/* t_2 higher (3 orbitals) */}
                  <text x="210" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">t₂ (+0.4 Δₜ)</text>
                  <rect x="150" y="40" width="18" height="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="172" y="40" width="18" height="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />
                  <rect x="194" y="40" width="18" height="18" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="2" />

                  {/* e lower (2 orbitals) */}
                  <text x="210" y="145" fill="#ec4899" fontSize="11" fontWeight="bold">e (-0.6 Δₜ)</text>
                  <rect x="160" y="135" width="18" height="18" fill="#ec4899" opacity="0.3" stroke="#ec4899" strokeWidth="2" />
                  <rect x="182" y="135" width="18" height="18" fill="#ec4899" opacity="0.3" stroke="#ec4899" strokeWidth="2" />

                  {/* Delta_t gap arrow */}
                  <line x1="240" y1="45" x2="240" y2="140" stroke="#a855f7" strokeWidth="2" />
                  <text x="248" y="95" fill="#a855f7" fontSize="12" fontWeight="bold">Δₜ</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Informational Summary */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
          <div className="font-bold text-sm text-purple-300">
            {ligandField === 'strong' ? 'Large Crystal Field Splitting (Δₒ > P)' : 'Small Crystal Field Splitting (Δₒ < P)'}
          </div>
          <p className="text-slate-300">
            {ligandField === 'strong'
              ? 'Strong field ligands force electrons to pair in lower energy orbitals before occupying higher levels, resulting in Low Spin / Diamagnetic complexes.'
              : 'Weak field ligands produce smaller splitting gaps (Δₒ), so electrons spread according to Hund’s rule before pairing, resulting in High Spin / Paramagnetic complexes.'}
          </p>
          <div className="p-2 bg-slate-900 rounded border border-slate-800 font-mono text-[11px] text-gold-300">
            Δₜ ≈ (4/9) Δₒ — Tetrahedral splitting is always smaller than Octahedral!
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Atomic Radius Decreases Continuously Across the 3d Series",
    description: "Students believe that the atomic radii of 3d transition elements decrease steadily from scandium to zinc, just like main group elements across a period.",
    correction: "In the 3d series, atomic radius initially decreases, remains nearly constant in the middle, and slightly increases at the end. The initial decrease occurs due to increasing nuclear charge, which is later counterbalanced by the shielding effect of incoming d-electrons in the middle. At the end of the series, electron-electron repulsions among fully filled d-orbitals exceed nuclear attraction, causing a small increase in size.",
  },
  {
    id: "misc_2",
    title: "3d Electrons Are Removed Before 4s During Ionization",
    description: "Students think that because 3d subshells fill after 4s during ground-state electron configuration, 3d electrons must also be lost first during cation formation.",
    correction: "When transition metals form cations, 4s electrons are always lost before 3d electrons. Once electrons occupy the 3d orbitals, the 3d subshell drops lower in energy than the 4s subshell due to higher effective nuclear charge experienced by inner orbitals. Consequently, 4s electrons become the outermost valence electrons and are ionized first.",
  },
  {
    id: "misc_3",
    title: "All Transition Metals Attain Maximum Oxidation States Equal to Valence Electrons",
    description: "Students assume every 3d element can lose all its (n-1)d and ns electrons to show a maximum oxidation state equal to the sum of these electrons.",
    correction: "Only elements up to manganese show maximum oxidation states equal to the total number of 4s and 3d electrons, such as Mn showing +7. Beyond manganese, d-electrons pair up and become strongly bound to the nucleus, drastically increasing the energy required to involve them in bonding. As a result, elements like iron (+6 max, rarely) and nickel (+2, +4 max) cannot lose all valence electrons.",
  },
  {
    id: "misc_4",
    title: "Catalytic Activity is Solely Due to High Surface Area",
    description: "Students often assume that transition metals act as catalysts purely by providing a finely divided solid surface for physical adsorption of reactants.",
    correction: "While high surface area helps, the primary chemical reason for catalytic activity is the ability of transition elements to show variable oxidation states. This allows them to form unstable, reactive intermediate compounds with reactants, creating a reaction pathway with lower activation energy. Additionally, their partially filled d-orbitals facilitate electron transfer and temporary bond formation with reactant molecules.",
  },
  {
    id: "misc_5",
    title: "Third Ionization Energy Increases Smoothly Across the Series",
    description: "Students believe that successive ionization energies, such as the third ionization energy, increase uniformly from left to right from Sc to Zn.",
    correction: "The third ionization energy shows sharp irregularities across the series due to the extra thermodynamic stability associated with empty, half-filled, and fully-filled d-subshells. For example, manganese has an exceptionally high third ionization energy because removing a third electron requires breaking a stable, half-filled d5 configuration (Mn2+ to Mn3+). Similarly, zinc exhibits extremely high third ionization energy because it requires disrupting a stable, fully-filled d10 configuration.",
  },
];

export default function C12_ChemistryTransitionmetalstrendsSim() {
  // App Modes
  const [tabMode, setTabMode] = useState<'discovery' | 'learn' | 'lab' | 'challenge' | 'summary'>('discovery');
  const [labTab, setLabTab] = useState<'trends' | 'dichromate' | 'fblock' | 'coordination' | 'cft'>('trends');

  // Interactive Selected States
  const [selectedElem, setSelectedElem] = useState<Element3D>(THREE_D_ELEMENTS[4]); // Mn default
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Scoring & BKT Mastery System
  const [score, setScore] = useState<number>(0);
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // UI Animations & Feedback
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');

  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Auto-Hint Timer (10s inactivity)
  useEffect(() => {
    if (tabMode === 'challenge' && !isAnswered) {
      const timer = setTimeout(() => {
        setShowHint(true);
        audioManager.play('hint');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [tabMode, currentChallengeIndex, isAnswered]);

  // Handler for Discovery Question
  const handleDiscoverySubmit = (idx: number) => {
    if (idx === DISCOVERY_QUESTION.correctAnswer) {
      audioManager.play('celebration');
      speechManager.speak("Excellent intuition! Unpaired d-electrons in Cu2+ allow d-d light absorption, while Zn2+ has a completely filled d10 shell.");
      speechManager.speak('Great job! Keep going.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTabMode('learn');
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. Consider the d-electron configurations of Cu2+ vs Zn2+.");
    }
  };

  // Handler for Challenge Submission
  const handleChallengeAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentChallenge.correctAnswer;
    const activeNode = currentChallenge.nodeId;

    // Update BKT & SRS
    const updatedBKT = bktUpdate(bktStates[activeNode], isCorrect);
        const _reviewItem = createReviewItem('C12_ChemistryTransit', 'Chemistry');
        sm2Update(_reviewItem, 4, 0);
    setBktStates(prev => ({ ...prev, [activeNode]: updatedBKT }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak("Correct reasoning! Outstanding work.");
      setScore(s => s + 10);
      setShowSparkle(true);
      setShowSuccess(true);
      setFeedbackText("Correct! " + currentChallenge.explanation);
      setTimeout(() => {
        setShowSparkle(false);
        setShowSuccess(false);
      }, 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Let's review the chemical rule behind this concept.");
      setFeedbackText("Incorrect. " + currentChallenge.explanation);
    }
  };

  const handleNextChallenge = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(i => i + 1);
      audioManager.play('whoosh');
    } else {
      // Save game score & complete
      recordGameScore(Object.values(ALL_NODE_IDS), score);
      setTabMode('summary');
      audioManager.play('celebration');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center">
      {/* Top Header & Navigation */}
      <header className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-2.5 py-1 rounded-full border border-gold-500/30">ISC Class 12 Chemistry</span>
            <span className="text-xs text-slate-400">c12_chem_051 - c12_chem_060</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{SCENARIO.title}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{SCENARIO.subtitle}</p>
        </div>

        {/* Tab Switcher */}
        <nav className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1 overflow-x-auto max-w-full">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'learn', label: '2. Concepts' },
            { id: 'lab', label: '3. Visual Lab' },
            { id: 'challenge', label: '4. Challenges' },
            { id: 'summary', label: '5. Mastery' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => { setTabMode(t.id as any); audioManager.play('tap'); }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                tabMode === t.id
                  ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-5xl space-y-6">
        {/* ================= MODE 1: DISCOVERY ================= */}
        {tabMode === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="bg-gold-950/40 border border-gold-800/50 rounded-xl p-4 text-gold-200 text-sm">
              <span className="font-bold text-gold-300">Predict Before You Learn:</span> {SCENARIO.description}
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h2>
              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className="text-left p-4 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 hover:border-gold-500/50 transition-all text-sm text-slate-200 flex items-center gap-3"
                  >
                    <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-gold-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= MODE 2: TEACHING SLIDES ================= */}
        {tabMode === 'learn' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Slide Navigation Header */}
            <div className="flex justify-between items-center bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400">
                Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}: <span className="text-gold-400">{currentSlide.title}</span>
              </span>
              <div className="flex gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => { setCurrentSlideIndex(i => i - 1); audioManager.play('pop'); }}
                  className="px-3 py-1 text-xs font-bold rounded bg-slate-800 disabled:opacity-40 text-slate-300"
                >
                  Previous
                </button>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => { setCurrentSlideIndex(i => i + 1); audioManager.play('pop'); }}
                  className="px-3 py-1 text-xs font-bold rounded bg-gold-600 text-white disabled:opacity-40"
                >
                  Next Slide
                </button>
              </div>
            </div>

            {/* Slide Visual Content Switcher */}
            {currentSlide.visualType === 'd-trends' && <DBlockTrendsVisualizer selectedElem={selectedElem} onSelect={setSelectedElem} />}
            {currentSlide.visualType === 'dichromate' && <DichromatePermanganateLab />}
            {currentSlide.visualType === 'permanganate' && <DichromatePermanganateLab />}
            {currentSlide.visualType === 'f-block' && <FBlockContractionVisualizer />}
            {currentSlide.visualType === 'vbt-cft' && <VBTCFTSplitter />}

            {/* Concept Explanation Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-slate-800 text-gold-300 px-2 py-0.5 rounded border border-slate-700">{currentSlide.nodeId}</span>
                <h3 className="text-lg font-bold text-white">{currentSlide.subtitle}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{currentSlide.content}</p>
              <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-lg text-xs text-amber-300 font-semibold">
                💡 Key Exam Takeaway: {currentSlide.keyTakeaway}
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= MODE 3: VISUAL LAB WORKBENCH ================= */}
        {tabMode === 'lab' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Lab Sub-tabs */}
            <div className="flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 gap-1 overflow-x-auto">
              {[
                { id: 'trends', label: '3d Trends' },
                { id: 'dichromate', label: 'Cr₂O₇²⁻ & MnO₄⁻' },
                { id: 'fblock', label: 'f-Block (Ln & An)' },
                { id: 'coordination', label: 'Coordination & IUPAC' },
                { id: 'cft', label: 'VBT & CFT Splitting' },
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => { setLabTab(sub.id as any); audioManager.play('tap'); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg ${labTab === sub.id ? 'bg-gold-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* Active Interactive Visual Lab */}
            {labTab === 'trends' && <DBlockTrendsVisualizer selectedElem={selectedElem} onSelect={setSelectedElem} />}
            {labTab === 'dichromate' && <DichromatePermanganateLab />}
            {labTab === 'fblock' && <FBlockContractionVisualizer />}
            {labTab === 'coordination' && <CoordinationSphereVisualizer />}
            {labTab === 'cft' && <VBTCFTSplitter />}
          </motion.div>
        )}

        {/* ================= MODE 4: ADAPTIVE CHALLENGES ================= */}
        {tabMode === 'challenge' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-gold-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{currentChallenge.nodeId}</span>
                <h3 className="text-lg font-bold text-white mt-1">{currentChallenge.title}</h3>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Question {currentChallengeIndex + 1} / {CHALLENGES.length}
              </div>
            </div>

            {/* Question Text */}
            <p className="text-base text-slate-200 font-medium">{currentChallenge.question}</p>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentChallenge.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800';
                if (isAnswered) {
                  if (idx === currentChallenge.correctAnswer) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  else if (selectedAnswer === idx) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleChallengeAnswer(idx)}
                    className={`text-left p-4 rounded-xl border transition-all text-sm flex items-center justify-between ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-gold-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Hint & Feedback Overlay */}
            <HintBubble show={showHint && !isAnswered} text={currentChallenge.hint} />

            {isAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-xl border text-sm ${selectedAnswer === currentChallenge.correctAnswer ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200' : 'bg-rose-950/50 border-rose-800 text-rose-200'}`}>
                {feedbackText}
              </motion.div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <div className="flex justify-end">
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-gold-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-gold-500/20 hover:bg-gold-400"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Mastery →'}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ================= MODE 5: MASTERY SUMMARY ================= */}
        {tabMode === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6 text-center">
            <div className="inline-block p-4 rounded-full bg-gold-500/10 border border-gold-500/30 text-4xl mb-2">🏆</div>
            <h2 className="text-2xl font-extrabold text-white">Transition & Coordination Chemistry Mastered!</h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              You have successfully completed all ISC Class 12 concepts, ranging from 3d trends and dichromate/permanganate redox reactions to f-block contractions, IUPAC nomenclature, VBT hybridisation, and CFT splitting.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left my-4">
              {ALL_NODE_IDS.map(nId => {
                const bState = bktStates[nId];
                const mastery = getMasteryLevel(bState);
                return (
                  <div key={nId} className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                    <div className="font-mono text-gold-400 font-bold">{nId}</div>
                    <div className="text-slate-300 mt-1 capitalize">{mastery} Mastery</div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => { setTabMode('discovery'); setCurrentChallengeIndex(0); setScore(0); audioManager.play('chime'); }}
              className="px-6 py-3 bg-gold-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-gold-500/20 hover:bg-gold-400"
            >
              Restart Laboratory Simulation 🔄
            </button>
          </motion.div>
        )}
      </main>

      {/* Visual Feedback FX */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      {/* Misconception Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800 mt-6">
        <h3 className="text-sm font-bold text-amber-300">Common Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS_CHECKLIST.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}