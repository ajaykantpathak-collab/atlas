'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs covered by this simulation
const NODE_003 = 'c11_chem_cbse_003'; // Tetravalency of Carbon & Hybridisation (sp3, sp2, sp)
const NODE_004 = 'c11_chem_cbse_004'; // Shapes of Organic Molecules & Bond Angles
const NODE_005 = 'c11_chem_cbse_005'; // Structural Representations (Complete, Condensed, Bond-line)
const NODE_007 = 'c11_chem_cbse_007'; // Classification of Organic Compounds
const NODE_008 = 'c11_chem_cbse_008'; // Functional Groups & Homologous Series
const NODE_009 = 'c11_chem_cbse_009'; // IUPAC Nomenclature - Alkanes, Alkenes, Alkynes
const NODE_010 = 'c11_chem_cbse_010'; // IUPAC Nomenclature - Functional Groups
const NODE_011 = 'c11_chem_cbse_011'; // IUPAC Nomenclature - Polyfunctional Compounds & Priority Order
const NODE_012 = 'c11_chem_cbse_012'; // Structural Isomerism - Chain, Position, Functional
const NODE_013 = 'c11_chem_cbse_013'; // Structural Isomerism - Metamerism, Tautomerism, Ring-chain
const NODE_021 = 'c11_chem_cbse_021'; // Stereoisomerism - Geometrical (Cis/Trans, E/Z) & Conformational
const NODE_023 = 'c11_chem_cbse_023'; // Bond Cleavage (Homolytic, Heterolytic)
const NODE_024 = 'c11_chem_cbse_024'; // Nucleophiles & Electrophiles
const NODE_025 = 'c11_chem_cbse_025'; // Inductive Effect (+I, -I)
const NODE_026 = 'c11_chem_cbse_026'; // Electromeric Effect (+E, -E)
const NODE_027 = 'c11_chem_cbse_027'; // Resonance / Mesomeric Effect (+R/-R, +M/-M)
const NODE_028 = 'c11_chem_cbse_028'; // Hyperconjugation (Baker-Nathan Effect)
const NODE_029 = 'c11_chem_cbse_029'; // Stability of Reaction Intermediates (Carbocations, Carbanions, Free Radicals)
const NODE_030 = 'c11_chem_cbse_030'; // Types of Organic Reactions (Substitution, Addition, Elimination, Rearrangement)

const ALL_NODE_IDS: string[] = [
  NODE_003, NODE_004, NODE_005, NODE_007, NODE_008, NODE_009, NODE_010, NODE_011,
  NODE_012, NODE_013, NODE_021, NODE_023, NODE_024, NODE_025, NODE_026, NODE_027,
  NODE_028, NODE_029, NODE_030
];

interface PropType {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

const DEFAULT_PROPS: PropType = {};

// Section 1: SCENARIO
const SCENARIO = {
  title: 'ISC Organic Chemistry Fundamental Principles & Reaction Dynamics Laboratory',
  intro: 'Welcome to the Advanced CISCE Organic Research Suite. As a senior organic chemist, you will investigate molecular architecture, chemical bonding, electronic displacement effects, and reaction mechanisms.',
  context: 'Manipulate carbon hybridisation states, construct IUPAC structures, analyze electron shifts (+I, -I, Resonance, Hyperconjugation), and evaluate intermediate stabilities to master fundamental organic principles.'
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'Why is a tertiary carbocation (3°) significantly more stable than a primary carbocation (1°), even though both carry a single positive charge on carbon?',
  options: [
    'Because tertiary carbon has more electrons overall, neutralizing the charge completely.',
    'Because 3° carbocations have 9 hyperconjugative alpha-hydrogens providing electron delocalization and +I alkyl pushing.',
    'Because tertiary carbocations automatically form pi-bonds to share charge with adjacent carbon atoms.',
    'Because steric hindrance prevents water molecules from attacking tertiary carbocations.'
  ],
  correctIndex: 1,
  hintAfter: 'Hyperconjugation (no-bond resonance) with adjacent C-H sigma bonds delocalizes the vacant p-orbital charge across multiple bonds!'
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Hybridisation & Geometry Visualizer',
    instruction: 'Select carbon hybridisation state (sp3, sp2, sp) to observe s-character, orbital geometries, bond angles, and sigma/pi bond counts.',
    interactionType: 'hybridisation-builder',
    nodeId: NODE_003
  },
  {
    title: 'Lab 2: IUPAC Nomenclature & Structural Converter',
    instruction: 'Build carbon chains, attach functional groups, and observe live IUPAC naming with condensed and bond-line representations.',
    interactionType: 'iupac-builder',
    nodeId: NODE_009
  },
  {
    title: 'Lab 3: Isomerism & Stereochemistry Laboratory',
    instruction: 'Construct chain, position, functional, metameric, and geometrical (cis/trans) isomers and evaluate their physical property differences.',
    interactionType: 'isomer-workbench',
    nodeId: NODE_012
  },
  {
    title: 'Lab 4: Electronic Effects & Intermediate Stability Meter',
    instruction: 'Toggle inductive (+I/-I), resonance (+R/-R), and hyperconjugation to analyze charge distribution and intermediate stability.',
    interactionType: 'electronic-effects-meter',
    nodeId: NODE_027
  },
  {
    title: 'Lab 5: Reaction Mechanism & Bond Fission Simulator',
    instruction: 'Simulate homolytic vs heterolytic cleavage, track electrophilic and nucleophilic attacks, and classify organic reaction pathways.',
    interactionType: 'mechanism-simulator',
    nodeId: NODE_023
  }
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: Which of the following compounds will exhibit geometrical isomerism?',
    options: ['Propene', '1-Butene', '2-Butene', '2-Methylpropene'],
    correctIndex: 2,
    verifyInstruction: '2-Butene has two different groups attached to each double-bonded carbon (CH3 and H), allowing cis and trans forms.',
    nodeId: NODE_021
  },
  {
    question: 'Predict: When 2-bromobutane undergoes heterolytic cleavage of the C-Br bond, what intermediate stability order governs the carbocation?',
    options: [
      'Primary carbocation forms faster than secondary',
      'Secondary carbocation (2°) is formed, which is more stable than 1° due to 5 alpha-hydrogens',
      'Carbanion is formed because bromine is less electronegative than carbon',
      'Free radical forms via equal electron sharing'
    ],
    correctIndex: 1,
    verifyInstruction: 'Heterolytic cleavage leaves electrons with Br-, forming a 2° carbocation stabilized by 5 alpha-hydrogens and +I effect.',
    nodeId: NODE_029
  }
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the bond angle as carbon hybridisation changes from sp3 to sp2 to sp?',
    observableOptions: [
      'Bond angle decreases from 180° to 109.5°',
      'Bond angle increases from 109.5° (tetrahedral) to 120° (trigonal planar) to 180° (linear)',
      'Bond angle remains constant at 90° for all hybrid states',
      'Bond angle increases only when double bonds are broken'
    ],
    correctIndex: 1,
    nodeId: NODE_004
  },
  {
    question: 'What happens to carbocation stability as the number of hyperconjugative alpha-hydrogens increases?',
    observableOptions: [
      'Stability decreases because alpha-hydrogens attract positive charge',
      'Stability increases direct-proportionally with the number of C-H sigma bonds adjacent to the vacant p-orbital',
      'Stability is independent of alpha-hydrogens and depends only on electronegativity',
      'Carbocation instantly rearranges into an alkene without stabilization'
    ],
    correctIndex: 1,
    nodeId: NODE_028
  }
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Pharmaceutical Synthesis & Drug Isomer Separation Analysis',
  description: 'In pharmaceutical development, distinguishing functional group priorities and geometrical stereoisomers is crucial. For example, Thalidomide and Ibuprofen rely heavily on isomer purity, while PET scan tracers utilize carbon-11 labeling via nucleophilic substitution.',
  steps: [
    'Step 1: Determine the IUPAC priority order of functional groups in candidate drug molecule: -COOH > -CHO > -OH > -NH2 > alkenes.',
    'Step 2: Identify alpha-hydrogens (9 for tert-butyl carbocation intermediate) during acid-catalyzed esterification.',
    'Step 3: Calculate percentage s-character of sp2 hybridization in benzene ring target (33.3% s-character) for aromatic electrophilic substitution.',
    'Step 4: Verify stereo-purity (cis vs trans) via polarimetry to prevent toxic side effects in therapeutic compounds.'
  ]
};

// Misconceptions list
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Hybridisation and Bond Length',
    misconception: 'Students often think sp3 hybridised bonds are shorter and stronger than sp bonds because sp3 has 4 orbitals.',
    correction: 'sp hybridised bonds have 50% s-character, holding bonding electrons closer to the nucleus. Hence sp C-H bonds are shorter and stronger than sp3 (25% s-character).'
  },
  {
    id: 'misc_2',
    title: 'Inductive Effect Distance',
    misconception: 'Inductive effect operates equally across long carbon chains of any length.',
    correction: 'Inductive effect (-I or +I) diminishes rapidly with distance and becomes negligible beyond 3 carbon atoms.'
  },
  {
    id: 'misc_3',
    title: 'Resonance vs Equilibrium',
    misconception: 'Resonance structures are actual rapidly interconverting chemical species in equilibrium.',
    correction: 'Resonance canonical structures are hypothetical Lewis formulations. The real molecule is a single resonance hybrid with delocalized electrons.'
  },
  {
    id: 'misc_4',
    title: 'Hyperconjugation Requirements',
    misconception: 'Hyperconjugation occurs in any compound containing a positive charge or double bond regardless of adjacent hydrogens.',
    correction: 'Hyperconjugation specifically requires alpha-hydrogens attached to an sp3 carbon directly adjacent to an unsaturated system or vacant p-orbital.'
  },
  {
    id: 'misc_5',
    title: 'Electrophiles and Charges',
    misconception: 'All electrophiles must carry a positive charge and all nucleophiles must carry a negative charge.',
    correction: 'Neutral species like BF3 and AlCl3 are strong electrophiles (electron deficient), while NH3 and H2O are neutral nucleophiles (lone pair donors).'
  },
  {
    id: 'misc_6',
    title: 'Heterolytic Cleavage Products',
    misconception: 'Heterolytic fission creates free radicals with single unpaired electrons.',
    correction: 'Heterolytic fission creates ions (carbocations and carbanions) by transferring both bonding electrons to the more electronegative atom.'
  }
];

// Diagnostic questions
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'What is the hybridisation of each carbon atom in Propadiene ($CH_2=C=CH_2$)?',
    options: [
      'Terminal carbons are sp3, central carbon is sp',
      'Terminal carbons are sp2, central carbon is sp',
      'All three carbons are sp2 hybridised',
      'Terminal carbons are sp, central carbon is sp2'
    ],
    correctIndex: 1,
    explanation: 'Terminal carbons form 3 sigma bonds (sp2), while the central carbon forms 2 sigma bonds and 2 pi bonds (sp).'
  },
  {
    id: 'diag_2',
    question: 'Which effect explains why trichloroacetic acid ($CCl_3COOH$) is a stronger acid than acetic acid ($CH_3COOH$)?',
    options: [
      '+I effect of methyl group',
      '-I effect of three electronegative chlorine atoms stabilizing the conjugate base',
      'Hyperconjugation of C-Cl bonds',
      '+R mesomeric effect of chlorine'
    ],
    correctIndex: 1,
    explanation: '-I effect of 3 chlorine atoms pulls electron density away, stabilizing the carboxylate anion ($CCl_3COO^-$).'
  },
  {
    id: 'diag_3',
    question: 'How many alpha-hydrogens are present in the 2-methylbut-2-yl carbocation ($(CH_3)_2C^+-CH_2CH_3$)?',
    options: ['3', '6', '8', '11'],
    correctIndex: 2,
    explanation: 'The carbocation carbon is attached to two methyl groups (3+3=6 H) and one ethyl group (2 alpha-H). Total alpha-H = 6 + 2 = 8.'
  },
  {
    id: 'diag_4',
    question: 'According to IUPAC nomenclature, what is the principal functional group priority in $HO-CH_2-CH_2-CO-CH_3$?',
    options: ['Alcohol (-OH)', 'Ketone (>C=O)', 'Ether', 'Alkene'],
    correctIndex: 1,
    explanation: 'Ketone (>C=O) has higher IUPAC priority than alcohol (-OH). Name is 4-hydroxybutan-2-one.'
  }
];

// Section 7: CHALLENGES array (22 challenges)
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // Foundation Tier (7)
  {
    id: 'c_01',
    nodeId: NODE_003,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the hybridisation of carbon atoms in Ethyne ($HC \\equiv CH$)?',
    options: ['sp3', 'sp2', 'sp', 'sp3d'],
    correctIndex: 2,
    explanation: 'Ethyne carbon forms 2 sigma bonds (1 C-H and 1 C-C) and 2 pi bonds, corresponding to sp hybridisation.',
    hints: ['Count the number of sigma bonds attached to each carbon.', 'Triple bond contains 1 sigma and 2 pi bonds.', '2 sigma bonds = sp hybridisation.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_02',
    nodeId: NODE_004,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the theoretical bond angle H-C-H in Methane ($CH_4$)?',
    options: ['90°', '120°', '109.5°', '180°'],
    correctIndex: 2,
    explanation: 'Methane has sp3 hybridised carbon with a regular tetrahedral geometry, yielding H-C-H bond angles of 109.5°.',
    hints: ['Methane has 4 bonding pairs around central carbon.', 'Geometry is regular tetrahedral.', 'Tetrahedral angle is 109°28\' or 109.5°.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_03',
    nodeId: NODE_005,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following represents the condensed formula of Propane?',
    options: ['CH4', 'CH3-CH2-CH3', 'C3H6', 'CH3-CH3'],
    correctIndex: 1,
    explanation: 'Propane contains 3 carbon atoms in an acyclic alkane chain: $CH_3-CH_2-CH_3$.',
    hints: ['Propane has 3 carbon atoms.', 'General formula for alkane is CnH2n+2.', 'C3H8 condensed is CH3CH2CH3.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_04',
    nodeId: NODE_007,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Benzene ($C_6H_6$) is classified as which type of organic compound?',
    options: ['Acyclic Aliphatic', 'Alicylic Non-aromatic', 'Aromatic Benzenoid', 'Heterocyclic Aromatic'],
    correctIndex: 2,
    explanation: 'Benzene consists of a 6-membered ring with alternating double bonds obeying Huckel Rule (4n+2 pi electrons, n=1), making it benzenoid aromatic.',
    hints: ['Benzene contains a ring of 6 carbon atoms.', 'It exhibits Huckel aromaticity (6 pi electrons).', 'It is a classic benzenoid aromatic compound.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_05',
    nodeId: NODE_008,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which functional group is characterized by the suffix "-ol" in IUPAC nomenclature?',
    options: ['Aldehyde', 'Alcohol (-OH)', 'Ketone', 'Carboxylic acid'],
    correctIndex: 1,
    explanation: 'Alcohols contain hydroxyl group (-OH) and take the suffix "-ol" in IUPAC systematic naming.',
    hints: ['Methanol, Ethanol, Propanol end in -ol.', 'Which functional group contains -OH?', 'Hydroxyl group gives alcohol suffix.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_06',
    nodeId: NODE_009,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'What is the correct IUPAC name for $CH_3-CH_2-CH_2-CH_3$?',
    options: ['Ethane', 'Propane', 'Butane', 'Pentane'],
    correctIndex: 2,
    explanation: 'A straight 4-carbon alkane chain is named Butane.',
    hints: ['Count the continuous carbon chain length: 1, 2, 3, 4.', 'Root word for 4 carbons is "but".', 'Alkane suffix is "-ane".'],
    misconceptionIndex: 1
  },
  {
    id: 'c_07',
    nodeId: NODE_023,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Homolytic bond cleavage of a covalent bond results in the formation of:',
    options: ['Carbocations', 'Carbanions', 'Free Radicals', 'Electrophiles and Nucleophiles'],
    correctIndex: 2,
    explanation: 'Homolytic cleavage breaks a bond symmetrically, leaving one electron on each atom, producing free radicals.',
    hints: ['Symmetrical splitting of bonding pair.', 'Each atom gets 1 electron.', 'Neutral species with unpaired electron = free radical.'],
    misconceptionIndex: 5
  },

  // Standard Tier (8)
  {
    id: 'c_08',
    nodeId: NODE_010,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application & Analysis',
    question: 'What is the IUPAC name of $CH_3-CH(OH)-CH_2-COOH$?',
    options: ['3-Hydroxybutanoic acid', '2-Hydroxybutanoic acid', '3-Carboxypropan-2-ol', '4-Hydroxybutan-2-oic acid'],
    correctIndex: 0,
    explanation: '-COOH has priority over -OH. Numbering starts at carboxyl carbon C1. Hydroxyl group is at C3: 3-hydroxybutanoic acid.',
    hints: ['Identify functional groups: carboxylic acid and alcohol.', 'Carboxylic acid carbon gets C1.', '-OH acts as a prefix "hydroxy" at C3.'],
    misconceptionIndex: 3
  },
  {
    id: 'c_09',
    nodeId: NODE_011,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In a polyfunctional organic compound containing -COOH, -CHO, -OH, and -NH2, which group gets top priority for principal suffix?',
    options: ['-CHO', '-OH', '-COOH', '-NH2'],
    correctIndex: 2,
    explanation: 'According to IUPAC priority rules: Carboxylic acids (-COOH) > Aldehydes (-CHO) > Alcohols (-OH) > Amines (-NH2).',
    hints: ['Carboxylic acids rank highest among organic functional groups.', 'Principal suffix will be -oic acid.', 'All other groups act as prefixes.'],
    misconceptionIndex: 3
  },
  {
    id: 'c_10',
    nodeId: NODE_012,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What type of structural isomerism exists between Pentan-2-one and Pentan-3-one?',
    options: ['Chain Isomerism', 'Position Isomerism', 'Functional Group Isomerism', 'Metamerism'],
    correctIndex: 1,
    explanation: 'Both compounds have the same carbon skeleton and functional group (>C=O), but the carbonyl group position differs (C2 vs C3). This is position isomerism.',
    hints: ['Both are 5-carbon ketones.', 'Carbonyl group is at position 2 in one, and position 3 in the other.', 'Different position of same functional group = Position Isomerism.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_11',
    nodeId: NODE_013,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Methoxypropane ($CH_3-O-C_3H_7$) and Ethoxyethane ($C_2H_5-O-C_2H_5$) exhibit which isomerism?',
    options: ['Chain Isomerism', 'Position Isomerism', 'Metamerism', 'Tautomerism'],
    correctIndex: 2,
    explanation: 'Metamerism arises due to different alkyl group distribution on either side of a polyvalent heteroatom (-O-).',
    hints: ['Heteroatom -O- is flanked by CH3 and C3H7 in one, and C2H5 and C2H5 in the other.', 'Unequal alkyl distribution around polyvalent functional group.', 'This is termed Metamerism.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_12',
    nodeId: NODE_021,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which of the following compounds exhibits Cis-Trans geometrical isomerism?',
    options: ['1-Butene', '2-Butene', 'Propene', 'Ethene'],
    correctIndex: 1,
    explanation: 'In 2-butene ($CH_3-CH=CH-CH_3$), each double-bonded carbon atom is attached to two distinct groups (-H and -$CH_3$), allowing cis and trans isomers.',
    hints: ['Check if each carbon of C=C has two DIFFERENT attached groups.', '1-butene has C1 attached to 2 hydrogens (same).', '2-butene has C2 and C3 each attached to H and CH3.'],
    misconceptionIndex: 0
  },
  {
    id: 'c_13',
    nodeId: NODE_024,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which of the following acts as a neutral electrophile?',
    options: ['NH3', 'BF3', 'OH-', 'CN-'],
    correctIndex: 1,
    explanation: 'Boron trifluoride ($BF_3$) has an incomplete octet (6 electrons around B), making it an electron pair acceptor (neutral electrophile / Lewis acid).',
    hints: ['Electrophiles accept electron pairs.', 'Look for an electron-deficient species.', 'BF3 has only 6 valence electrons on Boron.'],
    misconceptionIndex: 4
  },
  {
    id: 'c_14',
    nodeId: NODE_025,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Arrange the halogen substituents in correct decreasing order of electron-withdrawing inductive effect (-I):',
    options: ['-F > -Cl > -Br > -I', '-I > -Br > -Cl > -F', '-Cl > -F > -Br > -I', '-F > -Br > -Cl > -I'],
    correctIndex: 0,
    explanation: '-I effect correlates directly with electronegativity: Fluorine (4.0) > Chlorine (3.0) > Bromine (2.8) > Iodine (2.5).',
    hints: ['Inductive effect strength depends on electronegativity.', 'Fluorine is the most electronegative element.', 'Order matches group 17 electronegativity trend.'],
    misconceptionIndex: 1
  },
  {
    id: 'c_15',
    nodeId: NODE_029,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What is the correct relative order of stability for simple alkyl carbocations?',
    options: [
      '3° > 2° > 1° > +CH3',
      '+CH3 > 1° > 2° > 3°',
      '2° > 3° > 1° > +CH3',
      '3° > 1° > 2° > +CH3'
    ],
    correctIndex: 0,
    explanation: '3° carbocations have 9 alpha-hydrogens and 3 +I methyl groups, providing maximum hyperconjugative and inductive stabilization.',
    hints: ['Count alpha-hydrogens in (CH3)3C+, (CH3)2CH+, CH3CH2+.', 'More hyperconjugative structures = greater stability.', '3° (9 alpha-H) > 2° (6 alpha-H) > 1° (3 alpha-H) > methyl (0).'],
    misconceptionIndex: 3
  },

  // Advanced Tier (7)
  {
    id: 'c_16',
    nodeId: NODE_027,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'Phenoxide ion ($C_6H_5O^-$) is more stable than Ethoxide ion ($C_2H_5O^-$) primarily because of:',
    options: [
      'Stronger +I effect of phenyl ring',
      'Delocalization of negative charge into the aromatic ring via resonance (+R/-R)',
      'Hyperconjugation of phenoxide oxygen',
      'Electromeric shift towards ethyl group'
    ],
    correctIndex: 1,
    explanation: 'In phenoxide, the negative charge on oxygen is delocalized over ortho and para positions of the aromatic ring through 5 canonical resonance structures.',
    hints: ['Phenoxide has an aromatic ring adjacent to O-.', 'Negative charge is not localized on oxygen.', 'Resonance stabilization distributes charge over 5 canonical forms.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_17',
    nodeId: NODE_028,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: '2-Butene is thermodynamically more stable than 1-Butene because:',
    options: [
      '1-Butene has more hyperconjugative structures (6 alpha-H)',
      '2-Butene has 6 hyperconjugative alpha-hydrogens while 1-Butene has only 2 alpha-hydrogens',
      '2-Butene has higher steric strain',
      '1-Butene exhibits stronger -I effect'
    ],
    correctIndex: 1,
    explanation: 'In 2-butene ($CH_3-CH=CH-CH_3$), two methyl groups provide $3 + 3 = 6$ alpha-hydrogens. In 1-butene ($CH_2=CH-CH_2-CH_3$), only 2 alpha-hydrogens exist on C3.',
    hints: ['Locate C=C double bond in both alkenes.', 'Identify sp3 carbons directly attached to C=C (alpha carbons).', '2-butene has two -CH3 groups (6 alpha-H); 1-butene has one -CH2- group (2 alpha-H).'],
    misconceptionIndex: 3
  },
  {
    id: 'c_18',
    nodeId: NODE_026,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis & Synthesis',
    question: 'During addition of $HCN$ to acetone ($CH_3-CO-CH_3$), which electronic effect is immediately triggered by the approaching nucleophile $CN^-$?',
    options: ['+I Inductive Effect', '+E Electromeric Effect', 'Hyperconjugation', '-R Resonance Effect'],
    correctIndex: 1,
    explanation: 'The electromeric effect (+E) is a temporary effect where pi-electrons of C=O shift completely to oxygen in response to the attacking reagent.',
    hints: ['Electromeric effect occurs in multiple bonds upon reagent approach.', 'Pi electrons shift completely towards oxygen.', 'This is a temporary polarizability effect (+E).'],
    misconceptionIndex: 2
  },
  {
    id: 'c_19',
    nodeId: NODE_030,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'The reaction $CH_3-CH_2-Br + OH^- \\rightarrow CH_3-CH_2-OH + Br^-$ is classified as:',
    options: ['Electrophilic Addition', 'Nucleophilic Substitution ($S_N$)', 'Free Radical Elimination', 'Rearrangement Reaction'],
    correctIndex: 1,
    explanation: 'The nucleophile $OH^-$ replaces the leaving group $Br^-$ on the sp3 carbon atom, making it a nucleophilic substitution reaction.',
    hints: ['Nucleophile OH- attacks the substrate carbon.', 'Bromide ion leaves as leaving group.', 'Substitution by nucleophile = Nucleophilic Substitution.'],
    misconceptionIndex: 5
  },
  {
    id: 'c_20',
    nodeId: NODE_013,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis & Evaluation',
    question: 'In Propanone (Acetone), keto-enol tautomerism produces Propen-2-ol. Which form is generally more stable and why?',
    options: [
      'Enol form, because C=C bond is stronger than C=O bond',
      'Keto form, because C=O bond energy (745 kJ/mol) is significantly higher than C=C bond energy (611 kJ/mol)',
      'Both forms are 50:50 at equilibrium',
      'Enol form, due to strong intramolecular hydrogen bonding in simple acetone'
    ],
    correctIndex: 1,
    explanation: 'In simple monocarbonyl compounds like acetone, the keto form (~99%) dominates over enol form (~1%) because the C=O bond is much stronger than C=C bond.',
    hints: ['Compare bond strengths of C=O vs C=C.', 'C=O is exceptionally strong and polar.', 'Simple acetone exists predominantly (>99%) in keto form.'],
    misconceptionIndex: 2
  },
  {
    id: 'c_21',
    nodeId: NODE_028,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Calculate the total number of hyperconjugative canonical structures possible for the tert-butyl carbocation ($(CH_3)_3C^+$):',
    options: ['3', '6', '9', '10 (9 hyperconjugative + 1 original)'],
    correctIndex: 3,
    explanation: 'tert-butyl carbocation has 3 methyl groups with 3 alpha-hydrogens each = 9 alpha-hydrogens. Total structures = 9 no-bond resonance forms + 1 un-ionized form = 10 structures.',
    hints: ['Count total alpha-hydrogens on all 3 methyl groups attached to C+.', 'Number of hyperconjugative forms = number of alpha-H.', 'Total structures include the parent structure (alpha-H + 1).'],
    misconceptionIndex: 3
  },
  {
    id: 'c_22',
    nodeId: NODE_011,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What is the correct IUPAC systematic name for $CH_3-CH=CH-CO-CH_2-COOH$?',
    options: [
      '3-Oxo-hex-4-enoic acid',
      '4-Oxo-hex-2-enoic acid',
      'Hex-4-en-3-on-1-oic acid',
      '2-Oxo-hex-4-enoic acid'
    ],
    correctIndex: 0,
    explanation: '-COOH group gets priority C1. C2 is $CH_2$, C3 is $C=O$ (oxo prefix), C4-C5 is $CH=CH$, C6 is $CH_3$. Thus: 3-oxo-hex-4-enoic acid.',
    hints: ['Number from carboxyl carbon C1.', 'C3 has oxo substituent (keto group).', 'C4-C5 contains double bond. Chain length = 6 (hex-4-enoic acid).'],
    misconceptionIndex: 3
  }
];

// -------------------------------------------------------------
// Topic-Specific SVG Diagrams Components
// -------------------------------------------------------------

// SVG 1: Hybridisation & Bond Angle Diagram
const HybridizationDiagram: React.FC<{ hybridType: 'sp3' | 'sp2' | 'sp' }> = ({ hybridType }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <svg width="320" height="200" viewBox="0 0 320 200" className="w-full max-w-xs">
        <defs>
          <radialGradient id="carbonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
          </radialGradient>
          <radialGradient id="hGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Title */}
        <text x="160" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">
          {hybridType.toUpperCase()} Carbon Hybridisation & Geometry
        </text>

        {hybridType === 'sp3' && (
          <g>
            {/* Tetrahedral bonds */}
            <line x1="160" y1="100" x2="160" y2="45" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="100" x2="105" y2="145" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="100" x2="215" y2="145" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="100" x2="175" y2="155" stroke="#38bdf8" strokeWidth="6" strokeDasharray="2 3" strokeLinecap="round" />

            {/* Central Carbon */}
            <circle cx="160" cy="100" r="22" fill="url(#carbonGlow)" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="105" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>

            {/* Hydrogens */}
            <circle cx="160" cy="45" r="12" fill="url(#hGlow)" />
            <text x="160" y="49" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>
            <circle cx="105" cy="145" r="12" fill="url(#hGlow)" />
            <text x="105" y="149" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>
            <circle cx="215" cy="145" r="12" fill="url(#hGlow)" />
            <text x="215" y="149" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>
            <circle cx="175" cy="155" r="12" fill="url(#hGlow)" />
            <text x="175" y="159" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>

            {/* Angle Indicator */}
            <path d="M 135 120 A 30 30 0 0 1 160 70" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="120" y="90" fill="#f59e0b" fontSize="12" fontWeight="bold">109.5°</text>
            <text x="160" y="188" textAnchor="middle" fill="#94a3b8" fontSize="11">Tetrahedral | 25% s, 75% p | 4 σ bonds</text>
          </g>
        )}

        {hybridType === 'sp2' && (
          <g>
            {/* Trigonal Planar bonds */}
            <line x1="160" y1="100" x2="160" y2="40" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="100" x2="95" y2="140" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
            <line x1="160" y1="100" x2="225" y2="140" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />

            {/* Unhybridized p-orbital lobe indicator */}
            <ellipse cx="160" cy="100" rx="40" ry="12" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" transform="rotate(-30 160 100)" />

            {/* Central Carbon */}
            <circle cx="160" cy="100" r="22" fill="url(#carbonGlow)" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="105" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>

            {/* Hydrogens / Groups */}
            <circle cx="160" cy="40" r="12" fill="url(#hGlow)" />
            <text x="160" y="44" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">R</text>
            <circle cx="95" cy="140" r="12" fill="url(#hGlow)" />
            <text x="95" y="144" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>
            <circle cx="225" cy="140" r="12" fill="url(#hGlow)" />
            <text x="225" y="144" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>

            {/* Angle Indicator */}
            <path d="M 130 118 A 30 30 0 0 1 188 118" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="160" y="135" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">120°</text>
            <text x="160" y="188" textAnchor="middle" fill="#94a3b8" fontSize="11">Trigonal Planar | 33.3% s | 3 σ, 1 π bond</text>
          </g>
        )}

        {hybridType === 'sp' && (
          <g>
            {/* Linear bonds */}
            <line x1="60" y1="100" x2="260" y2="100" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />

            {/* Unhybridized p-orbital lobes */}
            <ellipse cx="160" cy="100" rx="15" ry="45" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2" />
            <ellipse cx="160" cy="100" rx="45" ry="15" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="2" />

            {/* Central Carbon */}
            <circle cx="160" cy="100" r="22" fill="url(#carbonGlow)" stroke="#38bdf8" strokeWidth="2" />
            <text x="160" y="105" textAnchor="middle" fill="#ffffff" fontSize="14" fontWeight="bold">C</text>

            {/* Attached atoms */}
            <circle cx="60" cy="100" r="14" fill="url(#hGlow)" />
            <text x="60" y="104" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">H</text>
            <circle cx="260" cy="100" r="14" fill="url(#hGlow)" />
            <text x="260" y="104" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">C</text>

            {/* Angle Indicator */}
            <path d="M 110 90 A 50 50 0 0 1 210 90" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
            <text x="160" y="70" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">180°</text>
            <text x="160" y="188" textAnchor="middle" fill="#94a3b8" fontSize="11">Linear | 50% s, 50% p | 2 σ, 2 π bonds</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// SVG 2: Structural Representations Diagram (Complete, Condensed, Bond-line)
const StructuralRepresentationDiagram: React.FC<{ mode: 'complete' | 'condensed' | 'bond-line' }> = ({ mode }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <svg width="340" height="180" viewBox="0 0 340 180" className="w-full max-w-sm">
        <text x="170" y="24" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">
          Butane ($C_4H_{10}$) Representation
        </text>

        {mode === 'complete' && (
          <g>
            {/* 4 Carbons in chain with hydrogens */}
            {[0, 1, 2, 3].map((idx) => {
              const cx = 60 + idx * 70;
              return (
                <g key={idx}>
                  {/* C-C bond */}
                  {idx < 3 && <line x1={cx} y1="90" x2={cx + 70} y2="90" stroke="#94a3b8" strokeWidth="3" />}
                  {/* Vertical C-H bonds */}
                  <line x1={cx} y1="90" x2={cx} y2="50" stroke="#38bdf8" strokeWidth="2" />
                  <line x1={cx} y1="90" x2={cx} y2="130" stroke="#38bdf8" strokeWidth="2" />

                  <circle cx={cx} cy="50" r="10" fill="#ec4899" />
                  <text x={cx} y="54" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">H</text>

                  <circle cx={cx} cy="130" r="10" fill="#ec4899" />
                  <text x={cx} y="134" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">H</text>

                  {/* Terminal hydrogens */}
                  {idx === 0 && (
                    <>
                      <line x1={cx} y1="90" x2={cx - 30} y2="90" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx={cx - 30} cy="90" r="10" fill="#ec4899" />
                      <text x={cx - 30} y="94" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">H</text>
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <line x1={cx} y1="90" x2={cx + 30} y2="90" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx={cx + 30} cy="90" r="10" fill="#ec4899" />
                      <text x={cx + 30} y="94" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">H</text>
                    </>
                  )}

                  <circle cx={cx} cy="90" r="16" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x={cx} y="95" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">C</text>
                </g>
              );
            })}
            <text x="170" y="168" textAnchor="middle" fill="#a7f3d0" fontSize="11">Expanded Structural Formula (All bonds shown)</text>
          </g>
        )}

        {mode === 'condensed' && (
          <g>
            <rect x="30" y="65" width="280" height="50" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <text x="170" y="96" textAnchor="middle" fill="#38bdf8" fontSize="20" fontWeight="bold" letterSpacing="2">
              CH₃—CH₂—CH₂—CH₃
            </text>
            <text x="170" y="135" textAnchor="middle" fill="#cbd5e1" fontSize="12">
              Condensed Formula: <tspan fill="#f59e0b">CH₃(CH₂)₂CH₃</tspan>
            </text>
            <text x="170" y="168" textAnchor="middle" fill="#a7f3d0" fontSize="11">C-H bonds omitted for clarity</text>
          </g>
        )}

        {mode === 'bond-line' && (
          <g>
            {/* Zigzag line representing C-C skeleton */}
            <polyline points="50,110 110,60 170,110 230,60 290,110" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Vertices indicator dots */}
            <circle cx="50" cy="110" r="6" fill="#f43f5e" />
            <circle cx="110" cy="60" r="6" fill="#f59e0b" />
            <circle cx="170" cy="110" r="6" fill="#f59e0b" />
            <circle cx="230" cy="60" r="6" fill="#f59e0b" />
            <circle cx="290" cy="110" r="6" fill="#f43f5e" />

            <text x="50" y="130" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">C1 (CH3)</text>
            <text x="110" y="45" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">C2 (CH2)</text>
            <text x="170" y="130" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">C3 (CH2)</text>
            <text x="230" y="45" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">C4 (CH2)</text>
            <text x="290" y="130" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">C5 (CH3)</text>
            <text x="170" y="168" textAnchor="middle" fill="#a7f3d0" fontSize="11">Bond-line notation (Carbons at vertices, H implicit)</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// SVG 3: Electronic Effects Diagram (Inductive, Resonance, Hyperconjugation)
const ElectronicEffectsDiagram: React.FC<{ effectType: 'inductive' | 'resonance' | 'hyperconjugation' }> = ({ effectType }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <svg width="340" height="190" viewBox="0 0 340 190" className="w-full max-w-sm">
        <text x="170" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
          {effectType === 'inductive' && 'Inductive Effect (-I / +I) Polarization'}
          {effectType === 'resonance' && 'Resonance Delocalization (Mesomeric Effect)'}
          {effectType === 'hyperconjugation' && 'Hyperconjugation (No-Bond Resonance)'}
        </text>

        {effectType === 'inductive' && (
          <g>
            {/* Chain with electron pulling Cl atom */}
            <text x="40" y="90" fill="#38bdf8" fontSize="16" fontWeight="bold">Cδδδ+</text>
            <path d="M 70 85 L 90 85" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />

            <text x="110" y="90" fill="#38bdf8" fontSize="16" fontWeight="bold">Cδδ+</text>
            <path d="M 140 85 L 165 85" stroke="#38bdf8" strokeWidth="3" />

            <text x="185" y="90" fill="#38bdf8" fontSize="16" fontWeight="bold">Cδ+</text>
            <path d="M 210 85 L 245 85" stroke="#f43f5e" strokeWidth="4" />

            <circle cx="275" cy="85" r="20" fill="#ef4444" />
            <text x="275" y="91" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">Clδ-</text>

            {/* Direction arrows */}
            <path d="M 240 75 L 255 85 L 240 95" fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 165 77 L 175 85 L 165 93" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            <text x="170" y="145" textAnchor="middle" fill="#e2e8f0" fontSize="11">
              -I effect of Cl pulls σ-electrons along C-C backbone.
            </text>
            <text x="170" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Effect diminishes rapidly with distance (negligible after 3 carbons).
            </text>
          </g>
        )}

        {effectType === 'resonance' && (
          <g>
            {/* Allyl cation resonance */}
            <g transform="translate(20, 40)">
              <text x="30" y="50" fill="#38bdf8" fontSize="14" fontWeight="bold">CH₂ = CH — CH₂⁺</text>
              <path d="M 70 30 C 80 15, 110 15, 120 30" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              <path d="M 115 23 L 120 30 L 112 33" fill="#f59e0b" />
            </g>

            <text x="170" y="90" textAnchor="middle" fill="#a7f3d0" fontSize="18" fontWeight="bold">↔</text>

            <g transform="translate(180, 40)">
              <text x="30" y="50" fill="#38bdf8" fontSize="14" fontWeight="bold">⁺CH₂ — CH = CH₂</text>
            </g>

            {/* Hybrid representation */}
            <rect x="50" y="115" width="240" height="35" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
            <text x="170" y="138" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">
              [ CH₂ ═ CH ═ CH₂ ] δ⁺
            </text>
            <text x="170" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Complete pi-electron delocalization creates single unified hybrid.
            </text>
          </g>
        )}

        {effectType === 'hyperconjugation' && (
          <g>
            {/* Ethyl carbocation hyperconjugation */}
            <g transform="translate(40, 40)">
              {/* C-H sigma bond breaking interaction */}
              <text x="30" y="40" fill="#ec4899" fontSize="13" fontWeight="bold">H⁺</text>
              <line x1="35" y1="45" x2="50" y2="60" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2 2" />

              <text x="50" y="75" fill="#38bdf8" fontSize="14" fontWeight="bold">H₂C ═ CH₂</text>
              <path d="M 40 50 C 50 35, 65 35, 70 55" fill="none" stroke="#38bdf8" strokeWidth="2" />
            </g>

            <rect x="30" y="110" width="280" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="170" y="128" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
              σ(C-H) orbital overlaps with vacant p-orbital of C⁺
            </text>
            <text x="170" y="144" textAnchor="middle" fill="#f59e0b" fontSize="10">
              More α-hydrogens = More no-bond resonance structures = Greater stability
            </text>
            <text x="170" y="172" textAnchor="middle" fill="#94a3b8" fontSize="10">
              Baker-Nathan Effect (3° carbocation: 9 α-H &gt; 2°: 6 α-H &gt; 1°: 3 α-H)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// Canvas Component for Intermediate Stability & Reaction Animation
const ReactionMechanismCanvas: React.FC<{ intermediateType: 'carbocation' | 'carbanion' | 'free-radical' }> = ({ intermediateType }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw background grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Central Carbon Atom
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fillStyle = '#0284c7';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('C', centerX, centerY);

      // Draw 3 Alkyl / Group Bonds (Trigonal Planar arrangement)
      const angles = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
      angles.forEach((a, idx) => {
        const armLength = 70;
        const bx = centerX + Math.cos(a + Math.sin(angle) * 0.05) * armLength;
        const by = centerY + Math.sin(a + Math.sin(angle) * 0.05) * armLength;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(bx, by, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(`R${idx + 1}`, bx, by);
      });

      // Draw Orbital / Charge overlay depending on intermediate type
      if (intermediateType === 'carbocation') {
        // Vacant p-orbital lobe above and below
        const lobeHeight = 45 + Math.sin(angle * 2) * 3;
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#38bdf8';

        // Top lobe
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 30, 16, lobeHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Bottom lobe
        ctx.fillStyle = '#818cf8';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + 30, 16, lobeHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Plus charge symbol
        ctx.fillStyle = '#f43f5e';
        ctx.font = 'bold 22px sans-serif';
        ctx.fillText('+', centerX + 28, centerY - 20);
      } else if (intermediateType === 'carbanion') {
        // Pyramidal lone pair lobe
        const lobeHeight = 40 + Math.cos(angle * 2) * 3;
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 35, 18, lobeHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Pair of dots inside lobe
        const dotOsc = Math.sin(angle * 3) * 2;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(centerX - 5, centerY - 35 + dotOsc, 3, 0, Math.PI * 2);
        ctx.arc(centerX + 5, centerY - 35 - dotOsc, 3, 0, Math.PI * 2);
        ctx.fill();

        // Negative charge symbol
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 24px sans-serif';
        ctx.fillText('-', centerX + 28, centerY - 20);
      } else if (intermediateType === 'free-radical') {
        // Single electron in unhybridized p-orbital
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.ellipse(centerX, centerY - 32, 15, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.ellipse(centerX, centerY + 32, 15, 22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Single electron dot
        ctx.fillStyle = '#facc15';
        ctx.beginPath();
        ctx.arc(centerX, centerY - 32 + Math.sin(angle * 4) * 2, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('•', centerX + 28, centerY - 20);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [intermediateType]);

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-slate-950 rounded-xl border border-slate-800">
      <canvas ref={canvasRef} width={320} height={200} className="w-full max-w-xs rounded-lg" />
      <div className="mt-2 text-xs text-slate-400 text-center">
        {intermediateType === 'carbocation' && 'Carbocation: sp² planar, 6 valence electrons, vacant p-orbital (Stability: 3° > 2° > 1°)'}
        {intermediateType === 'carbanion' && 'Carbanion: sp³ pyramidal, 8 valence electrons with lone pair (Stability: 1° > 2° > 3°)'}
        {intermediateType === 'free-radical' && 'Free Radical: sp² planar, 7 valence electrons with 1 unpaired electron (Stability: 3° > 2° > 1°)'}
      </div>
    </div>
  );
};

// Main Component
const C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim: React.FC<PropType> = ({ onComplete, initialNodeId }) => {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('discovery');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Discovery Question State
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Prediction Questions State
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predChecked, setPredChecked] = useState<Record<number, boolean>>({});

  // Observation Questions State
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsChecked, setObsChecked] = useState<Record<number, boolean>>({});

  // Lab Explorations State
  const [labHybridType, setLabHybridType] = useState<'sp3' | 'sp2' | 'sp'>('sp3');
  const [labChainLength, setLabChainLength] = useState<number>(4);
  const [labSubstituent, setLabSubstituent] = useState<'none' | 'methyl' | 'hydroxy' | 'oxo' | 'carboxy'>('none');
  const [labIsomerType, setLabIsomerType] = useState<'chain' | 'position' | 'functional' | 'geometrical'>('chain');
  const [labElectronicEffect, setLabElectronicEffect] = useState<'inductive' | 'resonance' | 'hyperconjugation'>('inductive');
  const [labIntermediateType, setLabIntermediateType] = useState<'carbocation' | 'carbanion' | 'free-radical'>('carbocation');
  const [labRepresentationMode, setLabRepresentationMode] = useState<'complete' | 'condensed' | 'bond-line'>('bond-line');

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Hints & Visual Effects Feedback
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity auto-hint timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Speak welcome message on mount
  useEffect(() => {
    speechManager.speak('Welcome to ISC Class 11 Organic Chemistry Fundamental Principles Laboratory. Let us explore hybridisation, structural formulas, electronic effects, and reaction mechanisms.');
    audioManager.play('whoosh');
  }, []);

  // Timer reset helper
  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const currentCh = CHALLENGES[currentChallengeIndex];
        if (currentCh && currentCh.hints.length > 0) {
          setCurrentHint(`Auto-Hint: ${currentCh.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 12000); // 12 sec auto-hint trigger
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer, selectedChallengeOption, currentChallengeIndex, activeTab]);

  // Tab switcher
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary') => {
    setActiveTab(tab);
    setShowHint(false);
    audioManager.play('tap');
    if (tab === 'lab') {
      speechManager.speak('Entering Interactive Exploration Suite. Select a lab step to experiment.');
    } else if (tab === 'challenges') {
      speechManager.speak('Entering ISC Organic Chemistry Assessment Challenges.');
    } else if (tab === 'summary') {
      speechManager.speak('Reviewing Real World Pharmaceutical Applications and Mastery Report.');
    }
  };

  // Discovery Question submission
  const handleDiscoverySubmit = (index: number) => {
    setSelectedDiscoveryOption(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Hyperconjugation delocalizes charge across adjacent alpha C-H sigma bonds.');
      setShowSparkle(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowSparkle(false);
      }, 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Recall how adjacent C-H sigma bonds overlap with vacant p-orbitals.');
    }
  };

  // Prediction Question Check
  const handleCheckPrediction = (predIndex: number, optionIdx: number) => {
    setPredAnswers((prev) => ({ ...prev, [predIndex]: optionIdx }));
    setPredChecked((prev) => ({ ...prev, [predIndex]: true }));

    const question = PREDICTION_QUESTIONS[predIndex];
    const isCorrect = optionIdx === question.correctIndex;

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Prediction verified correct!');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Prediction incorrect. Review the experimental parameters.');
    }

    // Update BKT
    if (question.nodeId) {
      setBktStates((prev) => ({
        ...prev,
        [question.nodeId]: bktUpdate(prev[question.nodeId] || createBKTState(question.nodeId), isCorrect)
      }));
    }
  };

  // Observation Question Check
  const handleCheckObservation = (obsIndex: number, optionIdx: number) => {
    setObsAnswers((prev) => ({ ...prev, [obsIndex]: optionIdx }));
    setObsChecked((prev) => ({ ...prev, [obsIndex]: true }));

    const question = OBSERVATION_QUESTIONS[obsIndex];
    const isCorrect = optionIdx === question.correctIndex;

    if (isCorrect) {
      audioManager.play('chime');
      speechManager.speak('Observation accurate!');
    } else {
      audioManager.play('error');
    }

    if (question.nodeId) {
      setBktStates((prev) => ({
        ...prev,
        [question.nodeId]: bktUpdate(prev[question.nodeId] || createBKTState(question.nodeId), isCorrect)
      }));
    }
  };

  // Challenge Handling
  const handleAnswerChallenge = (optIndex: number) => {
    setSelectedChallengeOption(optIndex);
    const currentCh = CHALLENGES[currentChallengeIndex];
    const isCorrect = optIndex === currentCh.correctIndex;

    // Update BKT & SRS
    const nodeId = currentCh.nodeId;
    const currentBkt = bktStates[nodeId] || createBKTState(nodeId);
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const currentSrs = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 4 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Outstanding! That is correct.');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${currentCh.explanation}` });
      setShowSparkle(true);

      if (!completedChallenges.has(currentCh.id)) {
        setScore((prev) => prev + (currentCh.difficulty === 'foundation' ? 10 : currentCh.difficulty === 'standard' ? 20 : 30));
        setCompletedChallenges((prev) => new Set(prev).add(currentCh.id));
      }
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect answer. Review the explanation hint.');
      setChallengeFeedback({ isCorrect: false, text: `Incorrect. ${currentCh.explanation}` });
    }
  };

  const handleNextChallenge = () => {
    setSelectedChallengeOption(null);
    setChallengeFeedback(null);
    setShowHint(false);
    audioManager.play('swoop');

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowSuccess(true);
      setShowConfetti(true);
      speechManager.speak(`Congratulations! You completed all ${CHALLENGES.length} challenges with a score of ${score}.`);
      if (onComplete) {
        onComplete(score);
      }
      recordGameScore('c11_chem_cbse_organic_p1', score);
    }
  };

  const handlePrevChallenge = () => {
    if (currentChallengeIndex > 0) {
      setSelectedChallengeOption(null);
      setChallengeFeedback(null);
      setShowHint(false);
      audioManager.play('swoop');
      setCurrentChallengeIndex((prev) => prev - 1);
    }
  };

  // IUPAC Name Evaluator Helper for Lab 2
  const computedIUPACName = useMemo(() => {
    let root = 'But';
    if (labChainLength === 2) root = 'Eth';
    if (labChainLength === 3) root = 'Prop';
    if (labChainLength === 4) root = 'But';
    if (labChainLength === 5) root = 'Pent';
    if (labChainLength === 6) root = 'Hex';

    if (labSubstituent === 'none') return `${root}ane`;
    if (labSubstituent === 'methyl') return `2-Methyl${root.toLowerCase()}ane`;
    if (labSubstituent === 'hydroxy') return `${root}an-2-ol`;
    if (labSubstituent === 'oxo') return `${root}an-2-one`;
    if (labSubstituent === 'carboxy') return `${root}anoic acid`;
    return `${root}ane`;
  }, [labChainLength, labSubstituent]);

  // Alpha Hydrogens calculation helper for Lab 4
  const alphaHydrogensCount = useMemo(() => {
    if (labIntermediateType === 'carbocation') return 9; // tert-butyl default
    if (labIntermediateType === 'carbanion') return 0;
    return 6;
  }, [labIntermediateType]);

  // Overall Node Mastery average
  const averageMastery = useMemo(() => {
    const masteries = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id] || createBKTState(id)));
    const sum = masteries.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / masteries.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center">
      {/* Top Header & Mastery Bar */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Class 11 ISC Chemistry
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Organic Principles Part 1
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            {SCENARIO.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>

        {/* Mastery Indicator */}
        <div className="flex items-center gap-6 bg-slate-950/80 px-4 py-3 rounded-xl border border-slate-800 shrink-0">
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">BKT Mastery</div>
            <div className="text-xl font-extrabold text-cyan-400">{averageMastery}%</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">Lab Score</div>
            <div className="text-xl font-extrabold text-amber-400">{score} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">Completed</div>
            <div className="text-xl font-extrabold text-emerald-400">
              {completedChallenges.size}/{CHALLENGES.length}
            </div>
          </div>
        </div>
      </header>

      {/* Primary Navigation Tabs */}
      <nav className="w-full max-w-6xl flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => handleTabChange('discovery')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'discovery'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>💡</span> 1. Scenario & Preconception
        </button>
        <button
          onClick={() => handleTabChange('lab')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'lab'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>🧪</span> 2. Interactive Explorations (5 Labs)
        </button>
        <button
          onClick={() => handleTabChange('challenges')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'challenges'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>🏆</span> 3. ISC Assessment Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => handleTabChange('misconceptions')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'misconceptions'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>🧠</span> 4. Misconceptions & Diagnostics
        </button>
        <button
          onClick={() => handleTabChange('summary')}
          className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <span>🌐</span> 5. Real-World Industry Application
        </button>
      </nav>

      {/* Main Content Body */}
      <main className="w-full max-w-6xl">
        {/* ------------------------------------------------------------- */}
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <span>��</span> Real Chemistry Lab Context
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4">{SCENARIO.context}</p>

              {/* Discovery Counterintuitive Question */}
              <div className="mt-6 bg-slate-950 border border-amber-500/30 rounded-xl p-5 shadow-inner">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <span>⚡</span> Preconception Discovery Challenge
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-100 mb-4">
                  {DISCOVERY_QUESTION.question}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {DISCOVERY_QUESTION.options.map((option, idx) => {
                    let btnClass = 'bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800';
                    if (selectedDiscoveryOption === idx) {
                      if (idx === DISCOVERY_QUESTION.correctIndex) {
                        btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                      } else {
                        btnClass = 'bg-rose-950 border-rose-500 text-rose-300';
                      }
                    } else if (discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex) {
                      btnClass = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleDiscoverySubmit(idx)}
                        disabled={discoveryAnswered}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 ${btnClass}`}
                      >
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>

                {discoveryAnswered && (
                  <div className="mt-4 p-4 rounded-xl bg-cyan-950/60 border border-cyan-800/80 text-cyan-200 text-xs sm:text-sm">
                    <span className="font-bold text-cyan-400">Key Scientific Insight: </span>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                )}
              </div>
            </div>

            {/* PREDICTION_QUESTIONS Mapping Render */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-sky-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Prediction Questions (Hypothesis Testing)
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 text-sm sm:text-base mb-3">
                      {pIdx + 1}. {pred.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleCheckPrediction(pIdx, oIdx)}
                          className={`p-3 rounded-lg border text-xs sm:text-sm text-left transition-all ${
                            predAnswers[pIdx] === oIdx
                              ? oIdx === pred.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predChecked[pIdx] && (
                      <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-700">
                        <span className="font-semibold text-amber-400">Verification Guide: </span>
                        {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: INTERACTIVE EXPLORATION STEPS (5 LAB WORKBENCHES) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Step Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap gap-2">
              {EXPLORATION_STEPS.map((step, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => {
                    setCurrentStepIndex(sIdx);
                    audioManager.play('tap');
                    speechManager.speak(`Switched to ${step.title}`);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    currentStepIndex === sIdx
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  Lab {sIdx + 1}: {step.title.split(':')[1] || step.title}
                </button>
              ))}
            </div>

            {/* Active Lab Card Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-cyan-400">
                  {EXPLORATION_STEPS[currentStepIndex].title}
                </h2>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-slate-950 text-slate-400 border border-slate-800">
                  Node: {EXPLORATION_STEPS[currentStepIndex].nodeId}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                {EXPLORATION_STEPS[currentStepIndex].instruction}
              </p>

              {/* LAB STEP 1: Hybridisation & Bond Angles */}
              {currentStepIndex === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <label className="block text-sm font-semibold text-slate-200">
                      Select Carbon Hybridisation State:
                    </label>
                    <div className="flex gap-2">
                      {(['sp3', 'sp2', 'sp'] as const).map((h) => (
                        <button
                          key={h}
                          onClick={() => {
                            setLabHybridType(h);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                            labHybridType === h
                              ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/30'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {h.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2 pt-4 text-xs text-slate-300 border-t border-slate-800">
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span>Geometry:</span>
                        <span className="font-bold text-cyan-400">
                          {labHybridType === 'sp3' && 'Tetrahedral'}
                          {labHybridType === 'sp2' && 'Trigonal Planar'}
                          {labHybridType === 'sp' && 'Linear'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span>Bond Angle:</span>
                        <span className="font-bold text-amber-400">
                          {labHybridType === 'sp3' && '109.5°'}
                          {labHybridType === 'sp2' && '120°'}
                          {labHybridType === 'sp' && '180°'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-slate-900">
                        <span>s-Character (%):</span>
                        <span className="font-bold text-emerald-400">
                          {labHybridType === 'sp3' && '25%'}
                          {labHybridType === 'sp2' && '33.3%'}
                          {labHybridType === 'sp' && '50%'}
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Bonds formed:</span>
                        <span className="font-bold text-purple-400">
                          {labHybridType === 'sp3' && '4 σ bonds, 0 π bonds'}
                          {labHybridType === 'sp2' && '3 σ bonds, 1 π bond'}
                          {labHybridType === 'sp' && '2 σ bonds, 2 π bonds'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <HybridizationDiagram hybridType={labHybridType} />
                </div>
              )}

              {/* LAB STEP 2: IUPAC Nomenclature & Structural Builder */}
              {currentStepIndex === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        1. Chain Length: {labChainLength} Carbons
                      </label>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={labChainLength}
                        onChange={(e) => {
                          setLabChainLength(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500"
                      />
                      <div className="flex justify-between text-xs text-slate-500 font-mono">
                        <span>Eth(2)</span>
                        <span>Prop(3)</span>
                        <span>But(4)</span>
                        <span>Pent(5)</span>
                        <span>Hex(6)</span>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        2. Functional Substituent
                      </label>
                      <select
                        value={labSubstituent}
                        onChange={(e) => {
                          setLabSubstituent(e.target.value as typeof labSubstituent);
                          audioManager.play('pop');
                        }}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 focus:border-cyan-500"
                      >
                        <option value="none">None (Simple Alkane)</option>
                        <option value="methyl">Methyl branch (-CH3)</option>
                        <option value="hydroxy">Alcohol (-OH)</option>
                        <option value="oxo">Ketone (&gt;C=O)</option>
                        <option value="carboxy">Carboxylic Acid (-COOH)</option>
                      </select>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        3. Formula Style
                      </label>
                      <div className="flex gap-1">
                        {(['complete', 'condensed', 'bond-line'] as const).map((m) => (
                          <button
                            key={m}
                            onClick={() => {
                              setLabRepresentationMode(m);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-2 text-[10px] font-bold rounded capitalize border ${
                              labRepresentationMode === m
                                ? 'bg-cyan-600 border-cyan-400 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calculated Name Banner */}
                  <div className="bg-slate-950 border border-cyan-500/40 p-4 rounded-xl text-center">
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                      Calculated Systematic IUPAC Name
                    </div>
                    <div className="text-2xl font-extrabold text-cyan-400 mt-1 font-mono">
                      {computedIUPACName}
                    </div>
                  </div>

                  <StructuralRepresentationDiagram mode={labRepresentationMode} />
                </div>
              )}

              {/* LAB STEP 3: Isomerism Workbench */}
              {currentStepIndex === 2 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {(['chain', 'position', 'functional', 'geometrical'] as const).map((iso) => (
                      <button
                        key={iso}
                        onClick={() => {
                          setLabIsomerType(iso);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          labIsomerType === iso
                            ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        {iso} Isomerism
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                    {labIsomerType === 'chain' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                          <h4 className="font-bold text-cyan-400 text-sm mb-1">Pentan-1-ol (Unbranched)</h4>
                          <p className="text-xs text-slate-400 font-mono">CH3-CH2-CH2-CH2-CH2-OH</p>
                          <p className="text-xs text-slate-300 mt-2">Boiling point: 138°C (Max surface area)</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                          <h4 className="font-bold text-amber-400 text-sm mb-1">2,2-Dimethylpropan-1-ol (Branched)</h4>
                          <p className="text-xs text-slate-400 font-mono">(CH3)3C-CH2-OH</p>
                          <p className="text-xs text-slate-300 mt-2">Boiling point: 113°C (Spherical shape reduces van der Waals)</p>
                        </div>
                      </div>
                    )}

                    {labIsomerType === 'position' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                          <h4 className="font-bold text-cyan-400 text-sm mb-1">Propan-1-ol</h4>
                          <p className="text-xs text-slate-400 font-mono">CH3-CH2-CH2-OH (OH at C1)</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                          <h4 className="font-bold text-amber-400 text-sm mb-1">Propan-2-ol</h4>
                          <p className="text-xs text-slate-400 font-mono">CH3-CH(OH)-CH3 (OH at C2)</p>
                        </div>
                      </div>
                    )}

                    {labIsomerType === 'functional' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                          <h4 className="font-bold text-cyan-400 text-sm mb-1">Ethanol (Alcohol)</h4>
                          <p className="text-xs text-slate-400 font-mono">CH3-CH2-OH</p>
                          <p className="text-xs text-slate-300 mt-2">Liquid at RT due to H-bonding</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                          <h4 className="font-bold text-emerald-400 text-sm mb-1">Methoxymethane (Ether)</h4>
                          <p className="text-xs text-slate-400 font-mono">CH3-O-CH3</p>
                          <p className="text-xs text-slate-300 mt-2">Gas at RT (No H-bonding)</p>
                        </div>
                      </div>
                    )}

                    {labIsomerType === 'geometrical' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <h4 className="font-bold text-sky-400 text-sm mb-2">Cis-2-Butene</h4>
                          <p className="text-xs text-slate-400 font-mono">Methyl groups on SAME side</p>
                          <div className="mt-3 text-xs text-amber-300">Higher Dipole Moment (μ &gt; 0)</div>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-center">
                          <h4 className="font-bold text-purple-400 text-sm mb-2">Trans-2-Butene</h4>
                          <p className="text-xs text-slate-400 font-mono">Methyl groups on OPPOSITE sides</p>
                          <div className="mt-3 text-xs text-emerald-300">Zero Dipole Moment (μ = 0)</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB STEP 4: Electronic Effects & Stability Meter */}
              {currentStepIndex === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Select Electronic Displacement Effect:
                    </label>
                    <div className="flex gap-2">
                      {(['inductive', 'resonance', 'hyperconjugation'] as const).map((eff) => (
                        <button
                          key={eff}
                          onClick={() => {
                            setLabElectronicEffect(eff);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all border ${
                            labElectronicEffect === eff
                              ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {eff}
                        </button>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2">
                      {labElectronicEffect === 'inductive' && (
                        <>
                          <p><strong className="text-cyan-400">Nature:</strong> Permanent effect operating through σ-bonds.</p>
                          <p><strong className="text-amber-400">-I Order:</strong> -NO2 &gt; -CN &gt; -COOH &gt; -F &gt; -Cl &gt; -Br &gt; -I</p>
                          <p><strong className="text-emerald-400">+I Order:</strong> -C(CH3)3 &gt; -CH(CH3)2 &gt; -CH2CH3 &gt; -CH3</p>
                        </>
                      )}
                      {labElectronicEffect === 'resonance' && (
                        <>
                          <p><strong className="text-cyan-400">Nature:</strong> Delocalization of π-electrons or lone pairs in conjugated systems.</p>
                          <p><strong className="text-emerald-400">+R Groups:</strong> -OH, -OR, -NH2, -NR2, -Halogens (Electron Donating)</p>
                          <p><strong className="text-rose-400">-R Groups:</strong> -NO2, -CN, -CHO, -COOH (Electron Withdrawing)</p>
                        </>
                      )}
                      {labElectronicEffect === 'hyperconjugation' && (
                        <>
                          <p><strong className="text-cyan-400">Nature:</strong> Delocalization of C-H σ-electrons into vacant p or π orbital.</p>
                          <p><strong className="text-amber-400">Requirement:</strong> Presence of α-hydrogens on sp³ carbon.</p>
                          <p><strong className="text-purple-400">Stability Rule:</strong> Number of hyperconjugative forms = Number of α-hydrogens.</p>
                        </>
                      )}
                    </div>
                  </div>

                  <ElectronicEffectsDiagram effectType={labElectronicEffect} />
                </div>
              )}

              {/* LAB STEP 5: Reaction Mechanism & Bond Fission Simulator */}
              {currentStepIndex === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Select Reaction Intermediate:
                    </label>
                    <div className="flex gap-2">
                      {(['carbocation', 'carbanion', 'free-radical'] as const).map((inter) => (
                        <button
                          key={inter}
                          onClick={() => {
                            setLabIntermediateType(inter);
                            audioManager.play('pop');
                          }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all border ${
                            labIntermediateType === inter
                              ? 'bg-cyan-600 border-cyan-400 text-white shadow-md'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {inter.replace('-', ' ')}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-slate-800">
                      <div className="flex justify-between">
                        <span>Bond Cleavage Origin:</span>
                        <span className="font-bold text-cyan-400">
                          {labIntermediateType === 'free-radical' ? 'Homolytic Cleavage (A• + B•)' : 'Heterolytic Cleavage (A⁺ + B⁻)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hybridisation:</span>
                        <span className="font-bold text-amber-400">
                          {labIntermediateType === 'carbanion' ? 'sp³ (Pyramidal)' : 'sp² (Planar)'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stability Sequence:</span>
                        <span className="font-bold text-emerald-400">
                          {labIntermediateType === 'carbanion' ? '1° > 2° > 3°' : '3° > 2° > 1°'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <ReactionMechanismCanvas intermediateType={labIntermediateType} />
                </div>
              )}
            </div>

            {/* OBSERVATION_QUESTIONS Mapping Render */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Experimental Observation Questions
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 text-sm sm:text-base mb-3">
                      {oIdx + 1}. {obs.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleCheckObservation(oIdx, optIdx)}
                          className={`p-3 rounded-lg border text-xs sm:text-sm text-left transition-all ${
                            obsAnswers[oIdx] === optIdx
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
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

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: ISC ASSESSMENT CHALLENGES (22 Progressive Challenges) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {CHALLENGES[currentChallengeIndex].difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400">
                    Competency: {CHALLENGES[currentChallengeIndex].competencyLevel}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevChallenge}
                  disabled={currentChallengeIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 disabled:opacity-40 hover:bg-slate-800"
                >
                  ← Previous
                </button>
                <span className="text-xs text-slate-500 font-mono px-2">
                  {currentChallengeIndex + 1}/{CHALLENGES.length}
                </span>
                <button
                  onClick={handleNextChallenge}
                  disabled={selectedChallengeOption === null}
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 border border-cyan-500 text-xs font-bold text-white disabled:opacity-40 hover:bg-cyan-500 shadow-md"
                >
                  Next Challenge →
                </button>
              </div>
            </div>

            {/* Challenge Question Card */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <p className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {CHALLENGES[currentChallengeIndex].options.map((opt, oIdx) => {
                  let optStyle = 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-200';
                  if (selectedChallengeOption === oIdx) {
                    if (oIdx === CHALLENGES[currentChallengeIndex].correctIndex) {
                      optStyle = 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold';
                    } else {
                      optStyle = 'bg-rose-950 border-rose-500 text-rose-300';
                    }
                  } else if (selectedChallengeOption !== null && oIdx === CHALLENGES[currentChallengeIndex].correctIndex) {
                    optStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerChallenge(oIdx)}
                      disabled={selectedChallengeOption !== null}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 ${optStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm border transition-all ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/70 border-emerald-500/80 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-500/80 text-rose-200'
                  }`}
                >
                  <div className="font-bold text-sm mb-1">
                    {challengeFeedback.isCorrect ? '✅ Solution Correct' : '❌ Incorrect Attempt'}
                  </div>
                  <div>{challengeFeedback.text}</div>
                </div>
              )}
            </div>

            {/* Hint Toggle Button */}
            <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
              <button
                onClick={() => {
                  const hints = CHALLENGES[currentChallengeIndex].hints;
                  setCurrentHint(hints[0] || 'Analyze bond angles, orbitals, and inductive displacement.');
                  setShowHint(!showHint);
                  audioManager.play('hint');
                }}
                className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>💡</span> {showHint ? 'Hide Concept Hint' : 'Need a Concept Hint?'}
              </button>
              <span className="font-mono text-slate-500">Node ID: {CHALLENGES[currentChallengeIndex].nodeId}</span>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: MISCONCEPTIONS & DIAGNOSTICS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6">
            {/* Misconceptions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <span>🧠</span> Common Organic Chemistry Misconceptions & Clarifications
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((item) => (
                  <div key={item.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                    <h3 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                      <span>⚠️</span> {item.title}
                    </h3>
                    <p className="text-xs text-rose-300 font-medium">
                      <span className="font-bold">Misconception: </span>
                      {item.misconception}
                    </p>
                    <p className="text-xs text-emerald-300 pt-2 border-t border-slate-900">
                      <span className="font-bold">Scientific Truth: </span>
                      {item.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Assessment Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-sky-400 flex items-center gap-2">
                <span>📋</span> ISC Curriculum Diagnostic Questions
              </h3>

              <div className="space-y-4">
                {DIAGNOSTIC_QUESTIONS.map((diag, dIdx) => (
                  <div key={diag.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p className="font-semibold text-slate-200 text-sm">
                      {dIdx + 1}. {diag.question}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {diag.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-lg border text-xs ${
                            oIdx === diag.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-slate-400 pt-2 italic">
                      Explanation: {diag.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: REAL-WORLD ACTIVITY & SUMMARY */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Container */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <span>🏢</span> Industrial Chemistry & Medical Application
              </div>
              <h2 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="mt-4 space-y-3">
                <h3 className="font-bold text-amber-400 text-sm">Industrial Protocol Execution Steps:</h3>
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Topic Node Mastery Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                <span>📊</span> ISC Topic Node Mastery Map (BKT & SM-2 SRS Matrix)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktStates[nodeId] || createBKTState(nodeId);
                  const mastery = Math.round(masteryProb(bkt) * 100);
                  const config = SUBJECT_CONFIG[nodeId as keyof typeof SUBJECT_CONFIG] || { label: nodeId };

                  return (
                    <div key={nodeId} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-200 truncate max-w-[170px]">
                          {config.label || nodeId}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">{nodeId}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-cyan-400">{mastery}%</div>
                        <div className="text-[9px] text-slate-400">Mastery Level</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Interactive Feedback & Celebration Overlay Components */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Organic Chemistry Challenges Completed!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
};

export default C11_ChemistryOrganicChemistryBasicPrincPart1CBSESim;