'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_SOC_001 = 'c11_soc_001';
const NODE_C11_SOC_002 = 'c11_soc_002';
const NODE_C11_SOC_003 = 'c11_soc_003';
const NODE_C11_SOC_004 = 'c11_soc_004';
const NODE_C11_SOC_005 = 'c11_soc_005';
const NODE_C11_SOC_006 = 'c11_soc_006';
const NODE_C11_SOC_007 = 'c11_soc_007';
const NODE_C11_SOC_008 = 'c11_soc_008';
const NODE_C11_SOC_009 = 'c11_soc_009';
const NODE_C11_SOC_010 = 'c11_soc_010';

const ALL_NODE_IDS = [
  NODE_C11_SOC_001,
  NODE_C11_SOC_002,
  NODE_C11_SOC_003,
  NODE_C11_SOC_004,
  NODE_C11_SOC_005,
  NODE_C11_SOC_006,
  NODE_C11_SOC_007,
  NODE_C11_SOC_008,
  NODE_C11_SOC_009,
  NODE_C11_SOC_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Transformation: Making Sense of a Changing World',
  intro: 'In the 19th century, dual revolutions — the French Political Revolution and the British Industrial Revolution — tore the traditional agrarian fabric apart. Peasants migrated into smoke-choked factories, monarchies collapsed, and traditional bonds fractured. To explain and heal this upheaval, thinkers invented a new scientific lens: Sociology.',
  context: 'As a budding social scientist in India, you are examining how rapid urbanisation, caste dynamics in villages like Rampura, and tribal transformations among the Santhals and Khasis mirror these foundational debates.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When European peasants left centuries-old villages to work in 14-hour factory shifts in Manchester, traditional religion and feudal loyalty failed to explain the new urban chaos. What new intellectual demand emerged?',
  options: [
    'A need for pure theology to revive ancient medieval dogmas',
    'A scientific, empirical discipline to discover the objective laws governing human society',
    'A purely biological doctrine declaring industrial workers biologically defective',
    'A branch of astronomy to predict social revolutions using planetary positions'
  ],
  correctIndex: 1,
  hintAfter: 'Think about how the natural sciences (physics, biology) had brought order to nature — thinkers wanted a parallel science of society!',
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
    question: 'What do you observe about the relationship between the Industrial Revolution and the emergence of Sociology?',
    observableOptions: [
      'Sociology emerged as a scientific response to the social disruptions caused by industrialization (✓)',
      'Sociology was invented before the Industrial Revolution (✗)',
      'Sociology emerged independently of any social change (✗)',
      'Sociology replaced religion entirely during industrialization (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'When comparing Auguste Comte and Emile Durkheim, what key observational difference emerges in their approaches?',
    observableOptions: [
      'Comte focused on positivism and classification; Durkheim emphasized empirical social facts and solidarity (✓)',
      'Both had identical approaches with no differences (✗)',
      'Durkheim rejected all of Comte\'s ideas completely (✗)',
      'Comte focused only on psychology while Durkheim studied economics (✗)',
    ],
    correctIndex: 0,
  },
];

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_soc_001)
  {
    id: 'ch_01_soc001',
    nodeId: NODE_C11_SOC_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who coined the term "sociologie" in the year 1838, establishing it as the queen of sciences?',
    options: ['Karl Marx', 'Auguste Comte', 'Herbert Spencer', 'Max Weber'],
    correctIndex: 1,
    explanation: 'Auguste Comte coined the term "sociologie" in 1838 in France, initially referring to it as "social physics" to model it after the natural sciences.',
    hints: [
      'He was a French philosopher who served as secretary to Saint-Simon.',
      'He proposed the Law of Three Stages and the philosophy of Positivism.',
      'His first name is Auguste.'
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - Understanding (c11_soc_002)
  {
    id: 'ch_02_soc002',
    nodeId: NODE_C11_SOC_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement accurately captures the "categorical" (non-normative) nature of scientific sociology?',
    options: [
      'Sociology prescribes what morals people should adopt in their daily lives.',
      'Sociology analyses "what is" and why it occurs through empirical evidence, rather than prescribing "what ought to be".',
      'Sociology is purely common sense that requires no systematic testing or methodology.',
      'Sociology focuses solely on biological chromosomes and physiological evolution.'
    ],
    correctIndex: 1,
    explanation: 'In its pure form, sociology is a categorical science: it describes, measures, and explains empirical social realities ("what is") rather than issuing moral value judgements ("what ought to be").',
    hints: [
      'Think about the difference between a factual census report and a moral sermon.',
      'Normative disciplines deal with ethical ideals; categorical disciplines deal with observed facts.',
      'Scientific sociology seeks empirical truth based on real-world data.'
    ],
    misconceptionIndex: 0,
  },
  // 3. Foundation - Drag Label (c11_soc_003)
  {
    id: 'ch_03_soc003',
    nodeId: NODE_C11_SOC_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match Comte’s Law of Three Stages of human intellectual progress to their correct evolutionary order.',
    dragItems: [
      { label: 'Theological Stage (Gods/Supernatural)', targetId: 'stage_1' },
      { label: 'Metaphysical Stage (Abstract Forces/Nature)', targetId: 'stage_2' },
      { label: 'Positive Stage (Scientific Observation/Laws)', targetId: 'stage_3' },
    ],
    correctMapping: {
      stage_1: 'Theological Stage (Gods/Supernatural)',
      stage_2: 'Metaphysical Stage (Abstract Forces/Nature)',
      stage_3: 'Positive Stage (Scientific Observation/Laws)',
    },
    explanation: 'Comte argued that human knowledge matures from the Theological stage (divine spirits), through the Metaphysical stage (philosophical abstractions), to the Positive stage (scientific laws).',
    hints: [
      'Stage 1 begins with spirits, fetishism, and deities.',
      'Stage 2 replaces deities with abstract philosophical principles like "Nature" or "Essence".',
      'Stage 3 uses empirical observation, mathematics, and verification.'
    ],
    misconceptionIndex: 1,
  },
  // 4. Foundation - Match (c11_soc_004)
  {
    id: 'ch_04_soc004',
    nodeId: NODE_C11_SOC_004,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In Herbert Spencer’s Organic Analogy, how does society’s regulating system compare to a biological organism?',
    options: [
      'Regulating system (Government/Law) = Nervous System (Brain/Nerves)',
      'Regulating system (Government/Law) = Digestive System (Stomach)',
      'Regulating system (Government/Law) = Circulatory System (Blood vessels)',
      'Regulating system (Government/Law) = Skeletal Bones solely'
    ],
    correctIndex: 0,
    explanation: 'Spencer mapped the regulating system of society (government and legal control) directly to the nervous system of an organism.',
    hints: [
      'The brain and nerves coordinate and regulate bodily actions.',
      'The economy sustains/feeds the body (digestive system).',
      'Transportation and roads distribute nutrients (circulatory blood vessels).'
    ],
  },
  // 5. Foundation - Drag Sort (c11_soc_010)
  {
    id: 'ch_05_soc010',
    nodeId: NODE_C11_SOC_010,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the 6 standard steps of the Scientific Method in Sociological Research in their correct chronological order.',
    sortItems: [
      'Formulation of the Problem',
      'Observation',
      'Classification of Data',
      'Formulation of Hypothesis',
      'Verification / Testing',
      'Prediction / Generalisation'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'The scientific method strictly proceeds: 1. Formulation of the problem -> 2. Observation -> 3. Classification -> 4. Hypothesis -> 5. Verification -> 6. Prediction.',
    hints: [
      'You cannot observe before you define what problem you are investigating.',
      'Classification of facts precedes constructing a formal testable hypothesis.',
      'Verification happens before you make broader predictive generalisations.'
    ],
    misconceptionIndex: 4,
  },
  // 6. Foundation - Classify (c11_soc_005)
  {
    id: 'ch_06_soc005',
    nodeId: NODE_C11_SOC_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Émile Durkheim defined "Mechanical Solidarity" as social cohesion based on which core dynamic?',
    options: [
      'Complex division of labour and high occupational interdependence like in Bengaluru IT parks',
      'Likeness, shared collective conscience, and uniformity of tasks in simple, traditional societies',
      'A complete breakdown of social norms and rise of widespread anomie',
      'Violent class warfare between industrial proletariat and capitalist factory owners'
    ],
    correctIndex: 1,
    explanation: 'Mechanical solidarity exists in homogeneous, traditional societies (e.g., traditional Toda pastoralists or Santhal villages) where cohesion springs from likeness and a shared collective conscience.',
    hints: [
      'Think of mechanical parts acting in uniform unison.',
      'Organic solidarity is based on specialised differences; mechanical is based on sameness.',
      'Members perform similar roles and hold identical core beliefs.'
    ],
  },
  // 7. Foundation - Distinguish (c11_soc_008)
  {
    id: 'ch_07_soc008',
    nodeId: NODE_C11_SOC_008,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do the academic orientations of History and Sociology primarily differ?',
    options: [
      'History is nomothetic (seeking general laws); Sociology is idiographic (describing unique past events).',
      'History is idiographic (describing unique specific events chronologically); Sociology is nomothetic (seeking general patterns and social laws).',
      'History only studies economics; Sociology only studies individual human brains.',
      'There is no methodological or conceptual difference between them.'
    ],
    correctIndex: 1,
    explanation: 'History is predominantly idiographic (focusing on unique, chronological occurrences), whereas Sociology is nomothetic (seeking universal patterns, typologies, and recurrent social laws).',
    hints: [
      '"Idio" refers to the particular/individual; "nomos" refers to law or pattern.',
      'Historians detail unique events like the Battle of Plassey; sociologists study general patterns of colonialism and social change.'
    ],
  },
  // 8. Standard - Application (c11_soc_006)
  {
    id: 'ch_08_soc006',
    nodeId: NODE_C11_SOC_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During the 2024 Indian General Elections, the Election Commission deployed thousands of returning officers acting under codified statutory guidelines. What type of authority does this illustrate in Max Weber’s typology?',
    options: [
      'Traditional Authority (sanctity of age-old custom)',
      'Charismatic Authority (extraordinary personal magnetism of a prophet or hero)',
      'Legal-Rational Authority (belief in the legality of enacted rules and official jurisdictional competence)',
      'Feudal Patriarchal Authority (hereditary feudal allegiance)'
    ],
    correctIndex: 2,
    explanation: 'The Election Commission operates under written laws, impersonal procedures, and defined offices, which is the textbook definition of Legal-Rational Authority and bureaucracy.',
    hints: [
      'The officers do not rule because of divine hereditary right or personal holiness.',
      'Their legitimacy comes from the Constitution and codified statutory law.',
      'Max Weber described this as modern bureaucratic domination.'
    ],
  },
  // 9. Standard - Analysis (c11_soc_007)
  {
    id: 'ch_09_soc007',
    nodeId: NODE_C11_SOC_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'According to Karl Marx’s historical materialism, how do the economic "Base" and the institutional "Superstructure" interact?',
    options: [
      'The religious beliefs of the superstructure unilaterally create and determine factory technology in the base.',
      'The economic base (forces & relations of production) fundamentally shapes and conditions the superstructure (law, politics, religion, culture).',
      'The base and superstructure operate completely independently without any causal connection.',
      'The superstructure consists solely of biological genes while the base consists of moral virtues.'
    ],
    correctIndex: 1,
    explanation: 'Marx asserted that the economic base (the material mode of production) forms the foundation on which legal, political, and ideological superstructures arise.',
    hints: [
      'Marx famously stated that the material conditions of life determine human consciousness, not vice-versa.',
      'When the economic base shifts from feudal landholding to industrial capitalism, laws and state power adapt to serve the ruling class.'
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Numeric (c11_soc_009)
  {
    id: 'ch_10_soc009',
    nodeId: NODE_C11_SOC_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to Census 2011, Scheduled Castes form approximately what percentage of India’s total population (enter to one decimal place)?',
    correctAnswer: 16.6,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Census of India 2011 recorded approximately 20.14 crore Scheduled Caste citizens, representing 16.6% of the national population.',
    hints: [
      'It is between 15% and 18%.',
      'The exact census figure is approximately 16.6%.',
      'Enter 16.6.'
    ],
  },
  // 11. Standard - Application (c11_soc_006)
  {
    id: 'ch_11_soc006',
    nodeId: NODE_C11_SOC_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A sociologist studying why a Santhal girl chooses to attend a boarding school in Ranchi sits with her to understand her personal hopes and perceived life-chances. Which Weberian method is this researcher using?',
    options: [
      'Positivist physical somatometry',
      'Verstehen (Interpretive / Empathetic understanding of subjective meaning)',
      'Statistical regression exclusively without talking to the actor',
      'Social Darwinist racial ranking'
    ],
    correctIndex: 1,
    explanation: 'Verstehen is Max Weber’s methodological cornerstone: understanding the subjective meanings, motives, and values that actors attach to their social conduct.',
    hints: [
      'It is a German term meaning empathetic understanding.',
      'It looks at society from the inside of the actor’s mind.',
      'Weber coined this term to complement causal explanation.'
    ],
  },
  // 12. Standard - Construct (c11_soc_007)
  {
    id: 'ch_12_soc007',
    nodeId: NODE_C11_SOC_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct Karl Marx’s dialectical chain of capitalist exploitation by choosing and assembling the concepts in logical order.',
    availableParts: ['Bourgeoisie Owns Means', 'Extracts Surplus Value', 'Worker Immiseration', 'Class Consciousness', 'Revolution'],
    targetState: 'Bourgeoisie Owns Means Extracts Surplus Value Worker Immiseration Class Consciousness Revolution',
    validationHint: 'Think: Capital ownership -> Value extraction -> Poverty/Alienation -> Awakening -> Transformation',
    explanation: 'Under capitalism: Capitalists own the means of production -> extract surplus value from labour -> workers face immiseration -> develop class consciousness ("class for itself") -> collective revolution.',
    hints: [
      'Start with ownership of means of production.',
      'Follow with surplus value extraction leading to immiseration.',
      'Finish with class consciousness and revolution.'
    ],
  },
  // 13. Standard - Analysis (c11_soc_005)
  {
    id: 'ch_13_soc005',
    nodeId: NODE_C11_SOC_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During rapid economic disruptions, when customary social guidelines collapse and individuals experience normlessness, which sociological phenomenon did Durkheim identify?',
    options: [
      'Organic integration',
      'Anomie (structural normlessness)',
      'Altruistic hero worship',
      'Totemic sanctification'
    ],
    correctIndex: 1,
    explanation: 'Anomie is Durkheim’s concept for a breakdown of social regulation and moral norms during rapid economic booms or depressions, leaving individuals without clear normative anchors.',
    hints: [
      'It comes from the Greek meaning "without law" or normlessness.',
      'Durkheim analysed it in his famous 1897 work "Suicide".',
      'It explains why sudden economic shocks trigger social pathology.'
    ],
  },
  // 14. Standard - Application (c11_soc_010)
  {
    id: 'ch_14_soc010',
    nodeId: NODE_C11_SOC_010,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the pioneering Indian social scientist to their hallmark methodological contribution:',
    options: [
      'M.N. Srinivas -> Intensive village fieldwork & participant observation in Rampura',
      'G.S. Ghurye -> Mathematical laboratory chemistry experiments',
      'Andre Beteille -> Purely biological genetic blood typing',
      'Iravati Karve -> Total rejection of kinship and comparative method'
    ],
    correctIndex: 0,
    explanation: 'M.N. Srinivas lived in Rampura village (Karnataka) for extended fieldwork, producing "The Remembered Village" and conceptualising Sanskritization and the Dominant Caste.',
    hints: [
      'He wrote "The Remembered Village" after his original field notes were destroyed in a fire.',
      'His participant observation in Karnataka is foundational to Indian sociology.'
    ],
  },
  // 15. Advanced - Evaluation (c11_soc_004)
  {
    id: 'ch_15_soc004',
    nodeId: NODE_C11_SOC_004,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did 20th-century Indian sociologists like G.S. Ghurye and N.K. Bose sharply criticise Herbert Spencer’s Social Darwinism?',
    options: [
      'Because Spencer believed animals had higher intelligence than humans.',
      'Because colonial rulers used Spencer’s linear evolutionary ladder to brand Indian tribes (Santhals, Nagas, Todas) as "primitive" to justify colonial subjugation.',
      'Because Spencer refused to use the English language in his books.',
      'Because Social Darwinism promoted too much free state welfare for the poor.'
    ],
    correctIndex: 1,
    explanation: 'Social Darwinism was weaponised by colonial administrators to place European industrial society at the peak and rank tribal/colonised communities as "unfit" or "primitive," ignoring their unique internal social logic.',
    hints: [
      'Consider how British ethnographers ranked castes and tribes on an evolutionary scale.',
      'Social Darwinism claimed "survival of the fittest" meant existing inequalities were natural.',
      'Indian scholars argued tribal cultures have coherent, dignified institutional systems.'
    ],
    misconceptionIndex: 2,
  },
  // 16. Advanced - Evaluation (c11_soc_003)
  {
    id: 'ch_16_soc003',
    nodeId: NODE_C11_SOC_003,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When the British colonial administration conducted the 1901 Census under Herbert Risley, ranking castes by "social precedence," what critical limitation of pure Positivism was revealed?',
    options: [
      'Numbers are completely impossible to write down in tropical climates.',
      'The very act of categorising and counting social groups is not value-free; it actively altered and rigidified the fluid caste identities it claimed merely to observe.',
      'Positivism can only be used to measure chemical reactions in test tubes.',
      'The Census proved that social change never occurs in human history.'
    ],
    correctIndex: 1,
    explanation: 'Positivism claims that the observer is detached and records objective facts. However, in colonial India, counting and ranking castes created competitive claims and rigidified boundaries, demonstrating that social observation interacts reflexively with reality.',
    hints: [
      'Think about reflexivity: does the observer change the observed?',
      'Castes began forming sabhas to petition for higher ranking in the census.',
      'The data collection itself shaped the social structure.'
    ],
  },
  // 17. Advanced - Analysis (c11_soc_008)
  {
    id: 'ch_17_soc008',
    nodeId: NODE_C11_SOC_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A research project in Vidarbha investigates farmer distress. Economics records unpaid bank loans and crop price collapse. What specific dimension does Sociology provide that Economics alone cannot?',
    options: [
      'The chemical formula of agricultural pesticide sprays.',
      'The structural analysis of caste-based moneylending networks, loss of izzat (honour), and breakdown of joint-family safety nets.',
      'Calculating the exact interest rate on formal nationalised bank credit.',
      'Weather satellite telemetry of monsoon cloud formations.'
    ],
    correctIndex: 1,
    explanation: 'While Economics quantifies debt and income figures, Sociology explores the structural relations: informal moneylending tied to caste patronage, social stigma, dowry burdens, and changing kin obligations.',
    hints: [
      'Economics handles the balance sheet and price indices.',
      'Sociology looks at caste hierarchies, family stress, and social stigma.',
      'The social embeddedness of economic action is sociology’s core insight.'
    ],
  },
  // 18. Advanced - Creativity (c11_soc_010)
  {
    id: 'ch_18_soc010',
    nodeId: NODE_C11_SOC_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing a research study on matrilineal property devolution among the Khasis of Meghalaya compared to patrilineal Nagas. Which method is most suited to capturing the lived authority of maternal uncles versus fathers?',
    options: [
      'A purely postal questionnaire mailed to random urban post boxes.',
      'Comparative ethnographic fieldwork combining participant observation with kinship genealogical mapping.',
      'Laboratory controlled experiments with electric shock stimuli.',
      'Astronomical observation of seasonal constellations.'
    ],
    correctIndex: 1,
    explanation: 'Iravati Karve demonstrated that comparative ethnographic fieldwork with genealogical charts is the signature method for capturing kinship authority and descent nuances in indigenous communities.',
    hints: [
      'Think of how Iravati Karve mapped kinship systems across India.',
      'Kinship authority cannot be measured in a lab; it requires living with the community and tracing lineages.',
      'Ethnography and comparative kinship analysis provide thick description.'
    ],
  },
  // 19. Advanced - Evaluation (c11_soc_006)
  {
    id: 'ch_19_soc006',
    nodeId: NODE_C11_SOC_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Max Weber warned of the "Iron Cage" (Gehäuse der Hörigkeit) of modern rationalisation. Which contemporary Indian scenario best reflects this danger?',
    options: [
      'A festive tribal dance celebrating the harvest in Bastar.',
      'An elderly widow denied lifesaving food rations because an automated biometric scanner failed to authenticate her worn fingerprints.',
      'A village community resolving a minor irrigation dispute under a banyan tree through consensus.',
      'A religious devotee singing devotional hymns during the Kumbh Mela.'
    ],
    correctIndex: 1,
    explanation: 'The "Iron Cage" describes how hyper-rationalised, impersonal bureaucratic procedures can trap humans in rigid technical rules that completely lose sight of human welfare and purpose.',
    hints: [
      'The Iron Cage occurs when rigid bureaucratic rules become ends in themselves.',
      'Notice where technological/procedural rationality overrides basic human dignity.',
      'An automated machine denying food to an eligible citizen is technical rationality gone cold.'
    ],
  },
  // 20. Advanced - Analysis (c11_soc_007)
  {
    id: 'ch_20_soc007',
    nodeId: NODE_C11_SOC_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Andre Beteille’s celebrated study of Sripuram village in Tamil Nadu refined Marxian conflict theory by demonstrating that social stratification in India is based on the complex interplay of which three axes?',
    options: [
      'Height, weight, and blood group',
      'Caste, Class, and Power',
      'Astrology, diet, and handwriting',
      'Language, weather, and clothing style'
    ],
    correctIndex: 1,
    explanation: 'In "Caste, Class and Power" (1965), Andre Beteille showed that while Marx focused primarily on economic class, Indian stratification operates through the dynamic, overlapping triad of Caste (ritual hierarchy), Class (economic resources), and Power (political control).',
    hints: [
      'It is the exact title of Beteille’s classic 1965 sociological monograph.',
      'It links ritual status, economic wealth, and political party influence.'
    ],
  },
  // 21. Advanced - Numeric (c11_soc_009)
  {
    id: 'ch_21_soc009',
    nodeId: NODE_C11_SOC_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'According to the National Family Health Survey (NFHS-5, 2019–21), what percentage of marriages in India are inter-caste (enter whole integer percentage)?',
    correctAnswer: 5,
    tolerance: 1,
    unit: '%',
    explanation: 'NFHS-5 findings confirm that caste endogamy remains remarkably persistent across India, with only approximately 5% of marriages taking place across caste boundaries.',
    hints: [
      'It is surprisingly low, reflecting strong caste endogamy.',
      'It is roughly 1 in 20 marriages.',
      'Enter 5.'
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
  nodeId: NODE_C11_SOC_001,
  title: 'Emergence of Sociology and Anthropology',
  definition: 'Sociology and Anthropology emerged from the twin revolutions in Europe to scientifically investigate human society, institutions, collective action, and cultural systems using empirical, comparative, and interpretive methodologies.',
  eli5: 'When the world changed rapidly from quiet farms to busy factory cities, old explanations stopped working. Thinkers built Sociology to investigate how human groups live, work, rule, and make meaning together.',
  misconceptions: [
    {
      misconception: 'Sociology and common sense are the exact same thing.',
      correction: 'Common sense relies on untested everyday assumptions; Sociology uses systematic empirical research, verifiability, and theoretical models.',
    },
    {
      misconception: 'Auguste Comte was the first person in world history to think about society.',
      correction: 'Plato, Aristotle, Kautilya, and Ibn Khaldun reflected on society centuries earlier; Comte’s distinction was establishing sociology as a distinct positive scientific discipline in 1838.',
    },
    {
      misconception: 'Social Darwinism is a proven scientific law of human progress.',
      correction: 'Social Darwinism is an ideological extrapolation widely rejected for justifying colonial conquest, racism, and social inequality.',
    },
    {
      misconception: 'Karl Marx believed only rich people are evil individuals.',
      correction: 'Marx analysed the objective structural contradictions of capitalism and surplus value, not individual moral malice.',
    },
    {
      misconception: 'Sociological research methods are identical to data collection tools.',
      correction: 'Methods (fieldwork, comparative, scientific) are broad overarching research strategies; questionnaires and interviews are specific tools used within them.',
    },
  ],
  diagnosticQuestions: [
    { question: 'In what year was the term "sociology" coined by Auguste Comte?', options: ['1789', '1838', '1895', '1947'], correctIndex: 1 },
    { question: 'Which historical event destroyed feudalism with ideals of Liberty, Equality, Fraternity?', options: ['The French Revolution (1789)', 'The American Civil War', 'The Renaissance', 'The Cold War'], correctIndex: 0 },
    { question: 'Who formulated the distinction between Mechanical and Organic solidarity?', options: ['Karl Marx', 'Herbert Spencer', 'Émile Durkheim', 'Max Weber'], correctIndex: 2 },
    { question: 'What does Max Weber’s concept of "Verstehen" mean?', options: ['Statistical correlation', 'Empathetic / interpretive understanding of subjective meaning', 'Evolutionary survival of the fittest', 'Bureaucratic corruption'], correctIndex: 1 },
    { question: 'In Marxian theory, which class owns the means of production?', options: ['The Proletariat', 'The Bourgeoisie', 'The Serfs', 'The Tribal shamans'], correctIndex: 1 },
    { question: 'Which Indian sociologist studied Rampura village and formulated "Sanskritization"?', options: ['G.S. Ghurye', 'M.N. Srinivas', 'Iravati Karve', 'Andre Beteille'], correctIndex: 1 },
    { question: 'What are the two major sub-branches of Anthropology in the ISC syllabus?', options: ['Physical Anthropology and Socio-cultural Anthropology', 'Geology and Botany', 'Psychology and Economics', 'Astronomy and Astrology'], correctIndex: 0 },
    { question: 'Which research method involves living inside a community for months to participate in its daily life?', options: ['Postal survey', 'Field work / Participant observation', 'Laboratory chemical assay', 'Remote satellite indexing'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is achieved when the student demonstrates clear understanding of classical thinkers, research methodology, and Indian sociological contributions across foundation, standard, and advanced tiers.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'The Great Matrix of Thinkers',
    instruction: 'Click on each founding theorist to reveal their core paradigm, key concept, and Indian context connection.',
    interactionType: 'click-thinker',
    nodeId: NODE_C11_SOC_001,
  },
  {
    title: 'Comte’s Ladder: The Law of Three Stages',
    instruction: 'Drag the intellectual maturity slider to observe human thought evolve from Supernatural Deities to Scientific Laws.',
    interactionType: 'slider-stages',
    nodeId: NODE_C11_SOC_003,
  },
  {
    title: 'Spencer’s Living Super-Organism',
    instruction: 'Toggle different societal organ systems to see how structural differentiation develops as society grows.',
    interactionType: 'toggle-organism',
    nodeId: NODE_C11_SOC_004,
  },
  {
    title: 'Durkheim’s Solidarity & Division of Labour',
    instruction: 'Adjust the population density & occupational specialisation slider to watch society shift from Mechanical to Organic Solidarity.',
    interactionType: 'slider-solidarity',
    nodeId: NODE_C11_SOC_005,
  },
  {
    title: 'The Scientific Method Laboratory',
    instruction: 'Follow the 6 steps of sociological inquiry to formulate and test a real research problem (Vidarbha agrarian crisis).',
    interactionType: 'step-research',
    nodeId: NODE_C11_SOC_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a simple agricultural society undergoes rapid industrialisation and everyone specialises in unique jobs, what will hold them together?',
    options: [
      'Uniformity of beliefs and shared daily farming tasks (Mechanical Solidarity)',
      'Mutual economic interdependence where everyone relies on everyone else’s specialised skills (Organic Solidarity)',
      'Total societal collapse with zero cohesion possible',
      'Reversion to Stone Age hunter-gatherer bands'
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the specialisation slider to 100% in the Solidarity lab to verify how interdependence replaces uniformity!',
    nodeId: NODE_C11_SOC_005,
  },
  {
    question: 'Predict: According to Karl Marx, if factory owners increase mechanisation and extract more surplus value while keeping wages stagnant, what will happen to workers?',
    options: [
      'Workers will automatically become rich factory shareholders.',
      'Workers will experience deepening immiseration and develop revolutionary class consciousness.',
      'Workers will abandon all social relationships and live alone in the wilderness.',
      'Capitalism will achieve permanent universal harmony with no strikes.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Check the Marxian conflict paradigm to see how surplus value extraction sparks collective class consciousness ("class for itself").',
    nodeId: NODE_C11_SOC_007,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Indian Sociological Investigator',
  description: 'Design a micro-ethnographic inquiry into a social institution in your own town or neighbourhood (e.g., local vegetable market, joint vs nuclear families, or a local craft guild).',
  steps: [
    'Choose an institution: Family, Temple/Gurdwara committee, or a Gig-worker delivery hub.',
    'Formulate a precise research question: "How has mobile technology altered work autonomy for local delivery riders?"',
    'Select a method: Combine 10 structured survey schedules with 2 in-depth Verstehen interviews.',
    'Identify variables: Age, income, caste/regional background, daily working hours, and peer solidarity.',
    'Write a 1-page sociological brief connecting your observations to Durkheim (solidarity) or Marx (surplus value).'
  ],
};

// ─── MAIN COMPONENT ───
function C11_SociologyEmergenceSociologyAnthropologySim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_SOC_001,
  title = DEFAULT_PROPS.title || 'Emergence of Sociology and Anthropology',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['sociology'] || { name: 'Sociology', emoji: '👥', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interactive discovery & exploration state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);

  // Thinker lab interactive state
  const [selectedThinker, setSelectedThinker] = useState<string>('comte');
  const [comteStageSlider, setComteStageSlider] = useState<number>(1);
  const [spencerOrganSystem, setSpencerOrganSystem] = useState<'regulatory' | 'sustaining' | 'distributing'>('regulatory');
  const [solidarityDensity, setSolidarityDensity] = useState<number>(20);
  const [researchStepIndex, setResearchStepIndex] = useState<number>(0);

  // Sandbox free play variables
  const [sandboxThinkerFilter, setSandboxThinkerFilter] = useState<'all' | 'functionalist' | 'conflict' | 'interpretive'>('all');
  const [sandboxMethodSlider, setSandboxMethodSlider] = useState<number>(50);
  const [sandboxCustomConcept, setSandboxCustomConcept] = useState<string>('Caste & Stratification');

  // Adaptive mastery and challenge states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Challenge input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Progressive disclosure of explanation
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs for BKT & Inactivity Timer
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCAL STORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY EFFECT (BKT driven) ───
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

  // ─── HTML5 CANVAS DEMOGRAPHIC & SOLIDARITY ANIMATION ───
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

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw dynamic solidarity / demographic waves
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        ctx.strokeStyle = w === 0 ? '#10b981' : w === 1 ? '#6366f1' : '#f59e0b';
        ctx.lineWidth = 2.5;

        for (let x = 0; x < canvas.width; x += 5) {
          const freq = 0.02 + w * 0.01;
          const amp = 15 + (solidarityDensity / 100) * 20;
          const y = (canvas.height / 2) + Math.sin(x * freq + frame * 0.05 + w) * amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Draw interactive pulsing nodes representing institutions
      const nodes = [
        { label: 'Family', x: 60, y: 35, color: '#ec4899' },
        { label: 'Economy', x: 160, y: 75, color: '#3b82f6' },
        { label: 'Polity', x: 260, y: 35, color: '#8b5cf6' },
        { label: 'Religion', x: 360, y: 75, color: '#f59e0b' },
      ];

      nodes.forEach((n, idx) => {
        const pulse = Math.sin(frame * 0.08 + idx) * 3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y - 15);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [solidarityDensity, currentSlide]);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! Society demanded a systematic positive science.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the core sociological paradigms interactively!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the free sociological sandbox. Explore paradigms freely without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Get ready for the interactive competency challenges!');
  }, []);

  const handlePrediction = useCallback((_idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded. Now interact with the visualization to verify your prediction!');
  }, []);

  const handleThinkerSelect = useCallback((thinkerKey: string) => {
    setSelectedThinker(thinkerKey);
    audioManager.play('tap');
    const thinkerQuotes: Record<string, string> = {
      comte: 'Auguste Comte: Know in order to predict; predict in order to control.',
      spencer: 'Herbert Spencer: Society is a super-organism evolving from simple to complex.',
      durkheim: 'Émile Durkheim: Treat social facts as things! Religion unites people into a moral community.',
      weber: 'Max Weber: Grasp the subjective meaning of social action through Verstehen.',
      marx: 'Karl Marx: The history of all hitherto existing society is the history of class struggles!',
    };
    speechManager.speak(thinkerQuotes[thinkerKey] || '');
  }, []);

  const handleComteStageChange = useCallback((stage: number) => {
    setComteStageSlider(stage);
    audioManager.play('count');
  }, []);

  const handleSolidaritySliderChange = useCallback((val: number) => {
    setSolidarityDensity(val);
    audioManager.play('balance');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation with a mastery score of ${finalScore} percent.`);
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
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent! Your sociological analysis is accurate.');
      setShowConfetti(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete step-by-step sociological explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]);

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
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructPartClick = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('pop');
  }, []);

  const handleConstructRemove = useCallback((index: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== index));
    audioManager.play('tap');
  }, []);

  const handleConstructSubmit = useCallback(() => {
    handleAnswer(constructParts.join(' '));
  }, [constructParts, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-800">
                ISC Class 11 • {subjectConfig.name}
              </span>
              <span className="text-xs text-slate-400 font-mono">10 Key Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Navigation tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wide">
              <span>🏛️</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-300/80 mt-2 italic bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/50">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-base font-bold text-white mb-2">🤔 Discovery Curiosity Hook:</h2>
            <p className="text-sm text-slate-300 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all flex items-center justify-between border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span>✓</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm border ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                      : 'bg-amber-950/60 border-amber-600 text-amber-200'
                  }`}
                >
                  {discoveryCorrect
                    ? '🎉 Exactly! The dual revolutions forced thinkers to formulate an empirical science of society.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center gap-2"
                >
                  <span>Enter Interactive Paradigm Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
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

          <p className="text-xs sm:text-sm text-amber-300/90 bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4"
            >
              {/* STEP 0: CLICK-THINKER INTERACTIVE MATRIX */}
              {currentSlide === 0 && (
                <div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
                    {[
                      { key: 'comte', name: 'Auguste Comte', nation: 'France 🇫🇷', color: '#10b981' },
                      { key: 'spencer', name: 'Herbert Spencer', nation: 'England 🇬🇧', color: '#3b82f6' },
                      { key: 'durkheim', name: 'Émile Durkheim', nation: 'France 🇫🇷', color: '#8b5cf6' },
                      { key: 'weber', name: 'Max Weber', nation: 'Germany 🇩🇪', color: '#f59e0b' },
                      { key: 'marx', name: 'Karl Marx', nation: 'Germany 🇩🇪', color: '#ef4444' },
                    ].map(t => (
                      <motion.button
                        key={t.key}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleThinkerSelect(t.key)}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedThinker === t.key
                            ? 'bg-slate-800 border-emerald-500 shadow-md'
                            : 'bg-slate-850/50 border-slate-700/50 hover:bg-slate-800'
                        }`}
                        aria-label={`Select thinker ${t.name}`}
                      >
                        <div className="w-2.5 h-2.5 rounded-full mb-2" style={{ backgroundColor: t.color }} />
                        <p className="text-xs font-bold text-white leading-tight">{t.name}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{t.nation}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* Thinker Detailed Interactive Dossier */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {selectedThinker === 'comte' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                          Father of Sociology • Positivism (1838)
                        </span>
                        <h3 className="text-base font-bold text-white">Auguste Comte & Social Physics</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Envisioned sociology as the apex of the sciences. Formulated the <strong>Law of Three Stages</strong> (Theological → Metaphysical → Positive) and divided sociology into <strong>Social Statics</strong> (order/structure) and <strong>Social Dynamics</strong> (evolution/progress).
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-emerald-300/90 border border-emerald-900/40">
                          🇮🇳 <strong>Indian Connection:</strong> The Census of India 2011 is a massive positivist empirical exercise, measuring observable social facts on 4,600+ communities.
                        </div>
                      </div>
                    )}
                    {selectedThinker === 'spencer' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                          Evolutionary Theory & Organic Analogy (1864)
                        </span>
                        <h3 className="text-base font-bold text-white">Herbert Spencer & Social Evolution</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Coined "survival of the fittest". Compared society to a biological body with regulating (polity), sustaining (economy), and distributing (transport) systems. Noted society is a <strong>super-organism</strong> because consciousness is diffused among all individuals.
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-gold-300/90 border border-gold-900/40">
                          🇮🇳 <strong>Indian Connection:</strong> Critiqued by N.K. Bose and G.S. Ghurye for its colonial misuse in labelling tribal societies (Santhals, Todas, Nagas) as "primitive".
                        </div>
                      </div>
                    )}
                    {selectedThinker === 'durkheim' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                          Structural Functionalism (1895)
                        </span>
                        <h3 className="text-base font-bold text-white">Émile Durkheim & Social Facts</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Treated social facts as things. Investigated the <strong>Sacred & Profane</strong> (Elementary Forms of Religious Life, 1912), <strong>Mechanical vs Organic Solidarity</strong>, and proved suicide rates follow structural integration and anomie.
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-purple-300/90 border border-purple-900/40">
                          🇮🇳 <strong>Indian Connection:</strong> Kolkata’s Durga Puja (UNESCO Intangible Heritage) generates collective effervescence; Vidarbha farmer suicides reflect agrarian anomie.
                        </div>
                      </div>
                    )}
                    {selectedThinker === 'weber' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                          Interpretive Sociology & Verstehen (1904)
                        </span>
                        <h3 className="text-base font-bold text-white">Max Weber & Domination</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Insisted on <strong>Verstehen</strong> (empathetic understanding of subjective meanings). Categorised 3 types of authority: Traditional, Charismatic, and Legal-Rational (bureaucracy). Warned of the rationalised <strong>Iron Cage</strong>.
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-amber-300/90 border border-amber-900/40">
                          🇮🇳 <strong>Indian Connection:</strong> UPSC/IAS represents legal-rational bureaucracy; Baba Amte’s Anandwan represents charismatic authority; village mukhiyas represent traditional authority.
                        </div>
                      </div>
                    )}
                    {selectedThinker === 'marx' && (
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                          Conflict Theory & Historical Materialism (1848)
                        </span>
                        <h3 className="text-base font-bold text-white">Karl Marx & Class Struggle</h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Argued economic Base shapes legal/cultural Superstructure. Capitalists (Bourgeoisie) exploit Workers (Proletariat) via <strong>Surplus Value</strong> extraction. Class struggle transforms a "class in itself" into a revolutionary "class for itself".
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-red-300/90 border border-red-900/40">
                          🇮🇳 <strong>Indian Connection:</strong> Andre Beteille applied class analysis to Sripuram (caste-class-power triad); Oxfam India 2023 shows top 1% holds 40.5% wealth.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 1: COMTE’S THREE STAGES SLIDER & TOPIC SVG #1 */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                    <span>Stage 1: Theological</span>
                    <span>Stage 2: Metaphysical</span>
                    <span>Stage 3: Positive (Scientific)</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={1}
                    value={comteStageSlider}
                    onChange={e => handleComteStageChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    aria-label="Comte stage slider"
                  />

                  {/* SVG DIAGRAM 1: COMTE'S LAW OF THREE STAGES PROGRESSION */}
                  <svg viewBox="0 0 600 160" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2">
                    <defs>
                      <linearGradient id="theolGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#78350f" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                      <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e3a8a" />
                        <stop offset="100%" stopColor="#2563eb" />
                      </linearGradient>
                      <linearGradient id="posGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#064e3b" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>

                    {/* Step 1 Box */}
                    <rect x="20" y="25" width="160" height="110" rx="10" fill="url(#theolGrad)" stroke={comteStageSlider === 1 ? '#f59e0b' : '#78350f'} strokeWidth={comteStageSlider === 1 ? '3' : '1'} opacity={comteStageSlider === 1 ? '1' : '0.45'} />
                    <text x="100" y="52" fill="#fef3c7" fontSize="12" fontWeight="bold" textAnchor="middle">1. Theological</text>
                    <text x="100" y="74" fill="#fde68a" fontSize="10" textAnchor="middle">Divine / Supernatural</text>
                    <text x="100" y="94" fill="#fed7aa" fontSize="9" textAnchor="middle">Fetishism → Polytheism</text>
                    <text x="100" y="112" fill="#fed7aa" fontSize="9" textAnchor="middle">→ Monotheism</text>

                    {/* Arrow 1 -> 2 */}
                    <path d="M 190 80 L 220 80" stroke="#64748b" strokeWidth="2.5" />
                    <polygon points="220,80 212,75 212,85" fill="#64748b" />

                    {/* Step 2 Box */}
                    <rect x="230" y="25" width="160" height="110" rx="10" fill="url(#metaGrad)" stroke={comteStageSlider === 2 ? '#60a5fa' : '#1e3a8a'} strokeWidth={comteStageSlider === 2 ? '3' : '1'} opacity={comteStageSlider === 2 ? '1' : '0.45'} />
                    <text x="310" y="52" fill="#dbeafe" fontSize="12" fontWeight="bold" textAnchor="middle">2. Metaphysical</text>
                    <text x="310" y="74" fill="#bfdbfe" fontSize="10" textAnchor="middle">Abstract Forces / Essence</text>
                    <text x="310" y="94" fill="#93c5fd" fontSize="9" textAnchor="middle">Philosophical Speculation</text>
                    <text x="310" y="112" fill="#93c5fd" fontSize="9" textAnchor="middle">Universal Nature doctrines</text>

                    {/* Arrow 2 -> 3 */}
                    <path d="M 400 80 L 430 80" stroke="#64748b" strokeWidth="2.5" />
                    <polygon points="430,80 422,75 422,85" fill="#64748b" />

                    {/* Step 3 Box */}
                    <rect x="440" y="25" width="140" height="110" rx="10" fill="url(#posGrad)" stroke={comteStageSlider === 3 ? '#34d399' : '#064e3b'} strokeWidth={comteStageSlider === 3 ? '3' : '1'} opacity={comteStageSlider === 3 ? '1' : '0.45'} />
                    <text x="510" y="52" fill="#ecfdf5" fontSize="12" fontWeight="bold" textAnchor="middle">3. Positive</text>
                    <text x="510" y="74" fill="#a7f3d0" fontSize="10" textAnchor="middle">Scientific Observation</text>
                    <text x="510" y="94" fill="#6ee7b7" fontSize="9" textAnchor="middle">Empirical Social Laws</text>
                    <text x="510" y="112" fill="#6ee7b7" fontSize="9" textAnchor="middle">Positivist Sociology (1838)</text>
                  </svg>

                  {/* Visual Stage Representation */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center min-h-[120px] flex flex-col items-center justify-center">
                    {comteStageSlider === 1 && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <span className="text-3xl">⚡🌩️</span>
                        <h4 className="text-sm font-bold text-amber-300 mt-1">1. The Theological Stage</h4>
                        <p className="text-xs text-slate-300 mt-1 max-w-md">
                          Natural & social phenomena explained as acts of gods/spirits. (Fetishism → Polytheism → Monotheism).
                          <br />
                          <em>Indian Example:</em> Vedic rituals attributing rainfall solely to Lord Indra’s divine blessing.
                        </p>
                      </motion.div>
                    )}
                    {comteStageSlider === 2 && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <span className="text-3xl">📜✨</span>
                        <h4 className="text-sm font-bold text-gold-300 mt-1">2. The Metaphysical Stage</h4>
                        <p className="text-xs text-slate-300 mt-1 max-w-md">
                          Deities replaced by abstract philosophical principles, essences, and "Universal Nature".
                          <br />
                          <em>Indian Example:</em> Dharmashastra doctrines invoking abstract "Natural Cosmic Order" to justify social hierarchy without empirical testing.
                        </p>
                      </motion.div>
                    )}
                    {comteStageSlider === 3 && (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <span className="text-3xl">🔬📊</span>
                        <h4 className="text-sm font-bold text-emerald-300 mt-1">3. The Positive (Scientific) Stage</h4>
                        <p className="text-xs text-slate-300 mt-1 max-w-md">
                          Ultimate metaphysical causes abandoned; laws of succession discovered via observation, mathematics, and verification.
                          <br />
                          <em>Indian Example:</em> IMD meteorological monsoon Doppler radars and Census 2011 empirical demographic surveys.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 2: SPENCER’S ORGANIC ANALOGY & TOPIC SVG #2 */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {[
                      { key: 'regulatory', label: '1. Regulating System (Polity)', body: 'Nervous System (Brain/Spine)' },
                      { key: 'sustaining', label: '2. Sustaining System (Economy)', body: 'Digestive System (Stomach/Gut)' },
                      { key: 'distributing', label: '3. Distributing System (Infrastructure)', body: 'Circulatory System (Arteries/Veins)' },
                    ].map(sys => (
                      <motion.button
                        key={sys.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSpencerOrganSystem(sys.key as 'regulatory' | 'sustaining' | 'distributing');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 p-3 rounded-xl text-left border transition-all text-xs ${
                          spencerOrganSystem === sys.key
                            ? 'bg-slate-800 border-gold-500 text-white font-bold'
                            : 'bg-slate-850 border-slate-800 text-slate-400'
                        }`}
                        aria-label={`Select ${sys.label}`}
                      >
                        <p>{sys.label}</p>
                        <p className="text-[10px] text-gold-300 mt-1">{sys.body}</p>
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG DIAGRAM 2: SPENCER'S ORGANIC ANALOGY */}
                  <svg viewBox="0 0 500 180" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2">
                    <rect x="20" y="20" width="130" height="140" rx="10" fill={spencerOrganSystem === 'regulatory' ? '#1e3a8a' : '#0f172a'} stroke="#3b82f6" strokeWidth="1.5" />
                    <text x="85" y="45" fill="#93c5fd" fontSize="11" textAnchor="middle" fontWeight="bold">Government / Law</text>
                    <text x="85" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Co-ordinates Action</text>
                    <circle cx="85" cy="115" r="22" fill="#2563eb" opacity="0.6" />
                    <text x="85" y="119" fill="white" fontSize="10" textAnchor="middle">🧠 Brain</text>

                    <rect x="185" y="20" width="130" height="140" rx="10" fill={spencerOrganSystem === 'sustaining' ? '#14532d' : '#0f172a'} stroke="#22c55e" strokeWidth="1.5" />
                    <text x="250" y="45" fill="#86efac" fontSize="11" textAnchor="middle" fontWeight="bold">Economic Production</text>
                    <text x="250" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Nourishes Resources</text>
                    <circle cx="250" cy="115" r="22" fill="#16a34a" opacity="0.6" />
                    <text x="250" y="119" fill="white" fontSize="10" textAnchor="middle">🌾 Stomach</text>

                    <rect x="350" y="20" width="130" height="140" rx="10" fill={spencerOrganSystem === 'distributing' ? '#701a75' : '#0f172a'} stroke="#d946ef" strokeWidth="1.5" />
                    <text x="415" y="45" fill="#f0abfc" fontSize="11" textAnchor="middle" fontWeight="bold">Roads & Telecom</text>
                    <text x="415" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Transports Goods</text>
                    <circle cx="415" cy="115" r="22" fill="#c026d3" opacity="0.6" />
                    <text x="415" y="119" fill="white" fontSize="10" textAnchor="middle">🩸 Arteries</text>
                  </svg>
                  <p className="text-[11px] text-slate-400 italic text-center">
                    *Spencer’s crucial caveat: Society is "super-organic" because consciousness is diffused across every citizen, not centralised in a single brain!
                  </p>
                </div>
              )}

              {/* STEP 3: DURKHEIM SOLIDARITY GAUGE & TOPIC SVG #3 */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-800 space-y-2">
                      <p className="text-xs font-bold text-purple-300 uppercase tracking-wider">🎯 Predict-Then-Check:</p>
                      <p className="text-xs sm:text-sm text-slate-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5 mt-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Low Density / Similarity (Mechanical)</span>
                        <span className="font-bold text-purple-300">Division of Labour: {solidarityDensity}%</span>
                        <span>High Specialisation / Interdependence (Organic)</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={solidarityDensity}
                        onChange={e => handleSolidaritySliderChange(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        aria-label="Solidarity density slider"
                      />

                      {/* SVG DIAGRAM 3: DURKHEIM MECHANICAL VS ORGANIC SOLIDARITY */}
                      <svg viewBox="0 0 600 140" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2">
                        {/* Mechanical Half */}
                        <rect x="15" y="15" width="270" height="110" rx="8" fill="#3b0764" stroke="#a855f7" strokeWidth={solidarityDensity < 50 ? '2.5' : '1'} opacity={solidarityDensity < 50 ? '1' : '0.4'} />
                        <text x="150" y="38" fill="#f3e8ff" fontSize="12" fontWeight="bold" textAnchor="middle">Mechanical Solidarity</text>
                        <text x="150" y="58" fill="#d8b4fe" fontSize="10" textAnchor="middle">Homogeneity & Likeness</text>
                        <circle cx="80" cy="90" r="14" fill="#9333ea" />
                        <circle cx="125" cy="90" r="14" fill="#9333ea" />
                        <circle cx="170" cy="90" r="14" fill="#9333ea" />
                        <circle cx="215" cy="90" r="14" fill="#9333ea" />
                        <text x="80" y="94" fill="white" fontSize="9" textAnchor="middle">Clan</text>
                        <text x="125" y="94" fill="white" fontSize="9" textAnchor="middle">Clan</text>
                        <text x="170" y="94" fill="white" fontSize="9" textAnchor="middle">Clan</text>
                        <text x="215" y="94" fill="white" fontSize="9" textAnchor="middle">Clan</text>

                        {/* Organic Half */}
                        <rect x="315" y="15" width="270" height="110" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth={solidarityDensity >= 50 ? '2.5' : '1'} opacity={solidarityDensity >= 50 ? '1' : '0.4'} />
                        <text x="450" y="38" fill="#ecfdf5" fontSize="12" fontWeight="bold" textAnchor="middle">Organic Solidarity</text>
                        <text x="450" y="58" fill="#6ee7b7" fontSize="10" textAnchor="middle">Occupational Interdependence</text>
                        <circle cx="375" cy="90" r="14" fill="#059669" />
                        <circle cx="425" cy="90" r="14" fill="#2563eb" />
                        <circle cx="475" cy="90" r="14" fill="#d97706" />
                        <circle cx="525" cy="90" r="14" fill="#dc2626" />
                        <text x="375" y="94" fill="white" fontSize="8" textAnchor="middle">Doctor</text>
                        <text x="425" y="94" fill="white" fontSize="8" textAnchor="middle">Coder</text>
                        <text x="475" y="94" fill="white" fontSize="8" textAnchor="middle">Farmer</text>
                        <text x="525" y="94" fill="white" fontSize="8" textAnchor="middle">Teacher</text>

                        {/* Connecting Interdependence Lines */}
                        <line x1="389" y1="90" x2="411" y2="90" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="439" y1="90" x2="461" y2="90" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />
                        <line x1="489" y1="90" x2="511" y2="90" stroke="#a7f3d0" strokeWidth="2" strokeDasharray="3,3" />
                      </svg>

                      {/* Dynamic Canvas Simulation inside explore step */}
                      <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
                        <p className="text-[10px] text-slate-400 mb-1 font-mono">Dynamic Canvas: Social Ties & Institutional Network</p>
                        <canvas ref={canvasRef} width={450} height={90} className="w-full rounded-lg" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: RESEARCH METHOD LAB */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[
                      '1. Problem',
                      '2. Observe',
                      '3. Classify',
                      '4. Hypothesise',
                      '5. Verify',
                      '6. Predict'
                    ].map((step, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setResearchStepIndex(idx);
                          audioManager.play('count');
                        }}
                        className={`p-2 rounded-lg text-center text-[11px] font-bold border transition-all ${
                          researchStepIndex === idx
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                            : 'bg-slate-850 border-slate-700/60 text-slate-400'
                        }`}
                      >
                        {step}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[120px]">
                    {researchStepIndex === 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 uppercase">Step 1: Problem Formulation</h4>
                        <p className="text-xs text-slate-200 mt-1">
                          "Why do farmer suicides persist in Vidarbha (Maharashtra) despite government loan waiver packages?"
                        </p>
                      </div>
                    )}
                    {researchStepIndex === 1 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 uppercase">Step 2: Systematic Observation</h4>
                        <p className="text-xs text-slate-200 mt-1">
                          Field visits to Yavatmal & Akola districts; recording cropping patterns, rain deficits, and informal moneylender contracts.
                        </p>
                      </div>
                    )}
                    {researchStepIndex === 2 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 uppercase">Step 3: Classification</h4>
                        <p className="text-xs text-slate-200 mt-1">
                          Classifying households by landholding size (marginal &lt; 1ha, small 1-2ha), credit source (bank vs local sahukar), and caste group.
                        </p>
                      </div>
                    )}
                    {researchStepIndex === 3 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 uppercase">Step 4: Hypothesis Formulation</h4>
                        <p className="text-xs text-slate-200 mt-1">
                          "Small cotton farmers dependent on informal, non-institutional moneylenders at 60% APR face acute insolvency leading to anomic distress."
                        </p>
                      </div>
                    )}
                    {researchStepIndex === 4 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 uppercase">Step 5: Verification & Testing</h4>
                        <p className="text-xs text-slate-200 mt-1">
                          Cross-verifying NCRB suicide records with NSSO Agricultural Indebtedness survey data and district revenue audit sheets.
                        </p>
                      </div>
                    )}
                    {researchStepIndex === 5 && (
                      <div>
                        <h4 className="text-xs font-bold text-emerald-300 uppercase">Step 6: Prediction & Generalisation</h4>
                        <p className="text-xs text-slate-200 mt-1">
                          Predicting that expanding low-interest institutional micro-credit and crop insurance directly reduces suicide rates among marginal cultivators.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-30"
            >
              ← Prev Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-500"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h2 className="text-base font-bold text-emerald-400">🧪 The Sociologist’s Free Sandbox</h2>
            <p className="text-xs text-slate-300 mt-1">
              Test ideas, compare theoretical frameworks, and adjust variables freely. No grading, no time pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Filter by theoretical school */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">1. Paradigm Filter</h3>
              <div className="space-y-1.5">
                {[
                  { key: 'all', label: 'All Classical Thinkers' },
                  { key: 'functionalist', label: 'Functionalist (Comte, Spencer, Durkheim)' },
                  { key: 'conflict', label: 'Conflict Theory (Karl Marx)' },
                  { key: 'interpretive', label: 'Interpretive / Verstehen (Max Weber)' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => {
                      setSandboxThinkerFilter(item.key as 'all' | 'functionalist' | 'conflict' | 'interpretive');
                      audioManager.play('tap');
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all border ${
                      sandboxThinkerFilter === item.key
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800/60 border-slate-700/50 text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Methodological Quantitative vs Qualitative balance */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">2. Methodological Balance</h3>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Quantitative / Survey</span>
                <span>Qualitative / Ethnography</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={sandboxMethodSlider}
                onChange={e => {
                  setSandboxMethodSlider(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                {sandboxMethodSlider < 30 && '📊 Focus on Census of India, NSSO, and NFHS statistical data for macro patterns.'}
                {sandboxMethodSlider >= 30 && sandboxMethodSlider <= 70 && '⚖️ Mixed Methods: Srinivas & Beteille approach combining village fieldwork with statistical survey data.'}
                {sandboxMethodSlider > 70 && '📝 In-depth Verstehen & Participant Observation (Elwin in Bastar, Karve among Khasis).'}
              </div>
            </div>

            {/* Core Indian Sociological Concepts */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">3. Concept Showcase</h3>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  'Caste & Stratification (Ghurye/Beteille)',
                  'Sanskritization (M.N. Srinivas)',
                  'Kinship Systems (Iravati Karve)',
                  'Tribal Autonomy (N.K. Bose)'
                ].map(concept => (
                  <button
                    key={concept}
                    onClick={() => {
                      setSandboxCustomConcept(concept);
                      audioManager.play('tap');
                    }}
                    className={`p-2 rounded-lg text-left text-xs border ${
                      sandboxCustomConcept === concept
                        ? 'bg-slate-800 border-purple-500 text-purple-200 font-bold'
                        : 'bg-slate-850 border-slate-700/50 text-slate-400'
                    }`}
                  >
                    {concept}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-2xl shadow-xl hover:from-emerald-500 hover:to-teal-500"
            >
              Ready for Adaptive Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress and Adaptive Tier Indicators */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                  difficulty === 'foundation'
                    ? 'bg-green-950/70 border-green-500 text-green-300'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                    : 'bg-gold-950/70 border-gold-500 text-gold-300'
                }`}
              >
                {difficulty} tier
              </motion.span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-slate-800 rounded-full text-slate-300 border border-slate-700">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs font-mono text-emerald-400">
              Mastery: <span className="font-bold">{masteryLevel}</span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Question Card */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">{challenge.question}</h3>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm border transition-all flex items-center justify-between ${
                      wrongFlash
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span>{opt}</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold">✓</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: DRAG-LABEL (Interactive Diagram Matching) */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto their matching targets below:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-semibold cursor-grab active:cursor-grabbing shadow"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col items-center justify-center transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400 mb-1">{targetId.replace('_', ' ')}</span>
                      <span className="text-xs font-semibold">{droppedLabels[targetId] || 'Drop label here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Check Stage Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT (Chronological Sequence Arrangement) */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder the items into the correct sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span className="font-bold text-emerald-400 mr-2">{displayIdx + 1}.</span>
                      <span className="flex-1">{item}</span>
                      <span className="text-slate-500 text-xs">⠿</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value..."
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-44 focus:border-emerald-500 focus:outline-none"
                    aria-label="Numeric input answer"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md disabled:opacity-40"
                  >
                    Check Figure
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructPartClick(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-semibold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs rounded-lg flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => handleConstructRemove(idx)}
                        className="text-rose-400 hover:text-rose-200 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to assemble the logical chain</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConstructSubmit}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md disabled:opacity-40"
                >
                  Verify Chain Construction
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    📚 Sociological Breakdown & Explanation:
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono">Step {revealedSteps + 1}</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{i + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & View Mastery →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL FEEDBACK ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <span className="text-5xl">🎓✨</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Sociological Simulation Complete!</h2>
            <p className="text-emerald-300 font-bold text-lg">
              Final Score: {Math.max(0, 100 - errors * 5)}% • Mastery Level: {masteryLevel.toUpperCase()}
            </p>

            {/* Exact Motivational Feedback tier based on error count */}
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 max-w-2xl mx-auto space-y-1 text-center">
              <h3 className="text-base sm:text-lg font-black text-amber-300">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {errors === 0
                  ? 'Outstanding analytical precision! You demonstrated complete mastery across all classical thinkers, sociological perspectives, and Indian methodological traditions.'
                  : errors <= 3
                  ? 'Solid grasp of sociological theory! You correctly differentiated between functionalist, conflict, and interpretive paradigms with high competence.'
                  : errors <= 7
                  ? 'You are making steady progress. Review the misconception diagnostics below to sharpen your distinction between empirical and common-sense views.'
                  : 'Sociology requires looking past everyday assumptions to grasp deeper structural forces. Revisit the interactive labs and you will master this material!'}
              </p>
            </div>
          </div>

          {/* Misconceptions Hit Diagnostics */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-widest flex items-center gap-1.5">
                <span>⚠️</span> Your Misconception Diagnostic Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
          <div className="p-5 bg-gradient-to-r from-gold-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-gold-500/40 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2.5 bg-gold-900/60 rounded-xl border border-gold-700/50">📅</span>
                <div>
                  <h4 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 SRS)
                  </h4>
                  <p className="text-xs text-slate-400">Scientifically timed review for permanent retention</p>
                </div>
              </div>
              <div className="px-4 py-2 bg-gold-600/30 border border-gold-400 text-gold-200 font-bold rounded-xl text-xs sm:text-sm shadow">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </div>
            </div>

            <div className="p-3.5 bg-slate-950/80 rounded-xl border border-gold-900/40 flex items-center justify-between text-xs text-slate-300">
              <span>
                Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}):{' '}
                <strong className="text-gold-200">
                  {errors === 0
                    ? '0 errors → Recommended interval: review in 7 days (Mastered)'
                    : errors <= 3
                    ? '1–3 errors → Recommended interval: review in 3 days (Reinforce)'
                    : '4+ errors → Recommended interval: review in 1 day (Urgent review)'}
                </strong>
              </span>
              <span className="font-mono text-gold-400 text-xs font-semibold">SRS Active</span>
            </div>
          </div>

          {/* Real-World Investigative Project */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔍</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            </div>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK BANNERS & OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Theoretical Masterstroke!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_SociologyEmergenceSociologyAnthropologySim;