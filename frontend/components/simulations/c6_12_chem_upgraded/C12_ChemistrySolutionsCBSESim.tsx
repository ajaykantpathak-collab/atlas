'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS FOR ISC / CBSE CLASS 12 SOLUTIONS
// ==========================================
const NODE_302 = 'c12_chem_cbse_302'; // Types of Solutions
const NODE_303 = 'c12_chem_cbse_303'; // Expressing Concentration: Mass %, Volume %, Mass/Volume %
const NODE_304 = 'c12_chem_cbse_304'; // ppm, Mole Fraction, Molarity, Molality
const NODE_305 = 'c12_chem_cbse_305'; // Solubility of Solids in Liquids & Temperature Effects
const NODE_306 = 'c12_chem_cbse_306'; // Solubility of Gases in Liquids & Henry's Law
const NODE_307 = 'c12_chem_cbse_307'; // Applications of Henry's Law (Scuba diving, Anoxia, Carbonated drinks)
const NODE_308 = 'c12_chem_cbse_308'; // Vapour Pressure of Liquid Solutions & Raoult's Law
const NODE_309 = 'c12_chem_cbse_309'; // Raoult's Law as a Special Case of Henry's Law
const NODE_311 = 'c12_chem_cbse_311'; // Ideal and Non-Ideal Solutions
const NODE_313 = 'c12_chem_cbse_313'; // Positive & Negative Deviations from Raoult's Law
const NODE_314 = 'c12_chem_cbse_314'; // Azeotropes: Minimum & Maximum Boiling Azeotropes
const NODE_315 = 'c12_chem_cbse_315'; // Colligative Properties & Relative Lowering of Vapour Pressure
const NODE_316 = 'c12_chem_cbse_316'; // Elevation of Boiling Point & Ebullioscopic Constant (Kb)
const NODE_317 = 'c12_chem_cbse_317'; // Depression of Freezing Point & Cryoscopic Constant (Kf)
const NODE_320 = 'c12_chem_cbse_320'; // Osmosis & Osmotic Pressure (van 't Hoff equation)
const NODE_321 = 'c12_chem_cbse_321'; // Isotonic, Hypertonic, Hypotonic Solutions & Reverse Osmosis
const NODE_332 = 'c12_chem_cbse_332'; // Abnormal Molar Masses & van 't Hoff factor (i)
const NODE_333 = 'c12_chem_cbse_333'; // Degree of Association & Dissociation Calculations
const NODE_267 = 'c12_chem_cbse_267'; // Comprehensive Solutions Master Review

const ALL_NODE_IDS = [
  NODE_302, NODE_303, NODE_304, NODE_305, NODE_306,
  NODE_307, NODE_308, NODE_309, NODE_311, NODE_313,
  NODE_314, NODE_315, NODE_316, NODE_317, NODE_320,
  NODE_321, NODE_332, NODE_333, NODE_267
];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Advanced Solutions & Colligative Dynamics Virtual Laboratory',
  intro: 'Welcome to the High-Precision Chemical Thermodynamics and Solutions Lab at the Central Research Institute. As chief research chemist, you will investigate molecular interactions, solution equilibria, vapor pressure lowering, and osmotic phenomena across various solutes and solvent media.',
  context: 'Manipulate temperature, solvent identity, solute molar mass, and ion dissociation to analyze ideal and non-ideal behaviors, measure colligative deviations, and optimize industrial desalination and pharmaceutical formulations.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'When 1 mole of Sodium Chloride (NaCl) is dissolved in 1 kg of water, its freezing point drops by ~3.72 K. However, when 1 mole of Acetic Acid (CH₃COOH) is dissolved in 1 kg of Benzene, its freezing point drops by only HALF of the predicted molar lowering. Why does solute identity drastically change colligative magnitude despite equal molal quantity?',
  options: [
    'NaCl reacts with water to form heat, whereas acetic acid cools the benzene down.',
    'NaCl completely dissociates into 2 ions per formula unit (i ≈ 2), whereas acetic acid dimerizes via hydrogen bonding in benzene (i ≈ 0.5).',
    'Benzene has a higher molecular weight than water, neutralizing half the solute molecules.',
    'Water undergoes complete evaporation while benzene remains completely inert.'
  ],
  correctIndex: 1,
  hintAfter: 'Colligative properties depend solely on the NUMBER of particle entities in solution. Dissociation doubles particle concentration (i = 2), while association/dimerization halves it (i = 0.5).',
};

// ==========================================
// MANDATORY SECTION 3: DEFAULT_PROPS & STEPS
// ==========================================
interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

const DEFAULT_PROPS: SimProps = {};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Concentration & Solvation Dynamics',
    instruction: 'Adjust solute mass and solvent volume for different salts and organic molecules to compute Molarity (M), Molality (m), and Mole Fraction (χ). Observe molecular solvation spheres.',
    interactionType: 'concentration-calculator',
    nodeId: NODE_304,
  },
  {
    title: 'Lab 2: Vapor Pressure & Raoult\'s Law Non-Ideality',
    instruction: 'Vary mole fraction of binary liquid mixtures (A + B) and observe total vapor pressure curve. Compare Ideal behavior against Positive (endothermic/weak A-B) and Negative (exothermic/strong A-B) deviations.',
    interactionType: 'raoult-deviation-sim',
    nodeId: NODE_313,
  },
  {
    title: 'Lab 3: Ebullioscopy & Cryoscopy ($T_b$ Elevation & $T_f$ Depression)',
    instruction: 'Add non-volatile solutes to solvents, adjust molality, and measure boiling point elevation ($\Delta T_b = i K_b m$) and freezing point depression ($\Delta T_f = i K_f m$).',
    interactionType: 'phase-transition-meter',
    nodeId: NODE_316,
  },
  {
    title: 'Lab 4: Osmotic Pressure & Reverse Osmosis Membrane',
    instruction: 'Apply external hydraulic pressure to a semi-permeable membrane chamber. Determine osmotic pressure ($\Pi = iCRT$) and trigger reverse osmosis for water purification.',
    interactionType: 'osmosis-pressure-chamber',
    nodeId: NODE_321,
  },
  {
    title: 'Lab 5: van \'t Hoff Factor ($i$) & Degree of Ionization/Association',
    instruction: 'Simulate strong electrolytes (NaCl, $CaCl_2$, $K_4[Fe(CN)_6]$) and associative solutes (benzoic acid in benzene). Calculate degree of dissociation ($\alpha$) and association ($\alpha_{assoc}$).',
    interactionType: 'vant-hoff-calculator',
    nodeId: NODE_333,
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an equimolar binary mixture of Ethanol and Acetone exhibits positive deviation from Raoult\'s law, what will happen to the solution temperature upon mixing and what type of azeotrope will form?',
    options: [
      'Temperature decreases ($\Delta H_{mix} > 0$), forms a minimum boiling azeotrope.',
      'Temperature increases ($\Delta H_{mix} < 0$), forms a maximum boiling azeotrope.',
      'Temperature stays identical ($\Delta H_{mix} = 0$), no azeotrope forms.',
      'Solution boils spontaneously at room temperature without forming any azeotrope.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Select "Ethanol + Acetone" in Lab 2 to verify heat absorption ($\Delta H > 0$) and minimum boiling azeotrope vapor pressure peak.',
    nodeId: NODE_314,
  },
  {
    question: 'Predict: A 0.1 M solution of $BaCl_2$ and a 0.1 M solution of Urea ($NH_2CONH_2$) are separated by a semi-permeable membrane at 298 K. In which direction will net water osmosis occur?',
    options: [
      'Water flows from $BaCl_2$ solution towards Urea solution.',
      'Water flows from Urea solution towards $BaCl_2$ solution.',
      'No water movement occurs because both solutions have equal molarity (0.1 M).',
      'Both solute ions diffuse across the membrane until concentrations equalize.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Use Lab 4 Osmosis chamber to test effective particle concentration ($i \times C$): Urea $i=1$ ($0.1\text{ M}$), $BaCl_2$ $i=3$ ($0.3\text{ M}$). Osmosis flows from lower solute concentration (Urea) to higher ($BaCl_2$).',
    nodeId: NODE_320,
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the vapor pressure above a pure liquid solvent when a non-volatile solute (e.g., Sucrose) is dissolved in it?',
    observableOptions: [
      'Vapor pressure increases because solute molecules push solvent molecules into vapor state.',
      'Vapor pressure decreases because solute molecules occupy surface fraction, reducing solvent evaporation rate.',
      'Vapor pressure remains completely unchanged because non-volatile solutes do not enter the gas phase.',
      'Vapor pressure drops to zero instantaneously.'
    ],
    correctIndex: 1,
    nodeId: NODE_315,
  },
  {
    question: 'In the Reverse Osmosis chamber, what condition must be met for pure water to flow OUT of hypertonic seawater into fresh water?',
    observableOptions: [
      'Applied external hydraulic pressure must be equal to atmospheric pressure.',
      'Applied external pressure must exceed the osmotic pressure ($\Pi$) of the saltwater.',
      'Temperature of the solution must be raised above 100°C.',
      'The solute must be completely precipitated using chemical catalysts.'
    ],
    correctIndex: 1,
    nodeId: NODE_321,
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Seawater Desalination & Intravenous Fluid Formulation',
  description: 'Apply colligative thermodynamics to engineer life-saving medical saline solutions (0.9% w/v NaCl) and design high-pressure reverse osmosis membranes for municipal seawater desalination.',
  steps: [
    'Step 1: Calculate the osmotic pressure ($\Pi$) of seawater containing 35 g/L NaCl ($M_r = 58.5\text{ g/mol}$) at $T = 298\text{ K}$ ($i = 1.9$). Answer: $\Pi = 1.9 \times (35/58.5) \times 0.0821 \times 298 \approx 27.8\text{ atm}$.',
    'Step 2: Determine the minimum hydraulic pressure required for high-pressure reverse osmosis pumps ($P_{pump} > 27.8\text{ atm}$, typically operated at 55 - 70 atm).',
    'Step 3: Prepare isotonic IV Saline for clinical human infusion ($0.9\text{ g NaCl per } 100\text{ mL } H_2O$, Osmolarity $\approx 308\text{ mOsm/L}$).',
    'Step 4: Verify that hypotonic IV solutions cause red blood cell hemolysis, while hypertonic IV solutions cause cell crenation.'
  ],
};

// ==========================================
// MISCONCEPTIONS DATA
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'm1',
    title: 'Molarity vs. Molality Temperature Dependence',
    description: 'Students often assume Molarity and Molality are both independent of temperature.',
    correction: 'Molarity ($M = \text{moles solute}/\text{liters solution}$) depends on solution volume, which expands with temperature. Molality ($m = \text{moles solute}/\text{kg solvent}$) uses solvent mass, which is temperature-independent.',
    nodeId: NODE_304
  },
  {
    id: 'm2',
    title: 'Ideal Solution Volume Changes',
    description: 'Believing that mixing two liquids always results in $\Delta V_{mix} = 0$.',
    correction: 'For ideal solutions, $\Delta V_{mix} = 0$ and $\Delta H_{mix} = 0$. But for non-ideal solutions with strong or weak intermolecular forces, total volume increases or contracts upon mixing.',
    nodeId: NODE_311
  },
  {
    id: 'm3',
    title: 'Azeotropes and Fractional Distillation',
    description: 'Assuming azeotropic mixtures can be separated into pure components by repeated fractional distillation.',
    correction: 'Azeotropes boil at constant temperature with identical liquid and vapor compositions, making fractional distillation impossible beyond the azeotropic composition.',
    nodeId: NODE_314
  },
  {
    id: 'm4',
    title: 'Colligative Nature & Solute Identity',
    description: 'Thinking boiling point elevation depends on whether the solute is sugar, urea, or salt mass.',
    correction: 'Colligative properties depend exclusively on the TOTAL NUMBER OF DISSOLVED PARTICLES per unit mass of solvent, not on chemical identity or molecular mass.',
    nodeId: NODE_315
  },
  {
    id: 'm5',
    title: 'van \'t Hoff Factor for Non-Electrolytes',
    description: 'Assigning $i = 0$ for non-electrolytes like glucose or urea.',
    correction: 'Non-electrolytes do not dissociate or associate, so 1 mole of solid gives 1 mole of dissolved particles in solution ($i = 1$).',
    nodeId: NODE_332
  },
  {
    id: 'm6',
    title: 'Osmosis Solvent Diffusion Direction',
    description: 'Assuming water moves from high solute concentration to low solute concentration.',
    correction: 'Water moves spontaneously from lower SOLUTE concentration (higher solvent activity / dilute) to higher SOLUTE concentration (lower solvent activity / concentrated).',
    nodeId: NODE_320
  }
];

// ==========================================
// DIAGNOSTIC QUESTIONS
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'd1',
    question: 'Which concentration unit remains completely unchanged when temperature rises from 20°C to 80°C?',
    options: ['Molarity (M)', 'Normality (N)', 'Molality (m)', 'Mass/Volume percentage (% w/v)'],
    correctIndex: 2,
    explanation: 'Molality measures moles per kilogram of solvent mass, which does not alter with volume thermal expansion.',
    nodeId: NODE_304
  },
  {
    id: 'd2',
    question: 'According to Henry\'s Law ($p = K_H \cdot x$), higher Henry\'s constant $K_H$ value for a gas at a given pressure indicates:',
    options: [
      'Higher gas solubility in liquid',
      'Lower gas solubility in liquid',
      'Zero effect on gas solubility',
      'Gas turns into solid instantly'
    ],
    correctIndex: 1,
    explanation: 'Since $x = p / K_H$, a higher $K_H$ at constant pressure $p$ means smaller mole fraction $x$, hence lower solubility.',
    nodeId: NODE_306
  },
  {
    id: 'd3',
    question: 'For a binary solution showing POSITIVE deviation from Raoult\'s Law, which set of thermodynamic criteria is correct?',
    options: [
      '$\Delta H_{mix} > 0, \Delta V_{mix} > 0, F_{A-B} < F_{A-A} \text{ or } F_{B-B}$',
      '$\Delta H_{mix} < 0, \Delta V_{mix} < 0, F_{A-B} > F_{A-A} \text{ or } F_{B-B}$',
      '$\Delta H_{mix} = 0, \Delta V_{mix} = 0, F_{A-B} = F_{A-A}$',
      '$\Delta H_{mix} > 0, \Delta V_{mix} < 0, F_{A-B} > F_{A-A}$'
    ],
    correctIndex: 0,
    explanation: 'Positive deviation implies weaker intermolecular attractions ($A-B < A-A, B-B$), absorbing heat ($\Delta H > 0$) and expanding volume ($\Delta V > 0$).',
    nodeId: NODE_313
  },
  {
    id: 'd4',
    question: 'A mixture of Nitric Acid ($HNO_3$) and Water forms a maximum boiling azeotrope. This indicates:',
    options: [
      'Positive deviation from Raoult\'s law',
      'Negative deviation from Raoult\'s law',
      'Ideal solution behavior',
      'Zero vapor pressure above liquid'
    ],
    correctIndex: 1,
    explanation: 'Maximum boiling azeotropes occur in non-ideal solutions exhibiting strong negative deviations due to strong hydrogen bonding ($HNO_3 - H_2O$).',
    nodeId: NODE_314
  },
  {
    id: 'd5',
    question: 'What is the theoretical van \'t Hoff factor ($i$) for complete dissociation of $K_3[Fe(CN)_6]$ in dilute aqueous solution?',
    options: ['3', '4', '5', '10'],
    correctIndex: 1,
    explanation: '$K_3[Fe(CN)_6] \rightarrow 3 K^+ + [Fe(CN)_6]^{3-}$, producing 3 + 1 = 4 total ions per formula unit.',
    nodeId: NODE_332
  },
  {
    id: 'd6',
    question: 'What is the cryoscopic constant $K_f$ dependent upon?',
    options: [
      'Identity and molarity of solute only',
      'Nature and physical properties of solvent only',
      'Atmospheric pressure only',
      'Volume of solute added'
    ],
    correctIndex: 1,
    explanation: '$K_f = \frac{R M_{solvent} T_f^2}{1000 \Delta H_{fusion}}$, which depends exclusively on the solvent.',
    nodeId: NODE_317
  },
  {
    id: 'd7',
    question: 'Red blood cells shrink (crenate) when placed in a 2.0% NaCl solution. This demonstrates that 2.0% NaCl solution is:',
    options: ['Hypotonic', 'Isotonic', 'Hypertonic', 'Isohydric'],
    correctIndex: 2,
    explanation: 'Human blood cells are isotonic with 0.9% NaCl. 2.0% NaCl has higher osmotic pressure (hypertonic), causing water exit.',
    nodeId: NODE_321
  },
  {
    id: 'd8',
    question: 'If acetic acid forms dimers in benzene with a degree of association $\alpha = 0.8$, what is the experimental van \'t Hoff factor $i$?',
    options: ['0.2', '0.6', '1.2', '1.6'],
    correctIndex: 1,
    explanation: 'For dimerization ($n = 2$), $i = 1 - \alpha(1 - 1/n) = 1 - 0.8(0.5) = 1 - 0.4 = 0.6$.',
    nodeId: NODE_333
  }
];

// ==========================================
// MANDATORY SECTION 7: CHALLENGES ARRAY (22+)
// ==========================================
interface ChallengeItem {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
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

const CHALLENGES: ChallengeItem[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'c1',
    nodeId: NODE_302,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Which of the following is an example of a solid solution where a gas is dissolved in a solid solvent?',
    options: [
      'Amalgam of mercury with sodium',
      'Solution of hydrogen gas in palladium metal',
      'Camphor vapors in nitrogen gas',
      'Glucose dissolved in pure water'
    ],
    correctIndex: 1,
    explanation: 'Palladium metal absorbs large quantities of Hydrogen gas, forming a interstitial solid solution (Gas in Solid).',
    hints: [
      'Recall gas adsorption on transition metal surfaces.',
      'Palladium acts as the solid solvent host.',
      'Hydrogen molecules occupy interstitial lattice sites.'
    ]
  },
  {
    id: 'c2',
    nodeId: NODE_303,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Formula application',
    question: 'How many grams of glucose ($C_6H_{12}O_6$) are required to prepare 250 g of a 10% (w/w) aqueous glucose solution?',
    options: ['10 g', '25 g', '50 g', '225 g'],
    correctIndex: 1,
    explanation: 'Mass % = (Mass solute / Mass solution) × 100. Mass solute = (10 / 100) × 250 = 25 g.',
    hints: [
      '10% (w/w) means 10 g of solute per 100 g total solution.',
      'Multiply total mass by 0.10.',
      '250 g × 0.10 = 25 g.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_305,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding Le Chatelier',
    question: 'If dissolution of ammonium chloride ($NH_4Cl$) in water is endothermic ($\Delta H_{sol} > 0$), how does increasing temperature affect its solubility?',
    options: [
      'Solubility decreases',
      'Solubility increases',
      'Solubility remains unaffected',
      'Solubility drops to zero'
    ],
    correctIndex: 1,
    explanation: 'According to Le Chatelier\'s principle, endothermic processes absorb heat; increasing temperature shifts equilibrium to favor higher solubility.',
    hints: [
      'Endothermic processes take in thermal energy: Solid + Heat <-> Solution.',
      'Adding heat pushes reaction forward.',
      'Hence solubility increases.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_306,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Concept recall',
    question: 'Why do aquatic species feel much more comfortable in cold lake water than in warm water?',
    options: [
      'Oxygen gas solubility in water increases as water temperature decreases.',
      'Nitrogen gas solubility drops to zero in cold water.',
      'Cold water has higher molar density pushing fish upwards.',
      'Carbon dioxide becomes toxic in warm water.'
    ],
    correctIndex: 0,
    explanation: 'Gas dissolution in liquid is exothermic ($\Delta H < 0$). Lower temperature increases gas solubility, providing higher dissolved oxygen concentration.',
    hints: [
      'Think about Henry\'s law temperature dependence.',
      'Gas solubility decreases with rising temperature.',
      'Cold water holds more dissolved oxygen.'
    ]
  },
  {
    id: 'c5',
    nodeId: NODE_308,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Definition',
    question: 'State Raoult\'s Law for a volatile solute in a liquid solvent solution:',
    options: [
      'Partial vapor pressure of a component is directly proportional to its mole fraction in solution.',
      'Total pressure is inversely proportional to temperature in kelvin.',
      'Solubility of gas in liquid is independent of external pressure.',
      'Vapor pressure equals atmospheric pressure at absolute zero.'
    ],
    correctIndex: 0,
    explanation: 'Raoult\'s law states $p_A = p_A^\circ \cdot x_A$, where $p_A^\circ$ is vapor pressure of pure component A and $x_A$ is its mole fraction.',
    hints: [
      'Relates partial vapor pressure to mole fraction in liquid phase.',
      'Formula: p_A = p_A° * x_A.',
      'Proportionality constant is pure vapor pressure.'
    ]
  },
  {
    id: 'c6',
    nodeId: NODE_315,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Definition',
    question: 'Which of the following properties is NOT a colligative property of dilute solutions?',
    options: [
      'Relative lowering of vapor pressure',
      'Elevation of boiling point',
      'Optical rotation / Refractive index',
      'Osmotic pressure'
    ],
    correctIndex: 2,
    explanation: 'Colligative properties depend only on number of solute particles. Refractive index and optical rotation depend on solute molecular structure.',
    hints: [
      'Colligative properties depend solely on particle count.',
      'The 4 main properties are Δp/p°, ΔTb, ΔTf, and Π.',
      'Optical rotation depends on molecular chirality.'
    ]
  },
  {
    id: 'c7',
    nodeId: NODE_320,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Concept recall',
    question: 'What type of membrane is strictly required to observe osmosis between two solutions?',
    options: [
      'Fully permeable filter paper',
      'Semi-permeable membrane (SPM)',
      'Impermeable rubber sheet',
      'Anode copper foil'
    ],
    correctIndex: 1,
    explanation: 'A semi-permeable membrane (SPM) selectively permits solvent molecules to pass while blocking solute particles.',
    hints: [
      'Allows small solvent molecules through.',
      'Blocks larger solute particles or ions.',
      'Examples include cellophane, pig bladder, cellulose acetate.'
    ]
  },

  // --- STANDARD (8) ---
  {
    id: 'c8',
    nodeId: NODE_304,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'Calculate the Molarity (M) of a solution containing 5.85 g of NaCl dissolved in pure water to make 500 mL of solution. (Molar mass NaCl = 58.5 g/mol)',
    correctAnswer: 0.20,
    tolerance: 0.01,
    unit: 'M',
    explanation: 'Moles NaCl = 5.85 / 58.5 = 0.10 mol. Volume = 0.50 L. Molarity = 0.10 / 0.50 = 0.20 M.',
    hints: [
      'Find moles: mass / molar mass = 5.85 / 58.5.',
      'Convert volume from mL to Liters: 500 mL = 0.5 L.',
      'Molarity = Moles / Liters = 0.1 / 0.5 = 0.2 M.'
    ]
  },
  {
    id: 'c9',
    nodeId: NODE_304,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'Calculate the mole fraction of ethylene glycol ($C_2H_6O_2$, $M_r = 62\text{ g/mol}$) in an aqueous solution containing 20% glycol by mass.',
    correctAnswer: 0.068,
    tolerance: 0.005,
    unit: 'χ',
    explanation: 'In 100 g solution: 20 g glycol, 80 g water. Moles glycol = 20 / 62 = 0.3225 mol. Moles water = 80 / 18 = 4.444 mol. χ_glycol = 0.3225 / (0.3225 + 4.444) = 0.0676 ≈ 0.068.',
    hints: [
      'Assume 100 g total solution weight.',
      '20 g solute ($M_r=62$) and 80 g solvent ($M_r=18$).',
      'Moles glycol = 0.3225, Moles water = 4.444. Divide solute moles by total moles.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_307,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Scuba divers breathing compressed air at high underwater pressures risk a painful medical condition called "bends" during rapid ascent. Why do deep-sea diving gas cylinders contain Helium dilution (11.7% He, 56.2% N2, 32.1% O2)?',
    options: [
      'Helium has very low solubility in blood even at high pressure, preventing toxic bubble formation during decompression.',
      'Helium reacts chemically with blood hemoglobin to supply extra oxygen.',
      'Helium makes the gas cylinder lighter for underwater swimming.',
      'Helium increases nitrogen solubility in tissues to prevent nitrogen narcosis.'
    ],
    correctIndex: 0,
    explanation: 'Helium is much less soluble in biological fluids than Nitrogen. Diluting air with Helium prevents high nitrogen saturation and gas bubble embolism in capillaries upon decompression.',
    hints: [
      'Relates directly to Henry\'s Law of gas solubility under elevated pressure.',
      'Nitrogen dissolves rapidly into blood under high deep-sea pressure.',
      'Helium has extremely low solubility, preventing bends.'
    ]
  },
  {
    id: 'c11',
    nodeId: NODE_309,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How is Raoult\'s Law mathematically shown to be a special case of Henry\'s Law?',
    options: [
      'When $K_H$ (Henry\'s constant) becomes equal to $p_1^\circ$ (vapor pressure of pure solvent component).',
      'When mole fraction of solute reaches 1.0.',
      'When solution temperature reaches boiling point at 1 atm.',
      'When gas pressure above solution drops to zero.'
    ],
    correctIndex: 0,
    explanation: 'Henry\'s law is $p = K_H \cdot x$ and Raoult\'s law is $p = p^\circ \cdot x$. If $K_H$ equals $p^\circ$, the two equations become identical.',
    hints: [
      'Compare $p = K_H \cdot x$ with $p = p^\circ \cdot x$.',
      'Look at the proportionality constants $K_H$ and $p^\circ$.',
      'They become identical when $K_H = p^\circ$.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_311,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Thermodynamics analysis',
    question: 'Which pair of liquid compounds will form an ideal solution satisfying Raoult\'s Law across the entire concentration range?',
    options: [
      'Benzene and Toluene',
      'Ethanol and Acetone',
      'Nitric acid and Water',
      'Chloroform and Acetone'
    ],
    correctIndex: 0,
    explanation: 'Benzene and Toluene have virtually identical molecular sizes, structures, and intermolecular forces ($A-A \approx B-B \approx A-B$), making them near-ideal solutions.',
    hints: [
      'Ideal solutions require structurally similar components.',
      'Intermolecular forces A-A, B-B, and A-B must be identical.',
      'Benzene and Toluene are non-polar aromatic homologues.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_313,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Intermolecular forces analysis',
    question: 'Why does a mixture of Chloroform ($CHCl_3$) and Acetone ($CH_3COCH_3$) exhibit a NEGATIVE deviation from Raoult\'s Law?',
    options: [
      'Acetone hydrogen bonds with chloroform ($C-H \cdots O=C$), making A-B attraction stronger than pure A-A and B-B forces.',
      'Chloroform evaporates violently upon contact with acetone.',
      'The components react to precipitate solid carbon.',
      'Acetone molecules repeal chloroform molecules due to steric hindrance.'
    ],
    correctIndex: 0,
    explanation: 'Acetone and chloroform form new intermolecular hydrogen bonds ($C-H \cdots O=C$), strengthening solute-solvent interactions ($F_{A-B} > F_{A-A}, F_{B-B}$), lowering total vapor pressure.',
    hints: [
      'Negative deviation means vapor pressure is lower than ideal prediction.',
      'Lower vapor pressure implies stronger molecular attraction in mixture.',
      'Hydrogen bonding occurs between chloroform hydrogen and acetone carbonyl oxygen.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_316,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'Calculate the boiling point elevation ($\Delta T_b$) in °C when 18 g of glucose ($C_6H_{12}O_6$, $M_r = 180\text{ g/mol}$) is dissolved in 1 kg of water. ($K_b$ for water = $0.52\text{ K kg mol}^{-1}$, $i = 1$)',
    correctAnswer: 0.052,
    tolerance: 0.002,
    unit: '°C',
    explanation: 'Moles glucose = 18 / 180 = 0.1 mol. Molality $m = 0.1\text{ mol} / 1\text{ kg} = 0.1\text{ m}$. $\Delta T_b = i \cdot K_b \cdot m = 1 \cdot 0.52 \cdot 0.1 = 0.052\text{ °C}$.',
    hints: [
      'Moles of glucose = 18 / 180 = 0.1 mol.',
      'Molality m = 0.1 mol / 1 kg = 0.1 m.',
      'ΔTb = Kb * m = 0.52 * 0.1 = 0.052 °C.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_320,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'Calculate the Osmotic Pressure ($\Pi$) in atmospheres at 300 K of a 0.1 M aqueous glucose solution. ($R = 0.0821\text{ L atm mol}^{-1}\text{K}^{-1}$, $i = 1$)',
    correctAnswer: 2.463,
    tolerance: 0.05,
    unit: 'atm',
    explanation: '$\Pi = i C R T = 1 \cdot (0.1) \cdot (0.0821) \cdot (300) = 2.463\text{ atm}$.',
    hints: [
      'Formula: Π = i * C * R * T.',
      'Plug in: i = 1, C = 0.1 M, R = 0.0821, T = 300 K.',
      'Π = 0.1 * 0.0821 * 300 = 2.463 atm.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'c16',
    nodeId: NODE_317,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Multi-step Problem Solving',
    question: '1.00 g of a non-electrolyte organic solute dissolved in 50.0 g of benzene lowered the freezing point of benzene by 0.40 K. Find the molar mass ($M_r$) of the solute in g/mol. ($K_f$ for benzene = $5.12\text{ K kg mol}^{-1}$)',
    correctAnswer: 256.0,
    tolerance: 2.0,
    unit: 'g/mol',
    explanation: '$\Delta T_f = K_f \cdot m \implies 0.40 = 5.12 \cdot (w_2 / M_2) / (w_1 / 1000) \implies M_2 = (1000 \cdot K_f \cdot w_2) / (\Delta T_f \cdot w_1) = (1000 \cdot 5.12 \cdot 1.0) / (0.40 \cdot 50.0) = 256\text{ g/mol}$.',
    hints: [
      'Formula: M2 = (1000 * Kf * w2) / (ΔTf * w1).',
      'w2 = 1.0 g, w1 = 50.0 g, ΔTf = 0.40 K, Kf = 5.12.',
      'M2 = (1000 * 5.12 * 1.0) / (0.40 * 50.0) = 5120 / 20 = 256 g/mol.'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_332,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Electrolyte Colligative',
    question: 'A 0.01 m aqueous solution of Potassium Ferricyanide $K_3[Fe(CN)_6]$ freezes at -0.0712 °C. Calculate the experimental van \'t Hoff factor ($i$). ($K_f$ of water = $1.86\text{ K kg mol}^{-1}$)',
    correctAnswer: 3.83,
    tolerance: 0.05,
    unit: 'i',
    explanation: 'Theoretical $\Delta T_f^{normal} = K_f \cdot m = 1.86 \cdot 0.01 = 0.0186\text{ °C}$. Observed $\Delta T_f^{obs} = 0.0712\text{ °C}$. $i = \Delta T_f^{obs} / \Delta T_f^{normal} = 0.0712 / 0.0186 = 3.8279 \approx 3.83$.',
    hints: [
      'Normal freezing depression ΔTf(theoretical) = 1.86 * 0.01 = 0.0186 °C.',
      'Experimental freezing depression ΔTf(observed) = 0.0712 °C.',
      'van \'t Hoff factor i = ΔTf(observed) / ΔTf(theoretical) = 0.0712 / 0.0186.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_333,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Equilibrium & Ionization Kinetics',
    question: 'Determining degree of dissociation: A 0.1 m solution of a weak monobasic acid $HX$ has a van \'t Hoff factor $i = 1.15$. Calculate the degree of dissociation ($\alpha$) of the acid as a percentage.',
    correctAnswer: 15.0,
    tolerance: 0.5,
    unit: '%',
    explanation: '$HX \rightleftharpoons H^+ + X^-$. Number of ions $n = 2$. $i = 1 + \alpha(n - 1) \implies 1.15 = 1 + \alpha(2 - 1) \implies \alpha = 0.15 = 15\%$.',
    hints: [
      'Monobasic acid dissociates into 2 ions: HX <-> H+ + X- (n = 2).',
      'Formula: i = 1 + α(n - 1).',
      '1.15 = 1 + α(1) => α = 0.15 = 15%.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_333,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Association Analysis',
    question: 'Acetic acid ($CH_3COOH$) undergoes dimerization in benzene ($2 CH_3COOH \rightleftharpoons (CH_3COOH)_2$). If the degree of association $\alpha = 0.90$, calculate the van \'t Hoff factor $i$.',
    correctAnswer: 0.55,
    tolerance: 0.02,
    unit: 'i',
    explanation: 'For dimerization $n = 2$. Formula for association: $i = 1 - \alpha(1 - 1/n) = 1 - 0.90(1 - 0.5) = 1 - 0.45 = 0.55$.',
    hints: [
      'Dimerization means 2 molecules combine into 1 dimer particle (n = 2).',
      'Formula: i = 1 - α(1 - 1/n).',
      'i = 1 - 0.90(0.5) = 1 - 0.45 = 0.55.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_314,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Azeotropic Distillation Theory',
    question: 'A mixture of 95.6% Ethanol and 4.4% Water forms a constant boiling minimum boiling azeotrope at 351.15 K. Why is it impossible to obtain 100% absolute ethanol from this mixture by simple fractional distillation?',
    options: [
      'At the azeotropic composition, the liquid and vapor phases have identical chemical compositions, boiling at a constant temperature.',
      'Ethanol decomposes completely into ethylene gas when heated near 351 K.',
      'Water molecules become heavier than ethanol molecules at high temperature.',
      'The distillation column becomes clogged with ethanol crystals.'
    ],
    correctIndex: 0,
    explanation: 'At an azeotropic point, mole fractions in liquid and vapor are equal ($x_i = y_i$). Heating yields vapor of identical proportion, preventing further enrichment by liquid-vapor phase separation.',
    hints: [
      'Recall definition of azeotropic mixture.',
      'Vapor phase composition equals liquid phase composition.',
      'Fractional distillation relies on differences in vapor vs liquid composition.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_321,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Biophysical Osmotic Analysis',
    question: 'When human red blood cells are suspended in a $0.1\text{ M } NaCl$ solution ($i \approx 1.9$), they swell and burst (hemolysis). When suspended in $0.3\text{ M } NaCl$, they shrink and shrivel (crenation). What is the isotonic molar concentration of NaCl for human erythrocytes?',
    options: ['0.15 M (~0.9% w/v)', '0.05 M (~0.3% w/v)', '0.50 M (~3.0% w/v)', '1.00 M (~6.0% w/v)'],
    correctIndex: 0,
    explanation: '0.15 M NaCl ($0.15 \times 58.5 \approx 8.8\text{ g/L} \approx 0.9\text{ \% w/v}$) produces an osmotic pressure equal to human blood plasma (~300 mOsm/L).',
    hints: [
      'Isotonic point lies between 0.1 M (hypotonic) and 0.3 M (hypertonic).',
      'Standard clinical IV saline is 0.9% w/v NaCl.',
      '0.9% w/v corresponds to ~0.15 M NaCl solution.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_267,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Comprehensive Master Synthesis',
    question: 'Comprehensive Synthesis: Calculate the osmotic pressure ($\Pi$) in atmospheres at 300 K of an aqueous solution prepared by dissolving 11.7 g of $NaCl$ ($M_r = 58.5\text{ g/mol}$) in water to make 2.0 L of solution, assuming complete dissociation ($i = 2.0$). ($R = 0.0821\text{ L atm mol}^{-1}\text{K}^{-1}$)',
    correctAnswer: 4.926,
    tolerance: 0.1,
    unit: 'atm',
    explanation: 'Moles NaCl = 11.7 / 58.5 = 0.20 mol. Concentration $C = 0.20 / 2.0 = 0.10\text{ M}$. $\Pi = i C R T = 2.0 \cdot 0.10 \cdot 0.0821 \cdot 300 = 4.926\text{ atm}$.',
    hints: [
      'Step 1: Find moles of NaCl = 11.7 / 58.5 = 0.20 mol.',
      'Step 2: Molarity C = 0.20 / 2.0 L = 0.10 M.',
      'Step 3: Osmotic pressure Π = i * C * R * T = 2.0 * 0.10 * 0.0821 * 300 = 4.926 atm.'
    ]
  }
];

// ==========================================
// CUSTOM TOPIC-SPECIFIC SVG DIAGRAM 1
// Solvation & Hydration Shell Diagram
// ==========================================
const SolvationMolecularDiagram: React.FC<{ soluteType: string; concentration: number }> = ({ soluteType, concentration }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center">
      <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
        Molecular Solvation Sphere & Lattice Breakdown
      </div>
      <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-950 rounded-lg shadow-inner">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
          </pattern>
          <radialGradient id="soluteGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1"/>
          </radialGradient>
        </defs>
        <rect width="500" height="240" fill="url(#grid)" />

        {/* Central Solute Ion/Molecule */}
        <circle cx="250" cy="120" r="28" fill="url(#soluteGlow)" stroke="#0ea5e9" strokeWidth="2.5" />
        <text x="250" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
          {soluteType === 'NaCl' ? 'Na⁺' : soluteType === 'Glucose' ? 'Gluc' : 'Ca²⁺'}
        </text>

        {/* Dynamic Water Dipoles surrounding central solute */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
          const rad = (angle * Math.PI) / 180;
          const dist = 65 + (concentration * 2);
          const cx = 250 + dist * Math.cos(rad);
          const cy = 120 + dist * Math.sin(rad);
          const oColor = '#ef4444'; // Oxygen red
          const hColor = '#f8fafc'; // Hydrogen white
          return (
            <g key={idx} transform={`translate(${cx}, ${cy}) rotate(${angle + 90})`}>
              {/* Water Oxygen */}
              <circle cx="0" cy="0" r="10" fill={oColor} stroke="#991b1b" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">O</text>
              {/* Hydrogen 1 */}
              <circle cx="-9" cy="-8" r="5" fill={hColor} stroke="#cbd5e1" strokeWidth="1" />
              {/* Hydrogen 2 */}
              <circle cx="9" cy="-8" r="5" fill={hColor} stroke="#cbd5e1" strokeWidth="1" />
              {/* Ion-Dipole Force Line */}
              <line x1="0" y1="0" x2="0" y2="25" stroke="#38bdf8" strokeDasharray="3,3" strokeWidth="1.5"/>
            </g>
          );
        })}

        {/* Solvation Labels */}
        <text x="15" y="25" fill="#38bdf8" fontSize="12" fontWeight="600">Ion-Dipole Attraction Network</text>
        <text x="15" y="45" fill="#94a3b8" fontSize="10">δ- Oxygen atoms orient toward positive cation</text>
        <text x="485" y="220" textAnchor="end" fill="#64748b" fontSize="10" fontFamily="monospace">
          Solvation Sphere Radius ~ {(0.24 + concentration * 0.05).toFixed(2)} nm
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// CUSTOM TOPIC-SPECIFIC SVG DIAGRAM 2
// Raoult's Law & Azeotrope Deviations Diagram
// ==========================================
const RaoultDiagram: React.FC<{ deviationType: 'ideal' | 'positive' | 'negative' }> = ({ deviationType }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center">
      <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
        Vapor Pressure Phase Diagram — {deviationType.toUpperCase()} DEVIATION
      </div>
      <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-950 rounded-lg shadow-inner">
        {/* Axes */}
        <line x1="60" y1="200" x2="440" y2="200" stroke="#64748b" strokeWidth="2" />
        <line x1="60" y1="40" x2="60" y2="200" stroke="#64748b" strokeWidth="2" />
        <line x1="440" y1="40" x2="440" y2="200" stroke="#64748b" strokeWidth="2" />

        {/* Axis Labels */}
        <text x="60" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11">x_A = 1, x_B = 0</text>
        <text x="440" y="220" textAnchor="middle" fill="#94a3b8" fontSize="11">x_A = 0, x_B = 1</text>
        <text x="250" y="232" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Mole Fraction (x)</text>

        {/* Pure vapor pressure points */}
        <circle cx="60" cy="80" r="4" fill="#38bdf8" />
        <text x="45" y="80" textAnchor="end" fill="#38bdf8" fontSize="10">p_A°</text>

        <circle cx="440" cy="60" r="4" fill="#a855f7" />
        <text x="455" y="60" fill="#a855f7" fontSize="10">p_B°</text>

        {/* Ideal Raoult Lines */}
        <line x1="60" y1="80" x2="440" y2="200" stroke="#38bdf8" strokeDasharray="4,4" strokeWidth="1.5" opacity="0.6" />
        <line x1="60" y1="200" x2="440" y2="60" stroke="#a855f7" strokeDasharray="4,4" strokeWidth="1.5" opacity="0.6" />
        <line x1="60" y1="80" x2="440" y2="60" stroke="#10b981" strokeDasharray="4,4" strokeWidth="1.5" opacity="0.6" />

        {/* Deviations Curves */}
        {deviationType === 'ideal' && (
          <line x1="60" y1="80" x2="440" y2="60" stroke="#10b981" strokeWidth="3" />
        )}

        {deviationType === 'positive' && (
          <g>
            {/* Total curve bowing UP */}
            <path d="M 60 80 Q 250 15 440 60" fill="none" stroke="#f59e0b" strokeWidth="3" />
            <path d="M 60 80 Q 250 100 440 200" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
            <path d="M 60 200 Q 250 80 440 60" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,2" />
            <text x="250" y="30" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
              Min. Boiling Azeotrope Peak (p_total &gt; p_ideal)
            </text>
          </g>
        )}

        {deviationType === 'negative' && (
          <g>
            {/* Total curve bowing DOWN */}
            <path d="M 60 80 Q 250 140 440 60" fill="none" stroke="#ef4444" strokeWidth="3" />
            <path d="M 60 80 Q 250 160 440 200" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
            <path d="M 60 200 Q 250 150 440 60" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,2" />
            <text x="250" y="155" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">
              Max. Boiling Azeotrope Trough (p_total &lt; p_ideal)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// CUSTOM TOPIC-SPECIFIC SVG DIAGRAM 3
// Osmosis & Reverse Osmosis Chamber Diagram
// ==========================================
const OsmosisDiagram: React.FC<{ isReverse: boolean; appliedPressure: number; osmoticPressure: number }> = ({
  isReverse,
  appliedPressure,
  osmoticPressure,
}) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center">
      <div className="text-xs font-mono text-purple-400 mb-2 uppercase tracking-wider">
        Semi-Permeable Membrane Chamber ({isReverse ? 'REVERSE OSMOSIS' : 'DIRECT OSMOSIS'})
      </div>
      <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-950 rounded-lg shadow-inner">
        {/* Chamber U-Tube / Dual Tank */}
        <rect x="60" y="40" width="180" height="150" fill="#0284c7" fillOpacity="0.2" stroke="#0284c7" strokeWidth="2" />
        <rect x="260" y="40" width="180" height="150" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2" />

        {/* Semi-Permeable Membrane SPM Divider */}
        <line x1="240" y1="30" x2="240" y2="200" stroke="#f59e0b" strokeWidth="6" strokeDasharray="6,4" />
        <text x="240" y="218" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
          Semi-Permeable Membrane (SPM)
        </text>

        {/* Left Side: Dilute / Pure Water */}
        <text x="150" y="60" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Pure Solvent (Water)</text>
        <text x="150" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">C_solute ≈ 0</text>

        {/* Right Side: Solution */}
        <text x="350" y="60" textAnchor="middle" fill="#d8b4fe" fontSize="12" fontWeight="bold">Concentrated Solution</text>
        <text x="350" y="80" textAnchor="middle" fill="#94a3b8" fontSize="10">Π = {osmoticPressure.toFixed(1)} atm</text>

        {/* Solute particles on right side */}
        {[
          {x: 280, y: 110}, {x: 320, y: 140}, {x: 370, y: 100}, {x: 410, y: 150},
          {x: 300, y: 170}, {x: 350, y: 120}, {x: 390, y: 170}, {x: 330, y: 90}
        ].map((p, idx) => (
          <circle key={idx} cx={p.x} cy={p.y} r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
        ))}

        {/* Piston on Right side */}
        <rect x="262" y={100 - appliedPressure * 1.5} width="176" height="12" fill="#64748b" stroke="#f8fafc" strokeWidth="1" />
        {/* Piston Handle */}
        <rect x="345" y={30 - appliedPressure * 1.5} width="10" height={70} fill="#64748b" />
        {/* Pressure Arrow */}
        <path d={`M 350 ${15 - appliedPressure * 1.5} L 350 ${35 - appliedPressure * 1.5}`} stroke="#ef4444" strokeWidth="4" markerEnd="url(#arrow)" />

        {/* Water Flow Arrows */}
        {isReverse ? (
          <g>
            {/* Flow Right to Left */}
            <line x1="280" y1="130" x2="200" y2="130" stroke="#10b981" strokeWidth="4" />
            <polygon points="195,130 205,124 205,136" fill="#10b981" />
            <text x="240" y="115" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
              Reverse Osmosis Flow (P &gt; Π)
            </text>
          </g>
        ) : (
          <g>
            {/* Flow Left to Right */}
            <line x1="200" y1="130" x2="280" y2="130" stroke="#38bdf8" strokeWidth="4" />
            <polygon points="285,130 275,124 275,136" fill="#38bdf8" />
            <text x="240" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
              Natural Osmosis Flow (P &lt; Π)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// CUSTOM TOPIC-SPECIFIC CANVAS 1
// Live Vapor Pressure Particle Kinetic Simulation
// ==========================================
const VaporPressureCanvas: React.FC<{ temperature: number; soluteMoleFraction: number }> = ({
  temperature,
  soluteMoleFraction,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;
    const liquidSurfaceY = 140;

    // Generate particles
    const numLiquid = Math.floor(120 * (1 - soluteMoleFraction * 0.5));
    const numVapor = Math.floor((temperature / 10) * (1 - soluteMoleFraction));

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      isSolute: boolean;
    }

    const particles: Particle[] = [];

    // Solvent liquid particles
    for (let i = 0; i < numLiquid; i++) {
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: liquidSurfaceY + Math.random() * (height - liquidSurfaceY - 10),
        vx: (Math.random() - 0.5) * (temperature / 50),
        vy: (Math.random() - 0.5) * (temperature / 50),
        isSolute: false,
      });
    }

    // Non-volatile Solute surface particles
    const numSolute = Math.floor(40 * soluteMoleFraction);
    for (let i = 0; i < numSolute; i++) {
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: liquidSurfaceY + Math.random() * 20,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        isSolute: true,
      });
    }

    // Vapor particles above liquid
    for (let i = 0; i < numVapor; i++) {
      particles.push({
        x: Math.random() * (width - 20) + 10,
        y: Math.random() * (liquidSurfaceY - 20) + 10,
        vx: (Math.random() - 0.5) * (temperature / 30),
        vy: (Math.random() - 0.5) * (temperature / 30),
        isSolute: false,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Gas phase background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, liquidSurfaceY);

      // Liquid phase background
      ctx.fillStyle = 'rgba(14, 165, 233, 0.25)';
      ctx.fillRect(0, liquidSurfaceY, width, height - liquidSurfaceY);

      // Surface Interface line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, liquidSurfaceY);
      ctx.lineTo(width, liquidSurfaceY);
      ctx.stroke();

      // Draw & update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x < 5 || p.x > width - 5) p.vx *= -1;

        if (p.isSolute) {
          // Solute stays in liquid
          if (p.y < liquidSurfaceY + 5) p.y = liquidSurfaceY + 5;
          if (p.y > height - 5) p.y = height - 5;
          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Solvent particle evaporation/condensation
          if (p.y > liquidSurfaceY) {
            // Liquid phase limits
            if (p.y > height - 5) p.vy *= -1;
            ctx.fillStyle = '#38bdf8';
          } else {
            // Vapor phase limits
            if (p.y < 5) p.vy *= -1;
            ctx.fillStyle = '#38bdf8';
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Overlay text stats
      ctx.fillStyle = '#f8fafc';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Vapor Molecules in Equilibrium: ${numVapor}`, 15, 25);
      ctx.fillText(`Surface Solute Blocking: ${(soluteMoleFraction * 100).toFixed(0)}%`, 15, 42);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [temperature, soluteMoleFraction]);

  return (
    <div className="w-full flex flex-col items-center">
      <canvas ref={canvasRef} width={480} height={220} className="rounded-lg shadow-lg border border-slate-700 bg-slate-950" />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export default function C12_ChemistrySolutionsCBSESim({
  onComplete,
  initialNodeId = NODE_304,
}: SimProps) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Node Selection State
  const [selectedNodeId, setSelectedNodeId] = useState<string>(initialNodeId);

  // BKT State Tracking per Node
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  // SRS Spaced Repetition Items
  const [reviewItems, setReviewItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Lab Explorer Interactive Parameters
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [soluteMass, setSoluteMass] = useState<number>(10); // grams
  const [solventVolume, setSolventVolume] = useState<number>(500); // mL
  const [temperature, setTemperature] = useState<number>(298); // Kelvin
  const [soluteType, setSoluteType] = useState<'Glucose' | 'NaCl' | 'CaCl2' | 'BaCl2' | 'BenzoicAcid'>('NaCl');
  const [raoultSystem, setRaoultSystem] = useState<'ideal' | 'positive' | 'negative'>('ideal');
  const [moleFractionA, setMoleFractionA] = useState<number>(0.5);
  const [appliedHydraulicPressure, setAppliedHydraulicPressure] = useState<number>(10); // atm

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);

  // Predictions State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionChecked, setPredictionChecked] = useState<Record<number, boolean>>({});

  // Observation State
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationChecked, setObservationChecked] = useState<Record<number, boolean>>({});

  // Challenge Runner State
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userMcqOption, setUserMcqOption] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);

  // Audio / Speech / Banner Feedbacks
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');

  // Auto-hint Timer Ref (10s inactivity)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIndex];

  // Helper Calculations
  const soluteMolarMass = useMemo(() => {
    switch (soluteType) {
      case 'Glucose': return 180.16;
      case 'NaCl': return 58.44;
      case 'CaCl2': return 110.98;
      case 'BaCl2': return 208.23;
      case 'BenzoicAcid': return 122.12;
    }
  }, [soluteType]);

  const vanTHoffFactor = useMemo(() => {
    switch (soluteType) {
      case 'Glucose': return 1.0;
      case 'NaCl': return 1.9;
      case 'CaCl2': return 2.7;
      case 'BaCl2': return 2.8;
      case 'BenzoicAcid': return 0.55; // dimerizes in organic solvent
    }
  }, [soluteType]);

  const computedMolarity = useMemo(() => {
    const moles = soluteMass / soluteMolarMass;
    const liters = solventVolume / 1000;
    return moles / liters;
  }, [soluteMass, soluteMolarMass, solventVolume]);

  const computedOsmoticPressure = useMemo(() => {
    // Π = i C R T
    return vanTHoffFactor * computedMolarity * 0.0821 * temperature;
  }, [vanTHoffFactor, computedMolarity, temperature]);

  const computedBoilingElevation = useMemo(() => {
    // ΔTb = i * Kb * m (approx m = M for dilute aqueous)
    return vanTHoffFactor * 0.52 * computedMolarity;
  }, [vanTHoffFactor, computedMolarity]);

  const computedFreezingDepression = useMemo(() => {
    // ΔTf = i * Kf * m
    return vanTHoffFactor * 1.86 * computedMolarity;
  }, [vanTHoffFactor, computedMolarity]);

  // Welcome speech on mount
  useEffect(() => {
    speechManager.speak('Welcome to the High Precision Chemical Thermodynamics and Solutions Virtual Laboratory!');
  }, []);

  // Auto-hint Timer Reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);

    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && currentChallenge) {
        const firstHint = currentChallenge.hints[0];
        setCurrentHint(`Need assistance? Hint: ${firstHint}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000); // 10s inactivity auto-hint
  }, [activeTab, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, challengeIndex, activeTab]);

  // Handle Discovery Selection
  const handleSelectDiscovery = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoveryAnswered(true);
    audioManager.play(idx === DISCOVERY_QUESTION.correctIndex ? 'drop-correct' : 'drop-wrong');
    speechManager.speak(idx === DISCOVERY_QUESTION.correctIndex ? 'Correct interpretation!' : 'Notice the van t Hoff factor effect!');
  };

  // Prediction verification
  const handleVerifyPrediction = (pIdx: number, optionIdx: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [pIdx]: optionIdx }));
    setPredictionChecked((prev) => ({ ...prev, [pIdx]: true }));
    const isCorrect = optionIdx === PREDICTION_QUESTIONS[pIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'error');
  };

  // Observation answer check
  const handleVerifyObservation = (oIdx: number, optionIdx: number) => {
    setObservationAnswers((prev) => ({ ...prev, [oIdx]: optionIdx }));
    setObservationChecked((prev) => ({ ...prev, [oIdx]: true }));
    const isCorrect = optionIdx === OBSERVATION_QUESTIONS[oIdx].correctIndex;
    audioManager.play(isCorrect ? 'chime' : 'error');
    if (isCorrect) {
      speechManager.speak('Observe how solute particles reduce the vapour pressure of the solvent.');
    }
  };

  // Challenge Submission Logic
  const handleChallengeSubmit = () => {
    if (!currentChallenge) return;

    let isCorrect = false;
    if (currentChallenge.type === 'multiple-choice') {
      isCorrect = userMcqOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0.05;
        isCorrect = Math.abs(val - currentChallenge.correctAnswer) <= tol;
      }
    }

    // Audio & Visual Effects
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1200);
      setScore((prev) => prev + 10);
      setChallengeFeedback({ isCorrect: true, message: 'Excellent! Your calculation is spot-on.' });

      // Node Mastery & SRS Updates
      const cNode = currentChallenge.nodeId;
      setBktStates((prev) => ({
        ...prev,
        [cNode]: bktUpdate(prev[cNode] || createBKTState(cNode), true),
      }));
      setReviewItems((prev) => ({
        ...prev,
        [cNode]: sm2Update(prev[cNode] || createReviewItem(cNode), 5),
      }));
      recordGameScore(cNode, 100);

      speechManager.speak("Correct! Outstanding grasp of Raoult's Law and colligative properties.");
    } else {
      audioManager.play('drop-wrong');
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. Formula: ${currentChallenge.explanation}`,
      });

      const cNode = currentChallenge.nodeId;
      setBktStates((prev) => ({
        ...prev,
        [cNode]: bktUpdate(prev[cNode] || createBKTState(cNode), false),
      }));
      setReviewItems((prev) => ({
        ...prev,
        [cNode]: sm2Update(prev[cNode] || createReviewItem(cNode), 1),
      }));
      recordGameScore(cNode, 20);
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setUserMcqOption(null);
    setUserNumericInput('');
    setChallengeFeedback(null);

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak("Challenge complete! Excellent application of the van 't Hoff factor.");
      if (onComplete) onComplete(score + 10);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans p-2 sm:p-6 select-none">
      {/* GLOBAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Achieved! All Solution Labs Complete." />
      <SparkleBurst show={showSparkle} x={400} y={250} />
      <HintBubble show={showHint} text={currentHint} />

      {/* TOP NAVBAR HEADER */}
      <header className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-6 backdrop-blur flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-2xl shadow-lg shadow-cyan-500/20">
            🧪
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              ISC Chemistry Solutions Lab
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Thermodynamics, Colligative Properties & Non-Ideal Azeotropes
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          {[
            { id: 'discovery', label: '1. Discovery & Theory', icon: '💡' },
            { id: 'lab', label: '2. Interactive Lab', icon: '⚗️' },
            { id: 'challenges', label: '3. Mastery Challenges', icon: '🎯' },
            { id: 'summary', label: '4. Real-World & Review', icon: '🌐' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* SCORE DISPLAY */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-mono">LAB MASTERY</div>
            <div className="text-lg font-bold text-cyan-400">{score} PTS</div>
          </div>
        </div>
      </header>

      {/* MAIN TAB CONTENT AREA */}
      <main className="w-full flex-grow flex flex-col gap-6">
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            {/* Scenario Narrative Box */}
            <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 text-sm text-slate-400">
                <span className="text-cyan-400 font-semibold">Lab Context: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Preconception Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-mono font-bold">
                  DISCOVERY PUZZLE
                </span>
                <span className="text-xs text-slate-400 font-mono">Node ID: {NODE_332}</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDiscovery(idx)}
                    className={`p-4 rounded-xl text-left border transition-all text-sm flex items-start gap-3 ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-sm text-cyan-200 animate-fadeIn">
                  <span className="font-bold">Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Diagnostic Predictions
              </h3>
              <div className="flex flex-col gap-6">
                {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                    <div className="text-xs font-mono text-slate-500 mb-2">Prediction #{pIdx + 1} • Node: {pq.nodeId}</div>
                    <p className="text-sm font-semibold text-slate-200 mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleVerifyPrediction(pIdx, oIdx)}
                          className={`p-3 text-xs rounded-lg text-left border transition-all ${
                            predictionAnswers[pIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/50 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {predictionChecked[pIdx] && (
                      <div className="text-xs text-slate-400 font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        🔍 <span className="text-cyan-400">Verification Instruction:</span> {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LAB SIMULATORS */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
            {/* LAB NAVIGATION SIDEBAR */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3">
                  Select Interactive Lab Module
                </h3>
                <div className="flex flex-col gap-2">
                  {EXPLORATION_STEPS.map((step, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('pop');
                        setCurrentStepIndex(idx);
                        setSelectedNodeId(step.nodeId);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                        currentStepIndex === idx
                          ? 'bg-gradient-to-r from-cyan-950 to-slate-900 border-cyan-500 text-cyan-100 shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold font-mono">{step.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2">{step.instruction}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Solute Identity Selector Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                <h4 className="text-xs font-mono text-slate-400 uppercase">Solute Entity Settings</h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'NaCl (i=1.9)', value: 'NaCl' },
                    { label: 'Glucose (i=1.0)', value: 'Glucose' },
                    { label: 'CaCl₂ (i=2.7)', value: 'CaCl2' },
                    { label: 'Benzoic Acid (i=0.55)', value: 'BenzoicAcid' },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => {
                        audioManager.play('tap');
                        setSoluteType(s.value as typeof soluteType);
                      }}
                      className={`py-2 px-2 text-xs rounded-lg border font-semibold ${
                        soluteType === s.value
                          ? 'bg-cyan-600 border-cyan-400 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                {/* Range Sliders */}
                <div className="flex flex-col gap-3 mt-2">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Solute Mass (w₂):</span>
                      <span className="text-cyan-400 font-bold">{soluteMass} g</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={soluteMass}
                      onChange={(e) => setSoluteMass(Number(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Solvent Volume (V):</span>
                      <span className="text-cyan-400 font-bold">{solventVolume} mL</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="2000"
                      step="50"
                      value={solventVolume}
                      onChange={(e) => setSolventVolume(Number(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">Temperature (T):</span>
                      <span className="text-cyan-400 font-bold">{temperature} K ({(temperature - 273.15).toFixed(0)}°C)</span>
                    </div>
                    <input
                      type="range"
                      min="273"
                      max="373"
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* LAB DISPLAY & SIMULATOR VIEWPORT */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* LAB STEP 1: CONCENTRATION & SOLVATION DYNAMICS */}
              {currentStepIndex === 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-cyan-400">Lab 1: Concentration & Solvation Sphere Visualizer</h3>
                  <SolvationMolecularDiagram soluteType={soluteType} concentration={computedMolarity} />

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 font-mono">MOLARITY (M)</div>
                      <div className="text-lg font-bold text-cyan-400">{computedMolarity.toFixed(3)} M</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 font-mono">MOLAL MASS ($M_r$)</div>
                      <div className="text-lg font-bold text-sky-400">{soluteMolarMass.toFixed(1)} g/mol</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 font-mono">VAN 'T HOFF ($i$)</div>
                      <div className="text-lg font-bold text-purple-400">{vanTHoffFactor.toFixed(2)}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] text-slate-500 font-mono">EFFECTIVE CONC ($i \cdot C$)</div>
                      <div className="text-lg font-bold text-emerald-400">{(computedMolarity * vanTHoffFactor).toFixed(3)} M</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB STEP 2: VAPOR PRESSURE & RAOULT'S DEVIATIONS */}
              {currentStepIndex === 1 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-cyan-400">Lab 2: Vapor Pressure & Raoult Non-Ideality</h3>
                    <div className="flex gap-2">
                      {(['ideal', 'positive', 'negative'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => {
                            audioManager.play('tap');
                            setRaoultSystem(mode);
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                            raoultSystem === mode
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-950 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <RaoultDiagram deviationType={raoultSystem} />
                  <VaporPressureCanvas temperature={temperature - 200} soluteMoleFraction={moleFractionA} />

                  <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                    <span className="text-slate-400 font-mono">Solute Mole Fraction ($x_A$):</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={moleFractionA}
                      onChange={(e) => setMoleFractionA(Number(e.target.value))}
                      className="w-full accent-cyan-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                    />
                    <span className="font-bold text-cyan-400">{moleFractionA.toFixed(2)}</span>
                  </div>
                </div>
              )}

              {/* LAB STEP 3: COLLIGATIVE EBULLIOSCOPY & CRYOSCOPY */}
              {currentStepIndex === 2 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-cyan-400">Lab 3: Phase Transitions ($\Delta T_b$ & $\Delta T_f$)</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <div className="text-xs text-amber-400 font-mono uppercase mb-2">Boiling Point Elevation ($\Delta T_b$)</div>
                      <div className="text-3xl font-bold text-amber-300 mb-1">
                        +{(computedBoilingElevation).toFixed(3)} °C
                      </div>
                      <div className="text-xs text-slate-400">
                        New Boiling Point: <span className="text-white font-mono font-bold">{(100 + computedBoilingElevation).toFixed(3)} °C</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2 font-mono">$\Delta T_b = i \cdot K_b \cdot m$</div>
                    </div>

                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <div className="text-xs text-sky-400 font-mono uppercase mb-2">Freezing Point Depression ($\Delta T_f$)</div>
                      <div className="text-3xl font-bold text-sky-300 mb-1">
                        -{(computedFreezingDepression).toFixed(3)} °C
                      </div>
                      <div className="text-xs text-slate-400">
                        New Freezing Point: <span className="text-white font-mono font-bold">{(-computedFreezingDepression).toFixed(3)} °C</span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-2 font-mono">$\Delta T_f = i \cdot K_f \cdot m$</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB STEP 4: OSMOSIS & REVERSE OSMOSIS */}
              {currentStepIndex === 3 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-cyan-400">Lab 4: Osmotic Pressure Chamber</h3>
                  <OsmosisDiagram
                    isReverse={appliedHydraulicPressure > computedOsmoticPressure}
                    appliedPressure={appliedHydraulicPressure}
                    osmoticPressure={computedOsmoticPressure}
                  />

                  <div className="flex flex-col gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Applied External Pressure ($P_{ext}$):</span>
                      <span className="text-purple-400 font-bold">{appliedHydraulicPressure} atm</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={appliedHydraulicPressure}
                      onChange={(e) => setAppliedHydraulicPressure(Number(e.target.value))}
                      className="w-full accent-purple-500 bg-slate-900 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="text-xs text-slate-400 flex justify-between mt-1 font-mono">
                      <span>Calculated Osmotic Pressure ($\Pi$): <strong className="text-cyan-400">{computedOsmoticPressure.toFixed(2)} atm</strong></span>
                      <span className={appliedHydraulicPressure > computedOsmoticPressure ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                        {appliedHydraulicPressure > computedOsmoticPressure ? 'REVERSE OSMOSIS ACTIVE' : 'DIRECT OSMOSIS ACTIVE'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB STEP 5: VAN 'T HOFF FACTOR ($i$) CALCULATOR */}
              {currentStepIndex === 4 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-cyan-400">Lab 5: van 't Hoff Electrolyte & Dimer Dynamics</h3>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 text-slate-300">
                    <div>Selected Compound: <span className="text-cyan-400 font-bold">{soluteType}</span></div>
                    <div>van 't Hoff factor ($i$): <span className="text-emerald-400 font-bold">{vanTHoffFactor}</span></div>
                    {soluteType === 'BenzoicAcid' ? (
                      <div className="text-amber-300">
                        Notice: $i &lt; 1.0$ due to hydrogen-bonded dimerization in non-polar organic solvents ($2 C_6H_5COOH \rightleftharpoons (C_6H_5COOH)_2$).
                      </div>
                    ) : soluteType === 'Glucose' ? (
                      <div className="text-sky-300">Notice: $i = 1.0$ because glucose is a non-electrolyte and does not dissociate.</div>
                    ) : (
                      <div className="text-purple-300">Notice: $i &gt; 1.0$ due to ionic dissociation into individual cations and anions.</div>
                    )}
                  </div>
                </div>
              )}

              {/* OBSERVATION QUESTIONS SECTION */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                  <span>👀</span> Observation Checkpoints
                </h3>
                <div className="flex flex-col gap-6">
                  {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                    <div key={oIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                      <div className="text-xs font-mono text-slate-500 mb-2">Observation #{oIdx + 1} • Node: {oq.nodeId}</div>
                      <p className="text-sm font-semibold text-slate-200 mb-3">{oq.question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {oq.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleVerifyObservation(oIdx, optIdx)}
                            className={`p-3 text-xs rounded-lg text-left border transition-all ${
                              observationAnswers[oIdx] === optIdx
                                ? optIdx === oq.correctIndex
                                  ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-900/50 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
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
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: MASTERY CHALLENGES */}
        {/* ========================================== */}
        {activeTab === 'challenges' && currentChallenge && (
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
            {/* Progress Bar Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">CHALLENGE {challengeIndex + 1} OF {CHALLENGES.length}</span>
                <span className="text-cyan-400 uppercase font-bold">
                  {currentChallenge.difficulty} • {currentChallenge.competencyLevel}
                </span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                  style={{ width: `${((challengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-2">Node ID: {currentChallenge.nodeId}</div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100">{currentChallenge.question}</h3>
              </div>

              {/* MCQ Options */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setUserMcqOption(idx);
                      }}
                      className={`p-4 rounded-xl text-left border transition-all text-sm flex items-start gap-3 ${
                        userMcqOption === idx
                          ? 'bg-cyan-950/70 border-cyan-500 text-cyan-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {currentChallenge.type === 'numeric' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical answer..."
                      value={userNumericInput}
                      onChange={(e) => setUserNumericInput(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-white px-4 py-3 rounded-xl font-mono text-base focus:outline-none focus:border-cyan-500 w-full sm:w-64"
                    />
                    <span className="text-sm font-mono text-slate-400">{currentChallenge.unit || ''}</span>
                  </div>
                </div>
              )}

              {/* Feedback Alert Box */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium border animate-fadeIn ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}
                >
                  {challengeFeedback.message}
                </div>
              )}

              {/* Controls Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setCurrentHint(currentChallenge.hints[0]);
                    setShowHint(true);
                  }}
                  className="px-4 py-2 text-xs font-mono text-amber-400 bg-amber-950/30 border border-amber-500/30 rounded-lg hover:bg-amber-900/40"
                >
                  💡 Request Hint
                </button>

                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={userMcqOption === null && !userNumericInput}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl text-sm shadow-lg hover:opacity-90 disabled:opacity-40"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-sm shadow-lg hover:opacity-90"
                  >
                    {challengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish Lab'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: REAL-WORLD ACTIVITY & SUMMARY */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-6">
            {/* REAL WORLD ACTIVITY SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-mono font-bold">
                  REAL-WORLD INDUSTRIAL CASE STUDY
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="text-cyan-400 font-bold block mb-1">Step {idx + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS ARRAY DISPLAY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Common ISC Chemistry Misconceptions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <div className="text-xs font-bold text-rose-400 font-mono">{m.title}</div>
                    <p className="text-xs text-slate-400">{m.description}</p>
                    <div className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/20 mt-1">
                      <strong className="text-emerald-400">Correction: </strong>
                      {m.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC RECAP ARRAY */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <span>📝</span> Diagnostic Question Bank Review
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-1 text-xs">
                    <div className="text-slate-200 font-semibold">{dq.question}</div>
                    <div className="text-cyan-400 font-mono">
                      Answer: {dq.options[dq.correctIndex]}
                    </div>
                    <div className="text-slate-400 text-[11px] mt-1">{dq.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}