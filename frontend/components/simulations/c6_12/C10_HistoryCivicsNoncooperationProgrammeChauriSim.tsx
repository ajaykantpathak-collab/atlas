'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE CONSTANTS ───
const NODE_C10_HISTCIV_031 = 'c10_histciv_031';
const NODE_C10_HISTCIV_032 = 'c10_histciv_032';
const NODE_C10_HISTCIV_033 = 'c10_histciv_033';
const NODE_C10_HISTCIV_034 = 'c10_histciv_034';
const NODE_C10_HISTCIV_035 = 'c10_histciv_035';
const NODE_C10_HISTCIV_036 = 'c10_histciv_036';
const NODE_C10_HISTCIV_037 = 'c10_histciv_037';
const NODE_C10_HISTCIV_038 = 'c10_histciv_038';
const NODE_C10_HISTCIV_039 = 'c10_histciv_039';
const NODE_C10_HISTCIV_040 = 'c10_histciv_040';

const ALL_NODE_IDS = [
  NODE_C10_HISTCIV_031,
  NODE_C10_HISTCIV_032,
  NODE_C10_HISTCIV_033,
  NODE_C10_HISTCIV_034,
  NODE_C10_HISTCIV_035,
  NODE_C10_HISTCIV_036,
  NODE_C10_HISTCIV_037,
  NODE_C10_HISTCIV_038,
  NODE_C10_HISTCIV_039,
  NODE_C10_HISTCIV_040
];

const SCENARIO = {
  title: 'The Crossroads of Freedom: 1914 to 1947',
  intro: 'You are the Chief Historical Analyst investigating how global crises (WWI, Versailles) and three distinct mass Gandhian movements, alongside revolutionary military action (INA), shaped the final road to Indian independence.',
  context: 'Examiners rigorously check if you distinguish Non-Cooperation (boycott) from Civil Disobedience (law-breaking) and Quit India (spontaneous rebellion), while tracking the causes of WWI and the fateful Partition plans.'
};

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_01',
    question: 'If Gandhi marches 240 miles to Dandi to break the Salt Monopoly, how will the colonial administration respond initially vs after the law is broken?',
    options: [
      'Immediate total surrender by Lord Irwin before the coast is reached.',
      'Initial ridicule/underestimation followed by mass arrests of over 60,000 satyagrahis.',
      'A complete ban on salt production across the British Empire forever.',
      'Armed bombardment of the Sabarmati Ashram.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the Satyagraha Journey slider to 240 miles in Act II to verify the nationwide outcome.',
    explanation: 'Colonial authorities initially scoffed at salt as a political weapon, but the symbolic defiance sparked countrywide civil disobedience resulting in 60,000+ arrests.'
  },
  {
    id: 'pred_02',
    question: 'What will happen to the European balance of power if punitive reparations under Versailles are fixed at £6,600 million without German industrial safeguards?',
    options: [
      'Germany will rapidly become the wealthiest trading ally of Great Britain.',
      'Severe hyperinflation, economic despair, and revanchist nationalism leading to another world war.',
      'The immediate peaceful unification of all European states under the League of Nations.',
      'Total economic stability with zero debt default across Central Europe.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Versailles Reparations slider in Act V to observe how unsustainable indemnity fueled instability.',
    explanation: 'Economist J.M. Keynes predicted that crushing reparations would wreck Europe’s economy and breed radical vengeance, laying the ground for WWII.'
  }
];

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_01',
    question: 'Observing the Non-Cooperation Programme stages, which transition marks the shift from symbolic protest to national self-reliance and institution building?',
    observableOptions: [
      'From title surrenders to establishing national universities like Jamia Millia and Kashi Vidyapeeth and spinning Khadi.',
      'From council boycotts directly to armed military mutiny against cantonments.',
      'From legal court boycotts to immediate departure of all British troops in 1921.',
      'From domestic tax refusal to foreign diplomatic alliances with Germany.'
    ],
    correctIndex: 0,
    explanation: 'National schools, universities (Kashi Vidyapeeth 1921, Jamia Millia 1920), and indigenous Khadi production were built to provide constructive national alternatives to boycotted colonial institutions.'
  },
  {
    id: 'obs_02',
    question: 'Observing the comparative matrix of the 3 Gandhian movements, what fundamental tactical difference distinguishes 1920 Non-Cooperation from 1930 Civil Disobedience?',
    observableOptions: [
      '1920 was negative withdrawal and boycott of colonial institutions; 1930 was active, public violation of specific unjust statutes (e.g., Salt Law).',
      '1920 was an armed revolution; 1930 was a purely constitutional petition signed by lawyers.',
      '1920 was restricted to South India; 1930 occurred entirely inside the British Parliament.',
      '1920 demanded complete partition; 1930 accepted permanent dominion status under the Viceroy.'
    ],
    correctIndex: 0,
    explanation: 'Non-Cooperation relied on negative boycott (abstaining from colonial structures), whereas Civil Disobedience involved active, public breaches of colonial statutes (like the Salt Laws).'
  }
];

const DISCOVERY_QUESTION = {
  question: 'On 5 February 1922, violence erupted at Chauri Chaura resulting in the death of 22 policemen. What was Gandhi’s immediate strategic decision?',
  options: [
    'He declared full war against British police stations.',
    'He suspended the entire Non-Cooperation Movement on moral grounds.',
    'He permanently withdrew from politics forever.',
    'He merged the movement with the violent armed revolution.'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Gandhi prioritized the moral integrity of Ahimsa (non-violence) over tactical political momentum!'
};

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

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C10_HISTCIV_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following educational institutions was founded in 1921 at Banaras as a direct result of the school boycott during Non-Cooperation?',
    options: ['Jamia Millia Islamia', 'Kashi Vidyapeeth', 'Aligarh Muslim University', 'Banaras Hindu University'],
    correctIndex: 1,
    explanation: 'Kashi Vidyapeeth was established in 1921 at Banaras, while Jamia Millia Islamia was founded in 1920 at Aligarh (later shifted to Delhi in 1925).',
    hints: [
      'Think of the national university founded in Varanasi (Banaras) in 1921.',
      'Jamia Millia was founded in Aligarh (1920); Kashi Vidyapeeth was founded in Banaras.',
      'The Banaras institution founded in 1921 is Kashi Vidyapeeth.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02',
    nodeId: NODE_C10_HISTCIV_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'At which historic Congress session was the "Poorna Swaraj" (Complete Independence) resolution passed on 31 December 1929?',
    options: ['Calcutta Session 1928', 'Nagpur Session 1920', 'Lahore Session 1929', 'Tripuri Session 1939'],
    correctIndex: 2,
    explanation: 'The Lahore Session of December 1929, presided over by Jawaharlal Nehru, passed the Poorna Swaraj resolution declaring complete independence.',
    hints: [
      'It was presided over by Jawaharlal Nehru on the banks of River Ravi.',
      'This session also led to declaring 26 January 1930 as Independence Day.',
      'The city is Lahore.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03',
    nodeId: NODE_C10_HISTCIV_033,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many trusted satyagrahis accompanied Mahatma Gandhi when he began the historic Dandi March on 12 March 1930 from Sabarmati?',
    correctAnswer: 78,
    tolerance: 0,
    unit: 'satyagrahis',
    explanation: 'Gandhi set out from Sabarmati Ashram with exactly 78 chosen satyagrahis, marching 240 miles to Dandi.',
    hints: [
      'It is a two-digit number between 70 and 80.',
      'Seven tens plus eight units.',
      'The exact number is 78.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_04',
    nodeId: NODE_C10_HISTCIV_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who was the original founder who first raised the Indian National Army (INA) in Singapore in 1942?',
    options: ['Subhas Chandra Bose', 'Rash Behari Bose', 'Captain Mohan Singh', 'Lord Mountbatten'],
    correctIndex: 2,
    explanation: 'The INA was first founded by Captain Mohan Singh in 1942 from Indian POWs. Subhas Chandra Bose took over leadership and reorganised it on 4 July 1943.',
    hints: [
      'Do not confuse the original founder with the supreme reorganiser in 1943.',
      'He was a British-Indian army captain who formed the unit from Japanese-held POWs.',
      'His name is Captain Mohan Singh.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_05',
    nodeId: NODE_C10_HISTCIV_039,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which three nations constituted the Triple Alliance formed in 1882?',
    options: [
      'Britain, France, Russia',
      'Germany, Austria-Hungary, Italy',
      'Germany, Russia, Ottoman Empire',
      'Britain, Japan, USA'
    ],
    correctIndex: 1,
    explanation: 'The Triple Alliance (1882) comprised Germany, Austria-Hungary, and Italy. Triple Entente (1907) comprised Britain, France, and Russia.',
    hints: [
      'Triple Alliance consists of Central European land powers.',
      'Germany and Austria-Hungary were the core, joined initially by Italy.',
      'Select Germany, Austria-Hungary, and Italy.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_06',
    nodeId: NODE_C10_HISTCIV_040,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Treaty of Versailles (1919), what was the maximum number of men to which the German Army was strictly capped?',
    correctAnswer: 100000,
    tolerance: 0,
    unit: 'soldiers',
    explanation: 'The military clauses of Versailles limited the German Army to 100,000 volunteers with no conscription, tanks, or air force.',
    hints: [
      'It is one hundred thousand (1 Lakh in Indian numbering).',
      'Enter 100000.',
      'The number is 100000.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_07',
    nodeId: NODE_C10_HISTCIV_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What famous slogan did Mahatma Gandhi give to the nation at Gowalia Tank Maidan on 8 August 1942 during the launch of Quit India?',
    options: ['Delhi Chalo', 'Do or Die (Karenge ya Marenge)', 'Jai Hind', 'Swaraj is my birthright'],
    correctIndex: 1,
    explanation: 'Gandhi delivered the rallying mantra "Do or Die" (Karenge ya Marenge) on 8 August 1942 at Gowalia Tank Maidan, Bombay.',
    hints: [
      'It means we shall either free India or die in the attempt.',
      'In Hindi: Karenge ya Marenge.',
      'Select "Do or Die".'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_08',
    nodeId: NODE_C10_HISTCIV_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did Gandhi suspend the Non-Cooperation Movement on 11 February 1922 following the Chauri Chaura incident?',
    options: [
      'Because the British government granted dominion status immediately.',
      'Because violence violated the moral core of satyagraha, proving the masses needed further non-violent discipline.',
      'Because the Muslim League withdrew from the Khilafat alliance.',
      'Because Congress leaders instructed him that council entry was more profitable.'
    ],
    correctIndex: 1,
    explanation: 'Gandhi viewed non-violence (Ahimsa) as non-negotiable. Mob violence at Chauri Chaura meant the masses were not yet adequately disciplined in satyagraha.',
    hints: [
      'Gandhi saw means and ends as inseparable.',
      'He refused to allow a righteous struggle to degenerate into mob brutality.',
      'The suspension was a voluntary moral decision to safeguard non-violent integrity.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_09',
    nodeId: NODE_C10_HISTCIV_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why was the Simon Commission (1928) boycotted by ALL Indian political parties including Congress, Muslim League, and Hindu Mahasabha?',
    options: [
      'It recommended the immediate division of Punjab and Bengal.',
      'It was an all-white commission containing zero Indian members tasked with deciding India’s constitutional future.',
      'It demanded higher land revenue from Gujarati peasants.',
      'It refused to release political prisoners from Yerwada jail.'
    ],
    correctIndex: 1,
    explanation: 'All seven members of the Simon Commission were British MPs. The utter exclusion of Indians was seen as a national insult to Indian self-respect.',
    hints: [
      'Look at the racial composition of the 7-member commission.',
      'Not a single Indian was included in deciding India’s constitution.',
      'It was an all-British body with zero Indian members.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_10',
    nodeId: NODE_C10_HISTCIV_034,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Categorise the concessions of the Gandhi-Irwin Pact (5 March 1931) to the correct negotiating party.',
    dragItems: [
      { label: 'Suspend Civil Disobedience', targetId: 'side_congress' },
      { label: 'Release non-violent prisoners', targetId: 'side_british' },
      { label: 'Attend 2nd Round Table Conference', targetId: 'side_congress' },
      { label: 'Permit coastal salt making', targetId: 'side_british' }
    ],
    correctMapping: {
      side_congress: 'Suspend Civil Disobedience',
      side_british: 'Release non-violent prisoners'
    },
    explanation: 'Congress agreed to suspend Civil Disobedience & attend the 2nd RTC. The British agreed to release non-violent prisoners, permit coastal domestic salt collection, and restore confiscated lands.',
    hints: [
      'Congress agreed to halt protests and send Gandhi to London.',
      'The British agreed to release satyagrahis and permit salt making on the coast.',
      'Segregate Congress duties from British legal concessions.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_11',
    nodeId: NODE_C10_HISTCIV_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In 1942, why did the Quit India movement become completely spontaneous and leaderless immediately after 9 August?',
    options: [
      'Congress issued a circular ordering secret underground armed cells.',
      'The British arrested all top leaders (Gandhi, Nehru, Azad) in pre-dawn raids under Operation Zero Hour.',
      'Subhas Chandra Bose ordered the INA to take over Congress headquarters.',
      'The provincial ministries resigned and joined the Japanese army.'
    ],
    correctIndex: 1,
    explanation: 'On the morning of 9 August 1942, the colonial government arrested the entire Congress High Command. With no leaders to direct them, workers, peasants, and students took initiative spontaneously.',
    hints: [
      'What happened in the pre-dawn hours of 9 August 1942?',
      'Gandhi, Nehru, and all Working Committee members were imprisoned.',
      'The arrest of all leaders forced the movement to become self-organising and leaderless.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_12',
    nodeId: NODE_C10_HISTCIV_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following was a fundamental feature of the Cabinet Mission Plan (16 May 1946) as opposed to the Mountbatten Plan?',
    options: [
      'Division of India into two sovereign dominions immediately.',
      'Preservation of a united Indian federation with a weak centre and provincial grouping into Sections A, B, and C.',
      'Immediate referendum in NWFP and Sylhet for partition.',
      'Abolition of the office of Governor-General.'
    ],
    correctIndex: 1,
    explanation: 'The Cabinet Mission Plan rejected Pakistan and proposed a united Indian federation with a weak centre (handling defence, foreign affairs, communications) and grouped provinces.',
    hints: [
      'Cabinet Mission (1946) attempted to preserve unity, not divide India.',
      'It proposed provincial grouping (Sections A, B, C) and rejected Pakistan.',
      'Select the option describing a united federation with provincial grouping.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_13',
    nodeId: NODE_C10_HISTCIV_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What exact constitutional status did India hold between 15 August 1947 and 26 January 1950?',
    options: [
      'Sovereign Democratic Republic',
      'Dominion under the British Crown with a Governor-General',
      'British Crown Colony ruled by a Viceroy',
      'Protectorate under the League of Nations'
    ],
    correctIndex: 1,
    explanation: 'The Indian Independence Act 1947 created two Dominions within the Commonwealth. India became a Sovereign Democratic Republic only when the Constitution took effect on 26 Jan 1950.',
    hints: [
      'The British monarch remained titular head of state until the 1950 Constitution.',
      'The head of state was the Governor-General (Lord Mountbatten, then C. Rajagopalachari).',
      'India was a Dominion during this transitional period.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_14',
    nodeId: NODE_C10_HISTCIV_039,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of crisis events in the July Crisis of 1914 leading to WWI in chronological order.',
    sortItems: [
      'Assassination of Archduke Franz Ferdinand at Sarajevo (28 June 1914)',
      'Austria-Hungary declares war on Serbia (28 July 1914)',
      'Russia mobilises troops in defence of Serbia (29-30 July 1914)',
      'Germany declares war on Russia and France; Britain enters after Belgium invasion (1-4 August 1914)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The spark on 28 June led to the Austrian ultimatum/declaration on 28 July, Russian counter-mobilisation, and the alliance cascade by 4 August.',
    hints: [
      'Start with the assassination in Bosnia on 28 June.',
      'Next is Austria’s war declaration on Serbia exactly one month later.',
      'Then Russian mobilisation triggers German and British declarations.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_15',
    nodeId: NODE_C10_HISTCIV_031,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Assemble the 5 progressive stages of the Non-Cooperation Movement in the exact strategic order Gandhi designed them.',
    availableParts: [
      '1. Surrender of Titles',
      '2. Boycott of Schools & Colleges',
      '3. Boycott of Courts & Law',
      '4. Boycott of Foreign Cloth (Khadi)',
      '5. Non-Payment of Taxes'
    ],
    targetState: '1. Surrender of Titles 2. Boycott of Schools & Colleges 3. Boycott of Courts & Law 4. Boycott of Foreign Cloth (Khadi) 5. Non-Payment of Taxes',
    validationHint: 'Add the stages from symbolic title return up to tax refusal.',
    explanation: 'The programme unfolded in stages: (1) Surrender of honours, (2) Boycott of colonial education, (3) Boycott of courts/councils, (4) Boycott of foreign cloth, and (5) Non-payment of taxes as final apex.',
    hints: [
      'Stage 1 is purely symbolic (titles).',
      'Stage 2 & 3 target schools and courts.',
      'Stage 4 is economic (cloth), and Stage 5 is civil tax refusal.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_16',
    nodeId: NODE_C10_HISTCIV_033,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Analyse the fundamental methodological distinction between Non-Cooperation (1920-22) and Civil Disobedience (1930-34):',
    options: [
      'Non-Cooperation was violent armed revolt; Civil Disobedience was purely peaceful petitioning.',
      'Non-Cooperation was negative withdrawal & boycott of colonial institutions; Civil Disobedience was positive, active breach of unjust laws (e.g. Salt Law).',
      'Non-Cooperation was restricted to South India; Civil Disobedience occurred only in Bengal.',
      'Non-Cooperation demanded Complete Independence; Civil Disobedience only asked for title surrenders.'
    ],
    correctIndex: 1,
    explanation: 'Non-Cooperation relied on abstention/boycott (refusal to cooperate with institutions). Civil Disobedience involved deliberate, public violation of specific colonial statutes.',
    hints: [
      'One was passive withdrawal; the other was deliberate direct defiance of specific laws.',
      'Making illegal salt is an active law-breaking act.',
      'Select the option highlighting negative boycott vs active positive law-breaking.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_17',
    nodeId: NODE_C10_HISTCIV_036,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the Red Fort INA Trials (Nov 1945) of Shah Nawaz Khan, Gurbaksh Singh Dhillon, and Prem Kumar Sahgal hasten British departure more than battlefield encounters?',
    options: [
      'The Japanese air force bombed Delhi during the trial proceedings.',
      'The joint Hindu-Muslim-Sikh trial united all Indian communities and directly triggered the Royal Indian Navy (RIN) Mutiny, proving the armed forces were no longer loyal to Britain.',
      'The British judges decided to resign and join the Indian National Congress.',
      'Lord Wavell surrendered all British weapons to the Indian Independence League.'
    ],
    correctIndex: 1,
    explanation: 'The trials united Hindus, Muslims, and Sikhs in patriotic outrage and directly inspired the Feb 1946 Naval Mutiny in Bombay, shattering British faith in the armed forces as their tool of coercion.',
    hints: [
      'Consider the communal composition of the three accused officers.',
      'Look at how the armed forces (Navy in 1946) reacted to the trials.',
      'The trials destroyed British confidence in the loyalty of Indian military personnel.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_18',
    nodeId: NODE_C10_HISTCIV_037,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which of the following was NOT one of the four main reasons the Congress Working Committee agreed to accept the Mountbatten Plan for Partition in June 1947?',
    options: [
      'The communal deadlock with the Muslim League had become completely unbreakable.',
      'Joint governance in the Interim Government had broken down completely due to League obstruction.',
      'Continued delay risked escalating communal riots into full-scale countrywide civil war.',
      'The British government threatened to annex India permanently under military martial law.'
    ],
    correctIndex: 3,
    explanation: 'Congress accepted Partition because of unbreakable deadlock, failure of the interim government, prevention of full civil war, and the desire for a smaller India with a strong stable centre.',
    hints: [
      'Three reasons are genuine tragic administrative necessities faced by Congress.',
      'The British did not threaten permanent annexation; they were already desperate to withdraw.',
      'The false reason is the British threat of permanent military annexation.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_19',
    nodeId: NODE_C10_HISTCIV_038,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match the specific clause of the Indian Independence Act 1947 with its constitutional implication:',
    options: [
      'Lapse of Paramountcy → 560+ Princely States became legally independent and free to accede to India or Pakistan',
      'Dominion Status → India became a republic immediately with an elected President',
      'Constituent Assembly → Dissolved immediately and replaced by British Parliament',
      'Viceroy → Elevated to Emperor of India'
    ],
    correctIndex: 0,
    explanation: 'The Act lapsed British paramountcy/suzerainty over princely states, leaving them legally free to accede to either dominion or remain independent, sparking Patel’s integration drive.',
    hints: [
      'Look at what happened to the 565 princely rulers when British treaties lapsed.',
      'Dominion status did NOT create a republic; Constituent Assemblies became legislatures.',
      'Paramountcy lapsed, giving princely states freedom of accession.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_20',
    nodeId: NODE_C10_HISTCIV_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did John Maynard Keynes famously denounce the economic reparations (approx. £6,600 million) of the Treaty of Versailles in 1919?',
    options: [
      'He argued that crippling Germany’s industrial economy would ruin European trade and inevitably cultivate radical revanchism and another world war.',
      'He believed Germany had paid far too little and should surrender all agricultural farmland.',
      'He wanted the League of Nations to relocate to Berlin.',
      'He wanted the United States to colonise the Rhineland.'
    ],
    correctIndex: 0,
    explanation: 'Keynes resigned from the British peace delegation and wrote "The Economic Consequences of the Peace", warning that crushing reparations would wreck Europe’s economy and breed another war.',
    hints: [
      'Keynes was a brilliant economist analysing long-term purchasing power and political stability.',
      'He foresaw that extreme humiliation and hyperinflation would trigger destructive extremism.',
      'He predicted that economic ruin would breed radical vengeance and another European war.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_21',
    nodeId: NODE_C10_HISTCIV_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What fatal structural defect crippled the League of Nations from its very inception on 10 January 1920?',
    options: [
      'It was headquartered in London and completely controlled by the British King.',
      'The US Senate refused to ratify the Versailles Treaty, leaving the world’s rising economic superpower out of the League, which also lacked its own army.',
      'Only Asian nations were allowed to hold permanent seats on the Council.',
      'Germany was given veto power over all collective security sanctions.'
    ],
    correctIndex: 1,
    explanation: 'Despite Woodrow Wilson being its chief architect, the US never joined the League due to Senate isolationism. Without US backing or a standing peacekeeping army, the League was teeth-less.',
    hints: [
      'Think of Woodrow Wilson’s own country.',
      'The American Senate refused to join, leaving the League without American power.',
      'The absence of the United States and lack of an independent military weakened it fatally.'
    ],
    misconceptionIndex: 4
  },
  // ─── Class 10 board-depth additions: nationalism-in-India diagnostics ───
  {
    id: 'ch_depth_ncm_satyagraha_salt',
    nodeId: 'c10_hist_cbse_02_002',
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What does "Satyagraha" literally mean, who coined it, and evaluate the 1930 British official who called the Salt March "a farce -- 24 days of walking to make a pinch of salt".',
    options: [
      'Satyagraha (coined by Mohandas Gandhi in South Africa) means "truth-force"/soul-force -- appealing to the oppressor\'s conscience through non-violent suffering, not physical force. The official misread the point: the salt tax touched EVERY household, so symbolically breaking the salt law at Dandi (6 April 1930) made the whole nation a law-breaker at zero cost to Gandhi -- mass participation, not tonnes of salt, was the weapon',
      'Satyagraha means armed struggle; it was coined by Nehru; the official was right because little salt was actually made',
      'Satyagraha means passive obedience; the Salt March aimed to capture the Dandi fort',
      'Satyagraha was a British term for negotiation; the March failed its goals'
    ],
    correctIndex: 0,
    explanation:
      'The "farce" quote inverts brilliantly: Gandhi CHOSE a commodity worth a pinch of salt because universality beats force -- rich and poor broke the same law together. Within a month, violations of the salt law across India, the Dharasana raid and world press coverage turned a "pinch of salt" into a moral earthquake. Evaluate by asking: what was the MOVEMENT\'s metric -- salt produced, or consciousness organised?',
    hints: [
      'Literal roots: satya (truth) + agraha (insistence/force).',
      'Who pays the salt tax? Everyone. That is the design.',
      'A movement\'s success is participation, not tonnage.'
    ],
  },
  {
    id: 'ch_depth_ncm_bharat_mata_folklore',
    nodeId: 'c10_hist_cbse_02_008',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Who painted the iconic Bharat Mata in 1905, with what key features, and why did nationalists collect folklore, folk songs and legends during the freedom struggle?',
    options: [
      'Abanindranath Tagore painted Bharat Mata (1905): a saffron-robed, lotus-petalled woman holding food, cloth, a book and sheaves -- the nation as a nurturing mother giving learning and sustenance, not a warrior. Folklore was collected (Natesa Sastri\'s Tamil folk tales, Rabindranath\'s lecture on village literature) because oral traditions PROVED a nation\'s ancient, authentic, popular culture existed before British rule -- dignity recovered from the village',
      'Raja Ravi Varma painted her as a machine-gun warrior; folklore was collected only for entertainment',
      'Bankim Chandra painted it; folk tales were collected to please British folklorists alone',
      'The painting shows Bharat Mata as an English queen; folklore served no political purpose'
    ],
    correctIndex: 0,
    explanation:
      'Two identity engines: IMAGE (Bharat Mata evolved from Bankim\'s 1870s Vande Mataram hymn through Abanindranath\'s painting into a mobilising icon carried in processions) and VOICE (folk tales, ballads, legends circulated by the Swadesh Bandhab Samiti proved popular culture predated colonial rule -- "when an idealised nation is pictured, its past must look glorious"). Both bypassed literacy barriers and bound villages to the movement.',
    hints: [
      'The four objects in her hands: food, cloth, book, sheaves -- read them as gifts.',
      'Folklore = evidence of an ancient popular nation.',
      'Image for the eyes, folklore for the ear -- both are mobilisation.'
    ],
  }
];

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
  nodeId: NODE_C10_HISTCIV_031,
  title: 'ICSE History: Gandhian Era & World Wars Mastery Simulator',
  definition: 'Comprehensive mastery of the Indian National Movement (1920-1947) across Non-Cooperation, Civil Disobedience, Quit India, Forward Bloc/INA, Partition plans, and global WWI triggers.',
  eli5: 'Think of India’s freedom struggle as a 3-act play: first refusing to cooperate (1920), then actively breaking bad laws (1930), and finally telling the British to leave immediately (1942), while world wars shaped the global stage.',
  misconceptions: [
    {
      misconception: 'The Non-Cooperation Movement failed and collapsed because of Chauri Chaura.',
      correction: 'Gandhi voluntarily suspended the movement on 11 Feb 1922 to preserve non-violent discipline; it achieved unprecedented mass mobilization and national institution building.'
    },
    {
      misconception: 'The Dandi March was a cause of the Civil Disobedience Movement.',
      correction: 'The Dandi March (12 March 1930) was the launch action that began the movement; the causes were the Simon Commission boycott (1928) and the Lahore Poorna Swaraj resolution (1929).'
    },
    {
      misconception: 'The Indian Independence Act 1947 declared India a sovereign democratic Republic.',
      correction: 'The 1947 Act created two Dominions under the British Crown; India became a sovereign Republic only on 26 January 1950 when the Constitution was enacted.'
    },
    {
      misconception: 'Subhas Chandra Bose founded the Indian National Army (INA).',
      correction: 'The INA was founded by Captain Mohan Singh in Singapore in 1942. Bose took over and reorganised it into the Azad Hind Fauj in July 1943.'
    },
    {
      misconception: 'The League of Nations was an independent organisation separate from the Treaty of Versailles.',
      correction: 'The Covenant of the League of Nations formed Part I of the Treaty of Versailles itself, born from the exact same 1919 peace settlement.'
    }
  ],
  diagnosticQuestions: [
    { question: 'When did the Chauri Chaura incident occur?', options: ['5 Feb 1922', '12 March 1930', '8 Aug 1942', '18 July 1947'], correctIndex: 0 },
    { question: 'Who drafted the Nehru Report in 1928?', options: ['Jawaharlal Nehru', 'Motilal Nehru', 'Subhas Chandra Bose', 'Mahatma Gandhi'], correctIndex: 1 },
    { question: 'How long was the Dandi March route?', options: ['100 miles', '150 miles', '240 miles', '500 miles'], correctIndex: 2 },
    { question: 'Which viceroy signed the 1931 Pact with Gandhi?', options: ['Lord Curzon', 'Lord Irwin', 'Lord Mountbatten', 'Lord Willingdon'], correctIndex: 1 },
    { question: 'When was the Forward Bloc founded?', options: ['22 June 1939', '12 March 1930', '4 July 1943', '15 Aug 1947'], correctIndex: 0 },
    { question: 'How many members were in the Cabinet Mission 1946?', options: ['Two', 'Three', 'Seven', 'Twelve'], correctIndex: 1 },
    { question: 'Which article of Versailles was the War Guilt Clause?', options: ['Article 48', 'Article 231', 'Article 370', 'Article 14'], correctIndex: 1 },
    { question: 'Which year did the League of Nations officially start?', options: ['1914', '1918', '1919', '1920'], correctIndex: 3 }
  ],
  masteryCriteria: 'Student distinguishes Gandhian movement methods, key dates, INA leaders, Partition plans, and WWI causes/treaty clauses without cross-contamination.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Act I: Non-Cooperation & Boycott (1920-1922)',
    instruction: 'Click on each pillar of colonial administration to see how the staged boycott dismantled colonial prestige.',
    interactionType: 'click-pillars',
    nodeId: NODE_C10_HISTCIV_031
  },
  {
    title: 'Act II: The Salt March & Law Defiance (1930)',
    instruction: 'Slide the Satyagraha Journey slider to march from Sabarmati to Dandi and witness the law-breaking spark.',
    interactionType: 'slider-march',
    nodeId: NODE_C10_HISTCIV_033
  },
  {
    title: 'Act III: The 1942 Crisis & Parallel Governments',
    instruction: 'Interact with the wartime map nodes to see where grassroots administrations (Jatiya Sarkar, Ballia) formed.',
    interactionType: 'click-parallel',
    nodeId: NODE_C10_HISTCIV_035
  },
  {
    title: 'Act IV: The Partition Plans Comparison (1946 vs 1947)',
    instruction: 'Toggle between the Cabinet Mission Plan and Mountbatten Plan to compare United Federation vs Partition.',
    interactionType: 'toggle-plans',
    nodeId: NODE_C10_HISTCIV_037
  },
  {
    title: 'Act V: Global Flashpoints & Versailles Blunders (1914-1920)',
    instruction: 'Adjust German economic reparations on the slider to observe how punitive sanctions fueled instability.',
    interactionType: 'slider-versailles',
    nodeId: NODE_C10_HISTCIV_040
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Historical Document & Case Analyst',
  description: 'Examine how constitutional transition rules from the Indian Independence Act 1947 shaped contemporary India’s parliamentary framework and the adoption of the 1950 Constitution on 26 January.',
  steps: [
    'Analyze why 26 January was specifically selected as Republic Day (linking back to 1930 Poorna Swaraj).',
    'Evaluate Sardar Patel’s negotiation model with 560+ Princely States using the Instrument of Accession.',
    'Formulate a 3-point brief comparing the Cabinet Mission grouping clause to contemporary federalism.',
    'Present your comparative analysis in your history portfolio.'
  ]
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

type Region1942 = 'tamluk' | 'ballia' | 'bombay';

function C10_HistoryCivicsNoncooperationProgrammeChauriSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C10_HISTCIV_031,
    title = DEFAULT_PROPS.title || 'Gandhian Era & World Wars Sim',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete
  } = props;

  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation Interactive States
  const [predIndex, setPredIndex] = useState(0);
  const [selectedPredOption, setSelectedPredOption] = useState<number | null>(null);
  const [predSubmitted, setPredSubmitted] = useState(false);

  const [obsIndex, setObsIndex] = useState(0);
  const [selectedObsOption, setSelectedObsOption] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState(false);

  // Multi-representation state
  const [multiRepView, setMultiRepView] = useState<'matrix' | 'flowchart' | 'timeline'>('matrix');

  // Reflection states
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explanation: '',
    realLife: ''
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Interactive lab states
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [marchDistance, setMarchDistance] = useState(0); // 0 to 240 miles
  const [selectedRegion1942, setSelectedRegion1942] = useState<Region1942 | null>(null);
  const [activePlanTab, setActivePlanTab] = useState<'cabinet' | 'mountbatten'>('cabinet');
  const [reparationsSlider, setReparationsSlider] = useState(6600); // in million pounds
  const [sandboxYear, setSandboxYear] = useState(1930);

  // Adaptive difficulty & mastery states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Challenge execution states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag-and-drop & construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback FX states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // Filter challenges by difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // GSAP animation for historical timeline
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.querySelectorAll('.timeline-node'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // Load existing mastery
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty upon answer updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas 2D animation loop
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle historical parchment wave
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 10) {
        const y = 15 + Math.sin((x + frame * 2) * 0.03) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing emblem node
      const radius = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 15, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge]);

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
      speechManager.speak('Let us study the complete historical explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) setShowSparkles(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate understanding! Let us dive into the full timeline.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Touch and manipulate the historical events.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Free Play Sandbox. Explore different years and historical dynamics without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for ICSE Board Challenges! Read carefully and choose your answers.');
  }, []);

  const handlePillarClick = useCallback((pillarId: string) => {
    setActivePillar(pillarId);
    audioManager.play('tap');
    setShowSparkles(true);
    const details: Record<string, string> = {
      titles: 'Stage 1: Surrender of British titles like Kaiser-i-Hind, renouncing colonial prestige.',
      schools: 'Stage 2: Boycott of government schools. Jamia Millia Islamia (1920) and Kashi Vidyapeeth (1921) were born.',
      courts: 'Stage 3: Boycott of colonial courts by advocates like C.R. Das, Motilal Nehru, and Rajendra Prasad.',
      foreign_cloth: 'Stage 4: Public bonfires of foreign cloth, spinning homespun Khadi to empower indigenous weavers.',
      taxes: 'Stage 5: Final ultimate stage — refusal to pay land revenue and taxes to dismantle colonial revenues.'
    };
    speechManager.speak(details[pillarId] || '');
  }, []);

  const handleMarchChange = useCallback((distance: number) => {
    setMarchDistance(distance);
    audioManager.play('count');
    if (distance >= 240) {
      audioManager.play('sparkle');
      setShowSparkles(true);
      speechManager.speak('Gandhi picks up a fistful of salt at Dandi on 6 April 1930, defying the colonial monopoly!');
    }
  }, []);

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
      setShowSparkles(true);
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
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
    setShowSparkles(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Excellent historical analysis.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Outstanding.');
      setShowConfetti(true);
      setShowSparkles(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, 'mastered');
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
        speechManager.speak('Review the step-by-step breakdown below.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('tap');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15 }}
            className="text-3xl p-2 bg-amber-950/60 border border-amber-800/80 rounded-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              ICSE Class 10 History & Civics
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' :
              difficulty === 'advanced' ? 'bg-rose-950/80 border-rose-500 text-rose-300' :
              'bg-amber-950/80 border-amber-500 text-amber-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs text-slate-300"
          >
            Mastery: <span className="text-amber-400 font-bold capitalize">{masteryLevel}</span>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-br from-amber-950/40 to-slate-900 rounded-2xl border border-amber-800/60 shadow-lg"
            >
              <h2 className="text-xl font-bold text-amber-300">{SCENARIO.title}</h2>
              <p className="mt-2 text-slate-300 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 text-xs text-amber-200/90">
                💡 <span className="font-semibold">Historical Context:</span> {SCENARIO.context}
              </div>
            </motion.div>

            {/* SVG Diagram 1: Three Gandhian Waves Comparison */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
            >
              <div className="text-xs font-bold uppercase text-amber-400 tracking-wider">
                Visual Framework: The 3 Great Gandhian Waves (1920 - 1942)
              </div>
              <svg viewBox="0 0 700 160" className="w-full h-auto bg-slate-950 rounded-xl p-2 border border-slate-800">
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                <line x1="40" y1="80" x2="660" y2="80" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />

                <rect x="50" y="25" width="180" height="110" rx="10" fill="url(#g1)" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="140" y="48" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1920-1922</text>
                <text x="140" y="66" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">Non-Cooperation</text>
                <text x="140" y="85" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">Negative Boycott</text>
                <text x="140" y="100" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Schools, Courts, Titles</text>
                <text x="140" y="120" fill="#fbbf24" fontSize="8.5" fontWeight="bold" textAnchor="middle">Ended: Chauri Chaura</text>

                <rect x="260" y="25" width="180" height="110" rx="10" fill="url(#g2)" stroke="#60a5fa" strokeWidth="1.5" />
                <text x="350" y="48" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1930-1934</text>
                <text x="350" y="66" fill="#dbeafe" fontSize="11" fontWeight="bold" textAnchor="middle">Civil Disobedience</text>
                <text x="350" y="85" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">Active Law Defiance</text>
                <text x="350" y="100" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Salt March (Dandi 240 mi)</text>
                <text x="350" y="120" fill="#93c5fd" fontSize="8.5" fontWeight="bold" textAnchor="middle">Gandhi-Irwin Pact</text>

                <rect x="470" y="25" width="180" height="110" rx="10" fill="url(#g3)" stroke="#34d399" strokeWidth="1.5" />
                <text x="560" y="48" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1942</text>
                <text x="560" y="66" fill="#d1fae5" fontSize="11" fontWeight="bold" textAnchor="middle">Quit India Movement</text>
                <text x="560" y="85" fill="#e2e8f0" fontSize="9.5" textAnchor="middle">"Do or Die" Mandate</text>
                <text x="560" y="100" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Spontaneous & Leaderless</text>
                <text x="560" y="120" fill="#6ee7b7" fontSize="8.5" fontWeight="bold" textAnchor="middle">Parallel Govts (Tamluk)</text>
              </svg>
            </motion.div>

            <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <h3 className="text-base md:text-lg font-semibold text-white mb-4">
                🎯 Curiosity Spark: {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option: ${opt}`}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 text-slate-500 border border-slate-800'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                    {discoveryCorrect
                      ? '✓ Spot on! Gandhi refused to let the movement degenerate into bloodshed.'
                      : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
                  >
                    Enter Interactive Labs →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            {/* Brilliant.org Predict-Then-Check Interactive Section */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-5 bg-gradient-to-r from-amber-950/60 to-slate-900 rounded-2xl border border-amber-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  🔮 Brilliant.org Prediction Challenge {predIndex + 1} of {PREDICTION_QUESTIONS.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setPredIndex(0); setPredSubmitted(false); setSelectedPredOption(null); }}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${predIndex === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Q1
                  </button>
                  <button
                    onClick={() => { setPredIndex(1); setPredSubmitted(false); setSelectedPredOption(null); }}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${predIndex === 1 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Q2
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white leading-snug">
                {PREDICTION_QUESTIONS[predIndex].question}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!predSubmitted) {
                        setSelectedPredOption(i);
                        setPredSubmitted(true);
                        audioManager.play(i === PREDICTION_QUESTIONS[predIndex].correctIndex ? 'success' : 'pop');
                        if (i === PREDICTION_QUESTIONS[predIndex].correctIndex) setShowSparkles(true);
                      }
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                      predSubmitted && i === PREDICTION_QUESTIONS[predIndex].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : predSubmitted && selectedPredOption === i
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-1.5 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>

              {predSubmitted && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-300 space-y-1">
                  <div>🔍 <span className="font-bold">Interact to Verify:</span> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}</div>
                  <p className="text-slate-300 text-[11px]">{PREDICTION_QUESTIONS[predIndex].explanation}</p>
                </div>
              )}
            </motion.div>

            {/* Multi-Representation Selector */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase text-amber-400">📊 Multi-Representation View:</span>
                <span className="text-xs text-slate-400">Analyze the movement through multiple lenses</span>
              </div>
              <div className="flex gap-2">
                {(['matrix', 'flowchart', 'timeline'] as const).map(view => (
                  <motion.button
                    key={view}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setMultiRepView(view);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      multiRepView === view
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {view === 'matrix' && 'Comparative Matrix'}
                    {view === 'flowchart' && 'Causal Flowchart'}
                    {view === 'timeline' && 'Chronological Axis'}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Multi-Representation Content Container */}
            {multiRepView === 'matrix' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs"
              >
                <div className="font-bold text-amber-300 text-sm mb-3">Representation 1: Systematic Movement Matrix</div>
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-slate-700 text-slate-300">
                      <th className="p-2.5">Attribute</th>
                      <th className="p-2.5 text-amber-300">Non-Cooperation (1920)</th>
                      <th className="p-2.5 text-blue-300">Civil Disobedience (1930)</th>
                      <th className="p-2.5 text-emerald-300">Quit India (1942)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr>
                      <td className="p-2.5 font-bold text-white">Core Method</td>
                      <td className="p-2.5">Negative institutional boycott</td>
                      <td className="p-2.5">Positive law-breaking (Salt Law)</td>
                      <td className="p-2.5">Direct rebellion & parallel govts</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-white">Immediate Trigger</td>
                      <td className="p-2.5">Rowlatt Act & Jallianwala Bagh</td>
                      <td className="p-2.5">Simon Commission & Poorna Swaraj</td>
                      <td className="p-2.5">Cripps Mission failure & War threat</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-white">Leadership Dynamic</td>
                      <td className="p-2.5">Controlled by Gandhi & Congress</td>
                      <td className="p-2.5">Organized satyagrahi batches</td>
                      <td className="p-2.5">Leaderless (Operation Zero Hour)</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-white">Conclusion / Truce</td>
                      <td className="p-2.5">Suspended at Chauri Chaura</td>
                      <td className="p-2.5">Gandhi-Irwin Pact 1931</td>
                      <td className="p-2.5">Suppressed; sparked RIN Mutiny 1946</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
            )}

            {multiRepView === 'flowchart' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
              >
                <div className="font-bold text-amber-300 text-sm">Representation 2: Causal Escalation Flowchart</div>
                <svg viewBox="0 0 680 180" className="w-full h-auto bg-slate-950 rounded-xl p-2 border border-slate-800">
                  <rect x="20" y="30" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="85" y="52" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">1919 Rowlatt Act</text>
                  <text x="85" y="66" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Jallianwala Bagh</text>

                  <line x1="150" y1="55" x2="185" y2="55" stroke="#f59e0b" strokeWidth="2" />

                  <rect x="185" y="30" width="140" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="255" y="52" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">1920 Non-Cooperation</text>
                  <text x="255" y="66" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Boycott & Khilafat</text>

                  <line x1="255" y1="80" x2="255" y2="105" stroke="#f59e0b" strokeWidth="2" />
                  <line x1="255" y1="105" x2="355" y2="105" stroke="#f59e0b" strokeWidth="2" />

                  <rect x="355" y="80" width="140" height="50" rx="8" fill="#1e293b" stroke="#60a5fa" strokeWidth="1.5" />
                  <text x="425" y="102" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">1929 Poorna Swaraj</text>
                  <text x="425" y="116" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Lahore Ravi Session</text>

                  <line x1="495" y1="105" x2="525" y2="105" stroke="#60a5fa" strokeWidth="2" />

                  <rect x="525" y="80" width="135" height="50" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
                  <text x="592" y="102" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1930 Salt Satyagraha</text>
                  <text x="592" y="116" fill="#cbd5e1" fontSize="8.5" textAnchor="middle">Civil Disobedience</text>
                </svg>
              </motion.div>
            )}

            {multiRepView === 'timeline' && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
              >
                <div className="font-bold text-amber-300 text-sm">Representation 3: Chronological Milestones Axis</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-bold block">1920-1922</span>
                    <span className="text-slate-300">Non-Cooperation: Staged boycott of British colonial institutions.</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-blue-400 font-bold block">1930-1934</span>
                    <span className="text-slate-300">Civil Disobedience: Dandi March & direct defiance of salt monopolies.</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 font-bold block">1942</span>
                    <span className="text-slate-300">Quit India: "Do or Die", mass spontaneous parallel district administrations.</span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-rose-400 font-bold block">1947</span>
                    <span className="text-slate-300">Independence & Partition: Mountbatten Plan, 18 July Act, Dominions created.</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Brilliant.org Observation Pattern: What do you notice? */}
            <motion.div
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-5 bg-gradient-to-r from-blue-950/60 to-slate-900 rounded-2xl border border-blue-800/80 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                  👀 Brilliant.org Observation Check {obsIndex + 1} of {OBSERVATION_QUESTIONS.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setObsIndex(0); setObsSubmitted(false); setSelectedObsOption(null); }}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${obsIndex === 0 ? 'bg-blue-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Obs 1
                  </button>
                  <button
                    onClick={() => { setObsIndex(1); setObsSubmitted(false); setSelectedObsOption(null); }}
                    className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${obsIndex === 1 ? 'bg-blue-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Obs 2
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-white leading-snug">
                {OBSERVATION_QUESTIONS[obsIndex].question}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!obsSubmitted) {
                        setSelectedObsOption(i);
                        setObsSubmitted(true);
                        audioManager.play(i === OBSERVATION_QUESTIONS[obsIndex].correctIndex ? 'success' : 'pop');
                        if (i === OBSERVATION_QUESTIONS[obsIndex].correctIndex) setShowSparkles(true);
                      }
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                      obsSubmitted && i === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : obsSubmitted && selectedObsOption === i
                        ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-1.5 text-blue-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
              </div>

              {obsSubmitted && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-blue-300 space-y-1">
                  <div>💡 <span className="font-bold">Insight:</span> {OBSERVATION_QUESTIONS[obsIndex].explanation}</div>
                </div>
              )}
            </motion.div>

            {/* Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase text-amber-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
                <span className="text-sm font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-semibold rounded-lg text-slate-300"
                >
                  ← Prev
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={currentSlide === EXPLORATION_STEPS.length - 1 ? handleAdvanceToSandbox : handleNextSlide}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-xs font-bold rounded-lg text-slate-950"
                >
                  {currentSlide === EXPLORATION_STEPS.length - 1 ? 'Go to Sandbox →' : 'Next Step →'}
                </motion.button>
              </div>
            </div>

            <p className="text-sm font-medium text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-900/50">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* Dynamic Interactive Visualizations */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 min-h-[380px] flex flex-col justify-center">
              {/* Step 0: Non-Cooperation 5 Pillars */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { id: 'titles', title: '1. Titles', icon: '🎖️', sub: 'Surrender honours' },
                      { id: 'schools', title: '2. Education', icon: '🏫', sub: 'Jamia & Kashi' },
                      { id: 'courts', title: '3. Courts', icon: '⚖️', sub: 'Lawyers suspend' },
                      { id: 'foreign_cloth', title: '4. Swadeshi', icon: '🧵', sub: 'Burn cloth/Khadi' },
                      { id: 'taxes', title: '5. Taxes', icon: '💰', sub: 'Final Tax Refusal' }
                    ].map((p) => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePillarClick(p.id)}
                        className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all border ${
                          activePillar === p.id
                            ? 'bg-amber-950/80 border-amber-400 text-white shadow-lg shadow-amber-900/40'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-3xl mb-2">{p.icon}</span>
                        <span className="text-xs font-bold">{p.title}</span>
                        <span className="text-[10px] text-slate-400 mt-1">{p.sub}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] flex items-center justify-center text-center">
                    {activePillar ? (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Programme Detail</span>
                        <p className="text-sm font-medium text-slate-200 mt-1">
                          {activePillar === 'titles' && 'Symbolic surrender of British titles (e.g. Kaiser-i-Hind medal by Gandhi).'}
                          {activePillar === 'schools' && 'Students vacated government schools. National institutions founded: Jamia Millia Islamia (1920 Aligarh -> Delhi) & Kashi Vidyapeeth (1921 Banaras).'}
                          {activePillar === 'courts' && 'Boycott of British law courts by prominent lawyers (Motilal Nehru, C.R. Das, Vallabhbhai Patel).'}
                          {activePillar === 'foreign_cloth' && 'Promotion of the Charkha & Khadi; bonfires of British manufactured textiles across all major cities.'}
                          {activePillar === 'taxes' && 'Apex Stage: Refusal of land revenues and civic taxes, reserved for fully disciplined non-violent regions.'}
                        </p>
                      </motion.div>
                    ) : (
                      <p className="text-slate-500 text-xs">Click on any of the 5 boycott stages above to see its exact historical impact.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 1: Dandi March Journey */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 120" className="w-full h-auto">
                      <path d="M 50 80 Q 200 20, 350 80 T 550 60" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
                      <circle cx="50" cy="80" r="10" fill="#f59e0b" />
                      <text x="50" y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Sabarmati</text>
                      <text x="50" y="115" fill="#94a3b8" fontSize="8" textAnchor="middle">12 Mar 1930</text>

                      <circle cx={50 + (marchDistance / 240) * 500} cy={60} r="12" fill="#ef4444" />
                      <text x={50 + (marchDistance / 240) * 500} y={64} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">🚶</text>

                      <circle cx="550" cy="60" r="10" fill="#10b981" />
                      <text x="550" y="85" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Dandi</text>
                      <text x="550" y="95" fill="#94a3b8" fontSize="8" textAnchor="middle">6 Apr 1930</text>
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 font-semibold">
                    <span>Sabarmati Ashram (12 March 1930)</span>
                    <span className="text-amber-400 font-bold text-sm">{marchDistance} / 240 Miles</span>
                    <span>Dandi Seashore (6 April 1930)</span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={240}
                    value={marchDistance}
                    onChange={(e) => handleMarchChange(Number(e.target.value))}
                    aria-label="March distance slider"
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{marchDistance >= 240 ? '🌊' : '🚶'}</div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {marchDistance === 0 && 'Departure from Sabarmati Ashram with 78 Satyagrahis.'}
                          {marchDistance > 0 && marchDistance < 240 && `Marching through rural Gujarat (${marchDistance} miles completed) — villagers join by thousands.`}
                          {marchDistance >= 240 && '6 April 1930: Salt Law Broken! Over 60,000 citizens arrested nationwide.'}
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Salt was chosen because it was a basic daily necessity taxed under British monopoly, uniting rich and poor across India.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: 1942 Parallel Governments */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'bombay' as Region1942, title: 'Gowalia Tank, Bombay', date: '8 Aug 1942', note: 'Resolution & "Do or Die"' },
                      { id: 'tamluk' as Region1942, title: 'Tamluk (Midnapore, Bengal)', date: '1942-1944', note: 'Jatiya Sarkar parallel govt.' },
                      { id: 'ballia' as Region1942, title: 'Ballia (Uttar Pradesh)', date: 'Aug 1942', note: 'Chittu Pandey parallel admin' }
                    ].map((loc) => (
                      <motion.button
                        key={loc.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedRegion1942(loc.id);
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          selectedRegion1942 === loc.id
                            ? 'bg-amber-950 border-amber-400 text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-amber-400 font-bold text-sm">{loc.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{loc.date}</div>
                        <div className="text-xs font-semibold text-slate-200 mt-2">{loc.note}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    {selectedRegion1942 === 'bombay' && 'Bombay: AICC passed the Quit India resolution. Gandhi gave the "Do or Die" call. All leaders arrested on 9 August (Operation Zero Hour), making the movement spontaneous.'}
                    {selectedRegion1942 === 'tamluk' && 'Tamluk (Midnapore): The Tamralipta Jatiya Sarkar functioned for nearly 2 years, establishing independent courts, police stations, and cyclone relief squads.'}
                    {selectedRegion1942 === 'ballia' && 'Ballia (UP): Under Chittu Pandey, people liberated the town, released all political prisoners, and operated a free district administration before army deployment.'}
                    {!selectedRegion1942 && 'Select any region above to see the spontaneous 1942 rebellion in action.'}
                  </div>
                </div>
              )}

              {/* Step 3: Partition Plans Comparison */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setActivePlanTab('cabinet'); audioManager.play('tap'); }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        activePlanTab === 'cabinet' ? 'bg-amber-600 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Cabinet Mission Plan (16 May 1946)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setActivePlanTab('mountbatten'); audioManager.play('tap'); }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border ${
                        activePlanTab === 'mountbatten' ? 'bg-amber-600 text-slate-950 border-amber-500' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Mountbatten Plan (3 June 1947)
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
                    {activePlanTab === 'cabinet' ? (
                      <>
                        <div className="font-bold text-amber-300 text-sm">Key Principles: United Federation with Provincial Grouping</div>
                        <p>1. <span className="text-white font-semibold">Federal Structure:</span> Weak central government handling only Defence, Foreign Affairs, Communications.</p>
                        <p>2. <span className="text-white font-semibold">Grouping:</span> Section A (Hindu majority), Section B (NW Muslim majority: Punjab, Sind, NWFP), Section C (Bengal & Assam).</p>
                        <p>3. <span className="text-white font-semibold">Pakistan:</span> Explicitly rejected as unviable.</p>
                        <p>4. <span className="text-white font-semibold">Constituent Assembly:</span> Elected by provincial legislatures.</p>
                      </>
                    ) : (
                      <>
                        <div className="font-bold text-amber-300 text-sm">Key Principles: Partition into Two Sovereign Dominions</div>
                        <p>1. <span className="text-white font-semibold">Two Dominions:</span> India and Pakistan formed from 15 August 1947.</p>
                        <p>2. <span className="text-white font-semibold">Partition of Provinces:</span> Bengal and Punjab partitioned along religious majority districts.</p>
                        <p>3. <span className="text-white font-semibold">Referendums:</span> Held in NWFP and Sylhet (Assam).</p>
                        <p>4. <span className="text-white font-semibold">Princely States:</span> Free to accede to India, Pakistan, or remain independent.</p>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Versailles & WWI Alliance Chart */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 130" className="w-full h-auto">
                      <rect x="20" y="20" width="250" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                      <text x="145" y="42" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Triple Alliance (1882)</text>
                      <text x="145" y="62" fill="#ffffff" fontSize="9.5" textAnchor="middle">🇩🇪 Germany  🇦🇹 Austria-Hungary</text>
                      <text x="145" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">🇮🇹 Italy (switched in 1915)</text>
                      <text x="145" y="98" fill="#fda4af" fontSize="8" textAnchor="middle">Central Powers Bloc</text>

                      <text x="300" y="70" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">VS</text>

                      <rect x="330" y="20" width="250" height="90" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="455" y="42" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">Triple Entente (1907)</text>
                      <text x="455" y="62" fill="#ffffff" fontSize="9.5" textAnchor="middle">🇬🇧 Britain  🇫🇷 France</text>
                      <text x="455" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">🇷🇺 Russia (exited 1917) + 🇺🇸 USA</text>
                      <text x="455" y="98" fill="#93c5fd" fontSize="8" textAnchor="middle">Allied Powers Bloc</text>
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>German War Reparations:</span>
                    <span className="text-rose-400 font-bold text-sm">£{reparationsSlider} Million</span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={10000}
                    step={200}
                    value={reparationsSlider}
                    onChange={(e) => {
                      setReparationsSlider(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    aria-label="Reparations slider"
                    className="w-full accent-rose-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs leading-relaxed space-y-2">
                    <p className="text-white font-semibold">
                      Versailles imposed £6,600 Million in reparations + Article 231 (War Guilt Clause).
                    </p>
                    <p className="text-slate-400">
                      Economist John Maynard Keynes resigned, warning that hyper-punitive economic crippling would trigger German currency collapse, social despair, and revenge militarism.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white">Historical Sandbox Lab</h3>
                  <p className="text-xs text-slate-400">Freely manipulate eras and explore primary source milestones without grading pressure.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg"
                >
                  Ready for ICSE Challenges! →
                </motion.button>
              </div>

              {/* Timeline selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {[1920, 1928, 1930, 1931, 1939, 1942, 1946, 1947].map((yr) => (
                  <motion.button
                    key={yr}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSandboxYear(yr); audioManager.play('tap'); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      sandboxYear === yr ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {yr}
                  </motion.button>
                ))}
              </div>

              {/* Sandbox details */}
              <motion.div
                key={sandboxYear}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2"
              >
                <span className="text-amber-400 uppercase font-bold tracking-widest text-[10px]">Year Milestone {sandboxYear}</span>
                {sandboxYear === 1920 && <p className="text-slate-200">Non-Cooperation launched at Calcutta/Nagpur. Boycott of titles, schools, courts, and foreign cloth begins.</p>}
                {sandboxYear === 1928 && <p className="text-slate-200">Simon Commission arrives in Bombay on 3 Feb. All parties protest: "Simon Go Back". Lala Lajpat Rai assaulted.</p>}
                {sandboxYear === 1930 && <p className="text-slate-200">Poorna Swaraj Day on 26 Jan; Dandi March (12 Mar - 6 Apr); Civil Disobedience erupts nationwide with 60,000+ arrests.</p>}
                {sandboxYear === 1931 && <p className="text-slate-200">Gandhi-Irwin Pact signed (5 Mar); Gandhi attends Second Round Table Conference in London as sole Congress delegate.</p>}
                {sandboxYear === 1939 && <p className="text-slate-200">Subhas Chandra Bose resigns from Congress presidency and forms the Forward Bloc on 22 June 1939 at Makur.</p>}
                {sandboxYear === 1942 && <p className="text-slate-200">Cripps Mission fails; Japanese threat looms; Quit India Resolution on 8 Aug with "Do or Die".</p>}
                {sandboxYear === 1946 && <p className="text-slate-200">Cabinet Mission Plan announced on 16 May. Provincial grouping proposed. Direct Action Day on 16 Aug.</p>}
                {sandboxYear === 1947 && <p className="text-slate-200">Mountbatten Plan on 3 June; Indian Independence Act passed on 18 July; Transfer of Power on 15 August creating two dominions.</p>}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: BOARD CHALLENGES ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-4"
          >
            <canvas ref={canvasRef} width={400} height={30} className="w-full rounded-lg bg-slate-950" />

            {/* Question Header */}
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-amber-400 font-semibold uppercase tracking-wider">
                Competency: {challenge.competencyLevel}
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Box */}
            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-4"
            >
              <h3 className="text-base md:text-lg font-bold text-white leading-snug">
                {challenge.question}
              </h3>

              {/* MCQ & Distinguish & Match UI */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full p-4 text-left text-sm font-medium rounded-xl border transition-all ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 text-slate-200 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Numeric Input UI */}
              {challenge.type === 'numeric' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter exact integer..."
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48 focus:border-amber-500 outline-none"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-sm"
                  >
                    Submit
                  </motion.button>
                </div>
              )}

              {/* Drag-sort UI */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        className="p-3 bg-slate-950 border border-slate-800 hover:border-amber-500 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="px-2 py-1 bg-slate-800 rounded font-bold text-amber-400">{displayIdx + 1}</span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Verify Order
                  </motion.button>
                </div>
              )}

              {/* Construct UI */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 rounded-lg text-xs"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[70px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-950/80 border border-amber-700/80 text-amber-200 rounded text-xs flex items-center gap-1">
                        {part}
                        <button onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))} className="text-rose-400 font-bold ml-1">×</button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-slate-600 text-xs">Click stages above to assemble sequence...</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Verify Constructed Programme
                  </motion.button>
                </div>
              )}

              {/* Drag-label UI */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        className="px-3 py-1.5 bg-amber-950/80 border border-amber-600 text-amber-200 rounded-lg text-xs cursor-grab"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('side_congress')}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 text-center"
                    >
                      <span className="text-xs font-bold text-amber-400 block mb-2">Congress Commitments</span>
                      <span className="text-xs text-slate-300 font-semibold">{droppedLabels.side_congress || 'Drop here...'}</span>
                    </div>

                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('side_british')}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 text-center"
                    >
                      <span className="text-xs font-bold text-amber-400 block mb-2">British Commitments</span>
                      <span className="text-xs text-slate-300 font-semibold">{droppedLabels.side_british || 'Drop here...'}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Verify Commitments
                  </motion.button>
                </div>
              )}

              {/* Explanation & Progressive Disclosure */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-5 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-2xl border border-amber-800/80 space-y-3"
                >
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">ICSE Model Breakdown:</div>
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                  <div className="flex items-center justify-between pt-2">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-amber-200 text-xs font-semibold rounded-lg"
                      >
                        Next Step Insight →
                      </motion.button>
                    ) : <div />}

                    {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION, REFLECTION & MISCONCEPTION PROFILE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-emerald-950/50 to-slate-900 rounded-3xl border border-emerald-700/80 text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Simulation Complete! 🎉</h2>
              <p className="text-amber-400 font-bold text-lg">Score: {Math.max(0, 100 - errors * 5)}%</p>
              <p className="text-xs text-slate-300">Mastery Status: <span className="font-bold text-emerald-300 uppercase">{masteryLevel}</span></p>
            </div>

            {/* Motivational Feedback */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300"
            >
              {errors === 0 && <span className="text-emerald-400 font-bold">🌟 PERFECT SCORE! You have total mastery over the Gandhian movements and World War frameworks!</span>}
              {errors > 0 && errors <= 3 && <span className="text-amber-300 font-bold">👍 Strong performance! Review the specific misconception notes below to secure 100% in board exams.</span>}
              {errors > 3 && <span className="text-rose-300 font-bold">📚 Solid effort! Revisit the interactive labs and study the distinct cause-and-impact packages.</span>}
            </motion.div>

            {/* ─── REFLECTION SECTION ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🤔</span>
                <h3 className="text-sm md:text-base font-bold text-amber-400 uppercase tracking-wider">
                  Post-Simulation Deep Reflection
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                Consolidate your conceptual understanding by articulating your insights.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                    placeholder="e.g., How Gandhi's suspension at Chauri Chaura preserved the moral core rather than being a tactical collapse..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.explanation}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explanation: e.target.value }))}
                    placeholder="e.g., The 3 movements progressed from passive boycott, to active law-breaking, to full direct rebellion..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                    placeholder="e.g., Understanding international diplomacy, civil rights movements globally, and constitutional negotiation..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    setShowSparkles(true);
                    audioManager.play('success');
                  }}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  {reflectionSubmitted ? '✓ Reflection Saved' : 'Submit Reflection'}
                </motion.button>
              </div>
            </motion.div>

            {/* Misconception Tracking */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3"
              >
                <h4 className="text-xs font-bold uppercase text-rose-400 tracking-wider">Your Targeted Misconception Profile</h4>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1"
                    >
                      <div className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</div>
                      <div className="text-emerald-300 font-semibold">✓ ICSE Fact: {m.correction}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition Visibility */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs flex justify-between items-center"
            >
              <span className="text-slate-400">Spaced Repetition Review Cycle:</span>
              <span className="font-bold text-amber-400">
                Next SRS Review in {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : errors <= 3 ? REVIEW_INTERVAL_DAYS[1] : REVIEW_INTERVAL_DAYS[0]} Days
              </span>
            </motion.div>

            {/* Real World Activity */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-2.5 bg-slate-950 rounded-xl text-[11px] text-slate-300 border border-slate-800/80"
                  >
                    <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span> {st}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sim Engine Overlays */}
      <SparkleBurst x={0} y={0} active={showSparkles} onComplete={() => setShowSparkles(false)} />
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Validated!" onComplete={() => setShowSuccess(false)} />}
    </motion.div>
  );
}

export default C10_HistoryCivicsNoncooperationProgrammeChauriSim;