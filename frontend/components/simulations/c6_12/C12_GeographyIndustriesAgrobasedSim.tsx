'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
  Line,
  Cell
} from 'recharts';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 GEOGRAPHY NODE IDS ───
const NODE_C12_GEO_031 = 'c12_geo_031'; // Industries — agro-based
const NODE_C12_GEO_032 = 'c12_geo_032'; // Industries — mineral-based
const NODE_C12_GEO_033 = 'c12_geo_033'; // Tourism industry
const NODE_C12_GEO_034 = 'c12_geo_034'; // Regional economic development
const NODE_C12_GEO_035 = 'c12_geo_035'; // Map work — India
const ALL_NODE_IDS = [
  NODE_C12_GEO_031,
  NODE_C12_GEO_032,
  NODE_C12_GEO_033,
  NODE_C12_GEO_034,
  NODE_C12_GEO_035
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Industrial Transformation of India: Spatial Economics & Planning',
  intro:
    'You are appointed Chief Industrial & Spatial Geographer for the National Planning Commission. India is experiencing sweeping transformations across agro-industrial corridors, heavy mineral-metallurgical clusters, fragile ecotourism zones, and high-tech nodal regions. Your task is to analyze location dynamics, avert resource crises, and guide balanced regional development.',
  context:
    'From the 24-hour perishability clock of Deccan sugarcane to the coastal logistics of Visakhapatnam Steel and the ecological threshold of the Sundarbans near Haldia port, spatial decisions determine national economic prosperity.'
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_cane_transit',
    question: 'If cut sugarcane transit time increases from 6 hours to 36 hours, what will happen to the mill recovery rate?',
    options: [
      'Recovery rate stays constant because raw cane weight does not change',
      'Recovery rate drops sharply as sucrose inverts to non-crystallizable glucose',
      'Recovery rate increases because moisture evaporates leaving concentrated sucrose',
      'Recovery rate doubles due to natural lactic fermentation'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the transit hours slider from 6 to 36 hours in Lab 1 and observe the Recovery % and Viability gauges.',
    explanation: 'Beyond the 24-hour harvest window, invertase enzymes break sucrose down into invert sugars, plummeting mill recovery.'
  },
  {
    id: 'pred_freight_decay',
    question: 'How will transport freight costs compare between heavy integrated steel and lightweight electronics over an 800 km haul?',
    options: [
      'Both commodities incur identical freight rates per tonne over long distances',
      'Steel freight escalates steeply due to heavy bulk weight, while electronics freight shows a nearly flat slope',
      'Electronics freight will be 10x higher because microcircuits are delicate',
      'Steel freight decreases over distance due to terminal rail subsidies'
    ],
    verifyInstruction: 'Adjust the haul distance slider to 800 km in Lab 3 to compare the steep steel freight curve with the flat electronics curve.',
    explanation: 'Weight-losing key industries like integrated steel have steep distance-decay curves, whereas footloose electronics exhibit spatial locational freedom with minimal haul cost variation.'
  }
];

// ─── OBSERVATION QUESTIONS (Brilliant.org "What Do You Notice?" Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_sugar_inversion',
    question: 'Observe the Sugarcane Decay Lab visualization. What happens to the mill status indicator once transit time surpasses 24 hours?',
    options: [
      'The mill indicator turns red and signals severe inverted sucrose with unviable recovery (<7%)',
      'The mill indicator turns bright green signaling maximum sucrose crystals',
      'The sugar mill automatically shuts down power generators',
      'The delivery truck speed doubles on the transit graph'
    ],
    observableOptions: [
      'The mill indicator turns red and signals severe inverted sucrose with unviable recovery (<7%)',
      'The mill indicator turns bright green signaling maximum sucrose crystals',
      'The sugar mill automatically shuts down power generators',
      'The delivery truck speed doubles on the transit graph'
    ],
    correctIndex: 0,
    explanation: 'At 24+ hours of transit, the indicator turns red because invertase enzymes invert sucrose into glucose and fructose, causing severe economic loss.'
  },
  {
    id: 'obs_tourism_carrying_capacity',
    question: 'In the Tourism Carrying Capacity Lab, what critical deficit appears when monthly visitor influx exceeds 22,000 visitors?',
    options: [
      'Artisan income index immediately collapses to 0',
      'A severe municipal water deficit emerges as demand exceeds the sustainable 5.5 MLD supply threshold',
      'The hill station roads are completely removed from the simulation map',
      'Electricity consumption drops to zero across all hotels'
    ],
    observableOptions: [
      'Artisan income index immediately collapses to 0',
      'A severe municipal water deficit emerges as demand exceeds the sustainable 5.5 MLD supply threshold',
      'The hill station roads are completely removed from the simulation map',
      'Electricity consumption drops to zero across all hotels'
    ],
    correctIndex: 1,
    explanation: 'Above the ecological carrying capacity (~22,000 visitors), municipal water infrastructure cannot sustain visitor demand, triggering acute water shortages and slope stress.'
  }
];

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'A cooperative sugar mill in Maharashtra is planned 120 km away from the sugarcane fields (a 30-hour transport transit). What is the primary geographic-biochemical consequence?',
  options: [
    'Transportation freight cost decreases due to highway economies of scale',
    'Sucrose content in the cut cane deteriorates rapidly, plummeting sugar recovery and yield',
    'Yarn spinning breakage increases because atmospheric humidity drops inland',
    'Blast furnace coking coal requirements double due to distance decay'
  ],
  correctIndex: 1,
  hintAfter:
    'Sugarcane is bulky and weight-losing with a strictly perishable 24-hour processing window! Let us explore the spatial geography of Indian industries.'
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

// ─── CHALLENGES ARRAY (22 Comprehensive Challenges) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_geo_001_found',
    nodeId: NODE_C12_GEO_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which pair of cities represents the primary syllabus centres for the Sugar Industry in Maharashtra and Uttar Pradesh respectively?',
    options: [
      'Ahmednagar & Pune (MH) vs Muzaffarnagar & Saharanpur (UP)',
      'Mumbai & Surat (MH/GJ) vs Kanpur & Varanasi (UP)',
      'Bhilai & Korba (CG) vs Jamshedpur & Bokaro (JH)',
      'Ahmedabad & Surat (GJ) vs Salem & Coimbatore (TN)'
    ],
    correctIndex: 0,
    explanation:
      'In Maharashtra, the primary sugar centres are Ahmednagar and Pune in the Deccan sugarcane belt. In Uttar Pradesh, they are Muzaffarnagar and Saharanpur in the fertile western Doab tract.',
    hints: [
      'Think of the Deccan plateau sugarcane belt in Maharashtra and western UP.',
      'Ahmednagar has a renowned cooperative sugar network; Muzaffarnagar is the sugar bowl of western UP.',
      'The correct pair is Ahmednagar/Pune for Maharashtra and Muzaffarnagar/Saharanpur for UP.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_002_found',
    nodeId: NODE_C12_GEO_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Match each agro-industrial location factor to its decisive operational rationale.',
    dragItems: [
      { label: '24-hr Perishability', targetId: 'box_sugar' },
      { label: 'Moist Coastal Air', targetId: 'box_cotton' },
      { label: 'Farmer Ownership', targetId: 'box_coop' },
      { label: 'Port Machinery Imports', targetId: 'box_port' }
    ],
    correctMapping: {
      box_sugar: '24-hr Perishability',
      box_cotton: 'Moist Coastal Air',
      box_coop: 'Farmer Ownership',
      box_port: 'Port Machinery Imports'
    },
    explanation:
      'Sugar mills locate at fields because cane loses sucrose within 24h. Cotton spinning needs humid air to prevent yarn breakage. Maharashtra sugar thrives on farmer-owned cooperatives. Mumbai cottonopolis grew from port-enabled machinery imports.',
    hints: [
      'Which factor prevents sucrose inversion in sugarcane after cutting?',
      'Why did coastal Mumbai allow thin yarn to be spun without snapping on spindles?',
      'Connect: Perishability->Sugar, Moist air->Cotton, Cooperatives->Farmer ownership, Port->Machinery imports.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_003_found',
    nodeId: NODE_C12_GEO_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which integrated iron and steel plant in India is uniquely located on the sea coast, enabling maritime import of coking coal and export of finished steel?',
    options: [
      'Bhilai Steel Plant (Chhattisgarh)',
      'Visakhapatnam Steel Plant (Andhra Pradesh)',
      'Rourkela Steel Plant (Odisha)',
      'Bhadravati Steel Plant (Karnataka)'
    ],
    correctIndex: 1,
    explanation:
      'Visakhapatnam Steel Plant (RINL) in Andhra Pradesh is India’s premier shore-based integrated steel plant, sited specifically for deep-water port access.',
    hints: [
      'Look for a coastal port city on the south-eastern seaboard of India.',
      'Unlike inland mine-adjacent plants like Bhilai, this plant sits right at a natural harbour.',
      'Visakhapatnam in Andhra Pradesh is the shore-based plant.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_004_found',
    nodeId: NODE_C12_GEO_032,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'How do mini steel plants differ fundamentally from integrated steel plants in their raw material and melting technology?',
    options: [
      'Mini plants smelt raw iron ore in massive blast furnaces using coking coal',
      'Mini plants melt scrap steel or sponge iron in electric arc or induction furnaces',
      'Mini plants only produce pig iron and cannot roll finished steel rods',
      'Mini plants are always located directly inside coal mines'
    ],
    correctIndex: 1,
    explanation:
      'Mini steel plants are decentralised, electric-powered units that melt scrap steel or direct-reduced sponge iron, skipping blast furnace smelting of iron ore.',
    hints: [
      'Think about what mini plants melt instead of heavy mined ore.',
      'They do not use blast furnaces; they use electric power and scrap metal.',
      'Mini steel plants recycle scrap steel / sponge iron in electric arc furnaces.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_005_found',
    nodeId: NODE_C12_GEO_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'According to the ISC syllabus definition, which of the following is NOT a recognized purpose of tourist travel?',
    options: [
      'Pilgrimage to shrines like Tirupati or Vaishno Devi',
      'Engaging in permanent paid employment at the destination',
      'Attending an international business trade expo in New Delhi',
      'Educational field studies at the ruins of Hampi'
    ],
    correctIndex: 1,
    explanation:
      'Tourism involves temporary travel (<12 months) for leisure, business, pilgrimage, education, or recreation without engaging in paid employment at the destination.',
    hints: [
      'Tourism implies non-resident visitors who spend income earned elsewhere.',
      'Taking up a local permanent paying job changes the status from tourist to economic migrant.',
      'Paid employment at the destination is excluded from the definition of tourism.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_006_found',
    nodeId: NODE_C12_GEO_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'A planning region delineated on the basis of a single uniform characteristic, such as the black-soil cotton belt of the Deccan, is classified as a:',
    options: [
      'Nodal region',
      'Functional region',
      'Homogeneous region',
      'Metropolitan administrative district'
    ],
    correctIndex: 2,
    explanation:
      'A homogeneous region exhibits internal uniformity in a specific physical or economic attribute (e.g. soil, rainfall, crop belt), whereas nodal and functional regions are organized around flows and focal points.',
    hints: [
      'The word means "of the same kind or nature throughout".',
      'It is defined by internal uniformity rather than radiating city flows.',
      'Uniform feature = Homogeneous region.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_007_found',
    nodeId: NODE_C12_GEO_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'What is the correct latitudinal and longitudinal mainland extent of India?',
    options: [
      'Lat: 8°4\' N to 37°6\' N | Long: 68°7\' E to 97°25\' E',
      'Lat: 6°4\' S to 32°6\' N | Long: 70°0\' E to 105°0\' E',
      'Lat: 10°0\' N to 45°0\' N | Long: 60°0\' E to 90°0\' E',
      'Lat: 4°2\' N to 35°8\' N | Long: 65°5\' E to 95°2\' E'
    ],
    correctIndex: 0,
    explanation:
      'India’s mainland latitudinal extent is 8°4\' N (Kanyakumari) to 37°6\' N (Indira Col, Kashmir), and longitudinal extent is 68°7\' E (Ghuar Mota, Gujarat) to 97°25\' E (Kibithu, Arunachal Pradesh).',
    hints: [
      'Kanyakumari is just over 8 degrees North of the equator.',
      'Arunachal Pradesh reaches eastward to approximately 97°25\' E.',
      '8°4\' N to 37°6\' N latitude and 68°7\' E to 97°25\' E longitude.'
    ]
  },

  // ── STANDARD TIER (8-15) ──
  {
    id: 'ch_geo_008_std',
    nodeId: NODE_C12_GEO_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why has Maharashtra overtaken Uttar Pradesh as India’s leading sugar-producing state, despite UP having vast sugarcane acreage?',
    options: [
      'Maharashtra receives three times more monsoon rainfall than Uttar Pradesh',
      'Maharashtra’s tropical maritime climate yields higher sucrose %, a longer crushing season, and robust cooperative management',
      'Uttar Pradesh mills are prohibited from selling molasses for industrial ethanol',
      'Maharashtra farmers use cheap hydel power exclusively without needing irrigation'
    ],
    correctIndex: 1,
    explanation:
      'Maharashtra’s tropical climate prevents winter frost, extending the crushing season (160–180 days vs 120–135 days in UP) and producing higher sucrose concentration (10.5–12% vs 9–10%), reinforced by efficient farmer cooperatives.',
    hints: [
      'Compare peninsular tropical climate with north Indian continental winter.',
      'Think about crushing season length and the biochemical sucrose accumulation.',
      'Higher sucrose content, longer crushing season, and cooperative management give Maharashtra the lead.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_009_std',
    nodeId: NODE_C12_GEO_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'A Maharashtra mill crushes 10,000 tonnes of cane with 11.5% sucrose recovery. A North Indian mill crushes the same tonnage with only 9.5% recovery. How many additional tonnes of pure sugar does the Maharashtra mill produce from this batch?',
    correctAnswer: 200,
    tolerance: 5,
    unit: 'tonnes',
    explanation:
      'Maharashtra: 10,000 × 0.115 = 1,150 tonnes. North India: 10,000 × 0.095 = 950 tonnes. Additional sugar = 1,150 - 950 = 200 tonnes.',
    hints: [
      'Calculate 11.5% of 10,000 tonnes first (1,150 tonnes).',
      'Calculate 9.5% of 10,000 tonnes next (950 tonnes).',
      'Subtract 950 from 1,150 to get 200 tonnes.'
    ]
  },
  {
    id: 'ch_geo_010_std',
    nodeId: NODE_C12_GEO_032,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Match the integrated steel plant with its decisive geographical location factor.',
    options: [
      'Rourkela (Hirakud hydel power & Odisha iron ore) | Bhadravati (Western Ghats charcoal/forests & Baba Budan ore)',
      'Durgapur (Offshore oil) | Salem (Jharia coalfield)',
      'Bhilai (Sea port export) | TISCO (Hirakud hydel grid)',
      'Bokaro (Coastal imports) | Visakhapatnam (Singhbhum iron ore)'
    ],
    correctIndex: 0,
    explanation:
      'Rourkela in Odisha was set up near iron ore with power from Hirakud Dam. Bhadravati in Karnataka historically utilized Western Ghats forest timber (charcoal) and local Kemmangundi ore.',
    hints: [
      'Which plant was supported by the Hirakud Hydroelectric Project in Odisha?',
      'Which southern plant in Karnataka historically relied on forest fuel before modern grids?',
      'Option A pairs Rourkela and Bhadravati with their authentic geographic location factors.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_011_std',
    nodeId: NODE_C12_GEO_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Contrast a "Key Industry" (e.g. Iron & Steel) with a "Footloose Industry" (e.g. Electronics / Garments).',
    options: [
      'Key industries are weight-losing and tied to heavy raw materials; footloose industries use light components and locate flexibly near markets or transport nodes',
      'Key industries produce luxury items; footloose industries produce heavy machinery',
      'Key industries are completely free from government regulations; footloose industries are state-owned',
      'Key industries operate only in coastal ports; footloose industries operate only in hill stations'
    ],
    correctIndex: 0,
    explanation:
      'Key industries (like steel) consume heavy, weight-losing raw materials (iron ore, coking coal, flux), tying them to mines. Footloose industries use light, high-value inputs and can locate flexibly based on skilled labour and markets.',
    hints: [
      'Think of a tree rooted to its soil (key) vs a bird landing anywhere (footloose).',
      'Weight-losing raw materials force key industries to sit near ore and coal deposits.',
      'Option A correctly captures raw material weight-loss vs spatial locational freedom.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_012_std',
    nodeId: NODE_C12_GEO_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Shimla and Manali experience acute water shortages, traffic gridlocks, and slope destabilisation every May–June. This crisis represents a breach of:',
    options: [
      'The Gross Domestic Tourist Product',
      'Ecological Carrying Capacity of the hill ecosystem',
      'The PRASHAD religious heritage guidelines',
      'The Golden Quadrilateral speed regulations'
    ],
    correctIndex: 1,
    explanation:
      'Ecological carrying capacity is the maximum population and tourist influx an ecosystem can sustainably support without irreversible resource depletion or degradation.',
    hints: [
      'What term denotes the upper limit of visitors a fragile environment can support?',
      'When tourist demand exceeds local water and road infrastructure limits, this capacity is breached.',
      'It is the "Ecological Carrying Capacity".'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_013_std',
    nodeId: NODE_C12_GEO_034,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Arrange India’s multilevel planning tiers in hierarchical order from national apex to grassroots base.',
    sortItems: [
      'National Level (NITI Aayog / Union Ministries)',
      'State Level (State Planning Boards)',
      'District Level (District Planning Committees)',
      'Block Level (Block Development Offices & Gram Sabhas)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Multilevel planning flows from National (apex) → State → District → Block/Panchayat (grassroots) to tailor development to local spatial disparities.',
    hints: [
      'Start with the central apex organisation in New Delhi.',
      'States come next, followed by administrative districts and local community blocks.',
      'Order: National (0) -> State (1) -> District (2) -> Block (3).'
    ]
  },
  {
    id: 'ch_geo_014_std',
    nodeId: NODE_C12_GEO_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why was Haldia port developed at the confluence of the Hugli and Haldi rivers, and what is its major environmental threat?',
    options: [
      'To relieve Kolkata port siltation problems; its major threat is effluent and dredging damage to the Sundarbans mangrove ecosystem',
      'To export timber from the Himalayas; its threat is desertification in the Rann of Kutch',
      'To smelt bauxite from Kerala; its threat is melting Himalayan glaciers',
      'To serve exclusively as an international passenger cruise terminal for Tibet'
    ],
    correctIndex: 0,
    explanation:
      'Haldia was developed as a deep-water supplementary port to silting Kolkata port. Handling petroleum, chemicals, and fertilisers risks toxic spills and ecological disruption in the adjacent Sundarbans biosphere.',
    hints: [
      'Why was a downstream port needed along the Hooghly estuary?',
      'Which UNESCO mangrove biosphere reserve lies in the Ganga-Brahmaputra delta nearby?',
      'Option A links Kolkata port relief with ecological threats to the Sundarbans.'
    ]
  },
  {
    id: 'ch_geo_015_std',
    nodeId: NODE_C12_GEO_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'On an outline map of India, how must the Eastern Ghats and Satpura Range be positioned to avoid recurring board examination errors?',
    options: [
      'Eastern Ghats must hug the Bay of Bengal coastline; Satpura must be drawn north of the Ganga',
      'Eastern Ghats must be drawn inland (separated by the Coromandel plain); Satpura must be drawn strictly between the Narmada and Tapi rift valleys',
      'Eastern Ghats are a continuous unbroken wall; Satpura runs parallel to the Himalayas in Assam',
      'Eastern Ghats meet the Aravallis at Delhi; Satpura lies in the Thar Desert'
    ],
    correctIndex: 1,
    explanation:
      'CISCE examiners flag that the Eastern Ghats are discontinuous and lie inland (not on the beach). Satpura is a horst block sitting strictly between the west-flowing Narmada and Tapi rift rivers.',
    hints: [
      'Remember the coastal plain separates the Eastern Ghats from the sea.',
      'Between which two west-flowing rift valley rivers does the Satpura range sit?',
      'Eastern Ghats are inland; Satpura is sandwiched between Narmada and Tapi.'
    ],
    misconceptionIndex: 0
  },

  // ── ADVANCED & COMPETENCY-BASED TIER (16-22) ──
  {
    id: 'ch_geo_016_adv',
    nodeId: NODE_C12_GEO_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Evaluate the decentralisation of India’s cotton textile industry from the historic Mumbai–Ahmedabad "cottonopolis" hub to interior powerloom centres (e.g. Bhiwandi, Surat, Coimbatore). What drove this shift?',
    options: [
      'Depletion of black soil minerals across Maharashtra and Gujarat',
      'High urban land values, obsolete composite mill machinery, labour disputes, and the rise of flexible, low-cost decentralised powerloom units',
      'Complete ban on cotton textile exports by the Ministry of Commerce',
      'The Arabian Sea losing its coastal atmospheric humidity'
    ],
    correctIndex: 1,
    explanation:
      'High real estate costs, militant labour unrest, rigid mill structures, and aged machinery caused old Mumbai composite mills to close. Decentralised powerlooms and handlooms in secondary towns offered greater flexibility and lower overheads.',
    hints: [
      'Think about urban land costs in central Mumbai and the rise of powerloom clusters.',
      'Did machinery age and synthetic fibre competition affect old composite mills?',
      'Option B explains the economic and structural factors behind decentralisation.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_017_adv',
    nodeId: NODE_C12_GEO_032,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Construct the optimal raw material supply chain for an inland integrated iron and steel plant by selecting the required geological inputs.',
    availableParts: ['Iron Ore (Hematite)', 'Coking Coal', 'Limestone Flux', 'Crude Petroleum', 'Bauxite Ore', 'Natural Gas'],
    targetState: 'Iron Ore (Hematite) Coking Coal Limestone Flux',
    validationHint: 'Select the 3 primary bulk mineral inputs consumed in a blast furnace to produce pig iron and steel.',
    explanation:
      'An integrated steel plant fundamentally consumes iron ore (iron source), coking coal (reducing agent & fuel in blast furnace), and limestone (flux to remove impurities as slag).',
    hints: [
      'You need the metallic ore, the metallurgical fuel/carbon source, and the fluxing agent.',
      'Blast furnaces do not run on bauxite or crude oil.',
      'Click Iron Ore, Coking Coal, and Limestone Flux.'
    ]
  },
  {
    id: 'ch_geo_018_adv',
    nodeId: NODE_C12_GEO_032,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Analyze the locational logic of India’s oil refineries: why is Digboi located inland while Haldia, Mumbai, and Visakhapatnam are coastal?',
    options: [
      'Digboi is an oilfield-based refinery sited at the crude source; coastal refineries are market-and-port based to process imported crude petroleum',
      'Digboi processes imported Persian Gulf crude transported by river barge',
      'Coastal refineries do not refine diesel, only aviation turbine fuel',
      'Digboi was relocated to Assam to escape coastal cyclones'
    ],
    correctIndex: 0,
    explanation:
      'Digboi (Assam) is India’s oldest field-based refinery sitting directly on an oilfield. Coastal refineries (Haldia, Mumbai, Vizag) process crude imported via oil tankers across international sea lanes.',
    hints: [
      'Where does Digboi get its crude oil from?',
      'Where do coastal port refineries get the bulk of their crude?',
      'Digboi is at the oil well; coastal refineries receive ocean tankers.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_geo_019_adv',
    nodeId: NODE_C12_GEO_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'According to CISCE 2025 examiner observations, how should "Responsible Ecotourism" be correctly formulated to ensure community empowerment?',
    options: [
      'Enforcing strict 5-star luxury resort construction by foreign MNCs with zero local entry',
      'Emphasizing tourist behavioural ethics, carrying capacity caps, and direct income distribution to local homestays, artisans, and tribal guides',
      'Constructing multi-lane expressways across national park core zones to maximize visitor volume',
      'Replacing local handlooms with mechanized imported synthetic souvenir production'
    ],
    correctIndex: 1,
    explanation:
      'CISCE examiners specifically noted that responsible tourism requires ethical tourist conduct, ecological caps, and economic benefit sharing with local artisans, guides, and homestay hosts rather than elite hotel chains alone.',
    hints: [
      'Remember the examiner note on benefiting local artisans, not just big hotel chains.',
      'Look for community participation, carrying capacity, and visitor ethics.',
      'Option B champions local community empowerment and ecological stewardship.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_geo_020_adv',
    nodeId: NODE_C12_GEO_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In the Chhattisgarh Area Development case study, which combination of economic pillars represents its integrated regional strategy?',
    options: [
      'Software IT hubs + Automobile assembly + Offshore fishing',
      'Mineral extraction (Bailadila iron ore, Korba coal) + Forest silk rearing (Tasar silk) + Agriculture (Rice, pulses)',
      'Nuclear reactors + Cotton ginning + Tourism cruise liners',
      'Petrochemical cracking + Tea plantations + Diamond cutting'
    ],
    correctIndex: 1,
    explanation:
      'Chhattisgarh’s regional development model balances heavy mining (Bailadila iron, Korba coal, bauxite) with tribal forest-based Tasar silk rearing/weaving and staple paddy farming.',
    hints: [
      'Think of Bailadila iron ore, Korba coal, tribal forest silk (Tasar), and the "rice bowl" plains.',
      'The model integrates heavy minerals with traditional tribal sericulture and agriculture.',
      'Option B correctly identifies the three Chhattisgarh development pillars.'
    ]
  },
  {
    id: 'ch_geo_021_adv',
    nodeId: NODE_C12_GEO_034,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Differentiate "Economic Growth" from "Regional Economic Development" in the context of Indian national planning.',
    options: [
      'Economic growth is purely a quantitative increase in GDP/output; regional development encompasses qualitative gains in health, literacy, infrastructure, and disparity reduction',
      'Economic growth is for rural blocks only; regional development is exclusively for IT hubs',
      'Economic growth requires environmental degradation; development prohibits all industrial factories',
      'Both terms are identical in statistical measurement and spatial planning'
    ],
    correctIndex: 0,
    explanation:
      'Economic growth measures quantitative production increases (GDP, per capita income). Development is growth plus qualitative improvements in life quality, human development indices, and reduction in spatial disparities.',
    hints: [
      'Growth is quantitative (more money/goods); development is qualitative (better quality of life).',
      'Can a region have high mining output but poor tribal schools and hospitals? Yes — that is growth without development.',
      'Option A provides the exact geographical and developmental distinction.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_geo_022_adv',
    nodeId: NODE_C12_GEO_035,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'Arrange India’s western coastal plains and peninsular east-flowing rivers in strict geographic order from North to South.',
    sortItems: [
      'Konkan Coast (Maharashtra-Goa) & Mahanadi River (Odisha)',
      'Kanara Coast (Karnataka) & Godavari River (Andhra/Telangana)',
      'Malabar Coast (Kerala) & Krishna River (Andhra/Karnataka)',
      'Coromandel Coast (Tamil Nadu) & Kaveri River (Tamil Nadu)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'From North to South: Western coast = Konkan → Kanara → Malabar. East-flowing rivers = Mahanadi → Godavari → Krishna → Kaveri. Coromandel coast is the south-eastern plain.',
    hints: [
      'Remember the mnemonic: "Kingfishers Can Manage Malabar" (Konkan, Kanara, Malabar).',
      'For rivers: Mahanadi (North) -> Godavari -> Krishna -> Kaveri (South).',
      'The sequence is ordered 0 -> 1 -> 2 -> 3.'
    ],
    misconceptionIndex: 1
  }
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_GEO_031,
  title: 'Industries, Tourism, Regional Development & Map Work of India',
  definition:
    'A comprehensive synthesis of Indian economic geography: agro-based sugar and cotton textile localization; mineral-based iron & steel, petrochemicals and refineries; the economics and carrying capacity of tourism; multilevel regional planning models (Chhattisgarh, Bengaluru, Haldia); and precision cartographic mapping of physical and economic features of India.',
  eli5:
    'Think of India as a giant workshop. Sugar mills sit next to sugarcane fields because cut cane goes stale in a single day. Steel plants sit beside coal and iron mountains because rocks are too heavy to drag far. Tech parks cluster around colleges and cool weather, while tourists need care so they do not ruin the beautiful places they visit!',
  misconceptions: [
    {
      misconception: 'Citing sugarcane agricultural factors (soil, rainfall) when asked about industrial mill location.',
      correction: 'Sugar industry location is governed by raw material perishability (24-hour crushing limit), transport speed, labour, power, and cooperative management — not farming rainfall.'
    },
    {
      misconception: 'Assuming mini steel plants are just smaller versions of blast-furnace integrated steel plants.',
      correction: 'Mini steel plants skip iron ore smelting entirely; they melt recycled scrap steel or sponge iron using electric arc furnaces to serve local markets.'
    },
    {
      misconception: 'Believing all oil refineries in India are located right at oilfields.',
      correction: 'Only Digboi is an oilfield refinery; coastal plants like Haldia, Mumbai, and Visakhapatnam are port-based to process imported ocean crude.'
    },
    {
      misconception: 'Equating regional economic growth directly with regional economic development.',
      correction: 'Economic growth is just quantitative GDP/output; regional development requires qualitative improvements in living standards, tribal welfare, schools, health, and reduced regional inequality.'
    },
    {
      misconception: 'Drawing the Eastern Ghats right along the shoreline and confusing western coastal plain sequences.',
      correction: 'Eastern Ghats are discontinuous and sit inland behind the Coromandel plain. Western plains from north to south run Konkan → Kanara → Malabar.'
    }
  ],
  diagnosticQuestions: [
    {
      question: 'Why must sugar mills be located within 24 hours transit of sugarcane harvesting fields?',
      options: [
        'Sugarcane loses sucrose rapidly once cut',
        'Sugarcane increases in weight if kept in open air',
        'Sugarcane catches fire spontaneously',
        'Sugarcane turns into cotton yarn'
      ],
      correctIndex: 0
    },
    {
      question: 'Which factor made historic Mumbai the "cottonopolis" of India?',
      options: [
        'Sub-zero Himalayan temperatures',
        'Humid coastal climate, port for machinery/exports, black soil hinterland, and hydel power',
        'Huge iron ore and coking coal mines inside the city',
        'Absence of any textile handloom weavers'
      ],
      correctIndex: 1
    },
    {
      question: 'Which of the following is a classic example of a "Footloose Industry"?',
      options: ['Integrated Iron and Steel', 'Electronics and Garment Assembly', 'Heavy Copper Smelting', 'Sugar Milling'],
      correctIndex: 1
    },
    {
      question: 'What is the oldest oil refinery in India, located directly at its raw material oilfield?',
      options: ['IOCL Barauni', 'HPCL Mumbai', 'IOCL Digboi', 'IOCL Haldia'],
      correctIndex: 2
    },
    {
      question: 'What is the Golden Triangle tourist circuit in India?',
      options: ['Delhi–Agra–Jaipur', 'Mumbai–Goa–Kochi', 'Kolkata–Bhubaneswar–Puri', 'Chennai–Madurai–Bengaluru'],
      correctIndex: 0
    },
    {
      question: 'What type of planning region is defined by the hinterland flows radiating to and from Haldia port?',
      options: ['Homogeneous region', 'Functional region', 'Political region', 'Topographic ridge'],
      correctIndex: 1
    },
    {
      question: 'Between which two west-flowing rivers does the Satpura mountain range lie?',
      options: ['Ganga and Yamuna', 'Narmada and Tapi', 'Godavari and Krishna', 'Mahanadi and Brahmaputra'],
      correctIndex: 1
    },
    {
      question: 'Which mineral deposit is located at Singhbhum in Jharkhand?',
      options: ['Iron Ore', 'Petroleum', 'Natural Gas', 'Gold'],
      correctIndex: 0
    }
  ],
  masteryCriteria:
    'Demonstrates master-level proficiency in industrial location theory, agro/mineral industrial clusters, sustainable tourism dynamics, multilevel regional development models, and precise Indian geographic map work.',
  onComplete: () => {}
};

// ─── EXPLORATION STEPS (Learn-by-Doing Brilliant.org Pattern) ───
const EXPLORATION_STEPS = [
  {
    title: 'Deccan Sugarcane: The 24-Hour Perishability Clock',
    instruction:
      'Drag the "Transit Hours" slider and observe how sucrose concentration drops and recovery rate crashes in real-time.',
    interactionType: 'slider-sugar',
    nodeId: NODE_C12_GEO_031
  },
  {
    title: 'Cottonopolis Spinning: Coastal Humidity vs Yarn Breakage',
    instruction:
      'Adjust the atmospheric humidity slider to discover why humid Mumbai prevented yarn snapping while dry interior zones failed.',
    interactionType: 'slider-cotton',
    nodeId: NODE_C12_GEO_031
  },
  {
    title: 'Industrial Localization: Key vs Footloose Distance Decay',
    instruction:
      'Adjust the haul distance slider to compare how transport freight escalates for heavy steel versus footloose electronics.',
    interactionType: 'slider-freight',
    nodeId: NODE_C12_GEO_032
  },
  {
    title: 'Tourism Carrying Capacity: Economic Gain vs Ecological Strain',
    instruction:
      'Vary the annual tourist influx in a fragile hill station to balance artisan revenue against municipal water and traffic collapse.',
    interactionType: 'slider-tourism',
    nodeId: NODE_C12_GEO_033
  },
  {
    title: 'Regional Planning Matrix: Chhattisgarh, Bengaluru & Haldia',
    instruction:
      'Toggle regional developmental models to explore balanced tribal mining, IT nodal linkages, and coastal mangrove ecology.',
    interactionType: 'toggle-regional',
    nodeId: NODE_C12_GEO_034
  }
];

// ─── REAL WORLD SYNTHESIS ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Spatial Planner: The 2030 India Economic Corridor Project',
  description:
    'Synthesize your geographic mastery to evaluate a proposed industrial-port corridor between Chhattisgarh’s mineral belt, Odisha’s steel nodes, and Haldia’s petrochemical port while preserving tribal livelihoods and Sundarbans biodiversity.',
  steps: [
    'Map the rail transit of Bailadila hematite iron ore and Korba coal to coastal processing hubs.',
    'Establish cooperative Tasar silk sericulture clusters to safeguard tribal forest income in Bastar.',
    'Enforce strict zero-liquid-discharge (ZLD) effluent standards for Haldia petrochemical refineries adjacent to the Sundarbans.',
    'Implement quota-based e-permits for eco-sensitive Himalayan and Western Ghats tourist sanctuaries.'
  ]
};

// ─── MAIN COMPONENT ───
export function C12_GeographyIndustriesAgrobasedSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || {
    name: 'Geography',
    emoji: '🗺️',
    color: 'emerald'
  };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant Exploration & Sandbox Interactive States with real-time sliders
  const [transitHours, setTransitHours] = useState(10); // 2 - 48 hrs for sugar
  const [humidityLevel, setHumidityLevel] = useState(75); // 20 - 95% for cotton
  const [haulDistance, setHaulDistance] = useState(250); // 50 - 1000 km for freight
  const [touristVolume, setTouristVolume] = useState(15000); // 3000 - 45000 visitors
  const [activeRegionTab, setActiveRegionTab] = useState<'chhattisgarh' | 'bengaluru' | 'haldia'>('chhattisgarh');
  const [activeMapLayer, setActiveMapLayer] = useState<'all' | 'agro' | 'mineral' | 'tourism' | 'rivers'>('all');
  const [selectedMapPin, setSelectedMapPin] = useState<string | null>(null);

  // Prediction & Observation Interactive Trackers
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});

  // Reflection responses
  const [reflections, setReflections] = useState({
    q1: '',
    q2: '',
    q3: ''
  });

  // Challenge & Interactive UI States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual Feedback & Micro-Interactions
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── REAL-TIME COMPUTATIONS FOR SIMULATORS ───
  // 1. Sugarcane Sucrose Decay Formula
  const sugarCalculations = useMemo(() => {
    const freshSucrose = 12.8;
    const decayFactor = transitHours <= 18 ? 0.02 * transitHours : 0.02 * 18 + 0.18 * (transitHours - 18);
    const effectiveSucrose = Math.max(4.0, Number((freshSucrose - decayFactor).toFixed(2)));
    const recoveryRate = Math.max(3.2, Number((effectiveSucrose * 0.92).toFixed(2)));
    const millProfitability = Math.max(0, Math.min(100, Math.round(((recoveryRate - 5) / (11.5 - 5)) * 100)));
    return { effectiveSucrose, recoveryRate, millProfitability };
  }, [transitHours]);

  // 2. Cotton Spinning Yarn Tension Formula
  const cottonCalculations = useMemo(() => {
    const optimal = 75;
    const diff = Math.abs(humidityLevel - optimal);
    const breakageRate = Math.min(100, Math.max(2, Math.round(Math.pow(diff / 4.5, 1.8))));
    const spinningEfficiency = Math.max(10, 100 - breakageRate);
    const tensileStrength = Math.max(15, Math.round(95 - diff * 1.1));
    return { breakageRate, spinningEfficiency, tensileStrength };
  }, [humidityLevel]);

  // 3. Freight Cost Distance Decay Comparison Data
  const freightChartData = useMemo(() => {
    const distances = [50, 150, 300, 500, 750, 1000];
    return distances.map(d => {
      const steelCost = Math.round(150 + d * 1.85);
      const electronicsCost = Math.round(80 + d * 0.35);
      return { distance: `${d} km`, steel: steelCost, electronics: electronicsCost };
    });
  }, []);

  const liveFreightCost = useMemo(() => {
    const steel = Math.round(150 + haulDistance * 1.85);
    const electronics = Math.round(80 + haulDistance * 0.35);
    const differenceRatio = (steel / electronics).toFixed(1);
    return { steel, electronics, differenceRatio };
  }, [haulDistance]);

  // 4. Tourism Carrying Capacity Metrics
  const tourismMetrics = useMemo(() => {
    const capacityThreshold = 22000;
    const artisanIncomeIndex = Math.min(100, Math.round((touristVolume / 25000) * 100));
    const waterDemandMLD = Number((touristVolume * 0.00018 + 3.2).toFixed(2));
    const waterDeficit = Math.max(0, Number((waterDemandMLD - 5.5).toFixed(2)));
    const environmentalStress = Math.min(100, Math.round((touristVolume / capacityThreshold) * 75));
    const sustainabilityRating =
      touristVolume <= 18000 ? 'Optimal & Balanced' : touristVolume <= 26000 ? 'Strained / Near Threshold' : 'Critical Carrying Capacity Breach';
    return { artisanIncomeIndex, waterDemandMLD, waterDeficit, environmentalStress, sustainabilityRating };
  }, [touristVolume]);

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
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

  // ─── 2D CANVAS RADAR ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 22 + Math.sin(angle) * 6;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(centerX + Math.cos(angle) * 35, centerY + Math.sin(angle) * 35);
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACK HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('error');
      speechManager.speak('Let us study the complete geographic explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((index: number) => {
    const isCorrect = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding spatial intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Spatial Exploration Labs. Manipulate each geographical system.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Geographic Sandbox active. Test and explore without time constraints.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Entering Board Examination Challenges. Apply your geographical analysis.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const currentOrder =
      sortArrangement.length === challenge.sortItems?.length
        ? sortArrangement
        : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(currentOrder);
  }, [sortArrangement, challenge]);

  const handleCompleteSim = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed with excellence! Review your spatial mastery profile below.');
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
      handleCompleteSim();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSim, resetInactivityTimer]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding geographical precision.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
          speechManager.speak('All hints used. Review the board explanation carefully.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 3500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleMapPinClick = useCallback((pinId: string, desc: string) => {
    setSelectedMapPin(pinId);
    audioManager.play('tap');
    speechManager.speak(desc);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── TOP HEADER & NAV ── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                ISC Class 12 • {subjectConfig.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-900/60 text-indigo-300 rounded-full border border-indigo-700/40">
                NEP 2020 Competency
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Live Mastery & Phase Indicators */}
        <div className="flex items-center gap-3">
          <canvas ref={canvasRef} width={80} height={40} className="rounded-lg bg-slate-900/80 border border-slate-800" />
          <motion.div
            key={difficulty}
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-xl uppercase tracking-wider border shadow-sm ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-amber-950 text-amber-300 border-amber-700'
                : 'bg-rose-950 text-rose-300 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
        </div>
      </motion.div>

      {/* ── PHASE 1: DISCOVERY NARRATIVE HOOK & PREDICTION QUESTIONS ── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-900/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">🏭</div>
            <span className="px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-md uppercase tracking-wider">
              Real-World Spatial Scenario
            </span>
            <h2 className="text-2xl font-black text-indigo-200 mt-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg">💡</span>
              <h3 className="text-lg font-bold text-white">Curiosity Spatial Challenge (Ungraded)</h3>
            </div>
            <p className="text-slate-200 font-medium text-base">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm font-semibold transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700/80 text-xs text-slate-200 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The biochemical 24-hour perishability clock rules the sugar economy.'
                    : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* ── BRILLIANT.ORG PREDICTION QUESTIONS (Predict-Then-Check) ── */}
          <div className="p-6 bg-slate-900/60 rounded-2xl border border-indigo-950 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔮</span>
              <h3 className="text-base font-black text-indigo-200 uppercase tracking-wider">
                Pre-Exploration Hypotheses (Predict Before Testing)
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PREDICTION_QUESTIONS.map((pq) => (
                <div key={pq.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-xs md:text-sm font-bold text-slate-200">{pq.question}</p>
                  <div className="space-y-1.5">
                    {pq.options.map((opt, optIdx) => {
                      const isSelected = predictionAnswers[pq.id] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setPredictionAnswers(prev => ({ ...prev, [pq.id]: optIdx }));
                            audioManager.play('tap');
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                            isSelected
                              ? 'bg-indigo-950 border-indigo-500 text-indigo-200 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predictionAnswers[pq.id] !== undefined && (
                    <p className="text-[11px] text-amber-300/90 italic bg-amber-950/30 p-2 rounded border border-amber-900/40">
                      🔍 <strong>Verify in Labs:</strong> {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: INTERACTIVE EXPLORATION (Brilliant.org Learn-by-Doing) ── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Switch to Lab ${idx + 1}: ${step.title}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>Lab {idx + 1}</span>
                <span className="hidden md:inline">• {step.title.split(':')[0]}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div>
                <span className="px-2.5 py-1 text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-md uppercase">
                  Interactive Lab 0{currentSlide + 1}
                </span>
                <h3 className="text-xl font-black text-white mt-2">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 font-medium mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 01: SUGAR PERISHABILITY SIMULATOR (Real-time Slider Connected) ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold">Harvest-to-Crush Transit:</span>
                        <span className="text-amber-400 font-bold font-mono text-base">{transitHours} Hours</span>
                      </div>
                      <input
                        type="range"
                        min={2}
                        max={48}
                        value={transitHours}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setTransitHours(val);
                          audioManager.play('count');
                        }}
                        aria-label="Adjust Sugarcane Transit Hours"
                        className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>2h (Field-Adjacent Mill)</span>
                        <span>24h (Critical Limit)</span>
                        <span>48h (Stale Cane)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Sucrose %</span>
                        <span className="text-lg font-black text-emerald-400 font-mono">{sugarCalculations.effectiveSucrose}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Recovery</span>
                        <span className="text-lg font-black text-amber-400 font-mono">{sugarCalculations.recoveryRate}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Viability</span>
                        <span className={`text-lg font-black font-mono ${sugarCalculations.millProfitability > 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sugarCalculations.millProfitability}%
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-300">Board Insight:</strong> Sugarcane is weight-losing and perishable. Once cut, invertase enzymes convert sucrose to glucose. Mills in Maharashtra (Ahmednagar, Pune) and UP (Muzaffarnagar, Saharanpur) must sit inside cane tracts.
                    </div>
                  </div>

                  {/* Visual Cane Anatomy & Gauge Updating in Real Time */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 450 220" className="w-full h-auto max-h-56">
                      <g transform="translate(40, 40)">
                        <rect x="0" y="20" width="180" height="30" rx="4" fill="#15803d" stroke="#22c55e" strokeWidth="2" />
                        <line x1="45" y1="20" x2="45" y2="50" stroke="#166534" strokeWidth="3" />
                        <line x1="90" y1="20" x2="90" y2="50" stroke="#166534" strokeWidth="3" />
                        <line x1="135" y1="20" x2="135" y2="50" stroke="#166534" strokeWidth="3" />
                        <text x="90" y="38" textAnchor="middle" fill="#f0fdf4" fontSize="11" fontWeight="bold">
                          Cut Sugarcane Stalk
                        </text>
                      </g>

                      <g transform="translate(40, 110)">
                        <line x1="0" y1="20" x2="220" y2="20" stroke="#334155" strokeWidth="4" strokeDasharray="6 6" />
                        <circle cx={Math.min(220, (transitHours / 48) * 220)} cy="20" r="12" fill="#eab308" />
                        <text x={Math.min(220, (transitHours / 48) * 220)} y="24" textAnchor="middle" fill="#000" fontSize="10" fontWeight="black">
                          🚛
                        </text>
                      </g>

                      <g transform="translate(300, 40)">
                        <rect x="0" y="10" width="100" height="120" rx="8" fill="#1e293b" stroke={transitHours > 24 ? '#ef4444' : '#10b981'} strokeWidth="2" />
                        <text x="50" y="45" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">
                          Sugar Mill
                        </text>
                        <text x="50" y="70" textAnchor="middle" fill={transitHours > 24 ? '#f87171' : '#34d399'} fontSize="10">
                          {transitHours <= 24 ? '✓ High Sucrose' : '❌ Inverted Sucrose'}
                        </text>
                        <rect x="15" y="85" width="70" height="8" rx="4" fill="#0f172a" />
                        <rect x="15" y="85" width={Math.max(5, (sugarCalculations.recoveryRate / 12) * 70)} height="8" rx="4" fill={transitHours > 24 ? '#ef4444' : '#22c55e'} />
                        <text x="50" y="110" textAnchor="middle" fill="#94a3b8" fontSize="9">
                          Recovery: {sugarCalculations.recoveryRate}%
                        </text>
                      </g>
                    </svg>

                    <div className="w-full mt-2 flex items-center justify-between text-xs px-2 text-slate-400">
                      <span>Status: {transitHours <= 24 ? '🟢 Viable Milling Window' : '🔴 Severe Sucrose Loss (>24h)'}</span>
                      <span>Region: Deccan Cooperative Cluster</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 02: COTTON HUMIDITY & SPINNING SIMULATOR (Real-time Slider Connected) ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold">Relative Humidity:</span>
                        <span className="text-cyan-400 font-bold font-mono text-base">{humidityLevel}% RH</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={95}
                        value={humidityLevel}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setHumidityLevel(val);
                          audioManager.play('count');
                        }}
                        aria-label="Adjust Relative Humidity Slider"
                        className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>20% (Dry Inland)</span>
                        <span>75% (Coastal Mumbai/Surat)</span>
                        <span>95% (Excessive)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Breakage</span>
                        <span className={`text-lg font-black font-mono ${cottonCalculations.breakageRate < 25 ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {cottonCalculations.breakageRate}%
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Spin Speed</span>
                        <span className="text-lg font-black text-cyan-400 font-mono">{cottonCalculations.spinningEfficiency}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Tensile Str.</span>
                        <span className="text-lg font-black text-indigo-400 font-mono">{cottonCalculations.tensileStrength} cN</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <strong className="text-cyan-300">Cottonopolis Factor:</strong> Humid sea air prevents fine cotton yarn from snapping during high-speed spinning. Combined with port trade and Deccan black soil cotton, Mumbai & Ahmedabad became textile giants.
                    </div>
                  </div>

                  {/* Dynamic Spinning Spindle Diagram */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 420 200" className="w-full h-auto max-h-52">
                      <g transform="translate(60, 30)">
                        <rect x="0" y="20" width="24" height="100" rx="4" fill="#334155" />
                        <ellipse cx="12" cy="20" rx="12" ry="6" fill="#64748b" />
                        <ellipse cx="12" cy="120" rx="12" ry="6" fill="#1e293b" />
                        <text x="12" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">Spindle 1</text>
                      </g>

                      <path
                        d={`M 72 70 Q 180 ${cottonCalculations.breakageRate > 40 ? 160 : 70} 280 70`}
                        fill="none"
                        stroke={cottonCalculations.breakageRate > 40 ? '#ef4444' : '#38bdf8'}
                        strokeWidth={cottonCalculations.breakageRate > 40 ? '2' : '3'}
                        strokeDasharray={cottonCalculations.breakageRate > 40 ? '8 6' : 'none'}
                      />

                      <g transform="translate(280, 30)">
                        <rect x="0" y="20" width="30" height="100" rx="4" fill="#0f766e" />
                        <ellipse cx="15" cy="20" rx="15" ry="8" fill="#14b8a6" />
                        <ellipse cx="15" cy="120" rx="15" ry="8" fill="#042f2e" />
                        <text x="15" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">Take-up Spool</text>
                      </g>

                      {humidityLevel > 60 && (
                        <g opacity="0.6">
                          <circle cx="150" cy="50" r="3" fill="#38bdf8" />
                          <circle cx="180" cy="65" r="4" fill="#38bdf8" />
                          <circle cx="210" cy="45" r="3" fill="#38bdf8" />
                        </g>
                      )}
                    </svg>
                    <div className="w-full flex justify-between text-xs px-4 text-slate-400">
                      <span>Condition: {humidityLevel >= 65 && humidityLevel <= 85 ? '🟢 Ideal Coastal Humidity' : '⚠️ Suboptimal Yarn Tension'}</span>
                      <span>Spinning Breakage Risk: {cottonCalculations.breakageRate}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 03: KEY VS FOOTLOOSE FREIGHT DISTANCE DECAY (Real-time Slider Connected) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Weberian Distance-Cost Curve & Live Haul Inspector</h4>
                      <p className="text-xs text-slate-400">Integrated Steel (Weight-losing Key Industry) vs Electronics (Footloose)</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <span className="flex items-center gap-1 text-rose-400">
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span> Integrated Steel (Steep Slope)
                      </span>
                      <span className="flex items-center gap-1 text-cyan-400">
                        <span className="w-3 h-3 rounded-full bg-cyan-500 inline-block"></span> Electronics (Flat Slope)
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-semibold">Interactive Haul Distance:</span>
                      <span className="text-rose-400 font-bold font-mono text-base">{haulDistance} km</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={1000}
                      step={25}
                      value={haulDistance}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setHaulDistance(val);
                        audioManager.play('count');
                      }}
                      aria-label="Adjust Haul Distance Slider"
                      className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>50 km (Mine Pithead)</span>
                      <span>500 km (Regional)</span>
                      <span>1000 km (Cross-Country)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Steel Freight @ {haulDistance}km</span>
                      <span className="text-lg font-black text-rose-400 font-mono">₹{liveFreightCost.steel} / t</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Electronics Freight @ {haulDistance}km</span>
                      <span className="text-lg font-black text-cyan-400 font-mono">₹{liveFreightCost.electronics} / t</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Cost Multiple Ratio</span>
                      <span className="text-lg font-black text-amber-400 font-mono">{liveFreightCost.differenceRatio}x higher for Steel</span>
                    </div>
                  </div>

                  <div className="h-64 w-full pt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={freightChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="distance" stroke="#64748b" fontSize={11} />
                        <YAxis stroke="#64748b" fontSize={11} unit="₹/t" />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="steel" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="electronics" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* ── LAB 04: TOURISM CARRYING CAPACITY (Real-time Slider Connected) ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400 font-semibold">Monthly Tourist Influx:</span>
                        <span className="text-emerald-400 font-bold font-mono text-base">{touristVolume.toLocaleString()} visitors</span>
                      </div>
                      <input
                        type="range"
                        min={3000}
                        max={45000}
                        step={1000}
                        value={touristVolume}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setTouristVolume(val);
                          audioManager.play('count');
                        }}
                        aria-label="Adjust Tourist Influx Slider"
                        className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                        <span>3k (Off-peak)</span>
                        <span>22k (Threshold)</span>
                        <span>45k (Overcrowded)</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Artisan Income</span>
                        <span className="text-lg font-black text-emerald-400 font-mono">Index {tourismMetrics.artisanIncomeIndex}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Water Demand</span>
                        <span className="text-lg font-black text-cyan-400 font-mono">{tourismMetrics.waterDemandMLD} MLD</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-400 block mb-1 font-bold">Status Assessment:</span>
                      <span className={`font-black ${touristVolume <= 22000 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tourismMetrics.sustainabilityRating}
                      </span>
                      {tourismMetrics.waterDeficit > 0 && (
                        <span className="text-rose-300 block text-[11px] mt-1">
                          ⚠️ Municipal water deficit: -{tourismMetrics.waterDeficit} Million Litres/Day
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hill Station Impact Diagram */}
                  <div className="lg:col-span-7 flex flex-col justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-semibold text-slate-300">
                        <span>Ecological Stress Level</span>
                        <span className="font-mono">{tourismMetrics.environmentalStress}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          animate={{ width: `${tourismMetrics.environmentalStress}%` }}
                          style={{
                            backgroundColor:
                              tourismMetrics.environmentalStress > 75
                                ? '#ef4444'
                                : tourismMetrics.environmentalStress > 50
                                ? '#f59e0b'
                                : '#10b981'
                          }}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-emerald-400 block">✓ Positive Multipliers:</strong>
                          <ul className="text-slate-400 space-y-1 mt-1 text-[11px]">
                            <li>• Guide & homestay income</li>
                            <li>• Local handicraft markets</li>
                            <li>• Heritage ticket revenue</li>
                          </ul>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-rose-400 block">❌ Negative Strains:</strong>
                          <ul className="text-slate-400 space-y-1 mt-1 text-[11px]">
                            <li>• Mall Road traffic gridlock</li>
                            <li>• Slope destabilisation</li>
                            <li>• Solid plastic pollution</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 italic pt-2">
                      *CISCE 2025 Standard: Ecotourism requires carrying capacity limits, local artisan empowerment, and strict tourist conduct.
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB 05: REGIONAL PLANNING MATRIX ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {(['chhattisgarh', 'bengaluru', 'haldia'] as const).map(tab => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveRegionTab(tab)}
                        aria-label={`Select region tab: ${tab}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          activeRegionTab === tab
                            ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {tab === 'chhattisgarh' ? 'Chhattisgarh Resource Belt' : tab === 'bengaluru' ? 'Bengaluru IT Nodal Region' : 'Haldia Port & Hinterland'}
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {activeRegionTab === 'chhattisgarh' && (
                      <motion.div
                        key="cg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-amber-400 text-sm font-bold block mb-1">⛏️ Mining Pillar</span>
                          <p className="text-xs text-slate-300">Bailadila hematite iron ore feeds Bhilai Steel; Korba coal powers thermal grids; bauxite deposits support aluminium.</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-emerald-400 text-sm font-bold block mb-1">🐛 Forest Silk Pillar</span>
                          <p className="text-xs text-slate-300">Tribal rearing of wild Tasar silkworms on forest trees + cultivated Mulberry cocoons, woven into traditional handloom sarees.</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-cyan-400 text-sm font-bold block mb-1">🌾 Agriculture Pillar</span>
                          <p className="text-xs text-slate-300">Mahanadi basin "Rice Bowl of Central India", supplemented by pulse cultivation and tribal oilseed production.</p>
                        </div>
                      </motion.div>
                    )}

                    {activeRegionTab === 'bengaluru' && (
                      <motion.div
                        key="blr"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-indigo-400 text-sm font-bold block mb-1">🏛️ High-Tech Node</span>
                          <p className="text-xs text-slate-300">Clustered in Electronics City & Whitefield; pioneered by Infosys, Wipro, and defense R&D (ISRO, DRDO, HAL).</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-cyan-400 text-sm font-bold block mb-1">🌐 Global Linkages</span>
                          <p className="text-xs text-slate-300">Direct export pipelines to Silicon Valley, European markets, and international high-speed satellite gateways.</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-rose-400 text-sm font-bold block mb-1">⚠️ Urban Challenges</span>
                          <p className="text-xs text-slate-300">Severe traffic congestion, water table depletion, peak power deficit, and competition from Hyderabad/Pune.</p>
                        </div>
                      </motion.div>
                    )}

                    {activeRegionTab === 'haldia' && (
                      <motion.div
                        key="hld"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-cyan-400 text-sm font-bold block mb-1">🚢 Port Location</span>
                          <p className="text-xs text-slate-300">Situated at Hugli-Haldi river confluence as a deep-water supplementary gateway to silting Kolkata port.</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-amber-400 text-sm font-bold block mb-1">🏭 Industrial Belt</span>
                          <p className="text-xs text-slate-300">Petrochemical complexes, IOCL oil refinery, fertiliser plants serving WB, Bihar, Jharkhand & North-East states.</p>
                        </div>
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-rose-400 text-sm font-bold block mb-1">🌿 Sundarbans Risk</span>
                          <p className="text-xs text-slate-300">Industrial effluents and tanker spills threaten adjacent UNESCO Sundarbans mangrove biosphere and Royal Bengal tiger habitat.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* ── BRILLIANT.ORG OBSERVATION QUESTIONS ("What Do You Notice?") ── */}
              <div className="p-4 bg-slate-950 rounded-xl border border-emerald-950 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">👀</span>
                  <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider">
                    Interactive Observation Check (What Do You Notice?)
                  </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OBSERVATION_QUESTIONS.map((oq) => (
                    <div key={oq.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                      <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                      <div className="space-y-1">
                        {oq.observableOptions.map((opt, oIdx) => {
                          const isSelected = observationAnswers[oq.id] === oIdx;
                          const isCorrect = oIdx === oq.correctIndex;
                          return (
                            <button
                              key={oIdx}
                              onClick={() => {
                                setObservationAnswers(prev => ({ ...prev, [oq.id]: oIdx }));
                                audioManager.play(isCorrect ? 'drop-correct' : 'tap');
                              }}
                              className={`w-full text-left p-2 rounded text-[11px] transition-all border ${
                                isSelected
                                  ? isCorrect
                                    ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                                    : 'bg-rose-950 border-rose-500 text-rose-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                      {observationAnswers[oq.id] !== undefined && (
                        <p className={`text-[10px] ${observationAnswers[oq.id] === oq.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {observationAnswers[oq.id] === oq.correctIndex ? '✓ Correct observation!' : oq.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Exploration Nav Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous Exploration Lab"
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs font-mono text-slate-500">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next Exploration Lab"
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Enter Free Sandbox Exploration"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-900/30"
                  >
                    Enter Free Interactive Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ── PHASE 3: FREE GEOGRAPHIC SANDBOX & MAP EXPLORER ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 text-[11px] font-bold bg-indigo-950 text-indigo-400 border border-indigo-800 rounded-md uppercase">
                  Free Geographic Sandbox
                </span>
                <h3 className="text-xl font-black text-white mt-1">Interactive Economic Map of India</h3>
                <p className="text-xs text-slate-400">Click any industrial node, river system, mountain range or mineral deposit to inspect location logic.</p>
              </div>

              {/* Layer Toggles */}
              <div className="flex flex-wrap gap-2 text-xs">
                {(['all', 'agro', 'mineral', 'tourism', 'rivers'] as const).map(layer => (
                  <motion.button
                    key={layer}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveMapLayer(layer)}
                    aria-label={`Toggle map layer: ${layer}`}
                    className={`px-3 py-1.5 rounded-lg font-bold capitalize border ${
                      activeMapLayer === layer
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {layer}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Interactive SVG Map of India */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="lg:col-span-8 flex justify-center">
                <svg viewBox="0 0 500 550" className="w-full max-w-md h-auto bg-slate-900/40 rounded-xl border border-slate-800/80">
                  <path
                    d="M 180 50 L 220 30 L 250 40 L 270 70 L 290 85 L 340 100 L 390 120 L 440 130 L 460 160 L 410 180 L 350 190 L 310 200 L 300 240 L 260 270 L 240 330 L 220 390 L 200 450 L 190 490 L 180 450 L 160 390 L 140 330 L 120 270 L 100 240 L 80 200 L 90 150 L 120 120 L 150 90 Z"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="2"
                  />

                  <g stroke="#a855f7" strokeWidth="3" fill="none" opacity="0.8">
                    <path d="M 180 60 Q 280 80 430 140" stroke="#c084fc" />
                    <path d="M 160 270 L 230 265" stroke="#e879f9" strokeWidth="4" />
                    <path d="M 135 290 Q 150 380 180 460" stroke="#38bdf8" strokeWidth="4" />
                    <path d="M 270 290 L 280 340 M 260 370 L 240 420" stroke="#f472b6" strokeWidth="3" strokeDasharray="6 4" />
                  </g>

                  {(activeMapLayer === 'all' || activeMapLayer === 'rivers') && (
                    <g stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.7">
                      <path d="M 230 255 L 145 258" />
                      <path d="M 225 275 L 150 276" />
                      <path d="M 260 260 Q 300 250 330 255" />
                      <path d="M 160 300 Q 230 310 285 330" />
                      <path d="M 165 345 Q 220 350 265 370" />
                      <path d="M 175 420 Q 200 425 230 430" />
                    </g>
                  )}

                  {(activeMapLayer === 'all' || activeMapLayer === 'agro') && (
                    <g>
                      <circle
                        cx="155"
                        cy="310"
                        r="6"
                        fill="#22c55e"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('mh_sugar', 'Maharashtra Sugar Belt: Ahmednagar & Pune (Tropical high-sucrose cooperative mills)')}
                      />
                      <circle
                        cx="215"
                        cy="160"
                        r="6"
                        fill="#22c55e"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('up_sugar', 'UP Sugar Belt: Muzaffarnagar & Saharanpur (Western Doab sub-tropical mills)')}
                      />
                      <circle
                        cx="135"
                        cy="300"
                        r="6"
                        fill="#06b6d4"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('mumbai_textile', 'Mumbai Cottonopolis: Port imports/exports + maritime spinning humidity')}
                      />
                    </g>
                  )}

                  {(activeMapLayer === 'all' || activeMapLayer === 'mineral') && (
                    <g>
                      <circle
                        cx="300"
                        cy="235"
                        r="6"
                        fill="#ef4444"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('tisco', 'TISCO Jamshedpur: Singhbhum iron ore & Jharia coking coal')}
                      />
                      <circle
                        cx="245"
                        cy="275"
                        r="6"
                        fill="#ef4444"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('bhilai', 'Bhilai Steel Plant: Bailadila ore rail link + Korba coal')}
                      />
                      <circle
                        cx="275"
                        cy="350"
                        r="6"
                        fill="#f97316"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('vizag', 'Visakhapatnam Steel: Shore-based deep-water port plant for raw material imports')}
                      />
                      <circle
                        cx="420"
                        cy="130"
                        r="6"
                        fill="#eab308"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('digboi', 'IOCL Digboi (Assam): India’s oldest oilfield refinery at crude source')}
                      />
                    </g>
                  )}

                  {(activeMapLayer === 'all' || activeMapLayer === 'tourism') && (
                    <g>
                      <circle
                        cx="180"
                        cy="410"
                        r="6"
                        fill="#a855f7"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('blr', 'Bengaluru IT Nodal Region: Electronics City, IISc skilled talent, high-tech linkages')}
                      />
                      <circle
                        cx="330"
                        cy="245"
                        r="6"
                        fill="#3b82f6"
                        className="cursor-pointer hover:r-8 transition-all"
                        onClick={() => handleMapPinClick('haldia', 'Haldia Port: Hugli-Haldi confluence, petrochemical hub, Sundarbans hinterland')}
                      />
                    </g>
                  )}
                </svg>
              </div>

              {/* Node Inspector Card */}
              <div className="lg:col-span-4 flex flex-col justify-between p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">Cartographic Inspector</h4>
                  {selectedMapPin ? (
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed">
                      {selectedMapPin}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">Click any coloured node on the map to display its geographic credentials.</p>
                  )}
                </div>

                <div className="space-y-2 text-[11px] text-slate-400 border-t border-slate-800 pt-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Agro-Based (Sugar / Cotton)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Mineral-Based (Steel / Refineries)
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Regional Planning / Tech Nodes
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  aria-label="Proceed to Examination Challenges"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                >
                  Ready for Board Challenges! →
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── PHASE 4: EXAMINATION CHALLENGES ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-black bg-indigo-600 text-white rounded-lg">
                  Q {currentChallenge + 1} / {filteredChallenges.length}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Competency: <strong className="text-emerald-400">{challenge.competencyLevel}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Score:</span>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  {scoreBreakdown.correct} / {scoreBreakdown.total}
                </span>
              </div>
            </div>

            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'border-rose-500 bg-rose-950/40' : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white leading-relaxed mb-6">{challenge.question}</p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-semibold transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-indigo-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-xs text-slate-200 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'box_sugar', title: 'Sugar Industry (Cane)' },
                    { id: 'box_cotton', title: 'Cotton Textiles (Yarn)' },
                    { id: 'box_coop', title: 'Maharashtra Mills' },
                    { id: 'box_port', title: 'Mumbai Cottonopolis' }
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-bold">{target.title}</span>
                      <div className="mt-2 text-sm font-bold text-emerald-400 font-mono">
                        {droppedLabels[target.id] || <span className="text-slate-600 font-sans italic">Drop matching factor here</span>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Check Drag-Label Answer"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Mapping →
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      className="p-3.5 bg-slate-800 rounded-xl text-slate-200 text-sm font-semibold cursor-grab border border-slate-700 flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Check Drag-Sort Order"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Confirm Sequence →
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated tonnage"
                    aria-label="Enter numeric answer"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono w-64 focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Check →
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 italic">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs font-bold text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 bg-indigo-900 text-indigo-200 rounded-lg text-xs font-bold flex items-center gap-2 border border-indigo-700">
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 font-black">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs italic">Click inputs above to assemble the charge formula</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Formula"
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Charge →
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-xl space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>📖</span>
                  <span>Examiner Step-by-Step Evaluation:</span>
                </div>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-slate-200 text-xs md:text-sm leading-relaxed">
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge or completion"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Evaluation →' : 'Next Question →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── PHASE 5: MASTERY & REFLECTION SECTION ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 rounded-3xl border border-emerald-800/60 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Spatial Geography Mastery Achieved</h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              Score: <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong> • Performance Tier:{' '}
              <strong className="text-indigo-400 capitalize">{masteryLevel}</strong>
            </p>

            <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-700/60 max-w-2xl mx-auto text-xs text-emerald-200">
              {errors === 0
                ? '🌟 Flawless Mastery! You possess deep spatial-economic and cartographic precision for the ISC board examination.'
                : errors <= 3
                ? '👍 Excellent performance! Review the specific misconception corrections below to solidify your understanding.'
                : '📚 Good effort. Re-explore the sugar perishability and distance-decay labs to master industrial location theory.'}
            </div>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-2xl border border-rose-900/60 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                <span>⚠️</span> Specific Misconceptions Identified During Simulation:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Examiner Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── REQUIRED REFLECTION SECTION ── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💭</span>
              <h3 className="text-lg font-bold text-white">Post-Simulation Spatial Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Reflect on the spatial systems you modeled to cement your long-term understanding:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-amber-400">1. What was the most surprising thing you learned?</h4>
                <textarea
                  value={reflections.q1}
                  onChange={(e) => setReflections(r => ({ ...r, q1: e.target.value }))}
                  placeholder="E.g., How drastically sugarcane sucrose inverts after the 24-hour window, or how port-based steel differs from inland..."
                  className="w-full h-24 p-2.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-cyan-400">2. How would you explain this to a friend?</h4>
                <textarea
                  value={reflections.q2}
                  onChange={(e) => setReflections(r => ({ ...r, q2: e.target.value }))}
                  placeholder="E.g., Heavy weight-losing factories are anchored to raw material mines, while electronics can float anywhere..."
                  className="w-full h-24 p-2.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-emerald-400">3. Where in real life might you use this?</h4>
                <textarea
                  value={reflections.q3}
                  onChange={(e) => setReflections(r => ({ ...r, q3: e.target.value }))}
                  placeholder="E.g., In evaluating urban industrial corridors, logistics planning, or managing tourism carrying capacity in hill regions..."
                  className="w-full h-24 p-2.5 bg-slate-900 border border-slate-750 rounded-lg text-xs text-slate-200 resize-none focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Spaced Repetition (SRS) Status */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Spaced Repetition Review Schedule</h4>
              <p className="text-xs text-slate-400 mt-1">
                Next automated review scheduled in{' '}
                <strong className="text-white font-mono">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-xs px-3 py-1 bg-amber-950 text-amber-300 rounded-lg border border-amber-800 font-mono">
              Algorithm: SM-2
            </span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/60 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🗺️</span>
              <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-900/80 text-indigo-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SIM ENGINE MICRO-INTERACTIONS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Geography Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_GeographyIndustriesAgrobasedSim;