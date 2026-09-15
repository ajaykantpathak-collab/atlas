'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ───
const NODE_C12_HIST_011 = 'c12_hist_011';
const NODE_C12_HIST_012 = 'c12_hist_012';
const NODE_C12_HIST_013 = 'c12_hist_013';
const NODE_C12_HIST_014 = 'c12_hist_014';
const NODE_C12_HIST_015 = 'c12_hist_015';
const NODE_C12_HIST_016 = 'c12_hist_016';
const NODE_C12_HIST_017 = 'c12_hist_017';
const NODE_C12_HIST_018 = 'c12_hist_018';
const NODE_C12_HIST_019 = 'c12_hist_019';
const NODE_C12_HIST_020 = 'c12_hist_020';

const ALL_NODE_IDS = [
  NODE_C12_HIST_011,
  NODE_C12_HIST_012,
  NODE_C12_HIST_013,
  NODE_C12_HIST_014,
  NODE_C12_HIST_015,
  NODE_C12_HIST_016,
  NODE_C12_HIST_017,
  NODE_C12_HIST_018,
  NODE_C12_HIST_019,
  NODE_C12_HIST_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Democracy on Trial: India 1951 – 1979',
  intro: 'You are an archivist and constitutional analyst at the National Museum of Indian Democracy. The year is 1951, and the world believes an impoverished, 85% illiterate post-colonial nation cannot sustain universal adult suffrage. Over the next three decades, you must steer the republic through monumental elections, linguistic turmoil, wars, revolutionary movements, the trauma of the Emergency, and the restoration of democracy.',
  context: 'Examine primary documents, configure ballot systems, redraw provincial maps, balance defense with food security, and dissect constitutional amendments that shaped modern India.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 1951, when India enfranchised 17.3 crore citizens (85% illiterate) under universal adult suffrage, Western skeptics predicted democracy would instantly collapse. How did Chief Election Commissioner Sukumar Sen ensure illiterate citizens could vote secretly and accurately?',
  options: [
    'He mandated that village headmen read candidates’ manifestos aloud at the booth',
    'He assigned visual pictorial symbols and created separate metal ballot boxes for each candidate',
    'He required voters to give verbal declarations to police officers on duty',
    'He restricted voting exclusively to literate taxpayers in the first phase',
  ],
  correctIndex: 1,
  hintAfter: 'Sen devised a visual symbol system (bullocks, tree, hut, sickle) paired with 20 lakh steel ballot boxes across 2,24,000 booths so anyone could cast an informed, confidential ballot!',
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

// ─── 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced across 10 Nodes) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (1-7)
  {
    id: 'ch_hist_001',
    nodeId: NODE_C12_HIST_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which statutory legislation was the first nationwide general election of independent India conducted between October 1951 and March 1952?',
    options: [
      'Government of India Act 1935',
      'Representation of the People Act 1951',
      'Indian Independence Act 1947',
      'Delimitation Commission Act 1952',
    ],
    correctIndex: 1,
    explanation: 'The first general election was conducted under the Representation of the People Act (1951), which established universal adult suffrage rules, voter eligibility, and polling mechanisms overseen by Chief Election Commissioner Sukumar Sen.',
    hints: [
      'Think of the foundational parliamentary act passed in 1951 that established electoral conduct.',
      'It deals directly with "the representation of the citizens/people".',
      'It is the Representation of the People Act 1951.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_hist_002',
    nodeId: NODE_C12_HIST_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Whose 58-day hunger strike ending in death on 15 December 1952 forced the Nehru government to create Andhra State in October 1953?',
    options: [
      'Tanguturi Prakasam',
      'Potti Sriramulu',
      'C. Rajagopalachari',
      'K. Kamaraj',
    ],
    correctIndex: 1,
    explanation: 'Potti Sriramulu, a Gandhian freedom fighter, fasted for 58 days demanding a separate Telugu-speaking state from Madras Presidency. His death precipitated riots that led to Andhra State formation in 1953.',
    hints: [
      'He was a revered Gandhian who sacrificed his life in Madras city in late 1952.',
      'His name begins with "Potti".',
      'Potti Sriramulu passed away on 15 December 1952.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_hist_003',
    nodeId: NODE_C12_HIST_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did Prime Minister Lal Bahadur Shastri coin the patriotic slogan "Jai Jawan, Jai Kisan" during the crisis of 1965?',
    options: [
      'To celebrate industrial expansion in steel and coal',
      'To simultaneously rally the military fighting the Indo-Pak war and farmers combating a severe drought and food grain deficit',
      'To promote urban trade unions against rural landlords',
      'To declare victory after the Tashkent Declaration',
    ],
    correctIndex: 1,
    explanation: 'In 1965, India faced twin existential crises: Pakistani military invasion (Jawan) and a catastrophic drought causing acute food dependency on US PL-480 wheat (Kisan). Shastri linked national defense directly with agricultural self-sufficiency.',
    hints: [
      'Think of the two major challenges India faced simultaneously in 1965.',
      'One was at the border (1965 Indo-Pak war), and the other was in the fields (monsoon failure).',
      'Soldier (Jawan) and Farmer (Kisan) were equally vital to sovereign survival.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_hist_004',
    nodeId: NODE_C12_HIST_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the landmark outcome of the Fourth General Election in February 1967 for state governments across India?',
    options: [
      'Congress swept all 16 state assemblies with record majorities',
      'Congress lost power in 8 major states, leading to Samyukta Vidhayak Dal (SVD) non-Congress coalition ministries',
      'All regional parties merged into a single unitary party',
      'President’s Rule was permanently declared across North India',
    ],
    correctIndex: 1,
    explanation: 'In 1967, Congress was reduced to a slim majority at the Centre (283/520) and lost power in 8 states (Bihar, West Bengal, Kerala, Madras/DMK, Punjab, Orissa, UP, Rajasthan), inaugurating coalition politics.',
    hints: [
      '1967 broke the monolithic single-party dominance of Congress at the provincial level.',
      'Coalitions known as SVD (Samyukta Vidhayak Dal) formed in multiple states.',
      'Congress lost power in 8 state assemblies.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_hist_005',
    nodeId: NODE_C12_HIST_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which ideological doctrine did Deendayal Upadhyaya present in 1965 as the philosophical core of the Bharatiya Jana Sangh?',
    options: [
      'Democratic Socialism',
      'Integral Humanism (Ekatma Manavvad)',
      'Class Annihilation',
      'Total Revolution',
    ],
    correctIndex: 1,
    explanation: 'Deendayal Upadhyaya articulated "Integral Humanism" in 1965, proposing a holistic indigenous social and economic philosophy centered on human welfare, culture, and decentralized ethics distinct from Western capitalism and Marxist materialism.',
    hints: [
      'It synthesizes physical, mental, intellectual, and spiritual dimensions of human existence.',
      'The English term is "Integral Humanism".',
      'It rejected both unbridled capitalism and totalitarian communism.',
    ],
  },
  {
    id: 'ch_hist_006',
    nodeId: NODE_C12_HIST_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where and on what exact date did the peasant revolt break out that gave the Naxalite movement its name?',
    options: [
      'Tebhaga, Bengal on 15 August 1947',
      'Naxalbari village, Darjeeling district on 25 May 1967',
      'Srikakulam, Andhra Pradesh on 22 April 1969',
      'Bhojpur, Bihar on 12 June 1975',
    ],
    correctIndex: 1,
    explanation: 'The movement began on 25 May 1967 at Naxalbari village in Darjeeling district, West Bengal, when tribal peasants led by Kanu Sanyal and Jangal Santhal seized land under Charu Majumdar’s ideological directives.',
    hints: [
      'The village name itself gave the movement its identity.',
      'It occurred in northern West Bengal in May 1967.',
      'Naxalbari in Darjeeling on 25 May 1967.',
    ],
  },
  {
    id: 'ch_hist_007',
    nodeId: NODE_C12_HIST_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under which Article of the Constitution and on what official ground was the National Emergency declared on the night of 25–26 June 1975?',
    options: [
      'Article 356 on grounds of Constitutional Breakdown',
      'Article 360 on grounds of Financial Instability',
      'Article 352 on grounds of "Internal Disturbance"',
      'Article 370 on grounds of Territorial Security',
    ],
    correctIndex: 2,
    explanation: 'President Fakhruddin Ali Ahmed signed the proclamation on the advice of PM Indira Gandhi under Article 352 on the grounds of "internal disturbance", a vague term later removed by the 44th Amendment.',
    hints: [
      'Article 352 governs National Emergency.',
      'The phrasing was not "armed rebellion" or "war" in 1975.',
      'It was proclaimed under Article 352 citing "internal disturbance".',
    ],
    misconceptionIndex: 4,
  },

  // Standard Tier (8-15) — Including Interactive Drag/Sort/Numeric/Construct
  {
    id: 'ch_hist_008',
    nodeId: NODE_C12_HIST_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the 1951-52 Lok Sabha elections across 489 seats, if the Indian National Congress won 364 seats, calculate the percentage of total Lok Sabha seats won by Congress (round to the nearest whole percentage).',
    correctAnswer: 74,
    tolerance: 1,
    unit: '% of seats',
    explanation: '(364 / 489) × 100 = 74.43%, which rounds to 74%. Notably, Congress secured ~74% of seats with only ~45% of popular votes due to first-past-the-post mechanics.',
    hints: [
      'Formula: (Seats Won / Total Seats) × 100',
      '364 divided by 489 is approximately 0.7443.',
      'Multiply by 100 to get ~74%.',
    ],
  },
  {
    id: 'ch_hist_009',
    nodeId: NODE_C12_HIST_012,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match each historical linguistic state reorganisation milestone to its corresponding region or year.',
    dragItems: [
      { label: 'Andhra State (Kurnool capital)', targetId: 'target_1953' },
      { label: '14 States & 6 Union Territories created', targetId: 'target_1956' },
      { label: 'Bilingual Bombay split (MH & GJ)', targetId: 'target_1960' },
      { label: 'Punjab & Haryana bifurcation', targetId: 'target_1966' },
    ],
    correctMapping: {
      target_1953: 'Andhra State (Kurnool capital)',
      target_1956: '14 States & 6 Union Territories created',
      target_1960: 'Bilingual Bombay split (MH & GJ)',
      target_1966: 'Punjab & Haryana bifurcation',
    },
    explanation: 'Andhra State was created on 1 Oct 1953; the States Reorganisation Act enacted 14 states/6 UTs on 1 Nov 1956; Samyukta Maharashtra & Mahagujarat split Bombay on 1 May 1960; Punjabi Suba agitation separated Punjab and Haryana on 1 Nov 1966.',
    hints: [
      '1953 was the immediate result of Potti Sriramulu’s fast.',
      '1956 was the Fazal Ali Commission implementation.',
      '1960 resolved the Marathi-Gujarati division, and 1966 created Haryana.',
    ],
  },
  {
    id: 'ch_hist_010',
    nodeId: NODE_C12_HIST_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which critical term was agreed upon under the Tashkent Declaration of 10 January 1966 mediated by Soviet Premier Alexei Kosygin between Shastri and Ayub Khan?',
    options: [
      'India permanently annexed the Haji Pir Pass and Lahore sector',
      'Both armed forces withdrew to positions held prior to 5 August 1965 (status quo ante bellum)',
      'Pakistan ceded Azad Kashmir to India in exchange for financial reparations',
      'East Pakistan was recognized as an autonomous province',
    ],
    correctIndex: 1,
    explanation: 'The Tashkent Declaration mandated return to the status quo ante bellum. India had to return captured strategic high points like the Haji Pir Pass, causing intense domestic debate before Shastri’s sudden death that night.',
    hints: [
      'The agreement returned both armies to pre-war boundary lines.',
      'It restored the situation as it existed before the war (status quo ante).',
      'Strategic gains like Haji Pir had to be vacated.',
    ],
  },
  {
    id: 'ch_hist_011',
    nodeId: NODE_C12_HIST_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What geopolitical and ideological rift precipitated the historic 1964 split of the Communist Party of India (CPI) into CPI and CPI(M)?',
    options: [
      'Disagreement over the nationalization of private commercial banks',
      'The 1962 Sino-Indian War and the Sino-Soviet split: Dange’s pro-Moscow faction backed the Indian defense, while Namboodiripad and Basu’s faction opposed bourgeois state alignment',
      'A dispute over whether to contest elections in Hindi or English',
      'Conflict regarding support for the US PL-480 food aid programme',
    ],
    correctIndex: 1,
    explanation: 'The 1962 border war and 1960 Sino-Soviet split divided Indian communists. The pro-Soviet faction (Dange) supported the Indian state’s defense effort; the radical faction (Namboodiripad, Sundarayya, Basu) broke away at the 1964 Calcutta Congress to form CPI(M).',
    hints: [
      'Look at the international Cold War dynamics between Moscow and Beijing in the 1960s.',
      'How did the 1962 war with China force Indian communists to take opposing sides?',
      'The pro-Moscow wing remained CPI; the critical dissident wing formed CPI(M).',
    ],
  },
  {
    id: 'ch_hist_012',
    nodeId: NODE_C12_HIST_016,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential escalation of the Naxalite Movement in correct chronological order.',
    sortItems: [
      'Charu Majumdar pens the "Historic Eight Documents" articulating armed peasant insurrection (1965-67)',
      'Tribal peasant uprising at Naxalbari village against jotedar land-grab (May 1967)',
      'Formation of the CPI(ML) on Lenin’s birth centenary (22 April 1969)',
      'Joint Army-Police "Operation Steeplechase" launched in West Bengal (July 1971)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Ideology preceded action: Majumdar wrote the Eight Documents (1965-67) -> Naxalbari broke out on 25 May 1967 -> CPI(ML) formed on 22 April 1969 -> Operation Steeplechase suppressed cadres in July 1971.',
    hints: [
      'Ideological formulation came first before the village uprising.',
      'The formal party CPI(ML) was founded in 1969.',
      'Military operation Steeplechase was deployed in 1971.',
    ],
  },
  {
    id: 'ch_hist_013',
    nodeId: NODE_C12_HIST_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did Charu Majumdar’s "annihilation of class enemies" (Khatam Line) ultimately alienate rural peasants and accelerate the Naxal movement’s collapse by 1972?',
    options: [
      'Peasants preferred to emigrate overseas rather than farm',
      'Targeting individual village schoolteachers, doctors, and petty clerks terrorized communities and invited devastating police crackdowns without building mass base institutions',
      'The British colonial police returned to govern the district',
      'Landlords voluntarily distributed 100% of their landholdings within days',
    ],
    correctIndex: 1,
    explanation: 'Individual terror (annihilation line) targeted local professionals and teachers (e.g. Headmaster Niranjan Sengupta) rather than mobilizing mass peasant unions. This terrorized villagers and enabled the state to deploy overwhelming force.',
    hints: [
      'Think about what happens when a movement substitutes individual assassinations for mass public support.',
      'Villagers were caught between revolutionary extortion and state police reprisals.',
      'Terrorizing respected local community members destroyed their social foundation.',
    ],
  },
  {
    id: 'ch_hist_014',
    nodeId: NODE_C12_HIST_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did the Allahabad High Court verdict of 12 June 1975 in Raj Narain v. Indira Gandhi transform Jayaprakash Narayan’s anti-corruption movement?',
    options: [
      'It dismissed all petitions and upheld Indira Gandhi’s election without conditions',
      'Justice Jagmohanlal Sinha found Indira Gandhi guilty of corrupt electoral practices (use of govt officials in campaign), voiding her Lok Sabha seat and prompting JP to demand her immediate resignation',
      'It mandated the immediate dissolution of the Supreme Court of India',
      'It banned all opposition political parties from gathering at Ramlila Maidan',
    ],
    correctIndex: 1,
    explanation: 'Justice Sinha ruled that Indira Gandhi’s 1971 election was invalid due to improper use of state machinery (Yashpal Kapoor). The legal verdict gave JP’s moral movement irresistible constitutional momentum to demand her step down.',
    hints: [
      'Focus on the legal finding regarding the 1971 election in Rae Bareli.',
      'The Prime Minister’s parliamentary seat was declared void for electoral malpractice.',
      'This made her political survival untenable without extra-constitutional measures.',
    ],
  },
  {
    id: 'ch_hist_015',
    nodeId: NODE_C12_HIST_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the "dual membership controversy" that triggered the premature collapse of Morarji Desai’s Janata Government in July 1979?',
    options: [
      'MPs holding citizenship in both India and the United Kingdom',
      'Socialist and BLD leaders demanding that former Jana Sangh members sever their organizational ties and allegiance to the Rashtriya Swayamsevak Sangh (RSS)',
      'Cabinet ministers simultaneously serving as Chief Ministers in their home states',
      'MPs receiving dual salaries from public corporations and Parliament',
    ],
    correctIndex: 1,
    explanation: 'Factions led by Madhu Limaye and Charan Singh demanded that former Jana Sangh leaders (like Vajpayee and Advani) resign from the RSS. The Jana Sangh faction refused, prompting Charan Singh’s breakaway in July 1979.',
    hints: [
      'It concerned the relationship between Janata Party MPs and a parent ideological volunteer organisation.',
      'The RSS connection of former Jana Sangh members was fiercely challenged by socialists.',
      'The controversy over retaining RSS affiliation fractured the ruling coalition.',
    ],
  },

  // Advanced Tier (16-22) — Deep Historiography, Evaluation & Synthesis
  {
    id: 'ch_hist_016',
    nodeId: NODE_C12_HIST_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Historian Ramachandra Guha termed the 1951-52 election "the biggest gamble in history." Why is this assessment validated by the democratic turnout data?',
    options: [
      'Voter turnout was below 10%, showing complete apathy among the poor',
      'Despite 85% illiteracy, over 60% of 17.3 crore registered voters participated enthusiastically, disproving the Western doctrine that literacy is a prerequisite for democratic citizenship',
      'The election was cancelled midway due to civil warfare between provinces',
      'Nehru was appointed Prime Minister by imperial decree without polling',
    ],
    correctIndex: 1,
    explanation: 'Western political theory had long maintained that democracy requires an educated, affluent electorate. India’s 60% turnout among poor, illiterate citizens proved that universal franchise could confer immediate political agency.',
    hints: [
      'Compare Western theories of prerequisite literacy against actual voter behavior in India.',
      'Look at the voter participation rate (~60%).',
      'Universal adult suffrage succeeded in an impoverished post-colonial society.',
    ],
  },
  {
    id: 'ch_hist_017',
    nodeId: NODE_C12_HIST_012,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate Paul Brass’s thesis on the linguistic reorganisation of states (1956). Why did accommodating linguistic regionalism strengthen rather than Balkanize the Indian Union?',
    options: [
      'It eliminated all regional languages in favor of Sanskrit',
      'By allowing regional linguistic communities institutional self-expression within federal boundaries, it defused secessionist tensions — unlike Pakistan where suppressing Bengali led to the 1971 war',
      'It converted India into a loose confederation without a central army',
      'It forced all citizens to relocate to their ancestral linguistic districts',
    ],
    correctIndex: 1,
    explanation: 'Paul Brass and modern political scientists note that institutionalizing language via state boundaries validated regional identities within the constitutional framework. Pakistan’s refusal to accommodate linguistic demands led to national fracture in 1971.',
    hints: [
      'Contrast India’s accommodation with Pakistan’s suppression of Bengali in 1952-1971.',
      'Institutional self-expression defuses alienation.',
      'Linguistic federalism provided a democratic safety valve.',
    ],
  },
  {
    id: 'ch_hist_018',
    nodeId: NODE_C12_HIST_015,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct Ram Manohar Lohia’s coalition doctrine that united disparate opposition parties to defeat Congress hegemony in 1967.',
    availableParts: ['Anti-Congressism', 'Democracy Preservation', 'Non-Congress Unity', 'Programmatic Flexibility', 'Hegemony Dismantling'],
    targetState: 'Anti-Congressism Non-Congress Unity Hegemony Dismantling',
    validationHint: 'Select the 3 core pillars of Lohia’s formula: the overarching doctrine, the tactical method, and the objective.',
    explanation: 'Lohia argued that Congress dominance had ossified into a corrupt monopoly. His "Anti-Congressism" dictated that all opposition parties — regardless of opposing ideologies — must unite tactically to dismantle single-party hegemony.',
    hints: [
      'Start with the famous political concept coined by Lohia ("Anti-...").',
      'Add the tactical imperative of bringing all non-Congress parties together.',
      'Conclude with the goal of breaking single-party hegemony.',
    ],
  },
  {
    id: 'ch_hist_019',
    nodeId: NODE_C12_HIST_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare Jayaprakash Narayan’s 1974-75 movement with Mahatma Gandhi’s 1942 Quit India movement. What fundamental distinction affects the debate on the legitimacy of civil disobedience?',
    options: [
      'Gandhi sought foreign invasion while JP advocated non-alignment',
      'Quit India was directed against an un-elected, foreign colonial despotism; the JP Movement was directed against a democratically elected sovereign government with a parliamentary majority',
      'Gandhi’s movement was violent whereas JP’s movement used guerrilla warfare',
      'There is zero constitutional difference between the two movements',
    ],
    correctIndex: 1,
    explanation: 'Historian Bipan Chandra highlighted this critical dilemma: while civil disobedience against foreign colonial rule is universally recognized as legitimate, using mass extra-parliamentary agitational tactics to force the resignation of an elected government poses fundamental questions for democratic stability.',
    hints: [
      'Consider the constitutional legitimacy of the authority being challenged in 1942 vs 1974.',
      'One target was a colonial regime; the other was an elected parliamentary government.',
      'This distinction defines the historiographical debate between Bipan Chandra and Paul Brass.',
    ],
  },
  {
    id: 'ch_hist_020',
    nodeId: NODE_C12_HIST_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the infamous ADM Jabalpur v. Shivkant Shukla (1976) habeas corpus ruling, what did the 4-1 Supreme Court majority hold, and who was the historic dissenting judge?',
    options: [
      'The Court struck down the Emergency; Justice A.N. Ray dissented',
      'The majority held that during an Emergency, no person has locus standi to approach the court for habeas corpus under Article 21; Justice H.R. Khanna courageously dissented',
      'The Court ordered immediate fresh elections; Justice Beg dissented',
      'The Court dissolved MISA arrests; Justice Chandrachud dissented',
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court majority (Ray, Beg, Chandrachud, Bhagwati) ruled that citizens had no right to life/liberty enforceable in court during Emergency. Justice Hans Raj Khanna’s solitary dissent upheld the inviolability of human liberty, costing him the Chief Justiceship.',
    hints: [
      'Look for the lone judge whose portrait hangs in the Supreme Court today for his brave dissent.',
      'Justice H.R. Khanna was superseded for the CJI post because of his dissent.',
      'The majority ruled that even fundamental right to life (Article 21) was suspended.',
    ],
  },
  {
    id: 'ch_hist_021',
    nodeId: NODE_C12_HIST_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which sweeping constitutional amendment, enacted during the Emergency in November 1976 and termed the "Mini-Constitution", added "Socialist" and "Secular" to the Preamble and curtailed judicial review?',
    options: [
      '38th Constitutional Amendment',
      '39th Constitutional Amendment',
      '42nd Constitutional Amendment',
      '44th Constitutional Amendment',
    ],
    correctIndex: 2,
    explanation: 'The 42nd Amendment (1976) restructured the Constitution by adding "Socialist" and "Secular" to the Preamble, extending parliamentary terms from 5 to 6 years, giving directive principles precedence over fundamental rights, and curbing judicial review.',
    hints: [
      'It is widely referred to as the "Mini-Constitution" of 1976.',
      'Passed during the height of the Emergency.',
      'The 42nd Amendment.',
    ],
  },
  {
    id: 'ch_hist_022',
    nodeId: NODE_C12_HIST_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did the 44th Constitutional Amendment Act (1978) enacted by the Janata Government fortify Indian democracy against future authoritarian abuse?',
    options: [
      'It abolished the office of the Prime Minister and President',
      'It substituted "internal disturbance" with "armed rebellion", mandated written Cabinet advice for Article 352, and barred the suspension of Articles 20 and 21 even during Emergency',
      'It made all political parties illegal and banned national elections',
      'It merged the Supreme Court into the Ministry of Law',
    ],
    correctIndex: 1,
    explanation: 'The 44th Amendment (1978) systematically dismantled Emergency provisions: "internal disturbance" was replaced by "armed rebellion", written cabinet approval was made mandatory, and rights under Articles 20 and 21 (life and protection against conviction) were rendered non-suspendable.',
    hints: [
      'Focus on the specific safeguards inserted to prevent another 1975-style declaration.',
      'The vague phrase "internal disturbance" was eliminated.',
      'Protection of personal liberty under Article 21 can never be suspended.',
    ],
  },
];

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1951-52: The Great Democratic Experiment',
    instruction: 'Select election symbols and assign polling boxes to configure India’s first universal adult franchise booth.',
    interactionType: 'click-ballot',
    nodeId: NODE_C12_HIST_011,
  },
  {
    title: '1953-1956: Linguistic State Reorganisation',
    instruction: 'Drag and adjust regional boundaries on the 1956 map to accommodate linguistic self-determination.',
    interactionType: 'drag-map',
    nodeId: NODE_C12_HIST_012,
  },
  {
    title: '1965: "Jai Jawan, Jai Kisan" Crisis Matrix',
    instruction: 'Balance the defense mobilization slider against food grain rationing to survive the dual 1965 crisis.',
    interactionType: 'slider-balance',
    nodeId: NODE_C12_HIST_013,
  },
  {
    title: '1967: The SVD Coalition Simulator',
    instruction: 'Adjust party alliances to discover how anti-Congressism broke single-party rule across 8 state assemblies.',
    interactionType: 'coalition-builder',
    nodeId: NODE_C12_HIST_014,
  },
  {
    title: '1975-1978: Emergency & Constitutional Restoration',
    instruction: 'Compare the authoritarian 42nd Amendment against the corrective 44th Amendment in real-time.',
    interactionType: 'amendment-compare',
    nodeId: NODE_C12_HIST_019,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happened to the voter turnout percentage in the 1951-52 election compared to contemporary Western democracies?',
    options: [
      'Turnout was under 20% because illiterate voters could not understand the ballots',
      'Turnout reached ~60%, matching or exceeding several established Western nations',
      'Turnout was 100% due to compulsory military voting orders',
      'Turnout was exactly zero as voting booths were boycotted nationwide',
    ],
    correctIndex: 1,
    verifyInstruction: 'Interact with the 1952 Ballot Box simulator below to see how visual symbols mobilized 10.6 crore voters!',
    nodeId: NODE_C12_HIST_011,
  },
  {
    question: 'Predict: In 1967, when Congress vote share dipped by only 4% (from ~44.8% to ~40.8%), what happened to its state assembly seats?',
    options: [
      'No effect at all — Congress retained 100% control of all state cabinets',
      'Due to opposition consolidation under first-past-the-post, Congress lost power in 8 states',
      'Congress gained 150 new seats in every southern assembly',
      'State assemblies were instantly abolished by constitutional decree',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the 1967 Coalition slider to see how united opposition converted small vote swings into huge seat defeats!',
    nodeId: NODE_C12_HIST_014,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you toggle the 1952 symbol system, what makes the multi-box system tamper-resistant for non-literate voters?',
    observableOptions: [
      'Voters dropped pre-marked ballots directly into their chosen candidate’s distinct locked steel box inside a private booth',
      'Officers stamped the voter’s forehead with indelible paint',
      'Candidates watched over the voter’s shoulder inside the voting stall',
      'Ballot papers had to be signed by three village schoolteachers',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HIST_011,
  },
  {
    question: 'Observation: What happens to the constitutional balance when you toggle from the 42nd Amendment (1976) to the 44th Amendment (1978)?',
    observableOptions: [
      'The Prime Minister receives absolute unilateral veto over the judiciary',
      'Judicial review is restored and Fundamental Rights (Articles 20 & 21) become inviolable even in Emergency',
      'Parliament’s term is permanently extended to 10 years',
      'The President becomes an absolute monarch',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_HIST_019,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Democracy Archival Audit: 1951 to Present',
  description: 'Apply the lessons of post-independence institutional resilience to evaluate contemporary democratic safeguards in India.',
  steps: [
    'Choose any one general election or constitutional amendment from the post-independence era.',
    'Identify the core institutional safeguard (e.g. Election Commission independence, Basic Structure doctrine, Article 21 non-derogability).',
    'Write a 200-word comparative brief analyzing how that historical lesson prevents authoritarian overreach today.',
    'Discuss your findings with your peers or history mentor.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_HIST_011,
  title: 'Consolidation of Indian Democracy: 1951 – 1979',
  definition: 'The historical evolution of Indian democracy from the First General Election of 1951-52 through the linguistic reorganisation of states, political transformations of the 1960s, the Naxal and JP mass movements, the 1975-77 Emergency, and the Janata restoration of 1977-79.',
  eli5: 'Think of India as building a brand-new, enormous house for hundreds of millions of diverse people. First, they proved every adult could vote with picture symbols. Then they organized rooms by language. When crises hit — wars, food shortages, protests, and a 21-month lockdown called Emergency — the house was tested to its absolute limits. But in 1977, the people used their votes to restore democracy and reinforce the walls so it could never be locked down easily again.',
  misconceptions: [
    { misconception: 'The 1952 election was held on a single day and suffered poor turnout due to illiteracy.', correction: 'It was conducted in phases across nearly 5 months (Oct 1951 – Mar 1952) with an astounding ~60% voter turnout.' },
    { misconception: 'The States Reorganisation Act 1956 created all 28 present-day Indian states.', correction: 'The 1956 Act created only 14 states and 6 UTs; later states (e.g. Gujarat/MH 1960, Haryana 1966, Nagaland 1963) emerged from subsequent acts.' },
    { misconception: 'The Green Revolution was purely Indira Gandhi’s creation.', correction: 'The High Yielding Variety Programme was launched in 1965 under Lal Bahadur Shastri and C. Subramaniam.' },
    { misconception: 'The Congress party was defeated at the Centre in the 1967 Fourth General Election.', correction: 'Congress retained a narrow majority at the Centre (283/520) under Indira Gandhi, but lost power across 8 key state assemblies.' },
    { misconception: 'The 1975 Emergency was proclaimed because of foreign war.', correction: 'It was proclaimed under Article 352 on grounds of "internal disturbance" following the Allahabad HC verdict and JP mass protests.' },
    { misconception: 'The 42nd and 44th Amendments were passed by the same government for the same purpose.', correction: 'The 42nd (1976) was passed by Indira Gandhi to centralize power; the 44th (1978) was enacted by the Janata government to restore democracy.' },
  ],
  diagnosticQuestions: [
    { question: 'Who served as India’s first Chief Election Commissioner in 1951-52?', options: ['Sukumar Sen', 'T.N. Seshan', 'K.V.K. Sundaram', 'S.P. Sen Verma'], correctIndex: 0 },
    { question: 'Which was the first linguistic state formed in independent India on 1 October 1953?', options: ['Gujarat', 'Andhra State', 'Maharashtra', 'Haryana'], correctIndex: 1 },
    { question: 'What was the status quo ante bellum agreement signed after the 1965 Indo-Pak war called?', options: ['Shimla Agreement', 'Tashkent Declaration', 'Lahore Accord', 'Delhi Pact'], correctIndex: 1 },
    { question: 'In 1967, non-Congress state coalitions were known as:', options: ['Samyukta Vidhayak Dal (SVD)', 'Janata Morcha', 'National Front', 'United Progressive Alliance'], correctIndex: 0 },
    { question: 'Which party was formed in April 1969 after breaking from CPI(M)?', options: ['CPI(ML)', 'Socialist Party', 'Bharatiya Jana Sangh', 'Swatantra Party'], correctIndex: 0 },
    { question: 'What was Jayaprakash Narayan’s famous 1974 rallying call in Patna?', options: ['Jai Jawan Jai Kisan', 'Total Revolution (Sampoorna Kranti)', 'Garibi Hatao', 'Inquilab Zindabad'], correctIndex: 1 },
    { question: 'Which Supreme Court judge delivered the sole heroic dissent in ADM Jabalpur (1976)?', options: ['Justice A.N. Ray', 'Justice H.R. Khanna', 'Justice M.H. Beg', 'Justice P.N. Bhagwati'], correctIndex: 1 },
    { question: 'Who became India’s first non-Congress Prime Minister in March 1977?', options: ['Charan Singh', 'Morarji Desai', 'Atal Bihari Vajpayee', 'Jagjivan Ram'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate thorough mastery across the 10 post-independence historical nodes from the 1951-52 First General Election through the 1977-79 Janata Government.',
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_HistoryFirstGeneralElectionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_HIST_011,
  title = DEFAULT_PROPS.title || 'Consolidation of Indian Democracy: 1951 – 1979',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props) {
  // ─── 30+ RICH REACT STATES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Discovery & Predict-Then-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback FX states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Exploration & Sandbox Lab Variables (5+ Sliders/Controls)
  const [selectedSymbol, setSelectedSymbol] = useState<'bullocks' | 'tree' | 'hut' | 'lamp'>('bullocks');
  const [ballotCastCount, setBallotCastCount] = useState<Record<string, number>>({ bullocks: 120, tree: 35, hut: 24, lamp: 18 });
  const [linguisticRegion, setLinguisticRegion] = useState<'andhra' | 'bombay' | 'punjab'>('andhra');
  const [defenseMobilization, setDefenseMobilization] = useState(65); // 0-100 (Shastri 1965)
  const [foodRationingLevel, setFoodRationingLevel] = useState(70); // 0-100 (Monday Fast + HYVP)
  const [antiCongressSwing, setAntiCongressSwing] = useState(15); // % swing in 1967 SVD
  const [activeAmendmentTab, setActiveAmendmentTab] = useState<'42nd' | '44th'>('42nd');
  const [activeTab, setActiveTab] = useState<'simulator' | 'timeline' | 'sources' | 'map'>('simulator');
  const [selectedHistoricalSource, setSelectedHistoricalSource] = useState<number>(0);
  const [sandboxYear, setSandboxYear] = useState<number>(1952);

  // Persistent BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // ─── FILTERED CHALLENGES BY ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ───
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase, activeTab]);

  // ─── 2D CANVAS PULSE ANIMATION (requestAnimationFrame) ───
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

      // Background grid line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, 15);
      ctx.lineTo(canvas.width - 10, 15);
      ctx.stroke();

      // Dynamic historic frequency pulse
      const wave = Math.sin(tick * 0.06) * 6;
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(30 + ((tick * 1.5) % (canvas.width - 60)), 15 + wave, 5, 0, Math.PI * 2);
      ctx.fill();

      // Label text
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Republic Era Chrono-Engine: ${(1950 + (tick % 30)).toString()}`, 10, 26);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── USECALLBACK HANDLERS (12+ MEMOIZED HANDLERS) ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent! You understand the 1952 voting innovation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration of Indian democracy.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test any historical variable in the free exploration sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('chime');
    speechManager.speak('Let us test your knowledge with rigorous historical challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation below to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation! That is historically accurate.' : 'Inspect the mechanism more closely.');
  }, []);

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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive study of early Indian democracy.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Well analyzed.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us review the historical context together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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
      let current = prev.length === (challenge.sortItems?.length || 0) ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleBallotCast = useCallback((symbol: 'bullocks' | 'tree' | 'hut' | 'lamp') => {
    setSelectedSymbol(symbol);
    setBallotCastCount(prev => ({ ...prev, [symbol]: prev[symbol] + 1 }));
    audioManager.play('pop');
    audioManager.play('count');
  }, []);

  const handleDefenseSlider = useCallback((val: number) => {
    setDefenseMobilization(val);
    audioManager.play('count');
  }, []);

  const handleFoodRationingSlider = useCallback((val: number) => {
    setFoodRationingLevel(val);
    audioManager.play('count');
  }, []);

  const handleAntiCongressSlider = useCallback((val: number) => {
    setAntiCongressSwing(val);
    audioManager.play('count');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Primary source excerpts for Humanities depth
  const PRIMARY_SOURCES = useMemo(() => [
    {
      title: 'Representation of the People Act (1951) & Sukumar Sen’s First Report',
      doc: '“The voter on entering the polling compartment will find as many ballot boxes as there are candidates... each bearing the distinguishing symbol allotted to the candidate. Illiteracy ceased to be a bar to secret voting.”',
      author: 'Report on the First General Elections in India 1951-52',
    },
    {
      title: 'Potti Sriramulu’s Telegram to Jawaharlal Nehru (Nov 1952)',
      doc: '“Fasting undertaken for sacred cause of Andhra State for Telugu people. Administrative delay creates unbearable agony among millions.”',
      author: 'Potti Sriramulu Archive, Madras',
    },
    {
      title: 'Justice H.R. Khanna’s Dissent in ADM Jabalpur (1976)',
      doc: '“Even in the absence of Article 21, the state has no power to deprive a person of his life or liberty without the authority of law. A dissent in a court of last resort is an appeal to the brooding spirit of the law...”',
      author: 'AIR 1976 SC 1207',
    },
  ], []);

  // Derived calculations for 1965 crisis matrix
  const nationStability1965 = useMemo(() => {
    return Math.round((defenseMobilization * 0.55) + (foodRationingLevel * 0.45));
  }, [defenseMobilization, foodRationingLevel]);

  // Derived 1967 SVD seat calculations
  const nonCongressStatePower = useMemo(() => {
    return Math.min(8, Math.max(0, Math.floor((antiCongressSwing / 20) * 8)));
  }, [antiCongressSwing]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER & REAL-TIME TOPIC BANNER ─── */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-800/60">
                ISC Class 12 History • Post-Independence India
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2 py-0.5 rounded-md font-bold uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'advanced' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                  'bg-blue-950 text-blue-400 border border-blue-800'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white mt-1 tracking-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Mini Canvas Animation & Score Meter */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
          <canvas ref={canvasRef} width={220} height={32} className="rounded-lg bg-slate-900/80 border border-slate-800 hidden sm:block" />
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery Index</span>
            <span className="text-sm font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-lg mb-2">
              <span>🏛️</span> {SCENARIO.title}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/70 bg-amber-950/30 p-3 rounded-xl border border-amber-800/30">
              💡 <span className="font-semibold text-amber-300">Historical Challenge:</span> {SCENARIO.context}
            </p>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-amber-400">
              <span>🔍 Curiosity Hook</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <span>{opt}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 text-lg">✓</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Insightful! You recognized the visual symbol breakthrough.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-extrabold rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  Enter Historical Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (Brilliant Style) ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Exploration Navigation Tabs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}. {step.title.split(':')[0]}
                </motion.button>
              ))}
            </div>
            <span className="text-xs text-slate-400 font-mono pl-2 hidden md:inline">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <span className="text-xs font-extrabold uppercase text-amber-400 tracking-wider">
                  Interactive Lab • {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
                <h2 className="text-lg md:text-xl font-bold text-white mt-1">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <p className="text-sm text-amber-300/90 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB STEP 0: 1952 FIRST GENERAL ELECTION (BALLOT BOX LAB) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Visual Ballots & Secret Booth */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div className="text-xs text-slate-400 font-semibold mb-2">
                        CHOOSE A PARTY SYMBOL TO CAST CONFIDENTIAL BALLOT:
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'bullocks', name: 'Two Bullocks with Yoke (Congress)', icon: '🐂🐂', votes: ballotCastCount.bullocks },
                          { id: 'tree', name: 'Banyan Tree (Socialist Party)', icon: '🌳', votes: ballotCastCount.tree },
                          { id: 'hut', name: 'Hut (KMPP / Praja Socialists)', icon: '🛖', votes: ballotCastCount.hut },
                          { id: 'lamp', name: 'Earthen Lamp / Deepak (BJS)', icon: '🪔', votes: ballotCastCount.lamp },
                        ].map((sym) => (
                          <motion.button
                            key={sym.id}
                            whileHover={{ scale: 1.04, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleBallotCast(sym.id as any)}
                            className={`p-3 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                              selectedSymbol === sym.id
                                ? 'bg-amber-950/60 border-amber-500 shadow-lg'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-2xl">{sym.icon}</div>
                            <div>
                              <div className="text-xs font-bold text-white leading-tight">{sym.name}</div>
                              <div className="text-[10px] text-amber-400 mt-0.5">Box Tally: {sym.votes} votes</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Interactive 1952 Polling Booth SVG */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 400 220" className="w-full h-auto max-h-56">
                        {/* Booth Screen */}
                        <rect x="20" y="20" width="360" height="180" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                        <text x="200" y="45" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                          1951-52 SECRET POLLING BOOTH (2,24,000 NATIONWIDE)
                        </text>

                        {/* Four Distinct Steel Ballot Boxes */}
                        {[
                          { x: 45, label: 'Congress', sym: '🐂🐂', count: ballotCastCount.bullocks, color: '#f59e0b' },
                          { x: 130, label: 'Socialist', sym: '🌳', count: ballotCastCount.tree, color: '#10b981' },
                          { x: 215, label: 'KMPP', sym: '🛖', count: ballotCastCount.hut, color: '#38bdf8' },
                          { x: 300, label: 'Jana Sangh', sym: '🪔', count: ballotCastCount.lamp, color: '#f43f5e' },
                        ].map((box, i) => (
                          <g key={i}>
                            <rect x={box.x} y="70" width="65" height="90" rx="6" fill="#1e293b" stroke={box.color} strokeWidth="1.5" />
                            <rect x={box.x + 18} y="75" width="28" height="6" rx="2" fill="#0f172a" />
                            <text x={box.x + 32} y="110" textAnchor="middle" fontSize="16">{box.sym}</text>
                            <text x={box.x + 32} y="132" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="bold">{box.label}</text>
                            <text x={box.x + 32} y="148" textAnchor="middle" fill={box.color} fontSize="9">{box.count}</text>
                          </g>
                        ))}
                        <text x="200" y="190" textAnchor="middle" fill="#64748b" fontSize="10">
                          Total Electorate: 17.3 Crore • Turnout: ~60% (10.6 Cr voted)
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Multi-Representation Data Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">Total Lok Sabha Seats</span>
                      <span className="text-base font-bold text-white">489 Seats</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">Congress Won</span>
                      <span className="text-base font-bold text-amber-400">364 Seats (45% vote)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">Largest Opposition (CPI)</span>
                      <span className="text-base font-bold text-rose-400">16 Seats</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 block">Steel Ballot Boxes Made</span>
                      <span className="text-base font-bold text-emerald-400">20+ Lakh Boxes</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 1: LINGUISTIC REORGANISATION OF STATES (1953-1956) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Region Selector */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <span className="text-xs font-semibold text-slate-400 block">SELECT HISTORICAL CASE STUDY:</span>
                      {[
                        { id: 'andhra', label: '1. Andhra (1952-1953)', desc: 'Potti Sriramulu 58-day fast → Telugu state formed 1 Oct 1953 (Kurnool capital).' },
                        { id: 'bombay', label: '2. Bombay State (1956-1960)', desc: '1956 bilingual compromise failed → 1 May 1960 split into Maharashtra & Gujarat.' },
                        { id: 'punjab', label: '3. Punjab (1956-1966)', desc: 'Akali Dal Punjabi Suba demand → 1 Nov 1966 split into Punjab & Haryana.' },
                      ].map((reg) => (
                        <motion.button
                          key={reg.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setLinguisticRegion(reg.id as any);
                            audioManager.play('tap');
                          }}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                            linguisticRegion === reg.id
                              ? 'bg-amber-950/70 border-amber-500 text-white'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <div className="font-bold text-amber-300">{reg.label}</div>
                          <div className="text-[11px] text-slate-300 mt-1">{reg.desc}</div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Dynamic Linguistic Map Visualizer */}
                    <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <svg viewBox="0 0 420 220" className="w-full h-auto max-h-56">
                        <rect width="420" height="220" rx="10" fill="#090d16" />
                        {/* Map Shapes & Linguistic Labels */}
                        {linguisticRegion === 'andhra' && (
                          <g>
                            <path d="M 180,110 L 280,100 L 290,170 L 220,190 Z" fill="#f59e0b" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="2" />
                            <text x="240" y="145" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="bold">Andhra State (1953)</text>
                            <text x="240" y="162" textAnchor="middle" fill="#cbd5e1" fontSize="10">Telugu Linguistic Pioneer</text>
                            <circle cx="215" cy="175" r="4" fill="#ef4444" />
                            <text x="215" y="187" textAnchor="middle" fill="#fca5a5" fontSize="8">Kurnool (Capital)</text>
                          </g>
                        )}
                        {linguisticRegion === 'bombay' && (
                          <g>
                            <path d="M 80,80 L 160,80 L 170,120 L 100,120 Z" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
                            <text x="125" y="105" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Gujarat (1960)</text>
                            <path d="M 90,125 L 180,125 L 190,190 L 110,180 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="2" />
                            <text x="145" y="155" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">Maharashtra (1960)</text>
                            <circle cx="95" cy="140" r="4" fill="#fbbf24" />
                            <text x="95" y="133" textAnchor="middle" fill="#fef08a" fontSize="8">Mumbai</text>
                          </g>
                        )}
                        {linguisticRegion === 'punjab' && (
                          <g>
                            <path d="M 140,30 L 190,30 L 185,75 L 135,70 Z" fill="#ec4899" fillOpacity="0.4" stroke="#ec4899" strokeWidth="2" />
                            <text x="160" y="55" textAnchor="middle" fill="#fbcfe8" fontSize="11" fontWeight="bold">Punjab (Punjabi)</text>
                            <path d="M 170,75 L 215,75 L 210,110 L 165,105 Z" fill="#a855f7" fillOpacity="0.4" stroke="#a855f7" strokeWidth="2" />
                            <text x="190" y="95" textAnchor="middle" fill="#e9d5ff" fontSize="11" fontWeight="bold">Haryana (Hindi)</text>
                            <circle cx="178" cy="75" r="4" fill="#fbbf24" />
                            <text x="195" y="70" fill="#fde047" fontSize="8">Chandigarh (Shared UT)</text>
                          </g>
                        )}
                        <text x="210" y="208" textAnchor="middle" fill="#64748b" fontSize="9">
                          States Reorganisation Act (1 Nov 1956): Fazal Ali, H.N. Kunzru, K.M. Panikkar
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 2: SHASTRI 1965 "JAI JAWAN, JAI KISAN" MATRIX ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        1965 Crisis Policy Simulator: Defense + Food Self-Reliance
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                        National Resilience Score: {nationStability1965}/100
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>🎖️ "Jai Jawan" (Defense Readiness):</span>
                          <span className="font-bold text-amber-400">{defenseMobilization}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={defenseMobilization}
                          onChange={(e) => handleDefenseSlider(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="Adjust defense mobilization"
                        />
                        <span className="text-[11px] text-slate-400 block">Op Gibraltar countered at Lahore/Sialkot sectors.</span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>🌾 "Jai Kisan" (HYVP + Monday Fast):</span>
                          <span className="font-bold text-emerald-400">{foodRationingLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={foodRationingLevel}
                          onChange={(e) => handleFoodRationingSlider(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                          aria-label="Adjust food rationing"
                        />
                        <span className="text-[11px] text-slate-400 block">C. Subramaniam & Swaminathan launch Green Rev HYV seeds.</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                      <span>🕊️ <strong>10 Jan 1966 Tashkent Declaration:</strong> Status quo ante bellum (Haji Pir returned).</span>
                      <span className="text-amber-400 font-bold">Alexei Kosygin (USSR Mediation)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 3: 1967 SVD COALITION & ANTI-CONGRESSISM ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase">
                        1967 Fourth General Election: Anti-Congressism Shift
                      </span>
                      <span className="text-xs font-bold text-rose-400 bg-rose-950 px-2.5 py-1 rounded-lg border border-rose-800">
                        Congress Lost in {nonCongressStatePower} States
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Opposition Consolidation Swing (Lohia's Non-Congress Unity):</span>
                        <span className="font-bold text-amber-400">+{antiCongressSwing}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        value={antiCongressSwing}
                        onChange={(e) => handleAntiCongressSlider(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Adjust anti-Congress swing"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      {[
                        { state: 'Bihar', gov: 'SVD (Karpoori Thakur)' },
                        { state: 'West Bengal', gov: 'United Front (Bangla Cong)' },
                        { state: 'Kerala', gov: 'CPI(M) (Namboodiripad)' },
                        { state: 'Madras (TN)', gov: 'DMK (Annadurai)' },
                      ].map((s, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                          <span className="text-amber-400 font-bold block">{s.state}</span>
                          <span className="text-[11px] text-slate-300">{s.gov}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB STEP 4: EMERGENCY (42ND) VS JANATA RESTORATION (44TH) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveAmendmentTab('42nd');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                        activeAmendmentTab === '42nd'
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      42nd Amendment (1976) • "Mini-Constitution"
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveAmendmentTab('44th');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 p-3 rounded-xl border text-xs font-bold transition-all ${
                        activeAmendmentTab === '44th'
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      44th Amendment (1978) • Janata Restoration
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    {activeAmendmentTab === '42nd' ? (
                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300">
                          🔴 <strong>Executive Dominance:</strong> Barred judicial review of amendments; extended Parliament from 5 to 6 years.
                        </div>
                        <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300">
                          🔴 <strong>Preamble Alteration:</strong> Added "Socialist" and "Secular" to the Preamble.
                        </div>
                        <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300">
                          🔴 <strong>Civil Liberties Crushed:</strong> Article 21 suspended (ADM Jabalpur 1976 majority ruling).
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-300">
                          🟢 <strong>Emergency Safeguard:</strong> Substituted "internal disturbance" with "armed rebellion"; written Cabinet advice mandatory.
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-300">
                          🟢 <strong>Judicial Review Restored:</strong> Restored Supreme Court scrutiny over constitutional changes (Basic Structure).
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-900/60 text-emerald-300">
                          🟢 <strong>Inalienable Rights:</strong> Articles 20 & 21 can NEVER be suspended during Emergency.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Exploration Step Footer Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('whoosh');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-extrabold"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg"
                  >
                    Open Full Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (Zero-Pressure Free Lab) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white">Free Exploration Archives (1951 - 1979)</h3>
                <p className="text-xs text-slate-400">Manipulate any era, inspect primary sources, or analyze cause-effect chains with no grading pressure.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg"
              >
                Ready for Graded Challenges →
              </motion.button>
            </div>

            {/* Sandbox Tabs */}
            <div className="flex gap-2">
              {(['simulator', 'timeline', 'sources'] as const).map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab(tab);
                    audioManager.play('tap');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                    activeTab === tab ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>

            {/* Sandbox View: Interactive Timeline with GSAP */}
            {activeTab === 'timeline' && (
              <div ref={timelineGsapRef} className="space-y-3 p-4 bg-slate-950 rounded-xl border border-slate-800 max-h-96 overflow-y-auto">
                {[
                  { year: '1951-52', event: 'First General Election', note: '17.3 Cr voters, 85% illiterate, 20L ballot boxes, Congress wins 364/489.' },
                  { year: '1953', event: 'Creation of Andhra State', note: 'Potti Sriramulu 58-day fast leads to first linguistic state.' },
                  { year: '1956', event: 'States Reorganisation Act', note: '14 States & 6 UTs created based on Fazal Ali Commission report.' },
                  { year: '1965', event: 'Indo-Pak War & Food Crisis', note: 'Shastri’s "Jai Jawan, Jai Kisan" & High Yielding Variety Green Rev.' },
                  { year: '1967', event: 'Fourth General Election', note: 'Congress loses 8 states; SVD coalitions form under anti-Congressism.' },
                  { year: '1969', event: 'CPI(ML) Formation & Naxal Escalation', note: 'Charu Majumdar & Kanu Sanyal lead armed peasant insurgency.' },
                  { year: '1974', event: 'JP Total Revolution (Sampoorna Kranti)', note: 'Navnirman Gujarat & Bihar student movements coalesce.' },
                  { year: '1975-77', event: 'National Emergency (Article 352)', note: 'Allahabad verdict trigger, MISA arrests, censorship, 42nd Amendment.' },
                  { year: '1977-79', event: 'Janata Party Government', note: 'Morarji Desai PM, 44th Amendment restores democracy, dual membership split.' },
                ].map((item, i) => (
                  <div key={i} className="timeline-node p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-md border border-amber-800 whitespace-nowrap">
                      {item.year}
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.event}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sandbox View: Primary Sources */}
            {activeTab === 'sources' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex gap-2">
                  {PRIMARY_SOURCES.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedHistoricalSource(i)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        selectedHistoricalSource === i ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Doc #{i + 1}
                    </button>
                  ))}
                </div>
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400">{PRIMARY_SOURCES[selectedHistoricalSource].title}</div>
                  <blockquote className="text-xs italic text-slate-300 border-l-2 border-amber-500 pl-3 leading-relaxed">
                    {PRIMARY_SOURCES[selectedHistoricalSource].doc}
                  </blockquote>
                  <div className="text-[10px] text-slate-500 text-right">— {PRIMARY_SOURCES[selectedHistoricalSource].author}</div>
                </div>
              </div>
            )}

            {/* Sandbox View: Integrated Slider Playground */}
            {activeTab === 'simulator' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-slate-300">ERA TIME SLIDER: Year {sandboxYear}</span>
                  <input
                    type="range"
                    min="1951"
                    max="1979"
                    value={sandboxYear}
                    onChange={(e) => setSandboxYear(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                    aria-label="Sandbox Year Slider"
                  />
                  <div className="text-xs text-amber-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    {sandboxYear <= 1952 && '1951-52: Universal Adult Suffrage, Sukumar Sen, Symbol ballot boxes.'}
                    {sandboxYear > 1952 && sandboxYear <= 1956 && '1953-56: Potti Sriramulu fast, Andhra State, Fazal Ali Commission.'}
                    {sandboxYear > 1956 && sandboxYear <= 1966 && '1964-66: Shastri Premiership, Indo-Pak 1965 war, Jai Jawan Jai Kisan, Tashkent.'}
                    {sandboxYear > 1966 && sandboxYear <= 1974 && '1967-74: 1967 SVD coalition wave, Naxalbari uprising, CPI(ML) formation.'}
                    {sandboxYear > 1974 && sandboxYear <= 1977 && '1975-77: Allahabad verdict, JP Total Revolution, 21-month Emergency, 42nd Amendment.'}
                    {sandboxYear > 1977 && '1977-79: Janata Party win, 44th Amendment restoration, dual-membership collapse.'}
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center text-center">
                  <div>
                    <div className="text-3xl mb-1">⚖️</div>
                    <div className="text-xs font-bold text-white">Constitutional Balance Indicator</div>
                    <div className="text-[11px] text-slate-400 mt-1">Every democratic challenge between 1951-1979 cemented institutions that sustain the Republic.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE GRADED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {/* Progress & Difficulty Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  Competency: {challenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-semibold text-white mt-0.5">
                Target Node: <span className="text-amber-300 font-mono">{challenge.nodeId}</span>
              </h3>
            </div>
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
                <span>Progress</span>
                <span>{Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* ─── CHALLENGE CARD ─── */}
          <div className="bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-800 shadow-xl space-y-4">
            <h4 className="text-base md:text-lg font-bold text-white leading-snug">
              {challenge.question}
            </h4>

            {/* TYPE A: MCQ / CLASSIFY / DISTINGUISH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-100'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/60'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <span>{opt}</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 text-lg">✓</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE B: DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each item onto its matching target below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600/30 text-amber-300 border border-amber-500/50 rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-3.5 bg-slate-950 rounded-xl border border-dashed border-slate-700 flex flex-col justify-between min-h-[70px]"
                    >
                      <span className="text-xs font-mono text-slate-400 capitalize">
                        Target: {targetKey.replace('target_', 'Year ')}
                      </span>
                      <div className="text-sm font-bold text-amber-400 mt-1">
                        {droppedLabels[targetKey] ? `✓ ${droppedLabels[targetKey]}` : 'Drop matching milestone here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* TYPE C: DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 block">Drag items or arrange them into correct chronological order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
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
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-mono flex items-center justify-center font-bold text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs mt-2"
                >
                  Submit Order →
                </motion.button>
              </div>
            )}

            {/* TYPE D: NUMERIC INPUT */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono focus:border-amber-500 focus:outline-none"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-sm text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs disabled:opacity-50"
                  >
                    Check →
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE E: CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 pt-2">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 text-amber-300 border border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold flex items-center gap-1.5">
                      {p}
                      <button onClick={() => setConstructParts(cp => cp.filter((_, i) => i !== idx))} className="text-rose-400 hover:text-white">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble doctrine...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-amber-500 text-slate-950 font-extrabold rounded-xl text-xs"
                >
                  Verify Doctrine →
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-amber-950/40 border border-amber-700/60 space-y-3 mt-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  <span>📖 Detailed Historical Analysis</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3.5 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Sentence →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Evaluation →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, MASTERY AUDIT & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 border border-amber-600/50 shadow-2xl text-center space-y-3">
            <span className="text-4xl">🏛️</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              Democracy Simulation Complete!
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              You have completed the historical analysis across the 10 foundational nodes of the Republic of India (1951–1979).
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-xl font-bold text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block">Mastery Rating</span>
                <span className="text-xl font-bold text-emerald-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Motivational Personalized Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            {errors === 0 ? (
              <strong className="text-emerald-400">PERFECT ARCHIVAL SCORE! You have demonstrated exceptional mastery of Indian constitutional and political history!</strong>
            ) : errors <= 3 ? (
              <strong className="text-amber-400">EXCELLENT HISTORICAL ANALYSIS! You possess solid comprehension of post-independence democracy.</strong>
            ) : (
              <strong className="text-slate-300">GOOD EFFORT! Review the specific misconception corrections below to solidify your understanding for the ISC Board Examination.</strong>
            )}
          </div>

          {/* Misconception Gaps Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Remediation Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-400">✓ Historical Truth: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Review Schedule */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-amber-400">Spaced Repetition Schedule (SM-2)</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Next review recommended in <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock into long-term memory.
              </div>
            </div>
            <span className="text-xs font-mono bg-amber-950 px-2.5 py-1 rounded-md text-amber-300 border border-amber-800">
              SRS Interval Active
            </span>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📝</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HistoryFirstGeneralElectionSim;