'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERALS (MANDATORY) ───
const NODE_C10_EVS_001 = 'c10_evs_001';
const NODE_C10_EVS_002 = 'c10_evs_002';
const NODE_C10_EVS_003 = 'c10_evs_003';
const NODE_C10_EVS_004 = 'c10_evs_004';
const NODE_C10_EVS_005 = 'c10_evs_005';
const NODE_C10_EVS_006 = 'c10_evs_006';
const NODE_C10_EVS_007 = 'c10_evs_007';
const NODE_C10_EVS_008 = 'c10_evs_008';
const NODE_C10_EVS_009 = 'c10_evs_009';
const NODE_C10_EVS_010 = 'c10_evs_010';

const ALL_NODE_IDS = [
  NODE_C10_EVS_001,
  NODE_C10_EVS_002,
  NODE_C10_EVS_003,
  NODE_C10_EVS_004,
  NODE_C10_EVS_005,
  NODE_C10_EVS_006,
  NODE_C10_EVS_007,
  NODE_C10_EVS_008,
  NODE_C10_EVS_009,
  NODE_C10_EVS_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Eco-System Guardians: The Himalayan & Coastal Crisis',
  intro: 'A fragile biosphere reserve in the Western Ghats and a coastal delta in the Sundarbans face compounding climate shocks, industrial effluent discharges, and rapid deforestation. As Chief Environmental Systems Officer, you must uncover underlying drivers, trace positive feedback loops, enforce constitutional rights, mobilize communities, and engineer climate-resilient solutions.',
  context: 'The region is balancing endangered biodiversity (Lion-tailed Macaques, River Dolphins), industrial power generation, indigenous farming communities, and intensifying cyclone hazards.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When Arctic and Himalayan glaciers melt due to warming, why does global warming accelerate even faster rather than slowing down?',
  options: [
    'Meltwater reflects 95% more incoming sunlight back into space',
    'Darker exposed water and soil absorb 94% of solar heat instead of reflecting it like white ice (ice-albedo feedback)',
    'Glacial melt consumes atmospheric nitrogen, destroying the ozone layer directly',
    'Melting ice compresses ambient air pressure, turning sunlight into thermal electricity',
  ],
  correctIndex: 1,
  hintAfter: 'Ice acts like a giant white mirror. When it melts, dark surfaces absorb sunlight and trigger a reinforcing feedback loop! Let us explore the mechanics.',
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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced across 10 syllabus nodes) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Feedback loops (c10_evs_001) - Recall
  {
    id: 'ch_evs_001',
    nodeId: NODE_C10_EVS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In environmental systems science, what defines a "positive feedback loop"?',
    options: [
      'A beneficial process that stabilizes and restores ecological balance',
      'A circular process that amplifies the initial change in the same direction, driving the system further from equilibrium',
      'An environmental government policy that offers financial incentives to industries',
      'A negative disturbance that immediately halts atmospheric warming',
    ],
    correctIndex: 1,
    explanation: 'In systems terminology, "positive" means reinforcing or amplifying the change (such as ice-albedo or permafrost-methane release). "Negative" feedback counteracts and stabilizes.',
    hints: [
      'Do not confuse "positive" with moral goodness or ecological health.',
      'Think of microphone audio feedback: a small sound gets amplified louder and louder.',
      'Positive loops reinforce and multiply the original change in the same direction.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation: Bioaccumulation vs Biomagnification (c10_evs_002) - Understanding
  {
    id: 'ch_evs_002',
    nodeId: NODE_C10_EVS_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does the apex predator (Indian River Dolphin) carry the highest concentration of toxic mercury compared to phytoplankton in the Ganga?',
    options: [
      'Dolphins absorb mercury directly through their skin from the air',
      'Biomagnification causes non-biodegradable persistent toxins to multiply in concentration at each ascending trophic level',
      'Phytoplankton actively excrete mercury, keeping the base of the food chain completely sterile',
      'Mercury only dissolves in mammals and does not exist in small fish tissues',
    ],
    correctIndex: 1,
    explanation: 'Bioaccumulation happens within a single organism over its lifespan. Biomagnification occurs across food chains: each dolphin consumes thousands of fish, concentrating the toxic load at the apex.',
    hints: [
      'Consider the difference between accumulating toxins in one body vs multiplying across trophic levels.',
      'Small fish eat huge quantities of contaminated algae; large dolphins eat thousands of small fish.',
      'Biomagnification causes exponential toxin concentration as you climb up the food chain.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation: Drag-Label Biosphere Reserve Zonation (c10_evs_007) - Understanding
  {
    id: 'ch_evs_003',
    nodeId: NODE_C10_EVS_007,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct biosphere reserve zone label to its matching functional description.',
    dragItems: [
      { label: 'Core Zone', targetId: 'zone_core' },
      { label: 'Buffer Zone', targetId: 'zone_buffer' },
      { label: 'Transition Zone', targetId: 'zone_transition' },
    ],
    correctMapping: {
      zone_core: 'Core Zone',
      zone_buffer: 'Buffer Zone',
      zone_transition: 'Transition Zone',
    },
    explanation: 'Core Zone is strictly protected with zero human disturbance. Buffer Zone permits research and limited eco-tourism. Transition Zone fosters sustainable agriculture and community livelihoods (e.g. Nilgiri Biosphere Reserve).',
    hints: [
      'The inner sanctum with no logging or human activity is the innermost area.',
      'The intermediate ring allows controlled research and eco-tourism.',
      'The outermost fringe involves human settlements, sustainable farming, and cooperation.',
    ],
    misconceptionIndex: 4,
  },
  // 4. Foundation: Environmental Acts chronology (c10_evs_005) - Recall
  {
    id: 'ch_evs_004',
    nodeId: NODE_C10_EVS_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which was India\'s FIRST major modern environmental legislation, enacted even before the umbrella Environment (Protection) Act of 1986?',
    options: [
      'Water (Prevention and Control of Pollution) Act, 1974',
      'Air (Prevention and Control of Pollution) Act, 1981',
      'Biological Diversity Act, 2002',
      'National Green Tribunal Act, 2010',
    ],
    correctIndex: 0,
    explanation: 'The Water Act was passed in 1974, establishing the Central and State Pollution Control Boards. The Air Act followed in 1981, and the EPA was enacted in 1986 following the Bhopal Gas Tragedy.',
    hints: [
      'Think of the chronological sequence: Water (1974) → Air (1981) → EPA (1986).',
      'This 1974 statute first mandated Effluent Treatment Plants and established the CPCB.',
      'The Water Act, 1974 was the foundational environmental statute.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation: In-situ vs Ex-situ (c10_evs_007) - Classify
  {
    id: 'ch_evs_005',
    nodeId: NODE_C10_EVS_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an example of EX-SITU genetic conservation?',
    options: [
      'Kaziranga National Park in Assam',
      'National Bureau of Plant Genetic Resources (NBPGR) Cryogenic Seed Bank, New Delhi',
      'Mawphlang Sacred Grove in Meghalaya',
      'Periyar Wildlife Sanctuary in Kerala',
    ],
    correctIndex: 1,
    explanation: 'Ex-situ means "off-site" outside natural habitats (seed banks, cryopreservation, botanical gardens, zoos). National parks, sanctuaries, and sacred groves are in-situ.',
    hints: [
      'In-situ protects organisms inside their natural habitats.',
      'Ex-situ stores genetic samples or living collections in artificial vaults or research facilities.',
      'NBPGR preserves seeds in liquid nitrogen at -196°C in New Delhi.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation: Article 21 & Supreme Court Judgments (c10_evs_004) - Understanding
  {
    id: 'ch_evs_006',
    nodeId: NODE_C10_EVS_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Subhash Kumar v. State of Bihar (1991), how did the Supreme Court expand the scope of Article 21?',
    options: [
      'By declaring commercial logging a fundamental right of private corporations',
      'By interpreting the "Right to Life" to include the fundamental right to enjoy pollution-free water and clean air',
      'By abolishing the National Green Tribunal and all State Pollution Control Boards',
      'By restricting citizens from filing Public Interest Litigations (PIL) on environmental matters',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court ruled that Article 21 guarantees a dignified human existence, which is impossible in a polluted environment, granting citizens the right to petition under PIL for clean air and water.',
    hints: [
      'Article 21 guarantees the Right to Life and Personal Liberty.',
      'Does "life" mean bare animal survival, or a dignified existence in a healthy environment?',
      'The court recognized pollution-free water and air as integral to the constitutional right to life.',
    ],
    misconceptionIndex: 2,
  },
  // 7. Foundation: Scuba Rice & Submergence (c10_evs_010) - Application
  {
    id: 'ch_evs_010',
    nodeId: NODE_C10_EVS_010,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Normal paddy drowns after 3-4 days of flooding. How many MAXIMUM days can IRRI-developed "Scuba Rice" (carrying the SUB1A gene) survive completely submerged underwater in floodwaters?',
    correctAnswer: 14,
    tolerance: 1,
    unit: 'days',
    explanation: 'Scuba rice carries the SUB1A gene which halts elongation during complete submergence, allowing it to survive up to 14 days (2 full weeks) underwater and resume photosynthesis once waters recede.',
    hints: [
      'Think of a two-week period in flood-prone districts of Odisha and Bihar.',
      'It survives approximately 2 weeks (14 days).',
      'Enter the number of days corresponding to two full weeks: 14.',
    ],
  },
  // 8. Standard: Energy Efficiency Calculation (c10_evs_009) - Application
  {
    id: 'ch_evs_008',
    nodeId: NODE_C10_EVS_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A household replaces five 60W incandescent bulbs with five 9W BEE-rated LED bulbs that provide equal luminance. What is the total reduction in power demand in Watts?',
    correctAnswer: 255,
    tolerance: 0,
    unit: 'Watts',
    explanation: 'Initial power = 5 × 60W = 300W. New power = 5 × 9W = 45W. Power saved = 300W - 45W = 255W (an 85% energy demand reduction, cutting coal emissions at thermal plants).',
    hints: [
      'Calculate total initial wattage: 5 × 60W.',
      'Calculate total new LED wattage: 5 × 9W.',
      'Subtract new wattage from initial wattage: 300 - 45 = 255 Watts.',
    ],
  },
  // 9. Standard: Drag-Sort Trophic Cascade (c10_evs_002) - Analysis
  {
    id: 'ch_evs_009',
    nodeId: NODE_C10_EVS_002,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of a trophic cascade triggered by the collapse of a marine keystone species (Sea Otter):',
    sortItems: [
      'Sea otter population plummets due to coastal pollution or overharvesting',
      'Herbivorous sea urchin population explodes without predation pressure',
      'Sea urchins overgraze and decimate dense kelp forest root holdfasts',
      'Structural collapse of kelp ecosystem causes extinction of hundreds of shelter-dependent fish and invertebrates',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Loss of apex/keystone predator (Otter) → herbivore explosion (Urchins) → habitat destruction (Kelp loss) → entire community collapse. This illustrates the irreplaceable architectural role of keystone species.',
    hints: [
      'Start with the decline of the keystone predator at the top.',
      'Next, observe what happens to their primary prey when unchecked.',
      'Finally, trace how prey overconsumption destroys the habitat and dependent species.',
    ],
  },
  // 10. Standard: Proximate Cause vs Underlying Driver (c10_evs_001) - Analysis
  {
    id: 'ch_evs_011',
    nodeId: NODE_C10_EVS_001,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In large-scale deforestation in the Western Ghats for monoculture plantations, which correctly distinguishes the PROXIMATE CAUSE from the UNDERLYING DRIVER?',
    options: [
      'Proximate cause: Tree felling with chainsaws; Underlying driver: Global commercial demand for palm oil, rubber, and timber export profits',
      'Proximate cause: Global market demand; Underlying driver: Tree felling with chainsaws',
      'Proximate cause: Acid rain; Underlying driver: Ice-albedo feedback',
      'Proximate cause: Earthquakes; Underlying driver: Soil erosion',
    ],
    correctIndex: 0,
    explanation: 'The proximate cause is the immediate physical action (chainsaw felling). The underlying driver is the systemic economic/social pressure (lucrative commercial plantation cash-crop demand). CISCE exams mandate separating both.',
    hints: [
      'Proximate = immediate, direct mechanical action.',
      'Underlying driver = deep socio-economic forces making the activity profitable.',
      'Chainsaw logging is proximate; commercial market profit demand is underlying.',
    ],
  },
  // 11. Standard: Construct Ecosystem Regime Shift (c10_evs_003) - Application
  {
    id: 'ch_evs_012',
    nodeId: NODE_C10_EVS_003,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the correct causal chain for Lake Eutrophication flipping into a turbid regime shift by assembling the key steps:',
    availableParts: [
      'Excess agricultural fertilizer runoff (N & P)',
      'Dense algal bloom blocks sunlight',
      'Submerged aquatic vegetation dies',
      'Decomposers deplete dissolved oxygen (hypoxia)',
      'Massive fish asphyxiation & turbid dead zone',
    ],
    targetState: 'Excess agricultural fertilizer runoff (N & P) Dense algal bloom blocks sunlight Submerged aquatic vegetation dies Decomposers deplete dissolved oxygen (hypoxia) Massive fish asphyxiation & turbid dead zone',
    validationHint: 'Add the parts in sequence: Runoff → Algal bloom → Light blocked → Oxygen depletion → Fish suffocation.',
    explanation: 'Nutrient loading crosses an ecological threshold, causing algal bloom, sunlight deprivation, plant rot, bacteriological oxygen depletion, and widespread fish kills — shifting the lake into an irreversible turbid state.',
    hints: [
      'Step 1 begins with fertilizer nutrient runoff entering the lake.',
      'Step 2 is the rapid bloom of surface algae that shades sunlight.',
      'Steps 3, 4, 5 trace plant death, oxygen collapse, and fish suffocation.',
    ],
  },
  // 12. Standard: Vellore Citizens Case Principles (c10_evs_004) - Understanding
  {
    id: 'ch_evs_013',
    nodeId: NODE_C10_EVS_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Vellore Citizens Welfare Forum v. Union of India (1996), which two foundational principles of international environmental law were formally incorporated into Indian jurisprudence?',
    options: [
      'Laissez-faire doctrine and Absolute Sovereign Immunity',
      'Precautionary Principle and Polluter Pays Principle',
      'Doctrine of Eminent Domain and Industrial Exemption Clause',
      'Strict Carbon Quota and Mandatory Nuclear Transition',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court ruled that under Article 21, the Precautionary Principle (anticipating environmental harm even before complete scientific certainty) and Polluter Pays Principle (polluters bear remediation and compensation costs) are part of Indian law.',
    hints: [
      'One principle demands action before full scientific certainty.',
      'The other mandates that industries must pay for clean-up and damages.',
      'Precautionary Principle + Polluter Pays Principle.',
    ],
  },
  // 13. Standard: People\'s Movements - Chipko vs Appiko (c10_evs_008) - Distinguish
  {
    id: 'ch_evs_014',
    nodeId: NODE_C10_EVS_008,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the historic grassroots anti-felling movement with its correct geographic region, year, and key leader:',
    options: [
      'Appiko Movement: Chamoli (Uttarakhand), 1973, Gaura Devi & Sunderlal Bahuguna',
      'Chipko Movement: Chamoli (Uttarakhand), 1973, Gaura Devi & Sunderlal Bahuguna; Appiko Movement: Uttara Kannada (Karnataka), 1983, Pandurang Hegde',
      'Chipko Movement: Silent Valley (Kerala), 1983, Medha Patkar',
      'Appiko Movement: Narmada Valley (Gujarat), 1973, Baba Amte',
    ],
    correctIndex: 1,
    explanation: 'Chipko began in 1973 in Garhwal Himalayas (Uttarakhand) leading to a 15-year green-felling ban. Appiko was its southern counterpart in 1983 in Salkani, Uttara Kannada (Western Ghats), led by Pandurang Hegde.',
    hints: [
      'Chipko started in northern Himalayas (Uttarakhand) in 1973.',
      'Appiko (meaning "to hug" in Kannada) started in 1983 in Karnataka.',
      'Chipko: Gaura Devi / Bahuguna (1973); Appiko: Pandurang Hegde (1983).',
    ],
  },
  // 14. Standard: Johads & Waterman of India (c10_evs_006) - Application
  {
    id: 'ch_evs_006',
    nodeId: NODE_C10_EVS_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did Rajendra Singh and Tarun Bharat Sangh revive the dried-up Arvari River in arid Alwar, Rajasthan?',
    options: [
      'By constructing massive multi-purpose concrete mega-dams across the river basin',
      'By mobilizing village communities to build thousands of "johads" (traditional crescent earthen rainwater check structures) that recharged groundwater aquifers',
      'By cloud-seeding chemical silver iodide over the desert fringe during winter',
      'By piping industrial wastewater from Delhi directly into the dry riverbed',
    ],
    correctIndex: 1,
    explanation: 'Tarun Bharat Sangh mobilized villagers to build thousands of indigenous earthen check dams (johads). These trapped monsoon runoff, allowing percolation that raised the water table and revived dead perennial rivers.',
    hints: [
      'Johads are decentralized, traditional earthen rainwater harvesting structures.',
      'They slow runoff, letting water soak into deep underground aquifers.',
      'The raised water table enabled the Arvari River to flow perennially again.',
    ],
  },
  // 15. Standard: Paris Agreement NDC Targets (c10_evs_009) - Recall
  {
    id: 'ch_evs_016',
    nodeId: NODE_C10_EVS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'Under its updated Paris Agreement Nationally Determined Contributions (NDCs), what is India\'s official target for emissions intensity reduction of its GDP by 2030 (compared to 2005 levels)?',
    options: [
      '15% reduction',
      '45% reduction',
      '80% reduction',
      '100% net-zero emissions by 2030',
    ],
    correctIndex: 1,
    explanation: 'India\'s updated NDCs commit to reducing emissions intensity of GDP by 45% by 2030 from 2005 levels, achieving ~50% non-fossil electric power capacity, and creating 2.5-3 billion tonnes CO2e forest sink.',
    hints: [
      'It is an ambitious target between 40% and 50%.',
      'The exact updated figure pledged is 45%.',
      'Select 45% reduction.',
    ],
  },
  // 16. Advanced: Evaluating Joint Forest Management (c10_evs_008) - Evaluation
  {
    id: 'ch_evs_017',
    nodeId: NODE_C10_EVS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why Joint Forest Management (JFM, 1988) at Arabari (West Bengal) succeeded where top-down exclusionary policing of forests failed:',
    options: [
      'JFM transferred 100% legal land ownership and timber export rights to multinational logging corporations',
      'JFM aligned local survival incentives with conservation by granting village committees co-management rights and a ~25% legitimate usufruct share of forest produce and timber proceeds',
      'JFM replaced natural sal forests with high-speed eucalyptus clones requiring zero water or monitoring',
      'JFM permanently evicted all indigenous villagers, establishing an armed perimeter around the reserve',
    ],
    correctIndex: 1,
    explanation: 'Top-down policing creates hostile conflicts and illicit logging. Arabari proved that when villagers receive legitimate stakes (~25% produce/timber share) in return for protection, social vigilance ensures sustainable forest regeneration.',
    hints: [
      'Consider the alignment of local economic survival with long-term ecological health.',
      'Exclusion alienates communities; co-management with a legitimate produce share fosters ownership.',
      'Villagers co-manage and receive ~25% share of forest produce in return for protecting the forest.',
    ],
  },
  // 17. Advanced: Uttarakhand 2013 Disaster Cascading Analysis (c10_evs_003) - Analysis
  {
    id: 'ch_evs_018',
    nodeId: NODE_C10_EVS_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyzing the catastrophic 2013 Uttarakhand disaster through environmental systems thinking, which statement correctly identifies the compound crisis interaction?',
    options: [
      'The disaster was purely a meteorological event of cloudburst rainfall with zero human or ecological influence',
      'Climate-intensified extreme rainfall interacted with slope vulnerability caused by deforestation and unscientific infrastructure, where loss of root-binding caused cascading landslides and debris-dam bursts',
      'The disaster was solely triggered by an underground earthquake in the Arabian Sea',
      'Ozone layer depletion directly melted all Himalayan granite boulders into liquid lava',
    ],
    correctIndex: 1,
    explanation: 'The disaster was a compound crisis: climate change caused intense cloudburst precipitation, while biodiversity loss/deforestation removed the biological root-binding that stabilized steep Himalayan slopes, creating massive debris avalanches.',
    hints: [
      'Look for the synergy of two planetary crises: climate extreme + deforestation.',
      'Without tree roots, saturated topsoil slides down steep slopes into swollen rivers.',
      'Compounding factors: extreme precipitation + deforested unstable slopes.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced: Biodiversity Management Committees (c10_evs_008) - Application
  {
    id: 'ch_evs_019',
    nodeId: NODE_C10_EVS_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the Biological Diversity Act 2002, what is the primary statutory function of a local Biodiversity Management Committee (BMC) at the Panchayat level?',
    options: [
      'To auction local forest land to private real estate developers',
      'To prepare the comprehensive People\'s Biodiversity Register (PBR) documenting local bio-resources and indigenous traditional knowledge, and regulate commercial access',
      'To shut down all agricultural activities in the district permanently',
      'To operate coal-fired power stations for municipal street lighting',
    ],
    correctIndex: 1,
    explanation: 'BMCs are grassroots statutory bodies under the 2002 Act tasked with compiling People\'s Biodiversity Registers (PBRs) to document flora, fauna, and traditional knowledge, ensuring equitable benefit sharing from commercial bio-prospecting.',
    hints: [
      'Think of documenting indigenous ecological knowledge and local plant varieties.',
      'PBR stands for People\'s Biodiversity Register.',
      'BMCs document bio-resources in PBRs and safeguard community rights over traditional knowledge.',
    ],
  },
  // 19. Advanced: Adaptation vs Mitigation Strategy Classification (c10_evs_010) - Analysis
  {
    id: 'ch_evs_020',
    nodeId: NODE_C10_EVS_010,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Classify each climate action into Climate MITIGATION (tackling causes/emissions) vs Climate ADAPTATION (reducing vulnerability to locked-in impacts):',
    dragItems: [
      { label: 'Bhadla 2245 MW Solar Park', targetId: 'cat_mitigation' },
      { label: 'Sundarbans Mangrove Bio-Shield Restoration', targetId: 'cat_adaptation' },
    ],
    correctMapping: {
      cat_mitigation: 'Bhadla 2245 MW Solar Park',
      cat_adaptation: 'Sundarbans Mangrove Bio-Shield Restoration',
    },
    explanation: 'Solar power replaces fossil fuel burning (mitigation: cutting emissions at source). Mangrove belts absorb cyclone wave energy and storm surges (adaptation: protecting human lives and shorelines from locked-in climate impacts).',
    hints: [
      'Mitigation attacks the root cause: greenhouse gas emissions.',
      'Adaptation manages the consequences: wave buffering, flood resilience, heat tolerance.',
      'Solar = Mitigation; Mangrove storm-surge buffer = Adaptation.',
    ],
  },
  // 20. Advanced: Regulatory Capture in SPCBs (c10_evs_005) - Evaluation
  {
    id: 'ch_evs_021',
    nodeId: NODE_C10_EVS_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In industrial clusters like Vapi and Ankleshwar, what governance failure is described by "Regulatory Capture", and how can it be remedied?',
    options: [
      'Physical trapping of smoke particles using electrostatic precipitators; remedied by taller chimneys',
      'A systemic failure where regulatory enforcement officials become overly aligned with the polluting industries they oversee; remedied by public real-time continuous online effluent monitoring and third-party NGT oversight',
      'Complete nationalization of private factories by the military',
      'Banning the use of water in all chemical manufacturing processes',
    ],
    correctIndex: 1,
    explanation: 'Regulatory capture occurs when enforcing bodies overlook violations due to commercial proximity, political pressure, or conflicts of interest. Mandatory real-time online emission telemetry and transparent judicial oversight break this closed loop.',
    hints: [
      'Regulatory capture is an institutional governance conflict, not a physical filter.',
      'It happens when inspectors become too friendly or compromised by industrial management.',
      'Transparent real-time online data streaming to the public prevents inspectors from concealing violations.',
    ],
    misconceptionIndex: 3,
  },
  // 21. Advanced: Construct Coastal Adaptation Defense (c10_evs_010) - Creativity
  {
    id: 'ch_evs_022',
    nodeId: NODE_C10_EVS_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 4 essential integrated pillars for an Odisha coastal cyclone community resilience plan:',
    availableParts: [
      'IMD satellite Doppler early warning siren network',
      'Raised reinforced cyclone shelters on stilts',
      'Trained village youth volunteer rescue corps',
      '200m dense Avicennia & Rhizophora mangrove wave-break bio-shield',
    ],
    targetState: 'IMD satellite Doppler early warning siren network Raised reinforced cyclone shelters on stilts Trained village youth volunteer rescue corps 200m dense Avicennia & Rhizophora mangrove wave-break bio-shield',
    validationHint: 'Select all 4 layered defenses: Early Warning → Elevated Shelters → Volunteer First Responders → Mangrove Bio-Shield.',
    explanation: 'A resilient coastal defense layers technological warning (Doppler alerts), engineered refuge (shelters), human readiness (trained volunteers), and nature-based buffers (mangrove bio-shield) to minimize storm surge mortality.',
    hints: [
      'Include the technology for advance cyclone detection and sirens.',
      'Include the physical safe refuge buildings above storm-surge level.',
      'Include trained local volunteers and natural wave-absorbing mangrove barriers.',
    ],
  },
  // 22. Advanced: Indicator Species Diagnostics (c10_evs_002) - Application
  {
    id: 'ch_evs_023',
    nodeId: NODE_C10_EVS_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A stream biological survey reveals high populations of Tubifex worms and Chironomid larvae, but zero Mayfly or Stonefly nymphs. What ecological conclusion must be drawn?',
    options: [
      'The stream has exceptionally high dissolved oxygen and pristine mountain water quality',
      'The stream suffers severe organic pollution and hypoxia (low dissolved oxygen), as sensitive indicator nymphs have perished while tolerant species thrive',
      'The water contains high radioactive radon gas that feeds Mayflies exclusively',
      'The stream has completely dried up and turned into a terrestrial desert',
    ],
    correctIndex: 1,
    explanation: 'Mayfly and stonefly nymphs are pollution-sensitive indicator species requiring high dissolved oxygen (>6 mg/L). Tubifex and chironomids tolerate severe hypoxia and sludge, indicating high organic pollution.',
    hints: [
      'Mayflies and stoneflies are delicate canaries for clean, high-oxygen streams.',
      'Tubifex worms thrive in stagnant, oxygen-starved organic sewage sludge.',
      'Presence of only tolerant species indicates severe organic pollution and hypoxia.',
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
  nodeId: NODE_C10_EVS_001,
  title: 'Environmental Systems, Rights & Community Resilience',
  definition: 'Environmental systems function through interconnected cause-and-effect drivers and feedback loops. Under Article 21, citizens possess the enforceable right to a clean environment, operationalized by statutory laws, community stewardship, in-situ/ex-situ genetic preservation, and climate mitigation-adaptation strategies.',
  eli5: 'Think of Earth as an interconnected living web: when one thread is pulled, the whole net vibrates. Positive feedback loops amplify changes like a microphone near a speaker, while human rights, laws, community tree-hugging, solar power, and resilient mangrove bio-shields protect our shared future.',
  misconceptions: [
    {
      misconception: 'Positive feedback loops are always "good" or beneficial for nature.',
      correction: 'In systems science, "positive" means self-reinforcing and amplifying the change in the same direction (e.g., ice melt → lower albedo → more warming → more melt). Negative feedbacks stabilize systems.',
    },
    {
      misconception: 'Bioaccumulation and biomagnification are identical terms.',
      correction: 'Bioaccumulation is the buildup of a toxin inside a single organism over time. Biomagnification is the exponential increase in toxin concentration at successively higher trophic levels up the food chain.',
    },
    {
      misconception: 'The 2013 Uttarakhand flood disaster was caused solely by natural climate cloudbursts.',
      correction: 'It was a compound socio-ecological catastrophe: extreme rainfall combined with anthropogenic deforestation and steep slope destabilization that stripped root-binding, causing massive landslides.',
    },
    {
      misconception: 'The Environment (Protection) Act 1986 was India\'s first environmental statute.',
      correction: 'The Water (Prevention and Control of Pollution) Act of 1974 preceded the EPA by 12 years and created the CPCB and SPCBs. The EPA was enacted in 1986 following the Bhopal disaster.',
    },
    {
      misconception: 'Biosphere reserve core zones allow eco-tourism and road construction.',
      correction: 'Core zones are strictly protected strictly for biodiversity and natural processes with zero human activity. Eco-tourism and research are permitted only in the surrounding buffer zone.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is the primary difference between positive and negative feedback loops?',
      options: ['Positive amplifies change; Negative counteracts and stabilizes', 'Positive helps animals; Negative harms them', 'Positive only occurs in summer; Negative in winter', 'Positive is human-made; Negative is natural'],
      correctIndex: 0,
    },
    {
      question: 'Which constitutional article was judicially expanded to include the right to a clean environment?',
      options: ['Article 14', 'Article 19', 'Article 21', 'Article 370'],
      correctIndex: 2,
    },
    {
      question: 'What is the function of the SUB1A gene in IRRI\'s Scuba Rice?',
      options: ['Triples water requirement', 'Allows survival for up to 14 days under submerged floodwater', 'Repels all insect pests with chemical poison', 'Turns grain bright red'],
      correctIndex: 1,
    },
    {
      question: 'Which community movement in Uttarakhand (1973) used non-violent tree-hugging to halt commercial logging?',
      options: ['Appiko Movement', 'Chipko Movement', 'Narmada Bachao Andolan', 'Silent Valley Campaign'],
      correctIndex: 1,
    },
    {
      question: 'How do intact mangrove forests in the Sundarbans protect coastal communities during cyclones?',
      options: ['They warm ocean waters to dissolve the cyclone', 'Their dense root systems act as a natural bio-shield, absorbing wave kinetic energy and reducing storm-surge height', 'They emit electromagnetic radio signals that divert cyclone paths', 'They produce industrial plastic barriers'],
      correctIndex: 1,
    },
    {
      question: 'Which regulatory mechanism requires industries to treat toxic wastewater before discharging it into rivers?',
      options: ['Electrostatic Precipitator', 'Effluent Treatment Plant (ETP)', 'BEE Star Rating', 'People\'s Biodiversity Register'],
      correctIndex: 1,
    },
    {
      question: 'What percentage of forest produce/timber proceeds is typically shared with local communities under Joint Forest Management (JFM)?',
      options: ['0%', 'Approximately 25%', '100%', '5%'],
      correctIndex: 1,
    },
    {
      question: 'What is the function of a cryogenic seed bank like NBPGR New Delhi?',
      options: ['In-situ wildlife breeding', 'Ex-situ conservation of plant germplasm at ultra-low temperatures (-196°C)', 'Commercial grain milling for export', 'Incineration of agricultural weeds'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery is achieved when a student demonstrates deep systems comprehension of environmental feedback loops, trophic cascades, regime shifts, constitutional Article 21 jurisprudence, and concrete climate mitigation and adaptation strategies.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG PATTERN) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Systems Engine: Ice-Albedo Positive Feedback Loop',
    instruction: 'Drag the Global Temperature slider upwards. Watch how Arctic ice shrinks, surface reflectivity (albedo) collapses, and solar heat absorption multiplies in a reinforcing loop!',
    interactionType: 'slider-feedback-loop',
    nodeId: NODE_C10_EVS_001,
  },
  {
    title: '2. Trophic Cascade & Bioaccumulation Food Chain',
    instruction: 'Toggle Industrial Mercury Discharges and observe bioaccumulation multiplying up trophic levels to the apex Indian River Dolphin!',
    interactionType: 'trophic-cascade',
    nodeId: NODE_C10_EVS_002,
  },
  {
    title: '3. Lake Resilience & Eutrophication Regime Shift',
    instruction: 'Increase Agricultural Fertilizer Runoff (Nitrogen & Phosphorus) past the ecological threshold of 65 mg/L to trigger an irreversible turbid bloom collapse!',
    interactionType: 'regime-shift',
    nodeId: NODE_C10_EVS_003,
  },
  {
    title: '4. Constitutional Pillars & Legal Framework Explorer',
    instruction: 'Click on the 3 Constitutional Pillars (Article 21 Right, Article 48A State Directive, Article 51A(g) Citizen Duty) and inspect their legal enforcement teeth.',
    interactionType: 'constitutional-explorer',
    nodeId: NODE_C10_EVS_004,
  },
  {
    title: '5. Climate Action Matrix: Mitigation vs Adaptation Lab',
    instruction: 'Adjust Renewable Energy Generation (Solar/Wind) to cut power-plant emissions and deploy Mangrove Bio-Shields to defend coastal villages from cyclone waves.',
    interactionType: 'climate-matrix',
    nodeId: NODE_C10_EVS_009,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If global warming raises Arctic ocean temperatures by 2°C, what will happen to the planetary albedo (reflectivity) and solar heat absorption?',
    options: [
      'Albedo will increase from 6% to 90%, reflecting more heat to space',
      'White reflective ice (80% albedo) will melt, exposing dark ocean (6% albedo) which absorbs 94% of solar radiation, triggering accelerated warming',
      'No change; water and ice absorb identical solar wavelengths',
      'The ocean will freeze instantly into solid diamond',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the temperature slider above +1.5°C in the visualization to observe the dark open-water solar absorption surge!',
    nodeId: NODE_C10_EVS_001,
  },
  {
    question: 'Prediction: If agricultural fertilizer runoff entering a clear freshwater lake exceeds the 65 mg/L threshold, what will happen to dissolved oxygen levels?',
    options: [
      'Dissolved oxygen will rise to 200% as algae release pure oxygen to fish',
      'Algal blooms will block light, submerged plants will die, and decomposing bacteria will consume virtually all dissolved oxygen, creating a hypoxic dead zone',
      'Fish will grow lungs and walk onto land',
      'Water will turn into distilled pure spring water',
    ],
    correctIndex: 1,
    verifyInstruction: 'Push the fertilizer runoff slider past 65 mg/L to verify the hypoxia collapse on the real-time oxygen meter!',
    nodeId: NODE_C10_EVS_003,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the rate of temperature rise once Arctic ice cover falls below 30%?',
    observableOptions: [
      'The temperature rise levels off and completely stabilizes',
      'The temperature rise accelerates sharply because lower albedo absorbs far more solar energy (positive feedback)',
      'The entire ocean turns into vapor instantly',
      'Ice begins to freeze spontaneously',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_EVS_001,
  },
  {
    question: 'What pattern do you notice regarding mercury concentration across the food chain in the bioaccumulation simulator?',
    observableOptions: [
      'Phytoplankton have the highest concentration because they are at the base',
      'Every ascending trophic level multiplies the toxic concentration, making the apex dolphin the most severely contaminated (biomagnification)',
      'Toxin concentrations remain constant at 5 ppm for all species',
      'Predators are completely immune to chemical contaminants',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_EVS_002,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Environmental Officer Capstone: District Resilience Masterplan',
  description: 'Design a comprehensive Environmental Action Plan for an Indian district containing a vulnerable river basin, coastal fishing villages, and an industrial chemical corridor.',
  steps: [
    'Audit the industrial cluster: Mandate real-time online CPCB telemetry and operational Effluent Treatment Plants (ETPs) under the Water Act 1974.',
    'Form Village Biodiversity Management Committees (BMCs) to register endemic flora/fauna in the People\'s Biodiversity Register.',
    'Implement In-situ & Ex-situ reserves: Establish a zoned Biosphere Reserve in the catchment hills and partner with NBPGR for seed cryopreservation.',
    'Deploy Climate Resilience: Plant a 200-meter coastal mangrove bio-shield in the delta, distribute Scuba rice (SUB1A) to flood-prone farmers, and install 50 MW rooftop solar panels.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function C10_EVSCauseEffectRelationsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_EVS_001,
  title = DEFAULT_PROPS.title || 'Environmental Systems, Rights & Community Resilience',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STREAM CONFIGURATION ───
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // ─── 40+ STATE VARIABLES (MANDATORY BRILLIANT & SIMULATION RICHNESS) ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery & Exploration Hooks
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulator Variable States
  const [globalTempDelta, setGlobalTempDelta] = useState(1.1); // °C above pre-industrial
  const [iceCoverage, setIceCoverage] = useState(68); // %
  const [solarAbsorption, setSolarAbsorption] = useState(35); // %
  const [industrialDischarge, setIndustrialDischarge] = useState(true);
  const [fertilizerRunoff, setFertilizerRunoff] = useState(30); // mg/L
  const [dissolvedOxygen, setDissolvedOxygen] = useState(8.2); // mg/L
  const [lakeRegime, setLakeRegime] = useState<'clear' | 'turbid'>('clear');
  const [selectedPillar, setSelectedPillar] = useState<'art21' | 'art48a' | 'art51a' | null>('art21');
  const [solarCapacityMW, setSolarCapacityMW] = useState(120);
  const [mangroveBufferMeters, setMangroveBufferMeters] = useState(50);
  const [stormWaveEnergy, setStormWaveEnergy] = useState(85); // % reaching shore
  const [carbonSavedTonnes, setCarbonSavedTonnes] = useState(15600);

  // Interactive Challenges States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Animation & Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'sim' | 'data' | 'insights'>('sim');

  // Sandbox Free Play State
  const [sandboxCo2EmissionPPM, setSandboxCo2EmissionPPM] = useState(420);
  const [sandboxRenewablePercent, setSandboxRenewablePercent] = useState(30);
  const [sandboxTreeCoverMha, setSandboxTreeCoverMha] = useState(72);
  const [sandboxEcosystemHealthScore, setSandboxEcosystemHealthScore] = useState(65);

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // ─── BKT ADAPTIVE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 1. EFFECT: LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── 2. EFFECT: BKT ADAPTIVE MASTERY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 3. EFFECT: REAL-TIME FEEDBACK LOOP DYNAMICS ───
  useEffect(() => {
    // Albedo model: As temp delta increases, ice melts non-linearly
    const remainingIce = Math.max(5, Math.min(95, 85 - globalTempDelta * 22));
    setIceCoverage(Math.round(remainingIce));
    // Solar absorption: Ice reflects 80% (absorbs 20%); Water absorbs 94% (reflects 6%)
    const absorption = Math.round(((100 - remainingIce) * 0.94) + (remainingIce * 0.2));
    setSolarAbsorption(absorption);
  }, [globalTempDelta]);

  // ─── 4. EFFECT: EUTROPHICATION THRESHOLD & REGIME SHIFT ───
  useEffect(() => {
    if (fertilizerRunoff > 65) {
      setLakeRegime('turbid');
      const oxygen = Math.max(0.4, Number((8.5 - (fertilizerRunoff - 65) * 0.22).toFixed(1)));
      setDissolvedOxygen(oxygen);
    } else {
      setLakeRegime('clear');
      const oxygen = Number((9.0 - fertilizerRunoff * 0.04).toFixed(1));
      setDissolvedOxygen(oxygen);
    }
  }, [fertilizerRunoff]);

  // ─── 5. EFFECT: MANGROVE CYCLONE ATTENUATION & SOLAR SAVINGS ───
  useEffect(() => {
    // 200m mangrove reduces wave energy by up to 75%
    const energy = Math.max(15, Math.round(100 - mangroveBufferMeters * 0.38));
    setStormWaveEnergy(energy);
    // Solar carbon offset calculation (Delhi metro / Bhadla scale)
    const carbonOffset = Math.round(solarCapacityMW * 130);
    setCarbonSavedTonnes(carbonOffset);
  }, [mangroveBufferMeters, solarCapacityMW]);

  // ─── 6. EFFECT: SANDBOX FREE PLAY DYNAMICS ───
  useEffect(() => {
    const health = Math.round(
      (sandboxRenewablePercent * 0.4) +
      (sandboxTreeCoverMha * 0.5) -
      ((sandboxCo2EmissionPPM - 350) * 0.25)
    );
    setSandboxEcosystemHealthScore(Math.max(5, Math.min(100, health)));
  }, [sandboxCo2EmissionPPM, sandboxRenewablePercent, sandboxTreeCoverMha]);

  // ─── 7. EFFECT: 2D HTML CANVAS PARTICULATE & WAVE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic sine-wave water currents / atmospheric waves
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = lakeRegime === 'clear' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(234, 179, 8, 0.5)';
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 35 + Math.sin(x * 0.03 + frame * 0.05) * 8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw floating oxygen / nutrient particles
      const particleCount = lakeRegime === 'clear' ? 18 : 36;
      for (let i = 0; i < particleCount; i++) {
        const px = (i * 27 + frame * 1.2) % canvas.width;
        const py = 15 + ((i * 13 + frame * 0.8) % 50);
        ctx.beginPath();
        ctx.arc(px, py, lakeRegime === 'clear' ? 2 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = lakeRegime === 'clear' ? '#38bdf8' : '#84cc16';
        ctx.fill();
      }

      // Draw real-time status banner
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px system-ui, sans-serif';
      ctx.fillText(
        `Eco-Simulation Active • Dissolved O2: ${dissolvedOxygen} mg/L • Wave Impact: ${stormWaveEnergy}%`,
        12,
        22
      );

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [lakeRegime, dissolvedOxygen, stormWaveEnergy]);

  // ─── 8. EFFECT: INACTIVITY AUTO-HINT CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ═════════════════════════════════════════════════════════════════════════
  // 16+ MEMOIZED USECALLBACK HANDLERS (MANDATORY BENCHMARK)
  // ═════════════════════════════════════════════════════════════════════════

  // 1. Reset Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        // Trigger gentle auto-nudge
        audioManager.play('pop');
        speechManager.speak('Need a hint? Review the cause and effect loop.');
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

  // 2. Escalating Hint Progression
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
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
      speechManager.speak('Let us study the complete step-by-step scientific explanation together.');
    }
  }, [hintCount, challenge]);

  // 3. Discovery Phase Submission
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Spot on! Lower albedo from melted ice accelerates heating.');
    } else {
      audioManager.play('pop');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  // 4. Phase Transition: Discovery → Exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Guided Exploration Lab. Interact with each model to discover the science.');
  }, []);

  // 5. Phase Transition: Exploration → Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Play Sandbox. Adjust variables freely with zero grading pressure.');
  }, []);

  // 6. Phase Transition: Sandbox → Challenge
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering Adaptive Challenge Mode. Apply your knowledge to real-world scenarios!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // 7. Predict-Then-Check Predict Handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulator to verify your hypothesis.');
  }, []);

  // 8. Observation Question Answer Handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent scientific observation!');
    } else {
      audioManager.play('pop');
      speechManager.speak('Look closely at the graph and notice the accelerating slope.');
    }
  }, []);

  // 9. Drag Start Handler
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 10. Drag Drop Target Handler
  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  // 11. Sort Move Handler
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  // 12. Final Simulation Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Environmental Systems, Rights, and Community Resilience.');
  }, [errors, onComplete]);

  // 13. Master Answer Submission Handler
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string, event?: React.MouseEvent) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (event) {
        setSparklePos({ x: event.clientX, y: event.clientY });
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent analysis.');
        setShowConfetti(true);
        setShowSparkle(true);
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
        setErrors((e) => e + 1);

        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('All hints utilized. Let us review the correct scientific reasoning.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  // 14. Next Challenge Advance Handler
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // 15. Exploration Slide Navigation
  const handleNextSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide((s) => s + 1);
      audioManager.play('tap');
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  // 16. Tab Switcher Handler
  const handleTabSwitch = useCallback((tab: 'sim' | 'data' | 'insights') => {
    setActiveTab(tab);
    audioManager.play('tap');
  }, []);

  // ═════════════════════════════════════════════════════════════════════════
  // JSX RENDERING
  // ══════════════════════════════════════════════════════��══════════════════
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-900/30"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                ICSE Class 10 • {subjectConfig.name}
              </span>
              <span className="text-xs text-slate-400">Nodes c10_evs_001 – c10_evs_010</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase & Adaptive Mastery Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-950 text-gold-300 border border-gold-800"
          >
            Phase: {phase}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-gold-950/80 text-gold-300 border-gold-700'
                : 'bg-rose-950/80 text-rose-300 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 px-2 py-1 bg-slate-900 rounded-lg border border-slate-800">
            Mastery: <strong className="text-emerald-400">{masteryLevel}</strong>
          </span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-gold-950/40 to-slate-900 rounded-2xl border border-gold-900/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold uppercase tracking-wider mb-2">
              <span>🎯 Narrative Mission Briefing</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs md:text-sm text-gold-200/80 italic bg-gold-950/60 p-3 rounded-xl border border-gold-800/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          {/* Curiosity Hook Card */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-lg">❓</span>
              <h3 className="text-lg font-bold text-slate-100">Curiosity Discovery Hook: What happens when ice melts?</h3>
            </div>
            <p className="text-slate-300 text-sm">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/40'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Brilliant deduction! Dark surfaces absorb significantly more radiation.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Advance to Interactive Exploration Lab"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/30 flex items-center gap-2"
                  >
                    <span>Begin Interactive Guided Lab</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Canvas Wave Visualizer */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-md">
            <canvas ref={canvasRef} width={800} height={60} className="w-full block bg-slate-900" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              {/* Step Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-lg md:text-xl font-bold text-emerald-400 flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              <p className="text-sm md:text-base text-amber-300 font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-900/40">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── INTERACTIVE VISUALIZATION AREA (STATE-DRIVEN SVGS) ─── */}
              <div className="bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                {/* ─── STEP 0: ICE-ALBEDO POSITIVE FEEDBACK LOOP ─── */}
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                      {/* Interactive SVG Feedback Diagram */}
                      <svg viewBox="0 0 450 320" className="w-full max-w-lg mx-auto select-none" aria-label="Ice-Albedo Positive Feedback Loop Diagram">
                        <defs>
                          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                          </radialGradient>
                          <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0369a1" />
                            <stop offset="100%" stopColor="#082f49" />
                          </linearGradient>
                        </defs>

                        {/* Sun */}
                        <circle cx="225" cy="45" r="28" fill="url(#sunGlow)" className="animate-pulse" />
                        <text x="225" y="50" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">Solar Heat</text>

                        {/* Ocean Bed / Water */}
                        <rect x="40" y="200" width="370" height="90" rx="12" fill="url(#oceanGrad)" stroke="#0284c7" strokeWidth="2" />
                        <text x="225" y="260" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">
                          Dark Ocean Surface (Albedo: 6% • Absorbs 94%)
                        </text>

                        {/* Dynamic Ice Sheet */}
                        <motion.rect
                          x="50"
                          y="180"
                          width={iceCoverage * 3.5}
                          height="35"
                          rx="6"
                          fill="#f8fafc"
                          stroke="#cbd5e1"
                          strokeWidth="2"
                          animate={{ width: iceCoverage * 3.5 }}
                          transition={{ duration: 0.3 }}
                        />
                        <text x="120" y="202" fill="#0f172a" fontSize="10" fontWeight="bold">
                          Ice Sheet ({iceCoverage}%)
                        </text>

                        {/* Feedback Cycle Rays */}
                        <path d="M 210 75 L 120 180" stroke="#fbbf24" strokeWidth="3" strokeDasharray="5,5" />
                        <path d="M 120 180 L 70 90" stroke="#f8fafc" strokeWidth={Math.max(1, (iceCoverage / 100) * 4)} />
                        <text x="55" y="85" fill="#e2e8f0" fontSize="9">Reflected Sunlight</text>

                        <path d="M 240 75 L 330 200" stroke="#ea580c" strokeWidth={Math.max(2, (solarAbsorption / 100) * 6)} />
                        <text x="345" y="150" fill="#fb923c" fontSize="10" fontWeight="bold">
                          Absorbed Heat: {solarAbsorption}%
                        </text>

                        {/* Circular Loop Arrows */}
                        <path d="M 380 220 Q 430 140 290 80" fill="none" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#arrow)" />
                        <text x="390" y="125" fill="#f87171" fontSize="10" fontWeight="bold">Reinforcing Warming Loop (+)</text>
                      </svg>

                      {/* Controls & Metrics */}
                      <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Global Temperature Anomaly:</span>
                            <span className="text-rose-400 font-bold">+{globalTempDelta.toFixed(1)}°C</span>
                          </div>
                          <input
                            type="range"
                            min={0.5}
                            max={3.5}
                            step={0.1}
                            value={globalTempDelta}
                            onChange={(e) => setGlobalTempDelta(parseFloat(e.target.value))}
                            aria-label="Set global temperature anomaly in Celsius"
                            className="w-full accent-rose-500 cursor-pointer"
                          />
                        </div>

                        {/* Metric Gauges */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-xs text-slate-400">Remaining Ice Cover</span>
                            <div className="text-xl font-black text-gold-300">{iceCoverage}%</div>
                            <div className="h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <motion.div className="h-full bg-gold-400" animate={{ width: `${iceCoverage}%` }} />
                            </div>
                          </div>
                          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                            <span className="text-xs text-slate-400">Solar Heat Absorbed</span>
                            <div className="text-xl font-black text-amber-400">{solarAbsorption}%</div>
                            <div className="h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                              <motion.div className="h-full bg-amber-500" animate={{ width: `${solarAbsorption}%` }} />
                            </div>
                          </div>
                        </div>

                        {/* Predict-Then-Check In-Situ Hook */}
                        {!predictionMade && (
                          <div className="mt-3 p-3 bg-gold-950/50 rounded-lg border border-gold-800 text-xs">
                            <p className="font-semibold text-gold-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                            <div className="space-y-1.5">
                              {PREDICTION_QUESTIONS[0].options.slice(0, 2).map((opt, i) => (
                                <button
                                  key={i}
                                  onClick={() => handlePrediction(i)}
                                  className="w-full text-left p-2 rounded bg-gold-900/40 hover:bg-gold-800/60 text-slate-200 transition"
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {predictionMade && (
                          <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded border border-emerald-800/40">
                            ✓ Notice how exceeding +1.5°C collapses reflective white ice, causing solar absorption to soar above 60%!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── STEP 1: TROPHIC CASCADE & BIOACCUMULATION ─── */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="text-rose-400 font-bold text-sm">Industrial Mercury Inflow:</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIndustrialDischarge(!industrialDischarge)}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                            industrialDischarge ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {industrialDischarge ? 'DISCHARGE ACTIVE' : 'TREATMENT PLANT ACTIVE'}
                        </motion.button>
                      </div>
                      <span className="text-xs text-slate-400">Trophic Multiplier: 10× per step</span>
                    </div>

                    {/* SVG Trophic Pyramid / Biomagnification Chain */}
                    <svg viewBox="0 0 500 240" className="w-full max-w-xl mx-auto select-none" aria-label="Biomagnification Trophic Pyramid">
                      {/* Trophic Bars */}
                      {[
                        { level: 'Phytoplankton (Algae)', ppm: industrialDischarge ? '0.05 ppm' : '0.001 ppm', y: 180, width: 440, color: '#10b981', x: 30 },
                        { level: 'Zooplankton & Insects', ppm: industrialDischarge ? '0.5 ppm' : '0.01 ppm', y: 130, width: 330, color: '#06b6d4', x: 85 },
                        { level: 'Small Fish (Minnows)', ppm: industrialDischarge ? '5.0 ppm' : '0.08 ppm', y: 80, width: 220, color: '#3b82f6', x: 140 },
                        { level: 'Apex Indian River Dolphin', ppm: industrialDischarge ? '50.0 ppm ⚠️' : '0.5 ppm', y: 30, width: 110, color: '#f43f5e', x: 195 },
                      ].map((t, idx) => (
                        <g key={idx}>
                          <rect x={t.x} y={t.y} width={t.width} height="36" rx="8" fill={t.color} fillOpacity="0.25" stroke={t.color} strokeWidth="2" />
                          <text x={250} y={t.y + 16} textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                            {t.level}
                          </text>
                          <text x={250} y={t.y + 30} textAnchor="middle" fill={idx === 3 && industrialDischarge ? '#fda4af' : '#cbd5e1'} fontSize="10">
                            Toxin Concentration: {t.ppm}
                          </text>
                        </g>
                      ))}
                    </svg>
                    <p className="text-xs text-slate-400 text-center">
                      🔬 <strong>Bioaccumulation</strong> occurs within a single organism over its lifespan. <strong>Biomagnification</strong> causes exponential multiplying concentrations up to the apex predator.
                    </p>
                  </div>
                )}

                {/* ─── STEP 2: REGIME SHIFT & LAKE EUTROPHICATION ─── */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* SVG Lake Cross-Section */}
                      <svg viewBox="0 0 400 240" className="w-full select-none" aria-label="Ecosystem Regime Shift Cross-Section">
                        <defs>
                          <linearGradient id="clearWater" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#0369a1" />
                          </linearGradient>
                          <linearGradient id="turbidWater" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#84cc16" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#365314" />
                          </linearGradient>
                        </defs>

                        {/* Lake Body */}
                        <rect x="20" y="30" width="360" height="180" rx="16" fill={lakeRegime === 'clear' ? 'url(#clearWater)' : 'url(#turbidWater)'} stroke="#475569" strokeWidth="2" />

                        {/* Surface Layer */}
                        {lakeRegime === 'turbid' && (
                          <rect x="20" y="30" width="360" height="24" fill="#65a30d" opacity="0.9" />
                        )}

                        {/* Sunlight rays */}
                        <path d="M 60 0 L 100 120" stroke="#fef08a" strokeWidth="2" strokeDasharray="4,4" opacity={lakeRegime === 'clear' ? 0.8 : 0.15} />
                        <path d="M 200 0 L 220 120" stroke="#fef08a" strokeWidth="2" strokeDasharray="4,4" opacity={lakeRegime === 'clear' ? 0.8 : 0.15} />

                        {/* Fish / Flora Entities */}
                        <text x="120" y="110" fontSize="22">{lakeRegime === 'clear' ? '🐟' : '💀'}</text>
                        <text x="260" y="140" fontSize="22">{lakeRegime === 'clear' ? '🐠' : '🥀'}</text>
                        <text x="200" y="180" fontSize="18">{lakeRegime === 'clear' ? '🌿 Submerged Flora Healthy' : '🍂 Decomposed Anoxic Sludge'}</text>

                        {/* State Label */}
                        <rect x="110" y="195" width="180" height="25" rx="6" fill="#0f172a" opacity="0.85" />
                        <text x="200" y="212" textAnchor="middle" fill={lakeRegime === 'clear' ? '#38bdf8' : '#eab308'} fontSize="11" fontWeight="bold">
                          State: {lakeRegime === 'clear' ? 'CLEAR WATER REGIME' : 'TURBID EUTROPHIC REGIME'}
                        </text>
                      </svg>

                      {/* Slider & Threshold Explanation */}
                      <div className="space-y-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                            <span>Fertilizer Runoff (N & P):</span>
                            <span className={fertilizerRunoff > 65 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                              {fertilizerRunoff} mg/L (Threshold: 65 mg/L)
                            </span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={110}
                            value={fertilizerRunoff}
                            onChange={(e) => setFertilizerRunoff(parseInt(e.target.value))}
                            aria-label="Set fertilizer runoff concentration in milligrams per liter"
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>

                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
                          <div>
                            <span className="text-xs text-slate-400">Dissolved Oxygen (DO)</span>
                            <div className="text-lg font-black text-gold-300">{dissolvedOxygen} mg/L</div>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded text-xs font-bold ${
                              dissolvedOxygen > 5 ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-950 text-rose-400 animate-pulse'
                            }`}
                          >
                            {dissolvedOxygen > 5 ? 'HEALTHY' : 'HYPOXIA DEAD ZONE'}
                          </span>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          ⚠️ <strong>Thresholds & Regime Shifts:</strong> Once crossed, internal nutrient recycling from decomposing bottom sediments makes this flip difficult to reverse.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── STEP 3: CONSTITUTIONAL FRAMEWORK EXPLORER ─── */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { id: 'art21', title: 'Article 21: Fundamental Right', desc: 'Enforceable Right to Life & Dignity → includes pollution-free water and clean air (Subhash Kumar 1991).' },
                        { id: 'art48a', title: 'Article 48A: State Directive', desc: 'Directive Principle → State shall endeavor to protect and improve the environment and safeguard forests/wildlife.' },
                        { id: 'art51a', title: 'Article 51A(g): Citizen Duty', desc: 'Fundamental Duty → Duty of every Indian citizen to protect and improve the natural environment including lakes and rivers.' },
                      ].map((p) => (
                        <motion.button
                          key={p.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedPillar(p.id as 'art21' | 'art48a' | 'art51a')}
                          className={`p-4 text-left rounded-xl border transition ${
                            selectedPillar === p.id
                              ? 'bg-gold-950/80 border-gold-500 text-white shadow-lg'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                          }`}
                        >
                          <h4 className="font-bold text-sm text-gold-300 mb-1">{p.title}</h4>
                          <p className="text-xs text-slate-400">{p.desc}</p>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-xs text-slate-300 space-y-1">
                        <strong className="text-emerald-400 block text-sm">Judicial Enforcement Teeth:</strong>
                        <p>• <strong>PIL (Public Interest Litigation):</strong> Relaxes <em>locus standi</em> so any citizen or NGO can petition courts.</p>
                        <p>• <strong>NGT (National Green Tribunal Act 2010):</strong> Fast-track specialized environmental adjudication.</p>
                      </div>
                      <div className="text-xs text-amber-300 bg-amber-950/40 p-3 rounded-lg border border-amber-800/40 max-w-xs">
                        ⚖️ <strong>Vellore 1996:</strong> Introduced <em>Precautionary Principle</em> & <em>Polluter Pays Principle</em> into Indian law.
                      </div>
                    </div>
                  </div>
                )}

                {/* ─── STEP 4: CLIMATE ACTION MATRIX (MITIGATION & ADAPTATION) ─── */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Mitigation Panel */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-emerald-400">☀️ Climate Mitigation (Cut Emissions)</h4>
                          <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
                            Renewable Transition
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Solar Farm Installed Capacity:</span>
                            <span className="font-bold text-emerald-400">{solarCapacityMW} MW</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={500}
                            step={10}
                            value={solarCapacityMW}
                            onChange={(e) => setSolarCapacityMW(parseInt(e.target.value))}
                            aria-label="Set solar farm installed capacity in Megawatts"
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                        </div>
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                          <span className="text-slate-400">Annual CO2 Avoided (Coal Replacement):</span>
                          <div className="text-lg font-black text-emerald-400">{carbonSavedTonnes.toLocaleString()} Tonnes CO2e</div>
                        </div>
                      </div>

                      {/* Adaptation Panel */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-gold-400">🌊 Climate Adaptation (Build Resilience)</h4>
                          <span className="text-xs bg-gold-950 text-gold-300 px-2 py-0.5 rounded border border-gold-800">
                            Bio-Shield Defense
                          </span>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Sundarbans Mangrove Buffer Width:</span>
                            <span className="font-bold text-gold-400">{mangroveBufferMeters} Meters</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={200}
                            step={10}
                            value={mangroveBufferMeters}
                            onChange={(e) => setMangroveBufferMeters(parseInt(e.target.value))}
                            aria-label="Set mangrove buffer width in meters"
                            className="w-full accent-gold-500 cursor-pointer"
                          />
                        </div>
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                          <span className="text-slate-400">Cyclone Storm Surge Wave Impact:</span>
                          <div className="text-lg font-black text-gold-400">{stormWaveEnergy}% (Attenuated)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Exploration Prev / Next Navigation */}
              <div className="flex items-center justify-between pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Previous Exploration Step"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs disabled:opacity-40 disabled:pointer-events-none"
                >
                  ← Previous Concept
                </motion.button>
                <div className="flex gap-1.5">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlide === i ? 'bg-emerald-400 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSlide}
                  aria-label={currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Play Sandbox' : 'Next Exploration Step'}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950/30"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Free Play Sandbox →' : 'Next Step →'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>🎮</span> Free-Play Biosphere Sandbox
              </h3>
              <p className="text-xs text-slate-400">Zero pressure, no grading. Experiment with national climate & forestry parameters!</p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-right">
              <span className="text-xs text-slate-400">Biosphere Resilience Index:</span>
              <div
                className={`text-2xl font-black ${
                  sandboxEcosystemHealthScore > 70
                    ? 'text-emerald-400'
                    : sandboxEcosystemHealthScore > 40
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {sandboxEcosystemHealthScore} / 100
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Control 1 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Atmospheric CO2 Concentration (ppm)</label>
              <input
                type="range"
                min={300}
                max={600}
                value={sandboxCo2EmissionPPM}
                onChange={(e) => setSandboxCo2EmissionPPM(parseInt(e.target.value))}
                aria-label="Set atmospheric CO2 concentration in PPM"
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-rose-400 block text-right">{sandboxCo2EmissionPPM} PPM</span>
            </div>

            {/* Control 2 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">National Renewable Grid Share (%)</label>
              <input
                type="range"
                min={10}
                max={90}
                value={sandboxRenewablePercent}
                onChange={(e) => setSandboxRenewablePercent(parseInt(e.target.value))}
                aria-label="Set national renewable grid share percentage"
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-emerald-400 block text-right">{sandboxRenewablePercent}%</span>
            </div>

            {/* Control 3 */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Total Forest & Tree Cover (Mha)</label>
              <input
                type="range"
                min={40}
                max={100}
                value={sandboxTreeCoverMha}
                onChange={(e) => setSandboxTreeCoverMha(parseInt(e.target.value))}
                aria-label="Set total forest and tree cover in million hectares"
                className="w-full accent-teal-500 cursor-pointer"
              />
              <span className="text-xs font-bold text-teal-400 block text-right">{sandboxTreeCoverMha} Million Hectares</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-400">Feel confident with the mechanisms? Proceed to graded challenges!</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Adaptive Challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-900/30"
            >
              Ready for Adaptive Challenges! →
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          {/* Progress Bar & Header */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gold-400 uppercase tracking-wider text-[11px] bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
                  NEP 2020: {challenge.competencyLevel}
                </span>
                <span className="text-slate-400">
                  Score: <strong>{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Active Challenge Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-xl shadow-rose-950/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Target Node: {challenge.nodeId}
              </span>
              <h3 className="text-base md:text-lg font-bold text-slate-100 mt-1">{challenge.question}</h3>
            </div>

            {/* 1. MCQ VARIANT (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={(e) => handleAnswer(i, e)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all duration-200 border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-bold text-gold-400">{String.fromCharCode(65 + i)}.</span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items into the targets:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-lg bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {challenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300'
                          : 'bg-slate-950/50 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-semibold mb-1">Target: {item.targetId.replace('_', ' ')}</span>
                      <span className="text-sm font-bold">{droppedLabels[item.targetId] || '[Drop Label Here]'}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(droppedLabels, e)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < (challenge.dragItems?.length || 1)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-gold-900/30 disabled:opacity-50"
                  >
                    Check Drag Placements
                  </motion.button>
                </div>
              </div>
            )}

            {/* 3. DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Reorder steps by clicking to swap adjacent rows:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement
                  : challenge.sortItems.map((_, i) => i)
                ).map((itemIdx, displayIdx) => (
                  <div
                    key={displayIdx}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between text-sm text-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gold-950 border border-gold-700 text-gold-300 flex items-center justify-center text-xs font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{challenge.sortItems![itemIdx]}</span>
                    </div>
                    <div className="flex gap-1">
                      {displayIdx > 0 && (
                        <button
                          onClick={() => handleSortMove(displayIdx, displayIdx - 1)}
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs"
                        >
                          ▲
                        </button>
                      )}
                      {displayIdx < challenge.sortItems!.length - 1 && (
                        <button
                          onClick={() => handleSortMove(displayIdx, displayIdx + 1)}
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs"
                        >
                          ▼
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) =>
                      handleAnswer(
                        sortArrangement.length ? sortArrangement : challenge.sortItems!.map((_, i) => i),
                        e
                      )
                    }
                    disabled={showExplanation}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow"
                  >
                    Verify Order
                  </motion.button>
                </div>
              </div>
            )}

            {/* 4. NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    disabled={showExplanation}
                    aria-label={`Enter numeric answer in ${challenge.unit || 'units'}`}
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold w-48 text-center text-lg"
                  />
                  <span className="text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(numericInput, e)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow disabled:opacity-50"
                  >
                    Submit Number
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      disabled={showExplanation || constructParts.includes(part)}
                      className="px-3 py-1.5 rounded-lg bg-gold-900/60 hover:bg-gold-800 text-gold-200 border border-gold-700 text-xs disabled:opacity-40"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2">
                  {constructParts.map((part, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 bg-gold-700 text-white rounded-lg text-xs flex items-center gap-1.5 shadow"
                    >
                      <span>{idx + 1}. {part}</span>
                      {!showExplanation && (
                        <button
                          onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-gold-200 hover:text-white"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above in sequential order</span>
                  )}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAnswer(constructParts.join(' '), e)}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs shadow disabled:opacity-50"
                  >
                    Validate Construct Chain
                  </motion.button>
                </div>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD (MANDATORY) */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 rounded-xl bg-amber-950/40 border border-amber-700/60 space-y-4"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>💡</span>
                  <span>Scientific Step-by-Step Breakdown:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-100/90 leading-relaxed"
                    >
                      <strong className="text-amber-400">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow"
                  >
                    Show next step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <div className="pt-2 flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Simulation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Header Card */}
          <div className="p-8 bg-gradient-to-br from-slate-900 via-emerald-950/50 to-slate-900 rounded-3xl border border-emerald-800/60 text-center space-y-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12 }}
              className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500 text-3xl flex items-center justify-center"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You evaluated feedback loops, constitutional Article 21 protections, community conservation, and climate resilience frameworks.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="px-5 py-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-5 py-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Demonstrated Mastery</span>
                <span className="text-xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-800/60">
            <h3 className="font-bold text-sm text-emerald-400 mb-1">🌟 Performance Assessment:</h3>
            <p className="text-xs md:text-sm text-emerald-200">
              {errors === 0
                ? 'PERFECT SCORE! You have mastered Environmental Systems, Feedback Loops, and Climate Resilience completely!'
                : errors <= 3
                ? 'Outstanding work! You demonstrated strong systems thinking and constitutional environmental reasoning.'
                : 'Good effort! Review the specific misconception corrections below to reinforce your systems-thinking mastery.'}
            </p>
          </div>

          {/* Misconception Review (if any were encountered) */}
          {hitMisconceptions.length > 0 && misconceptions && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-3">
              <h3 className="font-bold text-sm text-rose-300">⚠️ Your Targeted Concept Corrections:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-slate-200">📅 Spaced Repetition (SM-2 Algorithm)</h4>
              <p className="text-xs text-slate-400">
                Scheduled review in <strong className="text-gold-400">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock in permanent neuro-retention.
              </p>
            </div>
            <span className="text-xl">🧠</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-gold-950/30 rounded-2xl border border-gold-900/50 space-y-3">
            <h3 className="font-bold text-base text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── FEEDBACK OVERLAYS (SIM-ENGINE API) ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_EVSCauseEffectRelationsSim;