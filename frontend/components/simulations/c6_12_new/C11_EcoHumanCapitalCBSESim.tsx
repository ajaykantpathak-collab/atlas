'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES & INTERFACES
// ==========================================
type NodeId =
  | 'c11_eco_cbse_128' | 'c11_eco_cbse_129' | 'c11_eco_cbse_130' | 'c11_eco_cbse_131'
  | 'c11_eco_cbse_132' | 'c11_eco_cbse_133' | 'c11_eco_cbse_134' | 'c11_eco_cbse_135'
  | 'c11_eco_cbse_136' | 'c11_eco_cbse_137' | 'c11_eco_cbse_138' | 'c11_eco_cbse_139'
  | 'c11_eco_cbse_140' | 'c11_eco_cbse_141' | 'c11_eco_cbse_142' | 'c11_eco_cbse_143'
  | 'c11_eco_cbse_144' | 'c11_eco_cbse_145' | 'c11_eco_cbse_146' | 'c11_eco_cbse_147'
  | 'c11_eco_cbse_148' | 'c11_eco_cbse_149' | 'c11_eco_cbse_150' | 'c11_eco_cbse_151'
  | 'c11_eco_cbse_152' | 'c11_eco_cbse_153' | 'c11_eco_cbse_154' | 'c11_eco_cbse_155'
  | 'c11_eco_cbse_156' | 'c11_eco_cbse_157' | 'c11_eco_cbse_158' | 'c11_eco_cbse_159';

interface NodeDetail {
  id: NodeId;
  title: string;
  definition: string;
  eli5: string;
  keyStatOrFact: string;
}

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple_choice' | 'numeric' | 'classification' | 'true_false' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: 'slider_matrix' | 'capital_comparison' | 'pyramid_inspector' | 'policy_budget_allocator' | 'knowledge_economy_sim';
  nodeId: NodeId;
}

interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

interface Misconception {
  title: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

interface DiagnosticQuestion {
  id: string;
  nodeId: NodeId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface MacroSimState {
  educationGdpPct: number; // e.g. 3.0 to 6.0
  healthGdpPct: number;    // e.g. 1.0 to 4.5
  ojtIncentive: number;    // 0 to 100
  rteStrictness: number;   // 0 to 100
  migrationMobility: number; // 0 to 100
  cessRate: number;        // 0 to 5%
  nepImplementation: number; // 0 to 100
}

// ==========================================
// CONSTANTS & CURRICULUM DATA
// ==========================================
const ALL_NODE_IDS: NodeId[] = [
  'c11_eco_cbse_128', 'c11_eco_cbse_129', 'c11_eco_cbse_130', 'c11_eco_cbse_131',
  'c11_eco_cbse_132', 'c11_eco_cbse_133', 'c11_eco_cbse_134', 'c11_eco_cbse_135',
  'c11_eco_cbse_136', 'c11_eco_cbse_137', 'c11_eco_cbse_138', 'c11_eco_cbse_139',
  'c11_eco_cbse_140', 'c11_eco_cbse_141', 'c11_eco_cbse_142', 'c11_eco_cbse_143',
  'c11_eco_cbse_144', 'c11_eco_cbse_145', 'c11_eco_cbse_146', 'c11_eco_cbse_147',
  'c11_eco_cbse_148', 'c11_eco_cbse_149', 'c11_eco_cbse_150', 'c11_eco_cbse_151',
  'c11_eco_cbse_152', 'c11_eco_cbse_153', 'c11_eco_cbse_154', 'c11_eco_cbse_155',
  'c11_eco_cbse_156', 'c11_eco_cbse_157', 'c11_eco_cbse_158', 'c11_eco_cbse_159'
];

const NODE_DETAILS: Record<NodeId, NodeDetail> = {
  c11_eco_cbse_128: {
    id: 'c11_eco_cbse_128',
    title: 'Human Resources: Definition and Role',
    definition: 'Human resources refer to the aggregate of physical and mental abilities, skills, and knowledge embodied in the population of a nation.',
    eli5: 'It is the entire working population of a country, including their muscles, brainpower, and talents.',
    keyStatOrFact: 'India possesses one of the world\'s largest labor forces exceeding 500 million people.'
  },
  c11_eco_cbse_129: {
    id: 'c11_eco_cbse_129',
    title: 'Human Capital: Concept and Definition',
    definition: 'Human capital represents the stock of skill, expertise, education, knowledge, and health embodied in the workforce at any given point in time.',
    eli5: 'Think of human capital as the upgraded software running inside workers\' brains and bodies that helps them produce more goods and services.',
    keyStatOrFact: 'Skills and health turn raw labor into highly productive human capital.'
  },
  c11_eco_cbse_130: {
    id: 'c11_eco_cbse_130',
    title: 'Human Capital Formation: Process and Meaning',
    definition: 'The process of acquiring and increasing the number of persons who have the skills, education, and experience critical for economic growth.',
    eli5: 'It is the step-by-step investment (schooling, training, health care) that turns untrained citizens into skilled professionals like doctors, engineers, and scientists.',
    keyStatOrFact: 'Human capital formation transforms human resource liabilities into economic assets.'
  },
  c11_eco_cbse_131: {
    id: 'c11_eco_cbse_131',
    title: 'Sources of Human Capital: Overview',
    definition: 'The major channels of investment through which human capital is accumulated: Education, Health, On-the-Job Training, Migration, and Information.',
    eli5: 'The 5 main pillars that build human brainpower and work capacity.',
    keyStatOrFact: 'Education and health are recognized as the two most critical sources.'
  },
  c11_eco_cbse_132: {
    id: 'c11_eco_cbse_132',
    title: 'Education as a Source of Human Capital',
    definition: 'Investment in education enhances earning capacity, cognitive abilities, technical skills, and social awareness of individuals.',
    eli5: 'Going to school and college teaches you how to think, build, communicate, and earn a better living.',
    keyStatOrFact: 'Returns on investment in primary and secondary education often exceed returns on physical capital.'
  },
  c11_eco_cbse_133: {
    id: 'c11_eco_cbse_133',
    title: 'Health as a Source of Human Capital',
    definition: 'Expenditure on preventive, curative, and social medicine directly impacts physical stamina, mental clarity, and lifetime working days.',
    eli5: 'A healthy worker misses fewer workdays, works faster, stays energetic, and lives longer.',
    keyStatOrFact: 'Preventive medicine (vaccination) yields massive cost savings compared to curative medicine.'
  },
  c11_eco_cbse_134: {
    id: 'c11_eco_cbse_134',
    title: 'On-the-Job Training as Human Capital Investment',
    definition: 'Firm-provided practical training (in-house or off-site) that upgrades worker productivity directly in specific industrial processes.',
    eli5: 'Learning specialized tasks while working on the shop floor under expert guidance.',
    keyStatOrFact: 'Firms recover OJT costs by conditioning workers to work for a minimum contractual period.'
  },
  c11_eco_cbse_135: {
    id: 'c11_eco_cbse_135',
    title: 'Migration as a Source of Human Capital Formation',
    definition: 'Movement of people from lower-earning regions to higher-earning regions involving transport and living costs, which are offset by higher future earnings.',
    eli5: 'Moving to a big city or abroad to get a job that pays much higher than rural wages.',
    keyStatOrFact: 'Migration increases human capital utilization despite initial moving costs.'
  },
  c11_eco_cbse_136: {
    id: 'c11_eco_cbse_136',
    title: 'Information as a Source of Human Capital',
    definition: 'Expenditure incurred to acquire reliable data regarding labor markets, educational institutes, skill demand, and prevailing wage rates.',
    eli5: 'Spending money or time to find out which degrees pay well and where job openings exist.',
    keyStatOrFact: 'Information removes market frictions and prevents skill-job mismatches.'
  },
  c11_eco_cbse_137: {
    id: 'c11_eco_cbse_137',
    title: 'Physical Capital versus Human Capital',
    definition: 'Physical capital (machinery, buildings) is tangible, separable from owner, mobile across borders, depreciates with physical wear, and yields private benefits. Human capital is intangible, inseparable from owner, restricted in international mobility by borders, depreciates with age, and generates external benefits.',
    eli5: 'A machine can be sold or moved to another country without its creator; a doctor\'s medical skill is locked inside their brain and body and improves surrounding public health.',
    keyStatOrFact: 'Human capital creates positive external benefits for society that physical capital cannot.'
  },
  c11_eco_cbse_138: {
    id: 'c11_eco_cbse_138',
    title: 'Human Capital and Economic Growth',
    definition: 'The circular feedback mechanism where human capital enhances labor productivity, drives technological innovation, increases total factor productivity, and elevates real GDP per capita.',
    eli5: 'Smarter, healthier workers invent better tools, work faster, boost national income, and generate higher tax revenue for more schools.',
    keyStatOrFact: 'Empirical studies confirm strong correlation between literacy rates and per capita income expansion.'
  },
  c11_eco_cbse_139: {
    id: 'c11_eco_cbse_139',
    title: 'Human Development: Concept and Perspective',
    definition: 'A holistic framework centered on expanding human choices, freedoms, capability enrichment, health, and dignity as an end in itself.',
    eli5: 'Ensuring human beings live long, healthy, knowledgeable, and respectful lives, regardless of immediate economic output.',
    keyStatOrFact: 'Human Development treats humans as the ultimate END of development, not just a MEANS to produce GDP.'
  },
  c11_eco_cbse_140: {
    id: 'c11_eco_cbse_140',
    title: 'Human Capital versus Human Development: Key Distinctions',
    definition: 'Human Capital treats education/health as instruments/means to raise labor productivity. Human Development considers education/health as fundamental human rights and goals in themselves.',
    eli5: 'Human Capital: "Learn to earn and produce." Human Development: "Learn and stay healthy to live a fulfilling life."',
    keyStatOrFact: 'If investment in a disabled or elderly person yields low economic output, Human Capital ignores it, but Human Development prioritizes it.'
  },
  c11_eco_cbse_141: {
    id: 'c11_eco_cbse_141',
    title: 'External Benefits of Human Capital Investment',
    definition: 'Positive spillovers (externalities) enjoyed by third parties and society at large when an individual gains education or health improvements.',
    eli5: 'When an educated nurse sanitizes a clinic, nearby neighbors don\'t catch infections—even if they didn\'t pay for her college degree!',
    keyStatOrFact: 'Externalities justify heavy government subsidies in basic education and public sanitation.'
  },
  c11_eco_cbse_142: {
    id: 'c11_eco_cbse_142',
    title: 'Government Intervention in Education Sector',
    definition: 'Public provision, regulation, and funding of education needed due to high fixed setup costs, long gestation periods, natural monopolies, and private market failures.',
    eli5: 'Private companies won\'t build cheap primary schools in poor villages; the government must step in to make schooling accessible to all.',
    keyStatOrFact: 'Education has long gestation periods; private investors demand short-term profits, necessitating public intervention.'
  },
  c11_eco_cbse_143: {
    id: 'c11_eco_cbse_143',
    title: 'Government Intervention in Health Sector',
    definition: 'State participation in healthcare provision, immunization, disease surveillance, and sanitation due to asymmetric information and public health spillover risks.',
    eli5: 'Patients cannot evaluate complex medical treatments easily; free public hospitals protect vulnerable citizens from exploitation and epidemics.',
    keyStatOrFact: 'Unregulated health markets lead to catastrophic out-of-pocket spending pushing families into poverty.'
  },
  c11_eco_cbse_144: {
    id: 'c11_eco_cbse_144',
    title: 'Government Organizations in the Education Sector',
    definition: 'Apex regulatory and administrative bodies in India: NCERT (school curriculum), UGC (university standards), AICTE (technical education), and State Boards.',
    eli5: 'The regulatory watchdog teams that set syllabus rules, check college quality, and print textbooks in India.',
    keyStatOrFact: 'NCERT designs national frameworks while UGC grants university accreditations.'
  },
  c11_eco_cbse_145: {
    id: 'c11_eco_cbse_145',
    title: 'Government Organizations in the Health Sector',
    definition: 'Key institutional entities such as ICMR (Indian Council of Medical Research), Ministry of Health & Family Welfare, and National Health Mission (NHM).',
    eli5: 'The top national bodies conducting medical research, designing health campaigns, and operating public health centers.',
    keyStatOrFact: 'ICMR formulates ethical protocols and medical research guidelines across India.'
  },
  c11_eco_cbse_146: {
    id: 'c11_eco_cbse_146',
    title: 'Education Expenditure as Percentage of Total Government Spending',
    definition: 'The proportion of total government budgetary budget allocated specifically to educational infrastructure, teacher salaries, and scholarships.',
    eli5: 'Out of every ₹100 spent by the government in its annual budget, how many rupees go into schools and colleges.',
    keyStatOrFact: 'Education spending rose from 7.92% of total public expenditure in 1952 to around 15.7% in recent budgetary allocations.'
  },
  c11_eco_cbse_147: {
    id: 'c11_eco_cbse_147',
    title: 'Education Expenditure as Percentage of GDP',
    definition: 'The total public spending on education divided by the total national income (Gross Domestic Product). Kothari Commission recommended 6%.',
    eli5: 'How much of India\'s entire national economic pie is invested back into schooling every year.',
    keyStatOrFact: 'The Education Commission (1964-66) recommended 6% of GDP; India currently hovers around 3.1% to 4% of GDP.'
  },
  c11_eco_cbse_148: {
    id: 'c11_eco_cbse_148',
    title: 'Educational Attainment: Key Indicators',
    definition: 'Metrics measuring standard of education in a population: Adult Literacy Rate, Primary Completion Rate, Youth Literacy Rate, Gross Enrolment Ratio (GER).',
    eli5: 'Scorecard numbers that show how educated a country\'s children and adults really are.',
    keyStatOrFact: 'Literacy rates have climbed from 18.3% in 1951 to over 77.7% in recent surveys.'
  },
  c11_eco_cbse_149: {
    id: 'c11_eco_cbse_149',
    title: 'Adult Literacy Rate: Trends and Interpretation',
    definition: 'Percentage of population aged 15 years and above who can read and write with understanding in any language.',
    eli5: 'The proportion of grownups who know how to read and write basic sentences.',
    keyStatOrFact: 'Adult literacy reflects historic educational efforts over preceding decades.'
  },
  c11_eco_cbse_150: {
    id: 'c11_eco_cbse_150',
    title: 'Primary Completion Rate: Progress and Gender Analysis',
    definition: 'Percentage of students completing the last grade of primary education out of the relevant age group, highlighting gender parity.',
    eli5: 'How many kids who start 1st grade manage to finish 5th grade without dropping out.',
    keyStatOrFact: 'Gender gaps in primary completion have drastically narrowed due to Sarva Shiksha Abhiyan and Mid-Day Meal schemes.'
  },
  c11_eco_cbse_151: {
    id: 'c11_eco_cbse_151',
    title: 'Youth Literacy Rate: Measuring Educational Progress',
    definition: 'Percentage of population aged 15-24 who can read and write; serves as a forward-looking indicator of future labor force capabilities.',
    eli5: 'Literacy among teenagers and young adults showing how good modern schools are.',
    keyStatOrFact: 'Youth literacy in India exceeds 90%, significantly higher than the overall adult literacy rate.'
  },
  c11_eco_cbse_152: {
    id: 'c11_eco_cbse_152',
    title: 'Gender Equity in Education: Progress and Challenges',
    definition: 'Elimination of gender disparities in schooling access, enrolment, retention, and learning outcomes between boys and girls.',
    eli5: 'Giving girls equal chances to go to school and university as boys, breaking social biases.',
    keyStatOrFact: 'Female literacy (approx 70%) still lags male literacy (approx 84.7%), revealing persistent gender disparities.'
  },
  c11_eco_cbse_153: {
    id: 'c11_eco_cbse_153',
    title: 'Higher Education and the Challenge of Graduate Unemployment',
    definition: 'Paradox where individuals holding tertiary degrees face joblessness due to skill mismatch, outdated university curricula, and inadequate job creation.',
    eli5: 'When young people finish university degrees but cannot find suitable jobs because what they studied does not match modern industry needs.',
    keyStatOrFact: 'Graduate unemployment rate is higher than general unemployment in India, signalling vocational skill gaps.'
  },
  c11_eco_cbse_154: {
    id: 'c11_eco_cbse_154',
    title: 'India as a Knowledge Economy',
    definition: 'Economic model reliant on knowledge, software, IT services, biotechnology, research, and intellectual capital rather than physical natural resources.',
    eli5: 'An economy that makes money using software, scientific discoveries, and high-end services rather than just farming or mining.',
    keyStatOrFact: 'India\'s IT and software service exports transformed its image into a global knowledge services hub.'
  },
  c11_eco_cbse_155: {
    id: 'c11_eco_cbse_155',
    title: 'Right to Education Act 2009: Free and Compulsory Education',
    definition: 'Constitutional landmark (Article 21A) making free and compulsory education a fundamental right for all children aged 6 to 14 years.',
    eli5: 'A law stating every child aged 6-14 has a legal right to free schooling in their neighborhood.',
    keyStatOrFact: 'RTE mandates a 25% reservation for economically weaker sections (EWS) in private unaided schools.'
  },
  c11_eco_cbse_156: {
    id: 'c11_eco_cbse_156',
    title: 'Education Cess: Dedicated Funding for Elementary Education',
    definition: 'An additional tax-on-tax (3% to 4%) earmarked exclusively for elementary and secondary education funds like Prarambhik Shiksha Kosh.',
    eli5: 'A small extra charge added onto income tax and GST that goes directly into a special fund for building government schools.',
    keyStatOrFact: 'Education Cess ensures a non-lapsable source of revenue for primary schooling.'
  },
  c11_eco_cbse_157: {
    id: 'c11_eco_cbse_157',
    title: 'National Education Policy 2020: Vision for Human Capital Formation',
    definition: 'Comprehensive reform policy aiming for 6% GDP target, universal pre-primary education, 5+3+3+4 structural overhaul, vocational integration, and GER of 50% in higher education by 2035.',
    eli5: 'India\'s roadmap replacing the 10+2 system with 5+3+3+4, bringing practical skills, flexibility, and research to schools.',
    keyStatOrFact: 'NEP 2020 replaces rigid Stream choice (Science/Arts/Commerce) with multidisciplinary credit frameworks.'
  },
  c11_eco_cbse_158: {
    id: 'c11_eco_cbse_158',
    title: 'Education Pyramid and the Dropout Challenge',
    definition: 'Graphical representation showing steep narrowing of enrolment from primary to tertiary levels due to poverty, early labor, distance, and poor infrastructure.',
    eli5: 'A pyramid shape showing that millions start 1st grade, but only a small fraction reach university because many drop out along the way.',
    keyStatOrFact: 'Gross Enrolment Ratio drops from over 95% at primary level to around 27% at higher education level.'
  },
  c11_eco_cbse_159: {
    id: 'c11_eco_cbse_159',
    title: 'Future Prospects and Challenges for Human Capital Formation',
    definition: 'Strategic focus areas for 21st century: digital divide, AI readiness, quality vs quantity of schooling, regional disparities, and healthcare infrastructure.',
    eli5: 'The big hurdles India must cross next: bridging the internet divide in villages, improving teacher training, and creating modern green jobs.',
    keyStatOrFact: 'Transitioning from basic literacy to high-tech digital literacy is the ultimate challenge for India\'s demographic dividend.'
  }
};

const SCENARIO = {
  title: 'NITI Aayog National Human Capital Advisory Lab',
  intro: 'You have been appointed Chief Economic Advisor to the High-Level Human Capital Commission of NITI Aayog.',
  context: 'Your task is to analyze human capital formation channels, design fiscal policies (Education Cess & Budget allocations), solve the higher education dropout pyramid, and engineer strategies to transform India into a global Knowledge Economy.'
};

const DISCOVERY_QUESTION = {
  question: 'Why does investing ₹10,000 Crore in educating and immunizing citizens generate far higher long-term national growth than spending ₹10,000 Crore on importing physical factory machinery alone?',
  options: [
    'Physical machinery never breaks down, whereas humans work without rest',
    'Human capital generates positive external spillovers, drives innovation, and increases the productivity of physical capital itself',
    'Human capital is easily sold and exported across international borders without legal restriction',
    'Physical capital depreciates faster than human capital under all economic conditions'
  ],
  correctIndex: 1,
  hintAfter: 'Human capital is intangible and embodied in human minds. It not only boosts individual earnings but creates social spillovers (better health, lower crime, technical breakthroughs) that magnify physical capital efficiency!'
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Sources of Human Capital Matrix',
    instruction: 'Adjust allocations across Education, Health, On-the-Job Training, Migration support, and Labor Information to see their cumulative impact on total Human Capital Index (HCI).',
    interactionType: 'slider_matrix',
    nodeId: 'c11_eco_cbse_131'
  },
  {
    title: 'Lab 2: Physical Capital vs Human Capital Structural Matrix',
    instruction: 'Compare the 5 key dimensions (Tangibility, Ownership, Mobility, Depreciation mechanism, and External Benefits) between Physical Capital and Human Capital.',
    interactionType: 'capital_comparison',
    nodeId: 'c11_eco_cbse_137'
  },
  {
    title: 'Lab 3: Education Pyramid & Dropout Waterfall Analysis',
    instruction: 'Inspect the retention rates from Primary -> Upper Primary -> Secondary -> Higher Secondary -> Higher Education (GER). Calculate the dropout leakage at each tier.',
    interactionType: 'pyramid_inspector',
    nodeId: 'c11_eco_cbse_158'
  },
  {
    title: 'Lab 4: Budget Allocation & Education Cess Policy Simulator',
    instruction: 'Simulate allocating Union Budget funds as % of GDP (Targeting 6% Kothari Commission / NEP benchmark) and tweaking Education Cess rates.',
    interactionType: 'policy_budget_allocator',
    nodeId: 'c11_eco_cbse_147'
  },
  {
    title: 'Lab 5: Knowledge Economy & Skill Mismatch Engine',
    instruction: 'Balance Higher Education vocational focus under NEP 2020 vs traditional rote learning to minimize Graduate Unemployment and maximize Knowledge Economy Index.',
    interactionType: 'knowledge_economy_sim',
    nodeId: 'c11_eco_cbse_154'
  }
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'If the government increases public health expenditure from 1.2% of GDP to 3.0% of GDP focusing on preventive healthcare (immunization & sanitation), what will happen to labor productivity and economic growth?',
    options: [
      'Labor productivity drops because people spend more time visiting hospitals',
      'Labor productivity increases sharply due to reduced sick days, longer life expectancy, and higher physical stamina',
      'No effect on productivity, because health spending is purely consumption expenditure',
      'Economic growth halts due to excessive fiscal deficit'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1 & 4, increase Health Spending to observe how workdays saved and human productivity index skyrocket.',
    nodeId: 'c11_eco_cbse_133'
  },
  {
    question: 'What happens to the Education Pyramid dropout rate at the secondary level if the Right to Education (RTE) Act is strictly enforced and backed by Education Cess funds for infrastructure?',
    options: [
      'The dropout rate increases because children prefer working in factories',
      'The educational pyramid becomes steeper with fewer students reaching 10th grade',
      'Retention rates expand significantly, flattening the dropout waterfall and boosting higher secondary transition',
      'Literacy rate falls to zero due to standardized exams'
    ],
    correctIndex: 2,
    verifyInstruction: 'Use Lab 3 & 4 to see how RTE enforcement and Cess revenue widen the education pyramid pipeline.',
    nodeId: 'c11_eco_cbse_155'
  },
  {
    question: 'If a nation rapidly expands university enrolment without integrating vocational training or industry skill matching, what economic anomaly occurs?',
    options: [
      'Zero literacy rate',
      'High Graduate Unemployment alongside unfilled technical job vacancies',
      'Complete elimination of physical capital requirements',
      'Immediate double-digit growth in Knowledge Economy Index'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the vocational skill slider in Lab 5 to see how educated unemployment shoots up without skill alignment.',
    nodeId: 'c11_eco_cbse_153'
  }
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'When analyzing the external benefits of female literacy, what observable socio-economic spillovers occur beyond individual wage earnings?',
    observableOptions: [
      'Female literacy only affects individual office wages with no outside societal impact',
      'Higher female literacy leads to lower infant mortality, improved child nutrition, and reduced fertility rates',
      'Female literacy causes physical machinery to depreciate faster',
      'Female literacy decreases adult literacy rate calculations'
    ],
    correctIndex: 1,
    nodeId: 'c11_eco_cbse_141'
  },
  {
    question: 'How does the Human Development perspective differ from the Human Capital concept when evaluating an investment in healthcare for senior citizens or disabled persons?',
    observableOptions: [
      'Human Capital views senior citizens as economic assets; Human Development views them as financial burdens',
      'Human Capital prioritizes education/health as means to increase GDP output, while Human Development treats health and dignity as basic human rights regardless of productivity output',
      'Both perspectives evaluate investment solely based on factory output per hour',
      'Neither perspective values healthcare'
    ],
    correctIndex: 1,
    nodeId: 'c11_eco_cbse_140'
  },
  {
    question: 'What trends are observed when comparing India\'s Youth Literacy Rate (aged 15-24) against the Adult Literacy Rate (aged 15+)?',
    observableOptions: [
      'Youth literacy rate is significantly lower than adult literacy rate',
      'Youth literacy rate is noticeably higher (over 90%), demonstrating progress in recent educational expansion',
      'Both rates are identical at 45%',
      'Adult literacy rate moves randomly with no relation to youth literacy'
    ],
    correctIndex: 1,
    nodeId: 'c11_eco_cbse_151'
  }
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'NITI Aayog Policy Brief: Crafting India\'s Human Capital Master Plan 2030',
  description: 'As Senior Economic Consultant, execute a comprehensive state policy audit for a district with low Gross Enrolment Ratio (GER) and high graduate unemployment.',
  steps: [
    'Step 1: Calculate the state\'s current Education Spend as % of State GDP (Target: 6%) and determine the Education Cess shortfall.',
    'Step 2: Map the Education Pyramid from Grade 1 to University. Identify the largest drop-out transition (e.g., Grade 8 to Grade 9).',
    'Step 3: Allocate budget between preventive healthcare (immunization, mid-day meals) and vocational skill centers aligned with NEP 2020.',
    'Step 4: Draft policy recommendations for regulatory bodies (NCERT, UGC, AICTE) to modernize curriculum and eliminate graduate skill mismatch.'
  ]
};

const MISCONCEPTIONS: Misconception[] = [
  {
    title: 'Human Capital vs. Human Resources',
    misconception: 'Human Resources and Human Capital are identical concepts.',
    correction: 'Human Resources refers to the total population/labour force (raw capacity), whereas Human Capital is the accumulated stock of specific skills, expertise, and health embodied in that population that drives economic productivity.',
    nodeId: 'c11_eco_cbse_129'
  },
  {
    title: 'Physical Capital vs. Human Capital Depreciation',
    misconception: 'Human capital depreciates in the exact same physical way as factory machines.',
    correction: 'Physical capital depreciates through continuous physical wear and tear and obsolescence. Human capital depreciates through aging, illness, or lack of skill updating, but can actually APPRECIATE over time through continuous learning and experience.',
    nodeId: 'c11_eco_cbse_137'
  },
  {
    title: 'Human Capital vs. Human Development',
    misconception: 'Human Capital and Human Development are interchangeable terms in welfare economics.',
    correction: 'Human Capital considers human beings as instrumental MEANS to raise productivity and economic growth. Human Development considers human well-being, freedom, and capabilities as the ultimate END of all policy.',
    nodeId: 'c11_eco_cbse_140'
  },
  {
    title: 'Spending on Higher Education guarantees instant growth',
    misconception: 'Expanding university seats automatically accelerates economic growth regardless of curriculum relevance.',
    correction: 'Without industry alignment, expanding general higher education without vocational training leads to high Graduate Unemployment and educated brain drain rather than growth.',
    nodeId: 'c11_eco_cbse_153'
  },
  {
    title: 'Migration is purely an economic drain',
    misconception: 'Migration from rural areas to cities or abroad represents a net loss of human capital.',
    correction: 'Migration involves transport and relocation costs, but allows individuals to earn higher returns on their skills, sending back remittances and gaining advanced knowledge that enriches human capital.',
    nodeId: 'c11_eco_cbse_135'
  },
  {
    title: 'Government Education Spending is pure consumption',
    misconception: 'Public expenditure on schools and hospitals is an unproductive consumption expenditure.',
    correction: 'Government spending on education and health is high-yield CAPITAL INVESTMENT that creates long-term growth assets, yields positive social spillovers, and boosts tax revenues.',
    nodeId: 'c11_eco_cbse_142'
  }
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c11_eco_cbse_129',
    question: 'Which of the following best defines "Human Capital"?',
    options: [
      'The total cash and bank balance held by all workers in an economy',
      'The stock of skill, expertise, knowledge, and health embodied in the nation\'s workforce',
      'The total number of factory buildings and heavy machinery owned by the state',
      'The total population living within geographic boundaries'
    ],
    correctIndex: 1,
    explanation: 'Human capital is the intangible stock of expertise, skills, and health possessed by individuals.'
  },
  {
    id: 'diag_2',
    nodeId: 'c11_eco_cbse_131',
    question: 'Which pair of sources is universally recognized as the TWO most vital foundations for human capital formation?',
    options: [
      'Migration and Advertising',
      'Education and Health',
      'Information and Luxury Goods',
      'Stock Market Trading and Physical Real Estate'
    ],
    correctIndex: 1,
    explanation: 'Education and health are the twin pillars of human capital investment.'
  },
  {
    id: 'diag_3',
    nodeId: 'c11_eco_cbse_137',
    question: 'Which statement highlights a fundamental difference between physical capital and human capital?',
    options: [
      'Physical capital generates external benefits, whereas human capital does not',
      'Human capital is completely separable from its owner, whereas physical capital is not',
      'Human capital is inseparable from its owner and yields positive social spillovers',
      'Physical capital does not depreciate over time'
    ],
    correctIndex: 2,
    explanation: 'Human capital resides inside the person (inseparable) and creates positive external benefits for society.'
  },
  {
    id: 'diag_4',
    nodeId: 'c11_eco_cbse_147',
    question: 'What target percentage of GDP for education spending was recommended by the landmark Kothari Education Commission (1964-66) and reaffirmed in NEP 2020?',
    options: ['2% of GDP', '4% of GDP', '6% of GDP', '10% of GDP'],
    correctIndex: 2,
    explanation: 'The Kothari Commission recommended allocating at least 6% of GDP to public education spending.'
  },
  {
    id: 'diag_5',
    nodeId: 'c11_eco_cbse_155',
    question: 'Under Article 21A of the Indian Constitution, the Right to Education (RTE) Act 2009 guarantees free and compulsory education for children of which age group?',
    options: ['3 to 6 years', '6 to 14 years', '14 to 18 years', '5 to 15 years'],
    correctIndex: 1,
    explanation: 'RTE Act 2009 covers children in the age bracket of 6 to 14 years.'
  },
  {
    id: 'diag_6',
    nodeId: 'c11_eco_cbse_144',
    question: 'Which apex organization in India is responsible for designing national school curriculum frameworks and producing standard textbooks?',
    options: ['UGC', 'NCERT', 'AICTE', 'ICMR'],
    correctIndex: 1,
    explanation: 'NCERT (National Council of Educational Research and Training) oversees school curriculum frameworks.'
  },
  {
    id: 'diag_7',
    nodeId: 'c11_eco_cbse_156',
    question: 'What is the primary objective of levying an "Education Cess" on tax revenues in India?',
    options: ['To pay off international debts', 'To provide dedicated, earmarked funding for elementary and secondary education', 'To subsidize commercial airlines', 'To fund physical highway construction'],
    correctIndex: 1,
    explanation: 'An Education Cess is an earmarked surcharge dedicated strictly to financing elementary/secondary education.'
  },
  {
    id: 'diag_8',
    nodeId: 'c11_eco_cbse_157',
    question: 'The National Education Policy (NEP) 2020 replaces the traditional 10+2 school structure with which new pedagogical framework?',
    options: ['5+3+3+4', '3+4+4+5', '5+4+3+2', '4+4+4+4'],
    correctIndex: 0,
    explanation: 'NEP 2020 introduces the 5+3+3+4 design covering Foundational, Preparatory, Middle, and Secondary stages.'
  }
];

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (8 Challenges)
  {
    id: 'chal_f1',
    nodeId: 'c11_eco_cbse_128',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What constitutes the "Human Resources" of a nation?',
    options: [
      'The total money stored in public banks',
      'The aggregate of physical and mental abilities, skills, and knowledge embodied in its population',
      'The total area of arable agricultural land',
      'The machinery installed in heavy manufacturing units'
    ],
    correctIndex: 1,
    explanation: 'Human resources represent the working population\'s combined capabilities and brainpower.',
    hints: ['Think of the human potential of a country.', 'It includes physical labor as well as cognitive skills.', 'It refers to people and their abilities.']
  },
  {
    id: 'chal_f2',
    nodeId: 'c11_eco_cbse_131',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT listed among the 5 major sources of human capital formation?',
    options: [
      'Expenditure on Education',
      'Expenditure on Health',
      'Purchase of Foreign Real Estate Speculation',
      'On-the-Job Training'
    ],
    correctIndex: 2,
    explanation: 'Foreign real estate speculation is physical financial investment, not human capital investment.',
    hints: ['Focus on inputs that directly upgrade human skills or health.', 'Five sources: Education, Health, Training, Migration, Information.', 'Real estate is physical asset accumulation.']
  },
  {
    id: 'chal_f3',
    nodeId: 'c11_eco_cbse_133',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is preventive healthcare (e.g. vaccination drives) considered a highly efficient human capital investment?',
    options: [
      'It costs more than hospital surgeries',
      'It prevents illness before it occurs, saving medical expenditure and avoiding lost working days',
      'It increases physical capital depreciation',
      'It eliminates the need for schools'
    ],
    correctIndex: 1,
    explanation: 'Preventive healthcare is far more cost-effective than curative treatment in maintaining continuous labor productivity.',
    hints: ['"Prevention is better than cure."', 'Consider the cost of treating severe illness vs a vaccine.', 'Healthy workers avoid missing workdays.']
  },
  {
    id: 'chal_f4',
    nodeId: 'c11_eco_cbse_134',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why do private firms invest money in providing On-the-Job Training (OJT) to their employees?',
    options: [
      'To reduce employee wages to zero',
      'Because trained workers produce higher output per hour, increasing firm productivity',
      'To fulfill mandatory tax penalties',
      'Because training makes workers forget their skills'
    ],
    correctIndex: 1,
    explanation: 'OJT enhances worker efficiency, allowing firms to produce more output and recoup training expenses.',
    hints: ['Firms seek higher productivity.', 'Training increases skills on factory equipment.', 'Higher output per worker increases total revenues.']
  },
  {
    id: 'chal_f5',
    nodeId: 'c11_eco_cbse_136',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Expenditure on acquiring information (e.g. labor market portals, course ratings) creates human capital because:',
    options: [
      'It allows individuals to make rational decisions about career choices and high-return skill training',
      'It directly purchases new machinery',
      'It lowers government tax revenue',
      'It stops people from migrating'
    ],
    correctIndex: 0,
    explanation: 'Information eliminates market asymmetry and enables individuals to invest in the right skills that offer optimal market returns.',
    hints: ['Knowing which jobs pay well guides education choices.', 'Information prevents wasting time on obsolete skills.', 'It matches skill supply with industry demand.']
  },
  {
    id: 'chal_f6',
    nodeId: 'c11_eco_cbse_144',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which apex regulatory body in India regulates technical education, engineering, and management institutes?',
    options: ['NCERT', 'AICTE', 'ICMR', 'UGC'],
    correctIndex: 1,
    explanation: 'AICTE (All India Council for Technical Education) regulates technical and management education.',
    hints: ['Focus on technical institutes.', 'Acronym stands for All India Council for Technical Education.', 'AICTE approves engineering colleges.']
  },
  {
    id: 'chal_f7',
    nodeId: 'c11_eco_cbse_145',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The apex body responsible for directing medical research and health guidelines in India is:',
    options: ['UGC', 'AICTE', 'ICMR', 'NCERT'],
    correctIndex: 2,
    explanation: 'ICMR (Indian Council of Medical Research) leads biomedical research and policy formulation in health.',
    hints: ['Focus on medical research.', 'Acronym stands for Indian Council of Medical Research.', 'ICMR directed COVID-19 health protocols.']
  },
  {
    id: 'chal_f8',
    nodeId: 'c11_eco_cbse_149',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is the Adult Literacy Rate defined in Indian economic statistics?',
    options: [
      'Percentage of population aged 5 and above who passed 10th grade',
      'Percentage of population aged 15 and above who can read and write with understanding in any language',
      'Percentage of college graduates in the country',
      'Percentage of working adults holding a corporate job'
    ],
    correctIndex: 1,
    explanation: 'Adult literacy measures the basic reading and writing proficiency of citizens aged 15 and older.',
    hints: ['Target age group is 15 years and above.', 'It measures basic reading and writing capability.', 'Does not require a formal college degree.']
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'chal_s1',
    nodeId: 'c11_eco_cbse_137',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A software engineer moves from Bengaluru to San Francisco. Why is human capital less internationally mobile than physical financial capital?',
    options: [
      'Human capital moves instantly over optical fiber networks',
      'Human capital mobility is constrained by immigration laws, visa quotas, culture, and nationality factors',
      'Physical capital can never be transferred across borders',
      'Software engineers do not possess human capital'
    ],
    correctIndex: 1,
    explanation: 'While physical capital transfers quickly across financial networks, human mobility faces legal, cultural, and border restrictions.',
    hints: ['Consider visa restrictions and passport controls.', 'People cannot be wired like bank balances.', 'Immigration laws restrict human mobility.']
  },
  {
    id: 'chal_s2',
    nodeId: 'c11_eco_cbse_140',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast Human Capital with Human Development: How does each view spending on elderly care?',
    options: [
      'Human Capital promotes elderly care; Human Development ignores it',
      'Human Capital views elderly care as a high economic output generator; Human Development opposes it',
      'Human Capital may de-prioritize elderly care due to low remaining labor productivity, whereas Human Development considers health and dignity for elderly a basic human right',
      'Both views evaluate elderly care strictly by factory hours produced'
    ],
    correctIndex: 2,
    explanation: 'Human capital is instrumental (focusing on productivity returns), while Human development is intrinsic (focusing on well-being and human dignity).',
    hints: ['Human Capital looks at future earnings.', 'Human Development treats life quality as an end in itself.', 'Elderly citizens may have low market labor earnings but high human value.']
  },
  {
    id: 'chal_s3',
    nodeId: 'c11_eco_cbse_141',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When Dr. Anita completes her medical degree, she treats patients and also educates her village on sanitation, curbing disease spread. This illustrates:',
    options: [
      'Negative externality of human capital',
      'Positive external benefit (social spillover) of human capital investment',
      'Physical capital wear and tear',
      'Skill obsolescence'
    ],
    correctIndex: 1,
    explanation: 'Her education benefits third parties who did not pay for her degree—a classic positive external benefit of human capital.',
    hints: ['The benefit extends to people who didn\'t pay for her schooling.', 'It creates positive spillovers in the community.', 'External benefits justify government subsidies.']
  },
  {
    id: 'chal_s4',
    nodeId: 'c11_eco_cbse_146',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If total Union Government spending is ₹40,00,000 Crore and Education Expenditure is ₹1,20,000 Crore, calculate Education Expenditure as a percentage of Total Government Spending.',
    correctAnswer: 3.0,
    explanation: 'Percentage = (1,20,000 / 40,00,000) * 100 = 3.0%.',
    hints: ['Formula: (Education Budget / Total Budget) * 100', '1,20,000 divided by 40,00,000 is 0.03', 'Multiply by 100 to get 3.0%']
  },
  {
    id: 'chal_s5',
    nodeId: 'c11_eco_cbse_147',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'India currently spends roughly 3.1% to 4.0% of GDP on education. How does this compare to the benchmark recommended by the Kothari Commission (1964-66)?',
    options: [
      'India exceeds the recommendation by 5%',
      'India meets the exact target of 10% of GDP',
      'India falls significantly short of the recommended 6% of GDP target',
      'The Kothari Commission recommended spending 0% on education'
    ],
    correctIndex: 2,
    explanation: 'The Kothari Commission urged 6% of GDP allocation, a target reiterated by NEP 2020 that India has yet to consistently reach.',
    hints: ['Target was set at 6% of GDP.', 'Current expenditure lingers around 3-4%.', 'There is a persistent spending gap.']
  },
  {
    id: 'chal_s6',
    nodeId: 'c11_eco_cbse_152',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Despite equal constitutional rights, female literacy in India (approx 70%) lags male literacy (approx 84.7%). What primary factors account for this gender gap?',
    options: [
      'Girls naturally possess lower cognitive learning capabilities',
      'Socio-cultural biases, household chore burden, safety concerns, and preference for male child education',
      'Government ban on female schooling in cities',
      'Higher female enrolment in foreign universities'
    ],
    correctIndex: 1,
    explanation: 'Gender disparity stems from structural social norms, domestic duties, early marriage risks, and unequal family resource allocation.',
    hints: ['Focus on social and economic barriers.', 'Consider traditional patriarchal preferences.', 'Safety and distant infrastructure impact girls disproportionately.']
  },
  {
    id: 'chal_s7',
    nodeId: 'c11_eco_cbse_156',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An individual pays ₹10,000 in personal income tax. The government levies a 3% Education Cess. What is the total tax paid including the Cess?',
    options: ['₹10,000', '₹10,300', '₹13,000', '₹10,030'],
    correctIndex: 1,
    explanation: 'Cess amount = 3% of ₹10,000 = ₹300. Total payment = ₹10,000 + ₹300 = ₹10,300.',
    hints: ['Education Cess is a tax levied on top of tax.', 'Calculate 3% of 10,000 = 300.', 'Add 300 to original tax of 10,000.']
  },
  {
    id: 'chal_s8',
    nodeId: 'c11_eco_cbse_158',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the education structure in India described as an "Education Pyramid"?',
    options: [
      'Because school buildings are built in triangular shapes',
      'Because enrolment is broad at primary level (wide base) but shrinks drastically at secondary and tertiary levels (steep apex) due to dropouts',
      'Because higher education enrolment is 100% while primary enrolment is 10%',
      'Because teachers outnumber students at higher levels'
    ],
    correctIndex: 1,
    explanation: 'Massive early enrolment forms a wide base, but financial distress and dropouts thin out attendance at high school and university levels.',
    hints: ['Wide at bottom, narrow at top.', 'Many start Grade 1; few finish University.', 'High dropouts create the narrowing apex.']
  },

  // ADVANCED TIER (8 Challenges)
  {
    id: 'chal_a1',
    nodeId: 'c11_eco_cbse_138',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the macroeconomic feed-forward mechanism: How does human capital formation directly lift Total Factor Productivity (TFP) and GDP growth rate?',
    options: [
      'By replacing physical capital entirely with manual labor',
      'By enabling technological adaptation, process innovation, efficient resource combination, and higher per-worker output',
      'By inflating national currency supply without changing physical production',
      'By forcing all citizens into agricultural labor'
    ],
    correctIndex: 1,
    explanation: 'Educated and healthy workers adopt advanced technology faster, innovate production methods, and maximize TFP efficiency.',
    hints: ['TFP measures efficiency of inputs.', 'Educated workers invent and operate complex machinery.', 'Innovation accelerates economic growth.']
  },
  {
    id: 'chal_a2',
    nodeId: 'c11_eco_cbse_142',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why can private free-market forces alone NOT achieve optimal human capital formation in a developing country like India?',
    options: [
      'Because private healthcare and education providers charge zero fees',
      'Due to long gestation periods, high initial capital requirements, monopoly pricing risks, and inability of low-income families to pay market tuition',
      'Because private companies are forbidden from opening schools',
      'Because education generates negative economic returns for investors'
    ],
    correctIndex: 1,
    explanation: 'Market failure occurs because poor households cannot afford high private fees, and private investors ignore positive social spillovers.',
    hints: ['Private markets seek immediate profit.', 'Poor families face liquidity constraints.', 'Education has high public external benefits.']
  },
  {
    id: 'chal_a3',
    nodeId: 'c11_eco_cbse_153',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyzing the phenomenon of "Graduate Unemployment" in India reveals a fundamental policy failure in:',
    options: [
      'Enrolling too many students in primary schools',
      'Mismatch between traditional academic university curricula and practical skills demanded by modern tech/manufacturing sectors',
      'Excessive vocational training in secondary schools',
      'Over-funding of technical research laboratories'
    ],
    correctIndex: 1,
    explanation: 'Degrees are awarded without market-relevant skills, leading to educated joblessness coexisting with unfilled technical vacancies.',
    hints: ['Degree holder lacks practical job skills.', 'Curriculum is theoretical/rote-based.', 'Skill supply does not match market demand.']
  },
  {
    id: 'chal_a4',
    nodeId: 'c11_eco_cbse_154',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'To transition from a resource-based economy to a high-value "Knowledge Economy", a nation must prioritize which combination of investments?',
    options: [
      'Raw mineral extraction, low-skilled assembly lines, and import tariffs',
      'R&D infrastructure, high-speed digital connectivity, IP protection, and advanced STEM/vocational skill training',
      'Agricultural land expansion and printing physical currency',
      'Closing down universities to focus strictly on physical factories'
    ],
    correctIndex: 1,
    explanation: 'Knowledge economies thrive on innovation, intellectual capital, high-tech research, digital infrastructure, and skilled manpower.',
    hints: ['Knowledge capital drives value.', 'Think IT services, biotech, AI, and R&D.', 'Requires strong research and digital ecosystem.']
  },
  {
    id: 'chal_a5',
    nodeId: 'c11_eco_cbse_155',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Critique the 25% quota reservation under the RTE Act 2009 for Economically Weaker Sections (EWS) in private non-minority schools:',
    options: [
      'It forces private schools to close down completely',
      'It promotes social integration and provides quality education access to underprivileged kids, though state fee reimbursement delays remain a challenge',
      'It reduces overall literacy by diluting public school attendance',
      'It applies exclusively to university post-graduate programs'
    ],
    correctIndex: 1,
    explanation: 'The 25% EWS quota bridges socio-economic divides in early schooling, though implementation and timely state reimbursement are critical.',
    hints: ['Section 12(1)(c) of RTE Act.', 'Aims to bridge social class divides in classrooms.', 'Financed via state reimbursements to private schools.']
  },
  {
    id: 'chal_a6',
    nodeId: 'c11_eco_cbse_157',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How does NEP 2020 attempt to solve the rigid stream compartmentalization (Science vs Arts vs Commerce) to enhance human capital quality?',
    options: [
      'By banning all arts subjects in high schools',
      'By introducing a flexible credit-based multidisciplinary structure allowing students to combine subjects like Physics with Music or Economics',
      'By forcing every student to take 10 science subjects',
      'By eliminating final board examinations entirely'
    ],
    correctIndex: 1,
    explanation: 'NEP 2020 breaks rigid stream silos, fostering holistic, cross-disciplinary skills crucial for modern complex problem-solving.',
    hints: ['Multidisciplinary learning.', 'Students pick combinations across disciplines.', 'Encourages creativity and lateral thinking.']
  },
  {
    id: 'chal_a7',
    nodeId: 'c11_eco_cbse_135',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does high-skilled labor emigration (Brain Drain) impact the home country, and what counter-effect can mitigate this loss?',
    options: [
      'It has zero economic impact of any kind',
      'It drains domestic skilled talent initially, but can return high economic value through foreign worker remittances, global knowledge transfer, and diaspora investment',
      'It instantly doubles domestic agricultural output',
      'It forces the government to ban all overseas travel'
    ],
    correctIndex: 1,
    explanation: 'Brain drain causes immediate loss of public investment, but diaspora remittances and technology transfer ("brain gain") offset losses.',
    hints: ['Initial loss of doctor/engineer talent.', 'Remittances flow back into domestic bank accounts.', 'Diaspora networks build trade and knowledge bridges.']
  },
  {
    id: 'chal_a8',
    nodeId: 'c11_eco_cbse_159',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the era of AI and automation, what is the single biggest threat to India\'s "Demographic Dividend" regarding human capital?',
    options: [
      'Too many physical factories being built',
      'Failure to upgrade basic literacy into advanced digital literacy and adaptive cognitive skills, leading to technological obsolescence of millions of young workers',
      'Excessive spending on public health programs',
      'Decreasing population growth rate'
    ],
    correctIndex: 1,
    explanation: 'Demographic dividend becomes a demographic burden if young workers lack 21st-century digital skills and adaptability.',
    hints: ['Demographic dividend requires quality jobs.', 'Automation makes routine skills redundant.', 'Digital divide threatens youth employability.']
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Human vs Physical Capital Comparison Diagram
const HumanVsPhysicalCapitalDiagram: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <h4 className="text-center font-bold text-amber-400 mb-3 text-sm md:text-base">
        STRUCTURAL COMPARISON: PHYSICAL CAPITAL vs HUMAN CAPITAL
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Physical Capital Box */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2 text-gold-400 font-bold border-b border-slate-700 pb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>PHYSICAL CAPITAL (Machinery, Factories)</span>
          </div>
          <ul className="space-y-1.5 text-slate-300">
            <li><span className="text-gold-300 font-semibold">• Nature:</span> Tangible (visible, physical presence)</li>
            <li><span className="text-gold-300 font-semibold">• Separability:</span> Separable from owner (can be sold separately)</li>
            <li><span className="text-gold-300 font-semibold">• Mobility:</span> Highly mobile across national borders</li>
            <li><span className="text-gold-300 font-semibold">• Depreciation:</span> Continuous wear & tear, constant technology replacement</li>
            <li><span className="text-gold-300 font-semibold">• Benefits:</span> Creates direct PRIVATE market benefits to owner</li>
          </ul>
        </div>

        {/* Human Capital Box */}
        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
          <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold border-b border-slate-700 pb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>HUMAN CAPITAL (Skills, Health, Knowledge)</span>
          </div>
          <ul className="space-y-1.5 text-slate-300">
            <li><span className="text-emerald-300 font-semibold">• Nature:</span> Intangible (embodied inside mind & body)</li>
            <li><span className="text-emerald-300 font-semibold">• Separability:</span> INSEPARABLE from owner (cannot be detached)</li>
            <li><span className="text-emerald-300 font-semibold">• Mobility:</span> Restricted by nationality, visas, cultural barriers</li>
            <li><span className="text-emerald-300 font-semibold">• Depreciation:</span> Depreciates with age/illness; APPRECIATES with experience</li>
            <li><span className="text-emerald-300 font-semibold">• Benefits:</span> Creates Private Benefits AND massive EXTERNAL Social Spillovers</li>
          </ul>
        </div>
      </div>

      <div className="mt-3 p-2 bg-slate-950 rounded border border-amber-500/30 text-center text-amber-300 text-xs">
        💡 Key Takeaway: Physical capital requires Human Capital to function. Without skilled minds, high-tech factories remain idle!
      </div>
    </div>
  );
};

// Diagram 2: Education Pyramid & Dropout Waterfall Diagram
const EducationPyramidDiagram: React.FC<{ retentionRate: number }> = ({ retentionRate }) => {
  // retentionRate scaling factor
  const p1 = 100;
  const p2 = Math.min(100, Math.round(85 * (retentionRate / 100)));
  const p3 = Math.min(100, Math.round(65 * (retentionRate / 100)));
  const p4 = Math.min(100, Math.round(40 * (retentionRate / 100)));
  const p5 = Math.min(100, Math.round(27 * (retentionRate / 100)));

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-bold text-amber-400 text-sm md:text-base">
          THE INDIAN EDUCATION PYRAMID & RETENTION WATERFALL
        </h4>
        <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
          Policy Support Index: <strong className="text-gold-400">{retentionRate}%</strong>
        </span>
      </div>

      <div className="space-y-2 my-4">
        {/* Tier 1: Primary */}
        <div className="flex items-center text-xs">
          <span className="w-32 font-medium text-slate-300 text-right pr-2">Primary (Grades 1-5):</span>
          <div className="flex-1 bg-slate-800 h-6 rounded overflow-hidden relative border border-slate-700">
            <div
              className="bg-emerald-500 h-full transition-all duration-500 flex items-center justify-end pr-2 text-slate-950 font-bold"
              style={{ width: `${p1}%` }}
            >
              {p1}% GER
            </div>
          </div>
        </div>

        {/* Tier 2: Upper Primary */}
        <div className="flex items-center text-xs">
          <span className="w-32 font-medium text-slate-300 text-right pr-2">Upper Primary (6-8):</span>
          <div className="flex-1 bg-slate-800 h-6 rounded overflow-hidden relative border border-slate-700">
            <div
              className="bg-teal-500 h-full transition-all duration-500 flex items-center justify-end pr-2 text-slate-950 font-bold"
              style={{ width: `${p2}%` }}
            >
              {p2}%
            </div>
          </div>
          <span className="w-16 text-rose-400 text-[10px] pl-1">-{100 - p2}% leak</span>
        </div>

        {/* Tier 3: Secondary */}
        <div className="flex items-center text-xs">
          <span className="w-32 font-medium text-slate-300 text-right pr-2">Secondary (9-10):</span>
          <div className="flex-1 bg-slate-800 h-6 rounded overflow-hidden relative border border-slate-700">
            <div
              className="bg-gold-500 h-full transition-all duration-500 flex items-center justify-end pr-2 text-slate-950 font-bold"
              style={{ width: `${p3}%` }}
            >
              {p3}%
            </div>
          </div>
          <span className="w-16 text-rose-400 text-[10px] pl-1">-{p2 - p3}% leak</span>
        </div>

        {/* Tier 4: Higher Secondary */}
        <div className="flex items-center text-xs">
          <span className="w-32 font-medium text-slate-300 text-right pr-2">Sr. Secondary (11-12):</span>
          <div className="flex-1 bg-slate-800 h-6 rounded overflow-hidden relative border border-slate-700">
            <div
              className="bg-gold-500 h-full transition-all duration-500 flex items-center justify-end pr-2 text-slate-950 font-bold"
              style={{ width: `${p4}%` }}
            >
              {p4}%
            </div>
          </div>
          <span className="w-16 text-rose-400 text-[10px] pl-1">-{p3 - p4}% leak</span>
        </div>

        {/* Tier 5: Tertiary Higher Ed */}
        <div className="flex items-center text-xs">
          <span className="w-32 font-medium text-slate-300 text-right pr-2">Tertiary Higher Ed:</span>
          <div className="flex-1 bg-slate-800 h-6 rounded overflow-hidden relative border border-slate-700">
            <div
              className="bg-gold-500 h-full transition-all duration-500 flex items-center justify-end pr-2 text-white font-bold"
              style={{ width: `${p5}%` }}
            >
              {p5}% GER
            </div>
          </div>
          <span className="w-16 text-rose-400 text-[10px] pl-1">-{p4 - p5}% leak</span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 bg-slate-950 p-2 rounded border border-slate-800 flex justify-between items-center">
        <span>⚠️ Major Dropout Causes: Poverty, distance to secondary schools, early child labor, lack of toilets for girls.</span>
        <span className="text-gold-400 font-semibold">NEP 2020 Target GER: 50% by 2035</span>
      </div>
    </div>
  );
};

// Diagram 3: Macroeconomic Growth Cycle & Knowledge Economy Flow
const MacroGrowthCycleDiagram: React.FC<{ eduGdp: number; healthGdp: number }> = ({ eduGdp, healthGdp }) => {
  const hciScore = Math.min(100, Math.round((eduGdp * 12) + (healthGdp * 14)));
  const gdpMultiplier = (1 + (hciScore / 200)).toFixed(2);

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white shadow-xl">
      <h4 className="text-center font-bold text-amber-400 mb-2 text-sm md:text-base">
        HUMAN CAPITAL MACROECONOMIC GROWTH CYCLE & FEEDBACK LOOP
      </h4>

      <div className="relative border border-slate-800 rounded-lg p-3 bg-slate-950 flex flex-col items-center gap-3">
        {/* Cycle Nodes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full text-center text-xs">
          <div className="bg-slate-800 p-2 rounded border border-emerald-500/40">
            <span className="text-emerald-400 font-bold block mb-1">1. FISCAL INPUT</span>
            <p className="text-slate-300 text-[11px]">Edu ({eduGdp}% GDP) + Health ({healthGdp}% GDP)</p>
          </div>
          <div className="bg-slate-800 p-2 rounded border border-gold-500/40">
            <span className="text-gold-400 font-bold block mb-1">2. CAPITAL FORMATION</span>
            <p className="text-slate-300 text-[11px]">HCI Score: <strong className="text-amber-300">{hciScore}/100</strong></p>
          </div>
          <div className="bg-slate-800 p-2 rounded border border-gold-500/40">
            <span className="text-gold-400 font-bold block mb-1">3. TFP & INNOVATION</span>
            <p className="text-slate-300 text-[11px]">Labor Productivity Multiplier: <strong className="text-gold-300">{gdpMultiplier}x</strong></p>
          </div>
          <div className="bg-slate-800 p-2 rounded border border-purple-500/40">
            <span className="text-purple-400 font-bold block mb-1">4. MACRO REVENUE</span>
            <p className="text-slate-300 text-[11px]">Higher National Income & Tax Revenues for Reinvestment</p>
          </div>
        </div>

        {/* Visual Flow Arrow Banner */}
        <div className="w-full bg-gradient-to-r from-emerald-600 via-gold-600 to-gold-600 h-1.5 rounded-full" />

        <div className="text-[11px] text-slate-300 text-center">
          🔁 <strong>Virtuous Cycle:</strong> High Human Capital ➔ Technological Breakthroughs ➔ High Per Capita Income ➔ Greater Public Tax Revenue ➔ Re-investment in Education/Health.
        </div>
      </div>
    </div>
  );
};

// ==========================================
// INTERACTIVE LAB SIMULATORS
// ==========================================

const InteractiveMacroLabWidget: React.FC<{
  labStep: number;
  simState: MacroSimState;
  setSimState: React.Dispatch<React.SetStateAction<MacroSimState>>;
  onInteract: () => void;
}> = ({ labStep, simState, setSimState, onInteract }) => {
  // Calculated Macro Outputs
  const totalHci = useMemo(() => {
    const base = (simState.educationGdpPct * 11) + (simState.healthGdpPct * 12) + (simState.ojtIncentive * 0.2) + (simState.rteStrictness * 0.15) + (simState.nepImplementation * 0.25);
    return Math.min(100, Math.round(base));
  }, [simState]);

  const gdpGrowthEstimate = useMemo(() => {
    return (4.2 + (totalHci * 0.045)).toFixed(2);
  }, [totalHci]);

  const graduateUnemploymentRate = useMemo(() => {
    const unemp = 18.5 - (simState.nepImplementation * 0.12) - (simState.ojtIncentive * 0.08);
    return Math.max(3.2, unemp).toFixed(1);
  }, [simState]);

  const adultLiteracyEstimate = useMemo(() => {
    const lit = 77.7 + (simState.rteStrictness * 0.15) + (simState.educationGdpPct * 1.8);
    return Math.min(99.5, lit).toFixed(1);
  }, [simState]);

  const handleChange = (key: keyof MacroSimState, val: number) => {
    setSimState(prev => ({ ...prev, [key]: val }));
    onInteract();
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 md:p-6 text-white space-y-6">
      {/* Dynamic Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">Live Interactive Macro Simulator</span>
          <h3 className="text-lg md:text-xl font-bold text-gold-300">
            {labStep === 0 && 'Lab 1: Sources of Human Capital Matrix'}
            {labStep === 1 && 'Lab 2: Structural Capital Comparative Analysis'}
            {labStep === 2 && 'Lab 3: Education Pyramid & Retention Simulator'}
            {labStep === 3 && 'Lab 4: Public Finance & Education Cess Allocator'}
            {labStep === 4 && 'Lab 5: Knowledge Economy & Skill Alignment Engine'}
          </h3>
        </div>
        <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-3">
          <div>HCI Score: <span className="text-amber-400 font-bold text-sm">{totalHci}/100</span></div>
          <div className="w-px h-4 bg-slate-700" />
          <div>Proj. GDP Growth: <span className="text-emerald-400 font-bold text-sm">{gdpGrowthEstimate}%</span></div>
        </div>
      </div>

      {/* Lab Specific Controls */}
      {labStep === 0 && (
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Adjust investments across the 5 primary sources of human capital formation to maximize national productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <label className="text-gold-300 font-semibold">1. Education Expenditure (% GDP)</label>
                <span className="font-bold text-amber-300">{simState.educationGdpPct}%</span>
              </div>
              <input
                type="range" min="1.5" max="6.0" step="0.1"
                value={simState.educationGdpPct}
                onChange={e => handleChange('educationGdpPct', parseFloat(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Target: 6.0% (Kothari Commission / NEP 2020)</p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <label className="text-emerald-300 font-semibold">2. Health Expenditure (% GDP)</label>
                <span className="font-bold text-amber-300">{simState.healthGdpPct}%</span>
              </div>
              <input
                type="range" min="1.0" max="4.5" step="0.1"
                value={simState.healthGdpPct}
                onChange={e => handleChange('healthGdpPct', parseFloat(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Target: 2.5% to 3.0% (National Health Policy)</p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <label className="text-gold-300 font-semibold">3. On-the-Job Training (OJT) Incentives</label>
                <span className="font-bold text-amber-300">{simState.ojtIncentive}%</span>
              </div>
              <input
                type="range" min="0" max="100" step="5"
                value={simState.ojtIncentive}
                onChange={e => handleChange('ojtIncentive', parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Tax rebates for firm-provided practical apprenticeships</p>
            </div>

            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <label className="text-purple-300 font-semibold">4. Labor Mobility & Migration Support</label>
                <span className="font-bold text-amber-300">{simState.migrationMobility}%</span>
              </div>
              <input
                type="range" min="0" max="100" step="5"
                value={simState.migrationMobility}
                onChange={e => handleChange('migrationMobility', parseInt(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Housing hostels & transport subsidies for migrant labor</p>
            </div>
          </div>
        </div>
      )}

      {labStep === 1 && (
        <div className="space-y-4">
          <HumanVsPhysicalCapitalDiagram />
          <div className="p-3 bg-slate-800 rounded-lg text-xs space-y-2 border border-slate-700">
            <h5 className="font-bold text-gold-300">Macroeconomic Policy Implications:</h5>
            <p className="text-slate-300">
              Governments can import physical machinery from abroad in a matter of weeks. However, building human capital requires decades of sustained public investment in schools, hospitals, and research institutions.
            </p>
          </div>
        </div>
      )}

      {labStep === 2 && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs">
            <div className="flex-1 space-y-2">
              <label className="font-semibold text-gold-300 block">RTE Act 2009 Enforcement Strictness:</label>
              <input
                type="range" min="10" max="100" step="5"
                value={simState.rteStrictness}
                onChange={e => handleChange('rteStrictness', parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
            </div>
            <div className="bg-slate-900 px-4 py-2 rounded border border-slate-700 text-center">
              <span className="text-slate-400 block text-[10px]">Projected Adult Literacy</span>
              <span className="text-emerald-400 font-bold text-base">{adultLiteracyEstimate}%</span>
            </div>
          </div>
          <EducationPyramidDiagram retentionRate={Math.round(simState.rteStrictness * 0.8 + 20)} />
        </div>
      )}

      {labStep === 3 && (
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Simulate dedicated fiscal instruments: Tweak the <strong>Education Cess</strong> levied on direct & indirect taxes to create dedicated funding for elementary education (Prarambhik Shiksha Kosh).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <label className="text-amber-300 font-semibold">Education Cess Rate (%)</label>
                <span className="font-bold text-gold-300">{simState.cessRate}%</span>
              </div>
              <input
                type="range" min="0" max="5.0" step="0.5"
                value={simState.cessRate}
                onChange={e => handleChange('cessRate', parseFloat(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Current national standard is 3% to 4% (Health & Education Cess)</p>
            </div>

            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col justify-center space-y-2 text-center">
              <span className="text-slate-400 text-[11px]">Estimated Dedicated Education Fund Pool</span>
              <span className="text-emerald-400 font-bold text-lg">
                ₹{(simState.cessRate * 18500).toLocaleString()} Crore / Year
              </span>
              <span className="text-[10px] text-slate-400">Earmarked strictly for school infrastructure & mid-day meals</span>
            </div>
          </div>
          <MacroGrowthCycleDiagram eduGdp={simState.educationGdpPct} healthGdp={simState.healthGdpPct} />
        </div>
      )}

      {labStep === 4 && (
        <div className="space-y-4">
          <p className="text-xs text-slate-300">
            Engineered under <strong>National Education Policy (NEP) 2020</strong>: Align university education with vocational skills to eliminate graduate unemployment and power the Knowledge Economy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between">
                <label className="text-gold-300 font-semibold">NEP 2020 Vocational Integration Level</label>
                <span className="font-bold text-amber-300">{simState.nepImplementation}%</span>
              </div>
              <input
                type="range" min="0" max="100" step="5"
                value={simState.nepImplementation}
                onChange={e => handleChange('nepImplementation', parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">Multidisciplinary credit choices, practical internships, STEM labs</p>
            </div>

            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
              <div className="flex justify-between border-b border-slate-700 pb-1">
                <span className="text-slate-400">Graduate Unemployment Rate:</span>
                <span className={`font-bold ${parseFloat(graduateUnemploymentRate) > 10 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {graduateUnemploymentRate}%
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-700 pb-1">
                <span className="text-slate-400">Knowledge Economy Readiness Index:</span>
                <span className="font-bold text-gold-300">
                  {Math.min(100, Math.round(simState.nepImplementation * 0.75 + simState.educationGdpPct * 5))}/100
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IT & High-Tech Service Exports:</span>
                <span className="font-bold text-emerald-300">High Growth</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Indicator Dash */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
        <div>
          <span className="text-slate-400 block text-[10px]">HCI Aggregate:</span>
          <span className="text-amber-400 font-bold">{totalHci} / 100</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Projected GDP Growth:</span>
          <span className="text-emerald-400 font-bold">{gdpGrowthEstimate}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Adult Literacy Rate:</span>
          <span className="text-gold-400 font-bold">{adultLiteracyEstimate}%</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Graduate Unemp.:</span>
          <span className="text-purple-400 font-bold">{graduateUnemploymentRate}%</span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export interface C11_EcoHumanCapitalCBSESimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
  readOnly?: boolean;
}

export const C11_EcoHumanCapitalCBSESim: React.FC<C11_EcoHumanCapitalCBSESimProps> = ({
  onComplete,
  initialNodeId = 'c11_eco_cbse_128',
  readOnly = false
}) => {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary' | 'diagnostics'>('discovery');

  // Interactive Lab Step (0 to 4)
  const [labStepIndex, setLabStepIndex] = useState<number>(0);

  // Macro Engine State
  const [simState, setSimState] = useState<MacroSimState>({
    educationGdpPct: 3.2,
    healthGdpPct: 1.5,
    ojtIncentive: 40,
    rteStrictness: 60,
    migrationMobility: 50,
    cessRate: 3.0,
    nepImplementation: 45
  });

  // Discovery Question State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // User Predictions & Observations
  const [userPredictions, setUserPredictions] = useState<Record<number, number>>({});
  const [userObservations, setUserObservations] = useState<Record<number, number>>({});

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeStatus, setChallengeStatus] = useState<Record<number, boolean>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState(0.2, 0.2, 0.1, 0.3);
    });
    return initial;
  });

  const [sm2States, setSm2States] = useState<Record<number, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<number, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach((_, idx) => {
      initial[idx] = createReviewItem(idx.toString());
    });
    return initial;
  });

  // Diagnostic Quiz State
  const [userDiagnostics, setUserDiagnostics] = useState<Record<string, number>>({});
  const [diagSubmitted, setDiagSubmitted] = useState<boolean>(false);

  // UI Feedback States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Timer for Hints
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !showExplanation) {
        const currentChal = CHALLENGES[currentChallengeIndex];
        if (currentChal && currentChal.hints && currentChal.hints.length > 0) {
          setCurrentHint(`💡 Auto-Hint: ${currentChal.hints[0]}`);
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
  }, [currentChallengeIndex, activeTab, showExplanation]);

  // Initial Speech Greeting
  useEffect(() => {
    speechManager.speak('Welcome to the NITI Aayog Human Capital Advisory Lab. Let us build India\'s future workforce.');
  }, []);

  // Handlers
  const handleTabChange = (tab: 'discovery' | 'lab' | 'challenges' | 'summary' | 'diagnostics') => {
    audioManager.play('whoosh');
    setActiveTab(tab);
    if (tab === 'lab') {
      speechManager.speak('Welcome to the interactive policy lab. Adjust spending parameters and observe macroeconomic indicators.');
    } else if (tab === 'challenges') {
      speechManager.speak('Test your knowledge across 24 progressive economics challenges.');
    } else if (tab === 'summary') {
      speechManager.speak('Review the master plan, policy activity, and common economic misconceptions.');
    }
  };

  const handleDiscoverySubmit = () => {
    if (discoveryAnswer === null) return;
    setDiscoverySubmitted(true);
    if (discoveryAnswer === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      setShowConfetti(true);
      speechManager.speak('Excellent analysis! Human capital generates positive social spillovers.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the unique external benefits of human capital.');
    }
  };

  const handlePredictionSelect = (qIdx: number, oIdx: number) => {
    audioManager.play('tap');
    setUserPredictions(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleObservationSelect = (qIdx: number, oIdx: number) => {
    audioManager.play('tap');
    setUserObservations(prev => ({ ...prev, [qIdx]: oIdx }));
    if (oIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex) {
      audioManager.play('pop');
    }
  };

  const handleChallengeSubmit = () => {
    const currentChal = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentChal.type === 'numeric') {
      const val = parseFloat(numericAnswer.trim());
      if (!isNaN(val) && typeof currentChal.correctAnswer === 'number') {
        isCorrect = Math.abs(val - currentChal.correctAnswer) < 0.1;
      }
    } else {
      isCorrect = selectedOption === currentChal.correctIndex;
    }

    setChallengeStatus(prev => ({ ...prev, [currentChallengeIndex]: isCorrect }));
    setShowExplanation(true);

    // Update BKT & SM2
    const node = currentChal.nodeId;
    const oldBkt = bktStates[node] || createBKTState(0.2, 0.2, 0.1, 0.3);
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [node]: updatedBkt }));

    const oldSm2 = sm2States[currentChallengeIndex] || createReviewItem(currentChallengeIndex.toString());
    const updatedSm2 = sm2Update(oldSm2, isCorrect ? 5 : 1);
    setSm2States(prev => ({ ...prev, [currentChallengeIndex]: updatedSm2 }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: 250 });
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      speechManager.speak('Correct analysis! Outstanding work.');
    } else {
      audioManager.play('error');
      setStreak(0);
      speechManager.speak('Incorrect answer. Read the economic explanation carefully.');
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setSelectedOption(null);
    setNumericAnswer('');
    setShowExplanation(false);
    setShowSparkle(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowSuccess(true);
      recordGameScore('human_capital_formation', score + 50);
      if (onComplete) onComplete(score + 50);
      speechManager.speak('Congratulations! You have completed all Human Capital challenges!');
    }
  };

  const handleDiagnosticSubmit = (qId: string, oIdx: number) => {
    audioManager.play('tap');
    setUserDiagnostics(prev => ({ ...prev, [qId]: oIdx }));
  };

  // Mastery score summary
  const totalMasteryScore = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach(id => {
      total += masteryProb(bktStates[id] || createBKTState(0.2, 0.2, 0.1, 0.3));
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  const currentChal = CHALLENGES[currentChallengeIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 select-none">
      {/* GLOBAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text={`Mastery Complete! Final Score: ${score + 50}`} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* TOP HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-4 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-2xl text-slate-950 shadow-lg">
            🎓
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider bg-amber-500/10 text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-500/20">
                ISC / CBSE Class 11 Economics
              </span>
              <span className="text-xs text-slate-400">• Chapter 5: Human Capital Formation</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
              {SCENARIO.title}
            </h1>
          </div>
        </div>

        {/* TOP METRICS TICKER */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-xs">
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Overall Mastery</span>
            <span className="font-bold text-amber-400 text-sm">{totalMasteryScore}%</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Sim Score</span>
            <span className="font-bold text-emerald-400 text-sm">{score}</span>
          </div>
          <div className="w-px h-6 bg-slate-800" />
          <div className="text-center">
            <span className="text-slate-400 block text-[10px]">Streak</span>
            <span className="font-bold text-gold-400 text-sm">{streak} 🔥</span>
          </div>
        </div>
      </header>

      {/* MAIN NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => handleTabChange('discovery')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'discovery'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          🔍 1. Discovery & Hook
        </button>
        <button
          onClick={() => handleTabChange('lab')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'lab'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          ⚡ 2. Interactive Policy Labs ({EXPLORATION_STEPS.length})
        </button>
        <button
          onClick={() => handleTabChange('challenges')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'challenges'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          🏆 3. Adaptive Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => handleTabChange('diagnostics')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'diagnostics'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          📝 4. Diagnostic Quiz ({DIAGNOSTIC_QUESTIONS.length})
        </button>
        <button
          onClick={() => handleTabChange('summary')}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          📘 5. Real-World & Misconceptions
        </button>
      </nav>

      {/* TAB CONTENT AREA */}
      <main className="max-w-7xl mx-auto space-y-6">
        {/* TAB 1: DISCOVERY & HOOK */}
        {activeTab === 'discovery' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Scenario Narrative Box */}
            <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 p-5 rounded-xl space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Policy Mission Brief</span>
              <h2 className="text-xl md:text-2xl font-bold text-white">{SCENARIO.intro}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Discovery Core Question Card */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <span>🧠 Counter-Intuitive Economics Hook</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-slate-100">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => {
                      audioManager.play('tap');
                      setDiscoveryAnswer(idx);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                      discoveryAnswer === idx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoveryAnswer === null}
                  onClick={handleDiscoverySubmit}
                  className="w-full md:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg"
                >
                  Submit Policy Hypothesis
                </button>
              ) : (
                <div className="p-4 bg-slate-900 rounded-xl border border-amber-500/40 space-y-2">
                  <div className="font-bold text-amber-400 text-sm">
                    {discoveryAnswer === DISCOVERY_QUESTION.correctIndex ? '✅ Spot on Economic Reasoning!' : '💡 Economics Insight:'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS SECTION */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gold-300 flex items-center gap-2">
                <span>🔮 Policy Hypotheses & Predictions</span>
                <span className="text-xs text-slate-400 font-normal">(Formulate before running simulations)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PREDICTION_QUESTIONS.map((pred, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gold-400 bg-gold-950 px-2 py-0.5 rounded border border-gold-800">
                        Prediction #{qIdx + 1}
                      </span>
                      <p className="text-xs font-semibold text-slate-200 mt-2">{pred.question}</p>
                    </div>
                    <div className="space-y-1.5">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handlePredictionSelect(qIdx, oIdx)}
                          className={`w-full text-left p-2 rounded text-[11px] border transition-all ${
                            userPredictions[qIdx] === oIdx
                              ? 'bg-gold-500/20 border-gold-500 text-gold-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {userPredictions[qIdx] !== undefined && (
                      <div className="text-[10px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                        🔍 <em>Verify in Lab:</em> {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE POLICY LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Step Selection Tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setLabStepIndex(idx);
                  }}
                  className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    labStepIndex === idx
                      ? 'bg-gold-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Step Instruction Card */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-xs md:text-sm text-slate-300 flex items-center gap-3">
              <span className="text-xl">📍</span>
              <div>
                <strong className="text-amber-400 block mb-0.5">{EXPLORATION_STEPS[labStepIndex].title}</strong>
                {EXPLORATION_STEPS[labStepIndex].instruction}
              </div>
            </div>

            {/* Live Interactive Macro Lab Widget */}
            <InteractiveMacroLabWidget
              labStep={labStepIndex}
              simState={simState}
              setSimState={setSimState}
              onInteract={() => audioManager.play('count')}
            />

            {/* MANDATORY OBSERVATION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>👁️ Empirical Lab Observations</span>
                <span className="text-xs text-slate-400 font-normal">(Test what you observed from simulation outputs)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OBSERVATION_QUESTIONS.map((obs, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        Observation #{idx + 1}
                      </span>
                      <p className="text-xs font-semibold text-slate-200 mt-2">{obs.question}</p>
                    </div>
                    <div className="space-y-1.5">
                      {obs.observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleObservationSelect(idx, oIdx)}
                          className={`w-full text-left p-2 rounded text-[11px] border transition-all ${
                            userObservations[idx] === oIdx
                              ? oIdx === obs.correctIndex
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADAPTIVE CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            {/* Challenge Progress Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border ${
                    currentChal.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                    currentChal.difficulty === 'standard' ? 'bg-gold-950 text-gold-400 border-gold-800' :
                    'bg-purple-950 text-purple-400 border-purple-800'
                  }`}>
                    {currentChal.difficulty} Tier
                  </span>
                  <span className="text-xs text-slate-400">• Competency: {currentChal.competencyLevel}</span>
                </div>
                <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </h2>
              </div>

              {/* Progress Bar */}
              <div className="w-full md:w-64 space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progress</span>
                  <span>{Math.round(((currentChallengeIndex + 1) / CHALLENGES.length) * 100)}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Box */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-4">
              <h3 className="text-base md:text-lg font-semibold text-slate-100 leading-snug">
                {currentChal.question}
              </h3>

              {/* Multiple Choice Options */}
              {currentChal.type !== 'numeric' && currentChal.options && (
                <div className="space-y-2.5">
                  {currentChal.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={showExplanation}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedOption(idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm font-medium transition-all ${
                        selectedOption === idx
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {currentChal.type === 'numeric' && (
                <div className="space-y-3 max-w-sm">
                  <label className="text-xs text-slate-400 font-semibold block">Enter Numeric Answer:</label>
                  <input
                    type="number"
                    step="any"
                    disabled={showExplanation}
                    value={numericAnswer}
                    onChange={e => setNumericAnswer(e.target.value)}
                    placeholder="e.g. 3.0"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Submit / Next Buttons */}
              {!showExplanation ? (
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    disabled={currentChal.type === 'numeric' ? !numericAnswer.trim() : selectedOption === null}
                    onClick={handleChallengeSubmit}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg"
                  >
                    Submit Answer
                  </button>
                  <button
                    onClick={() => {
                      audioManager.play('hint');
                      setCurrentHint(`💡 Hint: ${currentChal.hints[0]}`);
                      setShowHint(true);
                    }}
                    className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700"
                  >
                    Need Hint?
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    challengeStatus[currentChallengeIndex]
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="font-bold text-sm">
                      {challengeStatus[currentChallengeIndex] ? '✅ Correct Answer!' : '❌ Incorrect'}
                    </div>
                    <p className="text-xs leading-relaxed">{currentChal.explanation}</p>
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge ➔' : 'Complete Challenge Module 🎓'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: DIAGNOSTIC QUIZ */}
        {activeTab === 'diagnostics' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white">Curriculum Diagnostic Assessment</h2>
                <p className="text-xs text-slate-400">Validate core node concepts (UGC, NCERT, RTE, Kothari Commission, Cess)</p>
              </div>
              <button
                onClick={() => {
                  setDiagSubmitted(true);
                  audioManager.play('celebration');
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl shadow"
              >
                Grade Assessment
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DIAGNOSTIC_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                    Question {idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-slate-200">{q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        disabled={diagSubmitted}
                        onClick={() => handleDiagnosticSubmit(q.id, oIdx)}
                        className={`w-full text-left p-2 rounded text-[11px] border transition-all ${
                          userDiagnostics[q.id] === oIdx
                            ? diagSubmitted
                              ? oIdx === q.correctIndex
                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                                : 'bg-rose-500/20 border-rose-500 text-rose-300 font-bold'
                              : 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {diagSubmitted && (
                    <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: REAL-WORLD & MISCONCEPTIONS */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="text-lg font-bold text-amber-400">{REAL_WORLD_ACTIVITY.title}</h3>
                  <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold border border-amber-500/40 shrink-0">
                      {sIdx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MISCONCEPTIONS ACCORDION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <span>⚠️ Common Economic Misconceptions & Corrections</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                      {m.title}
                    </span>
                    <p className="text-xs font-semibold text-rose-300 line-through">❌ Misconception: {m.misconception}</p>
                    <p className="text-xs text-emerald-300 font-medium">✅ Correction: {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TOPIC NODE KNOWLEDGE MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold text-gold-300">Curriculum Node Glossary ({ALL_NODE_IDS.length} Nodes Covered)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {ALL_NODE_IDS.map(id => {
                  const node = NODE_DETAILS[id];
                  const bkt = bktStates[id] || createBKTState(0.2, 0.2, 0.1, 0.3);
                  const mastery = Math.round(masteryProb(bkt) * 100);

                  return (
                    <div key={id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-amber-400 text-[11px]">{node.title}</span>
                        <span className="text-[10px] font-semibold text-gold-400 bg-gold-950 px-1.5 py-0.5 rounded border border-gold-800">
                          {mastery}%
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{node.eli5}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
        Interactive ISC/CBSE Economics Learning Module • Human Capital Formation Lab • CISCE Curriculum Compliant
      </footer>
    </div>
  );
};

export default C11_EcoHumanCapitalCBSESim;