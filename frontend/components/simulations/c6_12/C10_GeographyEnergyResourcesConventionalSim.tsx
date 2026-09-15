'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C10_GEO_011 = 'c10_geo_011'; // Energy resources — conventional
const NODE_C10_GEO_012 = 'c10_geo_012'; // Energy resources — non-conventional
const NODE_C10_GEO_013 = 'c10_geo_013'; // Agriculture — importance and types
const NODE_C10_GEO_014 = 'c10_geo_014'; // Agriculture — food crops
const NODE_C10_GEO_015 = 'c10_geo_015'; // Agriculture — cash crops
const NODE_C10_GEO_016 = 'c10_geo_016'; // Industries — agro-based
const NODE_C10_GEO_017 = 'c10_geo_017'; // Industries — mineral-based
const NODE_C10_GEO_018 = 'c10_geo_018'; // Transport in India
const NODE_C10_GEO_019 = 'c10_geo_019'; // Waste management — impact
const NODE_C10_GEO_020 = 'c10_geo_020'; // Waste management — safe disposal
const NODE_C10_GEO_021 = 'c10_geo_021'; // Waste management — reduce, reuse, recycle

const ALL_NODE_IDS = [
  NODE_C10_GEO_011,
  NODE_C10_GEO_012,
  NODE_C10_GEO_013,
  NODE_C10_GEO_014,
  NODE_C10_GEO_015,
  NODE_C10_GEO_016,
  NODE_C10_GEO_017,
  NODE_C10_GEO_018,
  NODE_C10_GEO_019,
  NODE_C10_GEO_020,
  NODE_C10_GEO_021
];

// ──�� NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Viksit Bharat 2047: National Resource & Infrastructure Command',
  intro:
    'You are appointed Chief Resource Geographer for India’s Planning Council. Across 5 mission zones, you must manage energy transitions, optimize crop yields, position strategic industries, coordinate the multimodal transport grid, and solve the national waste crisis.',
  context:
    'Balance conventional vs renewable power grids, allocate crops based on rainfall and soil profiles, link heavy industries to raw materials, connect the Golden Quadrilateral, and enforce the 3Rs.'
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Mumbai High extracts crude petroleum offshore, but why is Jamnagar (Gujarat) famous in the petroleum geography of India?',
  options: [
    'Jamnagar is where oil wells were first drilled in 1889',
    'Jamnagar is a refinery hub that processes crude oil into usable fuels',
    'Jamnagar generates hydroelectric power for the offshore rigs',
    'Jamnagar is an inland coal mining basin supplying thermal plants'
  ],
  correctIndex: 1,
  hintAfter:
    'Remember: Extraction (drilling crude oil at Mumbai High/Digboi) is distinct from Refining (separating hydrocarbons at Jamnagar, Mathura, or Barauni)!'
};

// ─── BRILLIANT.ORG PREDICTION-THEN-CHECK QUESTIONS ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'If India increases the national Renewable Mix from 30% to 80%, what will happen to the Emissions Index and Fossil Coal dependency in the simulation?',
    options: [
      'The Emissions Index will drop dramatically and Coal share will drop to 20%',
      'The Emissions Index will rise because solar panels emit carbon during the day',
      'Grid Reliability will collapse completely to 0%',
      'Thermal coal requirement will increase by 50%'
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Renewable Mix slider to 80% on Exploration Lab 1 and observe the bar chart.',
    explanation:
      'Expanding renewable generation (solar and wind) directly offsets thermal coal burning, driving carbon emissions downwards while preserving 20% conventional baseload.'
  },
  {
    id: 'pred_02',
    question: 'If you simulate a region with high rainfall (180 cm) and acidic Laterite soil on hill slopes, which crop will achieve maximum suitability?',
    options: [
      'Wheat (Rabi grain requiring cool dry winters and 75 cm rain)',
      'Tea / Coffee (Plantation crop needing high rain but rapid slope drainage)',
      'Cotton (Requiring black regur soil and 210 frost-free days)',
      'Bajra / Millets (Drought-tolerant grain grown in dry sandy tracts)'
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Rainfall to 180 cm and Soil to Laterite on Exploration Lab 2 to verify the optimal crop match.',
    explanation:
      'Tea bushes require abundant precipitation (150-300 cm) and well-drained acidic laterite hill slopes where water does not stagnate around the roots.'
  }
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'Examine the Transport Corridors diagram. What distinct geographic advantage does Broad Gauge Railway offer for heavy mineral logistics compared to Roadways?',
    options: [
      'Direct bulk haulage of 4,000+ tonnes of coal and iron ore from Jharia/Mayurbhanj at lowest cost per tonne-km',
      'Faster door-to-door retail parcel deliveries to residential homes',
      'Zero track maintenance requirement compared to national highways',
      'Navigation through shallow mountain streams without bridges'
    ],
    correctIndex: 0,
    observableOptions: [
      'Direct bulk haulage of 4,000+ tonnes of coal and iron ore from Jharia/Mayurbhanj at lowest cost per tonne-km',
      'Faster door-to-door retail parcel deliveries to residential homes',
      'Zero track maintenance requirement compared to national highways',
      'Navigation through shallow mountain streams without bridges'
    ],
    explanation:
      'Broad Gauge Railways form the economic backbone for hauling bulky raw materials (coal, iron ore, limestone) over continental distances at high volume and low cost.'
  },
  {
    id: 'obs_02',
    question: 'In the Sanitary Landfill engineered cross-section, what observable barrier prevents poisonous leachate liquid from reaching the groundwater table?',
    options: [
      'An impermeable HDPE geomembrane and compacted clay liner with active leachate collection pipes',
      'Open air evaporation without any bottom liner or base seal',
      'A wire mesh fence placed at ground level',
      'Spraying river water over uncompacted municipal garbage'
    ],
    correctIndex: 0,
    observableOptions: [
      'An impermeable HDPE geomembrane and compacted clay liner with active leachate collection pipes',
      'Open air evaporation without any bottom liner or base seal',
      'A wire mesh fence placed at ground level',
      'Spraying river water over uncompacted municipal garbage'
    ],
    explanation:
      'Sanitary landfills use high-density polyethylene (HDPE) sheets and compacted clay at the base to trap percolating toxic leachate, routing it to treatment pipes before it reaches aquifers.'
  }
];

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

// ─── 22 CHALLENGES (COMPREHENSIVE ICSE CLASS 10 COVERAGE) ───
const CHALLENGES: Challenge[] = [
  // 1. Conventional Energy - Foundation Recall
  {
    id: 'ch_01',
    nodeId: NODE_C10_GEO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following states forms the core of India’s Gondwana bituminous coal belt?',
    options: [
      'Jharkhand (Jharia, Bokaro) and Odisha (Talcher)',
      'Rajasthan (Thar) and Punjab (Sutlej)',
      'Kerala (Palakkad) and Goa',
      'Himachal Pradesh (Manikaran) and Ladakh'
    ],
    correctIndex: 0,
    explanation:
      'Jharkhand (Jharia, Bokaro, Ramgarh), Odisha (Talcher, Ib valley), and Chhattisgarh (Korba) form the rich Gondwana coal belt of eastern-central India producing high-grade bituminous coal.',
    hints: [
      'Look for the eastern-central mineral belt known for Damodar and Mahanadi valleys.',
      'Jharia and Talcher are prime coalfields.',
      'Jharkhand and Odisha are the leading bituminous coal producers.'
    ],
    misconceptionIndex: 0
  },
  // 2. Conventional vs Non-Conventional - Foundation Understanding
  {
    id: 'ch_02',
    nodeId: NODE_C10_GEO_011,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is Hydroelectric Power classified as CONVENTIONAL energy in the ICSE syllabus despite being renewable?',
    options: [
      'Because water burns like fossil fuel',
      'Because it has been traditionally used on a large scale with established dam infrastructure for decades',
      'Because it emits large volumes of carbon dioxide and sulphur dioxide',
      'Because it can only be generated in desert states'
    ],
    correctIndex: 1,
    explanation:
      'In ICSE geography, conventional refers to sources with long-established, large-scale commercial usage and infrastructure (like Bhakra Nangal and Hirakud dams), even though water is naturally renewable.',
    hints: [
      'Think about how long dams have powered Indian grids.',
      'Conventional does not strictly mean non-renewable; it denotes traditional, mature commercial usage.',
      'Large dams are established, traditional sources of bulk electrical power in India.'
    ],
    misconceptionIndex: 2
  },
  // 3. Non-conventional Energy - Foundation Drag Label
  {
    id: 'ch_03',
    nodeId: NODE_C10_GEO_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each non-conventional energy resource to its prime Indian geographical location.',
    dragItems: [
      { label: 'Wind Energy', targetId: 'loc_tn' },
      { label: 'Geothermal', targetId: 'loc_hp' },
      { label: 'Tidal Power', targetId: 'loc_guj' },
      { label: 'Solar Insolation', targetId: 'loc_raj' }
    ],
    correctMapping: {
      loc_tn: 'Wind Energy',
      loc_hp: 'Geothermal',
      loc_guj: 'Tidal Power',
      loc_raj: 'Solar Insolation'
    },
    explanation:
      'Muppandal (Tamil Nadu) hosts giant wind clusters; Manikaran (Himachal Pradesh) & Puga (Ladakh) tap geothermal hot springs; Gulf of Kutch/Khambhat (Gujarat) has high tidal range; Rajasthan has maximum solar insolation.',
    hints: [
      'Muppandal at the southern tip is famous for wind farms.',
      'Manikaran in the Parbati valley has natural steaming hot springs.',
      'The Thar desert receives year-round clear skies and intense sunlight.'
    ],
    misconceptionIndex: 1
  },
  // 4. Agriculture Types - Standard Application
  {
    id: 'ch_04',
    nodeId: NODE_C10_GEO_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A 100-hectare estate in Assam cultivates a single perennial beverage crop for export using migrant labour and scientific factories. Which farming system is this?',
    options: [
      'Intensive Subsistence Farming',
      'Plantation Farming (Commercial)',
      'Primitive Shifting Cultivation',
      'Dryland Millet Farming'
    ],
    correctIndex: 1,
    explanation:
      'Plantation farming is a capital-intensive commercial sub-type where a single cash/beverage crop (tea, coffee, rubber) is cultivated on large estates for sale and export.',
    hints: [
      'Notice the large estate scale (100 hectares), scientific management, and export orientation.',
      'Tea in Assam and coffee in Karnataka are classic examples.',
      'It is plantation agriculture.'
    ]
  },
  // 5. Food Crops: Rainfall & Temperature - Standard Numeric
  {
    id: 'ch_05',
    nodeId: NODE_C10_GEO_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Rice (Paddy) in the Ganga-Brahmaputra delta requires high monsoon rainfall. What is the standard benchmark annual rainfall (in cm) required for ideal rice cultivation?',
    correctAnswer: 100,
    tolerance: 15,
    unit: 'cm',
    explanation:
      'Rice requires approximately 100 cm (or more) of rainfall and warm temperatures around 25°C with standing water in flat alluvial fields during the Kharif season.',
    hints: [
      'Wheat needs around 75 cm; rice needs significantly more.',
      'The benchmark is triple-digit centimetres.',
      'Standard textbook requirement is 100 cm.'
    ],
    misconceptionIndex: 0
  },
  // 6. Food Crops: Kharif vs Rabi - Foundation Sort
  {
    id: 'ch_06',
    nodeId: NODE_C10_GEO_014,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the agricultural calendar steps in chronological sequence from monsoon onset to winter harvest.',
    sortItems: [
      'Sow Kharif crops (Rice/Bajra) with Southwest Monsoon onset (June-July)',
      'Harvest Kharif crops during autumn retreat (September-October)',
      'Sow Rabi crops (Wheat/Gram) in cool autumn soils (October-November)',
      'Harvest Rabi crops in sunny spring weather (March-April)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Kharif coincides with the summer monsoon (sown June-July, harvested Sept-Oct). Rabi follows the monsoon retreat (sown Oct-Nov, harvested March-April).',
    hints: [
      'Start with the arrival of the summer rains in June.',
      'Kharif is harvested before Rabi is sown.',
      'Wheat ripens under the bright March sun.'
    ]
  },
  // 7. Cash Crops: Cotton vs Soil - Standard Analysis
  {
    id: 'ch_07',
    nodeId: NODE_C10_GEO_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why does Cotton cultivation strictly concentrate in Gujarat and Maharashtra rather than the wet deltas of West Bengal?',
    options: [
      'Cotton requires swampy waterlogged soils and 300 cm rainfall',
      'Cotton requires black regur soil that retains moisture and at least 210 frost-free days with moderate 100 cm rain',
      'West Bengal has too many cold winter frosts that freeze cotton bolls',
      'Gujarat has acidic mountain soils required for boll formation'
    ],
    correctIndex: 1,
    explanation:
      'Black regur soil (rich in lime, iron, magnesia) retains moisture during dry spells. Cotton also needs ~210 frost-free days and ~100 cm rainfall; excess waterlogging rots the bolls.',
    hints: [
      'Think about the volcanic Deccan trap and its black moisture-retentive soil.',
      'Cotton cannot tolerate waterlogging or frost.',
      'Black regur soil of Maharashtra and Gujarat provides optimal conditions.'
    ],
    misconceptionIndex: 0
  },
  // 8. Cash Crops: Tea Drainage - Standard Analysis
  {
    id: 'ch_08',
    nodeId: NODE_C10_GEO_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why are tea bushes grown on hill slopes of Assam, Darjeeling, and Nilgiris despite needing high rainfall (150-300 cm)?',
    options: [
      'Hill air has less oxygen which increases caffeine concentration',
      'Slopes allow heavy rainwater to drain rapidly, preventing waterlogging which rots tea root systems',
      'Tea cannot grow in direct sunlight and needs mountain shadows',
      'Tractors cannot operate on flat plains'
    ],
    correctIndex: 1,
    explanation:
      'While tea needs abundant rainfall (150-300 cm), stagnant water at its roots is fatal. Hill slopes guarantee instant drainage while maintaining acidic, well-aerated soil.',
    hints: [
      'Consider what happens when water stagnates around delicate root hairs.',
      'Tea needs high rain but zero waterlogging.',
      'Slopes provide swift surface runoff.'
    ],
    misconceptionIndex: 1
  },
  // 9. Agro-based Industries: Key vs Footloose - Standard Analysis
  {
    id: 'ch_09',
    nodeId: NODE_C10_GEO_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why is the Sugar industry strictly raw-material oriented (Key Industry) while Cotton textiles enjoy greater locational flexibility?',
    options: [
      'Sugarcane is heavy and weight-losing with sucrose that deteriorates within 24 hours of cutting; raw cotton is non-perishable and compact to bale',
      'Sugar mills must be located near seaports to export bagasse',
      'Cotton requires heavy coal furnaces to weave yarn',
      'Sugarcane can only be transported by aeroplanes'
    ],
    correctIndex: 0,
    explanation:
      'Sugarcane is perishable and weight-losing (sucrose drops quickly after harvest), forcing mills within a 50 km radius. Raw cotton can be baled and transported long distances without quality loss.',
    hints: [
      'Sugarcane is 70%+ water; once cut, moisture evaporates and sugar content drops.',
      'Cotton can be compressed into bales and hauled anywhere.',
      'Sugarcane is a classic perishable weight-losing raw material.'
    ],
    misconceptionIndex: 0
  },
  // 10. Agro-based: Coastal Textile Advantage - Standard Application
  {
    id: 'ch_10',
    nodeId: NODE_C10_GEO_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'What specific climatic advantage did Mumbai and Surat historically offer for cotton spinning over dry inland cities?',
    options: [
      'Frequent sub-zero temperatures prevented insect attacks on looms',
      'High humid coastal air kept cotton yarn moist, preventing it from snapping during high-speed spinning',
      'Constant dry desert winds dried the dyed cloth in minutes',
      'Heavy tropical cyclones cleaned the cotton fibres automatically'
    ],
    correctIndex: 1,
    explanation:
      'Humid maritime air prevents cotton yarn from becoming brittle and snapping on spinning spindles, giving coastal hubs like Mumbai, Surat, and Ahmedabad a major natural edge.',
    hints: [
      'Think about yarn strength in dry vs humid atmospheres.',
      'Moisture makes cotton strands supple and resilient.',
      'Humid coastal climate ensures smooth spinning without frequent thread snaps.'
    ]
  },
  // 11. Mineral-based: Steel Plant raw materials - Advanced Construct
  {
    id: 'ch_11',
    nodeId: NODE_C10_GEO_017,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Assemble the essential raw-material quartet required to operate an integrated blast furnace steel plant like Tata Steel Jamshedpur.',
    availableParts: ['Iron Ore', 'Coking Coal', 'Limestone', 'Manganese', 'Crude Petroleum', 'Bauxite', 'Raw Cotton'],
    targetState: 'Iron Ore Coking Coal Limestone Manganese',
    validationHint: 'Select the 4 key mineral inputs: base metal ore, thermal reducer fuel, slag flux, and hardening alloy.',
    explanation:
      'Integrated steel plants require Iron Ore (from Mayurbhanj/Noamundi), Coking Coal (from Jharia), Limestone (as flux), and Manganese (for tensile alloy strength).',
    hints: [
      'You need two heavy bulk minerals (ore and coal) plus two vital additives (flux and alloy).',
      'Limestone purifies impurities into slag, while Manganese toughens the steel.',
      'Pick: Iron Ore, Coking Coal, Limestone, Manganese.'
    ]
  },
  // 12. Mineral-based: Electronics as Footloose - Advanced Evaluation
  {
    id: 'ch_12',
    nodeId: NODE_C10_GEO_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Bengaluru and Hyderabad became India’s premier electronics and software hubs rather than Jamshedpur or Dhanbad because electronics is a:',
    options: [
      'Key raw-material weight-gaining industry needing heavy coal beds',
      'Footloose industry governed by skilled engineering talent, research institutes, pleasant climate, and digital infrastructure',
      'Subsistence industry dependent exclusively on local river water volume',
      'Mineral smelting industry tied to copper mines'
    ],
    correctIndex: 1,
    explanation:
      'Electronics is a footloose industry whose components are light and high in value. Its primary location drivers are human skill, R&D labs, mild climate, and digital connectivity, not mineral mines.',
    hints: [
      'Electronics does not require tonnes of coal or iron ore at the factory gate.',
      'Footloose industries can locate anywhere with skilled brains and good connectivity.',
      'Bengaluru offers engineering colleges, IT parks, and moderate weather.'
    ],
    misconceptionIndex: 0
  },
  // 13. Transport: Railway Gauges - Foundation Recall
  {
    id: 'ch_13',
    nodeId: NODE_C10_GEO_018,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the standard Indian Railway gauge width with its correct measurement.',
    options: [
      'Broad Gauge = 1676 mm, Metre Gauge = 1000 mm, Narrow Gauge = 762 mm',
      'Broad Gauge = 2000 mm, Metre Gauge = 1200 mm, Narrow Gauge = 500 mm',
      'Broad Gauge = 1000 mm, Metre Gauge = 1676 mm, Narrow Gauge = 762 mm',
      'Broad Gauge = 762 mm, Metre Gauge = 1000 mm, Narrow Gauge = 1676 mm'
    ],
    correctIndex: 0,
    explanation:
      'Indian Railways uses Broad Gauge (1676 mm — main trunk routes), Metre Gauge (1000 mm — unified under Project Unigauge), and Narrow Gauge (762 mm / 610 mm — mountain heritage lines).',
    hints: [
      'Broad is the widest (1.676 metres).',
      'Metre gauge is exactly 1 metre (1000 mm).',
      'Narrow gauge is used in hill tracks like Darjeeling and Kalka-Shimla.'
    ]
  },
  // 14. Transport: Modal Decision - Standard Application
  {
    id: 'ch_14',
    nodeId: NODE_C10_GEO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A power plant in Punjab requires 20,000 tonnes of coal from Jharia (Jharkhand) every week. Which mode of transport is economically and logistically viable?',
    options: [
      'Fleet of 2,000 cargo aeroplanes (Airways)',
      'Heavy freight trains on Broad Gauge rail network (Railways)',
      'Speedboats along the Buckingham Canal (Waterways)',
      'Human headloaders along rural panchayat paths'
    ],
    correctIndex: 1,
    explanation:
      'Railways are the uncontested backbone for transporting bulky, heavy commodities (coal, ore, cement, foodgrains) over long continental distances at economical freight rates.',
    hints: [
      'Air is too costly for heavy rocks; inland waterways do not directly span Jharia to Punjab.',
      'Trains carry rake-loads of 4,000+ tonnes in a single haul.',
      'Railways is the standard bulk carrier.'
    ]
  },
  // 15. Waste Management: E-Waste Hazards - Standard Analysis
  {
    id: 'ch_15',
    nodeId: NODE_C10_GEO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why is discarded electronic waste (old smartphones, circuit boards) classified as a severe toxic hazard in landfills?',
    options: [
      'It decomposes into organic methane that causes agricultural root rot',
      'It contains hazardous heavy metals (lead, mercury, cadmium) that leach into subsoil and poison groundwater aquifers',
      'It dissolves instantly in rainwater causing flash floods',
      'It turns into synthetic cotton fibres that trap livestock'
    ],
    correctIndex: 1,
    explanation:
      'E-waste contains toxic elements like lead (damages nervous system), mercury (kidney/brain damage), and cadmium. In unlined dumps, rainwater creates leachate carrying these poisons into drinking water.',
    hints: [
      'Look for heavy metal contamination in subsoil and groundwater.',
      'Circuit boards and batteries contain lead, mercury, and cadmium.',
      'These toxins leach through porous soil layers into aquifers.'
    ],
    misconceptionIndex: 1
  },
  // 16. Waste Management: Stubble Burning Impact - Standard Understanding
  {
    id: 'ch_16',
    nodeId: NODE_C10_GEO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Agricultural stubble burning in Punjab and Haryana after the Kharif paddy harvest primarily triggers which environmental disaster?',
    options: [
      'Ocean acidification along the Coromandel coast',
      'Severe winter air pollution (PM2.5, carbon monoxide smog) blanketing the National Capital Region',
      'Earthquakes along the Himalayan thrust fault',
      'Depletion of the ozone layer exclusively over Antarctica'
    ],
    correctIndex: 1,
    explanation:
      'Open burning of paddy residue releases millions of tonnes of smoke, particulate matter (PM2.5), and greenhouse gases, which combine with winter temperature inversion to choke Delhi-NCR with toxic smog.',
    hints: [
      'Think of winter air quality indices in Delhi every October-November.',
      'Open field burning produces toxic smoke and particulates.',
      'It causes severe air pollution and respiratory distress in northern India.'
    ]
  },
  // 17. Safe Disposal: Sanitary Landfill vs Open Dump - Advanced Distinguish
  {
    id: 'ch_17',
    nodeId: NODE_C10_GEO_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'What engineered feature prevents a Sanitary Landfill from poisoning local groundwater compared to an open garbage dumping ground?',
    options: [
      'A high-voltage electric grid surrounding the fence',
      'Impermeable bottom liners of compacted clay and high-density polyethylene (HDPE) sheets with leachate collection pipes',
      'Spraying liquid nitrogen over the garbage piles every morning',
      'Painting the landfill boundaries with green reflective paint'
    ],
    correctIndex: 1,
    explanation:
      'Sanitary landfills use engineered HDPE geomembrane and clay liners at the base to trap toxic leachate liquid, accompanied by compaction and daily soil capping to block vermin and odour.',
    hints: [
      'How do engineers stop dirty percolating water from seeping into the earth below?',
      'Lining with clay and plastic geomembranes creates an impermeable barrier.',
      'Leachate collection piping extracts toxic runoff.'
    ],
    misconceptionIndex: 0
  },
  // 18. Safe Disposal: Incineration for Biomedical Waste - Standard Application
  {
    id: 'ch_18',
    nodeId: NODE_C10_GEO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Why is high-temperature Incineration (>800°C) mandatory for hospital biomedical waste (syringes, surgical tissues, soiled bandages)?',
    options: [
      'It converts biomedical waste into sweet-smelling room freshener',
      'The intense heat completely destroys dangerous biological pathogens and reduces waste volume by 80-90%',
      'It produces organic manure suitable for kitchen gardens',
      'It cools the surrounding urban environment through water evaporation'
    ],
    correctIndex: 1,
    explanation:
      'Incineration at 800-1100°C destroys viruses, bacteria, and infectious pathogens that would otherwise cause epidemics (hepatitis, HIV, tetanus), while slashing bulky waste into inert ash.',
    hints: [
      'Think about sterilising dangerous medical infection vectors.',
      'High heat eliminates biohazards that ordinary burial cannot kill.',
      'Pathogen destruction + 80-90% volume reduction.'
    ]
  },
  // 19. 3Rs Hierarchy: Order of Effectiveness - Foundation Drag Sort
  {
    id: 'ch_19',
    nodeId: NODE_C10_GEO_021,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 3Rs of sustainable waste management in order of environmental priority (most preferred first).',
    sortItems: [
      '1. REDUCE: Minimize waste at source (refuse single-use plastics, bulk buying)',
      '2. REUSE: Use existing items multiple times without reprocessing (cloth bags, refill jars)',
      '3. RECYCLE: Reprocess discarded material into new goods (melt glass/metal, pulp paper)',
      '4. DISPOSE: Sanitary landfill or incineration (last resort for residuals)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Hierarchy: Reduce (prevention) > Reuse (direct multi-use) > Recycle (reprocessing with energy/water input) > Safe Disposal (last resort).',
    hints: [
      'Prevention is always better than treatment.',
      'Reusing what exists takes less energy than melting/pulping it in a factory.',
      'Hierarchy is Reduce first, then Reuse, then Recycle.'
    ],
    misconceptionIndex: 1
  },
  // 20. 3Rs in Action: Concrete Classification - Standard Application
  {
    id: 'ch_20',
    nodeId: NODE_C10_GEO_021,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Washing an empty glass Horlicks jar to store kitchen spices represents which R, and why?',
    options: [
      'RECYCLE because the chemical formula of glass is changed into spice',
      'REUSE because the item is used again in its existing physical form without melting or reprocessing',
      'REDUCE because you eliminated the need to eat breakfast',
      'DISPOSAL because you threw away the lid'
    ],
    correctIndex: 1,
    explanation:
      'Reuse means taking an intact item and using it repeatedly for the same or new purpose without industrial energy-intensive breakdown (which would be recycling).',
    hints: [
      'Did you melt the glass in an 800°C furnace?',
      'No industrial reprocessing took place; you simply cleaned and reused it.',
      'It is Reuse.'
    ],
    misconceptionIndex: 0
  },
  // 21. Integrated Policy: Agro-Industrial Synergy - Advanced Creativity
  {
    id: 'ch_21',
    nodeId: NODE_C10_GEO_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'A cooperative sugar mill in western Maharashtra wants to eliminate waste and generate extra revenue during the 6-month idle off-season. Which integrated strategy is most sustainable?',
    options: [
      'Burn the entire mill machinery to claim insurance compensation',
      'Use crushed sugarcane bagasse for biomass cogeneration power plants and ferment molasses into ethanol fuel for vehicles',
      'Dump all molasses directly into the local river to kill weeds',
      'Stop sugarcane crushing and convert the entire factory into a deep coal mine'
    ],
    correctIndex: 1,
    explanation:
      'Modern sugar complexes utilize by-products: Bagasse generates green electricity for the grid, and Molasses produces ethanol (bio-fuel blending) and alcohol, ensuring year-round economic viability.',
    hints: [
      'Sugarcane has two valuable by-products: fibrous bagasse and syrupy molasses.',
      'Bagasse powers boilers; molasses ferments into ethanol.',
      'Biomass power + ethanol distillation eliminates waste and earns revenue.'
    ]
  },
  // 22. National Grid Evaluation - Advanced Evaluation
  {
    id: 'ch_22',
    nodeId: NODE_C10_GEO_012,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate why India is rapidly expanding solar and wind corridors (PM-KUSUM, Bhadla Solar Park, Muppandal) while maintaining baseload thermal/nuclear power.',
    options: [
      'Because solar power works better at midnight than during noon',
      'Renewables provide clean, inexhaustible power with zero fuel emissions, but thermal/nuclear are still needed for steady round-the-clock baseload stability during night and calm weather',
      'Fossil coal supplies have already expanded to infinite quantities under the seabed',
      'Windmills generate free diesel when the wind stops'
    ],
    correctIndex: 1,
    explanation:
      'Solar and wind are clean and renewable but intermittent (weather-dependent). A modern resilient grid pairs huge renewable expansion with reliable conventional/nuclear baseload to ensure continuous 24x7 supply.',
    hints: [
      'Think about what happens to solar output after sunset or wind farms during calm doldrums.',
      'Intermittency requires backup baseload power.',
      'Balancing renewables with steady baseload ensures sustainable 24x7 energy security.'
    ]
  },
  // ─── Class 10 board-depth additions: cover previously-uncovered board diagnostics ───
  {
    id: 'ch_depth_geo_mineral_belts',
    nodeId: 'c10_geo_cbse_05_002',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question:
      'Design a one-page map annotation of India for a board answer: which four iron-ore belts and flagship mines should be labelled?',
    options: [
      'Odisha-Jharkhand (Badampahar, Noamundi); Durg-Bastar-Chandrapur (Bailadila); Bellary-Chitradurga-Chikmaglur-Tumkur (Kudremukh); Maharashtra-Goa belt',
      'Kolar gold belt, Jharia coal belt, Mumbai High oil field, Kaveri delta',
      'Only Bailadila and Kudremukh, because India has two mines',
      'The Gangetic plain, the Thar desert, the Western Ghats, the Deccan trap'
    ],
    correctIndex: 0,
    explanation:
      'Board map answers score on belts + one named mine each: (1) Odisha-Jharkhand: Badampahar, Noamundi, Singhbhum; (2) Durg-Bastar-Chandrapur: Bailadila (Chhattisgarh) feeding the Visakhapatnam pellet plant; (3) Karnataka belt: Kudremukh, Bababudan hills; (4) Maharashtra-Goa: Ratnagiri, Goa. Export routes: Kudremukh ore to Mangalore port; Bailadila ore to Japan via Visakhapatnam.',
    hints: [
      'Two belts sit in the east (Odisha-Jharkhand, Chhattisgarh), two in the south-west.',
      'Bailadila means "hump of ox" -- the famous Chhattisgarh mine.',
      'Mark the port each belt feeds: Visakhapatnam and Mangalore.'
    ]
  },
  {
    id: 'ch_depth_geo_manganese_limestone',
    nodeId: 'c10_geo_cbse_05_003',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why does manganese occur in stratified sedimentary layers of the Peninsular plateau while limestone concentrates in sedimentary basins like Cuddapah and Vindhyan?',
    options: [
      'Both are sedimentary in origin: manganese precipitated in ancient marine layers (later metamorphosed in places), while limestone accumulated as calcium-rich marine beds -- both follow the Peninsular geological structure',
      'Both are igneous intrusions from volcanoes only',
      'Manganese is washed down by rivers into the plains',
      'Limestone is found only in the Himalayas'
    ],
    correctIndex: 0,
    explanation:
      'Manganese: sedimentary/metamorphic deposits in the Dharwar and Cuddapah systems -- Odisha, Karnataka, Madhya Pradesh (Balaghat). Limestone: marine biochemical sediment in Vindhyan/Cuddapah basins -- the raw material of cement, so cement plants sit ON the limestone belts. Fact-sheet design: mineral name, two states, one use, one mine.',
    hints: [
      'Sedimentary = laid down in layers by ancient seas.',
      'Cement factories locate on limestone deposits -- transport-saving logic.',
      'Balaghat (MP) and Sundargarh (Odisha) for manganese.'
    ]
  },
  {
    id: 'ch_depth_geo_mica_limestone',
    nodeId: 'c10_geo_cbse_05_004',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Mica occurs in pegmatite veins within metamorphic/igneous rocks while limestone forms in sedimentary basins. Compare the two formation processes.',
    options: [
      'Mica crystallises from mineral-rich fluids filling cracks (veins) in old hard rocks; limestone is deposited layer upon layer as marine calcium carbonate -- so mica belts (Koderma; Ajmer; Nellore) differ totally from limestone basins',
      'Both form inside volcanoes at identical depths',
      'Mica is a river-deposited alluvial mineral',
      'Limestone is found only as veins in granite'
    ],
    correctIndex: 0,
    explanation:
      'Mica: hydrothermal pegmatite veins in the Koderma-Hazaribagh belt (Jharkhand), Ajmer-Bhilwara (Rajasthan) and Nellore (Andhra Pradesh) -- prized for dielectric strength in the electrical industry. Limestone: Vindhyan and Cuddapah marine beds feeding cement and steel flux. Annotated map design: mark three mica belts with state names plus three limestone zones.',
    hints: [
      'Veins = mineral-filled cracks cutting across host rock.',
      'Koderma was once the world mica capital.',
      'Cement plants cannot run without limestone within haulage distance.'
    ]
  },
  {
    id: 'ch_depth_geo_wind_peninsular',
    nodeId: 'c10_geo_cbse_05_006',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why are Indian wind farms concentrated in Peninsular India (Tamil Nadu, Gujarat) rather than the Great Plains?',
    options: [
      'Mountain passes and long coastlines funnel strong steady monsoon winds (Muppandal, the Nagercoil gap, coastal Gujarat), while the interior plains lack both the wind corridor and grid-friendly high-wind sites',
      'The plains have no electricity grid',
      'Windmills cannot stand on flat land',
      'The plains are too cold for turbines'
    ],
    correctIndex: 0,
    explanation:
      'Wind potential follows geometry: the Nagercoil pass funnels south-west monsoon winds past Muppandal (Tamil Nadu, among Asia\'s largest wind farms); Gujarat\'s coast gives high capacity factors. The Great Plains get weaker, more turbulent winds and dense farmland. Compare with solar: Rajasthan\'s Thar (Bhadla) wins on clear-sky radiation instead.',
    hints: [
      'Wind needs speed + steadiness, not just open land.',
      'Mountain gaps accelerate flow like a nozzle.',
      'Tamil Nadu leads installed wind capacity.'
    ]
  },
  {
    id: 'ch_depth_geo_biogas_numeric',
    nodeId: 'c10_geo_cbse_05_007',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A village has 50 cattle; each cow gives 10 kg of dung per day. If 1 kg of dung yields 0.04 m3 of biogas, what is the daily biogas potential of the village in m3?',
    correctAnswer: 20,
    tolerance: 0.5,
    unit: 'm3/day',
    explanation:
      '50 cattle x 10 kg = 500 kg dung/day; 500 x 0.04 = 20 m3 of biogas per day -- enough for a community biogas plant cooking a whole lane of homes, with slurry left as organic fertiliser. Biogas is roughly 60-70% methane.',
    hints: [
      'First find total dung: cattle x kg per animal.',
      'Then multiply by gas per kg.',
      '20 cubic metres per day is the design size for the plant.'
    ]
  },
  {
    id: 'ch_depth_geo_nuclear_map',
    nodeId: 'c10_geo_cbse_05_007',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question:
      'Annotated sketch map of India: the two geothermal pilot projects and four nuclear power stations to label are...',
    options: [
      'Manikaran (Himachal Pradesh) and Puga valley (Ladakh); Tarapur (Maharashtra), Rawatbhata (Rajasthan), Kalpakkam (Tamil Nadu), Kaiga (Karnataka)',
      'Jharia and Bokaro; Kanpur, Lucknow, Patna, Guwahati',
      'Mumbai High and Krishna-Godavari; Delhi, Mumbai, Chennai, Kolkata',
      'Kolar and Khetri; Srinagar, Shimla, Dehradun, Gangtok'
    ],
    correctIndex: 0,
    explanation:
      'Geothermal: Manikaran (HP) and Puga valley (Ladakh) pilot projects. Nuclear (NPCIL) sites: Tarapur (India\'s first, 1969), Rawatbhata/Rajasthan Atomic Power Station, Kalpakkam (Madras + fast breeder), Kaiga (Karnataka) -- add Narora (UP) and Kudankulam (TN) on a six-site map.',
    hints: [
      'Puga is in Ladakh -- hot springs at high altitude.',
      'Tarapur sits north of Mumbai on the coast.',
      'Kalpakkam hosts the fast breeder programme.'
    ]
  },
  {
    id: 'ch_depth_geo_singrauli_coal',
    nodeId: 'c10_geo_cbse_05_008',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'A Singrauli thermal plant burns 10,000 tonnes of coal per day with calorific value 4,000 kcal/kg. Daily heat input in kcal?',
    correctAnswer: 40000000000,
    tolerance: 1000000000,
    unit: 'kcal/day',
    explanation:
      '10,000 tonnes = 10,000,000 kg; 10,000,000 x 4,000 = 4.0 x 10^10 kcal/day. Only about 30-35% becomes electricity in a typical steam plant -- the rest leaves as waste heat and ash, which is why thermal plants sit near coalfields (Singrauli, Korba, Talcher) instead of hauling low-rank coal.',
    hints: [
      'Convert tonnes to kilograms first (x1000).',
      'Multiply by kcal per kg.',
      'Scientific notation keeps it readable: 4 x 10^10.'
    ]
  },
  {
    id: 'ch_depth_geo_chotanagpur_evaluate',
    nodeId: 'c10_geo_cbse_05_009',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate: "The Chota Nagpur Plateau\'s mineral wealth has brought ONLY economic prosperity to the region."',
    options: [
      'False -- mining also brought displacement of tribal communities, deforestation, air/water pollution and boom-bust mining towns; prosperity was real (Jamshedpur, Dhanbad) but uneven',
      'True -- minerals always create only benefits',
      'False -- the plateau has no minerals at all',
      'True -- pollution and displacement are forms of prosperity'
    ],
    correctIndex: 0,
    explanation:
      'Balanced evaluation: Chota Nagpur (Jharkhand) supplies coal (Jharia), iron ore, copper, mica and uranium -- powering steel cities like Jamshedpur and Bokaro. Costs: Adivasi displacement, degraded forests, the polluted Damodar ("sorrow of Bengal"), occupational hazards in coal mines. A strong board answer gives two gains, two costs, then a verdict.',
    hints: [
      'Name one industry city AND one environmental cost.',
      'Who paid the price of open-cast mining?',
      'Conclude: prosperity yes, ONLY prosperity no.'
    ]
  },
  {
    id: 'ch_depth_phy_calorific_experiment',
    nodeId: 'c10_phy_cbse_03_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question:
      'Design a school experiment to compare the calorific values of two solid fuels (coal and wood). Which setup is scientifically fair?',
    options: [
      'Burn equal masses of each fuel under identical water volumes, record the rise in water temperature for each, and compute heat gained per gram of fuel',
      'Burn the two fuels for different times and note which looks hotter',
      'Weigh the ashes only',
      'Compare flame colours in a dark room'
    ],
    correctIndex: 0,
    explanation:
      'Calorific value = heat released per unit mass (kJ/kg). Fair test: same mass of fuel, same mass of water, same container, same flame distance; measure water temperature rise; Q = m x c x dT per gram of fuel. Coal (about 25-30 MJ/kg) beats wood (about 15-18 MJ/kg) -- expect a bigger temperature rise.',
    hints: [
      'Only ONE variable may change: the fuel.',
      'Water is the heat catcher: the rise tells you heat delivered.',
      'Divide heat by fuel mass to rank the fuels.'
    ]
  },
  {
    id: 'ch_depth_phy_hydro_velocity',
    nodeId: 'c10_phy_cbse_03_002',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In a hydro power plant, why is water stored in the dam made to flow through a narrow penstock before hitting the turbines?',
    options: [
      'The stored gravitational potential energy becomes kinetic energy of flow; the penstock accelerates and directs the stream so the turbine spins fast enough to drive the generator efficiently',
      'To filter the water before use',
      'To cool the generators with splash water',
      'Because turbines only work with salt water'
    ],
    correctIndex: 0,
    explanation:
      'Energy chain: gravitational PE of stored water (mgh) -> kinetic energy in the penstock -> rotational KE of turbine -> electrical energy in the generator. Classroom model: a 2 L bottle with a straw nozzle, a small DC motor with a paddle and an LED -- higher water level (more head) makes the LED glow brighter.',
    hints: [
      'Height h in mgh is the "head" -- why dams are tall.',
      'The penstock is a slide that converts height into speed.',
      'Turbine + generator = rotation into electricity.'
    ]
  },
  {
    id: 'ch_depth_phy_esp_claim',
    nodeId: 'c10_phy_cbse_03_003',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A student claims: "Installing an electrostatic precipitator (ESP) in a thermal plant increases its energy conversion efficiency." Evaluate.',
    options: [
      'Confused -- an ESP cuts particulate (fly-ash) pollution; it actually consumes a little energy, so it protects health, not efficiency. Genuine efficiency gains (e.g. supercritical boilers) raise the fraction of fuel heat becoming electricity',
      'True -- cleaner plants are always more efficient',
      'False because ESPs produce electricity',
      'False because pollution laws ban ESPs'
    ],
    correctIndex: 0,
    explanation:
      'Distinguish pollution-control technology from efficiency technology. An ESP charges ash particles and collects them on plates -- cleaner smoke, slightly LOWER net output. Improved cookstove check: insulating the fire and pre-heating air gives hotter, more complete combustion -- cook faster on less fuel (a real efficiency gain).',
    hints: [
      'What does the device actually do to ash?',
      'Does scrubbing exhaust convert heat to electricity?',
      'Efficiency = useful energy out / energy in.'
    ]
  },
  {
    id: 'ch_depth_phy_owc_wave',
    nodeId: 'c10_phy_cbse_03_005',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In an oscillating water column (OWC) wave-energy device, what is the correct energy conversion sequence?',
    options: [
      'Wave motion makes the water column in a chamber rise and fall like a piston; oscillating air is forced past a Wells turbine (works whichever way air flows), spinning a generator -- wave KE -> pneumatic energy -> electricity',
      'Waves boil water into steam directly',
      'OWC pumps oil under the seabed',
      'Waves charge giant batteries through cables'
    ],
    correctIndex: 0,
    explanation:
      'OWC chain: wave energy -> oscillating water column -> bidirectional airflow -> turbine rotation -> generator. Demo: a half-filled bottle with a straw on top and a paper pinwheel -- squeeze and release; the pinwheel spins on both push and pull, like a Wells turbine. OTEC variant: 26 deg C surface water vaporises ammonia (b.p. -33 deg C); vapour drives a turbine and deep cold water condenses it.',
    hints: [
      'The moving WATER acts as a piston on trapped air.',
      'A Wells turbine keeps one rotation direction despite to-and-fro air.',
      'Name every arrow: wave -> air -> turbine -> generator.'
    ]
  },
  {
    id: 'ch_depth_phy_fission_fusion_chain',
    nodeId: 'c10_phy_cbse_03_007',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Compare energy per kilogram: fission of U-235 vs fusion of deuterium-tritium -- and design a chain-reaction classroom model.',
    options: [
      'Fusion releases far more energy per kilogram than fission; model the chain reaction with mousetraps-and-ping-pong balls -- one ball triggers traps whose balls trigger more, like one neutron splitting a nucleus and freeing 2-3 more neutrons',
      'Fission releases more per kg and cannot be modelled in class',
      'Both release the same energy as burning coal per kg',
      'Chain reactions need a real reactor to demonstrate'
    ],
    correctIndex: 0,
    explanation:
      'Fission of one U-235 nucleus releases about 200 MeV; D-T fusion about 17.6 MeV per event -- but per kilogram fusion wins massively (light nuclei, more nuclei per kg) with no long-lived ash. Chain-reaction model: cocked mousetraps each holding two balls; one release sets off a branching cascade -- visualise criticality and why control rods absorb neutrons.',
    hints: [
      'Fusion powers the Sun; hydrogen is plentiful.',
      'One split frees 2-3 neutrons -- branching, not linear.',
      'Mousetrap = nucleus, balls = neutrons.'
    ]
  },
  {
    id: 'ch_depth_phy_biomass_evaluate',
    nodeId: 'c10_phy_cbse_03_009',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate: "Biomass like cow dung cakes is renewable and carbon-neutral, so it is the best cooking fuel for rural India."',
    options: [
      'Partly true, partly false -- dung is renewable, but burning it indoors causes severe indoor air pollution, wastes its fertiliser value and is inefficient; biogas plants or LPG use the same energy far more cleanly',
      'True -- traditional always means best',
      'False -- dung is a non-renewable fossil fuel',
      'False -- dung cannot release energy at all'
    ],
    correctIndex: 0,
    explanation:
      'Cost-benefit evaluation: renewable yes; roughly carbon-neutral (regrown biomass reabsorbs CO2); BUT smoke (PM2.5, carbon monoxide) damages lungs, soot blackens homes, and every tonne burnt is fertiliser lost from fields. A family biogas plant uses the SAME dung twice: gas for the kitchen, slurry for the field.',
    hints: [
      'What does the smoke do to the cook\'s lungs?',
      'What else could the dung have done on the farm?',
      'Two benefits, two costs, then your verdict.'
    ]
  },
  {
    id: 'ch_depth_phy_public_transport',
    nodeId: 'c10_phy_cbse_03_010',
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Evaluate: "Using public transport instead of a personal car does not conserve energy because the bus also burns fuel."',
    options: [
      'False -- per passenger-kilometre a full bus uses far less fuel than each commuter driving alone; conservation is measured per person-trip, not per vehicle',
      'True -- any vehicle burns fuel identically',
      'True -- buses are always diesel guzzlers with no advantage',
      'False because buses always run on electricity'
    ],
    correctIndex: 0,
    explanation:
      'Do the arithmetic: a car at 15 km/L with 1 person = 0.067 L per passenger-km; a bus at 4 km/L with 40 people = 0.010 L per passenger-km -- a 6-7x saving. One-week class challenge design: (1) log walk/cycle/bus trips to school daily, (2) switch off standby appliances, (3) compare the classroom electricity meter against last week.',
    hints: [
      'Divide fuel by NUMBER of travellers.',
      'Standby power is a silent home leak.',
      'Measurable = logged trips + meter readings.'
    ]
  }
];

// ─── DEFAULT PROPS ───
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_GEO_011,
  title: 'ICSE Class 10 Geography: Energy, Agriculture, Industry, Transport & Waste Systems',
  definition:
    'Comprehensive study of India’s economic geography: conventional and non-conventional energy resources, agricultural classification and major food/cash crops, agro-based and mineral-based industries, multi-modal transport infrastructure, and sustainable waste management through safe disposal and the 3Rs hierarchy.',
  eli5:
    'Think of India as a giant living powerhouse: Energy fuels its engines, Agriculture feeds its people and mills, Industries craft raw materials into tools and clothes, Transport circulates everything across the land, and Waste Management cleans up the system so we stay healthy and thrive sustainably!',
  misconceptions: [
    {
      misconception: 'Lignite coal is mined in Jharkhand and Odisha',
      correction:
        'Jharkhand, Odisha, and Chhattisgarh produce high-grade bituminous Gondwana coal. Lignite (brown coal) is mined in Neyveli (Tamil Nadu) and Rajasthan.'
    },
    {
      misconception: 'Muppandal is a solar park and Jamnagar extracts crude oil',
      correction:
        'Muppandal (Tamil Nadu) is one of Asia’s largest wind farms. Jamnagar (Gujarat) is an oil refinery, not an extraction drilling site (extraction is at Mumbai High/Digboi).'
    },
    {
      misconception: 'Hydroelectric power is non-conventional because it uses water',
      correction:
        'In the ICSE syllabus, Hydroelectric power is conventional because it is a long-established, traditional source of large-scale commercial electricity.'
    },
    {
      misconception: 'Cotton and Sugar mills can locate anywhere with equal freedom',
      correction:
        'Sugar mills must be within 50 km of sugarcane fields because cane is a perishable, weight-losing raw material. Cotton can be baled and transported without spoilage.'
    },
    {
      misconception: 'Recycle is better than Reduce because it creates new goods',
      correction:
        'The 3Rs hierarchy strictly places Reduce first. Reducing stops waste creation completely, saving raw materials and energy before processing even begins.'
    }
  ],
  diagnosticQuestions: [
    {
      question: 'Which offshore oilfield yields India’s largest share of domestic crude petroleum?',
      options: ['Digboi (Assam)', 'Mumbai High (Arabian Sea)', 'Ankleshwar (Gujarat)', 'Barauni (Bihar)'],
      correctIndex: 1
    },
    {
      question: 'Which state leads India in both Rice production area and yield in the fertile deltaic alluvium?',
      options: ['Punjab', 'West Bengal', 'Rajasthan', 'Karnataka'],
      correctIndex: 1
    },
    {
      question: 'Which black soil crop needs 210 frost-free days and about 100 cm rainfall?',
      options: ['Tea', 'Cotton', 'Jute', 'Rubber'],
      correctIndex: 1
    },
    {
      question: 'What is the track gauge width of Indian Railways Broad Gauge?',
      options: ['1000 mm', '762 mm', '1676 mm', '1435 mm'],
      correctIndex: 2
    },
    {
      question: 'Which National Waterway operates along the Ganga from Prayagraj to Haldia?',
      options: ['NW-1', 'NW-2', 'NW-3', 'NW-4'],
      correctIndex: 0
    },
    {
      question: 'Which toxic liquid forms when rainwater percolates through decomposing landfill waste?',
      options: ['Slag', 'Leachate', 'Bagasse', 'Molasses'],
      correctIndex: 1
    },
    {
      question: 'Composting using Eisenia fetida red worms is called:',
      options: ['Incineration', 'Vermicomposting', 'Fractional Distillation', 'Project Unigauge'],
      correctIndex: 1
    },
    {
      question: 'Why is Jamshedpur the ideal location for Tata Iron and Steel?',
      options: [
        'Near Mayurbhanj iron ore and Jharia coal',
        'In the middle of the Thar desert',
        'Adjacent to Mumbai deep seaport',
        'Next to tea gardens in Assam'
      ],
      correctIndex: 0
    }
  ],
  masteryCriteria:
    'Student demonstrates 80%+ mastery in identifying Indian energy belts, crop climate requirements, industrial location factors, transport corridors, and 3R waste management principles.'
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. National Energy Grid: Conventional vs Renewable',
    instruction:
      'Adjust the Energy Mix slider below to see how shifting from Coal/Fossil to Solar/Wind affects carbon emissions and grid stability in real time.',
    interactionType: 'slider-energy',
    nodeId: NODE_C10_GEO_011
  },
  {
    title: '2. Agro-Climatic Matchmaker: Soil & Rainfall',
    instruction:
      'Change the Rainfall and Soil controls to observe which major crop (Rice, Wheat, Cotton, Tea, or Millets) flourishes in your simulated region.',
    interactionType: 'agro-sim',
    nodeId: NODE_C10_GEO_014
  },
  {
    title: '3. Industrial Location Engine: Key vs Footloose',
    instruction:
      'Click on different industry types to explore their vital location factors (Sugarcane weight loss, Steel raw material bulk, Electronics skill hubs).',
    interactionType: 'industry-click',
    nodeId: NODE_C10_GEO_016
  },
  {
    title: '4. Multimodal Transport Grid: The Golden Corridors',
    instruction:
      'Select transport modes to trace the Golden Quadrilateral, Broad Gauge trunk lines, and National Waterway 1 across the map of India.',
    interactionType: 'transport-map',
    nodeId: NODE_C10_GEO_018
  },
  {
    title: '5. Sustainable Waste Lifecycle & The 3Rs',
    instruction:
      'Drag waste items to their optimal destination: Vermicomposting, Incinerator (>800°C), Sanitary Landfill, or 3R Upcycling.',
    interactionType: 'waste-sort',
    nodeId: NODE_C10_GEO_020
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The District Sustainability Audit (Real-World ICSE Project)',
  description:
    'Conduct a geographic resource audit of your home district or town in India. Map where its power originates, which cash/food crops grow nearby, how freight arrives, and how municipal solid waste is processed.',
  steps: [
    'Identify your local electricity source (e.g., Thermal pithead, Hydro dam, Rooftop Solar, or Wind grid).',
    'Visit a local mandi or store: list 3 food/cash crops and check if they match your state’s rainfall/soil profile.',
    'Trace how bulk goods enter your city (Nearest Broad Gauge railway freight yard vs National Highway).',
    'Audit your household waste for 3 days: Calculate percentage Biodegradable (green bin) vs Recyclable plastic/paper (blue bin) and practice 1 concrete REDUCE action.'
  ]
};

// ─── MAIN COMPONENT ───
function C10_GeographyEnergyResourcesConventionalSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C10_GEO_011,
    title = DEFAULT_PROPS.title || 'ICSE Geography Resources & Systems',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['geography'] || {
    name: 'Geography',
    emoji: '🌍',
    color: 'emerald'
  };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation Interactive States
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionFeedback, setPredictionFeedback] = useState<Record<string, boolean>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationFeedback, setObservationFeedback] = useState<Record<string, boolean>>({});

  // Exploration & Interactive Simulation States
  const [renewableMix, setRenewableMix] = useState(30); // 0% to 100%
  const [simRainfall, setSimRainfall] = useState(110); // 20 to 300 cm
  const [simSoil, setSimSoil] = useState<'alluvial' | 'black' | 'laterite' | 'mountain'>('alluvial');
  const [selectedIndustry, setSelectedIndustry] = useState<'sugar' | 'cotton' | 'steel' | 'electronics'>('sugar');
  const [activeTransportLayer, setActiveTransportLayer] = useState<'gq' | 'rail' | 'water'>('gq');
  const [wasteBucketCounts, setWasteBucketCounts] = useState<{ compost: number; landfill: number; recycle: number; incinerator: number }>({
    compost: 0,
    landfill: 0,
    recycle: 0,
    incinerator: 0
  });

  // Sandbox Live Controls
  const [sandboxCoalCapacity, setSandboxCoalCapacity] = useState(60);
  const [sandboxSolarCapacity, setSandboxSolarCapacity] = useState(40);
  const [sandboxHydroActive, setSandboxHydroActive] = useState(true);
  const [sandboxNuclearActive, setSandboxNuclearActive] = useState(true);
  const [sandboxActiveCrop, setSandboxActiveCrop] = useState<'rice' | 'wheat' | 'cotton' | 'tea' | 'jute'>('rice');

  // Challenge Interaction States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback Component States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges by Adaptive Difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard' || c.difficulty === 'advanced');
    }
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── RECHARTS DATA DERIVATIONS ───
  const energyData = useMemo(() => {
    const coalShare = 100 - renewableMix;
    const co2Index = Math.round(coalShare * 9.2);
    const reliability = Math.round(50 + (coalShare * 0.45) + (renewableMix > 60 ? (100 - renewableMix) * 0.3 : 15));
    return [
      { name: 'Coal/Gas Fossil', value: coalShare, fill: '#ef4444' },
      { name: 'Renewable Solar/Wind', value: renewableMix, fill: '#10b981' },
      { name: 'Grid Reliability', value: Math.min(100, reliability), fill: '#3b82f6' },
      { name: 'Emissions Index', value: co2Index, fill: '#f59e0b' }
    ];
  }, [renewableMix]);

  // Derived Agro Output
  const simulatedCropOutput = useMemo(() => {
    if (simRainfall >= 90 && (simSoil === 'alluvial' || simSoil === 'black')) {
      return { crop: 'Rice (Paddy)', suitability: 95, desc: 'Ideal warm flooded conditions in deep alluvial/deltaic soils.' };
    }
    if (simRainfall <= 85 && simSoil === 'alluvial') {
      return { crop: 'Wheat (Rabi)', suitability: 90, desc: 'Cool growing season, well-drained loamy alluvium with canal irrigation.' };
    }
    if (simSoil === 'black' && simRainfall >= 60 && simRainfall <= 120) {
      return { crop: 'Cotton (Cash Crop)', suitability: 94, desc: 'Black regur soil with excellent moisture retention and frost-free climate.' };
    }
    if (simSoil === 'laterite' && simRainfall >= 150) {
      return { crop: 'Tea / Coffee (Plantation)', suitability: 92, desc: 'Acidic, well-drained hill slope soil with rapid rainfall runoff.' };
    }
    return { crop: 'Millets (Jowar/Bajra)', suitability: 85, desc: 'Drought-resistant coarse grains on sandy or shallow soils.' };
  }, [simRainfall, simSoil]);

  // Derived Transport Metrics
  const transportSpeedCost = useMemo(() => {
    if (activeTransportLayer === 'gq') {
      return { mode: 'National Expressways (Road)', speed: 'Fast (Door-to-Door)', cost: 'Medium', bulkCapacity: 'Low-Medium' };
    }
    if (activeTransportLayer === 'rail') {
      return { mode: 'Broad Gauge Railways', speed: 'Moderate-High', cost: 'Low per Tonne-Km', bulkCapacity: 'Highest (4,000+ Tonnes)' };
    }
    return { mode: 'Inland Waterways (NW-1 Ganga)', speed: 'Slow', cost: 'Lowest & Greenest', bulkCapacity: 'Very High (Barges)' };
  }, [activeTransportLayer]);

  // Derived Sandbox Emissions & Grid Total
  const sandboxStats = useMemo(() => {
    const totalPower = sandboxCoalCapacity * 4 + sandboxSolarCapacity * 3 + (sandboxHydroActive ? 60 : 0) + (sandboxNuclearActive ? 80 : 0);
    const totalCO2 = Math.round(sandboxCoalCapacity * 8.5);
    const greenPercent = Math.round(((sandboxSolarCapacity * 3 + (sandboxHydroActive ? 60 : 0) + (sandboxNuclearActive ? 80 : 0)) / (totalPower || 1)) * 100);
    return { totalPower, totalCO2, greenPercent };
  }, [sandboxCoalCapacity, sandboxSolarCapacity, sandboxHydroActive, sandboxNuclearActive]);

  // ─── INITIAL LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION EFFECT ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid simulation background pulses
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw flowing power / logistics pulses
      const pulseX = (frame * 2) % canvas.width;
      ctx.beginPath();
      ctx.arc(pulseX, 15, 6 + Math.sin(frame * 0.1) * 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#34d399';
      ctx.fill();

      // Energy line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 15);
      ctx.lineTo(canvas.width, 15);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`National Resource Dispatch Grid • Active Node: ${activeChallenge.id}`, 10, 26);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, activeChallenge.id]);

  // ─── CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── EXTRACTED USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Jamnagar processes crude oil in the world’s largest grassroots refinery.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handlePredictionAnswer = useCallback((predId: string, optIdx: number, correctIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [predId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setPredictionFeedback(prev => ({ ...prev, [predId]: isCorrect }));
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObservationAnswer = useCallback((obsId: string, optIdx: number, correctIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [obsId]: optIdx }));
    const isCorrect = optIdx === correctIdx;
    setObservationFeedback(prev => ({ ...prev, [obsId]: isCorrect }));
    audioManager.play(isCorrect ? 'drop-correct' : 'pop');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Test your predictions and observe the geographical phenomena.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test what you learned in free play mode. Adjust power grids, agricultural lands, and transport routes freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode engaged. Answer the Board-level questions with precision.');
  }, []);

  const handleRenewableSlider = useCallback((val: number) => {
    setRenewableMix(val);
    audioManager.play('count');
  }, []);

  const handleRainfallSlider = useCallback((val: number) => {
    setSimRainfall(val);
    audioManager.play('count');
  }, []);

  const handleSoilSelect = useCallback((soil: 'alluvial' | 'black' | 'laterite' | 'mountain') => {
    setSimSoil(soil);
    audioManager.play('tap');
  }, []);

  const handleIndustrySelect = useCallback((ind: 'sugar' | 'cotton' | 'steel' | 'electronics') => {
    setSelectedIndustry(ind);
    audioManager.play('tap');
    const spoken: Record<string, string> = {
      sugar: 'Sugar industry: Weight-losing raw material. Mills must locate within 50 km of cane fields.',
      cotton: 'Cotton textiles: High locational flexibility. Humid coastal air strengthens yarn during spinning.',
      steel: 'Iron and steel: Bulky key industry. Clustered near Mayurbhanj iron ore and Jharia coal.',
      electronics: 'Electronics: Footloose industry. Driven by skilled engineers, software parks, and pleasant climate.'
    };
    speechManager.speak(spoken[ind]);
  }, []);

  const handleTransportSelect = useCallback((layer: 'gq' | 'rail' | 'water') => {
    setActiveTransportLayer(layer);
    audioManager.play('tap');
  }, []);

  const handleWasteDragSortIncrement = useCallback((bin: 'compost' | 'landfill' | 'recycle' | 'incinerator') => {
    setWasteBucketCounts(prev => ({ ...prev, [bin]: prev[bin] + 1 }));
    audioManager.play('drop-correct');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length > 0 ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the National Resource & Infrastructure Command curriculum!');
  }, [errors, onComplete]);

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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = ans === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = ans === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Precise geographic analysis.');
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
        speechManager.speak('Review the step-by-step ICSE walkthrough carefully.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Motivational feedback calculation
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) {
      return { title: 'PERFECT SCORE!', desc: 'Flawless geographical mastery across all ICSE domains! 🌟', badge: '✓ Mastery 100%' };
    }
    if (errors <= 3) {
      return { title: 'Great work!', desc: 'Solid grasp of resource systems, crops, and industries! 👍', badge: '✓ High Proficiency' };
    }
    if (errors <= 7) {
      return { title: 'Good effort!', desc: 'Good progress. Review the targeted concepts to achieve complete mastery! 📚', badge: '✓ Developing' };
    }
    return { title: 'Do not give up — You WILL get this!', desc: 'Review the explanations and try again. Practice makes permanent! 💪', badge: '✓ Needs Revision' };
  }, [errors]);

  // Spaced Repetition Recommendation Calculation
  const srsRecommendation = useMemo(() => {
    if (errors === 0) {
      return { intervalText: 'review in 7 days', days: 7, note: 'High Retention: Your mental model is sharp! Optimal recall interval is 1 week.' };
    }
    if (errors <= 3) {
      return { intervalText: 'review in 3 days', days: 3, note: 'Moderate Retention: Solid foundation with minor slips. Reinforce in 72 hours.' };
    }
    return { intervalText: 'review in 1 day', days: 1, note: 'Targeted Reinforcement: Daily spaced review recommended to cement these geographical links.' };
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl shadow-inner cursor-pointer"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide">
              ICSE Class 10 Geography • Command Simulator
            </p>
          </div>
        </div>

        {/* Phase Badges & Difficulty Indicator */}
        <div className="flex items-center gap-2">
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="text-xs uppercase px-2.5 py-1 rounded-full font-bold bg-slate-800 text-slate-300 border border-slate-700"
          >
            Phase: {phase.toUpperCase()}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`text-xs uppercase font-extrabold px-3 py-1 rounded-full border shadow-sm ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                : difficulty === 'standard'
                ? 'bg-blue-950 text-blue-300 border-blue-600'
                : 'bg-rose-950 text-rose-300 border-rose-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg"
          >
            <h2 className="text-xl font-black text-indigo-300 tracking-tight">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs text-indigo-200">
              📌 <strong className="text-white">Your Mission:</strong> {SCENARIO.context}
            </div>
          </motion.div>

          {/* Curiosity Hook Discovery Question */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-md"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 rounded-md border border-amber-500/30">
                Curiosity Hook
              </span>
              <h3 className="text-base font-bold text-white">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="space-y-2.5 mt-4">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-400 border border-slate-800'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-emerald-400 font-bold">✓ (Correct)</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="ml-2 text-rose-400 font-bold">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Superb insight! You clearly understand extraction vs refining.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Exploration Labs"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-900/40"
                >
                  Enter Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ──�� 2. GUIDED INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
            <span>Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ width: i === currentSlide ? 24 : 8 }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentSlide ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* PREDICTION PROMPT (BRILLIANT.ORG PREDICT-THEN-CHECK PATTERN) */}
          {currentSlide < PREDICTION_QUESTIONS.length && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-blue-950/60 to-slate-900 rounded-2xl border border-blue-800/50 shadow-md space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-extrabold bg-blue-500 text-slate-950 rounded uppercase tracking-wider">
                  🎯 Step 1: Predict Before You Test
                </span>
                <span className="text-xs text-blue-300 font-semibold">Brilliant.org Hypothesis Check</span>
              </div>
              <p className="text-sm font-bold text-white">
                {PREDICTION_QUESTIONS[currentSlide].question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {PREDICTION_QUESTIONS[currentSlide].options.map((opt, oIdx) => {
                  const predId = PREDICTION_QUESTIONS[currentSlide].id;
                  const selected = predictionAnswers[predId] === oIdx;
                  const isAnswered = predictionAnswers[predId] !== undefined;
                  const isCorrect = oIdx === PREDICTION_QUESTIONS[currentSlide].correctIndex;
                  return (
                    <button
                      key={oIdx}
                      aria-label={`Prediction Option ${oIdx + 1}`}
                      onClick={() => handlePredictionAnswer(predId, oIdx, PREDICTION_QUESTIONS[currentSlide].correctIndex)}
                      className={`text-left p-2.5 rounded-xl text-xs font-medium border transition-all ${
                        isAnswered
                          ? isCorrect
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : selected
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                          : 'bg-slate-900 hover:bg-slate-800 border-slate-750 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-1.5 text-blue-400">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {predictionAnswers[PREDICTION_QUESTIONS[currentSlide].id] !== undefined && (
                <div className="p-2.5 bg-blue-900/30 border border-blue-700/40 rounded-xl text-xs text-blue-200 mt-1">
                  🔍 <strong>Verify Instruction:</strong> {PREDICTION_QUESTIONS[currentSlide].verifyInstruction}
                </div>
              )}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div>
                <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-emerald-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: ENERGY GRID LAB (WITH TOPIC SVG DIAGRAM 1: Thermal & Renewable Energy Flow) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                      <span>Renewable Mix (Solar/Wind/Hydro)</span>
                      <span className="text-emerald-400 font-extrabold text-sm">{renewableMix}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={90}
                      value={renewableMix}
                      aria-label="Adjust renewable energy percentage"
                      onChange={e => handleRenewableSlider(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />

                    {/* TOPIC SPECIFIC SVG 1: ENERGY CONVERSION & GRID ARCHITECTURE */}
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">Architecture: Energy Generation to Grid</span>
                      <svg viewBox="0 0 320 100" className="w-full h-24 rounded-lg bg-slate-950">
                        {/* Coal Boiler Node */}
                        <rect x="10" y="20" width="60" height="55" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
                        <text x="40" y="42" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">Coal Boiler</text>
                        <text x="40" y="55" textAnchor="middle" fill="#94a3b8" fontSize="7">Jharia/Korba</text>
                        <circle cx="40" cy="65" r="3" fill="#f87171" />

                        {/* Solar & Wind Node */}
                        <rect x="90" y="20" width="60" height="55" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                        <text x="120" y="42" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="bold">Solar/Wind</text>
                        <text x="120" y="55" textAnchor="middle" fill="#94a3b8" fontSize="7">Bhadla/Muppandal</text>
                        <polygon points="120,62 124,70 116,70" fill="#34d399" />

                        {/* Central Transformer & Grid */}
                        <rect x="175" y="15" width="65" height="65" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                        <text x="207" y="38" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">National Grid</text>
                        <text x="207" y="52" textAnchor="middle" fill="#94a3b8" fontSize="7">Synchronized AC</text>
                        <text x="207" y="65" textAnchor="middle" fill="#fbbf24" fontSize="7">50 Hz / 400 kV</text>

                        {/* City / Industrial Consumer */}
                        <rect x="260" y="25" width="50" height="48" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                        <text x="285" y="46" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold">Industries</text>
                        <text x="285" y="58" textAnchor="middle" fill="#94a3b8" fontSize="7">& Cities</text>

                        {/* Flow lines */}
                        <path d="M 70 47 L 90 47" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />
                        <path d="M 150 47 L 175 47" stroke="#10b981" strokeWidth="2" />
                        <path d="M 70 47 Q 120 10 175 40" stroke="#ef4444" strokeWidth="2" fill="none" />
                        <path d="M 240 47 L 260 47" stroke="#38bdf8" strokeWidth="2" />
                      </svg>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="flex justify-between p-1.5 bg-slate-900 rounded-lg">
                        <span>Conventional (Coal/Fossil):</span>
                        <span className="font-bold text-rose-400">{100 - renewableMix}%</span>
                      </div>
                      <div className="flex justify-between p-1.5 bg-slate-900 rounded-lg">
                        <span>Solar Hub (Bhadla, Raj):</span>
                        <span className="font-bold text-amber-400">{Math.round(renewableMix * 0.6)} GW</span>
                      </div>
                      <div className="flex justify-between p-1.5 bg-slate-900 rounded-lg">
                        <span>Wind Hub (Muppandal, TN):</span>
                        <span className="font-bold text-teal-400">{Math.round(renewableMix * 0.4)} GW</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                    <h4 className="text-xs font-bold text-slate-400 mb-2 text-center">Live Grid Performance & Emissions</h4>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={energyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                          <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {energyData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: AGRO-CLIMATIC CROP MATCH (WITH TOPIC SVG DIAGRAM 2: Soil Horizons & Root Zone) */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-300">
                      <span>Simulated Annual Rainfall</span>
                      <span className="text-blue-400 font-extrabold text-sm">{simRainfall} cm</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={250}
                      value={simRainfall}
                      aria-label="Adjust annual rainfall in centimetres"
                      onChange={e => handleRainfallSlider(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />

                    <div className="pt-2">
                      <span className="text-xs font-bold text-slate-300 block mb-2">Select Soil Type:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'alluvial', label: 'Alluvial (Plains)' },
                          { id: 'black', label: 'Black Regur (Deccan)' },
                          { id: 'laterite', label: 'Laterite (Ghats)' },
                          { id: 'mountain', label: 'Sandy / Mountain' }
                        ].map(s => (
                          <motion.button
                            key={s.id}
                            aria-label={`Select soil: ${s.label}`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleSoilSelect(s.id as 'alluvial' | 'black' | 'laterite' | 'mountain')}
                            className={`p-2 rounded-lg text-xs font-bold text-left transition-all ${
                              simSoil === s.id
                                ? 'bg-emerald-600 text-white border border-emerald-400'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {s.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* TOPIC SPECIFIC SVG 2: SOIL PROFILE AND WATER RUNOFF DIAGRAM */}
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">Agro-Geology: Root Drainage & Soil Horizon</span>
                      <svg viewBox="0 0 320 85" className="w-full h-20 rounded-lg bg-slate-950">
                        {/* Top Soil Layer */}
                        <rect x="10" y="10" width="300" height="20" fill={simSoil === 'black' ? '#1f2937' : simSoil === 'laterite' ? '#7c2d12' : '#854d0e'} rx="3" />
                        <text x="25" y="24" fill="#f8fafc" fontSize="8" fontWeight="bold">
                          Horizon A (Topsoil): {simSoil.toUpperCase()}
                        </text>
                        {/* Subsoil & Drainage */}
                        <rect x="10" y="32" width="300" height="22" fill="#334155" rx="3" />
                        <text x="25" y="46" fill="#94a3b8" fontSize="8">
                          Horizon B (Subsoil): Moisture Retentive Clay / Silt
                        </text>
                        {/* Water Table and Rooting */}
                        <rect x="10" y="56" width="300" height="20" fill="#0369a1" rx="3" />
                        <text x="25" y="70" fill="#bae6fd" fontSize="8" fontWeight="bold">
                          Percolation & Water Table (Rainfall: {simRainfall} cm)
                        </text>
                        {/* Root Lines */}
                        <line x1="200" y1="10" x2="200" y2="45" stroke="#22c55e" strokeWidth="2" />
                        <line x1="200" y1="45" x2="190" y2="60" stroke="#22c55e" strokeWidth="1.5" />
                        <line x1="200" y1="45" x2="210" y2="60" stroke="#22c55e" strokeWidth="1.5" />
                        <circle cx="200" cy="10" r="4" fill="#16a34a" />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Optimal Crop Match:</span>
                      <h4 className="text-xl font-black text-emerald-400 mt-1">{simulatedCropOutput.crop}</h4>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{simulatedCropOutput.desc}</p>
                    </div>

                    <div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400">Yield Compatibility:</span>
                      <span className="text-sm font-black text-emerald-300">{simulatedCropOutput.suitability}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: INDUSTRY LOCATION ENGINE */}
              {currentSlide === 2 && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'sugar', label: 'Sugar Industry (Agro)', badge: 'Key Industry' },
                      { id: 'cotton', label: 'Cotton Textile (Agro)', badge: 'Coastal Hub' },
                      { id: 'steel', label: 'Iron & Steel (Mineral)', badge: 'Bulky Key' },
                      { id: 'electronics', label: 'Electronics (High-tech)', badge: 'Footloose' }
                    ].map(ind => (
                      <motion.button
                        key={ind.id}
                        aria-label={`Select industry ${ind.label}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleIndustrySelect(ind.id as 'sugar' | 'cotton' | 'steel' | 'electronics')}
                        className={`p-3 rounded-xl text-left transition-all ${
                          selectedIndustry === ind.id
                            ? 'bg-indigo-900/80 border-2 border-indigo-400 text-white'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="text-xs font-black block text-indigo-300">{ind.badge}</span>
                        <span className="text-xs font-bold block mt-1">{ind.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {selectedIndustry === 'sugar' && (
                      <div>
                        <strong className="text-amber-300 text-sm block mb-1">
                          Sugar Mills (UP, Maharashtra):
                        </strong>
                        Sugarcane is heavy and rapidly loses sucrose moisture within 24 hours of cutting. Therefore, mills must be located right in the sugarcane belt (within 50 km). Crushing season lasts only 4–8 months (seasonal industry).
                      </div>
                    )}
                    {selectedIndustry === 'cotton' && (
                      <div>
                        <strong className="text-blue-300 text-sm block mb-1">
                          Cotton Textiles (Mumbai, Ahmedabad, Surat):
                        </strong>
                        Raw cotton can be baled and transported without spoilage. Coastal maritime humidity prevents yarn breakage during high-speed spinning. Port access enables raw cotton imports and textile exports.
                      </div>
                    )}
                    {selectedIndustry === 'steel' && (
                      <div>
                        <strong className="text-rose-300 text-sm block mb-1">
                          Iron & Steel (Jamshedpur, Bhilai, Rourkela, Durgapur):
                        </strong>
                        Iron ore (Mayurbhanj/Bailadila) and coking coal (Jharia/Raniganj) are exceptionally heavy and bulky. Smelters locate directly at raw material junctions to avoid exorbitant freight costs.
                      </div>
                    )}
                    {selectedIndustry === 'electronics' && (
                      <div>
                        <strong className="text-emerald-300 text-sm block mb-1">
                          Electronics & Software (Bengaluru, Hyderabad):
                        </strong>
                        Classic Footloose industry! Components are lightweight and compact. Prime location drivers are skilled IT engineering pools, research institutions, pleasant climate, and digital infrastructure.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: TRANSPORT MAP SIMULATOR (WITH TOPIC SVG DIAGRAM 3) */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-300 block">Select Transport Infrastructure Layer:</span>
                    <div className="grid grid-cols-3 gap-2">
                      <motion.button
                        aria-label="Golden Quadrilateral Road Layer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransportSelect('gq')}
                        className={`p-2 rounded-lg text-xs font-bold ${
                          activeTransportLayer === 'gq'
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Golden Quad (Road)
                      </motion.button>
                      <motion.button
                        aria-label="Broad Gauge Rail Layer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransportSelect('rail')}
                        className={`p-2 rounded-lg text-xs font-bold ${
                          activeTransportLayer === 'rail'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Broad Gauge Rail
                      </motion.button>
                      <motion.button
                        aria-label="NW-1 Waterway Layer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTransportSelect('water')}
                        className={`p-2 rounded-lg text-xs font-bold ${
                          activeTransportLayer === 'water'
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        NW-1 Waterway
                      </motion.button>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1 text-slate-300">
                      <div>Mode: <strong className="text-white">{transportSpeedCost.mode}</strong></div>
                      <div>Speed: <strong className="text-emerald-400">{transportSpeedCost.speed}</strong></div>
                      <div>Freight Cost: <strong className="text-amber-400">{transportSpeedCost.cost}</strong></div>
                      <div>Capacity: <strong className="text-teal-400">{transportSpeedCost.bulkCapacity}</strong></div>
                    </div>
                  </div>

                  {/* TOPIC SPECIFIC SVG 3: INDIA TRANSPORT CORRIDORS */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 300 240" className="w-full h-44">
                      {/* Outline Base */}
                      <polygon points="150,15 220,60 250,110 210,180 150,230 110,180 70,110 90,60" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      
                      {/* Metro Nodes */}
                      <circle cx="150" cy="45" r="5" fill="#f59e0b" />
                      <text x="150" y="35" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Delhi</text>

                      <circle cx="85" cy="125" r="5" fill="#f59e0b" />
                      <text x="60" y="130" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Mumbai</text>

                      <circle cx="235" cy="115" r="5" fill="#f59e0b" />
                      <text x="255" y="115" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Kolkata</text>

                      <circle cx="160" cy="200" r="5" fill="#f59e0b" />
                      <text x="160" y="215" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Chennai</text>

                      {/* Golden Quad Highway Lines */}
                      {activeTransportLayer === 'gq' && (
                        <g stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2">
                          <line x1="150" y1="45" x2="85" y2="125" />
                          <line x1="85" y1="125" x2="160" y2="200" />
                          <line x1="160" y1="200" x2="235" y2="115" />
                          <line x1="235" y1="115" x2="150" y2="45" />
                        </g>
                      )}

                      {/* Broad Gauge Rail Corridors */}
                      {activeTransportLayer === 'rail' && (
                        <g stroke="#3b82f6" strokeWidth="2.5">
                          <line x1="150" y1="45" x2="235" y2="115" />
                          <line x1="150" y1="45" x2="85" y2="125" />
                          <line x1="85" y1="125" x2="160" y2="200" />
                          <line x1="235" y1="115" x2="160" y2="200" />
                          <circle cx="190" cy="95" r="4" fill="#38bdf8" />
                          <text x="190" y="85" textAnchor="middle" fill="#38bdf8" fontSize="8">Jamshedpur/Coal</text>
                        </g>
                      )}

                      {/* NW-1 Ganga Waterway */}
                      {activeTransportLayer === 'water' && (
                        <g stroke="#14b8a6" strokeWidth="3.5">
                          <path d="M 160,55 Q 195,85 235,115" fill="none" />
                          <text x="185" y="70" fill="#2dd4bf" fontSize="8" fontWeight="bold">NW-1 (Ganga: Prayagraj to Haldia)</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: 3RS WASTE LIFECYCLE (WITH TOPIC SVG DIAGRAM 4: Sanitary Landfill & 3R Hierarchy) */}
              {currentSlide === 4 && (
                <div className="space-y-3 pt-2">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <motion.button
                      aria-label="Add composting item"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleWasteDragSortIncrement('compost')}
                      className="p-3 bg-emerald-950/70 border border-emerald-700/50 rounded-xl text-left hover:bg-emerald-900"
                    >
                      <span className="text-xs font-bold text-emerald-300 block">🌿 Composting</span>
                      <span className="text-xs text-slate-400 block mt-1">Kitchen scraps (Count: {wasteBucketCounts.compost})</span>
                    </motion.button>
                    <motion.button
                      aria-label="Add recycling item"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleWasteDragSortIncrement('recycle')}
                      className="p-3 bg-blue-950/70 border border-blue-700/50 rounded-xl text-left hover:bg-blue-900"
                    >
                      <span className="text-xs font-bold text-blue-300 block">🔄 3R Recycling</span>
                      <span className="text-xs text-slate-400 block mt-1">Paper, Glass, Cans (Count: {wasteBucketCounts.recycle})</span>
                    </motion.button>
                    <motion.button
                      aria-label="Add incineration item"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleWasteDragSortIncrement('incinerator')}
                      className="p-3 bg-rose-950/70 border border-rose-700/50 rounded-xl text-left hover:bg-rose-900"
                    >
                      <span className="text-xs font-bold text-rose-300 block">🔥 Incinerator &gt;800°C</span>
                      <span className="text-xs text-slate-400 block mt-1">Syringes & Bio-hazard (Count: {wasteBucketCounts.incinerator})</span>
                    </motion.button>
                    <motion.button
                      aria-label="Add lined landfill item"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleWasteDragSortIncrement('landfill')}
                      className="p-3 bg-amber-950/70 border border-amber-700/50 rounded-xl text-left hover:bg-amber-900"
                    >
                      <span className="text-xs font-bold text-amber-300 block">🛡️ Lined Landfill</span>
                      <span className="text-xs text-slate-400 block mt-1">Residual Inerts (Count: {wasteBucketCounts.landfill})</span>
                    </motion.button>
                  </div>

                  {/* TOPIC SPECIFIC SVG 4: SANITARY LANDFILL CROSS SECTION */}
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">Engineered Sanitary Landfill Protection</span>
                    <svg viewBox="0 0 320 75" className="w-full h-20 rounded-lg bg-slate-900">
                      {/* Garbage fill */}
                      <rect x="20" y="10" width="280" height="25" fill="#475569" rx="2" />
                      <text x="160" y="26" textAnchor="middle" fill="#f1f5f9" fontSize="8" fontWeight="bold">Compacted Municipal Solid Waste + Daily Soil Cap</text>
                      
                      {/* HDPE Geomembrane & Clay Layer */}
                      <rect x="20" y="38" width="280" height="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                      <text x="160" y="43" textAnchor="middle" fill="#38bdf8" fontSize="6">Impermeable HDPE Geomembrane + Compacted Clay</text>
                      
                      {/* Leachate collection pipes */}
                      <rect x="20" y="46" width="280" height="12" fill="#0f172a" />
                      <circle cx="60" cy="52" r="3" fill="#f59e0b" />
                      <circle cx="160" cy="52" r="3" fill="#f59e0b" />
                      <circle cx="260" cy="52" r="3" fill="#f59e0b" />
                      <text x="160" y="66" textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="bold">Leachate Collection Pipes (Protects Aquifer Below)</text>
                    </svg>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                    💡 <strong>3Rs Hierarchy rule:</strong> 1. <strong>Reduce</strong> (Prevent waste) → 2. <strong>Reuse</strong> (Use glass jars/cloth bags again) → 3. <strong>Recycle</strong> (Reprocess into new goods) → 4. <strong>Safe Disposal</strong> (Last resort).
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* OBSERVATION CHECKPOINT (BRILLIANT.ORG 'WHAT DO YOU NOTICE?' PATTERN) */}
          {(currentSlide === 3 || currentSlide === 4) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/50 shadow-md space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-extrabold bg-emerald-500 text-slate-950 rounded uppercase tracking-wider">
                  👁️ Step 2: What Do You Notice?
                </span>
                <span className="text-xs text-emerald-300 font-semibold">Brilliant.org Guided Observation</span>
              </div>
              {(() => {
                const obsIdx = currentSlide === 3 ? 0 : 1;
                const obsQuestion = OBSERVATION_QUESTIONS[obsIdx];
                const selected = observationAnswers[obsQuestion.id];
                return (
                  <div>
                    <p className="text-sm font-bold text-white mb-2">{obsQuestion.question}</p>
                    <div className="space-y-2">
                      {obsQuestion.observableOptions.map((opt, oIdx) => {
                        const isChosen = selected === oIdx;
                        const isCorrect = oIdx === obsQuestion.correctIndex;
                        return (
                          <button
                            key={oIdx}
                            aria-label={`Observation Option ${oIdx + 1}`}
                            onClick={() => handleObservationAnswer(obsQuestion.id, oIdx, obsQuestion.correctIndex)}
                            className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all ${
                              selected !== undefined
                                ? isCorrect
                                  ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                                  : isChosen
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                  : 'bg-slate-900 border-slate-800 text-slate-400'
                                : 'bg-slate-900 hover:bg-slate-800 border-slate-750 text-slate-200'
                            }`}
                          >
                            <span className="font-bold mr-1.5 text-emerald-400">{String.fromCharCode(65 + oIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {selected !== undefined && (
                      <p className="mt-2 text-xs text-emerald-300 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
                        💡 <strong>Geographer insight:</strong> {obsQuestion.explanation}
                      </p>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab step"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab step"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg"
              >
                Launch Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-white">National Grid & Agriculture Command Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">Explore resource balances with zero penalty before attempting graded challenges.</p>
            </div>
            <motion.button
              aria-label="Proceed to challenges"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2 bg-emerald-600 text-white text-xs font-black rounded-xl shadow-lg"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Power Matrix Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">⚡ Power Dispatch Matrix</h4>
              
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Coal Thermal (Jharia / Korba / Talcher)</span>
                  <span className="font-bold text-rose-400">{sandboxCoalCapacity} GW</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={sandboxCoalCapacity}
                  aria-label="Adjust coal thermal power capacity"
                  onChange={e => setSandboxCoalCapacity(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Solar & Wind Parks (Bhadla / Muppandal)</span>
                  <span className="font-bold text-emerald-400">{sandboxSolarCapacity} GW</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={120}
                  value={sandboxSolarCapacity}
                  aria-label="Adjust solar and wind power capacity"
                  onChange={e => setSandboxSolarCapacity(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex gap-2">
                <motion.button
                  aria-label="Toggle Hydroelectric Power"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSandboxHydroActive(!sandboxHydroActive)}
                  className={`flex-1 p-2 rounded-xl text-xs font-bold border transition-all ${
                    sandboxHydroActive
                      ? 'bg-blue-950 border-blue-500 text-blue-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  💧 Hydro (Bhakra/Hirakud) [{sandboxHydroActive ? 'ON: 60GW' : 'OFF'}]
                </motion.button>
                <motion.button
                  aria-label="Toggle Nuclear Power"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSandboxNuclearActive(!sandboxNuclearActive)}
                  className={`flex-1 p-2 rounded-xl text-xs font-bold border transition-all ${
                    sandboxNuclearActive
                      ? 'bg-purple-950 border-purple-500 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-500'
                  }`}
                >
                  ⚛️ Nuclear (Tarapur/Kakrapar) [{sandboxNuclearActive ? 'ON: 80GW' : 'OFF'}]
                </motion.button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-400 block">Total Grid</span>
                  <strong className="text-white text-sm">{sandboxStats.totalPower} GW</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Clean Energy</span>
                  <strong className="text-emerald-400 text-sm">{sandboxStats.greenPercent}%</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">CO2 Index</span>
                  <strong className="text-rose-400 text-sm">{sandboxStats.totalCO2}</strong>
                </div>
              </div>
            </div>

            {/* Right: Crop Suitability Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider mb-2">🌾 Crop Inspector</h4>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'rice', label: 'Rice (Kharif)' },
                    { id: 'wheat', label: 'Wheat (Rabi)' },
                    { id: 'cotton', label: 'Cotton (Cash)' },
                    { id: 'tea', label: 'Tea (Plantation)' },
                    { id: 'jute', label: 'Jute (Golden Fibre)' }
                  ].map(c => (
                    <motion.button
                      key={c.id}
                      aria-label={`Inspect crop ${c.label}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSandboxActiveCrop(c.id as 'rice' | 'wheat' | 'cotton' | 'tea' | 'jute')}
                      className={`p-2 rounded-lg text-xs font-bold ${
                        sandboxActiveCrop === c.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {c.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                {sandboxActiveCrop === 'rice' && (
                  <div>
                    <strong className="text-white block">Rice (Paddy):</strong>
                    Needs ~100 cm rainfall, 25°C temp, flat alluvial deltaic land. Leading: <strong>West Bengal, UP, Punjab</strong>.
                  </div>
                )}
                {sandboxActiveCrop === 'wheat' && (
                  <div>
                    <strong className="text-white block">Wheat:</strong>
                    Needs ~75 cm rain/irrigation, 10–15°C sowing, bright sunshine harvest. Leading: <strong>UP, Punjab, Haryana</strong>.
                  </div>
                )}
                {sandboxActiveCrop === 'cotton' && (
                  <div>
                    <strong className="text-white block">Cotton:</strong>
                    Needs black regur soil, ~100 cm rain, 210 frost-free days. Leading: <strong>Gujarat, Maharashtra</strong>.
                  </div>
                )}
                {sandboxActiveCrop === 'tea' && (
                  <div>
                    <strong className="text-white block">Tea:</strong>
                    Needs 150–300 cm rain, acidic soil on hill slopes for drainage. Leading: <strong>Assam, West Bengal (Darjeeling)</strong>.
                  </div>
                )}
                {sandboxActiveCrop === 'jute' && (
                  <div>
                    <strong className="text-white block">Jute (Golden Fibre):</strong>
                    Needs ~200 cm rain, hot humid deltaic floodplain soil. Leading: <strong>West Bengal, Bihar</strong>.
                  </div>
                )}
              </div>

              <div className="p-2.5 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs text-indigo-300">
                ✨ Ready to demonstrate your geography expertise? Advance to Challenge mode.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
          {/* Animated Canvas Banner */}
          <canvas ref={canvasRef} width={600} height={35} className="w-full rounded-xl bg-slate-900 border border-slate-800" />

          {/* Question Status Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Challenge <strong className="text-white">{currentChallenge + 1}</strong> of {filteredChallenges.length}
            </span>
            <span className="uppercase text-emerald-400 font-bold tracking-wider">
              Competency: {activeChallenge.competencyLevel}
            </span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* MAIN CHALLENGE CARD */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 sm:p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {activeChallenge.question}
            </h3>

            {/* TYPE 1: CLASSIFY / DISTINGUISH / MATCH (MCQ) */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-850 hover:bg-slate-800 text-slate-200 border-slate-750'
                      }`}
                    >
                      <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                      {showExplanation && i === activeChallenge.correctIndex && (
                        <span className="ml-2 text-emerald-400 font-bold">✓ (Correct)</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: DRAG LABEL ON DIAGRAM */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  {[
                    { id: 'loc_tn', region: 'Muppandal (Tamil Nadu — Coastal Corridor)' },
                    { id: 'loc_hp', region: 'Manikaran (Himachal Pradesh — Hot Springs)' },
                    { id: 'loc_guj', region: 'Gulf of Kutch/Khambhat (Gujarat — High Tides)' },
                    { id: 'loc_raj', region: 'Thar Desert (Rajasthan — Clear Skies)' }
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex flex-col justify-between min-h-[70px]"
                    >
                      <span className="text-slate-400 font-semibold">{target.region}</span>
                      <span className="text-emerald-400 font-black mt-1">
                        Target: {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[Drag Match Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify matched locations"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Matched Locations
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG SORT SEQUENCE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <div
                      key={displayIdx}
                      role="button"
                      aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      className="p-3 bg-slate-850 hover:bg-slate-800 border border-slate-750 rounded-xl text-xs text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{displayIdx + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Submit ordered sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Ordered Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC INPUT */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Enter numeric value in cm"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-44 font-bold"
                  />
                  <span className="text-xs text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Check Numeric Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT COMBINATION */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs font-bold text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl min-h-[50px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900 border border-indigo-600 rounded-lg text-xs font-bold text-white flex items-center gap-1"
                    >
                      {p}
                      <motion.button
                        aria-label={`Remove part ${p}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold ml-1"
                      >
                        ✕
                      </motion.button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Select parts from above to build your answer</span>}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    aria-label="Check constructed combination"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Check Construction
                  </motion.button>
                  <motion.button
                    aria-label="Clear combination selection"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setConstructParts([])}
                    className="px-3 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-bold"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-3">
                <span className="text-xs font-black text-amber-300 uppercase tracking-wider block">
                  📋 Board Examiner Analysis & Walkthrough:
                </span>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p key={sIdx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-100 leading-relaxed">
                      <strong className="text-amber-400 mr-1.5">{sIdx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Show next explanation step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to next challenge or final screen"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. FINAL COMPLETION & MOTIVATIONAL REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-6">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-2xl border border-indigo-800/60 text-center space-y-3 shadow-xl"
          >
            <span className="text-4xl">🎖️</span>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="p-4 bg-emerald-950/60 border border-emerald-600/50 rounded-xl max-w-lg mx-auto"
            >
              <h2 className="text-2xl font-black text-emerald-300">{motivationalFeedback.title}</h2>
              <p className="text-xs text-slate-200 mt-1">{motivationalFeedback.desc}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-emerald-800/50 text-emerald-200 font-bold text-xs rounded-full border border-emerald-500/40">
                {motivationalFeedback.badge}
              </span>
            </motion.div>

            <p className="text-xs text-slate-300 max-w-xl mx-auto pt-2">
              You have mastered the ICSE Class 10 core syllabus across Conventional/Non-conventional Energy, Food & Cash Crops, Agro/Mineral Industries, Transport Corridors, and the 3Rs.
            </p>
            <div className="flex justify-center gap-4 text-xs font-bold pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Final Score</span>
                <span className="text-emerald-400 text-lg font-black">{Math.max(0, 100 - errors * 4)}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Mastery Status</span>
                <span className="text-indigo-300 text-lg font-black capitalize">{masteryLevel}</span>
              </div>
            </div>
          </motion.div>

          {/* ─── PROMINENT SPACED REPETITION (SRS) VISIBILITY BANNER ─── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-gradient-to-r from-amber-950/80 via-slate-900 to-indigo-950/80 border-2 border-amber-500/60 rounded-2xl shadow-xl space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏰</span>
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                    SuperMemo-2 (SM-2) Spaced Repetition Schedule
                  </h3>
                  <p className="text-xs text-slate-300">Cognitive retention curve for ICSE Geography mastery</p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow uppercase">
                {srsRecommendation.intervalText}
              </span>
            </div>

            <div className="p-3 bg-slate-950/90 rounded-xl border border-amber-700/40 text-xs text-amber-200 leading-relaxed">
              📅 <strong>Next Review Window:</strong> Please revisit this simulation for optimal memory consolidation in{' '}
              <strong className="text-white text-sm underline decoration-amber-400 decoration-2">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>
              . ({srsRecommendation.note})
            </div>
          </motion.div>

          {/* MISCONCEPTION AUDIT */}
          {hitMisconceptions.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/40 border border-rose-800/50 rounded-2xl space-y-3">
              <h3 className="text-xs font-black text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Misconception Review
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-400 font-bold">✗ Myth: {item.misconception}</p>
                    <p className="text-emerald-300 mt-1 font-semibold">✓ ICSE Correction: {item.correction}</p>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* REAL WORLD ACTIVITY AUDIT */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-black text-emerald-300 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="p-2.5 bg-slate-950 rounded-lg text-xs text-slate-300">
                  <strong className="text-emerald-400 mr-1.5">{sIdx + 1}.</strong> {st}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Resource Command Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C10_GeographyEnergyResourcesConventionalSim;