'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  Beaker,
  FlaskConical,
  Flame,
  Thermometer,
  Layers,
  Activity,
  BarChart3,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Award,
  Zap,
  BookOpen,
  ArrowRight,
  Info,
  ChevronRight,
  Droplet,
  Gauge,
  Sparkles,
  Volume2
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

const ALL_NODE_IDS = [
  'c12_chem_011',
  'c12_chem_012',
  'c12_chem_013',
  'c12_chem_014',
  'c12_chem_015',
  'c12_chem_016',
  'c12_chem_017',
  'c12_chem_018',
  'c12_chem_019',
  'c12_chem_020'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface NodeDetails {
  id: NodeId;
  title: string;
  code: string;
  summary: string;
  formula: string;
}

interface SolutionSystem {
  id: string;
  name: string;
  componentA: string;
  componentB: string;
  type: 'ideal' | 'positive' | 'negative';
  pA0: number; // Vapor pressure of pure A (kPa) at 25°C
  pB0: number; // Vapor pressure of pure B (kPa) at 25°C
  deviationFactor: number; // Parameter for Margules/Redlich-Kister: W / RT
  azeotropeXA: number | null; // Mole fraction of A at azeotrope (if any)
  azeotropeTemp: number | null; // Boiling point at azeotrope (°C)
  boilingA: number; // Pure A boiling point (°C)
  boilingB: number; // Pure B boiling point (°C)
  deltaHSign: 'zero' | 'positive' | 'negative';
  deltaVSign: 'zero' | 'positive' | 'negative';
  interactionDescription: string;
  exampleText: string;
}

interface Misconception {
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
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

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'true-false';
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

// ============================================================================
// CONSTANTS & ENRICHMENT DATA
// ============================================================================

const NODE_INFO: Record<NodeId, NodeDetails> = {
  c12_chem_011: {
    id: 'c12_chem_011',
    title: "Raoult's Law for Volatile Liquids",
    code: 'c12_chem_011',
    summary: 'The partial vapor pressure of each volatile component in a solution is directly proportional to its mole fraction in the liquid phase.',
    formula: 'P_A = P_A^0 \\cdot x_A, \\quad P_{total} = P_A + P_B'
  },
  c12_chem_012: {
    id: 'c12_chem_012',
    title: 'Ideal Solutions & Thermodynamic Criteria',
    code: 'c12_chem_012',
    summary: 'Solutions that obey Raoult\'s Law over the entire concentration range. Intermolecular forces A-B equal A-A and B-B interactions.',
    formula: '\\Delta H_{mix} = 0, \\quad \\Delta V_{mix} = 0, \\quad F_{A-B} = F_{A-A} = F_{B-B}'
  },
  c12_chem_013: {
    id: 'c12_chem_013',
    title: 'Non-Ideal Solutions: Positive Deviation',
    code: 'c12_chem_013',
    summary: 'A-B interactions are weaker than pure component interactions. Vapor pressure is higher than expected; mixing absorbs heat and expands volume.',
    formula: 'P_A > P_A^0 x_A, \\quad \\Delta H_{mix} > 0, \\quad \\Delta V_{mix} > 0'
  },
  c12_chem_014: {
    id: 'c12_chem_014',
    title: 'Non-Ideal Solutions: Negative Deviation',
    code: 'c12_chem_014',
    summary: 'A-B interactions (e.g. hydrogen bonding) are stronger than pure component interactions. Vapor pressure drops; mixing releases heat and contracts volume.',
    formula: 'P_A < P_A^0 x_A, \\quad \\Delta H_{mix} < 0, \\quad \\Delta V_{mix} < 0'
  },
  c12_chem_015: {
    id: 'c12_chem_015',
    title: 'Vapor Pressure - Composition Diagrams',
    code: 'c12_chem_015',
    summary: 'Graphical representation of total and partial vapor pressures plotted against liquid mole fraction x_A and vapor mole fraction y_A.',
    formula: 'y_A = \\frac{P_A}{P_{total}} = \\frac{P_A^0 x_A}{P_A^0 x_A + P_B^0 x_B}'
  },
  c12_chem_016: {
    id: 'c12_chem_016',
    title: 'Boiling Point - Composition Phase Equilibrium',
    code: 'c12_chem_016',
    summary: 'Phase equilibrium curves showing how liquid and vapor compositions differ at the boiling temperature under constant external pressure.',
    formula: 'T_b \\text{ occurs when } P_{total}(T) = P_{ext}'
  },
  c12_chem_017: {
    id: 'c12_chem_017',
    title: 'Azeotropes & Constant Boiling Mixtures',
    code: 'c12_chem_017',
    summary: 'Binary liquid mixtures that boil at a constant temperature and distill over unchanged in composition without separation.',
    formula: 'x_A = y_A \\quad \\text{at azeotropic composition}'
  },
  c12_chem_018: {
    id: 'c12_chem_018',
    title: 'Minimum Boiling Azeotropes',
    code: 'c12_chem_018',
    summary: 'Formed by solutions showing large positive deviations from Raoult\'s Law. The azeotrope boils at a temperature lower than either component.',
    formula: 'T_{azeotrope} < \\min(T_{b,A}, T_{b,B})'
  },
  c12_chem_019: {
    id: 'c12_chem_019',
    title: 'Maximum Boiling Azeotropes',
    code: 'c12_chem_019',
    summary: 'Formed by solutions showing large negative deviations from Raoult\'s Law. The azeotrope boils at a temperature higher than either component.',
    formula: 'T_{azeotrope} > \\max(T_{b,A}, T_{b,B})'
  },
  c12_chem_020: {
    id: 'c12_chem_020',
    title: "Raoult's Law vs Henry's Law Comparison",
    code: 'c12_chem_020',
    summary: 'Raoult\'s Law applies to the solvent in dilute solutions (x_A -> 1), while Henry\'s Law applies to the solute (x_B -> 0). Raoult\'s is a special case of Henry\'s Law where K_H = P^0.',
    formula: 'P_{solute} = K_H \\cdot x_{solute}, \\quad \\lim_{x_A \\to 1} P_A = P_A^0 x_A'
  }
};

const SYSTEM_PRESETS: SolutionSystem[] = [
  {
    id: 'ideal_benzene_toluene',
    name: 'Benzene + Toluene',
    componentA: 'Benzene',
    componentB: 'Toluene',
    type: 'ideal',
    pA0: 12.7, // kPa at 25°C
    pB0: 3.8,  // kPa at 25°C
    deviationFactor: 0.0,
    azeotropeXA: null,
    azeotropeTemp: null,
    boilingA: 80.1,
    boilingB: 110.6,
    deltaHSign: 'zero',
    deltaVSign: 'zero',
    interactionDescription: 'Structural similarity (aromatic hydrocarbons) yields virtually identical A-A, B-B, and A-B van der Waals attractions.',
    exampleText: 'Classic ideal solution fulfilling Raoult\'s law across all mole fractions.'
  },
  {
    id: 'positive_ethanol_water',
    name: 'Ethanol + Water',
    componentA: 'Ethanol',
    componentB: 'Water',
    type: 'positive',
    pA0: 7.9,
    pB0: 3.17,
    deviationFactor: 1.85,
    azeotropeXA: 0.89, // Mole fraction ethanol (~95.6% by weight)
    azeotropeTemp: 78.15,
    boilingA: 78.37,
    boilingB: 100.0,
    deltaHSign: 'positive',
    deltaVSign: 'positive',
    interactionDescription: 'Ethanol breaks the rigid hydrogen-bonded 3D lattice of water. A-B interactions are weaker than hydrogen bonding in pure water.',
    exampleText: 'Large positive deviation forming a minimum boiling azeotrope at 95.6% ethanol.'
  },
  {
    id: 'positive_acetone_cs2',
    name: 'Acetone + Carbon Disulfide',
    componentA: 'Acetone',
    componentB: 'Carbon Disulfide (CS₂)',
    type: 'positive',
    pA0: 30.6,
    pB0: 48.1,
    deviationFactor: 2.1,
    azeotropeXA: 0.34,
    azeotropeTemp: 39.2,
    boilingA: 56.1,
    boilingB: 46.2,
    deltaHSign: 'positive',
    deltaVSign: 'positive',
    interactionDescription: 'Polar acetone disrupts non-polar CS₂ dispersion interactions, creating mutual incompatibility and high vapor pressure.',
    exampleText: 'Strong positive deviation with marked endothermic mixing and volume expansion.'
  },
  {
    id: 'negative_acetone_chloroform',
    name: 'Acetone + Chloroform',
    componentA: 'Acetone',
    componentB: 'Chloroform (CHCl₃)',
    type: 'negative',
    pA0: 30.6,
    pB0: 26.3,
    deviationFactor: -1.75,
    azeotropeXA: 0.40,
    azeotropeTemp: 64.7,
    boilingA: 56.1,
    boilingB: 61.2,
    deltaHSign: 'negative',
    deltaVSign: 'negative',
    interactionDescription: 'The acidic C-H hydrogen in CHCl₃ forms strong intermolecular hydrogen bonds with the carbonyl oxygen in acetone (C=O···H-CCl₃).',
    exampleText: 'Negative deviation forming a maximum boiling azeotrope with exothermic mixing.'
  },
  {
    id: 'negative_nitric_water',
    name: 'Nitric Acid + Water',
    componentA: 'Nitric Acid (HNO₃)',
    componentB: 'Water',
    type: 'negative',
    pA0: 8.4,
    pB0: 3.17,
    deviationFactor: -2.3,
    azeotropeXA: 0.38, // ~68% HNO3 by mass
    azeotropeTemp: 120.5,
    boilingA: 83.0,
    boilingB: 100.0,
    deltaHSign: 'negative',
    deltaVSign: 'negative',
    interactionDescription: 'Strong ion-dipole and protonation interactions produce strong molecular attraction in solution.',
    exampleText: 'Strong negative deviation forming maximum boiling azeotrope at 120.5°C.'
  }
];

const MISCONCEPTIONS: Misconception[] = [
  {
    title: 'Azeotropes Are Chemical Compounds',
    misconception: 'Azeotropic mixtures are chemical compounds with fixed chemical bonds because they boil at a constant temperature.',
    correction: 'Azeotropes are physical liquid mixtures, not chemical compounds. Changing external pressure alters their azeotropic composition and boiling point.',
    nodeId: 'c12_chem_017'
  },
  {
    title: 'Positive Deviation Means Exothermic Mixing',
    misconception: 'Positive deviation implies "positive" heat release (exothermic process).',
    correction: 'Positive deviation means A-B forces are WEAKER than pure forces, requiring energy input to break pure interactions, making ΔH_mix > 0 (endothermic).',
    nodeId: 'c12_chem_013'
  },
  {
    title: 'Positive Deviation Yields Maximum Boiling Azeotrope',
    misconception: 'A higher vapor pressure (positive deviation) leads to a higher boiling temperature.',
    correction: 'Higher vapor pressure allows the liquid to boil at a LOWER temperature, forming a MINIMUM boiling azeotrope.',
    nodeId: 'c12_chem_018'
  },
  {
    title: 'Total Volume Is Always Additive',
    misconception: 'Mixing 50 mL of Liquid A and 50 mL of Liquid B always yields exactly 100 mL.',
    correction: 'Strict volume additivity (ΔV_mix = 0) occurs only in ideal solutions. Stronger A-B forces cause volume contraction (ΔV_mix < 0); weaker forces cause expansion (ΔV_mix > 0).',
    nodeId: 'c12_chem_012'
  },
  {
    title: 'Raoult Law Applies To Immiscible Liquids',
    misconception: 'Raoult\'s Law can be applied uniformly across any liquid mixture regardless of liquid miscibility.',
    correction: 'Raoult\'s law strictly applies to single-phase homogeneous solutions across the composition range where components are miscible.',
    nodeId: 'c12_chem_020'
  },
  {
    title: 'Vapor Composition Equals Liquid Composition',
    misconception: 'The vapor phase in equilibrium with a solution has the exact same mole fraction as the liquid phase.',
    correction: 'The vapor phase is always enriched in the more volatile component (higher vapor pressure) unless the solution is at an azeotropic point where x_A = y_A.',
    nodeId: 'c12_chem_015'
  }
];

const SCENARIO = {
  title: 'ISC High-Precision Physical Chemistry Vapor-Liquid Equilibrium Lab',
  intro: 'Welcome to the Advanced Solution Thermodynamics Laboratory. As chief chemical engineer, you are examining binary volatile liquid mixtures for industrial distillation column design.',
  context: 'In this interactive simulation, you will measure vapor pressure curves, measure calorimetric heat of mixing, track molecular volume contraction/expansion, and pinpoint azeotropic coordinates to master ISC Class 12 Chemistry nodes.'
};

const DISCOVERY_QUESTION = {
  question: 'When 50.0 mL of pure acetone is mixed with 50.0 mL of pure chloroform at 25°C, what will be the final volume and temperature behavior of the solution?',
  options: [
    'Volume = 100.0 mL, Temperature remains unchanged (25.0°C)',
    'Volume < 100.0 mL, Temperature increases (exothermic process, T > 25°C)',
    'Volume > 100.0 mL, Temperature decreases (endothermic process, T < 25°C)',
    'Volume > 100.0 mL, Temperature increases (exothermic process, T > 25°C)'
  ],
  correctIndex: 1,
  hintAfter: 'Acetone and chloroform form hydrogen bonds (C-H···O=C) between different molecules that do not exist in pure liquids. Stronger A-B attractions draw molecules closer together (ΔV < 0) and release energy (ΔH < 0, exothermic warming).'
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Ideal Solutions & Raoult\'s Law Verification',
    instruction: 'Select the Benzene + Toluene mixture. Drag the Mole Fraction slider (x_A) from 0.0 to 1.0. Observe how partial pressures P_A and P_B form perfectly straight lines, and total pressure P_total follows Raoult\'s law exactly.',
    interactionType: 'ideal-slider',
    nodeId: 'c12_chem_011'
  },
  {
    title: 'Lab 2: Positive Deviation & Minimum Boiling Azeotrope',
    instruction: 'Select Ethanol + Water. Observe the upward bow in the total vapor pressure curve. Notice that at x_Ethanol ≈ 0.89, the total vapor pressure reaches a maximum peak, corresponding to a minimum boiling point of 78.15°C.',
    interactionType: 'positive-azeotrope',
    nodeId: 'c12_chem_013'
  },
  {
    title: 'Lab 3: Negative Deviation & Hydrogen Bonding',
    instruction: 'Select Acetone + Chloroform. Observe the downward dip in vapor pressure. Look at the dynamic molecular simulation to see hydrogen bonding forming between the acetone carbonyl oxygen and chloroform C-H proton.',
    interactionType: 'negative-hydrogen-bond',
    nodeId: 'c12_chem_014'
  },
  {
    title: 'Lab 4: Solution Calorimetry & Volume Change',
    instruction: 'Toggle between systems and inspect the Calorimeter gauge. Note how positive deviation mixtures absorb heat (cooling solution) and expand volume, while negative deviation mixtures release heat (heating solution) and contract volume.',
    interactionType: 'calorimeter-tracker',
    nodeId: 'c12_chem_012'
  },
  {
    title: 'Lab 5: Phase Equilibrium & Vapor Composition (x_A vs y_A)',
    instruction: 'Compare the liquid mole fraction x_A with the vapor mole fraction y_A across different mixtures. Identify the single unique point where x_A = y_A where fractional distillation cannot further separate the components.',
    interactionType: 'distillation-equilibrium',
    nodeId: 'c12_chem_017'
  }
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If an ethanol-water mixture of x_ethanol = 0.50 is subjected to fractional distillation, what will be the highest purity of ethanol collected in the distillate vapor?',
    options: [
      '100.0% Pure Ethanol',
      '95.6% Ethanol (the minimum boiling azeotropic composition)',
      '50.0% Ethanol (no separation occurs)',
      '0.0% Ethanol (only pure water distills)'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 5, observe that fractional distillation shifts composition toward the minimum boiling azeotrope peak (95.6% ethanol), beyond which liquid and vapor compositions become identical (x_A = y_A).',
    nodeId: 'c12_chem_018'
  },
  {
    question: 'Predict: What happens to the boiling point of a maximum boiling azeotrope (e.g. Nitric acid + Water) compared to its pure components?',
    options: [
      'It boils at a temperature lower than both pure components',
      'It boils at a temperature higher than both pure components',
      'It boils at the exact weighted average of pure boiling points',
      'It does not boil at all because it solidifies'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3 & 4, note that negative deviation creates a vapor pressure minimum, which corresponds directly to a boiling point maximum higher than pure HNO3 (83°C) or pure H2O (100°C).',
    nodeId: 'c12_chem_019'
  }
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you notice about the relation between liquid mole fraction (x_A) and vapor mole fraction (y_A) for an ideal solution when P_A^0 > P_B^0?',
    observableOptions: [
      'y_A is always equal to x_A across all compositions',
      'y_A is always greater than x_A (vapor is enriched in the more volatile component A)',
      'y_A is always smaller than x_A',
      'y_A remains constant at 0.50 regardless of x_A'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_015'
  },
  {
    question: 'What happens to the temperature of the mixture when mixing components that display strong positive deviation (e.g. Acetone + CS2)?',
    observableOptions: [
      'Temperature increases significantly (exothermic, ΔH_mix < 0)',
      'Temperature drops (endothermic process, ΔH_mix > 0 as energy is absorbed to disrupt pure interactions)',
      'Temperature remains perfectly constant',
      'The liquid immediately boils and turns completely into gas'
    ],
    correctIndex: 1,
    nodeId: 'c12_chem_013'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Production of Absolute Alcohol (100% Ethanol)',
  description: 'Standard fractional distillation of fermented sugar broth can only yield up to 95.6% ethanol (the minimum boiling azeotrope). To produce 100% anhydrous fuel ethanol, industrial refineries must break the azeotrope using entrainer solvents or molecular sieves.',
  steps: [
    'Step 1: Fermentation broth is distilled in a primary column to achieve the azeotropic composition of 95.6% ethanol / 4.4% water (boiling at 78.15°C).',
    'Step 2: A third entrainer component like Benzene or Cyclohexane is added to form a ternary azeotrope with lower boiling point (64.8°C), selectively removing water.',
    'Step 3: Modern eco-refineries pass 95.6% ethanol vapor through 3Å Zeolite Molecular Sieves which adsorb tiny water molecules (diameter ~2.8 Å) while excluding larger ethanol molecules (~4.4 Å).',
    'Step 4: Anhydrous 99.9%+ pure ethanol is collected at the bottom, ready for blending into E20 fuel petrol.'
  ]
};

// ============================================================================
// 22 PROGRESSIVE CHALLENGES (Foundation -> Standard -> Advanced)
// ============================================================================

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_01',
    nodeId: 'c12_chem_011',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "According to Raoult's Law, the partial vapor pressure of a volatile component A in a solution at constant temperature is equal to:",
    options: [
      'The mole fraction of A multiplied by total pressure',
      'The mole fraction of A in liquid phase multiplied by the vapor pressure of pure A',
      'The mass percentage of A multiplied by atmospheric pressure',
      'The molarity of A divided by total volume'
    ],
    correctIndex: 1,
    explanation: "Raoult's Law states P_A = P_A^0 · x_A, where P_A^0 is vapor pressure of pure A and x_A is its mole fraction in liquid phase.",
    hints: [
      "Recall the core equation P_A = P_A^0 · x_A.",
      "Consider what symbol P_A^0 stands for.",
      "Pure component vapor pressure is multiplied by liquid mole fraction x_A."
    ]
  },
  {
    id: 'ch_02',
    nodeId: 'c12_chem_012',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which set of thermodynamic conditions defines an ideal solution formed by components A and B?',
    options: [
      'ΔH_mix > 0 and ΔV_mix > 0',
      'ΔH_mix < 0 and ΔV_mix < 0',
      'ΔH_mix = 0 and ΔV_mix = 0',
      'ΔH_mix = 0 and ΔV_mix > 0'
    ],
    correctIndex: 2,
    explanation: 'In ideal solutions, A-B intermolecular forces equal A-A and B-B forces. Thus, no heat is evolved or absorbed (ΔH_mix = 0) and no expansion or contraction occurs (ΔV_mix = 0).',
    hints: [
      'Think about whether ideal mixing involves any energy change.',
      'For ideal solutions, interactions don\'t change in magnitude.',
      'Both enthalpy and volume changes on mixing are exactly zero.'
    ]
  },
  {
    id: 'ch_03',
    nodeId: 'c12_chem_013',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a solution exhibiting positive deviation from Raoult\'s Law, the intermolecular forces between solute (A) and solvent (B) molecules are:',
    options: [
      'Stronger than A-A and B-B interactions',
      'Weaker than A-A and B-B interactions',
      'Exactly equal to A-A and B-B interactions',
      'Zero (no intermolecular forces exist)'
    ],
    correctIndex: 1,
    explanation: 'Positive deviation means molecules escape into vapor phase more easily because A-B forces are WEAKER than pure A-A and B-B forces.',
    hints: [
      'Higher vapor pressure means easier escape to vapor.',
      'Easier escape implies weaker cohesive attraction between A and B.',
      'A-B forces are weaker than pure component interactions.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_04',
    nodeId: 'c12_chem_014',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following binary pairs displays negative deviation from Raoult\'s Law due to hydrogen bond formation between different molecules?',
    options: [
      'Benzene + Toluene',
      'Ethanol + Water',
      'Acetone + Chloroform',
      'Carbon tetrachloride + Cyclohexane'
    ],
    correctIndex: 2,
    explanation: 'Acetone and Chloroform form strong C-H···O=C hydrogen bonds upon mixing, creating negative deviation.',
    hints: [
      'Look for a carbonyl compound and a trihalomethane.',
      'Chloroform\'s acidic C-H hydrogen binds to Acetone\'s oxygen.',
      'Acetone + Chloroform is the classic example of negative deviation.'
    ]
  },
  {
    id: 'ch_05',
    nodeId: 'c12_chem_017',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An azeotropic mixture is defined as a binary liquid solution that:',
    options: [
      'Separates into two immiscible liquid layers',
      'Boils at a constant temperature and distills without change in composition',
      'Has a boiling point that continuously rises during distillation',
      'Reacts chemically to form a solid salt precipitate'
    ],
    correctIndex: 1,
    explanation: 'An azeotrope is a constant boiling mixture where liquid composition equals vapor composition (x_A = y_A).',
    hints: [
      'Recall what happens during distillation of 95.6% ethanol.',
      'Composition of liquid and vapor phases are identical at an azeotrope.',
      'It boils at a constant temperature like a pure liquid.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_06',
    nodeId: 'c12_chem_018',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Solutions showing large POSITIVE deviations from Raoult\'s Law form:',
    options: [
      'Maximum boiling azeotropes',
      'Minimum boiling azeotropes',
      'No azeotropes under any condition',
      'Ideal solution mixtures'
    ],
    correctIndex: 1,
    explanation: 'Positive deviation means higher vapor pressure. Higher vapor pressure causes the solution to boil at a lower temperature, creating a minimum boiling azeotrope.',
    hints: [
      'Remember: Higher Vapor Pressure <---> Lower Boiling Temperature.',
      'Positive deviation = Vapor Pressure maximum.',
      'A vapor pressure maximum corresponds to a boiling point minimum.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_07',
    nodeId: 'c12_chem_019',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Nitric acid (68%) and Water (32%) mixture forms a maximum boiling azeotrope at 120.5°C. What type of deviation from Raoult\'s law does this system exhibit?',
    options: [
      'Zero deviation (Ideal)',
      'Positive deviation',
      'Negative deviation',
      'Linear Henry\'s Law deviation'
    ],
    correctIndex: 2,
    explanation: 'Maximum boiling point corresponds to vapor pressure minimum, which signifies negative deviation from Raoult\'s Law.',
    hints: [
      'Maximum boiling point means vapor pressure is lower than expected.',
      'Lower vapor pressure than Raoult\'s law = Negative deviation.',
      'Strong attraction lowers vapor pressure.'
    ]
  },

  // STANDARD (8)
  {
    id: 'ch_08',
    nodeId: 'c12_chem_011',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'At 25°C, the vapor pressure of pure benzene is 12.0 kPa and pure toluene is 4.0 kPa. Calculate the total vapor pressure (in kPa) of an ideal solution containing 0.60 mole fraction of benzene.',
    correctAnswer: 8.8,
    tolerance: 0.1,
    unit: 'kPa',
    explanation: 'P_total = P_Benzene + P_Toluene = (12.0 × 0.60) + (4.0 × 0.40) = 7.2 + 1.6 = 8.8 kPa.',
    hints: [
      'Use Raoult\'s Law: P_total = P_A^0 · x_A + P_B^0 · x_B.',
      'x_Toluene = 1 - 0.60 = 0.40.',
      'P_total = (12.0 × 0.60) + (4.0 × 0.40).'
    ]
  },
  {
    id: 'ch_09',
    nodeId: 'c12_chem_015',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For an ideal binary solution of liquid A (P_A^0 = 30.0 kPa) and liquid B (P_B^0 = 10.0 kPa) with liquid mole fraction x_A = 0.50, calculate the mole fraction of A in the equilibrium VAPOR phase (y_A).',
    correctAnswer: 0.75,
    tolerance: 0.02,
    unit: 'mole fraction',
    explanation: 'P_A = 30 × 0.5 = 15 kPa. P_B = 10 × 0.5 = 5 kPa. P_total = 20 kPa. Vapor fraction y_A = P_A / P_total = 15 / 20 = 0.75.',
    hints: [
      'First calculate P_A = P_A^0 · x_A and P_B = P_B^0 · x_B.',
      'P_total = P_A + P_B = 15 + 5 = 20 kPa.',
      'y_A = P_A / P_total = 15 / 20.'
    ]
  },
  {
    id: 'ch_10',
    nodeId: 'c12_chem_012',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When 100 mL of n-hexane is mixed with 100 mL of n-heptane, what is the enthalpy change of mixing (ΔH_mix) and total final volume (V_total)?',
    options: [
      'ΔH_mix = 0, V_total = 200 mL',
      'ΔH_mix > 0, V_total > 200 mL',
      'ΔH_mix < 0, V_total < 200 mL',
      'ΔH_mix > 0, V_total < 200 mL'
    ],
    correctIndex: 0,
    explanation: 'n-hexane and n-heptane are structurally similar non-polar alkanes forming an ideal solution, so ΔH_mix = 0 and volumes are strictly additive (200 mL).',
    hints: [
      'Identify the molecular nature of n-hexane and n-heptane.',
      'Both are non-polar straight-chain alkanes.',
      'They form an ideal solution with additive volume and zero heat of mixing.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_11',
    nodeId: 'c12_chem_013',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following physical changes occurs when pure ethanol is mixed with water?',
    options: [
      'The solution cools down (ΔH_mix > 0) and volume expands (ΔV_mix > 0)',
      'The solution heats up (ΔH_mix < 0) and volume contracts (ΔV_mix < 0)',
      'No temperature or volume change occurs',
      'The solution freezes instantly at room temperature'
    ],
    correctIndex: 0,
    explanation: 'Ethanol + Water exhibits positive deviation from Raoult\'s Law. Intermolecular interactions are disrupted, absorbing heat (endothermic, ΔH > 0) and causing volume expansion (ΔV > 0).',
    hints: [
      'Ethanol + Water shows positive deviation from Raoult\'s law.',
      'Positive deviation implies weaker A-B forces.',
      'Breaking stronger pure forces requires energy (endothermic ΔH > 0) and increases molecular spacing (ΔV > 0).'
    ]
  },
  {
    id: 'ch_12',
    nodeId: 'c12_chem_014',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When acetone and chloroform are mixed, hydrogen bonding occurs. What is the sign of ΔH_mix and ΔV_mix for this mixing process?',
    options: [
      'ΔH_mix > 0 and ΔV_mix > 0',
      'ΔH_mix < 0 and ΔV_mix < 0',
      'ΔH_mix = 0 and ΔV_mix = 0',
      'ΔH_mix < 0 and ΔV_mix > 0'
    ],
    correctIndex: 1,
    explanation: 'Forming new hydrogen bonds releases heat (exothermic, ΔH_mix < 0) and pulls molecules closer together, contracting volume (ΔV_mix < 0).',
    hints: [
      'New hydrogen bonds are formed between acetone oxygen and chloroform C-H.',
      'Bond formation releases energy (exothermic).',
      'Stronger attraction pulls molecules closer, causing volume contraction.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: 'c12_chem_016',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'At the boiling point of a volatile binary liquid mixture under 1.0 atm atmospheric pressure, what condition must be satisfied?',
    options: [
      'P_A^0 + P_B^0 = 1.0 atm',
      'P_A + P_B = 1.0 atm (where P_A and P_B are partial vapor pressures at that T)',
      'x_A = y_A = 0.50 always',
      'ΔH_mix = 0 always'
    ],
    correctIndex: 1,
    explanation: 'A solution boils when its total equilibrium vapor pressure (P_total = P_A + P_B) equals the external pressure (1.0 atm).',
    hints: [
      'What is the definition of boiling point for any liquid?',
      'Vapor pressure must equal external atmospheric pressure.',
      'Total vapor pressure P_total = P_A + P_B = P_ext.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: 'c12_chem_020',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a real non-ideal solution, how does Raoult\'s Law relate to Henry\'s Law in the limiting composition regions?',
    options: [
      'Raoult\'s Law applies to the solute as x_solute -> 1; Henry\'s Law applies to solvent as x_solvent -> 0',
      'Raoult\'s Law applies to the solvent as x_solvent -> 1; Henry\'s Law applies to dilute solute as x_solute -> 0',
      'Both laws are identical across all concentrations',
      'Neither law applies to volatile solutions'
    ],
    correctIndex: 1,
    explanation: 'In dilute real solutions, the solvent surrounded by like molecules obeys Raoult\'s Law (P_A = P_A^0 x_A as x_A -> 1), while the dilute solute obeys Henry\'s Law (P_B = K_H x_B as x_B -> 0).',
    hints: [
      'Think about solvent vs solute behavior in dilute solutions.',
      'The majority component (solvent) behaves like pure liquid (Raoult\'s Law).',
      'The minority component (dilute solute) obeys Henry\'s Law.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: 'c12_chem_018',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Pure ethanol boils at 78.37°C and pure water boils at 100.00°C. Their minimum boiling azeotrope boils at 78.15°C. What is the depression in boiling point (in °C) relative to pure ethanol?',
    correctAnswer: 0.22,
    tolerance: 0.02,
    unit: '°C',
    explanation: 'Depression = T_boil(pure ethanol) - T_boil(azeotrope) = 78.37°C - 78.15°C = 0.22°C.',
    hints: [
      'Compare 78.37°C with 78.15°C.',
      'Subtract the lower azeotrope temperature from ethanol\'s boiling point.',
      '78.37 - 78.15 = 0.22°C.'
    ]
  },

  // ADVANCED (7)
  {
    id: 'ch_16',
    nodeId: 'c12_chem_015',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A solution of Benzene (A) and Toluene (B) has P_A^0 = 100 mmHg and P_B^0 = 40 mmHg. If the vapor in equilibrium with the solution contains 80% benzene (y_A = 0.80), calculate the mole fraction of benzene in the LIQUID phase (x_A).',
    correctAnswer: 0.615,
    tolerance: 0.02,
    unit: 'mole fraction',
    explanation: 'y_A = P_A / P_total = (100 x_A) / [100 x_A + 40 (1 - x_A)] = 0.80. Solving: 100 x_A = 0.80 (60 x_A + 40) => 100 x_A = 48 x_A + 32 => 52 x_A = 32 => x_A = 32 / 52 ≈ 0.615.',
    hints: [
      'Express y_A in terms of x_A: y_A = P_A^0 x_A / [P_A^0 x_A + P_B^0 (1 - x_A)].',
      'Plug in values: 0.80 = 100 x_A / [100 x_A + 40 (1 - x_A)].',
      'Solve 100 x_A = 0.80 (60 x_A + 40) for x_A.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: 'c12_chem_017',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is it impossible to obtain 100% pure ethanol from a 10% ethanol-water fermented broth using simple fractional distillation at 1 atm?',
    options: [
      'Ethanol decomposes chemically at 78°C',
      'At 95.6% ethanol composition, liquid and vapor mole fractions become equal (x_A = y_A), eliminating driving force for separation',
      'Water boils faster than ethanol at high concentration',
      'Ethanol reacts with atmospheric nitrogen at 78°C'
    ],
    correctIndex: 1,
    explanation: 'At the azeotropic composition (95.6% ethanol), the vapor created has the exact same composition as the liquid (x = y). Further distillation produces vapor of identical composition, halting enrichment.',
    hints: [
      'Consider what happens to liquid vs vapor composition at the azeotropic point.',
      'Azeotrope means x_A = y_A.',
      'When x_A = y_A, vaporizing the liquid does not change component ratios.'
    ]
  },
  {
    id: 'ch_18',
    nodeId: 'c12_chem_019',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'An industrial engineer needs to separate a maximum boiling azeotrope of Nitric Acid (68%) and Water. Which strategy will effectively break this azeotrope?',
    options: [
      'Altering external column pressure or adding a third entrainer chemical (Extractive Distillation)',
      'Boiling the mixture faster over a open Bunsen flame',
      'Filtering through standard paper filter media',
      'Cooling the solution down to room temperature'
    ],
    correctIndex: 0,
    explanation: 'Azeotropic compositions depend on pressure. Changing pressure or adding an extractive solvent alters relative volatilities and shifts/breaks the azeotropic point.',
    hints: [
      'Does an azeotropic point stay fixed if external pressure changes?',
      'Pressure alters vapor-liquid equilibrium curves.',
      'Extractive distillation using concentrated sulfuric acid or pressure swing distillation breaks the azeotrope.'
    ]
  },
  {
    id: 'ch_19',
    nodeId: 'c12_chem_013',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'System A (Acetone + Carbon Disulfide) exhibits a strong positive deviation. System B (Benzene + Toluene) is ideal. If both are mixed at equal mole fractions at 25°C, how do their total vapor pressures compare to Raoult\'s Law predictions?',
    options: [
      'System A total pressure > Raoult prediction; System B total pressure = Raoult prediction',
      'System A total pressure < Raoult prediction; System B total pressure = Raoult prediction',
      'Both systems total pressures are less than Raoult prediction',
      'Both systems total pressures are equal to Raoult prediction'
    ],
    correctIndex: 0,
    explanation: 'Positive deviation in System A causes P_total > P_ideal. Ideal System B obeys Raoult\'s law exactly, P_total = P_ideal.',
    hints: [
      'Positive deviation means actual vapor pressure exceeds Raoult\'s line.',
      'Ideal solution lies exactly on Raoult\'s line.',
      'System A > Raoult, System B = Raoult.'
    ]
  },
  {
    id: 'ch_20',
    nodeId: 'c12_chem_020',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'The Henry\'s Law constant for gas solute B in solvent A is K_H = 120 kPa at 25°C. The pure solvent vapor pressure is P_A^0 = 25 kPa. Calculate partial pressure of solute B (in kPa) when x_B = 0.05 in dilute solution.',
    correctAnswer: 6.0,
    tolerance: 0.1,
    unit: 'kPa',
    explanation: 'According to Henry\'s Law for solute B: P_B = K_H · x_B = 120 kPa × 0.05 = 6.0 kPa.',
    hints: [
      'Apply Henry\'s Law: P_solute = K_H · x_solute.',
      'K_H = 120 kPa and x_B = 0.05.',
      'P_B = 120 × 0.05 = 6.0 kPa.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: 'c12_chem_014',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Predict the sign of Gibbs Free Energy change of mixing (ΔG_mix) and Entropy of mixing (ΔS_mix) for a non-ideal solution with strong negative deviation:',
    options: [
      'ΔG_mix < 0 always, ΔS_mix > 0 always for spontaneous mixing',
      'ΔG_mix > 0 always, ΔS_mix < 0 always',
      'ΔG_mix = 0, ΔS_mix = 0',
      'ΔG_mix < 0, ΔS_mix < 0 always'
    ],
    correctIndex: 0,
    explanation: 'For any spontaneous mixing process (ideal or non-ideal), ΔG_mix MUST be negative (ΔG_mix < 0) and entropy increases due to randomization (ΔS_mix > 0).',
    hints: [
      'All spontaneous processes have ΔG < 0.',
      'Mixing increases disorder, so entropy change ΔS_mix > 0.',
      'Spontaneous solution formation always has ΔG_mix < 0 and ΔS_mix > 0.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: 'c12_chem_016',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'On a Temperature-Composition (T-x-y) phase diagram, what does the region trapped BETWEEN the liquidus curve (bottom) and vaporus curve (top) represent?',
    options: [
      'A two-phase heterogeneous region where liquid solution and vapor co-exist in equilibrium',
      'A solid crystal region',
      'A supercritical plasma region',
      'A region of zero pressure'
    ],
    correctIndex: 0,
    explanation: 'The area between the liquidus curve and vaporus curve on a phase diagram represents liquid-vapor phase co-existence (heterogeneous equilibrium).',
    hints: [
      'Liquidus curve represents boiling points of liquid phase.',
      'Vaporus curve represents condensation points of vapor phase.',
      'The region between them is the two-phase liquid + vapor co-existence region.'
    ]
  }
];

// ============================================================================
// CUSTOM SVG & CANVAS COMPONENT 1: VAPOR PRESSURE GRAPH
// ============================================================================

interface VaporPressureGraphProps {
  system: SolutionSystem;
  currXA: number; // Mole fraction of component A
  onXAChange: (xa: number) => void;
}

const VaporPressureGraphSVG: React.FC<VaporPressureGraphProps> = ({ system, currXA, onXAChange }) => {
  const width = 500;
  const height = 320;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;

  // Max pressure on scale
  const maxP = Math.max(system.pA0, system.pB0) * 1.8;

  // Function to calculate partial & total pressure based on deviation factor
  // Margules 1-parameter model: ln(gamma_A) = W (1-xA)^2, ln(gamma_B) = W xA^2
  const getPressures = useCallback((xA: number) => {
    const xB = 1 - xA;
    const W = system.deviationFactor;
    const gammaA = Math.exp(W * xB * xB);
    const gammaB = Math.exp(W * xA * xA);

    const pA = system.pA0 * xA * gammaA;
    const pB = system.pB0 * xB * gammaB;
    const pTotal = pA + pB;

    // Ideal values
    const pAIdeal = system.pA0 * xA;
    const pBIdeal = system.pB0 * xB;
    const pTotalIdeal = pAIdeal + pBIdeal;

    return { pA, pB, pTotal, pAIdeal, pBIdeal, pTotalIdeal };
  }, [system]);

  // Generate path strings for curves
  const numSteps = 50;
  const idealALines: string[] = [];
  const idealBLines: string[] = [];
  const idealTotLines: string[] = [];
  const realALines: string[] = [];
  const realBLines: string[] = [];
  const realTotLines: string[] = [];

  for (let i = 0; i <= numSteps; i++) {
    const xA = i / numSteps;
    const { pA, pB, pTotal, pAIdeal, pBIdeal, pTotalIdeal } = getPressures(xA);

    const xPx = margin.left + xA * graphW;
    const yA = margin.top + graphH - (pA / maxP) * graphH;
    const yB = margin.top + graphH - (pB / maxP) * graphH;
    const yTot = margin.top + graphH - (pTotal / maxP) * graphH;

    const yAIdeal = margin.top + graphH - (pAIdeal / maxP) * graphH;
    const yBIdeal = margin.top + graphH - (pBIdeal / maxP) * graphH;
    const yTotIdeal = margin.top + graphH - (pTotalIdeal / maxP) * graphH;

    const cmd = i === 0 ? 'M' : 'L';
    idealALines.push(`${cmd} ${xPx} ${yAIdeal}`);
    idealBLines.push(`${cmd} ${xPx} ${yBIdeal}`);
    idealTotLines.push(`${cmd} ${xPx} ${yTotIdeal}`);

    realALines.push(`${cmd} ${xPx} ${yA}`);
    realBLines.push(`${cmd} ${xPx} ${yB}`);
    realTotLines.push(`${cmd} ${xPx} ${yTot}`);
  }

  const { pA, pB, pTotal } = getPressures(currXA);
  const curX = margin.left + currXA * graphW;
  const curYTot = margin.top + graphH - (pTotal / maxP) * graphH;
  const curYA = margin.top + graphH - (pA / maxP) * graphH;
  const curYB = margin.top + graphH - (pB / maxP) * graphH;

  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const relativeX = (clickX - margin.left) / graphW;
    const clampedXA = Math.max(0, Math.min(1, relativeX));
    onXAChange(parseFloat(clampedXA.toFixed(2)));
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-inner">
      <div className="flex justify-between items-center w-full px-2 mb-2 text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-gold-400" />
          Vapor Pressure vs Composition Diagram (25°C)
        </span>
        <span className="text-slate-400">
          Type: <strong className={system.type === 'ideal' ? 'text-emerald-400' : system.type === 'positive' ? 'text-amber-400' : 'text-rose-400'}>
            {system.type.toUpperCase()} DEVIATION
          </strong>
        </span>
      </div>

      <svg
        width={width}
        height={height}
        className="cursor-crosshair select-none bg-slate-950/60 rounded-lg"
        onClick={handleSVGClick}
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1.0].map((tick) => {
          const gx = margin.left + tick * graphW;
          return (
            <g key={`grid-x-${tick}`}>
              <line x1={gx} y1={margin.top} x2={gx} y2={margin.top + graphH} stroke="#334155" strokeDasharray="3,3" />
              <text x={gx} y={margin.top + graphH + 18} fill="#94a3b8" fontSize="10" textAnchor="middle">
                {tick.toFixed(2)}
              </text>
            </g>
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
          const val = frac * maxP;
          const gy = margin.top + graphH - frac * graphH;
          return (
            <g key={`grid-y-${frac}`}>
              <line x1={margin.left} y1={gy} x2={margin.left + graphW} y2={gy} stroke="#334155" strokeDasharray="3,3" />
              <text x={margin.left - 8} y={gy + 3} fill="#94a3b8" fontSize="10" textAnchor="end">
                {val.toFixed(1)}
              </text>
            </g>
          );
        })}

        {/* Ideal Raoult's Lines (Dashed) */}
        <path d={idealALines.join(' ')} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.6} />
        <path d={idealBLines.join(' ')} fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.6} />
        <path d={idealTotLines.join(' ')} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" opacity={0.5} />

        {/* Real Non-Ideal Curves */}
        <path d={realALines.join(' ')} fill="none" stroke="#60a5fa" strokeWidth="2.5" />
        <path d={realBLines.join(' ')} fill="none" stroke="#34d399" strokeWidth="2.5" />
        <path d={realTotLines.join(' ')} fill="none" stroke="#f59e0b" strokeWidth="3" />

        {/* Current mole fraction vertical marker line */}
        <line x1={curX} y1={margin.top} x2={curX} y2={margin.top + graphH} stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2,2" />

        {/* Intersection Dots */}
        <circle cx={curX} cy={curYA} r="5" fill="#60a5fa" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={curX} cy={curYB} r="5" fill="#34d399" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx={curX} cy={curYTot} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

        {/* Pure component endpoints labels */}
        <text x={margin.left - 5} y={margin.top + graphH - (system.pB0 / maxP) * graphH - 6} fill="#34d399" fontSize="11" fontWeight="bold">
          P_{system.componentB}^0 ({system.pB0})
        </text>
        <text x={margin.left + graphW + 5} y={margin.top + graphH - (system.pA0 / maxP) * graphH - 6} fill="#60a5fa" fontSize="11" fontWeight="bold">
          P_{system.componentA}^0 ({system.pA0})
        </text>

        {/* Azeotrope Marker if present */}
        {system.azeotropeXA !== null && (
          <g>
            {(() => {
              const azX = margin.left + system.azeotropeXA * graphW;
              const { pTotal: azPTot } = getPressures(system.azeotropeXA);
              const azY = margin.top + graphH - (azPTot / maxP) * graphH;
              return (
                <g>
                  <circle cx={azX} cy={azY} r="7" fill="#ef4444" className="animate-ping" opacity={0.7} />
                  <circle cx={azX} cy={azY} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
                  <text x={azX} y={azY - 12} fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Azeotrope (x_A={system.azeotropeXA})
                  </text>
                </g>
              );
            })()}
          </g>
        )}

        {/* Axis Labels */}
        <text x={margin.left + graphW / 2} y={height - 12} fill="#cbd5e1" fontSize="11" fontWeight="semibold" textAnchor="middle">
          Mole Fraction of {system.componentA} (x_A) →
        </text>
        <text
          x={18}
          y={margin.top + graphH / 2}
          fill="#cbd5e1"
          fontSize="11"
          fontWeight="semibold"
          textAnchor="middle"
          transform={`rotate(-90, 18, ${margin.top + graphH / 2})`}
        >
          Vapor Pressure (kPa)
        </text>
      </svg>

      {/* Curve Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-amber-500 rounded"></span> Total P_total
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-gold-400 rounded"></span> Partial P_{system.componentA}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-emerald-400 rounded"></span> Partial P_{system.componentB}
        </span>
        <span className="flex items-center gap-1.5 opacity-60">
          <span className="w-3 h-0.5 border-t border-dashed border-slate-300"></span> Raoult's Ideal Line
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// CUSTOM SVG COMPONENT 2: BOILING POINT - AZEOTROPE PHASE DIAGRAM
// ============================================================================

interface BoilingPointDiagramProps {
  system: SolutionSystem;
  currXA: number;
}

const BoilingPointAzeotropeSVG: React.FC<BoilingPointDiagramProps> = ({ system, currXA }) => {
  const width = 500;
  const height = 300;
  const margin = { top: 30, right: 30, bottom: 50, left: 60 };
  const graphW = width - margin.left - margin.right;
  const graphH = height - margin.top - margin.bottom;

  const minTemp = Math.min(system.boilingA, system.boilingB, system.azeotropeTemp ?? 999) - 10;
  const maxTemp = Math.max(system.boilingA, system.boilingB, system.azeotropeTemp ?? -999) + 15;
  const rangeTemp = maxTemp - minTemp;

  // Compute boiling curves (Liquidus T_liq and Vaporus T_vap)
  const getBoilingTemps = (xA: number) => {
    // Ideal linear interpolation baseline
    const idealT = system.boilingB * (1 - xA) + system.boilingA * xA;

    let dev = 0;
    if (system.type === 'positive') {
      // Positive VP deviation -> Minimum boiling point (depression)
      dev = -35 * Math.sin(Math.PI * xA);
    } else if (system.type === 'negative') {
      // Negative VP deviation -> Maximum boiling point (elevation)
      dev = 38 * Math.sin(Math.PI * xA);
    }

    const T_liq = idealT + dev;
    // Vapor phase is slightly offset to form the phase equilibrium lens
    const lensWidth = system.type === 'ideal' ? 8 * Math.sin(Math.PI * xA) : 5 * Math.sin(Math.PI * xA);
    const T_vap = T_liq - lensWidth;

    return { T_liq, T_vap };
  };

  const steps = 50;
  const liqPath: string[] = [];
  const vapPath: string[] = [];

  for (let i = 0; i <= steps; i++) {
    const xA = i / steps;
    const { T_liq, T_vap } = getBoilingTemps(xA);

    const xPx = margin.left + xA * graphW;
    const yLiq = margin.top + graphH - ((T_liq - minTemp) / rangeTemp) * graphH;
    const yVap = margin.top + graphH - ((T_vap - minTemp) / rangeTemp) * graphH;

    const cmd = i === 0 ? 'M' : 'L';
    liqPath.push(`${cmd} ${xPx} ${yLiq}`);
    vapPath.push(`${cmd} ${xPx} ${yVap}`);
  }

  const { T_liq, T_vap } = getBoilingTemps(currXA);
  const curX = margin.left + currXA * graphW;
  const curYLiq = margin.top + graphH - ((T_liq - minTemp) / rangeTemp) * graphH;

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-inner">
      <div className="flex justify-between items-center w-full px-2 mb-2 text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-400" />
          Boiling Temperature vs Composition Phase Diagram (1 atm)
        </span>
        <span className="text-slate-400 font-mono">
          T_boil(x_A={currXA}) = <strong>{T_liq.toFixed(1)} °C</strong>
        </span>
      </div>

      <svg width={width} height={height} className="bg-slate-950/60 rounded-lg select-none">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1.0].map((tick) => {
          const gx = margin.left + tick * graphW;
          return (
            <g key={`t-grid-x-${tick}`}>
              <line x1={gx} y1={margin.top} x2={gx} y2={margin.top + graphH} stroke="#334155" strokeDasharray="3,3" />
              <text x={gx} y={margin.top + graphH + 18} fill="#94a3b8" fontSize="10" textAnchor="middle">
                {tick.toFixed(2)}
              </text>
            </g>
          );
        })}

        {[0, 0.25, 0.5, 0.75, 1.0].map((frac) => {
          const tVal = minTemp + frac * rangeTemp;
          const gy = margin.top + graphH - frac * graphH;
          return (
            <g key={`t-grid-y-${frac}`}>
              <line x1={margin.left} y1={gy} x2={margin.left + graphW} y2={gy} stroke="#334155" strokeDasharray="3,3" />
              <text x={margin.left - 8} y={gy + 3} fill="#94a3b8" fontSize="10" textAnchor="end">
                {tVal.toFixed(0)}°C
              </text>
            </g>
          );
        })}

        {/* Phase regions labels */}
        <text x={margin.left + graphW / 2} y={margin.top + 20} fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle" opacity={0.8}>
          VAPOR PHASE (GAS)
        </text>
        <text x={margin.left + graphW / 2} y={margin.top + graphH - 15} fill="#0ea5e9" fontSize="11" fontWeight="bold" textAnchor="middle" opacity={0.8}>
          LIQUID PHASE (SOLUTION)
        </text>

        {/* Liquidus and Vaporus Curves */}
        <path d={liqPath.join(' ')} fill="none" stroke="#0284c7" strokeWidth="2.5" />
        <path d={vapPath.join(' ')} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,3" />

        {/* Current State Marker */}
        <line x1={curX} y1={margin.top} x2={curX} y2={margin.top + graphH} stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2,2" />
        <circle cx={curX} cy={curYLiq} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />

        {/* Pure component boiling dots */}
        <text x={margin.left - 5} y={margin.top + graphH - ((system.boilingB - minTemp) / rangeTemp) * graphH} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="end">
          {system.componentB} ({system.boilingB}°C)
        </text>
        <text x={margin.left + graphW + 5} y={margin.top + graphH - ((system.boilingA - minTemp) / rangeTemp) * graphH} fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="start">
          {system.componentA} ({system.boilingA}°C)
        </text>

        {/* Azeotrope Boiling Point Highlight */}
        {system.azeotropeXA !== null && system.azeotropeTemp !== null && (
          <g>
            {(() => {
              const azX = margin.left + system.azeotropeXA * graphW;
              const azY = margin.top + graphH - ((system.azeotropeTemp - minTemp) / rangeTemp) * graphH;
              return (
                <g>
                  <circle cx={azX} cy={azY} r="6" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                  <text x={azX} y={system.type === 'positive' ? azY + 18 : azY - 10} fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                    {system.type === 'positive' ? 'Min Boiling Azeotrope' : 'Max Boiling Azeotrope'} ({system.azeotropeTemp}°C)
                  </text>
                </g>
              );
            })()}
          </g>
        )}

        {/* Axis Titles */}
        <text x={margin.left + graphW / 2} y={height - 10} fill="#cbd5e1" fontSize="11" fontWeight="semibold" textAnchor="middle">
          Mole Fraction x_A →
        </text>
        <text
          x={18}
          y={margin.top + graphH / 2}
          fill="#cbd5e1"
          fontSize="11"
          fontWeight="semibold"
          textAnchor="middle"
          transform={`rotate(-90, 18, ${margin.top + graphH / 2})`}
        >
          Temperature (°C)
        </text>
      </svg>

      <div className="flex gap-4 mt-2 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-1 bg-gold-500 rounded"></span> Liquidus Curve (Boiling Begins)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-rose-500"></span> Vaporus Curve (Dew Point)
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// CUSTOM CANVAS COMPONENT 3: DYNAMIC MOLECULAR INTERACTION SIMULATOR
// ============================================================================

interface MolecularCanvasProps {
  system: SolutionSystem;
  currXA: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'A' | 'B';
  state: 'liquid' | 'vapor';
}

const MolecularInteractionsCanvas: React.FC<MolecularCanvasProps> = ({ system, currXA }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;
    const liquidSurfaceY = height * 0.55;

    // Initialize 60 particles based on mole fraction
    const totalParticles = 60;
    const numA = Math.round(totalParticles * currXA);
    const numB = totalParticles - numA;

    const particles: Particle[] = [];

    // Create Component A particles
    for (let i = 0; i < numA; i++) {
      particles.push({
        x: 20 + Math.random() * (width - 40),
        y: liquidSurfaceY + 10 + Math.random() * (height - liquidSurfaceY - 30),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: 'A',
        state: 'liquid'
      });
    }

    // Create Component B particles
    for (let i = 0; i < numB; i++) {
      particles.push({
        x: 20 + Math.random() * (width - 40),
        y: liquidSurfaceY + 10 + Math.random() * (height - liquidSurfaceY - 30),
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        type: 'B',
        state: 'liquid'
      });
    }

    // Evaporation probability parameters
    // Positive deviation = higher escape rate; Negative = lower escape rate
    let escapeFactor = 0.005;
    if (system.type === 'positive') escapeFactor = 0.015;
    if (system.type === 'negative') escapeFactor = 0.001;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Background liquid / vapor regions
      // Vapor region
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, liquidSurfaceY);

      // Liquid region
      const liquidGrad = ctx.createLinearGradient(0, liquidSurfaceY, 0, height);
      liquidGrad.addColorStop(0, '#1e293b');
      liquidGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = liquidGrad;
      ctx.fillRect(0, liquidSurfaceY, width, height - liquidSurfaceY);

      // Liquid meniscus line
      ctx.beginPath();
      ctx.moveTo(0, liquidSurfaceY);
      ctx.lineTo(width, liquidSurfaceY);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Liquid region label
      ctx.fillStyle = '#64748b';
      ctx.font = '10px sans-serif';
      ctx.fillText('VAPOR PHASE (Gas Equilibrium)', 15, 20);
      ctx.fillText('LIQUID SOLUTION PHASE', 15, liquidSurfaceY + 20);

      // Render hydrogen bonds or inter-particle attraction lines in liquid phase
      if (system.type === 'negative') {
        // Draw hydrogen bond links between A and B particles in liquid
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            if (p1.state === 'liquid' && p2.state === 'liquid' && p1.type !== p2.type) {
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 35) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = '#f43f5e'; // Red hydrogen bond indicator
                ctx.lineWidth = 1.5;
                ctx.setLineDash([2, 2]);
                ctx.stroke();
                ctx.setLineDash([]);
              }
            }
          }
        }
      }

      // Update & render particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off side walls
        if (p.x < 12 || p.x > width - 12) p.vx *= -1;

        if (p.state === 'liquid') {
          // Bounce off bottom
          if (p.y > height - 12) p.vy *= -1;

          // Check surface evaporation
          if (p.y < liquidSurfaceY + 5) {
            if (Math.random() < escapeFactor) {
              p.state = 'vapor';
              p.vy = -Math.abs(p.vy) - 0.5; // push into vapor
            } else {
              p.vy = Math.abs(p.vy); // bounce back down
            }
          }
        } else {
          // Vapor phase motion
          if (p.y < 12) p.vy *= -1; // bounce top ceiling

          // Condensation back into liquid
          if (p.y > liquidSurfaceY - 5) {
            if (Math.random() < 0.02) {
              p.state = 'liquid';
              p.vy = Math.abs(p.vy);
            } else {
              p.vy = -Math.abs(p.vy);
            }
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.type === 'A' ? 6 : 5, 0, Math.PI * 2);
        if (p.type === 'A') {
          ctx.fillStyle = '#3b82f6'; // Blue for A
        } else {
          ctx.fillStyle = '#10b981'; // Green for B
        }
        ctx.fill();
        ctx.strokeStyle = p.state === 'vapor' ? '#ffffff' : '#000000';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [system, currXA]);

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-inner">
      <div className="flex justify-between items-center w-full px-2 mb-2 text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-yellow-400" />
          Molecular Interaction & Escape Rate Simulation
        </span>
        <span className="text-slate-400">
          Intermolecular Attraction: <strong className={system.type === 'negative' ? 'text-rose-400' : system.type === 'positive' ? 'text-amber-400' : 'text-emerald-400'}>
            {system.type === 'negative' ? 'A-B > A-A, B-B (H-Bonds)' : system.type === 'positive' ? 'A-B < A-A, B-B (Repulsive/Weak)' : 'A-B = A-A = B-B (Equal)'}
          </strong>
        </span>
      </div>

      <canvas ref={canvasRef} width={500} height={200} className="rounded-lg bg-slate-950 border border-slate-800" />

      <div className="flex gap-6 mt-2 text-xs text-slate-300">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-gold-500 rounded-full border border-white"></span> Component A ({system.componentA})
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-emerald-500 rounded-full border border-white"></span> Component B ({system.componentB})
        </span>
        {system.type === 'negative' && (
          <span className="flex items-center gap-1.5 text-rose-400 font-medium">
            <span className="w-4 h-0.5 border-t border-dashed border-rose-500"></span> Intermolecular H-Bond (C-H···O=C)
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// CUSTOM SVG COMPONENT 4: CALORIMETER & VOLUME CHANGE VISUALIZER
// ============================================================================

interface CalorimeterProps {
  system: SolutionSystem;
  currXA: number;
}

const SolutionVolumeCalorimeterSVG: React.FC<CalorimeterProps> = ({ system, currXA }) => {
  // Volume change calculation: ΔV_mix = V_real - V_ideal
  // For positive dev: ΔV > 0 (expansion); For negative dev: ΔV < 0 (contraction)
  let deltaVPercent = 0;
  let tempChange = 0; // °C

  if (system.type === 'positive') {
    deltaVPercent = +3.5 * Math.sin(Math.PI * currXA);
    tempChange = -4.2 * Math.sin(Math.PI * currXA); // Endothermic cooling
  } else if (system.type === 'negative') {
    deltaVPercent = -3.8 * Math.sin(Math.PI * currXA);
    tempChange = +6.5 * Math.sin(Math.PI * currXA); // Exothermic warming
  }

  const baseHeight = 120; // px
  const liquidHeight = baseHeight * (1 + deltaVPercent / 100);

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-inner w-full">
      <div className="flex justify-between items-center w-full px-2 mb-2 text-xs font-semibold text-slate-300">
        <span className="flex items-center gap-1.5">
          <Beaker className="w-4 h-4 text-gold-400" />
          Mixing Calorimetry & Volume Change (ΔH_mix & ΔV_mix)
        </span>
        <span className="text-slate-400">
          State: <strong className="text-gold-400">x_A = {currXA.toFixed(2)}</strong>
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full px-2">
        {/* Beaker Volume Visualizer */}
        <div className="flex flex-col items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-medium text-slate-400 mb-2">Graduated Cylinder (Volume)</span>
          <svg width={140} height={160} className="overflow-visible">
            {/* Beaker Outline */}
            <rect x={30} y={10} width={80} height={140} fill="none" stroke="#64748b" strokeWidth="3" rx="4" />
            {/* Ideal Line Marker */}
            <line x1={25} y1={150 - baseHeight} x2={115} y2={150 - baseHeight} stroke="#94a3b8" strokeDasharray="3,3" strokeWidth="1.5" />
            <text x={118} y={150 - baseHeight + 4} fill="#94a3b8" fontSize="9">
              V_ideal
            </text>

            {/* Actual Solution Fill */}
            <rect
              x={32}
              y={150 - liquidHeight}
              width={76}
              height={liquidHeight}
              fill={deltaVPercent > 0 ? '#f59e0b' : deltaVPercent < 0 ? '#38bdf8' : '#10b981'}
              opacity={0.65}
              rx="2"
            />
            {/* Meniscus */}
            <ellipse
              cx={70}
              cy={150 - liquidHeight}
              rx={38}
              ry={5}
              fill={deltaVPercent > 0 ? '#fcc419' : deltaVPercent < 0 ? '#7dd3fc' : '#34d399'}
            />

            {/* Scale Markings */}
            {[20, 40, 60, 80, 100, 120].map((h) => (
              <line key={h} x1={30} y1={150 - h} x2={40} y2={150 - h} stroke="#475569" strokeWidth="1" />
            ))}
          </svg>

          <div className="mt-2 text-center text-xs">
            <div className="font-semibold text-slate-200">
              ΔV_mix:{' '}
              <span className={deltaVPercent > 0 ? 'text-amber-400' : deltaVPercent < 0 ? 'text-gold-400' : 'text-emerald-400'}>
                {deltaVPercent > 0 ? `+${deltaVPercent.toFixed(2)}% (Expansion)` : deltaVPercent < 0 ? `${deltaVPercent.toFixed(2)}% (Contraction)` : '0.00% (Additive)'}
              </span>
            </div>
          </div>
        </div>

        {/* Thermometer / Enthalpy Visualizer */}
        <div className="flex flex-col items-center bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-medium text-slate-400 mb-2">Reaction Thermometer (ΔT)</span>
          <svg width={140} height={160} className="overflow-visible">
            {/* Thermometer Stem */}
            <rect x={62} y={15} width={16} height={110} fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="8" />
            {/* Thermometer Bulb */}
            <circle cx={70} cy={135} r={16} fill="#ef4444" stroke="#64748b" strokeWidth="2" />

            {/* Liquid Mercury Height */}
            {(() => {
              const baseTempY = 80;
              const mercuryY = baseTempY - tempChange * 5;
              const clampedY = Math.max(20, Math.min(110, mercuryY));
              return (
                <rect
                  x={65}
                  y={clampedY}
                  width={10}
                  height={135 - clampedY}
                  fill="#ef4444"
                  rx={4}
                />
              );
            })()}

            {/* Reference Line (25°C) */}
            <line x1={50} y1={80} x2={90} y2={80} stroke="#94a3b8" strokeDasharray="2,2" strokeWidth="1.5" />
            <text x={95} y={83} fill="#94a3b8" fontSize="9">
              25.0°C
            </text>
          </svg>

          <div className="mt-2 text-center text-xs">
            <div className="font-semibold text-slate-200">
              ΔH_mix:{' '}
              <span className={tempChange < 0 ? 'text-amber-400' : tempChange > 0 ? 'text-rose-400' : 'text-emerald-400'}>
                {tempChange > 0
                  ? `Exothermic (ΔH < 0, +${tempChange.toFixed(1)}°C)`
                  : tempChange < 0
                  ? `Endothermic (ΔH > 0, ${tempChange.toFixed(1)}°C)`
                  : 'Zero Heat (ΔH = 0)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN REACT COMPONENT
// ============================================================================

export default function C12_ChemistryIdealandnonidealsolutionsSim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Lab Interactive Controls
  const [selectedSystemId, setSelectedSystemId] = useState<string>('positive_ethanol_water');
  const [currXA, setCurrXA] = useState<number>(0.50);
  const [activeLabStep, setActiveLabStep] = useState<number>(0);

  // Predictions & Observations
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [showDiscoveryExplanation, setShowDiscoveryExplanation] = useState<boolean>(false);

  // Challenge Engine States
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Feedback components triggers
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // BKT & SRS Stores
  const [bktStates, setBktStates] = useState<Record<NodeId, BKTState>>(() => {
    const initial: Partial<Record<NodeId, BKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial as Record<NodeId, BKTState>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach((ch) => {
      initial[ch.id] = createReviewItem(ch.id);
    });
    return initial;
  });

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active solution system preset
  const activeSystem = useMemo(() => {
    return SYSTEM_PRESETS.find((s) => s.id === selectedSystemId) || SYSTEM_PRESETS[1];
  }, [selectedSystemId]);

  // Current challenge
  const activeChallenge = CHALLENGES[currentChallengeIdx];

  // Speech helper call trigger
  const speakText = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Graceful fallback
    }
  }, []);

  // Audio trigger helper
  const playSound = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Graceful fallback
    }
  }, []);

  // Reset inactivity timer for hints
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && activeChallenge) {
        setCurrentHintText(activeChallenge.hints[0]);
        setShowHint(true);
        playSound('hint');
      }
    }, 10000); // 10s inactivity auto-hint
  }, [activeTab, activeChallenge, playSound]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetInactivityTimer]);

  // Initial greeting speech
  useEffect(() => {
    speakText("Welcome to the Ideal and Non-Ideal Solutions Virtual Laboratory. Select a tab to start discovering Raoult's Law and Azeotropes.");
  }, [speakText]);

  // Handle Discovery Option Submit
  const handleDiscoverySubmit = (optIdx: number) => {
    setDiscoverySelected(optIdx);
    setShowDiscoveryExplanation(true);
    if (optIdx === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speakText('Correct! Acetone and chloroform form hydrogen bonds, causing volume contraction and heat release.');
    } else {
      playSound('error');
      speakText('Not quite. Think about how hydrogen bonds pull molecules closer together.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    if (challengeFeedback !== 'none') return;

    let isCorrect = false;

    if (activeChallenge.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && activeChallenge.correctAnswer !== undefined) {
        const tol = activeChallenge.tolerance || 0.05;
        isCorrect = Math.abs(val - activeChallenge.correctAnswer) <= tol;
      }
    } else {
      isCorrect = userSelectedOption === activeChallenge.correctIndex;
    }

    // Update BKT & SRS
    const nodeId = activeChallenge.nodeId;
    const currentBKT = bktStates[nodeId] || createBKTState(nodeId);
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsItems[activeChallenge.id] || createReviewItem(activeChallenge.id);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [activeChallenge.id]: updatedSRS }));

    if (isCorrect) {
      setChallengeFeedback('correct');
      playSound('drop-correct');
      playSound('sparkle');
      setShowSparkle(true);
      setShowSuccess(true);
      setScore((prev) => prev + (activeChallenge.difficulty === 'advanced' ? 15 : activeChallenge.difficulty === 'standard' ? 10 : 5));
      setCompletedChallenges((prev) => new Set(prev).add(activeChallenge.id));
      speakText('Excellent response! That is correct.');

      setTimeout(() => setShowSuccess(false), 2000);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      setChallengeFeedback('incorrect');
      playSound('drop-wrong');
      speakText('That is not correct. Review the hint and try again.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    playSound('whoosh');
    setUserSelectedOption(null);
    setUserNumericInput('');
    setChallengeFeedback('none');

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Completed all challenges!
      playSound('celebration');
      setShowConfetti(true);
      speakText('Congratulations! You have completed all physical chemistry solution challenges.');
      recordGameScore('c12_chem_011', score, 100);
    }
  };

  // Lab Step Selection handler
  const handleStepClick = (idx: number) => {
    setActiveLabStep(idx);
    playSound('tap');
    const step = EXPLORATION_STEPS[idx];
    if (step) {
      speakText(step.title);
      // Auto switch preset matching step theme
      if (idx === 0) setSelectedSystemId('ideal_benzene_toluene');
      if (idx === 1) setSelectedSystemId('positive_ethanol_water');
      if (idx === 2) setSelectedSystemId('negative_acetone_chloroform');
      if (idx === 3) setSelectedSystemId('positive_acetone_cs2');
      if (idx === 4) setSelectedSystemId('negative_nitric_water');
    }
  };

  // Calculations for Lab Header Display
  const currentPressures = useMemo(() => {
    const xA = currXA;
    const xB = 1 - currXA;
    const W = activeSystem.deviationFactor;
    const gammaA = Math.exp(W * xB * xB);
    const gammaB = Math.exp(W * xA * xA);

    const pA = activeSystem.pA0 * xA * gammaA;
    const pB = activeSystem.pB0 * xB * gammaB;
    const pTotal = pA + pB;
    const yA = pTotal > 0 ? pA / pTotal : 0;
    const yB = 1 - yA;

    return { pA, pB, pTotal, yA, yB };
  }, [currXA, activeSystem]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none">
      {/* Feedback Overlay Engine Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* TOP HEADER / TITLE BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gold-500/10 border border-gold-500/30 rounded-xl text-gold-400">
            <FlaskConical className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-gold-500/20 text-gold-300 rounded-full border border-gold-500/30">
                ISC Class 12 Chemistry
              </span>
              <span className="text-xs text-slate-400 font-mono">Nodes: c12_chem_011 — c12_chem_020</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-gold-400 via-gold-300 to-gold-400 bg-clip-text text-transparent">
              Ideal & Non-Ideal Solutions Simulator
            </h1>
          </div>
        </div>

        {/* TOP METRICS & TAB SWITCHER */}
        <div className="flex items-center gap-3 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveTab('discovery'); playSound('tap'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery' ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); playSound('tap'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab' ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> Virtual Lab
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges' ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" /> Challenges ({score} pts)
          </button>
          <button
            onClick={() => { setActiveTab('summary'); playSound('tap'); }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary' ? 'bg-gold-500 text-slate-950 shadow-lg shadow-gold-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Mastery
          </button>
        </div>
      </header>

      {/* MAIN CONTENT TAB CONTAINER */}
      <main className="max-w-7xl mx-auto">
        {/* ==================================================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {/* ==================================================================== */}
        {activeTab === 'discovery' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Scenario Narrative */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 text-gold-400 font-bold mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span>Interactive Context & Lab Scenario</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3">{SCENARIO.title}</h2>
                <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
                <p className="text-slate-400 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  {SCENARIO.context}
                </p>
              </div>

              {/* Counterintuitive Discovery Question */}
              <div className="bg-slate-900 border border-gold-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>Pre-Lab Discovery Challenge</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

                <div className="space-y-3 mb-4">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        discoverySelected === idx
                          ? idx === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                            : 'bg-rose-500/20 border-rose-500 text-rose-200'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {showDiscoveryExplanation && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-gold-500/40 text-xs text-gold-200 leading-relaxed animate-fadeIn">
                    <strong className="text-gold-400 font-semibold block mb-1">Thermodynamic Analysis:</strong>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                )}
              </div>

              {/* Prediction Questions Array Renderer */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-gold-400" />
                  Theoretical Hypothesis Predictions
                </h3>
                <div className="space-y-6">
                  {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                    <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <p className="text-sm font-medium text-slate-200 mb-3">{pq.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {pq.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredictionAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                              playSound('tap');
                            }}
                            className={`p-2.5 text-xs rounded-lg border text-left transition-all ${
                              predictionAnswers[pIdx] === oIdx
                                ? oIdx === pq.correctIndex
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                  : 'bg-rose-500/20 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                      {predictionAnswers[pIdx] !== undefined && (
                        <p className="text-xs text-slate-400 bg-slate-900/80 p-2.5 rounded border border-slate-800">
                          <strong className="text-gold-400">Lab Verification Method:</strong> {pq.verifyInstruction}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Node Index & Core Formulas */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                <h3 className="text-sm font-bold text-slate-200 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold-400" />
                  Syllabus Learning Nodes
                </h3>
                <div className="space-y-2.5">
                  {ALL_NODE_IDS.map((id) => {
                    const info = NODE_INFO[id];
                    const bkt = bktStates[id];
                    const level = getMasteryLevel(bkt);
                    return (
                      <div key={id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-mono text-gold-400">{info.code}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              level === 'mastered'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : level === 'proficient'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {level}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200">{info.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800/80 mt-1">
                          {info.formula}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 2: VIRTUAL INTERACTIVE CHEMISTRY LAB */}
        {/* ==================================================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Guided Steps Stepper (Exploration Steps Map) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Guided Exploration Labs (Step {activeLabStep + 1} of 5)
              </div>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {EXPLORATION_STEPS.map((step, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleStepClick(sIdx)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      activeLabStep === sIdx
                        ? 'bg-gold-500/20 border-gold-500 text-gold-200 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-mono font-bold text-gold-400">LAB {sIdx + 1}</span>
                      <span className="text-[10px] font-mono text-slate-500">{step.nodeId}</span>
                    </div>
                    <div className="text-xs font-semibold line-clamp-1">{step.title.split(':')[1] || step.title}</div>
                  </button>
                ))}
              </div>

              {/* Instruction banner for active step */}
              <div className="mt-4 p-4 bg-gold-950/40 border border-gold-500/30 rounded-xl text-xs text-gold-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gold-300 font-bold block mb-0.5">{EXPLORATION_STEPS[activeLabStep].title}</strong>
                  {EXPLORATION_STEPS[activeLabStep].instruction}
                </div>
              </div>
            </div>

            {/* Lab System Control Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Mixture System Selector */}
              <div className="w-full lg:w-1/3">
                <label className="block text-xs font-bold text-slate-300 mb-2">Select Solution Binary Pair:</label>
                <select
                  value={selectedSystemId}
                  onChange={(e) => {
                    setSelectedSystemId(e.target.value);
                    playSound('tap');
                  }}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-3 text-sm font-semibold focus:outline-none focus:border-gold-500"
                >
                  {SYSTEM_PRESETS.map((sys) => (
                    <option key={sys.id} value={sys.id}>
                      {sys.name} ({sys.type.toUpperCase()})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-400 mt-2 italic">{activeSystem.interactionDescription}</p>
              </div>

              {/* Mole Fraction x_A Interactive Slider */}
              <div className="w-full lg:w-2/3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-300">
                    Mole Fraction Liquid {activeSystem.componentA} (x_A):
                  </span>
                  <span className="text-sm font-mono font-bold text-gold-400 px-3 py-1 bg-slate-900 rounded-lg border border-slate-800">
                    x_A = {currXA.toFixed(2)} | x_B = {(1 - currXA).toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={currXA}
                  onChange={(e) => setCurrXA(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>Pure {activeSystem.componentB} (x_A = 0.0)</span>
                  <span>Equimolar (0.50)</span>
                  <span>Pure {activeSystem.componentA} (x_A = 1.0)</span>
                </div>
              </div>
            </div>

            {/* Live Equilibrium Thermodynamics Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Total P_total</span>
                <span className="text-base font-mono font-bold text-amber-400">{currentPressures.pTotal.toFixed(2)} kPa</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Partial P_{activeSystem.componentA}</span>
                <span className="text-base font-mono font-bold text-gold-400">{currentPressures.pA.toFixed(2)} kPa</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Partial P_{activeSystem.componentB}</span>
                <span className="text-base font-mono font-bold text-emerald-400">{currentPressures.pB.toFixed(2)} kPa</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-semibold">Vapor Fraction y_A</span>
                <span className="text-base font-mono font-bold text-gold-300">{currentPressures.yA.toFixed(3)}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-center col-span-2 md:col-span-1">
                <span className="text-[10px] text-slate-400 block font-semibold">Vapor Fraction y_B</span>
                <span className="text-base font-mono font-bold text-teal-300">{currentPressures.yB.toFixed(3)}</span>
              </div>
            </div>

            {/* Visualizers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VaporPressureGraphSVG system={activeSystem} currXA={currXA} onXAChange={setCurrXA} />
              <BoilingPointAzeotropeSVG system={activeSystem} currXA={currXA} />
              <MolecularInteractionsCanvas system={activeSystem} currXA={currXA} />
              <SolutionVolumeCalorimeterSVG system={activeSystem} currXA={currXA} />
            </div>

            {/* Observation Questions Section (Rendered via .map()) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                In-Lab Dynamic Observation Checkpoints
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-200 mb-3">{oq.question}</p>
                      <div className="space-y-2 mb-3">
                        {oq.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                              playSound('tap');
                            }}
                            className={`w-full text-left p-2.5 text-xs rounded-lg border transition-all ${
                              observationAnswers[oIdx] === optIdx
                                ? optIdx === oq.correctIndex
                                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                                  : 'bg-rose-500/20 border-rose-500 text-rose-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    {observationAnswers[oIdx] !== undefined && (
                      <div className="text-[11px] text-gold-300 bg-slate-900 p-2 rounded border border-slate-800">
                        {observationAnswers[oIdx] === oq.correctIndex
                          ? '✓ Correct observation! Matches physical chemistry theory.'
                          : '✗ Review the interactive graphs above and test again.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 3: CHALLENGES & MASTERY PRACTICE */}
        {/* ==================================================================== */}
        {activeTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress Bar */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-lg flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1.5">
                  <span>
                    Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                  </span>
                  <span className="font-mono text-gold-400">Score: {score} pts</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-gold-500 to-emerald-400 h-full transition-all duration-300"
                    style={{ width: `${((currentChallengeIdx + 1) / CHALLENGES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
              <HintBubble show={showHint} text={currentHintText} />

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${
                      activeChallenge.difficulty === 'foundation'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : activeChallenge.difficulty === 'standard'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {activeChallenge.difficulty.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{activeChallenge.nodeId}</span>
                </div>
                <button
                  onClick={() => {
                    setCurrentHintText(activeChallenge.hints[0]);
                    setShowHint(!showHint);
                    playSound('hint');
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/30 transition-all"
                >
                  <HelpCircle className="w-4 h-4" /> Hint
                </button>
              </div>

              <h3 className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
                {activeChallenge.question}
              </h3>

              {/* Multiple Choice Answers */}
              {activeChallenge.type !== 'numeric' && activeChallenge.options && (
                <div className="space-y-3 mb-6">
                  {activeChallenge.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      disabled={challengeFeedback !== 'none'}
                      onClick={() => {
                        setUserSelectedOption(oIdx);
                        playSound('tap');
                      }}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        userSelectedOption === oIdx
                          ? challengeFeedback === 'correct'
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                            : challengeFeedback === 'incorrect'
                            ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                            : 'bg-gold-500/20 border-gold-500 text-gold-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {activeChallenge.type === 'numeric' && (
                <div className="mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-sm">
                  <label className="block text-xs font-semibold text-slate-400 mb-2">
                    Enter Numeric Answer ({activeChallenge.unit || 'value'}):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={userNumericInput}
                      onChange={(e) => setUserNumericInput(e.target.value)}
                      placeholder="e.g. 8.8"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-white font-mono focus:outline-none focus:border-gold-500"
                    />
                    <span className="text-xs font-mono text-slate-400">{activeChallenge.unit}</span>
                  </div>
                </div>
              )}

              {/* Submit & Next Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                {challengeFeedback === 'none' ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={activeChallenge.type === 'numeric' ? !userNumericInput : userSelectedOption === null}
                    className="w-full md:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold-500/20"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="w-full md:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                  >
                    Next Challenge <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Explanation Card after answer */}
              {challengeFeedback !== 'none' && (
                <div
                  className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                    challengeFeedback === 'correct'
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}
                >
                  <strong className="block font-bold mb-1">Detailed Explanation:</strong>
                  {activeChallenge.explanation}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TAB 4: MASTERY, MISCONCEPTIONS & REAL WORLD INDUSTRY */}
        {/* ==================================================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card (Rendered via Object) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, stepIdx) => (
                  <div key={stepIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {stepIdx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{stepStr}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Grid (Presets Preserved & Expanded) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-rose-400" />
                Common Misconceptions & Scientific Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MISCONCEPTIONS.map((m, mIdx) => (
                  <div key={mIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-rose-400">{m.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">{m.nodeId}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-through mb-2 bg-rose-950/20 p-2 rounded border border-rose-900/30">
                        "{m.misconception}"
                      </p>
                    </div>
                    <p className="text-xs text-emerald-300 bg-emerald-950/20 p-2.5 rounded border border-emerald-900/30">
                      ✓ <strong>Correction:</strong> {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BKT Knowledge State Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-gold-400" />
                BKT Bayesian Mastery Tracking Matrix
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map((id) => {
                  const bkt = bktStates[id];
                  const level = getMasteryLevel(bkt);
                  const p = bkt ? bkt.pKnown * 100 : 0;
                  return (
                    <div key={id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <span className="text-[10px] font-mono text-gold-400 block mb-1">{id}</span>
                      <span className="text-xs font-bold text-slate-200 block truncate">{NODE_INFO[id].title}</span>
                      <div className="mt-2 w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div className="bg-gold-400 h-full transition-all duration-300" style={{ width: `${p}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono mt-1 block">{p.toFixed(0)}% ({level})</span>
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