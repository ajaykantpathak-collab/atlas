'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// ─── NODE ID CONSTANTS (ICSE Class 10 Geography) ───
const NODE_C10_GEO_001 = 'c10_geo_001';
const NODE_C10_GEO_002 = 'c10_geo_002';
const NODE_C10_GEO_003 = 'c10_geo_003';
const NODE_C10_GEO_004 = 'c10_geo_004';
const NODE_C10_GEO_005 = 'c10_geo_005';
const NODE_C10_GEO_006 = 'c10_geo_006';
const NODE_C10_GEO_007 = 'c10_geo_007';
const NODE_C10_GEO_008 = 'c10_geo_008';
const NODE_C10_GEO_009 = 'c10_geo_009';
const NODE_C10_GEO_010 = 'c10_geo_010';

const ALL_NODE_IDS = [
  NODE_C10_GEO_001,
  NODE_C10_GEO_002,
  NODE_C10_GEO_003,
  NODE_C10_GEO_004,
  NODE_C10_GEO_005,
  NODE_C10_GEO_006,
  NODE_C10_GEO_007,
  NODE_C10_GEO_008,
  NODE_C10_GEO_009,
  NODE_C10_GEO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Operation TopoGrid: The Survey of India Expedition',
  intro: 'As a newly commissioned Chief Cartographic Officer for the Survey of India, you are tasked with analyzing toposheet 45D/10 and coordinating strategic infrastructure across diverse Indian physiographic terrains.',
  context: 'From calculating 6-figure grid references and tracing contour cross-sections in Rajasthan, to charting monsoon fronts, soil vulnerabilities, and mineral transit corridors, your cartographic accuracy is vital for disaster relief and regional development.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'On a 1:50,000 Survey of India toposheet, vertical grid lines are numbered 14, 15, 16 from left to right, and horizontal lines are numbered 80, 81, 82 from bottom to top. Which line is an "Easting" and why?',
  options: [
    'The horizontal lines (80, 81), because they run from West to East.',
    'The vertical lines (14, 15), because their numbering increases as you move Eastward.',
    'Both sets of lines are called Eastings in the northern hemisphere.',
    'The horizontal lines, because they point towards the eastern sunrise.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember the mnemonic: "Along the corridor (Eastings) and up the stairs (Northings)"! Eastings are vertical lines whose values increase towards the East.',
};

// ─── CLIMATE DATA FOR CHARTS (Recharts) ───
const CLIMATE_STATION_DATA = [
  { month: 'Jan', mumbaiTemp: 24, mumbaiRain: 1, delhiTemp: 14, delhiRain: 21, mawsynramRain: 18 },
  { month: 'Feb', mumbaiTemp: 25, mumbaiRain: 1, delhiTemp: 17, delhiRain: 24, mawsynramRain: 50 },
  { month: 'Mar', mumbaiTemp: 27, mumbaiRain: 1, delhiTemp: 23, delhiRain: 17, mawsynramRain: 180 },
  { month: 'Apr', mumbaiTemp: 29, mumbaiRain: 2, delhiTemp: 29, delhiRain: 13, mawsynramRain: 620 },
  { month: 'May', mumbaiTemp: 31, mumbaiRain: 12, delhiTemp: 34, delhiRain: 31, mawsynramRain: 1250 },
  { month: 'Jun', mumbaiTemp: 29, mumbaiRain: 520, delhiTemp: 34, delhiRain: 78, mawsynramRain: 2400 },
  { month: 'Jul', mumbaiTemp: 27, mumbaiRain: 840, delhiTemp: 31, delhiRain: 235, mawsynramRain: 2700 },
  { month: 'Aug', mumbaiTemp: 27, mumbaiRain: 585, delhiTemp: 30, delhiRain: 250, mawsynramRain: 2100 },
  { month: 'Sep', mumbaiTemp: 27, mumbaiRain: 340, delhiTemp: 29, delhiRain: 130, mawsynramRain: 1100 },
  { month: 'Oct', mumbaiTemp: 29, mumbaiRain: 65, delhiTemp: 26, delhiRain: 15, mawsynramRain: 450 },
  { month: 'Nov', mumbaiTemp: 28, mumbaiRain: 15, delhiTemp: 20, borderRain: 6, delhiRain: 6, mawsynramRain: 70 },
  { month: 'Dec', mumbaiTemp: 25, mumbaiRain: 2, delhiTemp: 15, delhiRain: 11, mawsynramRain: 15 },
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about contour line spacing on a toposheet when the terrain is steep versus flat?',
    observableOptions: [
      'Contour lines are closely packed on steep slopes and widely spaced on flat terrain (✓)',
      'Contour lines are always equally spaced regardless of slope (✗)',
      'Contour lines are wider apart on steep slopes (✗)',
      'Contour lines disappear on flat terrain (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'On a 1:50,000 toposheet, what do you notice about the relationship between grid reference numbers and direction?',
    observableOptions: [
      'Eastings increase left-to-right and Northings increase bottom-to-top (✓)',
      'Eastings increase top-to-bottom (✗)',
      'Northings increase right-to-left (✗)',
      'Both sets increase in the same direction (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Recall Grid Lines (c10_geo_001)
  {
    id: 'ch_geo_001',
    nodeId: NODE_C10_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On a Survey of India 1:50,000 toposheet, what do Easting lines represent and how do their numbers progress?',
    options: [
      'Horizontal lines numbered from North to South',
      'Vertical lines running North-South whose numbers increase Eastward',
      'Diagonal lines measuring magnetic declination',
      'Contour lines connecting points of equal height above sea level',
    ],
    correctIndex: 1,
    explanation: 'Eastings are vertical lines running North-South. Their grid numbers increase as you move towards the East (to the right).',
    hints: [
      'Think about whether Eastings run up-down or left-right.',
      'The name indicates the direction of numerical increase: eastward.',
      'Vertical lines numbered progressively towards the right are Eastings.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation: Conventional Colours (c10_geo_001)
  {
    id: 'ch_geo_002',
    nodeId: NODE_C10_GEO_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the Survey of India conventional colours to the feature types they represent on a toposheet.',
    dragItems: [
      { label: 'Cultivated Land', targetId: 'color_yellow' },
      { label: 'Forested Area', targetId: 'color_green' },
      { label: 'Settlements & Huts', targetId: 'color_red' },
      { label: 'Perennial Water / River', targetId: 'color_blue' },
    ],
    correctMapping: {
      color_yellow: 'Cultivated Land',
      color_green: 'Forested Area',
      color_red: 'Settlements & Huts',
      color_blue: 'Perennial Water / River',
    },
    explanation: 'Conventional colours are standardized: Yellow represents cultivated agricultural land, Green denotes forests/vegetation, Red marks settlements and roads, and Blue represents perennial water bodies.',
    hints: [
      'Think about crops growing in fields (yellow) vs dense tree canopies (green).',
      'Human settlements and buildings are shown in red.',
      'Water bodies with perennial water are drawn in blue.',
    ],
  },

  // 3. Foundation: Contour spacing rule (c10_geo_002)
  {
    id: 'ch_geo_003',
    nodeId: NODE_C10_GEO_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'On a contour extract with a contour interval of 20 m, what do closely packed contour lines indicate?',
    options: [
      'A broad flat plateau summit',
      'A steep slope or escarpment',
      'A wide flood plain of a meandering river',
      'An arid sand desert with dunes',
    ],
    correctIndex: 1,
    explanation: 'Closely spaced contour lines indicate that elevation changes rapidly over a very short horizontal distance, which represents a steep slope.',
    hints: [
      'Horizontal distance is small while vertical height increases by 20m per line.',
      'If you have to climb 100 meters in just 20 meters of walking, how steep is the hill?',
      'Close contours = steep gradient; wide contours = gentle gradient.',
    ],
  },

  // 4. Standard: 4-Figure & 6-Figure Grid Calculation (c10_geo_001)
  {
    id: 'ch_geo_004',
    nodeId: NODE_C10_GEO_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A temple is situated in grid square Easting 24 and Northing 58. It is located exactly 6 tenths East of line 24 and 3 tenths North of line 58. Enter the 6-figure grid reference as a single 6-digit integer (e.g. 246583).',
    correctAnswer: 246583,
    tolerance: 0,
    unit: 'grid code',
    explanation: 'The 6-figure grid reference combines Easting (24) + 6 tenths = 246, and Northing (58) + 3 tenths = 583. Combining them gives 246583.',
    hints: [
      'Rule: Read Eastings first ("along corridor"), then Northings ("up stairs").',
      'Easting component: 24 + 6 = 246.',
      'Northing component: 58 + 3 = 583. Put them together: 246583.',
    ],
    misconceptionIndex: 1,
  },

  // 5. Standard: Scale Distance Conversion (c10_geo_001)
  {
    id: 'ch_geo_005',
    nodeId: NODE_C10_GEO_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'On a 1:50,000 toposheet, a straight cart track measures 8.4 cm on the map. What is the actual ground distance in kilometres?',
    correctAnswer: 4.2,
    tolerance: 0.05,
    unit: 'km',
    explanation: 'At 1:50,000 scale, 1 cm represents 50,000 cm = 500 m = 0.5 km. Ground distance = 8.4 cm × 0.5 km/cm = 4.2 km.',
    hints: [
      'Convert the RF 1:50,000 to statement scale: 1 cm = 0.5 km.',
      'Multiply map distance in cm by 0.5.',
      '8.4 × 0.5 = 4.2 km.',
    ],
  },

  // 6. Standard: Valley vs Ridge Contour Signature (c10_geo_002)
  {
    id: 'ch_geo_006',
    nodeId: NODE_C10_GEO_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do V-shaped contour lines distinguish a river valley from a ridge on a toposheet?',
    options: [
      'In a valley, the apex of the V points towards higher ground (upslope); in a ridge, U/V contours point towards lower ground.',
      'In a valley, the V points towards lower ground (downstream); on a ridge, it points upslope.',
      'Valleys have circular contours with values decreasing inward; ridges have square contours.',
      'There is no direction difference; both point randomly regardless of gradient.',
    ],
    correctIndex: 0,
    explanation: 'Because a river valley cuts into the hillside, contour lines must bend upstream (upslope) towards higher elevation to maintain equal height. In contrast, ridges push outward into lower ground.',
    hints: [
      'The valley floor is lower than the surrounding spurs.',
      'To stay at 200m elevation across a cut river channel, the contour must travel upstream.',
      'V points upslope for valleys; U/V points downslope for ridges/spurs.',
    ],
    misconceptionIndex: 2,
  },

  // 7. Foundation: India Latitudinal/Longitudinal Extent (c10_geo_004)
  {
    id: 'ch_geo_007',
    nodeId: NODE_C10_GEO_004,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the precise mainland latitudinal and longitudinal extent of India?',
    options: [
      '8°4\'N to 37°6\'N latitude and 68°7\'E to 97°25\'E longitude',
      '6°45\'N to 35°8\'N latitude and 65°0\'E to 95°10\'E longitude',
      '10°0\'N to 40°0\'N latitude and 70°0\'E to 100°0\'E longitude',
      '8°4\'S to 37°6\'S latitude and 68°7\'W to 97°25\'W longitude',
    ],
    correctIndex: 0,
    explanation: 'India extends from 8°4\'N (Kanyakumari) to 37°6\'N (Indira Col) latitude, and from 68°7\'E (Gujarat) to 97°25\'E (Arunachal Pradesh) longitude.',
    hints: [
      'India lies entirely in the Northern and Eastern hemispheres.',
      'The southern mainland tip starts at 8°4\'N.',
      'The longitudinal spread is from 68°7\'E to 97°25\'E (about 29 degrees).',
    ],
  },

  // 8. Standard: Tropic of Cancer States (c10_geo_004)
  {
    id: 'ch_geo_008',
    nodeId: NODE_C10_GEO_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The Tropic of Cancer (23°30\'N) divides India into tropical and subtropical zones. Which of the following groups contains ONLY states traversed by the Tropic of Cancer?',
    options: [
      'Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram',
      'Gujarat, Maharashtra, Odisha, Bihar, Jharkhand, Assam, Nagaland, Manipur',
      'Punjab, Haryana, Uttar Pradesh, Bihar, West Bengal, Meghalaya, Sikkim',
      'Rajasthan, Madhya Pradesh, Uttar Pradesh, Bihar, Odisha, Andhra Pradesh, Telangana',
    ],
    correctIndex: 0,
    explanation: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.',
    hints: [
      'It passes through central India from west to east.',
      'It does NOT touch Maharashtra, Uttar Pradesh, or Odisha.',
      'It exits the northeast through Tripura and Mizoram.',
    ],
    misconceptionIndex: 3,
  },

  // 9. Standard: IST Time Difference Calculation (c10_geo_004)
  {
    id: 'ch_geo_009',
    nodeId: NODE_C10_GEO_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The longitudinal difference between westernmost Gujarat (68°7\'E) and easternmost Arunachal Pradesh (97°25\'E) is ~29.3°. Given that Earth rotates 1° in 4 minutes, calculate the local solar time difference in minutes (rounded to nearest whole minute).',
    correctAnswer: 117,
    tolerance: 2,
    unit: 'minutes',
    explanation: '29.3 degrees × 4 minutes/degree = 117.2 minutes (approx. 1 hour 57 minutes, nearly 2 hours).',
    hints: [
      'Formula: Degrees × 4 minutes.',
      '29.3 × 4 = 117.2.',
      'Enter 117.',
    ],
  },

  // 10. Foundation: 3 Himalayan Ranges (c10_geo_005)
  {
    id: 'ch_geo_010',
    nodeId: NODE_C10_GEO_005,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the three parallel ranges of the Himalayas in order from NORTH (highest) to SOUTH (outermost).',
    sortItems: [
      'Himadri (Greater Himalayas — average height 6,000 m)',
      'Himachal (Lesser Himalayas — altitude 1,500–4,500 m)',
      'Shiwalik (Outer Himalayas — lowest, unconsolidated sediments)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'The Himalayan arc consists of Himadri (Northernmost/Highest), followed southward by Himachal (Lesser Himalayas), and Shiwalik (Southernmost/Outer Himalayas).',
    hints: [
      'Himadri contains peaks like Everest and Kanchenjunga.',
      'Himachal contains hill stations like Shimla and Darjeeling.',
      'Shiwalik is the outer, youngest southern foothills.',
    ],
  },

  // 11. Standard: West-Flowing vs East-Flowing Rivers (c10_geo_003)
  {
    id: 'ch_geo_011',
    nodeId: NODE_C10_GEO_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do the Narmada and Tapi rivers flow westward into the Arabian Sea, whereas the Godavari, Krishna, and Kaveri flow eastward into the Bay of Bengal?',
    options: [
      'Narmada and Tapi flow through faulted rift valleys between the Vindhyas and Satpuras, while the Deccan plateau tilts gently eastward.',
      'Narmada and Tapi originate in the Himalayas, whereas peninsular rivers originate in the Eastern Ghats.',
      'The Western Ghats block all eastward flow in central India due to high sea tides.',
      'Earth rotation forces northern rivers westward and southern rivers eastward.',
    ],
    correctIndex: 0,
    explanation: 'The Narmada and Tapi occupy tectonic rift valleys that slope westward towards the Arabian Sea. In contrast, the main Deccan plateau has a general eastward tilt from the high Western Ghats towards the Bay of Bengal.',
    hints: [
      'Look at the geology of central India between the Vindhya and Satpura ranges.',
      'Rift valleys create linear troughs that override the general regional slope.',
      'The Deccan plateau naturally tilts towards the east.',
    ],
  },

  // 12. Standard: Mumbai vs Delhi Climate Contrast (c10_geo_006)
  {
    id: 'ch_geo_006_b',
    nodeId: NODE_C10_GEO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Mumbai experiences an annual temperature range of only ~5°C, while Delhi experiences an annual range of over 20°C (from 14°C in Jan to 34°C in June). Which geographic factor accounts for this difference?',
    options: [
      'Distance from the sea (Maritime moderation in Mumbai vs Continentality in Delhi)',
      'Difference in altitude (Delhi is 3,000 m higher than Mumbai)',
      'Direction of Western Disturbances affecting only the Konkan coast',
      'The Tropic of Cancer passing directly over Mumbai city',
    ],
    correctIndex: 0,
    explanation: 'Mumbai enjoys a maritime climate due to the high specific heat capacity of the adjacent Arabian Sea, which moderates temperature extremes. Delhi lies deep inland and suffers from continentality.',
    hints: [
      'Think about land breeze and sea breeze acting as a thermal cushion.',
      'Places far from the sea have extreme summers and cold winters.',
      'This phenomenon is called continentality.',
    ],
  },

  // 13. Advanced: Orographic Rain-Shadow Mechanism (c10_geo_006)
  {
    id: 'ch_geo_013',
    nodeId: NODE_C10_GEO_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Mahabaleshwar on the windward crest of the Western Ghats receives ~600 cm of rainfall, while Pune, just 65 km away on the leeward side, receives only ~70 cm. What causes this stark rainfall disparity?',
    options: [
      'Moist Arabian Sea monsoon winds are forced to rise, cool adiabatically and precipitate on the windward side; descending air warms and loses relative humidity on the leeward side (Rain-Shadow effect).',
      'Pune is located north of the Tropic of Cancer where monsoon winds cannot blow.',
      'Dense industrial pollution in Pune prevents condensation of clouds.',
      'The Bay of Bengal branch deflects all clouds away from Maharashtra towards Tamil Nadu.',
    ],
    correctIndex: 0,
    explanation: 'As southwest monsoon winds hit the Western Ghats, orographic lifting causes adiabatic cooling and heavy condensation on the windward side. As the air descends on the leeward slope, it warms and expands, creating a dry rain-shadow zone over the Deccan interior.',
    hints: [
      'Consider the mechanical effect of a 1,200m mountain wall on incoming moist winds.',
      'Rising air cools and rains; descending air warms and dries out.',
      'This creates the classic windward vs leeward rain-shadow contrast.',
    ],
  },

  // 14. Foundation: Black Soil / Regur Formation (c10_geo_007)
  {
    id: 'ch_geo_014',
    nodeId: NODE_C10_GEO_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Black soil (Regur) of the Deccan Trap is formed by the weathering of which parent material, and which major commercial crop is it famous for supporting?',
    options: [
      'Volcanic basaltic lava rocks; ideal for Cotton cultivation',
      'Glacial moraines in high valleys; ideal for Tea plantations',
      'Limestone deposits in coastal lagoons; ideal for Jute farming',
      'Desert sand dunes; ideal for Mustard cultivation',
    ],
    correctIndex: 0,
    explanation: 'Black soil is derived from the weathering of Deccan basaltic lava. It is clayey, retains moisture exceptionally well, self-ploughs through summer cracking, and is the premier soil for growing cotton (black cotton soil).',
    hints: [
      'The Deccan Plateau was formed by ancient fissure lava flows.',
      'The soil has high clay content and holds water for months.',
      'Maharashtra and Gujarat lead in cotton production on this soil.',
    ],
  },

  // 15. Standard: Laterite Soil Leaching Process (c10_geo_007)
  {
    id: 'ch_geo_015',
    nodeId: NODE_C10_GEO_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is Laterite soil in the high-rainfall slopes of the Western Ghats generally poor in agricultural fertility despite heavy vegetation growth?',
    options: [
      'Intense torrential monsoon rains leach away soluble silica and lime, leaving only insoluble iron and aluminium oxides with little humus.',
      'The soil is composed entirely of undecomposed volcanic glass that poisons plant roots.',
      'Groundwater salinity from sea spray prevents any bacterial decomposition.',
      'Permafrost conditions prevent nutrient uptake by plant roots.',
    ],
    correctIndex: 0,
    explanation: 'Laterisation is a process of intense leaching under alternating wet and dry tropical conditions with heavy rainfall. Soluble plant nutrients and silica are washed downward, leaving a residual crust of iron and aluminium oxides.',
    hints: [
      'Think about what happens when hundreds of centimetres of rain percolate through soil.',
      'Leaching removes soluble nutrients.',
      'Residual iron oxides give it a brick-red colour and low fertility.',
    ],
    misconceptionIndex: 4,
  },

  // 16. Standard: Natural Vegetation Adaptations (c10_geo_008)
  {
    id: 'ch_geo_016',
    nodeId: NODE_C10_GEO_008,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each forest type with its signature botanical adaptation and representative tree species:',
    options: [
      'Mangrove: Pneumatophores (breathing roots) & Sundari; Thorn: Xerophytic thorns/wax & Babul; Evergreen: Dense canopy & Rosewood; Deciduous: Summer leaf shed & Teak/Sal',
      'Evergreen: Complete winter leaf shed & Babul; Mangrove: Deep needle leaves & Pine; Thorn: Broad soft leaves & Sundari; Deciduous: Epiphytes & Cactus',
      'All Indian forests possess identical leaf-shedding cycles regardless of rainfall.',
      'Mangrove: Coniferous cones & Deodar; Mountain: Aerial roots & Mahogany; Thorn: Salt glands & Sal',
    ],
    correctIndex: 0,
    explanation: 'Mangroves in saline mud develop pneumatophores (Sundari); Thorn forests have xerophytic spines to prevent transpiration (Babul/Acacia); Evergreen trees retain dense canopies (Rosewood/Mahogany); Deciduous trees shed leaves in dry season (Teak/Sal).',
    hints: [
      'Sundarbans mangroves need oxygen in waterlogged saline mud.',
      'Desert plants turn leaves into thorns to save water.',
      'Deciduous trees shed leaves for 6-8 weeks during dry summer.',
    ],
  },

  // 17. Advanced: Water Conservation & Drip Efficiency (c10_geo_009)
  {
    id: 'ch_geo_017',
    nodeId: NODE_C10_GEO_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is Drip Irrigation considered far superior to conventional Flood/Canal Irrigation in the arid and semi-arid tracts of Maharashtra and Rajasthan?',
    options: [
      'It delivers water drop-by-drop directly to the root zone via perforated drippers, slashing evaporation losses and seepage by up to 70% while preventing soil salinisation.',
      'It requires zero energy and creates artificial monsoon clouds through misting.',
      'It converts saline groundwater into pure mineral water automatically.',
      'It eliminates the need for any fertilisation or soil management.',
    ],
    correctIndex: 0,
    explanation: 'Drip irrigation maximizes water use efficiency by delivering precise quantities of water directly to plant roots, drastically cutting evaporation in hot climates and avoiding the waterlogging and salinity caused by flood irrigation.',
    hints: [
      'Compare dumping a bucket of water on sand vs a medical drip.',
      'Evaporation is extreme in dry regions like Rajasthan.',
      'Water goes straight to the roots, preventing wastage.',
    ],
  },

  // 18. Standard: Multipurpose River Valley Project Matching (c10_geo_009)
  {
    id: 'ch_geo_018',
    nodeId: NODE_C10_GEO_009,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match each major Multipurpose River Valley Project to its respective river and primary beneficiary states.',
    dragItems: [
      { label: 'Bhakra Nangal Project', targetId: 'proj_sutlej' },
      { label: 'Hirakud Dam Project', targetId: 'proj_mahanadi' },
      { label: 'Damodar Valley Corporation', targetId: 'proj_damodar' },
    ],
    correctMapping: {
      proj_sutlej: 'Bhakra Nangal Project',
      proj_mahanadi: 'Hirakud Dam Project',
      proj_damodar: 'Damodar Valley Corporation',
    },
    explanation: 'Bhakra Nangal is on the Sutlej (Punjab/Haryana/HP), Hirakud (longest dam in India) is on the Mahanadi in Odisha, and DVC is on the Damodar river in Jharkhand and West Bengal.',
    hints: [
      'Sutlej river feeds Bhakra Nangal and the Indira Gandhi canal system.',
      'Mahanadi river in Odisha is dammed at Hirakud.',
      'Damodar river ("sorrow of Bengal") is regulated by DVC.',
    ],
  },

  // 19. Foundation: Mineral Ores & Metallic Properties (c10_geo_010)
  {
    id: 'ch_geo_019',
    nodeId: NODE_C10_GEO_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly pairs each metallic mineral with its primary industrial utility and leading producing state in India?',
    options: [
      'Hematite (Iron ore): Steel making (Odisha); Manganese: Deoxidiser & alloy in steel (Odisha/Maharashtra); Bauxite: Aluminium ore for aircraft/cables (Odisha); Copper: Electrical wiring at Khetri (Rajasthan)',
      'Bauxite: Direct electrical conductor without smelting (Punjab); Iron ore: Fertilizer manufacture (Kerala); Copper: Glass polishing (Gujarat)',
      'Manganese: Pure fuel for nuclear reactors (Assam); Hematite: Lightweight foil for food packaging (Delhi)',
      'All metallic minerals in India are exclusively mined in the Northern Plains of Uttar Pradesh.',
    ],
    correctIndex: 0,
    explanation: 'Hematite is high-grade iron ore for steel (Odisha leading); Manganese is essential for alloying and hardening steel; Bauxite is the raw ore for aluminium; Copper from Khetri is vital for electrical conductivity.',
    hints: [
      'Iron ore and manganese are both vital to the iron and steel industry.',
      'Bauxite is refined into alumina and then smelted into aluminium.',
      'Khetri in Rajasthan is world-famous for copper mines.',
    ],
  },

  // 20. Advanced: Soil Conservation Strategy Construction (c10_geo_007)
  {
    id: 'ch_geo_020',
    nodeId: NODE_C10_GEO_007,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct an integrated 4-step Soil Conservation Plan for a degraded, steep Himalayan agricultural slope suffering from rapid gully erosion.',
    availableParts: [
      'Afforestation on upper ridges',
      'Terracing mid-slope gradients',
      'Contour Ploughing across furrows',
      'Stone Check Dams in gully beds',
      'Intensive chemical flood irrigation',
      'Clear-cut timber logging',
    ],
    targetState: 'Afforestation on upper ridges Terracing mid-slope gradients Contour Ploughing across furrows Stone Check Dams in gully beds',
    validationHint: 'Select the four sustainable conservation techniques in sequence from top ridge to gully bed.',
    explanation: 'A comprehensive hill slope strategy binds the summit with tree roots (Afforestation), breaks the slope gradient into steps (Terracing), prevents sheet runoff across fields (Contour Ploughing), and halts active gully carving in ravines (Check Dams).',
    hints: [
      'Start at the top of the mountain: plant trees to bind soil.',
      'On the cultivated middle slopes: cut steps into the hill (terracing) and plough along contours.',
      'In the active gullies at the bottom: place check dams to trap sediment.',
    ],
  },

  // 21. Advanced: Mineral Conservation & Economic Strategy (c10_geo_010)
  {
    id: 'ch_geo_021',
    nodeId: NODE_C10_GEO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is mineral conservation in India considered an urgent economic necessity rather than merely an optional environmental goal?',
    options: [
      'Minerals are non-renewable geological endowments with finite reserves; without scrap recycling, beneficiation of low-grade ores, and alternative substitution, critical industries like steel and energy face resource exhaustion.',
      'Minerals dissolve in rainwater within 5 years if left unmined in the ground.',
      'India possesses no domestic mineral deposits and must import 100% of all iron and bauxite.',
      'The Survey of India legally prohibits mining whenever the monsoon starts.',
    ],
    correctIndex: 0,
    explanation: 'Minerals take millions of years of geological processes to form and cannot be regenerated within human timeframes. Sustainable extraction, recycling of metals like copper and aluminium, and modern beneficiation are critical for national industrial resilience.',
    hints: [
      'Think about the timescale of ore formation vs consumption rate.',
      'Non-renewable means once extracted and discarded, it is lost.',
      'Recycling aluminium and copper saves over 90% of the energy required for virgin smelting.',
    ],
  },

  // 22. Advanced: Toposheet Settlement & Drainage Pattern Interpretation (c10_geo_001)
  {
    id: 'ch_geo_022',
    nodeId: NODE_C10_GEO_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On toposheet extract 45D/10, red nucleated settlements are clustered near perennial lined wells and yellow wash, while white barren areas show broken black lines (dry streams) forming a dendritic pattern. What geographic inference can be drawn?',
    options: [
      'The region is a semi-arid agrarian rural landscape dependent on well irrigation for farming, with seasonal flash-runoff streams active only during brief monsoon showers.',
      'The area is a heavily urbanised metropolitan port city located inside a tropical rainforest.',
      'The entire district is an uninhabited glacier moraine above 5,000 metres elevation.',
      'The region is a coal-mining industrial belt with no agriculture.',
    ],
    correctIndex: 0,
    explanation: 'Nucleated red squares near blue circles (lined wells) and yellow wash (agriculture) indicate compact farming villages relying on groundwater. White spaces with broken black drainage lines denote dry, seasonal uncultivated streams characteristic of semi-arid Rajasthan/Gujarat.',
    hints: [
      'Yellow = farming; Blue circle = lined well; Red cluster = nucleated village.',
      'Broken black lines = dry seasonal watercourses (nallas).',
      'Together, they paint a picture of an arid/semi-arid farming community.',
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
  nodeId: NODE_C10_GEO_001,
  title: 'Topographical Maps & Geography of India',
  definition: 'Topographical map interpretation involves decoding Survey of India toposheets (1:50,000 / 1:25,000) using 4-figure and 6-figure grid references, conventional signs and colours, scale calculations, and contour relief patterns, integrated with India\'s physiographic, climatic, soil, water, and mineral resource geography.',
  eli5: 'Toposheets are like high-tech treasure maps with numbered grids (Eastings & Northings), contour lines that show hills and valleys, and color codes that reveal villages, forests, and rivers across the diverse subcontinent of India.',
  misconceptions: [
    { misconception: 'Eastings are horizontal lines and Northings are vertical lines.', correction: 'Eastings are vertical lines running North-South whose numbers increase Eastward; Northings are horizontal lines running West-East whose numbers increase Northward.' },
    { misconception: 'Grid references are read Northing first, then Easting.', correction: 'Always read Eastings first, then Northings ("along the corridor and up the stairs").' },
    { misconception: 'V-shaped contour lines point downstream for river valleys.', correction: 'V-shaped contours point UPSLOPE (towards higher ground) in river valleys because the valley floor is lower than the surrounding terrain.' },
    { misconception: 'The Tropic of Cancer divides India into two mathematically equal halves.', correction: 'The Tropic of Cancer (23°30\'N) divides India into tropical and subtropical climate zones, passing through 8 states slightly north of the geographical centre.' },
    { misconception: 'Laterite soil is highly fertile because it grows lush plantation crops.', correction: 'Laterite soil is heavily leached of silica and nutrients by intense monsoon rainfall; tea and coffee flourish due to acidic drainage and artificial fertilisation, not natural fertility.' },
  ],
  diagnosticQuestions: [
    { question: 'What are vertical grid lines on a toposheet called?', options: ['Northings', 'Eastings', 'Isobars', 'Meridians'], correctIndex: 1 },
    { question: 'What do closely spaced contour lines represent?', options: ['Gentle slope', 'Steep slope', 'Flat plain', 'Ocean trench'], correctIndex: 1 },
    { question: 'Through how many Indian states does the Tropic of Cancer pass?', options: ['6', '7', '8', '9'], correctIndex: 2 },
    { question: 'What is the standard scale of ICSE Survey of India toposheets?', options: ['1:250,000', '1:50,000', '1:10,000', '1:1,000,000'], correctIndex: 1 },
    { question: 'Which soil type is formed by volcanic lava and is best for cotton?', options: ['Alluvial', 'Red', 'Black (Regur)', 'Laterite'], correctIndex: 2 },
    { question: 'Which river flows westward through a rift valley?', options: ['Godavari', 'Krishna', 'Narmada', 'Mahanadi'], correctIndex: 2 },
    { question: 'What adaptation do mangrove trees develop to breathe in saline mud?', options: ['Pneumatophores', 'Needle leaves', 'Deep taproots', 'Carnivorous pitchers'], correctIndex: 0 },
    { question: 'Which multipurpose project is constructed on the Mahanadi in Odisha?', options: ['Bhakra Nangal', 'Hirakud', 'Damodar Valley', 'Sardar Sarovar'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student accurately reads 4-figure and 6-figure grid references, converts scale distances, identifies contour landforms and slopes, interprets climate graphs, and maps India\'s physical, soil, water, and mineral features with over 80% accuracy.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Toposheet 45D/10: Grid Coordinates & Decoders',
    instruction: 'Click on different grid squares to decode 4-figure and 6-figure references, scale conversions, and conventional symbols.',
    interactionType: 'grid-inspector',
    nodeId: NODE_C10_GEO_001,
  },
  {
    title: '3D Contour & Relief Simulator',
    instruction: 'Move the elevation slicing slider to construct real-time contour profiles of hills, valleys, ridges, and steep cliffs.',
    interactionType: 'contour-slider',
    nodeId: NODE_C10_GEO_002,
  },
  {
    title: 'India Interactive Atlas: Physical & Drainage Layers',
    instruction: 'Toggle mountain ranges, rift valleys, and east/west river drainage systems to discover how relief governs flow.',
    interactionType: 'map-layers',
    nodeId: NODE_C10_GEO_005,
  },
  {
    title: 'Monsoon Dynamic Weather Station',
    instruction: 'Switch between Mumbai, Delhi, and Mawsynram to analyze how latitude, continentality, and orographic lifting shape rain and temperature.',
    interactionType: 'climate-analyzer',
    nodeId: NODE_C10_GEO_006,
  },
  {
    title: 'Resource Matrix: Soils, Minerals & Water Hub',
    instruction: 'Select resource hubs across India to inspect soil leaching, black lava cotton belts, dam reservoirs, and mineral mining.',
    interactionType: 'resource-inspector',
    nodeId: NODE_C10_GEO_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you measure a winding river on a 1:50,000 toposheet using a straight rigid ruler instead of a thread, will your calculated ground distance be:',
    options: [
      'Much SHORTER than the true ground distance (underestimating length)',
      'Much LONGER than the true ground distance (overestimating length)',
      'Exactly the same as using a curved thread',
      'Dependent entirely on whether the river flows North or South',
    ],
    correctIndex: 0,
    verifyInstruction: 'Test it in the simulator! A straight ruler cuts across river meanders, losing all curved loops and severely underestimating true length.',
    nodeId: NODE_C10_GEO_001,
  },
  {
    question: 'Predict: When southwest monsoon winds hit the 1,200 m Western Ghats, what happens to rainfall on the Deccan Plateau (Pune) compared to the coast (Mumbai)?',
    options: [
      'Rainfall decreases drastically because descending leeward air warms up and creates a rain shadow.',
      'Rainfall doubles because clouds bounce off the mountains into the interior.',
      'Pune receives snow while Mumbai receives no rain.',
      'Rainfall remains identical across the entire width of Maharashtra.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the monsoon slider in the Climate tab to observe how clouds shed moisture on the windward slope!',
    nodeId: NODE_C10_GEO_006,
  },
];

// ─── REAL WORLD FIELDWORK ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Topographic Fieldwork & GIS Regional Survey',
  description: 'Download the Survey of India Open Series Map extract for your local district (or school surroundings at 1:50,000). Carry out a 4-point terrain audit using grid coordinates, elevation contours, and drainage observations.',
  steps: [
    'Locate your school or home using a 6-figure grid reference (Eastings first, then Northings).',
    'Calculate the straight-line and road-network distance to the nearest railway station or major river using the RF 1:50,000 scale (1 cm = 0.5 km).',
    'Identify the local soil type (Alluvial, Black, Red, or Laterite) and note any soil erosion signs or conservation structures (terracing, check dams, afforestation).',
    'Record seasonal rainfall patterns and compile a simple temperature-precipitation chart for your district.',
  ],
};

// ─── MAIN COMPONENT ───
function C10_GeographyTopographicalMapsInterpretationSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🗺️', color: 'emerald' };

  // ─── STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);

  // Reflection Responses
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Escalating hints and explanation disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Construction Challenge State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Interactive Simulation Sliders & Explorer State
  const [selectedGridSquare, setSelectedGridSquare] = useState<{ easting: number; northing: number } | null>({ easting: 15, northing: 82 });
  const [subGridX, setSubGridX] = useState(4);
  const [subGridY, setSubGridY] = useState(7);
  const [contourSlicerElevation, setContourSlicerElevation] = useState(140);
  const [contourProfileType, setContourProfileType] = useState<'hill' | 'valley' | 'ridge' | 'cliff'>('hill');
  const [selectedMapLayer, setSelectedMapLayer] = useState<'physical' | 'rivers' | 'climate' | 'minerals'>('physical');
  const [climateCity, setClimateCity] = useState<'mumbai' | 'delhi' | 'mawsynram'>('mumbai');
  const [riverThreadLengthCm, setRiverThreadLengthCm] = useState(12.6);
  const [dripEfficiencyPercent, setDripEfficiencyPercent] = useState(65);
  const [selectedSoilType, setSelectedSoilType] = useState<'alluvial' | 'black' | 'laterite' | 'red'>('black');

  // Animation & Feedback Component State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
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

  // ─── BKT-BASED DIFFICULTY ADAPTATION ───
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

  // ─── 2D CANVAS ANIMATION: Wind & River Particles ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 1 + Math.random() * 2,
      size: 2 + Math.random() * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#38bdf8';
      particles.forEach(p => {
        p.x += p.speed;
        p.y += (Math.sin(p.x * 0.05) * 0.5);
        if (p.x > canvas.width) {
          p.x = 0;
          p.y = Math.random() * canvas.height;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && challenge.hints[nextLvl - 1]) {
      setCurrentHint(challenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLvl - 1]);
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

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Spot on! Let us master toposheets.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive cartography lab. Manipulate the tools to explore.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test all toposheet parameters with zero exam pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode initiated. Put your map skills to the test.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now verify your prediction using the live interactive simulation!');
  }, []);

  const handleGridCellClick = useCallback((easting: number, northing: number) => {
    setSelectedGridSquare({ easting, northing });
    audioManager.play('tap');
    speechManager.speak(`Selected Grid Square: Easting ${easting}, Northing ${northing}`);
  }, []);

  const handleSubGridChange = useCallback((dx: number, dy: number) => {
    setSubGridX(dx);
    setSubGridY(dy);
    audioManager.play('count');
  }, []);

  const handleContourElevationChange = useCallback((elev: number) => {
    setContourSlicerElevation(elev);
    audioManager.play('count');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorr = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorr) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Expedition complete! You have attained Survey of India certification.');
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const parsed = typeof ans === 'string' ? parseFloat(ans) : ans as number;
      isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent geographical reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ score: 100, date: Date.now() }));
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
        speechManager.speak('Let us review the step-by-step cartographic solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  // Derived Grid Coordinates
  const fourFigRef = useMemo(() => {
    if (!selectedGridSquare) return '1582';
    return `${selectedGridSquare.easting}${selectedGridSquare.northing}`;
  }, [selectedGridSquare]);

  const sixFigRef = useMemo(() => {
    if (!selectedGridSquare) return '154827';
    return `${selectedGridSquare.easting}${subGridX}${selectedGridSquare.northing}${subGridY}`;
  }, [selectedGridSquare, subGridX, subGridY]);

  // Derived Ground Distance
  const calculatedGroundKm = useMemo(() => {
    return (riverThreadLengthCm * 0.5).toFixed(2);
  }, [riverThreadLengthCm]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/60 border border-emerald-700 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-emerald-400 font-medium">ICSE Class 10 Geography ��� Survey of India & Resource Geography</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-black uppercase rounded-full tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
              'bg-gold-500/20 text-gold-400 border-gold-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800 text-xs font-semibold rounded-full border border-slate-700 text-slate-300">
            Mastery: <strong className="text-amber-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🧭</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-2 bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-700/40">
              📌 Mission Briefing: {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Curiosity Discovery Hook</span>
            <p className="text-white font-semibold mt-1 mb-4 text-base">{DISCOVERY_QUESTION.question}</p>
            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-700 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on intuition!' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Topo Labs"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg"
                >
                  Enter Interactive Topo Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (Interactive Visual Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Diagnostic status */}
          <div className="flex items-center justify-between bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/60 text-xs text-slate-300">
            <span>🗺️ Lab Step <strong>{currentSlide + 1}</strong> of {EXPLORATION_STEPS.length}</span>
            <span>Target Node: <code className="text-emerald-400 font-mono">{EXPLORATION_STEPS[currentSlide].nodeId}</code></span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4"
            >
              <div>
                <h3 className="text-lg font-black text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs sm:text-sm text-amber-400 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: TOPOSHEET 45D/10 GRID INSPECTOR ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="lg:col-span-7">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">Survey of India Toposheet Grid Extract (Scale 1:50,000)</p>
                    <svg viewBox="0 0 360 260" className="w-full bg-slate-900 rounded-lg border border-slate-700 select-none">
                      {/* Grid Lines */}
                      {[14, 15, 16, 17].map((easting, idx) => (
                        <g key={easting}>
                          <line x1={50 + idx * 75} y1="20" x2={50 + idx * 75} y2="230" stroke="#475569" strokeWidth="1.5" />
                          <text x={50 + idx * 75} y="245" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">{easting}</text>
                          <text x={50 + idx * 75} y="14" textAnchor="middle" fill="#94a3b8" fontSize="8">Easting</text>
                        </g>
                      ))}

                      {[83, 82, 81, 80].map((northing, idx) => (
                        <g key={northing}>
                          <line x1="40" y1={40 + idx * 60} x2="285" y2={40 + idx * 60} stroke="#475569" strokeWidth="1.5" />
                          <text x="25" y={44 + idx * 60} textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">{northing}</text>
                          <text x="300" y={44 + idx * 60} textAnchor="start" fill="#94a3b8" fontSize="8">Northing</text>
                        </g>
                      ))}

                      {/* Clickable Grid Squares with conventional symbols */}
                      {[14, 15, 16].map((e, eIdx) =>
                        [80, 81, 82].map((n, nIdx) => {
                          const isSel = selectedGridSquare?.easting === e && selectedGridSquare?.northing === n;
                          const rectX = 50 + eIdx * 75;
                          const rectY = 40 + (2 - nIdx) * 60;
                          return (
                            <g key={`${e}-${n}`} onClick={() => handleGridCellClick(e, n)} className="cursor-pointer">
                              <rect
                                x={rectX + 2}
                                y={rectY + 2}
                                width="71"
                                height="56"
                                fill={isSel ? 'rgba(16, 185, 129, 0.25)' : eIdx % 2 === nIdx % 2 ? 'rgba(254, 240, 138, 0.08)' : 'rgba(34, 197, 94, 0.08)'}
                                stroke={isSel ? '#10b981' : 'transparent'}
                                strokeWidth="2"
                                className="transition-all hover:opacity-80"
                              />
                              {/* Draw thematic symbols inside cells */}
                              {e === 14 && n === 82 && (
                                <g>
                                  <rect x={rectX + 20} y={rectY + 15} width="12" height="10" fill="#ef4444" />
                                  <text x={rectX + 38} y={rectY + 24} fill="#fca5a5" fontSize="7" fontWeight="bold">Rampur</text>
                                </g>
                              )}
                              {e === 15 && n === 82 && (
                                <g>
                                  <circle cx={rectX + 35} cy={rectY + 25} r="6" fill="#0284c7" />
                                  <text x={rectX + 35} y={rectY + 42} textAnchor="middle" fill="#7dd3fc" fontSize="7" fontWeight="bold">Lined Well</text>
                                </g>
                              )}
                              {e === 16 && n === 81 && (
                                <g>
                                  <path d={`M ${rectX + 10} ${rectY + 10} Q ${rectX + 35} ${rectY + 40} ${rectX + 60} ${rectY + 30}`} stroke="#38bdf8" strokeWidth="3" fill="none" />
                                  <text x={rectX + 35} y={rectY + 20} textAnchor="middle" fill="#38bdf8" fontSize="7" fontWeight="bold">Sipu River</text>
                                </g>
                              )}
                              {e === 15 && n === 80 && (
                                <g>
                                  <circle cx={rectX + 35} cy={rectY + 25} r="14" fill="none" stroke="#b45309" strokeWidth="1.5" />
                                  <circle cx={rectX + 35} cy={rectY + 25} r="7" fill="none" stroke="#b45309" strokeWidth="1.5" />
                                  <text x={rectX + 35} y={rectY + 28} textAnchor="middle" fill="#fde68a" fontSize="7">.240</text>
                                </g>
                              )}
                            </g>
                          );
                        })
                      )}

                      {/* Pinpoint in active square */}
                      {selectedGridSquare && (
                        <circle
                          cx={50 + (selectedGridSquare.easting - 14) * 75 + (subGridX / 10) * 75}
                          cy={40 + (2 - (selectedGridSquare.northing - 80)) * 60 + ((10 - subGridY) / 10) * 60}
                          r="5"
                          fill="#f43f5e"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      )}
                    </svg>
                  </div>

                  {/* Decoder Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-3 bg-slate-900 p-3.5 rounded-lg border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Coordinate Inspector</span>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-center">
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                          <p className="text-[10px] text-slate-400">4-Figure Grid Ref</p>
                          <p className="text-lg font-mono font-black text-emerald-400">{fourFigRef}</p>
                        </div>
                        <div className="bg-slate-800 p-2 rounded border border-slate-700">
                          <p className="text-[10px] text-slate-400">6-Figure Exact Pinpoint</p>
                          <p className="text-lg font-mono font-black text-rose-400">{sixFigRef}</p>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2 text-xs">
                        <div>
                          <label className="text-slate-400">Easting Tenths (0-9): <strong>{subGridX}</strong></label>
                          <input
                            type="range"
                            min={0}
                            max={9}
                            value={subGridX}
                            onChange={e => handleSubGridChange(Number(e.target.value), subGridY)}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="text-slate-400">Northing Tenths (0-9): <strong>{subGridY}</strong></label>
                          <input
                            type="range"
                            min={0}
                            max={9}
                            value={subGridY}
                            onChange={e => handleSubGridChange(subGridX, Number(e.target.value))}
                            className="w-full accent-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-300">
                      <p className="font-bold text-amber-300">Scale Translation (1:50,000):</p>
                      <p>1 Grid Square = 2 cm × 2 cm on paper = <strong>1 km × 1 km (1 sq km)</strong> on Earth.</p>
                      <p>6-Figure pinpoint precision = within <strong>100 metres</strong>.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: CONTOUR & LANDFORM SLICER ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex gap-2">
                      {(['hill', 'valley', 'ridge', 'cliff'] as const).map(type => (
                        <motion.button
                          key={type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setContourProfileType(type);
                            audioManager.play('tap');
                            speechManager.speak(`Landform switched to ${type}`);
                          }}
                          className={`px-3 py-1 text-xs font-bold capitalize rounded-lg border ${
                            contourProfileType === type
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                    <div className="text-xs text-amber-400">
                      Contour Interval: <strong>20 Metres</strong>
                    </div>
                  </div>

                  {/* SVG 2D Map & Cross Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 2D Contour Map View */}
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400 mb-1 font-semibold">2D Topographical Map View (Contours in metres)</p>
                      <svg viewBox="0 0 240 180" className="w-full bg-slate-950 rounded">
                        {contourProfileType === 'hill' && (
                          <g>
                            <circle cx="120" cy="90" r="70" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <circle cx="120" cy="90" r="50" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <circle cx="120" cy="90" r="30" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <circle cx="120" cy="90" r="12" stroke="#b45309" strokeWidth="1.5" fill="#f59e0b" fillOpacity="0.3" />
                            <text x="120" y="25" textAnchor="middle" fill="#fbbf24" fontSize="8">100m</text>
                            <text x="120" y="45" textAnchor="middle" fill="#fbbf24" fontSize="8">140m</text>
                            <text x="120" y="65" textAnchor="middle" fill="#fbbf24" fontSize="8">180m</text>
                            <text x="120" y="93" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="bold">▲ 220</text>
                          </g>
                        )}

                        {contourProfileType === 'valley' && (
                          <g>
                            {/* V-shaped contours pointing upslope */}
                            <path d="M 30,30 L 120,110 L 210,30" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <path d="M 30,60 L 120,130 L 210,60" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <path d="M 30,90 L 120,150 L 210,90" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <line x1="120" y1="20" x2="120" y2="160" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3 3" />
                            <text x="120" y="15" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Stream Flow (Downstream ↓)</text>
                            <text x="120" y="125" textAnchor="middle" fill="#fbbf24" fontSize="8">V points UPSLOPE ↑</text>
                          </g>
                        )}

                        {contourProfileType === 'ridge' && (
                          <g>
                            {/* U-shaped contours pointing downslope */}
                            <path d="M 30,150 Q 120,50 210,150" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <path d="M 50,150 Q 120,75 190,150" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <path d="M 70,150 Q 120,100 170,150" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <text x="120" y="45" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">High Crest (240m)</text>
                            <text x="120" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">U points Downslope ↓</text>
                          </g>
                        )}

                        {contourProfileType === 'cliff' && (
                          <g>
                            {/* Merging contours */}
                            <path d="M 20,40 Q 80,40 120,90" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <path d="M 20,60 Q 80,60 120,90" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <path d="M 20,80 Q 80,80 120,90" stroke="#b45309" strokeWidth="1.5" fill="none" />
                            <line x1="120" y1="40" x2="120" y2="140" stroke="#ef4444" strokeWidth="3" />
                            <text x="140" y="95" fill="#ef4444" fontSize="9" fontWeight="bold">Merged Lines (Cliff)</text>
                          </g>
                        )}

                        {/* Interactive Slicer Line */}
                        <line x1="20" y1="90" x2="220" y2="90" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
                        <text x="25" y="85" fill="#10b981" fontSize="7" fontFamily="monospace">Profile Axis X-Y</text>
                      </svg>
                    </div>

                    {/* Side Elevation Cross-Section */}
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-xs text-slate-400 mb-1 font-semibold">Side Elevation Cross-Section along X-Y</p>
                      <svg viewBox="0 0 240 180" className="w-full bg-slate-950 rounded">
                        {/* Elevation grid */}
                        <line x1="30" y1="150" x2="220" y2="150" stroke="#475569" strokeWidth="1" />
                        <line x1="30" y1="110" x2="220" y2="110" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="30" y1="70" x2="220" y2="70" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                        <line x1="30" y1="30" x2="220" y2="30" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />

                        <text x="20" y="153" fill="#64748b" fontSize="7">100m</text>
                        <text x="20" y="113" fill="#64748b" fontSize="7">140m</text>
                        <text x="20" y="73" fill="#64748b" fontSize="7">180m</text>
                        <text x="20" y="33" fill="#64748b" fontSize="7">220m</text>

                        {/* Mountain Profile Path */}
                        {contourProfileType === 'hill' && (
                          <path d="M 30,150 Q 125,10 220,150" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2.5" />
                        )}
                        {contourProfileType === 'valley' && (
                          <path d="M 30,30 Q 125,160 220,30" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2.5" />
                        )}
                        {contourProfileType === 'ridge' && (
                          <path d="M 30,110 L 100,50 L 150,50 L 220,110" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2.5" />
                        )}
                        {contourProfileType === 'cliff' && (
                          <path d="M 30,150 L 120,150 L 120,40 L 220,40" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="2.5" />
                        )}

                        {/* Interactive Slicing Plane */}
                        <line x1="30" y1={150 - (contourSlicerElevation - 100)} x2="220" y2={150 - (contourSlicerElevation - 100)} stroke="#10b981" strokeWidth="2" />
                        <circle cx="125" cy={150 - (contourSlicerElevation - 100)} r="4" fill="#10b981" />
                        <text x="135" y={145 - (contourSlicerElevation - 100)} fill="#a7f3d0" fontSize="8" fontWeight="bold">
                          Plane: {contourSlicerElevation} m
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Slicer Slider */}
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 flex items-center gap-4">
                    <label className="text-xs text-slate-300 font-semibold whitespace-nowrap">
                      Horizontal Slicing Height: <strong className="text-emerald-400">{contourSlicerElevation} m</strong>
                    </label>
                    <input
                      type="range"
                      min={100}
                      max={220}
                      step={20}
                      value={contourSlicerElevation}
                      onChange={e => handleContourElevationChange(Number(e.target.value))}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>
              )}

              {/* ── LAB 3: INDIA INTERACTIVE ATLAS & RELIEF LAYERS ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {(['physical', 'rivers', 'climate', 'minerals'] as const).map(layer => (
                      <motion.button
                        key={layer}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedMapLayer(layer);
                          audioManager.play('tap');
                          speechManager.speak(`Displaying ${layer} map layer of India.`);
                        }}
                        className={`px-3 py-1.5 text-xs font-bold capitalize rounded-xl border ${
                          selectedMapLayer === layer
                            ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                            : 'bg-slate-900 text-slate-300 border-slate-700'
                        }`}
                      >
                        {layer} Layer
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* SVG India Map Visualisation */}
                    <div className="md:col-span-8 bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 320 360" className="w-full max-h-[320px] bg-slate-950 rounded-lg select-none">
                        {/* India Simplified Outline */}
                        <path
                          d="M 120,40 L 170,40 L 190,80 L 260,95 L 290,120 L 250,140 L 240,170 L 190,260 L 160,330 L 120,240 L 80,170 L 60,140 L 80,90 Z"
                          fill="#1e293b"
                          stroke="#475569"
                          strokeWidth="2"
                        />

                        {/* Tropic of Cancer (23°30'N) */}
                        <line x1="50" y1="165" x2="270" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3" />
                        <text x="275" y="168" fill="#ef4444" fontSize="7" fontWeight="bold">23°30'N (Tropic of Cancer)</text>

                        {/* Standard Meridian 82°30'E */}
                        <line x1="185" y1="30" x2="185" y2="330" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                        <text x="188" y="340" fill="#3b82f6" fontSize="7" fontWeight="bold">82°30'E (IST)</text>

                        {/* Dynamic Layer Renders */}
                        {selectedMapLayer === 'physical' && (
                          <g>
                            {/* Himalayas (Himadri/Himachal/Shiwalik) */}
                            <path d="M 110,48 Q 180,60 250,90" stroke="#f59e0b" strokeWidth="6" fill="none" opacity="0.8" />
                            <text x="180" y="55" fill="#fef08a" fontSize="8" fontWeight="bold">Himalayas</text>

                            {/* Western Ghats */}
                            <path d="M 90,170 Q 110,240 150,310" stroke="#10b981" strokeWidth="5" fill="none" />
                            <text x="75" y="240" fill="#a7f3d0" fontSize="7" fontWeight="bold">Western Ghats</text>

                            {/* Eastern Ghats */}
                            <path d="M 230,180 Q 210,240 170,290" stroke="#10b981" strokeWidth="4" strokeDasharray="6 3" fill="none" />
                            <text x="215" y="240" fill="#a7f3d0" fontSize="7" fontWeight="bold">Eastern Ghats</text>

                            {/* Deccan Plateau */}
                            <polygon points="120,180 200,180 160,280" fill="rgba(245, 158, 11, 0.15)" stroke="#d97706" strokeWidth="1" />
                            <text x="160" y="225" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">Deccan Plateau</text>
                          </g>
                        )}

                        {selectedMapLayer === 'rivers' && (
                          <g>
                            {/* Ganga & Yamuna */}
                            <path d="M 130,70 Q 170,100 240,140" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                            <text x="200" y="115" fill="#bae6fd" fontSize="7" fontWeight="bold">Ganga River</text>

                            {/* Narmada & Tapi (West-flowing) */}
                            <line x1="160" y1="180" x2="90" y2="180" stroke="#f43f5e" strokeWidth="2.5" />
                            <text x="110" y="175" fill="#fda4af" fontSize="7" fontWeight="bold">Narmada (Rift) ←</text>

                            {/* Godavari & Krishna (East-flowing) */}
                            <path d="M 120,210 Q 180,220 220,230" stroke="#0284c7" strokeWidth="2" fill="none" />
                            <text x="170" y="215" fill="#7dd3fc" fontSize="7" fontWeight="bold">Godavari →</text>
                            <path d="M 130,240 Q 170,250 200,265" stroke="#0284c7" strokeWidth="2" fill="none" />
                            <text x="170" y="250" fill="#7dd3fc" fontSize="7" fontWeight="bold">Krishna →</text>
                          </g>
                        )}

                        {selectedMapLayer === 'climate' && (
                          <g>
                            {/* Southwest Monsoon Arabian Sea Branch */}
                            <path d="M 50,300 L 95,250" stroke="#06b6d4" strokeWidth="3" />
                            <path d="M 70,330 L 120,280" stroke="#06b6d4" strokeWidth="3" />
                            <text x="50" y="260" fill="#67e8f9" fontSize="8" fontWeight="bold">Arabian Sea Branch ↗</text>

                            {/* Bay of Bengal Branch */}
                            <path d="M 270,300 L 220,200" stroke="#06b6d4" strokeWidth="3" />
                            <text x="220" y="210" fill="#67e8f9" fontSize="8" fontWeight="bold">Bay of Bengal Branch ↖</text>

                            {/* Heavy Rain Zone: Mawsynram */}
                            <circle cx="255" cy="115" r="8" fill="#3b82f6" fillOpacity="0.7" />
                            <text x="255" y="105" textAnchor="middle" fill="#93c5fd" fontSize="7" fontWeight="bold">Mawsynram (&gt;1100cm)</text>
                          </g>
                        )}

                        {selectedMapLayer === 'minerals' && (
                          <g>
                            {/* Iron Ore / Manganese Belt: Odisha/Jharkhand */}
                            <circle cx="215" cy="180" r="10" fill="#ef4444" fillOpacity="0.7" />
                            <text x="215" y="165" textAnchor="middle" fill="#fca5a5" fontSize="7" fontWeight="bold">Iron &amp; Mn (Odisha)</text>

                            {/* Copper: Khetri (Rajasthan) */}
                            <circle cx="100" cy="130" r="8" fill="#f97316" fillOpacity="0.8" />
                            <text x="100" y="120" textAnchor="middle" fill="#fdba74" fontSize="7" fontWeight="bold">Khetri Copper</text>

                            {/* Bauxite: Gujarat / Odisha */}
                            <circle cx="75" cy="170" r="7" fill="#eab308" />
                            <text x="75" y="160" textAnchor="middle" fill="#fef08a" fontSize="7" fontWeight="bold">Bauxite (Kutch)</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Explanatory Sidebar */}
                    <div className="md:col-span-4 bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <span className="font-bold text-emerald-400 uppercase tracking-wider">Spatial Analysis</span>
                      {selectedMapLayer === 'physical' && (
                        <p className="text-slate-300 leading-relaxed">
                          India spans <strong>8°4&apos;N to 37°6&apos;N</strong> latitude and <strong>68°7&apos;E to 97°25&apos;E</strong> longitude. The Himalayas in the north act as a climatic barrier, while the ancient Peninsular Plateau sits bordered by the Western and Eastern Ghats.
                        </p>
                      )}
                      {selectedMapLayer === 'rivers' && (
                        <p className="text-slate-300 leading-relaxed">
                          The <strong>Narmada and Tapi</strong> flow westward into the Arabian Sea through fault-bounded rift valleys. In contrast, peninsular tilt directs the <strong>Godavari, Krishna, and Kaveri</strong> east into the Bay of Bengal forming vast deltas.
                        </p>
                      )}
                      {selectedMapLayer === 'climate' && (
                        <p className="text-slate-300 leading-relaxed">
                          The Southwest Monsoon splits into two branches. The <strong>Arabian Sea branch</strong> creates torrential orographic rain along the Western Ghats windward slope, while the <strong>Bay of Bengal branch</strong> funnels up the Ganga valley.
                        </p>
                      )}
                      {selectedMapLayer === 'minerals' && (
                        <p className="text-slate-300 leading-relaxed">
                          <strong>Odisha</strong> is India&apos;s leading producer of Hematite iron ore and Manganese. <strong>Khetri</strong> (Rajasthan) is famous for copper, while <strong>Bauxite</strong> (aluminium ore) is mined heavily in Odisha and Gujarat.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: MONSOON CLIMATE & RECHARTS GRAPH ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex gap-2">
                      {(['mumbai', 'delhi', 'mawsynram'] as const).map(city => (
                        <motion.button
                          key={city}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setClimateCity(city);
                            audioManager.play('tap');
                            speechManager.speak(`Displaying climate data for ${city}.`);
                          }}
                          className={`px-3 py-1 text-xs font-bold capitalize rounded-lg border ${
                            climateCity === city
                              ? 'bg-emerald-600 text-white border-emerald-400'
                              : 'bg-slate-800 text-slate-300 border-slate-700'
                          }`}
                        >
                          {city}
                        </motion.button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">
                      Factor: <strong className="text-emerald-400">
                        {climateCity === 'mumbai' ? 'Maritime Equable Climate' : climateCity === 'delhi' ? 'Extreme Continentality' : 'Orographic Heavy Rain'}
                      </strong>
                    </span>
                  </div>

                  {/* Recharts Bar / Line Chart */}
                  <div className="h-56 w-full bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={CLIMATE_STATION_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                        />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                        {climateCity === 'mumbai' && (
                          <>
                            <Bar dataKey="mumbaiRain" fill="#38bdf8" name="Rainfall (mm)" />
                            <Line type="monotone" dataKey="mumbaiTemp" stroke="#f59e0b" strokeWidth={2} name="Temp (°C)" />
                          </>
                        )}
                        {climateCity === 'delhi' && (
                          <>
                            <Bar dataKey="delhiRain" fill="#38bdf8" name="Rainfall (mm)" />
                            <Line type="monotone" dataKey="delhiTemp" stroke="#ef4444" strokeWidth={2} name="Temp (°C)" />
                          </>
                        )}
                        {climateCity === 'mawsynram' && (
                          <Bar dataKey="mawsynramRain" fill="#0284c7" name="Rainfall (mm)" />
                        )}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
                    {climateCity === 'mumbai' && '🌊 Mumbai (Coastal): Narrow temperature range (~24°C–31°C) due to moderating Arabian Sea breezes. Heavy monsoon rains in June–August.'}
                    {climateCity === 'delhi' && '🔥 Delhi (Interior): Continentality causes scorching summers (34°C+ average) and cold winters (14°C). Receives summer monsoon plus winter western disturbances.'}
                    {climateCity === 'mawsynram' && '🌧️ Mawsynram (Meghalaya): The wettest place on Earth, where funnelled Bay of Bengal monsoon winds hit Khasi hills, causing >1,100 cm annual rain.'}
                  </div>
                </div>
              )}

              {/* ── LAB 5: RESOURCE MATRIX & WATER EFFICIENCY ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Drip vs Flood Irrigation Visualizer */}
                    <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Water Management &amp; Drip Technology</span>
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span>Drip Irrigation Efficiency: <strong>{dripEfficiencyPercent}%</strong></span>
                        <span className="text-gold-400">Water Saved: ~<strong>{(dripEfficiencyPercent * 0.7).toFixed(0)}%</strong></span>
                      </div>
                      <input
                        type="range"
                        min={30}
                        max={95}
                        value={dripEfficiencyPercent}
                        onChange={e => setDripEfficiencyPercent(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                      <div className="h-16 bg-slate-950 rounded border border-slate-800 flex items-center justify-around px-4">
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400">Flood Irrigation</p>
                          <p className="text-xs font-bold text-rose-400">70% Evaporation Loss</p>
                        </div>
                        <div className="h-8 w-px bg-slate-700" />
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400">Micro-Drip Tube</p>
                          <p className="text-xs font-bold text-emerald-400">Direct Root Feed (90%+ uptake)</p>
                        </div>
                      </div>
                    </div>

                    {/* Soil & Leaching Selector */}
                    <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Soil Profile &amp; Formation</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {(['black', 'alluvial', 'laterite', 'red'] as const).map(soil => (
                          <button
                            key={soil}
                            onClick={() => {
                              setSelectedSoilType(soil);
                              audioManager.play('tap');
                            }}
                            className={`px-2.5 py-1 text-xs font-bold uppercase rounded border ${
                              selectedSoilType === soil ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {soil}
                          </button>
                        ))}
                      </div>
                      <div className="p-2 bg-slate-950 rounded text-xs text-slate-300 border border-slate-800">
                        {selectedSoilType === 'black' && '⚫ Black Soil (Regur): Volcanic basalt origin. High clay, moisture retentive, cracks in summer, ideal for Cotton.'}
                        {selectedSoilType === 'alluvial' && '🌾 Alluvial Soil: River deposits in Indo-Gangetic plains. Extremely fertile, rich in potash and lime, poor in nitrogen.'}
                        {selectedSoilType === 'laterite' && '🧱 Laterite Soil: Formed by heavy leaching under intense rain in Western Ghats. Acidic, nutrient-poor, supports Tea/Coffee with fertilisers.'}
                        {selectedSoilType === 'red' && '🔴 Red Soil: Weathered crystalline igneous rocks. Porous, rich in iron, moderately fertile, supports millets and pulses.'}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab Step"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 disabled:opacity-40"
            >
              ← Prev Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-semibold">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                aria-label="Next Lab Step"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Free Sandbox"
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Enter Sandbox Freeplay →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Pressure-free exploration) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
          <div className="p-4 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-emerald-300">Freeplay Sandbox &amp; Distance Calculator</h3>
              <p className="text-xs text-slate-400 mt-0.5">Test map distance conversion, contour profiles, and coordinate pinpointing without grading.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Exam Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg text-sm"
            >
              I Am Ready for Challenges! 🚀
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            {/* River Length Thread Converter Tool */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Curved River Distance Calculator (RF 1:50,000)</span>
              <p className="text-xs text-slate-300">Adjust the thread length laid along winding river meanders:</p>
              <div className="flex items-center justify-between text-xs">
                <span>Thread on map: <strong className="text-gold-400">{riverThreadLengthCm} cm</strong></span>
                <span>True ground distance: <strong className="text-emerald-400">{calculatedGroundKm} km</strong></span>
              </div>
              <input
                type="range"
                min={2}
                max={30}
                step={0.2}
                value={riverThreadLengthCm}
                onChange={e => setRiverThreadLengthCm(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-[11px] text-slate-400">
                Formula: <code>Ground Distance (km) = Map Distance (cm) × 0.5</code>
              </div>
            </div>

            {/* Quick Predict-Then-Check Sandbox Hook */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict &amp; Verify Lab Check</span>
              <p className="text-xs text-slate-200 font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
              {!predictionMade ? (
                <div className="space-y-1.5">
                  {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handlePrediction(i)}
                      className="w-full text-left p-2 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 bg-emerald-950/50 rounded border border-emerald-700 text-xs text-emerald-300">
                  ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive 22+ Challenges) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Challenge Canvas Mini-HUD */}
          <canvas ref={canvasRef} width={400} height={20} className="w-full rounded-full bg-slate-950/60 mb-1" />

          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-slate-400">Question <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}</span>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>{challenge.competencyLevel === 'analysis' || challenge.competencyLevel === 'evaluation' ? '🧠' : '📍'}</span>
                Competency: <span className="text-emerald-400 capitalize">{challenge.competencyLevel}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 uppercase">
                {challenge.difficulty}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Question Text */}
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700">
            <p className="text-sm sm:text-base font-semibold text-slate-100 leading-relaxed mb-4">{challenge.question}</p>

            {/* MCQ Type Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all border ${
                      wrongFlash ? 'bg-rose-900/60 border-rose-500 text-rose-200' :
                      showExplanation && i === challenge.correctIndex ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200' :
                      'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-md"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => {
                    const isDropped = Boolean(droppedLabels[item.targetId]);
                    return (
                      <div
                        key={i}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className={`p-3.5 rounded-xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center min-h-[70px] ${
                          isDropped ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-slate-900 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-[11px] font-semibold text-slate-400 uppercase">{item.targetId.replace('_', ' ')}:</span>
                        <strong className="text-xs text-white mt-1">{droppedLabels[item.targetId] || 'Drop Label Here 📥'}</strong>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Matched Labels ✓
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
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
                      className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span><strong className="text-emerald-400 mr-2">{displayIdx + 1}.</strong> {item}</span>
                      <span className="text-slate-500">⠿</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Confirm Sorted Sequence ✓
                </motion.button>
              </div>
            )}

            {/* Numeric Type Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 outline-none w-48"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs text-slate-200 rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-emerald-800 text-emerald-100 text-xs rounded-lg flex items-center gap-2 border border-emerald-600"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-300 font-bold hover:text-white"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click strategy components above to assemble your plan...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Constructed Plan ✓
                </motion.button>
              </div>
            )}
          </div>

          {/* Progressive Step-by-Step Explanation Disclosure */}
          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-emerald-950/50 border border-emerald-700/60 rounded-2xl space-y-3">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Cartographic Solution Walkthrough:</span>
              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-emerald-200 leading-relaxed"
                    >
                      <strong className="text-emerald-400 mr-1.5">{i + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps(s => s + 1)}
                  className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"
                >
                  Show Next Step →
                </motion.button>
              )}

              {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextChallenge}
                  className="block w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg mt-2"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Expedition & Review 🎓' : 'Advance to Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 to-slate-900 rounded-3xl border border-emerald-700 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Survey of India Topographical Certification Completed!</h2>
            <p className="text-sm text-slate-300">
              Expedition Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong> • Total Errors: <strong className="text-rose-400">{errors}</strong>
            </p>
          </div>

          {/* Motivational Personalized Feedback */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed">
            {errors === 0 ? '🌟 PERFECT SCORE! You possess master-level precision in reading Eastings, Northings, contour profiles, and India\'s regional geography.' :
             errors <= 3 ? '👏 Stellar performance! You have a solid grasp of toposheet interpretation and ICSE resource geography.' :
             '🌱 Solid effort! Review the misconception diagnostics below and revisit the interactive contour & climate labs to reach 100% mastery.'}
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950/50 rounded-2xl border border-emerald-700/60 space-y-4">
            <div className="flex items-center gap-2 border-b border-emerald-800/60 pb-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-sm sm:text-base font-bold text-emerald-300">Cartographic Expedition Reflection</h3>
            </div>
            <p className="text-xs text-slate-300">Take a moment to solidify your understanding with these reflection prompts:</p>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How V-shaped contour lines point upstream rather than downstream in valleys..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Eastings are like hallway numbers and Northings are stairs—always go along the corridor first!"
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-amber-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={e => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Trekking in the Himalayas, disaster relief mapping, civil engineering, and understanding weather forecasts..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setReflectionSaved(true);
                    audioManager.play('success');
                    speechManager.speak('Your cartographic reflection has been recorded.');
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  {reflectionSaved ? '✓ Reflection Recorded!' : 'Save Reflection 💾'}
                </motion.button>
                {reflectionSaved && (
                  <span className="text-xs text-emerald-400 font-medium">Great insights saved to your learning log.</span>
                )}
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Targeted Misconception Diagnostics</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/60 text-xs">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 mt-1">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Schedule */}
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-400 uppercase tracking-wider">Spaced Repetition Review (SM-2)</span>
              <p className="text-slate-300 mt-0.5">
                Recommended Memory Refresh: in <strong className="text-emerald-400">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '24 Hours'}</strong>
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950/40 rounded-2xl border border-emerald-800/50 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-1.5 text-xs text-slate-400 pl-4 list-decimal">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── CONDITIONAL FEEDBACK COMPONENTS (Sim Engine) ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_GeographyTopographicalMapsInterpretationSim;