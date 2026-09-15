'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDENTIFIERS
// ==========================================
const NODE_IDS = {
  HEMISPHERIC_POSITION: 'c9_geo_cbse_001',
  TROPIC_OF_CANCER: 'c9_geo_cbse_002',
  ISLAND_TERRITORIES: 'c9_geo_cbse_003',
  TOTAL_AREA_RANKING: 'c9_geo_cbse_004',
  BOUNDARIES_COASTLINE: 'c9_geo_cbse_005',
  STANDARD_MERIDIAN: 'c9_geo_cbse_006',
  DAY_NIGHT_LATITUDE: 'c9_geo_cbse_007',
  MARITIME_SETTING: 'c9_geo_cbse_008',
  STRATEGIC_LOCATION: 'c9_geo_cbse_009',
  LAND_NEIGHBOURS: 'c9_geo_cbse_010',
  MARITIME_NEIGHBOURS: 'c9_geo_cbse_011',
  ANCIENT_ROUTES: 'c9_geo_cbse_012',
  POLITICAL_DIVISIONS: 'c9_geo_cbse_013',
  MAP_READING: 'c9_geo_cbse_014',
  PROJECT_SILK_ROUTE: 'c9_geo_cbse_015',
  INDIRA_POINT: 'c9_geo_cbse_016',
  LAT_LONG_EXTENT: 'c9_geo_cbse_017',
} as const;

const ALL_NODE_IDS = Object.values(NODE_IDS);

// ==========================================
// MANDATORY SECTIONS DATA
// ==========================================

const SCENARIO = {
  title: "National Cartographic & Geographic Survey Lab",
  intro: "Welcome to the Indian Institute of Cartography & Geospatial Analytics. As Chief Geospatial Officer, you are assigned to analyze India's spatial dimensions, celestial solar relationships, international land and maritime borders, standard time determination, and historic maritime/trade routes.",
  context: "You will manipulate dynamic cartographic projections, simulate solar angle variation across latitudes, calculate time delays along longitudinal spans, analyze land/coastline boundaries, and solve critical geographical challenges that define India's global and regional identity.",
};

const DISCOVERY_QUESTION = {
  question: "Why does Arunachal Pradesh experience sunrise nearly 2 hours earlier than Gujarat, even though both states follow the exact same official clock time on their watches?",
  options: [
    "Because Arunachal Pradesh is closer to the Equator than Gujarat.",
    "Because India spans nearly 30° of longitude, and Earth rotates 15° per hour (30° ÷ 15°/hr = 2 hours difference).",
    "Because Gujarat lies in the Southern Hemisphere while Arunachal Pradesh lies in the Northern Hemisphere.",
    "Because the Standard Meridian of India passes through Arunachal Pradesh and bypasses Gujarat."
  ],
  correctIndex: 1,
  hintAfter: "Earth takes 24 hours to complete a 360° rotation (1° every 4 minutes). With a longitudinal span of ~30° between Kibithu (Arunachal) and Guhar Moti (Gujarat), true local solar time differs by 30 × 4 = 120 minutes (2 hours). Both use 82°30' E to maintain a single national clock!",
};

const DEFAULT_PROPS = {
  initialNodeId: NODE_IDS.HEMISPHERIC_POSITION,
};

const EXPLORATION_STEPS = [
  {
    title: "Lab 1: Latitudinal & Longitudinal Extent Map",
    instruction: "Drag the map crosshairs to inspect India's cardinal extremities (Kibithu 97°25'E, Guhar Moti 68°7'E, Indira Col 37°6'N, Kanyakumari 8°4'N, Indira Point 6°45'N). Observe how latitudinal and longitudinal distances in kilometers (~3,214 km N-S vs ~2,933 km E-W) compare despite similar angular spans (~30°).",
    interactionType: "coordinate_picker",
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
  },
  {
    title: "Lab 2: Standard Meridian & Global Time Calculator",
    instruction: "Slide the longitude marker from 68°7' E to 97°25' E across India. Compare Local Solar Time against Indian Standard Time (82°30' E at Mirzapur/Prayagraj) and Greenwich Mean Time (0° UTC). Observe why 82°30' E was chosen as the standard meridian.",
    interactionType: "longitude_slider",
    nodeId: NODE_IDS.STANDARD_MERIDIAN,
  },
  {
    title: "Lab 3: Tropic of Cancer & Day-Night Latitudinal Simulator",
    instruction: "Change the day of the year (Solstices/Equinoxes) and move from South India (Kanyakumari 8°4'N) to North India (Kashmir 37°6'N). Observe variations in sun altitude, shadow length, and daylight duration difference between day and night.",
    interactionType: "sun_latitude_simulator",
    nodeId: NODE_IDS.DAY_NIGHT_LATITUDE,
  },
  {
    title: "Lab 4: Borders, Coastline & Island Territory Boundary Analysis",
    instruction: "Toggle land borders (15,200 km) vs total coastline (7,516.6 km including Andaman & Nicobar and Lakshadweep). Click on neighbouring states and maritime boundary lines to measure spatial extents and island archipelago distances.",
    interactionType: "border_boundary_explorer",
    nodeId: NODE_IDS.BOUNDARIES_COASTLINE,
  },
  {
    title: "Lab 5: Ancient Maritime Routes & Silk Road Geopolitics",
    instruction: "Select historic trade routes (Spice Route, Overland Silk Route, Indian Ocean Maritime Rim). Trace the historical diffusion of Indian ideas (Upanishads, Panchatantra, Decimal System) and incoming architectural influences (Greek sculpture, West Asian domes).",
    interactionType: "route_geopolitics_visualizer",
    nodeId: NODE_IDS.ANCIENT_ROUTES,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: "Predict: If India had NOT selected 82°30' E as its Standard Meridian and instead allowed each city to use local solar time, what time would a train timetable in Mumbai show when it is 12:00 PM solar noon in Dibrugarh (Assam)?",
    options: [
      "12:00 PM (Exactly the same)",
      "Approximately 10:15 AM (nearly 1 hr 45 min earlier)",
      "Approximately 1:45 PM (nearly 1 hr 45 min later)",
      "6:00 AM (Sunrise time)"
    ],
    correctIndex: 1,
    verifyInstruction: "Use Lab 2 to compare Local Solar Time between Dibrugarh (94.9° E) and Mumbai (72.8° E). Notice the ~22° longitude difference multiplied by 4 minutes/degree.",
    nodeId: NODE_IDS.STANDARD_MERIDIAN,
  },
  {
    question: "Predict: Why does the duration of day and night remain almost equal (difference of barely 45 minutes) in Kanyakumari, while in northern Jammu & Kashmir the difference between day and night can be as large as 4 to 5 hours in December or June?",
    options: [
      "Because Kanyakumari is surrounded by three ocean bodies which absorb sunlight.",
      "Because Kanyakumari lies close to the Equator where sun rays are nearly vertical year-round, whereas high latitude areas experience extreme solar angle shifts during solstice tilted away/towards the Sun.",
      "Because the Tropic of Cancer passes directly over Kanyakumari.",
      "Because of the gravitational pull of the Bay of Bengal and Arabian Sea."
    ],
    correctIndex: 1,
    verifyInstruction: "Use Lab 3 to slide latitude from 8° N to 37° N on June 21 and December 21. Observe how solar zenith angle shifts dramatically at high latitudes.",
    nodeId: NODE_IDS.DAY_NIGHT_LATITUDE,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: "What do you notice about the linear distance in kilometers between North-South extent (~3,214 km) and East-West extent (~2,933 km) despite both covering approximately 30 degrees of latitudinal/longitudinal arc?",
    observableOptions: [
      "East-West distance is shorter because meridians of longitude converge towards the poles, reducing distance per degree of longitude at higher latitudes.",
      "North-South distance is shorter because Parallels of latitude converge at the Equator.",
      "Both distances are physically identical in kilometers; the map scale is distorted.",
      "The East-West extent is larger because Earth is an oblate spheroid stretched horizontally at the tropics."
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
  },
  {
    question: "What happens to the Tropic of Cancer (23°30' N) as it passes through India?",
    observableOptions: [
      "It divides the country into almost two equal halves, passing through 8 Indian states (Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram).",
      "It forms the southern maritime boundary near Lakshadweep Islands.",
      "It passes through 5 states and marks the exact location of the Standard Meridian.",
      "It runs north of the Himalayas through Ladakh and Jammu & Kashmir."
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.TROPIC_OF_CANCER,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: "Indian Ocean Strategic Maritime Transit & Time Zone Operations Project",
  description: "As Chief Logistics Coordinator for a international cargo vessel sailing from Tokyo to Mumbai via the Malacca Strait, you must calculate time adjustments, navigation coordinates, and territorial waters compliance.",
  steps: [
    "Identify the entry coordinate at the Strait of Malacca (~6° N, 95° E) near Indira Point (6°45' N, Great Nicobar Island).",
    "Calculate local time shift: Vessels adjust clocks from UTC+9 (Japan) to UTC+5.5 (Indian Standard Time) across 3.5 time zones.",
    "Verify territorial sea boundary (12 nautical miles) and Exclusive Economic Zone (200 nautical miles) along India's 7,516.6 km coastline.",
    "Evaluate why India's central position at the head of the Indian Ocean provides a strategic hub connecting West Asia, Africa, Europe with East Asia and Australasia."
  ],
};

const MISCONCEPTIONS = [
  {
    id: "misc_01",
    title: "Latitudinal vs Longitudinal Distance Equivalence",
    misconception: "Students often assume 1° of latitude and 1° of longitude represent equal ground distance everywhere on Earth.",
    correction: "1° of latitude is approximately 111 km everywhere. However, 1° of longitude is ~111 km at the Equator but shrinks to 0 km at the poles because meridians converge. In India (~20°N average latitude), 1° longitude is roughly 100 km, explaining why ~30° E-W span yields ~2,933 km while ~30° N-S span yields ~3,214 km.",
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
  },
  {
    id: "misc_02",
    title: "Location of Indira Point",
    misconception: "Believing Kanyakumari is the absolute southernmost point of the Republic of India.",
    correction: "Kanyakumari (8°4' N) is the southernmost point of the Indian MAINLAND. The southernmost point of the ENTIRE Indian Republic is Indira Point (6°45' N) located in Great Nicobar Island (submerged partially in the 2004 Tsunami).",
    nodeId: NODE_IDS.INDIRA_POINT,
  },
  {
    id: "misc_03",
    title: "Standard Meridian Alignment",
    misconception: "Thinking Indian Standard Time (IST) is based on the longitude of New Delhi.",
    correction: "IST is based on 82°30' E longitude, which passes through Mirzapur near Prayagraj (Allahabad) in Uttar Pradesh. It was selected because it is a multiple of 7°30' (half an hour time step) and centrally bisects India's longitudinal width (68°7' E to 97°25' E).",
    nodeId: NODE_IDS.STANDARD_MERIDIAN,
  },
  {
    id: "misc_04",
    title: "Tropic of Cancer State Count",
    misconception: "Assuming the Tropic of Cancer passes through 7 states or misses Rajasthan/Tripura.",
    correction: "The Tropic of Cancer (23°30' N) cuts across exactly 8 Indian States: Gujarat, Rajasthan (southern tip), Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.",
    nodeId: NODE_IDS.TROPIC_OF_CANCER,
  },
  {
    id: "misc_05",
    title: "Island Group Ocean Placement",
    misconception: "Confusing the location of Andaman & Nicobar vs Lakshadweep Islands.",
    correction: "Andaman & Nicobar Islands lie in the Bay of Bengal (southeast of mainland, volcanic origin). Lakshadweep Islands lie in the Arabian Sea (southwest of mainland, coral origin/atolls).",
    nodeId: NODE_IDS.ISLAND_TERRITORIES,
  },
  {
    id: "misc_06",
    title: "Land Boundary vs Coastline Length",
    misconception: "Believing India's coastline is longer than its terrestrial land boundary.",
    correction: "India's terrestrial land boundary is over twice as long (~15,200 km) as its total coastline (~7,516.6 km including island territories). Coastline of mainland alone is 6,100 km.",
    nodeId: NODE_IDS.BOUNDARIES_COASTLINE,
  },
];

// ==========================================
// INTERACTIVE CHALLENGES DATA (22 CHALLENGES)
// ==========================================

export interface ChallengeData {
  id: string;
  nodeId: string;
  type: 'mcq' | 'coordinate' | 'calculation' | 'drag_sort' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  matchPairs?: Array<{ key: string; value: string }>;
  sortItems?: string[];
  sortCorrectOrder?: string[];
}

const CHALLENGES: ChallengeData[] = [
  // --- FOUNDATION LEVEL (7 Challenges) ---
  {
    id: 'ch_01',
    nodeId: NODE_IDS.HEMISPHERIC_POSITION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "In which global hemispheres is the entire mainland of India located?",
    options: [
      "Northern and Eastern Hemispheres",
      "Southern and Eastern Hemispheres",
      "Northern and Western Hemispheres",
      "Southern and Western Hemispheres"
    ],
    correctIndex: 0,
    explanation: "India lies entirely in the Northern Hemisphere (latitudes 8°4'N to 37°6'N) and in the Eastern Hemisphere (longitudes 68°7'E to 97°25'E).",
    hints: [
      "Check whether India is North or South of the Equator (0° latitude).",
      "Check whether India is East or West of the Prime Meridian (0° longitude).",
      "India lies north of 0°N and east of 0°E."
    ]
  },
  {
    id: 'ch_02',
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What are the precise latitudinal boundaries of mainland India from South to North?",
    options: [
      "6°45' N to 35°6' N",
      "8°4' N to 37°6' N",
      "8°4' S to 37°6' N",
      "68°7' N to 97°25' N"
    ],
    correctIndex: 1,
    explanation: "Mainland India extends between 8°4' N (Kanyakumari) in the south to 37°6' N (Indira Col, Ladakh) in the north.",
    hints: [
      "Mainland starts just above 8 degrees North.",
      "The northern extent reaches past 37 degrees North in the Himalayas.",
      "Look for 8°4' N and 37°6' N."
    ]
  },
  {
    id: 'ch_03',
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What are the longitudinal extents of India from West to East?",
    options: [
      "68°7' E to 97°25' E",
      "82°30' E to 100°0' E",
      "50°5' E to 85°2' E",
      "68°7' W to 97°25' W"
    ],
    correctIndex: 0,
    explanation: "India lies between longitudes 68°7' E (Guhar Moti, Gujarat) in the west and 97°25' E (Kibithu, Arunachal Pradesh) in the east.",
    hints: [
      "Westernmost point in Gujarat is around 68 degrees East.",
      "Easternmost point in Arunachal Pradesh is around 97 degrees East.",
      "The exact values are 68°7' E and 97°25' E."
    ]
  },
  {
    id: 'ch_04',
    nodeId: NODE_IDS.TOTAL_AREA_RANKING,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What is India's total land geographical area and its global rank in terms of area?",
    options: [
      "3.28 million sq km, 7th largest",
      "2.98 million sq km, 5th largest",
      "4.12 million sq km, 10th largest",
      "3.28 million sq km, 2nd largest"
    ],
    correctIndex: 0,
    explanation: "India's total geographical area is 3.28 million square kilometers, which accounts for about 2.4% of the world's total geographical area, making it the 7th largest country.",
    hints: [
      "India's land area is approximately 32.8 lakh sq km.",
      "Countries larger than India include Russia, Canada, USA, China, Brazil, Australia.",
      "India is ranked 7th globally."
    ]
  },
  {
    id: 'ch_05',
    nodeId: NODE_IDS.TROPIC_OF_CANCER,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Which parallel of latitude divides India into almost two equal latitudinal parts?",
    options: [
      "Equator (0°)",
      "Tropic of Cancer (23°30' N)",
      "Tropic of Capricorn (23°30' S)",
      "Arctic Circle (66°30' N)"
    ],
    correctIndex: 1,
    explanation: "The Tropic of Cancer (23°30' N) passes roughly through the middle of India, dividing the country into tropical south and sub-tropical north.",
    hints: [
      "It passes at 23°30' North latitude.",
      "It runs through 8 Indian states.",
      "It is called the Tropic of Cancer."
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_06',
    nodeId: NODE_IDS.ISLAND_TERRITORIES,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Match the island territories with their respective water bodies:",
    options: [
      "Lakshadweep in Arabian Sea; Andaman & Nicobar in Bay of Bengal",
      "Lakshadweep in Bay of Bengal; Andaman & Nicobar in Arabian Sea",
      "Both in Indian Ocean proper south of Sri Lanka",
      "Lakshadweep in Coral Sea; Andaman in Andaman Sea only"
    ],
    correctIndex: 0,
    explanation: "Lakshadweep Islands (coral origin) lie in the Arabian Sea (southwest), while Andaman and Nicobar Islands (volcanic origin) lie in the Bay of Bengal (southeast).",
    hints: [
      "Lakshadweep is near Kerala (west coast).",
      "Andaman & Nicobar is to the east.",
      "Arabian Sea is on the west, Bay of Bengal on the east."
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_07',
    nodeId: NODE_IDS.INDIRA_POINT,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "What is the southernmost point of the Union of India (including islands) and where is it located?",
    options: [
      "Kanyakumari at 8°4' N (Tamil Nadu)",
      "Indira Point at 6°45' N (Great Nicobar Island)",
      "Indira Col at 37°6' N (Ladakh)",
      "Point Calimere at 10°18' N (Tamil Nadu)"
    ],
    correctIndex: 1,
    explanation: "Indira Point at 6°45' N latitude on Great Nicobar Island is the southernmost point of the Republic of India. (It got partially submerged during the 2004 Tsunami).",
    hints: [
      "Kanyakumari is the southernmost point of the MAINLAND.",
      "The absolute southernmost point of the Republic of India is on Great Nicobar Island.",
      "It is named Indira Point (6°45' N)."
    ],
    misconceptionIndex: 1
  },

  // --- STANDARD LEVEL (8 Challenges) ---
  {
    id: 'ch_08',
    nodeId: NODE_IDS.STANDARD_MERIDIAN,
    type: 'calculation',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "If Greenwich Mean Time (GMT, 0° longitude) is 12:00 PM (noon), what is the Indian Standard Time (IST) based on 82°30' E?",
    correctAnswer: "5:30 PM",
    explanation: "Time difference = 82.5° × 4 minutes/degree = 330 minutes = 5 hours 30 minutes. Since India is East of Greenwich, IST is ahead: 12:00 PM + 5h 30m = 5:30 PM.",
    hints: [
      "Multiply 82.5 degrees by 4 minutes per degree.",
      "82.5 x 4 = 330 minutes.",
      "330 minutes = 5 hours and 30 minutes ahead of GMT."
    ]
  },
  {
    id: 'ch_09',
    nodeId: NODE_IDS.STANDARD_MERIDIAN,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "Through which city/location in Uttar Pradesh is the Standard Meridian of India (82°30' E) officially taken to pass?",
    options: [
      "Mirzapur (near Prayagraj / Allahabad)",
      "Varanasi",
      "Lucknow",
      "Kanpur"
    ],
    correctIndex: 0,
    explanation: "The Standard Meridian 82°30' E passes through Mirzapur in Uttar Pradesh (near Prayagraj/Allahabad).",
    hints: [
      "It is located in eastern Uttar Pradesh.",
      "It is famous for carpet manufacturing near Prayagraj.",
      "The city is Mirzapur."
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_10',
    nodeId: NODE_IDS.DAY_NIGHT_LATITUDE,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Why is the difference in day and night duration barely felt at Kanyakumari (~45 min) but very pronounced in Leh/Srinagar (~4 to 5 hrs)?",
    options: [
      "Kanyakumari is close to the Equator where day-night length varies very little, while Leh is at high latitude where sun angle varies drastically with season.",
      "Leh is at higher altitude above sea level, causing solar rays to travel faster.",
      "Kanyakumari has ocean winds that prolong dusk and dawn.",
      "The Standard Meridian passes closer to Kanyakumari than Srinagar."
    ],
    correctIndex: 0,
    explanation: "Near the Equator (0°), solar inclination changes minimally year-round, so day length is ~12 hours. At higher latitudes like Srinagar (34°N), solar declination creates significant day-length shifts between summer and winter solstices.",
    hints: [
      "Equatorial regions receive relatively uniform sun angle throughout the year.",
      "Higher latitudes experience tilted seasonal solar incidence.",
      "Kanyakumari is at 8°4'N (close to Equator), Srinagar is at ~34°N."
    ]
  },
  {
    id: 'ch_11',
    nodeId: NODE_IDS.BOUNDARIES_COASTLINE,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: "What is the total length of India's land boundary and total coastline length (including islands)?",
    options: [
      "Land boundary: ~15,200 km; Coastline: ~7,516.6 km",
      "Land boundary: ~7,516.6 km; Coastline: ~15,200 km",
      "Land boundary: ~12,000 km; Coastline: ~6,100 km",
      "Land boundary: ~20,000 km; Coastline: ~10,000 km"
    ],
    correctIndex: 0,
    explanation: "India has a land boundary of about 15,200 km and a total length of coastline of the mainland including Andaman & Nicobar and Lakshadweep of 7,516.6 km (6,100 km mainland only).",
    hints: [
      "Terrestrial land boundary is more than double the total coastline length.",
      "Land boundary is ~15,200 km.",
      "Total coastline with islands is 7,516.6 km."
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_12',
    nodeId: NODE_IDS.TROPIC_OF_CANCER,
    type: 'matching',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "Identify which of the following states ARE crossed by the Tropic of Cancer (23°30' N):",
    options: [
      "Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram",
      "Punjab, Haryana, UP, Bihar, Sikkim, Assam, Meghalaya, Nagaland",
      "Maharashtra, Goa, Karnataka, Kerala, Tamil Nadu, Andhra Pradesh, Odisha",
      "Gujarat, MP, UP, Bihar, West Bengal, Assam, Manipur, Mizoram"
    ],
    correctIndex: 0,
    explanation: "The 8 states crossed by Tropic of Cancer are Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.",
    hints: [
      "Starts from West (Gujarat, southern tip of Rajasthan).",
      "Passes through MP, Chhattisgarh, Jharkhand, West Bengal.",
      "Passes through two North-Eastern states: Tripura and Mizoram."
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_13',
    nodeId: NODE_IDS.LAND_NEIGHBOURS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: "Which country shares the LONGEST land boundary with India?",
    options: [
      "Bangladesh (~4,096.7 km)",
      "China (~3,488 km)",
      "Pakistan (~3,323 km)",
      "Nepal (~1,751 km)"
    ],
    correctIndex: 0,
    explanation: "India shares its longest international land border with Bangladesh, stretching approximately 4,096.7 km due to its convoluted winding border around East India.",
    hints: [
      "Many students mistakenly think it is China or Pakistan.",
      "Because of the complex perimeter around West Bengal, Assam, Meghalaya, Tripura, Mizoram.",
      "It is Bangladesh!"
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_IDS.MARITIME_NEIGHBOURS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "Which two island nations are India's southern maritime neighbours across the Indian Ocean?",
    options: [
      "Sri Lanka and Maldives",
      "Madagascar and Mauritius",
      "Indonesia and Philippines",
      "Seychelles and Maldives"
    ],
    correctIndex: 0,
    explanation: "Sri Lanka (separated by Palk Strait and Gulf of Mannar) and Maldives (situated south of Lakshadweep Islands) are India's immediate southern island neighbours.",
    hints: [
      "One is separated by Palk Strait.",
      "The other is located south of Lakshadweep archipelago.",
      "They are Sri Lanka and Maldives."
    ]
  },
  {
    id: 'ch_15',
    nodeId: NODE_IDS.STRATEGIC_LOCATION,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "How did the opening of the Suez Canal in 1869 impact India's trade distance with Europe?",
    options: [
      "It reduced maritime distance between India and Europe by about 7,000 km.",
      "It increased distance by forcing ships around the Cape of Good Hope.",
      "It reduced distance by only 500 km.",
      "It had no effect on shipping routes to India."
    ],
    correctIndex: 0,
    explanation: "The opening of Suez Canal in 1869 connected the Mediterranean Sea directly to the Red Sea, bypassing the entire African continent and saving ~7,000 km of voyage between Europe and India.",
    hints: [
      "Ships no longer had to sail all the way around Africa (Cape of Good Hope).",
      "It saved thousands of kilometers.",
      "The exact reduction is approximately 7,000 km."
    ]
  },

  // --- ADVANCED LEVEL (7 Challenges) ---
  {
    id: 'ch_16',
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Why is the East-West extent of India (~2,933 km) physically shorter than the North-South extent (~3,214 km) even though both span roughly 30 degrees of arc?",
    options: [
      "Parallels of latitude are parallel and equal distance apart (~111 km/deg), but meridians of longitude converge towards the poles, making 1° longitude smaller at ~20°N (~100 km).",
      "The North-South line is drawn as a curve while the East-West line is a straight line.",
      "Earth rotates faster at the Equator, compressing East-West distances.",
      "The Mercator projection artificially shrinks the East-West extent of India."
    ],
    correctIndex: 0,
    explanation: "Distance between lines of latitude remains constant (~111 km per degree). But distance between meridians of longitude decreases from ~111 km at Equator to 0 km at the poles. At India's latitude (~20°N average), 1° of longitude is only ~100 km, making 30° longitude = ~2,933 km.",
    hints: [
      "Think about globe lines: Latitude lines are parallel, Longitude lines meet at the poles.",
      "As you move away from the Equator towards the poles, longitude lines get closer together.",
      "Therefore, 1 degree of longitude near 20°N latitude measures less than 111 km."
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_17',
    nodeId: NODE_IDS.ANCIENT_ROUTES,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Which of the following historical cultural contributions moved along ancient land passes across Northern Indian mountains?",
    options: [
      "Spread of Upanishads, Ramayana, Panchatantra tales, Indian decimal system & numerals to West Asia and Europe.",
      "Import of modern steam technology and railway systems.",
      "Introduction of synthetic dyes and petroleum refining process.",
      "Export of tea plantation techniques to ancient China."
    ],
    correctIndex: 0,
    explanation: "Ancient mountain passes provided passage for traders and scholars, facilitating global exchange of Indian philosophy (Upanishads, Ramayana), literature (Panchatantra), and mathematical breakthroughs (decimal system, Indian numerals) to West Asia and beyond.",
    hints: [
      "Think of intellectual and literary contributions of ancient India.",
      "Includes numeral systems, zero, decimal concepts, and classic epics.",
      "These spread to Europe via West Asian trade networks."
    ]
  },
  {
    id: 'ch_18',
    nodeId: NODE_IDS.PROJECT_SILK_ROUTE,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "How did incoming foreign architectural influences reach India through ancient overland routes?",
    options: [
      "Greek sculpture styles (Gandhara art) and West Asian architectural forms (domes and minarets) reached India via northwestern passes.",
      "Gothic cathedrals and baroque facades were built along the Silk Route in 500 BCE.",
      "Pagoda architecture was imported directly from Japan via deep sea voyages.",
      "Roman amphitheaters were replicated in Central India."
    ],
    correctIndex: 0,
    explanation: "Cultural exchange was reciprocal: while Indian ideas travelled west, Greek sculptural styles (Gandhara school of art) and West Asian architectural features (domes, arches, minarets) entered northwestern India via mountain passes.",
    hints: [
      "Look for architectural styles associated with Greco-Roman influence in Gandhara art.",
      "Also look for West Asian Islamic structural forms like domes and minarets.",
      "They came through the mountain passes of the northwest."
    ]
  },
  {
    id: 'ch_19',
    nodeId: NODE_IDS.MARITIME_SETTING,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: "Why is no other country named after an ocean, and why is the Indian Ocean uniquely named after India?",
    options: [
      "India has the longest coastline on the Indian Ocean, and its central eminent position naturally commands ocean trade routes connecting Asia, Africa, and Europe.",
      "By international treaty signed in 1947 granting exclusive ownership of the sea bed.",
      "Because India was the only country with a navy prior to the 19th century.",
      "Because the Indian Ocean is completely landlocked by Indian territory."
    ],
    correctIndex: 0,
    explanation: "No other country has such a long coastline on the Indian Ocean as India has, and it is India's eminent central position at the head of the Indian Ocean which justifies the naming of an ocean after it.",
    hints: [
      "Consider India's geographic projection into the ocean.",
      "India protrudes southwards, dividing the ocean into Arabian Sea and Bay of Bengal.",
      "It has the longest coastline in this ocean realm."
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_IDS.POLITICAL_DIVISIONS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'recall',
    question: "Following recent administrative reorganizations (including Jammu & Kashmir & Ladakh reorganization, Dadra & Nagar Haveli & Daman & Diu merger), how many States and Union Territories does India currently have?",
    options: [
      "28 States and 8 Union Territories",
      "29 States and 7 Union Territories",
      "28 States and 9 Union Territories",
      "27 States and 8 Union Territories"
    ],
    correctIndex: 0,
    explanation: "India currently comprises 28 States and 8 Union Territories. (J&K split into 2 UTs: J&K and Ladakh; Daman & Diu merged with Dadra & Nagar Haveli).",
    hints: [
      "Telangana was formed in 2014 as 29th state, but J&K became 2 UTs in 2019 reducing states to 28.",
      "Daman & Diu merged with Dadra & Nagar Haveli into a single UT in 2020.",
      "The count is 28 States and 8 Union Territories."
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_IDS.MAP_READING,
    type: 'calculation',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: "Calculate the exact solar time difference between Guhar Moti in Gujarat (68°7' E) and Kibithu in Arunachal Pradesh (97°25' E). (Longitude diff ≈ 29°18' ≈ 29.3°)",
    correctAnswer: "117 minutes",
    explanation: "Longitude difference = 97°25' - 68°7' = 29°18' = 29.3°. Time difference = 29.3 × 4 minutes = 117.2 minutes (~1 hour 57 minutes, or roughly 2 hours).",
    hints: [
      "Subtract 68.117° from 97.417° = ~29.3°.",
      "Multiply 29.3 degrees by 4 minutes.",
      "29.3 x 4 ≈ 117 minutes (approx 1 hr 57 min)."
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_IDS.LAT_LONG_EXTENT,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: "If a traveler starts from Indira Col (37°6' N) and travels due South along the meridian 78° E down to Kanyakumari (8°4' N), what is the approximate latitude span covered and equivalent distance on ground?",
    options: [
      "Latitude span ~29.03°, covering approximately 3,214 km",
      "Latitude span ~45.00°, covering approximately 5,000 km",
      "Latitude span ~15.50°, covering approximately 1,500 km",
      "Latitude span ~30.00°, covering exactly 4,500 km"
    ],
    correctIndex: 0,
    explanation: "Latitude span = 37°6' - 8°4' = 29°2' (29.03°). Since 1° latitude ≈ 111 km, 29.03° × 111 km ≈ 3,222 km (which matches India's N-S mainland extent of ~3,214 km).",
    hints: [
      "37.10 - 8.07 = 29.03 degrees latitude.",
      "Each degree of latitude is roughly 111 km.",
      "29.03 x 111 ≈ 3,214 km."
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Interactive India Map with Lat/Long Grid, Extremities, Tropic of Cancer, Meridian
const IndiaSpatialMapSVG: React.FC<{
  selectedExtremity: string | null;
  onSelectExtremity: (id: string) => void;
  showTropicOfCancer: boolean;
  showMeridian: boolean;
  showGrid: boolean;
}> = ({ selectedExtremity, onSelectExtremity, showTropicOfCancer, showMeridian, showGrid }) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-2 text-xs text-cyan-400 font-mono">
        <span>GEOSPATIAL COORDINATE PROJECTION: INDIA REALM</span>
        <span>LAT: 6°45'N - 37°6'N | LONG: 68°7'E - 97°25'E</span>
      </div>
      <svg viewBox="0 0 800 650" className="w-full h-auto select-none rounded-lg bg-slate-950">
        <defs>
          <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#0c4a6e" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="indiaLand" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect x="0" y="0" width="800" height="650" fill="url(#oceanGrad)" opacity="0.4" />

        {/* Grid lines if enabled */}
        {showGrid && (
          <g stroke="#334155" strokeWidth="0.8" strokeDasharray="3 3">
            {/* Latitude parallels */}
            <line x1="40" y1="80" x2="760" y2="80" /> {/* 37° N */}
            <text x="45" y="75" fill="#64748b" fontSize="10" fontFamily="monospace">37°6' N (Indira Col)</text>

            <line x1="40" y1="210" x2="760" y2="210" /> {/* 28° N */}
            <text x="45" y="205" fill="#64748b" fontSize="10" fontFamily="monospace">28° N (New Delhi)</text>

            <line x1="40" y1="340" x2="760" y2="340" /> {/* 20° N */}
            <text x="45" y="335" fill="#64748b" fontSize="10" fontFamily="monospace">20° N</text>

            <line x1="40" y1="480" x2="760" y2="480" /> {/* 8°4' N */}
            <text x="45" y="475" fill="#64748b" fontSize="10" fontFamily="monospace">8°4' N (Kanyakumari)</text>

            <line x1="40" y1="535" x2="760" y2="535" /> {/* 6°45' N */}
            <text x="45" y="530" fill="#64748b" fontSize="10" fontFamily="monospace">6°45' N (Indira Point)</text>

            {/* Longitude meridians */}
            <line x1="120" y1="40" x2="120" y2="600" /> {/* 68°7' E */}
            <text x="125" y="590" fill="#64748b" fontSize="10" fontFamily="monospace">68°7' E (Guhar Moti)</text>

            <line x1="680" y1="40" x2="680" y2="600" /> {/* 97°25' E */}
            <text x="615" y="590" fill="#64748b" fontSize="10" fontFamily="monospace">97°25' E (Kibithu)</text>
          </g>
        )}

        {/* Stylized India Silhouette Path */}
        <path
          d="M 380,80 
             L 420,95 L 450,110 L 490,125 L 530,135 L 560,170 L 600,185 L 630,220 L 680,240
             L 660,270 L 630,285 L 610,310 L 590,300 L 560,290 L 530,300 L 510,320
             L 530,350 L 520,380 L 480,420 L 440,480 L 410,510 L 400,480 L 370,430
             L 340,380 L 310,340 L 260,320 L 210,300 L 160,290 L 120,270 L 140,240
             L 170,220 L 210,210 L 250,220 L 290,200 L 320,160 L 350,120 Z"
          fill="url(#indiaLand)"
          stroke="#06b6d4"
          strokeWidth="2.5"
          filter="url(#glow)"
        />

        {/* Neighbor Boundaries Visual (dotted line paths) */}
        {/* Pakistan / Afghanistan northwest */}
        <path d="M 380,80 L 320,160 L 290,200 L 250,220 L 210,210 L 170,220 L 140,240 L 120,270" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        {/* China / Nepal / Bhutan north */}
        <path d="M 380,80 L 420,95 L 450,110 L 490,125 L 530,135 L 560,170 L 600,185 L 630,220 L 680,240" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
        {/* Myanmar east */}
        <path d="M 680,240 L 660,270 L 630,285 L 610,310" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

        {/* Island Archipelagos */}
        {/* Lakshadweep (Arabian Sea) */}
        <g transform="translate(260, 480)">
          <circle cx="0" cy="0" r="4" fill="#38bdf8" />
          <circle cx="10" cy="15" r="3" fill="#38bdf8" />
          <circle cx="-5" cy="25" r="3.5" fill="#38bdf8" />
          <text x="18" y="10" fill="#38bdf8" fontSize="10" fontWeight="bold">Lakshadweep (Arabian Sea)</text>
        </g>

        {/* Andaman & Nicobar (Bay of Bengal) */}
        <g transform="translate(640, 450)">
          <ellipse cx="0" cy="0" rx="4" ry="12" fill="#38bdf8" />
          <ellipse cx="12" cy="45" rx="5" ry="15" fill="#38bdf8" />
          <text x="-130" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">Andaman & Nicobar Islands (Bay of Bengal)</text>
        </g>

        {/* Tropic of Cancer Line */}
        {showTropicOfCancer && (
          <g>
            <line x1="50" y1="285" x2="750" y2="285" stroke="#f43f5e" strokeWidth="3" strokeDasharray="8 4" />
            <rect x="310" y="272" width="180" height="24" rx="4" fill="#9f1239" />
            <text x="400" y="288" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              Tropic of Cancer (23°30' N)
            </text>
          </g>
        )}

        {/* Standard Meridian Line */}
        {showMeridian && (
          <g>
            <line x1="450" y1="40" x2="450" y2="600" stroke="#a855f7" strokeWidth="3" strokeDasharray="8 4" />
            <rect x="458" y="150" width="190" height="24" rx="4" fill="#6b21a8" />
            <text x="553" y="166" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
              Standard Meridian (82°30' E) - Mirzapur
            </text>
          </g>
        )}

        {/* Extremity Interactive Markers */}
        {/* 1. Indira Col (North) */}
        <g onClick={() => onSelectExtremity('indira_col')} className="cursor-pointer group">
          <circle cx="380" cy="80" r={selectedExtremity === 'indira_col' ? "10" : "6"} fill="#facc15" stroke="#ffffff" strokeWidth="2" />
          <text x="395" y="85" fill="#facc15" fontSize="12" fontWeight="bold">Indira Col (37°6' N)</text>
        </g>

        {/* 2. Kanyakumari (South Mainland) */}
        <g onClick={() => onSelectExtremity('kanyakumari')} className="cursor-pointer group">
          <circle cx="410" cy="480" r={selectedExtremity === 'kanyakumari' ? "10" : "6"} fill="#facc15" stroke="#ffffff" strokeWidth="2" />
          <text x="425" y="485" fill="#facc15" fontSize="12" fontWeight="bold">Kanyakumari (8°4' N)</text>
        </g>

        {/* 3. Indira Point (South Union) */}
        <g onClick={() => onSelectExtremity('indira_point')} className="cursor-pointer group">
          <circle cx="652" cy="535" r={selectedExtremity === 'indira_point' ? "10" : "6"} fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
          <text x="510" y="540" fill="#ef4444" fontSize="12" fontWeight="bold">Indira Point (6°45' N)</text>
        </g>

        {/* 4. Guhar Moti (West) */}
        <g onClick={() => onSelectExtremity('guhar_moti')} className="cursor-pointer group">
          <circle cx="120" cy="270" r={selectedExtremity === 'guhar_moti' ? "10" : "6"} fill="#facc15" stroke="#ffffff" strokeWidth="2" />
          <text x="30" y="295" fill="#facc15" fontSize="12" fontWeight="bold">Guhar Moti (68°7' E)</text>
        </g>

        {/* 5. Kibithu (East) */}
        <g onClick={() => onSelectExtremity('kibithu')} className="cursor-pointer group">
          <circle cx="680" cy="240" r={selectedExtremity === 'kibithu' ? "10" : "6"} fill="#facc15" stroke="#ffffff" strokeWidth="2" />
          <text x="690" y="245" fill="#facc15" fontSize="12" fontWeight="bold">Kibithu (97°25' E)</text>
        </g>

        {/* North-South Dimension Arrow */}
        <line x1="360" y1="85" x2="360" y2="475" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrow)" />
        <rect x="280" y="250" width="75" height="20" rx="3" fill="#14532d" />
        <text x="317" y="264" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">3,214 km</text>

        {/* East-West Dimension Arrow */}
        <line x1="125" y1="360" x2="675" y2="360" stroke="#3b82f6" strokeWidth="2" />
        <rect x="360" y="370" width="75" height="20" rx="3" fill="#1e3a8a" />
        <text x="397" y="384" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">2,933 km</text>
      </svg>
    </div>
  );
};

// Diagram 2: Sun Position & Day/Night Latitudinal Duration Visualizer
const SunLatitudeDiagramSVG: React.FC<{
  latitude: number; // 8 to 37
  dayOfYear: number; // 1 to 365 (172 = June Solstice, 355 = Dec Solstice)
}> = ({ latitude, dayOfYear }) => {
  // Compute solar declination: delta = 23.45 * sin(360/365 * (284 + N))
  const declination = 23.45 * Math.sin(((dayOfYear - 81) * 360 / 365) * (Math.PI / 180));
  
  // Hour angle calculation for day length
  const latRad = latitude * (Math.PI / 180);
  const decRad = declination * (Math.PI / 180);
  
  // tan(lat) * tan(dec)
  const val = -Math.tan(latRad) * Math.tan(decRad);
  const clampedVal = Math.max(-1, Math.min(1, val));
  const hourAngleRad = Math.acos(clampedVal);
  const dayLengthHours = (2 * hourAngleRad * 180 / Math.PI) / 15;
  const nightLengthHours = 24 - dayLengthHours;

  const maxSunAngle = 90 - latitude + declination;

  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-amber-500/30 shadow-2xl">
      <div className="flex justify-between items-center mb-2 text-xs text-amber-400 font-mono">
        <span>SOLAR DECLINATION & LATITUDINAL DAY-NIGHT CALCULATOR</span>
        <span>LAT: {latitude}° N | DAY LENGTH: {dayLengthHours.toFixed(2)} hrs</span>
      </div>

      <svg viewBox="0 0 700 350" className="w-full h-auto rounded-lg bg-slate-950">
        {/* Sky Background */}
        <rect x="0" y="0" width="700" height="250" fill="#0f172a" />
        {/* Ground */}
        <rect x="0" y="250" width="700" height="100" fill="#1e293b" />
        <line x1="0" y1="250" x2="700" y2="250" stroke="#10b981" strokeWidth="3" />

        {/* Observer Figure at latitude */}
        <g transform="translate(350, 250)">
          {/* Human stick figure */}
          <circle cx="0" cy="-24" r="6" fill="#facc15" />
          <line x1="0" y1="-18" x2="0" y2="-6" stroke="#facc15" strokeWidth="3" />
          <line x1="-8" y1="-14" x2="8" y2="-14" stroke="#facc15" strokeWidth="2" />
          <line x1="0" y1="-6" x2="-6" y2="0" stroke="#facc15" strokeWidth="2.5" />
          <line x1="0" y1="-6" x2="6" y2="0" stroke="#facc15" strokeWidth="2.5" />
        </g>

        {/* Sun Trajectory Arc */}
        <path
          d={`M 100 250 A 250 ${Math.max(20, maxSunAngle * 2.5)} 0 0 1 600 250`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeDasharray="6 4"
        />

        {/* Sun Position */}
        {(() => {
          const sunX = 350 - 250 * Math.cos((180 - maxSunAngle * 1.5) * Math.PI / 180);
          const sunY = 250 - (maxSunAngle * 2.2);
          return (
            <g transform={`translate(${sunX}, ${sunY})`}>
              <circle cx="0" cy="0" r="18" fill="#fbbf24" filter="drop-shadow(0 0 12px #f59e0b)" />
              <line x1="-24" y1="0" x2="24" y2="0" stroke="#fbbf24" strokeWidth="2" />
              <line x1="0" y1="-24" x2="0" y2="24" stroke="#fbbf24" strokeWidth="2" />
            </g>
          );
        })()}

        {/* Information Labels */}
        <text x="50" y="40" fill="#e2e8f0" fontSize="13" fontWeight="bold">
          Max Noon Solar Altitude: {maxSunAngle.toFixed(1)}°
        </text>
        <text x="50" y="65" fill="#38bdf8" fontSize="12">
          Daylight Duration: {Math.floor(dayLengthHours)}h {Math.round((dayLengthHours % 1) * 60)}m
        </text>
        <text x="50" y="90" fill="#f43f5e" fontSize="12">
          Night Duration: {Math.floor(nightLengthHours)}h {Math.round((nightLengthHours % 1) * 60)}m
        </text>

        {/* Equatorial vs High-Lat Note */}
        <rect x="420" y="30" width="260" height="70" rx="6" fill="#1e1e38" stroke="#6366f1" strokeWidth="1" />
        <text x="430" y="50" fill="#a5b4fc" fontSize="11" fontWeight="bold">Latitudinal Insight:</text>
        <text x="430" y="68" fill="#cbd5e1" fontSize="10">
          At 8°N (Kanyakumari): Day/Night diff ≈ 45 mins.
        </text>
        <text x="430" y="84" fill="#cbd5e1" fontSize="10">
          At 37°N (Kashmir): Day/Night diff ≈ 5 hours!
        </text>
      </svg>
    </div>
  );
};

// Diagram 3: Maritime Strategic Hub & Historic Silk/Spice Trade Routes
const MaritimeTradeRoutesSVG: React.FC<{ activeRoute: string }> = ({ activeRoute }) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-xl p-4 border border-indigo-500/30 shadow-2xl">
      <div className="flex justify-between items-center mb-2 text-xs text-indigo-400 font-mono">
        <span>STRATEGIC INDIAN OCEAN MARITIME RIM & SILK ROUTE NETWORK</span>
        <span>ROUTE FOCUS: {activeRoute.toUpperCase()}</span>
      </div>
      <svg viewBox="0 0 800 450" className="w-full h-auto bg-slate-950 rounded-lg select-none">
        {/* Map Outlines (Schematic Continents) */}
        {/* Africa */}
        <path d="M 80,180 Q 140,220 160,320 Q 140,420 100,440 L 40,400 Z" fill="#1e293b" stroke="#334155" />
        {/* West Asia / Arabia */}
        <path d="M 170,180 L 260,170 L 280,240 L 220,260 Z" fill="#1e293b" stroke="#334155" />
        {/* India */}
        <path d="M 330,160 L 440,160 L 480,250 L 400,340 L 350,260 Z" fill="#334155" stroke="#06b6d4" strokeWidth="2" />
        {/* Southeast Asia & East Asia */}
        <path d="M 500,160 L 680,140 L 760,220 L 620,380 L 520,300 Z" fill="#1e293b" stroke="#334155" />

        {/* Oceans */}
        <text x="250" y="320" fill="#0284c7" fontSize="14" fontWeight="bold" opacity="0.6">ARABIAN SEA</text>
        <text x="460" y="320" fill="#0284c7" fontSize="14" fontWeight="bold" opacity="0.6">BAY OF BENGAL</text>
        <text x="350" y="410" fill="#0284c7" fontSize="16" fontWeight="bold" letterSpacing="2" opacity="0.8">INDIAN OCEAN</text>

        {/* Suez Canal & Bab-el-Mandeb Routes */}
        <line x1="170" y1="150" x2="220" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
        <text x="110" y="145" fill="#f59e0b" fontSize="10">Suez Canal (1869)</text>

        {/* Route 1: Overland Silk Road */}
        {(activeRoute === 'all' || activeRoute === 'silk') && (
          <g>
            <path d="M 180,120 Q 300,100 420,110 T 640,100" fill="none" stroke="#e11d48" strokeWidth="3.5" strokeDasharray="6 3" />
            <text x="320" y="95" fill="#fda4af" fontSize="11" fontWeight="bold">Overland Silk Route (Upanishads, Numerals, Ideas)</text>
          </g>
        )}

        {/* Route 2: Spice Maritime Route */}
        {(activeRoute === 'all' || activeRoute === 'spice') && (
          <g>
            <path d="M 230,250 Q 320,290 400,340 Q 520,320 620,280" fill="none" stroke="#10b981" strokeWidth="3.5" />
            <text x="440" y="360" fill="#6ee7b7" fontSize="11" fontWeight="bold">Maritime Spice Route (Spices, Muslin, Ivory)</text>
          </g>
        )}

        {/* Route 3: Modern Strait of Malacca Trade Transits */}
        {(activeRoute === 'all' || activeRoute === 'malacca') && (
          <g>
            <path d="M 400,340 L 580,310 L 660,330" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeDasharray="4 2" />
            <text x="560" y="345" fill="#93c5fd" fontSize="11" fontWeight="bold">Malacca Strait Hub</text>
          </g>
        )}

        {/* Hub Markers */}
        <circle cx="400" cy="340" r="8" fill="#facc15" stroke="#ffffff" strokeWidth="2" />
        <text x="360" y="370" fill="#facc15" fontSize="12" fontWeight="bold">Kanyakumari Hub</text>
      </svg>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export const C9_GeoIndiaSizeLocationCBSESim: React.FC<{
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}> = ({ onComplete, initialNodeId = NODE_IDS.HEMISPHERIC_POSITION }) => {

  // State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);
  const [selectedExtremity, setSelectedExtremity] = useState<string | null>('kanyakumari');
  const [showTropicOfCancer, setShowTropicOfCancer] = useState<boolean>(true);
  const [showMeridian, setShowMeridian] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);

  // Time / Longitude Lab state
  const [selectedLongitude, setSelectedLongitude] = useState<number>(82.5); // default 82°30' E
  // Latitude / Solar Lab state
  const [selectedLatitude, setSelectedLatitude] = useState<number>(23.5); // default Tropic of Cancer
  const [dayOfYear, setDayOfYear] = useState<number>(172); // June solstice
  // Maritime route state
  const [activeRoute, setActiveRoute] = useState<string>('all');

  // Interactive Question / Challenge State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [calcInput, setCalcInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Discovery / Prediction & Observation state
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [discoveryOption, setDiscoveryOption] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Gamification & Pedagogical State
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // BKT & SRS tracking
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Timer for auto-hinting after inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(() => {
        if (!showHint && activeTab === 'challenges') {
          setShowHint(true);
          audioManager.play('hint');
          speechManager.speak("Here is a hint to help you solve this spatial problem.");
        }
      }, 12000);
    };

    resetTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, showHint]);

  // Current active challenge
  const currentChallenge = CHALLENGES[currentChallengeIdx];

  // Calculated Solar Time for Lab 2
  const localSolarTimeDiffMins = useMemo(() => {
    return Math.round((selectedLongitude - 82.5) * 4);
  }, [selectedLongitude]);

  const localSolarTimeString = useMemo(() => {
    const baseMins = 12 * 60; // 12:00 PM IST noon baseline
    const targetMins = baseMins + localSolarTimeDiffMins;
    const hours = Math.floor(targetMins / 60) % 24;
    const mins = targetMins % 60;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${mins < 10 ? '0' : ''}${mins} ${ampm}`;
  }, [localSolarTimeDiffMins]);

  // Handlers for Discovery Question
  const handleDiscoverySubmit = () => {
    if (discoveryOption === null) return;
    setDiscoverySubmitted(true);
    if (discoveryOption === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak("Correct! Earth's 30 degree longitudinal span creates a 2-hour solar time shift between Arunachal Pradesh and Gujarat.");
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. Consider how Earth rotates 15 degrees every hour across longitudes.");
    }
  };

  // Handlers for Challenges
  const handleAnswerSubmit = () => {
    if (!currentChallenge) return;
    let isCorrect = false;

    if (currentChallenge.type === 'mcq' || currentChallenge.type === 'matching') {
      if (selectedOptionIdx === currentChallenge.correctIndex) {
        isCorrect = true;
      }
    } else if (currentChallenge.type === 'calculation') {
      const cleanInput = calcInput.trim().toLowerCase();
      const cleanAnswer = String(currentChallenge.correctAnswer).trim().toLowerCase();
      if (cleanInput.includes(cleanAnswer) || cleanAnswer.includes(cleanInput)) {
        isCorrect = true;
      }
    }

    const nodeId = currentChallenge.nodeId;
    // Update BKT State
    const updatedBkt = bktUpdate(bktStates[nodeId] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    // Update SM-2 State
    const rating = isCorrect ? (showHint ? 3 : 5) : 1;
    const updatedSrs = sm2Update(srsItems[nodeId] || createReviewItem(nodeId), rating);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak("Excellent work! That geographical analysis is spot on.");
      setScore((prev) => prev + 100 + streak * 10);
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setChallengeFeedback({ isCorrect: true, message: "Correct! " + currentChallenge.explanation });
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("That is incorrect. Let's analyze the spatial relationships again.");
      setStreak(0);
      setChallengeFeedback({ isCorrect: false, message: "Incorrect. " + currentChallenge.explanation });
    }
  };

  const handleNextChallenge = () => {
    setSelectedOptionIdx(null);
    setCalcInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      speechManager.speak("Congratulations! You have completed all 22 national geographic challenges.");
      recordGameScore('c9_geo_india_size_loc', score);
      if (onComplete) onComplete(score);
      setActiveTab('summary');
    }
  };

  // Mastery score calculation
  const overallMastery = useMemo(() => {
    const masteries = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id] || createBKTState()));
    const avg = masteries.reduce((a, b) => a + b, 0) / masteries.length;
    return Math.round(avg * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble
        show={showHint}
        text={currentChallenge ? currentChallenge.hints[currentHintIndex] : "Review the latitude and longitude parameters."}
      />

      {/* Main Header Banner */}
      <header className="w-full max-w-6xl bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl mb-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="z-10">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 rounded-full text-xs font-semibold tracking-wide">
              CLASS 9 ICSE / CBSE GEOGRAPHY
            </span>
            <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 rounded-full text-xs font-semibold">
              CHAPTER 1: INDIA - SIZE AND LOCATION
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
            {SCENARIO.title}
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-1 max-w-2xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* Dynamic Score & Mastery Dashboard */}
        <div className="flex items-center gap-4 z-10 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">GEOSPATIAL SCORE</div>
            <div className="text-xl font-bold text-amber-400">{score}</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">STREAK</div>
            <div className="text-xl font-bold text-emerald-400">🔥 {streak}</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400 font-medium">MASTERY</div>
            <div className="text-xl font-bold text-cyan-400">{overallMastery}%</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-6xl flex gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('discovery');
          }}
          className={`flex-1 py-3 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
            activeTab === 'discovery'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          🔍 1. DISCOVERY & HYPOTHESIS
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('lab');
          }}
          className={`flex-1 py-3 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
            activeTab === 'lab'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          🗺️ 2. INTERACTIVE GEOGRAPHY LAB
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('challenges');
          }}
          className={`flex-1 py-3 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
            activeTab === 'challenges'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          🎯 3. CHALLENGES ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            audioManager.play('tap');
            setActiveTab('summary');
          }}
          className={`flex-1 py-3 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
            activeTab === 'summary'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          📊 4. MASTERY & EXTENSION
        </button>
      </nav>

      {/* ==========================================
          TAB 1: DISCOVERY & PREDICTION
      ========================================== */}
      {activeTab === 'discovery' && (
        <div className="w-full max-w-6xl space-y-6">
          {/* Narrative Scenario Box */}
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">Cartographic Scenario & Context</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {SCENARIO.context}
            </p>

            {/* Counterintuitive Discovery Question */}
            <div className="mt-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 tracking-wider">PRECONCEPTION DISCOVERY CHALLENGE</span>
              <h3 className="text-base md:text-lg font-semibold text-slate-100 mt-2 mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => setDiscoveryOption(idx)}
                    className={`w-full text-left p-4 rounded-lg text-xs md:text-sm transition-all ${
                      discoveryOption === idx
                        ? 'bg-cyan-900/50 border-2 border-cyan-400 text-cyan-200'
                        : 'bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoveryOption === null}
                  onClick={handleDiscoverySubmit}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg disabled:opacity-50 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md"
                >
                  Verify Discovery Answer
                </button>
              ) : (
                <div className="mt-4 p-4 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-200 text-xs md:text-sm">
                  <span className="font-bold text-amber-400">Geographic Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>
          </div>

          {/* PREDICTION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Spatial Prediction Hypotheses</h3>
            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-200 mb-3">{pq.question}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('pop');
                          setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                        }}
                        className={`p-3 rounded-lg text-xs text-left transition-all ${
                          predictionAnswers[qIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/60 border border-emerald-400 text-emerald-200'
                              : 'bg-rose-900/60 border border-rose-400 text-rose-200'
                            : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-400 font-mono italic">
                    💡 Verification Guide: {pq.verifyInstruction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: INTERACTIVE GEOGRAPHY LAB
      ========================================== */}
      {activeTab === 'lab' && (
        <div className="w-full max-w-6xl space-y-6">
          {/* Exploration Steps Selector */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-3 rounded-xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentLabStep(idx);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  currentLabStep === idx
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* Active Lab Instruction Banner */}
          <div className="bg-slate-900/90 border border-cyan-500/30 p-4 rounded-xl text-xs md:text-sm text-cyan-200 flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <span className="font-bold text-white">Lab Objective: </span>
              {EXPLORATION_STEPS[currentLabStep].instruction}
            </div>
          </div>

          {/* LAB STEP 1: Spatial Extent Map */}
          {currentLabStep === 0 && (
            <div className="space-y-4">
              <IndiaSpatialMapSVG
                selectedExtremity={selectedExtremity}
                onSelectExtremity={(id) => {
                  audioManager.play('pickup');
                  setSelectedExtremity(id);
                }}
                showTropicOfCancer={showTropicOfCancer}
                showMeridian={showMeridian}
                showGrid={showGrid}
              />

              {/* Controls */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-wrap gap-4 items-center justify-between text-xs">
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={showTropicOfCancer}
                      onChange={(e) => setShowTropicOfCancer(e.target.checked)}
                      className="accent-rose-500 rounded"
                    />
                    Tropic of Cancer (23°30' N)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={showMeridian}
                      onChange={(e) => setShowMeridian(e.target.checked)}
                      className="accent-purple-500 rounded"
                    />
                    Standard Meridian (82°30' E)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={showGrid}
                      onChange={(e) => setShowGrid(e.target.checked)}
                      className="accent-cyan-500 rounded"
                    />
                    Lat / Long Grid Lines
                  </label>
                </div>

                {/* Extremity Detail Box */}
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300 font-mono text-xs">
                  {selectedExtremity === 'indira_col' && (
                    <span>NORTH: Indira Col, Ladakh (37°6' N) - High Himalayan border.</span>
                  )}
                  {selectedExtremity === 'kanyakumari' && (
                    <span>SOUTH MAINLAND: Kanyakumari, Tamil Nadu (8°4' N) - Confluence of 3 seas.</span>
                  )}
                  {selectedExtremity === 'indira_point' && (
                    <span>SOUTH REPUBLIC: Indira Point, Great Nicobar (6°45' N) - Submerged in 2004 tsunami.</span>
                  )}
                  {selectedExtremity === 'guhar_moti' && (
                    <span>WEST: Guhar Moti / Sir Creek, Gujarat (68°7' E) - Rann of Kutch boundary.</span>
                  )}
                  {selectedExtremity === 'kibithu' && (
                    <span>EAST: Kibithu, Arunachal Pradesh (97°25' E) - First sunrise location in India.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LAB STEP 2: Standard Meridian & Time Calculator */}
          {currentLabStep === 1 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-purple-400">Longitude Solar Time & Standard Time Simulator</h3>
              <p className="text-xs text-slate-300">
                Slide longitude across India (68.1° E to 97.4° E). Observe how Local Solar Time varies relative to Indian Standard Time (IST fixed at 82.5° E / 82°30' E).
              </p>

              <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center text-xs font-mono text-purple-300">
                  <span>Selected Longitude: {selectedLongitude.toFixed(1)}° E</span>
                  <span>IST Baseline (82.5° E): 12:00 PM (Solar Noon)</span>
                </div>
                <input
                  type="range"
                  min="68.1"
                  max="97.4"
                  step="0.1"
                  value={selectedLongitude}
                  onChange={(e) => {
                    audioManager.play('count');
                    setSelectedLongitude(parseFloat(e.target.value));
                  }}
                  className="w-full accent-purple-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-purple-500/30 text-center">
                    <div className="text-xs text-slate-400">LOCAL SOLAR TIME</div>
                    <div className="text-2xl font-bold text-purple-400 mt-1">{localSolarTimeString}</div>
                    <div className="text-[10px] text-slate-500 mt-1">
                      {localSolarTimeDiffMins >= 0 ? `+${localSolarTimeDiffMins}` : localSolarTimeDiffMins} min vs IST
                    </div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/30 text-center">
                    <div className="text-xs text-slate-400">OFFICIAL IST WATCH TIME</div>
                    <div className="text-2xl font-bold text-cyan-400 mt-1">12:00 PM</div>
                    <div className="text-[10px] text-slate-500 mt-1">82°30' E Standard Meridian</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30 text-center">
                    <div className="text-xs text-slate-400">GMT / UTC TIME</div>
                    <div className="text-2xl font-bold text-amber-400 mt-1">6:30 AM</div>
                    <div className="text-[10px] text-slate-500 mt-1">IST is UTC + 5:30</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB STEP 3: Latitude & Solar Angle Simulator */}
          {currentLabStep === 2 && (
            <div className="space-y-4">
              <SunLatitudeDiagramSVG latitude={selectedLatitude} dayOfYear={dayOfYear} />

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-amber-400 block mb-2">
                    Latitude Slider: {selectedLatitude}° N
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="37"
                    step="0.5"
                    value={selectedLatitude}
                    onChange={(e) => {
                      audioManager.play('count');
                      setSelectedLatitude(parseFloat(e.target.value));
                    }}
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>8° N (Kanyakumari)</span>
                    <span>23.5° N (Tropic of Cancer)</span>
                    <span>37° N (Kashmir)</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-indigo-400 block mb-2">
                    Season / Day of Year: Day {dayOfYear} ({dayOfYear < 100 ? 'Spring' : dayOfYear < 200 ? 'Summer Solstice' : dayOfYear < 300 ? 'Autumn' : 'Winter Solstice'})
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="365"
                    value={dayOfYear}
                    onChange={(e) => {
                      audioManager.play('count');
                      setDayOfYear(parseInt(e.target.value));
                    }}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>Jan 1</span>
                    <span>Jun 21 (Solstice)</span>
                    <span>Dec 21 (Solstice)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB STEP 4: Borders & Coastlines */}
          {currentLabStep === 3 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400">Boundary Spatial Extent Breakdowns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-2">Terrestrial Land Border (~15,200 km)</div>
                  <ul className="text-xs text-slate-300 space-y-2 font-mono">
                    <li className="flex justify-between"><span>Bangladesh:</span> <span className="text-emerald-400 font-bold">4,096.7 km</span></li>
                    <li className="flex justify-between"><span>China:</span> <span className="text-emerald-400 font-bold">3,488.0 km</span></li>
                    <li className="flex justify-between"><span>Pakistan:</span> <span className="text-emerald-400 font-bold">3,323.0 km</span></li>
                    <li className="flex justify-between"><span>Nepal:</span> <span className="text-emerald-400 font-bold">1,751.0 km</span></li>
                    <li className="flex justify-between"><span>Myanmar:</span> <span className="text-emerald-400 font-bold">1,643.0 km</span></li>
                    <li className="flex justify-between"><span>Bhutan:</span> <span className="text-emerald-400 font-bold">699.0 km</span></li>
                    <li className="flex justify-between"><span>Afghanistan:</span> <span className="text-emerald-400 font-bold">106.0 km</span></li>
                  </ul>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-2">Coastline & Maritime Domain (~7,516.6 km)</div>
                  <ul className="text-xs text-slate-300 space-y-2 font-mono">
                    <li className="flex justify-between"><span>Mainland Coastline:</span> <span className="text-cyan-400 font-bold">6,100.0 km</span></li>
                    <li className="flex justify-between"><span>Island Archipelagos:</span> <span className="text-cyan-400 font-bold">1,416.6 km</span></li>
                    <li className="flex justify-between"><span>Territorial Sea Limit:</span> <span className="text-cyan-400 font-bold">12 Nautical Miles</span></li>
                    <li className="flex justify-between"><span>EEZ Limit:</span> <span className="text-cyan-400 font-bold">200 Nautical Miles</span></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* LAB STEP 5: Ancient Silk & Maritime Routes */}
          {currentLabStep === 4 && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {['all', 'silk', 'spice', 'malacca'].map((rt) => (
                  <button
                    key={rt}
                    onClick={() => {
                      audioManager.play('tap');
                      setActiveRoute(rt);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                      activeRoute === rt
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-900 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {rt === 'all' ? 'All Historic Routes' : `${rt} Route`}
                  </button>
                ))}
              </div>
              <MaritimeTradeRoutesSVG activeRoute={activeRoute} />
            </div>
          )}

          {/* OBSERVATION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">Empirical Spatial Observations</h3>
            <div className="space-y-6">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-200 mb-3">{oq.question}</h4>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          audioManager.play('pop');
                          setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                        }}
                        className={`w-full p-3 rounded-lg text-xs text-left transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-900/60 border border-emerald-400 text-emerald-200'
                              : 'bg-rose-900/60 border border-rose-400 text-rose-200'
                            : 'bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300'
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

      {/* ==========================================
          TAB 3: INTERACTIVE CHALLENGES (22+)
      ========================================== */}
      {activeTab === 'challenges' && currentChallenge && (
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          {/* Progress Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                CHALLENGE {currentChallengeIdx + 1} OF {CHALLENGES.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                  currentChallenge.difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : currentChallenge.difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  {currentChallenge.difficulty}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Competency: {currentChallenge.competencyLevel}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowHint(!showHint);
                if (!showHint) {
                  audioManager.play('hint');
                  speechManager.speak(currentChallenge.hints[currentHintIndex]);
                }
              }}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              💡 Hint ({currentHintIndex + 1}/3)
            </button>
          </div>

          {/* Question Prompt */}
          <div className="text-base md:text-lg font-bold text-slate-100">
            {currentChallenge.question}
          </div>

          {/* Response Formats */}
          {currentChallenge.type === 'mcq' && currentChallenge.options && (
            <div className="space-y-3">
              {currentChallenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={challengeFeedback !== null}
                  onClick={() => {
                    audioManager.play('pop');
                    setSelectedOptionIdx(idx);
                  }}
                  className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    selectedOptionIdx === idx
                      ? 'bg-cyan-900/60 border-2 border-cyan-400 text-cyan-100 shadow-md'
                      : 'bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>
          )}

          {currentChallenge.type === 'calculation' && (
            <div className="space-y-4">
              <input
                type="text"
                value={calcInput}
                onChange={(e) => setCalcInput(e.target.value)}
                placeholder="Enter calculated value (e.g., 5:30 PM or 117 minutes)..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-sm text-cyan-200 focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          )}

          {currentChallenge.type === 'matching' && currentChallenge.options && (
            <div className="space-y-3">
              {currentChallenge.options.map((opt, idx) => (
                <button
                  key={idx}
                  disabled={challengeFeedback !== null}
                  onClick={() => {
                    audioManager.play('pop');
                    setSelectedOptionIdx(idx);
                  }}
                  className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    selectedOptionIdx === idx
                      ? 'bg-indigo-900/60 border-2 border-indigo-400 text-indigo-100'
                      : 'bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Feedback Display */}
          {challengeFeedback && (
            <div
              className={`p-4 rounded-xl text-xs md:text-sm border ${
                challengeFeedback.isCorrect
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
              }`}
            >
              <div className="font-bold mb-1">{challengeFeedback.isCorrect ? '✅ Excellent!' : '❌ Review Concept'}</div>
              <div>{challengeFeedback.message}</div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                if (currentHintIndex < 2) {
                  setCurrentHintIndex((prev) => prev + 1);
                  setShowHint(true);
                  audioManager.play('hint');
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              Cycle Next Hint
            </button>

            {!challengeFeedback ? (
              <button
                disabled={selectedOptionIdx === null && calcInput.trim() === ''}
                onClick={handleAnswerSubmit}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs md:text-sm rounded-xl disabled:opacity-50 hover:from-cyan-400 hover:to-indigo-500 transition-all shadow-lg"
              >
                Submit Spatial Analysis
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs md:text-sm rounded-xl hover:from-emerald-400 hover:to-teal-500 transition-all shadow-lg"
              >
                {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'View Final Mastery Summary'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 4: SUMMARY, MASTERY & REAL WORLD
      ========================================== */}
      {activeTab === 'summary' && (
        <div className="w-full max-w-6xl space-y-6">
          {/* Global Performance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Final Total Score</div>
              <div className="text-4xl font-extrabold text-amber-400 mt-2">{score} pts</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Spatial Mastery Level</div>
              <div className="text-4xl font-extrabold text-cyan-400 mt-2">{overallMastery}%</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl text-center">
              <div className="text-xs font-bold text-slate-400 uppercase">Challenges Completed</div>
              <div className="text-4xl font-extrabold text-emerald-400 mt-2">
                {CHALLENGES.length} / {CHALLENGES.length}
              </div>
            </div>
          </div>

          {/* REAL-WORLD EXTENSION ACTIVITY */}
          <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-cyan-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-sm mb-4">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Operational Protocol Steps</span>
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                  <span className="px-2 py-0.5 bg-cyan-900/50 text-cyan-300 rounded font-bold font-mono">
                    Step {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Correction Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-amber-400 mb-4">Common Geographical Misconceptions Cleared</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((misc) => (
                <div key={misc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs font-bold text-rose-400 mb-1">❌ Myth: {misc.misconception}</div>
                  <div className="text-xs text-emerald-300">✅ Reality: {misc.correction}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Node Mastery Progress */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Curriculum Competency Node Mastery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_NODE_IDS.map((nodeId) => {
                const bkt = bktStates[nodeId] || createBKTState();
                const nodeMastery = Math.round(masteryProb(bkt) * 100);
                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400">{nodeId}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-500 h-full" style={{ width: `${nodeMastery}%` }} />
                      </div>
                      <span className="font-bold text-cyan-400 w-10 text-right">{nodeMastery}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C9_GeoIndiaSizeLocationCBSESim;