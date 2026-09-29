'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, BKTState, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE DEFINITIONS & CONSTANTS
// ============================================================================
const NODE_101 = 'c12_chem_101'; // Williamson Ether Synthesis mechanism & SN2 pathway
const NODE_102 = 'c12_chem_102'; // Alkyl halide substrate limitations: primary vs secondary vs tertiary & E2 competition
const NODE_103 = 'c12_chem_103'; // Alkoxide choice, bulky alkoxides, aryl halides / phenoxide reactions
const NODE_104 = 'c12_chem_104'; // Stereochemistry (Walden inversion vs retention), symmetrical & unsymmetrical ether design

const ALL_NODE_IDS = [NODE_101, NODE_102, NODE_103, NODE_104];

const DEFAULT_PROPS = {
  initialNodeId: NODE_101,
  onComplete: (score: number) => {
    console.log('Sim completed with score:', score);
  }
};

// ============================================================================
// MANDATORY SECTION 1: SCENARIO
// ============================================================================
const SCENARIO = {
  title: 'Organic Synthesis Lab: Williamson Ether Synthesis & Mechanism Controls',
  intro: 'Welcome to the Advanced Organic Synthesis Research Laboratory at ISC Chemistry Institute. You have been tasked with synthesizing customized ethers used in pharmaceutical formulations and high-octane eco-fuels.',
  context: 'In this simulation, you will manipulate alkyl halide substrates, alkoxide bases, and chiral stereocenters to master the SN2 mechanism, bypass E2 elimination traps, and prepare both alkyl and aryl ethers with pinpoint precision.',
};

// ============================================================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ============================================================================
const DISCOVERY_QUESTION = {
  question: 'If you want to synthesize MTBE (Methyl tert-butyl ether, a high-octane gasoline additive), which combination of reactants MUST you select?',
  options: [
    'tert-Butyl bromide + Sodium methoxide',
    'Methyl iodide + Sodium tert-butoxide',
    'Both combinations yield MTBE equally well via SN2 mechanism',
    'Neither combination works; MTBE can only be prepared via SN1 substitution'
  ],
  correctIndex: 1,
  hintAfter: 'Alkoxides are strong bases! Reacting a tertiary alkyl halide with sodium methoxide leads to 100% E2 elimination yielding 2-methylpropene alkene instead of MTBE. The tertiary group MUST come from the alkoxide base.',
};

// ============================================================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ============================================================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: SN2 Backside Attack & Transition State Dynamic',
    instruction: 'Select a methyl or primary alkyl halide and observe the bimolecular backside attack by ethoxide ion. Watch the pentacoordinate transition state and bond cleavage.',
    interactionType: 'mechanism-animator',
    nodeId: NODE_101,
  },
  {
    title: 'Lab 2: Substrate Degree vs Product Distribution (SN2 vs E2 Competition)',
    instruction: 'Switch between primary (1°), secondary (2°), and tertiary (3°) alkyl halides. Measure the ether yield % against the alkene elimination product %.',
    interactionType: 'substrate-degree-tester',
    nodeId: NODE_102,
  },
  {
    title: 'Lab 3: Bulky Alkoxides & Aryl Halide Unreactivity',
    instruction: 'Test reactions using chlorobenzene vs sodium phenoxide. Observe why aryl halides are unreactive toward alkoxides due to resonance double-bond character.',
    interactionType: 'aryl-alkoxide-matrix',
    nodeId: NODE_103,
  },
  {
    title: 'Lab 4: Stereochemical Inversion (Walden Inversion Visualizer)',
    instruction: 'Use an optically active chiral 2-haloalkane substrate. Track the absolute configuration (R vs S) as backside attack causes umbrella flipping.',
    interactionType: 'walden-inversion-3d',
    nodeId: NODE_104,
  },
  {
    title: 'Lab 5: Retrosynthetic Ether Designer Workbench',
    instruction: 'Given a target complex ether, disassemble it into the correct combination of Alkyl Halide (RX) and Sodium Alkoxide (R\'ONa) with 100% atom economy.',
    interactionType: 'retrosynthesis-workbench',
    nodeId: NODE_104,
  },
];

// ============================================================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ============================================================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens when 2-bromopropane (2° alkyl halide) is treated with sodium ethoxide at elevated temperature?',
    options: [
      'Pure ethyl isopropyl ether is formed via exclusive SN2 substitution',
      'Propene alkene is the major product due to competing E2 elimination',
      'No reaction occurs because 2° alkyl halides are completely unreactive',
      'Di-isopropyl ether is formed through a carbocation intermediate'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, set the Alkyl Halide substrate to 2° (Isopropyl Bromide) and observe the major elimination product.',
    nodeId: NODE_102,
  },
  {
    question: 'Predict: If (R)-2-chlorobutane reacts with sodium methoxide via Williamson synthesis, what is the stereochemistry of the resulting ether?',
    options: [
      '(R)-2-methoxybutane with complete retention of configuration',
      '(S)-2-methoxybutane with complete Walden inversion of configuration',
      'A 50:50 racemic mixture of (R) and (S) enantiomers via carbocation',
      'An optically inactive meso compound'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, set the chiral alkyl halide to (R)-2-chlorobutane and observe the stereochemical inversion.',
    nodeId: NODE_104,
  },
];

// ============================================================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ============================================================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the carbon-halogen bond length and charge distribution during the SN2 transition state?',
    observableOptions: [
      'The C-X bond lengthens while C-O bond forms simultaneously, bearing a partial negative charge (δ-) on both O and X',
      'The carbon atom completely loses the halogen first to form a planar carbocation intermediate',
      'The alkoxide oxygen attacks from the same side as the halogen, maintaining positive charge on carbon',
      'No bonds break until the reaction mixture is heated above 200°C'
    ],
    correctIndex: 0,
    nodeId: NODE_101,
  },
  {
    question: 'What happens when chlorobenzene is mixed with sodium ethoxide in an attempt to prepare phenetole (ethyl phenyl ether)?',
    observableOptions: [
      'Phenetole forms rapidly in 99% yield at room temperature',
      'No ether forms because the sp2 C-Cl bond has partial double-bond character and partial electron repulsion',
      'Chlorobenzene breaks into benzene ring and chlorine gas',
      'An explosive E2 elimination occurs forming benzyne exclusively'
    ],
    correctIndex: 1,
    nodeId: NODE_103,
  },
];

// ============================================================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ============================================================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Eco-Fuel Additive Synthesis: MTBE & Anisole Production',
  description: 'Apply Williamson ether synthesis principles to design an industrial 100,000 L/day chemical manufacturing plant for Methyl tert-butyl ether (MTBE) and Anisole (perfume fixative).',
  steps: [
    'Step 1: Calculate stoichiometric requirements for Sodium tert-Butoxide (96.12 g/mol) and Methyl Iodide (141.94 g/mol) for 1,000 moles of MTBE.',
    'Step 2: Compare energy barrier (Ea) of SN2 pathway vs E2 pathway for methyl iodide vs tert-butyl bromide substrate choices.',
    'Step 3: Calculate product yield and solvent recovery efficiency using polar aprotic DMSO solvent.',
    'Step 4: Formulate pure Anisole by reacting Phenol + NaOH → Sodium Phenoxide + CH3Cl → Anisole + NaCl with zero E2 byproduct waste.',
  ],
};

// ============================================================================
// MISCONCEPTIONS DATA
// ============================================================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Choice of Alkyl Halide Degree Does Not Matter',
    description: 'Students believe any combination of alkyl halide and alkoxide yields the desired ether.',
    correction: 'Williamson synthesis proceeds via SN2, which is strongly hindered sterically. 3° alkyl halides undergo 100% E2 elimination with strong alkoxide bases to yield alkenes.',
    nodeId: NODE_102,
  },
  {
    id: 'misc_2',
    title: 'Williamson Ether Synthesis Can Proceed via SN1 Mechanism',
    description: 'Students think bulky substrate forces a carbocation SN1 intermediate.',
    correction: 'Alkoxide ions are powerful strong bases and nucleophiles. Unimolecular SN1 does not occur; instead, steric hindrance shifts the mechanism to concerted E2 elimination.',
    nodeId: NODE_101,
  },
  {
    id: 'misc_3',
    title: 'Di-tert-butyl Ether Can Be Synthesized Using Williamson Synthesis',
    description: 'Assuming tert-butyl bromide + sodium tert-butoxide gives di-tert-butyl ether.',
    correction: 'Di-tert-butyl ether cannot be prepared via Williamson synthesis. 3° haloalkanes undergo fast E2 elimination. Acid-catalyzed addition of tert-butanol to 2-methylpropene is required.',
    nodeId: NODE_102,
  },
  {
    id: 'misc_4',
    title: 'Aryl Halides Can React Directly with Alkoxides',
    description: 'Believing chlorobenzene + sodium methoxide yields anisole.',
    correction: 'Aryl halides are inert to SN2 nucleophilic attack due to resonance delocalization (partial double bond character) and sp2 hybrid carbon. Sodium phenoxide + methyl halide must be used.',
    nodeId: NODE_103,
  },
  {
    id: 'misc_5',
    title: 'Stereochemistry Is Retained at Reaction Center',
    description: 'Assuming chiral alkyl halide retains configuration after substitution.',
    correction: 'Backside attack in SN2 causes 100% stereochemical inversion (Walden inversion) at the chiral reaction center of the alkyl halide.',
    nodeId: NODE_104,
  },
  {
    id: 'misc_6',
    title: 'Polar Protic Solvents Are Ideal for Williamson Synthesis',
    description: 'Believing water or alcohol accelerates the SN2 reaction.',
    correction: 'Protic solvents form hydrogen bonds with alkoxide ions, solvating them and reducing their nucleophilicity. Polar aprotic solvents (DMF, DMSO, acetone) optimize SN2 rates.',
    nodeId: NODE_101,
  },
];

// ============================================================================
// DIAGNOSTIC QUESTIONS
// ============================================================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'What is the molecularity and rate law of the Williamson ether synthesis?',
    options: [
      'Unimolecular, Rate = k[RX]',
      'Bimolecular, Rate = k[RX][RO-]',
      'Bimolecular, Rate = k[RO-]^2',
      'Zero order, Rate = k'
    ],
    correctIndex: 1,
    nodeId: NODE_101,
  },
  {
    id: 'diag_2',
    question: 'Which alkyl halide gives the highest yield of ether in Williamson synthesis?',
    options: ['CH3-Br (Methyl bromide)', 'CH3-CH2-Br (Ethyl bromide)', '(CH3)2CH-Br (Isopropyl bromide)', '(CH3)3C-Br (tert-Butyl bromide)'],
    correctIndex: 0,
    nodeId: NODE_102,
  },
  {
    id: 'diag_3',
    question: 'What organic product is formed when tert-butyl bromide reacts with sodium ethoxide?',
    options: ['tert-Butyl ethyl ether', '2-Methylpropene (Isobutene)', 'Diethyl ether', 'Ethanol only'],
    correctIndex: 1,
    nodeId: NODE_102,
  },
  {
    id: 'diag_4',
    question: 'To prepare Anisole (Methoxybenzene), which reactants should be used?',
    options: [
      'Chlorobenzene + Sodium methoxide',
      'Sodium phenoxide + Methyl iodide',
      'Bromobenzene + Methanol',
      'Phenol + Methane'
    ],
    correctIndex: 1,
    nodeId: NODE_103,
  },
  {
    id: 'diag_5',
    question: 'If (2S)-2-bromobutane is treated with sodium methoxide, what is the absolute configuration of the ether product?',
    options: ['(2R)-2-methoxybutane', '(2S)-2-methoxybutane', 'Racemic (2R/2S)-2-methoxybutane', 'Meso-2-methoxybutane'],
    correctIndex: 0,
    nodeId: NODE_104,
  },
  {
    id: 'diag_6',
    question: 'Which solvent choice maximizes the SN2 rate of Williamson ether synthesis?',
    options: ['Water (H2O)', 'Ethanol (C2H5OH)', 'Dimethyl sulfoxide (DMSO)', 'Glacial acetic acid (CH3COOH)'],
    correctIndex: 2,
    nodeId: NODE_101,
  },
  {
    id: 'diag_7',
    question: 'Why does sodium phenoxide readily react with methyl iodide, but chlorobenzene does not react with sodium methoxide?',
    options: [
      'Phenoxide is a weak base, while methoxide is neutral',
      'C-Cl bond in chlorobenzene has resonance double bond character and electron cloud repulsion',
      'Methyl iodide is insoluble in organic solvents',
      'Benzene ring decomposes in presence of alkoxides'
    ],
    correctIndex: 1,
    nodeId: NODE_103,
  },
  {
    id: 'diag_8',
    question: 'What is the role of sodium metal in preparing alkoxide reagents from alcohols?',
    options: [
      'Oxidizes alcohol to aldehyde',
      'Reduces acidic hydroxyl hydrogen to release hydrogen gas and form sodium alkoxide salt',
      'Acts as a catalyst without being consumed',
      'Dehydrates alcohol into alkene'
    ],
    correctIndex: 1,
    nodeId: NODE_103,
  },
];

// ============================================================================
// 22+ COMPREHENSIVE CHALLENGES ACROSS 3 TIERS
// ============================================================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'recall' | 'understanding' | 'numeric' | 'distinguish' | 'construct' | 'drag-sort';
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
  // FOUNDATION TIER (7 Challenges)
  {
    id: 'chal_01',
    nodeId: NODE_101,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Identification',
    question: 'What fundamental nucleophilic substitution pathway governs the Williamson Ether Synthesis?',
    options: ['SN1 (Unimolecular Substitution)', 'SN2 (Bimolecular Substitution)', 'E1 (Unimolecular Elimination)', 'Electrophilic Aromatic Substitution'],
    correctIndex: 1,
    explanation: 'Williamson ether synthesis is a classic SN2 reaction where the strong alkoxide nucleophile attacks the primary haloalkane in a single concerted step.',
    hints: ['Think about whether carbocations are formed.', 'It involves a nucleophile attacking from the backside.', 'It is a concerted bimolecular reaction.'],
    misconceptionIndex: 1,
  },
  {
    id: 'chal_02',
    nodeId: NODE_102,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Substrate Classification',
    question: 'To achieve high yield of ether in Williamson synthesis, what restriction applies to the haloalkane substrate (R-X)?',
    options: [
      'Must be tertiary (3°)',
      'Must be methyl or primary (1°)',
      'Must be an aryl halide',
      'Must be a vinyl halide'
    ],
    correctIndex: 1,
    explanation: 'Steric hindrance hinders SN2 backside attack. Methyl and 1° alkyl halides offer minimal steric hindrance, ensuring high ether yields.',
    hints: ['Consider steric hindrance.', 'Backside attack needs an unhindered carbon.', '3° halides undergo elimination instead.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_03',
    nodeId: NODE_103,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Reagent Selection',
    question: 'Which reagents are required to synthesize Anisole (Methoxybenzene) cleanly?',
    options: [
      'Chlorobenzene + Sodium methoxide',
      'Sodium phenoxide + Methyl bromide',
      'Bromobenzene + Methanol',
      'Benzene + Methoxy chloride'
    ],
    correctIndex: 1,
    explanation: 'Sodium phenoxide (Ph-O- Na+) reacts via SN2 with primary methyl bromide (CH3Br) to give Anisole cleanly. Chlorobenzene is unreactive.',
    hints: ['Aryl halides cannot undergo SN2 attack.', 'The benzene ring must provide the oxygen nucleophile (Phenoxide).', 'The methyl group must come from a primary halide.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal_04',
    nodeId: NODE_104,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Stereochemical Outcomes',
    question: 'When a chiral alkyl halide undergoes Williamson ether synthesis, what happens to the spatial configuration at the reaction carbon?',
    options: ['100% Stereochemical Retention', '100% Stereochemical Inversion (Walden Inversion)', '50% Inversion, 50% Retention (Racemization)', 'Complete loss of chirality via oxidation'],
    correctIndex: 1,
    explanation: 'SN2 mechanism proceeds strictly via backside attack, leading to complete inversion of configuration (Walden inversion) at the chiral haloalkane carbon.',
    hints: ['Backside attack pushes substituents to the opposite side like an umbrella in strong wind.', 'SN2 causes single-step umbrella inversion.', 'Walden inversion occurs.'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_05',
    nodeId: NODE_102,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Reaction Competition Analysis',
    question: 'What major product is formed when tert-Butyl chloride reacts with Sodium ethoxide?',
    options: ['tert-Butyl ethyl ether', '2-Methylpropene (Isobutene)', 'Diethyl ether', 'Ethanol'],
    correctIndex: 1,
    explanation: 'Tertiary alkyl halides react with strong alkoxide bases exclusively via E2 elimination to give alkenes (2-methylpropene) rather than ethers.',
    hints: ['Alkoxide ions are strong bases as well as nucleophiles.', '3° carbon is sterically blocked from backside attack.', 'E2 elimination predominates.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_06',
    nodeId: NODE_103,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Alkoxide Reagent Synthesis',
    question: 'How are sodium alkoxides (R-O- Na+) prepared from alcohols in laboratory procedures?',
    options: [
      'By reacting alcohol with active sodium metal (Na)',
      'By heating alcohol with concentrated HCl',
      'By bubbling chlorine gas into pure alcohol',
      'By treating alcohol with hydrogen peroxide'
    ],
    correctIndex: 0,
    explanation: 'Alcohols react with active alkali metals like sodium (2 R-OH + 2 Na -> 2 R-O- Na+ + H2) releasing hydrogen gas to yield sodium alkoxides.',
    hints: ['Think of alkali metal redox reaction with acidic OH hydrogen.', 'Sodium releases hydrogen gas.', '2 ROH + 2 Na -> 2 RONa + H2.'],
  },
  {
    id: 'chal_07',
    nodeId: NODE_101,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Solvent Effects',
    question: 'Why are polar aprotic solvents (e.g., DMF, DMSO, Acetone) preferred over polar protic solvents (Water, Ethanol) in Williamson synthesis?',
    options: [
      'Polar protic solvents hydrogen-bond with alkoxide ions, decreasing their nucleophilicity',
      'Polar aprotic solvents convert alkoxides into carbocations',
      'Polar protic solvents cause the ether product to decompose',
      'Polar aprotic solvents make alkyl halides non-polar'
    ],
    correctIndex: 0,
    explanation: 'Protic solvents form strong H-bond cages around alkoxide nucleophiles, lowering their reactivity. Polar aprotic solvents solvate Na+ cations while leaving alkoxide anions naked and highly reactive.',
    hints: ['Hydrogen bonding cages the nucleophile.', 'Naked anions react faster in SN2.', 'Polar aprotic solvents do not form H-bonds with anions.'],
    misconceptionIndex: 5,
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'chal_08',
    nodeId: NODE_102,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Synthetic Route Optimization',
    question: 'Which of the following retrosynthetic pathways is correct for preparing Ethyl isopropyl ether in maximum yield?',
    options: [
      'Path A: Isopropyl bromide + Sodium ethoxide',
      'Path B: Ethyl bromide + Sodium isopropoxide',
      'Both Path A and Path B give equal 100% yield',
      'Neither pathway works; requires acid catalysis'
    ],
    correctIndex: 1,
    explanation: 'Path B uses a 1° alkyl halide (ethyl bromide) with a 2° alkoxide (isopropoxide), avoiding E2 elimination. Path A uses a 2° alkyl halide which suffers significant E2 alkene side-product formation.',
    hints: ['Always choose the primary haloalkane component!', 'Secondary haloalkane undergoes competing E2.', 'Alkoxides can be secondary or tertiary without steric penalty on the haloalkane.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_09',
    nodeId: NODE_101,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Kinetics & Rate Equations',
    question: 'If the concentration of methyl iodide is doubled and the concentration of sodium ethoxide is tripled, by what factor does the rate of Williamson ether synthesis increase?',
    options: ['Factor of 2', 'Factor of 3', 'Factor of 5', 'Factor of 6'],
    correctIndex: 3,
    explanation: 'The reaction is bimolecular SN2 with rate law Rate = k[RX][RO-]. Multiplying [RX] by 2 and [RO-] by 3 gives 2 x 3 = 6-fold rate increase.',
    hints: ['Rate law for SN2 is bimolecular (first order in both reactants).', 'Rate = k[RX][RO-].', '2 x 3 = ?'],
  },
  {
    id: 'chal_10',
    nodeId: NODE_103,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Aromatic Alkylation Comparison',
    question: 'Why does Chlorobenzene fail to react with Sodium ethoxide under normal Williamson conditions?',
    options: [
      'Chlorobenzene is too soluble in ethanol',
      'The sp2 hybridized C-Cl bond has partial double bond character due to resonance and electron repulsion',
      'Ethoxide is too weak a nucleophile to attack neutral molecules',
      'Chlorobenzene forms a stable polymer immediately'
    ],
    correctIndex: 1,
    explanation: 'Resonance donation of chlorine lone pairs into the benzene ring gives the C-Cl bond partial double-bond character. Furthermore, the aromatic pi cloud repels approaching nucleophiles, preventing backside attack.',
    hints: ['Look at resonance structures of chlorobenzene.', 'C-Cl bond is shorter and stronger.', 'The aromatic ring blocks SN2 backside approach.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal_11',
    nodeId: NODE_104,
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Chiral Center Configuration Tracking',
    question: 'If optically pure (R)-2-iodobutane reacts with Sodium ethoxide, what product and configuration are obtained?',
    options: [
      '(S)-2-ethoxybutane',
      '(R)-2-ethoxybutane',
      'Racemic 2-ethoxybutane',
      '1-butene only'
    ],
    correctIndex: 0,
    explanation: 'SN2 substitution at the chiral carbon of (R)-2-iodobutane results in 100% Walden inversion, producing (S)-2-ethoxybutane.',
    hints: ['SN2 converts (R) to (S) when priority order is maintained.', 'Backside attack flips the umbrella.', 'Inversion occurs at the chiral alkyl carbon.'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_12',
    nodeId: NODE_102,
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Symmetrical Tertiary Ether Feasibility',
    question: 'Why can Di-tert-butyl ether NOT be synthesized via Williamson Ether Synthesis?',
    options: [
      'tert-Butyl alcohol is insoluble in alkoxides',
      'Both reactants would require tertiary carbon centers, causing 100% E2 elimination to 2-methylpropene',
      'Sodium tert-butoxide spontaneously explodes',
      'Ether bonds cannot exist between two tertiary carbons'
    ],
    correctIndex: 1,
    explanation: 'Reacting tert-butyl halide with sodium tert-butoxide causes 100% E2 elimination due to extreme steric hindrance around the 3° haloalkane. Symmetrical 3° ethers must be made via acid addition of alkenes.',
    hints: ['What happens when a 3° haloalkane meets a bulky base?', 'E2 elimination happens exclusively.', 'No SN2 substitution can occur at 3° carbon.'],
    misconceptionIndex: 2,
  },
  {
    id: 'chal_13',
    nodeId: NODE_103,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'Phenetole Synthesis Protocol',
    question: 'To prepare Phenetole (Ethoxybenzene), what sequence of chemical steps should be followed?',
    options: [
      'Phenol + NaOH -> Sodium Phenoxide, followed by addition of Ethyl bromide',
      'Chlorobenzene + Ethanol in concentrated sulfuric acid',
      'Benzene + Diethyl ether in aluminum chloride',
      'Phenol + Ethanol heated to 300°C'
    ],
    correctIndex: 0,
    explanation: 'Phenol is deprotonated by NaOH to form nucleophilic sodium phenoxide, which then undergoes SN2 reaction with ethyl bromide to give Phenetole.',
    hints: ['Phenol is acidic enough to be deprotonated by NaOH.', 'Phenoxide ion is an effective oxygen nucleophile.', 'Ethyl bromide is a 1° haloalkane suitable for SN2.'],
  },
  {
    id: 'chal_14',
    nodeId: NODE_104,
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Alkoxide Chiral Center Retention',
    question: 'If (R)-1-phenylethanol is converted to sodium (R)-1-phenylethoxide and reacted with Methyl iodide, what is the configuration of the resulting methyl ether?',
    options: [
      '(S)-1-phenyl-1-methoxyethane',
      '(R)-1-phenyl-1-methoxyethane (Retention)',
      'Racemic mixture',
      'Styrene'
    ],
    correctIndex: 1,
    explanation: 'The chiral carbon is on the ALKOXIDE component. No bond directly attached to the chiral carbon is broken during deprotonation or SN2 attack on methyl iodide. Thus, configuration is RETRAINED.',
    hints: ['Check which bond breaks!', 'The O-H bond breaks during alkoxide formation; C-O bond on the chiral carbon stays intact.', 'Inversion only occurs at the ALKYL HALIDE carbon!'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_15',
    nodeId: NODE_101,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'Transition State Identification',
    question: 'In the SN2 transition state of methyl bromide + ethoxide, what is the hybridization and approximate charge of the central carbon?',
    options: [
      'sp3 hybridized carbon with full +1 positive charge',
      'sp2 hybridized carbon with pentacoordinate geometry and partial negative charges on O and Br',
      'sp hybridized linear carbon with zero charge',
      'Unhybridized free radical carbon'
    ],
    correctIndex: 1,
    explanation: 'The SN2 transition state features a trigonal bipyramidal central carbon with sp2 hybridization. Entering alkoxide nucleophile and leaving bromide group share partial negative charges (δ-).',
    hints: ['The central carbon is bonded partially to 5 groups in the transition state.', 'Three non-reacting bonds lie in a plane (sp2).', 'Nucleophile and leaving group are at 180°.'],
  },

  // ADVANCED TIER (7 Challenges)
  {
    id: 'chal_16',
    nodeId: NODE_102,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'Multi-Step Retrosynthetic Strategy',
    question: 'Design a high-yield industrial synthesis for 2-methoxy-2-methylpropane (MTBE) starting from Isobutene (2-methylpropene) and Methanol.',
    options: [
      'Route A: Isobutene + HBr -> tert-Butyl bromide; then + Sodium methoxide',
      'Route B: Isobutene + CH3OH in presence of acidic ion-exchange resin catalyst (H+)',
      'Route C: Isobutene + Cl2 -> 1,2-dichlorobutane; then + Sodium methoxide',
      'Route D: Isobutene + NaOH -> Sodium isobutoxide; then + Methyl iodide'
    ],
    correctIndex: 1,
    explanation: 'Route A fails because tert-butyl bromide + sodium methoxide gives 100% E2 elimination back to isobutene! Route B is the industrial acid-catalyzed addition of alcohol to alkene, circumventing E2 limitations.',
    hints: ['Remember that 3° alkyl halides fail in Williamson synthesis.', 'Acid-catalyzed addition of CH3OH to isobutene forms a stable 3° carbocation.', 'This avoids E2 elimination completely.'],
    misconceptionIndex: 2,
  },
  {
    id: 'chal_17',
    nodeId: NODE_104,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Intramolecular Williamson Ether Synthesis',
    question: 'When 2-bromoethanol is treated with Sodium hydroxide, an intramolecular Williamson ether synthesis occurs. What cyclic ether product is formed?',
    options: ['Oxirane (Ethylene oxide)', 'Oxetane', 'Tetrahydrofuran (THF)', '1,4-Dioxane'],
    correctIndex: 0,
    explanation: 'Base deprotonates the -OH group to form a 2-haloalkoxide intermediate (Br-CH2-CH2-O-), which undergoes rapid intramolecular SN2 substitution to form a 3-membered cyclic ether (Oxirane/Ethylene oxide).',
    hints: ['Count the ring size formed by intramolecular attack of O- on CH2.', 'O attacks adjacent C bearing Br.', 'Creates a 3-membered epoxide ring.'],
  },
  {
    id: 'chal_18',
    nodeId: NODE_101,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Thermodynamics & Atom Economy',
    question: 'Calculate the theoretical percentage Atom Economy for synthesizing Diethyl ether via Williamson synthesis (CH3CH2Br + CH3CH2ONa -> CH3CH2OCH2CH3 + NaBr). Molar masses: EtBr=108.97, EtONa=68.05, Et2O=74.12, NaBr=102.89 g/mol.',
    options: ['41.8%', '58.2%', '74.1%', '100%'],
    correctIndex: 0,
    explanation: 'Atom Economy = (MW of desired product / Total MW of reactants) x 100 = (74.12 / (108.97 + 68.05)) x 100 = (74.12 / 177.02) x 100 = 41.87%.',
    hints: ['Formula: (Desired Product Mass / Total Reactant Mass) x 100', 'Total reactant mass = 108.97 + 68.05 = 177.02 g/mol', 'Desired product mass = 74.12 g/mol'],
  },
  {
    id: 'chal_19',
    nodeId: NODE_103,
    type: 'understanding',
    difficulty: 'advanced',
    competencyLevel: 'Crown Ether Selectivity & Phase Transfer',
    question: 'Why does adding 18-Crown-6 ether dramatically accelerate Williamson synthesis of ethers using potassium alkoxides in non-polar benzene solvent?',
    options: [
      '18-Crown-6 selectively complexates K+ cations, leaving alkoxide anions unsolvated and super-nucleophilic',
      '18-Crown-6 oxidizes the alkyl halide to a carbocation',
      '18-Crown-6 lowers the boiling point of benzene',
      '18-Crown-6 reacts directly with alkyl halide to form ester'
    ],
    correctIndex: 0,
    explanation: '18-Crown-6 specifically binds K+ ions inside its cavity, solubilizing potassium alkoxide in non-polar solvents and leaving the alkoxide anion "naked" with exceptionally high SN2 nucleophilicity.',
    hints: ['Crown ethers trap alkali metal cations in cavity.', 'Separates cation from anion.', 'Creates "naked" super-reactive anions.'],
  },
  {
    id: 'chal_20',
    nodeId: NODE_104,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'Stereospecific Double Walden Inversion',
    question: 'How can you convert (R)-2-butanol into (R)-2-methoxybutane (preserving overall configuration) using Williamson ether synthesis principles?',
    options: [
      'Step 1: Convert alcohol to tosylate (TsCl/Pyridine, retention); Step 2: React with NaOCH3 (inversion gives S). (Fails retention target)',
      'Step 1: React alcohol with Na metal to form alkoxide (retention); Step 2: React with Methyl iodide (retention at alkoxide center -> R product)',
      'React (R)-2-butanol directly with CH3OH and H2SO4',
      'Convert alcohol to alkyl chloride with SOCl2 in ether, then add NaOCH3'
    ],
    correctIndex: 1,
    explanation: 'Forming the alkoxide salt breaks the O-H bond, NOT the C-O bond at the chiral center (retention). Subsequent SN2 attack on methyl iodide breaks C-I bond of methyl iodide, retaining stereochemistry at the 2-butyl carbon!',
    hints: ['Keep the chiral carbon on the ALKOXIDE side!', 'Deprotonation of O-H does not alter stereocenter configuration.', 'SN2 on CH3I occurs at methyl carbon, keeping 2-butyl chiral center intact.'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_21',
    nodeId: NODE_102,
    type: 'understanding',
    difficulty: 'advanced',
    competencyLevel: 'Temperature Control in Competition Reactions',
    question: 'When reacting secondary bromocyclohexane with sodium methoxide, how does lowering reaction temperature from 80°C to 0°C affect product selectivity?',
    options: [
      'Increases relative proportion of Methoxycyclohexane (SN2) over Cyclohexene (E2) because E2 has higher activation energy (Ea)',
      'Increases Cyclohexene yield to 100%',
      'Stops reaction entirely with zero product',
      'Causes rearrangement to methylcyclopentane'
    ],
    correctIndex: 0,
    explanation: 'Elimination (E2) pathways generally have higher activation energies (Ea) and higher entropy requirement than substitution (SN2). Lower temperatures favor SN2 substitution over E2 elimination.',
    hints: ['Elimination has higher activation energy and higher ΔS than substitution.', 'Higher temperatures favor elimination (E2).', 'Lower temperatures favor substitution (SN2).'],
  },
  {
    id: 'chal_22',
    nodeId: NODE_101,
    type: 'understanding',
    difficulty: 'advanced',
    competencyLevel: 'Energy Profile Coordinate Analysis',
    question: 'On an energy vs reaction coordinate diagram for SN2 Williamson synthesis, what does the peak of the activation curve represent?',
    options: [
      'A pentacoordinate activated transition state [RO···C��··X]‡ with maximum Gibbs free energy',
      'A carbocation intermediate in an energy well',
      'The isolated ether product state',
      'The sodium halide salt precipitate'
    ],
    correctIndex: 0,
    explanation: 'The transition state [RO···C···X]‡ is a local energy maximum featuring partial bond formation and breaking, with sp2 carbon geometry and no finite lifetime.',
    hints: ['SN2 has no stable intermediate.', 'The activation peak is the transition state ‡.', 'It features partial C-O and C-X bonds.'],
    misconceptionIndex: 1,
  },
];

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM 1: SN2 Mechanism & Transition State
// ============================================================================
const SN2MechanismSVG: React.FC<{
  progress: number; // 0 to 1
  substrateType: 'primary' | 'secondary' | 'tertiary';
  isReversing?: boolean;
}> = ({ progress, substrateType }) => {
  // Calculate spatial coordinates for atoms during SN2 backside attack
  const is3Deg = substrateType === 'tertiary';
  const is2Deg = substrateType === 'secondary';

  // Backside attack x positions
  const nucleophileX = 80 + progress * 140; // 80 -> 220
  const leavingGroupX = 280 + progress * 100; // 280 -> 380

  // Hydrogens / alkyl groups flipping coordinates (Walden umbrella inversion)
  const angle = (progress - 0.5) * Math.PI * 0.8; // -0.4 pi to +0.4 pi
  const topSubstituentY = 150 - Math.sin(angle) * 50;
  const topSubstituentX = 220 + Math.cos(angle) * 35;

  const botSubstituentY = 250 + Math.sin(angle) * 50;
  const botSubstituentX = 220 + Math.cos(angle) * 35;

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 shadow-inner border border-slate-800">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
          Dynamic Visualizer: SN2 Backside Attack & Transition State
        </span>
        <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
          Progress: {Math.round(progress * 100)}%
        </span>
      </div>

      <svg viewBox="0 0 500 320" className="w-full h-64 bg-slate-950 rounded-lg">
        <defs>
          <radialGradient id="nucGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
          <radialGradient id="carbonGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </radialGradient>
          <radialGradient id="halideGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Reaction Coordinate Guide Line */}
        <line x1="40" y1="200" x2="460" y2="200" stroke="#334155" strokeDasharray="4 4" strokeWidth="1.5" />

        {/* Transition State Bracket (Shown around progress 0.5) */}
        {progress > 0.35 && progress < 0.65 && (
          <g filter="url(#glow)">
            <path d="M 170 80 L 150 80 L 150 280 L 170 280" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 270 80 L 290 80 L 290 280 L 270 280" fill="none" stroke="#f59e0b" strokeWidth="2" />
            <text x="295" y="95" fill="#f59e0b" fontSize="18" fontWeight="bold">‡</text>
            <text x="200" y="65" fill="#f59e0b" fontSize="12" textAnchor="middle" className="font-semibold">
              [Trigonal Bipyramidal TS]
            </text>
          </g>
        )}

        {/* Incoming Alkoxide Nucleophile (RO-) */}
        <g transform={`translate(${nucleophileX}, 200)`}>
          <line x1="0" y1="0" x2={220 - nucleophileX} y2="0" stroke="#38bdf8" strokeWidth={progress > 0.3 && progress < 0.7 ? "2" : "0"} strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="22" fill="url(#nucGrad)" />
          <text x="0" y="5" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
            R-O⁻
          </text>
          {progress < 0.5 && (
            <text x="-30" y="-15" fill="#38bdf8" fontSize="11" fontWeight="bold">
              δ⁻
            </text>
          )}
        </g>

        {/* Central Electrophilic Carbon Atom */}
        <g transform="translate(220, 200)">
          <circle cx="0" cy="0" r="18" fill="url(#carbonGrad)" stroke="#cbd5e1" strokeWidth="2" />
          <text x="0" y="4" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
            C
          </text>
        </g>

        {/* Substituents attached to central Carbon (flipping umbrella) */}
        {/* Top substituent */}
        <line x1="220" y1="200" x2={topSubstituentX} y2={topSubstituentY} stroke="#94a3b8" strokeWidth="4" />
        <circle cx={topSubstituentX} cy={topSubstituentY} r={is3Deg ? "16" : is2Deg ? "14" : "10"} fill={is3Deg ? "#e11d48" : "#64748b"} />
        <text x={topSubstituentX} y={topSubstituentY + 4} fill="#fff" fontSize="10" textAnchor="middle">
          {is3Deg ? "CH₃" : is2Deg ? "CH₃" : "H"}
        </text>

        {/* Bottom substituent */}
        <line x1="220" y1="200" x2={botSubstituentX} y2={botSubstituentY} stroke="#94a3b8" strokeWidth="4" />
        <circle cx={botSubstituentX} cy={botSubstituentY} r={is3Deg ? "16" : "10"} fill={is3Deg ? "#e11d48" : "#64748b"} />
        <text x={botSubstituentX} y={botSubstituentY + 4} fill="#fff" fontSize="10" textAnchor="middle">
          {is3Deg ? "CH���" : "H"}
        </text>

        {/* Front substituent (Facing user) */}
        <line x1="220" y1="200" x2="220" y2="130" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="2 2" />
        <circle cx="220" cy="125" r="10" fill="#64748b" />
        <text x="220" y="129" fill="#fff" fontSize="10" textAnchor="middle">
          {is3Deg || is2Deg ? "R" : "H"}
        </text>

        {/* Leaving Group Halide (X-) */}
        <g transform={`translate(${leavingGroupX}, 200)`}>
          <line x1={220 - leavingGroupX} y1="0" x2="0" y2="0" stroke="#f87171" strokeWidth={progress > 0.3 && progress < 0.7 ? "2" : "0"} strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="20" fill="url(#halideGrad)" />
          <text x="0" y="5" fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="bold">
            X⁻
          </text>
          {progress > 0.4 && (
            <text x="25" y="-15" fill="#f87171" fontSize="11" fontWeight="bold">
              δ⁻
            </text>
          )}
        </g>

        {/* Explanation Banner */}
        <rect x="20" y="275" width="460" height="35" rx="6" fill="#0f172a" stroke="#1e293b" />
        <text x="250" y="297" fill="#e2e8f0" fontSize="11" textAnchor="middle">
          {progress < 0.3
            ? '1. Nucleophile approaches electrophilic carbon from 180° opposite to halogen'
            : progress < 0.7
            ? '2. Pentacoordinate Transition State [RO···C···X]‡: Simultaneous bond making and breaking'
            : '3. Product Ether formed with 100% stereochemical inversion (Walden Inversion)'}
        </text>
      </svg>
    </div>
  );
};

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM 2: Substrate Degree Matrix & E2 Competition
// ============================================================================
const SubstrateMatrixSVG: React.FC<{
  selectedDegree: '1deg' | '2deg' | '3deg' | 'aryl';
}> = ({ selectedDegree }) => {
  const info = {
    '1deg': {
      title: '1° Alkyl Halide (e.g. CH3-CH2-Br)',
      sn2Yield: 95,
      e2Yield: 5,
      mechanism: 'Exclusive SN2 Substitution',
      product: 'Ether (Primary Target)',
      color: '#10b981',
      details: 'Unsterically hindered carbon allows rapid backside attack by alkoxide. High product yield.'
    },
    '2deg': {
      title: '2° Alkyl Halide (e.g. (CH3)2CH-Br)',
      sn2Yield: 25,
      e2Yield: 75,
      mechanism: 'Competing SN2 + E2 Elimination',
      product: 'Alkene (Major) + Ether (Minor)',
      color: '#f59e0b',
      details: 'Steric crowding slows SN2 attack. Strongly basic alkoxide abstracts β-hydrogen to form alkene.'
    },
    '3deg': {
      title: '3° Alkyl Halide (e.g. (CH3)3C-Br)',
      sn2Yield: 0,
      e2Yield: 100,
      mechanism: 'Exclusive E2 Elimination',
      product: '2-Methylpropene Alkene ONLY',
      color: '#ef4444',
      details: 'Backside attack completely blocked by methyl groups. Alkoxide acts purely as a strong base!'
    },
    'aryl': {
      title: 'Aryl Halide (e.g. C6H5-Cl Chlorobenzene)',
      sn2Yield: 0,
      e2Yield: 0,
      mechanism: 'NO REACTION under standard conditions',
      product: 'Unreacted Starting Material',
      color: '#64748b',
      details: 'sp2 hybridized carbon and resonance double-bond character prevent nucleophilic substitution.'
    }
  }[selectedDegree];

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-800">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-sm font-bold text-slate-200">
          Substrate Profile: {info.title}
        </h4>
        <span className="text-xs px-2.5 py-1 rounded-full font-semibold text-white" style={{ backgroundColor: info.color }}>
          {info.mechanism}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Yield Bar Chart SVG */}
        <svg viewBox="0 0 260 160" className="w-full h-40 bg-slate-950 rounded-lg p-2">
          <text x="130" y="20" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">
            Product Yield Distribution (%)
          </text>

          {/* Ether Yield Bar */}
          <text x="20" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">Ether (SN2):</text>
          <rect x="100" y="42" width="130" height="18" rx="4" fill="#1e293b" />
          <rect x="100" y="42" width={(info.sn2Yield / 100) * 130} height="18" rx="4" fill="#38bdf8" />
          <text x="235" y="55" fill="#e2e8f0" fontSize="11" fontWeight="bold">{info.sn2Yield}%</text>

          {/* Alkene Yield Bar */}
          <text x="20" y="105" fill="#f43f5e" fontSize="11" fontWeight="bold">Alkene (E2):</text>
          <rect x="100" y="92" width="130" height="18" rx="4" fill="#1e293b" />
          <rect x="100" y="92" width={(info.e2Yield / 100) * 130} height="18" rx="4" fill="#f43f5e" />
          <text x="235" y="105" fill="#e2e8f0" fontSize="11" fontWeight="bold">{info.e2Yield}%</text>

          <line x1="20" y1="135" x2="240" y2="135" stroke="#334155" />
          <text x="130" y="150" fill="#a1a1aa" fontSize="10" textAnchor="middle">
            Major Organic Product: <tspan fill="#ffffff" fontWeight="bold">{info.product}</tspan>
          </text>
        </svg>

        {/* Mechanism Explanation Card */}
        <div className="bg-slate-950 rounded-lg p-3 text-xs text-slate-300 flex flex-col justify-between border border-slate-800">
          <div>
            <div className="text-gold-400 font-bold mb-1 uppercase tracking-wide">Mechanistic Assessment</div>
            <p className="leading-relaxed text-slate-300">{info.details}</p>
          </div>
          <div className="mt-3 p-2 bg-slate-900/80 rounded border border-slate-800">
            <span className="text-amber-400 font-semibold">Key Takeaway: </span>
            {selectedDegree === '3deg'
              ? 'To form ethers with tertiary alkyl groups, place the 3° group on the ALKOXIDE reagent, not the haloalkane!'
              : selectedDegree === 'aryl'
              ? 'Use Sodium Phenoxide + Alkyl Halide to form aryl alkyl ethers like Anisole!'
              : selectedDegree === '2deg'
              ? 'Lowering temperature and using less sterically bulky alkoxide improves SN2 yield.'
              : 'Primary alkyl halides are ideal substrates for high-yield Williamson ether synthesis.'}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM 3: Aryl Halide Unreactivity vs Phenoxide Reactivity
// ============================================================================
const ArylVsPhenoxideSVG: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 border border-slate-800">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
        Aromatic Ether Controls: Chlorobenzene Failure vs Phenoxide Alkylation Success
      </h4>
      <svg viewBox="0 0 520 220" className="w-full h-52 bg-slate-950 rounded-lg">
        {/* LEFT PANEL: FAILED ATTEMPT (Chlorobenzene + Sodium Methoxide) */}
        <g transform="translate(10, 10)">
          <rect x="0" y="0" width="240" height="195" rx="8" fill="#1e1b4b" stroke="#312e81" opacity="0.6" />
          <text x="120" y="22" fill="#f87171" fontSize="11" textAnchor="middle" fontWeight="bold">
            FAILED ROUTE ❌
          </text>
          <text x="120" y="38" fill="#cbd5e1" fontSize="10" textAnchor="middle">
            Chlorobenzene + NaOCH3
          </text>

          {/* Benzene ring with Cl */}
          <polygon points="60,80 80,60 110,60 130,80 110,100 80,100" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="95" cy="80" r="14" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="130" y1="80" x2="155" y2="80" stroke="#f87171" strokeWidth="3" />
          <text x="165" y="84" fill="#f87171" fontSize="12" fontWeight="bold">Cl</text>

          <text x="120" y="130" fill="#f87171" fontSize="11" textAnchor="middle" fontWeight="bold">
            NO REACTION!
          </text>
          <text x="120" y="150" fill="#94a3b8" fontSize="9" textAnchor="middle">
            1. Partial C=Cl double bond character
          </text>
          <text x="120" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">
            2. sp2 carbon repels backside attack
          </text>
          <text x="120" y="180" fill="#94a3b8" fontSize="9" textAnchor="middle">
            3. Ring pi cloud repels CH3O⁻
          </text>
        </g>

        {/* RIGHT PANEL: SUCCESSFUL ROUTE (Sodium Phenoxide + CH3I) */}
        <g transform="translate(270, 10)">
          <rect x="0" y="0" width="240" height="195" rx="8" fill="#064e3b" stroke="#047857" opacity="0.6" />
          <text x="120" y="22" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">
            SUCCESSFUL ROUTE (ANISOLE)
          </text>
          <text x="120" y="38" fill="#cbd5e1" fontSize="10" textAnchor="middle">
            Sodium Phenoxide + CH3I
          </text>

          {/* Phenoxide ring */}
          <polygon points="50,80 70,60 100,60 120,80 100,100 70,100" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="85" cy="80" r="14" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="120" y1="80" x2="140" y2="80" stroke="#34d399" strokeWidth="2" />
          <text x="145" y="84" fill="#34d399" fontSize="11" fontWeight="bold">O⁻ Na⁺</text>

          {/* Plus CH3I */}
          <text x="185" y="84" fill="#38bdf8" fontSize="11" fontWeight="bold">+ CH3I</text>

          <text x="120" y="130" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">
            100% CLEAN SN2 ATTACK!
          </text>
          <text x="120" y="150" fill="#a7f3d0" fontSize="9" textAnchor="middle">
            Phenoxide oxygen is strongly nucleophilic
          </text>
          <text x="120" y="165" fill="#a7f3d0" fontSize="9" textAnchor="middle">
            Methyl iodide has no steric hindrance
          </text>
          <text x="120" y="180" fill="#a7f3d0" fontSize="9" textAnchor="middle">
            Yields Anisole (Methoxybenzene)
          </text>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS
// ============================================================================
export const C12_ChemistryWilliamsonethersynthesisSim: React.FC<{
  initialNodeId?: string;
  onComplete?: (score: number) => void;
}> = ({ initialNodeId = NODE_101, onComplete }) => {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Node & Mastery Tracking
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const init: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      init[id] = createBKTState();
    });
    return init;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const init: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      init[c.id] = createReviewItem(c.id);
    });
    return init;
  });

  // Simulation Lab Control States
  const [labSubstrate, setLabSubstrate] = useState<'1deg' | '2deg' | '3deg' | 'aryl'>('1deg');
  const [labAlkoxide, setLabAlkoxide] = useState<'methoxide' | 'ethoxide' | 'tert-butoxide' | 'phenoxide'>('methoxide');
  const [labSolvent, setLabSolvent] = useState<'dmso' | 'ethanol' | 'water'>('dmso');
  const [labTemp, setLabTemp] = useState<number>(25); // Celsius
  const [animProgress, setAnimProgress] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Retrosynthesis Workbench State
  const [targetEther, setTargetEther] = useState<'mtbe' | 'anisole' | 'diethyl' | 'sec-butyl-ethyl'>('mtbe');
  const [selectedHalideChoice, setSelectedHalideChoice] = useState<string>('');
  const [selectedAlkoxideChoice, setSelectedAlkoxideChoice] = useState<string>('');
  const [retroResult, setRetroResult] = useState<string | null>(null);

  // Discovery & Predictions State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Mode State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completedChallengesCount, setCompletedChallengesCount] = useState<number>(0);

  // Feedback Component Props
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Auto-Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const currentChal = CHALLENGES[currentChallengeIdx];
      if (activeTab === 'challenges' && !challengeSubmitted && currentChal) {
        setCurrentHint(`Auto-Hint: ${currentChal.hints[0]}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [activeTab, challengeSubmitted, currentChallengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetInactivityTimer]);

  // Animation Loop for Mechanism Canvas
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAnimating) {
      timer = setInterval(() => {
        setAnimProgress((prev) => {
          if (prev >= 1) {
            setIsAnimating(false);
            return 1;
          }
          return prev + 0.02;
        });
      }, 30);
    }
    return () => clearInterval(timer);
  }, [isAnimating]);

  // Handle Lab Reaction Animation Trigger
  const handleRunReaction = () => {
    setAnimProgress(0);
    setIsAnimating(true);
    audioManager.play('whoosh');
    speechManager.speak('Initiating nucleophilic attack. Watch the transition state form.');
  };

  // Retrosynthesis Check
  const handleVerifyRetrosynthesis = () => {
    let isCorrect = false;
    let message = '';

    if (targetEther === 'mtbe') { // Methyl tert-butyl ether
      if (selectedHalideChoice === 'CH3I' && selectedAlkoxideChoice === '(CH3)3CONa') {
        isCorrect = true;
        message = 'PERFECT! 1° Methyl iodide + 3° Sodium tert-butoxide gives 100% MTBE yield without E2 side reaction!';
      } else if (selectedHalideChoice === '(CH3)3CBr') {
        message = 'FAILED! 3° Alkyl halide undergoes 100% E2 elimination to 2-methylpropene. MTBE yield is 0%.';
      } else {
        message = 'Incorrect combination for MTBE synthesis.';
      }
    } else if (targetEther === 'anisole') { // Anisole
      if (selectedHalideChoice === 'CH3I' && selectedAlkoxideChoice === 'PhONa') {
        isCorrect = true;
        message = 'EXCELLENT! Sodium phenoxide + Methyl iodide yields Anisole cleanly.';
      } else if (selectedHalideChoice === 'PhCl') {
        message = 'FAILED! Chlorobenzene is unreactive toward alkoxides due to partial double bond character.';
      } else {
        message = 'Incorrect reagents for Anisole synthesis.';
      }
    } else if (targetEther === 'diethyl') {
      if (selectedHalideChoice === 'CH3CH2Br' && selectedAlkoxideChoice === 'CH3CH2ONa') {
        isCorrect = true;
        message = 'CORRECT! Symmetrical diethyl ether formed cleanly via SN2.';
      } else {
        message = 'Select Ethyl bromide + Sodium ethoxide.';
      }
    } else if (targetEther === 'sec-butyl-ethyl') {
      if (selectedHalideChoice === 'CH3CH2Br' && selectedAlkoxideChoice === 'sec-BuONa') {
        isCorrect = true;
        message = 'OPTIMAL! Using 1° Ethyl bromide avoids E2 elimination at the secondary carbon!';
      } else if (selectedHalideChoice === 'sec-BuBr') {
        message = 'SUB-OPTIMAL! 2° Alkyl halide undergoes ~75% E2 elimination, lowering ether yield.';
      } else {
        message = 'Try using the primary alkyl halide component.';
      }
    }

    setRetroResult(message);
    if (isCorrect) {
      audioManager.play('success');
      setShowSparkle(true);
      speechManager.speak('Retrosynthetic route verified successfully.');
    } else {
      audioManager.play('error');
    }
  };

  // Handle Challenge Option Selection
  const handleSelectOption = (idx: number) => {
    if (challengeSubmitted) return;
    setSelectedOptionIdx(idx);
    audioManager.play('tap');
    resetInactivityTimer();
  };

  // Handle Submit Challenge
  const handleSubmitChallenge = () => {
    if (selectedOptionIdx === null || challengeSubmitted) return;

    const currentChal = CHALLENGES[currentChallengeIdx];
    const isCorrect = selectedOptionIdx === currentChal.correctIndex;
    setChallengeSubmitted(true);

    // BKT & SM2 Updates
    const node = currentChal.nodeId;
    const updatedBkt = bktUpdate(bktStates[node] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [node]: updatedBkt }));

    const updatedSrs = sm2Update(srsItems[currentChal.id] || createReviewItem(currentChal.id), isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChal.id]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setScore((prev) => prev + 10);
      speechManager.speak('Correct analysis! Outstanding chemistry reasoning.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect choice. Review the SN2 stereochemical and steric parameters.');
    }
  };

  // Next Challenge
  const handleNextChallenge = () => {
    setCompletedChallengesCount((prev) => prev + 1);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setChallengeSubmitted(false);
      setShowHint(false);
      audioManager.play('swoop');
    } else {
      // Completed all challenges
      const finalScore = score + 20;
      recordGameScore('williamson-ether-sim', finalScore);
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have mastered Williamson Ether Synthesis and stereochemical controls.');
      if (onComplete) onComplete(finalScore);
    }
  };

  // Computed Overall Mastery
  const overallMastery = useMemo(() => {
    const total = ALL_NODE_IDS.reduce((acc, id) => acc + masteryProb(bktStates[id]), 0);
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none">
      {/* Feedback FX Components */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Achieved! Williamson Synthesis Certificate Issued." />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* TOP NAV BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/30">
            <span className="text-xl font-black text-white">R-O</span>
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-gold-400 via-gold-200 to-gold-300 bg-clip-text text-transparent">
              Williamson Ether Synthesis Lab
            </h1>
            <p className="text-xs text-slate-400">Class 12 Chemistry • CISCE / ISC Standard</p>
          </div>
        </div>

        {/* TOP METRICS DISPLAY */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Lab Mastery</div>
            <div className="text-sm font-extrabold text-gold-400">{overallMastery}%</div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Sim Score</div>
            <div className="text-sm font-extrabold text-amber-400">{score} pts</div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'lab', label: '2. Dynamic Lab' },
            { id: 'challenges', label: `3. Challenges (${currentChallengeIdx + 1}/${CHALLENGES.length})` },
            { id: 'summary', label: '4. Synthesis Summary' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-gold-950 to-slate-900 border border-gold-900/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">
                <span>🔬 ISC Organic Synthesis Research Context</span>
              </div>
              <h2 className="text-2xl font-black text-white mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950/70 rounded-xl p-4 border border-gold-800/30 text-xs text-gold-200">
                <span className="font-bold text-gold-400">Lab Mission: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                <span>💡 Pre-Lab Discovery Challenge</span>
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDiscoverySelected(i);
                      setDiscoveryAnswered(true);
                      if (i === DISCOVERY_QUESTION.correctIndex) {
                        audioManager.play('drop-correct');
                        speechManager.speak('Correct discovery insight! Sodium tert-butoxide must be used.');
                      } else {
                        audioManager.play('drop-wrong');
                      }
                    }}
                    className={`p-3.5 rounded-xl text-xs text-left border transition-all ${
                      discoverySelected === i
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{['A', 'B', 'C', 'D'][i]}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="p-4 rounded-xl bg-slate-950 border border-gold-800/50 text-xs text-gold-300 leading-relaxed">
                  <span className="font-bold text-gold-400">Mechanistic Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                Hypothesis & Mechanism Predictions
              </h3>
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs font-bold text-slate-200 mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setPredictionAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-2.5 rounded-lg text-xs text-left border ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">Verify in Lab: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: DYNAMIC INTERACTIVE LAB */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Interactive Reaction Workstation */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-base font-bold text-gold-400">
                    Interactive Mechanism & Substrate Controls
                  </h3>
                  <p className="text-xs text-slate-400">
                    Adjust substrate degree, alkoxide base strength, and solvent type to observe SN2 vs E2 competition.
                  </p>
                </div>
                <button
                  onClick={handleRunReaction}
                  className="px-5 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-extrabold rounded-xl text-xs hover:brightness-110 shadow-lg shadow-gold-500/20 active:scale-95 transition-all"
                >
                  ▶ Run Nucleophilic Reaction
                </button>
              </div>

              {/* Lab Control Sliders / Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Control 1: Alkyl Halide Degree */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    1. Alkyl Halide Substrate (R-X)
                  </label>
                  <select
                    value={labSubstrate}
                    onChange={(e) => {
                      setLabSubstrate(e.target.value as typeof labSubstrate);
                      audioManager.play('pop');
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:border-gold-500 focus:outline-none"
                  >
                    <option value="1deg">1° Ethyl Bromide (CH3CH2Br) - Unhindered</option>
                    <option value="2deg">2° Isopropyl Bromide ((CH3)2CHBr) - Moderately Crowded</option>
                    <option value="3deg">3° tert-Butyl Bromide ((CH3)3CBr) - Highly Crowded</option>
                    <option value="aryl">Aryl Chlorobenzene (C6H5Cl) - Resonance Stabilized</option>
                  </select>
                </div>

                {/* Control 2: Alkoxide Base */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    2. Alkoxide Reagent (R'-O⁻ Na⁺)
                  </label>
                  <select
                    value={labAlkoxide}
                    onChange={(e) => {
                      setLabAlkoxide(e.target.value as typeof labAlkoxide);
                      audioManager.play('pop');
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:border-gold-500 focus:outline-none"
                  >
                    <option value="methoxide">Sodium Methoxide (CH3ONa) - Small Nucleophile</option>
                    <option value="ethoxide">Sodium Ethoxide (CH3CH2ONa) - Unhindered</option>
                    <option value="tert-butoxide">Sodium tert-Butoxide ((CH3)3CONa) - Bulky Base</option>
                    <option value="phenoxide">Sodium Phenoxide (C6H5ONa) - Resonance Nucleophile</option>
                  </select>
                </div>

                {/* Control 3: Solvent System */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    3. Reaction Solvent
                  </label>
                  <select
                    value={labSolvent}
                    onChange={(e) => {
                      setLabSolvent(e.target.value as typeof labSolvent);
                      audioManager.play('pop');
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg p-2 focus:border-gold-500 focus:outline-none"
                  >
                    <option value="dmso">DMSO (Polar Aprotic) - Maximum SN2 Rate</option>
                    <option value="ethanol">Ethanol (Polar Protic) - H-Bond Cages Alkoxide</option>
                    <option value="water">Water (Aqueous Base) - Hydrolysis Competition</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Mechanism SVG Animator */}
              <SN2MechanismSVG
                progress={animProgress}
                substrateType={labSubstrate === '1deg' ? 'primary' : labSubstrate === '2deg' ? 'secondary' : 'tertiary'}
              />

              {/* Substrate Matrix Chart */}
              <div className="mt-6">
                <SubstrateMatrixSVG selectedDegree={labSubstrate} />
              </div>

              {/* Aryl vs Phenoxide SVG */}
              <div className="mt-6">
                <ArylVsPhenoxideSVG />
              </div>
            </div>

            {/* Retrosynthetic Ether Designer Workbench */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-emerald-400 mb-2">
                Retrosynthetic Ether Designer Workbench
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Target Ether Disassembly: Choose the optimal Alkyl Halide + Sodium Alkoxide pair to synthesize the target ether with 100% yield.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Target Selection */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Target Ether</label>
                  <select
                    value={targetEther}
                    onChange={(e) => {
                      setTargetEther(e.target.value as typeof targetEther);
                      setRetroResult(null);
                    }}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded p-1.5"
                  >
                    <option value="mtbe">MTBE (Methyl tert-butyl ether)</option>
                    <option value="anisole">Anisole (Methoxybenzene)</option>
                    <option value="diethyl">Diethyl Ether</option>
                    <option value="sec-butyl-ethyl">2-Ethoxybutane (sec-Butyl ethyl ether)</option>
                  </select>
                </div>

                {/* Halide Disassembly Choice */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Select Alkyl/Aryl Halide (R-X)</label>
                  <select
                    value={selectedHalideChoice}
                    onChange={(e) => setSelectedHalideChoice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded p-1.5"
                  >
                    <option value="">-- Select Halide --</option>
                    <option value="CH3I">CH3I (Methyl iodide) [1°]</option>
                    <option value="(CH3)3CBr">(CH3)3CBr (tert-Butyl bromide) [3°]</option>
                    <option value="CH3CH2Br">CH3CH2Br (Ethyl bromide) [1°]</option>
                    <option value="sec-BuBr">sec-Butyl bromide [2°]</option>
                    <option value="PhCl">Chlorobenzene (C6H5Cl) [Aryl]</option>
                  </select>
                </div>

                {/* Alkoxide Disassembly Choice */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block mb-1">Select Sodium Alkoxide (R'-ONa)</label>
                  <select
                    value={selectedAlkoxideChoice}
                    onChange={(e) => setSelectedAlkoxideChoice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded p-1.5"
                  >
                    <option value="">-- Select Alkoxide --</option>
                    <option value="(CH3)3CONa">(CH3)3CONa (Sodium tert-butoxide)</option>
                    <option value="CH3ONa">CH3ONa (Sodium methoxide)</option>
                    <option value="CH3CH2ONa">CH3CH2ONa (Sodium ethoxide)</option>
                    <option value="PhONa">PhONa (Sodium phenoxide)</option>
                    <option value="sec-BuONa">Sodium sec-butoxide</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={handleVerifyRetrosynthesis}
                  className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400"
                >
                  ✔ Validate Synthetic Route
                </button>
                {retroResult && (
                  <div className="text-xs font-semibold px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200">
                    {retroResult}
                  </div>
                )}
              </div>
            </div>

            {/* MANDATORY EXPLORATION STEPS DISPLAY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                Guided Exploration Labs & Objectives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPLORATION_STEPS.map((lab, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-200">{lab.title}</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-2">{lab.instruction}</p>
                    <div className="text-[10px] text-slate-500 font-mono">Node ID: {lab.nodeId}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* MANDATORY OBSERVATION QUESTIONS DISPLAY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                Lab Observations & Phenomenon Analysis
              </h3>
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs font-bold text-slate-200 mb-3">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          audioManager.play('tap');
                        }}
                        className={`w-full p-2.5 rounded-lg text-xs text-left border ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
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
        )}

        {/* TAB 3: CHALLENGES TIER */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty} Tier
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const currentChal = CHALLENGES[currentChallengeIdx];
                    setCurrentHint(currentChal.hints[0]);
                    setShowHint(true);
                    audioManager.play('hint');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-semibold"
                >
                  💡 Request Hint
                </button>
              </div>
            </div>

            {/* Current Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="text-xs font-bold text-gold-400 uppercase tracking-widest mb-2">
                Competency: {CHALLENGES[currentChallengeIdx].competencyLevel}
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-6 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </h3>

              {/* Options Grid */}
              <div className="space-y-3 mb-6">
                {CHALLENGES[currentChallengeIdx].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={challengeSubmitted}
                    className={`w-full p-4 rounded-xl text-xs text-left border transition-all flex items-center justify-between ${
                      selectedOptionIdx === idx
                        ? challengeSubmitted
                          ? idx === CHALLENGES[currentChallengeIdx].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-gold-950/80 border-gold-500 text-gold-200'
                        : challengeSubmitted && idx === CHALLENGES[currentChallengeIdx].correctIndex
                        ? 'bg-emerald-950/50 border-emerald-600 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-400 text-[11px]">
                        {['A', 'B', 'C', 'D'][idx]}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Action & Explanation Footer */}
              {!challengeSubmitted ? (
                <button
                  onClick={handleSubmitChallenge}
                  disabled={selectedOptionIdx === null}
                  className="w-full py-3 bg-gradient-to-r from-gold-500 to-gold-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs hover:brightness-110"
                >
                  Submit Organic Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-gold-400">Detailed Mechanistic Explanation: </span>
                    {CHALLENGES[currentChallengeIdx].explanation}
                  </div>
                  <button
                    onClick={handleNextChallenge}
                    className="w-full py-3 bg-emerald-500 text-slate-950 font-extrabold rounded-xl text-xs hover:bg-emerald-400"
                  >
                    {currentChallengeIdx < CHALLENGES.length - 1 ? 'Proceed to Next Challenge →' : 'Complete Chemistry Module'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL WORLD EXTENSION */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 border border-emerald-900/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-2">
                <span>🏭 Industrial Real-World Chemical Activity</span>
              </div>
              <h2 className="text-xl font-black text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-900/30 text-xs text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-gold-400 mb-4">
                Common Student Misconceptions & Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-2">
                      <span>⚠️ Misconception:</span> {m.title}
                    </div>
                    <p className="text-[11px] text-slate-400">{m.description}</p>
                    <div className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/40">
                      <span className="font-bold">Chemical Correction: </span>{m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mastery & Diagnostics Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-slate-200 mb-4">Node Mastery Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {ALL_NODE_IDS.map((nodeId) => {
                  const level = masteryProb(bktStates[nodeId]);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">{nodeId}</div>
                      <div className="text-2xl font-black text-gold-400 mb-1">{Math.round(level * 100)}%</div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gold-500 h-full transition-all" style={{ width: `${level * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C12_ChemistryWilliamsonethersynthesisSim;