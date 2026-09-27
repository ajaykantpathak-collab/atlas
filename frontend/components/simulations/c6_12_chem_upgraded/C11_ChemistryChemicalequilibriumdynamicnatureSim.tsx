'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// --- NODE IDENTIFIERS ---
const NODE_51 = 'c11_chem_051'; // Dynamic nature of equilibrium & equal reaction rates
const NODE_52 = 'c11_chem_052'; // Characteristics of chemical equilibrium (macroscopic constancy, reversibility)
const NODE_53 = 'c11_chem_053'; // Law of Mass Action and Equilibrium Constant (Kc)
const NODE_54 = 'c11_chem_054'; // Relationship between Kc and Kp (Kp = Kc(RT)^Δng)
const NODE_55 = 'c11_chem_055'; // Reaction Quotient (Qc) and predicting direction of reaction
const NODE_56 = 'c11_chem_056'; // Le Chatelier's Principle: Concentration changes
const NODE_57 = 'c11_chem_057'; // Le Chatelier's Principle: Pressure and Volume changes
const NODE_58 = 'c11_chem_058'; // Le Chatelier's Principle: Temperature changes & Van 't Hoff
const NODE_59 = 'c11_chem_059'; // Effect of Catalyst and Inert Gas Addition
const NODE_60 = 'c11_chem_060'; // Industrial applications (Haber-Bosch & Contact Processes)

const ALL_NODE_IDS = [
  NODE_51, NODE_52, NODE_53, NODE_54, NODE_55,
  NODE_56, NODE_57, NODE_58, NODE_59, NODE_60,
];

// --- MANDATORY SECTIONS ---

const SCENARIO = {
  title: 'ISC Advanced Chemical Equilibrium Research Lab',
  intro: 'Welcome to the High-Pressure Chemical Equilibrium Research Facility! As chief chemical engineer, you are tasked with controlling dynamic chemical equilibria at both microscopic molecular levels and industrial scales.',
  context: 'In this simulation, you will manipulate molecular concentrations, pressure, volume, temperature, catalysts, and inert gas additions. You will witness dynamic balance in action for the Haber-Bosch synthesis (N₂ + 3H₂ ⇌ 2NH₃) and analyze how systems respond under Le Chatelier’s Principle.',
};

const DISCOVERY_QUESTION = {
  question: 'When a chemical system reaches equilibrium in a sealed reaction vessel, what actually happens to the reactant and product molecules at the microscopic level?',
  options: [
    'All chemical reactions stop completely and molecules freeze in place.',
    'Forward and reverse reactions continue infinitely at identical rates, so concentrations remain constant.',
    'Reactants are 100% converted into products, causing the reverse reaction to cease.',
    'The forward reaction speeds up while the reverse reaction slows down until reactants disappear.',
  ],
  correctIndex: 1,
  hintAfter: 'Chemical equilibrium is dynamic, not static! Molecules are constantly reacting back and forth at equal rates ($r_f = r_b$), so macroscopic properties like concentration and color show zero net change.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Dynamic Rate Balance (rf = rb)',
    instruction: 'Adjust the initial reactant concentrations of N₂ and H₂ in the reactor. Observe how forward rate (rf) and reverse rate (rb) fluctuate until they equalize at dynamic equilibrium.',
    interactionType: 'rate-balance',
    nodeId: NODE_51,
  },
  {
    title: 'Lab 2: Concentration & Kc vs Qc',
    instruction: 'Inject extra N₂ or remove NH₃ from the vessel. Monitor the Reaction Quotient (Qc) relative to the equilibrium constant (Kc) and observe the directional shift.',
    interactionType: 'concentration-shift',
    nodeId: NODE_55,
  },
  {
    title: 'Lab 3: Pressure & Volume Manipulation',
    instruction: 'Compress the gas container volume using the piston slider. Observe how the system shifts toward the side with fewer gas moles (2 moles of NH₃ vs 4 moles of reactants).',
    interactionType: 'pressure-volume',
    nodeId: NODE_57,
  },
  {
    title: 'Lab 4: Temperature & Van ’t Hoff Effect',
    instruction: 'Heat or cool the vessel for the exothermic Haber reaction (ΔH = -92.2 kJ/mol). Watch how temperature alters the equilibrium constant (Kc) value permanently.',
    interactionType: 'temperature-vh',
    nodeId: NODE_58,
  },
  {
    title: 'Lab 5: Catalyst & Inert Gas Addition',
    instruction: 'Add an iron catalyst or introduce argon gas at constant volume versus constant pressure. Notice how catalyst speeds up rates equally without altering Kc or yield.',
    interactionType: 'catalyst-inert',
    nodeId: NODE_59,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the total pressure of the N₂ + 3H₂ ⇌ 2NH₃ mixture by halving container volume, what happens to the equilibrium ratio [NH₃]² / ([N₂][H₂]³)?',
    options: [
      'The ratio (Qc) initially decreases below Kc, then shifts left.',
      'The ratio (Qc) initially increases above Kc, then shifts right to restore Kc equilibrium.',
      'The ratio (Qc) permanently changes Kc to a higher value.',
      'No reaction occurs because volume changes do not affect gases.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Compress the container volume slider in Lab 3 and observe the Qc spike and subsequent rightward shift.',
    nodeId: NODE_57,
  },
  {
    question: 'Predict: What happens to the equilibrium yield of NH₃ if Argon (inert gas) is pumped into a rigid container at constant volume?',
    options: [
      'NH₃ yield increases because total pressure increases.',
      'NH₃ yield decreases because Argon consumes reactants.',
      'NH₃ yield remains completely unchanged because reactant concentrations do not change.',
      'The reaction shifts left to relieve total pressure.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Toggle Inert Gas at Constant Volume in Lab 5 and observe that partial pressures of reacting gases stay identical.',
    nodeId: NODE_59,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the forward rate (rf) and reverse rate (rb) immediately after adding an iron catalyst to the equilibrium mixture?',
    observableOptions: [
      'rf increases while rb decreases.',
      'Both rf and rb increase by the exact same multiplication factor.',
      'rf decreases while rb increases.',
      'Neither rate changes, but Kc increases.',
    ],
    correctIndex: 1,
    nodeId: NODE_59,
  },
  {
    question: 'Observation: When heating an exothermic reaction at equilibrium (ΔH < 0), what occurs to the value of the equilibrium constant Kc?',
    observableOptions: [
      'Kc increases linearly with temperature.',
      'Kc decreases, causing the system to shift towards reactants.',
      'Kc remains strictly unchanged.',
      'Kc drops to zero instantly.',
    ],
    correctIndex: 1,
    nodeId: NODE_58,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Chemical Synthesis Optimization: The Haber-Bosch Process',
  description: 'In industrial fertilizer plants, millions of tons of ammonia (NH₃) are produced annually via N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92.2 kJ/mol). Engineers must optimize temperature, pressure, and flow rates to maximize daily output while keeping energy costs efficient.',
  steps: [
    'Step 1: Set high pressure (150-200 atm) using heavy industrial compressors to shift equilibrium toward 2 moles of NH₃ product.',
    'Step 2: Select a moderate compromised temperature (~450°C). High temp increases reaction rate but lowers equilibrium constant Kc; 450°C yields an optimal rate-versus-yield compromise.',
    'Step 3: Introduce finely divided Iron (Fe) catalyst with K₂O/Al₂O₃ promoters to accelerate rate of attainment of equilibrium without wasting thermal fuel.',
    'Step 4: Liquefy and continuously remove NH₃ product (boiling point -33°C) from the recycling loop, driving Qc < Kc and forcing perpetual 100% conversion of N₂ and H₂.',
  ],
};

const MISCONCEPTIONS = [
  {
    title: 'Chemical Reaction Stops Completely When Equilibrium Is Reached',
    misconception: 'Students often believe that once a reaction reaches chemical equilibrium, all macroscopic and molecular processes cease entirely. They view equilibrium as a static state where the reaction has come to a complete halt.',
    correction: 'Chemical equilibrium is dynamic in nature, meaning both forward and reverse reactions continue occurring simultaneously at equal rates (rf = rb). Because the rates of formation and consumption are identical, there is no net change in concentrations over time.',
  },
  {
    title: 'Reactant and Product Concentrations Must Be Equal at Equilibrium',
    misconception: 'Students frequently confuse equal reaction rates with equal chemical concentrations, assuming equilibrium implies a 50:50 ratio.',
    correction: 'At equilibrium, it is the rates of forward and reverse reactions that are equal, not the concentrations. Concentrations remain constant over time, but their numerical values depend on Kc.',
  },
  {
    title: 'Adding a Catalyst Increases the Equilibrium Constant and Product Yield',
    misconception: 'Many students think adding a catalyst shifts the equilibrium position toward products and increases Kc or Kp.',
    correction: 'A catalyst lowers activation energy equally for forward and reverse reactions, speeding up both rates by the same factor. It helps reach equilibrium faster without changing Kc or yield.',
  },
  {
    title: 'Adding Inert Gas at Constant Volume Shifts Equilibrium Position',
    misconception: 'Students assume introducing inert gas increases total pressure, which must shift equilibrium according to Le Chatelier’s principle.',
    correction: 'Adding inert gas at constant volume increases total pressure, but does not alter partial pressures or molar concentrations of reacting species. Thus, no shift occurs.',
  },
  {
    title: 'Equilibrium Constant Remains Unchanged Even When Temperature Changes',
    misconception: 'Students misinterpret "equilibrium constant" to mean Kc is fixed under all experimental conditions including temperature.',
    correction: 'Temperature is the ONLY factor that alters the numerical value of Kc. By Van ’t Hoff equation, raising temp decreases Kc for exothermic reactions and increases Kc for endothermic reactions.',
  },
  {
    title: 'Kp and Kc Are Always Numerically Identical',
    misconception: 'Students often use Kc interchangeably with Kp without considering gas mole changes.',
    correction: 'Kp = Kc(RT)^Δng. Kp equals Kc ONLY when Δng = (moles of gaseous products - moles of gaseous reactants) = 0.',
  },
];

// --- TYPES & INTERFACES ---
type CompetencyLevel = 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
type DifficultyTier = 'foundation' | 'standard' | 'advanced';

interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: DifficultyTier;
  competencyLevel: CompetencyLevel;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface Particle {
  id: number;
  type: 'N2' | 'H2' | 'NH3' | 'Ar';
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// --- 22+ COMPREHENSIVE ISC CHALLENGES ---
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c1',
    nodeId: NODE_51,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following statements best describes the dynamic nature of chemical equilibrium?',
    options: [
      'The forward reaction has completely stopped, while the reverse reaction continues.',
      'Both forward and reverse reactions proceed at equal rates, resulting in constant concentrations.',
      'The concentration of reactants must equal the concentration of products.',
      'The system is open to the atmosphere and energy is lost continuously.',
    ],
    correctIndex: 1,
    explanation: 'Dynamic equilibrium means chemical reactions continue in both directions at identical rates (rf = rb), maintaining constant macroscopic concentrations.',
    hints: ['Focus on the word "dynamic" vs "static".', 'What happens to the rates of forward and reverse reactions at equilibrium?', 'Rates are equal, concentrations are constant.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c2',
    nodeId: NODE_52,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which condition is strictly required to establish chemical equilibrium in a gaseous system?',
    options: [
      'An open beaker exposed to air',
      'A closed system at constant temperature',
      'Continuous addition of catalyst',
      'Zero initial product concentration',
    ],
    correctIndex: 1,
    explanation: 'Equilibrium requires a closed system (so no matter escapes) at constant temperature so that macroscopic properties remain unchanged.',
    hints: ['Can gas escape if you want equilibrium?', 'Does temperature need to stay fixed?', 'Look for a closed vessel at constant temperature.'],
  },
  {
    id: 'c3',
    nodeId: NODE_53,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For the reaction: aA + bB ⇌ cC + dD, what is the correct expression for the equilibrium constant Kc?',
    options: [
      'Kc = ([A]^a [B]^b) / ([C]^c [D]^d)',
      'Kc = ([C]^c [D]^d) / ([A]^a [B]^b)',
      'Kc = (c[C] + d[D]) / (a[A] + b[B])',
      'Kc = ([C] [D]) / ([A] [B])',
    ],
    correctIndex: 1,
    explanation: 'According to the Law of Mass Action, Kc is the product of equilibrium concentrations of products raised to their stoichiometric coefficients divided by reactants.',
    hints: ['Products go in the numerator, reactants in denominator.', 'Stoichiometric coefficients become powers/exponents.'],
  },
  {
    id: 'c4',
    nodeId: NODE_54,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the relation Kp = Kc(RT)^Δng, what does Δng represent?',
    options: [
      'Total moles of liquid reactants minus products',
      'Moles of gaseous products minus moles of gaseous reactants',
      'Total moles of all reactants and products',
      'Moles of gas divided by temperature in Kelvin',
    ],
    correctIndex: 1,
    explanation: 'Δng = n_g(products) - n_g(reactants), taking into account ONLY gaseous species in the balanced equation.',
    hints: ['What does the subscript "g" stand for?', 'Is it products minus reactants or reactants minus products?', 'It is gaseous products minus gaseous reactants.'],
  },
  {
    id: 'c5',
    nodeId: NODE_55,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If the reaction quotient Qc is greater than the equilibrium constant Kc (Qc > Kc), in which direction will the reaction proceed?',
    options: [
      'Forward direction (left to right) to form more products',
      'Reverse direction (right to left) to form more reactants',
      'The reaction remains at equilibrium with no change',
      'The reaction stops completely',
    ],
    correctIndex: 1,
    explanation: 'When Qc > Kc, there are too many products relative to equilibrium. The system shifts in the reverse direction (left) to consume products and reach Kc.',
    hints: ['Qc > Kc means numerator (products) is too large.', 'To reduce products, which way must the reaction shift?', 'Reverse direction (left).'],
  },
  {
    id: 'c6',
    nodeId: NODE_56,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to Le Chatelier’s Principle, what happens when additional reactant is added to a system at equilibrium?',
    options: [
      'The system shifts in the direction that consumes the added reactant (forward direction).',
      'The system shifts to produce more reactant.',
      'The equilibrium constant Kc increases immediately.',
      'The temperature drops to absolute zero.',
    ],
    correctIndex: 0,
    explanation: 'Le Chatelier’s principle states that a system at equilibrium will shift to counteract any imposed stress. Adding reactant causes a forward shift to consume it.',
    hints: ['How does a system relieve the stress of "too much reactant"?', 'It reacts the extra reactant to form products.', 'Forward direction.'],
  },
  {
    id: 'c7',
    nodeId: NODE_59,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the exact effect of adding a catalyst to a chemical equilibrium mixture?',
    options: [
      'Increases product yield and shifts equilibrium to the right.',
      'Increases Kc value permanently.',
      'Speeds up both forward and reverse rates equally, reaching equilibrium faster without changing yield.',
      'Decreases the rate of the reverse reaction.',
    ],
    correctIndex: 2,
    explanation: 'A catalyst lowers Ea equally for forward and reverse paths, accelerating equilibrium attainment without changing Kc or equilibrium position.',
    hints: ['Does a catalyst favor only the forward reaction?', 'It lowers activation energy for BOTH directions equally.', 'Position and Kc remain unchanged.'],
    misconceptionIndex: 2,
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c8',
    nodeId: NODE_53,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the reaction N₂ (g) + 3H₂ (g) ⇌ 2NH₃ (g), at equilibrium [N₂] = 0.20 M, [H₂] = 0.10 M, and [NH₃] = 0.40 M. Calculate the value of Kc.',
    correctAnswer: 800,
    tolerance: 5,
    explanation: 'Kc = [NH₃]² / ([N₂][H₂]³) = (0.40)² / (0.20 × (0.10)³) = 0.16 / (0.20 × 0.001) = 0.16 / 0.0002 = 800.',
    hints: ['Formula: Kc = [NH3]^2 / ([N2] * [H2]^3)', '[H2]^3 = 0.10^3 = 0.001', '0.16 / (0.20 * 0.001) = 800'],
  },
  {
    id: 'c9',
    nodeId: NODE_54,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the reaction PCl₅ (g) ⇌ PCl₃ (g) + Cl₂ (g), Kc = 0.040 M at 500 K. Given R = 0.0821 L·atm/(mol·K), calculate Kp. (Round to 2 decimal places)',
    correctAnswer: 1.64,
    tolerance: 0.05,
    explanation: 'Δng = 2 - 1 = +1. Kp = Kc(RT)^Δng = 0.040 × (0.0821 × 500)^1 = 0.040 × 41.05 = 1.642 atm.',
    hints: ['Calculate Δng = gaseous products - gaseous reactants = 2 - 1 = 1.', 'RT = 0.0821 * 500 = 41.05.', 'Kp = 0.040 * 41.05 = 1.64.'],
  },
  {
    id: 'c10',
    nodeId: NODE_55,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For 2SO₂ (g) + O₂ (g) ⇌ 2SO₃ (g), Kc = 280. At a given moment, [SO₂] = 0.10 M, [O₂] = 0.20 M, [SO₃] = 0.40 M. Calculate Qc and determine the system behavior.',
    options: [
      'Qc = 80; Qc < Kc, so reaction shifts Right to form more SO₃.',
      'Qc = 800; Qc > Kc, so reaction shifts Left to form more SO₂.',
      'Qc = 280; System is at equilibrium.',
      'Qc = 16; Qc < Kc, so reaction shifts Left.',
    ],
    correctIndex: 0,
    explanation: 'Qc = [SO₃]² / ([SO₂]²[O₂]) = (0.40)² / ((0.10)² × 0.20) = 0.16 / (0.01 × 0.20) = 0.16 / 0.002 = 80. Since 80 < 280, reaction shifts Right.',
    hints: ['Calculate Qc = (0.40)^2 / ((0.10)^2 * 0.20).', '0.16 / 0.002 = 80.', 'Compare 80 with Kc = 280.'],
  },
  {
    id: 'c11',
    nodeId: NODE_57,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider the reaction N₂O₄ (g, colorless) ⇌ 2NO₂ (g, brown). If the container volume is suddenly halved (pressure doubled), what initial visual change and final shift occur?',
    options: [
      'Gas turns darker brown immediately due to higher concentration, then gradually lightens as equilibrium shifts Left (towards N₂O₄).',
      'Gas lightens immediately, then turns dark brown as equilibrium shifts Right.',
      'Gas turns completely colorless and reaction stops.',
      'No visual change occurs.',
    ],
    correctIndex: 0,
    explanation: 'Decreasing volume immediately increases concentrations of all species (making NO₂ darker). Per Le Chatelier, system shifts to fewer gas moles (Left: 2 moles NO₂ -> 1 mole N₂O₄), lightening color.',
    hints: ['Instant volume reduction increases concentration of brown NO₂.', 'Then Le Chatelier shifts to side with fewer gas moles (1 mole N₂O₄ vs 2 moles NO₂).'],
  },
  {
    id: 'c12',
    nodeId: NODE_58,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For the endothermic reaction N₂O₄ (g) ⇌ 2NO��� (g) (ΔH = +57.2 kJ/mol), what happens when the temperature of the reaction vessel is increased?',
    options: [
      'Equilibrium shifts Left and Kc decreases.',
      'Equilibrium shifts Right and Kc increases.',
      'Equilibrium shifts Right but Kc remains constant.',
      'Equilibrium shifts Left and Kc increases.',
    ],
    correctIndex: 1,
    explanation: 'For endothermic reactions (ΔH > 0), heat acts like a reactant. Increasing temperature drives reaction Right to absorb heat, and increases Kc.',
    hints: ['Endothermic reactions absorb heat (Heat + N2O4 ⇌ 2NO2).', 'Adding heat shifts reaction Right.', 'For endothermic systems, higher T means higher Kc.'],
    misconceptionIndex: 4,
  },
  {
    id: 'c13',
    nodeId: NODE_59,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Helium gas is added to an equilibrium mixture of N₂ + 3H₂ ⇌ 2NH₃ kept at CONSTANT PRESSURE in a cylinder with a movable piston. How does the equilibrium shift?',
    options: [
      'Shifts Right towards NH₃.',
      'Shifts Left towards N₂ and H₂ because total volume increases, decreasing partial pressures.',
      'Does not shift because Helium is inert.',
      'Kc increases dramatically.',
    ],
    correctIndex: 1,
    explanation: 'At constant pressure, adding inert gas expands total volume. This decreases partial pressures of reactants/products, shifting equilibrium towards more gas moles (Left).',
    hints: ['At constant pressure, adding gas forces piston outward (V increases).', 'Higher volume lowers partial pressures of N2, H2, NH3.', 'System shifts towards the side with MORE gas moles (4 moles vs 2 moles).'],
    misconceptionIndex: 3,
  },
  {
    id: 'c14',
    nodeId: NODE_60,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Haber-Bosch process (N₂ + 3H₂ ⇌ 2NH₃, ΔH = -92.2 kJ/mol), why is an intermediate temperature of ~450°C used instead of room temperature (25°C)?',
    options: [
      'At 25°C, yield is zero because Kc is zero.',
      'At 25°C, equilibrium yield is high but reaction rate is extremely slow; 450°C provides an acceptable reaction rate with catalyst.',
      'At 450°C, Kc is maximum.',
      'At 450°C, catalyst is destroyed.',
    ],
    correctIndex: 1,
    explanation: 'Thermodynamically, low temperature favors exothermic NH₃ yield, but reaction rate is impractically slow. 450°C is an industrial compromise between yield and rate.',
    hints: ['Exothermic reactions give higher equilibrium yield at LOW temp.', 'However, low temp means molecules move very slowly!', '450°C strikes an optimal compromise for practical rate.'],
  },
  {
    id: 'c15',
    nodeId: NODE_54,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For the reaction H₂ (g) + I₂ (g) ⇌ 2HI (g), Kc = 54.0 at 700 K. What is the value of Kp at this temperature?',
    correctAnswer: 54.0,
    tolerance: 0.1,
    explanation: 'Δng = 2 - (1 + 1) = 0. When Δng = 0, Kp = Kc(RT)⁰ = Kc. Thus Kp = 54.0.',
    hints: ['Calculate Δng = 2 - (1 + 1).', 'Δng = 0.', 'Anything to the power 0 is 1, so Kp = Kc.'],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'c16',
    nodeId: NODE_53,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: '1.00 mole of PCl₅ is placed in a 1.00 L vessel. At equilibrium, PCl₅ is 40% dissociated into PCl₃ and Cl₂ (α = 0.40). Calculate Kc.',
    correctAnswer: 0.267,
    tolerance: 0.02,
    explanation: 'ICE Table: PCl₅ ⇌ PCl₃ + Cl₂. Initial: [1, 0, 0]. Change: [-0.4, +0.4, +0.4]. Eq: [0.6, 0.4, 0.4]. Kc = (0.4 × 0.4) / 0.6 = 0.16 / 0.6 = 0.2667 M.',
    hints: ['Equilibrium [PCl5] = 1 - 0.40 = 0.60 M.', 'Equilibrium [PCl3] = 0.40 M and [Cl2] = 0.40 M.', 'Kc = (0.40 * 0.40) / 0.60 = 0.16 / 0.60 = 0.267.'],
  },
  {
    id: 'c17',
    nodeId: NODE_58,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to the Van ’t Hoff equation ln(K₂/K₁) = (ΔH°/R)(1/T₁ - 1/T₂), if a reaction has ΔH° < 0 (exothermic), how does a plot of ln(Kc) versus 1/T behave?',
    options: [
      'Slope is positive (+ΔH°/R is negative, so slope = -ΔH°/R is positive); ln(Kc) increases as 1/T increases (T decreases).',
      'Slope is negative; ln(Kc) decreases as T decreases.',
      'Plot is horizontal with zero slope.',
      'Plot forms a parabola.',
    ],
    correctIndex: 0,
    explanation: 'ln(Kc) = -ΔH°/(R T) + Constant. For ΔH° < 0, slope = -ΔH°/R > 0. As T decreases, 1/T increases, and ln(Kc) increases.',
    hints: ['Equation: ln Kc = (-ΔH°/R)(1/T) + C.', 'If ΔH° is negative, then (-ΔH°/R) is POSITIVE.', 'Thus the slope against 1/T is positive.'],
  },
  {
    id: 'c18',
    nodeId: NODE_56,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a 2.0 L container, an equilibrium mixture contains 0.40 mol A, 0.60 mol B, and 0.80 mol C for reaction A (g) + B (g) ⇌ 2C (g). Calculate Kc.',
    correctAnswer: 2.67,
    tolerance: 0.05,
    explanation: 'Molarities: [A]=0.40/2=0.20 M, [B]=0.60/2=0.30 M, [C]=0.80/2=0.40 M. Kc = [C]² / ([A][B]) = (0.40)² / (0.20 × 0.30) = 0.16 / 0.06 = 2.667.',
    hints: ['Remember to divide moles by volume (2.0 L) to get concentrations!', '[A] = 0.20 M, [B] = 0.30 M, [C] = 0.40 M.', 'Kc = 0.40^2 / (0.20 * 0.30) = 0.16 / 0.06 = 2.67.'],
  },
  {
    id: 'c19',
    nodeId: NODE_60,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In the Contact Process for H₂SO₄ manufacture: 2SO₂ (g) + O₂ (g) ⇌ 2SO₃ (g) (ΔH = -197 kJ/mol), which set of conditions maximizes economic yield of SO₃?',
    options: [
      'High pressure (1-2 atm sufficient), 400-450°C, V₂O₅ catalyst, excess O₂ air.',
      '1000 atm pressure, 1000°C temp, no catalyst.',
      'Low pressure 0.01 atm, 20°C temp, no oxygen.',
      'High temperature 900°C with argon dilution at constant pressure.',
    ],
    correctIndex: 0,
    explanation: 'Since conversion is already ~98% at 1-2 atm with V₂O₅ catalyst at 450°C, extreme high pressure is avoided for cost safety. Excess air drives Qc right.',
    hints: ['High conversion (~98%) occurs even at low pressures (1-2 atm).', 'V2O5 catalyst operates efficiently at 400-450°C.', 'Excess O2 pushes equilibrium to right.'],
  },
  {
    id: 'c20',
    nodeId: NODE_54,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'For 2NO₂ (g) ⇌ N��O₄ (g), Kp = 6.7 atm⁻¹ at 298 K. Calculate Kc in L/mol. (R = 0.0821 L·atm/(mol·K))',
    correctAnswer: 163.9,
    tolerance: 2.0,
    explanation: 'Δng = 1 - 2 = -1. Kp = Kc(RT)⁻¹ => Kc = Kp × (RT)¹ = 6.7 × (0.0821 × 298) = 6.7 × 24.4658 = 163.92 L/mol.',
    hints: ['Δng = 1 - 2 = -1.', 'Kp = Kc / (RT)  =>  Kc = Kp * (RT).', 'RT = 0.0821 * 298 = 24.466.', 'Kc = 6.7 * 24.466 = 163.9.'],
  },
  {
    id: 'c21',
    nodeId: NODE_59,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An equilibrium mixture N₂O₄ ⇌ 2NO₂ is held in a container with a piston. Argon is added at CONSTANT TOTAL PRESSURE. What happens to the fraction of N₂O₄ dissociated (α)?',
    options: [
      'α increases (more N₂O₄ dissociates into NO₂).',
      'α decreases.',
      'α remains unchanged.',
      'α drops to zero.',
    ],
    correctIndex: 0,
    explanation: 'Adding inert gas at constant total pressure increases total volume, decreasing partial pressures of N₂O₄ and NO₂. System shifts to side with more moles (NO₂), increasing dissociation α.',
    hints: ['Constant total pressure + inert gas = Volume expansion.', 'Volume expansion favors the side with more gaseous moles (2 moles NO2 vs 1 mole N2O4).', 'More N2O4 dissociates, so α increases.'],
  },
  {
    id: 'c22',
    nodeId: NODE_55,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A reaction mixture has ΔG° = -RT ln(Kc). If at a certain instant ΔG (Gibbs free energy change) is negative (ΔG < 0), what is the relationship between Qc and Kc?',
    options: [
      'Qc < Kc, and the reaction spontaneously proceeds forward.',
      'Qc > Kc, and the reaction proceeds reverse.',
      'Qc = Kc, reaction at equilibrium.',
      'ΔG is independent of Qc and Kc.',
    ],
    correctIndex: 0,
    explanation: 'ΔG = RT ln(Qc / Kc). When ΔG < 0, ln(Qc / Kc) < 0 => Qc / Kc < 1 => Qc < Kc, driving forward spontaneous reaction.',
    hints: ['Relation: ΔG = RT * ln(Qc / Kc).', 'If ΔG < 0, then ln(Qc / Kc) < 0.', 'This requires Qc / Kc < 1, so Qc < Kc.'],
  },
];

// --- SVG DIAGRAM COMPONENTS ---

// Diagram 1: Reaction Rate vs Time Diagram
const DiagramEquilibriumRateGraph: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="250" y="24" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
      Reaction Rates vs Time: Attainment of Dynamic Equilibrium
    </text>
    {/* Axes */}
    <line x1="50" y1="200" x2="460" y2="200" stroke="#94a3b8" strokeWidth="2" />
    <line x1="50" y1="40" x2="50" y2="200" stroke="#94a3b8" strokeWidth="2" />
    <text x="255" y="230" textAnchor="middle" fill="#94a3b8" className="text-xs">Time (t)</text>
    <text x="20" y="120" textAnchor="middle" fill="#94a3b8" className="text-xs" transform="rotate(-90, 20, 120)">Reaction Rate</text>

    {/* Dashed vertical equilibrium line */}
    <line x1="280" y1="40" x2="280" y2="200" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
    <text x="285" y="55" fill="#f59e0b" className="text-xs font-semibold">Equilibrium Reached (rf = rb)</text>

    {/* Forward Rate Curve (starts high, drops) */}
    <path d="M 50 60 Q 180 130 280 130 L 450 130" fill="none" stroke="#ef4444" strokeWidth="3" />
    <text x="110" y="80" fill="#ef4444" className="text-xs font-bold">Forward Rate (rf)</text>

    {/* Reverse Rate Curve (starts 0, rises) */}
    <path d="M 50 198 Q 180 130 280 130 L 450 130" fill="none" stroke="#3b82f6" strokeWidth="3" />
    <text x="110" y="180" fill="#3b82f6" className="text-xs font-bold">Reverse Rate (rb)</text>

    {/* Constant rate highlight */}
    <rect x="280" y="115" width="170" height="30" fill="#10b981" fillOpacity="0.15" rx="4" />
    <text x="365" y="134" textAnchor="middle" fill="#10b981" className="text-xs font-bold">Dynamic Balance (rf = rb &gt; 0)</text>
  </svg>
);

// Diagram 2: Energy Profile with Catalyst Diagram
const DiagramEnergyProfile: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="250" y="24" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
      Energy Profile: Uncatalyzed vs Catalyzed Pathway
    </text>
    {/* Axes */}
    <line x1="50" y1="200" x2="460" y2="200" stroke="#94a3b8" strokeWidth="2" />
    <line x1="50" y1="40" x2="50" y2="200" stroke="#94a3b8" strokeWidth="2" />
    <text x="255" y="230" textAnchor="middle" fill="#94a3b8" className="text-xs">Reaction Coordinate</text>
    <text x="20" y="120" textAnchor="middle" fill="#94a3b8" className="text-xs" transform="rotate(-90, 20, 120)">Potential Energy</text>

    {/* Reactant level */}
    <line x1="50" y1="140" x2="120" y2="140" stroke="#a855f7" strokeWidth="3" />
    <text x="75" y="130" fill="#a855f7" className="text-xs font-bold">N₂ + 3H₂</text>

    {/* Product level */}
    <line x1="380" y1="170" x2="450" y2="170" stroke="#10b981" strokeWidth="3" />
    <text x="400" y="160" fill="#10b981" className="text-xs font-bold">2NH₃</text>

    {/* Uncatalyzed Curve */}
    <path d="M 120 140 C 180 40, 280 40, 380 170" fill="none" stroke="#ef4444" strokeWidth="2.5" />
    <text x="250" y="45" fill="#ef4444" textAnchor="middle" className="text-xs font-bold">Uncatalyzed (Ea uncatalyzed)</text>

    {/* Catalyzed Curve */}
    <path d="M 120 140 C 180 90, 280 90, 380 170" fill="none" stroke="#eab308" strokeWidth="2.5" strokeDasharray="5 3" />
    <text x="250" y="85" fill="#eab308" textAnchor="middle" fillOpacity="1" className="text-xs font-bold">Catalyzed (Lower Ea)</text>

    {/* Delta H arrow */}
    <line x1="430" y1="140" x2="430" y2="170" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />
    <text x="440" y="155" fill="#f43f5e" className="text-xs font-bold">ΔH &lt; 0</text>
  </svg>
);

// Diagram 3: Haber-Bosch Process Flow Diagram
const DiagramHaberProcessApparatus: React.FC = () => (
  <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="250" y="22" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
      Industrial Haber-Bosch Synthesis Flow Loop
    </text>

    {/* Compressor */}
    <rect x="40" y="80" width="70" height="60" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
    <text x="75" y="105" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold">Compressor</text>
    <text x="75" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">200 atm</text>

    {/* Reactants In */}
    <path d="M 10 110 L 40 110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
    <text x="20" y="100" fill="#a855f7" className="text-xs font-bold">N₂ + 3H₂</text>

    {/* Converter / Reactor */}
    <rect x="170" y="50" width="90" height="120" rx="8" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
    <text x="215" y="75" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">Catalytic</text>
    <text x="215" y="90" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">Reactor</text>
    <text x="215" y="115" textAnchor="middle" fill="#e2e8f0" className="text-xs">Fe Catalyst</text>
    <text x="215" y="135" textAnchor="middle" fill="#ef4444" className="text-xs">450°C</text>

    {/* Pipes compressor to reactor */}
    <path d="M 110 110 L 170 110" stroke="#38bdf8" strokeWidth="3" />

    {/* Condenser */}
    <rect x="310" y="70" width="80" height="80" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
    <text x="350" y="100" textAnchor="middle" fill="#10b981" className="text-xs font-bold">Cooling</text>
    <text x="350" y="118" textAnchor="middle" fill="#10b981" className="text-xs font-bold">Condenser</text>

    {/* Pipe reactor to condenser */}
    <path d="M 260 110 L 310 110" stroke="#f59e0b" strokeWidth="3" />

    {/* Liquid NH3 out */}
    <path d="M 350 150 L 350 200" stroke="#10b981" strokeWidth="3" />
    <text x="350" y="218" textAnchor="middle" fill="#10b981" className="text-xs font-bold">Liquid NH₃ Out</text>

    {/* Recirculation pump back to compressor */}
    <path d="M 350 70 L 350 30 L 75 30 L 75 80" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
    <text x="215" y="24" textAnchor="middle" fill="#a855f7" className="text-xs font-semibold">Unreacted N₂ + H₂ Recycled (Qc &lt; Kc continuous)</text>
  </svg>
);

// --- MAIN COMPONENT ---
export default function C11_ChemistryChemicalequilibriumdynamicnatureSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Simulation Parameters for Lab Interactive Engine (N2 + 3H2 <-> 2NH3)
  const [N2_moles, setN2Moles] = useState<number>(2.0);
  const [H2_moles, setH2Moles] = useState<number>(6.0);
  const [NH3_moles, setNH3Moles] = useState<number>(1.0);
  const [tempK, setTempK] = useState<number>(500); // 300K - 800K
  const [volumeL, setVolumeL] = useState<number>(10.0); // 2L - 20L
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [inertGasMode, setInertGasMode] = useState<'none' | 'constant_volume' | 'constant_pressure'>('none');
  const [inertGasAmount, setInertGasAmount] = useState<number>(0);

  // Dynamic simulation tracking state
  const [simTime, setSimTime] = useState<number>(0);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);
  const [currentN2, setCurrentN2] = useState<number>(2.0);
  const [currentH2, setCurrentH2] = useState<number>(6.0);
  const [currentNH3, setCurrentNH3] = useState<number>(1.0);

  // Challenge Navigation & SRS/BKT state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Master BKT / SRS data stores
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Discovery & Lab tab state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [selectedLabStep, setSelectedLabStep] = useState<number>(0);

  // Activity Ref for auto-hint timer
  const lastActivityRef = useRef<number>(Date.now());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Reset local current species when initial user parameters change
  useEffect(() => {
    setCurrentN2(N2_moles);
    setCurrentH2(H2_moles);
    setCurrentNH3(NH3_moles);
  }, [N2_moles, H2_moles, NH3_moles]);

  // Thermochemical Equilibrium Calculation (Van 't Hoff dependence)
  // For N2 + 3H2 <-> 2NH3, ΔH° ≈ -92,200 J/mol. Reference Kc at 500K is ~0.040 L^2/mol^2.
  const calculateKcAtTemp = useCallback((T: number): number => {
    const R = 8.314; // J/(mol K)
    const T0 = 500; // Ref Temp
    const Kc0 = 0.50; // Nominal scale reference for visually clear equilibrium
    const deltaH = -92200; // J/mol
    // Van 't Hoff: ln(Kc/Kc0) = (-ΔH / R) * (1/T - 1/T0)
    const exponent = (-deltaH / R) * (1 / T - 1 / T0);
    const Kc = Kc0 * Math.exp(exponent);
    return Math.max(0.001, Math.min(Kc, 50.0)); // bounded for sim stability
  }, []);

  const targetKc = useMemo(() => calculateKcAtTemp(tempK), [tempK, calculateKcAtTemp]);

  // Concentrations in vessel
  const concN2 = currentN2 / volumeL;
  const concH2 = currentH2 / volumeL;
  const concNH3 = currentNH3 / volumeL;

  // Reaction Quotient Qc = [NH3]^2 / ([N2] * [H2]^3)
  const currentQc = useMemo(() => {
    const denom = concN2 * Math.pow(concH2, 3);
    if (denom <= 0.000001) return 999;
    return Math.pow(concNH3, 2) / denom;
  }, [concN2, concH2, concNH3]);

  // Rates calculation
  // Forward rate: rf = k_f * [N2] * [H2]^3
  // Reverse rate: rb = k_b * [NH3]^2
  // Kc = k_f / k_b => k_f = Kc * k_b
  const kb = 0.05 * (hasCatalyst ? 3.0 : 1.0);
  const kf = targetKc * kb;

  const rf = useMemo(() => {
    return kf * concN2 * Math.pow(concH2, 3);
  }, [kf, concN2, concH2]);

  const rb = useMemo(() => {
    return kb * Math.pow(concNH3, 2);
  }, [kb, concNH3]);

  // Dynamic Simulation Physics Loop
  useEffect(() => {
    if (!isSimRunning) return;

    const interval = setInterval(() => {
      setSimTime((prev) => prev + 0.1);

      // Kinetic differential step
      // N2 + 3H2 <-> 2NH3
      // d[NH3]/dt = 2*(rf - rb)
      // d[N2]/dt = -(rf - rb)
      // d[H2]/dt = -3*(rf - rb)
      const dt = 0.05;
      const netRate = rf - rb;

      setCurrentN2((prevN2) => {
        const next = prevN2 - netRate * dt * volumeL;
        return Math.max(0.05, next);
      });

      setCurrentH2((prevH2) => {
        const next = prevH2 - 3 * netRate * dt * volumeL;
        return Math.max(0.05, next);
      });

      setCurrentNH3((prevNH3) => {
        const next = prevNH3 + 2 * netRate * dt * volumeL;
        return Math.max(0.05, next);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSimRunning, rf, rb, volumeL]);

  // Canvas Molecular Particles Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Generate representative particle points
    const n2Count = Math.min(25, Math.max(2, Math.round(currentN2 * 3)));
    const h2Count = Math.min(35, Math.max(2, Math.round(currentH2 * 3)));
    const nh3Count = Math.min(30, Math.max(2, Math.round(currentNH3 * 3)));
    const inertCount = inertGasMode !== 'none' ? Math.round(inertGasAmount * 2) : 0;

    const particles: Particle[] = [];

    // N2 (Blue spheres)
    for (let i = 0; i < n2Count; i++) {
      particles.push({
        id: i,
        type: 'N2',
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * (tempK / 200),
        vy: (Math.random() - 0.5) * (tempK / 200),
      });
    }
    // H2 (Red small spheres)
    for (let i = 0; i < h2Count; i++) {
      particles.push({
        id: 100 + i,
        type: 'H2',
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * (tempK / 150),
        vy: (Math.random() - 0.5) * (tempK / 150),
      });
    }
    // NH3 (Green larger spheres)
    for (let i = 0; i < nh3Count; i++) {
      particles.push({
        id: 200 + i,
        type: 'NH3',
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * (tempK / 220),
        vy: (Math.random() - 0.5) * (tempK / 220),
      });
    }
    // Inert Argon (Purple spheres)
    for (let i = 0; i < inertCount; i++) {
      particles.push({
        id: 300 + i,
        type: 'Ar',
        x: Math.random() * (width - 40) + 20,
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * (tempK / 180),
        vy: (Math.random() - 0.5) * (tempK / 180),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Container background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw container outline / piston top boundary scaling with volume
      const containerTop = Math.max(10, Math.min(120, 160 - volumeL * 7));
      ctx.fillStyle = 'rgba(51, 65, 85, 0.5)';
      ctx.fillRect(0, containerTop, width, height - containerTop);

      // Piston Bar
      ctx.fillStyle = '#64748b';
      ctx.fillRect(0, containerTop - 12, width, 12);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Piston Volume Boundary: ${volumeL.toFixed(1)} L`, width / 2 - 80, containerTop - 16);

      // Render Catalyst mesh on floor if active
      if (hasCatalyst) {
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(10, height - 12, width - 20, 8);
        ctx.fillStyle = '#d97706';
        ctx.font = '10px sans-serif';
        ctx.fillText('Active Porous Iron (Fe) Catalyst Bed', width / 2 - 85, height - 16);
      }

      // Update & Render Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 12 || p.x > width - 12) p.vx *= -1;
        if (p.y < containerTop + 12 || p.y > height - 16) p.vy *= -1;

        // Draw particle based on type
        ctx.beginPath();
        if (p.type === 'N2') {
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fillStyle = '#3b82f6';
          ctx.fill();
          ctx.strokeStyle = '#60a5fa';
          ctx.stroke();
        } else if (p.type === 'H2') {
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
        } else if (p.type === 'NH3') {
          ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.fill();
          ctx.strokeStyle = '#34d399';
          ctx.stroke();
        } else if (p.type === 'Ar') {
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#a855f7';
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [currentN2, currentH2, currentNH3, tempK, volumeL, hasCatalyst, inertGasMode, inertGasAmount]);

  // Timer for auto-hint after 10 seconds of inactivity
  useEffect(() => {
    const checkActivity = setInterval(() => {
      if (Date.now() - lastActivityRef.current > 10000 && !showHint && activeTab === 'challenges') {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 2000);
    return () => clearInterval(checkActivity);
  }, [showHint, activeTab]);

  const recordActivity = () => {
    lastActivityRef.current = Date.now();
  };

  // Challenge Handling Logic
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const handleSelectOption = (index: number) => {
    recordActivity();
    setSelectedOption(index);
  };

  const handleVerifyAnswer = () => {
    recordActivity();
    if (!currentChallenge) return;

    let isCorrect = false;

    if (currentChallenge.type === 'multiple-choice') {
      if (selectedOption === currentChallenge.correctIndex) {
        isCorrect = true;
      }
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.1;
        if (Math.abs(val - currentChallenge.correctAnswer) <= tol) {
          isCorrect = true;
        }
      }
    }

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const oldBKT = bktStates[nodeId] || createBKTState();
    const newBKT = bktUpdate(oldBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: newBKT }));

    const oldSRS = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id);
    const newSRS = sm2Update(oldSRS, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [currentChallenge.id]: newSRS }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent work! That is completely correct.');
      setScore((s) => s + 10);
      setStreak((st) => st + 1);
      setShowSparkle(true);
      setFeedback({
        isCorrect: true,
        message: `Correct! ${currentChallenge.explanation}`,
      });

      if (streak + 1 >= 3) {
        setShowConfetti(true);
        audioManager.play('celebration');
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the explanation and try again!');
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentChallenge.explanation}`,
      });
    }
  };

  const handleNextChallenge = () => {
    recordActivity();
    setSelectedOption(null);
    setNumericAnswer('');
    setFeedback(null);
    setShowHint(false);
    setShowSparkle(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all chemical equilibrium challenges!');
      recordGameScore(ALL_NODE_IDS, score + 10);
      if (onComplete) onComplete(score + 10);
    }
  };

  const currentMastery = useMemo(() => {
    return masteryProb(bktStates[currentChallenge.nodeId] || createBKTState());
  }, [bktStates, currentChallenge]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* HEADER BAR */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-cyan-500/20">
            ⇌
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Chemical Equilibrium & Dynamic Nature
            </h1>
            <p className="text-xs text-slate-400">Class 11 ISC Chemistry • Nodes c11_chem_051 to c11_chem_060</p>
          </div>
        </div>

        {/* TOP TAB NAVIGATION */}
        <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'discovery' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            1. Discovery Scenario
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'lab' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            2. Interactive Labs (5)
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'challenges' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            3. Master Challenges (22+)
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'summary' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            4. Industrial Summary
          </button>
        </div>

        {/* SCORE & STREAK COUNTER */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
            <span className="text-amber-400 font-bold">🔥 Streak: {streak}</span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-bold">⭐ Score: {score}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {/* --- TAB 1: DISCOVERY SCENARIO --- */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800">
                SCENARIO BRIEFING
              </div>
              <h2 className="text-2xl font-bold text-cyan-300">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-base">{SCENARIO.intro}</p>
              <p className="text-slate-400 leading-relaxed text-sm bg-slate-950 p-4 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                💡 Initial Discovery Probe
              </h3>
              <p className="text-slate-200 text-base font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDiscoverySelected(idx);
                      setDiscoveryAnswered(true);
                      if (idx === DISCOVERY_QUESTION.correctIndex) {
                        audioManager.play('success');
                        speechManager.speak('Spot on! Chemical equilibrium is dynamic.');
                      } else {
                        audioManager.play('error');
                        speechManager.speak('Think about microscopic molecular movements.');
                      }
                    }}
                    className={`p-4 rounded-xl text-left border transition-all text-sm font-medium ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="p-4 rounded-xl bg-cyan-950/50 border border-cyan-800 text-cyan-200 text-sm leading-relaxed animate-fade-in">
                  <span className="font-bold block mb-1">Key Concept Insight:</span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS ARRAY MANDATORY RENDER */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-cyan-400">Pre-Lab Prediction Probes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded-full border border-cyan-800">
                      Prediction #{qIdx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{pq.question}</p>
                    <div className="space-y-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredictionAnswers({ ...predictionAnswers, [qIdx]: oIdx });
                            if (oIdx === pq.correctIndex) {
                              audioManager.play('chime');
                            } else {
                              audioManager.play('tap');
                            }
                          }}
                          className={`w-full p-2.5 rounded-lg text-xs text-left border transition-all ${
                            predictionAnswers[qIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionAnswers[qIdx] !== undefined && (
                      <p className="text-xs text-slate-400 italic bg-slate-900 p-2 rounded border border-slate-800">
                        🔍 Verify: {pq.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: INTERACTIVE LAB SIMULATION --- */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* EXPLORATION STEPS RENDER MANDATORY */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Interactive Exploration Steps:</span>
              <div className="flex flex-wrap gap-2">
                {EXPLORATION_STEPS.map((step, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => {
                      setSelectedLabStep(sIdx);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedLabStep === sIdx
                        ? 'bg-cyan-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Lab Instruction Banner */}
            <div className="bg-cyan-950/40 border border-cyan-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-cyan-300">{EXPLORATION_STEPS[selectedLabStep].title}</h4>
                <p className="text-xs text-cyan-100/80 mt-1">{EXPLORATION_STEPS[selectedLabStep].instruction}</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-900/60 px-3 py-1 rounded-full border border-cyan-700">
                Node: {EXPLORATION_STEPS[selectedLabStep].nodeId}
              </span>
            </div>

            {/* LAB SIMULATOR LAYOUT: CANVAS + CONTROLS + LIVE GAUGES */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Canvas Molecular Animation (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                    ⚛️ Reactor Vessel Simulation (N₂ + 3H₂ ⇌ 2NH₃)
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsSimRunning(!isSimRunning)}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        isSimRunning ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isSimRunning ? 'Pause Sim' : 'Resume Sim'}
                    </button>
                  </div>
                </div>

                {/* Canvas Render */}
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={280}
                  className="w-full h-auto rounded-xl border border-slate-800 bg-slate-950"
                />

                {/* Molecule Legend */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500 mr-1.5"></span>
                    <span className="text-slate-300 font-semibold">N₂ (g): {currentN2.toFixed(2)} mol</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1.5"></span>
                    <span className="text-slate-300 font-semibold">H₂ (g): {currentH2.toFixed(2)} mol</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="inline-block w-3 h-3 rounded-full bg-emerald-500 mr-1.5"></span>
                    <span className="text-slate-300 font-semibold">NH₃ (g): {currentNH3.toFixed(2)} mol</span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                    <span className="inline-block w-3 h-3 rounded-full bg-purple-500 mr-1.5"></span>
                    <span className="text-slate-300 font-semibold">Inert Ar: {inertGasAmount.toFixed(1)} mol</span>
                  </div>
                </div>

                {/* Forward & Reverse Rate Meters */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400">Microscopic Reaction Rates:</span>
                    <span className={Math.abs(rf - rb) < 0.05 ? 'text-emerald-400 font-mono' : 'text-amber-400 font-mono'}>
                      {Math.abs(rf - rb) < 0.05 ? 'STATUS: Dynamic Equilibrium Achieved (rf ≈ rb)' : 'STATUS: Re-establishing Equilibrium...'}
                    </span>
                  </div>

                  {/* rf Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-red-400 font-semibold">Forward Rate (rf)</span>
                      <span className="text-red-400 font-mono">{rf.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-600 to-red-400 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, rf * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* rb Bar */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-blue-400 font-semibold">Reverse Rate (rb)</span>
                      <span className="text-blue-400 font-mono">{rb.toFixed(3)}</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, rb * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Lab Controls & Thermodynamic Gauges (5 cols) */}
              <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-5 border border-slate-800 shadow-xl space-y-5">
                <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                  🎛️ Equilibrium Control Panel
                </h3>

                {/* Thermochemical Gauges: Kc vs Qc */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-400 font-semibold">Equilibrium Constant (Kc)</div>
                    <div className="text-xl font-bold font-mono text-cyan-400 mt-1">{targetKc.toFixed(3)}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Determined ONLY by Temp</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                    <div className="text-xs text-slate-400 font-semibold">Reaction Quotient (Qc)</div>
                    <div className="text-xl font-bold font-mono text-amber-400 mt-1">{currentQc.toFixed(3)}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {currentQc < targetKc ? 'Qc < Kc (Shifts Right →)' : currentQc > targetKc ? 'Qc > Kc (← Shifts Left)' : 'Qc = Kc (At Equilibrium)'}
                    </div>
                  </div>
                </div>

                {/* Sliders for Controls */}
                <div className="space-y-4 text-xs">
                  {/* Reactant Injectors */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-slate-300">
                      <span>Inject N₂ Initial Moles:</span>
                      <span className="text-cyan-400">{N2_moles.toFixed(1)} mol</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="10.0"
                      step="0.5"
                      value={N2_moles}
                      onChange={(e) => {
                        setN2Moles(parseFloat(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-slate-300">
                      <span>Inject H₂ Initial Moles:</span>
                      <span className="text-cyan-400">{H2_moles.toFixed(1)} mol</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="15.0"
                      step="0.5"
                      value={H2_moles}
                      onChange={(e) => {
                        setH2Moles(parseFloat(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-slate-300">
                      <span>Inject/Remove NH₃ Product Moles:</span>
                      <span className="text-emerald-400">{NH3_moles.toFixed(1)} mol</span>
                    </div>
                    <input
                      type="range"
                      min="0.1"
                      max="10.0"
                      step="0.5"
                      value={NH3_moles}
                      onChange={(e) => {
                        setNH3Moles(parseFloat(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-emerald-500"
                    />
                  </div>

                  {/* Temperature Slider */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-slate-300">
                      <span>Temperature (T):</span>
                      <span className="text-rose-400">{tempK} K ({tempK - 273}°C)</span>
                    </div>
                    <input
                      type="range"
                      min="300"
                      max="800"
                      step="25"
                      value={tempK}
                      onChange={(e) => {
                        setTempK(parseInt(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-rose-500"
                    />
                  </div>

                  {/* Volume Slider */}
                  <div>
                    <div className="flex justify-between font-semibold mb-1 text-slate-300">
                      <span>Container Volume (V):</span>
                      <span className="text-amber-400">{volumeL.toFixed(1)} L</span>
                    </div>
                    <input
                      type="range"
                      min="2.0"
                      max="20.0"
                      step="1.0"
                      value={volumeL}
                      onChange={(e) => {
                        setVolumeL(parseFloat(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  {/* Toggles: Catalyst & Inert Gas */}
                  <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setHasCatalyst(!hasCatalyst);
                        audioManager.play(hasCatalyst ? 'pop' : 'sparkle');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        hasCatalyst ? 'bg-amber-950 border-amber-500 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">⚡ Catalyst</div>
                      <div className="text-[10px] mt-0.5">{hasCatalyst ? 'Iron Fe Active (3x rates)' : 'No Catalyst'}</div>
                    </button>

                    <button
                      onClick={() => {
                        const nextMode = inertGasMode === 'none' ? 'constant_volume' : inertGasMode === 'constant_volume' ? 'constant_pressure' : 'none';
                        setInertGasMode(nextMode);
                        setInertGasAmount(nextMode === 'none' ? 0 : 5.0);
                        audioManager.play('whoosh');
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        inertGasMode !== 'none' ? 'bg-purple-950 border-purple-500 text-purple-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="font-bold">💨 Inert Gas (Argon)</div>
                      <div className="text-[10px] mt-0.5">
                        {inertGasMode === 'none' ? 'None' : inertGasMode === 'constant_volume' ? 'Const V (No shift)' : 'Const P (Shifts left)'}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* OBSERVATION QUESTIONS ARRAY MANDATORY RENDER */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-amber-400">Lab Observation Checks</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-800">
                      Observation #{oIdx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-200">{oq.question}</p>
                    <div className="space-y-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers({ ...observationAnswers, [oIdx]: optIdx });
                            if (optIdx === oq.correctIndex) {
                              audioManager.play('success');
                            } else {
                              audioManager.play('error');
                            }
                          }}
                          className={`w-full p-2.5 rounded-lg text-xs text-left border transition-all ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
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

            {/* TOPIC SVG DIAGRAMS RENDER (At least 3) */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-cyan-400">Key Thermodynamic & Equilibrium Diagrams</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-300 mb-2">1. Dynamic Rate Equalization</h4>
                  <DiagramEquilibriumRateGraph />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300 mb-2">2. Catalyzed Energy Profile</h4>
                  <DiagramEnergyProfile />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-300 mb-2">3. Industrial Haber Process Apparatus</h4>
                  <DiagramHaberProcessApparatus />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: MASTER CHALLENGES (22+) --- */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Progress Header */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Tier:{' '}
                  <span className="capitalize text-cyan-400">{currentChallenge.difficulty}</span> | Node:{' '}
                  <span className="font-mono text-slate-400">{currentChallenge.nodeId}</span>
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs text-slate-400">Mastery Level:</span>
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-800 font-bold">
                  {(currentMastery * 100).toFixed(0)}%
                </span>
              </div>
            </div>

            {/* Challenge Question Card */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6 relative">
              <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

              <p className="text-base font-semibold text-slate-100 leading-relaxed">
                {currentChallenge.question}
              </p>

              {/* Multiple Choice Options */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        handleSelectOption(idx);
                        setSparklePos({ x: e.clientX, y: e.clientY });
                      }}
                      className={`p-4 rounded-xl text-left border transition-all text-sm font-medium ${
                        selectedOption === idx
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-400">Enter Numerical Answer:</label>
                  <input
                    type="number"
                    step="any"
                    value={numericAnswer}
                    onChange={(e) => setNumericAnswer(e.target.value)}
                    placeholder="Type value..."
                    className="w-full max-w-xs p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:border-cyan-500 outline-none"
                  />
                </div>
              )}

              {/* Auto Hint Bubble */}
              <HintBubble show={showHint} text={currentChallenge.hints[0]} />

              {/* Verification & Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    audioManager.play('hint');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-950 border border-slate-800 text-amber-400 hover:bg-slate-900"
                >
                  {showHint ? 'Hide Hint' : '💡 Need Hint?'}
                </button>

                {!feedback ? (
                  <button
                    onClick={handleVerifyAnswer}
                    disabled={currentChallenge.type === 'multiple-choice' ? selectedOption === null : !numericAnswer}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all"
                  >
                    Submit & Verify
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>

              {/* Feedback Banner */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl border text-sm leading-relaxed ${
                    feedback.isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>

            {/* SRS Review Queue Stats */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Spaced Repetition Engine (SM-2) Tracking</span>
              <span>
                Item Review Interval: {(srsItems[currentChallenge.id]?.interval || 1).toFixed(1)} days | EF:{' '}
                {(srsItems[currentChallenge.id]?.easinessFactor || 2.5).toFixed(2)}
              </span>
            </div>
          </div>
        )}

        {/* --- TAB 4: INDUSTRIAL SUMMARY & REAL WORLD ACTIVITY --- */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY MANDATORY RENDER */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
                REAL-WORLD ENGINEERING APPLICATION
              </div>
              <h2 className="text-2xl font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 leading-relaxed text-sm">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-emerald-400">Phase {idx + 1}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPANDED MISCONCEPTIONS MATRIX */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-amber-400">Common Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="text-sm font-bold text-rose-400">❌ {m.title}</h4>
                    <p className="text-xs text-slate-400">{m.misconception}</p>
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-300 mt-2">
                      <span className="font-bold">✓ Correction:</span> {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Chemical Equilibrium Mastery Completed!" />
    </div>
  );
}