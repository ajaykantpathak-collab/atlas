'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ─────────────────────────────────
const NODE_C9_EVS_031 = 'c9_evs_031';
const NODE_C9_EVS_032 = 'c9_evs_032';
const NODE_C9_EVS_033 = 'c9_evs_033';
const NODE_C9_EVS_034 = 'c9_evs_034';
const NODE_C9_EVS_035 = 'c9_evs_035';

const ALL_NODE_IDS = [
  NODE_C9_EVS_031,
  NODE_C9_EVS_032,
  NODE_C9_EVS_033,
  NODE_C9_EVS_034,
  NODE_C9_EVS_035,
];

// ─── NARRATIVE SCENARIO ────────────────────────────────────────────────
const SCENARIO = {
  title: 'Crisis on the Shola & River Basin: The Western Ghats Ecological Mission',
  intro: 'You are appointed Chief Environmental Officer for the Kaveri River & Nilgiri Biosphere catchment. Invasive species like Lantana camara are smothering native shola forests, agricultural runoff is poisoning freshwater reservoirs, industrial emissions are accelerating warming, and downstream cities face acute water shortages. Your mandate is to diagnose the collapse, halt biodiversity loss, and lead the socio-ecological transition using SDGs and community handprints.',
  context: 'Balance 5 key ecological indicators: Habitat Integrity, Carbon Sequestration, Water Purity, Native Species Abundance, and Community Handprint Index. Every parameter you tweak directly affects the biosphere.',
};

// ─── DISCOVERY QUESTION HOOK ───────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'In a pristine Nilgiri valley, a specialized fig tree species (Ficus) is cut down for a highway. Within two seasons, an endemic fig wasp disappears, followed by a 40% crash in fruit-eating hornbills and bats. What primary ecological breakdown caused the wasp to vanish?',
  options: [
    'Direct chemical poisoning from highway asphalt',
    'Co-extinction: The obligate mutualist wasp lost its only reproductive host',
    'Invasive competition from exotic honeybees',
    'General thermal shock from highway traffic',
  ],
  correctIndex: 1,
  hintAfter: 'Notice how species do not live in isolation! In specialized mutualism, destroying the host inevitably drags the dependent partner down with it — this is co-extinction.',
};

// ─── CHALLENGE INTERFACE ────────────────────────���──────────────────────
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

// ─── CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───────────────────────
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_evs_001_recall',
    nodeId: NODE_C9_EVS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does the current global rate of species extinction compare to the natural background extinction rate?',
    options: [
      '1 to 2 times higher',
      '5 to 10 times higher',
      '100 to 1,000 times higher',
      'Exactly the same as natural background rates',
    ],
    correctIndex: 2,
    explanation: 'Scientists estimate the current anthropogenic extinction rate is 100 to 1,000 times higher than natural background levels, meaning dozens of species vanish every year rather than one per century.',
    hints: [
      'Think about the scale of human industrial expansion and forest loss.',
      'It is not a small percentage increase; it is multiple orders of magnitude.',
      'The current extinction crisis is between 100x and 1000x faster than background rates.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_evs_002_under',
    nodeId: NODE_C9_EVS_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following describes an INVASIVE species rather than just any non-native species?',
    options: [
      'Wheat planted in a cultivated, fenced agricultural field',
      'Lantana camara spreading uncontrollably and choking out native forest undergrowth',
      'Rose bushes cultivated in home gardens under human care',
      'Apple trees grown in an orchard in Himachal Pradesh',
    ],
    correctIndex: 1,
    explanation: 'An invasive species is not just exotic/non-native; it spreads aggressively without human assistance, outcompetes indigenous species, modifies habitats, and disrupts ecological balance.',
    hints: [
      'Focus on aggressive ecological displacement and harm to native biodiversity.',
      'Crops like wheat are non-native but do not overrun natural ecosystems.',
      'Lantana camara is the classic Indian example of an aggressive invasive weed.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_evs_003_recall',
    nodeId: NODE_C9_EVS_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to IPCC reports, how much has the Earth\'s average global surface temperature already risen above pre-industrial levels?',
    options: [
      'Approximately 0.2°C',
      'Approximately 1.1°C',
      'Approximately 3.5°C',
      'Approximately 5.0°C',
    ],
    correctIndex: 1,
    explanation: 'The IPCC confirms that human activities have already warmed the planet by approximately 1.1°C above pre-industrial baselines, prompting the Paris Agreement threshold of 1.5°C.',
    hints: [
      'The Paris Agreement aims to halt warming before it passes 1.5°C.',
      'We are currently just below that threshold.',
      'The observed warming is roughly 1.1°C.',
    ],
  },
  {
    id: 'ch_evs_004_under',
    nodeId: NODE_C9_EVS_033,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which is a POINT SOURCE of pollution as opposed to a non-point source?',
    options: [
      'Agricultural pesticide runoff washing off 500 distributed farmland acres',
      'A factory discharge pipe pouring chemical effluent directly into the Yamuna River',
      'Exhaust emissions dispersed across a 50 km highway network',
      'Microplastic dust blowing from roads across an entire metropolitan area',
    ],
    correctIndex: 1,
    explanation: 'A point source is a single, identifiable, localized outlet such as an industrial discharge pipe or smokestack chimney. Diffuse runoff from wide agricultural tracts is non-point source pollution.',
    hints: [
      'Look for a single, distinct pipe or opening that can be physically pinpointed.',
      'Diffuse runoff from many farms cannot be traced to one single point.',
      'The industrial discharge pipe is the textbook point source.',
    ],
  },
  {
    id: 'ch_evs_005_recall',
    nodeId: NODE_C9_EVS_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the three interdependent pillars of sustainability defined in the Brundtland Report ("Our Common Future", 1987)?',
    options: [
      'Military, Political, and Geographic',
      'Environmental, Social, and Economic (Planet, People, Profit)',
      'Urban, Rural, and Industrial',
      'Technological, Digital, and Financial',
    ],
    correctIndex: 1,
    explanation: 'The Brundtland framework rests on the triple bottom line: Environmental protection, Social equity, and Economic viability (Planet, People, Profit).',
    hints: [
      'Think of the "Triple Bottom Line": People, Planet, and ...',
      'Sustainability balances ecology, human well-being, and livelihoods.',
      'Environmental, Social, and Economic are the three pillars.',
    ],
  },
  {
    id: 'ch_evs_006_under',
    nodeId: NODE_C9_EVS_035,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the fundamental difference between an ecological FOOTPRINT and an ecological HANDPRINT?',
    options: [
      'Footprint measures land animals; Handprint measures human handcrafts',
      'Footprint measures negative resource damage; Handprint measures positive restorative action',
      'Footprint is measured in rupees; Handprint is measured in kilowatt-hours',
      'Footprint applies only to industries; Handprint applies only to governments',
    ],
    correctIndex: 1,
    explanation: 'An ecological footprint calculates the negative pressure and resource damage humans exert on nature, whereas an ecological handprint measures positive, deliberate actions that conserve, restore, or regenerate natural capital.',
    hints: [
      'One measures taking from nature; the other measures giving back or saving.',
      'Footprint = damage/pressure; Handprint = positive conservation.',
      'Footprint is negative impact, Handprint is positive contribution.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_evs_007_drag_label',
    nodeId: NODE_C9_EVS_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each key ecological threat label to its correct zone on the Western Ghats landscape diagram.',
    dragItems: [
      { label: 'Habitat Fragmentation', targetId: 'zone_highway' },
      { label: 'Invasive Lantana Understory', targetId: 'zone_forest_floor' },
      { label: 'Eutrophication Algal Bloom', targetId: 'zone_lake' },
      { label: 'Point-Source Industrial Effluent', targetId: 'zone_factory' },
    ],
    correctMapping: {
      zone_highway: 'Habitat Fragmentation',
      zone_forest_floor: 'Invasive Lantana Understory',
      zone_lake: 'Eutrophication Algal Bloom',
      zone_factory: 'Point-Source Industrial Effluent',
    },
    explanation: 'Highways slice continuous forests (fragmentation); Lantana invades forest understory; agricultural fertilizers trigger algal blooms in lakes; factory pipes deliver point-source effluents.',
    hints: [
      'Where does a road slice a continuous wildlife corridor?',
      'Lantana chokes the native floor beneath the canopy.',
      'Excess fertilizer washes into the water body causing green scum (eutrophication).',
    ],
  },
  {
    id: 'ch_evs_008_app',
    nodeId: NODE_C9_EVS_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bandipur Tiger Reserve reports that 40% of its moist deciduous undergrowth has been replaced by Lantana camara. As forest warden, what cascading consequence must you prepare for?',
    options: [
      'Herbivore forage collapses as unpalatable Lantana suppresses native grasses, driving deer and gaur to starve or raid farms',
      'Tigers directly feed on Lantana berries and increase their population by 200%',
      'Soil nitrogen surges dramatically, transforming the sanctuary into a wetland',
      'River water temperatures drop below freezing due to shade',
    ],
    correctIndex: 0,
    explanation: 'Lantana camara is toxic and unpalatable to native herbivores (spotted deer, sambar, gaur). By suppressing native grasses and saplings via allelopathy and light blocking, herbivore populations decline, reducing prey for apex predators like tigers and leopards.',
    hints: [
      'Think about the primary food source of herbivores like deer and gaur.',
      'Lantana produces toxic triterpenoids and suppresses edible understory plants.',
      'When herbivore food disappears, prey density drops, escalating human-wildlife conflict.',
    ],
  },
  {
    id: 'ch_evs_009_ana',
    nodeId: NODE_C9_EVS_032,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When atmospheric CO2 dissolves into Arabian Sea waters off the Lakshadweep archipelago, what chemical cascade triggers coral reef bleaching and death?',
    options: [
      'CO2 reacts with H2O to form carbonic acid (H2CO3), lowering pH and reducing carbonate ions (CO3²⁻) needed for calcium carbonate skeletons',
      'CO2 reacts with salt (NaCl) to create chlorine gas which burns coral polyps',
      'CO2 forms liquid methane that suffocates ocean fish',
      'Seawater freezes into heavy dry ice that crushes the sea floor',
    ],
    correctIndex: 0,
    explanation: 'Dissolved CO2 forms carbonic acid (CO2 + H2O → H2CO3 ⇌ H+ + HCO3��). The excess hydrogen ions bind to carbonate ions (forming bicarbonate), starving corals and shell-builders of the carbonate ions needed to build CaCO3 reefs.',
    hints: [
      'Dissolving CO2 in water creates an acid.',
      'Acidification consumes free carbonate ions necessary for calcification.',
      'Corals cannot build or maintain their calcium carbonate (CaCO3) skeletons in acidic waters.',
    ],
  },
  {
    id: 'ch_evs_010_num',
    nodeId: NODE_C9_EVS_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ICSE school replaces 200 old 60 W incandescent light bulbs with 9 W energy-efficient LED bulbs. If the lights operate 6 hours per day for 250 school days a year, calculate the annual electricity energy saved in kilowatt-hours (kWh).',
    correctAnswer: 15300,
    tolerance: 100,
    unit: 'kWh',
    explanation: 'Power saved per bulb = 60 W - 9 W = 51 W. For 200 bulbs = 10,200 W = 10.2 kW. Total hours = 6 hours/day × 250 days = 1,500 hours. Total energy saved = 10.2 kW × 1,500 hours = 15,300 kWh.',
    hints: [
      'Find power saved per bulb: (60 - 9) = 51 Watts.',
      'Multiply by 200 bulbs: 10,200 Watts = 10.2 kW.',
      'Multiply by total operating hours: 10.2 kW × (6 × 250) hours = 15,300 kWh.',
    ],
  },
  {
    id: 'ch_evs_011_drag_sort',
    nodeId: NODE_C9_EVS_033,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential stages of agricultural runoff leading to an aquatic dead zone in the exact chronological order.',
    sortItems: [
      'Excess nitrogen and phosphorus fertilizers wash into water body via non-point runoff',
      'Rapid proliferation of surface algal blooms blocks sunlight from reaching benthic plants',
      'Algae die and massive bacterial decomposition consumes dissolved oxygen',
      'Severe hypoxia (<2 mg/L O2) causes catastrophic fish kills and aquatic dead zones',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Runoff adds nutrients → Algal bloom erupts → Algal die-off triggers aerobic bacterial decomposition → Dissolved oxygen is depleted → Hypoxic dead zone wipes out fish life.',
    hints: [
      'Start with fertilizer entering the stream.',
      'Next, nutrients trigger rapid algal reproduction.',
      'Then, dead algae rot as aerobic bacteria consume the oxygen.',
      'Finally, oxygen depletion suffocates aquatic animals.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_evs_012_app',
    nodeId: NODE_C9_EVS_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A smartphone manufacturer in Bengaluru institutes a mandatory buyback policy where old circuit boards are disassembled to recover gold, cobalt, and lithium for new phones. Which statutory mechanism and economic model is this?',
    options: [
      'Linear Take-Make-Dispose Economy with municipal tax write-offs',
      'Extended Producer Responsibility (EPR) within a Circular Economy loop',
      'Open-loop incineration with fly ash dispersion',
      'Brundtland social welfare subsidy',
    ],
    correctIndex: 1,
    explanation: 'Extended Producer Responsibility (EPR) makes manufacturers legally accountable for the post-consumer end-of-life collection and material recovery, closing the material loop into a circular economy.',
    hints: [
      'The manufacturer takes responsibility for collecting back their own sold hardware.',
      'Recovering materials to make new products closes the cycle (5Rs).',
      'This is EPR operating inside a Circular Economy.',
    ],
  },
  {
    id: 'ch_evs_013_ana',
    nodeId: NODE_C9_EVS_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the historical Minamata Bay tragedy, methylmercury concentration in coastal water was 0.0001 ppm, but apex predators (coastal humans and predatory fish) had tissue concentrations over 50 ppm. Which ecological phenomenon explains this 500,000-fold increase?',
    options: [
      'Bioaccumulation within a single organism without food transfer',
      'Biomagnification across successive trophic levels in the food web',
      'Thermal evaporation of water concentrating salts',
      'Eutrophication leading to microplastic synthesis',
    ],
    correctIndex: 1,
    explanation: 'Biomagnification is the progressive increase in chemical toxin concentration at each higher trophic level because top predators consume hundreds of lower-level prey organisms that cannot excrete the fat-soluble heavy metal.',
    hints: [
      'Notice that the concentration multiplies as we move UP the food chain.',
      'Bioaccumulation happens in ONE creature; biomagnification multiplies across trophic levels.',
      'The Minamata case is the defining example of biomagnification.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_evs_014_construct',
    nodeId: NODE_C9_EVS_034,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the comprehensive definition equation of Sustainable Development according to Brundtland 1987.',
    availableParts: [
      'Present Needs',
      'Future Generation Needs',
      'Meeting',
      'Without Compromising',
      'Triple Bottom Line',
    ],
    targetState: 'Meeting Present Needs Without Compromising Future Generation Needs',
    validationHint: 'Assemble: Meeting + Present Needs + Without Compromising + Future Generation Needs',
    explanation: 'Sustainable development is formally defined as "Meeting the needs of the present without compromising the ability of future generations to meet their own needs."',
    hints: [
      'Start with "Meeting".',
      'Add the current generation: "Present Needs".',
      'Add the constraint: "Without Compromising".',
      'Complete with "Future Generation Needs".',
    ],
  },
  {
    id: 'ch_evs_015_eval',
    nodeId: NODE_C9_EVS_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why specialist mutualists (e.g., Ficus tree species and their host-specific agaonid fig wasps) exhibit far higher extinction vulnerability than generalist pollinators like honeybees.',
    options: [
      'Specialist mutualists operate on strict 1-to-1 obligate interdependence; loss of the host breaks the reproductive life cycle with zero alternate hosts',
      'Specialist wasps have larger body sizes and require more water than bees',
      'Generalist honeybees are immune to all forms of habitat loss and pesticides',
      'Fig trees produce toxic pollen that accelerates wasp mortality during dry spells',
    ],
    correctIndex: 0,
    explanation: 'Specialist mutualism represents an evolutionary lock-and-key: the fig wasp can only lay eggs in its specific syconium, and the fig tree can only be pollinated by that specific wasp. Destruction of either partner causes inevitable co-extinction.',
    hints: [
      'Think of an evolutionary lock and key.',
      'If the key only opens one lock, destroying that lock renders the key completely non-functional.',
      'Obligate 1-to-1 relationships offer zero dietary or reproductive redundancy.',
    ],
  },
  {
    id: 'ch_evs_016_ana',
    nodeId: NODE_C9_EVS_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A farmer in the Gangetic plain converts from dryland pulses to continuously flooded rice paddy cultivation with heavy synthetic ammonium-nitrate fertilizer. Which dual greenhouse gas surge is generated?',
    options: [
      'Ozone (O3) and Carbon Monoxide (CO)',
      'Methane (CH4) from anaerobic methanogenesis in flooded soil and Nitrous Oxide (N2O) from microbial nitrification/denitrification',
      'Chlorofluorocarbons (CFC-11) and Sulfur Hexafluoride (SF6)',
      'Sulfur Dioxide (SO2) and Lead particulates',
    ],
    correctIndex: 1,
    explanation: 'Waterlogged soils create anaerobic conditions where methanogenic archaea produce Methane (CH4, 25x GWP of CO2). Synthetic nitrogen fertilizers undergo microbial nitrification/denitrification, releasing Nitrous Oxide (N2O, ~300x GWP of CO2).',
    hints: [
      'Flooded, waterlogged mud lacks oxygen (anaerobic) -> produces swamp gas / methane.',
      'Synthetic nitrogen fertilizers feed soil microbes that emit nitrous oxide.',
      'The gases are CH4 and N2O.',
    ],
  },
  {
    id: 'ch_evs_017_num',
    nodeId: NODE_C9_EVS_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Four separate families living in the same apartment complex in Pune commute 15 km each way to school (30 km roundtrip per car) for 200 school days. Each petrol car emits 120 g of CO2 per km. If all 4 families form a single carpool using 1 car, calculate the total mass of CO2 emissions prevented annually in kilograms (kg).',
    correctAnswer: 2160,
    tolerance: 20,
    unit: 'kg CO2',
    explanation: '3 cars eliminated. Distance eliminated = 3 cars × 30 km/day × 200 days = 18,000 km avoided. CO2 prevented = 18,000 km × 120 g/km = 2,160,000 grams = 2,160 kg CO2 (75% net cut).',
    hints: [
      'Calculate distance saved: 3 cars avoided × 30 km/day × 200 days = 18,000 km.',
      'Multiply by 120 grams CO2 per km: 2,160,000 grams.',
      'Convert grams to kilograms: 2,160,000 / 1000 = 2,160 kg.',
    ],
  },
  {
    id: 'ch_evs_018_eval',
    nodeId: NODE_C9_EVS_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During October-November, post-harvest paddy stubble burning in northwestern states combines with thermal inversion to push Delhi\'s AQI past 450 (PM2.5 > 350 µg/m³). Why can Delhi Municipal Corporation NOT solve this air pollution crisis on its own?',
    options: [
      'Delhi has no municipal street sweepers or water sprinklers',
      'Air pollution is transboundary: wind corridors transport fine PM2.5 across state borders, requiring regional airshed management and multi-state crop residue policies',
      'Smog is purely a natural fog phenomenon unrelated to agricultural emissions',
      'The Paris Agreement bans local cities from regulating smoke',
    ],
    correctIndex: 1,
    explanation: 'Pollution obeys atmospheric physics, not political boundaries. Transboundary airsheds require inter-state coordination: mechanized paddy straw management (Happy Seeders, bio-decomposers), crop diversification, and industrial regulation across Punjab, Haryana, and NCR.',
    hints: [
      'Look at where the smoke originates versus where it settles.',
      'Airsheds cross administrative state boundaries.',
      'Transboundary pollution requires regional airshed governance.',
    ],
  },
  {
    id: 'ch_evs_019_match',
    nodeId: NODE_C9_EVS_034,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the specific Indian environmental program to its primary targeted UN Sustainable Development Goal.',
    options: [
      'International Solar Alliance (ISA) → SDG 7 (Affordable and Clean Energy); Swachh Bharat → SDG 6 (Clean Water & Sanitation); Project Tiger → SDG 15 (Life on Land)',
      'International Solar Alliance → SDG 14 (Life Below Water); Swachh Bharat → SDG 7; Project Tiger → SDG 1',
      'International Solar Alliance → SDG 1 (No Poverty); Swachh Bharat → SDG 13; Project Tiger → SDG 4',
      'All Indian programs only map to SDG 17 (Partnerships)',
    ],
    correctIndex: 0,
    explanation: 'The International Solar Alliance targets clean affordable energy (SDG 7); Swachh Bharat Mission ensures open-defecation-free sanitation and clean water (SDG 6); Project Tiger conserves terrestrial biodiversity and forest biomes (SDG 15).',
    hints: [
      'Solar energy directly relates to clean energy (SDG 7).',
      'Sanitation and clean water map to SDG 6.',
      'Terrestrial wildlife protection maps to Life on Land (SDG 15).',
    ],
  },
  {
    id: 'ch_evs_020_eval',
    nodeId: NODE_C9_EVS_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To convert a concrete urban school into a net-positive biodiversity and climate handprint hub, which integrated blueprint provides the highest measurable ecological return?',
    options: [
      'Pave the entire schoolyard with synthetic turf to prevent mud, and install diesel backup generators',
      'Establish rooftop solar (SDG 7), 3-stream waste segregation with vermicomposting (SDG 12), native Miyawaki micro-forest with bird nest boxes (SDG 15), and rooftop rainwater harvesting recharge pits (SDG 6)',
      'Paint all school walls green and release exotic goldfishes into stormwater drains',
      'Replace all textbooks with plastic tablets while burning canteen food waste in an open incinerator',
    ],
    correctIndex: 1,
    explanation: 'A comprehensive school handprint integrates renewable solar power, circular organic composting, indigenous native afforestation (Miyawaki), and groundwater aquifer recharging, creating quantifiable metric gains across multiple SDGs.',
    hints: [
      'Look for actions addressing energy, waste, biodiversity, and water conservation together.',
      'Native trees (Miyawaki) support local birds and insects unlike synthetic turf.',
      'The multi-dimensional approach (Solar + 3-Stream Compost + Native Forest + Rainwater) provides the highest holistic benefit.',
    ],
  },
  {
    id: 'ch_evs_021_ana',
    nodeId: NODE_C9_EVS_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the IUCN Red List conservation threat categories in order of ESCALATING extinction risk toward complete loss.',
    options: [
      'Least Concern → Near Threatened → Vulnerable → Endangered → Critically Endangered → Extinct in the Wild → Extinct',
      'Extinct → Endangered → Vulnerable → Least Concern → Near Threatened',
      'Critically Endangered → Least Concern → Vulnerable → Extinct in the Wild',
      'Vulnerable → Least Concern → Critically Endangered → Endangered',
    ],
    correctIndex: 0,
    explanation: 'The IUCN Red List ranks risk from Least Concern (LC) → Near Threatened (NT) → Vulnerable (VU) → Endangered (EN) → Critically Endangered (CR) → Extinct in the Wild (EW) → Extinct (EX).',
    hints: [
      'Start with the lowest risk: Least Concern.',
      'Vulnerable comes before Endangered, which comes before Critically Endangered.',
      'The final state is Extinct.',
    ],
  },
  {
    id: 'ch_evs_022_app',
    nodeId: NODE_C9_EVS_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Why does PM2.5 pose a substantially more lethal health hazard to human cardiorespiratory systems than PM10?',
    options: [
      'PM10 particles dissolve completely in saliva before entering the throat',
      'PM2.5 particles (≤2.5 µm) bypass nasal cilia and upper airway mucous barriers, penetrating deep into alveolar gas exchange sacs and directly entering the bloodstream',
      'PM2.5 particles are made exclusively of heavy lead metal while PM10 is pure harmless water vapor',
      'PM2.5 only affects marine fish and has no impact on terrestrial mammals',
    ],
    correctIndex: 1,
    explanation: 'Coarser PM10 particles are mostly trapped in the nasal passages and bronchi. Fine PM2.5 particles bypass these defenses, reach the pulmonary alveoli, induce chronic systemic inflammation, and enter blood circulation, precipitating heart attacks, strokes, and COPD.',
    hints: [
      'Think about physical size: smaller particles travel deeper into respiratory anatomy.',
      'PM2.5 is small enough to cross alveolar membranes into the capillary bloodstream.',
      'It triggers systemic cardiovascular and deep lung damage.',
    ],
  },
  // ─── Class 10 board-depth additions: forest-society-and-colonialism diagnostic ───
  {
    id: 'ch_depth_bio_protected_forest_rights',
    nodeId: 'c10_geo_cbse_02_006',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A village in Odisha borders a forest notified as Protected Forest. Villagers want to collect tendu leaves (for beedi making) and firewood. What determines their rights, and how do Reserved / Protected / Village forest categories differ?',
    options: [
      'In Protected Forests the government has notified rights of the STATE but village rights (grazing, fuelwood, NTFP like tendu) are recorded in settlement -- villagers may use what their settlement allows; Reserved Forest = most activities banned without permission (strongest state control); Village Forest = state forest managed BY a village community under JFM/FRA with shared produce',
      'All forest categories ban villagers completely',
      'Protected Forests are private property of the nearest landlord',
      'Tendu leaves can never be collected by anyone'
    ],
    correctIndex: 0,
    explanation:
      'The Indian Forest Act 1927 hierarchy: Reserved > Protected > Village in state control intensity. The deeper lesson of the chapter: colonial forestry took forests FROM village use (customary rights -> "state property"), criminalising communities who had managed them for centuries -- and post-1988 policy (NFPA community involvement, JFM 1990, FRA 2006) began returning rights. NTFP (non-timber forest produce) like tendu, mahua, sal seed is often the village\'s main cash income -- a rights question, not a charity question.',
    hints: [
      'Rank the three categories by who controls access.',
      'Settlement records decide what villagers MAY take.',
      'NTFP = non-timber forest produce -- tendu leaves are the classic case.'
    ],
  }
];

// ─── PROPS INTERFACE ───────────────────────────────────────────────────
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

// ─── DEFAULT ENRICHED PROPS ────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_EVS_031,
  title: 'Triple Planetary Crisis: Biodiversity, Climate, Pollution & Handprint Solutions',
  definition: 'Biodiversity loss, climate change, and pollution constitute the triple planetary crisis. The transition to a sustainable society requires understanding ecological drivers, adopting circular economic models under the UN SDGs, and deploying individual and community handprint actions.',
  eli5: 'Think of Earth as our collective home. We have punched holes in the roof (climate change), dirtied the water and air (pollution), and driven out our fellow roommates (biodiversity loss). Our handprint is the repairing work we do together to fix the house!',
  misconceptions: [
    {
      misconception: 'Listing "loss of biodiversity" or "ecosystem loss" as a cause of biodiversity loss.',
      correction: 'Ecosystem loss is the outcome; the causes are habitat loss & fragmentation, invasive species, co-extinction, and overexploitation.',
    },
    {
      misconception: 'Assuming any non-native species is automatically invasive.',
      correction: 'An invasive species is specifically one that aggressively spreads, outcompetes native flora/fauna, and damages the ecosystem (e.g., Lantana camara, Water Hyacinth). Crops like wheat are non-native but not invasive.',
    },
    {
      misconception: 'Confusing bioaccumulation with biomagnification.',
      correction: 'Bioaccumulation is toxin build-up within a single organism over time; biomagnification is the exponential multiplication of toxin concentrations across ascending trophic levels of a food web.',
    },
    {
      misconception: 'Believing sustainability means halting all economic development.',
      correction: 'Brundtland sustainability balances the triple bottom line: meeting present economic and social human needs while protecting ecological capital for future generations.',
    },
    {
      misconception: 'Thinking ecological handprint and footprint mean the same thing.',
      correction: 'Footprint measures negative resource destruction; Handprint measures positive restorative, regenerative actions.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the single biggest direct driver of terrestrial biodiversity loss globally?', options: ['Habitat loss and fragmentation', 'Cosmic radiation', 'Volcanic dust', 'Earthquake tremors'], correctIndex: 0 },
    { question: 'Which ornamental plant introduced by the British now severely invades Indian forests?', options: ['Lantana camara', 'Tulsi (Ocimum tenuiflorum)', 'Neem (Azadirachta indica)', 'Banyan tree'], correctIndex: 0 },
    { question: 'What happens to seawater pH as atmospheric CO2 increases?', options: ['pH rises (becomes alkaline)', 'pH falls (becomes acidic)', 'pH remains exactly 7.0', 'Water turns into pure hydrogen'], correctIndex: 1 },
    { question: 'What gas is predominantly released from flooded rice paddies and cattle digestion?', options: ['Argon', 'Helium', 'Methane (CH4)', 'Oxygen'], correctIndex: 2 },
    { question: 'What is the primary cause of cultural eutrophication in freshwater lakes?', options: ['Agricultural nitrogen-phosphorus runoff', 'Wind blowing autumn leaves', 'Swimming by ducks', 'Direct rainfall'], correctIndex: 0 },
    { question: 'In the circular economy 5R principles, what does EPR stand for?', options: ['Extended Producer Responsibility', 'Emergency Pollution Reduction', 'Economic Power Rationing', 'Ecological Population Regulation'], correctIndex: 0 },
    { question: 'Replacing a 60 W incandescent lamp with a 9 W LED bulb reduces energy consumption by approximately:', options: ['10%', '30%', '50%', 'Over 80%'], correctIndex: 3 },
    { question: 'Which UN SDG explicitly targets Climate Action?', options: ['SDG 2', 'SDG 7', 'SDG 13', 'SDG 17'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery demonstrates synthesis of the 4 causes of biodiversity loss, carbon cycle mechanisms of climate change, pollution pathways (biomagnification, eutrophication), the 17 SDGs, and quantifiable handprint actions.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. Habitat Fragmentation & The Island Biogeography Effect',
    instruction: 'Slice the continuous forest corridor with a multi-lane highway slider and watch interior forest species territory shrink and vanish.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_031,
  },
  {
    title: '2. Invasive Species Outcompetition Simulator',
    instruction: 'Inject Lantana camara seeds into the Nilgiri understory and watch how aggressive allelopathy suppresses native shola seedlings.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_EVS_031,
  },
  {
    title: '3. The Ocean Acidification & Coral Bleaching Lab',
    instruction: 'Increase atmospheric CO2 concentration and observe the marine pH gauge drop, dissolving calcium carbonate coral skeletons.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_032,
  },
  {
    title: '4. Eutrophication & Dead Zone Dynamics',
    instruction: 'Add agricultural N-P fertilizer runoff to the lake. Observe the algal bloom, bacterial oxygen consumption, and fish hypoxia.',
    interactionType: 'drag-classify',
    nodeId: NODE_C9_EVS_033,
  },
  {
    title: '5. The Circular Economy & Handprint Transformer',
    instruction: 'Switch industrial production from Linear (Take-Make-Dispose) to Circular (5Rs + EPR) and deploy community solar & carpooling.',
    interactionType: 'drag-position',
    nodeId: NODE_C9_EVS_034,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ──────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an 8-lane expressway cuts a 1000 km² continuous reserve into four 250 km² isolated quadrants, what happens to large apex predators (e.g. Tigers)?',
    options: [
      'They flourish because they can hunt four times faster in small boxes',
      'Their viable breeding territories fragment, causing inbreeding depression and severe human-wildlife edge conflicts',
      'They adapt by instantly shrinking their physical body weight by 75%',
      'No change occurs because tigers fly over fences',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Highway Width & Fragmentation slider in the simulation to observe the interior habitat index plunge from 100% to 22%!',
    nodeId: NODE_C9_EVS_031,
  },
  {
    question: 'Predict: If dissolved oxygen in a freshwater lake drops below 2 mg/L due to decomposing algal blooms, which organism dies first?',
    options: [
      'Anaerobic bottom sludge bacteria',
      'Active aerobic fish (e.g., Mahseer and native carp) requiring high dissolved oxygen',
      'Surface water hyacinth plants',
      'Inert sand pebbles',
    ],
    correctIndex: 1,
    verifyInstruction: 'Pump agricultural fertilizer into the lake model and watch the Dissolved Oxygen meter turn red, triggering fish mortality.',
    nodeId: NODE_C9_EVS_033,
  },
];

// ─── OBSERVATION QUESTIONS ─────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you increased Lantana weed density above 60%, what happened to the native herbivore population in the graph?',
    observableOptions: [
      'Herbivore count crashed because toxic Lantana displaced edible native grasses',
      'Herbivores multiplied rapidly by eating Lantana flowers',
      'Herbivores transformed into carnivores',
      'The forest turned into a desert dune instantly',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_EVS_031,
  },
  {
    question: 'Observation: As atmospheric CO2 was raised from 280 ppm to 560 ppm in the ocean tank, what happened to the coral reef health score?',
    observableOptions: [
      'The coral skeleton calcification rate dropped by over 65% and corals bleached white',
      'Corals grew 10 times larger and turned deep purple',
      'Ocean water turned into pure drinking water',
      'No measurable change occurred in coral physiology',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_EVS_032,
  },
];

// ─── REAL WORLD ACTIVITY ───────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'School & Neighborhood Ecological Audit & Handprint Charter',
  description: 'Conduct an actionable 4-pillar environmental audit of your school or housing society. Calculate actual metrics, present findings to your administration, and execute high-impact handprint interventions.',
  steps: [
    '1. Lighting & Appliance Audit: Count all incandescent/fluorescent tubes. Calculate kWh saved by switching to BEE 5-star LEDs.',
    '2. Water Conservation Inspection: Audit every tap on campus. Detect leaks (>11,000 L/year per dripping tap) and design a rooftop recharge pit catchment map.',
    '3. Waste Stream Characterization: Implement 3-bin segregation (Wet, Dry, Hazardous) and establish a functional vermicompost khamba for canteen organic waste.',
    '4. Native Biodiversity Plot: Plant a 10x10 meter native micro-habitat (Miyawaki method) with indigenous shrubs to attract native pollinators and repel invasive weeds.',
  ],
};

// ─── COMPONENT DEFINITION ─────────────────────────────────────────────
function C9_EVSBiodiversityLossCausesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject Config
  const subjectConfig = SUBJECT_CONFIG['evs'] || {
    name: 'Environmental Science',
    emoji: '🌿',
    color: 'emerald',
  };

  // Phase State: 'discovery' -> 'explore' -> 'sandbox' -> 'challenge' -> 'complete'
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Exploration Interactive State
  const [fragmentationLevel, setFragmentationLevel] = useState(10); // 0 to 100%
  const [invasiveLantanaDensity, setInvasiveLantanaDensity] = useState(20); // 0 to 100%
  const [atmosphericCO2Ppm, setAtmosphericCO2Ppm] = useState(420); // 280 to 800 ppm
  const [agriculturalFertilizerInput, setAgriculturalFertilizerInput] = useState(25); // 0 to 100%
  const [circularEconomyAdoption, setCircularEconomyAdoption] = useState(30); // 0 to 100%
  const [communityHandprintActions, setCommunityHandprintActions] = useState<string[]>(['led']);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // Selected Interactive Entity in Exploration
  const [selectedSpecies, setSelectedSpecies] = useState<'tiger' | 'figwasp' | 'corals' | 'fish' | 'lantana'>('tiger');

  // Adaptive Difficulty & BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag & Drop / Interactive Question State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Progressive Disclosure
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 2D Animation Canvas Ref
  const ecosystemCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED REAL-TIME METRICS ───────────────────────────────────────
  const oceanPH = useMemo(() => {
    const ph = 8.25 - ((atmosphericCO2Ppm - 280) / 520) * 0.55;
    return parseFloat(ph.toFixed(2));
  }, [atmosphericCO2Ppm]);

  const dissolvedOxygenMgL = useMemo(() => {
    const doVal = Math.max(0.8, 9.5 - (agriculturalFertilizerInput / 100) * 8.3);
    return parseFloat(doVal.toFixed(1));
  }, [agriculturalFertilizerInput]);

  const interiorForestCoreKm2 = useMemo(() => {
    const core = 1000 * Math.pow(1 - fragmentationLevel / 100, 1.8);
    return Math.round(core);
  }, [fragmentationLevel]);

  const nativeBiomassIndex = useMemo(() => {
    const score = Math.max(5, 100 - invasiveLantanaDensity * 0.65 - fragmentationLevel * 0.35);
    return Math.round(score);
  }, [invasiveLantanaDensity, fragmentationLevel]);

  const globalWarmingDegC = useMemo(() => {
    const temp = ((atmosphericCO2Ppm - 280) / (420 - 280)) * 1.1;
    return parseFloat(temp.toFixed(2));
  }, [atmosphericCO2Ppm]);

  const handprintScore = useMemo(() => {
    let base = circularEconomyAdoption * 0.5;
    if (communityHandprintActions.includes('led')) base += 15;
    if (communityHandprintActions.includes('carpool')) base += 15;
    if (communityHandprintActions.includes('compost')) base += 10;
    if (communityHandprintActions.includes('rainwater')) base += 10;
    return Math.min(100, Math.round(base));
  }, [circularEconomyAdoption, communityHandprintActions]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION EFFECT ────────────────────────────────
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

  // ─── CANVAS ANIMATION ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = ecosystemCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 1,
      speedX: (Math.random() - 0.5) * 0.8,
      speedY: (Math.random() - 0.5) * 0.8,
      type: Math.random() > 0.5 ? 'co2' : 'nutrient',
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (dissolvedOxygenMgL < 3.0) {
        bgGrad.addColorStop(0, '#1c1917');
        bgGrad.addColorStop(1, '#0c0a09');
      } else {
        bgGrad.addColorStop(0, '#064e3b');
        bgGrad.addColorStop(1, '#022c22');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'co2' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(52, 211, 153, 0.5)';
        ctx.fill();
      });

      const nodes = [
        { x: 50, y: 35, label: 'Producers', val: nativeBiomassIndex },
        { x: 180, y: 30, label: 'Herbivores', val: Math.max(10, nativeBiomassIndex - 20) },
        { x: 300, y: 35, label: 'Apex', val: Math.max(5, interiorForestCoreKm2 / 12) },
      ];

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.stroke();

      nodes.forEach((n, idx) => {
        const pulse = Math.sin(frame * 0.05 + idx) * 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(6, (n.val / 100) * 14) + pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.val > 40 ? '#10b981' : '#f43f5e';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '10px sans-serif';
        ctx.fillText(`${n.label}: ${Math.round(n.val)}%`, n.x - 30, n.y + 22);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dissolvedOxygenMgL, nativeBiomassIndex, interiorForestCoreKm2]);

  // ─── AUDIO & SPEECH HANDLERS ─────────────────────────────────────────
  const playSound = useCallback((sound: SoundEffect) => {
    audioManager.play(sound);
  }, []);

  const speakText = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // ─── ESCALATING HINTS HANDLER ────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      playSound('hint');
      speakText(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speakText('Let us walk through the step-by-step scientific explanation.');
    }
  }, [hintCount, challenge, playSound, speakText]);

  // ─── INACTIVITY AUTO-HINT TIMER ──────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      playSound('success');
      speakText('Excellent ecological insight! You correctly recognized co-extinction.');
    } else {
      playSound('error');
      speakText(DISCOVERY_QUESTION.hintAfter);
    }
  }, [playSound, speakText]);

  // ─── ADVANCE PHASES ──────────────────────────────────────────────────
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    playSound('whoosh');
    speakText('Welcome to the Interactive Biosphere Laboratories. Manipulate the parameters to discover the causes.');
  }, [playSound, speakText]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    playSound('whoosh');
    speakText('Free Sandbox Mode activated. Experiment with all variables without any grading pressure.');
  }, [playSound, speakText]);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    playSound('whoosh');
    speakText('Commencing Adaptive Competency Challenges. Apply what you observed.');
    resetInactivityTimer();
  }, [playSound, speakText, resetInactivityTimer]);

  // ─── PREDICTION & OBSERVATION HANDLERS ────────────────────────────────
  const handlePredictionSubmit = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    playSound('tap');
    speakText('Prediction recorded! Now manipulate the simulation sliders to verify your hypothesis.');
  }, [playSound, speakText]);

  const handleObservationSubmit = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      playSound('success');
      speakText('Great scientific observation! You noted the exact ecological trend.');
    } else {
      playSound('error');
      speakText('Look closely at the data meters as you adjust the sliders.');
    }
  }, [playSound, speakText]);

  // ─── DRAG AND DROP HANDLERS ──────────────────────────────────────────
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    playSound('pickup');
  }, [playSound]);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping && challenge.correctMapping[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      playSound('drop-correct');
    } else {
      playSound('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge, playSound]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    playSound('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : prev;
      const arr = [...initial];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge, playSound]);

  // ─── COMPLETION HANDLER ──────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    playSound('celebration');
    speakText('Mission Complete! You have mastered the science of biodiversity protection and sustainable transitions.');
  }, [errors, onComplete, playSound, speakText]);

  // ─── NEXT CHALLENGE HANDLER ──────────────────────────────────────────
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
      playSound('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, playSound, resetInactivityTimer]);

  // ─── ANSWER VALIDATION HANDLER ───────────────────────────────────────
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      playSound('success');
      speakText('Correct! Outstanding scientific reasoning.');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
      }
    } else {
      playSound('error');
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
        speakText('Let us examine the complete solution breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions, playSound, speakText]);

  // ─── TOGGLE HANDPRINT ACTION ─────────────────────────────────────────
  const toggleHandprintAction = useCallback((action: string) => {
    setCommunityHandprintActions(prev => {
      const next = prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action];
      playSound('tap');
      return next;
    });
  }, [playSound]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ──────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ICSE Class 9 EVS
              </span>
              <span className="text-xs text-slate-400">Nodes: c9_evs_031 - 035</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((pTab) => (
            <motion.button
              key={pTab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(pTab);
                playSound('tap');
              }}
              aria-label={`Switch to ${pTab} phase`}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === pTab
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {pTab}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* PHASE 1: DISCOVERY HOOK */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-gold-950/50 rounded-2xl border border-emerald-800/60 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Mission Briefing</span>
              <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-emerald-900/50 flex items-center gap-3 text-xs text-emerald-300">
                <span className="text-lg">🎯</span>
                <span>{SCENARIO.context}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold">Curiosity Hook</span>
              <span className="text-xs text-slate-400">Think before we investigate:</span>
            </div>
            <p className="text-base md:text-lg font-bold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-600/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-xs px-2 py-0.5 rounded bg-slate-700/50 text-slate-300">
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
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-xs text-slate-300">
                  <p className={discoveryCorrect ? 'text-emerald-400 font-bold mb-1' : 'text-amber-400 font-bold mb-1'}>
                    {discoveryCorrect ? '✓ Scientific Intuition Confirmed!' : '💡 Don\'t worry if you missed it — that is the discovery!'}
                  </p>
                  <p className="text-slate-400">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-950 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 2: INTERACTIVE EXPLORATION */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, sIdx) => (
                <div
                  key={sIdx}
                  className={`h-2 rounded-full transition-all ${
                    sIdx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2.5 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-amber-300 text-xs font-semibold bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-5 rounded-2xl border border-slate-800">
            
            <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between relative overflow-hidden min-h-[360px]">
              
              {currentSlide === 0 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Western Ghats Landscape (1,000 km²)</span>
                    <span className="text-emerald-400 font-bold">Core Interior: {interiorForestCoreKm2} km²</span>
                  </div>
                  <svg viewBox="0 0 400 240" className="w-full h-auto rounded-xl bg-emerald-950/40 border border-emerald-900/50">
                    <rect x="10" y="10" width="180" height="100" rx="10" fill="#065f46" opacity={1 - fragmentationLevel / 180} />
                    <rect x="210" y="10" width="180" height="100" rx="10" fill="#065f46" opacity={1 - fragmentationLevel / 180} />
                    <rect x="10" y="130" width="180" height="100" rx="10" fill="#065f46" opacity={1 - fragmentationLevel / 180} />
                    <rect x="210" y="130" width="180" height="100" rx="10" fill="#065f46" opacity={1 - fragmentationLevel / 180} />

                    <line x1="200" y1="0" x2="200" y2="240" stroke="#71717a" strokeWidth={fragmentationLevel * 0.35 + 2} strokeDasharray="6,4" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#71717a" strokeWidth={fragmentationLevel * 0.35 + 2} strokeDasharray="6,4" />

                    <g transform="translate(70, 50)" style={{ cursor: 'pointer' }} onClick={() => setSelectedSpecies('tiger')}>
                      <circle cx="20" cy="20" r="18" fill="#f59e0b" opacity="0.9" />
                      <text x="20" y="24" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Tiger</text>
                    </g>
                    <g transform="translate(280, 160)" style={{ cursor: 'pointer' }} onClick={() => setSelectedSpecies('figwasp')}>
                      <circle cx="20" cy="20" r="18" fill="#10b981" opacity="0.9" />
                      <text x="20" y="24" textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Hornbill</text>
                    </g>

                    {fragmentationLevel > 30 && (
                      <g stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,2" fill="none">
                        <rect x="190" y="10" width="20" height="220" opacity="0.6" />
                        <rect x="10" y="110" width="380" height="20" opacity="0.6" />
                        <text x="200" y="235" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">Deadly Edge Zone Barrier</text>
                      </g>
                    )}
                  </svg>
                </div>
              )}

              {currentSlide === 1 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Forest Vertical Profile (Canopy to Soil)</span>
                    <span className="text-rose-400 font-bold">Lantana Density: {invasiveLantanaDensity}%</span>
                  </div>
                  <svg viewBox="0 0 400 240" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800">
                    <line x1="80" y1="200" x2="80" y2="40" stroke="#78350f" strokeWidth="10" />
                    <circle cx="80" cy="35" r="35" fill="#047857" />
                    <line x1="320" y1="200" x2="320" y2="40" stroke="#78350f" strokeWidth="10" />
                    <circle cx="320" cy="35" r="35" fill="#047857" />

                    <rect x="0" y="195" width="400" height="45" fill="#3f2d1d" />

                    {Array.from({ length: Math.max(2, 12 - Math.floor(invasiveLantanaDensity / 10)) }).map((_, idx) => (
                      <path key={idx} d={`M ${idx * 32 + 20} 200 Q ${idx * 32 + 25} 160 ${idx * 32 + 30} 200`} stroke="#22c55e" strokeWidth="4" fill="none" />
                    ))}

                    {Array.from({ length: Math.floor(invasiveLantanaDensity / 12) }).map((_, idx) => (
                      <g key={idx} transform={`translate(${idx * 45 + 10}, 145)`}>
                        <circle cx="15" cy="20" r="16" fill="#fb7185" opacity="0.8" />
                        <circle cx="22" cy="12" r="12" fill="#fb923c" opacity="0.9" />
                        <text x="18" y="23" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">Lantana</text>
                      </g>
                    ))}
                  </svg>
                </div>
              )}

              {currentSlide === 2 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Lakshadweep Coral Reef Micro-Aquarium</span>
                    <span className={oceanPH < 8.0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>Seawater pH: {oceanPH}</span>
                  </div>
                  <svg viewBox="0 0 400 240" className="w-full h-auto rounded-xl bg-gold-950/60 border border-gold-900/50">
                    <rect x="0" y="0" width="400" height="240" fill={oceanPH < 7.9 ? '#1e293b' : '#0369a1'} opacity="0.4" />
                    
                    <g transform="translate(60, 160)">
                      <path d="M 10 70 Q 20 20 40 40 Q 60 10 80 50 Q 90 20 100 70 Z" 
                        fill={oceanPH < 7.9 ? '#f1f5f9' : '#f43f5e'} 
                        stroke="#cbd5e1" 
                        strokeWidth="1.5" 
                      />
                      <text x="55" y="65" textAnchor="middle" fill="#000" fontSize="8" fontWeight="bold">
                        {oceanPH < 7.9 ? 'Bleached Coral' : 'Healthy Reef'}
                      </text>
                    </g>

                    <g transform="translate(240, 165)">
                      <path d="M 0 65 Q 15 25 35 45 Q 55 15 75 65 Z" 
                        fill={oceanPH < 7.9 ? '#e2e8f0' : '#d946ef'} 
                        stroke="#cbd5e1" 
                        strokeWidth="1.5" 
                      />
                    </g>

                    <rect x="40" y="15" width="320" height="32" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="200" y="35" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace">
                      CO₂ + H₂O → H₂CO₃ ⇌ H⁺ + HCO₃⁻ (pH ↓)
                    </text>
                  </svg>
                </div>
              )}

              {currentSlide === 3 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Freshwater Reservoir Ecosystem</span>
                    <span className={dissolvedOxygenMgL < 3.0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      Dissolved O₂: {dissolvedOxygenMgL} mg/L
                    </span>
                  </div>
                  <svg viewBox="0 0 400 240" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800">
                    <rect x="0" y="40" width="400" height="200" fill={agriculturalFertilizerInput > 50 ? '#14532d' : '#0284c7'} opacity="0.5" />

                    {agriculturalFertilizerInput > 30 && (
                      <g>
                        <rect x="0" y="40" width="400" height={agriculturalFertilizerInput * 0.35} fill="#4ade80" opacity="0.8" />
                        <text x="200" y="55" textAnchor="middle" fill="#052e16" fontSize="10" fontWeight="black">
                          DENSE ALGAL BLOOM (Blocks Sunlight)
                        </text>
                      </g>
                    )}

                    {dissolvedOxygenMgL >= 3.0 ? (
                      <g transform="translate(180, 130)">
                        <ellipse cx="20" cy="10" rx="20" ry="10" fill="#f59e0b" />
                        <polygon points="40,10 50,0 50,20" fill="#f59e0b" />
                        <circle cx="10" cy="8" r="2" fill="#000" />
                        <text x="20" y="30" textAnchor="middle" fill="#fef08a" fontSize="9">Active Native Mahseer</text>
                      </g>
                    ) : (
                      <g transform="translate(180, 80) rotate(180 20 10)">
                        <ellipse cx="20" cy="10" rx="20" ry="10" fill="#94a3b8" />
                        <polygon points="40,10 50,0 50,20" fill="#94a3b8" />
                        <text x="20" y="-10" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">
                          DEAD ZONE SUFFOCATION
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              )}

              {currentSlide === 4 && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold">Macro-Societal Resource Metabolism</span>
                    <span className="text-emerald-400 font-bold">Handprint Metric: {handprintScore}/100</span>
                  </div>
                  <svg viewBox="0 0 400 240" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-800">
                    <circle cx="200" cy="120" r="70" fill="none" stroke="#10b981" strokeWidth={circularEconomyAdoption * 0.08 + 2} strokeDasharray="8,5" />
                    
                    <g transform="translate(180, 30)">
                      <rect x="0" y="0" width="40" height="22" rx="6" fill="#047857" />
                      <text x="20" y="14" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Refuse</text>
                    </g>
                    <g transform="translate(265, 105)">
                      <rect x="0" y="0" width="40" height="22" rx="6" fill="#047857" />
                      <text x="20" y="14" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Reduce</text>
                    </g>
                    <g transform="translate(210, 180)">
                      <rect x="0" y="0" width="40" height="22" rx="6" fill="#047857" />
                      <text x="20" y="14" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Reuse</text>
                    </g>
                    <g transform="translate(130, 180)">
                      <rect x="0" y="0" width="40" height="22" rx="6" fill="#047857" />
                      <text x="20" y="14" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Repair</text>
                    </g>
                    <g transform="translate(95, 105)">
                      <rect x="0" y="0" width="40" height="22" rx="6" fill="#047857" />
                      <text x="20" y="14" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Recycle</text>
                    </g>

                    <text x="200" y="125" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="black">
                      EPR CLOSED LOOP
                    </text>
                  </svg>
                </div>
              )}

              <canvas ref={ecosystemCanvasRef} width={380} height={45} className="w-full rounded-xl mt-3 border border-slate-800" />
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              
              <div className="space-y-4">
                
                {currentSlide === 0 && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Highway Slicing & Habitat Fragmentation:</span>
                      <span className="text-emerald-400 font-mono">{fragmentationLevel}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={fragmentationLevel}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFragmentationLevel(val);
                        if (predictionMade && !predictionVerified && val > 50) {
                          setPredictionVerified(true);
                        }
                      }}
                      aria-label="Set fragmentation level"
                      className="w-full accent-emerald-500 cursor-pointer"
                    />

                    {!predictionMade ? (
                      <div className="pt-2 border-t border-slate-800">
                        <p className="text-xs text-amber-300 font-bold mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((pOpt, pIdx) => (
                            <motion.button
                              key={pIdx}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePredictionSubmit(pIdx)}
                              aria-label={`Predict: ${pOpt}`}
                              className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                            >
                              {pOpt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300">
                        <p className="font-bold">✓ Prediction active!</p>
                        <p className="text-slate-300 mt-0.5">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      </div>
                    )}
                  </div>
                )}

                {currentSlide === 1 && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Invasive Lantana weed coverage:</span>
                      <span className="text-rose-400 font-mono">{invasiveLantanaDensity}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={invasiveLantanaDensity}
                      onChange={(e) => setInvasiveLantanaDensity(Number(e.target.value))}
                      aria-label="Set Lantana density"
                      className="w-full accent-rose-500 cursor-pointer"
                    />

                    {invasiveLantanaDensity > 50 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2 border-t border-slate-800">
                        <p className="text-xs text-amber-300 font-bold mb-2">👁️ {OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((oOpt, oIdx) => (
                            <motion.button
                              key={oIdx}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservationSubmit(oIdx)}
                              aria-label={`Observation answer: ${oOpt}`}
                              className="w-full text-left p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200"
                            >
                              {oOpt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {currentSlide === 2 && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Atmospheric Carbon Dioxide (CO₂):</span>
                      <span className="text-gold-400 font-mono">{atmosphericCO2Ppm} ppm</span>
                    </label>
                    <input
                      type="range"
                      min={280}
                      max={800}
                      value={atmosphericCO2Ppm}
                      onChange={(e) => setAtmosphericCO2Ppm(Number(e.target.value))}
                      aria-label="Set atmospheric CO2 ppm"
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Warming Level</span>
                        <span className="text-amber-400 font-bold font-mono">+{globalWarmingDegC} °C</span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block">Ocean pH</span>
                        <span className="text-gold-400 font-bold font-mono">{oceanPH}</span>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide === 3 && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Agricultural Fertilizer (N-P Runoff):</span>
                      <span className="text-emerald-400 font-mono">{agriculturalFertilizerInput}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={agriculturalFertilizerInput}
                      onChange={(e) => setAgriculturalFertilizerInput(Number(e.target.value))}
                      aria-label="Set fertilizer runoff input"
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                      <span className="text-slate-400">Eutrophication State: </span>
                      <span className={dissolvedOxygenMgL < 2.0 ? 'text-rose-400 font-bold' : dissolvedOxygenMgL < 5.0 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {dissolvedOxygenMgL < 2.0 ? 'Severe Hypoxic Dead Zone' : dissolvedOxygenMgL < 5.0 ? 'Moderate Stress' : 'O2 Saturated Clean Water'}
                      </span>
                    </div>
                  </div>
                )}

                {currentSlide === 4 && (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Circular Economy & 5R Adoption:</span>
                      <span className="text-emerald-400 font-mono">{circularEconomyAdoption}%</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={circularEconomyAdoption}
                      onChange={(e) => setCircularEconomyAdoption(Number(e.target.value))}
                      aria-label="Set circular economy adoption"
                      className="w-full accent-emerald-500 cursor-pointer"
                    />

                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-400">Toggle Community Handprints:</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { id: 'led', label: '💡 LED Lighting' },
                          { id: 'carpool', label: '🚗 4-Car Carpool' },
                          { id: 'compost', label: '🍂 3-Bin Compost' },
                          { id: 'rainwater', label: '🌧️ Recharge Pit' },
                        ].map((hp) => (
                          <motion.button
                            key={hp.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => toggleHandprintAction(hp.id)}
                            aria-label={`Toggle handprint action: ${hp.label}`}
                            className={`p-2 rounded-lg text-xs font-bold text-left border ${
                              communityHandprintActions.includes(hp.id)
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                            }`}
                          >
                            {hp.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center gap-3 pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    playSound('tap');
                  }}
                  disabled={currentSlide === 0}
                  aria-label="Previous Exploration Step"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-xl text-xs font-bold text-white"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      playSound('tap');
                    }}
                    aria-label="Next Exploration Step"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-950"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to Free Sandbox"
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-gold-950"
                  >
                    Try Free Sandbox →
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 3: SANDBOX / FREE PLAY */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/60 rounded-2xl border border-gold-800/60 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Unrestricted Biosphere Lab</span>
              <h2 className="text-xl font-black text-white mt-0.5">Ecological Sandbox & Multi-Variable Simulator</h2>
              <p className="text-xs text-slate-300 mt-1">
                Freely cross-modulate all 5 planetary drivers. Discover feedback loops before taking the graded challenges!
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Challenges"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-xl shadow-emerald-950 whitespace-nowrap"
            >
              Ready for Challenges! 🚀
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400">1. Forest & Biodiversity</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Fragmentation:</span>
                  <span className="font-mono text-white">{fragmentationLevel}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={fragmentationLevel}
                  onChange={(e) => setFragmentationLevel(Number(e.target.value))}
                  aria-label="Sandbox fragmentation level"
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Lantana Invasion:</span>
                  <span className="font-mono text-white">{invasiveLantanaDensity}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={invasiveLantanaDensity}
                  onChange={(e) => setInvasiveLantanaDensity(Number(e.target.value))}
                  aria-label="Sandbox Lantana invasion"
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400">2. Atmosphere & Climate</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Atmospheric CO₂:</span>
                  <span className="font-mono text-white">{atmosphericCO2Ppm} ppm</span>
                </div>
                <input
                  type="range"
                  min={280}
                  max={800}
                  value={atmosphericCO2Ppm}
                  onChange={(e) => setAtmosphericCO2Ppm(Number(e.target.value))}
                  aria-label="Sandbox atmospheric CO2"
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Fertilizer Runoff:</span>
                  <span className="font-mono text-white">{agriculturalFertilizerInput}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={agriculturalFertilizerInput}
                  onChange={(e) => setAgriculturalFertilizerInput(Number(e.target.value))}
                  aria-label="Sandbox fertilizer runoff"
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400">3. Handprint Solutions</span>
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Circular Economy 5Rs:</span>
                  <span className="font-mono text-white">{circularEconomyAdoption}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={circularEconomyAdoption}
                  onChange={(e) => setCircularEconomyAdoption(Number(e.target.value))}
                  aria-label="Sandbox circular economy"
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center">
                <span className="text-xs text-slate-400 block">Overall Handprint Index</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{handprintScore} / 100</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 4: ADAPTIVE COMPETENCY CHALLENGES */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border-rose-800'
                      : 'bg-gold-950 text-gold-400 border-gold-800'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
                <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60 uppercase">
                  {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-xs">
                <span className="text-slate-400 block">BKT Mastery Level</span>
                <span className="font-bold text-emerald-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="w-24 bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.3 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-xl shadow-rose-950'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, optIdx) => (
                  <motion.button
                    key={optIdx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(optIdx)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${optIdx + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      showExplanation && optIdx === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 border-slate-700 text-slate-200 hover:bg-slate-750 hover:border-emerald-600/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-slate-700/60 text-slate-300">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center font-bold mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      role="button"
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <svg viewBox="0 0 400 220" className="w-full bg-slate-950 rounded-xl border border-slate-800">
                  <rect x="20" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="4,2" />
                  <text x="100" y="45" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Highway Corridor Zone</text>
                  <text x="100" y="65" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                    {droppedLabels.zone_highway || '[Drop Label Here]'}
                  </text>
                  <rect x="20" y="20" width="160" height="70" fill="transparent"
                    onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('zone_highway')} style={{ cursor: 'pointer' }} />

                  <rect x="220" y="20" width="160" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="4,2" />
                  <text x="300" y="45" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Forest Undergrowth Zone</text>
                  <text x="300" y="65" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                    {droppedLabels.zone_forest_floor || '[Drop Label Here]'}
                  </text>
                  <rect x="220" y="20" width="160" height="70" fill="transparent"
                    onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('zone_forest_floor')} style={{ cursor: 'pointer' }} />

                  <rect x="20" y="120" width="160" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="4,2" />
                  <text x="100" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Freshwater Reservoir</text>
                  <text x="100" y="165" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                    {droppedLabels.zone_lake || '[Drop Label Here]'}
                  </text>
                  <rect x="20" y="120" width="160" height="70" fill="transparent"
                    onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('zone_lake')} style={{ cursor: 'pointer' }} />

                  <rect x="220" y="120" width="160" height="70" rx="8" fill="#1e293b" stroke="#475569" strokeDasharray="4,2" />
                  <text x="300" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Chemical Industrial Pipe</text>
                  <text x="300" y="165" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">
                    {droppedLabels.zone_factory || '[Drop Label Here]'}
                  </text>
                  <rect x="220" y="120" width="160" height="70" fill="transparent"
                    onDragOver={(e) => e.preventDefault()} onDrop={() => handleDragDrop('zone_factory')} style={{ cursor: 'pointer' }} />
                </svg>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Dropped Labels"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-950"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to re-order the steps chronologically:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, sIndex) => (
                    <motion.div
                      key={sIndex}
                      draggable
                      onDragStart={() => handleDragStart(String(sIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, sIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Sort step ${sIndex + 1}: ${item}`}
                      role="button"
                      className="p-3 bg-slate-800 rounded-xl text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-3 cursor-grab active:cursor-grabbing"
                    >
                      <span className="font-bold px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded">
                        {sIndex + 1}
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
                  aria-label="Submit Sorted Order"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-950"
                >
                  Submit Ordered Sequence
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
                    placeholder="Enter numerical answer"
                    aria-label="Numerical input field"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numerical calculation"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950"
                  >
                    Calculate & Check
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((cp, cpIdx) => (
                    <span key={cpIdx} className="px-3 py-1 bg-emerald-900/80 border border-emerald-700 text-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
                      {cp}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== cpIdx))} className="text-rose-400 hover:text-rose-200">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click blocks above to construct the formula statement</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Check Constructed Statement"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-950"
                >
                  Verify Constructed Statement
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-emerald-950/40 border border-emerald-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Scientific Solution Steps
                  </span>
                </div>

                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, sIdx) => (
                  <motion.p
                    key={sIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="font-bold text-emerald-400 mr-1.5">{sIdx + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next step of explanation"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next Challenge"
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission 🏁' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-gold-950 rounded-3xl border border-emerald-700 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🌟</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Accomplished!</h2>
            <p className="text-sm text-emerald-300 max-w-xl mx-auto">
              You have systematically analyzed the drivers of the triple planetary crisis, verified biological cascading dynamics, and synthesized SDG handprint actions.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-emerald-800/80 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-emerald-800/80 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Mastery Level</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/50 text-xs text-emerald-200">
            <p className="font-bold text-sm text-emerald-300 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-slate-300">
              {errors === 0
                ? 'Flawless grasp of ecosystem fragmentation, carbon chemistry, eutrophication stages, and SDG 5R principles.'
                : errors <= 3
                ? 'You understand the key mechanisms clearly. Review the handprint metrics below for exam perfection.'
                : errors <= 7
                ? 'You are connecting ecological causes to outcomes. Revisit your flagged misconceptions below.'
                : 'Review the foundational concepts and try the interactive labs again to master the material!'}
            </p>
          </div>

          {/* SPACED REPETITION SCHEDULE VISIBILITY */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950 rounded-2xl border border-gold-800/60 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <span className="font-bold text-white text-sm">Spaced Repetition System (SRS) Schedule</span>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gold-900/80 text-gold-300 border border-gold-700">
                SM-2 Active
              </span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-300">
                  Optimal memory retention interval calculated from your performance ({errors} mistakes):
                </p>
                <p className="text-lg font-black text-emerald-400 mt-1">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </p>
              </div>
              <div className="text-xs text-slate-400 text-right">
                <p>Next mastery check: <span className="text-white font-mono font-bold">
                  {new Date(Date.now() + (errors === 0 ? 7 : errors <= 3 ? 3 : 1) * 86400000).toLocaleDateString()}
                </span></p>
                <p className="text-emerald-400">Streak booster: +25 XP upon return</p>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💭</span>
              <h3 className="text-lg font-bold text-white">Student Self-Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">
              Deepen your learning consolidation by reflecting on these core scientific connections:
            </p>

            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g., How specialist wasps vanish through co-extinction even if only the fig tree is cut..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explanation}
                  onChange={(e) => setReflectionResponses(r => ({ ...r, explanation: e.target.value }))}
                  placeholder="e.g., Ecological footprint is damage done, while handprint is active healing like composting and solar..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g., Auditing our school electricity bills, replacing incandescent lamps with LEDs, and starting a native garden plot..."
                  rows={2}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Targeted Conceptual Clarifications:</h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions[mIdx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</p>
                    <p className="text-emerald-300">✓ ICSE Clarification: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Real-World Handprint Charter</span>
            <h3 className="text-lg font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* FEEDBACK OVERLAYS */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Ecosystem Milestone Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}

export default C9_EVSBiodiversityLossCausesSim;