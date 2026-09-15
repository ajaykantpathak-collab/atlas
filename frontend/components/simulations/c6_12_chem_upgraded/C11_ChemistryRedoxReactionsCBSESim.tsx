'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// MANDATORY NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c11_chem_cbse_025',
  'c11_chem_cbse_004',
  'c11_chem_cbse_022',
  'c11_chem_cbse_006',
  'c11_chem_cbse_015',
  'c11_chem_cbse_010',
  'c11_chem_cbse_029',
  'c11_chem_cbse_021',
  'c11_chem_cbse_027',
  'c11_chem_cbse_026',
  'c11_chem_cbse_023',
  'c11_chem_cbse_028',
  'c11_chem_cbse_016',
  'c11_chem_cbse_018',
  'c11_chem_cbse_007',
  'c11_chem_cbse_013',
  'c11_chem_cbse_014',
  'c11_chem_cbse_017',
  'c11_chem_cbse_020',
  'c11_chem_cbse_024'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Advanced Redox & Electrochemical Dynamics Laboratory',
  intro: 'Welcome to the High-Precision ISC Electrochemistry & Redox Research Facility. You are appointed as lead chemical investigator to analyze electron transfers, determine oxidation states, construct galvanic cells, and perform volumetric redox titrations.',
  context: 'Through interactive experiments, you will balance complex ionic equations, measure cell electromotive force (EMF), exploit standard reduction potentials, and investigate real-world industrial metallurgical and electrochemical processes.'
};

// ==========================================
// SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'When a strip of metallic zinc is placed in an aqueous solution of copper sulfate (CuSO₄), the solution gradually loses its vivid blue color while a reddish-brown deposit forms. Why does this electron transfer occur spontaneously without an external battery?',
  options: [
    'Zinc atoms have a higher reduction potential than copper, drawing electrons from Cu²⁺ ions.',
    'Zinc has a more negative standard reduction potential (E° = -0.76 V) than copper (E° = +0.34 V), giving Zn a stronger driving force to lose electrons to Cu²⁺.',
    'Copper ions act as reducing agents and donate protons directly to the metallic zinc lattice.',
    'Sulfate ions (SO₄²⁻) actively oxidize zinc while reducing water molecules to hydrogen gas.'
  ],
  correctIndex: 1,
  hintAfter: 'Spontaneous redox processes occur when species with lower (more negative) standard reduction potentials lose electrons to species with higher (more positive) reduction potentials, releasing free energy (ΔG° < 0).'
};

// ==========================================
// PROPS INTERFACE & DEFAULT PROPS
// ==========================================
interface SimProps {
  onComplete?: (score: number) => void;
  studentId?: string;
  initialNodeId?: NodeId;
}

const DEFAULT_PROPS: SimProps = {
  onComplete: undefined,
  studentId: 'isc_student_chem_11',
  initialNodeId: 'c11_chem_cbse_025'
};

// ==========================================
// SECTION 3: EXPLORATION STEPS (MANDATORY)
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Galvanic Cell Construction & EMF Measurement',
    instruction: 'Select anode and cathode metal pairs (Zn, Cu, Fe, Ag, Ni, Pb). Observe electron flow in the external circuit, ion migration in the salt bridge, and calculate E°cell = E°cathode - E°anode.',
    interactionType: 'galvanic_cell_builder',
    nodeId: 'c11_chem_cbse_026'
  },
  {
    title: 'Lab 2: Oxidation Number & Molecular Structure Analyzer',
    instruction: 'Inspect polyatomic ions and compounds (KMnO₄, K₂Cr₂O₇, Na₂S₂O₃, CrO₅, Br₃O₈, Fe₃O₄). Calculate structural vs average oxidation numbers and identify peroxo linkages.',
    interactionType: 'oxidation_number_calculator',
    nodeId: 'c11_chem_cbse_022'
  },
  {
    title: 'Lab 3: Ion-Electron Method Equation Balancer',
    instruction: 'Step through balancing complex redox equations in acidic (H⁺) and basic (OH⁻) media. Balance oxidation and reduction half-reactions, charge, atoms, and electrons.',
    interactionType: 'half_reaction_balancer',
    nodeId: 'c11_chem_cbse_029'
  },
  {
    title: 'Lab 4: Metal Displacement & Electrochemical Reactivity Series',
    instruction: 'Dip various metal strips into standard salt solutions. Observe spontaneous redox reactions, cell potentials, color changes, and rank species by standard reduction potential E°.',
    interactionType: 'reactivity_series_lab',
    nodeId: 'c11_chem_cbse_023'
  },
  {
    title: 'Lab 5: Quantitative Redox Titration (Permanganometry)',
    instruction: 'Perform volumetric redox titration of Fe²⁺ or oxalic acid using KMnO₄ as a self-indicator. Control the buret valve, detect the faint pink endpoint, and calculate analyte concentration.',
    interactionType: 'redox_titration_sim',
    nodeId: 'c11_chem_cbse_027'
  }
];

// ==========================================
// SECTION 4: PREDICTION QUESTIONS (MANDATORY)
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the cell voltage of a Daniell Cell (Zn|Zn²⁺ || Cu²⁺|Cu) if the concentration of Cu²⁺ in the cathode compartment is increased while Zn²⁺ remains constant?',
    options: [
      'The EMF will increase according to the Nernst Equation.',
      'The EMF will decrease because Cu²⁺ opposes electron flow.',
      'The EMF will remain strictly constant at 1.10 V regardless of concentration.',
      'The current will reverse direction, converting the cell into an electrolytic cell.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust cathode concentration in Lab 1 and observe the real-time cell potential readout.',
    nodeId: 'c11_chem_cbse_028'
  },
  {
    question: 'Predict: What is the oxidation state of chromium in perchromic acid (CrO₅), which forms a deep blue solution in ether?',
    options: [
      ' +10, because there are 5 oxygen atoms with -2 oxidation state.',
      ' +6, because the molecule contains two peroxo (-O-O-) linkages and one oxo (=O) bond.',
      ' +5, because chromium loses 5 valence d-electrons.',
      ' +4, due to fractional charge distribution.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select CrO₅ in Lab 2 to inspect its butterfly structural arrangement and peroxo bonds.',
    nodeId: 'c11_chem_cbse_018'
  }
];

// ==========================================
// SECTION 5: OBSERVATION QUESTIONS (MANDATORY)
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the color of the titration solution at the exact equivalence point when titrated with potassium permanganate (KMnO₄)?',
    options: [
      'The solution turns deep purple due to excess unreacted Fe²⁺.',
      'A permanent light/faint pink color persists due to a slight excess of MnO₄⁻ acting as a self-indicator.',
      'The solution precipitates as black manganese dioxide (MnO₂).',
      'The solution becomes completely colorless as all MnO₄⁻ converts to Mn²⁺.'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_cbse_020'
  },
  {
    question: 'What happens to the anode metal strip in a Galvanic cell during prolonged operation?',
    options: [
      'It gains mass as electrons accumulate on its surface.',
      'It loses mass because metal atoms oxidise into metal ions (M → Mⁿ⁺ + ne⁻) and dissolve into solution.',
      'It remains unchanged while the cathode dissolves into solution.',
      'It changes color but maintains constant mass.'
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_cbse_026'
  }
];

// ==========================================
// SECTION 6: REAL WORLD ACTIVITY (MANDATORY)
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Metallurgical Extraction & Corrosion Prevention Engineering',
  description: 'In industrial extraction of aluminum via the Hall-Héroult process and cathodic protection of underground steel pipelines, redox chemistry principles dictate energy efficiency and material longevity.',
  steps: [
    'Calculate the theoretical mass of pure iron (Fe) extracted from hematite (Fe₂O₃) reduced by carbon monoxide (CO) in a blast furnace operating at 95% efficiency.',
    'Step 1: Write balanced redox equation: Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g). Identify oxidation state change: Fe⁺³ → Fe⁰ (reduction), C⁺² → C⁺⁴ (oxidation).',
    'Step 2: Determine standard potential for cathodic protection of iron steel (E° Fe²⁺/Fe = -0.44 V) using a sacrificial magnesium anode (E° Mg²⁺/Mg = -2.37 V).',
    'Step 3: Calculate cell potential E°cell = -0.44 - (-2.37) = +1.93 V. Confirm that magnesium spontaneously oxidizes, sacrificing itself to prevent steel corrosion.',
    'Step 4: Formulate maintenance protocol for pipeline inspection based on electron transfer rates and soil resistivity.'
  ]
};

// ==========================================
// MISCONCEPTIONS (6 TOPIC SPECIFIC)
// ==========================================
interface Misconception {
  id: string;
  topic: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    topic: 'Oxidation State vs Charge',
    title: 'Confusing Oxidation State with Ionic Charge',
    misconception: 'Oxidation number is always identical to the actual physical charge on an atom.',
    correction: 'Oxidation state is a hypothetical charge assigned assuming all bonds are 100% ionic, whereas actual atomic charge depends on electronegativity and covalent character.',
    nodeId: 'c11_chem_cbse_022'
  },
  {
    id: 'misc_2',
    topic: 'Oxidising & Reducing Agents',
    title: 'Inverting Oxidising and Reducing Agents',
    misconception: 'The species undergoing oxidation is called the oxidising agent.',
    correction: 'The species undergoing oxidation loses electrons and causes reduction in another species; therefore, it is the REDUCING AGENT.',
    nodeId: 'c11_chem_cbse_015'
  },
  {
    id: 'misc_3',
    topic: 'Galvanic Cell Anode Sign',
    title: 'Anode Polarity Misconception',
    misconception: 'Anodes are always positive in all electrochemical systems.',
    correction: 'In a Galvanic (Voltaic) cell, the anode is NEGATIVE because it generates electrons via spontaneous oxidation. In an electrolytic cell, the anode is connected to the positive terminal.',
    nodeId: 'c11_chem_cbse_026'
  },
  {
    id: 'misc_4',
    topic: 'Fractional Oxidation States',
    title: 'Believing Fractional Oxidation States Belong to Single Atoms',
    misconception: 'An individual atom can possess a fraction of an electron, giving it a fractional oxidation number like +8/3 in Fe₃O₄.',
    correction: 'Fractional oxidation state is an AVERAGE across non-equivalent atoms in a structure (e.g., Fe₃O₄ contains two Fe³⁺ and one Fe²⁺, giving average (2×3 + 1×2)/3 = +8/3).',
    nodeId: 'c11_chem_cbse_018'
  },
  {
    id: 'misc_5',
    topic: 'Disproportionation Reactions',
    title: 'Misunderstanding Disproportionation',
    misconception: 'Any reaction involving two different oxidation products is a disproportionation reaction.',
    correction: 'Disproportionation occurs ONLY when the SAME element in an intermediate oxidation state is simultaneously oxidized and reduced to higher and lower oxidation states.',
    nodeId: 'c11_chem_cbse_017'
  },
  {
    id: 'misc_6',
    topic: 'Balancing Media Rules',
    title: 'Ignoring Reaction Medium in Ion-Electron Method',
    misconception: 'Redox equations can be balanced with H⁺ ions regardless of whether the solution is acidic or basic.',
    correction: 'In basic media, excess H⁺ ions must be neutralized by adding equal OH⁻ ions to both sides of the equation to form H₂O.',
    nodeId: 'c11_chem_cbse_021'
  }
];

// ==========================================
// CHALLENGES ARRAY (22+ CHALLENGES)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 to 7) ---
  {
    id: 'c1',
    nodeId: 'c11_chem_cbse_025',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classical Concepts',
    question: 'According to the classical concept, oxidation is defined as:',
    options: [
      'Addition of hydrogen or removal of oxygen',
      'Addition of oxygen/electronegative element or removal of hydrogen/electropositive element',
      'Gain of electrons by a chemical species',
      'Decrease in oxidation number'
    ],
    correctIndex: 1,
    explanation: 'Classically, oxidation involves gain of oxygen or removal of hydrogen (or addition of electronegative elements).',
    hints: ['Think about what happens when magnesium burns in oxygen.', 'Oxidation classically adds electronegative elements.', 'Check option B.'],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: 'c11_chem_cbse_004',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Electronic Concept',
    question: 'In terms of electron transfer (OIL RIG), reduction corresponds to:',
    options: [
      'Loss of electrons',
      'Gain of electrons',
      'Loss of protons',
      'Gain of neutrons'
    ],
    correctIndex: 1,
    explanation: 'OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain of electrons.',
    hints: ['Remember the acronym OIL RIG.', 'Reduction is Gain of electrons.', 'Select option B.'],
    misconceptionIndex: 1
  },
  {
    id: 'c3',
    nodeId: 'c11_chem_cbse_022',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Oxidation Number Rules',
    question: 'What is the oxidation state of oxygen in peroxides such as hydrogen peroxide (H₂O₂)?',
    options: ['-2', '-1', '+2', '0'],
    correctIndex: 1,
    explanation: 'In peroxides containing the (-O-O-) structural linkage, oxygen is assigned an oxidation state of -1.',
    hints: ['Standard oxygen is -2, but peroxides have O-O single bonds.', 'Each H is +1, so two H atoms contribute +2.', 'Thus 2×(O) = -2, meaning O = -1.'],
    misconceptionIndex: 0
  },
  {
    id: 'c4',
    nodeId: 'c11_chem_cbse_015',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Reagent Classification',
    question: 'A substance that undergoes reduction in a chemical reaction acts as a(n):',
    options: [
      'Reducing agent (reductant)',
      'Oxidising agent (oxidant)',
      'Catalyst',
      'Inert solvent'
    ],
    correctIndex: 1,
    explanation: 'An oxidising agent accepts electrons and causes another species to be oxidised, while itself being reduced.',
    hints: ['It causes oxidation in the other substance.', 'By gaining electrons, it oxidises its partner.', 'It is an oxidising agent.'],
    misconceptionIndex: 1
  },
  {
    id: 'c5',
    nodeId: 'c11_chem_cbse_006',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Reaction Types',
    question: 'Which of the following is an example of a redox combination reaction?',
    options: [
      'C(s) + O₂(g) → CO₂(g)',
      '2KClO₃(s) → 2KCl(s) + 3O₂(g)',
      'Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)',
      'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)'
    ],
    correctIndex: 0,
    explanation: 'C + O₂ → CO₂ involves elemental carbon (0) and oxygen (0) combining to form CO₂ where C is +4 and O is -2.',
    hints: ['Look for elemental reactants combining into a single compound.', 'Elemental states are 0.', 'Option A is elemental carbon + oxygen.'],
    misconceptionIndex: 4
  },
  {
    id: 'c6',
    nodeId: 'c11_chem_cbse_016',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Redox Couple Concept',
    question: 'How is a redox couple defined and represented in electrochemical shorthand?',
    options: [
      'A mixture of two reducing agents written as R1/R2',
      'An oxidized form and reduced form of a species having common atoms, represented as Ox/Red (e.g. Zn²⁺/Zn)',
      'A salt bridge connected to two inert electrodes',
      'Two elements with identical electronegativity'
    ],
    correctIndex: 1,
    explanation: 'A redox couple consists of the oxidized and reduced forms of a substance involved in an oxidation or reduction half-reaction.',
    hints: ['It pairs an oxidized species with its reduced partner.', 'Example: Cu²⁺/Cu or Zn²⁺/Zn.', 'Select option B.'],
    misconceptionIndex: 2
  },
  {
    id: 'c7',
    nodeId: 'c11_chem_cbse_013',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Corrosion Chemistry',
    question: 'During atmospheric rusting of iron (corrosion), iron acts as the:',
    options: [
      'Cathode where oxygen is reduced',
      'Anode where Fe is oxidised to Fe²⁺',
      'Salt bridge maintaining charge neutralisation',
      'Inert spectator substrate'
    ],
    correctIndex: 1,
    explanation: 'At the anodic spot on iron surface, Fe(s) → Fe²⁺(aq) + 2e⁻ (Oxidation occurs at the anode).',
    hints: ['Oxidation occurs at the anode.', 'Iron loses electrons to form rust.', 'Option B is correct.'],
    misconceptionIndex: 2
  },

  // --- STANDARD TIER (8 to 15) ---
  {
    id: 'c8',
    nodeId: 'c11_chem_cbse_022',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Oxidation Number Calculation',
    question: 'Calculate the oxidation state of Manganese (Mn) in Potassium Permanganate (KMnO₄).',
    correctAnswer: 7,
    explanation: 'In KMnO₄: K is +1, O is -2. (+1) + Mn + 4(-2) = 0 ⇒ Mn - 7 = 0 ⇒ Mn = +7.',
    hints: ['Assign K = +1 and O = -2.', 'Sum of oxidation numbers in a neutral compound = 0.', '1 + Mn - 8 = 0, so Mn = 7.'],
    misconceptionIndex: 0
  },
  {
    id: 'c9',
    nodeId: 'c11_chem_cbse_022',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Oxidation Number Calculation',
    question: 'Calculate the oxidation state of Chromium (Cr) in Potassium Dichromate (K₂Cr₂O₇).',
    correctAnswer: 6,
    explanation: 'In K₂Cr₂O₇: 2(+1) + 2(Cr) + 7(-2) = 0 ⇒ 2 + 2Cr - 14 = 0 ⇒ 2Cr = 12 ⇒ Cr = +6.',
    hints: ['Assign K = +1 and O = -2.', '2(+1) + 2(Cr) - 14 = 0.', '2Cr = 12, so Cr = 6.'],
    misconceptionIndex: 0
  },
  {
    id: 'c10',
    nodeId: 'c11_chem_cbse_017',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Disproportionation Mechanism',
    question: 'Which of the following chemical reactions represents a true disproportionation reaction?',
    options: [
      '2H₂O₂(aq) → 2H₂O(l) + O₂(g)',
      'NaCl(aq) + AgNO₃(aq) → AgCl(s) + NaNO₃(aq)',
      'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g)',
      'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)'
    ],
    correctIndex: 0,
    explanation: 'In H₂O₂, oxygen is in -1 state. In H₂O, oxygen is -2 (reduced), and in O₂, oxygen is 0 (oxidised). The same oxygen element undergoes both processes.',
    hints: ['Look for a single element in an intermediate state decomposing into lower and higher oxidation states.', 'In H₂O₂, O is at -1.', 'It forms H₂O (-2) and O₂ (0).'],
    misconceptionIndex: 4
  },
  {
    id: 'c11',
    nodeId: 'c11_chem_cbse_028',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Cell EMF Calculation',
    question: 'Calculate the standard EMF (E°cell) in Volts for a Daniell Cell where E°(Zn²⁺/Zn) = -0.76 V and E°(Cu²⁺/Cu) = +0.34 V.',
    correctAnswer: 1.1,
    explanation: 'E°cell = E°cathode - E°anode = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0.34 - (-0.76) = +1.10 V.',
    hints: ['E°cell = E°cathode - E°anode.', 'Copper is cathode (+0.34 V) and Zinc is anode (-0.76 V).', '0.34 - (-0.76) = 1.10 V.'],
    misconceptionIndex: 2
  },
  {
    id: 'c12',
    nodeId: 'c11_chem_cbse_010',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Oxidation Number Method Balancing',
    question: 'In the balanced equation: a MnO₄⁻ + b Fe²⁺ + c H⁺ → a Mn²⁺ + b Fe³⁺ + d H₂O, what is the stoichiometric coefficient b for Fe²⁺?',
    correctAnswer: 5,
    explanation: 'Mn change: +7 to +2 (5 electrons gained). Fe change: +2 to +3 (1 electron lost). Equalizing electrons requires 5 Fe²⁺ per 1 MnO₄⁻, so b = 5.',
    hints: ['Mn changes from +7 to +2 (gains 5 e⁻).', 'Fe changes from +2 to +3 (loses 1 e⁻).', 'To balance electrons: 1×5 e⁻ = 5 Fe²⁺ ions.'],
    misconceptionIndex: 5
  },
  {
    id: 'c13',
    nodeId: 'c11_chem_cbse_023',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Electrochemical Series Analysis',
    question: 'Given standard reduction potentials: E°(Li⁺/Li) = -3.04 V, E°(Zn²⁺/Zn) = -0.76 V, E°(Fe²⁺/Fe) = -0.44 V, E°(Cu²⁺/Cu) = +0.34 V. Which metal is the strongest reducing agent?',
    options: ['Copper (Cu)', 'Iron (Fe)', 'Zinc (Zn)', 'Lithium (Li)'],
    correctIndex: 3,
    explanation: 'The species with the most negative standard reduction potential has the greatest tendency to lose electrons, making Lithium (Li) the strongest reducing agent.',
    hints: ['Strongest reducing agent = most negative E° value.', 'Check the list for the minimum E°.', 'Lithium has -3.04 V.'],
    misconceptionIndex: 1
  },
  {
    id: 'c14',
    nodeId: 'c11_chem_cbse_027',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Redox Titration Indicators',
    question: 'Why does potassium permanganate (KMnO₄) act as a self-indicator in redox titrations?',
    options: [
      'It changes color only when starch indicator is added.',
      'The intensely colored purple MnO₄⁻ ion is reduced to virtually colorless Mn²⁺ in acidic solution; the first excess drop of MnO₄⁻ imparts a permanent faint pink color.',
      'It precipitates as white MnSO₄ at the equivalence point.',
      'It emits fluorescent light when all reductant is consumed.'
    ],
    correctIndex: 1,
    explanation: 'KMnO₄ is intensely purple. When reduced to Mn²⁺ it becomes colorless. At endpoint, one extra drop colors the solution faint pink.',
    hints: ['MnO₄⁻ is deep purple, Mn²⁺ is colorless.', 'Excess MnO₄⁻ gives a persistent faint pink shade.', 'Option B describes a self-indicator.'],
    misconceptionIndex: 0
  },
  {
    id: 'c15',
    nodeId: 'c11_chem_cbse_007',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Metallurgical Redox Applications',
    question: 'In the thermite reaction used for welding railway tracks: 2Al + Fe₂O₃ → Al₂O₃ + 2Fe + Heat, which species acts as the reducing agent?',
    options: ['Aluminium (Al)', 'Iron(III) oxide (Fe₂O₃)', 'Aluminium oxide (Al₂O₃)', 'Metallic iron (Fe)'],
    correctIndex: 0,
    explanation: 'Aluminium goes from oxidation state 0 to +3 in Al₂O₃, losing electrons and reducing Fe³⁺ to metallic iron Fe⁰.',
    hints: ['Find the element that loses electrons and gains oxygen.', 'Al goes from 0 to +3.', 'Aluminium is the reducing agent.'],
    misconceptionIndex: 1
  },

  // --- ADVANCED TIER (16 to 22) ---
  {
    id: 'c16',
    nodeId: 'c11_chem_cbse_018',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Structural vs Average Oxidation State',
    question: 'In tetrathionate ion (S₄O₆²⁻), what are the individual oxidation states of the four sulfur atoms according to its chemical structure [⁻O₃S-S-S-SO₃⁻]?',
    options: [
      'All four sulfur atoms have an oxidation state of +2.5',
      'Two terminal sulfur atoms are +5 each, and two central sulfur atoms are 0 each',
      'Two sulfur atoms are +6 and two are -1',
      'Four sulfur atoms are +2 each'
    ],
    correctIndex: 1,
    explanation: 'The terminal -SO₃⁻ sulfurs are bonded to electronegative oxygens giving +5 state each. The central -S-S- bridge sulfurs are bonded to sulfur (0 difference), giving state 0. Average = (5+0+0+5)/4 = +2.5.',
    hints: ['Look at the structure: O₃S - S - S - SO₃.', 'S-S bonds between identical atoms contribute 0.', 'Terminal S bonded to 3 Oxygens is +5.'],
    misconceptionIndex: 3
  },
  {
    id: 'c17',
    nodeId: 'c11_chem_cbse_029',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Ion-Electron Method Acidic Medium',
    question: 'When balancing the half-reaction Cr₂O₇²⁻ + H⁺ + e⁻ → 2Cr³⁺ + H₂O in acidic solution, how many electrons (e⁻) must be added to the left side?',
    correctAnswer: 6,
    explanation: 'Left side charge: -2 + 14(+1) = +12. Right side charge: 2(+3) = +6. Charge difference = +12 - (+6) = +6 e⁻.',
    hints: ['Balance Cr atoms first (2 Cr³⁺).', 'Balance O with 7 H₂O, then balance H with 14 H⁺.', 'Left charge +12, Right charge +6. Add 6 e⁻ to left.'],
    misconceptionIndex: 5
  },
  {
    id: 'c18',
    nodeId: 'c11_chem_cbse_021',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Ion-Electron Method Basic Medium',
    question: 'When balancing MnO₄⁻ + I⁻ → MnO₂ + IO₃⁻ in basic medium, what is the total number of OH⁻ ions appearing in the fully balanced net ionic equation?',
    correctAnswer: 2,
    explanation: 'Balanced basic equation: 2MnO₄⁻ + I⁻ + H₂O → 2MnO₂ + IO₃⁻ + 2OH⁻. Thus 2 OH⁻ ions appear on the product side.',
    hints: ['Balance oxidation: I⁻ + 6OH⁻ → IO₃⁻ + 3H₂O + 6e⁻.', 'Balance reduction: 2(MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻).', 'Net result leaves 2 OH⁻ on right side.'],
    misconceptionIndex: 5
  },
  {
    id: 'c19',
    nodeId: 'c11_chem_cbse_014',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Commercial Battery Electrochemistry',
    question: 'In a lead-acid storage battery during discharging, what are the chemical transformations occurring at the anode and cathode?',
    options: [
      'Anode: Pb → PbSO₄; Cathode: PbO₂ → PbSO₄',
      'Anode: PbO₂ → Pb; Cathode: Pb → PbO₂',
      'Anode: H₂ → H₂O; Cathode: O₂ → H₂O',
      'Anode: Cd → Cd(OH)₂; Cathode: NiO(OH) → Ni(OH)₂'
    ],
    correctIndex: 0,
    explanation: 'During discharge, spongy lead at anode oxidizes to PbSO₄ (Pb → Pb²⁺ + 2e⁻) and lead dioxide at cathode reduces to PbSO₄ (Pb⁴⁺ + 2e⁻ → Pb²⁺).',
    hints: ['Both electrodes convert to lead sulfate (PbSO₄).', 'Anode is spongy metallic Pb.', 'Cathode is lead dioxide PbO₂.'],
    misconceptionIndex: 2
  },
  {
    id: 'c20',
    nodeId: 'c11_chem_cbse_020',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Volumetric Redox Stoichiometry',
    question: 'How many mL of 0.02 M KMnO₄ solution are required to completely react with 25.0 mL of 0.10 M FeSO₄ solution in acidic medium?',
    correctAnswer: 25,
    explanation: 'Reaction ratio is 1 MnO₄⁻ : 5 Fe²⁺. Moles Fe²⁺ = 0.025 L × 0.10 M = 0.0025 mol. Moles MnO₄⁻ required = 0.0025 / 5 = 0.0005 mol. Volume KMnO₄ = 0.0005 / 0.02 = 0.025 L = 25.0 mL.',
    hints: ['Equation: 1 MnO₄⁻ ≡ 5 Fe²⁺.', 'Moles of Fe²⁺ = 25 mL × 0.10 M = 2.5 mmol.', 'Moles KMnO₄ = 2.5 / 5 = 0.5 mmol.', 'Volume = 0.5 mmol / 0.02 M = 25 mL.'],
    misconceptionIndex: 5
  },
  {
    id: 'c21',
    nodeId: 'c11_chem_cbse_024',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Environmental & Industrial Applications',
    question: 'In biological cellular respiration, electron transport chain (ETC) reactions harness energy from redox couples. Which final electron acceptor enables aerobic ATP synthesis?',
    options: [
      'Molecular Oxygen (O₂), which is reduced to water (H₂O)',
      'Carbon Dioxide (CO₂), which is reduced to methane',
      'Nitrate ions (NO₃⁻), reduced to nitrogen gas',
      'NAD⁺, which is oxidized to NADH'
    ],
    correctIndex: 0,
    explanation: 'In aerobic respiration, oxygen serves as the terminal electron acceptor (E° = +0.82 V at pH 7), being reduced to H₂O.',
    hints: ['Aerobic means oxygen is consumed.', 'Oxygen accepts electrons at the end of ETC.', 'O₂ is reduced to H₂O.'],
    misconceptionIndex: 1
  },
  {
    id: 'c22',
    nodeId: 'c11_chem_cbse_026',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Salt Bridge Physiology & Cell Function',
    question: 'What is the primary function of a salt bridge containing inert electrolyte (like KCl in agar) in a Galvanic cell?',
    options: [
      'To allow free movement of electrons directly between liquid solutions',
      'To maintain electrical neutrality in both half-cell solutions by allowing migration of ions without chemical reaction',
      'To increase the concentration of metal ions at the anode',
      'To prevent any ions from transferring between half-cells'
    ],
    correctIndex: 1,
    explanation: 'The salt bridge completes the electrical circuit and maintains electrical neutrality by supplying cations and anions to offset charge buildup.',
    hints: ['Electrons flow through wires, not through liquid salt bridges.', 'Ions move through the salt bridge.', 'It prevents charge accumulation and maintains electrical neutrality.'],
    misconceptionIndex: 2
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Galvanic Cell Interactive Diagram
const GalvanicCellDiagram: React.FC<{
  anodeMetal: string;
  cathodeMetal: string;
  cellEMF: number;
  isRunning: boolean;
}> = ({ anodeMetal, cathodeMetal, cellEMF, isRunning }) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl flex flex-col items-center">
      <div className="text-center mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">Interactive Galvanic Cell Architecture</span>
        <h4 className="text-lg font-bold text-white">{anodeMetal} - {cathodeMetal} Cell System</h4>
      </div>
      <svg viewBox="0 0 600 320" className="w-full max-w-lg h-auto">
        <defs>
          <linearGradient id="beakerGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="cuSolutionGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.7" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Left Beaker (Anode) */}
        <rect x="70" y="140" width="160" height="140" rx="10" fill="url(#beakerGrad)" stroke="#38bdf8" strokeWidth="2" />
        <text x="150" y="260" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">Anode Half-Cell</text>
        <text x="150" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="10">({anodeMetal}²⁺ Solution)</text>

        {/* Right Beaker (Cathode) */}
        <rect x="370" y="140" width="160" height="140" rx="10" fill="url(#cuSolutionGrad)" stroke="#60a5fa" strokeWidth="2" />
        <text x="450" y="260" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">Cathode Half-Cell</text>
        <text x="450" y="275" textAnchor="middle" fill="#cbd5e1" fontSize="10">({cathodeMetal}²⁺ Solution)</text>

        {/* Anode Electrode */}
        <rect x="120" y="80" width="24" height="130" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" rx="3" />
        <text x="132" y="72" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">Anode (-)</text>
        <text x="132" y="150" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">{anodeMetal}</text>

        {/* Cathode Electrode */}
        <rect x="440" y="80" width="24" height="130" fill="#b45309" stroke="#f59e0b" strokeWidth="2" rx="3" />
        <text x="452" y="72" textAnchor="middle" fill="#22c55e" fontSize="12" fontWeight="bold">Cathode (+)</text>
        <text x="452" y="150" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">{cathodeMetal}</text>

        {/* Salt Bridge */}
        <path d="M 180 160 L 180 110 Q 180 90 200 90 L 400 90 Q 420 90 420 110 L 420 160" fill="none" stroke="#f1f5f9" strokeWidth="16" strokeLinecap="round" />
        <path d="M 180 160 L 180 110 Q 180 90 200 90 L 400 90 Q 420 90 420 110 L 420 160" fill="none" stroke="#e2e8f0" strokeWidth="10" strokeLinecap="round" />
        <text x="300" y="82" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Salt Bridge (KNO₃ / Agar)</text>

        {/* Salt Bridge Ions */}
        {isRunning && (
          <>
            <circle cx="230" cy="90" r="4" fill="#ef4444">
              <animate attributeName="cx" values="230;190" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="230" y="105" fill="#ef4444" fontSize="9">NO₃⁻</text>
            <circle cx="370" cy="90" r="4" fill="#22c55e">
              <animate attributeName="cx" values="370;410" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="370" y="105" fill="#22c55e" fontSize="9">K⁺</text>
          </>
        )}

        {/* External Wires & Voltmeter */}
        <polyline points="132,80 132,35 250,35" fill="none" stroke="#f59e0b" strokeWidth="3" />
        <polyline points="350,35 452,35 452,80" fill="none" stroke="#f59e0b" strokeWidth="3" />

        {/* Voltmeter Box */}
        <rect x="250" y="15" width="100" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <text x="300" y="32" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">VOLTMETER</text>
        <text x="300" y="47" textAnchor="middle" fill="#4ade80" fontSize="14" fontFamily="monospace" fontWeight="bold" filter="url(#glow)">
          {cellEMF > 0 ? `+${cellEMF.toFixed(2)} V` : `${cellEMF.toFixed(2)} V`}
        </text>

        {/* Electron Flow Animation */}
        {isRunning && cellEMF > 0 && (
          <>
            <circle cx="160" cy="35" r="4" fill="#yellow">
              <animate attributeName="cx" values="132;250" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="390" cy="35" r="4" fill="#yellow">
              <animate attributeName="cx" values="350;452" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="28" fill="#facc15" fontSize="10" fontWeight="bold">e⁻ flow →</text>
          </>
        )}

        {/* Half Reactions */}
        <text x="150" y="302" textAnchor="middle" fill="#f87171" fontSize="10" fontFamily="monospace">
          {anodeMetal} → {anodeMetal}²⁺ + 2e⁻ (Oxidation)
        </text>
        <text x="450" y="302" textAnchor="middle" fill="#4ade80" fontSize="10" fontFamily="monospace">
          {cathodeMetal}²⁺ + 2e⁻ → {cathodeMetal} (Reduction)
        </text>
      </svg>
    </div>
  );
};

// Diagram 2: Redox Titration Setup Diagram
const RedoxTitrationDiagram: React.FC<{
  buretVolume: number;
  isTitrating: boolean;
  endpointReached: boolean;
}> = ({ buretVolume, isTitrating, endpointReached }) => {
  const liquidHeight = Math.max(10, 140 - buretVolume * 3.5);

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl flex flex-col items-center">
      <div className="text-center mb-2">
        <span className="text-xs font-mono uppercase tracking-wider text-purple-400">Volumetric Apparatus</span>
        <h4 className="text-lg font-bold text-white">KMnO₄ Permanganometric Titration</h4>
      </div>
      <svg viewBox="0 0 400 340" className="w-full max-w-sm h-auto">
        {/* Stand Base & Rod */}
        <rect x="80" y="310" width="240" height="15" fill="#334155" rx="4" />
        <rect x="110" y="20" width="10" height="295" fill="#64748b" />

        {/* Clamp */}
        <rect x="110" y="100" width="60" height="12" fill="#475569" rx="2" />

        {/* Buret Tube */}
        <rect x="160" y="30" width="20" height="170" fill="#e2e8f0" fillOpacity="0.2" stroke="#94a3b8" strokeWidth="2" />
        {/* Buret Liquid (KMnO4 purple) */}
        <rect x="162" y={30 + (170 - liquidHeight)} width="16" height={liquidHeight} fill="#7e22ce" fillOpacity="0.85" />

        {/* Buret Graduations */}
        {[0, 5, 10, 15, 20, 25, 30, 35, 40].map((val, idx) => (
          <line key={idx} x1="172" y1={35 + idx * 16} x2="180" y2={35 + idx * 16} stroke="#cbd5e1" strokeWidth="1" />
        ))}
        <text x="145" y="40" fill="#a855f7" fontSize="9" fontWeight="bold">0 mL</text>
        <text x="140" y="195" fill="#a855f7" fontSize="9" fontWeight="bold">35 mL</text>

        {/* Stopcock Valve */}
        <rect x="165" y="200" width="10" height="15" fill="#f59e0b" rx="2" />
        <line x1="170" y1="215" x2="170" y2="230" stroke="#94a3b8" strokeWidth="2" />

        {/* Falling Drops */}
        {isTitrating && (
          <circle cx="170" cy="240" r="3" fill="#a855f7">
            <animate attributeName="cy" values="230;265" dur="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0" dur="0.5s" repeatCount="indefinite" />
          </circle>
        )}

        {/* Erlenmeyer Flask */}
        <path d="M 155 240 L 185 240 L 220 300 C 225 308 215 310 205 310 L 135 310 C 125 310 115 308 120 300 Z"
              fill={endpointReached ? "#f472b6" : "#e0f2fe"}
              fillOpacity={endpointReached ? "0.75" : "0.3"}
              stroke="#38bdf8"
              strokeWidth="2" />

        <text x="240" y="115" fill="#cbd5e1" fontSize="11" fontWeight="bold">Buret: Standard KMnO₄ (0.02 M)</text>
        <text x="240" y="275" fill="#cbd5e1" fontSize="11" fontWeight="bold">Flask: Fe²⁺ + H₂SO₄</text>
        <text x="240" y="295" fill={endpointReached ? "#ec4899" : "#38bdf8"} fontSize="11" fontWeight="bold">
          {endpointReached ? "★ Endpoint: Permanent Pink" : "Colorless (Mn²⁺ formed)"}
        </text>
      </svg>
    </div>
  );
};

// Diagram 3: Electrochemical Series Diagram
const ElectrochemicalSeriesDiagram: React.FC<{ selectedMetal: string }> = ({ selectedMetal }) => {
  const series = [
    { symbol: 'Li⁺/Li', e0: -3.04, role: 'Strongest Reducing Agent' },
    { symbol: 'K⁺/K', e0: -2.93, role: 'High Reactivity' },
    { symbol: 'Ca²⁺/Ca', e0: -2.87, role: 'Active Metal' },
    { symbol: 'Na⁺/Na', e0: -2.71, role: 'Active Metal' },
    { symbol: 'Mg²⁺/Mg', e0: -2.37, role: 'Sacrificial Anode' },
    { symbol: 'Al³⁺/Al', e0: -1.66, role: 'Metallurgical Extract' },
    { symbol: 'Zn²⁺/Zn', e0: -0.76, role: 'Standard Anode' },
    { symbol: 'Fe²⁺/Fe', e0: -0.44, role: 'Corrosion Subject' },
    { symbol: 'H⁺/H₂ (SHE)', e0: 0.00, role: 'Standard Reference (0.00V)' },
    { symbol: 'Cu²⁺/Cu', e0: +0.34, role: 'Standard Cathode' },
    { symbol: 'Ag⁺/Ag', e0: +0.80, role: 'Noble Metal' },
    { symbol: 'F₂/F⁻', e0: +2.87, role: 'Strongest Oxidising Agent' }
  ];

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl">
      <div className="text-center mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Standard Reduction Potential Scale (E° at 298 K)</span>
        <h4 className="text-md font-bold text-white">Electrochemical Activity Hierarchy</h4>
      </div>
      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-2">
        {series.map((item) => {
          const isSelected = selectedMetal.includes(item.symbol.split('/')[1] || item.symbol);
          const isSHE = item.e0 === 0.00;
          return (
            <div
              key={item.symbol}
              className={`flex items-center justify-between p-2 rounded-lg text-xs transition-all ${
                isSelected
                  ? 'bg-cyan-900/60 border border-cyan-400 text-white font-bold scale-[1.02]'
                  : isSHE
                  ? 'bg-amber-950/40 border border-amber-500/50 text-amber-200'
                  : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono w-20 text-cyan-300 font-semibold">{item.symbol}</span>
                <span className="text-slate-400 text-[10px] hidden sm:inline">{item.role}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`font-mono font-bold ${item.e0 < 0 ? 'text-red-400' : item.e0 > 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {item.e0 > 0 ? `+${item.e0.toFixed(2)}` : item.e0.toFixed(2)} V
                </span>
                <div className="w-16 bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.e0 < 0 ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, Math.abs(item.e0) * 30)}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
export default function C11_ChemistryRedoxReactionsCBSESim({
  onComplete,
  studentId = 'isc_student_chem_11',
  initialNodeId = 'c11_chem_cbse_025'
}: SimProps) {
  // --- Navigation & State ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // --- Assessment & Tracking ---
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const map: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState(id);
    });
    return map;
  });

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const map: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createReviewItem(id);
    });
    return map;
  });

  const [userScore, setUserScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // --- Discovery & Feedback state ---
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // --- UX Feedback ---
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHintBubble, setShowHintBubble] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // --- Timers & Speech ---
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // --- LAB 1 STATE: Galvanic Cell ---
  const [anodeMetal, setAnodeMetal] = useState<string>('Zn');
  const [cathodeMetal, setCathodeMetal] = useState<string>('Cu');
  const [isCellRunning, setIsCellRunning] = useState<boolean>(true);

  const metalPotentials: Record<string, number> = {
    Li: -3.04,
    Mg: -2.37,
    Al: -1.66,
    Zn: -0.76,
    Fe: -0.44,
    Ni: -0.25,
    Pb: -0.13,
    Cu: 0.34,
    Ag: 0.80
  };

  const calculatedEMF = useMemo(() => {
    const eCathode = metalPotentials[cathodeMetal] ?? 0.34;
    const eAnode = metalPotentials[anodeMetal] ?? -0.76;
    return eCathode - eAnode;
  }, [anodeMetal, cathodeMetal]);

  // --- LAB 2 STATE: Oxidation Number Calculator ---
  const [selectedCompound, setSelectedCompound] = useState<string>('KMnO4');
  const compoundDetails: Record<string, { formula: string; name: string; targetElem: string; oxState: string; breakDown: string }> = {
    KMnO4: { formula: 'KMnO₄', name: 'Potassium Permanganate', targetElem: 'Mn', oxState: '+7', breakDown: 'K (+1) + Mn + 4×O (-2) = 0 ⇒ 1 + Mn - 8 = 0 ⇒ Mn = +7' },
    K2Cr2O7: { formula: 'K₂Cr₂O₇', name: 'Potassium Dichromate', targetElem: 'Cr', oxState: '+6', breakDown: '2×K (+1) + 2×Cr + 7×O (-2) = 0 ⇒ 2 + 2Cr - 14 = 0 ⇒ 2Cr = +12 ⇒ Cr = +6' },
    Na2S2O3: { formula: 'Na₂S₂O₃', name: 'Sodium Thiosulfate', targetElem: 'S', oxState: '+2 (Average)', breakDown: '2×Na (+1) + 2×S + 3×O (-2) = 0 ⇒ 2 + 2S - 6 = 0 ⇒ 2S = +4 ⇒ S = +2' },
    CrO5: { formula: 'CrO₅', name: 'Perchromic Acid (Butterfly Structure)', targetElem: 'Cr', oxState: '+6 (Structural)', breakDown: 'Contains two peroxo (-O-O-) linkages (-1 each) and one oxo (=O) (-2). Cr + 4(-1) + 1(-2) = 0 ⇒ Cr = +6' },
    Br3O8: { formula: 'Br₃O₈', name: 'Tribromooctaoxide', targetElem: 'Br', oxState: '+16/3 (Avg)', breakDown: 'Structure: O₃Br - Br(O₂) - BrO₃. Two terminal Br are +6 each; middle Br is +4. Avg = (6+4+6)/3 = +16/3' },
    Fe3O4: { formula: 'Fe₃O₄', name: 'Magnetite (Mixed Oxide)', targetElem: 'Fe', oxState: '+8/3 (Avg)', breakDown: 'Equates to FeO·Fe₂O₃ (One Fe²⁺ and two Fe³⁺). Avg = (2 + 2×3)/3 = +8/3' }
  };

  // --- LAB 3 STATE: Half-Reaction Balancer ---
  const [balancerStep, setBalancerStep] = useState<number>(1);
  const [selectedMedium, setSelectedMedium] = useState<'acidic' | 'basic'>('acidic');

  // --- LAB 4 STATE: Reactivity Lab ---
  const [dippedMetal, setDippedMetal] = useState<string>('Zn');
  const [solutionSalt, setSolutionSalt] = useState<string>('CuSO4');

  const displacementResult = useMemo(() => {
    const metalE0 = metalPotentials[dippedMetal] ?? 0;
    const saltMetal = solutionSalt.replace('SO4', '').replace('NO3', '');
    const saltE0 = metalPotentials[saltMetal] ?? 0;
    if (metalE0 < saltE0) {
      return {
        spontaneous: true,
        text: `Spontaneous Redox Reaction! ${dippedMetal} oxidizes and dissolves, displacing ${saltMetal} metal which deposits on the strip.`,
        deltaE: (saltE0 - metalE0).toFixed(2)
      };
    }
    return {
      spontaneous: false,
      text: `No Reaction. ${dippedMetal} has a higher E° than ${saltMetal}, so no electron transfer occurs.`,
      deltaE: (saltE0 - metalE0).toFixed(2)
    };
  }, [dippedMetal, solutionSalt]);

  // --- LAB 5 STATE: Redox Titration ---
  const [buretVolumeDelivered, setBuretVolumeDelivered] = useState<number>(0);
  const [isTitrating, setIsTitrating] = useState<boolean>(false);

  // Endpoint is 25.0 mL for 0.1 M Fe2+ (25 mL) titrated by 0.02 M KMnO4
  const titrationEndpointReached = buretVolumeDelivered >= 24.8 && buretVolumeDelivered <= 25.2;

  // --- Inactivity Auto-Hint ---
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHintBubble(false);

    inactivityTimerRef.current = setTimeout(() => {
      const currentChallenge = CHALLENGES[currentChallengeIndex];
      if (currentChallenge && !isAnswerSubmitted) {
        setCurrentHintText(`Auto Hint: ${currentChallenge.hints[0]}`);
        setShowHintBubble(true);
        audioManager.play('hint');
        speechManager.speak('Here is a hint to help you solve this question.');
      }
    }, 10000); // 10s inactivity
  }, [currentChallengeIndex, isAnswerSubmitted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, activeTab, currentChallengeIndex]);

  // --- Buret Animation Loop ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTitrating && buretVolumeDelivered < 35) {
      interval = setInterval(() => {
        setBuretVolumeDelivered((prev) => {
          const next = prev + 0.1;
          if (next >= 35) {
            setIsTitrating(false);
            return 35;
          }
          return parseFloat(next.toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isTitrating, buretVolumeDelivered]);

  // --- Handlers ---
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryAnswer(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent discovery! You correctly identified standard reduction potential as the driving force.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Let us examine standard electrode potentials.');
    }
  };

  const handleChallengeSubmit = () => {
    const challenge = CHALLENGES[currentChallengeIndex];
    if (!challenge) return;

    let correct = false;
    if (challenge.type === 'numeric') {
      const parsedVal = parseFloat(numericInput.trim());
      const targetVal = typeof challenge.correctAnswer === 'number' ? challenge.correctAnswer : parseFloat(String(challenge.correctAnswer));
      correct = Math.abs(parsedVal - targetVal) < 0.1;
    } else if (challenge.correctIndex !== undefined) {
      correct = selectedOption === challenge.correctIndex;
    }

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    // Update BKT & SRS
    const nodeId = challenge.nodeId;
    const currentBKT = bktMap[nodeId] || createBKTState(nodeId);
    const updatedBKT = bktUpdate(currentBKT, correct);

    const currentSRS = srsMap[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, correct ? 5 : 2);

    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Correct! Outstanding application of redox principles.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);

      setUserScore((prev) => prev + (challenge.difficulty === 'advanced' ? 15 : challenge.difficulty === 'standard' ? 10 : 5));
      setCompletedChallenges((prev) => new Set(prev).add(challenge.id));

      if (completedChallenges.size + 1 === CHALLENGES.length) {
        audioManager.play('celebration');
        setShowSuccessBanner(true);
        recordGameScore('C11_ChemistryRedoxReactions', userScore + 20);
        if (onComplete) onComplete(userScore + 20);
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect solution. Check the step-by-step breakdown.');
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericInput('');
    setIsAnswerSubmitted(false);
    setIsCorrect(null);
    setShowHintBubble(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    }
  };

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Mandatory Audio/Visual Feedback Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Redox Mastery Achieved! All 22 Laboratory Challenges Solved!" />
      <HintBubble show={showHintBubble} text={currentHintText} />
      <SparkleBurst show={showSparkle} x={600} y={300} />

      {/* HEADER BAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-cyan-500/20">
            e⁻
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">ISC Class 11 Redox Reactions & Electrochemistry</h1>
            <p className="text-xs text-slate-400">Interactive Learning Module • Node Suite (20 Subtopics)</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700">
          {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Score & Mastery Metric */}
        <div className="flex items-center space-x-4 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Lab XP</span>
            <span className="text-sm font-mono font-bold text-amber-400">{userScore} PTS</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Solved</span>
            <span className="text-sm font-mono font-bold text-cyan-400">{completedChallenges.size}/{CHALLENGES.length}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6">

        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 border border-slate-700 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="max-w-3xl space-y-3">
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
                  Scenario Overview
                </span>
                <h2 className="text-2xl font-bold text-white">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
                <p className="text-slate-400 text-xs italic leading-relaxed">{SCENARIO.context}</p>
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white">Interactive Preconception Discovery</h3>
              </div>

              <p className="text-slate-200 text-sm">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm transition-all border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                          : idx === discoveryAnswer
                          ? 'bg-red-950/60 border-red-500 text-red-200'
                          : 'bg-slate-800/40 border-slate-800 text-slate-400'
                        : discoveryAnswer === idx
                        ? 'bg-cyan-950 border-cyan-400 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-cyan-500/40 text-sm text-cyan-200 space-y-2">
                  <span className="font-bold text-cyan-300 block">Scientific Concept Breakdown:</span>
                  <p className="text-xs text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                <span className="text-cyan-400">🔮</span>
                <span>Hypothesis & Prediction Workstation</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-semibold text-cyan-300">{pred.question}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => {
                      const isSelected = predictionAnswers[pIdx] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('pop');
                            setPredictionAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                          }}
                          className={`p-3 rounded-lg text-left text-xs transition-all border ${
                            isSelected
                              ? 'bg-cyan-950 border-cyan-400 text-white font-bold'
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predictionAnswers[pIdx] !== undefined && (
                    <div className="text-[11px] text-amber-300 bg-amber-950/30 p-2.5 rounded-lg border border-amber-500/30">
                      <strong>Verification Guide:</strong> {pred.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Selection Bar */}
            <div className="flex items-center overflow-x-auto space-x-2 pb-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('whoosh');
                    setActiveLabIndex(idx);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                    activeLabIndex === idx
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Lab Details Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-cyan-400 uppercase tracking-wider block">Lab Instruction:</span>
              <p>{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
            </div>

            {/* LAB INTERACTION COMPONENTS */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <GalvanicCellDiagram
                    anodeMetal={anodeMetal}
                    cathodeMetal={cathodeMetal}
                    cellEMF={calculatedEMF}
                    isRunning={isCellRunning}
                  />
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setIsCellRunning(!isCellRunning);
                      }}
                      className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isCellRunning ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
                      }`}
                    >
                      {isCellRunning ? 'Pause Cell Action' : 'Activate Cell'}
                    </button>
                  </div>
                </div>

                {/* Electrode Selector Controls */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Cell Configuration</h4>

                  <div>
                    <label className="text-xs font-semibold text-red-400 block mb-2">Anode Metal (Oxidation -)</label>
                    <select
                      value={anodeMetal}
                      onChange={(e) => {
                        audioManager.play('pop');
                        setAnodeMetal(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      {Object.keys(metalPotentials).map((m) => (
                        <option key={m} value={m}>{m} (E° = {metalPotentials[m]} V)</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-emerald-400 block mb-2">Cathode Metal (Reduction +)</label>
                    <select
                      value={cathodeMetal}
                      onChange={(e) => {
                        audioManager.play('pop');
                        setCathodeMetal(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    >
                      {Object.keys(metalPotentials).map((m) => (
                        <option key={m} value={m}>{m} (E° = {metalPotentials[m]} V)</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>E° Cathode:</span>
                      <span className="font-mono text-emerald-400">{metalPotentials[cathodeMetal]} V</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>E° Anode:</span>
                      <span className="font-mono text-red-400">{metalPotentials[anodeMetal]} V</span>
                    </div>
                    <div className="h-px bg-slate-800 my-1" />
                    <div className="flex justify-between font-bold text-white text-sm">
                      <span>E° Cell EMF:</span>
                      <span className="font-mono text-cyan-400">{calculatedEMF.toFixed(2)} V</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-2">
                      {calculatedEMF > 0
                        ? '✓ Spontaneous Galvanic Cell (ΔG° < 0)'
                        : '⚠️ Non-spontaneous (Requires external voltage)'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div>
                        <span className="text-xs font-mono text-cyan-400 block">Compound Formula</span>
                        <h3 className="text-2xl font-bold text-white">{compoundDetails[selectedCompound].formula}</h3>
                      </div>
                      <span className="text-xs px-3 py-1 bg-cyan-950 text-cyan-300 rounded-full border border-cyan-700">
                        {compoundDetails[selectedCompound].name}
                      </span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-300">
                          Target Oxidation State ({compoundDetails[selectedCompound].targetElem}):
                        </span>
                        <span className="text-xl font-mono font-bold text-emerald-400">
                          {compoundDetails[selectedCompound].oxState}
                        </span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-cyan-200 border border-slate-800">
                        {compoundDetails[selectedCompound].breakDown}
                      </div>
                    </div>

                    {/* Interactive Rule Guide */}
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                      <h4 className="font-bold text-white">ISC Rules for Oxidation Numbers:</h4>
                      <ul className="list-disc list-inside space-y-1 text-slate-400">
                        <li>Free elements in elementary state have oxidation state of ZERO (e.g. O₂, P₄, S₈ = 0).</li>
                        <li>Fluorine is ALWAYS -1 in all its compounds due to highest electronegativity.</li>
                        <li>Hydrogen is +1 with non-metals, but -1 in metallic hydrides (e.g. NaH, CaH₂).</li>
                        <li>Oxygen is -2 in standard oxides, -1 in peroxides (H₂O₂), -1/2 in superoxides (KO₂), and +2 in OF₂.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Select Species</h4>
                  <div className="space-y-2">
                    {Object.keys(compoundDetails).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          audioManager.play('pop');
                          setSelectedCompound(key);
                        }}
                        className={`w-full p-3 rounded-xl text-left text-xs transition-all border ${
                          selectedCompound === key
                            ? 'bg-cyan-950 border-cyan-400 text-white font-bold'
                            : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-mono text-sm text-cyan-300">{compoundDetails[key].formula}</div>
                        <div className="text-[10px] text-slate-400">{compoundDetails[key].name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Ion-Electron (Half-Reaction) Balancer Workstation</h3>
                    <p className="text-xs text-slate-400">Step-by-step systemic method in acidic and basic media</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedMedium('acidic');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        selectedMedium === 'acidic' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Acidic Medium (H⁺)
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedMedium('basic');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                        selectedMedium === 'basic' ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Basic Medium (OH⁻)
                    </button>
                  </div>
                </div>

                {/* Steps Visualizer */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {[
                    { step: 1, title: 'Separate Half-Rxns', desc: 'Identify oxidation & reduction half-reactions' },
                    { step: 2, title: 'Balance Atoms & O/H', desc: selectedMedium === 'acidic' ? 'Add H₂O for O, H⁺ for H' : 'Add H₂O and OH⁻' },
                    { step: 3, title: 'Balance Charge (e⁻)', desc: 'Add electrons to offset charges' },
                    { step: 4, title: 'Combine & Cancel', desc: 'Equalize e⁻ transfer and sum' }
                  ].map((s) => (
                    <button
                      key={s.step}
                      onClick={() => {
                        audioManager.play('whoosh');
                        setBalancerStep(s.step);
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        balancerStep === s.step
                          ? 'bg-cyan-950 border-cyan-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">Step 0{s.step}</span>
                      <h4 className="text-xs font-bold text-white mb-1">{s.title}</h4>
                      <p className="text-[11px] text-slate-400">{s.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Step Demonstration */}
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-cyan-300">
                    Reaction Demonstration: Fe²⁺ + MnO₄⁻ → Fe³⁺ + Mn²⁺ ({selectedMedium} medium)
                  </h4>

                  {balancerStep === 1 && (
                    <div className="space-y-2 text-xs font-mono text-slate-300">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        Oxidation Half-Reaction: Fe²⁺ → Fe³⁺ + e⁻
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        Reduction Half-Reaction: MnO₄⁻ → Mn²⁺
                      </div>
                    </div>
                  )}

                  {balancerStep === 2 && (
                    <div className="space-y-2 text-xs font-mono text-slate-300">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        Oxidation: Fe²⁺ → Fe³⁺ (Atoms balanced)
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        Reduction ({selectedMedium}): {selectedMedium === 'acidic' ? 'MnO₄⁻ + 8H⁺ → Mn²⁺ + 4H₂O' : 'MnO₄⁻ + 4H₂O → MnO₂ + 4OH⁻'}
                      </div>
                    </div>
                  )}

                  {balancerStep === 3 && (
                    <div className="space-y-2 text-xs font-mono text-slate-300">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        Oxidation (×5): 5 Fe²⁺ → 5 Fe³⁺ + 5 e⁻
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        Reduction (×1): MnO₄⁻ + 8H⁺ + 5 e⁻ → Mn²⁺ + 4H₂O
                      </div>
                    </div>
                  )}

                  {balancerStep === 4 && (
                    <div className="p-4 bg-emerald-950/40 rounded-lg border border-emerald-500/40 font-mono text-xs text-emerald-200">
                      <span className="font-bold block mb-1">Final Net Balanced Ionic Equation:</span>
                      MnO₄⁻(aq) + 5Fe²⁺(aq) + 8H⁺(aq) → Mn²⁺(aq) + 5Fe³⁺(aq) + 4H₂O(l)
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <ElectrochemicalSeriesDiagram selectedMetal={dippedMetal} />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Displacement Experiment</h4>

                  <div>
                    <label className="text-xs font-semibold text-cyan-300 block mb-1">Insert Metal Strip</label>
                    <select
                      value={dippedMetal}
                      onChange={(e) => {
                        audioManager.play('pickup');
                        setDippedMetal(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      {['Li', 'Mg', 'Al', 'Zn', 'Fe', 'Cu', 'Ag'].map((m) => (
                        <option key={m} value={m}>{m} Metal Strip</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-cyan-300 block mb-1">Beaker Solution</label>
                    <select
                      value={solutionSalt}
                      onChange={(e) => {
                        audioManager.play('pickup');
                        setSolutionSalt(e.target.value);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                    >
                      {['CuSO4', 'AgNO3', 'ZnSO4', 'FeSO4'].map((s) => (
                        <option key={s} value={s}>{s} Solution</option>
                      ))}
                    </select>
                  </div>

                  <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                    displacementResult.spontaneous ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}>
                    <span className="font-bold block uppercase tracking-wider">Experimental Observation:</span>
                    <p>{displacementResult.text}</p>
                    <div className="font-mono text-[11px] text-cyan-300">
                      ΔE° Reaction = {displacementResult.deltaE} V
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <RedoxTitrationDiagram
                    buretVolume={buretVolumeDelivered}
                    isTitrating={isTitrating}
                    endpointReached={titrationEndpointReached}
                  />
                  <div className="flex items-center justify-center space-x-4">
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setIsTitrating(!isTitrating);
                      }}
                      className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        isTitrating ? 'bg-amber-500 text-slate-950' : 'bg-cyan-500 text-slate-950'
                      }`}
                    >
                      {isTitrating ? 'Pause Dropwise Addition' : 'Start KMnO₄ Titration'}
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('whoosh');
                        setBuretVolumeDelivered(0);
                        setIsTitrating(false);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      Reset Buret
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white border-b border-slate-800 pb-2">Titration Metrics</h4>

                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-400">Buret Reading:</span>
                      <span className="text-cyan-400 font-bold">{buretVolumeDelivered.toFixed(1)} mL</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-400">Analyte Solution:</span>
                      <span className="text-white">25.0 mL Fe²⁺ (0.10 M)</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-400">Titrant KMnO₄:</span>
                      <span className="text-purple-400">0.020 M Standard</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                      <span className="text-slate-400">Equivalence Vol:</span>
                      <span className="text-emerald-400 font-bold">25.0 mL</span>
                    </div>
                  </div>

                  {titrationEndpointReached && (
                    <div className="p-3 bg-pink-950/60 border border-pink-500/50 rounded-xl text-pink-200 text-xs space-y-1">
                      <span className="font-bold block text-pink-400">🎯 Equivalence Endpoint Reached!</span>
                      <p>1 MnO₄⁻ oxidises exactly 5 Fe²⁺ ions. The solution retains a faint permanent pink tint.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
                <span className="text-emerald-400">👁️</span>
                <span>Laboratory Observation & Data Analysis</span>
              </h3>

              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
                  <h4 className="text-sm font-semibold text-emerald-300">{obs.question}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => {
                      const isSelected = observationAnswers[oIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            audioManager.play('pop');
                            setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          }}
                          className={`p-3 rounded-lg text-left text-xs transition-all border ${
                            isSelected
                              ? 'bg-emerald-950 border-emerald-400 text-white font-bold'
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-300'
                          }`}
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
        )}

        {/* TAB 3: CHALLENGES & DIAGNOSTICS */}
        {activeTab === 'challenges' && currentChallenge && (
          <div className="space-y-6">
            {/* Challenge Progress Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  currentChallenge.difficulty === 'advanced'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {currentChallenge.difficulty} • {currentChallenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
              </div>

              {/* Step indicator */}
              <div className="flex items-center space-x-1">
                {CHALLENGES.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      completedChallenges.has(ch.id)
                        ? 'bg-emerald-400'
                        : idx === currentChallengeIndex
                        ? 'bg-cyan-400 ring-2 ring-cyan-400/50'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Subtopic Node: {currentChallenge.nodeId}</span>
                <h3 className="text-lg font-bold text-white leading-relaxed">{currentChallenge.question}</h3>
              </div>

              {/* Question Inputs */}
              {currentChallenge.type === 'numeric' ? (
                <div className="space-y-3 max-w-xs">
                  <label className="text-xs text-slate-400 block font-semibold">Enter Numerical Answer:</label>
                  <input
                    type="number"
                    step="any"
                    disabled={isAnswerSubmitted}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Type value..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options?.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => {
                          audioManager.play('pop');
                          setSelectedOption(idx);
                        }}
                        className={`p-4 rounded-xl text-left text-sm transition-all border ${
                          isAnswerSubmitted
                            ? idx === currentChallenge.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold'
                              : isSelected
                              ? 'bg-red-950/60 border-red-500 text-red-200'
                              : 'bg-slate-800/40 border-slate-800 text-slate-400'
                            : isSelected
                            ? 'bg-cyan-950 border-cyan-400 text-white'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Submit & Navigation Buttons */}
              <div className="flex items-center space-x-4 border-t border-slate-800 pt-4">
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={currentChallenge.type === 'numeric' ? !numericInput.trim() : selectedOption === null}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Next Challenge →
                  </button>
                )}

                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setCurrentHintText(`Hint 1: ${currentChallenge.hints[0]}`);
                    setShowHintBubble(true);
                  }}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700"
                >
                  Need Hint?
                </button>
              </div>

              {/* Feedback Explanation */}
              {isAnswerSubmitted && (
                <div className={`p-4 rounded-xl border text-sm space-y-2 ${
                  isCorrect ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border-red-500/40 text-red-200'
                }`}>
                  <span className="font-bold block uppercase tracking-wider text-xs">
                    {isCorrect ? '✓ Correct Explanation:' : '✕ Explanation & Solution:'}
                  </span>
                  <p className="text-xs leading-relaxed">{currentChallenge.explanation}</p>

                  {currentChallenge.misconceptionIndex !== undefined && (
                    <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] text-amber-300 space-y-1">
                      <span className="font-bold text-amber-400 block">Common Misconception Warning:</span>
                      <p>{MISCONCEPTIONS[currentChallenge.misconceptionIndex]?.correction}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL WORLD APPLICATION */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏭</span>
                <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Engineering Calculation Protocol:</h4>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-3 text-xs text-slate-200">
                    <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </span>
                    <p className="pt-0.5 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Remediation Suite */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                ISC Concept Master List & Misconception Remediation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-400">{m.topic}</span>
                      <span className="text-[10px] font-mono text-slate-500">{m.nodeId}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white">{m.title}</h4>
                    <p className="text-[11px] text-red-300 bg-red-950/30 p-2 rounded border border-red-500/20">
                      <strong>Misconception:</strong> {m.misconception}
                    </p>
                    <p className="text-[11px] text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-500/20">
                      <strong>Correction:</strong> {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comprehensive Mastery Analytics */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white">BKT Knowledge Mastery Profile</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktMap[nodeId] || createBKTState(nodeId);
                  const level = getMasteryLevel(bkt);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 block">{nodeId}</span>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-white">
                          {(bkt.pKnown * 100).toFixed(0)}%
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          level === 'mastered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {level}
                        </span>
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
}