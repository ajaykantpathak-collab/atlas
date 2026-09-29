'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================

const NODE_001 = 'c8_chem_001'; // Kinetic Molecular Theory of Matter
const NODE_002 = 'c8_chem_002'; // Intermolecular Forces and Intermolecular Space
const NODE_003 = 'c8_chem_003'; // Melting (Fusion) and Freezing (Solidification)
const NODE_004 = 'c8_chem_004'; // Evaporation vs Boiling (Vaporization)
const NODE_005 = 'c8_chem_005'; // Condensation (Liquefaction)
const NODE_006 = 'c8_chem_006'; // Sublimation and Deposition
const NODE_007 = 'c8_chem_007'; // Latent Heat & Heating Curve Analysis
const NODE_008 = 'c8_chem_008'; // Thermal Expansion of Matter

const ALL_NODE_IDS = [
  NODE_001,
  NODE_002,
  NODE_003,
  NODE_004,
  NODE_005,
  NODE_006,
  NODE_007,
  NODE_008,
];

// Section 1: SCENARIO
const SCENARIO = {
  title: 'Advanced Thermal Physics & Kinetic Chemistry Laboratory',
  intro:
    'Welcome to the Central ICSE Chemistry Virtual Research Suite! You have been appointed as Lead Research Scientist to investigate the microscopic and macroscopic behavior of matter under extreme thermal and kinetic conditions.',
  context:
    'Using advanced digital pyrometers, variable-pressure molecular containment chambers, and precision calorimetry, you will explore kinetic molecular theory, phase transitions, latent heat plateaus, sublimation cycles, and thermal expansion dynamics.',
};

// Section 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question:
    'When a beaker containing pure ice cubes at 0°C is placed over a steady flame, a thermometer placed inside registers 0°C continuously until ALL ice has melted. Where does the continuously supplied heat energy go?',
  options: [
    'The heat energy disappears into the surrounding air and is lost completely.',
    'The heat energy is absorbed by thermometer glass without affecting the ice water system.',
    'The heat energy is used exclusively to overcome intermolecular forces of attraction, increasing potential energy rather than kinetic energy.',
    'The heat energy converts into light energy inside the container.',
  ],
  correctIndex: 2,
  hintAfter:
    'During a phase transition, temperature remains completely constant because heat energy (latent heat) increases intermolecular potential energy by breaking bonds, rather than increasing the average particle kinetic energy!',
};

// Section 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Kinetic Molecular Dynamics & Intermolecular Force Simulator',
    instruction:
      'Adjust the temperature slider from -50°C to 200°C and observe particle speed, intermolecular spacing, and kinetic energy distribution across Solid, Liquid, and Gaseous states.',
    interactionType: 'temperature-kinetic-slider',
    nodeId: NODE_001,
  },
  {
    title: 'Lab 2: Latent Heat Plateau & Heating Curve Calorimetry',
    instruction:
      'Control thermal energy input (Watts) and trace the real-time Heating Curve (Temperature vs Time graph) to observe the zero-slope plateaus during Fusion and Vaporization.',
    interactionType: 'heating-curve-analysis',
    nodeId: NODE_007,
  },
  {
    title: 'Lab 3: Surface Evaporation vs Bulk Boiling Comparison Tank',
    instruction:
      'Modify surface area, ambient humidity, temperature, and airflow speed to quantify their direct impact on the rate of surface evaporation versus bulk boiling.',
    interactionType: 'evaporation-boiling-variables',
    nodeId: NODE_004,
  },
  {
    title: 'Lab 4: Sublimation & Deposition Inverted Funnel Apparatus',
    instruction:
      'Heat solid Ammonium Chloride (NH₄Cl) or Iodine crystals in a sealed porcelain dish with an inverted glass funnel to observe solid-to-gas phase change and cold surface deposition.',
    interactionType: 'sublimation-deposition-chamber',
    nodeId: NODE_006,
  },
  {
    title: 'Lab 5: Precision Dilatometer & Bimetallic Strip Thermal Expansion',
    instruction:
      'Apply heat to solid metal rods (Brass, Iron, Aluminum) and bimetallic strips to measure linear expansion coefficients and microscopic lattice expansion.',
    interactionType: 'thermal-expansion-dilatometer',
    nodeId: NODE_008,
  },
];

// Section 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: What happens to the boiling point of pure water inside a sealed pressure cooker where atmospheric pressure is increased above 1 atm (101.3 kPa)?',
    options: [
      'Boiling point decreases below 100°C because pressure squeezes liquid particles together.',
      'Boiling point increases above 100°C because higher vapor pressure is required for vapor bubbles to form against higher external pressure.',
      'Boiling point remains exactly 100°C regardless of atmospheric pressure variations.',
      'Water turns directly into ice due to high external compression force.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Increase ambient pressure in the containment chamber and observe the elevated boiling point threshold on the temperature graph.',
    nodeId: NODE_004,
  },
  {
    question:
      'Predict: If equal amounts of heat energy (1000 Joules) are supplied to 1 kg of Ice at 0°C versus 1 kg of Water at 0°C, which sample will show a higher temperature reading?',
    options: [
      'The Ice sample, because solids absorb heat faster than liquids.',
      'The Water sample, because all 1000 J goes into raising temperature, whereas in ice, energy is consumed as latent heat of fusion to melt the ice without temperature change.',
      'Both will reach identical temperature because they start at 0°C.',
      'Neither will absorb heat energy.',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Run the Calorimetry simulation with identical energy inputs for ice and liquid water at 0°C.',
    nodeId: NODE_007,
  },
];

// Section 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question:
      'Observation: During the phase change from liquid water to steam at 100°C, what happens to the spacing between water molecules on the screen?',
    observableOptions: [
      'Molecules remain tightly packed with fixed positions.',
      'Intermolecular space increases dramatically (over 1000-fold expansion) as molecules escape cohesive forces.',
      'Molecules shrink individually to one-tenth of their original atomic size.',
      'Molecules fuse together into giant polymer networks.',
    ],
    correctIndex: 1,
    nodeId: NODE_002,
  },
  {
    question:
      'Observation: When heating a Bimetallic Strip made of Brass (higher expansion coefficient) and Iron (lower expansion coefficient) bonded together, toward which side does the strip bend?',
    observableOptions: [
      'It remains completely straight regardless of temperature.',
      'It bends toward the Iron side because Brass expands more and forces the strip to curve inward toward Iron.',
      'It bends toward the Brass side because Iron expands more.',
      'It snaps into two separate metal pieces instantly.',
    ],
    correctIndex: 1,
    nodeId: NODE_008,
  },
];

// Section 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Cryogenic Storage & High-Pressure Pipeline Engineering Task',
  description:
    'You are designing a liquid nitrogen transport pipeline and thermal expansion compensation loop for an industrial cryogenic plant operating between -196°C and +40°C.',
  steps: [
    'Step 1: Calculate the total thermal expansion ΔL of a 50-meter steel pipe using formula ΔL = L₀ × α × ΔT where α = 12 × 10⁻⁶ /°C and ΔT = 236°C.',
    'Step 2: Calculate pipe elongation: ΔL = 50 m × (12 × 10⁻⁶) × 236 = 0.1416 meters (14.16 cm).',
    'Step 3: Design expansion loops (U-bends) capable of absorbing 14.16 cm of physical displacement without structural shear stress.',
    'Step 4: Verify pressure release valves to handle latent heat absorption during emergency vacuum insulation breach to prevent catastrophic boiling overpressure.',
  ],
};

// Misconceptions list for reference and challenge tagging
const MISCONCEPTIONS_DATA = [
  {
    id: 'm1',
    title: 'Believing Evaporation Occurs Only at the Boiling Point',
    correction:
      'Evaporation is a surface phenomenon occurring continuously at all temperatures below boiling point, whereas boiling is a bulk phenomenon occurring at a fixed boiling point.',
  },
  {
    id: 'm2',
    title: 'Assuming Temperature Rises Continuously During Phase Transitions',
    correction:
      'Temperature remains strictly constant during phase transitions because heat energy (latent heat) is consumed exclusively to overcome intermolecular cohesive forces.',
  },
  {
    id: 'm3',
    title: 'Thinking Water Droplets Outside Cold Glass Leak from Inside',
    correction:
      'Water droplets on cold glasses condense from atmospheric water vapor losing kinetic energy upon contacting the cold surface.',
  },
  {
    id: 'm4',
    title: 'Believing Sublimation Involves an Unseen Microscopic Liquid Phase',
    correction:
      'Sublimation directly converts solid to gas without passing through any intermediate liquid state due to weak intermolecular forces and high room-temp vapor pressure.',
  },
  {
    id: 'm5',
    title: 'Mistaking Individual Particle Expansion for Volume Expansion Upon Heating',
    correction:
      'Individual atoms/molecules DO NOT expand in size during heating; particle kinetic energy increases, causing greater inter-particle separation and larger macroscopic volume.',
  },
  {
    id: 'm6',
    title: 'Confusing Heat with Temperature',
    correction:
      'Heat is the total internal energy transferred due to temperature difference, whereas temperature is a measure of average kinetic energy per particle.',
  },
];

// Types definition
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-sort' | 'numeric-input' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// Section 7: 22+ CHALLENGES (Foundation: 7, Standard: 8, Advanced: 7)
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'c1',
    nodeId: NODE_001,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Kinetic Molecular Theory, what happens to average particle kinetic energy when temperature increases?',
    options: [
      'Kinetic energy remains constant',
      'Kinetic energy increases proportionally with absolute temperature',
      'Kinetic energy drops to zero',
      'Kinetic energy fluctuates unpredictably'
    ],
    correctIndex: 1,
    explanation: 'Temperature is a direct measure of the average kinetic energy of the constituent particles of a substance.',
    hints: [
      'Think about what happens to molecule speed when you heat a gas.',
      'Higher temperature means molecules move faster.',
      'Average Kinetic Energy = (3/2) * k * T.'
    ]
  },
  {
    id: 'c2',
    nodeId: NODE_002,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which state of matter possesses the strongest intermolecular forces and smallest intermolecular space?',
    options: ['Gas', 'Liquid', 'Solid', 'Plasma'],
    correctIndex: 2,
    explanation: 'In solids, particles are tightly bound in fixed positions by strong attractive forces, leaving minimal intermolecular space.',
    hints: [
      'Consider which state has fixed shape and fixed volume.',
      'Solids hold their structure due to tightly locked molecules.',
      'Intermolecular space is smallest in solids.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_003,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the process called when a liquid changes into a solid at a fixed temperature?',
    options: ['Vaporization', 'Solidification / Freezing', 'Sublimation', 'Condensation'],
    correctIndex: 1,
    explanation: 'Solidification (or freezing) is the transition from liquid state to solid state upon cooling at a specific freezing point.',
    hints: [
      'Think about water turning into ice in a freezer.',
      'The process turns liquid into solid.',
      'Also known as freezing.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_004,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Where does evaporation take place in a liquid, and at what temperature?',
    options: [
      'Throughout the bulk liquid, only at boiling point',
      'At the surface of liquid, at all temperatures below boiling point',
      'At the bottom of container, only at 0°C',
      'At the center of liquid, only under high pressure'
    ],
    correctIndex: 1,
    explanation: 'Evaporation is a surface phenomenon that occurs continuously at all temperatures below the boiling point.',
    hints: [
      'Wet clothes dry at room temperature without boiling water.',
      'It happens only at the exposed liquid surface.',
      'Evaporation occurs at all temperatures below boiling.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c5',
    nodeId: NODE_005,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which phase transition occurs when water vapor touches a cold mirror surface and forms liquid droplets?',
    options: ['Melting', 'Condensation', 'Sublimation', 'Vaporization'],
    correctIndex: 1,
    explanation: 'Condensation occurs when a gas loses thermal energy and transforms into a liquid.',
    hints: [
      'The gas loses heat when touching cold glass.',
      'Gaseous water vapor turns to liquid droplets.',
      'This is called condensation.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c6',
    nodeId: NODE_006,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following substances undergoes sublimation when heated at atmospheric pressure?',
    options: ['Sodium Chloride (Table Salt)', 'Ammonium Chloride', 'Water', 'Copper Oxide'],
    correctIndex: 1,
    explanation: 'Ammonium Chloride (NH₄Cl), Iodine, Camphor, Naphthalene, and Dry Ice directly sublime from solid to gas.',
    hints: [
      'Recall substances used in ICSE lab funnel heating experiment.',
      'It skips the liquid phase upon heating.',
      'Ammonium Chloride (NH₄Cl) sublimes easily.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c7',
    nodeId: NODE_008,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a solid metallic sphere is heated, why does its volume expand?',
    options: [
      'The individual atoms expand and swell in size',
      'Particles gain kinetic energy, vibrate faster, and move slightly further apart',
      'New atoms are created inside the sphere',
      'Air molecules enter into atomic nucleus'
    ],
    correctIndex: 1,
    explanation: 'Atoms themselves DO NOT expand. Increased kinetic energy causes larger atomic vibrations, pushing average inter-particle spacing outward.',
    hints: [
      'Do individual atoms change size?',
      'Atoms vibrate with greater amplitude.',
      'Greater intermolecular distance causes volume expansion.'
    ],
    misconceptionIndex: 4
  },

  // --- STANDARD (8) ---
  {
    id: 'c8',
    nodeId: NODE_007,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does temperature remain constant during the boiling of pure water, even though heat is continuously supplied by the burner?',
    options: [
      'The burner stops emitting heat energy',
      'Supplied heat energy is consumed as Latent Heat of Vaporization to overcome intermolecular bonds',
      'Water reflects all incoming thermal radiation back into burner',
      'Thermometer stops working above 90°C'
    ],
    correctIndex: 1,
    explanation: 'During boiling, thermal energy is used exclusively to break intermolecular cohesive bonds (latent heat), so average kinetic energy (and temperature) stays constant.',
    hints: [
      'What happens to potential energy during a state change?',
      'Latent heat is absorbed without kinetic energy gain.',
      'Energy goes into breaking intermolecular liquid bonds.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c9',
    nodeId: NODE_004,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which combination of environmental factors produces the HIGHEST rate of evaporation from a wet surface?',
    options: [
      'Low temperature, high humidity, no wind, small surface area',
      'High temperature, low humidity, high wind speed, large surface area',
      'High humidity, low temperature, large surface area, zero wind',
      'Low temperature, high humidity, strong wind, small surface area'
    ],
    correctIndex: 1,
    explanation: 'Evaporation increases with higher temperature (more kinetic energy), lower atmospheric humidity (steeper concentration gradient), higher wind speed (removes vapor), and larger surface area.',
    hints: [
      'Think about when wet clothes dry fastest outdoors.',
      'Hot, dry, windy days dry clothes quickly.',
      'Maximize temperature, surface area, and wind while minimizing humidity.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_008,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Small gaps are deliberately left between consecutive steel rails on railway tracks. What is the precise scientific reason for this?',
    options: [
      'To save cost on steel manufacturing',
      'To allow thermal expansion of steel during hot summer days without buckling the tracks',
      'To allow rain water to drain away into soil',
      'To improve train wheel friction sound'
    ],
    correctIndex: 1,
    explanation: 'Solids undergo linear thermal expansion when exposed to high summer temperatures. Gaps accommodate expansion, preventing mechanical stress and rail warping.',
    hints: [
      'What happens to long steel tracks in hot weather?',
      'Steel undergoes expansion when heated.',
      'Gaps allow space for expansion without bending.'
    ]
  },
  {
    id: 'c11',
    nodeId: NODE_002,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare liquid water at 100°C and steam at 100°C. Which statement regarding internal potential energy and thermal burn severity is correct?',
    options: [
      'Liquid water at 100°C contains more internal energy and causes worse burns',
      'Steam at 100°C possesses extra energy equal to Latent Heat of Vaporization (2260 J/g) and causes far more severe burns',
      'Both possess identical internal energy and cause identical burns',
      'Steam is cooler because gas particles expand'
    ],
    correctIndex: 1,
    explanation: 'Steam at 100°C contains 2260 J/g of additional latent heat energy absorbed during vaporization. Upon condensing on skin, it releases this extra energy, causing severe burns.',
    hints: [
      'How much extra heat energy does steam absorb to vaporize?',
      'Latent heat of vaporization for water is 2260 J/g.',
      'Steam releases this latent heat upon touching skin.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_006,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the reverse process of sublimation called, where gas converts directly to solid without becoming liquid?',
    options: ['Condensation', 'Evaporation', 'Deposition (or Desublimation)', 'Liquefaction'],
    correctIndex: 2,
    explanation: 'Deposition (desublimation) is the direct thermodynamic transition from gas phase to solid phase, such as frost forming on freezing cold glass.',
    hints: [
      'Direct gas -> solid conversion.',
      'Examples include frost formation on ice cold windshields.',
      'It is termed Deposition or Desublimation.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_003,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When pure water freezes into ice at 0°C, what unusual volume change occurs due to anomalous expansion of water?',
    options: [
      'Volume decreases by 50%',
      'Volume increases (density decreases), causing ice to float on water',
      'Volume remains completely constant',
      'Volume drops to absolute zero'
    ],
    correctIndex: 1,
    explanation: 'Water exhibits anomalous behavior: as it freezes into ice, an open cage-like hydrogen-bonded crystal lattice forms, causing volume to expand by ~9% and density to decrease.',
    hints: [
      'Does ice float or sink in water?',
      'Ice floats because it is less dense than liquid water.',
      'Water expands upon freezing due to its open hexagonal lattice.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_007,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On a temperature-time heating curve for ice starting at -20°C going to steam at 120°C, how many flat (zero-slope) plateau segments are observed?',
    options: ['0 plateaus', '1 plateau', '2 plateaus (at 0°C and 100°C)', '4 plateaus'],
    correctIndex: 2,
    explanation: 'Two plateaus occur: one at 0°C (Latent heat of fusion / melting) and one at 100°C (Latent heat of vaporization / boiling).',
    hints: [
      'How many phase transitions take place between solid ice and gaseous steam?',
      'Solid->Liquid and Liquid->Gas transitions both exhibit constant temperature.',
      'Hence, exactly 2 horizontal plateaus exist.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_005,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does sweating cool the human body during hot weather or strenuous exercise?',
    options: [
      'Sweat liquid is naturally colder than body core temperature',
      'Evaporating sweat molecules absorb latent heat of vaporization from skin, leaving remaining surface cooler',
      'Sweat reacts chemically with air to produce ice crystals',
      'Sweat blocks infrared radiation from entering body'
    ],
    correctIndex: 1,
    explanation: 'High-energy surface water molecules escape as vapor, carrying away latent heat of vaporization from the skin, resulting in evaporative cooling.',
    hints: [
      'Which water molecules evaporate first?',
      'The highest kinetic energy molecules escape.',
      'Loss of energetic molecules lowers average kinetic energy (temperature) of remaining skin.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'c16',
    nodeId: NODE_007,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Calculate total heat energy required to convert 200 grams of ice at 0°C completely into liquid water at 0°C. (Specific Latent Heat of Fusion of ice L_f = 336 J/g).',
    options: ['67,200 Joules', '33,600 Joules', '1,680 Joules', '672,000 Joules'],
    correctIndex: 0,
    explanation: 'Heat Q = m × L_f = 200 g × 336 J/g = 67,200 Joules.',
    hints: [
      'Formula: Q = m * L_f',
      'm = 200 g, L_f = 336 J/g',
      '200 * 336 = 67,200 J'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_008,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Bimetallic Strip is composed of Brass (linear thermal expansion coefficient α_brass = 19 × 10⁻⁶ /°C) and Iron (α_iron = 12 × 10⁻⁶ /°C) riveted together. What happens when the strip is cooled in liquid nitrogen (-196°C)?',
    options: [
      'It remains straight because cooling produces no movement',
      'It bends toward the Brass side because Brass contracts more than Iron upon cooling',
      'It bends toward the Iron side',
      'It disintegrates into gas instantly'
    ],
    correctIndex: 1,
    explanation: 'Since Brass has a higher expansion coefficient, it expands more on heating AND contracts more on cooling than Iron. Upon cooling, Brass shortens faster, forcing the strip to curve toward Brass.',
    hints: [
      'Higher alpha means greater expansion on heating and greater contraction on cooling.',
      'Brass contracts more than Iron when cooled.',
      'The shorter side on cooling is Brass, so it bends toward Brass.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_004,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At high altitudes (e.g., Mount Everest peak, atmospheric pressure ~33 kPa), pure water boils at ~70°C instead of 100°C. Why is it difficult to cook food by boiling water at mountain high altitudes?',
    options: [
      'Water boils faster so food cooks too quickly and burns',
      'Water boils at lower temperature (70°C), so insufficient thermal energy is transferred to food despite vigorous boiling',
      'Atmospheric oxygen destroys food protein',
      'Water freezes instantly at high altitudes'
    ],
    correctIndex: 1,
    explanation: 'Boiling occurs when saturated vapor pressure equals external atmospheric pressure. At lower atmospheric pressure, boiling occurs at lower temperature (70°C), which is insufficient to cook starch and protein efficiently.',
    hints: [
      'What temperature is water boiling at on Everest peak?',
      'Water boils at 70°C because external atmospheric pressure is low.',
      '70°C liquid water is not hot enough to cook many foods rapidly.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_007,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the Latent Heat of Vaporization of water (2260 J/g) nearly 7 times GREATER than its Latent Heat of Fusion (336 J/g)?',
    options: [
      'Melting requires breaking all covalent bonds inside water molecule',
      'Melting only slightly relaxes the solid crystal structure, whereas vaporization requires complete separation of molecules against strong attractive forces into gas state',
      'Vaporization creates hydrogen gas and oxygen gas',
      'Ice is denser than liquid water'
    ],
    correctIndex: 1,
    explanation: 'Fusion only breaks fixed lattice geometry allowing molecules to slide over each other. Vaporization requires overcoming ALL intermolecular attractions to separate molecules completely into gas phase, consuming vastly more work/energy.',
    hints: [
      'Consider the change in distance between molecules from solid->liquid vs liquid->gas.',
      'Liquid molecules are still touching each other.',
      'Gas molecules must be completely separated against attractive forces.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_006,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Solid carbon dioxide (Dry Ice) sublimes at -78.5°C at 1 atm. Why does dry ice NOT melt into liquid carbon dioxide at normal room atmospheric pressure?',
    options: [
      'Carbon dioxide contains no electrons',
      'Its triple point pressure (5.1 atm) is well above normal atmospheric pressure (1 atm), making liquid CO₂ impossible at 1 atm',
      'Dry ice is made of plastic',
      'Atmospheric nitrogen absorbs liquid CO₂'
    ],
    correctIndex: 1,
    explanation: 'The triple point of CO₂ is 5.11 atm and -56.6°C. At pressures below 5.11 atm (such as 1 atm room pressure), liquid CO₂ cannot exist in thermodynamic equilibrium, so it sublimes directly.',
    hints: [
      'Check the phase diagram property called Triple Point.',
      'Triple point pressure of CO₂ is 5.1 atm.',
      'At 1 atm pressure below triple point pressure, solid transforms directly to gas.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_008,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 100-meter copper wire at 20°C is heated to 120°C. If linear expansion coefficient α_copper = 17 × 10⁻⁶ /°C, what is the new total length of the wire?',
    options: ['100.17 meters', '100.017 meters', '101.7 meters', '100.0017 meters'],
    correctIndex: 0,
    explanation: 'ΔL = L₀ × α × ΔT = 100 m × (17 × 10⁻⁶ /°C) × (120 - 20 °C) = 100 × 17 × 10⁻⁶ × 100 = 0.17 meters. Total length = 100 + 0.17 = 100.17 m.',
    hints: [
      'Formula: ΔL = L₀ * α * ΔT',
      'ΔT = 120 - 20 = 100°C',
      'ΔL = 100 * 17e-6 * 100 = 0.17 m. Total L = 100 + 0.17 = 100.17 m.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_001,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In terms of kinetic molecular theory, why does Brownian Motion of smoke particles suspended in air become MORE rapid when the surrounding air temperature is increased?',
    options: [
      'Smoke particles produce their own heat engine',
      'Air molecules move with higher average velocity at higher temperature, bombarding smoke particles with greater momentum per collision',
      'Air density increases dramatically',
      'Gravity decreases as temperature rises'
    ],
    correctIndex: 1,
    explanation: 'Brownian motion is driven by random thermal collisions from surrounding air molecules. Higher temperature increases air molecule RMS speed, delivering greater impulse during collisions.',
    hints: [
      'What drives Brownian motion of visible suspended smoke particles?',
      'Invisible air molecules collide randomly with smoke particles.',
      'Higher temperature increases air molecule kinetic energy and momentum transferred per collision.'
    ]
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// 1. Interactive Heating Curve SVG
const HeatingCurveSVG: React.FC<{
  currentTemp: number;
  heatEnergy: number;
  substance: string;
}> = ({ currentTemp, heatEnergy }) => {
  return (
    <div className="w-full flex flex-col items-center bg-slate-900/90 rounded-xl p-4 border border-gold-500/30 text-white">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
        Thermodynamic Heating Curve Diagram (Temp vs Heat Energy)
      </h4>
      <svg viewBox="0 0 500 280" className="w-full max-w-lg h-auto overflow-visible">
        {/* Grid lines */}
        <line x1="50" y1="230" x2="470" y2="230" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="230" stroke="#475569" strokeWidth="2" />

        {/* Axis Labels */}
        <text x="250" y="265" fill="#94a3b8" fontSize="11" textAnchor="middle">
          Heat Energy Supplied (Joules) →
        </text>
        <text
          x="15"
          y="130"
          fill="#94a3b8"
          fontSize="11"
          textAnchor="middle"
          transform="rotate(-90 15 130)"
        >
          Temperature (°C) →
        </text>

        {/* Temperature ticks */}
        <text x="40" y="235" fill="#64748b" fontSize="10" textAnchor="end">
          -20°C
        </text>
        <text x="40" y="185" fill="#38bdf8" fontSize="10" textAnchor="end">
          0°C (Melting)
        </text>
        <text x="40" y="95" fill="#f43f5e" fontSize="10" textAnchor="end">
          100°C (Boiling)
        </text>

        {/* Dotted threshold lines */}
        <line
          x1="50"
          y1="180"
          x2="470"
          y2="180"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line
          x1="50"
          y1="90"
          x2="470"
          y2="90"
          stroke="#e11d48"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Heating Curve Polyline */}
        {/* Solid ice warming: (50,220) to (110,180) */}
        {/* Melting plateau: (110,180) to (210,180) */}
        {/* Liquid water warming: (210,180) to (280,90) */}
        {/* Vaporization plateau: (280,90) to (430,90) */}
        {/* Steam heating: (430,90) to (460,40) */}
        <polyline
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="50,220 110,180 210,180 280,90 430,90 460,40"
        />

        {/* Segment Labels */}
        <text x="75" y="210" fill="#cbd5e1" fontSize="9" fontWeight="bold">
          Solid Ice
        </text>
        <text x="135" y="172" fill="#38bdf8" fontSize="9" fontWeight="bold">
          Solid + Liquid (Latent Heat Fusion)
        </text>
        <text x="225" y="145" fill="#cbd5e1" fontSize="9" fontWeight="bold">
          Liquid Water
        </text>
        <text x="310" y="82" fill="#f43f5e" fontSize="9" fontWeight="bold">
          Liquid + Gas (Latent Heat Vaporization)
        </text>
        <text x="435" y="60" fill="#cbd5e1" fontSize="9" fontWeight="bold">
          Steam Gas
        </text>

        {/* Dynamic Indicator Dot on Curve */}
        {(() => {
          // calculate dot coordinates based on temp (-20 to 120)
          let cx = 50;
          let cy = 220;
          if (currentTemp <= 0) {
            const frac = (currentTemp + 20) / 20;
            cx = 50 + frac * 60;
            cy = 220 - frac * 40;
          } else if (currentTemp === 0 && heatEnergy < 336) {
            const frac = heatEnergy / 336;
            cx = 110 + frac * 100;
            cy = 180;
          } else if (currentTemp < 100) {
            const frac = currentTemp / 100;
            cx = 210 + frac * 70;
            cy = 180 - frac * 90;
          } else if (currentTemp === 100 && heatEnergy < 2260) {
            const frac = heatEnergy / 2260;
            cx = 280 + frac * 150;
            cy = 90;
          } else {
            const frac = Math.min(1, (currentTemp - 100) / 40);
            cx = 430 + frac * 30;
            cy = 90 - frac * 50;
          }
          return (
            <g>
              <circle cx={cx} cy={cy} r="7" fill="#f59e0b" className="animate-ping" opacity="0.7" />
              <circle cx={cx} cy={cy} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text
                x={cx}
                y={cy - 12}
                fill="#f59e0b"
                fontSize="10"
                fontWeight="bold"
                textAnchor="middle"
              >
                {Math.round(currentTemp)}°C
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
};

// 2. Intermolecular Forces & Molecular Lattice SVG
const IntermolecularForcesSVG: React.FC<{ stateOfMatter: 'solid' | 'liquid' | 'gas' }> = ({
  stateOfMatter,
}) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-gold-500/30 text-white flex flex-col items-center">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">
        Microscopic Intermolecular Distance & Force Potential Diagram
      </h4>
      <svg viewBox="0 0 450 200" className="w-full max-w-md h-auto">
        {/* Solid state representation */}
        <g transform="translate(20,20)">
          <rect
            x="0"
            y="0"
            width="120"
            height="140"
            fill="#1e293b"
            stroke={stateOfMatter === 'solid' ? '#38bdf8' : '#334155'}
            strokeWidth={stateOfMatter === 'solid' ? '3' : '1'}
            rx="8"
          />
          <text x="60" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            SOLID
          </text>
          {/* Rigid Grid of particles */}
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <g key={`s-${row}-${col}`}>
                <circle cx={30 + col * 30} cy={45 + row * 30} r="10" fill="#0284c7" />
                {/* Springs between particles */}
                {col < 2 && (
                  <line
                    x1={30 + col * 30 + 10}
                    y1={45 + row * 30}
                    x2={30 + (col + 1) * 30 - 10}
                    y2={45 + row * 30}
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="2 2"
                  />
                )}
              </g>
            ))
          )}
          <text x="60" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">
            Strong Force / Fixed Lattice
          </text>
        </g>

        {/* Liquid state representation */}
        <g transform="translate(165,20)">
          <rect
            x="0"
            y="0"
            width="120"
            height="140"
            fill="#1e293b"
            stroke={stateOfMatter === 'liquid' ? '#06b6d4' : '#334155'}
            strokeWidth={stateOfMatter === 'liquid' ? '3' : '1'}
            rx="8"
          />
          <text x="60" y="20" fill="#06b6d4" fontSize="11" fontWeight="bold" textAnchor="middle">
            LIQUID
          </text>
          {/* Random close arrangement */}
          <circle cx="35" cy="100" r="10" fill="#0891b2" />
          <circle cx="55" cy="95" r="10" fill="#0891b2" />
          <circle cx="75" cy="105" r="10" fill="#0891b2" />
          <circle cx="45" cy="75" r="10" fill="#0891b2" />
          <circle cx="68" cy="78" r="10" fill="#0891b2" />
          <circle cx="30" cy="55" r="10" fill="#0891b2" />
          <circle cx="85" cy="60" r="10" fill="#0891b2" />
          <text x="60" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">
            Moderate Force / Fluid Movement
          </text>
        </g>

        {/* Gas state representation */}
        <g transform="translate(310,20)">
          <rect
            x="0"
            y="0"
            width="120"
            height="140"
            fill="#1e293b"
            stroke={stateOfMatter === 'gas' ? '#f43f5e' : '#334155'}
            strokeWidth={stateOfMatter === 'gas' ? '3' : '1'}
            rx="8"
          />
          <text x="60" y="20" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">
            GAS
          </text>
          <circle cx="20" cy="40" r="8" fill="#e11d48" />
          <line x1="20" y1="40" x2="35" y2="25" stroke="#f43f5e" strokeWidth="1.5" />
          <circle cx="100" cy="50" r="8" fill="#e11d48" />
          <line x1="100" y1="50" x2="80" y2="65" stroke="#f43f5e" strokeWidth="1.5" />
          <circle cx="40" cy="110" r="8" fill="#e11d48" />
          <line x1="40" y1="110" x2="60" y2="100" stroke="#f43f5e" strokeWidth="1.5" />
          <circle cx="90" cy="105" r="8" fill="#e11d48" />
          <line x1="90" y1="105" x2="105" y2="120" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="60" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">
            Negligible Force / High Kinetic E
          </text>
        </g>
      </svg>
    </div>
  );
};

// 3. Sublimation Inverted Funnel Apparatus SVG
const SublimationApparatusSVG: React.FC<{ heatingActive: boolean }> = ({ heatingActive }) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-emerald-500/30 text-white flex flex-col items-center">
      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
        ICSE Sublimation Apparatus (Ammonium Chloride NH₄Cl Purification)
      </h4>
      <svg viewBox="0 0 400 260" className="w-full max-w-sm h-auto">
        {/* Bunsen Burner */}
        <path d="M170,240 L230,240 L220,200 L180,200 Z" fill="#475569" />
        <rect x="195" y="170" width="10" height="30" fill="#94a3b8" />
        {/* Flame */}
        {heatingActive && (
          <g className="animate-pulse">
            <path
              d="M200,170 Q185,140 200,120 Q215,140 200,170 Z"
              fill="#f59e0b"
              opacity="0.9"
            />
            <path
              d="M200,170 Q192,150 200,135 Q208,150 200,170 Z"
              fill="#ef4444"
              opacity="0.9"
            />
          </g>
        )}

        {/* Wire Gauze & Tripod Stand */}
        <line x1="120" y1="170" x2="280" y2="170" stroke="#cbd5e1" strokeWidth="4" />
        <line x1="140" y1="170" x2="110" y2="250" stroke="#64748b" strokeWidth="4" />
        <line x1="260" y1="170" x2="290" y2="250" stroke="#64748b" strokeWidth="4" />

        {/* China Dish */}
        <path
          d="M130,170 C130,195 270,195 270,170 Z"
          fill="#e2e8f0"
          stroke="#94a3b8"
          strokeWidth="2"
        />

        {/* Solid Mixture inside China dish */}
        <path d="M140,172 C140,185 260,185 260,172 Z" fill="#a855f7" />

        {/* Inverted Glass Funnel */}
        <path
          d="M150,168 L190,60 L210,60 L250,168 Z"
          fill="rgba(56, 189, 248, 0.15)"
          stroke="#38bdf8"
          strokeWidth="2"
        />

        {/* Cotton Plug at top of funnel stem */}
        <ellipse cx="200" cy="58" rx="12" ry="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="200" y="48" fill="#cbd5e1" fontSize="9" textAnchor="middle">
          Cotton Plug
        </text>

        {/* Vapors inside funnel */}
        {heatingActive && (
          <g className="animate-pulse">
            <ellipse
              cx="200"
              cy="130"
              rx="25"
              ry="10"
              fill="#c084fc"
              opacity="0.5"
            />
            <ellipse
              cx="200"
              cy="100"
              rx="15"
              ry="8"
              fill="#c084fc"
              opacity="0.6"
            />
          </g>
        )}

        {/* Sublimated Solid Deposit on inner cold glass walls */}
        <path
          d="M165,130 L185,75 L180,75 L160,130 Z"
          fill="#f3e8ff"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <path
          d="M235,130 L215,75 L220,75 L240,130 Z"
          fill="#f3e8ff"
          stroke="#c084fc"
          strokeWidth="1"
        />
        <text x="285" y="100" fill="#c084fc" fontSize="9" fontWeight="bold">
          Sublimated Solid (Pure NH₄Cl)
        </text>

        {/* Dish Label */}
        <text x="80" y="185" fill="#a855f7" fontSize="9" fontWeight="bold">
          Mixture (NH₄Cl + Salt)
        </text>
      </svg>
    </div>
  );
};

// 4. Precision Dilatometer & Bimetallic Strip Expansion SVG
const ThermalExpansionSVG: React.FC<{
  temp: number;
  rodType: 'brass' | 'iron' | 'bimetallic';
}> = ({ temp, rodType }) => {
  const deltaT = Math.max(0, temp - 20);
  const expansionPixels = deltaT * 0.25;

  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-amber-500/30 text-white flex flex-col items-center">
      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
        Thermal Expansion Dilatometer & Bimetallic Bending Apparatus
      </h4>
      <svg viewBox="0 0 450 200" className="w-full max-w-md h-auto">
        {/* Support Blocks */}
        <rect x="30" y="100" width="30" height="60" fill="#475569" rx="4" />
        <rect x="380" y="100" width="30" height="60" fill="#475569" rx="4" />

        {/* Base Table */}
        <line x1="20" y1="160" x2="420" y2="160" stroke="#334155" strokeWidth="4" />

        {/* Linear Metal Rod Mode vs Bimetallic Mode */}
        {rodType !== 'bimetallic' ? (
          <g>
            {/* Standard Straight Metal Rod */}
            <rect
              x="60"
              y="115"
              width={280 + expansionPixels}
              height="16"
              fill={rodType === 'brass' ? '#f59e0b' : '#94a3b8'}
              stroke="#ffffff"
              strokeWidth="1"
              rx="2"
            />
            {/* Dial Gauge Indicator */}
            <circle cx="370" cy="123" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
            <line
              x1="370"
              y1="123"
              x2={370 + Math.sin((expansionPixels * Math.PI) / 10) * 18}
              y2={123 - Math.cos((expansionPixels * Math.PI) / 10) * 18}
              stroke="#ef4444"
              strokeWidth="2.5"
            />
            <circle cx="370" cy="123" r="3" fill="#ffffff" />
            <text x="370" y="158" fill="#38bdf8" fontSize="9" textAnchor="middle">
              Expansion: +{expansionPixels.toFixed(2)} mm
            </text>
          </g>
        ) : (
          <g>
            {/* Bimetallic Strip Curved Representation */}
            {/* Curve path calculated dynamically based on temp */}
            {(() => {
              const bendAmount = deltaT * 0.35;
              // Curved arc from x=60 to x=340
              const pathD = `M 60,115 Q 200,${115 + bendAmount} 340,115`;
              const pathD2 = `M 60,123 Q 200,${123 + bendAmount} 340,123`;
              return (
                <g>
                  {/* Brass strip (top - expands more) */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Iron strip (bottom - expands less) */}
                  <path
                    d={pathD2}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  {/* Rivet dots */}
                  <circle cx="100" cy={119 + bendAmount * 0.4} r="2" fill="#000" />
                  <circle cx="200" cy={119 + bendAmount * 1.0} r="2" fill="#000" />
                  <circle cx="300" cy={119 + bendAmount * 0.4} r="2" fill="#000" />

                  <text
                    x="200"
                    y={145 + bendAmount}
                    fill="#f59e0b"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    Brass (Outer Curve) vs Iron (Inner)
                  </text>
                </g>
              );
            })()}
          </g>
        )}

        {/* Heat Source under center */}
        <path d="M 190,180 L 210,180 L 200,165 Z" fill="#ef4444" />
        <text x="200" y="193" fill="#cbd5e1" fontSize="9" textAnchor="middle">
          Thermal Source ({temp}°C)
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// INTERACTIVE CANVAS SIMULATION COMPONENT
// ==========================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const MolecularSimulationCanvas: React.FC<{
  temperature: number; // -50 to 200
  attractionStrength: number; // 0 to 1
  containerState: 'solid' | 'liquid' | 'gas';
}> = ({ temperature, attractionStrength, containerState }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Create 40 molecules
    const particleCount = 42;
    const particles: Particle[] = [];

    // Initialize particles based on state
    for (let i = 0; i < particleCount; i++) {
      let x = Math.random() * (width - 40) + 20;
      let y = Math.random() * (height - 40) + 20;

      if (containerState === 'solid') {
        // Lattice grid formation
        const cols = 7;
        const row = Math.floor(i / cols);
        const col = i % cols;
        x = width / 2 - 90 + col * 28;
        y = height / 2 - 50 + row * 28;
      } else if (containerState === 'liquid') {
        // Settled toward bottom
        x = Math.random() * (width - 60) + 30;
        y = height - 30 - Math.random() * 80;
      }

      // Speed scaled by temperature (Kelvin proportional)
      const kelvin = Math.max(10, temperature + 273);
      const speedScale = Math.sqrt(kelvin) * 0.15;
      const vx = (Math.random() - 0.5) * speedScale;
      const vy = (Math.random() - 0.5) * speedScale;

      particles.push({
        x,
        y,
        vx,
        vy,
        radius: 7,
        color:
          containerState === 'solid'
            ? '#38bdf8'
            : containerState === 'liquid'
            ? '#06b6d4'
            : '#f43f5e',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Container Boundaries
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // Update and Draw Particles
      const speedMultiplier = Math.max(0.2, (temperature + 100) / 150);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (containerState === 'solid') {
          // Vibrational motion around fixed lattice origin
          const cols = 7;
          const row = Math.floor(i / cols);
          const col = i % cols;
          const originX = width / 2 - 90 + col * 28;
          const originY = height / 2 - 50 + row * 28;

          const jitter = (temperature + 60) * 0.03;
          p.x = originX + (Math.random() - 0.5) * jitter;
          p.y = originY + (Math.random() - 0.5) * jitter;
        } else {
          // Free kinetic motion
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          // Apply container wall collisions
          if (p.x - p.radius < 12) {
            p.x = 12 + p.radius;
            p.vx *= -1;
          }
          if (p.x + p.radius > width - 12) {
            p.x = width - 12 - p.radius;
            p.vx *= -1;
          }
          if (p.y - p.radius < 12) {
            p.y = 12 + p.radius;
            p.vy *= -1;
          }
          if (p.y + p.radius > height - 12) {
            p.y = height - 12 - p.radius;
            p.vy *= -1;
          }

          // Liquid state cohesion gravity toward bottom
          if (containerState === 'liquid') {
            p.vy += 0.05 * attractionStrength;
          }
        }

        // Render molecule circle with glow gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 1, p.x, p.y, p.radius);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.6, p.color);
        grad.addColorStop(1, 'rgba(0,0,0,0.4)');

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Draw intermolecular force bonds if solid/liquid
      if (containerState !== 'gas') {
        ctx.strokeStyle =
          containerState === 'solid' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(6, 182, 212, 0.2)';
        ctx.lineWidth = 1;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (containerState === 'solid' ? 35 : 25)) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Overlay status text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(
        `State: ${containerState.toUpperCase()} | Temp: ${temperature}°C | Avg KE: ${(
          1.5 *
          1.38 *
          (temperature + 273)
        ).toFixed(1)} x10⁻²³ J`,
        20,
        25
      );

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [temperature, attractionStrength, containerState]);

  return (
    <div className="flex flex-col items-center bg-slate-950 p-2 rounded-xl border border-slate-800 shadow-inner">
      <canvas ref={canvasRef} width={420} height={220} className="w-full h-auto rounded-lg" />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function C8_ChemistryMatterstatesandinterconversionrevisitedSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>(
    'discovery'
  );
  const [selectedLabIndex, setSelectedLabIndex] = useState<number>(0);

  // Interactive Lab Simulation State
  const [labTemp, setLabTemp] = useState<number>(25); // -50 to 200°C
  const [heatRate, setHeatRate] = useState<number>(50); // Watts energy rate
  const [simTime, setSimTime] = useState<number>(0);
  const [heatEnergyTotal, setHeatEnergyTotal] = useState<number>(0);
  const [expansionRodType, setExpansionRodType] = useState<'brass' | 'iron' | 'bimetallic'>(
    'brass'
  );
  const [substanceType, setSubstanceType] = useState<'water' | 'ammonium_chloride'>('water');
  const [isHeating, setIsHeating] = useState<boolean>(false);

  // Discovery Question State
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoveryRevealed, setDiscoveryRevealed] = useState<boolean>(false);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<'correct' | 'incorrect' | null>(
    null
  );
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [showHintBubble, setShowHintBubble] = useState<boolean>(false);

  // Audio / FX State Trigger
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT & SRS Tracking State
  const [bktMap, setBktMap] = useState<Record<string, BKTState>>(() => {
    const initialMap: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const initialMap: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createReviewItem(id);
    });
    return initialMap;
  });

  // Auto-hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset hint bubble when switching challenges
    setShowHintBubble(false);
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && challengeFeedback === null) {
        setShowHintBubble(true);
        audioManager.play('hint');
      }
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, activeTab, challengeFeedback]);

  // Derived state for Canvas particle state
  const stateOfMatter = useMemo(() => {
    if (substanceType === 'water') {
      if (labTemp < 0) return 'solid';
      if (labTemp < 100) return 'liquid';
      return 'gas';
    } else {
      // Ammonium chloride sublimes directly above 100°C
      if (labTemp < 100) return 'solid';
      return 'gas';
    }
  }, [labTemp, substanceType]);

  // Lab heating tick animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHeating && activeTab === 'lab') {
      interval = setInterval(() => {
        setSimTime((prev) => prev + 1);
        setHeatEnergyTotal((prev) => prev + heatRate * 2);

        setLabTemp((prev) => {
          // Heat capacity simulation with latent heat plateaus for water
          if (substanceType === 'water') {
            if (prev < 0) return Math.min(0, prev + 1.5);
            if (prev === 0 && heatEnergyTotal < 336) return 0; // Fusion plateau
            if (prev < 100) return Math.min(100, prev + 0.8);
            if (prev === 100 && heatEnergyTotal < 2260) return 100; // Vaporization plateau
            return Math.min(200, prev + 2.0);
          } else {
            return Math.min(200, prev + 1.8);
          }
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isHeating, activeTab, heatRate, heatEnergyTotal, substanceType]);

  // Handle Discovery Option Select
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryChoice(index);
    setDiscoveryRevealed(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent observation! Latent heat breaks intermolecular bonds.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Notice how temperature remains constant during phase changes.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeAnswer = (optionIdx: number) => {
    if (challengeFeedback !== null) return; // Prevent double submit

    setSelectedOption(optionIdx);
    const currChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = optionIdx === currChallenge.correctIndex;

    // Update BKT & SRS state
    const node = currChallenge.nodeId;
    const oldBKT = bktMap[node] || createBKTState();
    const newBKT = bktUpdate(oldBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [node]: newBKT }));

    const oldSRS = srsMap[node] || createReviewItem(node);
    const newSRS = sm2Update(oldSRS, isCorrect ? 5 : 2);
    setSrsMap((prev) => ({ ...prev, [node]: newSRS }));

    if (isCorrect) {
      setChallengeFeedback('correct');
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      audioManager.play('drop-correct');
      speechManager.speak('Correct answer! Fantastic understanding.');
      setShowSparkle(true);

      if (streak + 1 >= 3) {
        setShowConfetti(true);
        audioManager.play('celebration');
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      setChallengeFeedback('incorrect');
      setStreak(0);
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite. Review the explanation and hint.');
    }
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setChallengeFeedback(null);
    setShowHintBubble(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges!
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all thermal chemistry challenges!');

      const totalScore = Math.round((score / (CHALLENGES.length * 10)) * 100);
      recordGameScore('c8_chemistry_matter_states', totalScore);

      if (onComplete) {
        onComplete(totalScore);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 md:p-6 select-none flex flex-col items-center">
      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900/80 border border-slate-800 rounded-2xl p-4 mb-4 backdrop-blur flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-gold-500/30">
            🧪
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-200 to-gold-400">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">ICSE Class 8 Chemistry • Matter & Interconversion</p>
          </div>
        </div>

        {/* TOP TAB NAVIGATION */}
        <nav className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('discovery');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery'
                ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔍 Discovery
          </button>
          <button
            onClick={() => {
              setActiveTab('lab');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔬 Virtual Labs (5)
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎯 Challenges ({CHALLENGES.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('summary');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Mastery Summary
          </button>
        </nav>
      </header>

      {/* FEEDBACK BANNERS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Thermal Chemistry Unit Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl flex-1 flex flex-col gap-6">
        {/* ======================================================== */}
        {/* TAB 1: DISCOVERY & SCENARIO INTRO                      */}
        {/* ======================================================== */}
        {activeTab === 'discovery' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2 flex items-center gap-2">
                📜 Lab Context & Mission
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-sm text-slate-400 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </section>

            {/* PRE-DISCOVERY QUESTION */}
            <section className="bg-slate-900/90 border border-gold-500/30 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                ❓ Initial Discovery Challenge
              </h3>
              <p className="text-sm text-slate-200 font-medium mb-4">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl border text-left text-xs font-medium transition-all ${
                      discoveryChoice === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 hover:border-gold-500/50 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {discoveryRevealed && (
                <div className="bg-gold-950/60 border border-gold-500/40 p-4 rounded-xl text-xs text-gold-200 leading-relaxed animate-fadeIn">
                  <span className="font-bold block text-gold-300 mb-1">
                    💡 Microscopic Explanation:
                  </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </section>

            {/* PREDICTION QUESTIONS ARRAY MAP */}
            <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                🔮 Experimental Hypothesis Testing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400 bg-gold-950/80 px-2 py-0.5 rounded border border-gold-800 mb-2 inline-block">
                        Prediction #{pIdx + 1}
                      </span>
                      <p className="text-xs text-slate-200 font-semibold mb-3">{pq.question}</p>
                    </div>
                    <div className="text-[11px] text-amber-400/90 bg-amber-950/30 p-2.5 rounded-lg border border-amber-900/40 mt-2">
                      <span className="font-bold">Verification:</span> {pq.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: INTERACTIVE LABS & EXPERIMENTS                    */}
        {/* ======================================================== */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* LAB SELECTION TABS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((lab, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedLabIndex(index);
                    audioManager.play('tap');
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedLabIndex === index
                      ? 'bg-gold-950/80 border-gold-400 text-gold-200 shadow-lg shadow-gold-500/10'
                      : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
                    Lab 0{index + 1}
                  </span>
                  <span className="text-xs font-semibold line-clamp-2 mt-1">{lab.title}</span>
                </button>
              ))}
            </div>

            {/* ACTIVE LAB WORKSPACE CONTAINER */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
              <div className="bg-gold-950/40 border border-gold-500/30 p-4 rounded-xl flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <h3 className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                    {EXPLORATION_STEPS[selectedLabIndex].title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {EXPLORATION_STEPS[selectedLabIndex].instruction}
                  </p>
                </div>
              </div>

              {/* LAB 1 & 2 SIMULATION CANVAS + HEATING CURVE */}
              {(selectedLabIndex === 0 || selectedLabIndex === 1) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-3">
                    <MolecularSimulationCanvas
                      temperature={labTemp}
                      attractionStrength={substanceType === 'water' ? 0.8 : 0.3}
                      containerState={stateOfMatter}
                    />
                    {/* Controls */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Temperature Slider:</span>
                        <span className="text-gold-400 font-bold text-sm">{labTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="200"
                        value={labTemp}
                        onChange={(e) => setLabTemp(Number(e.target.value))}
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="flex items-center justify-between gap-2 pt-2">
                        <button
                          onClick={() => setIsHeating(!isHeating)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                            isHeating
                              ? 'bg-rose-600 text-white animate-pulse'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          }`}
                        >
                          {isHeating ? '🔥 Stop Thermal Energy Input' : '⚡ Start Heating Element'}
                        </button>
                        <button
                          onClick={() => {
                            setLabTemp(-20);
                            setHeatEnergyTotal(0);
                            setIsHeating(false);
                            audioManager.play('pop');
                          }}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold rounded-lg"
                        >
                          🔄 Reset
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <HeatingCurveSVG
                      currentTemp={labTemp}
                      heatEnergy={heatEnergyTotal}
                      substance={substanceType}
                    />
                    <IntermolecularForcesSVG stateOfMatter={stateOfMatter} />
                  </div>
                </div>
              )}

              {/* LAB 3: EVAPORATION VS BOILING */}
              {selectedLabIndex === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      Evaporation Rate Variable Controller
                    </h4>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        Liquid Surface Area Expansion:
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        defaultValue="50"
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 block mb-1">
                        Air Flow Speed (Wind Speed):
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="30"
                        className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                      <p className="font-bold text-gold-300 mb-1">Key Distinction:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <strong>Evaporation:</strong> Surface molecules with highest kinetic energy
                          escape at <em>any temperature</em>.
                        </li>
                        <li>
                          <strong>Boiling:</strong> Bulk vapor bubbles form throughout liquid at a
                          <em> fixed temperature</em> (100°C for water).
                        </li>
                      </ul>
                    </div>
                  </div>

                  <MolecularSimulationCanvas
                    temperature={labTemp}
                    attractionStrength={0.6}
                    containerState={labTemp >= 100 ? 'gas' : 'liquid'}
                  />
                </div>
              )}

              {/* LAB 4: SUBLIMATION APPARATUS */}
              {selectedLabIndex === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <SublimationApparatusSVG heatingActive={isHeating} />
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Sublimation Controls & Theory
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sublimation is the direct conversion of a solid into a gas without passing
                      through an intermediate liquid phase.
                    </p>
                    <button
                      onClick={() => setIsHeating(!isHeating)}
                      className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                        isHeating
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      {isHeating ? '🔥 Stop Burner' : '🔥 Ignite Bunsen Burner'}
                    </button>
                    <div className="bg-purple-950/40 border border-purple-500/30 p-3 rounded-lg text-xs text-purple-200">
                      <span className="font-bold block mb-1">Sublimable Substances:</span>
                      Ammonium Chloride (NH₄Cl), Camphor, Naphthalene, Solid CO₂ (Dry Ice), Iodine.
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: THERMAL EXPANSION */}
              {selectedLabIndex === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <ThermalExpansionSVG temp={labTemp} rodType={expansionRodType} />
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Linear Dilatometer Controls
                    </h4>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setExpansionRodType('brass')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          expansionRodType === 'brass'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Brass Rod (α=19e-6)
                      </button>
                      <button
                        onClick={() => setExpansionRodType('iron')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          expansionRodType === 'iron'
                            ? 'bg-slate-700/50 border-slate-400 text-slate-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Iron Rod (α=12e-6)
                      </button>
                      <button
                        onClick={() => setExpansionRodType('bimetallic')}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          expansionRodType === 'bimetallic'
                            ? 'bg-gold-500/20 border-gold-400 text-gold-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        Bimetallic Strip
                      </button>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Applied Thermal Temperature:</span>
                        <span className="font-bold text-amber-400">{labTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="200"
                        value={labTemp}
                        onChange={(e) => setLabTemp(Number(e.target.value))}
                        className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* OBSERVATION QUESTIONS MAP */}
              <div className="border-t border-slate-800 pt-4 mt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  👁️ Laboratory Observations Check
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                    <div
                      key={oIdx}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs"
                    >
                      <p className="font-semibold text-gold-300 mb-2">{oq.question}</p>
                      <ul className="space-y-1 text-slate-300">
                        {oq.observableOptions.map((opt, optIdx) => (
                          <li
                            key={optIdx}
                            className={`p-1.5 rounded ${
                              optIdx === oq.correctIndex
                                ? 'bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-800/40'
                                : 'text-slate-400'
                            }`}
                          >
                            • {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CHALLENGES & COMPETENCY ASSESSMENTS               */}
        {/* ======================================================== */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* PROGRESS & STREAK HEADER */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="text-amber-400 flex items-center gap-1">
                  🔥 Streak: {streak}
                </span>
                <span className="text-gold-400 flex items-center gap-1">
                  🏆 Score: {score}
                </span>
              </div>
            </div>

            {/* QUESTION CARD */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 relative">
              {/* Hint Bubble Component */}
              <HintBubble
                show={showHintBubble}
                text={
                  CHALLENGES[currentChallengeIndex].hints[
                    Math.min(hintsUsedCount, CHALLENGES[currentChallengeIndex].hints.length - 1)
                  ]
                }
              />

              <div>
                <h3 className="text-base md:text-lg font-bold text-white leading-relaxed mb-1">
                  {CHALLENGES[currentChallengeIndex].question}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Topic Node ID: {CHALLENGES[currentChallengeIndex].nodeId} • Competency:{' '}
                  {CHALLENGES[currentChallengeIndex].competencyLevel}
                </p>
              </div>

              {/* OPTIONS GRID */}
              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[currentChallengeIndex].options.map((optionText, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  const isCorrect = optIdx === CHALLENGES[currentChallengeIndex].correctIndex;

                  let btnStyle =
                    'bg-slate-950 border-slate-800 hover:border-gold-500/50 text-slate-200';
                  if (challengeFeedback !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={challengeFeedback !== null}
                      onClick={() => handleChallengeAnswer(optIdx)}
                      className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>
                        <strong className="mr-2 text-gold-400">
                          {String.fromCharCode(65 + optIdx)}.
                        </strong>
                        {optionText}
                      </span>
                      {challengeFeedback !== null && isCorrect && <span>✅</span>}
                      {challengeFeedback !== null && isSelected && !isCorrect && <span>❌</span>}
                    </button>
                  );
                })}
              </div>

              {/* EXPLANATION & ACTION BUTTONS */}
              {challengeFeedback !== null && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-3 animate-fadeIn">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-gold-400">Explanation:</strong>{' '}
                    {CHALLENGES[currentChallengeIndex].explanation}
                  </p>
                  <button
                    onClick={handleNextChallenge}
                    className="self-end px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1
                      ? 'Next Challenge ➡️'
                      : 'Complete Module 🎓'}
                  </button>
                </div>
              )}

              {/* HINT BUTTON */}
              {challengeFeedback === null && (
                <button
                  onClick={() => {
                    setShowHintBubble(true);
                    setHintsUsedCount((prev) => prev + 1);
                    audioManager.play('hint');
                  }}
                  className="self-start text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  💡 Request Lab Hint
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: MASTERY SUMMARY & REAL WORLD ACTIVITY             */}
        {/* ======================================================== */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* MASTERY OVERVIEW BY NODE */}
            <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                📊 ICSE Concept Mastery Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_NODE_IDS.map((nodeId) => {
                  const mastery = masteryProb(bktMap[nodeId]);
                  return (
                    <div
                      key={nodeId}
                      className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">
                          {nodeId}
                        </span>
                        <p className="text-xs font-bold text-slate-200">
                          {nodeId === NODE_001 && 'Kinetic Molecular Theory'}
                          {nodeId === NODE_002 && 'Intermolecular Forces & Space'}
                          {nodeId === NODE_003 && 'Melting & Freezing Dynamics'}
                          {nodeId === NODE_004 && 'Evaporation vs Boiling'}
                          {nodeId === NODE_005 && 'Condensation Processes'}
                          {nodeId === NODE_006 && 'Sublimation & Deposition'}
                          {nodeId === NODE_007 && 'Latent Heat Plateaus'}
                          {nodeId === NODE_008 && 'Thermal Expansion'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-gold-400">
                          {Math.round(mastery * 100)}%
                        </span>
                        <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                          <div
                            className="bg-gold-400 h-full transition-all duration-500"
                            style={{ width: `${mastery * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* REAL WORLD ACTIVITY SECTION */}
            <section className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-base font-bold text-emerald-400 mb-2 flex items-center gap-2">
                🏭 Real-World Extension Activity
              </h2>
              <h3 className="text-sm font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                {REAL_WORLD_ACTIVITY.steps.map((stepText, idx) => (
                  <div key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="font-bold text-emerald-400">{idx + 1}.</span>
                    <span>{stepText}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}