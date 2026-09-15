'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
const NODE_71 = 'c12_chem_071'; // Structure, Classification & Nomenclature
const NODE_72 = 'c12_chem_072'; // Physical Properties & Hydrogen Bonding
const NODE_73 = 'c12_chem_073'; // Acidity of Phenols vs Alcohols: Resonance & Substituent Effects
const NODE_74 = 'c12_chem_074'; // Preparation of Phenols (Dow, Diazonium, Cumene)
const NODE_75 = 'c12_chem_075'; // Electrophilic Substitution: Nitration
const NODE_76 = 'c12_chem_076'; // Electrophilic Substitution: Halogenation & Bromine Water Test
const NODE_77 = 'c12_chem_077'; // Kolbe's Reaction & Synthesis of Salicylic Acid / Aspirin
const NODE_78 = 'c12_chem_078'; // Reimer-Tiemann Reaction & Dichlorocarbene Mechanism
const NODE_79 = 'c12_chem_079'; // Oxidation & Reduction of Phenols (Benzoquinone, Cyclohexanol)
const NODE_80 = 'c12_chem_080'; // Qualitative Distinction Tests (FeCl3, Azo Dye Coupling)

const ALL_NODE_IDS = [
  NODE_71, NODE_72, NODE_73, NODE_74, NODE_75,
  NODE_76, NODE_77, NODE_78, NODE_79, NODE_80
];

// ==========================================
// SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'ISC Advanced Phenol Synthesis & Industrial Analysis Master Lab',
  intro: 'Welcome to the Central Organic Chemistry Research Facility. As Chief Analytical & Synthetic Chemist, you will investigate the anomalous acidity of phenolic hydroxyls, explore aromatic electrophilic substitutions, execute high-yield industrial processes (such as the Hydroperoxide/Cumene process and Kolbe-Schmitt synthesis), and validate pharmaceutical purities.',
  context: 'In this simulation, you will manipulate electronic substituent effects, observe resonance stabilization in real-time quantum energy views, run competitive nitration/bromination experiments, synthesize Aspirin and Salicylaldehyde, and perform qualitative distinction tests.'
};

// ==========================================
// SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why is Phenol (pKa ≈ 10) nearly one million times more acidic than Cyclohexanol (pKa ≈ 16), despite both possessing a hydroxyl group attached to a six-carbon ring?',
  options: [
    'Phenol has a higher molecular weight than cyclohexanol.',
    'The phenoxide anion formed upon deprotonation is strongly stabilized by delocalization of negative charge into the aromatic π-electron system.',
    'Phenol completely dissociates in water into benzene molecules and hydroxide ions.',
    'Cyclohexanol forms much stronger intermolecular hydrogen bonds with water than phenol.'
  ],
  correctIndex: 1,
  hintAfter: 'Phenoxide ion resonance delocalizes the negative charge over the ortho and para carbon atoms of the benzene ring, lowering the free energy of the conjugate base and pushing equilibrium toward deprotonation!'
};

// ==========================================
// SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Phenolic Acidity & Substituent Electronic Effects',
    instruction: 'Select different substituents (e.g. -NO2, -CH3, -OCH3, -Cl) at ortho, meta, and para positions. Observe how electron-withdrawing (-I, -M) vs electron-donating (+I, +M) groups alter pKa values, pH curves, and phenoxide resonance maps.',
    interactionType: 'acidity_explorer',
    nodeId: NODE_73
  },
  {
    title: 'Lab 2: Electrophilic Substitution Regioselectivity & Solvent Control',
    instruction: 'Adjust nitrating conditions (dilute vs conc. HNO3/H2SO4) and brominating solvent (polar H2O vs non-polar CS2). Observe monohalogenation vs tribromination and measure steam volatility of o-nitrophenol vs p-nitrophenol.',
    interactionType: 'electrophilic_substitution',
    nodeId: NODE_75
  },
  {
    title: 'Lab 3: Industrial Synthesis Pathways (Cumene, Kolbe & Reimer-Tiemann)',
    instruction: 'Simulate industrial synthesis of Phenol from Cumene, Kolbe-Schmitt reaction for Salicylic Acid, and Reimer-Tiemann reaction via dichlorocarbene (:CCl2) intermediate for Salicylaldehyde.',
    interactionType: 'industrial_synthesis',
    nodeId: NODE_77
  },
  {
    title: 'Lab 4: Oxidation-Reduction & Catalytic Hydrogenation Lab',
    instruction: 'Expose phenol to chromic acid (Na2Cr2O7 / conc. H2SO4) to form 1,4-benzoquinone, run zinc dust reduction to yield benzene, and perform nickel-catalyzed catalytic hydrogenation to form cyclohexanol.',
    interactionType: 'redox_lab',
    nodeId: NODE_79
  },
  {
    title: 'Lab 5: Qualitative Distinction & Pharmaceutical Purity Diagnostic',
    instruction: 'Perform neutral FeCl3 complexation (violet color), Benzene Diazonium Chloride coupling (orange-red azo dye), and NaHCO3 effervescence diagnostic to distinguish Phenol from Carboxylic Acids and Alcohols.',
    interactionType: 'qualitative_tests',
    nodeId: NODE_80
  }
];

// ==========================================
// SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: How will introducing a nitro group (-NO2) at the para position of Phenol affect its pKa compared to unsubstituted Phenol (pKa = 9.95)?',
    options: [
      'pKa will increase to ~12.5 (weaker acid) because -NO2 donates electrons.',
      'pKa will drop dramatically to ~7.15 (stronger acid) due to strong -I and -M electron-withdrawing resonance stabilization.',
      'pKa will remain unchanged at 9.95 because substituents do not affect aromatic rings.',
      'Phenol will turn into a strong mineral acid with pKa = -2.0.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, set the substituent to -NO2 at Para position and observe the measured pKa drop from 9.95 to 7.15.',
    nodeId: NODE_73
  },
  {
    question: 'Predict: What product is obtained when Phenol is reacted with excess Bromine water (Br2 / H2O) at room temperature without any Lewis acid catalyst?',
    options: [
      'Monobrominated product: 4-bromophenol only.',
      'Heavy white precipitate of 2,4,6-tribromophenol.',
      'Bromobenzene with evolution of hydrogen gas.',
      'No reaction occurs without FeBr3 catalyst.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 2, select Br2 / H2O reagent and click React to observe the rapid formation of a 2,4,6-tribromophenol white precipitate.',
    nodeId: NODE_76
  }
];

// ==========================================
// SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Why is ortho-nitrophenol steam volatile whereas para-nitrophenol has a much higher boiling point and is non-steam volatile?',
    observableOptions: [
      'Ortho-nitrophenol forms intramolecular hydrogen bonding (chelation), preventing intermolecular association, while para-nitrophenol forms strong intermolecular H-bonds.',
      'Para-nitrophenol is smaller than ortho-nitrophenol.',
      'Ortho-nitrophenol has covalent bonds while para-nitrophenol has ionic bonds.',
      'Para-nitrophenol reacts with steam to form an insoluble polymer.'
    ],
    correctIndex: 0,
    nodeId: NODE_72
  },
  {
    question: 'Observation: What diagnostic visual change occurs when neutral Ferric Chloride (FeCl3) solution is added to a solution of Phenol?',
    observableOptions: [
      'Formation of a heavy white precipitate of iron hydroxide.',
      'Appearance of a characteristic violet / purple colored coordination complex [Fe(OC6H5)6]3-.',
      'Effervescence of carbon dioxide gas bubbles.',
      'Immediate bleaching of the solution to colorless water.'
    ],
    correctIndex: 1,
    nodeId: NODE_80
  }
];

// ==========================================
// SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Quality Control & Synthesis of Acetylsalicylic Acid (Aspirin)',
  description: 'In industrial pharmaceutical manufacturing, Salicylic Acid (synthesized via the Kolbe-Schmitt reaction) is acetylated with Acetic Anhydride using concentrated H2SO4 catalyst to yield Aspirin.',
  steps: [
    'Step 1: Weigh 13.80 g (0.100 mol) of pure Salicylic Acid into a dry 250 mL Erlenmeyer flask.',
    'Step 2: Add 14.20 mL (15.30 g, 0.150 mol) of Acetic Anhydride and 5 drops of 98% H2SO4. Heat gently at 50-60°C for 15 minutes.',
    'Step 3: Quench with 50 mL ice-cold distilled water to precipitate crude Aspirin (C9H8O4). Filter, wash, and recrystallize from ethanol to yield 16.20 g (90% theoretical yield).',
    'Step 4: Perform Quality Control test: Add 2 drops of neutral FeCl3 to 1% ethanol solution of product. Absence of violet color proves 0.0% unreacted Salicylic Acid impurity!'
  ]
};

// ==========================================
// MISCONCEPTIONS & CORRECTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    nodeId: NODE_71,
    misconception: 'Phenols are considered aromatic alcohols with identical properties.',
    correction: 'Phenols are distinct from aliphatic alcohols! In phenols, the -OH group is directly attached to an sp2 hybridized carbon of a benzene ring, altering resonance, acidity, and chemical reactivity.',
    explanation: 'The sp2 carbon has higher electronegativity than sp3 carbon in alcohols, and lone pair delocalization makes the C-O bond partial double bond character.'
  },
  {
    id: 'misc_2',
    nodeId: NODE_73,
    misconception: 'Phenol reacts with sodium bicarbonate (NaHCO3) to evolve CO2 gas like carboxylic acids.',
    correction: 'Phenol is weaker acid (pKa ≈ 9.95) than carbonic acid (pKa ≈ 6.35), so it does NOT react with NaHCO3 to evolve CO2 gas.',
    explanation: 'Only carboxylic acids and picric acid (2,4,6-trinitrophenol, pKa ≈ 0.38) are acidic enough to decompose sodium bicarbonate.'
  },
  {
    id: 'misc_3',
    nodeId: NODE_75,
    misconception: 'Nitration of phenol with dilute HNO3 yields predominantly para-nitrophenol because of steric hindrance.',
    correction: 'Dilute HNO3 nitration yields ~30-40% ortho-nitrophenol and ~15-20% para-nitrophenol due to intramolecular hydrogen bonding stabilization in the ortho transition state.',
    explanation: 'Intramolecular H-bonding stabilizes ortho-nitrophenol, making it the major product despite minor steric crowding.'
  },
  {
    id: 'misc_4',
    nodeId: NODE_76,
    misconception: 'Halogenation of Phenol requires a Lewis acid catalyst like FeBr3 just like benzene.',
    correction: 'Phenol is strongly activated by the +M effect of the -OH group; halogenation occurs rapidly even in non-polar solvents without any catalyst.',
    explanation: 'The highly activating hydroxyl group polarizes the halogen molecule directly, enabling bromination at room temperature.'
  },
  {
    id: 'misc_5',
    nodeId: NODE_78,
    misconception: 'Reimer-Tiemann reaction involves a carbocation intermediate.',
    correction: 'Reimer-Tiemann reaction involves a neutral electron-deficient reactive intermediate: Dichlorocarbene (:CCl2).',
    explanation: 'Chloroform reacts with strong base (KOH) via α-elimination to generate singlet dichlorocarbene (:CCl2), which attacks phenoxide ion.'
  },
  {
    id: 'misc_6',
    nodeId: NODE_72,
    misconception: 'Para-nitrophenol has lower boiling point than ortho-nitrophenol because of symmetry.',
    correction: 'Para-nitrophenol forms strong intermolecular hydrogen bonds leading to molecular association, giving it a much HIGHER boiling point and non-steam volatility.',
    explanation: 'Ortho-nitrophenol forms intramolecular H-bonds, preventing intermolecular attraction, making it volatile in steam.'
  }
];

// ==========================================
// DIAGNOSTIC QUESTIONS
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: NODE_71,
    question: 'What is the IUPAC name of Pyrogallol?',
    options: ['Benzene-1,2-diol', 'Benzene-1,2,3-triol', 'Benzene-1,3,5-triol', '2-Methylphenol'],
    correctIndex: 1,
    explanation: 'Pyrogallol is benzene-1,2,3-triol, containing three adjacent phenolic -OH groups.'
  },
  {
    id: 'diag_2',
    nodeId: NODE_72,
    question: 'Which compound exhibits intramolecular hydrogen bonding?',
    options: ['p-Nitrophenol', 'o-Nitrophenol', 'm-Nitrophenol', 'Phenol'],
    correctIndex: 1,
    explanation: 'o-Nitrophenol forms a 6-membered hydrogen-bonded ring between the -OH proton and ortho -NO2 oxygen.'
  },
  {
    id: 'diag_3',
    nodeId: NODE_73,
    question: 'Which of the following has the SMALLEST pKa value (most acidic)?',
    options: ['Phenol', 'o-Cresol', 'p-Nitrophenol', '2,4,6-Trinitrophenol (Picric Acid)'],
    correctIndex: 3,
    explanation: '2,4,6-Trinitrophenol (Picric Acid) has pKa ≈ 0.38 due to three strongly electron-withdrawing -NO2 groups (-I and -M effects).'
  },
  {
    id: 'diag_4',
    nodeId: NODE_74,
    question: 'What byproduct of industrial high-volume economic value is obtained during the synthesis of Phenol from Cumene?',
    options: ['Ethanol', 'Acetone (Propanone)', 'Acetaldehyde', 'Acetic acid'],
    correctIndex: 1,
    explanation: 'Cumene hydroperoxide rearrangement in dilute H2SO4 yields Phenol and Acetone in 1:1 molar ratio.'
  },
  {
    id: 'diag_5',
    nodeId: NODE_75,
    question: 'What is the major product when Phenol reacts with Concentrated HNO3 in presence of Concentrated H2SO4?',
    options: ['o-Nitrophenol', 'p-Nitrophenol', '2,4,6-Trinitrophenol (Picric acid)', 'Nitrobenzene'],
    correctIndex: 2,
    explanation: 'Concentrated nitrating mixture vigorously nitrates phenol at all available ortho and para positions, forming 2,4,6-trinitrophenol.'
  },
  {
    id: 'diag_6',
    nodeId: NODE_76,
    question: 'When Phenol reacts with Br2 dissolved in non-polar solvent CS2 at low temperature (273 K), what is the major product?',
    options: ['2,4,6-Tribromophenol', '4-Bromophenol (p-bromophenol)', '2-Bromophenol', 'Bromobenzene'],
    correctIndex: 1,
    explanation: 'In non-polar solvents (CS2/CHCl3), ionization of phenol is suppressed, yielding monobrominated products with 4-bromophenol as major.'
  },
  {
    id: 'diag_7',
    nodeId: NODE_77,
    question: 'What electrophile is involved in Kolbe’s reaction to form Salicylic Acid?',
    options: ['Carbon dioxide (CO2)', 'Carbon monoxide (CO)', 'Hydronium ion', 'Carbocation'],
    correctIndex: 0,
    explanation: 'Carbon dioxide acts as a weak electrophile, reacting with the highly reactive phenoxide ion at 400 K and 4-7 atm pressure.'
  },
  {
    id: 'diag_8',
    nodeId: NODE_78,
    question: 'What is the reactive electrophile in the Reimer-Tiemann reaction of phenol with CHCl3 / KOH?',
    options: [':CHCl (Chlorocarbene)', ':CCl2 (Dichlorocarbene)', 'CCl3+ carbocation', 'CHCl2+ carbocation'],
    correctIndex: 1,
    explanation: 'Dichlorocarbene (:CCl2), generated by deprotonation and loss of chloride from chloroform, acts as the electrophile.'
  }
];

// ==========================================
// SECTION 7: CHALLENGES (24 items across 3 tiers)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple_choice' | 'numeric' | 'classification' | 'drag_sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1-8)
  {
    id: 'chal_f1',
    nodeId: NODE_71,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Nomenclature',
    question: 'What is the IUPAC name of Resorcinol?',
    options: ['Benzene-1,2-diol', 'Benzene-1,3-diol', 'Benzene-1,4-diol', '3-Methylphenol'],
    correctIndex: 1,
    explanation: 'Resorcinol is benzene-1,3-diol, containing hydroxyl groups at positions 1 and 3.',
    hints: ['Check the position of the two -OH groups on the benzene ring.', 'Catechol is 1,2-diol; Quinol is 1,4-diol; Resorcinol is 1,3-diol.', '1,3-substitution pattern corresponds to meta positions.']
  },
  {
    id: 'chal_f2',
    nodeId: NODE_71,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Which hybrid state is possessed by the oxygen atom and the ring carbon attached to the -OH group in Phenol?',
    options: ['Carbon is sp3, Oxygen is sp2', 'Carbon is sp2, Oxygen is sp3 (with partial sp2 character due to resonance)', 'Carbon is sp, Oxygen is sp3', 'Both are sp hybridized'],
    correctIndex: 1,
    explanation: 'The ring carbon is sp2 hybridized. The oxygen atom is sp3 hybridized but oxygen lone pair delocalization into the aromatic ring gives the C-O bond partial double-bond character.',
    hints: ['Aromatic ring carbons are sp2 hybridized.', 'Oxygen lone pairs interact with aromatic π system.', 'Think about double bond character of C-O bond.']
  },
  {
    id: 'chal_f3',
    nodeId: NODE_72,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Physical Properties',
    question: 'Why does Phenol have a significantly higher boiling point (182°C) than toluene (111°C) of comparable molar mass?',
    options: ['Phenol is ionic in liquid state.', 'Phenol forms strong intermolecular hydrogen bonds.', 'Toluene forms intramolecular hydrogen bonds.', 'Phenol has higher vapor pressure.'],
    correctIndex: 1,
    explanation: 'Phenol molecules associate extensively via intermolecular hydrogen bonding through their hydroxyl groups, raising boiling point.',
    hints: ['Look at the polar -OH group vs nonpolar -CH3 group.', 'Hydrogen bonding requires O-H...O interaction between adjacent molecules.', 'Intermolecular H-bonding increases boiling point.']
  },
  {
    id: 'chal_f4',
    nodeId: NODE_73,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Acidity Basics',
    question: 'Why is the phenoxide ion more stable than phenol itself?',
    options: ['Phenoxide ion has no charge.', 'In phenoxide ion, negative charge delocalization does not involve charge separation.', 'Phenol has no resonance structures.', 'Phenoxide ion forms ionic bonds with solvent.'],
    correctIndex: 1,
    explanation: 'In phenoxide, charge delocalization spreads a negative charge across the ring without positive-negative charge separation seen in neutral phenol resonance structures.',
    hints: ['Draw resonance structures for Phenol vs Phenoxide ion.', 'Neutral phenol resonance requires O+ and C- (charge separation).', 'Phenoxide resonance only delocalizes existing negative charge.']
  },
  {
    id: 'chal_f5',
    nodeId: NODE_74,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Industrial Preparation',
    question: 'In Dow’s Process, Chlorobenzene is converted to Phenol using which reagent and condition?',
    options: ['Dilute HCl at 25°C', 'Aqueous NaOH at 623 K and 300 atm pressure', 'Ethanolic KOH at room temperature', 'Sodium metal in dry ether'],
    correctIndex: 1,
    explanation: 'Dow’s process requires drastic conditions (aq NaOH, 623 K, 300 atm) because the aryl C-Cl bond has partial double-bond character due to resonance.',
    hints: ['Aryl halides are inert to nucleophilic substitution under normal conditions.', 'Extreme temperature and pressure are required.', 'Reagents: aq NaOH followed by acid hydrolysis.']
  },
  {
    id: 'chal_f6',
    nodeId: NODE_75,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Electrophilic Substitution',
    question: 'Nitration of Phenol with dilute HNO3 at 298 K yields which product mixture?',
    options: ['Only 4-nitrophenol', 'Mix of ortho- and para-nitrophenols', '2,4,6-trinitrophenol', 'Nitrobenzene'],
    correctIndex: 1,
    explanation: 'Dilute HNO3 undergoes mononitration at room temperature yielding a mixture of o-nitrophenol (major) and p-nitrophenol.',
    hints: ['The -OH group is strongly ortho/para directing.', 'Dilute acid gives mononitration, not trinitration.', 'Ortho isomer is stabilized by intramolecular H-bonding.']
  },
  {
    id: 'chal_f7',
    nodeId: NODE_76,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Qualitative Tests',
    question: 'What visual observation confirms the reaction of Phenol with Bromine Water (Br2 / H2O)?',
    options: ['Effervescence of gas', 'Formation of a white precipitate of 2,4,6-tribromophenol', 'Solution turning deep blue', 'Formation of a silver mirror'],
    correctIndex: 1,
    explanation: 'Bromine water reacts rapidly with phenol to form an insoluble white precipitate of 2,4,6-tribromophenol.',
    hints: ['In aqueous solution, phenoxide ion formation strongly activates all o,p positions.', 'Tribromination occurs completely.', 'The product is insoluble in water.']
  },
  {
    id: 'chal_f8',
    nodeId: NODE_77,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Named Reactions',
    question: 'Kolbe’s reaction converts Sodium Phenoxide into Salicylic Acid using which electrophile?',
    options: ['Carbon monoxide (CO)', 'Carbon dioxide (CO2)', 'Formaldehyde (HCHO)', 'Acetyl chloride'],
    correctIndex: 1,
    explanation: 'Sodium phenoxide reacts with carbon dioxide (CO2) at 400 K and 4-7 atm followed by acidification to produce 2-hydroxybenzoic acid (salicylic acid).',
    hints: ['The reactant introduces a carboxyl group (-COOH).', 'CO2 acts as a weak electrophile.', 'Conditions: 400 K, 4-7 atm pressure.']
  },

  // STANDARD TIER (9-16)
  {
    id: 'chal_s9',
    nodeId: NODE_73,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Substituent Effects Analysis',
    question: 'Arrange the following compounds in order of INCREASING acidity (lowest pKa first): (I) Phenol, (II) p-Nitrophenol, (III) p-Cresol, (IV) 2,4-Dinitrophenol.',
    options: ['(III) < (I) < (II) < (IV)', '(IV) < (II) < (I) < (III)', '(I) < (III) < (II) < (IV)', '(III) < (II) < (I) < (IV)'],
    correctIndex: 0,
    explanation: 'p-Cresol (+I effect of -CH3) is least acidic. Phenol is next. p-Nitrophenol (-I, -M effect) is more acidic. 2,4-dinitrophenol (two -NO2 groups) is most acidic.',
    hints: ['Electron donating groups (-CH3) decrease acidity.', 'Electron withdrawing groups (-NO2) increase acidity.', 'More -NO2 groups mean higher acidity (lower pKa).']
  },
  {
    id: 'chal_s10',
    nodeId: NODE_74,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Stoichiometry & Yield Calculation',
    question: 'Calculate the theoretical yield of Phenol (in grams) obtained from 120.2 g of Cumene (Molar mass = 120.2 g/mol) assuming 100% conversion efficiency. (Molar mass of Phenol = 94.1 g/mol)',
    correctAnswer: 94.1,
    explanation: '1 mole of Cumene (120.2 g) produces 1 mole of Phenol (94.1 g) and 1 mole of Acetone (58.1 g). Yield = 94.1 g.',
    hints: ['Calculate moles of Cumene: 120.2 / 120.2 = 1.0 mol.', '1 mol Cumene yields 1 mol Phenol.', 'Mass = 1.0 mol * 94.1 g/mol = 94.1 g.']
  },
  {
    id: 'chal_s11',
    nodeId: NODE_78,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Mechanism Analysis',
    question: 'In the Reimer-Tiemann reaction of Phenol to Salicylaldehyde, how is the electrophile :CCl2 generated?',
    options: ['Addition of H+ to chloroform', 'α-elimination of HCl from chloroform (CHCl3) by OH- base', 'Homolytic cleavage of C-Cl bond by UV light', 'Oxidation of carbon tetrachloride'],
    correctIndex: 1,
    explanation: 'Base (OH-) abstracts the acidic proton from chloroform to form :CCl3- anion, which spontaneously loses Cl- (α-elimination) to yield neutral singlet dichlorocarbene (:CCl2).',
    hints: ['Base removes a proton from CHCl3.', 'Trichoromethyl anion loses chloride ion.', 'This process is called alpha-elimination.']
  },
  {
    id: 'chal_s12',
    nodeId: NODE_79,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Redox Transformations',
    question: 'What product is formed when Phenol is heated with Zinc dust?',
    options: ['Cyclohexane', 'Benzene', 'Cyclohexanol', 'Toluene'],
    correctIndex: 1,
    explanation: 'Heating phenol with zinc dust causes reduction of the hydroxyl group, producing benzene and zinc oxide (ZnO).',
    hints: ['Zinc acts as a reducing agent.', 'Oxygen is abstracted by zinc forming ZnO.', 'The aromatic ring remains intact without -OH.']
  },
  {
    id: 'chal_s13',
    nodeId: NODE_80,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Qualitative Distinction',
    question: 'How can you experimentally distinguish between Phenol and Ethanol using a single chemical reagent test?',
    options: ['Add NaHCO3; Phenol evolves CO2.', 'Add neutral FeCl3; Phenol gives a violet color complex while Ethanol shows no characteristic reaction.', 'Add Fehling solution; Ethanol gives red ppt.', 'Add Lucas reagent; Phenol gives immediate turbidity.'],
    correctIndex: 1,
    explanation: 'Phenol reacts with neutral FeCl3 to form a soluble coordination complex [Fe(OC6H5)6]3- of intense violet color. Aliphatic alcohols like ethanol do not react.',
    hints: ['Enols and phenols form colored iron complexes.', 'Aliphatic alcohols lack enolic/phenolic structure.', 'Neutral FeCl3 gives purple/violet color with phenol.']
  },
  {
    id: 'chal_s14',
    nodeId: NODE_72,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Separation & Volatility',
    question: 'A mixture of o-nitrophenol and p-nitrophenol can be separated by steam distillation because:',
    options: ['p-Nitrophenol is steam volatile due to intramolecular H-bonding.', 'o-Nitrophenol is steam volatile due to intramolecular H-bonding.', 'o-Nitrophenol forms ionic salts with steam.', 'p-Nitrophenol has a lower boiling point.'],
    correctIndex: 1,
    explanation: 'o-Nitrophenol forms internal chelation (intramolecular H-bonding), reducing intermolecular attraction, rendering it steam volatile. p-Nitrophenol forms intermolecular H-bonds, making it less volatile.',
    hints: ['Intramolecular H-bonding prevents association between molecules.', 'Lower intermolecular forces mean higher volatility in steam.', 'o-isomer boils lower and distills over with steam.']
  },
  {
    id: 'chal_s15',
    nodeId: NODE_77,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Pharmaceutical Synthesis Calculation',
    question: 'Starting with 13.8 g of Salicylic Acid (Molar Mass = 138 g/mol) and excess Acetic Anhydride, what mass of Aspirin (Molar Mass = 180 g/mol) is obtained at 85% reaction yield?',
    correctAnswer: 15.3,
    explanation: 'Moles of Salicylic acid = 13.8 / 138 = 0.10 mol. Theoretical Aspirin yield = 0.10 * 180 = 18.0 g. Actual yield at 85% = 18.0 * 0.85 = 15.3 g.',
    hints: ['Calculate moles of Salicylic acid = 13.8 / 138.', 'Theoretical yield = moles * 180.', 'Multiply by 0.85 for actual yield.']
  },
  {
    id: 'chal_s16',
    nodeId: NODE_76,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Solvent Dependence',
    question: 'Why does reaction of Phenol with Bromine in CS2 yield monobromophenol, while Bromine water yields 2,4,6-tribromophenol?',
    options: ['CS2 decomposes bromine molecules.', 'Water polarizes phenol into phenoxide ion, immensely activating all o,p positions; CS2 suppresses ionization.', 'CS2 is a catalyst for meta-substitution.', 'Water acts as an oxidizing agent.'],
    correctIndex: 1,
    explanation: 'In aqueous medium, phenol ionizes into highly reactive phenoxide ion (ArO-), activating the ring so strongly that polybromination occurs. In non-polar CS2, phenol remains non-ionized.',
    hints: ['Water is a polar protic solvent.', 'Phenoxide ion (ArO-) is far more activated than neutral phenol (ArOH).', 'Non-polar CS2 keeps phenol un-ionized.']
  },

  // ADVANCED TIER (17-24)
  {
    id: 'chal_a17',
    nodeId: NODE_73,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Electronic & Resonance Analysis',
    question: 'Predict the relative acidity order of o-nitrophenol, m-nitrophenol, and p-nitrophenol, and explain the anomaly between ortho and para positions.',
    options: [
      'm-nitrophenol > o-nitrophenol > p-nitrophenol',
      'p-nitrophenol (pKa 7.15) > o-nitrophenol (pKa 7.23) > m-nitrophenol (pKa 8.35)',
      'o-nitrophenol > p-nitrophenol > m-nitrophenol',
      'm-nitrophenol > p-nitrophenol > o-nitrophenol'
    ],
    correctIndex: 1,
    explanation: 'p-Nitrophenol and o-nitrophenol benefit from both -I and strong -M mesomeric stabilization. However, o-nitrophenol is slightly less acidic than p-nitrophenol due to intramolecular H-bonding stabilizing the neutral molecule.',
    hints: ['-M effect operates at ortho and para positions, not meta.', 'Intramolecular H-bonding in o-nitrophenol holds onto the -OH proton slightly stronger.', 'Order: p-nitro (most acidic) > o-nitro > m-nitro.']
  },
  {
    id: 'chal_a18',
    nodeId: NODE_78,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Regioselectivity & Carbene Mechanism',
    question: 'In the Reimer-Tiemann reaction, why is the ortho-hydroxybenzaldehyde (salicylaldehyde) the predominant product over the para-isomer?',
    options: [
      'The para position is blocked by steric hindrance of the solvent.',
      'Coordination of the sodium ion (Na+) with phenoxide oxygen and dichlorocarbene intermediates stabilizes the 6-membered cyclic transition state at the ortho position.',
      'Dichlorocarbene cannot react at the para position.',
      'Salicylaldehyde is insoluble in reaction mixture.'
    ],
    correctIndex: 1,
    explanation: 'Sodium cation (Na+) coordinates simultaneously to the phenoxide oxygen and incoming carbene/intermediate in a cyclic transition state, directing electrophilic attack preferentially to the ortho position.',
    hints: ['Look at metal ion chelation in the transition state.', 'Na+ coordinates both phenoxide O- and intermediate oxygen/chlorine.', 'Cyclic 6-membered chelate directs attack to ortho position.']
  },
  {
    id: 'chal_a19',
    nodeId: NODE_74,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Industrial Synthetic Mechanisms',
    question: 'During the conversion of Cumene to Phenol via Cumene Hydroperoxide, what driving force causes the migration of the phenyl group to electron-deficient oxygen?',
    options: ['Formation of stable acetone byproduct and cleavage of weak O-O peroxide bond upon acid protonation.', 'Nucleophilic attack by bisulfate ion.', 'Free radical propagation step.', 'Direct decarbonylation.'],
    correctIndex: 0,
    explanation: 'Protonation of the hydroperoxide group yields -OH2+, which leaves as water. Phenyl group migrates from carbon to electron-deficient oxygen in a concerted rearrangement driven by O-O cleavage.',
    hints: ['Peroxide bond (O-O) is weak and easily cleaved.', 'Protonation of -O-O-H creates good leaving group H2O.', 'Phenyl migration to oxygen forms carbocation stabilized by oxygen lone pair.']
  },
  {
    id: 'chal_a20',
    nodeId: NODE_80,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Azo Coupling Reaction Analysis',
    question: 'When Phenol reacts with Benzene Diazonium Chloride in weakly alkaline medium (pH 9-10), what is the structure and color of the product formed?',
    options: ['p-Hydroxyazobenzene (Orange dye)', 'o-Hydroxyazobenzene (Yellow dye)', 'Chlorobenzene (Colorless liquid)', 'Nitrobenzene (Yellow oil)'],
    correctIndex: 0,
    explanation: 'In alkaline medium (pH 9-10), phenol forms phenoxide ion which undergoes electrophilic coupling at para position with diazonium cation to produce p-hydroxyazobenzene, an orange azo dye.',
    hints: ['Phenoxide ion is the reactive species at pH 9-10.', 'Electrophilic attack by Ar-N2+ occurs at unhindered para position.', 'Extended conjugated π system creates orange dye.']
  },
  {
    id: 'chal_a21',
    nodeId: NODE_79,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Complex Oxidation Pathways',
    question: 'Oxidation of Phenol with acidified Sodium Dichromate (Na2Cr2O7 / H2SO4) yields 1,4-benzoquinone. What structural change occurs during this transformation?',
    options: [
      'Aromatic ring is completely destroyed yielding aliphatic dicarboxylic acid.',
      'Aromatic ring is converted into a conjugated non-aromatic 2,5-cyclohexadiene-1,4-dione system with two carbonyl groups.',
      'Ring expands to a 7-membered cyclic ketone.',
      'Phenol dimerizes to biphenyl.'
    ],
    correctIndex: 1,
    explanation: 'Chromic acid oxidizes phenol at C1 and C4 positions, generating conjugated 1,4-benzoquinone (2,5-cyclohexadiene-1,4-dione).',
    hints: ['The product contains two C=O groups at para positions.', 'Aromatic stability is replaced by conjugated diene-dione system.', 'Yellow conjugated diketone is formed.']
  },
  {
    id: 'chal_a22',
    nodeId: NODE_75,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Multi-step Synthesis Strategy',
    question: 'How can 4-nitrophenol be prepared as the SOLE major product from Phenol, avoiding formation of ortho-nitrophenol and oxidation side products?',
    options: [
      'Direct nitration with fuming HNO3.',
      'Sulfonation of phenol at 373 K to yield phenol-2,4-disulfonic acid, followed by nitration and ipso-desulfonation.',
      'Chlorination followed by reaction with NaNO2.',
      'Reduction with Zn dust followed by nitration.'
    ],
    correctIndex: 1,
    explanation: 'Sulfonation at high temperature blocks the two ortho positions (forming phenol-2,4-disulfonic acid). Nitration then occurs exclusively at the para position with ipso displacement of -SO3H group.',
    hints: ['Sulfonic acid group (-SO3H) can act as a reversible blocking group.', 'High temperature sulfonation yields ortho/para disulfonic acid.', 'Nitration displaces -SO3H group selectively.']
  },
  {
    id: 'chal_a23',
    nodeId: NODE_77,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Complex Industrial Yield & Atom Economy',
    question: 'In the synthesis of Aspirin from Salicylic acid and Acetic anhydride (Salicylic Acid + Acetic Anhydride -> Aspirin + Acetic Acid), calculate the Atom Economy (%) for Aspirin. (Molar masses: Salicylic Acid = 138, Acetic Anhydride = 102, Aspirin = 180, Acetic Acid = 60)',
    correctAnswer: 75.0,
    explanation: 'Atom Economy = (Molar Mass of Desired Product / Total Molar Mass of Reactants) * 100 = (180 / (138 + 102)) * 100 = (180 / 240) * 100 = 75.0%.',
    hints: ['Total reactant mass = 138 + 102 = 240 g/mol.', 'Desired product (Aspirin) mass = 180 g/mol.', 'Atom Economy = (180 / 240) * 100%.']
  },
  {
    id: 'chal_a24',
    nodeId: NODE_71,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Polyhydric Phenol Structure Elucidation',
    question: 'Which trihydric phenol yields 2-nitrobenzene-1,3,5-triol as its ONLY mononitro derivative upon nitration due to symmetrical molecular equivalence?',
    options: ['Pyrogallol (1,2,3-triol)', 'Hydroxyquinol (1,2,4-triol)', 'Phloroglucinol (1,3,5-triol)', 'Catechol'],
    correctIndex: 2,
    explanation: 'Phloroglucinol (benzene-1,3,5-triol) possesses D3h symmetry where positions 2, 4, and 6 are chemically equivalent. Mononitration at any of these positions produces 2-nitrobenzene-1,3,5-triol.',
    hints: ['Look for high molecular symmetry in 1,3,5-substituted benzene.', 'All three vacant positions (2, 4, 6) are flanked identically by two -OH groups.', 'Phloroglucinol is 1,3,5-trihydroxybenzene.']
  }
];

// ==========================================
// SVG DIAGRAM 1: PHENOL RESONANCE & ACIDITY
// ==========================================
const PhenolResonanceSVG: React.FC<{ substituent: string; position: string }> = ({ substituent, position }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h4 className="text-amber-400 font-semibold mb-2 text-sm text-center">
        Resonance & Electronic Charge Distribution in Phenoxide Anion
      </h4>
      <svg viewBox="0 0 600 220" className="w-full h-48">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <radialGradient id="electronCloud" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </radialGradient>
        </defs>
        <rect width="600" height="220" fill="url(#grid)" rx="8" />

        {/* Structure 1: Phenoxide Canonical Form A */}
        <g transform="translate(60, 30)">
          <text x="50" y="15" fill="#94a3b8" fontSize="11" textAnchor="middle">Canonical Form 1</text>
          {/* Benzene Ring */}
          <polygon points="50,40 85,60 85,100 50,120 15,100 15,60" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          {/* Hydroxyl Oxygen */}
          <line x1="50" y1="40" x2="50" y2="20" stroke="#e2e8f0" strokeWidth="2.5" />
          <circle cx="50" cy="15" r="8" fill="#ef4444" />
          <text x="50" y="18" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">O⁻</text>
          {/* Pi double bonds */}
          <line x1="80" y1="63" x2="80" y2="97" stroke="#38bdf8" strokeWidth="2" />
          <line x1="47" y1="114" x2="20" y2="97" stroke="#38bdf8" strokeWidth="2" />
          <line x1="20" y1="63" x2="47" y2="46" stroke="#38bdf8" strokeWidth="2" />
        </g>

        {/* Arrow 1 */}
        <path d="M 140 90 L 165 90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" />
        <text x="152" y="80" fill="#f59e0b" fontSize="14" textAnchor="middle">↔</text>

        {/* Structure 2: Ortho Negative Charge */}
        <g transform="translate(180, 30)">
          <text x="50" y="15" fill="#94a3b8" fontSize="11" textAnchor="middle">Ortho Form</text>
          <polygon points="50,40 85,60 85,100 50,120 15,100 15,60" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="50" y1="40" x2="50" y2="20" stroke="#38bdf8" strokeWidth="3" />
          <text x="50" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">O=</text>
          {/* Ortho negative charge */}
          <circle cx="15" cy="60" r="7" fill="#e11d48" />
          <text x="15" y="63" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">δ⁻</text>
          <line x1="80" y1="63" x2="80" y2="97" stroke="#38bdf8" strokeWidth="2" />
          <line x1="47" y1="114" x2="20" y2="97" stroke="#38bdf8" strokeWidth="2" />
        </g>

        {/* Arrow 2 */}
        <text x="272" y="90" fill="#f59e0b" fontSize="14" textAnchor="middle">↔</text>

        {/* Structure 3: Para Negative Charge */}
        <g transform="translate(300, 30)">
          <text x="50" y="15" fill="#94a3b8" fontSize="11" textAnchor="middle">Para Form</text>
          <polygon points="50,40 85,60 85,100 50,120 15,100 15,60" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <line x1="50" y1="40" x2="50" y2="20" stroke="#38bdf8" strokeWidth="3" />
          <text x="50" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">O=</text>
          {/* Para negative charge */}
          <circle cx="50" cy="120" r="7" fill="#e11d48" />
          <text x="50" y="123" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">δ⁻</text>
          <line x1="20" y1="63" x2="20" y2="97" stroke="#38bdf8" strokeWidth="2" />
          <line x1="80" y1="63" x2="80" y2="97" stroke="#38bdf8" strokeWidth="2" />
        </g>

        {/* Arrow 3 */}
        <text x="392" y="90" fill="#f59e0b" fontSize="14" textAnchor="middle">↔</text>

        {/* Hybrid Resonance Hybrid View */}
        <g transform="translate(420, 30)">
          <text x="60" y="15" fill="#10b981" fontSize="11" fontStyle="bold" textAnchor="middle">Resonance Hybrid</text>
          <polygon points="60,40 95,60 95,100 60,120 25,100 25,60" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          {/* Inner dotted ring */}
          <circle cx="60" cy="80" r="24" fill="url(#electronCloud)" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="60" y1="40" x2="60" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
          <text x="60" y="15" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">O<sup>δ-</sup></text>
          {/* Substituent overlay indicator */}
          {substituent !== 'none' && (
            <g>
              <rect x="5" y="135" width="110" height="25" fill="#1e293b" stroke="#f59e0b" rx="4" />
              <text x="60" y="151" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">
                {substituent} @ {position}
              </text>
            </g>
          )}
        </g>
      </svg>
      <div className="mt-2 text-xs text-slate-300 text-center max-w-xl">
        Negative charge is delocalized over <strong>Ortho</strong> (C2, C6) and <strong>Para</strong> (C4) carbons.
        {substituent === '-NO2' && ' Electron-withdrawing -NO2 group stabilizes this negative charge by -M and -I effects, making it significantly more acidic!'}
        {substituent === '-CH3' && ' Electron-donating -CH3 group destabilizes the phenoxide anion (+I effect), decreasing acidity.'}
      </div>
    </div>
  );
};

// ==========================================
// SVG DIAGRAM 2: NITRATION & HYDROGEN BONDING
// ==========================================
const NitrationRegioselectivitySVG: React.FC<{ reagent: string }> = ({ reagent }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h4 className="text-cyan-400 font-semibold mb-2 text-sm text-center">
        Hydrogen Bonding Chelation & Steam Volatility Analysis
      </h4>
      <svg viewBox="0 0 600 200" className="w-full h-44">
        <rect width="600" height="200" fill="#0f172a" rx="8" />

        {/* Ortho-Nitrophenol Structure with Intramolecular H-Bonding */}
        <g transform="translate(80, 20)">
          <rect x="-10" y="0" width="200" height="165" fill="#1e293b" stroke="#0ea5e9" rx="8" />
          <text x="90" y="20" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
            o-Nitrophenol (Steam Volatile)
          </text>
          {/* Ring */}
          <polygon points="90,45 120,62 120,96 90,113 60,96 60,62" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          {/* OH */}
          <line x1="90" y1="45" x2="90" y2="30" stroke="#e2e8f0" strokeWidth="2" />
          <text x="90" y="28" fill="#ef4444" fontSize="10" textAnchor="middle">O—H</text>
          {/* NO2 at ortho */}
          <line x1="120" y1="62" x2="145" y2="50" stroke="#e2e8f0" strokeWidth="2" />
          <text x="155" y="52" fill="#38bdf8" fontSize="10" textAnchor="middle">N⁺(=O)O⁻</text>
          {/* Intramolecular H-bond dotted line */}
          <path d="M 100 28 Q 130 25 145 42" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3 3" />
          <text x="125" y="22" fill="#f59e0b" fontSize="9" fontWeight="bold">Chelation (Intra H-bond)</text>
          <text x="90" y="145" fill="#94a3b8" fontSize="10" textAnchor="middle">B.P. = 214°C | Steam Volatile</text>
        </g>

        {/* Para-Nitrophenol Structure with Intermolecular H-Bonding */}
        <g transform="translate(320, 20)">
          <rect x="-10" y="0" width="220" height="165" fill="#1e293b" stroke="#ec4899" rx="8" />
          <text x="100" y="20" fill="#ec4899" fontSize="12" fontWeight="bold" textAnchor="middle">
            p-Nitrophenol (Non-Volatile)
          </text>
          {/* Ring 1 */}
          <polygon points="60,45 90,62 90,96 60,113 30,96 30,62" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <line x1="60" y1="45" x2="60" y2="30" stroke="#e2e8f0" strokeWidth="2" />
          <text x="60" y="28" fill="#ef4444" fontSize="10" textAnchor="middle">O—H</text>
          <line x1="60" y1="113" x2="60" y2="128" stroke="#e2e8f0" strokeWidth="2" />
          <text x="60" y="138" fill="#38bdf8" fontSize="10" textAnchor="middle">NO₂</text>

          {/* Dotted Intermolecular bond to adjacent molecule */}
          <path d="M 70 28 L 130 28" fill="none" stroke="#ec4899" strokeWidth="2.5" strokeDasharray="3 3" />
          <text x="100" y="22" fill="#ec4899" fontSize="9" fontWeight="bold">Inter H-Bond</text>

          {/* Ring 2 partial */}
          <circle cx="150" cy="28" r="10" fill="#ef4444" opacity="0.6" />
          <text x="150" y="31" fill="#ffffff" fontSize="8" textAnchor="middle">O-Ar</text>
          <text x="100" y="155" fill="#94a3b8" fontSize="10" textAnchor="middle">B.P. = 279°C | Non-Volatile</text>
        </g>
      </svg>
    </div>
  );
};

// ==========================================
// SVG DIAGRAM 3: KOLBE & REIMER-TIEMANN MECHANISM
// ==========================================
const KolbeReimerMechanismSVG: React.FC<{ reactionType: 'kolbe' | 'reimer' }> = ({ reactionType }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h4 className="text-emerald-400 font-semibold mb-2 text-sm text-center">
        {reactionType === 'kolbe' ? "Kolbe-Schmitt Reaction Mechanism (Electrophile: CO2)" : "Reimer-Tiemann Mechanism (Electrophile: :CCl2 Carbene)"}
      </h4>
      <svg viewBox="0 0 600 200" className="w-full h-44">
        <rect width="600" height="200" fill="#0f172a" rx="8" />

        {reactionType === 'kolbe' ? (
          <g transform="translate(40, 20)">
            {/* Step 1: Phenoxide */}
            <g transform="translate(20, 20)">
              <polygon points="40,30 65,45 65,75 40,90 15,75 15,45" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="15" stroke="#e2e8f0" strokeWidth="2" />
              <text x="40" y="12" fill="#ef4444" fontSize="10" textAnchor="middle" fontWeight="bold">O⁻ Na⁺</text>
              <text x="40" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">Sodium Phenoxide</text>
            </g>

            <text x="130" y="70" fill="#10b981" fontSize="18" fontWeight="bold">+</text>
            <text x="160" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold">O=C=O (400K, 4-7 atm)</text>
            <path d="M 230 65 L 270 65" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Step 2: Intermediate */}
            <g transform="translate(280, 20)">
              <polygon points="40,30 65,45 65,75 40,90 15,75 15,45" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="15" stroke="#e2e8f0" strokeWidth="2" />
              <text x="40" y="12" fill="#ef4444" fontSize="10" textAnchor="middle">O⁻</text>
              <line x1="65" y1="45" x2="85" y2="35" stroke="#10b981" strokeWidth="2" />
              <text x="105" y="38" fill="#10b981" fontSize="10" textAnchor="middle">COO⁻ Na⁺</text>
              <text x="40" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">Sodium Salicylate</text>
            </g>

            <path d="M 390 65 L 425 65" stroke="#10b981" strokeWidth="2" />
            <text x="407" y="55" fill="#f59e0b" fontSize="10" textAnchor="middle">H⁺ / H₂O</text>

            {/* Step 3: Salicylic acid */}
            <g transform="translate(435, 20)">
              <polygon points="40,30 65,45 65,75 40,90 15,75 15,45" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="15" stroke="#e2e8f0" strokeWidth="2" />
              <text x="40" y="12" fill="#ef4444" fontSize="10" textAnchor="middle">OH</text>
              <line x1="65" y1="45" x2="85" y2="35" stroke="#10b981" strokeWidth="2" />
              <text x="110" y="38" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">COOH</text>
              <text x="40" y="110" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">Salicylic Acid</text>
            </g>
          </g>
        ) : (
          <g transform="translate(30, 20)">
            {/* Step 1: CHCl3 + KOH -> :CCl2 */}
            <g transform="translate(10, 30)">
              <rect x="0" y="0" width="140" height="90" fill="#1e293b" stroke="#f59e0b" rx="6" />
              <text x="70" y="20" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Carbene Generation</text>
              <text x="70" y="42" fill="#e2e8f0" fontSize="10" textAnchor="middle">CHCl₃ + OH⁻ → :CCl₃⁻ + H₂O</text>
              <text x="70" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">:CCl₃⁻ → :CCl₂ + Cl⁻</text>
              <text x="70" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">(Dichlorocarbene Electrophile)</text>
            </g>

            <path d="M 160 75 L 195 75" stroke="#38bdf8" strokeWidth="2" />

            {/* Attack on phenoxide */}
            <g transform="translate(200, 20)">
              <polygon points="40,30 65,45 65,75 40,90 15,75 15,45" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="15" stroke="#e2e8f0" strokeWidth="2" />
              <text x="40" y="12" fill="#ef4444" fontSize="10" textAnchor="middle">O⁻</text>
              <line x1="65" y1="45" x2="85" y2="35" stroke="#38bdf8" strokeWidth="2" />
              <text x="105" y="38" fill="#38bdf8" fontSize="10" textAnchor="middle">CHCl₂</text>
              <text x="40" y="110" fill="#94a3b8" fontSize="10" textAnchor="middle">Intermediate</text>
            </g>

            <path d="M 320 75 L 355 75" stroke="#38bdf8" strokeWidth="2" />
            <text x="337" y="65" fill="#f59e0b" fontSize="9" textAnchor="middle">aq KOH / H⁺</text>

            {/* Product: Salicylaldehyde */}
            <g transform="translate(365, 20)">
              <polygon points="40,30 65,45 65,75 40,90 15,75 15,45" fill="none" stroke="#e2e8f0" strokeWidth="2" />
              <line x1="40" y1="30" x2="40" y2="15" stroke="#e2e8f0" strokeWidth="2" />
              <text x="40" y="12" fill="#ef4444" fontSize="10" textAnchor="middle">OH</text>
              <line x1="65" y1="45" x2="85" y2="35" stroke="#38bdf8" strokeWidth="2" />
              <text x="105" y="38" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">CHO</text>
              <text x="40" y="110" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Salicylaldehyde</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// SVG DIAGRAM 4: QUALITATIVE DISTINCTION TESTS
// ==========================================
const PhenolDistinctionSVG: React.FC<{ testType: 'fecl3' | 'azo' | 'nahco3' }> = ({ testType }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h4 className="text-purple-400 font-semibold mb-2 text-sm text-center">
        Qualitative Chemical Identification Diagnostics
      </h4>
      <svg viewBox="0 0 600 180" className="w-full h-40">
        <rect width="600" height="180" fill="#0f172a" rx="8" />

        {testType === 'fecl3' && (
          <g transform="translate(50, 15)">
            {/* Test tube 1: FeCl3 + Phenol */}
            <g transform="translate(40, 10)">
              <path d="M 20 20 L 20 110 C 20 125 50 125 50 110 L 50 20 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
              {/* Liquid inside */}
              <path d="M 21 50 L 21 110 C 21 123 49 123 49 110 L 49 50 Z" fill="#7e22ce" opacity="0.85" />
              <text x="35" y="80" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Violet Complex</text>
              <text x="35" y="142" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">Phenol + neutral FeCl₃</text>
              <text x="35" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle">[Fe(OC₆H₅)₆]³⁻</text>
            </g>

            {/* Test tube 2: FeCl3 + Ethanol */}
            <g transform="translate(220, 10)">
              <path d="M 20 20 L 20 110 C 20 125 50 125 50 110 L 50 20 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 21 60 L 21 110 C 21 123 49 123 49 110 L 49 60 Z" fill="#eab308" opacity="0.3" />
              <text x="35" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Yellow Reagent</text>
              <text x="35" y="142" fill="#cbd5e1" fontSize="10" textAnchor="middle">Ethanol + FeCl₃</text>
              <text x="35" y="155" fill="#ef4444" fontSize="8" textAnchor="middle">NO COLOR CHANGE</text>
            </g>

            {/* Test tube 3: FeCl3 + Acetic acid */}
            <g transform="translate(400, 10)">
              <path d="M 20 20 L 20 110 C 20 125 50 125 50 110 L 50 20 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 21 55 L 21 110 C 21 123 49 123 49 110 L 49 55 Z" fill="#b91c1c" opacity="0.7" />
              <text x="35" y="85" fill="#ffffff" fontSize="8" textAnchor="middle">Buff / Red Ppt</text>
              <text x="35" y="142" fill="#cbd5e1" fontSize="10" textAnchor="middle">Acetic Acid + FeCl₃</text>
              <text x="35" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle">Ferric Acetate</text>
            </g>
          </g>
        )}

        {testType === 'azo' && (
          <g transform="translate(60, 20)">
            {/* Reaction schematic */}
            <text x="120" y="30" fill="#e2e8f0" fontSize="12" textAnchor="middle">C₆H₅N₂⁺ Cl⁻ + C₆H₅OH (pH 9-10)</text>
            <path d="M 120 40 L 120 65" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />

            {/* Dye molecule representation */}
            <g transform="translate(20, 75)">
              <rect x="0" y="0" width="500" height="65" fill="#1e293b" stroke="#ea580c" rx="6" />
              <text x="250" y="25" fill="#f97316" fontSize="14" fontWeight="bold" textAnchor="middle">
                HO — C₆H₄ — N ═ N — C₆H₅ (p-Hydroxyazobenzene)
              </text>
              <text x="250" y="48" fill="#fb923c" fontSize="11" textAnchor="middle">
                CHARACTERISTIC BRILLIANT ORANGE-RED AZO DYE PRECIPITATE
              </text>
            </g>
          </g>
        )}

        {testType === 'nahco3' && (
          <g transform="translate(80, 20)">
            <g transform="translate(60, 10)">
              <path d="M 20 20 L 20 110 C 20 125 50 125 50 110 L 50 20 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 21 60 L 21 110 C 21 123 49 123 49 110 L 49 60 Z" fill="#38bdf8" opacity="0.2" />
              <text x="35" y="85" fill="#cbd5e1" fontSize="9" textAnchor="middle">No Bubbles</text>
              <text x="35" y="142" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Phenol + NaHCO₃</text>
              <text x="35" y="155" fill="#ef4444" fontSize="9" textAnchor="middle">NO Effervescence (pKa 9.95 &gt; 6.35)</text>
            </g>

            <g transform="translate(300, 10)">
              <path d="M 20 20 L 20 110 C 20 125 50 125 50 110 L 50 20 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
              <path d="M 21 60 L 21 110 C 21 123 49 123 49 110 L 49 60 Z" fill="#38bdf8" opacity="0.4" />
              {/* CO2 bubbles */}
              <circle cx="30" cy="80" r="3" fill="#ffffff" />
              <circle cx="40" cy="65" r="4" fill="#ffffff" />
              <circle cx="28" cy="50" r="2.5" fill="#ffffff" />
              <text x="35" y="95" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">CO₂ Gas ↑</text>
              <text x="35" y="142" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Benzoic Acid + NaHCO₃</text>
              <text x="35" y="155" fill="#10b981" fontSize="9" textAnchor="middle">Brisk Effervescence (pKa 4.2)</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// INTERACTIVE CANVAS ANIMATION COMPONENT
// ==========================================
const PhenolReactionCanvas: React.FC<{
  labStep: number;
  substituent: string;
  position: string;
  reagent: string;
  temperature: number;
  isSimulating: boolean;
}> = ({ labStep, substituent, position, reagent, temperature, isSimulating }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string; label: string }> = [];

    // Initialize particle system based on labStep & reagent
    const particleCount = 24;
    for (let i = 0; i < particleCount; i++) {
      let color = '#38bdf8';
      let label = 'Phenol';
      if (i % 2 === 1) {
        if (labStep === 0) {
          color = substituent === '-NO2' ? '#ef4444' : substituent === '-CH3' ? '#10b981' : '#3b82f6';
          label = substituent !== 'none' ? substituent : 'H2O';
        } else if (labStep === 1) {
          color = reagent.includes('Br2') ? '#f97316' : '#ec4899';
          label = reagent.includes('Br2') ? 'Br₂' : 'HNO₃';
        } else if (labStep === 2) {
          color = '#10b981';
          label = reagent.includes('CO2') ? 'CO₂' : ':CCl₂';
        } else if (labStep === 3) {
          color = '#eab308';
          label = reagent.includes('Cr') ? '[O]' : 'Zn';
        } else {
          color = '#a855f7';
          label = reagent.includes('Fe') ? 'FeCl₃' : 'Ar-N₂⁺';
        }
      }
      particles.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: Math.random() * (canvas.height - 40) + 20,
        vx: (Math.random() - 0.5) * (temperature / 25),
        vy: (Math.random() - 0.5) * (temperature / 25),
        radius: 12 + Math.random() * 4,
        color,
        label
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background liquid hue
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render temperature motion & bond line collisions
      particles.forEach((p, idx) => {
        if (isSimulating) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < p.radius || p.x > canvas.width - p.radius) p.vx *= -1;
          if (p.y < p.radius || p.y > canvas.height - p.radius) p.vy *= -1;
        }

        // Connect nearby reacting particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = 1 - dist / 70;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.label, p.x, p.y);
      });

      // Special visual overlays for completed reactions
      if (labStep === 4 && reagent.includes('Fe')) {
        // Deep purple tint
        ctx.fillStyle = 'rgba(126, 34, 206, 0.25)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#c084fc';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('VIOLET COMPLEX FORMED: [Fe(OC6H5)6]3-', canvas.width / 2, canvas.height - 20);
      } else if (labStep === 1 && reagent === 'Br2_H2O') {
        // White precipitate overlay
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('HEAVY WHITE PPT: 2,4,6-Tribromophenol', canvas.width / 2, canvas.height - 20);
      } else if (labStep === 4 && reagent === 'azo') {
        // Orange dye overlay
        ctx.fillStyle = 'rgba(234, 88, 12, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fb923c';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText('ORANGE-RED AZO DYE PRECIPITATED', canvas.width / 2, canvas.height - 20);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [labStep, substituent, position, reagent, temperature, isSimulating]);

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 shadow-inner">
      <canvas ref={canvasRef} width={640} height={240} className="w-full h-60 bg-slate-950 block" />
      <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm px-3 py-1 rounded-md border border-slate-700 text-xs text-slate-300">
        Temp: {temperature}°C | Kinematics Active
      </div>
    </div>
  );
};

// ==========================================
// MAIN SIMULATION COMPONENT
// ==========================================
export const C12_ChemistryPhenolsSim: React.FC<{ onComplete?: (score: number) => void }> = ({ onComplete }) => {
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab Controls State
  const [selectedLabStep, setSelectedLabStep] = useState<number>(0);
  const [substituent, setSubstituent] = useState<string>('none');
  const [substituentPos, setSubstituentPos] = useState<string>('para');
  const [reagent, setReagent] = useState<string>('dil_HNO3');
  const [temperature, setTemperature] = useState<number>(25);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [reactionProgress, setReactionProgress] = useState<number>(0);

  // Discovery & Verification state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge engine state
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Feedback FX State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // BKT & SRS Tracking States
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach(c => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Auto-hint timer (10s inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      const currentChallenge = CHALLENGES[currentChallengeIdx];
      if (currentChallenge && currentChallenge.hints && currentChallenge.hints.length > 0) {
        setCurrentHint(currentChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak(`Hint: ${currentChallenge.hints[0]}`);
      }
    }, 10000);
  }, [currentChallengeIdx]);

  useEffect(() => {
    if (activeTab === 'challenges') {
      resetInactivityTimer();
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
      setShowHint(false);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIdx, resetInactivityTimer]);

  // Derived pKa calculation for Lab 1
  const calculatedPKa = useMemo(() => {
    let base = 9.95; // Unsubstituted phenol pKa
    if (substituent === '-NO2') {
      if (substituentPos === 'para') base = 7.15;
      else if (substituentPos === 'ortho') base = 7.23;
      else if (substituentPos === 'meta') base = 8.35;
    } else if (substituent === '-CH3') {
      if (substituentPos === 'para') base = 10.26;
      else if (substituentPos === 'ortho') base = 10.28;
      else if (substituentPos === 'meta') base = 10.08;
    } else if (substituent === '-OCH3') {
      if (substituentPos === 'para') base = 10.20;
      else if (substituentPos === 'meta') base = 9.65;
    } else if (substituent === '-Cl') {
      if (substituentPos === 'para') base = 9.38;
      else if (substituentPos === 'ortho') base = 8.48;
      else if (substituentPos === 'meta') base = 9.02;
    } else if (substituent === 'picric') {
      base = 0.38;
    }
    return base;
  }, [substituent, substituentPos]);

  // Handle Discovery submit
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Phenoxide resonance delocalizes negative charge into the aromatic ring.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider how the conjugate base phenoxide ion is stabilized by resonance.');
    }
  };

  // Handle Prediction Submit
  const handlePredictionSelect = (qIdx: number, optIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const pQ = PREDICTION_QUESTIONS[qIdx];
    if (optIdx === pQ.correctIndex) {
      audioManager.play('chime');
      speechManager.speak('Great prediction! Proceed to the lab to verify your hypothesis.');
    } else {
      audioManager.play('tap');
    }
  };

  // Handle Observation Submit
  const handleObservationSelect = (qIdx: number, optIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const oQ = OBSERVATION_QUESTIONS[qIdx];
    if (optIdx === oQ.correctIndex) {
      audioManager.play('sparkle');
      speechManager.speak('Spot on observation!');
    } else {
      audioManager.play('tap');
    }
  };

  // Challenge submission logic
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    const current = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (current.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && Math.abs(val - (current.correctAnswer || 0)) < 0.2) {
        isCorrect = true;
      }
    } else {
      if (selectedOption === current.correctIndex) {
        isCorrect = true;
      }
    }

    // Update BKT State
    setBktStates(prev => {
      const nodeState = prev[current.nodeId] || createBKTState();
      const updated = bktUpdate(nodeState, isCorrect);
      return { ...prev, [current.nodeId]: updated };
    });

    // Update SRS Item
    setSrsItems(prev => {
      const item = prev[current.id] || createReviewItem(current.id);
      const quality = isCorrect ? 5 : 2;
      const updated = sm2Update(item, quality);
      return { ...prev, [current.id]: updated };
    });

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent job! Correct answer.');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${current.explanation}` });
      setChallengeScore(prev => prev + 10);
      setCompletedChallenges(prev => new Set(prev).add(current.id));
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      // Check if finished all challenges
      if (completedChallenges.size + 1 >= CHALLENGES.length) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have mastered ISC Class 12 Phenols Synthesis & Analysis.');
        recordGameScore('c12_chem_phenols', challengeScore + 10);
        if (onComplete) onComplete(challengeScore + 10);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('That answer is incorrect. Review the reaction mechanism details.');
      setChallengeFeedback({ isCorrect: false, text: `Incorrect. ${current.explanation}` });
    }
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      audioManager.play('whoosh');
    }
  };

  const prevChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    if (currentChallengeIdx > 0) {
      setCurrentChallengeIdx(prev => prev - 1);
      audioManager.play('whoosh');
    }
  };

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach(id => {
      const state = bktStates[id];
      total += state ? masteryProb(state) : 0;
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Feedback FX Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="ISC Phenols Chemistry Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHint} />

      {/* Header & Lab Title Bar */}
      <header className="w-full max-w-6xl mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-wide">
              ISC Class 12 Chemistry
            </span>
            <span className="bg-cyan-500/20 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
              Nodes 071 - 080
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {SCENARIO.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {SCENARIO.context}
          </p>
        </div>

        {/* Dynamic Mastery Badge */}
        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400">Mastery Progress</div>
            <div className="text-2xl font-black text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500/30 border-t-emerald-400 flex items-center justify-center font-bold text-xs">
            BKT
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-6xl mb-6 flex bg-slate-900 border border-slate-800 p-1.5 rounded-xl gap-2">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'discovery'
              ? 'bg-amber-500 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          1. Discovery & Hypotheses
        </button>
        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'lab'
              ? 'bg-cyan-500 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          2. Interactive Exploration Labs
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'challenges'
              ? 'bg-emerald-500 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          3. Challenges ({completedChallenges.size}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all ${
            activeTab === 'summary'
              ? 'bg-purple-500 text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          4. Summary & Industrial Report
        </button>
      </nav>

      {/* ========================================== */}
      {/* TAB 1: DISCOVERY & HYPOTHESES */}
      {/* ========================================== */}
      {activeTab === 'discovery' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* Narrative Scenario Box */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-amber-400 text-lg font-bold mb-2">Research Briefing & Lab Scenario</h3>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              {SCENARIO.intro}
            </p>
          </div>

          {/* Core Discovery Question */}
          <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-amber-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded">
                FOUNDATIONAL DISCOVERY
              </span>
              <span className="text-xs text-slate-400">Target Node: c12_chem_073</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  disabled={discoverySubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                    discoverySelected === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  <span className="flex-1">{opt}</span>
                </button>
              ))}
            </div>

            {discoverySubmitted && (
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-sm text-slate-300 animate-fadeIn">
                <span className="text-amber-400 font-bold block mb-1">Theoretical Insight:</span>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* PREDICTION_QUESTIONS.map() */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-cyan-400 text-lg font-bold mb-4">Hypothesis Predictions (Pre-Lab Testing)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-cyan-400 font-bold mb-2">Prediction Question {qIdx + 1} ({pq.nodeId})</div>
                    <p className="text-sm font-semibold text-white mb-3">{pq.question}</p>
                    <div className="space-y-2 mb-4">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSelect(qIdx, oIdx)}
                          className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                            predictionAnswers[qIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  {predictionAnswers[qIdx] !== undefined && (
                    <div className="text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded border border-amber-500/20">
                      <strong>Verification Route:</strong> {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
      {/* ========================================== */}
      {activeTab === 'lab' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* Step Selector Tab Bar (EXPLORATION_STEPS.map) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => { setSelectedLabStep(idx); audioManager.play('tap'); }}
                className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                  selectedLabStep === idx
                    ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg scale-102'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-white'
                }`}
              >
                <div className="text-[10px] opacity-75 uppercase">Node: {step.nodeId}</div>
                <div className="truncate mt-0.5">{step.title.split(':')[0]}</div>
              </button>
            ))}
          </div>

          {/* Current Step Instruction Box */}
          <div className="bg-slate-900 border border-cyan-500/30 p-5 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-cyan-400 font-bold text-lg">
                {EXPLORATION_STEPS[selectedLabStep].title}
              </h3>
              <p className="text-slate-300 text-sm mt-1">
                {EXPLORATION_STEPS[selectedLabStep].instruction}
              </p>
            </div>
            <button
              onClick={() => { setIsSimulating(!isSimulating); audioManager.play('pop'); }}
              className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                isSimulating ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500 text-slate-950'
              }`}
            >
              {isSimulating ? 'Pause Motion' : 'Start Motion'}
            </button>
          </div>

          {/* Interactive Lab Canvas & Controls Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Visualizer Column (2 Cols) */}
            <div className="lg:col-span-2 space-y-4">
              <PhenolReactionCanvas
                labStep={selectedLabStep}
                substituent={substituent}
                position={substituentPos}
                reagent={reagent}
                temperature={temperature}
                isSimulating={isSimulating}
              />

              {/* Specific SVG Diagram overlays */}
              {selectedLabStep === 0 && (
                <PhenolResonanceSVG substituent={substituent} position={substituentPos} />
              )}
              {selectedLabStep === 1 && (
                <NitrationRegioselectivitySVG reagent={reagent} />
              )}
              {selectedLabStep === 2 && (
                <KolbeReimerMechanismSVG reactionType={reagent.includes('CO2') ? 'kolbe' : 'reimer'} />
              )}
              {selectedLabStep === 4 && (
                <PhenolDistinctionSVG testType={reagent.includes('Fe') ? 'fecl3' : reagent.includes('azo') ? 'azo' : 'nahco3'} />
              )}
            </div>

            {/* Parameter Adjustment Controls Column (1 Col) */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg space-y-5">
              <h4 className="text-white font-bold text-sm border-b border-slate-800 pb-2">
                Experiment Parameters
              </h4>

              {/* Lab Step 0 Controls: Substituents & pKa */}
              {selectedLabStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Aromatic Ring Substituent</label>
                    <select
                      value={substituent}
                      onChange={(e) => { setSubstituent(e.target.value); audioManager.play('pickup'); }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="none">None (Unsubstituted Phenol)</option>
                      <option value="-NO2">-NO2 (Strong -I, -M Electron Withdrawing)</option>
                      <option value="-CH3">-CH3 (Weak +I Electron Donating)</option>
                      <option value="-OCH3">-OCH3 (Strong +M Electron Donating)</option>
                      <option value="-Cl">-Cl (Halogen: -I &gt; +M)</option>
                      <option value="picric">Three -NO2 (2,4,6-Trinitrophenol / Picric Acid)</option>
                    </select>
                  </div>

                  {substituent !== 'none' && substituent !== 'picric' && (
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Substituent Ring Position</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['ortho', 'meta', 'para'].map(pos => (
                          <button
                            key={pos}
                            onClick={() => { setSubstituentPos(pos); audioManager.play('tap'); }}
                            className={`py-2 text-xs rounded-lg font-bold capitalize transition-all ${
                              substituentPos === pos ? 'bg-amber-500 text-slate-950' : 'bg-slate-950 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {pos}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Calculated pKa Monitor */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-center">
                    <div className="text-xs text-slate-400 uppercase tracking-wider">Measured pKa Value</div>
                    <div className="text-3xl font-black text-amber-400 mt-1">{calculatedPKa}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {calculatedPKa < 7.0 ? 'Strongly Acidic Phenolic Derivative' : calculatedPKa > 10.0 ? 'Weaker Acid than Phenol' : 'Standard Phenolic Acidity'}
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Step 1 Controls: Electrophilic Substitution */}
              {selectedLabStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Reagent & Solvent System</label>
                    <select
                      value={reagent}
                      onChange={(e) => { setReagent(e.target.value); audioManager.play('pickup'); }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="dil_HNO3">Dilute HNO3 at 298 K (Mononitration)</option>
                      <option value="conc_HNO3">Conc. HNO3 + Conc. H2SO4 (Trinitration)</option>
                      <option value="Br2_CS2">Br2 in CS2 / CHCl3 at 273 K (Monobromination)</option>
                      <option value="Br2_H2O">Br2 in H2O Water (Tribromination)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Reaction Temperature: {temperature}°C</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={temperature}
                      onChange={(e) => setTemperature(parseInt(e.target.value))}
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-cyan-400 block mb-1">Reaction Outcome:</span>
                    {reagent === 'dil_HNO3' && 'Yields o-nitrophenol (30-40%) and p-nitrophenol (15-20%). Separated by steam distillation.'}
                    {reagent === 'conc_HNO3' && 'Vigorous oxidation & nitration to yield 2,4,6-trinitrophenol (Picric acid).'}
                    {reagent === 'Br2_CS2' && 'Yields 4-bromophenol (80% major) without any catalyst.'}
                    {reagent === 'Br2_H2O' && 'Forms insoluble white ppt of 2,4,6-tribromophenol instantly.'}
                  </div>
                </div>
              )}

              {/* Lab Step 2 Controls: Industrial Pathways */}
              {selectedLabStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Industrial Named Reaction</label>
                    <select
                      value={reagent}
                      onChange={(e) => { setReagent(e.target.value); audioManager.play('pickup'); }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="CO2_kolbe">Kolbe-Schmitt Reaction (NaOH + CO2, 400K, 4-7 atm)</option>
                      <option value="CHCl3_reimer">Reimer-Tiemann Reaction (CHCl3 + aq KOH)</option>
                    </select>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-emerald-400 block mb-1">Target Pharmaceutical:</span>
                    {reagent.includes('CO2')
                      ? 'Salicylic acid (2-hydroxybenzoic acid) -> acetylated to Aspirin.'
                      : 'Salicylaldehyde (2-hydroxybenzaldehyde) -> precursor for coumarins & perfumes.'}
                  </div>
                </div>
              )}

              {/* Lab Step 3 Controls: Redox */}
              {selectedLabStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Redox Reagent Choice</label>
                    <select
                      value={reagent}
                      onChange={(e) => { setReagent(e.target.value); audioManager.play('pickup'); }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="Cr_oxid">Acidified Na2Cr2O7 (Oxidation to Benzoquinone)</option>
                      <option value="Zn_red">Zinc Dust Distillation (Reduction to Benzene)</option>
                      <option value="H2_Ni">H2 / Ni Catalyst at 433 K (Hydrogenation to Cyclohexanol)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Lab Step 4 Controls: Qualitative Tests */}
              {selectedLabStep === 4 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Qualitative Test Solution</label>
                    <select
                      value={reagent}
                      onChange={(e) => { setReagent(e.target.value); audioManager.play('pickup'); }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="FeCl3">Neutral FeCl3 Test (Phenolic -OH Complexation)</option>
                      <option value="azo">Benzene Diazonium Chloride Coupling (Azo Dye)</option>
                      <option value="nahco3">Sodium Bicarbonate (NaHCO3) Effervescence Test</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* OBSERVATION_QUESTIONS.map() */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg mt-6">
            <h3 className="text-emerald-400 text-lg font-bold mb-4">Post-Exploration Lab Observations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl">
                  <div className="text-xs text-emerald-400 font-bold mb-2">Observation {idx + 1} ({oq.nodeId})</div>
                  <p className="text-sm font-semibold text-white mb-3">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleObservationSelect(idx, oIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                          observationAnswers[idx] === oIdx
                            ? oIdx === oq.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950 border-rose-500 text-rose-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
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
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 3: CHALLENGES (24 PROGRESSIVE ITEMS) */}
      {/* ========================================== */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-4xl space-y-6">
          {/* Challenge Navigation & Progress Bar */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                currentChallenge.difficulty === 'foundation'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : currentChallenge.difficulty === 'standard'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
              }`}>
                {currentChallenge.difficulty}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevChallenge}
                disabled={currentChallengeIdx === 0}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextChallenge}
                disabled={currentChallengeIdx === CHALLENGES.length - 1}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 hover:bg-slate-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Current Challenge Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                Competency: {currentChallenge.competencyLevel}
              </span>
              <span className="text-xs text-slate-500 font-mono">Node: {currentChallenge.nodeId}</span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {currentChallenge.question}
            </h3>

            {/* Answer Options or Numeric Input */}
            {currentChallenge.type === 'numeric' ? (
              <div className="space-y-4 mb-6">
                <label className="text-xs text-slate-400 block">Enter numerical answer (accurate to 0.1):</label>
                <input
                  type="number"
                  step="0.1"
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  placeholder="e.g. 94.1"
                  className="w-full max-w-xs bg-slate-950 border border-slate-700 rounded-xl p-3 text-white text-lg font-mono focus:border-emerald-500 outline-none"
                />
              </div>
            ) : (
              <div className="space-y-3 mb-6">
                {currentChallenge.options?.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedOption(idx); audioManager.play('tap'); }}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      selectedOption === idx
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    <span className="flex-1">{opt}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  if (currentChallenge.hints && currentChallenge.hints.length > 0) {
                    setCurrentHint(currentChallenge.hints[0]);
                    setShowHint(true);
                    audioManager.play('hint');
                  }
                }}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                💡 Need a hint?
              </button>

              <button
                onClick={handleChallengeSubmit}
                disabled={currentChallenge.type === 'numeric' ? !numericAnswer : selectedOption === null}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            </div>

            {/* Feedback Banner */}
            {challengeFeedback && (
              <div className={`mt-6 p-4 rounded-xl border text-sm leading-relaxed ${
                challengeFeedback.isCorrect
                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                  : 'bg-rose-950/90 border-rose-500 text-rose-200'
              }`}>
                {challengeFeedback.text}
              </div>
            )}
          </div>
        </main>
      )}

      {/* ========================================== */}
      {/* TAB 4: SUMMARY & REAL-WORLD REPORT */}
      {/* ========================================== */}
      {activeTab === 'summary' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* REAL_WORLD_ACTIVITY Rendered */}
          <div className="bg-slate-900 border border-purple-500/30 p-6 md:p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded uppercase">
                Industrial Analytical Protocol
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-slate-300 text-sm mb-6 max-w-3xl">
              {REAL_WORLD_ACTIVITY.description}
            </p>

            <div className="space-y-4">
              <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider">
                Standard Operating Procedure Steps:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                    <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Node Mastery Breakdown Grid */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-white font-bold text-lg mb-4">ISC Syllabus Mastery Assessment (Nodes 071-080)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {ALL_NODE_IDS.map(nodeId => {
                const state = bktStates[nodeId];
                const mastery = state ? Math.round(masteryProb(state) * 100) : 0;
                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="text-[10px] text-slate-500 font-mono">{nodeId}</div>
                    <div className="text-xl font-bold text-emerald-400 my-1">{mastery}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full transition-all duration-500" style={{ width: `${mastery}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Misconception Review Cards */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-amber-400 font-bold text-lg mb-4">Common Misconceptions & Corrections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map(m => (
                <div key={m.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
                  <div className="text-rose-400 font-bold">❌ Misconception: "{m.misconception}"</div>
                  <div className="text-emerald-400 font-bold">✔ Correction: {m.correction}</div>
                  <p className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">{m.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default C12_ChemistryPhenolsSim;