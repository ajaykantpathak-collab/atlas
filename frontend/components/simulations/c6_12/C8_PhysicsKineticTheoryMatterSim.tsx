'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C8_PHY_001 = 'c8_phy_001'; // Kinetic theory of matter
const NODE_C8_PHY_002 = 'c8_phy_002'; // Three states of matter (particle movement)
const NODE_C8_PHY_003 = 'c8_phy_003'; // Energy content in three states
const NODE_C8_PHY_004 = 'c8_phy_004'; // Melting and fusion (solid to liquid)
const NODE_C8_PHY_005 = 'c8_phy_005'; // Boiling and vaporization (liquid to gas)
const NODE_C8_PHY_006 = 'c8_phy_006'; // Evaporation (surface phenomenon)
const NODE_C8_PHY_007 = 'c8_phy_007'; // Condensation (gas to liquid)
const NODE_C8_PHY_008 = 'c8_phy_008'; // Sublimation (solid directly to gas)
const NODE_C8_PHY_009 = 'c8_phy_009'; // Measurement of density of irregular solids
const NODE_C8_PHY_010 = 'c8_phy_010'; // Floatation and sinking related to density

const ALL_NODE_IDS = [
  NODE_C8_PHY_001,
  NODE_C8_PHY_002,
  NODE_C8_PHY_003,
  NODE_C8_PHY_004,
  NODE_C8_PHY_005,
  NODE_C8_PHY_006,
  NODE_C8_PHY_007,
  NODE_C8_PHY_008,
  NODE_C8_PHY_009,
  NODE_C8_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Himalayan Ice & Cargo Expedition',
  intro: 'You are the chief physicist for an expedition across Ladakh and Delhi. From melting glaciers and sub-zero sublimation of dry ice preserving vaccines, to measuring the density of mysterious Himalayan ores with a Eureka can and navigating heavy steel transport barges on the Ganges, you must master the kinetic theory of matter and density to succeed.',
  context: 'Discover how invisible, jiggling particles govern melting, boiling, matka cooling, condensation, floating ships, and sinking boulders.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'You heat a pot of pure water on a high flame in Delhi. Once it starts boiling vigorously at 100°C, what happens to the thermometer reading if you double the flame power?',
  options: [
    'Temperature jumps quickly to 110°C due to double heat',
    'Temperature stays fixed at exactly 100°C while boiling continues',
    'Temperature drops slightly because steam carries all the heat away',
    'Temperature fluctuates randomly between 90°C and 110°C',
  ],
  correctIndex: 1,
  hintAfter: "Surprising, isn't it? Even on maximum flame, the boiling temperature of pure water does not rise above 100°C at normal atmospheric pressure. The extra heat becomes 'hidden' latent heat!",
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
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1 to 7) ──
  {
    id: 'ch_01_found',
    nodeId: NODE_C8_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Kinetic Theory of Matter, what are particles in an ice cube at -10°C doing?',
    options: [
      'They are completely stationary and frozen in place',
      'They continuously vibrate back and forth about fixed positions',
      'They slide past one another at slow speeds',
      'They fly around freely bouncing off each other',
    ],
    correctIndex: 1,
    explanation: 'Postulate 2 states that particles are in constant random motion in EVERY state of matter. In solids, particles vibrate about fixed positions; they are never completely motionless.',
    hints: [
      'Remember that particles of matter never sit completely still at any temperature above absolute zero.',
      'In a solid, strong inter-particle forces prevent translational movement, but allow back-and-forth movement.',
      'Particles in a solid only vibrate about their fixed lattice positions.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_found',
    nodeId: NODE_C8_PHY_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each state of matter to its matching particle motion characteristics.',
    dragItems: [
      { label: 'Solid (Ice)', targetId: 'target_vibrate' },
      { label: 'Liquid (Water)', targetId: 'target_slide' },
      { label: 'Gas (Steam)', targetId: 'target_free' },
    ],
    correctMapping: {
      target_vibrate: 'Solid (Ice)',
      target_slide: 'Liquid (Water)',
      target_free: 'Gas (Steam)',
    },
    explanation: 'Solids vibrate in fixed positions (definite shape and volume). Liquids slide past one another (definite volume, takes container shape). Gases move freely at high speed in all directions (fills container completely).',
    hints: [
      'Which state keeps a rigid fixed shape because particles only tremble in place?',
      'Which state can flow into a glass while keeping its 100 mL volume constant?',
      'Match: Solid -> vibrate in fixed position, Liquid -> slide past each other, Gas -> move freely at high speed.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_found',
    nodeId: NODE_C8_PHY_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which sequence correctly ranks the three states of water in order of INCREASING particle kinetic energy?',
    options: [
      'Steam (Gas) < Water (Liquid) < Ice (Solid)',
      'Ice (Solid) < Water (Liquid) < Steam (Gas)',
      'Water (Liquid) < Ice (Solid) < Steam (Gas)',
      'Ice (Solid) < Steam (Gas) < Water (Liquid)',
    ],
    correctIndex: 1,
    explanation: 'Kinetic energy depends on particle speed. Solid particles only vibrate (lowest KE), liquid particles slide (intermediate KE), and gas particles fly freely at high speed after overcoming inter-particle forces (highest KE).',
    hints: [
      'Kinetic energy is the energy of motion. Which state moves the slowest?',
      'Which state has particles flying around fastest with the most energy?',
      'The order from lowest to highest kinetic energy is Solid < Liquid < Gas.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_found',
    nodeId: NODE_C8_PHY_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the melting point of pure ice at normal atmospheric pressure, and what happens to temperature during melting?',
    options: [
      '0°C; temperature continuously climbs from 0°C to 10°C during melting',
      '0°C; temperature remains constant at 0°C until all ice has melted',
      '100°C; temperature stays at 100°C',
      '-4°C; temperature drops during melting',
    ],
    correctIndex: 1,
    explanation: 'Pure ice melts at 0°C at 1 atm. During melting, the temperature remains constant because supplied heat is absorbed as latent heat of fusion to break lattice bonds rather than increase kinetic energy.',
    hints: [
      'At what temperature does ice turn to water?',
      'Does a thermometer change reading while ice cubes are actively melting in water?',
      'The melting point is 0°C and the temperature remains constant during the phase transition.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05_found',
    nodeId: NODE_C8_PHY_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is evaporation described as a "surface phenomenon" whereas boiling is a "bulk phenomenon"?',
    options: [
      'Evaporation only involves particles at the top exposed layer escaping below boiling point',
      'Evaporation requires bubbles to form at the bottom of the vessel',
      'Evaporation happens only when the entire volume is heated to 100°C',
      'Evaporation only occurs on metal surfaces',
    ],
    correctIndex: 0,
    explanation: 'Evaporation occurs at any temperature exclusively at the liquid surface where energetic particles escape. Boiling occurs rapidly throughout the entire bulk of the liquid at a fixed temperature with visible vapour bubbles.',
    hints: [
      'Think about a wet floor drying: where do the water molecules leave from?',
      'Boiling forms bubbles deep inside the pot; does a drying puddle create bubbles from the bottom?',
      'Evaporation occurs only from the uppermost surface layer of the liquid.',
    ],
  },
  {
    id: 'ch_06_found',
    nodeId: NODE_C8_PHY_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following substances undergoes sublimation (turns directly from solid to gas on heating)?',
    options: [
      'Common Table Salt (NaCl)',
      'Camphor and Ammonium Chloride',
      'Pure Iron wire',
      'Cane Sugar crystals',
    ],
    correctIndex: 1,
    explanation: 'Camphor, ammonium chloride, naphthalene, iodine, and dry ice (solid CO2) sublime directly from solid to gas without ever forming a liquid layer.',
    hints: [
      'Think of what is burned during pooja in Indian households or kept in woollen cupboards as mothballs.',
      'Sugar and salt melt into syrups/liquids when heated strongly.',
      'Camphor and ammonium chloride sublime directly into vapour.',
    ],
  },
  {
    id: 'ch_07_found',
    nodeId: NODE_C8_PHY_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Water has a density of 1.0 g/cm³. A piece of cork has a density of 0.24 g/cm³ and an iron bolt has a density of 7.8 g/cm³. Predict their behaviour in water.',
    options: [
      'Both cork and iron will sink to the bottom',
      'Cork floats because 0.24 < 1.0, while iron sinks because 7.8 > 1.0',
      'Cork sinks because it is soft, iron floats because it is hard',
      'Both cork and iron will remain suspended in the middle',
    ],
    correctIndex: 1,
    explanation: 'An object floats if its density is less than the fluid density (rho_obj < rho_fluid) and sinks if its density is greater (rho_obj > rho_fluid). 0.24 < 1.0 (cork floats) and 7.8 > 1.0 (iron sinks).',
    hints: [
      'Compare each object density with water (1.0 g/cm³).',
      'If density is LESS than 1.0, it floats. If MORE than 1.0, it sinks.',
      '0.24 < 1.0 so cork floats; 7.8 > 1.0 so iron sinks.',
    ],
  },

  // ── STANDARD TIER (8 to 15) ──
  {
    id: 'ch_08_std',
    nodeId: NODE_C8_PHY_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student lowers an irregular stone of mass 75 g into a measuring cylinder with 40 cm³ of water. The water level rises to 65 cm³. Calculate the density of the stone in g/cm³.',
    correctAnswer: 3.0,
    tolerance: 0.05,
    unit: 'g/cm³',
    explanation: 'Volume of stone V = V2 - V1 = 65 cm³ - 40 cm³ = 25 cm³. Density rho = mass / volume = 75 g / 25 cm³ = 3.0 g/cm³ (or 3000 kg/m³).',
    hints: [
      'First calculate the volume displaced: V = V2 - V1.',
      'V = 65 - 40 = 25 cm³.',
      'Now divide mass (75 g) by volume (25 cm³): 75 / 25 = 3.0 g/cm³.',
    ],
  },
  {
    id: 'ch_09_std',
    nodeId: NODE_C8_PHY_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During a hot summer in Nagpur (42°C), water stored in an earthen pot (matka) stays significantly cooler than water in a closed steel jug. Why?',
    options: [
      'The clay pot generates cold energy from the soil minerals',
      'Water seeps through clay pores and evaporates; escaping high-energy particles leave cooler water behind',
      'The dark colour of clay reflects heat away from water',
      'Clay absorbs water vapour from the outside air and cools the jug',
    ],
    correctIndex: 1,
    explanation: 'The porous clay allows water to seep to the outer surface and evaporate. The escaping molecules carry away latent heat (the highest kinetic energy particles leave), reducing the average kinetic energy and temperature of the remaining water.',
    hints: [
      'Think about what happens to the energy of a liquid when its fastest particles fly off.',
      'Evaporation carries away heat, causing a cooling effect on whatever is left behind.',
      'Porous clay allows continuous surface evaporation, taking heat from the water inside.',
    ],
  },
  {
    id: 'ch_10_std',
    nodeId: NODE_C8_PHY_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On a humid morning in Mumbai, you pour ice-cold lassi into a steel tumbler. Water droplets quickly coat the outside of the tumbler. Where did this water come from?',
    options: [
      'The cold lassi leaked through microscopic microscopic pores in the steel tumbler',
      'Water vapour in the surrounding warm air lost kinetic energy on touching the cold steel and condensed into liquid',
      'The ice inside the tumbler melted and overflowed over the rim',
      'The steel metal reacted chemically with atmospheric oxygen to create moisture',
    ],
    correctIndex: 1,
    explanation: 'Steel is non-porous. Water vapour in the air collides with the chilled tumbler outer wall, loses kinetic energy, slows down, and inter-particle forces pull them together into liquid droplets (condensation).',
    hints: [
      'Is the steel tumbler porous or waterproof?',
      'What happens when warm gas molecules hit a cold solid surface?',
      'Water vapour in ambient air cools below its condensation point on the cold tumbler surface.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_11_std',
    nodeId: NODE_C8_PHY_005,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events that occurs when water at 25°C is heated continuously on a stove until it completely boils into steam.',
    sortItems: [
      'Heat increases particle kinetic energy; temperature rises from 25°C towards 100°C',
      'Water reaches boiling point (100°C); bubbles of steam form throughout the bulk liquid',
      'Temperature stays constant at 100°C as latent heat of vaporization breaks all remaining inter-particle forces',
      'All liquid turns to steam; steam particles fly freely with maximum kinetic energy',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First, temperature rises as KE increases. At 100°C boiling starts (bulk bubbles). Heat is then absorbed at constant 100°C as latent heat. Finally, steam particles fly freely as a gas.',
    hints: [
      'Heating starts by increasing temperature before reaching the boiling point.',
      'Boiling occurs at 100°C with temperature plateaus before all water turns to gas.',
      'Order: Temperature rise -> Bubbles form throughout at 100°C -> Constant temp plateau (latent heat) -> Free steam gas.',
    ],
  },
  {
    id: 'ch_12_std',
    nodeId: NODE_C8_PHY_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A giant ocean vessel made of 50,000 tonnes of steel (density 7.8 g/cm³) floats easily on the Arabian Sea, but a small 5 g steel sewing pin sinks instantly. What explains this difference?',
    options: [
      'The ocean is much bigger than a water glass, so large objects float by surface tension',
      'The ship is hollow, enclosing huge air compartments, making its AVERAGE density less than 1.0 g/cm³',
      'Steel in ships is treated with anti-gravity magnetic paints',
      'Pins are pointy, so they pierce the water molecules and fall',
    ],
    correctIndex: 1,
    explanation: 'Floatation depends on AVERAGE density (total mass / total volume). A solid pin is 100% steel (7.8 g/cm³ > 1.0 g/cm³). The ship encloses huge air-filled cargo hulls, so (Mass_steel + Mass_air)/(Total Volume) < 1.0 g/cm³.',
    hints: [
      'Think about what is inside the giant rooms and cargo holds of a ship.',
      'Density is mass divided by TOTAL volume including enclosed air.',
      'The hollow hull encloses air, dropping the average density below water density (1.0 g/cm³).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_13_std',
    nodeId: NODE_C8_PHY_008,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct experimental sequence to demonstrate the sublimation of ammonium chloride in an ICSE laboratory.',
    availableParts: [
      'Take NH4Cl in china dish',
      'Cover with perforated filter paper',
      'Place inverted funnel with cotton plug',
      'Heat gently over burner',
      'Observe white fumes deposit on cold funnel without any liquid phase',
    ],
    targetState: 'Take NH4Cl in china dish Cover with perforated filter paper Place inverted funnel with cotton plug Heat gently over burner Observe white fumes deposit on cold funnel without any liquid phase',
    validationHint: 'Add all 5 laboratory steps in standard sequential order.',
    explanation: 'Ammonium chloride is placed in a china dish, covered with perforated filter paper, an inverted cotton-plugged funnel is placed on top, and gentle heat causes white vapour to rise and deposit as solid crystals directly on the cool funnel.',
    hints: [
      'Start with putting the chemical in the dish.',
      'Cover with filter paper and the inverted funnel.',
      'Click all 5 parts in order from dish setup to heating and observation.',
    ],
  },
  {
    id: 'ch_14_std',
    nodeId: NODE_C8_PHY_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why MUST a Eureka can (overflow can) be filled until water overflows from the spout before lowering the test solid?',
    options: [
      'To clean any dust out of the spout nozzle before the experiment',
      'To ensure the starting water level is exactly at the spout lip, so all displaced water exits into the measuring cylinder',
      'Because the Eureka can only functions when pressurized to the brim',
      'To increase the buoyant force on the solid',
    ],
    correctIndex: 1,
    explanation: 'If the can is only half-full, the displaced water will simply raise the water level inside the can without overflowing through the spout, resulting in zero collected water in the measuring cylinder.',
    hints: [
      'What happens if the water level starts 2 cm below the spout when you drop the stone?',
      'Displaced water must immediately exit through the spout to be collected and measured.',
      'The water level must start exactly at the spout brim.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_15_std',
    nodeId: NODE_C8_PHY_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does steam at 100°C produce significantly more severe burns on human skin than boiling liquid water at the exact same 100°C?',
    options: [
      'Steam contains poisonous gases that react with skin proteins',
      'Steam particles travel much faster and carry an extra 2260 J/g of latent heat that is released upon condensing on skin',
      'Water at 100°C has already cooled down compared to steam',
      'Steam has a higher temperature than 100°C while water cannot reach 100°C',
    ],
    correctIndex: 1,
    explanation: 'Steam at 100°C possesses additional latent heat of vaporization. When it touches skin, it first condenses into liquid water at 100°C, releasing all its latent heat directly into the tissue, before the resulting 100°C water cools down.',
    hints: [
      'Both are at 100°C, but which one absorbed extra energy during its change of state?',
      'When gas condenses on skin, what happens to the latent heat of vaporization it was holding?',
      'Steam releases its stored latent heat upon condensation PLUS the heat from liquid cooling.',
    ],
  },

  // ── ADVANCED TIER (16 to 22) ──
  {
    id: 'ch_16_adv',
    nodeId: NODE_C8_PHY_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An iceberg has a density of 0.92 g/cm³ and floats in seawater of density 1.03 g/cm³. What percentage of the iceberg volume is SUBMERGED below the sea surface? (Round to 1 decimal place)',
    correctAnswer: 89.3,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Fraction submerged = rho_object / rho_fluid = 0.92 / 1.03 = 0.8932 = 89.3%. Thus ~89.3% is hidden underwater and only ~10.7% is visible above the surface (the "tip of the iceberg").',
    hints: [
      'The submerged fraction of a floating body is given by (Density of solid) / (Density of fluid).',
      'Compute: 0.92 / 1.03.',
      '0.92 / 1.03 = 0.8932; multiply by 100 to get 89.3%.',
    ],
  },
  {
    id: 'ch_17_adv',
    nodeId: NODE_C8_PHY_009,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design the experimental procedure to measure the density of an irregular piece of CORK (which floats on water) using a measuring cylinder and a heavy lead sinker.',
    sortItems: [
      'Record initial water level V1 in measuring cylinder',
      'Lower lead sinker alone into cylinder and record water level V2 (V_sinker = V2 - V1)',
      'Tie cork to lead sinker so sinker pulls cork fully underwater; record level V3',
      'Calculate cork volume V_cork = V3 - V2; weigh dry cork on balance to find mass m; compute rho = m / V_cork',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Because cork floats, it must be forced under with a sinker. Sinker volume is V2 - V1. Total combined volume is V3 - V1. Cork volume alone is V3 - V2. Density is then m / (V3 - V2).',
    hints: [
      'Start by measuring the sinker alone to isolate its volume.',
      'Then submerge sinker + cork together.',
      'Subtract sinker volume (V2) from combined volume (V3) to find cork volume.',
    ],
  },
  {
    id: 'ch_18_adv',
    nodeId: NODE_C8_PHY_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A solid cube of seasoned teak wood (density 0.85 g/cm³) is placed in three separate beakers: Pure Water (1.0 g/cm³), Kerosene (0.80 g/cm³), and Mercury (13.6 g/cm³). What is its behaviour in each?',
    options: [
      'Floats in all three because wood is naturally buoyant',
      'Floats in Water (0.85 < 1.0), Sinks in Kerosene (0.85 > 0.80), Floats on top of Mercury (0.85 < 13.6)',
      'Sinks in Water, Sinks in Kerosene, Floats in Mercury',
      'Floats in Kerosene, Sinks in Water, Sinks in Mercury',
    ],
    correctIndex: 1,
    explanation: 'Floatation is an object-fluid pair property. In water: 0.85 < 1.0 (Floats). In kerosene: 0.85 > 0.80 (Sinks!). In mercury: 0.85 < 13.6 (Floats high on surface). Wood does not float in every liquid!',
    hints: [
      'Compare 0.85 with 1.0, then 0.85 with 0.80, then 0.85 with 13.6.',
      'If object density > fluid density, it sinks!',
      '0.85 < 1.0 (floats in water), 0.85 > 0.80 (sinks in kerosene), 0.85 < 13.6 (floats on mercury).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_19_adv',
    nodeId: NODE_C8_PHY_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'On a humid monsoon day in Chennai (Humidity 90%, Temp 32°C) vs a dry summer day in Jodhpur (Humidity 15%, Temp 32°C), identical wet cotton shirts are hung on a clothesline. Which dries faster and why?',
    options: [
      'Chennai shirt dries faster because humid air contains more moisture particles that attract water',
      'Jodhpur shirt dries much faster because dry air has high capacity to accept water vapour, maximising evaporation rate',
      'Both dry at the exact same rate since the ambient temperature (32°C) is identical',
      'Chennai shirt dries faster because coastal sea breeze provides unlimited oxygen',
    ],
    correctIndex: 1,
    explanation: 'High humidity means the air is already close to saturation and cannot accept much more water vapour, causing net evaporation to crawl. In dry desert air (Jodhpur), the vapour gradient is steep, accelerating evaporation.',
    hints: [
      'Humidity is the amount of water vapour already present in the air.',
      'Can nearly full air accept more water easily?',
      'Low humidity in dry Jodhpur allows much faster net evaporation than saturated Chennai monsoon air.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_20_adv',
    nodeId: NODE_C8_PHY_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A sealed rigid steel cylinder containing helium gas is heated from 20°C to 80°C. Which of the following statements correctly describes what happens at the microscopic level?',
    options: [
      'The number of helium atoms increases due to thermal generation',
      'Helium atoms move faster with greater kinetic energy, bombarding the container walls more frequently and violently',
      'Helium atoms expand in physical radius, occupying more volume inside the atoms',
      'Helium atoms stop moving and lock into fixed crystal positions',
    ],
    correctIndex: 1,
    explanation: 'Heating does NOT create new atoms or expand individual atomic radii. Heating increases the kinetic energy (speed) of existing particles, increasing collision frequency and force against walls (pressure).',
    hints: [
      'Does heating create more matter out of nothing?',
      'Do individual atoms grow physically bigger when hot, or do they move faster?',
      'Heating increases average kinetic energy and velocity of existing particles.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_21_adv',
    nodeId: NODE_C8_PHY_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Dry ice (solid CO2) is widely chosen over normal water ice for transporting Covid-19 vaccines and Amul ice cream in insulated boxes across India. What is the fundamental physical advantage?',
    options: [
      'Dry ice is much heavier than normal water ice, pressing down the vaccine vials',
      'Dry ice sublimes directly into gaseous CO2 at -78.5°C, providing extreme cold with ZERO wet liquid residue to damage packaging',
      'Dry ice generates electrical energy to power the cooling fans',
      'Dry ice is completely warm to touch and prevents freezing',
    ],
    correctIndex: 1,
    explanation: 'Dry ice sublimes directly from solid to gas at -78.5°C. It leaves absolutely no liquid puddle/meltwater, keeping vaccine cartons and cardboard packaging crisp, dry, and sterile during transit.',
    hints: [
      'What happens when normal ice melts inside a cardboard box?',
      'Sublimation skips the liquid phase entirely.',
      'Sublimation leaves no liquid residue (it stays dry) while maintaining -78.5°C.',
    ],
  },
  {
    id: 'ch_22_adv',
    nodeId: NODE_C8_PHY_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An irregular metallic alloy specimen has a mass of 316 g. In a Eureka can, it displaces 40 mL of water. What is the density of this alloy in SI units (kg/m³)?',
    correctAnswer: 7900,
    tolerance: 10,
    unit: 'kg/m³',
    explanation: 'Density in g/cm³ = 316 g / 40 cm³ = 7.9 g/cm³. To convert g/cm³ to kg/m³, multiply by 1000: 7.9 × 1000 = 7900 kg/m³ (density of steel/iron alloy).',
    hints: [
      'First calculate density in g/cm³: mass (316 g) / volume (40 cm³).',
      '316 / 40 = 7.9 g/cm³.',
      'Remember: 1 g/cm³ = 1000 kg/m³. Multiply 7.9 by 1000.',
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_PHY_001,
  title: 'Kinetic Theory of Matter, Changes of State & Density',
  definition: 'The Kinetic Theory of Matter states that all matter is composed of tiny particles in constant random motion possessing kinetic energy proportional to temperature. Inter-particle forces determine whether particles vibrate in fixed positions (solid), slide past each other (liquid), or move freely (gas). Density (rho = m/V) determines floatation (rho_obj < rho_fluid).',
  eli5: 'Think of particles like lively children: in a solid they stand shoulder-to-shoulder swaying on the spot; in a liquid they dance past each other holding hands loosely; in a gas they sprint freely everywhere! Things float when they are less packed than water.',
  misconceptions: [
    {
      misconception: 'Particles in a solid are completely at rest because solids are rigid.',
      correction: 'Solid particles are NOT at rest; they vibrate continuously about fixed lattice positions. Particle motion never stops.',
    },
    {
      misconception: 'Heating adds more particles to a substance, which is why it expands.',
      correction: 'Heating increases the kinetic energy and vibrational speed of EXISTING particles, pushing them slightly farther apart.',
    },
    {
      misconception: 'Heavy objects always sink and light objects always float.',
      correction: 'Floatation is governed by DENSITY (mass/volume ratio), not mass alone. A 50,000-tonne hollow steel ship floats, while a 2 g nail sinks.',
    },
    {
      misconception: 'Temperature keeps rising continuously while water boils or ice melts.',
      correction: 'Temperature remains CONSTANT during phase changes because heat is absorbed as latent heat to break inter-particle forces.',
    },
    {
      misconception: 'The white steam cloud above a tea kettle is water vapour.',
      correction: 'True water vapour is an invisible gas. The visible white cloud is condensed liquid water droplets formed upon meeting cooler air.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What type of particle motion occurs in solids?', options: ['Free random flight', 'Vibration about fixed positions', 'Sliding rotation', 'No movement'], correctIndex: 1 },
    { question: 'What is the temperature of melting pure ice at 1 atm?', options: ['100°C', '0°C', '-10°C', '4°C'], correctIndex: 1 },
    { question: 'Why does a matka keep water cool?', options: ['Chemical cooling', 'Surface evaporation takes away latent heat', 'Clay absorbs sunlight', 'Porous clay generates ice'], correctIndex: 1 },
    { question: 'Which substance undergoes sublimation?', options: ['Common salt', 'Ammonium chloride', 'Iron', 'Sugar'], correctIndex: 1 },
    { question: 'Formula for density is:', options: ['Volume / Mass', 'Mass × Volume', 'Mass / Volume', 'Weight × Gravity'], correctIndex: 2 },
    { question: 'An object floats in water if its density is:', options: ['Greater than 1.0 g/cm³', 'Less than 1.0 g/cm³', 'Exactly 13.6 g/cm³', 'Equal to 100 g/cm³'], correctIndex: 1 },
    { question: 'During boiling, the temperature of water:', options: ['Rises to 120°C', 'Remains constant at 100°C', 'Drops to 0°C', 'Fluctuates rapidly'], correctIndex: 1 },
    { question: 'Displaced volume of an immersed solid equals:', options: ['Half its volume', 'Twice its mass', 'Volume of the solid itself', 'Weight of the can'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student understands 5 postulates of kinetic theory, differentiates 3 states by motion and energy, explains phase changes & latent heat plateau, computes density via displacement, and predicts floatation.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Postulate 1 & 2: Particle Motion & Temperature Lab',
    instruction: 'Drag the Temperature Slider from -20°C to 150°C and watch how particle motion transitions from vibration to sliding to free flight!',
    interactionType: 'slider-temperature',
    nodeId: NODE_C8_PHY_001,
  },
  {
    title: 'Phase Change & Latent Heat Plateau',
    instruction: 'Toggle Heat Input to watch the thermometer graph freeze at 0°C (melting) and 100°C (boiling) as latent heat breaks intermolecular bonds.',
    interactionType: 'heat-curve',
    nodeId: NODE_C8_PHY_004,
  },
  {
    title: 'Evaporation & Matka Cooling Lab',
    instruction: 'Adjust Wind Speed, Surface Area, and Humidity to see why water in an earthen pot cools down rapidly in dry weather.',
    interactionType: 'evap-factors',
    nodeId: NODE_C8_PHY_006,
  },
  {
    title: 'Sublimation Chamber (Solid to Gas)',
    instruction: 'Click "Heat Camphor / NH4Cl" to see particles skip the liquid state entirely and deposit as solid crystals on the cold funnel wall.',
    interactionType: 'sublimation-demo',
    nodeId: NODE_C8_PHY_008,
  },
  {
    title: 'Eureka Can & Floatation Tank',
    instruction: 'Select different materials (Stone, Cork, Iron, Ship) and immerse them into Water, Kerosene, or Mercury to test density & displacement.',
    interactionType: 'eureka-density',
    nodeId: NODE_C8_PHY_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you drop a solid cube of seasoned wood (density 0.85 g/cm³) into kerosene (density 0.80 g/cm³), will it float or sink?',
    options: ['Float — wood always floats in any liquid', 'Sink — because 0.85 g/cm³ is GREATER than 0.80 g/cm³', 'Dissolve instantly', 'Stay suspended at the top'],
    correctIndex: 1,
    verifyInstruction: 'Now select "Wood (0.85)" and "Kerosene (0.80)" in the tank below to verify!',
    nodeId: NODE_C8_PHY_010,
  },
  {
    question: 'Predict: When 50 mL of water is left in a shallow broad plate vs a tall narrow tube on a hot day, which evaporates faster?',
    options: ['Tall narrow tube', 'Shallow broad plate (larger exposed surface area)', 'Both at exact same rate', 'Neither will evaporate'],
    correctIndex: 1,
    verifyInstruction: 'Increase the Surface Area slider and observe the evaporation rate gauge spike!',
    nodeId: NODE_C8_PHY_006,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about particle motion as you raise temperature above 100°C?',
    observableOptions: [
      'Particles slow down and group together',
      'Particles break free from neighbours and fly rapidly in straight lines colliding with container walls',
      'Particles stop moving completely',
      'Particles turn blue and disappear',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_PHY_002,
  },
  {
    question: 'What do you observe about the thermometer reading when ice is actively melting at 0°C?',
    observableOptions: [
      'Temperature steadily rises to 20°C',
      'Temperature stays flat at 0°C until the last piece of ice has melted',
      'Temperature drops below -50°C',
      'The thermometer mercury turns solid',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_PHY_004,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Expedition Field Lab: Solve 3 Real Mysteries',
  description: 'Apply your physics mastery to solve three authentic Indian engineering and medical logistics challenges.',
  steps: [
    'Amul Cold-Chain: Explain why solid dry ice (-78.5°C) is packed with vaccine shipments to Ladakh instead of water ice cubes.',
    'Kolkata Port Logistics: Calculate how much enclosed air volume a 10,000-tonne steel barge on the Hooghly River needs to maintain an average density of 0.85 g/cm³.',
    'Desert Cooler Science: Explain why desert room coolers work wonders in dry Jodhpur (May) but fail miserably in humid Mumbai (August).',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

function C8_PhysicsKineticTheoryMatterSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_PHY_001,
  title = DEFAULT_PROPS.title || 'Kinetic Theory of Matter',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Subject config
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style exploration & lab state (35+ states)
  const [tempSim, setTempSim] = useState(25); // -20 to 150 °C
  const [heatApplied, setHeatApplied] = useState(false);
  const [evapArea, setEvapArea] = useState(50); // cm²
  const [evapWind, setEvapWind] = useState(20); // km/h
  const [evapHumidity, setEvapHumidity] = useState(40); // %
  const [matkaPorous, setMatkaPorous] = useState(true);
  const [sublimeHeated, setSublimeHeated] = useState(false);
  const [sublimeMaterial, setSublimeMaterial] = useState<'camphor' | 'nh4cl' | 'dryice'>('nh4cl');

  // Eureka & Density state
  const [selectedSpecimen, setSelectedSpecimen] = useState<'stone' | 'cork' | 'iron' | 'ship'>('stone');
  const [selectedFluid, setSelectedFluid] = useState<'water' | 'kerosene' | 'mercury'>('water');
  const [specimenMass, setSpecimenMass] = useState(60); // g
  const [specimenVol, setSpecimenVol] = useState(20); // cm³
  const [isImmersed, setIsImmersed] = useState(false);
  const [overflowCollected, setOverflowCollected] = useState(0);

  // Predict-then-check & observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive difficulty & SRS / BKT tracking
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & drop / construct / numeric states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // ─── DERIVED PHYSICAL CALCULATIONS ───
  const currentPhaseState = useMemo(() => {
    if (tempSim < 0) return 'Solid (Ice)';
    if (tempSim === 0) return 'Melting Equilibrium (Ice + Water)';
    if (tempSim < 100) return 'Liquid (Water)';
    if (tempSim === 100) return 'Boiling Equilibrium (Water + Steam)';
    return 'Gas (Steam / Vapour)';
  }, [tempSim]);

  const fluidDensity = useMemo(() => {
    if (selectedFluid === 'water') return 1.0;
    if (selectedFluid === 'kerosene') return 0.8;
    return 13.6; // mercury
  }, [selectedFluid]);

  const specimenDensity = useMemo(() => {
    if (selectedSpecimen === 'stone') return 3.0; // 60g, 20cm³
    if (selectedSpecimen === 'cork') return 0.24; // 12g, 50cm³
    if (selectedSpecimen === 'iron') return 7.8; // 156g, 20cm³
    return 0.85; // ship (composite with air: 8500g, 10000cm³)
  }, [selectedSpecimen]);

  const floatStatus = useMemo(() => {
    if (specimenDensity < fluidDensity) return 'Floats';
    if (Math.abs(specimenDensity - fluidDensity) < 0.01) return 'Neutral Floatation';
    return 'Sinks';
  }, [specimenDensity, fluidDensity]);

  const submergedPercentage = useMemo(() => {
    if (specimenDensity >= fluidDensity) return 100;
    return Math.min(100, Math.round((specimenDensity / fluidDensity) * 100));
  }, [specimenDensity, fluidDensity]);

  const evaporationRate = useMemo(() => {
    // Rate ~ (Area * Wind * (100 - Humidity) * Temp)
    const factor = (evapArea / 50) * (1 + evapWind / 30) * ((100 - evapHumidity) / 60) * (Math.max(10, tempSim) / 25);
    return Math.max(0.1, parseFloat(factor.toFixed(2)));
  }, [evapArea, evapWind, evapHumidity, tempSim]);

  const matkaWaterTemp = useMemo(() => {
    if (!matkaPorous) return tempSim;
    const cooling = (evaporationRate * 1.8).toFixed(1);
    return Math.max(12, parseFloat((tempSim - parseFloat(cooling)).toFixed(1)));
  }, [matkaPorous, evaporationRate, tempSim]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT SCORE UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner'
      ? 'foundation'
      : mastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS PARTICLE SIMULATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 240);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      originX: number;
      originY: number;
      radius: number;
      color: string;
    }

    const numCols = 8;
    const numRows = 5;
    const particles: Particle[] = [];

    // Initialize lattice positions
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        const ox = (width / 2) - 100 + j * 28;
        const oy = height - 50 - i * 28;
        particles.push({
          x: ox,
          y: oy,
          originX: ox,
          originY: oy,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: 7,
          color: '#38bdf8',
        });
      }
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Draw container walls
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.strokeRect(30, 20, width - 60, height - 30);

      // Draw state banner in canvas
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Temp: ${tempSim}°C | State: ${currentPhaseState}`, 40, 40);

      // Particle physics based on state
      const isSolid = tempSim <= 0;
      const isLiquid = tempSim > 0 && tempSim < 100;

      const speedFactor = Math.max(0.2, (tempSim + 40) / 40);

      particles.forEach((p, idx) => {
        if (isSolid) {
          // Vibrating about fixed origin
          const vibAmp = Math.max(1, (tempSim + 30) * 0.15);
          p.x = p.originX + Math.sin(frame * 0.3 * speedFactor + idx) * vibAmp;
          p.y = p.originY + Math.cos(frame * 0.3 * speedFactor + idx) * vibAmp;
          p.color = '#60a5fa'; // Cool blue
        } else if (isLiquid) {
          // Sliding past each other at bottom
          p.x += p.vx * speedFactor * 0.8;
          p.y += p.vy * speedFactor * 0.8;

          // Boundary constraints (contained in bottom half)
          if (p.x < 45 || p.x > width - 45) p.vx *= -1;
          if (p.y < height - 120 || p.y > height - 20) p.vy *= -1;
          p.color = '#38bdf8'; // Sky blue
        } else {
          // Gas: flying freely across entire container
          p.x += p.vx * speedFactor * 1.8;
          p.y += p.vy * speedFactor * 1.8;

          if (p.x < 40 || p.x > width - 40) p.vx *= -1;
          if (p.y < 30 || p.y > height - 20) p.vy *= -1;
          p.color = '#f97316'; // Energetic orange/red
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // If solid, draw inter-particle spring/force lines
        if (isSolid) {
          particles.forEach((other, oIdx) => {
            if (oIdx > idx) {
              const dx = other.x - p.x;
              const dy = other.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 35) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
                ctx.lineWidth = 1;
                ctx.stroke();
              }
            }
          });
        }
      });

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [tempSim, currentPhaseState]);

  // ─── AUDIO & SPEECH HANDLERS ───
  const playSound = useCallback((effect: Parameters<typeof audioManager.play>[0]) => {
    audioManager.play(effect);
  }, []);

  const speakText = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // ─── TIMER INACTIVITY (AUTO-HINT) ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && challenge.hints.length > 0) {
        setCurrentHint(challenge.hints[0]);
        setShowHint(true);
        setHintCount(1);
        playSound('hint');
        speakText('Here is a hint to help you.');
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge, playSound, speakText]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    playSound(isCorrect ? 'success' : 'pop');
    speakText(isCorrect ? 'Spot on! The temperature stays constant during boiling.' : DISCOVERY_QUESTION.hintAfter);
  }, [playSound, speakText]);

  // ─── PHASE TRANSITIONS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    playSound('whoosh');
    speakText('Welcome to the interactive exploration! Manipulate the variables and discover the kinetic theory.');
  }, [playSound, speakText]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    playSound('whoosh');
    speakText('Now enjoy free play in the Physics Sandbox. Try anything with zero pressure.');
  }, [playSound, speakText]);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    playSound('whoosh');
    speakText('Time for ICSE challenges! Apply your discoveries to score mastery.');
    resetInactivityTimer();
  }, [playSound, speakText, resetInactivityTimer]);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    playSound('tap');
    speakText('Prediction recorded! Now test the simulation below to check your hypothesis.');
  }, [playSound, speakText]);

  const handleVerifyPrediction = useCallback(() => {
    setPredictionVerified(true);
    playSound('sparkle');
    speakText('Hypothesis verified! Look at the physical results in real time.');
  }, [playSound, speakText]);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    playSound(isCorrect ? 'success' : 'pop');
    speakText(isCorrect ? 'Excellent observation! Scientific notice leads to physics mastery.' : 'Look closely at particle flight.');
  }, [playSound, speakText]);

  const handleMatkaToggle = useCallback(() => {
    setMatkaPorous(prev => !prev);
    playSound('pop');
  }, [playSound]);

  const handleSublimeToggle = useCallback(() => {
    setSublimeHeated(prev => !prev);
    playSound('balance');
    speakText(sublimeHeated ? 'Cooling chamber' : 'Heating sublimable solid! Watch vapour bypass liquid state.');
  }, [sublimeHeated, playSound, speakText]);

  const handleImmersionToggle = useCallback(() => {
    setIsImmersed(prev => {
      const next = !prev;
      if (next) {
        setOverflowCollected(specimenVol);
        playSound('drop-correct');
      } else {
        setOverflowCollected(0);
        playSound('whoosh');
      }
      return next;
    });
  }, [specimenVol, playSound]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      playSound('hint');
      speakText(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge, playSound, speakText]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    playSound('celebration');
    speakText('Outstanding! You have mastered the Kinetic Theory of Matter and Density.');
  }, [errors, onComplete, playSound, speakText]);

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
      playSound('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, playSound, resetInactivityTimer]);

  // ─── ANSWER SUBMISSION HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      playSound('drop-correct');
      playSound('success');
      speakText('Brilliant! Correct deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ bestScore: 100, lastPlayed: Date.now() }));
      }
    } else {
      playSound('drop-wrong');
      playSound('error');
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
        speakText('Let us examine the step-by-step physics explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, playSound, speakText, resetInactivityTimer]);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    playSound('pickup');
  }, [playSound]);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      playSound('drop-correct');
    } else {
      playSound('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge, playSound]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    playSound('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? prev : (challenge.sortItems?.map((_, i) => i) || []);
      const updated = [...base];
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);
      return updated;
    });
  }, [challenge, playSound]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span whileHover={{ rotate: 20 }} className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50">
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">ICSE Class 8 Physics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">CISCE 2026</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') handleAdvanceToChallenge();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'explore') handleAdvanceToExploration();
                else setPhase('discovery');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY (CURIOSITY HOOK) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Box */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-5 bg-gradient-to-br from-gold-950/40 via-slate-900 to-gold-950/40 rounded-2xl border border-gold-800/40"
            >
              <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
                <span>🏔️ Expedition Briefing</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-300/80 mt-2 font-medium">{SCENARIO.context}</p>
            </motion.div>

            {/* Interactive Curiosity Hook */}
            <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Pre-Lab Prediction
                </span>
                <span className="text-xs text-slate-400">Test your initial intuition — not graded!</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-gold-500/50'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">{String.fromCharCode(65 + i)}</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                  <div className={`p-4 rounded-xl border ${discoveryCorrect ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300' : 'bg-amber-950/40 border-amber-700 text-amber-300'}`}>
                    <p className="text-sm font-semibold">{discoveryCorrect ? '✓ Spot on!' : '💡 Notice the Mystery:'}</p>
                    <p className="text-xs mt-1 text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-600 text-white rounded-xl font-extrabold text-sm shadow-lg shadow-gold-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Enter the Interactive Physics Lab</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: EXPLORE (GUIDED INTERACTIVE BRILLIANT LABS) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key={`explore-step-${currentSlide}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Step Header */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-gold-950 text-gold-300 border border-gold-800 font-mono">
                {EXPLORATION_STEPS[currentSlide].nodeId}
              </span>
            </div>

            <motion.p className="text-sm font-semibold text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 flex items-center gap-2">
              <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
            </motion.p>

            {/* ── INTERACTIVE CANVAS / SVG SIMULATION PER STEP ── */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-inner">
              {/* STEP 0: Particle Chamber & Temperature Slider */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <canvas ref={canvasRef} className="w-full block" />
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-400">Temperature Control:</span>
                      <span className={tempSim <= 0 ? 'text-gold-400' : tempSim >= 100 ? 'text-orange-400' : 'text-gold-400'}>
                        {tempSim}°C ({currentPhaseState})
                      </span>
                    </div>
                    <input
                      type="range"
                      min={-20}
                      max={150}
                      value={tempSim}
                      onChange={(e) => setTempSim(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                      aria-label="Temperature slider"
                    />
                    <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                      <span>-20°C (Ice Solid)</span>
                      <span>0°C (Melting)</span>
                      <span>25°C (Room Water)</span>
                      <span>100°C (Boiling)</span>
                      <span>150°C (Steam Gas)</span>
                    </div>
                  </div>

                  {/* Multi-Representation Metric Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Particle Spacing</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {tempSim <= 0 ? 'Tightly Packed (Lattice)' : tempSim < 100 ? 'Close & Disordered' : 'Far Apart (Wide Spacing)'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Inter-Particle Forces</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {tempSim <= 0 ? 'Very Strong (Rigid)' : tempSim < 100 ? 'Moderate (Allows Flow)' : 'Negligible (Free Fly)'}
                      </p>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Kinetic Energy (KE)</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {tempSim <= 0 ? 'Lowest (Vibration only)' : tempSim < 100 ? 'Intermediate (Sliding)' : 'Highest (High Velocity)'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Phase Change & Latent Heat Heating Curve */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <svg viewBox="0 0 500 240" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2">
                    {/* Graph Axes */}
                    <line x1="50" y1="200" x2="470" y2="200" stroke="#475569" strokeWidth="2" />
                    <line x1="50" y1="20" x2="50" y2="200" stroke="#475569" strokeWidth="2" />
                    <text x="470" y="215" fill="#94a3b8" fontSize="10" textAnchor="end">Time (Heat Supplied →)</text>
                    <text x="40" y="30" fill="#94a3b8" fontSize="10" textAnchor="end">Temp (°C)</text>

                    {/* Horizontal Reference Lines */}
                    <line x1="50" y1="160" x2="470" y2="160" stroke="#334155" strokeDasharray="4" />
                    <text x="45" y="163" fill="#60a5fa" fontSize="9" textAnchor="end">0°C</text>

                    <line x1="50" y1="70" x2="470" y2="70" stroke="#334155" strokeDasharray="4" />
                    <text x="45" y="73" fill="#f97316" fontSize="9" textAnchor="end">100°C</text>

                    {/* Heating Curve Profile: Solid warm -> Flat 0°C -> Liquid warm -> Flat 100°C -> Steam */}
                    <path
                      d="M 50 190 L 100 160 L 180 160 L 260 70 L 370 70 L 450 30"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3.5"
                    />

                    {/* Latent heat highlight plateaus */}
                    <rect x="100" y="152" width="80" height="16" fill="rgba(96, 165, 250, 0.2)" rx="4" />
                    <text x="140" y="163" fill="#93c5fd" fontSize="8" textAnchor="middle" fontWeight="bold">Melting Plateau (0°C)</text>

                    <rect x="260" y="62" width="110" height="16" fill="rgba(249, 115, 22, 0.2)" rx="4" />
                    <text x="315" y="73" fill="#fdba74" fontSize="8" textAnchor="middle" fontWeight="bold">Boiling Plateau (100°C)</text>

                    {/* Dynamic Indicator Point based on tempSim */}
                    <circle
                      cx={
                        tempSim < 0 ? 50 + ((tempSim + 20) / 20) * 50
                        : tempSim === 0 ? 140
                        : tempSim < 100 ? 180 + (tempSim / 100) * 80
                        : tempSim === 100 ? 315
                        : 370 + Math.min(80, ((tempSim - 100) / 50) * 80)
                      }
                      cy={
                        tempSim < 0 ? 190 - ((tempSim + 20) / 20) * 30
                        : tempSim === 0 ? 160
                        : tempSim < 100 ? 160 - (tempSim / 100) * 90
                        : tempSim === 100 ? 70
                        : 70 - Math.min(40, ((tempSim - 100) / 50) * 40)
                      }
                      r="6"
                      fill="#ec4899"
                      stroke="#fff"
                      strokeWidth="2"
                    />
                  </svg>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-xs text-slate-400">Current Phase & Energy State:</span>
                      <p className="text-sm font-bold text-gold-300">{currentPhaseState}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTempSim(0)}
                        className="px-3 py-1.5 bg-gold-900/60 hover:bg-gold-800 text-gold-200 text-xs font-bold rounded-lg border border-gold-700"
                      >
                        Snap to 0°C (Fusion)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTempSim(100)}
                        className="px-3 py-1.5 bg-orange-900/60 hover:bg-orange-800 text-orange-200 text-xs font-bold rounded-lg border border-orange-700"
                      >
                        Snap to 100°C (Vaporization)
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Evaporation & Matka Cooling Lab */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Predict-then-check block */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/50 space-y-3">
                      <span className="text-xs font-bold text-gold-400">Predict Before Testing:</span>
                      <p className="text-sm text-slate-100">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center p-3 bg-gold-950/60 rounded-xl border border-gold-700 text-xs">
                      <span className="text-gold-200">{PREDICTION_QUESTIONS[1].verifyInstruction}</span>
                      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleVerifyPrediction} className="px-3 py-1 bg-gold-600 text-white font-bold rounded-lg">
                        Verify ✓
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Evaporation Controls & Matka Visualizer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SVG Matka and Cooling representation */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 200 180" className="w-44 h-44">
                        {/* Matka earthen pot */}
                        <path d="M 60 40 L 140 40 L 130 60 Q 180 110 140 150 L 60 150 Q 20 110 70 60 Z" fill="#78350f" stroke="#b45309" strokeWidth="2.5" />
                        {/* Water level inside */}
                        <path d="M 68 80 Q 100 85 132 80 Q 165 115 135 145 L 65 145 Q 35 115 68 80 Z" fill="rgba(56, 189, 248, 0.6)" />
                        {/* Evaporating particles escaping */}
                        {matkaPorous && (
                          <g>
                            <circle cx="45" cy="80" r="3" fill="#38bdf8" opacity="0.8" />
                            <circle cx="35" cy="110" r="3.5" fill="#38bdf8" opacity="0.6" />
                            <circle cx="155" cy="85" r="3" fill="#38bdf8" opacity="0.8" />
                            <circle cx="165" cy="115" r="3.5" fill="#38bdf8" opacity="0.6" />
                            <text x="100" y="170" fill="#38bdf8" fontSize="9" textAnchor="middle">Seeping & Evaporating</text>
                          </g>
                        )}
                        <text x="100" y="115" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                          {matkaWaterTemp}°C
                        </text>
                      </svg>
                      <span className="text-xs text-slate-400 mt-2">
                        Water in {matkaPorous ? 'Porous Earthen Matka' : 'Sealed Steel Jug'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleMatkaToggle}
                        className="mt-2 px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-gold-300 font-bold rounded-lg border border-slate-700"
                      >
                        Toggle: {matkaPorous ? 'Porous Clay' : 'Non-Porous Steel'}
                      </motion.button>
                    </div>

                    {/* 4 Factor Sliders */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Surface Area:</span>
                          <span className="text-gold-400 font-mono font-bold">{evapArea} cm²</span>
                        </div>
                        <input type="range" min={10} max={100} value={evapArea} onChange={(e) => setEvapArea(Number(e.target.value))} className="w-full accent-gold-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Wind Speed:</span>
                          <span className="text-gold-400 font-mono font-bold">{evapWind} km/h</span>
                        </div>
                        <input type="range" min={0} max={60} value={evapWind} onChange={(e) => setEvapWind(Number(e.target.value))} className="w-full accent-gold-500" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Humidity (Air Saturation):</span>
                          <span className="text-gold-400 font-mono font-bold">{evapHumidity}%</span>
                        </div>
                        <input type="range" min={5} max={95} value={evapHumidity} onChange={(e) => setEvapHumidity(Number(e.target.value))} className="w-full accent-gold-500" />
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold">Evaporation Rate Index:</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">{evaporationRate} g/min</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Sublimation Demo (Solid straight to Gas) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <svg viewBox="0 0 240 220" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                      {/* China Dish */}
                      <ellipse cx="120" cy="180" rx="60" ry="15" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
                      {/* Sublimable solid pile */}
                      <path d="M 90 180 Q 120 165 150 180 Z" fill="#e2e8f0" />
                      {/* Inverted Funnel */}
                      <path d="M 115 30 L 125 30 L 125 70 L 175 175 L 65 175 L 115 70 Z" fill="rgba(255, 255, 255, 0.08)" stroke="#cbd5e1" strokeWidth="2" />
                      {/* Cotton plug */}
                      <ellipse cx="120" cy="30" rx="10" ry="6" fill="#f8fafc" />

                      {/* Burner Flame */}
                      {sublimeHeated && (
                        <g>
                          <path d="M 120 195 Q 110 215 120 220 Q 130 215 120 195 Z" fill="#f97316" />
                          <path d="M 120 198 Q 115 210 120 215 Q 125 210 120 198 Z" fill="#facc15" />
                          {/* Rising white fumes */}
                          <circle cx="115" cy="140" r="6" fill="#f1f5f9" opacity="0.7" />
                          <circle cx="128" cy="120" r="8" fill="#f1f5f9" opacity="0.6" />
                          <circle cx="110" cy="95" r="7" fill="#f1f5f9" opacity="0.7" />
                          {/* Re-deposited solid crystals on cold funnel walls */}
                          <circle cx="85" cy="145" r="3" fill="#ffffff" />
                          <circle cx="95" cy="120" r="3.5" fill="#ffffff" />
                          <circle cx="145" cy="140" r="3" fill="#ffffff" />
                          <circle cx="138" cy="115" r="3.5" fill="#ffffff" />
                          <text x="120" y="110" fill="#f8fafc" fontSize="8" fontWeight="bold" textAnchor="middle">Direct Gas Vapour</text>
                        </g>
                      )}
                      <text x="120" y="20" fill="#94a3b8" fontSize="8" textAnchor="middle">Cotton Plug</text>
                    </svg>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-slate-400">Select Sublimable Material:</span>
                        <div className="grid grid-cols-3 gap-2">
                          {(['nh4cl', 'camphor', 'dryice'] as const).map((mat) => (
                            <motion.button
                              key={mat}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSublimeMaterial(mat)}
                              className={`p-2 rounded-lg text-xs font-bold capitalize border ${
                                sublimeMaterial === mat
                                  ? 'bg-gold-600 text-white border-gold-400'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                              }`}
                            >
                              {mat === 'nh4cl' ? 'NH₄Cl' : mat === 'camphor' ? 'Camphor' : 'Dry Ice'}
                            </motion.button>
                          ))}
                        </div>
                        <p className="text-xs text-slate-300 mt-2">
                          Notice: In sublimation, NO liquid pool is ever formed! Particles with high vapour pressure jump directly from solid lattice to vapour state.
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleSublimeToggle}
                        className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all ${
                          sublimeHeated
                            ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                            : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                        }`}
                      >
                        {sublimeHeated ? 'Extinguish Flame (Observe Deposition)' : '🔥 Light Burner & Heat Solid'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Eureka Can & Floatation Tank */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Eureka can SVG visualizer */}
                    <svg viewBox="0 0 260 220" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                      {/* Eureka Can */}
                      <rect x="40" y="50" width="90" height="130" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      {/* Side Spout */}
                      <polygon points="130,70 170,95 165,100 130,80" fill="#475569" stroke="#64748b" strokeWidth="1.5" />
                      {/* Water inside can */}
                      <rect x="42" y="70" width="86" height="108" fill="rgba(56, 189, 248, 0.4)" />

                      {/* Suspended Solid */}
                      <motion.g animate={{ y: isImmersed ? 40 : 0 }}>
                        <line x1="85" y1="10" x2="85" y2="70" stroke="#f8fafc" strokeWidth="1.5" strokeDasharray="3" />
                        <rect x="70" y="70" width="30" height="30" rx="4" fill={selectedSpecimen === 'iron' ? '#94a3b8' : selectedSpecimen === 'cork' ? '#d97706' : '#64748b'} stroke="#fff" strokeWidth="1.5" />
                        <text x="85" y="90" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">{selectedSpecimen}</text>
                      </motion.g>

                      {/* Displaced water dripping to measuring cylinder */}
                      {isImmersed && (
                        <path d="M 168 98 Q 175 120 185 140" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4" />
                      )}

                      {/* Measuring Cylinder under spout */}
                      <rect x="175" y="110" width="40" height="80" rx="2" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                      {isImmersed && (
                        <rect x="176" y={190 - overflowCollected * 1.5} width="38" height={overflowCollected * 1.5} fill="rgba(56, 189, 248, 0.7)" />
                      )}
                      <text x="195" y="202" fill="#38bdf8" fontSize="8" fontWeight="bold" textAnchor="middle">{overflowCollected} cm³</text>
                    </svg>

                    {/* Specimen and Liquid Controls */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-bold block mb-1">Select Specimen:</span>
                        <div className="grid grid-cols-4 gap-1">
                          {(['stone', 'cork', 'iron', 'ship'] as const).map((s) => (
                            <motion.button
                              key={s}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedSpecimen(s);
                                setIsImmersed(false);
                                setOverflowCollected(0);
                              }}
                              className={`p-1.5 rounded-lg font-bold capitalize border ${
                                selectedSpecimen === s ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                              }`}
                            >
                              {s}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 font-bold block mb-1">Immersion Liquid:</span>
                        <div className="grid grid-cols-3 gap-1">
                          {(['water', 'kerosene', 'mercury'] as const).map((f) => (
                            <motion.button
                              key={f}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setSelectedFluid(f)}
                              className={`p-1.5 rounded-lg font-bold capitalize border ${
                                selectedFluid === f ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                              }`}
                            >
                              {f} ({f === 'water' ? '1.0' : f === 'kerosene' ? '0.8' : '13.6'})
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Computed Properties */}
                      <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Specimen Density (ρ_obj):</span>
                          <span className="text-gold-300 font-bold">{specimenDensity} g/cm³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Fluid Density (ρ_fluid):</span>
                          <span className="text-gold-300 font-bold">{fluidDensity} g/cm³</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-slate-800">
                          <span className="text-slate-400">Prediction & Result:</span>
                          <span className={`font-bold ${floatStatus === 'Floats' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {floatStatus} ({submergedPercentage}% Submerged)
                          </span>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleImmersionToggle}
                        className="w-full py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl shadow-lg"
                      >
                        {isImmersed ? 'Lift Out of Eureka Can' : '💧 Lower into Eureka Can'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex justify-between items-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs font-bold text-slate-500 font-mono">
                {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-600/30"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                >
                  Open Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX (FREE EXPLORATION BEFORE CHALLENGE) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3">
              <div>
                <h3 className="text-lg font-black text-white">🎛️ Free Physics Exploration Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manipulate all variables at once with zero grading or evaluation. Build your intuition!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-gold-600 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-600/30"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Sandbox 1: Particle Dynamics Engine */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-gold-300">Particle Simulation Chamber</h4>
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <canvas ref={canvasRef} className="w-full block" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Set Temperature:</span>
                    <span className="text-gold-400 font-mono">{tempSim}°C</span>
                  </div>
                  <input type="range" min={-20} max={150} value={tempSim} onChange={(e) => setTempSim(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
              </div>

              {/* Sandbox 2: Density & Buoyancy Tank */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-gold-300">Density & Floatation Testing Tank</h4>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">Specimen:</span>
                      <select
                        value={selectedSpecimen}
                        onChange={(e) => setSelectedSpecimen(e.target.value as 'stone' | 'cork' | 'iron' | 'ship')}
                        className="w-full bg-slate-900 text-white p-2 rounded-lg border border-slate-700"
                      >
                        <option value="stone">Stone (3.0 g/cm³)</option>
                        <option value="cork">Cork (0.24 g/cm³)</option>
                        <option value="iron">Iron Bolt (7.8 g/cm³)</option>
                        <option value="ship">Hollow Steel Ship (0.85 g/cm³)</option>
                      </select>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block mb-1">Immersion Liquid:</span>
                      <select
                        value={selectedFluid}
                        onChange={(e) => setSelectedFluid(e.target.value as 'water' | 'kerosene' | 'mercury')}
                        className="w-full bg-slate-900 text-white p-2 rounded-lg border border-slate-700"
                      >
                        <option value="water">Pure Water (1.0 g/cm³)</option>
                        <option value="kerosene">Kerosene (0.8 g/cm³)</option>
                        <option value="mercury">Mercury (13.6 g/cm³)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Condition:</span>
                      <span className="text-white font-bold">
                        {specimenDensity} {specimenDensity < fluidDensity ? '<' : '>'} {fluidDensity} g/cm³
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Result:</span>
                      <span className={`font-black ${floatStatus === 'Floats' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {floatStatus} ({submergedPercentage}% submerged)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE BKT + NEP COMPETENCY) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key={`challenge-${challenge.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Top Challenge Meta Bar */}
            <div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 font-mono">
                  Challenge {currentChallenge + 1} / {filteredChallenges.length}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-gold-950 text-gold-300 border border-gold-800 font-mono">
                  {challenge.nodeId}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Adaptive Difficulty Badge */}
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                      : difficulty === 'standard'
                      ? 'bg-gold-950/70 border-gold-500 text-gold-300'
                      : 'bg-purple-950/70 border-purple-500 text-purple-300'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>

                {/* NEP 2020 Competency Badge */}
                <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-bold capitalize">
                  {challenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Card */}
            <div
              className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
                wrongFlash ? 'bg-rose-950/50 border-rose-600' : 'border-slate-800'
              }`}
            >
              <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
                {challenge.question}
              </h3>

              {/* 1. MCQ Variant */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border flex items-start gap-3 ${
                        showExplanation
                          ? idx === challenge.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-gold-500/50 text-slate-200'
                      }`}
                      aria-label={`Option ${idx + 1}: ${opt}`}
                    >
                      <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">{String.fromCharCode(65 + idx)}</span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Variant */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block w-full mb-1">Drag these labels:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'target_vibrate', desc: 'Vibrates in fixed lattice' },
                      { id: 'target_slide', desc: 'Slides past one another' },
                      { id: 'target_free', desc: 'Moves freely at high speed' },
                    ].map((target) => (
                      <div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className={`p-4 rounded-xl border-2 border-dashed min-h-[100px] flex flex-col justify-between ${
                          droppedLabels[target.id] ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-400">{target.desc}</span>
                        <div className="text-sm font-black text-gold-300 mt-2">
                          {droppedLabels[target.id] || 'Drop matching state here'}
                        </div>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={Object.keys(droppedLabels).length < 3 || showExplanation}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Check Diagram Labels
                  </motion.button>
                </div>
              )}

              {/* 3. Drag-Sort Variant */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400 block">Drag or click to arrange in correct chronological sequence:</span>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm font-medium flex items-center gap-3 cursor-grab text-slate-200"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-400 font-bold flex items-center justify-center border border-gold-800 text-xs">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Check Ordered Sequence
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Variant */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer"
                      disabled={showExplanation}
                      className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700 text-sm font-mono flex-1 focus:border-gold-500 focus:outline-none"
                    />
                    <span className="text-sm font-bold text-slate-400 font-mono">{challenge.unit}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={!numericInput || showExplanation}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              )}

              {/* 5. Construct Variant */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        disabled={showExplanation || constructParts.includes(part)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-gold-300 text-xs font-bold rounded-lg border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  {/* Assembled Parts Container */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] space-y-2">
                    {constructParts.map((part, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-between items-center p-2 bg-slate-900 rounded-lg text-xs font-mono text-slate-200 border border-slate-800"
                      >
                        <span>{idx + 1}. {part}</span>
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold px-2"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <p className="text-xs text-slate-600 text-center py-4">Click parts above to assemble step by step</p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-lg"
                  >
                    Verify Assembled Sequence
                  </motion.button>
                </div>
              )}

              {/* ── PROGRESSIVE DISCLOSURE EXPLANATION CARD ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-gold-950/40 to-slate-900 rounded-2xl border border-gold-800/60 space-y-4"
                >
                  <div className="flex items-center gap-2 text-gold-300 font-extrabold text-sm">
                    <span>📖 Step-by-Step CISCE Board Breakdown:</span>
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans"
                        >
                          <span className="font-bold text-gold-400 font-mono">{idx + 1}.</span>{' '}
                          {sentence}{!sentence.endsWith('.') ? '.' : ''}
                        </motion.p>
                      ))}
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-xl"
                      >
                        Reveal Next Sentence →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission 🏆' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETE (MASTERY SUMMARY & CAPSTONE) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-gold-950/40 rounded-3xl border border-emerald-600/50 text-center space-y-3">
              <span className="text-4xl">🎓</span>
              <h2 className="text-2xl font-black text-white">ICSE Physics Simulation Complete!</h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                Score: <span className="text-emerald-400 font-bold text-lg">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier:{' '}
                <span className="text-gold-400 font-bold capitalize">{masteryLevel}</span>
              </p>
            </div>

            {/* Motivational Feedback Banner */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-2xl border text-center font-black text-base shadow-lg ${
                errors === 0
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-emerald-500/20'
                  : errors <= 3
                  ? 'bg-gold-950/60 border-gold-500 text-gold-300 shadow-gold-500/20'
                  : errors <= 7
                  ? 'bg-amber-950/60 border-amber-500 text-amber-300 shadow-amber-500/20'
                  : 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-rose-500/20'
              }`}
            >
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </motion.div>

            {/* Diagnostic Assessment Details */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs leading-relaxed text-slate-300">
              <span className="font-bold text-white block mb-1">Diagnostic Assessment:</span>
              {errors === 0
                ? '🏆 Perfect Physics Run! You demonstrated complete conceptual command of the kinetic theory, phase changes, displacement density measurements, and floatation laws.'
                : errors <= 3
                ? '⭐ Strong Performance! You have solid intuition for particle dynamics and density. Review the few misconception profiles below for complete board exam perfection.'
                : errors <= 7
                ? '👍 Good Effort! You showed solid determination. Review key concepts like phase change plateaus and displacement density formulas to achieve complete mastery.'
                : '💪 Keep Building! Every misconception identified is an opportunity to strengthen your physics foundation. Review the steps and re-run the sandbox!'}
            </div>

            {/* Misconception Gaps Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                <h3 className="text-sm font-bold text-rose-300">⚠️ Your Identified Concept Boundaries:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-semibold">✓ ICSE Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition (SRS) Review Timeline */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 font-bold block">SM-2 Spaced Repetition Schedule:</span>
                <span className="text-slate-300">Next active recall session recommended in:</span>
              </div>
              <span className="text-sm font-black text-gold-400 font-mono px-3 py-1 bg-gold-950 rounded-lg border border-gold-800">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </span>
            </div>

            {/* Capstone Real-World Activities */}
            <div className="p-5 bg-gradient-to-br from-gold-950/40 to-slate-900 rounded-2xl border border-gold-800/50 space-y-3">
              <h3 className="text-sm font-black text-gold-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-2 text-xs text-slate-300 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                  setErrors(0);
                }}
                className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                🔄 Replay Interactive Labs
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── FEEDBACK OVERLAYS (SIM-ENGINE) ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_PhysicsKineticTheoryMatterSim;