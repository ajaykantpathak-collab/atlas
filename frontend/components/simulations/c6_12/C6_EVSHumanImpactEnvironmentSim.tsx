'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED CONSTANTS FOR NODE IDS ───
const NODE_C6_EVS_011 = 'c6_evs_011';
const NODE_C6_EVS_012 = 'c6_evs_012';
const NODE_C6_EVS_013 = 'c6_evs_013';
const NODE_C6_EVS_014 = 'c6_evs_014';
const ALL_NODE_IDS = [NODE_C6_EVS_011, NODE_C6_EVS_012, NODE_C6_EVS_013, NODE_C6_EVS_014];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Eco-Rescue: Mission Sundarvan',
  intro: 'The town of Sundarvan is facing a major ecological breakdown. Thick smog chokes the morning air, industrial runoff has turned the river murky brown, toxic plastic mountains overwhelm the municipal landfill, and temperatures have spiked by 2.4°C over the past decade.',
  context: 'As the Junior Environmental Officer appointed by the State Green Board, you must investigate pollution sources, restore waste management cycles, analyse greenhouse dynamics, and balance sustainable community development.',
};

// ─── DISCOVERY HOOK QUESTION (curiosity-driven, not graded) ───
const DISCOVERY_QUESTION = {
  question: 'If a town replaces 10,000 single-use plastic bottles daily with reusable steel bottles, how does it immediately benefit BOTH land and air ecosystems?',
  options: [
    'It only cleans the water bodies, not the air or land.',
    'It prevents toxic landfill clogging AND reduces fossil-fuel smoke from plastic manufacturing.',
    'It permanently eliminates all city greenhouse gas emissions in a single day.',
    'It has zero environmental effect because plastic decomposes in 2 days.'
  ],
  correctIndex: 1,
  hintAfter: 'Curious? Every piece of plastic requires fossil fuels to make and centuries to break down. Let us discover how human activities reshape the planet!'
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Four Realms of Pollution',
    instruction: 'Click on each realm (Air, Water, Soil, Sound) to inspect active pollutants, primary sources, and their real-time impact.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_EVS_011,
  },
  {
    title: 'Waste Segregation & 3Rs Laboratory',
    instruction: 'Drag each waste item into either the Green Compost Bin or the Blue Recyclable Bin to restore ecological balance.',
    interactionType: 'drag-classify',
    nodeId: NODE_C6_EVS_012,
  },
  {
    title: 'The Atmospheric Heat Blanket',
    instruction: 'Adjust the atmospheric CO2 slider to observe how trapped infrared rays enhance the natural greenhouse effect.',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_EVS_013,
  },
  {
    title: 'Needs vs Wants Balance Scale',
    instruction: 'Click resource allocations to test how unchecked consumption stresses finite natural reserves.',
    interactionType: 'drag-match',
    nodeId: NODE_C6_EVS_014,
  },
  {
    title: 'Sustainable Town Simulator',
    instruction: 'Toggle renewable energy, sewage treatment, and green belts to lower the Eco-Stress Index below 25%.',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_EVS_014,
  },
];

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If factory chimneys double their sulphur dioxide emission without scrubbers, what will happen to nearby lake pH and ancient marble monuments?',
    options: [
      'Lake pH will rise to neutral and marble will harden',
      'Acid rain will form, acidifying lake water and corroding marble stone',
      'No change will happen because gases disperse into space',
      'It will exclusively create noise vibrations without chemical effects'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the Industrial Smoke intensity to +80% and observe the acid rain indicator gauge!',
    nodeId: NODE_C6_EVS_011,
  },
  {
    question: 'Predict: If atmospheric CO2 rises from the pre-industrial 280 ppm to 560 ppm, what is the primary consequence for polar ice and sea levels?',
    options: [
      'Polar ice thickens due to excess atmospheric dust',
      'More heat is trapped, accelerating glacial melt and causing sea level rise',
      'Earth enters a severe global ice age immediately',
      'Sea level drops because warm water evaporates completely'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the CO2 concentration slider above 500 ppm and watch the glacial retreat gauge in the visualization!',
    nodeId: NODE_C6_EVS_013,
  },
];

// ─── OBSERVATION QUESTIONS (What do you notice?) ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about river dissolved oxygen levels as raw sewage discharge is increased in the simulator?',
    observableOptions: [
      'Dissolved oxygen stays constant at 100%',
      'Oxygen levels drop sharply as decomposing bacteria consume oxygen, endangering fish',
      'Dissolved oxygen increases because organic waste produces pure oxygen',
      'Fish population multiplies by ten times immediately'
    ],
    correctIndex: 1,
    nodeId: NODE_C6_EVS_011,
  },
  {
    question: 'What pattern emerges between the 3Rs hierarchy: why is "Reduce" fundamentally more effective than "Recycle"?',
    observableOptions: [
      'Recycling requires zero energy or water consumption',
      'Reduce stops raw resource extraction and emissions before any waste or processing is created',
      'Recycling makes plastic completely biodegradable within minutes',
      'Reduce only applies to metal, while recycle applies to all items'
    ],
    correctIndex: 1,
    nodeId: NODE_C6_EVS_012,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Eco-Auditor: 7-Day Challenge',
  description: 'Conduct an authentic home-and-neighbourhood environmental audit. Track your family\'s daily waste segregation, count single-use plastics averted, check tap leaks, and create a mini kitchen-compost container.',
  steps: [
    'Set up two labelled bins at home: Green (wet/biodegradable) and Blue (dry/recyclable).',
    'Calculate the daily weight of kitchen peels and start an aerated compost pot with dry leaves.',
    'Identify 3 family "wants" that can be reduced to save energy or raw packaging.',
    'Log your weekly carbon savings and share your audit findings with your school Eco-Club.'
  ],
};

// ─── CHALLENGE INTERFACE ───
export interface Challenge {
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

// ─── 21 COMPREHENSIVE CHALLENGES ACROSS ALL 4 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c6_evs_011)
  {
    id: 'ch_01',
    nodeId: NODE_C6_EVS_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which harmful gas is released primarily by the incomplete burning of petrol and diesel in motor vehicles?',
    options: ['Pure Oxygen (O2)', 'Carbon Monoxide (CO)', 'Argon (Ar)', 'Water vapour'],
    correctIndex: 1,
    explanation: 'Incomplete combustion in vehicle engines releases poisonous Carbon Monoxide (CO), which binds to haemoglobin in human blood and reduces oxygen transport.',
    hints: [
      'Think of an odourless, toxic gas that comes from vehicle exhaust pipes.',
      'It contains one carbon atom and one oxygen atom.',
      'The gas is Carbon Monoxide (CO).'
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (c6_evs_011)
  {
    id: 'ch_02',
    nodeId: NODE_C6_EVS_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the 4 core environmental pollution categories correctly on the diagnostic diagram.',
    dragItems: [
      { label: 'Air: Smog & CO', targetId: 'zone_air' },
      { label: 'Water: Sewage & Chemicals', targetId: 'zone_water' },
      { label: 'Soil: Pesticides & Heavy Metals', targetId: 'zone_soil' },
      { label: 'Noise: Horns >85dB', targetId: 'zone_noise' },
    ],
    correctMapping: {
      zone_air: 'Air: Smog & CO',
      zone_water: 'Water: Sewage & Chemicals',
      zone_soil: 'Soil: Pesticides & Heavy Metals',
      zone_noise: 'Noise: Horns >85dB'
    },
    explanation: 'Pollution damages all four spheres: atmospheric air, aquatic water bodies, terrestrial soil, and the acoustic auditory environment.',
    hints: [
      'Look at the upper sky zone for air pollutants.',
      'Look at the river section for aquatic water pollutants.',
      'The agricultural ground layer represents soil, while traffic speakers represent noise.'
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Recall (c6_evs_012)
  {
    id: 'ch_03',
    nodeId: NODE_C6_EVS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following materials is BIODEGRADABLE and can be converted into natural compost by bacteria and earthworms?',
    options: ['Aluminium foil wrapper', 'Banana peels & tea leaves', 'Polyethylene carry bag', 'Discarded mobile battery'],
    correctIndex: 1,
    explanation: 'Banana peels and tea leaves are organic matter containing plant fibres that decomposers (bacteria and fungi) easily break down into nutrient-rich humus.',
    hints: [
      'Which item came directly from a living plant or food source?',
      'Microorganisms cannot digest synthetic plastics or metals.',
      'Organic kitchen scraps like peels decompose naturally.'
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Understanding (c6_evs_012)
  {
    id: 'ch_04',
    nodeId: NODE_C6_EVS_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why must municipal waste be segregated into separate Green and Blue bins right at the household source?',
    options: [
      'To make the dustbins look colourful and decorative',
      'Because mixed waste prevents both efficient composting of organics and clean recycling of dry goods',
      'To allow wet food waste to permanently dissolve plastic bottles',
      'Because city municipal trucks can only carry one single material per year'
    ],
    correctIndex: 1,
    explanation: 'Source segregation prevents food waste from contaminating dry recyclables (paper, plastic, metal) and allows pure organic waste to undergo hygienic aerobic composting.',
    hints: [
      'What happens if food scraps rot all over clean waste paper and cardboard?',
      'Recycling requires clean dry materials, while composting needs pure organic waste.',
      'Segregating at source keeps both material streams pure and usable.'
    ],
    misconceptionIndex: 1,
  },
  // 5. Foundation - Understanding (c6_evs_013)
  {
    id: 'ch_05',
    nodeId: NODE_C6_EVS_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What would Earth\'s average surface temperature be if the NATURAL greenhouse effect did not exist at all?',
    options: ['+45°C (Extremely hot)', '+15°C (Current comfortable climate)', '-18°C (Frozen and mostly uninhabitable)', '0°C (Exactly at freezing everywhere)'],
    correctIndex: 2,
    explanation: 'The natural greenhouse effect traps thermal infrared radiation, maintaining Earth\'s average temperature at +15°C instead of a freezing -18°C.',
    hints: [
      'Without greenhouse gases, Earth\'s heat would escape directly into outer space.',
      'Water would turn to solid ice all across the globe.',
      'The temperature would plummet to approximately -18°C.'
    ],
    misconceptionIndex: 0,
  },
  // 6. Foundation - Drag Sort (c6_evs_012)
  {
    id: 'ch_06',
    nodeId: NODE_C6_EVS_012,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 3Rs of waste hierarchy in order of supreme ecological priority (Best practice first to last option).',
    sortItems: [
      'Reduce (Minimise consumption & refuse single-use items)',
      'Reuse (Utilise items multiple times in their existing form)',
      'Recycle (Reprocess materials in industrial plants)',
      'Disposal in sanitary landfill (Last resort)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The waste hierarchy prioritises Reduce first (preventing waste generation), then Reuse (saving manufacturing energy), then Recycle (reprocessing raw materials), and finally Landfill as the last resort.',
    hints: [
      'The cleanest waste is the waste that was never created in the first place.',
      'Using an empty glass jar again is better than melting it in a factory.',
      'The order is Reduce -> Reuse -> Recycle -> Landfill.'
    ],
    misconceptionIndex: 0,
  },
  // 7. Foundation - Recall (c6_evs_014)
  {
    id: 'ch_07',
    nodeId: NODE_C6_EVS_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly classifies a fundamental biological "Need" versus a human "Want"?',
    options: [
      'Need: Gaming console; Want: Safe potable drinking water',
      'Need: Clean water, basic nutrition & shelter; Want: Latest flagship smartphone & luxury fashion',
      'Need: Air-conditioned sports car; Want: Oxygen to breathe',
      'All human desires are identical and classified as survival needs'
    ],
    correctIndex: 1,
    explanation: 'Needs are physiological and developmental necessities for health and survival (water, food, basic clothing, shelter, education), whereas Wants are non-essential desires.',
    hints: [
      'Can a human survive without a luxury gadget? Yes.',
      'Can a human survive without clean drinking water and food? No.',
      'Needs are vital for survival; wants are optional desires.'
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard - Application (c6_evs_011)
  {
    id: 'ch_08',
    nodeId: NODE_C6_EVS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A textile dyeing mill releases untreated chemical effluent into the Yamuna River. Which sequential disaster occurs downstream?',
    options: [
      'Water clarity increases and aquatic fish lay more eggs',
      'Toxic synthetic dyes block sunlight, reduce aquatic photosynthesis, kill fish, and poison local drinking wells',
      'The river permanently converts into fertile agricultural potting compost',
      'Atmospheric ozone layer immediately thickens by 50%'
    ],
    correctIndex: 1,
    explanation: 'Industrial dyes and chemical effluents increase chemical oxygen demand (COD), block light penetration for algae, cause fish suffocation, and seep into riparian aquifers.',
    hints: [
      'Consider how dark chemical dyes affect sunlight penetration in water.',
      'Plants in water need sunlight to produce oxygen for fish.',
      'Heavy chemical toxins contaminate both river wildlife and groundwater.'
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Numeric Calculation (c6_evs_013)
  {
    id: 'ch_09',
    nodeId: NODE_C6_EVS_013,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Pre-industrial atmospheric CO2 was 280 ppm. Today it measures 420 ppm. By how many parts per million (ppm) has human activity increased atmospheric CO2?',
    correctAnswer: 140,
    tolerance: 0,
    unit: 'ppm',
    explanation: '420 ppm - 280 ppm = 140 ppm increase, representing a staggering 50% rise in greenhouse heat-trapping capacity in just under two centuries.',
    hints: [
      'Subtract the baseline pre-industrial value from the modern concentration.',
      'Calculate: 420 minus 280.',
      'The difference is exactly 140 ppm.'
    ],
  },
  // 10. Standard - Analysis (c6_evs_012)
  {
    id: 'ch_10',
    nodeId: NODE_C6_EVS_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Reusing an old glass Horlicks jar to store kitchen pulses differ fundamentally from Recycling that same jar?',
    options: [
      'Reusing requires melting the glass in a 1500°C furnace; Recycling does not',
      'Reusing preserves the original object with zero industrial reprocessing energy; Recycling melts the glass down to manufacture a new item',
      'Reusing produces toxic microplastics; Recycling produces natural manure',
      'There is absolutely no difference; both terms mean throwing the jar away'
    ],
    correctIndex: 1,
    explanation: 'Reuse maintains the physical structure of the product without requiring energy-intensive industrial transformation, whereas recycling consumes fuel and water to crush, melt, and reform raw material.',
    hints: [
      'Do you need a factory furnace to wash and refill a glass jar at home?',
      'Reuse keeps the product intact; recycle breaks it down into raw material.',
      'Reuse saves all manufacturing energy.'
    ],
    misconceptionIndex: 0,
  },
  // 11. Standard - Application (c6_evs_014)
  {
    id: 'ch_11',
    nodeId: NODE_C6_EVS_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A city replaces 500 diesel transit buses with an electric metro line powered by the Bhadla Solar Park in Rajasthan. Which principle of sustainability is demonstrated?',
    options: [
      'Resource exhaustion and maximizing fossil combustion',
      'Shift to renewable clean energy and reduction of atmospheric carbon emissions',
      'Uncontrolled consumer want creation',
      'Linear single-use plastic disposal'
    ],
    correctIndex: 1,
    explanation: 'Transitioning from diesel-powered transit to solar-powered electric mass transit directly conserves finite petroleum reserves and cuts urban nitrogen oxide and carbon emissions.',
    hints: [
      'Solar energy is naturally replenished every day.',
      'Replacing diesel engines reduces both air pollution and fossil fuel depletion.',
      'This embodies the principle of renewable energy adoption.'
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard - Analysis (c6_evs_011)
  {
    id: 'ch_12',
    nodeId: NODE_C6_EVS_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A farmer excessively sprays chemical nitrogen fertilizers and DDT on crop fields for 5 consecutive years. What is the hidden ecological chain reaction?',
    options: [
      'Soil fertility permanently improves and earthworms double their lifespan',
      'Beneficial soil microbes die, soil loses organic structure, and chemicals biomagnify up the food chain to humans',
      'Rainfall becomes completely pure distilled water over the farm',
      'Noise pollution in the village drops by 40 decibels'
    ],
    correctIndex: 1,
    explanation: 'Excessive agrochemicals degrade native soil microbiota, disrupt natural nitrogen fixation, and cause pesticide runoff into groundwater, leading to toxic bioaccumulation in food crops.',
    hints: [
      'Consider what happens to living soil earthworms and bacteria when exposed to synthetic chemicals.',
      'Do excess chemical pesticides stay in the soil or wash into food and water?',
      'They cause soil degradation and enter human food chains.'
    ],
    misconceptionIndex: 2,
  },
  // 13. Standard - Construct Strategy (c6_evs_012)
  {
    id: 'ch_13',
    nodeId: NODE_C6_EVS_012,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the correct 4-step sequence to prepare an active, odourless home compost pit.',
    availableParts: [
      'Layer dry leaves & shredded paper',
      'Add moist green kitchen vegetable scraps',
      'Sprinkle garden soil containing microbes',
      'Aerate and turn every 5-7 days',
      'Pour chemical bleach and plastic bags',
      'Burn the heap with kerosene'
    ],
    targetState: 'Layer dry leaves & shredded paper Add moist green kitchen vegetable scraps Sprinkle garden soil containing microbes Aerate and turn every 5-7 days',
    validationHint: 'Select the 4 healthy composting steps (Dry Browns -> Wet Greens -> Microbe Inoculant -> Aeration).',
    explanation: 'Aerobic composting balances carbon-rich browns (dry leaves) with nitrogen-rich greens (kitchen peels), inoculates with natural soil microbes, and requires regular turning for oxygenation.',
    hints: [
      'Start with dry carbon-rich brown leaves at the base for aeration.',
      'Add nitrogen-rich green vegetable peels next.',
      'Inoculate with soil microbes and turn regularly; NEVER add bleach or kerosene!'
    ],
  },
  // 14. Standard - Evaluation (c6_evs_013)
  {
    id: 'ch_14',
    nodeId: NODE_C6_EVS_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A speaker claims: "Because it rained heavily on two chilly days in December, global climate change is a proven myth." How do you evaluate this statement?',
    options: [
      'The claim is valid because two cold days define the entire Earth\'s global climate',
      'The claim confuses short-term daily local weather with long-term global climate trends measured over decades',
      'Rainfall proves that the greenhouse effect has permanently shut down',
      'Winter weather indicates Earth is moving further away from the Sun every week'
    ],
    correctIndex: 1,
    explanation: 'Weather refers to day-to-day atmospheric fluctuations in a local region, while climate is the statistical average of weather over 30+ years across the entire planet.',
    hints: [
      'Is one rainy day proof of a 100-year planetary climate shift?',
      'Weather is short-term and local; climate is long-term and global.',
      'Individual cold weather events do not disprove continuous multi-decade warming trends.'
    ],
    misconceptionIndex: 2,
  },
  // 15. Advanced - Analysis (c6_evs_013)
  {
    id: 'ch_15',
    nodeId: NODE_C6_EVS_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does the retreat of the Gangotri Glacier in the Himalayas threaten long-term food security for hundreds of millions of people in Northern India?',
    options: [
      'Glacial retreat makes river water too cold for rice crops to germinate',
      'Initial seasonal flash flooding will be followed by severe perennial water shortages in the Ganga river basin during dry summer seasons',
      'Melting ice releases massive clouds of toxic sulphur gas directly into wheat farms',
      'Glacial retreat causes the Indian Ocean to dry up entirely'
    ],
    correctIndex: 1,
    explanation: 'Himalayan glaciers act as natural water towers, feeding perennial rivers during dry summer months. As ice mass shrinks, river flows will become erratic, severely impacting agricultural irrigation in the Indo-Gangetic plains.',
    hints: [
      'Where do North Indian rivers like the Ganga get their steady summer water?',
      'When glacier reserves disappear, what happens to river flow between monsoons?',
      'Erratic flows lead to severe dry-season drought and irrigation collapse.'
    ],
  },
  // 16. Advanced - Evaluation (c6_evs_014)
  {
    id: 'ch_16',
    nodeId: NODE_C6_EVS_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What is the core meaning of "Intergenerational Equity" in the context of sustainable natural resource conservation?',
    options: [
      'Every human alive today must consume all mineral reserves before they expire',
      'The present generation must utilize Earth\'s resources responsibly so future generations inherit an equally healthy, productive planet',
      'Grandparents must pay commercial taxes on behalf of their school-going grandchildren',
      'Only ancient tribal settlements are permitted to utilize clean drinking water'
    ],
    correctIndex: 1,
    explanation: 'Intergenerational equity is the ethical mandate that present human development must not compromise or deplete environmental assets, ensuring children and future generations inherit clean air, water, and fertile soil.',
    hints: [
      'Think about the relationship between present generations and future unborn generations.',
      'It is about fairness across time — passing on a healthy planet.',
      'We must leave behind a clean and abundant Earth for our children.'
    ],
    misconceptionIndex: 0,
  },
  // 17. Advanced - Numeric Application (c6_evs_012)
  {
    id: 'ch_17',
    nodeId: NODE_C6_EVS_012,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A residential society of 200 flats generates 1.5 kg of organic kitchen waste per flat daily. If all waste is composted with an 80% volume reduction, how many kg of rich compost are produced every 30 days?',
    correctAnswer: 1800,
    tolerance: 50,
    unit: 'kg compost',
    explanation: 'Total organic waste = 200 flats × 1.5 kg/day × 30 days = 9,000 kg. At 80% volume/mass reduction during decomposition, 20% remains as dense finished compost: 9,000 × 0.20 = 1,800 kg.',
    hints: [
      'Step 1: Find total monthly raw waste = 200 × 1.5 × 30.',
      'Step 2: That gives 9,000 kg of raw waste.',
      'Step 3: If 80% is broken down as moisture and CO2, 20% remains as compost (9,000 × 0.20).'
    ],
  },
  // 18. Advanced - Analysis & Synthesis (c6_evs_011)
  {
    id: 'ch_18',
    nodeId: NODE_C6_EVS_011,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the cause-and-effect chain of winter Smog formation over cities like Delhi in exact sequential order.',
    sortItems: [
      'Emissions: Agricultural stubble burning, vehicular exhaust, and factory fumes release PM2.5 & NO2',
      'Meteorology: Cold winter air traps pollutants near ground level under temperature inversion',
      'Reaction: Smoke particles condense with atmospheric moisture and fog droplets',
      'Public Impact: Dense toxic smog reduces visibility <50m and triggers acute asthma exacerbation'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Smog (smoke + fog) forms when high particulate and chemical emissions get trapped beneath a stagnant cold air inversion layer, causing dense toxic particulate fog that cripples respiratory health.',
    hints: [
      'First comes the release of pollutants from vehicles, farms, and factories.',
      'Second, winter cold air traps these gases near the surface.',
      'Third, smoke physically condenses with moisture to create smog, leading to health crises.'
    ],
  },
  // 19. Advanced - Creativity / Problem Solving (c6_evs_014)
  {
    id: 'ch_19',
    nodeId: NODE_C6_EVS_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are tasked with redesigning a coastal school to achieve Net-Zero environmental degradation. Which combined architectural blueprint is most effective?',
    options: [
      'Rooftop solar panels + rainwater harvesting tank + organic kitchen garden composting + plastic-free canteen policy',
      'Installing 50 high-powered diesel generators to power air conditioners with windows open',
      'Paving over all school gardens with concrete and dumping chemical lab waste directly into the ocean',
      'Burning all school waste in an open pit near classroom windows every morning'
    ],
    correctIndex: 0,
    explanation: 'A sustainable eco-school integrates renewable solar energy, closed-loop water harvesting, organic composting of canteen scraps, and a total ban on single-use polymers.',
    hints: [
      'Look for the holistic solution that addresses energy, water, waste, and community habits.',
      'Solar energy replaces coal, rainwater harvesting conserves groundwater, and composting eliminates food waste.',
      'Option A integrates all core sustainability principles.'
    ],
  },
  // 20. Advanced - Evaluation (c6_evs_013)
  {
    id: 'ch_20',
    nodeId: NODE_C6_EVS_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does sea-level rise caused by global warming threaten low-lying coastal regions like Mumbai, Kolkata, and the Sundarbans with permanent saline intrusion?',
    options: [
      'Warm ocean water turns into dry rock that displaces islands',
      'Thermal expansion of warming seawater combined with glacial runoff raises sea levels, contaminating freshwater aquifers and submerging mangrove delta lands',
      'Sea creatures drink all the freshwater from inland rivers',
      'Global warming makes all ocean waves move backwards into clouds'
    ],
    correctIndex: 1,
    explanation: 'As ocean water absorbs heat it thermally expands, which alongside melting ice sheets raises mean sea level, pushing saltwater into coastal drinking aquifers and destroying delicate Sundarban mangrove habitats.',
    hints: [
      'Water naturally expands when heated (thermal expansion).',
      'Added meltwater from melting land glaciers raises overall ocean volume.',
      'Higher sea levels force saltwater into coastal drinking water wells and low-lying deltas.'
    ],
  },
  // 21. Advanced - Analysis (c6_evs_014)
  {
    id: 'ch_21',
    nodeId: NODE_C6_EVS_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the popular belief that "buying newer energy-efficient gadgets every 6 months is always green" an ecological fallacy?',
    options: [
      'Because electronic factories use zero energy or raw metals',
      'Because manufacturing each new device requires intensive rare-earth mining, water, transport fuel, and generates hazardous toxic e-waste that outweighs minor running efficiency gains',
      'Because all electronic components turn into organic plant compost in 3 days',
      'Because old smartphones do not use any electrical power'
    ],
    correctIndex: 1,
    explanation: 'Embodied carbon and raw material extraction (lithium, copper, gold mining) in manufacturing often exceed the minor operational efficiency gains of frequent upgrades, reinforcing the priority of "Reduce" and longevity.',
    hints: [
      'Think about the mining, water, and factory energy required to build a brand new phone.',
      'Frequent replacements create massive hazardous electronic waste (e-waste).',
      'Using an existing working device for years is far more sustainable than constant upgrades.'
    ],
    misconceptionIndex: 2,
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
  nodeId: NODE_C6_EVS_011,
  title: 'Human Impact on Environment & Sustainable Solutions',
  definition: 'Pollution is the addition of harmful substances into air, water, soil, and acoustics. Proper waste management (3Rs, composting, segregation), mitigating enhanced greenhouse warming, and practicing sustainable development ensure the biosphere is preserved for future generations.',
  eli5: 'Think of Earth as our shared home. If we dump garbage, blow smoke, and leave heaters on full blast, our house becomes toxic and overheated. By cleaning up, reusing our things, and sharing resources wisely, we keep our home healthy and happy forever.',
  misconceptions: [
    {
      misconception: 'Pollution is only about dirty air and vehicle smoke.',
      correction: 'Pollution impacts all four spheres: air (smog, toxic gases), water (sewage, industrial effluent), soil (chemical fertilizers, plastics), and sound (horns, high decibel noise).'
    },
    {
      misconception: 'The greenhouse effect is an unnatural, completely harmful process.',
      correction: 'The natural greenhouse effect keeps Earth at a comfortable +15°C. Without it, Earth would be a frozen -18°C. Only the enhanced greenhouse effect caused by excessive human fossil-fuel emissions causes damaging global warming.'
    },
    {
      misconception: 'Reuse and Recycle mean the exact same thing.',
      correction: 'Reuse means using the existing object again without changing its form (e.g. refilling a glass jar). Recycling requires industrial energy to melt or pulp materials into brand new products.'
    },
    {
      misconception: 'Unlimited consumer wants can easily be solved by building more factories.',
      correction: 'All physical goods require finite natural resources (minerals, freshwater, fossil fuels). Unlimited consumption exhausts finite planetary reserves and generates massive pollution.'
    },
    {
      misconception: 'Chemical fertilizers only help plants grow and cannot harm the soil.',
      correction: 'Excessive synthetic fertilizers kill beneficial soil bacteria and earthworms, degrade long-term soil structure, and wash into rivers causing toxic algae blooms and food chain contamination.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the primary cause of environmental degradation?', options: ['Natural animal migration', 'Excessive addition of human pollutants faster than nature can absorb', 'Rainfall during monsoon', 'Plant photosynthesis'], correctIndex: 1 },
    { question: 'Which gas is a major greenhouse gas released from burning coal and petrol?', options: ['Carbon dioxide (CO2)', 'Helium (He)', 'Pure Hydrogen (H2)', 'Nitrogen gas (N2)'], correctIndex: 0 },
    { question: 'What colour bin is universally used for biodegradable wet organic waste?', options: ['Blue Bin', 'Green Bin', 'Red Bin', 'Yellow Bin'], correctIndex: 1 },
    { question: 'Which of the 3Rs represents the highest ecological priority?', options: ['Recycle', 'Reuse', 'Reduce', 'Replace'], correctIndex: 2 },
    { question: 'What is the consequence of Gangotri glacier melting?', options: ['Permanent increase in ocean freshwater reserves with no risk', 'Initial flooding followed by severe summer river shortages in North India', 'Immediate cooling of the equator by 10°C', 'Total disappearance of all monsoon clouds'], correctIndex: 1 },
    { question: 'Which of the following is a basic biological NEED?', options: ['Smart watch', 'Fast fashion sneakers', 'Safe drinking water and nutrition', 'High-speed gaming laptop'], correctIndex: 2 },
    { question: 'What role do earthworms play in a compost pit?', options: ['They eat plastic wrappers', 'They aerate soil and break organic scraps into nutrient-rich humus', 'They emit harmful greenhouse gases', 'They prevent plants from taking up nitrogen'], correctIndex: 1 },
    { question: 'Intergenerational equity ensures that:', options: ['Future generations inherit clean air, water, and fertile resources', 'Present industries consume all oil reserves immediately', 'Only city dwellers receive electricity', 'Landfills are built in forest reserves'], correctIndex: 0 }
  ],
  masteryCriteria: 'Student understands all four pollution types, distinguishes biodegradable vs non-biodegradable waste, explains the 3Rs & composting, separates the natural greenhouse effect from global warming, and applies sustainable development principles.',
};

// ─── MAIN COMPONENT ───
export function C6_EVSHumanImpactEnvironmentSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Studies', emoji: '🌱', color: 'emerald' };

  // ─── 30+ RICH INTERACTIVE STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery phase state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Predict-then-check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox controls
  const [selectedRealm, setSelectedRealm] = useState<'air' | 'water' | 'soil' | 'noise'>('air');
  const [co2Level, setCo2Level] = useState(380); // ppm (280 to 600)
  const [industrialSmoke, setIndustrialSmoke] = useState(40); // 0 to 100%
  const [sewageDischarge, setSewageDischarge] = useState(35); // 0 to 100%
  const [plasticUseFactor, setPlasticUseFactor] = useState(60); // 0 to 100%
  const [treeCoverArea, setTreeCoverArea] = useState(30); // 0 to 100%
  const [renewableEnergyShare, setRenewableEnergyShare] = useState(20); // 0 to 100%

  // Drag-and-drop & sorting states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Misconceptions tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Town simulator interactive toggles
  const [solarParkActive, setSolarParkActive] = useState(false);
  const [sewageTreatmentActive, setSewageTreatmentActive] = useState(false);
  const [greenBeltActive, setGreenBeltActive] = useState(false);
  const [plasticBanActive, setPlasticBanActive] = useState(false);

  // Exploration lab waste sorting state
  const [sortedLabWaste, setSortedLabWaste] = useState<{ id: string; name: string; type: 'green' | 'blue'; placedIn?: 'green' | 'blue' }[]>([
    { id: 'w1', name: 'Banana Peels', type: 'green' },
    { id: 'w2', name: 'Plastic Soda Bottle', type: 'blue' },
    { id: 'w3', name: 'Used Tea Leaves', type: 'green' },
    { id: 'w4', name: 'Aluminium Can', type: 'blue' },
    { id: 'w5', name: 'Newspaper Scraps', type: 'blue' },
    { id: 'w6', name: 'Leftover Rice', type: 'green' },
  ]);

  // BKT State Ref (persists across challenges)
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED REAL-TIME VALUES ───
  const calculatedGlobalTemp = useMemo(() => {
    // Baseline +15°C at 280 ppm; increases with CO2
    const delta = ((co2Level - 280) / 140) * 1.1;
    return (15.0 + delta).toFixed(1);
  }, [co2Level]);

  const calculatedEcoStressIndex = useMemo(() => {
    let base = 50;
    base += (industrialSmoke * 0.25) + (sewageDischarge * 0.25) + (plasticUseFactor * 0.2);
    base -= (treeCoverArea * 0.3) + (renewableEnergyShare * 0.25);
    if (solarParkActive) base -= 15;
    if (sewageTreatmentActive) base -= 15;
    if (greenBeltActive) base -= 12;
    if (plasticBanActive) base -= 10;
    return Math.max(5, Math.min(100, Math.round(base)));
  }, [industrialSmoke, sewageDischarge, plasticUseFactor, treeCoverArea, renewableEnergyShare, solarParkActive, sewageTreatmentActive, greenBeltActive, plasticBanActive]);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT: LOAD EXISTING MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───
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

  // ─── HTML CANVAS REQUEST-ANIMATION-FRAME PARTICLE EFFECT ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; speed: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.3 + Math.random() * 0.8,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw atmospheric gradient
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      const smogFactor = Math.min(1, industrialSmoke / 100);
      grad.addColorStop(0, `rgba(${30 + smogFactor * 80}, ${41 + smogFactor * 20}, ${59 - smogFactor * 20}, 0.9)`);
      grad.addColorStop(1, `rgba(15, 23, 42, 0.95)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render floating heat / particulate rays
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Green if clean, amber/red if high CO2
        if (co2Level > 450) {
          ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha})`;
        } else if (co2Level > 350) {
          ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha})`;
        } else {
          ctx.fillStyle = `rgba(34, 197, 94, ${p.alpha})`;
        }
        ctx.fill();
      });

      // Draw status pulse line
      ctx.strokeStyle = calculatedEcoStressIndex < 35 ? '#10b981' : calculatedEcoStressIndex < 70 ? '#f59e0b' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, canvas.height - 10);
      ctx.lineTo(canvas.width - 10, canvas.height - 10);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [industrialSmoke, co2Level, calculatedEcoStressIndex]);

  // ─── 14 MEMOISED USECALLBACK HANDLERS ───

  // 1. Reset auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        // Show subtle nudge
        if (activeChallenge.hints && activeChallenge.hints[0]) {
          setCurrentHint(activeChallenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(activeChallenge.hints[0]);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  // 2. Show next escalating hint
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('Here is the comprehensive step-by-step scientific explanation.');
    }
    resetInactivityTimer();
  }, [hintCount, activeChallenge, resetInactivityTimer]);

  // 3. Discovery question answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setDiscoverySelected(idx);
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Brilliant deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 4. Advance phase transitions
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive environmental laboratory. Step through each realm!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the Sundarvan Town Simulator freely. Test and balance all ecological parameters!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission challenges active. Apply your environmental knowledge!');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // 5. Prediction handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the simulator sliders to verify your theory.');
  }, []);

  // 6. Observation handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Spot on observation!' : 'Look closely at how dissolved oxygen drops as bacteria decompose sewage.');
  }, []);

  // 7. Realm selection handler
  const handleRealmSelect = useCallback((realm: 'air' | 'water' | 'soil' | 'noise') => {
    setSelectedRealm(realm);
    audioManager.play('tap');
    const msgs: Record<string, string> = {
      air: 'Air Realm: Factory smoke, vehicle carbon monoxide, and winter smog.',
      water: 'Water Realm: Sewage discharge and chemical runoff deplete dissolved oxygen.',
      soil: 'Soil Realm: Synthetic fertilizers and non-biodegradable plastics poison earthworms.',
      noise: 'Sound Realm: Vehicle horns exceeding 85 decibels trigger stress and harm wildlife.'
    };
    speechManager.speak(msgs[realm]);
  }, []);

  // 8. Waste Sorting Lab Handler
  const handleSortLabWaste = useCallback((wasteId: string, targetBin: 'green' | 'blue') => {
    setSortedLabWaste(prev => prev.map(item => {
      if (item.id === wasteId) {
        const isCorrectBin = item.type === targetBin;
        audioManager.play(isCorrectBin ? 'drop-correct' : 'drop-wrong');
        return { ...item, placedIn: targetBin };
      }
      return item;
    }));
  }, []);

  // 9. Drag handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  // 10. Drag sort handler
  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length > 0 ? prev : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const updated = [...base];
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);
      return updated;
    });
  }, [activeChallenge]);

  // 11. Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully completed the Environmental Impact & Sustainability mission.');
  }, [errors, onComplete]);

  // 12. Next challenge handler
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

  // 13. Answer submission handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(val - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent environmental analysis.');
      setShowConfetti(true);
      setShowExplanation(true);

      // BKT Update
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      // SRS Update
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, String(Math.round(bktStateRef.current.pKnown * 100)));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      // Track Misconception
      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete scientific breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 6000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // 14. Reset entire simulator handler
  const handleResetSimulator = useCallback(() => {
    setCo2Level(380);
    setIndustrialSmoke(40);
    setSewageDischarge(35);
    setPlasticUseFactor(60);
    setTreeCoverArea(30);
    setRenewableEnergyShare(20);
    setSolarParkActive(false);
    setSewageTreatmentActive(false);
    setGreenBeltActive(false);
    setPlasticBanActive(false);
    audioManager.play('chime');
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── SIMULATION TOP BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60">
                ICSE Class 6 • EVS
              </span>
              <span className="text-xs text-slate-400">Nodes: 011 • 012 • 013 • 014</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Real-time Eco Indicators */}
        <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-2xl border border-slate-800">
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Global Avg Temp</p>
            <p className={`text-sm font-black ${parseFloat(calculatedGlobalTemp) > 15.8 ? 'text-rose-400' : 'text-emerald-400'}`}>
              +{calculatedGlobalTemp}°C
            </p>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Eco-Stress</p>
            <p className={`text-sm font-black ${calculatedEcoStressIndex > 60 ? 'text-rose-400' : calculatedEcoStressIndex > 30 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {calculatedEcoStressIndex}%
            </p>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetSimulator}
            aria-label="Reset environmental parameters"
            className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-xs flex items-center gap-1"
          >
            ↺ Reset
          </motion.button>
        </div>
      </div>

      {/* ─── PHASE NAVIGATION TABS ─── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'discovery', label: '1. Curiosity Hook' },
          { key: 'explore', label: '2. Interactive Labs' },
          { key: 'sandbox', label: '3. Sundarvan Sandbox' },
          { key: 'challenge', label: '4. Active Challenges' },
          { key: 'complete', label: '5. Mastery & Reflection' },
        ].map((tab) => {
          const isActive = phase === tab.key;
          return (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setPhase(tab.key as any);
                audioManager.play('tap');
              }}
              aria-label={`Switch to ${tab.label}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/30'
                  : 'bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </motion.button>
          );
        })}
      </div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 md:p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase mb-2">
              <span>🌟 Mission Scenario</span>
            </div>
            <h2 className="text-xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-gold-900/30 text-xs text-gold-200">
              💡 <span className="font-semibold">Your Mission:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/40">
                Curiosity Diagnostic • Non-Graded
              </span>
              <span className="text-xs text-slate-500">Think & Hypothesize</span>
            </div>

            <p className="text-base md:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => {
                const isSelected = discoverySelected === idx;
                const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                let btnStyle = 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border-slate-700';

                if (discoveryAnswered) {
                  if (isSelected && isCorrect) btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200';
                  else if (isSelected && !isCorrect) btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                  else if (isCorrect) btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-300';
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${idx + 1}: ${option}`}
                    className={`p-4 rounded-xl text-left text-sm font-medium border transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold flex-shrink-0 text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-3">
                <div className={`p-4 rounded-xl border text-sm ${discoveryCorrect ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200' : 'bg-amber-950/60 border-amber-700 text-amber-200'}`}>
                  <p className="font-bold mb-1">{discoveryCorrect ? '✓ Excellent Scientific Intuition!' : '💡 Don\'t worry — that is why we explore!'}</p>
                  <p className="text-xs opacity-90">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (Brilliant.org Style) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h3 className="text-lg font-extrabold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
            </div>
            <p className="text-xs text-amber-300 bg-amber-950/60 border border-amber-800/60 px-3 py-1.5 rounded-xl font-medium">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* ─── LAB SLIDE 0: FOUR REALMS OF POLLUTION ─── */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              {/* Realm Selector Cards */}
              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Environmental Sphere</p>
                {[
                  { id: 'air', name: 'Air Realm', icon: '💨', color: 'border-gold-500 bg-gold-950/40 text-gold-300', desc: 'Vehicles, Smog, CO, Acid Rain' },
                  { id: 'water', name: 'Water Realm', icon: '🌊', color: 'border-gold-500 bg-gold-950/40 text-gold-300', desc: 'Sewage, Dyes, Microplastics, Dysentery' },
                  { id: 'soil', name: 'Soil Realm', icon: '🌱', color: 'border-amber-500 bg-amber-950/40 text-amber-300', desc: 'Fertilizers, DDT, Plastic Degradation' },
                  { id: 'noise', name: 'Sound Realm', icon: '📢', color: 'border-rose-500 bg-rose-950/40 text-rose-300', desc: 'Horns >85dB, Stress, Wildlife Trauma' },
                ].map((realm) => (
                  <motion.button
                    key={realm.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleRealmSelect(realm.id as any)}
                    aria-label={`Select ${realm.name}`}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedRealm === realm.id
                        ? `${realm.color} shadow-lg ring-1 ring-white/20 font-bold`
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{realm.icon}</span>
                      <div>
                        <p className="text-sm text-white font-bold">{realm.name}</p>
                        <p className="text-[11px] text-slate-400">{realm.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono">{selectedRealm === realm.id ? '● ACTIVE' : '○'}</span>
                  </motion.button>
                ))}
              </div>

              {/* Dynamic SVG Visualization for Pollution */}
              <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <svg viewBox="0 0 500 300" className="w-full h-auto rounded-lg shadow-inner bg-slate-900/60">
                  {/* Sky Zone */}
                  <rect x="0" y="0" width="500" height="120" fill={selectedRealm === 'air' ? '#1e293b' : '#0f172a'} />
                  {/* Sun / Smog Layer */}
                  <circle cx="430" cy="40" r="25" fill="#f59e0b" opacity="0.8" />
                  {selectedRealm === 'air' && (
                    <g>
                      <path d="M 50 40 Q 150 10 250 40 T 450 40" fill="none" stroke="#94a3b8" strokeWidth="8" strokeDasharray="6 4" opacity="0.7" />
                      <text x="250" y="25" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">Smog & Carbon Monoxide (CO) Cloud</text>
                    </g>
                  )}

                  {/* Ground & Soil Layer */}
                  <rect x="0" y="120" width="500" height="100" fill={selectedRealm === 'soil' ? '#451a03' : '#1e1b4b'} opacity="0.8" />
                  {selectedRealm === 'soil' && (
                    <g>
                      <circle cx="80" cy="160" r="12" fill="#ef4444" opacity="0.8" />
                      <text x="80" y="164" fill="#fff" fontSize="8" textAnchor="middle">DDT</text>
                      <circle cx="150" cy="180" r="14" fill="#f59e0b" opacity="0.8" />
                      <text x="150" y="184" fill="#fff" fontSize="8" textAnchor="middle">Nitrates</text>
                      <text x="300" y="165" fill="#fbbf24" fontSize="11" fontWeight="bold">Soil Degradation & Earthworm Toxicity</text>
                    </g>
                  )}

                  {/* River Water Layer */}
                  <path d="M 0 220 Q 150 200 300 230 T 500 220 L 500 300 L 0 300 Z" fill={selectedRealm === 'water' ? '#1e3a8a' : '#0c4a6e'} />
                  {selectedRealm === 'water' && (
                    <g>
                      <circle cx="120" cy="260" r="8" fill="#ef4444" />
                      <circle cx="280" cy="270" r="10" fill="#a855f7" />
                      <text x="250" y="255" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Sewage Effluent: Dissolved O2 Drop</text>
                    </g>
                  )}

                  {/* Noise Wavefronts */}
                  {selectedRealm === 'noise' && (
                    <g>
                      <circle cx="200" cy="100" r="30" fill="none" stroke="#f43f5e" strokeWidth="3" opacity="0.9" />
                      <circle cx="200" cy="100" r="55" fill="none" stroke="#f43f5e" strokeWidth="2" opacity="0.6" />
                      <circle cx="200" cy="100" r="80" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.3" />
                      <text x="200" y="105" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">Horns & Loudspeakers: 98 dB</text>
                    </g>
                  )}
                </svg>

                <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                  <p className="text-slate-300 font-semibold mb-1">
                    {selectedRealm === 'air' && '💨 Air Solution: Switch public transit to CNG/electric, plant peepal/neem green belts, install chimney filters.'}
                    {selectedRealm === 'water' && '🌊 Water Solution: Mandatory Sewage Treatment Plants (STP) before discharge; stop single-use plastics.'}
                    {selectedRealm === 'soil' && '🌱 Soil Solution: Adopt organic compost & vermiculture, stop burning crop stubble, practice crop rotation.'}
                    {selectedRealm === 'noise' && '📢 Sound Solution: Enforce silence zones near hospitals, silencers on exhausts, restrict loudspeakers after 10 PM.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB SLIDE 1: 3RS WASTE SEGREGATION LAB ─── */}
          {currentSlide === 1 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm text-slate-300">
                  Segregate all items at source into the proper municipal bins:
                </p>
                <div className="text-xs text-slate-400">
                  Sorted: {sortedLabWaste.filter(w => w.placedIn !== undefined).length} / {sortedLabWaste.length}
                </div>
              </div>

              {/* Items Palette */}
              <div className="flex flex-wrap gap-2.5 p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px]">
                {sortedLabWaste.filter(w => w.placedIn === undefined).map(item => (
                  <motion.div
                    key={item.id}
                    layout
                    whileHover={{ scale: 1.05 }}
                    className="px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow"
                  >
                    <span>🗑️ {item.name}</span>
                    <div className="flex gap-1 ml-2">
                      <button
                        onClick={() => handleSortLabWaste(item.id, 'green')}
                        className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-600 rounded text-[10px] text-white"
                        title="Sort to Green Bin"
                      >
                        Green Bin
                      </button>
                      <button
                        onClick={() => handleSortLabWaste(item.id, 'blue')}
                        className="px-2 py-0.5 bg-gold-700 hover:bg-gold-600 rounded text-[10px] text-white"
                        title="Sort to Blue Bin"
                      >
                        Blue Bin
                      </button>
                    </div>
                  </motion.div>
                ))}
                {sortedLabWaste.every(w => w.placedIn !== undefined) && (
                  <p className="text-xs text-emerald-400 font-bold self-center">
                    ✓ All waste successfully segregated at source! Composting and recycling streams are active.
                  </p>
                )}
              </div>

              {/* Bins Drop targets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Green Bin */}
                <div className="p-4 bg-emerald-950/40 rounded-xl border-2 border-emerald-500/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-extrabold text-emerald-300">🟢 Green Bin (Biodegradable / Wet)</span>
                    <span className="text-xs text-emerald-400">Target: Compost Pit</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">Kitchen scraps, fruit peels, tea leaves, fallen garden leaves.</p>
                  <div className="space-y-1.5 min-h-[60px]">
                    {sortedLabWaste.filter(w => w.placedIn === 'green').map(item => (
                      <div key={item.id} className="p-2 bg-emerald-900/60 rounded-lg text-xs font-semibold text-emerald-100 flex justify-between">
                        <span>✓ {item.name}</span>
                        <span className="text-[10px] text-emerald-400">Microbial Humus</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Blue Bin */}
                <div className="p-4 bg-gold-950/40 rounded-xl border-2 border-gold-500/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-extrabold text-gold-300">🔵 Blue Bin (Non-Biodegradable / Dry)</span>
                    <span className="text-xs text-gold-400">Target: Recycling Plant</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">Plastic containers, glass jars, paper, metal cans, cartons.</p>
                  <div className="space-y-1.5 min-h-[60px]">
                    {sortedLabWaste.filter(w => w.placedIn === 'blue').map(item => (
                      <div key={item.id} className="p-2 bg-gold-900/60 rounded-lg text-xs font-semibold text-gold-100 flex justify-between">
                        <span>✓ {item.name}</span>
                        <span className="text-[10px] text-gold-400">Reprocessed Material</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB SLIDE 2: GREENHOUSE HEAT BLANKET SIMULATOR ─── */}
          {currentSlide === 2 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              {/* Predict-then-check block */}
              {!predictionMade ? (
                <div className="p-4 bg-gold-950/60 border border-gold-700/60 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase">
                    <span>🔬 Formulate a Scientific Hypothesis First</span>
                  </div>
                  <p className="text-sm text-white font-bold">{PREDICTION_QUESTIONS[1].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handlePrediction(i)}
                        className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-left text-slate-200 border border-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-950/50 border border-emerald-700 rounded-xl text-xs text-emerald-300">
                  ✓ Hypothesis recorded! {PREDICTION_QUESTIONS[1].verifyInstruction}
                </div>
              )}

              {/* Interactive Atmospheric Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Atmospheric CO2 Concentration</span>
                      <span className={co2Level > 450 ? 'text-rose-400 font-mono' : 'text-emerald-400 font-mono'}>
                        {co2Level} ppm
                      </span>
                    </div>
                    <input
                      type="range"
                      min={280}
                      max={600}
                      value={co2Level}
                      onChange={(e) => {
                        setCo2Level(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-0.5 font-mono">
                      <span>280 ppm (Pre-industrial)</span>
                      <span>420 ppm (Today)</span>
                      <span>600 ppm (Dangerous)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Industrial Smoke / Fossil Fuel Burning</span>
                      <span className="text-amber-400 font-mono">{industrialSmoke}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={industrialSmoke}
                      onChange={(e) => {
                        setIndustrialSmoke(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                    <p className="text-slate-400">Natural baseline temp: <span className="text-emerald-400 font-bold">+15.0°C</span> (Keeps water liquid)</p>
                    <p className="text-slate-400">Simulated current temp: <span className="text-rose-400 font-bold">+{calculatedGlobalTemp}°C</span></p>
                    <p className="text-slate-400">Glacial Retreat Rate: <span className="text-amber-400 font-bold">{Math.round((co2Level - 280) * 0.4)} meters/decade</span></p>
                  </div>
                </div>

                {/* Visual Canvas Render */}
                <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <canvas ref={canvasRef} width={280} height={180} className="w-full h-auto rounded-lg shadow" />
                  <p className="text-[11px] text-slate-400 mt-2 text-center">
                    Red particles = Trapped Infrared Heat Rays re-radiated by atmospheric greenhouse blanket.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB SLIDE 3: NEEDS VS WANTS BALANCE ─── */}
          {currentSlide === 3 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-700/60">
                  <h4 className="text-sm font-extrabold text-emerald-300 mb-2">🌿 Biological Needs (Survival & Dignity)</h4>
                  <p className="text-xs text-slate-300 mb-3">Limited footprint; essentials for human life.</p>
                  <ul className="text-xs space-y-2 text-slate-200">
                    <li className="p-2 bg-slate-900/80 rounded border border-emerald-800/40">💧 2-3 Litres of clean potable water daily</li>
                    <li className="p-2 bg-slate-900/80 rounded border border-emerald-800/40">🌾 Wholesome nutritious grains & vegetables</li>
                    <li className="p-2 bg-slate-900/80 rounded border border-emerald-800/40">🏠 Safe, insulated shelter & basic clothing</li>
                    <li className="p-2 bg-slate-900/80 rounded border border-emerald-800/40">🏥 Essential primary healthcare & schooling</li>
                  </ul>
                </div>

                <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-700/60">
                  <h4 className="text-sm font-extrabold text-rose-300 mb-2">🛍️ Unlimited Wants (Excess Consumption)</h4>
                  <p className="text-xs text-slate-300 mb-3">Multiplies mineral mining, e-waste, and fossil fuels.</p>
                  <ul className="text-xs space-y-2 text-slate-200">
                    <li className="p-2 bg-slate-900/80 rounded border border-rose-800/40">📱 Replacing working smartphones every 8 months (Mining lithium & cobalt)</li>
                    <li className="p-2 bg-slate-900/80 rounded border border-rose-800/40">👗 Fast-fashion garments worn twice and discarded (Water & dye pollution)</li>
                    <li className="p-2 bg-slate-900/80 rounded border border-rose-800/40">🥤 Single-use plastic bottles & disposable utensils (Landfill chokes)</li>
                    <li className="p-2 bg-slate-900/80 rounded border border-rose-800/40">🚗 Solo driving petrol SUVs for 500-metre trips (Air smog)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ─── LAB SLIDE 4: SUSTAINABLE TOWN SIMULATOR ─── */}
          {currentSlide === 4 && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-300">
                Toggle community green infrastructure policies to lower Sundarvan\'s Eco-Stress Index:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { state: solarParkActive, setter: setSolarParkActive, label: '☀️ Solar Power Grid', effect: '-15% Stress' },
                  { state: sewageTreatmentActive, setter: setSewageTreatmentActive, label: '💧 River STP Plant', effect: '-15% Stress' },
                  { state: greenBeltActive, setter: setGreenBeltActive, label: '🌳 Urban Green Belt', effect: '-12% Stress' },
                  { state: plasticBanActive, setter: setPlasticBanActive, label: '🚫 Plastic Ban Policy', effect: '-10% Stress' },
                ].map((item, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      item.setter(!item.state);
                      audioManager.play('tap');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      item.state
                        ? 'bg-emerald-900/60 border-emerald-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <p className="text-xs font-bold">{item.label}</p>
                    <p className="text-[10px] text-emerald-400 mt-1">{item.effect}</p>
                    <p className="text-[10px] font-mono mt-2">{item.state ? '● ENABLED' : '○ DISABLED'}</p>
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Sundarvan Eco-Stress Index</p>
                  <p className={`text-2xl font-black ${calculatedEcoStressIndex < 30 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {calculatedEcoStressIndex}%
                  </p>
                </div>
                <div className="text-right text-xs">
                  <p className="text-slate-300 font-semibold">
                    {calculatedEcoStressIndex < 30 ? '🌿 Outstanding Sustainability Status!' : '⚠️ Moderate Stress — Enable more green policies!'}
                  </p>
                </div>
              </div>
            </div>
          )}

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
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl disabled:opacity-30"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-mono">
              Slide {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-green-950"
              >
                Enter Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Free-Play Sandbox • No Grading Pressure
              </span>
              <h3 className="text-xl font-extrabold text-white">Sundarvan Environmental Control Center</h3>
              <p className="text-xs text-slate-400 mt-1">
                Freely manipulate all sliders and policies to observe how air, water, soil, and climate interconnectedly respond.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            {/* Column 1: Pollution Generators */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">Pollution Sources</h4>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Factory Smoke & Vehicle Exhaust</span>
                  <span className="text-rose-400 font-mono">{industrialSmoke}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={industrialSmoke}
                  onChange={(e) => setIndustrialSmoke(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Raw River Sewage Discharge</span>
                  <span className="text-rose-400 font-mono">{sewageDischarge}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sewageDischarge}
                  onChange={(e) => setSewageDischarge(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Single-Use Plastic Generation</span>
                  <span className="text-rose-400 font-mono">{plasticUseFactor}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={plasticUseFactor}
                  onChange={(e) => setPlasticUseFactor(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Column 2: Conservation & Renewables */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Green Remediation</h4>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Tree Plantation / Green Cover</span>
                  <span className="text-emerald-400 font-mono">{treeCoverArea}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={treeCoverArea}
                  onChange={(e) => setTreeCoverArea(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Solar & Wind Renewable Share</span>
                  <span className="text-emerald-400 font-mono">{renewableEnergyShare}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={renewableEnergyShare}
                  onChange={(e) => setRenewableEnergyShare(Number(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Atmospheric CO2</span>
                  <span className="text-amber-400 font-mono">{co2Level} ppm</span>
                </div>
                <input
                  type="range"
                  min={280}
                  max={600}
                  value={co2Level}
                  onChange={(e) => setCo2Level(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Column 3: Live Output Dashboard */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">Live Eco Dashboard</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 bg-slate-900 rounded">
                    <span className="text-slate-400">Simulated Temp</span>
                    <span className="font-bold text-rose-400">+{calculatedGlobalTemp}°C</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900 rounded">
                    <span className="text-slate-400">Eco-Stress Index</span>
                    <span className="font-bold text-amber-400">{calculatedEcoStressIndex}%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-slate-900 rounded">
                    <span className="text-slate-400">River Oxygen Health</span>
                    <span className="font-bold text-gold-400">{Math.max(10, 100 - sewageDischarge)}%</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 p-2.5 bg-slate-900/60 rounded border border-slate-800">
                💡 <span className="font-semibold text-slate-200">Rule of Sustainability:</span> Keep Stress &lt; 30% by cutting fossil emissions and expanding organic green covers.
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive BKT + Multiple Question Types) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold uppercase bg-slate-800 border border-slate-700 text-slate-300">
                  {activeChallenge.competencyLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">Node Ref: {activeChallenge.nodeId}</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-gold-950 text-gold-300 border border-gold-800'
                }`}
              >
                Tier: {difficulty}
              </motion.span>
              <span className="text-xs text-slate-400 font-mono">Mastery: {masteryLevel}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Challenge Content Area */}
          <div
            className={`p-6 bg-slate-900/90 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600 ring-2 ring-rose-500/50'
                : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {activeChallenge.question}
            </h3>

            {/* MCQ / Distinguish / Classify Question Type */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-2.5">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium border transition-all flex items-start gap-3 ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-bold flex-shrink-0 text-slate-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag Label Diagram Type */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 self-center mr-2">Drag Labels:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'zone_air', title: 'Atmospheric Air Realm' },
                    { id: 'zone_water', title: 'Aquatic River Realm' },
                    { id: 'zone_soil', title: 'Terrestrial Soil Realm' },
                    { id: 'zone_noise', title: 'Acoustic Sound Realm' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs font-bold text-slate-400">{target.title}</span>
                      <div className="mt-2 p-2 bg-slate-900 rounded border border-slate-800 text-xs font-mono font-bold text-emerald-300">
                        {droppedLabels[target.id] || 'Drop matching label here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Diagram Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Sequence Type */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click to reorder the items into proper scientific sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                        setDraggedItem(null);
                      }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center font-mono font-bold text-[11px] text-emerald-400">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-500 text-xs">≡ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Input Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-64 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <span className="text-xs font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Strategy Type */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px]">
                  <p className="text-[10px] text-slate-500 mb-2">Constructed Plan Sequence:</p>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((p, idx) => (
                      <span key={idx} className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs rounded-lg flex items-center gap-2">
                        {idx + 1}. {p}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 text-xs"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600">Click actions above to construct your ecological plan.</span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0 || showExplanation}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE STEP-BY-STEP EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-700/60 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-emerald-400">
                    🔬 Scientific Breakdown & Reasoning
                  </span>
                  <span className="text-xs text-slate-400">Step {revealedSteps + 1} of {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-emerald-100 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400">{sIdx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION, MASTERY & SPACED REPETITION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Top Score Banner */}
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 rounded-2xl border border-emerald-700 text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Sundarvan: Completed!</h2>
            <p className="text-base text-emerald-300 font-bold">
              Final Ecological Score: {Math.max(0, 100 - errors * 5)}% • Mastery Level: {masteryLevel.toUpperCase()}
            </p>
          </div>

          {/* Motivational Feedback Banner */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-sm font-semibold text-emerald-300">
              {errors === 0
                ? '🌟 FLAWLESS PERFORMANCE! You have thoroughly mastered human impact, waste management, greenhouse dynamics, and sustainability!'
                : errors <= 3
                ? '🌿 OUTSTANDING WORK! You possess sharp environmental reasoning. Review the minor pointers below to achieve 100% mastery.'
                : errors <= 6
                ? '💡 GOOD EFFORT! Every solved question strengthens your ecological intuition. Review your misconception profile below.'
                : '🌱 KEEP GROWING! Re-explore the interactive sandbox and laboratory slides to solidify the 3Rs and greenhouse concepts.'}
            </p>
          </div>

          {/* Misconceptions Profile Display */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wide">
                ⚠️ Your Diagnosed Misconception Profile & Corrections:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Common Error: {item.misconception}</p>
                      <p className="text-emerald-300 font-semibold">✓ Scientific Fact: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/60 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase">Spaced Repetition (SM-2 Algorithm)</p>
              <p className="text-xs text-slate-300 mt-0.5">
                Next adaptive review session scheduled in:{' '}
                <span className="text-amber-300 font-bold font-mono">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '24 Hours'}
                </span>
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World 7-Day Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-extrabold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── GLOBAL FEEDBACK FLOATING OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_EVSHumanImpactEnvironmentSim;