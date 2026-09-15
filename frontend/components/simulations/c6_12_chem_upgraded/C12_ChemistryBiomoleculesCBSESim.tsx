'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. ALL NODE IDS DEFINITION
// ==========================================
export const ALL_NODE_IDS = [
  'c12_chem_cbse_301',
  'c12_chem_cbse_302',
  'c12_chem_cbse_303',
  'c12_chem_cbse_304',
  'c12_chem_cbse_305',
  'c12_chem_cbse_308',
  'c12_chem_cbse_309',
  'c12_chem_cbse_310',
  'c12_chem_cbse_311',
  'c12_chem_cbse_312',
  'c12_chem_cbse_313',
  'c12_chem_cbse_314',
  'c12_chem_cbse_315',
  'c12_chem_cbse_316',
  'c12_chem_cbse_317',
  'c12_chem_cbse_318',
  'c12_chem_cbse_323',
  'c12_chem_cbse_324',
  'c12_chem_cbse_326',
  'c12_chem_cbse_328',
  'c12_chem_cbse_329',
  'c12_chem_cbse_331',
  'c12_chem_cbse_332',
  'c12_chem_cbse_333',
  'c12_chem_cbse_335'
] as const;

export type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// 2. MANDATORY MANDATED DATA STRUCTURES
// ==========================================

const SCENARIO = {
  title: 'Advanced ISC Bio-Molecular Structural & Enzymatic Virtual Chemistry Laboratory',
  intro: 'Step into a state-of-the-art molecular biology and biochemistry lab. As a senior ISC research chemist, you will probe the 3D structures, chemical reactions, and stereochemistry of carbohydrates, proteins, nucleic acids, enzymes, and vitamins.',
  context: 'Investigate Haworth projections, mutarotation dynamics, amino acid zwitterions, peptide synthesis, enzyme kinetics under varying pH and temperature, and double-stranded DNA base pairing with exact hydrogen bonding count.'
};

const DISCOVERY_QUESTION = {
  question: 'Why does sucrose, composed of reducing monosaccharides (D-glucose and D-fructose), act as a non-reducing sugar that does NOT undergo mutarotation or reduce Fehling solution?',
  options: [
    'Because fructose isomerizes into glucose during sucrose formation, preventing oxidation.',
    'Because the glycosidic linkage involves BOTH the hemiacetal C1 of α-D-glucose AND the hemiketal C2 of β-D-fructose, leaving no free carbonyl group.',
    'Because sucrose forms an insoluble crystal lattice that masks the aldehyde functionality.',
    'Because the peptide bond between glucose and fructose hydrolyzes in basic copper solution.'
  ],
  correctIndex: 1,
  hintAfter: 'A sugar acts as reducing only if it possesses a free hemiacetal or hemiketal hydroxyl group capable of opening into an active aldehyde or ketone group.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Glucose Anomers & Mutarotation Kinetics',
    instruction: 'Toggle between Fischer open-chain D-glucose and Haworth ring forms (α-D-glucopyranose vs β-D-glucopyranose). Measure specific rotation changes during mutarotation reaching equilibrium (+52.7°).',
    interactionType: 'anomer-mutarotation-lab',
    nodeId: 'c12_chem_cbse_304' as NodeId
  },
  {
    title: 'Lab 2: Amino Acid Titration & Isoelectric Point (pI)',
    instruction: 'Adjust solution pH from 1.0 to 13.0 to observe protonation states of Alanine: Cationic (+1), Zwitterion (0 net charge at pI = 6.0), and Anionic (-1).',
    interactionType: 'zwitterion-titration-lab',
    nodeId: 'c12_chem_cbse_314' as NodeId
  },
  {
    title: 'Lab 3: Peptide Synthesis & Protein Thermal Denaturation',
    instruction: 'Synthesize a tripeptide sequence (Gly-Ala-Val) via condensation, then alter temperature to trigger 2° and 3° unfolding while keeping the 1° primary peptide sequence intact.',
    interactionType: 'peptide-denaturation-lab',
    nodeId: 'c12_chem_cbse_323' as NodeId
  },
  {
    title: 'Lab 4: Enzyme Kinetics & Temperature/pH Optimum',
    instruction: 'Vary reaction temperature and substrate concentration [S] to observe Michaelis-Menten enzyme rate curves (Vmax, Km) and reversible/irreversible thermal inactivation.',
    interactionType: 'enzyme-kinetics-lab',
    nodeId: 'c12_chem_cbse_324' as NodeId
  },
  {
    title: 'Lab 5: DNA Double Helix Base Pairing & Thermal Melting (Tm)',
    instruction: 'Assemble complementary DNA strands (A=T with 2 hydrogen bonds, G≡C with 3 hydrogen bonds) and calculate the thermal melting temperature (Tm) based on GC content.',
    interactionType: 'dna-base-pairing-lab',
    nodeId: 'c12_chem_cbse_331' as NodeId
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What product is formed when D-glucose reacts with excess acetic anhydride in the presence of pyridine?',
    options: [
      'Glucose monacetate at C-1',
      'Gluconic acid pentacetate',
      'Glucose pentaacetate confirming the presence of 5 -OH groups',
      'Saccharic acid with two carboxlyic groups'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 1, test glucose acetylation reaction with Ac2O.',
    nodeId: 'c12_chem_cbse_303' as NodeId
  },
  {
    question: 'Predict: How will doubling the Guanine-Cytosine (G-C) content of a double-stranded DNA oligomer affect its melting temperature (Tm)?',
    options: [
      'Tm will decrease because GC pairs contain weaker ionic forces',
      'Tm will remain unchanged as base stacking is independent of sequence',
      'Tm will increase significantly due to 3 hydrogen bonds per G-C pair compared to 2 in A-T pairs',
      'Tm will drop to absolute zero due to steric repulsion'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 5, alter G-C ratio and monitor the UV denaturation curve.',
    nodeId: 'c12_chem_cbse_331' as NodeId
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the optical rotation of pure α-D-glucose (+112.2°) and pure β-D-glucose (+18.7°) when dissolved in aqueous solution over time?',
    observableOptions: [
      'Both solutions remain unchanged indefinitely at their starting values.',
      'Both solutions gradually change until reaching an equilibrium rotation value of +52.7°.',
      'α-D-glucose turns optically inactive (0°) while β-D-glucose racemizes into an L-sugar.',
      'Both solutions immediately precipitate into insoluble cellulose crystals.'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_cbse_304' as NodeId
  },
  {
    question: 'During thermal denaturation of egg albumin protein at 80°C, which structural level remains ENTIRELY intact?',
    observableOptions: [
      'Secondary α-helical structure',
      'Tertiary 3D subunit folding',
      'Primary linear sequence of amino acids joined by covalent peptide bonds',
      'Quaternary oligomeric hydrogen-bonded complex'
    ],
    correctIndex: 2,
    nodeId: 'c12_chem_cbse_323' as NodeId
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Diagnostic Assay: Quantitative Glycated Hemoglobin (HbA1c) & Enzyme Kinetics in Blood Glucose Monitoring',
  description: 'In clinical pathology labs, glucometers use Glucose Oxidase enzyme electrodes to oxidize blood D-glucose to D-glucono-1,5-lactone, producing H2O2 measured potentiometrically. Additionally, long-term diabetes management measures non-enzymatic glycation of hemoglobin (HbA1c).',
  steps: [
    'Step 1: Collect patient capillary blood sample containing 140 mg/dL (7.77 mmol/L) fasting blood glucose.',
    'Step 2: Inject into microfluidic sensor where immobilized Glucose Oxidase converts D-glucose + O2 -> D-glucono-delta-lactone + H2O2.',
    'Step 3: Biosensor anode oxidizes H2O2 at +0.6V, generating current I = 4.2 µA proportional to glucose concentration.',
    'Step 4: Calculate HbA1c percentage (6.8%) using standard calibration curve: Estimated Average Glucose (eAG) = 28.7 × HbA1c - 46.7.'
  ]
};

const MISCONCEPTIONS = [
  {
    misconception: 'All carbohydrates are sweet-tasting sugars.',
    correction: 'Polysaccharides like starch, glycogen, and cellulose are insoluble or form colloidal suspensions and are non-sweet (non-sugars), despite being carbohydrates.',
    nodeId: 'c12_chem_cbse_301' as NodeId
  },
  {
    misconception: 'D- and L- designations in carbohydrate chemistry refer to dextrorotatory (+) and levorotatory (-) optical rotation.',
    correction: 'D- and L- configurations refer to absolute stereochemical configuration relative to D-glyceraldehyde (position of -OH on bottom-most chiral carbon), NOT optical rotation (+/-) measured experimentally.',
    nodeId: 'c12_chem_cbse_315' as NodeId
  },
  {
    misconception: 'Sucrose is a reducing sugar because it is composed of glucose and fructose.',
    correction: 'Sucrose is a NON-REDUCING disaccharide because its glycosidic bond joins the C-1 hemiacetal carbon of α-D-glucose directly to the C-2 hemiketal carbon of β-D-fructose, locking both reactive carbonyls.',
    nodeId: 'c12_chem_cbse_309' as NodeId
  },
  {
    misconception: 'Denaturation of proteins breaks covalent peptide bonds, returning proteins to free amino acids.',
    correction: 'Denaturation disrupts weak secondary, tertiary, and quaternary non-covalent forces (H-bonds, hydrophobic interactions, ionic bridges), but NEVER hydrolyzes primary covalent peptide (-CO-NH-) bonds.',
    nodeId: 'c12_chem_cbse_323' as NodeId
  },
  {
    misconception: 'Enzymes alter the overall free energy change (ΔG) or equilibrium constant (Keq) of a biological reaction.',
    correction: 'Enzymes lower the activation energy barrier (Ea) to speed up reaction rate, but DO NOT alter ΔG, ΔH, or equilibrium constants.',
    nodeId: 'c12_chem_cbse_324' as NodeId
  },
  {
    misconception: 'DNA nucleotides and nucleosides are identical chemical terms.',
    correction: 'A nucleoside consists of a nitrogenous base + pentose sugar. A nucleotide consists of a nucleoside + phosphate group esterified to the 5\' (or 3\') carbon.',
    nodeId: 'c12_chem_cbse_329' as NodeId
  }
];

// ==========================================
// 3. 25 COMPREHENSIVE ISC CHALLENGES
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'ch-1',
    nodeId: 'c12_chem_cbse_301',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following general formulas typically represents carbohydrates, historically referred to as "hydrates of carbon"?',
    options: ['Cx(H2O)y', 'CnH2n+2', 'Cx(NH3)y', 'CnH2n-2O2'],
    correctIndex: 0,
    explanation: 'Carbohydrates were originally defined as hydrates of carbon with general molecular formula Cx(H2O)y, though modern definitions require optically active polyhydroxy aldehydes or ketones.',
    hints: [
      'Think of carbon bonded to water molecules.',
      'x carbon atoms and y water molecules.',
      'Formula is Cx(H2O)y.'
    ]
  },
  {
    id: 'ch-2',
    nodeId: 'c12_chem_cbse_302',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'D-Glucose is chemically classified as an:',
    options: ['Aldohexose', 'Ketohexose', 'Aldopentose', 'Ketopentose'],
    correctIndex: 0,
    explanation: 'D-Glucose contains 6 carbon atoms (hexose) and an aldehyde functional group (-CHO) at C-1, making it an aldohexose.',
    hints: [
      'It has 6 carbons and an aldehyde group.',
      'Aldehyde + hexose = aldohexose.',
      'Select Aldohexose.'
    ]
  },
  {
    id: 'ch-3',
    nodeId: 'c12_chem_cbse_305',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'D-Fructose contains a ketone group at carbon-2. It is classified as a:',
    options: ['Ketohexose', 'Aldohexose', 'Ketopentose', 'Aldotetrose'],
    correctIndex: 0,
    explanation: 'D-Fructose has 6 carbon atoms and a ketone functional group (-C=O) at position C-2, making it a ketohexose.',
    hints: [
      'Fructose has 6 carbons.',
      'It contains a functional ketone group.',
      'Keto + hexose = Ketohexose.'
    ]
  },
  {
    id: 'ch-4',
    nodeId: 'c12_chem_cbse_313',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Amino acids that cannot be synthesized by the human body and MUST be obtained through diet are called:',
    options: ['Essential amino acids', 'Non-essential amino acids', 'Acidic amino acids', 'Basic amino acids'],
    correctIndex: 0,
    explanation: 'Essential amino acids (e.g., Valine, Leucine, Lysine) cannot be synthesized de novo by human metabolism and must be supplied in food.',
    hints: [
      'They are essential in our diet.',
      'Contrast with non-essential which body can make.',
      'Essential amino acids.'
    ]
  },
  {
    id: 'ch-5',
    nodeId: 'c12_chem_cbse_316',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The covalent linkage formed between the carboxyl group (-COOH) of one amino acid and the amino group (-NH2) of another is called a:',
    options: ['Peptide bond (-CO-NH-)', 'Glycosidic linkage (-O-)', 'Phosphodiester bond', 'Disulfide bridge'],
    correctIndex: 0,
    explanation: 'Condensation reaction eliminating H2O forms an amide covalent linkage (-CO-NH-), known as a peptide bond.',
    hints: [
      'It connects amino acids in proteins.',
      'It is an amide bond.',
      'Peptide bond (-CO-NH-).'
    ]
  },
  {
    id: 'ch-6',
    nodeId: 'c12_chem_cbse_326',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following vitamins is WATER-SOLUBLE and must be regularly supplied in human diet?',
    options: ['Vitamin C (Ascorbic acid)', 'Vitamin A (Retinol)', 'Vitamin D (Calciferol)', 'Vitamin K (Phylloquinone)'],
    correctIndex: 0,
    explanation: 'Vitamins B and C are water-soluble and readily excreted in urine, unlike fat-soluble vitamins (A, D, E, K) stored in liver and adipose tissues.',
    hints: [
      'Vitamins B & C are water soluble.',
      'Ascorbic acid is Vitamin C.',
      'Vitamin C.'
    ]
  },
  {
    id: 'ch-7',
    nodeId: 'c12_chem_cbse_328',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which nitrogenous base is present in RNA but ABSENT in DNA?',
    options: ['Uracil', 'Thymine', 'Cytosine', 'Adenine'],
    correctIndex: 0,
    explanation: 'RNA contains Uracil (U) instead of Thymine (T). Both contain Adenine (A), Guanine (G), and Cytosine (C).',
    hints: [
      'DNA has Thymine.',
      'RNA replaces Thymine with another pyrimidine.',
      'Uracil.'
    ]
  },
  {
    id: 'ch-8',
    nodeId: 'c12_chem_cbse_310',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Starch is composed of two components: water-soluble Amylose and water-insoluble Amylopectin. What is the glycosidic branching link in Amylopectin?',
    options: ['α-1,6-glycosidic linkage', 'β-1,4-glycosidic linkage', 'α-1,2-glycosidic linkage', 'β-1,6-glycosidic linkage'],
    correctIndex: 0,
    explanation: 'Amylopectin is a branched polysaccharide consisting of linear chains with α-1,4 linkages and branch points occurring at α-1,6-glycosidic linkages.',
    hints: [
      'Linear chain has 1,4 links.',
      'Branching occurs at carbon-6 of glucose.',
      'α-1,6-glycosidic linkage.'
    ]
  },

  // --- STANDARD TIER (9 Challenges) ---
  {
    id: 'ch-9',
    nodeId: 'c12_chem_cbse_303',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When D-glucose is treated with Prolonged heating with Hydroiodic Acid (HI) and Red Phosphorus, what linear hydrocarbon product is formed?',
    options: ['n-Hexane', 'n-Pentane', 'Hexanoic acid', 'Gluconic acid'],
    correctIndex: 0,
    explanation: 'Heating D-glucose with HI/Red P reduces all six carbon atoms completely to form straight-chain n-hexane (CH3-CH2-CH2-CH2-CH2-CH3), proving all 6 carbons are linked in a continuous straight chain.',
    hints: [
      'HI is a strong reducing agent.',
      'It reduces all OH and carbonyl groups to alkanes.',
      '6-carbon straight chain alkane = n-Hexane.'
    ]
  },
  {
    id: 'ch-10',
    nodeId: 'c12_chem_cbse_303',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Reaction of D-glucose with Bromine Water (Br2/H2O) produces Gluconic Acid. This selective oxidation reaction confirms:',
    options: [
      'The presence of an aldehyde (-CHO) group at C-1',
      'The presence of a primary alcohol (-CH2OH) group at C-6',
      'The presence of a ketone group at C-2',
      'The presence of a cyclic ring structure'
    ],
    correctIndex: 0,
    explanation: 'Mild oxidizing agent Bromine water oxidizes only the aldehyde (-CHO) group to monocarboxylic acid (gluconic acid) without oxidizing primary or secondary alcohol groups.',
    hints: [
      'Br2 water is a mild oxidant.',
      'It oxidizes aldehydes but leaves primary alcohols untouched.',
      'Confirms the aldehyde group.'
    ]
  },
  {
    id: 'ch-11',
    nodeId: 'c12_chem_cbse_304',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'α-D-glucopyranose and β-D-glucopyranose differ in spatial configuration at C-1. What is the structural relationship between these two isomers?',
    options: ['Anomers', 'Enantiomers', 'Structural positional isomers', 'Geometrical cis-trans isomers'],
    correctIndex: 0,
    explanation: 'Diastereomers that differ only in configuration at the newly formed chiral anomeric carbon (C-1 in aldoses, C-2 in ketoses) upon ring closure are called ANOMERS.',
    hints: [
      'Differing at the C-1 carbon during hemiacetal ring formation.',
      'Not mirror images (enantiomers).',
      'They are Anomers.'
    ]
  },
  {
    id: 'ch-12',
    nodeId: 'c12_chem_cbse_308',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Maltose is a disaccharide formed by hydrolysis of starch. Which glycosidic linkage joins its two D-glucose units?',
    options: [
      'α-1,4-glycosidic linkage between C1 of one α-D-glucose and C4 of another',
      'β-1,4-glycosidic linkage between C1 of β-D-galactose and C4 of D-glucose',
      'α-1,2-glycosidic linkage between C1 of α-D-glucose and C2 of β-D-fructose',
      'β-1,6-glycosidic linkage between two glucose molecules'
    ],
    correctIndex: 0,
    explanation: 'Maltose consists of two α-D-glucose units joined by an α-1,4-glycosidic linkage. Since C-1 of the second glucose unit has a free hemiacetal -OH, maltose is a REDUCING sugar.',
    hints: [
      'Maltose yields 2 D-glucose molecules.',
      'The linkage is alpha type connecting C1 to C4.',
      'α-1,4-glycosidic linkage.'
    ]
  },
  {
    id: 'ch-13',
    nodeId: 'c12_chem_cbse_309',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Sucrose (optically dextrorotatory, +66.5°) yields an equimolar mixture of D-glucose (+52.7°) and D-fructose (-92.4°) upon acid hydrolysis. Why is this mixture called "Invert Sugar"?',
    options: [
      'Because optical rotation flips from dextrorotatory (+) to levorotatory (-)',
      'Because glucose inverts its absolute stereochemical D configuration into L configuration',
      'Because fructose converts into an aldehyde ring during hydrolysis',
      'Because the osmotic pressure becomes negative'
    ],
    correctIndex: 0,
    explanation: 'Hydrolysis of dextrorotatory sucrose (+66.5°) produces D-glucose (+52.7°) and strongly levorotatory D-fructose (-92.4°), yielding a net levorotatory mixture (-19.85°). This sign reversal is called inversion of cane sugar.',
    hints: [
      'Fructose has strong negative rotation (-92.4°).',
      'Overall net optical sign changes from + to -.',
      'Optical rotation flips from dextro to levo.'
    ]
  },
  {
    id: 'ch-14',
    nodeId: 'c12_chem_cbse_314',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the Isoelectric Point (pI) of Glycine, given its pKa1 (-COOH group) = 2.34 and pKa2 (-NH3+ group) = 9.60.',
    correctAnswer: 5.97,
    tolerance: 0.05,
    unit: 'pH',
    explanation: 'For neutral amino acids, pI is the arithmetic average of pKa1 and pKa2: pI = (2.34 + 9.60) / 2 = 11.94 / 2 = 5.97.',
    hints: [
      'pI is average of pKa values for neutral amino acid.',
      'pI = (pKa1 + pKa2) / 2.',
      'Compute (2.34 + 9.60)/2 = 5.97.'
    ]
  },
  {
    id: 'ch-15',
    nodeId: 'c12_chem_cbse_315',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which naturally occurring amino acid is OPTICALLY INACTIVE (achiral) due to having no asymmetric carbon atom?',
    options: ['Glycine', 'L-Alanine', 'L-Valine', 'L-Leucine'],
    correctIndex: 0,
    explanation: 'Glycine (H2N-CH2-COOH) has two hydrogen atoms attached to the alpha carbon atom. Lacking a chiral carbon, it is optically inactive.',
    hints: [
      'Look for side chain R = -H.',
      'Alpha carbon has two identical hydrogen atoms.',
      'Glycine.'
    ]
  },
  {
    id: 'ch-16',
    nodeId: 'c12_chem_cbse_317',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What primary non-covalent force stabilizes the α-Helix secondary structure of proteins?',
    options: [
      'Intramolecular hydrogen bonding between -C=O of one residue and -NH- of the fourth residue ahead',
      'Intermolecular covalent disulfide bonds (-S-S-)',
      'Ionic salt bridges between Lysine and Aspartate side chains',
      'Hydrophobic interactions among nonpolar aromatic rings'
    ],
    correctIndex: 0,
    explanation: 'The α-Helix is stabilized by intramolecular hydrogen bonds between the carbonyl oxygen (-C=O) of amino acid n and the peptide N-H group of amino acid (n+4).',
    hints: [
      'Secondary structure uses hydrogen bonds.',
      'Alpha helix is internal (intramolecular).',
      'Intramolecular H-bonding between C=O and N-H.'
    ]
  },
  {
    id: 'ch-17',
    nodeId: 'c12_chem_cbse_329',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A Nucleoside differs from a Nucleotide because a Nucleoside lacks:',
    options: ['A phosphate group', 'A nitrogenous heterocyclic base', 'A pentose sugar moiety', 'Hydroxyl groups on sugar'],
    correctIndex: 0,
    explanation: 'Nucleoside = Base + Sugar. Nucleotide = Base + Sugar + Phosphate group (esterified at 5\' or 3\' OH of pentose sugar).',
    hints: [
      'Nucleotide has three components.',
      'Nucleoside has only base + sugar.',
      'Missing the phosphate group.'
    ]
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'ch-18',
    nodeId: 'c12_chem_cbse_303',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When D-glucose is oxidized with concentrated Nitric Acid (HNO3), it yields Saccharic Acid (dicarboxylic acid). What structural feature does this reaction prove?',
    options: [
      'Glucose contains both a terminal aldehyde (-CHO) AND a terminal primary alcohol (-CH2OH)',
      'Glucose has a ketone group at C-2',
      'Glucose contains 4 secondary alcohol groups in cis configuration',
      'Glucose is a cyclic furanose ring'
    ],
    correctIndex: 0,
    explanation: 'Concentrated HNO3 is a powerful oxidant that oxidizes BOTH the C-1 aldehyde (-CHO) group and C-6 primary alcohol group (-CH2OH) into carboxylic acid groups (-COOH), yielding D-saccharic acid (HOOC-(CHOH)4-COOH).',
    hints: [
      'HNO3 oxidizes two terminal carbon groups.',
      'C-1 aldehyde and C-6 primary alcohol become -COOH.',
      'Proves presence of aldehyde and primary alcohol.'
    ]
  },
  {
    id: 'ch-19',
    nodeId: 'c12_chem_cbse_311',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Human digestive enzymes can hydrolyze Starch into D-glucose but CANNOT hydrolyze Cellulose. What is the fundamental stereochemical reason?',
    options: [
      'Starch contains α-1,4-glycosidic bonds recognized by α-amylase, whereas Cellulose consists of β-1,4-glycosidic bonds requiring β-glucosidase (cellulase)',
      'Cellulose contains fructose monomers which cannot enter glycolysis',
      'Cellulose forms ionic peptide bonds that resist enzymatic cleavage',
      'Starch is a branched protein whereas cellulose is a fat'
    ],
    correctIndex: 0,
    explanation: 'Starch consists of α-D-glucose units with α-1,4 linkages, stereochemically fitted for salivary/pancreatic α-amylase. Cellulose consists of linear β-D-glucose chains with β-1,4-glycosidic bonds, which human enzymes cannot cleavage.',
    hints: [
      'Focus on anomeric C-1 configuration (α vs β).',
      'Starch has α-1,4 bonds; Cellulose has β-1,4 bonds.',
      'Human amylase only breaks α-1,4 linkages.'
    ]
  },
  {
    id: 'ch-20',
    nodeId: 'c12_chem_cbse_318',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which pair of amino acid residue side chains can form a covalent disulfide cross-linkage (-S-S-) to stabilize Tertiary protein structure?',
    options: [
      'Two Cysteine residues containing -SH thiol groups',
      'Methionine and Lysine',
      'Two Serine residues with -OH groups',
      'Alanine and Valine'
    ],
    correctIndex: 0,
    explanation: 'Oxidation of two Cysteine residues brings their sulfhydryl (-SH) thiol side chains together to form a covalent disulfide bond (-R-S-S-R\'), providing strong tertiary structural stability.',
    hints: [
      'Sulfur-containing amino acid with reactive -SH group.',
      'Cysteine has a thiol (-SH) group.',
      'Two Cysteine residues.'
    ]
  },
  {
    id: 'ch-21',
    nodeId: 'c12_chem_cbse_324',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In an enzyme-catalyzed reaction following Michaelis-Menten kinetics, Vmax = 120 µmol/min and Km = 4.0 mM. Calculate the reaction velocity V (in µmol/min) when substrate concentration [S] = 12.0 mM.',
    correctAnswer: 90.0,
    tolerance: 0.5,
    unit: 'µmol/min',
    explanation: 'Michaelis-Menten equation: V = (Vmax * [S]) / (Km + [S]) = (120 * 12.0) / (4.0 + 12.0) = 1440 / 16.0 = 90.0 µmol/min.',
    hints: [
      'Michaelis-Menten: V = (Vmax * [S]) / (Km + [S]).',
      'V = (120 * 12) / (4 + 12).',
      'V = 1440 / 16 = 90 µmol/min.'
    ]
  },
  {
    id: 'ch-22',
    nodeId: 'c12_chem_cbse_331',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'According to Chargaff\'s Rules for double-stranded DNA, if a genomic DNA sample contains 32% Adenine, what is the percentage of Cytosine?',
    options: ['18%', '32%', '36%', '64%'],
    correctIndex: 0,
    explanation: 'In double-stranded DNA: %A = %T = 32%, so A+T = 64%. Remaining G+C = 100% - 64% = 36%. Since %G = %C, Cytosine = 36% / 2 = 18%.',
    hints: [
      'A = T and G = C; total = 100%.',
      'A + T = 32% + 32% = 64%.',
      'G + C = 100 - 64 = 36%; C = 36 / 2 = 18%.'
    ]
  },
  {
    id: 'ch-23',
    nodeId: 'c12_chem_cbse_332',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does the sugar moiety in RNA differ chemically from the sugar moiety in DNA?',
    options: [
      'RNA contains D-ribose with an -OH group at C-2\', while DNA contains 2-deoxy-D-ribose lacking an -OH at C-2\'',
      'RNA contains D-glucose while DNA contains D-fructose',
      'RNA sugar has 6 carbons while DNA sugar has 5 carbons',
      'RNA contains L-ribose while DNA contains D-ribose'
    ],
    correctIndex: 0,
    explanation: 'Ribose in RNA has hydroxyl (-OH) groups at both C-2\' and C-3\'. Deoxyribose in DNA lacks oxygen at C-2\' (replaced by -H), making DNA chemically more stable against alkaline hydrolysis.',
    hints: [
      'Deoxy means lacking oxygen.',
      'Check position 2\' of the pentose sugar.',
      'RNA has 2\'-OH; DNA has 2\'-H.'
    ]
  },
  {
    id: 'ch-24',
    nodeId: 'c12_chem_cbse_333',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During transcription and translation in the Central Dogma, what is the complementary mRNA codon sequence produced from DNA template strand sequence 3\'-TAC GGC TTA ACT-5\'?',
    options: [
      '5\'-AUG CCG AAU UGA-3\'',
      '5\'-ATG CCG AAT TGA-3\'',
      '5\'-UAC GGC UUA ACU-3\'',
      '5\'-ATC GCC AAT TCA-3\''
    ],
    correctIndex: 0,
    explanation: 'Transcription produces anti-parallel RNA (5\' to 3\') complementary to DNA template: 3\'-T->5\'-A, A->U, C->G, G->C, G->C, C->G, T->A, T->A, A->U, A->U, C->G, T->A. Yields 5\'-AUG CCG AAU UGA-3\'.',
    hints: [
      'DNA 3\'->5\' transcribes to RNA 5\'->3\'.',
      'A pairs with U in RNA, T pairs with A, G with C.',
      '5\'-AUG CCG AAU UGA-3\'.'
    ]
  },
  {
    id: 'ch-25',
    nodeId: 'c12_chem_cbse_335',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In DNA fingerprinting by Southern Blotting, short repetitive hypervariable tandem nucleotide sequences used as specific molecular probes are called:',
    options: [
      'VNTRs (Variable Number of Tandem Repeats)',
      'Okazaki fragments',
      'Palindromic promoters',
      'Single-stranded ribosomal operons'
    ],
    correctIndex: 0,
    explanation: 'Variable Number of Tandem Repeats (VNTRs) are polymorphic tandem repeat sequences in human genome used as radiolabeled DNA probes for high-resolution DNA fingerprint identification.',
    hints: [
      'Repeated sequence blocks that vary among individuals.',
      'Abbreviated as VNTR.',
      'Variable Number of Tandem Repeats.'
    ]
  }
];

// ==========================================
// 4. TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS
// ==========================================

const GlucoseConformationSVG: React.FC<{ anomer: 'alpha' | 'beta' | 'open' }> = ({ anomer }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-cyan-500/30 shadow-lg">
      <h4 className="text-cyan-400 font-bold mb-2 text-sm tracking-wide uppercase">
        {anomer === 'open' ? 'D-Glucose Fischer Open-Chain' : anomer === 'alpha' ? 'α-D-Glucopyranose Haworth Ring (Anomeric OH DOWN)' : 'β-D-Glucopyranose Haworth Ring (Anomeric OH UP)'}
      </h4>
      <svg width="340" height="220" viewBox="0 0 340 220" className="drop-shadow">
        <defs>
          <radialGradient id="atomGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {anomer === 'open' ? (
          <g transform="translate(40, 10)">
            {/* Fischer projection backbone */}
            <line x1="130" y1="20" x2="130" y2="190" stroke="#94a3b8" strokeWidth="3" />
            {/* C1 aldehyde */}
            <circle cx="130" cy="25" r="8" fill="#f43f5e" />
            <text x="130" y="29" fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">C1</text>
            <text x="145" y="25" fill="#f43f5e" fontSize="11" fontWeight="bold">CHO</text>

            {/* C2 */}
            <line x1="100" y1="55" x2="160" y2="55" stroke="#64748b" strokeWidth="2" />
            <text x="90" y="58" fill="#38bdf8" fontSize="10" fontWeight="bold">H</text>
            <text x="170" y="58" fill="#f43f5e" fontSize="10" fontWeight="bold">OH</text>
            <circle cx="130" cy="55" r="5" fill="#38bdf8" />

            {/* C3 */}
            <line x1="100" y1="88" x2="160" y2="88" stroke="#64748b" strokeWidth="2" />
            <text x="83" y="91" fill="#f43f5e" fontSize="10" fontWeight="bold">OH</text>
            <text x="170" y="91" fill="#38bdf8" fontSize="10" fontWeight="bold">H</text>
            <circle cx="130" cy="88" r="5" fill="#38bdf8" />

            {/* C4 */}
            <line x1="100" y1="120" x2="160" y2="120" stroke="#64748b" strokeWidth="2" />
            <text x="90" y="123" fill="#38bdf8" fontSize="10" fontWeight="bold">H</text>
            <text x="170" y="123" fill="#f43f5e" fontSize="10" fontWeight="bold">OH</text>
            <circle cx="130" cy="120" r="5" fill="#38bdf8" />

            {/* C5 */}
            <line x1="100" y1="152" x2="160" y2="152" stroke="#64748b" strokeWidth="2" />
            <text x="90" y="155" fill="#38bdf8" fontSize="10" fontWeight="bold">H</text>
            <text x="170" y="155" fill="#f43f5e" fontSize="10" fontWeight="bold">OH</text>
            <circle cx="130" cy="152" r="5" fill="#eab308" />

            {/* C6 */}
            <text x="130" y="188" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">CH2OH</text>
          </g>
        ) : (
          <g transform="translate(30, 20)">
            {/* Haworth Pyranose Hexagon Ring */}
            <polygon points="120,40 200,40 240,90 200,140 120,140 80,90" fill="none" stroke="#38bdf8" strokeWidth="3.5" strokeLinejoin="round" />
            {/* Ring Oxygen at top right position */}
            <circle cx="200" cy="40" r="14" fill="#0f172a" stroke="#f43f5e" strokeWidth="3" />
            <text x="200" y="44" fill="#f43f5e" fontSize="12" textAnchor="middle" fontWeight="bold">O</text>

            {/* C1 Anomeric Carbon */}
            <circle cx="240" cy="90" r="6" fill="#eab308" />
            <text x="252" y="94" fill="#eab308" fontSize="11" fontWeight="bold">C1</text>
            {/* Anomeric -OH position */}
            {anomer === 'alpha' ? (
              <>
                {/* Alpha: OH DOWN, H UP */}
                <line x1="240" y1="90" x2="240" y2="125" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="240" y="138" fill="#f43f5e" fontSize="11" textAnchor="middle" fontWeight="bold">OH (α-Down)</text>
                <line x1="240" y1="90" x2="240" y2="60" stroke="#94a3b8" strokeWidth="2" />
                <text x="240" y="55" fill="#94a3b8" fontSize="10" textAnchor="middle">H</text>
              </>
            ) : (
              <>
                {/* Beta: OH UP, H DOWN */}
                <line x1="240" y1="90" x2="240" y2="55" stroke="#22c55e" strokeWidth="2.5" />
                <text x="240" y="48" fill="#22c55e" fontSize="11" textAnchor="middle" fontWeight="bold">OH (β-Up)</text>
                <line x1="240" y1="90" x2="240" y2="125" stroke="#94a3b8" strokeWidth="2" />
                <text x="240" y="136" fill="#94a3b8" fontSize="10" textAnchor="middle">H</text>
              </>
            )}

            {/* C2 */}
            <circle cx="200" cy="140" r="4" fill="#38bdf8" />
            <line x1="200" y1="140" x2="200" y2="170" stroke="#f43f5e" strokeWidth="2" />
            <text x="200" y="182" fill="#f43f5e" fontSize="10" textAnchor="middle">OH</text>

            {/* C3 */}
            <circle cx="120" cy="140" r="4" fill="#38bdf8" />
            <line x1="120" y1="140" x2="120" y2="110" stroke="#f43f5e" strokeWidth="2" />
            <text x="120" y="103" fill="#f43f5e" fontSize="10" textAnchor="middle">OH</text>

            {/* C4 */}
            <circle cx="80" cy="90" r="4" fill="#38bdf8" />
            <line x1="80" y1="90" x2="80" y2="125" stroke="#f43f5e" strokeWidth="2" />
            <text x="80" y="137" fill="#f43f5e" fontSize="10" textAnchor="middle">OH</text>

            {/* C5 & CH2OH C6 */}
            <circle cx="120" cy="40" r="4" fill="#38bdf8" />
            <line x1="120" y1="40" x2="120" y2="10" stroke="#a855f7" strokeWidth="2.5" />
            <text x="120" y="5" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">CH2OH (C6)</text>
          </g>
        )}
      </svg>
      <div className="mt-2 text-xs text-slate-300 text-center max-w-xs">
        {anomer === 'open' && 'Fischer projection shows open aldehyde form at equilibrium (0.02%).'}
        {anomer === 'alpha' && 'α-anomer has C-1 hemiacetal -OH trans to C-6 CH2OH group (36% at equilibrium).'}
        {anomer === 'beta' && 'β-anomer has C-1 hemiacetal -OH cis to C-6 CH2OH group (64% at equilibrium).'}
      </div>
    </div>
  );
};

const AminoAcidZwitterionSVG: React.FC<{ ph: number }> = ({ ph }) => {
  // Determine state based on pH: Low pH (< 2.34): Cationic; Mid pH (6.0): Zwitterion; High pH (> 9.60): Anionic
  const state = ph < 3.5 ? 'cationic' : ph > 8.5 ? 'anionic' : 'zwitterion';

  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-purple-500/30 shadow-lg">
      <h4 className="text-purple-400 font-bold mb-1 text-sm tracking-wide uppercase">
        Amino Acid Ionic Species at pH = {ph.toFixed(1)}
      </h4>
      <div className="text-xs text-amber-300 font-semibold mb-2">
        {state === 'cationic' && 'Acidic Solution (pH < pKa1): Net Charge = +1 (Cationic)'}
        {state === 'zwitterion' && 'Isoelectric Point pI = 6.0: Net Charge = 0 (Zwitterion Dipolar Ion)'}
        {state === 'anionic' && 'Basic Solution (pH > pKa2): Net Charge = -1 (Anionic)'}
      </div>

      <svg width="340" height="180" viewBox="0 0 340 180">
        {/* Central Alpha Carbon */}
        <circle cx="170" cy="90" r="22" fill="#1e293b" stroke="#a855f7" strokeWidth="3" />
        <text x="170" y="94" fill="#a855f7" fontSize="13" textAnchor="middle" fontWeight="bold">Cα</text>

        {/* Top: H */}
        <line x1="170" y1="68" x2="170" y2="35" stroke="#94a3b8" strokeWidth="2.5" />
        <circle cx="170" cy="25" r="12" fill="#334155" />
        <text x="170" y="29" fill="#e2e8f0" fontSize="11" textAnchor="middle" fontWeight="bold">H</text>

        {/* Bottom: R Side Chain (e.g., -CH3 Alanine) */}
        <line x1="170" y1="112" x2="170" y2="145" stroke="#94a3b8" strokeWidth="2.5" />
        <rect x="145" y="145" width="50" height="24" rx="6" fill="#0284c7" />
        <text x="170" y="161" fill="#fff" fontSize="11" textAnchor="middle" fontWeight="bold">CH3 (R)</text>

        {/* Left: Amino Group (-NH3+ or -NH2) */}
        <line x1="148" y1="90" x2="105" y2="90" stroke="#94a3b8" strokeWidth="2.5" />
        <rect x="35" y="73" width="70" height="34" rx="8" fill={state === 'anionic' ? '#475569' : '#3b82f6'} stroke="#60a5fa" strokeWidth="2" />
        <text x="70" y="94" fill="#fff" fontSize="13" textAnchor="middle" fontWeight="bold">
          {state === 'anionic' ? 'NH2' : 'NH3⁺'}
        </text>

        {/* Right: Carboxyl Group (-COOH or -COO-) */}
        <line x1="192" y1="90" x2="235" y2="90" stroke="#94a3b8" strokeWidth="2.5" />
        <rect x="235" y="73" width="70" height="34" rx="8" fill={state === 'cationic' ? '#475569' : '#f43f5e'} stroke="#fb7185" strokeWidth="2" />
        <text x="270" y="94" fill="#fff" fontSize="13" textAnchor="middle" fontWeight="bold">
          {state === 'cationic' ? 'COOH' : 'COO⁻'}
        </text>
      </svg>
    </div>
  );
};

const NucleicAcidDNAHelixSVG: React.FC<{ gcPercent: number }> = ({ gcPercent }) => {
  const atPercent = 100 - gcPercent;
  const numPairs = 8;
  const gcCount = Math.round((gcPercent / 100) * numPairs);

  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 shadow-lg">
      <h4 className="text-emerald-400 font-bold mb-1 text-sm tracking-wide uppercase">
        DNA Double Helix Base Pairing (5' → 3' Anti-Parallel)
      </h4>
      <div className="text-xs text-emerald-300 mb-2 font-mono">
        G≡C Pairs (3 H-Bonds): {gcPercent}% | A=T Pairs (2 H-Bonds): {atPercent}%
      </div>

      <svg width="340" height="200" viewBox="0 0 340 200">
        {/* Backbone 5' to 3' Strand 1 */}
        <path d="M 50,20 Q 80,100 50,180" stroke="#0284c7" strokeWidth="4" fill="none" />
        <text x="40" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold">5'</text>
        <text x="40" y="195" fill="#38bdf8" fontSize="10" fontWeight="bold">3'</text>

        {/* Backbone 3' to 5' Strand 2 */}
        <path d="M 290,20 Q 260,100 290,180" stroke="#a855f7" strokeWidth="4" fill="none" />
        <text x="295" y="15" fill="#c084fc" fontSize="10" fontWeight="bold">3'</text>
        <text x="295" y="195" fill="#c084fc" fontSize="10" fontWeight="bold">5'</text>

        {/* Base Rungs */}
        {Array.from({ length: numPairs }).map((_, idx) => {
          const y = 30 + idx * 20;
          const isGC = idx < gcCount;
          return (
            <g key={idx}>
              {/* Strand 1 Base */}
              <rect x="70" y={y - 7} width="70" height="14" rx="4" fill={isGC ? '#059669' : '#d97706'} />
              <text x="105" y={y + 4} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">
                {isGC ? 'Guanine' : 'Adenine'}
              </text>

              {/* Strand 2 Base */}
              <rect x="200" y={y - 7} width="70" height="14" rx="4" fill={isGC ? '#047857' : '#b45309'} />
              <text x="235" y={y + 4} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="bold">
                {isGC ? 'Cytosine' : 'Thymine'}
              </text>

              {/* Hydrogen Bonds */}
              {isGC ? (
                <>
                  <line x1="142" y1={y - 4} x2="198" y2={y - 4} stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
                  <line x1="142" y1={y} x2="198" y2={y} stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
                  <line x1="142" y1={y + 4} x2="198" y2={y + 4} stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
                </>
              ) : (
                <>
                  <line x1="142" y1={y - 2.5} x2="198" y2={y - 2.5} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
                  <line x1="142" y1={y + 2.5} x2="198" y2={y + 2.5} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,2" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ==========================================
// 5. MAIN COMPONENT IMPLEMENTATION
// ==========================================

export interface C12_ChemistryBiomoleculesCBSESimProps {
  onComplete?: (score: number) => void;
}

export const C12_ChemistryBiomoleculesCBSESim: React.FC<C12_ChemistryBiomoleculesCBSESimProps> = ({ onComplete }) => {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab Step & State
  const [currentLabStepIndex, setCurrentLabStepIndex] = useState<number>(0);
  
  // Lab 1 State: Anomers & Mutarotation
  const [anomerType, setAnomerType] = useState<'alpha' | 'beta' | 'open'>('alpha');
  const [mutarotationTime, setMutarotationTime] = useState<number>(0);

  // Lab 2 State: Amino Acid Titration
  const [titrationpH, setTitrationpH] = useState<number>(6.0);

  // Lab 3 State: Peptide & Denaturation
  const [denaturationTemp, setDenaturationTemp] = useState<number>(25);

  // Lab 4 State: Enzyme Kinetics
  const [substrateConc, setSubstrateConc] = useState<number>(4.0);
  const [enzymeTemp, setEnzymeTemp] = useState<number>(37);

  // Lab 5 State: DNA Base Pairing
  const [gcRatio, setGcRatio] = useState<number>(50);

  // Questions inside Labs / Discovery
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);

  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Feedback Animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Spaced Repetition SRS & Mastery BKT states
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeId, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial as Record<NodeId, ReturnType<typeof createReviewItem>>;
  });

  // Auto Hint Inactivity Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset auto hint timer on interaction
    if (!challengeAnswered && activeTab === 'challenges') {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (!showHint && hintLevel < 3) {
          setShowHint(true);
          audioManager.play('hint');
        }
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, challengeAnswered, activeTab, showHint, hintLevel]);

  // Speak introductory scenario on mount
  useEffect(() => {
    speechManager.speak('Welcome to the Advanced ISC Biomolecules Virtual Chemistry Laboratory.');
  }, []);

  // Handlers
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      setShowSparkle(true);
      speechManager.speak('Correct! Sucrose glycosidic bond locks both hemiacetal and hemiketal carbons.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the hemiacetal hydroxyl linkage in sucrose.');
    }
  };

  const handlePredictionSubmit = (index: number) => {
    const selected = predictionAnswers[index];
    if (selected === null) return;

    const newSub = [...predictionSubmitted];
    newSub[index] = true;
    setPredictionSubmitted(newSub);

    if (selected === PREDICTION_QUESTIONS[index].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction based on functional group chemistry!');
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (index: number) => {
    const selected = observationAnswers[index];
    if (selected === null) return;

    const newSub = [...observationSubmitted];
    newSub[index] = true;
    setObservationSubmitted(newSub);

    if (selected === OBSERVATION_QUESTIONS[index].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on observation!');
    } else {
      audioManager.play('error');
    }
  };

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const handleChallengeAnswer = () => {
    if (challengeAnswered) return;

    let correct = false;
    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === currentChallenge.correctIndex) {
        correct = true;
      }
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.1;
        if (Math.abs(val - currentChallenge.correctAnswer) <= tol) {
          correct = true;
        }
      }
    }

    setIsCorrect(correct);
    setChallengeAnswered(true);

    // BKT & SRS Update
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktStates[nodeId];
    const updatedBKT = bktUpdate(currentBKT, correct);

    const currentSRS = srsItems[nodeId];
    const quality = correct ? (hintLevel === 0 ? 5 : 4) : 1;
    const updatedSRS = sm2Update(currentSRS, quality);

    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccess(true);
      setScore((prev) => prev + 10);
      speechManager.speak('Correct answer! Fantastic biochemistry knowledge.');
      setTimeout(() => {
        setShowConfetti(false);
        setShowSuccess(false);
      }, 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Take a look at the detailed explanation below.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setNumericInput('');
      setChallengeAnswered(false);
      setIsCorrect(false);
      setShowHint(false);
      setHintLevel(0);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges!
      recordGameScore('c12_chem_cbse_biomolecules', score);
      if (onComplete) onComplete(score);
      setActiveTab('summary');
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed the entire ISC Biomolecules module.');
    }
  };

  // Calculations for dynamic lab outputs
  // Lab 1: Mutarotation rotation calculation
  const calculatedRotation = anomerType === 'alpha'
    ? (112.2 - (112.2 - 52.7) * (mutarotationTime / 100)).toFixed(1)
    : (18.7 + (52.7 - 18.7) * (mutarotationTime / 100)).toFixed(1);

  // Lab 4: Enzyme kinetics V = (Vmax * S) / (Km + S) adjusted for temp denaturation
  const tempFactor = enzymeTemp <= 40
    ? Math.pow(2, (enzymeTemp - 25) / 10)
    : Math.max(0, 1 - (enzymeTemp - 40) * 0.08);
  const VmaxEff = 100 * tempFactor;
  const KmEff = 4.0;
  const currentV = ((VmaxEff * substrateConc) / (KmEff + substrateConc)).toFixed(1);

  // Lab 5: DNA Melting Temp Tm = 64.9 + 41 * (yG+zC)/(wA+xT+yG+zC) - simple formula Tm = 69.3 + 0.41*(GC%)
  const estimatedTm = (69.3 + 0.41 * gcRatio).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shadow-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-semibold rounded-full uppercase tracking-wider">
              ISC Chemistry • Class 12
            </span>
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs font-semibold rounded-full uppercase tracking-wider">
              Biomolecules
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {SCENARIO.title}
          </h1>
        </div>

        <div className="flex items-center gap-6 bg-slate-800/60 px-5 py-3 rounded-xl border border-slate-700">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Lab Score</div>
            <div className="text-2xl font-black text-cyan-400">{score} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Challenges</div>
            <div className="text-lg font-bold text-amber-400">
              {currentChallengeIndex + 1} / {CHALLENGES.length}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto flex flex-wrap gap-3 mb-8">
        {[
          { id: 'discovery', label: '1. Discovery Scenario' },
          { id: 'lab', label: '2. Interactive Exploration Labs' },
          { id: 'challenges', label: '3. ISC Mastery Challenges (25)' },
          { id: 'summary', label: '4. Summary & Real-World Lab' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 border ${
              activeTab === tab.id
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto">
        {/* ==========================================
            TAB 1: DISCOVERY SCENARIO
            ========================================== */}
        {activeTab === 'discovery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Laboratory Narrative Context
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-300 leading-relaxed mb-6">{SCENARIO.context}</p>

              {/* Discovery Interactive Question */}
              <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-6 mt-6">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">
                  Preconception Discovery Question
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {DISCOVERY_QUESTION.question}
                </h3>

                <div className="space-y-3 mb-6">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!discoverySubmitted) setDiscoverySelected(idx);
                      }}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        discoverySelected === idx
                          ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      } ${discoverySubmitted && idx === DISCOVERY_QUESTION.correctIndex ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : ''}`}
                    >
                      <span className="inline-block w-6 font-bold text-cyan-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                {!discoverySubmitted ? (
                  <button
                    onClick={handleDiscoverySubmit}
                    disabled={discoverySelected === null}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition"
                  >
                    Submit Discovery Hypothesis
                  </button>
                ) : (
                  <div className="bg-emerald-950/50 border border-emerald-500/40 p-4 rounded-xl text-emerald-200 text-sm leading-relaxed">
                    <div className="font-bold text-emerald-400 mb-1">Analytical Insight:</div>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar with Predictions */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-md font-bold text-amber-400 mb-4 uppercase tracking-wider">
                  Lab Predictions
                </h3>
                {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                  <div key={pIdx} className="mb-6 border-b border-slate-800 pb-4 last:border-0">
                    <p className="text-xs font-semibold text-slate-200 mb-3">{pq.question}</p>
                    <div className="space-y-2 mb-3">
                      {pq.options.map((o, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (!predictionSubmitted[pIdx]) {
                              const newAns = [...predictionAnswers];
                              newAns[pIdx] = oIdx;
                              setPredictionAnswers(newAns);
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs ${
                            predictionAnswers[pIdx] === oIdx
                              ? 'bg-amber-950/60 border-amber-400 text-amber-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                    {!predictionSubmitted[pIdx] ? (
                      <button
                        onClick={() => handlePredictionSubmit(pIdx)}
                        disabled={predictionAnswers[pIdx] === null}
                        className="px-4 py-2 bg-amber-600 text-xs text-white font-bold rounded-lg disabled:opacity-50"
                      >
                        Verify Prediction
                      </button>
                    ) : (
                      <div className="text-xs text-slate-400 italic">
                        {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: INTERACTIVE EXPLORATION LABS
            ========================================== */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Exploration Selector Drawer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-md font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Select Interactive Station
              </h3>
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentLabStepIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    currentLabStepIndex === idx
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 font-bold shadow-lg'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs text-cyan-400 mb-1 font-mono">Station {idx + 1}</div>
                  <div className="text-sm">{step.title}</div>
                </button>
              ))}

              {/* Rendered Observations Section */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4">
                  Station Observations
                </h4>
                {OBSERVATION_QUESTIONS.map((oq, oidx) => (
                  <div key={oidx} className="mb-6 border-b border-slate-800/80 pb-4 last:border-0">
                    <p className="text-xs text-slate-300 font-medium mb-2">{oq.question}</p>
                    <div className="space-y-2 mb-3">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            if (!observationSubmitted[oidx]) {
                              const newArr = [...observationAnswers];
                              newArr[oidx] = optIdx;
                              setObservationAnswers(newArr);
                            }
                          }}
                          className={`w-full text-left p-2.5 rounded-lg border text-xs ${
                            observationAnswers[oidx] === optIdx
                              ? 'bg-purple-950/60 border-purple-400 text-purple-200'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {!observationSubmitted[oidx] ? (
                      <button
                        onClick={() => handleObservationSubmit(oidx)}
                        disabled={observationAnswers[oidx] === null}
                        className="px-3 py-1.5 bg-purple-600 text-xs text-white font-bold rounded-lg disabled:opacity-50"
                      >
                        Confirm Observation
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-400 font-bold">✓ Observation Logged</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Interactive Workstation */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-cyan-400">
                    {EXPLORATION_STEPS[currentLabStepIndex].title}
                  </h2>
                  <span className="text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                    Node: {EXPLORATION_STEPS[currentLabStepIndex].nodeId}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {EXPLORATION_STEPS[currentLabStepIndex].instruction}
                </p>

                {/* STATION 1 LAB: Glucose Anomers & Mutarotation */}
                {currentLabStepIndex === 0 && (
                  <div className="space-y-6">
                    <GlucoseConformationSVG anomer={anomerType} />

                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setAnomerType('alpha')}
                          className={`px-4 py-2 rounded-lg text-xs font-bold ${anomerType === 'alpha' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                        >
                          Pure α-D-Glucose (+112.2°)
                        </button>
                        <button
                          onClick={() => setAnomerType('beta')}
                          className={`px-4 py-2 rounded-lg text-xs font-bold ${anomerType === 'beta' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                        >
                          Pure β-D-Glucose (+18.7°)
                        </button>
                        <button
                          onClick={() => setAnomerType('open')}
                          className={`px-4 py-2 rounded-lg text-xs font-bold ${anomerType === 'open' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                        >
                          Fischer Open-Chain Intermediate
                        </button>
                      </div>

                      {anomerType !== 'open' && (
                        <div>
                          <label className="text-xs font-bold text-slate-400 flex justify-between mb-1">
                            <span>Dissolution Time in Water (Equilibrium Progress)</span>
                            <span className="text-cyan-400 font-mono">{mutarotationTime}%</span>
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={mutarotationTime}
                            onChange={(e) => setMutarotationTime(Number(e.target.value))}
                            className="w-full accent-cyan-500"
                          />
                        </div>
                      )}

                      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase font-bold">Polarimeter Specific Rotation [α]D:</span>
                        <span className="text-xl font-mono font-bold text-amber-400">{calculatedRotation}°</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STATION 2 LAB: Amino Acid Titration */}
                {currentLabStepIndex === 1 && (
                  <div className="space-y-6">
                    <AminoAcidZwitterionSVG ph={titrationpH} />

                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">Solution pH Titration</span>
                          <span className="text-xl font-mono font-bold text-purple-400">pH {titrationpH.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="1.0"
                          max="13.0"
                          step="0.1"
                          value={titrationpH}
                          onChange={(e) => setTitrationpH(parseFloat(e.target.value))}
                          className="w-full accent-purple-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div className={`p-3 rounded-lg border ${titrationpH < 3.5 ? 'bg-blue-950/80 border-blue-400 text-blue-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                          <div className="font-bold">pH &lt; pKa1 (2.34)</div>
                          <div>+1 Cation</div>
                        </div>
                        <div className={`p-3 rounded-lg border ${titrationpH >= 3.5 && titrationpH <= 8.5 ? 'bg-purple-950/80 border-purple-400 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                          <div className="font-bold">Isoelectric pI (6.0)</div>
                          <div>0 Zwitterion</div>
                        </div>
                        <div className={`p-3 rounded-lg border ${titrationpH > 8.5 ? 'bg-rose-950/80 border-rose-400 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                          <div className="font-bold">pH &gt; pKa2 (9.60)</div>
                          <div>-1 Anion</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STATION 3 LAB: Peptide Synthesis & Denaturation */}
                {currentLabStepIndex === 2 && (
                  <div className="space-y-6">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">
                        Tripeptide Model (Gly-Ala-Val) Thermal Folding Simulation
                      </h4>

                      <div className="flex justify-center items-center gap-2 py-8 bg-slate-900 rounded-xl border border-slate-800">
                        {/* Primary Structure Linkage */}
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                            Gly
                          </div>
                          <div className="h-1.5 w-8 bg-rose-500 flex items-center justify-center">
                            <span className="text-[9px] text-white font-mono bg-rose-700 px-1 rounded">-CO-NH-</span>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                            Ala
                          </div>
                          <div className="h-1.5 w-8 bg-rose-500 flex items-center justify-center">
                            <span className="text-[9px] text-white font-mono bg-rose-700 px-1 rounded">-CO-NH-</span>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
                            Val
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex justify-between text-xs font-bold text-slate-400">
                          <span>Temperature Controller</span>
                          <span className="text-rose-400 font-mono">{denaturationTemp}°C</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="95"
                          value={denaturationTemp}
                          onChange={(e) => setDenaturationTemp(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                        <div className="p-4 rounded-xl border text-xs leading-relaxed bg-slate-900 border-slate-800">
                          {denaturationTemp < 55 ? (
                            <span className="text-emerald-400 font-semibold">
                              Native Conformation Intact: Secondary α-helix / β-sheet H-bonds intact (2° & 3° structures active).
                            </span>
                          ) : (
                            <span className="text-rose-400 font-semibold">
                              Thermal Denaturation Active: Hydrogen bonds disrupted! Protein unfolds into random coil. Primary peptide (-CO-NH-) backbone remains completely intact.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STATION 4 LAB: Enzyme Kinetics */}
                {currentLabStepIndex === 3 && (
                  <div className="space-y-6">
                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-400 block mb-2">
                            Substrate Concentration [S]: <span className="text-cyan-400 font-mono">{substrateConc} mM</span>
                          </label>
                          <input
                            type="range"
                            min="0.5"
                            max="20.0"
                            step="0.5"
                            value={substrateConc}
                            onChange={(e) => setSubstrateConc(parseFloat(e.target.value))}
                            className="w-full accent-cyan-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-400 block mb-2">
                            Temperature: <span className="text-rose-400 font-mono">{enzymeTemp}°C</span>
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="70"
                            value={enzymeTemp}
                            onChange={(e) => setEnzymeTemp(Number(e.target.value))}
                            className="w-full accent-rose-500"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <div className="text-xs text-slate-400 uppercase font-bold">Calculated Reaction Rate (V)</div>
                          <div className="text-xs text-slate-500">Michaelis-Menten: V = Vmax[S] / (Km + [S])</div>
                        </div>
                        <div className="text-2xl font-black font-mono text-cyan-400">{currentV} µmol/min</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STATION 5 LAB: DNA Base Pairing */}
                {currentLabStepIndex === 4 && (
                  <div className="space-y-6">
                    <NucleicAcidDNAHelixSVG gcPercent={gcRatio} />

                    <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">Guanine-Cytosine (G-C) Content Ratio</span>
                        <span className="text-lg font-mono font-bold text-emerald-400">{gcRatio}% GC</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={gcRatio}
                        onChange={(e) => setGcRatio(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />

                      <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase font-bold">DNA Thermal Melting Temperature (Tm):</span>
                        <span className="text-xl font-mono font-bold text-amber-400">{estimatedTm}°C</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: ISC MASTERY CHALLENGES
            ========================================== */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
            {/* Challenge Progress Header */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 mb-6 gap-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${
                  currentChallenge.difficulty === 'foundation'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {currentChallenge.difficulty} Tier
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Node: {currentChallenge.nodeId}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Competency: {currentChallenge.competencyLevel}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {currentChallengeIndex + 1}. {currentChallenge.question}
            </h3>

            {/* Hint Bubble Component */}
            <HintBubble show={showHint} text={currentChallenge.hints[hintLevel] || currentChallenge.hints[0]} />

            {/* Render Multiple Choice Options */}
            {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
              <div className="space-y-3 mb-8">
                {currentChallenge.options.map((optionText, optIndex) => (
                  <button
                    key={optIndex}
                    disabled={challengeAnswered}
                    onClick={() => setSelectedOption(optIndex)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                      selectedOption === optIndex
                        ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    } ${
                      challengeAnswered && optIndex === currentChallenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 font-bold'
                        : ''
                    } ${
                      challengeAnswered && selectedOption === optIndex && optIndex !== currentChallenge.correctIndex
                        ? 'bg-rose-950/90 border-rose-400 text-rose-100'
                        : ''
                    }`}
                  >
                    <span>
                      <strong className="text-cyan-400 mr-2">{String.fromCharCode(65 + optIndex)}.</strong>
                      {optionText}
                    </span>
                    {challengeAnswered && optIndex === currentChallenge.correctIndex && (
                      <span className="text-emerald-400 text-base">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Render Numeric Input Options */}
            {currentChallenge.type === 'numeric' && (
              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    disabled={challengeAnswered}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-lg font-mono focus:outline-none focus:border-cyan-400 w-full max-w-xs"
                  />
                  <span className="text-slate-400 text-sm font-bold">{currentChallenge.unit}</span>
                </div>
              </div>
            )}

            {/* Action Buttons: Submit / Next / Hint */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <button
                onClick={() => {
                  if (hintLevel < currentChallenge.hints.length - 1) {
                    setHintLevel((prev) => prev + 1);
                  }
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                disabled={challengeAnswered}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-bold rounded-lg transition disabled:opacity-40"
              >
                💡 Need Hint? ({hintLevel + 1}/3)
              </button>

              {!challengeAnswered ? (
                <button
                  onClick={handleChallengeAnswer}
                  disabled={selectedOption === null && numericInput.trim() === ''}
                  className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl transition shadow-lg shadow-cyan-600/30"
                >
                  Submit Solution
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <span>Next ISC Challenge</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>

            {/* Detailed Explanation Drawer */}
            {challengeAnswered && (
              <div className={`mt-8 p-6 rounded-xl border text-sm leading-relaxed ${
                isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
              }`}>
                <div className="font-bold text-base mb-2 flex items-center gap-2">
                  {isCorrect ? '✓ Excellent Explanation:' : '✕ Detailed Chemical Explanation:'}
                </div>
                {currentChallenge.explanation}
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            TAB 4: SUMMARY & REAL-WORLD ACTIVITY
            ========================================== */}
        {activeTab === 'summary' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Real World Clinical Activity */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <h2 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4">
                Clinical Pathology Workflow Steps
              </h3>
              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <div key={i} className="flex gap-4 items-start bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                    <span className="w-7 h-7 rounded-full bg-cyan-600/30 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-slate-200 text-sm leading-relaxed">{st}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Misconceptions Summary */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h3 className="text-md font-bold text-rose-400 uppercase tracking-wider mb-4">
                  Common ISC Biomolecule Misconceptions
                </h3>
                <div className="space-y-4">
                  {MISCONCEPTIONS.map((m, mIdx) => (
                    <div key={mIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                        <span>⚠️ Misconception:</span>
                      </div>
                      <p className="text-xs text-slate-300">{m.misconception}</p>
                      <div className="text-xs font-bold text-emerald-400 pt-1">
                        <span>✓ ISC Correction:</span>
                      </div>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">{m.correction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C12_ChemistryBiomoleculesCBSESim;