'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL NODE IDS REQUIRED BY THE CURRICULUM
// ==========================================
const ALL_NODE_IDS = [
  'c12_geo_cbse_167', 'c12_geo_cbse_168', 'c12_geo_cbse_169', 'c12_geo_cbse_170',
  'c12_geo_cbse_171', 'c12_geo_cbse_172', 'c12_geo_cbse_173', 'c12_geo_cbse_174',
  'c12_geo_cbse_175', 'c12_geo_cbse_176', 'c12_geo_cbse_177', 'c12_geo_cbse_178',
  'c12_geo_cbse_179', 'c12_geo_cbse_180', 'c12_geo_cbse_181', 'c12_geo_cbse_182',
  'c12_geo_cbse_183', 'c12_geo_cbse_184', 'c12_geo_cbse_185', 'c12_geo_cbse_186',
  'c12_geo_cbse_187', 'c12_geo_cbse_188', 'c12_geo_cbse_189', 'c12_geo_cbse_190',
  'c12_geo_cbse_191', 'c12_geo_cbse_192', 'c12_geo_cbse_193', 'c12_geo_cbse_194',
  'c12_geo_cbse_195', 'c12_geo_cbse_196', 'c12_geo_cbse_197', 'c12_geo_cbse_198',
  'c12_geo_cbse_199', 'c12_geo_cbse_200', 'c12_geo_cbse_201', 'c12_geo_cbse_202',
  'c12_geo_cbse_203', 'c12_geo_cbse_204', 'c12_geo_cbse_205', 'c12_geo_cbse_206',
  'c12_geo_cbse_207', 'c12_geo_cbse_208', 'c12_geo_cbse_209', 'c12_geo_cbse_210',
  'c12_geo_cbse_211', 'c12_geo_cbse_212', 'c12_geo_cbse_213', 'c12_geo_cbse_214',
  'c12_geo_cbse_215', 'c12_geo_cbse_216', 'c12_geo_cbse_217', 'c12_geo_cbse_218',
  'c12_geo_cbse_219', 'c12_geo_cbse_220', 'c12_geo_cbse_221', 'c12_geo_cbse_222',
  'c12_geo_cbse_223', 'c12_geo_cbse_224', 'c12_geo_cbse_225', 'c12_geo_cbse_226',
  'c12_geo_cbse_227', 'c12_geo_cbse_228', 'c12_geo_cbse_229', 'c12_geo_cbse_230',
  'c12_geo_cbse_231', 'c12_geo_cbse_232', 'c12_geo_cbse_233', 'c12_geo_cbse_234',
  'c12_geo_cbse_235', 'c12_geo_cbse_236'
];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Global Human Development & Economic Geography Observatory',
  intro: 'You are appointed as Chief Regional Planner and Human Development Officer at the United Nations Development Programme (UNDP). Your assignment is to evaluate national development indicators, design policy interventions, and model economic activity transformations across diverse geographic landscapes.',
  context: 'Through interactive multi-variable laboratories, you will measure the Human Development Index (HDI), analyze capability expansion vs economic growth, model agricultural systems, evaluate mining methods, and balance human activity with sustainability pillars across low, medium, and high HDI nations.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Country X quadruples its Gross Domestic Product (GDP) per capita over 20 years, yet its life expectancy drops by 5 years and adult literacy remains stagnant at 45%. According to Dr. Mahbub-ul-Haq and Prof. Amartya Sen, has Country X achieved Human Development?',
  options: [
    'Yes, because economic growth automatically translates into overall human development.',
    'No, because human development requires qualitative expansion of choices, health, and education, not just quantitative income growth.',
    'Yes, because high GDP per capita guarantees that individuals can purchase healthcare independently.',
    'No, because human development is exclusively measured by total population size and urbanization rate.'
  ],
  correctIndex: 1,
  hintAfter: 'Growth is quantitative and value-neutral, whereas Human Development is qualitative and value-positive. Economic growth is merely a means; expanding people\'s real capabilities and choices is the ultimate end of development.',
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: HDI Calculator & Capability Model',
    instruction: 'Adjust health (life expectancy), education (schooling years), and income (GNI per capita PPP) sliders to calculate HDI scores and observe the four pillars: Equity, Sustainability, Productivity, and Empowerment.',
    interactionType: 'hdi-calculator',
    nodeId: 'c12_geo_cbse_185',
  },
  {
    title: 'Lab 2: Economic Activity & Sectoral Classification Visualizer',
    instruction: 'Categorize economic activities into Primary, Secondary, and Tertiary sectors. Toggle workforce distribution to model structural shifts from agrarian to industrialized and service economies.',
    interactionType: 'sector-classifier',
    nodeId: 'c12_geo_cbse_204',
  },
  {
    title: 'Lab 3: Agricultural Systems & Land Management Lab',
    instruction: 'Simulate crop rotation, shifting agriculture cycles, plantation dynamics, mixed farming, and dry farming in varying climatic zones to observe yield stability and soil health.',
    interactionType: 'agri-simulator',
    nodeId: 'c12_geo_cbse_206',
  },
  {
    title: 'Lab 4: Mining Technology & Resource Extraction Lab',
    instruction: 'Compare Shaft Mining, Open-Cast Mining, and Quarrying across mineral ore types. Balance extraction yield against capital cost, worker safety, and environmental impact.',
    interactionType: 'mining-lab',
    nodeId: 'c12_geo_cbse_221',
  },
  {
    title: 'Lab 5: Global Regional HDI Patterns & Country Profiler',
    instruction: 'Analyze real-world country groupings (Very High, High, Medium, Low HDI) and inspect indicators, Human Poverty Index (HPI), and Bhutan\'s Gross National Happiness (GNH).',
    interactionType: 'global-profiler',
    nodeId: 'c12_geo_cbse_190',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a government redirects 30% of its budget from defence to primary health centres and female literacy programs while total GDP remains constant, what will happen to its Human Development Index (HDI)?',
    options: [
      'HDI will remain unchanged because total national income did not increase.',
      'HDI will increase significantly because health and education indicator scores will rise directly.',
      'HDI will decrease because reduced defence spending reduces gross domestic productivity.',
      'HDI will drop to zero because HDI only measures total industrial export value.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, increase Health and Education sliders while keeping Income constant, and observe how HDI responds.',
    nodeId: 'c12_geo_cbse_173',
  },
  {
    question: 'Predict: What occurs during the fallow period of a traditional Shifting Agriculture (Jhuming) cycle when communities allow forest plot regeneration for 10-15 years?',
    options: [
      'Soil organic matter and nitrogen levels replenish naturally through natural vegetation decay.',
      'Soil turns permanently into desert sand due to lack of artificial chemical fertilizers.',
      'Mineral deposits like petroleum automatically form beneath the topsoil.',
      'Agricultural productivity drops permanently for all surrounding sedentary farms.'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 3, select Shifting Agriculture and advance the years to observe soil fertility restoration during fallow years.',
    nodeId: 'c12_geo_cbse_208',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the relationship between high female literacy rates and national HDI rank across low and medium development nations?',
    observableOptions: [
      'Female literacy strongly correlates with overall higher HDI due to empowered choice expansion and improved family health outcomes.',
      'Female literacy has zero statistical effect on HDI since HDI only considers mineral oil production.',
      'Higher female literacy lowers HDI because educated citizens leave primary agricultural activities.',
      'Female literacy only affects tertiary transport geography but not HDI scores.'
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_180',
  },
  {
    question: 'What happens when open-cast mining is chosen over shaft mining for shallow mineral ore deposits?',
    observableOptions: [
      'Open-cast mining requires lower capital investment and is safer, but causes larger surface land degradation.',
      'Open-cast mining is twice as expensive as underground shaft mining and requires vertical elevator lifts.',
      'Open-cast mining completely eliminates all environmental pollution.',
      'Open-cast mining can only be used for offshore mineral oil extraction.'
    ],
    correctIndex: 0,
    nodeId: 'c12_geo_cbse_221',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'UNDP Regional Development Masterplan & Resource Allocation',
  description: 'You are leading a UNDP advisory mission for District Sundargarh, an economically emerging region with tribal populations, rich iron ore reserves, and vulnerable agricultural lands.',
  steps: [
    'Step 1: Calculate current regional baseline HDI: Life Expectancy Index = 0.58, Education Index = 0.52, Income Index = 0.48 -> Baseline HDI = (0.58 * 0.52 * 0.48)^(1/3) = 0.525 (Medium HDI).',
    'Step 2: Evaluate economic activities: Shift 15% of informal shifting agricultural workers into organized co-operative horticulture and truck farming near urban centers.',
    'Step 3: Implement soil conservation: Mandate contour ploughing on sloped terrain and mixed crop-livestock farming to boost agricultural productivity by 35%.',
    'Step 4: Regulate mineral extraction: Transition unregulated surface quarrying to open-cast mining with mandatory post-mining land reclamation, raising regional revenue by $4.2M for healthcare investment.',
  ],
};

// ==========================================
// MISCONCEPTIONS (6)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Economic growth and human development are identical terms.',
    correction: 'Economic growth is quantitative increases in production/income, while Human Development is qualitative expansion of freedoms, health, education, and human capabilities.',
    nodeId: 'c12_geo_cbse_167',
  },
  {
    id: 'misc_2',
    misconception: 'High GDP per capita automatically guarantees high HDI ranking.',
    correction: 'Oil-rich countries may have extremely high per capita income but moderate HDI if spending on health, education, and social equity remains limited.',
    nodeId: 'c12_geo_cbse_186',
  },
  {
    id: 'misc_3',
    misconception: 'Subsistence agriculture is economically inefficient and has no value.',
    correction: 'Subsistence agriculture provides essential food security, cultural preservation, and ecological resilience for millions of rural households worldwide.',
    nodeId: 'c12_geo_cbse_205',
  },
  {
    id: 'misc_4',
    misconception: 'Open-cast mining is always more hazardous to miners than shaft mining.',
    correction: 'Underground shaft mining is significantly more hazardous due to risks of cave-ins, poisonous gas build-up, and underground fires compared to surface open-cast mining.',
    nodeId: 'c12_geo_cbse_221',
  },
  {
    id: 'misc_5',
    misconception: 'Gross National Happiness (GNH) is an informal, non-measurable concept.',
    correction: 'Bhutan officially measures GNH using structured quantitative indicators spanning eco-system health, cultural vitality, good governance, and psychological well-being.',
    nodeId: 'c12_geo_cbse_188',
  },
  {
    id: 'misc_6',
    misconception: 'Shifting agriculture causes permanent deforestation regardless of fallow length.',
    correction: 'When fallow periods are sufficiently long (10-15+ years), shifting agriculture allows natural forest regeneration and soil nutrient recovery.',
    nodeId: 'c12_geo_cbse_208',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8)
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: 'c12_geo_cbse_170',
    question: 'Who among the following geographers/economists introduced the concept of Human Development in 1990?',
    options: ['Prof. Amartya Sen', 'Dr. Mahbub-ul-Haq', 'Ellen Churchill Semple', 'Thomas Malthus'],
    correctIndex: 1,
    explanation: 'Dr. Mahbub-ul-Haq created the Human Development Index and conceptualized human development in 1990 under UNDP.',
  },
  {
    id: 'diag_2',
    nodeId: 'c12_geo_cbse_171',
    question: 'Prof. Amartya Sen associated Human Development primarily with which core capability framework?',
    options: ['Maximisation of industrial yield', 'Expansion of human freedom and capabilities', 'Strict control of population growth', 'Establishment of free trade ports'],
    correctIndex: 1,
    explanation: 'Prof. Amartya Sen emphasized that human development is fundamentally about expanding human freedom and capabilities.',
  },
  {
    id: 'diag_3',
    nodeId: 'c12_geo_cbse_177',
    question: 'Which of the following is NOT one of the four key pillars of Human Development?',
    options: ['Equity', 'Sustainability', 'Productivity', 'Industrialisation'],
    correctIndex: 3,
    explanation: 'The four pillars are Equity, Sustainability, Productivity, and Empowerment. Industrialisation is an economic process, not a pillar.',
  },
  {
    id: 'diag_4',
    nodeId: 'c12_geo_cbse_185',
    question: 'The Human Development Index (HDI) measures achievements across three basic dimensions:',
    options: ['Health, Education, Access to Resources', 'GDP, Exports, Military power', 'Agriculture, Mining, Services', 'Birth rate, Death rate, Migration'],
    correctIndex: 0,
    explanation: 'HDI components are Health (Life Expectancy), Education (Schooling years), and Access to Resources (GNI per capita PPP).',
  },
  {
    id: 'diag_5',
    nodeId: 'c12_geo_cbse_188',
    question: 'Which country is the only nation in the world to officially measure progress using Gross National Happiness (GNH)?',
    options: ['Norway', 'Bhutan', 'Sri Lanka', 'Switzerland'],
    correctIndex: 1,
    explanation: 'Bhutan officially uses Gross National Happiness (GNH) to measure national progress.',
  },
  {
    id: 'diag_6',
    nodeId: 'c12_geo_cbse_204',
    question: 'Which economic activity direct extracts raw natural resources directly from nature?',
    options: ['Secondary Activity', 'Primary Activity', 'Tertiary Activity', 'Quaternary Activity'],
    correctIndex: 1,
    explanation: 'Primary activities directly extract natural resources (e.g., agriculture, mining, fishing, forestry).',
  },
  {
    id: 'diag_7',
    nodeId: 'c12_geo_cbse_206',
    question: 'Plantation agriculture is characterized by:',
    options: ['Small fragmented landholdings with basic hand tools', 'Single cash-crop farming over large estates with capital-intensive scientific methods', 'Nomadic animal herding across seasonal pastures', 'Barter exchange of crops without money'],
    correctIndex: 1,
    explanation: 'Plantation agriculture involves large estates, single cash crop specialization (tea, coffee, rubber), heavy capital investment, and scientific management.',
  },
  {
    id: 'diag_8',
    nodeId: 'c12_geo_cbse_221',
    question: 'Which mining technique involves sinking vertical shafts and horizontal galleries deep into underground rock strata?',
    options: ['Open-cast mining', 'Quarrying', 'Shaft mining', 'Contour dredging'],
    correctIndex: 2,
    explanation: 'Shaft mining (underground mining) uses vertical shafts and underground tunnels to extract deep mineral deposits.',
  },
];

// ==========================================
// CHALLENGES (22 Progressive Challenges)
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'classify' | 'numeric' | 'ordering';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7) ---
  {
    id: 'ch_1',
    nodeId: 'c12_geo_cbse_167',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Growth refers to quantitative changes over time. Which of the following is true about Development?',
    options: [
      'Development is purely quantitative and always positive.',
      'Development is qualitative and always brings about positive structural change.',
      'Development can occur without any qualitative shift in choices or health.',
      'Development is measured solely by total birth rates.'
    ],
    correctIndex: 1,
    explanation: 'Development implies a qualitative change that is always value-positive, expanding choices and living standards.',
    hints: ['Think about quality vs quantity.', 'Growth can be neutral or negative, but true development is value-positive.'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_2',
    nodeId: 'c12_geo_cbse_170',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'According to Dr. Mahbub-ul-Haq, what is the primary goal of human development?',
    options: [
      'To build the maximum number of heavy manufacturing factories.',
      'To create an environment where people can lead long, healthy, and meaningful lives.',
      'To maximize national defence expenditure.',
      'To increase urban population density as fast as possible.'
    ],
    correctIndex: 1,
    explanation: 'Dr. Mahbub-ul-Haq defined human development as enlarging people\'s choices and enabling meaningful, long, healthy lives.',
    hints: ['Focus on human well-being rather than machines.', 'Consider choices and capabilities.'],
  },
  {
    id: 'ch_3',
    nodeId: 'c12_geo_cbse_177',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Equal access to opportunities available to all people regardless of gender, race, income, or caste represents which pillar of human development?',
    options: ['Sustainability', 'Equity', 'Productivity', 'Empowerment'],
    correctIndex: 1,
    explanation: 'Equity means providing equal access to opportunities for all individuals in society.',
    hints: ['Think of fairness and equal access.', 'Equal opportunities for all demographic groups.'],
  },
  {
    id: 'ch_4',
    nodeId: 'c12_geo_cbse_178',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Ensuring that future generations also have access to resources and capabilities represents which pillar of human development?',
    options: ['Equity', 'Productivity', 'Sustainability', 'Empowerment'],
    correctIndex: 2,
    explanation: 'Sustainability means continuity in the availability of opportunities for current and future generations.',
    hints: ['Continuity for future generations.', 'Environmental and resource stewardship.'],
  },
  {
    id: 'ch_5',
    nodeId: 'c12_geo_cbse_181',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which approach to human development focuses on providing six essential needs: health, education, food, water supply, sanitation, and housing (pioneered by ILO)?',
    options: ['Income Approach', 'Welfare Approach', 'Basic Needs Approach', 'Capability Approach'],
    correctIndex: 2,
    explanation: 'The International Labour Organisation (ILO) proposed the Basic Needs Approach emphasizing six basic necessities.',
    hints: ['Pioneered by ILO.', 'Focuses on 6 key minimum human needs.'],
  },
  {
    id: 'ch_6',
    nodeId: 'c12_geo_cbse_204',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Classify',
    question: 'Which of the following activities is classified as a Secondary Activity?',
    options: ['Dairy farming', 'Iron smelting and steel manufacturing', 'Teaching in a school', 'Copper mining'],
    correctIndex: 1,
    explanation: 'Secondary activities involve processing and manufacturing raw materials into finished goods.',
    hints: ['Secondary = processing/manufacturing.', 'Transforming raw ore into steel.'],
  },
  {
    id: 'ch_7',
    nodeId: 'c12_geo_cbse_221',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which mining method is used when mineral deposits lie close to the surface of the earth?',
    options: ['Shaft mining', 'Open-cast (strip) mining', 'Deep-bore drilling', 'Sub-sea tunneling'],
    correctIndex: 1,
    explanation: 'Open-cast mining (surface mining) is used for shallow mineral deposits and is low cost.',
    hints: ['Shallow deposits on the surface.', 'Involves stripping off top soil layer.'],
    misconceptionIndex: 3,
  },

  // --- STANDARD TIER (8) ---
  {
    id: 'ch_8',
    nodeId: 'c12_geo_cbse_185',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A country scores 0.820 in Health Index, 0.780 in Education Index, and 0.850 in Resource Index. Calculate its unweighted composite HDI geometric mean score (rounded to 3 decimal places).',
    options: ['0.816', '0.850', '0.780', '0.820'],
    correctIndex: 0,
    explanation: 'HDI = (0.820 * 0.780 * 0.850)^(1/3) = (0.54366)^(0.3333) = 0.816.',
    hints: ['Geometric mean formula: (H * E * I)^(1/3).', 'Multiply all three indices and take cube root.'],
  },
  {
    id: 'ch_9',
    nodeId: 'c12_geo_cbse_189',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Countries with HDI scores above 0.800 fall into which HDI category according to UNDP standards?',
    options: ['Medium Human Development', 'High Human Development', 'Very High Human Development', 'Low Human Development'],
    correctIndex: 2,
    explanation: 'UNDP categorizes nations with HDI > 0.800 as Very High Human Development.',
    hints: ['Check UNDP category cutoffs.', 'Score above 0.800 belongs to top tier.'],
  },
  {
    id: 'ch_10',
    nodeId: 'c12_geo_cbse_191',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'India\'s HDI score of approximately 0.644 places it into which UNDP Human Development category?',
    options: ['Very High', 'High', 'Medium', 'Low'],
    correctIndex: 2,
    explanation: 'HDI scores between 0.550 and 0.699 fall in the Medium Human Development category.',
    hints: ['Score is between 0.550 and 0.700.', 'India belongs to the middle category.'],
  },
  {
    id: 'ch_11',
    nodeId: 'c12_geo_cbse_206',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why did European colonial powers introduce plantation agriculture in tropical regions of Asia, Africa, and Latin America?',
    options: ['To encourage small-holder subsistence farming among local villagers.', 'To supply raw materials (tea, rubber, coffee, sugarcane) for European home industries using cheap local labor.', 'To eliminate commercial crop trading in international markets.', 'To prevent soil erosion in alpine regions.'],
    correctIndex: 1,
    explanation: 'Plantation agriculture was introduced by colonizers to grow single export cash crops for European markets.',
    hints: ['Think about colonial economic goals.', 'Exporting tropical crops to European factories.'],
  },
  {
    id: 'ch_12',
    nodeId: 'c12_geo_cbse_208',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Shifting Agriculture (Jhuming), why do farmers abandon their agricultural plot after 2 to 3 years?',
    options: [
      'The land gets flooded permanently by river channels.',
      'Soil fertility declines due to leaching and rapid nutrient loss, and weeds proliferate.',
      'Government regulations mandate moving every 2 years.',
      'Wild animals destroy all crops after 36 months.'
    ],
    correctIndex: 1,
    explanation: 'In shifting slash-and-burn farming, ash nutrients wash away quickly, leading to rapid soil fertility drop and heavy weed growth.',
    hints: ['Think of tropical soil nutrient depletion.', 'Slash and burn nutrients leach away fast.'],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_13',
    nodeId: 'c12_geo_cbse_211',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Mixed Farming is an integrated agricultural system widely practiced in developed regions like Western Europe and North America. What is its core feature?',
    options: [
      'Growing only rice using flooded paddy fields.',
      'Equal emphasis on crop cultivation (wheat, barley) and livestock rearing (cattle, sheep) on the same farm.',
      'Shifting cultivation fields every 10 years without domesticated animals.',
      'Growing luxury flowers exclusively for export by air.'
    ],
    correctIndex: 1,
    explanation: 'Mixed farming combines crop growing with livestock breeding on the same farm unit, ensuring stable year-round income.',
    hints: ['Integrated crop + livestock system.', 'Reduces financial risk by diversifying revenue.'],
  },
  {
    id: 'ch_14',
    nodeId: 'c12_geo_cbse_235',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which specialised horticultural practice focuses specifically on growing vegetables close to urban consumer markets to supply daily fresh produce?',
    options: ['Plantation farming', 'Dry farming', 'Truck farming', 'Transhumance'],
    correctIndex: 2,
    explanation: 'Truck farming refers to market gardening where vegetables are transported overnight by trucks to urban markets.',
    hints: ['Overnight transport to urban markets.', 'Name involves a transport vehicle.'],
  },
  {
    id: 'ch_15',
    nodeId: 'c12_geo_cbse_236',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'The seasonal movement of pastoral nomads with their livestock between high mountain pastures in summer and lowland valleys in winter is called:',
    options: ['Urbanisation', 'Transhumance', 'Sedentary farming', 'Crop rotation'],
    correctIndex: 1,
    explanation: 'Transhumance is vertical seasonal migration practiced by pastoral communities (e.g., Gujjars, Bakarwals).',
    hints: ['Vertical mountain to valley seasonal migration.', 'Practiced by Himalayan pastoral communities.'],
  },

  // --- ADVANCED TIER (7) ---
  {
    id: 'ch_16',
    nodeId: 'c12_geo_cbse_171',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Compare Amartya Sen\'s Capability Approach with the traditional Income Approach. Why does Sen argue income alone is an insufficient measure of human development?',
    options: [
      'Because income cannot be converted into foreign currencies.',
      'Because conversion of income into actual freedoms depends on individual, social, and environmental factors (e.g., healthcare access, disability, discrimination).',
      'Because high income causes automatic reductions in national literacy rates.',
      'Because total national income is impossible to measure accurately.'
    ],
    correctIndex: 1,
    explanation: 'Sen highlights that freedom to achieve well-being depends on converting resources into capabilities, which varies across individuals due to personal and institutional barriers.',
    hints: ['Income is a tool, capability is the freedom to act.', 'Conversion factors: health, social norms, infrastructure.'],
  },
  {
    id: 'ch_17',
    nodeId: 'c12_geo_cbse_187',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'The Human Poverty Index (HPI) differs fundamentally from HDI because:',
    options: [
      'HPI measures shortfall in human development (e.g., probability of not surviving to age 40, illiteracy rate, lack of clean water) rather than average achievement.',
      'HPI measures total foreign debt of low income countries.',
      'HPI is calculated using only national export tax figures.',
      'HPI measures agricultural fertilizer output per hectare.'
    ],
    correctIndex: 0,
    explanation: 'HPI measures the non-income deprivation and shortfalls in key human development dimensions.',
    hints: ['HDI measures achievements; HPI measures shortfalls/deprivations.', 'Focus on non-survival, illiteracy, lack of clean water.'],
  },
  {
    id: 'ch_18',
    nodeId: 'c12_geo_cbse_194',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why do many countries with very high military spending and high economic output maintain only Medium HDI rankings?',
    options: [
      'Because military spending counts negatively in GDP equations.',
      'Because disproportionate allocation to defence diverts vital public investments away from social infrastructure like primary health, sanitation, and education.',
      'Because HDI excludes all countries with active armies.',
      'Because military hardware decreases average life expectancy calculations directly.'
    ],
    correctIndex: 1,
    explanation: 'Resource misallocation toward armaments starves essential social sectors (health and education), which directly depresses HDI indicators.',
    hints: ['Opportunity cost of public expenditure.', 'Budget spent on weapons cannot build schools or hospitals.'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_19',
    nodeId: 'c12_geo_cbse_216',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In semi-arid regions of Rajasthan and Maharashtra, which combination of soil management techniques best preserves moisture and soil fertility without chemical degradation?',
    options: [
      'Slash-and-burn clearing combined with monoculture wheat farming.',
      'Contour ploughing, intercropping with leguminous pulses, and dry farming moisture conservation.',
      'Intensive flood irrigation with high chemical fertilizer doses.',
      'Deep shaft mining combined with open quarrying.'
    ],
    correctIndex: 1,
    explanation: 'Contour ploughing slows water runoff, leguminous intercropping fixes atmospheric nitrogen, and dry farming conserves moisture in semi-arid zones.',
    hints: ['Dry farming + nitrogen fixing pulses.', 'Contour ploughing reduces runoff.'],
  },
  {
    id: 'ch_20',
    nodeId: 'c12_geo_cbse_221',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Evaluate the economic trade-offs between Open-Cast Mining and Underground Shaft Mining for extracting deep copper ore seams:',
    options: [
      'Open-cast is cheaper for deep deposits because surface excavators can dig down 5000 meters easily.',
      'Shaft mining is safer and requires zero capital investment in ventilation and lifts.',
      'Shaft mining minimizes surface landscape destruction but requires high capital investment, specialized ventilation/lift infrastructure, and carries high underground safety risks.',
      'Shaft mining generates zero waste tailings and no environmental impact.'
    ],
    correctIndex: 2,
    explanation: 'Shaft mining preserves surface land but demands immense capital for underground shafts, ventilation, drainage, and safety protocols.',
    hints: ['Underground infrastructure costs high capital.', 'Surface disturbance vs underground safety risk.'],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_21',
    nodeId: 'c12_geo_cbse_230',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Analyze how rapid urbanization drives agricultural transformation in peri-urban hinterlands:',
    options: [
      'Peri-urban farms switch from high-value truck farming (fresh vegetables/flowers) to extensive subsistence grain farming.',
      'High land values and urban market demand shift peri-urban farming toward intensive horticulture and truck farming, replacing extensive grain fields.',
      'Urbanization completely destroys all agricultural demand within a 500 km radius.',
      'Farmers replace all crop farming with transhumance pastoral mobility.'
    ],
    correctIndex: 1,
    explanation: 'Urban demand for fresh perishables and high peri-urban land costs drive intensive market gardening and truck farming near cities.',
    hints: ['Proximity to urban markets + high land cost.', 'Fresh perishables (vegetables, flowers) yield higher profit per acre.'],
  },
  {
    id: 'ch_22',
    nodeId: 'c12_geo_cbse_188',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How does Bhutan\'s Gross National Happiness (GNH) framework challenge traditional economic metrics like Gross National Product (GNP)?',
    options: [
      'GNH proves that material wealth is the sole determinant of human happiness.',
      'GNH asserts that spiritual well-being, environmental conservation, and cultural preservation cannot be sacrificed for purely material economic growth.',
      'GNH mandates that a nation must destroy its industrial sector to achieve happiness.',
      'GNH replaces all currency transactions with a mandatory national barter system.'
    ],
    correctIndex: 1,
    explanation: 'Bhutan\'s GNH explicitly places non-material progress—cultural, environmental, and spiritual—at par with material progress.',
    hints: ['Material vs non-material progress.', 'Environment, culture, and governance alongside income.'],
    misconceptionIndex: 4,
  },
];

// ==========================================
// TOPIC SPECIFIC SVG DIAGRAM 1: HDI PILLARS
// ==========================================
const HdiPillarsDiagram: React.FC<{ activePillar: string; onSelectPillar: (p: string) => void }> = ({ activePillar, onSelectPillar }) => {
  const pillars = [
    { id: 'equity', label: 'EQUITY', color: '#3B82F6', desc: 'Equal access to opportunities for all individuals' },
    { id: 'sustainability', label: 'SUSTAINABILITY', color: '#10B981', desc: 'Continuity of choices across generations' },
    { id: 'productivity', label: 'PRODUCTIVITY', color: '#F59E0B', desc: 'Human resource capability building & efficiency' },
    { id: 'empowerment', label: 'EMPOWERMENT', color: '#8B5CF6', desc: 'Freedom to make choices & self-determination' },
  ];

  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
      <defs>
        <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>

      {/* Roof structure: Human Development */}
      <path d="M 50 60 L 300 15 L 550 60 Z" fill="url(#roofGrad)" opacity="0.9" />
      <text x="300" y="45" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="16">
        HUMAN DEVELOPMENT (CHOICE EXPANSION)
      </text>

      {/* 4 Pillars */}
      {pillars.map((p, i) => {
        const x = 75 + i * 125;
        const isSelected = activePillar === p.id;
        return (
          <g key={p.id} onClick={() => onSelectPillar(p.id)} className="cursor-pointer transition-all duration-300">
            <rect
              x={x}
              y={70}
              width={100}
              height={120}
              rx={6}
              fill={isSelected ? p.color : '#1E293B'}
              stroke={p.color}
              strokeWidth={isSelected ? 3 : 1.5}
            />
            <text
              x={x + 50}
              y={120}
              textAnchor="middle"
              fill={isSelected ? '#FFFFFF' : p.color}
              fontWeight="bold"
              fontSize="12"
            >
              {p.label}
            </text>
            <circle cx={x + 50} cy={150} r={12} fill={p.color} opacity="0.3" />
            <text x={x + 50} y={154} textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
              {i + 1}
            </text>
          </g>
        );
      })}

      {/* Base platform */}
      <rect x="40" y="195" width="520" height="25" rx={4} fill="#334155" />
      <text x="300" y="212" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="semibold">
        FOUNDATION: HEALTH • EDUCATION • RESOURCE ACCESS
      </text>
    </svg>
  );
};

// ==========================================
// TOPIC SPECIFIC SVG DIAGRAM 2: ECONOMIC SECTOR WHEEL
// ==========================================
const EconomicSectorWheel: React.FC<{ activeSector: string; onSelectSector: (s: string) => void }> = ({ activeSector, onSelectSector }) => {
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
      {/* Primary Sector */}
      <g
        onClick={() => onSelectSector('primary')}
        className="cursor-pointer transition-all"
        transform={activeSector === 'primary' ? 'scale(1.02)' : 'scale(1)'}
      >
        <rect
          x="30"
          y="30"
          width="165"
          height="180"
          rx="10"
          fill={activeSector === 'primary' ? '#065F46' : '#0F172A'}
          stroke="#10B981"
          strokeWidth="2"
        />
        <circle cx="112" cy="75" r="28" fill="#10B981" opacity="0.2" />
        <text x="112" y="80" textAnchor="middle" fill="#10B981" fontSize="24">🌾</text>
        <text x="112" y="120" textAnchor="middle" fill="#10B981" fontWeight="bold" fontSize="15">PRIMARY</text>
        <text x="112" y="145" textAnchor="middle" fill="#A7F3D0" fontSize="11">Direct Extraction</text>
        <text x="112" y="165" textAnchor="middle" fill="#94A3B8" fontSize="10">Agri, Mining, Forestry</text>
      </g>

      {/* Flow Arrow 1 */}
      <path d="M 200 120 L 225 120" stroke="#64748B" strokeWidth="3" markerEnd="url(#arrow)" />

      {/* Secondary Sector */}
      <g
        onClick={() => onSelectSector('secondary')}
        className="cursor-pointer transition-all"
        transform={activeSector === 'secondary' ? 'scale(1.02)' : 'scale(1)'}
      >
        <rect
          x="230"
          y="30"
          width="165"
          height="180"
          rx="10"
          fill={activeSector === 'secondary' ? '#9A3412' : '#0F172A'}
          stroke="#F97316"
          strokeWidth="2"
        />
        <circle cx="312" cy="75" r="28" fill="#F97316" opacity="0.2" />
        <text x="312" y="80" textAnchor="middle" fill="#F97316" fontSize="24">🏭</text>
        <text x="312" y="120" textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="15">SECONDARY</text>
        <text x="312" y="145" textAnchor="middle" fill="#FDBA74" fontSize="11">Manufacturing & Processing</text>
        <text x="312" y="165" textAnchor="middle" fill="#94A3B8" fontSize="10">Factories, Steel, Refining</text>
      </g>

      {/* Flow Arrow 2 */}
      <path d="M 400 120 L 425 120" stroke="#64748B" strokeWidth="3" />

      {/* Tertiary Sector */}
      <g
        onClick={() => onSelectSector('tertiary')}
        className="cursor-pointer transition-all"
        transform={activeSector === 'tertiary' ? 'scale(1.02)' : 'scale(1)'}
      >
        <rect
          x="430"
          y="30"
          width="140"
          height="180"
          rx="10"
          fill={activeSector === 'tertiary' ? '#5B21B6' : '#0F172A'}
          stroke="#A855F7"
          strokeWidth="2"
        />
        <circle cx="500" cy="75" r="28" fill="#A855F7" opacity="0.2" />
        <text x="500" y="80" textAnchor="middle" fill="#A855F7" fontSize="24">🚚</text>
        <text x="500" y="120" textAnchor="middle" fill="#A855F7" fontWeight="bold" fontSize="15">TERTIARY</text>
        <text x="500" y="145" textAnchor="middle" fill="#E9D5FF" fontSize="11">Services & Trade</text>
        <text x="500" y="165" textAnchor="middle" fill="#94A3B8" fontSize="10">Transport, Edu, Banking</text>
      </g>
    </svg>
  );
};

// ==========================================
// TOPIC SPECIFIC SVG DIAGRAM 3: MINING METHODS
// ==========================================
const MiningTypeDiagram: React.FC<{ miningType: 'opencast' | 'shaft' }> = ({ miningType }) => {
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto rounded-lg bg-slate-900 border border-slate-700 shadow-xl">
      {/* Sky */}
      <rect x="0" y="0" width="600" height="70" fill="#0F172A" />
      <text x="30" y="30" fill="#94A3B8" fontSize="12" fontWeight="bold">
        SURFACE ATMOSPHERE
      </text>

      {/* Ground Surface Line */}
      <path d="M 0 70 Q 300 68 600 70" stroke="#10B981" strokeWidth="3" fill="none" />

      {/* Underground Earth Layers */}
      <rect x="0" y="70" width="600" height="170" fill="#1E1B18" />

      {miningType === 'opencast' ? (
        <g>
          {/* Open pit terraced bowl */}
          <polygon points="50,70 120,130 180,180 420,180 480,130 550,70" fill="#3B2516" stroke="#854D0E" strokeWidth="2" />
          {/* Terraces */}
          <path d="M 85,100 L 515,100 M 150,150 L 450,150" stroke="#A16207" strokeWidth="2" strokeDasharray="4,4" />
          {/* Mineral seam at shallow depth */}
          <rect x="180" y="180" width="240" height="25" fill="#EAB308" opacity="0.8" />
          <text x="300" y="197" textAnchor="middle" fill="#000000" fontWeight="bold" fontSize="11">
            SHALLOW ORE BODY (EXPOSED SURFACE)
          </text>
          {/* Dump Truck */}
          <text x="300" y="145" textAnchor="middle" fontSize="20">🚛</text>
          <text x="300" y="45" textAnchor="middle" fill="#38BDF8" fontWeight="bold" fontSize="14">
            OPEN-CAST (STRIP) MINING — LOW CAPITAL COST, HIGH SURFACE IMPACT
          </text>
        </g>
      ) : (
        <g>
          {/* Shallow layers untouched */}
          <rect x="0" y="70" width="600" height="70" fill="#2E2419" />
          {/* Vertical Shaft */}
          <rect x="270" y="40" width="60" height="180" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
          {/* Headframe Headgear */}
          <polygon points="260,40 300,5 340,40" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="300" cy="20" r="12" fill="#334155" stroke="#38BDF8" strokeWidth="2" />

          {/* Underground Horizontal Galleries */}
          <rect x="80" y="170" width="190" height="35" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="330" y="170" width="190" height="35" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />

          {/* Deep Mineral Deposit */}
          <rect x="60" y="205" width="480" height="25" fill="#F97316" opacity="0.9" />
          <text x="300" y="222" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="11">
            DEEP UNDERGROUND MINERAL SEAM (200m - 2000m DEPTH)
          </text>

          {/* Mine Cage Elevator */}
          <rect x="275" y="120" width="50" height="30" fill="#3B82F6" rx="3" />
          <text x="300" y="140" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">CAGE</text>

          <text x="300" y="45" textAnchor="middle" fill="#F97316" fontWeight="bold" fontSize="14">
            UNDERGROUND SHAFT MINING — HIGH CAPITAL COST & VENTILATION NEEDED
          </text>
        </g>
      )}
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export default function C12_GeoHumanDevelopmentCBSESim({ onComplete }: { onComplete?: (score: number) => void }) {
  // --- STATE SETUP ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLab, setActiveLab] = useState<number>(0);

  // --- BKT & SRS MASTERY STATE ---
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // --- INTERACTIVE LAB STALER VARIABLES ---
  // Lab 1: HDI Calculator
  const [healthIndex, setHealthIndex] = useState<number>(72); // Life expectancy (years)
  const [schoolingIndex, setSchoolingIndex] = useState<number>(11); // Mean/Expected schooling (years)
  const [incomeIndex, setIncomeIndex] = useState<number>(14500); // GNI per capita PPP ($)
  const [activePillar, setActivePillar] = useState<string>('equity');

  // Lab 2: Economic Activity Sector Breakdown
  const [primaryPct, setPrimaryPct] = useState<number>(55);
  const [secondaryPct, setSecondaryPct] = useState<number>(20);
  const [tertiaryPct, setTertiaryPct] = useState<number>(25);
  const [activeSector, setActiveSector] = useState<string>('primary');

  // Lab 3: Agriculture Systems
  const [agriSystem, setAgriSystem] = useState<'subsistence' | 'plantation' | 'mixed' | 'shifting' | 'dry'>('subsistence');
  const [cropRotationCycle, setCropRotationCycle] = useState<number>(1);
  const [fallowerYears, setFallowerYears] = useState<number>(3);

  // Lab 4: Mining Systems
  const [miningType, setMiningType] = useState<'opencast' | 'shaft'>('opencast');
  const [miningDepth, setMiningDepth] = useState<number>(45); // meters
  const [safetyInvestment, setSafetyInvestment] = useState<number>(60); // scale 0-100

  // Lab 5: Global Country Profiler
  const [selectedCountryGroup, setSelectedCountryGroup] = useState<'very_high' | 'high' | 'medium' | 'low'>('medium');

  // --- DISCOVERY & PREDICTION QUESTION STATE ---
  const [discAnswered, setDiscAnswered] = useState<boolean>(false);
  const [discSelected, setDiscSelected] = useState<number | null>(null);

  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});

  // --- CHALLENGE STATE ---
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // --- FEEDBACK & AUDIO/SPEECH STATE ---
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint timer (10s inactivity)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!challengeSubmitted && activeTab === 'challenges') {
        const ch = CHALLENGES[currentChallengeIdx];
        if (ch && ch.hints.length > 0) {
          setCurrentHint(`Hint: ${ch.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 10000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, challengeSubmitted]);

  // Initial speech welcome
  useEffect(() => {
    speechManager.speak('Welcome to the Global Human Development and Economic Geography Observatory.');
  }, []);

  // --- DERIVED CALCULATIONS FOR LAB 1 (HDI) ---
  const calculatedIndices = useMemo(() => {
    // Standardized UNDP normalization formulas:
    // Health Index: (LifeExp - 20) / (85 - 20)
    const hIdx = Math.min(1, Math.max(0, (healthIndex - 20) / (85 - 20)));

    // Education Index: (MeanSchooling / 15)
    const eIdx = Math.min(1, Math.max(0, schoolingIndex / 15));

    // Income Index: ln(GNI) - ln(100) / (ln(75000) - ln(100))
    const minGni = Math.log(100);
    const maxGni = Math.log(75000);
    const currGni = Math.log(Math.max(100, incomeIndex));
    const iIdx = Math.min(1, Math.max(0, (currGni - minGni) / (maxGni - minGni)));

    // Composite HDI Geometric Mean
    const compositeHdi = Math.pow(hIdx * eIdx * iIdx, 1 / 3);

    let category = 'Low Human Development';
    let catColor = 'text-red-400';
    if (compositeHdi >= 0.800) {
      category = 'Very High Human Development';
      catColor = 'text-emerald-400';
    } else if (compositeHdi >= 0.700) {
      category = 'High Human Development';
      catColor = 'text-gold-400';
    } else if (compositeHdi >= 0.550) {
      category = 'Medium Human Development';
      catColor = 'text-amber-400';
    }

    return { hIdx, eIdx, iIdx, compositeHdi, category, catColor };
  }, [healthIndex, schoolingIndex, incomeIndex]);

  // --- DISCOVERY QUESTION HANDLER ---
  const handleDiscoverySubmit = (index: number) => {
    setDiscSelected(index);
    setDiscAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Human Development is qualitative and expands human freedoms beyond mere economic growth.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider the critical distinction between quantitative growth and qualitative development.');
    }
  };

  // --- CHALLENGE SUBMISSION HANDLER ---
  const handleChallengeSubmit = (optionIndex: number) => {
    if (challengeSubmitted) return;
    setSelectedOption(optionIndex);
    setChallengeSubmitted(true);
    const currentChallenge = CHALLENGES[currentChallengeIdx];
    const isCorrect = optionIndex === currentChallenge.correctIndex;

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState(nodeId);
    const newBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: newBkt }));

    const oldSrs = srsItems[nodeId] || createReviewItem(nodeId);
    const newSrs = sm2Update(oldSrs, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [nodeId]: newSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent analysis! Correct answer.');
      setShowSparkle(true);
      setScore((prev) => prev + 10);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That is incorrect. Review the core geographical concept and explanation.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedOption(null);
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges!
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all Human Development Observatory challenges.');
      setShowConfetti(true);
      setShowSuccess(true);
      recordGameScore('C12_GeoHumanDevelopmentCBSESim', score, 220);
      if (onComplete) onComplete(score);
    }
  };

  // Tab switcher wrapper with sound & speech
  const switchTab = (tab: 'discovery' | 'lab' | 'challenges' | 'summary') => {
    setActiveTab(tab);
    audioManager.play('tap');
    if (tab === 'lab') speechManager.speak('Entering Interactive Exploration Laboratories.');
    if (tab === 'challenges') speechManager.speak('Entering Challenge Assessment Mode.');
    if (tab === 'summary') speechManager.speak('Reviewing Masterplan Summary and Diagnostic Insights.');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none">
      {/* UI OVERLAY FEEDBACK COMPONENTS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Observed All 22 Challenges Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* TOP NAVIGATION HEADER */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center text-2xl shadow-lg shadow-gold-500/30">
            🌍
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-purple-400">
              Human Development & Economic Geography Lab
            </h1>
            <p className="text-xs text-slate-400">ISC / CBSE Class 12 Geography • Chapter 3 & 4 Concepts</p>
          </div>
        </div>

        {/* TABS BUTTONS */}
        <div className="flex flex-wrap gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'discovery', label: '1. Discovery', icon: '💡' },
            { id: 'lab', label: '2. Interactive Lab', icon: '🔬' },
            { id: 'challenges', label: '3. Challenges (22)', icon: '🏆' },
            { id: 'summary', label: '4. Masterplan', icon: '📊' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id as unknown as 'discovery' | 'lab' | 'challenges' | 'summary')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-gold-600 to-gold-600 text-white shadow-md shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </header>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* NARRATIVE SCENARIO BOX */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                SCENARIO MISSION
              </span>
              <h2 className="text-lg font-bold text-slate-100">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs italic">{SCENARIO.context}</p>
          </section>

          {/* DISCOVERY QUESTION CARD */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-gold-400 mb-2 flex items-center gap-2">
              <span>❓</span> Key Preconception Discovery Question
            </h3>
            <p className="text-slate-200 font-medium text-sm mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  className={`p-4 rounded-xl text-xs sm:text-sm font-medium text-left transition-all border ${
                    discSelected === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-red-950/80 border-red-500 text-red-200'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>

            {discAnswered && (
              <div className="p-4 rounded-xl bg-gold-950/50 border border-gold-800/60 text-gold-200 text-xs sm:text-sm animate-fade-in">
                <p className="font-bold mb-1">💡 Conceptual Insight:</p>
                <p>{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </section>

          {/* PREDICTION QUESTIONS LIST */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-purple-400 mb-4 flex items-center gap-2">
              <span>🔮</span> Hypothesis & Prediction Challenges
            </h3>
            <div className="space-y-6">
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <p className="text-slate-200 text-sm font-semibold mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pq.options.map((opt, oIdx) => {
                      const isSel = predAnswers[pIdx] === oIdx;
                      const isCorr = oIdx === pq.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                            audioManager.play(isCorr ? 'drop-correct' : 'drop-wrong');
                          }}
                          className={`p-3 rounded-lg text-xs font-medium text-left border transition-all ${
                            isSel
                              ? isCorr
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                                : 'bg-red-900/60 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400 italic">🔬 How to verify: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 2: INTERACTIVE LABS */}
      {activeTab === 'lab' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* LAB SUB-NAV SELECTOR */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLab(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeLab === idx
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>

          {/* EXPLORATION STEP INSTRUCTION BANNER */}
          <div className="bg-gold-950/40 border border-gold-800/60 rounded-xl p-4 text-xs sm:text-sm text-gold-200 flex items-center justify-between gap-4">
            <div>
              <span className="font-bold text-gold-400">Lab Directive: </span>
              {EXPLORATION_STEPS[activeLab].instruction}
            </div>
            <span className="px-2.5 py-1 rounded bg-gold-900/80 text-gold-300 text-xs font-mono">
              Node: {EXPLORATION_STEPS[activeLab].nodeId}
            </span>
          </div>

          {/* LAB CONTENT RENDERER */}
          {activeLab === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* SLIDERS PANEL */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
                <h3 className="text-base font-bold text-gold-400">HDI Dimension Variable Controls</h3>

                {/* Health Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Health: Life Expectancy at Birth</span>
                    <span className="text-emerald-400 font-mono font-bold">{healthIndex} Years</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="85"
                    value={healthIndex}
                    onChange={(e) => {
                      setHealthIndex(Number(e.target.value));
                      audioManager.play('swoop');
                    }}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>20 yrs (Min)</span>
                    <span>85 yrs (Max Cap)</span>
                  </div>
                </div>

                {/* Education Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Education: Mean/Expected Schooling</span>
                    <span className="text-gold-400 font-mono font-bold">{schoolingIndex} Years</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={schoolingIndex}
                    onChange={(e) => {
                      setSchoolingIndex(Number(e.target.value));
                      audioManager.play('swoop');
                    }}
                    className="w-full accent-gold-500 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>0 yrs</span>
                    <span>15 yrs</span>
                  </div>
                </div>

                {/* Income Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Access to Resources: GNI per capita (PPP)</span>
                    <span className="text-amber-400 font-mono font-bold">${incomeIndex.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="75000"
                    step="500"
                    value={incomeIndex}
                    onChange={(e) => {
                      setIncomeIndex(Number(e.target.value));
                      audioManager.play('swoop');
                    }}
                    className="w-full accent-amber-500 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>$100</span>
                    <span>$75,000 (Max Cap)</span>
                  </div>
                </div>

                {/* CALCULATED RESULTS */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Composite HDI Score:</span>
                    <span className={`text-2xl font-black font-mono ${calculatedIndices.catColor}`}>
                      {calculatedIndices.compositeHdi.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">UNDP Classification:</span>
                    <span className={`font-bold ${calculatedIndices.catColor}`}>{calculatedIndices.category}</span>
                  </div>
                  {/* Indices Breakdown Bar */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-center">
                    <div className="bg-emerald-950/60 border border-emerald-800/60 p-1.5 rounded">
                      <div className="text-slate-400">Health</div>
                      <div className="text-emerald-300 font-bold">{calculatedIndices.hIdx.toFixed(3)}</div>
                    </div>
                    <div className="bg-gold-950/60 border border-gold-800/60 p-1.5 rounded">
                      <div className="text-slate-400">Education</div>
                      <div className="text-gold-300 font-bold">{calculatedIndices.eIdx.toFixed(3)}</div>
                    </div>
                    <div className="bg-amber-950/60 border border-amber-800/60 p-1.5 rounded">
                      <div className="text-slate-400">Income</div>
                      <div className="text-amber-300 font-bold">{calculatedIndices.iIdx.toFixed(3)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SVG PILLARS DIAGRAM & EXPLANATION */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-200">Four Pillars of Human Development</h3>
                <HdiPillarsDiagram activePillar={activePillar} onSelectPillar={(p) => setActivePillar(p)} />

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs space-y-2">
                  <p className="font-bold text-gold-400">
                    Selected Pillar Focus:{' '}
                    {activePillar === 'equity'
                      ? 'Equity (Equal Access)'
                      : activePillar === 'sustainability'
                      ? 'Sustainability (Intergenerational Continuity)'
                      : activePillar === 'productivity'
                      ? 'Productivity (Human Labour Capability)'
                      : 'Empowerment (Freedom & Agency)'}
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    {activePillar === 'equity' &&
                      'Equity requires providing equal opportunities to all people regardless of gender, caste, race, or income. Disparities in educational access directly depress the overall composite HDI.'}
                    {activePillar === 'sustainability' &&
                      'Sustainability means continuity in the availability of environmental, financial, and human resources so that future generations enjoy equal choices.'}
                    {activePillar === 'productivity' &&
                      'Productivity here refers to human labor productivity. Investing in health, knowledge, and skills builds human capabilities and increases economic efficiency.'}
                    {activePillar === 'empowerment' &&
                      'Empowerment means having the power to make choices. Good governance, gender equity, and democratic participation empower marginalized communities.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeLab === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-emerald-400">Workforce Sector Allocation</h3>
                <p className="text-xs text-slate-300">
                  Adjust primary sector share to model structural economic transition from agrarian to industrial & tertiary economy.
                </p>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Primary Sector Workforce</span>
                    <span className="text-emerald-400 font-bold">{primaryPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={primaryPct}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setPrimaryPct(val);
                      const rem = 100 - val;
                      setSecondaryPct(Math.round(rem * 0.45));
                      setTertiaryPct(Math.round(rem * 0.55));
                      audioManager.play('swoop');
                    }}
                    className="w-full accent-emerald-500 bg-slate-800 rounded-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400">Secondary Sector</span>
                    <div className="text-lg font-bold text-orange-400">{secondaryPct}%</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] text-slate-400">Tertiary Sector</span>
                    <div className="text-lg font-bold text-purple-400">{tertiaryPct}%</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-200">Sectoral Activity Diagram</h3>
                <EconomicSectorWheel activeSector={activeSector} onSelectSector={(s) => setActiveSector(s)} />
              </div>
            </div>
          )}

          {activeLab === 2 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-base font-bold text-amber-400">Agricultural Systems & Land Management Simulator</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'subsistence', label: 'Subsistence Farming' },
                  { id: 'plantation', label: 'Plantation Crops' },
                  { id: 'mixed', label: 'Mixed Farming' },
                  { id: 'shifting', label: 'Shifting (Jhuming)' },
                  { id: 'dry', label: 'Dry Farming' },
                ].map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => {
                      setAgriSystem(sys.id as unknown as 'subsistence' | 'plantation' | 'mixed' | 'shifting' | 'dry');
                      audioManager.play('pop');
                    }}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                      agriSystem === sys.id
                        ? 'bg-amber-600 text-white border-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {sys.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Description Box */}
              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                <h4 className="font-bold text-amber-300 text-sm capitalize">{agriSystem} Agriculture Characteristics</h4>
                {agriSystem === 'subsistence' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Practiced on small fragmented landholdings with family labor and simple tools. Output is primarily consumed locally by the farm family. Primitive subsistence includes shifting agriculture, while intensive subsistence relies heavily on manual labor and crop rotation.
                  </p>
                )}
                {agriSystem === 'plantation' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Introduced by Europeans in tropical colonies. Characterized by large estate sizes, monoculture cash crops (tea, coffee, rubber, cocoa), heavy capital investment, scientific management, and specialized processing factories on site.
                  </p>
                )}
                {agriSystem === 'mixed' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Found in highly developed regions (Western Europe, North America). Equal emphasis on growing grain crops (wheat, barley) and raising livestock (cattle, poultry). High capital investment in machinery, crop rotation, and chemical fertilizers guarantees high yields.
                  </p>
                )}
                {agriSystem === 'shifting' && (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Slash-and-burn farming practiced by tribal communities in humid tropics. Vegetation is cleared, burned for ash nutrients, and cultivated for 2-3 years. Once soil fertility drops, the plot is left fallow for regeneration.
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold text-slate-400">Fallow Regeneration Time:</span>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        value={fallowerYears}
                        onChange={(e) => setFallowerYears(Number(e.target.value))}
                        className="accent-amber-500 bg-slate-800"
                      />
                      <span className="text-xs font-bold text-amber-400">{fallowerYears} Years</span>
                    </div>
                  </div>
                )}
                {agriSystem === 'dry' && (
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Practiced in arid and semi-arid regions with annual rainfall &lt; 75 cm. Focuses on drought-resistant crops like jowar, bajra, pulses, and ragi. Uses moisture-conserving practices like contour ploughing and mulching.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeLab === 3 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-gold-400">Mining Technology & Resource Extraction Lab</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMiningType('opencast');
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      miningType === 'opencast'
                        ? 'bg-gold-600 border-gold-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Open-Cast (Surface)
                  </button>
                  <button
                    onClick={() => {
                      setMiningType('shaft');
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      miningType === 'shaft'
                        ? 'bg-gold-600 border-gold-400 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    Shaft (Underground)
                  </button>
                </div>
              </div>

              <MiningTypeDiagram miningType={miningType} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold">Capital Expenditure:</span>
                  <div className="text-lg font-bold text-emerald-400">
                    {miningType === 'opencast' ? 'Low to Moderate' : 'Very High ($50M+)'}
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold">Worker Safety Risk:</span>
                  <div className="text-lg font-bold text-amber-400">
                    {miningType === 'opencast' ? 'Low (Surface Operations)' : 'High (Gasses & Cave-ins)'}
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-semibold">Surface Land Degradation:</span>
                  <div className="text-lg font-bold text-red-400">
                    {miningType === 'opencast' ? 'Extensive Topsoil Stripping' : 'Minimal Surface Footprint'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeLab === 4 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-base font-bold text-purple-400">Global Country HDI Profiles & Indicators</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'very_high', label: 'Very High HDI (≥0.800)', color: 'border-emerald-500' },
                  { id: 'high', label: 'High HDI (0.700 - 0.799)', color: 'border-gold-500' },
                  { id: 'medium', label: 'Medium HDI (0.550 - 0.699)', color: 'border-amber-500' },
                  { id: 'low', label: 'Low HDI (<0.550)', color: 'border-red-500' },
                ].map((grp) => (
                  <button
                    key={grp.id}
                    onClick={() => {
                      setSelectedCountryGroup(grp.id as unknown as 'very_high' | 'high' | 'medium' | 'low');
                      audioManager.play('pop');
                    }}
                    className={`p-3 rounded-xl text-xs font-bold transition-all border ${
                      selectedCountryGroup === grp.id
                        ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                        : `bg-slate-800 ${grp.color} text-slate-300 hover:bg-slate-700`
                    }`}
                  >
                    {grp.label}
                  </button>
                ))}
              </div>

              <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
                {selectedCountryGroup === 'very_high' && (
                  <div>
                    <h4 className="font-bold text-emerald-400 text-sm mb-2">Very High Human Development Group</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Includes 66 nations such as Norway, Switzerland, Denmark, and Singapore. Characteristics include heavy social investment in healthcare, universal tertiary education, and high per capita income.
                    </p>
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-950/40 p-3 rounded border border-emerald-800/50">
                      Average Life Expectancy: &gt;82 Years • Mean Schooling: &gt;13.5 Years • GNI per capita: &gt;$45,000 PPP
                    </div>
                  </div>
                )}
                {selectedCountryGroup === 'high' && (
                  <div>
                    <h4 className="font-bold text-gold-400 text-sm mb-2">High Human Development Group</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Includes around 53 nations such as Malaysia, Russia, and Brazil. Fast industrializing economies with expanding tertiary sectors and improved healthcare infrastructure.
                    </p>
                    <div className="text-xs font-mono text-gold-300 bg-gold-950/40 p-3 rounded border border-gold-800/50">
                      Average Life Expectancy: 74-78 Years • Mean Schooling: 10-12 Years • GNI per capita: $15,000-$30,000 PPP
                    </div>
                  </div>
                )}
                {selectedCountryGroup === 'medium' && (
                  <div>
                    <h4 className="font-bold text-amber-400 text-sm mb-2">Medium Human Development Group (Includes India)</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Includes around 37 nations including India, Bangladesh, and Indonesia. Countries in this tier emerged post-decolonization, currently undergoing rapid urbanization and structural expansion.
                    </p>
                    <div className="text-xs font-mono text-amber-300 bg-amber-950/40 p-3 rounded border border-amber-800/50">
                      Average Life Expectancy: 67-72 Years • Mean Schooling: 6.5-9 Years • GNI per capita: $4,000-$10,000 PPP
                    </div>
                  </div>
                )}
                {selectedCountryGroup === 'low' && (
                  <div>
                    <h4 className="font-bold text-red-400 text-sm mb-2">Low Human Development Group</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      Includes 33 nations located predominantly in Sub-Saharan Africa and conflict-affected zones. Characterized by political instability, high incidence of infectious diseases, and economic reliance on subsistence agriculture.
                    </p>
                    <div className="text-xs font-mono text-red-300 bg-red-950/40 p-3 rounded border border-red-800/50">
                      Average Life Expectancy: &lt;62 Years • Mean Schooling: &lt;5.5 Years • GNI per capita: &lt;$3,000 PPP
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS AT BOTTOM OF LAB */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>👁️</span> Empirical Observation & Analysis Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                  <p className="text-slate-200 text-xs sm:text-sm font-semibold mb-3">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, optIdx) => {
                      const isSel = obsAnswers[oIdx] === optIdx;
                      const isCorr = optIdx === oq.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObsAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                            audioManager.play(isCorr ? 'drop-correct' : 'drop-wrong');
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs font-medium border transition-all ${
                            isSel
                              ? isCorr
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-red-950 border-red-500 text-red-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 3: 22 PROGRESSIVE CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto space-y-6">
          {/* PROGRESS HEADER */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex justify-between items-center">
            <div>
              <span className="text-xs text-slate-400">Challenge Progress</span>
              <div className="text-lg font-bold text-slate-100 font-mono">
                {currentChallengeIdx + 1} of {CHALLENGES.length}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                }`}
              >
                {CHALLENGES[currentChallengeIdx].difficulty} • {CHALLENGES[currentChallengeIdx].competencyLevel}
              </span>
              <div className="bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg text-xs font-mono font-bold text-gold-400">
                Score: {score}
              </div>
            </div>
          </div>

          {/* CHALLENGE CARD */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">Node ID: {CHALLENGES[currentChallengeIdx].nodeId}</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                {CHALLENGES[currentChallengeIdx].question}
              </h2>
            </div>

            {/* OPTIONS */}
            <div className="space-y-3">
              {CHALLENGES[currentChallengeIdx].options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === CHALLENGES[currentChallengeIdx].correctIndex;
                let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600';

                if (challengeSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={challengeSubmitted}
                    onClick={() => handleChallengeSubmit(oIdx)}
                    className={`w-full p-4 rounded-xl text-xs sm:text-sm text-left border transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-bold text-gold-400 mt-0.5">{String.fromCharCode(65 + oIdx)}.</span>
                    <span className="leading-relaxed">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* EXPLANATION & MISCONCEPTIONS */}
            {challengeSubmitted && (
              <div className="space-y-4 pt-4 border-t border-slate-800 animate-fade-in">
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm ${
                    selectedOption === CHALLENGES[currentChallengeIdx].correctIndex
                      ? 'bg-emerald-950/40 border border-emerald-800/60 text-emerald-200'
                      : 'bg-red-950/40 border border-red-800/60 text-red-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {selectedOption === CHALLENGES[currentChallengeIdx].correctIndex
                      ? '✅ Correct Explanation:'
                      : '❌ Key Insight & Explanation:'}
                  </p>
                  <p className="leading-relaxed">{CHALLENGES[currentChallengeIdx].explanation}</p>
                </div>

                {CHALLENGES[currentChallengeIdx].misconceptionIndex !== undefined && (
                  <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-xl text-xs text-amber-200">
                    <span className="font-bold">⚠️ Misconception Clarification: </span>
                    {MISCONCEPTIONS[CHALLENGES[currentChallengeIdx].misconceptionIndex!].correction}
                  </div>
                )}

                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gold-600 to-gold-600 font-bold text-sm text-white shadow-lg shadow-gold-600/30 hover:brightness-110 transition-all"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Finish Simulator 🏆'}
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {/* TAB 4: SUMMARY & REAL WORLD ACTIVITY */}
      {activeTab === 'summary' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* REAL WORLD ACTIVITY WORKBENCH */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                REAL WORLD TASK WORKBENCH
              </span>
              <h2 className="text-lg font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-purple-400">Step {sIdx + 1}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{st}</p>
                </div>
              ))}
            </div>
          </section>

          {/* MISCONCEPTIONS REVIEW GRID */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <span>🧠</span> Core Misconceptions & Scientific Corrections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-red-400 line-through">{m.misconception}</p>
                  <p className="text-xs text-emerald-300 font-medium leading-relaxed">✅ {m.correction}</p>
                  <span className="inline-block text-[10px] text-slate-500 font-mono">Node: {m.nodeId}</span>
                </div>
              ))}
            </div>
          </section>

          {/* DIAGNOSTIC KNOWLEDGE MATRIX */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-gold-400 flex items-center gap-2">
              <span>📋</span> Diagnostic Knowledge Readiness Matrix
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((dq) => {
                const nodeMastery = getMasteryLevel(bktStates[dq.nodeId]);
                return (
                  <div key={dq.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-200">{dq.question}</div>
                      <div className="text-[11px] text-slate-400">Node: {dq.nodeId}</div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded text-xs font-bold uppercase ${
                        nodeMastery === 'mastered'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {nodeMastery}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}