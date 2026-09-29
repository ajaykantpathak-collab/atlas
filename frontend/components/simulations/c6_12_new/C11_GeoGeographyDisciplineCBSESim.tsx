'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL 61 ISC / CBSE CLASS 11 GEOGRAPHY NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c11_geo_cbse_171', 'c11_geo_cbse_172', 'c11_geo_cbse_173', 'c11_geo_cbse_174', 'c11_geo_cbse_175',
  'c11_geo_cbse_176', 'c11_geo_cbse_177', 'c11_geo_cbse_178', 'c11_geo_cbse_179', 'c11_geo_cbse_180',
  'c11_geo_cbse_181', 'c11_geo_cbse_182', 'c11_geo_cbse_183', 'c11_geo_cbse_184', 'c11_geo_cbse_185',
  'c11_geo_cbse_186', 'c11_geo_cbse_187', 'c11_geo_cbse_188', 'c11_geo_cbse_189', 'c11_geo_cbse_190',
  'c11_geo_cbse_191', 'c11_geo_cbse_192', 'c11_geo_cbse_193', 'c11_geo_cbse_194', 'c11_geo_cbse_195',
  'c11_geo_cbse_196', 'c11_geo_cbse_197', 'c11_geo_cbse_198', 'c11_geo_cbse_199', 'c11_geo_cbse_200',
  'c11_geo_cbse_201', 'c11_geo_cbse_202', 'c11_geo_cbse_203', 'c11_geo_cbse_204', 'c11_geo_cbse_205',
  'c11_geo_cbse_206', 'c11_geo_cbse_207', 'c11_geo_cbse_208', 'c11_geo_cbse_209', 'c11_geo_cbse_210',
  'c11_geo_cbse_211', 'c11_geo_cbse_212', 'c11_geo_cbse_213', 'c11_geo_cbse_214', 'c11_geo_cbse_215',
  'c11_geo_cbse_216', 'c11_geo_cbse_217', 'c11_geo_cbse_218', 'c11_geo_cbse_219', 'c11_geo_cbse_220',
  'c11_geo_cbse_221', 'c11_geo_cbse_222', 'c11_geo_cbse_223', 'c11_geo_cbse_224', 'c11_geo_cbse_225',
  'c11_geo_cbse_226', 'c11_geo_cbse_227', 'c11_geo_cbse_228', 'c11_geo_cbse_229', 'c11_geo_cbse_230',
  'c11_geo_cbse_231'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'GeoSynthetics Analytical Laboratory & Spatial Command Centre',
  intro: 'Welcome to the GeoSynthetics Command Centre, where you will act as a Chief Geo-Spatial Scientist. Geography is not merely memorising maps and capital cities; it is an integrative, spatial science that connects natural dynamics with human civilization.',
  context: 'You will investigate how spatial attributes, temporal dynamics, physical-human interrelationships, and modern geo-informatics (GIS, Remote Sensing, GPS) synthesize knowledge across natural and social sciences to solve real-world territorial challenges.',
};

// ==========================================
// SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why is Geography defined as an "Integrating Discipline" rather than a standalone physical or social science?',
  options: [
    'Because it combines map drawing with simple memorisation of state boundaries.',
    'Because it synthesises data across space and time from both natural sciences (Geology, Meteorology, Hydrology) and social sciences (Economics, History, Demography).',
    'Because it only focuses on weather forecasting and rock formation processes.',
    'Because Eratosthenes intended geography to replace all other natural sciences.'
  ],
  correctIndex: 1,
  hintAfter: 'Geography bridges the physical world and human societies through spatial organization and cause-effect syntheses across time.'
};

// ==========================================
// SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Multi-Disciplinary Synthesis Matrix',
    instruction: 'Select natural and social science inputs to observe how Geography acts as an interface discipline bridging Earth systems and human society.',
    interactionType: 'discipline-matrix',
    nodeId: 'c11_geo_cbse_173'
  },
  {
    title: 'Lab 2: The Three Fundamental Geographic Questions',
    instruction: 'Explore a dynamic territory by switching between "WHAT" (features), "WHERE" (spatial pattern), and "WHY" (cause-effect relationships).',
    interactionType: 'three-questions',
    nodeId: 'c11_geo_cbse_186'
  },
  {
    title: 'Lab 3: GIS Layer & Remote Sensing Spectral Analysis',
    instruction: 'Toggle elevation, hydrology, soil, and human settlement layers in the GIS visualizer to analyze spatial integration and raster overlay.',
    interactionType: 'gis-spectral',
    nodeId: 'c11_geo_cbse_211'
  },
  {
    title: 'Lab 4: Physical-Human Interaction Dynamics & Dualism',
    instruction: 'Adjust environmental constraints (climate, topography) and human technological levels to observe "Naturalised Humans" vs "Humanised Nature".',
    interactionType: 'human-nature',
    nodeId: 'c11_geo_cbse_190'
  },
  {
    title: 'Lab 5: Systematic vs. Regional Methodological Simulator',
    instruction: 'Compare the Systematic (topical) approach vs the Regional (areal synthesis) approach across global geographic phenomena.',
    interactionType: 'systematic-regional',
    nodeId: 'c11_geo_cbse_179'
  }
];

// ==========================================
// SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If human technological capability increases significantly while residing in an arid desert environment, how does the nature-human relationship transform?',
    options: [
      'It moves from "Environmental Determinism" (Naturalised Human) towards "Possibilism" (Humanised Nature).',
      'It completely eliminates physical geographical factors like solar radiation and slope.',
      'It reverts human society to primitive environmental dependence.',
      'It stops the passage of time as a 4th dimension in spatial analysis.'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4, set Technological Capability to HIGH and observe how humans adapt desert ecosystems through canal irrigation, solar farming, and climate-controlled urban design.',
    nodeId: 'c11_geo_cbse_190'
  },
  {
    question: 'Predict: When analyzing the spatial distribution of tea plantations in Assam using geographic methods, which question provides the deepest scientific explanation?',
    options: [
      'Asking "WHAT is tea?"',
      'Asking "WHERE is Assam located?"',
      'Asking "WHY do tea plantations flourish specifically on well-drained slopes under warm humid monsoon conditions?"',
      'Asking "HOW many tea brands exist globally?"'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 2, activate the "WHY" filter on slope and rainfall datasets to see cause-effect relationships visualized.',
    nodeId: 'c11_geo_cbse_186'
  }
];

// ==========================================
// SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when overlaying the Hydrology GIS layer directly onto the Settlement Pattern vector layer?',
    observableOptions: [
      'Human settlements show random distribution unaffected by water sources.',
      'Human settlements exhibit strong linear and clustered spatial alignment along river channels and water bodies.',
      'River channels shift automatically to follow highway road grids.',
      'Soil fertility drops to zero near all permanent river courses.'
    ],
    correctIndex: 1,
    nodeId: 'c11_geo_cbse_211'
  },
  {
    question: 'What happens when comparing a Systematic geographic study of World Forests with a Regional geographic study of the Amazon Basin?',
    observableOptions: [
      'Systematic geography examines forest types globally based on climate zones, whereas Regional geography synthesizes all natural and human phenomena within the Amazon territory.',
      'Systematic geography only studies Amazon trees, while Regional geography studies all trees on Earth.',
      'Regional geography ignores soil and climate, focusing only on political boundaries.',
      'Systematic geography is historical, whereas Regional geography strictly uses Remote Sensing.'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_179'
  }
];

// ==========================================
// SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Disaster Risk & Spatial Planning Synthesis for Uttarakhand River Basins',
  description: 'Apply multi-disciplinary geographic tools (GIS, Remote Sensing, Geomorphology, Hydrology, and Human Geography) to mitigate flash floods and landslide hazards in a Himalayan river basin.',
  steps: [
    'Step 1: Overlay Geomorphological slope vectors with Satellite Multispectral imagery to identify fragile rock structures and high-risk landslide zones.',
    'Step 2: Synthesize Hydrological rainfall data (Climatology) with contour maps to calculate peak run-off coefficients during Cloudburst events.',
    'Step 3: Analyze Human Settlement vectors (Demography & Economic Geography) to pinpoint vulnerable populations occupying floodplains.',
    'Step 4: Formulate an integrated Regional Spatial Plan featuring structural zoning buffers, early-warning GPS monitoring networks, and sustainable eco-tourism pathways.'
  ]
};

// ==========================================
// SECTION 7: MISCONCEPTIONS
// ==========================================
interface Misconception {
  id: string;
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc-1',
    title: 'Geography as Static Map Memorisation',
    misconception: 'Geography is just memorising names of places, rivers, capitals, and drawing maps.',
    correction: 'Geography is a dynamic spatial science that investigates space, spatial patterns, cause-effect relationships, and how phenomena change over time.',
    nodeId: 'c11_geo_cbse_171'
  },
  {
    id: 'misc-2',
    title: 'Physical vs Human Geography Separation',
    misconception: 'Physical Geography and Human Geography are completely isolated subjects with no overlap.',
    correction: 'They interact continuously through Biogeography, Environmental Geography, and spatial integration; nature shapes human choices while humans modify natural landscapes.',
    nodeId: 'c11_geo_cbse_198'
  },
  {
    id: 'misc-3',
    title: 'Geography lacks scientific cause-and-effect rigor',
    misconception: 'Geography only answers "What" and "Where" without explaining "Why".',
    correction: 'Geography relies heavily on explaining "WHY" spatial distributions occur, using cause-and-effect laws, empirical data, and quantitative modelling.',
    nodeId: 'c11_geo_cbse_184'
  },
  {
    id: 'misc-4',
    title: 'Determinism vs Possibilism Absolutism',
    misconception: 'Nature completely dictates human actions (Determinism), OR humans have absolute freedom over nature (Possibilism).',
    correction: 'Modern geography views the interaction as dynamic equilibrium (Neodeterminism / Stop-and-Go Determinism), where human possibilities exist within ecological parameters.',
    nodeId: 'c11_geo_cbse_190'
  },
  {
    id: 'misc-5',
    title: 'GIS and Remote Sensing are separate disciplines from Geography',
    misconception: 'GIS, Remote Sensing, and Cartography are standalone IT fields unrelated to core geography.',
    correction: 'Geo-informatics and quantitative techniques are fundamental technical methods within Geography used to store, analyze, and visualize spatial data.',
    nodeId: 'c11_geo_cbse_211'
  },
  {
    id: 'misc-6',
    title: 'Time is irrelevant in Spatial Geography',
    misconception: 'Geography only deals with spatial location at a single frozen moment in time.',
    correction: 'Time is recognized as the 4th dimension in Geography because landforms, climates, ecosystems, and human landscapes evolve dynamically over time.',
    nodeId: 'c11_geo_cbse_194'
  }
];

// ==========================================
// SECTION 8: DIAGNOSTIC QUESTIONS
// ==========================================
interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: NodeId;
}

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    question: 'Who coined the term "Geography" from the Greek roots "Geo" (Earth) and "Graphein" (to write/describe)?',
    options: ['Aristotle', 'Eratosthenes', 'Alexander von Humboldt', 'Carl Ritter'],
    correctIndex: 1,
    explanation: 'Eratosthenes (276–194 BC), a Greek scholar, first coined the term "Geography" meaning description of the Earth.',
    nodeId: 'c11_geo_cbse_174'
  },
  {
    id: 'diag-2',
    question: 'Which scholar defined Geography as "the study of areal differentiation"?',
    options: ['Richard Hartshorne', 'Alfred Hettner', 'Immanuel Kant', 'Vidal de la Blache'],
    correctIndex: 0,
    explanation: 'Richard Hartshorne defined geography as providing an accurate, orderly, and rational description and interpretation of the variable character of the Earth surface (areal differentiation).',
    nodeId: 'c11_geo_cbse_178'
  },
  {
    id: 'diag-3',
    question: 'Which branch of Physical Geography studies landforms, their origin, processes, and evolution?',
    options: ['Climatology', 'Oceanography', 'Geomorphology', 'Pedology'],
    correctIndex: 2,
    explanation: 'Geomorphology is devoted to the study of landforms, their relief features, genesis, and evolutionary processes.',
    nodeId: 'c11_geo_cbse_185'
  },
  {
    id: 'diag-4',
    question: 'What are the three fundamental questions answered by Geography?',
    options: [
      'What, Where, and Why',
      'How much, When, and Who',
      'Latitude, Longitude, and Altitude',
      'Physical, Human, and Biological'
    ],
    correctIndex: 0,
    explanation: 'Geography answers: (1) WHAT (identification of features), (2) WHERE (locational distribution), and (3) WHY (explanation of spatial patterns/cause-effect).',
    nodeId: 'c11_geo_cbse_186'
  },
  {
    id: 'diag-5',
    question: 'The systematic approach in Geography was developed by which pioneer scientist?',
    options: ['Carl Ritter', 'Alexander von Humboldt', 'Paul Vidal de la Blache', 'Ellen Churchill Semple'],
    correctIndex: 1,
    explanation: 'Systematic geography (topical approach) was introduced by Alexander von Humboldt, while Regional geography was developed by Carl Ritter.',
    nodeId: 'c11_geo_cbse_179'
  },
  {
    id: 'diag-6',
    question: 'Biogeography functions as an interface discipline between Physical Geography and which natural science branch?',
    options: ['Economics & Demography', 'Biology (Botany, Zoology & Ecology)', 'Astrophysics', 'Geophysics'],
    correctIndex: 1,
    explanation: 'Biogeography emerges at the interface of physical geography and biological sciences (botany, zoology, ecology).',
    nodeId: 'c11_geo_cbse_208'
  },
  {
    id: 'diag-7',
    question: 'What spatial technology captures electromagnetic radiation reflected/emitted from Earth surface features without physical contact?',
    options: ['Global Positioning System (GPS)', 'Remote Sensing', 'Topographical Surveying', 'Barometric Altimetry'],
    correctIndex: 1,
    explanation: 'Remote Sensing involves acquiring information about objects or areas from a distance, typically from satellites or aircraft using sensors.',
    nodeId: 'c11_geo_cbse_213'
  },
  {
    id: 'diag-8',
    question: 'Why is Time considered the 4th dimension in Geographic analysis?',
    options: [
      'Because spatial distributions change over temporal scales, making landscapes dynamic historical syntheses.',
      'Because maps can only be drawn during daytime hours.',
      'Because time zones are determined solely by administrative decisions.',
      'Because GIS software cannot function without a system clock.'
    ],
    correctIndex: 0,
    explanation: 'Space and time are intrinsically linked; spatial patterns are snapshot stages of dynamic evolutionary processes occurring over temporal dimensions.',
    nodeId: 'c11_geo_cbse_194'
  }
];

// ==========================================
// SECTION 9: CHALLENGES (22+ items across 3 tiers)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'matching' | 'ordering' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: boolean;
  matchPairs?: { left: string; right: string }[];
  orderItems?: string[];
  correctOrder?: number[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal-1',
    nodeId: 'c11_geo_cbse_174',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the literal translation of the Greek components of the word "Geography" (Geo + Graphein)?',
    options: ['Study of Rocks', 'Description of the Earth', 'Mapping of Rivers', 'Measurement of Stars'],
    correctIndex: 1,
    explanation: 'The word originates from Greek: "Geo" means Earth and "Graphein" means to write or describe.',
    hints: ['Think of what "Geo" means in geology.', '"Graphein" relates to writing or drawing.', 'It means describing our planet Earth.'],
    misconceptionIndex: 0
  },
  {
    id: 'chal-2',
    nodeId: 'c11_geo_cbse_185',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which sub-discipline of Physical Geography focuses on atmospheric conditions, weather, and climate patterns?',
    options: ['Geomorphology', 'Pedology', 'Climatology', 'Hydrology'],
    correctIndex: 2,
    explanation: 'Climatology studies structure of atmosphere, weather dynamics, climatic regions, and long-term trends.',
    hints: ['Focus on climate and weather.', 'Atmosphere is the main domain.', 'Root word is "Climate".']
  },
  {
    id: 'chal-3',
    nodeId: 'c11_geo_cbse_189',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Soil Geography (Pedology) is primarily concerned with studying which of the following?',
    options: ['Ocean trenches and bathymetry', 'Processes of soil formation, soil types, fertility, and distribution', 'Urban population migration', 'Tectonic plate movement'],
    correctIndex: 1,
    explanation: 'Pedology is the science of soils, covering pedogenesis, soil profiles, classification, and spatial distribution.',
    hints: ['"Pedo" refers to soil/ground.', 'Think about agricultural growth medium.', 'It deals with soil profiles and formation.']
  },
  {
    id: 'chal-4',
    nodeId: 'c11_geo_cbse_195',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which branch of Human Geography investigates economic activities like agriculture, industry, trade, and transport?',
    options: ['Social Geography', 'Political Geography', 'Economic Geography', 'Population Geography'],
    correctIndex: 2,
    explanation: 'Economic Geography analyzes spatial aspects of production, distribution, consumption, and resource utilization.',
    hints: ['Deals with trade and industries.', 'Focuses on economic livelihood.', 'Named after economic activities.']
  },
  {
    id: 'chal-5',
    nodeId: 'c11_geo_cbse_199',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The spatial arrangement of rural villages and urban cities falls under which specialized branch?',
    options: ['Settlement Geography', 'Geomorphology', 'Oceanography', 'Biogeography'],
    correctIndex: 0,
    explanation: 'Settlement Geography studies rural and urban human habitations, their morphology, spacing, and development.',
    hints: ['Relates to where people build habitats.', 'Covers rural and urban housing patterns.', 'Settlement is the keyword.']
  },
  {
    id: 'chal-6',
    nodeId: 'c11_geo_cbse_210',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What does the acronym GPS stand for in modern Geo-informatics?',
    options: ['Geographic Position Charting System', 'Global Positioning System', 'General Physical Soil Probe', 'Geodemographic Public Survey'],
    correctIndex: 1,
    explanation: 'GPS stands for Global Positioning System, a satellite-based navigation system giving precise spatial location.',
    hints: ['Global satellite navigation.', 'Positioning on earth.', 'Global Positioning System.']
  },
  {
    id: 'chal-7',
    nodeId: 'c11_geo_cbse_215',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Cartography is best defined as which technique in Geography?',
    options: ['The art and science of map making and spatial visualization', 'The drilling of deep geothermal boreholes', 'The census measurement of birth rates', 'The study of fossilized plants'],
    correctIndex: 0,
    explanation: 'Cartography is the specialized discipline concerned with the creation, design, and analysis of maps.',
    hints: ['Related to maps.', 'Visualizing spatial data.', 'Art and science of map making.']
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal-8',
    nodeId: 'c11_geo_cbse_179',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the Systematic Approach differ fundamentally from the Regional Approach in Geography?',
    options: [
      'Systematic studies one specific geographic phenomenon globally, while Regional synthesizes all geographic phenomena within a defined spatial territory.',
      'Systematic studies only human elements, while Regional studies only physical elements.',
      'Systematic approach uses no maps, while Regional uses only satellite imagery.',
      'Systematic approach was founded by Carl Ritter, while Regional was created by Eratosthenes.'
    ],
    correctIndex: 0,
    explanation: 'Systematic approach (Humboldt) studies a single topic (e.g., climate) worldwide. Regional approach (Ritter) studies all aspects within a specific spatial region.',
    hints: ['Systematic = Topical / phenomenon focused worldwide.', 'Regional = Area/Territory synthesis focused.', 'Humboldt vs Ritter methodology.']
  },
  {
    id: 'chal-9',
    nodeId: 'c11_geo_cbse_186',
    type: 'matching',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each fundamental Geographic Question with its core analytical focus:',
    matchPairs: [
      { left: '1. WHAT', right: 'Identification of physical/cultural features' },
      { left: '2. WHERE', right: 'Locational distribution & spatial arrangement' },
      { left: '3. WHY', right: 'Explanation of cause-effect relationships' }
    ],
    explanation: 'WHAT identifies the feature; WHERE locates it spatially; WHY provides the analytical scientific explanation.',
    hints: ['WHAT is descriptive.', 'WHERE is spatial location.', 'WHY is explanation.']
  },
  {
    id: 'chal-10',
    nodeId: 'c11_geo_cbse_190',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When human society develops technology to construct air-conditioned dome cities in hyper-arid deserts, this represents:',
    options: ['Environmental Determinism', 'Humanised Nature (Possibilism)', 'Pure Naturalism', 'Geomorphological equilibrium'],
    correctIndex: 1,
    explanation: 'As technology advances, humans modify natural constraints, creating a humanised nature (Possibilism).',
    hints: ['Humans overcoming natural constraints using technology.', 'Possibilism / Humanised Nature.', 'Modification of environment.'],
    misconceptionIndex: 3
  },
  {
    id: 'chal-11',
    nodeId: 'c11_geo_cbse_208',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Biogeography classified as an "Interface Discipline"?',
    options: [
      'It sits directly at the intersection of Physical Geography (soil, climate, landforms) and Biological Sciences (botany, zoology, ecology).',
      'It only studies computer software interface design.',
      'It separates economic geography from historical geography.',
      'It exclusively analyzes marine fish stocks in international waters.'
    ],
    correctIndex: 0,
    explanation: 'Biogeography bridges physical environments (abiotics) with living organisms (biotics), linking geography with biology.',
    hints: ['Bridges abiotic physical background with biotic life.', 'Combines geography and biology.', 'Interface between physical world and life sciences.']
  },
  {
    id: 'chal-12',
    nodeId: 'c11_geo_cbse_211',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In GIS (Geographic Information System), how are multi-layered spatial data combined to evaluate urban flood vulnerability?',
    options: [
      'By overlaying digital raster/vector layers (Elevation + Hydrology + Population Density + Drainage Capacity) in spatial coordinates.',
      'By converting all geographic maps into printed paper books.',
      'By measuring temperature with a traditional glass thermometer.',
      'By ignoring spatial coordinates and averaging global rainfall.'
    ],
    correctIndex: 0,
    explanation: 'GIS overlays thematic layers sharing a common georeferenced coordinate system to perform spatial analysis.',
    hints: ['Overlaying multiple thematic layers.', 'Spatial coordinates alignment.', 'Integrated spatial overlay analysis.']
  },
  {
    id: 'chal-13',
    nodeId: 'c11_geo_cbse_194',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does time act as the 4th dimension in physical geography process studies like river valley evolution?',
    options: [
      'Landforms change dynamically across temporal scales through erosion, transportation, and deposition stage cycles.',
      'Time causes river water to stop flowing in winter.',
      'Time is only used to set UTC clock standards.',
      'Physical processes happen instantaneous without temporal duration.'
    ],
    correctIndex: 0,
    explanation: 'Landforms undergo evolutionary development over geological time spans; present landforms are dynamic stages of past processes.',
    hints: ['Landforms evolve continuously over time.', 'Erosion and deposition take time.', 'Temporal evolution of landform stages.']
  },
  {
    id: 'chal-14',
    nodeId: 'c11_geo_cbse_202',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was the Quantitative Revolution in Geography during the 1950s-1960s?',
    options: [
      'A movement that introduced statistical models, mathematical laws, and computer spatial algorithms to make geography a rigorous spatial science.',
      'A revolution where geographers stopped using numbers completely.',
      'A political movement to redefine international sea boundaries.',
      'The invention of handmade globe models in ancient Greece.'
    ],
    correctIndex: 0,
    explanation: 'The Quantitative Revolution integrated mathematical modelling, hypotheses testing, and statistical techniques into geographic spatial analysis.',
    hints: ['Focus on mathematics and statistics in geography.', 'Precision spatial law formulation.', 'Quantitative statistical revolution.']
  },
  {
    id: 'chal-15',
    nodeId: 'c11_geo_cbse_222',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is Environmental Geography crucial for modern sustainable development policy?',
    options: [
      'It synthesizes spatial impacts of human resource consumption on physical ecosystems, identifying ecological tipping points.',
      'It focuses exclusively on tax rates for industrial manufacturing.',
      'It deals only with mapping ancient Roman military routes.',
      'It replaces the need for meteorology.'
    ],
    correctIndex: 0,
    explanation: 'Environmental Geography analyzes the feedback loops between human activity and physical environment, enabling sustainable management.',
    hints: ['Focuses on nature-human ecological sustainability.', 'Analyzes human impacts on natural ecosystems.', 'Environmental planning and sustainability.']
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'chal-16',
    nodeId: 'c11_geo_cbse_173',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate how Geography integrates Geology and Demography when assessing earthquake hazard risks in urban fault zones:',
    options: [
      'Geography uses Geology to understand fault lines and seismic waves, and Demography to assess population density and vulnerability, combining them into a spatial risk map.',
      'Geography ignores Geology and relies solely on historical population counts.',
      'Geography replaces Demography by moving all citizens outside fault zones permanently.',
      'Geography only uses weather satellite data for seismic fault lines.'
    ],
    correctIndex: 0,
    explanation: 'Geography acts as an integrating discipline by synthesizing physical geophysics (seismic vulnerability) with human demography (population exposure) across space.',
    hints: ['Geography synthesizes physical science (geology) + social science (demography).', 'Spatial risk overlay.', 'Integrated risk assessment map.']
  },
  {
    id: 'chal-17',
    nodeId: 'c11_geo_cbse_178',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does Alfred Hettner’s view of Geography as "Chorological Science" reinforce Richard Hartshorne’s concept of "Areal Differentiation"?',
    options: [
      'Both emphasize that Geography studies the unique character of different Earth areas by analyzing how diverse physical and cultural phenomena interact in space.',
      'Both claim that Earth surface is uniform and has no spatial differences.',
      'Hettner focused only on outer space astronomy while Hartshorne studied deep oceans.',
      'Both rejected spatial analysis in favor of pure economic statistics.'
    ],
    correctIndex: 0,
    explanation: 'Chorology (Hettner) and Areal Differentiation (Hartshorne) both establish that Geography is the science of spatial variation and regional synthesis.',
    hints: ['Chorology = study of regions/spaces.', 'Areal differentiation = variations across spaces.', 'Synthesis of spatial variation.']
  },
  {
    id: 'chal-18',
    nodeId: 'c11_geo_cbse_213',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A multispectral satellite remote sensor detects distinct Infrared reflectance signatures over a agricultural region. What does high Near-Infrared (NIR) reflectance indicate?',
    options: [
      'Healthy, dense chlorophyll-rich crop vegetation absorbing Red light and reflecting NIR strongly.',
      'Deep, clear water bodies free of sediment.',
      'Freshly paved dry asphalt roads.',
      'Thick snow and ice accumulation.'
    ],
    correctIndex: 0,
    explanation: 'Healthy green vegetation has high NIR reflectance due to leaf cellular structure, making multispectral satellite imagery critical for crop monitoring.',
    hints: ['Chlorophyll absorbs visible red and reflects NIR.', 'High NIR = healthy vegetation.', 'Used in NDVI vegetation index calculation.']
  },
  {
    id: 'chal-19',
    nodeId: 'c11_geo_cbse_228',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Dualism in Geography, why is the rigid dichotomy between Determinism and Possibilism considered outdated by modern geographers?',
    options: [
      'Because human actions are constrained by natural laws (e.g., ecological boundaries), but humans possess technological choices (Neodeterminism / Stop-and-Go Determinism).',
      'Because nature has completely submitted to total human control worldwide.',
      'Because physical laws no longer apply to modern industrialized nations.',
      'Because determinism was proven to be 100% correct in all scenarios.'
    ],
    correctIndex: 0,
    explanation: 'Griffith Taylor introduced Neo-determinism (Stop-and-Go Determinism), demonstrating that humans can alter rate of development, but cannot defy ultimate ecological parameters.',
    hints: ['Griffith Taylor concept.', 'Neo-determinism / Stop-and-Go determinism.', 'Balance between nature constraints and human choices.']
  },
  {
    id: 'chal-20',
    nodeId: 'c11_geo_cbse_217',
    type: 'ordering',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Arrange the historical evolutionary stages of Geographic Thought in chronological order:',
    orderItems: [
      'Classical Etymological & Exploratory Phase (Eratosthenes, Ptolemy)',
      'Dualism & Formal Systematic vs Regional Dichotomy (Humboldt & Ritter)',
      'Quantitative Revolution & Statistical Spatial Modelling (1950s-60s)',
      'Modern Geo-informatics, GIS, Remote Sensing & Earth System Science'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Geographic thought evolved from classical exploration to formal dualism, then quantitative modelling, and currently digital geo-informatics.',
    hints: ['Start with ancient Greek roots.', 'Then 19th-century German synthesis.', 'Then mid-20th quantitative revolution.', 'Finally 21st-century digital GIS.']
  },
  {
    id: 'chal-21',
    nodeId: 'c11_geo_cbse_231',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How has Physical Geography influenced the course of human history in mountain pass corridors like the Khyber Pass?',
    options: [
      'Geomorphological mountain gaps created strategic natural spatial gateways for trade, cultural diffusion, and military invasions throughout history.',
      'Mountain gaps prevented all human movements completely for thousands of years.',
      'Physical landforms had no impact on historical migration routes.',
      'The pass was artificially excavated using 20th-century machinery.'
    ],
    correctIndex: 0,
    explanation: 'Physical topography dictates spatial connectivity; mountain passes act as key historical conduits for human movement, migration, and trade.',
    hints: ['Topography creates corridors or barriers.', 'Passes enable historical migration and trade.', 'Physical environment shapes geopolitical history.']
  },
  {
    id: 'chal-22',
    nodeId: 'c11_geo_cbse_230',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is physical geography essential for understanding soil conservation and watershed management?',
    options: [
      'It synthesizes Geomorphology (slope dynamics), Climatology (rainfall intensity), and Pedology (soil structure) to prevent degradation.',
      'It only calculates financial interest rates on farm loans.',
      'It relies entirely on urban population projections.',
      'Physical geography only studies ocean floors, not watersheds.'
    ],
    correctIndex: 0,
    explanation: 'Watershed conservation requires an integrated physical geography understanding of slope, precipitation intensity, vegetation cover, and soil characteristics.',
    hints: ['Combines slope, rain, soil, and vegetation.', 'Physical geographic synthesis for conservation.', 'Integrated earth science management.']
  }
];

// ==========================================
// SECTION 10: CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// SVG 1: Interactive Multi-Disciplinary Synthesis Network
const DisciplinesTreeSVG: React.FC<{
  selectedDomain: string;
  onSelectDomain: (domain: string) => void;
}> = ({ selectedDomain, onSelectDomain }) => {
  const domains = [
    { id: 'geology', title: 'Geology', branch: 'Geomorphology', type: 'natural', x: 120, y: 80, color: '#e74c3c' },
    { id: 'meteorology', title: 'Meteorology', branch: 'Climatology', type: 'natural', x: 260, y: 50, color: '#e67e22' },
    { id: 'hydrology', title: 'Hydrology', branch: 'Oceanography', type: 'natural', x: 400, y: 50, color: '#3498db' },
    { id: 'botany', title: 'Botany / Ecology', branch: 'Biogeography', type: 'natural', x: 540, y: 80, color: '#2ecc71' },
    { id: 'economics', title: 'Economics', branch: 'Economic Geo', type: 'social', x: 120, y: 320, color: '#9b59b6' },
    { id: 'demography', title: 'Demography', branch: 'Population Geo', type: 'social', x: 260, y: 350, color: '#1abc9c' },
    { id: 'sociology', title: 'Sociology', branch: 'Social Geo', type: 'social', x: 400, y: 350, color: '#f1c40f' },
    { id: 'history', title: 'History', branch: 'Historical Geo', type: 'social', x: 540, y: 320, color: '#e84393' },
  ];

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-800">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-emerald-400 font-bold text-sm tracking-wider uppercase">
          Interactive Synthesis Engine: Geography as the Interface Discipline
        </h4>
        <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
          Click any discipline node
        </span>
      </div>

      <svg viewBox="0 0 660 400" className="w-full h-auto select-none">
        <defs>
          <radialGradient id="hubGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {domains.map((d) => {
          const isSelected = selectedDomain === d.id;
          return (
            <line
              key={`line-${d.id}`}
              x1={330}
              y1={200}
              x2={d.x}
              y2={d.y}
              stroke={isSelected ? d.color : '#334155'}
              strokeWidth={isSelected ? 3 : 1.5}
              strokeDasharray={isSelected ? 'none' : '4,4'}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Central Synthesis Hub: GEOGRAPHY */}
        <circle
          cx={330}
          cy={200}
          r={55}
          fill="url(#hubGradient)"
          stroke="#34d399"
          strokeWidth={3}
          filter="url(#glow)"
        />
        <text x={330} y={193} fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize={15}>
          GEOGRAPHY
        </text>
        <text x={330} y={212} fill="#a7f3d0" textAnchor="middle" fontSize={11}>
          Spatial Synthesis Hub
        </text>

        {/* Discipline Nodes */}
        {domains.map((d) => {
          const isSelected = selectedDomain === d.id;
          return (
            <g
              key={d.id}
              onClick={() => onSelectDomain(d.id)}
              className="cursor-pointer group"
            >
              <circle
                cx={d.x}
                cy={d.y}
                r={isSelected ? 36 : 30}
                fill={isSelected ? d.color : '#1e293b'}
                stroke={d.color}
                strokeWidth={isSelected ? 3 : 2}
                className="transition-all duration-300 transform group-hover:scale-110"
              />
              <text
                x={d.x}
                y={d.y - 4}
                fill={isSelected ? '#ffffff' : '#e2e8f0'}
                textAnchor="middle"
                fontSize={11}
                fontWeight="bold"
              >
                {d.title}
              </text>
              <text
                x={d.x}
                y={d.y + 11}
                fill={isSelected ? '#f8fafc' : '#94a3b8'}
                textAnchor="middle"
                fontSize={9}
              >
                → {d.branch}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// SVG 2: Interactive GIS Layer Stack & Raster Overlay Visualizer
const GISLayerStackSVG: React.FC<{
  activeLayers: { elevation: boolean; hydrology: boolean; soil: boolean; settlement: boolean; remoteSensing: boolean };
  onToggleLayer: (layer: string) => void;
}> = ({ activeLayers, onToggleLayer }) => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-800">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-gold-400 font-bold text-sm tracking-wider uppercase">
          GIS Multi-Spectral Layer Stack Visualizer
        </h4>
        <div className="flex gap-2 text-xs">
          <span className="text-slate-400">Layer Controls: Click to toggle</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <svg viewBox="0 0 500 320" className="w-full h-auto bg-slate-950 rounded-lg border border-slate-800 select-none">
            {/* GIS Layers Stack Graphic */}
            <g transform="translate(100, 30)">
              {/* Layer 5: Remote Sensing Spectral Reflectance */}
              {activeLayers.remoteSensing && (
                <g transform="translate(0, 0)" className="transition-all duration-500">
                  <path d="M 0 40 L 180 0 L 320 40 L 140 80 Z" fill="rgba(168, 85, 247, 0.3)" stroke="#c084fc" strokeWidth={2} />
                  <text x={160} y={35} fill="#e9d5ff" fontSize={11} fontWeight="bold" textAnchor="middle">
                    Satellite Multispectral Imagery (NIR / Red)
                  </text>
                </g>
              )}

              {/* Layer 4: Human Settlement Vectors */}
              {activeLayers.settlement && (
                <g transform="translate(0, 45)" className="transition-all duration-500">
                  <path d="M 0 40 L 180 0 L 320 40 L 140 80 Z" fill="rgba(239, 68, 68, 0.3)" stroke="#f87171" strokeWidth={2} />
                  <circle cx={120} cy={35} r={5} fill="#ef4444" />
                  <circle cx={170} cy={45} r={7} fill="#ef4444" />
                  <circle cx={210} cy={25} r={4} fill="#ef4444" />
                  <text x={160} y={20} fill="#fca5a5" fontSize={11} fontWeight="bold" textAnchor="middle">
                    Settlement & Infrastructure Layer
                  </text>
                </g>
              )}

              {/* Layer 3: Pedology / Soil Types */}
              {activeLayers.soil && (
                <g transform="translate(0, 90)" className="transition-all duration-500">
                  <path d="M 0 40 L 180 0 L 320 40 L 140 80 Z" fill="rgba(234, 179, 8, 0.3)" stroke="#facc15" strokeWidth={2} />
                  <text x={160} y={35} fill="#fef08a" fontSize={11} fontWeight="bold" textAnchor="middle">
                    Soil Geography Layer (Pedology)
                  </text>
                </g>
              )}

              {/* Layer 2: Hydrology Vectors */}
              {activeLayers.hydrology && (
                <g transform="translate(0, 135)" className="transition-all duration-500">
                  <path d="M 0 40 L 180 0 L 320 40 L 140 80 Z" fill="rgba(59, 130, 246, 0.3)" stroke="#60a5fa" strokeWidth={2} />
                  <path d="M 40 40 Q 120 10, 200 45 T 280 20" fill="none" stroke="#38bdf8" strokeWidth={3} />
                  <text x={160} y={35} fill="#bae6fd" fontSize={11} fontWeight="bold" textAnchor="middle">
                    Hydrology & River Basin Layer
                  </text>
                </g>
              )}

              {/* Layer 1: Geomorphological Elevation DEM */}
              {activeLayers.elevation && (
                <g transform="translate(0, 180)" className="transition-all duration-500">
                  <path d="M 0 40 L 180 0 L 320 40 L 140 80 Z" fill="rgba(34, 197, 94, 0.3)" stroke="#4ade80" strokeWidth={2} />
                  <path d="M 30 50 Q 80 15, 140 40 T 260 30" fill="none" stroke="#22c55e" strokeWidth={1.5} strokeDasharray="3,3" />
                  <text x={160} y={45} fill="#bbf7d0" fontSize={11} fontWeight="bold" textAnchor="middle">
                    Digital Elevation Model (Geomorphology)
                  </text>
                </g>
              )}

              {/* Projection Axis */}
              <line x1={160} y1={10} x2={160} y2={250} stroke="#475569" strokeWidth={1} strokeDasharray="4,4" />
              <text x={160} y={268} fill="#94a3b8" fontSize={10} textAnchor="middle">
                Georeferenced Spatial Coordinate Alignment (X, Y, Z)
              </text>
            </g>
          </svg>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-col gap-2 justify-center bg-slate-950 p-3 rounded-lg border border-slate-800">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide mb-1">Toggle GIS Layers</span>
          {[
            { id: 'remoteSensing', label: '1. Remote Sensing Sat Imagery', color: 'border-purple-500 text-purple-400' },
            { id: 'settlement', label: '2. Settlement Vectors', color: 'border-red-500 text-red-400' },
            { id: 'soil', label: '3. Soil Geography (Pedology)', color: 'border-amber-500 text-amber-400' },
            { id: 'hydrology', label: '4. Hydrology & River Basins', color: 'border-gold-500 text-gold-400' },
            { id: 'elevation', label: '5. DEM Elevation (Geomorphology)', color: 'border-emerald-500 text-emerald-400' },
          ].map((item) => {
            const active = activeLayers[item.id as keyof typeof activeLayers];
            return (
              <button
                key={item.id}
                onClick={() => onToggleLayer(item.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  active ? `${item.color} bg-slate-900 shadow-md` : 'border-slate-800 text-slate-500 bg-slate-900/40'
                }`}
              >
                <span>{item.label}</span>
                <span className={`w-3 h-3 rounded-full ${active ? 'bg-emerald-400' : 'bg-slate-700'}`} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// SVG 3: Dynamic Nature-Human Interaction Landscape (Determinism vs Possibilism)
const NatureHumanLandscapeSVG: React.FC<{
  techLevel: number; // 0 (primitive/determinism) to 100 (high-tech/possibilism)
  climateSeverity: number; // 0 (mild) to 100 (extreme desert/arctic)
}> = ({ techLevel, climateSeverity }) => {
  const isPossibilism = techLevel > 50;
  const isExtremeClimate = climateSeverity > 50;

  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-800">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-amber-400 font-bold text-sm tracking-wider uppercase">
          Dynamic Landscape: Nature-Human Interaction Simulator
        </h4>
        <div className="text-xs font-semibold px-3 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
          {techLevel < 35 ? 'Stage 1: Environmental Determinism (Naturalised Human)' :
           techLevel > 65 ? 'Stage 3: Possibilism (Humanised Nature)' :
           'Stage 2: Neo-Determinism (Stop-and-Go Equilibrium)'}
        </div>
      </div>

      <svg viewBox="0 0 600 260" className="w-full h-auto bg-slate-950 rounded-lg border border-slate-800 select-none">
        {/* Sky Background */}
        <rect
          x={0}
          y={0}
          width={600}
          height={160}
          fill={isExtremeClimate ? '#451a03' : '#0f172a'}
          className="transition-colors duration-500"
        />

        {/* Sun / Heat indicator */}
        <circle cx={520} cy={40} r={isExtremeClimate ? 28 : 20} fill={isExtremeClimate ? '#f97316' : '#fde047'} />

        {/* Mountains / Terrain */}
        <path d="M 0 160 Q 150 70, 300 160 T 600 160 L 600 260 L 0 260 Z" fill="#1e293b" />
        <path d="M 0 180 Q 200 110, 450 180 T 600 200 L 600 260 L 0 260 Z" fill="#0f172a" />

        {/* Primitive Huts / Caves (Low Tech) */}
        {techLevel <= 50 && (
          <g transform="translate(120, 150)">
            <path d="M 0 20 L 15 0 L 30 20 Z" fill="#78350f" />
            <rect x={5} y={20} width={20} height={15} fill="#451a03" />
            <text x={15} y={48} fill="#d97706" fontSize={10} textAnchor="middle">
              Primitive Shelter (Natural Adaption)
            </text>
          </g>
        )}

        {/* Advanced Technological Settlement / Biodomes / Solar Grids (High Tech) */}
        {techLevel > 50 && (
          <g transform="translate(320, 110)">
            {/* Climate-Controlled Dome */}
            <path d="M 0 50 A 40 40 0 0 1 80 50 Z" fill="rgba(56, 189, 248, 0.4)" stroke="#38bdf8" strokeWidth={2} />
            <rect x={20} y={30} width={40} height={20} fill="#0284c7" opacity={0.7} />
            {/* Solar Panels */}
            <rect x={100} y={40} width={30} height={10} fill="#1e40af" stroke="#60a5fa" strokeWidth={1} transform="rotate(-15)" />
            <rect x={140} y={40} width={30} height={10} fill="#1e40af" stroke="#60a5fa" strokeWidth={1} transform="rotate(-15)" />
            {/* Canal System */}
            <path d="M -100 70 C -50 70, 0 80, 180 70" fill="none" stroke="#0ea5e9" strokeWidth={4} />
            <text x={40} y={68} fill="#7dd3fc" fontSize={10} textAnchor="middle" fontWeight="bold">
              Climate-Controlled Eco-Dome & Hydro-Canal
            </text>
          </g>
        )}

        {/* Annotations */}
        <text x={20} y={30} fill="#e2e8f0" fontSize={12} fontWeight="bold">
          Environment Severity: {climateSeverity}% | Tech Capability: {techLevel}%
        </text>
        <text x={20} y={48} fill="#94a3b8" fontSize={10}>
          {isPossibilism
            ? 'Humanised Nature: Technology creates possibilities despite extreme physical constraints.'
            : 'Naturalised Human: Human lifestyle dictated primarily by physical environment constraints.'}
        </text>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_GeoGeographyDisciplineCBSESim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostics' | 'summary'>('discovery');

  // Interactive Lab States
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('geology');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // GIS Layer Visualizer State
  const [gisLayers, setGisLayers] = useState({
    elevation: true,
    hydrology: true,
    soil: false,
    settlement: true,
    remoteSensing: false,
  });

  // Nature-Human Simulator State
  const [techLevel, setTechLevel] = useState<number>(25);
  const [climateSeverity, setClimateSeverity] = useState<number>(75);

  // 3 Questions Simulator State
  const [questionMode, setQuestionMode] = useState<'WHAT' | 'WHERE' | 'WHY'>('WHAT');

  // Systematic vs Regional Toggle
  const [approachMode, setApproachMode] = useState<'systematic' | 'regional'>('systematic');

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenge Mode State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userMcqSelection, setUserMcqSelection] = useState<number | null>(null);
  const [matchingPairs, setMatchingPairs] = useState<{ [key: string]: string }>({});
  const [challengeOrder, setChallengeOrder] = useState<number[]>([0, 1, 2, 3]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // Diagnostic Test State
  const [diagAnswers, setDiagAnswers] = useState<{ [key: string]: number }>({});
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);

  // BKT & SRS Mastery State
  const [bktStateMap, setBktStateMap] = useState<Record<string, ReturnType<typeof createBKTState>>>({});
  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>({});

  // UI Feedback Flags
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Auto-hint timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT and SRS states on mount
  useEffect(() => {
    const initialBkt: Record<string, ReturnType<typeof createBKTState>> = {};
    const initialSrs: Record<string, ReturnType<typeof createReviewItem>> = {};

    ALL_NODE_IDS.forEach((nodeId) => {
      initialBkt[nodeId] = createBKTState();
      initialSrs[nodeId] = createReviewItem(nodeId);
    });

    setBktStateMap(initialBkt);
    setSrsMap(initialSrs);
  }, []);

  // Inactivity hint trigger (10 seconds)
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && CHALLENGES[currentChallengeIdx]) {
        const hint = CHALLENGES[currentChallengeIdx].hints[0];
        setCurrentHintText(hint);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIdx]);

  // Handle GIS layer toggles
  const handleToggleGisLayer = (layerKey: string) => {
    setGisLayers((prev) => ({
      ...prev,
      [layerKey as keyof typeof prev]: !prev[layerKey as keyof typeof prev],
    }));
    audioManager.play('pop');
  };

  // Submit Discovery Question
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryAnswer(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent! Geography synthesizes natural and social sciences across space and time.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    } else {
      audioManager.play('error');
    }
  };

  // Challenge Submission Logic
  const handleChallengeSubmit = () => {
    const currentChal = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (currentChal.type === 'mcq') {
      isCorrect = userMcqSelection === currentChal.correctIndex;
    } else if (currentChal.type === 'matching' && currentChal.matchPairs) {
      isCorrect = currentChal.matchPairs.every((pair, idx) => matchingPairs[`left-${idx}`] === pair.right);
    } else if (currentChal.type === 'ordering' && currentChal.correctOrder) {
      isCorrect = challengeOrder.every((val, idx) => val === currentChal.correctOrder![idx]);
    }

    // Audio & Visual feedback
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${currentChal.explanation}` });
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2500);

      if (streak + 1 >= 3) {
        audioManager.play('celebration');
        setShowSuccessBanner(true);
        setTimeout(() => setShowSuccessBanner(false), 3000);
      }
    } else {
      audioManager.play('drop-wrong');
      setChallengeFeedback({ isCorrect: false, text: `Incorrect. ${currentChal.explanation}` });
      setStreak(0);
    }

    // Update BKT & SRS
    if (currentChal.nodeId && bktStateMap[currentChal.nodeId]) {
      const updatedBkt = bktUpdate(bktStateMap[currentChal.nodeId], isCorrect);
      const updatedSrs = sm2Update(srsMap[currentChal.nodeId] || createReviewItem(currentChal.nodeId), isCorrect ? 5 : 1);

      setBktStateMap((prev) => ({ ...prev, [currentChal.nodeId]: updatedBkt }));
      setSrsMap((prev) => ({ ...prev, [currentChal.nodeId]: updatedSrs }));
      recordGameScore(currentChal.nodeId, isCorrect ? 100 : 0);
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setUserMcqSelection(null);
    setMatchingPairs({});
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed all Geography challenges.');
      setActiveTab('summary');
    }
  };

  // Submit Diagnostic Test
  const handleDiagnosticSubmit = () => {
    setDiagSubmitted(true);
    let correctCount = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      if (diagAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    audioManager.play(correctCount >= 6 ? 'celebration' : 'chime');
    speechManager.speak(`You scored ${correctCount} out of ${DIAGNOSTIC_QUESTIONS.length} in the diagnostic analysis.`);
  };

  // Domain descriptions for synthesis lab
  const domainDetails: Record<string, { title: string; desc: string; geoLink: string }> = {
    geology: {
      title: 'Geology & Geomorphology',
      desc: 'Geology studies rock structure, internal Earth tectonics, and mineralogy.',
      geoLink: 'Geomorphology applies geological principles to analyze surface landforms, erosion, and relief evolution across space.'
    },
    meteorology: {
      title: 'Meteorology & Climatology',
      desc: 'Meteorology measures short-term atmospheric physics, weather dynamics, and thermodynamics.',
      geoLink: 'Climatology synthesizes meteorology to study long-term regional climate zones, rainfall patterns, and global warming impacts.'
    },
    hydrology: {
      title: 'Hydrology & Oceanography',
      desc: 'Hydrology studies terrestrial water bodies, river discharge, and groundwater flow.',
      geoLink: 'Oceanography & Hydrology examine ocean currents, marine ecosystems, water resource management, and watershed dynamics.'
    },
    botany: {
      title: 'Botany / Ecology & Biogeography',
      desc: 'Botany and Ecology investigate plant biology, species taxonomy, and ecosystem energy flows.',
      geoLink: 'Biogeography maps spatial distribution of plant/animal species, biome boundaries, and environmental ecological balances.'
    },
    economics: {
      title: 'Economics & Economic Geography',
      desc: 'Economics formulates theories of production, market pricing, inflation, and resource capital.',
      geoLink: 'Economic Geography examines spatial location of industries, trade networks, land-use patterns, and regional economic disparities.'
    },
    demography: {
      title: 'Demography & Population Geography',
      desc: 'Demography measures statistical population metrics like birth rates, mortality, and age pyramids.',
      geoLink: 'Population Geography analyzes spatial density, migration corridors, urban urbanization patterns, and spatial carrying capacity.'
    },
    sociology: {
      title: 'Sociology & Cultural Geography',
      desc: 'Sociology studies social institutions, human behavior, stratification, and cultural practices.',
      geoLink: 'Social & Cultural Geography maps cultural landscapes, ethnic spatial clusters, tribal habitats, and human-space perception.'
    },
    history: {
      title: 'History & Historical Geography',
      desc: 'History records temporal sequence of events, past human civilizations, and socio-political shifts.',
      geoLink: 'Historical Geography evaluates how spatial environments shaped historical events and how landscapes transformed across time.'
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-full border border-emerald-800">
              ISC Class 11 Geography
            </span>
            <span className="text-xs text-slate-400">Chapter 1: Geography as a Discipline</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Spatial Command & Geo-Synthesis Simulator
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Explore geography as an integrating, spatial, and dynamic science bridging Earth systems and human society.
          </p>
        </div>

        {/* Global Score & Streak Badge */}
        <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-xs text-slate-500 uppercase font-semibold">Mastery Score</span>
            <div className="text-xl font-bold text-emerald-400">{score} pts</div>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-500 uppercase font-semibold">Streak</span>
            <div className="text-xl font-bold text-amber-400">🔥 {streak}</div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'discovery', label: '1. Discovery & Concept', icon: '🔍' },
          { id: 'lab', label: '2. Interactive Geo Labs (5 Labs)', icon: '🧪' },
          { id: 'challenges', label: '3. Skill Challenges (22+)', icon: '🎯' },
          { id: 'diagnostics', label: '4. Diagnostic Assessment', icon: '📋' },
          { id: 'summary', label: '5. Mastery & Real-World Lab', icon: '🏆' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTAINER CONTENT */}
      <main className="max-w-7xl mx-auto">
        {/* TAB 1: DISCOVERY & CONCEPT */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Narrative */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <span>🌐</span> {SCENARIO.title}
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base mb-3">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-sm italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                {SCENARIO.context}
              </p>
            </div>

            {/* Discovery Counter-intuitive Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800">
                Core Discovery Question
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={discoverySubmitted}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : discoveryAnswer === idx
                          ? 'bg-red-950 border-red-500 text-red-200'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-300 p-4 rounded-xl text-sm">
                  <p className="font-bold mb-1">Analytical Insight:</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Render Prediction Questions (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Predictive Geographic Scenarios (PREDICTION_QUESTIONS)
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-white text-sm md:text-base mb-2">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pq.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg text-xs font-medium border ${
                            optIdx === pq.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gold-300 bg-gold-950/40 p-2.5 rounded-lg border border-gold-800">
                      💡 <strong>Verification Instruction:</strong> {pq.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Misconception Highlights */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-rose-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Common Geographic Misconceptions vs Scientific Truth
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.slice(0, 4).map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-rose-300 text-sm mb-1">{m.title}</h4>
                    <p className="text-xs text-rose-400 line-through mb-2">"{m.misconception}"</p>
                    <p className="text-xs text-emerald-300 bg-emerald-950/30 p-2 rounded border border-emerald-900">
                      ✓ <strong>Correction:</strong> {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE GEO LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Navigation (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    activeLabIndex === idx
                      ? 'bg-gold-600 text-white border-gold-400 shadow-lg'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Lab 1: Multi-Disciplinary Synthesis Matrix */}
            {activeLabIndex === 0 && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
                  <strong>Lab Instruction:</strong> {EXPLORATION_STEPS[0].instruction}
                </div>
                <DisciplinesTreeSVG selectedDomain={selectedDiscipline} onSelectDomain={setSelectedDiscipline} />
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <h4 className="font-bold text-emerald-400 text-sm mb-1">
                    {domainDetails[selectedDiscipline].title}
                  </h4>
                  <p className="text-slate-300 text-xs mb-2">{domainDetails[selectedDiscipline].desc}</p>
                  <p className="text-xs text-emerald-300 bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-800">
                    🔗 <strong>Geographic Linkage:</strong> {domainDetails[selectedDiscipline].geoLink}
                  </p>
                </div>
              </div>
            )}

            {/* Lab 2: Three Fundamental Questions */}
            {activeLabIndex === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="text-xs text-slate-300">
                  <strong>Lab Instruction:</strong> {EXPLORATION_STEPS[1].instruction}
                </div>
                <div className="flex gap-2">
                  {(['WHAT', 'WHERE', 'WHY'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuestionMode(q);
                        audioManager.play('pop');
                      }}
                      className={`flex-1 py-3 rounded-xl font-bold text-sm border transition-all ${
                        questionMode === q
                          ? 'bg-amber-600 text-white border-amber-400 shadow-lg'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      Question Filter: {q}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 min-h-[160px] flex flex-col justify-center">
                  {questionMode === 'WHAT' && (
                    <div>
                      <span className="text-xs text-amber-400 font-bold uppercase">1. WHAT (Feature Identification)</span>
                      <h4 className="text-lg font-bold text-white mt-1">Identifies natural or cultural patterns on Earth</h4>
                      <p className="text-slate-300 text-xs mt-2">
                        Example: Identifying landform features like mountain ranges, alluvial plains, crop types, or population clusters.
                      </p>
                    </div>
                  )}
                  {questionMode === 'WHERE' && (
                    <div>
                      <span className="text-xs text-gold-400 font-bold uppercase">2. WHERE (Spatial Location & Distribution)</span>
                      <h4 className="text-lg font-bold text-white mt-1">Locates phenomena using coordinates, maps, and spatial distribution</h4>
                      <p className="text-slate-300 text-xs mt-2">
                        Example: Mapping exact coordinates (Latitude 27°N, Longitude 88°E) and boundary spreads of Himalayan tea gardens.
                      </p>
                    </div>
                  )}
                  {questionMode === 'WHY' && (
                    <div>
                      <span className="text-xs text-emerald-400 font-bold uppercase">3. WHY (Scientific Cause-and-Effect Explanation)</span>
                      <h4 className="text-lg font-bold text-white mt-1">Explains scientific mechanisms behind spatial patterns</h4>
                      <p className="text-slate-300 text-xs mt-2">
                        Example: Tea thrives on sloping land because water stagnation causes root rot; high rainfall + acidic soil + warm temperature create optimal physiological growth conditions.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lab 3: GIS & Remote Sensing Layer Stack */}
            {activeLabIndex === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
                  <strong>Lab Instruction:</strong> {EXPLORATION_STEPS[2].instruction}
                </div>
                <GISLayerStackSVG activeLayers={gisLayers} onToggleLayer={handleToggleGisLayer} />
              </div>
            )}

            {/* Lab 4: Nature-Human Interaction & Dualism */}
            {activeLabIndex === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300">
                  <strong>Lab Instruction:</strong> {EXPLORATION_STEPS[3].instruction}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-amber-400 block mb-1">
                      Technological & Socio-Economic Capability Level: {techLevel}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={techLevel}
                      onChange={(e) => setTechLevel(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Primitive (Determinism)</span>
                      <span>Advanced (Possibilism)</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gold-400 block mb-1">
                      Physical Environment Harshness / Climate Severity: {climateSeverity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={climateSeverity}
                      onChange={(e) => setClimateSeverity(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Mild Ecosystem</span>
                      <span>Hyper-Arid Desert / Arctic</span>
                    </div>
                  </div>
                </div>

                <NatureHumanLandscapeSVG techLevel={techLevel} climateSeverity={climateSeverity} />
              </div>
            )}

            {/* Lab 5: Systematic vs Regional Methodological Simulator */}
            {activeLabIndex === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="text-xs text-slate-300">
                  <strong>Lab Instruction:</strong> {EXPLORATION_STEPS[4].instruction}
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setApproachMode('systematic');
                      audioManager.play('pop');
                    }}
                    className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
                      approachMode === 'systematic'
                        ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Systematic Approach (Alexander von Humboldt)
                  </button>
                  <button
                    onClick={() => {
                      setApproachMode('regional');
                      audioManager.play('pop');
                    }}
                    className={`px-6 py-3 rounded-xl font-bold text-sm border transition-all ${
                      approachMode === 'regional'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Regional Approach (Carl Ritter)
                  </button>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  {approachMode === 'systematic' ? (
                    <div>
                      <h4 className="text-base font-bold text-purple-400 mb-2">
                        Systematic (Topical) Approach Overview
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        A single phenomenon (e.g., Natural Vegetation, Climate Zones, Population Density) is studied world-wide or continent-wide to identify spatial laws and global distribution typologies.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-purple-300">
                          1. Choose Topic (e.g., Tropical Monsoon)
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-purple-300">
                          2. Map Global Distribution
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-purple-300">
                          3. Formulate Spatial Laws
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-base font-bold text-emerald-400 mb-2">
                        Regional Approach (Areal Synthesis) Overview
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        A specific spatial region (e.g., South Asia, Amazon Basin) is selected, and ALL physical and human elements (climate, geology, soils, agriculture, culture) are synthesized holistically.
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                          1. Define Region Boundaries
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                          2. Synthesize Physical & Human Data
                        </div>
                        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-emerald-300">
                          3. Understand Areal Character
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS SECTION (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mt-8">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Guided Observation Analysis (OBSERVATION_QUESTIONS)
              </h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="font-semibold text-white text-sm md:text-base mb-3">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg text-xs font-medium border ${
                            optIdx === oq.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SKILL CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white capitalize mt-0.5">
                  Tier: {CHALLENGES[currentChallengeIdx].difficulty} | Competency: {CHALLENGES[currentChallengeIdx].competencyLevel}
                </h3>
              </div>
              <div className="flex gap-1">
                {CHALLENGES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i === currentChallengeIdx
                        ? 'bg-emerald-400 ring-2 ring-emerald-950'
                        : i < currentChallengeIdx
                        ? 'bg-emerald-800'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current Challenge Body */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <p className="text-base font-semibold text-white mb-4">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* MCQ Format */}
              {CHALLENGES[currentChallengeIdx].type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUserMcqSelection(idx)}
                      className={`text-left p-3.5 rounded-xl text-xs md:text-sm font-medium border transition-all ${
                        userMcqSelection === idx
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Matching Format */}
              {CHALLENGES[currentChallengeIdx].type === 'matching' && CHALLENGES[currentChallengeIdx].matchPairs && (
                <div className="space-y-3 mb-4">
                  {CHALLENGES[currentChallengeIdx].matchPairs!.map((pair, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row items-center gap-3 bg-slate-900 p-3 rounded-lg">
                      <span className="text-xs font-bold text-amber-400 md:w-1/3">{pair.left}</span>
                      <span className="text-slate-500 text-xs">connects to →</span>
                      <select
                        value={matchingPairs[`left-${idx}`] || ''}
                        onChange={(e) =>
                          setMatchingPairs({ ...matchingPairs, [`left-${idx}`]: e.target.value })
                        }
                        className="bg-slate-950 text-slate-200 text-xs p-2 rounded border border-slate-700 md:w-1/2"
                      >
                        <option value="">Select Matching Concept...</option>
                        {CHALLENGES[currentChallengeIdx].matchPairs!.map((p, pIdx) => (
                          <option key={pIdx} value={p.right}>
                            {p.right}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Ordering Format */}
              {CHALLENGES[currentChallengeIdx].type === 'ordering' && (
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-slate-400 mb-2">Drag/Re-order items into correct chronological sequence:</p>
                  {challengeOrder.map((itemIdx, pos) => (
                    <div
                      key={pos}
                      className="flex items-center justify-between bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-200"
                    >
                      <span>
                        <strong>Step {pos + 1}:</strong> {CHALLENGES[currentChallengeIdx].orderItems![itemIdx]}
                      </span>
                      <div className="flex gap-1">
                        {pos > 0 && (
                          <button
                            onClick={() => {
                              const newOrder = [...challengeOrder];
                              [newOrder[pos - 1], newOrder[pos]] = [newOrder[pos], newOrder[pos - 1]];
                              setChallengeOrder(newOrder);
                            }}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-amber-400"
                          >
                            ▲
                          </button>
                        )}
                        {pos < challengeOrder.length - 1 && (
                          <button
                            onClick={() => {
                              const newOrder = [...challengeOrder];
                              [newOrder[pos], newOrder[pos + 1]] = [newOrder[pos + 1], newOrder[pos]];
                              setChallengeOrder(newOrder);
                            }}
                            className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-amber-400"
                          >
                            ▼
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Challenge Actions */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => {
                    const hints = CHALLENGES[currentChallengeIdx].hints;
                    setCurrentHintText(hints[Math.floor(Math.random() * hints.length)]);
                    setShowHint(true);
                    audioManager.play('hint');
                  }}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded-lg text-xs font-semibold border border-slate-800"
                >
                  💡 Request Hint
                </button>

                {!challengeFeedback ? (
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-lg"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-lg"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>

            {/* Feedback Alert */}
            {challengeFeedback && (
              <div
                className={`p-4 rounded-xl text-xs md:text-sm font-medium border ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-600 text-rose-200'
                }`}
              >
                {challengeFeedback.text}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DIAGNOSTIC ASSESSMENT */}
        {activeTab === 'diagnostics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>📋</span> CISCE Diagnostic Examination Mode
            </h3>
            <p className="text-slate-400 text-xs md:text-sm mb-4">
              Evaluate your conceptual understanding of geography etymology, branches, spatial attributes, and dualism.
            </p>

            <div className="space-y-6">
              {DIAGNOSTIC_QUESTIONS.map((dq, qIdx) => (
                <div key={dq.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="font-semibold text-white text-sm mb-3">
                    {qIdx + 1}. {dq.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {dq.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => setDiagAnswers({ ...diagAnswers, [dq.id]: optIdx })}
                        disabled={diagSubmitted}
                        className={`text-left p-3 rounded-lg text-xs font-medium border transition-all ${
                          diagSubmitted
                            ? optIdx === dq.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                              : diagAnswers[dq.id] === optIdx
                              ? 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                            : diagAnswers[dq.id] === optIdx
                            ? 'bg-gold-950 border-gold-500 text-gold-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                      </button>
                    ))}
                  </div>

                  {diagSubmitted && (
                    <div className="mt-2 text-xs text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                      💡 <strong>Explanation:</strong> {dq.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!diagSubmitted && (
              <button
                onClick={handleDiagnosticSubmit}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg mt-4"
              >
                Submit Complete Diagnostic Assessment
              </button>
            )}
          </div>
        )}

        {/* TAB 5: MASTERY & REAL-WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY (Mandatory Render) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                  Real-World Industry Case Study
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((stepText, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Phase {idx + 1}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{stepText}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Mastery Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">
                Core Topic Mastery Index (BKT Bayesian Knowledge Tracing)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ALL_NODE_IDS.slice(0, 8).map((nodeId) => {
                  const bkt = bktStateMap[nodeId];
                  const mastery = bkt ? masteryProb(bkt) : 0;
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-500 font-mono block">{nodeId}</span>
                      <span className="text-xs font-bold text-slate-200 block mt-1">
                        Mastery: {(mastery * 100).toFixed(0)}%
                      </span>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-full transition-all duration-500"
                          style={{ width: `${mastery * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK COMPONENTS */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Geography Mastery Milestone Achieved!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}