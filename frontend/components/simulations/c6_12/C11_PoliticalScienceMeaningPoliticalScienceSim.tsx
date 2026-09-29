'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C11_POL_001 = 'c11_pol_001';
const NODE_C11_POL_002 = 'c11_pol_002';
const NODE_C11_POL_003 = 'c11_pol_003';
const NODE_C11_POL_004 = 'c11_pol_004';
const NODE_C11_POL_005 = 'c11_pol_005';
const NODE_C11_POL_006 = 'c11_pol_006';
const NODE_C11_POL_007 = 'c11_pol_007';
const NODE_C11_POL_008 = 'c11_pol_008';
const NODE_C11_POL_009 = 'c11_pol_009';
const NODE_C11_POL_010 = 'c11_pol_010';

const ALL_NODE_IDS = [
  NODE_C11_POL_001,
  NODE_C11_POL_002,
  NODE_C11_POL_003,
  NODE_C11_POL_004,
  NODE_C11_POL_005,
  NODE_C11_POL_006,
  NODE_C11_POL_007,
  NODE_C11_POL_008,
  NODE_C11_POL_009,
  NODE_C11_POL_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Constitutional Architect & Republic Sim',
  intro:
    'You are appointed Chief Policy Advisor to a newly independent republic drafting its supreme constitutional charter. To build a lasting democracy, you must understand what Political Science is, dissect the elements of the State, balance conflicting social contracts (Hobbes, Locke, Rousseau), and evaluate competing ideological visions from Liberalism to Communism.',
  context:
    'From ancient janapadas and Kautilya’s Arthashastra to the Constituent Assembly of 1946–1949 and modern Lok Sabha dynamics, every decision tests your mastery of political philosophy and statecraft.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Imagine a catastrophic global event wipes out all written laws, police forces, and courts overnight. What is the fundamental difference between human society continuing to cooperate versus descending into immediate violent chaos?',
  options: [
    'God directly appoints a monarch to enforce cosmic order through divine right',
    'Humans agree to enter a social contract or political association to establish authoritative order',
    'Society automatically functions as a stateless communist utopia without any authority',
    'The physical territory disappears because a State cannot exist without borders',
  ],
  correctIndex: 1,
  hintAfter:
    'Curious? Political thinkers have debated this for 2,500 years — let us explore how Aristotle, Hobbes, Locke, and Marx unlocked the science of power!',
};

// ─── PREDICTION QUESTIONS (Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001',
    question:
      'If you reduce a country’s Sovereignty slider below 50% while keeping Population, Territory, and Government fully active, what will happen to its Statehood status?',
    options: [
      'It remains a fully sovereign constitutional state because population and territory dominate',
      'It collapses into a Non-State / Subjugated Colony entity because sovereignty is indispensable',
      'The government automatically transforms into direct democracy',
      'The territory expands exponentially to compensate for lost sovereignty',
    ],
    correctIndex: 1,
    explanation:
      'Sovereignty is the supreme, absolute, and uncontrolled authority of the State. Without internal supremacy and external independence, an entity is merely a colony, dependency, or protectorate, not a sovereign State.',
    verifyInstruction:
      'Navigate to Step 2 (The Four Pillars of Statehood) in the Exploration Lab. Lower the Sovereignty slider below 50% and observe the Statehood Verdict.',
  },
  {
    id: 'pred_002',
    question:
      'Under the Social Contract framework, what fundamental change occurs when switching from Thomas Hobbes to John Locke regarding individual natural rights?',
    options: [
      'Citizens surrender all natural rights unconditionally to an absolute monarch',
      'Citizens retain inalienable rights (Life, Liberty, Property) and government becomes a revocable fiduciary trust',
      'Citizens abolish all laws and live permanently in a lawless state of nature',
      'The sovereign is declared divinely appointed and immune from revolution',
    ],
    correctIndex: 1,
    explanation:
      'Unlike Hobbes’s Leviathan where rights are unconditionally surrendered for physical survival, Locke argued that natural rights (Life, Liberty, Estate) are retained. Government holds power solely in trust to protect those rights.',
    verifyInstruction:
      'Navigate to Step 4 (Social Contract Duel) in the Exploration Lab. Switch the selector between Hobbes and Locke to observe how rights surrendered and sovereign limits change.',
  },
];

// ─── OBSERVATION QUESTIONS (What Do You Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001',
    question:
      'In the State vs Government vs Nation Explorer (Step 3), what do you notice about the outer State boundary when toggling between 17th Lok Sabha, 18th Lok Sabha Coalition, and Caretaker regime?',
    options: [
      'The outer State container collapses and is re-created every election cycle',
      'The outer State box remains permanent and sovereign, while only the inner Government agent updates',
      'The Nation circle turns into an absolute monarchy',
      'The Constitution is automatically repealed and rewritten',
    ],
    correctIndex: 1,
    observableOptions: [
      'The outer State boundary remains continuous with 100% sovereignty intact',
      'The inner Government box updates its label and constitutional status',
      'The socio-cultural Nation remains a distinct community of sentiment',
      'All of the above features are observed simultaneously',
    ],
    explanation:
      'Observation confirms the core distinction: Government is merely the temporary administrative machinery that changes periodically, whereas the State is permanent and perpetual.',
  },
  {
    id: 'obs_002',
    question:
      'In the Ideological Spectrum Radar (Step 5), what do you notice on the live radar canvas when shifting Economic Organization to 90% (Collective/Marxist)?',
    options: [
      'The animated target node moves toward the left Collective/Communism quadrant with a prominent red glow',
      'The entire canvas freezes and resets to default values',
      'The Political Pluralism slider automatically locks to 100%',
      'The radar collapses into a single static point at the origin',
    ],
    correctIndex: 0,
    observableOptions: [
      'The pulsing node shifts to the left quadrant labeled COLLECTIVE (COMMUNISM)',
      'The canvas shadow glow switches from indigo to red',
      'The status badge updates to Socialized Means of Production',
      'All of the above visual changes occur in real time',
    ],
    explanation:
      'Visual observation reveals how Marxist theory places the mode of production at the base, shifting the system toward collective ownership of productive forces.',
  },
];

// ─── INTERFACES ───
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
  nodeId: NODE_C11_POL_001,
  title: 'Political Science: Meaning, State & Ideologies',
  definition:
    'Political Science is the academic discipline that studies the State, government, political processes, and the authoritative allocation of power and values in human society.',
  eli5:
    'Think of society as a massive cooperative game. Politics is the live match being played, while Political Science is the rulebook, game analysis, and study of why institutions exist.',
  misconceptions: [
    {
      misconception: 'Political Science is merely the study of current political scandals and party rivalries.',
      correction:
        'Politics is the live contestation for power; Political Science is the systematic, theoretical, and empirical discipline studying institutions, power, and the State.',
    },
    {
      misconception: 'State and Government are interchangeable synonyms.',
      correction:
        'The State is the permanent sovereign entity with four elements (Population, Territory, Government, Sovereignty). Government is merely its temporary administrative machinery.',
    },
    {
      misconception: 'Every cultural Nation in the world automatically possesses its own sovereign State.',
      correction:
        'A Nation is a socio-cultural community (e.g. Kurds, Palestinians) that may lack sovereignty, while a State can encompass multiple nations (e.g. India, United Kingdom, Switzerland).',
    },
    {
      misconception: 'Hobbes, Locke, and Rousseau all advocated for absolute unconditional monarchical rule.',
      correction:
        'Only Hobbes advocated for an absolute sovereign (Leviathan). Locke argued for limited government with natural rights, and Rousseau championed popular sovereignty via the General Will.',
    },
    {
      misconception: 'Marxist "Dictatorship of the Proletariat" means a perpetual tyrannical one-man dictatorship.',
      correction:
        'Marx conceptualized it as a temporary transitional phase where the working-class majority exercises democratic authority to dismantle capitalist exploitation before the State withers away.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Who is regarded as the Father of Political Science?',
      options: ['Karl Marx', 'Aristotle', 'Thomas Hobbes', 'John Locke'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is NOT an essential element of the State?',
      options: ['Territory', 'Sovereignty', 'Political Party', 'Population'],
      correctIndex: 2,
    },
    {
      question: 'Harold Lasswell famously defined politics as:',
      options: [
        'The divine manifestation of God on Earth',
        'Who gets what, when, how',
        'The perpetual war of all against all',
        'The rule of philosopher kings',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which theory of State origin argues that the State emerged gradually via kinship, religion, economy, and war?',
      options: ['Divine Origin Theory', 'Social Contract Theory', 'Evolutionary Theory', 'Force Theory'],
      correctIndex: 2,
    },
    {
      question: 'Under Locke’s social contract, which three natural rights are inalienable?',
      options: [
        'Power, Prestige, Property',
        'Life, Liberty, Property',
        'Equality, Fraternity, Divinity',
        'Security, Conquest, Order',
      ],
      correctIndex: 1,
    },
    {
      question: 'What happens to the State in the final utopian phase of Communism according to Friedrich Engels?',
      options: ['It expands globally', 'It withers away', 'It becomes a divine monarchy', 'It merges with private corporations'],
      correctIndex: 1,
    },
    {
      question: 'Which Indian constitutional article guarantees the Right to Life and Personal Liberty?',
      options: ['Article 14', 'Article 19', 'Article 21', 'Article 324'],
      correctIndex: 2,
    },
    {
      question: 'The Kurds dispersed across Turkey, Iraq, Iran, and Syria are best categorized as a:',
      options: ['Sovereign State', 'Nation without a State', 'Government organ', 'Religious cult'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrate deep comprehension of Political Science definitions, 5 branches of scope, 4 elements of the State, distinction among State/Government/Nation, Divine & Evolutionary theories, Hobbes/Locke/Rousseau contracts, and Liberalism vs Communism.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'The Evolution of Meaning (Classical vs Modern)',
    instruction: 'Toggle between the Classical (State-centric) lens and Modern (Power & Systems) lens to see how the scope expanded.',
    interactionType: 'lens-toggle',
    nodeId: NODE_C11_POL_001,
  },
  {
    title: 'The Four Pillars of Statehood',
    instruction: 'Activate the 4 indispensable elements: Population, Territory, Government, and Sovereignty to forge a Sovereign State.',
    interactionType: 'elements-forge',
    nodeId: NODE_C11_POL_003,
  },
  {
    title: 'State vs Government vs Nation Explorer',
    instruction: 'Test permanence and sovereignty by changing the ruling government or cultural nation within a permanent constitutional State.',
    interactionType: 'triad-simulator',
    nodeId: NODE_C11_POL_004,
  },
  {
    title: 'Social Contract Duel: Hobbes vs Locke vs Rousseau',
    instruction: 'Adjust the "State of Nature" tension slider and observe how Hobbes, Locke, and Rousseau solve social conflict.',
    interactionType: 'contract-slider',
    nodeId: NODE_C11_POL_006,
  },
  {
    title: 'Ideological Spectrum: Liberalism to Communism',
    instruction: 'Shift the economic and political control levers to contrast Liberal individual freedom with Communist collective ownership.',
    interactionType: 'ideology-matrix',
    nodeId: NODE_C11_POL_009,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Counsel & Policy Lab',
  description:
    'Step into the shoes of a constitutional jurist: Analyze the 2024 general election mandate, trace how the 73rd Amendment reflects the Evolutionary Theory’s village roots, and draft a 3-point charter balancing Lockean rights with Directive Principles.',
  steps: [
    'Analyze an Indian Supreme Court landmark case (e.g., Puttaswamy 2017 on Article 21 Privacy) through the lens of Liberalism.',
    'Map how the Election Commission of India (Article 324) enables peaceful democratic transition of Government while preserving the State.',
    'Compare the Scottish Devolution in the UK with India’s multinational federalism under Article 1 and Article 3.',
    'Formulate a policy solution for local self-governance utilizing Gram Sabhas (Article 40 & 73rd Amendment).',
  ],
};

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (8 challenges)
  {
    id: 'ch_001_f',
    nodeId: NODE_C11_POL_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which ancient Greek philosopher coined Political Science as the "master science" in his classic treatise "Politics"?',
    options: ['Plato', 'Aristotle', 'Socrates', 'Herodotus'],
    correctIndex: 1,
    explanation: 'Aristotle termed Political Science the "master science" because it examines the highest moral good of the community and the organisation of the city-state (polis).',
    hints: [
      'He was a student of Plato and tutor to Alexander the Great.',
      'He is widely regarded as the Father of Political Science.',
      'His monumental work is titled "Politics".',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_f',
    nodeId: NODE_C11_POL_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each of the 4 core branches of Political Science to its correct primary focus on the institutional matrix.',
    dragItems: [
      { label: 'Political Theory', targetId: 'box_theory' },
      { label: 'Comparative Politics', targetId: 'box_comparative' },
      { label: 'International Relations', targetId: 'box_ir' },
      { label: 'Public Administration', targetId: 'box_pubad' },
    ],
    correctMapping: {
      box_theory: 'Political Theory',
      box_comparative: 'Comparative Politics',
      box_ir: 'International Relations',
      box_pubad: 'Public Administration',
    },
    explanation: 'Political Theory examines normative concepts (justice, rights); Comparative Politics analyzes cross-national systems; IR investigates global interstate anarchy; Public Administration handles policy implementation.',
    hints: [
      'Think which branch examines values like justice vs which analyzes cross-country systems.',
      'The executive machinery and civil service belong to Public Administration.',
      'Global diplomacy and foreign policy belong to International Relations.',
    ],
  },
  {
    id: 'ch_003_f',
    nodeId: NODE_C11_POL_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents the four essential and indispensable elements of the State?',
    options: [
      'Monarchy, Army, Religion, Territory',
      'Population, Territory, Government, Sovereignty',
      'Constitution, President, Currency, Police',
      'Nation, Language, Flag, Parliament',
    ],
    correctIndex: 1,
    explanation: 'Political theorists from Garner to Woodrow Wilson established that a State requires Population (human base), Territory (spatial jurisdiction), Government (machinery), and Sovereignty (supreme authority).',
    hints: [
      'A State needs people, physical space, administrative organs, and supreme independence.',
      'Look for the option containing both Sovereignty and Territory.',
      'The four pillars are Population, Territory, Government, and Sovereignty.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_004_f',
    nodeId: NODE_C11_POL_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In June 2024, the 18th Lok Sabha election led to the formation of a new Union Council of Ministers. What fundamentally changed?',
    options: [
      'The Indian State ceased to exist and a new State was created',
      'The Government changed, while the sovereign Indian State remained continuous and permanent',
      'The Territory of India was dissolved and reconstituted',
      'The Indian Nation lost its sovereignty',
    ],
    correctIndex: 1,
    explanation: 'Government is merely the temporary administrative organ of the State. The State is permanent and has endured unbroken since 26 January 1950.',
    hints: [
      'Recall the distinction between the permanent house (State) and the temporary tenant (Government).',
      'Elections change who holds office in the Government, not the State itself.',
      'The sovereign Indian State continued uninterrupted throughout the 2024 elections.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_005_f',
    nodeId: NODE_C11_POL_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Divine Origin Theory, why was disobedience to a ruling monarch considered impossible to justify?',
    options: [
      'Because the monarch was elected by universal adult franchise',
      'Because the king was viewed as God’s representative on Earth, making rebellion a direct sin against God',
      'Because the Supreme Court held judicial review over royal decrees',
      'Because the social contract explicitly permitted only peaceful protests',
    ],
    correctIndex: 1,
    explanation: 'Under the Divine Right of Kings, royal authority was divinely sanctioned and absolute. Disobedience was viewed not just as a civic crime, but as a religious sin against the Almighty.',
    hints: [
      'Think about where the king claimed his authority came from — God or the people?',
      'Disobedience under this theory carries both worldly punishment and afterlife damnation.',
      'The ruler was seen as God’s vicegerent or shadow on Earth.',
    ],
  },
  {
    id: 'ch_006_f',
    nodeId: NODE_C11_POL_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How did Thomas Hobbes famously describe human life in the pre-political "State of Nature" in his 1651 work Leviathan?',
    options: [
      'Harmonious, peaceful, civilized, spiritual, and enlightened',
      'Solitary, poor, nasty, brutish, and short',
      'Free, equal, idyllic, and completely classless',
      'Commercial, industrial, prosperous, and strictly regulated',
    ],
    correctIndex: 1,
    explanation: 'Hobbes depicted the State of Nature as a constant war of all against all driven by competition, diffidence, and glory, rendering life "solitary, poor, nasty, brutish, and short."',
    hints: [
      'Look for the famous 5-adjective quote from Chapter XIII of Leviathan.',
      'Without a common sovereign power, fear and violent death ruled human life.',
      'The phrase begins with "solitary, poor...".',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_007_f',
    nodeId: NODE_C11_POL_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is NOT one of the four foundational pillars of Liberalism in the ISC syllabus?',
    options: [
      'Recognition of the importance of individuals',
      'Support for human rights and personal freedom',
      'Total state ownership of all factories, land, and capital',
      'Constitutional government and support for democracy',
    ],
    correctIndex: 2,
    explanation: 'Total collective ownership of the means of production is a core feature of Communism, whereas Liberalism champions individual rights, private property, and limited constitutional government.',
    hints: [
      'Liberalism places the individual and personal freedom at the center.',
      'Abolishing private property belongs to a different ideology (Marxism/Communism).',
      'Total state control over factories is directly opposed to classical liberal economic freedom.',
    ],
  },
  {
    id: 'ch_008_f',
    nodeId: NODE_C11_POL_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who co-authored "The Communist Manifesto" (1848) and articulated the theory of historical materialism?',
    options: ['John Locke and Thomas Hobbes', 'Karl Marx and Friedrich Engels', 'Aristotle and Plato', 'J.S. Mill and Jeremy Bentham'],
    correctIndex: 1,
    explanation: 'Karl Marx and Friedrich Engels systematically authored The Communist Manifesto and Das Kapital, establishing the foundations of scientific socialism and dialectical materialism.',
    hints: [
      'They formulated the concepts of class struggle and the dictatorship of the proletariat.',
      'One wrote Das Kapital and the other wrote The Origin of the Family, Private Property and the State.',
      'Marx & Engels.',
    ],
    misconceptionIndex: 4,
  },

  // Tier 2: Standard (7 challenges)
  {
    id: 'ch_009_s',
    nodeId: NODE_C11_POL_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Analyze Harold Lasswell’s modern definition of politics ("Who gets what, when, how") versus classical state-centric views (Garner, Bluntschli). What represents the key conceptual shift?',
    options: [
      'Shift from dynamic informal power contestation to strictly legalistic definitions',
      'Shift from static institutional study of the State to dynamic study of power, behaviour, and resource allocation',
      'Rejection of democratic voting in favor of hereditary feudal hierarchies',
      'Exclusion of non-state actors, corporations, and civil society from political analysis',
    ],
    correctIndex: 1,
    explanation: 'Modern Political Science expanded the classical focus beyond formal State structures to encompass behavioural power dynamics, value allocations (Easton), and decision-making processes across all human groups.',
    hints: [
      'Classical thinkers focused almost exclusively on the formal State.',
      'Lasswell asked about power and resources: who gets what, when, how.',
      'The modern shift moves from static institutions to dynamic human behavior and power.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_010_s',
    nodeId: NODE_C11_POL_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Kurdish people share a distinct language, culture, and historical consciousness across parts of Turkey, Iraq, Iran, and Syria, but lack sovereign territorial independence. How are they classified in Political Science?',
    options: ['A sovereign State', 'A Nation without a State', 'A temporary Government', 'A modern Polis'],
    correctIndex: 1,
    explanation: 'The Kurds constitute a cultural-sociological Nation united by shared identity and heritage, but do not form a sovereign State because they lack independent sovereign territory.',
    hints: [
      'They possess cultural unity (Nation) but lack sovereign borders (State).',
      'A community of sentiment without sovereignty is a Nation.',
      'They are an internationally renowned example of a Nation without a State.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_011_s',
    nodeId: NODE_C11_POL_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Thomas Hobbes’s Social Contract, why can the sovereign Leviathan never be legitimately accused of committing injustice against the citizens?',
    options: [
      'Because the sovereign was crowned by the Pope',
      'Because the contract is made among the subjects themselves; the sovereign is not a party to the contract and holds authorized power',
      'Because the Constitution contains an explicit immunity clause',
      'Because citizens vote on every individual royal decree',
    ],
    correctIndex: 1,
    explanation: 'In Hobbes’s formulation, individuals mutually covenant with one another to surrender rights to the sovereign. The sovereign is the created outcome, not a contracting party, and thus cannot breach the covenant.',
    hints: [
      'Who actually signed the contract — the people with each other, or the people with the king?',
      'Since the sovereign never entered the pact, he cannot break its terms.',
      'The subjects authorized the sovereign’s will as their own collective action.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_012_s',
    nodeId: NODE_C11_POL_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does John Locke’s conception of the Social Contract fundamentally differ from Thomas Hobbes’s model regarding natural rights and state power?',
    options: [
      'Locke demands total unconditional surrender of all rights to an absolute monarch',
      'Locke argues that natural rights (life, liberty, property) are retained; government is a fiduciary trust that may be overthrown if it violates those rights',
      'Locke rejects private property while Hobbes guarantees free-market capitalism',
      'Locke insists that only military commanders should govern the commonwealth',
    ],
    correctIndex: 1,
    explanation: 'Locke founded constitutional liberalism: individuals delegate limited authority to government as a fiduciary trust specifically to protect pre-existing natural rights (Life, Liberty, Property), reserving the right of revolution.',
    hints: [
      'Think about limited government vs absolute Leviathan.',
      'In Locke’s view, did people surrender ALL rights or keep their natural rights?',
      'Locke argued government holds power in trust and can be dissolved if it breaches trust.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_013_s',
    nodeId: NODE_C11_POL_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the vital distinction Jean-Jacques Rousseau draws between the "General Will" (volonté générale) and the "Will of All" (volonté de tous)?',
    options: [
      'The General Will is the majority vote; the Will of All is the decree of the king',
      'The General Will always aims at the common good of the entire community; the Will of All is merely the aggregate sum of private, selfish interests',
      'The General Will represents foreign treaties; the Will of All represents domestic trade',
      'There is no distinction; Rousseau used both as identical mathematical terms',
    ],
    correctIndex: 1,
    explanation: 'Rousseau emphasized that the General Will seeks the universal public interest and moral common good, whereas the Will of All is merely the arithmetic sum of selfish, sectional private desires.',
    hints: [
      'One seeks the common good of all citizens; the other is just factional bargaining.',
      'A selfish majority vote is still the Will of All, not the General Will.',
      'The General Will is indivisible, inalienable, and aims strictly at public justice.',
    ],
  },
  {
    id: 'ch_014_s',
    nodeId: NODE_C11_POL_008,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the five converging forces of the Evolutionary Theory of the State in their typical historical sequence of emergence.',
    sortItems: [
      'Kinship (Family expanding into Clan and Tribe)',
      'Religion (Sacred rituals and Priestly legitimation)',
      'Economic Factors (Settled agriculture, private property, trade routes)',
      'Wars and Conflicts (Military leadership hardening into permanent command)',
      'Crystallization of Political Power (Hereditary kingship, state treasury, standing army)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The Evolutionary Theory demonstrates how the State grew organically: kinship formed the initial human unit, religion legitimized authority, economic surplus demanded regulation, war concentrated power, and political structures formalized.',
    hints: [
      'Blood ties and family come first (Kinship).',
      'Priests and sacred rituals follow to sanctify the chieftain.',
      'Agriculture and property create surplus, followed by warfare and mature state institutions.',
    ],
  },
  {
    id: 'ch_015_s',
    nodeId: NODE_C11_POL_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How does Karl Marx’s "Dialectical Materialism" invert G.W.F. Hegel’s philosophical dialectic?',
    options: [
      'Marx argued that divine revelations guide human historical progress',
      'Marx asserted that material economic conditions (mode of production), not abstract ideas or Spirit (Geist), drive historical contradictions and progress',
      'Marx claimed that history moves in a straight unbroken line without any contradictions',
      'Marx replaced material factories with spiritual enlightenment as the economic base',
    ],
    correctIndex: 1,
    explanation: 'Marx famously stated he found Hegel standing on his head and turned him right side up: material economic relations (the base) determine the legal, religious, and political superstructure, not disembodied ideas.',
    hints: [
      'Hegel believed ideas (idealism) drove history.',
      'Marx said human beings must first eat, shelter, and produce (materialism) before they can philosophize.',
      'The economic mode of production drives the historical dialectic.',
    ],
    misconceptionIndex: 4,
  },

  // Tier 3: Advanced (7 challenges)
  {
    id: 'ch_016_a',
    nodeId: NODE_C11_POL_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In 2015, the Supreme Court of India in Shreya Singhal v. Union of India struck down Section 66A of the IT Act, which had been passed by an elected Parliament. How does this decision illustrate the core principle of Liberalism over pure Majoritarianism?',
    options: [
      'It shows that the judiciary is an absolute sovereign Leviathan unaccountable to anyone',
      'It demonstrates that liberal constitutionalism protects individual free speech against legislative majorities through judicial review',
      'It proves that India has adopted a communist economic system',
      'It reflects the Divine Right of the Supreme Court judges over elected representatives',
    ],
    correctIndex: 1,
    explanation: 'Liberalism insists that democracy is not merely majority rule, but constitutional government where minority and individual fundamental rights (Article 19(1)(a)) are shielded from legislative overreach by an independent judiciary.',
    hints: [
      'Consider the distinction between pure procedural democracy and liberal constitutionalism.',
      'Fundamental rights place constitutional boundaries on what a legislative majority may enact.',
      'The Supreme Court exercised judicial review under Article 32/13 to safeguard free speech.',
    ],
  },
  {
    id: 'ch_017_a',
    nodeId: NODE_C11_POL_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the Territorial Waters and Maritime Zones Act, 1976 and UNCLOS, how many nautical miles into the sea does India’s sovereign territorial sea extend from the baseline?',
    correctAnswer: 12,
    tolerance: 0.5,
    unit: 'nautical miles',
    explanation: 'A coastal State exercises sovereign territorial jurisdiction over its territorial sea up to 12 nautical miles from the baseline, illustrating the maritime dimension of the Territory element.',
    hints: [
      'Think of international maritime law standards under UNCLOS.',
      'It is a standard dozen nautical miles.',
      '12 nautical miles.',
    ],
  },
  {
    id: 'ch_018_a',
    nodeId: NODE_C11_POL_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Dr. B. R. Ambedkar during the Constituent Assembly debates defended representative parliamentary democracy against Rousseau’s insistence on direct, unrepresented democracy. What was Ambedkar’s primary rationale for India?',
    options: [
      'He believed monarchs alone possess the virtue to govern large empires',
      'Given India’s continental scale, vast population, and social diversity, direct democracy was unworkable; representative constitutionalism with adult franchise was essential',
      'He wanted to abolish the legislature and rule by executive decree',
      'He believed only property owners should have the right to vote',
    ],
    correctIndex: 1,
    explanation: 'Ambedkar recognized that while Rousseau’s direct democracy suited small Swiss cantons or ancient Greek poleis, a vast, diverse nation of hundreds of millions required representative institutions anchored in constitutional morality.',
    hints: [
      'Consider the sheer size and diversity of India in 1947–1950.',
      'Could 350+ million citizens assemble in a single field to vote on every law directly?',
      'Representative parliamentary democracy operationalized popular sovereignty at scale.',
    ],
  },
  {
    id: 'ch_019_a',
    nodeId: NODE_C11_POL_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In 1957, the Communist Party of India led by E.M.S. Namboodiripad formed the state government in Kerala through democratic elections under the Constitution of India. Why is this event historically and theoretically significant in Political Science?',
    options: [
      'It proved that communist theory can only function through violent armed guerrilla insurrection',
      'It was the world’s first democratically elected communist ministry, demonstrating a peaceful parliamentary pathway to socialist reform within a constitutional framework',
      'It resulted in the immediate withering away of the state of Kerala within 48 hours',
      'It formally restored the Divine Origin Theory in South India',
    ],
    correctIndex: 1,
    explanation: 'The 1957 Kerala election demonstrated that Marxist parties could achieve executive power via universal adult suffrage and implement agrarian land reforms within a multi-party constitutional democracy.',
    hints: [
      'Think about how communist regimes historically seized power (1917 Russia, 1949 China) vs Kerala in 1957.',
      'It was achieved via the ballot box under the Indian Constitution.',
      'It proved that democratic electoral participation could serve as a pathway for socialist governance.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_020_a',
    nodeId: NODE_C11_POL_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'During the 1975–1977 National Emergency in India, fundamental rights under Article 21 were suspended. How was this constitutional crisis subsequently resolved by the 44th Constitutional Amendment Act, 1978 in a Lockean spirit?',
    options: [
      'By making the Prime Minister an absolute sovereign immune from all judicial review',
      'By explicitly declaring that Article 20 and Article 21 (Right to Life and Personal Liberty) can never be suspended even during a National Emergency',
      'By abolishing the Supreme Court of India completely',
      'By replacing the Constitution with Hobbes’s Leviathan text',
    ],
    correctIndex: 1,
    explanation: 'The 44th Amendment Act (1978) codified the Lockean principle that the fundamental right to life and liberty is so foundational to human dignity that no emergency decree can suspend it.',
    hints: [
      'Think of how India corrected the overreach of the Emergency.',
      'Which fundamental right is the cornerstone of personal liberty?',
      'Articles 20 and 21 were made non-suspendable even under Article 352.',
    ],
  },
  {
    id: 'ch_021_a',
    nodeId: NODE_C11_POL_008,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the correct institutional synthesis of Kautilya’s Saptanga Theory of the State by selecting the 5 core components from the palette.',
    availableParts: ['Swami (King/Ruler)', 'Amatya (Ministers/Bureaucracy)', 'Janapada (Territory & Population)', 'Durga (Fort/Defense)', 'Kosha (Treasury)'],
    targetState: 'Swami (King/Ruler) Amatya (Ministers/Bureaucracy) Janapada (Territory & Population) Durga (Fort/Defense) Kosha (Treasury)',
    validationHint: 'Select all 5 organs of Kautilya’s state in classical order.',
    explanation: 'Kautilya’s Saptanga theory in the Arthashastra conceived the State as an organic whole comprising 7 limbs: Swami, Amatya, Janapada, Durga, Kosha, Danda (army), and Mitra (allies).',
    hints: [
      'Start with the Swami (the sovereign head).',
      'Add the ministers (Amatya) and territory/people (Janapada).',
      'Include defense (Durga) and treasury (Kosha).',
    ],
  },
  {
    id: 'ch_022_a',
    nodeId: NODE_C11_POL_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Switzerland encompasses four distinct linguistic communities (German, French, Italian, Romansh) under a single federal constitution. In Political Science, Switzerland is best described as:',
    options: [
      'Four separate sovereign States with no shared government',
      'A single sovereign State comprising a multinational society bound by constitutional patriotism',
      'A totalitarian dictatorship of the proletariat',
      'A Nation without any territory or government',
    ],
    correctIndex: 1,
    explanation: 'Switzerland demonstrates that a single sovereign State can successfully unite multiple linguistic and cultural nations through federalism, local cantonal autonomy, and direct democracy.',
    hints: [
      'Is Switzerland one country/state or four separate countries?',
      'Multiple cultural-linguistic nations live under one federal State.',
      'It exemplifies a multinational State with strong federal cohesion.',
    ],
    misconceptionIndex: 2,
  },
];

// ─── MOTIVATIONAL FEEDBACK HELPER ───
const getMotivationalFeedback = (errCount: number): string => {
  if (errCount === 0) return 'PERFECT SCORE!';
  if (errCount <= 3) return 'Great work!';
  if (errCount <= 7) return 'Good effort!';
  return 'Do not give up — You WILL get this!';
};

// ─── MAIN COMPONENT ───
export function C11_PoliticalScienceMeaningPoliticalScienceSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['polscience'] || {
    name: 'Political Science',
    emoji: '🏛️',
    color: 'indigo',
  };

  // ─── PHASE FLOW ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // ─── PREDICTION & OBSERVATION STATE ───
  const [predIndex, setPredIndex] = useState(0);
  const [predAnswers, setPredAnswers] = useState<Record<number, number>>({});
  const [predChecked, setPredChecked] = useState<Record<number, boolean>>({});

  const [obsIndex, setObsIndex] = useState(0);
  const [obsAnswers, setObsAnswers] = useState<Record<number, number>>({});
  const [obsChecked, setObsChecked] = useState<Record<number, boolean>>({});

  // ─── INTERACTIVE STATE ───
  const [lensMode, setLensMode] = useState<'classical' | 'modern'>('classical');
  const [elemPop, setElemPop] = useState(1400); // millions
  const [elemTerritory, setElemTerritory] = useState(3.28); // million sq km
  const [elemGovtActive, setElemGovtActive] = useState(true);
  const [elemSovereignty, setElemSovereignty] = useState(100); // 0 to 100%
  const [selectedGovtType, setSelectedGovtType] = useState<'cabinet_2019' | 'coalition_2024' | 'caretaker'>('coalition_2024');
  const [chosenPhilosopher, setChosenPhilosopher] = useState<'hobbes' | 'locke' | 'rousseau'>('hobbes');
  const [economicControl, setEconomicControl] = useState(30); // 0 (Free Market) to 100 (Collective)
  const [politicalPluralism, setPoliticalPluralism] = useState(85); // 0 (Single Party) to 100 (Multi-Party)
  const [constitutionArticleSearch, setConstitutionArticleSearch] = useState('21');
  const [activeArticleData, setActiveArticleData] = useState<{ title: string; text: string; theme: string }>({
    title: 'Article 21: Protection of Life and Personal Liberty',
    text: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
    theme: 'Lockean Natural Rights & Liberal Dignity',
  });

  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // ─── CHALLENGE & ADAPTIVE STATE ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── DRAG & CONSTRUCT STATE ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── VISUAL FEEDBACK ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── REFS ───
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId || NODE_C11_POL_001);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── CONSTITUTION SEARCH EFFECT ───
  useEffect(() => {
    const articlesMap: Record<string, { title: string; text: string; theme: string }> = {
      '1': {
        title: 'Article 1: Name and Territory of the Union',
        text: 'India, that is Bharat, shall be a Union of States. Its territory encompasses States, UTs, and acquired lands.',
        theme: 'Statehood & Sovereign Territory',
      },
      '14': {
        title: 'Article 14: Equality before Law',
        text: 'The State shall not deny to any person equality before the law or the equal protection of the laws within India.',
        theme: 'Liberal Rule of Law',
      },
      '19': {
        title: 'Article 19: Protection of Six Freedoms',
        text: 'Guarantees freedom of speech, assembly, association, movement, residence, and profession with reasonable restrictions.',
        theme: 'Civil Liberties & Liberal Democracy',
      },
      '21': {
        title: 'Article 21: Right to Life and Personal Liberty',
        text: 'No person shall be deprived of life or liberty except by procedure established by law (includes Privacy, Puttaswamy 2017).',
        theme: 'Inalienable Lockean Natural Rights',
      },
      '40': {
        title: 'Article 40: Organisation of Village Panchayats',
        text: 'The State shall take steps to organise village panchayats and endow them with powers of self-government.',
        theme: 'Evolutionary Grassroots Self-Rule',
      },
      '43a': {
        title: 'Article 43A: Workers’ Participation in Management',
        text: 'State shall take steps to secure the participation of workers in the management of undertakings and factories.',
        theme: 'Socialist & Marxist Labor Welfare',
      },
      '324': {
        title: 'Article 324: Superintendence of Elections',
        text: 'Vests superintendence, direction, and control of elections in an independent Election Commission of India.',
        theme: 'Democratic Government Continuity',
      },
      '356': {
        title: 'Article 356: President’s Rule',
        text: 'Provisions in case of failure of constitutional machinery in States; executive authority temporarily assumed by Union.',
        theme: 'Sovereign Emergency & State vs Govt',
      },
    };

    const key = constitutionArticleSearch.toLowerCase().trim();
    if (articlesMap[key]) {
      setActiveArticleData(articlesMap[key]);
    }
  }, [constitutionArticleSearch]);

  // ─── CANVAS ANIMATION: IDEOLOGICAL SPECTRUM RADAR ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 60, 0, Math.PI * 2);
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.moveTo(cx - 120, cy);
      ctx.lineTo(cx + 120, cy);
      ctx.moveTo(cx, cy - 120);
      ctx.lineTo(cx, cy + 120);
      ctx.stroke();

      const targetX = cx + ((50 - economicControl) / 50) * 90;
      const targetY = cy + ((50 - politicalPluralism) / 50) * 90;

      const pulse = Math.sin(angle) * 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = economicControl > 60 ? '#ef4444' : '#6366f1';
      ctx.fillStyle = economicControl > 60 ? '#f87171' : '#818cf8';
      ctx.beginPath();
      ctx.arc(targetX, targetY, 8 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('LIBERAL DEMOCRACY', cx, 20);
      ctx.fillText('AUTOCRACY / STATE MONOPOLY', cx, h - 10);
      ctx.fillText('COLLECTIVE (COMMUNISM)', 60, cy - 5);
      ctx.fillText('FREE MARKET (CAPITALISM)', w - 60, cy - 5);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [economicControl, politicalPluralism]);

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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorr = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorr);
    setDiscoveryAnswered(true);
    audioManager.play(isCorr ? 'success' : 'pop');
    speechManager.speak(
      isCorr
        ? 'Superb insight! Humans form political associations to institute civil peace.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('Prediction Phase: Predict the constitutional outcome before testing it in the lab.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Political Science Exploration Laboratory.');
  }, []);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
    speechManager.speak('Observation Phase: Examine the political simulations and answer what you noticed.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode activated. Manipulate the levers of power freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked. Test your political science mastery.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorr = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorr) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have mastered the fundamentals of Political Science.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (ans: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = ans === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = ans === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant political analysis.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
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
          speechManager.speak('Let us study the complete constitutional explanation.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handlePhilosopherSelect = useCallback((phil: 'hobbes' | 'locke' | 'rousseau') => {
    setChosenPhilosopher(phil);
    audioManager.play('tap');
    if (phil === 'hobbes') {
      speechManager.speak('Hobbes: Surrender all natural rights to the absolute Leviathan for total security.');
    } else if (phil === 'locke') {
      speechManager.speak('Locke: Retain life, liberty, and property; government is a limited fiduciary trust.');
    } else {
      speechManager.speak('Rousseau: Sovereignty belongs inalienably to the people through the General Will.');
    }
  }, []);

  // ─── CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED READOUTS ───
  const stateViability = useMemo(() => {
    if (elemPop < 10 || elemTerritory < 0.01 || !elemGovtActive || elemSovereignty < 50) {
      return { status: 'Collapsing / Non-State Entity', color: 'text-rose-400', valid: false };
    }
    return { status: 'Fully Sovereign Constitutional State', color: 'text-emerald-400', valid: true };
  }, [elemPop, elemTerritory, elemGovtActive, elemSovereignty]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-gold-600/20 border border-gold-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest px-2 py-0.5 bg-gold-900/60 text-gold-300 rounded font-bold">
                ISC Class 11 Humanities
              </span>
              <span className="text-xs text-slate-400">Class 11 Political Science</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                : difficulty === 'standard'
                ? 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                : 'bg-rose-950/60 border-rose-600/50 text-rose-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full font-medium">
            Phase: <strong className="text-gold-400 capitalize">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">The Thought Experiment</span>
            <h2 className="text-2xl font-black text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <span className="text-xl">🏛️</span>
              <span>{SCENARIO.context}</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-amber-300 mb-2 flex items-center gap-2">
              <span>⚡ Discovery Question</span>
              <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full font-normal">
                No penalty — Think & Explore
              </span>
            </h3>
            <p className="text-white font-medium text-sm md:text-base mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 2 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-3.5 text-left rounded-xl text-xs md:text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-gold-950/40 border border-gold-700/50 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {discoveryCorrect ? '✓ Spot on! You grasp social contract theory instinctively.' : '💡 Fascinating, isn’t it?'}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {discoveryCorrect
                      ? 'Let’s enter the Predict-and-Check module before experimenting in the laboratory.'
                      : DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToPredict}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Start Prediction Stage →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE: PREDICTION (Predict-then-Check Pattern) ─── */}
      {phase === 'predict' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-gold-950/80 via-purple-950/40 to-slate-900 rounded-2xl border border-gold-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">
                🔮 Predict Before You Experiment ({predIndex + 1} of {PREDICTION_QUESTIONS.length})
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-gold-900/60 text-gold-300 rounded font-semibold">
                Brilliant Predict-Then-Check
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white">
              {PREDICTION_QUESTIONS[predIndex].question}
            </h3>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => {
                const isSelected = predAnswers[predIndex] === i;
                const isChecked = predChecked[predIndex];
                const isCorrect = i === PREDICTION_QUESTIONS[predIndex].correctIndex;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      if (!isChecked) {
                        setPredAnswers((prev) => ({ ...prev, [predIndex]: i }));
                        audioManager.play('tap');
                      }
                    }}
                    className={`p-4 text-left rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      isChecked && isCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : isChecked && isSelected && !isCorrect
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : isSelected
                        ? 'bg-gold-900/80 border-gold-400 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {!predChecked[predIndex] ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={predAnswers[predIndex] === undefined}
                onClick={() => {
                  const userChoice = predAnswers[predIndex];
                  const isCorr = userChoice === PREDICTION_QUESTIONS[predIndex].correctIndex;
                  setPredChecked((prev) => ({ ...prev, [predIndex]: true }));
                  audioManager.play(isCorr ? 'success' : 'pop');
                  speechManager.speak(isCorr ? 'Prediction locked! Now check how to verify it.' : 'Let us see the verification guidance.');
                }}
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Lock In Prediction 🔒
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-xl border border-gold-800/50 space-y-3"
              >
                <div className="text-xs text-slate-300">
                  <strong className="text-amber-400 block mb-1">🔬 Verification Protocol:</strong>
                  {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-gold-300 block mb-0.5">Theoretical Explanation:</strong>
                  {PREDICTION_QUESTIONS[predIndex].explanation}
                </div>

                <div className="flex justify-end pt-2">
                  {predIndex < PREDICTION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPredIndex((idx) => idx + 1)}
                      className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                    >
                      Next Prediction ({predIndex + 2}/{PREDICTION_QUESTIONS.length}) →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToExploration}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      Enter Exploration Lab to Verify →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Slide Navigation */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Exploration Lab:</span>
              <span className="text-xs px-2.5 py-0.5 bg-gold-900/70 text-gold-300 rounded font-bold">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
            </div>
            <div className="flex gap-2">
              {EXPLORATION_STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === i ? 'bg-gold-500 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
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
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg md:text-xl font-black text-white">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-400 text-xs md:text-sm mt-1 font-medium flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: SVG DIAGRAM 1 — CLASSICAL VS MODERN MEANING */}
              {currentSlide === 0 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setLensMode('classical');
                        audioManager.play('tap');
                        speechManager.speak('Classical view: The science of the State by Aristotle, Garner, and Bluntschli.');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        lensMode === 'classical'
                          ? 'bg-gold-600 text-white border-gold-400 shadow-md shadow-gold-600/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🏛️ Classical (State-Centric)
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setLensMode('modern');
                        audioManager.play('tap');
                        speechManager.speak('Modern view: The study of power, behaviour, and value allocation by Lasswell and Easton.');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                        lensMode === 'modern'
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      ⚡ Modern (Power & Systems)
                    </motion.button>
                  </div>

                  {/* SVG DIAGRAM 1 */}
                  <svg viewBox="0 0 600 240" className="w-full h-auto bg-slate-900/60 rounded-xl border border-slate-800">
                    {lensMode === 'classical' ? (
                      <g>
                        <circle cx="300" cy="120" r="70" fill="#312e81" stroke="#6366f1" strokeWidth="3" />
                        <text x="300" y="115" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                          THE STATE
                        </text>
                        <text x="300" y="132" textAnchor="middle" fill="#c7d2fe" fontSize="10">
                          (Aristotle & Garner)
                        </text>
                        <circle cx="140" cy="70" r="38" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="140" y="74" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Government
                        </text>
                        <circle cx="460" cy="70" r="38" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="460" y="74" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Sovereignty
                        </text>
                        <circle cx="140" cy="170" r="38" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="140" y="174" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Constitution
                        </text>
                        <circle cx="460" cy="170" r="38" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                        <text x="460" y="174" textAnchor="middle" fill="#cbd5e1" fontSize="9">
                          Law & Order
                        </text>

                        <line x1="230" y1="120" x2="178" y2="70" stroke="#6366f1" strokeDasharray="4" />
                        <line x1="370" y1="120" x2="422" y2="70" stroke="#6366f1" strokeDasharray="4" />
                        <line x1="230" y1="120" x2="178" y2="170" stroke="#6366f1" strokeDasharray="4" />
                        <line x1="370" y1="120" x2="422" y2="170" stroke="#6366f1" strokeDasharray="4" />
                      </g>
                    ) : (
                      <g>
                        <rect x="220" y="70" width="160" height="100" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="3" />
                        <text x="300" y="110" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                          POLITICAL SYSTEM
                        </text>
                        <text x="300" y="128" textAnchor="middle" fill="#a7f3d0" fontSize="9">
                          Authoritative Allocation
                        </text>
                        <text x="300" y="142" textAnchor="middle" fill="#a7f3d0" fontSize="9">
                          of Values (David Easton)
                        </text>

                        <rect x="40" y="85" width="120" height="70" rx="8" fill="#1e293b" stroke="#3b82f6" />
                        <text x="100" y="112" textAnchor="middle" fill="#93c5fd" fontWeight="bold" fontSize="10">
                          INPUTS
                        </text>
                        <text x="100" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="8">
                          Demands & Support
                        </text>
                        <line x1="160" y1="120" x2="220" y2="120" stroke="#10b981" strokeWidth="2" />

                        <rect x="440" y="85" width="120" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" />
                        <text x="500" y="112" textAnchor="middle" fill="#fcd34d" fontWeight="bold" fontSize="10">
                          OUTPUTS
                        </text>
                        <text x="500" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="8">
                          Policies & Laws
                        </text>
                        <line x1="380" y1="120" x2="440" y2="120" stroke="#10b981" strokeWidth="2" />

                        <path d="M 500 155 L 500 200 L 100 200 L 100 155" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4" />
                        <text x="300" y="215" textAnchor="middle" fill="#94a3b8" fontSize="9">
                          Feedback Loop (Public Opinion, Elections 2024)
                        </text>
                      </g>
                    )}
                  </svg>

                  <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-300 leading-relaxed border border-slate-800">
                    <strong className="text-gold-300">Exam Note:</strong> Classical definition (Garner: "Political science begins and ends with the State") vs Modern definition (Lasswell: "Who gets what, when, how").
                  </div>
                </div>
              )}

              {/* SLIDE 1: SVG DIAGRAM 2 — FOUR PILLARS OF STATEHOOD */}
              {currentSlide === 1 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {/* SVG DIAGRAM 2 */}
                  <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-900/60 rounded-xl border border-slate-800">
                    {/* Roof / Entablature of the State */}
                    <polygon
                      points="300,18 80,60 520,60"
                      fill={stateViability.valid ? '#312e81' : '#4c0519'}
                      stroke={stateViability.valid ? '#818cf8' : '#f43f5e'}
                      strokeWidth="2.5"
                    />
                    <text x="300" y="48" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                      SOVEREIGN CONSTITUTIONAL STATE
                    </text>

                    {/* Pillar 1: Population */}
                    <rect
                      x="95"
                      y="65"
                      width="65"
                      height="95"
                      rx="4"
                      fill={elemPop > 0 ? '#1e1b4b' : '#334155'}
                      stroke={elemPop > 0 ? '#6366f1' : '#64748b'}
                      strokeWidth="2"
                    />
                    <text x="127" y="105" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="9">
                      1. POPULATION
                    </text>
                    <text x="127" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="8">
                      {elemPop}M citizens
                    </text>

                    {/* Pillar 2: Territory */}
                    <rect
                      x="200"
                      y="65"
                      width="65"
                      height="95"
                      rx="4"
                      fill={elemTerritory > 0 ? '#1e1b4b' : '#334155'}
                      stroke={elemTerritory > 0 ? '#6366f1' : '#64748b'}
                      strokeWidth="2"
                    />
                    <text x="232" y="105" textAnchor="middle" fill="#c7d2fe" fontWeight="bold" fontSize="9">
                      2. TERRITORY
                    </text>
                    <text x="232" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="8">
                      {elemTerritory}M km²
                    </text>

                    {/* Pillar 3: Government */}
                    <rect
                      x="335"
                      y="65"
                      width="65"
                      height="95"
                      rx="4"
                      fill={elemGovtActive ? '#064e3b' : '#4c0519'}
                      stroke={elemGovtActive ? '#10b981' : '#f43f5e'}
                      strokeWidth="2"
                    />
                    <text x="367" y="105" textAnchor="middle" fill="#a7f3d0" fontWeight="bold" fontSize="9">
                      3. GOVT
                    </text>
                    <text x="367" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="8">
                      {elemGovtActive ? 'Operational' : 'Anarchy'}
                    </text>

                    {/* Pillar 4: Sovereignty */}
                    <rect
                      x="440"
                      y="65"
                      width="65"
                      height="95"
                      rx="4"
                      fill={elemSovereignty >= 50 ? '#701a75' : '#4c0519'}
                      stroke={elemSovereignty >= 50 ? '#d946ef' : '#f43f5e'}
                      strokeWidth="2"
                    />
                    <text x="472" y="105" textAnchor="middle" fill="#f5d0fe" fontWeight="bold" fontSize="9">
                      4. SOVEREIGNTY
                    </text>
                    <text x="472" y="125" textAnchor="middle" fill="#e2e8f0" fontSize="8">
                      {elemSovereignty}% Supremacy
                    </text>

                    {/* Foundation Base */}
                    <rect x="70" y="165" width="460" height="22" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    <text x="300" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      Constitutional Foundation & Rule of Law
                    </text>
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Controls */}
                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>1. Population:</span>
                          <strong className="text-gold-400">{elemPop} Million</strong>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1500"
                          value={elemPop}
                          onChange={(e) => setElemPop(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>2. Territory:</span>
                          <strong className="text-gold-400">{elemTerritory} M sq km</strong>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={elemTerritory}
                          onChange={(e) => setElemTerritory(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-300">3. Government Machinery:</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setElemGovtActive(!elemGovtActive)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            elemGovtActive ? 'bg-emerald-600 text-white' : 'bg-rose-900 text-rose-300'
                          }`}
                        >
                          {elemGovtActive ? '✓ Active Organs' : '✕ Dissolved (Anarchy)'}
                        </motion.button>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>4. Sovereignty (Supreme Power):</span>
                          <strong className={elemSovereignty >= 70 ? 'text-emerald-400' : 'text-rose-400'}>
                            {elemSovereignty}% {elemSovereignty < 50 ? '(Subjugated/Colony)' : '(Independent)'}
                          </strong>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={elemSovereignty}
                          onChange={(e) => setElemSovereignty(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* State Viability Display */}
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Statehood Verdict</span>
                        <div className={`text-lg font-black mt-1 ${stateViability.color}`}>
                          {stateViability.status}
                        </div>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                          {stateViability.valid
                            ? 'All 4 indispensable pillars are satisfied! The entity qualifies as a sovereign State under international law and political science.'
                            : 'Deficient! A State cannot exist if any single pillar is missing (e.g. nomadic tribe lacks territory, United Nations lacks sovereignty).'}
                        </p>
                      </div>

                      <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800 text-center">
                        <div className={`p-1.5 rounded ${elemPop > 0 ? 'bg-gold-950 text-gold-300' : 'bg-rose-950 text-rose-300'}`}>
                          <div className="text-xs font-bold">Pop</div>
                          <div className="text-[10px]">{elemPop > 0 ? '✓' : '✗'}</div>
                        </div>
                        <div className={`p-1.5 rounded ${elemTerritory > 0 ? 'bg-gold-950 text-gold-300' : 'bg-rose-950 text-rose-300'}`}>
                          <div className="text-xs font-bold">Terr</div>
                          <div className="text-[10px]">{elemTerritory > 0 ? '✓' : '✗'}</div>
                        </div>
                        <div className={`p-1.5 rounded ${elemGovtActive ? 'bg-gold-950 text-gold-300' : 'bg-rose-950 text-rose-300'}`}>
                          <div className="text-xs font-bold">Govt</div>
                          <div className="text-[10px]">{elemGovtActive ? '✓' : '✗'}</div>
                        </div>
                        <div className={`p-1.5 rounded ${elemSovereignty >= 50 ? 'bg-gold-950 text-gold-300' : 'bg-rose-950 text-rose-300'}`}>
                          <div className="text-xs font-bold">Sov</div>
                          <div className="text-[10px]">{elemSovereignty >= 50 ? '✓' : '✗'}</div>
                        </div>
                      </div>

                      {/* Live derived geography/politics metrics with units */}
                      <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                          <p className="text-[10px] text-slate-500">Population density</p>
                          <p className="font-mono font-bold text-gold-300">
                            {elemTerritory > 0 ? (elemPop / elemTerritory).toFixed(0) : '—'} people/km²
                          </p>
                        </div>
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                          <p className="text-[10px] text-slate-500">Sovereignty surplus/deficit</p>
                          <p className={`font-mono font-bold ${elemSovereignty >= 50 ? 'text-emerald-300' : 'text-rose-300'}`}>
                            {elemSovereignty >= 50 ? '+' : ''}{(elemSovereignty - 50).toFixed(0)} pts vs 50
                          </p>
                        </div>
                        <div className="bg-slate-950 rounded-lg p-2 border border-slate-800">
                          <p className="text-[10px] text-slate-500">Pillars satisfied</p>
                          <p className="font-mono font-bold text-gold-300">
                            {(elemPop > 0 ? 1 : 0) + (elemTerritory > 0 ? 1 : 0) + (elemGovtActive ? 1 : 0) + (elemSovereignty >= 50 ? 1 : 0)} / 4
                          </p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Misconception killer: population size does NOT decide statehood — Nauru (~12,000 people) is a
                        full State, while a billion refugees without territory or a government are not. Density is just
                        pop ÷ territory; try 1000M in 0.5M km² vs 1M in 10M km².
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => { setElemPop(1400); setElemTerritory(3.3); setElemGovtActive(true); setElemSovereignty(90); }}
                          aria-label="Reset state elements to India example"
                          className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                        >
                          ↺ Reset to India (1400M, 3.3M km²)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: SVG DIAGRAM 3 — STATE VS GOVT VS NATION */}
              {currentSlide === 2 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  {/* SVG DIAGRAM 3 */}
                  <svg viewBox="0 0 600 210" className="w-full h-auto bg-slate-900/60 rounded-xl border border-slate-800">
                    {/* Permanent State Outer Box */}
                    <rect x="30" y="25" width="340" height="160" rx="16" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
                    <text x="50" y="52" fill="#c7d2fe" fontWeight="bold" fontSize="12">
                      🏛️ THE STATE (Permanent & Sovereign)
                    </text>
                    <text x="50" y="70" fill="#94a3b8" fontSize="9">
                      Constitution of India (Since 26 Jan 1950)
                    </text>

                    {/* Government Inner Box (Temporary) */}
                    <rect x="50" y="85" width="300" height="85" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,3" />
                    <text x="65" y="108" fill="#fcd34d" fontWeight="bold" fontSize="11">
                      ⚙️ THE GOVERNMENT (Temporary Agent)
                    </text>
                    <text x="65" y="126" fill="#cbd5e1" fontSize="9">
                      Current: {selectedGovtType === 'cabinet_2019' ? '17th Lok Sabha (2019-2024)' : selectedGovtType === 'coalition_2024' ? '18th Lok Sabha Coalition (2024-Present)' : 'Caretaker Regime under ECI'}
                    </text>
                    <text x="65" y="145" fill="#10b981" fontSize="8">
                      ✓ Changes periodically through general elections under Article 326
                    </text>

                    {/* Nation Circle (Cultural-Sociological) */}
                    <circle cx="485" cy="105" r="75" fill="#3b0764" stroke="#c084fc" strokeWidth="2.5" />
                    <text x="485" y="90" textAnchor="middle" fill="#f3e8ff" fontWeight="bold" fontSize="12">
                      🌍 THE NATION
                    </text>
                    <text x="485" y="110" textAnchor="middle" fill="#e9d5ff" fontSize="9">
                      Socio-Cultural
                    </text>
                    <text x="485" y="125" textAnchor="middle" fill="#e9d5ff" fontSize="9">
                      Community of Sentiment
                    </text>
                    <text x="485" y="145" textAnchor="middle" fill="#a855f7" fontSize="8">
                      (e.g., Kurds, Scots)
                    </text>
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-gold-950/50 rounded-xl border border-gold-800">
                      <span className="text-xs font-bold text-gold-400">1. THE STATE</span>
                      <p className="text-xs text-slate-300 mt-1">Permanent, sovereign political entity (e.g. Republic of India since 1950).</p>
                    </div>
                    <div className="p-3 bg-amber-950/50 rounded-xl border border-amber-800">
                      <span className="text-xs font-bold text-amber-400">2. THE GOVERNMENT</span>
                      <p className="text-xs text-slate-300 mt-1">Temporary agent/machinery that changes via elections (e.g. 2014, 2019, 2024 NDA).</p>
                    </div>
                    <div className="p-3 bg-purple-950/50 rounded-xl border border-purple-800">
                      <span className="text-xs font-bold text-purple-400">3. THE NATION</span>
                      <p className="text-xs text-slate-300 mt-1">Cultural-sociological community sharing language, heritage, and identity.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-300">Simulate Indian Democratic Transitions:</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedGovtType('cabinet_2019')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedGovtType === 'cabinet_2019'
                            ? 'bg-amber-600 text-white border-amber-400'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        17th Lok Sabha (2019–2024 Single-Party Majority)
                      </button>
                      <button
                        onClick={() => setSelectedGovtType('coalition_2024')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedGovtType === 'coalition_2024'
                            ? 'bg-amber-600 text-white border-amber-400'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        18th Lok Sabha (2024 NDA Coalition)
                      </button>
                      <button
                        onClick={() => setSelectedGovtType('caretaker')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedGovtType === 'caretaker'
                            ? 'bg-amber-600 text-white border-amber-400'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        Election Period (Caretaker Government)
                      </button>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 flex items-center justify-between">
                      <span>
                        Government Status:{' '}
                        <strong className="text-amber-400">
                          {selectedGovtType === 'cabinet_2019'
                            ? 'NDA Single Party Majority'
                            : selectedGovtType === 'coalition_2024'
                            ? 'NDA Coalition Government (TDP/JDU Alliance)'
                            : 'Model Code of Conduct Active (ECI Supervised)'}
                        </strong>
                      </span>
                      <span className="text-emerald-400 font-bold">State Sovereignty: 100% Intact</span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: SOCIAL CONTRACT DUEL */}
              {currentSlide === 3 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-center gap-2 md:gap-3">
                    <button
                      onClick={() => handlePhilosopherSelect('hobbes')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        chosenPhilosopher === 'hobbes'
                          ? 'bg-rose-700 text-white border-rose-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      👑 Hobbes (Leviathan)
                    </button>
                    <button
                      onClick={() => handlePhilosopherSelect('locke')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        chosenPhilosopher === 'locke'
                          ? 'bg-gold-700 text-white border-gold-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      📜 Locke (Natural Rights)
                    </button>
                    <button
                      onClick={() => handlePhilosopherSelect('rousseau')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        chosenPhilosopher === 'rousseau'
                          ? 'bg-emerald-700 text-white border-emerald-400 shadow-md'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🤝 Rousseau (General Will)
                    </button>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-1">State of Nature</span>
                      <p className="text-slate-200">
                        {chosenPhilosopher === 'hobbes'
                          ? 'War of all against all; "solitary, poor, nasty, brutish, and short".'
                          : chosenPhilosopher === 'locke'
                          ? 'Peaceful & rational, but inconvenient without an impartial judge.'
                          : 'Noble savage: free, equal, and uncorrupted before private property.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-1">Rights Surrendered</span>
                      <p className="text-slate-200">
                        {chosenPhilosopher === 'hobbes'
                          ? 'ALL rights surrendered (except self-preservation) to the Leviathan.'
                          : chosenPhilosopher === 'locke'
                          ? 'Only the right to judge and punish is delegated; Life, Liberty, Property retained!'
                          : 'Natural liberty exchanged for civil liberty under the collective General Will.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-bold block mb-1">Sovereign Authority</span>
                      <p className="text-slate-200">
                        {chosenPhilosopher === 'hobbes'
                          ? 'Absolute, indivisible Leviathan above the contract. No right of revolt.'
                          : chosenPhilosopher === 'locke'
                          ? 'Limited fiduciary government. Right to revolt if rights are violated.'
                          : 'Popular sovereignty: inalienable power remains with the collective people.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: IDEOLOGY SPECTRUM */}
              {currentSlide === 4 && (
                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Economic Organization:</span>
                          <strong className={economicControl > 50 ? 'text-rose-400' : 'text-gold-400'}>
                            {economicControl > 60
                              ? 'Collective / Means of Production Socialized (Marxist)'
                              : economicControl < 40
                              ? 'Private Property & Free Enterprise (Liberal)'
                              : 'Mixed Economy (Indian Model: Article 39b/c)'}
                          </strong>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={economicControl}
                          onChange={(e) => setEconomicControl(Number(e.target.value))}
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Political System & Pluralism:</span>
                          <strong className={politicalPluralism > 50 ? 'text-emerald-400' : 'text-amber-400'}>
                            {politicalPluralism > 60
                              ? 'Multi-Party Liberal Democracy (Article 326)'
                              : 'Transitional Proletariat Domination / Vanguard'}
                          </strong>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={politicalPluralism}
                          onChange={(e) => setPoliticalPluralism(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg text-xs text-slate-300 leading-relaxed border border-slate-800">
                        <strong className="text-gold-300">Indian Synthesis:</strong> Preamble includes "Socialist" (42nd Amendment, 1976), yet Part III guarantees Fundamental Rights and universal adult suffrage (Liberal Democracy).
                      </div>
                    </div>

                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <canvas ref={canvasRef} width={260} height={200} className="rounded-lg bg-slate-950 border border-slate-800" />
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Prev/Next Bar */}
              <div className="flex justify-between pt-3 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400 self-center">
                  Lab Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToObserve}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-600/30"
                  >
                    Enter Observation Checkpoint →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE: OBSERVATION (What Do You Notice Pattern) ─── */}
      {phase === 'observe' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-purple-950/80 via-gold-950/40 to-slate-900 rounded-2xl border border-purple-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                👀 What Did You Notice? ({obsIndex + 1} of {OBSERVATION_QUESTIONS.length})
              </span>
              <span className="text-xs px-2.5 py-0.5 bg-purple-900/60 text-purple-300 rounded font-semibold">
                Brilliant Active Observation
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-white">
              {OBSERVATION_QUESTIONS[obsIndex].question}
            </h3>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OBSERVATION_QUESTIONS[obsIndex].options.map((opt, i) => {
                const isSelected = obsAnswers[obsIndex] === i;
                const isChecked = obsChecked[obsIndex];
                const isCorrect = i === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      if (!isChecked) {
                        setObsAnswers((prev) => ({ ...prev, [obsIndex]: i }));
                        audioManager.play('tap');
                      }
                    }}
                    className={`p-4 text-left rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      isChecked && isCorrect
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : isChecked && isSelected && !isCorrect
                        ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                        : isSelected
                        ? 'bg-purple-900/80 border-purple-400 text-white'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {!obsChecked[obsIndex] ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={obsAnswers[obsIndex] === undefined}
                onClick={() => {
                  const userChoice = obsAnswers[obsIndex];
                  const isCorr = userChoice === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
                  setObsChecked((prev) => ({ ...prev, [obsIndex]: true }));
                  audioManager.play(isCorr ? 'success' : 'pop');
                  speechManager.speak(isCorr ? 'Sharp eye! Your empirical observation is exact.' : 'Check the detailed observation report.');
                }}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
              >
                Submit Observation 🔎
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-xl border border-purple-800/50 space-y-3"
              >
                <div className="text-xs text-slate-300">
                  <strong className="text-purple-300 block mb-1">📋 Observable Dimensions:</strong>
                  <ul className="list-disc list-inside space-y-1 text-slate-400">
                    {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="text-xs text-slate-400 leading-relaxed">
                  <strong className="text-emerald-300 block mb-0.5">Insight:</strong>
                  {OBSERVATION_QUESTIONS[obsIndex].explanation}
                </div>

                <div className="flex justify-end pt-2">
                  {obsIndex < OBSERVATION_QUESTIONS.length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setObsIndex((idx) => idx + 1)}
                      className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
                    >
                      Next Observation ({obsIndex + 2}/{OBSERVATION_QUESTIONS.length}) →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdvanceToSandbox}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      Continue to Sandbox Mode →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX (FREE PLAY) ──��� */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-white">Constitutional Sandbox & Article Explorer</h3>
              <p className="text-slate-400 text-xs mt-0.5">Explore Indian constitutional anchors and political theory dials without grading pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-300">Search Constitution Article:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {['1', '14', '19', '21', '40', '43A', '324', '356'].map((art) => (
                    <button
                      key={art}
                      onClick={() => setConstitutionArticleSearch(art)}
                      className={`px-2.5 py-1 rounded text-xs font-bold border ${
                        constitutionArticleSearch.toLowerCase() === art.toLowerCase()
                          ? 'bg-gold-600 text-white border-gold-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      Art {art}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-gold-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-gold-300">{activeArticleData.title}</h4>
                  <span className="text-[10px] px-2 py-0.5 bg-gold-950 text-gold-400 rounded-full border border-gold-800">
                    {activeArticleData.theme}
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic">"{activeArticleData.text}"</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs font-bold text-slate-400 block mb-2">Three Organs of the Indian Government:</span>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <strong className="text-gold-400 block">Legislature</strong>
                    <span className="text-[10px] text-slate-400">Parliament (Articles 79–122) Makes Law</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <strong className="text-amber-400 block">Executive</strong>
                    <span className="text-[10px] text-slate-400">President & Cabinet (Articles 52–78) Enforces Law</span>
                  </div>
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <strong className="text-emerald-400 block">Judiciary</strong>
                    <span className="text-[10px] text-slate-400">Supreme Court (Articles 124–147) Judicial Review</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Statehood Formula</span>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 mt-2">
                  <div><strong>State</strong> = Pop + Territory + Govt + Sovereignty</div>
                  <div><strong>Government</strong> = Agent of the State</div>
                  <div><strong>Nation</strong> = Cultural consciousness</div>
                </div>
              </div>

              <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-gold-300">
                💡 <strong>Tip for ISC Exam:</strong> Always link theoretical definitions to named thinkers and Indian constitutional articles for 8/8 marks!
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-xs"
              >
                Launch Graded Challenges →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress & Tier Tracker */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-gold-400 font-semibold uppercase tracking-wider">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400">Errors: {errors}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* QUESTION CARD */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <h2 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h2>
              <span className="text-[10px] px-2.5 py-1 bg-slate-800 text-slate-400 rounded-full font-bold uppercase tracking-wider flex-shrink-0">
                {challenge.type}
              </span>
            </div>

            {/* MCQ TYPES: CLASSIFY / DISTINGUISH / MATCH WITH SHAKE ANIMATION ON WRONG */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`p-4 text-left rounded-xl text-xs md:text-sm font-medium transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950/50'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-950/40 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 flex-shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these branch labels into the correct target slots:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { id: 'box_theory', label: 'Values & Normative Concepts (Justice, Rights)' },
                    { id: 'box_comparative', label: 'Cross-National Systems & Constitutions' },
                    { id: 'box_ir', label: 'Global Sovereign Interstate Relations' },
                    { id: 'box_pubad', label: 'Executive Machinery & Policy Delivery' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center min-h-[110px]"
                    >
                      <span className="text-[10px] text-slate-400 mb-2">{target.label}</span>
                      {droppedLabels[target.id] ? (
                        <span className="px-2.5 py-1 bg-emerald-900/80 border border-emerald-500 text-emerald-200 text-xs font-bold rounded">
                          {droppedLabels[target.id]}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600 font-semibold">[Drop Label Here]</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={Object.keys(droppedLabels).length < 4 || showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Verify Mapping ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into proper chronological order (top to bottom):</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 font-bold flex items-center justify-center text-xs flex-shrink-0">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold"
                >
                  Submit Order ✓
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-gold-500 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={!numericInput || showExplanation}
                    className="px-5 py-3 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-gold-950 border border-gold-700 text-gold-300 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble the state limbs...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0 || showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Verify Structure ✓
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE CLICK-TO-REVEAL EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 md:p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Step-by-Step Constitutional Breakdown:
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-gold-400 font-bold">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-gold-800 hover:bg-gold-700 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Mastery Report →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/60 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Political Science Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK HEADER */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className={`inline-block px-5 py-2 rounded-2xl text-base md:text-lg font-black tracking-wide uppercase shadow-lg ${
                errors === 0
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  : errors <= 3
                  ? 'bg-gold-500 text-white shadow-gold-500/30'
                  : errors <= 7
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/30'
                  : 'bg-rose-500 text-white shadow-rose-500/30'
              }`}
            >
              {getMotivationalFeedback(errors)}
            </motion.div>

            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              You have successfully completed the rigorous Class 11 ISC simulation on the Meaning & Scope of Political Science, Statehood Elements, Social Contract Theories, and Ideologies.
            </p>

            <div className="flex justify-center gap-6 pt-3">
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 px-6">
                <div className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Accuracy Score</div>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 px-6">
                <div className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">BKT Knowledge State</div>
              </div>
            </div>
          </div>

          {/* Performance Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/50 text-xs text-emerald-300 leading-relaxed">
            <strong className="block text-sm font-bold mb-1">Feedback:</strong>
            {errors === 0
              ? 'Flawless execution! You demonstrated mastery across all classical and modern political theorists, constitutional articles, and ideological frameworks.'
              : errors <= 3
              ? 'Commendable performance! You exhibit a strong conceptual foundation in Class 11 Political Science. Review the misconception notes below for board exam perfection.'
              : 'Good perseverance! Continue strengthening the distinctions between State vs Government, Hobbes vs Locke, and Liberalism vs Communism.'}
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Board Misconception Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</div>
                      <div className="text-emerald-300">✓ Accurate Concept: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-900/50 text-xs text-amber-300 flex items-center justify-between flex-wrap gap-2">
            <div>
              <strong className="block text-sm font-bold">SM-2 Spaced Repetition Active:</strong>
              <span>
                Next review scheduled in{' '}
                <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to consolidate neural memory for board exams.
              </span>
            </div>
            <span className="text-xl">📅</span>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🏛️</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-gold-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── TOAST / BANNER OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Political Science Concept Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PoliticalScienceMeaningPoliticalScienceSim;