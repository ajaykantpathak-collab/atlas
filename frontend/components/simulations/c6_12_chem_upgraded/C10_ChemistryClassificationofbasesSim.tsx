'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Beaker,
  Zap,
  Thermometer,
  BookOpen,
  Award,
  CheckCircle2,
  XCircle,
  Flame,
  RotateCcw,
  HelpCircle,
  Lightbulb,
  Layers,
  ShieldAlert,
  ArrowRight,
  ChevronRight,
  Atom,
  Play,
  Pause,
  RefreshCw,
  Eye,
  Scale,
  Droplets,
  Filter,
  Activity,
  Check,
  Info
} from 'lucide-react';

import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE IDENTIFIERS ---
const NODE_IDS = {
  CONCEPT: 'c10_chem_021',
  STRENGTH: 'c10_chem_022',
  CONCENTRATION: 'c10_chem_023',
  ACIDITY: 'c10_chem_024',
  SOLUBILITY: 'c10_chem_025',
  NEUTRALIZATION: 'c10_chem_026',
  METALLIC_SALTS: 'c10_chem_027',
  ACTION_OF_HEAT: 'c10_chem_028',
  BASE_THEORIES: 'c10_chem_029',
  APPLICATIONS: 'c10_chem_030',
} as const;

const ALL_NODE_IDS = [
  'c10_chem_021',
  'c10_chem_022',
  'c10_chem_023',
  'c10_chem_024',
  'c10_chem_025',
  'c10_chem_026',
  'c10_chem_027',
  'c10_chem_028',
  'c10_chem_029',
  'c10_chem_030',
];

// --- MANDATORY SCENARIO ---
const SCENARIO = {
  title: 'ICSE Chemical Analysis Lab: Classification & Dynamics of Bases',
  intro: 'Welcome to the ICSE Advanced Chemistry Simulation Unit. As a senior chemical researcher, you are tasked with identifying, classifying, and testing various basic substances ranging from strong alkalis to insoluble metal oxides.',
  context: 'In this simulation, you will analyze bases by their solubility, ionization strength, concentration, acidity, chemical reactions, and theoretical definitions (Arrhenius, Brønsted-Lowry, and Lewis). You will perform virtual experiments to verify key chemical laws.',
};

// --- MANDATORY DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'If Solution A is 0.001 M Sodium Hydroxide (NaOH, a strong base) and Solution B is 1.0 M Ammonium Hydroxide (NH₄OH, a weak base), which solution will produce a higher pH and higher electrical conductivity?',
  options: [
    'Solution A (0.001 M NaOH) because strong bases ionize 100%, producing more OH⁻ ions than dilute weak bases.',
    'Solution B (1.0 M NH₄OH) because high molar concentration always yields more OH⁻ ions than very low concentration strong bases.',
    'Both solutions will have identical pH (pH 14) because both are basic solutions.',
    'Neither, because conductivity depends only on temperature and not ion concentration or base strength.'
  ],
  correctIndex: 1,
  hintAfter: 'Calculations reveal that 1.0 M NH₄OH (α ≈ 1.3%) yields [OH⁻] ≈ 0.013 M (pH ≈ 12.1), whereas 0.001 M NaOH yields [OH⁻] = 0.001 M (pH = 11.0). High concentration of a weak base can exceed low concentration of a strong base in ion count!',
};

// --- EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Ionization & Strength Dynamics',
    instruction: 'Select different bases, adjust molarity (0.001 M to 2.0 M), and observe the degree of dissociation (α), pH, bulb brightness, and active ion population in aqueous solution.',
    interactionType: 'ionization-lab',
    nodeId: NODE_IDS.STRENGTH,
  },
  {
    title: 'Lab 2: Acidity & Solubility Classification Filter',
    instruction: 'Categorize compounds based on water solubility (Alkalis vs Insoluble Bases) and Acidity of Bases (Monoacidic, Diacidic, Triacidic hydroxides).',
    interactionType: 'acidity-solubility-matrix',
    nodeId: NODE_IDS.ACIDITY,
  },
  {
    title: 'Lab 3: Modern Theories Explorer (Arrhenius, Brønsted-Lowry, Lewis)',
    instruction: 'Investigate how ammonia (NH₃), hydroxide ions (OH⁻), and oxide ions (O²⁻) act as proton acceptors and lone-pair donors to form coordinate covalent bonds.',
    interactionType: 'theories-visualizer',
    nodeId: NODE_IDS.BASE_THEORIES,
  },
  {
    title: 'Lab 4: Metallic Salt Reactions & Thermal Decomposition',
    instruction: 'Add bases dropwise to metallic salts (Cu²⁺, Fe³⁺, Zn²⁺, Al³⁺) to observe characteristic hydroxide precipitates, excess alkali behavior, and thermal heating decomposition.',
    interactionType: 'reactions-lab',
    nodeId: NODE_IDS.METALLIC_SALTS,
  },
  {
    title: 'Lab 5: Industrial & Neutralization Applications',
    instruction: 'Apply basic compounds to real-world tasks: neutralizing acidic soil, formulating antacids, manufacturing soap, and setting building mortar.',
    interactionType: 'applications-lab',
    nodeId: NODE_IDS.APPLICATIONS,
  },
];

// --- PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens when excess Aqueous Sodium Hydroxide (NaOH) is added dropwise to a solution of Zinc Sulfate (ZnSO₄)?',
    options: [
      'A gelatinous white precipitate forms initially and remains insoluble even in excess NaOH.',
      'A gelatinous white precipitate of Zn(OH)₂ forms first, which dissolves in excess NaOH to give a clear solution of Sodium Zincate (Na₂ZnO₂).',
      'A dirty green precipitate forms which turns reddish brown upon standing.',
      'A deep blue complex solution forms immediately without any precipitate formation.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 4 (Reactions Lab), select ZnSO₄ salt, add NaOH dropwise past the initial precipitation point, and observe the amphoteric dissolution.',
    nodeId: NODE_IDS.METALLIC_SALTS,
  },
  {
    question: 'Predict: Upon heating solid Copper(II) Hydroxide [Cu(OH)₂] in a dry test tube, what physical and chemical change will occur?',
    options: [
      'It sublimes directly into a purple vapor without leaving any residue.',
      'It decomposes into black Copper(II) Oxide (CuO) and water vapor (steam).',
      'It melts into a yellow liquid and releases oxygen gas.',
      'It decomposes into reddish copper metal and ozone gas.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4 (Action of Heat tab), ignite the Bunsen burner under Cu(OH)₂ tube and observe color change from pale blue to jet black.',
    nodeId: NODE_IDS.ACTION_OF_HEAT,
  },
  {
    question: 'Predict: Why is Ammonia (NH₃) classified as a Lewis base despite not containing any hydroxide (OH⁻) group in its chemical formula?',
    options: [
      'Because it reacts with water to release hydrogen gas (H₂).',
      'Because the nitrogen atom in NH₃ possesses an unshared lone pair of electrons available for donation.',
      'Because it contains nitrogen which has high electronegativity.',
      'Because it turns red litmus paper yellow.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3 (Theories Explorer), switch to the Lewis model and observe nitrogen donating its lone pair to a proton or BF₃ molecule.',
    nodeId: NODE_IDS.BASE_THEORIES,
  }
];

// --- OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the conductivity circuit test for 0.1 M NaOH vs 0.1 M NH₄OH, what key difference in light bulb output is observed?',
    observableOptions: [
      'The bulb glows with intense brightness in NaOH solution, but glows dimly in NH₄OH solution.',
      'The bulb glows dimly in NaOH solution and intensely bright in NH₄OH solution.',
      'Both bulbs glow with equal high intensity.',
      'Neither solution conducts electricity.'
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.STRENGTH,
  },
  {
    question: 'Observation: When Iron(III) Chloride (FeCl₃) is reacted with Ammonium Hydroxide (NH₄OH), what precipitate color is deposited?',
    observableOptions: [
      'Pale green precipitate',
      'Reddish-brown precipitate of Fe(OH)₃',
      'Bright yellow precipitate',
      'Gelatinous white precipitate'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.METALLIC_SALTS,
  },
  {
    question: 'Observation: When calcium hydroxide solution (lime water) reacts with carbon dioxide gas in controlled excess, what sequential change occurs?',
    observableOptions: [
      'It turns milky instantly and remains permanently milky.',
      'It turns milky due to insoluble CaCO₃, then becomes clear again as soluble Ca(HCO₃)₂ forms in excess CO₂.',
      'It turns deep blue and boils spontaneously.',
      'It forms a yellow precipitate of calcium oxide.'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.NEUTRALIZATION,
  }
];

// --- REAL WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Environmental Remediation: Acid Mine Drainage Neutralization',
  description: 'An industrial plant discharges acidic mine wastewater containing 0.05 M H₂SO₄ at a flow rate of 10,000 Liters per hour. As an environmental engineer, you must calculate the precise quantity of Slaked Lime [Ca(OH)₂] required to neutralize the effluent to pH 7.0 before discharge into the river.',
  steps: [
    'Step 1: Write the balanced neutralization equation: H₂SO₄ + Ca(OH)₂ → CaSO₄(s) + 2H₂O',
    'Step 2: Determine acid flux per hour: Moles of H₂SO₄ = 10,000 L × 0.05 M = 500 moles of H₂SO₄ per hour.',
    'Step 3: Calculate required moles of Ca(OH)₂: Molar ratio H₂SO₄ : Ca(OH)₂ is 1:1, so 500 moles of Ca(OH)₂ are needed.',
    'Step 4: Convert moles to mass: Mass of Ca(OH)₂ = 500 mol × 74.1 g/mol = 37,050 g = 37.05 kg of Slaked Lime per hour.',
    'Conclusion: Dosing 37.05 kg/hr of Slaked Lime successfully neutralizes the stream, precipitating insoluble Gypsum (CaSO₄·2H₂O) and raising pH to safe environmental standards.'
  ],
};

// --- MISCONCEPTIONS DATABASE ---
const MISCONCEPTIONS = [
  {
    id: 'misc_solubility_strength',
    nodeId: NODE_IDS.STRENGTH,
    misconception: 'Equating Water Solubility or High Concentration with Base Strength',
    reality: 'Base strength depends exclusively on the degree of ionization (α) in water, not on solubility or molarity. NaOH is strong because α ≈ 100%. Ca(OH)₂ is sparingly soluble, but the dissolved portion ionizes completely (strong base). NH₄OH is highly soluble in water, but remains a weak base because α < 2%.',
    diagnosticTest: 'Can a 0.0001 M NaOH solution be classified as a strong base while a 12 M NH₄OH solution is classified as a weak base?',
  },
  {
    id: 'misc_oh_formula_requirement',
    nodeId: NODE_IDS.BASE_THEORIES,
    misconception: 'Believing a Chemical Formula Must Contain Hydroxide (OH) to Be a Base',
    reality: 'Under Brønsted-Lowry and Lewis definitions, bases do not require structural OH groups. Ammonia (NH₃), Carbonate ions (CO₃²⁻), and Oxide ions (O²⁻) act as bases by accepting protons or donating lone electron pairs.',
    diagnosticTest: 'Is NH₃ a base even though its molecular formula has no oxygen or hydroxide ion?',
  },
  {
    id: 'misc_ph_strength_only',
    nodeId: NODE_IDS.STRENGTH,
    misconception: 'Assuming pH Value Depends Solely on Base Strength Regardless of Concentration',
    reality: 'pH measures actual active [OH⁻] (or [H⁺]) concentration. Concentrated weak base (e.g., 2 M NH₄OH, pH ≈ 12.3) has higher pH than extremely dilute strong base (e.g., 10⁻⁵ M NaOH, pH ≈ 9.0).',
    diagnosticTest: 'Which has higher pH: 1.0 M weak base or 0.00001 M strong base?',
  },
  {
    id: 'misc_weak_no_ions',
    nodeId: NODE_IDS.STRENGTH,
    misconception: 'Believing Weak Bases Do Not Ionize or Produce Hydroxide Ions at All',
    reality: 'Weak bases ionize partially establishing dynamic equilibrium: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻. They produce OH⁻ ions and conduct electricity, but less effectively than strong bases.',
    diagnosticTest: 'Does an aqueous solution of ammonium hydroxide conduct electricity?',
  },
  {
    id: 'misc_lewis_negative_only',
    nodeId: NODE_IDS.BASE_THEORIES,
    misconception: 'Thinking Lewis Bases Must Only Be Negatively Charged Chemical Species',
    reality: 'Lewis bases are electron-pair donors. Neutral molecules with non-bonding unshared electron pairs like H₂O, NH₃, and CO are classic Lewis bases.',
    diagnosticTest: 'Can neutral H₂O act as a Lewis base when forming hydronium ion H₃O⁺?',
  },
  {
    id: 'misc_alkali_base_synonym',
    nodeId: NODE_IDS.SOLUBILITY,
    misconception: 'Thinking All Bases Are Alkalis',
    reality: 'All alkalis are bases, but NOT all bases are alkalis. Alkalis are water-soluble bases (e.g. NaOH, KOH, Ca(OH)₂). Insoluble bases like Cu(OH)₂, Fe(OH)₃, and CuO are bases but NOT alkalis.',
    diagnosticTest: 'Is CuO a base? Is CuO an alkali?',
  }
];

// --- DIAGNOSTIC QUESTIONS ---
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: NODE_IDS.CONCEPT,
    question: 'Which of the following compounds is a metallic oxide that behaves as an insoluble base?',
    options: ['NaOH', 'CuO', 'KOH', 'NH₄OH'],
    correctIndex: 1,
    explanation: 'Copper(II) Oxide (CuO) is a basic metallic oxide that reacts with acids to form salt and water, but is insoluble in water (hence not an alkali).'
  },
  {
    id: 'diag_2',
    nodeId: NODE_IDS.SOLUBILITY,
    question: 'Which statement accurately describes the relationship between bases and alkalis?',
    options: [
      'All bases are alkalis.',
      'All alkalis are water-soluble bases.',
      'Alkalis are insoluble basic oxides.',
      'Alkalis do not release hydroxide ions in aqueous solution.'
    ],
    correctIndex: 1,
    explanation: 'Alkalis are defined specifically as water-soluble bases that produce OH⁻ ions in aqueous medium.'
  },
  {
    id: 'diag_3',
    nodeId: NODE_IDS.ACIDITY,
    question: 'What is the acidity of Aluminium Hydroxide [Al(OH)₃]?',
    options: ['Monoacidic (1)', 'Diacidic (2)', 'Triacidic (3)', 'Tetraacidic (4)'],
    correctIndex: 2,
    explanation: 'Al(OH)₃ yields 3 hydroxide ions per molecule upon complete ionization, so its acidity is 3 (Triacidic base).'
  },
  {
    id: 'diag_4',
    nodeId: NODE_IDS.METALLIC_SALTS,
    question: 'What observation occurs when NaOH is added to a solution of Copper(II) Sulfate (CuSO₄)?',
    options: [
      'A dirty green precipitate is formed.',
      'A pale blue gelatinous precipitate of Cu(OH)₂ is formed, which is insoluble in excess NaOH.',
      'A reddish-brown precipitate is formed.',
      'A white precipitate dissolves immediately.'
    ],
    correctIndex: 1,
    explanation: 'CuSO₄ + 2NaOH → Cu(OH)₂↓ (pale blue precipitate) + Na₂SO₄. The precipitate does not dissolve in excess NaOH.'
  },
  {
    id: 'diag_5',
    nodeId: NODE_IDS.ACTION_OF_HEAT,
    question: 'Which of the following basic hydroxides does NOT decompose upon heating under normal lab conditions?',
    options: ['Cu(OH)₂', 'Fe(OH)₃', 'NaOH', 'Zn(OH)₂'],
    correctIndex: 2,
    explanation: 'Hydroxides of highly reactive alkali metals like Sodium (NaOH) and Potassium (KOH) are thermally stable and do not decompose on heating.'
  },
  {
    id: 'diag_6',
    nodeId: NODE_IDS.BASE_THEORIES,
    question: 'According to the Brønsted-Lowry concept, what is a base?',
    options: ['A substance that produces OH⁻ ions', 'A proton (H⁺) acceptor', 'An electron pair acceptor', 'A substance with pH < 7'],
    correctIndex: 1,
    explanation: 'Brønsted-Lowry theory defines a base as a proton (H⁺) acceptor.'
  },
  {
    id: 'diag_7',
    nodeId: NODE_IDS.BASE_THEORIES,
    question: 'In the formation of ammonium ion (NH₄⁺) from NH₃ and H⁺, Ammonia acts as a Lewis base because it:',
    options: [
      'Donates a proton to H⁺',
      'Donates an unshared electron pair to H⁺ forming a coordinate bond',
      'Accepts an electron pair from H⁺',
      'Releases OH⁻ directly into solution'
    ],
    correctIndex: 1,
    explanation: 'NH₃ donates its lone pair of electrons on nitrogen to H⁺ ion to form a dative/coordinate covalent bond.'
  },
  {
    id: 'diag_8',
    nodeId: NODE_IDS.APPLICATIONS,
    question: 'Which basic substance is used as an antacid to neutralize excess stomach HCl without causing caustic damage?',
    options: ['Concentrated NaOH', 'Magnesium Hydroxide [Mg(OH)₂ / Milk of Magnesia]', 'Calcium Oxide (Quicklime)', 'Potassium Hydroxide (KOH)'],
    correctIndex: 1,
    explanation: 'Mg(OH)₂ is a mild, sparingly soluble weak base that safely neutralizes gastric acidity without harming digestive tissues.'
  }
];

// --- BASE DATABASE FOR SIMULATION LABS ---
interface ChemicalBase {
  id: string;
  name: string;
  formula: string;
  type: 'Metallic Oxide' | 'Metallic Hydroxide' | 'Ammoniacal Base' | 'Non-metallic Base';
  strength: 'Strong' | 'Weak';
  alphaPercent: number; // Degree of ionization at 0.1 M
  solubility: 'Highly Soluble' | 'Sparingly Soluble' | 'Insoluble';
  isAlkali: boolean;
  acidity: 1 | 2 | 3; // Monoacidic, Diacidic, Triacidic
  color: string;
  solutionColor: string;
  precipitateColor: string;
  arrheniusRole: string;
  bronstedRole: string;
  lewisRole: string;
  heatDecompositionText: string;
  heatDecompositionEquation: string;
  applications: string[];
}

const CHEMICAL_BASES_DB: ChemicalBase[] = [
  {
    id: 'naoh',
    name: 'Sodium Hydroxide (Caustic Soda)',
    formula: 'NaOH',
    type: 'Metallic Hydroxide',
    strength: 'Strong',
    alphaPercent: 98,
    solubility: 'Highly Soluble',
    isAlkali: true,
    acidity: 1,
    color: '#3B82F6',
    solutionColor: 'rgba(59, 130, 246, 0.15)',
    precipitateColor: 'Clear / White Soluble',
    arrheniusRole: 'Dissociates completely into Na⁺ and OH⁻ ions in aqueous solution.',
    bronstedRole: 'Hydroxide ion (OH⁻) acts as a powerful proton acceptor.',
    lewisRole: 'Hydroxide ion (OH⁻) donates electron pairs to electron-deficient centers.',
    heatDecompositionText: 'Thermally stable. Does not decompose upon heating in laboratory Bunsen flame.',
    heatDecompositionEquation: 'NaOH (s) --[heat]--> No Thermal Decomposition',
    applications: ['Soap & detergent manufacturing', 'Paper pulp refining', 'Drain cleaner', 'Laboratory reagent']
  },
  {
    id: 'koh',
    name: 'Potassium Hydroxide (Caustic Potash)',
    formula: 'KOH',
    type: 'Metallic Hydroxide',
    strength: 'Strong',
    alphaPercent: 99,
    solubility: 'Highly Soluble',
    isAlkali: true,
    acidity: 1,
    color: '#2563EB',
    solutionColor: 'rgba(37, 99, 235, 0.15)',
    precipitateColor: 'Clear / White Soluble',
    arrheniusRole: 'Dissociates completely into K⁺ and OH⁻ ions.',
    bronstedRole: 'Hydroxide ion accepts protons rapidly.',
    lewisRole: 'OH⁻ donates lone pair to acidic species.',
    heatDecompositionText: 'Thermally stable. Melts at 360°C without decomposing into oxide.',
    heatDecompositionEquation: 'KOH (s) --[heat]--> Melts (No Decomposition)',
    applications: ['Soft soaps', 'Alkaline batteries electrolyte', 'CO₂ gas absorber', 'Biodiesel production']
  },
  {
    id: 'caoh2',
    name: 'Calcium Hydroxide (Slaked Lime)',
    formula: 'Ca(OH)₂',
    type: 'Metallic Hydroxide',
    strength: 'Strong',
    alphaPercent: 90, // Dissolved portion is strong
    solubility: 'Sparingly Soluble',
    isAlkali: true,
    acidity: 2,
    color: '#60A5FA',
    solutionColor: 'rgba(96, 165, 250, 0.2)',
    precipitateColor: 'White Suspension / Milky',
    arrheniusRole: 'Ionizes in water to give Ca²⁺ and 2 OH⁻ ions.',
    bronstedRole: '2 OH⁻ ions accept 2 H⁺ protons.',
    lewisRole: 'Oxygen lone pairs donate to metallic/acidic electron acceptors.',
    heatDecompositionText: 'Decomposes upon strong heating into Quicklime (CaO) and steam.',
    heatDecompositionEquation: 'Ca(OH)₂ (s) --[heat 580°C]--> CaO (s) + H₂O (g)',
    applications: ['White washing & mortar', 'Soil acidity correction', 'Water softening', 'Bleaching powder manufacture']
  },
  {
    id: 'mgoh2',
    name: 'Magnesium Hydroxide (Milk of Magnesia)',
    formula: 'Mg(OH)₂',
    type: 'Metallic Hydroxide',
    strength: 'Weak',
    alphaPercent: 12,
    solubility: 'Sparingly Soluble',
    isAlkali: false,
    acidity: 2,
    color: '#93C5FD',
    solutionColor: 'rgba(147, 197, 253, 0.25)',
    precipitateColor: 'White suspension',
    arrheniusRole: 'Partially ionizes yielding low concentration of OH⁻.',
    bronstedRole: 'Accepts protons from stomach acid (HCl).',
    lewisRole: 'OH⁻ groups donate electron pairs.',
    heatDecompositionText: 'Decomposes at 350°C into Magnesium Oxide (MgO) and steam.',
    heatDecompositionEquation: 'Mg(OH)₂ (s) --[heat 350°C]--> MgO (s) + H₂O (g)',
    applications: ['Antacid for stomach heartburn', 'Laxative formulation', 'Fire retardant additive']
  },
  {
    id: 'nh4oh',
    name: 'Ammonium Hydroxide (Aqueous Ammonia)',
    formula: 'NH₄OH / NH₃(aq)',
    type: 'Ammoniacal Base',
    strength: 'Weak',
    alphaPercent: 1.3,
    solubility: 'Highly Soluble',
    isAlkali: true,
    acidity: 1,
    color: '#A855F7',
    solutionColor: 'rgba(168, 85, 247, 0.15)',
    precipitateColor: 'Clear solution',
    arrheniusRole: 'Reacts with water in weak equilibrium: NH₃ + H₂O ⇌ NH₄⁺ + OH⁻.',
    bronstedRole: 'NH₃ molecule directly accepts H⁺ proton to form NH₄⁺.',
    lewisRole: 'Nitrogen lone pair (:NH₃) is donated to electron acceptors or metal cations.',
    heatDecompositionText: 'Decomposes rapidly upon mild heating, driving off pungent Ammonia gas (NH₃).',
    heatDecompositionEquation: 'NH₄OH (aq) --[heat]--> NH₃ (g)↑ + H₂O (l)',
    applications: ['Qualitative analysis reagent', 'Window cleaning spray', 'Fertilizer production (Ammonium nitrate)']
  },
  {
    id: 'cuoh2',
    name: 'Copper(II) Hydroxide',
    formula: 'Cu(OH)₂',
    type: 'Metallic Hydroxide',
    strength: 'Weak',
    alphaPercent: 2,
    solubility: 'Insoluble',
    isAlkali: false,
    acidity: 2,
    color: '#06B6D4',
    solutionColor: 'rgba(6, 182, 212, 0.3)',
    precipitateColor: 'Pale Blue Gelatinous Precipitate',
    arrheniusRole: 'Insoluble in water; limited direct Arrhenius ionization.',
    bronstedRole: 'Reacts with acids accepting H⁺ to form Cu²⁺ salts and water.',
    lewisRole: 'Oxygen atoms donate electron density to incoming acidic protons.',
    heatDecompositionText: 'Decomposes easily on heating into black Copper(II) Oxide (CuO) and water.',
    heatDecompositionEquation: 'Cu(OH)₂ (s) --[heat]--> CuO (s) [Black] + H₂O (g)',
    applications: ['Fungicide (Bordeaux mixture precursor)', 'Pigment in ceramics', 'Catalyst in organic reactions']
  },
  {
    id: 'feoh3',
    name: 'Iron(III) Hydroxide',
    formula: 'Fe(OH)₃',
    type: 'Metallic Hydroxide',
    strength: 'Weak',
    alphaPercent: 1,
    solubility: 'Insoluble',
    isAlkali: false,
    acidity: 3,
    color: '#B45309',
    solutionColor: 'rgba(180, 83, 9, 0.35)',
    precipitateColor: 'Reddish-Brown Precipitate',
    arrheniusRole: 'Insoluble in aqueous solution.',
    bronstedRole: 'Neutralizes acids by accepting 3 H⁺ per formula unit.',
    lewisRole: 'Hydroxide ligands act as electron pair donors.',
    heatDecompositionText: 'Decomposes on heating into reddish-brown Ferric Oxide (Fe₂O₃) and steam.',
    heatDecompositionEquation: '2Fe(OH)₃ (s) --[heat]--> Fe₂O₃ (s) [Red-Brown] + 3H₂O (g)',
    applications: ['Water treatment coagulant', 'Absorbent for toxic gases', 'Pigment formulation']
  },
  {
    id: 'aloh3',
    name: 'Aluminium Hydroxide',
    formula: 'Al(OH)₃',
    type: 'Metallic Hydroxide',
    strength: 'Weak',
    alphaPercent: 1.5,
    solubility: 'Insoluble',
    isAlkali: false,
    acidity: 3,
    color: '#64748B',
    solutionColor: 'rgba(100, 116, 139, 0.25)',
    precipitateColor: 'Gelatinous White Precipitate',
    arrheniusRole: 'Insoluble in water; amphoteric hydroxide.',
    bronstedRole: 'Accepts 3 protons when reacting with strong acids (e.g. HCl).',
    lewisRole: 'Donates electron pair to H⁺ or accepts electron pair when acting as amphoteric acid in excess NaOH.',
    heatDecompositionText: 'Decomposes at high temperatures into Alumina (Al₂O₃) and water.',
    heatDecompositionEquation: '2Al(OH)₃ (s) --[heat 1000°C]--> Al₂O₃ (s) + 3H₂O (g)',
    applications: ['Antacid formulations', 'Flame retardant filler', 'Water purification flocculant', 'Aluminium smelting']
  }
];

// --- CHALLENGES DATA (22 CHALLENGES ACROSS 3 TIERS) ---
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'calculation' | 'matching' | 'drag-sort';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Recall' | 'Understanding' | 'Application' | 'Analysis' | 'Evaluation';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES_DATA: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c1',
    nodeId: NODE_IDS.CONCEPT,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'According to the Arrhenius theory, what ion is produced by all bases when dissolved in water?',
    options: ['Hydronium ion (H₃O⁺)', 'Hydroxide ion (OH⁻)', 'Oxonium ion (O⁺)', 'Ammonium ion (NH₄⁺)'],
    correctIndex: 1,
    explanation: 'Arrhenius defined a base as a compound that dissociates in aqueous solution to yield Hydroxide ions (OH⁻).',
    hints: [
      'Think about the defining ion of alkalis in water.',
      'It carries a negative charge and consists of oxygen and hydrogen.',
      'The formula is OH⁻.'
    ]
  },
  {
    id: 'c2',
    nodeId: NODE_IDS.SOLUBILITY,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following basic oxides is soluble in water, forming an alkali?',
    options: ['Copper(II) Oxide (CuO)', 'Sodium Oxide (Na₂O)', 'Iron(III) Oxide (Fe₂O₃)', 'Zinc Oxide (ZnO)'],
    correctIndex: 1,
    explanation: 'Na₂O dissolves in water to form Sodium Hydroxide (NaOH), which is a soluble base (alkali). Heavy metal oxides like CuO, Fe₂O₃, and ZnO are insoluble.',
    hints: [
      'Look for an alkali metal compound from Group 1 of the periodic table.',
      'Group 1 metallic oxides react vigorously with water.',
      'Sodium Oxide forms caustic soda solution.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_IDS.ACIDITY,
    question: 'What is the acidity of Sodium Hydroxide (NaOH)?',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    options: ['Monoacidic (1)', 'Diacidic (2)', 'Triacidic (3)', 'Non-acidic (0)'],
    correctIndex: 0,
    explanation: 'NaOH releases 1 hydroxide ion per molecule in aqueous solution, so its acidity is 1 (monoacidic).',
    hints: [
      'Count the number of replaceable OH⁻ ions in one formula unit of NaOH.',
      'There is only 1 OH group.',
      'Mono- means one.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_IDS.STRENGTH,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is Potassium Hydroxide (KOH) classified as a strong base?',
    options: [
      'Because it has a very high molar mass.',
      'Because it ionizes almost 100% in aqueous solution to yield K⁺ and OH⁻ ions.',
      'Because it contains potassium which is a dense metal.',
      'Because it is insoluble in cold water.'
    ],
    correctIndex: 1,
    explanation: 'Base strength is determined by the degree of ionization (α). KOH dissociates completely into ions in water.',
    hints: [
      'Base strength depends on ionization percentage.',
      'Strong bases dissociate completely into ions.',
      'KOH has α ≈ 99-100%.'
    ]
  },
  {
    id: 'c5',
    nodeId: NODE_IDS.ACTION_OF_HEAT,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What color change is observed when light blue Copper(II) Hydroxide [Cu(OH)₂] is heated in a dry test tube?',
    options: [
      'Turns bright yellow',
      'Turns jet black (formation of CuO)',
      'Turns snow white',
      'Turns deep purple'
    ],
    correctIndex: 1,
    explanation: 'Cu(OH)₂ decomposes thermally to produce black Copper(II) Oxide (CuO) and water vapor.',
    hints: [
      'Copper(II) oxide is a dark solid.',
      'Think of oxidized copper residue.',
      'The pale blue solid turns black.'
    ]
  },
  {
    id: 'c6',
    nodeId: NODE_IDS.BASE_THEORIES,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How does Brønsted-Lowry theory define a base?',
    options: [
      'An electron pair acceptor',
      'A proton (H⁺) acceptor',
      'A substance producing H⁺ ions in water',
      'A neutral oxide only'
    ],
    correctIndex: 1,
    explanation: 'In the Brønsted-Lowry concept, acids are proton donors and bases are proton (H⁺) acceptors.',
    hints: [
      'Brønsted-Lowry theory centers on proton transfer.',
      'Acids give protons; bases receive protons.',
      'Base = Proton (H⁺) acceptor.'
    ]
  },
  {
    id: 'c7',
    nodeId: NODE_IDS.APPLICATIONS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which base is commonly used in agriculture to neutralize overly acidic soil?',
    options: ['Concentrated NaOH', 'Slaked Lime [Ca(OH)₂] or Quicklime [CaO]', 'Ammonium Hydroxide', 'Copper Hydroxide'],
    correctIndex: 1,
    explanation: 'Slaked lime [Ca(OH)₂] or Quicklime [CaO] is added to acidic agricultural soil (liming) to adjust pH to optimum levels.',
    hints: [
      'Farmers use calcium compounds for soil liming.',
      'It is cheap and mild enough not to scorch crops.',
      'Calcium hydroxide is Slaked Lime.'
    ]
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c8',
    nodeId: NODE_IDS.STRENGTH,
    type: 'calculation',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate the concentration of hydroxide ions [OH⁻] in a 0.05 M solution of Sodium Hydroxide (NaOH), assuming complete ionization.',
    correctAnswer: '0.05',
    explanation: 'Since NaOH is a strong monoacidic base (α = 100%), [OH⁻] = Molarity = 0.05 M.',
    hints: [
      'NaOH is a monoacidic strong base.',
      '1 mole of NaOH yields 1 mole of OH⁻ ions.',
      'For 0.05 M solution, [OH⁻] is directly 0.05 M.'
    ]
  },
  {
    id: 'c9',
    nodeId: NODE_IDS.STRENGTH,
    type: 'calculation',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If a 0.1 M solution of Ammonium Hydroxide (NH₄OH) is 1.3% ionized in water, calculate its active [OH⁻] concentration in Moles/Liter.',
    correctAnswer: '0.0013',
    explanation: '[OH⁻] = Molarity × α = 0.1 M × (1.3 / 100) = 0.0013 M.',
    hints: [
      'Degree of ionization α = 1.3% = 0.013.',
      'Multiply Molarity by α.',
      '0.1 × 0.013 = 0.0013 M.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_IDS.METALLIC_SALTS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When aqueous NaOH is added dropwise to Ferric Chloride (FeCl₃) solution, a reddish-brown precipitate is formed. What is the chemical formula of this precipitate?',
    options: ['Fe(OH)₂', 'Fe(OH)₃', 'Fe₂O₃', 'FeCl₂'],
    correctIndex: 1,
    explanation: 'FeCl₃ + 3NaOH → Fe(OH)₃↓ (reddish-brown precipitate) + 3NaCl.',
    hints: [
      'Ferric iron has an oxidation state of +3.',
      'The precipitate is Iron(III) hydroxide.',
      'Formula is Fe(OH)₃.'
    ]
  },
  {
    id: 'c11',
    nodeId: NODE_IDS.METALLIC_SALTS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which metallic hydroxide precipitate dissolves in EXCESS Sodium Hydroxide to form a clear sodium salt solution?',
    options: ['Copper(II) Hydroxide [Cu(OH)₂]', 'Iron(III) Hydroxide [Fe(OH)₃]', 'Zinc Hydroxide [Zn(OH)₂]', 'Ferrous Hydroxide [Fe(OH)₂]'],
    correctIndex: 2,
    explanation: 'Zinc Hydroxide is amphoteric. It dissolves in excess NaOH forming soluble Sodium Zincate [Na₂ZnO₂]: Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O.',
    hints: [
      'Look for an amphoteric metal hydroxide.',
      'Zinc hydroxides react with both acids and strong alkalis.',
      'It forms Sodium Zincate.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_IDS.BASE_THEORIES,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'In the Lewis acid-base reaction: BF₃ + :NH₃ → F₃B-NH₃, which species acts as the Lewis base and why?',
    options: [
      'BF₃ because it donates an electron pair.',
      'NH₃ because the nitrogen atom donates its unshared lone pair of electrons.',
      'BF₃ because it accepts a proton.',
      'NH₃ because it releases OH⁻ ions.'
    ],
    correctIndex: 1,
    explanation: 'A Lewis base is an electron-pair donor. Ammonia (:NH₃) has a non-bonding lone pair on nitrogen which it donates to electron-deficient Boron Trifluoride (BF₃).',
    hints: [
      'Lewis theory is about electron pairs.',
      'The donor of the lone pair is the Lewis base.',
      'Nitrogen in NH₃ has a lone pair of electrons.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_IDS.NEUTRALIZATION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What salt and product ratio are formed when 1 mole of Diacidic Base Ca(OH)₂ is completely neutralized by Hydrochloric Acid (HCl)?',
    options: [
      '1 mole CaCl₂ and 1 mole H₂O',
      '1 mole CaCl₂ and 2 moles H₂O (requires 2 moles HCl)',
      '2 moles CaCl₂ and 1 mole H₂O',
      '1 mole CaHCl and 1 mole H₂O'
    ],
    correctIndex: 1,
    explanation: 'Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O. 1 mole of diacidic base neutralizes 2 moles of monobasic acid yielding 2 moles of water.',
    hints: [
      'Balance the chemical equation: Ca(OH)₂ + _ HCl → CaCl₂ + _ H₂O.',
      'Ca(OH)₂ has 2 OH⁻ ions, requiring 2 H⁺ from 2 HCl molecules.',
      'Yields 1 CaCl₂ and 2 H₂O.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_IDS.ACTION_OF_HEAT,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When Ammonium Hydroxide (NH₄OH) solution is gently heated, what gas is evolved that turns damp red litmus paper blue?',
    options: ['Nitrogen dioxide (NO₂)', 'Ammonia gas (NH₃)', 'Hydrogen gas (H₂)', 'Oxygen gas (O₂)'],
    correctIndex: 1,
    explanation: 'NH₄OH (aq) --[heat]--> NH₃ (g)↑ + H₂O (l). Ammonia is an alkaline gas that turns moist red litmus blue.',
    hints: [
      'It is a characteristic pungent alkaline gas.',
      'Contains nitrogen and hydrogen.',
      'Formula is NH₃.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_IDS.CONCENTRATION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What distinguishes a Concentrated Base solution from a Strong Base solution?',
    options: [
      'They are identical terms with no difference.',
      'Concentrated refers to a high mass/moles of base per unit volume of solution; Strong refers to a high percentage of ionization (α) in water.',
      'Concentrated means α = 100%; Strong means high solubility.',
      'Concentrated bases always have pH 14, whereas strong bases have pH 7.'
    ],
    correctIndex: 1,
    explanation: 'Concentration is a quantitative measure of amount of solute per volume (molarity), whereas strength is an intrinsic chemical property indicating ionization extent.',
    hints: [
      'Concentration = solute quantity per unit volume.',
      'Strength = degree of ionization (α).',
      'A base can be concentrated yet weak (e.g. 15 M NH₄OH).'
    ]
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'c16',
    nodeId: NODE_IDS.ACIDITY,
    type: 'calculation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How many grams of Sodium Hydroxide (NaOH, molar mass = 40.0 g/mol) are required to prepare 500 mL of a 0.25 M solution?',
    correctAnswer: '5.0',
    explanation: 'Moles required = Molarity × Volume (L) = 0.25 mol/L × 0.5 L = 0.125 mol. Mass = 0.125 mol × 40.0 g/mol = 5.0 grams.',
    hints: [
      'Moles = Molarity × Volume in Liters.',
      'Volume = 500 mL = 0.5 L.',
      '0.25 × 0.5 × 40.0 = 5.0 g.'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_IDS.METALLIC_SALTS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Both Zinc Hydroxide [Zn(OH)₂] and Aluminium Hydroxide [Al(OH)₃] form white precipitates with NaOH and NH₄OH. How can you chemically distinguish Zn²⁺ from Al³⁺ using Ammonium Hydroxide?',
    options: [
      'Zn(OH)₂ dissolves in EXCESS NH₄OH to form a soluble tetraammine complex [Zn(NH₃)₄]²⁺, whereas Al(OH)₃ remains INSOLUBLE in excess NH₄OH.',
      'Al(OH)₃ turns blue with excess NH₄OH, while Zn(OH)₂ turns green.',
      'Al(OH)₃ dissolves in excess NH₄OH, while Zn(OH)₂ remains insoluble.',
      'Neither precipitate reacts with NH₄OH.'
    ],
    correctIndex: 0,
    explanation: 'Zn(OH)₂ dissolves in excess NH₄OH forming complex tetraamminezinc(II) ions [Zn(NH₃)₄]²⁺. Al(OH)₃ does not form an ammine complex and stays insoluble in excess NH₄OH.',
    hints: [
      'Zinc forms a soluble ammine complex with excess ammonia solution.',
      'Aluminium hydroxide does NOT dissolve in excess ammonium hydroxide.',
      'Tetraamminezinc complex is formed.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_IDS.BASE_THEORIES,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Identify the conjugate base of the weak acid Hydrogen Sulfate ion (HSO₄⁻) under Brønsted-Lowry theory:',
    options: ['H₂SO₄', 'SO₄²⁻', 'H₃O⁺', 'OH⁻'],
    correctIndex: 1,
    explanation: 'When HSO₄⁻ donates a proton (H⁺), it forms its conjugate base, Sulfate ion (SO₄²⁻): HSO₄⁻ ⇌ H⁺ + SO₄²⁻.',
    hints: [
      'A conjugate base is formed when an acid loses one H⁺ proton.',
      'Remove H⁺ from HSO₄⁻.',
      'The remaining species is SO₄��⁻.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_IDS.ACTION_OF_HEAT,
    type: 'calculation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'When 19.5 grams of Copper(II) Hydroxide [Cu(OH)₂, molar mass = 97.5 g/mol] are completely decomposed by heating, what mass (in grams) of black Copper(II) Oxide (CuO, molar mass = 79.5 g/mol) is obtained?',
    correctAnswer: '15.9',
    explanation: 'Cu(OH)₂ → CuO + H₂O. Moles of Cu(OH)₂ = 19.5 / 97.5 = 0.20 mol. Moles of CuO = 0.20 mol. Mass of CuO = 0.20 mol × 79.5 g/mol = 15.9 grams.',
    hints: [
      'Moles of Cu(OH)₂ = 19.5 / 97.5 = 0.2 mol.',
      'Stoichiometric ratio is 1 : 1.',
      'Mass of CuO = 0.2 × 79.5 = 15.9 g.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_IDS.STRENGTH,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'A 0.01 M solution of Monobasic Strong Base NaOH has pH = 12.0. If this solution is diluted by adding pure water to 100 times its original volume, what is the new pH?',
    options: ['pH 14.0', 'pH 10.0', 'pH 7.0', 'pH 2.0'],
    correctIndex: 1,
    explanation: 'Diluting 100-fold decreases [OH⁻] by 100 times: 0.01 M / 100 = 0.0001 M = 10⁻⁴ M. pOH = -log(10⁻⁴) = 4. pH = 14 - pOH = 14 - 4 = 10.0.',
    hints: [
      'Diluting by 100 reduces [OH⁻] concentration by 10².',
      'New [OH⁻] = 10⁻⁴ M.',
      'pOH = 4, so pH = 14 - 4 = 10.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_IDS.APPLICATIONS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why is Calcium Hydroxide [Ca(OH)₂] preferred over Sodium Hydroxide (NaOH) for industrial soil neutralisation and mortar formulation?',
    options: [
      'Because NaOH is too caustic/corrosive, highly hygroscopic, expensive, and can burn plant roots or wash away rapidly.',
      'Because NaOH is completely insoluble in water.',
      'Because Ca(OH)₂ is a strong acid.',
      'Because Ca(OH)₂ produces toxic gases upon reaction.'
    ],
    correctIndex: 0,
    explanation: 'Ca(OH)₂ is mild, sparingly soluble (providing long-term slow release neutralization), non-deliquescent, economical, and reacts with atmospheric CO₂ to harden into solid CaCO₃ (mortar effect).',
    hints: [
      'NaOH is extremely caustic and very soluble (burns soil).',
      'Ca(OH)₂ has low solubility and slow sustained release.',
      'Ca(OH)₂ sets by absorbing CO₂.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_IDS.NEUTRALIZATION,
    type: 'calculation',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What volume in milliliters (mL) of 0.50 M Hydrochloric Acid (HCl) is required to completely neutralize 25.0 mL of 0.20 M Diacidic Base Calcium Hydroxide [Ca(OH)₂]?',
    correctAnswer: '20.0',
    explanation: 'Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O. Moles of OH⁻ = 2 × (0.025 L × 0.20 M) = 0.010 mol. Moles of H⁺ needed = 0.010 mol. Volume HCl = Moles / Molarities = 0.010 mol / 0.50 M = 0.020 L = 20.0 mL.',
    hints: [
      'Ca(OH)₂ has 2 OH⁻ per mole (n = 2).',
      'Total equivalents of base = 2 × 25 mL × 0.20 M = 10 mmol.',
      'Volume HCl = 10 mmol / 0.50 M = 20.0 mL.'
    ]
  }
];

// --- 3 TOPIC SPECIFIC SVG DIAGRAM COMPONENTS ---

// 1. Acidity of Bases Visualizer SVG
const AcidityDiagramSVG: React.FC<{ acidity: number; formula: string; name: string }> = ({ acidity, formula, name }) => {
  return (
    <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-inner">
      <defs>
        <radialGradient id="cationGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="ohGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#831843" stopOpacity="0.3" />
        </radialGradient>
      </defs>

      {/* Grid Lines */}
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid)" />

      <text x="250" y="25" textAnchor="middle" className="text-xs font-bold fill-blue-400 uppercase tracking-widest">
        Acidity of Base Visualizer: Replaceable OH⁻ Ions
      </text>

      {/* Central Metal Cation */}
      <g transform="translate(140, 130)">
        <circle r="42" fill="url(#cationGlow)" stroke="#60A5FA" strokeWidth="2.5" />
        <text x="0" y="-5" textAnchor="middle" className="text-lg font-extrabold fill-white">
          {formula.replace(/[\(\)0-9]/g, '')}
        </text>
        <text x="0" y="14" textAnchor="middle" className="text-[10px] font-semibold fill-blue-200">
          Cation Center
        </text>
      </g>

      {/* OH Hydroxide Arms */}
      {[...Array(acidity)].map((_, i) => {
        const angle = (i - (acidity - 1) / 2) * 50;
        const rad = (angle * Math.PI) / 180;
        const targetX = 140 + Math.cos(rad) * 160;
        const targetY = 130 + Math.sin(rad) * 75;

        return (
          <g key={i}>
            {/* Coordinate / Ionic Link line */}
            <line
              x1="140"
              y1="130"
              x2={targetX}
              y2={targetY}
              stroke="#EC4899"
              strokeWidth="3"
              strokeDasharray="4 3"
              className="animate-pulse"
            />
            {/* Hydroxide Node */}
            <g transform={`translate(${targetX}, ${targetY})`}>
              <circle r="26" fill="url(#ohGlow)" stroke="#F472B6" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" className="text-xs font-bold fill-white">
                OH⁻
              </text>
              <text x="0" y="38" textAnchor="middle" className="text-[9px] fill-pink-300 font-medium">
                Ion #{i + 1}
              </text>
            </g>
          </g>
        );
      })}

      {/* Info Badge */}
      <g transform="translate(350, 70)">
        <rect x="0" y="0" width="135" height="120" rx="8" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
        <text x="67.5" y="22" textAnchor="middle" className="text-xs font-bold fill-emerald-400">
          CLASSIFICATION
        </text>
        <text x="67.5" y="45" textAnchor="middle" className="text-sm font-extrabold fill-white">
          {acidity === 1 ? 'Monoacidic' : acidity === 2 ? 'Diacidic' : 'Triacidic'}
        </text>
        <text x="67.5" y="65" textAnchor="middle" className="text-[10px] fill-slate-300">
          Acidity = {acidity}
        </text>
        <line x1="15" y1="75" x2="120" y2="75" stroke="#334155" strokeWidth="1" />
        <text x="67.5" y="93" textAnchor="middle" className="text-[9px] fill-slate-400">
          1 mol base reacts with
        </text>
        <text x="67.5" y="108" textAnchor="middle" className="text-[10px] font-bold fill-pink-400">
          {acidity} mol H⁺ (HCl)
        </text>
      </g>
    </svg>
  );
};

// 2. Lewis Coordinate Covalent Bond SVG
const LewisTheorySVG: React.FC = () => {
  return (
    <svg viewBox="0 0 520 220" className="w-full h-auto bg-slate-950 rounded-xl p-2 border border-purple-900/60 shadow-lg">
      <text x="260" y="24" textAnchor="middle" className="text-xs font-bold fill-purple-400 uppercase tracking-wider">
        Lewis Base Concept: Lone Pair Donation (:NH₃ + H⁺ → NH₄⁺)
      </text>

      {/* Ammonia Molecule (Lewis Base) */}
      <g transform="translate(100, 120)">
        {/* Nitrogen Center */}
        <circle r="30" fill="#7C3AED" stroke="#A78BFA" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" className="text-sm font-bold fill-white">
          :N
        </text>

        {/* Unshared Lone Pair Electrons */}
        <circle cx="20" cy="-20" r="4.5" fill="#F43F5E" className="animate-ping" />
        <circle cx="20" cy="-20" r="4.5" fill="#F43F5E" />
        <circle cx="32" cy="-12" r="4.5" fill="#F43F5E" />

        {/* Hydrogens */}
        <line x1="-20" y1="20" x2="-40" y2="40" stroke="#A78BFA" strokeWidth="2" />
        <circle cx="-45" cy="45" r="14" fill="#3B82F6" />
        <text x="-45" y="49" textAnchor="middle" className="text-xs fill-white font-bold">H</text>

        <line x1="0" y1="30" x2="0" y2="55" stroke="#A78BFA" strokeWidth="2" />
        <circle cx="0" cy="62" r="14" fill="#3B82F6" />
        <text x="0" y="66" textAnchor="middle" className="text-xs fill-white font-bold">H</text>

        <line x1="-28" y1="-10" x2="-52" y2="-20" stroke="#A78BFA" strokeWidth="2" />
        <circle cx="-58" cy="-24" r="14" fill="#3B82F6" />
        <text x="-58" y="-20" textAnchor="middle" className="text-xs fill-white font-bold">H</text>

        <text x="0" y="92" textAnchor="middle" className="text-[11px] font-bold fill-purple-300">
          Lewis Base (NH₃)
        </text>
      </g>

      {/* Plus Symbol */}
      <text x="215" y="125" textAnchor="middle" className="text-2xl font-bold fill-slate-400">+</text>

      {/* Proton H+ (Lewis Acid) */}
      <g transform="translate(265, 120)">
        <circle r="22" fill="#EF4444" stroke="#F87171" strokeWidth="2" />
        <text x="0" y="5" textAnchor="middle" className="text-sm font-extrabold fill-white">
          H⁺
        </text>
        <text x="0" y="-30" textAnchor="middle" className="text-[10px] font-bold fill-red-300">
          Empty Orbital
        </text>
        <text x="0" y="45" textAnchor="middle" className="text-[11px] font-bold fill-red-400">
          Lewis Acid
        </text>
      </g>

      {/* Reaction Arrow */}
      <g transform="translate(325, 120)">
        <line x1="0" y1="0" x2="40" y2="0" stroke="#E2E8F0" strokeWidth="3" markerEnd="url(#arrow)" />
        <path d="M 30 -6 L 42 0 L 30 6 Z" fill="#E2E8F0" />
      </g>

      {/* Ammonium Adduct Complex */}
      <g transform="translate(430, 120)">
        <rect x="-48" y="-45" width="96" height="90" rx="10" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x="44" y="-35" className="text-xs font-bold fill-emerald-400">+</text>

        <circle r="24" fill="#7C3AED" />
        <text x="0" y="4" textAnchor="middle" className="text-xs font-bold fill-white">N</text>

        {/* Dative Arrow Bond */}
        <line x1="12" y1="-12" x2="28" y2="-28" stroke="#F43F5E" strokeWidth="3" />
        <circle cx="32" cy="-32" r="11" fill="#EF4444" />
        <text x="32" y="-29" textAnchor="middle" className="text-[9px] font-bold fill-white">H</text>

        <text x="0" y="62" textAnchor="middle" className="text-[11px] font-bold fill-emerald-300">
          Dative Bond Product (NH₄⁺)
        </text>
      </g>
    </svg>
  );
};

// 3. Precipitation & Action of Heat SVG
const ReactionsVisualizerSVG: React.FC<{
  saltName: string;
  precipitateColor: string;
  precipitateFormula: string;
  isHeating: boolean;
  heatProduct: string;
}> = ({ saltName, precipitateColor, precipitateFormula, isHeating, heatProduct }) => {
  return (
    <svg viewBox="0 0 520 250" className="w-full h-auto bg-slate-900 rounded-xl p-2 border border-slate-800 shadow-inner">
      <text x="260" y="22" textAnchor="middle" className="text-xs font-bold fill-cyan-400 uppercase tracking-widest">
        Precipitation Lab & Thermal Decomposition Simulation
      </text>

      {/* Test Tube Graphic */}
      <g transform="translate(160, 45)">
        {/* Test tube glass */}
        <path
          d="M 30 0 L 30 140 A 30 30 0 0 1 -30 140 L -30 0 Z"
          fill="rgba(255, 255, 255, 0.05)"
          stroke="#94A3B8"
          strokeWidth="3"
        />

        {/* Liquid level */}
        <path
          d="M 28 60 L 28 140 A 28 28 0 0 1 -28 140 L -28 60 Z"
          fill={isHeating ? '#1E293B' : 'rgba(14, 165, 233, 0.25)'}
        />

        {/* Precipitate Deposit or Oxide Residue */}
        <path
          d="M 26 110 A 26 26 0 0 1 -26 110 L -26 140 A 26 26 0 0 1 26 140 Z"
          fill={isHeating ? '#0F172A' : precipitateColor}
          className="transition-all duration-700"
        />

        {/* Heating Steam / Vapor effects if flame active */}
        {isHeating && (
          <g className="animate-bounce">
            <path d="M -10 -15 Q 0 -30 10 -45" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
            <path d="M 0 -15 Q 10 -30 -5 -50" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
            <text x="25" y="-30" className="text-[10px] fill-cyan-300 font-bold">H₂O (steam)↑</text>
          </g>
        )}
      </g>

      {/* Bunsen Burner flame if heating */}
      {isHeating && (
        <g transform="translate(160, 215)">
          <path d="M -15 20 L 15 20 L 10 0 L -10 0 Z" fill="#64748B" />
          {/* Flame outer */}
          <path d="M -12 0 Q 0 -35 12 0 Z" fill="#F97316" className="animate-pulse" />
          {/* Flame inner */}
          <path d="M -6 0 Q 0 -20 6 0 Z" fill="#FACC15" />
        </g>
      )}

      {/* Reaction Specs Card */}
      <g transform="translate(270, 50)">
        <rect width="220" height="170" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
        <text x="110" y="24" textAnchor="middle" className="text-xs font-bold fill-slate-300">
          REACTION OBSERVATION
        </text>

        {!isHeating ? (
          <>
            <text x="15" y="55" className="text-[11px] fill-slate-400">Reactants:</text>
            <text x="15" y="72" className="text-xs font-bold fill-cyan-300">{saltName} + NaOH</text>

            <text x="15" y="102" className="text-[11px] fill-slate-400">Precipitate Deposited:</text>
            <text x="15" y="120" className="text-xs font-bold fill-emerald-400">{precipitateFormula}</text>

            <text x="15" y="145" className="text-[10px] fill-amber-300 italic">
              *Add excess NaOH to test amphoteric solubility.
            </text>
          </>
        ) : (
          <>
            <text x="15" y="55" className="text-[11px] fill-slate-400">Thermal Process:</text>
            <text x="15" y="72" className="text-xs font-bold fill-amber-400">Hydroxide Pyrolysis</text>

            <text x="15" y="102" className="text-[11px] fill-slate-400">Solid Oxide Residue:</text>
            <text x="15" y="120" className="text-xs font-bold fill-rose-400">{heatProduct}</text>

            <text x="15" y="148" className="text-[10px] fill-cyan-300 font-medium">
              Water of composition driven off as steam.
            </text>
          </>
        )}
      </g>
    </svg>
  );
};

// --- INTERACTIVE CANVAS: BEAKER / ION DYNAMICS SIMULATOR ---
interface BeakerCanvasProps {
  base: ChemicalBase;
  molarity: number;
  temperature: number;
}

const BeakerCanvas: React.FC<BeakerCanvasProps> = ({ base, molarity, temperature }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Compute active ion concentration & pH
  const effectiveAlpha = useMemo(() => {
    if (base.strength === 'Strong') return Math.min(1.0, base.alphaPercent / 100);
    // Dilution law effect: α increases slightly with dilution for weak bases
    return Math.min(0.25, (base.alphaPercent / 100) * Math.sqrt(0.1 / Math.max(0.001, molarity)));
  }, [base, molarity]);

  const ohConcentration = useMemo(() => {
    return molarity * base.acidity * effectiveAlpha;
  }, [molarity, base.acidity, effectiveAlpha]);

  const pOH = useMemo(() => {
    if (ohConcentration <= 0) return 7;
    return -Math.log10(ohConcentration);
  }, [ohConcentration]);

  const calculatedpH = useMemo(() => {
    return Math.min(14, Math.max(7, 14 - pOH));
  }, [pOH]);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Generate ions based on concentration & alpha
    const cationCount = Math.round(molarity * 25 * effectiveAlpha);
    const ohCount = Math.round(molarity * 25 * base.acidity * effectiveAlpha);
    const neutralCount = base.strength === 'Weak' ? Math.round(molarity * 30 * (1 - effectiveAlpha)) : 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'cation' | 'oh' | 'neutral';
      radius: number;
    }

    const particles: Particle[] = [];
    const width = canvas.width;
    const height = canvas.height;

    // Heat speed factor
    const speedFactor = 0.5 + (temperature / 100) * 1.5;

    for (let i = 0; i < cationCount; i++) {
      particles.push({
        x: 40 + Math.random() * (width - 80),
        y: 60 + Math.random() * (height - 90),
        vx: (Math.random() - 0.5) * 1.5 * speedFactor,
        vy: (Math.random() - 0.5) * 1.5 * speedFactor,
        type: 'cation',
        radius: 7
      });
    }

    for (let i = 0; i < ohCount; i++) {
      particles.push({
        x: 40 + Math.random() * (width - 80),
        y: 60 + Math.random() * (height - 90),
        vx: (Math.random() - 0.5) * 2.0 * speedFactor,
        vy: (Math.random() - 0.5) * 2.0 * speedFactor,
        type: 'oh',
        radius: 6
      });
    }

    for (let i = 0; i < neutralCount; i++) {
      particles.push({
        x: 40 + Math.random() * (width - 80),
        y: 60 + Math.random() * (height - 90),
        vx: (Math.random() - 0.5) * 1.0 * speedFactor,
        vy: (Math.random() - 0.5) * 1.0 * speedFactor,
        type: 'neutral',
        radius: 9
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Glass Beaker
      ctx.strokeStyle = '#64748B';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(30, 30);
      ctx.lineTo(30, height - 20);
      ctx.lineTo(width - 30, height - 20);
      ctx.lineTo(width - 30, 30);
      ctx.stroke();

      // Liquid background color fill
      ctx.fillStyle = base.solutionColor || 'rgba(59, 130, 246, 0.1)';
      ctx.fillRect(32, 45, width - 64, height - 66);

      // Water level line
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(32, 45);
      ctx.lineTo(width - 32, 45);
      ctx.stroke();

      // 2. Animate and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x - p.radius < 34 || p.x + p.radius > width - 34) p.vx *= -1;
        if (p.y - p.radius < 47 || p.y + p.radius > height - 24) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.type === 'cation') {
          ctx.fillStyle = '#3B82F6'; // Blue cation
          ctx.fill();
          ctx.strokeStyle = '#93C5FD';
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 8px sans-serif';
          ctx.fillText('M⁺', p.x - 5, p.y + 3);
        } else if (p.type === 'oh') {
          ctx.fillStyle = '#EC4899'; // Pink OH-
          ctx.fill();
          ctx.strokeStyle = '#F472B6';
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 7px sans-serif';
          ctx.fillText('OH⁻', p.x - 7, p.y + 3);
        } else {
          ctx.fillStyle = '#64748B'; // Grey neutral molecule
          ctx.fill();
          ctx.strokeStyle = '#94A3B8';
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = '7px sans-serif';
          ctx.fillText('MOH', p.x - 8, p.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [base, molarity, temperature, effectiveAlpha]);

  // Calculate conductivity bulb brightness (0 to 100%)
  const bulbBrightness = Math.min(100, Math.round(ohConcentration * 350));

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white shadow-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Beaker Canvas */}
        <div className="relative flex justify-center">
          <canvas ref={canvasRef} width={280} height={200} className="rounded-lg shadow-inner bg-slate-950" />

          {/* pH Indicator Overlay Badge */}
          <div className="absolute top-2 right-4 bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-1 shadow text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Calculated pH</span>
            <span className="text-xl font-extrabold text-pink-400">{calculatedpH.toFixed(2)}</span>
          </div>
        </div>

        {/* Diagnostic Analytical Readings */}
        <div className="space-y-3">
          {/* Electrical Conductivity Apparatus */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap
                className={`w-6 h-6 ${
                  bulbBrightness > 50 ? 'text-yellow-400 animate-pulse' : bulbBrightness > 10 ? 'text-yellow-600' : 'text-slate-600'
                }`}
              />
              <div>
                <p className="text-xs font-bold text-slate-300">Conductivity Test Bulb</p>
                <p className="text-[10px] text-slate-400">Ion mobility & flux</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-yellow-400">{bulbBrightness}% Brightness</span>
            </div>
          </div>

          {/* Degree of Ionization Gauge */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400">Degree of Ionization (α):</span>
              <span className="text-blue-400 font-bold">{(effectiveAlpha * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, effectiveAlpha * 100)}%` }}
              />
            </div>
          </div>

          {/* Active Ion Concentration */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">[OH⁻] Concentration</span>
              <span className="font-mono text-pink-400 font-bold">{ohConcentration.toFixed(4)} M</span>
            </div>
            <div className="bg-slate-950 p-2 rounded border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Base Strength</span>
              <span className={`font-bold ${base.strength === 'Strong' ? 'text-emerald-400' : 'text-amber-400'}`}>
                {base.strength}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT IMPLEMENTATION ---
export default function C10_ChemistryClassificationofbasesSim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'labs' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab state
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [selectedBaseId, setSelectedBaseId] = useState<string>('naoh');
  const [molarity, setMolarity] = useState<number>(0.10);
  const [temperature, setTemperature] = useState<number>(25);

  // Precipitation & Heat lab state
  const [selectedSalt, setSelectedSalt] = useState<{ id: string; name: string; formula: string; pptColor: string; pptFormula: string; amphoteric: boolean }>({
    id: 'cuso4',
    name: 'Copper(II) Sulfate',
    formula: 'CuSO₄',
    pptColor: '#06B6D4',
    pptFormula: 'Cu(OH)₂ (Pale Blue)',
    amphoteric: false
  });
  const [addedDrops, setAddedDrops] = useState<number>(0);
  const [isHeating, setIsHeating] = useState<boolean>(false);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [calcInput, setCalcInput] = useState<string>('');
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Discovery / Prediction & Observation state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null, null]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintIndex, setHintIndex] = useState<number>(0);

  // SRS & BKT Mastery Engine state
  const [bktStateMap, setBktStateMap] = useState<Record<string, unknown>>(() => {
    const initialMap: Record<string, unknown> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState(id);
    });
    return initialMap;
  });

  const [srsItems, setSrsItems] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Timer for auto-hinting after inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000); // 12 seconds inactivity trigger
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, resetInactivityTimer]);

  // Current base reference object
  const currentBase = useMemo(() => {
    return CHEMICAL_BASES_DB.find((b) => b.id === selectedBaseId) || CHEMICAL_BASES_DB[0];
  }, [selectedBaseId]);

  // Challenge navigation & scoring logic
  const currentChallenge = CHALLENGES_DATA[currentChallengeIndex];

  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent discovery intuition!');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
    }
  };

  const handleChallengeSubmit = () => {
    if (isAnswerSubmitted) return;

    let correct = false;

    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === currentChallenge.correctIndex) {
        correct = true;
      }
    } else if (currentChallenge.type === 'calculation') {
      const numericUser = parseFloat(calcInput.trim());
      const numericTarget = parseFloat(currentChallenge.correctAnswer || '0');
      if (!isNaN(numericUser) && Math.abs(numericUser - numericTarget) < 0.05) {
        correct = true;
      }
    }

    setIsCorrect(correct);
    setIsAnswerSubmitted(true);

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktStateMap[nodeId] || createBKTState(nodeId);
    const updatedBKT = bktUpdate(currentBKT as Parameters<typeof bktUpdate>[0], correct);
    setBktStateMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS as Parameters<typeof sm2Update>[0], correct ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      setScore((prev) => prev + 10);
      audioManager.play('success');
      speechManager.speak('Correct analysis! Outstanding chemistry work.');
      setShowSparkle(true);
      if (currentChallengeIndex === CHALLENGES_DATA.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
        if (onComplete) onComplete(score + 10);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the chemical principle and try again.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setCalcInput('');
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setShowSparkle(false);
    setHintIndex(0);
    if (currentChallengeIndex < CHALLENGES_DATA.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 flex flex-col items-center">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Simulation Mastered! All Base Nodes Verified." />
      <SparkleBurst show={showSparkle} x={400} y={250} />

      {/* Main Header Container */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
              <Beaker className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-blue-400 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
                {SCENARIO.title}
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                ICSE Class 10 Chemistry • Nodes c10_chem_021 to c10_chem_030
              </p>
            </div>
          </div>

          {/* User Score & BKT Overall Mastery Indicator */}
          <div className="flex items-center gap-4">
            <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] uppercase text-slate-400 font-bold block">Lab Points</span>
                <span className="text-lg font-bold text-amber-300">{score} XP</span>
              </div>
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                speechManager.speak('Resetting laboratory apparatus.');
                setScore(0);
                setCurrentChallengeIndex(0);
                setIsAnswerSubmitted(false);
              }}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition border border-slate-700"
              title="Reset Simulation"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav className="flex flex-wrap gap-2 mt-6 border-t border-slate-800 pt-4">
          {[
            { id: 'discovery', label: '1. Discovery & Hypotheses', icon: Lightbulb },
            { id: 'labs', label: '2. Interactive Base Labs (5)', icon: Atom },
            { id: 'challenges', label: '3. Challenge Suite (22)', icon: BookOpen },
            { id: 'summary', label: '4. Node Mastery & Real World', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                    : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* Narrative Scenario Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-blue-400 flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-blue-400" /> Lab Mission Brief
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">{SCENARIO.context}</p>
          </div>

          {/* Discovery Question Component */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-md border border-amber-500/30">
                Discovery Challenge
              </span>
              <h3 className="text-base font-bold text-white">Pre-Investigation Intuition Test</h3>
            </div>

            <p className="text-sm md:text-base text-slate-200 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => {
                const isSelected = discoverySelected === idx;
                const isCorrectOption = idx === DISCOVERY_QUESTION.correctIndex;

                let btnStyle = 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-300';
                if (discoveryAnswered) {
                  if (isCorrectOption) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                  else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl border text-left text-xs md:text-sm font-medium transition-all ${btnStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <div className="bg-slate-950 border border-blue-900/50 p-4 rounded-xl text-xs md:text-sm text-blue-200 space-y-1">
                <p className="font-bold text-blue-400 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" /> Key Insight:
                </p>
                <p>{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* Prediction Questions Array Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-400" /> Interactive Predictions (Hypotheses)
            </h3>
            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-indigo-400">Prediction #{pIdx + 1}</p>
                  <p className="text-sm font-semibold text-white">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => {
                      const selected = predictionAnswers[pIdx] === oIdx;
                      const isRight = oIdx === pred.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            const next = [...predictionAnswers];
                            next[pIdx] = oIdx;
                            setPredictionAnswers(next);
                          }}
                          className={`p-3 text-left rounded-lg text-xs font-medium border transition ${
                            selected
                              ? isRight
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predictionAnswers[pIdx] !== null && (
                    <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pred.verifyInstruction}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: INTERACTIVE LABS (5 IN 1) */}
      {activeTab === 'labs' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* Lab Sub-Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveLabIndex(idx);
                }}
                className={`flex-1 min-w-[180px] px-3 py-2 rounded-lg text-xs font-bold transition text-center ${
                  activeLabIndex === idx
                    ? 'bg-blue-600 text-white shadow border border-blue-400'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-400'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Current Step Instruction Bar */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
            <Activity className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                Current Exploration Objective
              </h4>
              <p className="text-sm text-slate-200 mt-0.5">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
            </div>
          </div>

          {/* LAB 1: IONIZATION & STRENGTH DYNAMICS */}
          {activeLabIndex === 0 && (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Select Base */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Select Base Specimen</label>
                  <select
                    value={selectedBaseId}
                    onChange={(e) => {
                      audioManager.play('tap');
                      setSelectedBaseId(e.target.value);
                    }}
                    className="w-full bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg p-2.5 outline-none focus:border-blue-500"
                  >
                    {CHEMICAL_BASES_DB.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} [{b.formula}] - {b.strength}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Molarity Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400 uppercase">Solution Molarity</span>
                    <span className="text-blue-400">{molarity.toFixed(3)} M</span>
                  </div>
                  <input
                    type="range"
                    min="0.001"
                    max="2.000"
                    step="0.005"
                    value={molarity}
                    onChange={(e) => setMolarity(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-950 h-2 rounded cursor-pointer"
                  />
                </div>

                {/* Temperature Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-400 uppercase">Temperature (°C)</span>
                    <span className="text-amber-400">{temperature} °C</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    step="1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseInt(e.target.value))}
                    className="w-full accent-amber-500 bg-slate-950 h-2 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic Beaker Simulation Canvas */}
              <BeakerCanvas base={currentBase} molarity={molarity} temperature={temperature} />

              {/* Extended Chemical Card */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <h4 className="font-bold text-slate-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pink-400" /> Ionization Chemistry Profile: {currentBase.name}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 text-slate-300">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Class / Type</span>
                    <span className="font-bold">{currentBase.type}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Water Solubility</span>
                    <span className="font-bold text-cyan-400">{currentBase.solubility}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Is Alkali?</span>
                    <span className={`font-bold ${currentBase.isAlkali ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {currentBase.isAlkali ? 'YES (Alkali)' : 'NO (Non-Alkali Base)'}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Base Acidity</span>
                    <span className="font-bold text-amber-400">{currentBase.acidity} (Mono/Di/Tri)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 2: ACIDITY & SOLUBILITY MATRIX */}
          {activeLabIndex === 1 && (
            <div className="space-y-6">
              <AcidityDiagramSVG acidity={currentBase.acidity} formula={currentBase.formula} name={currentBase.name} />

              {/* Chemical Matrix Grid */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Interactive Base Classification Matrix
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {CHEMICAL_BASES_DB.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedBaseId(b.id);
                      }}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        selectedBaseId === b.id
                          ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/40'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-sm text-white">{b.formula}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            b.isAlkali ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {b.isAlkali ? 'Alkali' : 'Insoluble'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{b.name}</p>
                      <div className="mt-2 text-[11px] font-semibold text-slate-300 flex justify-between border-t border-slate-800/80 pt-1.5">
                        <span>Acidity: {b.acidity}</span>
                        <span className={b.strength === 'Strong' ? 'text-emerald-400' : 'text-amber-400'}>
                          {b.strength}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LAB 3: BASE THEORIES EXPLORER */}
          {activeLabIndex === 2 && (
            <div className="space-y-6">
              <LewisTheorySVG />

              {/* Theoretical Models Comparison Table */}
              <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  3 Theoretical Definitions of Bases for {currentBase.name} ({currentBase.formula})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-blue-400 block mb-1">Arrhenius Concept</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentBase.arrheniusRole}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Brønsted-Lowry Concept</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentBase.bronstedRole}</p>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-purple-400 block mb-1">Lewis Concept</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{currentBase.lewisRole}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 4: METALLIC SALT REACTIONS & THERMAL DECOMPOSITION */}
          {activeLabIndex === 3 && (
            <div className="space-y-6">
              {/* Controls for reaction lab */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase block mb-1">Select Metallic Salt</label>
                  <select
                    value={selectedSalt.id}
                    onChange={(e) => {
                      audioManager.play('tap');
                      const val = e.target.value;
                      if (val === 'cuso4')
                        setSelectedSalt({
                          id: 'cuso4',
                          name: 'Copper(II) Sulfate',
                          formula: 'CuSO₄',
                          pptColor: '#06B6D4',
                          pptFormula: 'Cu(OH)₂ (Pale Blue)',
                          amphoteric: false
                        });
                      else if (val === 'fecl3')
                        setSelectedSalt({
                          id: 'fecl3',
                          name: 'Iron(III) Chloride',
                          formula: 'FeCl₃',
                          pptColor: '#B45309',
                          pptFormula: 'Fe(OH)₃ (Red-Brown)',
                          amphoteric: false
                        });
                      else if (val === 'znso4')
                        setSelectedSalt({
                          id: 'znso4',
                          name: 'Zinc Sulfate',
                          formula: 'ZnSO₄',
                          pptColor: '#E2E8F0',
                          pptFormula: 'Zn(OH)₂ (Gelatinous White)',
                          amphoteric: true
                        });
                      else if (val === 'alcl3')
                        setSelectedSalt({
                          id: 'alcl3',
                          name: 'Aluminium Chloride',
                          formula: 'AlCl₃',
                          pptColor: '#F8FAFC',
                          pptFormula: 'Al(OH)₃ (White Chalky)',
                          amphoteric: true
                        });
                    }}
                    className="bg-slate-950 border border-slate-700 text-white text-xs font-semibold rounded-lg p-2.5 outline-none"
                  >
                    <option value="cuso4">CuSO₄ - Copper(II) Sulfate</option>
                    <option value="fecl3">FeCl₃ - Iron(III) Chloride</option>
                    <option value="znso4">ZnSO₄ - Zinc Sulfate</option>
                    <option value="alcl3">AlCl₃ - Aluminium Chloride</option>
                  </select>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      audioManager.play('drop-correct');
                      setAddedDrops((prev) => prev + 1);
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow transition"
                  >
                    + Add Drop of NaOH ({addedDrops} drops)
                  </button>

                  <button
                    onClick={() => {
                      audioManager.play('whoosh');
                      setIsHeating(!isHeating);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5 ${
                      isHeating ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-orange-400" />
                    {isHeating ? 'Turn Off Flame' : 'Heat Tube (Decompose)'}
                  </button>
                </div>
              </div>

              <ReactionsVisualizerSVG
                saltName={selectedSalt.name}
                precipitateColor={selectedSalt.pptColor}
                precipitateFormula={
                  selectedSalt.amphoteric && addedDrops > 5
                    ? 'Soluble Complex / Dissolved in Excess NaOH'
                    : selectedSalt.pptFormula
                }
                isHeating={isHeating}
                heatProduct={currentBase.heatDecompositionText}
              />

              {/* Chemical Equation Box */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                <span className="font-bold text-cyan-400 uppercase tracking-wider block">
                  Balanced Stoichiometric Chemical Equations
                </span>
                <p className="font-mono text-slate-200 bg-slate-950 p-2.5 rounded border border-slate-800">
                  Precipitation: {selectedSalt.formula} + NaOH → {selectedSalt.pptFormula} + Sodium Salt
                </p>
                <p className="font-mono text-amber-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                  Thermal Reaction: {currentBase.heatDecompositionEquation}
                </p>
              </div>
            </div>
          )}

          {/* LAB 5: INDUSTRIAL & PRACTICAL APPLICATIONS */}
          {activeLabIndex === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CHEMICAL_BASES_DB.map((base) => (
                  <div key={base.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white text-sm">{base.name}</h4>
                      <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800">
                        {base.formula}
                      </span>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                      {base.applications.map((app, aIdx) => (
                        <li key={aIdx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS ARRAY SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Empirical Observation Tests
            </h3>
            <div className="space-y-6">
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs font-bold text-emerald-400">Observation #{oIdx + 1}</p>
                  <p className="text-sm font-semibold text-white">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, aIdx) => {
                      const selected = observationAnswers[oIdx] === aIdx;
                      const isRight = aIdx === obs.correctIndex;
                      return (
                        <button
                          key={aIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            const next = [...observationAnswers];
                            next[oIdx] = aIdx;
                            setObservationAnswers(next);
                          }}
                          className={`p-3 text-left rounded-lg text-xs font-medium border transition ${
                            selected
                              ? isRight
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300'
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
        </main>
      )}

      {/* TAB 3: CHALLENGE SUITE (22 PROGRESSIVE CHALLENGES) */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-4xl space-y-6">
          {/* Progress Header Bar */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES_DATA.length}
              </span>
              <span className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] uppercase font-extrabold ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {currentChallenge.difficulty}
                </span>
                <span>{currentChallenge.competencyLevel} Competency</span>
              </span>
            </div>

            {/* Hint Trigger Button */}
            <button
              onClick={() => {
                audioManager.play('hint');
                setShowHint(!showHint);
              }}
              className="px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-700 text-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              {showHint ? 'Hide Hint' : 'Get Hint'}
            </button>
          </div>

          {/* Hint Bubble Display */}
          <HintBubble
            show={showHint}
            text={currentChallenge.hints[hintIndex] || currentChallenge.hints[0]}
          />

          {/* Question Container Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <p className="text-base md:text-lg font-bold text-white leading-snug">
              {currentChallenge.question}
            </p>

            {/* Multiple Choice Options */}
            {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
              <div className="space-y-3">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let style = 'bg-slate-950 hover:bg-slate-850 border-slate-800 text-slate-200';

                  if (isAnswerSubmitted) {
                    if (idx === currentChallenge.correctIndex) {
                      style = 'bg-emerald-950 border-emerald-500 text-emerald-100 font-bold';
                    } else if (isSelected) {
                      style = 'bg-rose-950 border-rose-500 text-rose-100';
                    }
                  } else if (isSelected) {
                    style = 'bg-blue-950 border-blue-500 text-blue-100 ring-2 ring-blue-500/30';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswerSubmitted}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedOption(idx);
                      }}
                      className={`w-full p-4 rounded-xl border text-left text-xs md:text-sm font-medium transition-all ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Calculation Numeric Input */}
            {currentChallenge.type === 'calculation' && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 block uppercase">
                  Enter Calculated Numeric Answer:
                </label>
                <input
                  type="number"
                  step="any"
                  disabled={isAnswerSubmitted}
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value)}
                  placeholder="Type calculated value..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-lg font-mono font-bold text-white outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Submit / Next Actions Bar */}
            <div className="flex justify-between items-center border-t border-slate-800 pt-4">
              <span className="text-xs text-slate-400 font-medium">Node: {currentChallenge.nodeId}</span>

              {!isAnswerSubmitted ? (
                <button
                  disabled={
                    (currentChallenge.type === 'multiple-choice' && selectedOption === null) ||
                    (currentChallenge.type === 'calculation' && !calcInput.trim())
                  }
                  onClick={handleChallengeSubmit}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-blue-600/30"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  <span>Next Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Post Answer Feedback & Pedagogical Explanation */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-xl border text-xs md:text-sm space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-600/60 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <span>{isCorrect ? 'Correct Explanation' : 'Incorrect Solution'}</span>
                </div>
                <p className="leading-relaxed">{currentChallenge.explanation}</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* TAB 4: SUMMARY, MASTERY TRACKER & REAL WORLD ACTIVITY */}
      {activeTab === 'summary' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* REAL WORLD ACTIVITY RENDERED MANDATORY */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                <Scale className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
                <p className="text-xs text-slate-400">ICSE Applied Environmental Engineering Task</p>
              </div>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Step-by-step Industrial Neutralization Calculation
              </h4>
              <div className="space-y-2">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, sIdx) => (
                  <div key={sIdx} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 font-mono">
                    {stepStr}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MISCONCEPTIONS & CORRECTIONS MATRIX */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" /> Common Misconceptions & Chemical Realities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((misc) => (
                <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 block">Node: {misc.nodeId}</span>
                  <p className="text-xs font-bold text-rose-300">❌ False: {misc.misconception}</p>
                  <p className="text-xs text-emerald-300 leading-relaxed">✓ Truth: {misc.reality}</p>
                  <p className="text-[10px] text-slate-400 italic border-t border-slate-800 pt-1.5">
                    Check: {misc.diagnosticTest}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* NODE MASTERY SUMMARY GRID */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-200 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-400" /> BKT Knowledge State & SRS Mastery
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {ALL_NODE_IDS.map((nodeId) => {
                const bkt = bktStateMap[nodeId] as { pMastery?: number } | undefined;
                const pMastery = bkt?.pMastery ?? 0.1;
                const percent = Math.round(pMastery * 100);

                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block">{nodeId}</span>
                    <span className="text-sm font-extrabold text-white">{percent}%</span>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}