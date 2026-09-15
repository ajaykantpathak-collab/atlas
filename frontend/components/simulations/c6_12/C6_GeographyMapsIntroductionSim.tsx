'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C6_GEO_001 = 'c6_geo_001';
const NODE_C6_GEO_002 = 'c6_geo_002';
const NODE_C6_GEO_003 = 'c6_geo_003';
const NODE_C6_GEO_004 = 'c6_geo_004';
const NODE_C6_GEO_005 = 'c6_geo_005';
const NODE_C6_GEO_006 = 'c6_geo_006';
const NODE_C6_GEO_007 = 'c6_geo_007';
const NODE_C6_GEO_008 = 'c6_geo_008';
const NODE_C6_GEO_009 = 'c6_geo_009';
const NODE_C6_GEO_010 = 'c6_geo_010';

const ALL_NODE_IDS = [
  NODE_C6_GEO_001,
  NODE_C6_GEO_002,
  NODE_C6_GEO_003,
  NODE_C6_GEO_004,
  NODE_C6_GEO_005,
  NODE_C6_GEO_006,
  NODE_C6_GEO_007,
  NODE_C6_GEO_008,
  NODE_C6_GEO_009,
  NODE_C6_GEO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Himalayan Survey & Disaster Rescue',
  intro: 'A massive geological expedition is mapping a remote river valley in Uttarakhand. Monsoon clouds are building, an earthquake swarm has activated a fault line, and your field cartography team must chart the terrain, interpret contour scales, navigate with cardinal bearings, and identify mountain and valley hazards before nightfall.',
  context: 'As Chief Field Geographer, you have 10 critical sectors to analyze: map reading, scale conversion, 8 cardinal points, tectonic folding, fault horsts, volcanic landforms, and valley carving.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'On a standard flat paper map of the world, Greenland appears almost as large as Africa. In reality, Africa is about 14 times larger than Greenland! Why does this distortion happen?',
  options: [
    'Greenland is shrinking rapidly due to melting ice caps',
    'Flattening a curved 3D spherical Earth onto a 2D flat sheet stretches areas near the poles',
    'Early mapmakers made mathematical errors measuring Greenland',
    'Paper stretches vertically during high-speed printing presses',
  ],
  correctIndex: 1,
  hintAfter: 'Every flat map must sacrifice something when flattening a sphere! Let us explore how maps, scales, directions, and tectonic landforms work.',
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

// ─── 22 CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c6_geo_001)
  {
    id: 'ch_001_geo',
    nodeId: NODE_C6_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly lists the essential components of a standard map?',
    options: [
      'Title, Direction, Scale, Legend/Key, Conventional Colours, Index',
      'Camera lens, Shutter speed, Exposure, Altitude, Zoom',
      'Satellite orbit, Battery level, GPS coordinates, Screen resolution',
      'Country names, Ocean depths, Animal species, Weather forecast only',
    ],
    correctIndex: 0,
    explanation: 'Every standard map requires six key components: Title (what the map shows), Direction (North arrow), Scale (distance ratio), Legend/Key (symbol decoder), Conventional Colours (standard relief tints), and Index (grid reference for locating places).',
    hints: [
      'Think about what you need to orient, measure, and decode a paper map.',
      'A photograph uses camera settings, but a map uses symbols, scales, and titles.',
      'The six standard map components are Title, Direction, Scale, Legend, Colours, and Index.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c6_geo_002)
  {
    id: 'ch_002_geo',
    nodeId: NODE_C6_GEO_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An architect needs to draw the exact layout of a school laboratory showing desk widths, sink positions, and door clearances in centimetres. Which geographical tool must they use?',
    options: [
      'A rough sketch drawn freehand without scale',
      'A large-scale accurate Plan drawn with exact measurements',
      'A small-scale physical wall map of the city',
      'A desktop 3D spherical globe',
    ],
    correctIndex: 1,
    explanation: 'A Plan is a large-scale, highly accurate drawing of a small area (such as a room or building) drawn to scale with exact measurements. A sketch lacks scale, while a map or globe covers far too vast an area.',
    hints: [
      'Sketches do not have measurements or scale.',
      'A globe shows continents, not room furniture.',
      'A Plan is specifically meant for detailed small-area architectural drawings.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Understanding (c6_geo_004)
  {
    id: 'ch_003_geo',
    nodeId: NODE_C6_GEO_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Starting from North and rotating clockwise, what is the exact intermediate direction situated halfway between South and West?',
    options: ['North-West (NW)', 'South-East (SE)', 'South-West (SW)', 'North-East (NE)'],
    correctIndex: 2,
    explanation: 'The intermediate direction lying exactly halfway between South (180°) and West (270°) is South-West (SW) at a bearing of 225°.',
    hints: [
      'Trace clockwise from North: N (0°) -> NE (45°) -> E (90°) -> SE (135°) -> S (180°)...',
      'Between South (180°) and West (270°) lies the bottom-left quadrant.',
      'The direction between South and West is South-West (SW).',
    ],
  },
  // 4. Foundation - Numeric (c6_geo_005)
  {
    id: 'ch_004_geo',
    nodeId: NODE_C6_GEO_005,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'On a survey map with a statement scale of "1 cm = 15 km", the straight-line distance between Dehradun and Rishikesh measures 3 cm. What is the real ground distance in kilometres?',
    correctAnswer: 45,
    tolerance: 0.5,
    unit: 'km',
    explanation: 'Ground Distance = Map Distance × Scale Factor = 3 cm × 15 km/cm = 45 km.',
    hints: [
      'Each 1 cm on paper represents 15 km in reality.',
      'Multiply the map distance (3 cm) by 15.',
      '3 × 15 = 45 km.',
    ],
  },
  // 5. Foundation - Drag Label (c6_geo_006)
  {
    id: 'ch_005_geo',
    nodeId: NODE_C6_GEO_006,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct mountain type label to its matching formation description box.',
    dragItems: [
      { label: 'Fold Mountain', targetId: 'box_fold' },
      { label: 'Block Mountain', targetId: 'box_block' },
      { label: 'Volcanic Mountain', targetId: 'box_volc' },
      { label: 'Residual Mountain', targetId: 'box_resid' },
    ],
    correctMapping: {
      box_fold: 'Fold Mountain',
      box_block: 'Block Mountain',
      box_volc: 'Volcanic Mountain',
      box_resid: 'Residual Mountain',
    },
    explanation: 'Fold mountains arise from crustal compression; Block mountains from faulting/uplift; Volcanic mountains from lava accumulation; Residual mountains from long-term erosion of old ranges.',
    hints: [
      'Compression bends layers into Fold mountains.',
      'Tension fractures crust into horsts (Block mountains).',
      'Eroded stumps like the Aravalli are Residual mountains.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Recall (c6_geo_007)
  {
    id: 'ch_006_geo',
    nodeId: NODE_C6_GEO_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In folded rock strata, what is the term for the upward arching fold where the oldest rock layers lie at the core?',
    options: ['Syncline', 'Anticline', 'Graben', 'Crater'],
    correctIndex: 1,
    explanation: 'An Anticline is an upward-arching fold ("A" shape) with older rock strata in the centre. A Syncline is a downward trough ("U" shape).',
    hints: [
      'Think "A for Arch, A for Anticline".',
      'Syncline sinks down like a trough.',
      'The upward fold is called an Anticline.',
    ],
    misconceptionIndex: 1,
  },
  // 7. Foundation - Recall (c6_geo_008)
  {
    id: 'ch_008_geo',
    nodeId: NODE_C6_GEO_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is an uplifted block of crust bounded by faults called?',
    options: ['Graben (Rift Valley)', 'Horst (Block Mountain)', 'Geosyncline', 'Caldera'],
    correctIndex: 1,
    explanation: 'A Horst (or Block Mountain) is an uplifted crustal block between faults (e.g., Vindhyas, Black Forest). A Graben is the subsided rift valley (e.g., Narmada, Rhine).',
    hints: [
      'Horst stands high; graben sinks low.',
      'The Vindhyas in India are an example of a Horst.',
      'An uplifted fault block is a Horst.',
    ],
  },
  // 8. Standard - Application (c6_geo_003)
  {
    id: 'ch_009_geo',
    nodeId: NODE_C6_GEO_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During severe monsoon flooding along the Odisha coast, which specialized map is MOST vital for the National Disaster Response Force (NDRF) to safely evacuate villagers?',
    options: [
      'A political map showing state capitals and union territories',
      'A flood-hazard contour elevation map showing high ground shelters and submerged roads',
      'A mineral distribution map showing bauxite and iron ore reserves',
      'A tourist sightseeing map showing historic temples and hotels',
    ],
    correctIndex: 1,
    explanation: 'Disaster management relies directly on flood-hazard and contour elevation maps to identify inundation zones, safe high-elevation shelters, and viable evacuation corridors.',
    hints: [
      'Think about what physical danger flood waters create.',
      'Evacuation teams need to know ground elevation and water inundation paths.',
      'A flood-hazard elevation contour map reveals high ground and safe paths.',
    ],
  },
  // 9. Standard - Application / Math (c6_geo_005)
  {
    id: 'ch_010_geo',
    nodeId: NODE_C6_GEO_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert the statement scale "1 cm = 8 km" into a Representative Fraction (RF). What is the denominator of the RF (1 : ?)?',
    correctAnswer: 800000,
    tolerance: 0,
    unit: 'ratio',
    explanation: 'To find RF, convert both sides to centimetres: 8 km = 8 × 1000 m = 8000 m; 8000 m × 100 cm = 800,000 cm. Thus RF = 1 : 800,000.',
    hints: [
      '1 km = 1,000 metres.',
      '1 metre = 100 centimetres, so 1 km = 100,000 cm.',
      'Multiply 8 by 100,000 to get 800,000.',
    ],
    misconceptionIndex: 2,
  },
  // 10. Standard - Analysis (c6_geo_007)
  {
    id: 'ch_011_geo',
    nodeId: NODE_C6_GEO_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Marine fossil shells (ammonites) are found high in the Himalayan peaks at 5,000 m above sea level. How does the geological theory of folding explain this phenomenon?',
    options: [
      'Ancient oceans evaporated and rain washed shells up the slopes',
      'Sedimentary strata accumulated in the ancient Tethys geosyncline ocean floor and were compressed and uplifted by colliding continental plates',
      'Volcanic eruptions blasted sea life from the Indian Ocean up onto mountain summits',
      'Early human traders transported millions of sea fossils to build mountain temples',
    ],
    correctIndex: 1,
    explanation: 'The Himalayas formed when the Indian plate collided into the Eurasian plate, compressing the marine sedimentary strata of the ancient Tethys Geosyncline and folding them thousands of metres into the sky.',
    hints: [
      'The Himalayas were once underwater sedimentary troughs called geosynclines.',
      'Plate compression buckled the seafloor upward over millions of years.',
      'The Tethys ocean sediments were uplifted by compressional folding.',
    ],
  },
  // 11. Standard - Drag Sort (c6_geo_007)
  {
    id: 'ch_012_geo',
    nodeId: NODE_C6_GEO_007,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of fold mountain formation in the correct chronological order from earliest to latest.',
    sortItems: [
      'Rivers deposit thick layers of sand and mud in a deep subsiding marine geosyncline trough',
      'Tectonic plates move toward each other, applying intense lateral compressional force',
      'Sedimentary strata buckle into alternating anticlines and synclines',
      'Sustained crustal uplift raises rugged towering mountain ranges with sharp ridges',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Correct chronological order: Sediment accumulation in a geosyncline -> Tectonic compression -> Buckling into anticlines/synclines -> Uplift into fold mountain chains.',
    hints: [
      'First, sediments must collect in an ancient sea basin.',
      'Next, plate compression squeezes those rock layers.',
      'Finally, buckling and uplift push them high above sea level.',
    ],
  },
  // 12. Standard - Distinguish (c6_geo_008)
  {
    id: 'ch_013_geo',
    nodeId: NODE_C6_GEO_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In central India, the Vindhya Range and the Narmada River Valley lie side by side. How do their geological origins compare?',
    options: [
      'Vindhyas are volcanic cones, while Narmada is a meteor crater',
      'Vindhyas are an uplifted Horst (block mountain), while Narmada is a subsided Graben (rift valley) created by tensional faulting',
      'Vindhyas formed by river deposition, while Narmada formed by glacial ice plucking',
      'Both formed by volcanic lava flows spreading across the Deccan Plateau',
    ],
    correctIndex: 1,
    explanation: 'The Vindhyas represent an uplifted crustal block (horst), while the adjacent Narmada Valley is a down-faulted rift valley (graben) formed along parallel fault lines under crustal tension.',
    hints: [
      'Think about horsts and grabens pairing up.',
      'Horst goes up, graben goes down.',
      'Vindhyas = Horst, Narmada Valley = Graben.',
    ],
    misconceptionIndex: 4,
  },
  // 13. Standard - Analysis (c6_geo_009)
  {
    id: 'ch_014_geo',
    nodeId: NODE_C6_GEO_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does Mauna Loa in Hawaii have extremely gentle, broad shield slopes, whereas Mount Fuji (Fujiyama) in Japan forms a steep, symmetrical cone?',
    options: [
      'Mauna Loa is eroded by heavy tropical rain while Fuji has no weather',
      'Mauna Loa is built from runny, fluid basaltic lava that spreads far, while Fuji is built from viscous, sticky lava and alternating ash layers',
      'Mount Fuji is an ancient fold mountain, whereas Mauna Loa is a block mountain',
      'Earthquakes compressed Mount Fuji into a sharp point',
    ],
    correctIndex: 1,
    explanation: 'Fluid basaltic lava flows long distances before solidifying, creating gentle shield volcanoes (Mauna Loa). Viscous lava cannot flow far and solidifies rapidly near the vent, forming steep composite/stratovolcanoes (Fujiyama, Vesuvius).',
    hints: [
      'Lava viscosity determines how far it flows before freezing.',
      'Runny lava = wide pancake shield. Sticky lava + ash = steep tall cone.',
      'Mauna Loa uses fluid basaltic lava; Fujiyama uses viscous lava with ash layers.',
    ],
  },
  // 14. Standard - Understanding (c6_geo_010)
  {
    id: 'ch_015_geo',
    nodeId: NODE_C6_GEO_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Compare a youthful mountain river valley with a glaciated mountain valley. Which statement correctly identifies their cross-sectional shapes and agents of erosion?',
    options: [
      'River valley = U-shaped (wind erosion); Glacial valley = V-shaped (water erosion)',
      'River valley = V-shaped (vertical fluvial downcutting); Glacial valley = U-shaped (glacial ice plucking and scouring)',
      'River valley = flat plain (tectonic faulting); Glacial valley = deep circular crater (meteor impact)',
      'Both river and glacial valleys always form identical rectangular trenches',
    ],
    correctIndex: 1,
    explanation: 'Fast-flowing mountain streams carve narrow V-shaped valleys through vertical downward erosion. Moving glacial ice fills the entire valley trough, scouring walls and floor to carve a broad, flat-bottomed U-shaped valley.',
    hints: [
      'Water cuts down at a single point, creating a V shape.',
      'Ice is a massive bulldozer filling the whole canyon, carving a wide U shape.',
      'River = V-shape; Glacier = U-shape.',
    ],
    misconceptionIndex: 4,
  },
  // 15. Advanced - Evaluation (c6_geo_002)
  {
    id: 'ch_016_geo',
    nodeId: NODE_C6_GEO_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A classroom debate asks: "Should physical geography classrooms completely discard flat wall maps and rely exclusively on desktop globes?" Evaluate the strongest counter-argument against this proposal.',
    options: [
      'Globes are completely inaccurate and distort equatorial landmasses',
      'Globes cannot be folded into books, are costly, and cannot show large-scale regional details such as state highway networks or district relief',
      'Flat maps have zero geometric distortion anywhere on Earth',
      'Globes show continents upside down half of the time',
    ],
    correctIndex: 1,
    explanation: 'While a globe is the most accurate 3D model of global proportions without polar distortion, it is bulky, non-portable, expensive, and cannot provide large-scale detailed maps of small districts or individual countries.',
    hints: [
      'Consider portability and scale limitations.',
      'Try putting a 30 cm globe in a school backpack or zooming into a single city street.',
      'Globes cannot show high-detail local regions and are inconvenient to transport.',
    ],
  },
  // 16. Advanced - Analysis / Bearings (c6_geo_004)
  {
    id: 'ch_017_geo',
    nodeId: NODE_C6_GEO_004,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A rescue helicopter takes off from a base camp facing True North (0°). It turns clockwise to fly directly South-East (SE) to reach an avalanche site. What is the numerical bearing angle in degrees for South-East?',
    correctAnswer: 135,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'Bearings are measured clockwise from North (0°): East = 90°, South = 180°. South-East is midway between 90° and 180° = 135°.',
    hints: [
      'North = 0°, East = 90°, South = 180Content.',
      'South-East lies midway between East (90°) and South (180°).',
      '90 + 45 = 135 degrees.',
    ],
  },
  // 17. Advanced - Evaluation (c6_geo_006)
  {
    id: 'ch_018_geo',
    nodeId: NODE_C6_GEO_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why the Himalayas act as a vital climatic and hydrological lifeline for over 1 billion people across South Asia.',
    options: [
      'They produce volcanic ash that fertilises soil across central India',
      'They intercept moisture-bearing South-West monsoon winds causing heavy orographic rainfall, while their snowfields and glaciers feed perennial river systems like the Ganga and Brahmaputra',
      'They prevent oceanic tides from flooding northern Uttar Pradesh',
      'They stop polar winds by generating artificial geothermal heating',
    ],
    correctIndex: 1,
    explanation: 'The Himalayas serve two essential roles: (1) Orographic barrier: forcing monsoon winds to rise, condense, and deposit rainfall; (2) Water towers: perennial glaciers feed the Ganga, Indus, and Brahmaputra basins year-round.',
    hints: [
      'Think about monsoon rainfall on the windward slopes (orographic effect).',
      'Glacial meltwater sustains northern Indian rivers throughout the dry summer season.',
      'They create orographic rainfall and feed perennial river systems with glacial melt.',
    ],
  },
  // 18. Advanced - Construct (c6_geo_008)
  {
    id: 'ch_019_geo',
    nodeId: NODE_C6_GEO_008,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the geological formula explaining a Rift Valley (Graben) by assembling the correct sequence of component terms.',
    availableParts: ['Tensional Forces', 'Compression', 'Fault Planes Fracture', 'Central Block Subsides', 'Anticline Arches', 'Uplifted Peak'],
    targetState: 'Tensional Forces Fault Planes Fracture Central Block Subsides',
    validationHint: 'Select: Force type -> Structural crack action -> Block movement direction',
    explanation: 'A rift valley forms when Tensional Forces pull crust apart -> Fault Planes Fracture -> Central Block Subsides between parallel faults.',
    hints: [
      'Start with the force that pulls crust apart (Tension).',
      'Next, what happens to the rock (Fault planes fracture).',
      'Finally, what does the middle block do? (Central block subsides).',
    ],
  },
  // 19. Advanced - Analysis (c6_geo_010)
  {
    id: 'ch_020_geo',
    nodeId: NODE_C6_GEO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At Jog Falls or Yosemite, spectacular waterfalls plunge hundreds of metres from high cliffside ledges into a deep main gorge. Which valley landform produces these cliff waterfalls?',
    options: ['Anticline Crest', 'Hanging Valley', 'Subsided Graben', 'Alluvial Fan'],
    correctIndex: 1,
    explanation: 'A Hanging Valley is a shallow tributary valley left perched high above a deep, glaciated main valley floor. When the ice melts, tributary streams plunge over the cliff as dramatic waterfalls.',
    hints: [
      'Think of a tributary glacier that could not cut as deeply as the main trunk glacier.',
      'The tributary valley is left "hanging" high above the main floor.',
      'This feature is termed a Hanging Valley.',
    ],
  },
  // 20. Advanced - Application (c6_geo_005)
  {
    id: 'ch_021_geo',
    nodeId: NODE_C6_GEO_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'On a 1 : 250,000 topographical sheet of the Western Ghats, a proposed mountain railway tunnel measures 8 cm on the map. What is the actual length of the tunnel on the ground in kilometres?',
    correctAnswer: 20,
    tolerance: 0.1,
    unit: 'km',
    explanation: '8 cm × 250,000 = 2,000,000 cm. Convert to km: 2,000,000 cm / 100,000 cm/km = 20 km.',
    hints: [
      'Multiply 8 cm by 250,000 to get total centimetres.',
      'Divide the result by 100,000 to convert cm into kilometres.',
      '2,000,000 / 100,000 = 20 km.',
    ],
  },
  // 21. Advanced - Evaluation (c6_geo_001)
  {
    id: 'ch_022_geo',
    nodeId: NODE_C6_GEO_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A research geographer wants to demonstrate how annual rainfall varies across Maharashtra, from over 300 cm on the Western Ghats to under 50 cm in the Marathwada rain shadow. Which map type is strictly required?',
    options: [
      'A Political boundary map showing taluka administrative offices',
      'A Thematic isohyet/precipitation map focusing specifically on rainfall distribution',
      'A Topographic contour map showing spot heights only',
      'A Cadastral land-ownership boundary sketch',
    ],
    correctIndex: 1,
    explanation: 'A Thematic map is dedicated to illustrating the spatial distribution of a single specific subject or theme — such as rainfall, soil classification, mineral deposits, or population density.',
    hints: [
      'Political maps show governance; physical maps show generic relief.',
      'A map highlighting a single subject (like rainfall or population) is thematic.',
      'The required tool is a Thematic Map.',
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
  nodeId: NODE_C6_GEO_001,
  title: 'Class 6 Geography: Maps, Directions, Scales & Landforms',
  definition: 'A map is a scaled 2D representation of the Earth using symbols, colours, and directions. Landforms such as Fold, Block, and Volcanic mountains, alongside V-shaped and U-shaped valleys, are shaped by endogenous tectonic forces (compression, tension) and exogenous erosion.',
  eli5: 'Maps are flat, scaled-down models of the world with compass roses and legends. Mountains form when the Earth pushes up (folds), breaks (faults), or spits out lava (volcanoes), while rivers and glaciers carve valleys between them.',
  misconceptions: [
    {
      misconception: 'A map and a photograph are identical tools for studying terrain.',
      correction: 'A photograph is literal and unselective; a map is selective, symbolic, scaled, and decodable via a legend.',
    },
    {
      misconception: 'Anticlines and synclines are completely different mountain ranges.',
      correction: 'Anticlines (up-arches) and synclines (down-troughs) are paired waves formed within the same folded strata.',
    },
    {
      misconception: 'A large-scale map covers a larger geographical area on Earth.',
      correction: 'Large-scale maps have small denominators (e.g. 1:1,000) and show small areas in high detail (like a school plan).',
    },
    {
      misconception: 'All tall mountains are volcanic cones.',
      correction: 'The tallest mountains (Himalayas, Andes, Rockies) are Fold Mountains created by tectonic compression, not volcanism.',
    },
    {
      misconception: 'All valleys are carved by rivers flowing through them.',
      correction: 'Rift valleys are formed by tectonic faulting and crustal subsidence; glacial valleys are carved into U-shapes by moving ice sheets.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is a map?', options: ['A photo from a drone', 'A 2D scaled symbolic drawing of Earth', 'A 3D spherical globe', 'A freehand rough sketch'], correctIndex: 1 },
    { question: 'Which scale is unitless?', options: ['Statement scale', 'Representative Fraction (RF)', 'Linear bar scale', 'Compass bearing'], correctIndex: 1 },
    { question: 'What is the bearing of East?', options: ['0°', '90°', '180°', '270°'], correctIndex: 1 },
    { question: 'The Himalayas are an example of:', options: ['Block Mountains', 'Fold Mountains', 'Volcanic Cones', 'Residual Stumps'], correctIndex: 1 },
    { question: 'What force creates a Horst and Graben?', options: ['Lateral Compression', 'Tensional Faulting', 'Glacial Scouring', 'Wind Deposition'], correctIndex: 1 },
    { question: 'What shape does a river valley take?', options: ['U-shape', 'V-shape', 'Perfect circle', 'Square box'], correctIndex: 1 },
    { question: 'Which mountain is a volcanic cone?', options: ['Aravalli', 'Vosges', 'Mount Fuji (Fujiyama)', 'Alps'], correctIndex: 2 },
    { question: 'A valley left perched above a main glacial trough is a:', options: ['Rift Valley', 'Syncline', 'Hanging Valley', 'Horst'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student understands map components, direction bearings, scale conversions, mountain formation mechanisms (folding, faulting, volcanism), and valley types.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Map Components & Scale Explorer',
    instruction: 'Drag the Scale Slider to see how the representation changes from a local Classroom Plan to a whole Subcontinental Map!',
    interactionType: 'slider-scale',
    nodeId: NODE_C6_GEO_001,
  },
  {
    title: 'Lab 2: The 8-Point Compass & Bearing Dial',
    instruction: 'Rotate the Compass Rose dial to align with cardinal and intermediate bearings (N, NE, E, SE, S, SW, W, NW).',
    interactionType: 'compass-rotate',
    nodeId: NODE_C6_GEO_004,
  },
  {
    title: 'Lab 3: Tectonic Folding Simulator (Anticline vs Syncline)',
    instruction: 'Apply lateral compressional force with the slider to watch sedimentary strata buckle into arches and troughs!',
    interactionType: 'slider-fold',
    nodeId: NODE_C6_GEO_007,
  },
  {
    title: 'Lab 4: Faulting Simulator (Horst vs Graben)',
    instruction: 'Pull the crust with tensional force to trigger fault displacement, creating the Vindhya Horst and Narmada Graben.',
    interactionType: 'slider-fault',
    nodeId: NODE_C6_GEO_008,
  },
  {
    title: 'Lab 5: Valley Carving: River (V-Shape) vs Glacier (U-Shape)',
    instruction: 'Toggle between River Downcutting and Glacial Ice Scouring to observe the real-time cross-sectional transformation.',
    interactionType: 'toggle-valley',
    nodeId: NODE_C6_GEO_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If two continental tectonic plates push relentlessly against each other for 20 million years, what will happen to the soft sedimentary layers between them?',
    options: [
      'They will snap into tiny dust particles instantly',
      'They will buckle and fold upward into towering mountain ranges with alternating anticlines and synclines',
      'They will melt into water and form a giant underground lake',
      'They will stay completely flat without any change',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Compression Slider to see the sedimentary strata buckle into Himalayan-style folds!',
    nodeId: NODE_C6_GEO_007,
  },
  {
    question: 'Predict: When moving glacial ice fills a steep V-shaped river valley, how will the valley cross-section change?',
    options: [
      'It will become a narrow knife-edge canyon',
      'The rigid ice will scour both the floor and sidewalls, widening it into a flat-bottomed, steep-walled U-shaped trough',
      'It will fill up with magma and become a volcano',
      'It will turn into an inverted pyramid',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Glacier mode in Lab 5 to watch the ice widen the valley into a classic U-shape!',
    nodeId: NODE_C6_GEO_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice happening to the central crust block when tensional force pulls the sides outward in the Faulting simulator?',
    observableOptions: [
      'The central block rises into the sky like a balloon',
      'The central block slides downward between the two fault planes, creating a deep sunken Graben (Rift Valley)',
      'The rocks bend into smooth wavy folds without cracking',
      'The entire continent splits and dissolves',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_GEO_008,
  },
  {
    question: 'When you increase the scale denominator from 1:1,000 (Plan) to 1:10,000,000 (Subcontinental Map), what happens to the level of visible detail?',
    observableOptions: [
      'Detail increases massively and you can see individual classroom desks across all of Asia',
      'The area shown expands enormously, but local micro-details (buildings, trees, streets) disappear',
      'The map turns into a 3D spinning globe',
      'The colours reverse completely',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_GEO_005,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Himalayan Field Cartographer Challenge',
  description: 'Apply your newfound geographical mastery to survey your own neighbourhood and plan an expedition route in India!',
  steps: [
    'Draw a large-scale Plan (1:500) of your school campus or home with title, north arrow, and key.',
    'Identify whether your state lies near Fold Mountains (Himalayas), Block Mountains (Vindhyas/Satpuras), or ancient Residual highlands (Aravallis/Deccan).',
    'Calculate the actual straight-line distance between your city and New Delhi using a 1:5,000,000 atlas map scale.',
    'Locate one major river valley (e.g. Ganga, Narmada, or Brahmaputra) and identify whether it flows through a tectonic rift or an alluvial plain.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C6_GeographyMapsIntroductionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_GEO_001,
  title = DEFAULT_PROPS.title || 'Geography: Maps & Landforms',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🗺️', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant patterns state
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Lab state
  const [scaleDenominator, setScaleDenominator] = useState(1000); // 1000 to 10,000,000
  const [compassAngle, setCompassAngle] = useState(0); // 0 to 360 deg
  const [foldCompression, setFoldCompression] = useState(0); // 0 to 100%
  const [faultTension, setFaultTension] = useState(0); // 0 to 100%
  const [valleyType, setValleyType] = useState<'river' | 'glacier' | 'rift'>('river');
  const [volcanoLavaType, setVolcanoLavaType] = useState<'fluid' | 'viscous'>('fluid');
  const [volcanoEruptions, setVolcanoEruptions] = useState(1);

  // Feedback & Difficulty state
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
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge Drag & Drop / Input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses state
  const [reflections, setReflections] = useState<Record<string, string>>({});

  // Persistent BKT ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCALSTORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE EFFECT ───
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

  // ─── CANVAS PARTICLE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic compass grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 40 + Math.sin(frame * 0.04) * 4, 0, Math.PI * 2);
      ctx.stroke();

      // Pulsing cardinal indicator
      const px = canvas.width / 2 + Math.cos(frame * 0.03) * 35;
      const py = canvas.height / 2 + Math.sin(frame * 0.03) * 35;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(px, py, 3, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Field Cartography Lab.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Sandbox mode activated. Freely manipulate all geological and map variables.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering certification challenges. Best of luck, Field Cartographer!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive lab to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Brilliant scientific observation!' : 'Look closely at the fault line movement.');
  }, []);

  // ─── INTERACTIVE LAB HANDLERS ───
  const handleScaleChange = useCallback((val: number) => {
    setScaleDenominator(val);
    audioManager.play('count');
  }, []);

  const handleCompassRotate = useCallback((deg: number) => {
    setCompassAngle(deg);
    audioManager.play('tap');
  }, []);

  const handleFoldCompression = useCallback((val: number) => {
    setFoldCompression(val);
    audioManager.play('balance');
  }, []);

  const handleFaultTension = useCallback((val: number) => {
    setFaultTension(val);
    audioManager.play('balance');
  }, []);

  const handleValleyToggle = useCallback((v: 'river' | 'glacier' | 'rift') => {
    setValleyType(v);
    audioManager.play('swoop');
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const current = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Geological expedition complete! Excellent cartographic work.');
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
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── MASTER ANSWER HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent geographic deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete geological breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Derived compass label
  const cardinalLabel = useMemo(() => {
    const angle = ((compassAngle % 360) + 360) % 360;
    if (angle >= 337.5 || angle < 22.5) return 'North (N) - 0° / 360°';
    if (angle >= 22.5 && angle < 67.5) return 'North-East (NE) - 45°';
    if (angle >= 67.5 && angle < 112.5) return 'East (E) - 90°';
    if (angle >= 112.5 && angle < 157.5) return 'South-East (SE) - 135°';
    if (angle >= 157.5 && angle < 202.5) return 'South (S) - 180°';
    if (angle >= 202.5 && angle < 247.5) return 'South-West (SW) - 225°';
    if (angle >= 247.5 && angle < 292.5) return 'West (W) - 270°';
    return 'North-West (NW) - 315°';
  }, [compassAngle]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                ICSE Class 6 • {subjectConfig.name}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                NEP 2020 Competency
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty pills */}
        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : difficulty === 'standard'
                  ? 'bg-blue-950 text-blue-300 border-blue-600'
                  : 'bg-rose-950 text-rose-300 border-rose-600'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-400 font-mono">
            Mastery: <span className="text-emerald-400 font-bold capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/50 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🧭</span> Narrative Scenario Hook
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 bg-indigo-950/60 p-3 rounded-xl border border-indigo-900/60 font-mono">
              Mission Context: {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>💡</span> Curiosity Discovery Question
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1">{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Flattening a curved surface forces polar stretching (the Mercator effect).'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (BRILLIANT.ORG INTERACTIVE VISUALIZATIONS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-400 rounded-lg text-xs font-bold font-mono">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-base font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Previous Lab"
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('whoosh');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                aria-label="Next Lab or Sandbox"
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow"
              >
                {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Open Sandbox Mode →' : 'Next Lab →'}
              </motion.button>
            </div>
          </div>

          <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 font-medium">
            👉 <span className="font-bold">{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-2xl"
            >
              {/* SLIDE 0: MAP COMPONENT & SCALE CONVERTER */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Adjust Map Scale (Representative Fraction): 1 : {scaleDenominator.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        min={1000}
                        max={10000000}
                        step={100000}
                        value={scaleDenominator}
                        onChange={e => handleScaleChange(Number(e.target.value))}
                        aria-label="Scale Denominator Range Slider"
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="mt-4 space-y-2 text-xs">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Scale Classification:</span>
                          <span className="font-bold text-emerald-400">
                            {scaleDenominator <= 50000 ? 'Large-Scale (Plan/Cadastral)' : 'Small-Scale (Regional/Atlas Map)'}
                          </span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Statement Equivalent:</span>
                          <span className="font-bold text-cyan-400">
                            1 cm = {(scaleDenominator / 100000).toFixed(2)} km on ground
                          </span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Suitable For:</span>
                          <span className="font-bold text-amber-300">
                            {scaleDenominator <= 5000
                              ? 'Architectural Room Floor Plan'
                              : scaleDenominator <= 50000
                              ? 'Village / Campus Survey'
                              : scaleDenominator <= 1000000
                              ? 'State Road Network'
                              : 'Subcontinent of India'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Scale Visualisation SVG */}
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 320 200" className="w-full h-auto max-w-[300px]">
                        {scaleDenominator <= 50000 ? (
                          // Large Scale: Classroom / Campus Plan
                          <g>
                            <rect x="20" y="20" width="280" height="160" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                            <text x="160" y="45" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Classroom Physics Lab Plan (1:1,000)</text>
                            <rect x="40" y="60" width="60" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                            <text x="70" y="85" textAnchor="middle" fill="#93c5fd" fontSize="9">Lab Desk 1</text>
                            <rect x="120" y="60" width="60" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" />
                            <text x="150" y="85" textAnchor="middle" fill="#93c5fd" fontSize="9">Lab Desk 2</text>
                            <rect x="200" y="60" width="80" height="100" rx="4" fill="#334155" stroke="#f59e0b" />
                            <text x="240" y="115" textAnchor="middle" fill="#fde68a" fontSize="10">Teacher Desk</text>
                            <circle cx="70" cy="140" r="15" fill="#065f46" stroke="#10b981" />
                            <text x="70" y="144" textAnchor="middle" fill="#a7f3d0" fontSize="8">Sink</text>
                          </g>
                        ) : (
                          // Small Scale: India Subcontinental Map Outline
                          <g>
                            <rect x="10" y="10" width="300" height="180" rx="8" fill="#020617" stroke="#334155" />
                            <path
                              d="M 120 30 Q 160 20 180 50 Q 240 70 230 110 Q 190 140 160 175 Q 130 140 90 110 Q 80 60 120 30 Z"
                              fill="#1e1b4b"
                              stroke="#6366f1"
                              strokeWidth="2"
                            />
                            {/* Himalayas Arc */}
                            <path d="M 120 40 Q 170 30 220 55" fill="none" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />
                            <text x="175" y="48" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">Himalayan Arc</text>
                            {/* Ganga River */}
                            <path d="M 140 60 Q 180 75 220 90" fill="none" stroke="#38bdf8" strokeWidth="2" />
                            <text x="160" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">India (1:10,000,000)</text>
                          </g>
                        )}
                        {/* Graphical linear bar at bottom */}
                        <line x1="30" y1="185" x2="130" y2="185" stroke="#ffffff" strokeWidth="3" />
                        <line x1="30" y1="180" x2="30" y2="190" stroke="#ffffff" strokeWidth="2" />
                        <line x1="80" y1="182" x2="80" y2="188" stroke="#ffffff" strokeWidth="2" />
                        <line x1="130" y1="180" x2="130" y2="190" stroke="#ffffff" strokeWidth="2" />
                        <text x="30" y="197" textAnchor="middle" fill="#94a3b8" fontSize="7">0</text>
                        <text x="80" y="197" textAnchor="middle" fill="#94a3b8" fontSize="7">{(scaleDenominator / 200000).toFixed(0)}</text>
                        <text x="130" y="197" textAnchor="middle" fill="#94a3b8" fontSize="7">{(scaleDenominator / 100000).toFixed(0)} km</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: COMPASS ROSE & 8 CARDINAL POINTS */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Rotate Bearing Dial: {compassAngle}° ({cardinalLabel})
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={359}
                        value={compassAngle}
                        onChange={e => handleCompassRotate(Number(e.target.value))}
                        aria-label="Compass Angle Slider"
                        className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {[
                          { name: 'N', deg: 0 },
                          { name: 'NE', deg: 45 },
                          { name: 'E', deg: 90 },
                          { name: 'SE', deg: 135 },
                          { name: 'S', deg: 180 },
                          { name: 'SW', deg: 225 },
                          { name: 'W', deg: 270 },
                          { name: 'NW', deg: 315 },
                        ].map(pt => (
                          <motion.button
                            key={pt.name}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCompassRotate(pt.deg)}
                            aria-label={`Set direction ${pt.name}`}
                            className={`p-2 rounded-xl text-xs font-bold border ${
                              Math.abs(compassAngle - pt.deg) < 15
                                ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                                : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {pt.name} ({pt.deg}°)
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mt-4 text-xs text-slate-300">
                        <span className="text-cyan-400 font-bold">Rule of Bearings:</span> Angles are always measured{' '}
                        <span className="text-white font-bold">clockwise from True North (0°)</span>.
                      </div>
                    </div>

                    {/* Interactive Compass Rose SVG */}
                    <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 240 240" className="w-56 h-56">
                        {/* Outer Compass Dial */}
                        <circle cx="120" cy="120" r="105" fill="#090d16" stroke="#1e293b" strokeWidth="4" />
                        <circle cx="120" cy="120" r="85" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />

                        {/* Cardinal Labels */}
                        <text x="120" y="30" textAnchor="middle" fill="#ef4444" fontSize="14" fontWeight="bold">N (0°)</text>
                        <text x="210" y="125" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">E (90°)</text>
                        <text x="120" y="218" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">S (180°)</text>
                        <text x="30" y="125" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">W (270°)</text>

                        {/* Intermediate Labels */}
                        <text x="185" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9">NE 45°</text>
                        <text x="185" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">SE 135°</text>
                        <text x="55" y="185" textAnchor="middle" fill="#94a3b8" fontSize="9">SW 225°</text>
                        <text x="55" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9">NW 315°</text>

                        {/* Rotating Needle */}
                        <g transform={`rotate(${compassAngle} 120 120)`}>
                          {/* Red North Needle */}
                          <polygon points="120,40 110,120 120,110" fill="#ef4444" />
                          <polygon points="120,40 130,120 120,110" fill="#b91c1c" />
                          {/* White/Blue South Needle */}
                          <polygon points="120,200 110,120 120,130" fill="#cbd5e1" />
                          <polygon points="120,200 130,120 120,130" fill="#64748b" />
                          <circle cx="120" cy="120" r="8" fill="#f8fafc" stroke="#0f172a" strokeWidth="2" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: TECTONIC FOLDING (ANTICLINE & SYNCLINE) */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {/* Predict-Then-Check */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-800 space-y-3">
                      <p className="text-sm font-bold text-indigo-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction option ${i + 1}`}
                            className="w-full p-2.5 text-left text-xs bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700 text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Compressional Tectonic Force: {foldCompression}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={foldCompression}
                        onChange={e => handleFoldCompression(Number(e.target.value))}
                        aria-label="Fold Compression Slider"
                        className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="mt-4 space-y-2 text-xs">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Upward Wave (Anticline):</span>
                          <span className="font-bold text-emerald-400">
                            {foldCompression > 20 ? 'Forming Mountain Ridge (Arch)' : 'Flat Stratum'}
                          </span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Downward Wave (Syncline):</span>
                          <span className="font-bold text-cyan-400">
                            {foldCompression > 20 ? 'Forming Valley Trough' : 'Flat Stratum'}
                          </span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Real World Example:</span>
                          <span className="font-bold text-amber-300">Himalayas (Asia), Alps (Europe), Rockies</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Folding Cross-Section SVG */}
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[240px]">
                      <svg viewBox="0 0 320 180" className="w-full h-auto">
                        {(() => {
                          const amp = (foldCompression / 100) * 45;
                          return (
                            <g>
                              {/* Top layer (Limestone/Sandstone) */}
                              <path
                                d={`M 20 90 Q 95 ${90 - amp} 160 90 Q 225 ${90 + amp} 300 90 L 300 110 Q 225 ${110 + amp} 160 110 Q 95 ${110 - amp} 20 110 Z`}
                                fill="#d97706"
                                stroke="#b45309"
                                strokeWidth="2"
                              />
                              {/* Middle layer (Shale) */}
                              <path
                                d={`M 20 110 Q 95 ${110 - amp} 160 110 Q 225 ${110 + amp} 300 110 L 300 130 Q 225 ${130 + amp} 160 130 Q 95 ${130 - amp} 20 130 Z`}
                                fill="#475569"
                                stroke="#334155"
                                strokeWidth="2"
                              />
                              {/* Deep basement rock */}
                              <path
                                d={`M 20 130 Q 95 ${130 - amp} 160 130 Q 225 ${130 + amp} 300 130 L 300 160 L 20 160 Z`}
                                fill="#1e293b"
                                stroke="#0f172a"
                              />

                              {/* Lateral compression arrows */}
                              <path d="M 5 90 L 25 90 M 20 85 L 25 90 L 20 95" stroke="#ef4444" strokeWidth="3" />
                              <path d="M 315 90 L 295 90 M 300 85 L 295 90 L 300 95" stroke="#ef4444" strokeWidth="3" />

                              {/* Dynamic Labels */}
                              {foldCompression > 30 && (
                                <>
                                  <text x="95" y={65 - amp / 2} textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
                                    ANTICLINE (Arch)
                                  </text>
                                  <line x1="95" y1={70 - amp / 2} x2="95" y2={90 - amp} stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />

                                  <text x="225" y={135 + amp / 2} textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">
                                    SYNCLINE (Trough)
                                  </text>
                                  <line x1="225" y1={120 + amp / 2} x2="225" y2={90 + amp} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                                </>
                              )}
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: FAULTING (HORST & GRABEN) */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Tensional Crustal Force: {faultTension}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={faultTension}
                        onChange={e => handleFaultTension(Number(e.target.value))}
                        aria-label="Fault Tension Slider"
                        className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                      />

                      <div className="mt-4 space-y-2 text-xs">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Side Blocks (Horsts):</span>
                          <span className="font-bold text-emerald-400">Vindhyas / Black Forest</span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                          <span className="text-slate-400">Subsided Central Block (Graben):</span>
                          <span className="font-bold text-rose-400">Narmada Valley / Rhine Valley</span>
                        </div>
                      </div>

                      {/* Observation question */}
                      {faultTension > 40 && !observationAnswered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-3 bg-slate-950 border border-slate-700 rounded-xl space-y-2"
                        >
                          <p className="text-xs font-bold text-amber-300">Observation: {OBSERVATION_QUESTIONS[0].question}</p>
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              aria-label={`Observation answer ${i + 1}`}
                              className="w-full p-2 text-left text-xs bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Dynamic Faulting Cross-Section SVG */}
                    <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col items-center justify-center min-h-[240px]">
                      <svg viewBox="0 0 320 180" className="w-full h-auto">
                        {(() => {
                          const drop = (faultTension / 100) * 35;
                          return (
                            <g>
                              {/* Left Block (Horst) */}
                              <polygon points="10,50 100,50 115,160 10,160" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                              <text x="55" y="40" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                                HORST (Vindhyas)
                              </text>

                              {/* Central Subsiding Block (Graben) */}
                              <polygon
                                points={`105,${50 + drop} 215,${50 + drop} 200,160 120,160`}
                                fill="#0f766e"
                                stroke="#115e59"
                                strokeWidth="2"
                              />
                              {faultTension > 30 && (
                                <text x="160" y={75 + drop} textAnchor="middle" fill="#5eead4" fontSize="9" fontWeight="bold">
                                  GRABEN (Narmada)
                                </text>
                              )}

                              {/* Right Block (Horst) */}
                              <polygon points="220,50 310,50 310,160 205,160" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                              <text x="265" y="40" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                                HORST (Block)
                              </text>

                              {/* Fault plane fracture lines */}
                              <line x1="100" y1="40" x2="120" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                              <line x1="220" y1="40" x2="200" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />

                              {/* Tensional pull arrows */}
                              <path d="M 20 20 L 5 20 M 10 15 L 5 20 L 10 25" stroke="#f43f5e" strokeWidth="2" />
                              <path d="M 300 20 L 315 20 M 310 15 L 315 20 L 310 25" stroke="#f43f5e" strokeWidth="2" />
                            </g>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: VALLEY FORMATION (RIVER VS GLACIER VS RIFT) */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex gap-3 justify-center">
                    {(['river', 'glacier', 'rift'] as const).map(v => (
                      <motion.button
                        key={v}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleValleyToggle(v)}
                        aria-label={`Switch to ${v} valley mode`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          valleyType === v
                            ? 'bg-emerald-950 border-emerald-400 text-emerald-200 shadow-lg'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {v === 'river' ? '🌊 River Valley (V-Shape)' : v === 'glacier' ? '❄️ Glacial Valley (U-Shape)' : '⚡ Rift Valley (Tectonic)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <div className="w-full md:w-1/2 flex justify-center">
                      <svg viewBox="0 0 300 180" className="w-full max-w-[280px]">
                        {valleyType === 'river' && (
                          <g>
                            {/* V-Shaped Mountain Profile */}
                            <polygon points="10,20 150,150 290,20 290,170 10,170" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                            {/* Water Stream at notch */}
                            <circle cx="150" cy="150" r="10" fill="#38bdf8" />
                            <path d="M 150 145 Q 160 160 150 175" stroke="#0284c7" strokeWidth="3" fill="none" />
                            <text x="150" y="70" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">
                              V-SHAPED VALLEY
                            </text>
                            <text x="150" y="90" textAnchor="middle" fill="#94a3b8" fontSize="9">
                              Vertical Fluvial Erosion (Ganga Valley)
                            </text>
                          </g>
                        )}
                        {valleyType === 'glacier' && (
                          <g>
                            {/* U-Shaped Glacial Profile */}
                            <path
                              d="M 20 20 L 50 110 Q 150 170 250 110 L 280 20 L 290 170 L 10 170 Z"
                              fill="#1e293b"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                            {/* Flat Meadow Floor */}
                            <rect x="70" y="140" width="160" height="15" fill="#065f46" rx="3" />
                            {/* Hanging side tributary waterfall */}
                            <path d="M 30 50 L 50 50 L 50 110" stroke="#bae6fd" strokeWidth="2" fill="none" />
                            <text x="150" y="65" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">
                              U-SHAPED GLACIAL VALLEY
                            </text>
                            <text x="150" y="85" textAnchor="middle" fill="#94a3b8" fontSize="9">
                              Ice Scouring & Plucking (Yosemite, USA)
                            </text>
                          </g>
                        )}
                        {valleyType === 'rift' && (
                          <g>
                            {/* Fault-bounded Straight Rift */}
                            <rect x="20" y="30" width="70" height="130" fill="#334155" />
                            <rect x="210" y="30" width="70" height="130" fill="#334155" />
                            <rect x="95" y="90" width="110" height="70" fill="#0f766e" />
                            <line x1="92" y1="20" x2="92" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
                            <line x1="208" y1="20" x2="208" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
                            <text x="150" y="75" textAnchor="middle" fill="#5eead4" fontSize="12" fontWeight="bold">
                              RIFT VALLEY (Graben)
                            </text>
                            <text x="150" y="115" textAnchor="middle" fill="#ffffff" fontSize="9">
                              Narmada (India) / Rhine (Europe)
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="w-full md:w-1/2 space-y-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-slate-300">Active Process: </span>
                        <span className="text-emerald-400">
                          {valleyType === 'river'
                            ? 'Fluvial downward erosion carving steep interlocking spurs.'
                            : valleyType === 'glacier'
                            ? 'Massive rigid ice bulldozer plucking rocks and flattening valley floor.'
                            : 'Tectonic crustal fracture causing downward block subsidence.'}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="font-bold text-slate-300">Special Landmark Feature: </span>
                        <span className="text-cyan-400">
                          {valleyType === 'river'
                            ? 'Gorges and Canyons'
                            : valleyType === 'glacier'
                            ? 'Hanging Valleys & Plunging Waterfalls'
                            : 'Steep Escarpment Fault Scarps'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (FREE PLAY BEFORE GRADED CHALLENGES) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-900 rounded-2xl border border-teal-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white">Free Cartographic & Tectonic Sandbox</h2>
              <p className="text-xs text-slate-300 mt-1">
                Zero pressure, zero grading! Freely manipulate scales, compass angles, and mountain formation variables.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Certification Challenges"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 whitespace-nowrap"
            >
              I Am Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Control Panel 1: Scales & Direction */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">1. Map & Direction Controls</h3>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Scale: 1 : {scaleDenominator.toLocaleString()}</label>
                <input
                  type="range"
                  min={1000}
                  max={5000000}
                  step={50000}
                  value={scaleDenominator}
                  onChange={e => handleScaleChange(Number(e.target.value))}
                  aria-label="Sandbox Scale Range"
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Compass Bearing: {compassAngle}°</label>
                <input
                  type="range"
                  min={0}
                  max={359}
                  value={compassAngle}
                  onChange={e => handleCompassRotate(Number(e.target.value))}
                  aria-label="Sandbox Compass Angle"
                  className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
              <p className="text-[11px] text-cyan-300 font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                Facing: {cardinalLabel}
              </p>
            </div>

            {/* Control Panel 2: Tectonic Forces */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">2. Earth Force Controls</h3>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Compression (Folding): {foldCompression}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={foldCompression}
                  onChange={e => handleFoldCompression(Number(e.target.value))}
                  aria-label="Sandbox Fold Slider"
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Tension (Faulting): {faultTension}%</label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={faultTension}
                  onChange={e => handleFaultTension(Number(e.target.value))}
                  aria-label="Sandbox Fault Slider"
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFoldCompression(85)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded text-slate-200"
                >
                  Make Himalayas
                </button>
                <button
                  onClick={() => setFaultTension(75)}
                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] font-bold rounded text-slate-200"
                >
                  Make Narmada Rift
                </button>
              </div>
            </div>

            {/* Control Panel 3: Volcano Simulator */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">3. Volcanic Cone Growth</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setVolcanoLavaType('fluid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    volcanoLavaType === 'fluid' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Fluid (Mauna Loa Shield)
                </button>
                <button
                  onClick={() => setVolcanoLavaType('viscous')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    volcanoLavaType === 'viscous' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Viscous (Fuji Cone)
                </button>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Successive Eruptions: {volcanoEruptions}</label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={volcanoEruptions}
                  onChange={e => setVolcanoEruptions(Number(e.target.value))}
                  aria-label="Sandbox Eruptions Slider"
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Visual animation progress canvas */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <canvas ref={canvasRef} width={80} height={35} className="rounded-lg bg-slate-950 border border-slate-800" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Question {currentChallenge + 1} of {filteredChallenges.length} • NEP Level: {challenge.competencyLevel.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-white">Target Node: {challenge.nodeId}</span>
              </div>
            </div>

            {/* Hint Trigger Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showNextHint}
              disabled={hintCount >= 3 || showExplanation}
              aria-label="Request escalating hint"
              className="px-3 py-1.5 bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>💡</span> Hint ({hintCount}/3)
            </motion.button>
          </div>

          {/* Animated Challenge Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* CHALLENGE QUESTION CARD */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{challenge.question}</h3>

            {/* TYPE 1: MCQ (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                      wrongFlash
                        ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-950/90 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG LABEL (DIAGRAM ANNOTATION) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                {/* Available Labels Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Draggable Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag label: ${item.label}`}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Target Boxes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'box_fold', title: 'Compressional Folding of Sedimentary Layers' },
                    { id: 'box_block', title: 'Tensional Faulting & Horst Block Uplift' },
                    { id: 'box_volc', title: 'Lava, Ash & Pyroclastic Material Piling' },
                    { id: 'box_resid', title: 'Millions of Years of Weathering & Erosion' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[90px] flex flex-col justify-between"
                    >
                      <span className="text-xs text-slate-400 font-medium">{target.title}</span>
                      <div className="mt-2 p-2 bg-slate-900 rounded-lg text-center font-bold text-sm text-emerald-400 border border-slate-800">
                        {droppedLabels[target.id] || '👉 Drop Mountain Type Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Submit Drag Labels"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify All Mappings ✓
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">Drag or use arrows to rearrange steps in correct chronological order:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-sm text-slate-200 cursor-grab"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-indigo-950 text-indigo-300 font-bold flex items-center justify-center text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Submit Ordered Steps"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Check Sequence Order ✓
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Enter numeric answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 focus:outline-none w-60"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric value"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Construction Area */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-emerald-900 border border-emerald-600 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      {p}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-black ml-1"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click component blocks above to construct the chain</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Check Constructed Formula"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow disabled:opacity-40"
                >
                  Verify Geological Formula ✓
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-indigo-950/70 to-slate-950 rounded-2xl border border-indigo-700/60 space-y-4 mt-6"
              >
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <span>📖</span> Detailed Step-by-Step Geological Explanation
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
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-2">Step {i + 1}:</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next step of explanation"
                      className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Explanation Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl border border-emerald-600/60 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Geographical Certification Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully surveyed all 10 core ICSE Class 6 nodes: map projections, scale ratios, 8 cardinal bearings, fold/fault tectonics, and valley systems.
            </p>

            <div className="flex justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Mastery Tier</span>
                <span className="text-2xl font-black text-cyan-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Errors</span>
                <span className="text-2xl font-black text-amber-400">{errors}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Performance Assessment</h3>
            <p className="text-sm text-slate-200">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered all cartographic scales, directional bearings, and tectonic landform mechanisms!'
                : errors <= 3
                ? '👏 Excellent work! You demonstrate strong geographic reasoning. Review your notes below to hit 100% on the next attempt.'
                : '💪 Solid effort! Geography requires connecting internal Earth forces with surface landforms. Re-explore the sandbox anytime to cement these concepts.'}
            </p>
          </div>

          {/* Misconceptions Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Profile Review ({hitMisconceptions.length} gaps flagged)
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-400 font-semibold">✓ Scientific Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility Card */}
          <div className="p-6 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-slate-900 rounded-2xl border border-cyan-700/60 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
                    SM-2 Spaced Repetition (SRS) Memory Schedule
                  </h3>
                  <p className="text-xs text-slate-400">
                    Scientifically calculated review interval to lock concepts into long-term memory.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-black font-mono">
                SRS ACTIVE
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">Recommended Next Review Session</span>
                <span className="text-lg font-black text-emerald-400">
                  {errors === 0
                    ? 'Review in 7 days (Optimal Recall Retention)'
                    : errors <= 3
                    ? 'Review in 3 days (Reinforce Developing Nodes)'
                    : 'Review in 1 day (Rapid Consolidation Required)'}
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Based on {errors} errors during this session: schedule is set to{' '}
                  <span className="text-white font-semibold">
                    {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                  </span>.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    errors >= 4
                      ? 'bg-rose-950 text-rose-300 border border-rose-600 shadow-md'
                      : 'bg-slate-950 text-slate-500'
                  }`}
                >
                  1 Day (4+ errors)
                </span>
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    errors >= 1 && errors <= 3
                      ? 'bg-amber-950 text-amber-300 border border-amber-600 shadow-md'
                      : 'bg-slate-950 text-slate-500'
                  }`}
                >
                  3 Days (1-3 errors)
                </span>
                <span
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    errors === 0
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-600 shadow-md'
                      : 'bg-slate-950 text-slate-500'
                  }`}
                >
                  7 Days (0 errors)
                </span>
              </div>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>💭</span> Post-Expedition Reflection
            </div>
            <h3 className="text-base font-bold text-white">Reflect on Your Learning</h3>
            <p className="text-xs text-slate-400">
              Deepen your conceptual mastery by thinking through these key questions:
            </p>
            <div className="space-y-4">
              {[
                {
                  id: 'surprising',
                  q: 'What was the most surprising thing you learned?',
                  placeholder: 'e.g. How folding of ancient ocean floors created the highest Himalayan peaks...',
                },
                {
                  id: 'explain',
                  q: 'How would you explain this to a friend?',
                  placeholder: 'e.g. Explain how a compass bearing or scale ratio works in simple everyday words...',
                },
                {
                  id: 'real_life',
                  q: 'Where in real life might you use this?',
                  placeholder: 'e.g. Reading navigation maps, understanding earthquake zones, planning hikes...',
                },
              ].map(item => (
                <div key={item.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-slate-200 block">{item.q}</label>
                  <textarea
                    rows={2}
                    value={reflections[item.id] || ''}
                    onChange={e => setReflections(prev => ({ ...prev, [item.id]: e.target.value }))}
                    placeholder={item.placeholder}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Real World Field Activity */}
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/50 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-indigo-200">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── BRILLIANT ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Geological Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C6_GeographyMapsIntroductionSim;