'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Node IDs as string literals
const NODE_C9_GEO_011 = 'c9_geo_011'; // Landforms — plateaus
const NODE_C9_GEO_012 = 'c9_geo_012'; // Landforms — plains
const NODE_C9_GEO_013 = 'c9_geo_013'; // Rocks — igneous
const NODE_C9_GEO_014 = 'c9_geo_014'; // Rocks — sedimentary
const NODE_C9_GEO_015 = 'c9_geo_015'; // Rocks — metamorphic
const NODE_C9_GEO_016 = 'c9_geo_016'; // Rock cycle
const NODE_C9_GEO_017 = 'c9_geo_017'; // Volcanoes
const NODE_C9_GEO_018 = 'c9_geo_018'; // Earthquakes
const NODE_C9_GEO_019 = 'c9_geo_019'; // Weathering — types
const NODE_C9_GEO_020 = 'c9_geo_020'; // Denudation — river work

const ALL_NODE_IDS = [
  NODE_C9_GEO_011,
  NODE_C9_GEO_012,
  NODE_C9_GEO_013,
  NODE_C9_GEO_014,
  NODE_C9_GEO_015,
  NODE_C9_GEO_016,
  NODE_C9_GEO_017,
  NODE_C9_GEO_018,
  NODE_C9_GEO_019,
  NODE_C9_GEO_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Expedition Lithosphere: Decoding Indian Geomorphology',
  intro: 'A major infrastructure project is underway across India — linking the Deccan Plateau, the Indo-Gangetic Plains, the Himalayan seismic belt, and the Sundarbans Delta. As chief geotechnical surveyor, you must decode the landforms, rock structures, volcanic strata, seismic risks, and denudation forces shaping our subcontinent.',
  context: 'From molten basalt traps to ancient marble temples and river gorges, discover how internal tectonic engines and external atmospheric forces carve our living planet.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'The Deccan Traps of peninsular India cover over 500,000 sq km of high, flat tableland. What created this massive landform?',
  options: [
    'Massive mountain uplift squeezed between two colliding continents',
    'Enormous successive fissure outpourings of runny basaltic lava',
    'Millions of years of river silt compaction from the Himalayas',
    'Glacial scraping during the Ice Ages across northern India'
  ],
  correctIndex: 1,
  hintAfter: 'Think about runny lava spreading out flat across thousands of kilometres — let us explore the geology of plateaus, rocks, and tectonic forces!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 Compliant) ───
const CHALLENGES: Challenge[] = [
  // Foundation (8 challenges)
  {
    id: 'ch_geo_001',
    nodeId: NODE_C9_GEO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Tibetan Plateau is surrounded by the Himalayas to the south and the Kunlun Mountains to the north. Which type of plateau is it?',
    options: ['Intermontane Plateau', 'Piedmont Plateau', 'Continental Shield Plateau', 'Volcanic Plateau'],
    correctIndex: 0,
    explanation: 'The Tibetan Plateau is an intermontane plateau because it is enclosed ("inter" = between) between mountain ranges.',
    hints: [
      'Look at the Latin prefix "inter-" which means "between".',
      'It sits locked between two mountain chains (Himalayas and Kunlun).',
      'Plateaus enclosed between mountains are called intermontane plateaus.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_geo_002',
    nodeId: NODE_C9_GEO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does a plateau fundamentally differ from a plain in physical terms?',
    options: [
      'A plateau is elevated with steep sides (tableland), whereas a plain has low relief and low elevation (<500m)',
      'A plateau is always made of sand, while a plain is always rocky',
      'Plains only occur in deserts, while plateaus only occur near oceans',
      'Plains have pointed peaks, while plateaus are completely below sea level'
    ],
    correctIndex: 0,
    explanation: 'Both plateaus and plains have flat surfaces, but a plateau is an elevated tableland standing high above surrounding lowlands with steep sides, while a plain lies at low elevation (<500m) with gentle relief.',
    hints: [
      'Remember the "table standing on the floor" analogy for plateaus.',
      'Plains sit low on the ground (<500m elevation), while plateaus rise sharply above surroundings.',
      'Elevation and steep sides are the defining differences.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_003',
    nodeId: NODE_C9_GEO_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why do intrusive igneous rocks like granite have large, visible crystals?',
    options: [
      'Magma cools very slowly deep underground, allowing atoms ample time to form orderly crystals',
      'Lava cools instantly in ocean water, freezing large crystals in place',
      'High wind speeds on the surface polish the crystal facets',
      'They absorb crystals from surrounding tree roots'
    ],
    correctIndex: 0,
    explanation: 'Intrusive (plutonic) rocks cool slowly deep within the insulating crust, providing ample time for large mineral crystals of quartz, feldspar, and mica to grow.',
    hints: [
      'Think about cooling speed: deep underground vs open surface.',
      'Slow cooling gives mineral atoms time to arrange into large crystals.',
      'Granite cools over tens of thousands of years beneath insulating country rock.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_geo_004',
    nodeId: NODE_C9_GEO_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why are fossils found almost exclusively in sedimentary rocks rather than igneous rocks?',
    options: [
      'Molten magma/lava exceeds 600°C–1000°C, destroying organic remains, whereas sediments bury organisms gently at low temperatures',
      'Animals refuse to walk on volcanic ground',
      'Sedimentary rocks are older than the Earth itself',
      'Fossils only form when struck by lightning on river banks'
    ],
    correctIndex: 0,
    explanation: 'Igneous rocks form from molten liquid at temperatures exceeding 600°C which incinerates organic matter. Sedimentary rocks form by gentle, cold layer-by-layer accumulation that preserves shells, bones, and plant matter.',
    hints: [
      'Consider the temperature of molten lava vs a gentle riverbed.',
      'Extreme heat incinerates any organic tissue or bone structure.',
      'Low-temperature burial in sediment allows fossils to mineralise and survive.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_geo_005',
    nodeId: NODE_C9_GEO_015,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under intense heat and confining pressure, what does sedimentary limestone metamorphose into?',
    options: ['Marble', 'Slate', 'Quartzite', 'Gneiss'],
    correctIndex: 0,
    explanation: 'Limestone recrystallises in the solid state under heat and confining pressure into marble (used in monuments like the Taj Mahal).',
    hints: [
      'Think of Rajasthan quarries (Makrana) that supplied the Taj Mahal.',
      'Shale turns into slate, sandstone into quartzite, and limestone into marble.',
      'The calcite crystals fuse into a sugary, crystalline non-foliated rock: Marble.'
    ],
  },
  {
    id: 'ch_geo_006',
    nodeId: NODE_C9_GEO_017,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the volcanic anatomical terms to their correct structural locations.',
    dragItems: [
      { label: 'Magma Chamber', targetId: 'part_bottom' },
      { label: 'Central Vent', targetId: 'part_middle' },
      { label: 'Crater', targetId: 'part_top' },
      { label: 'Lava Cone', targetId: 'part_flank' },
    ],
    correctMapping: {
      part_bottom: 'Magma Chamber',
      part_middle: 'Central Vent',
      part_top: 'Crater',
      part_flank: 'Lava Cone',
    },
    explanation: 'Magma is stored underground in the magma chamber, rises via the pipe-like vent, erupts from the bowl-shaped crater, and builds up the conical flank.',
    hints: [
      'The subterranean reservoir at the base is the magma chamber.',
      'The pipe through the core is the vent, leading to the bowl-shaped crater at the peak.',
      'The outer sloping walls built of cooled layers form the cone.'
    ],
  },
  {
    id: 'ch_geo_007',
    nodeId: NODE_C9_GEO_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the point on the Earth surface situated directly vertically above an earthquake focus called?',
    options: ['Epicentre', 'Hypocentre', 'Fault Plane', 'Seismic Trench'],
    correctIndex: 0,
    explanation: 'The focus (or hypocentre) is the subterranean rupture point, while the epicentre is the surface point directly above it where shaking is typically strongest.',
    hints: [
      'Prefix "epi-" means "upon" or "above".',
      'Hypocentre/focus is deep below; epicentre is on the ground surface.',
      'The point on the surface directly above the focus is the epicentre.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_geo_008',
    nodeId: NODE_C9_GEO_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does frost action (freeze-thaw wedging) occur predominantly in cold mountainous regions like the upper Himalayas?',
    options: [
      'Water seeps into rock fissures by day and expands by ~9% in volume when freezing at night, exerting immense bursting pressure',
      'Ice becomes heavier than rock and crushes the mountain peaks',
      'Snow chemically dissolves granite into carbonic acid',
      'Wind blows snow so fast that it carves caves like sandpaper'
    ],
    correctIndex: 0,
    explanation: 'Water expands by roughly 9% upon freezing into ice, generating over 2,000 kg/cm² of pressure inside rock cracks, wedging them apart.',
    hints: [
      'What happens to the volume of liquid water when it turns into solid ice in your freezer?',
      'Water expands by ~9% upon freezing.',
      'This volumetric expansion exerts huge outwards pressure that wedges rock fissures apart.'
    ],
  },

  // Standard (8 challenges)
  {
    id: 'ch_geo_009',
    nodeId: NODE_C9_GEO_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Patagonian Plateau sits at the foot of the Andes Mountains in South America. What category of plateau does it represent?',
    options: ['Piedmont Plateau', 'Intermontane Plateau', 'Continental Shield', 'Volcanic Plateau'],
    correctIndex: 0,
    explanation: 'Piedmont ("pied" = foot, "mont" = mountain) plateaus lie at the foot/base of a single mountain range, flanked on the other side by low plains or sea.',
    hints: [
      'Translate "pied" (foot) and "mont" (mountain).',
      'It is not enclosed between two ranges (that would be intermontane).',
      'It sits at the base/foot of the Andes, making it a Piedmont plateau.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_geo_010',
    nodeId: NODE_C9_GEO_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Indo-Gangetic Plain exceptionally fertile, while the Canadian Shield plain has thin, poor soils?',
    options: [
      'The Indo-Gangetic Plain is a depositional plain constantly renewed with mineral-rich alluvium, while the Canadian Shield is an erosional plain scraped bare by Pleistocene glaciers',
      'The Canadian Shield was burned by volcanoes, while the Ganga never floods',
      'The Indo-Gangetic Plain is an intermontane plateau at 4,000m altitude',
      'The Canadian Shield is formed purely of chemical rock salt'
    ],
    correctIndex: 0,
    explanation: 'Depositional plains accumulate fresh, nutrient-rich river silt (alluvium), whereas erosional shield plains had their topsoils stripped away by ancient ice sheets.',
    hints: [
      'Look at how each plain was formed: deposition vs glacial erosion.',
      'Himalayan rivers bring fresh silt continuously to the Indo-Gangetic basin.',
      'Glacial scraping left the Canadian Shield stripped down to hard bedrock.'
    ],
  },
  {
    id: 'ch_geo_011',
    nodeId: NODE_C9_GEO_016,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the transformation sequence of a silica grain from molten magma to metamorphic quartzite.',
    sortItems: [
      'Magma cools slowly underground to crystallise into granite',
      'Weathering and erosion break granite into quartz sand grains',
      'Sand is transported, deposited in basins, compacted, and cemented (lithification) into sandstone',
      'Tectonic burial subjects sandstone to intense heat and pressure, recrystallising it into quartzite'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The cycle follows: Igneous crystallisation (granite) → Weathering into sediment (sand) → Lithification into sedimentary rock (sandstone) → Metamorphic recrystallisation (quartzite).',
    hints: [
      'Start with the primary molten stage.',
      'Next, the rock must be broken down and transported by rivers.',
      'Then compaction/cementation creates sandstone, which gets baked into quartzite.'
    ],
  },
  {
    id: 'ch_geo_012',
    nodeId: NODE_C9_GEO_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Hawaiian shield volcanoes (e.g., Kilauea) with composite volcanoes (e.g., Mt St Helens). What governs their different eruptive behaviours?',
    options: [
      'Shield volcanoes erupt basic lava (low silica, runny, gases escape easily), whereas composite volcanoes erupt acidic lava (high silica, viscous, traps gases causing violent explosions)',
      'Shield volcanoes are cold, while composite volcanoes contain radioactive uranium',
      'Shield volcanoes only erupt steam, while composite volcanoes erupt pure diamonds',
      'Shield volcanoes form exclusively in the Arctic circle'
    ],
    correctIndex: 0,
    explanation: 'Silica content determines viscosity. Low-silica basic lava flows easily for kilometres building wide shields; high-silica acidic lava is sticky, traps pressurized gases, and explodes violently to form steep composite cones.',
    hints: [
      'Think about silica (SiO₂) content and liquid thickness (viscosity).',
      'Low silica = runny (basic) = gentle shield.',
      'High silica = thick & sticky (acidic) = trapped gases = explosive composite cone.'
    ],
  },
  {
    id: 'ch_geo_013',
    nodeId: NODE_C9_GEO_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On the logarithmic Richter scale, each whole number increase represents approximately a 31.6-fold increase in energy release. By what factor is a Richter 7 earthquake more energetic than a Richter 5 earthquake? (31.6² ≈ ?)',
    correctAnswer: 1000,
    tolerance: 50,
    unit: 'times',
    explanation: 'A 2-unit jump on the Richter scale equals 31.6 × 31.6 ≈ 1,000 times more energy released at the focus.',
    hints: [
      'The difference between magnitude 7 and magnitude 5 is 2 units (ΔM = 2).',
      'Calculate (31.6) * (31.6).',
      '31.6 squared is approximately 1,000 times more energy.'
    ],
  },
  {
    id: 'ch_geo_014',
    nodeId: NODE_C9_GEO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the humid, high-rainfall limestone hills of Meghalaya (Cherrapunji/Mawsynram), which weathering process forms extensive karst caves and sinkholes?',
    options: ['Carbonation', 'Exfoliation', 'Block Disintegration', 'Frost Wedging'],
    correctIndex: 0,
    explanation: 'Carbonation occurs when rainwater absorbs atmospheric CO₂ to form weak carbonic acid (H₂CO₃), which dissolves calcium carbonate (CaCO₃) in limestone into soluble calcium bicarbonate.',
    hints: [
      'Rainwater + Carbon dioxide = Weak Carbonic Acid.',
      'Acid dissolves limestone rocks in wet tropical climates.',
      'This chemical dissolution is called carbonation.'
    ],
  },
  {
    id: 'ch_geo_015',
    nodeId: NODE_C9_GEO_020,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In river geomorphology, what is the crucial distinction between "abrasion (corrasion)" and "attrition"?',
    options: [
      'Abrasion is the load scraping and scouring the river bed/banks; attrition is load particles colliding with each other and becoming rounded',
      'Abrasion happens in oceans; attrition happens in clouds',
      'Abrasion is chemical dissolving; attrition is biological plant growth',
      'They are identical terms with no difference whatsoever'
    ],
    correctIndex: 0,
    explanation: 'Abrasion (corrasion) is the "sandpaper" effect of rock tools scouring the channel walls; attrition is the internal collision among rock fragments grinding each other smooth and round.',
    hints: [
      'Think: What is being worn down? The river bank or the pebbles themselves?',
      'Abrasion wears down the channel bedrock like sandpaper.',
      'Attrition wears down the rolling pebbles against one another.'
    ],
  },
  {
    id: 'ch_geo_016',
    nodeId: NODE_C9_GEO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does a river sort its deposited sediment load when its gradient flattens and velocity drops?',
    options: [
      'Heaviest particles (boulders/gravel) drop first, medium sand next, and fine silt/clay are carried farthest',
      'Lightest clay particles drop first, while boulders float to the sea',
      'All particles regardless of mass drop at exactly the same instant in a jumbled heap',
      'Dissolved chemicals freeze solid before any pebbles drop'
    ],
    correctIndex: 0,
    explanation: 'Deposition is governed by kinetic energy. As velocity wanes, the river loses power to transport large masses first, depositing gravel near the mountain base and fine silt at the delta front.',
    hints: [
      'Which requires more water energy to push: a 50kg boulder or a microscopic grain of clay?',
      'When speed decreases, heavy objects stop moving first.',
      'Sorting by size: Boulders → Sand → Silt → Clay.'
    ],
  },

  // Advanced (6 challenges)
  {
    id: 'ch_geo_017',
    nodeId: NODE_C9_GEO_011,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the geological identity of the Deccan Plateau of India. Why is it classified under BOTH Continental Shield and Volcanic Plateaus?',
    options: [
      'Its basement is an ancient Precambrian stable continental shield, while its surface comprises massive Cretaceous basaltic lava flows (Deccan Traps)',
      'It was an iceberg that floated from Antarctica and got covered in coal',
      'It is an intermontane plateau trapped between the Andes and Rockies',
      'It is formed purely of coral reefs elevated by recent earthquakes'
    ],
    correctIndex: 0,
    explanation: 'The Deccan represents a dual geological classification: structurally, it forms the ancient stable Gondwana continental shield core; lithologically, massive Cretaceous flood basalts (Deccan Traps) created its stepped tableland.',
    hints: [
      'Think about its underlying ancient basement rock vs its surface lava layers.',
      'Ancient stable crust = continental shield.',
      'Massive basaltic fissure eruptions 66 million years ago = volcanic plateau (Deccan Traps).'
    ],
  },
  {
    id: 'ch_geo_018',
    nodeId: NODE_C9_GEO_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does shale transform into foliated slate under directed tectonic pressure, whereas limestone transforms into non-foliated marble under uniform confining pressure?',
    options: [
      'Directed pressure aligns platy mica/clay minerals into parallel cleavage sheets (foliation), while uniform confining pressure recrystallises equant calcite grains into a non-banded mosaic',
      'Slate is formed in water, whereas marble is formed in outer space',
      'Limestone contains iron magnets that resist directed pressure',
      'Shale melts completely into lava before solidifying'
    ],
    correctIndex: 0,
    explanation: 'Directed tectonic compression forces flat, platy clay and mica crystals in shale to align perpendicularly to stress into cleavage sheets (foliation). Confining pressure acts equally in all directions, fusing calcite into interlocking crystalline marble without banding.',
    hints: [
      'Consider the direction of tectonic forces: one specific direction vs equal in all directions.',
      'Platy clay minerals align into flat sheets under directional squeeze = foliation.',
      'Calcite grains grow equally in all directions under uniform confining pressure = non-foliated.'
    ],
  },
  {
    id: 'ch_geo_019',
    nodeId: NODE_C9_GEO_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Seismologists analyse P, S, and Surface (L) waves to locate epicentres and assess structural hazards. Why do L-waves cause the greatest architectural devastation despite arriving last?',
    options: [
      'L-waves travel along the Earth crustal surface with large amplitude, low frequency, and complex horizontal/vertical ground rolling motions',
      'L-waves are made of pure electrical lightning bolts',
      'L-waves travel faster than the speed of sound, creating sonic booms',
      'L-waves only pass through magma chambers inside volcanoes'
    ],
    correctIndex: 0,
    explanation: 'P and S waves radiate into deep body rock, whereas L-waves (Rayleigh & Love) are bound to the surface layer, dissipating energy slowly with large horizontal and vertical displacements that topple buildings.',
    hints: [
      'P & S are body waves that dive through the globe; L-waves are surface waves.',
      'Surface waves concentrate their energy right at the foundation of buildings.',
      'Their large amplitude ground motions swing structures beyond their shear strength.'
    ],
  },
  {
    id: 'ch_geo_020',
    nodeId: NODE_C9_GEO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the semi-arid granitic tors of Telangana and Karnataka, massive curved shells of rock detach and peel away from boulders. What specific physical weathering mechanism is this?',
    options: ['Exfoliation (Onion-skin peeling)', 'Hydration', 'Carbonation', 'Biological Root Wedging'],
    correctIndex: 0,
    explanation: 'Granite is a poor conductor of heat. Intense daytime solar radiation heats and expands the outer rock shell while the interior stays cool; nightly contraction sets up differential stresses causing concentric sheets to peel off (exfoliation).',
    hints: [
      'Think of layers peeling away like the concentric rings of an onion.',
      'Rock surfaces expand in hot daylight and contract in cool nights.',
      'This produces rounded exfoliation domes and tors in granite terrains.'
    ],
  },
  {
    id: 'ch_geo_021',
    nodeId: NODE_C9_GEO_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the dynamic life-cycle of a river meander cutoff forming an oxbow lake by choosing the 3 critical stages in order.',
    availableParts: [
      'Continuous hydraulic undercutting on outer concave banks & deposition on inner slip-off slopes',
      'Progressive narrowing of the meander neck during severe monsoon floods',
      'River breaches narrow neck, carves straight chute channel, and silts up old loop into an oxbow lake',
      'Glacier melts and deposits terminal moraine across river mouth',
      'Volcanic fissure creates basalt dam across the valley'
    ],
    targetState: 'Continuous hydraulic undercutting on outer concave banks & deposition on inner slip-off slopes Progressive narrowing of the meander neck during severe monsoon floods River breaches narrow neck, carves straight chute channel, and silts up old loop into an oxbow lake',
    validationHint: 'Select: (1) Outer erosion/inner deposition → (2) Neck narrowing during floods → (3) Neck cutoff & loop abandonment.',
    explanation: 'Oxbow lakes form when continuous lateral erosion on outer concave banks narrows the neck until a flood breaches the channel directly, leaving the abandoned silted curve as a crescent lake.',
    hints: [
      'Step 1 involves asymmetrical bank erosion (outer curve undercut, inner curve deposition).',
      'Step 2 is the narrowing of the land bridge separating the two loops.',
      'Step 3 is the flood breakthrough that isolates the abandoned loop.'
    ],
  },
  {
    id: 'ch_geo_022',
    nodeId: NODE_C9_GEO_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why structural engineering disaster response teams prioritize the Modified Mercalli scale over the Richter scale when designing local building codes in Kutch or Chamoli.',
    options: [
      'The Mercalli scale measures observed local ground destruction and structural damage (I–XII) which varies by soil and distance, whereas Richter gives only a single energy magnitude number',
      'The Mercalli scale is cheaper to calculate using water buckets',
      'Richter scale numbers only work in North America',
      'Mercalli measurements can predict earthquakes 10 days in advance'
    ],
    correctIndex: 0,
    explanation: 'A single Richter magnitude (e.g., M 7.7 Bhuj) does not reveal local soil liquefaction or structural resonance. Mercalli intensity maps show specific ground shaking variations essential for local building code zoning.',
    hints: [
      'Does a single total energy number tell you how much a specific building shook in a specific valley?',
      'Richter = 1 number for whole event (magnitude).',
      'Mercalli = mapped local destruction (intensity I to XII) that tells engineers what structures endured.'
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c9_geo_011',
  title: 'Landforms, Rocks & Dynamic Earth Processes',
  definition: 'The solid crust of the Earth is sculpted by endogenous forces (tectonism, vulcanism, metamorphism) creating plateaus, mountains, and igneous/metamorphic rocks, and exogenous forces (weathering, denudation, river erosion/deposition) generating plains, sedimentary rocks, and river landforms.',
  eli5: 'Think of Earth as a giant creative kitchen: underground heat bakes, melts, and shakes rocks into plateaus and volcanoes, while wind, rain, and rivers carve, grind, and layer them into plains and fertile valleys.',
  misconceptions: [
    { misconception: 'A plateau is just a high plain with no distinguishing features.', correction: 'A plateau is an elevated tableland rising sharply above lowlands with steep sides, whereas plains lie low (<500m) with gentle relief.' },
    { misconception: 'Granite has large crystals because it cooled rapidly on the surface.', correction: 'Granite cools slowly deep underground, giving mineral crystals thousands of years to grow large.' },
    { misconception: 'Piedmont plateaus are enclosed between two mountain ranges.', correction: 'Piedmont plateaus sit at the foot of ONE mountain range (e.g. Patagonia); intermontane plateaus are locked between two ranges (e.g. Tibet).' },
    { misconception: 'Igneous rocks contain fossils if they are ancient enough.', correction: 'Igneous rocks crystallise from molten lava/magma above 600°C which completely incinerates organic matter.' },
    { misconception: 'The epicentre is the point deep underground where an earthquake starts.', correction: 'The underground rupture origin is the focus (hypocentre); the epicentre is the point on the ground surface directly above it.' },
  ],
  diagnosticQuestions: [
    { question: 'Which plateau is enclosed between the Himalayas and the Kunlun mountains?', options: ['Tibetan Plateau', 'Deccan Plateau', 'Patagonian Plateau', 'Columbia Plateau'], correctIndex: 0 },
    { question: 'Which rock type is formed from the compaction and cementation of sediments?', options: ['Sedimentary', 'Igneous', 'Metamorphic', 'Plutonic'], correctIndex: 0 },
    { question: 'What rock is formed when limestone undergoes metamorphism?', options: ['Marble', 'Slate', 'Quartzite', 'Basalt'], correctIndex: 0 },
    { question: 'What type of lava creates broad, gently sloping shield volcanoes?', options: ['Basic / Fluid lava (low silica)', 'Acidic / Viscous lava (high silica)', 'Granitic slurry', 'Carbonic steam'], correctIndex: 0 },
    { question: 'Which seismic wave causes the maximum structural damage on the surface?', options: ['L (Surface) waves', 'P (Primary) waves', 'S (Secondary) waves', 'Infrasound waves'], correctIndex: 0 },
    { question: 'What percentage does water expand by when freezing in rock fissures?', options: ['Approximately 9%', 'Over 50%', 'Exactly 0%', 'Less than 0.1%'], correctIndex: 0 },
    { question: 'What landform is created when a river meander loop is cut off during a flood?', options: ['Oxbow lake', 'Gorge', 'Alluvial fan', 'Peneplain'], correctIndex: 0 },
    { question: 'Which plain is formed by the accumulation of river silt over millions of years?', options: ['Indo-Gangetic Plain', 'Canadian Shield', 'Great Plains', 'Deccan Traps'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery of ICSE Class 9 Physical Geography: Plateaus, Plains, Rock Cycle, Volcanoes, Earthquakes, Weathering, and River Denudation.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Plateau Morphology & Classification',
    instruction: 'Adjust the tectonic uplift and mountain flank sliders to transform a flat plain into Intermontane, Piedmont, and Shield plateaus.',
    interactionType: 'plateau-morph',
    nodeId: NODE_C9_GEO_011,
  },
  {
    title: 'Lab 2: The Interactive Rock Cycle Engine',
    instruction: 'Switch between Igneous, Sedimentary, and Metamorphic environments to trace mineral transformations in real time.',
    interactionType: 'rock-cycle',
    nodeId: NODE_C9_GEO_016,
  },
  {
    title: 'Lab 3: Volcanic Viscosity & Eruption Simulator',
    instruction: 'Manipulate silica content and dissolved gas pressure to compare gentle Hawaiian lava flows with explosive composite eruptions.',
    interactionType: 'volcano-sim',
    nodeId: NODE_C9_GEO_017,
  },
  {
    title: 'Lab 4: Seismic Fault Rupture & Wave Propagator',
    instruction: 'Increase fault strain until rupture to observe P-wave, S-wave, and damaging L-wave propagation through the crust.',
    interactionType: 'earthquake-sim',
    nodeId: NODE_C9_GEO_018,
  },
  {
    title: 'Lab 5: River Valley Denudation & Meander Sandbox',
    instruction: 'Change river discharge and slope gradient to watch V-shaped gorges, meander loops, and oxbow cutoff formation.',
    interactionType: 'river-sim',
    nodeId: NODE_C9_GEO_020,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If magma has very low silica content (<50%), what kind of volcanic eruption and cone will form?',
    options: [
      'Gentle effusion of runny lava building a wide, gently sloping shield volcano',
      'Catastrophic violent explosion building a needle-thin spire of pumice',
      'No eruption occurs because silica is required for heat',
      'The volcano collapses instantly into a frozen glacier'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Silica slider to Low (<50%) and observe the lava viscosity gauge and gentle shield slope.',
    nodeId: NODE_C9_GEO_017,
  },
  {
    question: 'Predict: As a river transitions from steep mountain upper course to flat coastal lower course, what happens to sediment sorting?',
    options: [
      'Heavy gravel and boulders deposit first; fine clay stays in suspension and deposits farthest at the delta',
      'Microscopic clay particles drop instantly in the mountains while boulders float to the sea',
      'All sediments are dropped in one unsorted heap at the river source',
      'No deposition occurs anywhere along the entire course'
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the River Gradient slider from Mountain (high) to Plain (low) to witness particle sorting.',
    nodeId: NODE_C9_GEO_020,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the crystal size when rock crystallisation takes 50,000 years vs 5 hours?',
    observableOptions: [
      'Slow cooling produces large interlocking crystals (Granite), while rapid surface cooling produces fine crystals or glass (Basalt/Obsidian)',
      'Fast cooling creates massive crystals that fill the room',
      'Cooling time has zero effect on crystal geometry',
      'Crystals only form if the rock is exposed to sunlight'
    ],
    correctIndex: 0,
    nodeId: NODE_C9_GEO_013,
  },
  {
    question: 'What happens along the outer bend of a river meander compared to the inner bend?',
    observableOptions: [
      'Outer bend experiences high velocity & hydraulic undercutting (erosion); inner bend experiences low velocity & alluvium deposition',
      'Both bends erode at the exact same rate in opposite directions',
      'Outer bend forms sandbars while inner bend carves deep gorges',
      'The river stops flowing completely at every bend'
    ],
    correctIndex: 0,
    nodeId: NODE_C9_GEO_020,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Surveyor Field Mission: Indian Geotechnical Assessment',
  description: 'Apply your lithospheric and geomorphological mastery to 4 key geographical zones of the Indian Subcontinent:',
  steps: [
    'Analyze the Deccan Traps (Maharashtra) for basalt rock quarrying and black regur soil fertility',
    'Assess Himalayan fault rupture zones (Uttarakhand/Himachal) for earthquake early-warning protocols',
    'Map the Cherrapunji karst limestone terrain (Meghalaya) for subterranean cave stability',
    'Design flood protection levees and agricultural zoning across the active Ganga-Brahmaputra delta (Sundarbans)'
  ],
};

// ─── MAIN COMPONENT ───
function C9_GeographyLandformsPlateausSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant-style exploration & interaction states
  const [plateauType, setPlateauType] = useState<'intermontane' | 'piedmont' | 'shield' | 'volcanic'>('intermontane');
  const [plateauUplift, setPlateauUplift] = useState(60); // 0 to 100
  const [mountainFlankCount, setMountainFlankCount] = useState(2); // 0 = shield, 1 = piedmont, 2 = intermontane

  // Rock Cycle interactive states
  const [activeRockStage, setActiveRockStage] = useState<'magma' | 'igneous' | 'sediment' | 'sedimentary' | 'metamorphic'>('magma');

  // Volcano interactive states
  const [lavaSilicaPercent, setLavaSilicaPercent] = useState(48); // 45% (basic) to 75% (acidic)
  const [isVolcanoErupting, setIsVolcanoErupting] = useState(false);

  // Earthquake interactive states
  const [faultStressPercent, setFaultStressPercent] = useState(40);
  const [seismicRuptureOccurred, setSeismicRuptureOccurred] = useState(false);
  const [seismicWaveType, setSeismicWaveType] = useState<'P' | 'S' | 'L'>('P');

  // River Denudation interactive states
  const [riverGradient, setRiverGradient] = useState(70); // upper (steep) to lower (flat)
  const [riverDischarge] = useState(50);
  const [meanderSinuosity, setMeanderSinuosity] = useState(1.2);

  // Predict-then-check states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Sandbox state
  const [sandboxMode, setSandboxMode] = useState<'plateaus' | 'volcanoes' | 'rivers' | 'seismology'>('plateaus');

  // Challenge and Gamification State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state (3 hints per challenge)
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construction Challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflections, setReflections] = useState({
    surprising: '',
    explainFriend: '',
    realLife: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Update difficulty based on BKT
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

  // ─── HANDLERS ───

  // 1. Show next escalating hint
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step geomorphological analysis.');
    }
  }, [hintCount, activeChallenge]);

  // 2. Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You spotted the volcanic nature of the Deccan Traps.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 3. Phase navigation handlers
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Earth Dynamics Interactive Labs. Touch and manipulate the geological forces.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition freely in the geomorphology sandbox before starting the board challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your geological knowledge to the test!');
  }, []);

  // 4. Prediction handler
  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation controls to verify your hypothesis.');
  }, []);

  // 5. Observation handler
  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp scientific observation! That directly aligns with empirical geology.' : 'Observe the crystal texture and cooling timeframe carefully.');
  }, []);

  // 6. Volcano Simulation trigger
  const handleTriggerEruption = useCallback(() => {
    setIsVolcanoErupting(true);
    audioManager.play('swoop');
    if (lavaSilicaPercent > 65) {
      speechManager.speak('High silica viscous lava trapped expanding gases — violent explosive composite eruption!');
    } else {
      speechManager.speak('Low silica fluid basalt flows smoothly across the surface — gentle shield effusion.');
    }
    setTimeout(() => setIsVolcanoErupting(false), 3500);
  }, [lavaSilicaPercent]);

  // 7. Earthquake Fault Rupture trigger
  const handleTriggerEarthquake = useCallback(() => {
    setSeismicRuptureOccurred(true);
    audioManager.play('error');
    speechManager.speak('Elastic strain limit exceeded! Fault slippage radiates P, S, and destructive Surface L waves.');
    setTimeout(() => setSeismicRuptureOccurred(false), 3000);
  }, []);

  // 8. Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Expedition complete! You have achieved deep competence across ICSE Class 9 Physical Geography.');
  }, [errors, onComplete]);

  // 9. Next challenge reset handler
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
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // 10. Auto-hint reset timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 11. Answer validation handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate geomorphological analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Examine the comprehensive explanation to clarify this concept.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // 12. Drag start handler
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 13. Drag drop handler
  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  // 14. Drag sort handlers
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  // ─── EFFECTS ───

  // Inactivity timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Synchronize Plateau Type based on mountainFlankCount
  useEffect(() => {
    if (mountainFlankCount === 2) setPlateauType('intermontane');
    else if (mountainFlankCount === 1) setPlateauType('piedmont');
    else setPlateauType('shield');
  }, [mountainFlankCount]);

  // Verify Prediction automatically when variables match condition
  useEffect(() => {
    if (phase === 'explore' && predictionMade && !predictionVerified) {
      if (currentSlide === 2 && lavaSilicaPercent <= 50) {
        setPredictionVerified(true);
        audioManager.play('success');
        speechManager.speak('Prediction verified! Low silica indeed produces fluid basaltic shield cones.');
      } else if (currentSlide === 4 && riverGradient <= 35) {
        setPredictionVerified(true);
        audioManager.play('success');
        speechManager.speak('Prediction verified! Low velocity sorting leaves fine clay at the river mouth.');
      }
    }
  }, [phase, predictionMade, predictionVerified, currentSlide, lavaSilicaPercent, riverGradient]);

  // River Sinuosity Calculation from Gradient and Discharge
  useEffect(() => {
    const calculatedSinuosity = 1.0 + ((100 - riverGradient) / 100) * (riverDischarge / 50) * 1.5;
    setMeanderSinuosity(parseFloat(calculatedSinuosity.toFixed(2)));
  }, [riverGradient, riverDischarge]);

  // Seismic Canvas Particle Pulse Animation
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw crustal stratification background
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fault line
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Wave pulses if rupture or exploring
      const waveRadius = (frame * 2) % (canvas.width / 2);
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height - 15, waveRadius, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = seismicWaveType === 'P' ? '#38bdf8' : seismicWaveType === 'S' ? '#fbbf24' : '#f43f5e';
      ctx.lineWidth = seismicWaveType === 'L' ? 3 : 1.5;
      ctx.stroke();

      // Epicentre marker on surface
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, 10, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Focus marker deep
      ctx.fillStyle = '#eab308';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height - 15, 5, 0, 2 * Math.PI);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, seismicWaveType, seismicRuptureOccurred]);

  // Elevation Profile Data computation
  const elevationData = useMemo(() => {
    return [
      { distance: '0 km', elevation: mountainFlankCount >= 1 ? 4200 : 400, label: mountainFlankCount >= 1 ? 'Fold Range (Andes/Himalaya)' : 'Coastal Plain' },
      { distance: '80 km', elevation: mountainFlankCount >= 1 ? 2800 : 500, label: 'Piedmont Slope' },
      { distance: '200 km', elevation: 1500 + (plateauUplift * 15), label: `${plateauType.toUpperCase()} Tableland` },
      { distance: '350 km', elevation: 1500 + (plateauUplift * 15), label: 'Escarpment Edge' },
      { distance: '450 km', elevation: mountainFlankCount === 2 ? 3800 : 250, label: mountainFlankCount === 2 ? 'Opposing Range (Kunlun)' : 'Lowland Plain' },
    ];
  }, [mountainFlankCount, plateauUplift, plateauType]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* ─── HEADER / SUBJECT MASTERY HUD ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                ICSE Class 9 Geography
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                    : 'bg-amber-950/80 text-amber-300 border-amber-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        {/* HUD Stats */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-right">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Mastery</p>
            <p className="text-sm font-bold text-emerald-400 capitalize">{masteryLevel}</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-right">
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</p>
            <p className="text-sm font-bold text-cyan-400">
              {scoreBreakdown.total > 0 ? `${Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100)}%` : '100%'}
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <motion.div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900/90 rounded-2xl border border-indigo-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🧭</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-200 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 font-medium">{SCENARIO.context}</p>
          </motion.div>

          {/* Discovery Visual Interactive Card */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>💡</span> Curiosity Discovery Challenge (Ungraded)
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant deduction! The Deccan Traps formed via fissure eruptions of basaltic lava.'
                    : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/30 shrink-0"
                >
                  Enter Interactive Discovery Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          
          {/* Step Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{EXPLORATION_STEPS[currentSlide].title}</span>
                <p className="text-amber-300 text-sm mt-1 flex items-center gap-1.5 font-medium">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: PLATEAU MORPHOLOGY & ELEVATION PROFILE (RECHARTS + SVG) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Interactive Controls */}
                  <div className="lg:col-span-4 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Tectonic Parameters</h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Mountain Enclosure Flanks:</span>
                        <span className="font-bold text-indigo-400">{mountainFlankCount === 2 ? '2 (Intermontane)' : mountainFlankCount === 1 ? '1 (Piedmont)' : '0 (Shield)'}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={2}
                        step={1}
                        value={mountainFlankCount}
                        onChange={(e) => setMountainFlankCount(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust Mountain Flank Count"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Plateau Tableland Uplift:</span>
                        <span className="font-bold text-indigo-400">{1500 + plateauUplift * 15} m</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={plateauUplift}
                        onChange={(e) => setPlateauUplift(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                        aria-label="Adjust Plateau Tableland Uplift"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                      <p className="font-bold text-indigo-300 mb-1">Classified Geomorphology:</p>
                      <p>
                        {plateauType === 'intermontane' && 'Tibetan / Bolivian Plateau Type: Elevated flatland locked between opposing mountain cordilleras.'}
                        {plateauType === 'piedmont' && 'Patagonian / Appalachian Plateau Type: Sits at the foot of a single mountain barrier.'}
                        {plateauType === 'shield' && 'Deccan / Western Australian Shield: Vast ancient Precambrian core not enclosed by mountains.'}
                      </p>
                    </div>
                  </div>

                  {/* Multi-Representation: Recharts Cross-Section */}
                  <div className="lg:col-span-8 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <p className="text-xs font-bold text-slate-400 mb-2">Topographical Cross-Section Elevation (meters):</p>
                    <div className="h-56 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={elevationData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="distance" stroke="#64748b" tick={{ fontSize: 10 }} />
                          <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[0, 5000]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Area type="monotone" dataKey="elevation" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#elevationGrad)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400 mt-2 px-2">
                      <span>West Flank</span>
                      <span className="text-amber-400 font-semibold">Tabletop Plateau Surface</span>
                      <span>East Flank</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: ROCK CYCLE INTERACTIVE ENGINE ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(['magma', 'igneous', 'sediment', 'sedimentary', 'metamorphic'] as const).map((stage) => (
                      <motion.button
                        key={stage}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveRockStage(stage);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          activeRockStage === stage
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {stage}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Closed Loop Rock Cycle Diagram */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 700 300" className="w-full h-auto">
                      {/* Central Magma Chamber */}
                      <circle cx="350" cy="50" r="35" fill="#dc2626" opacity={activeRockStage === 'magma' ? 1 : 0.4} className="transition-all" />
                      <text x="350" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MAGMA</text>

                      {/* Igneous Node */}
                      <circle cx="150" cy="130" r="35" fill="#ea580c" opacity={activeRockStage === 'igneous' ? 1 : 0.4} className="transition-all" />
                      <text x="150" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">IGNEOUS</text>

                      {/* Sediment Node */}
                      <circle cx="230" cy="240" r="30" fill="#eab308" opacity={activeRockStage === 'sediment' ? 1 : 0.4} className="transition-all" />
                      <text x="230" y="245" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">SEDIMENT</text>

                      {/* Sedimentary Node */}
                      <circle cx="470" cy="240" r="35" fill="#16a34a" opacity={activeRockStage === 'sedimentary' ? 1 : 0.4} className="transition-all" />
                      <text x="470" y="245" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">SEDIMENTARY</text>

                      {/* Metamorphic Node */}
                      <circle cx="550" cy="130" r="35" fill="#9333ea" opacity={activeRockStage === 'metamorphic' ? 1 : 0.4} className="transition-all" />
                      <text x="550" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">METAMORPHIC</text>

                      {/* Transition Arrows */}
                      <path d="M 320 60 L 180 115" stroke="#ea580c" strokeWidth="2" />
                      <text x="235" y="80" fill="#fed7aa" fontSize="9">Cooling / Solidification</text>

                      <path d="M 160 165 L 215 220" stroke="#eab308" strokeWidth="2" />
                      <text x="150" y="200" fill="#fef08a" fontSize="9">Weathering / Erosion</text>

                      <path d="M 265 240 L 430 240" stroke="#16a34a" strokeWidth="2" />
                      <text x="350" y="255" textAnchor="middle" fill="#bbf7d0" fontSize="9">Lithification (Compaction + Cementation)</text>

                      <path d="M 500 220 L 535 160" stroke="#9333ea" strokeWidth="2" />
                      <text x="535" y="200" fill="#e9d5ff" fontSize="9">Heat + Directed Pressure</text>

                      <path d="M 525 110 L 385 60" stroke="#dc2626" strokeWidth="2" />
                      <text x="470" y="80" fill="#fecaca" fontSize="9">Melting back to Magma</text>
                    </svg>
                  </div>

                  {/* Stage Dynamic Explanation Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-sm">
                    {activeRockStage === 'magma' && (
                      <p className="text-red-300">🔥 <strong>Magma / Lava:</strong> Molten silicate melt (&gt;600°C–1200°C). When trapped deep within the crust it cools slowly as intrusive magma; on the surface it erupts as extrusive lava.</p>
                    )}
                    {activeRockStage === 'igneous' && (
                      <p className="text-amber-300">🪨 <strong>Igneous Rocks:</strong> Primary crystalline rocks (Granite, Basalt, Pumice). Characterized by interlocking crystals, no layers, and zero fossils due to intense heat.</p>
                    )}
                    {activeRockStage === 'sediment' && (
                      <p className="text-yellow-300">⏳ <strong>Sediments:</strong> Loose particulate gravel, quartz sand, clay, and shells produced by exogenous physical/chemical weathering and transported by Himalayan rivers.</p>
                    )}
                    {activeRockStage === 'sedimentary' && (
                      <p className="text-green-300">📚 <strong>Sedimentary Rocks:</strong> Stratified layered rocks (Sandstone, Shale, Limestone, Coal). Bound by mineral cement; preserves the fossil record of life.</p>
                    )}
                    {activeRockStage === 'metamorphic' && (
                      <p className="text-purple-300">⚡ <strong>Metamorphic Rocks:</strong> Solid-state transformation without melting (Granite → Gneiss, Shale → Slate, Limestone → Marble, Sandstone → Quartzite) under directed tectonic stress and geothermal heat.</p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: VOLCANIC VISCOSITY & ERUPTION LAB (PREDICT-THEN-CHECK) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* Predict Hook if not made */}
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-indigo-950/70 border border-indigo-700 rounded-xl">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Pre-Simulation Prediction</p>
                      <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <div className="p-3 bg-amber-950/60 border border-amber-700 rounded-xl text-xs text-amber-300">
                      👉 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Interactive Volcano Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Silica (SiO₂) Content:</span>
                          <span className={`font-bold ${lavaSilicaPercent > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {lavaSilicaPercent}% ({lavaSilicaPercent > 60 ? 'Acidic / High Viscosity' : 'Basic / Fluid'})
                          </span>
                        </div>
                        <input
                          type="range"
                          min={45}
                          max={75}
                          value={lavaSilicaPercent}
                          onChange={(e) => setLavaSilicaPercent(Number(e.target.value))}
                          className="w-full accent-rose-500"
                          aria-label="Adjust Lava Silica Percentage"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleTriggerEruption}
                        className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-rose-600/30"
                      >
                        🌋 Trigger Volcano Eruption Test
                      </motion.button>
                    </div>

                    {/* SVG Dynamic Volcano Cross-Section */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 300 160" className="w-full h-auto">
                        {/* Mountain Slope */}
                        {lavaSilicaPercent > 60 ? (
                          // Steep Composite Strato-cone
                          <polygon points="150,20 50,150 250,150" fill="#334155" stroke="#475569" strokeWidth="2" />
                        ) : (
                          // Broad Shield Slope
                          <polygon points="150,70 10,150 290,150" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                        )}

                        {/* Central Conduit / Vent */}
                        <line x1="150" y1="150" x2="150" y2={lavaSilicaPercent > 60 ? 25 : 75} stroke="#ef4444" strokeWidth="6" />

                        {/* Eruption FX */}
                        {isVolcanoErupting && (
                          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {lavaSilicaPercent > 60 ? (
                              <>
                                <circle cx="150" cy="15" r="20" fill="#f97316" opacity="0.8" />
                                <circle cx="135" cy="5" r="12" fill="#eab308" opacity="0.6" />
                                <circle cx="165" cy="8" r="14" fill="#ef4444" opacity="0.7" />
                              </>
                            ) : (
                              <>
                                <path d="M 150 75 Q 110 90 60 145" stroke="#ef4444" strokeWidth="4" fill="none" />
                                <path d="M 150 75 Q 190 90 240 145" stroke="#ef4444" strokeWidth="4" fill="none" />
                              </>
                            )}
                          </motion.g>
                        )}
                        <text x="150" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                          {lavaSilicaPercent > 60 ? 'Steep Composite Volcano (Mt St Helens)' : 'Broad Shield Volcano (Hawaii Kilauea)'}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: SEISMIC FAULT & CANVAS WAVE PROPAGATOR ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Tectonic Fault Stress</h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Elastic Strain Accumulation:</span>
                        <span className="font-bold text-rose-400">{faultStressPercent}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={faultStressPercent}
                        onChange={(e) => setFaultStressPercent(Number(e.target.value))}
                        className="w-full accent-rose-500"
                        aria-label="Adjust Fault Stress Percentage"
                      />
                    </div>

                    <div className="flex gap-2">
                      {(['P', 'S', 'L'] as const).map((w) => (
                        <motion.button
                          key={w}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSeismicWaveType(w)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                            seismicWaveType === w
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-900 text-slate-400 border border-slate-800'
                          }`}
                        >
                          {w}-Wave
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleTriggerEarthquake}
                      className="w-full py-2 bg-rose-700 hover:bg-rose-600 text-white rounded-xl text-xs font-bold uppercase"
                    >
                      ⚡ Trigger Fault Rupture
                    </motion.button>
                  </div>

                  {/* HTML5 Canvas Wave Simulator */}
                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <p className="text-xs font-bold text-slate-400 mb-2">Seismic Crustal Propagation (2D Canvas)</p>
                    <canvas ref={canvasRef} width={360} height={150} className="w-full rounded-lg border border-slate-800 shadow-inner" />
                    <div className="flex justify-between w-full text-[10px] text-slate-400 mt-2 px-1">
                      <span className="text-red-400">● Surface Epicentre</span>
                      <span className="text-yellow-400">● Subterranean Focus</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: RIVER DENUDATION & MEANDER DYNAMICS (OBSERVATION LAB) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>River Gradient & Course:</span>
                          <span className="font-bold text-cyan-400">{riverGradient > 60 ? 'Upper (Mountain Gorge)' : riverGradient > 30 ? 'Middle (Meanders)' : 'Lower (Delta / Floodplain)'}</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={90}
                          value={riverGradient}
                          onChange={(e) => setRiverGradient(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                          aria-label="Adjust River Gradient"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
                        <p className="font-bold text-cyan-300">Dominant Fluvial Process:</p>
                        <p>
                          {riverGradient > 60 && 'Vertical Hydraulic Downcutting: Carving V-shaped valleys and waterfalls (e.g., Jog Falls).'}
                          {riverGradient <= 60 && riverGradient > 30 && 'Lateral Erosion & Sinuous Meandering: Undercutting outer concave banks.'}
                          {riverGradient <= 30 && 'Extensive Deposition & Sorting: Building fertile floodplains, natural levees, and the Ganga Delta.'}
                        </p>
                      </div>
                    </div>

                    {/* SVG Meander / Valley Dynamic Render */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 300 150" className="w-full h-auto">
                        {riverGradient > 60 ? (
                          // V-Shaped Mountain Canyon
                          <>
                            <polygon points="0,20 150,130 0,150" fill="#334155" />
                            <polygon points="300,20 150,130 300,150" fill="#475569" />
                            <line x1="150" y1="130" x2="150" y2="150" stroke="#38bdf8" strokeWidth="8" />
                            <text x="150" y="145" textAnchor="middle" fill="white" fontSize="10">V-Shaped Mountain Valley</text>
                          </>
                        ) : (
                          // Meandering Channel with Outer Erosion / Inner Deposition
                          <>
                            <path
                              d="M 20 20 Q 140 30 150 75 Q 160 120 280 130"
                              stroke="#0284c7"
                              strokeWidth={riverGradient <= 30 ? 24 : 16}
                              fill="none"
                              strokeLinecap="round"
                            />
                            {/* Oxbow lake remnant if low gradient */}
                            {riverGradient <= 30 && (
                              <path d="M 120 30 Q 80 75 120 110" stroke="#0ea5e9" strokeWidth="8" fill="none" strokeDasharray="3,3" />
                            )}
                            <text x="150" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">
                              {riverGradient <= 30 ? 'Meander Neck Cutoff → Crescent Oxbow Lake' : 'Lateral Erosion & Sinuous Meander Loops'}
                            </text>
                          </>
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-indigo-950/60 border border-indigo-700 rounded-xl">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Scientific Observation Question</p>
                      <p className="text-sm font-semibold text-white mb-3">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="text-left p-2.5 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🧪</span> Geomorphology Free-Play Sandbox
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate any planetary variable with zero grading or pressure.</p>
            </div>

            <div className="flex gap-2">
              {(['plateaus', 'volcanoes', 'rivers', 'seismology'] as const).map((mode) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSandboxMode(mode);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                    sandboxMode === mode ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {mode}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {sandboxMode === 'plateaus' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Elevation Uplift: {1500 + plateauUplift * 15}m</span>
                  <span>Enclosing Flanks: {mountainFlankCount}</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={plateauUplift}
                  onChange={(e) => setPlateauUplift(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                  aria-label="Sandbox Plateau Uplift"
                />
                <div className="h-48 w-full bg-slate-950 rounded-xl p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={elevationData}>
                      <Area type="monotone" dataKey="elevation" stroke="#818cf8" fill="#4f46e5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {sandboxMode === 'volcanoes' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Silica Content: {lavaSilicaPercent}%</span>
                  <span>Flow Type: {lavaSilicaPercent > 60 ? 'Viscous Acidic' : 'Runny Basic'}</span>
                </div>
                <input
                  type="range"
                  min={45}
                  max={75}
                  value={lavaSilicaPercent}
                  onChange={(e) => setLavaSilicaPercent(Number(e.target.value))}
                  className="w-full accent-rose-500"
                  aria-label="Sandbox Lava Silica Percentage"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTriggerEruption}
                  className="w-full py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
                >
                  Trigger Eruption
                </motion.button>
              </div>
            )}

            {sandboxMode === 'rivers' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Gradient: {riverGradient}%</span>
                  <span>Meander Sinuosity: {meanderSinuosity}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={riverGradient}
                  onChange={(e) => setRiverGradient(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                  aria-label="Sandbox River Gradient"
                />
              </div>
            )}

            {sandboxMode === 'seismology' && (
              <div className="space-y-4">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Fault Strain: {faultStressPercent}%</span>
                  <span>Wave Mode: {seismicWaveType}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={faultStressPercent}
                  onChange={(e) => setFaultStressPercent(Number(e.target.value))}
                  className="w-full accent-rose-500"
                  aria-label="Sandbox Fault Strain"
                />
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/20"
          >
            Ready for Challenges! (20+ Board Questions) →
          </motion.button>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          
          {/* Challenge Header & Animated Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-semibold uppercase tracking-wider">
                Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="text-xs text-indigo-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Active Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/30'
                : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {activeChallenge.question}
            </h3>

            {/* MCQ Options */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-2.5">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets on Volcano SVG */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 400 220" className="w-full h-auto">
                    {/* Crater (Top) */}
                    <rect x="140" y="10" width="120" height="35" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="3,3" />
                    <text x="200" y="32" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_top || 'Drop: Peak Bowl Crater'}</text>
                    <rect x="140" y="10" width="120" height="35" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_top')} />

                    {/* Vent (Middle) */}
                    <rect x="140" y="70" width="120" height="35" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="3,3" />
                    <text x="200" y="92" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_middle || 'Drop: Central Vent'}</text>
                    <rect x="140" y="70" width="120" height="35" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_middle')} />

                    {/* Flank Cone */}
                    <rect x="20" y="120" width="120" height="35" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="3,3" />
                    <text x="80" y="142" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_flank || 'Drop: Lava Cone'}</text>
                    <rect x="20" y="120" width="120" height="35" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_flank')} />

                    {/* Magma Chamber (Bottom) */}
                    <rect x="140" y="170" width="120" height="35" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="3,3" />
                    <text x="200" y="192" textAnchor="middle" fill="#94a3b8" fontSize="11">{droppedLabels.part_bottom || 'Drop: Magma Chamber'}</text>
                    <rect x="140" y="170" width="120" height="35" fill="transparent" onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('part_bottom')} />
                  </svg>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Anatomy Labels
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-[10px]">
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
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Transformation Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Calculation
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="text-left p-2 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-lg text-xs text-slate-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] space-y-2">
                  {constructParts.map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-emerald-300 bg-slate-900 p-2 rounded">
                      <span>{idx + 1}. {p}</span>
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 font-bold ml-2">✕</button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <p className="text-slate-500 text-xs">Click stages above in proper sequence</p>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Sequence Construction
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Explanation Card (Progressive Disclosure) */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-indigo-950/40 border border-indigo-700/60 rounded-xl space-y-3">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Geomorphological Breakdown:</h4>
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-200 leading-relaxed">
                    <span className="font-bold text-indigo-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-indigo-800 text-white text-xs font-semibold rounded-lg"
                  >
                    Show next point →
                  </motion.button>
                )}

                {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Expedition →' : 'Next Question →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="text-center p-8 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl border border-indigo-700/50 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">🏆 Geomorphology Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm mt-2">
              Final Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> | Performance Level:{' '}
              <span className="text-indigo-300 font-bold capitalize">{masteryLevel}</span>
            </p>

            <div className="mt-6 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional comprehension of physical geography, rock transformations, tectonic hazards, and river denudation.'
                : errors <= 3
                ? '👏 Excellent Performance! Your understanding of geomorphology is robust and ready for board examinations.'
                : '💪 Good Effort! Review the specific misconception profiles below to cement your understanding of tectonic and denudation dynamics.'}
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Key Learning Reflections
            </h3>
            <p className="text-xs text-slate-400">Consolidate your geomorphological understanding by answering these three metacognitive prompts:</p>

            <div className="space-y-4 mt-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={2}
                  value={reflections.surprising}
                  onChange={(e) => setReflections(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How cooling time dictates crystal sizes in granite, or how the Deccan Traps are both a shield and a volcanic trap..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflections.explainFriend}
                  onChange={(e) => setReflections(prev => ({ ...prev, explainFriend: e.target.value }))}
                  placeholder="e.g., Earth is a continuous recycling engine: underground heat builds plateaus, while rain and rivers carve them into plains..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <label className="block text-xs font-bold text-slate-200 mb-2">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflections.realLife}
                  onChange={(e) => setReflections(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Civil engineering on seismic fault zones, assessing river floodplains before building homes, or choosing granite/marble materials..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setReflectionSubmitted(true);
                  audioManager.play('success');
                }}
                disabled={reflectionSubmitted}
                className={`w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  reflectionSubmitted
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                }`}
              >
                {reflectionSubmitted ? '✓ Reflections Saved to Portfolio' : 'Save Reflections'}
              </motion.button>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-widest">
                Identified Conceptual Revision Points:
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 text-xs">
                    <p className="text-rose-300 font-bold">❌ Common Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 mt-1">✓ Scientific Reality: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility HUD */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <p className="font-bold text-amber-300">📅 Spaced Repetition Review Cycle:</p>
              <p className="text-slate-400 mt-0.5">
                Based on your error frequency, SM-2 recommends revisiting this topic in{' '}
                <span className="text-white font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
              </p>
            </div>
          </div>

          {/* Capstone Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-900/80 text-indigo-300 flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK SYSTEM OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Geomorphology Mastery Module Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C9_GeographyLandformsPlateausSim;