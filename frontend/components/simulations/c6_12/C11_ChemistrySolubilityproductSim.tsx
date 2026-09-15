"use client";

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

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Solubility product applies to unsaturated solutions of sparingly soluble salts",
    description: "Students believe that the solubility product expression (Ksp) can be calculated using ion concentrations from any solution, including unsaturated ones.",
    correction: "The solubility product constant (Ksp) is strictly defined for a saturated solution at dynamic equilibrium between undissolved solid and its dissolved ions. For unsaturated or non-equilibrium solutions, the product of ion concentrations is termed the Ionic Product (Qsp), not Ksp. Precipitation occurs only when Qsp exceeds Ksp.",
  },
  {
    id: "misc_2",
    title: "Higher solubility product value always implies greater molar solubility",
    description: "Students often assume that a salt with a larger Ksp value will automatically have higher molar solubility than a salt with a smaller Ksp value.",
    correction: "Direct comparison of Ksp values to determine relative solubility is only valid for salts with the same stoichiometric ratio of ions (e.g., comparing AgCl with AgBr). For salts with different stoichiometries (such as 1:1 AgCl vs 1:2 Ag2CrO4), molar solubility (s) must be explicitly calculated from Ksp before comparing. A salt with a smaller Ksp can sometimes have a higher molar solubility depending on its stoichiometry.",
  },
  {
    id: "misc_3",
    title: "Adding a common ion changes the solubility product value",
    description: "Students frequently think that adding a strong electrolyte containing a common ion decreases the Ksp value of a sparingly soluble salt.",
    correction: "Ksp is an equilibrium constant that depends solely on temperature and remains unchanged upon adding a common ion. The common ion effect suppresses the molar solubility (s) of the salt by shifting the equilibrium backward according to Le Chatelier's principle. While ion concentrations adjust, their equilibrium product expression continues to equal the constant Ksp value.",
  },
  {
    id: "misc_4",
    title: "Salt with lower solubility product always precipitates first",
    description: "Students assume that during selective precipitation of mixed ions, the salt with the smaller Ksp value will always precipitate out first.",
    correction: "Precipitation order depends on the minimum reagent ion concentration required to make Qsp exceed Ksp for each salt. If the salts have different stoichiometric formulas or unequal initial concentrations of cations, the salt requiring the lower concentration of precipitating reagent drops out first. This required concentration does not depend solely on Ksp values.",
  },
  {
    id: "misc_5",
    title: "Amount of undissolved solid affects solubility product and equilibrium",
    description: "Students believe that adding more undissolved solid solute to a saturated solution increases ion concentrations and alters Ksp.",
    correction: "The concentration/activity of a pure solid phase is constant and taken as unity, so it does not appear in the Ksp expression. As long as some solid phase is present to maintain dynamic equilibrium, adding more solid does not change the equilibrium ion concentrations or the Ksp value. Ksp remains constant at a fixed temperature regardless of the amount of excess solid.",
  },
];

// ==========================================
// NODE IDS COVERED BY THIS SIMULATION
// ==========================================
export const ALL_NODE_IDS = [
  'c11_chem_061', // Solubility product
  'c11_chem_062', // Redox reactions - concept
  'c11_chem_063', // Oxidation number
  'c11_chem_064', // Balancing redox reactions
  'c11_chem_065', // Organic chemistry - introduction and vital force theory
  'c11_chem_066', // Classification of organic compounds
  'c11_chem_067', // IUPAC nomenclature
  'c11_chem_068', // Structural isomerism
  'c11_chem_069', // Stereoisomerism
  'c11_chem_070', // Qualitative analysis (Lassaigne's test)
] as const;

export type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES AND INTERFACES
// ==========================================
export type SimTab = 'discovery' | 'visuals' | 'challenges' | 'applications';

export interface ChallengeOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: ChallengeOption[];
  hint: string;
  misconceptionId?: string;
  difficulty: 'foundation' | 'standard' | 'advanced';
}

export interface MisconceptionData {
  id: string;
  title: string;
  description: string;
  correction: string;
}

export interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  text: string;
  keyFormula?: string;
  visualType: 'ksp' | 'redox' | 'oxnum' | 'balancing' | 'organic_intro' | 'classification' | 'iupac' | 'isomerism' | 'stereoisomerism' | 'lassaigne';
}

// ==========================================
// SCENARIO & CURRICULUM DATA
// ==========================================
const SCENARIO = {
  title: "Class 11 ISC Chemistry: Physical & Organic Laboratory Masterclass",
  subtitle: "Explore Equilibrium, Redox Dynamics, Organic Structure, Nomenclature & Qualitative Analysis",
  narrative: "Welcome to the Advanced ISC Chemistry Virtual Laboratory! Here, theoretical chemical principles come alive through interactive visual experimentation. Work through solubility equilibria, master electron transfer bookkeeping, explore organic structures, systematically name molecules, and perform element detection through sodium fusion.",
};

const MISCONCEPTIONS: Record<string, MisconceptionData> = {
  ksp_vs_solubility: {
    id: 'ksp_vs_solubility',
    title: 'Ksp vs Molar Solubility',
    description: 'Confusing solubility product Ksp with molar solubility s.',
    correction: 'Ksp is an equilibrium constant at constant temperature (e.g. Ksp = 4s³ for AB₂ salts), whereas s is molar solubility in mol/L.',
  },
  common_ion_increases_solubility: {
    id: 'common_ion_increases_solubility',
    title: 'Common Ion Effect',
    description: 'Believing that adding a common ion increases solubility.',
    correction: 'According to Le Chatelier’s principle, adding a common ion shifts the dissolution equilibrium to the left, suppressing salt solubility.',
  },
  oxidizing_agent_is_oxidized: {
    id: 'oxidizing_agent_is_oxidized',
    title: 'Oxidizing Agent Identity',
    description: 'Thinking the oxidizing agent is itself oxidized.',
    correction: 'The oxidizing agent gains electrons and is REDUCED, while causing another species to be oxidized.',
  },
  oxygen_always_minus_two: {
    id: 'oxygen_always_minus_two',
    title: 'Oxygen Oxidation State',
    description: 'Assuming oxygen has an oxidation state of -2 in all compounds.',
    correction: 'In peroxides like H₂O₂ or Na₂O₂ oxygen is -1, and in OF₂ oxygen is +2 because fluorine is more electronegative.',
  },
  vital_force_persistent: {
    id: 'vital_force_persistent',
    title: 'Vital Force Theory',
    description: 'Believing organic compounds can only originate from living organisms.',
    correction: 'Friedrich Wöhler disproved vital force theory in 1828 by synthesizing organic urea from inorganic ammonium cyanate.',
  },
  all_rings_are_aromatic: {
    id: 'all_rings_are_aromatic',
    title: 'Ring Aromaticity',
    description: 'Assuming any cyclic organic molecule is aromatic.',
    correction: 'Aromaticity requires a planar, cyclic, fully conjugated ring with (4n + 2) pi electrons (Hückel rule). Cyclohexane is alicyclic, not aromatic.',
  },
  racemic_is_meso: {
    id: 'racemic_is_meso',
    title: 'Racemic Mixture vs Meso Form',
    description: 'Confusing racemic mixtures with meso forms.',
    correction: 'A racemic mixture is an equimolar external mixture of d- and l- enantiomers. A meso form is a single achiral compound rendered optically inactive through internal compensation.',
  },
};

// ==========================================
// TEACHING SLIDES
// ==========================================
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_c11_chem_061',
    nodeId: 'c11_chem_061',
    title: '1. Solubility Product & Common Ion Effect',
    subtitle: 'Quantitative Saturated Solutions',
    text: 'For a sparingly soluble salt A_x B_y (s) ⇌ x A^y+ (aq) + y B^x- (aq), the solubility product constant is Ksp = [A^y+]^x [B^x-]^y. Comparing Ionic Product Q with Ksp predicts precipitation: Q > Ksp gives precipitate, Q < Ksp remains unsaturated. Adding a common ion suppresses solubility!',
    keyFormula: 'Ksp = [A^y+]^x [B^x-]^y  |  s = (Ksp/4)^(1/3) for AB₂',
    visualType: 'ksp',
  },
  {
    id: 'slide_c11_chem_062',
    nodeId: 'c11_chem_062',
    title: '2. Redox Concept & Electron Transfer',
    subtitle: 'OIL RIG: Oxidation is Loss, Reduction is Gain',
    text: 'Redox reactions involve simultaneous electron transfer. Oxidation is loss of electrons (increase in oxidation state); reduction is gain of electrons (decrease in oxidation state). The oxidizing agent gets reduced; the reducing agent gets oxidized.',
    keyFormula: 'Zn (s) + Cu²⁺ (aq) → Zn²⁺ (aq) + Cu (s)',
    visualType: 'redox',
  },
  {
    id: 'slide_c11_chem_063',
    nodeId: 'c11_chem_063',
    title: '3. Oxidation Numbers & Bookkeeping',
    subtitle: 'Formal Charge Rules',
    text: 'Oxidation state is the hypothetical ionic charge of an atom. Rules: Free element = 0; Group 1 = +1; F = -1; O = -2 (except peroxides -1, OF₂ +2); H = +1 (except hydrides -1). Sum in neutral molecule = 0, in polyatomic ion = charge.',
    keyFormula: 'In K₂Cr₂O₇: 2(+1) + 2x + 7(-2) = 0  ⇒  x = +6',
    visualType: 'oxnum',
  },
  {
    id: 'slide_c11_chem_064',
    nodeId: 'c11_chem_064',
    title: '4. Balancing Redox Reactions',
    subtitle: 'Ion-Electron Method in Acidic & Basic Media',
    text: 'Split into oxidation and reduction half-reactions. Balance atoms other than O and H. Balance O with H₂O, H with H⁺. Balance charge by adding electrons e⁻. Equalize electrons lost and gained, then combine!',
    keyFormula: 'MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O',
    visualType: 'balancing',
  },
  {
    id: 'slide_c11_chem_065',
    nodeId: 'c11_chem_065',
    title: '5. Organic Chemistry & Wöhler Synthesis',
    subtitle: 'Shattering the Vital Force Theory',
    text: 'Before 1828, chemists believed organic compounds required a living "vital force". Friedrich Wöhler heated inorganic ammonium cyanate NH₄OCN and synthesized organic urea NH₂CONH₂. Carbon forms millions of compounds due to tetravalency and catenation.',
    keyFormula: 'NH₄OCN (inorganic) —Δ→ NH₂CONH₂ (organic urea)',
    visualType: 'organic_intro',
  },
  {
    id: 'slide_c11_chem_066',
    nodeId: 'c11_chem_066',
    title: '6. Classification of Organic Compounds',
    subtitle: 'Acyclic vs Cyclic, Homocyclic vs Heterocyclic',
    text: 'Organic molecules are open-chain (aliphatic) or closed-chain (cyclic). Homocyclic rings contain only carbon (e.g. cyclohexane, benzene). Heterocyclic rings contain non-carbon heteroatoms like N, O, S (e.g. pyridine, furan).',
    keyFormula: 'Aromatic (Hückel 4n+2 π electrons) vs Alicyclic',
    visualType: 'classification',
  },
  {
    id: 'slide_c11_chem_067',
    nodeId: 'c11_chem_067',
    title: '7. IUPAC Nomenclature System',
    subtitle: 'Systematic Naming Rules',
    text: 'Find the longest continuous carbon chain containing principal functional group. Number chain to give functional group and branches the lowest locants. Order substituents alphabetically. Priority: -COOH > -COOR > -CONH₂ > -CHO > -CO- > -OH > -NH₂ > C=C > C≡C.',
    keyFormula: '3-hydroxybutanoic acid  |  2-methylpropan-2-ol',
    visualType: 'iupac',
  },
  {
    id: 'slide_c11_chem_068',
    nodeId: 'c11_chem_068',
    title: '8. Structural Isomerism',
    subtitle: 'Same Formula, Different Connectivity',
    text: 'Types of structural isomerism: 1. Chain (skeletal) 2. Position (group location) 3. Functional (different functional group e.g. ethanol vs dimethyl ether) 4. Metamerism (alkyl groups around polyvalent atom) 5. Tautomerism (keto-enol dynamic equilibrium).',
    keyFormula: 'C₂H₆O: CH₃CH₂OH (alcohol) & CH₃OCH₃ (ether)',
    visualType: 'isomerism',
  },
  {
    id: 'slide_c11_chem_069',
    nodeId: 'c11_chem_069',
    title: '9. Stereoisomerism',
    subtitle: '3D Spatial Arrangement & Optical Activity',
    text: 'Geometrical isomerism (cis/trans) requires restricted rotation (C=C or ring) and 2 different groups on each carbon. Optical isomerism requires a chiral center (carbon attached to 4 different groups). d- and l- enantiomers rotate plane polarized light.',
    keyFormula: 'Racemic (external compensation) vs Meso (internal plane of symmetry)',
    visualType: 'stereoisomerism',
  },
  {
    id: 'slide_c11_chem_070',
    nodeId: 'c11_chem_070',
    title: '10. Qualitative Analysis: Lassaigne’s Test',
    subtitle: 'Sodium Fusion for N, S, and Halogens',
    text: 'Covalent organic elements converted to ionic sodium extract by sodium fusion: NaCN (for N), Na₂S (for S), NaX (for Halogens). Nitrogen gives Prussian blue Fe₄[Fe(CN)₆]₃ with FeSO₄/H₂SO₄. Sulphur gives violet colour with sodium nitroprusside.',
    keyFormula: 'Fe³⁺ + [Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ (Prussian Blue)',
    visualType: 'lassaigne',
  },
];

// ==========================================
// CHALLENGES (PROGRESSIVE ADAPTIVE QUESTIONS)
// ==========================================
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_c11_chem_061_1',
    nodeId: 'c11_chem_061',
    title: 'Ksp Calculation for AB₂ Salt',
    question: 'The solubility product Ksp of Calcium Fluoride CaF₂ is 3.9 × 10⁻¹¹. What is the algebraic relation between Ksp and molar solubility s?',
    difficulty: 'standard',
    hint: 'Dissociation: CaF₂ ⇌ Ca²⁺ + 2F⁻. If [Ca²⁺] = s, then [F⁻] = 2s.',
    misconceptionId: 'ksp_vs_solubility',
    options: [
      { id: 'opt_a', text: 'Ksp = 4s³', isCorrect: true, explanation: 'Correct! Ksp = [Ca²⁺][F⁻]² = (s)(2s)² = 4s³.' },
      { id: 'opt_b', text: 'Ksp = s²', isCorrect: false, explanation: 'Incorrect! Ksp = s² applies to AB salts like AgCl.' },
      { id: 'opt_c', text: 'Ksp = 2s²', isCorrect: false, explanation: 'Incorrect! Remember to square the term (2s)² = 4s².' },
      { id: 'opt_d', text: 'Ksp = s³', isCorrect: false, explanation: 'Incorrect! You missed the coefficient 2 on fluoride ion.' },
    ],
  },
  {
    id: 'ch_c11_chem_062_1',
    nodeId: 'c11_chem_062',
    title: 'Identifying Agents in Redox',
    question: 'In the reaction: Zn (s) + 2HCl (aq) → ZnCl₂ (aq) + H₂ (g), which species acts as the reducing agent?',
    difficulty: 'foundation',
    hint: 'The reducing agent undergoes oxidation (loses electrons / oxidation state increases).',
    misconceptionId: 'oxidizing_agent_is_oxidized',
    options: [
      { id: 'opt_a', text: 'Zn (s)', isCorrect: true, explanation: 'Correct! Zinc loses 2 electrons (oxidation state 0 → +2), so it is oxidised and acts as the reducing agent.' },
      { id: 'opt_b', text: 'H⁺ (aq) from HCl', isCorrect: false, explanation: 'Incorrect! H⁺ gains electrons and is reduced, acting as the oxidizing agent.' },
      { id: 'opt_c', text: 'Cl⁻ (aq)', isCorrect: false, explanation: 'Incorrect! Cl⁻ is a spectator ion with oxidation state -1 throughout.' },
      { id: 'opt_d', text: 'H₂ (g)', isCorrect: false, explanation: 'Incorrect! H₂ is the reduction product.' },
    ],
  },
  {
    id: 'ch_c11_chem_063_1',
    nodeId: 'c11_chem_063',
    title: 'Oxidation Number of Chromium',
    question: 'Calculate the oxidation state of Chromium in Potassium Dichromate, K₂Cr₂O₇.',
    difficulty: 'standard',
    hint: 'Potassium is +1, Oxygen is -2. Sum of oxidation states = 0.',
    misconceptionId: 'oxygen_always_minus_two',
    options: [
      { id: 'opt_a', text: '+6', isCorrect: true, explanation: 'Correct! 2(+1) + 2x + 7(-2) = 0 ⇒ 2x = 12 ⇒ x = +6 per Cr atom.' },
      { id: 'opt_b', text: '+12', isCorrect: false, explanation: 'Incorrect! +12 is the sum for both Cr atoms; oxidation state is per atom (+6).' },
      { id: 'opt_c', text: '+3', isCorrect: false, explanation: 'Incorrect! +3 is the reduction product in acidic dichromate titrations.' },
      { id: 'opt_d', text: '+7', isCorrect: false, explanation: 'Incorrect! +7 is the oxidation state of Mn in KMnO₄.' },
    ],
  },
  {
    id: 'ch_c11_chem_064_1',
    nodeId: 'c11_chem_064',
    title: 'Balancing Permanganate Redox Half-Reaction',
    question: 'How many H⁺ ions and electrons e⁻ are needed to balance the reduction half-reaction: MnO₄⁻ → Mn²⁺ in acidic medium?',
    difficulty: 'advanced',
    hint: 'Balance 4 Oxygen atoms with 4 H₂O on the right, then hydrogen atoms with H⁺ on the left.',
    options: [
      { id: 'opt_a', text: '8 H⁺ on left, 5 e⁻ on left', isCorrect: true, explanation: 'Correct! MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O balances both atoms and charge (+7 to +2).' },
      { id: 'opt_b', text: '4 H⁺ on left, 5 e⁻ on right', isCorrect: false, explanation: 'Incorrect! 4 H₂O requires 8 H⁺ on the left, and electrons must be on the left for reduction.' },
      { id: 'opt_c', text: '8 H⁺ on left, 3 e⁻ on left', isCorrect: false, explanation: 'Incorrect! Mn changes from +7 in permanganate to +2, requiring 5 electrons.' },
      { id: 'opt_d', text: '16 H⁺ on left, 10 e⁻ on left', isCorrect: false, explanation: 'Incorrect! These coefficients are doubled.' },
    ],
  },
  {
    id: 'ch_c11_chem_065_1',
    nodeId: 'c11_chem_065',
    title: 'Wöhler Synthesis of Urea',
    question: 'Which inorganic salt did Friedrich Wöhler heat in 1828 to synthesize organic urea, disproving vital force theory?',
    difficulty: 'foundation',
    hint: 'It is an inorganic cyanate salt containing ammonium ions.',
    misconceptionId: 'vital_force_persistent',
    options: [
      { id: 'opt_a', text: 'Ammonium cyanate (NH₄OCN)', isCorrect: true, explanation: 'Correct! Heating inorganic NH₄OCN isomerized it into organic urea NH₂CONH₂.' },
      { id: 'opt_b', text: 'Ammonium carbonate', isCorrect: false, explanation: 'Incorrect! Ammonium carbonate yields ammonia and CO₂.' },
      { id: 'opt_c', text: 'Sodium cyanide', isCorrect: false, explanation: 'Incorrect! Sodium cyanide is used in Lassaigne’s test.' },
      { id: 'opt_d', text: 'Potassium cyanate', isCorrect: false, explanation: 'Incorrect! Potassium cyanate reacts with ammonium sulfate to form ammonium cyanate.' },
    ],
  },
  {
    id: 'ch_c11_chem_066_1',
    nodeId: 'c11_chem_066',
    title: 'Classification of Heterocyclic Aromatic Compounds',
    question: 'Why is Pyridine (C₅H₅N) classified as a heterocyclic aromatic compound?',
    difficulty: 'standard',
    hint: 'Look at the atoms comprising the ring and whether it satisfies Hückel’s rule.',
    misconceptionId: 'all_rings_are_aromatic',
    options: [
      { id: 'opt_a', text: 'Its ring contains one Nitrogen heteroatom and satisfies (4n+2) π-electron aromaticity.', isCorrect: true, explanation: 'Correct! Nitrogen replaces one carbon in the aromatic conjugated 6 π-electron ring.' },
      { id: 'opt_b', text: 'It has a non-planar carbon chain with alternating bonds.', isCorrect: false, explanation: 'Incorrect! Pyridine is a planar conjugated ring system.' },
      { id: 'opt_c', text: 'It is homocyclic because all outer hydrogens are attached to carbons.', isCorrect: false, explanation: 'Incorrect! Having Nitrogen inside the ring makes it heterocyclic.' },
      { id: 'opt_d', text: 'It is alicyclic because it behaves like an open-chain amine.', isCorrect: false, explanation: 'Incorrect! Pyridine displays aromatic stability, unlike alicyclic piperidine.' },
    ],
  },
  {
    id: 'ch_c11_chem_067_1',
    nodeId: 'c11_chem_067',
    title: 'IUPAC Naming with Priority Functional Groups',
    question: 'What is the correct IUPAC name for CH₃–CH(OH)–CH₂–COOH?',
    difficulty: 'advanced',
    hint: 'Carboxylic acid (-COOH) has higher priority than alcohol (-OH). Number from -COOH carbon as C1.',
    options: [
      { id: 'opt_a', text: '3-hydroxybutanoic acid', isCorrect: true, explanation: 'Correct! C1 is -COOH, C3 has -OH substituent prefix "hydroxy", parent is 4-carbon acid.' },
      { id: 'opt_b', text: '2-hydroxybutanoic acid', isCorrect: false, explanation: 'Incorrect! Numbering starts at -COOH (C1), so -OH is on C3, not C2.' },
      { id: 'opt_c', text: '3-hydroxybutanol', isCorrect: false, explanation: 'Incorrect! The principal suffix is -oic acid, not -ol.' },
      { id: 'opt_d', text: '4-hydroxybutan-2-one', isCorrect: false, explanation: 'Incorrect! There is no ketone group present.' },
    ],
  },
  {
    id: 'ch_c11_chem_068_1',
    nodeId: 'c11_chem_068',
    title: 'Functional Group Isomerism',
    question: 'Ethanol (CH₃CH₂OH) and Dimethyl Ether (CH₃OCH₃) share the same molecular formula C₂H₆O. What type of structural isomerism do they show?',
    difficulty: 'foundation',
    hint: 'One is an alcohol (-OH) and the other is an ether (-O-).',
    options: [
      { id: 'opt_a', text: 'Functional group isomerism', isCorrect: true, explanation: 'Correct! They possess different functional groups (alcohol vs ether) with identical molecular formula.' },
      { id: 'opt_b', text: 'Chain isomerism', isCorrect: false, explanation: 'Incorrect! Chain isomerism requires different carbon skeletons within the same functional family.' },
      { id: 'opt_c', text: 'Position isomerism', isCorrect: false, explanation: 'Incorrect! Position isomerism keeps the same functional group in a different locant position.' },
      { id: 'opt_d', text: 'Tautomerism', isCorrect: false, explanation: 'Incorrect! Ethanol and dimethyl ether are not in dynamic equilibrium.' },
    ],
  },
  {
    id: 'ch_c11_chem_069_1',
    nodeId: 'c11_chem_069',
    title: 'Optical Activity: Racemic vs Meso',
    question: 'Why is a meso form of Tartaric Acid optically inactive, whereas a Racemic mixture is also optically inactive?',
    difficulty: 'advanced',
    hint: 'Differentiate between internal compensation within a single molecule vs external compensation between two enantiomers.',
    misconceptionId: 'racemic_is_meso',
    options: [
      { id: 'opt_a', text: 'Meso form is internally compensated by a plane of symmetry; Racemic mixture is externally compensated by 50:50 d/l enantiomers.', isCorrect: true, explanation: 'Correct! Meso tartaric acid has an internal mirror plane; a racemic mixture contains equal d and l molecules.' },
      { id: 'opt_b', text: 'Both are identical single compounds without chiral centers.', isCorrect: false, explanation: 'Incorrect! Both contain chiral centers.' },
      { id: 'opt_c', text: 'Meso form rotates light to the right; Racemic rotates light to the left.', isCorrect: false, explanation: 'Incorrect! Neither rotates plane polarized light overall.' },
      { id: 'opt_d', text: 'Racemic is internally compensated; Meso is an external mixture.', isCorrect: false, explanation: 'Incorrect! The definitions are swapped.' },
    ],
  },
  {
    id: 'ch_c11_chem_070_1',
    nodeId: 'c11_chem_070',
    title: 'Lassaigne Test for Nitrogen',
    question: 'In Lassaigne’s test for Nitrogen, what is the chemical formula and characteristic colour of the precipitate formed upon treating the sodium extract with FeSO₄ and dilute H₂SO₄?',
    difficulty: 'standard',
    hint: 'The precipitate is ferric ferrocyanide.',
    options: [
      { id: 'opt_a', text: 'Prussian Blue, Fe₄[Fe(CN)₆]₃', isCorrect: true, explanation: 'Correct! Sodium cyanide forms ferrocyanide, which reacts with ferric ions to form Prussian blue Fe₄[Fe(CN)₆]₃.' },
      { id: 'opt_b', text: 'Violet complex, [Fe(CN)₅NOS]⁴⁻', isCorrect: false, explanation: 'Incorrect! The violet complex with sodium nitroprusside confirms Sulphur.' },
      { id: 'opt_c', text: 'White precipitate, AgCl', isCorrect: false, explanation: 'Incorrect! AgCl confirms Chlorine.' },
      { id: 'opt_d', text: 'Black precipitate, PbS', isCorrect: false, explanation: 'Incorrect! PbS confirms Sulphur with lead acetate.' },
    ],
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_ChemistrySolubilityproductSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // State variables
  const [activeTab, setActiveTab] = useState<SimTab>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Gamification & Mastery State
  const [score, setScore] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  // Discovery Question State
  const [discoveryPrediction, setDiscoveryPrediction] = useState<string | null>(null);
  const [discoveryRevealed, setDiscoveryRevealed] = useState(false);

  // Adaptive BKT State per Node
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Partial<Record<NodeId, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // Interactive Visual Lab Controls
  // Lab 1: Ksp Lab
  const [addedNaCl, setAddedNaCl] = useState(0); // Common ion conc in M
  const [addedAgNO3, setAddedAgNO3] = useState(0.001); // M conc
  // Lab 2: Oxidation State Calculator
  const [selectedOxMol, setSelectedOxMol] = useState<'KMnO4' | 'K2Cr2O7' | 'H2O2' | 'S2O3'>('K2Cr2O7');
  // Lab 3: IUPAC Chain Builder
  const [iupacChainLength, setIupacChainLength] = useState(4);
  const [iupacSubstituentPos, setIupacSubstituentPos] = useState(2);
  const [iupacFunctionalGroup, setIupacFunctionalGroup] = useState<'alkane' | 'ol' | 'oic_acid' | 'one'>('ol');
  // Lab 4: Stereoisomerism Polarimeter
  const [polarimeterAngle, setPolarimeterAngle] = useState(0);
  const [activeIsomer, setActiveIsomer] = useState<'d' | 'l' | 'meso' | 'racemic'>('d');
  // Lab 5: Lassaigne Fusion Test Tube
  const [fusionStep, setFusionStep] = useState<0 | 1 | 2 | 3>(0);
  const [testElement, setTestElement] = useState<'N' | 'S' | 'Cl'>('N');

  // Inactivity Auto-Hint Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'challenges' && !isAnswerSubmitted && !showHint) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
    return () => clearTimeout(timer);
  }, [activeTab, currentChallengeIndex, isAnswerSubmitted, showHint]);

  // Current Challenge Data
  const challenge = CHALLENGES[currentChallengeIndex];

  // Calculated overall mastery
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id]));
    const sum = levels.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Handle Challenge Option Selection
  const handleSelectOption = (optionId: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOptionId(optionId);
    audioManager.play('tap');
  };

  // Submit Challenge Answer
  const handleSubmitAnswer = () => {
    if (!selectedOptionId || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const selectedOpt = challenge.options.find((o) => o.id === selectedOptionId);
    const isCorrect = selectedOpt?.isCorrect ?? false;

    // BKT & SRS update
    const prevBkt = bktStates[challenge.nodeId];
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
        const _reviewItem = createReviewItem('C11_ChemistrySolubil', 'challenge');
        sm2Update(_reviewItem, 4, 0);
    setBktStates((prev) => ({ ...prev, [challenge.nodeId]: updatedBkt }));

    // Audio & Visual Effects
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setScore((prev) => prev + 10);
      setFeedbackText(selectedOpt?.explanation || 'Excellent work!');
      speechManager.speak(`Correct! ${selectedOpt?.explanation}`);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      setShowSparkle(true);
      if (currentChallengeIndex === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        recordGameScore(ALL_NODE_IDS, score + 10);
        if (onComplete) onComplete(score + 10);
      }
    } else {
      audioManager.play('drop-wrong');
      const misc = challenge.misconceptionId ? MISCONCEPTIONS[challenge.misconceptionId] : null;
      const explanation = selectedOpt?.explanation || 'Incorrect.';
      const misconceptionCorrection = misc ? ` Misconception alert: ${misc.correction}` : '';
      setFeedbackText(`${explanation}${misconceptionCorrection}`);
      speechManager.speak(`Not quite. ${explanation}`);
    }
  };

  // Move to Next Challenge
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerSubmitted(false);
      setFeedbackText('');
      setShowHint(false);
      setShowSparkle(false);
      audioManager.play('whoosh');
    }
  };

  // Discovery Prediction submit
  const handleDiscoverySubmit = (choice: string) => {
    setDiscoveryPrediction(choice);
    setDiscoveryRevealed(true);
    audioManager.play('pop');
    speechManager.speak("Let's analyze this chemistry prediction!");
  };

  // Calculated Ksp Values for Lab
  const kspAgCl = 1.8e-10;
  // [Cl-] total = addedNaCl + solubility contribution
  const concAg = addedAgNO3;
  const concCl = 0.001 + addedNaCl;
  const ionicProductQ = concAg * concCl;
  const isPrecipitated = ionicProductQ > kspAgCl;

  // Polarimeter Effect
  useEffect(() => {
    if (activeIsomer === 'd') setPolarimeterAngle(45);
    else if (activeIsomer === 'l') setPolarimeterAngle(-45);
    else setPolarimeterAngle(0);
  }, [activeIsomer]);

  // IUPAC Calculated Name
  const calculatedIupacName = useMemo(() => {
    const parentNames: Record<number, string> = { 3: 'propan', 4: 'butan', 5: 'pentan', 6: 'hexan' };
    const parent = parentNames[iupacChainLength] || 'butan';
    if (iupacFunctionalGroup === 'alkane') {
      return `${iupacSubstituentPos}-methyl${parent}e`;
    } else if (iupacFunctionalGroup === 'ol') {
      return `${parent}-${iupacSubstituentPos}-ol`;
    } else if (iupacFunctionalGroup === 'oic_acid') {
      return `${iupacSubstituentPos}-methyl${parent}oic acid`;
    } else {
      return `${parent}-${iupacSubstituentPos}-one`;
    }
  }, [iupacChainLength, iupacSubstituentPos, iupacFunctionalGroup]);

  return (
    <div className="w-full max-w-6xl mx-auto min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 rounded-2xl shadow-2xl font-sans flex flex-col justify-between">
      {/* Top Header & Mastery Bar */}
      <header className="border-b border-slate-800 pb-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
              Class 11 (ISC) Chemistry
            </span>
            <h1 className="text-2xl md:text-3xl font-bold mt-1 text-white tracking-tight">
              {SCENARIO.title}
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">{SCENARIO.subtitle}</p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <div className="text-right">
              <div className="text-xs text-slate-400">Mastery Level</div>
              <div className="text-xl font-extrabold text-emerald-400">{overallMastery}%</div>
            </div>
            <div className="w-24 bg-slate-700 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-500"
                style={{ width: `${overallMastery}%` }}
              />
            </div>
            <div className="border-l border-slate-700 pl-3 text-right">
              <div className="text-xs text-slate-400">Score</div>
              <div className="text-xl font-black text-amber-400">{score} pts</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex gap-2 mt-5 overflow-x-auto pb-1">
          {[
            { id: 'discovery', label: '1. Discovery & Prediction' },
            { id: 'visuals', label: '2. Interactive Visual Labs' },
            { id: 'challenges', label: '3. Mastery Challenges' },
            { id: 'applications', label: '4. Real-World Applications' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as SimTab);
                audioManager.play('tap');
              }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* TAB 1: DISCOVERY QUESTION (PREDICT BEFORE LEARN) */}
      {activeTab === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 my-auto"
        >
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl">
            <span className="text-xs font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800 uppercase">
              Predict Before Learning
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white mt-3">
              The Mystery of Wöhler’s Furnace & Common Ions
            </h2>
            <p className="text-slate-300 mt-2 leading-relaxed">
              In 1828, chemists believed living tissue held an ethereal "vital force" necessary to forge organic molecules like urea. At the same time, inorganic chemists noticed that dissolving silver chloride in salty ocean water was vastly harder than in pure distilled water. What single fundamental chemical principle bridges these physical and organic phenomena?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {[
                {
                  id: 'pred_a',
                  text: 'Organic chemistry relies on covalent electron sharing without vital forces, while solubility equilibria are governed strictly by ionic concentration products (Ksp).',
                },
                {
                  id: 'pred_b',
                  text: 'Adding common salt increases AgCl solubility because chloride ions pull silver out of crystal lattices via vital energy.',
                },
                {
                  id: 'pred_c',
                  text: 'Heating ammonium cyanate destroys its ionic bonds and turns all nitrogen atoms into free gaseous radicals.',
                },
                {
                  id: 'pred_d',
                  text: 'Both phenomena are driven purely by temperature changes with zero influence from chemical equilibrium.',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleDiscoverySubmit(item.id)}
                  className={`p-4 rounded-xl text-left border transition-all text-sm font-medium ${
                    discoveryPrediction === item.id
                      ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200'
                      : 'border-slate-700 bg-slate-900/60 hover:border-slate-500 text-slate-200'
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </div>

            {discoveryRevealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-6 p-4 rounded-xl bg-cyan-950/80 border border-cyan-700 text-cyan-100 space-y-2"
              >
                <div className="font-bold text-lg text-cyan-300">Discovery Explanation:</div>
                <p className="text-sm text-cyan-200/90 leading-relaxed">
                  Spot on! Organic molecules are covalent structures formed by carbon’s tetravalency and catenation, governed by standard thermodynamics (as Wöhler proved by synthesizing urea from ammonium cyanate). Simultaneously, solubility of sparingly soluble salts like AgCl follows exact mass-action equilibrium (Ksp = [Ag⁺][Cl⁻]). Adding common Cl⁻ ions shifts the equilibrium left, precipitating solid AgCl!
                </p>
                <button
                  onClick={() => {
                    setActiveTab('visuals');
                    audioManager.play('swoop');
                  }}
                  className="mt-3 px-5 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg text-sm hover:bg-cyan-300 transition-all shadow-md"
                >
                  Proceed to Interactive Visual Labs →
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 2: INTERACTIVE VISUAL LABS & SLIDES */}
      {activeTab === 'visuals' && (
        <div className="space-y-6">
          {/* Slide Navigation Header */}
          <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
            <button
              disabled={currentSlideIndex === 0}
              onClick={() => {
                setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
                audioManager.play('tap');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-bold"
            >
              ← Previous Concept
            </button>
            <span className="text-xs font-bold text-cyan-300">
              Concept {currentSlideIndex + 1} of {TEACHING_SLIDES.length}: {TEACHING_SLIDES[currentSlideIndex].title}
            </span>
            <button
              disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
              onClick={() => {
                setCurrentSlideIndex((prev) => Math.min(TEACHING_SLIDES.length - 1, prev + 1));
                audioManager.play('tap');
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-bold"
            >
              Next Concept →
            </button>
          </div>

          {/* Current Slide Content */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800 uppercase">
                {TEACHING_SLIDES[currentSlideIndex].subtitle}
              </span>
              <h2 className="text-xl font-bold text-white">{TEACHING_SLIDES[currentSlideIndex].title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{TEACHING_SLIDES[currentSlideIndex].text}</p>
              {TEACHING_SLIDES[currentSlideIndex].keyFormula && (
                <div className="p-3 bg-slate-900 rounded-xl border border-cyan-800/60 font-mono text-xs text-cyan-300">
                  {TEACHING_SLIDES[currentSlideIndex].keyFormula}
                </div>
              )}
            </div>

            {/* Visual Interactive Widget Container */}
            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 min-h-[340px] flex flex-col justify-center items-center relative overflow-hidden">
              {/* LAB 1: Ksp & Common Ion Visualizer */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'ksp' && (
                <div className="w-full space-y-4 text-center">
                  <h3 className="text-sm font-bold text-slate-300">AgCl Solubility & Precipitation Lab</h3>
                  <div className="flex justify-center items-center gap-8">
                    {/* Beaker SVG */}
                    <div className="relative w-40 h-48 bg-slate-900 border-2 border-slate-600 rounded-b-2xl overflow-hidden shadow-inner flex flex-col justify-end">
                      {/* Water solution fill */}
                      <div className="w-full bg-cyan-900/40 border-t border-cyan-400/50 transition-all duration-500 relative h-[80%]">
                        {/* Floating Ag+ and Cl- ions */}
                        <div className="absolute inset-0 p-2 flex flex-wrap gap-2 justify-center items-center">
                          {[...Array(6)].map((_, i) => (
                            <motion.span
                              key={`ag_${i}`}
                              animate={{ y: [0, -6, 0] }}
                              transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                              className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded-full border border-amber-600"
                            >
                              Ag⁺
                            </motion.span>
                          ))}
                          {[...Array(6 + Math.round(addedNaCl * 1000))].map((_, i) => (
                            <motion.span
                              key={`cl_${i}`}
                              animate={{ y: [0, 6, 0] }}
                              transition={{ duration: 1.8 + i * 0.2, repeat: Infinity }}
                              className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded-full border border-emerald-600"
                            >
                              Cl⁻
                            </motion.span>
                          ))}
                        </div>

                        {/* Precipitate Solid Layer at bottom */}
                        {isPrecipitated && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: '24px' }}
                            className="w-full bg-slate-200 border-t-2 border-slate-400 flex items-center justify-center text-[10px] font-bold text-slate-900"
                          >
                            Solid AgCl Precipitate (s)
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Stats Panel */}
                    <div className="text-left text-xs space-y-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>
                        Ksp (AgCl) = <span className="font-mono text-cyan-300">1.8 × 10⁻¹⁰</span>
                      </div>
                      <div>
                        [Ag⁺] = <span className="font-mono text-amber-300">{concAg.toExponential(2)} M</span>
                      </div>
                      <div>
                        [Cl⁻] = <span className="font-mono text-emerald-300">{concCl.toFixed(3)} M</span>
                      </div>
                      <div>
                        Ion Product Q = <span className="font-mono text-cyan-300">{ionicProductQ.toExponential(2)}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800">
                        Status:{' '}
                        {isPrecipitated ? (
                          <span className="font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                            Q &gt; Ksp (Precipitation Occurs!)
                          </span>
                        ) : (
                          <span className="font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                            Q ≤ Ksp (Unsaturated / Saturated)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Common Ion NaCl Control Slider */}
                  <div className="w-full max-w-md mx-auto space-y-1">
                    <label className="text-xs text-slate-400 flex justify-between">
                      <span>Add Common Ion (NaCl Solution Concentration):</span>
                      <span className="font-mono text-cyan-300">{addedNaCl.toFixed(3)} M</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="0.05"
                      step="0.002"
                      value={addedNaCl}
                      onChange={(e) => {
                        setAddedNaCl(parseFloat(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-cyan-400 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* LAB 2: Redox & Electron Flow */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'redox' && (
                <div className="w-full space-y-3 text-center">
                  <h3 className="text-sm font-bold text-slate-300">Daniell Galvanic Cell Electron Transfer</h3>
                  <svg className="w-full h-48" viewBox="0 0 400 180">
                    {/* Beaker 1: Zinc Anode */}
                    <rect x="40" y="70" width="80" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <rect x="70" y="40" width="20" height="90" fill="#94a3b8" rx="2" />
                    <text x="80" y="32" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                      Zn Anode (-)
                    </text>

                    {/* Beaker 2: Copper Cathode */}
                    <rect x="280" y="70" width="80" height="90" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                    <rect x="310" y="40" width="20" height="90" fill="#b45309" rx="2" />
                    <text x="320" y="32" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                      Cu Cathode (+)
                    </text>

                    {/* Salt Bridge */}
                    <path d="M 110 90 L 110 50 L 290 50 L 290 90" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" />
                    <text x="200" y="42" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">
                      Salt Bridge (KCl)
                    </text>

                    {/* Wire & Electron flow */}
                    <path d="M 80 40 L 80 15 L 320 15 L 320 40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="200" cy="15" r="8" fill="#0f172a" stroke="#f59e0b" />
                    <text x="200" y="18" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="bold">
                      e⁻
                    </text>
                  </svg>
                  <div className="flex justify-center gap-4 text-xs">
                    <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-1 rounded">
                      Anode: Zn → Zn²⁺ + 2e⁻ (Oxidation)
                    </span>
                    <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-1 rounded">
                      Cathode: Cu²⁺ + 2e⁻ → Cu (Reduction)
                    </span>
                  </div>
                </div>
              )}

              {/* LAB 3: Oxidation State Calculator */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'oxnum' && (
                <div className="w-full space-y-4 text-center">
                  <h3 className="text-sm font-bold text-slate-300">Interactive Oxidation Number Bookkeeper</h3>
                  <div className="flex justify-center gap-2">
                    {(['K2Cr2O7', 'KMnO4', 'H2O2', 'S2O3'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          setSelectedOxMol(m);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          selectedOxMol === m ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2 max-w-md mx-auto text-left">
                    {selectedOxMol === 'K2Cr2O7' && (
                      <>
                        <div className="font-bold text-cyan-300 text-sm">Potassium Dichromate (K₂Cr₂O₇)</div>
                        <div>Potassium (K): Group 1 metal = <span className="text-amber-400 font-mono">+1</span> (2 atoms = +2)</div>
                        <div>Oxygen (O): Standard oxide = <span className="text-rose-400 font-mono">-2</span> (7 atoms = -14)</div>
                        <div>Net Charge = 0  ⇒  2(K) + 2(Cr) + 7(O) = 0</div>
                        <div className="p-2 bg-slate-950 rounded border border-cyan-800 font-mono text-cyan-200">
                          2(+1) + 2(x) + 7(-2) = 0  ⇒  2x = +12  ⇒  <span className="text-emerald-400 font-bold">Cr = +6</span>
                        </div>
                      </>
                    )}
                    {selectedOxMol === 'KMnO4' && (
                      <>
                        <div className="font-bold text-cyan-300 text-sm">Potassium Permanganate (KMnO₄)</div>
                        <div>Potassium (K): +1 | Oxygen (O): -2 (4 atoms = -8)</div>
                        <div className="p-2 bg-slate-950 rounded border border-cyan-800 font-mono text-cyan-200">
                          (+1) + x + 4(-2) = 0  ⇒  x - 7 = 0  ⇒  <span className="text-emerald-400 font-bold">Mn = +7</span>
                        </div>
                      </>
                    )}
                    {selectedOxMol === 'H2O2' && (
                      <>
                        <div className="font-bold text-cyan-300 text-sm">Hydrogen Peroxide (H₂O₂ - Peroxide Exception!)</div>
                        <div>Hydrogen (H): +1 (2 atoms = +2)</div>
                        <div>Oxygen-Oxygen single covalent bond O-O shares electrons equally!</div>
                        <div className="p-2 bg-slate-950 rounded border border-rose-800 font-mono text-rose-200">
                          2(+1) + 2(x) = 0  ⇒  2x = -2  ⇒  <span className="text-amber-400 font-bold">O = -1 (Peroxide)</span>
                        </div>
                      </>
                    )}
                    {selectedOxMol === 'S2O3' && (
                      <>
                        <div className="font-bold text-cyan-300 text-sm">Thiosulfate Ion (S₂O₃²⁻)</div>
                        <div>Oxygen (O): -2 (3 atoms = -6) | Net Ion Charge = -2</div>
                        <div className="p-2 bg-slate-950 rounded border border-cyan-800 font-mono text-cyan-200">
                          2(x) + 3(-2) = -2  ⇒  2x = +4  ⇒  <span className="text-emerald-400 font-bold">Average S = +2</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 4: Redox Balancing Steps */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'balancing' && (
                <div className="w-full space-y-3 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">5-Step Ion-Electron Method Workflow</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-left">
                    {[
                      { step: '1. Split', text: 'Separate oxidation & reduction half-reactions.' },
                      { step: '2. Atoms', text: 'Balance non-O and non-H atoms first.' },
                      { step: '3. O & H', text: 'Balance O with H₂O; balance H with H⁺.' },
                      { step: '4. Charge', text: 'Add electrons e⁻ to balance charges.' },
                      { step: '5. Combine', text: 'Equalize e⁻ transfer and add halves.' },
                    ].map((s, idx) => (
                      <div key={idx} className="p-2 bg-slate-900 border border-slate-800 rounded-lg">
                        <div className="font-bold text-cyan-400">{s.step}</div>
                        <div className="text-[11px] text-slate-400 mt-1">{s.text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-slate-900 border border-emerald-800/80 rounded-xl font-mono text-emerald-300">
                    Balanced: 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O
                  </div>
                </div>
              )}

              {/* LAB 5: Organic Introduction & Vital Force */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'organic_intro' && (
                <div className="w-full space-y-3 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">Historical Disproof of Vital Force Theory</h3>
                  <div className="flex justify-center items-center gap-4 py-4">
                    <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-slate-300">
                      <div className="font-bold text-rose-400">Ammonium Cyanate</div>
                      <div className="font-mono text-xs text-slate-400">NH₄OCN (Inorganic Salt)</div>
                    </div>
                    <div className="text-amber-400 font-bold text-lg">── Heat (Δ) ──→</div>
                    <div className="p-3 bg-slate-900 border border-emerald-700 rounded-xl text-slate-300">
                      <div className="font-bold text-emerald-400">Urea</div>
                      <div className="font-mono text-xs text-slate-400">NH₂CONH₂ (Organic Compound)</div>
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs">
                    Synthesized by Friedrich Wöhler in 1828. Proved that organic compounds obey natural physical laws without requiring a biological "vital force"!
                  </p>
                </div>
              )}

              {/* LAB 6: Classification Tree */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'classification' && (
                <div className="w-full space-y-2 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">Organic Classification Hierarchy</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-left">
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                      <div className="font-bold text-cyan-300">Acyclic (Open-Chain)</div>
                      <div className="text-[10px] text-slate-400">Hexane, Isobutane</div>
                    </div>
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                      <div className="font-bold text-amber-300">Alicyclic (Homocyclic)</div>
                      <div className="text-[10px] text-slate-400">Cyclohexane (C₆H₁₂)</div>
                    </div>
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                      <div className="font-bold text-emerald-300">Aromatic (4n+2 π)</div>
                      <div className="text-[10px] text-slate-400">Benzene (C₆H₆)</div>
                    </div>
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                      <div className="font-bold text-rose-300">Heterocyclic</div>
                      <div className="text-[10px] text-slate-400">Pyridine (C₅H₅N)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 7: IUPAC Naming Visualizer */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'iupac' && (
                <div className="w-full space-y-3 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">Interactive IUPAC Chain Builder</h3>
                  <div className="flex justify-center gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400">Chain Length:</label>
                      <select
                        value={iupacChainLength}
                        onChange={(e) => setIupacChainLength(parseInt(e.target.value))}
                        className="bg-slate-900 text-cyan-300 border border-slate-700 rounded px-2 py-1 text-xs"
                      >
                        <option value={3}>3 Carbon (Prop-)</option>
                        <option value={4}>4 Carbon (But-)</option>
                        <option value={5}>5 Carbon (Pent-)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400">Principal Functional Group:</label>
                      <select
                        value={iupacFunctionalGroup}
                        onChange={(e) => setIupacFunctionalGroup(e.target.value as any)}
                        className="bg-slate-900 text-cyan-300 border border-slate-700 rounded px-2 py-1 text-xs"
                      >
                        <option value="ol">Alcohol (-ol)</option>
                        <option value="oic_acid">Carboxylic Acid (-oic acid)</option>
                        <option value="one">Ketone (-one)</option>
                        <option value="alkane">Alkane (-ane)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400">Group Locant Position:</label>
                      <select
                        value={iupacSubstituentPos}
                        onChange={(e) => setIupacSubstituentPos(parseInt(e.target.value))}
                        className="bg-slate-900 text-cyan-300 border border-slate-700 rounded px-2 py-1 text-xs"
                      >
                        <option value={1}>C-1</option>
                        <option value={2}>C-2</option>
                        <option value={3}>C-3</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-cyan-800 text-center">
                    <span className="text-xs text-slate-400">Generated Systematic IUPAC Name: </span>
                    <span className="font-mono font-bold text-base text-amber-300">{calculatedIupacName}</span>
                  </div>
                </div>
              )}

              {/* LAB 8: Structural Isomerism */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'isomerism' && (
                <div className="w-full space-y-3 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">Functional Group Isomers of C₂H₆O</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-900 border border-cyan-800 rounded-xl">
                      <div className="font-bold text-cyan-300">Ethanol (Alcohol)</div>
                      <div className="font-mono text-slate-300 mt-1">CH₃–CH₂–OH</div>
                      <div className="text-[10px] text-emerald-400 mt-2">Reacts with Na metal to release H₂ gas</div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-amber-800 rounded-xl">
                      <div className="font-bold text-amber-300">Dimethyl Ether (Ether)</div>
                      <div className="font-mono text-slate-300 mt-1">CH₃–O–CH₃</div>
                      <div className="text-[10px] text-rose-400 mt-2">Unreactive towards Na metal</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 9: Stereoisomerism & Polarimeter */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'stereoisomerism' && (
                <div className="w-full space-y-3 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">Polarimeter Plane Polarized Light Visualizer</h3>
                  <div className="flex justify-center gap-2">
                    {(['d', 'l', 'meso', 'racemic'] as const).map((iso) => (
                      <button
                        key={iso}
                        onClick={() => {
                          setActiveIsomer(iso);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1 rounded font-bold uppercase text-[10px] ${
                          activeIsomer === iso ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {iso}-Form
                      </button>
                    ))}
                  </div>

                  {/* Polarimeter SVG Dial */}
                  <div className="flex justify-center items-center gap-4 py-2">
                    <svg className="w-28 h-28" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      {/* Zero indicator */}
                      <line x1="50" y1="5" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
                      {/* Rotating Polariser Hand */}
                      <motion.line
                        x1="50"
                        y1="50"
                        x2={50 + 35 * Math.sin((polarimeterAngle * Math.PI) / 180)}
                        y2={50 - 35 * Math.cos((polarimeterAngle * Math.PI) / 180)}
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                        animate={{
                          x2: 50 + 35 * Math.sin((polarimeterAngle * Math.PI) / 180),
                          y2: 50 - 35 * Math.cos((polarimeterAngle * Math.PI) / 180),
                        }}
                        transition={{ type: 'spring', stiffness: 120 }}
                      />
                      <circle cx="50" cy="50" r="4" fill="#f59e0b" />
                    </svg>
                    <div className="text-left space-y-1">
                      <div>
                        Rotation Angle α:{' '}
                        <span className="font-mono font-bold text-amber-300">{polarimeterAngle}°</span>
                      </div>
                      <div>
                        Optical Activity:{' '}
                        {polarimeterAngle !== 0 ? (
                          <span className="text-emerald-400 font-bold">Optically Active</span>
                        ) : (
                          <span className="text-rose-400 font-bold">Optically Inactive</span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {activeIsomer === 'd' && 'd-isomer rotates plane light clockwise.'}
                        {activeIsomer === 'l' && 'l-isomer rotates plane light anticlockwise.'}
                        {activeIsomer === 'meso' && 'Meso form: optically inactive via INTERNAL compensation.'}
                        {activeIsomer === 'racemic' && 'Racemic 50:50 mixture: optically inactive via EXTERNAL compensation.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 10: Lassaigne Test Chamber */}
              {TEACHING_SLIDES[currentSlideIndex].visualType === 'lassaigne' && (
                <div className="w-full space-y-3 text-center text-xs">
                  <h3 className="text-sm font-bold text-slate-300">Sodium Fusion Extract Test Chamber</h3>
                  <div className="flex justify-center gap-2">
                    {(['N', 'S', 'Cl'] as const).map((el) => (
                      <button
                        key={el}
                        onClick={() => {
                          setTestElement(el);
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1 rounded font-bold text-xs ${
                          testElement === el ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Test for {el === 'N' ? 'Nitrogen (N)' : el === 'S' ? 'Sulphur (S)' : 'Chlorine (Cl)'}
                      </button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-center items-center gap-6">
                    {/* Test Tube Graphic */}
                    <div className="w-12 h-32 bg-slate-950 border-2 border-slate-600 rounded-b-xl overflow-hidden relative flex flex-col justify-end">
                      <div
                        className={`w-full transition-all duration-700 h-[65%] ${
                          testElement === 'N'
                            ? 'bg-blue-700'
                            : testElement === 'S'
                            ? 'bg-purple-800'
                            : 'bg-slate-200'
                        }`}
                      />
                    </div>
                    <div className="text-left space-y-1 max-w-xs">
                      {testElement === 'N' && (
                        <>
                          <div className="font-bold text-blue-400 text-sm">Prussian Blue Test</div>
                          <div>Reagent: FeSO₄ + dil. H₂SO₄</div>
                          <div>Formula: Fe₄[Fe(CN)₆]₃</div>
                          <div className="text-[10px] text-slate-400">Deep Prussian blue precipitate confirms Nitrogen.</div>
                        </>
                      )}
                      {testElement === 'S' && (
                        <>
                          <div className="font-bold text-purple-400 text-sm">Sodium Nitroprusside Test</div>
                          <div>Reagent: Na₂[Fe(CN)₅NO]</div>
                          <div>Observation: Deep Violet / Purple Colouration</div>
                          <div className="text-[10px] text-slate-400">Forms [Fe(CN)₅NOS]⁴⁻ complex confirming Sulphur.</div>
                        </>
                      )}
                      {testElement === 'Cl' && (
                        <>
                          <div className="font-bold text-slate-200 text-sm">Silver Nitrate Test</div>
                          <div>Reagent: HNO₃ (boil) + AgNO₃</div>
                          <div>Observation: Curdy White Precipitate (AgCl)</div>
                          <div className="text-[10px] text-slate-400">Precipitate is soluble in excess NH₄OH.</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ADAPTIVE MASTERY CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="space-y-6 my-auto">
          {/* Progress Banner */}
          <div className="flex justify-between items-center bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs">
            <span className="text-slate-300 font-bold">
              Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
            </span>
            <span className="text-cyan-400 font-mono">Node: {challenge.nodeId}</span>
            <span className="text-amber-400 font-bold uppercase">Difficulty: {challenge.difficulty}</span>
          </div>

          {/* Challenge Box */}
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl relative overflow-hidden">
            <h3 className="text-lg md:text-xl font-bold text-white mb-2">{challenge.title}</h3>
            <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">{challenge.question}</p>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3">
              {challenge.options.map((opt) => {
                let btnStyle = 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-slate-500';
                if (selectedOptionId === opt.id) {
                  btnStyle = 'border-cyan-400 bg-cyan-950 text-cyan-200';
                }
                if (isAnswerSubmitted) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-950 text-emerald-200 font-bold';
                  } else if (selectedOptionId === opt.id) {
                    btnStyle = 'border-rose-500 bg-rose-950 text-rose-200';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl text-left border transition-all text-sm flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt.text}</span>
                    {isAnswerSubmitted && opt.isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons & Feedback */}
            <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setShowHint((prev) => !prev)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
              </button>

              {!isAnswerSubmitted ? (
                <button
                  disabled={!selectedOptionId}
                  onClick={handleSubmitAnswer}
                  className="w-full md:w-auto px-6 py-2.5 bg-cyan-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-sm hover:bg-cyan-400 transition-all shadow-md"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="w-full md:w-auto px-6 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-sm hover:bg-emerald-400 transition-all shadow-md"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Masterclass!'}
                </button>
              )}
            </div>

            {/* Hint Box */}
            <HintBubble show={showHint} text={challenge.hint} />

            {/* Explanation / Feedback Banner */}
            {isAnswerSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-xl text-xs leading-relaxed border ${
                  challenge.options.find((o) => o.id === selectedOptionId)?.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-700 text-rose-200'
                }`}
              >
                <div className="font-bold text-sm mb-1">Feedback & Explanation:</div>
                {feedbackText}
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: REAL-WORLD APPLICATIONS */}
      {activeTab === 'applications' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 my-auto"
        >
          <div className="bg-slate-800/90 border border-slate-700 p-6 rounded-2xl space-y-4">
            <span className="text-xs font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800 uppercase">
              Indian Technological & Industrial Context
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Real-World Applications of ISC Class 11 Chemistry
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                <div className="font-bold text-cyan-300 text-sm">🌾 Go-Bar Biogas & Sugarcane Chemistry</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rural Indian biogas (go-bar gas) plants harvest Methane (CH₄). Simultaneously, the sugarcane belts of Uttar Pradesh & Maharashtra ferment sucrose molasses into ethanol (C₂H₅OH), exemplifying industrial aliphatic organic chemistry.
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                <div className="font-bold text-emerald-300 text-sm">🧪 Qualitative Salt Analysis in Labs</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Systematic cation group separation (Groups II, III, IV) relies directly on adjusting Ksp and common ion concentrations ([S²⁻] and [OH⁻]) using acidic H₂S and ammoniacal NH₄Cl/NH₄OH.
                </p>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
                <div className="font-bold text-amber-300 text-sm">🏭 Blast Furnace Redox Extraction</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Steel plants in Jharia & Durgapur extract iron from Hematite (Fe₂O₃) using carbon monoxide (CO) reduction: Fe₂O₃ + 3CO → 2Fe + 3CO₂, a massive industrial redox reaction!
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-cyan-800 text-xs text-cyan-200 flex items-center justify-between">
              <span>Ready to test your complete Class 11 knowledge in the Adaptive Quiz?</span>
              <button
                onClick={() => {
                  setActiveTab('challenges');
                  audioManager.play('swoop');
                }}
                className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-lg hover:bg-cyan-300 transition-all"
              >
                Start Adaptive Challenges
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Masterclass Completed!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* Footer */}
      <footer className="mt-6 pt-3 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <div>Covered Nodes: {ALL_NODE_IDS.join(', ')}</div>
        <div>ISC Class 11 Educational Simulation Engine • Production Ready</div>
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