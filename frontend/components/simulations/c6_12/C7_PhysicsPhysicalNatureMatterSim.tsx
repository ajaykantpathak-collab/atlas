'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ICSE Class 7 Physics) ───
const NODE_C7_PHY_001 = 'c7_phy_001'; // Physical nature of matter
const NODE_C7_PHY_002 = 'c7_phy_002'; // Particle nature of matter
const NODE_C7_PHY_003 = 'c7_phy_003'; // Solid state - properties and particle arrangement
const NODE_C7_PHY_004 = 'c7_phy_004'; // Liquid state - properties and particle arrangement
const NODE_C7_PHY_005 = 'c7_phy_005'; // Gaseous state - properties and particle arrangement
const NODE_C7_PHY_006 = 'c7_phy_006'; // Interconversion of states of matter
const NODE_C7_PHY_007 = 'c7_phy_007'; // Density as mass per unit volume
const NODE_C7_PHY_008 = 'c7_phy_008'; // Relative density and floating/sinking
const NODE_C7_PHY_009 = 'c7_phy_009'; // Friction and factors affecting friction
const NODE_C7_PHY_010 = 'c7_phy_010'; // Increasing and reducing friction

const ALL_NODE_IDS = [
  NODE_C7_PHY_001,
  NODE_C7_PHY_002,
  NODE_C7_PHY_003,
  NODE_C7_PHY_004,
  NODE_C7_PHY_005,
  NODE_C7_PHY_006,
  NODE_C7_PHY_007,
  NODE_C7_PHY_008,
  NODE_C7_PHY_009,
  NODE_C7_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'ISRO Cryogenic & Rover Engineering Lab',
  intro: 'Welcome, Junior Scientist! At India\'s space research centre, our engineers are designing payloads for extreme lunar environments. You need to investigate the fundamental properties of matter, fluid density for fuel tanks, and friction on the rover wheels to ensure mission success.',
  context: 'From sub-zero liquid fuels to heat shields and wheel traction on lunar dust, mastering the particle nature of matter, density, and friction is essential.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An engineer pumps 500 mL of gaseous oxygen into an empty 200 mL rigid metal container. What will happen to the gas?',
  options: [
    'It will spill out because 500 mL is larger than 200 mL',
    'The gas particles compress into the 200 mL volume because of large interparticle spaces',
    'The gas immediately turns into solid ice due to container pressure',
    'The mass of the gas disappears to fit the smaller container',
  ],
  correctIndex: 1,
  hintAfter: 'Gases are mostly empty space between particles! Let us investigate particle theory, density, and friction interactively.',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c7_phy_001)
  {
    id: 'ch_01_matter_def',
    nodeId: NODE_C7_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following strictly qualifies as matter according to the laws of physics?',
    options: ['Sunlight entering through a window', 'The air trapped inside an inflated football', 'The shadow cast by a banyan tree', 'The heat radiating from an electric iron'],
    correctIndex: 1,
    explanation: 'Matter must occupy space and possess mass. Air inside a football occupies the internal volume and adds measurable mass on a balance. Light, shadow, and heat are forms of energy or optical absence, not matter.',
    hints: [
      'Think about which option has both mass and volume.',
      'Ask yourself: Can it be weighed on a physical balance and does it take up space?',
      'Air satisfies both criteria; heat, light, and shadows have zero mass.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (c7_phy_003 / 004 / 005)
  {
    id: 'ch_02_particle_arrange',
    nodeId: NODE_C7_PHY_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each state of matter to its correct particle arrangement description.',
    dragItems: [
      { label: 'Solid', targetId: 'box_solid' },
      { label: 'Liquid', targetId: 'box_liquid' },
      { label: 'Gas', targetId: 'box_gas' },
    ],
    correctMapping: {
      box_solid: 'Solid',
      box_liquid: 'Liquid',
      box_gas: 'Gas',
    },
    explanation: 'Solids feature tightly packed particles vibrating about fixed positions. Liquids have loosely packed particles that slide past one another. Gases have widely spaced particles in rapid, random motion.',
    hints: [
      'Which state has particles locked in an orderly lattice?',
      'Liquids have particles in contact that can slide.',
      'Gas particles are separated by vast empty gaps.',
    ],
  },
  // 3. Foundation - Classify Diffusion (c7_phy_002)
  {
    id: 'ch_03_diffusion_obs',
    nodeId: NODE_C7_PHY_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a crystal of potassium permanganate is placed at the bottom of a beaker of still water, the entire liquid turns purple without stirring. What does this demonstrate?',
    options: ['Matter is continuous and melts in water', 'Particles of matter are in constant random motion and possess interparticle spaces', 'Water particles push the crystal by gravitational force', 'The crystal expands into a single giant particle'],
    correctIndex: 1,
    explanation: 'Diffusion is the spontaneous spreading of particles from high to low concentration. This proves particles are in continuous random motion and move through the interparticle spaces of water.',
    hints: [
      'No stirring was applied; what makes the colour spread on its own?',
      'Particles move spontaneously through available gaps.',
      'This spontaneous movement is diffusion, proving particulate nature.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Numeric (c7_phy_007)
  {
    id: 'ch_04_density_calc',
    nodeId: NODE_C7_PHY_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An aluminium block has a mass of 270 g and a volume of 100 cm³. What is its density in g/cm³?',
    correctAnswer: 2.7,
    tolerance: 0.05,
    unit: 'g/cm³',
    explanation: 'Density = Mass / Volume. Here, d = 270 g / 100 cm³ = 2.7 g/cm³.',
    hints: [
      'Use the fundamental formula: Density = Mass ÷ Volume.',
      'Divide 270 by 100.',
      '270 / 100 = 2.7 g/cm³.',
    ],
  },
  // 5. Foundation - Floating rule (c7_phy_008)
  {
    id: 'ch_05_float_rule',
    nodeId: NODE_C7_PHY_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A substance has a relative density of 0.85. What happens when it is placed in pure water (density = 1.0 g/cm³)?',
    options: ['It sinks to the very bottom', 'It floats with a portion submerged', 'It dissolves instantly due to low density', 'It hovers in mid-air above the water'],
    correctIndex: 1,
    explanation: 'Any object with a relative density less than 1 (or density less than water) floats in water because the maximum upthrust exceeds its weight.',
    hints: [
      'Compare the relative density (0.85) to water (1.0).',
      'If Relative Density < 1, will it float or sink?',
      '0.85 is less than 1, so the object floats.',
    ],
  },
  // 6. Foundation - Friction Direction (c7_phy_009)
  {
    id: 'ch_06_friction_dir',
    nodeId: NODE_C7_PHY_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A wooden box is pushed towards the east across a rough floor. In which direction does the frictional force exerted by the floor act on the box?',
    options: ['Towards the East', 'Towards the West', 'Vertically upward', 'Vertically downward'],
    correctIndex: 1,
    explanation: 'Friction always opposes the relative motion between the contact surfaces. If the box moves East, friction acts West along the contact surface.',
    hints: [
      'Friction is an opposing contact force.',
      'If motion is to the right (East), opposition must push to the left.',
      'The opposite direction to East is West.',
    ],
  },
  // 7. Foundation - Drag sort phase transitions (c7_phy_006)
  {
    id: 'ch_07_phase_seq',
    nodeId: NODE_C7_PHY_006,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the processes in order of INCREASING thermal energy added to an ice cube:',
    sortItems: ['Solid Ice at -5°C', 'Melting at 0°C into Water', 'Liquid Water warming to 100°C', 'Boiling into Steam at 100°C'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Adding heat first warms the solid, melts it at 0°C, heats liquid water, and finally vaporises it at 100°C into steam.',
    hints: [
      'Start with the lowest temperature solid state.',
      'Melting occurs before heating water up to boiling point.',
      'Steam contains the highest kinetic energy among these stages.',
    ],
  },
  // 8. Standard - Syringe Compressibility (c7_phy_005)
  {
    id: 'ch_08_syringe_comp',
    nodeId: NODE_C7_PHY_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why can air inside a blocked syringe be easily compressed to half its volume, while water in the same syringe cannot?',
    options: [
      'Air particles are soft and elastic, whereas water particles are hard spheres',
      'Gases have huge interparticle spaces that can be squeezed, whereas liquid particles are already in close contact',
      'Air particles disappear under pressure, whereas water multiplies',
      'Air creates a vacuum that pulls the plunger inward',
    ],
    correctIndex: 1,
    explanation: 'Gases are mostly empty space between widely spaced particles. Compressing a gas merely reduces the empty space. Liquids have negligible interparticle gaps, making them virtually incompressible.',
    hints: [
      'Consider the microscopic distance between particles in gases vs liquids.',
      'Compression squeezes empty space, not the particles themselves.',
      'Gas particles have large gaps; liquid particles are touching.',
    ],
    misconceptionIndex: 2,
  },
  // 9. Standard - Application: Evaporation vs Boiling (c7_phy_006)
  {
    id: 'ch_09_evap_boil',
    nodeId: NODE_C7_PHY_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Clothes dry on a clothesline in Chennai at 32°C. Why is this evaporation and NOT boiling?',
    options: [
      'It takes place only at the surface and well below the boiling point (100°C)',
      'Water on clothes is chemically different from tap water',
      'Wind turns liquid water directly into ice particles which blow away',
      'Boiling happens in cold weather, while evaporation happens only at night',
    ],
    correctIndex: 0,
    explanation: 'Evaporation is a slow surface phenomenon occurring at any temperature below the boiling point. Boiling is a rapid, bulk phenomenon occurring at a fixed temperature (100°C for water).',
    hints: [
      'What is the boiling point of water at atmospheric pressure?',
      'Does the clothesline water reach 100°C?',
      'Since 32°C < 100°C and only surface molecules escape, it is evaporation.',
    ],
  },
  // 10. Standard - Numeric Density conversion (c7_phy_007)
  {
    id: 'ch_10_density_unit_conv',
    nodeId: NODE_C7_PHY_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The density of iron is 7.8 g/cm³. What is this density expressed in SI units (kg/m³)?',
    correctAnswer: 7800,
    tolerance: 10,
    unit: 'kg/m³',
    explanation: '1 g/cm³ = 1000 kg/m³. Therefore, 7.8 g/cm³ × 1000 = 7800 kg/m³.',
    hints: [
      'Recall that 1 g/cm³ = 1000 kg/m³.',
      'Multiply the value in g/cm³ by 1000.',
      '7.8 × 1000 = 7800.',
    ],
  },
  // 11. Standard - Ship vs Nail Evaluation (c7_phy_008)
  {
    id: 'ch_11_ship_vs_nail',
    nodeId: NODE_C7_PHY_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A solid iron nail sinks in water, but a massive steel aircraft carrier floats. What explains this?',
    options: [
      'The ship is lighter than the small iron nail in total mass',
      'The hollow shape of the ship traps large volumes of air, making its average density less than water',
      'Salt water has zero gravity on large metallic vessels',
      'The engines of the ship constantly push water downwards to prevent sinking',
    ],
    correctIndex: 1,
    explanation: 'Floatation depends on overall density (total mass / total volume). The ship encloses huge air-filled compartments, so its average density is less than 1.0 g/cm³, whereas a solid nail has a density of 7.8 g/cm³.',
    hints: [
      'Does floating depend on total weight alone or average density?',
      'Consider the hollow internal space containing air inside the ship.',
      'Total mass ÷ total volume (including air) is less than 1 g/cm³.',
    ],
    misconceptionIndex: 3,
  },
  // 12. Standard - Factors affecting friction (c7_phy_009)
  {
    id: 'ch_12_normal_force_friction',
    nodeId: NODE_C7_PHY_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A 2 kg wooden block requires 4 N of horizontal pull to slide. If a 3 kg iron weight is placed on top of the block, what happens to the frictional force and why?',
    options: [
      'Frictional force decreases because the block becomes smoother',
      'Frictional force increases because the normal force increases, pressing surface irregularities deeper into each other',
      'Frictional force remains unchanged because the contact surface area is identical',
      'Frictional force drops to zero as the surfaces fuse together',
    ],
    correctIndex: 1,
    explanation: 'Friction is directly proportional to the normal force pressing the surfaces together. Adding weight increases the normal force from ~20 N to ~50 N, driving microscopic irregularities into tighter interlocking.',
    hints: [
      'What happens to the pressing force when weight is added?',
      'Greater normal force pushes microscopic hills and valleys deeper together.',
      'Interlocking tightens, so frictional resistance increases.',
    ],
  },
  // 13. Standard - Ball Bearings Mechanism (c7_phy_010)
  {
    id: 'ch_13_ball_bearings',
    nodeId: NODE_C7_PHY_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why are ball bearings installed in bicycle wheel hubs and ceiling fans?',
    options: [
      'They make the metal softer so it bends easily',
      'They replace sliding friction with rolling friction, which is significantly smaller',
      'They eliminate friction completely to reach 100% efficiency',
      'They increase friction to stop the fan from spinning too fast',
    ],
    correctIndex: 1,
    explanation: 'Rolling friction is much smaller than sliding friction because surface points briefly touch and lift rather than rubbing. Ball bearings convert sliding contact into rolling contact.',
    hints: [
      'Compare pushing a crate vs rolling it on wheels.',
      'Rolling friction is far weaker than sliding friction.',
      'Ball bearings roll between the axle and hub.',
    ],
    misconceptionIndex: 4,
  },
  // 14. Standard - Construct formula for density (c7_phy_007)
  {
    id: 'ch_14_construct_density',
    nodeId: NODE_C7_PHY_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct formula to calculate the mass of a fuel tank given its density (d) and volume (V):',
    availableParts: ['m =', 'd', '×', 'V', '/', '+', 'd / V', 'V / d'],
    targetState: 'm = d × V',
    validationHint: 'Rearrange d = m / V to solve for mass (m).',
    explanation: 'Since Density (d) = Mass (m) / Volume (V), multiplying both sides by Volume gives: Mass (m) = Density (d) × Volume (V).',
    hints: [
      'Start with d = m / V.',
      'To isolate m, multiply both sides by V.',
      'The expression is m = d × V.',
    ],
  },
  // 15. Advanced - Sublimation Analysis (c7_phy_006)
  {
    id: 'ch_15_sublimation_camphor',
    nodeId: NODE_C7_PHY_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Solid camphor (kapoor) in a puja thali disappears over days without leaving any liquid puddle. What is this phenomenon and its kinetic explanation?',
    options: [
      'Melting followed by rapid boiling in a hidden layer',
      'Sublimation: surface molecules gain sufficient kinetic energy to break directly into the gaseous state',
      'Chemical decay into invisible subatomic light beams',
      'Deposition: the solid condenses into the metal plate',
    ],
    correctIndex: 1,
    explanation: 'Sublimation is the direct transition from solid to gas without entering the liquid phase. The intermolecular forces in camphor allow surface particles to escape directly as vapour.',
    hints: [
      'Notice that no liquid ever appears.',
      'Direct conversion of Solid → Gas is called sublimation.',
      'Molecules break free directly from lattice to gas.',
    ],
  },
  // 16. Advanced - Density of cylinder calculation (c7_phy_007)
  {
    id: 'ch_16_cylinder_density',
    nodeId: NODE_C7_PHY_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A solid metal cylinder has radius r = 2 cm, height h = 7 cm, and mass m = 616 g. Using π = 22/7, calculate its density in g/cm³.',
    correctAnswer: 7,
    tolerance: 0.1,
    unit: 'g/cm³',
    explanation: 'Volume V = π r² h = (22/7) × 2² × 7 = (22/7) × 4 × 7 = 88 cm³. Density d = m / V = 616 g / 88 cm³ = 7.0 g/cm³.',
    hints: [
      'First calculate cylinder volume using V = π × r² × h.',
      'V = (22/7) × 4 × 7 = 88 cm³.',
      'Density = 616 / 88 = 7 g/cm³.',
    ],
  },
  // 17. Advanced - Multi-liquid Relative Density (c7_phy_008)
  {
    id: 'ch_17_mercury_water_iron',
    nodeId: NODE_C7_PHY_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An iron sphere (density 7.8 g/cm³) is dropped into Water (1.0 g/cm³) and Mercury (13.6 g/cm³). What will happen?',
    options: [
      'It sinks in both water and mercury because it is made of heavy metal',
      'It sinks in water (7.8 > 1.0) but floats on mercury (7.8 < 13.6)',
      'It floats on water but sinks in mercury',
      'It dissolves in water and floats on mercury',
    ],
    correctIndex: 1,
    explanation: 'Floating/sinking depends on relative densities between the object and the specific liquid. Iron is denser than water (sinks), but less dense than liquid mercury (floats).',
    hints: [
      'Compare 7.8 with water\'s 1.0, and then 7.8 with mercury\'s 13.6.',
      '7.8 > 1.0 (sinks in water); 7.8 < 13.6 (floats in mercury).',
      'Floating is relative to the liquid\'s density, not absolute.',
    ],
  },
  // 18. Advanced - Walking & Friction Vector (c7_phy_009)
  {
    id: 'ch_18_walking_friction',
    nodeId: NODE_C7_PHY_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When an astronaut walks forward on lunar soil, in which direction does the frictional force on their boot act?',
    options: [
      'Backward, because friction always acts opposite to the human body\'s motion',
      'Forward, because the boot pushes backward against the ground, and friction opposes that backward tendency',
      'Downwards, pulling the astronaut into the soil',
      'Zero, because there is no air on the Moon',
    ],
    correctIndex: 1,
    explanation: 'To walk forward, your foot pushes backward against the ground. Friction opposes this backward sliding tendency by pushing the boot FORWARD, providing the forward propulsion.',
    hints: [
      'Which way does your shoe try to slide relative to the ground when stepping?',
      'The foot pushes backward, so the ground\'s friction pushes forward on your foot.',
      'Friction opposes relative slipping at the contact surface.',
    ],
    misconceptionIndex: 0,
  },
  // 19. Advanced - Streamlining & Fluid Drag (c7_phy_010)
  {
    id: 'ch_19_streamlining_eval',
    nodeId: NODE_C7_PHY_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The Indian Vande Bharat train and ISRO launch vehicles feature tapered, teardrop noses. How does streamlining reduce friction?',
    options: [
      'It makes the metal surface absorb air molecules permanently',
      'It allows air layers to flow smoothly around the body with minimal turbulence and drag resistance',
      'It cools the exterior to near absolute zero to eliminate friction',
      'It decreases the mass of the train as velocity increases',
    ],
    correctIndex: 1,
    explanation: 'Streamlining shapes the body so fluids (air or water) flow in smooth laminar lines without generating turbulent eddies, drastically minimizing fluid friction (aerodynamic drag).',
    hints: [
      'Think about how air flows past a flat wall vs a tapered cone.',
      'Streamlined contours prevent turbulent air resistance.',
      'Smooth airflow reduces fluid drag significantly.',
    ],
  },
  // 20. Advanced - Drag Sort: Decreasing Friction Strategy (c7_phy_010)
  {
    id: 'ch_20_friction_strategy_sort',
    nodeId: NODE_C7_PHY_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the setups from HIGHEST frictional resistance to LOWEST frictional resistance:',
    sortItems: [
      'Dry rough sandpaper sliding on wood',
      'Smooth polished wood sliding on glass',
      'Lubricated metal with engine oil layer',
      'Steel wheel rolling on ball bearings',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Rough dry contact has the highest sliding friction. Polished smooth contact is lower. Lubrication separates surfaces with a fluid film. Ball bearings provide rolling friction, which is the lowest.',
    hints: [
      'Start with rough unlubricated sliding.',
      'Lubrication reduces sliding friction significantly.',
      'Rolling with ball bearings offers the lowest resistance.',
    ],
  },
  // 21. Advanced - Lunar Rover Wheel Design (c7_phy_009 / 010)
  {
    id: 'ch_21_rover_creativity',
    nodeId: NODE_C7_PHY_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Designing the Pragyan lunar rover wheels required solving two opposing friction problems. Which engineering design correctly balances them?',
    options: [
      'Smooth plastic wheels with oil on the lunar surface to slide fast',
      'Deep metal cleats/grousers on wheel rims for high traction on dust, combined with sealed ball bearings inside the axle to minimize internal drivetrain friction',
      'Heavy magnetic wheels with zero internal lubricants to prevent rolling',
      'Inflatable rubber tyres with smooth treads to eliminate rolling friction',
    ],
    correctIndex: 1,
    explanation: 'Effective engineering increases friction where grip is needed (cleats on dust for traction) and reduces friction where motion is needed (ball bearings inside axles to preserve motor power).',
    hints: [
      'Where do we want high friction (grip)? Where do we want low friction (rotation)?',
      'High grip at ground contact + low friction inside rotating axles.',
      'Treads outside for traction, ball bearings inside for efficiency.',
    ],
  },
  // 22. Advanced - Mass vs Volume vs Density diagnostic (c7_phy_007)
  {
    id: 'ch_22_equal_mass_eval',
    nodeId: NODE_C7_PHY_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A scientist has 1 kg of iron (density 7.8 g/cm³) and 1 kg of cotton (density 0.05 g/cm³). Which statement is scientifically accurate?',
    options: [
      'The 1 kg of iron has a higher density, so it occupies a much smaller volume than the 1 kg of cotton',
      'Iron has greater mass because metal is inherently heavier than cotton',
      'Cotton has higher density because it occupies more space in a container',
      'Both must have the exact same volume since both weigh 1 kg',
    ],
    correctIndex: 0,
    explanation: 'Both possess the same mass (1 kg). Since Density = Mass / Volume, higher density implies a much smaller volume (V = m / d). 1 kg of iron takes ~128 cm³, while 1 kg of cotton takes ~20,000 cm³.',
    hints: [
      'Masses are equal (1 kg = 1 kg).',
      'How does Volume relate to Density? V = m / d.',
      'Higher density means the same mass is packed into a smaller volume.',
    ],
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C7_PHY_001,
  title: 'Physical Nature of Matter, Density & Friction',
  definition: 'Matter is anything that occupies space and has mass, existing in solid, liquid, or gaseous states governed by particle kinetic arrangements. Density (mass per unit volume) dictates floatation via relative density, while friction is the contact force opposing relative surface motion, controlled by surface roughness and normal pressing force.',
  eli5: 'Everything you can touch or weigh is made of tiny jiggling beads called particles. Packed tight, they make hard solids; sliding loose, they make liquids; zooming free, they make gases. Density is how tightly mass is stuffed in a box, and friction is the microscopic bumps of surfaces catching like Velcro.',
  misconceptions: [
    { misconception: 'Air and gases are not matter because we cannot see or grab them.', correction: 'Air has mass (an inflated balloon weighs more) and occupies space (water cannot enter an inverted submerged glass until air escapes).' },
    { misconception: 'Particles in a solid are completely still and motionless.', correction: 'Solid particles are in continuous vibratory motion about fixed positions; heating increases their kinetic vibration.' },
    { misconception: 'Gases have no volume.', correction: 'Gases have no fixed or definite volume of their own, but they occupy the entire volume of whatever container holds them.' },
    { misconception: 'Heavier objects always sink and lighter objects always float.', correction: 'Floatation depends purely on density (mass/volume) relative to liquid density, not total mass. A 50,000-tonne hollow steel ship floats, while a 2-gram solid nail sinks.' },
    { misconception: 'Friction is always a destructive hindrance that should be eliminated completely.', correction: 'Without friction we could not walk, cars could not brake, and nails would slip out of walls. We deliberately increase friction for traction and reduce it for mechanical efficiency.' },
  ],
  diagnosticQuestions: [
    { question: 'Which of the following is an example of matter?', options: ['Sound of a bell', 'Beam of laser light', 'Water vapour inside clouds', 'Shadow of a tower'], correctIndex: 2 },
    { question: 'What happens to the particles of water when it is heated from 20°C to 90°C?', options: ['They shrink in individual size', 'Their average kinetic energy and speed increase', 'They lock into fixed crystal positions', 'They lose mass'], correctIndex: 1 },
    { question: 'Which state of matter has a definite volume but no definite shape?', options: ['Solid', 'Liquid', 'Gas', 'Plasma'], correctIndex: 1 },
    { question: 'A block of wood of volume 50 cm³ has mass 30 g. Its density is:', options: ['0.6 g/cm³', '1.67 g/cm³', '1500 g/cm³', '80 g/cm³'], correctIndex: 0 },
    { question: 'Relative density of an object is defined as its density divided by the density of:', options: ['Air at 0°C', 'Pure water at 4°C', 'Mercury at room temperature', 'Kerosene'], correctIndex: 1 },
    { question: 'What are the SI units of Relative Density?', options: ['kg/m³', 'g/cm³', 'N/m²', 'It has no units (dimensionless ratio)'], correctIndex: 3 },
    { question: 'If you double the normal force pressing a sliding block against a floor, the sliding friction:', options: ['Halves', 'Remains unchanged', 'Doubles', 'Drops to zero'], correctIndex: 2 },
    { question: 'Ball bearings reduce friction because they convert:', options: ['Sliding friction into rolling friction', 'Rolling friction into sliding friction', 'Static friction into fluid drag', 'Gravitational force into magnetic force'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved when the student understands particle arrangements across states, calculates density and predicts floatation, and correctly analyzes factors governing friction.',
};

// ─── 5 INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Particle Kinetic Simulator',
    instruction: 'Adjust the Temperature slider below and toggle states to watch how particle kinetic energy and spacing transform between Solid, Liquid, and Gas.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_PHY_002,
  },
  {
    title: '2. Syringe Compressibility & Diffusion',
    instruction: 'Drag the syringe plunger to compress gas vs liquid, and click "Release Ink" to observe spontaneous diffusion through interparticle spaces.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_PHY_005,
  },
  {
    title: '3. Density & Water Displacement Tank',
    instruction: 'Change the material block (Cork, Wood, Aluminium, Iron) to see its mass, volume, and displaced water in the overflow Eureka can.',
    interactionType: 'drag-classify',
    nodeId: NODE_C7_PHY_007,
  },
  {
    title: '4. Relative Density & Buoyancy Tank',
    instruction: 'Adjust object density and liquid density (Water, Saltwater, Mercury) to discover why items float, sink, or remain neutrally suspended.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_PHY_008,
  },
  {
    title: '5. Friction & Microscopic Interlocking',
    instruction: 'Select different surface textures (Sandpaper, Wood, Glass, Oiled) and add load weights. Pull the spring balance to measure frictional resistance in Newtons.',
    interactionType: 'drag-position',
    nodeId: NODE_C7_PHY_009,
  },
];

// ─── PREDICTION-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an iron block (density 7.8 g/cm³) is placed in liquid mercury (density 13.6 g/cm³), what will happen?',
    options: ['It will sink to the bottom like in water', 'It will float on top of the mercury', 'It will explode due to high density', 'It will convert into steam'],
    correctIndex: 1,
    verifyInstruction: 'In the simulator below, set the liquid to Mercury (13.6 g/cm³) and drop the Iron block to test your prediction!',
    nodeId: NODE_C7_PHY_008,
  },
  {
    question: 'Predict: If you apply lubricating oil between a wooden block and a glass table, what happens to the spring balance pull reading?',
    options: ['The reading increases because oil is sticky', 'The reading drops significantly because oil fills microscopic surface irregularities', 'The reading stays exactly the same', 'The reading drops to exactly 0.000 N'],
    correctIndex: 1,
    verifyInstruction: 'Select the "Oiled Glass" surface in the Friction Lab and pull the slider to verify how lubrication reduces sliding friction.',
    nodeId: NODE_C7_PHY_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Particle Simulator, what happens to the particles of a solid as temperature rises past its melting point?',
    observableOptions: [
      'Particles stop moving entirely',
      'Particles break out of their fixed lattice and begin sliding past each other',
      'Particles turn into continuous liquid soup with no individual units',
      'Particles double in mass and diameter',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_PHY_003,
  },
  {
    question: 'What happens to the spring balance pull force when you add 2 kg of extra weight on top of the sliding block?',
    observableOptions: [
      'The required pull force increases proportionally because the normal pressing force is higher',
      'The pull force decreases because the block crushes the surface smooth',
      'The pull force is unaffected because the contact area did not change',
      'The spring balance reading drops to zero',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_PHY_009,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Mission Specialist: Pragyan-2 Rover Material Selection',
  description: 'Apply your physics knowledge to specify materials for an Indian planetary lander. You need to calculate density for the lightweight chassis, verify buoyant fuel level sensors, and choose high-traction wheel coatings for regolith dust.',
  steps: [
    'Measure the mass and volume of 3 candidate alloys (Al-Li, Titanium, Carbon Composite) and calculate their densities (d = m / V).',
    'Calculate relative densities to ensure fuel tank float gauges remain at the meniscus (RD = 0.5 to 0.7).',
    'Select high-friction serrated treads (μ ≈ 0.8) for soil grip and low-friction rolling ball bearings (μ ≈ 0.002) with dry lubricants for the drive axle.',
    'Present your payload report with SI units (kg/m³, N) to your classmates and teacher!',
  ],
};

// ─── MAIN COMPONENT ───
function C7_PhysicsPhysicalNatureMatterSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Observation State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & mastery state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints & feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // Gamification feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── LAB 1: Particle Kinetic State ───
  const [simState, setSimState] = useState<'solid' | 'liquid' | 'gas'>('solid');
  const [simTemp, setSimTemp] = useState(25); // in °C (-50 to 150)

  // ─── LAB 2: Syringe & Diffusion State ───
  const [syringeState, setSyringeState] = useState<'gas' | 'liquid'>('gas');
  const [syringePlungerPos, setSyringePlungerPos] = useState(100); // 20 to 100%
  const [diffusionActive, setDiffusionActive] = useState(false);

  // ─── LAB 3 & 4: Density & Buoyancy State ───
  const [selectedMaterial, setSelectedMaterial] = useState<'cork' | 'wood' | 'aluminium' | 'iron' | 'gold'>('wood');
  const [customMass, setCustomMass] = useState(120); // grams
  const [customVolume, setCustomVolume] = useState(150); // cm³
  const [selectedLiquid, setSelectedLiquid] = useState<'water' | 'saltwater' | 'mercury' | 'kerosene'>('water');

  // ─── LAB 5: Friction Track State ───
  const [surfaceType, setSurfaceType] = useState<'sandpaper' | 'wood' | 'glass' | 'oiled'>('wood');
  const [addedMassKg, setAddedMassKg] = useState(0); // 0 to 5 kg
  const [appliedPullN, setAppliedPullN] = useState(0); // in Newtons
  const [blockMoving, setBlockMoving] = useState(false);
  const [useBallBearings, setUseBallBearings] = useState(false);

  // Drag-and-drop & user inputs for challenges
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Persistent BKT state & auto-hint timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const frictionCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED PHYSICAL CALCULATIONS ───
  const currentDensity = useMemo(() => {
    if (customVolume <= 0) return 0;
    return Number((customMass / customVolume).toFixed(2));
  }, [customMass, customVolume]);

  const liquidDensityVal = useMemo(() => {
    switch (selectedLiquid) {
      case 'water': return 1.0;
      case 'saltwater': return 1.03;
      case 'kerosene': return 0.8;
      case 'mercury': return 13.6;
      default: return 1.0;
    }
  }, [selectedLiquid]);

  const relativeDensityVal = useMemo(() => {
    return Number((currentDensity / 1.0).toFixed(2));
  }, [currentDensity]);

  const willFloat = useMemo(() => {
    return currentDensity < liquidDensityVal;
  }, [currentDensity, liquidDensityVal]);

  const submergedFraction = useMemo(() => {
    if (currentDensity >= liquidDensityVal) return 1.0;
    return Number((currentDensity / liquidDensityVal).toFixed(2));
  }, [currentDensity, liquidDensityVal]);

  const normalForceN = useMemo(() => {
    const totalMass = (customMass / 1000) + addedMassKg;
    return Number((totalMass * 9.8).toFixed(1));
  }, [customMass, addedMassKg]);

  const frictionCoefficient = useMemo(() => {
    if (useBallBearings) return 0.02;
    switch (surfaceType) {
      case 'sandpaper': return 0.7;
      case 'wood': return 0.4;
      case 'glass': return 0.2;
      case 'oiled': return 0.05;
      default: return 0.4;
    }
  }, [surfaceType, useBallBearings]);

  const maxStaticFrictionN = useMemo(() => {
    return Number((frictionCoefficient * normalForceN).toFixed(2));
  }, [frictionCoefficient, normalForceN]);

  // ─── MOUNT EFFECT: LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── AUTO-HINT TIMER RESET ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints && challenge.hints.length > 0) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      audioManager.play('pop');
    }
    resetInactivityTimer();
  }, [hintCount, challenge, resetInactivityTimer]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent scientific insight! Gases are compressible because of empty space.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // ─── PHASE NAVIGATION HANDLERS ─��─
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Matter & Friction Labs. Manipulate each simulation to discover the laws of physics!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition freely in Sandbox mode without any score pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Apply your physics knowledge to solve all problems!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now interact with the simulation to verify.');
  }, []);

  const handleVerifyPrediction = useCallback(() => {
    setPredictionVerified(true);
    audioManager.play('chime');
    speechManager.speak('Observation verified against your prediction.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot-on observation! That is the core mechanism.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Look closely at the particle motion as temperature rises.');
    }
  }, []);

  // ─── LAB CONTROLS HANDLERS ───
  const handleTempChange = useCallback((newTemp: number) => {
    setSimTemp(newTemp);
    if (newTemp <= 0) setSimState('solid');
    else if (newTemp > 0 && newTemp < 100) setSimState('liquid');
    else setSimState('gas');
    audioManager.play('count');
  }, []);

  const handleStateSelect = useCallback((state: 'solid' | 'liquid' | 'gas') => {
    setSimState(state);
    if (state === 'solid') setSimTemp(-10);
    if (state === 'liquid') setSimTemp(35);
    if (state === 'gas') setSimTemp(120);
    audioManager.play('tap');
    speechManager.speak(`Selected state: ${state}`);
  }, []);

  const handleMaterialSelect = useCallback((mat: 'cork' | 'wood' | 'aluminium' | 'iron' | 'gold') => {
    setSelectedMaterial(mat);
    switch (mat) {
      case 'cork':
        setCustomMass(25);
        setCustomVolume(100);
        break;
      case 'wood':
        setCustomMass(70);
        setCustomVolume(100);
        break;
      case 'aluminium':
        setCustomMass(270);
        setCustomVolume(100);
        break;
      case 'iron':
        setCustomMass(780);
        setCustomVolume(100);
        break;
      case 'gold':
        setCustomMass(1930);
        setCustomVolume(100);
        break;
    }
    audioManager.play('pop');
    speechManager.speak(`Selected material: ${mat}`);
  }, []);

  const handleLiquidSelect = useCallback((liq: 'water' | 'saltwater' | 'mercury' | 'kerosene') => {
    setSelectedLiquid(liq);
    audioManager.play('tap');
    speechManager.speak(`Selected liquid: ${liq}`);
  }, []);

  const handleSurfaceSelect = useCallback((surf: 'sandpaper' | 'wood' | 'glass' | 'oiled') => {
    setSurfaceType(surf);
    audioManager.play('tap');
    speechManager.speak(`Testing on ${surf} surface`);
  }, []);

  const handlePullSlider = useCallback((pull: number) => {
    setAppliedPullN(pull);
    if (pull > maxStaticFrictionN) {
      if (!blockMoving) {
        audioManager.play('swoop');
        setBlockMoving(true);
      }
    } else {
      setBlockMoving(false);
    }
  }, [maxStaticFrictionN, blockMoving]);

  const handleReleaseInk = useCallback(() => {
    setDiffusionActive(true);
    audioManager.play('pop');
    speechManager.speak('Ink particles diffusing across liquid interparticle spaces.');
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length > 0 ? prev : (challenge.sortItems ? challenge.sortItems.map((_, i) => i) : []);
      const copy = [...initial];
      const [moved] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
  }, [challenge]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You achieved a score of ${finalScore}% in Matter & Friction.`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  // ─── GENERAL ANSWER VALIDATION ───
  const handleAnswer = useCallback((userResponse: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = userResponse === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof userResponse === 'string' ? parseFloat(userResponse) : userResponse as number;
      const tol = challenge.tolerance || 0.1;
      isCorrect = !isNaN(num) && Math.abs(num - (challenge.correctAnswer || 0)) <= tol;
    } else if (challenge.type === 'construct') {
      isCorrect = (userResponse as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding application of physics principles.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, 'mastered');
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete step-by-step scientific explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // ─── CANVAS 1: 2D PARTICLE ENGINE ───
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const numParticles = 64;
    const particles = Array.from({ length: numParticles }, (_, i) => {
      const row = Math.floor(i / 8);
      const col = i % 8;
      return {
        id: i,
        baseX: 60 + col * 26,
        baseY: 50 + row * 22,
        x: 60 + col * 26,
        y: 50 + row * 22,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        isInk: i < 16,
      };
    });

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      const energyMultiplier = Math.max(0.2, (simTemp + 60) / 70);

      particles.forEach(p => {
        if (simState === 'solid') {
          const vibAmp = 1.5 * energyMultiplier;
          p.x = p.baseX + Math.sin(tick * 0.15 + p.id) * vibAmp;
          p.y = p.baseY + Math.cos(tick * 0.18 + p.id) * vibAmp;

          ctx.strokeStyle = '#38bdf822';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.baseX, p.baseY, 12, 0, Math.PI * 2);
          ctx.stroke();
        } else if (simState === 'liquid') {
          p.x += p.vx * energyMultiplier * 0.8;
          p.y += p.vy * energyMultiplier * 0.8 + 0.15;

          if (p.x < 30) { p.x = 30; p.vx *= -1; }
          if (p.x > canvas.width - 30) { p.x = canvas.width - 30; p.vx *= -1; }
          if (p.y < canvas.height * 0.4) { p.y = canvas.height * 0.4; p.vy *= -1; }
          if (p.y > canvas.height - 30) { p.y = canvas.height - 30; p.vy *= -1; }
        } else {
          p.x += p.vx * energyMultiplier * 2.2;
          p.y += p.vy * energyMultiplier * 2.2;

          if (p.x < 25) { p.x = 25; p.vx *= -1; }
          if (p.x > canvas.width - 25) { p.x = canvas.width - 25; p.vx *= -1; }
          if (p.y < 25) { p.y = 25; p.vy *= -1; }
          if (p.y > canvas.height - 25) { p.y = canvas.height - 25; p.vy *= -1; }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, simState === 'solid' ? 7 : simState === 'liquid' ? 6 : 5, 0, Math.PI * 2);
        if (diffusionActive && p.isInk) {
          ctx.fillStyle = '#c084fc';
          ctx.shadowColor = '#a855f7';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = simState === 'solid' ? '#38bdf8' : simState === 'liquid' ? '#60a5fa' : '#f43f5e';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`State: ${simState.toUpperCase()}`, 20, 30);
      ctx.fillText(`Temp: ${simTemp}°C`, 20, 48);
      ctx.fillText(`Interparticle Space: ${simState === 'solid' ? 'Negligible' : simState === 'liquid' ? 'Moderate' : 'Very Large'}`, 20, 66);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simState, simTemp, diffusionActive]);

  // ─── CANVAS 2: MICROSCOPIC FRICTION INTERLOCKING ENGINE ───
  useEffect(() => {
    const canvas = frictionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const renderFriction = () => {
      if (blockMoving) offset += 1.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const midY = 110;
      const roughnessAmp = surfaceType === 'sandpaper' ? 14 : surfaceType === 'wood' ? 8 : surfaceType === 'glass' ? 2 : 1;

      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#0369a144';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 40);
      for (let x = 0; x <= canvas.width; x += 10) {
        const hill = Math.sin((x + offset) * 0.1) * roughnessAmp;
        ctx.lineTo(x, midY - 6 + hill);
      }
      ctx.lineTo(canvas.width, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      if (surfaceType === 'oiled') {
        ctx.fillStyle = '#facc1555';
        ctx.fillRect(0, midY - 8, canvas.width, 16);
      }

      if (useBallBearings) {
        for (let bx = 30; bx < canvas.width; bx += 50) {
          ctx.beginPath();
          ctx.arc(bx, midY, 8, 0, Math.PI * 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.stroke();
        }
      }

      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = '#78350f44';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 20);
      for (let x = 0; x <= canvas.width; x += 10) {
        const valley = Math.cos(x * 0.1) * roughnessAmp;
        ctx.lineTo(x, midY + 4 + valley);
      }
      ctx.lineTo(canvas.width, canvas.height - 20);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`Normal Force: ${normalForceN} N ↓`, 20, 30);
      ctx.fillStyle = '#22c55e';
      ctx.fillText(`Applied Pull: ${appliedPullN} N →`, 20, 50);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Max Static Friction: ${maxStaticFrictionN} N ←`, 20, 70);

      animId = requestAnimationFrame(renderFriction);
    };

    renderFriction();
    return () => cancelAnimationFrame(animId);
  }, [surfaceType, normalForceN, appliedPullN, maxStaticFrictionN, blockMoving, useBallBearings]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
      {/* ─── HEADER ─── */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 bg-slate-900/80 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-xl border border-indigo-700" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">ICSE Class 7 Physics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">NEP 2020</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-lg border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border-indigo-700'
            }`}
          >
            {difficulty.toUpperCase()} TIER
          </motion.span>
          <span className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
            Mastery: {masteryLevel}
          </span>
        </div>
      </header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wide">
              <span>🚀 Mission Briefing</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 mt-3 p-3 bg-indigo-950/50 rounded-xl border border-indigo-900">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-400 rounded-md font-bold">Curiosity Hook</span>
              <h3 className="text-base font-bold text-slate-200">Before we explore the laws of physics, test your intuition:</h3>
            </div>
            <p className="text-lg text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2" role="group" aria-label="Discovery Question Options">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold text-slate-300 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {discoveryAnswered && (
                      <span className="text-base font-bold shrink-0">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-indigo-950/40 rounded-xl border border-indigo-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm' : 'text-amber-300 text-sm'}>
                  {discoveryCorrect
                    ? '✓ 🎯 Spot on! Gases have vast empty spaces between particles, allowing large volumes to compress into small cylinders.'
                    : `✗ 💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-950 shrink-0"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Step Bar */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">LAB {currentSlide + 1} OF {EXPLORATION_STEPS.length}:</span>
              <span className="text-xs md:text-sm font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-sm text-amber-300">
            👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </div>

          {/* Interactive Simulation Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6 min-h-[460px]">
            {/* LAB 1: Particle Kinetic Simulator */}
            {currentSlide === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 bg-slate-950 p-3 rounded-xl border border-slate-800 relative">
                    <canvas ref={particleCanvasRef} width={500} height={260} className="w-full rounded-lg" aria-label="Particle Simulation Display" />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">State Controls</span>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {(['solid', 'liquid', 'gas'] as const).map(st => (
                          <motion.button
                            key={st}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleStateSelect(st)}
                            aria-label={`Select ${st} state`}
                            className={`py-2 px-1 text-xs font-bold rounded-lg capitalize border ${
                              simState === st
                                ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                                : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
                            }`}
                          >
                            {st}
                          </motion.button>
                        ))}
                      </div>

                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Temperature:</span>
                          <strong className={simTemp > 100 ? 'text-rose-400' : simTemp <= 0 ? 'text-sky-400' : 'text-amber-400'}>
                            {simTemp}°C
                          </strong>
                        </div>
                        <input
                          type="range"
                          min={-50}
                          max={150}
                          value={simTemp}
                          onChange={(e) => handleTempChange(Number(e.target.value))}
                          aria-label="Temperature slider in Celsius"
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 border border-slate-800">
                      <p className="text-slate-300"><strong>Properties:</strong></p>
                      <p className="text-slate-400">Shape: <span className="text-white">{simState === 'solid' ? 'Definite' : 'Indefinite (takes container)'}</span></p>
                      <p className="text-slate-400">Volume: <span className="text-white">{simState === 'gas' ? 'Indefinite' : 'Definite'}</span></p>
                      <p className="text-slate-400">Motion: <span className="text-white">{simState === 'solid' ? 'Vibrates in fixed lattice' : simState === 'liquid' ? 'Slides loosely' : 'Rapid random straight lines'}</span></p>
                    </div>
                  </div>
                </div>

                {/* Observation Question inside Lab */}
                <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Scientific Observation</span>
                  <p className="text-sm font-medium text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2" role="group" aria-label="Observation Question Options">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservation(i)}
                        aria-label={`Option: ${opt}`}
                        className={`p-2.5 text-left text-xs rounded-lg border transition-all flex items-center justify-between ${
                          observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : observationAnswered && i === observationIndex
                            ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt}</span>
                        {observationAnswered && (
                          <span className="font-bold ml-2">
                            {i === OBSERVATION_QUESTIONS[0].correctIndex ? '✓' : i === observationIndex ? '✗' : ''}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Syringe & Diffusion Lab */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Syringe Sub-sim */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300 uppercase">Syringe Compression Test</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setSyringeState('gas'); audioManager.play('tap'); }}
                          aria-label="Set syringe medium to Gas"
                          className={`text-xs px-2.5 py-1 rounded-md font-bold ${syringeState === 'gas' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Gas (Air)
                        </button>
                        <button
                          onClick={() => { setSyringeState('liquid'); audioManager.play('tap'); }}
                          aria-label="Set syringe medium to Liquid"
                          className={`text-xs px-2.5 py-1 rounded-md font-bold ${syringeState === 'liquid' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          Liquid (Water)
                        </button>
                      </div>
                    </div>

                    <svg viewBox="0 0 320 140" className="w-full bg-slate-900 rounded-lg p-2 border border-slate-800" aria-label="Syringe Compression Diagram">
                      {/* Syringe barrel */}
                      <rect x="40" y="40" width="220" height="60" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                      {/* Blocked nozzle */}
                      <rect x="20" y="60" width="20" height="20" fill="#dc2626" />
                      <text x="30" y="55" fontSize="8" fill="#f87171" textAnchor="middle">BLOCKED</text>

                      {/* Trapped medium particles */}
                      {syringeState === 'gas' ? (
                        <>
                          {Array.from({ length: 16 }).map((_, i) => (
                            <circle
                              key={i}
                              cx={45 + ((i % 4) * (syringePlungerPos * 1.8) / 4) + (i * 2)}
                              cy={48 + (Math.floor(i / 4) * 12)}
                              r="3"
                              fill="#f43f5e"
                            />
                          ))}
                        </>
                      ) : (
                        <rect x="42" y="42" width="216" height="56" fill="#38bdf844" />
                      )}

                      {/* Plunger */}
                      <rect
                        x={40 + (syringeState === 'liquid' ? 210 : (syringePlungerPos * 2.1))}
                        y="35"
                        width="14"
                        height="70"
                        fill="#cbd5e1"
                        stroke="#475569"
                        strokeWidth="2"
                      />
                      <line
                        x1={54 + (syringeState === 'liquid' ? 210 : (syringePlungerPos * 2.1))}
                        y1="70"
                        x2="300"
                        y2="70"
                        stroke="#cbd5e1"
                        strokeWidth="6"
                      />
                    </svg>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Plunger Compression:</span>
                        <strong>{syringeState === 'liquid' ? 'Immovable (Incompressible)' : `${100 - syringePlungerPos}% compressed`}</strong>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={syringePlungerPos}
                        disabled={syringeState === 'liquid'}
                        onChange={(e) => {
                          setSyringePlungerPos(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Syringe plunger position slider"
                        className="w-full accent-indigo-500 disabled:opacity-40"
                      />
                    </div>
                  </div>

                  {/* Diffusion Sub-sim */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-300 uppercase">Potassium Permanganate Diffusion</span>
                      <p className="text-xs text-slate-400 mt-1">Watch particles spread without any stirring due to random kinetic motion.</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-lg flex items-center justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReleaseInk}
                        aria-label="Release ink crystal into water"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow-lg"
                      >
                        🧪 Drop Crystal in Water
                      </motion.button>
                      <span className="text-xs text-purple-300">
                        {diffusionActive ? 'Spreading spontaneously across spaces...' : 'Click to test diffusion'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                      <strong>Scientific Principle:</strong> Diffusion occurs in liquids and fastest in gases because moving particles randomly occupy interparticle spaces.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3 & 4: Density, Archimedes Tank & Relative Density */}
            {(currentSlide === 2 || currentSlide === 3) && (
              <div className="space-y-4">
                {/* PREDICTION HOOK ON SLIDE 3 */}
                {currentSlide === 3 && !predictionMade && (
                  <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800 space-y-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">Predict-Then-Check</span>
                    <p className="text-sm font-medium text-white">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2" role="group" aria-label="Prediction Options">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePrediction(i)}
                          aria-label={`Predict: ${opt}`}
                          className="p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Interactive Tank Visual */}
                  <div className="md:col-span-2 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400">DISPLACEMENT & BUOYANCY TANK</span>
                      <span className="text-amber-400 font-bold">
                        {willFloat ? `FLOATING (${(submergedFraction * 100).toFixed(0)}% Submerged)` : 'SINKING TO BOTTOM'}
                      </span>
                    </div>

                    <svg viewBox="0 0 380 200" className="w-full bg-slate-900 rounded-lg border border-slate-800" aria-label="Buoyancy and displacement tank simulation">
                      <rect x="40" y="50" width="220" height="130" rx="4" fill={selectedLiquid === 'mercury' ? '#94a3b8' : '#38bdf833'} stroke="#38bdf8" strokeWidth="2" />
                      <path d="M 260 70 L 290 90 L 290 100 L 260 80 Z" fill="#64748b" />
                      <rect x="280" y="100" width="40" height="80" rx="2" fill="#1e293b" stroke="#64748b" />
                      <rect x="282" y={180 - Math.min(70, customVolume * 0.4)} width="36" height={Math.min(70, customVolume * 0.4)} fill="#38bdf888" />
                      <text x="300" y="95" fill="#94a3b8" fontSize="8" textAnchor="middle">Overflow: {customVolume} cm³</text>

                      <motion.g
                        animate={{
                          y: willFloat ? 50 + (1 - submergedFraction) * 20 : 130,
                        }}
                        transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                      >
                        <rect
                          x="110"
                          y="40"
                          width="60"
                          height="40"
                          rx="4"
                          fill={selectedMaterial === 'cork' ? '#d97706' : selectedMaterial === 'wood' ? '#b45309' : selectedMaterial === 'aluminium' ? '#94a3b8' : selectedMaterial === 'iron' ? '#475569' : '#eab308'}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        <text x="140" y="64" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                          {selectedMaterial.toUpperCase()}
                        </text>
                      </motion.g>

                      <line x1="140" y1="110" x2="140" y2="150" stroke="#ef4444" strokeWidth="2" />
                      <text x="145" y="145" fill="#ef4444" fontSize="9">Weight W</text>
                      <line x1="140" y1="90" x2="140" y2="50" stroke="#22c55e" strokeWidth="2" />
                      <text x="145" y="60" fill="#22c55e" fontSize="9">Upthrust U</text>
                    </svg>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs p-2 bg-slate-900 rounded-lg">
                      <div>
                        <span className="text-slate-400">Mass:</span>
                        <p className="font-bold text-white">{customMass} g</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Density:</span>
                        <p className="font-bold text-indigo-300">{currentDensity} g/cm³</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Relative Density:</span>
                        <p className="font-bold text-emerald-400">{relativeDensityVal} (No units)</p>
                      </div>
                    </div>
                  </div>

                  {/* Material & Liquid Selectors */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Select Material Block</span>
                    <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Select Material Block">
                      {(['cork', 'wood', 'aluminium', 'iron', 'gold'] as const).map(m => (
                        <button
                          key={m}
                          onClick={() => handleMaterialSelect(m)}
                          aria-label={`Select material ${m}`}
                          className={`p-1.5 text-xs font-bold rounded-lg capitalize border ${
                            selectedMaterial === m ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-slate-400 uppercase block pt-2">Select Fluid Tank</span>
                    <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Select Fluid Tank">
                      {(['water', 'saltwater', 'kerosene', 'mercury'] as const).map(l => (
                        <button
                          key={l}
                          onClick={() => handleLiquidSelect(l)}
                          aria-label={`Select liquid ${l}`}
                          className={`p-1.5 text-xs font-bold rounded-lg capitalize border ${
                            selectedLiquid === l ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>

                    {predictionMade && !predictionVerified && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleVerifyPrediction}
                        aria-label="Verify My Prediction"
                        className="w-full py-2 bg-amber-600 text-white text-xs font-bold rounded-lg shadow-md"
                      >
                        �� Verify My Prediction
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: Friction Track & Normal Force Engine */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-400">MICROSCOPIC SURFACE INTERLOCKING</span>
                      <span className={blockMoving ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                        {blockMoving ? '⚡ SLIDING IN MOTION' : '🔒 STATIC AT REST'}
                      </span>
                    </div>

                    <canvas ref={frictionCanvasRef} width={500} height={180} className="w-full rounded-lg" aria-label="Friction interlocking simulation canvas" />

                    {/* Pull Slider */}
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Spring Balance Pull Force:</span>
                        <strong className="text-emerald-400">{appliedPullN} N</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={40}
                        step={0.5}
                        value={appliedPullN}
                        onChange={(e) => handlePullSlider(Number(e.target.value))}
                        aria-label="Applied pull force slider in Newtons"
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Surface & Normal Force Controls */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">Surface Texture</span>
                    <div className="grid grid-cols-2 gap-1.5" role="group" aria-label="Surface Texture Selection">
                      {(['sandpaper', 'wood', 'glass', 'oiled'] as const).map(s => (
                        <button
                          key={s}
                          onClick={() => handleSurfaceSelect(s)}
                          aria-label={`Select surface ${s}`}
                          className={`p-1.5 text-xs font-bold rounded-lg capitalize border ${
                            surfaceType === s ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-800'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Added Load Mass:</span>
                        <strong className="text-indigo-400">+{addedMassKg} kg</strong>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={5}
                        step={1}
                        value={addedMassKg}
                        onChange={(e) => {
                          setAddedMassKg(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Added load mass slider in kilograms"
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setUseBallBearings(b => !b);
                          audioManager.play('tap');
                        }}
                        aria-label={useBallBearings ? "Uninstall Ball Bearings" : "Install Ball Bearings"}
                        className={`w-full py-2 text-xs font-bold rounded-lg border ${
                          useBallBearings ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {useBallBearings ? '✓ Ball Bearings Installed' : '+ Install Ball Bearings'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Between Slides */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Go to previous lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-sm font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400">
              Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                aria-label="Go to next lab"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Sandbox Mode"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-emerald-400">Free Physics Exploration Sandbox</h3>
              <p className="text-xs text-slate-300">
                Tinker freely with particle states, fluid buoyancy, and friction without grades or timers.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start graded challenges"
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-950"
            >
              Ready for Graded Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Interactive Particle Chamber</span>
              <canvas ref={particleCanvasRef} width={450} height={200} className="w-full rounded-xl bg-slate-950 border border-slate-800" aria-label="Particle Chamber Sandbox Canvas" />
              <div className="flex gap-2" role="group" aria-label="Select State in Sandbox">
                {(['solid', 'liquid', 'gas'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleStateSelect(st)}
                    aria-label={`Select ${st}`}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize ${simState === st ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase">Friction & Load Dynamics</span>
              <canvas ref={frictionCanvasRef} width={450} height={200} className="w-full rounded-xl bg-slate-950 border border-slate-800" aria-label="Friction Sandbox Canvas" />
              <div className="flex justify-between items-center text-xs">
                <span>Pull Force:</span>
                <input
                  type="range"
                  min={0}
                  max={40}
                  value={appliedPullN}
                  onChange={(e) => handlePullSlider(Number(e.target.value))}
                  aria-label="Pull force sandbox slider"
                  className="w-3/4 accent-emerald-500"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. GRADED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 uppercase tracking-wider">
                COMPETENCY: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-lg md:text-xl font-bold text-white leading-snug">
              {challenge.question}
            </h2>

            {/* MCQ & Distinguish Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3 pt-2" role="group" aria-label="Challenge Options">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="text-base font-bold shrink-0">
                          {i === challenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      draggable
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      className="px-4 py-2 bg-indigo-700 text-white rounded-lg text-sm font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                  {[
                    { id: 'box_solid', title: 'Tightly packed vibrating particles in fixed lattice' },
                    { id: 'box_liquid', title: 'Loosely packed sliding particles touching each other' },
                    { id: 'box_gas', title: 'Widely spaced particles in rapid random motion' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      aria-label={`Drop target for ${target.title}`}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[110px] text-center"
                    >
                      <p className="text-xs text-slate-400 mb-2">{target.title}</p>
                      <div className="font-bold text-indigo-300 text-base">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Label Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Verify matched labels"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Verify Matched Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    draggable
                    aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center gap-3 cursor-grab text-sm text-slate-200"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-900 text-indigo-300 text-xs flex items-center justify-center font-bold">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Verify arranged order"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg mt-2"
                >
                  Verify Arranged Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    aria-label="Numeric calculation answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-indigo-500 focus:outline-none w-64"
                  />
                  <span className="text-slate-300 font-bold text-sm">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit calculation answer"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Formula Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      aria-label={`Add formula part ${part}`}
                      className="px-3.5 py-1.5 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 rounded-lg text-xs font-bold font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex items-center gap-2 flex-wrap" aria-label="Constructed formula preview">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono text-sm flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        aria-label={`Remove part ${part}`}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to build the formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify constructed formula"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg"
                >
                  Verify Formula
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-indigo-950/40 border border-indigo-800 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                  <span>🔬 Step-by-Step Scientific Explanation</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-indigo-400">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('tap');
                    }}
                    aria-label="Show next explanation step"
                    className="mt-2 px-4 py-2 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold"
                  >
                    Show Next Logical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission' : 'Next Challenge'}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950 block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl border border-indigo-800 space-y-3 text-center">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Accomplished!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the rigorous physics evaluation on the Physical Nature of Matter, Density, and Friction.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Score</span>
                <p className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Mastery Level</span>
                <p className="text-xl font-bold text-indigo-400">{masteryLevel.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className={`p-5 rounded-2xl border ${
            errors === 0
              ? 'bg-emerald-950/50 border-emerald-500/80'
              : errors <= 3
              ? 'bg-indigo-950/50 border-indigo-500/80'
              : errors <= 7
              ? 'bg-amber-950/50 border-amber-500/80'
              : 'bg-rose-950/50 border-rose-500/80'
          }`}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-1 text-slate-300">Performance Feedback</h3>
            <p className="text-base font-bold leading-relaxed text-white">
              {errors === 0 && '🌟 PERFECT SCORE! You demonstrated exceptional mastery of particle kinetic theory, fluid buoyancy, and friction mechanisms.'}
              {errors >= 1 && errors <= 3 && '👏 Great work! Your conceptual foundations are strong. Review any minor calculation details below to aim for 100% perfection.'}
              {errors >= 4 && errors <= 7 && '💪 Good effort! Physics mastery builds through iterative experimentation. Review your identified misconception profile below.'}
              {errors >= 8 && '🚀 Do not give up — You WILL get this! Keep experimenting in the interactive labs and practicing, and these physics principles will click!'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>💭 Deep Learning Reflection</span>
            </div>
            <h3 className="text-lg font-bold text-white">Consolidate Your Understanding</h3>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-indigo-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., That massive ships float because of hollow trapped air lowering total density..."
                  aria-label="Reflection question 1: What was the most surprising thing you learned?"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-indigo-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.explanation}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="e.g., Everything is made of tiny jiggling particles with spaces between them..."
                  aria-label="Reflection question 2: How would you explain this to a friend?"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-indigo-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Choosing bicycle tyres, selecting lubricants for machinery, understanding weather..."
                  aria-label="Reflection question 3: Where in real life might you use this?"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-rose-300 text-sm font-bold">Your Misconception Diagnosis:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-2">
            <h3 className="text-indigo-300 text-sm font-bold">Spaced Repetition Schedule (SM-2)</h3>
            <p className="text-xs text-slate-300">
              To consolidate these neural pathways, your next review session is scheduled in{' '}
              <strong className="text-indigo-400">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              .
            </p>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>🛠️ Hands-On Real World Challenge</span>
            </div>
            <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="w-4 h-4 rounded-full bg-indigo-950 text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BUBBLE OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_PhysicsPhysicalNatureMatterSim;