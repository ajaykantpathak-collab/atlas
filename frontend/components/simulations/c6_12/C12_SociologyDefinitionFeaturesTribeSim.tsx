'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERAL DECLARATIONS) ───
const NODE_C12_SOC_021 = 'c12_soc_021'; // Definition and Features of Tribe
const NODE_C12_SOC_022 = 'c12_soc_022'; // Dormitories in Tribal India
const NODE_C12_SOC_023 = 'c12_soc_023'; // Present Conditions and Problems of Tribes
const NODE_C12_SOC_024 = 'c12_soc_024'; // Government Policies for Tribal Upliftment
const NODE_C12_SOC_025 = 'c12_soc_025'; // Social Stratification – Definition, Inequality & Features
const NODE_C12_SOC_026 = 'c12_soc_026'; // The Class System
const NODE_C12_SOC_027 = 'c12_soc_027'; // The Caste System
const NODE_C12_SOC_028 = 'c12_soc_028'; // Caste vs Class Comparison and Social Mobility
const NODE_C12_SOC_029 = 'c12_soc_029'; // Gender – Sex vs Gender, Patriarchal Ideology & Women's Status
const NODE_C12_SOC_030 = 'c12_soc_030'; // Gender Issues in Indian Society

const ALL_NODE_IDS = [
  NODE_C12_SOC_021,
  NODE_C12_SOC_022,
  NODE_C12_SOC_023,
  NODE_C12_SOC_024,
  NODE_C12_SOC_025,
  NODE_C12_SOC_026,
  NODE_C12_SOC_027,
  NODE_C12_SOC_028,
  NODE_C12_SOC_029,
  NODE_C12_SOC_030,
];

// ─── PREDICTION QUESTIONS (BRILLIANT.ORG PREDICT-THEN-CHECK PATTERN) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If a tribal community increases interaction with caste-based agrarian markets, what form of social mobility are they most likely to undergo according to M.N. Srinivas?',
    options: [
      'Immediate absorption into the Brahmin varna',
      'Sanskritisation by adopting dwija rituals and claiming Kshatriya or Rajput status',
      'Total loss of all totemic and clan rules within one year',
      'Automatic transition into an urban industrial working class',
    ],
    correctIndex: 1,
    explanation: 'Anthropologists and sociologists note that tribes undergoing acculturation historically adopted customs of dominant local castes through Sanskritisation (e.g., Bhumij or Gond rajahs claiming Rajput ancestry).',
    verifyInstruction: 'Go to Lab 3 (Srinivas Mobility Simulator) and increase the Sanskritisation Lever to verify ritual status change.',
  },
  {
    id: 'pred_2',
    question: 'What happens to the Female Labour Force Participation Rate (LFPR) when daily unpaid domestic care burden increases from 2 hours to 8 hours?',
    options: [
      'Female LFPR increases sharply because more domestic tasks are recognized as economic work',
      'Female LFPR remains unchanged because domestic work is counted in GDP',
      'Female LFPR declines drastically due to time poverty and unequal gender division of labour',
      'Female LFPR fluctuates randomly with no statistical correlation',
    ],
    correctIndex: 2,
    explanation: 'As time spent on unpaid household and care duties rises, women experience severe "time poverty", preventing participation in formal paid employment.',
    verifyInstruction: 'Go to Lab 4 (Gender Pyramid & Household Labor Balance) and move the Unpaid Care Burden slider to observe the drop in LFPR.',
  },
];

// ─── OBSERVATION QUESTIONS (BRILLIANT.ORG 'WHAT DO YOU NOTICE?' PATTERN) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the Clan Totem diagram (Lab 1), what rule governs marriage within the same totemic clan (e.g. Kisku to Kisku)?',
    options: [
      'Allowed only if both partners belong to the same village',
      'Strictly prohibited under the rule of clan exogamy',
      'Mandatory under the rule of tribal endogamy',
      'Allowed only for village headmen (Majhi)',
    ],
    observableOptions: [
      'Strictly prohibited under the rule of clan exogamy',
      'Mandatory under the rule of tribal endogamy',
      'Allowed only if both partners belong to the same village',
    ],
    correctIndex: 0,
    explanation: 'The clan circle visually demonstrates that cross-clan connections are permitted, while intra-clan marriages are strictly prohibited due to totemic siblinghood (clan exogamy).',
  },
  {
    id: 'obs_2',
    question: 'In the Caste vs Class visualizer (Lab 2), what key difference is observable regarding mobility arrows between layers?',
    options: [
      'Caste has open upward arrows while Class has rigid barricades',
      'Class displays upward mobility arrows whereas Caste shows rigid segmental boundaries ascribed at birth',
      'Both systems allow identical fluid movement across all tiers',
      'Neither system allows any form of status change',
    ],
    observableOptions: [
      'Class displays upward mobility arrows whereas Caste shows rigid segmental boundaries ascribed at birth',
      'Caste has open upward arrows while Class has rigid barricades',
      'Both systems allow identical fluid movement across all tiers',
    ],
    correctIndex: 0,
    explanation: 'The Caste model shows rigid ascribed divisions fixed at birth, whereas the Class model features an open gradational ladder with social mobility pathways.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Social Atlas: Mapping Inequality and Identity in India',
  intro: 'You are appointed as an apprentice sociologist at the National Institute of Social Dynamics in New Delhi. Your mission is to analyze how kinship, tribal autonomy, caste hierarchies, class mobility, and patriarchal institutions intersect across diverse communities in India.',
  context: 'From the hill hamlets of Bastar and Nagaland to urban corporate towers in Bengaluru and agrarian villages in Bihar and Haryana, you will analyze structural inequalities and investigate social policies using real empirical datasets.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In Santhal society, a person belongs to the Kisku clan (totem: kingfisher). Whom can this person traditionally marry according to customary tribal rules?',
  options: [
    'Anyone from any caste or community in India',
    'Another Santhal, but strictly from a DIFFERENT clan (e.g. Hansda or Murmu)',
    'Strictly another Santhal from the same Kisku clan to maintain clan purity',
    'Only someone belonging to the non-tribal Brahmin or Kshatriya varna',
  ],
  correctIndex: 1,
  hintAfter: 'Tribes balance tribal endogamy (marrying within the tribe) with clan exogamy (marrying outside one\'s totemic clan). Let us explore why this dual rule exists!',
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

// ─── 22 COMPREHENSIVE CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: c12_soc_021 (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C12_SOC_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the 2011 Census of India, Scheduled Tribes constitute approximately what percentage of India\'s total population?',
    options: ['4.2%', '8.6%', '16.6%', '27.0%'],
    correctIndex: 1,
    explanation: 'Census 2011 records 705 Scheduled Tribes comprising approximately 8.6% of India\'s total population (about 104.3 million people). Scheduled Castes comprise 16.6%.',
    hints: [
      'It is less than 10% of the total population.',
      'Scheduled Castes are 16.6%; Scheduled Tribes are about half that share.',
      'The exact Census 2011 figure is 8.6% (104.3 million people).',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation: c12_soc_022 (Match)
  {
    id: 'ch_02',
    nodeId: NODE_C12_SOC_022,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the tribal youth dormitory named "Ghotul" to its traditional community and region:',
    options: [
      'Ao Nagas of Nagaland',
      'Muria and Maria Gonds of Bastar (Chhattisgarh)',
      'Oraons of Chotanagpur (Jharkhand)',
      'Todas of Nilgiri Hills (Tamil Nadu)',
    ],
    correctIndex: 1,
    explanation: 'The Ghotul is the co-residential youth dormitory of the Muria and Maria Gonds of Bastar in Chhattisgarh, documented extensively by anthropologist Verrier Elwin.',
    hints: [
      'Think of central India, specifically the forested Bastar plateau.',
      'Ao Nagas have the Morung; Oraons have the Dhumkuria.',
      'The Muria and Maria Gonds of Bastar maintain the Ghotul.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation: c12_soc_025 (Distinguish)
  {
    id: 'ch_03',
    nodeId: NODE_C12_SOC_025,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In sociological theory (Andre Beteille), how does "social inequality" fundamentally differ from "social difference"?',
    options: [
      'Difference is permanent while inequality lasts only for one year.',
      'Difference describes neutral variation; inequality ranks variations and allocates rewards unequally.',
      'Inequality is strictly biological while difference is purely economic.',
      'Difference applies only to caste whereas inequality applies only to gender.',
    ],
    correctIndex: 1,
    explanation: 'Social difference is horizontal variation without hierarchical ranking (e.g., speaking Santhali vs Tamil). Social inequality attaches an evaluative ranking that distributes wealth, prestige, and power unequally.',
    hints: [
      'Consider whether a value judgment and hierarchy are attached to the variation.',
      'Speaking different languages is a difference; denying education based on language or birth is inequality.',
      'Difference is neutral variation; inequality adds hierarchical ranking and unequal rewards.',
    ],
    misconceptionIndex: 2,
  },

  // 4. Foundation: c12_soc_027 (Divine Origin - Drag-label)
  {
    id: 'ch_04',
    nodeId: NODE_C12_SOC_027,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each varna to its mythic origin on the cosmic being (Purusha) according to the Purusha Sukta (Rig Veda 10.90):',
    dragItems: [
      { label: 'Brahmin', targetId: 'part_mouth' },
      { label: 'Kshatriya', targetId: 'part_arms' },
      { label: 'Vaishya', targetId: 'part_thighs' },
      { label: 'Shudra', targetId: 'part_feet' },
    ],
    correctMapping: {
      part_mouth: 'Brahmin',
      part_arms: 'Kshatriya',
      part_thighs: 'Vaishya',
      part_feet: 'Shudra',
    },
    explanation: 'According to the Traditional / Divine Origin Theory (Purusha Sukta 10.90): Brahmins emerged from the mouth (speech/priests), Kshatriyas from arms (strength/rulers), Vaishyas from thighs (support/traders), and Shudras from feet (service/labourers).',
    hints: [
      'The mouth relates to speech/chanting, the arms to defense and fighting.',
      'Thighs represent the economic pillars; feet represent manual service.',
      'Mouth = Brahmin, Arms = Kshatriya, Thighs = Vaishya, Feet = Shudra.',
    ],
    misconceptionIndex: 3,
  },

  // 5. Foundation: c12_soc_029 (Recall / Understanding)
  {
    id: 'ch_05',
    nodeId: NODE_C12_SOC_029,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which British sociologist authored "Sex, Gender and Society" (1972), establishing the classic sociological distinction between biological sex and socially constructed gender?',
    options: ['Ann Oakley', 'Sylvia Walby', 'Iravati Karve', 'Leela Dube'],
    correctIndex: 0,
    explanation: 'Ann Oakley (1972) formulated the foundational distinction: sex is biological (chromosomes, anatomy, hormones), whereas gender is socially constructed roles and behaviors learned through socialization.',
    hints: [
      'Look for the British feminist sociologist who wrote the landmark 1972 text.',
      'It is not an Indian kinship theorist like Karve or Dube.',
      'Ann Oakley drew the definitive distinction between biological sex and social gender.',
    ],
    misconceptionIndex: 4,
  },

  // 6. Foundation: c12_soc_030 (Recall)
  {
    id: 'ch_06',
    nodeId: NODE_C12_SOC_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which landmark central legislation in India prohibits pre-natal sex determination to curb female foeticide?',
    options: [
      'Dowry Prohibition Act, 1961',
      'Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994',
      'Protection of Women from Domestic Violence Act, 2005',
      'Commission of Sati (Prevention) Act, 1987',
    ],
    correctIndex: 1,
    explanation: 'The PCPNDT Act, 1994 (enacted 1996, amended 2003) specifically prohibits pre-natal diagnostic testing for sex determination to combat the falling child sex ratio.',
    hints: [
      'The act includes "Diagnostic Techniques" and "Pre-Natal" in its name.',
      'It was passed in 1994 to regulate ultrasound and genetic technologies.',
      'The correct act is the PCPNDT Act, 1994.',
    ],
  },

  // 7. Foundation: c12_soc_024 (Constitutional Safeguards - Classify)
  {
    id: 'ch_07',
    nodeId: NODE_C12_SOC_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Article of the Constitution of India empowers the President to officially specify and notify Scheduled Tribes for each state and union territory?',
    options: ['Article 17', 'Article 244', 'Article 342', 'Article 370'],
    correctIndex: 2,
    explanation: 'Article 342 empowers the President of India to specify the tribes or tribal communities deemed to be Scheduled Tribes in relation to that State or UT. Article 17 abolishes untouchability.',
    hints: [
      'Article 17 is untouchability; Article 338A is the National Commission for STs.',
      'The notification Article for STs is in the 340s.',
      'Article 342 specifically governs the notification of Scheduled Tribes.',
    ],
  },

  // 8. Standard: c12_soc_021 (Dual Marriage Rule - Analysis)
  {
    id: 'ch_08',
    nodeId: NODE_C12_SOC_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A sociologist observes the Santhals of Jharkhand and notes two marriage rules operating simultaneously. What are these two rules and their distinct functional levels?',
    options: [
      'Tribal exogamy (marry outside tribe) and Clan endogamy (marry within clan)',
      'Tribal endogamy (marry within tribe) and Clan exogamy (marry outside clan)',
      'Universal hypergamy (anuloma) and compulsory village endogamy',
      'Polyandry at the clan level and polygyny at the tribal level',
    ],
    correctIndex: 1,
    explanation: 'Tribes practise endogamy at the tribal level (preserving group boundaries and culture) and exogamy at the clan level (preventing inbreeding and forging cross-clan solidarity). Confusing these levels is a frequent exam mistake.',
    hints: [
      'Think about preserving the whole tribe versus preventing close blood-relative marriages within a totemic clan.',
      'You must stay inside the tribe, but step outside your specific totemic lineage/clan.',
      'Tribal endogamy (within tribe) + Clan exogamy (outside clan).',
    ],
    misconceptionIndex: 0,
  },

  // 9. Standard: c12_soc_022 (Dormitory Functions - Construct)
  {
    id: 'ch_09',
    nodeId: NODE_C12_SOC_022,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Select the core social functions performed by the Naga Morung or Muria Ghotul to build their sociological functional profile:',
    availableParts: [
      'Youth Socialisation',
      'Oral Folklore Transmission',
      'Collective Labour & Defence',
      'Commercial Profit Trading',
      'Courtship Regulation',
      'Stock Market Brokering',
    ],
    targetState: 'Youth Socialisation Oral Folklore Transmission Collective Labour & Defence Courtship Regulation',
    validationHint: 'Select the 4 traditional communal functions: socialisation, folklore, collective labour, and courtship regulation (omit modern commercial activities).',
    explanation: 'Tribal dormitories function as indigenous institutions of education (socialisation), cultural preservation (songs, folklore, craft), economic teamwork (jhum cultivation, house building), and regulated courtship under elder guidance.',
    hints: [
      'Dormitories are youth institutions for cultural transmission and collective security.',
      'Exclude modern market trading and stock brokering.',
      'Include: Youth Socialisation, Oral Folklore Transmission, Collective Labour & Defence, and Courtship Regulation.',
    ],
  },

  // 10. Standard: c12_soc_023 (Regionalism vs Separatism - Distinguish)
  {
    id: 'ch_10',
    nodeId: NODE_C12_SOC_023,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze the sociological difference between Tribal Regionalism (e.g., the Jharkhand Movement) and Tribal Separatism (e.g., early Naga insurgency):',
    options: [
      'Regionalism rejects the Indian Constitution; Separatism accepts the Sixth Schedule.',
      'Regionalism seeks autonomy or statehood within the Indian Union; Separatism seeks a sovereign independent nation outside India.',
      'Regionalism occurs only in South India; Separatism occurs exclusively in Central India.',
      'Regionalism is based on religious conversion; Separatism is based entirely on economic class.',
    ],
    correctIndex: 1,
    explanation: 'Tribal regionalism operates within the constitutional framework to demand a separate state or autonomous council (Jharkhand, Bodoland). Separatism rejects the constitutional framework to demand sovereign statehood (historical NSCN Naga movement).',
    hints: [
      'Look at whether the movement operates within the Indian Union or demands total independence.',
      'Jharkhand is a state inside India (regionalism); sovereignty outside India is separatism.',
      'Regionalism = within the Union; Separatism = sovereign exit outside the Union.',
    ],
  },

  // 11. Standard: c12_soc_024 (Tribal Panchsheel - Drag-sort)
  {
    id: 'ch_11',
    nodeId: NODE_C12_SOC_024,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the logical pillars of Jawaharlal Nehru\'s Tribal Panchsheel in sequential order:',
    sortItems: [
      '1. Develop along their own genius (no external imposition)',
      '2. Respect tribal rights in land and forests',
      '3. Train tribal people to build indigenous administration',
      '4. Avoid over-administering with complex outside schemes',
      '5. Judge results by quality of human character, not statistics alone',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Nehru\'s Tribal Panchsheel emphasizes: (1) self-directed development, (2) rights in land and forest, (3) indigenous administration, (4) simple non-intrusive administration, and (5) qualitative human metrics over statistical targets.',
    hints: [
      'The first principle begins with letting tribes develop along the lines of their own genius.',
      'Land rights come second, followed by training their own people for administration.',
      'The fifth and final principle stresses judging results by human character rather than statistics.',
    ],
  },

  // 12. Standard: c12_soc_026 (Class Structure - Numeric)
  {
    id: 'ch_12',
    nodeId: NODE_C12_SOC_026,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sociological surveys (NSSO / ICE 360°) estimate that the Indian middle class constitutes roughly what percentage of the national population?',
    correctAnswer: 33,
    tolerance: 5,
    unit: '%',
    explanation: 'Sociological surveys (ICE 360° and NSSO consumption deciles) estimate India\'s middle class at approximately 30% to 35% (centered at ~33%), with the majority still in the lower-income/informal sector.',
    hints: [
      'The middle class in India is NOT the majority (it is not 50% or 60%).',
      'It is roughly one-third of the total population.',
      'Enter a value between 30 and 35 (e.g., 33).',
    ],
  },

  // 13. Standard: c12_soc_028 (Sanskritisation vs Westernisation - Distinguish)
  {
    id: 'ch_13',
    nodeId: NODE_C12_SOC_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did M.N. Srinivas expand his initial concept of "Brahminisation" into "Sanskritisation"?',
    options: [
      'Because Brahmins ceased to exist in South India after independence.',
      'Because lower castes frequently emulated non-Brahmin dominant castes (Kshatriyas, Vaishyas) who held local power and prestige.',
      'Because the British colonial government outlawed the Sanskrit language.',
      'Because Sanskritisation applies exclusively to Christian convert communities.',
    ],
    correctIndex: 1,
    explanation: 'Srinivas realized "Brahminisation" was too narrow because lower castes in regions across India often emulated locally dominant "dwija" (twice-born) castes such as Kshatriyas (e.g., Yadavs adopting Kshatriya symbols) or Vaishyas rather than Brahmins alone.',
    hints: [
      'Consider whether only Brahmins were emulated in village hierarchies.',
      'Locally dominant landowning castes were often Kshatriyas or Vaishyas.',
      'Sanskritisation encompasses emulation of any dominant twice-born (dwija) caste, not just Brahmins.',
    ],
  },

  // 14. Standard: c12_soc_029 (Matrilineal Counter-example - Application)
  {
    id: 'ch_14',
    nodeId: NODE_C12_SOC_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which Indian community provides a textbook anthropological counter-example to patrilineal patriarchy, where ancestral property is inherited by the youngest daughter (khadduh)?',
    options: [
      'Khasis of Meghalaya',
      'Jats of Haryana',
      'Rajputs of Rajasthan',
      'Patidars of Gujarat',
    ],
    correctIndex: 0,
    explanation: 'The Khasis of Meghalaya (and historically the Nairs of Kerala) follow matrilineal descent and matrilocal/uxorilocal residence, where the youngest daughter (khadduh) inherits ancestral property, proving patriarchy is socially constructed, not biological.',
    hints: [
      'Look for a hill tribe of the North-East in Meghalaya.',
      'Jats and Rajputs are classic patrilineal, patrilocal communities.',
      'The Khasis of Meghalaya follow matrilineal inheritance.',
    ],
  },

  // 15. Standard: c12_soc_030 (Gender Data - Numeric)
  {
    id: 'ch_15',
    nodeId: NODE_C12_SOC_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'What was the National Child Sex Ratio (girls per 1,000 boys aged 0–6 years) recorded in the 2011 Census of India?',
    correctAnswer: 914,
    tolerance: 5,
    unit: 'girls / 1000 boys',
    explanation: 'Census 2011 recorded a national child sex ratio of 914 (or 919 in preliminary tables) girls per 1,000 boys (0–6 age group), the lowest recorded since Indian independence.',
    hints: [
      'It is in the low 910s.',
      'In states like Haryana, it dropped below 835; nationally it was around 914-919.',
      'Enter 914 (or within tolerance 914-919).',
    ],
  },

  // 16. Advanced: c12_soc_021 (Ghurye vs Beteille Debate - Evaluation)
  {
    id: 'ch_16',
    nodeId: NODE_C12_SOC_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the academic debate between G.S. Ghurye and Andre Beteille regarding the sociological status of Indian tribes:',
    options: [
      'Ghurye viewed tribes as completely alien foreigners, while Beteille treated them as original Vedic Aryans.',
      'Ghurye characterized tribes as "backward Hindus" on a continuum of assimilation; Beteille emphasized tribes as distinct self-contained societies that cannot be reduced to caste.',
      'Ghurye argued tribes should all be relocated to urban cities, whereas Beteille argued they should be placed in biological sanctuaries.',
      'Both sociologists agreed that tribes never had their own languages or religious systems.',
    ],
    correctIndex: 1,
    explanation: 'G.S. Ghurye argued that tribes were "backward Hindus" who underwent incomplete absorption into Hindu society. Andre Beteille insisted that tribes historically constituted distinct, autonomous social systems with unique kinship, language, and political structures.',
    hints: [
      'Ghurye coined the famous phrase "backward Hindus".',
      'Beteille defended the distinct institutional identity of tribes against reductionist assimilation.',
      'Ghurye = "backward Hindus" / assimilation continuum; Beteille = distinct autonomous societies.',
    ],
  },

  // 17. Advanced: c12_soc_023 (Niyamgiri Case Study - Application & Analysis)
  {
    id: 'ch_17',
    nodeId: NODE_C12_SOC_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In 2013, the Supreme Court of India directed the Odisha government to consult local tribal Gram Sabhas regarding bauxite mining in the Niyamgiri hills. Which Particularly Vulnerable Tribal Group (PVTG) successfully asserted their sacred-ecological rights under the Forest Rights Act?',
    options: [
      'Dongria Kondh',
      'Toda of Nilgiris',
      'Ao Naga',
      'Jarawas of Andamans',
    ],
    correctIndex: 0,
    explanation: 'The Dongria Kondh of Niyamgiri (Rayagada/Kalahandi, Odisha) revered the hill as Niyam Raja and unanimously voted in 12 Gram Sabhas against bauxite mining, establishing a landmark precedent for the Forest Rights Act (2006) and PESA (1996).',
    hints: [
      'This community is situated in the bauxite-rich hills of southwestern Odisha.',
      'They worship Niyam Raja as their ancestral deity.',
      'The Dongria Kondh.',
    ],
  },

  // 18. Advanced: c12_soc_024 (Commissions & Reservation - Analysis)
  {
    id: 'ch_18',
    nodeId: NODE_C12_SOC_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A common student misconception confuses the Mandal Commission (1979) with Scheduled Tribe protections. What was the exact constitutional target of the Mandal Commission?',
    options: [
      'It created the Scheduled Tribes category under Article 342.',
      'It investigated the conditions of Socially and Educationally Backward Classes (OBCs) and recommended 27% reservation for them, whereas STs already had separate constitutional reservations.',
      'It abolished the Sixth Schedule in North-Eastern states.',
      'It transferred all forest land to private mining corporations.',
    ],
    correctIndex: 1,
    explanation: 'The Mandal Commission (Second Backward Classes Commission, 1979–80) identified Other Backward Classes (OBCs) using 11 social, educational, and economic indicators. Scheduled Castes and Scheduled Tribes already held distinct constitutional reservations under Articles 15(4), 16(4), and 342.',
    hints: [
      'STs and SCs already had reservations since 1950.',
      'Mandal was the Second Backward Classes Commission targeting OBCs.',
      'Mandal recommended 27% quota for OBCs (Socially and Educationally Backward Classes).',
    ],
    misconceptionIndex: 5,
  },

  // 19. Advanced: c12_soc_027 (Caste vs Class Matrix - Drag-sort)
  {
    id: 'ch_19',
    nodeId: NODE_C12_SOC_027,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the four classical Varnas from top to bottom according to the traditional ritual purity hierarchy:',
    sortItems: [
      '1. Brahmin (Purity, Ritual, Knowledge)',
      '2. Kshatriya (Valour, Protection, Governance)',
      '3. Vaishya (Agriculture, Commerce, Trade)',
      '4. Shudra (Service, Manual Labour)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The four-fold varna hierarchy ranks: Brahmin at the apex (purity/learning), followed by Kshatriya (power/protection), Vaishya (wealth/commerce), and Shudra (service). Beneath this classical schema lay untouchable / exterior castes (ati-Shudras).',
    hints: [
      'Priests and scholars occupy the topmost ritual rank.',
      'Warriors and rulers are second; traders and farmers are third.',
      'Order: Brahmin → Kshatriya → Vaishya → Shudra.',
    ],
  },

  // 20. Advanced: c12_soc_028 (Andre Beteille Sripuram Study - Evaluation)
  {
    id: 'ch_20',
    nodeId: NODE_C12_SOC_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In his landmark monograph "Caste, Class and Power" (1965) based on Sripuram village in Tamil Nadu, what key transformation did Andre Beteille discover?',
    options: [
      'Caste, class, and political power have merged into a single identical hierarchy.',
      'Caste, class, and power have become differentiated and relatively autonomous, so that ritual status no longer perfectly determines economic or political standing.',
      'All villagers completely abandoned their caste names and established an egalitarian commune.',
      'Class has disappeared and caste is now the only factor in economic transactions.',
    ],
    correctIndex: 1,
    explanation: 'Beteille demonstrated that whereas in traditional Sripuram Brahmins held high caste, landownership (class), and political dominance simultaneously, modern forces (land tenancy acts, adult franchise, education) caused caste, class, and power to diverge as separate axes of stratification.',
    hints: [
      'Think of how landownership and political elections severed the monopoly of high castes.',
      'Can a lower-caste person now hold land or political office in a democracy?',
      'Beteille showed that caste, class, and power have decoupled and operate as distinct dimensions.',
    ],
  },

  // 21. Advanced: c12_soc_029 (Property Rights Gap - Analysis)
  {
    id: 'ch_21',
    nodeId: NODE_C12_SOC_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Despite the landmark Hindu Succession (Amendment) Act 2005 granting daughters equal coparcenary rights in ancestral property, the Agriculture Census reveals that women constitute only what percentage of operational landholders in India?',
    options: ['About 14% to 16%', 'Exactly 50%', 'Over 75%', 'Less than 1%'],
    correctIndex: 0,
    explanation: 'The Agriculture Census (2015-16) records that women operate only about 14% of agricultural landholdings in India. Deep-rooted patriarchal customs (patrilocal residence, pressure to "relinquish" rights to brothers) prevent formal legal rights from becoming social realities.',
    hints: [
      'It is far below 50% despite equal legal rights since 2005.',
      'It falls in the low teens (between 12% and 18%).',
      'Women operate roughly 14% to 16% of agricultural landholdings in India.',
    ],
  },

  // 22. Advanced: c12_soc_030 (Systemic Patriarchy - Evaluation)
  {
    id: 'ch_22',
    nodeId: NODE_C12_SOC_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How do feminist sociologists (such as Leela Dube and Veena Das) explain the phenomenon of "women as perpetrators of violence" (e.g., mothers-in-law participating in dowry harassment)?',
    options: [
      'It proves that women are biologically more violent than men.',
      'It proves that patriarchy is an institutionalized system where women internalize patriarchal norms and enforce them to protect their own precarious security within the household.',
      'It shows that dowry has nothing to do with patriarchal kinship structures.',
      'It proves that legislation has eliminated all domestic conflict in India.',
    ],
    correctIndex: 1,
    explanation: 'Feminist sociology demonstrates that patriarchy is an overarching structural system, not a simple biological conflict of men vs women. Women within a patrilocal household may internalize and reproduce patriarchal oppression (bargaining with patriarchy) to safeguard their own survival and status.',
    hints: [
      'Think of patriarchy as a social system that conditions all members of society.',
      'A mother-in-law acts within a patrilocal structure where her authority depends on conforming to patriarchal family rules.',
      'Patriarchy is a systemic structure; women internalize and enforce norms to negotiate security within the hierarchy.',
    ],
    misconceptionIndex: 6,
  },
];

// ─── DEFAULT PROPS WITH ENRICHMENT DATA ───
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
  nodeId: NODE_C12_SOC_021,
  title: 'Social Stratification, Tribes, Caste, Class & Gender in India',
  definition: 'An integrated sociological investigation into social stratification systems in India — covering tribal social organization and dormitories, government policies and problems, caste and class systems, social mobility (Sanskritisation/Westernisation), and gender dynamics and issues.',
  eli5: 'Society is like a multi-layered structure with different rooms and rules. Some groups are organized by kinship and forest heritage (tribes), some by birth and ritual ranking (caste), some by money and education (class), and some by gender roles. Sociologists study how these layers work and how we can make society fairer.',
  misconceptions: [
    {
      misconception: 'Tribes practise indiscriminate exogamy without rules.',
      correction: 'Tribes strictly combine tribal endogamy (marrying within the tribe) with clan exogamy (marrying outside one\'s totemic clan).',
    },
    {
      misconception: 'Tribal dormitories are just modern student hostels.',
      correction: 'Dormitories (Morung, Ghotul) are indigenous socio-educational institutions for cultural socialisation, folklore, defence, and ritual courtship.',
    },
    {
      misconception: 'Social difference and social inequality are the same thing.',
      correction: 'Difference is horizontal neutral diversity; inequality is hierarchical ranking with unequal distribution of power and resources.',
    },
    {
      misconception: 'The Divine Origin theory of caste was just a harmless story.',
      correction: 'The Purusha Sukta (Rig Veda 10.90) functioned as the legitimating ideology that justified hereditary caste hierarchy as cosmic and unchangeable.',
    },
    {
      misconception: 'Sex and gender are identical biological terms.',
      correction: 'Sex refers to biological and physiological attributes; gender refers to socially constructed roles, behaviours, and expectations.',
    },
    {
      misconception: 'The Mandal Commission was set up to establish Scheduled Tribe reservations.',
      correction: 'The Mandal Commission (1979) was the Second Backward Classes Commission for OBCs; STs already had separate constitutional quotas under Article 342.',
    },
    {
      misconception: 'Gender-based domestic violence is committed exclusively by men against women.',
      correction: 'Patriarchy is an institutionalized system where women (e.g. mothers-in-law) may also internalize and perpetrate violence to maintain status within patrilocal structures.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What percentage of India\'s population is composed of Scheduled Tribes (Census 2011)?',
      options: ['16.6%', '8.6%', '27.0%', '4.5%'],
      correctIndex: 1,
    },
    {
      question: 'Which tribal dormitory belongs to the Muria Gonds of Bastar?',
      options: ['Morung', 'Ghotul', 'Dhumkuria', 'Jodik'],
      correctIndex: 1,
    },
    {
      question: 'Who coined the sociological concept of "Sanskritisation"?',
      options: ['G.S. Ghurye', 'M.N. Srinivas', 'Andre Beteille', 'Karl Marx'],
      correctIndex: 1,
    },
    {
      question: 'Which constitutional Article abolishes untouchability in India?',
      options: ['Article 14', 'Article 17', 'Article 342', 'Article 244'],
      correctIndex: 1,
    },
    {
      question: 'Who authored the foundational text "Sex, Gender and Society" (1972)?',
      options: ['Ann Oakley', 'Simone de Beauvoir', 'Iravati Karve', 'Leela Dube'],
      correctIndex: 0,
    },
    {
      question: 'Which community is well-known for matrilineal inheritance in Meghalaya?',
      options: ['Santhals', 'Khasis', 'Todas', 'Nagasa'],
      correctIndex: 1,
    },
    {
      question: 'The five developmental principles for Indian tribes formulated by Nehru are known as:',
      options: ['Tribal Panchsheel', 'Tribal Sub-Plan', 'Mandal Framework', 'PESA Guidelines'],
      correctIndex: 0,
    },
    {
      question: 'Which study by Andre Beteille demonstrated the decoupling of caste, class, and power in Tamil Nadu?',
      options: ['The Remembered Village', 'Caste, Class and Power (Sripuram)', 'Homo Hierarchicus', 'Society in India'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student demonstrates deep analytical mastery across all 10 ISC Class 12 sociology nodes covering tribes, stratification, caste, class, and gender.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Tribal Kinship & Totemic Structure',
    instruction: 'Click on different clans in the tribal circle to inspect their totemic ancestors, descent rules, and marriage permissions.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_SOC_021,
  },
  {
    title: 'Lab 2: The Social Stratification Matrix (Caste vs Class)',
    instruction: 'Toggle between "Caste" (Closed, Ascribed) and "Class" (Open, Achieved) and observe how social mobility operates.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_SOC_025,
  },
  {
    title: 'Lab 3: Srinivas Mobility Simulator (Sanskritisation & Westernisation)',
    instruction: 'Adjust the levers of Education, Sanskrit Emulation, and Urban Migration to see changes in ritual and secular status.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_SOC_028,
  },
  {
    title: 'Lab 4: The Gender Pyramid & Household Labor Balance',
    instruction: 'Manipulate the Unpaid Care Burden slider and observe how it impacts female workforce participation and property ownership.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_SOC_029,
  },
  {
    title: 'Lab 5: Constitutional & Policy Impact Analyzer',
    instruction: 'Click on key policies (Article 342, PESA, 73rd Amendment, FRA 2006) to reveal real socio-legal impacts.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_SOC_024,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Sociologist Task: The Micro-Census Project',
  description: 'Conduct a brief sociological observation of three distinct institutional spaces in your city or district (a workplace, a traditional market/haat, and a local body or council).',
  steps: [
    '1. Identify how occupational roles are distributed: Are certain jobs concentrated among specific gender or community groups?',
    '2. Note whether social interactions (eating lunch together, greetings) are based on achieved class or ascribed caste status.',
    '3. Check if women hold decision-making authority or property leadership in the observed setting.',
    '4. Write a 300-word field memorandum linking your empirical notes to G.S. Ghurye, M.N. Srinivas, and Andre Beteille.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_SociologyDefinitionFeaturesTribeSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C12_SOC_021,
    title = DEFAULT_PROPS.title || 'Sociology: Stratification, Tribes, Caste, Class & Gender',
    misconceptions = DEFAULT_PROPS.misconceptions || [],
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['sociology'] || {
    name: 'Sociology',
    emoji: '🏛️',
    color: 'emerald',
  };

  // Phase Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org style interaction states
  const [selectedClan, setSelectedClan] = useState<string>('Kisku');
  const [stratificationModel, setStratificationModel] = useState<'caste' | 'class'>('caste');
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('art342');

  // Interactive Sliders / Controls
  const [urbanizationLevel, setUrbanizationLevel] = useState(25); // 0-100%
  const [sanskritizationEffort, setSanskritizationEffort] = useState(30); // 0-100%
  const [unpaidCareHours, setUnpaidCareHours] = useState(7); // hours/day
  const [legalEnforcementRate, setLegalEnforcementRate] = useState(40); // 0-100%
  const [techAccessRate, setTechAccessRate] = useState(50); // 0-100%

  // Scoring, Adaptation & Adaptive BKT
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Challenge input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states (MANDATORY WRONG SHAKE + RED FLASH)
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Feedback components
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY VIA BKT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentM = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentM);
    const newDiff = currentM === 'not-started' || currentM === 'beginner' ? 'foundation'
      : currentM === 'developing' ? 'standard' : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS DEMOGRAPHIC & STRATIFICATION VISUALIZER ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Draw background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Gridlines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 20; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Dynamic Demographic Stratification Curves
      const femaleWorkforceRate = Math.max(10, 60 - unpaidCareHours * 4.5 + (urbanizationLevel * 0.25));
      const occupationalMobility = Math.min(95, urbanizationLevel * 0.7 + sanskritizationEffort * 0.3);
      const childSexRatioSim = Math.max(780, 950 - (techAccessRate * 1.5) + (legalEnforcementRate * 1.2));

      // Draw Multi-Representation Stratification Bars
      const bars = [
        { label: 'Female LFPR %', val: femaleWorkforceRate, color: '#ec4899', max: 100 },
        { label: 'Social Mobility Index', val: occupationalMobility, color: '#3b82f6', max: 100 },
        { label: 'Child Sex Ratio (per 1k)', val: (childSexRatioSim / 1000) * 100, color: '#10b981', max: 100 },
        { label: 'Tribal Land Security %', val: Math.min(90, legalEnforcementRate * 0.9), color: '#f59e0b', max: 100 },
      ];

      bars.forEach((b, i) => {
        const yPos = 24 + i * 26;
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(b.label, 12, yPos + 10);

        // Track bar
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(160, yPos, width - 210, 12);

        // Animated Value Bar
        const barW = ((width - 210) * (b.val / b.max));
        const pulse = Math.sin((tick + i * 15) * 0.05) * 2;
        ctx.fillStyle = b.color;
        ctx.fillRect(160, yPos, Math.max(0, barW + pulse), 12);

        // Numeric text
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 10px monospace';
        const displayVal = b.label.includes('Ratio') ? Math.round(childSexRatioSim) : `${Math.round(b.val)}%`;
        ctx.fillText(String(displayVal), width - 42, yPos + 10);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [urbanizationLevel, sanskritizationEffort, unpaidCareHours, legalEnforcementRate, techAccessRate]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete sociological explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent! You understood the dual rule of tribal endogamy and clan exogamy.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration labs. Touch and manipulate the variables.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in the free sandbox. Test social structures freely with zero grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive challenge session. Apply your knowledge!');
  }, []);

  const handleClanSelect = useCallback((clanName: string) => {
    setSelectedClan(clanName);
    audioManager.play('tap');
  }, []);

  const handlePolicyClick = useCallback((polId: string) => {
    setSelectedPolicyId(polId);
    audioManager.play('pop');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      let base = prev;
      if (base.length === 0 && challenge.sortItems) {
        base = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...base];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive sociology simulation.');
  }, [errors, onComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well reasoned.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, 'proficient');
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);

      // MANDATORY VISUAL FEEDBACK: SHAKE & FLASH RED
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
        speechManager.speak('Hints exhausted. Let us review the correct sociological concept.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, hitMisconceptions, showNextHint]);

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

  // Clean inactivity timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none">
      {/* ─── HEADER BAR WITH MOTION COMPONENTS ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.15 }}
            className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl text-2xl shadow-inner"
            aria-label="Sociology Subject Emoji"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                ISC Class 12 • {subjectConfig.name}
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-mono">
                10 Core Nodes
              </span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="tablist">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Navigate to ${p === 'discovery' ? 'Hook' : p === 'explore' ? 'Labs' : p === 'sandbox' ? 'Sandbox' : 'Challenges'} phase`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p === 'discovery' ? 'Hook' : p === 'explore' ? 'Labs' : p === 'sandbox' ? 'Sandbox' : 'Challenges'}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY NARRATIVE HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl pointer-events-none">⚖️</div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Narrative Scenario</span>
            <h2 className="text-xl font-bold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 text-sm">💡</span>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curiosity Check (Ungraded)</span>
            </div>
            <p className="text-base font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all border flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div>
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </div>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-rose-500 font-bold ml-2">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-4 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <p className={`text-xs sm:text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Santhals practise tribal endogamy alongside clan exogamy.'
                    : `⚠️ ✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE LABS WITH 3+ TOPIC SVGS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Step Controller */}
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
            </span>
            <div className="flex gap-2">
              <motion.button
                aria-label="Previous Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentSlide === 0}
                onClick={() => {
                  setCurrentSlide((s) => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                className="px-3 py-1 bg-slate-800 text-xs font-bold rounded-lg text-slate-300 disabled:opacity-30"
              >
                ← Prev
              </motion.button>
              <motion.button
                aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab' : 'Enter Sandbox'}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide((s) => s + 1);
                    audioManager.play('tap');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-3 py-1 bg-emerald-600 text-xs font-bold rounded-lg text-white"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-amber-300 font-medium px-1">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* Interactive Visualizations by Slide */}
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 shadow-inner min-h-[380px]">
            {/* SVG 1: Tribal Kinship & Clan Totems (Lab 1) */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <svg viewBox="0 0 380 320" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2" aria-label="Tribal Totem and Clan Kinship Diagram">
                  <circle cx="190" cy="160" r="120" fill="none" stroke="#334155" strokeDasharray="4 4" />
                  <circle cx="190" cy="160" r="45" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="190" y="156" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">
                    SANTHAL TRIBE
                  </text>
                  <text x="190" y="170" textAnchor="middle" fill="#6ee7b7" fontSize="8">
                    (Endogamous Unit)
                  </text>

                  {/* 4 Totemic Clans */}
                  {[
                    { id: 'Kisku', label: 'Kisku (Kingfisher)', angle: 0, color: '#38bdf8' },
                    { id: 'Hansda', label: 'Hansda (Goose)', angle: 90, color: '#fbbf24' },
                    { id: 'Murmu', label: 'Murmu (Nilgai)', angle: 180, color: '#a855f7' },
                    { id: 'Hembrom', label: 'Hembrom (Betel)', angle: 270, color: '#f43f5e' },
                  ].map((c) => {
                    const rad = (c.angle * Math.PI) / 180;
                    const cx = 190 + 120 * Math.cos(rad);
                    const cy = 160 + 120 * Math.sin(rad);
                    const isSelected = selectedClan === c.id;

                    return (
                      <g
                        key={c.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select Clan ${c.label}`}
                        onClick={() => handleClanSelect(c.id)}
                        className="cursor-pointer"
                      >
                        <line x1="190" y1="160" x2={cx} y2={cy} stroke="#475569" strokeWidth="1.5" />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? 32 : 26}
                          fill={isSelected ? c.color : '#1e293b'}
                          stroke={c.color}
                          strokeWidth="2"
                          className="transition-all"
                        />
                        <text
                          x={cx}
                          y={cy + 3}
                          textAnchor="middle"
                          fill={isSelected ? '#0f172a' : '#f8fafc'}
                          fontSize="9"
                          fontWeight="bold"
                        >
                          {c.id}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Selected Totemic Clan</span>
                    <h4 className="text-base font-bold text-emerald-400 mt-1">Clan: {selectedClan}</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Totem: {selectedClan === 'Kisku' ? 'Kingfisher (Bird of reverence)' : selectedClan === 'Hansda' ? 'Wild Goose (Sacred ancestor)' : selectedClan === 'Murmu' ? 'Nilgai (Sacred antelope)' : 'Betel Palm (Botanical totem)'}
                    </p>
                    <div className="mt-3 p-3 bg-slate-900 rounded-xl text-xs space-y-1.5 border border-slate-800">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Within-Clan Marriage (Exogamy Rule):</span>
                        <span className="text-rose-400 font-bold flex items-center gap-1">✗ STRICTLY PROHIBITED</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Cross-Clan Marriage (Inside Santhal Tribe):</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">✓ PERMITTED</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Adjudicating Authority:</span>
                        <span className="text-amber-400 font-bold">Majhi Pargana (Village Elders)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/40 text-xs text-emerald-300 leading-relaxed">
                    💡 <strong>Functionalist Note:</strong> Totemism is religious kinship. Clan members consider themselves siblings of a common sacred ancestor, ensuring structural cohesion across the entire tribe.
                  </div>
                </div>
              </div>
            )}

            {/* SVG 2: Caste vs Class Hierarchy & Stratification Pyramid (Lab 2) */}
            {currentSlide === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    aria-label="View Classical Caste Model"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setStratificationModel('caste');
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      stratificationModel === 'caste' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Classical Caste Model (Ascribed & Closed)
                  </motion.button>
                  <motion.button
                    aria-label="View Modern Class Model"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setStratificationModel('class');
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      stratificationModel === 'class' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Modern Class Model (Achieved & Open)
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <svg viewBox="0 0 360 220" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2" aria-label="Stratification Structure Diagram">
                    {stratificationModel === 'caste' ? (
                      <g>
                        <polygon points="180,20 280,70 80,70" fill="#f59e0b" opacity="0.85" />
                        <text x="180" y="52" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Brahmin (Ritual/Purity)</text>

                        <polygon points="80,75 280,75 305,115 55,115" fill="#f97316" opacity="0.85" />
                        <text x="180" y="98" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Kshatriya (Ruler/Warrior)</text>

                        <polygon points="55,120 305,120 330,160 30,160" fill="#06b6d4" opacity="0.85" />
                        <text x="180" y="143" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Vaishya (Merchant/Trader)</text>

                        <polygon points="30,165 330,165 350,205 10,205" fill="#64748b" opacity="0.85" />
                        <text x="180" y="188" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Shudra (Service/Labour)</text>

                        <text x="180" y="218" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">🔒 RIGID SEGMENTAL BOUNDARIES (Ascribed at Birth)</text>
                      </g>
                    ) : (
                      <g>
                        <rect x="50" y="25" width="260" height="40" rx="8" fill="#3b82f6" opacity="0.85" />
                        <text x="180" y="48" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Upper Class (Wealth & Capital)</text>

                        <rect x="50" y="75" width="260" height="50" rx="8" fill="#10b981" opacity="0.85" />
                        <text x="180" y="103" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">Middle Class (~33% - Skills & Degrees)</text>

                        <rect x="50" y="135" width="260" height="50" rx="8" fill="#8b5cf6" opacity="0.85" />
                        <text x="180" y="163" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Working / Informal Class</text>

                        <line x1="330" y1="170" x2="330" y2="40" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x="345" y="110" transform="rotate(90 345 110)" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">Social Mobility ⬆</text>
                      </g>
                    )}
                  </svg>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Basis of Status</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {stratificationModel === 'caste' ? 'Birth & Ritual Purity (Ascribed)' : 'Income, Wealth & Education (Achieved)'}
                      </p>
                      <p className="text-slate-400 mt-1">
                        {stratificationModel === 'caste'
                          ? 'Position is fixed at birth and justified by the cosmological doctrine of karma/dharma.'
                          : 'Position is earned through market contracts, professional qualifications, and capital.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Social Mobility Mechanism</span>
                      <p className="text-sm font-bold text-white mt-1">
                        {stratificationModel === 'caste' ? 'Segmental & Closed (Collective Sanskritisation)' : 'Gradational & Open (Individual Mobility)'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  📖 <strong>Beteille's Sripuram Insight:</strong> In modern India, caste and class intersect — a Dalit engineer may rise to the upper-middle class while retaining Scheduled Caste administrative standing.
                </div>
              </div>
            )}

            {/* Step 2: Sanskritisation vs Westernisation Simulator */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-amber-400">Sanskritisation Lever (Ritual Emulation)</span>
                      <span className="text-xs font-mono font-bold text-amber-300">{sanskritizationEffort}%</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Sanskritisation Effort Slider"
                      min={0}
                      max={100}
                      value={sanskritizationEffort}
                      onChange={(e) => {
                        setSanskritizationEffort(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400">
                      Adopting vegetarianism, wearing sacred thread (janeu), and emulating dominant dwija castes (Yadavs claiming Kshatriya lineage).
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gold-400">Westernisation Lever (Secular Rationalism)</span>
                      <span className="text-xs font-mono font-bold text-gold-300">{urbanizationLevel}%</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Westernisation and Urbanization Slider"
                      min={0}
                      max={100}
                      value={urbanizationLevel}
                      onChange={(e) => {
                        setUrbanizationLevel(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-400">
                      English education, IT sector jobs in Bengaluru, secular legal rights, and democratic civic mobilization.
                    </p>
                  </div>
                </div>

                {/* Real-time canvas representation */}
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
                    Live Demographic Metrics Output
                  </span>
                  <canvas ref={canvasRef} width={500} height={140} className="w-full rounded-xl" />
                </div>
              </div>
            )}

            {/* SVG 3: Gender & Matrilineal vs Patrilineal Kinship Structure (Lab 4) */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <svg viewBox="0 0 360 210" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2" aria-label="Khasi Matrilineal vs North Indian Patrilineal Kinship Diagram">
                    <rect x="15" y="15" width="155" height="180" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                    <text x="92" y="38" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">KHASI MATRILINEAL</text>
                    <circle cx="92" cy="70" r="18" fill="#ec4899" />
                    <text x="92" y="74" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Mother</text>
                    <line x1="92" y1="88" x2="92" y2="120" stroke="#ec4899" strokeWidth="2" />
                    <circle cx="92" cy="138" r="18" fill="#f43f5e" />
                    <text x="92" y="139" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Youngest</text>
                    <text x="92" y="149" textAnchor="middle" fill="#fff" fontSize="7">Daughter (Khadduh)</text>
                    <text x="92" y="180" textAnchor="middle" fill="#67e8f9" fontSize="8">✓ Inherits Ancestral Land</text>

                    <rect x="190" y="15" width="155" height="180" rx="12" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                    <text x="267" y="38" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">PATRILINEAL (Standard)</text>
                    <circle cx="267" cy="70" r="18" fill="#3b82f6" />
                    <text x="267" y="74" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Father</text>
                    <line x1="267" y1="88" x2="267" y2="120" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="267" cy="138" r="18" fill="#0ea5e9" />
                    <text x="267" y="142" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Eldest Son</text>
                    <text x="267" y="180" textAnchor="middle" fill="#fca5a5" fontSize="8">✗ Patrilocal Displacement</text>
                  </svg>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-rose-400">Daily Unpaid Domestic Care Work (Hours/Day)</span>
                      <span className="text-xs font-mono font-bold text-rose-300">{unpaidCareHours} hrs/day</span>
                    </div>
                    <input
                      type="range"
                      aria-label="Daily Unpaid Domestic Care Work Slider"
                      min={1}
                      max={12}
                      value={unpaidCareHours}
                      onChange={(e) => {
                        setUnpaidCareHours(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-rose-500 cursor-pointer"
                    />
                    <div className="grid grid-cols-2 gap-2 text-center text-xs mt-2">
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Est. Female LFPR</span>
                        <span className="text-sm font-bold text-rose-400">
                          {Math.max(12, Math.round(65 - unpaidCareHours * 4.5))}%
                        </span>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg">
                        <span className="text-[10px] text-slate-400 block">Agr. Land Ownership</span>
                        <span className="text-sm font-bold text-amber-400">14.0%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
                  <h4 className="font-bold text-rose-300">Ann Oakley’s "Sex vs Gender" Lens:</h4>
                  <p className="text-slate-300">
                    Biological reproduction is sex; assigning 100% of unpaid cooking, cleaning, and elder care exclusively to women is a socially constructed gender role that restricts women\'s economic autonomy.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Constitutional Policy Explorer */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'art342', label: 'Article 342 & 17', tag: 'Constitutional' },
                    { id: 'pesa', label: 'PESA Act 1996', tag: 'Self-Rule' },
                    { id: 'fra', label: 'FRA 2006', tag: 'Forest Rights' },
                    { id: 'wom2023', label: '106th Amend. 2023', tag: '33% Women Quota' },
                  ].map((pol) => (
                    <motion.button
                      key={pol.id}
                      aria-label={`Inspect policy: ${pol.label}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handlePolicyClick(pol.id)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all ${
                        selectedPolicyId === pol.id
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider block text-slate-500 font-bold">{pol.tag}</span>
                      <span className="font-bold text-slate-200 mt-1 block">{pol.label}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
                  {selectedPolicyId === 'art342' && (
                    <>
                      <h4 className="font-bold text-emerald-400 text-sm">Article 342 & Article 17: Legal Bedrock</h4>
                      <p className="text-slate-300 leading-relaxed">
                        Article 342 empowers the President to notify Scheduled Tribes. Article 17 abolishes untouchability and criminalizes its practice in any form, supported by the SC/ST (Prevention of Atrocities) Act, 1989.
                      </p>
                    </>
                  )}
                  {selectedPolicyId === 'pesa' && (
                    <>
                      <h4 className="font-bold text-emerald-400 text-sm">PESA Act, 1996: Extending Self-Rule to Fifth Schedule</h4>
                      <p className="text-slate-300 leading-relaxed">
                        Empowers tribal Gram Sabhas to manage community resources, prevent tribal land alienation, and govern minor forest produce in Scheduled Areas.
                      </p>
                    </>
                  )}
                  {selectedPolicyId === 'fra' && (
                    <>
                      <h4 className="font-bold text-emerald-400 text-sm">Forest Rights Act, 2006: Undoing Historical Injustice</h4>
                      <p className="text-slate-300 leading-relaxed">
                        Recognizes individual and community forest land titles for forest-dwelling Scheduled Tribes, as upheld by the Supreme Court in the landmark Niyamgiri judgment (2013).
                      </p>
                    </>
                  )}
                  {selectedPolicyId === 'wom2023' && (
                    <>
                      <h4 className="font-bold text-emerald-400 text-sm">Nari Shakti Vandan Adhiniyam (106th Amendment, 2023)</h4>
                      <p className="text-slate-300 leading-relaxed">
                        Reserves one-third (33%) of seats in the Lok Sabha and State Legislative Assemblies for women, structurally expanding political representation beyond local Panchayats.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Free Exploration Sandbox</span>
              <h3 className="text-lg font-bold text-white">Social Structure & Demographic Dynamic Lab</h3>
              <p className="text-xs text-slate-400 mt-1">
                Tweak policy enforcement, technological access, and urbanization without tests or pressure.
              </p>
            </div>
            <motion.button
              aria-label="Ready for Adaptive Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg"
            >
              Ready for Adaptive Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-bold">Legal Enforcement Rate</span>
                <span className="text-emerald-400 font-mono">{legalEnforcementRate}%</span>
              </div>
              <input
                type="range"
                aria-label="Legal Enforcement Rate Slider"
                min={0}
                max={100}
                value={legalEnforcementRate}
                onChange={(e) => setLegalEnforcementRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Strict monitoring of PCPNDT Act & PESA Gram Sabhas</span>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-bold">Urban Higher Education Rate</span>
                <span className="text-gold-400 font-mono">{urbanizationLevel}%</span>
              </div>
              <input
                type="range"
                aria-label="Urban Higher Education Rate Slider"
                min={0}
                max={100}
                value={urbanizationLevel}
                onChange={(e) => setUrbanizationLevel(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Access to universities and professional service careers</span>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-bold">Prenatal Tech Grey-Market Rate</span>
                <span className="text-rose-400 font-mono">{techAccessRate}%</span>
              </div>
              <input
                type="range"
                aria-label="Prenatal Tech Grey-Market Rate Slider"
                min={0}
                max={100}
                value={techAccessRate}
                onChange={(e) => setTechAccessRate(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
              <span className="text-[10px] text-slate-400 block">Illegal sex-determination ultrasound clinics</span>
            </div>
          </div>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold uppercase text-slate-400 mb-2 block">
              Simulated Demographic Equilibrium
            </span>
            <canvas ref={canvasRef} width={600} height={140} className="w-full rounded-xl bg-slate-950" />
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SESSION WITH ADAPTIVE BKT & ESCALATING HINTS ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400">
                NEP 2020 Competency: <span className="text-slate-200 font-semibold uppercase">{challenge.competencyLevel}</span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-xl text-xs font-bold tracking-wider uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 border-rose-600 text-rose-300'
                    : 'bg-gold-950/80 border-gold-600 text-gold-300'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Box with SHAKE ANIMATION on Wrong Answers */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-600 shadow-2xl shadow-rose-950/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ / Classify / Distinguish / Match */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={answerRevealed || showExplanation}
                    onClick={() => handleAnswer(i)}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                    {showExplanation && i === challenge.correctIndex && (
                      <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                    )}
                    {showExplanation && i !== challenge.correctIndex && (
                      <span className="text-rose-400 font-bold ml-2">✗</span>
                    )}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label (Purusha Sukta Body Origins) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'part_mouth', title: 'Mouth of Purusha' },
                    { id: 'part_arms', title: 'Arms of Purusha' },
                    { id: 'part_thighs', title: 'Thighs of Purusha' },
                    { id: 'part_feet', title: 'Feet of Purusha' },
                  ].map((slot) => (
                    <div
                      key={slot.id}
                      aria-label={`Dropzone for ${slot.title}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(slot.id)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl text-center min-h-[100px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-400 font-bold uppercase">{slot.title}</span>
                      <span className="text-xs font-bold text-emerald-400 mt-2">
                        {droppedLabels[slot.id] ? `✓ ${droppedLabels[slot.id]}` : '[Drop Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Purusha mappings"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-sort (Panchsheel / Varna Hierarchy) */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block font-medium">Drag or swap items to place in correct hierarchical/logical order:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    tabIndex={0}
                    aria-label={`Item ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 text-[10px]">
                      {displayIndex + 1}
                    </span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Submit Order"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const finalOrder = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(finalOrder);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl mt-2"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label={`Enter numeric answer in ${challenge.unit || 'units'}`}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-44 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge (Dormitory Functions) */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts((prev) => [...prev, part]);
                          audioManager.play('pop');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-950 border border-slate-700 hover:border-emerald-500 rounded-lg text-slate-200 text-xs font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-200 rounded-lg text-xs flex items-center gap-2"
                    >
                      <span>✓ {part}</span>
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => {
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i));
                          audioManager.play('tap');
                        }}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to add them to the profile</span>
                  )}
                </div>

                <motion.button
                  aria-label="Verify structure"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl"
                >
                  Verify Structure
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/60 to-slate-950 rounded-2xl border border-emerald-700/60 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-sm">💡</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    Sociological Step-by-Step Explanation
                  </span>
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
                      className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed"
                    >
                      <strong className="text-emerald-300 mr-1.5">{i + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Step Explanation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps((s) => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold mt-2"
                  >
                    Next Step Explanation →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'View Final Assessment' : 'Next Challenge'}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg mt-3 block"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REVIEW SCHEDULE WITH PERSONALIZED MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-extrabold text-white">Sociology Mastery Session Complete!</h2>
            <p className="text-sm text-slate-300">
              Final Composite Score: <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              BKT Adaptive Mastery Standing: <strong className="text-emerald-300 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* EXACT MANDATORY MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <h3 className="text-lg font-extrabold text-emerald-400">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {errors === 0
                ? 'You have demonstrated flawless analytical mastery across tribes, caste, class, and gender theory.'
                : errors <= 3
                ? 'You possess strong sociological reasoning capabilities. Review your edge concepts below.'
                : errors <= 7
                ? 'You are building a solid foundation. Keep refining the distinctions between caste, class, and tribal institutions.'
                : 'Sociology is about unlearning preconceptions. Review the detailed misconception profile below and try again!'}
            </p>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Your Individualized Misconception Profile
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Sociological Reality: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                SM-2 Spaced Repetition Schedule
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Next active review recommended in{' '}
                <strong className="text-white">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to ensure long-term retention for the ISC Board Examinations.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Board-Level Practical Task
            </span>
            <h4 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((s, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_SociologyDefinitionFeaturesTribeSim;