'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE CONSTANTS (ALL 10 ISC EVS NODES) ───
const NODE_C12_EVS_001 = 'c12_evs_001'; // Modern schools of ecological thought
const NODE_C12_EVS_002 = 'c12_evs_002'; // Social ecology, ecofeminism, green politics
const NODE_C12_EVS_003 = 'c12_evs_003'; // Sustainable development - concept and evolution
const NODE_C12_EVS_004 = 'c12_evs_004'; // Population dynamics - factors causing population change
const NODE_C12_EVS_005 = 'c12_evs_005'; // Human populations - Malthusian model, demographic transition
const NODE_C12_EVS_006 = 'c12_evs_006'; // Population regulation - exponential and logistic growth
const NODE_C12_EVS_007 = 'c12_evs_007'; // Human population control - family planning, education, status of women
const NODE_C12_EVS_008 = 'c12_evs_008'; // Threats to ecosystem - habitat destruction, genetic erosion
const NODE_C12_EVS_009 = 'c12_evs_009'; // Conservation - importance, Indian forests, conflicts
const NODE_C12_EVS_010 = 'c12_evs_010'; // Pollution monitoring - techniques and standards

const ALL_NODE_IDS = [
  NODE_C12_EVS_001,
  NODE_C12_EVS_002,
  NODE_C12_EVS_003,
  NODE_C12_EVS_004,
  NODE_C12_EVS_005,
  NODE_C12_EVS_006,
  NODE_C12_EVS_007,
  NODE_C12_EVS_008,
  NODE_C12_EVS_009,
  NODE_C12_EVS_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Western Ghats & Hasdeo Arand Ecological Crisis',
  intro: 'You are appointed Chief Environmental Strategist for a biosphere transition project spanning the Western Ghats and Central Indian sal forests. Commercial mining projects, expanding monoculture plantations, rapid demographic pressure, and severe industrial river pollution threaten both indigenous forest communities and endemic biodiversity.',
  context: 'Balance ecological philosophy (Deep vs Shallow Ecology, Bookchin’s Social Ecology, Ecofeminism), demographic growth models (Logistic/Malthusian), wildlife corridor conservation (FRA 2006, JFM), and CPCB/WHO pollution standards to achieve true Sustainable Development.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A mining corporation proposes clear-felling 2,000 hectares of biodiverse Sal forest in Hasdeo Arand, promising to replant 2,000 hectares of commercial Eucalyptus trees and build a state-of-the-art multi-specialty hospital. Under which ecological philosophy is this trade-off REJECTED because ecosystems hold non-negotiable intrinsic value?',
  options: [
    'Weak Sustainability (all capital is interchangeable)',
    'Shallow Ecology (anthropocentric resource optimization)',
    'Deep Ecology & Strong Sustainability (nature has non-substitutable intrinsic value)',
    'Techno-optimism (human technology fully substitutes natural capital)',
  ],
  correctIndex: 2,
  hintAfter: 'Notice how nature is not just a commercial warehouse. Let us investigate why natural capital cannot simply be replaced by factory revenue or timber monocultures!',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Ecological Thought: Shallow vs Deep vs Land Ethic',
    instruction: 'Click on each school of thought to compare its view of human role, nature’s value, and core ethical principle.',
    interactionType: 'click-philosophy',
    nodeId: NODE_C12_EVS_001,
  },
  {
    title: '2. Population Regulation: Exponential (J) vs Logistic (S) Curve',
    instruction: 'Adjust the Carrying Capacity (K) and Intrinsic Growth Rate (r) sliders to observe environmental resistance (K - N)/K in real time.',
    interactionType: 'slider-population',
    nodeId: NODE_C12_EVS_006,
  },
  {
    title: '3. Demographic Transition & Pyramid Dynamics',
    instruction: 'Slide through Demographic Stages 1 to 5 to observe how Birth/Death rates reshape the population pyramid and dependency ratio.',
    interactionType: 'slider-demography',
    nodeId: NODE_C12_EVS_005,
  },
  {
    title: '4. Ecosystem Threats & Wildlife Corridor Restorations',
    instruction: 'Click habitat patches to connect them with vegetated corridors and observe gene flow restoration for the endangered Purple Frog.',
    interactionType: 'click-corridor',
    nodeId: NODE_C12_EVS_008,
  },
  {
    title: '5. Pollution Monitoring: CPCB & WHO Water/Air Standards',
    instruction: 'Simulate river effluent discharge: adjust DO and BOD sliders to see the CPCB Water Classification change from Class A to Class E.',
    interactionType: 'slider-water-cpcb',
    nodeId: NODE_C12_EVS_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an animal population N equals exactly half the carrying capacity (N = K/2) in logistic growth, what happens to the absolute growth rate (dN/dt)?',
    options: [
      'Growth rate dN/dt is at its absolute maximum (inflection point).',
      'Growth rate dN/dt drops to zero.',
      'Environmental resistance becomes 1.0.',
      'Population crashes immediately due to over-competition.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Set N to 500 when K = 1000 on the logistic simulator to verify that absolute rate peaks at K/2!',
    nodeId: NODE_C12_EVS_006,
  },
  {
    question: 'Predict: If an industrial unit discharges untreated organic sewage causing River Dissolved Oxygen (DO) to plummet to 3.2 mg/L and BOD to surge to 5.0 mg/L, what is the highest permitted CPCB Class?',
    options: [
      'Class A (Drinking water without conventional treatment)',
      'Class B (Outdoor bathing)',
      'Class C (Drinking water after conventional treatment)',
      'Class D or E (Propagation of wildlife/irrigation/industrial cooling only)',
    ],
    correctIndex: 3,
    verifyInstruction: 'Adjust the DO slider below 4.0 mg/L in the water monitor to verify the classification drop to Class D/E!',
    nodeId: NODE_C12_EVS_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the environmental resistance term (K - N)/K as population N gets closer and closer to Carrying Capacity K?',
    observableOptions: [
      'The resistance factor approaches 0, slowing growth to a halt (stationary phase).',
      'The resistance factor shoots up to infinity.',
      'The intrinsic growth rate r suddenly becomes negative.',
      'The curve becomes exponential and J-shaped.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_EVS_006,
  },
  {
    question: 'In the Demographic Transition simulation, what happens in Stage 2 when Death Rate falls rapidly while Birth Rate stays high?',
    observableOptions: [
      'Population pyramid base expands dramatically (high youth dependency, population explosion).',
      'Population shrinks immediately as elderly dependency peaks.',
      'The pyramid turns into an inverted top-heavy triangle.',
      'Birth rate automatically drops without female education or social intervention.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_EVS_005,
  },
];

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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE Class 12 EVS) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_evs_001)
  {
    id: 'ch_evs_01',
    nodeId: NODE_C12_EVS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who coined the term "Deep Ecology" in 1973, formulating Ecosophy T and arguing for the intrinsic value of all living beings independent of their usefulness to humans?',
    options: ['Arne Naess', 'Aldo Leopold', 'Murray Bookchin', 'Gro Harlem Brundtland'],
    correctIndex: 0,
    explanation: 'Arne Naess, the Norwegian philosopher, formulated Deep Ecology in 1973, distinguishing it from anthropocentric Shallow Ecology.',
    hints: [
      'Think of the Norwegian mountaineer-philosopher who introduced Ecosophy T.',
      'He rejected anthropocentrism in favor of ecocentrism.',
      'His name is Arne Naess.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (c12_evs_003 - Three Pillars)
  {
    id: 'ch_evs_02',
    nodeId: NODE_C12_EVS_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each core pillar of Sustainable Development to its matching operational focus on the sustainability triangle.',
    dragItems: [
      { label: 'Economic Viability', targetId: 'pillar_econ' },
      { label: 'Social Equity', targetId: 'pillar_soc' },
      { label: 'Environmental Integrity', targetId: 'pillar_env' },
    ],
    correctMapping: {
      pillar_econ: 'Economic Viability',
      pillar_soc: 'Social Equity',
      pillar_env: 'Environmental Integrity',
    },
    explanation: 'Sustainable development rests on a three-legged stool: Economic Viability (fair allocation/prosperity), Social Equity (poverty alleviation/intergenerational justice), and Environmental Integrity (carrying capacity/biodiversity).',
    hints: [
      'Look at the top for ecological carrying capacity, bottom-left for economic prosperity, bottom-right for human equity.',
      'All three legs of the stool must hold simultaneously.',
      'Match Economic to profit/efficiency, Social to people/equity, Environmental to planet/integrity.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Recall (c12_evs_001 - Leopold Land Ethic)
  {
    id: 'ch_evs_03',
    nodeId: NODE_C12_EVS_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Aldo Leopold’s famous 1949 Land Ethic principle states: "A thing is right when it tends to preserve the _______, _______, and _______ of the biotic community; it is wrong when it tends otherwise."',
    options: [
      'wealth, utility, and comfort',
      'integrity, stability, and beauty',
      'efficiency, growth, and industrialization',
      'dominance, exploitation, and supremacy',
    ],
    correctIndex: 1,
    explanation: 'Leopold defined the ethical test of land stewardship verbatim as preserving the integrity, stability, and beauty of the biotic community.',
    hints: [
      'Examiners expect the three exact keywords from "A Sand County Almanac".',
      'They represent wholeness, resilience, and harmonious aesthetics.',
      'The trio is: integrity, stability, and beauty.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Numeric (c12_evs_004 - Population Change Formula)
  {
    id: 'ch_evs_04',
    nodeId: NODE_C12_EVS_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A lake ecosystem has an initial fish population N(t) = 500. Over one year, 90 fish are born (B), 30 die (D), 12 migrate in from a feeder stream (I), and 4 migrate out (E). Calculate N(t+1).',
    correctAnswer: 568,
    tolerance: 0,
    unit: 'fish',
    explanation: 'Using N(t+1) = N(t) + (B - D) + (I - E): N(t+1) = 500 + (90 - 30) + (12 - 4) = 500 + 60 + 8 = 568 fish.',
    hints: [
      'Compute natural increase (B - D) first: 90 - 30 = 60.',
      'Compute net migration (I - E) next: 12 - 4 = 8.',
      'Add both to 500: 500 + 60 + 8 = 568.',
    ],
  },
  // 5. Foundation - Classify (c12_evs_002 - Ecofeminism & Chipko)
  {
    id: 'ch_evs_05',
    nodeId: NODE_C12_EVS_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the 1973 Chipko Movement in Reni (led by Gaura Devi) categorized as an Ecofeminist milestone rather than just general tree-hugging?',
    options: [
      'Village women recognized that commercial patriarchal deforestation directly destroyed their domestic fodder, fuel, and water security, inverting the culture/nature dualism.',
      'It was organized exclusively by commercial timber contractors.',
      'It advocated clear-felling native oak forests to plant quick-growing pines.',
      'It sought to ban agriculture across all Himalayan villages.',
    ],
    correctIndex: 0,
    explanation: 'Ecofeminism connects the patriarchal domination of women to the exploitation of nature; the women of Chipko acted out of their lived material dependence and ecological guardianship.',
    hints: [
      'Consider the link between women’s daily labor for water/fodder and forest health.',
      'Ecofeminism critiques patriarchal dualisms that treat nature and women as disposable resources.',
      'The Reni women stood between axes and trees because the forest sustains life.',
    ],
  },
  // 6. Foundation - Drag Sort (c12_evs_003 - Sustainability Timeline)
  {
    id: 'ch_evs_06',
    nodeId: NODE_C12_EVS_003,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these landmark global environmental milestones in chronological order from earliest to most recent.',
    sortItems: [
      'Stockholm UN Conference on Human Environment (UNEP created) [1972]',
      'Brundtland Report "Our Common Future" (Defined Sustainable Dev) [1987]',
      'Rio Earth Summit (Agenda 21 & CBD adopted) [1992]',
      'UN 2030 Agenda (17 Sustainable Development Goals - SDGs) [2015]',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The timeline progresses from Stockholm (1972) → Brundtland (1987) → Rio Earth Summit (1992) → UN 2030 Agenda SDGs (2015).',
    hints: [
      'Stockholm was the pioneer meeting in 1972.',
      'Brundtland coined the sustainable development definition in 1987.',
      'Rio followed in 1992, leading up to the 17 SDGs adopted in 2015.',
    ],
  },
  // 7. Standard - Numeric (c12_evs_006 - Logistic Growth Rate dN/dt)
  {
    id: 'ch_evs_07',
    nodeId: NODE_C12_EVS_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A spotted deer (Chital) population in Corbett has size N = 200, intrinsic growth rate r = 0.4 per year, and habitat carrying capacity K = 800. Calculate the instantaneous growth rate dN/dt in deer/year.',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: 'deer/year',
    explanation: 'dN/dt = rN[(K - N)/K] = 0.4 × 200 × [(800 - 200)/800] = 80 × (600/800) = 80 × 0.75 = 60 deer/year.',
    hints: [
      'Use the logistic formula: dN/dt = r × N × (K - N) / K.',
      'Environmental resistance term = (800 - 200) / 800 = 600 / 800 = 0.75.',
      'Multiply: 0.4 × 200 × 0.75 = 60.',
    ],
  },
  // 8. Standard - Analysis (c12_evs_005 - Demographic Transition Stage)
  {
    id: 'ch_evs_08',
    nodeId: NODE_C12_EVS_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Country X exhibits a Crude Birth Rate of 36 per 1,000, a plunging Crude Death Rate of 7 per 1,000 due to public health interventions, and an expansive pyramid with a wide base. Which demographic transition stage is it in?',
    options: [
      'Stage 1 (High stationary: fluctuating high birth and death rates)',
      'Stage 2 (Early expanding: death rate falls rapidly, high birth rate causing population explosion)',
      'Stage 3 (Late expanding: birth rate rapidly drops toward death rate)',
      'Stage 5 (Declining: death rate exceeds birth rate, inverted pyramid)',
    ],
    correctIndex: 1,
    explanation: 'Stage 2 is characterized by a rapid drop in mortality while fertility remains high, causing a high rate of natural increase (36 - 7 = 29 per 1000 or 2.9% per year) and high youth dependency.',
    hints: [
      'Notice the wide gap between a high birth rate (36) and a low death rate (7).',
      'The death rate has dropped due to sanitation/medicine, but birth rates have not yet adjusted.',
      'This matches the classic early industrial explosion of Stage 2.',
    ],
  },
  // 9. Standard - Application (c12_evs_008 - Threat Chain Western Ghats)
  {
    id: 'ch_evs_09',
    nodeId: NODE_C12_EVS_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the Western Ghats, converting native Shola evergreen forests into commercial tea/coffee estates severs breeding corridors of the endemic subterranean Purple Frog (Nasikabatrachus sahyadrensis). What is the direct genetic consequence for the isolated frog subpopulations?',
    options: [
      'Genetic erosion and inbreeding depression resulting from population bottlenecks and severed gene flow.',
      'Sudden doubling of genetic variation and enhanced adaptive resistance.',
      'Transition from K-selection to r-selection without population decline.',
      'Complete immunity to fungal chytrid pathogens.',
    ],
    correctIndex: 0,
    explanation: 'Habitat fragmentation restricts breeding to small isolated pools, causing bottlenecks, severe inbreeding, loss of heterozygosity (genetic erosion), and vulnerability to local extirpation.',
    hints: [
      'Think what happens when animals can only mate with close relatives in tiny patches.',
      'Isolated small populations lose alleles over time.',
      'This is genetic erosion caused by habitat fragmentation.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Distinguish (c12_evs_003 - Weak vs Strong Sustainability)
  {
    id: 'ch_evs_10',
    nodeId: NODE_C12_EVS_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do "Weak Sustainability" and "Strong Sustainability" fundamentally differ regarding natural capital?',
    options: [
      'Weak sustainability assumes natural and manufactured capital are substitutable; Strong sustainability insists critical natural capital (climate stability, ozone layer, biodiversity) is non-substitutable.',
      'Weak sustainability protects all wildlife; Strong sustainability allows full deforestation.',
      'Weak sustainability is adopted by the UN; Strong sustainability is rejected by all ecologists.',
      'Weak sustainability applies only to agriculture; Strong sustainability applies only to factories.',
    ],
    correctIndex: 0,
    explanation: 'Weak sustainability posits that depleted nature can be compensated by factories/technology. Strong sustainability asserts that ecosystem life-support functions cannot be replaced by money or machinery.',
    hints: [
      'Focus on the word "substitutability". Can a factory replace the ozone layer or hydrological cycle?',
      'Strong sustainability views the biosphere as the non-negotiable container of the economy.',
      'Weak sustainability believes financial capital can compensate for ecological loss.',
    ],
    misconceptionIndex: 1,
  },
  // 11. Standard - Construct (c12_evs_002 - Social Ecology Causal Chain)
  {
    id: 'ch_evs_11',
    nodeId: NODE_C12_EVS_002,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble Murray Bookchin’s Social Ecology argument by selecting the correct sequence of concepts showing how social inequality drives ecological breakdown.',
    availableParts: ['Social Hierarchies & Class Domination', '→', 'Domination Projected onto Nature', '→', 'Commodification & Ecological Crisis', '→', 'Libertarian Municipalism Solution'],
    targetState: 'Social Hierarchies & Class Domination → Domination Projected onto Nature → Commodification & Ecological Crisis → Libertarian Municipalism Solution',
    validationHint: 'Start with human social hierarchy, show projection onto nature, leading to commodification, ending with municipal democracy.',
    explanation: 'Bookchin argued that the notion of dominating nature stems from the domination of human by human. Resolving ecological crises requires dismantling hierarchy via libertarian municipalism.',
    hints: [
      'First part: Social Hierarchies & Class Domination.',
      'Second part: Domination Projected onto Nature.',
      'Followed by Commodification, ending in Libertarian Municipalism.',
    ],
  },
  // 12. Standard - Application (c12_evs_009 - Forest Rights Act 2006)
  {
    id: 'ch_evs_10b',
    nodeId: NODE_C12_EVS_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How does the Forest Rights Act (FRA) 2006 shift Indian conservation practice away from colonial "fortress conservation"?',
    options: [
      'By vesting legal individual title (pattas) and community rights (CFR) with forest-dwelling scheduled tribes, making them co-custodians rather than encroachers.',
      'By handing over all national parks to multinational mining corporations.',
      'By banning indigenous communities from harvesting even fallen deadwood and medicinal herbs.',
      'By abolishing the Wildlife Protection Act 1972 completely.',
    ],
    correctIndex: 0,
    explanation: 'FRA 2006 (Scheduled Tribes and Other Traditional Forest Dwellers Act) redressed historic injustice by legally recognizing pre-existing individual and community rights over forest lands.',
    hints: [
      'Think about who lived in the forests before British forestry acts declared them state property.',
      'FRA 2006 provides community rights over non-timber forest produce (NTFP).',
      'It empowers gram sabhas to manage and conserve community forest resources.',
    ],
    misconceptionIndex: 4,
  },
  // 13. Standard - Distinguish (c12_evs_010 - CPCB Water Class A vs D)
  {
    id: 'ch_evs_12',
    nodeId: NODE_C12_EVS_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under CPCB Designated Best Use classification, what are the primary Dissolved Oxygen (DO) and Biochemical Oxygen Demand (BOD) standards for Class A (Drinking water source without conventional treatment)?',
    options: [
      'DO ≥ 6.0 mg/L and BOD ≤ 2.0 mg/L',
      'DO ≤ 3.0 mg/L and BOD ≥ 10.0 mg/L',
      'DO ≥ 4.0 mg/L and BOD ≤ 3.0 mg/L',
      'DO not specified and BOD ≤ 50.0 mg/L',
    ],
    correctIndex: 0,
    explanation: 'CPCB Class A requires pristine water: Dissolved Oxygen must be at least 6 mg/L, and Biochemical Oxygen Demand (organic pollution) must not exceed 2 mg/L.',
    hints: [
      'Class A represents the highest water quality in India.',
      'High dissolved oxygen (≥ 6 mg/L) is required.',
      'BOD must be very low (≤ 2 mg/L).',
    ],
  },
  // 14. Advanced - Application (c12_evs_007 - Kerala vs UP Model)
  {
    id: 'ch_evs_13',
    nodeId: NODE_C12_EVS_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Kerala achieved below replacement-level fertility (TFR ~1.8) decades ahead of high-fertility states like UP/Bihar without coercive laws. What was the decisive socioeconomic driver?',
    options: [
      'High female literacy (>90%), delayed marriage age, female health autonomy, and universal primary healthcare ("The Girl Effect").',
      'A strict legally enforced one-child quota with job terminations for non-compliance.',
      'Rapid large-scale heavy industrialization without social sector investment.',
      'Banning of all modern contraception methods.',
    ],
    correctIndex: 0,
    explanation: 'The Kerala model proved that female education, healthcare access, and social status are the most effective voluntary population stabilizers, naturally lowering the Total Fertility Rate.',
    hints: [
      'Consider the role of education in delaying marriage and increasing career opportunity costs.',
      'Kerala prioritized primary health centers and girl child schooling.',
      'This voluntary social transformation is known as the "Girl Effect".',
    ],
  },
  // 15. Advanced - Analysis (c12_evs_009 - ISFR Forest Report Canopy Density)
  {
    id: 'ch_evs_14',
    nodeId: NODE_C12_EVS_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The India State of Forest Report (ISFR 2021) shows total forest cover at 21.71%. Why do conservation ecologists warn that this headline number masks severe qualitative forest degradation?',
    options: [
      'Area increases are driven by low-biodiversity Open Forests (10–40% canopy) and commercial monoculture plantations, while mature Moderately Dense Forests (40–70% canopy) are actively declining.',
      'All dense forests have expanded by over 90% across the Himalayas.',
      'Canopy density is irrelevant to ecological services and carbon storage.',
      'Mangrove forests have replaced all terrestrial deciduous forests.',
    ],
    correctIndex: 0,
    explanation: 'ISFR data reveals that while open scrub and monoculture tree cover expanded, species-rich moderately dense natural forests shrank, masking loss of true biodiversity and canopy integrity.',
    hints: [
      'Look past total hectares to canopy quality (Very Dense vs Moderately Dense vs Open).',
      'Plantations like Eucalyptus or rubber count as "forest cover" in satellite imagery.',
      'Ecologists highlight the loss of mature, biodiverse natural forest canopies.',
    ],
  },
  // 16. Advanced - Evaluation (c12_evs_005 - Malthus vs Green Revolution)
  {
    id: 'ch_evs_15',
    nodeId: NODE_C12_EVS_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Thomas Malthus (1798) predicted geometric population growth (1, 2, 4, 8) would outpace arithmetic food production (1, 2, 3, 4), causing inevitable mass starvation. Why was his core predictive model falsified in 20th-century India?',
    options: [
      'Technological breakthroughs (Borlaug’s Green Revolution, HYV seeds, fertilizers) enabled geometric jumps in agricultural yields, while voluntary demographic transition lowered TFR without positive checks.',
      'India’s human population completely stopped reproducing after 1850.',
      'Malthus was entirely correct and food supply never grew beyond 1798 levels.',
      'Human populations are strictly r-selected and crash every 4 years.',
    ],
    correctIndex: 0,
    explanation: 'Malthus failed to anticipate technological leaps (HYV seeds, mechanization, Haber-Bosch nitrogen fixation) and social self-regulation (demographic transition through urban development and education).',
    hints: [
      'Think about Norman Borlaug, MS Swaminathan, and Indian wheat harvests leaping from 12 MT to over 100 MT.',
      'Malthus treated food yields and birth rates as fixed biological constants.',
      'Both technology and voluntary fertility decline transformed outcomes.',
    ],
  },
  // 17. Advanced - Drag Sort (c12_evs_008 - Habitat Threat Cascade)
  {
    id: 'ch_evs_16',
    nodeId: NODE_C12_EVS_008,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the cascading steps of ecological disruption from agricultural expansion to species extirpation.',
    sortItems: [
      '1. Forest clearance & expansion of intensive monoculture cropland',
      '2. Physical habitat fragmentation & severing of wildlife corridors',
      '3. Population bottlenecks & loss of gene flow (Genetic Erosion)',
      '4. Reduced adaptability, disease vulnerability & Local Extirpation',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The threat cascade runs: Expanding agriculture → Habitat fragmentation → Genetic erosion in isolated demes → Extirpation and biodiversity loss.',
    hints: [
      'Start with the land-use conversion for agriculture.',
      'This cuts habitats into isolated patches.',
      'Isolated patches cause genetic bottlenecks, leading to extinction/extirpation.',
    ],
  },
  // 18. Advanced - Numeric (c12_evs_010 - NAAQS vs WHO PM2.5 Gap)
  {
    id: 'ch_evs_17',
    nodeId: NODE_C12_EVS_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'India’s National Ambient Air Quality Standard (NAAQS) annual permissible limit for PM2.5 is 40 µg/m³. The WHO Air Quality Guideline annual limit is 15 µg/m³. By what percentage is the Indian standard more lenient than the WHO guideline?',
    correctAnswer: 166.7,
    tolerance: 2,
    unit: '% higher',
    explanation: 'Percentage difference = [(40 - 15) / 15] × 100 = (25 / 15) × 100 = 166.67%. India’s limit is ~167% higher due to diffuse sources (dust, biomass cooking) and economic feasibility constraints.',
    hints: [
      'Difference = 40 - 15 = 25 µg/m³.',
      'Divide by baseline WHO limit (15): 25 / 15 = 1.6667.',
      'Multiply by 100 to get percentage: ~166.7%.',
    ],
  },
  // 19. Advanced - Evaluation (c12_evs_007 - China One-Child Coercion)
  {
    id: 'ch_evs_18',
    nodeId: NODE_C12_EVS_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluating coercive population policies: What severe long-term demographic imbalances did China’s coercive One-Child Policy (1979–2015) produce?',
    options: [
      'A rapidly inverted population pyramid with extreme elderly dependency and an acute sex-ratio distortion (~119 boys per 100 girls due to son preference).',
      'An explosion in youth population and zero elderly citizens.',
      'An immediate 1:1 balanced gender ratio and universal prosperity.',
      'Permanent elimination of all economic inequality.',
    ],
    correctIndex: 0,
    explanation: 'Coercive birth control accelerated a severe elderly dependency crisis (4-2-1 family burden) and tragic female infanticide/feticide skewing the sex ratio, demonstrating why voluntary empowerment is vastly superior.',
    hints: [
      'Look for the dual crises: rapid aging of the workforce and distorted gender ratios.',
      'Son preference combined with a one-child cap led to sex-selective abortions.',
      'The result is a top-heavy inverted pyramid with ~119 boys per 100 girls.',
    ],
  },
  // 20. Advanced - Application (c12_evs_009 - Silent Valley vs Hasdeo Arand)
  {
    id: 'ch_evs_19',
    nodeId: NODE_C12_EVS_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Contrast the historic 1983 Silent Valley movement outcome in Kerala with current Hasdeo Arand forest conflicts in Chhattisgarh.',
    options: [
      'Silent Valley hydro-dam was scrapped to save pristine tropical rainforests and lion-tailed macaques; Hasdeo Arand faces ongoing fragmentation due to open-cast coal block clearances despite designated biodiversity richness.',
      'Both forests were fully logged with zero public mobilization.',
      'Hasdeo Arand was declared a national park in 1983, while Silent Valley was converted to a mega thermal power station.',
      'There is no conflict in either landscape.',
    ],
    correctIndex: 0,
    explanation: 'Silent Valley was a landmark victory where public mobilization and ecological science halted a dam project; Hasdeo Arand remains an active frontline between coal mining demand and indigenous tribal/forest conservation.',
    hints: [
      'Silent Valley involved the Kerala Sashtra Sahitya Parishad saving the Lion-tailed macaque.',
      'Hasdeo Arand in Central India is a contiguous Sal elephant corridor facing coal mining pressures.',
      'This highlights the enduring tension between developmental projects and forest preservation.',
    ],
  },
  // 21. Advanced - Drag Label (c12_evs_006 - Sigmoid Phases)
  {
    id: 'ch_evs_20',
    nodeId: NODE_C12_EVS_006,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'Label the three distinct developmental phases on the logistic population growth sigmoid (S-curve).',
    dragItems: [
      { label: 'Lag Phase (Initial slow growth)', targetId: 'curve_lag' },
      { label: 'Log/Exponential Phase (Peak dN/dt)', targetId: 'curve_log' },
      { label: 'Stationary Phase (N ≈ K equilibrium)', targetId: 'curve_stat' },
    ],
    correctMapping: {
      curve_lag: 'Lag Phase (Initial slow growth)',
      curve_log: 'Log/Exponential Phase (Peak dN/dt)',
      curve_stat: 'Stationary Phase (N ≈ K equilibrium)',
    },
    explanation: 'The logistic S-curve proceeds from the initial slow adaptation (Lag Phase), into rapid acceleration where resources are abundant (Log Phase), and stabilizes at Carrying Capacity K (Stationary Phase).',
    hints: [
      'Early flat region at the bottom = Lag Phase.',
      'Steep middle incline = Log/Exponential Phase.',
      'Top horizontal plateau at K = Stationary Phase.',
    ],
  },
  // 22. Advanced - Creativity (c12_evs_010 - GRAP & NAMP Air Policy)
  {
    id: 'ch_evs_21',
    nodeId: NODE_C12_EVS_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'When Continuous Ambient Air Monitoring Stations (CAAMS) in Delhi record 24-hour PM2.5 levels exceeding 300 µg/m³ ("Severe+" category under NAAQS), which policy protocol is legally triggered?',
    options: [
      'Graded Response Action Plan (GRAP Stage IV): Banning non-BS-VI diesel trucks, halting construction, and shifting schools to online mode.',
      'Complete shutdown of all agricultural farms across India indefinitely.',
      'Immediate abolition of all environmental monitoring stations.',
      'Voluntary tree plantation advisory without any transport or industrial restrictions.',
    ],
    correctIndex: 0,
    explanation: 'The Graded Response Action Plan (GRAP) operationalizes compliance monitoring by mandating escalating emergency curbs (diesel bans, industrial halts) as pollutant thresholds are breached.',
    hints: [
      'Think of Delhi’s winter emergency smog action plan.',
      'It is called GRAP (Graded Response Action Plan).',
      'Stage IV includes vehicle bans and construction stoppage.',
    ],
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Western Ghats Eco-Restoration Policy Architect',
  description: 'Design an integrated Master Plan for an ecologically sensitive taluka in the Western Ghats facing quarrying, tea monocultures, and human-wildlife conflict.',
  steps: [
    'Apply Deep Ecology & Leopold’s Land Ethic to declare critical Shola-grassland ridges as non-negotiable core zones.',
    'Map a 3-km wide eco-corridor across private estates to restore gene flow for the Purple Frog and Asian Elephant.',
    'Formulate a Community Forest Resource (CFR) title under FRA 2006 for indigenous Kadar/Irula honey-gatherers.',
    'Establish three solar-powered CPCB-standard NAMP river and air monitoring stations with public Sameer App feeds.',
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
  nodeId: NODE_C12_EVS_001,
  title: 'Modern Schools of Ecological Thought & Ecosystem Dynamics',
  definition: 'An integrated framework covering ecocentrism vs anthropocentrism, social ecology, ecofeminism, demographic transition, population growth mathematics (dN/dt), biodiversity threat cascades, and CPCB/WHO environmental standards.',
  eli5: 'Think of Earth as a shared home. Some say care for it only so we can live well (Shallow); others say every creature has equal right to life (Deep). When human numbers multiply too fast, ecosystems get crowded, fragmented, and polluted. By combining science, fairness, and forest rights, we protect our living planet.',
  misconceptions: [
    { misconception: 'Deep ecology and social ecology are identical.', correction: 'Deep ecology (Naess) centers on ecocentrism and intrinsic value of nature; Social ecology (Bookchin) argues social hierarchies and class domination cause environmental destruction.' },
    { misconception: 'Sustainable development means we can substitute all natural forests with factories if profits are equal.', correction: 'That is Weak Sustainability. Strong Sustainability proves critical natural capital (climate, ozone, watersheds) is non-substitutable.' },
    { misconception: 'Aldo Leopold’s Land Ethic is just loose tree-hugging advice.', correction: 'It is a rigorous ethical standard: "A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community; it is wrong when it tends otherwise."' },
    { misconception: 'Genetic erosion only occurs when an entire species goes extinct.', correction: 'Genetic erosion is the loss of internal genetic variability within a species due to monoculture or bottlenecks, making living populations fragile.' },
    { misconception: 'India’s National Ambient Air Quality Standards (NAAQS) are identical to WHO guidelines.', correction: 'NAAQS limits (e.g. PM2.5 at 40 µg/m³) are more lenient than WHO guidelines (15 µg/m³) due to socioeconomic feasibility and diffuse dust sources.' },
  ],
  diagnosticQuestions: [
    { question: 'Who formulated Deep Ecology in 1973?', options: ['Arne Naess', 'Aldo Leopold', 'Murray Bookchin', 'Rachel Carson'], correctIndex: 0 },
    { question: 'What is the Brundtland definition of sustainable development centered on?', options: ['Meeting present needs without compromising future generations', 'Maximizing short-term industrial profit', 'Banning all technological development', 'Exporting resources abroad'], correctIndex: 0 },
    { question: 'What does environmental resistance (K - N)/K represent in the logistic growth equation?', options: ['The braking factor slowing growth as N approaches carrying capacity', 'The intrinsic birth rate', 'The rate of immigration', 'The extinction coefficient'], correctIndex: 0 },
    { question: 'Which Indian Act recognizes community forest rights of indigenous tribes?', options: ['Forest Rights Act (FRA) 2006', 'Forest Conservation Act 1980', 'Air Act 1981', 'Factories Act 1948'], correctIndex: 0 },
    { question: 'What does an expansive, broad-based population pyramid signify?', options: ['High birth rate and high youth dependency (Stage 2)', 'Shrinking population (Stage 5)', 'Zero population growth (Stage 4)', 'Rapidly aging society'], correctIndex: 0 },
    { question: 'What is the CPCB Class A standard for Dissolved Oxygen?', options: ['DO ≥ 6.0 mg/L', 'DO ≤ 2.0 mg/L', 'DO = 0 mg/L', 'DO ≥ 15.0 mg/L'], correctIndex: 0 },
    { question: 'What did the Chipko Movement of 1973 demonstrate?', options: ['Ecofeminist grassroots resistance against commercial logging', 'Corporate timber harvesting optimization', 'Nuclear energy expansion', 'Monoculture Eucalyptus cultivation'], correctIndex: 0 },
    { question: 'Why is replacement of 30,000 traditional rice varieties by a few HYVs dangerous?', options: ['Causes severe genetic erosion and vulnerability to new pathogens', 'Increases soil organic matter too quickly', 'Eliminates all weeds permanently', 'Triples biodiversity automatically'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of modern ecological thought, mathematical population dynamics, demographic transitions, conservation conflicts, and environmental monitoring standards.',
};

// ─── MAIN COMPONENT ───
function C12_EVSModernSchoolsEcologicalSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_EVS_001,
  title = DEFAULT_PROPS.title || 'Modern Schools of Ecological Thought & Conservation',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['evs'] || { name: 'Environmental Science', emoji: '🌿', color: 'emerald' };

  // ─── RICH STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery & Predict State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Interactive Sim Variable State
  const [selectedSchool, setSelectedSchool] = useState<'shallow' | 'deep' | 'land_ethic' | 'social_eco' | 'ecofem'>('deep');
  const [popN, setPopN] = useState<number>(200);
  const [growthR, setGrowthR] = useState<number>(0.5);
  const [carryingK, setCarryingK] = useState<number>(1000);
  const [demogStage, setDemogStage] = useState<number>(2);
  const [waterDO, setWaterDO] = useState<number>(6.5);
  const [waterBOD, setWaterBOD] = useState<number>(1.5);
  const [pm25Value, setPm25Value] = useState<number>(45);
  const [corridorConnected, setCorridorConnected] = useState<boolean>(false);
  const [corridorWidth, setCorridorWidth] = useState<number>(1.5);

  // Challenge & Interaction State
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
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual Animation & Feedback State
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES (Real-Time Physics & Ecology Calculations) ───
  const environmentalResistance = useMemo(() => {
    return Math.max(0, (carryingK - popN) / carryingK);
  }, [carryingK, popN]);

  const logisticGrowthRate = useMemo(() => {
    return growthR * popN * environmentalResistance;
  }, [growthR, popN, environmentalResistance]);

  const waterClassification = useMemo(() => {
    if (waterDO >= 6.0 && waterBOD <= 2.0) return { code: 'Class A', label: 'Drinking without conventional treatment', color: 'emerald' };
    if (waterDO >= 5.0 && waterBOD <= 3.0) return { code: 'Class B', label: 'Outdoor Bathing', color: 'blue' };
    if (waterDO >= 4.0 && waterBOD <= 3.0) return { code: 'Class C', label: 'Drinking after conventional treatment', color: 'amber' };
    if (waterDO >= 4.0) return { code: 'Class D', label: 'Fish/Wildlife Propagation & Irrigation', color: 'orange' };
    return { code: 'Class E', label: 'Industrial Cooling & Controlled Waste', color: 'rose' };
  }, [waterDO, waterBOD]);

  const aqiCategory = useMemo(() => {
    if (pm25Value <= 30) return { category: 'Good', color: 'text-emerald-400', bar: 'bg-emerald-500' };
    if (pm25Value <= 60) return { category: 'Satisfactory (Within 24h NAAQS)', color: 'text-green-400', bar: 'bg-green-500' };
    if (pm25Value <= 90) return { category: 'Moderate', color: 'text-amber-400', bar: 'bg-amber-500' };
    if (pm25Value <= 120) return { category: 'Poor', color: 'text-orange-400', bar: 'bg-orange-500' };
    if (pm25Value <= 250) return { category: 'Very Poor', color: 'text-rose-400', bar: 'bg-rose-500' };
    return { category: 'Severe+ (GRAP Stage IV Trigger)', color: 'text-purple-400', bar: 'bg-purple-600' };
  }, [pm25Value]);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── HTML5 CANVAS PARTICLE & CURVE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background grid lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let x = 30; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 20; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Carrying Capacity K line
      const kY = canvas.height - (carryingK / 1200) * (canvas.height - 30) - 15;
      ctx.strokeStyle = '#f43f5e';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(20, kY);
      ctx.lineTo(canvas.width - 20, kY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f43f5e';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Carrying Capacity K = ${carryingK}`, canvas.width - 160, kY - 5);

      // Draw dynamic Logistic S-curve
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const points = 100;
      for (let i = 0; i <= points; i++) {
        const tVal = (i / points) * 12 - 6;
        const sigmoid = carryingK / (1 + Math.exp(-growthR * tVal));
        const px = 30 + (i / points) * (canvas.width - 60);
        const py = canvas.height - (sigmoid / 1200) * (canvas.height - 30) - 15;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Draw current population indicator dot
      const currentNorm = Math.max(-5.5, Math.min(5.5, Math.log(popN / Math.max(1, carryingK - popN)) / growthR));
      const dotX = 30 + ((currentNorm + 6) / 12) * (canvas.width - 60);
      const dotY = canvas.height - (popN / 1200) * (canvas.height - 30) - 15;

      ctx.beginPath();
      ctx.arc(dotX, dotY, 6 + Math.sin(time * 3) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`N = ${popN} (dN/dt = ${logisticGrowthRate.toFixed(1)}/yr)`, dotX - 45, Math.max(20, dotY - 12));

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [popN, growthR, carryingK, logisticGrowthRate]);

  // ─── CALLBACK HANDLERS ───
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
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand intrinsic ecological value.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Ecological Exploration Lab. Interact with the models to discover the core concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the live ecosystem and pollution simulators freely with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your knowledge across the ISC Class 12 competency challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction registered! Now test the sliders to see the live ecological outcome.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the curve plateau as N nears K.');
  }, []);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered ISC Class 12 Ecological Thought and Ecosystem Dynamics.');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Brilliant! That is conceptually exact.');
      setShowConfetti(true);
      setShowExplanation(true);
      setShowSparkle(true);
      setSparklePos({ x: 300, y: 200 });

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us review the step-by-step ISC explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === activeChallenge.sortItems?.length ? [...prev] : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = initial.splice(fromIndex, 1);
      initial.splice(toIndex, 0, moved);
      return initial;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length === activeChallenge.sortItems?.length ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
            className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ISC Class 12 • EVS
              </span>
              <span className="text-xs text-slate-400">10 Core Units</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-400">Mastery Level</p>
            <motion.span
              key={masteryLevel}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-sm font-bold capitalize text-emerald-400"
            >
              {masteryLevel}
            </motion.span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-green-500/20 text-green-300 border border-green-500/40' :
              difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
              'bg-blue-500/20 text-blue-300 border border-blue-500/40'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/40">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🎯</span> Real-World Scenario Hook
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-4">{SCENARIO.intro}</p>
            <div className="p-4 bg-slate-950/70 rounded-xl border border-indigo-900/50 text-xs sm:text-sm text-indigo-200">
              💡 <span className="font-bold">Your Mission:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">Curiosity Diagnostic:</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition-all ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-slate-800">
                <p className={`text-sm mb-4 font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Deep Ecology insists on intrinsic, non-substitutable nature.' : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 flex items-center gap-2"
                >
                  Enter Interactive Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-8 bg-emerald-500' : i < currentSlide ? 'w-3 bg-emerald-800' : 'w-3 bg-slate-800'
                  }`}
                />
              ))}
            </div>
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
              <div>
                <h3 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-emerald-400 text-sm font-semibold mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: Ecological Schools Comparator */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'shallow', label: 'Shallow Ecology', icon: '🏭' },
                      { id: 'deep', label: 'Deep Ecology (Naess)', icon: '🌲' },
                      { id: 'land_ethic', label: 'Land Ethic (Leopold)', icon: '🦌' },
                      { id: 'social_eco', label: 'Social Ecology (Bookchin)', icon: '⚖️' },
                      { id: 'ecofem', label: 'Ecofeminism (Shiva)', icon: '🌱' },
                    ].map(school => (
                      <motion.button
                        key={school.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSchool(school.id as 'shallow' | 'deep' | 'land_ethic' | 'social_eco' | 'ecofem');
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-xs sm:text-sm font-bold flex flex-col items-center gap-1.5 text-center transition-all ${
                          selectedSchool === school.id
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-xl">{school.icon}</span>
                        <span>{school.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    {selectedSchool === 'shallow' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-amber-400 uppercase">Worldview: Anthropocentric</span>
                          <span className="text-xs text-slate-400">Nature’s Value: Instrumental (Useful to humans)</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Shallow ecology focuses on pollution control, recycling, and resource efficiency strictly to support continued human consumption and welfare. It treats environmental symptoms without questioning whether human supremacy itself is the root driver.
                        </p>
                        <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
                          <strong className="text-amber-300">Indian Example:</strong> Installing scrubbers on coal plants or catalytic converters on Delhi cars so citizens can breathe cleaner air, while keeping industrial expansion unquestioned.
                        </div>
                      </motion.div>
                    )}

                    {selectedSchool === 'deep' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-emerald-400 uppercase">Worldview: Ecocentric (Arne Naess, 1973)</span>
                          <span className="text-xs text-slate-400">Nature’s Value: Intrinsic (Value in itself)</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Deep Ecology asserts two cardinal principles: First, all living beings have intrinsic value independent of human utility. Second, richness and diversity of life forms are values in themselves. It demands self-realization through identification with all life.
                        </p>
                        <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
                          <strong className="text-emerald-300">Indian Example:</strong> Protecting the Sundarbans mangrove tiger habitat because the Bengal tiger and mudflats have an absolute right to exist, not just because mangroves absorb cyclone surges.
                        </div>
                      </motion.div>
                    )}

                    {selectedSchool === 'land_ethic' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-blue-400 uppercase">Worldview: Stewardship (Aldo Leopold, 1949)</span>
                          <span className="text-xs text-slate-400">Human Role: Plain member and citizen of the biotic community</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Leopold enlarged the moral community to include soils, waters, plants, and animals — the land. <span className="text-blue-300 font-semibold italic">&quot;A thing is right when it tends to preserve the integrity, stability, and beauty of the biotic community; it is wrong when it tends otherwise.&quot;</span>
                        </p>
                        <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300">
                          <strong className="text-blue-300">Key Focus:</strong> Community-level holistic health. Clear-felling sal forest for open-cast mines is ethically wrong because it destroys community wholeness.
                        </div>
                      </motion.div>
                    )}

                    {selectedSchool === 'social_eco' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-purple-400 uppercase">Worldview: Social Ecology (Murray Bookchin)</span>
                          <span className="text-xs text-slate-400">Core Thesis: Social hierarchy creates ecological destruction</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Bookchin argued that the urge to dominate nature stems directly from the domination of human by human (class, gender, state power). Solution: dismantle hierarchies and practice <strong className="text-purple-300">Libertarian Municipalism</strong> (direct face-to-face community assemblies).
                        </p>
                      </motion.div>
                    )}

                    {selectedSchool === 'ecofem' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-rose-400 uppercase">Worldview: Ecofeminism (Vandana Shiva / Maria Mies)</span>
                          <span className="text-xs text-slate-400">Core Thesis: Parallel domination of women & nature under patriarchy</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          Critiques patriarchal dualisms (culture/nature, mind/body, man/woman). Highlights <strong className="text-rose-300">Seed Sovereignty</strong> and women’s embodied knowledge. Landmark: Chipko Movement 1973 in Reni, Uttarakhand, where Gaura Devi and village women hugged trees to protect their lifelines.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 1: Population Regulation Interactive Canvas & Predict-Then-Check */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800/60">
                      <p className="text-sm font-bold text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-3 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs sm:text-sm text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-300">
                      ✓ Prediction recorded! Drag the sliders below and observe the absolute growth speed dN/dt in the canvas display.
                    </motion.div>
                  )}

                  {/* Dynamic HTML5 Canvas Graph */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <canvas ref={canvasRef} width={640} height={220} className="w-full h-auto rounded-xl" />
                  </div>

                  {/* Interactive Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                        <span>Current Population (N)</span>
                        <span className="text-sky-400 font-bold">{popN}</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set population size N"
                        min={10}
                        max={1150}
                        step={10}
                        value={popN}
                        onChange={e => {
                          setPopN(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-sky-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                        <span>Carrying Capacity (K)</span>
                        <span className="text-rose-400 font-bold">{carryingK}</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set carrying capacity K"
                        min={400}
                        max={1200}
                        step={50}
                        value={carryingK}
                        onChange={e => {
                          setCarryingK(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                        <span>Intrinsic Rate (r)</span>
                        <span className="text-emerald-400 font-bold">{growthR.toFixed(2)}/yr</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set intrinsic growth rate r"
                        min={0.1}
                        max={1.5}
                        step={0.05}
                        value={growthR}
                        onChange={e => {
                          setGrowthR(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                      <p className="text-xs sm:text-sm font-bold text-white mb-2">🔍 Observation Check: {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 rounded-lg bg-slate-900 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 2: Demographic Transition & Age Pyramid */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Select Demographic Transition Stage:</span>
                    <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                      Stage {demogStage}
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(st => (
                      <motion.button
                        key={st}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setDemogStage(st);
                          audioManager.play('tap');
                        }}
                        className={`py-2 rounded-xl border font-bold text-xs transition-all ${
                          demogStage === st
                            ? 'bg-indigo-600 border-indigo-400 text-white'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300'
                        }`}
                      >
                        Stage {st}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Population Pyramid Representation */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 400 200" className="w-full h-44">
                      {demogStage === 1 && (
                        <g>
                          <text x="200" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Stage 1: Pre-Industrial (High Birth &amp; Death)</text>
                          <rect x="170" y="40" width="60" height="20" rx="3" fill="#ec4899" />
                          <rect x="150" y="65" width="100" height="20" rx="3" fill="#3b82f6" />
                          <rect x="130" y="90" width="140" height="20" rx="3" fill="#3b82f6" />
                          <rect x="90" y="115" width="220" height="25" rx="3" fill="#10b981" />
                          <rect x="60" y="145" width="280" height="30" rx="3" fill="#10b981" />
                          <text x="200" y="190" textAnchor="middle" fill="#64748b" fontSize="9">Expansive base, very high infant mortality</text>
                        </g>
                      )}
                      {demogStage === 2 && (
                        <g>
                          <text x="200" y="20" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Stage 2: Early Expanding (Death drops, Birth high - e.g. Nigeria)</text>
                          <rect x="160" y="40" width="80" height="20" rx="3" fill="#ec4899" />
                          <rect x="130" y="65" width="140" height="20" rx="3" fill="#3b82f6" />
                          <rect x="100" y="90" width="200" height="20" rx="3" fill="#3b82f6" />
                          <rect x="60" y="115" width="280" height="25" rx="3" fill="#10b981" />
                          <rect x="30" y="145" width="340" height="30" rx="3" fill="#10b981" />
                          <text x="200" y="190" textAnchor="middle" fill="#38bdf8" fontSize="9">Exploding youth population (Demographic Momentum)</text>
                        </g>
                      )}
                      {demogStage === 3 && (
                        <g>
                          <text x="200" y="20" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">Stage 3: Late Expanding (Birth falling - e.g. India TFR ~2.0)</text>
                          <rect x="150" y="40" width="100" height="20" rx="3" fill="#ec4899" />
                          <rect x="100" y="65" width="200" height="20" rx="3" fill="#3b82f6" />
                          <rect x="70" y="90" width="260" height="20" rx="3" fill="#3b82f6" />
                          <rect x="80" y="115" width="240" height="25" rx="3" fill="#10b981" />
                          <rect x="110" y="145" width="180" height="30" rx="3" fill="#10b981" />
                          <text x="200" y="190" textAnchor="middle" fill="#10b981" fontSize="9">Constrictive-Expansive: Bulging workforce (Demographic Dividend)</text>
                        </g>
                      )}
                      {demogStage === 4 && (
                        <g>
                          <text x="200" y="20" textAnchor="middle" fill="#a855f7" fontSize="11" fontWeight="bold">Stage 4: Low Stationary (Low Birth &amp; Death - e.g. Western Europe)</text>
                          <rect x="110" y="40" width="180" height="20" rx="3" fill="#ec4899" />
                          <rect x="100" y="65" width="200" height="20" rx="3" fill="#3b82f6" />
                          <rect x="95" y="90" width="210" height="20" rx="3" fill="#3b82f6" />
                          <rect x="100" y="115" width="200" height="25" rx="3" fill="#10b981" />
                          <rect x="105" y="145" width="190" height="30" rx="3" fill="#10b981" />
                          <text x="200" y="190" textAnchor="middle" fill="#a855f7" fontSize="9">Stationary columnar shape: replacement-level stability</text>
                        </g>
                      )}
                      {demogStage === 5 && (
                        <g>
                          <text x="200" y="20" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">Stage 5: Declining (Death &gt; Birth - e.g. Japan)</text>
                          <rect x="70" y="40" width="260" height="22" rx="3" fill="#ec4899" />
                          <rect x="85" y="65" width="230" height="20" rx="3" fill="#3b82f6" />
                          <rect x="110" y="90" width="180" height="20" rx="3" fill="#3b82f6" />
                          <rect x="135" y="115" width="130" height="22" rx="3" fill="#10b981" />
                          <rect x="150" y="145" width="100" height="26" rx="3" fill="#10b981" />
                          <text x="200" y="190" textAnchor="middle" fill="#f43f5e" fontSize="9">Inverted top-heavy pyramid: extreme elderly dependency (&gt;29% &gt; 65yo)</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Wildlife Corridor & Genetic Erosion Simulation */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 500 200" className="w-full h-44">
                      {/* Left Core Shola Reserve */}
                      <rect x="20" y="30" width="120" height="140" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="80" y="55" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Shola Core A</text>
                      <circle cx="60" cy="90" r="8" fill="#a855f7" />
                      <circle cx="100" cy="110" r="8" fill="#a855f7" />
                      <text x="80" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Endemic Purple Frog</text>

                      {/* Right Core Reserve */}
                      <rect x="360" y="30" width="120" height="140" rx="16" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="420" y="55" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">Shola Core B</text>
                      <circle cx="400" cy="90" r="8" fill="#a855f7" />
                      <circle cx="440" cy="110" r="8" fill="#a855f7" />
                      <text x="420" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">Isolated Deme</text>

                      {/* Middle Fragmented Zone */}
                      <rect x="150" y="30" width="200" height="140" rx="8" fill="#451a03" stroke="#b45309" strokeDasharray="4,4" />
                      <text x="250" y="50" textAnchor="middle" fill="#f59e0b" fontSize="10">Commercial Tea Plantation Matrix</text>

                      {/* Wildlife Corridor Connection */}
                      {corridorConnected && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <rect x="140" y="80" width="220" height={corridorWidth * 25} rx="6" fill="#059669" stroke="#34d399" strokeWidth="2" />
                          <text x="250" y="95" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            Restored Eco-Corridor ({corridorWidth} km wide)
                          </text>
                          <line x1="120" y1="92" x2="380" y2="92" stroke="#fbbf24" strokeWidth="3" strokeDasharray="6,4" />
                        </motion.g>
                      )}
                    </svg>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950/80 rounded-xl border border-slate-800">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        setCorridorConnected(!corridorConnected);
                        audioManager.play(corridorConnected ? 'whoosh' : 'drop-correct');
                        speechManager.speak(corridorConnected ? 'Corridor severed!' : 'Corridor restored! Gene flow resumed.');
                      }}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all ${
                        corridorConnected
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-amber-600 hover:bg-amber-500 text-white'
                      }`}
                    >
                      {corridorConnected ? '✓ Eco-Corridor Active (Gene Flow Enabled)' : '⚠️ Reconnect Fragmented Habitat'}
                    </motion.button>

                    {corridorConnected && (
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">Corridor Width:</span>
                        <input
                          type="range"
                          min={0.5}
                          max={3.0}
                          step={0.5}
                          value={corridorWidth}
                          onChange={e => setCorridorWidth(Number(e.target.value))}
                          className="w-28 accent-emerald-400"
                        />
                        <span className="text-xs font-bold text-emerald-400">{corridorWidth} km</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: Water Standards & CPCB River Health Simulator */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                        <span>Dissolved Oxygen (DO)</span>
                        <span className="text-sky-400 font-bold">{waterDO.toFixed(1)} mg/L</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set Dissolved Oxygen DO"
                        min={1.0}
                        max={9.0}
                        step={0.2}
                        value={waterDO}
                        onChange={e => {
                          setWaterDO(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-sky-400"
                      />
                      <span className="text-[10px] text-slate-500">Class A requires ≥ 6.0 mg/L</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                        <span>Biochemical Oxygen Demand (BOD)</span>
                        <span className="text-rose-400 font-bold">{waterBOD.toFixed(1)} mg/L</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Set Biochemical Oxygen Demand BOD"
                        min={0.5}
                        max={15.0}
                        step={0.5}
                        value={waterBOD}
                        onChange={e => {
                          setWaterBOD(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-400"
                      />
                      <span className="text-[10px] text-slate-500">Class A requires ≤ 2.0 mg/L</span>
                    </div>
                  </div>

                  <motion.div
                    key={waterClassification.code}
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">CPCB Designated Best Use Rating</span>
                      <h4 className="text-xl font-black text-white mt-1">{waterClassification.code}</h4>
                      <p className="text-sm text-slate-300">{waterClassification.label}</p>
                    </div>
                    <span className="text-3xl">
                      {waterClassification.code === 'Class A' ? '💧' :
                       waterClassification.code === 'Class B' ? '🏊' :
                       waterClassification.code === 'Class C' ? '🚰' :
                       waterClassification.code === 'Class D' ? '🌾' : '🏭'}
                    </span>
                  </motion.div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Prev Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-black shadow-lg shadow-green-900/40"
                  >
                    Enter Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-white">🌿 Ecosystem & Pollution Sandbox Laboratory</h3>
              <p className="text-slate-400 text-xs mt-1">Free experimentation across Air Quality (NAAQS/WHO), Population carrying dynamics, and River Dissolved Oxygen.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-900/40"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Air Quality Monitor */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">NAAQS Air Quality Index Tracker</span>
                <span className={`text-xs font-black ${aqiCategory.color}`}>{aqiCategory.category}</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <motion.div className={`h-full rounded-full ${aqiCategory.bar}`} animate={{ width: `${Math.min(100, (pm25Value / 350) * 100)}%` }} />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Ambient PM2.5 Concentration</span>
                  <span className="font-bold text-white">{pm25Value} µg/m³</span>
                </div>
                <input
                  type="range"
                  aria-label="Set PM2.5 concentration"
                  min={5}
                  max={380}
                  step={5}
                  value={pm25Value}
                  onChange={e => setPm25Value(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 bg-slate-950 p-3 rounded-xl">
                <div>WHO 24h Guideline: <strong className="text-white">45 µg/m³</strong></div>
                <div>India NAAQS 24h: <strong className="text-white">60 µg/m³</strong></div>
              </div>
            </div>

            {/* Population & Growth Rate Live Feed */}
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Logistic Resistance Feedback</span>
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3 rounded-xl text-xs">
                <div>
                  <span className="text-slate-400">Environmental Resistance:</span>
                  <p className="text-base font-bold text-amber-400 mt-0.5">{(environmentalResistance * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <span className="text-slate-400">Growth Speed (dN/dt):</span>
                  <p className="text-base font-bold text-emerald-400 mt-0.5">{logisticGrowthRate.toFixed(1)} ind/yr</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Adjust Population N: {popN}</span>
                  <span>K: {carryingK}</span>
                </div>
                <input
                  type="range"
                  aria-label="Set population N"
                  min={20}
                  max={carryingK}
                  step={10}
                  value={popN}
                  onChange={e => setPopN(Number(e.target.value))}
                  className="w-full accent-sky-400"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs uppercase font-bold px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                NEP Competency: {activeChallenge.competencyLevel}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-400">
              Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
            </span>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Active Question Box */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">{activeChallenge.question}</h3>

            {/* MCQ / Classify / Distinguish Options */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-3">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Numeric Input */}
            {activeChallenge.type === 'numeric' && (
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="number"
                  aria-label="Enter numeric solution"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  disabled={showExplanation}
                  placeholder="Enter calculated value"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold w-48 text-base focus:border-emerald-500 focus:outline-none"
                />
                <span className="text-slate-400 font-bold">{activeChallenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* Drag Label */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 mt-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Available Labels:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 min-h-[90px] flex flex-col items-center justify-center text-center"
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-bold mb-1">Target Zone: {targetId.replace('pillar_', '').replace('curve_', '')}</span>
                      {droppedLabels[targetId] ? (
                        <span className="px-3 py-1 bg-emerald-900/60 border border-emerald-500 text-emerald-300 font-bold text-xs rounded-md">
                          ✓ {droppedLabels[targetId]}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Drag label here</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag Sort */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3 mt-4">
                <p className="text-xs text-slate-400">Drag items to reorder them chronologically / logically:</p>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    role="button"
                    tabIndex={0}
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs sm:text-sm flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Construct Parts */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4 mt-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-bold text-white"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-900/60 border border-indigo-500 text-indigo-200 text-xs font-bold rounded-md flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500 italic">Click parts above to construct thesis</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">ISC Board Model Walkthrough:</p>
                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-amber-200 text-xs sm:text-sm leading-relaxed"
                  >
                    <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MASTERY COMPLETION, REFLECTION & CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-500/40 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Class 12 Ecological Master Certificate</h2>
            <p className="text-emerald-300 font-bold text-sm">
              Simulation Score: {Math.max(0, 100 - errors * 5)}% • Mastery: {masteryLevel.toUpperCase()}
            </p>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! You possess profound mastery of Deep Ecology, Leopold’s Land Ethic, Demographic Transitions, and Indian Environmental Governance.'
                : errors <= 3
                ? 'Outstanding performance! You have grasped the foundational tensions between human development and biosphere limits.'
                : 'Good effort! Review the misconception diagnostics below to fortify your understanding before the ISC board examinations.'}
            </p>
          </div>

          {/* Spaced Repetition Visibility Card */}
          <div className="p-6 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 rounded-2xl border border-indigo-500/40 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-3xl shrink-0">
                  📅
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      SM-2 Spaced Repetition Memory Engine
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">Recommended Next Review</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}), optimal retention requires:
                  </p>
                </div>
              </div>
              <div className="text-center sm:text-right shrink-0">
                <span className={`inline-block px-4 py-2 rounded-xl text-sm font-black uppercase tracking-wider shadow-lg ${
                  errors === 0
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40'
                    : errors <= 3
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/40'
                }`}>
                  {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review in 1 Day'}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">
                  {errors === 0 ? '🌟 Mastery solid — long retention cycle' : errors <= 3 ? '⚡ Consolidate key memory traces' : '⚠️ Immediate revision recommended'}
                </p>
              </div>
            </div>
          </div>

          {/* Structural Reflection Section */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>💭</span> Reflect on Your Learning
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-emerald-400 mb-1">1. Surprising Insight</p>
                <p className="text-sm text-slate-300">What was the most surprising thing you learned?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-sky-400 mb-1">2. Peer Explanation</p>
                <p className="text-sm text-slate-300">How would you explain this to a friend?</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-indigo-400 mb-1">3. Real-World Application</p>
                <p className="text-sm text-slate-300">Where in real life might you use this?</p>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-4">
              <h3 className="text-rose-300 font-bold text-sm">⚠️ Your Targeted Conceptual Review Profile:</h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Board Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Capstone Project */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🗺️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-900/60 text-emerald-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_EVSModernSchoolsEcologicalSim;