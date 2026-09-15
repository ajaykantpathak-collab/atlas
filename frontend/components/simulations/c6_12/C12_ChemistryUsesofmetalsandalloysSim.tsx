'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
export const NODE_USES_METALS = 'c12_chem_041';
export const NODE_GROUP_15 = 'c12_chem_042';
export const NODE_NITROGEN_COMPOUNDS = 'c12_chem_043';
export const NODE_PHOSPHORUS_COMPOUNDS = 'c12_chem_044';
export const NODE_GROUP_16 = 'c12_chem_045';
export const NODE_OXYGEN_SULPHUR = 'c12_chem_046';
export const NODE_GROUP_17 = 'c12_chem_047';
export const NODE_CHLORINE_COMPOUNDS = 'c12_chem_048';
export const NODE_GROUP_18 = 'c12_chem_049';
export const NODE_DBLOCK_PROPERTIES = 'c12_chem_050';

export const ALL_NODE_IDS = [
  NODE_USES_METALS,
  NODE_GROUP_15,
  NODE_NITROGEN_COMPOUNDS,
  NODE_PHOSPHORUS_COMPOUNDS,
  NODE_GROUP_16,
  NODE_OXYGEN_SULPHUR,
  NODE_GROUP_17,
  NODE_CHLORINE_COMPOUNDS,
  NODE_GROUP_18,
  NODE_DBLOCK_PROPERTIES,
] as const;

export type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES & INTERFACES
// ==========================================
export interface AlloyData {
  name: string;
  baseMetal: string;
  additives: string;
  composition: string;
  keyProperty: string;
  application: string;
  latticeDistortion: number; // 0 to 1
  color: string;
  additiveColor: string;
}

export interface ElementInfo {
  symbol: string;
  name: string;
  group: number;
  period: number;
  atomicNum: number;
  config: string;
  commonOxStates: string;
  type: 'nonmetal' | 'metalloid' | 'metal' | 'noblegas' | 'transition';
  color: string;
}

export interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  question: string;
  type: 'multiple-choice' | 'interactive-matching' | 'slider-tune' | 'reaction-builder';
  options?: string[];
  correctAnswer: number | string | Record<string, string>;
  explanation: string;
  hint: string;
  misconceptionTarget?: string;
  matchingPairs?: { left: string; right: string }[];
  sliderConfig?: { min: number; max: number; step: number; target: number; unit: string; label: string };
}

export interface TeachingSlide {
  id: string;
  title: string;
  nodeIds: NodeId[];
  summary: string;
  visualType: 'alloy-lattice' | 'p-block-trends' | 'nitrogen-phosphorus' | 'chalcogen-halogen' | 'd-block-lab';
  contentBlocks: {
    heading: string;
    text: string;
    highlight?: string;
  }[];
}

// ==========================================
// DATA DEFINITIONS
// ==========================================
const ALLOYS_DATABASE: AlloyData[] = [
  {
    name: 'Carbon Steel',
    baseMetal: 'Iron (Fe)',
    additives: 'Carbon (C, 0.2% - 2%)',
    composition: 'Fe + C',
    keyProperty: 'High tensile strength & hardness; carbon distorts iron lattice preventing atom slippage.',
    application: 'Bridges, railway tracks, construction beams (e.g. Howrah Bridge)',
    latticeDistortion: 0.45,
    color: '#94a3b8',
    additiveColor: '#1e293b',
  },
  {
    name: 'Stainless Steel',
    baseMetal: 'Iron (Fe)',
    additives: 'Chromium (18%), Nickel (8%)',
    composition: 'Fe + Cr + Ni',
    keyProperty: 'Corrosion resistance; Chromium forms a passive self-healing oxide layer (Cr2O3).',
    application: 'Surgical instruments, cutlery, chemical plant vessels, railway pantry cars',
    latticeDistortion: 0.6,
    color: '#cbd5e1',
    additiveColor: '#38bdf8',
  },
  {
    name: 'Brass',
    baseMetal: 'Copper (Cu)',
    additives: 'Zinc (Zn)',
    composition: 'Cu + Zn',
    keyProperty: 'Harder than Cu, easily machined, attractive golden appearance, low friction.',
    application: 'Water taps, valves, musical instruments (trumpets, saxophones)',
    latticeDistortion: 0.35,
    color: '#facc15',
    additiveColor: '#a1a1aa',
  },
  {
    name: 'Bronze',
    baseMetal: 'Copper (Cu)',
    additives: 'Tin (Sn)',
    composition: 'Cu + Sn',
    keyProperty: 'Extremely hard, highly resistant to seawater corrosion, low friction.',
    application: 'Statues, medals, ship propellers, marine bearings',
    latticeDistortion: 0.5,
    color: '#d97706',
    additiveColor: '#94a3b8',
  },
  {
    name: 'Solder',
    baseMetal: 'Lead (Pb)',
    additives: 'Tin (Sn)',
    composition: 'Pb + Sn (or Sn + Ag + Cu)',
    keyProperty: 'Low melting point (eutectic mixture), excellent electrical joining without melting Cu wires.',
    application: 'Joining electrical components, PCB circuit assembly',
    latticeDistortion: 0.7,
    color: '#64748b',
    additiveColor: '#cbd5e1',
  },
  {
    name: 'Dental Amalgam',
    baseMetal: 'Mercury (Hg)',
    additives: 'Silver (Ag), Tin (Sn)',
    composition: 'Hg + Ag + Sn',
    keyProperty: 'Soft paste initially, sets into a hard durable expansion-resistant solid.',
    application: 'Restorative dental fillings',
    latticeDistortion: 0.8,
    color: '#e2e8f0',
    additiveColor: '#94a3b8',
  },
];

const GROUP_15_ELEMENTS: ElementInfo[] = [
  { symbol: 'N', name: 'Nitrogen', group: 15, period: 2, atomicNum: 7, config: '2s² 2p³', commonOxStates: '-3, +3, +5', type: 'nonmetal', color: '#38bdf8' },
  { symbol: 'P', name: 'Phosphorus', group: 15, period: 3, atomicNum: 15, config: '3s² 3p³', commonOxStates: '-3, +3, +5', type: 'nonmetal', color: '#f87171' },
  { symbol: 'As', name: 'Arsenic', group: 15, period: 4, atomicNum: 33, config: '4s² 4p³', commonOxStates: '+3, +5', type: 'metalloid', color: '#c084fc' },
  { symbol: 'Sb', name: 'Antimony', group: 15, period: 5, atomicNum: 51, config: '5s² 5p³', commonOxStates: '+3, +5', type: 'metalloid', color: '#a78bfa' },
  { symbol: 'Bi', name: 'Bismuth', group: 15, period: 6, atomicNum: 83, config: '6s² 6p³', commonOxStates: '+3 (inert pair makes +5 unstable)', type: 'metal', color: '#cbd5e1' },
];

const D_BLOCK_LAB_IONS = [
  { ion: 'Cu²⁺', config: '3d⁹', colorName: 'Sky Blue', hex: '#38bdf8', splitEnergy: 'Medium', reason: 'd-d transition (3d⁹ has 1 hole/unpaired e⁻)', paramagnetic: true },
  { ion: 'Fe³⁺', config: '3d⁵', colorName: 'Yellowish-Brown', hex: '#d97706', splitEnergy: 'High', reason: 'd-d transition with 5 unpaired electrons (S=5/2)', paramagnetic: true },
  { ion: 'MnO₄⁻ (Mn⁺⁷)', config: '3d⁰', colorName: 'Intense Purple', hex: '#a855f7', splitEnergy: 'N/A', reason: 'Charge-transfer transition from O²⁻ to vacant d-orbitals', paramagnetic: false },
  { ion: 'Zn²⁺', config: '3d¹⁰', colorName: 'Colourless', hex: '#f8fafc', splitEnergy: 'N/A', reason: 'Completely filled d¹⁰ subshell — no d-d transition possible', paramagnetic: false },
  { ion: 'Sc³⁺', config: '3d⁰', colorName: 'Colourless', hex: '#f1f5f9', splitEnergy: 'N/A', reason: 'Completely empty d⁰ subshell — no electrons to excite', paramagnetic: false },
];

// ==========================================
// DISCOVERY & TEACHING CONTENT
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Predict First: Metallurgy & Chemistry',
  question: 'Pure Iron is relatively soft and rusts rapidly in humid weather. Why does adding just 1% Carbon transform it into tough Carbon Steel used for giant bridges?',
  options: [
    'Carbon reacts chemically to form covalent diamond structures throughout the iron.',
    'Small carbon atoms fit into interstitial spaces of the iron crystal lattice, distorting it and preventing layers of metal atoms from sliding.',
    'Carbon coats the outside of the iron wire with an insulating rubber-like layer.',
    'Carbon lowers the density of iron so that gravity pulls less on bridge structures.',
  ],
  correctIndex: 1,
  explanation: 'Spot on! The small carbon atoms lodge in interstitial sites of the iron metallic lattice. This lattice distortion pinches the slip planes, making it much harder for layers of iron atoms to slide past each other, yielding dramatically higher tensile strength and hardness!',
};

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide-1',
    title: '1. Uses of Refined Metals & Engineered Alloys',
    nodeIds: [NODE_USES_METALS],
    summary: 'Purified metals match specific jobs, but when pure metals fall short, we engineer alloys!',
    visualType: 'alloy-lattice',
    contentBlocks: [
      {
        heading: 'Why Alloy Pure Metals?',
        text: 'Pure metals like Iron or Copper are often too soft or easily corroded. An alloy is a homogeneous mixture of a metal with other metals or non-metals. Distorting the regular crystal lattice prevents atomic layers from slipping!',
      },
      {
        heading: 'Key Alloys to Master for ISC Class 12',
        text: '• Steel (Fe + C): Carbon hardens iron.\n• Stainless Steel (Fe + Cr + Ni): Chromium forms a protective self-healing Cr₂O₃ oxide layer.\n• Brass (Cu + Zn): Harder, easy to machine, used in taps and instruments.\n• Bronze (Cu + Sn): Resists seawater corrosion, ideal for marine bearings & statues.\n• Solder (Pb + Sn): Low melting point eutectic alloy for circuit wiring.',
      },
    ],
  },
  {
    id: 'slide-2',
    title: '2. p-Block Group 15: Nitrogen & Phosphorus Families',
    nodeIds: [NODE_GROUP_15, NODE_NITROGEN_COMPOUNDS, NODE_PHOSPHORUS_COMPOUNDS],
    summary: 'Explore trends down Group 15 and contrast inert N₂ with reactive P₄ allotropes.',
    visualType: 'nitrogen-phosphorus',
    contentBlocks: [
      {
        heading: 'The Strong Triple Bond vs P₄ Strain',
        text: 'Dinitrogen (N₂) is chemically inert at room temperature because of its extremely strong N≡N triple bond (bond dissociation enthalpy = 945 kJ/mol!). Phosphorus cannot form strong pπ-pπ triple bonds due to larger atomic size, so it forms P₄ tetrahedra.',
      },
      {
        heading: 'Phosphorus Allotropes & Compounds',
        text: '• White Phosphorus: Discrete P₄ tetrahedra with severe 60° angle strain; ignites spontaneously in air (stored under water!).\n• Red Phosphorus: Polymeric chains of P₄ tetrahedra; non-toxic, stable, used on matchbox striking surfaces.\n• Phosphine (PH₃) & Phosphoric Acid (H₃PO₄): H₃PO₄ is a tribasic acid with 3 ionisable -OH groups.',
      },
      {
        heading: 'Haber & Ostwald Industrial Processes',
        text: '• Haber Process: N₂ + 3H₂ ⇌ 2NH₃ (Finely divided Fe catalyst, Mo promoter, 200 atm, ~450°C).\n• Ostwald Process: NH₃ → NO → NO₂ → HNO₃ (Pt-Rh catalyst at 850°C).',
      },
    ],
  },
  {
    id: 'slide-3',
    title: '3. Group 16 (Chalcogens): Oxygen & Sulphur',
    nodeIds: [NODE_GROUP_16, NODE_OXYGEN_SULPHUR],
    summary: 'Valence ns² np⁴ configuration, ozone oxidation, and H₂SO₄ manufacture via Contact Process.',
    visualType: 'chalcogen-halogen',
    contentBlocks: [
      {
        heading: 'Ozone (O₃) Oxidising Action',
        text: 'Ozone easily decomposes into dioxygen and an atom of highly reactive nascent oxygen: O₃ → O₂ + [O]. This nascent oxygen makes ozone a much stronger oxidising agent than O₂!',
      },
      {
        heading: 'Sulphur Allotropes & Contact Process',
        text: '• Rhombic Sulphur (S₈ crown): Stable below 95.5°C.\n• Monoclinic Sulphur (S₈ needles): Stable above 95.5°C.\n• Contact Process for H₂SO₄: Burning S to SO₂ → Catalytic oxidation 2SO₂ + O₂ ⇌ 2SO₃ (V₂O₅ catalyst at 450°C) → SO₃ absorbed in 98% H₂SO₄ to give Oleum (H₂S₂O₇) → Diluted to H₂SO₄.',
      },
    ],
  },
  {
    id: 'slide-4',
    title: '4. Group 17 (Halogens) & Group 18 (Noble Gases)',
    nodeIds: [NODE_GROUP_17, NODE_CHLORINE_COMPOUNDS, NODE_GROUP_18],
    summary: 'Halogen oxidising power, moist chlorine bleaching, and Xenon fluorides chemistry.',
    visualType: 'chalcogen-halogen',
    contentBlocks: [
      {
        heading: 'Halogen Trends & Bleaching Action',
        text: '• Electronegativity: F > Cl > Br > I. Oxidising power follows F₂ > Cl₂ > Br₂ > I₂.\n• Electron Gain Enthalpy Anomaly: Chlorine has higher electron gain enthalpy than Fluorine because F is so compact that added electrons experience intense interelectronic repulsion!\n• Moist Chlorine Bleach: Cl₂ + H₂O → HCl + HOCl; HOCl → HCl + [O]. Bleaches by oxidation!',
      },
      {
        heading: 'Group 18 Noble Gases & Xenon Compounds',
        text: 'Noble gases have filled ns² np⁶ octets. Xenon forms compounds (XeF₂, XeF₄, XeF₆) because it has lower ionisation enthalpy and vacant 5d orbitals for octet expansion.',
      },
    ],
  },
  {
    id: 'slide-5',
    title: '5. d-Block Transition Elements & General Properties',
    nodeIds: [NODE_DBLOCK_PROPERTIES],
    summary: 'Unravel variable oxidation states, catalytic activity, paramagnetism, and d-d transition colors.',
    visualType: 'd-block-lab',
    contentBlocks: [
      {
        heading: 'd-Block Configuration & Variable Valency',
        text: 'General configuration: (n-1)d¹⁻¹⁰ ns⁰⁻². Because (n-1)d and ns orbital energies are very close, both s and d electrons can participate in bonding, giving variable oxidation states (e.g. Fe²⁺/Fe³⁺, Mn⁺² to Mn⁺⁷).',
      },
      {
        heading: 'Color, Catalysis & Interstitial Compounds',
        text: '• d-d Transitions: Ligands split d-orbitals; light absorption promotes electrons between split levels. Cu²⁺ (3d⁹) is blue; Zn²⁺ (3d¹⁰) and Sc³⁺ (3d⁰) are colourless!\n• Catalysts: V₂O₅ (Contact Process), Fe (Haber Process) rely on variable oxidation states.\n• Alloys & Interstitial Compounds: Small atoms (C, N, H) fit into metal lattice gaps.',
      },
    ],
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    nodeId: NODE_USES_METALS,
    title: 'Distinguishing Copper Alloys',
    subtitle: 'Brass vs Bronze composition',
    question: 'A board examiner question asks: "Identify the main metals in Brass and Bronze, and state why Bronze is preferred for marine ship propellers."',
    type: 'multiple-choice',
    options: [
      'Brass is Cu + Sn; Bronze is Cu + Zn. Brass resists seawater better.',
      'Brass is Cu + Zn; Bronze is Cu + Sn. Bronze is harder and resists seawater corrosion superiorly.',
      'Brass is Fe + Cr; Bronze is Cu + Pb. Bronze has a lower melting point.',
      'Brass and Bronze are identical compounds with formula Cu2ZnSn.',
    ],
    correctAnswer: 1,
    explanation: 'Correct! Brass = Copper + Zinc (used in taps/instruments). Bronze = Copper + Tin (harder, highly resistant to seawater corrosion, ideal for propellers & statues).',
    hint: 'Brass contains Zinc (Zn), while Bronze contains Tin (Sn). Think about seawater durability!',
    misconceptionTarget: 'Confusing brass and bronze composition.',
  },
  {
    id: 'c2',
    nodeId: NODE_GROUP_15,
    title: 'Inert Pair Effect in Group 15',
    subtitle: 'Oxidation state stability down the group',
    question: 'Why does Bismuth readily form BiCl₃ (+3 state) but forms unstable BiCl₅ (+5 state)?',
    type: 'multiple-choice',
    options: [
      'Because of the strong N≡N triple bond in Bismuth.',
      'Due to the inert pair effect: 6s² electrons resist unpairing and bonding as atomic size and shielding increase down the group.',
      'Because Bismuth is a non-metal that cannot share electrons.',
      'Because BiCl5 decomposes into elemental Nitrogen.',
    ],
    correctAnswer: 1,
    explanation: 'Exact! Down Group 15, the ns² valence electron pair becomes increasingly reluctant to participate in bonding (Inert Pair Effect), making the +3 oxidation state much more stable than +5 for Bismuth.',
    hint: 'Focus on the ns² electrons in heavier p-block elements!',
    misconceptionTarget: 'Believing inert pair effect makes nitrogen unreactive.',
  },
  {
    id: 'c3',
    nodeId: NODE_NITROGEN_COMPOUNDS,
    title: 'Haber & Ostwald Process Conditions',
    subtitle: 'Industrial Chemistry Match',
    question: 'Match the industrial chemical process with its correct catalyst and operating conditions:',
    type: 'interactive-matching',
    matchingPairs: [
      { left: 'Haber Process (Ammonia Synthesis)', right: 'Finely divided Fe catalyst + Mo promoter, 200 atm, ~450°C' },
      { left: 'Ostwald Process Stage 1 (NO Formation)', right: 'Platinum-Rhodium gauge catalyst at 850°C' },
      { left: 'Contact Process (SO₃ Formation)', right: 'Vanadium Pentoxide (V₂O₅) catalyst at 450°C' },
    ],
    correctAnswer: 'matched',
    explanation: 'Perfect matching! Haber uses Fe+Mo, Ostwald uses Pt-Rh, Contact process uses V₂O₅.',
    hint: 'Fe is used for Haber; V₂O₅ is used for Sulphuric acid Contact process.',
  },
  {
    id: 'c4',
    nodeId: NODE_PHOSPHORUS_COMPOUNDS,
    title: 'Phosphorus Allotropes & Chlorides Geometry',
    subtitle: 'P4 Strain & PCl5 Bond Lengths',
    question: 'In PCl₅ (trigonal bipyramidal geometry, sp³d hybridised), why are the axial P–Cl bonds longer and weaker than the equatorial P–Cl bonds?',
    type: 'multiple-choice',
    options: [
      'Axial chlorine atoms experience greater electron repulsion from the three equatorial P–Cl bonds at 90° angles.',
      'Equatorial chlorine atoms are bonded by ionic bonds while axial ones are covalent.',
      'Axial chlorine atoms are double bonded to phosphorus.',
      'All 5 P–Cl bonds in PCl5 are identical in length.',
    ],
    correctAnswer: 0,
    explanation: 'Spot on! The 2 axial chlorine atoms experience 3 strong 90° repulsions from equatorial bonds, whereas equatorial bonds only experience 2 90° repulsions. Hence axial bonds are stretched and weaker, causing PCl₅ to easily dissociate into PCl₃ + Cl₂ on heating!',
    hint: 'Count the 90° bond pair repulsions felt by axial vs equatorial positions.',
    misconceptionTarget: 'Thinking PCl5 has 5 identical P-Cl bonds.',
  },
  {
    id: 'c5',
    nodeId: NODE_GROUP_16,
    title: 'Oxidising Power of Ozone',
    subtitle: 'Nascent Oxygen Mechanism',
    question: 'Why is Ozone (O₃) a far stronger oxidising agent than Dioxygen (O₂)?',
    type: 'multiple-choice',
    options: [
      'Ozone contains 3 double bonds.',
      'Ozone easily decomposes to give a molecule of O₂ and a highly reactive atom of nascent oxygen: O₃ → O₂ + [O].',
      'Ozone is a heavy metal compound.',
      'Ozone has no lone pairs on its central oxygen atom.',
    ],
    correctAnswer: 1,
    explanation: 'Precisely! O₃ decomposes readily yielding nascent oxygen [O], which has an unshared reactive state that immediately attacks reducing agents.',
    hint: 'Look for the decomposition reaction producing atomic [O].',
  },
  {
    id: 'c6',
    nodeId: NODE_OXYGEN_SULPHUR,
    title: 'Reactions of Sulphuric Acid',
    subtitle: 'Dehydrating vs Oxidising Action',
    question: 'When concentrated H₂SO₄ turns white cane sugar (C₁₂H₂₂O₁₁) into a black spongy mound of carbon, which key property is it displaying?',
    type: 'multiple-choice',
    options: [
      'Acidic property displacing volatile gases.',
      'Dehydrating action — removing hydrogen and oxygen in a 2:1 ratio (water elements).',
      'Oxidising action — reducing sulphur from +6 to +4.',
      'Catalytic cracking of carbohydrate bonds.',
    ],
    correctAnswer: 1,
    explanation: 'Correct! C₁₂H₂₂O₁₁ → 12 C + 11 H₂O. Concentrated H₂SO₄ acts as a powerful dehydrating agent, stripping out water elements. (In contrast, when reacting with Cu metal to give SO₂, it acts as an oxidising agent).',
    hint: 'Notice that carbon is left behind while H and O are removed as water.',
  },
  {
    id: 'c7',
    nodeId: NODE_GROUP_17,
    title: 'Electron Gain Enthalpy Anomaly',
    subtitle: 'Fluorine vs Chlorine comparison',
    question: 'Why does Chlorine have a MORE negative electron gain enthalpy (-349 kJ/mol) than Fluorine (-328 kJ/mol), despite Fluorine being more electronegative?',
    type: 'multiple-choice',
    options: [
      'Fluorine has vacant d-orbitals that absorb the added electron energy.',
      'Fluorine is extremely small, so its 2p subshell is so dense that an incoming electron experiences strong interelectronic repulsion.',
      'Chlorine is a gas while Fluorine is a solid.',
      'Fluorine forms strong F–F triple bonds.',
    ],
    correctAnswer: 1,
    explanation: 'Spot on! The tiny atomic radius of Fluorine compresses 7 valence electrons into a small 2p volume. Adding an 8th electron creates strong interelectronic repulsion, lessening the net energy released!',
    hint: 'Think about electron density and crowding in the small n=2 shell.',
    misconceptionTarget: 'Believing fluorine has highest electron gain enthalpy.',
  },
  {
    id: 'c8',
    nodeId: NODE_CHLORINE_COMPOUNDS,
    title: 'Moist Chlorine Bleaching Mechanism',
    subtitle: 'Why dry Cl₂ does not bleach',
    question: 'A student tests dry red cloth with dry Cl₂ gas and sees no color change. Adding a drop of water causes instant bleaching. What is the chemical explanation?',
    type: 'multiple-choice',
    options: [
      'Water dissolves the fabric allowing chlorine gas to stick.',
      'Moist chlorine reacts with water to form HOCl, which decomposes to release nascent oxygen [O] that oxidises the dye.',
      'Water reduces chlorine gas to chloride ions which absorb red light.',
      'Dry chlorine is a liquid at room temperature.',
    ],
    correctAnswer: 1,
    explanation: 'Correct! Cl₂ + H₂O → HCl + HOCl; HOCl → HCl + [O]. It is the nascent oxygen [O] generated from unstable hypochlorous acid that oxidises coloured organic pigments to colourless products!',
    hint: 'HOCl breakdown produces nascent oxygen!',
  },
  {
    id: 'c9',
    nodeId: NODE_GROUP_18,
    title: 'Xenon Tetrafluoride (XeF₄) Geometry',
    subtitle: 'VSEPR & Hybridisation Lab',
    question: 'What is the hybridisation and molecular shape of Xenon Tetrafluoride (XeF₄)?',
    type: 'multiple-choice',
    options: [
      'sp³ hybridised, Tetrahedral shape',
      'sp³d² hybridised with 2 lone pairs opposite each other, resulting in Square Planar molecular shape.',
      'sp³d hybridised, Trigonal Bipyramidal shape',
      'sp³d³ hybridised, Pentagonal Planar shape',
    ],
    correctAnswer: 1,
    explanation: 'Excellent! Xe has 8 valence electrons + 4 F bonds = 12 valence electrons (6 pairs = sp³d²). The 2 lone pairs occupy axial positions 180° apart to minimise repulsion, leaving the 4 F atoms in a Square Planar geometry!',
    hint: 'Count total electron pairs around Xe: 4 bonding pairs + 2 lone pairs = 6 domains.',
  },
  {
    id: 'c10',
    nodeId: NODE_DBLOCK_PROPERTIES,
    title: 'd-Block Color & Magnetic Behavior',
    subtitle: 'Identifying Colourless & Diamagnetic Species',
    question: 'Which of the following transition metal ions is COLOURLESS in aqueous solution?',
    type: 'multiple-choice',
    options: [
      'Cu²⁺ (3d⁹)',
      'Fe³⁺ (3d⁵)',
      'Zn²⁺ (3d¹⁰)',
      'Cr³⁺ (3d³)',
    ],
    correctAnswer: 2,
    explanation: 'Correct! Zn²⁺ has a completely filled 3d¹⁰ subshell. With no vacant or partially filled d-orbitals, d-d electronic transitions are impossible, rendering aqueous Zn²⁺ colourless and diamagnetic!',
    hint: 'Look for the ion with a completely filled 3d¹⁰ or completely empty 3d⁰ subshell.',
    misconceptionTarget: 'Thinking any transition metal ion must be coloured.',
  },
];

// ==========================================
// SUB-COMPONENTS & CUSTOM VISUALS
// ==========================================

// 1. ALLOY LATTICE VISUALIZER
const AlloyLatticeCanvas: React.FC<{ selectedAlloy: AlloyData }> = ({ selectedAlloy }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = 5;
      const cols = 7;
      const spacingX = canvas.width / (cols + 1);
      const spacingY = canvas.height / (rows + 1);
      const distortionScale = selectedAlloy.latticeDistortion * 14;

      // Draw lattice background grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c + 1) * spacingX;
          const y = (r + 1) * spacingY;
          if (c < cols - 1) {
            const nextX = (c + 2) * spacingX;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nextX, y);
            ctx.stroke();
          }
          if (r < rows - 1) {
            const nextY = (r + 2) * spacingY;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, nextY);
            ctx.stroke();
          }
        }
      }

      // Draw atoms
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Check if this position is an additive atom
          const isAdditive = (r + c) % 3 === 0 && selectedAlloy.latticeDistortion > 0.2;
          const offsetX = Math.sin(time + r + c) * (isAdditive ? distortionScale * 0.5 : distortionScale * 0.2);
          const offsetY = Math.cos(time + r * 2 + c) * (isAdditive ? distortionScale * 0.5 : distortionScale * 0.2);

          const x = (c + 1) * spacingX + offsetX;
          const y = (r + 1) * spacingY + offsetY;

          const radius = isAdditive ? 14 : 18;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = isAdditive ? selectedAlloy.additiveColor : selectedAlloy.color;
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke();

          // Label atom symbol inside
          ctx.fillStyle = '#0f172a';
          ctx.font = 'bold 10px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const label = isAdditive ? selectedAlloy.composition.split('+')[1]?.trim() || 'C' : selectedAlloy.baseMetal.split(' ')[0];
          ctx.fillText(label.slice(0, 2), x, y);
        }
      }

      // Slip plane line showing shear resistance
      ctx.beginPath();
      ctx.strokeStyle = selectedAlloy.latticeDistortion > 0.4 ? '#ef4444' : '#22c55e';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.moveTo(30, canvas.height / 2 + Math.sin(time) * 4);
      ctx.lineTo(canvas.width - 30, canvas.height / 2 + Math.sin(time) * 4);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [selectedAlloy]);

  return (
    <div className="flex flex-col items-center bg-slate-900/80 rounded-xl p-4 border border-slate-700/60 shadow-inner">
      <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
        Crystal Lattice Slip Plane Simulation ({selectedAlloy.name})
      </div>
      <canvas ref={canvasRef} width={420} height={200} className="rounded-lg bg-slate-950 w-full max-w-[420px]" />
      <div className="mt-2 text-xs text-slate-400 text-center px-2">
        <span className="text-cyan-300 font-medium">Lattice Strain Level:</span> {(selectedAlloy.latticeDistortion * 100).toFixed(0)}% — {selectedAlloy.keyProperty}
      </div>
    </div>
  );
};

// 2. NITROGEN VS PHOSPHORUS REACTIVITY SIMULATOR
const NitrogenPhosphorusCanvas: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'N2' | 'P4_white' | 'P4_red'>('N2');

  return (
    <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 flex flex-col gap-3">
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('N2')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'N2' ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          Dinitrogen (N≡N)
        </button>
        <button
          onClick={() => setActiveTab('P4_white')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'P4_white' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          White Phosphorus (P₄)
        </button>
        <button
          onClick={() => setActiveTab('P4_red')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${activeTab === 'P4_red' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
        >
          Red Phosphorus (Polymer)
        </button>
      </div>

      <div className="h-44 bg-slate-950 rounded-lg p-3 flex items-center justify-center relative overflow-hidden border border-slate-800">
        {activeTab === 'N2' && (
          <div className="flex flex-col items-center gap-2">
            <svg width="200" height="90" viewBox="0 0 200 90">
              {/* Nitrogen triple bond */}
              <circle cx="50" cy="45" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="50" y="50" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">N</text>

              <line x1="72" y1="37" x2="128" y2="37" stroke="#38bdf8" strokeWidth="4" />
              <line x1="72" y1="45" x2="128" y2="45" stroke="#38bdf8" strokeWidth="4" />
              <line x1="72" y1="53" x2="128" y2="53" stroke="#38bdf8" strokeWidth="4" />

              <circle cx="150" cy="45" r="22" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
              <text x="150" y="50" fill="white" fontSize="16" fontWeight="bold" textAnchor="middle">N</text>
            </svg>
            <span className="text-xs text-sky-300 font-medium">Bond Dissociation Enthalpy = 945 kJ/mol (Chemically Inert at 25°C)</span>
          </div>
        )}

        {activeTab === 'P4_white' && (
          <div className="flex flex-col items-center gap-2">
            <svg width="180" height="100" viewBox="0 0 180 100">
              {/* P4 Tetrahedron */}
              <line x1="90" y1="15" x2="40" y2="75" stroke="#f87171" strokeWidth="3" />
              <line x1="90" y1="15" x2="140" y2="75" stroke="#f87171" strokeWidth="3" />
              <line x1="90" y1="15" x2="90" y2="85" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
              <line x1="40" y1="75" x2="140" y2="75" stroke="#f87171" strokeWidth="3" />
              <line x1="40" y1="75" x2="90" y2="85" stroke="#f87171" strokeWidth="3" />
              <line x1="140" y1="75" x2="90" y2="85" stroke="#f87171" strokeWidth="3" />

              <circle cx="90" cy="15" r="14" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
              <text x="90" y="19" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">P</text>
              <circle cx="40" cy="75" r="14" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
              <text x="40" y="79" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">P</text>
              <circle cx="140" cy="75" r="14" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
              <text x="140" y="79" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">P</text>
              <circle cx="90" cy="85" r="14" fill="#dc2626" stroke="#fca5a5" strokeWidth="2" />
              <text x="90" y="89" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">P</text>

              <text x="90" y="55" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">60° Strain Angle!</text>
            </svg>
            <span className="text-xs text-rose-300 font-medium">60° Ring Strain → Highly Reactive! Catches fire in air at 35°C (Stored in H₂O)</span>
          </div>
        )}

        {activeTab === 'P4_red' && (
          <div className="flex flex-col items-center gap-2">
            <svg width="240" height="90" viewBox="0 0 240 90">
              {/* Linked polymeric chains */}
              <line x1="20" y1="45" x2="60" y2="20" stroke="#d97706" strokeWidth="3" />
              <line x1="60" y1="20" x2="100" y2="70" stroke="#d97706" strokeWidth="3" />
              <line x1="100" y1="70" x2="140" y2="20" stroke="#d97706" strokeWidth="3" />
              <line x1="140" y1="20" x2="180" y2="70" stroke="#d97706" strokeWidth="3" />
              <line x1="180" y1="70" x2="220" y2="45" stroke="#d97706" strokeWidth="3" />

              <circle cx="60" cy="20" r="13" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
              <text x="60" y="24" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
              <circle cx="100" cy="70" r="13" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
              <text x="100" y="74" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
              <circle cx="140" cy="20" r="13" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
              <text x="140" y="24" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
              <circle cx="180" cy="70" r="13" fill="#b45309" stroke="#fde68a" strokeWidth="2" />
              <text x="180" y="74" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>
            </svg>
            <span className="text-xs text-amber-300 font-medium">Polymeric Chain Structure → Non-toxic, stable, used on matchbox side surfaces!</span>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. D-BLOCK D-D TRANSITION & COLOR LAB
const DBlockColorLab: React.FC = () => {
  const [selectedIonIndex, setSelectedIonIndex] = useState(0);
  const ion = D_BLOCK_LAB_IONS[selectedIonIndex];

  return (
    <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700 flex flex-col gap-3">
      <div className="text-xs font-semibold text-slate-200 flex justify-between items-center">
        <span>d-Block Crystal Field & d-d Transition Visualizer</span>
        <span className="text-xs text-cyan-400 font-mono">ISC Class 12 Core</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {D_BLOCK_LAB_IONS.map((item, idx) => (
          <button
            key={item.ion}
            onClick={() => setSelectedIonIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              selectedIonIndex === idx ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full border border-white/40" style={{ backgroundColor: item.hex }} />
            {item.ion}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
        {/* Solution Flask Simulation */}
        <div className="flex flex-col items-center justify-center p-3 bg-slate-900/50 rounded-lg">
          <div className="w-24 h-32 relative flex items-end justify-center">
            {/* Beaker SVG */}
            <svg width="90" height="110" viewBox="0 0 90 110" className="overflow-visible">
              <path d="M 15 10 L 15 95 Q 15 105 25 105 L 65 105 Q 75 105 75 95 L 75 10 Z" fill="none" stroke="#94a3b8" strokeWidth="3" />
              {/* Liquid fill */}
              <path
                d="M 17 40 L 17 95 Q 17 103 25 103 L 65 103 Q 73 103 73 95 L 73 40 Z"
                fill={ion.hex}
                opacity={ion.ion === 'Zn²⁺' || ion.ion === 'Sc³⁺' ? '0.1' : '0.75'}
              />
              <line x1="10" y1="10" x2="80" y2="10" stroke="#94a3b8" strokeWidth="3" />
            </svg>
          </div>
          <span className="mt-2 text-xs font-bold" style={{ color: ion.hex }}>
            Solution Color: {ion.colorName}
          </span>
        </div>

        {/* Orbital Energy Splitting Info */}
        <div className="flex flex-col justify-center text-xs text-slate-300 gap-1.5">
          <div><span className="text-slate-400 font-semibold">Valence d-Config:</span> <span className="font-mono text-cyan-300 font-bold">{ion.config}</span></div>
          <div><span className="text-slate-400 font-semibold">Paramagnetic:</span> <span className={ion.paramagnetic ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{ion.paramagnetic ? 'Yes (Unpaired d-e⁻)' : 'No (Diamagnetic)'}</span></div>
          <div><span className="text-slate-400 font-semibold">Mechanism:</span> {ion.reason}</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Brass and Bronze Have the Same Composition and Applications",
    description: "Students often confuse brass and bronze, believing both are alloys of copper and tin with identical properties and uses.",
    correction: "Brass is an alloy of copper and zinc, whereas bronze is primarily an alloy of copper and tin. Brass is more malleable and acoustically resonant, making it ideal for musical instruments and plumbing fittings, while bronze is harder and more corrosion-resistant, making it suitable for statues, medals, and marine hardware.",
  },
  {
    id: "misc_2",
    title: "Stainless Steel Contains No Iron and Cannot Suffer Corrosion",
    description: "Many students believe stainless steel is a non-ferrous alloy that is completely immune to chemical oxidation under all conditions.",
    correction: "Stainless steel is a ferrous alloy composed mostly of iron, enriched with chromium and nickel. The added chromium forms a microscopic, self-healing passive chromium oxide surface layer that protects the underlying iron from rusting under standard environmental conditions. However, exposure to severe acids, halides, or high temperatures can still induce localized corrosion.",
  },
  {
    id: "misc_3",
    title: "Duralumin Lacks Mechanical Strength Due to High Aluminum Content",
    description: "Students frequently assume duralumin is soft and weak because aluminum is its primary constituent element.",
    correction: "Duralumin is an alloy containing aluminum, copper, manganese, and magnesium that undergoes precipitation hardening to dramatically enhance its structural performance. While it retains the low density and light weight of pure aluminum, its tensile strength approaches that of structural steel. This unique combination of low density and high mechanical strength makes duralumin crucial for aircraft construction.",
  },
  {
    id: "misc_4",
    title: "Solder Possesses a Higher Melting Point Than Its Components",
    description: "Students often assume that alloying lead and tin to form solder increases its overall melting point to create heat-resistant joints.",
    correction: "Solder is formulated as a eutectic or near-eutectic alloy of tin and lead, meaning its melting point is substantially lower than that of either pure tin or pure lead. This deliberate lowering of the melting point allows the alloy to liquify quickly using a standard soldering iron. Consequently, electrical components can be permanently joined without risking thermal damage to sensitive electronics.",
  },
  {
    id: "misc_5",
    title: "Alloys Are Pure Chemical Compounds With Fixed Stoichiometric Ratios",
    description: "Students frequently classify alloys like steel and brass as chemical compounds formed by fixed chemical formulas and ionic or covalent bonds.",
    correction: "Alloys are solid solutions or mixtures consisting of metallic elements held together by metallic bonding, rather than distinct chemical compounds. Their elemental composition can be varied continuously across a specified range without altering their basic structural phase. This variable ratio allows metallurgists to tailor specific properties such as hardness, electrical conductivity, and ductility to specific applications.",
  },
];

export const C12_ChemistryUsesofmetalsandalloysSim: React.FC<{
  onComplete?: (score: number) => void;
}> = ({ onComplete }) => {
  // Navigation & Game Mode State
  const [mode, setMode] = useState<'discovery' | 'learn' | 'challenge' | 'lab' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Discovery State
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Challenge & Interactive States
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [challengeSuccess, setChallengeSuccess] = useState(false);
  const [matchingPairsState, setMatchingPairsState] = useState<Record<string, string>>({});

  // Score & Mastery State
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // SRS & BKT State Tracking
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Chemistry');
    });
    return initial as Record<NodeId, ReturnType<typeof createReviewItem>>;
  });

  // Selected alloy for slide 1 visual
  const [selectedAlloyIndex, setSelectedAlloyIndex] = useState(0);

  // Speech Helper
  const speakFeedback = useCallback((text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch {
      // Fallback silent
    }
  }, []);

  // Handle Discovery Submission
  const handleDiscoverySubmit = () => {
    if (discoveryChoice === null) return;
    setDiscoverySubmitted(true);
    if (discoveryChoice === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speakFeedback('Excellent prediction! Lattice distortion prevents slippage!');
      setScore((s) => s + 10);
    } else {
      audioManager.play('error');
      speakFeedback('Not quite. Carbon distorts the crystal lattice structure.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeAnswer = (answer: any) => {
    const currentChallenge = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentChallenge.type === 'multiple-choice') {
      isCorrect = answer === currentChallenge.correctAnswer;
    } else if (currentChallenge.type === 'interactive-matching') {
      isCorrect = answer === 'matched';
    }

    const targetNode = currentChallenge.nodeId;

    // Update BKT & SRS
    setBktStates((prev) => ({
      ...prev,
      [targetNode]: bktUpdate(prev[targetNode], isCorrect),
    }));

    setSrsItems((prev) => ({
      ...prev,
      [targetNode]: sm2Update(prev[targetNode], isCorrect ? 5 : 2, 0),
    }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
      setChallengeSuccess(true);
      setChallengeFeedback(currentChallenge.explanation);
      speakFeedback('Outstanding! ' + currentChallenge.explanation);
      setScore((s) => s + 20);
    } else {
      audioManager.play('drop-wrong');
      setChallengeSuccess(false);
      setChallengeFeedback(`Incorrect. ${currentChallenge.hint}`);
      speakFeedback('Let us review. ' + currentChallenge.hint);
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setChallengeSuccess(false);
    setUserAnswers({});
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Complete game
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      setMode('summary');

      // Record scores to localStorage / MasteryStore
      recordGameScore(Object.values(ALL_NODE_IDS), score + 50);

      if (onComplete) {
        onComplete(score + 50);
      }
    }
  };

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach((id) => {
      total += masteryProb(bktStates[id]);
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Background Visual Flair */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HUD BAR */}
      <header className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl mb-6 flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-xl text-slate-950 shadow-lg">
            ISC
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100 flex items-center gap-2">
              Class 12 Chemistry: Metals, Alloys & p/d-Block
            </h1>
            <p className="text-xs text-slate-400">Nodes c12_chem_041 to c12_chem_050</p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <nav className="flex items-center bg-slate-950/80 rounded-xl p-1 border border-slate-800">
          <button
            onClick={() => { setMode('discovery'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${mode === 'discovery' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Predict
          </button>
          <button
            onClick={() => { setMode('learn'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${mode === 'learn' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Learn
          </button>
          <button
            onClick={() => { setMode('lab'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${mode === 'lab' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Interactive Lab
          </button>
          <button
            onClick={() => { setMode('challenge'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${mode === 'challenge' ? 'bg-cyan-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
          </button>
        </nav>

        {/* Score & Mastery Badges */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Mastery</span>
            <span className="text-sm font-black text-cyan-400 font-mono">{overallMastery}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score</span>
            <span className="text-sm font-black text-amber-400 font-mono">{score} pts</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-5xl z-10 flex flex-col gap-6">
        {/* 1. DISCOVERY PREDICT MODE */}
        {mode === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col gap-6"
          >
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Discovery Phase</span>
              <h2 className="text-xl font-extrabold text-slate-100 mt-1">{DISCOVERY_QUESTION.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{DISCOVERY_QUESTION.question}</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={discoverySubmitted}
                  onClick={() => setDiscoveryChoice(idx)}
                  className={`p-4 rounded-xl border text-left text-sm font-medium transition flex items-center justify-between ${
                    discoveryChoice === idx
                      ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{opt}</span>
                  {discoveryChoice === idx && <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-glow" />}
                </button>
              ))}
            </div>

            {!discoverySubmitted ? (
              <button
                disabled={discoveryChoice === null}
                onClick={handleDiscoverySubmit}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-black rounded-xl shadow-lg transition"
              >
                Submit Prediction
              </button>
            ) : (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
                <div className={`text-sm font-bold ${discoveryChoice === DISCOVERY_QUESTION.correctIndex ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryChoice === DISCOVERY_QUESTION.correctIndex ? '✓ Outstanding Intuition!' : '💡 Learning Insight'}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
                <button
                  onClick={() => { setMode('learn'); audioManager.play('tap'); }}
                  className="mt-2 py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-bold rounded-lg transition self-end px-6"
                >
                  Proceed to Visual Lessons →
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 2. TEACHING SLIDES MODE */}
        {mode === 'learn' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col gap-6"
          >
            {/* Slide Navigation Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Lesson {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <h2 className="text-xl font-extrabold text-slate-100 mt-0.5">
                  {TEACHING_SLIDES[currentSlideIndex].title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => { setCurrentSlideIndex((s) => s - 1); audioManager.play('tap'); }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-lg text-xs font-bold text-slate-300"
                >
                  ← Back
                </button>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => { setCurrentSlideIndex((s) => s + 1); audioManager.play('tap'); }}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 rounded-lg text-xs font-bold text-slate-950"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Visual Simulation Block for Current Slide */}
            <div className="w-full">
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'alloy-lattice' && (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {ALLOYS_DATABASE.map((alloy, idx) => (
                      <button
                        key={alloy.name}
                        onClick={() => setSelectedAlloyIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          selectedAlloyIndex === idx ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {alloy.name}
                      </button>
                    ))}
                  </div>
                  <AlloyLatticeCanvas selectedAlloy={ALLOYS_DATABASE[selectedAlloyIndex]} />
                </div>
              )}

              {TEACHING_SLIDES[currentSlideIndex].visualType === 'nitrogen-phosphorus' && (
                <NitrogenPhosphorusCanvas />
              )}

              {TEACHING_SLIDES[currentSlideIndex].visualType === 'd-block-lab' && (
                <DBlockColorLab />
              )}

              {TEACHING_SLIDES[currentSlideIndex].visualType === 'chalcogen-halogen' && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <div className="text-xs font-bold text-cyan-300">Oxoacids Structure & Hybridisation Summary</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="font-bold text-sky-400">HNO₃ (Nitric Acid)</div>
                      <div className="text-[10px] text-slate-400 mt-1">Planar, Ostwald process</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="font-bold text-rose-400">H₃PO₄ (Phosphoric)</div>
                      <div className="text-[10px] text-slate-400 mt-1">Tribasic (3 -OH groups)</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="font-bold text-amber-400">H₂SO₄ (Sulphuric)</div>
                      <div className="text-[10px] text-slate-400 mt-1">Dibasic, Contact process</div>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <div className="font-bold text-emerald-400">HClO₄ (Perchloric)</div>
                      <div className="text-[10px] text-slate-400 mt-1">Strongest oxoacid (+7 Cl)</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Slide Content Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEACHING_SLIDES[currentSlideIndex].contentBlocks.map((block, idx) => (
                <div key={idx} className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80">
                  <h3 className="text-sm font-bold text-cyan-300 mb-1.5">{block.heading}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{block.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3. LAB EXPLORER MODE */}
        {mode === 'lab' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col gap-6"
          >
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Interactive Laboratory</span>
              <h2 className="text-xl font-extrabold text-slate-100 mt-0.5">Explore Chemistry Systems Hands-On</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Alloy Lattice Playground */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-3">
                <h3 className="text-sm font-bold text-cyan-300">1. Alloy Lattice Slip Plane Explorer</h3>
                <div className="flex flex-wrap gap-2">
                  {ALLOYS_DATABASE.map((alloy, idx) => (
                    <button
                      key={alloy.name}
                      onClick={() => setSelectedAlloyIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        selectedAlloyIndex === idx ? 'bg-cyan-500 text-slate-950 shadow' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {alloy.name}
                    </button>
                  ))}
                </div>
                <AlloyLatticeCanvas selectedAlloy={ALLOYS_DATABASE[selectedAlloyIndex]} />
              </div>

              {/* d-Block Color Lab */}
              <DBlockColorLab />
            </div>
          </motion.div>
        )}

        {/* 4. CHALLENGE MODE */}
        {mode === 'challenge' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col gap-6"
          >
            {/* Challenge Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-lg font-extrabold text-slate-100 mt-0.5">
                  {CHALLENGES[currentChallengeIndex].title}
                </h2>
                <p className="text-xs text-slate-400">{CHALLENGES[currentChallengeIndex].subtitle}</p>
              </div>

              <button
                onClick={() => setShowHint((h) => !h)}
                className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 rounded-lg text-xs font-bold transition"
              >
                💡 Hint
              </button>
            </div>

            {/* Hint Bubble */}
            {showHint && (
              <HintBubble show={showHint} text={CHALLENGES[currentChallengeIndex].hint} />
            )}

            {/* Challenge Question */}
            <div className="text-sm font-medium text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {CHALLENGES[currentChallengeIndex].question}
            </div>

            {/* Challenge Input Widget */}
            {CHALLENGES[currentChallengeIndex].type === 'multiple-choice' && (
              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={challengeFeedback !== null}
                    onClick={() => handleChallengeAnswer(idx)}
                    className="p-4 rounded-xl border text-left text-sm font-medium transition bg-slate-950/60 border-slate-800 text-slate-200 hover:bg-slate-800/70 hover:border-cyan-500/50"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {CHALLENGES[currentChallengeIndex].type === 'interactive-matching' && (
              <div className="flex flex-col gap-3">
                <p className="text-xs text-cyan-300 font-semibold">Match each process with its correct conditions:</p>
                {CHALLENGES[currentChallengeIndex].matchingPairs?.map((pair, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs">
                    <span className="font-bold text-sky-400">{pair.left}</span>
                    <span className="text-slate-400 font-mono">⟶ {pair.right}</span>
                  </div>
                ))}
                <button
                  disabled={challengeFeedback !== null}
                  onClick={() => handleChallengeAnswer('matched')}
                  className="mt-2 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs transition"
                >
                  Confirm Matches
                </button>
              </div>
            )}

            {/* Feedback & Next Challenge Button */}
            {challengeFeedback && (
              <div className={`p-4 rounded-xl border flex flex-col gap-3 ${challengeSuccess ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border-rose-500 text-rose-200'}`}>
                <div className="text-xs font-bold uppercase tracking-wider">
                  {challengeSuccess ? '✓ Correct Answer!' : '✗ Needs Attention'}
                </div>
                <p className="text-xs leading-relaxed">{challengeFeedback}</p>
                <button
                  onClick={handleNextChallenge}
                  className="py-2.5 px-6 bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs rounded-lg shadow transition self-end"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Final Summary 🎉'}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* 5. SUMMARY & MASTERY REPORT MODE */}
        {mode === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl flex flex-col items-center text-center gap-6"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-2xl text-slate-950 font-black shadow-lg">
              🏆
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-100">Lab Simulation Complete!</h2>
              <p className="text-xs text-slate-400 mt-1">You mastered Class 12 ISC Chemistry nodes c12_chem_041 through c12_chem_050.</p>
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Total Score</span>
                <span className="text-2xl font-black text-amber-400 mt-1 font-mono">{score} pts</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Overall Mastery</span>
                <span className="text-2xl font-black text-cyan-400 mt-1 font-mono">{overallMastery}%</span>
              </div>
            </div>

            {/* Node Mastery Breakdown */}
            <div className="w-full max-w-2xl bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2 text-left">
              <span className="text-xs font-bold text-slate-300 mb-1">Node Mastery Status (BKT Tracking)</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                {ALL_NODE_IDS.map((nodeId) => {
                  const mLevel = Math.round(masteryProb(bktStates[nodeId]) * 100);
                  return (
                    <div key={nodeId} className="flex justify-between items-center p-2 bg-slate-900 rounded border border-slate-800">
                      <span className="font-mono text-slate-400">{nodeId}</span>
                      <span className="font-bold text-cyan-300">{mLevel}% Mastery</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => {
                setMode('discovery');
                setCurrentChallengeIndex(0);
                setCurrentSlideIndex(0);
                setDiscoverySubmitted(false);
                setDiscoveryChoice(null);
                setScore(0);
              }}
              className="py-3 px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition"
            >
              Restart Simulation 🔄
            </button>
          </motion.div>
        )}
      </main>

      {/* OVERLAY FEEDBACK COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Simulation Completed!" />
      <SparkleBurst show={showSparkle} x={500} y={300} />
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
};

export default C12_ChemistryUsesofmetalsandalloysSim;