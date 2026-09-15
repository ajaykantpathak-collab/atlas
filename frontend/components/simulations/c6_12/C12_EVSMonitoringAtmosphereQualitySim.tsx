'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

// Node string literals declared as constants
const NODE_C12_EVS_011 = 'c12_evs_011';
const NODE_C12_EVS_012 = 'c12_evs_012';
const NODE_C12_EVS_013 = 'c12_evs_013';
const NODE_C12_EVS_014 = 'c12_evs_014';
const NODE_C12_EVS_015 = 'c12_evs_015';
const NODE_C12_EVS_016 = 'c12_evs_016';
const NODE_C12_EVS_017 = 'c12_evs_017';
const NODE_C12_EVS_018 = 'c12_evs_018';
const NODE_C12_EVS_019 = 'c12_evs_019';
const NODE_C12_EVS_020 = 'c12_evs_020';
const NODE_C12_EVS_021 = 'c12_evs_021';
const NODE_C12_EVS_022 = 'c12_evs_022';

const ALL_NODE_IDS = [
  NODE_C12_EVS_011,
  NODE_C12_EVS_012,
  NODE_C12_EVS_013,
  NODE_C12_EVS_014,
  NODE_C12_EVS_015,
  NODE_C12_EVS_016,
  NODE_C12_EVS_017,
  NODE_C12_EVS_018,
  NODE_C12_EVS_019,
  NODE_C12_EVS_020,
  NODE_C12_EVS_021,
  NODE_C12_EVS_022,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Environmental Mission: The National Sustainability Dashboard',
  intro: 'You are the Chief Environmental Scientist for the Central Pollution Control Board (CPCB) & NITI Aayog taskforce. Cities are suffocating under smog, rivers are experiencing hypoxia, soils are salinising, and natural capital is depleting unchecked.',
  context: 'Your mission is to calibrate monitoring stations, audit river basins, assess rural-urban divides, formulate traditional agri-preservation strategies, calculate natural capital accounts, and balance international trade externalities.',
};

// Discovery Hook
const DISCOVERY_QUESTION = {
  question: 'In a CAAQMS monitoring station in Delhi, 7 pollutants show low values (sub-index ~40, Good), but PM2.5 spikes to 260 µg/m³ (sub-index 320, Very Poor). How is the overall AQI reported?',
  options: [
    'AQI = 75 (Average of all 8 sub-indices)',
    'AQI = 320 (Maximum of all sub-indices, dominant: PM2.5)',
    'AQI = 160 (Median value of the suite of pollutants)',
    'AQI is invalid until all pollutants cross the threshold',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Averaging would mask a life-threatening spike! CPCB uses the MAXIMUM sub-index rule.',
};

// Challenge Interface
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

// 22 Challenges covering all nodes
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_evs_01',
    nodeId: NODE_C12_EVS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following sets contains ONLY criteria pollutants regulated by CPCB for calculating the National AQI in India?',
    options: [
      'PM2.5, PM10, NO2, SO2, CO, O3, NH3, Pb',
      'CO2, Methane, CFC-11, PM2.5, NO2, SO2, Lead, Ozone',
      'Smoke, Haze, Dust, Smog, VOCs, Radon, SO2, CO',
      'PM2.5, PM10, CO2, Argon, Nitrogen, SO2, NH3, Lead',
    ],
    correctIndex: 0,
    explanation: 'The CPCB National AQI monitors exactly 8 criteria pollutants: PM2.5, PM10, NO2, SO2, CO, O3, NH3, and Pb. Methane and CO2 are greenhouse gases, while smoke/haze are visible effects, not criteria pollutants.',
    hints: [
      'Think of criteria pollutants that have established CPCB health breakpoints.',
      'Greenhouse gases like CO2 and CH4 are not included in the standard 8 criteria pollutants.',
      'The 8 pollutants include two particulate sizes (PM2.5, PM10), 5 gases (NO2, SO2, CO, O3, NH3) and one heavy metal (Pb).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_evs_02',
    nodeId: NODE_C12_EVS_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each ambient air pollutant with its dedicated CAAQMS analytical detection principle.',
    dragItems: [
      { label: 'Chemiluminescence (NO + O3 light)', targetId: 'slot_nox' },
      { label: 'NDIR (Infrared absorption)', targetId: 'slot_co' },
      { label: 'UV Fluorescence', targetId: 'slot_so2' },
      { label: 'Beta Attenuation / Oscillating Microbalance', targetId: 'slot_pm' },
    ],
    correctMapping: {
      slot_nox: 'Chemiluminescence (NO + O3 light)',
      slot_co: 'NDIR (Infrared absorption)',
      slot_so2: 'UV Fluorescence',
      slot_pm: 'Beta Attenuation / Oscillating Microbalance',
    },
    explanation: 'NOx is detected by Chemiluminescence; CO absorbs specific IR wavelengths (NDIR); SO2 fluoresces under UV excitation; PM mass is captured in near real-time via BAM or TEOM.',
    hints: [
      'Recall which gas glows when reacted with ozone.',
      'Carbon monoxide has distinct infrared vibrational absorption bands.',
      'Sulphur dioxide emits fluorescent radiation when excited by ultraviolet light.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_evs_03',
    nodeId: NODE_C12_EVS_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A water sample from the Yamuna river has DO_initial = 8.5 mg/L. After a 5-day incubation at 20°C in the dark, DO_final = 2.5 mg/L. The dilution factor used was 0.20 (1 part sample in 5 parts mixture). Calculate the BOD in mg/L.',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: 'mg/L',
    explanation: 'BOD = (DO_initial - DO_final) / Dilution Factor = (8.5 - 2.5) / 0.20 = 6.0 / 0.20 = 30 mg/L. Values above 5 mg/L denote heavily polluted water.',
    hints: [
      'The formula is BOD = (DO_initial - DO_final) / Dilution Factor.',
      'Find the oxygen consumed: 8.5 - 2.5 = 6.0 mg/L.',
      'Divide 6.0 by 0.20 to find the un-diluted BOD.',
    ],
  },
  {
    id: 'ch_evs_04',
    nodeId: NODE_C12_EVS_012,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the chemical stages of Winkler’s iodometric method for measuring Dissolved Oxygen (DO) in correct sequential order.',
    sortItems: [
      'Add MnSO4 and alkaline KI-azide to form brown manganic precipitate MnO(OH)2 (Fixation)',
      'Add concentrated H2SO4 to dissolve precipitate and liberate free I2 from iodide',
      'Titrate liberated I2 with standard sodium thiosulphate (Na2S2O3) using starch indicator until blue-black disappears',
      'Calculate DO in mg/L where 1 mole of O2 liberated corresponds stoichiometrically to thiosulphate consumed',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Winkler iodometric titration: 1. Fix oxygen with Mn(OH)2 precipitate; 2. Acidify to liberate I2 equivalent to DO; 3. Titrate I2 against sodium thiosulphate with starch; 4. Compute DO.',
    hints: [
      'First, oxygen must be chemically trapped ("fixed") so it cannot escape.',
      'Next, acid dissolves the brown precipitate to liberate elemental iodine.',
      'Iodine is titrated against sodium thiosulphate until the blue starch complex turns colorless.',
    ],
  },
  {
    id: 'ch_evs_05',
    nodeId: NODE_C12_EVS_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A soil scientist is classifying soil quality indicators. Which of the following is correctly identified as a BIOLOGICAL indicator of soil health?',
    options: [
      'Soil Organic Matter (SOM) & Microbial Biomass Carbon',
      'Electrical Conductivity (EC) measured in dS/m',
      'Cation Exchange Capacity (CEC) in cmol/kg',
      'Available Phosphorus extracted by Olsen sodium bicarbonate',
    ],
    correctIndex: 0,
    explanation: 'Soil Organic Matter and microbial biomass are biological indicators because they reflect and sustain living microbial communities. EC and CEC are physical/physicochemical, while Olsen P is a chemical indicator.',
    hints: [
      'Do not confuse chemical nutrients (NPK) with biological life.',
      'Biological indicators directly track living organisms, respiration, or decomposed organic humus.',
      'Organic matter sustains earthworms and microbial colonies.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_evs_06',
    nodeId: NODE_C12_EVS_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An agricultural lab in coastal Gujarat tests a soil sample: pH = 8.6, EC = 6.8 dS/m, and exchangeable sodium is high. What is the scientifically sound remediation strategy?',
    options: [
      'Apply agricultural limestone (CaCO3) to elevate the pH further',
      'Apply gypsum (CaSO4·2H2O) followed by leaching with low-salinity irrigation water',
      'Add concentrated urea and muriate of potash without flushing salts',
      'Submerge the field under brackish seawater to neutralize sodium ions',
    ],
    correctIndex: 1,
    explanation: 'Gypsum (CaSO4) supplies Ca²⁺ ions to displace exchangeable Na⁺ from clay colloids, and subsequent freshwater leaching flushes displaced sodium and soluble salts (EC > 4 dS/m) out of the root zone.',
    hints: [
      'The sample has high EC (>4 dS/m) and high pH (>7.5) with sodicity.',
      'Limestone is used for acidic soils (pH < 6.5), not alkaline/sodic soils.',
      'Calcium from gypsum replaces sodium on soil exchange sites.',
    ],
  },
  {
    id: 'ch_evs_07',
    nodeId: NODE_C12_EVS_014,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Analyze rural-to-urban migration dynamics in India. Which of the following correctly pairs a rural PUSH factor with an urban PULL factor?',
    options: [
      'Push: Sub-divided uneconomic land holdings (<1 ha) | Pull: Higher daily industrial/construction wages & anonymity from caste barriers',
      'Push: High urban rental costs | Pull: Seasonal agricultural lean periods',
      'Push: Proximity to tertiary care hospitals | Pull: Frequent village power cuts',
      'Push: Remittance inflow from abroad | Pull: Slum proliferation in metros',
    ],
    correctIndex: 0,
    explanation: 'Push factors drive villagers OUT (land fragmentation, crop failure, lack of non-farm work, caste discrimination). Pull factors draw people IN (higher wages, accessible healthcare/education, social mobility).',
    hints: [
      'Push factors are rural distress conditions.',
      'Pull factors are perceived opportunities in cities.',
      'Land sub-division pushes; higher wages and caste anonymity pull.',
    ],
  },
  {
    id: 'ch_evs_08',
    nodeId: NODE_C12_EVS_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'How does the Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA 2005) structurally alleviate the urban-rural migration divide?',
    options: [
      'It provides urban slum dwellers with free apartments in metropolitan centers',
      'It acts as a rural "push reducer" by legally guaranteeing 100 days of wage employment per household per year locally during lean agricultural seasons',
      'It mandates that 50% of urban factory workers must return to rural farming every harvest',
      'It bans rural citizens from traveling to tier-1 cities without municipal permits',
    ],
    correctIndex: 1,
    explanation: 'MGNREGA provides a legal guarantee of 100 days of unskilled wage work per rural household, providing income security during drought/lean seasons and preventing distressed survival migration.',
    hints: [
      'MGNREGA operates in rural panchayats, not urban municipal wards.',
      'It targets the seasonal unemployment push factor.',
      'It guarantees 100 days of local public works wage employment.',
    ],
  },
  {
    id: 'ch_evs_09',
    nodeId: NODE_C12_EVS_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the Conventional Economic Paradigm with the Gandhian Development Paradigm on scale and resource throughput:',
    options: [
      'Conventional: Centralised mega-production, linear resource depletion | Gandhian: Gram Swaraj, decentralised cottage production, circular replenishment',
      'Conventional: Zero-growth steady state | Gandhian: Maximisation of quarterly GDP through intensive strip mining',
      'Conventional: Reliance on charkha and bio-mass | Gandhian: Capital-intensive automated mega-factories',
      'Both paradigms consider natural resource depletion as a positive contributor to human welfare',
    ],
    correctIndex: 0,
    explanation: 'The Conventional paradigm relies on centralised mass production, heavy resource extraction, and GDP growth. Gandhian development prioritises Gram Swaraj, decentralised production (KVIC), trusteeship, and living within local ecological limits.',
    hints: [
      'Gandhi advocated production by the masses rather than mass production.',
      'Conventional models measure success via continuous GDP/GNP expansion.',
      'Gandhian models promote village self-reliance and appropriate technology.',
    ],
  },
  {
    id: 'ch_evs_09b',
    nodeId: NODE_C12_EVS_015,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the Khadi and Village Industries Commission (KVIC Honey Mission & Kumhar Sashaktikaran) represent "Appropriate Technology"?',
    options: [
      'It deploys imported nuclear-powered robotic harvesters in village clusters',
      'It uses small-scale, labour-intensive, locally maintainable tools that utilise renewable regional inputs with near-zero carbon footprint',
      'It bans all electricity and metal usage across all Indian states',
      'It replaces all rural farmers with automated algorithmic trading desks',
    ],
    correctIndex: 1,
    explanation: 'Appropriate technology is labour-intensive, small-scale, repairable locally, uses local resources, and minimises ecological damage while providing widespread livelihoods.',
    hints: [
      'Gandhi was not anti-tool; he championed tools that empower workers rather than displacing them.',
      'Think of low-capital, renewable-energy, locally manageable tools.',
      'KVIC initiatives generate rural livelihood without mass environmental destruction.',
    ],
  },
  {
    id: 'ch_evs_10',
    nodeId: NODE_C12_EVS_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What essential engineering features distinguish a Sanitary Landfill from an uncontrolled Open Dump (such as Ghazipur)?',
    options: [
      'Compacted impermeable clay/geomembrane bottom liner, leachate collection & treatment pipelines, daily soil cover, and methane gas venting',
      'Absence of fencing, unlined sandy bed, and continuous open incineration of mixed hazardous waste',
      'A sanitary landfill is located in deep rivers to ensure immediate dilution',
      'There is no functional engineering difference between the two terms',
    ],
    correctIndex: 0,
    explanation: 'A sanitary landfill is an engineered containment facility featuring impermeable basal liners, leachate collection wells to safeguard groundwater, daily soil capping, and gas vents to manage explosive methane.',
    hints: [
      'Leachate must not percolate into the groundwater table.',
      'Methane gas generated by anaerobic decay must be safely captured or vented.',
      'Engineered liners and daily soil covers are critical components.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_evs_11',
    nodeId: NODE_C12_EVS_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A metro city supplies 1200 Million Litres per Day (MLD) of potable water into its municipal piped distribution network. If ageing pipe infrastructure has a distribution loss of 35%, how many MLD of water actually reach household taps?',
    correctAnswer: 780,
    tolerance: 1,
    unit: 'MLD',
    explanation: 'Delivered Water = Total Supplied × (1 - 0.35) = 1200 × 0.65 = 780 MLD. 420 MLD is lost due to pipe leakage and contamination breaches.',
    hints: [
      'Calculate the 35% loss: 1200 × 0.35 = 420 MLD.',
      'Subtract the loss from 1200 MLD.',
      '1200 - 420 = 780 MLD.',
    ],
  },
  {
    id: 'ch_evs_12',
    nodeId: NODE_C12_EVS_017,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each indigenous Indian traditional water harvesting system to its geographical region and operational principle.',
    dragItems: [
      { label: 'Khadin (In-situ moisture embankment for rabi crops)', targetId: 'slot_rajasthan' },
      { label: 'Eri (Interconnected cascade surface tanks)', targetId: 'slot_tamilnadu' },
      { label: 'Ahars-Pynes (Inundation catchment & diversion channels)', targetId: 'slot_bihar' },
      { label: 'Baoli (Stepped architectural well reaching groundwater)', targetId: 'slot_gujarat' },
    ],
    correctMapping: {
      slot_rajasthan: 'Khadin (In-situ moisture embankment for rabi crops)',
      slot_tamilnadu: 'Eri (Interconnected cascade surface tanks)',
      slot_bihar: 'Ahars-Pynes (Inundation catchment & diversion channels)',
      slot_gujarat: 'Baoli (Stepped architectural well reaching groundwater)',
    },
    explanation: 'Khadins conserve runoff in Rajasthan arid soil; Eris are tank networks in Tamil Nadu; Ahars and Pynes harvest floodwaters in Bihar; Baolis are multi-tiered stepwells in Gujarat/Rajasthan.',
    hints: [
      'Eri belongs to south India (Tamil Nadu).',
      'Ahars and pynes are classic floodwater channels of the Gangetic Bihar plains.',
      'Khadins capture seasonal runoff across sloping desert fields in Rajasthan.',
    ],
  },
  {
    id: 'ch_evs_13',
    nodeId: NODE_C12_EVS_017,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why are traditional landraces like Pokkali rice and millets (Ragi, Jowar, Bajra) critical for climate change adaptation compared to standard Green Revolution HYVs?',
    options: [
      'They yield triple the grain volume only when fed with 500 kg/ha chemical synthetic fertilizers',
      'Pokkali possesses natural genetic salinity tolerance for coastal brackish zones, while C4 millets thrive under extreme drought and poor soils with minimal irrigation',
      'Traditional landraces are genetically modified sterile varieties that cannot be saved by farmers',
      'They require continuous standing floodwater and aerial pesticide spraying every 48 hours',
    ],
    correctIndex: 1,
    explanation: 'Pokkali thrives in saline coastal Kerala wetlands; millets (C4 plants) have low water footprints and high drought resistance, providing climate resilience unlike chemical-dependent HYVs.',
    hints: [
      'Consider the environmental stress of coastal flooding and drought.',
      'Pokkali is famous for its salt-tolerance in Kerala backwaters.',
      'Millets need very little water and thrive in semi-arid drylands.',
    ],
  },
  {
    id: 'ch_evs_14',
    nodeId: NODE_C12_EVS_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do traditional physical and chemical preservation techniques like salting, sugaring, and solar drying fundamentally prevent microbial spoilage?',
    options: [
      'They lower water activity (Aw) and exert hypertonic osmotic pressure, dehydrating and inactivating microbial cells',
      'They add toxic heavy metals that permanently poison bacterial DNA',
      'They raise the moisture content to 95% so bacteria drown in free liquid',
      'They convert all food starches into synthetic plastics',
    ],
    correctIndex: 0,
    explanation: 'Salting, sugaring, and drying drastically reduce available water. The hypertonic environment draws water out of microbial cells via osmosis, preventing microbial enzyme activity and cell division.',
    hints: [
      'Bacteria and fungi require free water to carry out metabolic processes.',
      'High salt or sugar concentrations create a hypertonic gradient.',
      'Osmosis pulls moisture out of microbial cells.',
    ],
  },
  {
    id: 'ch_evs_15',
    nodeId: NODE_C12_EVS_018,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Correctly distinguish between the statutory roles and governing acts of FSSAI and AGMARK in India:',
    options: [
      'FSSAI enforces mandatory food safety standards under Food Safety & Standards Act 2006; AGMARK certifies quality grading of agricultural produce under Agricultural Produce Act 1937',
      'FSSAI is an optional marketing sticker for honey; AGMARK is a criminal punishment statute for water pollution',
      'Both marks are identical certificates issued solely by municipal traffic police departments',
      'AGMARK regulates processed industrial soft drinks, while FSSAI only certifies hand-spun khadi cloth',
    ],
    correctIndex: 0,
    explanation: 'FSSAI (Food Safety and Standards Act 2006) enforces food safety and licensing across all food businesses; AGMARK (Agricultural Produce Grading & Marking Act 1937) provides quality grading for agricultural commodities (spices, ghee, honey).',
    hints: [
      'FSSAI = Safety & hygiene regulation across all foods.',
      'AGMARK = Quality grading of farm commodities like ghee and spices.',
      'FSSAI was enacted in 2006; AGMARK in 1937.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_evs_16',
    nodeId: NODE_C12_EVS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A natural resource economist is compiling an asset inventory. Which classification correctly pairs resource renewability with its stock-flow character?',
    options: [
      'Jharia Coal Reserves: Non-Renewable Stock | Muppandal Wind Energy: Renewable Flow | Standing Teak Forest: Renewable Stock',
      'Solar Radiation: Non-Renewable Stock | Mumbai High Crude Oil: Renewable Flow',
      'Deep Aquifer Fossil Groundwater: Renewable Flow | Sunlight: Non-Renewable Stock',
      'All natural resources are non-renewable stocks according to SEEA guidelines',
    ],
    correctIndex: 0,
    explanation: 'Coal is a non-renewable stock (finite, depleted with use); wind is a renewable flow (replenished continuously); a standing forest is a renewable stock (can be measured at a point in time, regenerates).',
    hints: [
      'Stock = measurable quantity at a specific point in time.',
      'Flow = continuous stream available over time that cannot be hoarded.',
      'Renewable vs Non-renewable is based on replenishment over human timescales.',
    ],
  },
  {
    id: 'ch_evs_17',
    nodeId: NODE_C12_EVS_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A mineral-rich state registers a conventional Gross State Domestic Product (GSDP) of ₹85,000 Crore. During the fiscal year, un-reclaimed bauxite extraction causes ₹6,500 Crore in resource depletion, and industrial water pollution causes ��2,500 Crore in health/remediation damage. Under the UN SEEA Green Accounting framework, calculate the Depletion-Adjusted Green GSDP in ₹ Crore.',
    correctAnswer: 76000,
    tolerance: 10,
    unit: '₹ Crore',
    explanation: 'Green GSDP = Conventional GSDP - Natural Resource Depletion - Environmental Degradation Cost = 85,000 - 6,500 - 2,500 = ₹76,000 Crore.',
    hints: [
      'Under SEEA, natural capital consumption is deducted from conventional GDP.',
      'Subtract both bauxite depletion (6,500) and pollution damage (2,500).',
      '85,000 - 9,000 = 76,000.',
    ],
  },
  {
    id: 'ch_evs_18',
    nodeId: NODE_C12_EVS_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An oil tanker collides off the coast of Goa, costing ₹500 Crore in mechanical oil recovery and beach cleaning contracts. Explain how GNP and Net Economic Welfare (NEW) react to this event.',
    options: [
      'GNP paradoxically RISES due to cleanup expenditures, while NEW FALLS because it deducts the catastrophic ecological degradation and recreation loss',
      'Both GNP and NEW increase equally because pollution represents economic vibrancy',
      'GNP falls to zero immediately while NEW remains totally unaffected by marine disasters',
      'Neither index registers any change since marine ecosystems have zero economic relevance',
    ],
    correctIndex: 0,
    explanation: 'GNP counts all monetised commercial activity including oil cleanup spending as positive output. NEW (Samuelson & Nordhaus) deducts environmental destruction, correctly reflecting the net loss in welfare.',
    hints: [
      'GNP counts money spent on cleanup as positive economic production.',
      'NEW adjusts for environmental damage and loss of ecological amenities.',
      'Welfare drops even if gross transactions rise.',
    ],
  },
  {
    id: 'ch_evs_19',
    nodeId: NODE_C12_EVS_021,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the fundamental Social Cost equation that defines market failure when negative environmental externalities are present.',
    availableParts: ['Social Cost', '=', 'Private Cost', '+', 'External Cost (Damage to 3rd Parties)', '-', 'Subsidies'],
    targetState: 'Social Cost = Private Cost + External Cost (Damage to 3rd Parties)',
    validationHint: 'Combine Social Cost with Private Cost and External Cost using +',
    explanation: 'Social Cost = Private Cost + External Cost. When external cost > 0 and unpriced, market price is artificially low, causing over-production and market failure.',
    hints: [
      'Social cost encompasses what the firm pays plus what society suffers.',
      'The formula uses Private Cost and External Cost.',
      'Social Cost = Private Cost + External Cost.',
    ],
  },
  {
    id: 'ch_evs_20',
    nodeId: NODE_C12_EVS_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did the Narmada Bachao Andolan (NBA) challenge the conventional Cost-Benefit Analysis (CBA) of the Sardar Sarovar Project?',
    options: [
      'By demonstrating that private CBA omitted external social costs: submergence of virgin teak forests, displacement of tribal adivasis, and loss of downstream hilsa fisheries',
      'By proving that concrete dams generate negative electricity and destroy electrical grids',
      'By demanding that all agricultural irrigation in Gujarat be permanently abolished',
      'By claiming that hydro-turbines consume 100% of the world’s atmospheric oxygen',
    ],
    correctIndex: 0,
    explanation: 'The NBA highlighted that private financial CBA overstated Net Present Value (NPV) by excluding external social costs: tribal displacement, loss of biodiversity, and downstream ecological destruction.',
    hints: [
      'Private CBA only counts financial construction costs vs power/irrigation revenue.',
      'Social CBA must include non-market costs such as resettlement and habitat submergence.',
      'When external costs are added, the Benefit-Cost Ratio (BCR) may fall below 1.',
    ],
  },
  {
    id: 'ch_evs_21',
    nodeId: NODE_C12_EVS_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze why Amazonian deforestation (driven 60-70% by cattle ranching and soy exports) constitutes a "Trans-national Environmental Problem" and how CITES Appendix I intervenes in wildlife trade:',
    options: [
      'Amazonian carbon sink destruction alters global climate/monsoons across borders; CITES Appendix I strictly prohibits all commercial international trade in endangered species like the tiger',
      'Amazonian deforestation only affects the municipal boundary of Manaus with zero global carbon impact; CITES Appendix I encourages unregulated open trade in tiger skins',
      'Deforestation is caused 100% by local campfires; CITES is a bilateral treaty between India and Bhutan only',
      'Trade in beef lowers global carbon dioxide, making international environmental treaties redundant',
    ],
    correctIndex: 0,
    explanation: 'Amazonia is a trans-national carbon sink and global oxygen contributor; its destruction accelerates worldwide climate disruption. CITES Appendix I bans international commercial trade in endangered species.',
    hints: [
      'Trans-national issues cross national borders and cannot be solved by one country alone.',
      'Cattle ranching produces beef exported globally, destroying global carbon sinks.',
      'CITES Appendix I provides the highest protection, prohibiting commercial international trade.',
    ],
  },
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_EVS_011,
  title: 'Atmospheric & Environmental Quality Monitoring',
  definition: 'Systematic measurement of air, water, soil, and ecological parameters using standardized protocols to derive AQI, evaluate development sustainability, and account for natural capital.',
  eli5: 'Think of Earth as a hospital patient: AQI measures its breathing, BOD tests its blood purity, soil tests check its nutrition, and Green Accounting checks if it is spending its life savings.',
  misconceptions: [
    { misconception: 'Smoke and haze are criteria air pollutants used to compute the AQI.', correction: 'CPCB AQI monitors 8 specific criteria pollutants (PM2.5, PM10, NO2, SO2, CO, O3, NH3, Pb). Smoke and haze are optical effects.' },
    { misconception: 'AQI is calculated as the mathematical average of all pollutant sub-indices.', correction: 'CPCB AQI is strictly the MAXIMUM sub-index among the 8 pollutants, identifying the dominant pollutant.' },
    { misconception: 'BAM and TEOM monitors are gravimetric filter samplers.', correction: 'Gravimetric is manual 24-hr filter weighing. BAM (beta attenuation) and TEOM (microbalance oscillation) are automated real-time monitors.' },
    { misconception: 'High electrical conductivity (EC) in soil indicates rich plant fertility.', correction: 'High EC (>4 dS/m) indicates excessive soluble salt concentration (salinity), which induces osmotic drought in crops.' },
    { misconception: 'FSSAI and AGMARK perform the exact same legal function.', correction: 'FSSAI enforces mandatory food safety standards (2006 Act); AGMARK certifies agricultural produce quality grading (1937 Act).' },
  ],
  diagnosticQuestions: [
    { question: 'Which pollutant sub-index determines the overall AQI in the CPCB methodology?', options: ['The lowest sub-index', 'The mathematical average', 'The maximum sub-index', 'The median sub-index'], correctIndex: 2 },
    { question: 'What does a BOD:COD ratio greater than 0.4 indicate regarding wastewater?', options: ['The waste is toxic and refractory', 'The waste is readily biodegradable', 'The waste contains zero organic matter', 'The water is completely potable'], correctIndex: 1 },
    { question: 'What reagent is used in the Walkley-Black method to measure soil organic carbon?', options: ['Potassium dichromate in concentrated H2SO4', 'Sodium hydroxide in ethanol', 'Hydrochloric acid with methyl orange', 'Ammonium molybdate with ascorbic acid'], correctIndex: 0 },
    { question: 'What is the statutory work guarantee provided under MGNREGA?', options: ['50 days per individual', '100 days per rural household/year', '200 days per urban worker', '365 days of factory employment'], correctIndex: 1 },
    { question: 'Which traditional irrigation structure impounds runoff across desert slopes for rabi farming in Rajasthan?', options: ['Eri', 'Pyne', 'Khadin', 'Baoli'], correctIndex: 2 },
    { question: 'How is Pasteurisation of milk carried out?', options: ['Boiling at 120°C for 2 hours', 'Heating to ~72°C for 15 seconds followed by rapid chilling', 'Freezing at -40°C for 3 days', 'Adding 10% sodium benzoate'], correctIndex: 1 },
    { question: 'What does the UN SEEA framework deduct from conventional GDP to get Green GDP?', options: ['Only currency inflation', 'Natural resource depletion and environmental degradation', 'Foreign tourism spending', 'Export duties'], correctIndex: 1 },
    { question: 'Which CITES Appendix completely prohibits commercial international trade in endangered species?', options: ['Appendix I', 'Appendix II', 'Appendix III', 'Appendix IV'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery across ISC Class 12 EVS: Air, Water, Soil monitoring, Urban planning, Traditional agriculture, Natural Resource Economics, and Trans-national environmental issues.',
};

// 5 Interactive Exploration Steps
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Multi-Pollutant Air Station (CAAQMS)',
    instruction: 'Adjust pollutant emission levels and watch how the dominant pollutant drives the overall CPCB AQI.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_EVS_011,
  },
  {
    title: 'Lab 2: River Dissolved Oxygen & BOD Dynamics',
    instruction: 'Inject untreated organic sewage into the river and observe the Winkler titration oxygen sag curve.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_EVS_012,
  },
  {
    title: 'Lab 3: Soil Chemistry & Nutrient Availability Matrix',
    instruction: 'Slide the soil pH from 4.0 to 9.5 to see when Phosphorus locks up as insoluble iron/calcium complexes.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_EVS_013,
  },
  {
    title: 'Lab 4: Urban-Rural Migration Equilibrium',
    instruction: 'Adjust rural wage rates and MGNREGA lean-season days to observe urban slum pressure stabilization.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_EVS_014,
  },
  {
    title: 'Lab 5: Green GDP vs Conventional Growth Accounting',
    instruction: 'Increase industrial extraction and see why conventional GDP rises while Depletion-Adjusted Green GDP drops.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_EVS_019,
  },
];

// Predict-Then-Check items
const PREDICTION_QUESTIONS = [
  {
    question: 'If PM2.5 concentration doubles from 60 µg/m³ to 120 µg/m³ while SO2 and NO2 remain low, what will happen to the overall CPCB AQI rating?',
    options: [
      'The AQI will stay "Satisfactory" because SO2 and NO2 dilute the average',
      'The AQI will jump into the "Poor / Very Poor" band because AQI follows the maximum sub-index',
      'The AQI will automatically become zero',
      'The AQI will only rise by 1 unit',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the PM2.5 slider above 120 µg/m³ to verify the AQI category color shift!',
  },
  {
    question: 'If raw untreated sewage enters a river, what immediate inverse relationship will emerge between BOD and Dissolved Oxygen (DO)?',
    options: [
      'BOD drops to 0 while DO rises to 15 mg/L',
      'BOD spikes as aerobic bacteria consume oxygen, causing DO to crash below critical 4 mg/L',
      'Both BOD and DO remain perfectly constant',
      'DO doubles because sewage contains oxygen bubbles',
    ],
    correctIndex: 1,
    verifyInstruction: 'Increase Sewage Organic Load on the slider to witness the DO oxygen sag crash!',
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about Phosphorus nutrient availability when Soil pH drops below 5.5?',
    observableOptions: [
      'Phosphorus availability crashes because Fe³⁺ and Al³⁺ ions bind it into insoluble precipitates',
      'Phosphorus increases to 100% availability in extreme acid',
      'Soil pH has zero chemical effect on nutrient uptake',
      'Phosphorus evaporates into the air as phosphine gas',
    ],
    correctIndex: 0,
  },
  {
    question: 'In the Natural Capital model, what occurs when mineral extraction and deforestation accelerate without reforestation?',
    observableOptions: [
      'Conventional GDP rises while Green Capital Depreciation widens the gap with Depletion-Adjusted GDP',
      'Both Conventional and Green GDP reach infinity',
      'Natural Capital increases automatically with deforestation',
      'Pollution is converted into pure financial currency',
    ],
    correctIndex: 0,
  },
];

// Real-World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'CPCB Citizen Scientist Field Audit',
  description: 'Conduct a comprehensive environmental audit of your home district or school campus using the 4 diagnostic pillars explored today.',
  steps: [
    'Open the SAMEER app or CPCB portal to record live PM2.5, PM10, and identify your city\'s dominant pollutant.',
    'Test tap vs pond water clarity and record whether BOD/COD indicators would suggest organic runoff.',
    'Check local soil texture and pH using a field testing kit or vinegar/baking soda effervescence test.',
    'List 3 negative externalities generated by nearby highways or industries and calculate their social vs private costs.',
  ],
};

function C12_EVSMonitoringAtmosphereQualitySim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // Phase flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simulation State Variables
  const [pm25Val, setPm25Val] = useState<number>(45);
  const [so2Val, setSo2Val] = useState<number>(20);
  const [no2Val, setNo2Val] = useState<number>(30);
  const [sewageLoad, setSewageLoad] = useState<number>(15);
  const [soilPh, setSoilPh] = useState<number>(6.8);
  const [ruralWage, setRuralWage] = useState<number>(250);
  const [mgnregaDays, setMgnregaDays] = useState<number>(100);
  const [extractionRate, setExtractionRate] = useState<number>(30);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Diagnostic & Adaptive
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive interaction states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges based on difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Calculated AQI metrics in real-time
  const computedAqiData = useMemo(() => {
    const subPm25 = pm25Val <= 30 ? (pm25Val / 30) * 50 : pm25Val <= 60 ? 50 + ((pm25Val - 30) / 30) * 50 : pm25Val <= 90 ? 100 + ((pm25Val - 60) / 30) * 100 : pm25Val <= 120 ? 200 + ((pm25Val - 90) / 30) * 100 : pm25Val <= 250 ? 300 + ((pm25Val - 120) / 130) * 100 : 400 + ((pm25Val - 250) / 130) * 100;
    const subSo2 = (so2Val / 80) * 100;
    const subNo2 = (no2Val / 80) * 100;

    const maxSub = Math.round(Math.max(subPm25, subSo2, subNo2));
    let dominant = 'PM2.5';
    if (subSo2 >= subPm25 && subSo2 >= subNo2) dominant = 'SO2';
    if (subNo2 >= subPm25 && subNo2 >= subSo2) dominant = 'NO2';

    let cat = 'Good';
    let color = '#10b981';
    if (maxSub > 50 && maxSub <= 100) { cat = 'Satisfactory'; color = '#84cc16'; }
    else if (maxSub > 100 && maxSub <= 200) { cat = 'Moderate'; color = '#eab308'; }
    else if (maxSub > 200 && maxSub <= 300) { cat = 'Poor'; color = '#f97316'; }
    else if (maxSub > 300 && maxSub <= 400) { cat = 'Very Poor'; color = '#ef4444'; }
    else if (maxSub > 400) { cat = 'Severe'; color = '#7f1d1d'; }

    return { maxSub, dominant, cat, color, subPm25: Math.round(subPm25), subSo2: Math.round(subSo2), subNo2: Math.round(subNo2) };
  }, [pm25Val, so2Val, no2Val]);

  // Calculated River DO/BOD dynamics
  const computedRiverData = useMemo(() => {
    const bod = Math.round(sewageLoad * 1.8);
    const doLevel = Math.max(0.5, Number((9.5 - (sewageLoad * 0.42)).toFixed(1)));
    const status = doLevel < 4.0 ? 'Hypoxic / Critical (Fish Mortality)' : doLevel < 6.0 ? 'Stressed Water Quality' : 'Healthy Aerated Aquatic Biome';
    return { bod, doLevel, status };
  }, [sewageLoad]);

  // Calculated Soil availability
  const computedSoilData = useMemo(() => {
    let pAvail = 90;
    if (soilPh < 5.5) pAvail = Math.max(10, Math.round(90 - (5.5 - soilPh) * 45));
    else if (soilPh > 7.8) pAvail = Math.max(15, Math.round(90 - (soilPh - 7.8) * 35));
    const nAvail = soilPh >= 6.0 && soilPh <= 8.0 ? 85 : 45;
    const kAvail = soilPh >= 6.5 ? 90 : 50;
    return { pAvail, nAvail, kAvail };
  }, [soilPh]);

  // Calculated Migration gap
  const computedMigrationData = useMemo(() => {
    const annualRural = (ruralWage * 70) + (ruralWage * mgnregaDays);
    const annualUrban = 750 * 250;
    const gap = annualUrban - annualRural;
    const migrationPressure = Math.max(5, Math.min(100, Math.round((gap / 187500) * 100)));
    return { annualRural, annualUrban, gap, migrationPressure };
  }, [ruralWage, mgnregaDays]);

  // Calculated Green GDP
  const computedGdpData = useMemo(() => {
    const convGdp = 50000 + extractionRate * 800;
    const naturalDepletion = extractionRate * 650;
    const pollutionCost = extractionRate * 250;
    const greenGdp = convGdp - naturalDepletion - pollutionCost;
    return { convGdp, naturalDepletion, pollutionCost, greenGdp };
  }, [extractionRate]);

  // Initial load effect
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty adaptation effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = challenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(nextHint);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  // Handlers
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! CPCB takes the worst pollutant.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the environmental simulation lab. Manipulate the parameters to discover ecological principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free sandbox unlocked. Test extreme ecological scenarios with no pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Commencing official CPCB certification challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in. Test the simulation slider to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise scientific observation!' : 'Review the visualization graph carefully.');
  }, []);

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
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step scientific explanation.');
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Environmental Monitoring and Sustainability Economics.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
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
        speechManager.speak('All hints utilized. Examine the step-by-step breakdown.');
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
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

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Real-time Canvas atmospheric particle flow animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; size: number; speed: number; color: string }[] = [];
    const count = Math.min(100, Math.max(15, Math.round(pm25Val / 2)));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1.5 + 0.5,
        color: pm25Val > 150 ? 'rgba(239, 68, 68, 0.7)' : pm25Val > 80 ? 'rgba(234, 179, 8, 0.6)' : 'rgba(52, 211, 153, 0.6)',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > canvas.width) p.x = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [pm25Val]);

  // Clean timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 12 EVS • CPCB Standards & Natural Capital Accounting</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 font-bold rounded-full border ${
              difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
              difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border-rose-800' :
              'bg-blue-950 text-blue-400 border-blue-800'
            }`}
          >
            Tier: {difficulty.toUpperCase()}
          </motion.span>
          <span className="text-xs px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-full font-mono">
            Mastery: {masteryLevel}
          </span>
        </div>
      </motion.div>

      {/* PHASE 1: DISCOVERY HOOK */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-800/80 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">CPCB Taskforce Directive</span>
            <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 mt-3 font-semibold bg-indigo-950/80 p-3 rounded-xl border border-indigo-700/50">
              📌 Mission Context: {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-amber-300">🔍 Initial Diagnostic Hook:</h3>
            <p className="text-sm text-white font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/60 text-slate-400 border border-slate-700'
                      : 'bg-slate-800 text-slate-200 hover:bg-slate-700/80 border border-slate-700'
                  }`}
                >
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 flex items-center justify-between">
                <p className={`text-xs font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Exactly right! CPCB applies the maximum sub-index rule.' : `❌ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 2: BRILLIANT INTERACTIVE EXPLORATION */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div key={idx} className={`h-1.5 w-6 rounded-full transition-all ${idx === currentSlide ? 'bg-indigo-500' : 'bg-slate-700'}`} />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: AQI CAAQMS SIMULATOR & SVG 1 */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-indigo-950/50 border border-indigo-700 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-indigo-300 uppercase">Step Prediction Challenge:</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Atmospheric particle canvas */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-4">
                    <canvas ref={canvasRef} width={600} height={70} className="w-full h-16 opacity-80" />
                    <div className="absolute top-2 right-4 text-xs font-mono px-3 py-1 bg-slate-900/90 rounded-full border border-slate-700">
                      Real-time Air Particle Density: {pm25Val} µg/m³
                    </div>
                  </div>

                  {/* Interactive Controls & Diagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>PM2.5 (High-Volume / BAM)</span>
                          <span className="text-amber-400 font-mono">{pm25Val} µg/m³ (Sub: {computedAqiData.subPm25})</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={350}
                          value={pm25Val}
                          onChange={(e) => setPm25Val(Number(e.target.value))}
                          aria-label="PM2.5 slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>SO2 (UV Fluorescence)</span>
                          <span className="text-cyan-400 font-mono">{so2Val} µg/m³ (Sub: {computedAqiData.subSo2})</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={200}
                          value={so2Val}
                          onChange={(e) => setSo2Val(Number(e.target.value))}
                          aria-label="SO2 slider"
                          className="w-full accent-cyan-500 cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>NO2 (Chemiluminescence)</span>
                          <span className="text-emerald-400 font-mono">{no2Val} µg/m³ (Sub: {computedAqiData.subNo2})</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={200}
                          value={no2Val}
                          onChange={(e) => setNo2Val(Number(e.target.value))}
                          aria-label="NO2 slider"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* TOPIC SVG 1: CAAQMS Spectrum Gauge Diagram */}
                    <div className="flex flex-col justify-center items-center p-4 bg-slate-950 rounded-xl border border-slate-800 text-center relative">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">CPCB Continuous Air Analyzer Spectrum</span>
                      <svg viewBox="0 0 320 120" className="w-full h-28">
                        {/* 6 Band color spectrum */}
                        <rect x="20" y="25" width="45" height="18" fill="#10b981" rx="3" />
                        <rect x="68" y="25" width="45" height="18" fill="#84cc16" rx="3" />
                        <rect x="116" y="25" width="45" height="18" fill="#eab308" rx="3" />
                        <rect x="164" y="25" width="45" height="18" fill="#f97316" rx="3" />
                        <rect x="212" y="25" width="45" height="18" fill="#ef4444" rx="3" />
                        <rect x="260" y="25" width="45" height="18" fill="#7f1d1d" rx="3" />
                        <text x="42" y="37" fill="#fff" fontSize="7" textAnchor="middle">0-50</text>
                        <text x="90" y="37" fill="#000" fontSize="7" textAnchor="middle">51-100</text>
                        <text x="138" y="37" fill="#000" fontSize="7" textAnchor="middle">101-200</text>
                        <text x="186" y="37" fill="#fff" fontSize="7" textAnchor="middle">201-300</text>
                        <text x="234" y="37" fill="#fff" fontSize="7" textAnchor="middle">301-400</text>
                        <text x="282" y="37" fill="#fff" fontSize="7" textAnchor="middle">401-500</text>
                        {/* Dynamic Marker Arrow */}
                        <motion.polygon
                          points="0,-6 6,6 -6,6"
                          fill="#ffffff"
                          animate={{
                            transform: `translate(${Math.min(290, Math.max(25, 20 + (computedAqiData.maxSub / 500) * 275))}px, 55px)`,
                          }}
                          transition={{ type: 'spring', damping: 15 }}
                        />
                        <text x="160" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle" fontWeight="bold">
                          Dominant: {computedAqiData.dominant} (AQI: {computedAqiData.maxSub} - {computedAqiData.cat})
                        </text>
                        <text x="160" y="98" fill="#94a3b8" fontSize="8" textAnchor="middle">
                          Principle: MAX(Sub_PM2.5, Sub_SO2, Sub_NO2)
                        </text>
                      </svg>
                      <div className="text-sm font-bold px-4 py-1 mt-1 rounded-full uppercase" style={{ backgroundColor: `${computedAqiData.color}20`, color: computedAqiData.color, border: `1px solid ${computedAqiData.color}` }}>
                        {computedAqiData.cat} (AQI {computedAqiData.maxSub})
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: RIVER WATER TESTING (DO & BOD) & SVG 2 */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-indigo-950/50 border border-indigo-700 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-indigo-300 uppercase">Water Quality Prediction:</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Untreated Urban Sewage Inflow</span>
                          <span className="text-amber-400 font-mono">{sewageLoad} MLD</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={22}
                          value={sewageLoad}
                          onChange={(e) => setSewageLoad(Number(e.target.value))}
                          aria-label="Sewage inflow slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Dissolved Oxygen (Winkler DO):</span>
                          <span className={`font-mono font-bold ${computedRiverData.doLevel < 4 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {computedRiverData.doLevel} mg/L
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">5-Day Biochemical Oxygen Demand (BOD):</span>
                          <span className={`font-mono font-bold ${computedRiverData.bod > 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {computedRiverData.bod} mg/L
                          </span>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-lg text-slate-300 font-medium">
                          Eco-Status: <span className="font-bold text-white">{computedRiverData.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* TOPIC SVG 2: Streeter-Phelps Dissolved Oxygen Sag Curve */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <span className="text-xs font-bold text-slate-400 mb-2">Streeter-Phelps Dissolved Oxygen Sag Curve</span>
                      <svg viewBox="0 0 320 180" className="w-full h-40">
                        <line x1="30" y1="20" x2="30" y2="150" stroke="#475569" strokeWidth="1" />
                        <line x1="30" y1="150" x2="300" y2="150" stroke="#475569" strokeWidth="1" />
                        <line x1="30" y1="90" x2="300" y2="90" stroke="#ef4444" strokeDasharray="4,4" strokeWidth="1" />
                        <text x="35" y="85" fill="#ef4444" fontSize="8">Critical Fish Survival Limit (4 mg/L)</text>
                        {/* BOD curve (orange dashed) */}
                        <motion.path
                          d={`M 30 ${140 - sewageLoad * 4.5} Q 100 ${140 - sewageLoad * 3} 300 135`}
                          fill="none"
                          stroke="#f59e0b"
                          strokeDasharray="3,3"
                          strokeWidth="2"
                        />
                        <text x="230" y="130" fill="#f59e0b" fontSize="8">BOD Load</text>
                        {/* DO Sag Curve */}
                        <motion.path
                          d={`M 30 30 Q 120 ${30 + sewageLoad * 5.2} 300 40`}
                          fill="none"
                          stroke={computedRiverData.doLevel < 4 ? '#ef4444' : '#10b981'}
                          strokeWidth="3"
                          animate={{ d: `M 30 30 Q 120 ${30 + sewageLoad * 5.2} 300 40` }}
                          transition={{ duration: 0.3 }}
                        />
                        <text x="10" y="35" fill="#94a3b8" fontSize="8">DO</text>
                        <text x="160" y="170" fill="#94a3b8" fontSize="8">Distance Downstream →</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: SOIL TESTING & PH MATRIX & SVG 3 */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Soil pH (Electrometric Glass Electrode)</span>
                          <span className="text-indigo-400 font-mono font-bold">{soilPh} ({soilPh < 6.5 ? 'Acidic' : soilPh > 7.5 ? 'Alkaline' : 'Neutral'})</span>
                        </div>
                        <input
                          type="range"
                          min={4.0}
                          max={9.5}
                          step={0.1}
                          value={soilPh}
                          onChange={(e) => setSoilPh(Number(e.target.value))}
                          aria-label="Soil pH slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      {/* TOPIC SVG 3: Soil Nutrient Availability vs pH Curve */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">Phosphorus Solubility Curve (Olsen / Bray Fixation)</span>
                        <svg viewBox="0 0 280 100" className="w-full h-24">
                          <rect x="0" y="0" width="280" height="100" fill="#0f172a" rx="6" />
                          <line x1="25" y1="80" x2="265" y2="80" stroke="#334155" strokeWidth="1" />
                          <line x1="25" y1="15" x2="25" y2="80" stroke="#334155" strokeWidth="1" />
                          <text x="25" y="92" fill="#94a3b8" fontSize="7">pH 4.0</text>
                          <text x="140" y="92" fill="#10b981" fontSize="7" textAnchor="middle">pH 6.5-7.0 (Optimum)</text>
                          <text x="260" y="92" fill="#94a3b8" fontSize="7" textAnchor="end">pH 9.5</text>
                          {/* Insoluble precipitate zones */}
                          <text x="35" y="35" fill="#f87171" fontSize="6">Fe/Al Precipitate</text>
                          <text x="200" y="35" fill="#38bdf8" fontSize="6">Ca-Phosphate Lockup</text>
                          {/* Phosphorus Bell Curve */}
                          <path d="M 25 75 Q 70 70 110 40 Q 140 20 170 40 Q 210 70 265 75" fill="none" stroke="#eab308" strokeWidth="2.5" />
                          {/* Cursor indicator */}
                          <motion.circle
                            cx={25 + ((soilPh - 4.0) / 5.5) * 240}
                            cy={80 - (computedSoilData.pAvail / 100) * 60}
                            r="5"
                            fill="#6366f1"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl text-xs text-indigo-200">
                        {soilPh < 6.0 && '⚠️ Acid Lockup: Soluble iron (Fe³⁺) and aluminium (Al³⁺) fix phosphate ions into insoluble precipitates. Solution: Apply agricultural lime (CaCO3).'}
                        {soilPh >= 6.0 && soilPh <= 7.5 && '✓ Optimum Zone: Macronutrients N, P, K maintain maximum solubility for root absorption.'}
                        {soilPh > 7.5 && '⚠️ Alkaline/Sodic Fixation: Phosphorus locks into calcium phosphate complexes. High EC/ESP requires Gypsum (CaSO4) + leaching.'}
                      </div>
                    </div>

                    {/* Observation query */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-amber-400 uppercase">Scientific Observation Check:</span>
                        <p className="text-sm text-white font-medium mt-1">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-2 mt-3">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border ${
                                observationAnswered
                                  ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                    ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                                    : 'bg-slate-900 text-slate-500 border-slate-800'
                                  : 'bg-slate-900 text-slate-200 hover:bg-slate-800 border-slate-700'
                              }`}
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      {observationAnswered && (
                        <p className="text-xs text-emerald-400 mt-2 font-semibold">✓ Correct! Acid soils fix P with iron/aluminium; lime restores availability.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: URBAN-RURAL DIVIDE SIMULATOR & SVG 4 */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Rural Daily Agricultural Wage</span>
                          <span className="text-emerald-400 font-mono">₹{ruralWage}/day (70 Days Farm Work)</span>
                        </div>
                        <input
                          type="range"
                          min={150}
                          max={500}
                          value={ruralWage}
                          onChange={(e) => setRuralWage(Number(e.target.value))}
                          aria-label="Rural wage slider"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>MGNREGA Guaranteed Work Days (Lean Season)</span>
                          <span className="text-indigo-400 font-mono">{mgnregaDays} Days Guaranteed</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={150}
                          value={mgnregaDays}
                          onChange={(e) => setMgnregaDays(Number(e.target.value))}
                          aria-label="MGNREGA days slider"
                          className="w-full accent-indigo-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl text-xs space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Annual Rural Income:</span>
                          <span className="font-mono font-bold text-emerald-400">₹{computedMigrationData.annualRural.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Annual Urban Construction Wage:</span>
                          <span className="font-mono font-bold text-amber-400">₹{computedMigrationData.annualUrban.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-1 border-t border-slate-800">
                          <span className="text-slate-300">Income Disparity Gap:</span>
                          <span className="font-mono text-rose-400">₹{computedMigrationData.gap.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* TOPIC SVG 4: Rural-Urban Push-Pull Dynamic Vector Diagram */}
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Push-Pull Vector Equilibrium</span>
                      <svg viewBox="0 0 280 110" className="w-full h-28">
                        <rect x="10" y="20" width="85" height="70" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1.5" />
                        <text x="52" y="42" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">Rural Origin</text>
                        <text x="52" y="60" fill="#6ee7b7" fontSize="7" textAnchor="middle">MGNREGA Base</text>
                        <text x="52" y="74" fill="#6ee7b7" fontSize="7" textAnchor="middle">₹{computedMigrationData.annualRural / 1000}k/yr</text>

                        <rect x="185" y="20" width="85" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                        <text x="227" y="42" fill="#c7d2fe" fontSize="9" fontWeight="bold" textAnchor="middle">Urban Metro</text>
                        <text x="227" y="60" fill="#a5b4fc" fontSize="7" textAnchor="middle">Pull: High Wage</text>
                        <text x="227" y="74" fill="#a5b4fc" fontSize="7" textAnchor="middle">₹187.5k/yr</text>

                        {/* Migration Flow Arrow */}
                        <line x1="98" y1="55" x2="180" y2="55" stroke={computedMigrationData.migrationPressure > 50 ? '#ef4444' : '#10b981'} strokeWidth={Math.max(2, (computedMigrationData.migrationPressure / 100) * 8)} />
                        <polygon points="180,50 185,55 180,60" fill={computedMigrationData.migrationPressure > 50 ? '#ef4444' : '#10b981'} />
                        <text x="139" y="45" fill="#f87171" fontSize="8" textAnchor="middle" fontWeight="bold">Push: {computedMigrationData.migrationPressure}%</text>
                      </svg>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        MGNREGA acts as a <span className="text-indigo-300 font-bold">Push Reducer</span> to curb survival distress migration.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: NATURAL RESOURCE ECONOMICS & SEEA */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Mineral / Timber Extraction Velocity</span>
                          <span className="text-rose-400 font-mono">{extractionRate} Million Tonnes/yr</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={70}
                          value={extractionRate}
                          onChange={(e) => setExtractionRate(Number(e.target.value))}
                          aria-label="Extraction rate slider"
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Conventional GDP (Counts Extraction as Income):</span>
                          <span className="font-mono font-bold text-blue-400">₹{computedGdpData.convGdp.toLocaleString('en-IN')} Cr</span>
                        </div>
                        <div className="flex justify-between text-rose-400">
                          <span>- Natural Capital Stock Depletion:</span>
                          <span className="font-mono font-bold">- ₹{computedGdpData.naturalDepletion.toLocaleString('en-IN')} Cr</span>
                        </div>
                        <div className="flex justify-between text-rose-400">
                          <span>- Pollution & Remediation Damage:</span>
                          <span className="font-mono font-bold">- ₹{computedGdpData.pollutionCost.toLocaleString('en-IN')} Cr</span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t border-slate-800 text-emerald-400">
                          <span>UN SEEA Green Adjusted GDP:</span>
                          <span className="font-mono">₹{computedGdpData.greenGdp.toLocaleString('en-IN')} Cr</span>
                        </div>
                      </div>
                    </div>

                    {/* Chart Comparison */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center">
                      <span className="text-xs font-bold text-slate-400 mb-2">Conventional vs Depletion-Adjusted SEEA Green GDP</span>
                      <div className="h-44 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: 'Conventional GDP', value: computedGdpData.convGdp, fill: '#3b82f6' },
                            { name: 'SEEA Green GDP', value: computedGdpData.greenGdp, fill: '#10b981' },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                            <YAxis stroke="#94a3b8" fontSize={10} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-500 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* PHASE 3: FREE SANDBOX PLAY */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
            <h3 className="text-lg font-bold text-emerald-400">🧪 Free Multi-System Sandbox</h3>
            <p className="text-xs text-slate-300 mt-1">Explore interlinked atmospheric, hydrological, edaphic, and natural capital parameters simultaneously without time limits or grading.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-4">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">Atmosphere & River Dynamics</span>
              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>PM2.5 Ambient Level:</span>
                  <span className="font-mono text-amber-400">{pm25Val} µg/m³</span>
                </label>
                <input type="range" min={10} max={300} value={pm25Val} onChange={(e) => setPm25Val(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
              </div>
              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Sewage Organic Load:</span>
                  <span className="font-mono text-cyan-400">{sewageLoad} MLD</span>
                </label>
                <input type="range" min={0} max={22} value={sewageLoad} onChange={(e) => setSewageLoad(Number(e.target.value))} className="w-full accent-cyan-500 cursor-pointer" />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div>Computed AQI: <span className="font-bold" style={{ color: computedAqiData.color }}>{computedAqiData.maxSub} ({computedAqiData.cat})</span></div>
                <div>River DO Level: <span className="font-bold text-emerald-400">{computedRiverData.doLevel} mg/L</span></div>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Soil Chemistry & Green Accounting</span>
              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Soil pH Level:</span>
                  <span className="font-mono text-indigo-400">{soilPh}</span>
                </label>
                <input type="range" min={4.0} max={9.5} step={0.1} value={soilPh} onChange={(e) => setSoilPh(Number(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
              </div>
              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Resource Depletion Rate:</span>
                  <span className="font-mono text-rose-400">{extractionRate} MT/yr</span>
                </label>
                <input type="range" min={5} max={70} value={extractionRate} onChange={(e) => setExtractionRate(Number(e.target.value))} className="w-full accent-rose-500 cursor-pointer" />
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                <div>Phosphorus Availability: <span className="font-bold text-amber-400">{computedSoilData.pAvail}%</span></div>
                <div>Depletion-Adjusted Green GDP: <span className="font-bold text-emerald-400">₹{computedGdpData.greenGdp.toLocaleString('en-IN')} Cr</span></div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-xl"
            >
              I Am Ready for Board Certification Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* PHASE 4: CHALLENGES */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Progress & Metrics */}
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 font-mono font-semibold">
                NEP Competency: <span className="uppercase text-white">{challenge.competencyLevel}</span>
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-emerald-500 to-cyan-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-full border border-indigo-800">
              Target Node: {challenge.nodeId}
            </span>
            <h2 className="text-base md:text-lg font-bold text-white mt-3 leading-snug">{challenge.question}</h2>

            {/* MCQ Options with Shake Animation on Wrong Answer */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 mt-5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag the analytical method to its corresponding target slot:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-semibold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(slotId => (
                    <div
                      key={slotId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(slotId)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {slotId.replace('slot_', '').toUpperCase()} Target Analyzer
                      </span>
                      <div className="text-xs font-semibold text-emerald-400 mt-2">
                        {droppedLabels[slotId] ? `✓ ${droppedLabels[slotId]}` : 'Drop correct analytical principle here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Matched Analyzers
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-3">
                <span className="text-xs text-slate-400">Drag to reorder stages sequentially:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
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
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Procedural Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric input"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono w-60"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-4">
                <span className="text-xs text-slate-400">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-indigo-300 rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-950 border border-indigo-700 text-xs font-mono text-indigo-200 rounded-lg flex items-center gap-2">
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-400 font-bold">×</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click blocks above to assemble formula</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Validate Assembled Equation
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/80 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wide">Board Examiner Pedagogical Breakdown:</span>
                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((step, idx) => (
                    <motion.p key={idx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-amber-100/90 leading-relaxed">
                      <span className="font-bold text-amber-400">{idx + 1}.</span> {step}{!step.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-amber-100 rounded-xl text-xs font-bold"
                    >
                      Show Next Explanatory Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Certification →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* PHASE 5: COMPLETION & SYNTHESIS */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-700 rounded-2xl text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">CPCB Environmental Science Certification Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully completed the diagnostic and certification curriculum spanning Atmosphere, Water, Soil, Urban-Rural Planning, and Natural Capital Accounting.
            </p>
            <div className="inline-flex gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm">
              <div>Final Score: <span className="font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span></div>
              <div>Mastery Level: <span className="font-bold text-indigo-400 uppercase">{masteryLevel}</span></div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-xl text-xs text-indigo-200">
            {errors === 0 && '🌟 PERFECT SCORE: Full mastery demonstrated across all criteria indicators!'}
            {errors > 0 && errors <= 3 && '👏 EXCELLENT PERFORMANCE: Strong grasp of analytical indicators and economic accounting.'}
            {errors > 3 && '💡 SOLID EFFORT: Review the specific misconception corrections below to reinforce critical concepts.'}
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Review:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ CPCB Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reflection Prompts */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-indigo-300">Reflective Sustainability Inquiry:</h3>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>How does the maximum sub-index rule prevent dangerous single-pollutant spikes from being hidden?</li>
              <li>Why is Green GDP an essential corrective measure for mining-heavy and resource-extracting economies?</li>
              <li>In what ways do traditional irrigation structures (Khadins, Eris) outperform borewell-based deep pumping?</li>
            </ul>
          </div>

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl text-xs text-amber-200 flex justify-between items-center">
            <span>📅 Spaced Review (SM-2 Interval): Next diagnostic check scheduled in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-xl text-xs text-slate-400 border border-slate-800">
                  <span className="font-bold text-indigo-400">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="CPCB Standards Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_EVSMonitoringAtmosphereQualitySim;