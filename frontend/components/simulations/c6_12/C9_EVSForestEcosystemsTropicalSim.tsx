'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 9 EVS Ecosystems & Biodiversity Module) ───
const NODE_C9_EVS_011 = 'c9_evs_011';
const NODE_C9_EVS_012 = 'c9_evs_012';
const NODE_C9_EVS_013 = 'c9_evs_013';
const NODE_C9_EVS_014 = 'c9_evs_014';
const NODE_C9_EVS_015 = 'c9_evs_015';
const NODE_C9_EVS_016 = 'c9_evs_016';
const NODE_C9_EVS_017 = 'c9_evs_017';
const NODE_C9_EVS_018 = 'c9_evs_018';
const NODE_C9_EVS_019 = 'c9_evs_019';
const NODE_C9_EVS_020 = 'c9_evs_020';

const ALL_NODE_IDS = [
  NODE_C9_EVS_011,
  NODE_C9_EVS_012,
  NODE_C9_EVS_013,
  NODE_C9_EVS_014,
  NODE_C9_EVS_015,
  NODE_C9_EVS_016,
  NODE_C9_EVS_017,
  NODE_C9_EVS_018,
  NODE_C9_EVS_019,
  NODE_C9_EVS_020,
];

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (Predict-then-verify pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'What do you predict will happen to dissolved oxygen (DO) levels at the bottom of a lake when agricultural fertiliser runoff increases from 15% to 85%?',
    options: [
      'DO will rise sharply because algae generate extra oxygen through photosynthesis.',
      'DO will collapse to near zero (<2 mg/L) because decomposing dead algae consume all oxygen.',
      'DO will stay constant because atmospheric oxygen rapidly balances the lake water.',
      'DO will convert dissolved nitrogen directly into pure mineral nutrients.'
    ],
    correctIndex: 1,
    explanation: 'Massive algal growth is followed by algal death; aerobic decomposers multiply and consume virtually all dissolved oxygen, causing severe bottom-water hypoxia.',
    verifyInstruction: 'Go to Lab 3 (Lake Eutrophication) and slide fertiliser runoff to 85% to verify dissolved oxygen levels and fish mortality.'
  },
  {
    id: 'pred_2',
    question: 'If coastal mangrove cover in an estuary decreases from 80% down to 10%, what will happen to storm surge protection and shoreline wave energy?',
    options: [
      'Surge attenuation remains unchanged because ocean tidal height is governed solely by the moon.',
      'Storm surge protection collapses from ~73% attenuation down to under 15%, exposing coastal settlements.',
      'Wave energy decreases because open muddy shores naturally absorb more friction than root tangles.',
      'Estuarine fish nursery productivity doubles due to unrestricted open-water navigation.'
    ],
    correctIndex: 1,
    explanation: 'Mangrove stilt roots and pneumatophores create massive hydrodynamic drag. Removing them allows high-energy cyclone storm surges to penetrate directly inland.',
    verifyInstruction: 'Go to Lab 4 (Mangrove Estuary) and slide mangrove cover down to 10% to observe the drop in surge attenuation.'
  }
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (What-do-you-notice pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the Rainforest Canopy Stratification model (Lab 1), what happens to light penetration at the forest floor when rainfall is at a lush 240 cm/yr?',
    options: [
      'Over 60% of incident sunlight reaches the ground layer.',
      'Light is almost completely blocked, with only ~1.5% reaching the forest floor.',
      'Light increases because wet glossy leaves reflect rays directly downwards.',
      'Light is evenly distributed (25% at each of the four vertical layers).'
    ],
    observableOptions: [
      'Floor sunlight is around ~1.5% due to the dense emergent and continuous umbrella canopy layers.',
      'Floor sunlight exceeds 50% because large emergent trees have narrow conical canopies.',
      'Understorey plants receive the same solar irradiance as the top emergent crowns.',
      'Epiphytes block 100% of the light before it reaches the upper canopy.'
    ],
    correctIndex: 0,
    explanation: 'In multi-tiered tropical rainforests, dense interlocking emergent and canopy foliage captures over 98% of solar radiation, leaving the forest floor in deep shade.'
  },
  {
    id: 'obs_2',
    question: 'In the Carrying Capacity (K) sandbox, what visual indicator warns that grazing pressure has crossed the safe threshold?',
    options: [
      'The pasture card shifts to amber or rose warning with "Overshoot / Regime Shift Danger".',
      'The soil automatically turns into a blue wetland reservoir.',
      'The cattle count resets instantly back to zero.',
      'The GPP energy counter multiplies by ten.'
    ],
    observableOptions: [
      'The status card turns rose-red and displays "Severe Overshoot & Regime Shift Danger" when cattle exceed 130% of K.',
      'The grass automatically turns blue to signal nitrogen saturation.',
      'The carrying capacity slider locks and cannot be adjusted.',
      'No visual change occurs because rangelands adjust instantly.'
    ],
    correctIndex: 0,
    explanation: 'Exceeding the carrying capacity (K) triggers ecological overshoot alerts, warning of topsoil degradation and irreversible regime shifts.'
  }
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Biosphere India: Ecological Integrity Under Stress',
  intro: 'You are the Chief Ecologist advising the Ministry of Environment. Across India, ecosystems from the rainforest canopies of the Western Ghats to the coral reefs of the Gulf of Mannar, fragile lakes, and Thar desert edges are reaching critical thresholds.',
  context: 'Balance environmental parameters, track primary productivity, halt eutrophication, map endemic hotspots, and protect traditional community reserves before irreversible regime shifts occur.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a tropical rainforest like Silent Valley, if sunlight is intense and constant all year, what happens when rainfall drops from 250 cm to 40 cm annually?',
  options: [
    'The dense multi-storey canopy remains evergreen because solar radiation stays constant.',
    'NPP collapses and the biome shifts towards a dry thorn/savanna system with fire vulnerability.',
    'Taiga needle conifers spontaneously replace broadleaf dipterocarps.',
    'Decomposition speeds up because the dry forest floor is warmer.',
  ],
  correctIndex: 1,
  hintAfter: 'Rainfall is the master limiting factor. Without 200+ cm of rain, the evergreen multi-storeyed canopy cannot sustain its water budget!',
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

// ─── 22 CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_evs_011)
  {
    id: 'ch_01',
    nodeId: NODE_C9_EVS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which forest biome is characterised by evergreen broadleaf trees, multi-storeyed canopy layers (emergent, canopy, understorey), and over 200 cm annual rainfall?',
    options: [
      'Taiga (Boreal coniferous forest)',
      'Temperate deciduous forest',
      'Tropical rainforest',
      'Alpine scrub forest',
    ],
    correctIndex: 2,
    explanation: 'Tropical rainforests (e.g., Western Ghats, North-East India) experience high warmth and >200 cm rainfall, supporting stratified multi-storeyed canopies.',
    hints: [
      'Look for the forest type that stays green all year round near the equator.',
      'It contains the highest biodiversity and emergent giant trees.',
      'Rainfall exceeds 200 cm per year with no harsh winter.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label: Forest Layers (c9_evs_011)
  {
    id: 'ch_02',
    nodeId: NODE_C9_EVS_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct forest canopy layer labels to their positions in the vertical rainforest profile.',
    dragItems: [
      { label: 'Emergent Layer (40m+)', targetId: 'layer_top' },
      { label: 'Canopy Layer (20-35m)', targetId: 'layer_upper' },
      { label: 'Understorey (5-15m)', targetId: 'layer_mid' },
      { label: 'Forest Floor (<2m)', targetId: 'layer_bottom' },
    ],
    correctMapping: {
      layer_top: 'Emergent Layer (40m+)',
      layer_upper: 'Canopy Layer (20-35m)',
      layer_mid: 'Understorey (5-15m)',
      layer_bottom: 'Forest Floor (<2m)',
    },
    explanation: 'Rainforest vertical stratification spans from the towering emergent crowns, down through the continuous umbrella canopy, low-light understorey, to the dark decomposer-rich floor.',
    hints: [
      'The highest giant trees pushing above the main roof are emergent.',
      'The dense continuous green ceiling is the canopy layer.',
      'The dark ground where leaf litter decomposes is the forest floor.',
    ],
  },
  // 3. Foundation - Understanding (c9_evs_012)
  {
    id: 'ch_03',
    nodeId: NODE_C9_EVS_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do grasses in savannas and temperate steppes quickly regrow after grazing by wild herbivores or seasonal grass fires?',
    options: [
      'They possess apical buds located at the very tip of the highest leaf shoots.',
      'They have basal meristems near the ground surface and deep root energy reserves.',
      'They produce waxy cones that drop seeds only when exposed to sub-zero temperatures.',
      'They shed broad leaves in autumn and remain dormant until winter ends.',
    ],
    correctIndex: 1,
    explanation: 'Grasses feature basal meristems (growth points at their base) and deep root systems, enabling rapid regeneration when tops are cropped or burned.',
    hints: [
      'Think about where the growing point of grass is located: shoot tip or plant base?',
      'If an animal eats the top leaf, a basal meristem remains unharmed near the soil.',
      'Deep roots also store carbohydrates and tap deep groundwater.',
    ],
  },
  // 4. Foundation - Match (c9_evs_013)
  {
    id: 'ch_04',
    nodeId: NODE_C9_EVS_013,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which biological adaptation is correctly paired with its extreme environment organism?',
    options: [
      'Camel: Stores gallons of liquid water directly inside its hump.',
      'Cactus: Leaves modified into spines to slash water loss by transpiration.',
      'Arctic Fox: Thin large ears designed to rapidly radiate away body warmth.',
      'Taiga Spruce: Broad delicate leaves that trap heavy winter snowfall.',
    ],
    correctIndex: 1,
    explanation: 'Cactus spines are modified leaves that drastically reduce surface area and transpiration. The camel hump stores fat (which yields metabolic water), not liquid water.',
    hints: [
      'Remember the common myth about the camel hump—it stores lipid fat, not liquid water.',
      'Spines minimise surface area for evaporation in dry desert air.',
      'Fennec foxes (desert) have large radiating ears, whereas Arctic foxes have small heat-conserving ears.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Foundation - Drag Sort: Nitrogen Cycle (c9_evs_016)
  {
    id: 'ch_05',
    nodeId: NODE_C9_EVS_016,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of microbial processes in the nitrogen cycle from atmospheric gas to plant absorption.',
    sortItems: [
      'Atmospheric N2 gas is fixed into ammonia (NH3) by Rhizobium / Azotobacter',
      'Ammonia is converted to Nitrite (NO2-) by Nitrosomonas bacteria',
      'Nitrite is oxidised to Nitrate (NO3-) by Nitrobacter bacteria',
      'Plant roots assimilate Nitrates to synthesise amino acids and proteins',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Fixation (N2 -> NH3) is followed by nitrification in two steps: NH3 -> NO2- by Nitrosomonas, and NO2- -> NO3- by Nitrobacter, allowing plant assimilation.',
    hints: [
      'Step 1 must convert inert atmospheric N2 gas into ammonia.',
      'Step 2 oxidises ammonia into nitrite (NO2-).',
      'Step 3 oxidises nitrite into nitrate (NO3-), which roots finally absorb.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Foundation - Classify (c9_evs_017)
  {
    id: 'ch_06',
    nodeId: NODE_C9_EVS_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under the UN Millennium Ecosystem Assessment (MEA), what category does "storm surge buffering and cyclone protection by Sundarbans mangroves" belong to?',
    options: [
      'Provisioning Service',
      'Regulating Service',
      'Supporting Service',
      'Cultural Service',
    ],
    correctIndex: 1,
    explanation: 'Regulating services are benefits obtained from the regulation of ecosystem processes (e.g., flood control, climate regulation, water purification).',
    hints: [
      'Is a physical product harvested and sold? (If so, it would be provisioning).',
      'Does it moderate an external hazard to protect human habitats?',
      'Moderating storms and floods is a natural check/balance, hence a Regulating service.',
    ],
  },
  // 7. Foundation - Recall (c9_evs_019)
  {
    id: 'ch_07',
    nodeId: NODE_C9_EVS_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the two mandatory Norman Myers criteria for designating a region as a global Biodiversity Hotspot?',
    options: [
      '>5,000 animal species and <10% forest loss',
      'At least 1,500 endemic vascular plant species AND ≥70% loss of primary natural vegetation',
      'High tiger population and mountain elevation above 2,000 metres',
      'Presence of coral reefs and an annual rainfall above 400 cm',
    ],
    correctIndex: 1,
    explanation: 'A hotspot requires high endemism (≥1,500 endemic vascular plants) combined with acute threat (≥70% of original habitat destroyed).',
    hints: [
      'A hotspot is biologically irreplaceable AND under severe threat.',
      'Remember the numerical thresholds: 1,500 endemic plants and 70% habitat loss.',
      'Both conditions must be met simultaneously.',
    ],
  },
  // 8. Standard - Numeric: NPP Formula (c9_evs_016)
  {
    id: 'ch_08',
    nodeId: NODE_C9_EVS_016,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A tropical evergreen forest in the Western Ghats fixes Gross Primary Productivity (GPP) of 26,000 kJ/m²/yr. Plant autotrophic respiration (R) uses 55% of this fixed energy. Calculate the Net Primary Productivity (NPP) in kJ/m²/yr.',
    correctAnswer: 11700,
    tolerance: 100,
    unit: 'kJ/m²/yr',
    explanation: 'NPP = GPP - R. Respiration R = 0.55 * 26,000 = 14,300 kJ/m²/yr. Therefore, NPP = 26,000 - 14,300 = 11,700 kJ/m²/yr.',
    hints: [
      'Use the fundamental equation: NPP = GPP - R.',
      'First calculate R: 55% of 26,000 = 0.55 × 26,000 = 14,300.',
      'Subtract R from GPP: 26,000 - 14,300 = 11,700.',
    ],
  },
  // 9. Standard - Application: Freshwater Eutrophication (c9_evs_014)
  {
    id: 'ch_09',
    nodeId: NODE_C9_EVS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Untreated agricultural runoff loaded with N and P fertilisers enters Dal Lake in Srinagar. What direct sequence triggers the sudden overnight fish kill?',
    options: [
      'Algae absorb all dissolved water, drying up the lake volume completely.',
      'Algae bloom, die, and sink; aerobic decomposers multiply and consume dissolved oxygen below 4 mg/L, suffocating fish.',
      'Algae produce high salinity that converts Dal Lake into a hypersaline dead sea.',
      'Fish consume excess fertiliser granules directly and die of nitrogen poisoning.',
    ],
    correctIndex: 1,
    explanation: 'Nutrient loading fuels algal blooms. When algae die, bacterial decomposition consumes dissolved oxygen (DO), driving DO below survival thresholds and suffocating fish.',
    hints: [
      'Focus on the biological consequence of dead algal biomass sinking to the lake bottom.',
      'Aerobic bacteria need dissolved oxygen to decompose organic matter.',
      'When oxygen falls below ~4 mg/L, fish cannot breathe and suffocate.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Analysis: Marine Symbiosis & Bleaching (c9_evs_015)
  {
    id: 'ch_10',
    nodeId: NODE_C9_EVS_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In coral reef ecosystems (e.g., Gulf of Mannar, Lakshadweep), what precisely occurs during sea-surface temperature spikes that causes coral bleaching?',
    options: [
      'Coral polyps physically melt due to high ambient seawater heat.',
      'Thermal stress causes coral polyps to expel photosynthetic zooxanthellae algae, exposing white calcium carbonate skeletons.',
      'Coral polyps absorb excessive calcium carbonate from ocean acidification.',
      'Zooxanthellae transform into pathogenic predators that consume the coral polyps.',
    ],
    correctIndex: 1,
    explanation: 'Coral bleaching is the expulsion of symbiotic zooxanthellae algae under thermal stress. The coral loses its primary source of photosynthetic nutrients and colour.',
    hints: [
      'Recall the mutualism: coral polyps shelter microscopic algae called zooxanthellae.',
      'The algae photosynthesise and give corals their bright colors.',
      'When overheated, polyps expel the algae, leaving the bare white limestone skeleton visible.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard - Construct: Carrying Capacity Equation & Factors (c9_evs_018)
  {
    id: 'ch_11',
    nodeId: NODE_C9_EVS_018,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the 4 key environmental pillars that determine an ecosystem\'s Carrying Capacity (K).',
    availableParts: ['Resource Availability', 'Environmental Conditions', 'Population Density', 'Waste Accumulation', 'Lunar Gravitation', 'Plate Tectonics'],
    targetState: 'Resource Availability Environmental Conditions Population Density Waste Accumulation',
    validationHint: 'Select the four ecological factors governing carrying capacity: resources, environment, density, and waste.',
    explanation: 'Carrying capacity is governed by: 1) Resource availability (food, water), 2) Environmental conditions (climate, soil), 3) Population density (competition, disease), and 4) Waste accumulation.',
    hints: [
      'What sustains life directly? Resources and favorable environmental conditions.',
      'What limits population growth from within? Crowding/density and toxic waste buildup.',
      'Click the 4 relevant ecological factors in order.',
    ],
  },
  // 12. Standard - Match Hotspots with Flagships (c9_evs_019)
  {
    id: 'ch_12',
    nodeId: NODE_C9_EVS_019,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the Indian Biodiversity Hotspot with its endemic flagship species:',
    options: [
      'Western Ghats -> Lion-tailed Macaque & Nilgiri Tahr',
      'Himalayas -> Nicobar Megapode & Nicobar Pigeon',
      'Indo-Burma (Northeast) -> Snow Leopard',
      'Sundaland (Nicobar) -> Brow-antlered Deer (Sangai)',
    ],
    correctIndex: 0,
    explanation: 'The Western Ghats is the endemic home of the Lion-tailed Macaque and Nilgiri Tahr. Himalayas = Snow Leopard; Indo-Burma = Sangai deer / Hoolock Gibbon; Sundaland = Nicobar Megapode.',
    hints: [
      'The Lion-tailed Macaque is found strictly in the rainforests of SW India (Western Ghats).',
      'Sangai dancing deer is endemic to Loktak lake in Northeast (Indo-Burma).',
      'Nicobar megapode is endemic to Nicobar islands (Sundaland).',
    ],
  },
  // 13. Standard - Application: Traditional Architecture (c9_evs_020)
  {
    id: 'ch_13',
    nodeId: NODE_C9_EVS_020,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How do traditional "Chang Ghar" stilt houses of the Mising tribe in the Assam Brahmaputra valley adapt to local climatic hazards?',
    options: [
      'Thick mud walls store solar heat during harsh sub-zero snowstorms.',
      'Bamboo stilts raise living quarters above annual monsoon floodwaters and promote cross-ventilation in humid heat.',
      'Flat stone roofs collect snowfall to prevent roof collapse.',
      'Subterranean basement rooms protect against extreme desert sandstorms.',
    ],
    correctIndex: 1,
    explanation: 'Chang Ghar stilt houses elevate dwellings above the seasonal flood levels of the Brahmaputra while enhancing air circulation in humid tropical river valleys.',
    hints: [
      'Think about the biggest natural hazard in Assam during the monsoon.',
      'The Brahmaputra floods annually; raising homes on stilts prevents inundation.',
      'Elevated structures also allow cool breezes to flow through bamboo flooring.',
    ],
  },
  // 14. Standard - Analysis: Flagship vs Keystone vs Indicator (c9_evs_019)
  {
    id: 'ch_14',
    nodeId: NODE_C9_EVS_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Lichens on tree bark vanish when atmospheric sulphur dioxide rises. Epiphytic lichens are an example of which functional category?',
    options: [
      'Flagship species',
      'Keystone species',
      'Indicator species',
      'Endemic invasive species',
    ],
    correctIndex: 2,
    explanation: 'An indicator species is an organism whose presence, absence, or abundance reflects the health and environmental quality of an ecosystem.',
    hints: [
      'Is the lichen chosen as a celebrity symbol for fundraising? (No, that is flagship).',
      'Does the whole ecosystem collapse physically if one lichen is removed? (No, that is keystone).',
      'It signals pollution levels because of its sensitivity—hence an Indicator.',
    ],
  },
  // 15. Advanced - Evaluation: Wetland Conservation Economics (c9_evs_017)
  {
    id: 'ch_15',
    nodeId: NODE_C9_EVS_017,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A coastal municipal corporation proposes draining 500 hectares of East Kolkata Wetlands to construct commercial real estate. How does ecological economics evaluate this plan?',
    options: [
      'The plan is 100% sound because nature provides zero taxable revenue compared to commercial real estate.',
      'The plan is economically flawed because the natural wetland provides free sewage purification, flood mitigation, and fisheries whose replacement cost exceeds real estate gains.',
      'Draining wetlands improves global primary productivity by eliminating mosquitoes.',
      'Wetlands produce methane, so draining them permanently halts all climate change.',
    ],
    correctIndex: 1,
    explanation: 'Ecosystem services valuation reveals that natural sewage treatment, flood buffers, and fishery yields in East Kolkata Wetlands save thousands of crores compared to artificial civil infrastructure.',
    hints: [
      'Consider the concept of "replacement cost" in environmental economics.',
      'If you drain the wetland, how will the city treat millions of litres of sewage daily?',
      'Building artificial sewage plants and flood dykes costs far more than the short-term land sale value.',
    ],
  },
  // 16. Advanced - Analysis: Ecological Threshold & Regime Shifts (c9_evs_018)
  {
    id: 'ch_16',
    nodeId: NODE_C9_EVS_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In arid rangelands bordering the Thar Desert, overgrazing removes perennial grasses beyond the ecological threshold. What marks the resulting regime shift?',
    options: [
      'The soil immediately reverts to lush grassland as soon as livestock are removed for one weekend.',
      'Topsoil erodes, the soil seed bank is lost, and hardpan soil creates permanent desertification that does not spontaneously recover.',
      'Nitrogen-fixing legumes rapidly multiply to convert the bare sand into tropical rainforest.',
      'Underground aquifers overflow to create natural freshwater springs.',
    ],
    correctIndex: 1,
    explanation: 'Crossing an ecological threshold triggers an irreversible regime shift. Soil crust degradation and erosion lead to desertification that cannot self-repair easily.',
    hints: [
      'Recall the difference between carrying capacity (steady ceiling) and threshold (danger line).',
      'Crossing a threshold causes a permanent state change (regime shift).',
      'Loss of topsoil structure and seed banks locks the system in a degraded desert state.',
    ],
  },
  // 17. Advanced - Evaluation: Sacred Groves Conservation (c9_evs_020)
  {
    id: 'ch_17',
    nodeId: NODE_C9_EVS_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why are Sacred Groves (such as Mawphlang in Meghalaya or Deorais in Maharashtra) considered invaluable in-situ biodiversity conservation models?',
    options: [
      'They are commercial timber plantations harvested every three years for government paper mills.',
      'Centuries-old religious taboos against felling or hunting have preserved undisturbed climax vegetation and rare medicinal endemics that have vanished elsewhere.',
      'They were artificially constructed by colonial botanists using imported exotic weeds.',
      'They contain no animal life, protecting only abiotic mineral deposits.',
    ],
    correctIndex: 1,
    explanation: 'Community-governed taboos protect sacred groves from exploitation, maintaining virgin microclimates and acting as living refugia for rare medicinal plants and fauna.',
    hints: [
      'Who protects sacred groves? Local communities through cultural and spiritual reverence.',
      'Because trees cannot be felled, what happens to the native biodiversity over centuries?',
      'They preserve original ancient forests when surrounding lands are cleared for roads and farming.',
    ],
  },
  // 18. Advanced - Creativity: Sustainable Rangeland Strategy (c9_evs_012)
  {
    id: 'ch_18',
    nodeId: NODE_C9_EVS_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an ecological restoration plan for degraded Banni Grasslands in Kachchh, Gujarat. Which integrated strategy best balances pastoral livelihoods with grassland integrity?',
    options: [
      'Total suppression of all natural fire, followed by complete concrete paving to stop soil dust.',
      'Rotational grazing with fixed stocking density, eradication of invasive Prosopis juliflora, and reseeding native palatable perennial grasses (e.g., Cenchrus ciliaris).',
      'Converting the entire grassland into a monoculture eucalyptus timber plantation.',
      'Flooding the grassland with seawater to cultivate marine kelp.',
    ],
    correctIndex: 1,
    explanation: 'Rotational grazing prevents overshooting carrying capacity, removing invasive mesquite restores native grass cover, and reseeding deep-rooted Cenchrus ciliaris restores soil health.',
    hints: [
      'Think about how to balance pastoralist needs (Maldhari herders) without degrading grass cover.',
      'Invasive thorny mesquite (Prosopis juliflora) must be controlled.',
      'Rotational grazing lets pasture rest and regrow from basal meristems.',
    ],
  },
  // 19. Advanced - Analysis: Carbon Sinks & Permafrost Feedback (c9_evs_013)
  {
    id: 'ch_19',
    nodeId: NODE_C9_EVS_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the thawing of Arctic and Himalayan alpine permafrost described as a dangerous positive feedback loop for global climate change?',
    options: [
      'Melting permafrost creates freshwater that absorbs all carbon dioxide from the atmosphere.',
      'Thawing releases vast trapped ancient organic matter; anaerobic decomposition releases methane (CH4) and CO2, driving further warming and more thaw.',
      'Permafrost thaw reflects 100% of incoming solar radiation back to deep space, cooling the Earth.',
      'Frozen ice expands into diamonds that crush the underlying crust.',
    ],
    correctIndex: 1,
    explanation: 'Permafrost holds massive locked organic carbon. When it thaws, microbes produce methane (CH4, ~25x more potent than CO2), amplifying global warming in a vicious loop.',
    hints: [
      'What is trapped in frozen tundra soils for thousands of years? Dead organic matter.',
      'When thawed, bacteria decompose it and release potent greenhouse gases (CO2 & CH4).',
      'More greenhouse gases -> higher temperatures -> more permafrost thaws. This is positive feedback.',
    ],
  },
  // 20. Advanced - Application: Lotic River Zonation (c9_evs_014)
  {
    id: 'ch_20',
    nodeId: NODE_C9_EVS_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Comparing the headwaters of the Bhagirathi River in Uttarakhand with the lower Ganga delta in West Bengal, how do physical and biological parameters transition?',
    options: [
      'Headwaters: warm, muddy, low oxygen, carp-dominated -> Delta: cold, torrential, high oxygen, trout-dominated.',
      'Headwaters: cold, torrential, high dissolved oxygen, clear water -> Delta: slow, warm, high turbidity/sediment, lower oxygen.',
      'Both stretches have identical flow velocity, temperature, and fish communities.',
      'Headwaters are lentic standing lakes, whereas the delta is lotic high-velocity cascades.',
    ],
    correctIndex: 1,
    explanation: 'Rivers follow a lotic gradient: headwaters are fast, cold, clear, and oxygen-saturated; mouth/deltas are slow, warm, turbid, and carry heavy sediment loads.',
    hints: [
      'Consider mountain torrents crashing over rocks vs sluggish broad plains deltas.',
      'Turbulent fast mountain water mixes vigorously with air -> highest dissolved oxygen.',
      'As rivers reach the plains, velocity drops, temperature rises, and silt accumulates.',
    ],
  },
  // 21. Advanced - Construct: Trophic Transfer & Energy Flow (c9_evs_016)
  {
    id: 'ch_21',
    nodeId: NODE_C9_EVS_016,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the linear unidirectional energy flow chain through a forest ecosystem.',
    availableParts: ['Solar Radiation', 'Primary Producers (Trees/Plants)', 'Primary Consumers (Herbivores/Deer)', 'Secondary Consumers (Carnivores/Tiger)', 'Decomposers (Fungi/Bacteria)'],
    targetState: 'Solar Radiation Primary Producers (Trees/Plants) Primary Consumers (Herbivores/Deer) Secondary Consumers (Carnivores/Tiger) Decomposers (Fungi/Bacteria)',
    validationHint: 'Arrange energy transfer from sun through trophic levels to ultimate decomposition.',
    explanation: 'Energy flows unidirectionally from the sun -> autotrophs -> herbivores -> top predators -> and finally to decomposers, dissipating as metabolic heat at each step.',
    hints: [
      'Start with the ultimate cosmic energy source (Sun).',
      'Follow Lindeman\'s 10% trophic transfer sequence from autotrophs to apex carnivores.',
      'Decomposers mineralise the final organic remains.',
    ],
  },
  // 22. Advanced - Evaluation: Traditional Water Harvesting (c9_evs_020)
  {
    id: 'ch_22',
    nodeId: NODE_C9_EVS_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do traditional Khadin earthen embankments and Baolis (step-wells) in Rajasthan remain superior for arid resilience compared to mega-canal water imports?',
    options: [
      'Khadins require zero rain and create synthetic chemical water underground.',
      'They capture local surface runoff, recharge aquifers in situ, prevent soil erosion, deposit fertile silt, and entail no evaporative loss or canal waterlogging.',
      'They are built of gold and repel desert heat by magnetic levitation.',
      'They eliminate the need for agriculture by generating ready-to-eat wheat grains.',
    ],
    correctIndex: 1,
    explanation: 'Khadins and Baolis harvest local precipitation, recharge the water table, retain fertile silt in crop fields, and avoid the severe salinisation associated with large canal irrigation.',
    hints: [
      'Think about local water harvesting vs massive open canal water evaporation.',
      'Khadin beds retain moisture and fine nutrient-rich silt for a successful winter (rabi) crop.',
      'They recharge groundwater tables locally without costly maintenance.',
    ],
  },
  // ─── Class 10 board-depth additions: forest-and-wildlife / water-resources diagnostics ───
  {
    id: 'ch_depth_evs_mining_eia',
    nodeId: 'c10_geo_cbse_02_003',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A mining lease in Chhattisgarh forest requires clearing 120 hectares; the EIA promises compensatory afforestation of 120 hectares elsewhere. Is one-for-one replanting ecologically sufficient?',
    options: [
      'Insufficient as stated -- a natural forest\'s biodiversity (understorey, soil biota, canopy microclimate, wildlife corridors) cannot be rebuilt by planting an equal AREA of saplings; good practice needs like-for-like ecosystem compensation, native species mix, protection for the surviving forest corridors, and community consent under FRA/PESA',
      'Yes -- area equality makes it fully ecological',
      'No -- mining can never be permitted anywhere in India',
      'Yes, provided the saplings are ornamental exotics'
    ],
    correctIndex: 0,
    explanation:
      'The Project Tiger lesson (Sariska, 2005): tigers vanished from a reserve despite "protected" status -- enforcement and habitat quality matter more than paper notification. Evaluate compensation plans by: species mix, survival rate, distance from the lost forest (offset nearby), and whether forest-dwellers\' rights were settled first.',
    hints: [
      'Area is not ecosystem -- what lives in 30-year-old forest that a sapling field lacks?',
      'Who must consent when tribal land is involved?',
      'Sariska showed paper protection failing -- why?'
    ],
  },
  {
    id: 'ch_depth_evs_chipko_jfm',
    nodeId: 'c10_geo_cbse_02_007',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare the Chipko Movement (1973) with Joint Forest Management (JFM, 1990 onwards): who initiated each, what role did the Forest Department play, and what were the outcomes?',
    options: [
      'Chipko was COMMUNITY-INITIATED (village women of Reni, Uttarakhand, hugging trees against contractor felling; the Department was the opposing authority) and won a 15-year commercial green-felling ban plus inspiration for Appiko; JFM is DEPARTMENT-INITIATED policy (Odisha 1988, national 1990) where village committees share protection duties and forest produce with the Forest Department -- shifting from policing to partnership',
      'Both were started by the Forest Department to plant trees',
      'Chipko was a contractor-led protest; JFM banned all community roles',
      'Chipko happened in Kerala; JFM never left Odisha'
    ],
    correctIndex: 0,
    explanation:
      'The sequence matters for board answers: community revolt (Chipko, 1973) -> policy recognition (National Forest Policy 1988: ecology first) -> institutional partnership (JFM resolutions 1990) -> rights law (Forest Rights Act 2006). Grassroots pressure became government structure -- the classic arc of environmental democracy in India.',
    hints: [
      'Who initiated: villagers or the state?',
      'What did each side get -- ban, partnership, or both?',
      'Place JFM between Chipko (1973) and FRA (2006).'
    ],
  },
  {
    id: 'ch_depth_evs_bishnoi_chipko',
    nodeId: 'c10_geo_cbse_02_008',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the Bishnoi practice "faith-based" conservation while Chipko is "ecological/economic"? Compare their long-term outcomes, and design an exhibition poster "Roots of Resistance: How Communities Save Forests".',
    options: [
      'The Bishnois protect khejri trees and wildlife as a 29-rule RELIGIOUS dharma (Amrita Devi\'s 1730 Khejri sacrifice -- 363 lives), giving durable, rule-based protection regardless of economics; Chipko villagers acted on LIVELIHOOD ecology (forests regulate springs, soil, fuelwood). Outcomes: Bishnoi -> sacred groves and species refuges persisting centuries; Chipko -> policy change (felling ban). Poster: panel 1 Khejri 1730 sacrifice, panel 2 Reni 1973, panel 3 JFM committees, panel 4 your own pledge line',
      'Both are purely economic; the Bishnois demanded timber profits',
      'Chipko was religious; the Bishnois wanted mining leases',
      'Faith-based conservation has no long-term effects'
    ],
    correctIndex: 0,
    explanation:
      'Frame the comparison on MOTIVE (dharma vs livelihood), SCALE (centuries vs a decade), RESULT (species/grove survival vs legislative change) -- then note both prove the same thesis: conservation succeeds where the community holds power. Poster checklist: dates, place names, one line on motive, one on outcome, and a "what can WE do" footer.',
    hints: [
      'Motive decides the label: dharma or livelihood?',
      '363 Bishnoi martyrs predate every environment law.',
      'Posters need a date, a name, and a call to action.'
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: 'c9_evs_011',
  title: 'Forest & Terrestrial Ecosystems Simulation',
  definition: 'A forest ecosystem is a self-sustaining biological community dominated by trees and interacting biotic and abiotic components, providing carbon storage, water cycle regulation, and rich biodiversity.',
  eli5: 'Think of ecosystems as planetary biomes wearing climate-tailored clothing: wet evergreen coats near the equator, deciduous jackets that drop leaves in temperate autumns, and needle-cone armor in the icy taiga.',
  misconceptions: [
    {
      misconception: 'The taiga has the highest biodiversity because it is the largest terrestrial forest biome on Earth.',
      correction: 'Size does not equal biodiversity. The harsh subarctic cold allows only hardy conifers and few animal species; tropical rainforests hold the greatest biodiversity due to multi-layered warm, moist niches.',
    },
    {
      misconception: 'The camel stores liquid drinking water in its dorsal hump.',
      correction: 'The camel hump stores lipid fat, which yields metabolic water during oxidation and concentrates urine to prevent dehydration.',
    },
    {
      misconception: 'Nitrogen gas in atmospheric abundance (78%) can be directly absorbed by green plant leaves.',
      correction: 'Atmospheric N2 is inert. It must first be fixed into ammonia/nitrates by specialised bacteria (Rhizobium, Azotobacter, Nitrosomonas, Nitrobacter).',
    },
    {
      misconception: 'Eutrophication is simply another general word for plastic and chemical water pollution.',
      correction: 'Eutrophication specifically refers to excess nutrient enrichment (N & P) causing algal blooms, decomposition oxygen collapse (hypoxia), and fish kills.',
    },
    {
      misconception: 'Coral bleaching means the coral animal polyps die immediately upon heating.',
      correction: 'Bleaching is the expulsion of symbiotic zooxanthellae algae due to thermal stress. Polyps can recover if normal sea temperatures return swiftly.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which forest biome features evergreen broadleaf trees with >200 cm rainfall?', options: ['Taiga', 'Temperate', 'Tropical rainforest', 'Desert scrub'], correctIndex: 2 },
    { question: 'What is the dark, nutrient-rich fertile soil formed in temperate steppes?', options: ['Laterite', 'Chernozem (Black Earth)', 'Podzol', 'Silty loess'], correctIndex: 1 },
    { question: 'What permanently frozen ground layer defines the Arctic tundra?', options: ['Hardpan', 'Permafrost', 'Regolith', 'Bedrock'], correctIndex: 1 },
    { question: 'Standing freshwater water bodies (lakes, ponds) are classified as:', options: ['Lotic', 'Lentic', 'Estuarine', 'Benthic'], correctIndex: 1 },
    { question: 'What root adaptations allow mangroves to breathe in oxygen-poor tidal mud?', options: ['Tap roots', 'Pneumatophores & Prop roots', 'Fibrous roots', 'Tuberous roots'], correctIndex: 1 },
    { question: 'What is the fundamental formula for Net Primary Productivity?', options: ['NPP = GPP + R', 'NPP = GPP - R', 'NPP = R - GPP', 'NPP = GPP × R'], correctIndex: 1 },
    { question: 'Cyclone storm surge protection by coastal mangroves is classified under MEA as a:', options: ['Provisioning service', 'Regulating service', 'Supporting service', 'Cultural service'], correctIndex: 1 },
    { question: 'Which endemic flagship species belongs to the Western Ghats hotspot?', options: ['Snow Leopard', 'Lion-tailed Macaque', 'Sangai Deer', 'Nicobar Megapode'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when students analyze terrestrial and aquatic ecosystem dynamics, compute productivity budgets, prevent eutrophic threshold crashes, and evaluate indigenous conservation models.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Tropical Rainforest Stratification & Microclimates',
    instruction: 'Drag the solar radiation and rainfall sliders to observe vertical light penetration and canopy layering.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_011,
  },
  {
    title: '2. Global Biome Climate Envelope (Precipitation vs Temperature)',
    instruction: 'Click on different biome nodes to inspect vegetation, adaptations, and soil profiles.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_EVS_012,
  },
  {
    title: '3. Freshwater Lake Eutrophication & Dissolved Oxygen',
    instruction: 'Increase agricultural fertiliser inflow and observe algal bloom vs bottom-water oxygen collapse.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_014,
  },
  {
    title: '4. Coastal Blue Carbon & Mangrove Estuarine Nursery',
    instruction: 'Toggle coastal mangrove density to test storm surge attenuation and juvenile fish survival.',
    interactionType: 'toggle-balance',
    nodeId: NODE_C9_EVS_015,
  },
  {
    title: '5. India\'s 4 Biodiversity Hotspots & Flagship Species',
    instruction: 'Explore the 4 biogeographical hotspot zones of India and inspect their flagship endemic species.',
    interactionType: 'map-explore',
    nodeId: NODE_C9_EVS_019,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Action Plan: Local Watershed & Biodiversity Stewardship',
  description: 'Apply your ecosystem knowledge to design a community resilience charter for an Indian district (e.g., Western Ghats watershed, Dal Lake basin, or Sundarbans fringe).',
  steps: [
    'Demarcate a 50-metre native riparian buffer zone along all freshwater streams to filter farm runoff.',
    'Establish a community Sacred Grove (Deorai) to safeguard endangered endemic medicinal plants.',
    'Construct Khadin water-harvesting bunds to recharge local groundwater and arrest soil erosion.',
    'Institute a seasonal fishing ban during monsoon spawning to prevent collapse below carrying capacity.',
  ],
};

// ─── MAIN COMPONENT ───
function C9_EVSForestEcosystemsTropicalSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c9_evs_011',
  title = DEFAULT_PROPS.title || 'Forest & Terrestrial Ecosystems Simulation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant-style Predict & Observe state
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [activePredictTab, setActivePredictTab] = useState<number>(0);
  const [activeObserveTab, setActiveObserveTab] = useState<number>(0);

  // Interactive Exploration Simulation States
  const [rainfallLevel, setRainfallLevel] = useState(240); // 20 - 400 cm
  const [temperatureLevel, setTemperatureLevel] = useState(28); // -15 to 45 °C
  const [fertiliserRunoff, setFertiliserRunoff] = useState(15); // 0 - 100%
  const [mangroveCover, setMangroveCover] = useState(80); // 0 - 100%
  const [selectedBiome, setSelectedBiome] = useState<'tropical' | 'temperate' | 'taiga' | 'savanna' | 'desert' | 'tundra'>('tropical');
  const [selectedHotspot, setSelectedHotspot] = useState<'western_ghats' | 'himalayas' | 'indo_burma' | 'sundaland'>('western_ghats');

  // Interactive Sandbox / Multi-variable States
  const [gppValue, setGppValue] = useState(25000);
  const [respirationFraction, setRespirationFraction] = useState(55);
  const [grazingPressure, setGrazingPressure] = useState(40); // cattle head count
  const [carryingCapacityK, setCarryingCapacityK] = useState(60);

  // Challenge Adaptive Engine & State
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

  // Drag-and-Drop & Numeric & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Micro-Interactions
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent references
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES ───
  const calculatedNPP = useMemo(() => {
    const r = (gppValue * respirationFraction) / 100;
    return Math.round(gppValue - r);
  }, [gppValue, respirationFraction]);

  const lakeDissolvedOxygen = useMemo(() => {
    const baseDO = 9.5;
    const loss = (fertiliserRunoff / 100) * 8.2;
    return Math.max(0.5, +(baseDO - loss).toFixed(1));
  }, [fertiliserRunoff]);

  const stormSurgeAttenuation = useMemo(() => {
    return Math.min(95, Math.round((mangroveCover / 100) * 85 + 5));
  }, [mangroveCover]);

  const rangelandStatus = useMemo(() => {
    if (grazingPressure > carryingCapacityK * 1.3) {
      return { status: 'Severe Overshoot & Regime Shift Danger', color: 'text-rose-400', bg: 'bg-rose-950/60 border-rose-500' };
    }
    if (grazingPressure > carryingCapacityK) {
      return { status: 'Overshoot (Resource Depletion)', color: 'text-amber-400', bg: 'bg-amber-950/60 border-amber-500' };
    }
    return { status: 'Sustainable Grazing (Within Carrying Capacity)', color: 'text-emerald-400', bg: 'bg-emerald-950/60 border-emerald-500' };
  }, [grazingPressure, carryingCapacityK]);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
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

  // ─── HTML5 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const particles: { x: number; y: number; speedY: number; radius: number; hue: number }[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * 180,
      y: Math.random() * 35,
      speedY: 0.2 + Math.random() * 0.5,
      radius: 1 + Math.random() * 1.5,
      hue: Math.random() > 0.5 ? 140 : 200,
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      grad.addColorStop(1, 'rgba(30, 41, 59, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 60%, 0.7)`;
        ctx.fill();
      });

      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.05) * 4;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

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

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Insightful deduction! Now let us explore why climate shapes biomes.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PREDICTION HANDLER ───
  const handlePredictionAnswer = useCallback((qIdx: number, optIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const isCorr = optIdx === PREDICTION_QUESTIONS[qIdx].correctIndex;
    audioManager.play(isCorr ? 'success' : 'tap');
  }, []);

  // ─── OBSERVATION HANDLER ───
  const handleObservationAnswer = useCallback((qIdx: number, optIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    const isCorr = optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex;
    audioManager.play(isCorr ? 'success' : 'tap');
  }, []);

  // ─── NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive ecosystem observatory. Explore each biome and discover ecological functions.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Manipulate forest productivity, lake pollution, and grazing limits without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing board-standard competency challenges. Read each scenario carefully.');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  // ─── DRAG & DROP HANDLERS ───
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

  // ─── DRAG SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === (challenge.sortItems?.length || 0)
        ? [...prev]
        : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const current = sortArrangement.length === (challenge.sortItems?.length || 0)
      ? sortArrangement
      : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(current) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      setErrors(e => e + 1);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ─── COMPLETION & SCORE RECORDING ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Ecosystems and Biodiversity Mastery simulation.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ───
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

  // ─── UNIVERSAL ANSWER HANDLER ───
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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
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
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Review the step-by-step ecological breakdown.');
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

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans select-none">
      
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner shadow-emerald-500/20"
            aria-label="Environmental science logo"
            role="img"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">CISCE Class 9 EVS</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">Section 2 Biomes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation sections">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((pTab) => (
            <motion.button
              key={pTab}
              role="tab"
              aria-selected={phase === pTab}
              aria-label={`Switch to ${pTab} section`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(pTab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                phase === pTab 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {pTab === 'discovery' && '🔍 Hook'}
              {pTab === 'explore' && '🔬 Labs'}
              {pTab === 'sandbox' && '🎛️ Sandbox'}
              {pTab === 'challenge' && '🎯 Challenges'}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── DISCOVERY HOOK PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-800/40 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 font-mono font-bold uppercase tracking-wider">
                  Scenario Dossier
                </span>
                <span className="text-xs text-slate-400">ICSE Curriculum Standard</span>
              </div>
              <h2 className="text-2xl font-bold text-emerald-200 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <span className="text-emerald-400 text-base" aria-hidden="true">⚠️</span>
                <span>{SCENARIO.context}</span>
              </div>
            </div>

            {/* Curiosity Puzzle */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 block">Curiosity Hook (Non-Graded)</span>
              <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/40 border border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:border-emerald-500/50 shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>
                        {discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex && '✓ '}
                        {opt}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 bg-emerald-950/40 border border-emerald-600/40 rounded-xl flex flex-wrap items-center justify-between gap-3"
                >
                  <p className="text-xs sm:text-sm text-emerald-300">
                    {discoveryCorrect ? '✓ Correct! ' : '💡 Discover why: '} {DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <motion.button
                    aria-label="Launch Guided Labs"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    <span>Launch Guided Labs</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* ─── BRILLIANT PREDICTION SECTION (Predict-then-verify pattern) ─── */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-indigo-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-indigo-400">
                    🎯 Brilliant.org Pattern · Predict Before Testing
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">Hypothesis & Prediction Labs</h3>
                </div>
                <div className="flex gap-2">
                  {PREDICTION_QUESTIONS.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setActivePredictTab(pIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activePredictTab === pIdx
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Prediction #{pIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const pQ = PREDICTION_QUESTIONS[activePredictTab];
                const hasAnswered = predictionAnswers[activePredictTab] !== undefined;
                const chosen = predictionAnswers[activePredictTab];
                return (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200">{pQ.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pQ.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionAnswer(activePredictTab, oIdx)}
                          className={`p-3 rounded-xl text-xs text-left transition-all ${
                            hasAnswered
                              ? oIdx === pQ.correctIndex
                                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200 font-bold'
                                : chosen === oIdx
                                ? 'bg-rose-950 border border-rose-500 text-rose-300'
                                : 'bg-slate-900 text-slate-500 opacity-50'
                              : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="font-mono mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                    {hasAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-700/60 text-xs text-indigo-200 space-y-1"
                      >
                        <p><span className="font-bold text-indigo-300">Explanation:</span> {pQ.explanation}</p>
                        <p className="text-amber-300 font-semibold">🔍 Verify in Labs: {pQ.verifyInstruction}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── INTERACTIVE EXPLORATION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Slide Navigation Header */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  aria-label="Previous Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded-xl text-xs font-bold text-white"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  aria-label={currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox' : 'Next Lab'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={currentSlide === EXPLORATION_STEPS.length - 1 ? handleAdvanceToSandbox : handleNextSlide}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-600/30"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox →' : 'Next Lab →'}
                </motion.button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-300 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* ─── LAB 1: FOREST CANOPY STRATIFICATION SVG ─── */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="lg:col-span-2 relative bg-slate-950 rounded-xl p-4 overflow-hidden border border-slate-800">
                  <svg viewBox="0 0 500 320" className="w-full h-auto" aria-label="Rainforest Canopy Stratification Diagram" role="img">
                    <defs>
                      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                      <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#14532d" />
                      </linearGradient>
                    </defs>

                    <rect x="0" y="0" width="500" height="320" fill="url(#skyGrad)" />
                    <circle cx="430" cy="50" r="28" fill="#facc15" opacity="0.9" />
                    <circle cx="430" cy="50" r="38" fill="#facc15" opacity="0.2" />

                    {rainfallLevel > 150 && (
                      <g opacity="0.6" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3">
                        <line x1="50" y1="20" x2="40" y2="100" />
                        <line x1="120" y1="30" x2="110" y2="120" />
                        <line x1="220" y1="10" x2="210" y2="130" />
                        <line x1="320" y1="40" x2="310" y2="140" />
                      </g>
                    )}

                    <g opacity={rainfallLevel > 180 ? 1 : 0.4}>
                      <rect x="180" y="30" width="20" height="240" fill="#78350f" />
                      <circle cx="190" cy="40" r="45" fill="url(#canopyGrad)" />
                      <text x="250" y="45" fill="#fef08a" fontSize="11" fontWeight="bold">Emergent Layer (45m - Dipterocarpus)</text>
                    </g>

                    <g opacity={rainfallLevel > 100 ? 0.95 : 0.3}>
                      <rect x="60" y="90" width="16" height="180" fill="#854d0e" />
                      <ellipse cx="68" cy="95" rx="55" ry="35" fill="#15803d" />
                      <rect x="330" y="85" width="18" height="185" fill="#854d0e" />
                      <ellipse cx="339" cy="90" rx="60" ry="38" fill="#166534" />
                      <text x="35" y="80" fill="#86efac" fontSize="10" fontWeight="bold">Canopy (25-35m: 90% Light Blocked)</text>
                    </g>

                    <g opacity={rainfallLevel > 50 ? 0.85 : 0.2}>
                      <rect x="120" y="180" width="10" height="90" fill="#713f12" />
                      <ellipse cx="125" cy="185" rx="30" ry="20" fill="#16a34a" />
                      <rect x="270" y="175" width="12" height="95" fill="#713f12" />
                      <ellipse cx="276" cy="180" rx="35" ry="22" fill="#15803d" />
                      <text x="295" y="195" fill="#4ade80" fontSize="9">Understorey (Low Light, Broad Leaves)</text>
                    </g>

                    <rect x="0" y="270" width="500" height="50" fill="#3f2e18" />
                    <text x="20" y="295" fill="#cbd5e1" fontSize="10" fontWeight="bold">Forest Floor (Litter, Fungi, Decomposers)</text>
                    <ellipse cx="80" cy="285" rx="15" ry="6" fill="#a16207" />
                    <ellipse cx="230" cy="288" rx="20" ry="7" fill="#a16207" />
                    <ellipse cx="390" cy="283" rx="18" ry="6" fill="#a16207" />

                    <rect x="330" y="275" width="150" height="35" rx="6" fill="#0f172a" stroke="#334155" />
                    <text x="340" y="295" fill="#38bdf8" fontSize="10">
                      Floor Sunlight: {rainfallLevel > 200 ? '1.5%' : rainfallLevel > 100 ? '12%' : '48%'}
                    </text>
                  </svg>
                </div>

                {/* Microclimate Sliders */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Microclimate Controls</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Annual Rainfall</span>
                      <span className="text-emerald-400 font-mono font-bold">{rainfallLevel} cm/yr</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={400}
                      value={rainfallLevel}
                      aria-label="Annual Rainfall in cm per year"
                      onChange={(e) => {
                        setRainfallLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Mean Temperature</span>
                      <span className="text-amber-400 font-mono font-bold">{temperatureLevel} °C</span>
                    </div>
                    <input
                      type="range"
                      min={-15}
                      max={45}
                      value={temperatureLevel}
                      aria-label="Mean Temperature in degrees Celsius"
                      onChange={(e) => {
                        setTemperatureLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 bg-slate-800"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                    <span className="font-bold text-slate-300">Biome Diagnosis:</span>
                    <p className="text-emerald-400 font-semibold">
                      {rainfallLevel >= 200 && temperatureLevel >= 22
                        ? '🌿 Tropical Rainforest (Multi-tiered evergreen)'
                        : rainfallLevel >= 75 && temperatureLevel >= 8
                        ? '🍂 Temperate Deciduous (Seasonal leaf-shed)'
                        : rainfallLevel >= 40 && temperatureLevel <= 5
                        ? '🌲 Taiga / Boreal (Coniferous needles)'
                        : rainfallLevel < 25
                        ? '🌵 Arid Desert (Xerophytic cacti)'
                        : '🌾 Savanna Grassland'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 2: BIOME COMPARISON & ADAPTATION PROFILE ─── */}
            {currentSlide === 1 && (
              <div className="space-y-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2" role="group" aria-label="Select Biome">
                  {(['tropical', 'temperate', 'taiga', 'savanna', 'desert', 'tundra'] as const).map((bKey) => (
                    <motion.button
                      key={bKey}
                      aria-label={`Select ${bKey} biome`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedBiome(bKey);
                        audioManager.play('tap');
                      }}
                      className={`p-3 rounded-xl text-xs font-bold capitalize transition-all ${
                        selectedBiome === bKey
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 border border-emerald-400'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {bKey === 'tropical' && '🌿 Tropical'}
                      {bKey === 'temperate' && '🍂 Temperate'}
                      {bKey === 'taiga' && '🌲 Taiga'}
                      {bKey === 'savanna' && '🌾 Savanna'}
                      {bKey === 'desert' && '🌵 Desert'}
                      {bKey === 'tundra' && '❄️ Tundra'}
                    </motion.button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">Climate & Rain</span>
                    <p className="text-sm text-slate-200">
                      {selectedBiome === 'tropical' && '>200 cm/yr rainfall, hot & humid year-round (25-30°C).'}
                      {selectedBiome === 'temperate' && '75-150 cm/yr rainfall, 4 distinct seasons, freezing winters.'}
                      {selectedBiome === 'taiga' && '40-80 cm precipitation, long freezing winters (-30°C), short summer.'}
                      {selectedBiome === 'savanna' && '50-150 cm rainfall, distinct wet/dry cycle, warm all year.'}
                      {selectedBiome === 'desert' && '<25 cm/yr rainfall, extreme diurnal variation (45°C day, 10°C night).'}
                      {selectedBiome === 'tundra' && '<25 cm precipitation, bitterly cold (-40°C), 50-60 day growing season.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold">Flora & Adaptations</span>
                    <p className="text-sm text-slate-200">
                      {selectedBiome === 'tropical' && 'Evergreen broadleaf trees, buttress roots, epiphytic orchids, lianas.'}
                      {selectedBiome === 'temperate' && 'Broadleaf deciduous (Oak, Maple, Beech) shedding leaves in autumn.'}
                      {selectedBiome === 'taiga' && 'Coniferous needle-leaves (Pine, Spruce, Fir) with waxy cuticles to shed snow.'}
                      {selectedBiome === 'savanna' && 'Tall grasses with basal meristems, scattered fire-adapted Acacia and Baobab.'}
                      {selectedBiome === 'desert' && 'Xerophytic succulents (Cacti), spines replacing leaves, deep taproots.'}
                      {selectedBiome === 'tundra' && 'Lichens, mosses, dwarf shrubs, shallow roots above permafrost.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-bold">Soils & Flagship Fauna</span>
                    <p className="text-sm text-slate-200">
                      {selectedBiome === 'tropical' && 'Laterite soils (leached); Lion-tailed Macaque, Hornbills, Jaguar.'}
                      {selectedBiome === 'temperate' && 'Rich brown forest soils; White-tailed Deer, Black Bear, Red Fox.'}
                      {selectedBiome === 'taiga' && 'Acidic Podzols; Moose, Siberian Tiger, Lynx, Boreal Owl.'}
                      {selectedBiome === 'savanna' && 'Chernozem/Ferralsols; Wildebeest, Zebras, African Elephant, Lions.'}
                      {selectedBiome === 'desert' && 'Sandy/Rocky, low organic matter; Camel (fat hump), Fennec Fox.'}
                      {selectedBiome === 'tundra' && 'Permafrost (frozen subsoil); Caribou/Reindeer, Arctic Fox, Lemmings.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 3: LAKE EUTROPHICATION & DISSOLVED OXYGEN SIMULATOR ─── */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 500 280" className="w-full h-auto" aria-label="Lake Eutrophication and Dissolved Oxygen Model" role="img">
                    <rect x="0" y="0" width="500" height="280" fill="#0369a1" opacity={fertiliserRunoff > 60 ? '0.5' : '0.8'} />

                    <rect
                      x="0"
                      y="40"
                      width="500"
                      height="30"
                      fill="#22c55e"
                      opacity={Math.min(1, fertiliserRunoff / 70)}
                    />

                    <polygon
                      points="100,0 400,0 450,220 50,220"
                      fill="#fef08a"
                      opacity={Math.max(0.05, 0.4 - fertiliserRunoff / 200)}
                    />

                    <path d="M 0,40 Q 50,140 100,240 L 0,240 Z" fill="#78350f" />
                    <text x="10" y="100" fill="#fef08a" fontSize="10" fontWeight="bold">Littoral Zone</text>
                    <line x1="60" y1="130" x2="60" y2="70" stroke="#15803d" strokeWidth="4" />
                    <line x1="75" y1="160" x2="75" y2="100" stroke="#15803d" strokeWidth="4" />

                    <text x="220" y="100" fill="#ffffff" fontSize="11" fontWeight="bold">Limnetic Zone (Phytoplankton)</text>

                    <rect x="100" y="200" width="400" height="80" fill="#0f172a" opacity={fertiliserRunoff > 50 ? '0.95' : '0.7'} />
                    <text x="220" y="240" fill="#94a3b8" fontSize="11" fontWeight="bold">Profundal Zone (Decomposition)</text>

                    {lakeDissolvedOxygen >= 4 ? (
                      <g fill="#f59e0b">
                        <ellipse cx="220" cy="140" rx="14" ry="7" />
                        <polygon points="206,140 196,134 196,146" />
                        <ellipse cx="340" cy="160" rx="14" ry="7" />
                        <polygon points="326,160 316,154 316,166" />
                      </g>
                    ) : (
                      <g fill="#ef4444">
                        <ellipse cx="220" cy="55" rx="14" ry="7" />
                        <polygon points="206,55 196,49 196,61" />
                        <text x="200" y="35" fill="#ef4444" fontSize="10" fontWeight="bold">⚠️ Fish Kill (Anoxia)</text>
                      </g>
                    )}
                  </svg>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Nutrient Inflow (N & P)</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Fertiliser Runoff</span>
                      <span className="text-rose-400 font-mono font-bold">{fertiliserRunoff}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={fertiliserRunoff}
                      aria-label="Fertiliser runoff percentage"
                      onChange={(e) => {
                        setFertiliserRunoff(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-rose-500 bg-slate-800"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Dissolved Oxygen (DO):</span>
                      <span className={`text-base font-black font-mono ${lakeDissolvedOxygen >= 5 ? 'text-emerald-400' : lakeDissolvedOxygen >= 4 ? 'text-amber-400' : 'text-rose-400'}`}>
                        {lakeDissolvedOxygen} mg/L
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        animate={{ width: `${(lakeDissolvedOxygen / 9.5) * 100}%` }}
                        style={{
                          backgroundColor: lakeDissolvedOxygen >= 5 ? '#22c55e' : lakeDissolvedOxygen >= 4 ? '#f59e0b' : '#ef4444'
                        }}
                      />
                    </div>
                    <p className="text-xs text-slate-400">
                      {lakeDissolvedOxygen >= 5 ? '✓ Oligotrophic / Clean water - healthy aquatic fauna.' : lakeDissolvedOxygen >= 4 ? '⚠️ Eutrophic warning - sensitive aquatic organisms declining.' : '✗ Critical Anoxia! Mass fish mortality triggered.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 4: COASTAL MANGROVES & BLUE CARBON ─── */}
            {currentSlide === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 500 260" className="w-full h-auto" aria-label="Sundarbans Mangrove Delta Shield Model" role="img">
                    <rect x="0" y="160" width="500" height="100" fill="#0284c7" />
                    <path d="M 0,260 Q 150,220 300,200 L 500,220 L 500,260 Z" fill="#3f2e18" />

                    <g opacity={mangroveCover / 100}>
                      <rect x="180" y="120" width="12" height="60" fill="#713f12" />
                      <circle cx="186" cy="110" r="30" fill="#15803d" />
                      <line x1="180" y1="160" x2="160" y2="210" stroke="#713f12" strokeWidth="3" />
                      <line x1="192" y1="160" x2="210" y2="210" stroke="#713f12" strokeWidth="3" />
                      <line x1="140" y1="210" x2="140" y2="190" stroke="#854d0e" strokeWidth="2" />
                      <line x1="150" y1="215" x2="150" y2="195" stroke="#854d0e" strokeWidth="2" />
                      <line x1="225" y1="210" x2="225" y2="190" stroke="#854d0e" strokeWidth="2" />
                      <line x1="235" y1="215" x2="235" y2="195" stroke="#854d0e" strokeWidth="2" />

                      <rect x="320" y="110" width="14" height="70" fill="#713f12" />
                      <circle cx="327" cy="100" r="35" fill="#166534" />
                      <line x1="320" y1="160" x2="300" y2="215" stroke="#713f12" strokeWidth="3" />
                      <line x1="334" y1="160" x2="350" y2="215" stroke="#713f12" strokeWidth="3" />
                    </g>

                    <path
                      d="M 450,180 Q 470,160 490,180"
                      stroke="#f8fafc"
                      strokeWidth={mangroveCover < 30 ? '6' : '3'}
                      fill="none"
                    />
                    <path
                      d="M 400,185 Q 420,165 440,185"
                      stroke="#f8fafc"
                      strokeWidth={mangroveCover < 30 ? '6' : '3'}
                      fill="none"
                    />

                    <text x="20" y="40" fill="#38bdf8" fontSize="11" fontWeight="bold">
                      Sundarbans Mangrove Delta (Blue Carbon & Storm Barrier)
                    </text>
                    <text x="20" y="240" fill="#facc15" fontSize="10">
                      Pneumatophore Breathing Roots in Saline Anoxic Mud
                    </text>
                  </svg>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">Mangrove Forest Density</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Intertidal Forest Cover</span>
                      <span className="text-emerald-400 font-mono font-bold">{mangroveCover}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={mangroveCover}
                      aria-label="Mangrove cover percentage"
                      onChange={(e) => {
                        setMangroveCover(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Storm Surge Attenuation:</span>
                      <span className="font-bold text-emerald-400 font-mono">{stormSurgeAttenuation}%</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Blue Carbon Storage:</span>
                      <span className="font-bold text-cyan-400 font-mono">{(mangroveCover * 4.5).toFixed(0)} tC/ha</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {mangroveCover > 60
                        ? '✓ Robust coastal barrier: protects coastal villages from devastating cyclone inundation.'
                        : '✗ Severe vulnerability: wave energy penetrates inland, destroying settlements.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── LAB 5: INDIA'S 4 BIODIVERSITY HOTSPOTS ─── */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
                <div className="space-y-2" role="group" aria-label="Select Indian Biodiversity Hotspot">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Select Hotspot</span>
                  {[
                    { id: 'western_ghats' as const, name: '1. Western Ghats', states: 'Gujarat, Maharashtra, Goa, Karnataka, Kerala, TN' },
                    { id: 'himalayas' as const, name: '2. Himalayas', states: 'Ladakh to Arunachal Pradesh' },
                    { id: 'indo_burma' as const, name: '3. Indo-Burma', states: 'Northeast India (Loktak, Assam, etc.)' },
                    { id: 'sundaland' as const, name: '4. Sundaland', states: 'Nicobar Islands Group' },
                  ].map((h) => (
                    <motion.button
                      key={h.id}
                      aria-label={`Select ${h.name} Hotspot`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedHotspot(h.id);
                        audioManager.play('tap');
                      }}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                        selectedHotspot === h.id
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <p className="font-bold text-sm text-white">{h.name}</p>
                      <p className="text-slate-400 mt-0.5">{h.states}</p>
                    </motion.button>
                  ))}
                </div>

                <div className="md:col-span-2 bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h4 className="text-base font-bold text-emerald-300">
                      {selectedHotspot === 'western_ghats' && 'Western Ghats (UNESCO World Heritage)'}
                      {selectedHotspot === 'himalayas' && 'Himalayas Hotspot (Montane to Cold Desert)'}
                      {selectedHotspot === 'indo_burma' && 'Indo-Burma Hotspot (Northeast India)'}
                      {selectedHotspot === 'sundaland' && 'Sundaland Hotspot (Nicobar Archipelago)'}
                    </h4>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                      Myers Criteria: ≥1,500 Endemic Plants & ≥70% Habitat Loss
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="font-bold text-amber-400 block">Flagship Endemic Species:</span>
                      <p className="text-slate-200">
                        {selectedHotspot === 'western_ghats' && '🐒 Lion-tailed Macaque (Macaca silenus) & Nilgiri Tahr (Nilgiritragus hylocrius)'}
                        {selectedHotspot === 'himalayas' && '🐆 Snow Leopard (Panthera uncia) & Red Panda (Ailurus fulgens)'}
                        {selectedHotspot === 'indo_burma' && '🦌 Brow-antlered Deer (Sangai of Loktak phumdis) & Hoolock Gibbon'}
                        {selectedHotspot === 'sundaland' && '🐦 Nicobar Megapode & Nicobar Pigeon (Caloenas nicobarica)'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                      <span className="font-bold text-rose-400 block">Acute Anthropogenic Threats:</span>
                      <p className="text-slate-200">
                        {selectedHotspot === 'western_ghats' && 'Plantation expansion (tea/rubber), iron ore mining, dam reservoirs, and linear road fragmentation.'}
                        {selectedHotspot === 'himalayas' && 'Glacial retreat, unchecked tourism, hydroelectric tunnels, and climate-induced permafrost thaw.'}
                        {selectedHotspot === 'indo_burma' && 'Jhum (slash-and-burn) shortening, barrage hydrology disruption at Loktak, and illegal wildlife trade.'}
                        {selectedHotspot === 'sundaland' && 'Tsunami vulnerability, port development projects, and introduction of invasive species.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── BRILLIANT OBSERVATION SECTION (What do you notice? pattern) ─── */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-teal-500/40 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase font-bold tracking-wider text-teal-400">
                    🔬 Brilliant.org Pattern · What Do You Notice?
                  </span>
                  <h3 className="text-lg font-bold text-white mt-0.5">Observational Verification Check</h3>
                </div>
                <div className="flex gap-2">
                  {OBSERVATION_QUESTIONS.map((_, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => setActiveObserveTab(oIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        activeObserveTab === oIdx
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Observation #{oIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const oQ = OBSERVATION_QUESTIONS[activeObserveTab];
                const hasAnswered = observationAnswers[activeObserveTab] !== undefined;
                const chosen = observationAnswers[activeObserveTab];
                return (
                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-slate-200">{oQ.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {oQ.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationAnswer(activeObserveTab, oIdx)}
                          className={`p-3 rounded-xl text-xs text-left transition-all ${
                            hasAnswered
                              ? oIdx === oQ.correctIndex
                                ? 'bg-emerald-950 border border-emerald-500 text-emerald-200 font-bold'
                                : chosen === oIdx
                                ? 'bg-rose-950 border border-rose-500 text-rose-300'
                                : 'bg-slate-900 text-slate-500 opacity-50'
                              : 'bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300'
                          }`}
                        >
                          <span className="font-mono mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                    {hasAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-teal-950/60 rounded-xl border border-teal-700/60 text-xs text-teal-200 space-y-1"
                      >
                        <p><span className="font-bold text-teal-300">Observation Note:</span> {oQ.explanation}</p>
                        <p className="text-slate-300"><span className="font-semibold text-emerald-300">Key Observation:</span> {oQ.observableOptions[0]}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FREE SANDBOX / FREE PLAY MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">🧪 Ecosystem Sandbox (Free Experimentation)</h3>
                <p className="text-xs text-slate-400">Manipulate primary productivity budgets and carrying capacity without penalty.</p>
              </div>
              <motion.button
                aria-label="Proceed to graded challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <span>Ready for Graded Challenges</span>
                <span>→</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Primary Productivity Calculator */}
              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                  <span>⚡ Primary Production & Energy Budget</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Gross Primary Productivity (GPP)</span>
                      <span className="font-mono font-bold text-emerald-400">{gppValue} kJ/m²/yr</span>
                    </div>
                    <input
                      type="range"
                      min={5000}
                      max={40000}
                      step={500}
                      value={gppValue}
                      aria-label="Gross Primary Productivity in kJ per square meter per year"
                      onChange={(e) => setGppValue(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Plant Respiration Fraction (R)</span>
                      <span className="font-mono font-bold text-rose-400">{respirationFraction}%</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={85}
                      value={respirationFraction}
                      aria-label="Plant autotrophic respiration fraction percentage"
                      onChange={(e) => setRespirationFraction(Number(e.target.value))}
                      className="w-full accent-rose-500 bg-slate-800"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Gross Energy Fixed (GPP):</span>
                      <span className="text-white">{gppValue} kJ/m²/yr</span>
                    </div>
                    <div className="flex justify-between text-rose-400">
                      <span>Autotrophic Respiration (R):</span>
                      <span>-{Math.round((gppValue * respirationFraction) / 100)} kJ/m²/yr</span>
                    </div>
                    <div className="border-t border-slate-800 pt-1 flex justify-between text-emerald-300 font-bold text-sm">
                      <span>Net Primary Productivity (NPP):</span>
                      <span>{calculatedNPP} kJ/m²/yr</span>
                    </div>
                    <p className="font-sans text-slate-500 text-xs pt-1">
                      Only this NPP value (available biomass) sustains herbivores, predators, and decomposers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 2: Carrying Capacity & Overshoot Simulator */}
              <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <span>📈 Carrying Capacity (K) & Regime Shifts</span>
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Herbivore Herd Size</span>
                      <span className="font-mono font-bold text-amber-400">{grazingPressure} cattle</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      value={grazingPressure}
                      aria-label="Herbivore herd size"
                      onChange={(e) => setGrazingPressure(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Pasture Carrying Capacity (K)</span>
                      <span className="font-mono font-bold text-emerald-400">{carryingCapacityK} cattle</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={90}
                      value={carryingCapacityK}
                      aria-label="Pasture carrying capacity in cattle"
                      onChange={(e) => setCarryingCapacityK(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800"
                    />
                  </div>

                  <div className={`p-4 rounded-xl border ${rangelandStatus.bg} transition-all space-y-1`}>
                    <span className="text-xs font-bold uppercase tracking-wider block text-slate-300">Rangeland Status:</span>
                    <p className={`text-sm font-bold ${rangelandStatus.color}`}>{rangelandStatus.status}</p>
                    <p className="text-xs text-slate-300">
                      {grazingPressure > carryingCapacityK
                        ? '✗ Grass cropped faster than basal meristems can recover -> topsoil exposed to wind erosion.'
                        : '✓ Biomass regeneration balances herd intake -> soil structure and biodiversity preserved.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── GRADED COMPETENCY CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Top Canvas Animation & Status Bar */}
            <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <canvas ref={canvasRef} width={180} height={35} className="rounded-lg shadow" aria-label="Animated ecosystem particles" />
                <div>
                  <span className="text-xs text-slate-400 block">Progress</span>
                  <span className="text-sm font-black text-white">
                    Challenge {currentChallenge + 1} of {filteredChallenges.length}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">NEP 2020 Competency</span>
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    {challenge.competencyLevel}
                  </span>
                </div>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-300 border border-rose-500'
                      : 'bg-indigo-950 text-indigo-300 border border-indigo-500'
                  }`}
                >
                  {difficulty}
                </motion.span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            <div className="text-xs text-indigo-300 mt-1">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* Question Card */}
            <div
              className={`p-6 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/60 border-2 border-rose-500 shadow-xl shadow-rose-900/40'
                  : 'bg-slate-900/90 border-slate-800 shadow-xl'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
                {challenge.question}
              </h3>

              {/* ─── TYPE 1: MCQ (Classify / Distinguish / Match) ─── */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3" role="radiogroup" aria-label="Multiple choice options">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation}
                      className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60 hover:border-emerald-500/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>
                          {showExplanation && i === challenge.correctIndex && '✓ '}
                          {opt}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* ─── TYPE 2: DRAG-LABEL CHALLENGE ─── */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  {/* Label Palette */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800" role="group" aria-label="Draggable labels">
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        role="button"
                        aria-label={`Draggable label: ${item.label}`}
                        tabIndex={0}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                      <div
                        key={targetKey}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetKey)}
                        aria-label={`Drop target for ${targetKey}`}
                        className={`p-4 rounded-xl border-2 border-dashed flex items-center justify-between text-sm ${
                          droppedLabels[targetKey]
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950/80 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="font-mono text-xs uppercase font-bold text-slate-500">
                          Target: {targetKey.replace('_', ' ')}
                        </span>
                        <span className="font-bold text-emerald-300">
                          {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : '📥 Drag label here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check label assignments"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < Object.keys(challenge.correctMapping || {}).length}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                  >
                    Check Label Assignments
                  </motion.button>
                </div>
              )}

              {/* ─── TYPE 3: DRAG-SORT CHALLENGE ─── */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag items to rearrange in chronological sequence:</p>
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      role="button"
                      aria-label={`Order ${dIdx + 1}: ${item}`}
                      tabIndex={0}
                      onDragStart={() => handleDragStart(String(dIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0', 10);
                        handleSortMove(from, dIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                        {dIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}

                  <motion.button
                    aria-label="Verify step sequence"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 mt-2"
                  >
                    Verify Step Sequence
                  </motion.button>
                </div>
              )}

              {/* ─── TYPE 4: NUMERIC CHALLENGE ─── */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      aria-label={`Enter computed numerical value in ${challenge.unit || 'units'}`}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter computed value"
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 outline-none w-64"
                    />
                    <span className="text-slate-400 font-mono text-sm">{challenge.unit}</span>
                    <motion.button
                      aria-label="Submit calculated numeric value"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                    >
                      Submit Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ─── TYPE 5: CONSTRUCT CHALLENGE ─── */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  
                  {/* Palette */}
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Available components">
                    {challenge.availableParts.map((part, pIdx) => (
                      <motion.button
                        key={pIdx}
                        aria-label={`Add component ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (!constructParts.includes(part)) {
                            setConstructParts(prev => [...prev, part]);
                            audioManager.play('tap');
                          }
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-medium text-slate-200"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  {/* Assembled Stage */}
                  <div className="min-h-[70px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                    {constructParts.map((cPart, cIdx) => (
                      <motion.span
                        key={cIdx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-3 py-1 bg-emerald-950 border border-emerald-500 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2"
                      >
                        <span>✓ {cPart}</span>
                        <button
                          aria-label={`Remove component ${cPart}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                          className="text-rose-400 hover:text-rose-300 ml-1"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click components above to build the system...</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Validate constructed system"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
                  >
                    Validate Constructed System
                  </motion.button>
                </div>
              )}

              {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Step-by-Step Ecological Explanation
                    </span>
                    <span className="text-xs text-slate-400">
                      Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter(s => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, sIdx) => (
                        <motion.p
                          key={sIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-sm text-emerald-200 leading-relaxed"
                        >
                          <span className="font-bold text-emerald-400">{sIdx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step in explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Concept Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment' : 'Proceed to Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FINAL COMPLETION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-3xl border border-emerald-600/40 text-center space-y-4 shadow-2xl">
              <span className="text-4xl" role="img" aria-label="Trophy">🏆</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Ecosystem Master Certification</h2>
              <p className="text-slate-300 text-sm max-w-xl mx-auto">
                You have demonstrated mastery over global biomes, primary productivity thermodynamics, threshold tipping points, and biodiversity stewardship.
              </p>

              <div className="flex flex-wrap justify-center gap-6 py-4">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                  <span className="text-xs text-slate-400 block mb-1">Final Score</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {Math.max(0, 100 - errors * 5)}%
                  </span>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                  <span className="text-xs text-slate-400 block mb-1">BKT Mastery Level</span>
                  <span className="text-2xl font-black text-cyan-400 font-mono capitalize">
                    {masteryLevel}
                  </span>
                </div>
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[140px]">
                  <span className="text-xs text-slate-400 block mb-1">Review Interval</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">
                    {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                  </span>
                </div>
              </div>

              {/* Personalised Motivational Feedback */}
              <div className="p-4 bg-emerald-950/50 rounded-2xl border border-emerald-700/60 text-left max-w-2xl mx-auto">
                <p className="text-emerald-300 text-sm font-bold">
                  {errors === 0
                    ? '🌟 PERFECT SCORE! You possess an impeccable grasp of terrestrial ecosystems and biodiversity conservation.'
                    : errors <= 3
                    ? '👏 Excellent performance! You are well-prepared for CISCE Class 9 EVS examinations.'
                    : errors <= 7
                    ? '📈 Good effort! Review the misconception profile below to reinforce your understanding.'
                    : '🌱 Keep building your knowledge! Re-run the guided labs and review the core definitions.'}
                </p>
              </div>
            </div>

            {/* Misconception Gaps Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️ Diagnostic Misconception Profile</span>
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((mIdx) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <div key={mIdx} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-xs font-bold text-rose-300">✗ {m.misconception}</p>
                        <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Spaced Repetition SRS Notice */}
            <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                  SM-2 Spaced Repetition Schedule (Visible SRS Plan)
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Based on your performance ({errors} error{errors !== 1 ? 's' : ''}), review this topic in{' '}
                  <span className="font-bold text-amber-400">
                    {errors === 0 ? '7 days (Mastered)' : errors <= 3 ? '3 days (Consolidating)' : '1 day (Needs Focus)'}
                  </span>{' '}
                  to lock concepts into permanent long-term memory.
                </p>
              </div>
              <motion.button
                aria-label="Restart Simulation from Beginning"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('discovery');
                  setCurrentChallenge(0);
                  setErrors(0);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg"
              >
                Restart Simulation
              </motion.button>
            </div>

            {/* Capstone Real-World Charter */}
            <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-3">
              <h3 className="text-base font-bold text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold font-mono">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CONDITIONAL SIM ENGINE POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Ecological Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_EVSForestEcosystemsTropicalSim;