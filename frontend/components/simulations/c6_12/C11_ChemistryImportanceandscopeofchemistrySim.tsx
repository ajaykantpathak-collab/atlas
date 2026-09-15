"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

// Node IDs covered by this simulation
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
  'c11_chem_010'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// Data Interfaces
interface TeachingSlide {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  content: string;
  keyConcept: string;
  eli5: string;
  indianContext: string;
  visualType: 'branches' | 'laws' | 'dalton' | 'atomic_mass' | 'mole' | 'formula' | 'stoichiometry' | 'sigfigs' | 'equivalent' | 'titration';
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  title: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  misconception: string;
  hint: string;
}

interface DiscoveryQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Node Information Mapping
const NODE_INFO: Record<NodeId, { name: string; shortCode: string; topic: string }> = {
  c11_chem_001: { name: 'Scope & Importance of Chemistry', shortCode: 'c11_chem_001', topic: 'Central Science' },
  c11_chem_002: { name: 'Laws of Chemical Combination', shortCode: 'c11_chem_002', topic: 'Combination Laws' },
  c11_chem_003: { name: "Dalton's Atomic Theory", shortCode: 'c11_chem_003', topic: 'Atomic Model' },
  c11_chem_004: { name: 'Atomic & Molecular Masses', shortCode: 'c11_chem_004', topic: 'C-12 Standard' },
  c11_chem_005: { name: 'Mole Concept & Molar Mass', shortCode: 'c11_chem_005', topic: 'Avogadro & STP' },
  c11_chem_006: { name: 'Empirical & Molecular Formula', shortCode: 'c11_chem_006', topic: 'Formula Ratio' },
  c11_chem_007: { name: 'Stoichiometry & Limiting Reagent', shortCode: 'c11_chem_007', topic: 'Reaction Yield' },
  c11_chem_008: { name: 'Sig Figs & Dimensional Analysis', shortCode: 'c11_chem_008', topic: 'Precision & SI' },
  c11_chem_009: { name: 'Equivalent Weight & Normality', shortCode: 'c11_chem_009', topic: 'n-Factor & Valency' },
  c11_chem_010: { name: 'Volumetric Calculations', shortCode: 'c11_chem_010', topic: 'Titration N1V1' }
};

// Discovery Initial Predict Question
const DISCOVERY_QUESTION: DiscoveryQuestion = {
  question: "If 12g of Carbon burns in 32g of Oxygen in a sealed glass box, what is the total mass inside the box after the reaction?",
  options: [
    "Less than 44g because gas floats away",
    "Exactly 44g because mass cannot be created or destroyed",
    "More than 44g because heat adds mass",
    "Zero because everything turns into light energy"
  ],
  correctAnswer: 1,
  explanation: "According to Lavoisier's Law of Conservation of Mass, the total mass of reactants equals the total mass of products in a closed system!"
};

// Teaching Slides (One for each node)
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_001',
    nodeId: 'c11_chem_001',
    title: 'Chemistry: The Central Science',
    subtitle: 'Connecting Physics, Biology, Geology, and Engineering',
    content: 'Chemistry studies matter—its composition, structure, properties, and transformations. Synthesis (making new matter) and analysis (identifying matter) are its twin pillars.',
    keyConcept: 'Five Branches: Organic (carbon), Inorganic (metals/minerals), Physical (thermodynamics/kinetics), Analytical (tests/titrations), Biochemistry (life processes).',
    eli5: 'Chemistry is the study of stuff: what it is made of, how it looks, and how it transforms into new useful things like medicines and fertilizers!',
    indianContext: 'Urea fertilizer in Punjab fields, Paracetamol medicine, CNG bus fuel in Delhi, and Deccan Trap mineral analysis.',
    visualType: 'branches'
  },
  {
    id: 'slide_002',
    nodeId: 'c11_chem_002',
    title: 'The Five Laws of Chemical Combination',
    subtitle: 'Quantitative Grammar of Chemistry',
    content: '1. Conservation of Mass (Lavoisier)\n2. Definite Proportions (Proust - fixed mass ratio e.g. H:O = 1:8 in water)\n3. Multiple Proportions (Dalton - NO vs NO2 oxygen ratio 1:2)\n4. Reciprocal Proportions (Richter)\n5. Gay Lussac Law of Gaseous Volumes (2 Vol H2 + 1 Vol O2 -> 2 Vol steam).',
    keyConcept: 'Chemical reactions obey predictable integer mass and gas volume relationships.',
    eli5: 'Making chemical compounds is like following exact recipes. Extra ingredients will not fit!',
    indianContext: 'Mass ratios of ingredients in standard tea packets vs pure Ganges water electrolysis.',
    visualType: 'laws'
  },
  {
    id: 'slide_003',
    nodeId: 'c11_chem_003',
    title: "Dalton's Atomic Theory & Its Limitations",
    subtitle: 'The First Comprehensive Particle Model',
    content: 'Dalton proposed that matter is made of indivisible atoms that combine in simple whole-number ratios. He explained the combination laws, but discovery of subatomic particles (e-, p+, n0), isotopes (different masses), and isobars updated his model.',
    keyConcept: 'Atoms are not indivisible, but they remain the fundamental chemical identity units.',
    eli5: 'Dalton thought atoms were solid marble balls. Later we found tiny Russian dolls inside!',
    indianContext: 'Building blocks used in architectural models at IITs and IISc.',
    visualType: 'dalton'
  },
  {
    id: 'slide_004',
    nodeId: 'c11_chem_004',
    title: 'Atomic & Molecular Mass: The Carbon-12 Scale',
    subtitle: '1 amu = 1/12th Mass of a C-12 Atom',
    content: 'Single atoms are too small to weigh on standard scales. Everything is measured relative to Carbon-12 (assigned 12.00 amu). Molecular Mass is the sum of atomic masses in a formula.',
    keyConcept: '1 amu ≈ 1.6605 x 10^-27 kg. Molecular mass of H2SO4 = 2(1) + 32 + 4(16) = 98 amu.',
    eli5: 'Carbon-12 is our ultimate ruler. We cut 1 carbon into 12 equal slices, and each slice is 1 amu!',
    indianContext: 'Standard calibration weights used in Indian markets.',
    visualType: 'atomic_mass'
  },
  {
    id: 'slide_005',
    nodeId: 'c11_chem_005',
    title: 'The Mole Concept & Molar Volume at STP',
    subtitle: 'Avogadro Constant: 6.022 x 10^23 Entities',
    content: '1 mole is the chemist\'s dozen (6.022 x 10^23 particles). Number of moles n = m / M. At STP (0°C, 1 atm), 1 mole of ANY ideal gas occupies 22.4 Litres (Gram Molecular Volume).',
    keyConcept: 'Molar Mass (g/mol) has the exact same numerical value as Molecular Mass (amu).',
    eli5: 'A mole is a giant box holding 602,200,000,000,000,000,000,000 molecules. Weighing 1 box of water gives 18 grams!',
    indianContext: 'Standardized counting packets used in grain storage and pharmaceutical packing.',
    visualType: 'mole'
  },
  {
    id: 'slide_006',
    nodeId: 'c11_chem_006',
    title: 'Empirical vs Molecular Formula',
    subtitle: 'Simplest Whole-Number Ratio vs True Atomic Count',
    content: 'Empirical Formula is the simplest integer atom ratio (e.g., Glucose empirical = CH2O). Molecular Formula = (Empirical Formula)_n, where n = Molecular Mass / Empirical Mass.',
    keyConcept: 'Calculated via % composition -> Mass in 100g -> Moles -> Simplest Ratio -> Multiplier n.',
    eli5: 'Empirical formula is the reduced ratio pattern (1 red : 2 blue), while molecular formula is the full necklace size!',
    indianContext: 'Sugarcane juice sugar analysis in Maharashtra & UP mills.',
    visualType: 'formula'
  },
  {
    id: 'slide_007',
    nodeId: 'c11_chem_007',
    title: 'Stoichiometry & Limiting Reagents',
    subtitle: 'Predicting Reactants, Products & Yields',
    content: 'Balanced chemical equations give mole ratios. The reactant that gets completely consumed first is the Limiting Reagent. It dictates the Theoretical Yield.',
    keyConcept: 'In N2 + 3H2 -> 2NH3, 1 mole N2 needs 3 moles H2. If H2 runs out first, no more NH3 forms!',
    eli5: 'If you have 10 bread slices and 3 cheese slices, you can only make 3 cheese sandwiches. Cheese is the limiting reagent!',
    indianContext: 'Haber process ammonia synthesis plants at Sindri and Nangal.',
    visualType: 'stoichiometry'
  },
  {
    id: 'slide_008',
    nodeId: 'c11_chem_008',
    title: 'Significant Figures & Dimensional Analysis',
    subtitle: 'Precision, Accuracy & Factor-Label Method',
    content: 'Precision = reproducibility; Accuracy = closeness to true value. Significant figures preserve measurement uncertainty. Conversions use fractions equal to 1 (Unit Factor Method).',
    keyConcept: 'Multiplication/Division result is limited by least significant figures. 2.50 x 3.0 = 7.5 (2 sig figs).',
    eli5: 'Do not claim your ruler can measure single atoms! Keep only the numbers you actually measured with confidence.',
    indianContext: 'Precise burette and pipette graduation markings in school laboratories.',
    visualType: 'sigfigs'
  },
  {
    id: 'slide_009',
    nodeId: 'c11_chem_009',
    title: 'Equivalent Weight & Normality',
    subtitle: 'Combining Capacity & Reaction Units (n-Factor)',
    content: 'Equivalent Weight E = Molecular Mass / n-factor. Acid n-factor = basicity (H+ given); Base n-factor = acidity (OH- given); Salt = total cation charge; Redox = e- transferred.\nNormality N = Gram Equivalents / Litre = Molarity x n-factor.',
    keyConcept: 'For H2SO4 (n=2), Equivalent Weight = 98 / 2 = 49 g. 1 M H2SO4 = 2 N H2SO4.',
    eli5: 'Equivalent weight measures chemical currency: how many reaction units 1 molecule can trade!',
    indianContext: 'Standardizing acids and bases for soil testing across Indian agricultural institutes.',
    visualType: 'equivalent'
  },
  {
    id: 'slide_010',
    nodeId: 'c11_chem_010',
    title: 'Volumetric Calculations & Titrations',
    subtitle: 'Equivalence Point & Dilution Formula N1V1 = N2V2',
    content: 'Concentration terms: Molarity (M), Molality (m, temperature independent), Mole Fraction (x), Normality (N). At equivalence point in titration: N1 x V1 = N2 x V2.',
    keyConcept: 'n1 x M1 x V1 = n2 x M2 x V2 allows calculating unknown concentration of acids/bases.',
    eli5: 'In a titration, we add drops until acid and base match punch for punch at the color change!',
    indianContext: 'Burette titrations with phenolphthalein indicator in ISC practical exams.',
    visualType: 'titration'
  }
];

// Progressive Interactive Challenges (10 Challenges, 1 per node)
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001',
    nodeId: 'c11_chem_001',
    title: 'Challenge 1: Identifying Branches of Chemistry',
    question: 'A scientist in Bengaluru synthesizes a new carbon-based anti-fever pharmaceutical compound (Paracetamol derivative). Which major branch of chemistry is primarily involved?',
    options: ['Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
    correctAnswer: 1,
    explanation: 'Organic chemistry is the branch dedicated to carbon compounds, including pharmaceuticals like paracetamol.',
    misconception: 'Some students think medicines belong to inorganic chemistry because they come in solid tablets.',
    hint: 'Think about whether carbon compound synthesis belongs to Organic or Inorganic.'
  },
  {
    id: 'ch_002',
    nodeId: 'c11_chem_002',
    title: 'Challenge 2: Law of Multiple Proportions',
    question: 'In Nitric Oxide (NO), 14g N combines with 16g O. In Nitrogen Dioxide (NO2), 14g N combines with 32g O. The oxygen ratio 16:32 (1:2) illustrates which law?',
    options: ['Law of Conservation of Mass', 'Law of Definite Proportions', 'Law of Multiple Proportions', 'Gay Lussac\'s Law'],
    correctAnswer: 2,
    explanation: 'When two elements form more than one compound, the masses of one element combining with a fixed mass of the other are in simple whole-number ratios (Law of Multiple Proportions).',
    misconception: 'Students often confuse Definite Proportions (fixed composition of 1 compound) with Multiple Proportions (comparing 2 different compounds).',
    hint: 'We are comparing TWO different oxides of nitrogen with fixed nitrogen mass.'
  },
  {
    id: 'ch_003',
    nodeId: 'c11_chem_003',
    title: 'Challenge 3: Limitations of Dalton\'s Theory',
    question: 'Which scientific discovery directly contradicted Dalton\'s postulate that "all atoms of the same element are completely identical in mass"?',
    options: ['Discovery of Isobars', 'Discovery of Isotopes', 'Law of Conservation of Mass', 'Discovery of Covalent Bonding'],
    correctAnswer: 1,
    explanation: 'Isotopes (such as Carbon-12 and Carbon-14) are atoms of the same element with different neutron counts and different masses!',
    misconception: 'Students confuse isotopes (same element, different mass) with isobars (different elements, same mass number).',
    hint: 'What do we call atoms of the same element that have different masses?'
  },
  {
    id: 'ch_004',
    nodeId: 'c11_chem_004',
    title: 'Challenge 4: Molecular Mass Calculation',
    question: 'Calculate the relative molecular mass of Sulphuric Acid (H2SO4) using atomic masses: H = 1.0, S = 32.0, O = 16.0 amu.',
    options: ['49 amu', '98 amu', '100 amu', '64 amu'],
    correctAnswer: 1,
    explanation: 'Molecular Mass = 2(1.0) + 1(32.0) + 4(16.0) = 2 + 32 + 64 = 98 amu.',
    misconception: 'Dividing by 2 gives 49 amu, which is the equivalent weight, NOT the molecular mass!',
    hint: 'Sum all atoms: 2 Hydrogen + 1 Sulfur + 4 Oxygen.'
  },
  {
    id: 'ch_005',
    nodeId: 'c11_chem_005',
    title: 'Challenge 5: Molar Volume at STP',
    question: 'How many litres of CO2 gas at STP are present in 0.5 moles of Carbon Dioxide?',
    options: ['44.8 L', '22.4 L', '11.2 L', '5.6 L'],
    correctAnswer: 2,
    explanation: 'Volume at STP = n x 22.4 L = 0.5 mol x 22.4 L/mol = 11.2 Litres.',
    misconception: 'Assuming 1 mole is 22.4 L without multiplying by 0.5.',
    hint: '1 mole of any gas at STP is 22.4 L. What is half a mole?'
  },
  {
    id: 'ch_006',
    nodeId: 'c11_chem_006',
    title: 'Challenge 6: Molecular Formula Determination',
    question: 'A compound has an empirical formula of CH2O (empirical mass = 30 g/mol) and a molar mass of 180 g/mol. What is its molecular formula?',
    options: ['CH2O', 'C2H4O2', 'C6H12O6', 'C12H22O11'],
    correctAnswer: 2,
    explanation: 'Multiplier n = Molar Mass / Empirical Mass = 180 / 30 = 6. Molecular Formula = (CH2O)6 = C6H12O6 (Glucose).',
    misconception: 'Selecting CH2O directly without multiplying by n.',
    hint: 'Divide 180 by 30 to find n, then multiply all subscripts in CH2O by n.'
  },
  {
    id: 'ch_007',
    nodeId: 'c11_chem_007',
    title: 'Challenge 7: Limiting Reagent in Ammonia Synthesis',
    question: 'In N2 + 3H2 -> 2NH3, if 1 mole of N2 is mixed with 2 moles of H2, which reactant is the limiting reagent?',
    options: ['N2 is limiting', 'H2 is limiting', 'Both are completely consumed', 'NH3 is limiting'],
    correctAnswer: 1,
    explanation: '1 mole N2 requires 3 moles H2 according to stoichiometry. Since only 2 moles of H2 are available, H2 runs out first and is the limiting reagent!',
    misconception: 'Thinking N2 is limiting because 1 mole is less than 2 moles, ignoring stoichiometric coefficients.',
    hint: 'Compare available H2 (2 moles) with required H2 for 1 mole N2 (3 moles).'
  },
  {
    id: 'ch_008',
    nodeId: 'c11_chem_008',
    title: 'Challenge 8: Significant Figures in Measurement',
    question: 'How many significant figures are present in a burette reading reported as 0.0250 L?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'Leading zeros (0.0) are NOT significant. The digits 2, 5, and trailing zero after decimal (0) ARE significant. Total = 3 sig figs.',
    misconception: 'Counting leading zeros as significant figures.',
    hint: 'Leading zeros do not count; trailing zeros after a decimal DO count.'
  },
  {
    id: 'ch_009',
    nodeId: 'c11_chem_009',
    title: 'Challenge 9: Equivalent Weight of Acid',
    question: 'Sulphuric acid (H2SO4, Molar mass = 98 g/mol) acts as a diprotic acid in complete neutralisation. What is its Equivalent Weight?',
    options: ['98 g', '49 g', '32.6 g', '196 g'],
    correctAnswer: 1,
    explanation: 'Equivalent Weight = Molar Mass / basicity = 98 / 2 = 49 g.',
    misconception: 'Using basicity = 1 instead of 2 for diprotic H2SO4.',
    hint: 'How many replaceable H+ ions does H2SO4 furnish?'
  },
  {
    id: 'ch_010',
    nodeId: 'c11_chem_010',
    title: 'Challenge 10: Titration Volumetric Calculation',
    question: '25 mL of 0.2 N NaOH solution exactly neutralises 20 mL of an unknown HCl solution. What is the normality of the HCl solution?',
    options: ['0.10 N', '0.25 N', '0.40 N', '0.50 N'],
    correctAnswer: 1,
    explanation: 'N1V1 = N2V2 => 0.2 N x 25 mL = N2 x 20 mL => N2 = 5.0 / 20 = 0.25 N.',
    misconception: 'Multiplying 0.2 x 20 / 25 instead of using N1V1 = N2V2 correctly.',
    hint: 'Use the titration formula N1 x V1 = N2 x V2.'
  }
];

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Natural Medicines Are Completely Chemical-Free and Safer",
    description: "Students often believe that herbal or natural remedies contain no chemical substances, whereas pharmaceutical drugs are synthetic and inherently toxic.",
    correction: "All matter, including natural plant extracts, is composed of chemical compounds. Pharmaceutical chemistry isolates, purifies, or synthesizes active molecules to ensure precise dosages and eliminate harmful contaminants often found in raw natural extracts. Chemistry helps optimize these compounds to maximize therapeutic efficacy while minimizing side effects.",
  },
  {
    id: "misc_2",
    title: "Chemical Fertilizers Provide Nutrients Differently Than Organic Manure",
    description: "Students frequently think that crops absorb 'chemical' nutrients differently or worse compared to 'organic' nutrients derived from compost.",
    correction: "Plant roots absorb essential elements like nitrogen, phosphorus, and potassium only as inorganic ions regardless of their source. Chemical fertilizers provide these exact ionic species in readily bioavailable concentrations tailored to crop needs. While organic manure improves soil structure, synthetic fertilizers developed through chemistry are essential for high agricultural yield and global food security.",
  },
  {
    id: "misc_3",
    title: "Chemistry Is Exclusively the Primary Cause of Environmental Degradation",
    description: "Many students view industrial chemistry solely as a source of pollution, failing to recognize its role in environmental monitoring and protection.",
    correction: "While historical industrial processes created pollution, modern Green Chemistry actively designs eco-friendly processes and biodegradable materials. Chemical techniques are essential for analyzing atmospheric pollutants, purifying contaminated water, and developing carbon-capture technologies. Chemistry is the primary scientific tool used to measure, mitigate, and reverse environmental damage.",
  },
  {
    id: "misc_4",
    title: "Synthetic Polymers Are Merely Disposable Materials With No Value",
    description: "Students often associate synthetic materials like polymers exclusively with single-use plastic waste and environmental harm.",
    correction: "Materials chemistry creates high-performance polymers, smart alloys, and composites critical for advanced applications. These materials enable biocompatible artificial organs, lightweight aerospace structures, bulletproof armor, and solar cell components that natural materials cannot replace. Current chemical research focuses on designing conductive, self-healing, and fully recyclable polymers.",
  },
  {
    id: "misc_5",
    title: "Nanotechnology Is Simply Mechanical Miniaturization of Existing Machines",
    description: "Students tend to view nanotechnology as microscopic mechanical engineering rather than the manipulation of chemical properties at the atomic scale.",
    correction: "Nanotechnology fundamentally relies on chemistry to manipulate matter at the scale of 1 to 100 nanometers, where materials display unique quantum effects. At this level, high surface-area-to-volume ratios dramatically alter chemical reactivity, color, and electrical conductivity compared to bulk materials. Chemistry enables the molecular synthesis of carbon nanotubes, quantum dots, and targeted nanomedicine delivery systems.",
  },
];

export default function C11_ChemistryImportanceandscopeofchemistrySim() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'discovery' | 'slides' | 'lab' | 'challenges'>('discovery');
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // User Score & SRS/BKT System
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(new Array(CHALLENGES.length).fill(null));
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Chemistry');
    });
    return initial;
  });

  // UI Interactive Elements
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Interactive Lab Widget Specific States
  // Lab 1: Branches Wheel
  const [activeBranch, setActiveBranch] = useState<string>('organic');
  // Lab 2: Laws Combination
  const [lawCarbonMass, setLawCarbonMass] = useState<number>(12);
  const [lawOxygenMass, setLawOxygenMass] = useState<number>(32);
  // Lab 3: Dalton View Mode
  const [daltonViewMode, setDaltonViewMode] = useState<'dalton' | 'modern'>('dalton');
  // Lab 4: Atomic Mass C-12 Calculator
  const [selectedMolecule, setSelectedMolecule] = useState<'H2O' | 'H2SO4' | 'NaCl' | 'CaCO3'>('H2SO4');
  // Lab 5: Mole Piston
  const [molePistonValue, setMolePistonValue] = useState<number>(1.0); // moles
  // Lab 6: Formula Synthesizer
  const [synthCarbonPct, setSynthCarbonPct] = useState<number>(40.0);
  const [synthMolarMass, setSynthMolarMass] = useState<number>(180);
  // Lab 7: Stoichiometry Reactor
  const [reactN2Moles, setReactN2Moles] = useState<number>(1.0);
  const [reactH2Moles, setReactH2Moles] = useState<number>(2.0);
  const [isReactingAnimation, setIsReactingAnimation] = useState<boolean>(false);
  // Lab 8: Sig Figs Detector
  const [sigFigInput, setSigFigInput] = useState<string>('0.0250');
  // Lab 9: Equivalent Weight & Normality
  const [eqSubstance, setEqSubstance] = useState<'H2SO4' | 'NaOH' | 'Na2CO3' | 'KMnO4'>('H2SO4');
  const [kmno4Medium, setKmno4Medium] = useState<'acidic' | 'neutral' | 'alkaline'>('acidic');
  // Lab 10: Titration burette
  const [titrantVolume, setTitrantVolume] = useState<number>(0);
  const [titrationComplete, setTitrationComplete] = useState<boolean>(false);

  // Inactivity Timer for Auto-Hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !showHint) {
        setShowHint(true);
        setCurrentHint(CHALLENGES[currentChallengeIndex].hint);
        audioManager.play('hint');
      }
    }, 12000);
  }, [activeTab, currentChallengeIndex, showHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Audio & Speech Handler Helpers
  const triggerAudio = (sound: any) => {
    try {
      audioManager.play(sound);
    } catch (e) {
      // fallback
    }
  };

  const triggerSpeech = (text: string) => {
    try {
      speechManager.speak(text);
      speechManager.speak('Great job! Keep going.');
      speechManager.speak('Let us try the next one.');
      speechManager.speak('Remember the key concept.');
      speechManager.speak('You are doing well!');
    } catch (e) {
      // fallback
    }
  };

  // Node Selection Handler
  const handleSelectNode = (index: number) => {
    triggerAudio('tap');
    setSelectedNodeIndex(index);
    setCurrentSlideIndex(index);
    setCurrentChallengeIndex(index);
  };

  // Discovery Question Submit
  const handleDiscoverySubmit = (optIndex: number) => {
    setDiscoveryAnswer(optIndex);
    setDiscoverySubmitted(true);
    if (optIndex === DISCOVERY_QUESTION.correctAnswer) {
      triggerAudio('drop-correct');
      triggerSpeech('Excellent prediction! Mass is conserved in every chemical reaction.');
      setShowSparkle(true);
    } else {
      triggerAudio('drop-wrong');
      triggerSpeech('Good try! Let us discover why mass cannot be created or destroyed.');
    }
  };

  // Challenge Option Click
  const handleChallengeAnswer = (optionIdx: number) => {
    triggerAudio('tap');
    const challenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = optionIdx === challenge.correctAnswer;
    const currentNodeId = challenge.nodeId;

    const newAnswers = [...userAnswers];
    newAnswers[currentChallengeIndex] = optionIdx;
    setUserAnswers(newAnswers);

    // Update BKT & SRS
    const currentBKT = bktStates[currentNodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [currentNodeId]: updatedBKT }));

    const currentSRS = srsItems[currentNodeId] || createReviewItem(currentNodeId, 'Chemistry');
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2, 0);
    setSrsItems((prev) => ({ ...prev, [currentNodeId]: updatedSRS }));

    if (isCorrect) {
      triggerAudio('drop-correct');
      triggerAudio('sparkle');
      setShowSparkle(true);
      setShowSuccess(true);
      setScore((prev) => prev + 10);
      setChallengeFeedback(`Correct! ${challenge.explanation}`);
      triggerSpeech(`Spot on! ${challenge.explanation}`);

      recordGameScore(ALL_NODE_IDS, 100);

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } else {
      triggerAudio('drop-wrong');
      setChallengeFeedback(`Incorrect. ${challenge.misconception}`);
      triggerSpeech(`Notice that: ${challenge.misconception}`);
      setShowHint(true);
      setCurrentHint(challenge.hint);
    }
  };

  // Next Challenge Handler
  const handleNextChallenge = () => {
    triggerAudio('swoop');
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedNodeIndex(currentChallengeIndex + 1);
    } else {
      // Finished all challenges
      triggerAudio('celebration');
      setShowConfetti(true);
      triggerSpeech('Congratulations! You have mastered all 10 nodes of Class 11 Chemistry Fundamentals!');
    }
  };

  // Calculated Properties for Lab Widgets
  // Lab 4: Molecular Mass
  const moleculeMassData = useMemo(() => {
    switch (selectedMolecule) {
      case 'H2O':
        return { name: 'Water (H₂O)', sumStr: '2(1.008) + 16.00', total: 18.016 };
      case 'H2SO4':
        return { name: 'Sulphuric Acid (H₂SO₄)', sumStr: '2(1.008) + 32.06 + 4(16.00)', total: 98.076 };
      case 'NaCl':
        return { name: 'Sodium Chloride (NaCl)', sumStr: '22.99 + 35.45', total: 58.44 };
      case 'CaCO3':
        return { name: 'Calcium Carbonate (CaCO₃)', sumStr: '40.08 + 12.01 + 3(16.00)', total: 100.09 };
    }
  }, [selectedMolecule]);

  // Lab 6: Formula Synthesis
  const formulaSynthesisData = useMemo(() => {
    // CH2O empirical
    const empMass = 30.03;
    const nFactor = Math.round(synthMolarMass / empMass);
    const molFormula = nFactor === 1 ? 'CH₂O' : nFactor === 2 ? 'C₂H₄O₂' : nFactor === 6 ? 'C₆H₁₂O₆' : `(CH₂O)${nFactor}`;
    return { empMass, nFactor, molFormula };
  }, [synthMolarMass]);

  // Lab 7: Reaction Data
  const reactionResult = useMemo(() => {
    // N2 + 3H2 -> 2NH3
    const requiredH2 = reactN2Moles * 3;
    let limiting = '';
    let nh3Produced = 0;
    let excessN2 = 0;
    let excessH2 = 0;

    if (reactH2Moles < requiredH2) {
      limiting = 'Hydrogen (H₂)';
      nh3Produced = (reactH2Moles / 3) * 2;
      excessN2 = reactN2Moles - reactH2Moles / 3;
    } else {
      limiting = 'Nitrogen (N₂)';
      nh3Produced = reactN2Moles * 2;
      excessH2 = reactH2Moles - requiredH2;
    }

    return { limiting, nh3Produced: nh3Produced.toFixed(2), excessN2: excessN2.toFixed(2), excessH2: excessH2.toFixed(2) };
  }, [reactN2Moles, reactH2Moles]);

  // Lab 8: Sig Figs Calculation
  const countSigFigs = (str: string) => {
    const s = str.trim();
    if (!s || isNaN(Number(s))) return 0;
    if (s.includes('.')) {
      const cleanStr = s.replace('-', '');
      const firstNonZero = cleanStr.search(/[1-9]/);
      if (firstNonZero === -1) return 0; // e.g. "0.000"
      const digitsOnly = cleanStr.substring(firstNonZero).replace('.', '');
      return digitsOnly.length;
    } else {
      const cleanStr = s.replace('-', '').replace(/0+$/, '');
      return cleanStr.length;
    }
  };

  // Lab 9: Equivalent Weight Data
  const eqData = useMemo(() => {
    if (eqSubstance === 'H2SO4') {
      return { molMass: 98, nFactor: 2, eqWeight: 49, desc: 'Diprotic acid furnishing 2 H+ ions' };
    } else if (eqSubstance === 'NaOH') {
      return { molMass: 40, nFactor: 1, eqWeight: 40, desc: 'Monoacidic base furnishing 1 OH- ion' };
    } else if (eqSubstance === 'Na2CO3') {
      return { molMass: 106, nFactor: 2, eqWeight: 53, desc: 'Salt with 2 Na+ cations (total charge +2)' };
    } else {
      // KMnO4
      if (kmno4Medium === 'acidic') return { molMass: 158, nFactor: 5, eqWeight: 31.6, desc: 'Mn(+7) -> Mn(+2), gains 5 e-' };
      if (kmno4Medium === 'neutral') return { molMass: 158, nFactor: 3, eqWeight: 52.67, desc: 'Mn(+7) -> MnO2(+4), gains 3 e-' };
      return { molMass: 158, nFactor: 1, eqWeight: 158, desc: 'Mn(+7) -> MnO4(2-)(+6), gains 1 e-' };
    }
  }, [eqSubstance, kmno4Medium]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 select-none relative overflow-x-hidden">
      {/* Chemistry Scope SVG Visual */}
      <svg width={400} height={120} className="mx-auto mb-4 rounded-lg shadow-inner">
        <rect width={400} height={120} fill="#0f172a" rx={8} />
        <circle cx={60} cy={60} r={30} fill="#06b6d433" stroke="#06b6d4" strokeWidth={2} />
        <text x={60} y={65} textAnchor="middle" fill="#06b6d4" fontSize={10}>Industry</text>
        <circle cx={140} cy={60} r={30} fill="#8b5cf633" stroke="#8b5cf6" strokeWidth={2} />
        <text x={140} y={65} textAnchor="middle" fill="#8b5cf6" fontSize={10}>Medicine</text>
        <circle cx={220} cy={60} r={30} fill="#10b98133" stroke="#10b981" strokeWidth={2} />
        <text x={220} y={65} textAnchor="middle" fill="#10b981" fontSize={10}>Agriculture</text>
        <circle cx={300} cy={60} r={30} fill="#f59e0b33" stroke="#f59e0b" strokeWidth={2} />
        <text x={300} y={65} textAnchor="middle" fill="#f59e0b" fontSize={9}>Environment</text>
        <circle cx={370} cy={60} r={25} fill="#ef444433" stroke="#ef4444" strokeWidth={2} />
        <text x={370} y={65} textAnchor="middle" fill="#ef4444" fontSize={8}>Research</text>
        <line x1={90} y1={60} x2={110} y2={60} stroke="#475569" strokeWidth={1} />
        <line x1={170} y1={60} x2={190} y2={60} stroke="#475569" strokeWidth={1} />
        <line x1={250} y1={60} x2={270} y2={60} stroke="#475569" strokeWidth={1} />
        <line x1={330} y1={60} x2={345} y2={60} stroke="#475569" strokeWidth={1} />
        <text x={200} y={105} textAnchor="middle" fill="#64748b" fontSize={9}>Scope of Chemistry</text>
      </svg>
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Helper Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Correct Answer! +10 Points" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* Top Header & Mastery Dashboard */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-md border border-cyan-500/30">
              Class 11 ISC Chemistry
            </span>
            <span className="text-xs text-slate-400 font-mono">10 Nodes Covered</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
            Importance & Scope of Chemistry
          </h1>
        </div>

        {/* Score & Adaptive Mastery Badge */}
        <div className="flex items-center gap-4 bg-slate-900/80 p-3 rounded-xl border border-slate-800 shadow-xl">
          <div className="text-center px-2">
            <p className="text-xs text-slate-400 uppercase font-semibold">Total Score</p>
            <p className="text-xl font-black text-amber-400">{score} pts</p>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center px-2">
            <p className="text-xs text-slate-400 uppercase font-semibold">Node Mastery</p>
            <div className="flex items-center gap-1 mt-0.5">
              {ALL_NODE_IDS.map((id, idx) => {
                const bkt = bktStates[id] || createBKTState();
                const level = getMasteryLevel(bkt);
                const color = level === 'mastered' ? 'bg-emerald-500' : level === 'proficient' ? 'bg-amber-500' : 'bg-slate-700';
                return (
                  <div
                    key={id}
                    title={`${NODE_INFO[id].name}: ${level}`}
                    className={`w-2.5 h-2.5 rounded-full ${color} cursor-pointer hover:scale-125 transition-transform`}
                    onClick={() => handleSelectNode(idx)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <nav className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-6">
        {[
          { id: 'discovery', label: '1. Discovery Question', icon: '💡' },
          { id: 'slides', label: '2. Teaching Slides', icon: '📖' },
          { id: 'lab', label: '3. Interactive Visual Lab', icon: '🔬' },
          { id: 'challenges', label: '4. Mastery Challenges', icon: '🏆' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {audioManager.play('tap'); 
              triggerAudio('tap');
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/20 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Node Quick Selector Bar */}
      <div className="max-w-7xl mx-auto overflow-x-auto pb-2 mb-6 scrollbar-thin scrollbar-thumb-slate-800">
        <div className="flex gap-2 min-w-max">
          {ALL_NODE_IDS.map((id, idx) => {
            const isSelected = selectedNodeIndex === idx;
            return (
              <button
                key={id}
                onClick={() => handleSelectNode(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                }`}
              >
                <span className="opacity-60">{NODE_INFO[id].shortCode}</span>
                <span>{NODE_INFO[id].topic}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DISCOVERY QUESTION */}
      {activeTab === 'discovery' && (
        <main className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/90 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-3 text-cyan-400 mb-4">
              <span className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-xl">💡</span>
              <span className="text-sm font-bold uppercase tracking-wider">Predict Before You Learn</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100 mb-6">{DISCOVERY_QUESTION.question}</h2>

            <div className="space-y-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => {
                const isSelected = discoveryAnswer === idx;
                const isCorrect = idx === DISCOVERY_QUESTION.correctAnswer;
                let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-700/80';
                if (discoverySubmitted) {
                  if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                  else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                }

                return (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {discoverySubmitted && isCorrect && <span className="text-emerald-400 font-bold">✓ Correct</span>}
                  </button>
                );
              })}
            </div>

            {discoverySubmitted && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-cyan-950/40 border border-cyan-800/50 rounded-xl mb-6">
                <p className="text-cyan-200 text-sm leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
              </motion.div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => {audioManager.play('tap'); 
                  triggerAudio('tap');
                  setActiveTab('slides');
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-400 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2"
              >
                <span>Continue to Teaching Slides</span>
                <span>→</span>
              </button>
            </div>
          </motion.div>
        </main>
      )}

      {/* TAB 2: TEACHING SLIDES */}
      {activeTab === 'slides' && (
        <main className="max-w-5xl mx-auto">
          {(() => {
            const slide = TEACHING_SLIDES[currentSlideIndex];
            return (
              <motion.div key={slide.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                {/* Slide Header */}
                <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800 flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">{NODE_INFO[slide.nodeId].shortCode}</span>
                      <span className="text-xs text-slate-400">Node {currentSlideIndex + 1} of 10</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-white">{slide.title}</h2>
                    <p className="text-cyan-400 text-sm mt-1">{slide.subtitle}</p>
                  </div>
                  <button
                    onClick={() => {audioManager.play('tap'); 
                      triggerAudio('swoop');
                      setActiveTab('lab');
                    }}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center gap-1.5"
                  >
                    <span>🔬 Open Visual Lab</span>
                  </button>
                </div>

                {/* Slide Content Grid */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                      <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">Core Content</h3>
                      <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line">{slide.content}</p>
                    </div>

                    <div className="bg-cyan-950/30 p-4 rounded-xl border border-cyan-800/40">
                      <h3 className="text-xs font-bold uppercase text-cyan-400 tracking-wider mb-1">Key Concept & Formula</h3>
                      <p className="text-cyan-200 text-sm font-medium">{slide.keyConcept}</p>
                    </div>

                    <div className="bg-amber-950/20 p-4 rounded-xl border border-amber-800/30">
                      <h3 className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-1">ELI5 Analogy</h3>
                      <p className="text-amber-200 text-xs italic">{slide.eli5}</p>
                    </div>

                    <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-800/40">
                      <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider mb-1">Indian Real-World Context</h3>
                      <p className="text-indigo-200 text-xs">{slide.indianContext}</p>
                    </div>
                  </div>

                  {/* Interactive Embedded Mini Visual Representation */}
                  <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <span className="text-xs text-slate-500 font-mono absolute top-3 left-3">Concept Visualizer</span>

                    {slide.visualType === 'branches' && (
                      <div className="space-y-4 w-full">
                        <div className="w-24 h-24 mx-auto bg-cyan-500/10 border-2 border-cyan-400 rounded-full flex items-center justify-center text-cyan-300 font-bold text-lg shadow-lg shadow-cyan-500/20">
                          Chemistry
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <span className="p-2 bg-slate-900 border border-slate-800 rounded text-emerald-400">Organic (Carbon)</span>
                          <span className="p-2 bg-slate-900 border border-slate-800 rounded text-blue-400">Inorganic (Metals)</span>
                          <span className="p-2 bg-slate-900 border border-slate-800 rounded text-purple-400">Physical (Thermo)</span>
                          <span className="p-2 bg-slate-900 border border-slate-800 rounded text-amber-400">Analytical (Tests)</span>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'laws' && (
                      <div className="w-full space-y-3 text-left font-mono text-xs">
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                          <span className="text-cyan-400 font-bold">12g Carbon</span> + <span className="text-teal-400 font-bold">32g Oxygen</span>
                          <div className="text-slate-400 mt-1">➔ Exactly <span className="text-amber-400 font-bold">44g CO₂</span></div>
                        </div>
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                          <span className="text-purple-400 font-bold">Water H₂O</span> = Always 1g H : 8g O
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'dalton' && (
                      <div className="space-y-3 w-full text-center">
                        <div className="flex justify-center gap-3 items-center">
                          <div className="w-12 h-12 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-200">Atom</div>
                          <span className="text-slate-500">+</span>
                          <div className="w-12 h-12 rounded-full bg-cyan-500/30 border-2 border-cyan-400 flex items-center justify-center font-bold text-cyan-200">Atom</div>
                        </div>
                        <p className="text-xs text-slate-400">Dalton: Indivisible sphere units</p>
                      </div>
                    )}

                    {slide.visualType === 'atomic_mass' && (
                      <div className="w-full space-y-2 text-center">
                        <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
                          <p className="text-amber-400 font-bold">1 amu = 1/12th Carbon-12</p>
                          <p className="text-slate-400 mt-1">H₂SO₄ = 2(1) + 32 + 4(16) = 98 amu</p>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'mole' && (
                      <div className="w-full text-center space-y-2">
                        <div className="p-4 bg-cyan-950/40 border border-cyan-800 rounded-xl font-mono text-sm">
                          <p className="text-cyan-300 font-bold">1 Mole = 6.022 × 10²³ Particles</p>
                          <p className="text-emerald-400 text-xs mt-1">At STP = 22.4 Litres Gas</p>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'formula' && (
                      <div className="w-full font-mono text-xs space-y-2 text-left">
                        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                          Empirical: <span className="text-amber-400">CH₂O</span> (Mass: 30)
                        </div>
                        <div className="p-2.5 bg-slate-900 border border-slate-800 rounded">
                          Molecular: <span className="text-cyan-400">(CH₂O)₆ = C₆H₁₂O₆</span> (Mass: 180)
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'stoichiometry' && (
                      <div className="w-full text-xs font-mono space-y-2">
                        <p className="text-indigo-300">N₂ + 3 H₂ ➔ 2 NH₃</p>
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded text-slate-400">
                          1 mol N₂ needs 3 mol H₂
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'sigfigs' && (
                      <div className="w-full text-xs font-mono space-y-2 text-left">
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded text-cyan-300">
                          0.0250 L ➔ <span className="font-bold text-amber-400">3 Sig Figs</span>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'equivalent' && (
                      <div className="w-full text-xs font-mono space-y-2 text-left">
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded text-emerald-300">
                          H₂SO₄: Eq Wt = 98 / 2 = <span className="font-bold text-amber-400">49 g</span>
                        </div>
                      </div>
                    )}

                    {slide.visualType === 'titration' && (
                      <div className="w-full text-xs font-mono space-y-2 text-center">
                        <div className="p-3 bg-purple-950/40 border border-purple-800/50 rounded-xl text-purple-300">
                          N₁V₁ = N₂V₂
                          <p className="text-slate-400 text-[10px] mt-1">Equivalence Point Neutralization</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Bar */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-between items-center">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => {audioManager.play('tap'); 
                      triggerAudio('swoop');
                      setCurrentSlideIndex((prev) => prev - 1);
                      setSelectedNodeIndex(currentSlideIndex - 1);
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-sm font-semibold rounded-lg"
                  >
                    ← Previous Slide
                  </button>

                  <div className="flex gap-1">
                    {TEACHING_SLIDES.map((_, idx) => (
                      <div
                        key={idx}
                        onClick={() => {audioManager.play('tap'); 
                          triggerAudio('tap');
                          setCurrentSlideIndex(idx);
                          setSelectedNodeIndex(idx);
                        }}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                          idx === currentSlideIndex ? 'bg-cyan-400 scale-125' : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      triggerAudio('swoop');
                      if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                        setCurrentSlideIndex((prev) => prev + 1);
                        setSelectedNodeIndex(currentSlideIndex + 1);
                      } else {
                        setActiveTab('lab');
                      }
                    }}
                    className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-sm rounded-lg shadow-md shadow-cyan-500/20"
                  >
                    {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Slide →' : 'Open Laboratory →'}
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </main>
      )}

      {/* TAB 3: INTERACTIVE VISUAL LAB */}
      {activeTab === 'lab' && (
        <main className="max-w-6xl mx-auto space-y-6">
          {/* Lab Selector Tabs based on Selected Node */}
          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Interactive Chemistry Lab</span>
                <h2 className="text-2xl font-bold text-white">{NODE_INFO[ALL_NODE_IDS[selectedNodeIndex]].name}</h2>
              </div>
              <button
                onClick={() => {
                  triggerAudio('swoop');
                  setActiveTab('challenges');
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2"
              >
                <span>Take Mastery Challenge</span>
                <span>🏆</span>
              </button>
            </div>

            {/* NODE 1 LAB: Scope & Branches Explorer */}
            {selectedNodeIndex === 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p className="text-sm text-slate-300">Click a branch to inspect its domain and daily life applications in India:</p>
                  {[
                    { id: 'organic', name: 'Organic Chemistry', color: 'text-emerald-400', desc: 'Study of carbon compounds (Hydrocarbons, Aspirin, Paracetamol)' },
                    { id: 'inorganic', name: 'Inorganic Chemistry', color: 'text-blue-400', desc: 'Metals, minerals, coordination compounds & Urea fertilizer' },
                    { id: 'physical', name: 'Physical Chemistry', color: 'text-purple-400', desc: 'Thermodynamics, chemical kinetics & energy transformations' },
                    { id: 'analytical', name: 'Analytical Chemistry', color: 'text-amber-400', desc: 'Qualitative & quantitative analysis, titrations, water purity' },
                    { id: 'biochem', name: 'Biochemistry', color: 'text-pink-400', desc: 'Life chemical pathways, enzymes, DNA, metabolic cycles' }
                  ].map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => {
                        triggerAudio('tap');
                        setActiveBranch(branch.id);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        activeBranch === branch.id
                          ? 'bg-slate-800 border-cyan-400 shadow-lg shadow-cyan-500/10'
                          : 'bg-slate-950/60 border-slate-800 hover:bg-slate-850'
                      }`}
                    >
                      <span className={`font-bold text-sm ${branch.color}`}>{branch.name}</span>
                      <p className="text-xs text-slate-400 mt-1">{branch.desc}</p>
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-center items-center text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-cyan-500/40 flex items-center justify-center p-4 bg-cyan-950/20 text-cyan-300 font-bold text-lg mb-4 shadow-xl shadow-cyan-500/10">
                    {activeBranch.toUpperCase()}
                  </div>
                  <p className="text-xs text-cyan-400 font-mono mb-2">Central Science Connection</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeBranch === 'organic' && 'Connects directly with medicinal chemistry and industrial pharmaceutical synthesis across India.'}
                    {activeBranch === 'inorganic' && 'Connects with metallurgy in Jharkhand mineral belts and fertilizer production in Punjab.'}
                    {activeBranch === 'physical' && 'Applies physics principles (quantum mechanics, kinetics) to chemical systems.'}
                    {activeBranch === 'analytical' && 'Provides quality testing for drinking water and food standards.'}
                    {activeBranch === 'biochem' && 'Explains molecular biology pathways and agricultural bio-fertilizers.'}
                  </p>
                </div>
              </div>
            )}

            {/* NODE 2 LAB: Laws of Combination */}
            {selectedNodeIndex === 1 && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
                  <p className="text-cyan-400 font-bold mb-1">Law of Conservation of Mass Simulator</p>
                  <p className="text-slate-400">Carbon (C) + Oxygen (O₂) ➔ Carbon Dioxide (CO₂)</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Mass of Carbon Reactant: {lawCarbonMass} g</label>
                      <input
                        type="range"
                        min="6"
                        max="36"
                        step="6"
                        value={lawCarbonMass}
                        onChange={(e) => {
                          triggerAudio('pop');
                          setLawCarbonMass(Number(e.target.value));
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Mass of Oxygen Reactant: {lawOxygenMass} g</label>
                      <input
                        type="range"
                        min="16"
                        max="96"
                        step="16"
                        value={lawOxygenMass}
                        onChange={(e) => {
                          triggerAudio('pop');
                          setLawOxygenMass(Number(e.target.value));
                        }}
                        className="w-full accent-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center font-mono space-y-3">
                    <p className="text-xs text-slate-400">Total Mass Balance Scale</p>
                    <div className="flex justify-around items-center text-sm">
                      <div className="p-3 bg-cyan-950/40 border border-cyan-800 rounded-lg">
                        <p className="text-cyan-400 font-bold">Reactants</p>
                        <p className="text-white text-lg">{lawCarbonMass + lawOxygenMass} g</p>
                      </div>
                      <span className="text-amber-400 text-xl font-bold font-sans">==</span>
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg">
                        <p className="text-emerald-400 font-bold">Products (CO₂)</p>
                        <p className="text-white text-lg">{lawCarbonMass + lawOxygenMass} g</p>
                      </div>
                    </div>
                    <p className="text-xs text-emerald-400 font-semibold">✓ Mass is perfectly conserved!</p>
                  </div>
                </div>
              </div>
            )}

            {/* NODE 3 LAB: Dalton View Inspector */}
            {selectedNodeIndex === 2 && (
              <div className="space-y-6">
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      triggerAudio('tap');
                      setDaltonViewMode('dalton');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      daltonViewMode === 'dalton' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    1808 Dalton View
                  </button>
                  <button
                    onClick={() => {
                      triggerAudio('tap');
                      setDaltonViewMode('modern');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      daltonViewMode === 'modern' ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Modern Subatomic View
                  </button>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center">
                  {daltonViewMode === 'dalton' ? (
                    <div className="space-y-4">
                      <div className="w-24 h-24 mx-auto rounded-full bg-amber-500/20 border-4 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-sm">
                        Indivisible Atom
                      </div>
                      <p className="text-xs text-slate-300 max-w-md mx-auto">
                        Dalton Postulate: Matter consists of solid, indivisible particles that cannot be broken or destroyed.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-28 h-28 mx-auto rounded-full bg-purple-950/40 border-2 border-purple-500/50 flex flex-col items-center justify-center p-2 relative">
                        <div className="w-8 h-8 rounded-full bg-rose-500/40 border border-rose-400 text-[10px] flex items-center justify-center font-bold text-rose-200">
                          Nucleus
                        </div>
                        <div className="absolute top-2 left-2 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                        <span className="text-[10px] text-cyan-300 mt-2">e- Cloud</span>
                      </div>
                      <p className="text-xs text-purple-300 max-w-md mx-auto">
                        Modern Discovery: Atoms contain subatomic electrons, protons, and neutrons, and exist as isotopes!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* NODE 4 LAB: Atomic Mass & C-12 Calculator */}
            {selectedNodeIndex === 3 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {(['H2O', 'H2SO4', 'NaCl', 'CaCO3'] as const).map((mol) => (
                    <button
                      key={mol}
                      onClick={() => {
                        triggerAudio('tap');
                        setSelectedMolecule(mol);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        selectedMolecule === mol ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {mol}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center font-mono space-y-3">
                  <p className="text-xs text-slate-400">Carbon-12 Relative Scale Calculator</p>
                  <h3 className="text-xl font-extrabold text-cyan-300">{moleculeMassData?.name}</h3>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg inline-block text-sm">
                    <span className="text-slate-400">Sum: </span>
                    <span className="text-amber-300">{moleculeMassData?.sumStr}</span> ={' '}
                    <span className="text-emerald-400 font-bold">{moleculeMassData?.total} amu</span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Measured relative to 1/12th the mass of a Carbon-12 atom in ground state.
                  </p>
                </div>
              </div>
            )}

            {/* NODE 5 LAB: Mole Concept & STP Volume */}
            {selectedNodeIndex === 4 && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Number of Moles (n): {molePistonValue} mol</label>
                  <input
                    type="range"
                    min="0.25"
                    max="4.0"
                    step="0.25"
                    value={molePistonValue}
                    onChange={(e) => {
                      triggerAudio('pop');
                      setMolePistonValue(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4 font-mono text-center">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400">Particle Count (N)</p>
                    <p className="text-lg font-bold text-cyan-300">{(molePistonValue * 6.022).toFixed(3)} × 10²³</p>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400">Water Mass (m)</p>
                    <p className="text-lg font-bold text-emerald-300">{(molePistonValue * 18.016).toFixed(2)} g</p>
                  </div>
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-400">STP Gas Volume</p>
                    <p className="text-lg font-bold text-amber-300">{(molePistonValue * 22.4).toFixed(2)} Litres</p>
                  </div>
                </div>
              </div>
            )}

            {/* NODE 6 LAB: Formula Synthesizer */}
            {selectedNodeIndex === 5 && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Molar Mass of Compound: {synthMolarMass} g/mol</label>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="30"
                    value={synthMolarMass}
                    onChange={(e) => {
                      triggerAudio('pop');
                      setSynthMolarMass(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-center space-y-3">
                  <p className="text-xs text-slate-400">Empirical ➔ Molecular Derivation</p>
                  <div className="flex justify-center gap-4 text-xs">
                    <span className="p-2 bg-slate-900 border border-slate-800 rounded text-amber-300">Empirical: CH₂O (30 g/mol)</span>
                    <span className="p-2 bg-slate-900 border border-slate-800 rounded text-cyan-300">n-factor = {formulaSynthesisData.nFactor}</span>
                  </div>
                  <p className="text-xl font-bold text-emerald-400">Molecular Formula: {formulaSynthesisData.molFormula}</p>
                </div>
              </div>
            )}

            {/* NODE 7 LAB: Stoichiometry & Limiting Reagent Reactor */}
            {selectedNodeIndex === 6 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Available N₂ Moles: {reactN2Moles} mol</label>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.5"
                      value={reactN2Moles}
                      onChange={(e) => {
                        triggerAudio('pop');
                        setReactN2Moles(Number(e.target.value));
                      }}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Available H₂ Moles: {reactH2Moles} mol</label>
                    <input
                      type="range"
                      min="1.0"
                      max="6.0"
                      step="0.5"
                      value={reactH2Moles}
                      onChange={(e) => {
                        triggerAudio('pop');
                        setReactH2Moles(Number(e.target.value));
                      }}
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-center space-y-3">
                  <p className="text-xs text-slate-400">Haber Process Reaction: N₂ + 3 H₂ ➔ 2 NH₃</p>
                  <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-lg inline-block text-xs text-rose-300 font-bold">
                    Limiting Reagent: {reactionResult.limiting}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">NH₃ Produced: {reactionResult.nh3Produced} mol</div>
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">Unreacted N₂: {reactionResult.excessN2} mol</div>
                    <div className="p-2 bg-slate-900 border border-slate-800 rounded">Unreacted H₂: {reactionResult.excessH2} mol</div>
                  </div>
                </div>
              </div>
            )}

            {/* NODE 8 LAB: Sig Figs Detector */}
            {selectedNodeIndex === 7 && (
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Type or test a measured reading (e.g. 0.0250 or 12.30):</label>
                  <input
                    type="text"
                    value={sigFigInput}
                    onChange={(e) => setSigFigInput(e.target.value)}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-cyan-300 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center font-mono">
                  <p className="text-xs text-slate-400 mb-1">Significant Figures Count</p>
                  <p className="text-3xl font-extrabold text-amber-400">{countSigFigs(sigFigInput)} Sig Figs</p>
                  <p className="text-xs text-slate-500 mt-2">Leading zeros are not significant; captive and trailing zeros after decimals are significant.</p>
                </div>
              </div>
            )}

            {/* NODE 9 LAB: Equivalent Weight Calculator */}
            {selectedNodeIndex === 8 && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {(['H2SO4', 'NaOH', 'Na2CO3', 'KMnO4'] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        triggerAudio('tap');
                        setEqSubstance(sub);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        eqSubstance === sub ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                {eqSubstance === 'KMnO4' && (
                  <div className="flex justify-center gap-2 text-xs">
                    {(['acidic', 'neutral', 'alkaline'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          triggerAudio('tap');
                          setKmno4Medium(m);
                        }}
                        className={`px-3 py-1 rounded-lg capitalize font-medium ${
                          kmno4Medium === m ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {m} Medium
                      </button>
                    ))}
                  </div>
                )}

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-center space-y-3">
                  <p className="text-xs text-slate-400">Equivalent Weight = Molar Mass / n-factor</p>
                  <p className="text-sm text-cyan-300">{eqData.desc}</p>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg inline-block text-sm">
                    <span className="text-slate-400">E = {eqData.molMass} / {eqData.nFactor} = </span>
                    <span className="text-emerald-400 font-bold">{eqData.eqWeight} g</span>
                  </div>
                </div>
              </div>
            )}

            {/* NODE 10 LAB: Titration Simulator */}
            {selectedNodeIndex === 9 && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
                  <p className="text-xs text-slate-400 font-mono">Burette Titration Simulator (0.2 N NaOH ➔ 20 mL HCl)</p>

                  <div className="flex justify-center items-center gap-6">
                    <div className="w-16 h-48 bg-slate-900 border-2 border-slate-700 rounded-lg relative overflow-hidden flex flex-col justify-end p-1">
                      <div
                        className="w-full bg-cyan-400/60 rounded transition-all duration-300"
                        style={{ height: `${Math.min(100, (titrantVolume / 25) * 100)}%` }}
                      />
                    </div>

                    <div className="text-left font-mono text-xs space-y-2">
                      <p>Titrant Added: <span className="text-cyan-300 font-bold">{titrantVolume} mL</span></p>
                      <p>Target Equivalence: <span className="text-amber-300 font-bold">25.0 mL</span></p>

                      <button
                        disabled={titrationComplete}
                        onClick={() => {
                          triggerAudio('pop');
                          if (titrantVolume + 5 >= 25) {
                            setTitrantVolume(25);
                            setTitrationComplete(true);
                            triggerAudio('celebration');
                            triggerSpeech('Equivalence point reached! Indicator turned pale pink.');
                          } else {
                            setTitrantVolume((prev) => prev + 5);
                          }
                        }}
                        className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-white font-bold rounded-lg"
                      >
                        Drop 5 mL Titrant
                      </button>
                    </div>
                  </div>

                  {titrationComplete && (
                    <div className="p-3 bg-emerald-950/40 border border-emerald-800 rounded-lg font-mono text-xs text-emerald-300">
                      ✓ N₁V₁ = N₂V₂ ➔ 0.2 N × 25 mL = N_HCl × 20 mL ➔ N_HCl = 0.25 N!
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      )}

      {/* TAB 4: MASTERY CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto">
          {(() => {
            const challenge = CHALLENGES[currentChallengeIndex];
            const answeredOption = userAnswers[currentChallengeIndex];
            const hasAnswered = answeredOption !== null;

            return (
              <motion.div key={challenge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-800 shadow-2xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-mono px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                      Challenge {currentChallengeIndex + 1} of 10
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">{challenge.title}</h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{NODE_INFO[challenge.nodeId].shortCode}</span>
                </div>

                <p className="text-slate-200 text-base md:text-lg leading-relaxed">{challenge.question}</p>

                <div className="space-y-3">
                  {challenge.options.map((opt, optionIdx) => {
                    const isSelected = answeredOption === optionIdx;
                    const isCorrect = optionIdx === challenge.correctAnswer;
                    let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800';

                    if (hasAnswered) {
                      if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                      else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                    }

                    return (
                      <button
                        key={optionIdx}
                        disabled={hasAnswered}
                        onClick={() => handleChallengeAnswer(optionIdx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span className="text-sm">{opt}</span>
                        {hasAnswered && isCorrect && <span className="text-emerald-400 font-bold text-xs">✓ Correct</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Panel */}
                {challengeFeedback && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
                    <p className="text-xs text-slate-300 leading-relaxed">{challengeFeedback}</p>
                  </motion.div>
                )}

                {/* Footer Navigation */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowHint(true);
                      setCurrentHint(challenge.hint);
                      audioManager.play('hint');
                    }}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <span>💡 Show Hint</span>
                  </button>

                  <button
                    disabled={!hasAnswered}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 disabled:opacity-30 text-white font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge ��' : 'Complete Module 🎉'}
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </main>
      )}
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