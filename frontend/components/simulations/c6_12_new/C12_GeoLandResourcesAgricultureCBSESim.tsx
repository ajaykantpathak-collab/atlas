'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
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

// ==========================================
// ALL 37 NODE IDS FOR THIS CHAPTER
// ==========================================
const ALL_NODE_IDS = [
  'c12_geo_cbse_287',
  'c12_geo_cbse_288',
  'c12_geo_cbse_289',
  'c12_geo_cbse_290',
  'c12_geo_cbse_291',
  'c12_geo_cbse_292',
  'c12_geo_cbse_293',
  'c12_geo_cbse_294',
  'c12_geo_cbse_295',
  'c12_geo_cbse_296',
  'c12_geo_cbse_297',
  'c12_geo_cbse_298',
  'c12_geo_cbse_299',
  'c12_geo_cbse_300',
  'c12_geo_cbse_301',
  'c12_geo_cbse_302',
  'c12_geo_cbse_303',
  'c12_geo_cbse_304',
  'c12_geo_cbse_305',
  'c12_geo_cbse_306',
  'c12_geo_cbse_307',
  'c12_geo_cbse_308',
  'c12_geo_cbse_309',
  'c12_geo_cbse_310',
  'c12_geo_cbse_311',
  'c12_geo_cbse_312',
  'c12_geo_cbse_313',
  'c12_geo_cbse_314',
  'c12_geo_cbse_315',
  'c12_geo_cbse_316',
  'c12_geo_cbse_317',
  'c12_geo_cbse_318',
  'c12_geo_cbse_319',
  'c12_geo_cbse_320',
  'c12_geo_cbse_321',
  'c12_geo_cbse_322',
  'c12_geo_cbse_323',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'National Land Use & Agricultural Planning Simulator',
  intro: 'You are appointed as Chief Spatial Planning Officer for the Ministry of Agriculture and Farmers Welfare. India faces spatial constraints, land degradation, and dynamic cropping demands across diverse agro-climatic zones.',
  context: 'In this simulation, you will analyze land-use dynamics, compute cropping intensity, optimize seasonal cropping cycles (Kharif, Rabi, Zaid), manage CPRs (Common Property Resources), and implement sustainable land-saving technologies while addressing farmer debt and seasonal unemployment.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'If India increases its Gross Cropped Area (GCA) without changing its Net Sown Area (NSA), what happens to its Cropping Intensity (CI)?',
  options: [
    'Cropping Intensity decreases because physical land remains constant.',
    'Cropping Intensity increases because land is cropped more than once in an agricultural year.',
    'Cropping Intensity remains unchanged at 100%.',
    'Net Sown Area automatically increases to match the Gross Cropped Area.',
  ],
  correctIndex: 1,
  hintAfter: 'Cropping Intensity = (Gross Cropped Area / Net Sown Area) × 100. Multiple cropping on the same physical area increases GCA, driving up Cropping Intensity without requiring additional land conversion.',
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Land-Use Classification & Shift Analysis',
    instruction: 'Adjust the historical timeline slider from 1950 to 2020. Observe how Net Sown Area, Area under Non-Agricultural Uses, and Forest Cover changed while Barren Land and Fallow Lands fluctuated.',
    interactionType: 'timeline-landuse',
    nodeId: 'c12_geo_cbse_299',
  },
  {
    title: 'Lab 2: Cropping Intensity & Multi-Cropping Dynamics',
    instruction: 'Set Net Sown Area (NSA) and modify Gross Cropped Area (GCA) by adding Rabi and Zaid crops under irrigated conditions. Observe the resulting Cropping Intensity percentage.',
    interactionType: 'cropping-intensity-calculator',
    nodeId: 'c12_geo_cbse_302',
  },
  {
    title: 'Lab 3: Agro-Climatic Seasonal Crop Matcher',
    instruction: 'Select temperature and rainfall parameters for Kharif, Rabi, and Zaid seasons. Pair crops like Rice, Wheat, Cotton, Jute, Gram, and Sugarcane with their optimal growing parameters.',
    interactionType: 'crop-season-allocator',
    nodeId: 'c12_geo_cbse_304',
  },
  {
    title: 'Lab 4: Farming Systems & Water Regime Lab',
    instruction: 'Toggle between Dryland Farming (pearl millet, pulses) and Wetland Farming (rice, jute, sugarcane). Analyze crop water requirements vs rainfall deficit.',
    interactionType: 'farming-type-simulator',
    nodeId: 'c12_geo_cbse_309',
  },
  {
    title: 'Lab 5: Green Revolution & Technological Yield Optimizer',
    instruction: 'Combine HYV seeds, tubewell irrigation, and chemical fertilizers. Observe output yields, soil salinity risks, ground water depletion, and land-saving productivity factors.',
    interactionType: 'green-revolution-tech',
    nodeId: 'c12_geo_cbse_317',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the area under Common Property Resources (CPRs) when village commons are converted into non-agricultural built-up infrastructure?',
    options: [
      'Landless laborers and small farmers face severe shortage of fodder and fuelwood.',
      'Cropping intensity increases proportionately.',
      'Forest area classified under land records doubles.',
      'Net Sown Area expands into urban residential zones.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Test CPR area reduction in Lab 1 and observe impact on livestock grazing resources.',
    nodeId: 'c12_geo_cbse_300',
  },
  {
    question: 'Predict: How will adopting micro-irrigation (drip/sprinkler) combined with high-yielding short-duration crops impact agricultural production on existing Net Sown Area?',
    options: [
      'It decreases Cropping Intensity due to water loss.',
      'It increases Cropping Intensity by enabling double/triple cropping (Land-Saving Technology).',
      'It converts Net Sown Area into Culturable Wasteland.',
      'It reduces total yield per hectare.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust Irrigation efficiency and Short-duration cropping sliders in Lab 2 & Lab 5 to verify yield gains.',
    nodeId: 'c12_geo_cbse_303',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the trend of "Area under Non-Agricultural Uses" in India between 1950-51 and 2019-20?',
    observableOptions: [
      'It continuously increased due to industrial expansion, urbanization, and infrastructure.',
      'It declined to zero as land was converted back to forests.',
      'It remained static throughout 70 years.',
      'It fluctuated randomly without any distinct socio-economic pattern.',
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_299',
  },
  {
    question: 'What happens when wheat cultivation is extended into high-temperature, low-rainfall Kharif months without seasonal alignment?',
    observableOptions: [
      'Yield surges due to extra solar radiation.',
      'Crop fails or suffers high heat stress because wheat requires low winter temperatures during sowing and maturation.',
      'Rice turns automatically into wheat.',
      'Cropping intensity drops to zero permanently.',
    ],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_311',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'District Agricultural Sustainability Audit',
  description: 'Conduct a quantitative spatial audit for a rural district with a total reporting area of 500,000 hectares to calculate Net Sown Area, Cropping Intensity, and design an optimum cropping pattern.',
  steps: [
    'Identify Land Allocation: Net Sown Area = 250,000 ha; Area cropped more than once = 125,000 ha; Forest = 100,000 ha; Fallow Land = 50,000 ha.',
    'Calculate Gross Cropped Area (GCA): GCA = NSA (250,000 ha) + Area Cropped More Than Once (125,000 ha) = 375,000 ha.',
    'Compute Cropping Intensity: CI = (GCA / NSA) × 100 = (375,000 / 250,000) × 100 = 150%.',
    'Strategic Recommendation: Recommend introducing Zaid legumes (mung bean) on 50,000 ha of irrigated fallow land to raise CI to 170% while improving soil nitrogen content.',
  ],
};

// ==========================================
// ENRICHMENT & METADATA FOR ALL 37 NODES
// ==========================================
interface NodeMeta {
  id: NodeId;
  title: string;
  definition: string;
  eli5: string;
  keyTakeaway: string;
}

const NODE_METADATA: Record<NodeId, NodeMeta> = {
  c12_geo_cbse_287: {
    id: 'c12_geo_cbse_287',
    title: 'Land as a Resource',
    definition: 'Land is a fixed natural asset providing food, fodder, fiber, raw materials, and space for socio-economic activities.',
    eli5: 'Land is the ultimate foundation stage. Unlike machines, we cannot manufacture more earth, so how we use every hectare matters.',
    keyTakeaway: 'Land resource quality and management directly constrain agricultural production and eco-system stability.',
  },
  c12_geo_cbse_288: {
    id: 'c12_geo_cbse_288',
    title: 'Reporting Area versus Geographical Area',
    definition: 'Geographical Area is total physical surface area (3.28M km² for India), while Reporting Area is the surveyed area recorded under land revenue statistics.',
    eli5: 'Geographical area is the whole cake. Reporting area is the portion of the cake we have measured and logged in official record books.',
    keyTakeaway: 'Reporting area in India is slightly less than total geographical area due to un-surveyed remote zones and border areas.',
  },
  c12_geo_cbse_289: {
    id: 'c12_geo_cbse_289',
    title: 'Land-Use Classification System in India',
    definition: 'Land Use Revenue Department classifies land into nine standard categories to monitor environmental and economic transitions.',
    eli5: 'It is like filing nine different folders for how land is used across the country.',
    keyTakeaway: 'Nine land-use categories provide administrative and statistical tracking of land conversion trends.',
  },
  c12_geo_cbse_290: {
    id: 'c12_geo_cbse_290',
    title: 'Forests as a Land-Use Category',
    definition: 'Demarcated forest area recorded in land revenue records, distinguished from actual tree canopy cover measured by satellite sensing.',
    eli5: 'Just because an area is marked as "Forest" in revenue records does not automatically mean tall dense trees exist on every spot.',
    keyTakeaway: 'Revenue forest area differs from actual satellite forest cover based on canopy density metrics.',
  },
  c12_geo_cbse_291: {
    id: 'c12_geo_cbse_291',
    title: 'Barren and Wastelands',
    definition: 'Land that cannot be brought under cultivation with available technology, such as rocky outcrops, deserts, and steep hill slopes.',
    eli5: 'Extreme land like high sand dunes or bare rocks where farming is practically impossible with normal tech.',
    keyTakeaway: 'Barren land requires massive reclamation efforts or remains non-arable.',
  },
  c12_geo_cbse_292: {
    id: 'c12_geo_cbse_292',
    title: 'Non-Agricultural Land Use',
    definition: 'Land covered by human settlements, roads, railways, factories, canals, and urban infrastructure.',
    eli5: 'Concrete land used for living, driving, working, and building cities instead of farming.',
    keyTakeaway: 'This category expands rapidly with urbanization and economic development.',
  },
  c12_geo_cbse_293: {
    id: 'c12_geo_cbse_293',
    title: 'Permanent Pastures and Grazing Lands',
    definition: 'Land reserved for village livestock grazing, mostly managed under village panchayats or government commons.',
    eli5: 'Open grassland where cattle and livestock feed.',
    keyTakeaway: 'Permanent pasture land has been shrinking in India, pressuring livestock management.',
  },
  c12_geo_cbse_294: {
    id: 'c12_geo_cbse_294',
    title: 'Miscellaneous Tree Crops and Groves',
    definition: 'Land under fruit orchards, bamboo groves, and fuel trees that are not included in Net Sown Area.',
    eli5: 'Orchards of mangoes, bamboo stands, and private wood groves.',
    keyTakeaway: 'Perennial tree crops outside regular field crops fall into this specific land category.',
  },
  c12_geo_cbse_295: {
    id: 'c12_geo_cbse_295',
    title: 'Culturable Wasteland',
    definition: 'Land left uncultivated for more than 5 consecutive years, which can be reclaimed for farming after soil treatments.',
    eli5: 'Sleeping land resting for over 5 years that could grow crops if cleaned and fertilized.',
    keyTakeaway: 'Culturable wasteland offers potential for agricultural expansion through soil reclamation.',
  },
  c12_geo_cbse_296: {
    id: 'c12_geo_cbse_296',
    title: 'Current Fallow and Other Fallow Lands',
    definition: 'Current fallow is left uncultivated for ≤1 year; Fallow other than current is uncultivated for 1 to 5 years to naturally restore soil fertility.',
    eli5: 'Taking a short break (under 1 yr) is current fallow; taking a longer nap (1 to 5 yrs) is other fallow.',
    keyTakeaway: 'Fallowing is a traditional land management practice for natural soil regeneration.',
  },
  c12_geo_cbse_297: {
    id: 'c12_geo_cbse_297',
    title: 'Net Area Sown',
    definition: 'The total physical area sown with crops and harvested in an agricultural year. Counted only once regardless of crop repetitions.',
    eli5: 'The actual physical footprint of land where crops are planted during the year.',
    keyTakeaway: 'Net Area Sown represents the physical agricultural base of a country.',
  },
  c12_geo_cbse_298: {
    id: 'c12_geo_cbse_298',
    title: 'Drivers of Land-Use Change',
    definition: 'Economic growth, population density, technological advancements, policy decisions, and institutional ownership rules.',
    eli5: 'Why land transforms over time: more people, bigger cities, new tech, and changing market prices.',
    keyTakeaway: 'Land use changes reflect structural transformation in the national economy.',
  },
  c12_geo_cbse_299: {
    id: 'c12_geo_cbse_299',
    title: 'Land-Use Change Trends in India (1950-2020)',
    definition: 'Historical expansion of forest area, non-agricultural land, and net sown area alongside decline in barren land and cultural wasteland.',
    eli5: 'Tracking how India transformed its land mix over 70 post-independence years.',
    keyTakeaway: 'Non-agricultural and forest categories expanded while barren land declined markedly.',
  },
  c12_geo_cbse_300: {
    id: 'c12_geo_cbse_300',
    title: 'Common Property Resources',
    definition: 'Community-owned natural resources (pastures, village forests, water bodies) accessible to all community members without private titles.',
    eli5: 'Shared village assets where everyone can gather fodder, fuel wood, and water.',
    keyTakeaway: 'CPRs provide vital safety nets for landless poor and rural women.',
  },
  c12_geo_cbse_301: {
    id: 'c12_geo_cbse_301',
    title: 'Composition of Total Cultivable Land',
    definition: 'Sum of Net Sown Area, all fallow lands, and culturable waste land representing total potential arable land.',
    eli5: 'All land that can potentially grow crops—active fields plus resting or reclaimable fields.',
    keyTakeaway: 'Total cultivable land sets the ceiling for agricultural footprint.',
  },
  c12_geo_cbse_302: {
    id: 'c12_geo_cbse_302',
    title: 'Cropping Intensity',
    definition: 'Percentage ratio of Gross Cropped Area (GCA) to Net Sown Area (NSA). Formula: (GCA / NSA) × 100.',
    eli5: 'How intensively land is reused: 100% means 1 crop per year; 200% means 2 crops per year on all fields.',
    keyTakeaway: 'High cropping intensity maximizes agricultural production on a fixed physical land base.',
  },
  c12_geo_cbse_303: {
    id: 'c12_geo_cbse_303',
    title: 'Land-Saving Agricultural Technologies',
    definition: 'Yield-enhancing inputs (HYV seeds, fertilizers, micro-irrigation) that increase output per hectare, effectively saving land.',
    eli5: 'Technologies that produce twice as much food on the exact same piece of ground.',
    keyTakeaway: 'Land-saving technology decouples food production growth from land expansion.',
  },
  c12_geo_cbse_304: {
    id: 'c12_geo_cbse_304',
    title: 'Cropping Seasons in India',
    definition: 'Three distinct agricultural seasons dictated by monsoons and temperature regimes: Kharif, Rabi, and Zaid.',
    eli5: 'The agricultural calendar divided into summer monsoon, dry winter, and short hot summer.',
    keyTakeaway: 'Seasonality governs crop choices across Indian farming regions.',
  },
  c12_geo_cbse_305: {
    id: 'c12_geo_cbse_305',
    title: 'Kharif Cropping Season',
    definition: 'Monsoon cropping season from June/July to September/October, dominated by high water-requiring crops like Rice and Cotton.',
    eli5: 'Rainy season farming powered by the southwest summer monsoon.',
    keyTakeaway: 'Kharif relies heavily on southwest monsoon rainfall distribution.',
  },
  c12_geo_cbse_306: {
    id: 'c12_geo_cbse_306',
    title: 'Rabi Cropping Season',
    definition: 'Winter cropping season from October/November to March/April, growing cool-season crops like Wheat, Gram, and Mustard.',
    eli5: 'Winter farming relying on cooler temperatures and irrigation or western disturbances.',
    keyTakeaway: 'Rabi crops depend on winter temperatures and irrigation or soil residual moisture.',
  },
  c12_geo_cbse_307: {
    id: 'c12_geo_cbse_307',
    title: 'Zaid Cropping Season',
    definition: 'Short summer season between Rabi and Kharif (April–June) focused on quick-maturing vegetables, watermelons, and fodder crops.',
    eli5: 'Hot summer bonus season between harvest of winter crops and arrival of monsoon rains.',
    keyTakeaway: 'Zaid fills seasonal income gaps with short-duration crops.',
  },
  c12_geo_cbse_308: {
    id: 'c12_geo_cbse_308',
    title: 'Types of Farming: Irrigated and Rainfed',
    definition: 'Classification based on main source of moisture: Irrigated (protective/productive) vs Rainfed (monsoon dependent).',
    eli5: 'Farming with artificial water systems versus farming relying solely on natural rain.',
    keyTakeaway: 'Irrigated farming provides stable yields while rainfed farming faces high climate risk.',
  },
  c12_geo_cbse_309: {
    id: 'c12_geo_cbse_309',
    title: 'Dryland and Wetland Farming',
    definition: 'Dryland farming occurs in areas with annual rainfall <75cm (millets, pulses); Wetland farming in rainfall >75-100cm (rice, sugarcane).',
    eli5: 'Dry farming in water-scarce zones vs wet farming in heavy rainfall/river floodplains.',
    keyTakeaway: 'Rainfall threshold of ~75 cm dictates choice between dryland drought-tolerant crops and moisture-loving crops.',
  },
  c12_geo_cbse_310: {
    id: 'c12_geo_cbse_310',
    title: 'Rice Cultivation in India',
    definition: 'Staple food crop requiring high temperature (>25°C), heavy rainfall (>100cm) or assured irrigation. Leading producer regions: WB, UP, Punjab.',
    eli5: 'The most popular food grain in India, needing standing water and warm weather.',
    keyTakeaway: 'Rice accounts for a major share of India food grain production and cultivated land.',
  },
  c12_geo_cbse_311: {
    id: 'c12_geo_cbse_311',
    title: 'Wheat Cultivation in India',
    definition: 'Second most important food grain grown in winter (cool season 10-15°C growth, bright sunshine 21-26°C harvest). Major states: UP, Punjab, Haryana.',
    eli5: 'The winter grain of northern plains that thrives in cool weather and turns golden before harvest.',
    keyTakeaway: 'Wheat productivity surged post-Green Revolution due to HYV seeds and tubewell irrigation.',
  },
  c12_geo_cbse_312: {
    id: 'c12_geo_cbse_312',
    title: 'Coarse Cereals: Jowar, Bajra, and Maize',
    definition: 'Nutri-cereals grown in semi-arid environments requiring low moisture and hardy soil conditions.',
    eli5: 'Super-tough nutritious grains that grow in dry, sandy, or stony fields where rice/wheat struggle.',
    keyTakeaway: 'Coarse cereals offer high nutritional value and climate resilience in dry regions.',
  },
  c12_geo_cbse_313: {
    id: 'c12_geo_cbse_313',
    title: 'Pulses: Gram and Tur',
    definition: 'Leguminous crops that fix atmospheric nitrogen, enhancing soil fertility while providing key protein sources.',
    eli5: 'Lentils and beans that act as natural soil fertilizer factories while packing plant protein.',
    keyTakeaway: 'Pulses are critical for crop rotation and sustainable soil health.',
  },
  c12_geo_cbse_314: {
    id: 'c12_geo_cbse_314',
    title: 'Oilseed Cultivation in India',
    definition: 'Crops grown for edible and industrial oils (Groundnut, Rapeseed/Mustard, Soyabean, Sunflower).',
    eli5: 'Crops pressed to produce cooking oil and industrial lubrications.',
    keyTakeaway: 'Oilseeds are major rainfed cash crops with high domestic supply deficit.',
  },
  c12_geo_cbse_315: {
    id: 'c12_geo_cbse_315',
    title: 'Fiber Crops: Cotton and Jute',
    definition: 'Industrial fiber raw materials; Cotton thrives in black regur soil and dry climate with irrigation; Jute in humid deltaic alluvium.',
    eli5: 'Plant fibers used to spin cloth (cotton) and weave sacks or ropes (jute).',
    keyTakeaway: 'Cotton and jute feed India textile and packaging industries.',
  },
  c12_geo_cbse_316: {
    id: 'c12_geo_cbse_316',
    title: 'Commercial Crops: Sugarcane, Tea, and Coffee',
    definition: 'High-value cash and plantation crops requiring distinct temperature, soil, and processing conditions.',
    eli5: 'Cash crops grown for processing into sugar, beverages, and market export.',
    keyTakeaway: 'Plantation crops generate export revenue and rural employment.',
  },
  c12_geo_cbse_317: {
    id: 'c12_geo_cbse_317',
    title: 'Green Revolution',
    definition: 'Agricultural modernization package introduced in late 1960s using HYV seeds, chemical fertilizers, pesticides, and controlled irrigation.',
    eli5: 'The tech package that transformed India from food importer to self-sufficient grain exporter.',
    keyTakeaway: 'Green Revolution dramatically increased food grain yields, especially wheat and rice in Punjab/Haryana/Western UP.',
  },
  c12_geo_cbse_318: {
    id: 'c12_geo_cbse_318',
    title: 'Post-Independence Agricultural Development',
    definition: 'Phased evolution from food insecurity and institutional reforms to technological diffusion and market integration.',
    eli5: 'How national food policy moved from emergency grain imports to export surplus over decades.',
    keyTakeaway: 'Institutional land reforms and technological packages reshaped rural economy.',
  },
  c12_geo_cbse_319: {
    id: 'c12_geo_cbse_319',
    title: 'Problems of Indian Agriculture',
    definition: 'Structural challenges including small land holding size, weather reliance, low yield per hectare, land degradation, and market volatility.',
    eli5: 'Major bottlenecks: tiny farm sizes, monsoon unpredictability, and low crop prices.',
    keyTakeaway: 'Addressing structural bottlenecks is vital for farmer livelihood security.',
  },
  c12_geo_cbse_320: {
    id: 'c12_geo_cbse_320',
    title: 'Seasonal Unemployment in Agriculture',
    definition: 'Underemployment during non-cropping months when farm laborers find no work between planting and harvest.',
    eli5: 'Periods during the year when farmers have no field tasks to perform and earn zero income.',
    keyTakeaway: 'Multiple cropping and rural non-farm enterprises help mitigate seasonal unemployment.',
  },
  c12_geo_cbse_321: {
    id: 'c12_geo_cbse_321',
    title: 'Financial Constraints and Farmer Indebtedness',
    definition: 'High input costs, lack of institutional credit access, low returns leading to debt traps from non-institutional moneylenders.',
    eli5: 'When farm costs exceed crop sales, forcing farmers into high-interest debt traps.',
    keyTakeaway: 'Institutional credit expansion (KCC, microfinance) reduces informal debt exploitation.',
  },
  c12_geo_cbse_322: {
    id: 'c12_geo_cbse_322',
    title: 'Land Reforms in Independent India',
    definition: 'Abolition of Zamindari system, tenancy reforms, ceiling on landholdings, and consolidation of operational holdings.',
    eli5: 'Re-distributing land from huge landlords to tiller tenant farmers and grouping scattered small plots.',
    keyTakeaway: 'Land reforms aimed for social justice and elimination of feudal intermediary extraction.',
  },
  c12_geo_cbse_323: {
    id: 'c12_geo_cbse_323',
    title: 'Government Initiatives for Agricultural Development',
    definition: 'National schemes like PM-KISAN, PMFBY crop insurance, Soil Health Card, e-NAM, and Rashtriya Krishi Vikas Yojana (RKVY).',
    eli5: 'State-sponsored programs providing direct cash support, crop insurance, digital markets, and soil test cards.',
    keyTakeaway: 'Modern policy focuses on income security, climate resilience, and market digitisation.',
  },
};

// ==========================================
// MISCONCEPTIONS (6 ITEMS)
// ==========================================
const MISCONCEPTIONS = [
  {
    misconception: 'Geographical Area and Reporting Area of India are identical in official statistics.',
    correction: 'Reporting Area is the land for which revenue records exist (~93% of total geographical area). Remote un-surveyed regions and contested border zones are excluded from reporting area.',
    nodeId: 'c12_geo_cbse_288',
  },
  {
    misconception: 'Net Area Sown increases automatically every time a farmer grows two or three crops on the same plot in a year.',
    correction: 'Net Area Sown counts physical land area only once per year. Re-cropping increases Gross Cropped Area (GCA), not Net Area Sown.',
    nodeId: 'c12_geo_cbse_297',
  },
  {
    misconception: 'Forest land in revenue records represents exact satellite-measured tree canopy cover.',
    correction: 'Forest category in land records is administrative classification. Satellite tree cover measures actual biological tree density, which can be higher or lower.',
    nodeId: 'c12_geo_cbse_290',
  },
  {
    misconception: 'Current Fallow and Culturable Wasteland are the exact same classification.',
    correction: 'Current fallow is left uncropped for 1 year or less; Culturable wasteland is left uncultivated for more than 5 consecutive years.',
    nodeId: 'c12_geo_cbse_295',
  },
  {
    misconception: 'The Green Revolution benefited all crops and all regions of India equally.',
    correction: 'Initial Green Revolution focused primarily on wheat and rice in irrigated belts of Punjab, Haryana, and Western UP, leaving dryland regions behind initially.',
    nodeId: 'c12_geo_cbse_317',
  },
  {
    misconception: 'Common Property Resources (CPRs) belong exclusively to private landowners in a village.',
    correction: 'CPRs are community assets (village pastures, forests, water bodies) providing open access to all village residents, especially landless households.',
    nodeId: 'c12_geo_cbse_300',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    question: 'What is the standard mathematical formula for computing Cropping Intensity?',
    options: [
      '(Gross Cropped Area / Net Sown Area) × 100',
      '(Net Sown Area / Total Geographical Area) × 100',
      '(Forest Area / Culturable Wasteland) × 100',
      '(Reporting Area / Gross Cropped Area) × 100',
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_302',
    explanation: 'Cropping Intensity = (Gross Cropped Area / Net Sown Area) × 100.',
  },
  {
    id: 'diag-2',
    question: 'Which of the following land-use categories saw a decline in India between 1950-51 and 2019-20?',
    options: [
      'Area under non-agricultural uses',
      'Barren and wasteland',
      'Forest land recorded under revenue department',
      'Built-up urban area',
    ],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_299',
    explanation: 'Barren and wasteland declined significantly due to reclamation for agriculture and infrastructure.',
  },
  {
    id: 'diag-3',
    question: 'A land plot left uncultivated for 3 consecutive years falls under which category?',
    options: [
      'Current Fallow',
      'Fallow other than Current Fallow',
      'Culturable Wasteland',
      'Net Sown Area',
    ],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_296',
    explanation: 'Land left fallow between 1 and 5 years is classified as "Fallow other than current fallow".',
  },
  {
    id: 'diag-4',
    question: 'Which cropping season operates during the hot dry summer months of April to June?',
    options: ['Kharif', 'Rabi', 'Zaid', 'Boro'],
    correctIndex: 2,
    nodeId: 'c12_geo_cbse_307',
    explanation: 'Zaid is the short summer season between Rabi and Kharif.',
  },
  {
    id: 'diag-5',
    question: 'Which rainfall threshold marks the transition from Dryland Farming to Wetland Farming?',
    options: ['25 cm', '50 cm', '75 cm', '200 cm'],
    correctIndex: 2,
    nodeId: 'c12_geo_cbse_309',
    explanation: 'Dryland farming is practiced in regions receiving less than 75 cm annual rainfall.',
  },
  {
    id: 'diag-6',
    question: 'Why are leguminous crops like Gram and Tur crucial in crop rotation systems?',
    options: ['They require maximum chemical fertilizer', 'They fix biological nitrogen into the soil', 'They grow only under submerged conditions', 'They take 3 years to harvest'],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_313',
    explanation: 'Pulses fix atmospheric nitrogen through root nodule bacteria, restoring natural soil fertility.',
  },
  {
    id: 'diag-7',
    question: 'What was the primary technological package of the Green Revolution in the late 1960s?',
    options: ['Organic compost & wooden plows', 'HYV seeds + canal/tubewell irrigation + chemical fertilizers', 'Manual drip irrigation + rain harvesting only', 'GM Bt cotton without chemical inputs'],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_317',
    explanation: 'The Green Revolution combined high-yielding variety (HYV) seeds with controlled irrigation and chemical inputs.',
  },
  {
    id: 'diag-8',
    question: 'What is the primary socio-economic function of Common Property Resources (CPRs)?',
    options: ['Providing private revenue for corporate firms', 'Supplying fodder, fuel wood, and water access to rural landless families', 'Generating urban municipal taxes', 'Converting forests into industrial mines'],
    correctIndex: 1,
    nodeId: 'c12_geo_cbse_300',
    explanation: 'CPRs offer essential subsistence resources (fodder, fuel, water) for landless households and livestock.',
  },
];

// ==========================================
// MANDATORY SECTION 7: 22 PROGRESSIVE CHALLENGES
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- TIER 1: FOUNDATION (7 Challenges) ---
  {
    id: 'chal-1',
    nodeId: 'c12_geo_cbse_287',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Recall & Basic Understanding',
    question: 'Which statement accurately describes land as a natural resource in economic geography?',
    options: [
      'Land is an infinite resource that can be expanded easily.',
      'Land is fixed in supply and its quality varies across geographical space.',
      'Land quality is uniform across all ecological zones.',
      'Land revenue data covers 100% of physical space worldwide.',
    ],
    correctIndex: 1,
    explanation: 'Land is fixed in total spatial area. Sustainable land-use management is necessary because we cannot manufacture more land area.',
    hints: [
      'Think about whether humans can manufacture new geographical territory.',
      'Consider spatial variability in fertility and terrain.',
      'Land area is spatially fixed.',
    ],
  },
  {
    id: 'chal-2',
    nodeId: 'c12_geo_cbse_288',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Data Interpretation',
    question: 'Why is India\'s Reporting Area less than its total Geographical Area of 3.28 million sq km?',
    options: [
      'Satellite mapping errors reduce physical size.',
      'Land revenue records have not surveyed remote, inaccessible, or contested border areas.',
      'Fallow lands are subtracted from geographical area.',
      'Urban infrastructure is excluded from reporting area.',
    ],
    correctIndex: 1,
    explanation: 'Reporting area covers ~93% of India because parts of Jammu & Kashmir, Ladakh, and remote north-eastern states lack complete revenue surveys.',
    hints: [
      'Reporting area depends on administrative revenue records.',
      'Some remote border regions are un-surveyed.',
      'It is an administrative limitation, not a spatial shrinking.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'chal-3',
    nodeId: 'c12_geo_cbse_290',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Classification Analysis',
    question: 'How is "Forest Cover" measured by satellite remote sensing different from "Forest Area" in land revenue records?',
    options: [
      'Revenue forest measures physical tree leaves; satellite measures timber prices.',
      'Revenue forest is legally classified forest land; satellite measures actual ground canopy density.',
      'Satellite measuring counts only private tree orchards.',
      'They are identical terms in geography.',
    ],
    correctIndex: 1,
    explanation: 'Revenue Forest Area is a legal status designation, whereas Satellite Forest Cover records actual green foliage canopy density on the ground.',
    hints: [
      'One is legal/administrative, the other is biological/physical.',
      'Canopy density is detected by satellite sensors.',
      'Legal demarcation does not guarantee dense tree growth.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'chal-4',
    nodeId: 'c12_geo_cbse_295',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Term Identification',
    question: 'Any land left uncultivated for more than 5 consecutive years is classified as:',
    options: ['Current Fallow', 'Fallow other than Current', 'Culturable Wasteland', 'Barren Land'],
    correctIndex: 2,
    explanation: 'Land remaining idle for over 5 years is categorized as Culturable Wasteland. It can be brought under cultivation after reclamation.',
    hints: [
      'Check the duration: > 5 years.',
      'It is land that CAN be cultivated after soil treatment.',
      'Culturable Wasteland.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'chal-5',
    nodeId: 'c12_geo_cbse_305',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Seasonal Alignment',
    question: 'Which crop combination belongs strictly to the Kharif cropping season in India?',
    options: [
      'Wheat, Gram, Mustard',
      'Rice, Cotton, Jute, Groundnut',
      'Watermelon, Muskmelon, Cucumber',
      'Barley, Oats, Peas',
    ],
    correctIndex: 1,
    explanation: 'Kharif crops coincide with the southwest monsoon (June to October) and include water-intensive crops like Rice, Cotton, Jute, and Groundnut.',
    hints: [
      'Look for crops sown at the onset of monsoon rains.',
      'Rice and Cotton are classic summer monsoon crops.',
      'Wheat is a winter (Rabi) crop.',
    ],
  },
  {
    id: 'chal-6',
    nodeId: 'c12_geo_cbse_306',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Seasonal Alignment',
    question: 'Which set of crops is sown in winter (Oct-Nov) and harvested in spring (March-April)?',
    options: ['Kharif Crops', 'Rabi Crops', 'Zaid Crops', 'Boro Rice'],
    correctIndex: 1,
    explanation: 'Rabi crops are winter crops that require low temperatures during germination and warm weather during harvesting.',
    hints: [
      'Winter crop season in India.',
      'Wheat, gram, and mustard are key examples.',
      'Rabi cropping season.',
    ],
  },
  {
    id: 'chal-7',
    nodeId: 'c12_geo_cbse_313',
    difficulty: 'foundation',
    type: 'multiple-choice',
    competencyLevel: 'Ecological Understanding',
    question: 'Why are pulse crops (Gram, Tur, Urad) ecologically vital in Indian crop rotation?',
    options: [
      'They absorb excess groundwater during floods.',
      'They fix atmospheric nitrogen into the soil through root nodules.',
      'They replace chemical pesticides entirely.',
      'They grow exclusively in submerged wetland fields.',
    ],
    correctIndex: 1,
    explanation: 'Pulses are leguminous crops that naturally fix nitrogen in soil, restoring fertility between cereal crop cycles.',
    hints: [
      'Leguminous plants have root nodule bacteria.',
      'Nitrogen fixation boosts soil nutrient status.',
      'Natural soil rejuvenator.',
    ],
  },

  // --- TIER 2: STANDARD (8 Challenges) ---
  {
    id: 'chal-8',
    nodeId: 'c12_geo_cbse_302',
    difficulty: 'standard',
    type: 'numeric',
    competencyLevel: 'Mathematical Calculation',
    question: 'A district has a Net Sown Area (NSA) of 150,000 hectares. Due to irrigation, 75,000 hectares are cropped twice a year. Calculate the Cropping Intensity (%) of this district.',
    correctAnswer: 150,
    explanation: 'Gross Cropped Area (GCA) = NSA (150,000) + Re-cropped Area (75,000) = 225,000 ha. Cropping Intensity = (225,000 / 150,000) × 100 = 150%.',
    hints: [
      'Step 1: Calculate GCA = Net Sown Area + Area cropped more than once.',
      'GCA = 150,000 + 75,000 = 225,000 ha.',
      'Step 2: Cropping Intensity = (GCA / NSA) × 100.',
    ],
  },
  {
    id: 'chal-9',
    nodeId: 'c12_geo_cbse_297',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Spatial Concept Distinction',
    question: 'If a farmer plants rice on 5 hectares in Kharif and wheat on the same 5 hectares in Rabi, how do NSA and GCA change?',
    options: [
      'NSA = 10 ha, GCA = 10 ha',
      'NSA = 5 ha, GCA = 10 ha',
      'NSA = 10 ha, GCA = 5 ha',
      'NSA = 5 ha, GCA = 5 ha',
    ],
    correctIndex: 1,
    explanation: 'Net Sown Area counts physical surface land once (5 ha). Gross Cropped Area counts every cropping cycle (5 + 5 = 10 ha).',
    hints: [
      'Net area counts physical ground ONCE.',
      'Gross area counts total sown area across all seasons.',
      'NSA = 5 ha, GCA = 10 ha.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'chal-10',
    nodeId: 'c12_geo_cbse_299',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Historical Trend Analysis',
    question: 'Which factor best explains why the percentage of "Area under Non-Agricultural Uses" doubled in India between 1950 and 2020?',
    options: [
      'Decline in total population.',
      'Rapid urbanization, industrial corridor expansion, and transport infrastructure buildout.',
      'Conversion of urban centers into dense forests.',
      'Decrease in industrial factory construction.',
    ],
    correctIndex: 1,
    explanation: 'Economic growth, urbanization, built-up housing expansion, and infrastructure development absorbed significant land into non-agricultural uses.',
    hints: [
      'Think about building roads, cities, and factories.',
      'Infrastructure expansion requires non-agricultural land.',
      'Urbanization and industrialization trends.',
    ],
  },
  {
    id: 'chal-11',
    nodeId: 'c12_geo_cbse_309',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Comparative Regional Geography',
    question: 'Comparing Dryland Farming and Wetland Farming, which statement correctly pairs annual rainfall with typical crop choices?',
    options: [
      'Dryland (<75cm rainfall): Rice & Sugarcane; Wetland (>75cm rainfall): Bajra & Jowar',
      'Dryland (<75cm rainfall): Jowar, Bajra, Pulses; Wetland (>75cm rainfall): Rice, Jute, Sugarcane',
      'Dryland (>150cm rainfall): Tea & Coffee; Wetland (<25cm rainfall): Wheat',
      'Both dryland and wetland farming require over 200cm rainfall.',
    ],
    correctIndex: 1,
    explanation: 'Dryland farming (<75 cm rain) focuses on drought-hardy coarse grains and pulses. Wetland farming (>75-100 cm rain) supports water-loving crops like rice and sugarcane.',
    hints: [
      'Dryland crops must be drought resistant.',
      'Wetland crops require abundant water supply.',
      '75 cm is the critical dividing threshold.',
    ],
  },
  {
    id: 'chal-12',
    nodeId: 'c12_geo_cbse_310',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Crop Requirement Geography',
    question: 'Which set of geographical conditions is essential for successful Rice cultivation?',
    options: [
      'High temperature (>25°C), high humidity, annual rainfall >100 cm (or standing water irrigation).',
      'Cool growing season (10-15°C), low rainfall (<30 cm), frost-free days.',
      'High altitude (>2000m), well-drained slopes, dry weather.',
      'Sub-zero winter temperatures and sandy dunes.',
    ],
    correctIndex: 0,
    explanation: 'Rice is a tropical monsoon crop requiring warm temperatures (>25°C), heavy rainfall (>100 cm), and clayey water-retentive soils.',
    hints: [
      'Rice requires warmth and standing water.',
      'Temperature above 25°C.',
      'Rainfall over 100 cm or assured canal irrigation.',
    ],
  },
  {
    id: 'chal-13',
    nodeId: 'c12_geo_cbse_315',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Commercial Crop Analysis',
    question: 'Why is Cotton predominantly cultivated in the Deccan Trap region of India?',
    options: [
      'Deccan plateau has high rainfall (>300cm) and alluvial delta soil.',
      'Black Regur soil has high moisture-retention capacity, complemented by warm temperatures and 210 frost-free days.',
      'Cotton requires cold snow cover during boll formation.',
      'Deccan plateau is covered by dense coniferous forests.',
    ],
    correctIndex: 1,
    explanation: 'Cotton thrives in deep black regur soils of the Deccan trap which hold moisture well, along with bright sunshine and 210 frost-free days.',
    hints: [
      'Black soil (Regur) is ideal for cotton.',
      'Moisture retention is crucial for rainfed cotton.',
      '210 frost-free days requirement.',
    ],
  },
  {
    id: 'chal-14',
    nodeId: 'c12_geo_cbse_317',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Historical Policy Analysis',
    question: 'Which region of India experienced the initial, maximum productivity boost from the Green Revolution in the late 1960s?',
    options: [
      'Eastern plateau region (Odisha and Jharkhand)',
      'Punjab, Haryana, and Western Uttar Pradesh',
      'Arid western Rajasthan',
      'North-eastern hill states (Assam and Meghalaya)',
    ],
    correctIndex: 1,
    explanation: 'Punjab, Haryana, and Western UP had canal network infrastructure, suitable land holdings, and early adoption of HYV wheat seeds.',
    hints: [
      'Look for the northwestern granary of India.',
      'Assured irrigation networks were already available.',
      'Punjab, Haryana, and Western UP.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'chal-15',
    nodeId: 'c12_geo_cbse_320',
    difficulty: 'standard',
    type: 'multiple-choice',
    competencyLevel: 'Socio-Economic Problem Solving',
    question: 'What primary factor causes Seasonal Unemployment among Indian agricultural laborers?',
    options: [
      'Year-round continuous harvesting cycles.',
      'Dependence on single-crop monoculture without irrigation, leaving months between sowing and harvesting idle.',
      'High wages paid by farm owners in winter.',
      'Mandatory rural factory work regulations.',
    ],
    correctIndex: 1,
    explanation: 'In rainfed single-cropped regions, farm operations cease for 4 to 6 months after harvest, leaving landless agricultural workers seasonally unemployed.',
    hints: [
      'Single cropping leaves long gaps between season activities.',
      'Lack of irrigation prevents multi-cropping.',
      'Seasonal nature of monsoon crop cycles.',
    ],
  },

  // --- TIER 3: ADVANCED (7 Challenges) ---
  {
    id: 'chal-16',
    nodeId: 'c12_geo_cbse_300',
    difficulty: 'advanced',
    type: 'multiple-choice',
    competencyLevel: 'Resource Governance Evaluation',
    question: 'Analyze the impact of privatizing village Common Property Resources (CPRs) on rural socio-economic equity.',
    options: [
      'It increases fodder availability for landless livestock rearers.',
      'It disproportionately harms landless laborers and rural women by eliminating access to free fodder, fuelwood, and water.',
      'It expands overall Net Sown Area without reducing pasture land.',
      'It automatically increases soil nitrogen levels across the village.',
    ],
    correctIndex: 1,
    explanation: 'CPRs act as safety nets for asset-poor households. Encroachment or privatization strips marginalized groups of free fodder, fuel, and livelihood support.',
    hints: [
      'Who relies most on common pastures and forests?',
      'Landless households do not own private fields.',
      'Women gather fuelwood from CPRs.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'chal-17',
    nodeId: 'c12_geo_cbse_303',
    difficulty: 'advanced',
    type: 'numeric',
    competencyLevel: 'Spatial Technology Synthesis',
    question: 'A state has 10 million hectares of Net Sown Area. By installing drip irrigation and high-efficiency short-duration seed packages, the Gross Cropped Area increases from 14 million hectares to 18 million hectares. What is the net increase in Cropping Intensity percentage points?',
    correctAnswer: 40,
    explanation: 'Initial CI = (14M / 10M) × 100 = 140%. New CI = (18M / 10M) × 100 = 180%. Increase in percentage points = 180 - 140 = 40 percentage points.',
    hints: [
      'Initial CI = (14 / 10) * 100 = 140%.',
      'New CI = (18 / 10) * 100 = 180%.',
      'Difference = 180 - 140 = 40 percentage points.',
    ],
  },
  {
    id: 'chal-18',
    nodeId: 'c12_geo_cbse_319',
    difficulty: 'advanced',
    type: 'multiple-choice',
    competencyLevel: 'Ecological & Structural Diagnosis',
    question: 'Intensive post-Green Revolution agriculture in Punjab and Haryana has led to severe ecological degradation. Which combination of issues accurately reflects this crisis?',
    options: [
      'Soil salinity due to over-irrigation, groundwater table depletion, and micronutrient deficiency.',
      'Severe deforestation, soil acidity from excessive organic compost, and flash floods.',
      'Volcanic ash accumulation, desert sand dune encroachment, and tea rust fungus.',
      'Urban industrial smog, loss of deep sea coral reefs, and river dam silting.',
    ],
    correctIndex: 0,
    explanation: 'Over-extraction of groundwater via tubewells and excessive flood irrigation of water-intensive paddy-wheat rotations caused falling water tables, soil salinity, and land degradation.',
    hints: [
      'Tubewells pump out groundwater faster than recharge.',
      'Over-irrigation brings salts to topsoil through capillary action.',
      'Groundwater depletion + Soil salinity.',
    ],
  },
  {
    id: 'chal-19',
    nodeId: 'c12_geo_cbse_321',
    difficulty: 'advanced',
    type: 'multiple-choice',
    competencyLevel: 'Financial Systems Analysis',
    question: 'Why do small and marginal farmers in India frequently get trapped in non-institutional debt cycles?',
    options: [
      'Formal banks offer zero interest rates exclusively to wealthy estate owners.',
      'Small operational land holdings yield low marketable surpluses, forcing dependence on high-interest informal moneylenders for input procurement and crop failure emergencies.',
      'Government policies mandate that farmers take private informal loans.',
      'Institutional credit is banned in rural districts.',
    ],
    correctIndex: 1,
    explanation: 'Marginal land size yields low cash margins. Lack of bank collateral and crop risk forces smallholders to borrow from local moneylenders at exorbitant interest rates.',
    hints: [
      'Small land size means low extra crop sales revenue.',
      'Informal moneylenders charge high interest without requiring formal collateral.',
      'Debt trap linked to crop failure and high input costs.',
    ],
  },
  {
    id: 'chal-20',
    nodeId: 'c12_geo_cbse_322',
    difficulty: 'advanced',
    type: 'multiple-choice',
    competencyLevel: 'Policy Evaluation',
    question: 'Which land reform measure in post-independence India was most successfully implemented across nearly all states?',
    options: [
      'Strict land ceiling enforcement and redistribution of surplus land.',
      'Abolition of the Zamindari intermediary system.',
      'Voluntary land consolidation of small fragmented parcels.',
      'Complete nationalization of private farm fields.',
    ],
    correctIndex: 1,
    explanation: 'The abolition of Zamindari intermediaries was quickly and successfully implemented, bringing millions of tenant farmers into direct contact with the state revenue system.',
    hints: [
      'Abolition of intermediaries was legal priority #1.',
      'Zamindari removal succeeded nationwide.',
      'Land ceiling and consolidation faced local political resistance.',
    ],
  },
  {
    id: 'chal-21',
    nodeId: 'c12_geo_cbse_323',
    difficulty: 'advanced',
    type: 'multiple-choice',
    competencyLevel: 'Strategic Initiative Integration',
    question: 'How does the Soil Health Card Scheme directly promote land-saving sustainable agriculture?',
    options: [
      'It forces farmers to stop using groundwater completely.',
      'It provides parcel-specific soil nutrient status, enabling targeted fertilizer dosage and preventing soil toxicity.',
      'It replaces crops with industrial forest plantations.',
      'It guarantees fixed high market prices for export crops.',
    ],
    correctIndex: 1,
    explanation: 'Soil Health Cards advise farmers on optimal chemical & organic fertilizer inputs based on specific soil nutrient deficits, preventing over-fertilization and degradation.',
    hints: [
      'Soil testing measures micro and macro nutrients.',
      'Targeted dosage reduces cost and stops land degradation.',
      'Customized fertilizer recommendations.',
    ],
  },
  {
    id: 'chal-22',
    nodeId: 'c12_geo_cbse_303',
    difficulty: 'advanced',
    type: 'multiple-choice',
    competencyLevel: 'Future Agricultural Planning',
    question: 'To meet rising national food grain demand by 2050 without expanding physical Net Sown Area, which policy matrix is most sustainable?',
    options: [
      'Convert all forest lands into monoculture rice fields using flood irrigation.',
      'Increase Cropping Intensity through micro-irrigation, climate-resilient short-duration HYV crops, and soil health management.',
      'Double fallow land area and reduce chemical/biological inputs to zero.',
      'Import 100% of national food grains while converting arable land into industrial real estate.',
    ],
    correctIndex: 1,
    explanation: 'Because physical Net Sown Area has reached a ecological ceiling (~140M ha), output growth must come from land-saving technologies and higher Cropping Intensity.',
    hints: [
      'Physical land expansion is ecologically constrained.',
      'Vertical productivity increase via Land-Saving Technology.',
      'Higher Cropping Intensity + Micro-irrigation + HYV seeds.',
    ],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Land Use Distribution Pie & Shift Visualizer
const LandUsePieChartSVG: React.FC<{ selectedYear: '1950' | '2020' }> = ({ selectedYear }) => {
  const data1950 = [
    { label: 'Net Area Sown', pct: 41.8, color: '#22c55e' },
    { label: 'Forests', pct: 14.2, color: '#15803d' },
    { label: 'Barren & Waste', pct: 13.4, color: '#a16207' },
    { label: 'Non-Agri Use', pct: 3.2, color: '#ef4444' },
    { label: 'Pastures', pct: 2.3, color: '#84cc16' },
    { label: 'Tree Groves', pct: 6.9, color: '#10b981' },
    { label: 'Culturable Waste', pct: 8.0, color: '#eab308' },
    { label: 'Fallow Lands', pct: 10.2, color: '#d97706' },
  ];

  const data2020 = [
    { label: 'Net Area Sown', pct: 45.5, color: '#22c55e' },
    { label: 'Forests', pct: 23.3, color: '#15803d' },
    { label: 'Barren & Waste', pct: 5.5, color: '#a16207' },
    { label: 'Non-Agri Use', pct: 8.7, color: '#ef4444' },
    { label: 'Pastures', pct: 3.3, color: '#84cc16' },
    { label: 'Tree Groves', pct: 1.0, color: '#10b981' },
    { label: 'Culturable Waste', pct: 4.0, color: '#eab308' },
    { label: 'Fallow Lands', pct: 8.7, color: '#d97706' },
  ];

  const activeData = selectedYear === '1950' ? data1950 : data2020;

  // Render SVG stacked horizontal bar chart representation for clear breakdown
  let cumulative = 0;

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white border border-slate-700 shadow-inner">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-amber-400 text-sm tracking-wide">
          LAND-USE DYNAMICS: {selectedYear === '1950' ? '1950-51' : '2019-20'} (REPORTING AREA %)
        </h4>
        <span className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-600 text-slate-300">
          Source: Land Revenue Statistics
        </span>
      </div>

      <svg viewBox="0 0 600 120" className="w-full h-auto rounded">
        {/* Background track */}
        <rect x="10" y="20" width="580" height="40" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />

        {/* Stacked Bars */}
        {activeData.map((item, idx) => {
          const barWidth = (item.pct / 100) * 580;
          const startX = 10 + cumulative;
          cumulative += barWidth;
          return (
            <g key={idx}>
              <rect
                x={startX}
                y="20"
                width={barWidth}
                height="40"
                fill={item.color}
                stroke="#0f172a"
                strokeWidth="1"
                className="transition-all duration-500 hover:opacity-80"
              >
                <title>{`${item.label}: ${item.pct}%`}</title>
              </rect>
              {barWidth > 24 && (
                <text
                  x={startX + barWidth / 2}
                  y="45"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {item.pct}%
                </text>
              )}
            </g>
          );
        })}

        {/* Legend Grid below */}
      </svg>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-xs">
        {activeData.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-1.5 bg-slate-800/60 p-1.5 rounded border border-slate-700/50">
            <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-slate-200 truncate">{item.label}:</span>
            <span className="font-bold text-white ml-auto">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Diagram 2: Cropping Seasons Calendar SVG
const CroppingSeasonsCalendarSVG: React.FC<{ activeSeason: 'kharif' | 'rabi' | 'zaid' }> = ({ activeSeason }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white border border-slate-700">
      <h4 className="font-bold text-emerald-400 text-sm mb-3">
        INDIAN AGRICULTURAL SEASONS & MONSOON CYCLES
      </h4>
      <svg viewBox="0 0 600 160" className="w-full h-auto">
        {/* Months Bar */}
        <g transform="translate(10, 20)">
          {['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'].map((m, i) => (
            <g key={m} transform={`translate(${i * 48}, 0)`}>
              <rect x="0" y="0" width="46" height="24" fill="#334155" rx="4" />
              <text x="23" y="16" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
                {m}
              </text>
            </g>
          ))}
        </g>

        {/* Kharif Band */}
        <g transform="translate(10, 55)">
          <rect
            x="0"
            y="0"
            width="190"
            height="32"
            rx="6"
            fill={activeSeason === 'kharif' ? '#16a34a' : '#1e293b'}
            stroke="#22c55e"
            strokeWidth={activeSeason === 'kharif' ? '3' : '1'}
          />
          <text x="95" y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            KHARIF (Monsoon: Rice, Cotton, Jute)
          </text>
        </g>

        {/* Rabi Band */}
        <g transform="translate(205, 55)">
          <rect
            x="0"
            y="0"
            width="284"
            height="32"
            rx="6"
            fill={activeSeason === 'rabi' ? '#2563eb' : '#1e293b'}
            stroke="#3b82f6"
            strokeWidth={activeSeason === 'rabi' ? '3' : '1'}
          />
          <text x="142" y="20" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            RABI (Winter: Wheat, Gram, Mustard)
          </text>
        </g>

        {/* Zaid Band */}
        <g transform="translate(495, 55)">
          <rect
            x="0"
            y="0"
            width="95"
            height="32"
            rx="6"
            fill={activeSeason === 'zaid' ? '#d97706' : '#1e293b'}
            stroke="#f59e0b"
            strokeWidth={activeSeason === 'zaid' ? '3' : '1'}
          />
          <text x="47" y="20" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
            ZAID (Summer)
          </text>
        </g>

        {/* Weather Indicator Curve */}
        <path
          d="M 10 130 Q 100 100 200 130 T 400 130 T 590 110"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="3"
          strokeDasharray="4 4"
        />
        <text x="20" y="148" fill="#38bdf8" fontSize="10">
          SW Monsoon Rainfall Peak (June–Sept)
        </text>
        <text x="350" y="148" fill="#93c5fd" fontSize="10">
          Western Disturbances / Winter Rain
        </text>
      </svg>
    </div>
  );
};

// Diagram 3: Crop Requirement & Agro-Climatic Zone Matrix SVG
const CropRequirementsMatrixSVG: React.FC<{ selectedCrop: string }> = ({ selectedCrop }) => {
  const cropData: Record<string, { temp: string; rain: string; soil: string; majorStates: string; type: string }> = {
    Rice: { temp: '> 25°C', rain: '> 100 cm', soil: 'Clayey Alluvium', majorStates: 'WB, UP, Punjab, AP', type: 'Kharif Staple' },
    Wheat: { temp: '10–15°C (Sowing), 21–26°C (Harvest)', rain: '50–75 cm', soil: 'Well-drained Alluvium / Loam', majorStates: 'UP, Punjab, Haryana, MP', type: 'Rabi Staple' },
    Cotton: { temp: '21–30°C (210 Frost-Free Days)', rain: '50–100 cm', soil: 'Black Regur Soil', majorStates: 'Gujarat, Maharashtra, Telangana', type: 'Kharif Commercial Fiber' },
    Sugarcane: { temp: '21–27°C', rain: '75–100 cm', soil: 'Deep Rich Alluvium', majorStates: 'UP, Maharashtra, Karnataka', type: 'Long-Duration Cash Crop' },
    Tea: { temp: '20–30°C', rain: '150–200 cm (Well Distributed)', soil: 'Acidic Friable Soil on Slopes', majorStates: 'Assam, WB (Darjeeling), TN', type: 'Plantation Beverage' },
  };

  const current = cropData[selectedCrop] || cropData['Rice'];

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white border border-slate-700 shadow-md">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-teal-400 text-sm">AGRO-CLIMATIC PROFILE: {selectedCrop.toUpperCase()}</h4>
        <span className="text-xs bg-teal-950 text-teal-300 border border-teal-700 px-2 py-0.5 rounded">
          {current.type}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
          <div className="text-xs text-slate-400">Temperature</div>
          <div className="text-sm font-bold text-amber-300 mt-1">{current.temp}</div>
        </div>
        <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
          <div className="text-xs text-slate-400">Annual Rainfall</div>
          <div className="text-sm font-bold text-gold-300 mt-1">{current.rain}</div>
        </div>
        <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
          <div className="text-xs text-slate-400">Soil Requirement</div>
          <div className="text-sm font-bold text-emerald-300 mt-1">{current.soil}</div>
        </div>
        <div className="bg-slate-800 p-2.5 rounded border border-slate-700">
          <div className="text-xs text-slate-400">Major Producer States</div>
          <div className="text-sm font-bold text-purple-300 mt-1">{current.majorStates}</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function C12_GeoLandResourcesAgricultureCBSESim() {
  // State: Tabs & Navigation
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostics' | 'summary'>('discovery');

  // State: Discovery & Prediction
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);

  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});

  // State: Interactive Lab Simulation Controls
  const [labStepIndex, setLabStepIndex] = useState(0);
  const [historicalYear, setHistoricalYear] = useState<'1950' | '2020'>('2020');
  const [netSownArea, setNetSownArea] = useState<number>(140); // Million Hectares
  const [rabiSownArea, setRabiSownArea] = useState<number>(45); // Million Hectares
  const [zaidSownArea, setZaidSownArea] = useState<number>(15); // Million Hectares
  const [selectedSeason, setSelectedSeason] = useState<'kharif' | 'rabi' | 'zaid'>('kharif');
  const [selectedCrop, setSelectedCrop] = useState<string>('Rice');
  const [farmingType, setFarmingType] = useState<'dryland' | 'wetland'>('dryland');
  const [irrigationLevel, setIrrigationLevel] = useState<number>(45); // % irrigated
  const [hyvSeedRatio, setHyvSeedRatio] = useState<number>(60); // % adoption

  // Calculated Lab Metrics
  const grossCroppedArea = useMemo(() => {
    return netSownArea + rabiSownArea + zaidSownArea;
  }, [netSownArea, rabiSownArea, zaidSownArea]);

  const croppingIntensity = useMemo(() => {
    if (netSownArea <= 0) return 0;
    return Math.round((grossCroppedArea / netSownArea) * 100);
  }, [grossCroppedArea, netSownArea]);

  const yieldIndex = useMemo(() => {
    const base = 100;
    const irrBonus = irrigationLevel * 0.8;
    const hyvBonus = hyvSeedRatio * 0.9;
    return Math.round(base + irrBonus + hyvBonus);
  }, [irrigationLevel, hyvSeedRatio]);

  const environmentalRiskScore = useMemo(() => {
    // Over-irrigation + excessive chemical input risk index
    const risk = (irrigationLevel * 0.6) + (hyvSeedRatio * 0.5) - (farmingType === 'dryland' ? 10 : 0);
    return Math.min(100, Math.max(10, Math.round(risk)));
  }, [irrigationLevel, hyvSeedRatio, farmingType]);

  // State: Challenges Engine
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [challengeCompleted, setChallengeCompleted] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'foundation' | 'standard' | 'advanced'>('all');

  // State: Diagnostics & Misconceptions
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({});
  const [diagSubmitted, setDiagSubmitted] = useState<Record<string, boolean>>({});

  // Feedback Component States
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState({ x: 400, y: 300 });

  // Inactivity Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // BKT Mastery Tracking State per Node ID
  const [bktStates, setBktStates] = useState<Record<NodeId, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, ReturnType<typeof createBKTState>>;
  });

  // SRS SM-2 Tracking State per Challenge ID
  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((c) => {
      initial[c.id] = createReviewItem(c.id);
    });
    return initial;
  });

  // Welcome speech audio on mount
  useEffect(() => {
    speechManager.speak('Welcome to the Land Resources and Agricultural Geography Simulator!');
    audioManager.play('whoosh');
  }, []);

  // Inactivity timer reset logic
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const activeChal = filteredChallenges[currentChallengeIndex];
      if (activeChal && activeTab === 'challenges') {
        setCurrentHint(`Auto-Hint: ${activeChal.hints[0]}`);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Hint requested: Pay attention to the agricultural concepts involved.');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab]);

  // Filter challenges based on difficulty selector
  const filteredChallenges = useMemo(() => {
    if (filterDifficulty === 'all') return CHALLENGES;
    return CHALLENGES.filter((c) => c.difficulty === filterDifficulty);
  }, [filterDifficulty]);

  const activeChallenge = filteredChallenges[currentChallengeIndex] || filteredChallenges[0];

  // Submit Answer for Challenges
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    if (!activeChallenge) return;

    let isCorrect = false;

    if (activeChallenge.type === 'multiple-choice') {
      if (userSelectedOption === null) return;
      isCorrect = userSelectedOption === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'numeric') {
      const val = parseFloat(userNumericInput.trim());
      if (isNaN(val)) return;
      isCorrect = val === activeChallenge.correctAnswer;
    }

    // Update BKT State
    const currentBkt = bktStates[activeChallenge.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({
      ...prev,
      [activeChallenge.nodeId]: updatedBkt,
    }));

    // Update SRS SM-2 State (Quality scale 0-5)
    const quality = isCorrect ? 5 : 1;
    const currentSrs = srsItems[activeChallenge.id] || createReviewItem(activeChallenge.id);
    const updatedSrs = sm2Update(currentSrs, quality);
    setSrsItems((prev) => ({
      ...prev,
      [activeChallenge.id]: updatedSrs,
    }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setSparkleCoords({ x: 500, y: 250 });
      setChallengeFeedback({
        isCorrect: true,
        text: `Correct! ${activeChallenge.explanation}`,
      });

      const nextCompleted = [...challengeCompleted];
      const origIdx = CHALLENGES.findIndex((c) => c.id === activeChallenge.id);
      if (origIdx !== -1) nextCompleted[origIdx] = true;
      setChallengeCompleted(nextCompleted);

      // Check if all completed
      if (nextCompleted.every(Boolean)) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Mastery achieved! All agricultural challenges successfully solved.');
        recordGameScore('C12_GEO_CBSE_LAND_AGRI', 100);
      } else {
        speechManager.speak('Correct answer! Great spatial analysis.');
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. ${activeChallenge.explanation}`,
      });
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('tap');
    setUserSelectedOption(null);
    setUserNumericInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex < filteredChallenges.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    }
  };

  const handlePrevChallenge = () => {
    audioManager.play('tap');
    setUserSelectedOption(null);
    setUserNumericInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex((prev) => prev - 1);
    }
  };

  // Lab reset button
  const handleResetLab = () => {
    audioManager.play('chime');
    setNetSownArea(140);
    setRabiSownArea(45);
    setZaidSownArea(15);
    setIrrigationLevel(45);
    setHyvSeedRatio(60);
    speechManager.speak('Simulation reset to default agricultural land allocation.');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center">
      {/* Visual Feedback Overlays */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Geography Master: Land Resources & Agriculture Completed!" />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              ISC / CBSE Class 12 Geography
            </span>
            <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              Chapter 3: Land Resources & Agriculture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Spatial Land-Use & Agricultural Simulator
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Explore 37 curriculum nodes: Land use classification, cropping intensity, seasons, crop distributions, Green Revolution, and policy solutions.
          </p>
        </div>

        {/* Global Progress Gauge */}
        <div className="flex items-center gap-4 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-400">Mastery Index</div>
            <div className="text-lg font-extrabold text-emerald-400">
              {Math.round((challengeCompleted.filter(Boolean).length / CHALLENGES.length) * 100)}%
            </div>
          </div>
          <div className="w-24 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
              style={{
                width: `${(challengeCompleted.filter(Boolean).length / CHALLENGES.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex flex-wrap gap-2 mb-6">
        {[
          { id: 'discovery', label: '1. Discovery & Scenario', icon: '🔍' },
          { id: 'lab', label: '2. Interactive Geography Lab', icon: '🧪' },
          { id: 'challenges', label: '3. Progressive Challenges (22)', icon: '🎯' },
          { id: 'diagnostics', label: '4. Diagnostics & Misconceptions', icon: '🧠' },
          { id: 'summary', label: '5. Real-World Extension', icon: '🌐' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 border ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-900/40'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <section className="w-full max-w-6xl space-y-6">
          {/* Scenario Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏛️</span>
              <h2 className="text-xl font-bold text-amber-400">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-200 leading-relaxed mb-4 text-sm sm:text-base">{SCENARIO.intro}</p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300">
              <strong className="text-emerald-400">Mission Objective: </strong>
              {SCENARIO.context}
            </div>
          </div>

          {/* Discovery Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>💡 Initial Preconception Assessment</span>
            </div>
            <h3 className="text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('pop');
                    setSelectedDiscoveryOpt(idx);
                    setDiscoveryAnswered(true);
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      audioManager.play('success');
                      speechManager.speak('Excellent discovery! Cropping intensity depends on multiple cropping on the net sown area.');
                    } else {
                      audioManager.play('error');
                    }
                  }}
                  className={`text-left p-4 rounded-xl border transition-all text-sm ${
                    selectedDiscoveryOpt === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-100 font-medium'
                        : 'bg-rose-950/80 border-rose-500 text-rose-100'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </button>
              ))}
            </div>

            {discoveryAnswered && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm">
                <strong className="text-emerald-400">Geographical Insight: </strong>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* PREDICTION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-teal-400 flex items-center gap-2">
              <span>🔮 Spatial Hypothesis & Predictions</span>
            </h3>

            {PREDICTION_QUESTIONS.map((pq, idx) => (
              <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <p className="font-semibold text-white text-sm sm:text-base">{pq.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {pq.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        audioManager.play('pop');
                        setPredAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                        if (oIdx === pq.correctIndex) {
                          audioManager.play('success');
                        } else {
                          audioManager.play('error');
                        }
                      }}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                        predAnswers[idx] === oIdx
                          ? oIdx === pq.correctIndex
                            ? 'bg-teal-950 border-teal-500 text-teal-100 font-semibold'
                            : 'bg-rose-950 border-rose-500 text-rose-100'
                          : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
                {predAnswers[idx] !== undefined && (
                  <p className="text-xs text-amber-300 bg-amber-950/40 p-2.5 rounded border border-amber-800/40">
                    🔍 <strong>Verification Guide: </strong>{pq.verifyInstruction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE GEOGRAPHY LAB */}
      {activeTab === 'lab' && (
        <section className="w-full max-w-6xl space-y-6">
          {/* Exploration Steps Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span>🔬 Interactive Exploration Labs (Select Lab Step)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setLabStepIndex(idx);
                    speechManager.speak(`Switched to ${step.title}`);
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    labStepIndex === idx
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-[10px] opacity-75 uppercase">Lab Step {idx + 1}</div>
                  <div className="truncate font-bold mt-0.5">{step.title.split(':')[1]}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200">
              <strong className="text-emerald-400">Lab Directive: </strong>
              {EXPLORATION_STEPS[labStepIndex].instruction}
            </div>
          </div>

          {/* DYNAMIC INTERACTIVE LAB WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Control Panel Column */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-white text-sm tracking-wide">LAB VARIABLE CONTROLS</h4>
                <button
                  onClick={handleResetLab}
                  className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded border border-slate-600 transition"
                >
                  Reset Parameters
                </button>
              </div>

              {/* Lab 1 Controls: Timeline */}
              {labStepIndex === 0 && (
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-slate-300">
                    Historical Decade Select: <span className="text-amber-400 font-bold">{historicalYear}</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setHistoricalYear('1950');
                      }}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        historicalYear === '1950' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      1950 - 1951
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setHistoricalYear('2020');
                      }}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs border ${
                        historicalYear === '2020' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      2019 - 2020
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Compare historical shift: Note the expansion of Non-Agricultural Land & Forest revenue land, and the reduction in Barren & Wasteland over 70 years.
                  </p>
                </div>
              )}

              {/* Lab 2 Controls: Cropping Intensity Calculator */}
              {labStepIndex === 1 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Net Sown Area (NSA)</span>
                      <span className="text-emerald-400 font-bold">{netSownArea} M ha</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="160"
                      value={netSownArea}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setNetSownArea(parseInt(e.target.value));
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Rabi Season Sown Area</span>
                      <span className="text-gold-400 font-bold">{rabiSownArea} M ha</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={rabiSownArea}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setRabiSownArea(parseInt(e.target.value));
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Zaid Summer Sown Area</span>
                      <span className="text-amber-400 font-bold">{zaidSownArea} M ha</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={zaidSownArea}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setZaidSownArea(parseInt(e.target.value));
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Lab 3 Controls: Cropping Seasons Matcher */}
              {labStepIndex === 2 && (
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-slate-300">Select Cropping Season:</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['kharif', 'rabi', 'zaid'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          audioManager.play('tap');
                          setSelectedSeason(s);
                        }}
                        className={`py-2 text-xs font-bold rounded-lg border uppercase ${
                          selectedSeason === s ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <label className="block text-xs font-semibold text-slate-300 mt-3">Select Crop to Analyze:</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => {
                      audioManager.play('tap');
                      setSelectedCrop(e.target.value);
                    }}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs font-bold p-2.5 rounded-lg"
                  >
                    <option value="Rice">Rice (Kharif Staple)</option>
                    <option value="Wheat">Wheat (Rabi Grain)</option>
                    <option value="Cotton">Cotton (Fiber Cash Crop)</option>
                    <option value="Sugarcane">Sugarcane (Perennial Cash Crop)</option>
                    <option value="Tea">Tea (Plantation Beverage)</option>
                  </select>
                </div>
              )}

              {/* Lab 4 Controls: Farming Type & Water Regime */}
              {labStepIndex === 3 && (
                <div className="space-y-4">
                  <label className="block text-xs font-semibold text-slate-300">Select Water Regime System:</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setFarmingType('dryland');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                        farmingType === 'dryland' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Dryland Farming (&lt;75 cm)
                    </button>
                    <button
                      onClick={() => {
                        audioManager.play('tap');
                        setFarmingType('wetland');
                      }}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                        farmingType === 'wetland' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      Wetland Farming (&gt;75 cm)
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    {farmingType === 'dryland'
                      ? 'Dryland farming relies on rain-fed moisture conservation. Main crops: Jowar, Bajra, Ragi, Pulses.'
                      : 'Wetland farming takes advantage of heavy rain or rivers. Main crops: Rice, Jute, Sugarcane.'}
                  </p>
                </div>
              )}

              {/* Lab 5 Controls: Green Revolution & Tech Optimizer */}
              {labStepIndex === 4 && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">Irrigation Coverage (%)</span>
                      <span className="text-gold-400 font-bold">{irrigationLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={irrigationLevel}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setIrrigationLevel(parseInt(e.target.value));
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-300">HYV Seed & Fertilizer Ratio (%)</span>
                      <span className="text-emerald-400 font-bold">{hyvSeedRatio}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={hyvSeedRatio}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setHyvSeedRatio(parseInt(e.target.value));
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Real-time Math Outputs Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Calculated Metrics</div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Gross Cropped Area (GCA):</span>
                  <span className="font-bold text-teal-300">{grossCroppedArea} M ha</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Cropping Intensity (CI):</span>
                  <span className="font-bold text-emerald-400 text-sm">{croppingIntensity}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Yield Productivity Index:</span>
                  <span className="font-bold text-amber-300">{yieldIndex} pt</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Ecological Salinity Risk:</span>
                  <span className={`font-bold ${environmentalRiskScore > 70 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {environmentalRiskScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Visualizer Canvas / SVG Column */}
            <div className="lg:col-span-2 space-y-5">
              {labStepIndex === 0 && <LandUsePieChartSVG selectedYear={historicalYear} />}
              {labStepIndex === 1 && (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <h4 className="font-bold text-emerald-400 text-base">CROPPING INTENSITY VISUALIZER</h4>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Net Sown Area</div>
                      <div className="text-xl font-extrabold text-white mt-1">{netSownArea} M ha</div>
                      <div className="text-[10px] text-slate-500 mt-1">Physical Land Base</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Gross Cropped Area</div>
                      <div className="text-xl font-extrabold text-teal-400 mt-1">{grossCroppedArea} M ha</div>
                      <div className="text-[10px] text-slate-500 mt-1">NSA + Rabi + Zaid</div>
                    </div>
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="text-xs text-slate-400">Cropping Intensity</div>
                      <div className="text-2xl font-black text-emerald-400 mt-1">{croppingIntensity}%</div>
                      <div className="text-[10px] text-slate-500 mt-1">(GCA / NSA) × 100</div>
                    </div>
                  </div>

                  {/* Formula Box */}
                  <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl text-xs text-emerald-200">
                    <strong className="text-emerald-300">Equation Breakdown: </strong>
                    Cropping Intensity = ({grossCroppedArea} M ha ÷ {netSownArea} M ha) × 100 = <strong>{croppingIntensity}%</strong>.
                    Increasing Rabi or Zaid sowing increases total output without requiring additional forest or fallow land conversion!
                  </div>
                </div>
              )}
              {labStepIndex === 2 && <CroppingSeasonsCalendarSVG activeSeason={selectedSeason} />}
              {labStepIndex === 3 && <CropRequirementsMatrixSVG selectedCrop={selectedCrop} />}
              {labStepIndex === 4 && (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <h4 className="font-bold text-amber-400 text-base">GREEN REVOLUTION YIELD vs ECOLOGICAL RISK MODEL</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Agricultural Food Grain Yield Index</span>
                        <span className="text-emerald-400 font-bold">{yieldIndex} pts</span>
                      </div>
                      <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-300 h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (yieldIndex / 250) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Soil Water-Logging & Groundwater Depletion Risk</span>
                        <span className="text-rose-400 font-bold">{environmentalRiskScore}%</span>
                      </div>
                      <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-rose-600 h-full transition-all duration-300"
                          style={{ width: `${environmentalRiskScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 leading-relaxed">
                    💡 <strong>Ecological Trade-off: </strong> While high input ratios (tubewells + HYVs + fertilizers) surge yield output rapidly, excessive flood irrigation without sub-surface drainage leads to soil salinization and severe groundwater table decline.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* OBSERVATION QUESTIONS SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <span>👁️ Lab Observation & Pattern Analysis</span>
            </h3>

            {OBSERVATION_QUESTIONS.map((oq, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <p className="font-semibold text-white text-sm">{oq.question}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {oq.observableOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        audioManager.play('pop');
                        setObsAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                        if (oIdx === oq.correctIndex) {
                          audioManager.play('success');
                        } else {
                          audioManager.play('error');
                        }
                      }}
                      className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                        obsAnswers[idx] === oIdx
                          ? oIdx === oq.correctIndex
                            ? 'bg-amber-950 border-amber-500 text-amber-100 font-semibold'
                            : 'bg-rose-950 border-rose-500 text-rose-100'
                          : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-1">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: PROGRESSIVE CHALLENGES (22 CHALLENGES) */}
      {activeTab === 'challenges' && (
        <section className="w-full max-w-6xl space-y-6">
          {/* Difficulty Filter Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">Filter Tier:</span>
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => {
                    audioManager.play('tap');
                    setFilterDifficulty(tier);
                    setCurrentChallengeIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                    filterDifficulty === tier
                      ? 'bg-emerald-600 text-white border border-emerald-400'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 font-medium">
              Challenge {currentChallengeIndex + 1} of {filteredChallenges.length}
            </div>
          </div>

          {/* ACTIVE CHALLENGE CARD */}
          {activeChallenge && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              {/* Challenge Header info */}
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${
                      activeChallenge.difficulty === 'foundation'
                        ? 'bg-gold-950 text-gold-300 border-gold-700'
                        : activeChallenge.difficulty === 'standard'
                        ? 'bg-amber-950 text-amber-300 border-amber-700'
                        : 'bg-rose-950 text-rose-300 border-rose-700'
                    }`}
                  >
                    {activeChallenge.difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400">
                    Node: <code className="text-emerald-400">{activeChallenge.nodeId}</code> (
                    {NODE_METADATA[activeChallenge.nodeId]?.title})
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-300 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                  {activeChallenge.competencyLevel}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {activeChallenge.question}
              </h3>

              {/* Multiple Choice Options */}
              {activeChallenge.type === 'multiple-choice' && activeChallenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {activeChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('pop');
                        setUserSelectedOption(idx);
                      }}
                      className={`text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                        userSelectedOption === idx
                          ? 'bg-emerald-950 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-950/70 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {activeChallenge.type === 'numeric' && (
                <div className="space-y-3">
                  <label className="block text-xs text-slate-300 font-semibold">
                    Enter Numerical Value:
                  </label>
                  <input
                    type="number"
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    placeholder="Type number..."
                    className="w-full sm:w-64 bg-slate-950 border border-slate-700 text-white font-bold text-base p-3 rounded-xl focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Feedback Display */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm border leading-relaxed ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/90 border-rose-500 text-rose-200'
                  }`}
                >
                  <strong className="block mb-1 font-bold">
                    {challengeFeedback.isCorrect ? '✓ Verification Successful' : '✗ Needs Review'}
                  </strong>
                  {challengeFeedback.text}
                </div>
              )}

              {/* Action Buttons Bar */}
              <div className="flex flex-wrap justify-between items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    const hintText = activeChallenge.hints[0];
                    setCurrentHint(hintText);
                    setShowHint(true);
                    speechManager.speak(`Hint: ${hintText}`);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-600 transition"
                >
                  💡 Need Hint
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrevChallenge}
                    disabled={currentChallengeIndex === 0}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl border border-emerald-400 transition shadow-lg shadow-emerald-900/40"
                  >
                    Submit Answer
                  </button>

                  <button
                    onClick={handleNextChallenge}
                    disabled={currentChallengeIndex === filteredChallenges.length - 1}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-40 text-slate-300 text-xs font-bold rounded-xl border border-slate-800 transition"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* TAB 4: DIAGNOSTICS & MISCONCEPTIONS */}
      {activeTab === 'diagnostics' && (
        <section className="w-full max-w-6xl space-y-8">
          {/* Misconceptions Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-xl font-extrabold text-amber-400 flex items-center gap-2">
              <span>⚠️ Common Misconceptions & Clarifications</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((item, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs text-rose-400 font-bold uppercase tracking-wide">
                    Misconception #{idx + 1}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-rose-200">
                    "{item.misconception}"
                  </div>
                  <div className="text-xs text-emerald-300 bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40 leading-relaxed">
                    <strong className="text-emerald-400">Scientific Correction: </strong>
                    {item.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Quiz Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-xl font-extrabold text-teal-400 flex items-center gap-2">
              <span>📝 Diagnostic Knowledge Assessment (8 Diagnostic Items)</span>
            </h3>

            <div className="space-y-6">
              {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => (
                <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Question {qIdx + 1} of 8</span>
                    <span>Node: {q.nodeId}</span>
                  </div>
                  <p className="font-bold text-white text-sm sm:text-base">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('pop');
                          setDiagAnswers((prev) => ({ ...prev, [q.id]: oIdx }));
                        }}
                        className={`text-left p-3 rounded-lg border text-xs sm:text-sm transition-all ${
                          diagAnswers[q.id] === oIdx
                            ? 'bg-teal-950 border-teal-500 text-white font-semibold'
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => {
                        if (diagAnswers[q.id] === undefined) return;
                        audioManager.play('sparkle');
                        setDiagSubmitted((prev) => ({ ...prev, [q.id]: true }));
                      }}
                      className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-lg transition"
                    >
                      Check Answer
                    </button>

                    {diagSubmitted[q.id] && (
                      <span
                        className={`text-xs font-bold ${
                          diagAnswers[q.id] === q.correctIndex ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {diagAnswers[q.id] === q.correctIndex
                          ? '✓ Correct Answer!'
                          : `✗ Incorrect. Correct: ${q.options[q.correctIndex]}`}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 5: REAL-WORLD EXTENSION & SUMMARY */}
      {activeTab === 'summary' && (
        <section className="w-full max-w-6xl space-y-8">
          {/* REAL WORLD ACTIVITY SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌾</span>
              <div>
                <h3 className="text-xl font-extrabold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-0.5">{REAL_WORLD_ACTIVITY.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REAL_WORLD_ACTIVITY.steps.map((stepText, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs font-bold text-emerald-400 uppercase">Audit Step {sIdx + 1}</div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{stepText}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ALL 37 NODES MASTERY MATRIX */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📊 Curriculum Mastery Grid (37 Geography Nodes)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {ALL_NODE_IDS.map((id) => {
                const meta = NODE_METADATA[id];
                const bkt = bktStates[id] || createBKTState();
                const level = getMasteryLevel(bkt);
                return (
                  <div key={id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <code className="text-emerald-400 font-bold">{id}</code>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          level === 'mastered'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : level === 'proficient'
                            ? 'bg-amber-950 text-amber-300 border border-amber-700'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {level}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white truncate">{meta?.title || id}</div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">{meta?.definition}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}