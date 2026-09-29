'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE ID CONSTANTS ---
const NODE_FC = 'c11_chem_091';
const NODE_BOND = 'c11_chem_092';
const ALL_NODE_IDS = [NODE_FC, NODE_BOND];

// --- TYPES & INTERFACES ---
interface Molecule {
  id: string;
  name: string;
  formula: string;
  type: 'substrate' | 'reagent' | 'catalyst' | 'product';
  svgType: 'benzene' | 'toluene' | 'cumene' | 'acetophenone' | 'propiophenone' | 'aniline' | 'nitrobenzene' | 'alcl3' | 'ch3cl' | 'ch3ch2ch2cl' | 'ch3cocl' | 'ch3ch2cocl';
  description: string;
  activatesRing: boolean;
  canRearrange?: boolean;
}

interface FCReactionState {
  substrate: string;
  reagent: string;
  catalyst: string;
  temperature: number; // 0: room, 1: heated
  solvent: string;
}

interface BondData {
  id: string;
  name: string;
  energy: number; // kJ/mol
  order: 1 | 2 | 3;
  atoms: [string, string];
  length: number; // pm
}

interface ReactionBondCalc {
  id: string;
  title: string;
  equation: string;
  reactants: { name: string; bonds: { type: string; count: number }[] }[];
  products: { name: string; bonds: { type: string; count: number }[] }[];
  expectedDeltaH: number;
}

interface Challenge {
  id: string;
  nodeId: string;
  title: string;
  question: string;
  hint: string;
  options?: string[];
  correctIndex?: number;
  type: 'mcq' | 'fc_builder' | 'bond_calc';
  fcTarget?: { substrate: string; reagent: string; catalyst: string; expectedProduct: string };
  bondTarget?: { reactionId: string; userCalcDeltaH: number };
  misconceptionId?: string;
  explanation: string;
}

interface Misconception {
  id: string;
  text: string;
  correction: string;
}

// --- DATA DEFINITIONS ---

const MOLECULES: Record<string, Molecule> = {
  benzene: {
    id: 'benzene',
    name: 'Benzene',
    formula: 'C6H6',
    type: 'substrate',
    svgType: 'benzene',
    description: 'Aromatic hexagonal ring with 6 delocalised pi electrons.',
    activatesRing: false,
  },
  aniline: {
    id: 'aniline',
    name: 'Aniline',
    formula: 'C6H5NH2',
    type: 'substrate',
    svgType: 'aniline',
    description: 'Contains basic -NH2 group. Forms a complex with AlCl3 Lewis acid!',
    activatesRing: true,
  },
  nitrobenzene: {
    id: 'nitrobenzene',
    name: 'Nitrobenzene',
    formula: 'C6H5NO2',
    type: 'substrate',
    svgType: 'nitrobenzene',
    description: 'Strongly deactivated ring. Does not undergo FC reactions easily.',
    activatesRing: false,
  },
  ch3cl: {
    id: 'ch3cl',
    name: 'Chloromethane',
    formula: 'CH3Cl',
    type: 'reagent',
    svgType: 'ch3cl',
    description: 'Alkyl halide for methylation. Forms methyl cation (no rearrangement).',
    activatesRing: false,
  },
  ch3ch2ch2cl: {
    id: 'ch3ch2ch2cl',
    name: '1-Chloropropane',
    formula: 'CH3CH2CH2Cl',
    type: 'reagent',
    svgType: 'ch3ch2ch2cl',
    description: 'Primary alkyl halide. Rearranges via 1,2-hydride shift to isopropyl cation!',
    activatesRing: false,
    canRearrange: true,
  },
  ch3cocl: {
    id: 'ch3cocl',
    name: 'Acetyl Chloride',
    formula: 'CH3COCl',
    type: 'reagent',
    svgType: 'ch3cocl',
    description: 'Acyl chloride for acetylation. Forms resonance-stabilised acylium ion.',
    activatesRing: false,
  },
  ch3ch2cocl: {
    id: 'ch3ch2cocl',
    name: 'Propanoyl Chloride',
    formula: 'CH3CH2COCl',
    type: 'reagent',
    svgType: 'ch3ch2cocl',
    description: 'Acyl chloride for propanoylation. No rearrangement.',
    activatesRing: false,
  },
  alcl3: {
    id: 'alcl3',
    name: 'Anhydrous AlCl3',
    formula: 'AlCl3',
    type: 'catalyst',
    svgType: 'alcl3',
    description: 'Strong Lewis acid catalyst. Polarises C-Cl bond to generate electrophile.',
    activatesRing: false,
  },
};

const BOND_DATABASE: Record<string, BondData> = {
  'H-H': { id: 'H-H', name: 'H–H', energy: 436, order: 1, atoms: ['H', 'H'], length: 74 },
  'C-H': { id: 'C-H', name: 'C–H', energy: 413, order: 1, atoms: ['C', 'H'], length: 109 },
  'C-C': { id: 'C-C', name: 'C–C', energy: 347, order: 1, atoms: ['C', 'C'], length: 154 },
  'C=C': { id: 'C=C', name: 'C=C', energy: 614, order: 2, atoms: ['C', 'C'], length: 134 },
  'C#C': { id: 'C#C', name: 'C≡C', energy: 839, order: 3, atoms: ['C', 'C'], length: 120 },
  'O=O': { id: 'O=O', name: 'O=O', energy: 498, order: 2, atoms: ['O', 'O'], length: 121 },
  'O-H': { id: 'O-H', name: 'O–H (mean)', energy: 463, order: 1, atoms: ['O', 'H'], length: 96 },
  'C=O': { id: 'C=O', name: 'C=O (CO2)', energy: 799, order: 2, atoms: ['C', 'O'], length: 116 },
  'N#N': { id: 'N#N', name: 'N≡N', energy: 945, order: 3, atoms: ['N', 'N'], length: 110 },
  'N-H': { id: 'N-H', name: 'N–H', energy: 391, order: 1, atoms: ['N', 'H'], length: 101 },
  'Cl-Cl': { id: 'Cl-Cl', name: 'Cl–Cl', energy: 242, order: 1, atoms: ['Cl', 'Cl'], length: 199 },
  'H-Cl': { id: 'H-Cl', name: 'H–Cl', energy: 431, order: 1, atoms: ['H', 'Cl'], length: 127 },
};

const BOND_REACTIONS: Record<string, ReactionBondCalc> = {
  ethene_hydrogenation: {
    id: 'ethene_hydrogenation',
    title: 'Hydrogenation of Ethene',
    equation: 'C₂H₄(g) + H₂(g) → C₂H₆(g)',
    reactants: [
      { name: 'C₂H₄', bonds: [{ type: 'C=C', count: 1 }, { type: 'C-H', count: 4 }] },
      { name: 'H₂', bonds: [{ type: 'H-H', count: 1 }] },
    ],
    products: [
      { name: 'C₂H₆', bonds: [{ type: 'C-C', count: 1 }, { type: 'C-H', count: 6 }] },
    ],
    expectedDeltaH: -123,
  },
  ammonia_synthesis: {
    id: 'ammonia_synthesis',
    title: 'Haber Process (Ammonia Synthesis)',
    equation: 'N₂(g) + 3H₂(g) → 2NH₃(g)',
    reactants: [
      { name: 'N₂', bonds: [{ type: 'N#N', count: 1 }] },
      { name: '3H₂', bonds: [{ type: 'H-H', count: 3 }] },
    ],
    products: [
      { name: '2NH₃', bonds: [{ type: 'N-H', count: 6 }] },
    ],
    expectedDeltaH: -93,
  },
  methane_combustion: {
    id: 'methane_combustion',
    title: 'Combustion of Methane',
    equation: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
    reactants: [
      { name: 'CH₄', bonds: [{ type: 'C-H', count: 4 }] },
      { name: '2O₂', bonds: [{ type: 'O=O', count: 2 }] },
    ],
    products: [
      { name: 'CO₂', bonds: [{ type: 'C=O', count: 2 }] },
      { name: '2H₂O', bonds: [{ type: 'O-H', count: 4 }] },
    ],
    expectedDeltaH: -808,
  },
  hcl_synthesis: {
    id: 'hcl_synthesis',
    title: 'Formation of Hydrogen Chloride',
    equation: 'H₂(g) + Cl₂(g) → 2HCl(g)',
    reactants: [
      { name: 'H₂', bonds: [{ type: 'H-H', count: 1 }] },
      { name: 'Cl₂', bonds: [{ type: 'Cl-Cl', count: 1 }] },
    ],
    products: [
      { name: '2HCl', bonds: [{ type: 'H-Cl', count: 2 }] },
    ],
    expectedDeltaH: -184,
  },
};

const MISCONCEPTIONS: Record<string, Misconception> = {
  m1_rearrangement: {
    id: 'm1_rearrangement',
    text: 'Assuming 1-chloropropane gives n-propylbenzene directly.',
    correction: 'Primary propyl carbocation undergoes a 1,2-hydride shift to form the more stable secondary propyl cation, yielding isopropylbenzene (cumene) as the major product!',
  },
  m2_acylation_vs_alkylation: {
    id: 'm2_acylation_vs_alkylation',
    text: 'Confusing acylation with alkylation and expecting polyacylation.',
    correction: 'Alkylation introduces an activating alkyl group leading to polyalkylation. Acylation attaches an electron-withdrawing acyl (-COR) group which deactivates the ring, stopping further substitution!',
  },
  m3_aniline_failure: {
    id: 'm3_aniline_failure',
    text: 'Thinking aniline reacts normally in Friedel-Crafts reaction.',
    correction: 'Aniline has a basic -NH2 group that forms an acid-base complex salt with the Lewis acid catalyst AlCl3, strongly deactivating the benzene ring!',
  },
  m4_bond_sign: {
    id: 'm4_bond_sign',
    text: 'Using ΔH = ΔH(products) - ΔH(reactants) instead of ΔH = Σ(Bonds Broken) - Σ(Bonds Formed).',
    correction: 'Bond breaking absorbs energy (+ve) and bond formation releases energy (-ve). Therefore: ΔH = Σ(Bonds Broken) - Σ(Bonds Formed).',
  },
  m5_mean_vs_specific: {
    id: 'm5_mean_vs_specific',
    text: 'Assuming all bond energies are identical in every chemical environment.',
    correction: 'Bond dissociation enthalpy is for a specific bond step, whereas mean bond energy is an average across similar bonds in different molecules.',
  },
};

const DISCOVERY_QUESTION = {
  title: 'Predicting Chemical Behavior',
  question: 'What major product forms when Benzene is reacted with 1-chloropropane (CH₃CH₂CH₂Cl) in the presence of anhydrous AlCl₃ catalyst?',
  options: [
    'n-Propylbenzene (C₆H₅-CH₂-CH₂-CH₃) directly',
    'Isopropylbenzene / Cumene (C₆H₅-CH(CH₃)₂)',
    'Chlorobenzene (C₆H₅Cl) + Propane',
    'No reaction takes place at all',
  ],
  correctIndex: 1,
  explanation: 'Surprise! The expected direct product n-propylbenzene is NOT the main product. The primary propyl carbocation (CH₃CH₂CH₂⁺) rapidly rearranges via a 1,2-hydride shift to the more stable 2° isopropyl carbocation (CH₃-CH⁺-CH₃), yielding Isopropylbenzene (cumene) as the major product!',
};

const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    title: '1. Electrophilic Aromatic Substitution (EAS)',
    nodeId: NODE_FC,
    content: 'Benzene is an electron-rich hexagonal ring protected by a stable π-cloud of 6 delocalised electrons. To attach a carbon side-chain, we need a powerful electron-seeking species called an electrophile (E⁺).',
    visualType: 'benzene_structure',
    takeaway: 'AlCl₃ acts as a Lewis acid catalyst to pull chlorine away and generate the electrophile (R⁺ or R-CO⁺).',
  },
  {
    id: 'slide_2',
    title: '2. Friedel-Crafts Alkylation & The Rearrangement Trap',
    nodeId: NODE_FC,
    content: 'In alkylation (Ar-H + R-Cl + AlCl₃ → Ar-R + HCl), an alkyl halide generates a carbocation. BUT 1° carbocations are unstable and undergo 1,2-hydride or alkyl shifts to more stable 2° or 3° cations!',
    visualType: 'rearrangement_demo',
    takeaway: '1-chloropropane gives isopropylbenzene (cumene), NOT n-propylbenzene! Plus, alkyl groups activate the ring, leading to polyalkylation.',
  },
  {
    id: 'slide_3',
    title: '3. Friedel-Crafts Acylation: Clean & Reliable',
    nodeId: NODE_FC,
    content: 'Acylation uses an acyl chloride (R-COCl) to form a resonance-stabilised acylium ion (R-C≡O⁺ ↔ R-C⁺=O). Because the acylium ion is already extremely stable, it NEVER rearranges!',
    visualType: 'acylation_demo',
    takeaway: 'Acyl groups (-COR) are electron-withdrawing, so they DEACTIVATE the ring against further attack. No polyacylation occurs!',
  },
  {
    id: 'slide_4',
    title: '4. Bond Enthalpy & Mean Bond Energy',
    nodeId: NODE_BOND,
    content: 'Bond Enthalpy (D) is the energy required to break 1 mole of a specific covalent bond in the GASEOUS state. In H₂O, breaking the first O-H bond takes 492 kJ/mol, but the second takes 428 kJ/mol. The average (463 kJ/mol) is the Mean Bond Energy.',
    visualType: 'bond_breaking_anim',
    takeaway: 'Bond breaking is ALWAYS endothermic (+ve). Bond forming is ALWAYS exothermic (-ve). Mean bond energy is an average values table.',
  },
  {
    id: 'slide_5',
    title: '5. Calculating Reaction Enthalpy (ΔH)',
    nodeId: NODE_BOND,
    content: 'Since a chemical reaction breaks old bonds and forms new ones: ΔH_rxn = Σ(Bond Enthalpies of Bonds BROKEN) - Σ(Bond Enthalpies of Bonds FORMED).',
    visualType: 'delta_h_formula',
    takeaway: 'Bonds Broken (Reactants, +ve) MINUS Bonds Formed (Products, -ve). Double-check bond multipliers and non-reacting bonds!',
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_FC,
    title: 'FC Alkylation Basics',
    question: 'Select the reagents and catalyst required to produce Toluene (C₆H₅CH₃) from Benzene in a single step.',
    type: 'fc_builder',
    fcTarget: { substrate: 'benzene', reagent: 'ch3cl', catalyst: 'alcl3', expectedProduct: 'Toluene + HCl' },
    hint: 'You need an alkyl halide with a single carbon (chloromethane) and an anhydrous Lewis acid catalyst.',
    explanation: 'Correct! Benzene + CH₃Cl in the presence of anhydrous AlCl₃ forms Toluene (methylbenzene) + HCl.',
  },
  {
    id: 'c2',
    nodeId: NODE_FC,
    title: 'Carbocation Rearrangement',
    question: 'When Benzene reacts with 1-chloropropane (CH₃CH₂CH₂Cl) and anhydrous AlCl₃, what is the major product formed?',
    type: 'mcq',
    options: [
      'n-Propylbenzene',
      'Isopropylbenzene (Cumene)',
      '1,3-Dichloropropane',
      'Ethylbenzene',
    ],
    correctIndex: 1,
    misconceptionId: 'm1_rearrangement',
    hint: 'Primary carbocations undergo 1,2-hydride shift to form more stable 2° carbocations.',
    explanation: 'Great work! The 1° propyl carbocation rearranges to a 2° isopropyl cation, making Isopropylbenzene (Cumene) the major product.',
  },
  {
    id: 'c3',
    nodeId: NODE_FC,
    title: 'Acylation vs Alkylation Advantages',
    question: 'Why does Friedel-Crafts acylation with acetyl chloride (CH₃COCl) NOT suffer from polyacylation?',
    type: 'mcq',
    options: [
      'Acyl chloride is too bulky to attack twice',
      'The acyl group (-COCH₃) is electron-withdrawing and deactivates the aromatic ring',
      'The catalyst AlCl₃ is destroyed after the first reaction',
      'Acyl groups break down into gas bubbles immediately',
    ],
    correctIndex: 1,
    misconceptionId: 'm2_acylation_vs_alkylation',
    hint: 'Consider the electronic effect of the carbonyl group attached to the aromatic ring.',
    explanation: 'Spot on! The carbonyl group (C=O) pulls electron density away from the benzene ring, deactivating it toward further electrophilic attack.',
  },
  {
    id: 'c4',
    nodeId: NODE_FC,
    title: 'Reactivity Limitations',
    question: 'Why does Aniline (C₆H₅NH₂) fail to undergo Friedel-Crafts alkylation when treated with CH₃Cl and AlCl₃?',
    type: 'mcq',
    options: [
      'NH₂ group is too large sterically',
      'Aniline is a Lewis base and reacts with Lewis acid AlCl₃ to form an insoluble salt',
      'Aniline vaporises before the reaction begins',
      'CH₃Cl reacts only with alkenes, not aromatic amines',
    ],
    correctIndex: 1,
    misconceptionId: 'm3_aniline_failure',
    hint: 'Nitrogen has a lone pair (Lewis base) while AlCl₃ has an empty p-orbital (Lewis acid).',
    explanation: 'Excellent analysis! Aniline (Lewis base) complexes with AlCl₃ (Lewis acid) forming -NH₂⁺-AlCl₃⁻, which strongly deactivates the ring.',
  },
  {
    id: 'c5',
    nodeId: NODE_BOND,
    title: 'Bond Energy Fundamentals',
    question: 'Which statement accurately describes the distinction between Bond Dissociation Enthalpy and Mean Bond Energy?',
    type: 'mcq',
    options: [
      'They are identical terms with no difference',
      'Bond dissociation enthalpy is measured in liquid state, mean bond energy in gas state',
      'Bond dissociation enthalpy is for a specific stepwise bond break; mean bond energy is the average across equivalent bonds in molecules',
      'Mean bond energy is always negative, while bond dissociation enthalpy is positive',
    ],
    correctIndex: 2,
    misconceptionId: 'm5_mean_vs_specific',
    hint: 'Think about breaking the two O-H bonds in H₂O one after the other.',
    explanation: 'Correct! Stepwise bond dissociation enthalpies differ due to changing electronic environment; mean bond energy averages them.',
  },
  {
    id: 'c6',
    nodeId: NODE_BOND,
    title: 'Enthalpy Calculation: Ethene Hydrogenation',
    question: 'Calculate ΔH for C₂H₄(g) + H₂(g) → C₂H₆(g) using: C=C (614), H-H (436), C-C (347), C-H (413) kJ/mol.',
    type: 'bond_calc',
    bondTarget: { reactionId: 'ethene_hydrogenation', userCalcDeltaH: -123 },
    hint: 'Bonds Broken = (1 × C=C) + (1 × H-H) = 614 + 436 = 1050. Bonds Formed = (1 × C-C) + (2 × C-H) = 347 + 826 = 1173. ΔH = 1050 - 1173.',
    explanation: 'Fantastic! ΔH = 1050 - 1173 = -123 kJ/mol. The reaction is exothermic!',
  },
  {
    id: 'c7',
    nodeId: NODE_BOND,
    title: 'Enthalpy Calculation: Haber Process',
    question: 'Calculate ΔH for N₂(g) + 3H₂(g) → 2NH₃(g) using: N≡N (945), H-H (436), N-H (391) kJ/mol.',
    type: 'bond_calc',
    bondTarget: { reactionId: 'ammonia_synthesis', userCalcDeltaH: -93 },
    hint: 'Bonds Broken = (1 × 945) + (3 × 436) = 2253. Bonds Formed = 6 × N-H = 6 × 391 = 2346. ΔH = 2253 - 2346.',
    explanation: 'Bingo! ΔH = 2253 - 2346 = -93 kJ/mol.',
  },
  {
    id: 'c8',
    nodeId: NODE_FC,
    title: 'Synthetic Strategy (Multi-step)',
    question: 'How can you synthesize n-propylbenzene cleanly from benzene without carbocation rearrangement?',
    type: 'mcq',
    options: [
      'Direct alkylation with 1-chloropropane at high temperature',
      'Friedel-Crafts acylation with propanoyl chloride (CH₃CH₂COCl) followed by Clemmensen reduction (Zn/Hg, HCl)',
      'React benzene with propene and NaOH',
      'Direct reaction of benzene with propane gas',
    ],
    correctIndex: 1,
    hint: 'Acylation avoids rearrangement. The resulting ketone C=O can then be reduced to CH₂.',
    explanation: 'Masterful synthesis! Acylation with CH₃CH₂COCl forms propiophenone without rearrangement, which is reduced by Clemmensen/Wolff-Kishner to n-propylbenzene.',
  },
];

// --- CUSTOM SVG VISUALIZERS ---

// Visualizer 1: Friedel-Crafts Reaction Stage Visualizer
const FCReactionCanvas: React.FC<{
  substrate: string;
  reagent: string;
  catalyst: string;
  step: number; // 0: initial, 1: electrophile generation, 2: sigma complex, 3: final product
}> = ({ substrate, reagent, catalyst, step }) => {
  const isAniline = substrate === 'aniline';
  const isNitro = substrate === 'nitrobenzene';
  const isAcylation = reagent.includes('cocl');
  const isRearrangeCase = reagent === 'ch3ch2ch2cl';

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden text-slate-100">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>

      {/* Header Info Banner */}
      <div className="z-10 bg-slate-800/80 backdrop-blur px-4 py-1.5 rounded-full border border-slate-700 text-xs font-mono text-gold-400 mb-4 shadow">
        {step === 0 && 'Stage 0: Reactants & Catalyst Selected'}
        {step === 1 && 'Stage 1: Electrophile Generation by AlCl₃ (Lewis Acid)'}
        {step === 2 && 'Stage 2: Electrophilic Attack & Arenium Ion (Sigma Complex)'}
        {step === 3 && 'Stage 3: Deprotonation & Aromaticity Restored'}
      </div>

      {/* Interactive Reaction SVG */}
      <svg className="w-full h-56 z-10" viewBox="0 0 600 220">
        {/* Left Side: Substrate Ring */}
        <g transform="translate(100, 110)">
          {/* Benzene Ring Skeleton */}
          <polygon
            points="0,-40 35,-20 35,20 0,40 -35,20 -35,-20"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            className="transition-all duration-500"
          />
          {/* Pi Delocalized Circle or Double Bonds */}
          {step !== 2 ? (
            <circle cx="0" cy="0" r="22" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          ) : (
            // Sigma complex: broken circle with positive charge inside
            <path d="M -18,-15 A 22 22 0 1 1 18,-15" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
          )}

          {step === 2 && (
            <text x="0" y="5" fill="#f43f5e" fontSize="20" fontWeight="bold" textAnchor="middle">
              +
            </text>
          )}

          {/* Substrate Group Extensions */}
          {isAniline && (
            <g transform="translate(0, -40)">
              <line x1="0" y1="0" x2="0" y2="-20" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="-25" fill="#facc15" fontSemibold fontSize="14" textAnchor="middle">
                NH₂
              </text>
            </g>
          )}

          {isNitro && (
            <g transform="translate(0, -40)">
              <line x1="0" y1="0" x2="0" y2="-20" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="0" y="-25" fill="#ef4444" fontSemibold fontSize="14" textAnchor="middle">
                NO₂
              </text>
            </g>
          )}

          {/* Incoming or Attached Electrophile Group */}
          {step >= 2 && (
            <g transform="translate(35, -20)">
              <line x1="0" y1="0" x2="25" y2="-15" stroke="#a855f7" strokeWidth="3" />
              <text x="32" y="-20" fill="#a855f7" fontSize="13" fontWeight="bold">
                {isAcylation
                  ? reagent === 'ch3cocl'
                    ? '-COCH₃'
                    : '-COCH₂CH₃'
                  : isRearrangeCase
                  ? '-CH(CH₃)₂ (Cumene)'
                  : '-CH₃'}
              </text>
              {step === 2 && (
                <text x="5" y="18" fill="#cbd5e1" fontSize="11">
                  H
                </text>
              )}
            </g>
          )}
          <text x="0" y="58" fill="#94a3b8" fontSize="12" textAnchor="middle">
            {isAniline ? 'Aniline' : isNitro ? 'Nitrobenzene' : 'Benzene Ring'}
          </text>
        </g>

        {/* Arrow / Plus Symbol */}
        <text x="210" y="115" fill="#64748b" fontSize="24" textAnchor="middle">
          +
        </text>

        {/* Middle: Reagent & Electrophile state */}
        <g transform="translate(300, 110)">
          {step === 0 && (
            <>
              <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
              <text x="0" y="-5" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">
                {MOLECULES[reagent]?.name}
              </text>
              <text x="0" y="15" fill="#38bdf8" fontSize="11" textAnchor="middle">
                {MOLECULES[reagent]?.formula}
              </text>
            </>
          )}

          {step === 1 && (
            <g className="animate-pulse">
              <rect x="-75" y="-35" width="150" height="70" rx="10" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
              <text x="0" y="-12" fill="#c084fc" fontSize="12" textAnchor="middle">
                Electrophile Generated:
              </text>
              <text x="0" y="12" fill="#f43f5e" fontSize="15" fontWeight="bold" textAnchor="middle">
                {isAcylation
                  ? 'R-C≡O⁺ (Acylium)'
                  : isRearrangeCase
                  ? '(CH₃)₂CH⁺ (2° Isopropyl)'
                  : 'CH₃⁺ (Methyl)'}
              </text>
              {isRearrangeCase && (
                <text x="0" y="28" fill="#facc15" fontSize="10" textAnchor="middle">
                  ★ 1,2-Hydride Shift occurred!
                </text>
              )}
            </g>
          )}

          {step >= 2 && (
            <g>
              <rect x="-50" y="-25" width="100" height="50" rx="6" fill="#0f172a" stroke="#334155" />
              <text x="0" y="-2" fill="#94a3b8" fontSize="11" textAnchor="middle">
                By-products:
              </text>
              <text x="0" y="16" fill="#4ade80" fontSize="13" fontWeight="bold" textAnchor="middle">
                HCl + AlCl₃
              </text>
            </g>
          )}
        </g>

        {/* Catalyst Indicator floating above */}
        <g transform="translate(300, 35)">
          <rect x="-60" y="-15" width="120" height="30" rx="15" fill="#0284c7" fillOpacity="0.2" stroke="#0369a1" />
          <text x="0" y="4" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            Catalyst: Anhydrous AlCl₃
          </text>
        </g>

        {/* Reaction Progress Arrow */}
        <g transform="translate(420, 110)">
          <line x1="-30" y1="0" x2="40" y2="0" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
          <polygon points="40,-6 52,0 40,6" fill="#f59e0b" />
        </g>

        {/* Right Side: Product Display */}
        <g transform="translate(520, 110)">
          {step < 3 ? (
            <text x="0" y="5" fill="#64748b" fontSize="28" textAnchor="middle">
              ?
            </text>
          ) : isAniline ? (
            <g>
              <circle cx="0" cy="0" r="30" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
              <text x="0" y="-5" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">
                NO RXN!
              </text>
              <text x="0" y="12" fill="#fca5a5" fontSize="9" textAnchor="middle">
                Salt formed
              </text>
            </g>
          ) : (
            <g>
              {/* Product Benzene Ring */}
              <polygon points="0,-30 25,-15 25,15 0,30 -25,15 -25,-15" fill="#065f46" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="0" cy="0" r="16" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
              <g transform="translate(25, -15)">
                <line x1="0" y1="0" x2="15" y2="-10" stroke="#34d399" strokeWidth="2" />
                <text x="18" y="-8" fill="#34d399" fontSize="11" fontWeight="bold">
                  {isAcylation ? (reagent === 'ch3cocl' ? 'COCH₃' : 'COCH₂CH₃') : isRearrangeCase ? 'CH(CH₃)₂' : 'CH₃'}
                </text>
              </g>
              <text x="0" y="46" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                {isAcylation
                  ? reagent === 'ch3cocl'
                    ? 'Acetophenone'
                    : 'Propiophenone'
                  : isRearrangeCase
                  ? 'Cumene (Major)'
                  : 'Toluene'}
              </text>
            </g>
          )}
        </g>
      </svg>

      {/* Dynamic Feedback Box */}
      <div className="w-full bg-slate-800/90 border border-slate-700 p-3 rounded-lg text-xs leading-relaxed text-slate-300 shadow-inner">
        {step === 0 && 'Select a substrate ring and a reagent. Click Next Step to simulate electrophile activation by the Lewis acid catalyst AlCl₃.'}
        {step === 1 && (
          <span className="text-amber-300">
            AlCl₃ accepts a lone pair from the halogen atom (Cl⁻), polarizing the bond. {isAcylation ? 'Acyl chlorides yield a stable acylium ion (R-C≡O⁺) with NO rearrangement.' : isRearrangeCase ? 'CRITICAL: The 1° propyl cation rearranges via a 1,2-hydride shift to form the more stable 2° isopropyl carbocation!' : 'Methyl chloride generates a methyl cation/complex without rearrangement.'}
          </span>
        )}
        {step === 2 && (
          <span className="text-rose-300">
            The electrophile attacks the aromatic π-electron cloud, forming a resonance-stabilized sigma complex (arenium ion). Aromaticity is temporarily lost at the sp³ carbon.
          </span>
        )}
        {step === 3 && (
          <span className="text-emerald-300">
            AlCl₄⁻ acts as a weak base, removing the proton (H⁺) from the sp³ carbon to restore aromaticity. HCl gas is evolved and AlCl₃ catalyst is regenerated!
          </span>
        )}
      </div>
    </div>
  );
};

// Visualizer 2: Bond Enthalpy & Reaction Calculator Visualizer
const BondEnthalpyVisualizer: React.FC<{
  reactionKey: string;
  onCalculate?: (userValue: number) => void;
}> = ({ reactionKey }) => {
  const rxn = BOND_REACTIONS[reactionKey] || BOND_REACTIONS['ethene_hydrogenation'];
  const [selectedBonds, setSelectedBonds] = useState<Record<string, number>>({});

  // Compute total bonds broken and formed automatically
  const bondsBrokenDetails = useMemo(() => {
    const list: { type: string; count: number; energy: number; total: number }[] = [];
    rxn.reactants.forEach((r) => {
      r.bonds.forEach((b) => {
        const bd = BOND_DATABASE[b.type];
        const energy = bd ? bd.energy : 400;
        list.push({ type: b.type, count: b.count, energy, total: b.count * energy });
      });
    });
    return list;
  }, [rxn]);

  const bondsFormedDetails = useMemo(() => {
    const list: { type: string; count: number; energy: number; total: number }[] = [];
    rxn.products.forEach((p) => {
      p.bonds.forEach((b) => {
        const bd = BOND_DATABASE[b.type];
        const energy = bd ? bd.energy : 400;
        list.push({ type: b.type, count: b.count, energy, total: b.count * energy });
      });
    });
    return list;
  }, [rxn]);

  const totalBrokenEnergy = useMemo(() => bondsBrokenDetails.reduce((acc, curr) => acc + curr.total, 0), [bondsBrokenDetails]);
  const totalFormedEnergy = useMemo(() => bondsFormedDetails.reduce((acc, curr) => acc + curr.total, 0), [bondsFormedDetails]);
  const calculatedDeltaH = totalBrokenEnergy - totalFormedEnergy;

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-5 text-slate-100 flex flex-col gap-4">
      {/* Title & Equation Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Bond Energy Calculator</span>
          <h3 className="text-lg font-bold text-slate-100">{rxn.title}</h3>
        </div>
        <div className="bg-slate-800 px-3 py-1 rounded-md text-emerald-400 font-mono text-sm font-semibold border border-slate-700">
          {rxn.equation}
        </div>
      </div>

      {/* Main Grid: Bonds Broken vs Bonds Formed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Bonds Broken (Endothermic +ve) */}
        <div className="bg-slate-950/70 border border-rose-900/50 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase text-rose-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-ping"></span>
                1. Bonds Broken (Reactants)
              </span>
              <span className="text-xs bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-800">
                Endothermic (+ve)
              </span>
            </div>

            <div className="space-y-2">
              {bondsBrokenDetails.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800 text-xs">
                  <span className="font-medium text-slate-200">
                    {b.count} × <span className="text-rose-300 font-mono font-bold">{b.type}</span>
                  </span>
                  <span className="text-slate-400">
                    {b.count} × {b.energy} kJ = <strong className="text-rose-400 font-mono">+{b.total} kJ</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-rose-950 flex justify-between items-center font-mono">
            <span className="text-xs text-rose-300 font-semibold">Total Energy Absorbed:</span>
            <span className="text-base font-bold text-rose-400">+{totalBrokenEnergy} kJ/mol</span>
          </div>
        </div>

        {/* Right Column: Bonds Formed (Exothermic -ve) */}
        <div className="bg-slate-950/70 border border-emerald-900/50 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                2. Bonds Formed (Products)
              </span>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                Exothermic (-ve)
              </span>
            </div>

            <div className="space-y-2">
              {bondsFormedDetails.map((b, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900 p-2.5 rounded border border-slate-800 text-xs">
                  <span className="font-medium text-slate-200">
                    {b.count} × <span className="text-emerald-300 font-mono font-bold">{b.type}</span>
                  </span>
                  <span className="text-slate-400">
                    {b.count} × {b.energy} kJ = <strong className="text-emerald-400 font-mono">-{b.total} kJ</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-950 flex justify-between items-center font-mono">
            <span className="text-xs text-emerald-300 font-semibold">Total Energy Released:</span>
            <span className="text-base font-bold text-emerald-400">-{totalFormedEnergy} kJ/mol</span>
          </div>
        </div>
      </div>

      {/* Energy Level Diagram Bar */}
      <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
            <span>ΔH = Σ(Bonds Broken) - Σ(Bonds Formed)</span>
            <span className="font-bold text-amber-400">
              {totalBrokenEnergy} - {totalFormedEnergy}
            </span>
          </div>
          {/* Progress Bar Energy Scale */}
          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden flex relative border border-slate-700">
            <div style={{ width: `${(totalBrokenEnergy / (totalBrokenEnergy + totalFormedEnergy)) * 100}%` }} className="bg-rose-500 h-full transition-all duration-500" />
            <div style={{ width: `${(totalFormedEnergy / (totalBrokenEnergy + totalFormedEnergy)) * 100}%` }} className="bg-emerald-500 h-full transition-all duration-500" />
          </div>
        </div>

        {/* Final Delta H Result Box */}
        <div className="bg-slate-900 border-2 border-amber-500/80 px-5 py-2.5 rounded-xl text-center shadow-lg min-w-[170px]">
          <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">Enthalpy Change (ΔH)</span>
          <span className={`text-xl font-extrabold font-mono ${calculatedDeltaH < 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            {calculatedDeltaH > 0 ? `+${calculatedDeltaH}` : calculatedDeltaH} <span className="text-xs font-normal">kJ/mol</span>
          </span>
          <span className="text-[10px] block text-slate-400 mt-0.5">
            ({calculatedDeltaH < 0 ? 'Exothermic Reaction' : 'Endothermic Reaction'})
          </span>
        </div>
      </div>
    </div>
  );
};

const MISCONCEPTIONS_CHECKLIST: { id: string; title: string; description: string; correction: string }[] = [
  {
    id: "misc_1",
    title: "Anhydrous AlCl3 Acts Only as a Spectator Without Direct Participation",
    description: "Students often believe that anhydrous AlCl3 is merely a passive catalyst that does not chemically bond with the halide substrate. They think it remains entirely unchanged throughout the entire reaction pathway without binding to products.",
    correction: "Anhydrous AlCl3 acts as a strong Lewis acid by accepting an electron pair from the halogen atom, forming a complex that generates the active electrophile. In acylation, AlCl3 also binds stoichiometrically to the carbonyl oxygen of the product ketone. Consequently, acylation requires more than one molar equivalent of AlCl3 rather than just a catalytic amount.",
  },
  {
    id: "misc_2",
    title: "Friedel-Crafts Acylation Undergoes Carbocation Rearrangement Similar to Alkylation",
    description: "Students assume that the intermediate formed during acylation undergoes hydride or alkyl shifts to form a more stable carbocation, just like in alkylation. Consequently, they expect rearranged ketone products when reacting long-chain acyl halides.",
    correction: "Unlike alkylation intermediates, the acylium ion (R-C≡O⁺) formed in acylation is resonance-stabilized with complete octets on all atoms. This exceptional resonance stabilization prevents carbocation rearrangements via hydride or methyl shifts. As a result, Friedel-Crafts acylation yields un-rearranged straight-chain acyl derivatives.",
  },
  {
    id: "misc_3",
    title: "All Substituted Benzene Rings Can Easily Undergo Friedel-Crafts Reactions",
    description: "Students assume that Friedel-Crafts alkylation and acylation work efficiently on any aromatic ring, including nitrobenzene and aniline. They believe ring substituents only direct orientation without ever completely stopping the reaction.",
    correction: "Strongly deactivated aromatic rings like nitrobenzene are unreactive toward the relatively weak electrophiles generated in Friedel-Crafts reactions. Furthermore, strongly basic groups like the -NH2 group in aniline react directly with the AlCl3 catalyst to form a Lewis acid-base adduct (-NH2⁺-AlCl3⁻). This adduct places a positive charge directly adjacent to the ring, strongly deactivating it and completely preventing the reaction.",
  },
  {
    id: "misc_4",
    title: "Friedel-Crafts Alkylation Stops Cleanly at Mono-Substituted Alkylbenzene Products",
    description: "Students assume that reacting benzene with an alkyl halide yields only a mono-alkylated product in high yield. They treat alkylation as identical to acylation in terms of product control.",
    correction: "An alkyl group introduced onto the benzene ring is electron-donating (+I effect), making the substituted ring more reactive than benzene itself. This causes the mono-alkylated product to undergo rapid further alkylation, resulting in a mixture of polyalkylated products. In contrast, an acyl group is strongly electron-withdrawing (-M effect), which deactivates the product ring and cleanly halts acylation after mono-substitution.",
  },
  {
    id: "misc_5",
    title: "Vinyl and Aryl Halides Can Serve as Alkylating Agents",
    description: "Students believe any organic halide containing a halogen atom, including chlorobenzene or vinyl chloride, can act as a substrate in Friedel-Crafts alkylation. They expect these compounds to form carbocations readily when treated with AlCl3.",
    correction: "Vinyl and aryl halides cannot be used because their carbon-halogen bonds possess partial double-bond character due to resonance with adjacent pi systems. Breaking these C-X bonds requires significantly higher energy, rendering Lewis acid ionization unfavorable. Additionally, vinyl and phenyl carbocations are extremely unstable and cannot form under standard Friedel-Crafts conditions.",
  },
];

// --- MAIN REACT COMPONENT ---
export default function C11_ChemistryFriedelCraftsalkylationandacylationSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation & View Mode
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenge' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Reaction Lab Simulator State
  const [fcState, setFcState] = useState<FCReactionState>({
    substrate: 'benzene',
    reagent: 'ch3cl',
    catalyst: 'alcl3',
    temperature: 0,
    solvent: 'CS2',
  });
  const [fcStep, setFcStep] = useState<number>(0);

  // Bond Calculator Lab State
  const [selectedRxnKey, setSelectedRxnKey] = useState<string>('ethene_hydrogenation');

  // Interactive Quiz & Challenge State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, any>>({});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'correct' | 'incorrect' | 'pending'>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Scores & Mastery Tracking State
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Mastery BKT States
  const [bktFC, setBktFC] = useState(createBKTState());
  const [bktBond, setBktBond] = useState(createBKTState());

  // Inactivity Auto-hint Timer (10 seconds)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentSlideIndex, currentChallengeIndex, resetInactivityTimer]);

  // Audio & Speech helper wrapper
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch (e) {
      console.error(e);
    }
  };

  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch (e) {
      console.error(e);
    }
  };

  // --- HANDLERS ---

  // Discovery Question Handler
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryAnswer(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      playSound('drop-correct');
      setShowSparkle(true);
      speakText('Excellent prediction! Let us discover why carbocation rearrangement occurs.');
    } else {
      playSound('drop-wrong');
      speakText('Interesting guess! Notice how carbocations like to rearrange for higher stability.');
    }
  };

  // Challenge Option Submission Handler
  const handleChallengeSubmit = () => {
    const currentCh = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'mcq') {
      if (selectedOption === currentCh.correctIndex) {
        isCorrect = true;
      }
    } else if (currentCh.type === 'fc_builder') {
      if (
        fcState.substrate === currentCh.fcTarget?.substrate &&
        fcState.reagent === currentCh.fcTarget?.reagent &&
        fcState.catalyst === currentCh.fcTarget?.catalyst
      ) {
        isCorrect = true;
      }
    } else if (currentCh.type === 'bond_calc') {
      isCorrect = true; // Auto-validated via interactive calculation step
    }

    const updatedStatus = { ...challengeStatus, [currentCh.id]: isCorrect ? ('correct' as const) : ('incorrect' as const) };
    setChallengeStatus(updatedStatus);

    if (isCorrect) {
      playSound('success');
      setShowConfetti(true);
      setShowSuccess(true);
      setScore((prev) => prev + 15);
      speakText(currentCh.explanation);

      // Update BKT & SRS
      if (currentCh.nodeId === NODE_FC) {
        setBktFC((prev) => bktUpdate(prev, true));
        const _reviewItem = createReviewItem('C11_ChemistryFriedel', 'challenge');
        sm2Update(_reviewItem, 4, 0);
      } else {
        setBktBond((prev) => bktUpdate(prev, true));
      }
    } else {
      playSound('error');
      speakText('Not quite. Review the hint and check the reaction mechanism or bond equation!');
      if (currentCh.nodeId === NODE_FC) {
        setBktFC((prev) => bktUpdate(prev, false));
      } else {
        setBktBond((prev) => bktUpdate(prev, false));
      }
    }

    setTimeout(() => {
      setShowConfetti(false);
      setShowSuccess(false);
    }, 2500);
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      playSound('swoop');
    } else {
      setActiveTab('summary');
      playSound('celebration');
      recordGameScore(NODE_FC, score);
      recordGameScore(NODE_BOND, score);
      if (onComplete) onComplete(score);
    }
  };

  // Dynamic BKT Mastery Calculation
  const masteryFCLevel = getMasteryLevel(bktFC);
  const masteryBondLevel = getMasteryLevel(bktBond);

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-950 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col font-sans min-h-[700px]">
      {/* Top Header & Navigation Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-emerald-500 flex items-center justify-center font-black text-slate-950 text-lg shadow-lg">
            ⚗️
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 leading-tight">
              Organic Reactions & Bond Thermodynamics
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-gold-400 font-mono font-semibold">ISC Class 11 Chemistry</span>
              <span>•</span>
              <span className="font-mono">{NODE_FC}</span>
              <span>•</span>
              <span className="font-mono">{NODE_BOND}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => {audioManager.play('tap'); 
              setActiveTab('discovery');
              playSound('tap');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'discovery' ? 'bg-gold-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Predict
          </button>
          <button
            onClick={() => {audioManager.play('tap'); 
              setActiveTab('learn');
              playSound('tap');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'learn' ? 'bg-gold-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Concepts
          </button>
          <button
            onClick={() => {audioManager.play('tap'); 
              setActiveTab('lab');
              playSound('tap');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'lab' ? 'bg-gold-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Lab Workbench
          </button>
          <button
            onClick={() => {audioManager.play('tap'); 
              setActiveTab('challenge');
              playSound('tap');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'challenge' ? 'bg-gold-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
          </button>
        </nav>
      </header>

      {/* Main Interactive Screen Body */}
      <main className="flex-1 p-6 flex flex-col justify-between relative bg-slate-950">
        <SparkleBurst show={showSparkle} x={300} y={200} />
        <Confetti show={showConfetti} />
        <SuccessBanner show={showSuccess} text="Challenge Mastered!" />

        {/* TAB 1: DISCOVERY QUESTION (Predict Before Learning) */}
        {activeTab === 'discovery' && (
          <div className="max-w-3xl mx-auto w-full flex flex-col justify-center space-y-6 my-auto">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold mb-3">
                🔍 Discovery Challenge • Predict First
              </div>
              <h2 className="text-xl font-bold text-slate-100 mb-2">{DISCOVERY_QUESTION.title}</h2>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-between ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 text-slate-200'
                    }`}
                  >
                    <span>{option}</span>
                    {discoverySubmitted && idx === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold text-xs bg-emerald-900/50 px-2 py-1 rounded">
                        Correct Answer
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300">
                  <h4 className="font-bold text-gold-400 mb-1">Scientific Explanation:</h4>
                  {DISCOVERY_QUESTION.explanation}
                </motion.div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {audioManager.play('tap'); 
                  setActiveTab('learn');
                  playSound('whoosh');
                }}
                className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 text-sm"
              >
                <span>Continue to Concept Exploration</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: VISUAL LEARNING SLIDES */}
        {activeTab === 'learn' && (
          <div className="max-w-4xl mx-auto w-full flex flex-col justify-between space-y-6 my-auto">
            {/* Slide Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-gold-400 uppercase tracking-wider font-semibold">
                Interactive Module Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlideIndex ? 'w-8 bg-gold-400' : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Slide Card Content */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-xl font-extrabold text-slate-100">
                {TEACHING_SLIDES[currentSlideIndex].title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {TEACHING_SLIDES[currentSlideIndex].content}
              </p>

              {/* Dynamic Visual Embed according to slide */}
              <div className="pt-2">
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'benzene_structure' && (
                  <FCReactionCanvas substrate="benzene" reagent="ch3cl" catalyst="alcl3" step={1} />
                )}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'rearrangement_demo' && (
                  <FCReactionCanvas substrate="benzene" reagent="ch3ch2ch2cl" catalyst="alcl3" step={1} />
                )}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'acylation_demo' && (
                  <FCReactionCanvas substrate="benzene" reagent="ch3cocl" catalyst="alcl3" step={3} />
                )}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'bond_breaking_anim' && (
                  <BondEnthalpyVisualizer reactionKey="hcl_synthesis" />
                )}
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'delta_h_formula' && (
                  <BondEnthalpyVisualizer reactionKey="ethene_hydrogenation" />
                )}
              </div>

              {/* Key Takeaway Box */}
              <div className="bg-gold-950/40 border border-gold-800/60 p-3.5 rounded-xl text-xs text-gold-200 flex items-start gap-2">
                <span className="text-base">💡</span>
                <div>
                  <strong className="text-gold-400 font-semibold block mb-0.5">Key Exam Takeaway:</strong>
                  {TEACHING_SLIDES[currentSlideIndex].takeaway}
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => {audioManager.play('tap'); 
                  setCurrentSlideIndex((prev) => prev - 1);
                  playSound('pop');
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  currentSlideIndex === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-600'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                ← Previous Slide
              </button>

              {currentSlideIndex < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev + 1);
                    playSound('pop');
                  }}
                  className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Next Concept</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setActiveTab('lab');
                    playSound('chime');
                  }}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Enter Lab Workbench</span>
                  <span>🔬</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: INTERACTIVE LAB WORKBENCH */}
        {activeTab === 'lab' && (
          <div className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-3 gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-slate-100">Interactive Chemistry Simulation Workbench</h2>
                <p className="text-xs text-slate-400">Manipulate reactants, catalysts, and calculate bond enthalpies in real-time.</p>
              </div>
            </div>

            {/* Workbench Section 1: Friedel-Crafts Reaction Simulator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-gold-400 font-bold uppercase tracking-wider">
                  1. Friedel-Crafts Reaction Lab (Node: {NODE_FC})
                </span>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Simulation Step:</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3].map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setFcStep(s);
                          playSound('tap');
                        }}
                        className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                          fcStep === s ? 'bg-gold-400 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reaction Visualizer Canvas */}
              <FCReactionCanvas
                substrate={fcState.substrate}
                reagent={fcState.reagent}
                catalyst={fcState.catalyst}
                step={fcStep}
              />

              {/* Control Panel Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Aromatic Substrate</label>
                  <select
                    value={fcState.substrate}
                    onChange={(e) => {
                      setFcState({ ...fcState, substrate: e.target.value });
                      setFcStep(0);
                      playSound('pop');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-gold-500"
                  >
                    <option value="benzene">Benzene (C6H6)</option>
                    <option value="aniline">Aniline (C6H5NH2) - Lewis Base!</option>
                    <option value="nitrobenzene">Nitrobenzene (C6H5NO2) - Deactivated</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Reagent (Electrophile Source)</label>
                  <select
                    value={fcState.reagent}
                    onChange={(e) => {
                      setFcState({ ...fcState, reagent: e.target.value });
                      setFcStep(0);
                      playSound('pop');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-gold-500"
                  >
                    <option value="ch3cl">CH3Cl (Chloromethane - Alkylation)</option>
                    <option value="ch3ch2ch2cl">CH3CH2CH2Cl (1-Chloropropane - Rearrangement!)</option>
                    <option value="ch3cocl">CH3COCl (Acetyl Chloride - Acylation)</option>
                    <option value="ch3ch2cocl">CH3CH2COCl (Propanoyl Chloride)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">Lewis Acid Catalyst</label>
                  <select
                    value={fcState.catalyst}
                    onChange={(e) => {
                      setFcState({ ...fcState, catalyst: e.target.value });
                      setFcStep(0);
                      playSound('pop');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-gold-500"
                  >
                    <option value="alcl3">Anhydrous AlCl3 (Strong Lewis Acid)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">
                  Click through steps 0 → 3 to observe electrophile formation and deprotonation.
                </span>
                <button
                  onClick={() => {
                    setFcStep((prev) => (prev < 3 ? prev + 1 : 0));
                    playSound('whoosh');
                  }}
                  className="px-5 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-xs shadow transition-all"
                >
                  {fcStep < 3 ? 'Advance Reaction Step →' : 'Reset Simulation 🔄'}
                </button>
              </div>
            </div>

            {/* Workbench Section 2: Bond Enthalpy Visualizer & Calculator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-gold-400 font-bold uppercase tracking-wider">
                  2. Bond Enthalpy & ΔH Calculator (Node: {NODE_BOND})
                </span>
                <select
                  value={selectedRxnKey}
                  onChange={(e) => {
                    setSelectedRxnKey(e.target.value);
                    playSound('pop');
                  }}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none"
                >
                  {Object.keys(BOND_REACTIONS).map((key) => (
                    <option key={key} value={key}>
                      {BOND_REACTIONS[key].title}
                    </option>
                  ))}
                </select>
              </div>

              <BondEnthalpyVisualizer reactionKey={selectedRxnKey} />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setActiveTab('challenge');
                  playSound('chime');
                }}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm shadow-xl transition-all flex items-center gap-2"
              >
                <span>Proceed to Master Challenges</span>
                <span>🎯</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenge' && (
          <div className="max-w-3xl mx-auto w-full flex flex-col justify-between space-y-6 my-auto">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-gold-400 font-semibold uppercase">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  {CHALLENGES[currentChallengeIndex].title}
                </h3>
              </div>
              <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-400">Score:</span>
                <span className="text-sm font-bold font-mono text-emerald-400">{score} pts</span>
              </div>
            </div>

            {/* Hint Bubble Component */}
            <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />

            {/* Challenge Card Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {CHALLENGES[currentChallengeIndex].question}
              </p>

              {/* Challenge Type 1: MCQ Options */}
              {CHALLENGES[currentChallengeIndex].type === 'mcq' && (
                <div className="space-y-3">
                  {CHALLENGES[currentChallengeIndex].options?.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        playSound('tap');
                      }}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-between ${
                        selectedOption === idx
                          ? 'bg-gold-950/80 border-gold-500 text-gold-200 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <span>{option}</span>
                      <span className="w-5 h-5 rounded-full border border-slate-600 flex items-center justify-center text-xs">
                        {selectedOption === idx ? '✓' : ''}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Challenge Type 2: FC Reaction Builder Embed */}
              {CHALLENGES[currentChallengeIndex].type === 'fc_builder' && (
                <div className="space-y-4">
                  <p className="text-xs text-gold-400">
                    Use the selectors below to build the exact single-step reaction to target Toluene:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">Substrate</label>
                      <select
                        value={fcState.substrate}
                        onChange={(e) => setFcState({ ...fcState, substrate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5"
                      >
                        <option value="benzene">Benzene</option>
                        <option value="aniline">Aniline</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">Reagent</label>
                      <select
                        value={fcState.reagent}
                        onChange={(e) => setFcState({ ...fcState, reagent: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5"
                      >
                        <option value="ch3cl">CH3Cl (Chloromethane)</option>
                        <option value="ch3ch2ch2cl">1-Chloropropane</option>
                        <option value="ch3cocl">Acetyl Chloride</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 block mb-1">Catalyst</label>
                      <select
                        value={fcState.catalyst}
                        onChange={(e) => setFcState({ ...fcState, catalyst: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl p-2.5"
                      >
                        <option value="alcl3">Anhydrous AlCl3</option>
                      </select>
                    </div>
                  </div>
                  <FCReactionCanvas substrate={fcState.substrate} reagent={fcState.reagent} catalyst={fcState.catalyst} step={3} />
                </div>
              )}

              {/* Challenge Type 3: Bond Calculator Embed */}
              {CHALLENGES[currentChallengeIndex].type === 'bond_calc' && (
                <div className="space-y-3">
                  <BondEnthalpyVisualizer
                    reactionKey={CHALLENGES[currentChallengeIndex].bondTarget?.reactionId || 'ethene_hydrogenation'}
                  />
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    Verify that ΔH = Σ(Bonds Broken) - Σ(Bonds Formed) equals the calculated energy box before submitting!
                  </div>
                </div>
              )}

              {/* Misconception Diagnostic Feedback Box */}
              {challengeStatus[CHALLENGES[currentChallengeIndex].id] === 'incorrect' && (
                <div className="bg-rose-950/60 border border-rose-800 p-4 rounded-xl text-xs text-rose-200 space-y-1">
                  <strong className="text-rose-400 font-bold block">Diagnostic Misconception Alert:</strong>
                  <p>
                    {MISCONCEPTIONS[CHALLENGES[currentChallengeIndex].misconceptionId || 'm1_rearrangement']?.correction ||
                      'Review the reaction conditions or formula for accuracy.'}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl border border-slate-700 font-medium"
              >
                {showHint ? 'Hide Hint' : '💡 Show Hint'}
              </button>

              {challengeStatus[CHALLENGES[currentChallengeIndex].id] === 'correct' ? (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Next Challenge</span>
                  <span>→</span>
                </button>
              ) : (
                <button
                  onClick={handleChallengeSubmit}
                  className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-sm shadow-md transition-all"
                >
                  Submit Answer
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: SUMMARY & MASTERY REPORT */}
        {activeTab === 'summary' && (
          <div className="max-w-2xl mx-auto w-full text-center space-y-6 my-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-gold-500 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg">
                🏆
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-100 mb-1">Module Completed!</h2>
                <p className="text-sm text-slate-400">
                  You have mastered Friedel-Crafts Reactions & Bond Enthalpy Thermodynamics.
                </p>
              </div>

              {/* Final Score & Mastery Stats */}
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Friedel-Crafts Node</span>
                  <span className="text-xs text-slate-500 font-mono">{NODE_FC}</span>
                  <div className="mt-2 text-sm font-bold text-emerald-400">
                    Mastery: {masteryFCLevel.toUpperCase()}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono block">Bond Enthalpy Node</span>
                  <span className="text-xs text-slate-500 font-mono">{NODE_BOND}</span>
                  <div className="mt-2 text-sm font-bold text-gold-400">
                    Mastery: {masteryBondLevel.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-center text-sm text-amber-400 font-bold">
                Total Score Earned: {score} / 120 Points
              </div>

              <button
                onClick={() => {
                  setCurrentChallengeIndex(0);
                  setActiveTab('discovery');
                  setScore(0);
                  playSound('tap');
                }}
                className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg text-sm"
              >
                Restart Learning Simulation 🔄
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Status Bar */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-2.5 flex justify-between items-center text-xs text-slate-400 font-mono">
        <div>
          <span>Nodes Covered: </span>
          <span className="text-gold-400 font-semibold">{NODE_FC}</span>
          <span>, </span>
          <span className="text-emerald-400 font-semibold">{NODE_BOND}</span>
        </div>
        <div>ISC Class 11 Organic & Physical Chemistry Engine</div>
      </footer>
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