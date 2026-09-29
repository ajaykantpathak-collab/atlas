'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// MANDATORY NODE IDS LIST FOR THIS SIMULATION
// ==========================================
const ALL_NODE_IDS = [
  'c12_chem_cbse_302',
  'c12_chem_cbse_303',
  'c12_chem_cbse_304',
  'c12_chem_cbse_306',
  'c12_chem_cbse_307',
  'c12_chem_cbse_308',
  'c12_chem_cbse_310',
  'c12_chem_cbse_311',
  'c12_chem_cbse_312',
  'c12_chem_cbse_313',
  'c12_chem_cbse_314',
  'c12_chem_cbse_315',
  'c12_chem_cbse_316',
  'c12_chem_cbse_317',
  'c12_chem_cbse_321',
  'c12_chem_cbse_322',
  'c12_chem_cbse_323',
  'c12_chem_cbse_324',
  'c12_chem_cbse_325',
  'c12_chem_cbse_327',
  'c12_chem_cbse_328',
  'c12_chem_cbse_330',
  'c12_chem_cbse_331',
  'c12_chem_cbse_332',
  'c12_chem_cbse_333',
  'c12_chem_cbse_334',
  'c12_chem_cbse_335',
  'c12_chem_cbse_267',
  'c12_chem_cbse_268',
  'c12_chem_cbse_269',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Props {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-order' | 'numeric' | 'classification';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex: number;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: NodeId;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

// ==========================================
// SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Advanced Organic Reaction Mechanics & Haloalkane Synthetic Lab',
  intro: 'Welcome to the CISCE High-Precision Organic Synthesis & Reaction Kinetics Laboratory. Here, you will investigate how haloalkanes and haloarenes undergo nucleophilic substitution, elimination, electrophilic substitution, and stereochemical transformations.',
  context: 'As the lead pharmaceutical organic chemist, you are tasked with designing regioselective and stereospecific pathways for synthesising therapeutic intermediates while understanding halogen atom polarisability, inversion dynamics, and environmental toxicity profiles.',
};

// ==========================================
// SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why does Chlorobenzene undergo nucleophilic substitution with aqueous NaOH at 623 K and 300 atm, whereas 2,4,6-trinitrochlorobenzene reacts smoothly with warm water alone at 333 K?',
  options: [
    'Chlorobenzene has a stronger C-Cl bond due to partial double bond character from resonance, while ortho/para nitro groups stabilize the anionic Meisenheimer intermediate via strong -I and -R effects.',
    'Chlorobenzene is sterically hindered while 2,4,6-trinitrochlorobenzene undergoes SN2 mechanism with inversion.',
    'Nitro groups act as electron donors (+R effect), forcing chlorine to depart rapidly as chloride ion.',
    'Chlorobenzene forms a stable carbocation intermediate while trinitrochlorobenzene reacts via a radical chain mechanism.'
  ],
  correctIndex: 0,
  hintAfter: 'Resonance delocalisation of chlorine unshared pairs into the aromatic ring creates a partial double bond character. Electron-withdrawing -NO2 groups at ortho/para positions disperse the negative charge of the intermediate complex!',
};

// ==========================================
// DEFAULT PROPS
// ==========================================
const DEFAULT_PROPS: Props = {
  onComplete: () => {},
  initialNodeId: 'c12_chem_cbse_311',
};

// ==========================================
// SECTION 3: EXPLORATION_STEPS (MANDATORY 5 LABS)
// ==========================================
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Kinetic Kinetics & Mechanism (SN1 vs SN2)',
    instruction: 'Vary the substrate substitution (1°, 2°, 3°), nucleophile strength, and solvent dielectric constant to measure reaction rates and determine mechanism switches.',
    interactionType: 'reaction-kinetics-slider',
    nodeId: 'c12_chem_cbse_311',
  },
  {
    title: 'Lab 2: Polarimetry & Optical Stereochemistry',
    instruction: 'Adjust optical path length, solute concentration, and enantiomeric excess (R/S ratio) to measure specific rotation [α] and observe Walden Inversion vs Racemisation.',
    interactionType: 'polarimeter-control',
    nodeId: 'c12_chem_cbse_315',
  },
  {
    title: 'Lab 3: Haloarene Nucleophilic Reactivity & EWG Effect',
    instruction: 'Add electron-withdrawing nitro (-NO2) groups to Chlorobenzene at Ortho, Meta, and Para positions to observe Meisenheimer intermediate stabilization and temperature threshold drop.',
    interactionType: 'haloarene-ewg-builder',
    nodeId: 'c12_chem_cbse_322',
  },
  {
    title: 'Lab 4: Ambident Nucleophile Selectivity Simulator',
    instruction: 'Compare reactions of Haloalkanes with Ionic Salts (KCN, KNO2) vs Covalent Salts (AgCN, AgNO2) to predict product formation (Cyanide vs Isocyanide, Alkyl Nitrite vs Nitroalkane).',
    interactionType: 'ambident-nucleophile-selector',
    nodeId: 'c12_chem_cbse_335',
  },
  {
    title: 'Lab 5: Polyhalogen & Environmental Tox-Impact Lab',
    instruction: 'Simulate structural decomposition of Chloroform to Phosgene gas, Freon-12 catalytic ozone depletion cycles, and DDT bioaccumulation in food chains.',
    interactionType: 'polyhalogen-toxicity-sim',
    nodeId: 'c12_chem_cbse_332',
  },
];

// ==========================================
// SECTION 4: PREDICTION_QUESTIONS (MANDATORY)
// ==========================================
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: What happens to the optical activity when an optically active 2-bromobutane (S-enantiomer) undergoes pure SN2 substitution with hydroxide ion (OH-)?',
    options: [
      ' complete inversion of configuration occurs, yielding 100% (R)-butan-2-ol with inverted optical rotation.',
      'A 50:50 racemic mixture forms with zero net optical activity.',
      'Retention of configuration occurs with zero change in sign of optical rotation.',
      'The compound decomposes into 2-butene without forming an alcohol.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Set SN2 conditions in Lab 1 (1°/2° substrate, strong nucleophile, polar aprotic solvent) and observe 100% backside Walden inversion in the Stereochemistry panel.',
    nodeId: 'c12_chem_cbse_313',
  },
  {
    question: 'Predict: Which halide will undergo the fastest SN1 reaction with aqueous silver nitrate solution?',
    options: [
      'tert-Butyl bromide [(CH3)3C-Br]',
      'Isopropyl bromide [(CH3)2CH-Br]',
      'Ethyl bromide [CH3CH2-Br]',
      'Methyl bromide [CH3-Br]'
    ],
    correctIndex: 0,
    verifyInstruction: 'Select 3° tertiary substrate in Lab 1. The formation of a highly hyperconjugation-stabilised 3° carbocation lowers activation energy dramatically.',
    nodeId: 'c12_chem_cbse_312',
  },
];

// ==========================================
// SECTION 5: OBSERVATION_QUESTIONS (MANDATORY)
// ==========================================
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you observe about the activation energy profile during an SN1 mechanism compared to an SN2 mechanism?',
    observableOptions: [
      'SN1 displays a double-hump potential energy curve with an intermediate carbocation valley, whereas SN2 exhibits a single high energy transition state peak.',
      'SN1 displays a single peak transition state, while SN2 has three energy valleys.',
      'Both mechanisms show identical activation energy single-peak curves.',
      'SN1 requires higher activation energy in polar aprotic solvents than polar protic solvents.'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_cbse_311',
  },
  {
    question: 'When haloalkanes react with AgCN instead of KCN, what key structural difference in the nucleophilic attack is observed?',
    observableOptions: [
      'AgCN is predominantly covalent; the nucleophilic nitrogen atom with its unshared pair attacks the carbon, yielding alkyl isocyanide (R-NC).',
      'KCN forms isocyanide because potassium bonds directly to carbon.',
      'AgCN releases cyanide ions freely, leading to R-CN as major product.',
      'Both KCN and AgCN produce identical mixtures of alkanes and alkenes.'
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_cbse_335',
  },
];

// ==========================================
// SECTION 6: REAL_WORLD_ACTIVITY (MANDATORY)
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Industrial Pathway Analysis & Green Chemistry Assessment',
  description: 'Design a clean commercial synthesis of Phenol from Chlorobenzene via the Dow Process vs Hydrolysis of 2,4-Dinitrochlorobenzene, while evaluating CFC atmospheric ozone depletion potential.',
  steps: [
    'Step 1: Calculate the activation temperature needed for Chlorobenzene hydrolysis with aqueous 6-8% NaOH under high pressure (623 K, 300 atm).',
    'Step 2: Contrast this with 2,4-dinitrochlorobenzene requiring only boiling with aqueous Na2CO3 at 363 K due to electron withdrawal by -NO2 groups.',
    'Step 3: Analyze the catalytic ozone breakdown cycle by Freon-12 (CF2Cl2): CF2Cl2 + hν → CF2Cl• + Cl•; Cl• + O3 → ClO• + O2; ClO• + O → Cl• + O2.',
    'Step 4: Formulate a modern eco-friendly replacement strategy using hydrofluorocarbons (HFCs) containing no C-Cl bonds to eliminate stratospheric chlorine radicals.'
  ],
};

// ==========================================
// SECTION 7: MISCONCEPTIONS (6)
// ==========================================
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc-1',
    title: 'SN1 vs SN2 Substrate Preference',
    misconception: 'Students often believe 1° haloalkanes prefer SN1 because primary carbocations form easily.',
    correction: '1° haloalkanes undergo SN2 due to unhindered backside attack and low stability of 1° carbocations. 3° haloalkanes undergo SN1 due to tertiary carbocation stability.',
    nodeId: 'c12_chem_cbse_314',
  },
  {
    id: 'misc-2',
    title: 'Chlorobenzene Reactivity',
    misconception: 'Haloarenes undergo nucleophilic substitution as readily as haloalkanes.',
    correction: 'Haloarenes are extremely unreactive to nucleophilic attack due to resonance delocalisation (partial C=Cl double bond), sp2 hybridised carbon, and electron repulsion from the pi-cloud.',
    nodeId: 'c12_chem_cbse_269',
  },
  {
    id: 'misc-3',
    title: 'Ambident Nucleophiles (KCN vs AgCN)',
    misconception: 'KCN and AgCN both produce alkyl cyanides (RCN) because they both supply cyanide ions.',
    correction: 'KCN is ionic, yielding CN- where carbon attacks to give alkyl cyanides (R-CN). AgCN is covalent; nitrogen attacks with its lone pair to give alkyl isocyanides (R-NC).',
    nodeId: 'c12_chem_cbse_335',
  },
  {
    id: 'misc-4',
    title: 'Stereochemistry in SN1 Reactions',
    misconception: 'SN1 reactions always produce 100% complete racemisation with exact 50:50 enantiomeric ratio.',
    correction: 'In practice, SN1 often yields slight excess of inversion (partial racemisation) because the leaving halide ion shields the front side temporarily as an ion pair.',
    nodeId: 'c12_chem_cbse_316',
  },
  {
    id: 'misc-5',
    title: 'Ortho/Para Directing Influence of Halogens',
    misconception: 'Because halogens are deactivating in electrophilic aromatic substitution, they must be meta-directing.',
    correction: 'Halogens are ortho/para directing due to +R resonance stabilization of the carbocation, even though they deactivate the ring overall due to strong -I inductive effect.',
    nodeId: 'c12_chem_cbse_324',
  },
  {
    id: 'misc-6',
    title: 'Chloroform Storage',
    misconception: 'Chloroform decomposes into hydrochloric acid when exposed to sunlight.',
    correction: 'Chloroform oxidises in air under light to form highly toxic phosgene gas (carbonyl chloride, COCl2). It is stored in dark closed bottles with 1% ethanol added as stabilizer.',
    nodeId: 'c12_chem_cbse_328',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8)
// ==========================================
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    nodeId: 'c12_chem_cbse_304',
    question: 'Which carbon-halogen bond has the highest bond dissociation enthalpy?',
    options: ['C-F', 'C-Cl', 'C-Br', 'C-I'],
    correctIndex: 0,
    explanation: 'C-F bond has the highest bond dissociation enthalpy due to small atomic size of fluorine and effective 2p-2p orbital overlap.',
  },
  {
    id: 'diag-2',
    nodeId: 'c12_chem_cbse_306',
    question: 'Why is the Darzen process (SOCl2 with alcohol) preferred for preparing alkyl chlorides?',
    options: [
      'The side products (SO2 and HCl) are gaseous and escape easily, leaving pure alkyl chloride.',
      'It gives 100% inversion without any catalyst.',
      'It proceeds at liquid nitrogen temperature.',
      'SOCl2 is non-toxic and cheap.'
    ],
    correctIndex: 0,
    explanation: 'SOCl2 reaction produces SO2 gas and HCl gas which escape, giving pure alkyl chloride without complex purification.',
  },
  {
    id: 'diag-3',
    nodeId: 'c12_chem_cbse_310',
    question: 'Why does isomeric chlorobutane have the lowest boiling point in its tertiary isomer [(CH3)3CCl]?',
    options: [
      'Branching decreases surface area, lowering Van der Waals forces.',
      'Tertiary isomers are more polar.',
      'Branching increases intermolecular hydrogen bonding.',
      'Tertiary isomers have higher molecular mass.'
    ],
    correctIndex: 0,
    explanation: 'Branching makes the molecule spherical, decreasing total surface area and reducing Van der Waals attractive forces.',
  },
  {
    id: 'diag-4',
    nodeId: 'c12_chem_cbse_313',
    question: 'What kinetic order does an SN2 reaction follow?',
    options: [
      'Second order kinetics: Rate = k[Substrate][Nucleophile]',
      'First order kinetics: Rate = k[Substrate]',
      'Zero order kinetics: Rate = k',
      'Third order kinetics: Rate = k[Substrate]^2[Nucleophile]'
    ],
    correctIndex: 0,
    explanation: 'SN2 reaction rate depends on concentrations of both substrate and nucleophile in a single bimolecular step.',
  },
  {
    id: 'diag-5',
    nodeId: 'c12_chem_cbse_317',
    question: 'According to Saytzeff (Zaitsev) Rule, what is the major product of dehydrohalogenation of 2-bromobutane with alcoholic KOH?',
    options: ['But-2-ene', 'But-1-ene', 'But-1-yne', 'Butan-2-ol'],
    correctIndex: 0,
    explanation: 'Saytzeff rule states that the most highly substituted alkene (more alkyl groups attached to double bond carbons) is the major product (But-2-ene).',
  },
  {
    id: 'diag-6',
    nodeId: 'c12_chem_cbse_267',
    question: 'What reagent is formed when methyl iodide reacts with Magnesium metal in dry ether solvent?',
    options: [
      'Methylmagnesium iodide (Grignard Reagent CH3MgI)',
      'Dimethylmagnesium',
      'Ethane gas',
      'Methoxymagnesium chloride'
    ],
    correctIndex: 0,
    explanation: 'Haloalkanes react with Mg in dry ether to form organometallic alkylmagnesium halides (RMgX - Grignard reagents).',
  },
  {
    id: 'diag-7',
    nodeId: 'c12_chem_cbse_330',
    question: 'Which structural unit gives a yellow precipitate of Iodoform (CHI3) when heated with I2 and NaOH?',
    options: [
      'CH3-C=O or CH3-CH(OH)- group',
      'CH3-CH2-CH2-OH',
      'CH3-O-CH3',
      'Benzene ring'
    ],
    correctIndex: 0,
    explanation: 'Compounds containing acetyl group (CH3-C=O) or CH3-CH(OH)- oxidized to acetyl give positive iodoform test.',
  },
  {
    id: 'diag-8',
    nodeId: 'c12_chem_cbse_333',
    question: 'What are the starting materials synthesized to produce DDT?',
    options: [
      'Chloral (CCl3CHO) and Chlorobenzene in presence of concentrated H2SO4',
      'Chloroform and Benzene',
      'Carbon tetrachloride and Phenol',
      'Chlorobenzene and Formaldehyde'
    ],
    correctIndex: 0,
    explanation: 'DDT is produced by condensation of 1 molecule of chloral with 2 molecules of chlorobenzene in conc. H2SO4.',
  },
];

// ==========================================
// SECTION 7: 22 PROGRESSIVE CHALLENGES
// ==========================================
const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'chal-1',
    nodeId: 'c12_chem_cbse_302',
    type: 'classification',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Classify Allyl chloride (CH2=CH-CH2Cl) based on the hybridisation of the carbon bonded to chlorine:',
    options: ['sp3 hybridized carbon adjacent to C=C double bond', 'sp2 hybridized carbon of aromatic ring', 'sp hybridized carbon', 'Vinyl halide with sp2 carbon'],
    correctIndex: 0,
    explanation: 'In allylic halides, halogen is attached to an sp3-hybridized carbon adjacent to a carbon-carbon double bond (C=C).',
    hints: ['Check the hybridisation of the carbon directly attached to Cl.', 'It is attached to CH2, which is bonded to -CH=CH2.', 'sp3 carbon next to double bond is allylic.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-2',
    nodeId: 'c12_chem_cbse_303',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'IUPAC Nomenclature',
    question: 'What is the correct IUPAC name of (CH3)2CH-CH(Cl)-CH3?',
    options: ['2-Chloro-3-methylbutane', '3-Chloro-2-methylbutane', '2-Methyl-3-chlorobutane', 'Chloroisopentane'],
    correctIndex: 0,
    explanation: 'Numbering starts from the end giving lowest locants: C1(CH3)-C2(H)(Cl)-C3(H)(CH3)-C4(CH3) -> 2-chloro-3-methylbutane.',
    hints: ['Find the longest continuous carbon chain (4 carbons -> butane).', 'Number from the side that gives lowest locant set (2,3 vs 2,3 - alphabetic priority).', '2-chloro comes before 3-methyl.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-3',
    nodeId: 'c12_chem_cbse_304',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Bond Dipole & Physical Properties',
    question: 'Why is the dipole moment of Chlorobenzene lower than that of Cyclohexyl chloride?',
    options: [
      'C-Cl carbon in chlorobenzene is sp2 hybridised (more electronegative) and C-Cl bond length is shorter due to resonance.',
      'Chlorobenzene is non-polar because benzene rings have zero polarity.',
      'Cyclohexyl chloride has delocalised pi electrons.',
      'Chlorobenzene has higher molecular mass.'
    ],
    correctIndex: 0,
    explanation: 'In chlorobenzene, carbon is sp2 (more electronegative, holds electron pair tighter) and has partial double bond character (shorter bond length), lowering μ = q × d.',
    hints: ['Consider carbon hybridisation sp2 vs sp3.', 'Dipole moment depends on charge separation and distance d.', 'Resonance shortens the C-Cl bond in chlorobenzene.'],
    misconceptionIndex: 1,
  },
  {
    id: 'chal-4',
    nodeId: 'c12_chem_cbse_306',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Preparation Methods',
    question: 'Which halogen exchange reaction converts alkyl chloride to alkyl iodide using NaI in dry acetone?',
    options: ['Finkelstein Reaction', 'Swarts Reaction', 'Sandmeyer Reaction', 'Wurtz Reaction'],
    correctIndex: 0,
    explanation: 'Finkelstein reaction: R-Cl + NaI (in dry acetone) -> R-I + NaCl(s) precipitated.',
    hints: ['It uses NaI in dry acetone.', 'NaCl or NaBr precipitates out in acetone.', 'Named after Emil Finkelstein.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-5',
    nodeId: 'c12_chem_cbse_308',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Fluoride Synthesis',
    question: 'Synthesis of alkyl fluorides is best achieved by heating alkyl chloride/bromide with metallic fluorides like AgF or Hg2F2. What is this reaction called?',
    options: ['Swarts Reaction', 'Finkelstein Reaction', 'Kolbe Reaction', 'Fittig Reaction'],
    correctIndex: 0,
    explanation: 'Swarts reaction is the standard method for preparing alkyl fluorides using inorganic fluorides like AgF, Hg2F2, CoF2, or SbF3.',
    hints: ['Involves metallic fluorides like AgF.', 'Replaces chlorine/bromine with fluorine.', 'Starts with letter S.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-6',
    nodeId: 'c12_chem_cbse_310',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Physical Properties',
    question: 'Arrange the following haloalkanes in increasing order of boiling points: CH3F, CH3Cl, CH3Br, CH3I',
    options: ['CH3F < CH3Cl < CH3Br < CH3I', 'CH3I < CH3Br < CH3Cl < CH3F', 'CH3Cl < CH3F < CH3Br < CH3I', 'CH3F < CH3I < CH3Cl < CH3Br'],
    correctIndex: 0,
    explanation: 'As halogen size and atomic mass increase from F to I, Van der Waals dispersion forces increase, elevating boiling point.',
    hints: ['Boiling point increases with molecular weight and polarisability.', 'Iodine is larger than bromine, chlorine, fluorine.', 'Order follows atomic number of halogen.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-7',
    nodeId: 'c12_chem_cbse_311',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Nucleophile Definition',
    question: 'Which species functions as a strong nucleophile in nucleophilic substitution reactions?',
    options: ['Hydroxide ion (OH-)', 'Hydronium ion (H3O+)', 'Nitronium ion (NO2+)', 'Carbocation (R+)'],
    correctIndex: 0,
    explanation: 'Nucleophiles are electron-rich species with unshared pairs or negative charges (e.g., OH-). H3O+, NO2+, and R+ are electrophiles.',
    hints: ['Nucleophile means nucleus-loving (electron-rich).', 'Look for negative charge or lone pair.', 'OH- has lone pairs and negative charge.'],
    misconceptionIndex: 0,
  },

  // STANDARD (8)
  {
    id: 'chal-8',
    nodeId: 'c12_chem_cbse_312',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'SN1 Mechanism & Carbocation',
    question: 'Why does 3-bromobut-1-ene undergo fast nucleophilic substitution to yield a mixture of two isomeric products?',
    options: [
      'It forms an allylic carbocation intermediate stabilized by resonance, allowing attack at two different carbon positions.',
      'It proceeds via steric inversion at two centers simultaneously.',
      'It decomposes into a diene intermediate.',
      'Bromine undergoes radical rearrangement.'
    ],
    correctIndex: 0,
    explanation: 'The allylic carbocation [CH2=CH-CH(+)-CH3 <-> (+)CH2-CH=CH-CH3] is resonance-stabilized with two electrophilic carbons.',
    hints: ['Draw the carbocation formed after loss of Br-.', 'Delocalise the double bond electrons.', 'Resonance hybrid has positive charge delocalised over C1 and C3.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-9',
    nodeId: 'c12_chem_cbse_313',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'SN2 Stereochemistry',
    question: 'Reaction of optically active (+)-2-bromooctane with NaOH yields (-)-octan-2-ol. What stereochemical process occurred?',
    options: ['Walden Inversion (100% inversion of configuration)', 'Racemisation', 'Retention of configuration', 'Dimerisation'],
    correctIndex: 0,
    explanation: 'SN2 proceeds via backside attack of OH-, causing complete inversion of optical configuration (Walden Inversion).',
    hints: ['SN2 involves backside attack.', 'The spatial arrangement flips like an umbrella in strong wind.', 'This inversion is named Walden Inversion.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal-10',
    nodeId: 'c12_chem_cbse_314',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Solvent Effects on Kinetics',
    question: 'Which solvent choice dramatically accelerates SN2 reactions while slowing down SN1 reactions?',
    options: [
      'Polar Aprotic Solvents (e.g., Acetone, DMSO, DMF)',
      'Polar Protic Solvents (e.g., Water, Ethanol)',
      'Non-polar Solvents (e.g., Hexane, Benzene)',
      'Acidic Solvents (e.g., CH3COOH)'
    ],
    correctIndex: 0,
    explanation: 'Polar aprotic solvents solvate cations but leave nucleophiles bare/unsolvated, greatly increasing nucleophilicity for SN2.',
    hints: ['Polar protic solvents hydrogen bond with nucleophiles, lowering nucleoisity.', 'Polar aprotic solvents (DMSO, DMF) do not form H-bonds with anions.', 'Unsolvated nucleophiles attack faster in SN2.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-11',
    nodeId: 'c12_chem_cbse_315',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Stereochemistry Terms',
    question: 'A molecule containing two chiral carbons with an internal plane of symmetry that renders it optically inactive is called:',
    options: ['A meso compound', 'An enantiomer', 'A racemic mixture', 'A diastereomer'],
    correctIndex: 0,
    explanation: 'Meso compounds contain chiral centers but possess an internal plane/center of symmetry, making them achiral and optically inactive.',
    hints: ['It has chiral centers.', 'It has an internal symmetry plane.', 'Internal compensation makes it optically inactive.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal-12',
    nodeId: 'c12_chem_cbse_317',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Elimination Regioselectivity',
    question: 'When 2-bromopentane is heated with alcoholic KOH, the predominant alkene product formed according to Saytzeff rule is:',
    options: ['Pent-2-ene (more substituted alkene)', 'Pent-1-ene', 'Penta-1,3-diene', 'Cyclopentane'],
    correctIndex: 0,
    explanation: 'Saytzeff rule dictates that elimination yields the more alkylated (substituted) alkene: Pent-2-ene is 81% (major) vs Pent-1-ene (19%).',
    hints: ['Dehydrohalogenation removes H from beta-carbon with fewer hydrogens.', 'Pent-2-ene has 2 alkyl groups on double bond carbons.', 'Pent-1-ene has only 1 alkyl group.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-13',
    nodeId: 'c12_chem_cbse_267',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Organometallic Chemistry',
    question: 'Why must Grignard reagents (RMgX) be prepared under strictly anhydrous conditions?',
    options: [
      'Grignard reagents are strong bases that react instantly with traces of water to form alkanes (RH) and Mg(OH)X.',
      'Water reacts with magnesium metal to produce explosive oxygen gas.',
      'Water oxidises alkyl halides to alcohols directly.',
      'Water forms a precipitate with dry ether.'
    ],
    correctIndex: 0,
    explanation: 'The C-Mg bond is highly polar [Rδ- - Mgδ+X]. R- acts as a powerful carbanion base, abstracting H+ from water to form RH alkane.',
    hints: ['Grignard reagent carbon holds partial negative charge (R-).', 'Water is a proton donor (H+).', 'Protonation of carbanion gives alkane.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-14',
    nodeId: 'c12_chem_cbse_268',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Sandmeyer Reaction',
    question: 'In the Sandmeyer reaction, benzene diazonium chloride is converted to chlorobenzene using which reagent?',
    options: ['Cuprous chloride (Cu2Cl2 / HCl)', 'Copper powder and HCl', 'Chlorine gas with FeCl3 catalyst', 'Thionyl chloride SOCl2'],
    correctIndex: 0,
    explanation: 'Sandmeyer reaction uses Cu2Cl2 / HCl (or Cu2Br2 / HBr) to replace diazonium group -N2+Cl- with halogen.',
    hints: ['Uses cuprous halide dissolved in corresponding halogen acid.', 'Copper in +1 oxidation state.', 'Cu2Cl2 / HCl.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-15',
    nodeId: 'c12_chem_cbse_321',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Aromatic Nucleophilic Substitution',
    question: 'Conversion of chlorobenzene to phenol via Dow Process requires harsh conditions (NaOH, 623 K, 300 atm). Why?',
    options: [
      'C-Cl bond in chlorobenzene has partial double bond character due to resonance and phenyl cation is unstable.',
      'Chlorobenzene is insoluble in aqueous NaOH.',
      'Phenol decomposes at lower temperatures.',
      'NaOH acts as a reducing agent.'
    ],
    correctIndex: 0,
    explanation: 'Delocalisation of unshared electrons on Cl into aromatic ring gives C-Cl bond double bond character (shorter, stronger), resisting substitution.',
    hints: ['Look at the resonance structures of chlorobenzene.', 'C-Cl bond length is 169 pm compared to 177 pm in alkyl chloride.', 'Extremely strong bond requires 623 K and 300 atm.'],
    misconceptionIndex: 1,
  },

  // ADVANCED (7)
  {
    id: 'chal-16',
    nodeId: 'c12_chem_cbse_322',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'EWG Activation Dynamics',
    question: 'Why does 4-nitrochlorobenzene undergo nucleophilic substitution with NaOH at 443 K, while 2,4,6-trinitrochlorobenzene reacts with warm water at 333 K?',
    options: [
      'Ortho and para -NO2 groups stabilize the anionic Meisenheimer intermediate by resonance (-R effect), dispersing negative charge into oxygen atoms.',
      'Nitro groups increase steric strain, forcing chlorine to pop off.',
      'Meta-nitro groups provide stronger resonance stabilization than ortho/para.',
      'Trinitrochlorobenzene undergoes radical substitution.'
    ],
    correctIndex: 0,
    explanation: 'Ortho/para nitro groups draw electron density by -I and -R effects. The negative charge formed in Meisenheimer intermediate is delocalised onto oxygen atoms of NO2.',
    hints: ['Draw resonance forms of carbanion intermediate.', 'Negative charge visits ortho and para carbon positions directly.', 'Nitro group at ortho/para can delocalise negative charge onto -NO2.'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal-17',
    nodeId: 'c12_chem_cbse_324',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Electrophilic Substitution Paradox',
    question: 'Why is chlorobenzene ortho/para directing in electrophilic aromatic substitution, yet overall deactivating compared to benzene?',
    options: [
      'Inductive effect (-I) deactivates ring overall, but resonance effect (+R) stabilizes ortho/para carbocation intermediates by lone pair donation.',
      '+I effect activates ring while -R effect directs meta.',
      'Chlorine donates electrons via -I effect and withdraws via +R.',
      'Hyperconjugation dominates over resonance.'
    ],
    correctIndex: 0,
    explanation: 'Chlorine is electronegative (-I > +R overall rate deactivation), but its lone pair (+R) stabilizes the arenium ion when electrophile attacks ortho/para positions.',
    hints: ['Inductive effect (-I) withdraws electron density (deactivating).', 'Resonance (+R) donates electrons specifically to ortho/para positions.', 'Competition between -I and +R determines overall rate vs orientation.'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal-18',
    nodeId: 'c12_chem_cbse_325',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Wurtz-Fittig Synthesis',
    question: 'What is the organic product formed when a mixture of Bromobenzene and Methyl bromide is treated with Sodium metal in dry ether?',
    options: ['Toluene (Methylbenzene)', 'Biphenyl', 'Ethane', 'Benzene'],
    correctIndex: 0,
    explanation: 'Wurtz-Fittig reaction: C6H5Br + 2Na + CH3Br --(ether)--> C6H5-CH3 (Toluene) + 2NaBr.',
    hints: ['Coupling of aryl halide and alkyl halide.', 'C6H5- group couples with -CH3 group.', 'Yields an alkylarene (Toluene).'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-19',
    nodeId: 'c12_chem_cbse_328',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Polyhalogen Photochemistry',
    question: 'Why is 1% Ethanol added to commercial Chloroform (CHCl3) bottles?',
    options: [
      'It converts poisonous Phosgene (COCl2) gas into non-toxic Diethyl carbonate [(C2H5O)2CO].',
      'It prevents chloroform from evaporating.',
      'It acts as an oxidizing agent.',
      'It neutralizes hydrochloric acid formed during distillation.'
    ],
    correctIndex: 0,
    explanation: 'Chloroform slowly oxidises in air/light to deadly Phosgene (COCl2). Ethanol reacts with COCl2 to form harmless diethyl carbonate: COCl2 + 2C2H5OH -> (C2H5O)2CO + 2HCl.',
    hints: ['Phosgene is COCl2.', 'Ethanol reacts with phosgene.', 'Forms an ester called diethyl carbonate.'],
    misconceptionIndex: 5,
  },
  {
    id: 'chal-20',
    nodeId: 'c12_chem_cbse_332',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Stratospheric Photochemistry',
    question: 'In the stratosphere, Freon-12 (CF2Cl2) initiates catalytic ozone destruction. What reactive radical species directly attacks O3 molecules?',
    options: ['Chlorine free radical (Cl•)', 'Fluorine radical (F•)', 'CF2Cl radical', 'Oxygen atom radical (O••)'],
    correctIndex: 0,
    explanation: 'UV light cleaves C-Cl bond: CF2Cl2 + hν -> CF2Cl• + Cl•. Chlorine radical Cl• catalytically converts O3 to O2.',
    hints: ['C-Cl bond is weaker than C-F bond.', 'UV photolysis yields free chlorine radical.', 'Cl• + O3 -> ClO• + O2.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-21',
    nodeId: 'c12_chem_cbse_334',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Polarimetry Quantitative Analysis',
    question: 'A solution of an optically active compound (concentration = 0.10 g/mL) in a 2.0 dm polarimeter tube shows an observed rotation of +12.4°. Calculate its specific rotation [α].',
    options: ['+62.0°', '+24.8°', '+124.0°', '+31.0°'],
    correctIndex: 0,
    explanation: 'Formula: [α] = α / (l × c) = 12.4° / (2.0 dm × 0.10 g/mL) = 12.4 / 0.20 = +62.0° dm^-1 g^-1 mL.',
    hints: ['Specific rotation [α] = observed rotation / (length in dm × concentration in g/mL)', 'l = 2.0 dm, c = 0.10 g/mL', '[α] = 12.4 / (2.0 * 0.10) = 12.4 / 0.2 = 62°'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-22',
    nodeId: 'c12_chem_cbse_335',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Ambident Reactivity Control',
    question: 'When 1-chlorobutane reacts with aqueous alcoholic AgNO2, the major product obtained is 1-nitrobutane (CH3CH2CH2CH2NO2). What is the major product when KNO2 is used instead?',
    options: [
      'Butyl nitrite (CH3CH2CH2CH2-O-N=O)',
      '1-Nitrobutane',
      'Butan-1-ol',
      'But-1-ene'
    ],
    correctIndex: 0,
    explanation: 'KNO2 is ionic [K+ O-N=O]. Negative charge resides on oxygen, so O-attack occurs giving alkyl nitrite (R-ONO). AgNO2 is covalent, N-attack gives nitroalkane (R-NO2).',
    hints: ['KNO2 is ionic, forming K+ and nitrite anion [O-N=O]-.', 'Oxygen atom carries the negative charge.', 'Nucleophilic attack through oxygen yields alkyl nitrite R-O-N=O.'],
    misconceptionIndex: 2,
  },
];

// ==========================================
// SUB-COMPONENT 1: SN1 vs SN2 CANVAS ANIMATOR
// ==========================================
interface CanvasProps {
  mechanism: 'SN1' | 'SN2';
  substrateDegree: '1' | '2' | '3';
  nucleophile: 'OH-' | 'CN-' | 'I-' | 'H2O';
  solvent: 'protic' | 'aprotic';
}

const SN1vsSN2Canvas: React.FC<CanvasProps> = ({ mechanism, substrateDegree, nucleophile, solvent }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let progress = 0;

    const render = () => {
      progress = (progress + 0.008) % 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.save();
      ctx.font = 'bold 14px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Mechanism Mode: ${mechanism} | Substrate: ${substrateDegree}° | Solvent: ${solvent}`, 15, 25);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (mechanism === 'SN2') {
        // SN2 Concerted Mechanism with Walden Inversion
        // Phase 0 -> 0.4: Nu approaches from left
        // Phase 0.4 -> 0.6: Planar Transition State (pentacoordinate)
        // Phase 0.6 -> 1.0: X leaves to right, inversion complete

        const nuX = progress < 0.5 ? 80 + progress * 2 * (cx - 140) : cx - 60;
        const xX = progress > 0.5 ? cx + 60 + (progress - 0.5) * 2 * 140 : cx + 60;

        // Draw Central Carbon
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();
        ctx.strokeStyle = '#0284c7';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.fillStyle = '#0f172a';
        ctx.fillText('C', cx - 5, cy + 5);

        // Draw Nucleophile (Nu)
        ctx.beginPath();
        ctx.arc(nuX, cy, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#22c55e';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText(nucleophile, nuX - 12, cy + 5);

        // Draw Leaving Group (Br / Cl)
        ctx.beginPath();
        ctx.arc(xX, cy, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillText('X⁻', xX - 8, cy + 5);

        // Substrate Groups (R1, R2, R3 umbrella flipping)
        const angleOffset = (progress - 0.5) * Math.PI * 0.4;
        const groups = [
          { angle: -Math.PI / 3 + angleOffset, label: substrateDegree === '1' ? 'H' : 'CH3' },
          { angle: Math.PI / 3 - angleOffset, label: 'H' },
          { angle: Math.PI / 2, label: 'R' },
        ];

        groups.forEach((g) => {
          const gx = cx + Math.cos(g.angle) * 55;
          const gy = cy + Math.sin(g.angle) * 55;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(gx, gy);
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 4;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(gx, gy, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#64748b';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '10px sans-serif';
          ctx.fillText(g.label, gx - 6, gy + 4);
        });

        // Partial bonds during transition state
        if (progress > 0.35 && progress < 0.65) {
          ctx.setLineDash([4, 4]);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(nuX + 18, cy);
          ctx.lineTo(cx - 22, cy);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(cx + 22, cy);
          ctx.lineTo(xX - 20, cy);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(' Pentacoordinate Transition State [‡]', cx - 90, cy - 65);
        }
      } else {
        // SN1 Stepwise Mechanism (Step 1: Leaving group leaves -> Planar Carbocation, Step 2: Nu attacks)
        const carbocationFormed = progress > 0.3;
        const nuAttacked = progress > 0.7;

        // Leaving group path
        const xX = carbocationFormed ? cx + 60 + (progress - 0.3) * 200 : cx + 60;

        // Central Carbon
        ctx.beginPath();
        ctx.arc(cx, cy, 22, 0, Math.PI * 2);
        ctx.fillStyle = carbocationFormed ? '#f59e0b' : '#38bdf8';
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.fillText('C⁺', cx - 8, cy + 5);

        if (!carbocationFormed) {
          // Bound X
          ctx.beginPath();
          ctx.arc(xX, cy, 20, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText('X⁻', xX - 8, cy + 5);

          ctx.beginPath();
          ctx.moveTo(cx + 22, cy);
          ctx.lineTo(xX - 20, cy);
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 4;
          ctx.stroke();
        } else {
          // Free X- drifting away
          ctx.beginPath();
          ctx.arc(xX, cy, 20, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText('X⁻', xX - 8, cy + 5);

          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText('Planar sp² Carbocation (Triply-coordinated)', cx - 110, cy - 60);
        }

        // Nucleophile approach (top or bottom for racemisation)
        if (carbocationFormed) {
          const nuY = nuAttacked ? cy : cy - 120 + (progress - 0.3) * 250;
          ctx.beginPath();
          ctx.arc(cx, nuY, 18, 0, Math.PI * 2);
          ctx.fillStyle = '#22c55e';
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText(nucleophile, cx - 12, nuY + 5);
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [mechanism, substrateDegree, nucleophile, solvent]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950 shadow-2xl">
      <canvas ref={canvasRef} width={640} height={320} className="w-full h-auto block" />
    </div>
  );
};

// ==========================================
// SUB-COMPONENT 2: POLARIMETER SIMULATOR SVG
// ==========================================
interface PolarimeterProps {
  concentration: number; // g/mL
  pathLength: number; // dm
  specificRotation: number; // degrees
  enantiomerRatio: number; // % R (0 to 100)
}

const PolarimeterSim: React.FC<PolarimeterProps> = ({ concentration, pathLength, specificRotation, enantiomerRatio }) => {
  // Enantiomeric excess = %R - %S
  const ee = (enantiomerRatio - (100 - enantiomerRatio)) / 100;
  const observedRotation = specificRotation * pathLength * concentration * ee;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-xl text-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gold-400 flex items-center gap-2">
          <span>����</span> Interactive Polarimeter & Optical Activity Studio
        </h3>
        <span className="bg-gold-950 border border-gold-500/40 text-gold-300 text-xs px-3 py-1 rounded-full font-mono">
          Formula: [α] = α / (l × c)
        </span>
      </div>

      <svg viewBox="0 0 700 240" className="w-full h-auto bg-slate-950 rounded-lg border border-slate-800">
        {/* Light Source */}
        <circle cx="50" cy="120" r="25" fill="#f59e0b" className="animate-pulse" />
        <text x="50" y="125" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Sodium D</text>
        <text x="50" y="160" textAnchor="middle" fill="#94a3b8" fontSize="10">Unpolarized</text>

        {/* Polarizer */}
        <rect x="140" y="60" width="12" height="120" rx="3" fill="#38bdf8" />
        <line x1="146" y1="70" x2="146" y2="170" stroke="#ffffff" strokeWidth="3" strokeDasharray="4,4" />
        <text x="146" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">Polarizer</text>

        {/* Polarized Light Wave before cell */}
        <line x1="75" y1="120" x2="140" y2="120" stroke="#f59e0b" strokeWidth="2" />
        <line x1="152" y1="120" x2="230" y2="120" stroke="#38bdf8" strokeWidth="3" />

        {/* Sample Tube */}
        <rect x="230" y="80" width="240" height="80" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="3" />
        {/* Solution fill with gradient depending on concentration */}
        <rect x="235" y="85" width="230" height="70" rx="5" fill="#0284c7" opacity={0.2 + concentration * 1.5} />
        <text x="350" y="115" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">
          Chiral Sample Cell ({pathLength} dm)
        </text>
        <text x="350" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="11">
          Conc = {concentration.toFixed(2)} g/mL | EE = {(ee * 100).toFixed(0)}%
        </text>

        {/* Light emerging rotated */}
        <line x1="470" y1="120" x2="550" y2="120" stroke="#a855f7" strokeWidth="3" />

        {/* Rotated Analyzer Dial */}
        <circle cx="580" cy="120" r="45" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
        <g transform={`rotate(${observedRotation}, 580, 120)`}>
          <line x1="580" y1="80" x2="580" y2="160" stroke="#a855f7" strokeWidth="4" />
          <polygon points="580,75 574,87 586,87" fill="#a855f7" />
        </g>
        <text x="580" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Analyzer</text>
      </svg>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-800/60 p-4 rounded-lg border border-slate-700">
        <div>
          <span className="text-xs text-slate-400 block">Observed Rotation (α)</span>
          <span className="text-xl font-bold text-amber-400 font-mono">
            {observedRotation > 0 ? `+${observedRotation.toFixed(2)}°` : `${observedRotation.toFixed(2)}°`}
          </span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Specific Rotation [α]</span>
          <span className="text-xl font-bold text-gold-400 font-mono">{specificRotation > 0 ? `+${specificRotation}°` : `${specificRotation}°`}</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Optical Purity / EE</span>
          <span className="text-xl font-bold text-purple-400 font-mono">{Math.abs(ee * 100).toFixed(1)}%</span>
        </div>
        <div>
          <span className="text-xs text-slate-400 block">Chiral State</span>
          <span className="text-sm font-semibold text-emerald-400">
            {Math.abs(observedRotation) < 0.01 ? 'Optically Inactive (Racemic/Meso)' : observedRotation > 0 ? 'Dextrorotatory (+)' : 'Levorotatory (-)'}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT 3: HALOARENE RESONANCE SVG
// ==========================================
const HaloareneResonanceSVG: React.FC<{ activeResonance: number }> = ({ activeResonance }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-xl">
      <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
        <span>⚛️</span> Chlorobenzene Resonance Structures & C-Cl Partial Double Bond
      </h3>
      <p className="text-xs text-slate-300 mb-4">
        The unshared pair of electrons on chlorine is conjugated with pi-electrons of the benzene ring (+R effect). This creates partial double bond character in C-Cl (169 pm length) making cleavage exceptionally difficult!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border transition-all ${
              activeResonance === idx
                ? 'bg-amber-950/40 border-amber-500 scale-105 shadow-lg shadow-amber-500/10'
                : 'bg-slate-950 border-slate-800 opacity-70 hover:opacity-100'
            }`}
          >
            <div className="text-center font-bold text-xs text-amber-300 mb-2">Structure III-{idx}</div>
            <svg viewBox="0 0 100 120" className="w-full h-auto">
              {/* Benzene Ring */}
              <polygon points="50,30 80,47 80,82 50,100 20,82 20,47" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              {/* C-Cl Bond */}
              <line
                x1="50"
                y1="30"
                x2="50"
                y2="10"
                stroke="#ef4444"
                strokeWidth={idx >= 2 && idx <= 4 ? '4' : '2'}
                strokeDasharray={idx >= 2 && idx <= 4 ? '2,2' : undefined}
              />
              <circle cx="50" cy="8" r="7" fill="#ef4444" />
              <text x="50" y="11" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Cl</text>

              {/* Charge indicators depending on resonance structure */}
              {idx === 1 && (
                <>
                  <line x1="30" y1="50" x2="30" y2="78" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="70" y1="50" x2="70" y2="78" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="42" y1="92" x2="58" y2="92" stroke="#f59e0b" strokeWidth="2" />
                </>
              )}
              {idx === 2 && (
                <>
                  <text x="58" y="10" fill="#22c55e" fontSize="10" fontWeight="bold">+</text>
                  <circle cx="78" cy="45" r="4" fill="#ef4444" />
                  <text x="78" y="47" textAnchor="middle" fill="#fff" fontSize="7">-</text>
                  <text x="50" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">Ortho (-) Charge</text>
                </>
              )}
              {idx === 3 && (
                <>
                  <text x="58" y="10" fill="#22c55e" fontSize="10" fontWeight="bold">+</text>
                  <circle cx="50" cy="98" r="4" fill="#ef4444" />
                  <text x="50" y="100" textAnchor="middle" fill="#fff" fontSize="7">-</text>
                  <text x="50" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">Para (-) Charge</text>
                </>
              )}
              {idx === 4 && (
                <>
                  <text x="58" y="10" fill="#22c55e" fontSize="10" fontWeight="bold">+</text>
                  <circle cx="22" cy="45" r="4" fill="#ef4444" />
                  <text x="22" y="47" textAnchor="middle" fill="#fff" fontSize="7">-</text>
                  <text x="50" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">Ortho (-) Charge</text>
                </>
              )}
              {idx === 5 && (
                <text x="50" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">Kekulé Form</text>
              )}
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT 4: REACTION ENERGY DIAGRAM SVG
// ==========================================
const ReactionEnergyDiagramSVG: React.FC<{ mechanism: 'SN1' | 'SN2' }> = ({ mechanism }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-bold text-gold-300">Potential Energy Profile ({mechanism})</h4>
        <span className="text-xs text-slate-400 font-mono">
          {mechanism === 'SN1' ? 'Two-step (Carbocation Intermediate)' : 'One-step Concerted (TS‡)'}
        </span>
      </div>
      <svg viewBox="0 0 500 200" className="w-full h-auto bg-slate-950 rounded border border-slate-800">
        {/* Axes */}
        <line x1="40" y1="170" x2="470" y2="170" stroke="#64748b" strokeWidth="2" />
        <line x1="40" y1="170" x2="40" y2="20" stroke="#64748b" strokeWidth="2" />
        <text x="250" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">Reaction Coordinate</text>
        <text x="20" y="95" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(-90 20 95)">Potential Energy</text>

        {mechanism === 'SN2' ? (
          <>
            {/* SN2 Curve */}
            <path d="M 50 140 Q 250 10 450 150" fill="none" stroke="#38bdf8" strokeWidth="3" />
            <circle cx="250" cy="30" r="5" fill="#f59e0b" />
            <text x="250" y="20" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">TS‡ [Nu---C---X]</text>
            <text x="60" y="130" fill="#22c55e" fontSize="10">Reactants (R-X + Nu⁻)</text>
            <text x="400" y="140" fill="#22c55e" fontSize="10">Products (R-Nu + X⁻)</text>
            <line x1="50" y1="140" x2="250" y2="140" stroke="#475569" strokeDasharray="3,3" />
            <line x1="250" y1="30" x2="250" y2="140" stroke="#f59e0b" strokeDasharray="3,3" />
            <text x="260" y="90" fill="#f59e0b" fontSize="10">Ea (SN2)</text>
          </>
        ) : (
          <>
            {/* SN1 Curve (Double Hump) */}
            <path d="M 50 140 Q 150 10 230 90 Q 330 30 450 150" fill="none" stroke="#a855f7" strokeWidth="3" />
            <circle cx="150" cy="40" r="4" fill="#ef4444" />
            <circle cx="230" cy="90" r="4" fill="#38bdf8" />
            <circle cx="330" cy="55" r="4" fill="#ef4444" />
            <text x="150" y="28" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">TS1‡</text>
            <text x="230" y="108" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">R⁺ (Carbocation)</text>
            <text x="330" y="43" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">TS2‡</text>
            <text x="60" y="130" fill="#22c55e" fontSize="9">R-X</text>
            <text x="410" y="140" fill="#22c55e" fontSize="9">R-Nu</text>
          </>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// SUB-COMPONENT 5: AMBIDENT NUCLEOPHILE SVG
// ==========================================
const AmbidentNucleophileSVG: React.FC<{ mode: 'KCN' | 'AgCN' | 'KNO2' | 'AgNO2' }> = ({ mode }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl text-slate-100">
      <h4 className="text-sm font-bold text-emerald-400 mb-2">Ambident Nucleophile Attack Pathway: {mode}</h4>
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs">
        {mode === 'KCN' && (
          <div>
            <span className="text-amber-400">Ionic Salt:</span> K⁺ [ :C ≡ N: ]⁻<br />
            <span className="text-slate-300">Attack via Carbon atom (C-C bond is more stable than C-N bond)</span><br />
            <span className="text-emerald-400 font-bold text-sm mt-2 block">R-X + KCN → R-CN (Alkyl Cyanide / Nitrile) + KX</span>
          </div>
        )}
        {mode === 'AgCN' && (
          <div>
            <span className="text-gold-400">Covalent Compound:</span> Ag - C ≡ N:<br />
            <span className="text-slate-300">Carbon is covalently bonded to Ag. Nitrogen attacks with lone pair!</span><br />
            <span className="text-emerald-400 font-bold text-sm mt-2 block">R-X + AgCN → R-NC (Alkyl Isocyanide / Isonitrile) + AgX</span>
          </div>
        )}
        {mode === 'KNO2' && (
          <div>
            <span className="text-amber-400">Ionic Salt:</span> K⁺ [ O - N = O ]⁻<br />
            <span className="text-slate-300">Negative charge is on Oxygen. Attack via Oxygen atom!</span><br />
            <span className="text-emerald-400 font-bold text-sm mt-2 block">R-X + KNO2 → R-O-N=O (Alkyl Nitrite) + KX</span>
          </div>
        )}
        {mode === 'AgNO2' && (
          <div>
            <span className="text-gold-400">Covalent Salt:</span> Ag - O - N = O<br />
            <span className="text-slate-300">Nitrogen lone pair attacks carbon directly!</span><br />
            <span className="text-emerald-400 font-bold text-sm mt-2 block">R-X + AgNO2 → R-NO2 (Nitroalkane) + AgX</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
export default function C12_ChemistryHaloalkanesandHaloarenesCBSESim({
  onComplete = () => {},
  initialNodeId = 'c12_chem_cbse_311',
}: Props) {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'scenario' | 'lab' | 'polarimeter' | 'haloarene' | 'challenges' | 'summary'>('scenario');

  // Interactive Lab Parameters State
  const [mechanism, setMechanism] = useState<'SN1' | 'SN2'>('SN2');
  const [substrateDegree, setSubstrateDegree] = useState<'1' | '2' | '3'>('1');
  const [nucleophile, setNucleophile] = useState<'OH-' | 'CN-' | 'I-' | 'H2O'>('OH-');
  const [solvent, setSolvent] = useState<'protic' | 'aprotic'>('aprotic');

  // Polarimeter State
  const [concentration, setConcentration] = useState<number>(0.15); // g/mL
  const [pathLength, setPathLength] = useState<number>(2.0); // dm
  const [specificRotation, setSpecificRotation] = useState<number>(66.5); // deg (e.g. Sucrose or chiral halide)
  const [enantiomerRatio, setEnantiomerRatio] = useState<number>(80); // 80% R, 20% S

  // Haloarene State
  const [activeResonance, setActiveResonance] = useState<number>(1);
  const [ewgPositions, setEwgPositions] = useState<{ ortho: boolean; meta: boolean; para: boolean }>({
    ortho: false,
    meta: false,
    para: false,
  });

  // Ambident state
  const [ambidentMode, setAmbidentMode] = useState<'KCN' | 'AgCN' | 'KNO2' | 'AgNO2'>('KCN');

  // Discovery state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction & Observation States
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});

  // Challenge / Gamification State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, number>>({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Hints & UI Engine Effects
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Inactivity auto-hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      setCurrentHint('Need assistance? Check the structural polarity and reaction conditions!');
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Current Challenge
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Handle Discovery submit
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent insight! Resonance delocalisation restricts haloarene reactivity unless nitro groups withdraw charge.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider partial double bond character and resonance effects.');
    }
  };

  // Handle Challenge Answer
  const handleAnswerSubmit = (optionIndex: number) => {
    if (isAnswerSubmitted) return;

    setSelectedOption(optionIndex);
    setIsAnswerSubmitted(true);
    const isCorrect = optionIndex === currentChallenge.correctIndex;

    // BKT & SRS update
    const nodeId = currentChallenge.nodeId;
    const updatedBKT = bktUpdate(bktStates[nodeId] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id), isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Correct! Mechanism understood.');
      setScore((prev) => prev + 10);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the transition state geometry and bond enthalpy.');
    }

    setChallengeAnswers((prev) => ({ ...prev, [currentChallenge.id]: optionIndex }));
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered Organic Haloalkanes and Haloarenes!');
      setShowSuccess(true);
      recordGameScore('c12_chem_cbse_311', score);
      onComplete(score);
    }
  };

  // Calculate required temperature for Haloarene NaOH hydrolysis based on EWG
  const requiredTemp = useMemo(() => {
    let base = 623; // K for pure chlorobenzene
    if (ewgPositions.para) base -= 180; // 443 K
    if (ewgPositions.ortho) base -= 75; // 368 K if 2 nitro groups
    if (ewgPositions.ortho && ewgPositions.meta) base -= 35;
    if (ewgPositions.ortho && ewgPositions.para) base = 333; // 2,4,6-trinitro -> 333 K
    return Math.max(333, base);
  }, [ewgPositions]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none">
      {/* Feedback Overlay Components */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Unit Mastered: Haloalkanes & Haloarenes Specialist!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER SECTION */}
      <header className="mb-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-gold-500/10 text-gold-400 border border-gold-500/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              CISCE Class 12 Chemistry
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold font-mono">
              Score: {score} pts
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 bg-gradient-to-r from-gold-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
            Haloalkanes & Haloarenes Interactive Lab
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Kinetics, Stereochemistry (SN1/SN2), Ambident Selectivity & Polyhalogen Photochemistry
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'scenario', label: '1. Discovery', icon: '🧪' },
            { id: 'lab', label: '2. SN1 vs SN2 Lab', icon: '⚛️' },
            { id: 'polarimeter', label: '3. Polarimeter', icon: '🔬' },
            { id: 'haloarene', label: '4. Haloarenes', icon: '🛑' },
            { id: 'challenges', label: '5. Mastery Quiz', icon: '🎯' },
            { id: 'summary', label: '6. Synthesis', icon: '🏆' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/20 scale-105'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* MAIN TAB CONTENT DISPLAY */}
      <main className="max-w-7xl mx-auto space-y-6">

        {/* TAB 1: SCENARIO & PRE-CONCEPT DISCOVERY */}
        {activeTab === 'scenario' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 mb-4 text-sm leading-relaxed">{SCENARIO.intro}</p>
              <div className="bg-slate-950 border-l-4 border-gold-500 p-4 rounded-r-lg text-slate-400 text-xs leading-relaxed">
                {SCENARIO.context}
              </div>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Pre-Conception Discovery Challenge
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-left text-xs md:text-sm transition-all border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold'
                          : discoverySelected === idx
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 opacity-50'
                        : 'bg-slate-950 border-slate-800 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-gold-950/40 border border-gold-500/40 p-4 rounded-xl text-gold-200 text-xs leading-relaxed animate-fadeIn">
                  <span className="font-bold text-gold-300">Lab Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Render Prediction Questions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Mandatory Lab Predictions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-slate-200 text-sm mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            setPredAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                          }}
                          className={`p-3 rounded-lg text-xs text-left border ${
                            predAnswers[pIdx] === oIdx
                              ? oIdx === pred.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predAnswers[pIdx] !== undefined && (
                      <p className="text-xs text-amber-300 bg-amber-950/30 p-2 rounded border border-amber-500/20">
                        🔍 <strong>Verification Instruction:</strong> {pred.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SN1 vs SN2 KINETICS LAB */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls Panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-gold-400 flex items-center gap-2">
                  <span>⚙️</span> Reaction Variable Controls
                </h3>

                {/* Substrate Degree Slider */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    Substrate Substitution Degree: <span className="text-gold-400 font-bold">{substrateDegree}° Haloalkane</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['1', '2', '3'] as const).map((deg) => (
                      <button
                        key={deg}
                        onClick={() => {
                          audioManager.play('tap');
                          setSubstrateDegree(deg);
                          if (deg === '3') setMechanism('SN1');
                          if (deg === '1') setMechanism('SN2');
                        }}
                        className={`py-2 rounded-lg text-xs font-bold border ${
                          substrateDegree === deg
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {deg}° ({deg === '1' ? 'Methyl/Primary' : deg === '2' ? 'Secondary' : 'Tertiary'})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nucleophile Selection */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    Nucleophile Species (Nu⁻)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['OH-', 'CN-', 'I-', 'H2O'] as const).map((nu) => (
                      <button
                        key={nu}
                        onClick={() => {
                          audioManager.play('tap');
                          setNucleophile(nu);
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border ${
                          nucleophile === nu
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {nu} {nu === 'H2O' ? '(Weak/Neutral)' : '(Strong Anionic)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Solvent Selection */}
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    Solvent Medium Dielectric
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['aprotic', 'protic'] as const).map((sol) => (
                      <button
                        key={sol}
                        onClick={() => {
                          audioManager.play('tap');
                          setSolvent(sol);
                        }}
                        className={`py-2 px-3 rounded-lg text-xs font-bold border ${
                          solvent === sol
                            ? 'bg-purple-600 border-purple-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sol === 'aprotic' ? 'Polar Aprotic (Acetone/DMSO)' : 'Polar Protic (H2O/EtOH)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mechanism Force Switch */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-bold">Predicted Primary Pathway:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMechanism('SN1')}
                      className={`flex-1 py-2 rounded text-xs font-bold border ${
                        mechanism === 'SN1' ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      SN1 (Unimolecular)
                    </button>
                    <button
                      onClick={() => setMechanism('SN2')}
                      className={`flex-1 py-2 rounded text-xs font-bold border ${
                        mechanism === 'SN2' ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      SN2 (Bimolecular)
                    </button>
                  </div>
                </div>
              </div>

              {/* Canvas Visualizer & Reaction Energy Profile */}
              <div className="lg:col-span-2 space-y-4">
                <SN1vsSN2Canvas
                  mechanism={mechanism}
                  substrateDegree={substrateDegree}
                  nucleophile={nucleophile}
                  solvent={solvent}
                />
                <ReactionEnergyDiagramSVG mechanism={mechanism} />
              </div>
            </div>

            {/* Exploration Steps Render */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4">🧪 Mandatory Exploration Modules</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {EXPLORATION_STEPS.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-gold-400 font-bold block mb-1">{step.title}</span>
                      <p className="text-[11px] text-slate-300 leading-tight">{step.instruction}</p>
                    </div>
                    <span className="mt-3 text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                      Node: {step.nodeId}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Render Observation Questions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Mandatory Reaction Observations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-bold text-slate-200 text-xs mb-3">{obs.question}</p>
                    <div className="space-y-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            setObsAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          }}
                          className={`w-full text-left p-2.5 rounded text-xs border ${
                            obsAnswers[oIdx] === optIdx
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: POLARIMETER & STEREOCHEMISTRY STUDIO */}
        {activeTab === 'polarimeter' && (
          <div className="space-y-6 animate-fadeIn">
            <PolarimeterSim
              concentration={concentration}
              pathLength={pathLength}
              specificRotation={specificRotation}
              enantiomerRatio={enantiomerRatio}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Polarimeter Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                <h4 className="text-sm font-bold text-gold-400">Polarimeter Controls</h4>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Concentration (c): <span className="text-gold-400 font-mono font-bold">{concentration.toFixed(2)} g/mL</span>
                  </label>
                  <input
                    type="range"
                    min="0.05"
                    max="0.50"
                    step="0.01"
                    value={concentration}
                    onChange={(e) => setConcentration(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Path Length (l): <span className="text-gold-400 font-mono font-bold">{pathLength.toFixed(1)} dm</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.5"
                    value={pathLength}
                    onChange={(e) => setPathLength(parseFloat(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 block mb-1">
                    Enantiomeric Ratio (% R vs % S): <span className="text-purple-400 font-mono font-bold">{enantiomerRatio}% R / {100 - enantiomerRatio}% S</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={enantiomerRatio}
                    onChange={(e) => setEnantiomerRatio(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>

              {/* Stereochemistry Concepts Info */}
              <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                <h4 className="text-sm font-bold text-amber-400">Key Stereochemical Principles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-gold-400 block mb-1">Walden Inversion (SN2)</span>
                    Backside attack of nucleophile forces spatial rearrangement of remaining bonds, inverting absolute configuration (e.g. R → S or S → R).
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-amber-400 block mb-1">Racemisation (SN1)</span>
                    Planar carbocation intermediate allows nucleophile attack from either top or bottom face with equal probability, yielding 50:50 (±) mixture.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-purple-400 block mb-1">Meso Compounds</span>
                    Molecules with 2+ chiral centers that possess an internal plane of symmetry. They are achiral and show zero net optical rotation.
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="font-bold text-emerald-400 block mb-1">Enantiomers vs Diastereomers</span>
                    Enantiomers are non-superimposable mirror images with identical physical properties except sign of rotation. Diastereomers are non-mirror image stereoisomers.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: HALOARENES & AMBIDENT NUCLEOPHILES */}
        {activeTab === 'haloarene' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Resonance Interactive Selector */}
            <HaloareneResonanceSVG activeResonance={activeResonance} />
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveResonance(num);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border ${
                    activeResonance === num
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-black'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Resonance Form {num}
                </button>
              ))}
            </div>

            {/* EWG Effect Simulator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-md font-bold text-gold-400 mb-2">
                  Electron-Withdrawing Group (-NO2) Substitution Effects
                </h3>
                <p className="text-xs text-slate-300 mb-4">
                  Toggle nitro group (-NO2) additions to chlorobenzene to observe how electron withdrawal lowers the required temperature threshold for NaOH hydrolysis:
                </p>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ewgPositions.para}
                      onChange={(e) => setEwgPositions((prev) => ({ ...prev, para: e.target.checked }))}
                      className="w-4 h-4 accent-gold-500"
                    />
                    <span className="text-xs font-bold text-slate-200">Para-Nitro (-NO2 at Position 4)</span>
                  </label>
                  <label className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ewgPositions.ortho}
                      onChange={(e) => setEwgPositions((prev) => ({ ...prev, ortho: e.target.checked }))}
                      className="w-4 h-4 accent-gold-500"
                    />
                    <span className="text-xs font-bold text-slate-200">Ortho-Nitro (-NO2 at Position 2)</span>
                  </label>
                  <label className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ewgPositions.meta}
                      onChange={(e) => setEwgPositions((prev) => ({ ...prev, meta: e.target.checked }))}
                      className="w-4 h-4 accent-gold-500"
                    />
                    <span className="text-xs font-bold text-slate-200">Meta-Nitro (-NO2 at Position 3) [No Resonance Effect]</span>
                  </label>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-bold block mb-1">Required Temperature for Hydrolysis:</span>
                  <div className="text-3xl font-extrabold text-amber-400 font-mono mb-2">{requiredTemp} K</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {requiredTemp === 623 && 'Chlorobenzene requires extreme Dow process conditions (623 K, 300 atm pressure).'}
                    {requiredTemp === 443 && '4-Nitrochlorobenzene hydrolyses at 443 K with aqueous NaOH.'}
                    {requiredTemp === 368 && '2,4-Dinitrochlorobenzene hydrolyses at 368 K with aqueous Na2CO3.'}
                    {requiredTemp === 333 && '2,4,6-Trinitrochlorobenzene hydrolyses with warm water alone at 333 K!'}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-gold-300">
                  💡 Resonance delocalisation of negative charge onto oxygen atoms occurs only when -NO2 is at Ortho/Para positions!
                </div>
              </div>
            </div>

            {/* Ambident Nucleophile Selector */}
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['KCN', 'AgCN', 'KNO2', 'AgNO2'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      audioManager.play('tap');
                      setAmbidentMode(mode);
                    }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                      ambidentMode === mode
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
              <AmbidentNucleophileSVG mode={ambidentMode} />
            </div>
          </div>
        )}

        {/* TAB 5: DIAGNOSTIC & MASTERY CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mt-1">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs px-2.5 py-0.5 rounded-full font-mono">
                    {currentChallenge.difficulty.toUpperCase()}
                  </span>
                  <span>{currentChallenge.competencyLevel}</span>
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gold-300 font-mono">
                  Mastery: {getMasteryLevel(bktStates[currentChallenge.nodeId] || createBKTState()).toUpperCase()}
                </span>
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setShowHint(true);
                    setCurrentHint(currentChallenge.hints[0]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/20"
                >
                  💡 Request Hint
                </button>
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <p className="text-base md:text-lg text-slate-100 font-semibold mb-6 leading-relaxed">
                {currentChallenge.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSubmit(idx)}
                    disabled={isAnswerSubmitted}
                    className={`p-4 rounded-xl text-left text-xs md:text-sm font-medium transition-all border ${
                      isAnswerSubmitted
                        ? idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                          : selectedOption === idx
                          ? 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 opacity-40'
                        : 'bg-slate-950 border-slate-800 hover:border-gold-500 text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded text-xs mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div className="space-y-4 animate-fadeIn">
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      selectedOption === currentChallenge.correctIndex
                        ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <span className="font-bold text-sm block mb-1">
                      {selectedOption === currentChallenge.correctIndex ? '✅ Correct Explanation:' : '❌ Concept Analysis:'}
                    </span>
                    {currentChallenge.explanation}
                  </div>

                  {/* Misconception correction popup if wrong */}
                  {selectedOption !== currentChallenge.correctIndex && MISCONCEPTIONS[currentChallenge.misconceptionIndex] && (
                    <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-xl text-xs text-amber-200">
                      <strong className="text-amber-300">Target Misconception Warning:</strong>{' '}
                      {MISCONCEPTIONS[currentChallenge.misconceptionIndex].misconception}
                      <br />
                      <strong className="text-emerald-300 mt-1 block">Correction:</strong>{' '}
                      {MISCONCEPTIONS[currentChallenge.misconceptionIndex].correction}
                    </div>
                  )}

                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold text-sm shadow-lg shadow-gold-500/20 hover:scale-[1.01] transition-all"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Proceed to Next Challenge →' : 'Complete Assessment & View Summary'}
                  </button>
                </div>
              )}
            </div>

            {/* Misconceptions Gallery */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Common ISC Chemistry Misconceptions & Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 block mb-1">{m.title}</span>
                    <p className="text-xs text-rose-300 mb-2">❌ <strong>Misconception:</strong> {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✅ <strong>Correction:</strong> {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: SUMMARY & REAL WORLD APPLICATION */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Real World Industrial Activity Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <span>🌱</span> {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-mono font-bold text-emerald-400 block mb-1">
                      Execution Step {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Polyhalogen Environmental Impact Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-gold-400">Polyhalogen Compounds Summary & Environmental Impact</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">Dichloromethane (CH2Cl2)</span>
                  Solvent in paint removers, aerosol propellant. CNS toxicity upon exposure.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-gold-400 block mb-1">Chloroform (CHCl3)</span>
                  Anesthetic historically; oxidises to Phosgene (COCl2). Preserved with 1% ethanol.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-purple-400 block mb-1">Iodoform (CHI3)</span>
                  Yellow crystalline antiseptic; liberates free iodine. Used in Iodoform Test.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-emerald-400 block mb-1">Carbon Tetrachloride (CCl4)</span>
                  Fire extinguisher (Pyrene); causes liver cancer & stratospheric ozone depletion.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-rose-400 block mb-1">Freons (CFC-12 CF2Cl2)</span>
                  Refrigerants. Radical Cl• initiates chain destruction of O3 layer.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-gold-400 block mb-1">DDT (p,p'-Dichlorodiphenyltrichloroethane)</span>
                  Non-biodegradable insecticide. Accumulates in fatty tissues (Bioaccumulation).
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}