'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';

// ─── ISC GEOGRAPHY CLASS 12 NODE IDENTIFIERS ───
const NODE_C12_GEO_011 = 'c12_geo_011'; // Droughts and floods
const NODE_C12_GEO_012 = 'c12_geo_012'; // Natural vegetation
const NODE_C12_GEO_013 = 'c12_geo_013'; // Population — distribution
const NODE_C12_GEO_014 = 'c12_geo_014'; // Population growth
const NODE_C12_GEO_015 = 'c12_geo_015'; // Migration trends
const NODE_C12_GEO_016 = 'c12_geo_016'; // Demographic attributes
const NODE_C12_GEO_017 = 'c12_geo_017'; // Rural settlements
const NODE_C12_GEO_018 = 'c12_geo_018'; // Urban settlements
const NODE_C12_GEO_019 = 'c12_geo_019'; // Environmental management
const NODE_C12_GEO_020 = 'c12_geo_020'; // Land resources

const ALL_NODE_IDS = [
  NODE_C12_GEO_011,
  NODE_C12_GEO_012,
  NODE_C12_GEO_013,
  NODE_C12_GEO_014,
  NODE_C12_GEO_015,
  NODE_C12_GEO_016,
  NODE_C12_GEO_017,
  NODE_C12_GEO_018,
  NODE_C12_GEO_019,
  NODE_C12_GEO_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Managing the Monsoon Heartland: India Resource & Disaster Command',
  intro: 'You are appointed Chief Resource Geographer at the National Spatial Planning Board. An erratic monsoon season is unfolding: the Marathwada plateau and Thar are parched under an El Niño cycle, while cloudbursts threaten the Brahmaputra valley and Himalayan slopes.',
  context: 'From managing acute drought-flood swings and arresting forest degradation (from 21.67% toward the 33% national mandate) to balancing dense demographic clusters in Bihar (>1,100/km²) against fragmented farm holdings (avg 1.08 ha) and urban sprawl in Delhi NCR, your spatial decisions govern human survival and sustainable development.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a single agricultural year, Marathwada experiences severe water scarcity while the Brahmaputra valley in Assam is submerged. What single underlying factor drives both catastrophic extremes?',
  options: [
    'Independent and unrelated geological tectonic shifts in peninsular India',
    'Variability of the Indian South-West monsoon regime combined with relief and drainage',
    'Local thermal heat domes exclusive to metropolitan cities',
    'Sudden permanent exhaustion of deep Himalayan glacier reserves'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Drought and flood are the two opposite sides of the exact same coin — monsoon rainfall variability!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 SPEC) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_011_f1',
    nodeId: NODE_C12_GEO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A meteorological subdivision in western Rajasthan receives 35% less rainfall than its long-term normal during the Kharif season. Which type of drought is formally declared first?',
    options: [
      'Meteorological drought (>25% deficit from normal rainfall)',
      'Hydrological drought (depleted river channels and surface reservoirs)',
      'Agricultural drought (critical soil moisture deficit)',
      'Physiological drought (excessive salt concentration in soil)'
    ],
    correctIndex: 0,
    explanation: 'A meteorological drought occurs when actual rainfall falls more than 25% below the long-term regional average. Hydrological and agricultural droughts follow subsequently.',
    hints: [
      'Think about the immediate atmospheric measurement before ground effects occur.',
      'The IMD measures rainfall deficit as the first trigger (>25% departure).',
      'It is named after the study of weather and atmospheric phenomena: meteorological drought.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_012_f2',
    nodeId: NODE_C12_GEO_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each Social Forestry branch to its correct operational zone.',
    dragItems: [
      { label: 'Agro Forestry', targetId: 'zone_cropland' },
      { label: 'Community Forestry', targetId: 'zone_village' },
      { label: 'Urban Forestry', targetId: 'zone_city' },
      { label: 'Commercial Farm Forestry', targetId: 'zone_industry' },
    ],
    correctMapping: {
      zone_cropland: 'Agro Forestry',
      zone_village: 'Community Forestry',
      zone_city: 'Urban Forestry',
      zone_industry: 'Commercial Farm Forestry',
    },
    explanation: 'Agro forestry combines trees with crops on farmland; Community forestry manages village commons (e.g. Arabari); Urban forestry plants greenbelts in cities; Commercial farm forestry supplies industrial pulpwood.',
    hints: [
      'Croplands integrate trees directly with wheat or rice (Agro).',
      'Common village wastelands are protected by village panchayats (Community).',
      'Avenue trees and greenbelts in Delhi or Bengaluru belong to the city zone (Urban).'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_013_f3',
    nodeId: NODE_C12_GEO_013,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Uttar Pradesh has a population of approximately 200 million while India’s total population is 1,210 million (2011 Census). Calculate UP’s Index of Concentration (to 1 decimal place).',
    correctAnswer: 16.5,
    tolerance: 0.8,
    unit: '%',
    explanation: 'Index of Concentration = (State Population / Total National Population) × 100 = (200 / 1210) × 100 ≈ 16.5%. UP holds about 16% of India’s people.',
    hints: [
      'Use the formula: (State Population / Total National Population) × 100.',
      'Divide 200 by 1210.',
      '200 ÷ 1210 = 0.16528, which is 16.5%.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_014_f4',
    nodeId: NODE_C12_GEO_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the census year 1921 officially designated as the "Year of the Great Divide" in Indian demography?',
    options: [
      'India recorded its highest decadal population growth rate of all time.',
      'It divided demographic history from an erratic phase of famines/epidemics to a sustained steady population rise.',
      'The first post-independence Census of the Republic of India was conducted.',
      'International emigration exceeded rural-to-urban internal migration for the first time.'
    ],
    correctIndex: 1,
    explanation: 'Before 1921, famines and pandemics (like the 1918 influenza) caused erratic rises and declines in population. After 1921, public health improvements led to uninterrupted population growth.',
    hints: [
      'It does NOT mean population was at its maximum peak.',
      'Look at the pattern shift: unstable fluctuations before, uninterrupted rise after.',
      '1921 marks the transition to modern mortality decline.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_015_f5',
    nodeId: NODE_C12_GEO_015,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the typical stages of "Stepwise Migration" in ascending geographical hierarchy for a rural worker.',
    sortItems: [
      'Origin village facing agricultural unemployment',
      'Nearby small market town (Kasba) for seasonal daily wage',
      'District headquarters city driving an auto-rickshaw',
      'Metropolitan core (Delhi/Mumbai) working on major construction'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Stepwise migration involves climbing the urban hierarchy rung by rung: village -> kasba -> district city -> metropolis.',
    hints: [
      'Start with the distress push at the rural village base.',
      'Next is the nearest small local market town.',
      'The final destination is the major mega-metropolis.'
    ]
  },
  {
    id: 'ch_016_f6',
    nodeId: NODE_C12_GEO_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Indian states recorded the highest and lowest sex ratio respectively in the 2011 Census?',
    options: [
      'Kerala (1,084 females/1000 males) and Haryana (879 females/1000 males)',
      'Goa (980) and Bihar (918)',
      'Tamil Nadu (996) and Punjab (895)',
      'Himachal Pradesh (972) and Rajasthan (928)'
    ],
    correctIndex: 0,
    explanation: 'According to Census 2011, Kerala had the highest sex ratio (1,084 females per 1,000 males) and Haryana had the lowest (879).',
    hints: [
      'The state with the highest female literacy leads the sex ratio.',
      'The state with historically acute son-preference in north-west India was lowest.',
      'The pair is Kerala (1084) and Haryana (879).'
    ]
  },
  {
    id: 'ch_017_f7',
    nodeId: NODE_C12_GEO_017,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the regional terrain of India with its characteristic rural settlement pattern:',
    options: [
      'Coastal Kerala: Linear; Indo-Gangetic Plain: Compact/Rectangular; Deccan Plateau: Dispersed',
      'Coastal Kerala: Dispersed; Indo-Gangetic Plain: Star-shaped; Deccan Plateau: Circular',
      'Coastal Kerala: Rectangular; Indo-Gangetic Plain: Dispersed; Deccan Plateau: Linear',
      'Coastal Kerala: Circular; Indo-Gangetic Plain: Linear; Deccan Plateau: Compact'
    ],
    correctIndex: 0,
    explanation: 'Coastal Kerala exhibits linear fishing settlements along the shore; the Indo-Gangetic plain features compact nucleated villages with rectangular fields; the Deccan plateau has dispersed hamlets due to rocky terrain and scattered water.',
    hints: [
      'Fishing along a coastline strings houses along a line (Linear).',
      'Flat plains with fertile soil cluster dwellings tightly (Compact).',
      'Rocky terrain with isolated wells scatters dwellings (Dispersed).'
    ]
  },
  {
    id: 'ch_018_s1',
    nodeId: NODE_C12_GEO_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Settlement X has a population of 6,800, a density of 480 persons/km², but only 62% of its male working population is engaged in non-agricultural activities. Under Census of India norms, how is Settlement X classified?',
    options: [
      'Statutory Town because population exceeds 5,000',
      'Census Town because 2 out of 3 conditions are satisfied',
      'Rural Settlement because it fails the 75% male non-agricultural workforce threshold',
      'Urban Agglomeration outgrowth'
    ],
    correctIndex: 2,
    explanation: 'A Census Town MUST satisfy all 3 criteria simultaneously: population >= 5,000, density >= 400/km², and >= 75% male working force in non-agriculture. Since Settlement X has only 62% non-farm work, it remains Rural.',
    hints: [
      'Check all three Census Town rules: 5000 pop, 400 density, and 75% non-farm male work.',
      'Does having 2 out of 3 qualify a settlement as an urban Census Town?',
      'No, failing even one condition keeps it classified as rural.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_019_s2',
    nodeId: NODE_C12_GEO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare viewing a Himalayan forest as "Capital" versus viewing it as a "Resource". Which statement embodies the "Capital" viewpoint?',
    options: [
      'Clear-felling entire slopes for rapid timber monetization to maximize annual state revenue.',
      'Selective rotational harvesting within natural regrowth rates while conserving root-binding for slope stabilization.',
      'Treating the ecosystem as infinite stock with zero reinvestment or afforestation.',
      'Diverting the entire watershed into unlined industrial effluent channels.'
    ],
    correctIndex: 1,
    explanation: 'Treating the environment as capital means preserving the "principal" (forest root structure, biodiversity, water sponge) and living off the sustainable "interest" (sustainable selective timber and NTFP yield).',
    hints: [
      'Recall the savings account analogy: do not blow the principal balance.',
      'Selective harvesting allows regeneration and maintains ecological capital.',
      'The capital view protects the long-term flow of ecological services.'
    ]
  },
  {
    id: 'ch_020_s3',
    nodeId: NODE_C12_GEO_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A district in Punjab has a Net Sown Area (NSA) of 140,000 hectares and a Gross Cropped Area (GCA) of 224,000 hectares through double-cropping. What is its Cropping Intensity percentage?',
    correctAnswer: 160,
    tolerance: 1,
    unit: '%',
    explanation: 'Cropping Intensity = (Gross Cropped Area / Net Sown Area) × 100 = (224,000 / 140,000) × 100 = 1.6 × 100 = 160%.',
    hints: [
      'Formula: (GCA / NSA) × 100.',
      'Divide 224,000 by 140,000.',
      '224,000 ÷ 140,000 = 1.60 -> 160%.'
    ]
  },
  {
    id: 'ch_011_s4',
    nodeId: NODE_C12_GEO_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the Brahmaputra River in Assam experience catastrophic monsoon floods almost every year compared to peninsular rivers?',
    options: [
      'Its catchment receives orographic rainfall >2,500 mm, has a heavily braided channel choked with Himalayan silt, and carries massive peak discharge.',
      'The river channel has zero tributaries and flows through deep volcanic basalt.',
      'The entire river valley has an arithmetic population density under 10 persons/km².',
      'Assam has completely eliminated natural vegetation on its river banks since 1950.'
    ],
    correctIndex: 0,
    explanation: 'The Brahmaputra receives immense monsoon rainfall on steep Himalayan catchments, carries enormous sediment loads that silt the riverbed, and creates a shallow, braided channel prone to frequent over-spilling.',
    hints: [
      'Consider the Himalayan mountain runoff and sediment silt load.',
      'A silted riverbed reduces the channel carrying capacity.',
      'Heavy rainfall + high sediment + braided channel = recurrent flooding.'
    ]
  },
  {
    id: 'ch_019_s5',
    nodeId: NODE_C12_GEO_019,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the 4-step sequence of Rajendra Singh’s community watershed revival in Alwar (Arvari River), Rajasthan.',
    availableParts: [
      'Build earthen Johads and check dams',
      'Arrest monsoon surface runoff',
      'Recharge groundwater table',
      'Perennial river flow restored'
    ],
    targetState: 'Build earthen Johads and check dams Arrest monsoon surface runoff Recharge groundwater table Perennial river flow restored',
    validationHint: 'Click all 4 steps in chronological order: Engineering structure -> Hydrological interception -> Subsurface recharge -> Basin revival',
    explanation: 'By constructing indigenous johads (earthen check dams), monsoon runoff was arrested, infiltrating the aquifer and reviving the dried Arvari into a perennial stream.',
    hints: [
      'Start by constructing the traditional rainwater structures (Johads).',
      'Next, this captures the fleeting monsoon runoff.',
      'Then the water infiltrates downward into underground aquifers.',
      'Finally, dry riverbeds receive perennial spring discharge.'
    ]
  },
  {
    id: 'ch_012_s6',
    nodeId: NODE_C12_GEO_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate why the National Forest Policy (1988) mandates 67% forest cover for Himalayan hill tracts but only 33% for the Indo-Gangetic plains.',
    options: [
      'Plains have zero biodiversity requirements compared to alpine zones.',
      'Steep hill slopes are acutely vulnerable to soil erosion, landslides, and flash floods; forest roots bind soil and regulate perennial downstream river recharge.',
      'Hills are required to supply 100% of India’s commercial paper mill pulpwood.',
      'Plains land is legally exempt from all environmental conservation acts.'
    ],
    correctIndex: 1,
    explanation: 'Steep hill slopes face severe runoff velocity and gravity-driven erosion. A 67% forest canopy is vital to prevent catastrophic siltation and flash floods in downstream plains.',
    hints: [
      'Think about slope steepness, gravity, and soil erosion risk in the hills.',
      'Forest roots act as physical anchors on steep mountain slopes.',
      'Protecting the hills protects the downstream plains from silting.'
    ]
  },
  {
    id: 'ch_018_s7',
    nodeId: NODE_C12_GEO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between an "Urban Agglomeration" (e.g. Greater Mumbai UA) and a "Conurbation" (e.g. Kolkata-Hooghly region).',
    options: [
      'An Agglomeration is a core city plus contiguous urban outgrowths; a Conurbation is a multi-city regional fusion formed by the coalescence of separate expanding towns.',
      'An Agglomeration is strictly rural; a Conurbation is strictly industrial.',
      'An Agglomeration requires a million population; a Conurbation must have fewer than 5,000 residents.',
      'There is no geographical difference; the terms are purely interchangeable synonyms.'
    ],
    correctIndex: 0,
    explanation: 'Urban Agglomeration is a contiguous urban spread of a town + outgrowths treated as one unit. A Conurbation is a vast regional belt formed when separate cities grow outward until their boundaries fuse.',
    hints: [
      'Greater Mumbai = core city + Thane/Navi Mumbai outgrowths.',
      'Kolkata-Hooghly = multiple distinct municipalities along the river merging into a giant urban ribbon.',
      'Agglomeration is contiguous unit counting; Conurbation is regional multi-city fusion.'
    ]
  },
  {
    id: 'ch_013_a1',
    nodeId: NODE_C12_GEO_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a mountainous district of Uttarakhand, arithmetic density is 65 persons/km², but physiological density is 1,420 persons/km². Evaluate what this massive disparity signifies.',
    options: [
      'The district has an abundance of vast flat agricultural land for farming.',
      'Only a tiny percentage of the rugged mountainous terrain is cultivable; population pressure on actual food-producing farmland is acutely high.',
      'Arithmetic density is incorrectly calculated by the district census commissioner.',
      'The district has zero rural population and is entirely an urban metropolis.'
    ],
    correctIndex: 1,
    explanation: 'Physiological density (Persons / Cultivated Land) reveals true agricultural carrying capacity. In mountainous regions where arable land is scarce, physiological density is exponentially higher than arithmetic density.',
    hints: [
      'Remember: Physiological Density = Total Persons ÷ Cultivated Area.',
      'If cultivated area is very small due to mountains, dividing by a tiny denominator gives a massive number.',
      'It shows extreme pressure on limited terrace farmland.'
    ]
  },
  {
    id: 'ch_015_a2',
    nodeId: NODE_C12_GEO_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A rural district in Bihar exhibits a skewed age-sex pyramid with a sharp deficit of males aged 20–45, while female and elderly cohorts dominate. What migration dynamic explains this?',
    options: [
      'High female international emigration to Gulf nations.',
      'Male-selective out-migration to industrial hubs in Maharashtra, Gujarat, and Delhi driven by economic push factors.',
      'Universal reverse urban-to-rural migration of young tech professionals.',
      'Natural biological anomaly in gender birth rates in northern India.'
    ],
    correctIndex: 1,
    explanation: 'Rural Bihar experiences heavy male-selective rural-to-urban labour migration. Working-age men migrate to western/northern urban centers, leaving families and elderly in source villages.',
    hints: [
      'Look at which gender and age group is missing in the village.',
      'Working-age males migrate out for construction and factory jobs.',
      'This creates a "remittance economy" with female-headed rural households.'
    ]
  },
  {
    id: 'ch_014_a3',
    nodeId: NODE_C12_GEO_014,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A state has a Crude Birth Rate of 22 per 1,000, Crude Death Rate of 7 per 1,000, and net in-migration of 3 per 1,000 annually. Calculate its total annual Population Growth Rate in percentage (%).',
    correctAnswer: 1.8,
    tolerance: 0.1,
    unit: '%',
    explanation: 'Natural Growth = CBR - CDR = 22 - 7 = 15 per 1000. Total Growth Rate = Natural Growth + Net Migration = 15 + 3 = 18 per 1000 = 1.8% per year.',
    hints: [
      'Natural growth = 22 - 7 = 15 per 1,000.',
      'Add net migration: 15 + 3 = 18 per 1,000.',
      'Convert per 1,000 to percentage by dividing by 10 (18 / 10 = 1.8%).'
    ]
  },
  {
    id: 'ch_016_a4',
    nodeId: NODE_C12_GEO_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'India’s 2011 Census indicates a working population of 39.8% and a non-working population of 60.2%. What is the primary macro-development implication of this demographic dependency ratio?',
    options: [
      'Per capita income rises at maximum possible velocity because non-workers generate zero costs.',
      'Each active earner supports roughly 1.5 dependents, restraining household savings and demanding high state expenditure on basic schooling and healthcare.',
      'India will face an immediate labor shortage across all agricultural sectors.',
      'Urbanisation will completely halt across all Indian states.'
    ],
    correctIndex: 1,
    explanation: 'A high dependency ratio (60.2% non-workers) means family income is shared among many dependents, dampening savings and capital formation unless the young cohort is rapidly skilled and employed.',
    hints: [
      'Calculate: 60.2 non-workers supported by 39.8 workers.',
      'High dependency reduces disposable savings and strains social infrastructure.',
      'Converting this to a demographic dividend requires high quality job creation.'
    ]
  },
  {
    id: 'ch_020_a5',
    nodeId: NODE_C12_GEO_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Over 86% of operational land holdings in India are below 2 hectares (average 1.08 ha). Evaluate the most effective structural institutional remedy demonstrated in Punjab and Haryana.',
    options: [
      'Mandatory splitting of plots upon each generational inheritance without limit.',
      'Consolidation of fragmented operational parcels into unified compact holdings, facilitating mechanisation, tubewell irrigation, and boundary efficiency.',
      'Converting 100% of net sown area into barren unculturable wasteland.',
      'Prohibiting the use of any tractors, tube wells, or canal distributaries.'
    ],
    correctIndex: 1,
    explanation: 'Consolidation of holdings pools fragmented parcels into compact operational units, eliminating wasted boundary strips, lowering irrigation costs, and enabling farm machinery.',
    hints: [
      'Small scattered plots waste time, fencing, and water channels.',
      'Combining scattered slices back into one contiguous block is called consolidation.',
      'Punjab and Haryana executed state-wide consolidation programmes successfully.'
    ]
  },
  {
    id: 'ch_017_a6',
    nodeId: NODE_C12_GEO_017,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4-tier spatial planning strategy to prevent uncontrolled Urban Sprawl on Delhi NCR’s rural-agricultural fringe.',
    availableParts: [
      'Enforce Green Belt Growth Boundary',
      'Mandate Transit-Oriented Satellite Towns',
      'In-situ Slum Infrastructure Upgrading',
      'Protect High-Yield Net Sown Farmland'
    ],
    targetState: 'Enforce Green Belt Growth Boundary Mandate Transit-Oriented Satellite Towns In-situ Slum Infrastructure Upgrading Protect High-Yield Net Sown Farmland',
    validationHint: 'Click all 4 planning pillars in order: Perimeter boundary -> Polycentric satellite transit -> Urban core housing upgrade -> Farmland zoning',
    explanation: 'A comprehensive urban growth management plan combines greenbelt zoning, polycentric transit-linked satellite cities, in-situ habitat upgrading, and strict preservation of fertile agricultural peripheries.',
    hints: [
      'First establish an unbreachable perimeter: Green Belt Boundary.',
      'Second, develop self-sustaining satellite cities along transit spines.',
      'Third, upgrade existing informal housing within the city.',
      'Fourth, enforce statutory zoning to protect food-producing soils.'
    ]
  },
  {
    id: 'ch_011_a7',
    nodeId: NODE_C12_GEO_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During the 2013 Uttarakhand disaster, a cloudburst triggered flash floods in Kedarnath. Which anthropogenic factor critically amplified the catastrophic scale of the disaster?',
    options: [
      'Implementation of strict watershed Johads across the mountain peaks.',
      'Unplanned construction and encroachments directly on the active riverbed and fragile floodplains, combined with slope deforestation.',
      'Excessive planting of native broad-leaf oak and rhododendron forests.',
      'Total absence of rainfall throughout northern India during June 2013.'
    ],
    correctIndex: 1,
    explanation: 'While extreme concentrated rainfall was the natural trigger, rampant construction on the river channel, debris dumping, and slope deforestation vastly magnified the loss of life and infrastructure.',
    hints: [
      'Look at how human engineering encroached upon natural drainage pathways.',
      'Paving over riverbeds prevents natural flood spreading.',
      'Unplanned construction on fragile slopes turns extreme weather into a human tragedy.'
    ]
  },
  {
    id: 'ch_019_a8',
    nodeId: NODE_C12_GEO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A mining conglomerate proposes to clear-fell 5,000 hectares of biodiversity-dense Sal forest in central India, arguing that future scientific technology will restore the ecosystem. Which environmental principle mandates rejection of this unverified gamble?',
    options: [
      'The Resource Extraction Priority Rule',
      'The Precautionary Principle (lack of scientific certainty cannot justify risking irreversible ecological damage)',
      'The Infinite Carrying Capacity Assumption',
      'The Immediate Liquidation Doctrine'
    ],
    correctIndex: 1,
    explanation: 'The Precautionary Principle states that when an action threatens serious or irreversible environmental harm, the lack of full scientific certainty shall not be used to postpone preventive or prohibitive measures.',
    hints: [
      'Think of the principle designed to prevent irreversible damage before it happens.',
      'It says "better safe than sorry" in environmental law.',
      'The Rio Declaration and Indian environmental jurisprudence enforce the Precautionary Principle.'
    ]
  }
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE — LEARN BY INTERACTION) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Monsoon Variability & Drought-Flood Swings',
    instruction: 'Drag the Monsoon Rainfall Departure slider to observe how peninsular India swings from meteorological drought (< -25%) into agricultural failure, or surges into flood overflow (> +25%).',
    interactionType: 'slider-monsoon',
    nodeId: NODE_C12_GEO_011,
  },
  {
    title: '2. Forest Cover Deficit & Ecological Sponge',
    instruction: 'Adjust the Forest Cover slider to see how falling below the National Forest Policy target (33% plains / 67% hills) accelerates soil erosion and runoff.',
    interactionType: 'slider-forest',
    nodeId: NODE_C12_GEO_012,
  },
  {
    title: '3. Spatial Demographics: Arithmetic vs Physiological Density',
    instruction: 'Toggle between Plains (Bihar) and Himalayan Mountains (Uttarakhand) to observe why physiological density surges exponentially on scarce arable land.',
    interactionType: 'toggle-density',
    nodeId: NODE_C12_GEO_013,
  },
  {
    title: '4. Rural Settlement Geometry & Topography',
    instruction: 'Click on different Indian geographical terrains to see how relief and water sources dictate compact, linear, and dispersed settlement layouts.',
    interactionType: 'click-settlement',
    nodeId: NODE_C12_GEO_017,
  },
  {
    title: '5. Land Fragmentation & Cropping Intensity',
    instruction: 'Subdivide family land holdings from 4 hectares down to 0.5 hectares, then activate "Consolidation & Irrigation" to witness cropping intensity and farm viability rebound.',
    interactionType: 'slider-land',
    nodeId: NODE_C12_GEO_020,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an El Niño event reduces monsoon rainfall by 32% across Marathwada, what will happen to groundwater and crop yields?',
    options: [
      'Groundwater levels will immediately rise due to reduced cloud cover.',
      'Meteorological deficit will cascade into hydrological reservoir drying and agricultural crop failure.',
      'Cropping intensity will naturally double without any irrigation.',
      'Forest cover will expand automatically by 15%.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Monsoon Departure control to -32% to verify the cascade on the interactive water gauge.',
    nodeId: NODE_C12_GEO_011,
  },
  {
    question: 'Predict: If a district has 100 km² total area, 10 km² cultivable land, and 10,000 people, how will Physiological Density compare to Arithmetic Density?',
    options: [
      'Physiological density (1,000/km²) will be exactly 10 times higher than Arithmetic density (100/km²).',
      'Physiological density will be lower because cultivated land is smaller.',
      'Both densities will be identical at 100 persons/km².',
      'Arithmetic density will be 10,000 persons/km².'
    ],
    correctIndex: 0,
    verifyInstruction: 'Toggle the Density Explorer to inspect the mathematical breakdown of the two densities.',
    nodeId: NODE_C12_GEO_013,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe in the simulation when Forest Cover drops below the critical 21.67% national baseline?',
    observableOptions: [
      'Soil erosion and surface runoff velocity surge sharply while aquifer recharge collapses.',
      'Annual rainfall increases by 50% across all districts.',
      'Slums in urban centers disappear spontaneously.',
      'Cropping intensity becomes completely independent of water availability.'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_GEO_012,
  },
  {
    question: 'What geometric pattern emerges when houses align strictly along a coastal fishing strand or highway canal?',
    observableOptions: [
      'Star-shaped crossroads pattern',
      'Strict Linear settlement pattern',
      'Isolated dispersed farmstead pattern',
      'Concentric circular crater pattern'
    ],
    correctIndex: 1,
    nodeId: NODE_C12_GEO_017,
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Spatial Planner: District Climate & Land Masterplan',
  description: 'Select your home or state district (e.g., Alwar in Rajasthan, Chamoli in Uttarakhand, or Purba Medinipur in West Bengal). Formulate a 4-point Integrated Disaster and Land Resource Management Plan.',
  steps: [
    'Assess local rainfall variability: Classify vulnerability to drought or flash flooding.',
    'Map forest and social forestry: Target agro-forestry or greenbelts to bridge the 33% gap.',
    'Formulate a Land Consolidation strategy: Propose pooling smallholdings (<1 ha) to boost cropping intensity above 150%.',
    'Designate Urban Sprawl containment: Demarcate satellite growth corridors and protect prime agricultural net sown area.'
  ],
};

// ─── COMPONENT PROPS INTERFACE ───
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
  nodeId: NODE_C12_GEO_011,
  title: 'ISC Class 12: India Geography, Hazards, Demographics & Land Resources',
  definition: 'An integrated study of the physical, human, and environmental geography of India — examining droughts, floods, natural forest vegetation, population dynamics, rural/urban settlement morphology, environmental capital, and finite land resource management.',
  eli5: 'Think of India as a giant living household. The monsoon is the erratic water faucet that can run dry (drought) or overflow (flood). The forests are the home’s green lungs and sponge. The census counts everyone in the rooms, and land is the fixed pizza we must share and farm wisely without letting cities ruin the kitchen!',
  misconceptions: [
    {
      misconception: 'Drought means zero rain, and floods are caused only by heavy rainfall.',
      correction: 'Drought is a rainfall deficiency relative to regional normal (>25% departure). Floods are heavily amplified by human deforestation, silting, and riverbed encroachment.'
    },
    {
      misconception: 'Social forestry is simply planting any tree anywhere without zoning.',
      correction: 'Social forestry comprises 5 distinct branches: Agro (with crops), Community (village commons), Commercial (for mills), Non-commercial (household fuel/fodder), and Urban (city greenbelts).'
    },
    {
      misconception: 'Index of Concentration is just another word for population density.',
      correction: 'Index of Concentration is the % share of India’s total population held by a state (UP ≈ 16%). Density measures people per sq km.'
    },
    {
      misconception: '1921 is the Year of the Great Divide because India had its highest population then.',
      correction: '1921 divides an erratic era of famines/epidemics from a post-1921 era of steady, uninterrupted mortality decline and population growth.'
    },
    {
      misconception: 'A village with 6,000 people automatically qualifies as a Census Town.',
      correction: 'A Census Town must satisfy all 3 conditions simultaneously: pop >= 5,000, density >= 400/km², AND >= 75% male workers in non-agriculture.'
    }
  ],
  diagnosticQuestions: [
    {
      question: 'What is the minimum rainfall deficit for an IMD meteorological drought declaration?',
      options: ['10%', '25%', '50%', '75%'],
      correctIndex: 1
    },
    {
      question: 'What is India’s official forest cover according to recent State of Forest Reports?',
      options: ['15.2%', '21.67%', '33.0%', '42.5%'],
      correctIndex: 1
    },
    {
      question: 'Which state recorded the highest arithmetic population density in 2011 Census?',
      options: ['Uttar Pradesh', 'West Bengal', 'Bihar (>1,100/km²)', 'Kerala'],
      correctIndex: 2
    },
    {
      question: 'What was the overall sex ratio of India in the 2011 Census?',
      options: ['927', '933', '943', '972'],
      correctIndex: 2
    },
    {
      question: 'Which stream of internal migration is numerically largest in India due to marriage?',
      options: ['Rural-to-Rural', 'Rural-to-Urban', 'Urban-to-Urban', 'Urban-to-Rural'],
      correctIndex: 0
    },
    {
      question: 'What is the average size of operational land holdings in India (Agriculture Census)?',
      options: ['0.45 ha', '1.08 ha', '3.50 ha', '5.20 ha'],
      correctIndex: 1
    },
    {
      question: 'Which river in Rajasthan was famously revived by Rajendra Singh through johads?',
      options: ['Luni', 'Arvari', 'Chambal', 'Banas'],
      correctIndex: 1
    },
    {
      question: 'In which village and year did the Chipko Movement originate?',
      options: ['Reni (1973)', 'Arabari (1988)', 'Alwar (1995)', 'Kedarnath (2013)'],
      correctIndex: 0
    }
  ],
  masteryCriteria: 'Mastery of all 10 Class 12 ISC Geography syllabus nodes covering hazards, forestry, demographics, settlements, environmental capital, and land resources.'
};

// ─── MAIN SIMULATION COMPONENT ───
export function C12_GeographyDroughtsFloodsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_GEO_011,
  title = DEFAULT_PROPS.title || 'ISC Geography Simulator',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject config
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🗺️', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery Hook state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check & Observation state
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('developing');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Interactive States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection States
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Interactive Variables connected to live simulation
  const [monsoonDeparture, setMonsoonDeparture] = useState<number>(0); // -50% to +50%
  const [forestCoverPct, setForestCoverPct] = useState<number>(21.7); // 10% to 67%
  const [activeTerrain, setActiveTerrain] = useState<'plain' | 'coastal' | 'mountain' | 'plateau'>('plain');
  const [holdingSizeHa, setHoldingSizeHa] = useState<number>(1.08); // 0.2 to 5 ha
  const [isConsolidated, setIsConsolidated] = useState<boolean>(false);
  const [activeDensityRegion, setActiveDensityRegion] = useState<'bihar' | 'uttarakhand'>('bihar');
  const [reservoirLevel, setReservoirLevel] = useState<number>(55);
  const [cropYieldFactor, setCropYieldFactor] = useState<number>(100);
  const [soilRunoffRate, setSoilRunoffRate] = useState<number>(45);

  // Auto-hint timer ref
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD: Node Mastery from LocalStorage ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
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

  // ─── REAL-TIME PHYSICAL SIMULATION CALCULATIONS (SLIDER INSTANT SYNC) ───
  useEffect(() => {
    const baseReservoir = 50 + monsoonDeparture * 0.9;
    setReservoirLevel(Math.max(5, Math.min(100, Math.round(baseReservoir))));

    const calculatedYield = Math.max(10, Math.min(120, Math.round(100 + monsoonDeparture * 0.8 - (monsoonDeparture > 30 ? (monsoonDeparture - 30) * 1.5 : 0))));
    setCropYieldFactor(calculatedYield);

    const baseRunoff = Math.max(10, Math.min(95, Math.round(100 - forestCoverPct * 1.3)));
    setSoilRunoffRate(baseRunoff);
  }, [monsoonDeparture, forestCoverPct]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && challenge.hints?.length > 0) {
        setShowHint(true);
        setCurrentHint(challenge.hints[0]);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak(challenge.hints[0]);
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Splendid geographical insight! Rainfall variability links both extremes.');
    } else {
      audioManager.play('pop');
      speechManager.speak('Great intuition! Let us discover how the monsoon tap governs both disasters.');
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Step 1: Manipulate the monsoon rainfall departure to observe hazard thresholds.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setErrors(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Geography Sandbox. Feel free to tweak rainfall, forest canopy, and land tenure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase initiated. Test your spatial reasoning on board-style competencies.');
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

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction registered! Now drag the monsoon slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorr) {
      audioManager.play('success');
      speechManager.speak('Accurate observation! Low forest cover directly accelerates erosive runoff.');
    } else {
      audioManager.play('pop');
    }
  }, []);

  const handleMonsoonSlider = useCallback((val: number) => {
    setMonsoonDeparture(val);
    audioManager.play('count');
    if (Math.abs(val) > 25) {
      setPredictionVerified(true);
    }
  }, []);

  const handleForestSlider = useCallback((val: number) => {
    setForestCoverPct(val);
    audioManager.play('count');
  }, []);

  const handleTerrainClick = useCallback((terrain: 'plain' | 'coastal' | 'mountain' | 'plateau') => {
    setActiveTerrain(terrain);
    audioManager.play('tap');
  }, []);

  const handleLandHoldingSlider = useCallback((val: number) => {
    setHoldingSizeHa(val);
    audioManager.play('count');
  }, []);

  const handleToggleConsolidation = useCallback(() => {
    setIsConsolidated(prev => !prev);
    audioManager.play('balance');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered the comprehensive ISC Geography syllabus.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(prev => prev + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswerValidation = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent geographical reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
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
        speechManager.speak('Let us study the examiner breakdown step by step.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswerValidation(answer);
  }, [sortArrangement, challenge, handleAnswerValidation]);

  // ─── 2D CANVAS ANIMATION: CLOUD & RAIN SIMULATION ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const drops: { x: number; y: number; speed: number; length: number }[] = [];
    for (let i = 0; i < 40; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 2 + Math.random() * 4,
        length: 8 + Math.random() * 6
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rainIntensity = Math.max(0, (monsoonDeparture + 50) / 100);

      ctx.strokeStyle = `rgba(56, 189, 248, ${0.2 + rainIntensity * 0.6})`;
      ctx.lineWidth = 1.5;

      drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 1, d.y + d.length * rainIntensity);
        ctx.stroke();

        d.y += d.speed * (0.5 + rainIntensity);
        if (d.y > canvas.height) {
          d.y = 0;
          d.x = Math.random() * canvas.width;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [monsoonDeparture]);

  // ─── RECHARTS DATA PREPARATION ───
  const hazardChartData = useMemo(() => [
    { name: 'Normal', rainfall: 118, yield: 100, runoff: 40 },
    { name: 'Drought (1987)', rainfall: 78, yield: 45, runoff: 15 },
    { name: 'Monsoon Break', rainfall: 92, yield: 65, runoff: 25 },
    { name: 'Flood (2013)', rainfall: 185, yield: 55, runoff: 92 },
    { name: 'Current Sim', rainfall: Math.round(118 * (1 + monsoonDeparture / 100)), yield: cropYieldFactor, runoff: soilRunoffRate }
  ], [monsoonDeparture, cropYieldFactor, soilRunoffRate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── TOP STATUS & PROGRESS BAR ─── */}
      <motion.header 
        initial={{ y: -10, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              CISCE Class 12 • Spatial Science, Hazards, Demographics & Land Planning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-900 rounded-full border border-slate-800 text-xs font-semibold text-slate-300"
          >
            Mastery: <span className="text-emerald-400 capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div 
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg"
            >
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-2.5 py-1 bg-gold-500/20 text-gold-300 text-xs font-bold rounded-md uppercase"
              >
                Scenario Hook
              </motion.span>
              <h2 className="text-xl font-bold text-white mt-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-gold-300/80 mt-3 font-mono bg-gold-950/40 p-2.5 rounded-lg border border-gold-900/50">
                ⚡ Spatial Challenge: {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-200">
                Curiosity Check: {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-800/50 border border-slate-700/50 text-slate-400 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="pt-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4"
                >
                  <motion.p 
                    initial={{ x: -10 }} 
                    animate={{ x: 0 }}
                    className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {discoveryCorrect
                      ? '✓ Spot on! Monsoon variability is the master tap governing both extreme hazards.'
                      : `💡 Note: ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40 text-sm"
                  >
                    Enter Interactive Exploration →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div 
            key="explore-phase"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span>Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <div className="flex gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.div
                    key={idx}
                    animate={{ scale: idx === currentSlide ? 1.1 : 1 }}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-750'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
              >
                <div>
                  <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-amber-400 text-sm mt-1.5 flex items-center gap-2">
                    <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>

                {/* DYNAMIC INTERACTIVE VISUALIZATIONS */}
                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 min-h-[280px]">
                  
                  {/* Visual Slide 1: Monsoon Hazard Simulator */}
                  {currentSlide === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-full md:w-1/2 space-y-4">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-rose-400">Severe Drought (-50%)</span>
                            <span className="text-slate-300">Normal (0%)</span>
                            <span className="text-gold-400">Flood Surge (+50%)</span>
                          </div>
                          {/* REAL-TIME SLIDER CONNECTED TO STATE */}
                          <input
                            type="range"
                            min={-50}
                            max={50}
                            value={monsoonDeparture}
                            onChange={(e) => handleMonsoonSlider(Number(e.target.value))}
                            aria-label="Monsoon Rainfall Departure slider"
                            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                          />
                          <motion.div 
                            key={monsoonDeparture}
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs"
                          >
                            <span className="text-slate-400">Rainfall Departure:</span>
                            <span className={`font-mono font-bold text-sm ${
                              monsoonDeparture < -25 ? 'text-rose-400' : monsoonDeparture > 25 ? 'text-gold-400' : 'text-emerald-400'
                            }`}>
                              {monsoonDeparture > 0 ? `+${monsoonDeparture}` : monsoonDeparture}%
                            </span>
                          </motion.div>

                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-3 rounded-xl border text-xs leading-relaxed font-medium ${
                              monsoonDeparture < -25
                                ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                                : monsoonDeparture > 25
                                ? 'bg-gold-950/40 border-gold-800 text-gold-300'
                                : 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                            }`}
                          >
                            {monsoonDeparture < -25
                              ? '⚠️ METEOROLOGICAL DROUGHT: Rainfall >25% below normal. Hydrological storage drops; agricultural moisture stressed in Marathwada & Thar.'
                              : monsoonDeparture > 25
                              ? '🌊 FLOOD WARNING: Concentrated discharge exceeds riverbed carrying capacity. Brahmaputra and North Bihar plains overflowing.'
                              : '✅ STABLE EQUILIBRIUM: Rainfall within normal fluctuation bounds; agricultural and hydrological systems balanced.'}
                          </motion.div>
                        </div>

                        {/* SVG Simulation Graphic */}
                        <div className="w-full md:w-1/2 relative bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col items-center">
                          <canvas ref={canvasRef} width={260} height={70} className="w-full rounded-lg mb-2" />
                          <svg viewBox="0 0 300 160" className="w-full">
                            <path d="M 20 130 Q 150 160 280 130 L 280 150 L 20 150 Z" fill="#334155" />
                            
                            <motion.path
                              d={`M 20 ${135 - reservoirLevel * 0.7} Q 150 ${165 - reservoirLevel * 0.7} 280 ${135 - reservoirLevel * 0.7} L 280 145 L 20 145 Z`}
                              fill={monsoonDeparture < -25 ? '#b45309' : '#0284c7'}
                              opacity={0.85}
                              animate={{ d: `M 20 ${135 - reservoirLevel * 0.7} Q 150 ${165 - reservoirLevel * 0.7} 280 ${135 - reservoirLevel * 0.7} L 280 145 L 20 145 Z` }}
                              transition={{ type: 'spring', damping: 15 }}
                            />

                            {[40, 80, 220, 260].map((xPos, idx) => (
                              <g key={idx} transform={`translate(${xPos}, ${monsoonDeparture < -25 ? 110 : 95})`}>
                                <line x1="0" y1="20" x2="0" y2="0" stroke={cropYieldFactor < 60 ? '#78350f' : '#22c55e'} strokeWidth="3" />
                                <circle cx="-3" cy="-2" r="4" fill={cropYieldFactor < 60 ? '#a16207' : '#16a34a'} />
                                <circle cx="3" cy="-4" r="4" fill={cropYieldFactor < 60 ? '#a16207' : '#16a34a'} />
                              </g>
                            ))}

                            <text x="150" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                              Reservoir Storage: {reservoirLevel}% | Crop Index: {cropYieldFactor}%
                            </text>
                          </svg>
                        </div>
                      </div>

                      {/* Predict-Then-Check Section */}
                      {!predictionMade ? (
                        <motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                          <p className="text-xs font-bold text-gold-300">PREDICTION CHALLENGE: {PREDICTION_QUESTIONS[0].question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                className="text-left p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs rounded-lg border border-slate-700"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="p-3 bg-gold-950/40 rounded-xl border border-gold-900/60 flex items-center justify-between text-xs">
                          <span className="text-gold-200">
                            {predictionVerified
                              ? '✅ Verified via simulation: Deficit triggers hydrological reservoir depletion & crop stress.'
                              : PREDICTION_QUESTIONS[0].verifyInstruction}
                          </span>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Visual Slide 2: Natural Vegetation & Runoff */}
                  {currentSlide === 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-full md:w-1/2 space-y-3">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-rose-400">Degraded (10%)</span>
                            <span className="text-amber-400 font-bold">Present (21.67%)</span>
                            <span className="text-emerald-400 font-bold">Target (33% Plains / 67% Hills)</span>
                          </div>
                          {/* REAL-TIME SLIDER CONNECTED TO STATE */}
                          <input
                            type="range"
                            min={10}
                            max={67}
                            value={forestCoverPct}
                            onChange={(e) => handleForestSlider(Number(e.target.value))}
                            aria-label="Forest Cover Percentage slider"
                            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                          />
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                              <span className="text-slate-400">Forest Canopy:</span>
                              <p className="font-bold text-emerald-400 text-sm mt-0.5">{forestCoverPct.toFixed(1)}%</p>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.02 }} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                              <span className="text-slate-400">Erosive Runoff:</span>
                              <p className={`font-bold text-sm mt-0.5 ${soilRunoffRate > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {soilRunoffRate}%
                              </p>
                            </motion.div>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                            <p className="font-bold text-slate-200">National Forest Policy (1988) Mandate:</p>
                            <p className="text-slate-400">
                              Plains need <span className="text-emerald-300 font-semibold">33%</span> to ensure ecological stability. Steep slopes in Himalaya/Western Ghats require <span className="text-emerald-300 font-semibold">67%</span> to bind soil against landslides.
                            </p>
                          </div>
                        </div>

                        {/* Multi-Representation Chart */}
                        <div className="w-full md:w-1/2 h-48 bg-slate-900 rounded-xl p-2 border border-slate-800">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { cover: 10, runoff: 88, recharge: 15 },
                              { cover: 21.7, runoff: 72, recharge: 32 },
                              { cover: 33, runoff: 45, recharge: 65 },
                              { cover: 50, runoff: 25, recharge: 85 },
                              { cover: 67, runoff: 12, recharge: 95 },
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="cover" stroke="#94a3b8" label={{ value: 'Forest %', position: 'insideBottom', offset: -2, fill: '#94a3b8', fontSize: 10 }} />
                              <YAxis stroke="#94a3b8" fontSize={10} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                              <Legend wrapperStyle={{ fontSize: '11px' }} />
                              <Line type="monotone" dataKey="runoff" stroke="#f43f5e" name="Surface Runoff %" strokeWidth={2} />
                              <Line type="monotone" dataKey="recharge" stroke="#10b981" name="Aquifer Recharge %" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Observation Question */}
                      {!observationAnswered && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                          <p className="text-xs font-bold text-slate-200">OBSERVATION CHECK: {OBSERVATION_QUESTIONS[0].question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleObservation(idx)}
                                className="text-left p-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs rounded-lg border border-slate-700"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Visual Slide 3: Population Density Disparities */}
                  {currentSlide === 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex gap-3 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDensityRegion('bihar')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeDensityRegion === 'bihar'
                              ? 'bg-gold-600 text-white shadow-md'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Indo-Gangetic Plain (Bihar)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDensityRegion('uttarakhand')}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            activeDensityRegion === 'uttarakhand'
                              ? 'bg-gold-600 text-white shadow-md'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          Himalayan Mountain (Uttarakhand)
                        </motion.button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div 
                          key={activeDensityRegion}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
                        >
                          <h4 className="text-sm font-bold text-white flex items-center justify-between">
                            <span>{activeDensityRegion === 'bihar' ? 'Bihar Plain' : 'Uttarakhand Hills'}</span>
                            <span className="text-xs text-gold-400">Census 2011 Data</span>
                          </h4>

                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                              <span className="text-slate-400">Arithmetic Density (Total Land):</span>
                              <span className="font-mono font-bold text-slate-200">
                                {activeDensityRegion === 'bihar' ? '1,106 persons/km²' : '189 persons/km²'}
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-slate-950 rounded-lg">
                              <span className="text-slate-400">Cultivable Land Share:</span>
                              <span className="font-mono font-bold text-slate-200">
                                {activeDensityRegion === 'bihar' ? '60% of total area' : '12% of total area'}
                              </span>
                            </div>
                            <div className="flex justify-between p-2 bg-gold-950/60 rounded-lg border border-gold-900/40">
                              <span className="text-gold-300 font-semibold">Physiological Density (Cultivated Land):</span>
                              <span className="font-mono font-bold text-emerald-400">
                                {activeDensityRegion === 'bihar' ? '1,843 persons/km²' : '1,575 persons/km²'}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 leading-relaxed">
                            💡 <span className="text-slate-200 font-semibold">Key Takeaway:</span> While Uttarakhand looks sparsely populated overall (189/km²), its population pressure on actual food-growing terrace soil is nearly as intense as the fertile Gangetic plain!
                          </p>
                        </motion.div>

                        <div className="h-44 bg-slate-900 rounded-xl p-2 border border-slate-800">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              {
                                name: 'Arithmetic',
                                Bihar: 1106,
                                Uttarakhand: 189
                              },
                              {
                                name: 'Physiological',
                                Bihar: 1843,
                                Uttarakhand: 1575
                              }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                              <YAxis stroke="#94a3b8" fontSize={10} />
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '11px' }} />
                              <Legend wrapperStyle={{ fontSize: '11px' }} />
                              <Bar dataKey="Bihar" fill="#4f46e5" />
                              <Bar dataKey="Uttarakhand" fill="#10b981" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Visual Slide 4: Rural Settlement Morphologies */}
                  {currentSlide === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {[
                          { id: 'plain', label: 'Indo-Gangetic Plain (Compact/Rectangular)' },
                          { id: 'coastal', label: 'Coastal Kerala (Linear)' },
                          { id: 'mountain', label: 'Himalayan Slopes (Dispersed)' },
                          { id: 'plateau', label: 'Deccan Crossroads (Star-shaped)' },
                        ].map((t) => (
                          <motion.button
                            key={t.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTerrainClick(t.id as any)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              activeTerrain === t.id
                                ? 'bg-emerald-600 text-white shadow-md'
                                : 'bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            {t.label}
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                        <svg viewBox="0 0 300 160" className="w-full md:w-1/2 bg-slate-950 rounded-xl p-2 border border-slate-800">
                          {activeTerrain === 'plain' && (
                            <g>
                              <rect x="20" y="20" width="120" height="60" fill="none" stroke="#334155" strokeDasharray="2 2" />
                              <rect x="150" y="20" width="130" height="60" fill="none" stroke="#334155" strokeDasharray="2 2" />
                              <circle cx="140" cy="110" r="15" fill="#0284c7" />
                              <text x="140" y="113" textAnchor="middle" fill="white" fontSize="8">Talab</text>
                              {[
                                { x: 110, y: 95 }, { x: 130, y: 80 }, { x: 155, y: 85 },
                                { x: 170, y: 105 }, { x: 155, y: 130 }, { x: 120, y: 135 }, { x: 105, y: 115 }
                              ].map((h, i) => (
                                <rect key={i} x={h.x} y={h.y} width="12" height="10" fill="#f59e0b" rx="2" />
                              ))}
                            </g>
                          )}
                          {activeTerrain === 'coastal' && (
                            <g>
                              <path d="M 0 100 Q 150 110 300 100 L 300 160 L 0 160 Z" fill="#0369a1" />
                              <line x1="0" y1="75" x2="300" y2="75" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />
                              {[20, 55, 90, 125, 160, 195, 230, 265].map((x, i) => (
                                <rect key={i} x={x} y="55" width="14" height="12" fill="#10b981" rx="2" />
                              ))}
                              <text x="150" y="140" textAnchor="middle" fill="#bae6fd" fontSize="9">Arabian Sea (Fishing Shore)</text>
                            </g>
                          )}
                          {activeTerrain === 'mountain' && (
                            <g>
                              <path d="M 10 30 Q 150 60 290 30" stroke="#475569" strokeWidth="2" fill="none" />
                              <path d="M 10 75 Q 150 105 290 75" stroke="#475569" strokeWidth="2" fill="none" />
                              <path d="M 10 120 Q 150 150 290 120" stroke="#475569" strokeWidth="2" fill="none" />
                              <rect x="40" y="20" width="12" height="10" fill="#ec4899" rx="2" />
                              <rect x="230" y="25" width="12" height="10" fill="#ec4899" rx="2" />
                              <rect x="140" y="65" width="12" height="10" fill="#ec4899" rx="2" />
                              <rect x="70" y="105" width="12" height="10" fill="#ec4899" rx="2" />
                              <rect x="220" y="110" width="12" height="10" fill="#ec4899" rx="2" />
                            </g>
                          )}
                          {activeTerrain === 'plateau' && (
                            <g>
                              <line x1="150" y1="0" x2="150" y2="160" stroke="#64748b" strokeWidth="6" />
                              <line x1="0" y1="80" x2="300" y2="80" stroke="#64748b" strokeWidth="6" />
                              <line x1="20" y1="20" x2="280" y2="140" stroke="#64748b" strokeWidth="4" />
                              {[
                                {x: 130, y: 50}, {x: 130, y: 30}, {x: 158, y: 50}, {x: 158, y: 30},
                                {x: 130, y: 100}, {x: 130, y: 120}, {x: 158, y: 100}, {x: 158, y: 120},
                                {x: 90, y: 65}, {x: 60, y: 65}, {x: 190, y: 65}, {x: 220, y: 65}
                              ].map((h, i) => (
                                <rect key={i} x={h.x} y={h.y} width="10" height="9" fill="#8b5cf6" rx="2" />
                              ))}
                            </g>
                          )}
                        </svg>

                        <div className="w-full md:w-1/2 text-xs space-y-2">
                          <p className="font-bold text-white text-sm">
                            {activeTerrain === 'plain' && 'Compact (Nucleated) Pattern in Indo-Gangetic Plains'}
                            {activeTerrain === 'coastal' && 'Linear Pattern along Kerala Fishing Coast'}
                            {activeTerrain === 'mountain' && 'Dispersed Pattern on Rugged Himalayan Terraces'}
                            {activeTerrain === 'plateau' && 'Star-Shaped Pattern at Plateau Route Junctions'}
                          </p>
                          <p className="text-slate-300 leading-relaxed">
                            {activeTerrain === 'plain' && 'Flat relief, fertile alluvium, and shared talab/well water allow compact clustered dwellings with radiating farmland plots.'}
                            {activeTerrain === 'coastal' && 'Houses string out along the shoreline for direct daily marine access and parallel transport links.'}
                            {activeTerrain === 'mountain' && 'Patchy water springs, thin soils, and steep slopes force isolated dwellings on separate terraces.'}
                            {activeTerrain === 'plateau' && 'Converging transport corridors create a focal market with settlement arms extending outward along routes.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Visual Slide 5: Land Fragmentation & Cropping Intensity */}
                  {currentSlide === 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-full md:w-1/2 space-y-3">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-rose-400">Extreme Fragmentation (0.3 ha)</span>
                            <span className="text-amber-400">Avg India (1.08 ha)</span>
                            <span className="text-emerald-400">Economic Unit (4.0 ha)</span>
                          </div>
                          {/* REAL-TIME SLIDER CONNECTED TO STATE */}
                          <input
                            type="range"
                            min={0.3}
                            max={4.0}
                            step={0.1}
                            value={holdingSizeHa}
                            onChange={(e) => handleLandHoldingSlider(Number(e.target.value))}
                            aria-label="Land holding size in hectares slider"
                            className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                          />
                          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <div>
                              <span className="text-xs text-slate-400">Holding Size:</span>
                              <p className="font-mono font-bold text-emerald-400 text-sm">{holdingSizeHa.toFixed(2)} Hectares</p>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleToggleConsolidation}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                isConsolidated
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                              }`}
                            >
                              {isConsolidated ? '✓ Consolidation Active' : 'Apply Consolidation'}
                            </motion.button>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                            <span className="text-slate-400">Cropping Intensity & Mechanisation:</span>
                            <p className="font-bold text-white">
                              {isConsolidated || holdingSizeHa >= 2.0
                                ? '🚜 High Feasibility: Tubewell channels unified, tractor-ploughing viable, Cropping Intensity > 165%.'
                                : '⚠️ Uneconomic Parcel: Fragmented boundaries waste 15% land in bunds; irrigation and machinery costs prohibitive.'}
                            </p>
                          </div>
                        </div>

                        {/* Visual Plot Grid */}
                        <div className="w-full md:w-1/2 p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                          <svg viewBox="0 0 200 140" className="w-full bg-slate-950 rounded-lg p-2">
                            {isConsolidated ? (
                              <rect x="20" y="20" width="160" height="100" fill="#15803d" stroke="#22c55e" strokeWidth="2" rx="4" />
                            ) : (
                              <g>
                                {[
                                  {x: 20, y: 20, w: 45, h: 45}, {x: 75, y: 20, w: 45, h: 45}, {x: 130, y: 20, w: 50, h: 45},
                                  {x: 20, y: 75, w: 45, h: 45}, {x: 75, y: 75, w: 45, h: 45}, {x: 130, y: 75, w: 50, h: 45}
                                ].map((b, i) => (
                                  <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill="#854d0e" stroke="#ca8a04" strokeWidth="1" strokeDasharray="2 1" />
                                ))}
                              </g>
                            )}
                            <text x="100" y="75" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                              {isConsolidated ? 'Unified Consolidated Farm' : '6 Scattered Tiny Parcels'}
                            </text>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </motion.div>

                {/* Exploration Nav controls */}
                <div className="flex justify-between items-center pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                    disabled={currentSlide === 0}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-750 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
                  >
                    ← Previous Module
                  </motion.button>

                  <span className="text-xs text-slate-400 font-semibold">
                    {currentSlide + 1} / {EXPLORATION_STEPS.length}
                  </span>

                  {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentSlide(s => s + 1)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
                    >
                      Next Concept →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      Open Spatial Sandbox →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div 
            key="sandbox-phase"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">Spatial Resource Command Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely cross-modulate rainfall, forest canopy, land zoning, and demographic pressure with live chart feedback.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
              >
                Ready for Board Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Control Column 1 */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Atmospheric & Hazard</span>
                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Monsoon Rainfall:</span>
                    <span className="font-mono font-bold text-gold-400">{monsoonDeparture > 0 ? `+${monsoonDeparture}` : monsoonDeparture}%</span>
                  </label>
                  <input
                    type="range"
                    min={-50}
                    max={50}
                    value={monsoonDeparture}
                    onChange={(e) => handleMonsoonSlider(Number(e.target.value))}
                    aria-label="Monsoon rainfall departure control"
                    className="w-full accent-gold-500 cursor-pointer mt-1.5"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Forest Cover %:</span>
                    <span className="font-mono font-bold text-emerald-400">{forestCoverPct.toFixed(1)}%</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={67}
                    value={forestCoverPct}
                    onChange={(e) => handleForestSlider(Number(e.target.value))}
                    aria-label="Forest cover percentage control"
                    className="w-full accent-emerald-500 cursor-pointer mt-1.5"
                  />
                </div>
              </motion.div>

              {/* Control Column 2 */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Agrarian & Land Resource</span>
                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Average Holding:</span>
                    <span className="font-mono font-bold text-amber-400">{holdingSizeHa.toFixed(2)} Ha</span>
                  </label>
                  <input
                    type="range"
                    min={0.3}
                    max={4.0}
                    step={0.1}
                    value={holdingSizeHa}
                    onChange={(e) => handleLandHoldingSlider(Number(e.target.value))}
                    aria-label="Holding size in hectares control"
                    className="w-full accent-amber-500 cursor-pointer mt-1.5"
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleToggleConsolidation}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                      isConsolidated
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {isConsolidated ? '✓ Consolidation Implemented' : 'Fragmented Operational Plots'}
                  </motion.button>
                </div>
              </motion.div>

              {/* Chart Output */}
              <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Live System Metrics</span>
                <div className="h-32 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hazardChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} />
                      <YAxis stroke="#94a3b8" fontSize={9} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', fontSize: '10px' }} />
                      <Bar dataKey="yield" fill="#10b981" name="Crop Yield %" />
                      <Bar dataKey="runoff" fill="#f43f5e" name="Runoff %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div 
            key="challenge-phase"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            {/* Challenge progress & meta */}
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <span className="font-bold text-slate-300">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <motion.span whileHover={{ scale: 1.05 }} className="px-2.5 py-0.5 bg-slate-800 rounded-md text-slate-400 font-mono">
                  Competency: <strong className="text-gold-300 capitalize">{challenge.competencyLevel}</strong>
                </motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="px-2.5 py-0.5 bg-slate-800 rounded-md text-slate-400 font-mono">
                  Node: {challenge.nodeId}
                </motion.span>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* QUESTION CONTAINER WITH SHAKE & FLASH FEEDBACK */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-6 rounded-2xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-100'
              }`}
            >
              <p className="text-base font-bold leading-relaxed mb-4 text-white">
                {challenge.question}
              </p>

              {/* MCQ FORMAT */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerValidation(idx)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all flex items-start gap-3 ${
                        showExplanation && idx === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 hover:border-gold-500/50'
                      }`}
                    >
                      <span className="font-bold text-gold-400 mt-0.5">{String.fromCharCode(65 + idx)}.</span>
                      <span className="leading-snug">{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* DRAG-LABEL FORMAT */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                      >
                        :: {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                    {['zone_cropland', 'zone_village', 'zone_city', 'zone_industry'].map((targetId) => (
                      <motion.div
                        key={targetId}
                        whileHover={{ scale: 1.02 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col justify-center items-center transition-all ${
                          droppedLabels[targetId]
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950/50 border-slate-750 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                          {targetId.replace('zone_', '').toUpperCase()} ZONE
                        </span>
                        <p className="text-xs font-bold">
                          {droppedLabels[targetId] || 'Drop Label Here'}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerValidation(droppedLabels)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Verify Target Assignments
                  </motion.button>
                </div>
              )}

              {/* DRAG-SORT FORMAT */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map((idx) => challenge.sortItems![idx])
                      : challenge.sortItems
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
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="p-3 bg-slate-800 rounded-xl text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3 border border-slate-700"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 font-bold flex items-center justify-center text-[10px]">
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
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Submit Order
                  </motion.button>
                </div>
              )}

              {/* NUMERIC FORMAT */}
              {challenge.type === 'numeric' && (
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value"
                    className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerValidation(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              )}

              {/* CONSTRUCT FORMAT */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-xs font-medium border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((p, i) => (
                      <motion.span 
                        key={i} 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-gold-900/60 border border-gold-700/60 text-gold-200 text-xs rounded-lg flex items-center gap-2"
                      >
                        {p}
                        <motion.button 
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} 
                          className="text-rose-400 font-bold ml-1"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above in sequential order</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswerValidation(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Verify Constructed Sequence
                  </motion.button>
                </div>
              )}

              {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/80 space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Examiner Step-by-Step Breakdown</span>
                  
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-gold-400 mr-1.5">{sIdx + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="pt-2 flex items-center justify-between">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-amber-600/30 border border-amber-500/40 hover:bg-amber-600/50 text-amber-200 text-xs font-bold rounded-xl"
                      >
                        Reveal Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Advance to Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTION & MOTIVATIONAL FEEDBACK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div 
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800 shadow-xl text-center space-y-3"
            >
              <h2 className="text-2xl md:text-3xl font-black text-white">ISC Geography Mastery Attained!</h2>
              <p className="text-sm text-slate-300">
                Composite Examination Score: <span className="text-emerald-400 font-bold text-lg">{Math.max(0, 100 - errors * 4)}%</span> | Performance Tier: <span className="text-gold-400 font-bold uppercase">{difficulty}</span>
              </p>

              {/* MOTIVATIONAL FEEDBACK SYSTEM BASED ON ERROR COUNT */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-4 bg-slate-950/70 border border-emerald-500/40 rounded-2xl max-w-lg mx-auto"
              >
                <p className="text-base font-black text-emerald-300 tracking-wide">
                  {errors === 0
                    ? 'PERFECT SCORE!'
                    : errors >= 1 && errors <= 3
                    ? 'Great work!'
                    : errors >= 4 && errors <= 7
                    ? 'Good effort!'
                    : 'Do not give up — You WILL get this!'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {errors === 0
                    ? '🏆 Flawless spatial and analytical reasoning across all Class 12 Geography nodes!'
                    : errors <= 3
                    ? '🌟 Exceptional grasp of monsoon dynamics, demographic models, and land management.'
                    : errors <= 7
                    ? '📈 Good foundational progress in Indian physical and human geography. Keep practicing!'
                    : '💪 Geography concepts take active repetition. Study the misconception diagnosis below and try again!'}
                </p>
              </motion.div>
            </motion.div>

            {/* ─── REQUIRED REFLECTION SECTION ─── */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/95 rounded-3xl border border-gold-700/60 shadow-xl space-y-5"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-gold-950 rounded-xl border border-gold-700">🤔</span>
                <div>
                  <h3 className="text-lg font-bold text-white">Post-Simulation Geographer’s Reflection</h3>
                  <p className="text-xs text-gold-300">Consolidate your conceptual takeaways before moving to the next module.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>1.</span> What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.surprising}
                    onChange={(e) => setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g. How high physiological density is in Uttarakhand despite low arithmetic density..."
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-gold-400 flex items-center gap-1.5">
                    <span>2.</span> How would you explain this to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.explain}
                    onChange={(e) => setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))}
                    placeholder="e.g. Drought and flood in India come from the same monsoon tap being turned too low or overflowing..."
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span>3.</span> Where in real life might you use this?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionResponses.realLife}
                    onChange={(e) => setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g. Evaluating district flood risks, planning rainwater johads, or assessing urban farm buffer zones..."
                    className="w-full bg-slate-900 border border-slate-750 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-gold-500 resize-none"
                  />
                </div>
              </div>
            </motion.div>

            {/* Targeted Misconception Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3"
              >
                <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Specific Misconception Diagnosis:</h4>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions[mIdx];
                    if (!m) return null;
                    return (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-400 font-semibold">❌ {m.misconception}</p>
                        <p className="text-emerald-400 font-medium">✓ {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule Banner */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/50 flex items-center justify-between text-xs text-amber-200"
            >
              <span>
                📅 <strong className="text-white">SM-2 Spaced Repetition Protocol:</strong> Next retention review scheduled in{' '}
                <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock in long-term memory.
              </span>
            </motion.div>

            {/* Real World Activity Card */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Applied Spatial Task</span>
              <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                  <motion.div 
                    key={sIdx} 
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                  >
                    <span className="font-bold text-emerald-400">{sIdx + 1}.</span>
                    <span>{st}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}

    </motion.div>
  );
}

export default C12_GeographyDroughtsFloodsSim;