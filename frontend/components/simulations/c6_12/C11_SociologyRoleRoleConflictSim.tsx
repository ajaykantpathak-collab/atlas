'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 SOCIOLOGY NODE IDENTIFIERS ───
const NODE_C11_SOC_021 = 'c11_soc_021'; // Role, Role Conflict and Role Stereotype
const NODE_C11_SOC_022 = 'c11_soc_022'; // Social Processes – Cooperation, Competition and Conflict
const NODE_C11_SOC_023 = 'c11_soc_023'; // Overpopulation, Poverty, Unemployment and Illiteracy
const NODE_C11_SOC_024 = 'c11_soc_024'; // Child Labour and Juvenile Delinquency
const NODE_C11_SOC_025 = 'c11_soc_025'; // Problems of the Aged and Differently Abled
const NODE_C11_SOC_026 = 'c11_soc_026'; // Radha Kamal Mukherjee – Social Ecology
const NODE_C11_SOC_027 = 'c11_soc_027'; // G.S. Ghurye – Theories of Origin of the Caste System
const NODE_C11_SOC_028 = 'c11_soc_028'; // N.K. Bose – Hindu Method of Tribal Absorption
const NODE_C11_SOC_029 = 'c11_soc_029'; // Irawati Karve – Kinship and the Family
const NODE_C11_SOC_030 = 'c11_soc_030'; // M.N. Srinivas – Brahminization and Sanskritization

const ALL_NODE_IDS = [
  NODE_C11_SOC_021,
  NODE_C11_SOC_022,
  NODE_C11_SOC_023,
  NODE_C11_SOC_024,
  NODE_C11_SOC_025,
  NODE_C11_SOC_026,
  NODE_C11_SOC_027,
  NODE_C11_SOC_028,
  NODE_C11_SOC_029,
  NODE_C11_SOC_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Fieldwork in Sunderpur: The Social Fabric in Transition',
  intro: 'You are appointed as a sociological field investigator in the transitional district of Sunderpur, India. You must analyze the complex web of social structures, institutional pressures, developmental crises, and theoretical frameworks governing human interaction.',
  context: 'From panchayat conflicts and urban migration to caste dynamics, tribal integration, and kinship networks, the district presents live sociological puzzles that require analytical precision, empathetic understanding, and empirical evidence.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An IPS officer posted in her native district investigates a criminal case involving members of her own extended clan. Structurally, what is she experiencing?',
  options: [
    'Role Strain — competing demands arising from within a single occupational role',
    'Role Conflict — incompatible expectations from two distinct statuses (State Law Enforcer vs. Kin Member)',
    'Role Stereotyping — prejudice regarding the innate capabilities of police officers',
    'Sanskritization — emulation of dominant caste norms for status mobility',
  ],
  correctIndex: 1,
  hintAfter: 'Notice that she holds two separate social statuses simultaneously: a State Police Officer and an Extended Clan Kinsperson. Their expectations clash!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ACROSS ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. Role & Role Conflict (c11_soc_021) - Foundation - Recall
  {
    id: 'ch_soc_001',
    nodeId: NODE_C11_SOC_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to C.H. Cooley’s Looking Glass Self Theory (1902), self-concept develops sequentially in which three steps?',
    options: [
      'Imitation → Internalisation → Moral Action',
      'Imagining appearance to others → Imagining their judgement → Experiencing emotional self-feeling',
      'Ascribed status → Role performance → Sanction application',
      'Thesis → Antithesis → Synthesis',
    ],
    correctIndex: 1,
    explanation: 'Cooley articulated three precise, ordered steps: (1) we imagine how we appear to others, (2) we imagine their judgement of that appearance, and (3) we feel pride, shame, or embarrassment.',
    hints: [
      'Think of how a physical mirror reflects an image, an appraisal, and an emotional reaction.',
      'The theory relies on reflected appraisals rather than mechanical role imitation.',
      'The exact three-step sequence begins with imagined appearance, follows with imagined judgement, and culminates in emotional feeling.',
    ],
    misconceptionIndex: 1,
  },

  // 2. Role Strain vs Role Conflict (c11_soc_021) - Standard - Analysis
  {
    id: 'ch_soc_002',
    nodeId: NODE_C11_SOC_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A college professor in Pune is caught between being an empathetic mentor to students and a rigorous evaluator submitting impartial exam grades. What sociological concept does this illustrate?',
    options: [
      'Role Conflict (incompatible expectations between two separate statuses)',
      'Role Strain (competing and contradictory expectations located within a single status)',
      'Role Stereotype (generalized cultural assumptions about educators)',
      'Anomie (a state of complete normlessness)',
    ],
    correctIndex: 1,
    explanation: 'Role strain occurs within a single social status (here, college professor) when that status contains mutually clashing role-expectations (friendly mentor vs. strict disciplinarian/evaluator).',
    hints: [
      'Check whether the tension is between two different jobs/statuses or inside one single professional role.',
      'Robert K. Merton specifically distinguished tensions inside one status from tensions across multiple statuses.',
      'Since the professor holds only ONE status here (teacher), the internal clashing demands represent role strain.',
    ],
    misconceptionIndex: 0,
  },

  // 3. Social Processes (c11_soc_022) - Foundation - Distinguish
  {
    id: 'ch_soc_003',
    nodeId: NODE_C11_SOC_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do sociologists fundamentally distinguish "Competition" from "Conflict"?',
    options: [
      'Competition is violent and intermittent, whereas conflict is peaceful and continuous',
      'Competition is impersonal, rule-governed, and continuous, whereas conflict is direct, personal, and aimed at defeating an opponent',
      'Competition occurs only in market economies, while conflict is exclusive to feudal societies',
      'There is no sociological distinction; both terms refer to the identical social process',
    ],
    correctIndex: 1,
    explanation: 'Competition is impersonal, continuous, and bound by institutionalized rules (e.g. NEET exams). Conflict is personal, intermittent, and aimed at neutralizing, overcoming, or destroying the opponent.',
    hints: [
      'Think about whether candidates taking an entrance exam hate each other personally.',
      'Notice that competition adheres to formal rules while conflict seeks direct neutralization.',
      'Impersonal striving within rules is competition; direct personal struggle is conflict.',
    ],
    misconceptionIndex: 3,
  },

  // 4. Social Processes Drag-Label (c11_soc_022) - Standard - Application
  {
    id: 'ch_soc_004',
    nodeId: NODE_C11_SOC_022,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Map each real-world Indian scenario to its corresponding core social process.',
    dragItems: [
      { label: 'Amul Dairy Cooperative', targetId: 'proc_coop' },
      { label: 'Lakhs of NEET Exam Aspirants', targetId: 'proc_comp' },
      { label: 'Inter-Community Boundary Riots', targetId: 'proc_conf' },
    ],
    correctMapping: {
      proc_coop: 'Amul Dairy Cooperative',
      proc_comp: 'Lakhs of NEET Exam Aspirants',
      proc_conf: 'Inter-Community Boundary Riots',
    },
    explanation: 'Amul represents voluntary cooperation for shared economic gain. NEET is impersonal rule-bound competition for scarce seats. Riots represent direct, hostile social conflict.',
    hints: [
      'Pooling milk across thousands of smallholders is an integrative, shared endeavour.',
      'Striving for medical seats without personal enmity is rule-bound competition.',
      'Violent clashes over resources or identities constitute manifest conflict.',
    ],
  },

  // 5. Overpopulation & Demographics (c11_soc_023) - Foundation - Recall
  {
    id: 'ch_soc_005',
    nodeId: NODE_C11_SOC_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In sociological analysis, why is India considered overpopulated despite varying regional densities?',
    options: [
      'Solely due to the absolute head-count crossing 142 crore in April 2023',
      'Because population size exceeds the carrying capacity of available land, freshwater, and social infrastructure',
      'Because urban migration has ceased entirely across all 28 states',
      'Due to an imbalance in the international currency exchange rate',
    ],
    correctIndex: 1,
    explanation: 'Overpopulation is not a headcount alone; it is a structural ratio where the population outstrips the carrying capacity of ecological and infrastructural resources (India has ~18% of global population but only ~2.4% land and 4% freshwater).',
    hints: [
      'Think of the dinner table metaphor: food and seats versus the number of guests.',
      'Consider the critical relationship between people and natural/institutional carrying capacity.',
      'Overpopulation measures population pressure relative to sustainable ecological resources.',
    ],
    misconceptionIndex: 4,
  },

  // 6. Unemployment Types (c11_soc_023) - Standard - Analysis
  {
    id: 'ch_soc_006',
    nodeId: NODE_C11_SOC_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On a 2-acre family farm in Bihar, seven family members work daily, though the same agricultural yield could be achieved by four. What specific phenomenon is occurring?',
    options: [
      'Frictional Unemployment',
      'Disguised Unemployment (marginal productivity of surplus labour is near zero)',
      'Voluntary Idleness',
      'Structural Sanskritization',
    ],
    correctIndex: 1,
    explanation: 'Disguised unemployment occurs when more workers are engaged in an activity than necessary, such that withdrawing the surplus workers would not reduce total output.',
    hints: [
      'Notice that the extra workers appear busy, but do not increase the total harvest.',
      'This is extremely common in smallholder Indian family agriculture.',
      'The surplus labour has zero marginal productivity: it is disguised unemployment.',
    ],
  },

  // 7. Child Labour Legislation (c11_soc_024) - Standard - Understanding
  {
    id: 'ch_soc_007',
    nodeId: NODE_C11_SOC_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Under the Child Labour (Prohibition and Regulation) Amendment Act, 2016, what is the precise statutory rule for children below 14 years?',
    options: [
      'Complete prohibition in all occupations, with no exceptions whatsoever under any circumstances',
      'Prohibition in all commercial occupations, with a narrow exception only for helping in family enterprises after school hours or in non-hazardous entertainment',
      'Children below 14 may work up to 8 hours daily in non-hazardous industries',
      'Child labour is permitted provided minimum wages are deposited into a bank account',
    ],
    correctIndex: 1,
    explanation: 'The 2016 Amendment bans child labour for under-14s in all commercial occupations, but permits children to help in family-run non-hazardous enterprises strictly after school hours.',
    hints: [
      'Look for the balance between commercial prohibition and the family-enterprise clause.',
      'The law distinguishes between full-time employment and helping family after school.',
      'The 2016 Act contains a specific family enterprise exception after school hours.',
    ],
    misconceptionIndex: 2,
  },

  // 8. Juvenile Justice (c11_soc_024) - Advanced - Evaluation
  {
    id: 'ch_soc_008',
    nodeId: NODE_C11_SOC_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What crucial structural provision was introduced in the Juvenile Justice (Care and Protection of Children) Act, 2015 regarding 16–18 year olds?',
    options: [
      'Automatic mandatory life imprisonment without trial for any misdemeanor',
      'Permission for 16–18 year olds accused of heinous offences to be tried as adults, subject to a preliminary psychological and physical assessment by the JJB',
      'Total transfer of all juvenile cases to regular military tribunals',
      'Complete immunity from prosecution regardless of the severity of the crime committed',
    ],
    correctIndex: 1,
    explanation: 'Following the Nirbhaya case deliberations, the 2015 Act allows 16-18 year olds accused of heinous crimes (punishable by 7+ years) to be tried in Children’s Courts as adults after preliminary assessment by the Juvenile Justice Board.',
    hints: [
      'Consider the legal changes that followed public debates in 2012-2015.',
      'Look for the role of the Juvenile Justice Board (JJB) in evaluating capacity.',
      'The law allows adult trials only for heinous crimes after preliminary assessment.',
    ],
  },

  // 9. Disability Models (c11_soc_025) - Standard - Distinguish
  {
    id: 'ch_soc_009',
    nodeId: NODE_C11_SOC_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the "Social Model of Disability" (mandated by the RPwD Act, 2016) differ from the traditional "Medical Model"?',
    options: [
      'Medical model locates disability in environmental obstacles; Social model locates it in biological DNA',
      'Medical model treats impairment as an individual bodily defect to be cured; Social model locates disability in architectural, institutional, and attitudinal barriers created by society',
      'Social model advocates institutional confinement; Medical model advocates complete community integration',
      'There is no theoretical difference; both focus exclusively on pharmacological treatments',
    ],
    correctIndex: 1,
    explanation: 'The Social Model asserts that people are disabled by barriers in society (steps without ramps, lack of Braille, social prejudice), not merely by their biological impairments.',
    hints: [
      'Ask: who or what needs to be "fixed" — the individual person or the surrounding environment?',
      'The social model focuses on ramps, signage, policies, and anti-discrimination laws.',
      'Societal barriers create disability; medical models treat it as an individual defect.',
    ],
  },

  // 10. Problems of the Aged (c11_soc_025) - Foundation - Understanding
  {
    id: 'ch_soc_009b',
    nodeId: NODE_C11_SOC_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which Indian statute makes the maintenance and welfare of elderly parents a legally enforceable obligation on children and legal heirs?',
    options: [
      'The Maintenance and Welfare of Parents and Senior Citizens Act, 2007',
      'The Hindu Marriage Act, 1955',
      'The Rights of Persons with Disabilities Act, 2016',
      'The Factories Act, 1948',
    ],
    correctIndex: 0,
    explanation: 'The Maintenance and Welfare of Parents and Senior Citizens Act, 2007 provides a fast-track tribunal mechanism to ensure children and relatives provide monthly maintenance to senior citizens.',
    hints: [
      'Look for the dedicated 2007 statute addressing senior citizens and parents.',
      'It was specifically enacted to combat the erosion of traditional joint-family support.',
      'The statute is the Maintenance and Welfare of Parents and Senior Citizens Act, 2007.',
    ],
  },

  // 11. Radha Kamal Mukherjee: Social Ecology (c11_soc_026) - Standard - Understanding
  {
    id: 'ch_soc_010',
    nodeId: NODE_C11_SOC_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Radha Kamal Mukherjee’s framework of Social Ecology, what constitutes the relationship between the "Biotic Community" and the "Moral Order"?',
    options: [
      'A one-way biological determinism where geography dictates every religious ritual',
      'A symbiotic, reciprocal relationship where cultural institutions grow out of and adapt to their ecological niche while modifying the habitat',
      'A complete independence where human culture has no connection to the material ecosystem',
      'A purely economic market relationship governed exclusively by currency prices',
    ],
    correctIndex: 1,
    explanation: 'Mukherjee proposed that human groups live in symbiosis with their natural habitat. The biotic community (land, flora, fauna) and moral order (kinship, ritual, institutions) mutually shape each other.',
    hints: [
      'Remember the biological term "symbiosis" meaning living together in mutual interdependence.',
      'Neither environment nor human culture acts completely in isolation.',
      'Culture and ecological habitat exist in an ongoing, reciprocal dialogue.',
    ],
  },

  // 12. Social Ecology Case (c11_soc_026) - Advanced - Application
  {
    id: 'ch_soc_011',
    nodeId: NODE_C11_SOC_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How would Radha Kamal Mukherjee sociologically explain why the Toda community of the Nilgiris built their entire social and sacred structure around dairy buffaloes?',
    options: [
      'It was an accidental superstitious habit with no connection to topography',
      'Toda social institutions represent a symbiotic adaptation of the moral order to the high-altitude grassland ecology of the Nilgiris',
      'Toda pastoralism was imposed forcibly by British colonial officers in the 19th century',
      'It resulted from Sanskritization following Sanskritic text translations',
    ],
    correctIndex: 1,
    explanation: 'Mukherjee highlighted the Todas to prove that institutions (pastoral rituals, sacred dairies) are rooted in the biotic conditions of the Nilgiri plateau grasslands.',
    hints: [
      'Connect the pastoral lifestyle to the high mountain grasslands where crops cannot easily grow.',
      'This is a textbook example of biotic habitat anchoring cultural and religious life.',
      'Toda social organization is a classic manifestation of social-ecological symbiosis.',
    ],
  },

  // 13. G.S. Ghurye: Caste Origins (c11_soc_027) - Standard - Analysis
  {
    id: 'ch_soc_012',
    nodeId: NODE_C11_SOC_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did G.S. Ghurye in "Caste and Race in India" (1932) reject Herbert Risley’s single-cause racial explanation of caste origins?',
    options: [
      'Ghurye claimed race did not exist in any ancient society',
      'Ghurye argued that while racial conquest initiated initial cleavages, caste permanence required Brahmanical ideology, occupational endogamy, and legal codification',
      'Ghurye argued that caste was invented exclusively by the British Census of 1901',
      'Ghurye believed caste was identical to medieval European feudal estates',
    ],
    correctIndex: 1,
    explanation: 'Ghurye took Risley’s racial theory as only a starting point, demonstrating that race alone would have blended through intermarriage without Brahmanical sacerdotalism, endogamy, and Dharmashastric codification.',
    hints: [
      'Look for the multi-causal framework that combines race, religion, occupation, and law.',
      'Why didn’t conqueror and conquered simply merge through intermarriage over centuries?',
      'Brahmanical texts and occupational endogamy froze the racial cleavages into permanent hierarchy.',
    ],
  },

  // 14. Purusha Sukta Function (c11_soc_027) - Advanced - Evaluation
  {
    id: 'ch_soc_013',
    nodeId: NODE_C11_SOC_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did G.S. Ghurye sociologically interpret the Purusha Sukta hymn of the Rig Veda (which describes the four varnas emerging from the cosmic being)?',
    options: [
      'As an exact biological blueprint of human anatomy',
      'As ideological legitimation that gave divine, sacred sanction to a socially constructed hierarchy',
      'As a historical census record created by ancient administrators',
      'As a symbolic rebellion against priestly authority',
    ],
    correctIndex: 1,
    explanation: 'Sociologically, myths do not provide biological descriptions; they provide ideological legitimation, sanctifying social stratification as part of the cosmic divine order.',
    hints: [
      'Ask: what social purpose does claiming God created classes from his body serve?',
      'It justifies inequality by making it appear sacred and unchangeable.',
      'The myth serves as ideological legitimation for caste hierarchy.',
    ],
  },

  // 15. N.K. Bose: Hindu Method of Tribal Absorption (c11_soc_028) - Foundation - Understanding
  {
    id: 'ch_soc_014',
    nodeId: NODE_C11_SOC_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary defining characteristic of N.K. Bose’s "Hindu Method of Tribal Absorption"?',
    options: [
      'Forced military conquest followed by total linguistic eradication',
      'Gradual, non-egalitarian absorption of entire tribal communities into the lower rungs of the caste system as hereditary occupational groups',
      'Immediate egalitarian inclusion of tribal members as high-ranking Brahmin priests',
      'Individual conversion through formal baptism rituals',
    ],
    correctIndex: 1,
    explanation: 'Bose argued Hindu society absorbed outside tribes collectively rather than converting individuals, granting them economic security but assigning them a subordinate, graded caste status.',
    hints: [
      'Notice that tribes entered as entire collective communities, not individual converts.',
      'The absorption reproduced caste hierarchy: tribes were usually assigned low rungs.',
      'It is collective incorporation into a graded, unequal caste hierarchy.',
    ],
    misconceptionIndex: 5,
  },

  // 16. Tribal Absorption Stages Drag-Sort (c11_soc_028) - Standard - Analysis
  {
    id: 'ch_soc_015',
    nodeId: NODE_C11_SOC_028,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the four sequential stages of N.K. Bose’s Hindu Method of Tribal Absorption in correct historical order.',
    sortItems: [
      'Contact through trade, settlers, and priestly interaction',
      'Imitation of Hindu rituals, dietary taboos, and deity worship',
      'Claim-making via mythological origins (e.g. fallen Kshatriya lineage)',
      'Recognition as a distinct, usually lower, caste in the local hierarchy',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The historical sequence proceeds: Contact → Imitation of rituals → Claim-making through invented genealogies → Final societal recognition as a ranked caste.',
    hints: [
      'First, groups must meet and interact on the frontier.',
      'Next, the subordinate group begins adopting dietary and religious customs.',
      'They then invent a mythical origin before securing final social ranking.',
    ],
  },

  // 17. Irawati Karve: Regional Kinship (c11_soc_029) - Standard - Distinguish
  {
    id: 'ch_soc_016',
    nodeId: NODE_C11_SOC_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the fundamental structural distinction between North Indian (Indo-Aryan) and South Indian (Dravidian) kinship patterns established by Irawati Karve?',
    options: [
      'North India allows cross-cousin marriage; South India mandates strict gotra exogamy',
      'North India strictly prohibits cross-cousin marriage and enforces gotra exogamy; South India permits and prefers cross-cousin marriage (e.g. maternal uncle’s daughter)',
      'North India is entirely matrilineal; South India is exclusively patrilineal',
      'There is no difference; all Indian regions share identical marriage rules',
    ],
    correctIndex: 1,
    explanation: 'Karve proved that North Indian kinship is centrifugal (gotra/village exogamy, no cousin marriage), while Dravidian kinship is centripetal (cross-cousin marriage creates dense inter-generational alliances).',
    hints: [
      'Think about whether marrying your mother’s brother’s daughter is allowed in the North vs. the South.',
      'North India forbids cousin marriage; South India traditionally prefers it.',
      'Dravidian kinship values close cross-cousin marriage alliances.',
    ],
    misconceptionIndex: 6,
  },

  // 18. Karve on Matriliny & Joint Family (c11_soc_029) - Advanced - Application
  {
    id: 'ch_soc_017',
    nodeId: NODE_C11_SOC_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How did Irawati Karve challenge the nationalist assumption of a single, universal "Traditional Indian Family"?',
    options: [
      'By claiming family does not exist in India',
      'By empirically documenting regional diversity — including Khasi matriliny, Toda polyandry, and Dravidian alliance structures alongside patrilineal joint families',
      'By arguing that Western nuclear families existed in Vedic times',
      'By defining the family exclusively through corporate commercial partnerships',
    ],
    correctIndex: 1,
    explanation: 'Karve used comparative fieldwork to demonstrate that the patrilineal joint family was not universal, highlighting Khasi matriliny (property to the youngest daughter/khadduh) and Toda polyandry.',
    hints: [
      'Consider the diverse kinship systems in Meghalaya (Khasis) and the Nilgiris (Todas).',
      'Karve showed that "the Indian family" is actually a mosaic of four distinct regional patterns.',
      'Empirical documentation of matriliny, polyandry, and cousin alliances shattered the myth of uniformity.',
    ],
  },

  // 19. M.N. Srinivas: Brahminization to Sanskritization (c11_soc_030) - Standard - Understanding
  {
    id: 'ch_soc_018',
    nodeId: NODE_C11_SOC_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did M.N. Srinivas replace his initial term "Brahminization" (1952) with "Sanskritization" (1956)?',
    options: [
      'Because the Sanskrit language was declared mandatory in universities',
      'Because fieldwork showed lower castes often emulated non-Brahmin dominant landed castes (such as Kshatriyas, Jats, Marathas, or Lingayats) rather than Brahmins',
      'Because Brahmin priests officially protested against the term',
      'Because the process had completely stopped occurring in India',
    ],
    correctIndex: 1,
    explanation: 'Srinivas realized that the reference group for upward mobility was not always the Brahmin; in many regions, the locally dominant landed caste (Kshatriya, Maratha, Jat, Lingayat) was the model.',
    hints: [
      'Ask: who holds the real local economic and political power in farming villages?',
      'Lower castes often copied wealthy landed warrior or peasant castes.',
      'The reference group varied regionally, making Brahminization too narrow.',
    ],
    misconceptionIndex: 7,
  },

  // 20. Sanskritization Nature & Limits (c11_soc_030) - Advanced - Evaluation
  {
    id: 'ch_soc_019',
    nodeId: NODE_C11_SOC_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do Dalit intellectuals and critical sociologists argue that Sanskritization is an inherently conservative form of social mobility?',
    options: [
      'Because it costs too much money to purchase sacred threads',
      'Because it enables individual or caste mobility WITHIN the hierarchy without challenging or abolishing the oppressive purity-pollution structure itself',
      'Because it requires learning classical Sanskrit grammar',
      'Because it was prohibited by the Constitution in 1950',
    ],
    correctIndex: 1,
    explanation: 'Sanskritization changes the position of a specific caste (positional change) but leaves the underlying structural hierarchy of caste and purity-pollution intact, often tightening patriarchal restrictions.',
    hints: [
      'Does climbing a ladder dismantle the ladder itself?',
      'Positional change occurs within the system, but structural change does not.',
      'Sanskritization reproduces caste hierarchy rather than annihilating it.',
    ],
  },

  // 21. Quantitative Demographic Numeric Challenge (c11_soc_023) - Standard - Numeric
  {
    id: 'ch_soc_020',
    nodeId: NODE_C11_SOC_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to NITI Aayog’s Multidimensional Poverty Index (NFHS-5), India’s multidimensional poverty fell from 24.85% in 2015-16 to what percentage in 2019-21? (Enter number to 2 decimal places)',
    correctAnswer: 14.96,
    tolerance: 0.2,
    unit: '%',
    explanation: 'NITI Aayog reported that multidimensional poverty dropped from 24.85% (NFHS-4) to 14.96% (NFHS-5), lifting approximately 135 million people out of poverty.',
    hints: [
      'The percentage dropped by nearly 10 percentage points.',
      'It is just below fifteen percent.',
      'The exact official NITI Aayog figure based on NFHS-5 is 14.96%.',
    ],
  },

  // 22. Constructing Social Policy Intervention (c11_soc_024 / c11_soc_025) - Advanced - Creativity
  {
    id: 'ch_soc_021',
    nodeId: NODE_C11_SOC_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct an integrated 3-pillar state intervention to eradicate child labour in a hazardous mining cluster.',
    availableParts: [
      'Mid-Day Meals & RTE Enforcement',
      'Unrestricted Factory Subsidies',
      'MGNREGA Adult Wage Guarantee',
      'Strict Labour Inspection & Helpline 1098',
      'Complete Media Censorship',
    ],
    targetState: 'Mid-Day Meals & RTE Enforcement + MGNREGA Adult Wage Guarantee + Strict Labour Inspection & Helpline 1098',
    validationHint: 'Select the 3 synergistic pillars addressing education, family livelihood, and law enforcement.',
    explanation: 'Eradicating child labour requires simultaneous structural intervention: educational pull (RTE/Meals), household income security (MGNREGA), and strict regulatory enforcement (Inspection/1098).',
    hints: [
      'You need one pillar for schooling, one for parent livelihood, and one for legal enforcement.',
      'Subsidies to factories without labour standards or censorship will not solve the structural problem.',
      'Combine: RTE Meals + Adult Wage + Strict Inspection.',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Role Set & The Looking Glass',
    instruction: 'Click on different role relationships of a Doctor or Sarpanch to see how expectations form.',
    interactionType: 'click-role',
    nodeId: NODE_C11_SOC_021,
  },
  {
    title: '2. Social Processes in Action',
    instruction: 'Adjust the Scarce Resource slider and observe whether social interaction shifts into Cooperation, Competition, or Conflict.',
    interactionType: 'slider-processes',
    nodeId: NODE_C11_SOC_022,
  },
  {
    title: '3. The Vicious Cycle of Deprivation',
    instruction: 'Toggle demographic and educational interventions to observe how breaking one link disrupts poverty.',
    interactionType: 'toggle-cycle',
    nodeId: NODE_C11_SOC_023,
  },
  {
    title: '4. Radha Kamal Mukherjee: Social Ecology',
    instruction: 'Manipulate habitat degradation and observe the direct impact on community moral order and livelihood.',
    interactionType: 'slider-ecology',
    nodeId: NODE_C11_SOC_026,
  },
  {
    title: '5. Srinivas: Sanskritization Dynamics',
    instruction: 'Simulate economic mobility and cultural emulation of dominant reference groups across generations.',
    interactionType: 'slider-sanskritization',
    nodeId: NODE_C11_SOC_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an indigenous forest community is abruptly displaced for open-cast coal mining without land compensation, what will happen according to Mukherjee’s Social Ecology?',
    options: [
      'The moral order and kinship structures will automatically strengthen without the forest',
      'The rupture of the biotic community will destabilize traditional kinship, sacred rituals, and economic autonomy',
      'The community will instantly convert into urban corporate managers',
      'There will be no sociological impact whatsoever',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now adjust the "Habitat Destruction" slider in the Social Ecology interactive model to observe the moral order collapse.',
    nodeId: NODE_C11_SOC_026,
  },
  {
    question: 'Predict: When a lower caste achieves land ownership and begins adopting vegetarianism, teetotalism, and Sanskritic names, what happens to the overall caste system?',
    options: [
      'The entire caste hierarchy is permanently dismantled and abolished',
      'The caste achieves upward positional mobility, but the structural hierarchy of caste remains completely intact',
      'The caste is immediately expelled from the village',
      'The village becomes an egalitarian classless society overnight',
    ],
    correctIndex: 1,
    verifyInstruction: 'Test this in the Sanskritization simulator: notice how the caste moves up rungs, but the ladder itself never disappears.',
    nodeId: NODE_C11_SOC_030,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the relationship between Female Literacy rate and Total Fertility Rate (TFR) in the demographic visualizer?',
    observableOptions: [
      'As female literacy increases, fertility rate sharply declines towards replacement level',
      'As female literacy increases, fertility rate doubles',
      'There is zero mathematical or sociological correlation',
      'Higher literacy causes total school dropout',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_SOC_023,
  },
  {
    question: 'In the Social Processes model, what occurs when scarce resources drop below survival threshold without agreed rules?',
    observableOptions: [
      'Cooperation automatically increases to 100%',
      'Interaction rapidly shifts from rule-bound competition into hostile manifest conflict',
      'Society enters a state of permanent biological equilibrium',
      'All economic activities cease instantly',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_SOC_022,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'District Sociological Action Plan',
  description: 'Apply the theories of Mukherjee, Ghurye, Karve, and Srinivas to design a comprehensive policy dossier for Sunderpur district.',
  steps: [
    'Audit built environment: identify accessibility barriers in public hospitals and courts under RPwD Act 2016',
    'Map kinship systems: document local Gotra and cross-cousin marriage practices in rural blocks',
    'Evaluate social ecology: analyze whether mining projects violate forest rights of local Scheduled Tribes',
    'Design de-addiction and rehabilitation tracks for juveniles released from observation homes under JJ Act 2015',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

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
  nodeId: NODE_C11_SOC_021,
  title: 'Sociology: Structure, Processes, Problems & Thinkers',
  definition: 'An integrated study of social roles, fundamental social processes, pressing social problems in India, and the foundational theoretical contributions of Indian sociologists.',
  eli5: 'Society is like a giant living web. We all play roles in it, cooperate and compete, face real-world challenges like poverty and exclusion, and use brilliant insights from Indian thinkers to understand and improve our world.',
  misconceptions: [
    { misconception: 'Role conflict and role strain are identical.', correction: 'Role conflict occurs between two different statuses; role strain occurs within competing expectations of a single status.' },
    { misconception: 'Cooley’s Looking Glass Self is just a single step of copying others.', correction: 'It has three distinct sequential steps: imagined appearance, imagined judgement, and emotional response.' },
    { misconception: 'Child labour is completely legal if done within families.', correction: 'The 2016 Act permits family enterprise work strictly after school hours in non-hazardous occupations.' },
    { misconception: 'Competition and conflict are the same thing.', correction: 'Competition is impersonal and rule-bound; conflict is direct, personal, and aimed at defeating an opponent.' },
    { misconception: 'Overpopulation is just a headcount of people.', correction: 'Overpopulation is a ratio comparing population size to ecological carrying capacity and infrastructure.' },
    { misconception: 'Tribal absorption was an egalitarian religious conversion.', correction: 'N.K. Bose showed tribes were absorbed collectively into graded, unequal lower rungs of the caste hierarchy.' },
    { misconception: 'All of India follows the same kinship and marriage rules.', correction: 'Irawati Karve demonstrated four regional kinship zones with vastly different marriage rules (e.g. cross-cousin marriage in South vs gotra exogamy in North).' },
    { misconception: 'Sanskritization means learning the Sanskrit language.', correction: 'Sanskritization is the adoption of the high-caste Sanskritic lifestyle (diet, rituals, deities) by lower castes seeking upward mobility.' },
  ],
  diagnosticQuestions: [
    { question: 'What is role conflict?', options: ['Tension inside one role', 'Clash between expectations of two separate statuses', 'A breakdown of state law', 'Lack of social norms'], correctIndex: 1 },
    { question: 'Which social process is impersonal and rule-bound?', options: ['Conflict', 'Competition', 'Warfare', 'Feud'], correctIndex: 1 },
    { question: 'What is disguised unemployment?', options: ['Being fired from a job', 'Surplus labour producing zero marginal output', 'Unemployment among college graduates', 'Voluntary retirement'], correctIndex: 1 },
    { question: 'Which Act expanded recognised disabilities from 7 to 21?', options: ['RPwD Act, 2016', 'PWD Act, 1995', 'RTE Act, 2009', 'JJ Act, 2015'], correctIndex: 0 },
    { question: 'Who formulated the concept of Social Ecology in India?', options: ['G.S. Ghurye', 'Radha Kamal Mukherjee', 'M.N. Srinivas', 'N.K. Bose'], correctIndex: 1 },
    { question: 'Which hymn was cited by Ghurye as ideological legitimation for caste?', options: ['Gayatri Mantra', 'Purusha Sukta', 'Nasadiya Sukta', 'Agni Sukta'], correctIndex: 1 },
    { question: 'What is the South Indian kinship preference according to Karve?', options: ['Village exogamy only', 'Cross-cousin marriage', 'Strict gotra exogamy with no cousin marriage', 'Polyandry only'], correctIndex: 1 },
    { question: 'Sanskritization is positional mobility within the caste system. True or False?', options: ['True — hierarchy remains intact', 'False — it annihilates caste', 'False — it only applies to religion', 'False — it was coined by Marx'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery across ISC Class 11 sociology nodes: status-role theory, social processes, Indian social problems, and seminal Indian sociological frameworks.',
};

// ─── MAIN SIMULATION COMPONENT ───
export default function C11_SociologyRoleRoleConflictSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['sociology'] || { name: 'Sociology', emoji: '👥', color: 'indigo' };

  // ─── 30+ STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Sliders
  const [selectedRoleRel, setSelectedRoleRel] = useState<'patient' | 'nurse' | 'admin' | 'family'>('patient');
  const [lookingGlassStep, setLookingGlassStep] = useState<number>(1);
  const [resourceScarcity, setResourceScarcity] = useState<number>(50); // 0 (abundant) to 100 (acute scarcity)
  const [rulesEnforcement, setRulesEnforcement] = useState<number>(75); // 0 (anomie) to 100 (strict rules)
  const [femaleLiteracyRate, setFemaleLiteracyRate] = useState<number>(65); // 40% to 95%
  const [rteEnforcementLevel, setRteEnforcementLevel] = useState<number>(50); // 0 to 100
  const [habitatDegradation, setHabitatDegradation] = useState<number>(30); // 0 (pristine) to 100 (destroyed)
  const [casteEconomicMobility, setCasteEconomicMobility] = useState<number>(40); // 0 to 100
  const [emulationIntensity, setEmulationIntensity] = useState<number>(30); // 0 to 100
  const [selectedKinshipZone, setSelectedKinshipZone] = useState<'north' | 'south' | 'east' | 'central'>('north');

  // Challenge & Escalating Hints state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);

  // Drag-and-drop & Construct challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 5+ USEEFFECT CALLS ───

  // 1. Load Initial Mastery on Mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_SOC_021);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // 2. Adaptive BKT Mastery Update
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

  // 3. Canvas 2D Demographic/Ecology Simulation Animator
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Dynamic Social Ecological Waves
      const balance = Math.max(10, 100 - habitatDegradation);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin((x + frame * 2) * 0.03) * (balance * 0.4);
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = habitatDegradation > 60 ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Dynamic Node Pulse
      const nodeX = (frame * 1.5) % canvas.width;
      const nodeY = canvas.height / 2 + Math.sin((nodeX + frame * 2) * 0.03) * (balance * 0.4);
      ctx.beginPath();
      ctx.arc(nodeX, nodeY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#6366f1';
      ctx.fill();

      // Text status overlay
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Social-Biotic Equilibrium: ${balance}%`, 12, 20);
      ctx.fillText(`Active Paradigm: ${phase.toUpperCase()}`, canvas.width - 170, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [habitatDegradation, phase]);

  // 4. Inactivity Auto-Hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const firstHint = activeChallenge.hints[0] || 'Take a close look at the sociological definitions.';
        setCurrentHint(firstHint);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak(firstHint);
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // 5. Speech Welcome on Phase Change
  useEffect(() => {
    if (phase === 'discovery') {
      speechManager.speak('Welcome to the Sunderpur sociological simulation. Let us explore the social fabric together.');
    } else if (phase === 'explore') {
      speechManager.speak('Interact with the diagrams to discover fundamental sociological concepts.');
    } else if (phase === 'sandbox') {
      speechManager.speak('Feel free to experiment with all sociological parameters without grading.');
    } else if (phase === 'challenge') {
      speechManager.speak('Now apply your sociological insights to solve real-world district challenges.');
    }
  }, [phase]);

  // ─── 14+ MEMOIZED USECALLBACK HANDLERS ───

  // 1. Discovery Answer
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding sociological deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // 2. Advance to Guided Exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  // 3. Advance to Free Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  // 4. Advance to Challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  // 5. Prediction Submit
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive visualizer to verify.');
  }, []);

  // 6. Observation Submit
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorr = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(isCorr ? 'Accurate scientific observation.' : 'Examine the demographic trends closely.');
  }, []);

  // 7. Escalating Hints Trigger
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
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
      audioManager.play('chime');
      speechManager.speak('Let us study the complete sociological explanation.');
    }
  }, [hintCount, activeChallenge]);

  // 8. Challenge Completion Handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Sunderpur sociological field investigation.');
  }, [errors, onComplete]);

  // 9. Next Challenge Handler
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
      setCurrentChallenge(prev => prev + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // 10. Core Answer Evaluation Handler
  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = ans === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numVal = typeof ans === 'string' ? parseFloat(ans) : ans as number;
      isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.1);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = ans === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Precisely formulated! Excellent sociological reasoning.');
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
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // 11. Drag Handlers
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  // 12. Sort Handler
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  // 13. Construct Toggle Handler
  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => {
      if (prev.includes(part)) return prev.filter(p => p !== part);
      return [...prev, part];
    });
  }, []);

  // 14. Sparkle Trigger Handler
  const handleSparkleTrigger = useCallback((e: React.MouseEvent) => {
    setSparklePos({ x: e.clientX, y: e.clientY });
    setShowSparkle(true);
    audioManager.play('sparkle');
  }, []);

  // ─── DERIVED REAL-TIME VALUES ───
  const derivedSocialProcess = useMemo(() => {
    if (resourceScarcity > 70 && rulesEnforcement < 40) return { name: 'Hostile Conflict', color: 'rose', status: 'Disintegrative struggle breaking social norms' };
    if (rulesEnforcement >= 50 && resourceScarcity > 30) return { name: 'Impersonal Competition', color: 'amber', status: 'Continuous rule-bound striving for scarce resources' };
    return { name: 'Solidarity Cooperation', color: 'emerald', status: 'Integrative mutual assistance towards common goals' };
  }, [resourceScarcity, rulesEnforcement]);

  const estimatedTFR = useMemo(() => {
    return Math.max(1.6, (4.8 - (femaleLiteracyRate * 0.035))).toFixed(2);
  }, [femaleLiteracyRate]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-900 text-slate-100 rounded-2xl shadow-2xl font-sans border border-slate-800">
      
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-xl border border-gold-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-gold-300 font-medium">ISC Class 11 • Social Structure, Dynamics & Indian Thinkers</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span 
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
              difficulty === 'standard' ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40' :
              'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Level</span>
            <span className="text-xs font-semibold text-amber-400 uppercase">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black uppercase tracking-widest bg-gold-600/30 text-gold-300 px-2 py-0.5 rounded border border-gold-500/40">Field Dossier</span>
              <h2 className="text-lg font-bold text-gold-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/40 p-3 rounded-lg border border-slate-800">
              Context: {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700 shadow-md">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Discovery Hook Challenge</span>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 leading-snug">{DISCOVERY_QUESTION.question}</h3>
            
            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <span className="inline-block w-6 text-gold-400 font-mono font-bold">[{String.fromCharCode(65 + i)}]</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="mt-5 pt-4 border-t border-slate-700"
              >
                <p className={`text-sm mb-4 font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot-on analysis! Multiple statuses naturally create structural role conflict.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  <span>Enter Interactive Investigation Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          {/* Diagnostic status bar */}
          <div className="flex items-center justify-between bg-slate-800/40 px-4 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Interactive Discovery Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <span className="text-gold-400 font-mono font-semibold">ISC Syllabus Spiral Model</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 sm:p-6 bg-slate-800/70 rounded-2xl border border-slate-700 shadow-xl"
            >
              <h2 className="text-xl font-black text-gold-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-amber-300 text-xs sm:text-sm mt-1 mb-5 font-medium flex items-center gap-1.5">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* SLIDE 0: Role Set & Cooley's Looking Glass */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <span className="text-xs text-slate-400 font-semibold mb-2">Interactive Status-Role Set Explorer</span>
                    <svg viewBox="0 0 360 220" className="w-full h-auto">
                      {/* Central Status Node */}
                      <circle cx="180" cy="110" r="38" fill="#312e81" stroke="#6366f1" strokeWidth="3" />
                      <text x="180" y="107" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Doctor</text>
                      <text x="180" y="122" textAnchor="middle" fill="#a5b4fc" fontSize="8">(Social Status)</text>

                      {/* Satellite Role Rel Nodes */}
                      {[
                        { id: 'patient', label: 'Patient', cx: 60, cy: 50, color: '#10b981' },
                        { id: 'nurse', label: 'Nurse', cx: 300, cy: 50, color: '#3b82f6' },
                        { id: 'admin', label: 'Hospital Admin', cx: 60, cy: 170, color: '#f59e0b' },
                        { id: 'family', label: 'Own Family', cx: 300, cy: 170, color: '#ec4899' },
                      ].map((n) => (
                        <g key={n.id} onClick={() => { setSelectedRoleRel(n.id as any); audioManager.play('tap'); }} className="cursor-pointer">
                          <line x1="180" y1="110" x2={n.cx} y2={n.cy} stroke="#475569" strokeDasharray="3,3" strokeWidth="2" />
                          <circle 
                            cx={n.cx} 
                            cy={n.cy} 
                            r="26" 
                            fill={n.color} 
                            opacity={selectedRoleRel === n.id ? 1 : 0.6}
                            stroke={selectedRoleRel === n.id ? '#ffffff' : 'transparent'}
                            strokeWidth="2"
                          />
                          <text x={n.cx} y={n.cy + 3} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">{n.label}</text>
                        </g>
                      ))}
                    </svg>

                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs mt-2">
                      <span className="font-bold text-gold-300 capitalize">{selectedRoleRel} Role Expectation: </span>
                      <span className="text-slate-300">
                        {selectedRoleRel === 'patient' && 'Deliver compassionate bedside care, diagnosis, and medical relief.'}
                        {selectedRoleRel === 'nurse' && 'Provide professional clinical coordination, respectful teamwork, and treatment orders.'}
                        {selectedRoleRel === 'admin' && 'Enforce strict budget adherence, paperwork compliance, and ward bed turnover.'}
                        {selectedRoleRel === 'family' && 'Be physically present at home, providing emotional bonding and parenting.'}
                      </span>
                    </div>
                  </div>

                  {/* Cooley's Looking Glass Self Interactive Steps */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-gold-300 font-bold block mb-2">C.H. Cooley’s 3-Step Looking Glass Self (1902)</span>
                      <div className="flex gap-2 mb-3">
                        {[1, 2, 3].map((step) => (
                          <motion.button
                            key={step}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { setLookingGlassStep(step); audioManager.play('tap'); }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              lookingGlassStep === step
                                ? 'bg-gold-600 text-white shadow'
                                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            Step {step}
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-h-[110px]">
                        {lookingGlassStep === 1 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="text-amber-400 font-bold text-xs">Step 1: Imagined Appearance</span>
                            <p className="text-xs text-slate-300 mt-1">
                              An individual pictures in their mind how their appearance, accent, status, or actions look to significant others in society.
                            </p>
                          </motion.div>
                        )}
                        {lookingGlassStep === 2 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="text-gold-400 font-bold text-xs">Step 2: Imagined Judgement</span>
                            <p className="text-xs text-slate-300 mt-1">
                              The individual imagines what evaluation or judgement the other person makes (e.g., capable, uneducated, clumsy, or elite).
                            </p>
                          </motion.div>
                        )}
                        {lookingGlassStep === 3 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <span className="text-rose-400 font-bold text-xs">Step 3: Emotional Self-Feeling</span>
                            <p className="text-xs text-slate-300 mt-1">
                              We experience an internal emotional reaction — pride, shame, self-confidence, or mortification — which crystallises our role performance.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic mt-2">
                      Key insight: Self-identity is built through reflected appraisals, not in solitary isolation.
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Social Processes & Conflict Equilibrium */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Resource Scarcity Pressure: <span className="text-gold-400 font-mono font-bold">{resourceScarcity}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={resourceScarcity}
                        aria-label="Resource Scarcity Slider"
                        onChange={(e) => { setResourceScarcity(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Institutional Rule Enforcement: <span className="text-emerald-400 font-mono font-bold">{rulesEnforcement}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={rulesEnforcement}
                        aria-label="Rule Enforcement Slider"
                        onChange={(e) => { setRulesEnforcement(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border text-center transition-all ${
                    derivedSocialProcess.color === 'emerald' ? 'bg-emerald-950/40 border-emerald-600 text-emerald-200' :
                    derivedSocialProcess.color === 'amber' ? 'bg-amber-950/40 border-amber-600 text-amber-200' :
                    'bg-rose-950/40 border-rose-600 text-rose-200'
                  }`}>
                    <span className="text-xs uppercase tracking-widest font-bold block opacity-80">Dominant Manifest Process</span>
                    <span className="text-xl font-black block my-1">{derivedSocialProcess.name}</span>
                    <p className="text-xs">{derivedSocialProcess.status}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-emerald-400 block">Cooperation</span>
                      <span className="text-[10px] text-slate-400">Integrative • Common Goal</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-amber-400 block">Competition</span>
                      <span className="text-[10px] text-slate-400">Impersonal • Rule-Bound</span>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="font-bold text-rose-400 block">Conflict</span>
                      <span className="text-[10px] text-slate-400">Hostile • Intermittent</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Vicious Cycle of Poverty & Demographics */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Female Literacy Rate (Intervention): <span className="text-gold-400 font-mono font-bold">{femaleLiteracyRate}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="30" 
                        max="95" 
                        value={femaleLiteracyRate}
                        aria-label="Female Literacy Slider"
                        onChange={(e) => { setFemaleLiteracyRate(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        RTE & Mid-Day Meal Enforcement: <span className="text-gold-400 font-mono font-bold">{rteEnforcementLevel}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={rteEnforcementLevel}
                        aria-label="RTE Enforcement Slider"
                        onChange={(e) => { setRteEnforcementLevel(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Estimated TFR</span>
                      <span className="text-lg font-bold text-amber-400">{estimatedTFR}</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Child Labour Risk</span>
                      <span className={`text-lg font-bold ${rteEnforcementLevel > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {Math.max(5, 75 - rteEnforcementLevel * 0.7).toFixed(0)}%
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Household Poverty Index</span>
                      <span className="text-lg font-bold text-gold-300">
                        {Math.max(12, 60 - femaleLiteracyRate * 0.45).toFixed(1)}%
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Youth Employability</span>
                      <span className="text-lg font-bold text-gold-300">
                        {Math.min(92, femaleLiteracyRate * 0.9 + 10).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic text-center">
                    Simultaneous intervention on female schooling, family planning, and employment guarantees breaks the vicious cycle.
                  </p>
                </div>
              )}

              {/* SLIDE 3: Radha Kamal Mukherjee - Social Ecology */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-400">Biotic Community vs Moral Order</h4>
                      <p className="text-xs text-slate-400">Adjust ecological stress to test community equilibrium.</p>
                    </div>
                    <div className="w-full sm:w-64">
                      <label className="text-xs text-slate-400 block mb-1">
                        Forest / Habitat Destruction: <span className="text-rose-400 font-mono font-bold">{habitatDegradation}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={habitatDegradation}
                        aria-label="Habitat Degradation Slider"
                        onChange={(e) => { setHabitatDegradation(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <canvas ref={canvasRef} width={600} height={140} className="w-full rounded-xl border border-slate-800" />

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-gold-300">Mukherjee’s Law of Symbiosis: </strong>
                    {habitatDegradation < 40 
                      ? 'The moral order (sacred groves, clan land tenure, pastoral rituals) is in harmonious symbiosis with the biotic community.' 
                      : 'Severe ecological rupture! Deforestation and displacement cause kinship fragmentation, economic pauperisation, and moral disorientation.'}
                  </div>
                </div>
              )}

              {/* SLIDE 4: Srinivas - Sanskritization Dynamics */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Economic Mobility (Land/Income): <span className="text-amber-400 font-mono font-bold">{casteEconomicMobility}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={casteEconomicMobility}
                        aria-label="Economic Mobility Slider"
                        onChange={(e) => { setCasteEconomicMobility(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Cultural Emulation Intensity: <span className="text-gold-400 font-mono font-bold">{emulationIntensity}%</span>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={emulationIntensity}
                        aria-label="Cultural Emulation Slider"
                        onChange={(e) => { setEmulationIntensity(Number(e.target.value)); audioManager.play('count'); }}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-300">Caste Status Trajectory</span>
                      <span className="font-mono text-gold-400">
                        {casteEconomicMobility > 50 && emulationIntensity > 50 ? 'Successful Sanskritization Claim' : 'Latent / Contested Status'}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-amber-500 via-gold-500 to-emerald-500 h-full rounded-full"
                        animate={{ width: `${Math.min(100, (casteEconomicMobility + emulationIntensity) / 2)}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3 text-[11px] text-slate-400">
                      <div>✓ Dietary Change (Vegetarianism)</div>
                      <div>✓ Sanskritic Deity Worship</div>
                      <div>✓ Janeu / Name Adoption</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic text-center">
                    Crucial limit: Sanskritization brings positional mobility within the caste hierarchy, leaving the caste structure intact.
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400">Step {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-5"
        >
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-lg font-bold text-gold-300">Sociological Free Sandbox Laboratory</h2>
                <p className="text-xs text-slate-400">Manipulate all independent variables freely without scoring or time constraints.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <span>Ready for Board Challenges!</span>
                <span>→</span>
              </motion.button>
            </div>

            {/* Multi-variable control deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              {/* Kinship Region Selector */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-gold-400 block mb-2">Irawati Karve Kinship Zone</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  {(['north', 'south', 'east', 'central'] as const).map(zone => (
                    <button
                      key={zone}
                      onClick={() => { setSelectedKinshipZone(zone); audioManager.play('tap'); }}
                      className={`p-1.5 rounded uppercase font-mono font-bold text-[10px] transition-all ${
                        selectedKinshipZone === zone ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {zone} Zone
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-[11px] text-slate-300">
                  {selectedKinshipZone === 'north' && 'Indo-Aryan: Exogamous Gotra rules; cross-cousin marriage forbidden.'}
                  {selectedKinshipZone === 'south' && 'Dravidian: Cross-cousin marriage preferred; dense alliance network.'}
                  {selectedKinshipZone === 'east' && 'Tribal: Matrilineal (Khasis), Polyandrous (Todas), Bilateral diversity.'}
                  {selectedKinshipZone === 'central' && 'Transitional blend of northern exogamy & southern cross-cousin ties.'}
                </div>
              </div>

              {/* Social Ecology & Balance */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-emerald-400 block mb-2">Social Ecology Habitat</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={habitatDegradation}
                  aria-label="Habitat slider"
                  onChange={(e) => setHabitatDegradation(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer mb-2"
                />
                <span className="text-[11px] text-slate-300 block">
                  Status: {habitatDegradation < 40 ? 'Symbiosis Preserved' : 'Ecosystem Ruptured'}
                </span>
                <span className="text-[10px] text-slate-500">Radha Kamal Mukherjee Framework</span>
              </div>

              {/* Social Process Scarcity */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-amber-400 block mb-2">Social Process Dial</span>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={resourceScarcity}
                  aria-label="Scarcity slider"
                  onChange={(e) => setResourceScarcity(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer mb-2"
                />
                <span className="text-[11px] text-slate-300 block">
                  Mode: <strong className="text-gold-300">{derivedSocialProcess.name}</strong>
                </span>
                <span className="text-[10px] text-slate-500">Cooperation vs Competition vs Conflict</span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          {/* Progress & Badge Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/40 p-3.5 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block">Current Challenge</span>
              <span className="text-sm font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
            </div>
            
            <div className="flex-1 max-w-xs mx-3">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-gold-950 text-gold-300 border border-gold-700/50">
                NEP 2020: {activeChallenge.competencyLevel.toUpperCase()}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Dynamic Challenge Card */}
          <motion.div 
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.25 }}
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/30' : 'bg-slate-800/80 border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gold-400">Node Ref: {activeChallenge.nodeId}</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activeChallenge.type}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-5 leading-relaxed">
              {activeChallenge.question}
            </h3>

            {/* TYPE 1: Multiple Choice & Classify / Distinguish / Match */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="space-y-2.5">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold'
                        : 'bg-slate-900/90 hover:bg-slate-900 border-slate-700/80 text-slate-200 hover:border-gold-500/50'
                    }`}
                  >
                    <span className="inline-block w-6 font-mono font-bold text-gold-400">[{String.fromCharCode(65 + i)}]</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag and Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-semibold mb-1">Drag each label into the correct category box:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-1.5 bg-gold-600 hover:bg-gold-500 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'proc_coop', title: 'Cooperation' },
                    { id: 'proc_comp', title: 'Competition' },
                    { id: 'proc_conf', title: 'Conflict' },
                  ].map((box) => (
                    <div
                      key={box.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(box.id)}
                      className="p-4 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs font-bold text-slate-400 mb-1">{box.title}</span>
                      <span className="text-xs font-bold text-emerald-300">
                        {droppedLabels[box.id] || '[Drop item here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 3}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  Validate Labels →
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag and Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-semibold block">Drag and reorder into the correct historical/sociological sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length 
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx]) 
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3 shadow-sm"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-300 border border-gold-700 flex items-center justify-center font-bold text-xs">
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
                    const ans = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    aria-label="Numeric answer input"
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 14.96"
                    className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-gold-500 outline-none font-mono"
                  />
                  <span className="text-slate-400 text-sm font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit →
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct Policy Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleConstructToggle(part)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        constructParts.includes(part)
                          ? 'bg-gold-600 border-gold-400 text-white shadow'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] text-xs">
                  <span className="text-slate-500 block mb-1">Constructed Policy Pillars:</span>
                  <span className="text-emerald-300 font-semibold font-mono">
                    {constructParts.length > 0 ? constructParts.join(' + ') : '[Click items above to assemble your policy framework]'}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' + '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Policy →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 sm:p-5 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3 shadow-inner"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">Step-by-Step Sociological Deduction</span>
                  <span className="text-xs text-slate-400">Progressive Disclosure</span>
                </div>

                {activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-200 leading-relaxed"
                  >
                    <strong className="text-amber-400">Step {i + 1}: </strong>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => { setRevealedSteps(s => s + 1); audioManager.play('tap'); }}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Logical Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                    >
                      <span>{currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Investigation' : 'Next District Challenge'}</span>
                      <span>→</span>
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL PROFILE ─── */}
      {phase === 'complete' && (
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-center p-6 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Sociological Fieldwork Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have demonstrated rigorous analytical and competency-based understanding across social structures, problems, and classical Indian sociological thought.
            </p>
            
            <div className="flex justify-center gap-6 my-5">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 w-32">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 w-32">
                <span className="text-xs text-slate-400 block">BKT Mastery</span>
                <span className="text-2xl font-black text-gold-400 uppercase">{masteryLevel}</span>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-4 bg-gold-950/40 border border-gold-700/60 rounded-xl text-xs sm:text-sm text-gold-200 leading-relaxed max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered every theoretical paradigm and empirical problem in the ISC syllabus!'
                : errors <= 3
                ? '🎉 Stellar sociological work! You exhibit high analytical competence in distinguishing complex concepts.'
                : errors <= 7
                ? '👍 Solid progress! Review the specific misconception corrections below to sharpen your board exam answers.'
                : '💪 Keep building your conceptual foundation! Revisit the interactive labs and study the three-step models.'}
            </div>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl">
              <h3 className="text-sm font-bold text-rose-300 mb-3 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Misconception Review Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-semibold mb-1">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Sociological Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-amber-950/40 border border-amber-800/60 rounded-xl flex items-center justify-between text-xs text-amber-200">
            <div>
              <strong className="text-amber-300 block">Spaced Repetition Review Schedule (SM-2):</strong>
              <span>Next recommended memory-reinforcement session: </span>
              <strong className="text-white underline">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : 'Tomorrow (1 Day)'}</strong>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Capstone Activity */}
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <h3 className="text-base font-bold text-gold-200 mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-gold-400 font-mono">[{i + 1}]</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Investigation Milestone Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}
export { C11_SociologyRoleRoleConflictSim };