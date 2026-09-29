'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS (MANDATORY VERIFICATION) ───
const NODE_C11_EVS_011 = 'c11_evs_011'; // Habitats and niches - Gause's competitive exclusion principle
const NODE_C11_EVS_012 = 'c11_evs_012'; // Flow of energy - photosynthetic, trophic, assimilation efficiencies
const NODE_C11_EVS_013 = 'c11_evs_013'; // Nutrient cycles - carbon and nitrogen cycles
const NODE_C11_EVS_014 = 'c11_evs_014'; // Biomes - terrestrial, freshwater, marine, Indian biomes
const NODE_C11_EVS_015 = 'c11_evs_015'; // Disruption of nutrient cycles and habitats
const NODE_C11_EVS_016 = 'c11_evs_016'; // Pollution control approaches - prevention and control
const NODE_C11_EVS_017 = 'c11_evs_017'; // Air pollution - sources, effects, control
const NODE_C11_EVS_018 = 'c11_evs_018'; // Water pollution - surface, ground, ocean, industrial
const NODE_C11_EVS_019 = 'c11_evs_019'; // Soil and noise pollution - sources and control
const NODE_C11_EVS_020 = 'c11_evs_020'; // National legislative frameworks for environment protection

const ALL_NODE_IDS = [
  NODE_C11_EVS_011,
  NODE_C11_EVS_012,
  NODE_C11_EVS_013,
  NODE_C11_EVS_014,
  NODE_C11_EVS_015,
  NODE_C11_EVS_016,
  NODE_C11_EVS_017,
  NODE_C11_EVS_018,
  NODE_C11_EVS_019,
  NODE_C11_EVS_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Wetland Ecological Crisis: Loktak Lake Under Siege',
  intro: 'Loktak Lake in Manipur, a Ramsar wetland and home to the endangered Sangai deer (brow-antlered deer), is facing catastrophic ecological collapse. Competing invasive species have crowded out native flora, fertilizer runoff from nearby agricultural fields has triggered explosive eutrophication and hypoxic dead zones, and rising siltation and sewage discharge are collapsing trophic energy flow.',
  context: 'As the Principal Scientific Advisor to the State Environmental Assessment Authority and National Green Tribunal, you must investigate the ecological dynamics: simulate Gause competitive exclusion, balance trophic energy efficiencies, map disrupted nitrogen/carbon cycles, diagnose pollution vectors, and deploy statutory legal frameworks under Indian Environmental Law.',
};

// ─── DISCOVERY QUESTION HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In Loktak Lake, two species of floating aquatic herbivores occupy the exact same spatial niche and feed exclusively on the same microscopic green algae. What will happen to their populations over long-term coexistence without resource partitioning?',
  options: [
    'Both species will reach a harmonious population equilibrium of 50% each',
    'One species will inevitably outcompete and competitively exclude the other to local extinction (Gause\'s Principle)',
    'Both species will suddenly mutate instantly into carnivores within one generation',
    'Their total carrying capacity will double to accommodate both equally',
  ],
  correctIndex: 1,
  hintAfter: 'Don\'t worry if you were unsure — let\'s explore how Gause\'s Principle and niche overlap govern ecosystem dynamics!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // Foundation 1: Niche vs Habitat (c11_evs_011) - Recall
  {
    id: 'ch_001_f_niche',
    nodeId: NODE_C11_EVS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a deciduous forest of Madhya Pradesh, the Hanuman langur browses high canopy leaves while the chital (spotted deer) grazes fallen foliage and grasses on the ground. How are their habitat and ecological niche defined?',
    options: [
      'They share the same habitat (deciduous forest) but occupy distinct ecological niches (canopy browser vs ground grazer)',
      'They occupy distinct habitats and identical ecological niches',
      'Habitat and niche are completely identical synonyms meaning geographical address',
      'They violate Gause\'s principle because two animals can never live in the same forest',
    ],
    correctIndex: 0,
    explanation: 'A habitat is the physical address where an organism lives, whereas an ecological niche is its functional role or profession. Langurs and chitals share the forest habitat but avoid competition by occupying different spatial and dietary niches.',
    hints: [
      'Think of habitat as the address and niche as the profession.',
      'Do both species live in the same forest? Yes. Do they eat the exact same food at the same height? No.',
      'Langurs feed high in the canopy while chital graze on the ground, so their roles differ.',
    ],
    misconceptionIndex: 0,
  },
  // Foundation 2: Lindeman 10% Law calculation (c11_evs_012) - Application
  {
    id: 'ch_002_f_lindeman',
    nodeId: NODE_C11_EVS_012,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a grassland biome, primary producers (grasses) synthesize 25,000 kJ of Net Primary Production (NPP). According to Lindeman\'s 10% Trophic Efficiency Law, calculate the energy transferred to secondary consumers (primary carnivores in kJ).',
    correctAnswer: 250,
    tolerance: 0,
    unit: 'kJ',
    explanation: 'By Lindeman\'s 10% law: Producers = 25,000 kJ → Primary Consumers (Herbivores) = 10% of 25,000 = 2,500 kJ → Secondary Consumers (Carnivores) = 10% of 2,500 = 250 kJ.',
    hints: [
      'Each trophic level transfer retains approximately 10% of the energy of the level below it.',
      'First calculate primary consumers: 25,000 kJ × 0.10 = 2,500 kJ.',
      'Now calculate secondary consumers: 2,500 kJ × 0.10 = 250 kJ.',
    ],
  },
  // Foundation 3: Nitrogen Cycle Bacteria Matching (c11_evs_013) - Recall
  {
    id: 'ch_003_f_nitro_drag',
    nodeId: NODE_C11_EVS_013,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the specific bacterial agent to its correct stage in the biochemical nitrogen cycle.',
    dragItems: [
      { label: 'Rhizobium (in legume nodules)', targetId: 'target_fixation' },
      { label: 'Nitrosomonas (NH3 to NO2-)', targetId: 'target_nitrite' },
      { label: 'Nitrobacter (NO2- to NO3-)', targetId: 'target_nitrate' },
      { label: 'Pseudomonas denitrificans (NO3- to N2)', targetId: 'target_denitrification' },
    ],
    correctMapping: {
      target_fixation: 'Rhizobium (in legume nodules)',
      target_nitrite: 'Nitrosomonas (NH3 to NO2-)',
      target_nitrate: 'Nitrobacter (NO2- to NO3-)',
      target_denitrification: 'Pseudomonas denitrificans (NO3- to N2)',
    },
    explanation: 'Rhizobium performs biological nitrogen fixation. Nitrosomonas oxidizes ammonia to nitrite, Nitrobacter oxidizes nitrite to nitrate, and Pseudomonas denitrificans returns nitrate back to inert N2 gas.',
    hints: [
      'Fixation starts in legume root nodules with symbiotic bacteria.',
      'Nitrification is a two-step oxidation: first Nitrosomonas produces nitrite, then Nitrobacter produces nitrate.',
      'Denitrification is executed by Pseudomonas denitrificans, returning nitrogen gas to the atmosphere.',
    ],
    misconceptionIndex: 1,
  },
  // Foundation 4: Lake Zones (c11_evs_014) - Understanding
  {
    id: 'ch_004_f_lakezones',
    nodeId: NODE_C11_EVS_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a freshwater lentic ecosystem such as Loktak Lake, which horizontal and vertical zone is defined as the deep, dark, cold bottom region beyond effective light penetration where decomposition dominates?',
    options: [
      'Littoral zone (shallow sunlit shore with rooted vegetation)',
      'Limnetic zone (open sunlit surface water with phytoplankton)',
      'Profundal zone (deep dark bottom layer with low DO and active decomposers)',
      'Pelagic photic zone',
    ],
    correctIndex: 2,
    explanation: 'The profundal zone lies beneath the light compensation level where respiration exceeds photosynthesis, leaving it dark, cold, and dominated by benthic microbial decomposers and detritivores.',
    hints: [
      'The littoral zone is the shallow shore, and the limnetic zone is the open sunlit water.',
      'Think about the deep, lightless layer where organic matter sinks and decays.',
      'This zone is known as the profundal zone.',
    ],
  },
  // Foundation 5: Acid Rain Chemistry (c11_evs_017) - Recall
  {
    id: 'ch_005_f_acidrain',
    nodeId: NODE_C11_EVS_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Normal unpolluted rainwater has a pH of ~5.6 due to dissolved atmospheric CO2 forming weak carbonic acid. At what strict pH threshold is precipitation scientifically classified as Acid Rain?',
    options: [
      'pH strictly below 5.6 caused by H2SO4 and HNO3 from SO2 and NOx emissions',
      'pH strictly below 7.0 (any neutral to acidic moisture)',
      'pH between 6.0 and 6.8',
      'pH above 8.5 due to basic industrial limestone dust',
    ],
    correctIndex: 0,
    explanation: 'Acid rain is strictly defined as precipitation with a pH below 5.6. It is caused by industrial emissions of sulphur dioxide (SO2) and nitrogen oxides (NOx) dissolving to form strong sulphuric (H2SO4) and nitric (HNO3) acids.',
    hints: [
      'Normal clean rain is already slightly acidic at pH 5.6 due to carbonic acid.',
      'Acid rain occurs only when stronger industrial acids push the pH below that baseline.',
      'The threshold is pH below 5.6.',
    ],
    misconceptionIndex: 2,
  },
  // Foundation 6: Decibel Permissible Limits (c11_evs_019) - Recall
  {
    id: 'ch_006_f_noise_limits',
    nodeId: NODE_C11_EVS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Noise Pollution (Regulation and Control) Rules 2000 in India, what are the permissible daytime ambient noise limits for Residential and Industrial zones respectively?',
    options: [
      '55 dB(A) for Residential zones and 75 dB(A) for Industrial zones',
      '40 dB(A) for Residential zones and 50 dB(A) for Industrial zones',
      '75 dB(A) for Residential zones and 90 dB(A) for Industrial zones',
      '30 dB(A) for Residential zones and 60 dB(A) for Industrial zones',
    ],
    correctIndex: 0,
    explanation: 'The Noise Rules 2000 prescribe daytime standards: Industrial Area = 75 dB(A), Commercial Area = 65 dB(A), Residential Area = 55 dB(A), and Silence Zone = 50 dB(A).',
    hints: [
      'Residential daytime limit is set at 55 decibels to prevent cognitive and sleep distress.',
      'Industrial zones permit heavier machinery sound up to 75 decibels during working hours.',
      'Select the 55 dB(A) / 75 dB(A) combination.',
    ],
  },
  // Foundation 7: Constitutional Articles (c11_evs_020) - Understanding
  {
    id: 'ch_007_f_const_articles',
    nodeId: NODE_C11_EVS_020,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Distinguish between Article 48A and Article 51A(g) of the Constitution of India regarding environmental governance.',
    options: [
      'Article 48A directs the State to protect/improve environment and safeguard forests/wildlife, while Article 51A(g) casts a Fundamental Duty upon every citizen',
      'Article 48A is a citizen\'s fundamental right, while 51A(g) is a penal code for corporations',
      'Article 48A creates the Supreme Court, while 51A(g) establishes municipal corporation taxes',
      'Both articles are identical enforceable commercial trade tariffs',
    ],
    correctIndex: 0,
    explanation: 'Article 48A (Part IV, Directive Principle) mandates that the State shall endeavour to protect and improve the environment. Article 51A(g) (Part IVA, Fundamental Duty) mandates that every citizen shall protect nature including forests, lakes, rivers, and wildlife.',
    hints: [
      'Part IV contains Directive Principles for the State (Government).',
      'Part IVA contains Fundamental Duties for individual citizens.',
      'Article 48A is for the State; Article 51A(g) is for every Indian citizen.',
    ],
    misconceptionIndex: 3,
  },

  // Standard 8: Eutrophication Sequence (c11_evs_015 / c11_evs_018) - Analysis
  {
    id: 'ch_008_s_eutro_sort',
    nodeId: NODE_C11_EVS_015,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential biochemical steps of Cultural Eutrophication leading to mass aquatic mortality in proper chronological order.',
    sortItems: [
      'Agricultural runoff enriches water body with excessive Nitrates and Phosphates',
      'Explosive algal bloom covers water surface, intercepting solar light',
      'Submerged macrophytes die due to lack of light penetration; algal bloom collapses',
      'Aerobic microbial decomposers multiply, depleting Dissolved Oxygen (DO < 2-4 mg/L)',
      'Hypoxic dead zone forms, leading to asphyxiation and mass fish kills',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Eutrophication begins with nutrient loading (nitrates/phosphates) -> algal bloom -> shading out of submerged plants -> massive microbial decomposition -> critical dissolved oxygen depletion -> suffocating fish and creating dead zones.',
    hints: [
      'The process always starts on the land with agricultural fertilizer runoff.',
      'Algae multiply on the surface before decomposing bacteria consume the dissolved oxygen.',
      'Fish die at the very end because of severe oxygen starvation (hypoxia), not direct poison.',
    ],
    misconceptionIndex: 4,
  },
  // Standard 9: Assimilation Efficiency Carnivore vs Herbivore (c11_evs_012) - Analysis
  {
    id: 'ch_009_s_assim_eff',
    nodeId: NODE_C11_EVS_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the assimilation efficiency of a carnivorous Bengal tiger (~80%) more than double that of a herbivorous Chital deer (~30-40%)?',
    options: [
      'Animal meat/protein is far more digestible and biochemically similar to animal tissue, whereas plant cellulose is fibrous, refractory, and mostly excreted in faeces',
      'Carnivores possess multiple rumination stomachs while herbivores have simple single guts',
      'Herbivores burn all assimilated food as metabolic body heat',
      'Carnivores violate the first law of thermodynamics by creating chemical energy',
    ],
    correctIndex: 0,
    explanation: 'Assimilation efficiency = (Assimilated Energy / Ingested Energy) × 100. Plant food contains tough cellulose and lignin that is hard to digest without specialized symbionts and is largely voided as dung. Meat is rich in easily cleaved proteins and lipids, enabling ~80% assimilation.',
    hints: [
      'Look at the biochemical composition of meat versus plant cell walls (cellulose).',
      'Cellulose is difficult to break down, so a high percentage of plant intake passes out in dung.',
      'Meat proteins and fats are readily broken down and absorbed across the gut wall.',
    ],
  },
  // Standard 10: Prevention vs Control in Fossil Fuel Power Plants (c11_evs_016) - Application
  {
    id: 'ch_010_s_prev_ctrl_match',
    nodeId: NODE_C11_EVS_016,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 1000 MW coal thermal power plant in Singrauli needs to cut its atmospheric emissions. Categorize the engineering interventions into Prevention (Source Reduction) vs End-of-Pipe Control.',
    options: [
      'Prevention: Washing coal / solar co-firing; Control: Electrostatic Precipitators (ESP) & Flue Gas Desulphurisation (FGD)',
      'Prevention: Catalytic converters & ESP; Control: Switching entirely to nuclear/solar power',
      'Prevention: Baghouse filters & limestone scrubbers; Control: Pre-combustion coal gasification',
      'Prevention and control are identical engineering terms with zero functional difference',
    ],
    correctIndex: 0,
    explanation: 'Prevention eliminates or minimizes pollutant generation at source (coal beneficiation/washing, fuel substitution, renewable power). Control treats pollutants already generated in the combustion gas before atmospheric venting (ESPs for fly ash, wet FGD scrubbers for SO2).',
    hints: [
      'Prevention stops the pollutant from ever forming (changing fuel or process).',
      'Control catches the formed pollutant in the smokestack (end-of-pipe device).',
      'Coal washing/solar is prevention; ESP and FGD scrubbers are end-of-pipe control.',
    ],
  },
  // Standard 11: Bhopal Gas Tragedy & Environmental Protection Act 1986 (c11_evs_020) - Understanding
  {
    id: 'ch_011_s_bhopal_epa',
    nodeId: NODE_C11_EVS_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'The catastrophic methyl isocyanate (MIC) gas disaster at Union Carbide Bhopal (December 1984) directly prompted the Parliament of India to enact which landmark "umbrella" environmental legislation in 1986?',
    options: [
      'Environment (Protection) Act, 1986 — designed to close regulatory gaps across air, water, and industrial chemical safety',
      'Water (Prevention and Control of Pollution) Act, 1974',
      'Air (Prevention and Control of Pollution) Act, 1981',
      'Biological Diversity Act, 2002',
    ],
    correctIndex: 0,
    explanation: 'The Bhopal disaster exposed severe limitations in sector-specific laws (Water Act 1974, Air Act 1981). Parliament enacted the Environment (Protection) Act 1986 as an umbrella statute giving the Central Government direct plenary powers over hazardous industrial substances and ambient environmental standards.',
    hints: [
      'Sector-specific laws for water (1974) and air (1981) predated the disaster.',
      'The disaster occurred in December 1984, prompting an umbrella act two years later in 1986.',
      'This law is the Environment (Protection) Act, 1986.',
    ],
  },
  // Standard 12: Inverted Biomass Pyramid in Freshwater Lake (c11_evs_012) - Evaluation
  {
    id: 'ch_012_s_inverted_pyramid',
    nodeId: NODE_C11_EVS_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In a freshwater pond or marine ecosystem, the pyramid of biomass is frequently inverted (standing phytoplankton biomass < zooplankton biomass). Why does the corresponding Pyramid of Energy ALWAYS remain strictly upright?',
    options: [
      'Energy transfer obeys the Second Law of Thermodynamics (heat loss at every transfer); phytoplankton have a high turnover rate so cumulative productivity over time exceeds zooplankton',
      'Zooplankton create their own nuclear energy to sustain phytoplankton',
      'The pyramid of energy is also inverted in ponds because carnivores feed producers',
      'Standing crop biomass is an energy flux measurement rather than an instantaneous weight snapshot',
    ],
    correctIndex: 0,
    explanation: 'Standing crop biomass is a static snapshot: microscopic phytoplankton reproduce and turn over rapidly to support heavier zooplankton. Energy flux, however, is dynamic and unidirectional: energy degrades to unusable heat at each trophic step, ensuring the Energy Pyramid is ALWAYS upright.',
    hints: [
      'Biomass is an instantaneous snapshot of standing crop weight.',
      'Energy flow measures productivity over time and obeys the second law of thermodynamics.',
      'Rapid turnover in phytoplankton allows high energy production despite tiny standing mass.',
    ],
  },
  // Standard 13: Ground Water Contamination in India (c11_evs_018) - Application
  {
    id: 'ch_013_s_groundwater_tox',
    nodeId: NODE_C11_EVS_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A rural community in West Bengal and adjoining Bangladesh draws drinking water from deep alluvial tubewells and develops hyperkeratosis (skin lesions) and black foot disease. What is the geological pollutant responsible?',
    options: [
      'Arsenic (naturally leached from aquifer mineral strata under altered redox conditions)',
      'Fluoride (causing dental and skeletal fluorosis in arid Rajasthan)',
      'Cadmium (causing Itai-Itai bone softening from zinc smelters)',
      'Methylmercury (causing neurological Minamata disease)',
    ],
    correctIndex: 0,
    explanation: 'Arsenic contamination in the Bengal alluvial basin is a natural geogenic disaster where deep tubewells tap arsenic-rich strata, causing chronic arsenicosis, skin keratosis, and internal cancers.',
    hints: [
      'Fluoride causes crippling bone/teeth damage, typical of Rajasthan.',
      'Mercury is industrial (Minamata), Cadmium causes Itai-Itai.',
      'Arsenic in deep tubewells in Bengal and Bangladesh causes black foot disease and skin lesions.',
    ],
  },
  // Standard 14: Delhi GRAP and Smog Construction (c11_evs_017) - Construct
  {
    id: 'ch_014_s_grap_construct',
    nodeId: NODE_C11_EVS_017,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Build the multi-tiered response protocol for Delhi\'s winter air crisis under the Graded Response Action Plan (GRAP Stage-IV: Severe+ AQI > 450).',
    availableParts: [
      'Ban Entry of Non-Essential Diesel Trucks',
      'Halt All Linear Construction & Demolition',
      'Implement Work-From-Home / School Online Mode',
      'Deploy Smog Guns and Mechanized Road Sweeping',
    ],
    targetState: 'Ban Entry of Non-Essential Diesel Trucks Halt All Linear Construction & Demolition Implement Work-From-Home / School Online Mode Deploy Smog Guns and Mechanized Road Sweeping',
    validationHint: 'Add all four emergency containment measures in sequence to activate Stage-IV emergency protocols.',
    explanation: 'GRAP Stage-IV represents emergency red alert: non-essential diesel commercial vehicles are barred, all construction ceases, online classes/remote work are enforced, and emergency dust suppression operates.',
    hints: [
      'Click all four critical emergency containment interventions.',
      'Stage-IV requires stopping heavy vehicle emissions, construction dust, public exposure, and active dust suppression.',
      'Assemble all parts into the active emergency plan.',
    ],
  },

  // Advanced 15: Character Displacement vs Resource Partitioning (c11_evs_011) - Analysis
  {
    id: 'ch_015_a_char_disp',
    nodeId: NODE_C11_EVS_011,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare MacArthur\'s warbler coexistence with Darwin\'s Galápagos finch beak morphology. Which accurately differentiates Resource Partitioning from Character Displacement?',
    options: [
      'Resource partitioning is a behavioural/ecological division of resources in ecological time; Character displacement is an evolutionary/morphological divergence in genetic traits over generations',
      'Resource partitioning causes immediate extinction; Character displacement prevents all competition without evolution',
      'Resource partitioning only occurs in aquatic biomes; Character displacement only occurs in laboratory culture tubes',
      'Both terms represent the identical biological phenomenon with no timescale distinction',
    ],
    correctIndex: 0,
    explanation: 'MacArthur\'s 5 warbler species partitioned one spruce tree by foraging at different branch heights (behavioural/ecological). Darwin\'s finches on sympatric islands evolved distinct beak depths to feed on different seed sizes (evolutionary character displacement).',
    hints: [
      'Consider the timescale: one is behavioral/ecological (immediate), the other is evolutionary/genetic (generations).',
      'Warblers feeding at different tree heights do not change their skeleton or genes.',
      'Finches evolving larger or smaller beaks exhibit physical character displacement.',
    ],
  },
  // Advanced 16: Polluter Pays & Precautionary Principles (c11_evs_020) - Evaluation
  {
    id: 'ch_016_a_vellore_ruling',
    nodeId: NODE_C11_EVS_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Vellore Citizens Welfare Forum v. Union of India (1996), the Supreme Court ruled against untreated tannery effluent polluting agricultural land in Tamil Nadu. What legal jurisprudence was established?',
    options: [
      'The "Precautionary Principle" and the "Polluter Pays Principle" are essential features of Sustainable Development and part of the environmental law of the land under Article 21',
      'Industrial profits take absolute precedence over groundwater cleanliness',
      'Tanneries are exempt from effluent treatment if they export leather',
      'Only the central exchequer and taxpayers must bear the financial cost of industrial toxic cleanup',
    ],
    correctIndex: 0,
    explanation: 'The Supreme Court held that the Polluter Pays Principle mandates the financial cost of preventing, repairing ecological damage, and compensating victims falls entirely on the polluting industry, not the state or public.',
    hints: [
      'Who should pay for ecological restoration when a factory pollutes a river?',
      'The ruling held that the polluting entity must bear full remediation and compensation costs.',
      'This established the Polluter Pays and Precautionary Principles under Article 21.',
    ],
  },
  // Advanced 17: Phytoremediation and Bioremediation Bio-Mechanisms (c11_evs_019) - Application
  {
    id: 'ch_017_a_phytorem',
    nodeId: NODE_C11_EVS_019,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match the hyperaccumulating bio-agent with its targeted heavy metal pollutant remediation application.',
    options: [
      'Sunflowers (Helianthus annuus) for Chromium/Radionuclides & Pteris vittata (brake fern) for Arsenic hyperaccumulation',
      'Cacti for Mercury & Water hyacinth for Radioactive Plutonium only',
      'Pine trees for lead gas & Earthworms for solid plastic degradation only',
      'All heavy metals can only be remediated by boiling topsoil at 1500°C',
    ],
    correctIndex: 0,
    explanation: 'Sunflowers hyperaccumulate toxic Chromium from mine tailings and soils; the brake fern (Pteris vittata) hyperaccumulates Arsenic from contaminated soils into its fronds without toxicity symptoms.',
    hints: [
      'Sunflowers are used near Odisha chromite mines for chromium uptake.',
      'The brake fern Pteris vittata is renowned for soaking up arsenic.',
      'Select the Sunflower-Chromium and Pteris-Arsenic pair.',
    ],
  },
  // Advanced 18: Haber-Bosch and Nitrogen Cycle Disruption (c11_evs_013 / c11_evs_015) - Analysis
  {
    id: 'ch_018_a_haber_bosch',
    nodeId: NODE_C11_EVS_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Industrial fixation of nitrogen via the Haber-Bosch process now fixes ~150 Tg N/year, surpassing all natural biological terrestrial fixation combined. What are the twin planetary disruptions resulting from this imbalance?',
    options: [
      'Widespread aquatic eutrophication/dead zones and increased atmospheric emissions of nitrous oxide (N2O, a GHG 300x more potent than CO2 and an ozone-depleting substance)',
      'Complete depletion of all atmospheric nitrogen within 50 years',
      'Instant cooling of the troposphere into an ice age',
      'Immediate extinction of all legume plants across the planet',
    ],
    correctIndex: 0,
    explanation: 'Synthetic fertilizer surplus causes massive aquatic eutrophication via runoff, and accelerated denitrification in waterlogged soils releases Nitrous Oxide (N2O) — a greenhouse gas with 300x the global warming potential of CO2 that also catalytically destroys stratospheric ozone.',
    hints: [
      'Think about where excess nitrogen fertiliser ends up: in water bodies and in the atmosphere.',
      'In water, runoff creates algal blooms and dead zones.',
      'In soil and air, microbial denitrification produces N2O, a potent greenhouse gas.',
    ],
  },
  // Advanced 19: PCB Biomagnification & Stockholm Convention (c11_evs_016) - Analysis
  {
    id: 'ch_019_a_pcb_biomag',
    nodeId: NODE_C11_EVS_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In an aquatic food web contaminated with persistent Polychlorinated Biphenyls (PCBs), the ambient water concentration is 0.00005 ppm. If phytoplankton bioaccumulate PCBs to 0.05 ppm and the biomagnification factor at each subsequent trophic step (Zooplankton → Small Fish → Apex Osprey) is 10x, what is the final PCB concentration in the Osprey (in ppm)?',
    correctAnswer: 50,
    tolerance: 0.1,
    unit: 'ppm',
    explanation: 'Phytoplankton = 0.05 ppm → Zooplankton (10x) = 0.5 ppm → Small Fish (10x) = 5.0 ppm → Apex Osprey (10x) = 50.0 ppm. From water (0.00005 ppm) to Osprey (50 ppm) is a 1,000,000-fold biomagnification!',
    hints: [
      'Start at phytoplankton: 0.05 ppm.',
      'Step 1 (Zooplankton): 0.05 × 10 = 0.5 ppm.',
      'Step 2 (Small Fish): 0.5 × 10 = 5.0 ppm.',
      'Step 3 (Apex Osprey): 5.0 × 10 = 50.0 ppm.',
    ],
  },
  // Advanced 20: Fundamental vs Realised Niche & Competitive Release (c11_evs_011) - Evaluation
  {
    id: 'ch_020_a_comp_release',
    nodeId: NODE_C11_EVS_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When invasive Water Hyacinth (Eichhornia crassipes) is completely eradicated from a sector of Loktak Lake, native submerged macrophytes (Vallisneria and Hydrilla) rapidly expand their spatial range and depth distribution. This ecological phenomenon is termed:',
    options: [
      'Competitive Release (expansion of a species from its constrained realised niche toward its broader fundamental niche upon competitor removal)',
      'Character Displacement (evolutionary mutation of gene alleles)',
      'Biomagnification of trophic toxins',
      'Cultural Eutrophication',
    ],
    correctIndex: 0,
    explanation: 'Competitive release occurs when a dominant interspecific competitor is removed, allowing the suppressed native species to expand its realized niche back toward its full physiological fundamental niche.',
    hints: [
      'The competitor is removed and the suppressed species expands its occupied territory.',
      'The species is moving from its restricted realised niche back toward its fundamental niche.',
      'This expansion upon competitor removal is called Competitive Release.',
    ],
  },
  // Advanced 21: Environmental Impact Assessment 2006 Notification (c11_evs_020) - Analysis
  {
    id: 'ch_021_a_eia_order',
    nodeId: NODE_C11_EVS_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the mandatory statutory stages of the Environmental Clearance process under India\'s EIA Notification 2006 in strict legal sequence.',
    sortItems: [
      'Screening (Categorization of Category B projects into B1 requiring EIA or B2 exempt)',
      'Scoping (Determination of comprehensive Terms of Reference / ToR by EAC)',
      'Public Consultation (Mandatory public hearings in affected district & local stakeholder inputs)',
      'Appraisal (Detailed scientific scrutiny of final EIA and EMP by Expert Appraisal Committee)',
      'Grant or Rejection of Environmental Clearance by MoEFCC / SEIAA',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Under EIA Notification 2006, the statutory 4-stage process is: Stage 1 Screening -> Stage 2 Scoping -> Stage 3 Public Consultation -> Stage 4 Appraisal -> Final Decision by Regulatory Authority.',
    hints: [
      'The process always begins by screening project category (A vs B1/B2).',
      'Scoping defines the Terms of Reference before public consultation.',
      'Appraisal by the Expert Committee follows public consultation and leads to the final clearance grant/rejection.',
    ],
  },
  // Advanced 22: Biome Climate Climatogram Matching (c11_evs_014) - Creativity
  {
    id: 'ch_022_a_biome_matrix',
    nodeId: NODE_C11_EVS_014,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Match each Indian Biome with its diagnostic precipitation, characteristic flora, and endemic keystone fauna.',
    options: [
      'Western Ghats: Rainfall >200 cm, Dipterocarpus & Hopea, Lion-tailed Macaque | Sundarbans: Tidal delta, Heritiera (Sundari) with pneumatophores, Royal Bengal Tiger | Thar: Rainfall <25 cm, Thorny Acacia & Prosopis, Great Indian Bustard',
      'Western Ghats: Rainfall <20 cm, Cacti, Snow Leopard | Sundarbans: Alpine tundra, Lichens, Nilgiri Tahr | Thar: Rainfall >300 cm, Teak, Gangetic Dolphin',
      'Himalayan Alpine: Rainfall 400 cm, Mangroves, Indian Rhinoceros | Gangetic Plains: Desert sand, Lichens, Lion-tailed macaque',
      'All Indian biomes have identical rainfall of 100 cm and identical vegetation',
    ],
    correctIndex: 0,
    explanation: 'Western Ghats are tropical wet evergreen (>200 cm rain, Lion-tailed macaque); Sundarbans are tidal mangrove deltas (Sundari trees with pneumatophores, Bengal Tiger); Thar is hot arid desert (<25 cm rain, Acacia, Great Indian Bustard).',
    hints: [
      'Western Ghats receive heavy monsoon rainfall (>200 cm) and harbour the endemic Lion-tailed Macaque.',
      'Sundarbans mangroves feature breathing roots (pneumatophores) and Bengal tigers.',
      'Thar desert receives under 25 cm of rain with xerophytic thorny trees.',
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_EVS_011,
  title: 'Ecosystem Dynamics, Pollution Vectors & Environmental Law',
  definition: 'A comprehensive ISC Class 11 EVS simulation covering niche theory (Gause competitive exclusion, resource partitioning), ecosystem energetics (photosynthetic, trophic, assimilation efficiencies), biogeochemical cycles (carbon and nitrogen cycles), biome classifications, pollution mechanisms (air, water, soil, noise, PCBs), and national statutory legal frameworks (Water Act, Air Act, EPA 1986, NGT, EIA 2006, Articles 48A & 51A(g)).',
  eli5: 'Think of an ecosystem like a giant bustling city. A habitat is an organism\'s home address; its niche is its job. Two species cannot do the exact same job at the same desk without one getting fired (Gause\'s Principle). Energy enters from the sun and leaks out as heat at each trophic step (10% rule). Nutrients cycle like money through banks. When humans dump too much smoke, sewage, or noise, the system breaks down. Environmental laws like the EPA 1986 and courts like the NGT act as the police to protect nature!',
  misconceptions: [
    {
      misconception: 'Habitat and ecological niche are identical synonyms meaning where an organism lives.',
      correction: 'A habitat is the physical place (address); an ecological niche is the organism\'s functional role and ecological interactions (profession). Many species share one habitat while occupying distinct niches (e.g., langur in canopy vs chital on forest floor).',
    },
    {
      misconception: 'Nitrogen fixation means plants directly breathe in and absorb N2 gas from ambient air.',
      correction: 'Plants cannot break the strong N≡N triple bond. N2 must first be fixed into ammonia/nitrates by bacteria (Rhizobium, Azotobacter, Cyanobacteria) or lightning before plants can assimilate it.',
    },
    {
      misconception: 'Acid rain is caused by carbon dioxide, so any slightly acidic rainfall is acid rain.',
      correction: 'Normal unpolluted rain is already pH 5.6 due to dissolved CO2. Acid rain is specifically precipitation with pH below 5.6 caused by industrial SO2 and NOx forming sulphuric and nitric acids.',
    },
    {
      misconception: 'Articles 48A and 51A(g) are directly enforceable Fundamental Rights for citizens in court.',
      correction: 'Article 48A is a Directive Principle of State Policy (guiding the State), and Article 51A(g) is a Fundamental Duty for citizens. The enforceable right to a clean environment flows from Article 21 (Right to Life) as ruled in Subhash Kumar v. State of Bihar.',
    },
    {
      misconception: 'Eutrophication kills fish directly because chemical fertiliser is an acute metabolic poison.',
      correction: 'Fertilizers cause explosive algal blooms; when the algae die, aerobic bacteria decompose the dead biomass, consuming dissolved oxygen (DO) and causing fish to suffocate from hypoxia.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the functional difference between habitat and niche?', options: ['Habitat is address, niche is profession', 'Habitat is profession, niche is address', 'Both mean geographical territory', 'Niche is abiotic, habitat is biotic'], correctIndex: 0 },
    { question: 'What does Lindeman\'s 10% law state?', options: ['10% energy is lost at each step', 'Only ~10% of energy transfers to the next trophic level', 'Producers absorb 100% of solar light', 'Carnivores eat 10% of their weight daily'], correctIndex: 1 },
    { question: 'Which bacterium converts Nitrite (NO2-) to Nitrate (NO3-)?', options: ['Rhizobium', 'Nitrosomonas', 'Nitrobacter', 'Pseudomonas'], correctIndex: 2 },
    { question: 'What is the pH threshold below which rain is classified as acid rain?', options: ['pH < 7.0', 'pH < 5.6', 'pH < 4.0', 'pH < 2.0'], correctIndex: 1 },
    { question: 'Which zone of a lake is shallow, sunlit, and contains rooted vegetation?', options: ['Limnetic', 'Littoral', 'Profundal', 'Abyssal'], correctIndex: 1 },
    { question: 'Which landmark act was passed following the 1984 Bhopal Gas Tragedy?', options: ['Water Act 1974', 'Air Act 1981', 'Environment (Protection) Act 1986', 'Wildlife Act 1972'], correctIndex: 2 },
    { question: 'What does BOD (Biochemical Oxygen Demand) quantify?', options: ['Dissolved salt level', 'Microbial oxygen consumption for decomposing organic waste', 'Water temperature', 'Turbidity index'], correctIndex: 1 },
    { question: 'What is the daytime residential noise limit under Indian Noise Rules 2000?', options: ['30 dB', '55 dB', '75 dB', '90 dB'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of Gause competitive exclusion, energy flow efficiencies, biogeochemical cycling, pollution control technology, and Indian statutory environmental law.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Gause Competitive Exclusion & Niche Overlap',
    instruction: 'Adjust the Niche Overlap slider to observe how shared limiting resources cause competitive exclusion between Paramecium aurelia and Paramecium caudatum.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_EVS_011,
  },
  {
    title: 'Lab 2: Unidirectional Energy Flow & Lindeman Efficiency',
    instruction: 'Change Solar Incident Radiation and Trophic Levels to visualize Lindeman\'s 10% Law and why the Energy Pyramid is always upright.',
    interactionType: 'energy-pyramid',
    nodeId: NODE_C11_EVS_012,
  },
  {
    title: 'Lab 3: Nitrogen Cycle & Haber-Bosch Runoff Vector',
    instruction: 'Simulate Nitrogen fixation, nitrification, and synthetic fertilizer runoff into aquatic ecosystems.',
    interactionType: 'nitrogen-flow',
    nodeId: NODE_C11_EVS_013,
  },
  {
    title: 'Lab 4: Cultural Eutrophication & Hypoxic Dead Zones',
    instruction: 'Inject fertilizer runoff into Loktak Lake and watch the real-time drop in Dissolved Oxygen (DO) and fish population.',
    interactionType: 'eutrophication-sim',
    nodeId: NODE_C11_EVS_018,
  },
  {
    title: 'Lab 5: Pollution Control Engineering & Statutory Mandates',
    instruction: 'Test Electrostatic Precipitators (ESP), FGD Limestone Scrubbers, and invoke NGT statutory rulings.',
    interactionType: 'pollution-control',
    nodeId: NODE_C11_EVS_016,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If Niche Overlap between two competing protozoan species reaches 100% under a strictly limited bacterial food supply, what will happen to the inferior competitor over 16 days?',
    options: [
      'Both species will survive at half capacity',
      'The inferior competitor will decline to 0 (Competitive Exclusion)',
      'The inferior competitor will suddenly triple in numbers',
      'The food supply will automatically multiply to feed both',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide Niche Overlap to 100% in the simulation and observe P. caudatum\'s population crash to zero!',
    nodeId: NODE_C11_EVS_011,
  },
  {
    question: 'Prediction: If incident sunlight on a forest is 1,000,000 kJ and photosynthetic efficiency is 1.5%, how much Gross Primary Energy is fixed by plants?',
    options: [
      '15,000 kJ',
      '150,000 kJ',
      '1,500 kJ',
      '150 kJ',
    ],
    correctIndex: 0,
    verifyInstruction: 'Check the Energy Flow dashboard: 1,000,000 × 0.015 = 15,000 kJ!',
    nodeId: NODE_C11_EVS_012,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the Dissolved Oxygen (DO) level as the Fertilizer Runoff concentration exceeds 80 ppm?',
    observableOptions: [
      'DO plummets below 2.0 mg/L (Critical Hypoxia), triggering immediate fish mortality',
      'DO rises to 20 mg/L making water super-oxygenated',
      'DO remains completely unaffected at 8.0 mg/L',
      'Water turns to steam instantly',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_EVS_018,
  },
  {
    question: 'When the Electrostatic Precipitator (ESP) efficiency is dialed from 0% to 99.5%, what happens to fly-ash particulate emission in the flue gas?',
    observableOptions: [
      'Particulate emission drops from 1200 mg/Nm³ down to under 10 mg/Nm³',
      'Particulate emission increases 10-fold',
      'Only SO2 gas is removed, fly ash is untouched',
      'The smokestack explodes',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_EVS_016,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Environmental Impact Assessor: Loktak Restoration Masterplan',
  description: 'Apply the full multidisciplinary toolkit of Class 11 EVS to formulate an actionable 4-point restoration plan for Loktak Lake and the Keibul Lamjao National Park.',
  steps: [
    'Enforce a 200-meter buffer strip of constructed wetlands to intercept nitrogen and phosphorus runoff from paddy fields before it enters the lake.',
    'Deploy mechanical harvesting and vermicomposting of invasive water hyacinth to trigger competitive release for native Hydrilla and Vallisneria.',
    'Install online continuous effluent monitoring systems (OCEMS) with mandatory ETPs for all upstream municipal drains and small dyeing units under Section 33A of the Water Act 1974.',
    'Formulate a Community Wetland Management Council invoking Article 51A(g) and file a compliance affidavit before the National Green Tribunal (NGT).',
  ],
};

function C11_EVSHabitatsNichesGausesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_EVS_011,
  title = DEFAULT_PROPS.title || 'Ecosystem Dynamics & Environmental Law',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── BRILLIANT PATTERN INTERACTION STATES ───
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── LAB 1: GAUSE EXPERIMENTAL VARIABLES ───
  const [nicheOverlap, setNicheOverlap] = useState(70); // 0% to 100%
  const [foodSupply, setFoodSupply] = useState(50); // 10 to 100 units
  const [simulationDay, setSimulationDay] = useState(16);
  const [isGauseRunning, setIsGauseRunning] = useState(false);
  const [pAureliaPop, setPAureliaPop] = useState(180);
  const [pCaudatumPop, setPCaudatumPop] = useState(20);

  // ─── LAB 2: ENERGY FLOW VARIABLES ───
  const [solarIncident, setSolarIncident] = useState(100000); // kJ
  const [photoEfficiency, setPhotoEfficiency] = useState(1.5); // %
  const [carnivoreAssimEff, setCarnivoreAssimEff] = useState(80); // %
  const [herbivoreAssimEff, setHerbivoreAssimEff] = useState(35); // %
  const [trophicStep, setTrophicStep] = useState(4); // 3, 4, 5 levels

  // ─── LAB 3: NITROGEN CYCLE VARIABLES ───
  const [haberBoschRate, setHaberBoschRate] = useState(120); // Tg/yr
  const [denitrificationRate, setDenitrificationRate] = useState(80);
  const [rhizobiumActive, setRhizobiumActive] = useState(true);
  const [selectedNitrogenStep, setSelectedNitrogenStep] = useState<string | null>(null);

  // ─── LAB 4: EUTROPHICATION SIMULATOR VARIABLES ───
  const [fertilizerRunoffPpm, setFertilizerRunoffPpm] = useState(45); // ppm
  const [algaeDensity, setAlgaeDensity] = useState(60); // index 0-100
  const [dissolvedOxygen, setDissolvedOxygen] = useState(5.2); // mg/L
  const [fishCount, setFishCount] = useState(14);
  const [waterHyacinthCover, setWaterHyacinthCover] = useState(40); // %

  // ─── LAB 5: POLLUTION CONTROL & LEGISLATION VARIABLES ───
  const [espEfficiency, setEspEfficiency] = useState(95); // %
  const [fgdScrubberActive, setFgdScrubberActive] = useState(true);
  const [activeLawTab, setActiveLawTab] = useState<'acts' | 'constitutional' | 'institutions'>('acts');
  const [ambientNoiseDb, setAmbientNoiseDb] = useState(68); // dB
  const [isDaytime, setIsDaytime] = useState(true);

  // ─── CHALLENGE & ADAPTIVE BKT / SRS STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFLECTION ANSWERS STATE ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── ESCALATING HINTS & PROGRESSIVE DISCLOSURE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── NON-MCQ CHALLENGE STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── DISCOVERY STATE ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── FEEDBACK & ANIMATION STATES ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY UPDATE ───
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

  // ─── REAL-TIME CALCULATION: GAUSE POPULATION EQUATIONS ───
  useEffect(() => {
    const overlapFrac = nicheOverlap / 100;
    const baseK = foodSupply * 2.5;

    const aurelia = Math.round(baseK * (1 + 0.2 * (1 - overlapFrac)));
    const caudatum = Math.max(0, Math.round(baseK * (1 - overlapFrac * 1.15) * 0.7));

    setPAureliaPop(aurelia);
    setPCaudatumPop(caudatum);
  }, [nicheOverlap, foodSupply]);

  // ─── REAL-TIME CALCULATION: EUTROPHICATION & DISSOLVED OXYGEN ───
  useEffect(() => {
    const calculatedAlgae = Math.min(100, Math.round(fertilizerRunoffPpm * 1.1 + waterHyacinthCover * 0.3));
    const calculatedDO = Math.max(0.4, Number((9.5 - (calculatedAlgae * 0.08)).toFixed(1)));
    const calculatedFish = calculatedDO < 2.0 ? 0 : calculatedDO < 4.0 ? Math.round(calculatedDO * 2) : Math.round(calculatedDO * 2.5);

    setAlgaeDensity(calculatedAlgae);
    setDissolvedOxygen(calculatedDO);
    setFishCount(calculatedFish);
  }, [fertilizerRunoffPpm, waterHyacinthCover]);

  // ─── 2D CANVAS ANIMATION: PARTICLE & TROPHIC FLUX LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      radius: number;
    }

    const particles: Particle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      color: Math.random() > 0.5 ? '#10b981' : '#38bdf8',
      radius: Math.random() * 2.5 + 1,
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      ctx.fillStyle = '#6ee7b7';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Biochemical Pulse Flux: Frame ${frame % 1000} | DO: ${dissolvedOxygen} mg/L`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [dissolvedOxygen]);

  // ─── USECALLBACK HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Gause competitive exclusion in action.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Environmental Research Laboratory. Manipulate variables to discover core ecological laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Sandbox! Experiment freely with all environmental controls with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your analytical skills to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulation controls to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the data readout again.');
  }, []);

  const handleNicheOverlapChange = useCallback((val: number) => {
    setNicheOverlap(val);
    audioManager.play('count');
    if (val === 100) {
      speechManager.speak('Total 100% niche overlap reached: Gause exclusion active.');
    }
  }, []);

  const handleFertilizerChange = useCallback((val: number) => {
    setFertilizerRunoffPpm(val);
    audioManager.play('count');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete step-by-step scientific explanation together.');
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the environmental simulation with mastery.');
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

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('All hints exhausted. Let us analyze the verified solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  // ─── CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.2 }}
            className="text-3xl p-2 bg-emerald-950/60 border border-emerald-700/50 rounded-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ISC Class 11 EVS
              </span>
              <span className="text-xs text-slate-400 font-mono">NEP 2020 Compliant</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Dynamic Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge' || p === 'sandbox' || p === 'explore' || p === 'discovery') {
                  setPhase(p);
                  audioManager.play('tap');
                }
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY HOOK
      ═══════════════════════════════��═══════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-gold-950/80 rounded-2xl border border-emerald-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-1">
              <span>🚨</span> Environmental Scenario Briefing
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-emerald-400">Your Advisor Mandate: </strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-bold text-xs uppercase tracking-wider bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Intuitive Prediction Hook
              </span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-emerald-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 text-center text-xs flex items-center justify-center font-bold text-slate-300 mt-0.5">
                      {String.fromCharCode(65 + i)}
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
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Gause competitive exclusion principle states complete niche overlap guarantees one wins.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/50 whitespace-nowrap"
                >
                  Enter Interactive Research Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          PHASE 2: GUIDED INTERACTIVE EXPLORATION
      ═══════════════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg text-slate-300"
              >
                ← Prev Lab
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                onClick={() => {
                  setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
                  audioManager.play('tap');
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs font-bold rounded-lg text-white"
              >
                Next Lab →
              </motion.button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            🔬 <strong>Active Directive:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-slate-900/95 p-5 rounded-2xl border border-slate-800"
            >
              {/* SLIDE 0: GAUSE EXPERIMENT */}
              {currentSlide === 0 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Microcosm Parameters</h4>
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Niche Overlap (Dietary & Spatial):</span>
                          <span className="text-emerald-400 font-mono font-bold">{nicheOverlap}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={nicheOverlap}
                          onChange={e => handleNicheOverlapChange(Number(e.target.value))}
                          aria-label="Set Niche Overlap Percentage"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Limiting Bacterial Food Supply:</span>
                          <span className="text-gold-400 font-mono font-bold">{foodSupply} units/day</span>
                        </div>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={foodSupply}
                          onChange={e => setFoodSupply(Number(e.target.value))}
                          aria-label="Set Food Supply"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      {!predictionMade && (
                        <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-800/60 mt-2">
                          <p className="text-xs font-bold text-gold-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                          <div className="space-y-1.5">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handlePrediction(i)}
                                className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-gold-900/60 text-xs text-slate-300 border border-gold-900/40"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400">Populations Over 16 Days Culture (Gause 1934 Model)</span>
                        <div className="flex gap-4 text-xs font-mono">
                          <span className="text-emerald-400 font-bold">● P. aurelia: {pAureliaPop}</span>
                          <span className="text-rose-400 font-bold">● P. caudatum: {pCaudatumPop}</span>
                        </div>
                      </div>

                      <svg viewBox="0 0 500 240" className="w-full h-auto bg-slate-900 rounded-lg">
                        <line x1="40" y1="20" x2="40" y2="200" stroke="#334155" strokeWidth="1" />
                        <line x1="40" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="1" />
                        <line x1="40" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="3 3" />

                        <text x="35" y="25" fill="#64748b" fontSize="9" textAnchor="end">250</text>
                        <text x="35" y="115" fill="#64748b" fontSize="9" textAnchor="end">125</text>
                        <text x="35" y="200" fill="#64748b" fontSize="9" textAnchor="end">0</text>

                        <text x="40" y="215" fill="#64748b" fontSize="9">Day 0</text>
                        <text x="150" y="215" fill="#64748b" fontSize="9">Day 4</text>
                        <text x="260" y="215" fill="#64748b" fontSize="9">Day 8</text>
                        <text x="370" y="215" fill="#64748b" fontSize="9">Day 12</text>
                        <text x="470" y="215" fill="#64748b" fontSize="9" textAnchor="end">Day 16</text>

                        <path
                          d={`M 40 190 Q 150 140, 260 ${Math.max(40, 200 - pAureliaPop * 0.75)} T 480 ${Math.max(30, 200 - pAureliaPop * 0.78)}`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                        />

                        <path
                          d={`M 40 190 Q 150 130, 260 ${Math.min(195, 200 - pCaudatumPop * 1.1)} T 480 ${Math.min(200, 200 - pCaudatumPop * 0.8)}`}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="3"
                          strokeDasharray={nicheOverlap > 80 ? '4 2' : 'none'}
                        />

                        {nicheOverlap >= 90 && (
                          <g>
                            <rect x="280" y="130" width="180" height="40" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                            <text x="290" y="148" fill="#a5b4fc" fontSize="9" fontWeight="bold">Competitive Exclusion Occurred!</text>
                            <text x="290" y="162" fill="#c7d2fe" fontSize="8">P. caudatum eliminated (Gause 1934)</text>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: ENERGY FLOW */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">Incident Sunlight (kJ):</span>
                      <p className="text-base font-bold text-amber-400 font-mono">{solarIncident.toLocaleString()} kJ</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Photosynthetic Eff:</span>
                      <p className="text-base font-bold text-emerald-400 font-mono">{photoEfficiency}%</p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Net Producer Biomass:</span>
                      <p className="text-base font-bold text-emerald-300 font-mono">
                        {((solarIncident * photoEfficiency) / 100).toLocaleString()} kJ
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Carnivore Assimilation:</span>
                      <p className="text-base font-bold text-gold-400 font-mono">{carnivoreAssimEff}% (vs Herbivore 35%)</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 230" className="w-full h-auto">
                      <circle cx="50" cy="40" r="22" fill="#f59e0b" opacity="0.9" />
                      <text x="50" y="44" fill="#78350f" fontSize="8" fontWeight="bold" textAnchor="middle">100% Sun</text>
                      <line x1="75" y1="45" x2="140" y2="70" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="110" y="55" fill="#fde68a" fontSize="8">1-2% Fixed</text>

                      <polygon points="250,30 200,70 300,70" fill="#dc2626" opacity="0.85" />
                      <text x="250" y="60" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Apex: {(((solarIncident * photoEfficiency) / 100) * 0.001).toFixed(1)} kJ (0.1%)
                      </text>

                      <polygon points="200,72 150,115 350,115 300,72" fill="#ea580c" opacity="0.85" />
                      <text x="250" y="98" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Secondary Consumers: {(((solarIncident * photoEfficiency) / 100) * 0.01).toFixed(0)} kJ (1%)
                      </text>

                      <polygon points="150,117 100,165 400,165 350,117" fill="#0284c7" opacity="0.85" />
                      <text x="250" y="145" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Primary Consumers (Herbivores): {(((solarIncident * photoEfficiency) / 100) * 0.1).toFixed(0)} kJ (10%)
                      </text>

                      <polygon points="100,167 50,215 450,215 400,167" fill="#16a34a" opacity="0.85" />
                      <text x="250" y="195" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">
                        Primary Producers (Grasses/Phytoplankton): {((solarIncident * photoEfficiency) / 100).toFixed(0)} kJ (100% Fixed)
                      </text>

                      <path d="M 405 190 Q 460 190, 460 150" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                      <text x="465" y="150" fill="#94a3b8" fontSize="8">90% Lost as Heat</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 2: NITROGEN CYCLE */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'fixation', name: '1. Nitrogen Fixation', desc: 'N2 → NH3 (Rhizobium / Azotobacter)', color: 'border-emerald-500 bg-emerald-950/50' },
                      { id: 'nitrification', name: '2. Nitrification', desc: 'NH3 → NO2- (Nitrosomonas) → NO3- (Nitrobacter)', color: 'border-gold-500 bg-gold-950/50' },
                      { id: 'assimilation', name: '3. Assimilation', desc: 'Plant uptake of NO3- for protein synthesis', color: 'border-amber-500 bg-amber-950/50' },
                      { id: 'denitrification', name: '4. Denitrification', desc: 'NO3- → N2 gas (Pseudomonas denitrificans)', color: 'border-rose-500 bg-rose-950/50' },
                    ].map(step => (
                      <motion.button
                        key={step.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedNitrogenStep(step.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedNitrogenStep === step.id ? 'ring-2 ring-emerald-400 ' + step.color : 'bg-slate-950 border-slate-800'
                        }`}
                      >
                        <p className="text-xs font-bold text-white mb-1">{step.name}</p>
                        <p className="text-[10px] text-slate-400 leading-tight">{step.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 200" className="w-full h-auto">
                      <rect x="150" y="10" width="200" height="35" rx="8" fill="#1e293b" stroke="#38bdf8" />
                      <text x="250" y="28" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">Atmospheric N2 (78% Reservoir Pool)</text>

                      <path d="M 350 25 Q 430 40, 430 110" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                      <text x="435" y="70" fill="#fcd34d" fontSize="8" fontWeight="bold">Haber-Bosch (+150 Tg/yr)</text>

                      <path d="M 170 45 L 80 110" fill="none" stroke="#10b981" strokeWidth="2" />
                      <text x="80" y="80" fill="#6ee7b7" fontSize="8">Rhizobium & Azotobacter</text>

                      <rect x="40" y="120" width="100" height="45" rx="6" fill="#064e3b" stroke="#059669" />
                      <text x="90" y="138" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">Ammonia (NH3)</text>
                      <text x="90" y="152" fill="#d1fae5" fontSize="7" textAnchor="middle">Organic Decay</text>

                      <path d="M 140 142 L 200 142" fill="none" stroke="#38bdf8" strokeWidth="2" />
                      <text x="170" y="135" fill="#7dd3fc" fontSize="7" textAnchor="middle">Nitrosomonas</text>

                      <rect x="200" y="120" width="100" height="45" rx="6" fill="#0c4a6e" stroke="#0284c7" />
                      <text x="250" y="138" fill="#bae6fd" fontSize="9" fontWeight="bold" textAnchor="middle">Nitrate (NO3-)</text>
                      <text x="250" y="152" fill="#e0f2fe" fontSize="7" textAnchor="middle">Nitrobacter oxidized</text>

                      <path d="M 250 120 L 250 80" fill="none" stroke="#22c55e" strokeWidth="2" />
                      <rect x="200" y="60" width="100" height="25" rx="4" fill="#14532d" stroke="#22c55e" />
                      <text x="250" y="76" fill="#86efac" fontSize="8" fontWeight="bold" textAnchor="middle">Plant Proteins</text>

                      <path d="M 300 135 Q 380 120, 330 45" fill="none" stroke="#e11d48" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="360" y="100" fill="#fda4af" fontSize="8" fontWeight="bold">Pseudomonas denitrificans</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 3: EUTROPHICATION */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                        <span>Fertilizer Nitrate Runoff:</span>
                        <span className="text-amber-400 font-mono font-bold">{fertilizerRunoffPpm} ppm</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={fertilizerRunoffPpm}
                        onChange={e => handleFertilizerChange(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                        <span>Water Hyacinth Coverage:</span>
                        <span className="text-emerald-400 font-mono font-bold">{waterHyacinthCover}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="90"
                        value={waterHyacinthCover}
                        onChange={e => setWaterHyacinthCover(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex flex-col justify-center">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Dissolved Oxygen (DO):</span>
                        <span className={`font-mono font-bold text-sm ${dissolvedOxygen < 2.0 ? 'text-rose-500' : dissolvedOxygen < 4.0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {dissolvedOxygen} mg/L
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs mt-1">
                        <span className="text-slate-400">Surviving Fish Population:</span>
                        <span className="font-mono font-bold text-gold-400">{fishCount} Indv</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 500 210" className="w-full h-auto rounded-lg">
                      <rect x="0" y="40" width="500" height="80" fill={dissolvedOxygen < 3.0 ? '#064e3b' : '#0284c7'} opacity="0.6" />
                      <rect x="0" y="120" width="500" height="90" fill={dissolvedOxygen < 2.0 ? '#1c1917' : '#0369a1'} opacity="0.8" />

                      <rect x="0" y="40" width="500" height="15" fill="#15803d" opacity={algaeDensity / 100} />
                      <text x="250" y="32" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">
                        Algal Bloom (Shading Light: {algaeDensity}%)
                      </text>

                      <line x1="100" y1="10" x2="100" y2="40" stroke="#facc15" strokeWidth="2" />
                      <line x1="250" y1="10" x2="250" y2="40" stroke="#facc15" strokeWidth="2" />
                      <line x1="400" y1="10" x2="400" y2="40" stroke="#facc15" strokeWidth="2" />

                      {Array.from({ length: 8 }).map((_, i) => {
                        const isDead = i >= fishCount / 2;
                        return (
                          <g key={i} transform={`translate(${60 + i * 50}, ${isDead ? 50 : 100 + (i % 3) * 25})`}>
                            <ellipse cx="10" cy="5" rx="8" ry="4" fill={isDead ? '#94a3b8' : '#38bdf8'} />
                            <polygon points="18,5 24,1 24,9" fill={isDead ? '#94a3b8' : '#38bdf8'} />
                            {isDead && <text x="6" y="-2" fill="#f43f5e" fontSize="8">✕</text>}
                          </g>
                        );
                      })}

                      <text x="250" y="180" fill={dissolvedOxygen < 2.0 ? '#f43f5e' : '#94a3b8'} fontSize="10" fontWeight="bold" textAnchor="middle">
                        {dissolvedOxygen < 2.0 ? '🚨 HYPOXIC DEAD ZONE: Bacterial Respiration Exhausted Oxygen' : 'Benthic Decomposition Layer'}
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 4: POLLUTION ENGINEERING */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400">Industrial End-of-Pipe Stack Controls</h4>
                      <div>
                        <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                          <span>Electrostatic Precipitator (ESP) Fly-Ash Capture:</span>
                          <span className="text-emerald-400 font-mono font-bold">{espEfficiency}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="99.9"
                          step="0.1"
                          value={espEfficiency}
                          onChange={e => setEspEfficiency(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-300">Wet Limestone FGD (SO2 Removal):</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setFgdScrubberActive(v => !v);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            fgdScrubberActive ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          {fgdScrubberActive ? 'ACTIVE (Gypsum Formed)' : 'BYPASSED (High SO2)'}
                        </motion.button>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Indian Statutory Framework Highlights</h4>
                      <div className="space-y-1.5 text-xs text-slate-300">
                        <p><strong className="text-emerald-400">Water Act 1974:</strong> Established CPCB & SPCBs for aquatic effluent consent.</p>
                        <p><strong className="text-gold-400">Air Act 1981:</strong> Regulates industrial emission limits & noise under 1987 amendment.</p>
                        <p><strong className="text-amber-400">EPA 1986:</strong> Post-Bhopal umbrella statute with plenary central powers.</p>
                        <p><strong className="text-rose-400">NGT Act 2010:</strong> Specialised environmental fast-track judicial tribunal.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          PHASE 3: FREE PLAY SANDBOX
      ═══════════════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-gradient-to-r from-slate-900 to-gold-950 rounded-2xl border border-gold-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎛️</span> Environmental Master Sandbox
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely adjust competing species, nutrient vectors, pollution controls, and observe multi-layered ecosystem outcomes.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/50 whitespace-nowrap"
            >
              I Am Ready For Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-bold text-slate-400 mb-2">Live Ecosystem Flux & DO Particle Tracer</span>
              <canvas ref={canvasRef} width={460} height={180} className="w-full rounded-xl border border-slate-800 shadow-inner" />
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sandbox Control Console</h4>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Gause Niche Overlap:</span>
                  <span className="text-emerald-400 font-mono font-bold">{nicheOverlap}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={nicheOverlap}
                  onChange={e => handleNicheOverlapChange(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                  <span>Fertilizer Effluent Inflow:</span>
                  <span className="text-amber-400 font-mono font-bold">{fertilizerRunoffPpm} ppm</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fertilizerRunoffPpm}
                  onChange={e => handleFertilizerChange(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">P. Aurelia</span>
                  <p className="text-base font-bold text-emerald-400 font-mono">{pAureliaPop}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase">P. Caudatum</span>
                  <p className="text-base font-bold text-rose-400 font-mono">{pCaudatumPop}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          PHASE 4: GRADED CHALLENGE PHASE
      ══════════════════════════════════════════════════════════════════════════�� */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-emerald-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  Node: {activeChallenge.nodeId}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-800">
                  NEP: {activeChallenge.competencyLevel}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">{activeChallenge.question}</h2>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold uppercase tracking-wider border shadow-md ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                  : difficulty === 'standard'
                  ? 'bg-gold-950/80 border-gold-600 text-gold-300'
                  : 'bg-rose-950/80 border-rose-600 text-rose-300'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* MCQ Types */}
          {(activeChallenge.type === 'classify' ||
            activeChallenge.type === 'distinguish' ||
            activeChallenge.type === 'match') &&
            activeChallenge.options && (
              <motion.div
                animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
                className={`space-y-3 p-4 rounded-2xl border transition-colors ${
                  wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'bg-slate-900 border-slate-800'
                }`}
              >
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50'
                        : 'bg-slate-800/70 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-emerald-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 text-center text-xs flex items-center justify-center font-bold text-slate-300 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}

          {/* Drag Label */}
          {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold text-emerald-400">Available Taxonomic & Bacterial Labels:</span>
              <div className="flex flex-wrap gap-2">
                {activeChallenge.dragItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white cursor-grab shadow-md"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeChallenge.dragItems.map((item, idx) => {
                  const dropped = droppedLabels[item.targetId];
                  return (
                    <div
                      key={idx}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center transition-all ${
                        dropped ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-500">Target Stage: {item.targetId.replace('target_', '')}</span>
                      <p className="text-sm font-bold mt-1">{dropped || 'Drop Matching Agent Here'}</p>
                    </div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl"
              >
                Validate Diagram Mapping →
              </motion.button>
            </div>
          )}

          {/* Drag Sort */}
          {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-xs text-slate-400">Drag items to rearrange in correct scientific sequence:</p>
              <div className="space-y-2">
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
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
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-center text-xs flex items-center justify-center font-bold text-emerald-400">
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
                  const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i);
                  handleAnswer(ans);
                }}
                disabled={showExplanation}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl"
              >
                Check Sequential Order →
              </motion.button>
            </div>
          )}

          {/* Numeric Input */}
          {activeChallenge.type === 'numeric' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter precise numeric value"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 focus:outline-none"
                />
                <span className="text-sm font-bold text-slate-300">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl"
                >
                  Submit Value
                </motion.button>
              </div>
            </div>
          )}

          {/* Construct */}
          {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
              <div className="flex flex-wrap gap-2">
                {activeChallenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setConstructParts(p => [...p, part])}
                    className="px-3 py-2 bg-gold-800 hover:bg-gold-700 rounded-xl text-xs font-bold text-white"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="min-h-[90px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                {constructParts.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1.5 bg-gold-950 border border-gold-700 rounded-lg text-xs font-semibold text-gold-200 flex items-center gap-2"
                  >
                    <span>{p}</span>
                    <button
                      onClick={() => setConstructParts(arr => arr.filter((_, idx) => idx !== i))}
                      className="text-rose-400 hover:text-rose-200 font-bold"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-500">Click elements above to assemble the action plan...</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={showExplanation || constructParts.length === 0}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl"
              >
                Validate Constructed Protocol →
              </motion.button>
            </div>
          )}

          {/* Progressive Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-slate-900 to-emerald-950/70 border border-emerald-700/60 rounded-2xl space-y-4 shadow-xl"
            >
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <span>📚</span> Verified Scientific Analysis
              </div>

              <div className="space-y-2">
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-emerald-400">Step {idx + 1}:</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRevealedSteps(s => s + 1)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow"
                >
                  Show Next Detailed Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/50"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & MASTER ASSESSMENT + REFLECTION SECTION
      ═══════════════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-gold-950 rounded-3xl border border-emerald-700/60 text-center space-y-3 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ISC Class 11 EVS Simulation Complete!</h2>
            <div className="flex justify-center gap-6 text-sm font-mono pt-2">
              <span className="text-emerald-400 font-bold">Final Score: {Math.max(0, 100 - errors * 5)}%</span>
              <span className="text-gold-400 font-bold">BKT Mastery: {masteryLevel.toUpperCase()}</span>
              <span className="text-amber-400 font-bold">Errors Logged: {errors}</span>
            </div>

            <p className="text-sm text-slate-300 max-w-2xl mx-auto pt-2 leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered ecological niche theory, energy transfer efficiencies, biogeochemical cycles, and Indian environmental statutes with absolute distinction!'
                : errors <= 3
                ? 'EXCELLENT PERFORMANCE! You demonstrate sharp analytical understanding of ecosystem dynamics and statutory frameworks. Review your misconception log below.'
                : 'SOLID EFFORT! Review the specific misconception corrections below, re-enter the sandbox to consolidate concepts, and re-attempt for top marks!'}
            </p>
          </div>

          {/* ─── MANDATORY SPACED REPETITION VISIBILITY CARD ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 rounded-2xl border-2 border-amber-500/80 shadow-2xl space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-base font-bold text-amber-300">Spaced Repetition Schedule (SM-2 Adaptive Engine)</h3>
                  <p className="text-xs text-slate-400">Scientifically calibrated to optimize long-term memory retention</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-500/20 border border-amber-400/60 rounded-xl">
                <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">Next Recommended Review</span>
                <p className="text-lg font-black text-amber-200">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors === 0 ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/50' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs font-bold text-emerald-400">0 Errors (Mastery)</span>
                <p className="text-sm font-extrabold text-white mt-0.5">review in 7 days</p>
                <span className="text-[10px] text-slate-400">Long-term consolidation</span>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors >= 1 && errors <= 3 ? 'bg-gold-950/80 border-gold-500 ring-2 ring-gold-500/50' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs font-bold text-gold-400">1–3 Errors (Reinforce)</span>
                <p className="text-sm font-extrabold text-white mt-0.5">review in 3 days</p>
                <span className="text-[10px] text-slate-400">Mid-term reinforcement</span>
              </div>

              <div className={`p-3 rounded-xl border text-center transition-all ${
                errors >= 4 ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/50' : 'bg-slate-950/60 border-slate-800 opacity-60'
              }`}>
                <span className="text-xs font-bold text-rose-400">4+ Errors (Remediate)</span>
                <p className="text-sm font-extrabold text-white mt-0.5">review in 1 day</p>
                <span className="text-[10px] text-slate-400">Immediate remedial practice</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              Based on your response latency and accuracy ({errors} error{errors === 1 ? '' : 's'}), you should{' '}
              <strong className="text-amber-300 font-bold">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </strong>{' '}
              to solidify Gause&apos;s Principle, Lindeman efficiencies, and Indian environmental statutes for the CISCE Board Examination.
            </p>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-gold-800/60 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-gold-300 font-bold text-base">
              <span>💭</span> Key Concept Reflection & Self-Assessment
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Reflect deeply on your scientific journey through Gause&apos;s Principle, Lindeman efficiencies, and environmental jurisprudence:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-sm font-bold text-emerald-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How Lindeman's 10% law strictly keeps the energy pyramid upright even when biomass is inverted, or how complete niche overlap guarantees exclusion..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-emerald-500 h-20 resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-sm font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., A habitat is where an animal lives (address) while a niche is what it does (job). Two species can't do the exact same job in the exact same place without competing..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-gold-500 h-20 resize-none"
                />
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="text-sm font-bold text-amber-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Evaluating municipal water treatment plants, diagnosing lake eutrophication, designing agricultural buffer strips, or understanding NGT rulings..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500 h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Tracking Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Personal Misconception Remediation Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex gap-2">
                  <span className="font-bold text-emerald-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_EVSHabitatsNichesGausesSim;