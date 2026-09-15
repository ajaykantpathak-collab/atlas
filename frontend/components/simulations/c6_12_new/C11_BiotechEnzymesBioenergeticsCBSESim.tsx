'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. ALL NODE IDS DEFINITION
// ==========================================
const ALL_NODE_IDS = [
  'c11_bt_cbse_181', 'c11_bt_cbse_182', 'c11_bt_cbse_183', 'c11_bt_cbse_184',
  'c11_bt_cbse_185', 'c11_bt_cbse_186', 'c11_bt_cbse_187', 'c11_bt_cbse_188',
  'c11_bt_cbse_189', 'c11_bt_cbse_190', 'c11_bt_cbse_191', 'c11_bt_cbse_192',
  'c11_bt_cbse_193', 'c11_bt_cbse_194', 'c11_bt_cbse_195', 'c11_bt_cbse_196',
  'c11_bt_cbse_197', 'c11_bt_cbse_198', 'c11_bt_cbse_199', 'c11_bt_cbse_200',
  'c11_bt_cbse_201', 'c11_bt_cbse_202', 'c11_bt_cbse_203', 'c11_bt_cbse_204',
  'c11_bt_cbse_205', 'c11_bt_cbse_206', 'c11_bt_cbse_207', 'c11_bt_cbse_208',
  'c11_bt_cbse_209', 'c11_bt_cbse_210', 'c11_bt_cbse_211', 'c11_bt_cbse_212',
  'c11_bt_cbse_213', 'c11_bt_cbse_214', 'c11_bt_cbse_215', 'c11_bt_cbse_216',
  'c11_bt_cbse_217'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// 2. MANDATORY DATA STRUCTURES & DATA
// ==========================================

const SCENARIO = {
  title: 'Biocatalysis & Bioenergetics Virtual Research Facility',
  intro: 'Welcome to the Advanced Bioenergetics and Enzyme Engineering Laboratory. As a senior bioprocess scientist, you will analyze enzyme-catalyzed reaction dynamics, thermodynamic free energy coupling, and inhibition mechanics.',
  context: 'In this virtual suite, you will manipulate substrate concentrations, temperature, pH, cofactors, and inhibitors while tracking thermodynamic parameters (ΔG, ΔH, ΔS) and Michaelis-Menten kinetic indices (Vmax, Km).'
};

const DISCOVERY_QUESTION = {
  question: 'An industrial biocatalyst operating at Vmax displays no increase in reaction velocity when substrate concentration is doubled. However, increasing temperature by 5°C boosts velocity by 25%. What fundamental property explains this observation?',
  options: [
    'Substrate concentration is limiting and higher temperature increases Km.',
    'At saturation (Vmax), active sites are occupied, and temperature increases kinetic energy & rate constant (kcat) without altering saturation state.',
    'Higher temperature turns competitive inhibitors into non-competitive cofactors.',
    'The enzyme is denatured at Vmax, so heat restores tertiary protein folding.'
  ],
  correctIndex: 1,
  hintAfter: 'Remember that Vmax represents complete enzyme active site saturation where velocity depends strictly on the catalytic turnover rate constant (kcat).'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Active Site & Cofactor Assembly',
    instruction: 'Assemble the active enzyme holoenzyme by pairing apoenzyme with its prosthetic group (FAD/Heme) and metal ion cofactors (Zn²⁺/Mg²⁺). Observe tertiary conformation changes.',
    interactionType: 'cofactor-assembly',
    nodeId: 'c11_bt_cbse_184'
  },
  {
    title: 'Lab 2: Michaelis-Menten Kinetics & Substrate Saturation',
    instruction: 'Vary substrate concentration [S] from 0 to 100 mM. Plot the reaction velocity curve and determine Vmax and Km (the substrate concentration at 0.5 Vmax).',
    interactionType: 'kinetics-plotter',
    nodeId: 'c11_bt_cbse_201'
  },
  {
    title: 'Lab 3: Enzyme Inhibition Mechanics',
    instruction: 'Introduce Competitive, Non-Competitive, and Uncompetitive inhibitors. Compare changes in apparent Km and Vmax on both hyperbolic and Lineweaver-Burk plots.',
    interactionType: 'inhibition-analysis',
    nodeId: 'c11_bt_cbse_202'
  },
  {
    title: 'Lab 4: Environmental Microenvironment (pH & Temperature)',
    instruction: 'Adjust pH (1.0 - 14.0) and Temperature (0 - 80°C). Track ionization states of active site residues and thermal denaturation pathways.',
    interactionType: 'denaturation-chamber',
    nodeId: 'c11_bt_cbse_195'
  },
  {
    title: 'Lab 5: Bioenergetics & ATP Hydrolysis Free Energy',
    instruction: 'Simulate endergonic cellular reactions coupled with ATP hydrolysis. Measure Gibbs Free Energy (ΔG) shift from positive to net negative.',
    interactionType: 'atp-coupling',
    nodeId: 'c11_bt_cbse_209'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a competitive inhibitor is added to an enzymatic reaction with a fixed substrate concentration [S] = 2 × Km, what will happen to the observed initial velocity (v0)?',
    options: [
      'Velocity decreases because the inhibitor competes for the free active site, raising apparent Km.',
      'Velocity increases because the inhibitor stabilizes the enzyme-substrate complex.',
      'Velocity remains completely unchanged because competitive inhibitors only alter Vmax.',
      'Velocity drops to zero regardless of substrate concentration.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Select Competitive Inhibitor in Lab 3 and observe the initial rate v0 drop at [S] = 2 Km.',
    nodeId: 'c11_bt_cbse_202'
  },
  {
    question: 'Predict: What happens to the Gibbs Free Energy change (ΔG) of a reaction when a hyper-efficient enzyme catalyst is introduced?',
    options: [
      'ΔG becomes much more negative, making the reaction yield more energy.',
      'ΔG becomes positive because the enzyme absorbs heat to lower activation energy.',
      'ΔG remains completely unchanged because enzymes alter only the activation energy barrier (Ea), not thermodynamic equilibrium.',
      'ΔG drops to absolute zero.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Switch to Bioenergetics Lab 5 and observe that ΔG remains constant while activation energy (Ea) decreases.',
    nodeId: 'c11_bt_cbse_200'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Lineweaver-Burk double reciprocal plot (1/v vs 1/[S]) when a non-competitive inhibitor is present?',
    observableOptions: [
      'The y-intercept (1/Vmax) increases while the x-intercept (-1/Km) remains unchanged.',
      'The x-intercept shifts right while y-intercept remains fixed at origin.',
      'Both x-intercept and y-intercept shift downward in parallel.',
      'The slope remains zero throughout.'
    ],
    correctIndex: 0,
    nodeId: 'c11_bt_cbse_203'
  },
  {
    question: 'What happens to enzyme activity when temperature exceeds its thermal optimum (T > 55°C)?',
    observableOptions: [
      'Activity increases exponentially due to maximum molecular collision frequency.',
      'Activity declines sharply due to disruption of non-covalent tertiary structure hydrogen/ionic bonds.',
      'Activity converts from exergonic to endergonic mode.',
      'The enzyme turns into its zymogen precursor form.'
    ],
    correctIndex: 1,
    nodeId: 'c11_bt_cbse_195'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Bio-therapeutics: Purifying & Standardizing Recombinant Lactase',
  description: 'As a quality control bio-engineer at a biopharmaceutical plant, standardizing standardized enzymatic units and verifying specific activity is essential for commercial lactase formulation.',
  steps: [
    'Measure raw catalytic activity in International Units (1 IU = 1 μmol substrate converted per minute at 37°C, pH 6.5).',
    'Quantify total protein concentration using a standard Bradford Assay (mg protein / mL).',
    'Calculate Specific Activity = Total Activity (IU) / Total Protein (mg). Target standard purity threshold is > 450 IU/mg.',
    'Test competitive inhibition by product (D-galactose) and set optimal bioreactor flow rates to prevent end-product inhibition.'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Enzymes Change Reaction Equilibrium',
    misconception: 'Enzymes shift the equilibrium of a chemical reaction towards more product formation.',
    correction: 'Enzymes accelerate both forward and reverse reaction rates equally by lowering activation energy. They reach equilibrium faster, but do NOT change the equilibrium constant (Keq) or net free energy change (ΔG).'
  },
  {
    id: 'misc_2',
    title: 'Lock & Key Means Rigid Inflexible Proteins',
    misconception: 'The active site is a rigid, pre-formed static mold that fits the substrate perfectly like a steel lock.',
    correction: 'Koshland’s Induced Fit model proves that enzyme active sites are dynamic. Substrate binding induces a conformational change in the enzyme protein matrix to fit the transition state optimally.'
  },
  {
    id: 'misc_3',
    title: 'Heat Always Increases Catalytic Rate',
    misconception: 'Higher temperature always accelerates enzymatic reactions without limit.',
    correction: 'While kinetic energy increases collision frequency up to the temperature optimum, excessive thermal energy disrupts hydrogen bonds, hydrophobic interactions, and salt bridges, causing irreversible denaturation.'
  },
  {
    id: 'misc_4',
    title: 'Competitive Inhibitors Permanently Destroy Enzymes',
    misconception: 'Competitive inhibition irreversibly deactivates the enzyme active site.',
    correction: 'Competitive inhibition is fully reversible. Because the inhibitor binds non-covalently to the active site, adding high excess substrate outcompetes the inhibitor and restores Vmax.'
  },
  {
    id: 'misc_5',
    title: 'ATP Contains High-Energy Covalent Phosphate Bonds',
    misconception: 'The phosphoanhydride bonds in ATP contain huge internal bond energy that explodes when snapped.',
    correction: 'The bonds themselves are not unusually strong. The free energy release (ΔG° = -30.5 kJ/mol) comes from relief of electrostatic repulsion between adjacent negative phosphate charges and enhanced resonance stabilization of products (ADP + Pi).'
  },
  {
    id: 'misc_6',
    title: 'Coenzymes are Catalytic Enzymes',
    misconception: 'Coenzymes are small protein enzymes.',
    correction: 'Coenzymes are non-protein organic molecules (often derived from vitamins such as NAD+, FAD, CoA) that act as transient chemical group or electron carriers working alongside apoenzymes.'
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which IUB enzyme class catalyzes double-bond formations or group removals without hydrolysis or oxidation?',
    options: ['Transferases', 'Lyases', 'Hydrolases', 'Isomerases'],
    correctIndex: 1,
    explanation: 'Lyases (EC 4) catalyze the cleavage of C-C, C-O, C-N and other bonds by elimination, forming double bonds or rings without water involvement.',
    nodeId: 'c11_bt_cbse_183'
  },
  {
    id: 'diag_2',
    question: 'An active enzyme complex consisting of its protein component and non-protein cofactor is properly termed:',
    options: ['Apoenzyme', 'Holoenzyme', 'Zymogen', 'Prosthetic group'],
    correctIndex: 1,
    explanation: 'A active complete enzyme complex (Apoenzyme + Cofactor) is termed a Holoenzyme.',
    nodeId: 'c11_bt_cbse_184'
  },
  {
    id: 'diag_3',
    question: 'The SI unit for enzyme activity equivalent to 1 mole of substrate transformed per second is:',
    options: ['International Unit (IU)', 'Katal (kat)', 'Specific Activity Unit', 'Turnover Number (kcat)'],
    correctIndex: 1,
    explanation: '1 Katal (kat) = 1 mol/sec transformed. (1 IU = 1 μmol/min = 16.67 nkat).',
    nodeId: 'c11_bt_cbse_198'
  },
  {
    id: 'diag_4',
    question: 'Which vitamin precursor is required for the biosynthesis of Flavin Adenine Dinucleotide (FAD)?',
    options: ['Vitamin B1 (Thiamine)', 'Vitamin B2 (Riboflavin)', 'Vitamin B3 (Niacin)', 'Vitamin B6 (Pyridoxine)'],
    correctIndex: 1,
    explanation: 'Riboflavin (Vitamin B2) is the precursor for FMN and FAD coenzymes.',
    nodeId: 'c11_bt_cbse_185'
  },
  {
    id: 'diag_5',
    question: 'In competitive enzyme inhibition, how are Km and Vmax affected?',
    options: [
      'Km increases (lower apparent affinity), Vmax remains unchanged',
      'Km remains unchanged, Vmax decreases',
      'Both Km and Vmax decrease proportionally',
      'Km decreases, Vmax increases'
    ],
    correctIndex: 0,
    explanation: 'In competitive inhibition, substrate outcompetes inhibitor at high [S], so Vmax is unchanged, but apparent Km increases.',
    nodeId: 'c11_bt_cbse_202'
  },
  {
    id: 'diag_6',
    question: 'What type of kinetic curve is typically exhibited by allosteric enzymes displaying cooperative substrate binding?',
    options: ['Hyperbolic curve', 'Sigmoidal (S-shaped) curve', 'Linear double-reciprocal curve', 'Parabolic bell curve'],
    correctIndex: 1,
    explanation: 'Allosteric enzymes with multi-subunit cooperativity display a sigmoidal v0 vs [S] velocity curve.',
    nodeId: 'c11_bt_cbse_206'
  },
  {
    id: 'diag_7',
    question: 'Under standard biochemical conditions (pH 7.0, 25°C), the free energy change ΔG°\' for ATP hydrolysis to ADP + Pi is approximately:',
    options: ['-30.5 kJ/mol', '+30.5 kJ/mol', '-50.0 kJ/mol', '0 kJ/mol'],
    correctIndex: 0,
    explanation: 'Standard free energy change ΔG°\' of ATP hydrolysis is -30.5 kJ/mol (-7.3 kcal/mol), an exergonic process.',
    nodeId: 'c11_bt_cbse_213'
  },
  {
    id: 'diag_8',
    question: 'Isozymes are defined as:',
    options: [
      'Enzymes with identical primary sequence but different cofactors',
      'Multiple physical forms of an enzyme catalyzing the same reaction, often with different tissue distributions',
      'Denatured inactive states of enzymes',
      'Enzymes that hydrolyze identical peptide bonds'
    ],
    correctIndex: 1,
    explanation: 'Isozymes (e.g. LDH-1 to LDH-5) are variants of an enzyme with different amino acid sequences that catalyze the same reaction in different tissues/organelles.',
    nodeId: 'c11_bt_cbse_188'
  }
];

// ==========================================
// 3. 22+ COMPREHENSIVE CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
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
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_1',
    nodeId: 'c11_bt_cbse_181',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Enzymes function as biological catalysts by performing which of the following mechanisms?',
    options: [
      'Increasing temperature inside the cell to melt reactant molecules',
      'Lowering the activation energy (Ea) required to reach the transition state',
      'Adding net free energy to the system to force non-spontaneous reactions forward',
      'Consuming themselves entirely during the reaction pathway'
    ],
    correctIndex: 1,
    explanation: 'Enzymes lower the activation energy barrier (Ea) without altering overall equilibrium or net free energy change (ΔG).',
    hints: ['Focus on how catalysts affect activation energy.', 'Do enzymes get consumed?', 'What barrier prevents reactants from turning into products?']
  },
  {
    id: 'ch_2',
    nodeId: 'c11_bt_cbse_182',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Which term best describes the inactive protein component of an enzyme that requires a non-protein cofactor to become active?',
    options: ['Holoenzyme', 'Apoenzyme', 'Prosthetic Group', 'Isozyme'],
    correctIndex: 1,
    explanation: 'The protein moiety alone without its cofactor is called an apoenzyme (catalytically inactive).',
    hints: ['Think of "apo-" as separate or lacking the missing part.', 'Holoenzyme includes everything.', 'Prosthetic group is non-protein.']
  },
  {
    id: 'ch_3',
    nodeId: 'c11_bt_cbse_183',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Classification Knowledge',
    question: 'According to the International Union of Biochemistry (IUB), enzymes catalyzing oxidation-reduction reactions belong to Class 1:',
    options: ['Transferases', 'Oxidoreductases', 'Hydrolases', 'Ligases'],
    correctIndex: 1,
    explanation: 'EC 1 enzymes are Oxidoreductases, catalyzing electron or hydrogen transfer (e.g. dehydrogenases).',
    hints: ['Look for oxidation and reduction in the name.', 'EC Class 1.', ' think of dehydrogenases.']
  },
  {
    id: 'ch_4',
    nodeId: 'c11_bt_cbse_187',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Structural Understanding',
    question: 'A non-protein organic cofactor that is covalently or extremely tightly bound to an enzyme is termed a:',
    options: ['Coenzyme', 'Prosthetic Group', 'Zymogen', 'Cosubstrate'],
    correctIndex: 1,
    explanation: 'Tightly or covalently attached cofactors (such as Heme in Hemoglobin/Peroxidase or FAD in Succinate Dehydrogenase) are prosthetic groups.',
    hints: ['Difference between transiently bound coenzyme and permanently bound factor.', 'Heme is a classic example.', 'It starts with P.']
  },
  {
    id: 'ch_5',
    nodeId: 'c11_bt_cbse_192',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Historical & Conceptual Understanding',
    question: 'Fischer’s Lock and Key model of enzyme action posits that:',
    options: ['The active site changes shape dynamically upon substrate binding', 'The substrate and active site possess rigid complementary shapes', 'Enzymes are destroyed upon product release', 'Inhibitors bind only to the enzyme-substrate complex'],
    correctIndex: 1,
    explanation: 'Emil Fischer (1894) proposed a rigid key fitting into a pre-formed lock site.',
    hints: ['Key in a solid metal lock.', 'Is it rigid or flexible?', 'Proposed by Emil Fischer.']
  },
  {
    id: 'ch_6',
    nodeId: 'c11_bt_cbse_207',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Bioenergetics Foundation',
    question: 'The First Law of Thermodynamics applied to cellular metabolic systems states that:',
    options: ['Entropy of the universe always decreases in metabolic reactions', 'Energy cannot be created or destroyed, only transformed from one form to another', 'Biological systems operate as isolated closed systems', 'Enzymes generate net electrical energy'],
    correctIndex: 1,
    explanation: 'The Law of Conservation of Energy dictates energy transformation (e.g., light -> chemical potential -> mechanical kinetic energy).',
    hints: ['Conservation of energy principle.', 'Can energy be created out of nothing?', 'Energy in = energy transformed.']
  },
  {
    id: 'ch_7',
    nodeId: 'c11_bt_cbse_212',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Biomolecular Identification',
    question: 'ATP (Adenosine Triphosphate) consists of which three fundamental components?',
    options: ['Adenine nitrogenous base, Ribose sugar, and 3 phosphate groups', 'Guanine base, Deoxyribose sugar, and 3 phosphate groups', 'Adenine, Glucose, and 2 phosphate groups', 'Cytosine, Ribose, and 3 sulfate groups'],
    correctIndex: 0,
    explanation: 'ATP comprises Adenine (purine base), Ribose (pentose sugar), and a chain of three phosphate groups (α, β, γ).',
    hints: ['What sugar is in RNA?', 'What base gives Adenosine its name?', 'How many phosphates?']
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_8',
    nodeId: 'c11_bt_cbse_186',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Metalloenzyme Mechanics',
    question: 'Carbonic anhydrase requires a specific divalent metal cation to polarize water and facilitate catalytic conversion of CO2 to bicarbonate. Which metal cation is essential?',
    options: ['Zn²⁺', 'Mg²⁺', 'Fe²⁺', 'Cu²⁺'],
    correctIndex: 0,
    explanation: 'Carbonic anhydrase is a classic zinc metalloenzyme where Zn²⁺ coordinates a water molecule.',
    hints: ['It is a key trace mineral in human carbonic anhydrase.', 'Atomic number 30.', 'Zinc ion.']
  },
  {
    id: 'ch_9',
    nodeId: 'c11_bt_cbse_188',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Isozyme Analysis',
    question: 'Lactate Dehydrogenase (LDH) exists as five distinct tetrameric isozymes composed of H and M subunits. Which isozyme tetramer (H4) predominates in cardiac muscle?',
    options: ['LDH-1 (H4)', 'LDH-5 (M4)', 'LDH-3 (H2M2)', 'LDH-2 (H3M1)'],
    correctIndex: 0,
    explanation: 'LDH-1 (H4) is specialized for aerobic heart tissue converting lactate to pyruvate efficiently.',
    hints: ['Heart tissue uses H subunits.', 'Four H subunits make H4.', 'LDH-1 is cardiac specific.']
  },
  {
    id: 'ch_10',
    nodeId: 'c11_bt_cbse_198',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Unit Conversion & Calculation',
    question: 'A purified enzyme sample converts 300 micromoles (μmol) of substrate into product per minute. Express this enzyme activity in International Units (IU).',
    correctAnswer: 300,
    tolerance: 0.1,
    unit: 'IU',
    explanation: '1 International Unit (IU) is defined as 1 μmol of substrate transformed per minute. Therefore 300 μmol/min = 300 IU.',
    hints: ['Recall definition of 1 IU.', '1 IU = 1 μmol per minute.', 'Conversion ratio is 1:1.']
  },
  {
    id: 'ch_11',
    nodeId: 'c11_bt_cbse_199',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Purity Calculation',
    question: 'A total of 500 IU of enzyme activity is present in a solution containing 10 mg of total protein. Calculate the Specific Activity in IU/mg.',
    correctAnswer: 50,
    tolerance: 0.5,
    unit: 'IU/mg',
    explanation: 'Specific Activity = Total Activity (IU) / Total Protein (mg) = 500 / 10 = 50 IU/mg.',
    hints: ['Divide total units by total mass of protein.', '500 divided by 10.', 'Result gives purity metric.']
  },
  {
    id: 'ch_12',
    nodeId: 'c11_bt_cbse_201',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Michaelis-Menten Kinetics Analysis',
    question: 'An enzyme catalyzed reaction exhibits Vmax = 120 μmol/min. According to Michaelis-Menten kinetics, what is the initial velocity v0 (in μmol/min) when [S] = Km?',
    correctAnswer: 60,
    tolerance: 0.1,
    unit: 'μmol/min',
    explanation: 'By definition, Km is the substrate concentration at which reaction velocity v0 is exactly half of Vmax (Vmax / 2 = 60 μmol/min).',
    hints: ['What is the definition of Km?', 'Km is the substrate concentration at 0.5 * Vmax.', 'Half of 120.']
  },
  {
    id: 'ch_13',
    nodeId: 'c11_bt_cbse_202',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Inhibition Diagnostics',
    question: 'Statin drugs compete directly with HMG-CoA for the active site of HMG-CoA reductase in cholesterol biosynthesis. How can this competitive inhibition be overcome experimentally?',
    options: ['Increasing substrate [HMG-CoA] concentration significantly', 'Adding non-competitive inhibitors', 'Lowering system temperature to 0°C', 'Increasing enzyme concentration to infinity without substrate'],
    correctIndex: 0,
    explanation: 'Competitive inhibition is reversible; high substrate concentrations outcompete inhibitor molecules for active site occupancy.',
    hints: ['Think of substrate outcompeting the inhibitor.', 'Reversible active site binding.', 'Raise substrate concentration.']
  },
  {
    id: 'ch_14',
    nodeId: 'c11_bt_cbse_209',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Thermodynamic Calculation',
    question: 'A cellular reaction has ΔH = +40 kJ/mol and ΔS = +0.1 kJ/(mol·K) at T = 300 K. Calculate Gibbs Free Energy change ΔG (in kJ/mol).',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'kJ/mol',
    explanation: 'ΔG = ΔH - TΔS = 40 - (300 × 0.1) = 40 - 30 = +10 kJ/mol (Endergonic reaction).',
    hints: ['Use Gibbs formula: ΔG = ΔH - T * ΔS.', 'Multiply T (300) by ΔS (0.1).', '40 minus 30.']
  },
  {
    id: 'ch_15',
    nodeId: 'c11_bt_cbse_213',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Bioenergetic Energy Coupling',
    question: 'The synthesis of Glutamine from Glutamate requires +14.2 kJ/mol. If coupled with 1 mole of ATP hydrolysis (ΔG°\' = -30.5 kJ/mol), what is the net standard free energy change ΔG°\' (in kJ/mol)?',
    correctAnswer: -16.3,
    tolerance: 0.2,
    unit: 'kJ/mol',
    explanation: 'Net ΔG°\' = +14.2 + (-30.5) = -16.3 kJ/mol (Spontaneous coupled exergonic process).',
    hints: ['Add the two free energy values together.', '+14.2 plus (-30.5).', 'Result will be negative.']
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_16',
    nodeId: 'c11_bt_cbse_204',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Kinetics & Inhibition',
    question: 'In Uncompetitive Inhibition, the inhibitor binds strictly to the Enzyme-Substrate (ES) complex. How do apparent Km and Vmax change on Lineweaver-Burk double reciprocal plots?',
    options: [
      'Both Km and Vmax decrease by the same factor (parallel lines shift upward)',
      'Km increases while Vmax remains unchanged',
      'Vmax decreases while Km remains unchanged',
      'Km decreases while Vmax increases'
    ],
    correctIndex: 0,
    explanation: 'Uncompetitive inhibitors bind only to ES complex, pulling equilibrium to ES and decreasing both apparent Km and Vmax equally, producing parallel double-reciprocal lines.',
    hints: ['Inhibitor binds only ES complex.', 'Both parameters change by alpha factor.', 'Parallel lines on Lineweaver-Burk plot.']
  },
  {
    id: 'ch_17',
    nodeId: 'c11_bt_cbse_206',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Allosteric Regulation',
    question: 'Phosphofructokinase-1 (PFK-1) displays sigmoidal kinetics. ATP acts as both a substrate and an allosteric inhibitor at high concentration. High AMP concentration acts as an allosteric activator. What effect does high AMP have on the v0 vs [F6P] curve?',
    options: [
      'Shifts the sigmoidal curve to the left, decreasing K0.5 (increasing apparent affinity)',
      'Shifts the curve to the right, increasing K0.5',
      'Flattens the curve into a horizontal line at zero',
      'Converts the enzyme into an irreversible zymogen'
    ],
    correctIndex: 0,
    explanation: 'Allosteric activators (AMP) stabilize the R (relaxed/active) state, shifting the sigmoidal curve leftward (lower K0.5).',
    hints: ['Activators shift allosteric curves left.', 'R-state vs T-state stabilization.', 'Lower K0.5 means higher apparent substrate affinity.']
  },
  {
    id: 'ch_18',
    nodeId: 'c11_bt_cbse_208',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Thermodynamics & Entropy',
    question: 'Why can living cells maintain highly organized, low-entropy structures without violating the Second Law of Thermodynamics?',
    options: [
      'Cells operate as closed isolated systems where entropy cannot increase',
      'Cells release heat and metabolic waste, increasing the total entropy of the surrounding universe (ΔSuniverse > 0)',
      'Enzymes destroy entropy internally',
      'The Second Law applies only to inorganic materials'
    ],
    correctIndex: 1,
    explanation: 'Cells are open systems. They maintain internal order (low internal entropy) at the expense of increasing environmental entropy via heat dissipation.',
    hints: ['Cells are open systems exchanging energy and matter.', 'What happens to the universe entropy?', 'Heat release increases environment entropy.']
  },
  {
    id: 'ch_19',
    nodeId: 'c11_bt_cbse_196',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Biochemical Structure & pH',
    question: 'Pepsin in the stomach has an optimal pH of 2.0, whereas Trypsin in the small intestine operates at pH 8.0. What molecular shift accounts for loss of catalytic activity when Pepsin is placed in pH 8.0?',
    options: ['Deprotonation of key catalytic carboxyl residues (e.g. Aspartate) breaking essential electrostatic interactions/salt bridges', 'Covalent cleavage of all peptide bonds', 'Polymerization into infinite fibrous aggregates', 'Reduction of disulfide bonds into thiol groups'],
    correctIndex: 0,
    explanation: 'pH alters the ionization states of amino acid side chains (e.g., Asp, Glu, Lys, His). At pH 8, active site Asp acid residues in Pepsin become deprotonated, deactivating its catalytic dyad.',
    hints: ['pH changes side chain ionization (charge).', 'Aspartate carboxyl groups change state.', 'Loss of essential protonation state for catalysis.']
  },
  {
    id: 'ch_20',
    nodeId: 'c11_bt_cbse_198',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Kinetic Turnover & Katal Conversion',
    question: 'An enzyme preparation converts 1 mole of substrate per second. Convert this rate into Katals (kat) and select the value.',
    correctAnswer: 1,
    tolerance: 0.01,
    unit: 'kat',
    explanation: 'By definition, 1 Katal (kat) = 1 mole of substrate transformed per second.',
    hints: ['Definition of 1 Katal.', '1 mole per second.', 'Direct SI unit equality.']
  },
  {
    id: 'ch_21',
    nodeId: 'c11_bt_cbse_201',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Michaelis-Menten Problem Solving',
    question: 'Given an enzyme with Vmax = 200 nmol/s and Km = 10 mM. Calculate the initial reaction velocity v0 (in nmol/s) at substrate concentration [S] = 40 mM.',
    correctAnswer: 160,
    tolerance: 1.0,
    unit: 'nmol/s',
    explanation: 'v0 = (Vmax × [S]) / (Km + [S]) = (200 × 40) / (10 + 40) = 8000 / 50 = 160 nmol/s.',
    hints: ['v0 = (Vmax * [S]) / (Km + [S]).', 'Numerator: 200 * 40 = 8000.', 'Denominator: 10 + 40 = 50.']
  },
  {
    id: 'ch_22',
    nodeId: 'c11_bt_cbse_210',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Bioenergetics Equilibrium',
    question: 'At chemical equilibrium, what is the value of actual Gibbs Free Energy change (ΔG) and the ratio of products to reactants?',
    options: [
      'ΔG = 0, and reaction quotient Q equals the equilibrium constant Keq',
      'ΔG = -30.5 kJ/mol, and Q = 1',
      'ΔG is at absolute maximum, and Keq = 0',
      'ΔG = +100 kJ/mol, and reactants are zero'
    ],
    correctIndex: 0,
    explanation: 'At equilibrium, no net work can be performed (ΔG = 0), and the reaction quotient Q equals Keq.',
    hints: ['What does equilibrium mean for net free energy change?', 'ΔG = 0 at equilibrium.', 'Q = Keq.']
  }
];

// ==========================================
// 4. SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Active Site Models (Lock & Key vs Induced Fit)
const ActiveSiteDiagram: React.FC<{ mode: 'lock' | 'induced' }> = ({ mode }) => {
  return (
    <div className="w-full bg-slate-900/80 rounded-xl p-4 border border-cyan-500/30 text-center">
      <h4 className="text-cyan-300 text-sm font-semibold mb-2">
        {mode === 'lock' ? 'Fischer Lock & Key Model (Rigid Complementarity)' : 'Koshland Induced Fit Model (Dynamic Conformational Adaptation)'}
      </h4>
      <svg className="w-full h-44 mx-auto" viewBox="0 0 500 160">
        <defs>
          <linearGradient id="enzGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="subGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>

        {mode === 'lock' ? (
          <g>
            {/* Rigid Enzyme Body */}
            <path d="M 60 40 L 160 40 C 160 40 160 80 130 80 C 100 80 100 100 130 100 C 160 100 160 140 60 140 Z" fill="url(#enzGrad)" stroke="#60a5fa" strokeWidth="2" />
            <text x="75" y="90" fill="#ffffff" fontSize="12" fontWeight="bold">Enzyme</text>
            <text x="100" y="30" fill="#93c5fd" fontSize="10">Rigid Active Site</text>

            {/* Rigid Substrate */}
            <path d="M 220 50 L 250 50 C 250 50 250 75 230 75 C 210 75 210 105 230 105 C 250 105 250 130 220 130 Z" fill="url(#subGrad)" stroke="#34d399" strokeWidth="2" />
            <text x="210" y="30" fill="#a7f3d0" fontSize="10">Substrate</text>

            {/* Arrow */}
            <path d="M 270 90 L 310 90" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Bound ES Complex */}
            <g transform="translate(200, 0)">
              <path d="M 160 40 L 240 40 C 240 40 240 80 210 80 C 180 80 180 100 210 100 C 240 100 240 140 160 140 Z" fill="url(#enzGrad)" stroke="#60a5fa" strokeWidth="2" />
              <path d="M 240 40 L 260 40 C 260 40 260 80 240 80 C 220 80 220 100 240 100 C 260 100 260 140 240 140 Z" fill="url(#subGrad)" stroke="#34d399" strokeWidth="2" opacity="0.9" />
              <text x="175" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold">Rigid ES Complex</text>
            </g>
          </g>
        ) : (
          <g>
            {/* Flexible Enzyme Body */}
            <path d="M 50 40 C 100 35 120 60 120 75 C 120 95 100 110 130 125 C 140 130 80 145 50 140 Z" fill="url(#enzGrad)" stroke="#60a5fa" strokeWidth="2" />
            <text x="60" y="90" fill="#ffffff" fontSize="12" fontWeight="bold">Enzyme</text>
            <text x="60" y="25" fill="#93c5fd" fontSize="10">Flexible Unbound Site</text>

            {/* Substrate */}
            <circle cx="210" cy="90" r="24" fill="url(#subGrad)" stroke="#34d399" strokeWidth="2" />
            <text x="190" y="30" fill="#a7f3d0" fontSize="10">Substrate</text>

            {/* Induced Fit Arrow */}
            <path d="M 250 90 L 290 90" stroke="#ec4899" strokeWidth="3" />
            <text x="250" y="80" fill="#f472b6" fontSize="9">Induced Fit</text>

            {/* Molded ES Complex */}
            <g transform="translate(190, 0)">
              <path d="M 140 40 C 190 40 215 65 215 90 C 215 115 190 140 140 140 Z" fill="url(#enzGrad)" stroke="#60a5fa" strokeWidth="2" />
              <circle cx="195" cy="90" r="24" fill="url(#subGrad)" stroke="#34d399" strokeWidth="2" opacity="0.85" />
              <text x="135" y="155" fill="#f472b6" fontSize="11" fontWeight="bold">Conformational Fit ES</text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

// Diagram 2: Michaelis-Menten Kinetics Curve & Lineweaver-Burk Comparison
const EnzymeKineticsDiagram: React.FC<{ substrateConc: number; km: number; vmax: number; inhibitor: string }> = ({
  substrateConc,
  km,
  vmax,
  inhibitor
}) => {
  // Compute points for standard hyperbolic curve
  const points: string[] = [];
  const pointsInh: string[] = [];

  let effectiveKm = km;
  let effectiveVmax = vmax;

  if (inhibitor === 'competitive') {
    effectiveKm = km * 2.2;
  } else if (inhibitor === 'non-competitive') {
    effectiveVmax = vmax * 0.5;
  } else if (inhibitor === 'uncompetitive') {
    effectiveKm = km * 0.5;
    effectiveVmax = vmax * 0.5;
  }

  for (let s = 0; s <= 100; s += 2) {
    const v = (vmax * s) / (km + s);
    const xPx = 50 + (s / 100) * 380;
    const yPx = 180 - (v / 120) * 140;
    points.push(`${xPx},${yPx}`);

    const xPxInh = 50 + (s / 100) * 380;
    const vInh = (effectiveVmax * s) / (effectiveKm + s);
    const yPxInh = 180 - (vInh / 120) * 140;
    pointsInh.push(`${xPxInh},${yPxInh}`);
  }

  const currentV = (effectiveVmax * substrateConc) / (effectiveKm + substrateConc);
  const currentXPx = 50 + (substrateConc / 100) * 380;
  const currentYPx = 180 - (currentV / 120) * 140;

  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-emerald-500/30">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-emerald-400 text-sm font-semibold">
          Michaelis-Menten Rate Plot (v₀ vs [S])
        </h4>
        <span className="text-xs px-2 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/20">
          Inhibitor: {inhibitor.toUpperCase()}
        </span>
      </div>
      <svg className="w-full h-52 mx-auto" viewBox="0 0 460 210">
        {/* Grid lines */}
        <line x1="50" y1="180" x2="430" y2="180" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />

        {/* Vmax line baseline */}
        <line x1="50" y1={180 - (vmax / 120) * 140} x2="430" y2={180 - (vmax / 120) * 140} stroke="#ef4444" strokeDasharray="4,4" strokeWidth="1.5" />
        <text x="370" y={175 - (vmax / 120) * 140} fill="#ef4444" fontSize="10">Vmax ({vmax})</text>

        {/* 0.5 Vmax line */}
        <line x1="50" y1={180 - (vmax / 240) * 140} x2="430" y2={180 - (vmax / 240) * 140} stroke="#f59e0b" strokeDasharray="2,2" strokeWidth="1" />
        <text x="375" y={175 - (vmax / 240) * 140} fill="#f59e0b" fontSize="9">½ Vmax</text>

        {/* Standard Uninhibited Polyline */}
        <polyline fill="none" stroke="#10b981" strokeWidth="3" points={points.join(' ')} />

        {/* Inhibited Polyline if active */}
        {inhibitor !== 'none' && (
          <polyline fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5,3" points={pointsInh.join(' ')} />
        )}

        {/* Operating Point marker */}
        <circle cx={currentXPx} cy={currentYPx} r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
        <line x1={currentXPx} y1={currentYPx} x2={currentXPx} y2="180" stroke="#fbbf24" strokeDasharray="2,2" />
        <line x1="50" y1={currentYPx} x2={currentXPx} y2={currentYPx} stroke="#fbbf24" strokeDasharray="2,2" />

        {/* Axis Labels */}
        <text x="210" y="202" fill="#94a3b8" fontSize="11" textAnchor="middle">Substrate Concentration [S] (mM)</text>
        <text x="15" y="100" fill="#94a3b8" fontSize="11" transform="rotate(-90 15,100)" textAnchor="middle">Velocity v₀ (μmol/min)</text>

        {/* Readout Legend */}
        <text x={currentXPx + 10} y={currentYPx - 10} fill="#fef08a" fontSize="10" fontWeight="bold">
          v₀: {currentV.toFixed(1)} μmol/min
        </text>
      </svg>
    </div>
  );
};

// Diagram 3: Activation Energy & Thermodynamics Diagram (Bioenergetics)
const BioenergeticsDiagram: React.FC<{ enzymePresent: boolean; deltaG: number }> = ({ enzymePresent, deltaG }) => {
  const eaUncatalyzed = 90;
  const eaCatalyzed = 45;
  const activeEa = enzymePresent ? eaCatalyzed : eaUncatalyzed;

  // Reaction coordinate points: Reactants (y=120) -> Transition (y = 120 - activeEa) -> Products (y = 120 + deltaG*1.2)
  const reactantY = 120;
  const productY = reactantY - deltaG * 1.5;
  const transitionY = reactantY - activeEa;

  const pathD = `M 40 ${reactantY} Q 150 ${reactantY - 10} 220 ${transitionY} T 400 ${productY}`;

  return (
    <div className="w-full bg-slate-900/80 rounded-xl p-4 border border-purple-500/30">
      <h4 className="text-purple-300 text-sm font-semibold mb-1 text-center">
        Bioenergetics Reaction Coordinate: Transition State & ΔG Profile
      </h4>
      <svg className="w-full h-48 mx-auto" viewBox="0 0 450 190">
        {/* Axes */}
        <line x1="40" y1="170" x2="420" y2="170" stroke="#64748b" strokeWidth="2" />
        <line x1="40" y1="20" x2="40" y2="170" stroke="#64748b" strokeWidth="2" />

        {/* Baseline Reactant Level */}
        <line x1="30" y1={reactantY} x2="220" y2={reactantY} stroke="#94a3b8" strokeDasharray="3,3" />
        <text x="50" y={reactantY - 8} fill="#a7f3d0" fontSize="11" fontWeight="bold">Reactants (G₁)</text>

        {/* Baseline Product Level */}
        <line x1="220" y1={productY} x2="420" y2={productY} stroke="#94a3b8" strokeDasharray="3,3" />
        <text x="340" y={productY - 8} fill="#fef08a" fontSize="11" fontWeight="bold">Products (G₂)</text>

        {/* Reaction Curve */}
        <path d={pathD} fill="none" stroke={enzymePresent ? '#38bdf8' : '#f43f5e'} strokeWidth="3" />

        {/* Ea Arrow */}
        <line x1="220" y1={reactantY} x2="220" y2={transitionY} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="225" y={(reactantY + transitionY) / 2} fill="#fbbf24" fontSize="10" fontWeight="bold">
          Ea = {activeEa} kJ/mol
        </text>

        {/* ΔG Arrow */}
        <line x1="380" y1={reactantY} x2="380" y2={productY} stroke="#c084fc" strokeWidth="2" />
        <text x="385" y={(reactantY + productY) / 2} fill="#e9d5ff" fontSize="10" fontWeight="bold">
          ΔG = {deltaG > 0 ? `+${deltaG}` : deltaG} kJ/mol
        </text>

        {/* Legend / Status */}
        <text x="210" y="185" fill="#94a3b8" fontSize="10" textAnchor="middle">Reaction Progress →</text>
        <text x="15" y="95" fill="#94a3b8" fontSize="10" transform="rotate(-90 15,95)" textAnchor="middle">Free Energy G</text>
      </svg>
    </div>
  );
};

// ==========================================
// 5. MAIN INTERACTIVE SIMULATION COMPONENT
// ==========================================
export interface C11_BiotechEnzymesBioenergeticsCBSESimProps {
  onComplete?: (score: number) => void;
}

const C11_BiotechEnzymesBioenergeticsCBSESim: React.FC<C11_BiotechEnzymesBioenergeticsCBSESimProps> = ({ onComplete }) => {
  // Navigation & UI Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // Interactive Lab State
  const [substrateConc, setSubstrateConc] = useState<number>(30); // mM
  const [temp, setTemp] = useState<number>(37); // °C
  const [pH, setPH] = useState<number>(7.4);
  const [inhibitorType, setInhibitorType] = useState<'none' | 'competitive' | 'non-competitive' | 'uncompetitive'>('none');
  const [activeSiteModel, setActiveSiteModel] = useState<'lock' | 'induced'>('induced');
  const [enzymePresent, setEnzymePresent] = useState<boolean>(true);
  const [cofactorAssembled, setCofactorAssembled] = useState<boolean>(true);
  const [deltaGValue, setDeltaGValue] = useState<number>(-30.5); // kJ/mol

  // Lab Answers & Observations
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedMcqIndex, setSelectedMcqIndex] = useState<number | null>(null);
  const [numericInputValue, setNumericInputValue] = useState<string>('');
  const [challengeStatus, setChallengeStatus] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');
  const [challengeFeedback, setChallengeFeedback] = useState<string>('');
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // SRS & BKT Mastery Tracking State
  const [bktState, setBktState] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createBKTState(id);
    });
    return initialMap as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  const [srsState, setSrsState] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialMap: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach(c => {
      initialMap[c.id] = createReviewItem(c.id);
    });
    return initialMap;
  });

  // UI Feedback Triggers
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ show: boolean; x: number; y: number }>({ show: false, x: 400, y: 300 });

  // Initial speech welcome
  useEffect(() => {
    speechManager.speak("Welcome to the Enzymes and Bioenergetics Interactive Laboratory. Explore catalyst kinetics and bioenergetics thermodynamics.");
    audioManager.play('whoosh');
  }, []);

  // Timer reset for auto hints
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && challengeStatus === 'unanswered') {
        const currentChallenge = CHALLENGES[currentChallengeIdx];
        if (currentChallenge && currentChallenge.hints.length > 0) {
          setCurrentHintText(currentChallenge.hints[0]);
          setShowHint(true);
          audioManager.play('hint');
          speechManager.speak("Here is a helpful hint for this challenge.");
        }
      }
    }, 12000);
  }, [activeTab, challengeStatus, currentChallengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIdx, activeTab]);

  // Derived kinetics values
  const currentVmax = 100;
  const currentKm = 20;

  const effectiveVmax = useMemo(() => {
    let base = currentVmax;
    // Temperature effect (optimal around 37°C)
    if (temp > 55) {
      base *= Math.max(0, 1 - (temp - 55) * 0.04);
    } else if (temp < 37) {
      base *= (0.3 + (temp / 37) * 0.7);
    }
    // pH effect (optimal around 7.4)
    const phDev = Math.abs(pH - 7.4);
    base *= Math.max(0.05, 1 - phDev * 0.18);

    if (!cofactorAssembled) base *= 0.1;

    if (inhibitorType === 'non-competitive' || inhibitorType === 'uncompetitive') {
      base *= 0.5;
    }
    return Math.max(0, base);
  }, [temp, pH, cofactorAssembled, inhibitorType]);

  const effectiveKm = useMemo(() => {
    let base = currentKm;
    if (inhibitorType === 'competitive') {
      base *= 2.5;
    } else if (inhibitorType === 'uncompetitive') {
      base *= 0.5;
    }
    return base;
  }, [inhibitorType]);

  const computedVelocity = useMemo(() => {
    if (!enzymePresent) return (substrateConc * 0.05); // baseline uncatalyzed rate
    return (effectiveVmax * substrateConc) / (effectiveKm + substrateConc);
  }, [enzymePresent, effectiveVmax, effectiveKm, substrateConc]);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryAnswer(idx);
    setDiscoverySubmitted(true);
    resetInactivityTimer();

    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak("Correct! At Vmax, active sites are fully saturated, so velocity depends strictly on catalytic turnover rate k-cat.");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. Consider what happens when all enzyme active sites are already filled with substrate at Vmax.");
    }
  };

  // Handle Prediction Submit
  const handlePredictionSubmit = (qIdx: number, optIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    setPredictionSubmitted(prev => ({ ...prev, [qIdx]: true }));

    const isCorrect = optIdx === PREDICTION_QUESTIONS[qIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak("Great prediction! Now let us verify this in the interactive lab simulator.");
    } else {
      audioManager.play('error');
      speechManager.speak("Interesting hypothesis. Test it out in the lab environment below.");
    }
  };

  // Handle Observation Submit
  const handleObservationSubmit = (oIdx: number, optIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
    setObservationSubmitted(prev => ({ ...prev, [oIdx]: true }));

    const isCorrect = optIdx === OBSERVATION_QUESTIONS[oIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('chime');
      speechManager.speak("Spot on observation!");
    } else {
      audioManager.play('tap');
    }
  };

  // Challenge Handling
  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      setSelectedMcqIndex(null);
      setNumericInputValue('');
      setChallengeStatus('unanswered');
      setChallengeFeedback('');
      setHintsUsedCount(0);
      setShowHint(false);
      audioManager.play('whoosh');
    } else {
      // Finished all challenges
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have completed all biotechnology enzyme and bioenergetics challenges!");
      setActiveTab('summary');

      // Calculate overall score & record mastery
      const totalCorrect = CHALLENGES.length; // baseline completion
      const scorePercentage = Math.round((totalCorrect / CHALLENGES.length) * 100);
      recordGameScore('c11_bt_cbse_181', scorePercentage);
      if (onComplete) onComplete(scorePercentage);
    }
  };

  const handleChallengeSubmit = () => {
    const challenge = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (challenge.type === 'mcq') {
      isCorrect = selectedMcqIndex === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const val = parseFloat(numericInputValue);
      if (!isNaN(val) && challenge.correctAnswer !== undefined) {
        const tol = challenge.tolerance || 0.1;
        isCorrect = Math.abs(val - challenge.correctAnswer) <= tol;
      }
    }

    // Update BKT & SRS
    const nodeId = challenge.nodeId;
    const currentBKT = bktState[nodeId] || createBKTState(nodeId);
    const updatedBKT = bktUpdate(currentBKT, isCorrect);

    setBktState(prev => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsState[challenge.id] || createReviewItem(challenge.id);
    const quality = isCorrect ? (hintsUsedCount === 0 ? 5 : 3) : 1;
    const updatedSRS = sm2Update(currentSRS, quality);
    setSrsState(prev => ({ ...prev, [challenge.id]: updatedSRS }));

    if (isCorrect) {
      setChallengeStatus('correct');
      setChallengeFeedback(challenge.explanation);
      audioManager.play('success');
      speechManager.speak("Excellent! That is correct.");
      setShowSuccessBanner(true);
      setSparklePos({ show: true, x: 500, y: 250 });
      setTimeout(() => {
        setShowSuccessBanner(false);
        setSparklePos(prev => ({ ...prev, show: false }));
      }, 2500);
    } else {
      setChallengeStatus('incorrect');
      setChallengeFeedback(`Incorrect. ${challenge.explanation}`);
      audioManager.play('error');
      speechManager.speak("That is not quite right. Review the explanation and try again or proceed.");
    }
  };

  const handleUseHint = () => {
    const challenge = CHALLENGES[currentChallengeIdx];
    if (hintsUsedCount < challenge.hints.length) {
      setCurrentHintText(challenge.hints[hintsUsedCount]);
      setShowHint(true);
      setHintsUsedCount(prev => prev + 1);
      audioManager.play('hint');
      speechManager.speak(`Hint ${hintsUsedCount + 1}: ${challenge.hints[hintsUsedCount]}`);
    }
  };

  // Dynamic BKT overall progress metric
  const overallMasteryScore = useMemo(() => {
    const ids = Object.keys(bktState) as NodeId[];
    if (ids.length === 0) return 0;
    const sum = ids.reduce((acc, id) => acc + masteryProb(bktState[id]), 0);
    return Math.round((sum / ids.length) * 100);
  }, [bktState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6 select-none">
      {/* Floating Visual Elements */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <SparkleBurst show={sparklePos.show} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER SECTION */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider">
              ISC Class 11 Biotechnology
            </span>
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs px-3 py-1 rounded-full font-mono">
              Mastery: {overallMasteryScore}%
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 mt-2">
            Enzymes & Bioenergetics Virtual Suite
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {SCENARIO.title} — Catalytic Kinetics, Thermodynamics, and Enzyme Regulation
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'discovery' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            1. Discovery Lab
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'lab' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            2. Interactive Workbench
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'challenges' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            3. Challenges ({currentChallengeIdx + 1}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'summary' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'}`}
          >
            4. Real-World & Review
          </button>
        </div>
      </header>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col gap-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                <span>🔬</span> Research Scenario Context
              </h2>
              <p className="text-slate-300 mt-2 leading-relaxed text-sm">
                {SCENARIO.intro}
              </p>
              <p className="text-slate-400 mt-2 text-xs italic">
                {SCENARIO.context}
              </p>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-950/70 border border-cyan-500/20 rounded-xl p-5">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
                Core Discovery Challenge
              </span>
              <h3 className="text-slate-100 font-semibold mt-3 text-base">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="flex flex-col gap-2.5 mt-4">
                {DISCOVERY_QUESTION.options.map((opt, i) => {
                  let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/50';
                  if (discoverySubmitted) {
                    if (i === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (discoveryAnswer === i) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }
                  return (
                    <button
                      key={i}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(i)}
                      className={`text-left p-3.5 rounded-xl border text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs leading-relaxed">
                  <p className="font-semibold text-cyan-300">Biocatalytic Explanation:</p>
                  <p className="mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS ARRAY MAP */}
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-cyan-400">Pre-Lab Hypothesis Predictions</h3>
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-200 font-medium">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    {pq.options.map((opt, oIdx) => {
                      const isSel = predictionAnswers[qIdx] === oIdx;
                      const isSub = predictionSubmitted[qIdx];
                      const isCorr = oIdx === pq.correctIndex;

                      let cls = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-cyan-500/40';
                      if (isSub) {
                        if (isCorr) cls = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                        else if (isSel) cls = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isSub}
                          onClick={() => handlePredictionSubmit(qIdx, oIdx)}
                          className={`p-3 rounded-lg border text-xs text-left transition-all ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predictionSubmitted[qIdx] && (
                    <p className="text-xs text-amber-300 mt-2 italic bg-amber-950/30 p-2 rounded border border-amber-500/20">
                      Verification instruction: {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR: DIAGNOSTIC & MISCONCEPTIONS QUICK PREVIEW */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-md font-bold text-purple-300 mb-3 flex items-center gap-2">
                <span>⚡</span> Enzyme Structural Model
              </h3>
              <ActiveSiteDiagram mode={activeSiteModel} />
              <div className="flex justify-center gap-2 mt-3">
                <button
                  onClick={() => setActiveSiteModel('lock')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${activeSiteModel === 'lock' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                >
                  Lock & Key
                </button>
                <button
                  onClick={() => setActiveSiteModel('induced')}
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${activeSiteModel === 'induced' ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}
                >
                  Induced Fit
                </button>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
              <h3 className="text-md font-bold text-amber-300 mb-3">Key Concepts Covered</h3>
              <ul className="text-xs text-slate-400 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  IUB 6 Classes: Oxidoreductase, Transferase, Hydrolase, Lyase, Isomerase, Ligase.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Holoenzyme = Apoenzyme + Cofactor (Coenzyme / Metal Ion / Prosthetic).
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Kinetics: Km (Affinity), Vmax, Lineweaver-Burk, Inhibitors.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Bioenergetics: ΔG = ΔH - TΔS, ATP Hydrolysis (-30.5 kJ/mol).
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE WORKBENCH & LAB SIMULATOR */}
      {activeTab === 'lab' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CONTROLS & DIAGRAMS */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h2 className="text-lg font-bold text-cyan-300">Biocatalytic Kinetics & Thermodynamic Controls</h2>
                  <p className="text-xs text-slate-400">Adjust parameters and observe real-time kinetic curves and turnover rates.</p>
                </div>
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Velocity (v₀):</span>
                  <span className="text-sm font-mono font-bold text-emerald-400">{computedVelocity.toFixed(2)} μmol/min</span>
                </div>
              </div>

              {/* SLIDERS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
                {/* Substrate Conc Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Substrate [S]: {substrateConc} mM</span>
                    <span className="text-cyan-400 font-mono">Km = {effectiveKm.toFixed(1)} mM</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={substrateConc}
                    onChange={(e) => { setSubstrateConc(Number(e.target.value)); audioManager.play('tap'); }}
                    className="w-full accent-cyan-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Temperature: {temp} °C</span>
                    <span className={temp > 55 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {temp > 55 ? 'Denaturing' : 'Optimal ~37°C'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    value={temp}
                    onChange={(e) => { setTemp(Number(e.target.value)); audioManager.play('tap'); }}
                    className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* pH Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Microenvironment pH: {pH.toFixed(1)}</span>
                    <span className="text-purple-400 font-mono">Optimum = 7.4</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="14"
                    step="0.2"
                    value={pH}
                    onChange={(e) => { setPH(Number(e.target.value)); audioManager.play('tap'); }}
                    className="w-full accent-purple-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Inhibitor Type Selection */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 mb-1 block">Inhibitor Type:</label>
                  <select
                    value={inhibitorType}
                    onChange={(e) => { setInhibitorType(e.target.value as unknown as typeof inhibitorType); audioManager.play('tap'); }}
                    className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs p-2 rounded-lg focus:border-cyan-500 outline-none"
                  >
                    <option value="none">None (Standard Kinetics)</option>
                    <option value="competitive">Competitive (Raises Km, Vmax unchanged)</option>
                    <option value="non-competitive">Non-Competitive (Lowers Vmax, Km unchanged)</option>
                    <option value="uncompetitive">Uncompetitive (Lowers both Km & Vmax)</option>
                  </select>
                </div>
              </div>

              {/* TOGGLES BAR */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                <button
                  onClick={() => { setEnzymePresent(!enzymePresent); audioManager.play('tap'); }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${enzymePresent ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                >
                  Enzyme Catalyst: {enzymePresent ? 'ACTIVE (Lowers Ea)' : 'ABSENT (High Ea)'}
                </button>

                <button
                  onClick={() => { setCofactorAssembled(!cofactorAssembled); audioManager.play('tap'); }}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${cofactorAssembled ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-rose-950/40 border-rose-500 text-rose-300'}`}
                >
                  Cofactor / Prosthetic: {cofactorAssembled ? 'Holoenzyme Formed' : 'Apoenzyme Only (Inactive)'}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">ΔG Reaction:</span>
                  <button
                    onClick={() => { setDeltaGValue(prev => prev === -30.5 ? 15 : -30.5); audioManager.play('tap'); }}
                    className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs text-purple-300 font-mono"
                  >
                    {deltaGValue < 0 ? 'Exergonic (-30.5 kJ)' : 'Endergonic (+15.0 kJ)'}
                  </button>
                </div>
              </div>

              {/* LIVE DIAGRAM RENDERERS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EnzymeKineticsDiagram substrateConc={substrateConc} km={currentKm} vmax={currentVmax} inhibitor={inhibitorType} />
                <BioenergeticsDiagram enzymePresent={enzymePresent} deltaG={deltaGValue} />
              </div>
            </div>

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col gap-4">
              <h3 className="text-md font-bold text-emerald-400">Workbench Empirical Observations</h3>
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                  <p className="text-sm text-slate-200 font-medium">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                    {oq.observableOptions.map((opt, optIdx) => {
                      const isSel = observationAnswers[oIdx] === optIdx;
                      const isSub = observationSubmitted[oIdx];
                      const isCorr = optIdx === oq.correctIndex;

                      let cls = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-emerald-500/40';
                      if (isSub) {
                        if (isCorr) cls = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                        else if (isSel) cls = 'bg-rose-950/80 border-rose-500 text-rose-200';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isSub}
                          onClick={() => handleObservationSubmit(oIdx, optIdx)}
                          className={`p-3 rounded-lg border text-xs text-left transition-all ${cls}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPLORATION STEPS GUIDED MODULES MAP */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              <h3 className="text-md font-bold text-cyan-300 flex items-center gap-2">
                <span>📋</span> Guided Exploration Laboratories
              </h3>
              <p className="text-xs text-slate-400">Work through each structured module using the lab controls.</p>

              <div className="flex flex-col gap-3">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 p-4 rounded-xl transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-cyan-400 font-mono">{step.title}</span>
                      <span className="text-[10px] bg-slate-900 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                        {step.nodeId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CHALLENGES SUITE */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
          {/* Challenge Header */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-slate-800 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded border ${CHALLENGES[currentChallengeIdx].difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' : CHALLENGES[currentChallengeIdx].difficulty === 'standard' ? 'bg-amber-950 text-amber-300 border-amber-500/30' : 'bg-rose-950 text-rose-300 border-rose-500/30'}`}>
                    {CHALLENGES[currentChallengeIdx].difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Competency: {CHALLENGES[currentChallengeIdx].competencyLevel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-100 mt-2">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleUseHint}
                  disabled={hintsUsedCount >= CHALLENGES[currentChallengeIdx].hints.length || challengeStatus !== 'unanswered'}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-300 rounded-xl border border-amber-500/20 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  💡 Hint ({hintsUsedCount}/{CHALLENGES[currentChallengeIdx].hints.length})
                </button>
              </div>
            </div>

            {/* Auto Hint Bubble */}
            <HintBubble show={showHint} text={currentHintText} />

            {/* Question Text */}
            <p className="text-base text-slate-200 leading-relaxed font-medium mb-6">
              {CHALLENGES[currentChallengeIdx].question}
            </p>

            {/* MCQ TYPE */}
            {CHALLENGES[currentChallengeIdx].type === 'mcq' && (
              <div className="flex flex-col gap-3">
                {CHALLENGES[currentChallengeIdx].options?.map((opt, i) => {
                  let borderCls = 'border-slate-800 bg-slate-950/70 hover:border-cyan-500/50 text-slate-200';
                  if (selectedMcqIndex === i) {
                    borderCls = 'border-cyan-500 bg-cyan-950/40 text-cyan-200 font-semibold';
                  }
                  if (challengeStatus !== 'unanswered') {
                    if (i === CHALLENGES[currentChallengeIdx].correctIndex) {
                      borderCls = 'border-emerald-500 bg-emerald-950/70 text-emerald-200 font-bold';
                    } else if (selectedMcqIndex === i) {
                      borderCls = 'border-rose-500 bg-rose-950/70 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={challengeStatus !== 'unanswered'}
                      onClick={() => { setSelectedMcqIndex(i); audioManager.play('tap'); }}
                      className={`text-left p-4 rounded-xl border transition-all text-sm flex items-start gap-3 ${borderCls}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* NUMERIC TYPE */}
            {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
              <div className="flex flex-col gap-3 max-w-md">
                <label className="text-xs text-slate-400">Enter your numerical calculation:</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    disabled={challengeStatus !== 'unanswered'}
                    value={numericInputValue}
                    onChange={(e) => setNumericInputValue(e.target.value)}
                    placeholder="Enter numerical answer..."
                    className="flex-1 bg-slate-950 border border-slate-700 text-slate-100 p-3 rounded-xl outline-none focus:border-cyan-500 font-mono text-sm"
                  />
                  {CHALLENGES[currentChallengeIdx].unit && (
                    <span className="text-sm font-mono text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      {CHALLENGES[currentChallengeIdx].unit}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* FEEDBACK & NEXT BUTTON */}
            {challengeStatus !== 'unanswered' && (
              <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${challengeStatus === 'correct' ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/40 border-rose-500/50 text-rose-200'}`}>
                <p className="font-bold text-sm mb-1">{challengeStatus === 'correct' ? 'Correct Analysis!' : 'Scientific Review Needed:'}</p>
                <p>{challengeFeedback}</p>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
              {challengeStatus === 'unanswered' ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={CHALLENGES[currentChallengeIdx].type === 'mcq' ? selectedMcqIndex === null : numericInputValue.trim() === ''}
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <span>{currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge' : 'View Master Summary'}</span>
                  <span>→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REAL WORLD & SUMMARY */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* REAL WORLD ACTIVITY SECTION */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏭</span>
                <div>
                  <h2 className="text-xl font-bold text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h2>
                  <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS GRID RECAP */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                <span>⚠️</span> Common Misconceptions & Scientific Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-amber-400">{misc.title}</h4>
                    <p className="text-[11px] text-rose-300/90 line-through">Misconception: {misc.misconception}</p>
                    <p className="text-[11px] text-emerald-300/90 font-medium">Correction: {misc.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MASTERY & SRS PROGRESS SUMMARY */}
          <div className="flex flex-col gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <h3 className="text-md font-bold text-cyan-300">Biotechnology Node Mastery (BKT)</h3>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-1">
                {ALL_NODE_IDS.map((nodeId) => {
                  const prob = masteryProb(bktState[nodeId] || createBKTState(nodeId));
                  const pct = Math.round(prob * 100);
                  return (
                    <div key={nodeId} className="flex items-center justify-between bg-slate-950/50 p-2 rounded border border-slate-800/80 text-xs">
                      <span className="font-mono text-slate-400 text-[10px]">{nodeId}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="font-mono text-cyan-300 text-[10px] w-8 text-right">{pct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-3">
              <h3 className="text-md font-bold text-purple-300">Spaced Repetition (SM-2) Status</h3>
              <p className="text-xs text-slate-400">Items scheduled for memory consolidation review:</p>
              <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-300">Total Reviewed Items</span>
                <span className="font-mono font-bold text-purple-400 text-sm">{Object.keys(srsState).length}</span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('challenges');
                  setCurrentChallengeIdx(0);
                  audioManager.play('whoosh');
                }}
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:opacity-90 transition-all"
              >
                Restart Challenges Review Loop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C11_BiotechEnzymesBioenergeticsCBSESim;