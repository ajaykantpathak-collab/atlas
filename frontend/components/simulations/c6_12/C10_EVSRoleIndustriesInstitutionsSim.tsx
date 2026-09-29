'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE IDENTIFIERS ───
const NODE_C10_EVS_011 = 'c10_evs_011'; // Role of industries, institutions, communities in climate action
const NODE_C10_EVS_012 = 'c10_evs_012'; // Green building concept and green infrastructure
const NODE_C10_EVS_013 = 'c10_evs_013'; // Sustainable mobility - bike lanes, public transport, EVs
const NODE_C10_EVS_014 = 'c10_evs_014'; // Nature-based Solutions (NbS) approach
const NODE_C10_EVS_015 = 'c10_evs_015'; // Environmental applications of GIS and remote sensing
const NODE_C10_EVS_016 = 'c10_evs_016'; // AI and IoT in environmental monitoring
const NODE_C10_EVS_017 = 'c10_evs_017'; // Biotechnology innovations - bioplastic, enzyme-based solutions
const NODE_C10_EVS_018 = 'c10_evs_018'; // 5Rs of sustainability - rethink, reduce, reuse, repurpose, recycle
const NODE_C10_EVS_019 = 'c10_evs_019'; // Green skills and green jobs - skill council initiatives
const NODE_C10_EVS_020 = 'c10_evs_020'; // Eco-clubs and green initiatives in schools
const NODE_C10_EVS_021 = 'c10_evs_021'; // Sustainable lifestyle choices - eco-transport, eco-fashion, local food

const ALL_EVS_NODE_IDS = [
  NODE_C10_EVS_011,
  NODE_C10_EVS_012,
  NODE_C10_EVS_013,
  NODE_C10_EVS_014,
  NODE_C10_EVS_015,
  NODE_C10_EVS_016,
  NODE_C10_EVS_017,
  NODE_C10_EVS_018,
  NODE_C10_EVS_019,
  NODE_C10_EVS_020,
  NODE_C10_EVS_021,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Net-Zero: The Eco-City Transformation',
  intro: 'The industrial city of Kalyanpur is facing severe smog, flash floods, municipal waste overflows, and soaring carbon emissions. The State Environmental Task Force has appointed you as Chief Sustainability Strategist.',
  context: 'To achieve ecological resilience and net-zero emissions, you must align four key sectors: Clean Industries & Policy, Smart Green Infrastructure, Nature-based Bio-solutions, and Community Action with School Eco-Clubs.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Kalyanpur replaces 50,000 private petrol scooters with electric buses and dedicated cycle tracks. What is the most immediate ecological impact on the city centre?',
  options: [
    'Zero total global carbon emissions everywhere immediately',
    'Drastic cut in local tailpipe PM2.5 & NOx pollution, reduced road congestion',
    'Elimination of all power grid electricity demand',
    'Immediate complete replenishment of deep groundwater aquifers',
  ],
  correctIndex: 1,
  hintAfter: 'EVs eliminate tailpipe emissions at point of use, immediately improving urban air quality and freeing up road space!',
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
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 COMPLIANT) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c10_evs_011)
  {
    id: 'ch_evs_001',
    nodeId: NODE_C10_EVS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the National Action Plan on Climate Change (NAPCC, 2008), what is the flagship target of the National Solar Mission?',
    options: ['Deploying 100 GW of solar capacity', 'Mandating 100% nuclear power by 2030', 'Banning all coal mining by 2025', 'Supplying free diesel generators to farms'],
    correctIndex: 0,
    explanation: 'The National Solar Mission, one of the eight NAPCC missions, initially set and drove targets to scale solar capacity up to 100 GW across India.',
    hints: [
      'Think about India’s national target for solar energy across utility and rooftop installations.',
      'The mission targets a clean energy milestone in gigawatts (GW).',
      'The specific NAPCC solar target is 100 GW.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Understanding (c10_evs_012)
  {
    id: 'ch_evs_002',
    nodeId: NODE_C10_EVS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do IGBC and GRIHA differ in their administration in India?',
    options: [
      'IGBC is industry-led by CII; GRIHA is developed by TERI and adopted by the Government of India',
      'IGBC is for tree planting; GRIHA is only for road construction',
      'IGBC gives star ratings (1 to 5 stars); GRIHA gives Platinum, Gold, Silver',
      'They are identical commercial brands owned by foreign oil companies',
    ],
    correctIndex: 0,
    explanation: 'IGBC is an industry initiative under the Confederation of Indian Industry (CII) awarding Certified to Platinum ratings. GRIHA was developed by TERI, adopted by the Ministry of New and Renewable Energy, and awards 1 to 5 stars.',
    hints: [
      'Recall which council is linked to CII and which system was developed by TERI.',
      'One is an industry council, the other is an indigenous national rating framework adopted by the government.',
      'IGBC = CII (Certified/Silver/Gold/Platinum); GRIHA = TERI/Govt of India (1-5 Stars).',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag Label (c10_evs_012)
  {
    id: 'ch_evs_003',
    nodeId: NODE_C10_EVS_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the green public infrastructure features on the urban drainage diagram.',
    dragItems: [
      { label: 'Bioswale (Vegetated Channel)', targetId: 'infra_drain' },
      { label: 'Green Roof (Living Plants)', targetId: 'infra_roof' },
      { label: 'Permeable Pavement', targetId: 'infra_pave' },
      { label: 'Rainwater Cistern', targetId: 'infra_tank' },
    ],
    correctMapping: {
      infra_drain: 'Bioswale (Vegetated Channel)',
      infra_roof: 'Green Roof (Living Plants)',
      infra_pave: 'Permeable Pavement',
      infra_tank: 'Rainwater Cistern',
    },
    explanation: 'Green roofs cool buildings via evapotranspiration; permeable pavements let rain infiltrate soil; bioswales filter roadway runoff; rainwater cisterns store roof runoff for reuse.',
    hints: [
      'Match the top building surface with the vegetated roof label.',
      'The porous ground surface is the permeable pavement.',
      'The roadside vegetated ditch is the bioswale; the storage unit is the cistern.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation - Recall (c10_evs_014)
  {
    id: 'ch_evs_004',
    nodeId: NODE_C10_EVS_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which bacterium forms symbiotic root nodules on leguminous crops (peas, gram) to fix atmospheric nitrogen into ammonia?',
    options: ['Rhizobium', 'Azotobacter (free-living)', 'E. coli', 'Lactobacillus'],
    correctIndex: 0,
    explanation: 'Rhizobium forms symbiotic nodules in legume roots, converting atmospheric N2 into plant-usable ammonia (NH3), acting as a natural biofertilizer.',
    hints: [
      'Look for the symbiotic bacterium specifically associated with legume root nodules.',
      'Azotobacter is free-living in soil; this one lives inside root nodules.',
      'The correct symbiotic bacterium is Rhizobium.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Drag Sort (c10_evs_018)
  {
    id: 'ch_evs_005',
    nodeId: NODE_C10_EVS_018,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 5Rs of sustainability in strict descending order of priority (most preferred to least preferred).',
    sortItems: ['Rethink (question purchase)', 'Reduce (minimise at source)', 'Reuse (multiple uses)', 'Repurpose (upcycle creatively)', 'Recycle (reprocess material)'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The 5R hierarchy ranks waste interventions: Rethink > Reduce > Reuse > Repurpose > Recycle. Higher levels prevent waste and conserve 100% of embedded energy.',
    hints: [
      'Questioning consumption comes before anything else.',
      'Reducing at source precedes reusing, which precedes upcycling (repurposing).',
      'Recycling is the last fallback because reprocessing still requires energy and water.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Recall (c10_evs_019)
  {
    id: 'ch_evs_006',
    nodeId: NODE_C10_EVS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Skill Council for Green Jobs (SCGJ) was established by the Government of India under which national mission?',
    options: [
      'National Skill Development Mission',
      'National Highway Expansion Project',
      'Space Exploration Programme',
      'National Petroleum Board',
    ],
    correctIndex: 0,
    explanation: 'SCGJ is an initiative launched under the National Skill Development Mission to train and certify India’s workforce for renewable energy, waste management, and green jobs.',
    hints: [
      'It is a government workforce development initiative.',
      'Look for the mission focused on vocational skill development across India.',
      'It was launched under the National Skill Development Mission.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Recall (c10_evs_020)
  {
    id: 'ch_evs_020',
    nodeId: NODE_C10_EVS_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In school waste segregation at source, what are the standard color codes for dry recyclables and wet biodegradable waste?',
    options: [
      'Blue for Dry Waste (paper/plastic/metal) & Green for Wet Waste (food/canteen peels)',
      'Black for all mixed waste together',
      'Red for edible food & Yellow for glass',
      'Green for plastic bottles & Blue for rotten fruit',
    ],
    correctIndex: 0,
    explanation: 'Segregation at source mandates Blue bins for dry recyclables (paper, plastic, metal) and Green bins for wet biodegradable waste (canteen scraps, fruit peels).',
    hints: [
      'Blue represents dry recyclable items like clean paper and plastic.',
      'Green represents organic, wet, compostable kitchen and leaf waste.',
      'Blue = Dry, Green = Wet.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Standard - Application (c10_evs_013)
  {
    id: 'ch_evs_008',
    nodeId: NODE_C10_EVS_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A single-occupancy petrol car emits 140 g CO2/km. If an electric bus carries 35 passengers and consumes 1.2 kWh/km (grid emission factor: 700 g CO2/kWh), what is the CO2 emission per passenger-km on the bus in grams? (Round to nearest integer)',
    correctAnswer: 24,
    tolerance: 1,
    unit: 'g CO2/passenger-km',
    explanation: 'Total bus emission = 1.2 kWh/km × 700 g/kWh = 840 g CO2/km. Per passenger-km = 840 / 35 = 24 g CO2. This cuts emissions by over 82% compared to 140 g/km in a solo car!',
    hints: [
      'First calculate the total bus emission per km: 1.2 × 700.',
      'Total bus CO2 is 840 grams per km.',
      'Divide 840 g by 35 passengers to get grams per passenger-km.',
    ],
    misconceptionIndex: 2,
  },
  // 9. Standard - Application (c10_evs_015)
  {
    id: 'ch_evs_009',
    nodeId: NODE_C10_EVS_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A state forestry department wants to detect illegal timber felling occurring under heavy monsoon cloud cover at night in the Western Ghats. Which sensor technology must they deploy?',
    options: [
      'Active Microwave RADAR or airborne LiDAR (penetrates clouds & functions in darkness)',
      'Passive optical sensor on Landsat (requires bright daylight)',
      'Handheld smartphone camera taken from low altitude',
      'Standard photographic film sensor relying on solar reflection',
    ],
    correctIndex: 0,
    explanation: 'Active sensors like RADAR and LiDAR emit their own electromagnetic pulses, allowing them to penetrate cloud cover, foliage, and operate day and night without sunlight.',
    hints: [
      'The monitoring must happen through thick monsoon clouds and at night.',
      'Passive optical sensors require sunlight and cannot see through cloud cover.',
      'Active sensors (RADAR/LiDAR) generate their own radiation pulses.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Analysis (c10_evs_016)
  {
    id: 'ch_evs_010',
    nodeId: NODE_C10_EVS_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does an AI-IoT digital agriculture platform outperform traditional soil lab testing for fertilizer management?',
    options: [
      'It provides real-time, variable-rate nutrient dosing for individual field patches rather than a delayed, uniform chemical dose',
      'It completely eliminates the need for any water or sunlight in farming',
      'It replaces crops with synthetic plastic simulations',
      'It uses manual high-volume paper samplers sent by postal mail',
    ],
    correctIndex: 0,
    explanation: 'Traditional lab tests provide one slow, uniform recommendation. AI-IoT platforms continuously ingest multi-point sensor data to provide dynamic, patch-specific fertilizer doses, preventing nutrient runoff and saving costs.',
    hints: [
      'Compare spatial resolution (whole field vs localized patches) and response speed.',
      'Traditional testing takes days for a single average value; AI-IoT gives immediate patch-specific insights.',
      'The key benefit is real-time, variable-rate fertilizer recommendation.',
    ],
    misconceptionIndex: 3,
  },
  // 11. Standard - Application (c10_evs_017)
  {
    id: 'ch_evs_011',
    nodeId: NODE_C10_EVS_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A textile dyeing cluster in Tirupur discharges colored aromatic synthetic azo dyes into the Noyyal river. Which enzyme should be utilized in the bioreactor for decolourization?',
    options: [
      'Laccase (oxidizes phenolic and aromatic synthetic dye compounds)',
      'Lipase (breaks down fats and marine crude oil lipids)',
      'Pepsin (human stomach enzyme for dietary meat)',
      'Amylase (hydrolyzes food starch into maltose)',
    ],
    correctIndex: 0,
    explanation: 'Laccases are copper-containing oxidases produced by fungi/bacteria that break down aromatic azo dye bonds without harsh chemicals, decolourising textile wastewater.',
    hints: [
      'Lipases target fats/oils; proteases target proteins; cellulases target fibers.',
      'Look for the oxidative enzyme specialized in breaking complex aromatic dye rings.',
      'Laccase is the standard enzyme for textile dye effluent treatment.',
    ],
    misconceptionIndex: 2,
  },
  // 12. Standard - Understanding (c10_evs_017)
  {
    id: 'ch_evs_012',
    nodeId: NODE_C10_EVS_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does Polylactic Acid (PLA) bioplastic cutlery NOT degrade quickly if dumped into a regular open municipal landfill?',
    options: [
      'PLA requires industrial composting conditions (~58°C, high humidity, active thermophilic microbes) to break down in ~90 days',
      'PLA is chemically identical to non-degradable petroleum polyethylene',
      'PLA can only be destroyed by nuclear radiation',
      'Landfills are too hot and humid for any biological degradation',
    ],
    correctIndex: 0,
    explanation: 'PLA is industrially compostable: it requires maintained temperatures of ~58°C and moisture. In cold, dry, or anaerobic landfills, PLA can persist for years.',
    hints: [
      'Biodegradability depends heavily on environmental conditions (temperature and moisture).',
      'Home compost bins and landfills lack the constant elevated temperatures of industrial units.',
      'PLA requires industrial composting at ~58°C to degrade within 90 days.',
    ],
    misconceptionIndex: 0,
  },
  // 13. Standard - Construct (c10_evs_020)
  {
    id: 'ch_evs_013',
    nodeId: NODE_C10_EVS_020,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct sequential steps for setting up a school canteen vermicomposting pit.',
    availableParts: [
      '1. Select shaded well-drained site',
      '2. Lay dry leaf bedding',
      '3. Add thin layers of canteen food waste',
      '4. Introduce Eisenia fetida earthworms',
      '5. Maintain moisture & harvest after 45-60 days',
    ],
    targetState: '1. Select shaded well-drained site 2. Lay dry leaf bedding 3. Add thin layers of canteen food waste 4. Introduce Eisenia fetida earthworms 5. Maintain moisture & harvest after 45-60 days',
    validationHint: 'Add each step in exact chronological sequence from site selection to harvesting.',
    explanation: 'Proper vermicomposting starts with selecting a shaded spot, laying bedding, adding food scraps with soil covers, introducing Eisenia fetida worms, maintaining moisture, and harvesting nutrient-rich manure after 45-60 days.',
    hints: [
      'First select the site and prepare the bottom bedding.',
      'Next add the organic canteen waste layers.',
      'Introduce the red worms (Eisenia fetida), monitor moisture, and harvest.',
    ],
    misconceptionIndex: 4,
  },
  // 14. Standard - Analysis (c10_evs_021)
  {
    id: 'ch_evs_014',
    nodeId: NODE_C10_EVS_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does choosing locally grown seasonal vegetables in an Indian mandi reduce carbon footprint compared to out-of-season refrigerated produce?',
    options: [
      'It minimizes food miles, eliminates diesel-powered cold-chain refrigeration, and avoids excessive plastic packaging',
      'Local food has zero calories and requires no cooking fuel',
      'Imported food always contains heavy radioactive isotopes',
      'Seasonal food can only be grown inside deep underground caves',
    ],
    correctIndex: 0,
    explanation: 'Local seasonal food avoids long-distance transport (low food miles), does not require energy-guzzling cold-chain refrigeration or heated greenhouses, and needs minimal protective packaging.',
    hints: [
      'Consider the energy needed to transport and refrigerate food over thousands of kilometers.',
      'Long-distance food relies heavily on diesel refrigeration (cold chain) and plastic packaging.',
      'Local + seasonal cuts food miles and cold-chain emissions simultaneously.',
    ],
    misconceptionIndex: 3,
  },
  // 15. Advanced - Evaluation (c10_evs_011)
  {
    id: 'ch_evs_015',
    nodeId: NODE_C10_EVS_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Tata Steel commits to Net-Zero by 2045 using Carbon Capture & Storage (CCS) and hydrogen blast furnaces. Under which ESG pillar and regulatory framework does this fall?',
    options: [
      'Environmental (E) pillar disclosed under SEBI BRSR & aligned with India’s Paris Agreement NDCs',
      'Social (S) pillar governed exclusively by local municipal police bylaws',
      'Governance (G) pillar concerning only internal executive salary caps',
      'Philanthropic charity exempt from all national emission standards',
    ],
    correctIndex: 0,
    explanation: 'Industrial decarbonization via clean technology and CCS forms the Environmental (E) core of ESG, reported under SEBI’s Business Responsibility and Sustainability Report (BRSR) framework supporting India’s Paris NDC commitments.',
    hints: [
      'Decarbonization, emissions, and energy efficiency belong to the Environmental domain.',
      'In India, SEBI mandates standardized ESG disclosures through BRSR.',
      'It aligns industrial emissions reduction with national Paris Agreement targets.',
    ],
    misconceptionIndex: 0,
  },
  // 16. Advanced - Evaluation (c10_evs_014)
  {
    id: 'ch_evs_016',
    nodeId: NODE_C10_EVS_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the East Kolkata Wetlands (Ramsar Site) as a Nature-based Solution (NbS) compared to a ₹500-crore conventional chemical-mechanical sewage treatment plant.',
    options: [
      'The wetlands treat 750M+ liters of city sewage daily using algae and fish ponds at virtually zero electricity cost while providing 10,000+ fishing livelihoods and sequestering carbon',
      'The wetlands are toxic wastelands that must be drained and paved with concrete immediately',
      'Conventional chemical plants produce zero sludge and create massive natural fish habitats',
      'The wetlands cannot treat wastewater and only serve as an ecotourism boat park',
    ],
    correctIndex: 0,
    explanation: 'East Kolkata Wetlands naturally purify sewage via sunlight, microbial breakdown, and fish bheries. They provide low-cost treatment, livelihood support, flood mitigation, and biodiversity protection simultaneously.',
    hints: [
      'Think about the multi-benefit nature of IUCN Nature-based Solutions.',
      'East Kolkata Wetlands treat sewage naturally while yielding fish and livelihoods.',
      'They combine zero-energy wastewater treatment with food production and carbon storage.',
    ],
    misconceptionIndex: 2,
  },
  // 17. Advanced - Analysis (c10_evs_018)
  {
    id: 'ch_evs_017',
    nodeId: NODE_C10_EVS_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Smelting 1 metric ton of virgin aluminium from bauxite ore requires 14,000 kWh of electrical energy. Recycling 1 ton of segregated aluminium scrap saves 95% of this energy. How many kWh of electricity are saved per ton recycled?',
    correctAnswer: 13300,
    tolerance: 50,
    unit: 'kWh saved',
    explanation: 'Energy saved = 95% of 14,000 kWh = 0.95 × 14,000 = 13,300 kWh. Recycling preserves the massive embedded energy invested during original extraction and smelting.',
    hints: [
      'Calculate 95% of 14,000 kWh.',
      'Multiply 14,000 by 0.95.',
      'The energy saved is 13,300 kWh.',
    ],
    misconceptionIndex: 3,
  },
  // 18. Advanced - Analysis (c10_evs_015)
  {
    id: 'ch_evs_018',
    nodeId: NODE_C10_EVS_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does the Forest Survey of India (FSI) use IRS Resourcesat/Cartosat data and ISRO’s Bhuvan geoportal to publish the biennial India State of Forest Report?',
    options: [
      'Through temporal multi-spectral pixel classification, overlaying historical satellite image layers in GIS to calculate canopy density changes and detect illegal logging',
      'By sending teams to manually count every single leaf in India using magnifying glasses',
      'By replacing satellite imagery with fictional artist sketches of trees',
      'By tracking only television broadcast signals across urban housing towers',
    ],
    correctIndex: 0,
    explanation: 'FSI conducts temporal analysis by comparing multi-spectral satellite images taken 2 years apart, categorising forest canopy density layers in GIS to identify net gains or losses.',
    hints: [
      'Temporal analysis means comparing the same geographic area across different time points.',
      'GIS software stacks satellite image layers to classify changes in forest pixels.',
      'It uses multi-spectral satellite imagery and temporal GIS layering.',
    ],
    misconceptionIndex: 1,
  },
  // 19. Advanced - Application (c10_evs_019)
  {
    id: 'ch_evs_019',
    nodeId: NODE_C10_EVS_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A rural entrepreneur in Jodhpur undergoes SCGJ National Occupational Standard training to configure solar microgrids and conduct farm energy audits. Which skill classification is demonstrated?',
    options: [
      'Combined Technical Green Skills (solar PV wiring, auditing) and Soft Green Skills (systems thinking, sustainable decision-making)',
      'Purely unspecialized manual labour without environmental relevance',
      'Financial tax accounting for multinational petroleum firms',
      'Software hacking for computer gaming entertainment',
    ],
    correctIndex: 0,
    explanation: 'Green skills combine hands-on technical competencies (PV installation, energy auditing) with cross-cutting cognitive/value capabilities (systems thinking, sustainable choices).',
    hints: [
      'Notice both the technical installation tasks and the broader sustainability decision-making.',
      'Green skills encompass knowledge, practical ability, values, and systems awareness.',
      'It represents both Technical and Soft Green Skills.',
    ],
    misconceptionIndex: 4,
  },
  // 20. Advanced - Creativity (c10_evs_021)
  {
    id: 'ch_evs_020',
    nodeId: NODE_C10_EVS_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why is Khadi and upcycled slow-fashion considered superior to fast fashion in terms of water security and environmental justice?',
    options: [
      'Khadi is handspun/handwoven with minimal grid energy and zero toxic dye runoff; fast fashion consumes 7,000+ liters of water per jean with heavy chemical effluent and sweatshop labour',
      'Fast fashion clothes last for 100 years without needing any laundry',
      'Khadi can only be made from synthetic non-biodegradable crude oil polymers',
      'Fast fashion factories clean all river water and pay the highest wages in the world',
    ],
    correctIndex: 0,
    explanation: 'Fast fashion drives massive water pollution (dye effluent), generates millions of tons of landfill waste, and exploits labour. Khadi and slow fashion conserve water, use natural fibers, preserve heritage, and sustain rural artisans.',
    hints: [
      'Consider the water footprint of synthetic dyeing in fast fashion versus artisanal handlooms.',
      'Fast fashion generates enormous textile waste and river pollution in dyeing hubs like Tirupur.',
      'Khadi and upcycling drastically cut water, chemical, and energy footprints while supporting artisans.',
    ],
    misconceptionIndex: 3,
  },
  // 21. Advanced - Evaluation (c10_evs_013)
  {
    id: 'ch_evs_021',
    nodeId: NODE_C10_EVS_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does urban road widening (adding highway lanes) fail to permanently solve traffic congestion and vehicular emissions (Induced Demand)?',
    options: [
      'Wider roads initially lower travel time, which attracts more private car trips until roads become equally congested at a higher total emission volume',
      'Wider roads immediately cause motor vehicles to physically vanish from existence',
      'Asphalt roads absorb 100% of greenhouse gases directly from the exhaust pipes',
      'Widening roads forces all citizens to buy bicycles automatically',
    ],
    correctIndex: 0,
    explanation: 'Induced demand explains that expanding road capacity encourages more vehicle trips, quickly returning roads to gridlock while increasing total fuel burn. The sustainable solution is modal shift to BRT, metro, and cycling.',
    hints: [
      'Think about human commuter behaviour when new road space opens up.',
      'Expanding capacity invites more private cars onto the road, creating induced traffic.',
      'True sustainable mobility focuses on moving people via mass transit, not expanding space for single-occupancy cars.',
    ],
    misconceptionIndex: 2,
  },
  // 22. Advanced - Application (c10_evs_021)
  {
    id: 'ch_evs_022',
    nodeId: NODE_C10_EVS_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An eco-club plans a tree plantation drive in dry Rajasthan. Why must they choose native species (Neem, Khejri, Peepal) with an active 1-year aftercare roster rather than exotic ornamentals?',
    options: [
      'Native trees have deep root systems adapted to local drought, support indigenous birds/insects, and survive dry spells when watered during early establishment',
      'Exotic ornamental trees require zero water and produce pure gold leaves',
      'Native trees grow to full maturity in less than 24 hours without sunlight',
      'Exotic trees absorb 100 times more CO2 than any native tree in India',
    ],
    correctIndex: 0,
    explanation: 'Native species are climatologically adapted and support local biodiversity. Most plantation saplings die in the first dry season without aftercare (watering, mulching, protection from grazing).',
    hints: [
      'Exotic species often perish in arid climates and provide little support to native fauna.',
      'Aftercare (watering, mulching, guarding) during the first dry year is critical for sapling survival.',
      'Native species like Neem and Khejri are drought-resilient and sustain local ecological food webs.',
    ],
    misconceptionIndex: 4,
  },
  // ─── Class 10 board-depth additions: manufacturing-industries diagnostics ───
  {
    id: 'ch_depth_evs_sugar_location',
    nodeId: 'c10_geo_cbse_06_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do sugar mills cluster in the sugarcane belts of Uttar Pradesh, Maharashtra and Karnataka, and why did the cotton textile industry DISPERSE from Mumbai-Ahmedabad while sugar did not?',
    options: [
      'Sugar is weight-losing (cane loses freshness within 24-48 hours), so mills MUST sit inside the cane fields; cotton cloth lost its raw-material tie after blended fibres and hydroelectricity spread, letting mills disperse to markets and labour',
      'Sugar mills follow ports; textile mills follow sugarcane',
      'Cane can be trucked a thousand kilometres cheaply',
      'Both industries are equally raw-material tied'
    ],
    correctIndex: 0,
    explanation: 'Location logic: perishable + weight-losing raw material = mill at the farm gate (sugar). Lighter raw material + market pull + cheap power = dispersal (cotton to Coimbatore, Tirupur, Solapur). Compare eras: early mills hugged cotton belts for hand-picked bales; powerlooms and blended yarn cut that tie. Tomato-ketchup matrix: five weighted factors for a Maharashtra unit -- tomato supply radius, road links, power and water, labour, market distance.',
    hints: [
      'How fast does cut cane sour?',
      'Weight-losing industry -> locate at the RAW MATERIAL.',
      'Textiles escaped the farm when fibres went synthetic.'
    ],
  },
  {
    id: 'ch_depth_evs_jute_evaluation',
    nodeId: 'c10_geo_cbse_06_002',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate: "The jute industry is declining only because of competition from synthetic fibres." Give supporting and opposing evidence.',
    options: [
      'One-sided -- synthetics DID capture packaging markets, but jute also suffers from high production cost, ageing mills, and shrinking raw jute acreage; against that, eco-friendly demand (jute bags against plastic, geotextiles, government JUTE-ICARE support) gives revival prospects',
      'True -- synthetics are the only factor ever',
      'False -- the jute industry closed entirely in 1990',
      'True -- and jute has no eco-advantages at all'
    ],
    correctIndex: 0,
    explanation: 'Map work: jute mill belt hugs the Hooghly (WBP: Kolkata, Titagarh, Rishra) -- river water for washing fibre plus port export. Revitalisation plan for a sick Kanpur cotton mill: (1) upgrade looms and blend synthetics, (2) shift to defence/uniform niche orders, (3) worker retraining + effluent treatment to clear the Ganga-action closure threat. Balanced evaluation = one paragraph for, one against, then a verdict.',
    hints: [
      'Name TWO causes, not one, for decline.',
      'What did the plastic-ban do for jute bags?',
      'Geography of the Hooghly: why are mills there?'
    ],
  },
  {
    id: 'ch_depth_evs_bhilai_vizag',
    nodeId: 'c10_geo_cbse_06_003',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Bhilai (Chhattisgarh) and Visakhapatnam (Andhra Pradesh) steel plants. Why is Bhilai called a raw-material-cum-coal-based location while Vizag is a port-based one?',
    options: [
      'Bhilai sits beside iron ore (Dalli-Rajhara) and coal corridors -- inland, weight-losing logic; Vizag imports high-grade ore and coking coal by ship and exports steel through its own harbour -- coastal break-bulk logic with sea as the cheaper road',
      'Both plants chose sites only for cheap urban labour',
      'Vizag smelts ore from Rajasthan deserts',
      'Bhilai makes steel from imported beach sand'
    ],
    correctIndex: 0,
    explanation: 'Integrated steel plants need four things within reach: iron ore, coking coal, limestone, manganese -- plus water and power. When all four are inland, the plant goes inland (Bhilai, Rourkela, Durgapur, Bokaro); when the good ore/coal must be imported, the plant goes to the port (Vizag). Decision matrix design: score four candidate sites on ore distance, coal distance, water, power, port and labour -- weights make the trade-offs explicit.',
    hints: [
      'Steel is heavy industry: tonnes in, tonnes out.',
      'Which is cheaper: rail 800 km or a ship 8000 km?',
      'Six inputs: ore, coal, flux, Mn, water, power.'
    ],
  },
  {
    id: 'ch_depth_evs_pollution_cluster',
    nodeId: 'c10_geo_cbse_06_005',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the spatial pattern of air pollution from a clustered industrial estate (Ankleshwar, Gujarat) with dispersed small-scale units around a city.',
    options: [
      'Clustering concentrates emissions -> acute local episodes and a defined plume footprint, manageable by common effluent-treatment and stack monitoring; dispersed units spread low-level chronic pollution across residential buffers, harder to police and to trace',
      'Dispersed units cause no pollution at all',
      'Clustered estates pollute the whole state uniformly',
      'Wind direction is irrelevant in both cases'
    ],
    correctIndex: 0,
    explanation: 'Noise-contrast (06_006): a Jamshedpur-type heavy engineering works fights continuous low-frequency machine noise with enclosures, silencers and green belts; a textile mill\'s noise is loom clatter -- softer but high-frequency -- tamed by vibration mounts, acoustic ceilings and shift rotation. Same logic as air: intensity x footprint x exposure decides the control package.',
    hints: [
      'Point sources vs area sources -- who is easier to regulate?',
      'Common effluent plants work BECAUSE clusters are dense.',
      'Buffer zones (green belts) mute both sound and dust.'
    ],
  },
  {
    id: 'ch_depth_evs_steel_matrix',
    nodeId: 'c10_geo_cbse_06_007',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design a location decision matrix for a proposed integrated steel plant using four candidate sites. Which factors belong in the matrix and how are they weighted?',
    options: [
      'Rows = sites; columns = iron-ore distance, coking-coal distance, limestone, water availability, power, port/market access, labour -- weight the heavy raw materials highest (say 25% ore + 20% coal), then score each site out of 10 and sum; the highest weighted score wins',
      'Pick the site nearest the capital city; all else is decoration',
      'Weight climate more than iron ore for a steel plant',
      'A matrix cannot compare sites objectively'
    ],
    correctIndex: 0,
    explanation: 'The matrix mirrors the classic Chhotanagpur logic: Tata Steel at Jamshedpur sat between Jharia coal, Noamundi ore and the Kolkata-Khairpur water supply -- weightings made it the winner a century before spreadsheets. Jharkhand answer (06_008): Jamshedpur (Sakchi) is the iron-steel centre whose advantage is the confluence of Jharia coal + Noamundi/Badampahar ore + Kharkai-Swarnarekha water.',
    hints: [
      'Steel moves 4 tonnes of material per tonne of steel.',
      'Weights must reflect COST share, not fashion.',
      'Water + power are the quiet deal-breakers.'
    ],
  },
  {
    id: 'ch_depth_evs_distribution_compare',
    nodeId: 'c10_geo_cbse_06_008',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the distribution pattern of the iron-steel industry with the cotton textile industry in India: two similarities, two differences.',
    options: [
      'Similarities: both began in colonial port cities (Jamshedpur-era steel and Mumbai/Ahmedabad mills) and both cluster on raw material or transport corridors; differences: steel stays public-sector-heavy, raw-material-tied and inland, while cotton textiles dispersed widely, are private-sector dominated and market/labour oriented',
      'Both industries are located only in Rajasthan',
      'Both depend identically on sugarcane',
      'Textiles need iron ore; steel needs cotton'
    ],
    correctIndex: 0,
    explanation: 'Map marking set: (a) jute centre -- Kolkata/Hooghly belt, West Bengal; (b) aluminium plant -- Renukoot (UP) or Korba (Chhattisgarh), near bauxite + power (aluminium is electricity-hungry, so plants follow cheap coal/hydro power); (c) steel -- Jamshedpur, Bhilai, Rourkela, Durgapur, Bokaro, Vizag, Salem.',
    hints: [
      'Ownership: who runs BHEL-era steel vs powerloom parks?',
      'Aluminium chases cheap ELECTRICITY, not ore alone.',
      'Two of each: similarities first, then differences.'
    ],
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
  nodeId: NODE_C10_EVS_011,
  title: 'Multi-Stakeholder Climate Action & Green Innovations',
  definition: 'Comprehensive environmental sustainability integrates clean industrial technologies (CCS, ESG), green buildings (IGBC, GRIHA), sustainable mobility, Nature-based Solutions (biofertilizers, Ramsar wetlands), geospatial monitoring (GIS, RS, AI-IoT), biotechnology (bioplastics, enzymes), the 5R waste hierarchy, green skills (SCGJ), and community eco-clubs.',
  eli5: 'Solving environmental challenges is like building a super-clean city: factories trap smoke and clean water; buildings catch rain and breeze; buses and bicycles replace noisy cars; friendly bacteria feed soil; satellite eyes and smart sensors watch the air; and students lead recycling in schools!',
  misconceptions: [
    {
      misconception: 'Industries only pollute and have no positive role in climate mitigation.',
      correction: 'Industries lead mitigation via clean tech, Carbon Capture & Storage (CCS), circular economy practices (slag into cement), and SEBI BRSR ESG disclosures.',
    },
    {
      misconception: 'Passive optical satellite sensors and active RADAR/LiDAR work under the same conditions.',
      correction: 'Passive sensors require natural sunlight and cannot see through clouds or at night; active sensors (RADAR/LiDAR) emit their own pulses and penetrate cloud cover 24/7.',
    },
    {
      misconception: 'Electric vehicles produce zero environmental impact across their entire life cycle.',
      correction: 'EVs produce zero tailpipe emissions in cities, improving urban air, but upstream emissions depend on the electricity grid, and battery manufacturing requires mineral stewardship.',
    },
    {
      misconception: 'Recycling is the most important and effective step in the 5R waste hierarchy.',
      correction: 'Recycling is the lowest fallback of the 5Rs because reprocessing uses energy and water; Rethink and Reduce prevent waste at source and conserve 100% of embedded energy.',
    },
    {
      misconception: 'Eco-clubs are just one-off tree planting events without structural impact.',
      correction: 'Eco-clubs are structured student organizations with designated roles, continuous waste segregation (Blue/Green bins), vermicomposting, and linkage to MoEFCC’s National Green Corps.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What does the NAPCC National Solar Mission primarily target?', options: ['100 GW Solar Capacity', '50 GW Coal Power', '100% Nuclear Power', 'Free Petrol'], correctIndex: 0 },
    { question: 'Which green building rating is developed by TERI and adopted by Govt of India?', options: ['GRIHA', 'LEED USA only', 'BREEAM UK', 'ISO 9001'], correctIndex: 0 },
    { question: 'What makes bioswales superior to concrete storm drains?', options: ['They filter pollutants and recharge groundwater', 'They run faster into sewage', 'They cost 10x more', 'They block all water'], correctIndex: 0 },
    { question: 'What is the role of Rhizobium in sustainable agriculture?', options: ['Biological nitrogen fixation in legume nodules', 'Chemical pesticide creation', 'Destroying earthworms', 'Absorbing potassium only'], correctIndex: 0 },
    { question: 'What is Bhuvan in the context of ISRO and remote sensing?', options: ['ISRO’s web geoportal for satellite data mapping', 'A spy submarine', 'A weather satellite hardware', 'A fossil fuel generator'], correctIndex: 0 },
    { question: 'Which enzyme is used to treat synthetic textile dye effluent?', options: ['Laccase', 'Lipase', 'Insulin', 'Amylase'], correctIndex: 0 },
    { question: 'In the 5R hierarchy, which action is highest priority?', options: ['Rethink', 'Recycle', 'Repurpose', 'Incinerate'], correctIndex: 0 },
    { question: 'Which ministry oversees the National Green Corps (NGC) eco-clubs in schools?', options: ['MoEFCC', 'Ministry of Coal', 'Ministry of Railways', 'Ministry of Aviation'], correctIndex: 0 },
  ],
  masteryCriteria: 'Demonstrates comprehensive mastery of ICSE Class 10 EVS across industrial decarbonization, green infrastructure, sustainable mobility, Nature-based Solutions, geospatial AI-IoT tools, biotechnology, the 5Rs, SCGJ green skills, and school eco-clubs.',
};

// ─── INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG LEARN-BY-DOING) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Industrial Decarbonization & Clean Tech',
    instruction: 'Adjust the clean tech investment slider to simulate industrial emissions and capture efficiency.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_EVS_011,
  },
  {
    title: '2. Green Building & Urban Drainage Lab',
    instruction: 'Toggle green infrastructure elements (Green Roof, Bioswales, Permeable Paving) to observe urban heat island and runoff changes.',
    interactionType: 'toggle-systems',
    nodeId: NODE_C10_EVS_012,
  },
  {
    title: '3. Sustainable Mobility & Modal Shift',
    instruction: 'Shift commuter travel share between Solo Cars, Electric Buses, and Cycle Tracks to balance traffic and CO2.',
    interactionType: 'slider-mobility',
    nodeId: NODE_C10_EVS_013,
  },
  {
    title: '4. Nature-based Solutions & Ramsar Wetlands',
    instruction: 'Interact with East Kolkata Wetlands ecosystem nodes (Sewage in, Algae, Fish bheries, Clean water out) to explore natural purification.',
    interactionType: 'click-ecosystem',
    nodeId: NODE_C10_EVS_014,
  },
  {
    title: '5. AI-IoT & Geospatial Environmental Monitoring',
    instruction: 'Switch between Satellite Remote Sensing layers (IRS optical vs RADAR) and IoT ground sensors (PM2.5, River DO).',
    interactionType: 'switch-sensors',
    nodeId: NODE_C10_EVS_015,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an industrial city increases green roof cover from 5% to 40% on all commercial buildings, what happens to the surface temperature and stormwater runoff?',
    options: [
      'Surface temperature drops by 3-5°C due to evapotranspiration and stormwater peak runoff decreases significantly',
      'The urban heat island increases because plants generate heat',
      'Stormwater runoff doubles because plants attract heavy rain',
      'No physical change occurs in urban microclimate',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now toggle on the Green Roof and Bioswale in the simulation below and watch the temperature gauge drop!',
    nodeId: NODE_C10_EVS_012,
  },
  {
    question: 'Predict: If an organic farm replaces chemical urea with Rhizobium biofertilizer and crop rotation, what will happen to groundwater nitrate runoff and soil microbiome?',
    options: [
      'Groundwater nitrate pollution plummets and soil microbial diversity flourishes',
      'The soil becomes instantly sterile and crops wither',
      'Nitrogen becomes permanently unavailable to plants',
      'Groundwater turns into chemical acid',
    ],
    correctIndex: 0,
    verifyInstruction: 'Select the Biofertilizer tab to observe natural nitrogen fixation in root nodules!',
    nodeId: NODE_C10_EVS_014,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe in the modal shift graph when public EV buses and cycle tracks carry over 70% of commuters?',
    observableOptions: [
      'Urban tailpipe CO2 and PM2.5 concentrations drop sharply while road space efficiency peaks',
      'Traffic gridlock worsens indefinitely',
      'Electricity consumption reaches infinity',
      'Commuter travel time increases tenfold',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_EVS_013,
  },
  {
    question: 'What happens to the wetland water purity index when sewage passes through algae and fish bheries in the East Kolkata simulation?',
    observableOptions: [
      'BOD drops, dissolved oxygen improves, and clean water emerges naturally',
      'Toxic heavy metals multiply uncontrollably',
      'Water evaporates completely leaving barren dry salt',
      'Fish perish immediately from lack of chemicals',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_EVS_014,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'School Campus Sustainability Master Plan',
  description: 'Apply what you have learned to conduct a comprehensive environmental audit of your school or neighbourhood society.',
  steps: [
    'Audit Waste: Implement colour-coded Blue (dry) & Green (wet) bins in your classroom and measure weekly diversion.',
    'Set up Vermicomposting: Collect canteen fruit/vegetable peels and establish a shaded Eisenia fetida composting pit.',
    'Form an Eco-Club Roster: Assign student monitors for energy audits, leaking tap repairs, and native tree aftercare (Neem, Peepal).',
    'Calculate Food Miles: Check your tiffin items and calculate the difference between local seasonal food versus packaged snacks.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
export function C10_EVSRoleIndustriesInstitutionsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_EVS_011,
  title = DEFAULT_PROPS.title || 'Multi-Stakeholder Climate Action & Green Innovations',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive exploration & prediction states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Interactive Exploration Simulation States
  const [cleanTechInvest, setCleanTechInvest] = useState(50); // 0 to 100%
  const [ccsActive, setCcsActive] = useState(true);
  const [greenRoofOn, setGreenRoofOn] = useState(true);
  const [bioswaleOn, setBioswaleOn] = useState(true);
  const [permeablePavingOn, setPermeablePavingOn] = useState(true);
  const [publicTransitShare, setPublicTransitShare] = useState(60); // %
  const [activeSensorMode, setActiveSensorMode] = useState<'optical' | 'radar' | 'iot_aqi' | 'iot_water'>('optical');
  const [selectedWetlandNode, setSelectedWetlandNode] = useState<string | null>('algae');
  const [selected5R, setSelected5R] = useState<number>(0);

  // Adaptive mastery and challenge tracking
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag-and-drop & Construct challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback FX states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED SIMULATION VALUES ───
  const simulatedEmissions = useMemo(() => {
    const base = 1000 - cleanTechInvest * 7;
    const ccsDeduction = ccsActive ? base * 0.45 : 0;
    return Math.max(80, Math.round(base - ccsDeduction));
  }, [cleanTechInvest, ccsActive]);

  const urbanHeatIndex = useMemo(() => {
    let temp = 38.5; // °C baseline
    if (greenRoofOn) temp -= 2.2;
    if (bioswaleOn) temp -= 1.1;
    if (permeablePavingOn) temp -= 0.8;
    return temp.toFixed(1);
  }, [greenRoofOn, bioswaleOn, permeablePavingOn]);

  const stormwaterRunoffPercent = useMemo(() => {
    let runoff = 90; // % conventional
    if (greenRoofOn) runoff -= 30;
    if (bioswaleOn) runoff -= 25;
    if (permeablePavingOn) runoff -= 20;
    return Math.max(15, runoff);
  }, [greenRoofOn, bioswaleOn, permeablePavingOn]);

  const transportCO2PerCapita = useMemo(() => {
    // Solo car: 140g, Public EV/Bus: 24g, Cycle: 0g
    const soloShare = (100 - publicTransitShare) / 100;
    const transitShare = publicTransitShare / 100;
    const avg = soloShare * 140 + transitShare * (0.8 * 24 + 0.2 * 0);
    return Math.round(avg);
  }, [publicTransitShare]);

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── CANVAS PARTICLE ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const particles: { x: number; y: number; speed: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        size: 2 + Math.random() * 3,
        alpha: 0.2 + Math.random() * 0.6,
      });
    }

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#064e3b');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render floating eco-particles (O2 / Clean Bio-flux)
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
        ctx.fill();
      });

      // Status text
      ctx.fillStyle = '#a7f3d0';
      ctx.font = 'bold 12px Inter, system-ui, sans-serif';
      ctx.fillText(`🌿 Net-Zero Tracker | Emissions: ${simulatedEmissions} kt CO₂e | Temp: ${urbanHeatIndex}°C`, 14, 22);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [simulatedEmissions, urbanHeatIndex]);

  // ─── ESCALATING HINTS HANDLER ───
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

  // ─── INACTIVITY AUTO-HINT TIMER ───
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
    speechManager.speak(isCorrect ? 'Excellent prediction! Let us discover how multi-stakeholder green systems work.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Green Innovations Lab. Interact with each model to see sustainability in action.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Adjust parameters freely with zero pressure before beginning your challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing the ICSE Certification Challenge! Let us test your environmental problem-solving skills.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test and verify with the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the data indicators on the graph.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_EVS_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Outstanding effort! You completed the simulation with a score of ${finalScore} percent.`);
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

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
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete environmental explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DRAG-AND-DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = initial.splice(fromIdx, 1);
      initial.splice(toIdx, 0, moved);
      return initial;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleToggleCCS = useCallback(() => {
    setCcsActive(prev => !prev);
    audioManager.play('pop');
  }, []);

  const handleToggleGreenRoof = useCallback(() => {
    setGreenRoofOn(prev => !prev);
    audioManager.play('pop');
  }, []);

  const handleToggleBioswale = useCallback(() => {
    setBioswaleOn(prev => !prev);
    audioManager.play('pop');
  }, []);

  const handleTogglePavement = useCallback(() => {
    setPermeablePavingOn(prev => !prev);
    audioManager.play('pop');
  }, []);

  const handleWetlandClick = useCallback((node: string) => {
    setSelectedWetlandNode(node);
    audioManager.play('tap');
    const msgs: Record<string, string> = {
      sewage: 'Raw municipal wastewater enters the network of shallow retention ponds.',
      algae: 'Sunlight and algae break down organic matter and produce oxygen naturally.',
      fish: 'Fish (bheries) feed on plankton, purifying the water while providing local livelihoods.',
      outflow: 'Clean treated effluent discharges naturally without chemical treatment plants.',
    };
    speechManager.speak(msgs[node] || '');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // SRS interval text based on error count
  const srsDays = errors === 0 ? 7 : errors <= 3 ? 3 : 1;
  const srsText = errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day';

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-emerald-900/40 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-emerald-800/40"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-600/30">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-gold-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">
              ICSE Class 10 EVS | NEP 2020 Multi-Stakeholder Climate Action
            </p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.span
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-colors ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ─── REAL-TIME CANVAS MONITOR ─── */}
      <div className="mb-6 rounded-2xl overflow-hidden border border-emerald-800/50 shadow-inner bg-slate-900">
        <canvas ref={canvasRef} width={800} height={36} className="w-full h-9 block" />
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-3xl border border-emerald-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
              <span>🏙️</span>
              <span>SCENARIO BRIEFING: KALYANPUR CITY DISPATCH</span>
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed text-sm md:text-base">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-emerald-950/80 rounded-xl border border-emerald-800/50 text-xs text-emerald-200">
              <strong>Your Mission:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg border border-amber-500/40">
                Curiosity Hook
              </span>
              <h3 className="text-base font-bold text-slate-100">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${opt}`}
                  className={`p-4 text-left rounded-2xl text-sm font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/80 border-2 border-emerald-400 text-emerald-100'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 border border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-600/50 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs md:text-sm text-emerald-200 leading-relaxed">
                  {discoveryCorrect ? '🎯 Bullseye! ' : '💡 Notice this: '}
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs md:text-sm shadow-lg whitespace-nowrap"
                >
                  Enter Green Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Interactive Discovery</span>
              <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <p className="text-xs md:text-sm text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-700/40">
            👉 <strong>Action Required:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl"
            >
              {/* SLIDE 0: Clean Tech & CCS */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* SVG Industrial Diagram */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 360 220" className="w-full max-w-sm h-auto">
                        {/* Factory Body */}
                        <rect x="40" y="90" width="120" height="90" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                        <rect x="60" y="40" width="24" height="50" fill="#334155" />
                        <rect x="110" y="55" width="20" height="35" fill="#334155" />
                        <text x="100" y="140" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Steel & Cement Unit</text>

                        {/* Smoke plume */}
                        <motion.ellipse
                          cx="72"
                          cy="25"
                          rx={Math.max(6, (100 - cleanTechInvest) * 0.18)}
                          ry={Math.max(4, (100 - cleanTechInvest) * 0.1)}
                          fill={ccsActive ? '#64748b' : '#ef4444'}
                          opacity={ccsActive ? 0.3 : 0.7}
                          animate={{ y: [0, -6, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                        <text x="72" y="20" fill="#f87171" fontSize="8" textAnchor="middle">
                          {ccsActive ? 'CCS Active (-45%)' : 'Raw Flue Gas'}
                        </text>

                        {/* Carbon Capture & Geological Storage Chamber */}
                        <rect x="210" y="110" width="110" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                        <text x="265" y="135" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">Deep Geological</text>
                        <text x="265" y="150" fill="#6ee7b7" fontSize="9" textAnchor="middle">CO₂ Storage Well</text>
                        <line x1="160" y1="135" x2="210" y2="135" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />
                      </svg>
                    </div>

                    {/* Interactive Controls */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Clean Technology Investment:</span>
                          <span className="text-emerald-400">{cleanTechInvest}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={cleanTechInvest}
                          onChange={(e) => setCleanTechInvest(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                          aria-label="Clean Tech Investment Level"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl border border-slate-700">
                        <span className="text-xs font-semibold text-slate-200">Carbon Capture & Storage (CCS):</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleToggleCCS}
                          aria-label="Toggle Carbon Capture"
                          className={`px-3 py-1.5 rounded-lg text-xs font-black ${
                            ccsActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {ccsActive ? 'ACTIVE ✓' : 'OFF ✗'}
                        </motion.button>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="text-xs text-slate-400">Total Net Emissions:</span>
                        <span className="text-base font-black text-emerald-400">{simulatedEmissions} kt CO₂e/year</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Green Building & Drainage */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Predict Then Check Integration */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-700/40 space-y-3">
                      <p className="text-xs md:text-sm font-bold text-emerald-300">
                        🤔 {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 rounded-xl hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* SVG Green Building Layout */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 360 220" className="w-full max-w-sm h-auto">
                        {/* Building Base */}
                        <rect x="50" y="60" width="140" height="120" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                        {/* Windows */}
                        <rect x="65" y="80" width="25" height="30" fill="#38bdf8" opacity="0.6" />
                        <rect x="105" y="80" width="25" height="30" fill="#38bdf8" opacity="0.6" />
                        <rect x="145" y="80" width="25" height="30" fill="#38bdf8" opacity="0.6" />
                        {/* Green Roof */}
                        <rect
                          x="45"
                          y="48"
                          width="150"
                          height="16"
                          rx="4"
                          fill={greenRoofOn ? '#10b981' : '#64748b'}
                          stroke={greenRoofOn ? '#34d399' : '#475569'}
                        />
                        <text x="120" y="60" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">
                          {greenRoofOn ? 'Living Green Roof' : 'Bare Concrete Roof'}
                        </text>

                        {/* Road & Bioswale */}
                        <rect x="210" y="140" width="120" height="40" fill={permeablePavingOn ? '#0f766e' : '#334155'} />
                        <text x="270" y="165" fill="#cbd5e1" fontSize="8" textAnchor="middle">
                          {permeablePavingOn ? 'Permeable Pavers' : 'Impermeable Tar Road'}
                        </text>

                        {/* Bioswale Channel */}
                        <rect
                          x="210"
                          y="100"
                          width="120"
                          height="25"
                          rx="6"
                          fill={bioswaleOn ? '#065f46' : '#78350f'}
                        />
                        <text x="270" y="116" fill="#a7f3d0" fontSize="8" textAnchor="middle">
                          {bioswaleOn ? '🌿 Bioswale Channel' : '⚠️ Concrete Open Drain'}
                        </text>
                      </svg>
                    </div>

                    {/* Controls & Real-time Readouts */}
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleToggleGreenRoof}
                          className={`flex-1 p-2.5 rounded-xl text-xs font-bold border ${
                            greenRoofOn ? 'bg-emerald-800/80 border-emerald-500 text-emerald-100' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          Roof Garden: {greenRoofOn ? 'ON' : 'OFF'}
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={handleToggleBioswale}
                          className={`flex-1 p-2.5 rounded-xl text-xs font-bold border ${
                            bioswaleOn ? 'bg-emerald-800/80 border-emerald-500 text-emerald-100' : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          Bioswale: {bioswaleOn ? 'ON' : 'OFF'}
                        </motion.button>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTogglePavement}
                        className={`w-full p-2.5 rounded-xl text-xs font-bold border ${
                          permeablePavingOn ? 'bg-teal-800/80 border-teal-500 text-teal-100' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Permeable Road Pavement: {permeablePavingOn ? 'ACTIVE' : 'OFF'}
                      </motion.button>

                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Urban Heat Island</span>
                          <span className="text-base font-black text-amber-400">{urbanHeatIndex} °C</span>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Stormwater Runoff</span>
                          <span className="text-base font-black text-gold-400">{stormwaterRunoffPercent}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Sustainable Mobility */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Modal Shift to Public EV/Buses & Bikes:</span>
                        <span className="text-emerald-400">{publicTransitShare}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={publicTransitShare}
                        onChange={(e) => setPublicTransitShare(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Public Transport and Cycling Share"
                      />

                      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Single Car Commuters (140g/km):</span>
                          <span className="text-rose-400 font-bold">{100 - publicTransitShare}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Public EV / Bike Users (24g/km):</span>
                          <span className="text-emerald-400 font-bold">{publicTransitShare}%</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                          <span className="text-xs text-slate-300 font-bold">Average Passenger Emission:</span>
                          <span className="text-base font-black text-emerald-400">{transportCO2PerCapita} g CO₂/km</span>
                        </div>
                      </div>
                    </div>

                    {/* Observation Question */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-amber-300">🔍 OBSERVATION EXERCISE</span>
                      <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className={`w-full p-2 text-left text-xs rounded-xl border transition-all ${
                              observationAnswered && i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-900/60 border-emerald-400 text-emerald-200'
                                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Nature-based Solutions (East Kolkata Wetlands) */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">
                    Click each node in the East Kolkata Wetlands natural treatment loop to trace nutrient cycling:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'sewage', title: '1. Sewage Inflow', icon: '💧', desc: 'Raw city runoff' },
                      { id: 'algae', title: '2. Algae Photosynthesis', icon: '☀️', desc: 'Sunlight + Oxygenation' },
                      { id: 'fish', title: '3. Fish Bheries', icon: '🐟', desc: 'Nutrient absorption' },
                      { id: 'outflow', title: '4. Clean Outflow', icon: '🌿', desc: 'Natural irrigation water' },
                    ].map(node => (
                      <motion.div
                        key={node.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleWetlandClick(node.id)}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          selectedWetlandNode === node.id
                            ? 'bg-emerald-950/90 border-emerald-400 shadow-lg shadow-emerald-900/40'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-2xl mb-1">{node.icon}</div>
                        <div className="text-xs font-bold text-white">{node.title}</div>
                        <div className="text-[10px] text-slate-400">{node.desc}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-emerald-200 leading-relaxed">
                    <strong>Ramsar Co-Benefits:</strong> The East Kolkata Wetlands treat over 750 million litres of sewage daily without electric motors or chemical coagulants, while generating over 10,000 metric tons of fish annually for the city.
                  </div>
                </div>
              )}

              {/* SLIDE 4: Geospatial & AI-IoT */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'optical', label: 'IRS Optical Sensor (Passive)' },
                      { id: 'radar', label: 'RADAR/LiDAR (Active 24/7)' },
                      { id: 'iot_aqi', label: 'SAFAR IoT Air Quality' },
                      { id: 'iot_water', label: 'River IoT Buoy Sensors' },
                    ].map(tab => (
                      <motion.button
                        key={tab.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setActiveSensorMode(tab.id as any);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                          activeSensorMode === tab.id
                            ? 'bg-emerald-600 border-emerald-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    {activeSensorMode === 'optical' && (
                      <div className="text-xs text-slate-300 space-y-1">
                        <strong className="text-emerald-400 block">IRS Multispectral Optical Remote Sensing (Landsat/Resourcesat):</strong>
                        <p>Captures sunlight reflection across visible & near-infrared bands to map forest canopy cover. Incapable of penetrating cloud cover or operating in darkness.</p>
                      </div>
                    )}
                    {activeSensorMode === 'radar' && (
                      <div className="text-xs text-slate-300 space-y-1">
                        <strong className="text-gold-400 block">Active Synthetic Aperture RADAR & LiDAR:</strong>
                        <p>Emits microwave and laser pulses that penetrate clouds, haze, and rain day and night. Measures Himalayan glacier thickness retreat and detects illegal logging.</p>
                      </div>
                    )}
                    {activeSensorMode === 'iot_aqi' && (
                      <div className="text-xs text-slate-300 space-y-1">
                        <strong className="text-amber-400 block">SAFAR Urban Air Quality Sensor Network:</strong>
                        <p>Real-time micro-sensors measure PM2.5, PM10, NO2, and SO2 every minute. AI algorithms predict 3-day smog spikes for city health advisories.</p>
                      </div>
                    )}
                    {activeSensorMode === 'iot_water' && (
                      <div className="text-xs text-slate-300 space-y-1">
                        <strong className="text-teal-400 block">Smart River Buoy IoT:</strong>
                        <p>Continuous monitoring of dissolved oxygen (DO), pH, and heavy metals. Instantly alerts regulators before an industrial toxic discharge triggers a fish kill.</p>
                      </div>
                    )}
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
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab Slide"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-semibold">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Next Lab Slide"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Open Sandbox"
                className="px-5 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl text-xs font-black shadow-lg"
              >
                Open Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white">City Net-Zero Sandbox</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust variables with zero grading pressure to explore systemic interactions across industries, transport, and infrastructure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for Challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs md:text-sm rounded-xl shadow-lg"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">Clean Tech & CCS</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={cleanTechInvest}
                  onChange={(e) => setCleanTechInvest(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Clean Tech Slider"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Investment: {cleanTechInvest}%</span>
                  <span>CO₂: {simulatedEmissions} kt</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-gold-400 block">Public EV & Bike Share</span>
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={publicTransitShare}
                  onChange={(e) => setPublicTransitShare(Number(e.target.value))}
                  className="w-full accent-gold-500"
                  aria-label="Transit Share Slider"
                />
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Share: {publicTransitShare}%</span>
                  <span>Per Cap: {transportCO2PerCapita} g/km</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-teal-400 block">Green Urban Infrastructure</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={handleToggleGreenRoof}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${greenRoofOn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    Roof
                  </button>
                  <button
                    onClick={handleToggleBioswale}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${bioswaleOn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    Swale
                  </button>
                  <button
                    onClick={handleTogglePavement}
                    className={`flex-1 py-1 rounded text-[10px] font-bold ${permeablePavingOn ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    Paving
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between pt-1">
                  <span>Temp: {urbanHeatIndex}°C</span>
                  <span>Runoff: {stormwaterRunoffPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE (20+ NEP 2020 QUESTIONS) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Top Challenge Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-semibold block">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-lg text-xs font-black uppercase ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : difficulty === 'advanced'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-slate-700 capitalize">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Hint & BKT Mastery Status */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400">
                Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={answerRevealed}
                aria-label="Request Hint"
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-xs font-bold border border-amber-500/40 disabled:opacity-30"
              >
                💡 Hint ({hintCount}/3)
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* CHALLENGE CARD CONTAINER */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 bg-slate-900 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'border-rose-500 bg-rose-950/40'
                : 'border-slate-800 shadow-2xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ / CLASSIFY / DISTINGUISH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Choice ${i + 1}: ${opt}`}
                    className={`w-full p-4 text-left rounded-2xl text-xs md:text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/80 border-2 border-emerald-400 text-emerald-100 font-bold'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items into the targets:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets Diagram */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'infra_roof', name: 'Building Rooftop Area' },
                    { id: 'infra_drain', name: 'Roadside Drainage Zone' },
                    { id: 'infra_pave', name: 'Footpath & Parking Surface' },
                    { id: 'infra_tank', name: 'Underground Rainwater Storage' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col justify-between gap-2 min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-semibold">{target.name}</span>
                      <div className="text-xs font-bold text-emerald-300 bg-slate-900 p-2 rounded-xl border border-slate-800 text-center">
                        {droppedLabels[target.id] || 'Drop Label Here 📥'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Validate Drag Labels"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Verify Diagram Labels ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in descending order of priority:</p>
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
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </span>
                      <span className="text-slate-500 text-xs">≡ Drag</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Order"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Submit Order ✓
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated number"
                    aria-label="Numeric answer input"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 outline-none w-48"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] space-y-2">
                  <span className="text-[10px] text-slate-500 block uppercase">Assembled Protocol Sequence:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-900/80 text-emerald-200 rounded-lg text-xs font-medium flex items-center gap-1 border border-emerald-700">
                        {part}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate Construction Sequence"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                >
                  Verify Construction Protocol ✓
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-emerald-950/70 border border-emerald-600/50 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                  <span>📖</span>
                  <span>STEP-BY-STEP EXPLANATION & ICSE BOARD ANALYSIS</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-emerald-100 leading-relaxed"
                    >
                      <strong className="text-emerald-400">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold"
                    >
                      Next Step In Explanation →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next Challenge"
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs md:text-sm shadow-xl"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results 🏆' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/90 to-slate-900 rounded-3xl border border-emerald-500/50 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🎉</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              ICSE Class 10 EVS Simulation Complete!
            </h2>
            <p className="text-emerald-300 font-bold text-sm">
              Your Mastery Score: {Math.max(0, 100 - errors * 5)}% | Level: <span className="capitalize">{masteryLevel}</span>
            </p>

            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-emerald-700/40 text-xs md:text-sm text-emerald-200 max-w-xl mx-auto leading-relaxed">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered industrial clean tech, nature-based solutions, AI-IoT monitoring, and community environmental stewardship!'
                : errors <= 3
                ? '🌿 Excellent performance! You demonstrate strong competency in environmental governance and green infrastructure.'
                : '🌱 Good effort! Review your misconception profile below to solidify your technical definitions for the board examination.'}
            </div>
          </div>

          {/* ─── PROMINENT SPACED REPETITION (SRS) VISIBILITY BANNER ─── */}
          <div className="p-5 bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl border-2 border-emerald-500/60 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-sm md:text-base font-black text-emerald-300 uppercase tracking-wide">
                    Spaced Repetition Schedule (SRS)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Optimal memory retention interval calculated from your error rate ({errors} {errors === 1 ? 'error' : 'errors'}):
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-400/50 rounded-2xl text-center">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">Recommended Review</span>
                <span className="text-base md:text-lg font-black text-white">{srsText}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className={`p-2 rounded-xl border ${errors === 0 ? 'bg-emerald-900/80 border-emerald-400 text-emerald-100 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase">0 Errors</div>
                <div className="text-xs">7 Days</div>
              </div>
              <div className={`p-2 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-900/80 border-amber-400 text-amber-100 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase">1–3 Errors</div>
                <div className="text-xs">3 Days</div>
              </div>
              <div className={`p-2 rounded-xl border ${errors >= 4 ? 'bg-rose-900/80 border-rose-400 text-rose-100 font-bold' : 'bg-slate-900/60 border-slate-800 text-slate-500'}`}>
                <div className="text-[10px] uppercase">4+ Errors</div>
                <div className="text-xs">1 Day</div>
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE TRACKER */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-black text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Personalized Misconception Profile</span>
              </h3>
              <p className="text-xs text-slate-400">Review these specific concepts that tripped you up:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map(idx => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3.5 bg-slate-900 rounded-2xl border border-rose-900/50 space-y-1">
                      <div className="text-xs font-bold text-rose-300">❌ {m.misconception}</div>
                      <div className="text-xs text-emerald-300">✓ {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REAL-WORLD CAMPUS ACTION */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-gold-400">📋 Real-World Campus Action</h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_EVSRoleIndustriesInstitutionsSim;