'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC GEOGRAPHY NODE LITERALS ───
const NODE_C12_GEO_021 = 'c12_geo_021'; // Water resources and irrigation
const NODE_C12_GEO_022 = 'c12_geo_022'; // Agriculture — types and development
const NODE_C12_GEO_023 = 'c12_geo_023'; // Agriculture — food crops
const NODE_C12_GEO_024 = 'c12_geo_024'; // Agriculture — commercial crops
const NODE_C12_GEO_025 = 'c12_geo_025'; // Fisheries
const NODE_C12_GEO_026 = 'c12_geo_026'; // Mineral and energy resources
const NODE_C12_GEO_027 = 'c12_geo_027'; // Conventional energy sources
const NODE_C12_GEO_028 = 'c12_geo_028'; // Non-conventional energy sources
const NODE_C12_GEO_029 = 'c12_geo_029'; // Transport
const NODE_C12_GEO_030 = 'c12_geo_030'; // Communication

const ALL_NODE_IDS = [
  NODE_C12_GEO_021,
  NODE_C12_GEO_022,
  NODE_C12_GEO_023,
  NODE_C12_GEO_024,
  NODE_C12_GEO_025,
  NODE_C12_GEO_026,
  NODE_C12_GEO_027,
  NODE_C12_GEO_028,
  NODE_C12_GEO_029,
  NODE_C12_GEO_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Bharat Resource Matrix 2047',
  intro: 'You are the Chief Regional Geographer directing India’s resource and infrastructure transition. Across arid Rajasthan, the fertile Gangetic plain, peninsular mineral belts, and vibrant coastal zones, acute crises demand scientific resource mapping and sustainable planning.',
  context: 'Manage water balance, crop zoning, maritime fisheries, mineral-energy corridors, and multimodal transport-communication grids to achieve sustainable development.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In south-west Punjab, intensive tubewell pumping with subsidised power and excessive flood irrigation has caused a severe land crisis. What unexpected twin soil problem occurs?',
  options: [
    'Desertification and rapid wind erosion',
    'Simultaneous waterlogging (rising water table) and topsoil salinisation',
    'Complete depletion of soil nitrogen with no water table change',
    'Acid rain leaching away all rock phosphates',
  ],
  correctIndex: 1,
  hintAfter: 'Over-irrigation in flat, poorly drained alluvial soils forces the water table upwards; rapid surface evaporation leaves toxic crusts of dissolved salts!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about canal irrigation versus tank irrigation in terms of water distribution efficiency?',
    observableOptions: [
      'Canals provide controlled, regulated flow but are costly to build; tanks are cheaper but depend on rainfall (✓)',
      'Canals and tanks have identical efficiency and cost (✗)',
      'Tanks are always more efficient than canals (✗)',
      'Canals depend entirely on monsoon rains (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When groundwater extraction exceeds recharge rates, what observable trend emerges in the aquifer?',
    observableOptions: [
      'Water table drops progressively, leading to depletion and potential salinity ingress (✓)',
      'Water table rises due to pressure changes (✗)',
      'No change in the water table level (✗)',
      'Groundwater quality improves automatically (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 HIGH-QUALITY CISCE / NEP 2020 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Water Resources & Irrigation (Foundation)
  {
    id: 'ch_geo_001',
    nodeId: NODE_C12_GEO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is correctly classified as a GROUND WATER resource in India?',
    options: [
      'Vembanad and Chilika coastal lagoons',
      'Perennial Bhakra Nangal canal reservoir',
      'Unconfined alluvial aquifers tapped by deep tubewells',
      'Rain-fed irrigation tanks of Tamil Nadu',
    ],
    correctIndex: 2,
    explanation: 'Ground water is stored in the pore spaces of rocks and soil within aquifers beneath the surface, tapped via wells and tubewells. Rivers, lakes, reservoirs, and tanks are surface water.',
    hints: [
      'Think about water bodies visible on the surface versus water hidden underground.',
      'Surface water includes rivers, lakes, tanks, and reservoirs.',
      'Tubewells extract water held in porous subsurface strata known as aquifers.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Irrigation Comparison (Standard - Application)
  {
    id: 'ch_geo_002',
    nodeId: NODE_C12_GEO_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An orchard farmer in semi-arid Jodhpur seeks to cut water loss. Why is drip irrigation substantially superior to canal irrigation for this farm?',
    options: [
      'Drip delivers water drop-by-drop to the root zone, saving 40-60% water and eliminating seepage/evaporation losses',
      'Canal irrigation requires zero electricity and naturally desalinates sandy soils',
      'Drip irrigation floods the entire field surface to lower ambient orchard temperatures',
      'Canals cause rapid root nitrogen fixation while drip increases weed proliferation',
    ],
    correctIndex: 0,
    explanation: 'Drip irrigation applies water directly to the plant root zone via emitters, saving 40-60% water versus flood/canal methods by cutting evaporation and transit seepage.',
    hints: [
      'Recall CISCE examiner notes: evaporation and seepage losses are canal drawbacks, not drip drawbacks.',
      'Drip systems target the root zone directly rather than flooding the entire soil surface.',
      'Drip irrigation achieves 40% to 60% water conservation in arid and water-scarce regions.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Cropping Intensity Numeric (Standard - Application)
  {
    id: 'ch_geo_003',
    nodeId: NODE_C12_GEO_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A village in western UP has a Net Sown Area of 250 hectares and a Gross Cropped Area of 475 hectares. Calculate the Cropping Intensity percentage.',
    correctAnswer: 190,
    tolerance: 1,
    unit: '%',
    explanation: 'Cropping Intensity = (Gross Cropped Area / Net Sown Area) × 100 = (475 / 250) × 100 = 190%. This reflects intensive double-cropping enabled by assured irrigation.',
    hints: [
      'Use the standard formula: (Gross Cropped Area / Net Sown Area) × 100.',
      'Divide 475 by 250, which equals 1.9.',
      'Multiply 1.9 by 100 to obtain 190%.',
    ],
  },
  // 4. Crop Rotation vs Combination (Foundation - Understanding)
  {
    id: 'ch_geo_004',
    nodeId: NODE_C12_GEO_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does crop rotation (e.g., Rice - Wheat - Moong in Punjab) fundamentally differ from crop combination?',
    options: [
      'Rotation is sequential cultivation across successive seasons; combination is simultaneous growing on the same field',
      'Rotation mixes seeds together in one furrow; combination plants them in separate years',
      'Rotation applies only to commercial cash crops; combination is exclusive to plantation tea',
      'Rotation depletes nitrogen faster by avoiding all leguminous crops',
    ],
    correctIndex: 0,
    explanation: 'Crop rotation is the sequential cultivation of different crops on the same land over successive seasons (e.g. kharif rice, rabi wheat, summer moong). Crop combination is simultaneous multi-crop cultivation.',
    hints: [
      'Remember the CISCE 2019 examiner rule: "Rotation = sequential time series; Combination = simultaneous together".',
      'Moong in summer follows rabi wheat, fixing atmospheric nitrogen sequentially.',
      'Sequential planting over time is rotation; growing mixed crops together at the same time is combination.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Food Crops Growth Conditions (Standard - Analysis)
  {
    id: 'ch_geo_005',
    nodeId: NODE_C12_GEO_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare growth requirements: Why does bajra thrive in western Rajasthan while jowar dominates Maharashtra’s Deccan plateau?',
    options: [
      'Bajra thrives on dry sandy/loamy soils (40-60 cm rain); Jowar requires moisture-retentive regur (black lava) soil',
      'Bajra requires standing water on alluvial clays; Jowar grows only on acidic Himalayan scree',
      'Bajra is a winter rabi crop needing frost; Jowar is an equatorial rainforest tree',
      'Bajra needs over 250 cm rainfall; Jowar needs less than 15 cm rainfall',
    ],
    correctIndex: 0,
    explanation: 'Bajra tolerates drought on poor sandy soils with 40-60 cm rain (Rajasthan). Jowar requires regur (black) soil of volcanic origin in Maharashtra which retains moisture effectively.',
    hints: [
      'Identify the soil pairing: Sandy soil for bajra in arid zones, regur (black) soil for jowar in the Deccan.',
      'Both need moderate temperatures (25-30°C), but soil water retention differs.',
      'Sandy soil suits bajra; moisture-holding black basaltic clay suits jowar.',
    ],
  },
  // 6. Food Crops Seasons Drag-Sort (Standard - Analysis)
  {
    id: 'ch_geo_006',
    nodeId: NODE_C12_GEO_023,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the agricultural stages of a North Indian Rice-Wheat-Moong cycle from onset of Southwest Monsoon:',
    sortItems: [
      'Sow Kharif Paddy with monsoon rains (June-July, 22-32°C, 100-200cm water)',
      'Harvest Paddy and prepare well-drained loamy soil (October-November)',
      'Sow Rabi Wheat in cool weather (10-15°C germination, 50-100cm rain/irrigation)',
      'Harvest Wheat in warm spring (21-26°C ripening in March-April)',
      'Sow Summer Zaid Moong legume to fix atmospheric nitrogen before next monsoon',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The annual cycle runs: Kharif paddy (monsoon) → Autumn harvest → Rabi wheat (winter) → Spring harvest → Zaid moong (summer legume nitrogen restorer).',
    hints: [
      'Start with the monsoon onset in June-July for rice sowing.',
      'Wheat follows in winter as the rabi cereal.',
      'Moong legume is planted in the short summer window (zaid) to restore soil fertility.',
    ],
  },
  // 7. Commercial Crops (Advanced - Evaluation)
  {
    id: 'ch_geo_007',
    nodeId: NODE_C12_GEO_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Uttar Pradesh lead India in sugarcane acreage and production despite peninsular Maharashtra having higher sucrose yield per cane?',
    options: [
      'UP has extensive flat, fertile Gangetic alluvial plains, vast canal networks, and dense clusters of proximate sugar mills',
      'UP possesses tropical coastal sandy soils and frost-free 35°C year-round maritime climate',
      'Maharashtra lacks all road connectivity and has no electric power grid',
      'Sugarcane in UP requires zero irrigation and matures in under 2 months',
    ],
    correctIndex: 0,
    explanation: 'UP has vast contiguous fertile alluvial soils, perennial irrigation from Himalayan rivers, cheap rural labour, and a historic concentration of sugar mills required for rapid crushing.',
    hints: [
      'Consider terrain, alluvium soil expanse, perennial water supply, and crushing infrastructure.',
      'Sugarcane loses sucrose rapidly after cutting, requiring nearby processing mills.',
      'Vast Gangetic alluvium and extensive canal networks give UP massive acreage leadership.',
    ],
  },
  // 8. Commercial Crop Identification (Foundation - Understanding)
  {
    id: 'ch_geo_008',
    nodeId: NODE_C12_GEO_024,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the commercial crop to its primary agro-ecological requirement and leading state:',
    options: [
      'Tea: Acidic forest soil on well-drained hill slopes, 150-300 cm rain — Leading state: Assam',
      'Cotton: Acidic peaty soil with 300 cm rain and frost — Leading state: Kerala',
      'Coffee: Heavy waterlogged coastal clay plains — Leading state: Bihar',
      'Jute: Arid desert sand with 20 cm rain — Leading state: Rajasthan',
    ],
    correctIndex: 0,
    explanation: 'Tea requires well-drained acidic virgin forest soil on hill slopes (preventing waterlogging) with 150-300 cm rainfall; Assam is India’s leading producer.',
    hints: [
      'Tea cannot tolerate standing water around its roots; it needs hill slopes.',
      'Assam leads in tea; Karnataka leads in coffee; Gujarat leads in cotton.',
      'Acidic well-drained slope soils + heavy distributed rain = Assam Tea.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Marine vs Inland Fisheries (Standard - Application)
  {
    id: 'ch_geo_009',
    nodeId: NODE_C12_GEO_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Identify the state leadership and classification correctly for Indian fisheries:',
    options: [
      'Kerala leads in Marine fish production (Kochi harbour); Andhra Pradesh leads in Inland fish production',
      'Andhra Pradesh leads in Marine pelagic tuna; Kerala leads in desert pond aquaculture',
      'Rajasthan leads in Marine demersal trawling; West Bengal produces only ocean cod',
      'Punjab leads in coastal inshore fishing; Goa leads in freshwater river carp',
    ],
    correctIndex: 0,
    explanation: 'Kerala leads in marine fish production with Kochi and extensive coastal shelf operations. Andhra Pradesh leads in inland fisheries through vast freshwater tanks, reservoirs, and aquaculture.',
    hints: [
      'Remember: Kerala = Marine fish leader; Andhra Pradesh = Inland freshwater fish leader.',
      'Kochi is a premier marine fishing harbour on the west coast.',
      'Do not confuse marine capture with inland freshwater fish farming.',
    ],
    misconceptionIndex: 4,
  },
  // 10. Pelagic vs Demersal Fishing (Advanced - Analysis)
  {
    id: 'ch_geo_010',
    nodeId: NODE_C12_GEO_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish pelagic fishing from demersal fishing using ocean vertical zoning and gear:',
    options: [
      'Pelagic catches surface/mid-water species (sardines, mackerel) with drift/purse nets; Demersal catches bottom dwellers (prawns, flatfish) with bottom trawls',
      'Pelagic is conducted exclusively inside freshwater rivers; Demersal is carried out in mountain cloud lakes',
      'Pelagic catches deep sub-sea floor crabs; Demersal catches birds hovering above ocean waves',
      'Pelagic requires deep mines; Demersal requires solar evaporation pans',
    ],
    correctIndex: 0,
    explanation: 'Pelagic fish (sardines, mackerel, tuna) inhabit surface/mid-depth waters and are caught with purse seines. Demersal organisms (prawns, soles, catfish) live on the seabed and are harvested with bottom trawls.',
    hints: [
      'Use the vertical ocean analogy: Pelagic = surface commuters; Demersal = basement/seafloor dwellers.',
      'Sardines and mackerel swim in upper layers; prawns crawl on the sea floor.',
      'Purse seines target surface schools; bottom trawls scrape demersal benthic zones.',
    ],
  },
  // 11. Mineral Classification Drag-Label (Foundation - Understanding)
  {
    id: 'ch_geo_011',
    nodeId: NODE_C12_GEO_026,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each mineral to its correct taxonomic category:',
    dragItems: [
      { label: 'Iron Ore (Barbil/Bailadila)', targetId: 'box_ferrous' },
      { label: 'Bauxite (Aluminium Ore)', targetId: 'box_nonferrous' },
      { label: 'Mica (Kodarma Insulator)', targetId: 'box_nonmetallic' },
      { label: 'Coal (Jharia Fuel)', targetId: 'box_fuel' },
    ],
    correctMapping: {
      box_ferrous: 'Iron Ore (Barbil/Bailadila)',
      box_nonferrous: 'Bauxite (Aluminium Ore)',
      box_nonmetallic: 'Mica (Kodarma Insulator)',
      box_fuel: 'Coal (Jharia Fuel)',
    },
    explanation: 'Iron ore is a ferrous metallic mineral (contains iron). Bauxite is non-ferrous metallic. Mica is an inorganic non-metallic insulator. Coal is a non-metallic fossil fuel mineral.',
    hints: [
      'Does it yield iron? Then it is ferrous.',
      'Bauxite yields aluminium metal, so it is non-ferrous metallic.',
      'Mica provides no metal — it is a heat-resistant non-metallic sheet insulator.',
    ],
    misconceptionIndex: 5,
  },
  // 12. Mineral Distribution & Export (Standard - Application)
  {
    id: 'ch_geo_012',
    nodeId: NODE_C12_GEO_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'High-grade haematite iron ore mined from Bailadila in Chhattisgarh is primarily exported to East Asian markets through which deep-water port?',
    options: [
      'Visakhapatnam Port in Andhra Pradesh',
      'Kolkata Riverine Port on the Hooghly',
      'Kandla Port in the Gulf of Kutch',
      'Tuticorin Port in Tamil Nadu',
    ],
    correctIndex: 0,
    explanation: 'Bailadila (Bastar district, Chhattisgarh) produces exceptionally high-grade haematite, transported by dedicated freight rail to Visakhapatnam port for export to Japan and South Korea.',
    hints: [
      'Look for the major east coast deep-water port in Andhra Pradesh linked to Bastar.',
      'Visakhapatnam has specialised mechanical ore-handling berths.',
      'Bailadila ore flows eastwards to Visakhapatnam.',
    ],
  },
  // 13. Environmental Impacts of Thermal Energy (Standard - Analysis)
  {
    id: 'ch_geo_013',
    nodeId: NODE_C12_GEO_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following correctly pairs the thermal power plant byproduct with its precise environmental hazard?',
    options: [
      'Fly Ash: Heavy metal leaching into groundwater and vast land occupation by ash ponds',
      'Thermal Pollution: High gamma radiation leaks into upper troposphere ozone',
      'CO2 Emissions: Direct poisoning of marine coral skeletons through alpha decay',
      'Sulphur Dioxide: Rapid depletion of underground deep aquifers',
    ],
    correctIndex: 0,
    explanation: 'Coal combustion generates over 200 million tonnes of fly ash containing toxic heavy metals that occupy land in ash ponds and leach into groundwater. Thermal pollution is hot water discharge into rivers.',
    hints: [
      'Recall: Fly ash is the solid particulate residue from electrostatic precipitators in coal plants.',
      'Thermal pollution specifically means discharging hot condenser cooling water into rivers.',
      'Fly ash disposal occupies vast land tracts and leaches toxic metals.',
    ],
    misconceptionIndex: 6,
  },
  // 14. Nuclear Power Stations Map Recall (Foundation - Recall)
  {
    id: 'ch_geo_014',
    nodeId: NODE_C12_GEO_027,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Identify the three premier nuclear power generation centres of India and their respective states:',
    options: [
      'Tarapur (Maharashtra), Kakrapar (Gujarat), Kalpakkam (Tamil Nadu)',
      'Bhakra (Punjab), Hirakud (Odisha), Koyna (Maharashtra)',
      'Jharia (Jharkhand), Raniganj (West Bengal), Digboi (Assam)',
      'Muppandal (Tamil Nadu), Bhadla (Rajasthan), Puga (Ladakh)',
    ],
    correctIndex: 0,
    explanation: 'India’s key established nuclear stations are Tarapur (Maharashtra, commissioned 1969), Kakrapar (Gujarat on Tapi river), and Kalpakkam (Tamil Nadu coast).',
    hints: [
      'Tarapur was India’s first atomic station in Maharashtra.',
      'Kakrapar is in Gujarat; Kalpakkam is on Tamil Nadu’s coast.',
      'Do not confuse hydel dams (Bhakra) or solar parks (Bhadla) with nuclear plants.',
    ],
  },
  // 15. Tidal vs Solar Clue Differentiation (Standard - Analysis)
  {
    id: 'ch_geo_015',
    nodeId: NODE_C12_GEO_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An ISC exam question states: "Harnessed along a vast 7,500 km coastline using the gravitational rise and fall of sea water in the Gulf of Kutch and Khambhat." Identify the energy source:',
    options: [
      'Tidal Energy',
      'Solar Photovoltaic Energy',
      'Wind Energy',
      'Biogas Energy',
    ],
    correctIndex: 0,
    explanation: 'Gravitational ocean water rise and fall in funnel-shaped gulfs (Kutch and Khambhat) defines Tidal Energy. CISCE examiners note students frequently mistake this clue for solar or wind.',
    hints: [
      'The clue specifically mentions "gravitational rise and fall of sea water" and "gulfs".',
      'Gulf of Kutch and Gulf of Khambhat in Gujarat are India’s premier tidal sites.',
      'The source is Tidal Energy.',
    ],
    misconceptionIndex: 7,
  },
  // 16. Non-Conventional Energy Sites Construct (Advanced - Creativity)
  {
    id: 'ch_geo_016',
    nodeId: NODE_C12_GEO_028,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble a sustainable decentralised clean energy blueprint for Ladakh and Rajasthan using matching green sources:',
    availableParts: ['Bhadla Solar Park (Thar Desert)', 'Puga Valley Geothermal Belt', 'Muppandal Wind Turbines', 'Jharia Coal Pit'],
    targetState: 'Bhadla Solar Park (Thar Desert) + Puga Valley Geothermal Belt',
    validationHint: 'Combine the world-scale solar resource of Rajasthan with the Himalayan geothermal resource of Ladakh.',
    explanation: 'Bhadla in Rajasthan leverages extreme desert solar insolation; Puga Valley in Ladakh taps active tectonic subsurface heat in the Himalayan geothermal belt.',
    hints: [
      'Select Rajasthan’s premier solar installation.',
      'Select Ladakh’s premier geothermal valley site.',
      'Click + Bhadla Solar Park then + Puga Valley Geothermal Belt.',
    ],
  },
  // 17. Railway Network Density Factors (Standard - Analysis)
  {
    id: 'ch_geo_017',
    nodeId: NODE_C12_GEO_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the Indian railway network exceptionally dense across the Northern Plains but sparse across the Himalayas and Thar Desert?',
    options: [
      'Northern Plains have flat level topography, dense population, and intensive agro-industrial freight demand; rugged mountains and shifting sands impose high engineering costs',
      'Northern Plains have soft fertile soil that naturally lubricates steel rail tracks',
      'Himalayan mountains have no electricity and are completely prohibited from trade',
      'Rajasthan desert has no daylight hours for train operations',
    ],
    correctIndex: 0,
    explanation: 'Railways require level topography, stable ground, high passenger density, and bulky freight to be viable. Rugged relief, deep gorges, landslides, and shifting sand create prohibitive construction barriers.',
    hints: [
      'CISCE examiner caution: It is "flat terrain", not "fertile soil", that facilitates rail engineering.',
      'Compare level plains with landslide-prone mountain slopes and shifting desert dunes.',
      'Topography + population density + economic freight demand govern rail density.',
    ],
    misconceptionIndex: 8,
  },
  // 18. Harbour vs Port Distinction (Foundation - Recall)
  {
    id: 'ch_geo_018',
    nodeId: NODE_C12_GEO_029,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the precise geographic distinction between a "harbour" and a "port"?',
    options: [
      'A harbour is a sheltered water body for safe ship anchorage; a port is a commercial facility with docks, cranes, warehouses, and customs for cargo handling',
      'A harbour is always on freshwater rivers; a port is always in international polar oceans',
      'A harbour handles only passenger aircraft; a port handles only oil pipelines',
      'A harbour is built entirely on dry land with no water access',
    ],
    correctIndex: 0,
    explanation: 'A harbour is a natural or artificial sheltered stretch of water providing safe anchorage. A port is a commercial terminal equipped with piers, docks, cranes, customs, and transport links for freight and passenger transfer.',
    hints: [
      'Harbour = natural shelter/anchorage where ships stay safe from storms.',
      'Port = commercial infrastructure (docks, warehouses, cranes, customs) for trade.',
      'Every port has a harbour, but a natural harbour is not a port until commercial infrastructure is built.',
    ],
  },
  // 19. Major Ports Locational Advantage (Advanced - Evaluation)
  {
    id: 'ch_geo_019',
    nodeId: NODE_C12_GEO_029,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Match the Indian major port to its specific locational classification and strategic trade advantage:',
    options: [
      'Mumbai: Natural deep-water harbour commanding Arabian Sea trade routes to West Asia and Europe',
      'Kolkata: Open deep-sea fjord with zero river siltation problems',
      'Chennai: Natural landlocked glacial fjord on the Malabar coast',
      'Kochi: Riverine tidal port situated in the foothills of Meghalaya',
    ],
    correctIndex: 0,
    explanation: 'Mumbai is a premier natural deep-water harbour commanding Arabian Sea trade. Kolkata is a riverine tidal port on the Hooghly. Chennai is an artificial east coast harbour. Kochi is a natural sheltered harbour on the Kerala coast.',
    hints: [
      'Mumbai is the natural deep-water gateway on the west coast.',
      'Kolkata is riverine on the Hooghly; Chennai is artificial.',
      'Mumbai commands the strategic western sea routes.',
    ],
  },
  // 20. Mass Communication vs Telecommunication (Foundation - Understanding)
  {
    id: 'ch_geo_020',
    nodeId: NODE_C12_GEO_030,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify cellular phones versus All India Radio (Akashvani) and Doordarshan accurately:',
    options: [
      'Cellular phones are point-to-point Telecommunication (one-to-one); Radio and Doordarshan are Mass Communication (one-to-many)',
      'Cellular phones are Mass Communication broadcast to millions simultaneously without dialling',
      'All India Radio is point-to-point private telecommunication between two individuals',
      'Both are classified as mechanical freight transport modes like pipelines',
    ],
    correctIndex: 0,
    explanation: 'Telecommunication is point-to-point two-way individual messaging (cellular phone, telephone). Mass communication disseminates information simultaneously to millions of uncoordinated receivers (radio, TV, newspapers).',
    hints: [
      'One-to-one individual call = Telecommunication.',
      'One-to-many public broadcast = Mass Communication.',
      'Cellular phones connect specific persons; Radio broadcasts universally to the entire public.',
    ],
    misconceptionIndex: 9,
  },
  // 21. Remote Sensing & GIS in Disaster Mitigation (Advanced - Application)
  {
    id: 'ch_geo_021',
    nodeId: NODE_C12_GEO_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'When a severe cyclone approaches the Odisha coast, how do INSAT, IRS satellites, and GIS coordinate disaster management?',
    options: [
      'INSAT tracks cloud meteorology; IRS maps inundated land cover; GIS overlays population and road layers to execute targeted evacuation',
      'INSAT physically stops ocean storm surges with laser barriers; IRS broadcasts radio songs',
      'GIS is merely a drawing brush tool with no spatial database capabilities',
      'IRS launches physical lifeboats into flooded deltas directly from low earth orbit',
    ],
    correctIndex: 0,
    explanation: 'INSAT provides continuous meteorological tracking and disaster alert relay. IRS captures multispectral surface imagery of flood inundation. GIS overlays elevation, population density, and road network data to route emergency evacuations.',
    hints: [
      'INSAT = Weather imaging & telecommunication warning transponders.',
      'IRS = Earth observation & land surface/flood mapping.',
      'GIS = Spatial data system overlaying roads, topography, and population for evacuation.',
    ],
  },
  // 22. Multimodal Infrastructure Synthesis (Advanced - Creativity)
  {
    id: 'ch_geo_022',
    nodeId: NODE_C12_GEO_029,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the vital transport-energy infrastructure grid for the North-Eastern Hill States (Assam-Meghalaya):',
    availableParts: ['Air Transport for rugged mountain access', 'Naharkatiya-Barauni Crude Oil Pipeline', 'National Waterway on Brahmaputra (Sadiya-Dhubri)', '8-track Broad Gauge Desert Rail'],
    targetState: 'Air Transport for rugged mountain access + Naharkatiya-Barauni Crude Oil Pipeline + National Waterway on Brahmaputra (Sadiya-Dhubri)',
    validationHint: 'Select all modes tailored to NE relief, river flow, and crude oilfields, excluding flat desert infrastructure.',
    explanation: 'The North-East requires air transport to cross rugged relief, the Brahmaputra waterway (Sadiya-Dhubri) for bulk river transport, and the Naharkatiya-Barauni pipeline to move Assam crude without transit spillage.',
    hints: [
      'Include mountain air access.',
      'Include the major Assam crude pipeline.',
      'Include the Brahmaputra river waterway.',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Water Management & Irrigation Simulator',
    instruction: 'Adjust the irrigation mode and power subsidy to observe the water table, salinity crust, and crop yield in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_GEO_021,
  },
  {
    title: 'Agro-Climatic Crop Zoning Matrix',
    instruction: 'Click on different soil-climate zones to match the ideal food and commercial crops (Rice, Bajra, Tea, Cotton).',
    interactionType: 'click-parts',
    nodeId: NODE_C12_GEO_023,
  },
  {
    title: 'Marine vs Inland Fisheries Explorer',
    instruction: 'Toggle coastal depth and gear to inspect pelagic surface sardines versus demersal bottom-dwelling prawns.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_GEO_025,
  },
  {
    title: 'Energy Transition: Conventional vs Green Basket',
    instruction: 'Drag clean energy shares (Solar, Wind, Tidal, Geothermal) to replace coal thermal emissions and cut fly ash.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_GEO_028,
  },
  {
    title: 'Multimodal Transport & Port Network Grid',
    instruction: 'Click key gateways (Mumbai, Visakhapatnam, Kolkata) and pipelines to explore their strategic locational advantage.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_GEO_029,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a semi-arid farm in Rajasthan switches 100% of its land from flood furrow to drip irrigation, what happens to water consumption and crop yield?',
    options: [
      'Water use drops by ~50% while yield increases due to targeted root hydration',
      'Water use doubles due to rapid nozzle evaporation in the desert sun',
      'Crops instantly dry up because drip cannot supply moisture to soils',
      'Soil turns into heavy black clay within 24 hours',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now set the Irrigation Efficiency slider to "Drip Mode (85%)" and verify the water consumption gauge!',
    nodeId: NODE_C12_GEO_021,
  },
  {
    question: 'Predict: What happens to soil salinity in south-west Punjab if flood irrigation continues with 100% subsidised continuous pumping?',
    options: [
      'Water table rises to the surface, and intense evaporation deposits a toxic salt crust',
      'Salinity decreases to zero as salts are pushed into deep volcanic magma',
      'The soil becomes acidic forest soil suitable for Darjeeling tea',
      'No change occurs because water has no chemical interaction with soil minerals',
    ],
    correctIndex: 0,
    verifyInstruction: 'Push the Power Subsidy slider to 100% and watch the Salinity Risk gauge turn critical Red!',
    nodeId: NODE_C12_GEO_021,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Regional Geographer: 2047 Master Plan',
  description: 'Formulate a comprehensive resource development blueprint for an Indian district of your choice (e.g. Jaisalmer, Keonjhar, Malabar Coast, or Brahmaputra Valley).',
  steps: [
    'Assess agro-climatic water balance: deploy drip/sprinkler systems or rainwater harvesting (khadins/tankas/johads).',
    'Select crop rotation (e.g. legume integration) to maintain soil fertility and eliminate chemical degradation.',
    'Map energy transition: pair renewable potential (solar/wind/biomass) with environmental fly ash mitigation.',
    'Design multimodal transport: link local production to major ports (Mumbai, Vizag) via highways, rail, and GIS tracking.',
  ],
};

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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_GEO_021,
  title: 'ISC Class 12: Water Resources, Agriculture, Minerals & Infrastructure',
  definition: 'Comprehensive spatial analysis of India’s water balance, modern irrigation, crop geography, fisheries, mineral-energy resources, and multimodal transport-communication grids.',
  eli5: 'Think of India as a giant living household: rivers and aquifers are the water taps; farms are the kitchen growing rice, wheat, and cash crops; mines and power stations provide the electricity; roads, rails, and ports are the hallways moving goods; and satellites and phones are the nervous system sending instant messages.',
  misconceptions: [
    { misconception: 'Drip irrigation loses massive water through surface evaporation and canal seepage.', correction: 'Evaporation and seepage are canal drawbacks. Drip delivers water directly to roots with 40-60% savings.' },
    { misconception: 'Coffee and tea grow anywhere across north-east hill slopes.', correction: 'Coffee leads in Karnataka (Coorg/Chikmagalur); Tea leads in Assam, Dooars, and Nilgiris.' },
    { misconception: 'Surface water and groundwater are interchangeable terms with no specific boundaries.', correction: 'Surface water = rivers, lakes, reservoirs, tanks. Ground water = water in aquifers tapped by tubewells.' },
    { misconception: 'Crop rotation is the same as crop combination.', correction: 'Rotation = sequential time series on the same plot; Combination = simultaneous mixed planting.' },
    { misconception: 'Kerala leads in all types of inland freshwater fish production.', correction: 'Kerala leads in Marine fish; Andhra Pradesh leads in Inland freshwater fisheries.' },
    { misconception: 'Coal and petroleum are metallic minerals because they are mined from rocks.', correction: 'Coal and petroleum are non-metallic organic hydrocarbon fossil fuels with no metal content.' },
    { misconception: 'Nuclear power is the primary cause of global warming CO2 emissions.', correction: 'Nuclear fission produces zero CO2 flue gases; coal combustion is the principal source of CO2.' },
    { misconception: 'Vast coastline and tidal clues refer to solar photovoltaic panels.', correction: 'Gravitational rise and fall of ocean tides in gulfs indicates Tidal Energy, not solar.' },
    { misconception: 'Soft fertile soil is the governing factor for laying railway tracks.', correction: 'Flat, level terrain enables rail track construction; soil fertility is an agricultural factor.' },
    { misconception: 'Cellular phones are a broadcast medium of mass communication.', correction: 'Cellular phones are point-to-point Telecommunication (one-to-one), unlike mass broadcast radio.' },
  ],
  diagnosticQuestions: [
    { question: 'What percentage of water does drip irrigation typically save over traditional flood irrigation?', options: ['10-15%', '40-60%', '85-95%', '0%'], correctIndex: 1 },
    { question: 'Which state is India’s leading marine fish producer?', options: ['Kerala', 'Andhra Pradesh', 'Bihar', 'Madhya Pradesh'], correctIndex: 0 },
    { question: 'Which mineral is an inorganic non-metallic electrical insulator mined in Jharkhand?', options: ['Bauxite', 'Mica', 'Iron Ore', 'Chromite'], correctIndex: 1 },
    { question: 'Which nuclear power plant is located on the Gujarat coast near Surat?', options: ['Tarapur', 'Kakrapar', 'Kalpakkam', 'Kaiga'], correctIndex: 1 },
    { question: 'What is the world-renowned solar park located in the Thar Desert of Rajasthan?', options: ['Muppandal', 'Bhadla', 'Puga Valley', 'Manikaran'], correctIndex: 1 },
    { question: 'What is the flagship highway project connecting Delhi, Mumbai, Chennai, and Kolkata?', options: ['National Waterway 1', 'Golden Quadrilateral', 'HBJ Pipeline', 'Konkan Railway'], correctIndex: 1 },
    { question: 'Which satellite series is dedicated to Earth observation, land use, and flood mapping?', options: ['INSAT', 'IRS', 'GSAT', 'Aadhaar'], correctIndex: 1 },
    { question: 'What causes soil waterlogging and salinity in south-west Punjab?', options: ['Extreme drought', 'Over-irrigation with subsidised power', 'Excessive organic composting', 'High forest cover'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrates mastery of water resources, modern irrigation, crop zoning, fisheries taxonomy, mineral-energy grids, and transport-communication systems.',
};

function C12_GeographyWaterResourcesIrrigationSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_GEO_021,
  title = DEFAULT_PROPS.title || 'Water Resources, Agriculture & Infrastructure Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interactive Simulation States
  const [irrigationMode, setIrrigationMode] = useState<'flood' | 'sprinkler' | 'drip'>('flood');
  const [powerSubsidy, setPowerSubsidy] = useState<number>(80);
  const [croppingIntensityVal, setCroppingIntensityVal] = useState<number>(180);
  const [selectedCropZone, setSelectedCropZone] = useState<string>('gangetic');
  const [selectedFisheryDepth, setSelectedFisheryDepth] = useState<'pelagic' | 'demersal'>('pelagic');
  const [selectedPortId, setSelectedPortId] = useState<string>('mumbai');
  const [selectedEnergyMix, setSelectedEnergyMix] = useState<{ coal: number; solar: number; wind: number; hydro: number; nuclear: number }>({
    coal: 55,
    solar: 20,
    wind: 10,
    hydro: 10,
    nuclear: 5,
  });

  // Discovery & Predict-Check States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);

  // Challenge execution states
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

  // Drag-and-drop & Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Derived real-time simulation values
  const simCalculations = useMemo(() => {
    const waterEfficiency = irrigationMode === 'drip' ? 0.9 : irrigationMode === 'sprinkler' ? 0.7 : 0.4;
    const waterDemand = Math.round((croppingIntensityVal * 15) / waterEfficiency);
    const waterTableDepth = Math.max(1, Math.min(30, 25 - (powerSubsidy * 0.2) + (irrigationMode === 'flood' ? 12 : -5)));
    const salinityRisk = Math.min(100, Math.max(0, Math.round((powerSubsidy * 0.6) + (irrigationMode === 'flood' ? 40 : -30))));
    const cropYield = Math.min(100, Math.round((croppingIntensityVal * 0.4) + (waterEfficiency * 40) - (salinityRisk > 60 ? 30 : 0)));

    const coalCO2Emissions = selectedEnergyMix.coal * 18.5;
    const flyAshTonnes = Math.round(selectedEnergyMix.coal * 3.8);
    const cleanShare = selectedEnergyMix.solar + selectedEnergyMix.wind + selectedEnergyMix.hydro + selectedEnergyMix.nuclear;

    return {
      waterDemand,
      waterTableDepth,
      salinityRisk,
      cropYield,
      coalCO2Emissions,
      flyAshTonnes,
      cleanShare,
    };
  }, [irrigationMode, powerSubsidy, croppingIntensityVal, selectedEnergyMix]);

  // Chart data
  const agroChartData = useMemo(() => [
    { name: 'Water (m³)', value: simCalculations.waterDemand, benchmark: 2500 },
    { name: 'Salinity', value: simCalculations.salinityRisk, benchmark: 40 },
    { name: 'Yield (q/ha)', value: simCalculations.cropYield, benchmark: 65 },
    { name: 'Clean %', value: simCalculations.cleanShare, benchmark: 50 },
  ], [simCalculations]);

  // Load mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive mastery effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // 2D canvas water flow animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waterY = Math.min(canvas.height - 10, Math.max(20, canvas.height - simCalculations.waterTableDepth * 3));
      
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 0, canvas.width, waterY);

      ctx.fillStyle = '#0284c7';
      ctx.fillRect(0, waterY, canvas.width, canvas.height - waterY);

      if (simCalculations.salinityRisk > 50) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillRect(0, 0, canvas.width, 6);
      }

      ctx.fillStyle = '#38bdf8';
      const dropletSpeed = irrigationMode === 'drip' ? 1 : irrigationMode === 'sprinkler' ? 3 : 5;
      for (let i = 0; i < 12; i++) {
        const dropX = ((frame * dropletSpeed + i * 35) % canvas.width);
        const dropY = 10 + Math.sin((frame + i * 10) * 0.08) * 4;
        ctx.beginPath();
        ctx.arc(dropX, dropY, irrigationMode === 'drip' ? 2 : 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simCalculations, irrigationMode]);

  // Auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Superb! You understand groundwater dynamics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate the variables and observe.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are in the free exploration sandbox. Test any configuration with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Ready for board challenges! Use your geographical reasoning to answer.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify.');
  }, []);

  const handleIrrigationChange = useCallback((mode: 'flood' | 'sprinkler' | 'drip') => {
    setIrrigationMode(mode);
    audioManager.play('tap');
  }, []);

  const handleSubsidyChange = useCallback((val: number) => {
    setPowerSubsidy(val);
    audioManager.play('count');
  }, []);

  const handleIntensityChange = useCallback((val: number) => {
    setCroppingIntensityVal(val);
    audioManager.play('count');
  }, []);

  const handleCropZoneSelect = useCallback((zone: string) => {
    setSelectedCropZone(zone);
    audioManager.play('tap');
  }, []);

  const handleFisherySelect = useCallback((depth: 'pelagic' | 'demersal') => {
    setSelectedFisheryDepth(depth);
    audioManager.play('tap');
  }, []);

  const handlePortSelect = useCallback((port: string) => {
    setSelectedPortId(port);
    audioManager.play('tap');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the comprehensive Class 12 Geography simulation.');
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

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent geographical insight.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the detailed ISC textbook solution.');
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

  const getMotivationalFeedback = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount <= 3) return 'Great work!';
    if (errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── SIMULATION HEADER ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 rounded-2xl border border-slate-700"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-3xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ISC Class 12 Humanities
              </span>
              <span className="text-xs text-slate-400">c12_geo_021 to 030</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-700/60 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-lg font-semibold capitalize transition-all ${
                phase === p 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-800 to-indigo-950/60 rounded-2xl border border-emerald-500/30 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
              <span className="text-xl">🗺️</span>
              <h2 className="text-lg font-bold">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-slate-700/50 text-xs text-slate-300">
              <span className="text-amber-400 font-bold">Context: </span>
              {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <span>⚡</span> Curiosity Discovery Challenge (Low Stakes)
            </div>
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-400 text-emerald-100 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-900 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! You identified the waterlogging-salinisation paradox.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 text-sm"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION LABS PHASE ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-6"
            >
              {/* Slide Title and Instruction */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700 font-mono">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              <p className="text-sm text-amber-300 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* Lab Slide 0 */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-700">
                    <div>
                      <label className="text-xs font-bold text-slate-300 uppercase">Irrigation Technology</label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {(['flood', 'sprinkler', 'drip'] as const).map((mode) => (
                          <motion.button
                            key={mode}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleIrrigationChange(mode)}
                            className={`py-2 px-3 rounded-lg text-xs font-bold capitalize border ${
                              irrigationMode === mode
                                ? 'bg-emerald-600 border-emerald-400 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {mode}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                        <span>Electricity Subsidy (Tubewell Pumping)</span>
                        <span className="text-amber-400">{powerSubsidy}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={powerSubsidy}
                        onChange={(e) => handleSubsidyChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Power subsidy slider"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                        <span>Target Cropping Intensity</span>
                        <span className="text-indigo-300">{croppingIntensityVal}%</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={250}
                        step={5}
                        value={croppingIntensityVal}
                        onChange={(e) => handleIntensityChange(Number(e.target.value))}
                        className="w-full accent-indigo-500 cursor-pointer"
                        aria-label="Cropping intensity slider"
                      />
                    </div>

                    <div className="p-3 bg-slate-800/90 rounded-lg border border-slate-700 text-xs space-y-2">
                      <span className="text-emerald-400 font-bold">Predict-Then-Check:</span>
                      {!predictionMade ? (
                        <div>
                          <p className="text-slate-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                          <div className="space-y-1">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.01 }}
                                onClick={() => handlePrediction(i)}
                                className="w-full text-left p-1.5 rounded bg-slate-900 hover:bg-slate-750 text-slate-300 text-xs border border-slate-700"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-emerald-300">
                          ✓ Prediction stored! Drag the sliders and check the live gauges on the right.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-4">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="text-xs font-bold text-slate-400 mb-1 flex justify-between">
                        <span>Hydrogeological Subsurface Profile (Canvas Animation)</span>
                        <span className="text-sky-400 font-mono">Water Table Depth: {simCalculations.waterTableDepth}m</span>
                      </div>
                      <canvas ref={canvasRef} width={480} height={140} className="w-full rounded-lg bg-slate-900 border border-slate-800" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700/60 text-center">
                        <div className="text-[11px] text-slate-400">Water Demand</div>
                        <div className="text-sm md:text-base font-bold text-sky-400 font-mono">{simCalculations.waterDemand} m³</div>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700/60 text-center">
                        <div className="text-[11px] text-slate-400">Water Table</div>
                        <div className={`text-sm md:text-base font-bold font-mono ${simCalculations.waterTableDepth < 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {simCalculations.waterTableDepth < 5 ? 'Waterlogged!' : `${simCalculations.waterTableDepth} m`}
                        </div>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700/60 text-center">
                        <div className="text-[11px] text-slate-400">Salinity Risk</div>
                        <div className={`text-sm md:text-base font-bold font-mono ${simCalculations.salinityRisk > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {simCalculations.salinityRisk}%
                        </div>
                      </div>
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700/60 text-center">
                        <div className="text-[11px] text-slate-400">Expected Yield</div>
                        <div className="text-sm md:text-base font-bold text-emerald-400 font-mono">{simCalculations.cropYield} q/ha</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Slide 1 */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-6 space-y-3">
                    <span className="text-xs font-bold text-slate-300 uppercase">Select Agro-Climatic Region</span>
                    {[
                      { id: 'gangetic', name: 'Ganga-Brahmaputra Delta (WB/UP)', soil: 'Alluvial Clay Loam', rain: '150-250 cm', crops: 'Rice (Kharif), Sugarcane, Jute' },
                      { id: 'thar', name: 'Thar Desert Fringe (Rajasthan)', soil: 'Sandy Arid Loam', rain: '25-50 cm', crops: 'Bajra, Gram, Pulses (Dry Farming)' },
                      { id: 'deccan', name: 'Deccan Lava Plateau (MH/Gujarat)', soil: 'Regur (Black Clay)', rain: '50-100 cm', crops: 'Cotton (Bt), Jowar (Kharif/Rabi)' },
                      { id: 'assam', name: 'Assam & Nilgiri Hill Slopes', soil: 'Acidic Virgin Forest Soil', rain: '200-300 cm', crops: 'Tea (Assam), Coffee (Karnataka Hills)' },
                    ].map((zone) => (
                      <motion.button
                        key={zone.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCropZoneSelect(zone.id)}
                        className={`w-full p-3 rounded-xl text-left border transition-all ${
                          selectedCropZone === zone.id
                            ? 'bg-emerald-900/60 border-emerald-400 shadow-md'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-750'
                        }`}
                      >
                        <div className="font-bold text-sm text-white">{zone.name}</div>
                        <div className="text-xs text-slate-400 mt-1">
                          <span className="text-amber-300">Soil: </span>{zone.soil} | <span className="text-sky-300">Rain: </span>{zone.rain}
                        </div>
                        <div className="text-xs text-emerald-300 font-semibold mt-0.5">
                          Dominant Crops: {zone.crops}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="md:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="text-xs font-bold text-slate-400 mb-2">Regional Agro-Ecosystem Diagnostic</div>
                    <svg viewBox="0 0 360 200" className="w-full rounded-lg bg-slate-900 border border-slate-800">
                      <rect x="20" y="140" width="320" height="40" rx="4" fill={selectedCropZone === 'deccan' ? '#18181b' : selectedCropZone === 'thar' ? '#ca8a04' : selectedCropZone === 'assam' ? '#451a03' : '#365314'} />
                      <text x="180" y="165" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        {selectedCropZone === 'deccan' ? 'Regur / Black Basaltic Soil' : selectedCropZone === 'thar' ? 'Sandy Desert Soil' : selectedCropZone === 'assam' ? 'Acidic Well-Drained Forest Slopes' : 'Alluvial Fertile Clay Loam'}
                      </text>

                      {selectedCropZone === 'gangetic' && (
                        <g>
                          <circle cx="100" cy="90" r="18" fill="#15803d" />
                          <circle cx="180" cy="80" r="22" fill="#16a34a" />
                          <circle cx="260" cy="90" r="18" fill="#15803d" />
                          <text x="180" y="120" textAnchor="middle" fill="#86efac" fontSize="10">Paddy Fields & Jute (High Moisture)</text>
                        </g>
                      )}
                      {selectedCropZone === 'thar' && (
                        <g>
                          <line x1="80" y1="140" x2="80" y2="80" stroke="#facc15" strokeWidth="4" />
                          <line x1="180" y1="140" x2="180" y2="70" stroke="#facc15" strokeWidth="4" />
                          <line x1="280" y1="140" x2="280" y2="80" stroke="#facc15" strokeWidth="4" />
                          <text x="180" y="55" textAnchor="middle" fill="#fde047" fontSize="10">Bajra / Gram (Drought Hardy Millets)</text>
                        </g>
                      )}
                      {selectedCropZone === 'deccan' && (
                        <g>
                          <circle cx="120" cy="100" r="12" fill="#ffffff" />
                          <circle cx="180" cy="90" r="14" fill="#ffffff" />
                          <circle cx="240" cy="100" r="12" fill="#ffffff" />
                          <text x="180" y="60" textAnchor="middle" fill="#e2e8f0" fontSize="10">Bt Cotton Bolls & Sorghum (Jowar)</text>
                        </g>
                      )}
                      {selectedCropZone === 'assam' && (
                        <g>
                          <path d="M 40 140 Q 180 40 320 140" fill="none" stroke="#22c55e" strokeWidth="6" />
                          <text x="180" y="80" textAnchor="middle" fill="#86efac" fontSize="10">Contoured Tea Slopes (Prevents Waterlogging)</text>
                        </g>
                      )}
                    </svg>

                    <div className="mt-3 p-2.5 bg-slate-900 rounded-lg text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">CISCE Focus: </span>
                      Always pair crop with exact soil type, temperature, rainfall, and state leadership.
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Slide 2 */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-4">
                    <span className="text-xs font-bold text-slate-300 uppercase">Select Ocean Stratum</span>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFisherySelect('pelagic')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold ${
                          selectedFisheryDepth === 'pelagic'
                            ? 'bg-sky-900/70 border-sky-400 text-sky-100'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div>🐟 Pelagic Fishing</div>
                        <div className="text-[10px] font-normal text-slate-400 mt-1">Surface & Mid-water (Sardines, Mackerel, Tuna)</div>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFisherySelect('demersal')}
                        className={`p-3 rounded-xl border text-left text-xs font-bold ${
                          selectedFisheryDepth === 'demersal'
                            ? 'bg-indigo-900/70 border-indigo-400 text-indigo-100'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div>🦐 Demersal Fishing</div>
                        <div className="text-[10px] font-normal text-slate-400 mt-1">Seafloor / Benthic (Prawns, Flatfish, Soles)</div>
                      </motion.button>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs space-y-2">
                      <div className="text-emerald-400 font-bold">State Production Leaders:</div>
                      <div className="text-slate-300">
                        • <span className="text-amber-300 font-semibold">Kerala:</span> Leading marine fish producer (Kochi Harbour, backwater inshore).
                      </div>
                      <div className="text-slate-300">
                        • <span className="text-sky-300 font-semibold">Andhra Pradesh:</span> Leading inland fish producer (reservoirs, tanks, aquaculture).
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 200" className="w-full rounded-lg bg-gradient-to-b from-sky-900 via-blue-950 to-slate-950 border border-slate-800">
                      <line x1="0" y1="30" x2="400" y2="30" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 3" />
                      <text x="30" y="22" fill="#7dd3fc" fontSize="9">Sea Surface</text>

                      <path d="M 0 60 Q 200 80 400 180" fill="none" stroke="#64748b" strokeWidth="4" />
                      <text x="300" y="160" fill="#94a3b8" fontSize="9">Continental Shelf</text>

                      {selectedFisheryDepth === 'pelagic' && (
                        <g>
                          <rect x="60" y="40" width="280" height="45" rx="6" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" />
                          <text x="200" y="65" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="bold">
                            Pelagic Zone: Sardines, Mackerel, Tuna
                          </text>
                          <text x="200" y="78" textAnchor="middle" fill="#bae6fd" fontSize="9">
                            Harvested with Purse Seine & Drift Nets
                          </text>
                        </g>
                      )}

                      {selectedFisheryDepth === 'demersal' && (
                        <g>
                          <rect x="150" y="120" width="230" height="50" rx="6" fill="rgba(99, 102, 241, 0.25)" stroke="#818cf8" />
                          <text x="265" y="145" textAnchor="middle" fill="#ede9fe" fontSize="11" fontWeight="bold">
                            Demersal Zone: Prawns, Flatfish, Catfish
                          </text>
                          <text x="265" y="158" textAnchor="middle" fill="#ddd6fe" fontSize="9">
                            Harvested with Heavy Bottom Trawls
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* Lab Slide 3 */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-6 space-y-3 bg-slate-900/90 p-4 rounded-xl border border-slate-700">
                    <span className="text-xs font-bold text-slate-300 uppercase">Power Basket Composition (%)</span>
                    
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Coal Thermal Base (Jharkhand / Odisha / Chhattisgarh)</span>
                        <span className="text-rose-400 font-mono">{selectedEnergyMix.coal}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={80}
                        value={selectedEnergyMix.coal}
                        onChange={(e) => {
                          const coal = Number(e.target.value);
                          const rem = 100 - coal;
                          setSelectedEnergyMix({
                            coal,
                            solar: Math.round(rem * 0.45),
                            wind: Math.round(rem * 0.25),
                            hydro: Math.round(rem * 0.2),
                            nuclear: rem - Math.round(rem * 0.45) - Math.round(rem * 0.25) - Math.round(rem * 0.2),
                          });
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Coal energy share"
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <div className="text-amber-400 font-bold">Solar</div>
                        <div className="font-mono text-slate-200">{selectedEnergyMix.solar}%</div>
                        <div className="text-[9px] text-slate-400">Bhadla (RJ)</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <div className="text-sky-400 font-bold">Wind</div>
                        <div className="font-mono text-slate-200">{selectedEnergyMix.wind}%</div>
                        <div className="text-[9px] text-slate-400">Muppandal</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <div className="text-blue-400 font-bold">Hydro</div>
                        <div className="font-mono text-slate-200">{selectedEnergyMix.hydro}%</div>
                        <div className="text-[9px] text-slate-400">Bhakra</div>
                      </div>
                      <div className="p-2 bg-slate-800 rounded-lg">
                        <div className="text-emerald-400 font-bold">Nuclear</div>
                        <div className="font-mono text-slate-200">{selectedEnergyMix.nuclear}%</div>
                        <div className="text-[9px] text-slate-400">Tarapur</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">Environmental Impact Projections</div>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={agroChartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                          <YAxis stroke="#94a3b8" fontSize={10} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Slide 4 */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5 space-y-3">
                    <span className="text-xs font-bold text-slate-300 uppercase">Strategic Trade Gateways</span>
                    {[
                      { id: 'mumbai', name: 'Mumbai Port (Maharashtra)', type: 'Natural Harbour', advantage: 'Commands Arabian Sea routes to Europe & Gulf; links east-west coasts.' },
                      { id: 'vizag', name: 'Visakhapatnam (Andhra Pradesh)', type: 'Deep-Water Port', advantage: 'Specialised mechanical handling for Bailadila iron ore exports.' },
                      { id: 'kolkata', name: 'Kolkata Port (West Bengal)', type: 'Riverine Tidal Port', advantage: 'Serves Eastern & North-Eastern hinterland along Hooghly river.' },
                      { id: 'kochi', name: 'Kochi Port (Kerala Coast)', type: 'Natural Harbour', advantage: 'Sheltered lagoon handling spice, coir, and marine trade.' },
                    ].map((port) => (
                      <motion.button
                        key={port.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePortSelect(port.id)}
                        className={`w-full p-2.5 rounded-xl text-left border ${
                          selectedPortId === port.id
                            ? 'bg-emerald-900/60 border-emerald-400'
                            : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{port.name}</div>
                        <div className="text-[10px] text-amber-300 font-semibold">{port.type}</div>
                        <div className="text-[11px] text-slate-300 mt-0.5">{port.advantage}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="md:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs font-bold text-slate-400 mb-2">Golden Quadrilateral & National Pipelines</div>
                    <svg viewBox="0 0 360 220" className="w-full rounded-lg bg-slate-900 border border-slate-800">
                      <polygon points="180,30 80,120 180,190 280,100" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="5 3" />
                      <text x="180" y="25" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Delhi</text>
                      <text x="65" y="125" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Mumbai</text>
                      <text x="180" y="205" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Chennai</text>
                      <text x="295" y="105" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Kolkata</text>

                      <path d="M 90 110 Q 140 80 200 60" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                      <text x="140" y="75" fill="#67e8f9" fontSize="8">HBJ Gas Pipeline</text>

                      <circle cx="80" cy="120" r="6" fill={selectedPortId === 'mumbai' ? '#10b981' : '#ef4444'} />
                      <circle cx="260" cy="130" r="6" fill={selectedPortId === 'vizag' ? '#10b981' : '#ef4444'} />
                      <circle cx="280" cy="100" r="6" fill={selectedPortId === 'kolkata' ? '#10b981' : '#ef4444'} />
                      <circle cx="120" cy="180" r="6" fill={selectedPortId === 'kochi' ? '#10b981' : '#ef4444'} />
                    </svg>
                  </div>
                </div>
              )}

              {/* Slide Navigation Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-bold text-white"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs font-bold text-slate-400 font-mono">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg"
                  >
                    Open Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="p-6 bg-slate-800 rounded-2xl border border-slate-700 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white">Free Resource Management Sandbox</h2>
              <p className="text-xs text-slate-400">Experiment freely across irrigation, agro-zoning, and power grids with zero grading penalty.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
            >
              Start Board Exam Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">Irrigation Control</span>
              <div className="grid grid-cols-3 gap-1">
                {(['flood', 'sprinkler', 'drip'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => handleIrrigationChange(m)}
                    className={`py-1.5 rounded text-xs font-bold capitalize ${irrigationMode === m ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="text-xs text-slate-400">
                Water Table: <span className="text-white font-mono">{simCalculations.waterTableDepth}m</span> | Salinity: <span className="text-white font-mono">{simCalculations.salinityRisk}%</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-sky-400 uppercase">Cropping Intensity</span>
              <input
                type="range"
                min={100}
                max={250}
                value={croppingIntensityVal}
                onChange={(e) => handleIntensityChange(Number(e.target.value))}
                className="w-full accent-sky-500"
                aria-label="Cropping intensity"
              />
              <div className="text-xs text-slate-400">
                Intensity: <span className="text-white font-mono">{croppingIntensityVal}%</span> | Yield: <span className="text-white font-mono">{simCalculations.cropYield} q/ha</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase">Thermal Coal Share</span>
              <input
                type="range"
                min={10}
                max={80}
                value={selectedEnergyMix.coal}
                onChange={(e) => setSelectedEnergyMix(prev => ({ ...prev, coal: Number(e.target.value) }))}
                className="w-full accent-amber-500"
                aria-label="Coal share"
              />
              <div className="text-xs text-slate-400">
                Coal: <span className="text-white font-mono">{selectedEnergyMix.coal}%</span> | Clean: <span className="text-emerald-400 font-mono">{100 - selectedEnergyMix.coal}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800 rounded-2xl border border-slate-700">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-indigo-300 font-mono border border-slate-700">
                  {challenge.nodeId}
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">
                Competency: <span className="text-emerald-400 uppercase">{challenge.competencyLevel}</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                  difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs font-mono text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/40'
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-400 text-emerald-100 shadow-md'
                        : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900 rounded-xl border border-slate-700">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'box_ferrous', title: 'Ferrous Metallic Mineral' },
                    { id: 'box_nonferrous', title: 'Non-Ferrous Metallic Mineral' },
                    { id: 'box_nonmetallic', title: 'Non-Metallic Insulator Mineral' },
                    { id: 'box_fuel', title: 'Non-Metallic Fuel Mineral' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <div className="text-xs font-bold text-slate-400">{target.title}</div>
                      <div className="text-sm font-bold text-emerald-400 mt-1">
                        {droppedLabels[target.id] || 'Drop matching mineral here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Taxonomic Mapping →
                </motion.button>
              </div>
            )}

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
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Ordered Sequence →
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-emerald-500 outline-none"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300 font-medium">👉 {challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs font-bold text-slate-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700/80 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-900/80 border border-emerald-500/50 rounded-lg text-xs font-bold text-emerald-200 flex items-center gap-2">
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-rose-200 font-bold">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to assemble blueprint</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow"
                >
                  Validate Constructed Blueprint →
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-900/90 rounded-xl border border-emerald-500/40 space-y-3"
              >
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Step-by-Step Geographical Explanation
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sent, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}. </span>
                      {sent}{!sent.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-slate-800 rounded-3xl border border-slate-700 space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="text-4xl">🏆</div>
            <h2 className="text-2xl font-black text-white">ISC Class 12 Master Certificate</h2>
            <p className="text-sm text-slate-400">Geography & Resource Management Synthesis Completed</p>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="mt-3 inline-block px-5 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-extrabold text-base md:text-lg shadow-md">
              {getMotivationalFeedback(errors)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">Final Score</div>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                {Math.max(0, 100 - errors * 5)}%
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">BKT Mastery Level</div>
              <div className="text-xl font-black text-indigo-300 capitalize mt-2">
                {masteryLevel}
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-700 text-center">
              <div className="text-xs text-slate-400 font-bold uppercase">Spaced Review Interval</div>
              <div className="text-xl font-black text-amber-300 font-mono mt-2">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </div>
            </div>
          </div>

          {/* ─── EXPLICIT SPACED REPETITION (SRS) VISIBILITY BANNER ─── */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
                📅
              </div>
              <div>
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <span>Spaced Repetition System (SRS)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-[10px] text-amber-300 font-mono">SM-2 Algorithm</span>
                </div>
                <h4 className="text-base font-bold text-white mt-0.5">
                  Recommended Next Review: <span className="text-amber-300">{errors === 0 ? 'Review in 7 days (Mastered)' : errors <= 3 ? 'Review in 3 days (Reinforce)' : 'Review in 1 day (Review Soon)'}</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  {errors === 0 
                    ? 'Flawless recall! An optimal 7-day interval will consolidate this concept into long-term memory.'
                    : errors <= 3
                    ? 'Solid grasp with minor slips. A 3-day spaced review will bridge remaining knowledge gaps.'
                    : 'Multiple learning traps encountered. A quick 1-day review tomorrow will prevent memory decay.'}
                </p>
              </div>
            </div>
            <div className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-900 border border-amber-500/40 text-center shadow-inner">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Next Session</div>
              <div className="text-sm font-black text-amber-300 font-mono">
                {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
              </div>
            </div>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personalised Misconception Diagnosis
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Trapped: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Scientific Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-700/50 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>🧭</span> Capstone Project: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">{i + 1}. </span>
                  {st}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setCurrentChallenge(0);
                setErrors(0);
                setScoreBreakdown({ correct: 0, total: 0 });
                setDiscoveryAnswered(false);
              }}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg"
            >
              Restart Full Simulation 🔄
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed with Flying Colors!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_GeographyWaterResourcesIrrigationSim;