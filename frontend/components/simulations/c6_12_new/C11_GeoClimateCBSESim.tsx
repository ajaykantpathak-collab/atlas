'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// -----------------------------------------------------------------------------
// NODE IDENTIFIERS (ISC / CBSE Class 11 Geography - Climate Chapter)
// -----------------------------------------------------------------------------
const NODE_IDS = {
  c11_geo_cbse_071: 'c11_geo_cbse_071',
  c11_geo_cbse_072: 'c11_geo_cbse_072',
  c11_geo_cbse_073: 'c11_geo_cbse_073',
  c11_geo_cbse_074: 'c11_geo_cbse_074',
  c11_geo_cbse_075: 'c11_geo_cbse_075',
  c11_geo_cbse_076: 'c11_geo_cbse_076',
  c11_geo_cbse_077: 'c11_geo_cbse_077',
  c11_geo_cbse_078: 'c11_geo_cbse_078',
  c11_geo_cbse_079: 'c11_geo_cbse_079',
  c11_geo_cbse_080: 'c11_geo_cbse_080',
  c11_geo_cbse_081: 'c11_geo_cbse_081',
  c11_geo_cbse_082: 'c11_geo_cbse_082',
  c11_geo_cbse_083: 'c11_geo_cbse_083',
  c11_geo_cbse_084: 'c11_geo_cbse_084',
  c11_geo_cbse_085: 'c11_geo_cbse_085',
  c11_geo_cbse_086: 'c11_geo_cbse_086',
  c11_geo_cbse_087: 'c11_geo_cbse_087',
  c11_geo_cbse_088: 'c11_geo_cbse_088',
  c11_geo_cbse_089: 'c11_geo_cbse_089',
  c11_geo_cbse_090: 'c11_geo_cbse_090',
  c11_geo_cbse_091: 'c11_geo_cbse_091',
  c11_geo_cbse_092: 'c11_geo_cbse_092',
  c11_geo_cbse_093: 'c11_geo_cbse_093',
  c11_geo_cbse_094: 'c11_geo_cbse_094',
  c11_geo_cbse_095: 'c11_geo_cbse_095',
  c11_geo_cbse_096: 'c11_geo_cbse_096',
  c11_geo_cbse_097: 'c11_geo_cbse_097',
  c11_geo_cbse_098: 'c11_geo_cbse_098',
  c11_geo_cbse_099: 'c11_geo_cbse_099',
  c11_geo_cbse_100: 'c11_geo_cbse_100',
  c11_geo_cbse_101: 'c11_geo_cbse_101',
  c11_geo_cbse_102: 'c11_geo_cbse_102',
  c11_geo_cbse_103: 'c11_geo_cbse_103',
  c11_geo_cbse_104: 'c11_geo_cbse_104',
  c11_geo_cbse_105: 'c11_geo_cbse_105',
  c11_geo_cbse_106: 'c11_geo_cbse_106',
  c11_geo_cbse_107: 'c11_geo_cbse_107',
  c11_geo_cbse_826: 'c11_geo_cbse_826',
  c11_geo_cbse_827: 'c11_geo_cbse_827',
  c11_geo_cbse_828: 'c11_geo_cbse_828',
  c11_geo_cbse_829: 'c11_geo_cbse_829',
  c11_geo_cbse_830: 'c11_geo_cbse_830',
  c11_geo_cbse_831: 'c11_geo_cbse_831',
  c11_geo_cbse_832: 'c11_geo_cbse_832',
  c11_geo_cbse_833: 'c11_geo_cbse_833',
  c11_geo_cbse_834: 'c11_geo_cbse_834',
  c11_geo_cbse_835: 'c11_geo_cbse_835',
  c11_geo_cbse_836: 'c11_geo_cbse_836',
  c11_geo_cbse_837: 'c11_geo_cbse_837',
  c11_geo_cbse_838: 'c11_geo_cbse_838',
  c11_geo_cbse_839: 'c11_geo_cbse_839',
  c11_geo_cbse_840: 'c11_geo_cbse_840',
  c11_geo_cbse_841: 'c11_geo_cbse_841',
  c11_geo_cbse_842: 'c11_geo_cbse_842',
  c11_geo_cbse_843: 'c11_geo_cbse_843',
  c11_geo_cbse_844: 'c11_geo_cbse_844',
  c11_geo_cbse_845: 'c11_geo_cbse_845',
  c11_geo_cbse_846: 'c11_geo_cbse_846',
  c11_geo_cbse_847: 'c11_geo_cbse_847',
  c11_geo_cbse_848: 'c11_geo_cbse_848',
  c11_geo_cbse_849: 'c11_geo_cbse_849',
  c11_geo_cbse_850: 'c11_geo_cbse_850',
  c11_geo_cbse_851: 'c11_geo_cbse_851',
  c11_geo_cbse_852: 'c11_geo_cbse_852',
  c11_geo_cbse_853: 'c11_geo_cbse_853',
  c11_geo_cbse_854: 'c11_geo_cbse_854',
  c11_geo_cbse_855: 'c11_geo_cbse_855',
  c11_geo_cbse_856: 'c11_geo_cbse_856',
  c11_geo_cbse_857: 'c11_geo_cbse_857',
  c11_geo_cbse_858: 'c11_geo_cbse_858',
  c11_geo_cbse_859: 'c11_geo_cbse_859',
};

const ALL_NODE_IDS: string[] = Object.values(NODE_IDS);

// -----------------------------------------------------------------------------
// SECTION 1: SCENARIO
// -----------------------------------------------------------------------------
const SCENARIO = {
  title: 'Global Climate Systems & Indian Monsoon Observatory',
  intro: 'Welcome to the Advanced Atmospheric Research Observatory. As Chief Climatologist, you are tasked with modeling Earth’s planetary heat balance, atmospheric circulation cells, Köppen climate zoning, and the dynamics of the Indian Monsoon system.',
  context: 'You will manipulate insolation parameters, atmospheric greenhouse gas concentrations, sea-surface temperature anomalies, pressure gradients, and regional climate drivers to understand atmospheric thermodynamic behavior and predict climate shifts.',
};

// -----------------------------------------------------------------------------
// SECTION 2: DISCOVERY QUESTION
// -----------------------------------------------------------------------------
const DISCOVERY_QUESTION = {
  question: 'Why does the Earth’s atmosphere get heated primarily from below (terrestrial radiation) rather than directly from incoming shortwave solar radiation?',
  options: [
    'Solar radiation is too cold to heat gases directly.',
    'Atmospheric gases are mostly transparent to shortwave solar radiation but absorb longwave terrestrial radiation efficiently.',
    'The atmosphere absorbs 90% of solar radiation in the stratosphere before it reaches the surface.',
    'Convection moves solar energy down to the surface, where it is converted into gravity wave energy.',
  ],
  correctIndex: 1,
  hintAfter: 'Shortwave radiation (0.2–0.4 µm) passes largely unchecked through clear air, but re-emitted longwave radiation (~10 µm) is strongly absorbed by greenhouse gases like CO₂, H₂O, and CH₄.',
};

// -----------------------------------------------------------------------------
// MISCONCEPTIONS
// -----------------------------------------------------------------------------
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Solar Radiation directly heats the troposphere',
    description: 'Many students believe the sun directly heats atmospheric air during the day.',
    correction: 'Solar shortwave radiation passes through the atmosphere with minor absorption (~14%). The surface absorbs shortwave radiation, heats up, and re-emits longwave terrestrial radiation, which heats the troposphere from below.',
  },
  {
    id: 'misc_2',
    title: 'Monsoons are just heavy rain showers',
    description: 'Equating the term "monsoon" solely with precipitation.',
    correction: 'Monsoon comes from the Arabic word "Mawsim", meaning season. It refers to a complete seasonal reversal of wind direction caused by differential heating of land and sea.',
  },
  {
    id: 'misc_3',
    title: 'Temperature always decreases with altitude',
    description: 'Assuming a strictly uniform negative environmental lapse rate.',
    correction: 'During temperature inversions (e.g., clear winter nights or polar regions), temperature increases with altitude in lower atmospheric layers.',
  },
  {
    id: 'misc_4',
    title: 'Köppen climate classification relies only on vegetation',
    description: 'Thinking Köppen only mapped flora distributions.',
    correction: 'Köppen mapped monthly mean temperature and precipitation thresholds, using vegetation boundaries as empirical indicators of climatic limits.',
  },
  {
    id: 'misc_5',
    title: 'Greenhouse effect is entirely caused by human pollution',
    description: 'Believing the natural greenhouse effect is harmful.',
    correction: 'The natural greenhouse effect raises Earth’s mean temperature from -18°C to +15°C. Human activities enhance it, causing accelerated global warming.',
  },
  {
    id: 'misc_6',
    title: 'Tropical Cyclones form directly over the equator',
    description: 'Expecting cyclones at latitude 0° due to maximum sea surface temperature.',
    correction: 'Tropical cyclones require the Coriolis force to initiate rotational vorticity. At the equator (0°), the Coriolis parameter is zero, preventing tropical cyclone formation within 0°–5° latitude.',
  },
];

// -----------------------------------------------------------------------------
// DEFAULT PROPS & INTERFACES
// -----------------------------------------------------------------------------
export interface C11_GeoClimateCBSESimProps {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  onNodeSelect?: (nodeId: string) => void;
}

// -----------------------------------------------------------------------------
// SECTION 3: EXPLORATION STEPS
// -----------------------------------------------------------------------------
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Insolation & Earth Heat Budget Simulator',
    instruction: 'Adjust the solar constant, cloud albedo, and atmospheric gas absorption to balance incoming solar energy (100 units) with outgoing longwave terrestrial radiation.',
    interactionType: 'heat-budget-slider',
    nodeId: NODE_IDS.c11_geo_cbse_081,
  },
  {
    title: 'Lab 2: Global Wind Systems & Coriolis Force',
    instruction: 'Modify latitude and surface pressure gradients to observe planetary wind deflection (Hadley, Ferrel, and Polar cells) driven by the Coriolis effect.',
    interactionType: 'planetary-winds-sim',
    nodeId: NODE_IDS.c11_geo_cbse_090,
  },
  {
    title: 'Lab 3: Köppen Climate Classification Engine',
    instruction: 'Input monthly mean temperature (°C) and monthly precipitation (mm) curves to auto-classify climate zones according to Köppen standards (A, B, C, D, E, H).',
    interactionType: 'koppen-classifier',
    nodeId: NODE_IDS.c11_geo_cbse_074,
  },
  {
    title: 'Lab 4: Indian Monsoon System Reversal',
    instruction: 'Toggle between Summer (SW Monsoon) and Winter (NE Monsoon) thermal states over the Indian Subcontinent and Tibetan Plateau to analyze pressure cell dynamics and jet streams.',
    interactionType: 'monsoon-dynamics',
    nodeId: NODE_IDS.c11_geo_cbse_077,
  },
  {
    title: 'Lab 5: Greenhouse Radiative Forcing & Global Warming',
    instruction: 'Increase atmospheric CO₂ concentration (ppm) to observe re-radiation trapping, thermal atmospheric expansion, and global radiative imbalance.',
    interactionType: 'greenhouse-forcing',
    nodeId: NODE_IDS.c11_geo_cbse_102,
  },
];

// -----------------------------------------------------------------------------
// SECTION 4: PREDICTION QUESTIONS
// -----------------------------------------------------------------------------
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the Tibetan Plateau experiences anomalously intense summer heating, how will the South-West Monsoon over India react?',
    options: [
      'The monsoon winds will weaken due to atmospheric subsidence over Tibet.',
      'The monsoon pressure gradient will strengthen, leading to an intensified SW monsoon onset.',
      'The easterly jet stream will collapse, shifting rainfall to Central Asia.',
      'The ITCZ will move south toward the Equator, causing a prolonged drought.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, set Tibetan Plateau summer heating to high and observe the low-pressure anomaly depth and wind vectors.',
    nodeId: NODE_IDS.c11_geo_cbse_077,
  },
  {
    question: 'Predict: What happens to the global heat budget if low-level stratus cloud cover increases significantly across the tropics?',
    options: [
      'Global surface temperature increases sharply due to greenhouse trapping.',
      'Shortwave albedo increases, reflecting more solar energy back to space and exerting a net cooling effect.',
      'Terrestrial radiation escaping to space increases to 85 units.',
      'Atmospheric lapse rate increases past 15°C/km.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, increase cloud albedo from 20% to 35% and inspect the net radiation balance display.',
    nodeId: NODE_IDS.c11_geo_cbse_081,
  },
];

// -----------------------------------------------------------------------------
// SECTION 5: OBSERVATION QUESTIONS
// -----------------------------------------------------------------------------
const OBSERVATION_QUESTIONS = [
  {
    question: 'In the Köppen scheme, what characteristic distinguishes a Mediterranean climate (Cs) from a Humid Subtropical climate (Cfa)?',
    observableOptions: [
      'Cs has a dry summer season, whereas Cfa receives uniform rainfall or summer maximum.',
      'Cs has severe winter temperatures below -38°C.',
      'Cs occurs exclusively on eastern continental margins.',
      'Cs receives precipitation only in the form of heavy summer snowfall.',
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.c11_geo_cbse_842,
  },
  {
    question: 'Observing the vertical profile during a winter atmospheric inversion layer, what trend in temperature is recorded?',
    observableOptions: [
      'Temperature drops rapidly at the normal lapse rate of 6.5°C/km.',
      'Temperature remains constant at 0°C up to the tropopause.',
      'Temperature increases with altitude for a restricted vertical layer before declining.',
      'Temperature fluctuates wildly due to hurricane force advection.',
    ],
    correctIndex: 2,
    nodeId: NODE_IDS.c11_geo_cbse_088,
  },
];

// -----------------------------------------------------------------------------
// SECTION 6: REAL-WORLD ACTIVITY
// -----------------------------------------------------------------------------
const REAL_WORLD_ACTIVITY = {
  title: 'Climatic Impact Assessment: Urban Heat Island & Agricultural Forecasting',
  description: 'Apply climatological principles to evaluate microclimate variations in an urban-rural transect and compute irrigation deficits under changing monsoon schedules.',
  steps: [
    'Step 1: Compute local insolation absorbed given land cover albedo (Concrete albedo = 0.15 vs Forest albedo = 0.25).',
    'Step 2: Calculate sensible heat flux versus latent heat flux based on atmospheric moisture availability.',
    'Step 3: Analyze the Köppen code shift for a region transitioning from BSh (Semi-arid) to BWh (Arid) under persistent drought.',
    'Step 4: Formulate adaptive urban design interventions (green roofs, cool pavements) to mitigate microclimatic heat stress.',
  ],
};

// -----------------------------------------------------------------------------
// SECTION 7: CHALLENGES (22+ Challenges across Foundation, Standard, Advanced)
// -----------------------------------------------------------------------------
export interface Challenge {
  id: string;
  nodeId: string;
  type: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_f1',
    nodeId: NODE_IDS.c11_geo_cbse_071,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation Knowledge',
    question: 'What primary distinction separates "weather" from "climate"?',
    options: [
      'Weather applies to oceans, while climate applies only to continents.',
      'Weather represents atmospheric state at a specific short term, whereas climate is the long-term statistical average over 30+ years.',
      'Weather is measured in Kelvin, whereas climate is measured in Fahrenheit.',
      'There is no scientific difference between the two terms.',
    ],
    correctIndex: 1,
    explanation: 'Weather refers to day-to-day atmospheric conditions, while climate is the long-term pattern (typically 30 years) of temperature, precipitation, and winds.',
    hints: ['Think time scale.', 'One is daily, the other spans decades.', 'Climate uses 30-year averages.'],
  },
  {
    id: 'ch_f2',
    nodeId: NODE_IDS.c11_geo_cbse_080,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Foundation Insolation',
    question: 'At which latitude is the sun directly overhead (zenith angle 0°) during the summer solstice in the Northern Hemisphere?',
    options: [
      'Equator (0°)',
      'Tropic of Cancer (23.5° N)',
      'Tropic of Capricorn (23.5° S)',
      'Arctic Circle (66.5° N)',
    ],
    correctIndex: 1,
    explanation: 'During the summer solstice (~June 21), the overhead sun reaches its northernmost point at the Tropic of Cancer (23.5° N).',
    hints: ['Northern Hemisphere summer.', '23.5 degrees latitude.', 'Tropic of Cancer.'],
  },
  {
    id: 'ch_f3',
    nodeId: NODE_IDS.c11_geo_cbse_082,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Atmospheric Heating Mechanics',
    question: 'The transfer of heat through horizontal movement of air is defined as:',
    options: ['Conduction', 'Convection', 'Advection', 'Radiation'],
    correctIndex: 2,
    explanation: 'Advection refers specifically to the horizontal transfer of atmospheric properties like heat and humidity by wind currents (e.g., Loo in North India).',
    hints: ['Horizontal wind movement.', 'Contrast with vertical convection.', 'Advection.'],
  },
  {
    id: 'ch_f4',
    nodeId: NODE_IDS.c11_geo_cbse_087,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Thermal Structure',
    question: 'What is the standard value of the Normal Environmental Lapse Rate in the troposphere?',
    options: ['1.0°C per 1000 meters', '6.5°C per 1000 meters', '10.0°C per 100 meters', '0.5°C per 100 meters'],
    correctIndex: 1,
    explanation: 'The average temperature decrease with height in the troposphere is approximately 6.5°C per 1,000 meters (or 0.65°C per 100 m).',
    hints: ['Around 6.5 degrees.', 'Per kilometer elevation gain.', '6.5°C / 1000 m.'],
  },
  {
    id: 'ch_f5',
    nodeId: NODE_IDS.c11_geo_cbse_831,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Köppen System Nomenclature',
    question: 'In Köppen’s scheme, which capital letter designates Tropical Humid Climates where all months have mean temperature above 18°C?',
    options: ['Group A', 'Group B', 'Group C', 'Group D'],
    correctIndex: 0,
    explanation: 'Group A represents Tropical Humid Climates, where winter is absent and all monthly mean temperatures exceed 18°C.',
    hints: ['First letter of the Köppen major groups.', 'Tropical group.', 'Group A.'],
  },
  {
    id: 'ch_f6',
    nodeId: NODE_IDS.c11_geo_cbse_091,
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Local Wind Phenomena',
    question: 'What localized hot dry wind blows during summer afternoons in the Indo-Gangetic Plains of Northern India?',
    options: ['Mistral', 'Chinook', 'Loo', 'Föhn'],
    correctIndex: 2,
    explanation: 'The "Loo" is a strong, hot, and dry summer afternoon wind blowing over Northern India and Pakistan.',
    hints: ['Local Indian dry hot wind.', 'Spelled with double O.', 'Loo.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f7',
    nodeId: NODE_IDS.c11_geo_cbse_093,
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Condensation Forms',
    question: 'When atmospheric moisture condenses on cold surface objects during clear nights above freezing point, it forms:',
    options: ['Frost', 'Dew', 'Hail', 'Sleet'],
    correctIndex: 1,
    explanation: 'Dew forms when air temperature falls below the dew point on surfaces whose temperature remains above 0°C.',
    hints: ['Liquid water droplets on grass.', 'Above freezing point.', 'Dew.'],
  },

  // STANDARD (8)
  {
    id: 'ch_s1',
    nodeId: NODE_IDS.c11_geo_cbse_081,
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Heat Budget Calculation',
    question: 'If total incoming solar radiation is 100 units, and Earth reflects 35 units back into space immediately (albedo), how many units of energy are absorbed by Earth’s surface and atmosphere combined?',
    options: ['35 units', '50 units', '65 units', '100 units'],
    correctIndex: 2,
    explanation: 'Total absorbed radiation = 100 units - 35 units reflected = 65 units (14 absorbed by atmosphere + 51 absorbed by surface).',
    hints: ['Subtract reflected energy.', '100 - 35 = ?', '65 units.'],
  },
  {
    id: 'ch_s2',
    nodeId: NODE_IDS.c11_geo_cbse_089,
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Pressure Gradient & Coriolis Dynamics',
    question: 'How does the Coriolis effect alter atmospheric wind direction in the Southern Hemisphere?',
    options: [
      'Deflects wind to the right of its path.',
      'Deflects wind to the left of its path.',
      'Accelerates wind without changing direction.',
      'Cancels friction completely at the equator.',
    ],
    correctIndex: 1,
    explanation: 'Due to Earth’s counter-clockwise rotation relative to the North Pole, winds are deflected to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.',
    hints: ['Southern Hemisphere deflection rule.', 'Opposite of Northern Hemisphere.', 'To the left.'],
  },
  {
    id: 'ch_s3',
    nodeId: NODE_IDS.c11_geo_cbse_835,
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Köppen Code Decoding',
    question: 'A location experiences mean monthly temperatures above 18°C year-round, with a distinct short dry season compensated by heavy monsoon rainfall. What is its Köppen code?',
    options: ['Af', 'Am', 'Aw', 'BWh'],
    correctIndex: 1,
    explanation: 'Am denotes Tropical Monsoon Climate, where heavy seasonal monsoonal rains offset the dry winter months.',
    hints: ['Tropical with monsoon.', 'Lowercase "m" stands for monsoon.', 'Am.'],
  },
  {
    id: 'ch_s4',
    nodeId: NODE_IDS.c11_geo_cbse_077,
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Monsoon Dynamics & Jet Streams',
    question: 'What atmospheric jet stream feature over North India retreats northwards over the Tibetan Plateau, enabling the burst of the South-West Monsoon?',
    options: [
      'Subtropical Westerly Jet Stream',
      'Tropical Easterly Jet Stream',
      'Polar Front Jet Stream',
      'Equatorial Counter-Current',
    ],
    correctIndex: 0,
    explanation: 'The withdrawal of the Subtropical Westerly Jet Stream from the south of the Himalayas to north of Tibet is a crucial prerequisite for the SW Monsoon onset over India.',
    hints: ['Westerly winds in winter.', 'Moves north of Himalayas in summer.', 'Subtropical Westerly Jet Stream.'],
  },
  {
    id: 'ch_s5',
    nodeId: NODE_IDS.c11_geo_cbse_095,
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Cyclonic Storm Mechanics',
    question: 'Why are extra-tropical cyclones fundamentally different from tropical cyclones in terms of energy source and structural scale?',
    options: [
      'Extra-tropical cyclones derive energy from ocean surface heat, while tropical cyclones rely on land friction.',
      'Extra-tropical cyclones are frontally driven (temperature gradients between contrasting air masses) and cover vast mid-latitude areas.',
      'Tropical cyclones have a cold core, whereas extra-tropical cyclones possess a warm eye.',
      'Tropical cyclones are formed exclusively by jet stream shear in polar zones.',
    ],
    correctIndex: 1,
    explanation: 'Extra-tropical cyclones are temperate frontogenetical storms driven by horizontal temperature contrasts along polar fronts.',
    hints: ['Frontal origin in temperate zones.', 'Temperature contrast driven.', 'Frontally driven.'],
  },
  {
    id: 'ch_s6',
    nodeId: NODE_IDS.c11_geo_cbse_088,
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Temperature Inversion Identification',
    question: 'Under what physical conditions is a valley surface temperature inversion most likely to occur?',
    options: [
      'Overcast, windy summer afternoons.',
      'Long, clear winter nights with calm winds and rapid terrestrial thermal radiation.',
      'High atmospheric moisture with thunderstorm convection.',
      'During strong tropical cyclone landfall.',
    ],
    correctIndex: 1,
    explanation: 'Clear skies allow maximum nocturnal terrestrial radiation cooling of the ground, trapping cold dense air near the valley bottom.',
    hints: ['Clear night, quick ground cooling.', 'Calm winter night.', 'Long clear winter nights.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_s7',
    nodeId: NODE_IDS.c11_geo_cbse_853,
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Greenhouse Mechanics',
    question: 'Which trace atmospheric gas absorbs longwave terrestrial radiation in the 13–17 µm infrared window with highest radiative forcing potential per ppm added?',
    options: ['Argon', 'Carbon Dioxide (CO₂)', 'Methane (CH₄)', 'Nitrogen (N₂)'],
    correctIndex: 1,
    explanation: 'Carbon dioxide is the principal anthropogenic greenhouse gas responsible for atmospheric radiative warming in the ~15 µm terrestrial emission band.',
    hints: ['Major greenhouse gas.', 'Formula CO₂.', 'Carbon Dioxide.'],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s8',
    nodeId: NODE_IDS.c11_geo_cbse_078,
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Global Climate Drivers',
    question: 'The Milankovitch cycles explain long-term natural climate fluctuations (e.g., ice ages) through variations in which astronomical parameters?',
    options: [
      'Solar flares, cosmic rays, and sunspot counts.',
      'Orbital eccentricity, axial tilt (obliquity), and axial precession.',
      'Continental drift speed, oceanic trench subduction, and mantle plume heat.',
      'Lunar tidal forces and volcanic soot deposition.',
    ],
    correctIndex: 1,
    explanation: 'Milankovitch cycles encompass Earth’s orbital eccentricity (100k yr), tilt/obliquity (41k yr), and precession (23k yr).',
    hints: ['Astronomical geometry of Earth orbit.', 'Eccentricity, tilt, precession.', 'Orbital eccentricity, tilt, precession.'],
  },

  // ADVANCED (7)
  {
    id: 'ch_a1',
    nodeId: NODE_IDS.c11_geo_cbse_081,
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Radiative Equilibrium Evaluation',
    question: 'Evaluate the thermal consequences if Earth’s total global albedo were to increase from 0.30 to 0.40 while solar output remained constant.',
    options: [
      'Global effective surface temperature would decrease markedly because less shortwave energy is absorbed.',
      'Global temperature would increase because clouds retain more heat.',
      'The lapse rate would become positive throughout the stratosphere.',
      'The Coriolis force would double in magnitude.',
    ],
    correctIndex: 0,
    explanation: 'Higher albedo reflects more shortwave radiation back to space, reducing total net absorbed radiation and lowering Earth’s equilibrium temperature.',
    hints: ['Albedo = reflection percentage.', 'More reflected solar energy = cooler Earth.', 'Global effective surface temperature drops.'],
  },
  {
    id: 'ch_a2',
    nodeId: NODE_IDS.c11_geo_cbse_077,
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Monsoon Anomaly Modeling',
    question: 'During an El Niño year (ENSO positive phase), how does the Equatorial Pacific SST warming typically impact the Indian Summer Monsoon?',
    options: [
      'Enhances the monsoon by increasing Arabian Sea moisture advection.',
      'Suppresses the monsoon by creating anomalous atmospheric sinking motion (subsidence) over the Indian Ocean / Western Pacific.',
      'Has zero effect because ocean currents cannot alter continental atmospheric pressure.',
      'Causes immediate formation of polar ice caps over the Western Ghats.',
    ],
    correctIndex: 1,
    explanation: 'El Niño shifts the Walker Circulation eastwards, inducing atmospheric descending motion over South Asia, which weakens the monsoonal trough and rainfall.',
    hints: ['Walker Circulation shift.', 'Suppressive effect on Indian rainfall.', 'Suppresses the monsoon via atmospheric subsidence.'],
  },
  {
    id: 'ch_a3',
    nodeId: NODE_IDS.c11_geo_cbse_842,
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Climatic Zone Comparison',
    question: 'Why do Mediterranean climate regions (Cs) receive rain almost exclusively during winter, whereas summer is intensely dry?',
    options: [
      'In summer, trade winds blow off the ocean, bringing humid air mass fronts.',
      'In summer, subtropical high-pressure belts shift poleward over these latitudes, suppressing vertical convection.',
      'In winter, the equatorward migration of polar front jet streams brings mid-latitude westerlies and cyclonic rains.',
      'Both B and C are correct mechanism explanations.',
    ],
    correctIndex: 3,
    explanation: 'Mediterranean climates experience dry summers due to subsidence under Subtropical Highs, and wet winters as Westerlies with cyclonic fronts shift equatorward.',
    hints: ['Check summer high pressure vs winter westerlies.', 'Both B and C are true.', 'Both B and C are correct mechanism explanations.'],
  },
  {
    id: 'ch_a4',
    nodeId: NODE_IDS.c11_geo_cbse_094,
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'Thermodynamics of Cloud Microphysics',
    question: 'Why is the Adiabatic Lapse Rate for moist air (Moist Adiabatic Lapse Rate ~ 5°C/km) smaller than for dry air (Dry Adiabatic Lapse Rate ~ 9.8°C/km)?',
    options: [
      'Moist air is denser and cools faster due to higher molecular weight.',
      'Condensation of water vapor releases latent heat of vaporization, which partially offsets adiabatic expansion cooling.',
      'Dry air absorbs solar radiation directly, causing rapid heating.',
      'Moist air experiences zero frictional drag from surface terrain.',
    ],
    correctIndex: 1,
    explanation: 'Latent heat release during condensation adds thermal energy to rising saturated air parcels, reducing the rate of cooling per vertical kilometer.',
    hints: ['Condensation releases heat.', 'Latent heat offset.', 'Latent heat of vaporization release.'],
  },
  {
    id: 'ch_a5',
    nodeId: NODE_IDS.c11_geo_cbse_857,
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Stratospheric Ozone Chemistry',
    question: 'What is the key mechanism by which Chlorofluorocarbons (CFCs) destroy stratospheric ozone (O₃)?',
    options: [
      'CFC molecules absorb longwave radiation and thermally boil ozone.',
      'UV radiation releases free Chlorine radicals from CFCs, which act as catalysts in converting O₃ into O₂ without being consumed.',
      'CFCs form polar stratospheric clouds that physically block incoming solar ultraviolet photons.',
      'CFCs react with CO₂ to precipitate toxic carbon monoxide rain.',
    ],
    correctIndex: 1,
    explanation: 'Chlorine atoms (Cl•) act as catalytic agents: Cl + O₃ → ClO + O₂, and ClO + O → Cl + O₂, destroying thousands of O₃ molecules per Cl radical.',
    hints: ['Catalytic destruction by Cl radicals.', 'UV breaks CFC bond.', 'Chlorine radicals act as catalysts.'],
  },
  {
    id: 'ch_a6',
    nodeId: NODE_IDS.c11_geo_cbse_096,
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'Tropical Cyclone Energetics',
    question: 'Why do tropical cyclones rapidly decay after crossing coastlines and moving inland?',
    options: [
      'The Coriolis parameter drops to zero on land surfaces.',
      'Loss of latent heat supply from warm sea surfaces (SST > 27°C) and increased surface roughness friction.',
      'Land air has higher CO₂ concentration which absorbs the storm’s energy.',
      'The tropical easterly jet stream breaks apart land-based vortices.',
    ],
    correctIndex: 1,
    explanation: 'Tropical cyclones require warm ocean water (latent heat of condensation) for fuel. Cutting off ocean moisture plus land surface friction causes immediate dissipation.',
    hints: ['Fuel source = warm ocean water.', 'Loss of warm moisture + terrain friction.', 'Loss of latent heat and increased friction.'],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_a7',
    nodeId: NODE_IDS.c11_geo_cbse_107,
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Global Policy & Mitigation',
    question: 'To stabilize atmospheric greenhouse gas forcing at net-zero radiative imbalance, which integrated mitigation strategy is most thermodynamically viable?',
    options: [
      'Relying solely on volcanic artificial aerosol injection to reflect all solar radiation.',
      'Combining rapid decarbonization, afforestation, soil carbon sequestration, and direct air carbon capture.',
      'Pumping surface sea water onto polar ice caps to freeze carbon dioxide.',
      'Increasing global fossil fuel combustion to build larger cloud seeding fleets.',
    ],
    correctIndex: 1,
    explanation: 'Comprehensive mitigation requires reducing emissions at source combined with biological and technological carbon sink enhancements.',
    hints: ['Multi-pronged mitigation approach.', 'Source reduction + sink removal.', 'Combining decarbonization, afforestation, and carbon capture.'],
  },
];

// -----------------------------------------------------------------------------
// DIAGNOSTIC QUESTIONS
// -----------------------------------------------------------------------------
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'What percentage of incoming solar radiation is reflected directly to space by Earth’s albedo?',
    options: ['14%', '35%', '51%', '65%'],
    correctIndex: 1,
  },
  {
    id: 'diag_2',
    question: 'Which planetary wind belt resides between the Subtropical Highs and Equatorial Lows?',
    options: ['Westerlies', 'Polar Easterlies', 'Trade Winds', 'Jet Streams'],
    correctIndex: 2,
  },
  {
    id: 'diag_3',
    question: 'What Köppen code stands for Mid-Latitude Arid Desert Climate?',
    options: ['BWh', 'BWk', 'BSh', 'BSk'],
    correctIndex: 1,
  },
  {
    id: 'diag_4',
    question: 'Which factor prevents tropical cyclone formation at the Equator?',
    options: ['Low water temperature', 'Absence of Coriolis force', 'Excessive humidity', 'High surface pressure'],
    correctIndex: 1,
  },
];

// -----------------------------------------------------------------------------
// VISUAL SVG DIAGRAM COMPONENTS
// -----------------------------------------------------------------------------

// Diagram 1: Heat Budget Diagram Component
const HeatBudgetDiagram: React.FC<{ cloudAlbedo: number; greenhouseTrapping: number }> = ({ cloudAlbedo, greenhouseTrapping }) => {
  const incoming = 100;
  const reflectedSpace = Math.round(cloudAlbedo + 10);
  const absorbedAtmosphere = Math.round(14 + greenhouseTrapping * 0.1);
  const absorbedSurface = incoming - reflectedSpace - absorbedAtmosphere;

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="sunRay" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="earthRay" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#b91c1c" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Outer Space */}
      <rect x="0" y="0" width="600" height="60" fill="#020617" />
      <text x="20" y="35" fill="#f8fafc" className="text-xs font-semibold">OUTER SPACE (Incoming Solar: 100 Units)</text>

      {/* Sun Beam */}
      <path d="M 120 10 L 150 160 L 90 160 Z" fill="url(#sunRay)" />
      <text x="120" y="80" fill="#fbbf24" className="text-xs font-bold text-center">Shortwave Solar</text>

      {/* Cloud Layer */}
      <rect x="50" y="100" width="500" height="40" rx="10" fill="#334155" opacity="0.8" />
      <text x="300" y="125" fill="#e2e8f0" textAnchor="middle" className="text-xs font-medium">
        ATMOSPHERIC & CLOUD LAYER (Albedo Reflection: {reflectedSpace} Units)
      </text>

      {/* Reflected Beam */}
      <path d="M 160 100 L 220 20 M 160 100 L 210 20" stroke="#fef08a" strokeWidth="4" strokeDasharray="4 4" />
      <text x="230" y="35" fill="#fef08a" className="text-xs">Reflected to Space: {reflectedSpace} Units</text>

      {/* Earth Surface */}
      <rect x="0" y="240" width="600" height="80" fill="#15803d" />
      <text x="300" y="280" fill="#ffffff" textAnchor="middle" className="text-sm font-bold">
        EARTH SURFACE (Absorbs: {absorbedSurface} Units)
      </text>

      {/* Absorbed in Atmosphere */}
      <circle cx="480" cy="180" r="28" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
      <text x="480" y="178" fill="#38bdf8" textAnchor="middle" className="text-xs font-bold">Atmosphere</text>
      <text x="480" y="192" fill="#38bdf8" textAnchor="middle" className="text-xs">{absorbedAtmosphere} Units</text>

      {/* Terrestrial Emission */}
      <path d="M 350 240 L 350 160" stroke="#ef4444" strokeWidth="5" markerEnd="url(#arrow)" />
      <text x="360" y="210" fill="#f87171" className="text-xs font-bold">Terrestrial IR Radiation</text>
      <text x="360" y="225" fill="#f87171" className="text-xs">Trapped by GHGs: {Math.round(greenhouseTrapping)}%</text>
    </svg>
  );
};

// Diagram 2: Planetary Wind & Circulation Cells
const PlanetaryWindsDiagram: React.FC<{ latitude: number }> = ({ latitude }) => {
  return (
    <svg viewBox="0 0 500 320" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      {/* Globe Circle */}
      <circle cx="250" cy="160" r="130" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />

      {/* Equator */}
      <line x1="120" y1="160" x2="380" y2="160" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 5" />
      <text x="385" y="164" fill="#ef4444" className="text-xs font-bold">0° Equator (ITCZ)</text>

      {/* Tropics 30 N/S */}
      <line x1="135" y1="100" x2="365" y2="100" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="370" y="104" fill="#f59e0b" className="text-xs">30° N Subtropical High</text>

      <line x1="135" y1="220" x2="365" y2="220" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="370" y="224" fill="#f59e0b" className="text-xs">30° S Subtropical High</text>

      {/* Polar 60 N */}
      <line x1="170" y1="50" x2="330" y2="50" stroke="#3b82f6" strokeWidth="1.5" />
      <text x="335" y="54" fill="#3b82f6" className="text-xs">60° N Subpolar Low</text>

      {/* Winds Arrows */}
      {/* NE Trades */}
      <path d="M 280 110 L 230 150" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#windArrow)" />
      <path d="M 220 110 L 170 150" stroke="#38bdf8" strokeWidth="3" />
      <text x="210" y="130" fill="#38bdf8" className="text-xs font-bold">NE Trade Winds</text>

      {/* Westerlies */}
      <path d="M 200 90 L 260 60" stroke="#a855f7" strokeWidth="3" />
      <text x="210" y="80" fill="#a855f7" className="text-xs font-bold">Westerlies</text>

      {/* Selected Latitude Indicator */}
      <circle
        cx={250 + 120 * Math.cos((latitude * Math.PI) / 180)}
        cy={160 - 120 * Math.sin((latitude * Math.PI) / 180)}
        r="8"
        fill="#facc15"
        stroke="#ffffff"
        strokeWidth="2"
      />
      <text x="20" y="30" fill="#facc15" className="text-xs font-bold">
        Selected Lat: {latitude}° N
      </text>
    </svg>
  );
};

// Diagram 3: Köppen Climate Classification Interactive Curve
const KoppenDiagram: React.FC<{ temp: number; prec: number; selectedCode: string }> = ({ temp, prec, selectedCode }) => {
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 p-2">
      <text x="20" y="30" fill="#38bdf8" className="text-sm font-bold">Köppen Climate Boundary Space</text>

      {/* Axes */}
      <line x1="60" y1="240" x2="460" y2="240" stroke="#64748b" strokeWidth="2" />
      <line x1="60" y1="40" x2="60" y2="240" stroke="#64748b" strokeWidth="2" />

      <text x="460" y="260" fill="#94a3b8" className="text-xs" textAnchor="end">Mean Temp (°C)</text>
      <text x="20" y="40" fill="#94a3b8" className="text-xs">Annual Rain (mm)</text>

      {/* Regions */}
      <rect x="61" y="41" width="120" height="198" fill="#0284c7" opacity="0.2" />
      <text x="120" y="100" fill="#38bdf8" className="text-xs font-bold" textAnchor="middle">Polar (E)</text>

      <rect x="181" y="41" width="100" height="198" fill="#16a34a" opacity="0.2" />
      <text x="230" y="100" fill="#4ade80" className="text-xs font-bold" textAnchor="middle">Temperate (C/D)</text>

      <rect x="281" y="41" width="178" height="198" fill="#eab308" opacity="0.2" />
      <text x="370" y="100" fill="#fde047" className="text-xs font-bold" textAnchor="middle">Tropical (A) / Dry (B)</text>

      {/* Dynamic Point */}
      {/* Map Temp -30 to 40 to X 60 to 460 */}
      {/* Map Prec 0 to 2500 to Y 240 to 40 */}
      {(() => {
        const cx = 60 + ((temp + 30) / 70) * 400;
        const cy = 240 - (prec / 2500) * 200;
        const clampX = Math.max(65, Math.min(455, cx));
        const clampY = Math.max(45, Math.min(235, cy));
        return (
          <g>
            <circle cx={clampX} cy={clampY} r="9" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />
            <text x={clampX + 12} y={clampY + 4} fill="#ffffff" className="text-xs font-extrabold">
              {selectedCode} ({temp}°C, {prec}mm)
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

// Diagram 4: Indian Monsoon System Reversal
const IndianMonsoonDiagram: React.FC<{ season: 'summer' | 'winter' }> = ({ season }) => {
  const isSummer = season === 'summer';

  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800 shadow-2xl">
      <rect x="0" y="0" width="500" height="300" fill="#020617" />

      {/* Subcontinent Outline Approximation */}
      <path
        d="M 150 80 L 320 80 L 360 140 L 280 260 L 220 260 L 140 160 Z"
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="2"
      />
      <text x="240" y="120" fill="#94a3b8" className="text-xs font-bold" textAnchor="middle">
        INDIAN SUBCONTINENT
      </text>
      <text x="300" y="95" fill="#f59e0b" className="text-xs font-semibold">Tibetan Plateau</text>

      {/* Ocean */}
      <path d="M 0 180 C 120 200 150 290 220 290 C 280 290 320 200 500 220 L 500 300 L 0 300 Z" fill="#0369a1" opacity="0.4" />
      <text x="100" y="250" fill="#38bdf8" className="text-xs font-bold">Arabian Sea</text>
      <text x="380" y="250" fill="#38bdf8" className="text-xs font-bold">Bay of Bengal</text>

      {/* Wind Vectors */}
      {isSummer ? (
        <g id="sw-monsoon">
          {/* Low pressure over Thar / Tibet */}
          <circle cx="230" cy="110" r="22" fill="#ef4444" opacity="0.3" />
          <text x="230" y="114" fill="#fca5a5" className="text-xs font-black" textAnchor="middle">LOW (L)</text>

          {/* Winds SW -> NE */}
          <path d="M 80 270 Q 140 220 180 170" stroke="#facc15" strokeWidth="4" markerEnd="url(#arr)" />
          <path d="M 140 280 Q 200 230 240 180" stroke="#facc15" strokeWidth="4" />
          <path d="M 280 270 Q 320 210 340 150" stroke="#facc15" strokeWidth="4" />

          <text x="120" y="200" fill="#facc15" className="text-xs font-extrabold rotate-[-30]">
            Moist SW Monsoon Winds
          </text>
        </g>
      ) : (
        <g id="ne-monsoon">
          {/* High pressure over Land */}
          <circle cx="240" cy="100" r="22" fill="#3b82f6" opacity="0.3" />
          <text x="240" y="104" fill="#93c5fd" className="text-xs font-black" textAnchor="middle">HIGH (H)</text>

          {/* Winds NE -> SW */}
          <path d="M 290 120 L 230 180" stroke="#60a5fa" strokeWidth="4" />
          <path d="M 330 140 L 270 210" stroke="#60a5fa" strokeWidth="4" />
          <path d="M 250 100 L 180 150" stroke="#60a5fa" strokeWidth="4" />

          <text x="280" y="160" fill="#60a5fa" className="text-xs font-extrabold rotate-[35]">
            Dry NE Retreating Monsoon
          </text>
        </g>
      )}
    </svg>
  );
};

// Canvas Animated Component for Atmospheric Greenhouse Interaction
const GreenhouseCanvasAnim: React.FC<{ co2Ppm: number }> = ({ co2Ppm }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const numGas = Math.min(120, Math.floor(co2Ppm / 8));
    const particles = Array.from({ length: numGas }).map(() => ({
      x: Math.random() * canvas.width,
      y: 40 + Math.random() * (canvas.height - 80),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 3 + Math.random() * 2,
    }));

    const rays = Array.from({ length: 12 }).map((_, i) => ({
      x: 30 + i * 35,
      y: 0,
      vy: 2 + Math.random() * 1.5,
      trapped: false,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Sky Background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Surface
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, canvas.height - 25, canvas.width, 25);

      // Gas Particles (CO2 / GHGs)
      ctx.fillStyle = '#f43f5e';
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 30 || p.y > canvas.height - 30) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Rays
      rays.forEach((r) => {
        if (!r.trapped) {
          r.y += r.vy;
          if (r.y > canvas.height - 30) {
            // Reflect as IR (Red)
            if (Math.random() < co2Ppm / 800) {
              r.trapped = true;
              r.vy = -r.vy;
            } else {
              r.y = 0;
            }
          }
        } else {
          r.y += r.vy;
          if (r.y < 40) {
            r.trapped = false;
            r.vy = Math.abs(r.vy);
            r.y = 0;
          }
        }

        ctx.strokeStyle = r.trapped ? '#ef4444' : '#facc15';
        ctx.lineWidth = r.trapped ? 3 : 2;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x, r.y + (r.trapped ? -12 : 12));
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [co2Ppm]);

  return (
    <canvas
      ref={canvasRef}
      width={450}
      height={220}
      className="w-full h-auto rounded-xl border border-slate-700 bg-slate-950"
    />
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------
export const C11_GeoClimateCBSESim: React.FC<C11_GeoClimateCBSESimProps> = ({
  initialNodeId = NODE_IDS.c11_geo_cbse_071,
  onComplete,
  onNodeSelect,
}) => {
  // Navigation & View Tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery / Intro State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // Observation State
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // Interactive Lab Variables
  const [solarConstant, setSolarConstant] = useState<number>(100);
  const [cloudAlbedo, setCloudAlbedo] = useState<number>(20);
  const [greenhouseTrapping, setGreenhouseTrapping] = useState<number>(30);

  const [latitude, setLatitude] = useState<number>(23.5);
  const [pressureGrad, setPressureGrad] = useState<number>(1012);

  const [koppenTemp, setKoppenTemp] = useState<number>(22);
  const [koppenPrec, setKoppenPrec] = useState<number>(1200);

  const [monsoonSeason, setMonsoonSeason] = useState<'summer' | 'winter'>('summer');
  const [tibetanHeating, setTibetanHeating] = useState<number>(75);

  const [co2Ppm, setCo2Ppm] = useState<number>(420);

  // Challenge / Assessment Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);

  // Feedback Component Controls
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint Timer Ref
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Master BKT & SRS State
  const [bktStateMap, setBktStateMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const map: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState(0.2, 0.15, 0.1, 0.3);
    });
    return map;
  });

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const map: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createReviewItem(id);
    });
    return map;
  });

  // Current Challenge Object
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Calculated Köppen Code Logic
  const computedKoppenCode = useMemo(() => {
    if (koppenTemp < -10) return 'EF (Ice Cap)';
    if (koppenTemp < 0) return 'ET (Tundra)';
    if (koppenPrec < 250) return 'BWh (Arid Desert)';
    if (koppenPrec < 500) return 'BSh (Semi-Arid Steppe)';
    if (koppenTemp >= 18) {
      if (koppenPrec > 1500) return 'Af (Tropical Wet)';
      if (koppenPrec > 800) return 'Am (Tropical Monsoon)';
      return 'Aw (Tropical Wet/Dry)';
    }
    if (koppenPrec < 600) return 'Cs (Mediterranean)';
    return 'Cfa (Humid Subtropical)';
  }, [koppenTemp, koppenPrec]);

  // Audio / Speech Helper Wrapper
  const playSound = (sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // safe fallback
    }
  };

  const speakText = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // safe fallback
    }
  };

  // Reset Hint Timer on activity
  const resetHintTimer = useCallback(() => {
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    setShowHint(false);
    hintTimerRef.current = setTimeout(() => {
      if (currentChallenge) {
        setCurrentHint(currentChallenge.hints[0]);
        setShowHint(true);
        playSound('hint');
      }
    }, 12000);
  }, [currentChallenge]);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetHintTimer]);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = (optIndex: number) => {
    setDiscoveryAnswer(optIndex);
    setDiscoverySubmitted(true);

    if (optIndex === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      setShowSparkle(true);
      speakText('Correct! Atmospheric air is heated primarily from below by terrestrial radiation.');
    } else {
      playSound('error');
      speakText('Not quite. Shortwave solar radiation passes through clear air with minimal direct heating.');
    }
  };

  // Handle Prediction Submit
  const handlePredictionSubmit = (idx: number, optIndex: number) => {
    setPredictionAnswers((prev) => ({ ...prev, [idx]: optIndex }));
    setPredictionSubmitted((prev) => ({ ...prev, [idx]: true }));

    if (optIndex === PREDICTION_QUESTIONS[idx].correctIndex) {
      playSound('chime');
      speakText('Great prediction! Let us test this in the interactive simulator.');
    } else {
      playSound('pop');
    }
  };

  // Handle Observation Submit
  const handleObservationSubmit = (idx: number, optIndex: number) => {
    setObservationAnswers((prev) => ({ ...prev, [idx]: optIndex }));
    setObservationSubmitted((prev) => ({ ...prev, [idx]: true }));

    if (optIndex === OBSERVATION_QUESTIONS[idx].correctIndex) {
      playSound('drop-correct');
    } else {
      playSound('drop-wrong');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentChallenge.correctIndex;
    const nodeId = currentChallenge.nodeId;

    // Update BKT State
    const oldBkt = bktStateMap[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStateMap((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    // Update SM2 SRS State
    const oldSrs = srsMap[nodeId] || createReviewItem(nodeId);
    const updatedSrs = sm2Update(oldSrs, isCorrect ? 5 : 2);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      playSound('drop-correct');
      setShowSparkle(true);
      setChallengeScore((prev) => prev + 10);
      speakText('Excellent work! Your answer is scientifically accurate.');
    } else {
      playSound('error');
      speakText('That is incorrect. Examine the physical parameters and radiation transfer mechanisms.');
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
      playSound('whoosh');
    } else {
      // Completed All Challenges
      setShowConfetti(true);
      setShowSuccess(true);
      playSound('celebration');
      speakText('Congratulations! You have mastered the ISC Geography Climate Module.');

      const finalScore = Math.round((challengeScore / (CHALLENGES.length * 10)) * 100);
      recordGameScore('C11_GeoClimateCBSESim', finalScore);

      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  // Mastery Progress Calculation
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktStateMap[id];
      if (bkt) sum += masteryProb(bkt);
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStateMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* GLOBAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Climate Systems Mastery Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={200} />
      <HintBubble show={showHint} text={currentHint} />

      {/* SIMULATION HEADER */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-bold rounded-full uppercase tracking-wider border border-sky-500/30">
              CISCE / CBSE Class 11 Geography
            </span>
            <span className="text-slate-400 text-xs font-mono">Chapter: Climate</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Atmospheric Energetics & Indian Monsoon Simulator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Global Heat Budget, Atmospheric Circulation, Köppen Zoning & Monsoon Physics
          </p>
        </div>

        {/* Global Score & Mastery Gauge */}
        <div className="flex items-center gap-6 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Mastery</div>
            <div className="text-xl font-bold text-emerald-400">{overallMastery}%</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-semibold">Sim Points</div>
            <div className="text-xl font-bold text-sky-400">{challengeScore}</div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 mb-6 gap-2">
        {[
          { id: 'discovery', label: '1. Discovery & Scenario' },
          { id: 'lab', label: '2. Interactive Climate Labs' },
          { id: 'challenges', label: `3. Challenges (${currentChallengeIdx + 1}/${CHALLENGES.length})` },
          { id: 'summary', label: '4. Summary & Field Application' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              playSound('tap');
            }}
            className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl flex-1">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-sky-400 mb-3 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-500 animate-pulse" />
                {SCENARIO.title}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4 text-base">{SCENARIO.intro}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-400 text-sm">
                <strong className="text-slate-200">Observatory Mission Context: </strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded-md uppercase">
                Discovery Question
              </span>
              <h3 className="text-lg font-bold text-slate-100 mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-slate-950 p-4 rounded-xl border border-sky-500/30 text-sky-300 text-sm animate-fadeIn">
                  <strong>Climatological Insight: </strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-sky-400">Hypothesis & Predictions</h3>

              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-slate-200 font-semibold text-sm">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                        disabled={predictionSubmitted[pIdx]}
                        className={`p-3 rounded-lg text-left text-xs font-medium border transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/60 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {predictionSubmitted[pIdx] && (
                    <p className="text-xs text-amber-400 italic mt-2">
                      <strong>Verification Lab: </strong>
                      {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lab Step Selector Sidebar */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 h-fit">
              <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 px-2">
                Exploration Laboratories
              </h3>
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    playSound('tap');
                    if (onNodeSelect) onNodeSelect(step.nodeId);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    activeLabIndex === idx
                      ? 'bg-sky-950/80 border-sky-500 text-sky-200 font-bold'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs text-sky-400 font-semibold mb-0.5">Lab {idx + 1}</div>
                  <div className="text-sm line-clamp-1">{step.title}</div>
                </button>
              ))}

              {/* Misconceptions Box */}
              <div className="mt-6 p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase">Common Climatology Misconception</div>
                <div className="text-xs font-bold text-slate-200">{MISCONCEPTIONS[activeLabIndex % 6].title}</div>
                <div className="text-xs text-slate-400">{MISCONCEPTIONS[activeLabIndex % 6].correction}</div>
              </div>
            </div>

            {/* Main Interactive Interactive Stage */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                  <span className="text-xs font-mono text-sky-400 bg-sky-950 px-2.5 py-1 rounded-md border border-sky-800">
                    Node ID: {EXPLORATION_STEPS[activeLabIndex].nodeId}
                  </span>
                </div>
                <p className="text-slate-300 text-sm mb-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {EXPLORATION_STEPS[activeLabIndex].instruction}
                </p>

                {/* LAB 1 INTERACTIVE CONTROLS */}
                {activeLabIndex === 0 && (
                  <div className="space-y-6">
                    <HeatBudgetDiagram cloudAlbedo={cloudAlbedo} greenhouseTrapping={greenhouseTrapping} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Solar Output: {solarConstant}%
                        </label>
                        <input
                          type="range"
                          min="80"
                          max="120"
                          value={solarConstant}
                          onChange={(e) => setSolarConstant(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Cloud Albedo: {cloudAlbedo}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="50"
                          value={cloudAlbedo}
                          onChange={(e) => setCloudAlbedo(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          GHG Absorption: {greenhouseTrapping}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="80"
                          value={greenhouseTrapping}
                          onChange={(e) => setGreenhouseTrapping(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 2 INTERACTIVE CONTROLS */}
                {activeLabIndex === 1 && (
                  <div className="space-y-6">
                    <PlanetaryWindsDiagram latitude={latitude} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Latitude Observer Angle: {latitude}° N
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          value={latitude}
                          onChange={(e) => setLatitude(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Subtropical Surface Pressure: {pressureGrad} hPa
                        </label>
                        <input
                          type="range"
                          min="980"
                          max="1040"
                          value={pressureGrad}
                          onChange={(e) => setPressureGrad(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 3 INTERACTIVE CONTROLS */}
                {activeLabIndex === 2 && (
                  <div className="space-y-6">
                    <KoppenDiagram temp={koppenTemp} prec={koppenPrec} selectedCode={computedKoppenCode} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Mean Monthly Temp: {koppenTemp}°C
                        </label>
                        <input
                          type="range"
                          min="-25"
                          max="38"
                          value={koppenTemp}
                          onChange={(e) => setKoppenTemp(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Annual Precipitation: {koppenPrec} mm
                        </label>
                        <input
                          type="range"
                          min="50"
                          max="2400"
                          step="25"
                          value={koppenPrec}
                          onChange={(e) => setKoppenPrec(Number(e.target.value))}
                          className="w-full accent-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 4 INTERACTIVE CONTROLS */}
                {activeLabIndex === 3 && (
                  <div className="space-y-6">
                    <IndianMonsoonDiagram season={monsoonSeason} />

                    <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="space-x-3">
                        <button
                          onClick={() => {
                            setMonsoonSeason('summer');
                            playSound('whoosh');
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            monsoonSeason === 'summer'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          South-West Summer Monsoon
                        </button>
                        <button
                          onClick={() => {
                            setMonsoonSeason('winter');
                            playSound('whoosh');
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                            monsoonSeason === 'winter'
                              ? 'bg-sky-500 text-slate-950'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          North-East Winter Retreat
                        </button>
                      </div>

                      <div className="w-1/3">
                        <label className="text-xs font-bold text-slate-400 block mb-1">
                          Tibetan Plateau Thermal Anomaly: {tibetanHeating}%
                        </label>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={tibetanHeating}
                          onChange={(e) => setTibetanHeating(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 5 INTERACTIVE CONTROLS */}
                {activeLabIndex === 4 && (
                  <div className="space-y-6">
                    <GreenhouseCanvasAnim co2Ppm={co2Ppm} />

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-bold text-slate-300">
                          Atmospheric CO₂ Concentration: {co2Ppm} ppm
                        </label>
                        <span className="text-xs font-mono text-rose-400 font-bold">
                          Radiative Forcing: +{((co2Ppm - 280) * 0.012).toFixed(2)} W/m²
                        </span>
                      </div>
                      <input
                        type="range"
                        min="280"
                        max="800"
                        step="5"
                        value={co2Ppm}
                        onChange={(e) => setCo2Ppm(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Observation Section inside Lab Tab */}
              <div className="mt-8 border-t border-slate-800 pt-6">
                <h4 className="text-sm font-bold text-sky-400 mb-3 uppercase tracking-wider">
                  Field Observation Checkpoint
                </h4>
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="mb-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-slate-200">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleObservationSubmit(oIdx, optIdx)}
                          disabled={observationSubmitted[oIdx]}
                          className={`p-2.5 rounded-lg text-left text-xs font-medium border transition-all ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
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
        )}

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-1 bg-sky-500/20 text-sky-400 text-xs font-bold rounded-md uppercase mr-2">
                  {currentChallenge.difficulty} Tier
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Competency: {currentChallenge.competencyLevel}
                </span>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentChallenge.question}
            </h3>

            <div className="grid grid-cols-1 gap-3 my-6">
              {currentChallenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedOption(idx);
                    playSound('tap');
                  }}
                  disabled={isAnswerSubmitted}
                  className={`p-4 rounded-xl text-left text-sm font-medium border transition-all flex items-center justify-between ${
                    selectedOption === idx
                      ? isAnswerSubmitted
                        ? idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-sky-950 border-sky-500 text-sky-100'
                      : isAnswerSubmitted && idx === currentChallenge.correctIndex
                      ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-xs text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {isAnswerSubmitted && (
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2 animate-fadeIn">
                <div className="text-xs font-bold uppercase text-sky-400">Scientific Explanation</div>
                <p className="text-sm text-slate-300">{currentChallenge.explanation}</p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-slate-800 pt-6">
              <button
                onClick={() => {
                  setCurrentHint(currentChallenge.hints[0]);
                  setShowHint(true);
                  playSound('hint');
                }}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-amber-400 border border-slate-800 rounded-lg text-xs font-bold transition-all"
              >
                Need a Hint?
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={selectedOption === null}
                  className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-lg shadow-sky-600/30 transition-all"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-lg shadow-lg shadow-emerald-600/30 transition-all"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge' : 'Complete Module'}
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL-WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-md uppercase">
                Real-World Climatology Application
              </span>
              <h2 className="text-xl font-bold text-white mt-3 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm mb-6">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-sky-400">Phase {idx + 1}</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Matrix Review */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Diagnostic Assessment Benchmark</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIAGNOSTIC_QUESTIONS.map((dq, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-xs font-bold text-slate-200">{dq.question}</p>
                    <div className="text-xs text-emerald-400 font-mono">
                      Correct Answer: {dq.options[dq.correctIndex]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C11_GeoClimateCBSESim;