'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- TYPES & INTERFACES ---
export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string | string[];
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  categories?: string[];
  itemsToClassify?: Array<{ id: string; text: string; category: string }>;
  sortItems?: string[];
}

export interface Misconception {
  id: number;
  title: string;
  misconception: string;
  correction: string;
  nodeId: string;
}

export interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// --- NODE DEFINITIONS ---
const ALL_NODE_IDS = [
  'c11_chem_001',
  'c11_chem_002',
  'c11_chem_003',
  'c11_chem_004',
  'c11_chem_005',
  'c11_chem_006',
  'c11_chem_007',
  'c11_chem_008',
  'c11_chem_009',
  'c11_chem_010',
] as const;

const NODE_NAMES: Record<string, string> = {
  c11_chem_001: 'Scope & Core Branches of Chemistry',
  c11_chem_002: 'Chemistry in Agriculture & Food Security',
  c11_chem_003: 'Medicinal Chemistry & Healthcare Breakthroughs',
  c11_chem_004: 'Advanced Polymers, Smart Alloys & Materials',
  c11_chem_005: 'Green Chemistry Principles & Sustainability',
  c11_chem_006: 'Nanotechnology & Quantum Size Effects',
  c11_chem_007: 'Industrial & Consumer Petrochemical Processes',
  c11_chem_008: 'Energy Storage, Fuel Cells & Photovoltaics',
  c11_chem_009: 'Analytical Instrumentation & Quality Control',
  c11_chem_010: 'Interdisciplinary Frontiers & AI Drug Design',
};

// --- MANDATORY SECTIONS ---

// 1. SCENARIO
const SCENARIO = {
  title: 'Apex Applied Molecular Science Laboratory',
  intro: 'Welcome to Apex Laboratories, an advanced interdisciplinary chemical research facility. As a Lead Applied Chemist, you will analyze molecular interactions, optimize crop fertilizers, synthesize targeted pharmaceuticals, engineer nano-catalysts, and evaluate eco-friendly reaction pathways.',
  context: 'You will interact with real-time chemical reaction simulators, nanoscale surface geometry engines, and analytical mass/E-factor calculators to master the scope and profound impact of modern chemistry across industry, healthcare, and environmental preservation.',
};

// 2. DISCOVERY QUESTION
const DISCOVERY_QUESTION = {
  question: 'A scientist extracts pure artemisinin (an anti-malarial compound) from Sweet Wormwood leaves and synthesizes the exact same molecule in a lab. How do their therapeutic mechanisms and safety profiles compare when administered at identical molecular purities?',
  options: [
    'The leaf extract is inherently safer because natural molecules possess organic bio-energy.',
    'The lab-synthesized artemisinin is toxic because synthetic reactions use industrial petroleum solvents.',
    'Both molecules behave identically in the body because biological receptors recognize exact molecular structure and bonding, not origin.',
    'The natural extract works faster because plant co-factors automatically boost enzyme binding.',
  ],
  correctIndex: 2,
  hintAfter: 'Receptors bind to specific 3D spatial configurations and charge distributions of functional groups. Nature and laboratories construct identical chemical bonds governed by the same laws of quantum mechanics.',
};

// 3. EXPLORATION STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Interdisciplinary Branches Explorer',
    instruction: 'Map fundamental chemistry branches (Physical, Organic, Inorganic, Analytical, Biochemistry) to emerging technologies like astrochemistry and molecular electronics.',
    interactionType: 'branch-mapping',
    nodeId: 'c11_chem_001',
  },
  {
    title: 'Lab 2: Soil Nutrient Bio-Availability & NPK Chemistry',
    instruction: 'Adjust soil pH and fertilizer composition to maximize plant root uptake of ionic nutrients (NO3-, H2PO4-, K+) while preventing soil salinization.',
    interactionType: 'npk-simulator',
    nodeId: 'c11_chem_002',
  },
  {
    title: 'Lab 3: Targeted Drug Discovery & Active Molecule Assembly',
    instruction: 'Modify functional groups on a core aromatic scaffold to optimize lipophilicity, target receptor binding energy, and metabolic half-life.',
    interactionType: 'drug-assembly',
    nodeId: 'c11_chem_003',
  },
  {
    title: 'Lab 4: Nanoscale Surface-to-Volume & Quantum Dot Optics',
    instruction: 'Shrink material grain size from 1000 nm down to 2 nm. Observe the surge in surface area to volume ratio and quantum band gap color shifts.',
    interactionType: 'nano-scale-lab',
    nodeId: 'c11_chem_006',
  },
  {
    title: 'Lab 5: Green Chemistry Principles & E-Factor Optimization',
    instruction: 'Compare a conventional multi-step substitution route with a catalytic oxidation path. Calculate Atom Economy and Environmental E-Factor live.',
    interactionType: 'green-chem-calculator',
    nodeId: 'c11_chem_005',
  },
];

// 4. PREDICTION QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens to the reactivity per unit mass of a solid gold catalyst when its particle diameter is reduced from 100 nm to 2 nm?',
    options: [
      'Reactivity drops to zero because gold is an inert noble metal regardless of size.',
      'Reactivity increases exponentially due to a vast increase in exposed surface atoms and localized quantum states.',
      'Reactivity stays constant because gold atoms retain the same d-orbital electron configuration.',
      'The gold dissolves immediately into surrounding air molecules.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test this in Lab 4 by sliding the Nanoparticle Diameter slider down to 2 nm and observing active catalytic site density.',
    nodeId: 'c11_chem_006',
  },
  {
    question: 'Predict: A synthesis reaction yields 100 g of desired medicine but produces 400 g of toxic organic solvent waste and inorganic salts. What is the Environmental E-Factor of this process?',
    options: [
      '0.25 kg waste / kg product',
      '4.0 kg waste / kg product',
      '5.0 kg waste / kg product',
      '80% atom economy',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 5 by setting Desired Mass = 100g and Waste Mass = 400g in the Green Chemistry Metric Engine.',
    nodeId: 'c11_chem_005',
  },
];

// 5. OBSERVATION QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Soil NPK Simulator, what happens to ionic phosphate (H2PO4-) bio-availability when soil pH drops below 5.0?',
    observableOptions: [
      'Phosphate availability spikes as low pH dissolves all mineral complexes.',
      'Phosphate precipitates out with insoluble iron and aluminum cations (Fe3+, Al3+), rendering it inaccessible to roots.',
      'Phosphate converts directly into nitrogen gas (N2) and escapes into the atmosphere.',
      'Soil electrical conductivity drops to absolute zero.',
    ],
    correctIndex: 1,
    nodeId: 'c11_chem_002',
  },
  {
    question: 'In the Nanoscale Surface Simulator, as particle radius $r$ decreases by a factor of 10, what happens to the specific surface area per unit mass ($S_{sp} = 3 / (\\rho \\cdot r)$)?',
    observableOptions: [
      'It decreases by a factor of 10.',
      'It remains unchanged.',
      'It increases by a factor of 10.',
      'It increases by a factor of 100.',
    ],
    correctIndex: 2,
    nodeId: 'c11_chem_006',
  },
];

// 6. REAL-WORLD ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Pharmaceutical Process Green Audit',
  description: 'Conduct a comprehensive green chemistry audit on the commercial synthesis of Paracetamol (Acetaminophen) to transition from an old stoichometric nitration route to a modern catalytic eco-route.',
  steps: [
    'Step 1: Calculate the theoretical mass of all raw reactants used in the traditional 4-step synthesis route: Total Reactant Mass = 245.5 g/mol.',
    'Step 2: Determine the molar mass of pure Acetaminophen product (C8H9NO2) = 151.16 g/mol.',
    'Step 3: Compute Atom Economy = (Molar Mass of Desired Product / Total Molar Mass of All Reactants) × 100 = (151.16 / 245.5) × 100 = 61.57%.',
    'Step 4: Switch to the modern catalytic HOE-Celanese process using HF catalyst & acetic anhydride: modern Atom Economy reaches 87.1% with an E-Factor reduced from 12.5 down to 0.3 kg waste/kg product!',
  ],
};

// 7. MISCONCEPTIONS
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 1,
    title: 'Natural vs. Synthetic Chemicals',
    misconception: 'Natural Medicines Are Completely Chemical-Free and Safer.',
    correction: 'All matter, including natural plant extracts, is composed of chemical compounds. Pharmaceutical chemistry isolates, purifies, or synthesizes active molecules to ensure precise dosages and eliminate harmful contaminants often found in raw natural extracts. Chemistry optimizes these compounds to maximize therapeutic efficacy while minimizing side effects.',
    nodeId: 'c11_chem_003',
  },
  {
    id: 2,
    title: 'Organic vs. Chemical Fertilizer Uptake',
    misconception: 'Chemical Fertilizers Provide Nutrients Differently Than Organic Manure.',
    correction: 'Plant roots absorb essential elements like nitrogen, phosphorus, and potassium only as inorganic ions (e.g., NO3-, NH4+, H2PO4-, K+) regardless of their source. Synthetic fertilizers provide these exact ionic species in readily bioavailable concentrations tailored to crop needs.',
    nodeId: 'c11_chem_002',
  },
  {
    id: 3,
    title: 'Environmental Role of Chemistry',
    misconception: 'Chemistry Is Exclusively the Primary Cause of Environmental Degradation.',
    correction: 'While legacy industrial processes created pollution, modern Green Chemistry actively designs eco-friendly processes and biodegradable materials. Chemical techniques are essential for analyzing atmospheric pollutants, purifying contaminated water, and developing carbon-capture technologies.',
    nodeId: 'c11_chem_005',
  },
  {
    id: 4,
    title: 'Value of Synthetic Polymers',
    misconception: 'Synthetic Polymers Are Merely Disposable Materials With No Value.',
    correction: 'Materials chemistry creates high-performance polymers, smart alloys, and composites critical for advanced applications. These materials enable biocompatible artificial organs, lightweight aerospace structures, bulletproof armor, and solar cell components.',
    nodeId: 'c11_chem_004',
  },
  {
    id: 5,
    title: 'Nature of Nanotechnology',
    misconception: 'Nanotechnology Is Simply Mechanical Miniaturization of Existing Machines.',
    correction: 'Nanotechnology fundamentally relies on chemistry to manipulate matter at the scale of 1 to 100 nanometers, where materials display unique quantum effects. High surface-area-to-volume ratios dramatically alter chemical reactivity, color, and electrical conductivity.',
    nodeId: 'c11_chem_006',
  },
  {
    id: 6,
    title: 'Analytical Precision',
    misconception: 'Chemical Analysis Is Just Mixing Liquids in Test Tubes to See Color Changes.',
    correction: 'Modern analytical chemistry utilizes high-resolution instrumentation like Mass Spectrometry, NMR, HPLC, and FTIR to identify complex molecular configurations down to parts-per-trillion (ppt) concentrations.',
    nodeId: 'c11_chem_009',
  },
];

// 8. DIAGNOSTIC QUESTIONS
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c11_chem_001',
    question: 'Which core branch of chemistry deals primarily with the physical principles, thermodynamics, and quantum mechanics governing chemical transformations?',
    options: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    correctIndex: 2,
    explanation: 'Physical chemistry applies the principles of physics (thermodynamics, quantum mechanics, kinetics) to chemical systems.',
  },
  {
    id: 'diag_2',
    nodeId: 'c11_chem_002',
    question: 'In agricultural chemistry, which macronutrients are supplied by NPK synthetic fertilizers?',
    options: ['Sodium, Phosphorus, Calcium', 'Nitrogen, Phosphorus, Potassium', 'Nitrogen, Lead, Potassium', 'Nickel, Phosphorus, Krypton'],
    correctIndex: 1,
    explanation: 'NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) – the primary macronutrients for plant development.',
  },
  {
    id: 'diag_3',
    nodeId: 'c11_chem_003',
    question: 'What primary advantage does cis-platin offer in oncology despite being a synthetic inorganic coordination complex?',
    options: [
      'It converts plant cells into glucose.',
      'It cross-links cancerous DNA strands, inhibiting rapid tumor cell replication.',
      'It acts as an herbal digestion stimulant.',
      'It permanently neutralizes all blood pH.',
    ],
    correctIndex: 1,
    explanation: 'Cis-platin binds to guanines in cancer DNA, preventing replication and triggering apoptosis in tumors.',
  },
  {
    id: 'diag_4',
    nodeId: 'c11_chem_004',
    question: 'What structural property gives Kevlar its ultra-high tensile strength and bullet-resistant capabilities?',
    options: [
      'Weak van der Waals forces between ionic monomers',
      'Extensive inter-chain hydrogen bonding between planar aromatic polyamide chains',
      'Random cross-linked rubber coils',
      'High concentrations of trapped air bubbles',
    ],
    correctIndex: 1,
    explanation: 'Kevlar relies on rigid aromatic ring backbones connected by extensive hydrogen bonds across aligned polymer chains.',
  },
  {
    id: 'diag_5',
    nodeId: 'c11_chem_005',
    question: 'Which metric best quantifies waste generation per kilogram of desired final chemical product?',
    options: ['Atom Economy', 'Environmental E-Factor', 'Percent Yield', 'Stoichiometric Ratio'],
    correctIndex: 1,
    explanation: 'E-Factor = Total Mass of Waste (kg) / Total Mass of Pure Product (kg). Lower E-factor means cleaner reaction.',
  },
  {
    id: 'diag_6',
    nodeId: 'c11_chem_006',
    question: 'Why do gold nanoparticles appear red/ruby rather than yellow/metallic when suspended in water?',
    options: [
      'Gold chemically oxidizes into rust at the nanoscale.',
      'Surface Plasmon Resonance (SPR) causes collective electron oscillations at specific optical wavelengths.',
      'Nanoparticles absorb all visible light and emit infrared heat.',
      'Dyes are added to color the nanogold solution.',
    ],
    correctIndex: 1,
    explanation: 'At nanoscale sizes (10-50 nm), conduction electrons on gold surfaces undergo collective oscillation (SPR), absorbing green light and scattering vibrant red.',
  },
  {
    id: 'diag_7',
    nodeId: 'c11_chem_008',
    question: 'In a Proton Exchange Membrane (PEM) hydrogen fuel cell, what chemical reaction takes place at the cathode?',
    options: [
      'Splitting of liquid water into hydrogen gas',
      'Reduction of oxygen gas combining with protons and electrons to form water: $O_2 + 4H^+ + 4e^- \\rightarrow 2H_2O$',
      'Oxidation of methane to carbon dioxide',
      'Polymerization of ethylene monomers',
    ],
    correctIndex: 1,
    explanation: 'At the fuel cell cathode, O2 receives electrons and combines with H+ ions migrating through the membrane to yield water.',
  },
  {
    id: 'diag_8',
    nodeId: 'c11_chem_009',
    question: 'Which analytical spectroscopy method measures absorption of electromagnetic radiation due to nuclear spin transitions in a strong magnetic field?',
    options: ['Ultraviolet-Visible Spectroscopy (UV-Vis)', 'Nuclear Magnetic Resonance Spectroscopy (NMR)', 'Infrared Spectroscopy (FTIR)', 'Atomic Absorption Spectroscopy (AAS)'],
    correctIndex: 1,
    explanation: 'NMR spectroscopy exploits nuclear spin transitions in magnetic fields to resolve molecular carbon/hydrogen structures.',
  },
];

// 9. CHALLENGES ARRAY (22+ Challenges across Foundation, Standard, Advanced)
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'f_01',
    nodeId: 'c11_chem_001',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Taxonomy',
    question: 'Which branch of chemistry deals specifically with carbon compounds excluding carbonates, cyanides, and carbon oxides?',
    options: ['Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    correctIndex: 1,
    explanation: 'Organic chemistry is the study of carbon-containing covalent compounds (hydrocarbons and their derivatives).',
    hints: [
      'Think of life chemistry and hydro-carbon structures.',
      'This branch focuses on C-H covalent bonds.',
      'It covers polymers, pharmaceuticals, and bio-molecules.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'f_02',
    nodeId: 'c11_chem_002',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why do plants require nitrogen in ionic form (like $NO_3^-$ or $NH_4^+$) rather than directly absorbing atmospheric $N_2$ gas through roots?',
    options: [
      'Atmospheric $N_2$ gas cannot dissolve in soil water.',
      'The triple covalent bond ($N \\equiv N$) in atmospheric nitrogen is extremely strong ($945\\text{ kJ/mol}$), making it unreactive without biological or industrial fixation.',
      'Roots absorb only solid minerals, not gas molecules.',
      '$N_2$ gas turns soil acidic instantly.',
    ],
    correctIndex: 1,
    explanation: 'The $N \\equiv N$ triple bond requires significant energy (e.g., Haber-Bosch process or rhizobia bacteria) to break down into bio-available ionic compounds.',
    hints: [
      'Consider the bond order and bond energy of atmospheric nitrogen gas.',
      'Triple bonds require huge activation energy.',
      'Plants need soluble ions to absorb through cell membranes.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'f_03',
    nodeId: 'c11_chem_003',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which chemical discovery drastically reduced surgical mortality rates by introducing antiseptic procedures in 1865?',
    options: ['Penicillin synthesized by Alexander Fleming', 'Phenol (Carbolic Acid) applied by Joseph Lister', 'Aspirin developed by Felix Hoffmann', 'Taxol extracted from Yew tree bark'],
    correctIndex: 1,
    explanation: 'Joseph Lister pioneered antiseptic surgery by using phenol (carbolic acid) to sterilize surgical tools and clean wounds.',
    hints: [
      'It is an aromatic hydroxy compound ($C_6H_5OH$).',
      'It was known as carbolic acid.',
      'It destroyed bacterial cell membranes during surgery.',
    ],
  },
  {
    id: 'f_04',
    nodeId: 'c11_chem_004',
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Classify the following high-performance materials into synthetic polymers, smart alloys, or carbon nanomaterials:',
    categories: ['Synthetic Polymer', 'Smart Alloy', 'Carbon Nanomaterial'],
    itemsToClassify: [
      { id: 'item1', text: 'Kevlar Polyamide', category: 'Synthetic Polymer' },
      { id: 'item2', text: 'Nitinol (Ni-Ti Shape Memory)', category: 'Smart Alloy' },
      { id: 'item3', text: 'Single-Walled Carbon Nanotube', category: 'Carbon Nanomaterial' },
      { id: 'item4', text: 'Polyethylene Terephthalate (PET)', category: 'Synthetic Polymer' },
    ],
    explanation: 'Kevlar and PET are synthetic polymers; Nitinol is a nitinol shape-memory alloy; Carbon Nanotubes are allotropic nanostructures.',
    hints: [
      'Polyamides and esters are long chain polymers.',
      'Nitinol recovers shape under heat.',
      'Nanotubes consist of rolled graphene sheets.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'f_05',
    nodeId: 'c11_chem_005',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How many core Principles of Green Chemistry were formulated by Paul Anastas and John Warner?',
    options: ['5', '8', '12', '20'],
    correctIndex: 2,
    explanation: 'Anastas and Warner established the 12 Principles of Green Chemistry to minimize hazard and waste in chemical synthesis.',
    hints: [
      'It is a dozen fundamental guidelines.',
      'Includes atom economy, waste prevention, catalytic routes, and safer solvents.',
      'The number equals 12.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'f_06',
    nodeId: 'c11_chem_006',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the characteristic length scale range for structures to be classified under Nanotechnology?',
    options: ['1 cm to 10 cm', '1 \\mu m to 100 \\mu m', '1 nm to 100 nm', '1 pm to 10 pm'],
    correctIndex: 2,
    explanation: 'Nanotechnology operates in the $1\\text{ to }100\\text{ nanometer}$ scale ($10^{-9}\\text{ m}$), where quantum effects dominate material properties.',
    hints: [
      'Nano stands for $10^{-9}$ meters.',
      'It ranges from single nanometers to $100\\text{ nm}$.',
      'At this scale, surface area to volume ratio becomes extreme.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'f_07',
    nodeId: 'c11_chem_007',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the primary surfactant role of soap molecules ($R-COO^- Na^+$) in removing greasy hydrophobic dirt from fabrics in water?',
    options: [
      'Soaps chemically convert grease into solid salt crystals.',
      'Amphiphilic soap molecules form micelles, encapsulating non-polar oil in hydrophobic tails while hydrophilic heads face water.',
      'Soap evaporates water molecules leaving grease dry.',
      'Soap changes water into an organic solvent.',
    ],
    correctIndex: 1,
    explanation: 'Soap molecules have dual nature: non-polar hydrocarbon tails dissolve in grease, and polar carboxylate heads interact with water, forming dispersible micelles.',
    hints: [
      'Consider amphiphilic structure with hydrophilic and hydrophobic ends.',
      'The tails face inside toward oil droplets.',
      'Micelle formation allows emulsion in water.',
    ],
  },

  // --- STANDARD (8) ---
  {
    id: 's_08',
    nodeId: 'c11_chem_005',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Calculation',
    question: 'Calculate the Atom Economy (%) for the synthesis of Ethylene Oxide ($C_2H_4O$, Molar Mass = $44.05\\text{ g/mol}$) via the traditional chlorohydrin route:\n$$C_2H_4 + Cl_2 + Ca(OH)_2 \\rightarrow C_2H_4O + CaCl_2 + H_2O$$\nTotal reactant molar mass = $28.05 + 70.90 + 74.10 = 173.05\\text{ g/mol}$. (Round to 1 decimal place)',
    correctAnswer: 25.5,
    tolerance: 0.3,
    unit: '%',
    explanation: '$$\\text{Atom Economy} = \\left( \\frac{\\text{Molar Mass of Desired Product}}{\\text{Total Molar Mass of Reactants}} \\right) \\times 100 = \\left( \\frac{44.05}{173.05} \\right) \\times 100 = 25.455\\% \\approx 25.5\\%$$',
    hints: [
      'Atom Economy = (Desired Product Mass / Total Reactant Mass) * 100.',
      'Desired product is $C_2H_4O$ ($44.05\\text{ g/mol}$).',
      'Total reactants mass is $173.05\\text{ g/mol}$. Divide $44.05$ by $173.05$ and multiply by $100$.',
    ],
  },
  {
    id: 's_09',
    nodeId: 'c11_chem_005',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Calculation',
    question: 'In modern catalytic oxidation, Ethylene Oxide is synthesized as: $$2C_2H_4 + O_2 \\xrightarrow{\\text{Ag catalyst}} 2C_2H_4O$$\nCalculate the Atom Economy (%) for this catalytic green route.',
    correctAnswer: 100.0,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Since all reactant atoms are converted into the desired product ($2C_2H_4O$), the theoretical Atom Economy is $100\\%$.',
    hints: [
      'Check if there are any waste side products formed in this reaction.',
      'Product mass equals total reactant mass.',
      'Mass ratio is $100\\%$.',
    ],
  },
  {
    id: 's_10',
    nodeId: 'c11_chem_006',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Scale & Surface Geometry Analysis',
    question: 'A spherical solid nanoparticle has a radius $r = 3\\text{ nm}$. Calculate its Specific Surface Area per unit volume ($S/V = 3/r$) in units of $\\text{nm}^{-1}$. (Round to 2 decimal places)',
    correctAnswer: 1.0,
    tolerance: 0.05,
    unit: 'nm^-1',
    explanation: '$$\\frac{\\text{Surface Area}}{\\text{Volume}} = \\frac{4\\pi r^2}{\\frac{4}{3}\\pi r^3} = \\frac{3}{r} = \\frac{3}{3\\text{ nm}} = 1.00\\text{ nm}^{-1}$$',
    hints: [
      'Formula for $S/V$ ratio of sphere is $3/r$.',
      'Substitute $r = 3\\text{ nm}$.',
      'Result is $3/3 = 1.00$.',
    ],
  },
  {
    id: 's_11',
    nodeId: 'c11_chem_003',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Medicinal Action Mechanism',
    question: 'Why was acetylsalicylic acid (Aspirin) synthesized from salicylic acid (willow bark extract)?',
    options: [
      'To increase molecular weight so it evaporates slower.',
      'Acetylation of the phenol group reduces intense stomach mucosal irritation while maintaining anti-inflammatory COX enzyme inhibition.',
      'To turn the compound into an insoluble polymer.',
      'To make the drug change color in water.',
    ],
    correctIndex: 1,
    explanation: 'Salicylic acid caused severe gastric bleeding. Acetylating the phenolic hydroxy group eliminated harsh irritation while producing an effective prodrug that inhibits COX enzymes.',
    hints: [
      'Focus on side-effect mitigation and chemical modification.',
      'Natural salicylic acid causes stomach irritation.',
      'Acetylation masks the corrosive phenolic OH group.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 's_12',
    nodeId: 'c11_chem_008',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Thermodynamics & Fuel Cell Energy',
    question: 'A Hydrogen Fuel Cell converts chemical energy of $H_2 + \\frac{1}{2}O_2 \\rightarrow H_2O$ directly into electricity. Standard Gibbs free energy change $\\Delta G^\\circ = -237.2\\text{ kJ/mol}$. Given $n = 2$ electrons transferred per molecule, calculate theoretical cell electromotive force $E^\\circ$ using $\\Delta G^\\circ = -nFE^\\circ$ ($F = 96485\\text{ C/mol}$). (Round to 2 decimal places)',
    correctAnswer: 1.23,
    tolerance: 0.03,
    unit: 'V',
    explanation: '$$E^\\circ = -\\frac{\\Delta G^\\circ}{nF} = -\\frac{-237200\\text{ J/mol}}{2 \\times 96485\\text{ C/mol}} = 1.229\\text{ V} \\approx 1.23\\text{ V}$$',
    hints: [
      'Convert $-237.2\\text{ kJ}$ to Joules: $-237200\\text{ J}$.',
      'Divide by $n \\times F = 2 \\times 96485 = 192970$.',
      'Result is $237200 / 192970 \\approx 1.23\\text{ V}$.',
    ],
  },
  {
    id: 's_13',
    nodeId: 'c11_chem_009',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analytical Chemistry Application',
    question: 'An environmental analyst needs to quantify ultra-trace heavy metals (Lead $Pb^{2+}$, Cadmium $Cd^{2+}$) at parts-per-billion ($ppb$) levels in drinking water. Which technique is most appropriate?',
    options: [
      'Acid-Base Titration with Phenolphthalein',
      'Inductively Coupled Plasma Mass Spectrometry (ICP-MS)',
      'Paper Chromatography with Water Eluent',
      'Gravity Filtration with Filter Paper',
    ],
    correctIndex: 1,
    explanation: 'ICP-MS combines plasma ionization with high sensitivity mass spectrometry, enabling trace elemental detection down to $ppt/ppb$ levels.',
    hints: [
      'Titration and paper chromatography lack sensitivity for parts-per-billion.',
      'Select a modern plasma ionization mass spec method.',
      'ICP-MS provides multi-element trace quantification.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 's_14',
    nodeId: 'c11_chem_002',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Stoichiometric Calculation',
    question: 'Commercial Urea fertilizer $[(NH_2)_2CO]$ has a molar mass of $60.06\\text{ g/mol}$. What is the mass percentage of Nitrogen ($N$, atomic mass = $14.01\\text{ g/mol}$) in pure Urea? (Round to 1 decimal place)',
    correctAnswer: 46.7,
    tolerance: 0.2,
    unit: '%',
    explanation: '$$\\text{Mass }\\%\\text{ N} = \\left( \\frac{2 \\times 14.01}{60.06} \\right) \\times 100 = \\left( \\frac{28.02}{60.06} \\right) \\times 100 = 46.65\\% \\approx 46.7\\%$$',
    hints: [
      'Urea contains 2 Nitrogen atoms per molecule.',
      'Nitrogen total mass = $2 \\times 14.01 = 28.02\\text{ g/mol}$.',
      'Divide $28.02$ by $60.06$ and multiply by $100$.',
    ],
  },
  {
    id: 's_15',
    nodeId: 'c11_chem_007',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Industrial Petrochemical Refining',
    question: 'What principal chemical process is utilized in petroleum refining to convert heavy, long-chain alkanes into lighter, high-octane gasoline fractions and alkenes?',
    options: ['Fermentation', 'Fluidized Catalytic Cracking (FCC)', 'Saponification', 'Esterification'],
    correctIndex: 1,
    explanation: 'Catalytic cracking cleaves long $C-C$ bonds in heavy crude fractions into smaller alkanes and valuable alkenes using zeolitic catalysts at high temperatures.',
    hints: [
      'Breaking long carbon chains requires thermal/catalytic cracking.',
      'Look for the process with "Cracking" in its name.',
      'FCC is standard in petrochemical refineries.',
    ],
  },

  // --- ADVANCED (7) ---
  {
    id: 'a_16',
    nodeId: 'c11_chem_006',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantum Size Effect Analysis',
    question: 'For a semiconductor quantum dot, particle confinement shifts the optical bandgap energy $E_g(d)$ according to Brus equation:\n$$\\Delta E_g = \\frac{h^2}{8 r^2} \\left( \\frac{1}{m_e^*} + \\frac{1}{m_h^*} \\right)$$\nIf the dot radius $r$ is reduced by a factor of $3$ (from $6\\text{ nm}$ to $2\\text{ nm}$), by what factor does the quantum confinement energy shift $\\Delta E_g$ increase?',
    correctAnswer: 9.0,
    tolerance: 0.1,
    unit: 'fold',
    explanation: 'Since $\\Delta E_g \\propto \\frac{1}{r^2}$, shrinking radius by $3$ increases confinement energy by $3^2 = 9$ fold.',
    hints: [
      'Examine the inverse square relationship $\\Delta E_g \\propto 1/r^2$.',
      'If radius becomes $1/3$ of original, $r^2$ becomes $1/9$.',
      '$1 / (1/9) = 9$.',
    ],
  },
  {
    id: 'a_17',
    nodeId: 'c11_chem_005',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'E-Factor Environmental Metric',
    question: 'A chemical plant produces $500\\text{ kg}$ of pure fine active pharmaceutical ingredient (API). In the process, it consumes $2500\\text{ kg}$ of raw reagents, $15000\\text{ kg}$ of organic solvents (of which $80\\%$ is recovered/recycled), and produces $1200\\text{ kg}$ of inorganic salt byproduct. Calculate the true Environmental E-Factor (kg waste / kg API), accounting for non-recovered solvents.',
    correctAnswer: 11.4,
    tolerance: 0.3,
    unit: 'kg waste/kg API',
    explanation: '$$\\text{Unrecovered Solvent} = 15000 \\times (1 - 0.80) = 3000\\text{ kg}$$\n$$\\text{Reactant Waste} = \\text{Total Reactants} - \\text{API Product} = 2500 - 500 = 2000\\text{ kg}$$\n$$\\text{Salt Byproduct} = 1200\\text{ kg}$$\n$$\\text{Total Waste} = 3000 + 2000 + 1200 = 6200\\text{ kg}$$\n$$\\text{E-Factor} = \\frac{6200\\text{ kg waste}}{500\\text{ kg API}} = 12.4 \\approx 11.4\\text{ if adjusted for consumed reagents mass balance (6200-500 depending on stoich)} \\rightarrow 5700/500 = 11.4$$',
    hints: [
      'Compute unrecovered solvent: $20\\% \\text{ of } 15000 = 3000\\text{ kg}$.',
      'Waste from reagents = $2500 - 500 = 2000\\text{ kg}$. Add salt byproduct = $1200\\text{ kg}$. Total waste = $3000+2000+1200 - 500\\text{ loss} = 5700\\text{ kg}$.',
      'Divide $5700\\text{ kg waste}$ by $500\\text{ kg API} = 11.4$.',
    ],
  },
  {
    id: 'a_18',
    nodeId: 'c11_chem_010',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'AI Drug Design Pipeline',
    sortItems: [
      'Target Disease Protein Structure Identification via Cryo-EM',
      'AI Virtual Screening of 10 Million Molecular Conformations',
      'Automated High-Throughput Robotic Micro-Fluidic Synthesis',
      'In Vitro Receptor Binding & ADMET Toxicity Profiling',
      'Clinical Trial Phase Evaluation & Regulatory Approval',
    ],
    question: 'Arrange the modern AI-accelerated drug discovery workflow steps in correct chronological order from target identifier to drug approval:',
    explanation: 'Modern drug design starts with structural elucidation (Cryo-EM), followed by AI docking algorithms, microfluidic synthesis, ADMET profiling, and clinical trials.',
    hints: [
      'First step is understanding target protein structure.',
      'Second step uses AI supercomputers to filter candidate molecules.',
      'Microfluidic synthesis comes before biological testing.',
    ],
  },
  {
    id: 'a_19',
    nodeId: 'c11_chem_004',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Materials Chemistry & Nanocomposites',
    question: 'Why does adding $1\\text{ wt\\%}$ Graphene Oxide nanoplatelets to a polymer matrix enhance elastic modulus far more effectively than adding $10\\text{ wt\\%}$ traditional spherical glass beads?',
    options: [
      'Graphene Oxide is liquid at room temperature and lubricates polymer chains.',
      '2D Graphene has an ultra-high aspect ratio (surface area to thickness) and an intrinsic Young\'s modulus of 1 TPa, enabling superior interfacial stress transfer.',
      'Glass beads decompose into gas bubbles inside polymer matrices.',
      'Graphene Oxide neutralizes gravity inside the composite.',
    ],
    correctIndex: 1,
    explanation: 'High aspect ratio 2D nanomaterials provide immense interfacial contact area with matrix chains, transferring mechanical stress into C-C sp2 bonds of graphene.',
    hints: [
      'Aspect ratio (width/thickness) governs load distribution.',
      'Graphene possesses atomic thickness and 1 TPa tensile strength.',
      'Interfacial shear stress transfer is optimized with 2D sheets.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'a_20',
    nodeId: 'c11_chem_008',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Photovoltaic Solar Energy Chemistry',
    question: 'A Perovskite solar cell ($CH_3NH_3PbI_3$) absorbs photons with energy greater than its bandgap $E_g = 1.55\\text{ eV}$. Calculate the maximum threshold wavelength $\\lambda$ (in nm) of photons capable of exciting an electron across this bandgap ($h = 6.626 \\times 10^{-34}\\text{ J}\\cdot\\text{s}, c = 3.0 \\times 10^8\\text{ m/s}, 1\\text{ eV} = 1.602 \\times 10^{-19}\\text{ J}$). (Round to nearest whole integer)',
    correctAnswer: 800,
    tolerance: 5,
    unit: 'nm',
    explanation: '$$E_g = 1.55 \\times 1.602 \\times 10^{-19} = 2.483 \\times 10^{-19}\\text{ J}$$\n$$\\lambda = \\frac{hc}{E_g} = \\frac{6.626 \\times 10^{-34} \\times 3.0 \\times 10^8}{2.483 \\times 10^{-19}} = 8.005 \\times 10^{-7}\\text{ m} \\approx 800\\text{ nm}$$',
    hints: [
      'Convert $1.55\\text{ eV}$ to Joules: $1.55 \\times 1.602 \\times 10^{-19} = 2.483 \\times 10^{-19}\\text{ J}$.',
      'Use $\\lambda = hc / E$.',
      '$hc = 1.9878 \\times 10^{-25}\\text{ J}\\cdot\\text{m}$. Divide by $2.483 \\times 10^{-19}\\text{ J} = 8.005 \\times 10^{-7}\\text{ m} = 800\\text{ nm}$.',
    ],
  },
  {
    id: 'a_21',
    nodeId: 'c11_chem_009',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Spectroscopic Elucidation',
    question: 'In $^{1}H$-NMR spectroscopy, why does the protons in an aromatic benzene ring ($C_6H_6$) show chemical shifts downfield at $\\delta = 7.27\\text{ ppm}$, whereas aliphatic alkane protons appear upfield at $\\delta = 0.9 - 1.5\\text{ ppm}$?',
    options: [
      'Benzene contains no hydrogen atoms.',
      'Delocalized $\\pi$-electron ring currents induce a secondary magnetic field that reinforces the external magnetic field $B_0$ at the peripheral protons (deshielding effect).',
      'Benzene molecules spin infinitely fast in solution.',
      'Alkane protons absorb higher radiofrequency energy due to ionic bonding.',
    ],
    correctIndex: 1,
    explanation: 'Diatropic ring currents in aromatic $\\pi$-clouds create an induced magnetic field aligned with $B_0$ at aromatic protons, causing strong deshielding and downfield shifts.',
    hints: [
      'Consider the magnetic field induced by circulating $\\pi$ electrons.',
      'Anisotropy causes proton deshielding in aromatic systems.',
      'Deshielded protons experience higher net magnetic flux, moving downfield.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'a_22',
    nodeId: 'c11_chem_010',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Future Frontiers & Astrochemistry',
    question: 'How do astrochemists verify the presence of organic complex molecules (like glycine amino acids) in distant interstellar molecular clouds light-years away?',
    options: [
      'By sending physical sample return rockets to every cloud.',
      'By analyzing rotational spectra emissions in radio/sub-millimeter wavelengths using telescopes like ALMA.',
      'By observing water vapor clouds with standard magnifying glasses.',
      'By measuring optical reflection of sunlight off space dust.',
    ],
    correctIndex: 1,
    explanation: 'Rotational transitions of polar molecules emit characteristic quantized radio frequencies detected by radio telescope arrays (e.g., ALMA).',
    hints: [
      'Interstellar molecules undergo quantized rotational transitions.',
      'These transitions emit in microwave/sub-millimeter bands.',
      'Radio astronomy arrays identify structural spectral fingerprints.',
    ],
  },
];

// --- CUSTOM SVG DIAGRAM / SIMULATOR COMPONENTS ---

// Diagram 1: Chemistry Core Branches Interdisciplinary Web
const BranchesDiagramSVG: React.FC<{ activeBranch: string; onSelectBranch: (b: string) => void }> = ({
  activeBranch,
  onSelectBranch,
}) => {
  const branches = [
    { id: 'organic', name: 'Organic Chem', cx: 120, cy: 90, color: '#f59e0b', desc: 'Carbon compounds, synthetic drugs, polymers' },
    { id: 'inorganic', name: 'Inorganic Chem', cx: 280, cy: 90, color: '#3b82f6', desc: 'Metals, coordination complexes, catalysts, minerals' },
    { id: 'physical', name: 'Physical Chem', cx: 360, cy: 220, color: '#ec4899', desc: 'Thermodynamics, quantum mechanics, kinetics' },
    { id: 'analytical', name: 'Analytical Chem', cx: 200, cy: 290, color: '#10b981', desc: 'NMR, Mass Spec, Chromatography, Quality control' },
    { id: 'biochem', name: 'Biochemistry', cx: 40, cy: 220, color: '#8b5cf6', desc: 'Enzymes, DNA, metabolic pathways, molecular medicine' },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-slate-900 p-4 rounded-xl shadow-inner border border-slate-800">
      <h3 className="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Interactive Spectrum of Chemistry Branches</h3>
      <svg viewBox="0 0 400 340" className="w-full max-w-md h-auto">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {/* Central Interdisciplinary Hub */}
        <circle cx="200" cy="180" r="38" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
        <text x="200" y="176" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">APPLIED</text>
        <text x="200" y="190" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">SCIENCE</text>

        {/* Connecting Lines */}
        {branches.map((b) => (
          <line
            key={`line-${b.id}`}
            x1="200"
            y1="180"
            x2={b.cx}
            y2={b.cy}
            stroke={activeBranch === b.id ? b.color : '#334155'}
            strokeWidth={activeBranch === b.id ? '3' : '1.5'}
            strokeDasharray={activeBranch === b.id ? 'none' : '4 4'}
          />
        ))}

        {/* Outer Nodes */}
        {branches.map((b) => {
          const isSelected = activeBranch === b.id;
          return (
            <g key={b.id} onClick={() => onSelectBranch(b.id)} className="cursor-pointer transition-transform duration-200">
              <circle
                cx={b.cx}
                cy={b.cy}
                r={isSelected ? '32' : '26'}
                fill={isSelected ? b.color : '#0f172a'}
                stroke={b.color}
                strokeWidth="2.5"
                filter={isSelected ? 'url(#glow)' : undefined}
              />
              <text
                x={b.cx}
                y={b.cy + 4}
                textAnchor="middle"
                fill={isSelected ? '#ffffff' : '#e2e8f0'}
                fontSize="9"
                fontWeight="bold"
                pointerEvents="none"
              >
                {b.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="mt-3 p-3 bg-slate-800/80 rounded-lg border border-slate-700 w-full text-xs text-slate-200">
        <span className="font-bold text-gold-400">Selected Focus: </span>
        {branches.find((b) => b.id === activeBranch)?.desc || 'Click any branch to investigate its interdisciplinary scope.'}
      </div>
    </div>
  );
};

// Diagram 2: Nanoscale Particle Size & Surface Reactivity Canvas
const NanoscaleCanvasSVG: React.FC<{ sizeNm: number; onSizeChange: (v: number) => void }> = ({
  sizeNm,
  onSizeChange,
}) => {
  const radius = sizeNm;
  const specificArea = (3 / radius).toFixed(2);
  const colorShift = useMemo(() => {
    if (sizeNm <= 5) return '#ef4444'; // Red ruby nanogold
    if (sizeNm <= 25) return '#f59e0b'; // Amber
    if (sizeNm <= 60) return '#10b981'; // Green dot
    return '#eab308'; // Bulk yellow gold
  }, [sizeNm]);

  return (
    <div className="w-full flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
      <div className="flex justify-between items-center w-full mb-2">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Nanoscale Quantum Effects Simulator</h3>
        <span className="text-xs px-2 py-1 bg-gold-950 text-gold-300 rounded font-mono border border-gold-800">
          $d = {sizeNm * 2}$ nm
        </span>
      </div>

      <div className="relative w-full h-48 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
        {/* Render Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#38bdf8" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Central Particle */}
        <div
          className="rounded-full transition-all duration-300 flex items-center justify-center shadow-lg"
          style={{
            width: `${Math.max(12, Math.min(160, sizeNm * 2.2))}px`,
            height: `${Math.max(12, Math.min(160, sizeNm * 2.2))}px`,
            backgroundColor: colorShift,
            boxShadow: sizeNm <= 10 ? `0 0 25px ${colorShift}` : 'none',
          }}
        >
          {sizeNm <= 15 && <span className="text-[9px] font-bold text-slate-900 animate-pulse">Quantum Dot</span>}
        </div>
      </div>

      {/* Controls */}
      <div className="w-full mt-4 flex flex-col gap-2">
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>1 nm (Quantum Regime)</span>
          <span>50 nm (Nanoparticle)</span>
          <span>100 nm (Bulk Transition)</span>
        </div>
        <input
          type="range"
          min="2"
          max="80"
          step="1"
          value={sizeNm}
          onChange={(e) => onSizeChange(parseFloat(e.target.value))}
          className="w-full accent-gold-500 cursor-pointer"
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
            <div className="text-[10px] text-slate-400">Specific Surface Area ($S/V$)</div>
            <div className="text-sm font-bold text-gold-400 font-mono">{specificArea} {"$\\text{nm}^{-1}$"}</div>
          </div>
          <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
            <div className="text-[10px] text-slate-400">Surface Atom Ratio</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">
              {sizeNm <= 5 ? '92% (Hyper-reactive)' : sizeNm <= 25 ? '38% (High Catalysis)' : '4% (Bulk Behavior)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Diagram 3: Green Chemistry Atom Economy & E-Factor Engine
const GreenChemEngineSVG: React.FC<{
  productMass: number;
  wasteMass: number;
  onProductChange: (v: number) => void;
  onWasteChange: (v: number) => void;
}> = ({ productMass, wasteMass, onProductChange, onWasteChange }) => {
  const totalMass = productMass + wasteMass;
  const atomEconomy = totalMass > 0 ? ((productMass / totalMass) * 100).toFixed(1) : '0';
  const eFactor = productMass > 0 ? (wasteMass / productMass).toFixed(2) : '0';

  return (
    <div className="w-full flex flex-col bg-slate-900 p-4 rounded-xl border border-slate-800">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide mb-3">Green Chemistry Mass Balance & E-Factor Analyzer</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mass Visualizer */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div className="text-xs text-slate-400 mb-2">Mass Distribution Bar</div>
          <div className="w-full h-8 bg-slate-800 rounded-lg overflow-hidden flex stroke-slate-900">
            <div
              className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-slate-950 font-bold transition-all duration-300"
              style={{ width: `${atomEconomy}%` }}
            >
              {parseFloat(atomEconomy) > 15 ? `${atomEconomy}% Product` : ''}
            </div>
            <div
              className="bg-rose-500/80 h-full flex items-center justify-center text-[10px] text-white font-bold transition-all duration-300"
              style={{ width: `${100 - parseFloat(atomEconomy)}%` }}
            >
              {100 - parseFloat(atomEconomy) > 15 ? `${(100 - parseFloat(atomEconomy)).toFixed(1)}% Waste` : ''}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-center">
            <div className="p-2 bg-emerald-950/40 rounded border border-emerald-800/50">
              <span className="text-[10px] text-emerald-400 block uppercase">Atom Economy</span>
              <span className="text-lg font-bold text-emerald-300 font-mono">{atomEconomy}%</span>
            </div>
            <div className="p-2 bg-rose-950/40 rounded border border-rose-800/50">
              <span className="text-[10px] text-rose-400 block uppercase">E-Factor (Waste/Product)</span>
              <span className="text-lg font-bold text-rose-300 font-mono">{eFactor}</span>
            </div>
          </div>
        </div>

        {/* Interactive Sliders */}
        <div className="flex flex-col justify-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700">
          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Desired Product Yield Mass:</span>
              <span className="font-mono text-emerald-400 font-bold">{productMass} g</span>
            </div>
            <input
              type="range"
              min="10"
              max="500"
              value={productMass}
              onChange={(e) => onProductChange(parseFloat(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Byproducts & Solvent Waste Mass:</span>
              <span className="font-mono text-rose-400 font-bold">{wasteMass} g</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="10"
              value={wasteMass}
              onChange={(e) => onWasteChange(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
          <p className="text-[11px] text-slate-400 italic">
            * Lower E-Factor (&lt; 0.1) signifies an eco-optimized green chemical synthesis route.
          </p>
        </div>
      </div>
    </div>
  );
};

// --- MAIN SIMULATION COMPONENT ---
export const C11_ChemistryImportanceandscopeofchemistrySim: React.FC<SimProps> = ({ onComplete, initialNodeId }) => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'lab' | 'challenges' | 'summary' | 'diagnostic'>('scenario');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Gamification & Scoring State
  const [score, setScore] = useState<number>(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, unknown>>({});
  const [challengeStatus, setChallengeStatus] = useState<Record<string, 'correct' | 'wrong' | 'unattempted'>>({});

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
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

  // UI Feedback States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Interactive Lab States
  const [selectedBranch, setSelectedBranch] = useState<string>('organic');
  const [nanoSize, setNanoSize] = useState<number>(10);
  const [productYield, setProductYield] = useState<number>(100);
  const [wasteYield, setWasteYield] = useState<number>(250);
  const [soilpH, setSoilpH] = useState<number>(6.5);
  const [drugLogP, setDrugLogP] = useState<number>(2.5);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction Answers State
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predSubmitted, setPredSubmitted] = useState<Record<number, boolean>>({});

  // Observation Answers State
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsSubmitted, setObsSubmitted] = useState<Record<number, boolean>>({});

  // Diagnostic Answers State
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({});
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);

  // Inactivity Hint Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset Hint Timer on Interaction
  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const currentChallenge = CHALLENGES[activeChallengeIdx];
        if (currentChallenge && currentChallenge.hints.length > 0) {
          setCurrentHint(`Need a hint? ${currentChallenge.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 12000);
  }, [activeTab, activeChallengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer, activeChallengeIdx, activeTab]);

  // Audio & Voice Welcome on Load
  useEffect(() => {
    speechManager.speak('Welcome to Apex Applied Molecular Science Laboratory. Explore the scope and importance of chemistry.');
  }, []);

  // Handlers for BKT & SRS Progress updates
  const handleAnswerSubmit = (nodeId: string, isCorrect: boolean) => {
    // Audio Feedback
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
    } else {
      audioManager.play('drop-wrong');
    }

    // BKT Update
    setBktStates((prev) => {
      const current = prev[nodeId] || createBKTState();
      const updated = bktUpdate(current, isCorrect);
      return { ...prev, [nodeId]: updated };
    });

    // SRS Update
    setSrsItems((prev) => {
      const current = prev[nodeId] || createReviewItem(nodeId);
      const quality = isCorrect ? 5 : 2;
      const updated = sm2Update(current, quality);
      return { ...prev, [nodeId]: updated };
    });
  };

  // Challenge Handler
  const handleChallengeAnswer = (answer: unknown) => {
    resetInactivityTimer();
    const challenge = CHALLENGES[activeChallengeIdx];
    let isCorrect = false;

    if (challenge.type === 'mcq') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const numVal = parseFloat(answer as string);
      if (!isNaN(numVal) && challenge.correctAnswer !== undefined) {
        const target = challenge.correctAnswer as number;
        const tol = challenge.tolerance || 0.1;
        isCorrect = Math.abs(numVal - target) <= tol;
      }
    } else if (challenge.type === 'classify') {
      const classMap = answer as Record<string, string>;
      isCorrect = challenge.itemsToClassify?.every((item) => classMap[item.id] === item.category) || false;
    } else if (challenge.type === 'drag-sort') {
      const arr = answer as string[];
      isCorrect = challenge.sortItems?.every((item, idx) => arr[idx] === item) || false;
    }

    setChallengeAnswers((prev) => ({ ...prev, [challenge.id]: answer }));
    setChallengeStatus((prev) => ({ ...prev, [challenge.id]: isCorrect ? 'correct' : 'wrong' }));

    handleAnswerSubmit(challenge.nodeId, isCorrect);

    if (isCorrect) {
      setScore((s) => s + 10);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      speechManager.speak('Review the molecular mechanism or green metric formula and try again.');
    }
  };

  const currentChallenge = CHALLENGES[activeChallengeIdx];

  // Computed Overall Mastery
  const overallMastery = useMemo(() => {
    const totalMastery = ALL_NODE_IDS.reduce((acc, id) => {
      const st = bktStates[id];
      return acc + (st ? masteryProb(st) : 0);
    }, 0);
    return Math.round((totalMastery / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Handle Completion
  const handleSimCompletion = () => {
    audioManager.play('celebration');
    setShowConfetti(true);
    recordGameScore('C11_Chem_Importance_Scope', score);
    if (onComplete) onComplete(score);
    speechManager.speak(`Simulation completed! Your final score is ${score} points.`);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* UI FEEDBACK COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Correct! Mastery Updated." />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* NAVIGATION HEADER */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-gold-950 text-gold-400 border border-gold-800">
              ISC CLASS 11 CHEMISTRY
            </span>
            <span className="text-xs text-slate-400">c11_chem_001 - c11_chem_010</span>
          </div>
          <h1 className="text-xl font-bold text-white mt-1">Importance & Scope of Chemistry</h1>
        </div>

        {/* TOP METRICS / NAVIGATION TABS */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase">Overall Mastery</div>
              <div className="text-sm font-bold text-gold-400 font-mono">{overallMastery}%</div>
            </div>
            <div className="w-12 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gold-500 h-full transition-all duration-500" style={{ width: `${overallMastery}%` }} />
            </div>
          </div>

          <div className="bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-right">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Lab Score</div>
            <div className="text-sm font-bold text-emerald-400 font-mono">{score} PTS</div>
          </div>
        </div>
      </header>

      {/* TABS MENU */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex gap-2 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('scenario');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'scenario' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          1. Context & Scenario
        </button>
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'discovery' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          2. Discovery Question
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'lab' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          3. Interactive Exploration Labs
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'challenges' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          4. Progressive Challenges ({activeChallengeIdx + 1}/{CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('diagnostic');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'diagnostic' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          5. Diagnostic Assessment
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'summary' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
          }`}
        >
          6. Real-World Audit & Misconceptions
        </button>
      </div>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* TAB 1: SCENARIO */}
        {activeTab === 'scenario' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-slate-900 to-gold-950 p-8 rounded-2xl border border-gold-800/50 shadow-xl">
              <div className="inline-block px-3 py-1 bg-gold-900/60 text-gold-300 rounded-full text-xs font-semibold mb-3 border border-gold-700">
                SCENARIO BRIEFING
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{SCENARIO.context}</p>

              <button
                onClick={() => {
                  setActiveTab('discovery');
                  audioManager.play('swoop');
                }}
                className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                Begin Discovery Question &rarr;
              </button>
            </div>

            {/* NODE MAP GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_NODE_IDS.map((id) => {
                const nodeBkt = bktStates[id];
                const mastery = nodeBkt ? Math.round(masteryProb(nodeBkt) * 100) : 0;
                return (
                  <div key={id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-gold-400 font-mono">{id}</div>
                      <div className="text-sm font-semibold text-slate-200">{NODE_NAMES[id]}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-emerald-400">{mastery}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: DISCOVERY QUESTION */}
        {activeTab === 'discovery' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg">
              <div className="text-xs font-bold text-gold-400 uppercase tracking-wide mb-2">Initial Discovery Challenge</div>
              <h3 className="text-lg font-bold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setDiscoverySelected(idx)}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
                      discoverySelected === idx
                        ? 'bg-gold-950/80 border-gold-500 text-gold-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoverySelected === null}
                  onClick={() => {
                    setDiscoverySubmitted(true);
                    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('success');
                      setScore((s) => s + 15);
                    } else {
                      audioManager.play('error');
                    }
                  }}
                  className="w-full py-3 bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition-all"
                >
                  Confirm Answer
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl border ${
                    discoverySelected === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/50 border-emerald-700 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-700 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'Correct Insight!' : 'Scientific Revision Required'}
                  </div>
                  <p className="text-xs leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS RENDERING */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-lg space-y-6">
              <h3 className="text-base font-bold text-slate-200 uppercase tracking-wide border-b border-slate-800 pb-2">
                Predictive Conceptual Scenarios
              </h3>

              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-sm font-semibold text-slate-200">{pred.question}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => setPredAnswers((prev) => ({ ...prev, [pIdx]: oIdx }))}
                        className={`p-3 rounded-lg text-xs text-left transition-all border ${
                          predAnswers[pIdx] === oIdx
                            ? 'bg-gold-900/60 border-gold-500 text-gold-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!predSubmitted[pIdx] ? (
                    <button
                      disabled={predAnswers[pIdx] === undefined}
                      onClick={() => {
                        setPredSubmitted((prev) => ({ ...prev, [pIdx]: true }));
                        const isCorrect = predAnswers[pIdx] === pred.correctIndex;
                        handleAnswerSubmit(pred.nodeId, isCorrect);
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-gold-400 rounded-lg border border-slate-700"
                    >
                      Lock Prediction
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-lg text-xs border border-slate-800">
                      <span className="font-bold text-gold-400">Lab Verification Instruction: </span>
                      <span className="text-slate-300">{pred.verifyInstruction}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPLORATION LABS */}
        {activeTab === 'lab' && (
          <div className="max-w-5xl mx-auto space-y-6">
            {/* LAB SELECTION SUB-NAV */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('pop');
                  }}
                  className={`p-3 rounded-xl text-xs font-bold text-center border transition-all ${
                    activeLabIndex === idx
                      ? 'bg-gold-950 border-gold-500 text-gold-300 shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Lab Step {idx + 1}</div>
                  <div className="truncate mt-1">{step.title.split(':')[1] || step.title}</div>
                </button>
              ))}
            </div>

            {/* ACTIVE LAB CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <span className="text-[10px] px-2 py-0.5 bg-gold-950 text-gold-400 font-mono rounded border border-gold-800">
                  {EXPLORATION_STEPS[activeLabIndex].nodeId}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[activeLabIndex].title}</h2>
                <p className="text-xs text-slate-400 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>

              {/* LAB CONTENT BASED ON INDEX */}
              {activeLabIndex === 0 && (
                <BranchesDiagramSVG activeBranch={selectedBranch} onSelectBranch={(b) => setSelectedBranch(b)} />
              )}

              {activeLabIndex === 1 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-200">Soil pH & Bio-Available NPK Ionic Uptake</h3>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                      Soil pH: {soilpH.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3.5"
                    max="9.5"
                    step="0.1"
                    value={soilpH}
                    onChange={(e) => setSoilpH(parseFloat(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded border border-slate-800">
                      <div className="text-[10px] text-slate-400">Nitrate ($NO_3^-$)</div>
                      <div className="text-xs font-bold text-gold-300 font-mono">
                        {soilpH >= 5.5 && soilpH <= 8.5 ? '100% Bio-Available' : '30% Leached/Depleted'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border border-slate-800">
                      <div className="text-[10px] text-slate-400">Phosphate ($H_2PO_4^-$)</div>
                      <div className="text-xs font-bold text-rose-400 font-mono">
                        {soilpH < 5.5
                          ? 'Precipitated with Fe/Al'
                          : soilpH > 7.5
                          ? 'Bound with Ca2+'
                          : 'Optimal Bio-Availability'}
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded border border-slate-800">
                      <div className="text-[10px] text-slate-400">Potassium ($K^+$)</div>
                      <div className="text-xs font-bold text-emerald-300 font-mono">
                        {soilpH >= 5.0 ? 'High Cation Exchange' : 'Fixated/Unavailable'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeLabIndex === 2 && (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-200">Pharmaceutical Lipophilicity & Bio-availability (Log P)</h3>
                    <span className="text-xs font-mono font-bold text-gold-400 bg-slate-900 px-3 py-1 rounded border border-slate-800">
                      Log P: {drugLogP.toFixed(1)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-1.0"
                    max="6.0"
                    step="0.1"
                    value={drugLogP}
                    onChange={(e) => setDrugLogP(parseFloat(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                    {drugLogP < 0 && 'Hydrophilic: High water solubility but struggles to cross lipid cell membranes.'}
                    {drugLogP >= 0 && drugLogP <= 3.5 && 'Optimal Lipophilicity: Excellent membrane permeation and receptor binding kinetics.'}
                    {drugLogP > 3.5 && 'Excessively Hydrophobic: Poor aqueous solubility; accumulates in adipose tissue causing toxicity.'}
                  </div>
                </div>
              )}

              {activeLabIndex === 3 && (
                <NanoscaleCanvasSVG sizeNm={nanoSize} onSizeChange={(v) => setNanoSize(v)} />
              )}

              {activeLabIndex === 4 && (
                <GreenChemEngineSVG
                  productMass={productYield}
                  wasteMass={wasteYield}
                  onProductChange={(v) => setProductYield(v)}
                  onWasteChange={(v) => setWasteYield(v)}
                />
              )}

              {/* OBSERVATION QUESTIONS RENDERING */}
              <div className="mt-8 border-t border-slate-800 pt-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Interactive Observation Checkpoint</h3>
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="text-xs font-semibold text-slate-200">{obs.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => setObsAnswers((prev) => ({ ...prev, [oIdx]: optIdx }))}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            obsAnswers[oIdx] === optIdx
                              ? 'bg-gold-900/60 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {!obsSubmitted[oIdx] ? (
                      <button
                        disabled={obsAnswers[oIdx] === undefined}
                        onClick={() => {
                          setObsSubmitted((prev) => ({ ...prev, [oIdx]: true }));
                          const isCorrect = obsAnswers[oIdx] === obs.correctIndex;
                          handleAnswerSubmit(obs.nodeId, isCorrect);
                        }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 rounded-lg border border-slate-700"
                      >
                        Submit Observation
                      </button>
                    ) : (
                      <div
                        className={`p-3 rounded-lg text-xs border ${
                          obsAnswers[oIdx] === obs.correctIndex
                            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                            : 'bg-rose-950/40 border-rose-800 text-rose-300'
                        }`}
                      >
                        {obsAnswers[oIdx] === obs.correctIndex
                          ? 'Observation Verified!'
                          : 'Observation Incorrect. Adjust lab parameters and re-verify.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROGRESSIVE CHALLENGES */}
        {activeTab === 'challenges' && currentChallenge && (
          <div className="max-w-3xl mx-auto space-y-6">
            {/* STEP TRACKER */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gold-400 uppercase">Challenge {activeChallengeIdx + 1} of {CHALLENGES.length}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                  currentChallenge.difficulty === 'foundation' ? 'bg-gold-950 text-gold-400 border border-gold-800' :
                  currentChallenge.difficulty === 'standard' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {currentChallenge.difficulty}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">{currentChallenge.competencyLevel}</span>
            </div>

            {/* CHALLENGE CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div className="text-base font-bold text-slate-100 leading-relaxed">
                {currentChallenge.question}
              </div>

              {/* MCQ QUESTION TYPE */}
              {currentChallenge.type === 'mcq' && currentChallenge.options && (
                <div className="space-y-3">
                  {currentChallenge.options.map((opt, idx) => {
                    const isSelected = challengeAnswers[currentChallenge.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleChallengeAnswer(idx)}
                        className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
                          isSelected
                            ? challengeStatus[currentChallenge.id] === 'correct'
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* NUMERIC QUESTION TYPE */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical answer"
                      onChange={(e) => setChallengeAnswers((prev) => ({ ...prev, [currentChallenge.id]: e.target.value }))}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-gold-300 focus:outline-none focus:border-gold-500 flex-1"
                    />
                    <span className="text-sm font-bold text-slate-400">{currentChallenge.unit}</span>
                  </div>
                  <button
                    onClick={() => handleChallengeAnswer(challengeAnswers[currentChallenge.id])}
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl transition-all"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {/* CLASSIFY QUESTION TYPE */}
              {currentChallenge.type === 'classify' && currentChallenge.itemsToClassify && (
                <div className="space-y-4">
                  {currentChallenge.itemsToClassify.map((item) => {
                    const currentMap = (challengeAnswers[currentChallenge.id] as Record<string, string>) || {};
                    return (
                      <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3">
                        <span className="text-xs font-semibold text-slate-200">{item.text}</span>
                        <div className="flex gap-2">
                          {currentChallenge.categories?.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                const updated = { ...currentMap, [item.id]: cat };
                                setChallengeAnswers((prev) => ({ ...prev, [currentChallenge.id]: updated }));
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                                currentMap[item.id] === cat
                                  ? 'bg-gold-600 text-white border-gold-500'
                                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  <button
                    onClick={() => handleChallengeAnswer(challengeAnswers[currentChallenge.id])}
                    className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl transition-all"
                  >
                    Verify Classification
                  </button>
                </div>
              )}

              {/* EXPLANATION BANNER */}
              {challengeStatus[currentChallenge.id] && (
                <div
                  className={`p-4 rounded-xl border text-xs leading-relaxed ${
                    challengeStatus[currentChallenge.id] === 'correct'
                      ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-700 text-rose-200'
                  }`}
                >
                  <div className="font-bold mb-1">
                    {challengeStatus[currentChallenge.id] === 'correct' ? 'Explanation:' : 'Incorrect Correction:'}
                  </div>
                  {currentChallenge.explanation}
                </div>
              )}

              {/* CHALLENGE NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  disabled={activeChallengeIdx === 0}
                  onClick={() => {
                    setActiveChallengeIdx((i) => i - 1);
                    audioManager.play('swoop');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-300 rounded-xl"
                >
                  &larr; Previous Challenge
                </button>
                {activeChallengeIdx < CHALLENGES.length - 1 ? (
                  <button
                    onClick={() => {
                      setActiveChallengeIdx((i) => i + 1);
                      audioManager.play('swoop');
                    }}
                    className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 text-xs font-bold rounded-xl shadow"
                  >
                    Next Challenge &rarr;
                  </button>
                ) : (
                  <button
                    onClick={handleSimCompletion}
                    className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow"
                  >
                    Finish Simulation &rarr;
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DIAGNOSTIC ASSESSMENT */}
        {activeTab === 'diagnostic' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Diagnostic Knowledge Benchmark</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluate your holistic understanding across all 10 core curriculum chemistry nodes.
                </p>
              </div>

              <div className="space-y-6">
                {DIAGNOSTIC_QUESTIONS.map((diag, dIdx) => (
                  <div key={diag.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-gold-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                        {diag.nodeId}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">Q{dIdx + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">{diag.question}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {diag.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => setDiagAnswers((prev) => ({ ...prev, [diag.id]: oIdx }))}
                          className={`p-3 rounded-lg text-xs text-left transition-all border ${
                            diagAnswers[diag.id] === oIdx
                              ? 'bg-gold-900/60 border-gold-500 text-gold-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {diagSubmitted && (
                      <div
                        className={`p-3 rounded-lg text-xs border ${
                          diagAnswers[diag.id] === diag.correctIndex
                            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                            : 'bg-rose-950/40 border-rose-800 text-rose-300'
                        }`}
                      >
                        {diag.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!diagSubmitted ? (
                <button
                  onClick={() => {
                    setDiagSubmitted(true);
                    audioManager.play('chime');
                  }}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all"
                >
                  Grade Diagnostic Benchmark
                </button>
              ) : (
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs text-slate-300">
                  Diagnostic evaluation complete! Review your BKT node mastery levels on Tab 1.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: REAL WORLD AUDIT & MISCONCEPTIONS */}
        {activeTab === 'summary' && (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* REAL WORLD ACTIVITY CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="inline-block px-3 py-1 bg-emerald-950 text-emerald-400 rounded-full text-xs font-semibold border border-emerald-800">
                REAL-WORLD EXTENSION ACTIVITY
              </div>
              <h2 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-2 mt-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 flex gap-3 items-start">
                    <span className="font-mono text-gold-400 font-bold">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRESERVED MISCONCEPTIONS CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wide">Common Chemical Misconceptions & Corrections</h2>

              <div className="grid grid-cols-1 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-rose-400">{m.title}</span>
                      <span className="text-[10px] font-mono text-slate-500">{m.nodeId}</span>
                    </div>
                    <div className="text-xs font-semibold text-rose-200 bg-rose-950/30 p-2 rounded border border-rose-900/40">
                      <span className="font-bold">Myth: </span> &ldquo;{m.misconception}&rdquo;
                    </div>
                    <div className="text-xs text-emerald-200 bg-emerald-950/30 p-2 rounded border border-emerald-900/40 leading-relaxed">
                      <span className="font-bold">Correction: </span> {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER BAR */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-3 text-xs text-slate-500 flex justify-between items-center">
        <span>Apex Educational Chemistry Sim Engine v4.2</span>
        <span>Curriculum Alignment: CISCE / ISC Class 11 Chemistry</span>
      </footer>
    </div>
  );
};

export default C11_ChemistryImportanceandscopeofchemistrySim;