'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC SYLLABUS NODE LITERAL CONSTANTS ───
const NODE_C12_SOC_031 = 'c12_soc_031';
const NODE_C12_SOC_032 = 'c12_soc_032';
const NODE_C12_SOC_033 = 'c12_soc_033';
const NODE_C12_SOC_034 = 'c12_soc_034';
const NODE_C12_SOC_035 = 'c12_soc_035';
const ALL_NODE_IDS = [NODE_C12_SOC_031, NODE_C12_SOC_032, NODE_C12_SOC_033, NODE_C12_SOC_034, NODE_C12_SOC_035];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Transformation of Sonpur District',
  intro: 'Sonpur, a historically agrarian and tribal district in eastern India, is undergoing rapid transformation. A high-speed expressway, solar parks, industrial steel plants, mobile connectivity, and grassroots schools are altering age-old social hierarchies, family systems, and traditional authority.',
  context: 'As a district sociological analyst appointed by the State Planning Board, you must analyse how industrialisation, education, tribal rights (PESA/FRA), mass media, and the Right to Information (RTI) interact with caste, gender, and ecological sustainability.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In Sonpur village, mobile internet and road connectivity arrive simultaneously. Within 3 years, youth adopt modern attire and job apps, but community elders still insist on caste-endogamous arranged marriages. What sociological concept explains this tension?',
  options: [
    'Cultural Diffusion without any social impact',
    'Culture Lag (Material culture changed faster than non-material norms)',
    'Complete Westernization and disappearance of caste',
    'Structural Equilibrium with zero friction'
  ],
  correctIndex: 1,
  hintAfter: 'Material tools (smartphones, roads) transformed instantly, but belief systems and marriage norms adapted much slower. This is Ogburn\'s Culture Lag!',
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

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between technological change and social change in Sonpur district?',
    observableOptions: [
      'Technological changes (irrigation, roads) drive structural changes in caste, occupation, and family patterns (✓)',
      'Technology has no impact on social structures (✗)',
      'Social change occurs independently of technology (✗)',
      'Technology reverses all social progress (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When comparing endogenous versus exogenous sources of social change, what key difference emerges?',
    observableOptions: [
      'Endogenous changes originate from within society; exogenous changes come from outside forces (✓)',
      'Both originate from within society (✗)',
      'Both come from external forces only (✗)',
      'Endogenous changes are always violent (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_01_f_def',
    nodeId: NODE_C12_SOC_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does sociologist Kingsley Davis define social change in comparison to personal biographical changes?',
    options: [
      'Any personal shift in career or hobbies of a single individual',
      'Observable alterations and modifications in the established patterns of social interaction and structure',
      'Exclusively the rise in economic Gross Domestic Product (GDP)',
      'The preservation of traditional customary rituals without modification'
    ],
    correctIndex: 1,
    explanation: 'Kingsley Davis defines social change as modifications in established patterns of social relationships, interaction, and social structure. It is collective and structural, not individual biographical shift.',
    hints: [
      'Social change concerns collective patterns of society, not just one person\'s choices.',
      'Think of how relationships, roles, and structural norms alter over time.',
      'Kingsley Davis emphasized modifications in social interaction and social organisation.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02_f_aspects',
    nodeId: NODE_C12_SOC_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each key development term to its correct definition in the sociological matrix.',
    dragItems: [
      { label: 'Industrialisation', targetId: 'aspect_1' },
      { label: 'Urbanisation', targetId: 'aspect_2' },
      { label: 'Modernisation', targetId: 'aspect_3' },
      { label: 'Sustainable Dev', targetId: 'aspect_4' }
    ],
    correctMapping: {
      aspect_1: 'Industrialisation',
      aspect_2: 'Urbanisation',
      aspect_3: 'Modernisation',
      aspect_4: 'Sustainable Dev'
    },
    explanation: 'Industrialisation replaces handicraft with machine production; Urbanisation shifts population to towns; Modernisation introduces rational-secular values; Sustainable Development protects future generations (Brundtland 1987).',
    hints: [
      'Machine factory production matches Industrialisation.',
      'Demographic movement into cities matches Urbanisation.',
      'Scientific and secular value transformation is Modernisation; meeting present needs without harming future is Sustainable Development.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03_f_brundtland',
    nodeId: NODE_C12_SOC_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which international commission (1987) defined sustainable development as "meeting the needs of the present without compromising future generations"?',
    options: [
      'Brundtland Commission (Our Common Future)',
      'Simon Commission',
      'Planning Commission of India',
      'Kothari Education Commission'
    ],
    correctIndex: 0,
    explanation: 'The 1987 UN World Commission on Environment and Development, headed by Gro Harlem Brundtland, established this foundational definition.',
    hints: [
      'It is named after a former Norwegian Prime Minister.',
      'The report was titled "Our Common Future" in 1987.',
      'It starts with the letter B: Brundtland Commission.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_04_f_rte_age',
    nodeId: NODE_C12_SOC_034,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Right of Children to Free and Compulsory Education (RTE) Act 2009 (Article 21A), what is the maximum statutory age for guaranteed free schooling?',
    correctAnswer: 14,
    tolerance: 0,
    unit: 'years old',
    explanation: 'The RTE Act 2009 guarantees free and compulsory elementary education (Classes 1 to 8) to children between 6 and 14 years of age.',
    hints: [
      'It covers elementary schooling from Class 1 to 8.',
      'The age range is 6 to __ years.',
      'The upper age limit is exactly 14 years.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_05_f_rti_deadline',
    nodeId: NODE_C12_SOC_035,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under normal circumstances, within how many days must a Public Information Officer (PIO) respond to an RTI application under the RTI Act 2005?',
    correctAnswer: 30,
    tolerance: 0,
    unit: 'days',
    explanation: 'Under Section 7(1) of the RTI Act 2005, the PIO must provide the requested information within 30 days (reduced to 48 hours if life or liberty is involved).',
    hints: [
      'It is roughly one standard calendar month.',
      'Think between 25 and 35 days.',
      'The statutory time limit is exactly 30 days.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_06_f_smelser',
    nodeId: NODE_C12_SOC_034,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange Neil Smelser\'s Value-Added Theory conditions of a social movement in their correct chronological sequence.',
    sortItems: [
      'Structural Conduciveness (systemic opening)',
      'Structural Strain (felt deprivation or conflict)',
      'Growth of Generalised Belief (shared ideology)',
      'Precipitating Factors (trigger event)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Smelser posits value-added stages: Conduciveness → Strain → Generalised Belief → Precipitating Trigger → Mobilisation → Operation of Social Control.',
    hints: [
      'First the system must allow collective action (conduciveness).',
      'Next people experience strain and develop a shared belief.',
      'A precipitating spark/trigger then ignites mass mobilisation.'
    ]
  },
  {
    id: 'ch_07_f_media_types',
    nodeId: NODE_C12_SOC_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Khabar Lahariya, a renowned Bundelkhand grassroots publication managed by Dalit and Adivasi women, represents which form of mass media?',
    options: [
      'Electronic broadcast satellite television',
      'Print media (investigative community newspaper/digital journalism)',
      'Commercial cinema box-office blockbuster',
      'Social media rumour aggregation'
    ],
    correctIndex: 1,
    explanation: 'Khabar Lahariya originated as an independent print rural newspaper in local dialects, pioneering community print and investigative reporting on caste and gender.',
    hints: [
      'It started as a physical local paper published in rural Uttar Pradesh.',
      'It is written and distributed in local languages to report local village truths.',
      'It is primarily a print/journalistic medium.'
    ]
  },

  // Standard Tier (8-15)
  {
    id: 'ch_08_s_sanskritization',
    nodeId: NODE_C12_SOC_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'M.N. Srinivas described "Sanskritization" as cultural imitation altering social position. How does this demonstrate the link between cultural change and social change?',
    options: [
      'Cultural change has zero impact on social stratification',
      'Lower castes adopt higher-caste customs (cultural change), which eventually alters their prestige and relationships within the local caste hierarchy (social change)',
      'It completely abolishes the varna system overnight through constitutional decree',
      'It is solely an economic transaction of purchasing agricultural land'
    ],
    correctIndex: 1,
    explanation: 'Sanskritization proves that cultural shifts (changing rituals, diet, lifestyle) act as vehicles that produce structural social mobility within the local caste hierarchy.',
    hints: [
      'Remember M.N. Srinivas\'s field studies in Coorg and Rampura.',
      'Cultural imitation in rituals and vegetarianism leads to claims of higher ritual status.',
      'Cultural adoption produces changes in the structural hierarchy of the caste order.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_09_s_amartya_sen',
    nodeId: NODE_C12_SOC_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Amartya Sen\'s "Development as Freedom" framework, why is rapid GDP growth alone insufficient to declare a region fully developed?',
    options: [
      'Because development requires the expansion of substantive human freedoms, health, literacy, and social choices, not just per capita wealth',
      'Because GDP numbers are always completely fabricated by state economists',
      'Because sociology rejects any study of money and trade',
      'Because development only applies to Western European societies'
    ],
    correctIndex: 0,
    explanation: 'Sen emphasizes capabilities and freedoms: if wealth grows but life expectancy stagnates, poverty persists, or democratic rights are crushed, development has failed.',
    hints: [
      'Think about human capabilities: health, schooling, and agency.',
      'Income is a means, but human freedom and dignity are the real ends of development.',
      'Sen looks at the Human Development Index (HDI) rather than pure GDP.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_10_s_narmada',
    nodeId: NODE_C12_SOC_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The Narmada Bachao Andolan led by Medha Patkar challenged the Sardar Sarovar Dam. Sociologically, what core development tension did it expose?',
    options: [
      'A simple dispute over the brand of cement used in dam walls',
      'The conflict between state-centric utilitarian growth (dams for urban electricity) versus the displacement and ecological destruction of indigenous Adivasi communities',
      'A religious movement demanding temple construction on the riverbank',
      'An opposition to all forms of education in Madhya Pradesh'
    ],
    correctIndex: 1,
    explanation: 'The NBA highlighted how large-scale growth models often privatise benefits to urban centres while imposing acute ecological and human displacement costs on tribal populations.',
    hints: [
      'Who gained electricity and water, and who lost their ancestral forests and homes?',
      'Consider the conflict perspective in sociology: unequal distribution of costs and gains.',
      'It exemplifies exclusionary development versus tribal displacement.'
    ]
  },
  {
    id: 'ch_11_s_bourdieu_edu',
    nodeId: NODE_C12_SOC_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrasting Durkheim\'s moral-glue view of education, Pierre Bourdieu argued that elite schooling often reproduces inequality through which sociological mechanism?',
    options: [
      'Physical coercion and military policing inside classrooms',
      'Cultural Capital (rewarding linguistic codes, dispositions, and habits of the dominant social class)',
      'Total abolishment of examinations and grades',
      'Providing free midday meals to every child equally'
    ],
    correctIndex: 1,
    explanation: 'Bourdieu showed that educational institutions value the "cultural capital" (speech, manners, familiarity with high culture) of upper classes, disadvantaging first-generation learners.',
    hints: [
      'Think about non-financial advantages like accent, language fluency, and family backgrounds.',
      'Bourdieu coined the term "Cultural Capital".',
      'Schools naturally validate the cultural codes of the privileged class.'
    ]
  },
  {
    id: 'ch_12_s_fertility_edu',
    nodeId: NODE_C12_SOC_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to National Family Health Survey (NFHS-5) data, women with 12+ years of schooling in India achieve an average Total Fertility Rate (TFR) of approximately what value (versus 3.0+ for uneducated women)?',
    correctAnswer: 2,
    tolerance: 0.2,
    unit: 'children per woman',
    explanation: 'NFHS-5 highlights that female education is the most powerful demographic stabilizer, bringing TFR down to 1.8-2.0 children per woman.',
    hints: [
      'It is at or slightly below India\'s national replacement fertility level.',
      'The number is around 2 children per mother.',
      'Enter 2.0 or 2.'
    ]
  },
  {
    id: 'ch_13_s_rti_tribal_pds',
    nodeId: NODE_C12_SOC_035,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the sequential investigative path of the Mazdoor Kisan Shakti Sangathan (MKSS) using RTI for social auditing of famine relief/PDS records.',
    availableParts: ['File RTI with PIO', 'Audit Muster Rolls', 'Hold Jan Sunwai (Public Hearing)', 'Expose Ghost Beneficiaries'],
    targetState: 'File RTI with PIO Audit Muster Rolls Hold Jan Sunwai (Public Hearing) Expose Ghost Beneficiaries',
    validationHint: 'Sequence: Legal filing -> Document inspection -> Public community verification -> Accountability',
    explanation: 'MKSS pioneered transparency by securing official records via RTI, auditing muster rolls, conducting open village Jan Sunwais, and holding officials accountable.',
    hints: [
      'Start with legal filing of RTI to get the government registers.',
      'Next, audit the official muster rolls against real names.',
      'Convene the public in a Jan Sunwai to verify signatures, finally exposing ghost payments.'
    ]
  },
  {
    id: 'ch_14_s_media_lynch',
    nodeId: NODE_C12_SOC_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In 2018-2020, viral child-abduction rumours spread over encrypted messaging apps resulted in tragic mob violence in several Indian states. This illustrates which negative aspect of mass media?',
    options: [
      'The beneficial expansion of investigative journalism',
      'The weaponisation of digital platforms via unverified misinformation and algorithmic panic',
      'The complete success of community radio programmes',
      'The natural functioning of the Right to Education Act'
    ],
    correctIndex: 1,
    explanation: 'Audiovisual and digital media can bypass journalistic gatekeeping, accelerating viral misinformation and manufactured panic leading to real-world violence.',
    hints: [
      'Look at how fake news and rumours spread unchecked on WhatsApp.',
      'It shows the destructive side of unmoderated digital networks.',
      'It reflects the algorithmic circulation of misinformation.'
    ]
  },
  {
    id: 'ch_15_s_urban_census',
    nodeId: NODE_C12_SOC_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'According to the official Census of India 2011, what percentage of India\'s total population lived in urban areas (up from 27.81% in 2001)?',
    correctAnswer: 31.16,
    tolerance: 0.5,
    unit: 'percent urban',
    explanation: 'Census 2011 recorded India\'s urban population at 31.16% (approximately 377 million people), demonstrating steady demographic urbanization.',
    hints: [
      'The number is slightly above 31%.',
      'Think between 31.0 and 31.5 percent.',
      'The exact census statistic is 31.16%.'
    ]
  },

  // Advanced Tier (16-22)
  {
    id: 'ch_16_a_tribal_displacement',
    nodeId: NODE_C12_SOC_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A state government clears 2,000 hectares of ancestral sal forest for open-cast bauxite mining, promising industrial GDP growth and factory jobs. The local Santhal Gram Sabha invokes the Forest Rights Act 2006 to resist eviction. How should a sociologist evaluate this scenario using the Brundtland Framework?',
    options: [
      'Mining is unconditionally progressive because industrial GDP growth always overrides tribal cultural survival.',
      'True development requires balancing economic mineral needs with intergenerational ecological health and the prior informed consent of indigenous guardians who depend on forest biodiversity.',
      'Tribal communities should be forcefully urbanised to accelerate Westernization.',
      'The state should ban all forms of mineral extraction across the entire continent permanently.'
    ],
    correctIndex: 1,
    explanation: 'Under the Brundtland and capability frameworks, development that strips indigenous groups of ecological sustenance and ancestral rights without consent is unsustainable and unjust.',
    hints: [
      'Look for the option that integrates social justice, ecology, and genuine participatory democracy.',
      'Remember the Brundtland definition: intergenerational equity.',
      'Economic growth cannot be decoupled from indigenous rights and environmental safeguards.'
    ]
  },
  {
    id: 'ch_17_a_rte_hidden_curriculum',
    nodeId: NODE_C12_SOC_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under Section 12(1)(c) of the RTE Act 2009, private unaided schools must reserve 25% seats for Economically Weaker Section (EWS) children. However, studies show EWS students often experience isolation due to peer accents, uniforms, and digital device gaps. Which concept describes this informal exclusionary environment?',
    options: [
      'The Hidden Curriculum and cultural capital deficit',
      'Formal constitutional reservation',
      'Structural Functional Equilibrium',
      'Universal Primary Enrolment'
    ],
    correctIndex: 0,
    explanation: 'The "Hidden Curriculum" refers to unwritten, informal norms and class biases in schools where privileged cultural capital marginalises economically disadvantaged students despite legal access.',
    hints: [
      'It is not written in the formal syllabus but experienced through informal peer culture.',
      'Recall Bourdieu and conflict theorists on classroom culture.',
      'The term is the "Hidden Curriculum".'
    ]
  },
  {
    id: 'ch_18_a_chipko_ecofeminism',
    nodeId: NODE_C12_SOC_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the 1974 Chipko Movement in Reni village, Gaura Devi and hill women hugged ash trees to prevent commercial loggers from felling them. Why is Chipko categorized as both an environmental and an ecofeminist social movement?',
    options: [
      'The women wanted to clear the forest themselves to build commercial shopping complexes',
      'Hill women bore the primary burden of collecting firewood, fodder, and clean water; their subsistence livelihood was directly intertwined with forest conservation against commercial exploitation',
      'It was an exclusively urban political campaign organized by television journalists',
      'It was a corporate campaign sponsored by logging conglomerates'
    ],
    correctIndex: 1,
    explanation: 'Chipko united ecological survival with women\'s gendered labour: deforestation forced women to walk miles further for fuel and water, turning them into grassroots environmental leaders.',
    hints: [
      'Think of the daily gendered division of labour in Himalayan agrarian households.',
      'Deforestation directly threatens the daily survival tasks of rural women.',
      'Ecofeminism explores the direct link between women\'s sustenance and natural resource health.'
    ]
  },
  {
    id: 'ch_19_a_smelser_farmers',
    nodeId: NODE_C12_SOC_034,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Map the stages of the 2020-2021 Indian Farmers\' Movement to Smelser\'s Value-Added Theory in sequential order.',
    sortItems: [
      'Structural Strain: Agrarian distress, crop pricing uncertainty, and debt pressure',
      'Generalised Belief: Conviction that corporate contract farming laws will dismantle MSP',
      'Precipitating Factor: Sudden promulgation of three central farm ordinances in 2020',
      'Mobilisation: Samyukta Kisan Morcha organizing Singhu Border blockades and social media handles'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The farmers\' movement followed textbook Smelser stages: existing agrarian strain + shared ideological belief + ordinance passage trigger + disciplined mass mobilisation.',
    hints: [
      'Long-term agrarian debt is the underlying strain.',
      'The shared fear regarding MSP forms the generalised belief.',
      'The passing of ordinances was the precipitating trigger; the border tractor rallies represent mobilisation.'
    ]
  },
  {
    id: 'ch_20_a_solar_alliance',
    nodeId: NODE_C12_SOC_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'India\'s leadership in the International Solar Alliance (ISA) and PM Surya Ghar scheme exemplifies which proactive strategy in the sociology of development?',
    options: [
      'Regressive de-industrialisation and total abandonment of electrical power grids',
      'Decoupling development from fossil fuels to achieve ecological sustainability while expanding affordable clean energy access to rural households',
      'Enforcing complete dependence on coal imported from high-income nations',
      'Privatising all public water bodies for speculative global trade'
    ],
    correctIndex: 1,
    explanation: 'The solar transition is a textbook case of reconciling developmental capability expansion (electrification) with ecological sustainability (mitigating climate emissions).',
    hints: [
      'It proves development and environmental care can advance together.',
      'Solar energy replaces carbon-heavy coal while bringing light to remote villages.',
      'It operationalises the Brundtland vision through clean technology.'
    ]
  },
  {
    id: 'ch_21_a_rti_exemptions',
    nodeId: NODE_C12_SOC_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A citizen files an RTI asking for the minutes of a Panchayat meeting deciding water pump locations in a village. The local official refuses, claiming it is "confidential state security". Under the RTI Act 2005, is this refusal lawful?',
    options: [
      'Yes, any village official has total subjective discretion to declare routine records confidential',
      'No, Panchayat water allocations do not fall under Section 8 national security exemptions; public utility records must be disclosed to ensure democratic accountability',
      'Yes, because the RTI Act does not apply to village-level local governments',
      'Yes, because only certified lawyers with High Court licenses can submit RTI queries'
    ],
    correctIndex: 1,
    explanation: 'Section 8 exemptions are strictly limited to national sovereignty, defence, and judicial sub-judice. Local welfare delivery must be transparently disclosed to all citizens.',
    hints: [
      'Panchayats are public authorities under the Constitution (73rd Amendment).',
      'Drinking water delivery has nothing to do with national military secrets.',
      'Section 8 exemptions cannot be arbitrarily misused to shield local governance from scrutiny.'
    ]
  },
  {
    id: 'ch_22_a_construct_synthesis',
    nodeId: NODE_C12_SOC_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the multi-causal chain explaining how female education initiates structural social change in rural India.',
    availableParts: ['Girls Schooling Expansion', 'Delayed Age of Marriage', 'Lower Fertility & Better Child Health', 'Intergenerational Female Empowerment'],
    targetState: 'Girls Schooling Expansion Delayed Age of Marriage Lower Fertility & Better Child Health Intergenerational Female Empowerment',
    validationHint: 'Link: Education -> Demographic change -> Health/Family structure -> Long-term societal empowerment',
    explanation: 'Educational access triggers a chain reaction: it delays marriage, reduces fertility rates, improves maternal-child survival, and reshapes traditional gender relations.',
    hints: [
      'Begin with expanding girls\' schooling in the village.',
      'This directly delays the customary age of marriage.',
      'Delayed marriage leads to lower fertility and healthier children, culminating in intergenerational empowerment.'
    ]
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_SOC_031,
  title: 'Social Change and Development in India',
  definition: 'Social change refers to observable, patterned alterations in the social structure, functions, institutions, and relationships of a society over time. Development is a directed, value-oriented form of progressive social change that expands human capabilities, freedoms, and ecological sustainability.',
  eli5: 'Social change is how society reshapes its rules and relationships over time. Development is when that change makes life healthier, fairer, and cleaner for both current and future generations.',
  misconceptions: [
    { misconception: 'Social change and cultural change are completely identical.', correction: 'Cultural change concerns ideas, tools, and beliefs; social change concerns the structural organisation of relationships. Sanskritization is cultural adoption that induces social mobility.' },
    { misconception: 'Development is simply the growth of Gross Domestic Product (GDP).', correction: 'Development is multidimensional, encompassing literacy, life expectancy, gender equity, and human freedom (Amartya Sen).' },
    { misconception: 'Sustainable development means halting all economic progress.', correction: 'Sustainable development redirects growth to meet present needs without destroying the natural resources needed by future generations (Brundtland 1987).' },
    { misconception: 'The RTE Act guarantees free college education to all adult citizens.', correction: 'RTE guarantees free and compulsory schooling specifically for children aged 6 to 14 years up to Class VIII.' },
    { misconception: 'RTI applies to private multinational companies and corporate boards.', correction: 'RTI applies strictly to public authorities, state bodies, and NGOs substantially financed by the government.' }
  ],
  diagnosticQuestions: [
    { question: 'What distinguishes social change from mere individual biographical change?', options: ['Individual changes are patterned across whole social structures', 'Social change involves collective modifications in social institutions and relational patterns', 'Personal career shifts alter universal society instantly', 'There is no difference in sociological theory'], correctIndex: 1 },
    { question: 'What proportion of India\'s population was recorded as urban in Census 2011?', options: ['18.2%', '27.8%', '31.16%', '52.4%'], correctIndex: 2 },
    { question: 'Which sociologist formulated the concept of Sanskritization in Indian village studies?', options: ['G.S. Ghurye', 'M.N. Srinivas', 'Andre Beteille', 'Kingsley Davis'], correctIndex: 1 },
    { question: 'What is the Brundtland definition of sustainable development focused on?', options: ['Maximising fossil fuel mining immediately', 'Meeting present needs without compromising future generations', 'Restricting schooling to urban elites', 'Abolishing international trade completely'], correctIndex: 1 },
    { question: 'Which article of the Indian Constitution guarantees the fundamental Right to Education?', options: ['Article 14', 'Article 19(1)(a)', 'Article 21A', 'Article 370'], correctIndex: 2 },
    { question: 'How long does a PIO have to respond under the RTI Act 2005 under standard procedures?', options: ['7 days', '14 days', '30 days', '90 days'], correctIndex: 2 },
    { question: 'What is a core condition in Neil Smelser\'s value-added theory of social movements?', options: ['Total military enforcement', 'Structural strain combined with generalised belief', 'Abolition of language', 'Commercial advertising'], correctIndex: 1 },
    { question: 'What is a major latent function of formal school education?', options: ['Issuing driving licences', 'Socialisation and transmission of cultural norms', 'Printing currency notes', 'Conducting national elections'], correctIndex: 1 }
  ],
  masteryCriteria: 'Mastery is achieved when the student accurately analyses the 5 aspects of development, evaluates the ecological trade-offs of social change, and applies RTE, RTI, and social movement theories to Indian case studies.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Multi-Causal Engine of Social Change',
    instruction: 'Manipulate the 4 key drivers below (Technology, Education, Economy, Law) and watch how the Sonpur Social Structure Gauge transforms in real-time.',
    interactionType: 'slider-engine',
    nodeId: NODE_C12_SOC_031
  },
  {
    title: '2. The 5 Aspects of Modern Development',
    instruction: 'Click each developmental pillar (Industrialisation, Urbanisation, Modernisation, Globalisation, Sustainability) to inspect its Indian indicators and institutional impacts.',
    interactionType: 'click-pillars',
    nodeId: NODE_C12_SOC_032
  },
  {
    title: '3. Dialectical Tension: Growth vs Ecology',
    instruction: 'Adjust the Industrial Output slider and observe the trade-off between District GDP, Tribal Forest Cover, and Community Displacement.',
    interactionType: 'slider-ecology',
    nodeId: NODE_C12_SOC_033
  },
  {
    title: '4. Social Movements & Education (RTE 2009)',
    instruction: 'Simulate the impact of launching Kasturba Balika schools and 25% EWS integration on female literacy, child marriage, and caste barriers.',
    interactionType: 'toggle-edu',
    nodeId: NODE_C12_SOC_034
  },
  {
    title: '5. Mass Media & RTI Social Audit Lab',
    instruction: 'Toggle between Print, TV, and Digital Media. Run an RTI transparency audit on local village welfare funds to uncover discrepancies.',
    interactionType: 'sim-rti',
    nodeId: NODE_C12_SOC_035
  }
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an open-cast coal mine is opened in Sonpur without Gram Sabha consent, what will happen to the local tribal community\'s social cohesion?',
    options: [
      'Cohesion will immediately double because everyone gets executive jobs',
      'Social cohesion will suffer from displacement, loss of sacred groves, and migration into informal urban labour',
      'The tribal community will voluntarily abandon their dialect within 24 hours',
      'No change whatsoever will occur in family or religious structure'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the "Industrial Intensity" slider past 70% in the simulation to observe tribal displacement metrics!',
    nodeId: NODE_C12_SOC_033
  },
  {
    question: 'Predict: When female schooling in Sonpur expands from 30% to 80%, what will happen to the district Total Fertility Rate (TFR) and child marriage rates?',
    options: [
      'Fertility will increase to 6 children per household',
      'Child marriage will plummet and TFR will decline towards replacement level (~2.0)',
      'Female employment will be banned by statutory law',
      'Literacy has zero statistical relationship with marriage age'
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the "RTE Universal Enrolment" switch to verify the demographic transition curve!',
    nodeId: NODE_C12_SOC_034
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'District Sociological Audit: Be the Social Investigator',
  description: 'Design a grassroots social audit report for your own town or district. Trace how a recent developmental project (metro line, highway, factory, or digital portal) reshaped local caste, gender, and environmental realities.',
  steps: [
    'Select a specific infrastructure or educational project in your state (e.g., Metro Rail, Solar Park, or RTE EWS quota).',
    'Interview 2 diverse community members: one beneficiary and one person facing disruption/displacement.',
    'Formulate a 3-point RTI enquiry to check project expenditure, environmental clearance, and rehabilitation funds.',
    'Present your findings using M.N. Srinivas, Amartya Sen, or Brundtland frameworks in a 1-page sociological policy brief.'
  ]
};

// ─── MAIN REACT COMPONENT ───
function C12_SociologySocialChangeDevelopmentSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_SOC_031,
  title = DEFAULT_PROPS.title || 'Social Change and Development in India',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['sociology'] || { name: 'Sociology', emoji: '👥', color: 'emerald' };

  // Phase State Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Exploration States
  const [techLevel, setTechLevel] = useState<number>(45);
  const [eduLevel, setEduLevel] = useState<number>(40);
  const [econLevel, setEconLevel] = useState<number>(50);
  const [lawLevel, setLawLevel] = useState<number>(60);
  const [selectedPillar, setSelectedPillar] = useState<'ind' | 'urb' | 'mod' | 'glob' | 'sust'>('ind');
  const [industrialIntensity, setIndustrialIntensity] = useState<number>(40);
  const [greenPolicyActive, setGreenPolicyActive] = useState<boolean>(true);
  const [rteActive, setRteActive] = useState<boolean>(false);
  const [mediaType, setMediaType] = useState<'print' | 'electronic' | 'digital'>('digital');
  const [rtiAuditFiled, setRtiAuditFiled] = useState<boolean>(false);
  const [rtiAuditFound, setRtiAuditFound] = useState<boolean>(false);

  // Predict and Observe States
  const [predictionMade, setPredictionMade] = useState<boolean>(false);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Challenge Engine States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState<number>(0);
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Interactive Drag / Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual Animation & Feedback States
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle] = useState<boolean>(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED METRICS FOR SIMULATION ───
  const socialMobilityIndex = useMemo(() => {
    return Math.min(100, Math.round((eduLevel * 0.4) + (techLevel * 0.3) + (lawLevel * 0.3)));
  }, [eduLevel, techLevel, lawLevel]);

  const traditionVsModernityRatio = useMemo(() => {
    return Math.min(100, Math.round((techLevel * 0.35) + (econLevel * 0.35) + (eduLevel * 0.3)));
  }, [techLevel, econLevel, eduLevel]);

  const ecologicalHealthIndex = useMemo(() => {
    const base = 100 - (industrialIntensity * 0.8);
    return Math.max(10, Math.min(100, Math.round(greenPolicyActive ? base + 25 : base)));
  }, [industrialIntensity, greenPolicyActive]);

  const tribalDisplacementCount = useMemo(() => {
    return Math.max(0, Math.round((industrialIntensity * 120) - (greenPolicyActive ? 2500 : 800)));
  }, [industrialIntensity, greenPolicyActive]);

  const femaleLiteracyMetric = useMemo(() => {
    return rteActive ? 82.4 : 54.1;
  }, [rteActive]);

  const totalFertilityRate = useMemo(() => {
    return rteActive ? 1.9 : 3.2;
  }, [rteActive]);

  // ─── SPACED REPETITION DAYS CALCULATION ───
  const srsReviewDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  const srsReviewDateText = useMemo(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + srsReviewDays);
    return targetDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }, [srsReviewDays]);

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentMastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentMastery);
    const newTier = (currentMastery === 'not-started' || currentMastery === 'beginner')
      ? 'foundation'
      : currentMastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newTier) {
        setCurrentChallenge(0);
        return newTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS 2D DEMOGRAPHIC WAVE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Demographic Wave 1: Traditional Agrarian
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = 35 + Math.sin(x * 0.02 + step) * 12 * (100 - traditionVsModernityRatio) / 100;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Demographic Wave 2: Modern Urban / Capability Wave
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      for (let x = 0; x < canvas.width; x++) {
        const y = 50 + Math.cos(x * 0.025 - step) * 14 * (socialMobilityIndex / 100);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulse Indicator Dot
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      const dotX = (canvas.width / 2) + Math.sin(step * 2) * 60;
      const dotY = 42 + Math.cos(step * 2) * 15;
      ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [traditionVsModernityRatio, socialMobilityIndex]);

  // ─── CALLBACK HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding sociological deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive sociological exploration of social change.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test policy parameters in the free sandbox lab.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenge series.');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis recorded! Now verify using the simulation controls.');
  }, []);

  const handleTechChange = useCallback((val: number) => {
    setTechLevel(val);
    audioManager.play('count');
  }, []);

  const handleEduChange = useCallback((val: number) => {
    setEduLevel(val);
    audioManager.play('count');
  }, []);

  const handleEconChange = useCallback((val: number) => {
    setEconLevel(val);
    audioManager.play('count');
  }, []);

  const handleLawChange = useCallback((val: number) => {
    setLawLevel(val);
    audioManager.play('count');
  }, []);

  const handlePillarSelect = useCallback((pillar: 'ind' | 'urb' | 'mod' | 'glob' | 'sust') => {
    setSelectedPillar(pillar);
    audioManager.play('tap');
    const speechMap: Record<'ind' | 'urb' | 'mod' | 'glob' | 'sust', string> = {
      ind: 'Industrialisation: Shift from handlooms to factory manufacturing.',
      urb: 'Urbanisation: Growth in city population as measured in Census 2011.',
      mod: 'Modernisation: Adoption of scientific and secular rational values.',
      glob: 'Globalisation: Cross-border integration of trade, ideas, and labour.',
      sust: 'Sustainable Development: Safeguarding future generations as per Brundtland 1987.'
    };
    speechManager.speak(speechMap[pillar]);
  }, []);

  const handleRtiAuditToggle = useCallback(() => {
    setRtiAuditFiled(true);
    audioManager.play('pickup');
    setTimeout(() => {
      setRtiAuditFound(true);
      audioManager.play('chime');
      speechManager.speak('RTI Audit revealed 42 ghost muster entries in Sonpur dam budget!');
    }, 800);
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Social Change and Development Simulation.');
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
      const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Accurate sociological analysis!');
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
        speechManager.speak('Let us inspect the sociological step-by-step reasoning.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length
        ? [...prev]
        : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [activeChallenge]);

  // Clean inactivity timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ISC Class 12 Sociology</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic Mode Badges */}
        <div className="flex items-center gap-3">
          <motion.span 
            key={phase} 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            className="px-3 py-1 bg-gold-950/80 border border-gold-700 text-gold-300 text-xs font-bold rounded-xl uppercase tracking-wider"
          >
            Phase: {phase}
          </motion.span>
          <motion.span 
            key={difficulty} 
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }} 
            className={`px-3 py-1 rounded-xl text-xs font-bold uppercase border tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' :
              difficulty === 'standard' ? 'bg-amber-950/80 text-amber-300 border-amber-700' :
              'bg-rose-950/80 text-rose-300 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/80">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold mb-2">
              <span>📖 Case Scenario Arc</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300 bg-gold-950/80 p-3 rounded-xl border border-gold-900">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>⚡ Discovery Curiosity Hook (Ungraded)</span>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot-on! You recognized Culture Lag.' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Begin Interactive Guided Exploration"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/40 whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-lg font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-400 text-xs md:text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: MULTI-CAUSAL ENGINE (SVG DIAGRAM 1) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Interactive Driver Levers</h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Technological Innovation (UPI, 5G, Roadways)</span>
                        <span className="font-bold text-gold-400">{techLevel}%</span>
                      </div>
                      <input 
                        type="range" min={0} max={100} value={techLevel} 
                        onChange={(e) => handleTechChange(Number(e.target.value))}
                        aria-label="Set Technological Innovation level"
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Educational Expansion (RTE, Higher Literacy)</span>
                        <span className="font-bold text-emerald-400">{eduLevel}%</span>
                      </div>
                      <input 
                        type="range" min={0} max={100} value={eduLevel} 
                        onChange={(e) => handleEduChange(Number(e.target.value))}
                        aria-label="Set Educational Expansion level"
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Economic Transformation (Industrial LPG, Markets)</span>
                        <span className="font-bold text-amber-400">{econLevel}%</span>
                      </div>
                      <input 
                        type="range" min={0} max={100} value={econLevel} 
                        onChange={(e) => handleEconChange(Number(e.target.value))}
                        aria-label="Set Economic Transformation level"
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Political & Legal Rights (73rd Amend, FRA 2006)</span>
                        <span className="font-bold text-purple-400">{lawLevel}%</span>
                      </div>
                      <input 
                        type="range" min={0} max={100} value={lawLevel} 
                        onChange={(e) => handleLawChange(Number(e.target.value))}
                        aria-label="Set Political and Legal Rights level"
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </div>

                  {/* SVG Diagram 1: Sociological Structure Transformation */}
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Social Mobility & Stratification Matrix</h4>
                    <svg viewBox="0 0 320 220" className="w-full max-w-[280px]" aria-label="Social Stratification Matrix SVG">
                      <polygon 
                        points={`160,${30 - (socialMobilityIndex * 0.15)} ${60 + (socialMobilityIndex * 0.4)},190 ${260 - (socialMobilityIndex * 0.4)},190`} 
                        fill="#312e81" 
                        stroke="#6366f1" 
                        strokeWidth="2.5" 
                      />
                      <ellipse 
                        cx="160" 
                        cy="130" 
                        rx={30 + (socialMobilityIndex * 0.45)} 
                        ry={15 + (socialMobilityIndex * 0.2)} 
                        fill="#10b981" 
                        opacity="0.45" 
                      />
                      <text x="160" y="80" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Upper Stratum</text>
                      <text x="160" y="133" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">
                        Middle Class ({socialMobilityIndex}%)
                      </text>
                      <text x="160" y="178" textAnchor="middle" fill="#c7d2fe" fontSize="8">Base Hierarchy</text>
                    </svg>
                    <div className="w-full grid grid-cols-2 gap-2 mt-3 text-center">
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Social Mobility Score</span>
                        <span className="text-base font-black text-emerald-400">{socialMobilityIndex}/100</span>
                      </div>
                      <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-[10px] text-slate-400 block">Modernity Index</span>
                        <span className="text-base font-black text-gold-400">{traditionVsModernityRatio}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: 5 ASPECTS CLICK-PILLARS */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[
                      { id: 'ind' as const, label: '1. Industrialisation', icon: '🏭' },
                      { id: 'urb' as const, label: '2. Urbanisation', icon: '🏙️' },
                      { id: 'mod' as const, label: '3. Modernisation', icon: '💡' },
                      { id: 'glob' as const, label: '4. Globalisation', icon: '🌐' },
                      { id: 'sust' as const, label: '5. Sustainability', icon: '🌱' }
                    ].map(p => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePillarSelect(p.id)}
                        aria-label={`Select ${p.label}`}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedPillar === p.id 
                            ? 'bg-emerald-950 border-emerald-500 text-white shadow-lg' 
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-xl block mb-1">{p.icon}</span>
                        <span className="text-xs font-bold block">{p.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedPillar}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                    >
                      {selectedPillar === 'ind' && (
                        <div>
                          <h4 className="text-sm font-bold text-emerald-400">Industrialisation (Economic Transformation)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Shift from handicraft agrarian economy to factory mass production and wage labour. 
                            Examples: Bhilai Steel Plant (1955), Green Revolution in Punjab & Haryana.
                          </p>
                          <div className="mt-2 text-xs text-gold-300 font-semibold bg-gold-950/60 p-2.5 rounded-lg border border-gold-900">
                            Key ISC Marker: Machine application + Division of labour + Growth of secondary sector.
                          </div>
                        </div>
                      )}
                      {selectedPillar === 'urb' && (
                        <div>
                          <h4 className="text-sm font-bold text-emerald-400">Urbanisation (Demographic Shift)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Rising proportion of national population residing in urban clusters. Census 2011 recorded 31.16% urban (up from 27.81% in 2001). 
                            Distinguished from &apos;Urbanism&apos; (the cultural way of life after Louis Wirth).
                          </p>
                          <div className="mt-2 text-xs text-gold-300 font-semibold bg-gold-950/60 p-2.5 rounded-lg border border-gold-900">
                            Key ISC Marker: Rural-to-urban migration + Informal labour sector + Rise of nuclear households.
                          </div>
                        </div>
                      )}
                      {selectedPillar === 'mod' && (
                        <div>
                          <h4 className="text-sm font-bold text-emerald-400">Modernisation (Value & Cultural Rationalisation)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Adoption of rational, scientific, secular, and merit-based values over superstition and ascription. 
                            M.N. Srinivas captured this in India through twin concepts of Sanskritization and Westernization.
                          </p>
                          <div className="mt-2 text-xs text-gold-300 font-semibold bg-gold-950/60 p-2.5 rounded-lg border border-gold-900">
                            Key ISC Marker: Achievement over birth-status + Decline of rigid joint families.
                          </div>
                        </div>
                      )}
                      {selectedPillar === 'glob' && (
                        <div>
                          <h4 className="text-sm font-bold text-emerald-400">Globalisation (Transnational Integration)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            Interconnectedness of capital, ideas, culture, and labour across sovereign borders. 
                            Anchored in India&apos;s 1991 New Economic Policy (LPG) and the IT corridors of Bengaluru and Hyderabad.
                          </p>
                          <div className="mt-2 text-xs text-gold-300 font-semibold bg-gold-950/60 p-2.5 rounded-lg border border-gold-900">
                            Key ISC Marker: FDI inflow + BPO outsourcing + Exposure to global consumer culture.
                          </div>
                        </div>
                      )}
                      {selectedPillar === 'sust' && (
                        <div>
                          <h4 className="text-sm font-bold text-emerald-400">Sustainable Development (Brundtland 1987)</h4>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            &quot;Development that meets the needs of the present without compromising the ability of future generations to meet their own needs.&quot; 
                            Includes India&apos;s International Solar Alliance, LiFE movement (COP26), and Forest Rights Act 2006.
                          </p>
                          <div className="mt-2 text-xs text-gold-300 font-semibold bg-gold-950/60 p-2.5 rounded-lg border border-gold-900">
                            Key ISC Marker: Intergenerational equity + Social justice + Ecological carrying capacity.
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* SLIDE 2: DIALECTICAL TENSION & SVG DIAGRAM 2 */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/60 rounded-xl border border-gold-800 space-y-3">
                      <div className="text-xs font-bold text-gold-300 uppercase tracking-wider">Predict Before You Interact</div>
                      <p className="text-sm text-white font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction choice ${i + 1}: ${opt}`}
                            className="w-full text-left p-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                      <div className="text-xs text-amber-300 font-semibold">
                        👉 {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Industrial Mineral Extraction</span>
                              <span className="font-bold text-rose-400">{industrialIntensity}%</span>
                            </div>
                            <input
                              type="range" min={0} max={100} value={industrialIntensity}
                              onChange={(e) => setIndustrialIntensity(Number(e.target.value))}
                              aria-label="Set Industrial Intensity"
                              className="w-full accent-rose-500"
                            />
                          </div>

                          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-xs text-slate-300 font-medium">Enforce Green Policy & PESA/FRA 2006</span>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setGreenPolicyActive(!greenPolicyActive)}
                              aria-label="Toggle Green Policy"
                              className={`px-3 py-1 rounded-lg text-xs font-bold ${
                                greenPolicyActive ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                              }`}
                            >
                              {greenPolicyActive ? 'Active ✓' : 'Disabled ✗'}
                            </motion.button>
                          </div>

                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-400">Ecological Forest Health:</span>
                              <span className="font-bold text-emerald-400">{ecologicalHealthIndex}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-emerald-500"
                                animate={{ width: `${ecologicalHealthIndex}%` }}
                              />
                            </div>

                            <div className="flex justify-between text-xs pt-1">
                              <span className="text-slate-400">Tribal Families Displaced:</span>
                              <span className="font-bold text-rose-400">{tribalDisplacementCount} households</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-rose-500"
                                animate={{ width: `${Math.min(100, (tribalDisplacementCount / 6000) * 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* SVG Diagram 2: Ecological Balance vs Industrial Extraction */}
                        <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brundtland Trade-Off Matrix</h4>
                          <svg viewBox="0 0 300 200" className="w-full max-w-[280px]" aria-label="Ecological Sustainability Diagram">
                            <rect x="20" y="20" width="260" height="160" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                            {/* Forest Green Sector */}
                            <motion.circle 
                              cx="100" 
                              cy="90" 
                              r={Math.max(20, ecologicalHealthIndex * 0.45)} 
                              fill="#059669" 
                              opacity="0.6" 
                            />
                            {/* Industrial Extraction Sector */}
                            <motion.circle 
                              cx="200" 
                              cy="90" 
                              r={Math.max(20, industrialIntensity * 0.45)} 
                              fill="#dc2626" 
                              opacity="0.6" 
                            />
                            {/* Intersecting Balance Zone */}
                            <ellipse cx="150" cy="90" rx="30" ry="25" fill="#f59e0b" opacity="0.3" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
                            <text x="100" y="93" textAnchor="middle" fill="#ecfdf5" fontSize="10" fontWeight="bold">Forest Canopy</text>
                            <text x="200" y="93" textAnchor="middle" fill="#fef2f2" fontSize="10" fontWeight="bold">Mining Output</text>
                            <text x="150" y="145" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="bold">Brundtland Equilibrium Zone</text>
                            <text x="150" y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">
                              {greenPolicyActive ? 'PESA/FRA Protection: ENABLED' : 'FRA Safeties: DISABLED'}
                            </text>
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 3: EDUCATION (RTE 2009) & SVG DIAGRAM 3 */}
              {currentSlide === 3 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gold-950/40 rounded-xl border border-gold-900">
                    <div>
                      <h4 className="text-sm font-bold text-white">Right to Education (RTE Act 2009 / Article 21A)</h4>
                      <p className="text-xs text-slate-300 mt-0.5">Free & compulsory schooling (6-14 years) with 25% EWS private quota.</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRteActive(!rteActive)}
                      aria-label="Toggle RTE implementation"
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-md ${
                        rteActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {rteActive ? 'RTE Active in Sonpur ✓' : 'Enable RTE Act in Sonpur 🚀'}
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SVG Diagram 3: RTE Demographic Transition Curve */}
                    <div className="flex flex-col items-center justify-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Demographic Transition Curve</h4>
                      <svg viewBox="0 0 300 160" className="w-full max-w-[280px]" aria-label="Education vs Fertility Demographic Curve">
                        <line x1="40" y1="130" x2="270" y2="130" stroke="#475569" strokeWidth="1.5" />
                        <line x1="40" y1="20" x2="40" y2="130" stroke="#475569" strokeWidth="1.5" />
                        <text x="35" y="30" textAnchor="end" fill="#94a3b8" fontSize="8">High</text>
                        <text x="35" y="125" textAnchor="end" fill="#94a3b8" fontSize="8">Low</text>
                        {/* Fertility Curve */}
                        <path 
                          d={rteActive ? "M 40 40 Q 150 70 260 120" : "M 40 35 Q 150 40 260 45"} 
                          fill="none" 
                          stroke="#f43f5e" 
                          strokeWidth="2.5" 
                        />
                        {/* Female Literacy Curve */}
                        <path 
                          d={rteActive ? "M 40 120 Q 150 70 260 30" : "M 40 115 Q 150 110 260 100"} 
                          fill="none" 
                          stroke="#10b981" 
                          strokeWidth="2.5" 
                        />
                        <text x="210" y="38" fill="#10b981" fontSize="9" fontWeight="bold">Literacy Rate</text>
                        <text x="210" y="115" fill="#f43f5e" fontSize="9" fontWeight="bold">Fertility (TFR)</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block">Female Literacy</span>
                        <span className="text-lg font-black text-emerald-400">{femaleLiteracyMetric}%</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block">Total Fertility Rate</span>
                        <span className="text-lg font-black text-gold-400">{totalFertilityRate} TFR</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block">Child Marriage</span>
                        <span className="text-lg font-black text-amber-400">{rteActive ? '7.2%' : '26.8%'}</span>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-[11px] text-slate-400 block">Caste Mobility</span>
                        <span className="text-lg font-black text-purple-400">{rteActive ? 'High' : 'Restricted'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: MASS MEDIA & RTI SOCIAL AUDIT LAB */}
              {currentSlide === 4 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex gap-2">
                    {[
                      { id: 'print' as const, label: 'Print Media (Newspapers/Journals)', icon: '📰' },
                      { id: 'electronic' as const, label: 'Electronic Media (AIR/Doordarshan)', icon: '📻' },
                      { id: 'digital' as const, label: 'Audiovisual/Digital (OTT/Social/RTI)', icon: '📱' }
                    ].map(m => (
                      <motion.button
                        key={m.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setMediaType(m.id)}
                        aria-label={`Select media format: ${m.label}`}
                        className={`flex-1 p-3 rounded-xl text-left border text-xs font-semibold ${
                          mediaType === m.id 
                            ? 'bg-gold-950 border-gold-500 text-white' 
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="block text-base mb-1">{m.icon}</span>
                        <span>{m.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-300 uppercase">RTI Social Audit Simulation (MKSS Model)</h4>
                      <p className="text-xs text-slate-400 mt-1">File an RTI with Sonpur Block Office to inspect Panchayat dam contractor registers.</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRtiAuditToggle}
                      disabled={rtiAuditFiled}
                      aria-label="Submit RTI Application"
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 text-white text-xs font-bold rounded-xl whitespace-nowrap"
                    >
                      {rtiAuditFiled ? 'RTI Dispatched (30-day statutory limit)' : 'File RTI Application 📄'}
                    </motion.button>
                  </div>

                  {/* SVG Diagram 4: MKSS Social Audit Architecture */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">MKSS RTI Social Audit Architecture</h4>
                    <svg viewBox="0 0 320 70" className="w-full max-w-[300px]" aria-label="MKSS RTI Flow Diagram">
                      <rect x="10" y="15" width="65" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.2" />
                      <text x="42" y="36" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">1. File RTI</text>
                      
                      <line x1="75" y1="32" x2="88" y2="32" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      
                      <rect x="90" y="15" width="65" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.2" />
                      <text x="122" y="36" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">2. Audit Rolls</text>
                      
                      <line x1="155" y1="32" x2="168" y2="32" stroke="#6366f1" strokeWidth="1.5" />
                      
                      <rect x="170" y="15" width="65" height="35" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.2" />
                      <text x="202" y="36" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">3. Jan Sunwai</text>
                      
                      <line x1="235" y1="32" x2="248" y2="32" stroke="#6366f1" strokeWidth="1.5" />
                      
                      <rect x="250" y="15" width="60" height="35" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" />
                      <text x="280" y="36" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="bold">4. Redress</text>
                    </svg>
                  </div>

                  {rtiAuditFound && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-rose-950/70 border border-rose-800 rounded-xl text-xs text-rose-200">
                      ⚠️ <span className="font-bold">Social Audit Finding:</span> Muster roll audit exposed ₹18.4 Lakhs in wage siphon via non-existent ghost laborers. Local Jan Sunwai convened for citizen redress!
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous slide"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next slide"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free sandbox"
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-gold-900/40"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY / SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/80">
            <h3 className="text-base font-bold text-white">Free Sandbox: Sonpur District Development Simulator</h3>
            <p className="text-xs text-slate-300 mt-1">Explore parameter interactions with zero grading pressure before entering the board challenges.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800">
            {/* Control Sliders */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Policy Levers</h4>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Education Level: {eduLevel}%</span>
                <input 
                  type="range" min={0} max={100} value={eduLevel} 
                  onChange={(e) => setEduLevel(Number(e.target.value))}
                  aria-label="Sandbox Education slider"
                  className="w-full accent-emerald-500" 
                />
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Industrial Mining: {industrialIntensity}%</span>
                <input 
                  type="range" min={0} max={100} value={industrialIntensity} 
                  onChange={(e) => setIndustrialIntensity(Number(e.target.value))}
                  aria-label="Sandbox Mining slider"
                  className="w-full accent-rose-500" 
                />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-300">RTI & Transparency:</span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRtiAuditFound(!rtiAuditFound)}
                  aria-label="Toggle Transparency in sandbox"
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    rtiAuditFound ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {rtiAuditFound ? 'High Transparency' : 'Low Transparency'}
                </motion.button>
              </div>
            </div>

            {/* Canvas Demographic Wave Display */}
            <div className="flex flex-col items-center justify-center p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 font-bold uppercase mb-2">Live Demographic Dynamics Wave</span>
              <canvas ref={canvasRef} width={280} height={100} className="w-full rounded-lg" />
              <div className="flex justify-between w-full text-[10px] text-slate-500 mt-2 px-1">
                <span className="text-amber-400">● Traditional Structure</span>
                <span className="text-emerald-400">● Capability Wave</span>
              </div>
            </div>

            {/* Dynamic Results Card */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sonpur Composite Outcomes</h4>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Social Mobility:</span>
                <span className="font-bold text-emerald-400">{socialMobilityIndex}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Forest Conservation:</span>
                <span className="font-bold text-amber-400">{ecologicalHealthIndex}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tribal Stability:</span>
                <span className="font-bold text-gold-400">{100 - Math.min(100, Math.round(tribalDisplacementCount / 60))}%</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Ready to start board challenges"
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-gold-600 hover:from-emerald-500 hover:to-gold-500 text-white rounded-2xl text-sm font-black tracking-wide shadow-xl shadow-emerald-950/60"
          >
            I Am Ready for Challenges! 🎯
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ENGINE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-gold-300 font-semibold border border-slate-700">
                Competency: {activeChallenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash 
                ? 'bg-rose-950/60 border-rose-500' 
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white leading-relaxed mb-4">
              {activeChallenge.question}
            </p>

            {/* MCQ / CLASSIFY / DISTINGUISH */}
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
                    className={`w-full text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-gold-400 mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item ${item.label}`}
                      className="px-3.5 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-bold cursor-grab shadow-sm"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'aspect_1', desc: 'Shift from craft to machine manufacturing' },
                    { id: 'aspect_2', desc: 'Demographic movement of population to cities' },
                    { id: 'aspect_3', desc: 'Adoption of rational, scientific secular values' },
                    { id: 'aspect_4', desc: 'Meeting present needs without harming future' }
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3.5 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[75px]"
                    >
                      <span className="text-[11px] text-slate-400">{target.desc}</span>
                      <span className={`text-xs font-bold mt-2 ${droppedLabels[target.id] ? 'text-emerald-400' : 'text-slate-600'}`}>
                        Target: {droppedLabels[target.id] || '[Drop Label Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify dragged labels"
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
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
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="font-bold text-gold-400">{displayIdx + 1}.</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  aria-label="Submit sorted sequence"
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Sequence →
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter precise number"
                    aria-label="Enter numeric answer"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Check numeric answer"
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">{activeChallenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-bold rounded-lg flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button 
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        aria-label="Remove construct part"
                        className="text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click blocks above to build sociological sequence...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit constructed chain"
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Chain
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gold-950/50 border border-gold-800 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-gold-300 font-bold text-xs uppercase tracking-wider">
                  <span>�� Sociological Concept Walkthrough</span>
                </div>

                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs md:text-sm text-slate-200 leading-relaxed"
                  >
                    <span className="font-bold text-gold-400 mr-1.5">{i + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Show next explanation step"
                    className="px-4 py-2 bg-gold-800 hover:bg-gold-700 text-white text-xs font-bold rounded-xl"
                  >
                    Show Next Insight →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Proceed to next challenge"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950/50"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation 🏁' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-gold-950/80 rounded-3xl border border-emerald-700 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">BKT Mastery Level</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-emerald-200 max-w-xl mx-auto">
              {errors === 0
                ? 'Flawless performance! You have mastered the sociology of social change, development aspects, and democratic accountability frameworks.'
                : errors <= 3
                ? 'Strong analytical command! You effectively connected macro-development policies to grassroots realities.'
                : 'Good effort! Re-explore the misconception profile and simulation labs to solidify your mastery.'}
            </p>
          </div>

          {/* ─── PROMINENT SPACED REPETITION SCHEDULE (SRS VISIBILITY) ─── */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-gold-950/50 rounded-2xl border-2 border-amber-500/70 shadow-lg shadow-amber-950/30"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 Adaptive Memory Engine)
                  </h3>
                </div>
                <p className="text-xs text-slate-300">
                  Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your optimal memory reinforcement window is calculated below.
                </p>
              </div>
              
              <div className="flex items-center gap-3 bg-slate-950/90 px-4 py-2.5 rounded-xl border border-amber-600/60 shadow-inner">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Next Review Date</span>
                  <span className="text-xs text-slate-200 font-semibold">{srsReviewDateText}</span>
                </div>
                <div className="h-8 w-px bg-slate-800 mx-1" />
                <span className={`px-3 py-1 rounded-lg text-xs font-black tracking-wide uppercase ${
                  srsReviewDays >= 7 ? 'bg-emerald-500 text-slate-950' :
                  srsReviewDays >= 3 ? 'bg-amber-400 text-slate-950' :
                  'bg-rose-500 text-white'
                }`}>
                  Review in {srsReviewDays} {srsReviewDays === 1 ? 'Day' : 'Days'}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className={`p-2 rounded-lg border ${errors === 0 ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold' : 'bg-slate-950/40 border-slate-800 text-slate-500'}`}>
                <span>0 Errors: Review in 7 Days</span>
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/80 border-amber-500 text-amber-300 font-bold' : 'bg-slate-950/40 border-slate-800 text-slate-500'}`}>
                <span>1–3 Errors: Review in 3 Days</span>
              </div>
              <div className={`p-2 rounded-lg border ${errors >= 4 ? 'bg-rose-950/80 border-rose-500 text-rose-300 font-bold' : 'bg-slate-950/40 border-slate-800 text-slate-500'}`}>
                <span>4+ Errors: Review in 1 Day</span>
              </div>
            </div>
          </motion.div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Identified Misconception Profile</h3>
              {hitMisconceptions.map((idx, i) => {
                const item = misconceptions[idx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-400 font-bold">❌ {item.misconception}</p>
                    <p className="text-emerald-400 mt-1">✓ {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* STUDENT SOCIOLOGICAL REFLECTION */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-gold-400 uppercase tracking-wider">Student Sociological Reflection</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              How does Amartya Sen&apos;s capability perspective change how you evaluate major infrastructural projects like expressways or smart industrial corridors in your home state?
            </p>
          </div>

          {/* REAL WORLD ACTIVITY */}
          <div className="p-6 bg-gradient-to-r from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-gold-400">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_SociologySocialChangeDevelopmentSim;