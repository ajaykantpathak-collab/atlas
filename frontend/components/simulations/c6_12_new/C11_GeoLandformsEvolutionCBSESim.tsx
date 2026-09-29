'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. NODE IDS & DOMAIN CONSTANTS
// ==========================================
const ALL_NODE_IDS = [
  'c11_geo_cbse_433', 'c11_geo_cbse_434', 'c11_geo_cbse_435', 'c11_geo_cbse_436', 'c11_geo_cbse_437',
  'c11_geo_cbse_438', 'c11_geo_cbse_439', 'c11_geo_cbse_440', 'c11_geo_cbse_441', 'c11_geo_cbse_442',
  'c11_geo_cbse_443', 'c11_geo_cbse_444', 'c11_geo_cbse_445', 'c11_geo_cbse_446', 'c11_geo_cbse_447',
  'c11_geo_cbse_448', 'c11_geo_cbse_449', 'c11_geo_cbse_450', 'c11_geo_cbse_451', 'c11_geo_cbse_452',
  'c11_geo_cbse_453', 'c11_geo_cbse_454', 'c11_geo_cbse_455', 'c11_geo_cbse_456', 'c11_geo_cbse_457',
  'c11_geo_cbse_458', 'c11_geo_cbse_459', 'c11_geo_cbse_460', 'c11_geo_cbse_461', 'c11_geo_cbse_462',
  'c11_geo_cbse_463', 'c11_geo_cbse_464', 'c11_geo_cbse_465', 'c11_geo_cbse_466', 'c11_geo_cbse_467',
  'c11_geo_cbse_468', 'c11_geo_cbse_469', 'c11_geo_cbse_470', 'c11_geo_cbse_471', 'c11_geo_cbse_472',
  'c11_geo_cbse_473', 'c11_geo_cbse_474', 'c11_geo_cbse_475', 'c11_geo_cbse_476', 'c11_geo_cbse_477',
  'c11_geo_cbse_478', 'c11_geo_cbse_479', 'c11_geo_cbse_480', 'c11_geo_cbse_481', 'c11_geo_cbse_482',
  'c11_geo_cbse_483', 'c11_geo_cbse_484', 'c11_geo_cbse_485', 'c11_geo_cbse_486', 'c11_geo_cbse_487',
  'c11_geo_cbse_488', 'c11_geo_cbse_489', 'c11_geo_cbse_490', 'c11_geo_cbse_491'
] as const;

type NodeID = typeof ALL_NODE_IDS[number];

// Node mapping for specific thematic categories
const NODE_VARS = {
  CONCEPT_LANDFORMS: 'c11_geo_cbse_433' as NodeID,
  LANDSCAPES_AGGREGATION: 'c11_geo_cbse_434' as NodeID,
  GEOMORPHIC_AGENTS: 'c11_geo_cbse_435' as NodeID,
  RUNNING_WATER: 'c11_geo_cbse_436' as NodeID,
  OVERLAND_FLOW: 'c11_geo_cbse_437' as NodeID,
  RILLS_TO_VALLEYS: 'c11_geo_cbse_438' as NodeID,
  VALLEY_CLASSIFICATION: 'c11_geo_cbse_439' as NodeID,
  POTHOLE_PLUNGE: 'c11_geo_cbse_440' as NodeID,
  INCISED_MEANDERS: 'c11_geo_cbse_441' as NodeID,
  RIVER_TERRACES: 'c11_geo_cbse_442' as NodeID,
  YOUTH_STAGE: 'c11_geo_cbse_443' as NodeID,
  MATURE_STAGE: 'c11_geo_cbse_444' as NodeID,
  OLD_STAGE: 'c11_geo_cbse_445' as NodeID,
  PENEPLAIN_FORM: 'c11_geo_cbse_446' as NodeID,
  ALLUVIAL_FANS: 'c11_geo_cbse_447' as NodeID,
  FLOODPLAINS: 'c11_geo_cbse_448' as NodeID,
  DELTAS: 'c11_geo_cbse_449' as NodeID,
  LEVEES: 'c11_geo_cbse_450' as NodeID,
  POINT_BARS: 'c11_geo_cbse_451' as NodeID,
  MEANDER_DYNAMICS: 'c11_geo_cbse_452' as NodeID,
  OXBOW_LAKE: 'c11_geo_cbse_453' as NodeID,
  MONADNOCKS: 'c11_geo_cbse_454' as NodeID,
  COASTAL_BEACHES: 'c11_geo_cbse_460' as NodeID,
  BARS_SPITS: 'c11_geo_cbse_461' as NodeID,
  HIGH_ROCKY_COASTS: 'c11_geo_cbse_462' as NodeID,
  WAVE_CUT_CLIFFS: 'c11_geo_cbse_463' as NodeID,
  SEA_CAVES_STACKS: 'c11_geo_cbse_464' as NodeID,
  WAVE_CUT_PLATFORMS: 'c11_geo_cbse_466' as NodeID,
  KARST_OVERVIEW: 'c11_geo_cbse_467' as NodeID,
  GROUNDWATER_KARST: 'c11_geo_cbse_468' as NodeID,
  KARST_EROSIONAL: 'c11_geo_cbse_469' as NodeID,
  KARST_CAVES: 'c11_geo_cbse_470' as NodeID,
  STALACTITES_STALAGMITES: 'c11_geo_cbse_471' as NodeID,
  GLACIER_TYPES: 'c11_geo_cbse_472' as NodeID,
  GLACIAL_EROSION: 'c11_geo_cbse_473' as NodeID,
  CIRQUES_TARNS: 'c11_geo_cbse_475' as NodeID,
  HORNS_ARETES: 'c11_geo_cbse_476' as NodeID,
  U_SHAPED_VALLEYS: 'c11_geo_cbse_477' as NodeID,
  MORAINES: 'c11_geo_cbse_479' as NodeID,
  ESKERS: 'c11_geo_cbse_480' as NodeID,
  DRUMLINS: 'c11_geo_cbse_482' as NodeID,
  WIND_EROSION: 'c11_geo_cbse_483' as NodeID,
  DESERT_EROSIONAL: 'c11_geo_cbse_484' as NodeID,
  PLAYAS: 'c11_geo_cbse_485' as NodeID,
  SAND_DUNES: 'c11_geo_cbse_486' as NodeID,
  DEFLATION_HOLLOWS: 'c11_geo_cbse_488' as NodeID,
};

// ==========================================
// 2. MANDATORY SECTIONS DATA
// ==========================================

const SCENARIO = {
  title: 'Geomorphic Virtual Laboratory & Field Simulation',
  intro: 'Welcome to the Advanced Geomorphology Dynamics Observatory. As a senior physical geographer, you will manipulate climate, tectonic slope, hydro-flow rates, and lithology across five dynamic environments: Fluvial, Karst, Glacial, Coastal, and Eolian systems.',
  context: 'Observe how exogenous geomorphic agents transform Earth\'s surface across youth, mature, and old developmental stages over geological time scales.'
};

const DISCOVERY_QUESTION = {
  question: 'Why do deep V-shaped valleys and interlocking spurs characterize river youth, while wide meanders with oxbow lakes dominate the old stage?',
  options: [
    'Because rivers run faster in flat plains due to increased water volume.',
    'Because early stage energy is primarily consumed by vertical downcutting, whereas late stage low gradient shifts energy towards lateral planation.',
    'Because rock hardness decreases naturally near the ocean.',
    'Because rainfall only occurs in high mountain youth regions.'
  ],
  correctIndex: 1,
  hintAfter: 'Vertical erosion (downcutting) dominates high-gradient youth slopes, whereas reduced gradient forces kinetic energy into sideward hydraulic scour and meander formation.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Fluvial Profile & Stage Dynamics',
    instruction: 'Adjust mountain slope gradient, river discharge, and rock resistance to simulate V-shaped valley erosion, meander formation, and peneplain evolution.',
    interactionType: 'fluvial_lab',
    nodeId: NODE_VARS.RUNNING_WATER,
  },
  {
    title: 'Lab 2: Karst Hydro-Lithology & Subterranean Deposition',
    instruction: 'Vary carbonic acid concentration, limestone purity, and water table level to form sinkholes, caves, stalactites, stalagmites, and pillars.',
    interactionType: 'karst_lab',
    nodeId: NODE_VARS.KARST_OVERVIEW,
  },
  {
    title: 'Lab 3: Glacial Valley & Till Dynamics',
    instruction: 'Control glacier thickness, ice velocity, and temperature to observe plucking, abrasion, cirque development, horns, drumlins, and moraine accumulation.',
    interactionType: 'glacial_lab',
    nodeId: NODE_VARS.GLACIER_TYPES,
  },
  {
    title: 'Lab 4: Coastal Wave Energy & Cliff Scour',
    instruction: 'Modify wave energy, tidal range, and shoreline profile to model sea cave formation, arch collapse into stacks, wave-cut platforms, and spit growth.',
    interactionType: 'coastal_lab',
    nodeId: NODE_VARS.HIGH_ROCKY_COASTS,
  },
  {
    title: 'Lab 5: Eolian Sand Transport & Dune Topography',
    instruction: 'Adjust wind velocity, sand supply, and vegetation cover to build barchans, transverse dunes, yardangs, mushroom rocks, and deflation hollows.',
    interactionType: 'arid_lab',
    nodeId: NODE_VARS.WIND_EROSION,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an uplifted plateau undergoes intense fluvial rejuvenation during its mature stage, what landform feature will develop along the river course?',
    options: [
      'Dissected peneplains with broad oxbow lakes',
      'Incised or entrenched meanders deeply cut into bedrock',
      'Extensive coastal barrier bars and sand spits',
      'Subterranean limestone karst pillars'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, set meander formation and trigger regional slope tectonic uplift to observe entrenched meanders.',
    nodeId: NODE_VARS.INCISED_MEANDERS,
  },
  {
    question: 'Predict: What happens to a sea arch over extended decades of persistent wave hydraulic action and abrasion at its base?',
    options: [
      'It expands into an extensive alluvial fan.',
      'The roof collapses, leaving an isolated sea stack, which later erodes into a stump.',
      'It converts into a subterranean karst sinkhole.',
      'It turns into a parabolic sand dune.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, increase wave energy on high rocky shoreline to observe arch roof collapse.',
    nodeId: NODE_VARS.SEA_CAVES_STACKS,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: Notice the cross-section of a limestone cave ceiling vs. floor. Where do stalactites grow, and what forms from floor drip water?',
    observableOptions: [
      'Stalactites hang down from the ceiling; stalagmites grow upward from the floor.',
      'Stalactites grow upward from the floor; stalagmites hang from ceiling.',
      'Both stalactites and stalagmites float freely in cave pools.',
      'Stalactites only form along ocean coastal cliffs.'
    ],
    correctIndex: 0,
    nodeId: NODE_VARS.STALACTITES_STALAGMITES,
  },
  {
    question: 'Observation: Observe the shape of a Barchan sand dune relative to wind direction. How are its horns (tips) oriented?',
    observableOptions: [
      'Horns point upwind toward the wind origin.',
      'Horns point downwind in the direction of wind movement.',
      'Horns form perpendicular to wind velocity.',
      'Horns constantly rotate in circles.'
    ],
    correctIndex: 1,
    nodeId: NODE_VARS.SAND_DUNES,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Geotechnical Assessment: Hydro-Geomorphic Hazard Mapping',
  description: 'Apply principles of fluvial dynamics and mass wasting to evaluate infrastructure risk along a meandering river basin prone to seasonal flooding.',
  steps: [
    'Measure river slope gradient (S = 0.002) and stream velocity (V = 2.8 m/s) during monsoon peak flow.',
    'Calculate the radius of meander curvature and identify high-velocity outer bank erosion zones (cut-banks).',
    'Assess oxbow lake cutoff probability and design natural levees using coarse river gravel.',
    'Synthesize a regional geomorphic hazard map delineating floodplains, point bars, and stable bedrock terraces.'
  ]
};

// MISCONCEPTIONS (6 topic-specific)
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'River Speed Misconception',
    misconception: 'Rivers flow faster near their mountain source than near their mouth.',
    correction: 'While mountain streams have higher gradients, lower river reaches often have higher average velocity due to massive water volume and reduced channel friction relative to total wetted perimeter.',
    nodeId: NODE_VARS.RUNNING_WATER,
  },
  {
    id: 'misc_2',
    title: 'Groundwater Cave Origin',
    misconception: 'Caves are carved by underground roaring rivers like surface valleys.',
    correction: 'Most karst caves form primarily through slow chemical solutional weathering of calcium carbonate by weak carbonic acid solution under saturated phreatic conditions.',
    nodeId: NODE_VARS.KARST_CAVES,
  },
  {
    id: 'misc_3',
    title: 'Glacial Movement Mechanism',
    misconception: 'Glaciers slide as rigid blocks over solid ground without internal deformation.',
    correction: 'Glaciers move through a combination of internal plastic deformation (creep under gravity) and basal sliding facilitated by meltwater lubrication.',
    nodeId: NODE_VARS.GLACIER_TYPES,
  },
  {
    id: 'misc_4',
    title: 'Desert Wind Dominance',
    misconception: 'Wind is the sole agent responsible for all desert landforms.',
    correction: 'Though wind (eolian action) is active, sudden torrential water flow (flash floods / sheetwash) is actually the dominant shaper of many desert landforms like pediments and canyons.',
    nodeId: NODE_VARS.WIND_EROSION,
  },
  {
    id: 'misc_5',
    title: 'Stalactite vs Stalagmite Drift',
    misconception: 'Stalactites and stalagmites are formed by ocean salt crystallization.',
    correction: 'They are formed by calcium carbonate ($CaCO_3$) precipitation when dissolved carbon dioxide degassing occurs from groundwater dripping inside air-filled caves.',
    nodeId: NODE_VARS.STALACTITES_STALAGMITES,
  },
  {
    id: 'misc_6',
    title: 'Peneplain Flatness Origin',
    misconception: 'Peneplains are created by sudden catastrophic marine floods.',
    correction: 'Peneplains represent the ultimate featureless, low-relief plain formed by protracted multi-stage subaerial erosion over millions of years.',
    nodeId: NODE_VARS.PENEPLAIN_FORM,
  },
];

// DIAGNOSTIC QUESTIONS (8 items)
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which sequence correctly traces the development of fluvial stream channels?',
    options: ['Valleys -> Gullies -> Rills -> Sheetwash', 'Sheetwash -> Rills -> Gullies -> Valleys', 'Gullies -> Rills -> Sheetwash -> Valleys', 'Valleys -> Rills -> Gullies -> Sheetwash'],
    correctIndex: 1,
    nodeId: NODE_VARS.RILLS_TO_VALLEYS,
  },
  {
    id: 'diag_2',
    question: 'A bowl-shaped steep-sided depression carved by high alpine glacial erosion at a valley head is known as a:',
    options: ['Drumlin', 'Cirque (or Corrie)', 'Esker', 'Mushroom Rock'],
    correctIndex: 1,
    nodeId: NODE_VARS.CIRQUES_TARNS,
  },
  {
    id: 'diag_3',
    question: 'Which depositional landform is created when a braided mountain stream suddenly empties onto a gentle plain slope?',
    options: ['Delta', 'Alluvial Fan', 'Oxbow Lake', 'Stalagmite'],
    correctIndex: 1,
    nodeId: NODE_VARS.ALLUVIAL_FANS,
  },
  {
    id: 'diag_4',
    question: 'Steep-sided, sharp-crested serrated ridges separating adjacent glacial cirques are called:',
    options: ['Arêtes', 'Eskers', 'Yardangs', 'Spits'],
    correctIndex: 0,
    nodeId: NODE_VARS.HORNS_ARETES,
  },
  {
    id: 'diag_5',
    question: 'What landform forms when a meander loop is completely cut off from the main river channel?',
    options: ['Plunge pool', 'Oxbow lake', 'Pothole', 'Natural levee'],
    correctIndex: 1,
    nodeId: NODE_VARS.OXBOW_LAKE,
  },
  {
    id: 'diag_6',
    question: 'Elongated, inverted spoon-shaped hills composed of unsorted glacial till aligned with ice movement are called:',
    options: ['Drumlins', 'Cirques', 'Playas', 'Stacks'],
    correctIndex: 0,
    nodeId: NODE_VARS.DRUMLINS,
  },
  {
    id: 'diag_7',
    question: 'Crescent-shaped sand dunes with horns pointing in the direction of wind flow are termed:',
    options: ['Seif dunes', 'Barchans', 'Transverse dunes', 'Parabolic dunes'],
    correctIndex: 1,
    nodeId: NODE_VARS.SAND_DUNES,
  },
  {
    id: 'diag_8',
    question: 'Resistant bedrock residual hills standing above an eroded featureless peneplain surface are called:',
    options: ['Monadnocks (or Inselbergs)', 'Stumps', 'Tarns', 'Eskers'],
    correctIndex: 0,
    nodeId: NODE_VARS.MONADNOCKS,
  },
];

// ==========================================
// 3. CHALLENGES DATA (22 Progressive Challenges)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeID;
  type: 'multiple_choice' | 'interactive_action' | 'ordering' | 'numeric';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 to 7) ---
  {
    id: 'c_1',
    nodeId: NODE_VARS.CONCEPT_LANDFORMS,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the fundamental distinction between a landform and a landscape?',
    options: [
      'A landform is a single physical feature (e.g. mountain, valley); a landscape is an aggregation of related landforms.',
      'Landforms are only formed by water; landscapes are formed by wind.',
      'Landscapes are micro-features while landforms are continental plates.',
      'There is no geological difference between the two terms.'
    ],
    correctIndex: 0,
    explanation: 'Landforms are individual topographic features of Earth’s surface, while landscapes represent broad spatial assemblies of interconnected landforms.',
    hints: ['Think of landforms as individual trees and landscape as the entire forest.', 'Consider scale and aggregation.', 'Single feature vs ensemble.']
  },
  {
    id: 'c_2',
    nodeId: NODE_VARS.GEOMORPHIC_AGENTS,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following serves as the primary exogenic agent of erosion across humid climate zones?',
    options: ['Glaciers', 'Running water (Fluvial agent)', 'Wind (Eolian agent)', 'Groundwater solution'],
    correctIndex: 1,
    explanation: 'Running water is the single most dominant geomorphic agent worldwide, especially in humid and sub-humid environments.',
    hints: ['Think about streams, rivers, and rainfall intensity.', 'Water flows governed by gravity.', 'Dominant in non-polar regions.']
  },
  {
    id: 'c_3',
    nodeId: NODE_VARS.POTHOLE_PLUNGE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Cylindrical depressions carved into bedrock stream channels by rotating pebbles under turbulent water eddies are called:',
    options: ['Meander cut-offs', 'Potholes', 'Natural levees', 'Eskers'],
    correctIndex: 1,
    explanation: 'Potholes are smooth, cylindrical holes eroded into stream beds through abrasive drilling action by swirling rock fragments in eddies.',
    hints: ['Swirling pebbles act like drill bits.', 'Common in rocky mountain stream beds.', 'Potholes form by abrasion.']
  },
  {
    id: 'c_4',
    nodeId: NODE_VARS.YOUTH_STAGE,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which channel characteristics predominate during the YOUTH stage of a fluvial landscape cycle?',
    options: ['Broad floodplains with oxbow lakes', 'V-shaped valleys, steep gradient, waterfalls, and lack of floodplains', 'Low gradients, natural levees, and deltas', 'Featureless flat peneplain surfaces'],
    correctIndex: 1,
    explanation: 'Youth rivers feature steep gradients, vigorous vertical downcutting, V-shaped cross-sections, and prominent waterfalls or rapids.',
    hints: ['High relief and steep slope gradient.', 'Vertical erosion dominates over lateral erosion.', 'V-shaped gorges and waterfalls.']
  },
  {
    id: 'c_5',
    nodeId: NODE_VARS.KARST_OVERVIEW,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Karst topography develops predominantly in terrain rich in which type of bedrock?',
    options: ['Granite', 'Limestone / Dolomite', 'Basalt', 'Sandstone'],
    correctIndex: 1,
    explanation: 'Karst landforms develop through solution weathering of carbonate rocks, most notably limestone ($CaCO_3$) and dolomite.',
    hints: ['Soluble carbonate rock.', 'Reacts with weak carbonic acid.', 'Limestone terrain.']
  },
  {
    id: 'c_6',
    nodeId: NODE_VARS.GLACIER_TYPES,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What term describes mass movement of ice radiating outward in all directions from a central thick ice cap across vast continental areas?',
    options: ['Valley glacier', 'Alpine glacier', 'Continental glacier (Ice sheet)', 'Cirque glacier'],
    correctIndex: 2,
    explanation: 'Continental glaciers or ice sheets (like Greenland or Antarctica) submerge vast land areas and flow outward in all directions.',
    hints: ['Vast ice sheets covering polar continents.', 'Flows in all directions under immense weight.', 'Antarctica and Greenland are prime examples.']
  },
  {
    id: 'c_7',
    nodeId: NODE_VARS.WIND_EROSION,
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The process by which wind lifts and blows away loose, fine, dry particles of soil and sand is termed:',
    options: ['Abrasion', 'Deflation', 'Attrition', 'Solution'],
    correctIndex: 1,
    explanation: 'Deflation is the physical lifting and removal of loose sand/dust particles by wind current action, leaving behind lag deposits.',
    hints: ['Lifting loose particles away.', 'Creates hollows in desert bedrock.', 'Deflation means blowing away loose grain.']
  },

  // --- STANDARD TIER (8 to 15) ---
  {
    id: 'c_8',
    nodeId: NODE_VARS.MEANDER_DYNAMICS,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a meandering river bend, where does maximum lateral channel erosion occur, and where does deposition take place?',
    options: [
      'Erosion on inner bank; deposition on outer bank.',
      'Erosion on outer concave bank (cut bank); deposition on inner convex bank (point bar).',
      'Erosion occurs evenly along both banks simultaneously.',
      'Deposition occurs only at the center of the deep channel bed.'
    ],
    correctIndex: 1,
    explanation: 'Centrifugal force directs maximum flow velocity toward the outer concave bank (cut bank) causing erosion, while slower velocity along the inner convex bank deposits sediment (point bar).',
    hints: ['Water swings outward at high speed on bends.', 'Outer bank experiences hydraulic scour.', 'Inner bank has lower velocity leading to sediment accumulation.']
  },
  {
    id: 'c_9',
    nodeId: NODE_VARS.OXBOW_LAKE,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does an oxbow lake transition into an oxbow swamp and eventually disappear?',
    options: [
      'By continuous tectonic uplift.',
      'By progressive siltation, organic matter decay, and evaporation after being severed from the main stream during floods.',
      'By rapid volcanic basalt inundation.',
      'By glacio-eustatic sea level rise.'
    ],
    correctIndex: 1,
    explanation: 'Once cut off, static water in the oxbow lake gradually fills with sediment, fine clay, and rotting vegetation, converting it into a swamp before drying out completely.',
    hints: ['The cutoff meander loop is isolated from river flow.', 'Fine sediments drop in quiet water.', 'Vegetation eventually fills the shallow lake.']
  },
  {
    id: 'c_10',
    nodeId: NODE_VARS.STALACTITES_STALAGMITES,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What chemical process causes calcium carbonate precipitation when dripping groundwater enters a ventilation-rich underground karst cavern?',
    options: [
      'Loss of dissolved $CO_2$ gas due to pressure drop and evaporation causes $CaCO_3$ to precipitate.',
      'Absorption of oxygen gas turning calcite into hematite.',
      'Freezing of mineralized groundwater droplets into pure ice crystals.',
      'Acidification of water by sulfur dioxide.'
    ],
    correctIndex: 0,
    explanation: 'Groundwater under pressure holds dissolved $CO_2$. Upon reaching an open cave chamber, $CO_2$ degasses into cave air, decreasing solubility and precipitating $CaCO_3$ stalactites/stalagmites.',
    hints: ['Think of opening a carbonated soda bottle releasing gas.', 'Loss of carbon dioxide reduces calcite solubility.', 'Precipitation leaves mineral deposits behind.']
  },
  {
    id: 'c_11',
    nodeId: NODE_VARS.U_SHAPED_VALLEYS,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does a glacial trough possess a wide, flat bottom and steep vertical walls (U-shape) compared to a river valley (V-shape)?',
    options: [
      'Glaciers flow rapidly like flash floods across high mountains.',
      'Glacial ice occupies the entire valley width, eroding both floor and side walls through plucking and abrasion.',
      'Wind blows away valley side rocks in glacial regions.',
      'Subterranean limestone collapses create flat valley floors.'
    ],
    correctIndex: 1,
    explanation: 'Glaciers fill the pre-existing V-shaped river valley completely. Plucking and abrasive scouring along both floor and side slopes widen and deepen the valley into a broad U-shaped trough.',
    hints: ['Ice fills the entire cross-section of the valley.', 'Both vertical downcutting and lateral scraping occur over ice-wetted area.', 'Straightens spurs into truncated spurs.']
  },
  {
    id: 'c_12',
    nodeId: NODE_VARS.WAVE_CUT_CLIFFS,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What triggers the catastrophic collapse of high sea cliffs, resulting in the retreat of rocky coastlines?',
    options: [
      'Deposition of offshore barrier islands.',
      'Undercutting at sea level by wave notch erosion, creating an overhang that eventually fails under gravity.',
      'Subterranean stream dissolution of coastal granite.',
      'Eolian sand dune migration onto the cliff top.'
    ],
    correctIndex: 1,
    explanation: 'Continuous hydraulic pounding and wave abrasion etch a horizontal notch at cliff base. As notch deepens, upper cliff loses structural support and collapses under gravity.',
    hints: ['Wave notch erodes at high-tide level.', 'Overhanging cliff faces lack support.', 'Gravitational collapse leads to cliff retreat.']
  },
  {
    id: 'c_13',
    nodeId: NODE_VARS.SAND_DUNES,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which factors determine whether sand dunes form as Barchans, Seifs (longitudinal dunes), or Transverse dunes?',
    options: [
      'Soil pH, ambient air temperature, and rainfall acidity.',
      'Wind direction constancy, wind velocity, and sand sediment availability.',
      'Crustal plate movement and distance to the equator.',
      'Underground limestone cavity presence.'
    ],
    correctIndex: 1,
    explanation: 'Dune morphology depends heavily on prevailing wind direction consistency (unidirectional vs. shifting), wind force strength, and total sand volume available.',
    hints: ['Single constant direction + limited sand = Barchan.', 'Abundant sand + steady wind = Transverse.', 'Shifting wind directions = Seif / Star dunes.']
  },
  {
    id: 'c_14',
    nodeId: NODE_VARS.RIVER_TERRACES,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Stepped bench-like surfaces along valley flanks known as river terraces represent:',
    options: ['Remnants of former higher floodplain levels marking valley rejuvenation or climate change.', 'Glacial moraines deposited by ancient glaciers.', 'Wind-blown sand deposits along desert margins.', 'Volcanic basalt flows filling dry valleys.'],
    correctIndex: 0,
    explanation: 'River terraces are abandoned floodplains left high above the current channel level due to renewed vertical downcutting (rejuvenation) by tectonic uplift or sea-level drop.',
    hints: ['Old floodplain steps left high and dry.', 'Caused by river rejuvenation downcutting.', 'Paired or unpaired valley steps.']
  },
  {
    id: 'c_15',
    nodeId: NODE_VARS.ESKERS,
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Sinuous, narrow, winding ridges composed of stratified sand and gravel deposited by subglacial meltwater streams inside ice tunnels are:',
    options: ['Cirques', 'Eskers', 'Yardangs', 'Spits'],
    correctIndex: 1,
    explanation: 'Eskers are long, snake-like ridges of stratified meltwater sediment left behind when stagnant glacial ice melts completely away.',
    hints: ['Subglacial tunnel stream bed deposit.', 'Winding snake-like landform.', 'Composed of sorted meltwater gravel.']
  },

  // --- ADVANCED TIER (16 to 22) ---
  {
    id: 'c_16',
    nodeId: NODE_VARS.PENEPLAIN_FORM,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate William Morris Davis’s "Geomorphic Cycle of Erosion". What does a Peneplain with Monadnocks represent?',
    options: [
      'The initial tectonic uplift phase prior to river initiation.',
      'The ultimate end-stage of landscape degradation where base level is reached, leaving isolated resistant rock hills.',
      'A temporary landform created during peak glacial maximum.',
      'A marine coastal wave platform submerged under deep ocean water.'
    ],
    correctIndex: 1,
    explanation: 'According to W.M. Davis, prolonged weathering and denudation reduce high mountain landscapes to an ultimate low-relief featureless plain (peneplain) studded with resistant monadnock hills.',
    hints: ['Ultimate end product of subaerial landscape erosion.', 'Low gradient near regional base level.', 'Monadnocks are un-eroded resistant remnants.']
  },
  {
    id: 'c_17',
    nodeId: NODE_VARS.INCISED_MEANDERS,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What geomorphic sequence leads to the formation of deeply entrenched (incised) meanders like those in the Colorado River Grand Canyon?',
    options: [
      'A flat, mature river system with meanders undergoes rapid crustal uplift, forcing vertical downcutting without altering meander symmetry.',
      'Glacial erosion carves wide meanders into mountain summits.',
      'Strong wind gusts blow river channels into deep serpentine bedrock trenches.',
      'Subterranean limestone caverns collapse in a straight line.'
    ],
    correctIndex: 0,
    explanation: 'When a mature, low-gradient meandering river is rejuvenated by tectonic uplift of the land, vertical erosion resumes vigorously, carving pre-existing serpentine meanders deep into bedrock.',
    hints: ['Pre-existing meanders formed on flat plain.', 'Subsequent crustal uplift triggers vertical downcutting.', 'Meanders become locked into deep canyon rock walls.']
  },
  {
    id: 'c_18',
    nodeId: NODE_VARS.DELTAS,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare Mississippi River Delta (Bird-foot) with Nile Delta (Arcuate). Why do their geometric shapes differ fundamentally?',
    options: [
      'Difference in water temperature between tropical and arctic seas.',
      'Balance between river sediment discharge volume vs. ocean wave and tidal redistribution power.',
      'Difference in surrounding atmospheric air pressure.',
      'Presence of coral reefs in one ocean basin.'
    ],
    correctIndex: 1,
    explanation: 'River-dominated deltas (Mississippi) push sediment outward into calm waters forming digitate bird-foot patterns, whereas wave-dominated deltas (Nile) distribute sand smoothly into arcuate shapes.',
    hints: ['Sediment supply rate vs. wave energy.', 'Calm sea permits long river distributary fingers.', 'Strong waves smooth the coastline into an arc shape.']
  },
  {
    id: 'c_19',
    nodeId: NODE_VARS.GROUNDWATER_KARST,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Karst regions, why do surface rivers often vanish suddenly into the ground (sinking streams or blind valleys)?',
    options: [
      'Water evaporates instantly due to subterranean geothermal heating.',
      'Surface streams encounter jointed limestone and drop down enlarged vertical swallow holes (sinkholes/dolines) into subterranean channels.',
      'Glacial ice seals the river surface.',
      'Desert winds lift the river water into clouds.'
    ],
    correctIndex: 1,
    explanation: 'Carbonate rocks are heavily fractured. Surface runoff finds acidic joints, enlarging swallow holes (ponors) through solution, draining entire streams into underground cavern networks.',
    hints: ['Limestone joints expanded by acid solution.', 'Swallow holes (ponors) absorb surface water.', 'Streams flow through subterranean conduit channels.']
  },
  {
    id: 'c_20',
    nodeId: NODE_VARS.MORAINES,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When two tributary valley glaciers converge into a single main glacier trunk, what happens to their lateral moraines?',
    options: [
      'They disappear completely due to friction.',
      'They merge down the center of the main glacier to form a prominent Medial Moraine.',
      'They drop down into deep esker tunnels.',
      'They convert instantly into drumlins.'
    ],
    correctIndex: 1,
    explanation: 'The inner lateral moraines of two converging valley glaciers meet and join, forming a dark debris strip along the center of the combined ice stream called a medial moraine.',
    hints: ['Two outer margins join in the middle.', 'Central debris band on the combined glacier surface.', 'Medial moraine formation.']
  },
  {
    id: 'c_21',
    nodeId: NODE_VARS.DESERT_EROSIONAL,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Distinguish between a Yardang and a Mushroom Rock (Pedestal Rock) in eolian erosional environments.',
    options: [
      'Yardangs are streamlined ridges eroded by wind parallel to prevailing direction; mushroom rocks feature undercut bases formed by maximum wind abrasion near ground level.',
      'Yardangs are formed by water; mushroom rocks are formed by glaciers.',
      'Mushroom rocks only occur under ocean water.',
      'Yardangs are sand dunes while mushroom rocks are volcanic cones.'
    ],
    correctIndex: 0,
    explanation: 'Yardangs are wind-carved streamlined rock ridges parallel to wind direction. Mushroom rocks have top-heavy shapes because sand-laden wind abrasion is concentrated within 1-2 meters of the desert surface.',
    hints: ['Saltating sand grains travel close to the ground.', 'Basal undercutting creates mushroom shapes.', 'Yardangs are wind-parallel elongated ridges.']
  },
  {
    id: 'c_22',
    nodeId: NODE_VARS.PLAYAS,
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Formulate the hydro-geomorphic sequence that leads to the creation of an Alkali Flat or Salt Playa in an arid intermontane basin.',
    options: [
      'Rainfall runoff collects in an undrained desert basin (bolson), forms a shallow playa lake, which evaporates under intense sun, leaving behind dissolved mineral salts.',
      'Coastal ocean water overflows mountain peaks and freezes.',
      'Glacial meltwater deposits boulder till which turns into salt crystals.',
      'Wind blows ocean salt inland over thousands of miles into high mountains.'
    ],
    correctIndex: 0,
    explanation: 'Ephemeral flash floods drain into closed interior basins (bolson). Because water has no outlet, rapid evaporation under desert conditions leaves behind encrusted beds of sodium carbonate/chloride salts.',
    hints: ['Interior drainage basin (bolson).', 'Temporary playa lake formed after desert storm.', 'Complete evaporation precipitates concentrated mineral salts.']
  }
];

// ==========================================
// 4. LANDFORM GLOSSARY / DATA METADATA
// ==========================================
const LANDFORM_SYSTEMS = {
  fluvial: {
    name: 'Fluvial Landforms (Running Water)',
    description: 'Landforms shaped by overland flow and channelized river flow.',
    stages: ['Youth Stage', 'Mature Stage', 'Old Stage', 'Peneplain'],
    erosional: ['V-Shaped Valley', 'Gorge & Canyon', 'Potholes', 'Plunge Pool', 'Waterfalls', 'Incised Meanders', 'River Terraces'],
    depositional: ['Alluvial Fans', 'Natural Levees', 'Point Bars', 'Floodplains', 'Oxbow Lakes', 'Deltas', 'Braided Channels']
  },
  karst: {
    name: 'Karst Landforms (Groundwater Solution)',
    description: 'Subterranean and surface features formed by chemical dissolution of carbonate rock.',
    stages: ['Initial Solution', 'Cavern Expansion', 'Vault Collapse', 'Tower Karst'],
    erosional: ['Sinkholes (Dolines)', 'Uvalas', 'Poljes', 'Swallow Holes (Ponors)', 'Subterranean Caves', 'Blind Valleys'],
    depositional: ['Stalactites', 'Stalagmites', 'Pillars / Columns', 'Dripstones', 'Tufa Deposits', 'Travertine Terraces']
  },
  glacial: {
    name: 'Glacial Landforms (Moving Ice)',
    description: 'Erosional and depositional structures carved by alpine and continental ice bodies.',
    stages: ['Glacial Accumulation', 'Glacial Retreat', 'Post-Glacial Landscape'],
    erosional: ['Cirques & Tarn Lakes', 'Horns & Arêtes', 'U-Shaped Valleys (Troughs)', 'Hanging Valleys', 'Truncated Spurs', 'Fiords'],
    depositional: ['Terminal Moraine', 'Lateral Moraine', 'Medial Moraine', 'Ground Moraine', 'Drumlins', 'Eskers', 'Outwash Plains', 'Kames']
  },
  coastal: {
    name: 'Coastal Landforms (Waves & Currents)',
    description: 'Coastal features created by hydraulic action, abrasion, and marine sediment transport.',
    stages: ['High Rocky Coast Erosion', 'Low Sedimentary Coast Accumulation'],
    erosional: ['Sea Cliffs', 'Wave-Cut Platforms', 'Wave Notches', 'Sea Caves', 'Sea Arches', 'Sea Stacks & Stumps'],
    depositional: ['Beaches', 'Bars & Barrier Islands', 'Spits', 'Tombolos', 'Lagoons']
  },
  arid: {
    name: 'Arid & Eolian Landforms (Wind & Sheetwash)',
    description: 'Desert features generated by wind deflation/abrasion and ephemeral flash floods.',
    stages: ['Deflation Scour', 'Dune Migration', 'Pedimentation'],
    erosional: ['Pediments & Pediplains', 'Playas & Alkali Flats', 'Deflation Hollows', 'Mushroom Rocks', 'Yardangs', 'Zeugens'],
    depositional: ['Barchan Dunes', 'Seif (Longitudinal) Dunes', 'Transverse Dunes', 'Parabolic Dunes', 'Loess Deposits']
  }
};

// ==========================================
// 5. INTERACTIVE SVG DIAGRAM COMPONENTS
// ==========================================

// Fluvial Profile Diagram Component
const FluvialProfileSVG: React.FC<{ stage: number; discharge: number; gradient: number }> = ({ stage, discharge, gradient }) => {
  // stage: 0 = Youth, 1 = Mature, 2 = Old / Peneplain
  const strokeColor = "#3b82f6";
  return (
    <svg viewBox="0 0 800 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="mountainGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect x="0" y="0" width="800" height="360" fill="url(#skyGrad)" />

      {/* Dynamic Terrain Profile according to stage */}
      {stage === 0 && (
        <g id="youth_stage">
          {/* Steep Mountains */}
          <path d="M 0,40 L 180,180 L 320,80 L 500,240 L 800,290 L 800,360 L 0,360 Z" fill="url(#mountainGrad)" stroke="#64748b" strokeWidth="2" />
          {/* V-Shaped Valley Cut */}
          <polygon points="180,180 220,120 260,210 200,210" fill="#0f172a" />
          {/* Mountain Stream Streamlines */}
          <path d={`M 20,50 Q 140,140 190,180 T 310,120 T 480,230 T 790,295`} fill="none" stroke="url(#waterGrad)" strokeWidth={3 + discharge * 0.8} strokeDasharray="6,3" />
          {/* Waterfall & Plunge Pool */}
          <circle cx="310" cy="120" r="12" fill="#38bdf8" opacity="0.4" />
          <text x="310" y="100" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">Waterfall & Plunge Pool</text>
          <text x="140" y="130" fill="#94a3b8" fontSize="12">V-Shaped Valley (Vertical Downcutting)</text>
          <text x="600" y="270" fill="#94a3b8" fontSize="12">Steep Gradient ({gradient}°)</text>
        </g>
      )}

      {stage === 1 && (
        <g id="mature_stage">
          {/* Rolling Hills Landscape */}
          <path d="M 0,160 Q 200,120 380,220 T 800,260 L 800,360 L 0,360 Z" fill="url(#mountainGrad)" stroke="#64748b" strokeWidth="2" />
          {/* Meandering River Channel */}
          <path d={`M 0,180 Q 150,110 250,220 T 500,180 T 750,265 L 800,270`} fill="none" stroke="url(#waterGrad)" strokeWidth={6 + discharge * 1.2} />
          {/* Cut bank and Point bar markers */}
          <circle cx="230" cy="190" r="6" fill="#ef4444" />
          <text x="230" y="175" fill="#ef4444" fontSize="11" textAnchor="middle">Cut Bank (Erosion)</text>
          <circle cx="270" cy="235" r="6" fill="#22c55e" />
          <text x="270" y="252" fill="#22c55e" fontSize="11" textAnchor="middle">Point Bar (Deposition)</text>
          <text x="450" y="140" fill="#cbd5e1" fontSize="13" fontWeight="bold">Broadening Floodplain & Active Meanders</text>
        </g>
      )}

      {stage === 2 && (
        <g id="old_stage">
          {/* Extremely Low Relief Peneplain */}
          <path d="M 0,270 Q 300,260 500,275 T 800,280 L 800,360 L 0,360 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          {/* Monadnocks (Resistant remnants) */}
          <path d="M 150,270 Q 180,200 210,270 Z" fill="#475569" stroke="#94a3b8" />
          <text x="180" y="190" fill="#cbd5e1" fontSize="11" textAnchor="middle">Monadnock (Inselberg)</text>
          {/* Sinuous Meander Loops with Oxbow Lake */}
          <path d="M 0,280 C 120,220 180,340 280,280 C 380,220 420,340 520,280 L 800,285" fill="none" stroke="url(#waterGrad)" strokeWidth={9 + discharge * 1.5} />
          {/* Cut-off Oxbow Lake */}
          <path d="M 330,310 C 360,350 420,350 440,310 C 420,295 360,295 330,310 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
          <text x="385" y="340" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">Oxbow Lake (Cutoff)</text>
          {/* Natural Levee */}
          <rect x="520" y="272" width="120" height="6" fill="#d97706" opacity="0.8" />
          <text x="580" y="265" fill="#fbbf24" fontSize="11" textAnchor="middle">Natural Levees & Alluvium</text>
          {/* Delta mouth at coast */}
          <polygon points="740,285 800,260 800,310" fill="#0369a1" opacity="0.6" />
          <text x="770" y="330" fill="#7dd3fc" fontSize="11" textAnchor="middle">Delta Distributaries</text>
        </g>
      )}

      {/* Scale & Profile Labels */}
      <text x="20" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold">
        {stage === 0 ? 'Fluvial Youth Stage: High Energy & Downcutting' : stage === 1 ? 'Fluvial Mature Stage: Lateral Planation & Meandering' : 'Fluvial Old Stage: Peneplain, Oxbow Lake & Delta'}
      </text>
      <text x="780" y="30" fill="#94a3b8" fontSize="12" textAnchor="end">
        Discharge: {discharge} m³/s | Slope: {gradient}°
      </text>
    </svg>
  );
};

// Karst Topography SVG Component
const KarstTopographySVG: React.FC<{ acidLevel: number; limestonePurity: number }> = ({ acidLevel, limestonePurity }) => {
  return (
    <svg viewBox="0 0 800 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="limestoneGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>

      {/* Surface Topography with Sinkholes */}
      <path d="M 0,90 Q 100,80 150,130 Q 200,80 300,90 Q 400,140 460,90 L 800,90 L 800,360 L 0,360 Z" fill="url(#limestoneGrad)" stroke="#94a3b8" strokeWidth="2" />

      {/* Sinkhole / Doline Callout */}
      <text x="175" y="70" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">Sinkhole / Doline</text>
      <line x1="175" y1="75" x2="175" y2="105" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,3" />

      {/* Sinking Stream into Swallow Hole (Ponor) */}
      <path d="M 0,85 Q 80,85 150,125 L 175,180" fill="none" stroke="#38bdf8" strokeWidth="4" />
      <text x="70" y="75" fill="#38bdf8" fontSize="11">Sinking Stream</text>

      {/* Underground Cavern System */}
      <path d="M 220,170 C 250,130 500,130 550,170 C 600,220 580,280 500,280 C 400,280 200,270 220,170 Z" fill="#0f172a" stroke="#475569" strokeWidth="3" />
      <text x="380" y="210" fill="#e2e8f0" fontSize="14" fontWeight="bold">Subterranean Limestone Cavern</text>

      {/* Stalactites (Ceiling) */}
      <polygon points="300,150 308,200 316,150" fill="#cbd5e1" />
      <polygon points="360,145 366,185 372,145" fill="#cbd5e1" />
      <polygon points="440,148 447,205 454,148" fill="#cbd5e1" />
      <text x="310" y="140" fill="#a855f7" fontSize="11" textAnchor="middle">Stalactite</text>

      {/* Stalagmites (Floor) */}
      <polygon points="305,275 310,225 315,275" fill="#94a3b8" />
      <polygon points="442,275 447,218 452,275" fill="#94a3b8" />
      <text x="447" y="295" fill="#a855f7" fontSize="11" textAnchor="middle">Stalagmite</text>

      {/* Complete Pillar / Column */}
      <rect x="490" y="152" width="16" height="123" fill="#e2e8f0" stroke="#94a3b8" />
      <text x="498" y="140" fill="#38bdf8" fontSize="11" textAnchor="middle">Pillar (Column)</text>

      {/* Water Table Zone */}
      <line x1="0" y1="300" x2="800" y2="300" stroke="#0284c7" strokeWidth="3" strokeDasharray="8,4" />
      <text x="70" y="320" fill="#38bdf8" fontSize="12" fontWeight="bold">Water Table (Phreatic Zone)</text>

      {/* Interactive Status Overlay */}
      <text x="20" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold">Karst Dissolution & Speleothem Formation</text>
      <text x="780" y="30" fill="#94a3b8" fontSize="12" textAnchor="end">
        $H_2CO_3$ Acid Intensity: {acidLevel}% | $CaCO_3$ Purity: {limestonePurity}%
      </text>
    </svg>
  );
};

// Glacial Landscape SVG Component
const GlacialLandscapeSVG: React.FC<{ iceThickness: number; ablationRate: number }> = ({ iceThickness, ablationRate }) => {
  return (
    <svg viewBox="0 0 800 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="iceGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>

      {/* Mountain Horn and Cirque Bedrock */}
      <path d="M 0,360 L 0,160 L 100,50 L 180,160 L 260,70 L 380,240 L 800,280 L 800,360 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />

      {/* Glacial Cirque Basin */}
      <path d="M 100,50 L 140,160 Q 180,200 230,160 Z" fill="#1e293b" />
      <text x="120" y="40" fill="#e2e8f0" fontSize="13" fontWeight="bold">Glacial Horn (Peak)</text>

      {/* Tarn Lake in Cirque */}
      <ellipse cx="180" cy="170" rx="25" ry="10" fill="#0284c7" stroke="#38bdf8" />
      <text x="180" y="150" fill="#7dd3fc" fontSize="11" textAnchor="middle">Tarn Lake</text>

      {/* Arête Ridge */}
      <line x1="100" y1="50" x2="180" y2="160" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,2" />
      <text x="125" y="100" fill="#f43f5e" fontSize="11">Arête (Sharp Ridge)</text>

      {/* Main U-Shaped Glacier Body */}
      <path d={`M 230,160 Q 320,${200 - iceThickness * 0.4} 450,230 T 700,270 L 700,290 Q 450,280 230,220 Z`} fill="url(#iceGrad)" opacity="0.85" stroke="#7dd3fc" strokeWidth="2" />

      {/* Moraines */}
      {/* Lateral Moraine */}
      <path d="M 320,215 Q 450,245 600,275" fill="none" stroke="#d97706" strokeWidth="4" />
      <text x="430" y="230" fill="#fbbf24" fontSize="11">Lateral Moraine</text>

      {/* Terminal Moraine */}
      <ellipse cx="705" cy="280" rx="12" ry="20" fill="#b45309" stroke="#f59e0b" />
      <text x="715" y="310" fill="#f59e0b" fontSize="11" fontWeight="bold">Terminal Moraine</text>

      {/* Outwash Plain with Drumlins & Esker */}
      <rect x="717" y="275" width="83" height="85" fill="#475569" />
      {/* Drumlin Hill */}
      <ellipse cx="750" cy="300" rx="15" ry="6" fill="#64748b" stroke="#cbd5e1" />
      <text x="750" y="320" fill="#cbd5e1" fontSize="10" textAnchor="middle">Drumlin</text>

      {/* Interactive Title Overlay */}
      <text x="20" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold">Glacial Erosion & Morainic Till Transport</text>
      <text x="780" y="30" fill="#94a3b8" fontSize="12" textAnchor="end">
        Ice Thickness: {iceThickness}m | Ablation Rate: {ablationRate} mm/yr
      </text>
    </svg>
  );
};

// Coastal Erosion SVG Component
const CoastalErosionSVG: React.FC<{ waveEnergy: number; seaLevel: number }> = ({ waveEnergy, seaLevel }) => {
  return (
    <svg viewBox="0 0 800 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>

      {/* High Rocky Cliff & Wave Cut Platform */}
      <path d="M 0,360 L 0,80 L 160,80 L 200,220 L 320,240 L 320,360 Z" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
      <text x="80" y="65" fill="#e2e8f0" fontSize="13" fontWeight="bold">High Rocky Sea Cliff</text>

      {/* Wave-Cut Notch & Platform */}
      <path d="M 190,200 Q 210,225 195,230 L 320,240" fill="none" stroke="#ef4444" strokeWidth="3" />
      <text x="230" y="225" fill="#fca5a5" fontSize="11">Wave-Cut Platform</text>

      {/* Sea Cave / Arch / Stack Feature */}
      {/* Sea Arch */}
      <path d="M 420,240 C 420,150 480,150 480,240 L 510,240 C 510,120 390,120 390,240 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
      <text x="435" y="130" fill="#e2e8f0" fontSize="11" textAnchor="middle">Sea Arch</text>

      {/* Isolated Sea Stack & Stump */}
      <rect x="560" y="160" width="30" height="80" fill="#334155" stroke="#94a3b8" />
      <text x="575" y="145" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">Sea Stack</text>

      <rect x="630" y="210" width="25" height="30" fill="#1e293b" stroke="#64748b" />
      <text x="642" y="200" fill="#94a3b8" fontSize="10" textAnchor="middle">Stump</text>

      {/* Spit & Beach Deposit */}
      <path d="M 680,240 Q 730,240 760,270 L 800,270 L 800,360 L 680,360 Z" fill="#d97706" opacity="0.7" />
      <text x="740" y="255" fill="#fbbf24" fontSize="11" textAnchor="middle">Sand Spit & Lagoon</text>

      {/* Dynamic Sea Level and Animated Waves */}
      <rect x="0" y={230 - seaLevel * 0.3} width="800" height={130 + seaLevel * 0.3} fill="url(#seaGrad)" opacity="0.7" />
      <path d={`M 0,${230 - seaLevel * 0.3} Q 100,${220 - waveEnergy} 200,${230 - seaLevel * 0.3} T 400,${230 - seaLevel * 0.3} T 600,${230 - seaLevel * 0.3} T 800,${230 - seaLevel * 0.3}`} fill="none" stroke="#38bdf8" strokeWidth="3" />

      {/* Title */}
      <text x="20" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold">Coastal Marine Scour & Stack Retreat</text>
      <text x="780" y="30" fill="#94a3b8" fontSize="12" textAnchor="end">
        Wave Hydraulic Energy: {waveEnergy} kW/m | Sea Level: {seaLevel}m
      </text>
    </svg>
  );
};

// Arid Desert SVG Component
const AridDesertSVG: React.FC<{ windSpeed: number; sandSupply: number }> = ({ windSpeed, sandSupply }) => {
  return (
    <svg viewBox="0 0 800 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="duneGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>

      {/* Desert Floor / Deflation Plain */}
      <rect x="0" y="260" width="800" height="100" fill="#78350f" />

      {/* Wind Arrow Indicators */}
      <path d="M 30,80 L 120,80 M 100,70 L 120,80 L 100,90" fill="none" stroke="#38bdf8" strokeWidth="3" />
      <text x="75" y="60" fill="#38bdf8" fontSize="12" fontWeight="bold">Prevailing Wind ({windSpeed} km/h)</text>

      {/* Mushroom Rock (Pedestal Rock) */}
      <path d="M 180,160 Q 230,160 210,210 Q 195,230 195,260 L 165,260 Q 165,230 150,210 Q 130,160 180,160 Z" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
      <text x="180" y="145" fill="#fbbf24" fontSize="11" textAnchor="middle" fontWeight="bold">Mushroom Rock</text>
      <text x="240" y="235" fill="#fca5a5" fontSize="10">Under-cutting by sand abrasion (&lt;2m)</text>

      {/* Barchan Crescent Sand Dune */}
      <path d={`M 320,260 Q 390,${260 - sandSupply * 1.5} 460,260 C 440,240 370,240 320,260 Z`} fill="url(#duneGrad)" stroke="#f59e0b" strokeWidth="2" />
      <text x="390" y="220" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">Barchan Dune</text>
      <text x="440" y="275" fill="#fef08a" fontSize="10">Horns point downwind</text>

      {/* Yardang Streamlined Bedrock Ridge */}
      <path d="M 520,260 Q 560,180 620,260 Z" fill="#92400e" stroke="#d97706" strokeWidth="2" />
      <text x="570" y="170" fill="#e2e8f0" fontSize="11" textAnchor="middle">Yardang Ridge</text>

      {/* Deflation Hollow / Blowout */}
      <path d="M 660,260 Q 720,310 780,260 Z" fill="#451a03" stroke="#f59e0b" strokeDasharray="3,3" />
      <text x="720" y="325" fill="#fca5a5" fontSize="11" textAnchor="middle">Deflation Hollow (Blowout)</text>

      {/* Salt Playa / Alkali Flat in distance */}
      <rect x="670" y="255" width="100" height="6" fill="#f8fafc" opacity="0.9" />
      <text x="720" y="250" fill="#f8fafc" fontSize="10" textAnchor="middle">Alkali Salt Flat</text>

      {/* Title */}
      <text x="20" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold">Eolian Abrasion, Deflation & Dune Dynamics</text>
      <text x="780" y="30" fill="#94a3b8" fontSize="12" textAnchor="end">
        Wind Velocity: {windSpeed} km/h | Sand Availability: {sandSupply}%
      </text>
    </svg>
  );
};

// ==========================================
// 6. MAIN COMPONENT IMPLEMENTATION
// ==========================================
export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeID;
}

export const C11_GeoLandformsEvolutionCBSESim: React.FC<SimProps> = ({
  onComplete,
  initialNodeId = NODE_VARS.RUNNING_WATER,
}) => {
  // --- Navigation & State ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // --- Interactive Simulation Parameters ---
  // Fluvial Lab
  const [fluvialStage, setFluvialStage] = useState<number>(0); // 0=Youth, 1=Mature, 2=Old
  const [fluvialDischarge, setFluvialDischarge] = useState<number>(45);
  const [fluvialGradient, setFluvialGradient] = useState<number>(25);

  // Karst Lab
  const [karstAcid, setKarstAcid] = useState<number>(65);
  const [karstPurity, setKarstPurity] = useState<number>(85);

  // Glacial Lab
  const [glacierThickness, setGlacierThickness] = useState<number>(120);
  const [glacierAblation, setGlacierAblation] = useState<number>(350);

  // Coastal Lab
  const [coastalWaveEnergy, setCoastalWaveEnergy] = useState<number>(70);
  const [coastalSeaLevel, setCoastalSeaLevel] = useState<number>(10);

  // Arid Lab
  const [aridWindSpeed, setAridWindSpeed] = useState<number>(55);
  const [aridSandSupply, setAridSandSupply] = useState<number>(60);

  // --- Gamification & Assessment State ---
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Discovery / Interactive Question States
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // UI Feedback Overlay States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');

  // Diagnostic / Misconception modal state
  const [activeMisconception, setActiveMisconception] = useState<number | null>(null);

  // BKT & SRS Tracking States
  const [bktState, setBktState] = useState<BKTState>(() => createBKTState());
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>({});

  // Timer Ref for Auto Hinting
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound and Voice Utility Trigger
  const triggerAudio = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch {
      // Audio fallback silent guard
    }
  }, []);

  const triggerSpeech = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Speech fallback
    }
  }, []);

  // Inactivity Auto-Hint System
  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[currentChallengeIdx];
      if (currentCh && activeTab === 'challenges') {
        setHintText(`Hint: ${currentCh.hints[0]}`);
        setShowHint(true);
        triggerAudio('hint');
      }
    }, 12000);
  }, [currentChallengeIdx, activeTab, triggerAudio]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, activeTab, resetInactivityTimer]);

  // Current Challenge Data
  const currentCh = CHALLENGES[currentChallengeIdx];

  // --- Handlers ---
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      triggerAudio('celebration');
      triggerSpeech("Excellent deduction! River gradients dictate the kinetic energy available for vertical vs lateral erosion.");
      setShowSparkle(true);
    } else {
      triggerAudio('error');
      triggerSpeech("Not quite. Consider how slope gradient affects energy distribution.");
    }
  };

  const handlePredictionSubmit = (pIdx: number, oIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [pIdx]: oIdx }));
    const q = PREDICTION_QUESTIONS[pIdx];
    if (oIdx === q.correctIndex) {
      triggerAudio('success');
      triggerSpeech("Correct prediction!");
    } else {
      triggerAudio('error');
    }
  };

  const handleObservationSubmit = (oIdx: number, optIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
    const q = OBSERVATION_QUESTIONS[oIdx];
    if (optIdx === q.correctIndex) {
      triggerAudio('drop-correct');
    } else {
      triggerAudio('drop-wrong');
    }
  };

  const handleChallengeAnswer = (optionIdx: number) => {
    resetInactivityTimer();
    setSelectedOption(optionIdx);
    const isCorrect = optionIdx === currentCh.correctIndex;

    // Update User Answer Record
    setUserAnswers(prev => ({ ...prev, [currentCh.id]: optionIdx }));

    // BKT & SRS Calculations
    const newBKT = bktUpdate(bktState, isCorrect);
    setBktState(newBKT);

    const existingSRS = srsItems[currentCh.id] || createReviewItem(currentCh.id);
    const updatedSRS = sm2Update(existingSRS, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [currentCh.id]: updatedSRS }));

    if (isCorrect) {
      triggerAudio('success');
      setShowSuccess(true);
      setShowSparkle(true);
      setScore(prev => prev + (currentCh.difficulty === 'advanced' ? 15 : currentCh.difficulty === 'standard' ? 10 : 5));
      setCompletedChallenges(prev => new Set(prev).add(currentCh.id));
      triggerSpeech("Correct response! Well analyzed.");
      setTimeout(() => setShowSuccess(false), 2000);
    } else {
      triggerAudio('error');
      if (currentCh.misconceptionIndex !== undefined) {
        setActiveMisconception(currentCh.misconceptionIndex);
      }
      triggerSpeech("That is incorrect. Review the hint and try again.");
    }
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx(prev => prev + 1);
      triggerAudio('whoosh');
    } else {
      // Completed all challenges
      triggerAudio('celebration');
      setShowConfetti(true);
      recordGameScore('c11_geo_landforms_evolution', score);
      if (onComplete) onComplete(score);
      setActiveTab('summary');
    }
  };

  const prevChallenge = () => {
    setSelectedOption(null);
    setShowHint(false);
    if (currentChallengeIdx > 0) {
      setCurrentChallengeIdx(prev => prev - 1);
      triggerAudio('whoosh');
    }
  };

  // Mastery percentage calculation
  const masteryLevel = useMemo(() => {
    return Math.round(masteryProb(bktState) * 100);
  }, [bktState]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* ================= HEADER SECTION ================= */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-gold-600/30 border border-gold-500 text-gold-400 text-xs font-semibold rounded-full uppercase tracking-wider">
              Class 11 ISC Geography
            </span>
            <span className="text-slate-400 text-xs font-mono">
              Nodes: {ALL_NODE_IDS.length} Topics Covered
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Landforms and Their Evolution
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Interactive Multi-Agent Geomorphic Simulation & Diagnostic Lab
          </p>
        </div>

        {/* Dynamic Mastery Bar */}
        <div className="w-full md:w-72 bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs text-slate-300 font-medium">
            <span>BKT Mastery Index:</span>
            <span className="text-gold-400 font-bold">{masteryLevel}%</span>
          </div>
          <div className="w-full bg-slate-700 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-gold-500 to-gold-500 h-full transition-all duration-500"
              style={{ width: `${masteryLevel}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
            <span>Score: <strong className="text-amber-400">{score} pts</strong></span>
            <span>Completed: <strong className="text-emerald-400">{completedChallenges.size}/{CHALLENGES.length}</strong></span>
          </div>
        </div>
      </header>

      {/* ================= NAVIGATION TABS ================= */}
      <nav className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-8 border-b border-slate-800 pb-4">
        {[
          { id: 'discovery', label: '1. Discovery & Scenario' },
          { id: 'lab', label: '2. Interactive Geomorphic Labs' },
          { id: 'challenges', label: '3. Diagnostic Challenges' },
          { id: 'summary', label: '4. Summary & Field Report' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              triggerAudio('tap');
            }}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ================= TAB 1: DISCOVERY & SCENARIO ================= */}
      {activeTab === 'discovery' && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Scenario Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-gold-400 mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{SCENARIO.context}</p>
          </div>

          {/* Discovery Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold rounded">
                Discovery Challenge
              </span>
              <h3 className="text-lg font-semibold text-white">Preconception Inquiry</h3>
            </div>
            <p className="text-slate-200 text-base mb-6">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    discoverySelected === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500 text-rose-200'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {discoverySubmitted && (
              <div className={`p-4 rounded-xl border ${
                discoverySelected === DISCOVERY_QUESTION.correctIndex
                  ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300'
                  : 'bg-amber-900/30 border-amber-500/50 text-amber-300'
              }`}>
                <strong className="block font-semibold mb-1">Key Insight:</strong>
                <p className="text-sm">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* Prediction Questions Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Hypothesis Testing & Predictions</h3>
            <div className="space-y-8">
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6">
                  <p className="text-slate-200 text-sm md:text-base font-medium mb-4">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                        className={`p-3 rounded-lg text-left text-xs md:text-sm border transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/50 border-rose-500 text-rose-200'
                            : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gold-400 italic">Instruction: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: INTERACTIVE LABS ================= */}
      {activeTab === 'lab' && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Lab Selection Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  triggerAudio('tap');
                }}
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  activeLabIndex === idx
                    ? 'bg-gold-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Active Lab Display */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h2>
              <p className="text-slate-400 text-sm mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
            </div>

            {/* LAB 1: FLUVIAL */}
            {activeLabIndex === 0 && (
              <div className="space-y-6">
                <FluvialProfileSVG stage={fluvialStage} discharge={fluvialDischarge} gradient={fluvialGradient} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Cycle Stage</label>
                    <div className="flex gap-2">
                      {['Youth', 'Mature', 'Old'].map((stName, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => {
                            setFluvialStage(sIdx);
                            triggerAudio('pop');
                          }}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold border ${
                            fluvialStage === sIdx
                              ? 'bg-gold-600 border-gold-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {stName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      River Stream Discharge: <span className="text-gold-400">{fluvialDischarge} m³/s</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={fluvialDischarge}
                      onChange={e => setFluvialDischarge(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Slope Gradient: <span className="text-gold-400">{fluvialGradient}°</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="45"
                      value={fluvialGradient}
                      onChange={e => setFluvialGradient(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: KARST */}
            {activeLabIndex === 1 && (
              <div className="space-y-6">
                <KarstTopographySVG acidLevel={karstAcid} limestonePurity={karstPurity} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      $H_2CO_3$ Acid Intensity: <span className="text-purple-400">{karstAcid}%</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={karstAcid}
                      onChange={e => setKarstAcid(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Limestone Bedrock Purity: <span className="text-purple-400">{karstPurity}%</span>
                    </label>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={karstPurity}
                      onChange={e => setKarstPurity(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: GLACIAL */}
            {activeLabIndex === 2 && (
              <div className="space-y-6">
                <GlacialLandscapeSVG iceThickness={glacierThickness} ablationRate={glacierAblation} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Glacial Ice Thickness: <span className="text-gold-400">{glacierThickness} meters</span>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="300"
                      value={glacierThickness}
                      onChange={e => setGlacierThickness(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Summer Melt / Ablation Rate: <span className="text-gold-400">{glacierAblation} mm/yr</span>
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="800"
                      value={glacierAblation}
                      onChange={e => setGlacierAblation(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: COASTAL */}
            {activeLabIndex === 3 && (
              <div className="space-y-6">
                <CoastalErosionSVG waveEnergy={coastalWaveEnergy} seaLevel={coastalSeaLevel} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Wave Hydraulic Force: <span className="text-gold-400">{coastalWaveEnergy} kW/m</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="120"
                      value={coastalWaveEnergy}
                      onChange={e => setCoastalWaveEnergy(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Relative Sea Level Elevation: <span className="text-gold-400">{coastalSeaLevel} meters</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={coastalSeaLevel}
                      onChange={e => setCoastalSeaLevel(Number(e.target.value))}
                      className="w-full accent-gold-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: ARID */}
            {activeLabIndex === 4 && (
              <div className="space-y-6">
                <AridDesertSVG windSpeed={aridWindSpeed} sandSupply={aridSandSupply} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Prevailing Wind Velocity: <span className="text-amber-400">{aridWindSpeed} km/h</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="110"
                      value={aridWindSpeed}
                      onChange={e => setAridWindSpeed(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Sand Sediment Volume: <span className="text-amber-400">{aridSandSupply}%</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={aridSandSupply}
                      onChange={e => setAridSandSupply(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Observation Questions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Lab Observation Checks</h3>
            <div className="space-y-6">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-800/40 border border-slate-700/60 rounded-xl p-6">
                  <p className="text-slate-200 text-sm md:text-base font-medium mb-4">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleObservationSubmit(oIdx, optIdx)}
                        className={`p-3 rounded-lg text-left text-xs md:text-sm border transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/50 border-rose-500 text-rose-200'
                            : 'bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-300'
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

      {/* ================= TAB 3: DIAGNOSTIC CHALLENGES ================= */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Challenge Navigation & Progress */}
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <button
              onClick={prevChallenge}
              disabled={currentChallengeIdx === 0}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 disabled:opacity-40 hover:bg-slate-700 text-xs font-semibold"
            >
              ← Previous
            </button>
            <span className="text-slate-300 text-xs md:text-sm font-bold">
              Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
            </span>
            <button
              onClick={nextChallenge}
              className="px-4 py-2 rounded-lg bg-gold-600 text-white hover:bg-gold-500 text-xs font-semibold shadow"
            >
              {currentChallengeIdx === CHALLENGES.length - 1 ? 'Finish & Summary →' : 'Next Challenge →'}
            </button>
          </div>

          {/* Current Challenge Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl relative">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex gap-2">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded uppercase ${
                  currentCh.difficulty === 'foundation'
                    ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                    : currentCh.difficulty === 'standard'
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400'
                    : 'bg-rose-500/20 border border-rose-500/40 text-rose-400'
                }`}>
                  {currentCh.difficulty}
                </span>
                <span className="px-2.5 py-0.5 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono rounded">
                  {currentCh.competencyLevel}
                </span>
              </div>
              <span className="text-slate-400 text-xs font-mono">Node: {currentCh.nodeId}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-snug">
              {currentCh.question}
            </h3>

            {/* Options List */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {currentCh.options.map((option, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleChallengeAnswer(oIdx)}
                  className={`p-4 rounded-xl text-left border transition-all ${
                    selectedOption === oIdx
                      ? oIdx === currentCh.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                        : 'bg-rose-950/70 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/40'
                      : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-200 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="text-sm md:text-base">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation box on answer selection */}
            {selectedOption !== null && (
              <div className={`p-4 rounded-xl border ${
                selectedOption === currentCh.correctIndex
                  ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-900/30 border-rose-500/50 text-rose-300'
              }`}>
                <strong className="block font-bold mb-1">Explanation:</strong>
                <p className="text-sm leading-relaxed">{currentCh.explanation}</p>
              </div>
            )}
          </div>

          {/* Misconception Diagnostic Overlay Card if triggered */}
          {activeMisconception !== null && (
            <div className="bg-amber-950/40 border border-amber-500/60 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-amber-400 font-bold text-base flex items-center gap-2">
                  ⚠️ Misconception Alert: {MISCONCEPTIONS[activeMisconception].title}
                </h4>
                <button
                  onClick={() => setActiveMisconception(null)}
                  className="text-xs text-amber-300 hover:text-white underline"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-slate-300 text-sm mb-3">
                <strong className="text-rose-400">Common Pitfall: </strong>
                {MISCONCEPTIONS[activeMisconception].misconception}
              </p>
              <p className="text-emerald-300 text-sm">
                <strong className="text-emerald-400">Scientific Correction: </strong>
                {MISCONCEPTIONS[activeMisconception].correction}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 4: SUMMARY & FIELD REPORT ================= */}
      {activeTab === 'summary' && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Performance Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-center">
            <h2 className="text-2xl font-extrabold text-white mb-2">Geomorphic Simulation Field Report</h2>
            <p className="text-slate-400 text-sm mb-6">Class 11 ISC Geography Chapter Performance Record</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl">
                <span className="block text-slate-400 text-xs uppercase font-semibold">Total Points Earned</span>
                <span className="text-3xl font-black text-amber-400 mt-2 block">{score}</span>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl">
                <span className="block text-slate-400 text-xs uppercase font-semibold">BKT Mastery Score</span>
                <span className="text-3xl font-black text-gold-400 mt-2 block">{masteryLevel}%</span>
              </div>

              <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-xl">
                <span className="block text-slate-400 text-xs uppercase font-semibold">Challenges Solved</span>
                <span className="text-3xl font-black text-emerald-400 mt-2 block">{completedChallenges.size} / {CHALLENGES.length}</span>
              </div>
            </div>
          </div>

          {/* Real-World Activity Render */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-gold-400 mb-3">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-4">
              {REAL_WORLD_ACTIVITY.steps.map((stepText, stIdx) => (
                <div key={stIdx} className="flex items-start gap-4 bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                  <span className="w-8 h-8 rounded-full bg-gold-600/30 text-gold-400 border border-gold-500/50 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {stIdx + 1}
                  </span>
                  <p className="text-slate-200 text-sm leading-relaxed mt-1">{stepText}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Question Bank Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6">Key Geomorphic Concept Review</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((dq) => (
                <div key={dq.id} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl space-y-2">
                  <span className="text-xs font-mono text-gold-400">{dq.nodeId}</span>
                  <p className="text-slate-200 text-xs md:text-sm font-semibold">{dq.question}</p>
                  <p className="text-emerald-400 text-xs font-medium">Answer: {dq.options[dq.correctIndex]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= MANDATORY FEEDBACK OVERLAYS ================= */}
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C11_GeoLandformsEvolutionCBSESim;