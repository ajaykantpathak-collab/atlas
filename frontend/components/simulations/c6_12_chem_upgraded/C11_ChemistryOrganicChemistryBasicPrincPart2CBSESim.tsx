'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, type ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, type BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c11_chem_cbse_004',
  'c11_chem_cbse_005',
  'c11_chem_cbse_006',
  'c11_chem_cbse_007',
  'c11_chem_cbse_008',
  'c11_chem_cbse_009',
  'c11_chem_cbse_010',
  'c11_chem_cbse_011',
  'c11_chem_cbse_012',
  'c11_chem_cbse_013',
  'c11_chem_cbse_014',
  'c11_chem_cbse_015',
  'c11_chem_cbse_016',
  'c11_chem_cbse_017',
  'c11_chem_cbse_018',
  'c11_chem_cbse_019'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Advanced Organic Mechanism & Analytical Chemistry Suite',
  intro: 'Welcome to the National Organic Synthesis & Chemical Analysis Laboratory. As the Lead Analytical Chemist, you are tasked with investigating electronic electron-displacement effects, characterizing transient reaction intermediates, isolating complex natural products via chromatography, and determining empirical formulas through precise elemental quantitative analysis.',
  context: 'In this simulation, you will manipulate inductive, resonance, and hyperconjugative forces, simulate homolytic and heterolytic bond cleavages, separate multi-component organic liquids using steam and fractional distillation, perform TLC Rf evaluations, and execute Dumas, Kjeldahl, and Carius quantitative estimations.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why is a tertiary carbocation (3°) significantly more stable than a primary carbocation (1°), despite both having a positively charged electron-deficient carbon atom?',
  options: [
    'Tertiary carbocations have larger steric volume which dissipates charge by physical spreading',
    'Dispersal of positive charge occurs via hyperconjugation with 9 α-hydrogens and +I inductive electron donation from 3 methyl groups',
    'Tertiary carbocations form double bonds internally with surrounding solvents',
    'Primary carbocations possess excessive resonance structures that destabilize the octet'
  ],
  correctIndex: 1,
  hintAfter: 'Hyperconjugation involves σ(C-H) orbital overlap into the vacant unhybridized p-orbital of the carbocation. More α-hydrogens directly lead to more canonical stabilizing forms!'
};

// ==========================================
// DEFAULT PROPS & CONFIG
// ==========================================
const DEFAULT_PROPS = {
  initialNodeId: 'c11_chem_cbse_004',
  onComplete: (score: number) => { console.log('Sim completed with score:', score); }
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Electronic Displacement Effects (I, E, R, H)',
    instruction: 'Toggle electron-withdrawing (-I/-R) and electron-donating (+I/+R) substituents on substituted benzenes and haloalkanes. Observe electron density maps and dipole shifts.',
    interactionType: 'substituent-toggling',
    nodeId: 'c11_chem_cbse_004'
  },
  {
    title: 'Lab 2: Reactive Intermediates & Bond Cleavage Dynamics',
    instruction: 'Trigger homolytic vs heterolytic cleavages. Compare the relative thermodynamic stabilities of carbocations, carbanions, and free radicals based on substitution degree.',
    interactionType: 'cleavage-intermediates',
    nodeId: 'c11_chem_cbse_008'
  },
  {
    title: 'Lab 3: Reagent Types & Organic Reaction Classification',
    instruction: 'Classify electrophiles, nucleophiles, and reaction types (Addition, Substitution, Elimination, Rearrangement) by reacting species under thermal/photolytic conditions.',
    interactionType: 'reagent-classification',
    nodeId: 'c11_chem_cbse_009'
  },
  {
    title: 'Lab 4: Organic Separation & Purification Suite',
    instruction: 'Operate Steam Distillation, Fractional Distillation, and Thin-Layer Chromatography (TLC). Adjust solvent polarities to calculate Retention Factors (Rf).',
    interactionType: 'separation-chromatography',
    nodeId: 'c11_chem_cbse_011'
  },
  {
    title: 'Lab 5: Qualitative Tests & Quantitative Elemental Analysis',
    instruction: 'Conduct Lassaigne tests for N, S, Halogens, and run Kjeldahl, Dumas, and Carius mass estimations to calculate empirical and molecular formulas.',
    interactionType: 'elemental-quantitative-analysis',
    nodeId: 'c11_chem_cbse_014'
  }
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the Rf value of a polar amino acid on a Silica Gel TLC plate when the mobile phase polarity is increased from pure Hexane to Ethyl Acetate/Methanol?',
    options: [
      'The Rf value will decrease because the polar silica gel binds stronger.',
      'The Rf value will increase because the mobile phase competes more effectively for polar solutes.',
      'The Rf value will remain exactly 0.50 regardless of solvent changes.',
      'The Rf value will drop to 0.00 due to precipitation.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4 (Chromatography), change the solvent system from Hexane to Ethyl Acetate and observe solute migration height.',
    nodeId: 'c11_chem_cbse_013'
  },
  {
    question: 'Predict: During a Kjeldahl estimation of Nitrogen, if ammonium sulfate formed is digested with excess NaOH and the liberated ammonia is absorbed in 50 mL 0.1 M HCl, how will unreacted HCl titration affect Nitrogen % calculation?',
    options: [
      'Greater volume of NaOH used in back titration implies HIGHER Nitrogen content.',
      'Greater volume of NaOH used in back titration implies LOWER Nitrogen content.',
      'The volume of NaOH used in back titration is completely independent of Nitrogen mass.',
      'Back titration measures Carbon content, not Nitrogen.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5 (Quantitative Analysis), simulate Kjeldahl titration with varying amounts of liberated NH3.',
    nodeId: 'c11_chem_cbse_016'
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the hyperconjugative stability order of free radicals vs carbocations?',
    observableOptions: [
      'Both follow 3° > 2° > 1° > CH3· due to hyperconjugation with α-C-H bonds.',
      'Carbocations follow 3° > 2° > 1°, while free radicals follow CH3· > 1° > 2° > 3°.',
      'Free radicals have no hyperconjugation because they are negatively charged.',
      'Carbocations are stabilized only by resonance, never hyperconjugation.'
    ],
    correctIndex: 0,
    nodeId: 'c11_chem_cbse_007'
  },
  {
    question: 'What happens when an organic compound containing Nitrogen and Sulfur is fused with Metallic Sodium in Lassaigne\'s test?',
    observableOptions: [
      'Sodium cyanide (NaCN) and Sodium sulfide (Na2S) form exclusively as separate precipitates.',
      'Sodium thiocyanate (NaSCN) is formed, giving a blood-red color with FeCl3 solution.',
      'Prussian blue color appears instantly without adding ferrous sulfate.',
      'Sulfur dioxide gas evolves with a pungent rotten egg odor.'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_cbse_014'
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Forensic Analysis & API Purity Isolation',
  description: 'As a pharmaceutical Quality Control Chemist, you are standardizing an active pharmaceutical ingredient (API) synthesized via nitration. You must verify purity using TLC, separate byproduct by steam distillation, and calculate empirical formula from Liebig and Dumas quantitative data.',
  steps: [
    'Step 1: Perform Thin Layer Chromatography (TLC) using standard TLC silica gel plates with solvent Hexane:Ethyl Acetate (7:3). Calculate Rf values for ortho- and para-nitrophenols.',
    'Step 2: Isolate volatile ortho-nitrophenol from non-volatile para-nitrophenol using Steam Distillation based on intramolecular vs intermolecular hydrogen bonding.',
    'Step 3: Submit 0.20 g of pure API sample to Liebig Carbon-Hydrogen combustion analysis: 0.44 g CO2 and 0.18 g H2O are collected. Calculate % C and % H.',
    'Step 4: Perform Dumas nitrogen estimation: 0.20 g compound yields 22.4 mL N2 gas at STP. Calculate % N, establish Empirical Formula C6H5NO3, and confirm structural identity.'
  ]
};

// ==========================================
// ENRICHMENT & MISCONCEPTIONS DATA
// ==========================================
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_01',
    misconception: 'Inductive effect (+I / -I) operates over long distances across carbon chains without attenuation.',
    correction: 'Inductive effect operates strictly through σ bonds and diminishes rapidly, becoming almost negligible beyond 3 to 4 carbon atoms.',
    nodeId: 'c11_chem_cbse_004'
  },
  {
    id: 'misc_02',
    misconception: 'Resonance structures represent rapidly equilibrating real physical isomers of a molecule.',
    correction: 'Resonance structures are hypothetical canonical forms. The true molecule is a single static resonance hybrid possessing lower energy than any contributing form.',
    nodeId: 'c11_chem_cbse_006'
  },
  {
    id: 'misc_03',
    misconception: 'Homolytic cleavage produces charged ion pairs (cations and anions).',
    correction: 'Homolytic cleavage breaks a covalent bond symmetrically, sharing electrons equally to produce neutral free radicals with unpaired electrons.',
    nodeId: 'c11_chem_cbse_008'
  },
  {
    id: 'misc_04',
    misconception: 'Kjeldahl method can estimate Nitrogen in ALL organic nitrogenous compounds including nitro and azo compounds.',
    correction: 'Kjeldahl method fails for nitro (-NO2), azo (-N=N-), and ring nitrogens (e.g., pyridine) because their nitrogen does not quantitatively convert to (NH4)2SO4 without special reduction.',
    nodeId: 'c11_chem_cbse_016'
  },
  {
    id: 'misc_05',
    misconception: 'Higher Rf in TLC means the compound bound strongly to the polar stationary phase.',
    correction: 'Higher Rf indicates weak interaction with stationary phase and strong affinity/solubility in the mobile eluent phase.',
    nodeId: 'c11_chem_cbse_013'
  },
  {
    id: 'misc_06',
    misconception: 'Carbanions are stabilized by electron-donating alkyl groups.',
    correction: 'Alkyl groups exhibit +I effect which increases negative charge density on carbanion, destabilizing it. Carbanion stability order is 1° > 2° > 3°.',
    nodeId: 'c11_chem_cbse_010'
  }
];

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: NodeId;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'Which of the following carbocations is the MOST stable?',
    options: ['(CH3)3C+', '(CH3)2CH+', 'CH3CH2+', 'CH3+'],
    correctIndex: 0,
    explanation: 'Tertiary carbocation (CH3)3C+ has 9 hyperconjugative α-hydrogens and 3 +I methyl groups, providing maximum charge dispersal.',
    nodeId: 'c11_chem_cbse_010'
  },
  {
    id: 'diag_2',
    question: 'In paper chromatography or TLC, the stationary phase in paper is:',
    options: ['The cellulose paper fibers', 'Water trapped in the cellulose matrix', 'Organic solvent mobile phase', 'Silica gel binder'],
    correctIndex: 1,
    explanation: 'In paper chromatography, water held in the pores of cellulose acts as the stationary liquid phase.',
    nodeId: 'c11_chem_cbse_013'
  },
  {
    id: 'diag_3',
    question: 'Lassaigne\'s test for Nitrogen gives Prussian Blue color due to the formation of:',
    options: ['Fe4[Fe(CN)6]3', 'Na4[Fe(CN)6]', 'Fe(SCN)3', 'Fe(OH)3'],
    correctIndex: 0,
    explanation: 'Prussian blue is Ferriferrocyanide: Iron(III) hexacyanoferrate(II), chemical formula Fe4[Fe(CN)6]3·xH2O.',
    nodeId: 'c11_chem_cbse_014'
  },
  {
    id: 'diag_4',
    question: 'Which compound can be purified by Steam Distillation?',
    options: ['Aniline / o-Nitrophenol', 'Glycerol', 'Benzoic acid', 'Ethanol'],
    correctIndex: 0,
    explanation: 'o-Nitrophenol and Aniline are steam volatile and immiscible with water, making them ideal for steam distillation.',
    nodeId: 'c11_chem_cbse_012'
  },
  {
    id: 'diag_5',
    question: 'In Carius method, 0.1878 g of organic compound gave 0.2870 g of AgBr. What is % of Bromine? (At. mass: Ag=108, Br=80)',
    options: ['65.0%', '42.5%', '53.2%', '28.4%'],
    correctIndex: 0,
    explanation: '% Br = (80/188) * (0.2870 / 0.1878) * 100 = 0.4255 * 1.528 * 100 ≈ 65.0%.',
    nodeId: 'c11_chem_cbse_017'
  },
  {
    id: 'diag_6',
    question: 'Hyperconjugation involves the delocalization of:',
    options: ['σ electrons of C-H bond with vacant p orbital', 'π electrons with adjacent π bond', 'Lone pair into anti-bonding σ* orbital', 'd electrons of metal ions'],
    correctIndex: 0,
    explanation: 'Hyperconjugation (no-bond resonance) is σ(C-H) electron delocalization into adjacent empty or partially filled p or π* orbital.',
    nodeId: 'c11_chem_cbse_007'
  },
  {
    id: 'diag_7',
    question: 'Electromeric effect (+E / -E) is a:',
    options: ['Permanent effect in ground state', 'Temporary effect operating only in the presence of an attacking reagent', 'Resonance phenomenon in aromatic systems', 'Solvent polarity induced dipole'],
    correctIndex: 1,
    explanation: 'Electromeric effect is a temporary electronic effect involving complete transfer of a shared π-electron pair upon approach of an attacking reagent.',
    nodeId: 'c11_chem_cbse_005'
  },
  {
    id: 'diag_8',
    question: 'In Dumas method, Nitrogen is estimated in the form of:',
    options: ['NH3 gas', 'N2 gas', '(NH4)2SO4', 'NO2 gas'],
    correctIndex: 1,
    explanation: 'In Dumas method, the organic nitrogen is quantitatively oxidized to elemental N2 gas collected over KOH solution.',
    nodeId: 'c11_chem_cbse_016'
  }
];

// ==========================================
// 22+ CHALLENGES (Foundation, Standard, Advanced)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'ch_f1',
    nodeId: 'c11_chem_cbse_004',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following groups shows strong -I (negative inductive) effect?',
    options: ['-CH3', '-NO2', '-C2H5', '-COO-'],
    correctIndex: 1,
    explanation: '-NO2 has strongly electronegative nitrogen and oxygen atoms that pull electron density through the σ framework (-I effect).',
    hints: ['Look for highly electronegative atoms.', '-NO2 attracts electron density.', 'Alkyl groups are +I groups.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_f2',
    nodeId: 'c11_chem_cbse_005',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'When an electrophile (H+) attacks an alkene double bond, π-electrons shift towards the carbon to which H+ attaches. This is an example of:',
    options: ['+E effect', '-E effect', '+I effect', '-R effect'],
    correctIndex: 0,
    explanation: 'In +E effect, π-electrons transfer towards the atom to which the attacking reagent gets attached.',
    hints: ['The reagent is H+ (electrophile).', 'Electrons shift to the bonding site.', 'This defines +E effect.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_f3',
    nodeId: 'c11_chem_cbse_006',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which statement regarding resonance structures is TRUE?',
    options: [
      'Resonance structures differ in the arrangement of atomic nuclei.',
      'Resonance hybrids are less stable than individual canonical forms.',
      'All canonical structures must have the same number of unpaired electrons.',
      'Electrons remain localized strictly in single bonds.'
    ],
    correctIndex: 2,
    explanation: 'Valid resonance structures must maintain the exact same positions of atomic nuclei and total number of paired/unpaired electrons.',
    hints: ['Nuclei NEVER move in resonance.', 'Resonance hybrid is more stable than canonical forms.', 'Unpaired electron count remains invariant.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_f4',
    nodeId: 'c11_chem_cbse_008',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Heterolytic cleavage of a C-Cl bond in t-butyl chloride yields:',
    options: [
      'Two neutral free radicals',
      'Carbocation (t-butyl cation) and Chloride ion (Cl-)',
      'Carbanion and Chloronium ion (Cl+)',
      'No reaction under any conditions'
    ],
    correctIndex: 1,
    explanation: 'Chlorine is more electronegative than carbon, so heterolysis transfers both bonding electrons to Cl, forming (CH3)3C+ and Cl-.',
    hints: ['Chlorine is electronegative.', 'Heterolytic cleavage forms ions.', 'Cl takes both bonding electrons.'],
    misconceptionIndex: 2
  },
  {
    id: 'ch_f5',
    nodeId: 'c11_chem_cbse_009',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following acts as a Lewis acid / Electrophile?',
    options: ['NH3', 'OH-', 'BF3', 'CN-'],
    correctIndex: 2,
    explanation: 'BF3 has an incomplete octet around Boron (6 valence electrons) and accepts an electron pair, acting as an electrophile.',
    hints: ['Electrophiles are electron pair acceptors.', 'Look for an incomplete octet.', 'BF3 has 6 electrons on Boron.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_f6',
    nodeId: 'c11_chem_cbse_011',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Camphor and Naphthalene can be purified from non-volatile impurities by:',
    options: ['Sublimation', 'Fractional distillation', 'Crystallisation', 'Steam distillation'],
    correctIndex: 0,
    explanation: 'Camphor and Naphthalene sublime directly from solid to vapor state on heating without passing through liquid phase.',
    hints: ['Direct conversion solid -> gas.', 'Camphor sublimes easily.', 'Method is Sublimation.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_f7',
    nodeId: 'c11_chem_cbse_014',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In Lassaigne\'s test, sodium fusion extract is boiled with FeSO4 and acidified with conc. H2SO4. A Prussian blue color indicates presence of:',
    options: ['Sulfur', 'Nitrogen', 'Halogen', 'Phosphorus'],
    correctIndex: 1,
    explanation: 'Prussian blue Fe4[Fe(CN)6]3 proves the presence of Nitrogen (which forms NaCN during fusion with Sodium).',
    hints: ['Na + C + N -> NaCN.', 'Cyanide reacts with iron salts.', 'Prussian blue confirms Nitrogen.'],
    misconceptionIndex: 3
  },

  // --- STANDARD (8) ---
  {
    id: 'ch_s1',
    nodeId: 'c11_chem_cbse_007',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How many hyperconjugative α-hydrogens are present in 2-methylbut-2-ene [(CH3)2C=CH-CH3]?',
    correctAnswer: 9,
    tolerance: 0,
    explanation: 'The double bond C=C is attached to two CH3 groups on one side (6 H) and one CH3 group on the other side (3 H). Total α-hydrogens = 6 + 3 = 9.',
    hints: ['Count hydrogens attached directly to carbon adjacent to C=C.', 'Left carbon has 2 methyl groups = 6 H.', 'Right carbon has 1 methyl group = 3 H.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_s2',
    nodeId: 'c11_chem_cbse_010',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Arrange the following carbanions in order of INCREASING stability: (i) (CH3)3C- (ii) (CH3)2CH- (iii) CH3CH2- (iv) CH3-',
    options: [
      '(i) < (ii) < (iii) < (iv)',
      '(iv) < (iii) < (ii) < (i)',
      '(ii) < (i) < (iii) < (iv)',
      '(i) < (iii) < (ii) < (iv)'
    ],
    correctIndex: 0,
    explanation: 'Alkyl groups donate electron density (+I), which intensifies negative charge on carbanions and destabilizes them. Thus 3° < 2° < 1° < methyl.',
    hints: ['+I effect destabilizes negative charge.', 'More methyl groups = less stable carbanion.', 'Methyl carbanion is most stable.'],
    misconceptionIndex: 5
  },
  {
    id: 'ch_s3',
    nodeId: 'c11_chem_cbse_012',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Glycerol decomposes near its boiling point (290°C). Which technique is used to purify glycerol safely?',
    options: [
      'Distillation under reduced pressure (Vacuum Distillation)',
      'Steam Distillation',
      'Fractional Distillation at atmospheric pressure',
      'Simple Sublimation'
    ],
    correctIndex: 0,
    explanation: 'Reducing atmospheric pressure lowers the boiling point of glycerol below its decomposition temperature (~180°C at 12 mmHg).',
    hints: ['Prevent thermal decomposition by lowering BP.', 'Use reduced pressure/vacuum.', 'Distillation under reduced pressure.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_s4',
    nodeId: 'c11_chem_cbse_013',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In a TLC experiment, the solvent front migrated 10.0 cm from the baseline. Compound A migrated 4.5 cm. What is the Retention Factor (Rf) of compound A?',
    correctAnswer: 0.45,
    tolerance: 0.02,
    explanation: 'Rf = Distance traveled by solute / Distance traveled by solvent front = 4.5 / 10.0 = 0.45.',
    hints: ['Rf = d_substance / d_solvent', 'Divide 4.5 by 10.0', 'Rf is a decimal between 0 and 1.'],
    misconceptionIndex: 4
  },
  {
    id: 'ch_s5',
    nodeId: 'c11_chem_cbse_015',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: '0.24 g of an organic compound gave 0.44 g of CO2 upon complete combustion. What is the percentage of Carbon in the compound? (At. mass: C=12, O=16)',
    correctAnswer: 50.0,
    tolerance: 0.5,
    explanation: '% C = (12/44) * (mass of CO2 / mass of compound) * 100 = (12/44) * (0.44 / 0.24) * 100 = 0.2727 * 1.833 * 100 = 50.0%.',
    hints: ['% C = (12 / 44) * (m_CO2 / m_sample) * 100', '0.44 / 44 = 0.01 mol CO2 = 0.01 mol C = 0.12 g C.', '(0.12 / 0.24) * 100 = 50%.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s6',
    nodeId: 'c11_chem_cbse_016',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In Dumas method, 0.30 g of an organic compound gave 28.0 mL of N2 gas collected at STP. Calculate % Nitrogen in the compound. (22.4 L of N2 at STP = 28 g)',
    correctAnswer: 11.67,
    tolerance: 0.5,
    explanation: 'Mass of 28 mL N2 at STP = (28 g / 22400 mL) * 28 mL = 0.035 g. % N = (0.035 / 0.30) * 100 = 11.67%.',
    hints: ['Mass of N2 = (28 / 22400) * Vol_in_mL', 'Mass of N2 = 0.035 g.', '% N = (0.035 / 0.30) * 100.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s7',
    nodeId: 'c11_chem_cbse_017',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: '0.20 g of an organic compound gave 0.287 g of AgCl in Carius estimation. What is % of Chlorine? (At. mass: Ag=108, Cl=35.5, Mol wt AgCl = 143.5)',
    correctAnswer: 35.5,
    tolerance: 0.5,
    explanation: '% Cl = (35.5 / 143.5) * (0.287 / 0.20) * 100 = 0.2474 * 1.435 * 100 = 35.5%.',
    hints: ['% Cl = (35.5 / 143.5) * (m_AgCl / m_sample) * 100', '0.287 / 143.5 = 0.002 mol AgCl.', 'Mass of Cl = 0.002 * 35.5 = 0.071 g. (0.071/0.20)*100 = 35.5%.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s8',
    nodeId: 'c11_chem_cbse_018',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: '0.31 g of an organic compound containing Phosphorus gave 0.222 g of Mg2P2O7 (Magnesium pyrophosphate). Calculate % Phosphorus. (At. wt: P=31, Mg=24, O=16; Molar mass Mg2P2O7 = 222 g/mol)',
    correctAnswer: 20.0,
    tolerance: 0.5,
    explanation: '% P = (62 / 222) * (mass Mg2P2O7 / mass compound) * 100 = (62 / 222) * (0.222 / 0.31) * 100 = 62 * (0.001 / 0.31) * 100 = 20.0%.',
    hints: ['1 mol Mg2P2O7 contains 2 moles of P (62 g P per 222 g Mg2P2O7).', '0.222 g Mg2P2O7 = 0.001 mol Mg2P2O7.', 'Mass P = 0.062 g. (0.062 / 0.31) * 100 = 20.0%.'],
    misconceptionIndex: 3
  },

  // --- ADVANCED (7) ---
  {
    id: 'ch_a1',
    nodeId: 'c11_chem_cbse_019',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'An organic compound contains 40.0% Carbon, 6.67% Hydrogen, and 53.33% Oxygen. Its vapor density is 30. What is its MOLECULAR MASS (g/mol)?',
    correctAnswer: 60.0,
    tolerance: 0.1,
    explanation: 'Molecular Mass = 2 * Vapor Density = 2 * 30 = 60 g/mol. (Empirical formula CH2O, molecular formula C2H4O2, ethanoic acid).',
    hints: ['Molecular Mass = 2 × Vapor Density.', 'Multiply 30 by 2.', 'Result is 60 g/mol.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_a2',
    nodeId: 'c11_chem_cbse_019',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'For the compound with empirical formula CH2O (empirical mass 30) and molecular mass 60, how many Carbon atoms are in ONE molecule of the compound?',
    correctAnswer: 2,
    tolerance: 0,
    explanation: 'n = Molecular Mass / Empirical Mass = 60 / 30 = 2. Molecular formula = (CH2O)2 = C2H4O2. Hence 2 Carbon atoms.',
    hints: ['n = Molar Mass / Empirical Mass.', 'n = 60 / 30 = 2.', 'Multiply CH2O subscripts by 2.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_a3',
    nodeId: 'c11_chem_cbse_006',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Why is Phenol significantly more acidic than Ethanol?',
    options: [
      'Ethanol forms stronger hydrogen bonds with water.',
      'Phenoxide ion formed after deprotonation is stabilized by delocalization of negative charge into the benzene ring (+R / resonance effect).',
      'Phenol has a higher molecular weight than ethanol.',
      'Ethoxide ion is stabilized by inductive electron withdrawal of the methyl group.'
    ],
    correctIndex: 1,
    explanation: 'Deprotonation of phenol yields phenoxide ion, which is resonance stabilized over 5 canonical structures. Ethoxide ion has no resonance and is destabilized by the +I methyl group.',
    hints: ['Look at the conjugate base stability.', 'Phenoxide ion has resonance structures.', 'Resonance delocalizes negative charge across the ring.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_a4',
    nodeId: 'c11_chem_cbse_016',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In Kjeldahl method, 0.50 g of an organic compound digested with H2SO4 liberated NH3 which neutralized 25.0 mL of 0.5 M H2SO4. What is % Nitrogen? (Formula: %N = 1.4 * N * V / m where N is normality of acid, V is volume in mL, m is mass)',
    correctAnswer: 70.0,
    tolerance: 1.0,
    explanation: 'Normality of 0.5 M H2SO4 = 2 * 0.5 = 1.0 N. % N = 1.4 * 1.0 * 25.0 / 0.50 = 35 / 0.50 = 70.0%.',
    hints: ['H2SO4 is dibasic, so Normality N = 2 × Molarity = 1.0 N.', 'Use formula %N = (1.4 × N × V) / m.', '%N = (1.4 × 1.0 × 25.0) / 0.50 = 70.0%.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_a5',
    nodeId: 'c11_chem_cbse_017',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: '0.16 g of an organic sulfur compound gave 0.233 g of BaSO4 in Carius estimation. What is % of Sulfur? (At. wts: S=32, Ba=137, O=16; Molar mass BaSO4 = 233 g/mol)',
    correctAnswer: 20.0,
    tolerance: 0.5,
    explanation: '% S = (32 / 233) * (0.233 / 0.16) * 100 = 32 * (0.001 / 0.16) * 100 = (0.032 / 0.16) * 100 = 20.0%.',
    hints: ['% S = (32 / 233) * (m_BaSO4 / m_sample) * 100', '0.233 g BaSO4 = 0.001 mol.', 'Mass of S = 0.032 g. (0.032 / 0.16) * 100 = 20%.'],
    misconceptionIndex: 3
  },
  {
    id: 'ch_a6',
    nodeId: 'c11_chem_cbse_009',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Which of the following ambident nucleophiles can attack through EITHER Carbon or Nitrogen atom depending on reaction conditions?',
    options: ['Cyanide ion (CN-)', 'Hydroxide ion (OH-)', 'Water (H2O)', 'Ammonia (NH3)'],
    correctIndex: 0,
    explanation: 'CN- is an ambident nucleophile with lone pairs on both C and N, forming nitriles (R-CN) with KCN and isonitriles (R-NC) with AgCN.',
    hints: ['Ambident nucleophiles have two donor nucleophilic centers.', 'Can form nitriles or isonitriles.', 'Cyanide ion :C≡N:-.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_a7',
    nodeId: 'c11_chem_cbse_012',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A mixture of o-nitrophenol and p-nitrophenol is separated by steam distillation because:',
    options: [
      'o-Nitrophenol forms intramolecular H-bonding (steam volatile), while p-nitrophenol forms intermolecular H-bonding (non-volatile).',
      'p-Nitrophenol has lower molecular weight than o-nitrophenol.',
      'o-Nitrophenol decomposes at 50°C.',
      'p-Nitrophenol sublimes readily without melting.'
    ],
    correctIndex: 0,
    explanation: 'Intramolecular H-bonding in o-nitrophenol prevents intermolecular association, making it lower boiling and steam volatile. p-Nitrophenol forms extensive intermolecular H-bonds, raising its boiling point.',
    hints: ['Think about Hydrogen Bonding types.', 'o-Nitrophenol forms a chelate ring internally.', 'p-Nitrophenol links molecules together in network.'],
    misconceptionIndex: 4
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS (At least 3)
// ==========================================

const ResonanceEffectSVG: React.FC<{ activeResonance: string }> = ({ activeResonance }) => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700">
      <defs>
        <radialGradient id="electronGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="piBond" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Benzene Ring Base */}
      <text x="250" y="25" fill="#e2e8f0" textAnchor="middle" className="text-sm font-bold tracking-wide">
        Resonance & Electron Delocalization (+R / -R Effect)
      </text>

      {/* Resonance Canonical Structure 1 */}
      <g transform="translate(60, 50)">
        <polygon points="60,20 100,45 100,95 60,120 20,95 20,45" fill="none" stroke="#64748b" strokeWidth="3" />
        {/* Double bonds */}
        <line x1="60" y1="26" x2="94" y2="48" stroke="#ec4899" strokeWidth="3" />
        <line x1="94" y1="92" x2="60" y2="114" stroke="#ec4899" strokeWidth="3" />
        <line x1="26" y1="92" x2="26" y2="48" stroke="#ec4899" strokeWidth="3" />
        {/* Phenolic OH */}
        <line x1="60" y1="20" x2="60" y2="-5" stroke="#94a3b8" strokeWidth="3" />
        <text x="60" y="-12" fill="#38bdf8" textAnchor="middle" className="text-xs font-semibold">:OH</text>
        <text x="60" y="145" fill="#94a3b8" textAnchor="middle" className="text-xs">Neutral Form (I)</text>
      </g>

      {/* Arrow 1 */}
      <path d="M 170,100 L 210,100" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowhead)" />
      <path d="M 210,100 L 170,100" stroke="#f59e0b" strokeWidth="3" />

      {/* Resonance Canonical Structure 2 (Ortho negative) */}
      <g transform="translate(240, 50)">
        <polygon points="60,20 100,45 100,95 60,120 20,95 20,45" fill="none" stroke="#64748b" strokeWidth="3" />
        <line x1="60" y1="20" x2="60" y2="-5" stroke="#ec4899" strokeWidth="4" />
        <text x="60" y="-12" fill="#ec4899" textAnchor="middle" className="text-xs font-bold">+OH</text>
        {/* Lone pair at ortho */}
        <circle cx="102" cy="45" r="8" fill="url(#electronGlow)" />
        <text x="114" y="48" fill="#ef4444" className="text-xs font-bold">-</text>
        <line x1="94" y1="92" x2="60" y2="114" stroke="#ec4899" strokeWidth="3" />
        <line x1="26" y1="92" x2="26" y2="48" stroke="#ec4899" strokeWidth="3" />
        <text x="60" y="145" fill="#94a3b8" textAnchor="middle" className="text-xs">Ortho-Enolate (II)</text>
      </g>

      {/* Hybrid Summary */}
      <g transform="translate(390, 50)">
        <polygon points="50,25 85,45 85,90 50,110 15,90 15,45" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" />
        <circle cx="50" cy="67" r="22" fill="none" stroke="url(#piBond)" strokeWidth="3" strokeDasharray="5,3" />
        <text x="50" y="72" fill="#f59e0b" textAnchor="middle" className="text-xs font-bold">δ-</text>
        <text x="50" y="145" fill="#38bdf8" textAnchor="middle" className="text-xs font-bold">Resonance Hybrid</text>
      </g>
    </svg>
  );
};

const ChromatographySVG: React.FC<{ solventHeight: number; soluteA: number; soluteB: number }> = ({
  solventHeight,
  soluteA,
  soluteB
}) => {
  return (
    <svg viewBox="0 0 450 260" className="w-full h-60 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700">
      <text x="225" y="22" fill="#e2e8f0" textAnchor="middle" className="text-sm font-bold">
        Thin Layer Chromatography (TLC) Retention Factor (Rf) Chamber
      </text>

      {/* Glass Jar */}
      <rect x="80" y="35" width="290" height="210" rx="12" fill="none" stroke="#64748b" strokeWidth="4" />
      {/* Solvent pool at bottom */}
      <rect x="84" y="210" width="282" height="30" fill="#0284c7" opacity="0.3" />
      <line x1="84" y1="210" x2="366" y2="210" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,3" />

      {/* TLC Plate */}
      <rect x="180" y="45" width="90" height="185" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" rx="4" />

      {/* Baseline */}
      <line x1="185" y1="200" x2="265" y2="200" stroke="#94a3b8" strokeWidth="2" strokeDasharray="2,2" />
      <text x="175" y="204" fill="#94a3b8" textAnchor="end" className="text-[10px]">Origin</text>

      {/* Solvent Front */}
      <line x1="185" y1={200 - solventHeight} x2="265" y2={200 - solventHeight} stroke="#10b981" strokeWidth="2" />
      <text x="272" y={204 - solventHeight} fill="#10b981" className="text-[10px] font-bold">Solvent Front</text>

      {/* Solute Spot A (Polar) */}
      <circle cx="210" cy={200 - soluteA} r="6" fill="#ef4444" />
      <text x="200" y={200 - soluteA + 4} fill="#ef4444" textAnchor="end" className="text-[10px] font-bold">Spot A</text>

      {/* Solute Spot B (Non-Polar) */}
      <circle cx="240" cy={200 - soluteB} r="6" fill="#8b5cf6" />
      <text x="250" y={200 - soluteB + 4} fill="#8b5cf6" className="text-[10px] font-bold">Spot B</text>

      {/* Calculations on right */}
      <g transform="translate(300, 70)">
        <rect x="0" y="0" width="135" height="110" fill="#1e293b" rx="6" stroke="#475569" strokeWidth="1" />
        <text x="67" y="20" fill="#f8fafc" textAnchor="middle" className="text-[11px] font-bold">Rf Metrics</text>
        <text x="10" y="42" fill="#ef4444" className="text-[10px]">
          Rf(A) = {(soluteA / (solventHeight || 1)).toFixed(2)}
        </text>
        <text x="10" y="62" fill="#8b5cf6" className="text-[10px]">
          Rf(B) = {(soluteB / (solventHeight || 1)).toFixed(2)}
        </text>
        <text x="10" y="85" fill="#94a3b8" className="text-[9px]">
          Stationary: Silica Gel
        </text>
        <text x="10" y="98" fill="#94a3b8" className="text-[9px]">
          Mobile: Hexane/EtOAc
        </text>
      </g>
    </svg>
  );
};

const DistillationSetupSVG: React.FC<{ mode: 'fractional' | 'steam' | 'vacuum' }> = ({ mode }) => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700">
      <text x="250" y="22" fill="#e2e8f0" textAnchor="middle" className="text-sm font-bold">
        {mode === 'fractional' && 'Fractional Distillation Assembly (Fractionating Column)'}
        {mode === 'steam' && 'Steam Distillation Unit (Insoluble Organic Volatiles)'}
        {mode === 'vacuum' && 'Distillation Under Reduced Pressure (Vacuum Pump)'}
      </text>

      {/* Boiling Flask */}
      <path d="M 100,180 C 70,180 70,130 90,110 L 90,80 L 110,80 L 110,110 C 130,130 130,180 100,180 Z" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
      {/* Liquid in Flask */}
      <path d="M 75,155 C 75,175 125,175 125,155 Z" fill="#38bdf8" opacity="0.6" />
      {/* Heat Burner */}
      <path d="M 85,210 L 115,210 L 108,185 L 92,185 Z" fill="#ef4444" />
      <text x="100" y="225" fill="#f59e0b" textAnchor="middle" className="text-[10px] font-bold">Heat Source</text>

      {/* Fractionating column / Adapter */}
      {mode === 'fractional' && (
        <g>
          <rect x="92" y="30" width="16" height="50" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          {/* Glass beads inside column */}
          <circle cx="96" cy="40" r="3" fill="#cbd5e1" />
          <circle cx="104" cy="48" r="3" fill="#cbd5e1" />
          <circle cx="97" cy="56" r="3" fill="#cbd5e1" />
          <circle cx="103" cy="64" r="3" fill="#cbd5e1" />
        </g>
      )}

      {/* Liebig Condenser */}
      <line x1="110" y1="70" x2="300" y2="130" stroke="#64748b" strokeWidth="12" strokeLinecap="round" />
      <line x1="110" y1="70" x2="300" y2="130" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

      {/* Cooling Water In / Out */}
      <path d="M 270,140 L 270,160" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrowhead)" />
      <text x="270" y="172" fill="#38bdf8" textAnchor="middle" className="text-[9px]">H2O In</text>

      <path d="M 140,60 L 140,40" stroke="#0284c7" strokeWidth="3" />
      <text x="140" y="32" fill="#38bdf8" textAnchor="middle" className="text-[9px]">H2O Out</text>

      {/* Receiving Adapter & Erlenmeyer Flask */}
      <path d="M 300,130 L 320,160 L 320,170" stroke="#94a3b8" strokeWidth="3" fill="none" />
      <polygon points="300,210 340,210 325,170 315,170" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
      <ellipse cx="320" cy="205" rx="15" ry="4" fill="#10b981" />
      <text x="320" y="225" fill="#10b981" textAnchor="middle" className="text-[10px] font-bold">Pure Distillate</text>

      {/* Vacuum tube if vacuum mode */}
      {mode === 'vacuum' && (
        <g transform="translate(325, 140)">
          <path d="M 0,0 L 40,-20" stroke="#f59e0b" strokeWidth="3" strokeDasharray="3,3" />
          <rect x="40" y="-30" width="55" height="20" fill="#b45309" rx="3" />
          <text x="67" y="-16" fill="#fff" textAnchor="middle" className="text-[9px] font-bold">Vacuum Pump</text>
        </g>
      )}

      {/* Steam generator if steam mode */}
      {mode === 'steam' && (
        <g transform="translate(15, 80)">
          <rect x="0" y="40" width="40" height="60" fill="#0284c7" opacity="0.5" rx="4" />
          <path d="M 20,40 L 20,10 L 75,10 L 75,70" fill="none" stroke="#38bdf8" strokeWidth="3" />
          <text x="20" y="115" fill="#38bdf8" textAnchor="middle" className="text-[9px] font-bold">Steam Boiler</text>
        </g>
      )}
    </svg>
  );
};

const IntermediateStabilitySVG: React.FC<{ intermediateType: 'carbocation' | 'carbanion' | 'radical' }> = ({ intermediateType }) => {
  return (
    <svg viewBox="0 0 500 230" className="w-full h-56 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700">
      <text x="250" y="22" fill="#e2e8f0" textAnchor="middle" className="text-sm font-bold">
        {intermediateType === 'carbocation' && 'Carbocation Stability Order (3° > 2° > 1° > Methyl)'}
        {intermediateType === 'carbanion' && 'Carbanion Stability Order (Methyl > 1° > 2° > 3°)'}
        {intermediateType === 'radical' && 'Free Radical Stability Order (3° > 2° > 1° > Methyl)'}
      </text>

      {/* 3° Structure */}
      <g transform="translate(60, 60)">
        <circle cx="50" cy="50" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
        <text x="50" y="46" fill="#f8fafc" textAnchor="middle" className="text-sm font-bold">C</text>
        {intermediateType === 'carbocation' && <text x="50" y="62" fill="#ef4444" textAnchor="middle" className="text-xs font-bold">+</text>}
        {intermediateType === 'carbanion' && <text x="50" y="62" fill="#3b82f6" textAnchor="middle" className="text-xs font-bold">:-</text>}
        {intermediateType === 'radical' && <circle cx="50" cy="62" r="3" fill="#f59e0b" />}

        {/* 3 methyls */}
        <line x1="50" y1="22" x2="50" y2="2" stroke="#94a3b8" strokeWidth="2" />
        <text x="50" y="-2" fill="#cbd5e1" textAnchor="middle" className="text-xs">CH3</text>
        <line x1="26" y1="62" x2="8" y2="74" stroke="#94a3b8" strokeWidth="2" />
        <text x="2" y="86" fill="#cbd5e1" textAnchor="middle" className="text-xs">CH3</text>
        <line x1="74" y1="62" x2="92" y2="74" stroke="#94a3b8" strokeWidth="2" />
        <text x="98" y="86" fill="#cbd5e1" textAnchor="middle" className="text-xs">CH3</text>

        <text x="50" y="115" fill="#f59e0b" textAnchor="middle" className="text-xs font-bold">Tertiary (3°)</text>
        <text x="50" y="130" fill="#94a3b8" textAnchor="middle" className="text-[10px]">9 α-H (Max hyperconj)</text>
      </g>

      {/* 2° Structure */}
      <g transform="translate(200, 60)">
        <circle cx="50" cy="50" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
        <text x="50" y="46" fill="#f8fafc" textAnchor="middle" className="text-sm font-bold">C</text>
        {intermediateType === 'carbocation' && <text x="50" y="62" fill="#ef4444" textAnchor="middle" className="text-xs font-bold">+</text>}
        {intermediateType === 'carbanion' && <text x="50" y="62" fill="#3b82f6" textAnchor="middle" className="text-xs font-bold">:-</text>}
        {intermediateType === 'radical' && <circle cx="50" cy="62" r="3" fill="#f59e0b" />}

        <line x1="50" y1="22" x2="50" y2="2" stroke="#94a3b8" strokeWidth="2" />
        <text x="50" y="-2" fill="#cbd5e1" textAnchor="middle" className="text-xs">H</text>
        <line x1="26" y1="62" x2="8" y2="74" stroke="#94a3b8" strokeWidth="2" />
        <text x="2" y="86" fill="#cbd5e1" textAnchor="middle" className="text-xs">CH3</text>
        <line x1="74" y1="62" x2="92" y2="74" stroke="#94a3b8" strokeWidth="2" />
        <text x="98" y="86" fill="#cbd5e1" textAnchor="middle" className="text-xs">CH3</text>

        <text x="50" y="115" fill="#f59e0b" textAnchor="middle" className="text-xs font-bold">Secondary (2°)</text>
        <text x="50" y="130" fill="#94a3b8" textAnchor="middle" className="text-[10px]">6 α-H</text>
      </g>

      {/* 1° Structure */}
      <g transform="translate(340, 60)">
        <circle cx="50" cy="50" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
        <text x="50" y="46" fill="#f8fafc" textAnchor="middle" className="text-sm font-bold">C</text>
        {intermediateType === 'carbocation' && <text x="50" y="62" fill="#ef4444" textAnchor="middle" className="text-xs font-bold">+</text>}
        {intermediateType === 'carbanion' && <text x="50" y="62" fill="#3b82f6" textAnchor="middle" className="text-xs font-bold">:-</text>}
        {intermediateType === 'radical' && <circle cx="50" cy="62" r="3" fill="#f59e0b" />}

        <line x1="50" y1="22" x2="50" y2="2" stroke="#94a3b8" strokeWidth="2" />
        <text x="50" y="-2" fill="#cbd5e1" textAnchor="middle" className="text-xs">H</text>
        <line x1="26" y1="62" x2="8" y2="74" stroke="#94a3b8" strokeWidth="2" />
        <text x="2" y="86" fill="#cbd5e1" textAnchor="middle" className="text-xs">H</text>
        <line x1="74" y1="62" x2="92" y2="74" stroke="#94a3b8" strokeWidth="2" />
        <text x="98" y="86" fill="#cbd5e1" textAnchor="middle" className="text-xs">CH3</text>

        <text x="50" y="115" fill="#f59e0b" textAnchor="middle" className="text-xs font-bold">Primary (1°)</text>
        <text x="50" y="130" fill="#94a3b8" textAnchor="middle" className="text-[10px]">3 α-H</text>
      </g>
    </svg>
  );
};

// ==========================================
// INTERACTIVE CANVAS SIMULATION COMPONENT
// ==========================================
const DynamicReactionCanvas: React.FC<{
  labMode: number;
  substituent: string;
  cleavageType: 'homolytic' | 'heterolytic';
  solventPolarity: number;
  titrationVol: number;
}> = ({ labMode, substituent, cleavageType, solventPolarity, titrationVol }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lab 1: Electronic effects electron density cloud
      if (labMode === 0) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`Substituent Effect: ${substituent} on Carbon Chain`, 20, 30);

        // Carbon chain
        for (let i = 0; i < 4; i++) {
          const x = 120 + i * 80;
          const y = 120;
          ctx.beginPath();
          ctx.arc(x, y, 18, 0, Math.PI * 2);
          ctx.fillStyle = '#334155';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText(`C${4 - i}`, x - 8, y + 4);

          if (i < 3) {
            ctx.beginPath();
            ctx.moveTo(x + 18, y);
            ctx.lineTo(x + 62, y);
            ctx.strokeStyle = '#64748b';
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }

        // Substituent at far right
        ctx.beginPath();
        ctx.arc(440, 120, 22, 0, Math.PI * 2);
        const isWithdrawing = ['-NO2', '-CN', '-COOH', '-F', '-Cl'].includes(substituent);
        ctx.fillStyle = isWithdrawing ? '#ef4444' : '#10b981';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(substituent, 425, 124);

        // Animated Dipole Arrows
        const direction = isWithdrawing ? 1 : -1;
        for (let i = 0; i < 3; i++) {
          const startX = 140 + i * 80 + (direction === 1 ? 0 : 40);
          const endX = startX + direction * 30;
          const arrowX = startX + Math.sin(time * 3 + i) * 5 + direction * 15;

          ctx.beginPath();
          ctx.moveTo(startX, 80);
          ctx.lineTo(endX, 80);
          ctx.strokeStyle = isWithdrawing ? '#f59e0b' : '#38bdf8';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Arrowhead
          ctx.beginPath();
          ctx.arc(arrowX, 80, 4, 0, Math.PI * 2);
          ctx.fillStyle = isWithdrawing ? '#ef4444' : '#38bdf8';
          ctx.fill();
        }

        ctx.fillStyle = isWithdrawing ? '#fca5a5' : '#6ee7b7';
        ctx.font = '12px sans-serif';
        ctx.fillText(
          isWithdrawing
            ? '-I Effect: Electron density pulled towards substituent (diminishes down chain)'
            : '+I Effect: Electron density pushed into carbon chain',
          20,
          190
        );
      }
      // Lab 2: Bond Cleavage Simulation
      else if (labMode === 1) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`Covalent Bond Cleavage Mode: ${cleavageType.toUpperCase()}`, 20, 30);

        const separation = (Math.sin(time) + 1) * 35;
        const x1 = 200 - separation;
        const x2 = 320 + separation;

        // Atom A (Carbon)
        ctx.beginPath();
        ctx.arc(x1, 120, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('R3C', x1 - 14, 125);

        // Atom B (Leaving group / Radical partner)
        ctx.beginPath();
        ctx.arc(x2, 120, 25, 0, Math.PI * 2);
        ctx.fillStyle = cleavageType === 'homolytic' ? '#3b82f6' : '#ef4444';
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('X', x2 - 5, 125);

        if (cleavageType === 'homolytic') {
          // Single fishhook electrons
          ctx.beginPath();
          ctx.arc(x1 + 30, 120, 5, 0, Math.PI * 2);
          ctx.arc(x2 - 30, 120, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();

          ctx.fillStyle = '#fef08a';
          ctx.font = '12px sans-serif';
          ctx.fillText('Homolytic: Symmetrical splitting yielding Free Radicals (R3C• + •X)', 20, 190);
        } else {
          // Pair of electrons going to X
          ctx.beginPath();
          ctx.arc(x2 - 25, 115, 4, 0, Math.PI * 2);
          ctx.arc(x2 - 25, 125, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();

          ctx.fillStyle = '#fca5a5';
          ctx.font = '12px sans-serif';
          ctx.fillText('Heterolytic: Unsymmetrical splitting yielding Ions (R3C+ + :X-)', 20, 190);
        }
      }
      // Lab 4: TLC & Solvent Migration
      else if (labMode === 3) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '14px sans-serif';
        ctx.fillText(`TLC Solute Separation vs Mobile Phase Polarity (${solventPolarity}% Polarity)`, 20, 30);

        // Plate
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(200, 50, 120, 150);

        // Solvent line
        const front = 50 + (1 - solventPolarity / 100) * 110;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, front);
        ctx.lineTo(320, front);
        ctx.stroke();

        // Spot 1 (polar)
        const spot1Y = 180 - (solventPolarity / 100) * 60;
        ctx.beginPath();
        ctx.arc(240, spot1Y, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        // Spot 2 (nonpolar)
        const spot2Y = 180 - (solventPolarity / 100) * 110;
        ctx.beginPath();
        ctx.arc(280, spot2Y, 7, 0, Math.PI * 2);
        ctx.fillStyle = '#8b5cf6';
        ctx.fill();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.fillText('Polar Solute (Red) retention high on silica', 20, 100);
        ctx.fillText('Nonpolar Solute (Purple) elutes faster', 20, 130);
      }
      // Lab 5: Quantitative Titration Simulation
      else {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '14px sans-serif';
        ctx.fillText(`Kjeldahl Acid-Base Titration (Added NaOH: ${titrationVol.toFixed(1)} mL)`, 20, 30);

        // Burette
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 4;
        ctx.strokeRect(320, 40, 16, 100);

        // Liquid in burette
        const fillHeight = 100 - (titrationVol / 50) * 80;
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(322, 40 + (100 - fillHeight), 12, fillHeight);

        // Drip animation
        const dropY = 140 + ((time * 40) % 40);
        ctx.beginPath();
        ctx.arc(328, dropY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        // Flask
        ctx.beginPath();
        ctx.moveTo(310, 180);
        ctx.lineTo(346, 180);
        ctx.lineTo(370, 220);
        ctx.lineTo(286, 220);
        ctx.closePath();
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Solution inside flask (Indicator color change at endpoint ~25 mL)
        const isEndpoint = titrationVol >= 25;
        ctx.fillStyle = isEndpoint ? '#ec4899' : '#e2e8f0';
        ctx.fill();

        ctx.fillStyle = isEndpoint ? '#f472b6' : '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText(
          isEndpoint ? 'ENDPOINT REACHED! Methyl Orange / Phenolphthalein turned Pink' : 'Titrating unreacted HCl with std. NaOH...',
          20,
          190
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [labMode, substituent, cleavageType, solventPolarity, titrationVol]);

  return (
    <canvas
      ref={canvasRef}
      width={520}
      height={230}
      className="w-full h-60 rounded-xl bg-slate-900 border border-slate-700 shadow-lg"
    />
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export const C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim: React.FC<{
  initialNodeId?: string;
  onComplete?: (score: number) => void;
}> = ({ initialNodeId = DEFAULT_PROPS.initialNodeId, onComplete = DEFAULT_PROPS.onComplete }) => {
  // Navigation & Tabs State
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'lab' | 'challenges' | 'summary'>('scenario');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);

  // Interactive Lab Controls State
  const [substituent, setSubstituent] = useState<string>('-NO2');
  const [cleavageType, setCleavageType] = useState<'homolytic' | 'heterolytic'>('heterolytic');
  const [intermediateType, setIntermediateType] = useState<'carbocation' | 'carbanion' | 'radical'>('carbocation');
  const [distillationMode, setDistillationMode] = useState<'fractional' | 'steam' | 'vacuum'>('fractional');
  const [solventPolarity, setSolventPolarity] = useState<number>(40);
  const [titrationVol, setTitrationVol] = useState<number>(10);

  // Quant analysis calculator state
  const [massSample, setMassSample] = useState<number>(0.20);
  const [massCO2, setMassCO2] = useState<number>(0.44);
  const [massH2O, setMassH2O] = useState<number>(0.18);

  // Mandatory Feedback Components State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Discovery / Prediction / Observation State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoveryFeedback, setDiscoveryFeedback] = useState<string | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // BKT & SRS Tracking State
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Auto-hint timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetHintTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIndex];
      if (activeChallenge && activeTab === 'challenges') {
        setCurrentHint(activeChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [currentChallengeIndex, activeTab]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetHintTimer]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (optIndex: number) => {
    setDiscoveryAnswer(optIndex);
    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Brilliant! You correctly identified that hyperconjugation and inductive dispersal stabilize carbocations.');
      setDiscoveryFeedback('Correct! ' + DISCOVERY_QUESTION.hintAfter);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      setDiscoveryFeedback('Not quite. Remember that hyperconjugation involves overlap of alpha C-H sigma bonds with the vacant p-orbital!');
    }
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = () => {
    const currentCh = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && currentCh.correctAnswer !== undefined) {
        const tol = currentCh.tolerance || 0.1;
        isCorrect = Math.abs(val - currentCh.correctAnswer) <= tol;
      }
    } else if (selectedOption !== null) {
      isCorrect = selectedOption === currentCh.correctIndex;
    }

    // BKT & SRS Updates
    const oldBkt = (bktStates[currentCh.nodeId] as ReturnType<typeof createBKTState>) || createBKTState();
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [currentCh.nodeId]: updatedBkt }));

    const oldSrs = srsItems[currentCh.nodeId] || createReviewItem(currentCh.nodeId);
    const updatedSrs = sm2Update(oldSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [currentCh.nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent calculation! Correct answer.');
      setFeedback({ isCorrect: true, message: `Correct! ${currentCh.explanation}` });
      setScore((prev) => prev + 10);
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the explanation and try again.');
      setFeedback({ isCorrect: false, message: `Incorrect. ${currentCh.explanation}` });
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericInput('');
    setFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      recordGameScore('c11_chem_cbse_organic_part2', score + 10);
      onComplete(score + 10);
      setActiveTab('summary');
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You completed the organic chemistry module.');
    }
  };

  // Calculations for Lab 5 Quant Analysis
  const calculatedC = useMemo(() => {
    if (massSample <= 0) return 0;
    return ((12 / 44) * (massCO2 / massSample) * 100).toFixed(2);
  }, [massCO2, massSample]);

  const calculatedH = useMemo(() => {
    if (massSample <= 0) return 0;
    return ((2 / 18) * (massH2O / massSample) * 100).toFixed(2);
  }, [massH2O, massSample]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 font-sans flex flex-col items-center">
      {/* Mandatory Feedback Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <HintBubble show={showHint} text={currentHint} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 flex flex-col md:flex-row items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3 mb-2 md:mb-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center font-bold text-white text-xl">
            C2
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
              ISC Chemistry 11: Organic Principles & Analysis
            </h1>
            <p className="text-xs text-slate-400">Electronic Effects, Reactive Intermediates, Purification & Elemental Analysis</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 space-x-1">
          <button
            onClick={() => { setActiveTab('scenario'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'scenario' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Scenario
          </button>
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'discovery' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'lab' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Virtual Lab
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'challenges' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Challenges ({currentChallengeIndex + 1}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'summary' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Summary & Report
          </button>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl flex-grow">
        {/* TAB 1: SCENARIO */}
        {activeTab === 'scenario' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold text-gold-400 mb-4">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed mb-4 text-base">{SCENARIO.intro}</p>
            <p className="text-slate-400 leading-relaxed mb-6 text-sm">{SCENARIO.context}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="font-semibold text-gold-300 text-sm mb-1">Core Modules Covered</h3>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Inductive, Electromeric, Resonance Effects</li>
                  <li>Hyperconjugation & α-Hydrogen counting</li>
                  <li>Homolytic & Heterolytic Cleavages</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="font-semibold text-gold-300 text-sm mb-1">Purification Techniques</h3>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Steam & Fractional Distillation</li>
                  <li>Vacuum Distillation for Glycerol</li>
                  <li>TLC Rf calculations & Column Chromatography</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <h3 className="font-semibold text-emerald-300 text-sm mb-1">Quantitative Analysis</h3>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  <li>Liebig C & H Estimation</li>
                  <li>Dumas & Kjeldahl Nitrogen Methods</li>
                  <li>Carius Halogen & Sulfur estimations</li>
                </ul>
              </div>
            </div>

            <button
              onClick={() => { setActiveTab('discovery'); audioManager.play('swoop'); }}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl font-bold text-white shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              Begin Discovery Investigation →
            </button>
          </div>
        )}

        {/* TAB 2: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <h2 className="text-xl font-bold text-gold-400">Discovery & Preconception Inquiry</h2>

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
              <p className="font-semibold text-slate-200">{DISCOVERY_QUESTION.question}</p>
              <div className="grid grid-cols-1 gap-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-3 text-left rounded-xl text-xs font-medium transition-all ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-600 text-white border border-emerald-400'
                          : 'bg-rose-600 text-white border border-rose-400'
                        : 'bg-slate-700 hover:bg-slate-650 text-slate-200'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                ))}
              </div>
              {discoveryFeedback && (
                <div className="p-3 bg-slate-900 rounded-lg text-xs text-gold-300 border border-slate-700">
                  {discoveryFeedback}
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS SECTION */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <h3 className="text-lg font-bold text-gold-300">Predictive Chemistry Questions</h3>
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
                  <p className="text-xs font-bold text-slate-200">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          const updated = [...predictionAnswers];
                          updated[qIdx] = oIdx;
                          setPredictionAnswers(updated);
                          if (oIdx === pq.correctIndex) {
                            audioManager.play('pop');
                          } else {
                            audioManager.play('drop-wrong');
                          }
                        }}
                        className={`p-2.5 text-left rounded-lg text-[11px] font-medium transition-all ${
                          predictionAnswers[qIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 italic">How to verify: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setActiveTab('lab'); audioManager.play('swoop'); }}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-500 rounded-xl font-bold text-white shadow-lg hover:from-gold-400 hover:to-gold-400 transition-all"
            >
              Enter Interactive Virtual Lab →
            </button>
          </div>
        )}

        {/* TAB 3: VIRTUAL LAB */}
        {activeTab === 'lab' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Exploration Steps Navigation (MANDATORY RENDERING) */}
            <div className="flex overflow-x-auto space-x-2 pb-2 border-b border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveLabIndex(idx); audioManager.play('tap'); }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeLabIndex === idx
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-300 bg-slate-800 p-3 rounded-lg border border-slate-700">
              {EXPLORATION_STEPS[activeLabIndex].instruction}
            </p>

            {/* LAB 1: ELECTRONIC EFFECTS */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ResonanceEffectSVG activeResonance={substituent} />
                  <DynamicReactionCanvas
                    labMode={0}
                    substituent={substituent}
                    cleavageType={cleavageType}
                    solventPolarity={solventPolarity}
                    titrationVol={titrationVol}
                  />
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-gold-300 text-sm">Substituent & Electronic Effect Controls</h3>
                  <p className="text-xs text-slate-400">Select a functional group to observe its Inductive (-I/+I) and Resonance (-R/+R) impact on benzene/alkanes.</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {['-NO2', '-CN', '-COOH', '-F', '-Cl', '-CH3', '-OCH3', '-OH'].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => { setSubstituent(sub); audioManager.play('pop'); }}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                          substituent === sub
                            ? 'bg-gold-600 text-white border-gold-400 shadow'
                            : 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-650'
                        }`}
                      >
                        {sub} ({['-NO2', '-CN', '-COOH', '-F', '-Cl'].includes(sub) ? '-I / -R' : '+I / +R'})
                      </button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 text-slate-300">
                    <p><span className="font-bold text-gold-400">Inductive Effect:</span> Permanent displacement of σ-electrons along saturated carbon chain.</p>
                    <p><span className="font-bold text-gold-400">Resonance Effect:</span> Delocalization of π-electrons / lone pairs in conjugated systems.</p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: REACTIVE INTERMEDIATES & BOND CLEAVAGE */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <IntermediateStabilitySVG intermediateType={intermediateType} />
                  <DynamicReactionCanvas
                    labMode={1}
                    substituent={substituent}
                    cleavageType={cleavageType}
                    solventPolarity={solventPolarity}
                    titrationVol={titrationVol}
                  />
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-gold-300 text-sm">Intermediate Stability & Cleavage Dynamics</h3>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold">Select Cleavage Type:</label>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => { setCleavageType('homolytic'); audioManager.play('whoosh'); }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          cleavageType === 'homolytic' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Homolytic (Free Radicals)
                      </button>
                      <button
                        onClick={() => { setCleavageType('heterolytic'); audioManager.play('whoosh'); }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                          cleavageType === 'heterolytic' ? 'bg-gold-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Heterolytic (Cation / Anion)
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold">Select Reactive Intermediate:</label>
                    <div className="flex space-x-2">
                      {(['carbocation', 'carbanion', 'radical'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => { setIntermediateType(type); audioManager.play('pop'); }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                            intermediateType === type ? 'bg-gold-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-emerald-400">Hyperconjugation Rule:</p>
                    <p>More α-hydrogens = Greater no-bond resonance = Greater stability for Carbocations and Free Radicals!</p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: REAGENTS & REACTION TYPES */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-gold-300 text-sm">Electrophiles vs Nucleophiles Classifier</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900 p-3 rounded-lg border border-gold-800">
                      <h4 className="font-bold text-gold-400 mb-2">Electrophiles (E+)</h4>
                      <p className="text-slate-400 text-[11px] mb-2">Electron-loving, electron deficient (Lewis Acids)</p>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">H+</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">NO2+</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">BF3</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">AlCl3</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">R3C+</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-gold-800">
                      <h4 className="font-bold text-gold-400 mb-2">Nucleophiles (Nu:)</h4>
                      <p className="text-slate-400 text-[11px] mb-2">Nucleus-loving, electron-rich (Lewis Bases)</p>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">OH-</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">CN-</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">NH3</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">H2O</span>
                      <span className="inline-block bg-slate-800 px-2 py-1 rounded text-gold-300 text-[10px] font-mono mr-1 mb-1">R-MgX</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-emerald-300 text-sm">4 Major Reaction Types Matrix</h3>
                  <div className="space-y-2 text-xs">
                    <div className="bg-slate-900 p-2.5 rounded-lg">
                      <span className="font-bold text-gold-400">1. Substitution:</span> Attacking species replaces a substituent group (e.g., CH3Cl + OH- → CH3OH + Cl-).
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg">
                      <span className="font-bold text-gold-400">2. Addition:</span> Reagents add across double/triple bond (e.g., CH2=CH2 + HBr → CH3CH2Br).
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg">
                      <span className="font-bold text-amber-400">3. Elimination:</span> Small molecule removed forming unsaturation (e.g., CH3CH2OH → CH2=CH2 + H2O).
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-lg">
                      <span className="font-bold text-rose-400">4. Rearrangement:</span> Migration of atoms/groups within same molecule to yield structural isomer.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: PURIFICATION & CHROMATOGRAPHY */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <ChromatographySVG solventHeight={110} soluteA={(110 * solventPolarity) / 200} soluteB={(110 * solventPolarity) / 110} />
                  <DistillationSetupSVG mode={distillationMode} />
                </div>
                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-gold-300 text-sm">Separation Apparatus Controls</h3>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-semibold">Distillation Mode:</label>
                    <div className="flex space-x-2">
                      {(['fractional', 'steam', 'vacuum'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => { setDistillationMode(mode); audioManager.play('tap'); }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                            distillationMode === mode ? 'bg-gold-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>TLC Mobile Phase Polarity:</span>
                      <span className="font-bold text-gold-400">{solventPolarity}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={solventPolarity}
                      onChange={(e) => setSolventPolarity(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-amber-400">Distillation Criteria:</p>
                    <p>• Fractional: BP difference &lt; 25 K</p>
                    <p>• Steam: Insoluble in water, steam volatile (e.g., o-Nitrophenol)</p>
                    <p>• Vacuum: Decomposes at/near BP (e.g., Glycerol)</p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: ELEMENTAL QUANTITATIVE ANALYSIS */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <DynamicReactionCanvas
                    labMode={4}
                    substituent={substituent}
                    cleavageType={cleavageType}
                    solventPolarity={solventPolarity}
                    titrationVol={titrationVol}
                  />

                  {/* Dynamic Calculator Box */}
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-3">
                    <h4 className="font-bold text-emerald-300 text-xs uppercase tracking-wider">Liebig C & H Interactive Calculator</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-400">Sample Mass (g)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={massSample}
                          onChange={(e) => setMassSample(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gold-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">CO2 Mass (g)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={massCO2}
                          onChange={(e) => setMassCO2(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gold-300"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">H2O Mass (g)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={massH2O}
                          onChange={(e) => setMassH2O(Number(e.target.value))}
                          className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-gold-300"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-2 bg-slate-900 rounded border border-slate-700 text-xs">
                      <div>
                        % Carbon = <span className="font-bold text-gold-400">{calculatedC}%</span>
                      </div>
                      <div>
                        % Hydrogen = <span className="font-bold text-emerald-400">{calculatedH}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-gold-300 text-sm">Quantitative Methods Reference</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Simulate Titrant Volume (NaOH):</span>
                      <span className="font-bold text-pink-400">{titrationVol.toFixed(1)} mL</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      step={0.5}
                      value={titrationVol}
                      onChange={(e) => setTitrationVol(Number(e.target.value))}
                      className="w-full accent-pink-500"
                    />
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-lg">
                      <p className="font-bold text-gold-400">Dumas Method (N2 Gas):</p>
                      <p className="text-slate-400 text-[11px]">%N = (28 / 22400) × (V_STP / mass) × 100</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg">
                      <p className="font-bold text-pink-400">Kjeldahl Method (NH3 Titration):</p>
                      <p className="text-slate-400 text-[11px]">%N = (1.4 × Normality × Volume) / mass</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg">
                      <p className="font-bold text-emerald-400">Carius Halogen Method (AgX PPT):</p>
                      <p className="text-slate-400 text-[11px]">%X = (At.wt X / Mol.wt AgX) × (m_AgX / m_sample) × 100</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY OBSERVATION QUESTIONS SECTION */}
            <div className="space-y-4 border-t border-slate-800 pt-4">
              <h3 className="text-lg font-bold text-gold-400">Lab Observation Questions</h3>
              {OBSERVATION_QUESTIONS.map((oq, oqIdx) => (
                <div key={oqIdx} className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-3">
                  <p className="text-xs font-bold text-slate-200">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          const updated = [...observationAnswers];
                          updated[oqIdx] = optIdx;
                          setObservationAnswers(updated);
                          if (optIdx === oq.correctIndex) {
                            audioManager.play('chime');
                          } else {
                            audioManager.play('drop-wrong');
                          }
                        }}
                        className={`p-2.5 text-left rounded-lg text-[11px] font-medium transition-all ${
                          observationAnswers[oqIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { setActiveTab('challenges'); audioManager.play('swoop'); }}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl font-bold text-white shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              Proceed to Mastery Challenges →
            </button>
          </div>
        )}

        {/* TAB 4: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className={`ml-3 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-900 text-emerald-300'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-900 text-amber-300'
                    : 'bg-rose-900 text-rose-300'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
              </div>
              <div className="text-xs text-slate-400">
                Score: <span className="font-bold text-gold-400">{score} pts</span>
              </div>
            </div>

            {/* Question Text */}
            <h3 className="text-base font-bold text-slate-100">
              {CHALLENGES[currentChallengeIndex].question}
            </h3>

            {/* Answer Controls: Multiple Choice vs Numeric */}
            {CHALLENGES[currentChallengeIndex].type === 'numeric' ? (
              <div className="space-y-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric answer..."
                  className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-gold-300 text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedOption(idx); audioManager.play('pop'); }}
                    className={`p-3 text-left rounded-xl text-xs font-medium transition-all ${
                      selectedOption === idx
                        ? 'bg-gold-600 text-white border border-gold-400 shadow'
                        : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Feedback display */}
            {feedback && (
              <div
                className={`p-4 rounded-xl text-xs font-medium ${
                  feedback.isCorrect
                    ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200'
                    : 'bg-rose-900/60 border border-rose-500 text-rose-200'
                }`}
              >
                {feedback.message}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex space-x-3 pt-2">
              {!feedback ? (
                <button
                  onClick={handleChallengeSubmit}
                  className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl font-bold text-white shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-gold-600 rounded-xl font-bold text-white shadow-lg hover:from-emerald-400 hover:to-gold-500 transition-all"
                >
                  {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish Simulation Lab'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 5: SUMMARY & REPORT */}
        {activeTab === 'summary' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-gold-400">Organic Lab Executive Report & Mastery Summary</h2>
              <span className="text-xs bg-emerald-900 text-emerald-300 px-3 py-1 rounded-full font-bold">
                Final Score: {score} / 220
              </span>
            </div>

            {/* MANDATORY REAL WORLD ACTIVITY SECTION */}
            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-3">
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="space-y-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-900 p-3 rounded-lg text-xs text-slate-300 border border-slate-750">
                    <span className="font-bold text-gold-400 mr-2">Phase {sIdx + 1}:</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS & CORRECTIONS MATRIX */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">Common Misconceptions & Clarifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-1.5 text-xs">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ Correct Fact: {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC RECAP TABLE */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">Concept Mastery Diagnostics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-xs space-y-1">
                    <p className="font-semibold text-slate-200">{dq.question}</p>
                    <p className="text-gold-300 font-bold">Answer: {dq.options[dq.correctIndex]}</p>
                    <p className="text-slate-400 text-[11px]">{dq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentChallengeIndex(0);
                setScore(0);
                setActiveTab('scenario');
                audioManager.play('swoop');
              }}
              className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 rounded-xl font-bold text-white shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
            >
              Restart Full Simulation Lab
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default C11_ChemistryOrganicChemistryBasicPrincPart2CBSESim;