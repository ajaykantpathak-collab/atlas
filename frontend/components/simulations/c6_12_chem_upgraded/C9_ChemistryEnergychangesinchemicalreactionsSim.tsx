'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node constants
const NODE_C9_CHEM_011 = 'c9_chem_011';
const NODE_C9_CHEM_012 = 'c9_chem_012';
const NODE_C9_CHEM_013 = 'c9_chem_013';
const NODE_C9_CHEM_014 = 'c9_chem_014';
const NODE_C9_CHEM_015 = 'c9_chem_015';
const NODE_C9_CHEM_016 = 'c9_chem_016';
const NODE_C9_CHEM_017 = 'c9_chem_017';
const NODE_C9_CHEM_018 = 'c9_chem_018';
const NODE_C9_CHEM_019 = 'c9_chem_019';
const NODE_C9_CHEM_020 = 'c9_chem_020';

const ALL_NODE_IDS = [
  NODE_C9_CHEM_011,
  NODE_C9_CHEM_012,
  NODE_C9_CHEM_013,
  NODE_C9_CHEM_014,
  NODE_C9_CHEM_015,
  NODE_C9_CHEM_016,
  NODE_C9_CHEM_017,
  NODE_C9_CHEM_018,
  NODE_C9_CHEM_019,
  NODE_C9_CHEM_020,
];

// MANDATORY SECTION 1: SCENARIO
const SCENARIO = {
  title: 'Thermochemistry & Energetics Virtual Laboratory',
  intro: 'Welcome to the Thermochemistry Research Lab! You are analyzing energy transformations, bond enthalpies, activation barriers, and reaction dynamics in various chemical systems.',
  context: 'Measure heat flow in cup calorimeters, analyze potential energy curves, calculate net bond energies, explore light-driven and electrical reactions, and test catalyst efficiency.',
};

// MANDATORY SECTION 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'When solid ammonium nitrate dissolves in room-temperature water in a beaker, the solution gets freezing cold! Does this chemical process absorb or release energy, and what happens to the internal chemical potential energy of the system?',
  options: [
    'It releases heat because coldness is being emitted into the surroundings.',
    'It absorbs thermal energy from surroundings; chemical potential energy of system increases (Endothermic, ΔH > 0).',
    'Energy is destroyed during endothermic dissolution.',
    'It is exothermic because bonds are breaking rapidly.',
  ],
  correctIndex: 1,
  hintAfter: 'Heat absorbed from surrounding water molecules drops the fluid temperature. That absorbed heat is stored as potential energy in separated ions, so ΔH is positive!',
};

// MANDATORY SECTION 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Calorimetric Heat Measurement (ΔH Calculation)',
    instruction: 'Select a reaction pair, adjust reactant mass and liquid volume, trigger the reaction, and compute heat absorbed/released: Q = m·c·ΔT.',
    interactionType: 'calorimeter-simulation',
    nodeId: NODE_C9_CHEM_017,
  },
  {
    title: 'Lab 2: Potential Energy Profiles & Activation Energy',
    instruction: 'Adjust activation energy (Ea) and reaction enthalpy (ΔH). Toggle a catalyst to observe how lowering Ea speeds up the reaction pathway without changing ΔH.',
    interactionType: 'energy-profile-editor',
    nodeId: NODE_C9_CHEM_013,
  },
  {
    title: 'Lab 3: Molecular Bond Energy Accounting',
    instruction: 'Break bonds in reactants by supplying bond energy (endothermic) and form new bonds in products (exothermic) to calculate net ΔH = Σ(Bonds Broken) - Σ(Bonds Formed).',
    interactionType: 'bond-energy-calculator',
    nodeId: NODE_C9_CHEM_014,
  },
  {
    title: 'Lab 4: Photochemical Decomposition & Photon Energy',
    instruction: 'Expose Silver Halides (AgCl / AgBr) to light of varying wavelengths and intensity. Observe photolysis into elemental silver and halogen gas.',
    interactionType: 'photochemical-lab',
    nodeId: NODE_C9_CHEM_015,
  },
  {
    title: 'Lab 5: Electrochemical Energy Conversions',
    instruction: 'Switch between electrical energy driven decomposition (Electrolysis) and chemical energy generating electricity (Galvanic Cell).',
    interactionType: 'electrochemical-lab',
    nodeId: NODE_C9_CHEM_016,
  },
];

// MANDATORY SECTION 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the mass of methane fuel burned in excess oxygen inside a bomb calorimeter, what happens to the temperature rise of the surrounding water jacket?',
    options: [
      'The temperature rise doubles because enthalpy change is directly proportional to moles reacted.',
      'The temperature rise stays the same because ΔH per mole is constant.',
      'The temperature rise quadruples due to non-linear kinetic explosion.',
      'The temperature drops because combustion absorbs heat at higher mass.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Use Lab 1 (Calorimeter) to double the fuel mass from 1.0 g to 2.0 g and observe the resulting ΔT.',
    nodeId: NODE_C9_CHEM_011,
  },
  {
    question: 'Predict: What effect does adding a platinum catalyst have on the net enthalpy change (ΔH) of hydrogen peroxide decomposition?',
    options: [
      'ΔH becomes twice as negative because the reaction occurs faster.',
      'ΔH becomes positive because catalysts absorb heat.',
      'ΔH remains exactly unchanged because catalyst lowers activation energy (Ea) but does not alter initial and final energy states.',
      'ΔH drops to zero because energy is conserved.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Use Lab 2 (Energy Profile Editor), toggle the Catalyst option, and observe ΔH versus Ea.',
    nodeId: NODE_C9_CHEM_019,
  },
];

// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Bond Energy Calculator, when breaking 1 mole of H-H bonds (436 kJ/mol) and 1 mole of Cl-Cl bonds (243 kJ/mol) and forming 2 moles of H-Cl bonds (432 kJ/mol each), what is the overall energy outcome?',
    observableOptions: [
      'Absorbed 679 kJ, Released 864 kJ -> Net ΔH = -185 kJ (Exothermic)',
      'Absorbed 864 kJ, Released 679 kJ -> Net ΔH = +185 kJ (Endothermic)',
      'Absorbed 436 kJ, Released 432 kJ -> Net ΔH = +4 kJ',
      'Net ΔH = 0 kJ because total number of bonds is conserved',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_CHEM_014,
  },
  {
    question: 'Observation: When dark-stored silver bromide (AgBr) paper is exposed to high-intensity ultraviolet light in Lab 4, what visual change occurs?',
    observableOptions: [
      'The pale yellow paper turns greyish-black as elemental silver precipitates due to photo-decomposition.',
      'The paper glows bright green due to fluorescence without chemical change.',
      'The paper dissolves completely into gas.',
      'The paper turns bright blue from absorbing light energy.',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_CHEM_015,
  },
];

// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Fuel Calorimetry & Emergency Cold-Pack Design',
  description: 'Apply thermochemical calculations to design a instant medical cold pack for sports injuries and evaluate the heat output of bio-ethanol fuel.',
  steps: [
    'Step 1: Calculate the enthalpy of solution for Ammonium Nitrate (NH4NO3): Dissolving 16.0 g (0.2 mol) in 100 g water drops temperature by 12.0 °C.',
    'Step 2: Compute heat absorbed Q = m · c · ΔT = 100 g × 4.18 J/g°C × 12.0 °C = 5016 J = 5.016 kJ.',
    'Step 3: Molar enthalpy of solution ΔH = +5.016 kJ / 0.2 mol = +25.08 kJ/mol (Endothermic).',
    'Step 4: Design Cold Pack: Determine that 40 g of NH4NO3 in 150 mL water drops liquid temperature from 25°C down to 1°C safely!',
  ],
};

// MISCONCEPTIONS
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    statement: 'Exothermic reactions break bonds to release energy.',
    correction: 'Bond breaking ALWAYS requires/absorbs energy (endothermic). Energy is released when NEW bonds form (exothermic). A reaction is exothermic because more energy is released forming product bonds than was absorbed breaking reactant bonds.',
    nodeId: NODE_C9_CHEM_014,
  },
  {
    id: 'misc_02',
    statement: 'A cold reaction mixture means energy was destroyed.',
    correction: 'A drop in temperature means thermal energy was absorbed from the surroundings into chemical potential energy of the products (Endothermic, ΔH > 0). Total energy is strictly conserved.',
    nodeId: NODE_C9_CHEM_012,
  },
  {
    id: 'misc_03',
    statement: 'Catalysts lower the ΔH (enthalpy change) of a chemical reaction.',
    correction: 'Catalysts lower the activation energy (Ea) by providing an alternative mechanism, but they do NOT change initial reactant enthalpy or final product enthalpy; hence ΔH remains unchanged.',
    nodeId: NODE_C9_CHEM_019,
  },
  {
    id: 'misc_04',
    statement: 'Respiration and combustion are identical energetic processes.',
    correction: 'While both produce CO2 and H2O and release energy from organic fuel, respiration is a multi-step enzyme-controlled process at 37°C capturing energy in ATP without flame, whereas combustion is rapid high-temperature thermal oxidation.',
    nodeId: NODE_C9_CHEM_018,
  },
  {
    id: 'misc_05',
    statement: 'Activation energy is only required for endothermic reactions.',
    correction: 'ALL chemical reactions (exothermic and endothermic) require activation energy to stretch and weaken existing chemical bonds before new bonds can form.',
    nodeId: NODE_C9_CHEM_013,
  },
  {
    id: 'misc_06',
    statement: 'Photochemical reactions depend on ambient heat rather than light frequency.',
    correction: 'Photochemical reactions (like photosynthesis or AgBr breakdown) are initiated by photons of specific frequency/energy (E = hf), independent of thermal temperature.',
    nodeId: NODE_C9_CHEM_015,
  },
];

// DIAGNOSTIC QUESTIONS
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'What is the sign of ΔH for an exothermic reaction, and how does surrounding temperature change?',
    options: [
      'ΔH is negative (-), surrounding temperature increases.',
      'ΔH is positive (+), surrounding temperature increases.',
      'ΔH is negative (-), surrounding temperature decreases.',
      'ΔH is zero, surrounding temperature stays constant.',
    ],
    correctIndex: 0,
    explanation: 'Exothermic reactions release heat energy to surroundings (ΔH < 0), causing surrounding temperature to rise.',
    nodeId: NODE_C9_CHEM_011,
  },
  {
    id: 'diag_2',
    question: 'During bond breaking in a chemical reaction, what is the energy change?',
    options: [
      'Energy is absorbed (endothermic process).',
      'Energy is released (exothermic process).',
      'No energy change occurs during bond breaking.',
      'Energy is created out of nothing.',
    ],
    correctIndex: 0,
    explanation: 'Breaking chemical bonds always requires energy input to overcome atomic electrostatic attraction.',
    nodeId: NODE_C9_CHEM_014,
  },
  {
    id: 'diag_3',
    question: 'On an energy profile diagram, what represents Activation Energy (Ea)?',
    options: [
      'The energy difference between reactants and the peak transition state.',
      'The energy difference between reactants and products (ΔH).',
      'The energy of the products only.',
      'The total thermal energy contained in surroundings.',
    ],
    correctIndex: 0,
    explanation: 'Ea is the minimum energy hill that reactants must overcome to reach the transition state complex.',
    nodeId: NODE_C9_CHEM_013,
  },
  {
    id: 'diag_4',
    question: 'Calculate ΔH for: H2 + Cl2 -> 2 HCl given Bond Energies: H-H = 436 kJ/mol, Cl-Cl = 243 kJ/mol, H-Cl = 432 kJ/mol.',
    options: [
      '-185 kJ/mol',
      '+185 kJ/mol',
      '-247 kJ/mol',
      '+247 kJ/mol',
    ],
    correctIndex: 0,
    explanation: 'ΔH = Energy absorbed in breaking - Energy released in forming = (436 + 243) - (2 × 432) = 679 - 864 = -185 kJ/mol.',
    nodeId: NODE_C9_CHEM_014,
  },
  {
    id: 'diag_5',
    question: 'Which of the following is a classic example of a photochemical reaction in nature?',
    options: [
      'Photosynthesis in green plants',
      'Neutralization of HCl with NaOH',
      'Combustion of methane in a lab burner',
      'Rusting of iron in moist air',
    ],
    correctIndex: 0,
    explanation: 'Photosynthesis uses photon energy absorbed by chlorophyll to drive endothermic glucose synthesis.',
    nodeId: NODE_C9_CHEM_015,
  },
  {
    id: 'diag_6',
    question: 'What energy transformation takes place during the electrolysis of molten sodium chloride?',
    options: [
      'Electrical energy is converted into chemical energy.',
      'Chemical energy is converted into electrical energy.',
      'Nuclear energy is converted into thermal energy.',
      'Light energy is converted into kinetic energy.',
    ],
    correctIndex: 0,
    explanation: 'Electrolysis uses external electrical work to force non-spontaneous endothermic chemical breakdown.',
    nodeId: NODE_C9_CHEM_016,
  },
  {
    id: 'diag_7',
    question: 'If 200 g of water absorbs 8.36 kJ of heat, what is the temperature rise ΔT? (Specific heat capacity of water c = 4.18 J/g°C)',
    options: [
      '10 °C',
      '20 °C',
      '5 °C',
      '2 °C',
    ],
    correctIndex: 0,
    explanation: 'Q = m·c·ΔT => 8360 J = 200 g × 4.18 J/g°C × ΔT => ΔT = 8360 / 836 = 10 °C.',
    nodeId: NODE_C9_CHEM_017,
  },
  {
    id: 'diag_8',
    question: 'How does a catalyst increase the rate of a chemical reaction without being consumed?',
    options: [
      'By providing an alternative reaction pathway with lower activation energy (Ea).',
      'By increasing the net enthalpy change (ΔH) of the reaction.',
      'By raising the overall temperature of the solution.',
      'By eliminating the need for molecular collisions.',
    ],
    correctIndex: 0,
    explanation: 'A catalyst lowers the activation energy hill, allowing a greater fraction of colliding molecules to react.',
    nodeId: NODE_C9_CHEM_019,
  },
];

// TYPES & INTERFACES
interface ChallengeItem {
  id: string;
  text: string;
  category?: string;
}

interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  items?: ChallengeItem[];
  categories?: string[];
  correctMapping?: Record<string, string>;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// 22 PROGRESSIVE CHALLENGES ACROSS 3 TIERS
const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'c1',
    nodeId: NODE_C9_CHEM_011,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following chemical or physical processes is EXOTHERMIC (releases heat energy to surroundings)?',
    options: [
      'Dissolving Ammonium Nitrate in water',
      'Combustion of Methane gas (CH4 + 2O2 -> CO2 + 2H2O)',
      'Photosynthesis in plant leaves',
      'Thermal decomposition of Calcium Carbonate (CaCO3)',
    ],
    correctIndex: 1,
    explanation: 'Combustion releases large amounts of thermal energy to surroundings (ΔH < 0).',
    hints: [
      'Think about which process gets hot or produces fire.',
      'Exothermic reactions emit thermal energy.',
      'Methane burning in a kitchen stove releases heat.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c2',
    nodeId: NODE_C9_CHEM_012,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'When solid Potassium Nitrate is added to water, the temperature drops from 24°C to 18°C. What type of reaction is this?',
    options: [
      'Exothermic reaction',
      'Endothermic reaction',
      'Photochemical reaction',
      'Electrochemical reaction',
    ],
    correctIndex: 1,
    explanation: 'A temperature drop in surrounding water indicates heat absorption into chemical energy (Endothermic, ΔH > 0).',
    hints: [
      'Does the solution absorb heat from the surroundings?',
      'If surrounding temp decreases, heat went into the system.',
      'Endo = inner/absorbing, Thermic = heat.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'c3',
    nodeId: NODE_C9_CHEM_013,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What does the Activation Energy (Ea) of a chemical reaction represent?',
    options: [
      'The net heat released when products form.',
      'The minimum energy barrier reactants must overcome for reaction to occur.',
      'The kinetic energy of solvent molecules at absolute zero.',
      'The energy difference between products and surroundings.',
    ],
    correctIndex: 1,
    explanation: 'Activation energy is the minimum kinetic energy reactant molecules must possess to break initial bonds during collision.',
    hints: [
      'It is the height of the energy hill from reactants to transition state.',
      'Reactants must reach the peak of the barrier to react.',
      'Even exothermic reactions require an initial ignition boost (Ea).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'c4',
    nodeId: NODE_C9_CHEM_014,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Is breaking chemical bonds an endothermic or exothermic process?',
    options: [
      'Always Endothermic (energy is absorbed to break bonds)',
      'Always Exothermic (energy is released when bonds break)',
      'Neither endothermic nor exothermic',
      'Exothermic for single bonds, endothermic for double bonds',
    ],
    correctIndex: 0,
    explanation: 'Breaking bonds ALWAYS requires energy input to overcome electromagnetic attraction between atoms.',
    hints: [
      'To snap a stick or break an attraction, you must supply energy.',
      'Bond breaking = Energy IN (Endothermic).',
      'Bond forming = Energy OUT (Exothermic).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'c5',
    nodeId: NODE_C9_CHEM_015,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is silver bromide (AgBr) stored in dark brown or opaque bottles in chemistry laboratories?',
    options: [
      'To prevent reaction with oxygen in air.',
      'To prevent photo-decomposition caused by photon absorption.',
      'To prevent evaporation of the salt.',
      'To absorb excess heat from room air.',
    ],
    correctIndex: 1,
    explanation: 'AgBr undergoes photochemical decomposition into silver metal and bromine when exposed to light photons.',
    hints: [
      'AgBr is light sensitive (used in black-and-white photography).',
      'Photons drive the reaction: 2AgBr --(light)--> 2Ag + Br2.',
      'Dark bottles block incoming light photons.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'c6',
    nodeId: NODE_C9_CHEM_016,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What fundamental energy transformation occurs during the electrolysis of water into H2 and O2 gases?',
    options: [
      'Chemical energy is converted into electrical energy.',
      'Electrical energy is converted into chemical energy.',
      'Light energy is converted into thermal energy.',
      'Thermal energy is converted into nuclear energy.',
    ],
    correctIndex: 1,
    explanation: 'Electrolysis consumes electrical work from a battery to produce high-energy chemical species (H2 and O2).',
    hints: [
      'An external battery is attached to drive the reaction.',
      'Electric power drives chemical splitting.',
      'Electrical energy IN -> Chemical energy OUT.',
    ],
  },
  {
    id: 'c7',
    nodeId: NODE_C9_CHEM_017,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In the calorimetry heat formula Q = m · c · ΔT, what does the symbol "c" stand for?',
    options: [
      'Concentration of reactant solution in mol/L',
      'Caloric heat of combustion',
      'Specific heat capacity of the substance in J/g°C',
      'Critical temperature of water',
    ],
    correctIndex: 2,
    explanation: 'c is the specific heat capacity (for liquid water, c ≈ 4.18 J/g°C).',
    hints: [
      'It measures how much heat 1 gram of liquid needs to warm up by 1°C.',
      'For water, c = 4.18 J/g°C.',
      'c = specific heat capacity.',
    ],
  },

  // STANDARD (8)
  {
    id: 'c8',
    nodeId: NODE_C9_CHEM_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'The thermochemical equation for methane combustion is: CH4 + 2O2 -> CO2 + 2H2O, ΔH = -890 kJ/mol. How much heat (in kJ) is released when 0.5 mol of methane burns completely?',
    correctAnswer: 445,
    tolerance: 1,
    unit: 'kJ',
    explanation: 'Heat released = 0.5 mol × 890 kJ/mol = 445 kJ.',
    hints: [
      'Multiply moles by molar enthalpy of combustion.',
      '0.5 × 890 = ?',
      'Heat released is positive magnitude: 445 kJ.',
    ],
  },
  {
    id: 'c9',
    nodeId: NODE_C9_CHEM_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Dissolving 0.1 mol of ammonium nitrate in 100 g of water absorbs 2.508 kJ of heat. If specific heat capacity of water is 4.18 J/g°C, calculate the temperature drop (ΔT) of the water in °C.',
    correctAnswer: 6.0,
    tolerance: 0.2,
    unit: '°C',
    explanation: 'Q = 2508 J. Q = m · c · ΔT => 2508 = 100 × 4.18 × ΔT => ΔT = 2508 / 418 = 6.0 °C.',
    hints: [
      'Convert 2.508 kJ to Joules: 2508 J.',
      'Use ΔT = Q / (m × c).',
      '2508 / (100 × 4.18) = 2508 / 418 = 6.0.',
    ],
  },
  {
    id: 'c10',
    nodeId: NODE_C9_CHEM_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A reaction has forward activation energy Ea(forward) = 75 kJ/mol and overall enthalpy change ΔH = -35 kJ/mol. What is the activation energy for the reverse reaction Ea(reverse) in kJ/mol?',
    correctAnswer: 110,
    tolerance: 1,
    unit: 'kJ/mol',
    explanation: 'Ea(reverse) = Ea(forward) - ΔH = 75 - (-35) = 110 kJ/mol.',
    hints: [
      'Draw the potential energy curve: Products are 35 kJ below Reactants.',
      'Going from Products to peak requires climbing ΔH magnitude PLUS Ea(forward).',
      'Ea(rev) = 75 + 35 = 110 kJ/mol.',
    ],
  },
  {
    id: 'c11',
    nodeId: NODE_C9_CHEM_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Calculate ΔH for H2(g) + Cl2(g) -> 2HCl(g) in kJ/mol given Bond Energies: H-H = 436 kJ/mol, Cl-Cl = 243 kJ/mol, H-Cl = 432 kJ/mol.',
    correctAnswer: -185,
    tolerance: 2,
    unit: 'kJ/mol',
    explanation: 'ΔH = Σ(Bonds Broken) - Σ(Bonds Formed) = (436 + 243) - (2 × 432) = 679 - 864 = -185 kJ/mol.',
    hints: [
      'Bonds broken: 1 H-H + 1 Cl-Cl = 436 + 243 = 679 kJ.',
      'Bonds formed: 2 H-Cl = 2 × 432 = 864 kJ.',
      'ΔH = 679 - 864 = -185 kJ/mol.',
    ],
  },
  {
    id: 'c12',
    nodeId: NODE_C9_CHEM_015,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Which balanced equation correctly represents the photochemical decomposition of Silver Chloride in sunlight?',
    options: [
      '2 AgCl(s) --(light)--> 2 Ag(s) + Cl2(g)',
      'AgCl(s) + H2O(l) --(light)--> AgOH(aq) + HCl(aq)',
      '2 AgCl(s) --(heat)--> Ag2O(s) + Cl2O(g)',
      'AgCl(s) --(light)--> Ag+(aq) + Cl-(aq)',
    ],
    correctIndex: 0,
    explanation: 'Sunlight supplies energy to break ionic/covalent bonds, releasing chlorine gas and silver precipitate.',
    hints: [
      'Photolysis yields elemental silver metal (grey/black) and chlorine gas.',
      '2 AgCl decomposes into 2 Ag + Cl2.',
      'Option A is correct.',
    ],
  },
  {
    id: 'c13',
    nodeId: NODE_C9_CHEM_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'An electrolytic cell operates at 4.0 V with a current of 2.5 A for 200 seconds. Calculate the total electrical energy supplied in Joules (E = V · I · t).',
    correctAnswer: 2000,
    tolerance: 10,
    unit: 'J',
    explanation: 'Energy E = V × I × t = 4.0 V × 2.5 A × 200 s = 2000 J.',
    hints: [
      'Multiply Voltage × Current × Time.',
      '4.0 × 2.5 × 200 = ?',
      '4.0 × 2.5 = 10, 10 × 200 = 2000 J.',
    ],
  },
  {
    id: 'c14',
    nodeId: NODE_C9_CHEM_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A sample of 250 g of water at 20°C absorbs heat from a reaction until its temperature reaches 35°C. Calculate heat Q absorbed in kJ. (c = 4.18 J/g°C)',
    correctAnswer: 15.675,
    tolerance: 0.2,
    unit: 'kJ',
    explanation: 'ΔT = 35 - 20 = 15°C. Q = 250 g × 4.18 J/g°C × 15°C = 15,675 J = 15.675 kJ.',
    hints: [
      'ΔT = 15 °C.',
      'Q = 250 × 4.18 × 15 = 15675 J.',
      'Convert to kJ by dividing by 1000 => 15.675 kJ.',
    ],
  },
  {
    id: 'c15',
    nodeId: NODE_C9_CHEM_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Classify the following energetics features under Respiration or Combustion.',
    categories: ['Respiration', 'Combustion'],
    items: [
      { id: 'i1', text: 'Controlled biochemical cascade at 37°C using enzymes', category: 'Respiration' },
      { id: 'i2', text: 'Rapid high-temperature reaction producing light and flame', category: 'Combustion' },
      { id: 'i3', text: 'Energy stored step-by-step into ATP molecules', category: 'Respiration' },
      { id: 'i4', text: 'Energy released instantaneously as thermal and light energy', category: 'Combustion' },
    ],
    correctMapping: {
      i1: 'Respiration',
      i2: 'Combustion',
      i3: 'Respiration',
      i4: 'Combustion',
    },
    explanation: 'Respiration is slow controlled biological release storing energy in ATP; combustion is fast uncontrolled high-temp flame release.',
    hints: [
      'Think about body temperature vs open bonfire.',
      'Enzyme control is respiration.',
      'Flames and rapid heat release is combustion.',
    ],
  },

  // ADVANCED (7)
  {
    id: 'c16',
    nodeId: NODE_C9_CHEM_019,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How does adding a catalyst affect the activation energy of the reverse reaction (Ea,rev) and the overall enthalpy change (ΔH) of a chemical reaction?',
    options: [
      'Lowers Ea,rev by the exact same amount as Ea,fwd, keeping ΔH unchanged.',
      'Lowers Ea,fwd but increases Ea,rev, making ΔH more negative.',
      'Decreases ΔH to make the reaction more exothermic.',
      'Increases Ea,rev while leaving Ea,fwd unchanged.',
    ],
    correctIndex: 0,
    explanation: 'A catalyst lowers both forward and reverse activation barriers equally by providing a lower transition state, so ΔH remains identical.',
    hints: [
      'ΔH = Ea,fwd - Ea,rev.',
      'If both Ea,fwd and Ea,rev drop by 20 kJ/mol, what happens to ΔH?',
      'ΔH is state function dependent only on initial reactants and final products.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'c17',
    nodeId: NODE_C9_CHEM_020,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'For an endothermic reversible reaction A + B ⇌ C + D (ΔH > 0), what happens to the equilibrium yield of products and reaction rate when temperature is increased?',
    options: [
      'Equilibrium shifts right (higher product yield) and reaction rate increases.',
      'Equilibrium shifts left (lower product yield) and reaction rate decreases.',
      'Equilibrium stays constant but rate increases.',
      'Equilibrium shifts right but rate decreases.',
    ],
    correctIndex: 0,
    explanation: 'Increasing temperature favors endothermic direction (absorbing heat -> shift right) and increases kinetic collision rate (faster rate).',
    hints: [
      'Le Chatelier principle: adding heat favors heat-absorbing direction.',
      'Higher temp always increases overall collision frequency.',
      'Both yield of products and reaction speed increase.',
    ],
  },
  {
    id: 'c18',
    nodeId: NODE_C9_CHEM_014,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Calculate ΔH in kJ/mol for methane combustion: CH4 + 2 O2 -> CO2 + 2 H2O. Given Bond Energies: C-H = 413, O=O = 498, C=O = 805, O-H = 464 kJ/mol.',
    correctAnswer: -818,
    tolerance: 5,
    unit: 'kJ/mol',
    explanation: 'Bonds broken: 4(413) + 2(498) = 1652 + 996 = 2648 kJ. Bonds formed: 2(805) + 4(464) = 1610 + 1856 = 3466 kJ. ΔH = 2648 - 3466 = -818 kJ/mol.',
    hints: [
      'Bonds broken: 4 C-H + 2 O=O = 1652 + 996 = 2648 kJ.',
      'Bonds formed: 2 C=O + 4 O-H = 1610 + 1856 = 3466 kJ.',
      'ΔH = 2648 - 3466 = -818 kJ/mol.',
    ],
  },
  {
    id: 'c19',
    nodeId: NODE_C9_CHEM_017,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'A bomb calorimeter with vessel heat capacity C_cal = 1.25 kJ/°C contains 500 g water (c = 4.18 J/g°C). Burning 1.0 g fuel causes a temperature rise of 4.0 °C. Calculate total heat Q in kJ.',
    correctAnswer: 13.36,
    tolerance: 0.3,
    unit: 'kJ',
    explanation: 'Q_water = 0.5 kg × 4.18 × 4.0 = 8.36 kJ. Q_cal = 1.25 × 4.0 = 5.0 kJ. Total Q = 8.36 + 5.0 = 13.36 kJ.',
    hints: [
      'Q_water = 500 g × 4.18 J/g°C × 4.0 °C = 8360 J = 8.36 kJ.',
      'Q_vessel = 1.25 kJ/°C × 4.0 °C = 5.00 kJ.',
      'Total Q = 8.36 + 5.00 = 13.36 kJ.',
    ],
  },
  {
    id: 'c20',
    nodeId: NODE_C9_CHEM_013,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a two-step reaction mechanism: Step 1 (Slow): A + B -> Inter (Ea1 = 60 kJ/mol, ΔH1 = +20 kJ/mol); Step 2 (Fast): Inter -> P (Ea2 = 30 kJ/mol, ΔH2 = -50 kJ/mol). Which step is rate-determining, and what is net ΔH?',
    options: [
      'Step 1 is rate-determining; Net ΔH = -30 kJ/mol',
      'Step 2 is rate-determining; Net ΔH = -30 kJ/mol',
      'Step 1 is rate-determining; Net ΔH = +70 kJ/mol',
      'Step 2 is rate-determining; Net ΔH = -80 kJ/mol',
    ],
    correctIndex: 0,
    explanation: 'The step with higher activation energy (Ea1 = 60 kJ/mol) is slower and thus rate-determining. Net ΔH = +20 + (-50) = -30 kJ/mol.',
    hints: [
      'Rate-determining step has highest activation energy barrier (Ea1 = 60 vs Ea2 = 30).',
      'Net ΔH is sum of step ΔH values: +20 + (-50) = -30 kJ/mol.',
      'Option A is correct.',
    ],
  },
  {
    id: 'c21',
    nodeId: NODE_C9_CHEM_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'During electrolysis of CuSO4, 0.05 mol of Cu metal deposits at cathode (Cu2+ + 2e- -> Cu). Calculate charge Q in Coulombs passed through cell. (1 Faraday = 96,500 C/mol e-)',
    correctAnswer: 9650,
    tolerance: 50,
    unit: 'C',
    explanation: 'Moles of electrons = 2 × 0.05 mol = 0.10 mol e-. Charge Q = 0.10 mol × 96,500 C/mol = 9,650 C.',
    hints: [
      'Each Cu2+ ion requires 2 electrons.',
      'Moles of electrons = 0.05 × 2 = 0.10 mol.',
      'Charge Q = 0.10 × 96,500 = 9650 C.',
    ],
  },
  {
    id: 'c22',
    nodeId: NODE_C9_CHEM_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'According to Hess\'s Law, if reaction A -> B has ΔH1 = +50 kJ and reaction B -> C has ΔH2 = -120 kJ, what is the enthalpy change for the reverse reaction C -> A in kJ?',
    correctAnswer: 70,
    tolerance: 1,
    unit: 'kJ',
    explanation: 'A -> C has ΔH = +50 + (-120) = -70 kJ. Therefore, C -> A has ΔH = +70 kJ.',
    hints: [
      'A -> C is ΔH1 + ΔH2 = +50 - 120 = -70 kJ.',
      'Reversing the reaction changes the sign of ΔH.',
      'ΔH(C -> A) = -(-70) = +70 kJ.',
    ],
  },
];

// SVG DIAGRAM 1: Energy Profile Diagram
const EnergyProfileSVG: React.FC<{
  ea: number;
  deltaH: number;
  catalyst: boolean;
  progress: number;
}> = ({ ea, deltaH, catalyst, progress }) => {
  const startY = 220;
  const endY = startY - deltaH * 1.5;
  const peakY = startY - ea * 1.8;
  const catPeakY = startY - (ea * 0.55) * 1.8;

  const pathNormal = `M 40,${startY} L 110,${startY} Q 200,${peakY} 290,${endY} L 360,${endY}`;
  const pathCatalyst = `M 40,${startY} L 110,${startY} Q 200,${catPeakY} 290,${endY} L 360,${endY}`;

  // Calculate ball position along progress
  let ballX = 40 + progress * 3.2;
  let ballY = startY;
  const activePeakY = catalyst ? catPeakY : peakY;
  if (progress < 50) {
    const t = progress / 50;
    ballY = startY + t * (activePeakY - startY);
  } else {
    const t = (progress - 50) / 50;
    ballY = activePeakY + t * (endY - activePeakY);
  }

  return (
    <svg viewBox="0 0 400 300" className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      <defs>
        <linearGradient id="curveGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Grid Lines */}
      <line x1="40" y1="260" x2="380" y2="260" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="40" y1="260" x2="40" y2="20" stroke="#475569" strokeWidth="2" />
      <text x="210" y="290" fill="#94a3b8" fontSize="12" textAnchor="middle">Reaction Progress ➔</text>
      <text x="15" y="140" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 15 140)">Potential Energy (kJ) ➔</text>

      {/* Reactant and Product Lines */}
      <line x1="40" y1={startY} x2="110" y2={startY} stroke="#60a5fa" strokeWidth="3" />
      <text x="60" y={startY - 10} fill="#60a5fa" fontSize="12" fontWeight="bold">Reactants</text>

      <line x1="290" y1={endY} x2="360" y2={endY} stroke="#34d399" strokeWidth="3" />
      <text x="310" y={endY - 10} fill="#34d399" fontSize="12" fontWeight="bold">Products</text>

      {/* Main Curve */}
      <path d={pathNormal} fill="none" stroke="url(#curveGrad)" strokeWidth="3" strokeDasharray={catalyst ? '4 4' : 'none'} opacity={catalyst ? 0.4 : 1} />

      {/* Catalyst Curve */}
      {catalyst && (
        <path d={pathCatalyst} fill="none" stroke="#f59e0b" strokeWidth="3" />
      )}

      {/* Activation Energy Ea Arrow */}
      <line x1="160" y1={startY} x2="160" y2={activePeakY} stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
      <polygon points={`160,${activePeakY} 156,${activePeakY + 8} 164,${activePeakY + 8}`} fill="#f87171" />
      <text x="165" y={(startY + activePeakY) / 2} fill="#f87171" fontSize="11" fontWeight="bold">
        Ea ({catalyst ? Math.round(ea * 0.55) : ea} kJ)
      </text>

      {/* Enthalpy Change ΔH Arrow */}
      <line x1="320" y1={startY} x2="320" y2={endY} stroke="#a78bfa" strokeWidth="2" />
      <polygon points={`320,${endY} 316,${endY + (deltaH > 0 ? 8 : -8)} 324,${endY + (deltaH > 0 ? 8 : -8)}`} fill="#a78bfa" />
      <text x="325" y={(startY + endY) / 2} fill="#a78bfa" fontSize="11" fontWeight="bold">
        ΔH = {deltaH > 0 ? `+${deltaH}` : deltaH} kJ
      </text>

      {/* Ball traveling on path */}
      <circle cx={ballX} cy={ballY} r="8" fill="#facc15" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
    </svg>
  );
};

// SVG DIAGRAM 2: Calorimeter Visualizer
const CalorimeterSVG: React.FC<{
  temp: number;
  isReacting: boolean;
  reactionType: 'exothermic' | 'endothermic';
  waterVolume: number;
}> = ({ temp, isReacting, reactionType, waterVolume }) => {
  const waterHeight = Math.min(140, 50 + waterVolume * 0.4);
  const liquidY = 220 - waterHeight;
  const mercuryHeight = Math.min(130, Math.max(10, (temp - 10) * 2.5));

  return (
    <svg viewBox="0 0 350 260" className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      {/* Insulated Outer Vessel */}
      <rect x="70" y="50" width="160" height="180" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="4" />
      <rect x="60" y="40" width="180" height="15" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />

      {/* Water inside calorimeter */}
      <rect x="76" y={liquidY} width="148" height={waterHeight} fill="#0284c7" opacity="0.6" rx="4" />
      <path d={`M 76,${liquidY} Q 110,${liquidY - 4} 150,${liquidY} T 224,${liquidY}`} fill="none" stroke="#38bdf8" strokeWidth="2" />

      {/* Reactant Chamber / Reaction Core */}
      <circle cx="150" cy="170" r="30" fill="#0f172a" stroke="#f59e0b" strokeWidth="3" />
      <text x="150" y="174" fill="#fef08a" fontSize="10" textAnchor="middle" fontWeight="bold">
        {isReacting ? 'REACTING...' : 'REACTION CORE'}
      </text>

      {/* Heat Waves or Cold Frost */}
      {isReacting && reactionType === 'exothermic' && (
        <g className="animate-ping" opacity="0.7">
          <circle cx="150" cy="170" r="42" fill="none" stroke="#ef4444" strokeWidth="2" />
          <circle cx="150" cy="170" r="54" fill="none" stroke="#f97316" strokeWidth="1.5" />
        </g>
      )}
      {isReacting && reactionType === 'endothermic' && (
        <g className="animate-pulse" opacity="0.7">
          <circle cx="150" cy="170" r="40" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="150" cy="170" r="50" fill="none" stroke="#93c5fd" strokeWidth="1.5" />
        </g>
      )}

      {/* Thermometer */}
      <rect x="180" y="20" width="14" height="170" rx="7" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <rect x="184" y={170 - mercuryHeight} width="6" height={mercuryHeight} fill="#ef4444" rx="3" />
      <circle cx="187" cy="175" r="10" fill="#ef4444" />
      <text x="205" y="35" fill="#ef4444" fontSize="14" fontWeight="bold">{temp.toFixed(1)} °C</text>

      {/* Stirrer */}
      <path d="M 110,25 L 110,185 M 100,185 L 120,185" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

// SVG DIAGRAM 3: Molecular Bond Visualizer
const BondEnergyVisualizerSVG: React.FC<{
  stage: 'reactants' | 'broken' | 'products';
}> = ({ stage }) => {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      {stage === 'reactants' && (
        <g>
          {/* H2 Molecule */}
          <g transform="translate(100, 120)">
            <line x1="-25" y1="0" x2="25" y2="0" stroke="#60a5fa" strokeWidth="6" />
            <circle cx="-25" cy="0" r="22" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="-25" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
            <circle cx="25" cy="0" r="22" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="25" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>
            <text x="0" y="-35" fill="#93c5fd" fontSize="12" textAnchor="middle">H-H (436 kJ/mol)</text>
          </g>

          <text x="200" y="125" fill="#f87171" fontSize="24" fontWeight="bold" textAnchor="middle">+</text>

          {/* Cl2 Molecule */}
          <g transform="translate(300, 120)">
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#34d399" strokeWidth="6" />
            <circle cx="-30" cy="0" r="26" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
            <text x="-30" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cl</text>
            <circle cx="30" cy="0" r="26" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
            <text x="30" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cl</text>
            <text x="0" y="-35" fill="#a7f3d0" fontSize="12" textAnchor="middle">Cl-Cl (243 kJ/mol)</text>
          </g>
          <text x="200" y="210" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">
            Total Bond Breaking Energy IN: 436 + 243 = +679 kJ
          </text>
        </g>
      )}

      {stage === 'broken' && (
        <g>
          <text x="200" y="40" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">
            TRANSITION STATE: ALL BONDS BROKEN (HIGH POTENTIAL ENERGY)
          </text>
          <circle cx="90" cy="120" r="22" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
          <text x="90" y="125" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>

          <circle cx="160" cy="120" r="22" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
          <text x="160" y="125" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">H</text>

          <circle cx="240" cy="120" r="26" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
          <text x="240" y="125" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cl</text>

          <circle cx="310" cy="120" r="26" fill="#10b981" stroke="#ffffff" strokeWidth="2" className="animate-pulse" />
          <text x="310" y="125" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cl</text>

          <text x="200" y="200" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            Unbonded Atoms: Unstable Activated Complex
          </text>
        </g>
      )}

      {stage === 'products' && (
        <g>
          {/* 2 HCl Molecules */}
          <g transform="translate(110, 120)">
            <line x1="-20" y1="0" x2="25" y2="0" stroke="#a78bfa" strokeWidth="6" />
            <circle cx="-20" cy="0" r="20" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="-20" y="5" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
            <circle cx="25" cy="0" r="26" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
            <text x="25" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cl</text>
            <text x="2" y="-35" fill="#c084fc" fontSize="12" textAnchor="middle">H-Cl (432 kJ)</text>
          </g>

          <text x="200" y="125" fill="#f87171" fontSize="24" fontWeight="bold" textAnchor="middle">+</text>

          <g transform="translate(290, 120)">
            <line x1="-20" y1="0" x2="25" y2="0" stroke="#a78bfa" strokeWidth="6" />
            <circle cx="-20" cy="0" r="20" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
            <text x="-20" y="5" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">H</text>
            <circle cx="25" cy="0" r="26" fill="#10b981" stroke="#a7f3d0" strokeWidth="2" />
            <text x="25" y="5" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Cl</text>
            <text x="2" y="-35" fill="#c084fc" fontSize="12" textAnchor="middle">H-Cl (432 kJ)</text>
          </g>

          <text x="200" y="210" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Total Bond Formation Energy OUT: 2 × 432 = -864 kJ | Net ΔH = -185 kJ (Exothermic)
          </text>
        </g>
      )}
    </svg>
  );
};

// SVG DIAGRAM 4: Photochemical & Electrochemical Apparatus
const ElectrochemicalPhotochemicalSVG: React.FC<{
  mode: 'photochemical' | 'electrochemical';
   intensityOrVoltage: number;
}> = ({ mode, intensityOrVoltage }) => {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-64 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
      {mode === 'photochemical' ? (
        <g>
          {/* Light Source Lamp */}
          <circle cx="70" cy="60" r="25" fill="#fde047" stroke="#eab308" strokeWidth="3" className="animate-pulse" />
          <text x="70" y="65" fill="#854d0e" fontSize="11" fontWeight="bold" textAnchor="middle">SUN / UV</text>

          {/* Light Rays */}
          <line x1="95" y1="75" x2="190" y2="135" stroke="#fef08a" strokeWidth={Math.min(8, Math.max(2, intensityOrVoltage / 15))} strokeDasharray="6 4" />
          <line x1="85" y1="85" x2="180" y2="155" stroke="#fef08a" strokeWidth={Math.min(8, Math.max(2, intensityOrVoltage / 15))} strokeDasharray="6 4" />

          {/* Petri Dish with AgBr */}
          <ellipse cx="230" cy="170" rx="90" ry="25" fill="#334155" stroke="#64748b" strokeWidth="3" />
          <ellipse cx="230" cy="166" rx="82" ry="20" fill={intensityOrVoltage > 50 ? '#475569' : '#fef08a'} />
          <text x="230" y="170" fill={intensityOrVoltage > 50 ? '#f8fafc' : '#713f12'} fontSize="12" fontWeight="bold" textAnchor="middle">
            {intensityOrVoltage > 50 ? 'Ag (Grey-Black Silver Precipitate)' : 'AgBr (Pale Yellow Salt)'}
          </text>
          <text x="230" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle">
            2 AgBr(s) + Photon Energy (hν) ➔ 2 Ag(s) + Br2(g)
          </text>
        </g>
      ) : (
        <g>
          {/* Electrolysis Beaker */}
          <rect x="110" y="70" width="180" height="130" fill="#0284c7" opacity="0.5" rx="8" stroke="#38bdf8" strokeWidth="3" />

          {/* Electrodes */}
          <rect x="140" y="40" width="16" height="130" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <text x="148" y="30" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Anode (+)</text>

          <rect x="240" y="40" width="16" height="130" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
          <text x="248" y="30" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">Cathode (-)</text>

          {/* Battery DC Power Supply */}
          <rect x="175" y="15" width="50" height="25" rx="4" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="200" y="32" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">{intensityOrVoltage} V DC</text>

          {/* Wires */}
          <path d="M 148,40 L 148,27 L 175,27" fill="none" stroke="#ef4444" strokeWidth="2" />
          <path d="M 248,40 L 248,27 L 225,27" fill="none" stroke="#60a5fa" strokeWidth="2" />

          {/* Bubbles */}
          <circle cx="148" cy="140" r="4" fill="#ffffff" opacity="0.8" className="animate-ping" />
          <circle cx="148" cy="110" r="6" fill="#ffffff" opacity="0.8" className="animate-ping" />
          <circle cx="248" cy="130" r="5" fill="#ffffff" opacity="0.8" className="animate-ping" />
          <circle cx="248" cy="100" r="7" fill="#ffffff" opacity="0.8" className="animate-ping" />

          <text x="200" y="220" fill="#f59e0b" fontSize="12" textAnchor="middle">
            Electrical Energy IN ➔ Chemical Decomposition (Non-spontaneous)
          </text>
        </g>
      )}
    </svg>
  );
};

// MAIN SIMULATION COMPONENT
export default function C9_ChemistryEnergychangesinchemicalreactionsSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  const simId = useId();

  // Tab & Navigation State
  const [currentTab, setCurrentTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false]);

  // Lab 1 (Calorimeter) State
  const [lab1Reactant, setLab1Reactant] = useState<'neutralization' | 'dissolution' | 'combustion'>('neutralization');
  const [lab1Mass, setLab1Mass] = useState<number>(100); // grams
  const [lab1TempStart, setLab1TempStart] = useState<number>(25.0);
  const [lab1TempCurrent, setLab1TempCurrent] = useState<number>(25.0);
  const [lab1IsReacting, setLab1IsReacting] = useState<boolean>(false);

  // Lab 2 (Energy Profile) State
  const [lab2Ea, setLab2Ea] = useState<number>(60);
  const [lab2DeltaH, setLab2DeltaH] = useState<number>(-40);
  const [lab2Catalyst, setLab2Catalyst] = useState<boolean>(false);
  const [lab2Progress, setLab2Progress] = useState<number>(0);
  const [lab2IsRunning, setLab2IsRunning] = useState<boolean>(false);

  // Lab 3 (Bond Energy) State
  const [lab3Stage, setLab3Stage] = useState<'reactants' | 'broken' | 'products'>('reactants');

  // Lab 4 (Photochemical) State
  const [lab4LightIntensity, setLab4LightIntensity] = useState<number>(20);

  // Lab 5 (Electrochemical) State
  const [lab5Mode, setLab5Mode] = useState<'photochemical' | 'electrochemical'>('electrochemical');
  const [lab5Voltage, setLab5Voltage] = useState<number>(6);

  // Observation Questions State
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);
  const [observationSubmitted, setObservationSubmitted] = useState<boolean[]>([false, false]);

  // Challenge System State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userMcqChoice, setUserMcqChoice] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userClassifyMapping, setUserClassifyMapping] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));

  // Diagnostic System State
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<(number | null)[]>(new Array(DIAGNOSTIC_QUESTIONS.length).fill(null));
  const [diagnosticSubmitted, setDiagnosticSubmitted] = useState<boolean>(false);

  // Mastery & SRS State
  const [bktMap, setBktMap] = useState<Record<string, BKTState>>(() => {
    const map: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState();
    });
    return map;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const map: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createReviewItem(id);
    });
    return map;
  });

  // Visual FX & Hint Controls
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Speak initial intro once
  useEffect(() => {
    speechManager.speak(SCENARIO.intro);
  }, []);

  // Inactivity auto-hint timer (10 seconds)
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);

    inactivityTimerRef.current = setTimeout(() => {
      if (currentTab === 'challenges') {
        const ch = CHALLENGES[currentChallengeIndex];
        setCurrentHint(ch.hints[0] || 'Think carefully about heat flow and conservation of energy.');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentTab, currentChallengeIndex, activeLabIndex]);

  // Lab 1 Reaction Animation Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lab1IsReacting) {
      let step = 0;
      const targetTemp =
        lab1Reactant === 'neutralization'
          ? lab1TempStart + (5000 / (lab1Mass * 4.18))
          : lab1Reactant === 'dissolution'
          ? lab1TempStart - (2500 / (lab1Mass * 4.18))
          : lab1TempStart + (12000 / (lab1Mass * 4.18));

      timer = setInterval(() => {
        step++;
        setLab1TempCurrent((prev) => prev + (targetTemp - prev) * 0.2);
        if (step > 15) {
          setLab1IsReacting(false);
          setLab1TempCurrent(targetTemp);
          clearInterval(timer);
          audioManager.play('chime');
        }
      }, 150);
    }
    return () => clearInterval(timer);
  }, [lab1IsReacting, lab1Reactant, lab1Mass, lab1TempStart]);

  // Lab 2 Animation Loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lab2IsRunning) {
      timer = setInterval(() => {
        setLab2Progress((prev) => {
          if (prev >= 100) {
            setLab2IsRunning(false);
            clearInterval(timer);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [lab2IsRunning]);

  // Handle Tab Navigation
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    audioManager.play('tap');
    setCurrentTab(tab);
  };

  // Discovery Submit
  const handleDiscoverySubmit = () => {
    if (discoveryAnswer === null) return;
    setDiscoverySubmitted(true);
    if (discoveryAnswer === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Endothermic processes absorb thermal heat into chemical potential energy.');
    } else {
      audioManager.play('error');
    }
  };

  // Prediction Submit
  const handlePredictionSubmit = (index: number) => {
    if (predictionAnswers[index] === null) return;
    const updated = [...predictionSubmitted];
    updated[index] = true;
    setPredictionSubmitted(updated);

    if (predictionAnswers[index] === PREDICTION_QUESTIONS[index].correctIndex) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Observation Submit
  const handleObservationSubmit = (index: number) => {
    if (observationAnswers[index] === null) return;
    const updated = [...observationSubmitted];
    updated[index] = true;
    setObservationSubmitted(updated);

    if (observationAnswers[index] === OBSERVATION_QUESTIONS[index].correctIndex) {
      audioManager.play('success');
    } else {
      audioManager.play('error');
    }
  };

  // Diagnostic Submit
  const handleDiagnosticSubmit = () => {
    setDiagnosticSubmitted(true);
    let correctCount = 0;
    diagnosticAnswers.forEach((ans, idx) => {
      if (ans === DIAGNOSTIC_QUESTIONS[idx].correctIndex) correctCount++;
    });
    if (correctCount >= 6) {
      audioManager.play('celebration');
      setShowConfetti(true);
      speechManager.speak(`Diagnostic Complete! You scored ${correctCount} out of ${DIAGNOSTIC_QUESTIONS.length}. Excellent baseline!`);
    } else {
      audioManager.play('chime');
    }
  };

  // Submit Challenge Answer
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'mcq') {
      if (userMcqChoice === ch.correctIndex) isCorrect = true;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && ch.correctAnswer !== undefined && ch.tolerance !== undefined) {
        if (Math.abs(val - ch.correctAnswer) <= ch.tolerance) isCorrect = true;
      }
    } else if (ch.type === 'classify' && ch.correctMapping) {
      let allMatch = true;
      Object.keys(ch.correctMapping).forEach((itemId) => {
        if (userClassifyMapping[itemId] !== ch.correctMapping?.[itemId]) {
          allMatch = false;
        }
      });
      if (allMatch && Object.keys(userClassifyMapping).length === Object.keys(ch.correctMapping).length) {
        isCorrect = true;
      }
    }

    // Update BKT & SRS
    const currentBKT = bktMap[ch.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [ch.nodeId]: updatedBKT }));

    const currentSRS = srsMap[ch.nodeId] || createReviewItem(ch.nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2);
    setSrsMap((prev) => ({ ...prev, [ch.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setChallengeFeedback({ isCorrect: true, message: `Awesome! ${ch.explanation}` });

      const updatedCompleted = [...challengeCompleted];
      updatedCompleted[currentChallengeIndex] = true;
      setChallengeCompleted(updatedCompleted);

      // Check overall sim completion
      if (updatedCompleted.filter(Boolean).length === CHALLENGES.length) {
        audioManager.play('celebration');
        setShowConfetti(true);
        setShowSuccessBanner(true);
        speechManager.speak('Congratulations! You have completed all thermochemistry challenges!');
        recordGameScore(ALL_NODE_IDS[0], 100);
        if (onComplete) onComplete(100);
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({ isCorrect: false, message: `Not quite. ${ch.hints[0]}` });
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    audioManager.play('tap');
    setChallengeFeedback(null);
    setUserMcqChoice(null);
    setUserNumericInput('');
    setUserClassifyMapping({});
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    }
  };

  // Calculate overall score / progress
  const completedCount = challengeCompleted.filter(Boolean).length;
  const overallProgressPercent = Math.round((completedCount / CHALLENGES.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col justify-between">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Thermochemistry Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={300} y={200} />
      <HintBubble show={showHint} text={currentHint} />

      {/* TOP BAR / HEADER */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400 bg-clip-text text-transparent">
            {SCENARIO.title}
          </h1>
          <p className="text-xs text-slate-400 mt-1">ICSE Class 9 Chemistry • Energetics & Chemical Thermodynamics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => handleTabChange('discovery')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              currentTab === 'discovery' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Discovery & Concepts
          </button>
          <button
            onClick={() => handleTabChange('lab')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              currentTab === 'lab' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => handleTabChange('challenges')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              currentTab === 'challenges' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Challenges ({completedCount}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => handleTabChange('summary')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              currentTab === 'summary' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Summary & Mastery
          </button>
        </div>
      </header>

      {/* MAIN CONTENT REGION */}
      <main className="flex-1">
        {/* TAB 1: DISCOVERY & CONCEPT CHECK */}
        {currentTab === 'discovery' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Context Box */}
            <div className="bg-slate-900 border border-cyan-800/40 rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">Laboratory Context</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Discovery Core Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-2.5 py-1 rounded-md">
                  Core Discovery Question
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setDiscoveryAnswer(idx);
                    }}
                    className={`p-4 text-left rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswer === idx
                        ? 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoveryAnswer === null}
                  className="mt-4 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-sm font-bold rounded-xl transition-all shadow-lg"
                >
                  Confirm Hypothesis
                </button>
              ) : (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm">
                  <p className="font-bold text-cyan-400 mb-1">Scientific Insight:</p>
                  <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Prediction Questions (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6">
              <h3 className="text-lg font-bold text-slate-100">Lab Hypotheses & Predictions</h3>
              {PREDICTION_QUESTIONS.map((pq, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-cyan-300">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          const updated = [...predictionAnswers];
                          updated[idx] = oIdx;
                          setPredictionAnswers(updated);
                        }}
                        className={`p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                          predictionAnswers[idx] === oIdx
                            ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!predictionSubmitted[idx] ? (
                    <button
                      onClick={() => handlePredictionSubmit(idx)}
                      disabled={predictionAnswers[idx] === null}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Verify Prediction
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-lg border border-indigo-900 text-xs">
                      <p className="text-indigo-300 font-bold mb-1">Verification Instructions:</p>
                      <p className="text-slate-300">{pq.verifyInstruction}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Diagnostic Baseline Quick Assessment */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-bold text-slate-100">Diagnostic Baseline Assessment</h3>
              <p className="text-xs text-slate-400">Evaluate your entry-level thermochemistry knowledge before stepping into the virtual lab.</p>

              <div className="space-y-4 pt-2">
                {DIAGNOSTIC_QUESTIONS.map((dq, qIdx) => (
                  <div key={dq.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <p className="text-xs font-semibold text-slate-200">
                      {qIdx + 1}. {dq.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {dq.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          disabled={diagnosticSubmitted}
                          onClick={() => {
                            audioManager.play('tap');
                            const updated = [...diagnosticAnswers];
                            updated[qIdx] = optIdx;
                            setDiagnosticAnswers(updated);
                          }}
                          className={`p-2.5 text-left rounded-lg text-xs border transition-all ${
                            diagnosticAnswers[qIdx] === optIdx
                              ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {diagnosticSubmitted && (
                      <p className="text-xs text-slate-400 mt-1 italic">
                        Explanation: {dq.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {!diagnosticSubmitted && (
                <button
                  onClick={handleDiagnosticSubmit}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  Submit Diagnostic Assessment
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {currentTab === 'lab' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            {/* Lab Selection Controls */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveLabIndex(idx);
                  }}
                  className={`p-3 text-left rounded-xl border transition-all ${
                    activeLabIndex === idx
                      ? 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold text-cyan-400">Lab {idx + 1}</p>
                  <p className="text-xs font-medium truncate">{step.title.split(':')[1] || step.title}</p>
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-cyan-300">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
            </div>

            {/* LAB 1 VIEW: Calorimetric Heat Measurement */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CalorimeterSVG
                  temp={lab1TempCurrent}
                  isReacting={lab1IsReacting}
                  reactionType={lab1Reactant === 'dissolution' ? 'endothermic' : 'exothermic'}
                  waterVolume={lab1Mass}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Calorimeter Control Desk</h4>
                  
                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">Reaction Mixture</label>
                    <select
                      value={lab1Reactant}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setLab1Reactant(e.target.value as 'neutralization' | 'dissolution' | 'combustion');
                        setLab1TempCurrent(25.0);
                      }}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5"
                    >
                      <option value="neutralization">Neutralization: HCl + NaOH (Exothermic)</option>
                      <option value="dissolution">Dissolution: NH4NO3 in Water (Endothermic)</option>
                      <option value="combustion">Combustion: Ethanol Spirit Burner (Exothermic)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Water / Solution Mass (m): {lab1Mass} g
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="250"
                      step="10"
                      value={lab1Mass}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setLab1Mass(Number(e.target.value));
                      }}
                      className="w-full accent-cyan-500"
                    />
                  </div>

                  <button
                    onClick={() => {
                      audioManager.play('whoosh');
                      setLab1IsReacting(true);
                    }}
                    disabled={lab1IsReacting}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    {lab1IsReacting ? 'Reacting...' : 'Initiate Reaction & Record ΔT'}
                  </button>

                  <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                    <p className="text-slate-400">Initial Temperature (T1): <span className="text-slate-200 font-bold">{lab1TempStart.toFixed(1)} °C</span></p>
                    <p className="text-slate-400">Current Temperature (T2): <span className="text-slate-200 font-bold">{lab1TempCurrent.toFixed(1)} °C</span></p>
                    <p className="text-cyan-400 font-bold pt-1">
                      Calculated Q = m·c·ΔT = {((lab1Mass * 4.18 * Math.abs(lab1TempCurrent - lab1TempStart)) / 1000).toFixed(3)} kJ
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2 VIEW: Potential Energy Profile Editor */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EnergyProfileSVG
                  ea={lab2Ea}
                  deltaH={lab2DeltaH}
                  catalyst={lab2Catalyst}
                  progress={lab2Progress}
                />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Energy Profile Controls</h4>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Activation Energy Barrier (Ea): {lab2Ea} kJ/mol
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="5"
                      value={lab2Ea}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setLab2Ea(Number(e.target.value));
                      }}
                      className="w-full accent-red-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Enthalpy Change (ΔH): {lab2DeltaH} kJ/mol ({lab2DeltaH < 0 ? 'Exothermic' : 'Endothermic'})
                    </label>
                    <input
                      type="range"
                      min="-80"
                      max="80"
                      step="10"
                      value={lab2DeltaH}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setLab2DeltaH(Number(e.target.value));
                      }}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="catalystToggle"
                      checked={lab2Catalyst}
                      onChange={(e) => {
                        audioManager.play('pop');
                        setLab2Catalyst(e.target.checked);
                      }}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <label htmlFor="catalystToggle" className="text-xs font-bold text-amber-400">
                      Add Catalyst (Lowers Ea by 45%)
                    </label>
                  </div>

                  <button
                    onClick={() => {
                      audioManager.play('whoosh');
                      setLab2Progress(0);
                      setLab2IsRunning(true);
                    }}
                    disabled={lab2IsRunning}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Simulate Molecular Trajectory
                  </button>
                </div>
              </div>
            )}

            {/* LAB 3 VIEW: Molecular Bond Energy Calculator */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BondEnergyVisualizerSVG stage={lab3Stage} />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Bond Energy Accounting (H2 + Cl2 ➔ 2 HCl)</h4>
                  <p className="text-xs text-slate-400">
                    Step through the energetic sequence of bond breaking (endothermic) and bond formation (exothermic).
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        audioManager.play('pop');
                        setLab3Stage('reactants');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        lab3Stage === 'reactants' ? 'bg-blue-900 border-blue-500 text-blue-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      1. Reactant Bonds
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('whoosh');
                        setLab3Stage('broken');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        lab3Stage === 'broken' ? 'bg-amber-900 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      2. Break Bonds (Ea)
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('chime');
                        setLab3Stage('products');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        lab3Stage === 'products' ? 'bg-emerald-900 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      3. Form Product Bonds
                    </button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="text-slate-300">
                      <span className="font-bold text-blue-400">H-H Bond:</span> 436 kJ/mol
                    </p>
                    <p className="text-slate-300">
                      <span className="font-bold text-emerald-400">Cl-Cl Bond:</span> 243 kJ/mol
                    </p>
                    <p className="text-slate-300">
                      <span className="font-bold text-purple-400">2 × H-Cl Bonds:</span> 2 × 432 = 864 kJ/mol
                    </p>
                    <div className="pt-2 border-t border-slate-800 text-emerald-400 font-bold">
                      Net ΔH = +679 kJ - 864 kJ = -185 kJ/mol (Exothermic)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4 VIEW: Photochemical Decomposition */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ElectrochemicalPhotochemicalSVG mode="photochemical" intensityOrVoltage={lab4LightIntensity} />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Light Intensity & Photon Absorption</h4>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Light Intensity / Photon Flux: {lab4LightIntensity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={lab4LightIntensity}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setLab4LightIntensity(Number(e.target.value));
                      }}
                      className="w-full accent-yellow-400"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="text-yellow-400 font-bold">Photochemical Principle:</p>
                    <p className="text-slate-300">
                      Photons of light energy (E = hν) are absorbed by silver halide crystals, splitting ionic bonds:
                    </p>
                    <p className="text-slate-200 font-mono bg-slate-900 p-2 rounded border border-slate-800">
                      2 AgBr(s) + hν ➔ 2 Ag(s) + Br2(g)
                    </p>
                    <p className="text-slate-400 text-xs">
                      Status: {lab4LightIntensity > 50 ? 'Rapid photolysis occurring. Silver precipitating.' : 'Stable salt under dim light.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5 VIEW: Electrochemical Energy Conversions */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ElectrochemicalPhotochemicalSVG mode="electrochemical" intensityOrVoltage={lab5Voltage} />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Electrolysis Power Control</h4>

                  <div>
                    <label className="text-xs font-semibold text-slate-400 block mb-1">
                      Applied DC Potential: {lab5Voltage} Volts
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="1"
                      value={lab5Voltage}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setLab5Voltage(Number(e.target.value));
                      }}
                      className="w-full accent-blue-500"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="text-blue-400 font-bold">Electrochemical Energy Transformation:</p>
                    <p className="text-slate-300">
                      External electrical work drives non-spontaneous oxidation-reduction reactions:
                    </p>
                    <p className="text-slate-200 font-mono bg-slate-900 p-2 rounded border border-slate-800">
                      2 H2O(l) + Electrical Energy ➔ 2 H2(g) + O2(g)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-6 mt-6">
              <h3 className="text-lg font-bold text-slate-100">Lab Observations & Empirical Deductions</h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-cyan-300">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          const updated = [...observationAnswers];
                          updated[idx] = oIdx;
                          setObservationAnswers(updated);
                        }}
                        className={`p-3 text-left rounded-lg text-xs font-medium border transition-all ${
                          observationAnswers[idx] === oIdx
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!observationSubmitted[idx] ? (
                    <button
                      onClick={() => handleObservationSubmit(idx)}
                      disabled={observationAnswers[idx] === null}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Confirm Observation
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 rounded-lg border border-emerald-900 text-xs text-slate-300">
                      {observationAnswers[idx] === oq.correctIndex ? (
                        <span className="text-emerald-400 font-bold">✓ Accurate Empirical Deduction!</span>
                      ) : (
                        <span className="text-red-400 font-bold">✗ Re-examine the interactive model above.</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: 22 PROGRESSIVE CHALLENGES */}
        {currentTab === 'challenges' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-base font-extrabold text-slate-100">
                  {CHALLENGES[currentChallengeIndex].competencyLevel} Tier • Node: {CHALLENGES[currentChallengeIndex].nodeId}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-purple-950 text-purple-400 border border-purple-800'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h2 className="text-lg font-bold text-slate-100 leading-snug">
                {CHALLENGES[currentChallengeIndex].question}
              </h2>

              {/* MCQ TYPE */}
              {CHALLENGES[currentChallengeIndex].type === 'mcq' && (
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setUserMcqChoice(idx);
                      }}
                      className={`p-4 text-left rounded-xl border text-sm font-medium transition-all ${
                        userMcqChoice === idx
                          ? 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-cyan-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* NUMERIC TYPE */}
              {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter value"
                      value={userNumericInput}
                      onChange={(e) => setUserNumericInput(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-100 text-sm rounded-xl px-4 py-3 w-48 focus:outline-none focus:border-cyan-500"
                    />
                    <span className="text-sm font-bold text-cyan-400">
                      {CHALLENGES[currentChallengeIndex].unit}
                    </span>
                  </div>
                </div>
              )}

              {/* CLASSIFY TYPE */}
              {CHALLENGES[currentChallengeIndex].type === 'classify' && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">Assign each statement to its correct energetic category:</p>
                  {CHALLENGES[currentChallengeIndex].items?.map((item) => (
                    <div key={item.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-200">{item.text}</span>
                      <select
                        value={userClassifyMapping[item.id] || ''}
                        onChange={(e) => {
                          audioManager.play('tap');
                          setUserClassifyMapping({ ...userClassifyMapping, [item.id]: e.target.value });
                        }}
                        className="bg-slate-900 border border-slate-700 text-xs text-cyan-300 rounded-lg p-2"
                      >
                        <option value="">Select Category</option>
                        {CHALLENGES[currentChallengeIndex].categories?.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Action & Feedback Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleChallengeSubmit}
                  className="w-full md:w-auto px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                >
                  Submit Answer
                </button>

                {currentChallengeIndex < CHALLENGES.length - 1 && (
                  <button
                    onClick={handleNextChallenge}
                    className="w-full md:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all"
                  >
                    Skip / Next ➔
                  </button>
                )}
              </div>

              {/* Feedback Display */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl border text-xs font-medium ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/60 border-red-500/50 text-red-300'
                }`}>
                  {challengeFeedback.message}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY, SRS & REAL WORLD EXTENSION */}
        {currentTab === 'summary' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {/* Overall Score Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-extrabold text-cyan-400">Thermochemistry Mastery Summary</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Track Bayesian Knowledge Tracing (BKT) and Spaced Repetition (SM-2) schedules across nodes.
                </p>
              </div>
              <div className="text-center bg-slate-950 px-6 py-4 rounded-xl border border-slate-800">
                <p className="text-3xl font-black text-cyan-400">{overallProgressPercent}%</p>
                <p className="text-xs text-slate-400 font-semibold mt-1">Challenges Mastered</p>
              </div>
            </div>

            {/* REAL WORLD EXTENSION ACTIVITY (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-md">
                  Real-World Industrial Chemistry Activity
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Corrective Review */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-100">Common Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-red-400">Myth: "{misc.statement}"</p>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-emerald-400">Fact:</span> {misc.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* BKT Node Mastery Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-base font-bold text-slate-100">BKT Learning Analytics & SRS Review</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktMap[nodeId];
                  const mastery = getMasteryLevel(bkt);
                  return (
                    <div key={nodeId} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-cyan-300">{nodeId}</p>
                        <p className="text-slate-400">pKnow: {(bkt.pKnown * 100).toFixed(0)}%</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${
                        mastery === 'mastered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {mastery}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
        ICSE Class 9 Chemistry Virtual Sim • Energy Changes in Chemical Reactions • CISCE Curriculum Compliant
      </footer>
    </div>
  );
}