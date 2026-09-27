'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (ALL 10 ICSE EVS NODES) ───
const NODE_C9_EVS_021 = 'c9_evs_021'; // Domesticated biodiversity - native crops, livestock
const NODE_C9_EVS_022 = 'c9_evs_022'; // Traditional agricultural practices in India
const NODE_C9_EVS_023 = 'c9_evs_023'; // Ayurveda, yoga, medicinal plants, traditional crops
const NODE_C9_EVS_024 = 'c9_evs_024'; // Industrial revolution and consumerist lifestyles
const NODE_C9_EVS_025 = 'c9_evs_025'; // Urbanisation - causes, challenges, land use change
const NODE_C9_EVS_026 = 'c9_evs_026'; // Intensive agriculture - pesticides, chemical fertilisers
const NODE_C9_EVS_027 = 'c9_evs_027'; // Disappearance of traditional crop varieties and practices
const NODE_C9_EVS_028 = 'c9_evs_028'; // Consequences on ecosystem - deforestation, habitat loss
const NODE_C9_EVS_029 = 'c9_evs_029'; // Consequences on natural resources - pollution, depletion
const NODE_C9_EVS_030 = 'c9_evs_030'; // Social consequences - inequality, displacement, health hazards

const ALL_NODE_IDS = [
  NODE_C9_EVS_021,
  NODE_C9_EVS_022,
  NODE_C9_EVS_023,
  NODE_C9_EVS_024,
  NODE_C9_EVS_025,
  NODE_C9_EVS_026,
  NODE_C9_EVS_027,
  NODE_C9_EVS_028,
  NODE_C9_EVS_029,
  NODE_C9_EVS_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Indian Agrarian Crossroads',
  intro: 'You are the Chief Agro-Ecological Officer of Bharat Environmental Trust. A major agrarian district in northern India has shifted from resilient native polyculture to high-input chemical monoculture over 40 years. Soil microbial health is down 70%, groundwater is plunging by 0.9m/year, cancer incidents have surged along the railway route, and ancient landraces like Navara and Tharparkar cattle are vanishing.',
  context: 'Your mission is to explore the causes, analyse the ecological and social fallout, restore indigenous biodiversity, and guide the farming community back toward sustainable agro-ecological harmony.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When an intensive farming system replaces traditional ragi and native cattle with high-yielding hybrid rice, synthetic NPK fertilisers, and chemical insecticides, what is the FIRST hidden ecological breakdown that triggers long-term soil bankruptcy?',
  options: [
    'Immediate drop in market grain tonnage in the first season',
    'Destruction of soil micro-organisms and beneficial earthworms due to lack of organic carbon',
    'Instant cooling of the local atmospheric temperature',
    'Immediate extinction of all wild herbivores in the adjoining forest',
  ],
  correctIndex: 1,
  hintAfter: 'Chemical fertilisers feed the plant directly with NPK salts, but starve and kill the living soil ecosystem of bacteria, fungi, and earthworms!',
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

// ─── 22 CHALLENGES (PROGRESSIVE TIERS & NEP 2020 COMPETENCIES) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (1-7) ──
  {
    id: 'ch_001_f',
    nodeId: NODE_C9_EVS_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which indigenous Indian cattle breed originates in Gujarat and is internationally acclaimed for heat tolerance, tick resistance, and A2 milk production?',
    options: ['Holstein Friesian', 'Gir', 'Jersey', 'Murrah'],
    correctIndex: 1,
    explanation: 'Gir cattle from Gujarat are indigenous zebu cattle renowned for disease resistance, heat tolerance, and A2 beta-casein milk, unlike exotic European breeds like Holstein Friesian.',
    hints: [
      'Look for the native breed named after a famous forest in Gujarat.',
      'Holstein and Jersey are exotic breeds imported from temperate Europe.',
      'The breed is Gir, originating in the Kathiawar peninsula of Gujarat.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_f',
    nodeId: NODE_C9_EVS_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each traditional Indian sustainable practice to its primary ecological or soil mechanism.',
    dragItems: [
      { label: 'Bijamrita', targetId: 'mech_seed' },
      { label: 'Crop Rotation with Pulses', targetId: 'mech_nitrogen' },
      { label: 'Johad / Khadin', targetId: 'mech_water' },
      { label: 'Panchagavya', targetId: 'mech_foliar' },
    ],
    correctMapping: {
      mech_seed: 'Bijamrita',
      mech_nitrogen: 'Crop Rotation with Pulses',
      mech_water: 'Johad / Khadin',
      mech_foliar: 'Panchagavya',
    },
    explanation: 'Bijamrita is a traditional seed coating containing cow dung, urine, and lime to protect seedlings. Pulses host Rhizobium bacteria for biological nitrogen fixation. Johads and Khadins harvest rainwater locally. Panchagavya acts as an organic liquid biofertiliser spray.',
    hints: [
      'Think about which formulation is used to coat seeds before sowing.',
      'Remember what legumes do with atmospheric nitrogen in their root nodules.',
      'Khadins and Johads are traditional water harvesting structures of Rajasthan.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_f',
    nodeId: NODE_C9_EVS_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is Ragi (Finger Millet) considered a nutritionally superior cereal compared to polished hybrid wheat in Indian diets?',
    options: [
      'It contains ~344 mg of Calcium per 100g (~8 times more than wheat) and high dietary fibre',
      'It requires 5 times more chemical fertiliser to produce grain',
      'It has a very high glycemic index suitable for rapid fat accumulation',
      'It contains synthetic vitamin C injected into its outer husk',
    ],
    correctIndex: 0,
    explanation: 'Ragi (Eleusine coracana) contains approximately 344 mg calcium per 100 g compared to only ~41 mg in wheat, alongside rich dietary fibre and iron, making it a critical climate-resilient nutri-cereal (Shri Anna).',
    hints: [
      'Focus on mineral density, particularly calcium and dietary fibre.',
      'Wheat contains only ~41 mg of calcium per 100g.',
      'Ragi provides over 300 mg of calcium per 100g, supporting skeletal health.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_f',
    nodeId: NODE_C9_EVS_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which industrial strategy deliberately designs consumer products to fail or become obsolete quickly to drive repeated purchases?',
    options: ['Agroforestry', 'Planned Obsolescence', 'Biological Magnification', 'In-situ Conservation'],
    correctIndex: 1,
    explanation: 'Planned obsolescence is the deliberate manufacturing of goods with limited lifespans or restricted software updates, forcing continuous consumer disposal and fuelling global e-waste (~50 million tonnes annually).',
    hints: [
      'Think of how smartphones lose software support after just 2-3 years.',
      'The word involves planning for something to become obsolete.',
      'The term is Planned Obsolescence.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_f',
    nodeId: NODE_C9_EVS_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the phenomenon where urban concrete, asphalt, and reduced evapotranspiration raise city temperatures 2°C to 5°C above surrounding rural landscapes?',
    options: ['Eutrophication Effect', 'Urban Heat Island (UHI) Effect', 'Biomagnification Zone', 'Kuttanad Depression'],
    correctIndex: 1,
    explanation: 'The Urban Heat Island (UHI) effect occurs when dense concrete, tar roads, and high energy dissipation trap sensible heat, while green canopy loss curtails evaporative cooling.',
    hints: [
      'Look for the term describing cities acting as elevated thermal islands.',
      'It relates to urban infrastructure trapping radiant solar heat.',
      'It is called the Urban Heat Island (UHI) effect.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_006_f',
    nodeId: NODE_C9_EVS_026,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A farmer applies synthetic Urea to their field. By chemical composition, what is the exact percentage of elemental Nitrogen (N) supplied by commercial Urea fertiliser?',
    correctAnswer: 46,
    tolerance: 1,
    unit: '%',
    explanation: 'Commercial Urea [CO(NH2)2] contains exactly 46% elemental Nitrogen (N), representing the most concentrated conventional solid nitrogenous chemical fertiliser.',
    hints: [
      'Recall the standard N-content printed on every standard Indian urea sack.',
      'It is in the mid-40s range.',
      'The exact standard chemical percentage is 46%.',
    ],
  },
  {
    id: 'ch_007_f',
    nodeId: NODE_C9_EVS_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which indigenous Kerala rice landrace is renowned for its medicinal red grain used in Ayurvedic Navarakizhi rejuvenation therapy?',
    options: ['IR8', 'Navara', 'Sonalika', 'Sonora 64'],
    correctIndex: 1,
    explanation: 'Navara is an ancient medicinal red rice indigenous to Kerala, prized in Ayurveda for neuromuscular therapies and strengthening treatments.',
    hints: [
      'It is a traditional non-hybrid Kerala red rice.',
      'IR8 and Sonora 64 are Green Revolution HYV dwarf strains.',
      'The medicinal rice variety is Navara.',
    ],
  },

  // ── STANDARD TIER (8-15) ──
  {
    id: 'ch_008_s',
    nodeId: NODE_C9_EVS_026,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of steps that trigger aquatic Eutrophication following agricultural fertiliser runoff into a freshwater lake.',
    sortItems: [
      'Excess N and P fertiliser washes into the water body via runoff',
      'Dense algal bloom develops rapidly on the surface, blocking sunlight',
      'Submerged aquatic plants die due to lack of photosynthetically active radiation',
      'Decomposer bacteria proliferate and exhaust Dissolved Oxygen (hypoxia < 4 ppm)',
      'Mass suffocation and mortality of fish and aerobic aquatic life',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Eutrophication begins with nutrient loading (N & P), stimulating algal blooms. Surface shading kills benthic plants; microbial decomposition of dead biomass consumes dissolved oxygen, resulting in lethal hypoxia for fish.',
    hints: [
      'Start with the agricultural runoff washing nitrogen and phosphorus into the lake.',
      'Algal blooms form immediately after nutrient enrichment, blocking sunlight.',
      'Decomposition by aerobic bacteria consumes the oxygen, leading to fish death.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_009_s',
    nodeId: NODE_C9_EVS_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the precise ecological distinction between Deforestation and Forest Degradation?',
    options: [
      'Deforestation is permanent land-use conversion to non-forest; Degradation is quality and biomass loss while land classification remains forest',
      'Deforestation only occurs in cold temperate zones, whereas Degradation is strictly tropical',
      'Deforestation is always caused by insects, while Degradation is caused by solar radiation',
      'There is no ecological difference; both terms are legally identical in ICSE definitions',
    ],
    correctIndex: 0,
    explanation: 'Deforestation represents total and permanent conversion of forested canopy into agriculture, settlements, or mining pits. Forest degradation involves canopy thinning, biodiversity decline, and biomass depletion while the land legally remains forested.',
    hints: [
      'Think about whether the land classification itself changes to agriculture or urban use.',
      'Degradation thins out species and biomass while trees may still stand.',
      'Deforestation is complete land-use change; degradation is loss of ecological quality.',
    ],
  },
  {
    id: 'ch_010_s',
    nodeId: NODE_C9_EVS_026,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If lake water contains DDT at 0.00005 ppm and the concentration biomagnifies by a factor of 500,000 in apex fish-eating raptors (eagles), what is the final DDT concentration in the eagle in parts per million (ppm)?',
    correctAnswer: 25,
    tolerance: 0.5,
    unit: 'ppm',
    explanation: '0.00005 ppm × 500,000 = 25.0 ppm. At this concentration in body lipids, DDT disrupts calcium metabolism, causing severe eggshell thinning and reproductive collapse in predatory birds.',
    hints: [
      'Multiply the water concentration (0.00005) by the magnification factor (500,000).',
      '0.00005 × 500,000 = 5 × 5 = 25.',
      'The calculated concentration is 25 ppm.',
    ],
  },
  {
    id: 'ch_011_s',
    nodeId: NODE_C9_EVS_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is particulate matter of aerodynamic diameter less than 2.5 micrometres (PM2.5) far more hazardous to human physiology than PM10?',
    options: [
      'PM10 directly enters the brain, whereas PM2.5 is blocked by nasal cilia',
      'PM2.5 bypasses upper respiratory cilia and penetrates deep into pulmonary alveoli and systemic bloodstream',
      'PM2.5 consists solely of non-toxic pure water droplets',
      'PM10 is radioactive while PM2.5 is completely inert',
    ],
    correctIndex: 1,
    explanation: 'While PM10 is predominantly trapped in the nasal cavity and upper bronchi, PM2.5 particles are small enough to penetrate into the alveolar gas-exchange sacs, entering the bloodstream and provoking systemic cardiovascular and pulmonary damage.',
    hints: [
      'Consider how particle size determines penetration depth in human lung airways.',
      'Smaller particles (< 2.5 μm) can cross into alveolar capillaries and the bloodstream.',
      'Option 2 correctly describes alveolar and systemic blood penetration.',
    ],
  },
  {
    id: 'ch_012_s',
    nodeId: NODE_C9_EVS_025,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which Indian city is correctly paired with the specific wetland crisis caused by rapid urban encroachment and industrial effluent discharge?',
    options: [
      'Bengaluru — Bellandur Lake frothing with toxic chemical foam and acute groundwater table collapse',
      'Mumbai — Complete freezing of Dal Lake due to winter snowfall',
      'Delhi — Encroachment of coral reefs in the Yamuna floodplains',
      'Kolkata — Loss of alpine permafrost due to high-rise building construction',
    ],
    correctIndex: 0,
    explanation: 'Bengaluru’s rapid unplanned expansion destroyed interconnecting wetland channels, causing Bellandur and Varthur lakes to foam with toxic surfactant-heavy sewage, severely impairing urban groundwater recharge.',
    hints: [
      'Focus on the southern IT hub famous for its interconnected lake system.',
      'Bellandur lake is located in Karnataka’s capital.',
      'The correct match is Bengaluru and Bellandur Lake.',
    ],
  },
  {
    id: 'ch_013_s',
    nodeId: NODE_C9_EVS_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Stone quarry and crushing workers in Rajasthan and Jharkhand who continuously inhale fine crystalline silica dust without protective respirators suffer from which incurable occupational lung disease?',
    options: ['Eutrophication', 'Silicosis', 'Navarakizhi', 'Biomagnification'],
    correctIndex: 1,
    explanation: 'Silicosis is a fatal, irreversible fibrotic pulmonary disease caused by inhaling microscopic silica dust generated in unventilated mines and stone-crushing quarries, exemplifying severe environmental occupational injustice.',
    hints: [
      'The disease name derives directly from the mineral Silica (SiO2).',
      'It causes progressive scarring and fibrosis of lung tissues.',
      'The condition is Silicosis.',
    ],
  },
  {
    id: 'ch_014_s',
    nodeId: NODE_C9_EVS_022,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Assemble the 5 core indigenous ingredients required to prepare authentic Ayurvedic "Panchagavya" bio-enhancer.',
    availableParts: ['Cow Dung', 'Cow Urine', 'Milk', 'Curd', 'Ghee', 'Synthetic Urea', 'DDT Powder', 'Endosulfan'],
    targetState: 'Cow Dung Cow Urine Milk Curd Ghee',
    validationHint: 'Select all 5 pure bovine derivatives and avoid all synthetic agrochemicals.',
    explanation: 'Panchagavya is formulated from five cow products (Gomutra, Gomaya, Ksheera, Dadhi, Ghrita) combined with organic catalysts like jaggery and tender coconut to stimulate plant immunity and beneficial microflora.',
    hints: [
      '"Panch" means five; all ingredients come from the indigenous cow.',
      'Exclude synthetic chemicals like Urea, DDT, or Endosulfan.',
      'Combine Dung, Urine, Milk, Curd, and Ghee.',
    ],
  },
  {
    id: 'ch_015_s',
    nodeId: NODE_C9_EVS_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do wildlife corridors between fragmented protected areas (e.g., Kanha-Pench or Rajaji-Corbett) preserve species genetic vitality?',
    options: [
      'They prevent animals from moving so that they remain confined to one spot',
      'They facilitate inter-population migration and gene flow, preventing deleterious inbreeding depression',
      'They increase roadkill rates by concentrating animals near railway tracks',
      'They replace indigenous flora with foreign monoculture timber species',
    ],
    correctIndex: 1,
    explanation: 'Wildlife corridors provide contiguous canopy/cover enabling genetic exchange between isolated sub-populations, thereby averting inbreeding depression and local genetic bottlenecks.',
    hints: [
      'Consider why gene flow between separate animal groups is vital for health.',
      'Corridors allow tigers and elephants to safely cross infrastructure.',
      'They maintain gene flow and prevent inbreeding.',
    ],
  },

  // ── ADVANCED TIER (16-22) ──
  {
    id: 'ch_016_a',
    nodeId: NODE_C9_EVS_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does cash compensation alone fail to provide genuine rehabilitation for indigenous Adivasi communities displaced by large dam projects like Sardar Sarovar on the Narmada river?',
    options: [
      'Cash compensation exceeds the economic value of forests by a factor of 100',
      'Money cannot replace ancestral land-based livelihoods, non-timber forest produce, sacred cultural sites, and intact community support networks',
      'Adivasi families are legally prohibited from holding bank accounts in India',
      'Dam projects automatically relocate the entire surrounding forest biome intact',
    ],
    correctIndex: 1,
    explanation: 'Displacement shatters non-monetised livelihoods (tendu leaf, mahua, medicinal foraging), communal social capital, and ancestral heritage. Cash is quickly dissipated without land-for-land restoration and community resettlement.',
    hints: [
      'Consider the cultural, ecological, and communal dimensions beyond liquid money.',
      'Livelihoods depend on forest access, grazing commons, and shared identity.',
      'Rehabilitation must be comprehensive: land-for-land, cultural protection, and communal integrity.',
    ],
  },
  {
    id: 'ch_017_a',
    nodeId: NODE_C9_EVS_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the Green Revolution belt of southwestern Punjab (Bathinda-Muktsar), what compound factors caused the emergence of the infamous "Cancer Train" to Bikaner?',
    options: [
      'High consumption of raw ragi and natural Ayurvedic herbal decoctions',
      'Excessive organophosphate/organochlorine pesticide spraying, chemical leaching into drinking aquifers, and bioaccumulation in human blood',
      'Exposure to cosmic radiation in high-altitude Himalayan tea estates',
      'Complete absence of agricultural machinery and tube wells in the state',
    ],
    correctIndex: 1,
    explanation: 'Intense chemical spraying (cotton and paddy), unregulated water table pumping, and groundwater contamination caused heavy pesticide residues in blood and breast milk, overwhelming local oncology facilities and leading to the daily medical train to Bikaner.',
    hints: [
      'Look at agrochemical overload in the cotton/paddy farming belt.',
      'Pesticides leached into shallow tube-well drinking supplies.',
      'Option 2 highlights excessive pesticide spraying and aquifer contamination.',
    ],
  },
  {
    id: 'ch_018_a',
    nodeId: NODE_C9_EVS_029,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In an over-exploited agrarian block in Punjab, the groundwater table is receding at 0.85 metres per year due to unmetered tube-well pumping for paddy monoculture. How many total metres will the water table plunge over a 12-year period if recharge remains constant?',
    correctAnswer: 10.2,
    tolerance: 0.1,
    unit: 'metres',
    explanation: '0.85 m/year × 12 years = 10.2 metres drop. This precipitous drawdown forces farmers to install expensive submersible pumps, driving smallholders into debt cycles.',
    hints: [
      'Multiply the annual drawdown rate (0.85) by the time span (12).',
      '0.85 × 12 = 10.2 metres.',
      'The total drop is 10.2 metres.',
    ],
  },
  {
    id: 'ch_019_a',
    nodeId: NODE_C9_EVS_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What constitutes the most dangerous long-term ecological hazard of replacing over 100,000 diverse Indian rice landraces with 3 or 4 uniform HYV dwarf hybrid strains?',
    options: [
      'Hybrid crops produce too much soil organic matter, suffocating root systems',
      'Extreme genetic uniformity creates systemic vulnerability where a single novel virulent pathogen can wipe out the entire national harvest',
      'Traditional landraces are toxic to wild pollinating bumblebees and honeybees',
      'Hybrid crops naturally convert all atmospheric carbon dioxide into elemental sulphur',
    ],
    correctIndex: 1,
    explanation: 'Monoculture erodes genetic diversity. When millions of contiguous hectares share identical genetic susceptibility, an adapted virulent fungus or pest can trigger catastrophic famine (analogous to the Irish Potato Famine or 1970 US Corn Blight).',
    hints: [
      'Think of what happens when all plants in a nation share the exact same immune system.',
      'Genetic uniformity leaves no resistant strains when a new disease arrives.',
      'Option 2 correctly highlights vulnerability to widespread crop failure.',
    ],
  },
  {
    id: 'ch_020_a',
    nodeId: NODE_C9_EVS_023,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Label the primary therapeutic active property to each ancient Indian medicinal botanical.',
    dragItems: [
      { label: 'Tulsi (Ocimum sanctum)', targetId: 'bot_resp' },
      { label: 'Amla (Emblica officinalis)', targetId: 'bot_vitc' },
      { label: 'Neem (Azadirachta indica)', targetId: 'bot_antiseptic' },
      { label: 'Turmeric (Curcuma longa)', targetId: 'bot_curcumin' },
    ],
    correctMapping: {
      bot_resp: 'Tulsi (Ocimum sanctum)',
      bot_vitc: 'Amla (Emblica officinalis)',
      bot_antiseptic: 'Neem (Azadirachta indica)',
      bot_curcumin: 'Turmeric (Curcuma longa)',
    },
    explanation: 'Tulsi provides adaptogenic and respiratory relief; Amla is nature’s richest source of Vitamin C (ascorbic acid); Neem exerts powerful antifungal and biopesticidal action (azadirachtin); Turmeric delivers anti-inflammatory curcumin.',
    hints: [
      'Amla is renowned as the richest natural Vitamin C source in Chyawanprash.',
      'Turmeric contains the famous golden anti-inflammatory compound Curcumin.',
      'Tulsi is sacred for respiratory wellness; Neem is the bitter antiseptic champion.',
    ],
  },
  {
    id: 'ch_021_a',
    nodeId: NODE_C9_EVS_028,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the cascading ecosystem breakdown that follows clear-felling of virgin rainforest in the Western Ghats for monoculture commercial plantations.',
    sortItems: [
      'Deep tree root systems are mechanically uprooted, destroying soil aggregate binding',
      'Heavy monsoon rains unleash severe topsoil erosion and slope-failure landslides',
      'Local evapotranspiration plummets, destabilising microclimatic precipitation cycles',
      'Benthic river siltation suffocates downstream freshwater fisheries and estuarine beds',
      'Irreversible loss of endemic amphibian and plant biodiversity in Western Ghats hotspot',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Canopy removal and root destruction trigger catastrophic slope landslides during monsoons, alter local hydrological cycles, choke downstream aquatic habitats with silt, and permanently eliminate endemic biodiversity.',
    hints: [
      'Start with the immediate physical loss of tree roots holding the steep slope soil.',
      'Monsoon rains instantly wash away unanchored soil, causing landslides.',
      'Follow the water and silt downstream to fisheries and biodiversity extinction.',
    ],
  },
  {
    id: 'ch_022_a',
    nodeId: NODE_C9_EVS_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Why was Kerala’s Kuttanad below-sea-level farming system designated by the FAO as a Globally Important Agricultural Heritage System (GIAHS)?',
    options: [
      'It uses heavy industrial nuclear desalination plants to flood coastal deserts',
      'It ingeniously combines rice cultivation 1 to 2 metres below sea level with saline-exclusion dykes, alluvial bio-manuring, and integrated rice-fish harvesting',
      'It completely cleared all backwater mangroves to construct coal-fired thermal power stations',
      'It relies solely on synthetic chemical aeroplanes spraying pesticides over the sea',
    ],
    correctIndex: 1,
    explanation: 'Kuttanad is an extraordinary 150-year-old traditional agro-ecosystem where farmers cultivate paddy 1-2m below sea level using bio-dykes, monsoon flushing, and alternating rice-shrimp cycles, exemplifying human-nature harmony.',
    hints: [
      'Look for the ancient ecological mechanism of farming below sea level without heavy chemicals.',
      'It incorporates bio-dykes, alluvial delta fertility, and rice-fish symbiosis.',
      'Option 2 accurately describes the Kuttanad GIAHS heritage model.',
    ],
  },
  // ─── Class 10 board-depth additions: agriculture-and-food-security diagnostics ───
  {
    id: 'ch_depth_bio_cropping_systems',
    nodeId: 'c10_geo_cbse_04_003',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design (i) a three-crop cropping calendar for a Krishna-Godavari delta farm, (ii) a soyabean-mustard rotation for 90 cm-rainfall Madhya Pradesh, and (iii) a cropping pattern for 5 ha in 80 cm-rainfall Bundelkhand.',
    options: [
      'KG delta (irrigated, humid): kharif rice -> rabi pulses/blackgram on residual moisture -> summer green manure or fish-rice; MP rotation: kharif soyabean (legume fixes nitrogen) -> rabi mustard on conserved moisture -- legume-cereal/oilseed rotation restores fertility free; Bundelkhand (low rain): kharif bajra/pulses on light soils, rabi mustard/gram on conserved moisture, agroforestry border strips -- water-budget first, crops second',
      'Plant rice three times a year in every region; rotations are a fad',
      'Soyabean and mustard both need flooded fields',
      'Bundelkhand should copy the Kerala plan exactly'
    ],
    correctIndex: 0,
    explanation:
      'The design logic chain: rainfall/irrigation -> water budget -> crop window (kharif Jun-Oct, rabi Oct-Mar, zaid Apr-Jun) -> soil nutrient logic (legume before cereal). Rotation also breaks pest cycles -- agronomy\'s two-for-one. Bundelkhand\'s constraint (80 cm, erratic) rules out rice; drought-proofing millets and pulses is the honest answer.',
    hints: [
      'Season windows: kharif with the monsoon, rabi on the residual.',
      'Legumes feed the next crop -- nitrogen for free.',
      'Design to the WATER budget, not to habit.'
    ],
  },
  {
    id: 'ch_depth_bio_institutional_reforms',
    nodeId: 'c10_geo_cbse_04_007',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A Punjab farmer with 4 ha adopts drip irrigation and a Kisan Credit Card loan. Evaluate: "PMFBY has successfully ELIMINATED crop-failure risk for Indian farmers."',
    options: [
      'False as stated -- PMFBY (Pradhan Mantri Fasal Bima Yojana, 2016) TRANSFERS and softens risk (premium 1.5-2% for food crops, tech-based assessments) but does not eliminate it: claim delays, state-level implementation gaps and coverage exclusions persist. The farmer\'s own stack is smarter: drip raises efficiency AND KCC gives timely cheap credit -- risk managed in layers, not erased',
      'True -- insured farmers can never lose a crop again',
      'False because India has no crop insurance scheme at all',
      'True because premiums refund every drought'
    ],
    correctIndex: 0,
    explanation:
      'Institutional reform map: land holdings -> consolidation; capital -> KCC (short-term credit at subsidised rates); risk -> PMFBY; markets -> MSP/e-NAM; water -> drip (precious in Punjab\'s falling-water-table blocks). Evaluate by asking what "eliminate" would require -- the honest verdict is risk REDUCTION with residual gaps.',
    hints: [
      'Insurance shifts risk; it does not cancel the event.',
      'Name one implementation gap you have read about.',
      'Layered defences beat single silver bullets.'
    ],
  },
  {
    id: 'ch_depth_bio_green_revolution_msp',
    nodeId: 'c10_geo_cbse_04_009',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the Green Revolution concentrate in Punjab, Haryana and western UP (1966-85)? Define MSP and its announcing agency, why buffer stocks exist, and compare TPDS (1997) with NFSA (2013).',
    options: [
      'Concentration: assured IRRIGATION (canals/tubewells) + HYV seeds that demanded water and fertiliser + electrified tubewell belts -- the package worked only where water was guaranteed. MSP: government\'s announced procurement PRICE for wheat/rice set on CACP recommendation (agency: FCI procures; Cabinet/CCEA approves). Buffer stock: price stabilisation + food security in lean years (and PDS supply), not immediate distribution. TPDS targeted subsidies to above/below-poverty lines; NFSA 2013 made food a LEGAL RIGHT: 67% population coverage, 5 kg/person/month, plus maternity and mid-day-meal entitlements',
      'The Revolution spread uniformly across India; MSP is a private price; buffer stocks are for export profit; NFSA removed all targeting',
      'HYVs succeeded without irrigation anywhere',
      'FCI sets MSP by auction among farmers'
    ],
    correctIndex: 0,
    explanation:
      'Evaluate "100+ million tonnes of buffer stock = success": excess stocks rot in silos while holding costs soar and nutrient mining drains Punjab soils -- a successful policy is LEAN stock + low leakage, not maximum stock. Leakage reform design (3 points): (1) Aadhaar-linked but offline-capable ration cards, (2) decentralised procurement to cut transport leakage, (3) social audits and SMS/point-of-sale transparency at fair-price shops. GDP-employment paradox (04_010): agriculture fell to ~18% of GVA yet employs ~43% -- productivity ratio ~0.4, meaning hidden underemployment; the critique of "cut farm budgets" ignores that low productivity is the REASON investment must rise, not fall.',
    hints: [
      'HYV package = seeds + water + fertiliser; missing one breaks it.',
      'MSP is a price FLOOR, procurement is the instrument.',
      'Legal right (NFSA) vs targeted scheme (TPDS) -- entitlement vs discretion.'
    ],
  },
  {
    id: 'ch_depth_bio_landuse_district_plan',
    nodeId: 'c10_geo_cbse_04_002',
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design a land-use plan for a district with (a) forested hills with tribal population in the north, (b) fertile alluvial plains in the centre, (c) saline coastal strip in the south. Assign uses and justify each against land capability.',
    availableParts: ['North hills: protected forest + community forest rights', 'Centre plains: food-grain and vegetable farming', 'South coast: brackish aquaculture + salt-tolerant coconut', 'Buffer ecotone: agroforestry', 'Full-slope mining everywhere'],
    targetState: 'North hills: protected forest + community forest rights Centre plains: food-grain and vegetable farming South coast: brackish aquaculture + salt-tolerant coconut Buffer ecotone: agroforestry',
    validationHint: 'Match each zone to its capability: slope and tribal rights (north), fertility (centre), salinity (south), transition (buffer).',
    explanation: 'Capability-driven zoning: hills -> forest with FRA community rights (slope + livelihood), plains -> agriculture (depth, drainage, fertility), coast -> salt-tolerant systems (saline water tables), ecotone -> agroforestry stabilising the transition. The same logic underlies cropping calendars (04_003), cotton-jute rotations in deltas (04_006), and the green-revolution irrigation logic (04_008): land capability is the master variable.',
    hints: [
      'Capability = slope, soil, water, plus WHO lives there.',
      'Salinity is a resource for aquaculture, a curse for wheat.',
      'Buffer zones stop the hill erosion from reaching the fields.'
    ],
  }
];

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Agrobiodiversity: Native vs Exotic Breeds',
    instruction: 'Click on different livestock and crop icons to compare input dependency, disease resilience, and ecological footprint.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_EVS_021,
  },
  {
    title: '2. Traditional Agroecology: Nutrient & Water Cycles',
    instruction: 'Toggle traditional interventions (Khadin rainwater capture, Legume rotation, Panchagavya spray) to observe soil carbon and groundwater recovery.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_022,
  },
  {
    title: '3. Intensive Agriculture: Chemical Runoff & Eutrophication',
    instruction: 'Drag the Chemical Fertiliser (NPK) slider upward and watch the real-time algal bloom, sunlight extinction, and aquatic hypoxia in the lake.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_026,
  },
  {
    title: '4. Biomagnification Across Trophic Levels',
    instruction: 'Adjust the pesticide dose in the water column and observe the exponential toxic buildup from plankton to predatory eagles.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_EVS_029,
  },
  {
    title: '5. Landscape Fragmentation & Wildlife Corridors',
    instruction: 'Construct a forested wildlife overpass across the highway to reconnect severed tiger and elephant habitats and restore gene flow.',
    interactionType: 'drag-position',
    nodeId: NODE_C9_EVS_028,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If synthetic nitrogen fertiliser application is doubled on a clay-loam field while completely stopping farmyard manure for 5 years, what happens to earthworm populations and soil organic carbon?',
    options: [
      'Earthworms multiply ten-fold due to abundant chemical salts',
      'Soil organic carbon plunges, earthworms die out, and soil becomes compacted and dead',
      'Soil naturally transforms into pure crystalline quartz sand',
      'No change occurs because chemistry and biology operate independently',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the chemical input slider in the simulation lab and verify the soil microflora gauge!',
    nodeId: NODE_C9_EVS_026,
  },
  {
    question: 'Predict: If an unbroken 1000-hectare deciduous forest is bisected by a 6-lane fenced highway without eco-ducts or underpasses, what will happen to the local leopard population over 15 generations?',
    options: [
      'Leopards will learn to fly over the fencing effortlessly',
      'Sub-populations will suffer inbreeding depression, reduced fertility, and elevated extinction risk',
      'Genetic diversity will double due to isolation',
      'Leopards will stop reproducing and turn into herbivores',
    ],
    correctIndex: 1,
    verifyInstruction: 'Observe the genetic diversity index gauge as habitat connectivity drops from 100% to 20%!',
    nodeId: NODE_C9_EVS_028,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice happens to the Dissolved Oxygen (DO) reading in the lake simulation when the algal bloom covers more than 80% of the surface?',
    observableOptions: [
      'Dissolved oxygen surges to record high levels',
      'Dissolved oxygen plunges below 3 ppm as decomposer bacteria consume oxygen breaking down dead algae',
      'Water temperature drops below freezing point instantly',
      'Fish transform into amphibians and crawl onto the shore',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_EVS_026,
  },
  {
    question: 'In the Biomagnification model, why does the apex raptor carry 500,000 times higher DDT concentration than the surrounding water?',
    observableOptions: [
      'Eagles directly drink 500,000 litres of water every minute',
      'DDT is persistent, non-biodegradable, and fat-soluble, accumulating at each successive trophic step',
      'Eagles manufacture synthetic DDT inside their feathers',
      'Sunlight converts harmless water into DDT inside bird lungs',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_EVS_029,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Agrobiodiversity Audit & Soil Revival Action',
  description: 'Conduct a practical environmental field audit in your school, kitchen, or local rural fringe to document domesticated biodiversity and design a sustainable soil rejuvenation plan.',
  steps: [
    'Survey 5 food grains in your home and identify if any belong to climate-resilient Shri Anna millets (Ragi, Jowar, Bajra).',
    'Locate one medicinal botanical (Tulsi, Neem, Amla, Turmeric, Aloe) and document its traditional Ayurvedic therapeutic property.',
    'Design a small 1m × 1m demonstration vermicompost or green manure (sunhemp/sesbania) bed to restore organic carbon.',
    'Map a nearby water body or park and assess whether concrete construction has caused edge effects or runoff sedimentation.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_EVS_021,
  title: 'Domesticated Biodiversity & Agro-Ecological Heritage',
  definition: 'Domesticated biodiversity and traditional agricultural systems represent centuries of indigenous ecological co-evolution. Reversing agrochemical degradation, deforestation, resource depletion, and social displacement requires reviving native crop landraces, organic soil management, and watershed conservation.',
  eli5: 'Think of traditional farming as a healthy forest garden that feeds itself with compost and rain. Modern chemical farming is like giving soil an energy drink that makes plants grow fast for a short time, but eventually poisons the water, kills the earthworms, and leaves the land exhausted and sick.',
  misconceptions: [
    { misconception: 'Exotic cattle (Holstein Friesian) are universally superior to indigenous breeds like Gir because of higher immediate milk volume.', correction: 'Exotics require heavy air-cooling, expensive high-protein feed, and are vulnerable to tropical ticks and heat stroke. Native breeds like Gir thrive on dry fodder, resist disease, and yield nutrient-dense A2 milk sustainably.' },
    { misconception: 'Water harvesting and water recycling are identical concepts.', correction: 'Water harvesting collects rainwater where it falls (Khadins, Johads, tanks); water recycling involves treating wastewater/greywater for secondary reuse.' },
    { misconception: 'Millets are low-nutrition coarse grains meant only for backward farming.', correction: 'Millets (Shri Anna) are superior nutri-cereals; Ragi has 8x more calcium than wheat, requires 70% less water, and survives extreme droughts.' },
    { misconception: 'Consumer waste is purely a municipal garbage disposal issue.', correction: 'Waste begins at industrial production through planned obsolescence, fast fashion, and single-use design before the item is ever bought.' },
    { misconception: 'Urban land-use change is simply general environmental pollution.', correction: 'Land-use change is the permanent physical conversion of agricultural fields, wetlands, and forests into concrete settlements and roads.' },
    { misconception: 'Eutrophication is caused by toxic pesticide poisoning in lakes.', correction: 'Eutrophication is caused by nutrient enrichment (Nitrogen & Phosphorus fertilisers) fuelling algal blooms that decompose and exhaust dissolved oxygen.' },
  ],
  diagnosticQuestions: [
    { question: 'Which cattle breed is native to the Thar desert of Rajasthan and is drought-resilient?', options: ['Jersey', 'Tharparkar', 'Holstein', 'Swiss Brown'], correctIndex: 1 },
    { question: 'What is the function of Sunhemp or Sesbania in traditional Indian farming?', options: ['Green manure ploughed into soil to fix nitrogen and organic carbon', 'Chemical synthetic pesticide', 'Plastic mulch barrier', 'Artificial dye for seeds'], correctIndex: 0 },
    { question: 'Which compound in Turmeric provides anti-inflammatory and antiseptic action?', options: ['Curcumin', 'Azadirachtin', 'Urea', 'DDT'], correctIndex: 0 },
    { question: 'What is the annual global generation of electronic waste (e-waste)?', options: ['~50 thousand kg', '~50 million tonnes', '~500 tonnes', '~100 kg'], correctIndex: 1 },
    { question: 'What was the primary ecological factor behind Bellandur Lake frothing in Bengaluru?', options: ['Natural glacial melt', 'Encroachment of wetlands and untreated detergent/industrial sewage discharge', 'Excessive organic composting', 'Planting too many native trees'], correctIndex: 1 },
    { question: 'What is the Nitrogen content in commercial Urea?', options: ['10%', '21%', '46%', '80%'], correctIndex: 2 },
    { question: 'Which organochlorine pesticide famously causes eggshell thinning in predatory birds through biomagnification?', options: ['Panchagavya', 'DDT', 'Bijamrita', 'Cow dung ash'], correctIndex: 1 },
    { question: 'What social movement led by Medha Patkar protested the displacement of tribal communities along the Narmada River?', options: ['Chipko Movement', 'Narmada Bachao Andolan', 'Appiko Movement', 'Silent Valley Campaign'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate deep analytical mastery of native agro-biodiversity, traditional sustainable practices, ecological consequences of intensive agriculture, pollution mechanisms, and environmental justice principles.',
};

// ─── MAIN COMPONENT ───
function C9_EVSDomesticatedBiodiversityNativeSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_EVS_021,
  title = DEFAULT_PROPS.title || 'Domesticated Biodiversity & Agro-Ecological Heritage',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Predict-Then-Check & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Controls & Models
  const [selectedOrganism, setSelectedOrganism] = useState<'gir' | 'holstein' | 'ragi' | 'hybrid_wheat'>('gir');
  const [fertiliserDose, setFertiliserDose] = useState(30); // 0 to 100 kg/ha
  const [pesticideInput, setPesticideInput] = useState(15); // 0 to 100 ppm
  const [waterExtractionRate, setWaterExtractionRate] = useState(40); // 0 to 100%
  const [soilCarbonPercent, setSoilCarbonPercent] = useState(2.4); // %
  const [traditionalPracticesActive, setTraditionalPracticesActive] = useState({
    khadin: true,
    cropRotation: true,
    panchagavya: true,
  });
  const [corridorBuilt, setCorridorBuilt] = useState(false);
  const [urbanSprawlLevel, setUrbanSprawlLevel] = useState(25); // 0 to 100%

  // Visual Feedback & Dynamic Animation State
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Reflection section answers
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    application: '',
  });

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Interactive Challenge Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Simulation Canvas & Engine Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bktStateRef = useRef(createBKTState());

  // ─── DERIVED SIMULATION VALUES ─���─
  const lakeDissolvedOxygen = useMemo(() => {
    const baseDO = 9.5; // ppm
    const depletion = (fertiliserDose / 100) * 7.5;
    return Math.max(1.2, parseFloat((baseDO - depletion).toFixed(1)));
  }, [fertiliserDose]);

  const algalBloomPercentage = useMemo(() => {
    return Math.min(100, Math.round(fertiliserDose * 1.15));
  }, [fertiliserDose]);

  const biomagConcentrations = useMemo(() => {
    const water = pesticideInput * 0.0001;
    const plankton = water * 800;
    const smallFish = plankton * 12.5;
    const largeFish = smallFish * 4;
    const apexEagle = largeFish * 12.5;
    return {
      water: water.toFixed(5),
      plankton: plankton.toFixed(3),
      smallFish: smallFish.toFixed(2),
      largeFish: largeFish.toFixed(1),
      apexEagle: apexEagle.toFixed(1),
    };
  }, [pesticideInput]);

  const groundwaterPlungeRate = useMemo(() => {
    const baseRecharge = traditionalPracticesActive.khadin ? 0.3 : 0.05;
    const extractionDemand = (waterExtractionRate / 100) * 1.2;
    return Math.max(0.05, parseFloat((extractionDemand - baseRecharge).toFixed(2)));
  }, [waterExtractionRate, traditionalPracticesActive.khadin]);

  const geneticDiversityIndex = useMemo(() => {
    if (corridorBuilt) return 92;
    const fragmentationDamage = Math.round((urbanSprawlLevel / 100) * 65);
    return Math.max(15, 88 - fragmentationDamage);
  }, [corridorBuilt, urbanSprawlLevel]);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeObj = filteredChallenges[currentChallenge] || CHALLENGES[0];

  const explanationSentences = useMemo(() => {
    return currentChallengeObj.explanation.split('. ').filter(s => s.trim().length > 0);
  }, [currentChallengeObj]);

  // ─── INITIAL MASTERY LOAD EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY DIFFICULTY EFFECT ───
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

  // ─── CANVAS PARTICLE & ECOSYSTEM ANIMATION EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 1.5,
      type: Math.random() > 0.5 ? 'nutrient' : 'organism',
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (phase === 'explore' && currentSlide === 2) {
        const greenness = Math.min(220, 50 + algalBloomPercentage * 1.7);
        grad.addColorStop(0, `rgb(20, ${Math.round(greenness * 0.6)}, 40)`);
        grad.addColorStop(1, `rgb(10, ${Math.round(greenness * 0.9)}, 60)`);
      } else {
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#020617');
      }
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
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.type === 'nutrient') {
          ctx.fillStyle = fertiliserDose > 50 ? '#84cc16' : '#38bdf8';
        } else {
          ctx.fillStyle = lakeDissolvedOxygen < 3 ? '#ef4444' : '#10b981';
        }
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Bio-Sim Engine: ${phase.toUpperCase()} | Lake DO: ${lakeDissolvedOxygen} ppm | Diversity: ${geneticDiversityIndex}%`, 12, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentSlide, fertiliserDose, algalBloomPercentage, lakeDissolvedOxygen, geneticDiversityIndex]);

  // ─── CALLBACK HANDLERS ───
  const handleDiscoverySelect = useCallback((idx: number) => {
    setDiscoverySelected(idx);
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Insightful observation! You identified the living soil breakdown.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Agroecology Exploration Lab. Explore each ecological principle interactively.');
  }, []);

  const handleSliderChange = useCallback((val: number) => {
    setErrors(val);
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode activated. Experiment freely with all environmental controls.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Test your analytical understanding.');
  }, []);

  const handlePredictionSubmit = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction logged! Now manipulate the simulation controls to verify your hypothesis.');
  }, []);

  const handleObservationSubmit = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Accurate scientific observation!' : 'Examine the dissolved oxygen gauge carefully.');
  }, []);

  const handleOrganismSelect = useCallback((org: 'gir' | 'holstein' | 'ragi' | 'hybrid_wheat') => {
    setSelectedOrganism(org);
    audioManager.play('tap');
    const speechMap = {
      gir: 'Gir cattle of Gujarat: Heat resilient, tick resistant, thrives on dry fodder, produces A2 milk.',
      holstein: 'Holstein Friesian: High milk volume but demands heavy air cooling, high-protein feed, and antibiotics.',
      ragi: 'Ragi finger millet: Shri Anna super-cereal, rich in calcium, thrives in drylands with near-zero chemicals.',
      hybrid_wheat: 'Hybrid dwarf wheat: Requires heavy synthetic nitrogen, deep tubewell irrigation, and chemical pesticides.',
    };
    speechManager.speak(speechMap[org]);
  }, []);

  const handleFertiliserChange = useCallback((val: number) => {
    setFertiliserDose(val);
    audioManager.play('count');
    setSoilCarbonPercent(Math.max(0.4, parseFloat((3.0 - (val / 100) * 2.2).toFixed(2))));
  }, []);

  const handlePesticideChange = useCallback((val: number) => {
    setPesticideInput(val);
    audioManager.play('count');
  }, []);

  const handleWaterExtractionChange = useCallback((val: number) => {
    setWaterExtractionRate(val);
    audioManager.play('count');
  }, []);

  const handleTogglePractice = useCallback((key: 'khadin' | 'cropRotation' | 'panchagavya') => {
    setTraditionalPracticesActive(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      audioManager.play('pop');
      return updated;
    });
  }, []);

  const handleToggleCorridor = useCallback(() => {
    setCorridorBuilt(prev => {
      const next = !prev;
      audioManager.play(next ? 'sparkle' : 'pop');
      speechManager.speak(next ? 'Forested eco-duct installed! Wildlife connectivity restored.' : 'Corridor dismantled.');
      return next;
    });
  }, []);

  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && currentChallengeObj.hints[nextLvl - 1]) {
      const hintText = currentChallengeObj.hints[nextLvl - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete ecological explanation.');
    }
  }, [hintCount, currentChallengeObj]);

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
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Agro-Ecological Simulation Complete! Excellent work on restoring biodiversity and sustainability.');
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

  const handleAnswer = useCallback((userResponse: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (currentChallengeObj.type === 'classify' || currentChallengeObj.type === 'distinguish' || currentChallengeObj.type === 'match') {
      isCorrect = userResponse === currentChallengeObj.correctIndex;
    } else if (currentChallengeObj.type === 'drag-label') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(currentChallengeObj.correctMapping);
    } else if (currentChallengeObj.type === 'drag-sort') {
      isCorrect = JSON.stringify(userResponse) === JSON.stringify(currentChallengeObj.correctOrder);
    } else if (currentChallengeObj.type === 'numeric') {
      const numVal = typeof userResponse === 'string' ? parseFloat(userResponse) : Number(userResponse);
      isCorrect = Math.abs(numVal - (currentChallengeObj.correctAnswer || 0)) <= (currentChallengeObj.tolerance || 0.1);
    } else if (currentChallengeObj.type === 'construct') {
      isCorrect = userResponse === currentChallengeObj.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! Correct reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
      const updatedSrs = sm2Update(srsItem, 5, 3800);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${currentChallengeObj.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeObj.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeObj.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeObj.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Hints exhausted. Review the step-by-step ecological breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(currentChallengeObj.nodeId, currentChallengeObj.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${currentChallengeObj.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeObj, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isMatch = currentChallengeObj.correctMapping?.[targetId] === draggedItem;
    if (isMatch) {
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    setDraggedItem(null);
  }, [draggedItem, currentChallengeObj]);

  const handleSortReorder = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const items = prev.length === currentChallengeObj.sortItems?.length
        ? [...prev]
        : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
      const [removed] = items.splice(fromIdx, 1);
      items.splice(toIdx, 0, removed);
      return items;
    });
  }, [currentChallengeObj]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0
      ? sortArrangement
      : (currentChallengeObj.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, currentChallengeObj, handleAnswer]);

  const handleSlideNav = useCallback((dir: 'prev' | 'next') => {
    audioManager.play('tap');
    if (dir === 'prev') {
      setCurrentSlide(s => Math.max(0, s - 1));
    } else {
      setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    }
  }, []);

  // Cleanup auto-hint timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans overflow-hidden">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-5 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs font-mono px-2 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-full border border-emerald-700/50">
                ICSE Class 9
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Covers 10 Syllabus Nodes: Native Biodiversity, Agroecology, Eutrophication, Biomagnification & Social Justice
            </p>
          </div>
        </div>

        {/* Phase Navigation Badges */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Navigate to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'complete' && phase !== 'complete') return;
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── CANVAS SIMULATION TELEMETRY STRIP ─── */}
      <div className="relative mb-5 rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
        <canvas ref={canvasRef} width={800} height={50} className="w-full h-12 block" aria-label="Ecosystem telemetry canvas" />
        <div className="absolute right-3 top-2 flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-950/80 text-emerald-400 border border-emerald-800/40 rounded-full">
            Soil Carbon: {soilCarbonPercent}%
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-950/80 text-sky-400 border border-sky-800/40 rounded-full">
            Drawdown: {groundwaterPlungeRate} m/yr
          </span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-5"
          >
            <div className="p-5 bg-gradient-to-br from-emerald-950/40 to-slate-900 rounded-2xl border border-emerald-800/40 shadow-inner">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-2">
                <span>📖</span> Scenario Briefing: {SCENARIO.title}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-2 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
                🎯 {SCENARIO.context}
              </p>
            </div>

            <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-lg border border-amber-800/40">
                  Pre-Exploration Curiosity Hook
                </span>
                <span className="text-xs text-slate-400">Not Graded — Test Your Intuition</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 gap-2.5 pt-1">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoverySelect(idx)}
                    disabled={discoveryAnswered}
                    className={`text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                      discoveryAnswered
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : idx === discoverySelected
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {discoveryAnswered ? (
                        idx === DISCOVERY_QUESTION.correctIndex ? '✓' : idx === discoverySelected ? '✗' : String.fromCharCode(65 + idx)
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                  <p className={`text-xs sm:text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect
                      ? '✓ Correct: Spot on! Chemical salts bypass soil biology, starving earthworms and organic carbon builders.'
                      : `✗ Review: ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter interactive exploration lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50 flex items-center justify-center gap-2"
                  >
                    Enter Interactive Lab →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
        {phase === 'explore' && (
          <motion.section
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/50">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
              </span>
              <div className="flex items-center gap-2">
                <motion.button
                  aria-label="Previous exploration slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSlideNav('prev')}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  aria-label="Next exploration slide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSlideNav('next')}
                  disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                  className="px-3 py-1.5 bg-slate-800 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  Next →
                </motion.button>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 border border-indigo-800/40 rounded-xl text-xs sm:text-sm text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">👉</span>
              <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
            </div>

            {/* Stage */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 min-h-[380px] shadow-2xl">
              {/* SLIDE 0: Native vs Exotic Biodiversity */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { id: 'gir' as const, label: 'Gir Cow', type: 'Indigenous Cattle', badge: 'Gujarat' },
                      { id: 'holstein' as const, label: 'Holstein Friesian', type: 'Exotic Hybrid', badge: 'Europe' },
                      { id: 'ragi' as const, label: 'Ragi (Finger Millet)', type: 'Shri Anna Crop', badge: 'Karnataka' },
                      { id: 'hybrid_wheat' as const, label: 'HYV Dwarf Wheat', type: 'Chemical HYV', badge: 'Green Rev' },
                    ].map(org => (
                      <motion.button
                        key={org.id}
                        aria-label={`Select ${org.label} (${org.type})`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleOrganismSelect(org.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedOrganism === org.id
                            ? 'bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-950/50'
                            : 'bg-slate-800/70 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase text-emerald-400 bg-slate-950 px-1.5 py-0.5 rounded">
                          {org.badge}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">{org.label}</h4>
                        <p className="text-[11px] text-slate-400">{org.type}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Trait Breakdown: {selectedOrganism.toUpperCase()}
                      </h5>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-900">
                          <span className="text-slate-400">Heat & Drought Resilience:</span>
                          <span className="font-bold text-emerald-400">
                            {selectedOrganism === 'gir' || selectedOrganism === 'ragi' ? '✓ Very High (Native Gene Pool)' : '✗ Low (Needs Cooling/Heavy Water)'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-900">
                          <span className="text-slate-400">External Input Requirement:</span>
                          <span className="font-bold text-amber-400">
                            {selectedOrganism === 'gir' || selectedOrganism === 'ragi' ? '✓ Minimal (Low Cost / Dry Fodder)' : '✗ Excessive (Antibiotics / High NPK)'}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-900">
                          <span className="text-slate-400">Nutritional Profile:</span>
                          <span className="font-bold text-sky-400">
                            {selectedOrganism === 'gir'
                              ? '✓ A2 Beta-Casein Rich Milk'
                              : selectedOrganism === 'ragi'
                              ? '✓ 344 mg Calcium/100g (8x Wheat)'
                              : 'Standard Commercial Bulk Yield'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <svg viewBox="0 0 200 120" className="w-full h-28" aria-label="Organism graphic diagram">
                        <circle cx="100" cy="60" r="45" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                        {selectedOrganism === 'gir' && (
                          <g fill="#10b981">
                            <text x="100" y="55" textAnchor="middle" fontSize="11" fontWeight="bold">GIR ZEBU</text>
                            <text x="100" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">Heat/Tick Tolerant</text>
                            <circle cx="75" cy="45" r="4" fill="#34d399" />
                            <circle cx="125" cy="45" r="4" fill="#34d399" />
                          </g>
                        )}
                        {selectedOrganism === 'holstein' && (
                          <g fill="#ef4444">
                            <text x="100" y="55" textAnchor="middle" fontSize="10" fontWeight="bold">HOLSTEIN</text>
                            <text x="100" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">High-Input Exotic</text>
                            <rect x="70" y="40" width="60" height="10" rx="3" fill="#f87171" />
                          </g>
                        )}
                        {selectedOrganism === 'ragi' && (
                          <g fill="#38bdf8">
                            <text x="100" y="55" textAnchor="middle" fontSize="11" fontWeight="bold">RAGI MILLET</text>
                            <text x="100" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">344mg Calcium/100g</text>
                            <path d="M 100 20 L 100 80 M 85 45 L 100 35 L 115 45" stroke="#38bdf8" strokeWidth="2" fill="none" />
                          </g>
                        )}
                        {selectedOrganism === 'hybrid_wheat' && (
                          <g fill="#f59e0b">
                            <text x="100" y="55" textAnchor="middle" fontSize="10" fontWeight="bold">HYV WHEAT</text>
                            <text x="100" y="70" textAnchor="middle" fontSize="8" fill="#94a3b8">High NPK & Water</text>
                            <circle cx="100" cy="40" r="8" fill="#fbbf24" />
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Traditional Agroecology Toggles */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'khadin' as const, label: 'Khadin / Johad Harvesting', desc: 'Captures runoff; recharges aquifer' },
                      { key: 'cropRotation' as const, label: 'Legume Crop Rotation', desc: 'Rhizobium fixes biological nitrogen' },
                      { key: 'panchagavya' as const, label: 'Panchagavya Foliar Spray', desc: 'Cow bio-formulation for immunity' },
                    ].map(item => (
                      <motion.button
                        key={item.key}
                        aria-label={`Toggle ${item.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleTogglePractice(item.key)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          traditionalPracticesActive[item.key]
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/50 border-slate-700 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{item.label}</span>
                          <span>{traditionalPracticesActive[item.key] ? '✓ ACTIVE' : '✗ OFF'}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">{item.desc}</p>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 160" className="w-full h-36" aria-label="Traditional agro-ecosystem soil model">
                      <rect x="0" y="0" width="400" height="70" fill="#0f172a" />
                      <rect x="0" y="70" width="400" height="90" fill="#1e1b18" />
                      <rect x="0" y="110" width="400" height="50" fill="#141210" />

                      {traditionalPracticesActive.khadin ? (
                        <g>
                          <path d="M 20 70 Q 60 90 100 70" fill="#0284c7" opacity="0.6" />
                          <text x="60" y="65" fill="#38bdf8" fontSize="8" textAnchor="middle">Khadin Catchment</text>
                        </g>
                      ) : (
                        <text x="60" y="65" fill="#64748b" fontSize="8" textAnchor="middle">Dry Soil (No Harvesting)</text>
                      )}

                      {traditionalPracticesActive.cropRotation ? (
                        <g>
                          <line x1="200" y1="70" x2="200" y2="40" stroke="#10b981" strokeWidth="3" />
                          <circle cx="195" cy="40" r="4" fill="#34d399" />
                          <circle cx="205" cy="40" r="4" fill="#34d399" />
                          <circle cx="196" cy="85" r="3" fill="#f59e0b" />
                          <circle cx="204" cy="95" r="3" fill="#f59e0b" />
                          <text x="200" y="30" fill="#34d399" fontSize="8" textAnchor="middle">Legume N-Fixation</text>
                        </g>
                      ) : (
                        <g>
                          <line x1="200" y1="70" x2="200" y2="45" stroke="#94a3b8" strokeWidth="2" />
                          <text x="200" y="30" fill="#64748b" fontSize="8" textAnchor="middle">Monoculture</text>
                        </g>
                      )}

                      {traditionalPracticesActive.panchagavya && (
                        <g>
                          <circle cx="320" cy="50" r="14" fill="#84cc16" opacity="0.25" />
                          <text x="320" y="53" fill="#a3e635" fontSize="8" textAnchor="middle">Bio-Panchagavya</text>
                        </g>
                      )}

                      <text x="200" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">
                        Active Soil Microbial Carbon: {(soilCarbonPercent * (traditionalPracticesActive.cropRotation ? 1.2 : 0.7)).toFixed(2)}%
                      </text>
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Chemical Runoff & Eutrophication Lab */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-3 bg-amber-950/40 border border-amber-700/50 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-amber-300">
                        ❓ {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePredictionSubmit(i)}
                            className="p-2 text-left bg-slate-900 border border-slate-700 hover:border-amber-500 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Synthetic NPK Fertiliser Application Rate:</span>
                      <span className="font-mono font-bold text-emerald-400">{fertiliserDose} kg/ha</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      aria-label="Synthetic NPK Fertiliser Application Rate Slider"
                      value={fertiliserDose}
                      onChange={e => handleFertiliserChange(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 140" className="w-full h-32" aria-label="Eutrophication lake water cross-section">
                      <rect x="0" y="20" width="400" height="120" fill="#0369a1" opacity="0.7" />
                      <rect
                        x="0"
                        y="20"
                        width="400"
                        height={Math.max(4, (algalBloomPercentage / 100) * 35)}
                        fill="#84cc16"
                        opacity={algalBloomPercentage / 100}
                      />
                      <line x1="50" y1="0" x2="50" y2={Math.max(25, 120 - algalBloomPercentage)} stroke="#fde047" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="200" y1="0" x2="200" y2={Math.max(25, 120 - algalBloomPercentage)} stroke="#fde047" strokeWidth="2" strokeDasharray="3,3" />
                      <line x1="350" y1="0" x2="350" y2={Math.max(25, 120 - algalBloomPercentage)} stroke="#fde047" strokeWidth="2" strokeDasharray="3,3" />

                      {lakeDissolvedOxygen > 4 ? (
                        <g fill="#38bdf8">
                          <text x="100" y="80" fontSize="12">🐟</text>
                          <text x="250" y="100" fontSize="12">🐠</text>
                          <text x="320" y="70" fontSize="12">🐟</text>
                        </g>
                      ) : (
                        <g fill="#ef4444">
                          <text x="100" y="45" fontSize="12">☠️ 🐟</text>
                          <text x="250" y="45" fontSize="12">☠️ 🐠</text>
                          <text x="320" y="45" fontSize="12">☠️ 🐟</text>
                        </g>
                      )}

                      <text x="200" y="130" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">
                        Lake DO: {lakeDissolvedOxygen} ppm ({(lakeDissolvedOxygen < 4) ? '✗ LETHAL HYPOXIA' : '✓ HEALTHY AEROBIC'})
                      </text>
                    </svg>
                  </div>

                  {(fertiliserDose > 60 && !observationAnswered) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-2"
                    >
                      <p className="text-xs font-bold text-sky-300">
                        🔍 Observation Check: {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation Option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservationSubmit(i)}
                            className="p-2 text-left bg-slate-950 border border-slate-800 hover:border-sky-500 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 3: Biomagnification Ladder */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Pesticide (DDT/Organophosphate) Input Index:</span>
                      <span className="font-mono font-bold text-rose-400">{pesticideInput} units</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={100}
                      aria-label="Pesticide Input Index Slider"
                      value={pesticideInput}
                      onChange={e => handlePesticideChange(Number(e.target.value))}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                    {[
                      { trophic: 'Water Column', ppm: biomagConcentrations.water, icon: '💧', factor: '1x' },
                      { trophic: 'Phytoplankton', ppm: biomagConcentrations.plankton, icon: '🦠', factor: '800x' },
                      { trophic: 'Small Fish', ppm: biomagConcentrations.smallFish, icon: '🐟', factor: '10,000x' },
                      { trophic: 'Large Predatory Fish', ppm: biomagConcentrations.largeFish, icon: '🦈', factor: '40,000x' },
                      { trophic: 'Apex Eagle (Raptor)', ppm: biomagConcentrations.apexEagle, icon: '🦅', factor: '500,000x' },
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 shadow-inner"
                      >
                        <span className="text-xl" aria-hidden="true">{step.icon}</span>
                        <h5 className="text-[10px] font-bold text-slate-300 uppercase">{step.trophic}</h5>
                        <p className="text-xs font-mono font-bold text-rose-400">{step.ppm} ppm</p>
                        <span className="text-[9px] text-slate-500 block">{step.factor}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-rose-950/30 border border-rose-800/40 rounded-xl text-xs text-rose-300">
                    ⚠️ <strong>Biological Mechanism:</strong> DDT is non-biodegradable and lipophilic (fat-soluble). Because organisms at higher trophic levels consume vast quantities of lower biomass, toxic residues multiply exponentially, thinning eagle eggshells and concentrating in human tissues.
                  </div>
                </div>
              )}

              {/* SLIDE 4: Habitat Fragmentation & Wildlife Overpass */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <h5 className="text-xs font-bold text-white">Habitat Connectivity & Gene Flow Control</h5>
                      <p className="text-xs text-slate-400">Toggle the wildlife eco-duct overpass across the 6-lane transport highway.</p>
                    </div>
                    <motion.button
                      aria-label="Toggle Forested Wildlife Eco-Duct"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleToggleCorridor}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shadow-lg transition-all ${
                        corridorBuilt
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-rose-700 hover:bg-rose-600 text-white'
                      }`}
                    >
                      {corridorBuilt ? '✓ Eco-Duct Connected (92% Diversity)' : '✗ Severed Highway Barrier (23% Diversity)'}
                    </motion.button>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 400 130" className="w-full h-32" aria-label="Wildlife corridor and highway fragmentation diagram">
                      <rect x="0" y="0" width="160" height="130" fill="#064e3b" />
                      <text x="80" y="30" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">RAJPAHARI FOREST (Tigers)</text>

                      <rect x="240" y="0" width="160" height="130" fill="#064e3b" />
                      <text x="320" y="30" fill="#a7f3d0" fontSize="10" textAnchor="middle" fontWeight="bold">CORBETT CORRIDOR (Elephants)</text>

                      <rect x="160" y="0" width="80" height="130" fill="#334155" />
                      <line x1="200" y1="0" x2="200" y2="130" stroke="#fde047" strokeWidth="2" strokeDasharray="6,6" />
                      <text x="200" y="70" fill="#ffffff" fontSize="9" textAnchor="middle" transform="rotate(90, 200, 70)">
                        6-LANE HIGHWAY
                      </text>

                      {corridorBuilt && (
                        <g>
                          <rect x="150" y="40" width="100" height="45" rx="6" fill="#059669" stroke="#10b981" strokeWidth="2" />
                          <text x="200" y="65" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">
                            🌳 WILDLIFE ECO-DUCT 🐘
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">
                Completed {currentSlide + 1} of {EXPLORATION_STEPS.length} interactive modules
              </span>
              {currentSlide === EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  aria-label="Proceed to sandbox mode"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50"
                >
                  Proceed to Sandbox Free Play →
                </motion.button>
              ) : (
                <motion.button
                  aria-label="Explore next principle"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSlideNav('next')}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-lg"
                >
                  Explore Next Principle →
                </motion.button>
              )}
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 3: UNGRADED SANDBOX FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🎛️</span> Agro-Ecological Sandbox: Full Parameter Lab
              </h3>
              <p className="text-xs text-slate-400">
                Adjust chemical inputs, groundwater pumping rates, and conservation corridors simultaneously with instant live telemetry updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Fertiliser Application:</span>
                    <span className="font-mono text-emerald-400 font-bold">{fertiliserDose} kg/ha</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    aria-label="Sandbox Fertiliser Application Slider"
                    value={fertiliserDose}
                    onChange={e => handleFertiliserChange(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Pesticide Index:</span>
                    <span className="font-mono text-rose-400 font-bold">{pesticideInput} ppm</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    aria-label="Sandbox Pesticide Input Slider"
                    value={pesticideInput}
                    onChange={e => handlePesticideChange(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Groundwater Tubewell Pumping:</span>
                    <span className="font-mono text-sky-400 font-bold">{waterExtractionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    aria-label="Sandbox Groundwater Pumping Slider"
                    value={waterExtractionRate}
                    onChange={e => handleWaterExtractionChange(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="md:col-span-2 p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block">Lake Oxygen</span>
                  <span className="text-base font-mono font-bold text-sky-400">{lakeDissolvedOxygen} ppm</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    {(lakeDissolvedOxygen < 4) ? '✗ Dead Zone' : '✓ Aerobic'}
                  </span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block">Eagle DDT</span>
                  <span className="text-base font-mono font-bold text-rose-400">{biomagConcentrations.apexEagle} ppm</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Apex Biomag</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block">Water Drawdown</span>
                  <span className="text-base font-mono font-bold text-amber-400">{groundwaterPlungeRate} m/yr</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Punjab Aquifer</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 block">Genetic Pool</span>
                  <span className="text-base font-mono font-bold text-emerald-400">{geneticDiversityIndex}%</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Connectivity</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                aria-label="Ready for evaluated challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-900/50"
              >
                Ready for Evaluated Challenges! →
              </motion.button>
            </div>
          </motion.section>
        )}

        {/* ─── PHASE 4: EVALUATED CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.section
            key="challenge-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between p-3.5 bg-slate-900 rounded-2xl border border-slate-800 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-1 bg-slate-950 text-white rounded-xl border border-slate-700">
                  Challenge {currentChallenge + 1} / {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-700'
                      : difficulty === 'standard'
                      ? 'bg-sky-950/70 text-sky-300 border-sky-700'
                      : 'bg-rose-950/70 text-rose-300 border-rose-700'
                  }`}
                >
                  {difficulty} TIER
                </motion.span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded border border-indigo-800">
                  NEP: {currentChallengeObj.competencyLevel}
                </span>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                BKT Mastery: <span className="text-emerald-400 font-bold">{masteryLevel}</span>
              </div>
            </div>

            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>

            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={wrongShake ? { duration: 0.4 } : {}}
              className={`p-5 rounded-2xl border transition-colors shadow-2xl ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                {currentChallengeObj.question}
              </h3>

              {/* ── TYPE 1: MCQ ── */}
              {(currentChallengeObj.type === 'classify' ||
                currentChallengeObj.type === 'distinguish' ||
                currentChallengeObj.type === 'match') &&
                currentChallengeObj.options && (
                  <div className="space-y-2.5">
                    {currentChallengeObj.options.map((opt, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleAnswer(idx)}
                        disabled={answerRevealed || showExplanation}
                        className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-start gap-3 border ${
                          showExplanation
                            ? idx === currentChallengeObj.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : 'bg-slate-950/40 border-slate-800 text-slate-500'
                            : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {showExplanation ? (idx === currentChallengeObj.correctIndex ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* ── TYPE 2: DRAG-AND-DROP LABELING ── */}
              {currentChallengeObj.type === 'drag-label' && currentChallengeObj.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {currentChallengeObj.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        aria-label={`Draggable label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentChallengeObj.dragItems.map((item, i) => (
                      <div
                        key={i}
                        aria-label={`Drop target for ${item.targetId}`}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[90px] transition-colors ${
                          droppedLabels[item.targetId]
                            ? 'bg-emerald-950/50 border-emerald-500'
                            : 'bg-slate-950 border-slate-700'
                        }`}
                      >
                        <span className="text-[11px] text-slate-400 font-mono">
                          Target Zone [{item.targetId.replace('bot_', '').replace('mech_', '').toUpperCase()}]:
                        </span>
                        <span className="text-sm font-bold text-emerald-300">
                          {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : '👉 Drag Matching Label Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Validate drag and drop labels"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg"
                  >
                    Validate Labels
                  </motion.button>
                </div>
              )}

              {/* ── TYPE 3: DRAG-SORT PROCESS ORDERING ── */}
              {currentChallengeObj.type === 'drag-sort' && currentChallengeObj.sortItems && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === currentChallengeObj.sortItems.length
                      ? sortArrangement.map(idx => ({ item: currentChallengeObj.sortItems![idx], origIdx: idx }))
                      : currentChallengeObj.sortItems.map((item, idx) => ({ item, origIdx: idx }))
                    ).map((obj, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        aria-label={`Sort step ${displayIdx + 1}: ${obj.item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortReorder(from, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3 shadow"
                      >
                        <span className="w-5 h-5 rounded-full bg-emerald-900/80 text-emerald-300 text-xs flex items-center justify-center font-bold">
                          {displayIdx + 1}
                        </span>
                        <span>{obj.item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Submit sorted process order"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg"
                  >
                    Check Process Sequence
                  </motion.button>
                </div>
              )}

              {/* ── TYPE 4: NUMERIC CALCULATION ── */}
              {currentChallengeObj.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step={0.1}
                      aria-label="Numeric calculation answer input"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none w-44"
                    />
                    <span className="text-xs font-mono text-slate-400">{currentChallengeObj.unit}</span>
                    <motion.button
                      aria-label="Check numeric calculation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg"
                    >
                      Check Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── TYPE 5: CONSTRUCT BIO-FORMULATION ── */}
              {currentChallengeObj.type === 'construct' && currentChallengeObj.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {currentChallengeObj.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add ingredient ${part}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-emerald-900/80 text-emerald-200 border border-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1.5"
                      >
                        {part}
                        <button
                          aria-label={`Remove ingredient ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click ingredients above to formulate.</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Test formulated mixture"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg"
                  >
                    Test Formulation
                  </motion.button>
                </div>
              )}

              {/* ── STEP-BY-STEP EXPLANATION ── */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-3"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Step-by-Step Agro-Ecological Explanation:
                  </h4>
                  {explanationSentences.slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{idx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps < (explanationSentences.length - 1) ? (
                      <motion.button
                        aria-label="Show next explanation step"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        aria-label="Proceed to next challenge"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-lg shadow-emerald-900/50"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise & Review →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.section>
        )}

        {/* ─── PHASE 5: COMPLETION, REFLECTION & SRS ─── */}
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="p-6 bg-gradient-to-br from-emerald-950/70 to-slate-900 rounded-3xl border border-emerald-700/60 shadow-2xl text-center space-y-2">
              <span className="text-4xl" aria-hidden="true">🎉</span>
              <h2 className="text-2xl font-black text-white">Agro-Ecological Mastery Complete!</h2>
              <p className="text-sm font-mono text-emerald-400">
                Final Score: {Math.max(0, 100 - errors * 5)}% | Mastery Level: {masteryLevel.toUpperCase()}
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs sm:text-sm leading-relaxed text-slate-200">
              {errors === 0 ? (
                <span className="text-emerald-400 font-bold">
                  🌟 Perfect Score! You have attained total mastery over India&apos;s native crop-livestock biodiversity, traditional water harvesting, and the ecological dynamics of intensive agriculture.
                </span>
              ) : errors <= 3 ? (
                <span className="text-sky-300 font-bold">
                  🌿 Exceptional Performance! You demonstrated deep analytical acumen on eutrophication, biomagnification, and environmental justice.
                </span>
              ) : (
                <span className="text-amber-300 font-medium">
                  🌱 Solid Progress! Review the identified misconceptions below and revisit the interactive simulation lab to strengthen your foundational concepts.
                </span>
              )}
            </div>

            {/* ─── VISIBLE SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
            <div className="p-5 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 rounded-2xl border-2 border-indigo-500/50 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">📅</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Spaced Repetition (SRS) Review Schedule
                    </h4>
                    <p className="text-xs text-indigo-300">
                      Automated SM-2 Memory Retention Engine
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-indigo-900/80 text-indigo-200 border border-indigo-400/50 rounded-xl text-xs font-mono font-bold">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center pt-1">
                <div className={`p-2.5 rounded-xl border ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 shadow-lg shadow-emerald-950/40' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                  <span className="text-xs font-bold text-emerald-400 block">0 Errors</span>
                  <span className="text-[11px] text-slate-300">Next Review: 7 Days</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-sky-950/60 border-sky-500 shadow-lg shadow-sky-950/40' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                  <span className="text-xs font-bold text-sky-400 block">1–3 Errors</span>
                  <span className="text-[11px] text-slate-300">Next Review: 3 Days</span>
                </div>
                <div className={`p-2.5 rounded-xl border ${errors >= 4 ? 'bg-amber-950/60 border-amber-500 shadow-lg shadow-amber-950/40' : 'bg-slate-950/50 border-slate-800 opacity-60'}`}>
                  <span className="text-xs font-bold text-amber-400 block">4+ Errors</span>
                  <span className="text-[11px] text-slate-300">Next Review: 1 Day</span>
                </div>
              </div>
            </div>

            {/* ─── REFLECTION SECTION ─── */}
            <div className="p-5 bg-indigo-950/30 rounded-2xl border border-indigo-800/50 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                <span>🤔</span> Personal Agro-Ecological Reflection
              </h4>
              <div className="space-y-3">
                <div>
                  <label htmlFor="ref-surprising" className="block text-xs font-semibold text-slate-300 mb-1">
                    1. What was the most surprising thing you learned about native biodiversity vs chemical farming?
                  </label>
                  <textarea
                    id="ref-surprising"
                    rows={2}
                    aria-label="Reflection on the most surprising thing learned"
                    value={reflectionAnswers.surprising}
                    onChange={e => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                    placeholder="e.g. How ragi contains 8x more calcium than wheat, or how DDT magnifies 500,000x in eagles..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="ref-explain" className="block text-xs font-semibold text-slate-300 mb-1">
                    2. How would you explain the connection between chemical fertiliser runoff and fish death to a friend?
                  </label>
                  <textarea
                    id="ref-explain"
                    rows={2}
                    aria-label="Reflection on how to explain eutrophication to a friend"
                    value={reflectionAnswers.explain}
                    onChange={e => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                    placeholder="e.g. NPK causes algae blooms that block sunlight, then bacteria consume all dissolved oxygen decomposing the dead algae..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="ref-application" className="block text-xs font-semibold text-slate-300 mb-1">
                    3. Where in real life (in your home, garden, or community) might you use these agro-ecological principles?
                  </label>
                  <textarea
                    id="ref-application"
                    rows={2}
                    aria-label="Reflection on real life application of agroecological principles"
                    value={reflectionAnswers.application}
                    onChange={e => setReflectionAnswers({ ...reflectionAnswers, application: e.target.value })}
                    placeholder="e.g. Composting organic waste, growing native medicinal plants like Tulsi and Neem, choosing millets..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-indigo-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Misconception Tracking */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                  <span>⚠️</span> Identified Misconception Profile:
                </h4>
                <div className="space-y-2.5">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-xs text-rose-300 font-bold">✗ {m.misconception}</p>
                        <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real-World Activity */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span>🌱</span> {REAL_WORLD_ACTIVITY.title}
              </h4>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <ol className="space-y-1.5 text-xs text-slate-400 list-decimal list-inside">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PLATFORM OVERLAYS & FEEDBACK ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_EVSDomesticatedBiodiversityNativeSim;