'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE DEFINITIONS & TOPIC NODES (67 Nodes)
// ==========================================
const NODE_IDS = {
  c12_geo_cbse_001: 'c12_geo_cbse_001',
  c12_geo_cbse_002: 'c12_geo_cbse_002',
  c12_geo_cbse_003: 'c12_geo_cbse_003',
  c12_geo_cbse_004: 'c12_geo_cbse_004',
  c12_geo_cbse_005: 'c12_geo_cbse_005',
  c12_geo_cbse_006: 'c12_geo_cbse_006',
  c12_geo_cbse_007: 'c12_geo_cbse_007',
  c12_geo_cbse_008: 'c12_geo_cbse_008',
  c12_geo_cbse_009: 'c12_geo_cbse_009',
  c12_geo_cbse_010: 'c12_geo_cbse_010',
  c12_geo_cbse_011: 'c12_geo_cbse_011',
  c12_geo_cbse_012: 'c12_geo_cbse_012',
  c12_geo_cbse_013: 'c12_geo_cbse_013',
  c12_geo_cbse_014: 'c12_geo_cbse_014',
  c12_geo_cbse_015: 'c12_geo_cbse_015',
  c12_geo_cbse_016: 'c12_geo_cbse_016',
  c12_geo_cbse_017: 'c12_geo_cbse_017',
  c12_geo_cbse_018: 'c12_geo_cbse_018',
  c12_geo_cbse_019: 'c12_geo_cbse_019',
  c12_geo_cbse_020: 'c12_geo_cbse_020',
  c12_geo_cbse_021: 'c12_geo_cbse_021',
  c12_geo_cbse_022: 'c12_geo_cbse_022',
  c12_geo_cbse_023: 'c12_geo_cbse_023',
  c12_geo_cbse_024: 'c12_geo_cbse_024',
  c12_geo_cbse_025: 'c12_geo_cbse_025',
  c12_geo_cbse_382: 'c12_geo_cbse_382',
  c12_geo_cbse_383: 'c12_geo_cbse_383',
  c12_geo_cbse_384: 'c12_geo_cbse_384',
  c12_geo_cbse_385: 'c12_geo_cbse_385',
  c12_geo_cbse_386: 'c12_geo_cbse_386',
  c12_geo_cbse_387: 'c12_geo_cbse_387',
  c12_geo_cbse_388: 'c12_geo_cbse_388',
  c12_geo_cbse_389: 'c12_geo_cbse_389',
  c12_geo_cbse_390: 'c12_geo_cbse_390',
  c12_geo_cbse_391: 'c12_geo_cbse_391',
  c12_geo_cbse_392: 'c12_geo_cbse_392',
  c12_geo_cbse_393: 'c12_geo_cbse_393',
  c12_geo_cbse_394: 'c12_geo_cbse_394',
  c12_geo_cbse_395: 'c12_geo_cbse_395',
  c12_geo_cbse_396: 'c12_geo_cbse_396',
  c12_geo_cbse_397: 'c12_geo_cbse_397',
  c12_geo_cbse_398: 'c12_geo_cbse_398',
  c12_geo_cbse_399: 'c12_geo_cbse_399',
  c12_geo_cbse_400: 'c12_geo_cbse_400',
  c12_geo_cbse_401: 'c12_geo_cbse_401',
  c12_geo_cbse_402: 'c12_geo_cbse_402',
  c12_geo_cbse_403: 'c12_geo_cbse_403',
  c12_geo_cbse_476: 'c12_geo_cbse_476',
  c12_geo_cbse_477: 'c12_geo_cbse_477',
  c12_geo_cbse_478: 'c12_geo_cbse_478',
  c12_geo_cbse_479: 'c12_geo_cbse_479',
  c12_geo_cbse_480: 'c12_geo_cbse_480',
  c12_geo_cbse_481: 'c12_geo_cbse_481',
  c12_geo_cbse_482: 'c12_geo_cbse_482',
  c12_geo_cbse_483: 'c12_geo_cbse_483',
  c12_geo_cbse_484: 'c12_geo_cbse_484',
  c12_geo_cbse_485: 'c12_geo_cbse_485',
  c12_geo_cbse_486: 'c12_geo_cbse_486',
  c12_geo_cbse_487: 'c12_geo_cbse_487',
  c12_geo_cbse_488: 'c12_geo_cbse_488',
  c12_geo_cbse_489: 'c12_geo_cbse_489',
  c12_geo_cbse_490: 'c12_geo_cbse_490',
  c12_geo_cbse_491: 'c12_geo_cbse_491',
  c12_geo_cbse_492: 'c12_geo_cbse_492',
  c12_geo_cbse_493: 'c12_geo_cbse_493',
  c12_geo_cbse_494: 'c12_geo_cbse_494',
  c12_geo_cbse_495: 'c12_geo_cbse_495',
} as const;

const ALL_NODE_IDS = Object.values(NODE_IDS);

// ==========================================
// SCENARIO & CURRICULUM DATA
// ==========================================
const SCENARIO = {
  title: 'National Spatial & Demographic Analytics Laboratory',
  intro: 'Welcome to the Advanced Demographic & Spatial Geography Command Center for India and Global Population Studies. As Chief Demographer, you will evaluate Census data, model demographic transition stages, calculate physiological vs. arithmetic densities, track land use shifts from 1951 to 2020, and map agricultural crop specialization across Indian states.',
  context: 'Interact with dynamic spatial maps, population growth modeling engines, occupational structure matrices, and land-use transition simulators to unravel the complex spatial patterns shaping contemporary India.',
};

const DISCOVERY_QUESTION = {
  question: 'Why can a state with a relatively modest population (such as Bihar or West Bengal) exhibit a far higher arithmetic density than Uttar Pradesh, despite Uttar Pradesh having the highest total population in India?',
  options: [
    'Arithmetic density depends solely on total population regardless of land area.',
    'Density is calculated as total population divided by surface area; high population relative to smaller geographical land area increases density drastically.',
    'Bihar and West Bengal have higher crude birth rates than all other states combined.',
    'Uttar Pradesh excludes its agricultural lands from population density calculations.',
  ],
  correctIndex: 1,
  hintAfter: 'Arithmetic population density measures human pressure per unit of total land area (Persons/km²). UP has 199.8 million people over 240,928 km² (~829/km²), whereas Bihar hosts 104 million over just 94,163 km² (1,106/km²)!',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Spatial & Physical Density Simulator',
    instruction: 'Adjust physical factors (terrain relief, soil fertility, water availability) and economic drivers to observe how population density shifts between arithmetic and physiological metrics.',
    interactionType: 'density-calculator',
    nodeId: NODE_IDS.c12_geo_cbse_003,
  },
  {
    title: 'Lab 2: Demographic Transition & Doubling Time Engine',
    instruction: 'Manipulate Crude Birth Rate (CBR) and Crude Death Rate (CDR) to observe population momentum, rate of natural increase, and calculate doubling time under Malthusian vs. modern transition models.',
    interactionType: 'demographic-transition',
    nodeId: NODE_IDS.c12_geo_cbse_009,
  },
  {
    title: 'Lab 3: Census State Profile & Worker Matrix',
    instruction: 'Select Indian states (e.g., UP, Maharashtra, Bihar, Kerala, AP, Telangana) to analyze rural-urban shares, sex ratios, and primary/secondary/tertiary occupational distribution.',
    interactionType: 'census-explorer',
    nodeId: NODE_IDS.c12_geo_cbse_001,
  },
  {
    title: 'Lab 4: Land Use Dynamics & Forest Cover Tracker (1951-2020)',
    instruction: 'Simulate land use transitions over 70 years to observe net sown area, forest cover trends, non-agricultural land growth, and fallow land dynamics.',
    interactionType: 'land-use-simulator',
    nodeId: NODE_IDS.c12_geo_cbse_016,
  },
  {
    title: 'Lab 5: Agricultural Geography & Crop Distribution Explorer',
    instruction: 'Map India\'s global crop position and analyze the state-wise top producers for foodgrains (Rice, Wheat, Maize), cash crops (Sugarcane, Cotton, Jute), and oilseeds.',
    interactionType: 'crop-geography',
    nodeId: NODE_IDS.c12_geo_cbse_019,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'If a country enters Phase III of demographic transition (Late Expanding), what rapid structural shift is observed in its birth and death rates?',
    options: [
      'Both CBR and CDR remain extremely high above 40 per 1000.',
      'CDR drops rapidly while CBR remains high, causing population explosion.',
      'CBR declines rapidly while CDR stabilizes at low levels, leading to slowing natural growth.',
      'CDR exceeds CBR resulting in immediate negative population momentum.',
    ],
    correctIndex: 2,
    verifyInstruction: 'Adjust CBR and CDR sliders in Lab 2 to Stage III (CBR ~20, CDR ~7) and observe the growth curve leveling off.',
    nodeId: NODE_IDS.c12_geo_cbse_009,
  },
  {
    question: 'Predict how physiological density changes if net arable cropland shrinks by 25% while total population increases by 15%.',
    options: [
      'Physiological density remains unchanged because arithmetic density is constant.',
      'Physiological density increases sharply because the population-to-cropland ratio surges.',
      'Physiological density decreases because land is non-agricultural.',
      'Physiological density becomes equal to agricultural density automatically.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, set Arable Cropland Area down and Total Population up to watch Physiological Density spike.',
    nodeId: NODE_IDS.c12_geo_cbse_385,
  },
  {
    question: 'Predict the long-term trend in India\'s forest cover reporting between 1951 and 2020 as per Census and Land Revenue records.',
    options: [
      'Forest land area continuously declined to near 5% due to urbanization.',
      'Demarcation of forest land by state revenue departments increased reported forest land, despite ecological forest cover fluctuations.',
      'Non-agricultural land replaced all forest land by 2001.',
      'Barren and wasteland area expanded to occupy 50% of India.',
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 4, move the timeline from 1951 to 2020 to inspect the legal forest reporting expansion curve.',
    nodeId: NODE_IDS.c12_geo_cbse_017,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the spatial concentration of India\'s population when viewing the Census State Profile matrix?',
    observableOptions: [
      'Population is uniformly spread across all 28 states with ~3.5% in each state.',
      'Over 42% of India\'s population is concentrated in just five states (UP, Maharashtra, Bihar, WB, MP).',
      'The Himalayan states contain 60% of India\'s total population.',
      'Urban centers in Rajasthan hold the highest population share in the nation.',
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.c12_geo_cbse_006,
  },
  {
    question: 'What happens to the occupational structure of a state as urbanization and industrialization indices rise in the simulation?',
    observableOptions: [
      'Primary sector workers increase from 30% to over 80%.',
      'Secondary and Tertiary sector worker proportions expand, reducing primary sector dependence.',
      'Cultivators and agricultural laborers double while tertiary services drop.',
      'Household industry becomes the sole employer for 95% of workers.',
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.c12_geo_cbse_014,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'State Demographic & Agricultural Regional Planning Project',
  description: 'Apply demographic metrics and crop geography principles to formulate a regional development plan for a simulated Indian State undergoing structural transformation.',
  steps: [
    'Step 1: Compute Arithmetic Density (120 million people / 150,000 km² = 800 persons/km²) and Physiological Density (120 million / 60,000 km² arable land = 2,000 persons/ha cropland).',
    'Step 2: Determine Rate of Natural Increase (CBR 18.2 - CDR 6.0 = 12.2 per 1,000 or 1.22% annual growth rate).',
    'Step 3: Calculate Population Doubling Time using Rule of 70 (70 / 1.22 ≈ 57.38 years).',
    'Step 4: Analyze occupational shift: 54% primary, 16% secondary, 30% tertiary. Recommend skill development initiatives (PMKVY) to transition rural youth to high-value agro-processing and tertiary services.',
  ],
};

// ==========================================
// MISCONCEPTIONS & DIAGNOSTIC DATA
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Arithmetic density reflects true agricultural pressure on land.',
    correction: 'Arithmetic density divides population by total area (including lakes, mountains, deserts). Physiological density (Population / Arable Land) and Agricultural Density (Agricultural Population / Net Sown Area) measure true human pressure on cultivated land.',
  },
  {
    id: 'misc_02',
    misconception: 'High population growth rate is caused purely by high birth rates.',
    correction: 'Population growth is driven by Natural Increase (CBR - CDR) and Net Migration. A rapid fall in CDR (due to healthcare improvements) while CBR falls slowly creates a high growth rate even as birth rates decline.',
  },
  {
    id: 'misc_03',
    misconception: 'India\'s four phases of population growth show continuous rapid growth.',
    correction: 'Phase I (1901-1921) was a stagnant/stationary phase with high CBR and high CDR (1921 was the Great Divide year of negative growth). Phase II (1921-1951) was steady growth. Phase III (1951-1981) was population explosion. Phase IV (1981-present) shows high growth with definite signs of slowing down.',
  },
  {
    id: 'misc_04',
    misconception: 'An increase in forest land category always means dense natural trees planted.',
    correction: 'In Indian land revenue statistics, "Forest" includes area demarcated or classified as forest under legal statutes, regardless of whether actual dense tree cover exists on that ground.',
  },
  {
    id: 'misc_05',
    misconception: 'West Bengal produces the most wheat in India because of deltaic soils.',
    correction: 'West Bengal is India\'s top producer of Rice and Jute. Uttar Pradesh is the leading producer of Wheat, Sugarcane, and total Foodgrains due to alluvial Indo-Gangetic plains and extensive canal irrigation.',
  },
  {
    id: 'misc_06',
    misconception: 'Demographic transition ends in permanent population explosion.',
    correction: 'Demographic Transition Theory models progression to Stage IV/V where birth rates fall to match or drop below death rates, stabilizing population or leading to population decline (e.g., Japan, Western Europe).',
  },
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'According to Census 2011, what is the national average population density of India?',
    options: ['324 persons/km²', '382 persons/km²', '415 persons/km²', '511 persons/km²'],
    correctIndex: 1,
    explanation: 'The national average population density of India according to the 2011 Census is 382 persons per square kilometer (up from 325 in 2001).',
  },
  {
    id: 'diag_2',
    question: 'Which year is known as the "Demographic Divide" in the history of India\'s population growth?',
    options: ['1911', '1921', '1951', '1971'],
    correctIndex: 1,
    explanation: '1921 is called the Demographic Divide because prior to 1921 growth was fluctuating and stagnant (negative growth during 1911-1921 due to epidemics like influenza), after which population grew continuously.',
  },
  {
    id: 'diag_3',
    question: 'How is Physiological Density calculated?',
    options: [
      'Total Population / Total Area',
      'Total Population / Arable Land Area',
      'Agricultural Population / Net Sown Area',
      'Urban Population / Urban Built-up Area',
    ],
    correctIndex: 1,
    explanation: 'Physiological density = Total Population ÷ Net Cultivated (Arable) Area.',
  },
  {
    id: 'diag_4',
    question: 'Which of the following states has the HIGHEST proportion of rural population according to Census 2011?',
    options: ['Bihar', 'Himachal Pradesh', 'Assam', 'Odisha'],
    correctIndex: 1,
    explanation: 'Himachal Pradesh has the highest rural population share (~89.97%), followed by Bihar (~88.7%).',
  },
  {
    id: 'diag_5',
    question: 'What phase of demographic growth did India experience during 1951–1981?',
    options: ['Stagnant Growth Phase', 'Steady Growth Phase', 'Population Explosion Phase', 'High Declining Phase'],
    correctIndex: 2,
    explanation: '1951-1981 is referred to as the period of Population Explosion in India due to a sharp fall in mortality rates alongside high birth rates.',
  },
  {
    id: 'diag_6',
    question: 'Which state is the top producer of Groundnut in India?',
    options: ['Gujarat', 'Rajasthan', 'Andhra Pradesh', 'Tamil Nadu'],
    correctIndex: 0,
    explanation: 'Gujarat is the leading producer of Groundnut in India, followed by Rajasthan and Tamil Nadu.',
  },
  {
    id: 'diag_7',
    question: 'Which crop requires high temperature (20-30°C), heavy rainfall (100-200 cm) or flood plain alluvial soils, and is predominantly grown in West Bengal and Bihar?',
    options: ['Wheat', 'Jute', 'Cotton', 'Rapeseed'],
    correctIndex: 1,
    explanation: 'Jute (the golden fiber) thrives in warm, humid deltaic soils with high rainfall, concentrated in West Bengal, Bihar, and Assam.',
  },
  {
    id: 'diag_8',
    question: 'What does the Malthusian theory of population state?',
    options: [
      'Population grows arithmetically while food production increases geometrically.',
      'Population grows geometrically (1, 2, 4, 8...) while food supply increases arithmetically (1, 2, 3, 4...).',
      'Death rates drop automatically when industrialization reaches 50%.',
      'Migration is solely driven by pull factors in urban zones.',
    ],
    correctIndex: 1,
    explanation: 'Thomas Malthus posited that unchecked population increases geometrically while food production only expands arithmetically, leading to positive checks.',
  },
];

// ==========================================
// STATE & CROP DATA ARRAYS
// ==========================================
interface StateDemographicData {
  id: string;
  name: string;
  populationMillions: number;
  areaKm2: number;
  arableAreaKm2: number;
  popSharePct: number;
  density: number;
  physioDensity: number;
  urbanPct: number;
  decadalGrowthPct: number;
  sexRatio: number;
  primaryWorkerPct: number;
  secondaryWorkerPct: number;
  tertiaryWorkerPct: number;
  topCrop: string;
  cbr: number;
  cdr: number;
}

const INDIAN_STATES_DATA: StateDemographicData[] = [
  {
    id: 'up',
    name: 'Uttar Pradesh',
    populationMillions: 199.8,
    areaKm2: 240928,
    arableAreaKm2: 165000,
    popSharePct: 16.5,
    density: 829,
    physioDensity: 1210,
    urbanPct: 22.3,
    decadalGrowthPct: 20.2,
    sexRatio: 912,
    primaryWorkerPct: 59.3,
    secondaryWorkerPct: 9.9,
    tertiaryWorkerPct: 30.8,
    topCrop: 'Wheat, Sugarcane',
    cbr: 25.1,
    cdr: 6.5,
  },
  {
    id: 'mh',
    name: 'Maharashtra',
    populationMillions: 112.4,
    areaKm2: 307713,
    arableAreaKm2: 174000,
    popSharePct: 9.28,
    density: 365,
    physioDensity: 645,
    urbanPct: 45.2,
    decadalGrowthPct: 16.0,
    sexRatio: 929,
    primaryWorkerPct: 52.7,
    secondaryWorkerPct: 14.1,
    tertiaryWorkerPct: 33.2,
    topCrop: 'Cotton, Soyabean, Sugarcane',
    cbr: 15.6,
    cdr: 5.4,
  },
  {
    id: 'br',
    name: 'Bihar',
    populationMillions: 104.1,
    areaKm2: 94163,
    arableAreaKm2: 53000,
    popSharePct: 8.6,
    density: 1106,
    physioDensity: 1964,
    urbanPct: 11.3,
    decadalGrowthPct: 25.4,
    sexRatio: 918,
    primaryWorkerPct: 77.1,
    secondaryWorkerPct: 4.8,
    tertiaryWorkerPct: 18.1,
    topCrop: 'Rice, Maize, Jute',
    cbr: 25.8,
    cdr: 5.8,
  },
  {
    id: 'wb',
    name: 'West Bengal',
    populationMillions: 91.3,
    areaKm2: 88752,
    arableAreaKm2: 52000,
    popSharePct: 7.54,
    density: 1028,
    physioDensity: 1755,
    urbanPct: 31.9,
    decadalGrowthPct: 13.8,
    sexRatio: 950,
    primaryWorkerPct: 44.0,
    secondaryWorkerPct: 18.2,
    tertiaryWorkerPct: 37.8,
    topCrop: 'Rice, Jute',
    cbr: 14.9,
    cdr: 5.5,
  },
  {
    id: 'mp',
    name: 'Madhya Pradesh',
    populationMillions: 72.6,
    areaKm2: 308245,
    arableAreaKm2: 150000,
    popSharePct: 6.0,
    density: 236,
    physioDensity: 484,
    urbanPct: 27.6,
    decadalGrowthPct: 20.3,
    sexRatio: 931,
    primaryWorkerPct: 69.8,
    secondaryWorkerPct: 7.2,
    tertiaryWorkerPct: 23.0,
    topCrop: 'Soyabean, Wheat, Pulses',
    cbr: 24.1,
    cdr: 6.7,
  },
  {
    id: 'tn',
    name: 'Tamil Nadu',
    populationMillions: 72.1,
    areaKm2: 130058,
    arableAreaKm2: 56000,
    popSharePct: 5.96,
    density: 555,
    physioDensity: 1287,
    urbanPct: 48.4,
    decadalGrowthPct: 15.6,
    sexRatio: 996,
    primaryWorkerPct: 42.1,
    secondaryWorkerPct: 20.5,
    tertiaryWorkerPct: 37.4,
    topCrop: 'Rice, Groundnut, Sugarcane',
    cbr: 13.8,
    cdr: 6.1,
  },
  {
    id: 'rj',
    name: 'Rajasthan',
    populationMillions: 68.5,
    areaKm2: 342239,
    arableAreaKm2: 180000,
    popSharePct: 5.66,
    density: 200,
    physioDensity: 380,
    urbanPct: 24.9,
    decadalGrowthPct: 21.3,
    sexRatio: 928,
    primaryWorkerPct: 62.1,
    secondaryWorkerPct: 10.4,
    tertiaryWorkerPct: 27.5,
    topCrop: 'Mustard/Rapeseed, Bajra',
    cbr: 23.5,
    cdr: 5.9,
  },
  {
    id: 'ka',
    name: 'Karnataka',
    populationMillions: 61.1,
    areaKm2: 191791,
    arableAreaKm2: 105000,
    popSharePct: 5.05,
    density: 319,
    physioDensity: 581,
    urbanPct: 38.7,
    decadalGrowthPct: 15.6,
    sexRatio: 973,
    primaryWorkerPct: 54.8,
    secondaryWorkerPct: 13.5,
    tertiaryWorkerPct: 31.7,
    topCrop: 'Maize, Sunflower, Coffee',
    cbr: 16.7,
    cdr: 6.2,
  },
  {
    id: 'gj',
    name: 'Gujarat',
    populationMillions: 60.4,
    areaKm2: 196024,
    arableAreaKm2: 98000,
    popSharePct: 4.99,
    density: 308,
    physioDensity: 616,
    urbanPct: 42.6,
    decadalGrowthPct: 19.3,
    sexRatio: 919,
    primaryWorkerPct: 51.8,
    secondaryWorkerPct: 17.6,
    tertiaryWorkerPct: 30.6,
    topCrop: 'Groundnut, Cotton',
    cbr: 19.3,
    cdr: 5.7,
  },
  {
    id: 'ap',
    name: 'Andhra Pradesh',
    populationMillions: 49.5,
    areaKm2: 162975,
    arableAreaKm2: 75000,
    popSharePct: 4.1,
    density: 304,
    physioDensity: 660,
    urbanPct: 29.5,
    decadalGrowthPct: 11.0,
    sexRatio: 993,
    primaryWorkerPct: 62.3,
    secondaryWorkerPct: 9.8,
    tertiaryWorkerPct: 27.9,
    topCrop: 'Rice, Groundnut, Tobacco',
    cbr: 15.9,
    cdr: 6.3,
  },
  {
    id: 'tg',
    name: 'Telangana',
    populationMillions: 35.0,
    areaKm2: 112077,
    arableAreaKm2: 50000,
    popSharePct: 2.9,
    density: 312,
    physioDensity: 700,
    urbanPct: 38.9,
    decadalGrowthPct: 13.6,
    sexRatio: 988,
    primaryWorkerPct: 55.6,
    secondaryWorkerPct: 12.1,
    tertiaryWorkerPct: 32.3,
    topCrop: 'Rice, Cotton, Maize',
    cbr: 16.4,
    cdr: 6.1,
  },
  {
    id: 'kl',
    name: 'Kerala',
    populationMillions: 33.4,
    areaKm2: 38863,
    arableAreaKm2: 20000,
    popSharePct: 2.76,
    density: 860,
    physioDensity: 1670,
    urbanPct: 47.7,
    decadalGrowthPct: 4.9,
    sexRatio: 1084,
    primaryWorkerPct: 26.1,
    secondaryWorkerPct: 21.4,
    tertiaryWorkerPct: 52.5,
    topCrop: 'Rubber, Coconut, Spices',
    cbr: 13.3,
    cdr: 6.9,
  },
  {
    id: 'kl_hp',
    name: 'Himachal Pradesh',
    populationMillions: 6.86,
    areaKm2: 55673,
    arableAreaKm2: 5500,
    popSharePct: 0.57,
    density: 123,
    physioDensity: 1247,
    urbanPct: 10.0,
    decadalGrowthPct: 12.9,
    sexRatio: 972,
    primaryWorkerPct: 66.4,
    secondaryWorkerPct: 6.8,
    tertiaryWorkerPct: 26.8,
    topCrop: 'Apples, Maize, Wheat',
    cbr: 15.7,
    cdr: 6.5,
  },
  {
    id: 'ar',
    name: 'Arunachal Pradesh',
    populationMillions: 1.38,
    areaKm2: 83743,
    arableAreaKm2: 2200,
    popSharePct: 0.11,
    density: 17,
    physioDensity: 627,
    urbanPct: 22.9,
    decadalGrowthPct: 26.0,
    sexRatio: 938,
    primaryWorkerPct: 63.8,
    secondaryWorkerPct: 4.1,
    tertiaryWorkerPct: 32.1,
    topCrop: 'Rice, Maize, Fruits',
    cbr: 18.2,
    cdr: 5.1,
  },
];

interface CropData {
  id: string;
  name: string;
  category: 'Foodgrain' | 'Oilseed' | 'Cash Crop';
  globalRank: string;
  topStates: string[];
  climateConditions: string;
  soilRequirement: string;
}

const CROP_DATABASE: CropData[] = [
  {
    id: 'rice',
    name: 'Rice',
    category: 'Foodgrain',
    globalRank: '2nd (after China)',
    topStates: ['West Bengal', 'Uttar Pradesh', 'Punjab'],
    climateConditions: 'Hot & humid (20-35°C), high rainfall (>100 cm)',
    soilRequirement: 'Deep clayey and alluvial delta soils',
  },
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'Foodgrain',
    globalRank: '2nd (after China)',
    topStates: ['Uttar Pradesh', 'Madhya Pradesh', 'Punjab'],
    climateConditions: 'Cool growing season (10-15°C), bright sunshine at ripening (21-26°C), 50-75 cm rainfall',
    soilRequirement: 'Well-drained fertile loamy & alluvial soil',
  },
  {
    id: 'maize',
    name: 'Maize',
    category: 'Foodgrain',
    globalRank: 'Top 10 Globally',
    topStates: ['Karnataka', 'Madhya Pradesh', 'Maharashtra'],
    climateConditions: '21-27°C, moderate rainfall (50-100 cm), sensitive to frost',
    soilRequirement: 'Old alluvial soils & well-drained red/black soil',
  },
  {
    id: 'groundnut',
    name: 'Groundnut',
    category: 'Oilseed',
    globalRank: '2nd (after China)',
    topStates: ['Gujarat', 'Rajasthan', 'Tamil Nadu'],
    climateConditions: 'Warm climate (20-30°C), light rainfall (50-75 cm), dry weather during harvesting',
    soilRequirement: 'Well-drained light sandy loams & red soils',
  },
  {
    id: 'rapeseed',
    name: 'Rapeseed & Mustard',
    category: 'Oilseed',
    globalRank: '3rd Globally',
    topStates: ['Rajasthan', 'Madhya Pradesh', 'Haryana'],
    climateConditions: 'Subtropical cool climate (15-25°C), frost sensitive',
    soilRequirement: 'Light to medium loamy soils',
  },
  {
    id: 'soyabean',
    name: 'Soyabean',
    category: 'Oilseed',
    globalRank: '5th Globally',
    topStates: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan'],
    climateConditions: 'Warm, humid climate (26-32°C), monsoon rains (60-80 cm)',
    soilRequirement: 'Well-drained fertile black cotton soils',
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    category: 'Cash Crop',
    globalRank: '2nd (after Brazil)',
    topStates: ['Uttar Pradesh', 'Maharashtra', 'Karnataka'],
    climateConditions: 'Hot & humid (21-27°C), 75-100 cm rainfall, long sunlit days',
    soilRequirement: 'Deep rich alluvial & clayey/black soils',
  },
  {
    id: 'cotton',
    name: 'Cotton',
    category: 'Cash Crop',
    globalRank: '1st or 2nd (competing with China)',
    topStates: ['Gujarat', 'Maharashtra', 'Telangana'],
    climateConditions: 'High temp (21-30°C), 210 frost-free days, bright sunshine',
    soilRequirement: 'Regur / Black cotton soil of Deccan Plateau',
  },
  {
    id: 'jute',
    name: 'Jute',
    category: 'Cash Crop',
    globalRank: '1st (Global Leader)',
    topStates: ['West Bengal', 'Bihar', 'Assam'],
    climateConditions: 'High temp (24-35°C), heavy rainfall (150-200 cm), high humidity',
    soilRequirement: 'New alluvial silt soils refreshed annually by floods',
  },
];

// ==========================================
// 25 DETAILED CHALLENGES ACROSS 3 TIERS
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify' | 'distinguish';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'c1',
    nodeId: NODE_IDS.c12_geo_cbse_382,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge Recall',
    question: 'According to Census 2011, what is the average arithmetic population density of India?',
    options: ['325 persons/km²', '382 persons/km²', '415 persons/km²', '512 persons/km²'],
    correctIndex: 1,
    explanation: 'India\'s arithmetic population density rose from 325 persons/km² in 2001 to 382 persons/km² in 2011.',
    hints: ['It is between 350 and 400 persons per square kilometer.', 'Look for the 380s figure in Census 2011.'],
  },
  {
    id: 'c2',
    nodeId: NODE_IDS.c12_geo_cbse_003,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Conceptual Understanding',
    question: 'Which state ranks HIGHEST in arithmetic population density among all Indian states in Census 2011?',
    options: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Kerala'],
    correctIndex: 2,
    explanation: 'Bihar has the highest population density among states at 1,106 persons per km², surpassing West Bengal (1,028 persons per km²).',
    hints: ['West Bengal was #1 in 2001, but another eastern state surpassed it in 2011.', 'Its density exceeds 1,100 persons per km².'],
  },
  {
    id: 'c3',
    nodeId: NODE_IDS.c12_geo_cbse_009,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Definition',
    question: 'What is the formula for calculating the Rate of Natural Increase of population?',
    options: [
      'Crude Birth Rate + Crude Death Rate',
      'Crude Birth Rate - Crude Death Rate',
      '(Crude Birth Rate / Crude Death Rate) * 100',
      'Total Population / Net Sown Area',
    ],
    correctIndex: 1,
    explanation: 'Rate of Natural Increase (RNI) is the difference between Crude Birth Rate (CBR) and Crude Death Rate (CDR), expressed per 1,000 or as a percentage.',
    hints: ['Natural increase excludes migration and subtracts deaths from births.', 'It is CBR minus CDR.'],
  },
  {
    id: 'c4',
    nodeId: NODE_IDS.c12_geo_cbse_017,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Factual Knowledge',
    question: 'What has been the general trend in official reported Forest Cover area in land revenue records in India between 1951 and 2020?',
    options: [
      'Continuous decline down to 2%',
      'Increase in reported forest land area due to statutory demarcation by state authorities',
      'Fluctuated randomly every decade without any pattern',
      'Remain fixed at 33.3% continuously',
    ],
    correctIndex: 1,
    explanation: 'Reported forest land in revenue records increased primarily because more area was brought under government demarcation, statutory classification, and state forest department administration.',
    hints: ['Distinguish between statutory revenue administrative land and actual satellite green canopy.', 'State demarcation expanded reported administrative boundaries.'],
    misconceptionIndex: 3,
  },
  {
    id: 'c5',
    nodeId: NODE_IDS.c12_geo_cbse_019,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Global Ranking',
    question: 'India is the world\'s largest producer of which of the following cash/fiber crops?',
    options: ['Wheat', 'Jute', 'Rubber', 'Coffee'],
    correctIndex: 1,
    explanation: 'India is the world\'s largest producer of Jute (the golden fiber), concentrated heavily in West Bengal and the lower Gangetic delta.',
    hints: ['This crop is known as the "golden fiber".', 'It thrives in hot, flooded Gangetic deltas.'],
  },
  {
    id: 'c6',
    nodeId: NODE_IDS.c12_geo_cbse_398,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Demographic History',
    question: 'The decade 1911-1921 in India recorded a negative population growth rate (-0.31%). Why is 1921 called the "Great Demographic Divide"?',
    options: [
      'Birth rates suddenly dropped to zero.',
      'Prior to 1921, growth was stagnant and fluctuating due to epidemics; after 1921, population grew consistently.',
      'Mass emigration reduced the population permanently.',
      'Census reporting began for the first time in 1921.',
    ],
    correctIndex: 1,
    explanation: 'Before 1921, mortality was high and fluctuating (Spanish Flu epidemic of 1918). Post-1921, healthcare improvements controlled mortality, marking continuous population growth.',
    hints: ['Think of the mortality transition before and after 1921.', '1921 marks the boundary between stagnant fluctuating population and persistent growth.'],
  },
  {
    id: 'c7',
    nodeId: NODE_IDS.c12_geo_cbse_486,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Spatial Factors',
    question: 'Which of the following physical geographic factors acts as a primary PULL factor for dense human settlement in the Northern Plains of India?',
    options: [
      'Extremely rugged mountain topography',
      'Perennial river network, fertile alluvial soil, and flat plain terrain',
      'Arid desert conditions with sand dunes',
      'Dense equatorial rainforest mantle',
    ],
    correctIndex: 1,
    explanation: 'The flat relief, alluvial fertility, and water supply from perennial Himalayan rivers (Ganga, Yamuna) attract dense settlements in the Indo-Gangetic plains.',
    hints: ['Consider what makes agriculture and infrastructure building easy.', 'Alluvial plain soils with river water supply.'],
  },

  // --- STANDARD (9) ---
  {
    id: 'c8',
    nodeId: NODE_IDS.c12_geo_cbse_385,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analytical Calculation',
    question: 'A region has a total population of 50,000,000 persons, a total land area of 100,000 km², and net arable cropland of 25,000 km². Calculate its Physiological Density (in persons per km² of arable land).',
    correctAnswer: 2000,
    tolerance: 5,
    explanation: 'Physiological Density = Total Population ÷ Net Arable Land Area = 50,000,000 / 25,000 = 2,000 persons/km².',
    hints: ['Divide Total Population by Arable Land Area (not total area).', '50,000,000 ÷ 25,000 = ?'],
  },
  {
    id: 'c9',
    nodeId: NODE_IDS.c12_geo_cbse_387,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Formula Application',
    question: 'Using the Rule of 70, calculate the approximate Population Doubling Time (in years) for a country with an annual population growth rate of 1.4%.',
    correctAnswer: 50,
    tolerance: 1,
    explanation: 'Doubling Time = 70 / Annual Growth Rate (%) = 70 / 1.4 = 50 years.',
    hints: ['Formula: Doubling Time = 70 ÷ Growth Rate.', '70 divided by 1.4 equals...'],
  },
  {
    id: 'c10',
    nodeId: NODE_IDS.c12_geo_cbse_008,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Table & Data Interpretation',
    question: 'State A has an urban population share of 48.4%, while State B has an urban share of 11.3%. Based on Census 2011 patterns, which pair correctly represents State A and State B?',
    options: [
      'State A = Bihar, State B = Tamil Nadu',
      'State A = Tamil Nadu, State B = Bihar',
      'State A = Himachal Pradesh, State B = Maharashtra',
      'State A = UP, State B = Kerala',
    ],
    correctIndex: 1,
    explanation: 'Tamil Nadu is among India\'s most urbanized major states (48.4% urban share), whereas Bihar is among the least urbanized (11.3% urban share).',
    hints: ['Tamil Nadu has close to half its population in urban areas.', 'Bihar has over 88% rural population.'],
  },
  {
    id: 'c11',
    nodeId: NODE_IDS.c12_geo_cbse_014,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Occupational Structural Analysis',
    question: 'Kerala exhibits a tertiary sector employment share exceeding 52%, while primary sector employment is under 27%. What key socio-economic indicators explain this unique occupational pattern?',
    options: [
      'High illiteracy and dominance of subsistence agriculture',
      'High literacy, advanced human development index (HDI), expansion of services, healthcare, and foreign remittances',
      'Complete lack of coastal access and fishing industry',
      'Total industrial shutdown across the entire state',
    ],
    correctIndex: 1,
    explanation: 'Kerala\'s high human development index, educational achievements, service sector expansion, and international migration/remittance economy drive tertiary dominance.',
    hints: ['Think of Kerala\'s literacy rate and global service workforce.', 'Education, healthcare, tourism, and remittance service economy.'],
  },
  {
    id: 'c12',
    nodeId: NODE_IDS.c12_geo_cbse_020,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Agricultural Geography',
    question: 'Which Indian state ranks FIRST in total production of Soyabean and total Pulses, earning the title "Soybowl of India"?',
    options: ['Uttar Pradesh', 'Gujarat', 'Madhya Pradesh', 'Punjab'],
    correctIndex: 2,
    explanation: 'Madhya Pradesh is the leading producer of Soyabean and Pulses in India due to vast black and loamy soils under rainfed agriculture.',
    hints: ['It is a central Indian state with extensive black soils.', 'MP is known as the pulses and soyabean hub.'],
  },
  {
    id: 'c13',
    nodeId: NODE_IDS.c12_geo_cbse_021,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Crop Requirement Analysis',
    question: 'A farmer in Gujarat plans to grow Groundnut and Cotton. What natural climatic and soil conditions favor this regional crop specialization?',
    options: ['Heavy waterlogged silt soils with 300 cm rainfall', 'Well-drained light loams & Regur (black cotton) soils with 50-100 cm rainfall and sunny weather', 'Sub-zero temperatures and frozen permafrost', 'Peaty acidic soils with zero sunshine'],
    correctIndex: 1,
    explanation: 'Gujarat\'s black cotton soils (Regur) and well-drained loams combined with moderate rainfall and warm sunshine make it ideal for Cotton and Groundnut.',
    hints: ['Cotton prefers black regur soil and sunny days.', 'Groundnut needs well-drained light loamy or black soil.'],
  },
  {
    id: 'c14',
    nodeId: NODE_IDS.c12_geo_cbse_489,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Demographic Theory',
    question: 'According to Demographic Transition Theory, Stage II (Early Expanding) is characterized by:',
    options: [
      'High CBR and High CDR resulting in near zero growth',
      'High CBR and Rapidly Falling CDR resulting in high natural growth rate (Population Explosion)',
      'Low CBR and Low CDR resulting in stationary population',
      'CBR falling below CDR resulting in negative population growth',
    ],
    correctIndex: 1,
    explanation: 'In Stage II, medical advancements and epidemic control drastically reduce Crude Death Rate, while birth rates remain elevated, creating rapid demographic expansion.',
    hints: ['Mortality drops fast while natality stays high.', 'This stage causes population explosion.'],
  },
  {
    id: 'c15',
    nodeId: NODE_IDS.c12_geo_cbse_401,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Worker Categorization',
    question: 'In the Indian Census classification of workers, a person who works for 183 days or more in a year in any economically productive activity is classified as:',
    options: ['Marginal Worker', 'Main Worker', 'Non-Worker', 'Cultivator Assistant'],
    correctIndex: 1,
    explanation: 'Main Workers are defined as those who work for major part of the reference year, i.e., at least 6 months or 183 days.',
    hints: ['The threshold is 183 days (6 months).', 'Contrast with Marginal Worker (less than 183 days).'],
  },
  {
    id: 'c16',
    nodeId: NODE_IDS.c12_geo_cbse_402,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Linguistic & Cultural Composition',
    question: 'Which is the LARGEST linguistic group in India according to Census classifications, accounting for over 70% of the population?',
    options: ['Dravidian', 'Indo-Aryan', 'Sino-Tibetan', 'Austro-Asiatic (Nishada)'],
    correctIndex: 1,
    explanation: 'Indo-Aryan language family forms the largest linguistic group in India (~73%), followed by Dravidian (~20%).',
    hints: ['It includes Hindi, Bengali, Marathi, Punjabi, Gujarati, etc.', 'Indo-European / Indo-Aryan branch.'],
  },

  // --- ADVANCED (9) ---
  {
    id: 'c17',
    nodeId: NODE_IDS.c12_geo_cbse_386,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Multi-Step Demographic Modeling',
    question: 'A state has a total population of 80 million. Its Crude Birth Rate is 22 per 1,000 and Crude Death Rate is 6 per 1,000. Assuming net migration is zero, calculate the total annual net absolute population increase in persons.',
    correctAnswer: 1280000,
    tolerance: 5000,
    explanation: 'Rate of Natural Increase = CBR - CDR = 22 - 6 = 16 per 1,000 (1.6%). Net annual increase = 80,000,000 × (16 / 1,000) = 1,280,000 persons.',
    hints: ['RNI per 1000 = 22 - 6 = 16.', 'Multiply 80,000,000 by 16 / 1000.'],
  },
  {
    id: 'c18',
    nodeId: NODE_IDS.c12_geo_cbse_384,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Comparative Density Evaluation',
    question: 'State X has Arithmetic Density of 800/km² and Physiological Density of 1,000/km². State Y has Arithmetic Density of 400/km² and Physiological Density of 2,000/km². What can be inferred about the arable land proportion in both states?',
    options: [
      'State X has a much lower proportion of arable land than State Y.',
      'State X has 80% arable land, whereas State Y has only 20% arable land, creating immense pressure on limited farmland in Y.',
      'Both states have identical cropland area.',
      'State Y is completely unpopulated in agricultural zones.',
    ],
    correctIndex: 1,
    explanation: 'Ratio of Arable Land = Arithmetic Density / Physiological Density. State X: 800/1000 = 0.8 (80% arable). State Y: 400/2000 = 0.2 (only 20% arable). Thus State Y experiences extreme farmland scarcity!',
    hints: ['Arable Area Fraction = Arithmetic Density / Physiological Density.', 'Compute 800/1000 vs 400/2000.'],
  },
  {
    id: 'c19',
    nodeId: NODE_IDS.c12_geo_cbse_491,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Malthusian vs Demographic Synthesis',
    question: 'How does the Demographic Transition Theory resolve the catastrophic prediction of Malthusian Population Theory?',
    options: [
      'Malthus assumed infinite food growth.',
      'Demographic transition demonstrates that economic development, urban education, and healthcare naturally drop birth rates, stabilizing population without requiring catastrophic Malthusian positive checks.',
      'Demographic transition proves population grows forever at 5% annually.',
      'Malthusian checks only apply to island nations.',
    ],
    correctIndex: 1,
    explanation: 'Malthus feared starvation (positive checks) would limit growth. Demographic Transition proves socio-economic modernization reduces natality (preventive check), stabilizing population naturally.',
    hints: ['Economic development acts as the best contraceptive.', 'Birth rates drop as societies urbanize and industrialize.'],
  },
  {
    id: 'c20',
    nodeId: NODE_IDS.c12_geo_cbse_016,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Land Use Dynamics',
    question: 'Between 1951 and 2020, why did the land under "Non-Agricultural Uses" grow significantly across major Indian states?',
    options: [
      'Expansion of river silt beds',
      'Rapid urban infrastructure, industrial corridors, roads, housing, and commercial development',
      'Reduction in rural village settlements',
      'Conversion of all forests into barren scrubland',
    ],
    correctIndex: 1,
    explanation: 'Infrastructure expansion, urbanization, industrial estates, highways, and residential development absorbed land into non-agricultural categories.',
    hints: ['Urbanization and industrial expansion require non-farm land.', 'Buildings, roads, factories, and urban infrastructure.'],
  },
  {
    id: 'c21',
    nodeId: NODE_IDS.c12_geo_cbse_023,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Regional State Profile - Andhra & Telangana',
    question: 'Following the reorganization of Andhra Pradesh and Telangana, what distinguishes their agricultural profile?',
    options: [
      'Telangana produces 90% of India\'s tea, while AP produces wheat.',
      'AP retains extensive deltaic rice zones (Krishna-Godavari deltas) and coastal aquaculture; Telangana leads in rain-fed Cotton, Rice, and Maize production.',
      'Neither state produces any foodgrains.',
      'Both states grow exclusively temperate fruits.',
    ],
    correctIndex: 1,
    explanation: 'AP benefits from Krishna-Godavari coastal alluvial deltas (rice/aquaculture), while Telangana relies on Deccan Plateau black/red soils for cotton, maize, and irrigated paddy.',
    hints: ['Coastal deltas vs plateau interior topography.', 'Krishna-Godavari deltas vs rainfed Deccan plateau.'],
  },
  {
    id: 'c22',
    nodeId: NODE_IDS.c12_geo_cbse_400,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Adolescent Demographics & Youth Policy',
    question: 'Adolescents (age 10-19) constitute roughly 21% of India\'s population. What policy framework was launched by the Government of India to harness their skill potential?',
    options: ['National Youth Policy & Skill India (PMKVY)', 'Zamindari Abolition Act', 'Green Revolution Phase 1', 'Malthusian Food Reserve Policy'],
    correctIndex: 0,
    explanation: 'The National Youth Policy (NYP) along with National Skill Development Mission (PMKVY) aims to empower youth and adolescents through vocational skill development and health initiatives.',
    hints: ['Skill development and youth empowerment schemes.', 'PMKVY and National Youth Policy.'],
  },
  {
    id: 'c23',
    nodeId: NODE_IDS.c12_geo_cbse_487,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Migration Push vs Pull Dynamics',
    question: 'Which of the following scenarios best exemplifies a PUSH factor driving rural-to-urban migration in Indian agrarian regions?',
    options: [
      'High wages and modern educational institutions in metro cities',
      'Agrarian distress, small fragmented landholdings, frequent droughts, and lack of off-farm employment in native villages',
      'Ample recreational parks in urban centers',
      'Availability of specialized tertiary medical hospitals in capital cities',
    ],
    correctIndex: 1,
    explanation: 'Push factors originate at the place of origin due to adverse socio-economic conditions (drought, low landholding, poverty, lack of jobs). Pull factors attract people to destinations.',
    hints: ['Push factors force people away from their home village.', 'Agrarian poverty, drought, land fragmentation.'],
  },
  {
    id: 'c24',
    nodeId: NODE_IDS.c12_geo_cbse_015,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Gender & Workforce Analysis',
    question: 'Why is female Work Participation Rate (WPR) reported lower in official data in urban India compared to rural India in traditional agricultural census surveys?',
    options: [
      'Rural women never engage in productive work.',
      'Rural women engage heavily in uncounted/informal family farm labor (cultivation/livestock), whereas urban formal jobs require recognized wage contracts which under-count informal domestic work.',
      'Urban women are prohibited from working by law.',
      'Rural women work exclusively in high-tech tertiary sectors.',
    ],
    correctIndex: 1,
    explanation: 'In rural areas, women actively participate in subsistence farming and livestock care (often underreported as unpaid family labor), whereas urban structural shifts and statistical definitions often undercount women\'s domestic/informal work.',
    hints: ['Consider uncounted family farm labor in rural areas.', 'Informal agricultural participation vs formal urban employment definitions.'],
  },
  {
    id: 'c25',
    nodeId: NODE_IDS.c12_geo_cbse_495,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Mastery Synthesis Calculation',
    question: 'State Z has a total surface area of 200,000 km² and an arithmetic density of 450 persons/km². If 40% of its land area is non-arable (mountains and water bodies), calculate the Physiological Density of State Z in persons/km².',
    correctAnswer: 750,
    tolerance: 5,
    explanation: 'Total Population = 200,000 km² × 450 persons/km² = 90,000,000. Arable Land = 60% of 200,000 = 120,000 km². Physiological Density = 90,000,000 / 120,000 = 750 persons/km².',
    hints: [
      'Total Population = Area × Arithmetic Density.',
      'Arable Land = 60% of 200,000 km² = 120,000 km².',
      'Physiological Density = Total Population ÷ Arable Land Area.',
    ],
  },
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

const IndiaPopulationDensityMapSVG: React.FC<{ selectedStateId: string; onSelectState: (id: string) => void }> = ({
  selectedStateId,
  onSelectState,
}) => {
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-2xl relative">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-amber-400 font-bold text-sm tracking-wide uppercase">
          Spatial Distribution & Density Map Matrix (India Regional Zones)
        </h4>
        <span className="text-xs text-slate-400">Click a state region to inspect census metrics</span>
      </div>
      <svg viewBox="0 0 600 500" className="w-full h-72 rounded-lg bg-slate-950 border border-slate-800">
        {/* Background Gradients & Grid */}
        <defs>
          <linearGradient id="highDensity" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#991b1b" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="modDensity" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="lowDensity" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="hillyDensity" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0e7490" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Map Outlines & Regions (Stylized Schematic India Map Grid) */}
        {/* Northern Region (UP) */}
        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('up')}
        >
          <rect
            x="240"
            y="140"
            width="120"
            height="70"
            rx="8"
            fill={selectedStateId === 'up' ? '#38bdf8' : 'url(#highDensity)'}
            stroke={selectedStateId === 'up' ? '#ffffff' : '#f87171'}
            strokeWidth={selectedStateId === 'up' ? '3' : '1'}
          />
          <text x="300" y="175" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">
            Uttar Pradesh
          </text>
          <text x="300" y="195" fill="#fecdd3" textAnchor="middle" fontSize="10">
            829 / km² (199.8M)
          </text>
        </g>

        {/* Eastern Region (Bihar & WB) */}
        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('br')}
        >
          <rect
            x="365"
            y="150"
            width="80"
            height="60"
            rx="8"
            fill={selectedStateId === 'br' ? '#38bdf8' : 'url(#highDensity)'}
            stroke={selectedStateId === 'br' ? '#ffffff' : '#f87171'}
            strokeWidth={selectedStateId === 'br' ? '3' : '1'}
          />
          <text x="405" y="180" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
            Bihar
          </text>
          <text x="405" y="196" fill="#fecdd3" textAnchor="middle" fontSize="9">
            1,106 / km²
          </text>
        </g>

        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('wb')}
        >
          <rect
            x="450"
            y="190"
            width="75"
            height="75"
            rx="8"
            fill={selectedStateId === 'wb' ? '#38bdf8' : 'url(#highDensity)'}
            stroke={selectedStateId === 'wb' ? '#ffffff' : '#f87171'}
            strokeWidth={selectedStateId === 'wb' ? '3' : '1'}
          />
          <text x="487" y="225" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
            West Bengal
          </text>
          <text x="487" y="241" fill="#fecdd3" textAnchor="middle" fontSize="9">
            1,028 / km²
          </text>
        </g>

        {/* Western Region (Rajasthan & Gujarat & Maharashtra) */}
        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('rj')}
        >
          <rect
            x="110"
            y="140"
            width="125"
            height="80"
            rx="8"
            fill={selectedStateId === 'rj' ? '#38bdf8' : 'url(#lowDensity)'}
            stroke={selectedStateId === 'rj' ? '#ffffff' : '#34d399'}
            strokeWidth={selectedStateId === 'rj' ? '3' : '1'}
          />
          <text x="172" y="175" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">
            Rajasthan
          </text>
          <text x="172" y="195" fill="#a7f3d0" textAnchor="middle" fontSize="10">
            200 / km² (Thar Arid)
          </text>
        </g>

        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('gj')}
        >
          <rect
            x="100"
            y="225"
            width="90"
            height="70"
            rx="8"
            fill={selectedStateId === 'gj' ? '#38bdf8' : 'url(#modDensity)'}
            stroke={selectedStateId === 'gj' ? '#ffffff' : '#fbbf24'}
            strokeWidth={selectedStateId === 'gj' ? '3' : '1'}
          />
          <text x="145" y="255" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
            Gujarat
          </text>
          <text x="145" y="271" fill="#fde68a" textAnchor="middle" fontSize="9">
            308 / km²
          </text>
        </g>

        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('mh')}
        >
          <rect
            x="195"
            y="225"
            width="115"
            height="85"
            rx="8"
            fill={selectedStateId === 'mh' ? '#38bdf8' : 'url(#modDensity)'}
            stroke={selectedStateId === 'mh' ? '#ffffff' : '#fbbf24'}
            strokeWidth={selectedStateId === 'mh' ? '3' : '1'}
          />
          <text x="252" y="260" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">
            Maharashtra
          </text>
          <text x="252" y="280" fill="#fde68a" textAnchor="middle" fontSize="10">
            365 / km² (112.4M)
          </text>
        </g>

        {/* Central Region (MP) */}
        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('mp')}
        >
          <rect
            x="240"
            y="215"
            width="120"
            height="60"
            rx="8"
            fill={selectedStateId === 'mp' ? '#38bdf8' : 'url(#lowDensity)'}
            stroke={selectedStateId === 'mp' ? '#ffffff' : '#34d399'}
            strokeWidth={selectedStateId === 'mp' ? '3' : '1'}
          />
          <text x="300" y="245" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
            Madhya Pradesh
          </text>
          <text x="300" y="261" fill="#a7f3d0" textAnchor="middle" fontSize="9">
            236 / km²
          </text>
        </g>

        {/* Southern Region (TN, KL, AP, TG, KA) */}
        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('tn')}
        >
          <rect
            x="235"
            y="385"
            width="90"
            height="70"
            rx="8"
            fill={selectedStateId === 'tn' ? '#38bdf8' : 'url(#modDensity)'}
            stroke={selectedStateId === 'tn' ? '#ffffff' : '#fbbf24'}
            strokeWidth={selectedStateId === 'tn' ? '3' : '1'}
          />
          <text x="280" y="415" fill="#ffffff" textAnchor="middle" fontSize="11" fontWeight="bold">
            Tamil Nadu
          </text>
          <text x="280" y="431" fill="#fde68a" textAnchor="middle" fontSize="9">
            555 / km² (48.4% Urb)
          </text>
        </g>

        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('kl')}
        >
          <rect
            x="175"
            y="385"
            width="55"
            height="70"
            rx="8"
            fill={selectedStateId === 'kl' ? '#38bdf8' : 'url(#highDensity)'}
            stroke={selectedStateId === 'kl' ? '#ffffff' : '#f87171'}
            strokeWidth={selectedStateId === 'kl' ? '3' : '1'}
          />
          <text x="202" y="415" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">
            Kerala
          </text>
          <text x="202" y="431" fill="#fecdd3" textAnchor="middle" fontSize="8">
            860/km²
          </text>
        </g>

        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('ap')}
        >
          <rect
            x="315"
            y="315"
            width="80"
            height="65"
            rx="8"
            fill={selectedStateId === 'ap' ? '#38bdf8' : 'url(#modDensity)'}
            stroke={selectedStateId === 'ap' ? '#ffffff' : '#fbbf24'}
            strokeWidth={selectedStateId === 'ap' ? '3' : '1'}
          />
          <text x="355" y="345" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">
            Andhra Pr.
          </text>
          <text x="355" y="361" fill="#fde68a" textAnchor="middle" fontSize="8">
            304 / km²
          </text>
        </g>

        {/* Northern Mountain Zone (HP / Arunachal) */}
        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('kl_hp')}
        >
          <rect
            x="240"
            y="70"
            width="100"
            height="55"
            rx="8"
            fill={selectedStateId === 'kl_hp' ? '#38bdf8' : 'url(#hillyDensity)'}
            stroke={selectedStateId === 'kl_hp' ? '#ffffff' : '#22d3ee'}
            strokeWidth={selectedStateId === 'kl_hp' ? '3' : '1'}
          />
          <text x="290" y="98" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">
            Himachal Pr.
          </text>
          <text x="290" y="114" fill="#cff4fc" textAnchor="middle" fontSize="8">
            123 / km² (89.9% Rur)
          </text>
        </g>

        <g
          className="cursor-pointer transition-all duration-300 hover:opacity-80"
          onClick={() => onSelectState('ar')}
        >
          <rect
            x="465"
            y="100"
            width="105"
            height="55"
            rx="8"
            fill={selectedStateId === 'ar' ? '#38bdf8' : 'url(#hillyDensity)'}
            stroke={selectedStateId === 'ar' ? '#ffffff' : '#22d3ee'}
            strokeWidth={selectedStateId === 'ar' ? '3' : '1'}
          />
          <text x="517" y="125" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold">
            Arunachal Pr.
          </text>
          <text x="517" y="141" fill="#cff4fc" textAnchor="middle" fontSize="8">
            17 / km² (Lowest)
          </text>
        </g>

        {/* Map Legend */}
        <g transform="translate(20, 440)">
          <rect x="0" y="0" width="14" height="14" fill="#ef4444" rx="2" />
          <text x="20" y="11" fill="#cbd5e1" fontSize="10">
            Very High (&gt;800)
          </text>
          <rect x="130" y="0" width="14" height="14" fill="#f59e0b" rx="2" />
          <text x="150" y="11" fill="#cbd5e1" fontSize="10">
            Moderate (300-600)
          </text>
          <rect x="270" y="0" width="14" height="14" fill="#10b981" rx="2" />
          <text x="290" y="11" fill="#cbd5e1" fontSize="10">
            Low (200-300)
          </text>
          <rect x="380" y="0" width="14" height="14" fill="#06b6d4" rx="2" />
          <text x="400" y="11" fill="#cbd5e1" fontSize="10">
            Hilly/Sparse (&lt;200)
          </text>
        </g>
      </svg>
    </div>
  );
};

const DemographicTransitionChartSVG: React.FC<{
  cbr: number;
  cdr: number;
  stage: number;
}> = ({ cbr, cdr, stage }) => {
  const rni = (cbr - cdr).toFixed(1);
  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-gold-400 font-bold text-sm uppercase tracking-wide">
          Demographic Transition Model & Growth Curves
        </h4>
        <div className="text-xs bg-gold-950 text-gold-300 px-3 py-1 rounded-full border border-gold-800">
          Current Stage: <span className="font-bold text-white">Stage {stage}</span> | RNI:{' '}
          <span className="font-bold text-amber-300">{rni} / 1000</span>
        </div>
      </div>
      <svg viewBox="0 0 600 300" className="w-full h-64 bg-slate-950 rounded-lg border border-slate-800 p-2">
        {/* Axes */}
        <line x1="50" y1="250" x2="550" y2="250" stroke="#64748b" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="250" stroke="#64748b" strokeWidth="2" />

        {/* Y Axis Labels */}
        <text x="15" y="40" fill="#94a3b8" fontSize="10">
          50/k
        </text>
        <text x="15" y="140" fill="#94a3b8" fontSize="10">
          25/k
        </text>
        <text x="25" y="245" fill="#94a3b8" fontSize="10">
          0
        </text>

        {/* Stage Vertical Dividers */}
        <line x1="150" y1="30" x2="150" y2="250" stroke="#334155" strokeDasharray="4 4" />
        <line x1="270" y1="30" x2="270" y2="250" stroke="#334155" strokeDasharray="4 4" />
        <line x1="390" y1="30" x2="390" y2="250" stroke="#334155" strokeDasharray="4 4" />
        <line x1="480" y1="30" x2="480" y2="250" stroke="#334155" strokeDasharray="4 4" />

        {/* Stage Labels */}
        <text x="100" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Stage I (High Stat.)
        </text>
        <text x="210" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Stage II (Early Exp.)
        </text>
        <text x="330" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Stage III (Late Exp.)
        </text>
        <text x="435" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Stage IV (Low Stat.)
        </text>
        <text x="515" y="270" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Stage V (Declining)
        </text>

        {/* CBR Curve (Red/Orange) */}
        <path
          d="M 50 60 Q 150 60 210 65 T 330 140 T 435 200 T 550 210"
          fill="none"
          stroke="#f87171"
          strokeWidth="3"
        />

        {/* CDR Curve (Blue/Cyan) */}
        <path
          d="M 50 70 Q 150 75 210 160 T 330 200 T 435 205 T 550 205"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
        />

        {/* Natural Increase Shaded Area for Stage II & III */}
        <path
          d="M 150 60 Q 210 65 330 140 L 330 200 Q 210 160 150 75 Z"
          fill="#f59e0b"
          fillOpacity="0.25"
        />

        {/* Dynamic User Interactive Simulation Indicator Dot */}
        {(() => {
          const mapX = 50 + (stage - 1) * 110 + 50;
          const mapY_cbr = 250 - (cbr / 50) * 220;
          const mapY_cdr = 250 - (cdr / 50) * 220;
          return (
            <g>
              <circle cx={mapX} cy={mapY_cbr} r="7" fill="#ef4444" className="animate-ping" />
              <circle cx={mapX} cy={mapY_cbr} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <circle cx={mapX} cy={mapY_cdr} r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />
              <line
                x1={mapX}
                y1={mapY_cbr}
                x2={mapX}
                y2={mapY_cdr}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="2 2"
              />
            </g>
          );
        })()}

        {/* Legend */}
        <g transform="translate(60, 15)">
          <line x1="0" y1="5" x2="20" y2="5" stroke="#f87171" strokeWidth="3" />
          <text x="25" y="9" fill="#f87171" fontSize="10" fontWeight="bold">
            Crude Birth Rate (CBR)
          </text>
          <line x1="160" y1="5" x2="180" y2="5" stroke="#38bdf8" strokeWidth="3" />
          <text x="185" y="9" fill="#38bdf8" fontSize="10" fontWeight="bold">
            Crude Death Rate (CDR)
          </text>
          <rect x="330" y="0" width="12" height="10" fill="#f59e0b" fillOpacity="0.4" />
          <text x="348" y="9" fill="#f59e0b" fontSize="10" fontWeight="bold">
            Natural Growth Gap
          </text>
        </g>
      </svg>
    </div>
  );
};

const LandUseAndCropDistributionSVG: React.FC<{
  landYear: number;
  selectedCropId: string;
  onSelectCrop: (id: string) => void;
}> = ({ landYear, selectedCropId, onSelectCrop }) => {
  // Compute approximate historical land use percentages based on year slider
  const factor = (landYear - 1951) / 69; // 0 to 1
  const forestPct = (14.2 + factor * 9.1).toFixed(1); // 14.2% in 1951 to ~23.3% in 2020
  const nonAgriPct = (3.2 + factor * 5.8).toFixed(1); // 3.2% in 1951 to ~9.0% in 2020
  const netSownPct = (41.8 + factor * 3.7).toFixed(1); // ~45.5%
  const barrenPct = (13.4 - factor * 7.9).toFixed(1); // Reduced from 13.4% to 5.5%

  const selectedCrop = CROP_DATABASE.find((c) => c.id === selectedCropId) || CROP_DATABASE[0];

  return (
    <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Land Use Category Spatial Distribution */}
      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <h5 className="text-emerald-400 font-bold text-xs uppercase tracking-wide">
            Land Use Dynamics ({landYear})
          </h5>
          <span className="text-xs text-slate-400">Source: Ministry of Agriculture</span>
        </div>
        <svg viewBox="0 0 300 200" className="w-full h-44">
          {/* Stacked Horizontal Bar Chart */}
          <text x="10" y="25" fill="#e2e8f0" fontSize="11" fontWeight="bold">
            Land Classification Breakdown
          </text>
          <g transform="translate(10, 35)">
            {/* Net Sown Area */}
            <rect x="0" y="0" width={Number(netSownPct) * 2.5} height="24" fill="#10b981" rx="4" />
            <text x="6" y="16" fill="#ffffff" fontSize="10" fontWeight="bold">
              Net Sown: {netSownPct}%
            </text>

            {/* Forest Land */}
            <rect
              x={Number(netSownPct) * 2.5}
              y="0"
              width={Number(forestPct) * 2.5}
              height="24"
              fill="#059669"
              rx="4"
            />
            <text x={Number(netSownPct) * 2.5 + 4} y="16" fill="#ffffff" fontSize="9">
              Forest: {forestPct}%
            </text>
          </g>

          <g transform="translate(10, 75)">
            {/* Non-Agricultural Land */}
            <rect x="0" y="0" width={Number(nonAgriPct) * 2.5} height="24" fill="#f59e0b" rx="4" />
            <text x="6" y="16" fill="#ffffff" fontSize="9" fontWeight="bold">
              Non-Agri: {nonAgriPct}%
            </text>

            {/* Barren & Wasteland */}
            <rect
              x={Number(nonAgriPct) * 2.5}
              y="0"
              width={Number(barrenPct) * 2.5}
              height="24"
              fill="#64748b"
              rx="4"
            />
            <text x={Number(nonAgriPct) * 2.5 + 4} y="16" fill="#ffffff" fontSize="9">
              Barren: {barrenPct}%
            </text>
          </g>

          {/* Historical Trend Curve */}
          <path
            d={`M 20 170 Q 140 ${170 - factor * 40} 260 ${170 - factor * 50}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
          />
          <text x="20" y="190" fill="#94a3b8" fontSize="9">
            1951 baseline
          </text>
          <text x="220" y="190" fill="#10b981" fontSize="9" fontWeight="bold">
            2020 reporting shift
          </text>
        </svg>
      </div>

      {/* Agricultural Crop Specialization Explorer */}
      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
        <h5 className="text-amber-400 font-bold text-xs uppercase tracking-wide mb-2">
          Global Position & State Crop Geography
        </h5>
        <div className="flex flex-wrap gap-1 mb-3">
          {CROP_DATABASE.map((crop) => (
            <button
              key={crop.id}
              onClick={() => onSelectCrop(crop.id)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                selectedCropId === crop.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {crop.name}
            </button>
          ))}
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">Selected Crop:</span>
            <span className="font-bold text-amber-300">{selectedCrop.name} ({selectedCrop.category})</span>
          </div>
          <div className="flex justify-between border-b border-slate-800 pb-1">
            <span className="text-slate-400">Global Rank:</span>
            <span className="font-bold text-emerald-400">{selectedCrop.globalRank}</span>
          </div>
          <div className="border-b border-slate-800 pb-1">
            <span className="text-slate-400">Top Producing States:</span>
            <span className="block font-semibold text-gold-300 mt-0.5">{selectedCrop.topStates.join(', ')}</span>
          </div>
          <div>
            <span className="text-slate-400">Climate & Soil Needs:</span>
            <p className="text-slate-300 mt-0.5 text-[11px] leading-relaxed">{selectedCrop.climateConditions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE CANVAS SIMULATION COMPONENT
// ==========================================
const DemographicSimCanvas: React.FC<{
  cbr: number;
  cdr: number;
  terrainFactor: number; // 0 (rugged mountain) to 1 (flat fertile plain)
  urbanIndustrialIndex: number; // 0 to 1
}> = ({ cbr, cdr, terrainFactor, urbanIndustrialIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Generate Dot Population Particles based on physical terrain factor
    const particleCount = Math.floor(80 + terrainFactor * 180 + urbanIndustrialIndex * 100);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (1 + urbanIndustrialIndex * 2),
      vy: (Math.random() - 0.5) * (1 + urbanIndustrialIndex * 2),
      radius: Math.random() * 2.5 + 1.5,
      color: Math.random() < urbanIndustrialIndex ? '#38bdf8' : '#10b981',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Physical Topography Background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (terrainFactor > 0.7) {
        // Plain River Alluvium
        gradient.addColorStop(0, '#022c22');
        gradient.addColorStop(1, '#064e3b');
      } else if (terrainFactor > 0.3) {
        // Plateau / Semi-arid
        gradient.addColorStop(0, '#312e81');
        gradient.addColorStop(1, '#1e1b4b');
      } else {
        // Mountainous / Desert
        gradient.addColorStop(0, '#451a03');
        gradient.addColorStop(1, '#78350f');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines (Spatial Quadrants)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Urban Industrial Migration Node if index high
      if (urbanIndustrialIndex > 0.4) {
        const cx = canvas.width * 0.7;
        const cy = canvas.height * 0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, 35 + urbanIndustrialIndex * 20, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = '#38bdf8';
        ctx.font = '10px sans-serif';
        ctx.fillText('Urban Economic Hub (Pull Factor)', cx - 60, cy - 45);
      }

      // Render & Update Population Dot Dynamics
      particles.forEach((p) => {
        // If high urban index, pull particles towards urban center
        if (urbanIndustrialIndex > 0.4) {
          const dx = canvas.width * 0.7 - p.x;
          const dy = canvas.height * 0.5 - p.y;
          p.vx += dx * 0.0003 * urbanIndustrialIndex;
          p.vy += dy * 0.0003 * urbanIndustrialIndex;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Display Real-time Sim Stats Overlay
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Simulated Population Density: ${Math.floor(particleCount * 3.5)} dots/km²`, 12, 20);
      ctx.fillText(`Natural Growth Momentum: ${(cbr - cdr).toFixed(1)} / 1000`, 12, 36);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cbr, cdr, terrainFactor, urbanIndustrialIndex]);

  return (
    <div className="w-full bg-slate-950 p-2 rounded-xl border border-slate-800 shadow-inner relative">
      <canvas ref={canvasRef} width={580} height={200} className="w-full h-48 rounded-lg" />
      <div className="absolute bottom-3 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded text-[10px] text-slate-300 border border-slate-700">
        Dot-Density Particle Engine (Spatial Pull & Topography Simulation)
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT PROPS & COMPONENT
// ==========================================
interface Props {
  onComplete?: (score: number) => void;
  initialState?: Record<string, unknown>;
}

export const C12_GeoPopulationDistributionCBSESim: React.FC<Props> = ({ onComplete }) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State
  const [activeLabStep, setActiveLabStep] = useState<number>(0);
  const [selectedStateId, setSelectedStateId] = useState<string>('up');
  const [selectedCropId, setSelectedCropId] = useState<string>('rice');

  // Lab Sim Variable Controls
  const [cbr, setCbr] = useState<number>(21.8);
  const [cdr, setCdr] = useState<number>(6.5);
  const [terrainFactor, setTerrainFactor] = useState<number>(0.85); // 0.85 = plain river alluvium
  const [urbanIndustrialIndex, setUrbanIndustrialIndex] = useState<number>(0.4);
  const [landYear, setLandYear] = useState<number>(2020);
  const [totalPopMillions, setTotalPopMillions] = useState<number>(100);
  const [arableAreaKm2, setArableAreaKm2] = useState<number>(50000);
  const [totalAreaKm2, setTotalAreaKm2] = useState<number>(100000);

  // Challenges & BKT / SRS Tracking State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [numericInputs, setNumericInputs] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<Record<string, { correct: boolean; msg: string }>>({});
  const [score, setScore] = useState<number>(0);

  // Diagnostic Test & Discovery Quiz States
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [diagnosticAnswers, setDiagnosticAnswers] = useState<Record<string, number>>({});

  // Feedback Component States
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // BKT State Tracking Map for all 67 nodes
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // SRS Review Items
  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Auto Hint Inactivity Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIdx];
      if (activeChallenge && activeChallenge.hints.length > 0) {
        setCurrentHint(activeChallenge.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Need a hint? Check the guidance bubble.');
      }
    }, 12000); // 12s inactivity auto hint
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, activeTab]);

  // Derive Current Stage of Demographic Transition
  const currentDemographicStage = useMemo(() => {
    if (cbr > 35 && cdr > 30) return 1;
    if (cbr > 28 && cdr <= 18) return 2;
    if (cbr > 15 && cbr <= 28 && cdr <= 10) return 3;
    if (cbr <= 15 && cdr <= 10) return 4;
    return 5;
  }, [cbr, cdr]);

  // Selected State Data helper
  const currentStateData = useMemo(() => {
    return INDIAN_STATES_DATA.find((s) => s.id === selectedStateId) || INDIAN_STATES_DATA[0];
  }, [selectedStateId]);

  // Derived Density Calculations for Lab 1
  const calculatedArithmeticDensity = useMemo(() => {
    return Math.round((totalPopMillions * 1000000) / totalAreaKm2);
  }, [totalPopMillions, totalAreaKm2]);

  const calculatedPhysiologicalDensity = useMemo(() => {
    return Math.round((totalPopMillions * 1000000) / arableAreaKm2);
  }, [totalPopMillions, arableAreaKm2]);

  // Voice Speech intro on mount
  useEffect(() => {
    speechManager.speak('Welcome to the Geography Population Simulation Center. Select an exploration tab to begin.');
  }, []);

  // Handler for Discovery Answer Submission
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct observation! Spatial density depends on surface area relative to human numbers.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the mathematical formula for population density.');
    }
  };

  // Challenge Option Selection Handler
  const handleChallengeSelect = (challengeId: string, optionIdx: number) => {
    setUserAnswers((prev) => ({ ...prev, [challengeId]: optionIdx }));
    resetInactivityTimer();
  };

  // Challenge Numeric Input Handler
  const handleNumericInput = (challengeId: string, val: string) => {
    setNumericInputs((prev) => ({ ...prev, [challengeId]: val }));
    resetInactivityTimer();
  };

  // Verify and Submit Challenge Answer
  const handleVerifyChallenge = (challenge: Challenge, e?: React.MouseEvent) => {
    if (e) {
      setSparkleCoords({ x: e.clientX, y: e.clientY });
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1000);
    }

    let isCorrect = false;
    let userValStr = '';

    if (challenge.type === 'numeric') {
      const numVal = parseFloat(numericInputs[challenge.id] || '');
      userValStr = numericInputs[challenge.id] || '';
      if (!isNaN(numVal) && challenge.correctAnswer !== undefined) {
        const tol = challenge.tolerance || 0;
        isCorrect = Math.abs(numVal - challenge.correctAnswer) <= tol;
      }
    } else {
      const selected = userAnswers[challenge.id];
      userValStr = selected !== undefined ? String(selected) : '';
      isCorrect = selected === challenge.correctIndex;
    }

    // Update BKT & SRS State
    const currentBKT = bktMap[challenge.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [challenge.nodeId]: updatedBKT }));

    const currentSRS = srsMap[challenge.nodeId] || createReviewItem(challenge.nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsMap((prev) => ({ ...prev, [challenge.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent analysis! Correct answer.');
      setChallengeFeedback((prev) => ({
        ...prev,
        [challenge.id]: { correct: true, msg: 'Correct! ' + challenge.explanation },
      }));
      setScore((prev) => prev + 10);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the hint and try again.');
      setChallengeFeedback((prev) => ({
        ...prev,
        [challenge.id]: { correct: false, msg: 'Incorrect. ' + challenge.explanation },
      }));
    }
  };

  // Move Next Challenge
  const handleNextChallenge = () => {
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all population geography challenges.');
      setShowConfetti(true);
      const totalScore = score + 10;
      recordGameScore('c12_geo_population_sim', totalScore);
      if (onComplete) onComplete(totalScore);
    }
  };

  // Handle Diagnostic Question Submit
  const handleDiagnosticSelect = (qId: string, optIdx: number) => {
    setDiagnosticAnswers((prev) => ({ ...prev, [qId]: optIdx }));
    audioManager.play('tap');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 p-3 md:p-6">
      {/* Simulation Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Completed Successfully!" />
      <HintBubble show={showHint} text={currentHint} />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-emerald-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
            GEO
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 via-emerald-300 to-gold-400 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">Class 12 ISC / CBSE Geography • Population Distribution & Dynamics</p>
          </div>
        </div>

        {/* Global Progress & Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setActiveTab('discovery');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'discovery'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => {
              setActiveTab('lab');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => {
              setActiveTab('challenges');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Challenges ({currentChallengeIdx + 1}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('summary');
              audioManager.play('tap');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Summary & Project
          </button>
        </div>
      </header>

      {/* TAB 1: DISCOVERY & PREDICTION */}
      {activeTab === 'discovery' && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Narrative Scenario Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 border border-amber-800 px-3 py-1 rounded-full">
              Demographic Command Context
            </span>
            <h2 className="text-xl font-bold text-white mt-3 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs italic">{SCENARIO.context}</p>
          </div>

          {/* Counterintuitive Discovery Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-base font-bold text-amber-300">Discovery Pre-Check Question</h3>
            </div>
            <p className="text-slate-200 text-sm font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setDiscoverySelected(idx)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    discoverySelected === idx
                      ? 'bg-amber-500/20 border-amber-400 text-white font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>

            {!discoverySubmitted ? (
              <button
                onClick={handleDiscoverySubmit}
                disabled={discoverySelected === null}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50 transition-all shadow"
              >
                Submit Discovery Response
              </button>
            ) : (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                <p className="font-bold text-emerald-400">
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? '✓ Correct Insight!'
                    : '✗ Conceptual Note:'}
                </p>
                <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* PREDICTION QUESTIONS LIST */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-gold-400">Demographic Hypothesis & Predictions</h3>
            {PREDICTION_QUESTIONS.map((pred, pIdx) => (
              <div key={pIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-2">{pred.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  {pred.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setPredAnswers((prev) => ({ ...prev, [pIdx]: oIdx }))}
                      className={`p-2 rounded text-xs text-left transition-all ${
                        predAnswers[pIdx] === oIdx
                          ? 'bg-gold-500/20 border border-gold-400 text-gold-200 font-medium'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-850'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {predAnswers[pIdx] !== undefined && (
                  <p className="text-[11px] text-amber-400 mt-2 bg-amber-950/40 p-2 rounded border border-amber-900">
                    💡 <span className="font-semibold">Verification Step:</span> {pred.verifyInstruction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Exploration Steps Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabStep(idx);
                  audioManager.play('tap');
                }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activeLabStep === idx
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] opacity-75 uppercase">Lab {idx + 1}</div>
                <div className="text-xs font-semibold line-clamp-2 mt-0.5">{step.title}</div>
              </button>
            ))}
          </div>

          {/* Active Lab Instruction Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-amber-300">{EXPLORATION_STEPS[activeLabStep].title}</h3>
              <p className="text-xs text-slate-300">{EXPLORATION_STEPS[activeLabStep].instruction}</p>
            </div>
            <span className="text-xs bg-slate-950 text-slate-400 px-3 py-1 rounded border border-slate-800 font-mono">
              Node: {EXPLORATION_STEPS[activeLabStep].nodeId}
            </span>
          </div>

          {/* LAB 1: Physical & Spatial Density Lab */}
          {activeLabStep === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Density Parameter Controls
                </h4>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Total Population (Millions):</span>
                    <span className="font-bold text-white">{totalPopMillions} M</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    value={totalPopMillions}
                    onChange={(e) => setTotalPopMillions(Number(e.target.value))}
                    className="w-full accent-amber-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Total Surface Area (km²):</span>
                    <span className="font-bold text-white">{totalAreaKm2.toLocaleString()} km²</span>
                  </label>
                  <input
                    type="range"
                    min="20000"
                    max="400000"
                    step="5000"
                    value={totalAreaKm2}
                    onChange={(e) => setTotalAreaKm2(Number(e.target.value))}
                    className="w-full accent-amber-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Net Arable Cropland (km²):</span>
                    <span className="font-bold text-white">{arableAreaKm2.toLocaleString()} km²</span>
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max={totalAreaKm2}
                    step="2500"
                    value={arableAreaKm2}
                    onChange={(e) => setArableAreaKm2(Number(e.target.value))}
                    className="w-full accent-amber-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Terrain Relief & Water Factor:</span>
                    <span className="font-bold text-emerald-400">
                      {terrainFactor > 0.7 ? 'Fertile Plain' : terrainFactor > 0.3 ? 'Plateau' : 'Mountain/Arid'}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={terrainFactor}
                    onChange={(e) => setTerrainFactor(Number(e.target.value))}
                    className="w-full accent-emerald-500 mt-1"
                  />
                </div>

                {/* Computed Output Metrics */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Arithmetic Density:</span>
                    <span className="font-bold text-gold-400 text-sm">
                      {calculatedArithmeticDensity} persons/km²
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Physiological Density:</span>
                    <span className="font-bold text-amber-400 text-sm">
                      {calculatedPhysiologicalDensity} persons/km²
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <DemographicSimCanvas
                  cbr={cbr}
                  cdr={cdr}
                  terrainFactor={terrainFactor}
                  urbanIndustrialIndex={urbanIndustrialIndex}
                />
                <IndiaPopulationDensityMapSVG
                  selectedStateId={selectedStateId}
                  onSelectState={setSelectedStateId}
                />
              </div>
            </div>
          )}

          {/* LAB 2: Demographic Transition & Doubling Time Engine */}
          {activeLabStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                  Natality & Mortality Controls
                </h4>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Crude Birth Rate (CBR per 1,000):</span>
                    <span className="font-bold text-red-400">{cbr}</span>
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="45"
                    step="0.5"
                    value={cbr}
                    onChange={(e) => setCbr(Number(e.target.value))}
                    className="w-full accent-red-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Crude Death Rate (CDR per 1,000):</span>
                    <span className="font-bold text-gold-400">{cdr}</span>
                  </label>
                  <input
                    type="range"
                    min="4"
                    max="35"
                    step="0.5"
                    value={cdr}
                    onChange={(e) => setCdr(Number(e.target.value))}
                    className="w-full accent-gold-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-300 flex justify-between">
                    <span>Urbanization / Industrial Pull Index:</span>
                    <span className="font-bold text-amber-300">{Math.round(urbanIndustrialIndex * 100)}%</span>
                  </label>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={urbanIndustrialIndex}
                    onChange={(e) => setUrbanIndustrialIndex(Number(e.target.value))}
                    className="w-full accent-amber-500 mt-1"
                  />
                </div>

                {/* Calculation Outputs */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400">Rate of Natural Increase (RNI):</span>
                    <div className="text-base font-bold text-amber-400">
                      {(cbr - cdr).toFixed(1)} per 1,000 ({((cbr - cdr) / 10).toFixed(2)}% annual)
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
                    <span className="text-slate-400">Population Doubling Time (Rule of 70):</span>
                    <div className="text-base font-bold text-emerald-400">
                      {cbr - cdr > 0 ? (70 / ((cbr - cdr) / 10)).toFixed(1) + ' Years' : 'No Growth / Declining'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <DemographicTransitionChartSVG cbr={cbr} cdr={cdr} stage={currentDemographicStage} />
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <h5 className="font-bold text-amber-400 mb-1">Stage Analysis & Indian Context:</h5>
                  {currentDemographicStage === 1 && (
                    <p>
                      Stage I (High Stagnant): High CBR (~40+) and High CDR (~40+). India experienced this phase prior to 1921.
                    </p>
                  )}
                  {currentDemographicStage === 2 && (
                    <p>
                      Stage II (Early Expanding): Rapidly dropping mortality (CDR) due to health interventions while birth rates remain elevated. India experienced this during the 1951-1981 Population Explosion.
                    </p>
                  )}
                  {currentDemographicStage === 3 && (
                    <p>
                      Stage III (Late Expanding): Birth rates drop significantly while death rates level off. India is currently in this stage, showing slowing growth rates.
                    </p>
                  )}
                  {currentDemographicStage === 4 && (
                    <p>
                      Stage IV (Low Stationary): Low CBR and low CDR matching each other. States like Kerala and Tamil Nadu are nearing or at this stage.
                    </p>
                  )}
                  {currentDemographicStage === 5 && (
                    <p>
                      Stage V (Declining): CBR drops below CDR, leading to absolute population decline (e.g. Japan, Southern European countries).
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LAB 3: Census State Profile Matrix & Occupational Structure */}
          {activeLabStep === 2 && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wide mb-3">
                  Select Indian State Profile (Census Matrix)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {INDIAN_STATES_DATA.map((state) => (
                    <button
                      key={state.id}
                      onClick={() => setSelectedStateId(state.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedStateId === state.id
                          ? 'bg-gold-500 text-slate-950 font-bold shadow-lg scale-105'
                          : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {state.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* State Data Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase">Demographic Scale</h5>
                  <div className="text-xl font-bold text-amber-400">{currentStateData.populationMillions} Million</div>
                  <div className="text-xs text-slate-300">
                    National Population Share:{' '}
                    <span className="font-bold text-white">{currentStateData.popSharePct}%</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Decadal Growth Rate:{' '}
                    <span className="font-bold text-emerald-400">+{currentStateData.decadalGrowthPct}%</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Sex Ratio:{' '}
                    <span className="font-bold text-gold-300">{currentStateData.sexRatio} females / 1000 males</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase">Spatial Density & Urbanization</h5>
                  <div className="text-xl font-bold text-gold-400">{currentStateData.density} persons/km²</div>
                  <div className="text-xs text-slate-300">
                    Physiological Density:{' '}
                    <span className="font-bold text-amber-300">{currentStateData.physioDensity} persons/ha</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Urban Population Share:{' '}
                    <span className="font-bold text-purple-300">{currentStateData.urbanPct}%</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Rural Population Share:{' '}
                    <span className="font-bold text-slate-200">{(100 - currentStateData.urbanPct).toFixed(1)}%</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="text-xs font-bold text-slate-400 uppercase">Occupational Structure</h5>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-emerald-400">Primary Sector (Agri/Forestry):</span>
                      <span className="font-bold text-white">{currentStateData.primaryWorkerPct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-400">Secondary Sector (Manufacturing):</span>
                      <span className="font-bold text-white">{currentStateData.secondaryWorkerPct}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gold-400">Tertiary Sector (Services):</span>
                      <span className="font-bold text-white">{currentStateData.tertiaryWorkerPct}%</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                    Key Crop Specialization: <span className="text-amber-300 font-bold">{currentStateData.topCrop}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* LAB 4: Land Use Dynamics & Forest Cover Tracker */}
          {activeLabStep === 3 && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                    Land Category Timeline Slider (1951 to 2020)
                  </h4>
                  <span className="text-lg font-black text-amber-400 bg-slate-950 px-4 py-1 rounded border border-slate-800">
                    Year: {landYear}
                  </span>
                </div>
                <input
                  type="range"
                  min="1951"
                  max="2020"
                  step="1"
                  value={landYear}
                  onChange={(e) => setLandYear(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                />
              </div>

              <LandUseAndCropDistributionSVG
                landYear={landYear}
                selectedCropId={selectedCropId}
                onSelectCrop={setSelectedCropId}
              />
            </div>
          )}

          {/* LAB 5: Agricultural Geography & Crop Distribution Explorer */}
          {activeLabStep === 4 && (
            <div className="space-y-6">
              <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-3">
                  India Agricultural Geography & Crop Ranking Matrix
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {CROP_DATABASE.map((crop) => (
                    <div
                      key={crop.id}
                      onClick={() => setSelectedCropId(crop.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedCropId === crop.id
                          ? 'bg-amber-500/15 border-amber-400 scale-[1.02] shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-white text-sm">{crop.name}</span>
                        <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded">
                          {crop.category}
                        </span>
                      </div>
                      <div className="text-xs text-emerald-400 font-semibold mb-1">Global: {crop.globalRank}</div>
                      <div className="text-[11px] text-slate-300">
                        Top States: <span className="text-gold-300 font-medium">{crop.topStates.join(', ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS SECTION AT BOTTOM OF LAB */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-400">Lab Observation Checks</h3>
            {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
              <div key={oIdx} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-2">{obs.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {obs.observableOptions.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setObsAnswers((prev) => ({ ...prev, [oIdx]: optIdx }))}
                      className={`p-2 rounded text-xs text-left transition-all ${
                        obsAnswers[oIdx] === optIdx
                          ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-medium'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-850'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {obsAnswers[oIdx] !== undefined && (
                  <p
                    className={`text-xs mt-2 font-semibold ${
                      obsAnswers[oIdx] === obs.correctIndex ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {obsAnswers[oIdx] === obs.correctIndex
                      ? '✓ Correct observation!'
                      : '✗ Re-examine the data matrix or maps above.'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: 25+ CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Challenge Selector Bar */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase ${
                    CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}
                >
                  {CHALLENGES[currentChallengeIdx].difficulty}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {CHALLENGES[currentChallengeIdx].competencyLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentChallengeIdx > 0) setCurrentChallengeIdx((prev) => prev - 1);
                }}
                disabled={currentChallengeIdx === 0}
                className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 rounded-lg text-xs font-bold border border-slate-800"
              >
                Previous
              </button>
              <button
                onClick={handleNextChallenge}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold border border-amber-400 shadow"
              >
                Next &gt;
              </button>
            </div>
          </div>

          {/* Active Challenge Card */}
          {(() => {
            const challenge = CHALLENGES[currentChallengeIdx];
            const feedback = challengeFeedback[challenge.id];

            return (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                    {challenge.question}
                  </h3>
                  <span className="text-xs font-mono bg-slate-950 text-slate-400 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                    Node: {challenge.nodeId}
                  </span>
                </div>

                {/* Multiple Choice Options */}
                {challenge.type === 'multiple-choice' && challenge.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {challenge.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleChallengeSelect(challenge.id, idx)}
                        className={`p-4 rounded-xl border text-left text-xs transition-all ${
                          userAnswers[challenge.id] === idx
                            ? 'bg-amber-500/20 border-amber-400 text-white font-semibold shadow'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="font-bold mr-2 text-slate-500">{String.fromCharCode(65 + idx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Numeric Calculation Input */}
                {challenge.type === 'numeric' && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs text-slate-300 font-medium">Enter your calculated numerical answer:</label>
                    <input
                      type="number"
                      value={numericInputs[challenge.id] || ''}
                      onChange={(e) => handleNumericInput(challenge.id, e.target.value)}
                      placeholder="Type number..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-amber-300 font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                )}

                {/* Verification & Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleVerifyChallenge(challenge, e)}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg"
                  >
                    Verify Answer
                  </button>
                  <button
                    onClick={() => {
                      setCurrentHint(challenge.hints[0] || 'Analyze the formula and spatial map data carefully.');
                      setShowHint(true);
                      audioManager.play('hint');
                    }}
                    className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-amber-300 border border-amber-800/60 font-semibold rounded-xl text-xs transition-all"
                  >
                    Show Hint
                  </button>
                </div>

                {/* Feedback Box */}
                {feedback && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      feedback.correct
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-800 text-rose-200'
                    }`}
                  >
                    <p className="font-bold mb-1">{feedback.correct ? '✓ Excellent!' : '✗ Needs Revision'}</p>
                    <p>{feedback.msg}</p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 4: SUMMARY, SRS MASTERY & REAL WORLD PROJECT */}
      {activeTab === 'summary' && (
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Real World Activity Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-amber-400 uppercase tracking-wide mb-2">
              📌 Real-World Extension Activity
            </h3>
            <h4 className="text-lg font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-mono">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions & Diagnostic Test Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Common Misconceptions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                Key Geographic Misconceptions Clarified
              </h4>
              <div className="space-y-3">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">Misconception: "{m.misconception}"</p>
                    <p className="text-emerald-300">Correction: {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Knowledge Assessment */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wide">
                Diagnostic Board Exam Self-Check
              </h4>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                {DIAGNOSTIC_QUESTIONS.map((q) => (
                  <div key={q.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="font-bold text-slate-200">{q.question}</p>
                    <div className="grid grid-cols-1 gap-1.5">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleDiagnosticSelect(q.id, oIdx)}
                          className={`p-2 rounded text-left transition-all ${
                            diagnosticAnswers[q.id] === oIdx
                              ? oIdx === q.correctIndex
                                ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-200 font-semibold'
                                : 'bg-rose-500/20 border border-rose-400 text-rose-200 font-semibold'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-850'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {diagnosticAnswers[q.id] !== undefined && (
                      <p className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800 mt-1">
                        <span className="font-bold text-amber-400">Explanation:</span> {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C12_GeoPopulationDistributionCBSESim;