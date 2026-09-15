"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
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

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Equivalence Point and End Point Are the Exact Same Thing",
    description: "Students believe that the equivalence point and the end point of a titration refer to the same event and occur simultaneously. They think an indicator changes color at the exact moment stoichiometric neutralization is achieved.",
    correction: "The equivalence point is the theoretical stage where reactants are present in exact stoichiometric proportions, while the end point is the observed physical change signaling titration completion. An indicator changes color near, but not always at, the exact equivalence point depending on its specific pH transition range. Choosing an appropriate indicator minimizes the titration error between these two distinct points.",
  },
  {
    id: "misc_2",
    title: "Reactant with Lowest Mole Count Is Always Limiting Reagent",
    description: "Students assume that the reactant present in the smallest mass or lowest number of moles is automatically the limiting reagent. They ignore the stoichiometric coefficients of the balanced chemical equation during calculations.",
    correction: "The limiting reactant is determined by comparing the ratio of available moles to the stoichiometric coefficients in the balanced equation, not by absolute mole count alone. A reactant with fewer moles can still be in excess if the reaction consumes it in a much smaller stoichiometric ratio. Therefore, students must divide the moles of each reactant by its coefficient to correctly identify the limiting reactant.",
  },
  {
    id: "misc_3",
    title: "Percentage Composition Changes with the Sample's Total Mass",
    description: "Students often think that increasing or decreasing the total sample mass of a compound will alter the percentage composition of its individual elements. They confuse absolute element mass with relative mass percentage.",
    correction: "Percentage composition is an intensive property governed by the Law of Definite Proportions and is completely independent of total sample size. The percentage of an element depends solely on its atomic mass contribution to the molecular formula of the pure compound. Regardless of whether 1 gram or 100 grams of a compound is analyzed, its elemental percentage composition remains identical.",
  },
  {
    id: "misc_4",
    title: "A Single Heating Step Is Sufficient for Gravimetric Analysis",
    description: "Students believe that heating a precipitate once is enough to determine its accurate dry mass for gravimetric calculations. They assume all trapped water and volatile impurities are removed during the initial heating cycle.",
    correction: "Gravimetric analysis strictly requires heating the precipitate to a constant mass through repeated heating, cooling in a desiccator, and weighing cycles. This ensures complete removal of absorbed moisture and volatile impurities, which would otherwise falsely inflate the recorded mass. Consecutive weighings must agree within experimental limits (typically 0.001 g) to ensure accurate quantitative results.",
  },
  {
    id: "misc_5",
    title: "Diluting the Analyte Increases Required Volume of Titrant",
    description: "Students frequently believe that adding extra distilled water to the flask containing the analyte increases the volume of titrant needed to reach neutralization. They assume a more diluted solution requires more titrant volume to react.",
    correction: "Diluting the analyte changes its concentration and total solution volume, but the total number of moles of analyte remains unchanged. Because quantitative neutralization depends strictly on the mole ratio between titrant and analyte, the required volume of titrant remains exactly the same. Adding distilled water only aids in visual observation of the indicator color change without affecting stoichiometry.",
  },
];

// ==========================================
// ALL 10 REQUIRED NODE STRINGS (LITERALS)
// ==========================================
const ALL_NODE_IDS = [
  'c11_chem_071',
  'c11_chem_072',
  'c11_chem_073',
  'c11_chem_074',
  'c11_chem_075',
  'c11_chem_076',
  'c11_chem_077',
  'c11_chem_078',
  'c11_chem_079',
  'c11_chem_080'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface SlideData {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  content: string;
  eli5: string;
  misconception: string;
  visualType: 'leibig' | 'fission' | 'intermediates' | 'effects' | 'hyperconjugation' | 'sn1_sn2' | 'e1_e2' | 'conformations' | 'chlorination';
}

interface ChallengeData {
  id: number;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
  type: 'mcq' | 'calculation' | 'sorting';
  calcParams?: {
    sampleMass: number;
    co2Mass: number;
    h2oMass: number;
    correctPercentC: number;
    correctPercentH: number;
  };
}

interface InteractiveState {
  organicMass: number;
  co2Mass: number;
  h2oMass: number;
  dihedralAngle: number;
  intermediateType: 'radical' | 'carbocation' | 'carbanion';
  degree: 'methyl' | 'primary' | 'secondary' | 'tertiary';
  fissionType: 'homolytic' | 'heterolytic';
  mechType: 'SN1' | 'SN2' | 'E1' | 'E2';
  solvent: 'protic' | 'aprotic';
  substrate: '1deg' | '2deg' | '3deg';
  nucleophile: 'weak' | 'strong';
  temperature: number;
  chlorinationStep: 'initiation' | 'propagation1' | 'propagation2' | 'termination';
}

// ==========================================
// DISCOVERY QUESTION & SCENARIO
// ==========================================
const SCENARIO = {
  title: "Master Organic Chemistry Mechanisms & Analysis",
  description: "Step into the virtual Class 11 Organic Laboratory! Deconstruct molecules, break bonds with precise electronic accounting, measure quantitative mass changes in combustion tubes, analyze stereochemical inversions, and master reaction pathways.",
  targetAudience: "Class 11 (ISC) Chemistry Students"
};

const DISCOVERY_QUESTION = {
  question: "In Leibig's combustion method for organic quantitative analysis, why must the gas pass through anhydrous Calcium Chloride (CaCl₂) BEFORE Potassium Hydroxide (KOH)?",
  options: [
    "CaCl₂ is cheaper and serves as a rough filter for impurities",
    "KOH solution or solid contains moisture; if KOH were first, it would add water vapor to the gas stream and ruin the water absorption calculation",
    "CO₂ gas reacts violently with CaCl₂ if not scrubbed first",
    "The reaction temperature drops if KOH absorbs CO₂ first"
  ],
  correctIndex: 1,
  explanation: "Correct! KOH is aqueous or moist. If gas passed through KOH first, it would carry away water vapor into the CaCl₂ tube, giving a false, inflated water mass increase and invalidating both H and C calculations!"
};

// ==========================================
// TEACHING SLIDES DATA (ALL 10 NODES)
// ==========================================
const TEACHING_SLIDES: SlideData[] = [
  {
    id: 'slide_071',
    nodeId: 'c11_chem_071',
    title: 'Quantitative Analysis & Leibig Method',
    subtitle: 'c11_chem_071: Measuring C, H, N, and Halogens',
    content: "Quantitative analysis finds the percentage of each element in an organic compound. In Leibig's method, a known mass of organic compound is burned with dry CuO. Carbon becomes CO₂ (absorbed in weighed KOH tube) and Hydrogen becomes H₂O (absorbed in weighed CaCl₂ tube). %C = (12/44) × (mass of CO₂ / mass of sample) × 100. %H = (2/18) × (mass of H₂O / mass of sample) × 100.",
    eli5: "It is like burning a fruit cake in an oven and catching the steam and carbon smoke in separate sponges to weigh them!",
    misconception: "Misconception: The mass increase in the KOH tube is NOT the mass of carbon; it is the mass of CO₂! You must multiply by 12/44.",
    visualType: 'leibig'
  },
  {
    id: 'slide_072',
    nodeId: 'c11_chem_072',
    title: 'Reaction Mechanisms & Bond Fission',
    subtitle: 'c11_chem_072: Homolytic vs Heterolytic Cleavage',
    content: "Covalent bonds break in two ways: Homolytic Fission (symmetrical split, each atom gets 1 electron, forming neutral Free Radicals with fish-hook arrows, promoted by UV/heat) and Heterolytic Fission (unsymmetrical split, more electronegative atom takes BOTH electrons, forming Cations & Anions, promoted by polar solvents).",
    eli5: "Homolytic is a fair divorce where each friend keeps 1 toy (radicals). Heterolytic is an unfair split where 1 greedy friend takes both toys (ions)!",
    misconception: "Misconception: Addition reactions are NOT substitution! Addition turns an unsaturated double bond into a single product.",
    visualType: 'fission'
  },
  {
    id: 'slide_073',
    nodeId: 'c11_chem_073',
    title: 'Free Radicals, Carbocations, & Carbanions',
    subtitle: 'c11_chem_073: Intermediates & Geometry',
    content: "Carbocations (R⁺): sp² planar, empty p orbital, 6 valence e⁻, stability: 3° > 2° > 1° > methyl. Free Radicals (R•): sp² planar, 7 valence e⁻, stability: 3° > 2° > 1° > methyl. Carbanions (R⁻): sp³ pyramidal, lone pair, 8 valence e⁻, stability REVERSED: methyl > 1° > 2° > 3° because +I alkyl groups push extra electron density onto an already negative carbon!",
    eli5: "Carbocations are needy (+ charge), so friends (alkyl groups) helping them is great! Carbanions are overcrowded (- charge), so more friends pushing in makes them explode!",
    misconception: "Misconception: Carbanions do NOT follow the 3° > 2° > 1° stability order; they follow the EXACT OPPOSITE: methyl > 1° > 2° > 3°!",
    visualType: 'intermediates'
  },
  {
    id: 'slide_074',
    nodeId: 'c11_chem_074',
    title: 'Electrophiles & Nucleophiles',
    subtitle: 'c11_chem_074: Lewis Acids & Lewis Bases',
    content: "Electrophiles ('electron-loving'): electron-deficient species, Lewis acids, electron-pair acceptors (e.g., H⁺, NO₂⁺, R⁺, and NEUTRAL BF₃, AlCl₃ with incomplete octets). Nucleophiles ('nucleus-loving'): electron-rich species, Lewis bases, electron-pair donors (e.g., OH⁻, CN⁻, Cl⁻, and NEUTRAL NH₃, H₂O with lone pairs).",
    eli5: "Electrophiles are shoppers with empty wallets seeking coins. Nucleophiles are banks loaded with spare cash ready to lend!",
    misconception: "Misconception: Neutral species CAN be electrophiles or nucleophiles! BF₃ has no charge but is a strong electrophile due to its 6-electron octet defect.",
    visualType: 'effects'
  },
  {
    id: 'slide_075',
    nodeId: 'c11_chem_075',
    title: 'Electronic Displacement Effects',
    subtitle: 'c11_chem_075: Inductive, Electromeric & Mesomeric',
    content: "Inductive Effect (I): Permanent sigma-bond polarisation, weakens with distance (+I: alkyls; -I: -NO₂, -Cl). Electromeric Effect (E): Temporary pi-electron shift triggered ONLY when a reagent attacks. Mesomeric/Resonance Effect (M/R): Permanent delocalisation of pi or lone-pair electrons in conjugated systems (+R: -OH, -NH₂; -R: -NO₂, -COOH).",
    eli5: "Inductive is paperclips pulling along a chain. Electromeric is a wave raised when a boat passes. Mesomeric is a skipping rope vibration shared by all hands!",
    misconception: "Misconception: Electromeric is TEMPORARY (requires reagent), whereas Inductive and Mesomeric are PERMANENT properties of the isolated molecule.",
    visualType: 'effects'
  },
  {
    id: 'slide_076',
    nodeId: 'c11_chem_076',
    title: 'Hyperconjugation (No-Bond Resonance)',
    subtitle: 'c11_chem_076: Sigma-Pi Overlap & Alpha Hydrogens',
    content: "Hyperconjugation is the delocalisation of C-H sigma electrons from adjacent (alpha) carbons into an empty p-orbital or pi system. More alpha-hydrogens = more hyperconjugative structures = higher stability. Tert-butyl cation (9 alpha-H) > Isopropyl (6 alpha-H) > Ethyl (3 alpha-H). Controls Saytzeff's rule (more substituted alkene is major product).",
    eli5: "Nearby C-H pillars lean over to steady an electron-empty carbon tower. More pillars mean a much rock-solid structure!",
    misconception: "Misconception: Hyperconjugation involves SIGMA bonds overlapping with p/pi orbitals, NOT pi-pi delocalisation (which is resonance).",
    visualType: 'hyperconjugation'
  },
  {
    id: 'slide_077',
    nodeId: 'c11_chem_077',
    title: 'SN1 vs SN2 Mechanisms',
    subtitle: 'c11_chem_077: Substitution Pathways & Stereochemistry',
    content: "SN1: Unimolecular, 2 steps, carbocation intermediate, 1st order kinetics (rate = k[RX]), favored by 3° substrates, weak nucleophiles, polar protic solvents (H₂O, EtOH). Leads to Racemisation. SN2: Bimolecular, 1 step, concerted transition state, 2nd order kinetics (rate = k[RX][Nu⁻]), favored by 1° substrates, strong nucleophiles, polar aprotic solvents (acetone, DMSO). Leads to complete Walden Inversion!",
    eli5: "SN1: Old group leaves first, flat carbocation forms, new group attacks from front or back (50/50 mix). SN2: New group attacks back while old pops out front (umbrella flipping inside out)!",
    misconception: "Misconception: SN2 does NOT form a carbocation intermediate! It passes through a single pentavalent transition state.",
    visualType: 'sn1_sn2'
  },
  {
    id: 'slide_078',
    nodeId: 'c11_chem_078',
    title: 'E1 vs E2 Elimination Mechanisms',
    subtitle: 'c11_chem_078: Forming Double Bonds & Zaitsev Rule',
    content: "E1: Unimolecular elimination, 2 steps via carbocation, rate = k[RX], 3° > 2° > 1°, weak base. E2: Bimolecular elimination, 1 concerted step, rate = k[RX][Base], requires ANTI-PERIPLANAR geometry (C-H and C-X at 180°). Both follow Saytzeff/Zaitsev rule: the more substituted, hyperconjugated alkene is the major product.",
    eli5: "Elimination strips away H and X from neighbouring carbons to forge a C=C double bond!",
    misconception: "Misconception: Strong base at high temperature promotes ELIMINATION (E2/E1), NOT substitution!",
    visualType: 'e1_e2'
  },
  {
    id: 'slide_079',
    nodeId: 'c11_chem_079',
    title: 'Alkanes: Preparation & Conformation',
    subtitle: 'c11_chem_079: Synthesis Routes & Newman Projections',
    content: "Preparation: (1) Decarboxylation: RCOONa + NaOH(CaO) → RH + Na₂CO₃. (2) Wurtz reaction: 2RX + 2Na (dry ether) → R-R + 2NaX. (3) Kolbe electrolysis: 2RCOO⁻ → R-R + 2CO₂. (4) Corey-House: R₂CuLi + R'X → R-R'. Conformations of Ethane: Staggered (dihedral 60°, lowest energy, most stable) vs Eclipsed (dihedral 0°, highest torsional strain, 12 kJ/mol higher energy). Anti conformer in butane is the global energy minimum.",
    eli5: "Looking down the C-C bond telescope: staggered hydrogens sit nicely in gaps; eclipsed hydrogens overlap and pinch each other!",
    misconception: "Misconception: Eclipsed conformer is NOT stable! It suffers from severe torsional strain between overlapping electron clouds.",
    visualType: 'conformations'
  },
  {
    id: 'slide_080',
    nodeId: 'c11_chem_080',
    title: 'Alkanes: Physical Properties & Chlorination',
    subtitle: 'c11_chem_080: Trends & Free Radical Substitution',
    content: "Physical Properties: Nonpolar, insoluble in H₂O, less dense than water (floats). Boiling point increases with chain length, but DECREASES with branching (spherical shape reduces surface area contact). Free Radical Chlorination: (1) Initiation: Cl₂ → 2Cl• (UV light). (2) Propagation: Cl• + CH₄ → HCl + •CH₃; •CH₃ + Cl₂ → CH₃Cl + Cl•. (3) Termination: Radicals combine.",
    eli5: "Branched molecules are round like balls so they barely touch, lowering boiling points! Chlorination is a multi-step radical relay race triggered by sunlight.",
    misconception: "Misconception: UV light is REQUIRED for chlorination initiation; without light or heat, alkanes do not react with chlorine at room temp.",
    visualType: 'chlorination'
  }
];

// ==========================================
// 10 PROGRESSIVE ADAPTIVE CHALLENGES
// ==========================================
const CHALLENGES: ChallengeData[] = [
  {
    id: 1,
    nodeId: 'c11_chem_071',
    title: 'Leibig Quantitative Calculation',
    question: "In a Leibig combustion experiment, 0.44 g of an organic compound yielded 0.88 g of CO₂ and 0.36 g of H₂O. Calculate the percentage of Carbon and Hydrogen in the sample.",
    options: [
      "Carbon = 54.55%, Hydrogen = 9.09%",
      "Carbon = 27.27%, Hydrogen = 4.55%",
      "Carbon = 60.00%, Hydrogen = 13.33%",
      "Carbon = 40.00%, Hydrogen = 6.67%"
    ],
    correctIndex: 0,
    explanation: "Mass of C = (12/44) × 0.88 = 0.24 g. %C = (0.24 / 0.44) × 100 = 54.55%. Mass of H = (2/18) × 0.36 = 0.04 g. %H = (0.04 / 0.44) × 100 = 9.09%.",
    hint: "%C = (12/44) × (m_CO2 / m_sample) × 100; %H = (2/18) × (m_H2O / m_sample) × 100",
    type: 'calculation',
    calcParams: { sampleMass: 0.44, co2Mass: 0.88, h2oMass: 0.36, correctPercentC: 54.55, correctPercentH: 9.09 }
  },
  {
    id: 2,
    nodeId: 'c11_chem_072',
    title: 'Fission & Arrow Accounting',
    question: "When CH₃-Cl is dissolved in a polar solvent, it undergoes heterolytic fission. Which statement correctly describes the products and electron movement?",
    options: [
      "Curved arrow moves from C-Cl bond to Cl, forming CH₃⁺ (carbocation) and Cl⁻ (chloride ion)",
      "Fish-hook arrows move to C and Cl, forming CH₃• and Cl• free radicals",
      "Curved arrow moves to C, forming CH₃⁻ and Cl⁺",
      "No cleavage occurs because C-Cl is non-polar"
    ],
    correctIndex: 0,
    explanation: "Chlorine is more electronegative than carbon. In a polar solvent, heterolytic fission occurs with the electron pair shifting entirely to Cl, forming CH₃⁺ (carbocation) and Cl⁻.",
    hint: "Heterolytic fission gives BOTH electrons to the more electronegative atom.",
    type: 'mcq'
  },
  {
    id: 3,
    nodeId: 'c11_chem_073',
    title: 'Reactive Intermediates Stability',
    question: "Rank the following carbocations in order of INCREASING stability: (I) CH₃⁺, (II) (CH₃)₃C⁺, (III) CH₃CH₂⁺, (IV) (CH₃)₂CH⁺.",
    options: [
      "I < III < IV < II",
      "II < IV < III < I",
      "I < IV < III < II",
      "III < I < IV < II"
    ],
    correctIndex: 0,
    explanation: "Carbocation stability increases with alkyl substitution due to hyperconjugation and +I effect: Methyl (I, 0 alpha-H) < Primary (III, 3 alpha-H) < Secondary (IV, 6 alpha-H) < Tertiary (II, 9 alpha-H).",
    hint: "Count the number of alpha hydrogens! 3° (9 alpha-H) is the most stable.",
    type: 'mcq'
  },
  {
    id: 4,
    nodeId: 'c11_chem_074',
    title: 'Electrophile vs Nucleophile Sorting',
    question: "Which of the following pairs contains ONE neutral electrophile and ONE neutral nucleophile?",
    options: [
      "BF₃ (electrophile) and NH₃ (nucleophile)",
      "H⁺ (electrophile) and OH⁻ (nucleophile)",
      "NO₂⁺ (electrophile) and Cl⁻ (nucleophile)",
      "AlCl₃ (electrophile) and BF₃ (electrophile)"
    ],
    correctIndex: 0,
    explanation: "BF₃ is neutral with an incomplete boron octet (accepts e⁻ pair = Lewis acid = electrophile). NH₃ is neutral with a lone pair on nitrogen (donates e⁻ pair = Lewis base = nucleophile).",
    hint: "Look for molecules without net charge that have incomplete octets vs lone pairs.",
    type: 'mcq'
  },
  {
    id: 5,
    nodeId: 'c11_chem_075',
    title: 'Inductive Effect & Acid Strength',
    question: "Why is Trichloroacetic acid (CCl₃COOH) significantly more acidic than Acetic acid (CH₃COOH)?",
    options: [
      "The three electronegative Cl atoms exert a strong -I effect, withdrawing electron density and highly stabilizing the carboxylate anion CCl₃COO⁻",
      "Chlorine donates electrons by +R effect to strengthen the O-H bond",
      "Acetic acid has a strong -I effect that destabilizes its conjugate base",
      "CCl₃COOH undergoes electromeric shift to release hydroxide ions"
    ],
    correctIndex: 0,
    explanation: "Three highly electronegative Cl atoms exert a cumulative -I (negative inductive) effect through sigma bonds, pulling negative charge away from CCOO⁻ and stabilizing the conjugate base.",
    hint: "-I groups withdraw electron density and stabilize negative charges on conjugate bases.",
    type: 'mcq'
  },
  {
    id: 6,
    nodeId: 'c11_chem_076',
    title: 'Hyperconjugation & Saytzeff Rule',
    question: "When 2-bromobutane is treated with alcoholic KOH, but-2-ene is the major product over but-1-ene. Why?",
    options: [
      "But-2-ene has 6 hyperconjugable alpha-hydrogens, making it more stable than but-1-ene which has only 2 alpha-hydrogens (Saytzeff rule)",
      "But-1-ene has a higher dipole moment that causes decomposition",
      "Alcoholic KOH only attacks terminal carbons",
      "But-2-ene is formed via a free radical mechanism"
    ],
    correctIndex: 0,
    explanation: "In CH₃-CH=CH-CH₃ (but-2-ene), there are two methyl groups adjacent to double bond = 6 alpha-H's. In CH₃-CH₂-CH=CH₂ (but-1-ene), there is only 1 CH₂ group adjacent = 2 alpha-H's. More hyperconjugation = higher stability!",
    hint: "Count alpha hydrogens attached to carbons adjacent to the C=C double bond.",
    type: 'mcq'
  },
  {
    id: 7,
    nodeId: 'c11_chem_077',
    title: 'SN1 vs SN2 Mechanism Prediction',
    question: "Reaction of (R)-2-bromobutane with concentrated aqueous NaOH yields a racemic 50:50 mixture of (R)-butan-2-ol and (S)-butan-2-ol. Which mechanism occurred?",
    options: [
      "SN1 mechanism via a planar carbocation intermediate",
      "SN2 mechanism with 100% Walden inversion",
      "E2 elimination mechanism forming an alkene",
      "Free radical substitution mechanism"
    ],
    correctIndex: 0,
    explanation: "Racemisation (50% retention, 50% inversion) is the hallmark of the SN1 pathway because the intermediate carbocation is sp² planar, allowing nucleophile attack with equal probability from top or bottom face.",
    hint: "A planar intermediate allows nucleophile attack from either face equally.",
    type: 'mcq'
  },
  {
    id: 8,
    nodeId: 'c11_chem_078',
    title: 'E2 Stereochemistry Requirement',
    question: "What geometric arrangement between the beta-Hydrogen and the Leaving Group (X) is REQUIRED for a concerted E2 elimination reaction?",
    options: [
      "Anti-periplanar (dihedral angle 180°)",
      "Syn-coplanar (dihedral angle 0°)",
      "Perpendicular (dihedral angle 90°)",
      "Random orientation"
    ],
    correctIndex: 0,
    explanation: "E2 requires anti-periplanar conformation (H and X at 180° to each other) so that the breaking C-H and C-X sigma orbitals can overlap smoothly to generate the new C=C pi bond.",
    hint: "The H atom and leaving group must be on opposite sides (180°) of the carbon chain.",
    type: 'mcq'
  },
  {
    id: 9,
    nodeId: 'c11_chem_079',
    title: 'Conformations of Ethane',
    question: "What is the energy difference between the Staggered and Eclipsed conformations of ethane, and what causes it?",
    options: [
      "12 kJ/mol, caused by torsional strain (repulsion between overlapping C-H electron clouds)",
      "50 kJ/mol, caused by breaking C-C sigma bond",
      "0 kJ/mol, both conformers have identical energy",
      "120 kJ/mol, caused by hyperconjugation destruction"
    ],
    correctIndex: 0,
    explanation: "The eclipsed conformer of ethane is ~12 kJ/mol higher in potential energy than the staggered conformer due to torsional strain between aligned C-H bond electron clouds.",
    hint: "Eclipsed C-H bonds line up directly behind each other, creating electron cloud repulsion.",
    type: 'mcq'
  },
  {
    id: 10,
    nodeId: 'c11_chem_080',
    title: 'Free Radical Chlorination Chain',
    question: "In the free radical chlorination of methane in sunlight, which reaction step represents a PROPAGATION step?",
    options: [
      "•CH₃ + Cl₂ → CH₃Cl + Cl•",
      "Cl₂ + hν → 2 Cl•",
      "Cl• + Cl• → Cl₂",
      "•CH₃ + •CH₃ → C₂H₆"
    ],
    correctIndex: 0,
    explanation: "Propagation consumes one radical and generates a new radical, keeping the chain reaction going! •CH₃ + Cl₂ → CH₃Cl + Cl• consumes •CH₃ and produces Cl•.",
    hint: "Propagation steps have a radical on BOTH the reactant side and the product side.",
    type: 'mcq'
  }
];

// ==========================================
// MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export default function C11_ChemistryQuantitativeanalysisSim() {
  // Navigation & Mode
  const [activeTab, setActiveTab] = useState<'learn' | 'lab' | 'quiz' | 'mastery'>('learn');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Discovery Question State
  const [showDiscovery, setShowDiscovery] = useState<boolean>(true);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Score & Adaptive BKT State
  const [score, setScore] = useState<number>(0);
  const [bktMap, setBktMap] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createBKTState();
    });
    return initialMap as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Feedback & UI FX
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Quiz State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [userCalcC, setUserCalcC] = useState<string>('');
  const [userCalcH, setUserCalcH] = useState<string>('');

  // Simulator Lab Controls State
  const [simState, setSimState] = useState<InteractiveState>({
    organicMass: 0.44,
    co2Mass: 0.88,
    h2oMass: 0.36,
    dihedralAngle: 60,
    intermediateType: 'carbocation',
    degree: 'tertiary',
    fissionType: 'heterolytic',
    mechType: 'SN1',
    solvent: 'protic',
    substrate: '3deg',
    nucleophile: 'weak',
    temperature: 25,
    chlorinationStep: 'initiation'
  });

  // Current Active Slide & Challenge
  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Auto-hint Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!quizSubmitted && activeTab === 'quiz') {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [currentChallengeIndex, quizSubmitted, activeTab]);

  // Audio Playback Helper
  const playFx = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
      audioManager.play('chime');
      audioManager.play('pop');
    } catch {
      // Audio fallback
    }
  }, []);

  // Speech Helper
  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch {
      // Speech fallback
    }
  }, []);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      playFx('drop-correct');
      speakText("Brilliant observation! KOH adds moisture if placed first.");
    } else {
      playFx('drop-wrong');
      speakText("Think about moisture in aqueous KOH solutions.");
    }
  };

  // Handle Quiz Option Selection & Submission
  const handleAnswerSubmit = (optionIndex?: number) => {
    if (quizSubmitted) return;
    const chosenIndex = optionIndex !== undefined ? optionIndex : selectedOption;
    if (chosenIndex === null && currentChallenge.type !== 'calculation') return;

    setSelectedOption(chosenIndex);
    setQuizSubmitted(true);

    const isCorrect = currentChallenge.type === 'calculation'
      ? Math.abs(parseFloat(userCalcC) - (currentChallenge.calcParams?.correctPercentC || 0)) < 1.0 &&
        Math.abs(parseFloat(userCalcH) - (currentChallenge.calcParams?.correctPercentH || 0)) < 1.0
      : chosenIndex === currentChallenge.correctIndex;

    // Update BKT & SRS
    const targetNode = currentChallenge.nodeId;
    const oldBkt = bktMap[targetNode] || createBKTState();
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktMap(prev => ({ ...prev, [targetNode]: newBkt }));

    // SRS Update
    const reviewItem = createReviewItem(currentChallenge.id.toString());
    sm2Update(reviewItem, isCorrect ? 5 : 1);

    if (isCorrect) {
      playFx('success');
      playFx('sparkle');
      setShowSuccess(true);
      setShowSparkle(true);
      setScore(prev => prev + 10);
      speakText("Outstanding! Your chemical reasoning is spot on.");
      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        playFx('celebration');
        recordGameScore(ALL_NODE_IDS, score + 10);
      }
    } else {
      playFx('drop-wrong');
      speakText("Not quite. Review the mechanism steps and try again!");
    }
  };

  const handleNextChallenge = () => {
    setShowSuccess(false);
    setShowSparkle(false);
    setQuizSubmitted(false);
    setSelectedOption(null);
    setUserCalcC('');
    setUserCalcH('');
    setShowHint(false);
    playFx('swoop');

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      setActiveTab('mastery');
    }
  };

  // ==========================================
  // CUSTOM SVG VISUALIZERS FOR ORGANIC CHEMISTRY
  // ==========================================

  // 1. Leibig Quantitative Analysis Apparatus Visualizer
  const renderLeibigVisualizer = () => {
    const pctC = ((12 / 44) * (simState.co2Mass / simState.organicMass) * 100).toFixed(2);
    const pctH = ((2 / 18) * (simState.h2oMass / simState.organicMass) * 100).toFixed(2);

    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
        <h4 className="text-amber-400 font-bold mb-2 flex items-center justify-between">
          <span>Leibig Combustion Apparatus Visualizer</span>
          <span className="text-xs text-slate-400">c11_chem_071</span>
        </h4>
        
        {/* Interactive Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mb-4 bg-slate-800/80 p-3 rounded-lg">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Organic Sample Mass: {simState.organicMass} g</label>
            <input
              type="range" min="0.1" max="1.0" step="0.02"
              value={simState.organicMass}
              onChange={(e) => setSimState({ ...simState, organicMass: parseFloat(e.target.value) })}
              className="w-full accent-amber-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">CO₂ Absorption Tube (KOH) Mass Gain: {simState.co2Mass} g</label>
            <input
              type="range" min="0.1" max="2.0" step="0.04"
              value={simState.co2Mass}
              onChange={(e) => setSimState({ ...simState, co2Mass: parseFloat(e.target.value) })}
              className="w-full accent-cyan-500"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-medium mb-1">H₂O Absorption Tube (CaCl₂) Mass Gain: {simState.h2oMass} g</label>
            <input
              type="range" min="0.05" max="1.0" step="0.02"
              value={simState.h2oMass}
              onChange={(e) => setSimState({ ...simState, h2oMass: parseFloat(e.target.value) })}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        {/* SVG Combustion Train */}
        <div className="relative overflow-hidden bg-slate-950 rounded-lg p-2 border border-slate-800">
          <svg viewBox="0 0 600 180" className="w-full h-auto">
            {/* O2 gas inlet */}
            <path d="M 20 90 L 80 90" stroke="#38bdf8" strokeWidth="4" strokeDasharray="6 3" />
            <text x="30" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold">Dry O₂ Gas</text>

            {/* Hard glass combustion tube */}
            <rect x="80" y="70" width="220" height="40" fill="rgba(255,255,255,0.05)" stroke="#94a3b8" strokeWidth="2" rx="4" />
            
            {/* Sample boat */}
            <rect x="110" y="95" width="40" height="10" fill="#f59e0b" rx="2" />
            <text x="115" y="92" fill="#fbbf24" fontSize="9" fontWeight="bold">Sample ({simState.organicMass}g)</text>

            {/* CuO packing */}
            <rect x="170" y="75" width="100" height="30" fill="url(#cuoPattern)" stroke="#64748b" rx="2" />
            <text x="195" y="94" fill="#cbd5e1" fontSize="10" fontWeight="bold">Dry CuO</text>

            {/* Furnace heat flames */}
            <path d="M 120 120 Q 125 105 130 120 Q 135 105 140 120" stroke="#ef4444" strokeWidth="3" fill="none" />
            <path d="M 200 120 Q 205 105 210 120 Q 215 105 220 120" stroke="#ef4444" strokeWidth="3" fill="none" />
            <text x="150" y="140" fill="#f87171" fontSize="10" fontWeight="bold">Furnace (Heat)</text>

            {/* Tube 1: CaCl2 (Water absorber) */}
            <path d="M 300 90 L 340 90 L 340 130 L 400 130 L 400 90 L 430 90" stroke="#3b82f6" strokeWidth="6" fill="none" />
            <rect x="345" y="110" width="50" height="30" fill="#1e3a8a" rx="4" />
            <text x="350" y="128" fill="#93c5fd" fontSize="9" fontWeight="bold">Anhyd. CaCl₂</text>

            {/* Tube 2: KOH (CO2 absorber) */}
            <path d="M 430 90 L 450 90 L 450 130 L 510 130 L 510 90 L 550 90" stroke="#06b6d4" strokeWidth="6" fill="none" />
            <rect x="455" y="110" width="50" height="30" fill="#155e75" rx="4" />
            <text x="462" y="128" fill="#67e8f9" fontSize="9" fontWeight="bold">Aqueous KOH</text>

            {/* Pattern Definitions */}
            <defs>
              <pattern id="cuoPattern" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="2" fill="#475569" />
              </pattern>
            </defs>
          </svg>
        </div>

        {/* Real-time Percentage Calculation Panel */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="bg-cyan-950/60 border border-cyan-800 p-3 rounded-lg">
            <span className="text-xs text-cyan-300 block">Carbon Percentage (%C)</span>
            <span className="text-2xl font-black text-cyan-400">{pctC}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">(12/44) × ({simState.co2Mass}g / {simState.organicMass}g) × 100</span>
          </div>
          <div className="bg-blue-950/60 border border-blue-800 p-3 rounded-lg">
            <span className="text-xs text-blue-300 block">Hydrogen Percentage (%H)</span>
            <span className="text-2xl font-black text-blue-400">{pctH}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">(2/18) × ({simState.h2oMass}g / {simState.organicMass}g) × 100</span>
          </div>
        </div>
      </div>
    );
  };

  // 2. Intermediates Studio Visualizer (Radicals, Carbocations, Carbanions)
  const renderIntermediatesVisualizer = () => {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
        <h4 className="text-amber-400 font-bold mb-2 flex items-center justify-between">
          <span>Reactive Intermediates Geometry & Stability Studio</span>
          <span className="text-xs text-slate-400">c11_chem_073</span>
        </h4>

        {/* Controls */}
        <div className="flex flex-wrap gap-2 mb-4 bg-slate-800 p-2 rounded-lg text-xs">
          <span className="text-slate-400 self-center font-bold">Select Intermediate:</span>
          {(['carbocation', 'radical', 'carbanion'] as const).map(type => (
            <button
              key={type}
              onClick={() => setSimState({ ...simState, intermediateType: type })}
              className={`px-3 py-1 rounded-md font-bold capitalize transition-all ${
                simState.intermediateType === type ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {type}
            </button>
          ))}
          <span className="text-slate-400 self-center font-bold ml-4">Degree:</span>
          {(['methyl', 'primary', 'secondary', 'tertiary'] as const).map(deg => (
            <button
              key={deg}
              onClick={() => setSimState({ ...simState, degree: deg })}
              className={`px-3 py-1 rounded-md font-bold capitalize transition-all ${
                simState.degree === deg ? 'bg-cyan-500 text-slate-950 shadow-md' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {deg}
            </button>
          ))}
        </div>

        {/* Interactive SVG Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex justify-center items-center h-52">
            <svg viewBox="0 0 240 200" className="w-56 h-auto">
              {/* Central Carbon */}
              <circle cx="120" cy="100" r="22" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
              <text x="114" y="106" fill="#f8fafc" fontSize="16" fontWeight="bold">C</text>

              {/* Hybridization Orbital shapes & Bonds */}
              {simState.intermediateType === 'carbanion' ? (
                // Pyramidal sp3 with lone pair
                <>
                  <line x1="120" y1="100" x2="60" y2="140" stroke="#cbd5e1" strokeWidth="4" />
                  <line x1="120" y1="100" x2="180" y2="140" stroke="#cbd5e1" strokeWidth="4" />
                  <line x1="120" y1="100" x2="120" y2="160" stroke="#cbd5e1" strokeWidth="4" />
                  {/* Lone Pair orbital */}
                  <ellipse cx="120" cy="55" rx="16" ry="25" fill="rgba(239, 68, 68, 0.4)" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="114" cy="52" r="3" fill="#fef08a" />
                  <circle cx="126" cy="52" r="3" fill="#fef08a" />
                  <text x="114" y="110" fill="#ef4444" fontSize="18" fontWeight="black">-</text>
                </>
              ) : (
                // Planar sp2 with p-orbital sticking out
                <>
                  <line x1="120" y1="100" x2="50" y2="100" stroke="#cbd5e1" strokeWidth="4" />
                  <line x1="120" y1="100" x2="155" y2="40" stroke="#cbd5e1" strokeWidth="4" />
                  <line x1="120" y1="100" x2="155" y2="160" stroke="#cbd5e1" strokeWidth="4" />
                  
                  {/* Empty or half-filled p orbital */}
                  <ellipse cx="120" cy="50" rx="14" ry="24" fill={simState.intermediateType === 'carbocation' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(234, 179, 8, 0.3)'} stroke={simState.intermediateType === 'carbocation' ? '#38bdf8' : '#eab308'} strokeWidth="2" />
                  <ellipse cx="120" cy="150" rx="14" ry="24" fill={simState.intermediateType === 'carbocation' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(234, 179, 8, 0.3)'} stroke={simState.intermediateType === 'carbocation' ? '#38bdf8' : '#eab308'} strokeWidth="2" />
                  
                  {simState.intermediateType === 'radical' && (
                    <circle cx="120" cy="48" r="4" fill="#facc15" />
                  )}

                  {simState.intermediateType === 'carbocation' && (
                    <text x="135" y="90" fill="#38bdf8" fontSize="18" fontWeight="black">+</text>
                  )}
                </>
              )}
            </svg>
          </div>

          {/* Properties & Stability Analysis */}
          <div className="bg-slate-800/80 p-4 rounded-lg space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-700 pb-1">
              <span className="text-slate-400">Hybridization:</span>
              <span className="font-bold text-amber-300">{simState.intermediateType === 'carbanion' ? 'sp³' : 'sp²'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-1">
              <span className="text-slate-400">Geometry:</span>
              <span className="font-bold text-cyan-300">{simState.intermediateType === 'carbanion' ? 'Pyramidal (107°)' : 'Trigonal Planar (120°)'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-1">
              <span className="text-slate-400">Valence Electrons around C:</span>
              <span className="font-bold text-emerald-300">
                {simState.intermediateType === 'carbocation' ? '6 (Octet Deficient)' : simState.intermediateType === 'radical' ? '7 (Unpaired e⁻)' : '8 (Complete Octet + Lone Pair)'}
              </span>
            </div>
            <div className="pt-2">
              <span className="text-slate-300 font-bold block mb-1">Stability Order Trend:</span>
              <div className="p-2 bg-slate-900 rounded border border-slate-700 text-center font-bold text-amber-400">
                {simState.intermediateType === 'carbanion' 
                  ? 'Methyl > 1° > 2° > 3° (REVERSED due to destabilizing +I effect)'
                  : '3° > 2° > 1° > Methyl (Stabilized by Hyperconjugation & +I)'}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 3. SN1 vs SN2 & E1 vs E2 Reaction Simulator
  const renderMechanismVisualizer = () => {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
        <h4 className="text-amber-400 font-bold mb-2 flex items-center justify-between">
          <span>SN1 / SN2 / E1 / E2 Reaction Mechanism & Energy Profile</span>
          <span className="text-xs text-slate-400">c11_chem_077 & c11_chem_078</span>
        </h4>

        {/* Mechanism Selector Tabs */}
        <div className="grid grid-cols-4 gap-2 mb-4 text-xs font-bold">
          {(['SN1', 'SN2', 'E1', 'E2'] as const).map(m => (
            <button
              key={m}
              onClick={() => setSimState({ ...simState, mechType: m })}
              className={`p-2 rounded-lg text-center transition-all ${
                simState.mechType === m ? 'bg-amber-500 text-slate-950 shadow-lg scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {m} Pathway
            </button>
          ))}
        </div>

        {/* Parameters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-4 bg-slate-800/80 p-3 rounded-lg">
          <div>
            <span className="text-slate-400 block font-medium">Substrate:</span>
            <select
              value={simState.substrate}
              onChange={(e) => setSimState({ ...simState, substrate: e.target.value as any })}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-amber-300 font-bold w-full mt-1"
            >
              <option value="1deg">1° Primary (CH₃CH₂-X)</option>
              <option value="2deg">2° Secondary ((CH₃)₂CH-X)</option>
              <option value="3deg">3° Tertiary ((CH₃)₃C-X)</option>
            </select>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Solvent Type:</span>
            <select
              value={simState.solvent}
              onChange={(e) => setSimState({ ...simState, solvent: e.target.value as any })}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-cyan-300 font-bold w-full mt-1"
            >
              <option value="protic">Polar Protic (H₂O, EtOH)</option>
              <option value="aprotic">Polar Aprotic (Acetone, DMSO)</option>
            </select>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Nucleophile/Base:</span>
            <select
              value={simState.nucleophile}
              onChange={(e) => setSimState({ ...simState, nucleophile: e.target.value as any })}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-emerald-300 font-bold w-full mt-1"
            >
              <option value="weak">Weak (H₂O, EtOH)</option>
              <option value="strong">Strong (OH⁻, EtO⁻)</option>
            </select>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Temperature: {simState.temperature}°C</span>
            <input
              type="range" min="0" max="100" step="5"
              value={simState.temperature}
              onChange={(e) => setSimState({ ...simState, temperature: parseInt(e.target.value) })}
              className="w-full mt-2 accent-amber-500"
            />
          </div>
        </div>

        {/* Reaction Energy Profile & Stereochemistry Visualizer */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-bold text-amber-400">Energy Profile Diagram</span>
            <span className="text-slate-400">
              Rate Law: <code className="text-cyan-300 font-mono">
                {simState.mechType === 'SN1' || simState.mechType === 'E1' ? 'Rate = k[Substrate]' : 'Rate = k[Substrate][Attacker]'}
              </code>
            </span>
          </div>
          <svg viewBox="0 0 500 160" className="w-full h-auto">
            {/* Axes */}
            <line x1="40" y1="140" x2="480" y2="140" stroke="#64748b" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="140" stroke="#64748b" strokeWidth="2" />
            <text x="220" y="155" fill="#94a3b8" fontSize="10">Reaction Coordinate</text>
            <text x="15" y="80" fill="#94a3b8" fontSize="10" transform="rotate(-90 15,80)">Potential Energy</text>

            {/* Curves */}
            {simState.mechType === 'SN1' || simState.mechType === 'E1' ? (
              // Two-hump curve with intermediate carbocation valley
              <g>
                <path d="M 50 120 C 90 120, 120 30, 160 30 C 190 30, 210 90, 240 90 C 270 90, 310 50, 350 50 C 390 50, 420 130, 470 130" stroke="#f59e0b" strokeWidth="3" fill="none" />
                <circle cx="160" cy="30" r="4" fill="#ef4444" />
                <text x="140" y="20" fill="#f87171" fontSize="9" fontWeight="bold">TS1 (Slow C-X break)</text>
                <circle cx="240" cy="90" r="5" fill="#38bdf8" />
                <text x="215" y="105" fill="#38bdf8" fontSize="9" fontWeight="bold">Carbocation Valley</text>
                <circle cx="350" cy="50" r="4" fill="#f59e0b" />
                <text x="330" y="40" fill="#fbbf24" fontSize="9" fontWeight="bold">TS2 (Fast Attack)</text>
              </g>
            ) : (
              // One-hump curve (concerted transition state)
              <g>
                <path d="M 50 120 C 120 120, 180 25, 260 25 C 340 25, 400 130, 470 130" stroke="#06b6d4" strokeWidth="3" fill="none" />
                <circle cx="260" cy="25" r="5" fill="#06b6d4" />
                <text x="200" y="15" fill="#67e8f9" fontSize="10" fontWeight="bold">Concerted Pentavalent Transition State</text>
              </g>
            )}
          </svg>
        </div>

        {/* Outcome Summary */}
        <div className="mt-3 bg-slate-800/90 p-3 rounded-lg text-xs grid grid-cols-2 gap-2 border border-slate-700">
          <div>
            <span className="text-slate-400 block font-semibold">Stereochemical Outcome:</span>
            <span className="font-bold text-amber-300">
              {simState.mechType === 'SN1' ? 'Racemisation (50% Retention, 50% Inversion)' :
               simState.mechType === 'SN2' ? '100% Walden Inversion (Umbrella Flip)' :
               simState.mechType === 'E1' ? 'Saytzeff Major Alkene (Most Substituted)' :
               'Saytzeff Alkene + Anti-periplanar 180° H/X Requirement'}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-semibold">Favored Conditions:</span>
            <span className="font-bold text-cyan-300">
              {simState.mechType === 'SN1' ? '3° Substrate, Weak Nucleophile, Polar Protic' :
               simState.mechType === 'SN2' ? '1° Substrate, Strong Nucleophile, Polar Aprotic' :
               simState.mechType === 'E1' ? '3° Substrate, High Temp, Weak Base' :
               'Strong Base, High Temp, Anti-periplanar H-C-C-X'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // 4. Conformations of Ethane Newman Projection Visualizer
  const renderConformationVisualizer = () => {
    const angle = simState.dihedralAngle;
    const isStaggered = Math.abs(angle % 120 - 60) < 5;
    const isEclipsed = Math.abs(angle % 120) < 5;
    // Energy curve calculation: E = 6 * (1 - cos(3 * angle * PI/180)) kJ/mol
    const energy = (6 * (1 - Math.cos((3 * angle * Math.PI) / 180))).toFixed(1);

    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
        <h4 className="text-amber-400 font-bold mb-2 flex items-center justify-between">
          <span>Ethane Conformation & Newman Projection Interactive Inspector</span>
          <span className="text-xs text-slate-400">c11_chem_079</span>
        </h4>

        {/* Dihedral Angle Slider */}
        <div className="bg-slate-800/80 p-3 rounded-lg text-xs mb-4">
          <div className="flex justify-between font-bold mb-1">
            <span className="text-slate-300">Dihedral Angle (θ): {angle}°</span>
            <span className={isStaggered ? 'text-emerald-400' : isEclipsed ? 'text-rose-400' : 'text-amber-400'}>
              {isStaggered ? 'Staggered (Lowest Energy - Most Stable)' : isEclipsed ? 'Eclipsed (Torsional Strain Peak)' : 'Skew Conformation'}
            </span>
          </div>
          <input
            type="range" min="0" max="360" step="5"
            value={angle}
            onChange={(e) => setSimState({ ...simState, dihedralAngle: parseInt(e.target.value) })}
            className="w-full accent-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {/* Newman Projection SVG */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col items-center justify-center h-56">
            <svg viewBox="0 0 200 200" className="w-48 h-auto">
              {/* Back Carbon Circle */}
              <circle cx="100" cy="100" r="45" stroke="#94a3b8" strokeWidth="3" fill="none" />

              {/* Back Carbon H Bonds (3 bonds, 120 deg apart shifted by angle) */}
              {[0, 120, 240].map((baseA, i) => {
                const aRad = ((baseA + angle) * Math.PI) / 180;
                const x2 = 100 + 75 * Math.sin(aRad);
                const y2 = 100 - 75 * Math.cos(aRad);
                return (
                  <g key={`back_${i}`}>
                    <line x1="100" y1="100" x2={x2} y2={y2} stroke="#38bdf8" strokeWidth="4" />
                    <circle cx={x2} cy={y2} r="10" fill="#0284c7" />
                    <text x={x2 - 4} y={y2 + 4} fill="#ffffff" fontSize="10" fontWeight="bold">H</text>
                  </g>
                );
              })}

              {/* Front Carbon Central Dot */}
              <circle cx="100" cy="100" r="10" fill="#f59e0b" />

              {/* Front Carbon H Bonds (Fixed at 0, 120, 240 deg) */}
              {[0, 120, 240].map((baseA, i) => {
                const aRad = (baseA * Math.PI) / 180;
                const x2 = 100 + 65 * Math.sin(aRad);
                const y2 = 100 - 65 * Math.cos(aRad);
                return (
                  <g key={`front_${i}`}>
                    <line x1="100" y1="100" x2={x2} y2={y2} stroke="#f59e0b" strokeWidth="4" />
                    <circle cx={x2} cy={y2} r="10" fill="#d97706" />
                    <text x={x2 - 4} y={y2 + 4} fill="#ffffff" fontSize="10" fontWeight="bold">H</text>
                  </g>
                );
              })}
            </svg>
            <span className="text-[10px] text-slate-400 mt-1">Orange = Front Carbon | Blue = Back Carbon</span>
          </div>

          {/* Potential Energy Curve SVG */}
          <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col justify-center h-56">
            <span className="text-xs font-bold text-amber-400 mb-1 text-center">Torsional Potential Energy: {energy} kJ/mol</span>
            <svg viewBox="0 0 240 140" className="w-full h-auto">
              <line x1="30" y1="120" x2="220" y2="120" stroke="#64748b" strokeWidth="2" />
              <line x1="30" y1="20" x2="30" y2="120" stroke="#64748b" strokeWidth="2" />
              
              {/* Sinusoidal Torsional Energy Curve */}
              <path d="M 30 110 Q 45 30 60 30 Q 75 110 90 110 Q 105 30 120 30 Q 135 110 150 110 Q 165 30 180 30 Q 195 110 210 110" stroke="#f59e0b" strokeWidth="2" fill="none" />
              
              {/* Marker for current angle */}
              {(() => {
                const currentX = 30 + (angle / 360) * 180;
                const currentY = 110 - (parseFloat(energy) / 12) * 80;
                return <circle cx={currentX} cy={currentY} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />;
              })()}

              <text x="110" y="135" fill="#94a3b8" fontSize="8">Dihedral Angle (0° to 360°)</text>
              <text x="10" y="70" fill="#94a3b8" fontSize="8" transform="rotate(-90 10,70)">Energy (kJ/mol)</text>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  // 5. Free Radical Chlorination Relay Visualizer
  const renderChlorinationVisualizer = () => {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white">
        <h4 className="text-amber-400 font-bold mb-2 flex items-center justify-between">
          <span>Free Radical Chlorination Chain Reaction Relay</span>
          <span className="text-xs text-slate-400">c11_chem_080</span>
        </h4>

        {/* Step Navigation Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4 text-xs font-bold">
          {(['initiation', 'propagation1', 'propagation2', 'termination'] as const).map(step => (
            <button
              key={step}
              onClick={() => setSimState({ ...simState, chlorinationStep: step })}
              className={`p-2 rounded-lg text-center capitalize transition-all ${
                simState.chlorinationStep === step ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {step}
            </button>
          ))}
        </div>

        {/* Animated Chemical Step Display */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
          {simState.chlorinationStep === 'initiation' && (
            <div className="space-y-3">
              <span className="inline-block bg-amber-500/20 text-amber-300 text-xs px-3 py-1 rounded-full font-bold">Step 1: Initiation (Homolytic Cleavage by UV light)</span>
              <div className="text-2xl font-mono text-cyan-300 py-4 font-bold flex items-center justify-center gap-4">
                <span>Cl—Cl</span>
                <span className="text-amber-400 text-sm">hν (UV) →</span>
                <span>2 Cl•</span>
              </div>
              <p className="text-xs text-slate-400">Sunlight splits chlorine molecule homolytically into two chlorine free radicals with unpaired electrons.</p>
            </div>
          )}

          {simState.chlorinationStep === 'propagation1' && (
            <div className="space-y-3">
              <span className="inline-block bg-cyan-500/20 text-cyan-300 text-xs px-3 py-1 rounded-full font-bold">Step 2: Propagation Part 1 (Hydrogen Abstraction)</span>
              <div className="text-2xl font-mono text-cyan-300 py-4 font-bold flex items-center justify-center gap-4">
                <span>Cl• + CH₄</span>
                <span className="text-amber-400 text-sm">→</span>
                <span>HCl + •CH₃</span>
              </div>
              <p className="text-xs text-slate-400">Chlorine radical abstracts H atom from methane, forming HCl and generating a methyl radical.</p>
            </div>
          )}

          {simState.chlorinationStep === 'propagation2' && (
            <div className="space-y-3">
              <span className="inline-block bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full font-bold">Step 3: Propagation Part 2 (Radical Regeneration)</span>
              <div className="text-2xl font-mono text-cyan-300 py-4 font-bold flex items-center justify-center gap-4">
                <span>•CH₃ + Cl₂</span>
                <span className="text-amber-400 text-sm">→</span>
                <span>CH₃Cl + Cl•</span>
              </div>
              <p className="text-xs text-slate-400">Methyl radical attacks another Cl₂ molecule, producing chloromethane and regenerating Cl• to keep the chain going!</p>
            </div>
          )}

          {simState.chlorinationStep === 'termination' && (
            <div className="space-y-3">
              <span className="inline-block bg-rose-500/20 text-rose-300 text-xs px-3 py-1 rounded-full font-bold">Step 4: Termination (Radical Recombination)</span>
              <div className="text-lg font-mono text-rose-300 py-2 space-y-1 font-bold">
                <div>Cl• + Cl• → Cl₂</div>
                <div>•CH₃ + Cl• → CH₃Cl</div>
                <div>•CH₃ + •CH₃ → CH₃-CH₃ (Ethane trace!)</div>
              </div>
              <p className="text-xs text-slate-400">Two radicals collide and pair up their electrons, bringing the chain reaction to a close.</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Helper to render current visual based on slide type
  const renderSlideVisual = (type: SlideData['visualType']) => {
    switch (type) {
      case 'leibig': return renderLeibigVisualizer();
      case 'fission': return renderIntermediatesVisualizer();
      case 'intermediates': return renderIntermediatesVisualizer();
      case 'effects': return renderIntermediatesVisualizer();
      case 'hyperconjugation': return renderIntermediatesVisualizer();
      case 'sn1_sn2': return renderMechanismVisualizer();
      case 'e1_e2': return renderMechanismVisualizer();
      case 'conformations': return renderConformationVisualizer();
      case 'chlorination': return renderChlorinationVisualizer();
      default: return renderLeibigVisualizer();
    }
  };

  // Calculate Overall Mastery Level
  const overallMasteryScore = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach(id => {
      total += masteryProb(bktMap[id]);
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans select-none">
      {/* HEADER BAR */}
      <header className="max-w-6xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
            C11
          </div>
          <div>
            <h1 className="text-xl font-black bg-gradient-to-r from-amber-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Organic Quantitative Analysis & Mechanisms
            </h1>
            <p className="text-xs text-slate-400">Class 11 (ISC) Chemistry Interactive Virtual Lab</p>
          </div>
        </div>

        {/* Global Progress & Score */}
        <div className="flex items-center gap-6 text-xs">
          <div className="text-center">
            <span className="text-slate-400 block">Overall Mastery</span>
            <span className="text-lg font-black text-cyan-400">{overallMasteryScore}%</span>
          </div>
          <div className="text-center">
            <span className="text-slate-400 block">Lab Score</span>
            <span className="text-lg font-black text-amber-400">{score} pts</span>
          </div>
          <div className="w-28 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-amber-500 to-cyan-500 h-full transition-all duration-500"
              style={{ width: `${overallMasteryScore}%` }}
            />
          </div>
        </div>
      </header>

      {/* DISCOVERY MODAL BANNER */}
      {showDiscovery && (
        <div className="max-w-6xl mx-auto mb-6 bg-slate-900 border-2 border-amber-500/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Predict Before Learning
          </div>
          <h3 className="text-lg font-bold text-amber-400 mb-2">{SCENARIO.title}</h3>
          <p className="text-xs text-slate-300 mb-4">{SCENARIO.description}</p>
          
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4">
            <p className="text-sm font-semibold text-slate-100 mb-3">{DISCOVERY_QUESTION.question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={discoverySubmitted}
                  onClick={() => handleDiscoverySubmit(i)}
                  className={`p-3 text-xs text-left rounded-lg transition-all border ${
                    discoverySubmitted
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : i === discoverySelected
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:bg-slate-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {discoverySubmitted && (
            <div className="flex justify-between items-center text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-300">{DISCOVERY_QUESTION.explanation}</span>
              <button
                onClick={() => setShowDiscovery(false)}
                className="ml-4 px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400"
              >
                Enter Virtual Lab →
              </button>
            </div>
          )}
        </div>
      )}

      {/* MAIN NAVIGATION TABS */}
      <nav className="max-w-6xl mx-auto mb-6 flex rounded-xl bg-slate-900 p-1.5 border border-slate-800 text-xs font-bold gap-1">
        {[
          { id: 'learn', label: '1. Guided Teaching Slides' },
          { id: 'lab', label: '2. Virtual Lab Simulators' },
          { id: 'quiz', label: '3. Mastery Challenges' },
          { id: 'mastery', label: '4. Concept Mastery Map' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {audioManager.play('tap');  setActiveTab(tab.id as any); playFx('tap'); audioManager.play('whoosh'); }}
            className={`flex-1 py-2.5 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 shadow-md font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: GUIDED SLIDE DECK */}
      {activeTab === 'learn' && (
        <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  {currentSlide.nodeId}
                </span>
                <span className="text-xs text-slate-400 font-bold">
                  Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
              </div>
              
              <h2 className="text-xl font-black text-amber-400 mb-1">{currentSlide.title}</h2>
              <h3 className="text-xs font-semibold text-slate-400 mb-4">{currentSlide.subtitle}</h3>

              <div className="prose prose-invert text-xs text-slate-300 leading-relaxed mb-4 space-y-2">
                <p>{currentSlide.content}</p>
              </div>

              {/* ELI5 Box */}
              <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-xl mb-3 text-xs">
                <span className="font-bold text-amber-300 block mb-1">💡 ELI5 Analogy:</span>
                <p className="text-amber-100/90 italic">{currentSlide.eli5}</p>
              </div>

              {/* Misconception Box */}
              <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl text-xs">
                <span className="font-bold text-rose-300 block mb-1">⚠️ Common Misconception:</span>
                <p className="text-rose-100/90">{currentSlide.misconception}</p>
              </div>
            </div>

            {/* Slide Stepper Controls */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-800">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => {audioManager.play('tap');  setCurrentSlideIndex(prev => prev - 1); playFx('swoop'); }}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold disabled:opacity-40 hover:bg-slate-700"
              >
                ← Previous
              </button>
              <button
                onClick={() => {audioManager.play('tap'); 
                  if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                    setCurrentSlideIndex(prev => prev + 1);
                    playFx('swoop');
                  } else {
                    setActiveTab('lab');
                  }
                }}
                className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-black hover:bg-amber-400"
              >
                {currentSlideIndex === TEACHING_SLIDES.length - 1 ? 'Go to Virtual Lab →' : 'Next Concept →'}
              </button>
            </div>
          </div>

          {/* Slide Visual Display */}
          <div className="lg:col-span-7">
            {renderSlideVisual(currentSlide.visualType)}
          </div>
        </main>
      )}

      {/* TAB 2: VIRTUAL LAB SIMULATORS */}
      {activeTab === 'lab' && (
        <main className="max-w-6xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs text-slate-300 flex items-center justify-between">
            <span>🔬 Select any interactive visualizer tab below to explore chemistry hands-on:</span>
            <span className="text-amber-400 font-bold">10 Syllabus Nodes Covered</span>
          </div>

          <div className="space-y-6">
            {renderLeibigVisualizer()}
            {renderIntermediatesVisualizer()}
            {renderMechanismVisualizer()}
            {renderConformationVisualizer()}
            {renderChlorinationVisualizer()}
          </div>
        </main>
      )}

      {/* TAB 3: MASTERY CHALLENGES */}
      {activeTab === 'quiz' && (
        <main className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
          <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                Node: {currentChallenge.nodeId}
              </span>
              <h3 className="text-lg font-bold text-amber-400 mt-1">{currentChallenge.title}</h3>
            </div>
            <span className="text-xs text-slate-400 font-bold">
              Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
            </span>
          </div>

          {/* Question Text */}
          <p className="text-sm font-semibold text-slate-200 mb-6">{currentChallenge.question}</p>

          {/* Options or Calculation Input */}
          {currentChallenge.type === 'calculation' ? (
            <div className="space-y-4 mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Enter Carbon Percentage (%C):</label>
                  <input
                    type="number" step="0.01"
                    placeholder="e.g. 54.55"
                    value={userCalcC}
                    onChange={(e) => setUserCalcC(e.target.value)}
                    disabled={quizSubmitted}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-cyan-300 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Enter Hydrogen Percentage (%H):</label>
                  <input
                    type="number" step="0.01"
                    placeholder="e.g. 9.09"
                    value={userCalcH}
                    onChange={(e) => setUserCalcH(e.target.value)}
                    disabled={quizSubmitted}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-blue-300 font-bold"
                  />
                </div>
              </div>
              <button
                disabled={quizSubmitted || !userCalcC || !userCalcH}
                onClick={() => handleAnswerSubmit()}
                className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 disabled:opacity-40 text-xs"
              >
                Submit Calculation
              </button>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              {currentChallenge.options.map((opt, i) => (
                <button
                  key={i}
                  disabled={quizSubmitted}
                  onClick={() => handleAnswerSubmit(i)}
                  className={`w-full p-3.5 text-xs text-left rounded-xl transition-all border font-medium ${
                    quizSubmitted
                      ? i === currentChallenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-md'
                        : i === selectedOption
                        ? 'bg-rose-950/90 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 opacity-60'
                      : selectedOption === i
                      ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Explanation Banner */}
          {quizSubmitted && (
            <div className={`p-4 rounded-xl border text-xs mb-6 ${
              (selectedOption === currentChallenge.correctIndex || currentChallenge.type === 'calculation')
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                : 'bg-rose-950/60 border-rose-800 text-rose-200'
            }`}>
              <span className="font-bold block mb-1">Chemical Explanation:</span>
              <p>{currentChallenge.explanation}</p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1"
            >
              💡 Need a Hint?
            </button>
            {quizSubmitted && (
              <button
                onClick={handleNextChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-black rounded-xl text-xs hover:opacity-90"
              >
                {currentChallengeIndex === CHALLENGES.length - 1 ? 'Finish Lab & View Mastery →' : 'Next Challenge →'}
              </button>
            )}
          </div>

          <HintBubble show={showHint} text={currentChallenge.hint} />
        </main>
      )}

      {/* TAB 4: CONCEPT MASTERY MAP & SRS STATUS */}
      {activeTab === 'mastery' && (
        <main className="max-w-6xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-black text-amber-400 mb-1">Class 11 ISC Chemistry Syllabus Node Mastery Map</h3>
            <p className="text-xs text-slate-400 mb-6">Bayesian Knowledge Tracing (BKT) and Spaced Repetition (SRS) Status for all 10 nodes.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_NODE_IDS.map(id => {
                const bkt = bktMap[id];
                const pMastery = bkt?.pKnown ?? 0;
                const slide = TEACHING_SLIDES.find(s => s.nodeId === id);

                return (
                  <div key={id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 block">{id}</span>
                      <h4 className="text-xs font-bold text-slate-200 mt-0.5">{slide?.title || id}</h4>
                      <span className="text-[10px] text-slate-500 block mt-1">P(Mastery): {(pMastery * 100).toFixed(1)}%</span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        pMastery > 0.8 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        pMastery > 0.5 ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {pMastery > 0.8 ? 'Mastered' : pMastery > 0.5 ? 'Practicing' : 'Novice'}
                      </span>
                      <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-cyan-500 h-full transition-all duration-300"
                          style={{ width: `${pMastery * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}

      {/* FX OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
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

// ==========================================
// DEFAULT PROPS & EXPORT STATEMENT
// ==========================================
C11_ChemistryQuantitativeanalysisSim.defaultProps = {
  subject: SUBJECT_CONFIG.chemistry?.name || 'Chemistry',
  grade: 'Class 11 (ISC)',
  topicNodes: ALL_NODE_IDS
};